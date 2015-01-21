var hex = require('../libs/math/hex')
var basic = require('../libs/math/basic')
var g = require('../libs/grid')
var _ = require('lodash')
var svgRender = require('../libs/render/svg-render')
var noQuery = require('../libs/no-query')

var pathDetails = {
    color: "black",
    id: "asdf",
}

var mouseDown = false;
var previousMouseMoveCoords = null
document.body.onmousedown = function() { 
    mouseDown = true
}
document.body.onmouseup = function() {
    mouseDown = false
    previousMouseMoveCoords = null
}

module.exports = function main (element, grid, basis, pathsList) {
    element.addEventListener("mousemove", mouseMoveHandler(element, grid, basis, pathsList))
    element.addEventListener("click", clickHandler(element, grid, basis, pathsList))
}


function clickHandler(element, grid, basis, pathsList) {
    return function (event) {
        var hexCoords = mouseEventHexCoords(basis, event)
        g.addHexToPath(grid, pathsList, pathDetails, hexCoords)
        render(element, grid, basis)
    }
}

function mouseMoveHandler(element, grid, basis, pathsList) {
    return function (event) {
        if (!mouseDown) return
        else {
            var mouseCoords = mouseEventCoords(event)
            var hexCoords = mouseEventHexCoords(basis, event)
            if (g.isHexInPath(grid, pathDetails, hexCoords)) return 
            else if (!previousMouseMoveCoords) {
                g.addHexToPath(grid, pathsList, pathDetails, hexCoords)
                render(element, grid, basis)
                previousMouseMoveCoords = mouseCoords
            }
            else {
                addLineOfHexes(grid, pathsList, pathDetails, basis, previousMouseMoveCoords, mouseCoords)
                render(element, grid, basis)
                previousMouseMoveCoords = mouseCoords
            }
            
        }
    }
}

function addLineOfHexes(grid, pathsList, pathDetails, basis, initialCoords, finalCoords) {
    var numPoints = basic.pythagorean(basis.v1.x, basis.v1.y)  //TODO: better interpolation estimate
    var coords = basic.interpolatedSegment(initialCoords, finalCoords, numPoints)
    console.log("coords", coords)
    coords.map(function(coord) {
        var c = hex.whichHex(basis, coord)
        g.addHexToPath(grid, pathsList, pathDetails, c)
    })
}

function mouseEventCoords(event) {
    var width = event.target.offsetWidth
    var height = event.target.offsetHeight
    var x = event.offsetX
    var y = event.offsetY
    return {x: x - width/2, y: y - height/2}
}

function mouseEventHexCoords(basis, event) {
    var point = mouseEventCoords(event)
    return hex.whichHex(basis, point)
}

function render(element, grid, basis) {
    var html = _.map(grid, function(gNode) {
        var points = hex.hexVertices(basis, gNode.coord)
        return svgRender.polygon(points, gNode.path)
    }).join(" ")
    element.innerHTML = html
}


