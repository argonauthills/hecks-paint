var g = require('./grid')
var basic = require('./math/basic')
var hex = require('./math/hex')
var mouse = require('./mouse')
var _ = require('lodash')

function defaultToolList() {
    var tools = [
        drawTool(),
        eraseTool()
    ]
    return {
        current: tools[0],
        tools: tools,
        subscribedCallbacks: []
    }
}

// SUBSCRIPTIONS  // TODO: generalize this from pLib and tLib

function addSubscribedCallback(pathList, callback) {
    pathList.subscribedCallbacks.push(callback)
}

function runSubscriptions(pathList) {
    pathList.subscribedCallbacks.map(function(callback) {callback()})
}

// LIBRARY

function switchTool(toolList, id) {
    var current = _.find(toolList.tools, function(tool) {return id == tool.id})
    if (!current) throw new Error(id + " is not in the toollist.")
    toolList.current = current
    runSubscriptions(toolList)
}



function drawTool() {
    return createTool("draw", drawClickAction, drawDragAction)

    function drawClickAction (event, grid, basis, currentPath) {
        var hexCoords = mouse.mouseEventHexCoords(basis, event)
        g.addHexToPath(grid, currentPath, hexCoords)
    }

    function drawDragAction(event, previousMouseMoveCoords, grid, basis, currentPath) {
        var mouseCoords = mouse.mouseEventCoords(event)
        var hexCoords = mouse.mouseEventHexCoords(basis, event)

        if (!previousMouseMoveCoords) g.addHexToPath(grid, currentPath, hexCoords)
        else addLineOfHexes(grid, currentPath, basis, previousMouseMoveCoords, mouseCoords)
    }
}

function eraseTool() {
    return createTool("erase", eraseClickAction, eraseDragAction) 

    function eraseClickAction(event, grid, basis, currentPath) {
        var hexCoords = mouse.mouseEventHexCoords(basis, event)
        g.removeHexFromPath(grid, currentPath, hexCoords)
    }

    function eraseDragAction(event, previousMouseMoveCoords, grid, basis, currentPath) {
        var mouseCoords = mouse.mouseEventCoords(event)
        var hexCoords = mouse.mouseEventHexCoords(basis, event)

        if (!previousMouseMoveCoords) g.removeHexFromPath(grid, currentPath, hexCoords)
        else removeLineOfHexes(grid, currentPath, basis, previousMouseMoveCoords, mouseCoords)
    }
}


function addLineOfHexes(grid, path, basis, initialCoords, finalCoords) {
    alterLineOfHexes(grid, path, basis, initialCoords, finalCoords, g.addHexToPath)
}

function removeLineOfHexes(grid, path, basis, initialCoords, finalCoords) {
    alterLineOfHexes(grid, path, basis, initialCoords, finalCoords, g.removeHexFromPath)
}

function alterLineOfHexes(grid, path, basis, initialCoords, finalCoords, gridAction) {
    var numPoints = basic.pythagorean(basis.v1.x, basis.v1.y)  //TODO: better interpolation estimate
    var coords = basic.interpolatedSegment(initialCoords, finalCoords, numPoints)
    coords.map(function(coord) {
        var c = hex.whichHex(basis, coord)
        gridAction(grid, path, c)
    })
}

// actions are functions which take (event, grid, basis, currentPath) and perform some action on the grid on that basis.
function createTool(id, canvasClickAction, canvasDragAction) {
    return {
        id: id,
        canvasClickAction: canvasClickAction,
        canvasDragAction: canvasDragAction
    }
}



module.exports = {
    defaultToolList: defaultToolList,
    switchTool: switchTool,
    addSubscribedCallback: addSubscribedCallback

}