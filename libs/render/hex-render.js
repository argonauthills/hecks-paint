var hm = require('../math/hex')
var alg = require('../math/linear-algebra')
var g = require('../grid')
var _ = require('lodash')
var svgRender = require('./svg-render')
var modash = require('../modash')

// GET EDGES, COLLECT BY PATH

function edgesGroupedByPath(grid) {
    var hexes = getHexes(grid)
    var edges = getEdges(grid, hexes)
    return _.groupBy(edges, "pathId")
}

function getHexes(grid) {
    return _.pluck(grid, "coord")
}

function getEdges(grid, hexes) {
    return _.reduce(hexes, function (acc, hex) {
        return acc.concat(getEdgesFromHex(grid, hex))
    }, [])
}

function getEdgesFromHex(grid, hexCoord) {
    var neighbors = hm.adjacentHexes(hexCoord)
    var path = g.hexPathInfo(grid, hexCoord)

    var edgyNeighbors = _.filter(neighbors, function (neighbor){
        var neighborInfo = g.hexPathInfo(grid, neighbor.coord)
        if (!neighborInfo) return true  // is edge if adjacent to background
        else if (neighborInfo.id != path.id) return true  // is edge if different path
        else return false
    })
    
    return _.map(edgyNeighbors, function(neighbor) {
        return {
            id: edgeName(hexCoord, neighbor.position),
            owner: hexCoord,
            position: neighbor.position,
            path: path,
            pathId: path.id
        }
    })
}


// FORM CYCLES

function edgeCycles(edges) {
    var checklist = edgeChecklist(edges)
    var cycles = []
    var currentCycle = []
    var currentEdge = arbitraryChecklistItem(checklist)

    while (true) {
        var options = nextEdgeOptions(currentEdge)
        var opt0 = options[0]
        var opt1 = options[1]

        currentCycle.push(currentEdge)
        removeFromChecklist(checklist, currentEdge.id)

        if (isInChecklist(checklist, opt0)) {
            currentEdge = checklist[opt0]
        } else if (isInChecklist(checklist, opt1)) {
            currentEdge = checklist[opt1]
        } else {
            cycles.push(currentCycle)
            currentCycle = []
            currentEdge = arbitraryChecklistItem(checklist)
        }
        if (!currentEdge) break;
    }
    return cycles
}

function heckEdgeCycles(edges) {  // buggy code; makes great glitch art.
    var checklist = edgeChecklist(edges)
    var cycles = []
    var currentCycle = []
    _.forEach(edges, function(edge) {
        var options = nextEdgeOptions(edge)
        var opt0 = options[0]
        var opt1 = options[1]

        if (isInChecklist(checklist, opt0)) {
            currentCycle.push(checklist[opt0])
            removeFromChecklist(checklist, opt0)
        } else if (isInChecklist(checklist, opt1)) {
            currentCycle.push(checklist[opt1])
            removeFromChecklist(checklist, opt1)
        } else {
            cycles.push(currentCycle)
            currentCycle = []
        }
    })
    cycles.push(currentCycle)  // because the last cycle wouldn't get pushed otherwise
    return cycles
}

function arbitraryChecklistItem(checklist) {
    for (prop in checklist) {  // very hacky
        return checklist[prop]
    }
    return null
}

function edgeChecklist(edges) {
    return _.indexBy(edges, "id")
}

function isInChecklist(checklist, edgeId) {
    return !!checklist[edgeId]
}

function getFromChecklist(checklist, edgeId) {
    return checklist[edgeId]
}

function removeFromChecklist(checklist, edgeId) {
    delete checklist[edgeId]
}

function nextEdgeOptions(edge) {  //TODO consider getting more of this info from grid using "one before" "one after" algorithm
    var pt = edge.owner
    var pos = edge.position
    switch (pos) {
        case "upRight":   return [ edgeName(pt, "downRight"), edgeName(hm.downRight(pt), "up")        ]
        case "downRight": return [ edgeName(pt, "down"),      edgeName(hm.down(pt),      "upRight")   ]
        case "down":      return [ edgeName(pt, "downLeft"),  edgeName(hm.downLeft(pt),  "downRight") ]
        case "downLeft":  return [ edgeName(pt, "upLeft"),    edgeName(hm.upLeft(pt),    "down")      ]
        case "upLeft":    return [ edgeName(pt, "up"),        edgeName(hm.up(pt),        "downLeft")  ]
        case "up":        return [ edgeName(pt, "upRight"),   edgeName(hm.upRight(pt),   "upLeft")    ]
        default: throw new Error(pos + " is not a valid edge position")
    }
}

// RENDER AS SVG

function render(grid, basis) {
    var groupedEdges = edgesGroupedByPath(grid)
    return  _.map(groupedEdges, function(edges) {
        var pathInfo = edges[0].path // every edge has this information; we just need it from one
        var cycles = (pathInfo.heckMode) ? heckEdgeCycles(edges) : edgeCycles(edges)
        var pathRenderFunc = pathInfo.pathRenderFunc
        return pathRenderFunc(basis, cycles, pathInfo)
    }).join(" ")   
}

// path renders
function normalRenderPath(basis, cycles, pathInfo) {
    return svgRender.path(_.map(cycles, function(cycle) {
        return cycleToD(basis, cycle)
    }).join(" "), pathInfo)
}

function heckRenderPath(basis, cycles, pathInfo) {
    var adjustedCycles = _.flatten(cycles)
    return svgRender.path(cycleToD(basis, adjustedCycles), pathInfo)
}

function curvedRenderPath(basis, cycles, pathInfo) {
    return svgRender.path(_.map(cycles, function(cycle) {
        var corners = _.zip(cycle, modash.rotated(cycle))
        var initial = cycleFirstPoint(basis, cycle)

        return svgRender.moveTo(initial) + " " +
            _.map(corners, function(corner) {
                return cornerToPathSpline(basis, corner)
            }).join(" ") +
            " " +
            svgRender.lineTo(initial)
    }).join(" "), pathInfo)
}

function cycleFirstPoint(basis, cycle) {
    return alg.midpoint(edgeToPoints(basis, cycle[0]))
}

function cornerToPathSpline(basis, corner) {
    var outerElbowScale = .6
    if (edgesOnSameHex(corner)) return elbowSpline(basis, corner, hm.innerElbowScale(outerElbowScale, 1))
    else return elbowSpline(basis, corner, outerElbowScale)
}

function elbowSpline(basis, corner, scaleFactor) {
    var cPoints = corner.map(function(edge) {return edgeToPoints(basis, edge)})
    var edge0 = hm.shrinkSegment(cPoints[0][0], cPoints[0][1], scaleFactor)
    var edge1 = hm.shrinkSegment(cPoints[1][0], cPoints[1][1], scaleFactor)
    var intersection = alg.lineIntersection(edge0, edge1)

    return svgRender.lineTo(edge0[1]) + " " + svgRender.quadraticBezier(intersection, edge1[0])
}

function edgesOnSameHex(corner) {
    var hex0 = corner[0].owner
    var hex1 = corner[1].owner
    return hex0.x == hex1.x && hex0.y == hex1.y
}


function cycleToD(basis, cycle) {
    var points = _.reduce(cycle, function(acc, edge) {  // TODO: handle cycle endpoints well.
        return acc.concat(edgeToPoints(basis, edge))
    }, [])
    return svgRender.cycle(points)
}

function edgeToPoints(basis, edge) {
    //TODO: change this to be more flexible
    var vs = hm.hexVertices(basis, edge.owner, edge.path.innerScale)
    switch (edge.position) {
        case "upRight":   return [vs[0], vs[1]]  // TODO: give these names.
        case "downRight": return [vs[1], vs[2]]
        case "down":      return [vs[2], vs[3]]
        case "downLeft":  return [vs[3], vs[4]]
        case "upLeft":    return [vs[4], vs[5]]
        case "up":        return [vs[5], vs[0]]
    }
}


// Helpers

function edgeName(hexCoord, position) { // position in relation to hex ("up", "downLeft", etc.)
    return "edge_"+hexCoord.x+"_"+hexCoord.y+"_pos_"+position
}

module.exports = {
    render: render,
    normalRenderPath: normalRenderPath,
    heckRenderPath: heckRenderPath,
    curvedRenderPath: curvedRenderPath
}