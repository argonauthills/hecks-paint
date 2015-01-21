var _ = require('lodash')

function newGrid() { return {} }

function addHexToPath(grid, pathsList, path, hexCoord) {
    var name = hexName(hexCoord)
    grid[name] = {
        path: path,
        coord: hexCoord
    }
    if (!isPathInList(pathsList, path)) pathsList[name] = path
    return {grid:grid, pathsList:pathsList}
}

function removeHexFromPath(grid, pathsList, hexCoord) {
    var name = hexName(hexCoord)
    var path = grid[name]
    delete grid[name]
    if (!isPathInGrid(grid, path)) delete pathsList[name] // clean up paths list if path not used; TODO: consider moving to separate function.
    return {grid:grid, pathsList:pathsList}
}

function isHexInPath(grid, path, hexCoord) {
    var name = hexName(hexCoord) 
    if (!grid[name]) return false
    else {
        return grid[name].id == path.id
    }
}


// Helpers

function hexName(coord) {
    return "hex"+coord.x+"_"+coord.y
}

function isPathInList(pathsList, path) {
    if (!path) return false
    else return !!_.find(pathsList, function (p) {return p.id == path.id})
}

function isPathInGrid(grid, path) {
    if (!path) return false
    else return !!_.find(grid, function (gNode) {return gNode.path.id == path.id})
}

module.exports = {
    newGrid: newGrid,
    addHexToPath: addHexToPath,
    removeHexFromPath: removeHexFromPath,
    isHexInPath: isHexInPath
}