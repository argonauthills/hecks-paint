var alg = require('./linear-algebra')
var basic = require('./basic')

function hexBasis(v1, v2) {
    return {v1: v1, v2: v2}
}

function cartesianToHexGridMatrix(basis) {
    return alg.mInverse(alg.vectorsToMatrix(basis.v1, basis.v2))
}

function cartesianToHexTransformer(basis) {
    var matrix = cartesianToHexGridMatrix(basis)
    return function (point) {
        return alg.applyMatrix(matrix, point)
    }
}

function hexToCartesianTransformer(basis) {
    var matrix = alg.vectorsToMatrix(alg.vScalarMult(basis.v1, 1), alg.vScalarMult(basis.v2, 1))
    return function (point) {
        return alg.applyMatrix(matrix, point)
    }
}

function whichHex(basis, point) {
    var hexP = cartesianToHexTransformer(basis)(point)
    var baseX = Math.floor(hexP.x)
    var baseY = Math.floor(hexP.y)

    if (inHexAboveAndLeft(hexP)) return {x: baseX + 1, y: baseY + 1}
    else if (inHexToLeft(hexP)) return {x: baseX + 1, y: baseY }
    else if (inHexAbove(hexP)) return {x: baseX, y:baseY + 1}
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

function hexVerticesCenteredOnOrigin(basis) { //in screen coordinates
    var radius = alg.vScalarMult(basis.v1, 1/3)
    var halfRadius = alg.vScalarMult(radius, 1/2)
    var upInradius = alg.vSubtract(basis.v2, alg.vProjectOn(basis.v2, basis.v1))

    var out = radius
    var up = alg.vAdd(halfRadius, upInradius)
    var down = alg.vSubtract(halfRadius, upInradius)
    console.log("basis", basis, out, up, down)

    return [up, out, down, alg.vInverse(up), alg.vInverse(out), alg.vInverse(down)]
}

function hexVertices(basis, hexPoint) {
    var translation = hexToCartesianTransformer(basis)(hexPoint)
    return hexVerticesCenteredOnOrigin(basis).map(function (v) {
       return alg.vAdd(v, translation) 
    })
}

module.exports = {
    hexBasis: hexBasis,
    hexVertices: hexVertices,
    //cartesianToHexTransformer: cartesianToHexTransformer,
    whichHex: whichHex
}