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

    //TODO: hack : delete this:
    var downloadAnchor = document.getElementById("downloader-anchor")
    document.getElementById("downloader-preparer").addEventListener("click", function(event) {
        svgHref(downloadAnchor, svgString(grid, basis))
    })

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

