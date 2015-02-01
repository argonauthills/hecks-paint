var hexRender = require('../libs/render/hex-render')
var svgRender = require('../libs/render/svg-render')
var _ = require('lodash')

module.exports = function(element, grid, basis, pathsList) {
    var downloadAnchor = document.getElementById("downloader-anchor")
    var prepareButton = document.getElementById("downloader-preparer")
    hideElement(downloadAnchor)

    prepareButton.addEventListener("click", function(event) {
        showElement(downloadAnchor)
        svgHref(downloadAnchor, hexRender.render(grid, basis))
        _.delay(function() {
            hideElement(downloadAnchor)
        }, 5000)
    })
    
}

function hideElement(el) {  //TODO move to library
    el.style.display = "none"
}

function showElement(el) {
    el.style.display = ""
}

function svgHref(anchor, svgString){
    anchor.setAttribute("download", "test.svg");    
    var url = "data:image/svg+xml;utf8," + encodeURI(svgRender.wrapSvg(svgString));
    anchor.setAttribute("href", url);
}