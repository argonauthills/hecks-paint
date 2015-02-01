var pLib = require('../libs/path')

var size = .75
var scaleFactor = .8
var repeatInterval

module.exports = function main (element, pathSettings) {

    holdDownClickListener(document.getElementById("hex-size-up-button"), function() {return scaleUp(pathSettings)}, 100)
    holdDownClickListener(document.getElementById("hex-size-down-button"), function() {return scaleDown(pathSettings)}, 100)
}

function holdDownClickListener(element, action, time) {
    var t

    element.addEventListener("mousedown", function(event) { repeat() })

    element.addEventListener("mouseup", function(event) { clear() })
    element.addEventListener("mouseleave", function(event) { clear() })

    function repeat() {
        action()
        t = setTimeout(repeat, time)
    }

    function clear() {
        if (!!t) {
            clearTimeout(t)
            t = null
        }
    }
}


function scaleUp(pathSettings) {
    size /= scaleFactor
    pLib.changeAllInnerScales(pathSettings, size)
}

function scaleDown(pathSettings) {
    size *= scaleFactor
    pLib.changeAllInnerScales(pathSettings, size)
}