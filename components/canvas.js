var hex = require('../libs/math/hex')
var basic = require('../libs/math/basic')
var g = require('../libs/grid')
var pLib = require('../libs/path')
var _ = require('lodash')
var svgRender = require('../libs/render/svg-render')
var hexRender = require('../libs/render/hex-render')
var noQuery = require('../libs/no-query')


var mouseDown = false;
var previousMouseMoveCoords = null

module.exports = function main (element, grid, basis, pathSettings) {

    element.onmousedown = function() {   // TODO: make more robust
        mouseDown = true
    }
    document.body.onmouseup = function() {
        mouseDown = false
        previousMouseMoveCoords = null
    }


    element.addEventListener("mousemove", mouseMoveHandler(element, grid, basis, pathSettings))
    element.addEventListener("click", clickHandler(element, grid, basis, pathSettings))

    //TODO: hack : delete this:
    var downloadAnchor = document.getElementById("downloader-anchor")
    document.getElementById("downloader-preparer").addEventListener("click", function(event) {
        svgHref(downloadAnchor, svgString(grid, basis))
    })

    return {
        render: function () { return render(element, grid, basis) }
    }    
}


function clickHandler(element, grid, basis, pathSettings) {
    return function (event) {
        var hexCoords = mouseEventHexCoords(basis, event)
        g.addHexToPath(grid, pathSettings.current, hexCoords)
        render(element, grid, basis)
        console.log("grid", grid)
    }
}

function mouseMoveHandler(element, grid, basis, pathSettings) {
    return function (event) {
        if (!mouseDown) return
        else {
            var mouseCoords = mouseEventCoords(event)
            var hexCoords = mouseEventHexCoords(basis, event)
            if (g.isHexInPath(grid, pathSettings.current, hexCoords)) return 
            else if (!previousMouseMoveCoords) {
                g.addHexToPath(grid, pathSettings.current, hexCoords)
                render(element, grid, basis)
                previousMouseMoveCoords = mouseCoords
            }
            else {
                addLineOfHexes(grid, pathSettings.current, basis, previousMouseMoveCoords, mouseCoords)
                render(element, grid, basis)
                previousMouseMoveCoords = mouseCoords
            }
            
        }
    }
}

function addLineOfHexes(grid, path, basis, initialCoords, finalCoords) {
    var numPoints = basic.pythagorean(basis.v1.x, basis.v1.y)  //TODO: better interpolation estimate
    var coords = basic.interpolatedSegment(initialCoords, finalCoords, numPoints)
    coords.map(function(coord) {
        var c = hex.whichHex(basis, coord)
        g.addHexToPath(grid, path, c)
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
    var html = hexRender.render(grid, basis) //svgString(grid, basis)
    element.innerHTML = html
}

//TODO: name better
function svgString(grid, basis) {
    return _.map(grid, function(gNode) {
        var points = hex.hexVertices(basis, gNode.coord)
        return svgRender.polygon(points, gNode.path)
    }).join(" ")
}


//TODO: hack : delete this:
function svgHref(anchor, svgString){
    anchor.setAttribute("download", "test.svg");    
    var url = "data:image/svg+xml;utf8," + encodeURI(wrapSvg(svgString));
    anchor.setAttribute("href", url);
}

function wrapSvg(contentString) {
    // return '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"' +
    // '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    // '<svg viewBox="-450 -450 900 900">' + contentString + "</svg>"

    return '<?xml version="1.0" standalone="no"?> ' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ' +
        '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> ' +
        '<svg viewBox="-450 -450 900 900" version="1.1" ' +
        'xmlns="http://www.w3.org/2000/svg"> ' +
            contentString +
        '</svg>'
}

