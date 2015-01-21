///////////////////////////
// Vectors ////////////////
///////////////////////////

function vAdd(v1, v2) {
    return {x:v1.x + v2.x, y:v1.y + v2.y}
}

function vInverse(v) {
    return {x: -v.x, y: -v.y}
}

function vSubtract(v1, v2) {
    return vAdd(v1, vInverse(v2))
}

function vScalarMult(v, scalar) {
    return { x:v.x * scalar, y: v.y * scalar }
}

function vDotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
}

function vProjectOn(v, onVector) {
    var scalar = vDotProduct(v, onVector) / vDotProduct(onVector, onVector)
    return vScalarMult(onVector, scalar)
}

function vReflection(v, reflectOver) {
    var projection = vProjectOn(v, reflectOver)
    var opposite = vSubtract(v, projection)
    return vSubtract(v, vScalarMult(opposite, 2))
}

////////////////////////////
// 2x2 Matrices ////////////
////////////////////////////

function matrix (a, b, c, d) {
    return {a:a, b:b, c:c, d:d}
}

function vectorsToMatrix(v1, v2) {
    // return matrix(v1.x, v1.y, v2.x, v2.y)
    return matrix(v1.x, v2.x, v1.y, v2.y)
}

function det(m) {
    return m.a * m.d - m.c * m.b
}

function mScalarMult(m, scalar) {
    return matrix(m.a * scalar, m.b * scalar, m.c * scalar, m.d * scalar)
}

function mInverse(m) {
    var scalar = 1 / det(m)
    var mPrime = matrix(m.d, -m.b, -m.c, m.a)
    return mScalarMult(mPrime, scalar)
}

function applyMatrix(m, v) {
    return {
        x: m.a * v.x + m.b * v.y,
        y: m.c * v.x + m.d * v.y
    }
}



module.exports = {
    vAdd: vAdd,
    vInverse: vInverse,
    vSubtract: vSubtract,
    vScalarMult: vScalarMult,
    vDotProduct: vDotProduct,
    vProjectOn: vProjectOn,
    vReflection: vReflection,

    matrix: matrix,
    vectorsToMatrix: vectorsToMatrix,
    det: det,
    mScalarMult: mScalarMult,
    mInverse: mInverse,
    applyMatrix: applyMatrix
}