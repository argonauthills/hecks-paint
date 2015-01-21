var alg = require('./linear-algebra')
var basic = require('./basic')

function hexBasis(v1, v2) {
    return {v1: v1, v2: v2}
}

function hexToCartesianMatrix(basis) {
    return alg.vectorsToMatrix(basis.v1, basis.v2)
}

function cartesianToHexGridMatrix(basis) {
    return alg.mInverse(hexToCartesianMatrix(basis))
}

function cartesianToHexTransformer(basis) {
    var matrix = cartesianToHexGridMatrix(basis)
    console.log("matrix", matrix)
    return function (point) {
        return alg.applyMatrix(matrix, point)
    }
}

function hexToCartesianTransformer(basis) {
    var matrix = hexToCartesianMatrix(basis)
    return function (point) {
        return alg.applyMatrix(matrix, point)
    }
}

function whichHex(basis, point) {
    var hexP = cartesianToHexTransformer(basis)(point)
    var baseX = Math.floor(hexP.x)
    var baseY = Math.floor(hexP.y)
    var remainderX = basic.euclideanModulus(hexP.x, 1)
    var remainderY = basic.euclideanModulus(hexP.y, 1)
    var p = {x:remainderX, y:remainderY}

    if (inHexAboveAndLeft(p)) return {x: baseX + 1, y: baseY + 1}
    else if (inHexToLeft(p)) return {x: baseX + 1, y: baseY}
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

function hexVerticesCenteredOnOrigin(basis) { //in screen coordinates
    var radius = alg.vScalarMult(basis.v1, 1/3)
    var halfRadius = alg.vScalarMult(radius, 1/2)
    var upInradius = alg.vSubtract(basis.v2, alg.vProjectOn(basis.v2, basis.v1))

    var out = radius
    var up = alg.vAdd(halfRadius, upInradius)
    var down = alg.vSubtract(halfRadius, upInradius)
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