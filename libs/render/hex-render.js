var hm = require('../math/hex')
var g = require('../grid')
var _ = require('lodash')


// function groupEdgesByPath (grid) {
//     var groupedHexes = groupHexesByPath(grid)
//     return _.mapValues(groupedHexes, function(group) {
//         return getEdgesFromHexes(grid, group)
//     })
// }

// function hexesFromNodes(gNodes) {
//     return _.pluck(gNodes, "coord")
// }

// function groupHexesByPath (grid) {
//     var groupedNodes = _.groupBy(grid, function(gNode) { return gNode.path.id })
//     return _.mapValues(groupedNodes, function(nodes) { return hexesFromNodes(nodes)})
// }

// function getEdgesFromHexes(grid, hexes) { //array of coords
//     return _.reduce(hexes, function(acc, coord) {
//         return acc.concat(getEdgesFromHex(grid, coord)) 
//     }, [])
// }


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
    return _.map(hexes, function (hex) {
        return getEdgesFromHex(grid, hex)
    })
}

function getEdgesFromHex(grid, hexCoord) {
    var neighbors = hexMath.adjacentHexes(hexCoord)
    var path = g.hexPathInfo(grid, hexCoord)

    var edgyNeighbors = _.filter(neighbors, function (neighbor){
        var neighborInfo = g.hexPathInfo(grid, neighbor.coord)
        if (!neighborInfo) return true  // is edge if adjacent to background
        else if (neighborInfo.id != path.id) return true  // is edge if different path
        else return false
    }))
    
    return _.map(edgyNeighbors, function(neighbor) {
        return {
            id: edgeName(hexCoord, neighbor.position),
            owner: hexCoord,
            position: neighbor.position,
            path: path,
            pathId: path.id
        }
    }
}


// FORM CYCLES

function edgeCycles(edges) {
    var checklist = edgeChecklist(edges)
    var cycles = []
    var currentCycle = []
    _.forEach(edges, function(edge) {
        var options = nextEdgeOptions(edge)
        var opt0 = options[0]
        var opt1 = options[1]

        if (isInChecklist(checklist, opt0) {
            addToCycle( currentCycle, checklist[opt0] )
            removeFromChecklist(checklist, opt0)
        } else if (isInChecklist(checklist, opt1) {
            addToCycle( currentCycle, checklist[opt1] )
            removeFromChecklist(checklist, opt1)
        } else {
            cycles.push(currentCycle)
            currentCycle = []
        }
    })
    return cycles
}

function addToCycle(cycle, edge) {
    return cycle.push(edge)
}

function edgeChecklist(edges) {
    return _.indexBy(edges, function(edgeName) return edgeName), function(edgeName)
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
        case "upRight":   return [ edgeName(pt, "downRight"), edgeName(hm.downRight(p), "up")        ]
        case "downRight": return [ edgeName(pt, "down"),      edgeName(hm.down(p),      "upRight")   ]
        case "down":      return [ edgeName(pt, "downLeft"),  edgeName(hm.downLeft(p),  "downRight") ]
        case "downLeft":  return [ edgeName(pt, "upLeft"),    edgeName(hm.upLeft(p),    "down")      ]
        case "upLeft":    return [ edgeName(pt, "up"),        edgeName(hm.up(p),        "downLeft")  ]
        case "up":        return [ edgeName(pt, "upRight"),   edgeName(hm.upRight(p),   "upLeft")    ]
        default: throw new Error(pos + " is not a valid edge position")
    }
}

// Helpers

function edgeName(hexCoord, position) { // position in relation to hex ("up", "downLeft", etc.)
    "edge_"+hexCoord.x+"_"+hexCoord.y+"_pos_"+position
}



module.exports = {
}