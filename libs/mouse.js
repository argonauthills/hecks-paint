var hex = require('./math/hex')

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

module.exports = {
    mouseEventCoords: mouseEventCoords,
    mouseEventHexCoords: mouseEventHexCoords
}