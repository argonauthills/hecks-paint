var pLib = require('../libs/path')

module.exports = function main (element, pathSettings) {
    var size = .75
    var scaleFactor = .8
    document.getElementById("hex-size-up-button").addEventListener("click", function(event) {
        size /= scaleFactor
        pLib.changeAllInnerScales(pathSettings, size)
    })
    document.getElementById("hex-size-down-button").addEventListener("click", function(event) {
        size *= scaleFactor
        pLib.changeAllInnerScales(pathSettings, size)
    })

    // element.addEventListener("click", clickHandler(pathSettings))
}