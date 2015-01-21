var hex = require('../libs/math/hex')

var basis = hex.hexBasis(
    {x:100, y:0},
    {x:50, y:100})

var pathDetails = {
    color: "black",
    id: "asdf",
}



module.exports = function main (element, grid) {
    element.addEventListener("click", clickHandler)
}

function clickHandler(event) {
    var width = event.target.offsetWidth
    var height = event.target.offsetHeight
    var x = event.offsetX
    var y = event.offsetY
    var point = {x: x - width/2, y: y - height/2}
    console.log("hexCoords", hex.whichHex(basis, point))
}
