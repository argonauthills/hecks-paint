var alg = require('./linear-algebra')
var basic = require('./basic')

function hexBasis(v1, v2) {
    return {v1: v1, v2: v2}
}

function cartestianToHexGridMatrix(basis) {
    return alg.mInverse(alg.vectorsToMatrix(basis.v1, basis.v2))
}

function cartesianToHexTransformer(basis) {
    var matrix = cartestianToHexGridMatrix(basis)
    return function (point) {
        return alg.applyMatrix(matrix, point)
    }
}

function whichHex(basis, point) {
    var hexP = cartesianToHexTransformer(basis)(point)
    var baseX = Math.floor(hexP.x)
    var baseY = Math.floor(hexP.y)

    if (inHexAboveAndLeft(p)) return {x: baseX + 1, y: baseY + 1}
    else if (inHexToLeft(p)) return {x: baseX + 1, y: baseY }
    else if (inHexAbove(p)) return {x: baseX, y:baseY + 1}
    else return {x: baseX, y: baseY}

    function inHexAbove(p) {
        return p.y >= basic.line(-3/2, 1/2).eval(p.x) &&
        p.y <= basic.line(-3, 2).eval(p.x)
    } 
    function inHexToLeft(p) {
        return p.y >= basic.line(-3, 2).eval(p.x) &&
        p.y <= basic.line(-3/2, 2).eval(p.x)
    }
    function inHexAboveAndLeft(p) {
        return p.y >= basic.line(-3/2, 2).eval(p.x)
    }
}

function hexName(point) {
    return "hex_" + point.x + "_" + point.y
}

module.exports = {
    hexBasis: hexBasis,
    //cartesianToHexTransformer: cartesianToHexTransformer,
    whichHex: whichHex,
    hexName: hexName
}