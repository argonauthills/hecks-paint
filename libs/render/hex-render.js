var hm = require('../math/hex')
var g = require('../grid')
var _ = require('lodash')
var svgRender = require('./svg-render')

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
    var initLength = checklistLength(checklist)
    var cycles = []
    var currentCycle = []
    var currentEdge = arbitraryChecklistItem(checklist)

    while (true) {
        var options = nextEdgeOptions(currentEdge)
        var opt0 = options[0]
        var opt1 = options[1]

        removeFromChecklist(checklist, currentEdge.id)

        if (isInChecklist(checklist, opt0)) {
            currentCycle.push(checklist[opt0])
            currentEdge = checklist[opt0]
        } else if (isInChecklist(checklist, opt1)) {
            currentCycle.push(checklist[opt1])
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

function checklistLength(checklist) {
    return _.keys(checklist).length  // I don't love this length function
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
    return _.map(groupedEdges, function(edges) {
        var cycles = edgeCycles(edges)
        return renderPath(basis, cycles)
    }).join(" ")   
}

function renderPath(basis, cycles) {
    var pathInfo = cycles[0][0].path  // every edge has this information; we just need it from one
    return svgRender.path(_.map(cycles, function(cycle) {
        return cycleToD(basis, cycle)
    }).join(" "), pathInfo)
}

function cycleToD(basis, cycle) {
    var points = _.reduce(cycle, function(acc, edge) {  // TODO: handle cycle endpoints well.
        return acc.concat(edgeToPoints(basis, edge))
    }, [])
    return svgRender.cycle(points)
}

function edgeToPoints(basis, edge) {
    //TODO: change this to be more flexible
    var vs = hm.hexVertices(basis, edge.owner)
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
    render: render
}