var hex = require('../libs/math/hex')
var g = require('../libs/grid')
var _ = require('lodash')
var svgRender = require('../libs/render/svg-render')
var noQuery = require('../libs/no-query')

var pathDetails = {
    color: "black",
    id: "asdf",
}



module.exports = function main (element, grid, basis, pathsList) {
    element.addEventListener("click", clickHandler(element, grid, basis, pathsList))
}


function clickHandler(element, grid, basis, pathsList) {
    return function (event) {
        var hexCoords = mouseEventHexCoords(basis, event)
        g.addHexToPath(grid, pathsList, pathDetails, hexCoords)
        render(element, grid, basis)
    }
}

function mouseEventHexCoords(basis, event) {
    var width = event.target.offsetWidth
    var height = event.target.offsetHeight
    var x = event.offsetX
    var y = event.offsetY
    var point = {x: x - width/2, y: y - height/2}
    return hex.whichHex(basis, point)
}

function render(element, grid, basis) {
    var html = _.map(grid, function(gNode) {
        var points = hex.hexVertices(basis, gNode.coord)
        return svgRender.polygon(points, gNode.path)
    }).join(" ")
    element.innerHTML = html
}


