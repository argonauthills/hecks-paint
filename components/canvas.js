var hex = require('../libs/math/hex')
var basic = require('../libs/math/basic')
var g = require('../libs/grid')
var pLib = require('../libs/path')
var _ = require('lodash')
var svgRender = require('../libs/render/svg-render')
var hexRender = require('../libs/render/hex-render')
var noQuery = require('../libs/no-query')
var mouse = require('../libs/mouse')


var mouseDown = false;
var previousMouseMoveCoords = null

module.exports = function main (element, grid, basis, pathSettings, tools) {

    element.onmousedown = function() {   // TODO: make more robust; I also don't love this here; see if we can move it into the mouse or tools library.
        mouseDown = true
    }
    document.body.onmouseup = function() {
        mouseDown = false
        previousMouseMoveCoords = null
    }


    element.addEventListener("mousemove", mouseMoveHandler(element, grid, basis, pathSettings, tools))
    element.addEventListener("click", clickHandler(element, grid, basis, pathSettings, tools))

    return {
        render: function () { return render(element, grid, basis) }
    }    
}


function clickHandler(element, grid, basis, pathSettings, tools) {
    return function (event) {
        tools.current.canvasClickAction(event, grid, basis, pathSettings.current)
        render(element, grid, basis)
    }
}

function mouseMoveHandler(element, grid, basis, pathSettings, tools) {
    return function (event) {
        if (!mouseDown) return
        else {
            var mouseCoords = mouse.mouseEventCoords(event)
            tools.current.canvasDragAction(event, previousMouseMoveCoords, grid, basis, pathSettings.current)
            previousMouseMoveCoords = mouseCoords
            render(element, grid, basis)
        }
    }
}

function render(element, grid, basis) {
    var html = hexRender.render(grid, basis)
    element.innerHTML = html
}
