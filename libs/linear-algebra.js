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
    return vectorAdd(v1, inv(v2))
}

function vScalarMult(v, scalar) {
    return { x:v.x * scalar, y: v.y * scalar }
}

////////////////////////////
// 2x2 Matrices ////////////
////////////////////////////

function matrix (a, b, c, d) {
    return {a:a, b:b, c:c, d:d}
}

function vectorsToMatrix(v1, v2) {
    return matrix(v1.x, v1.y, v2.x, v2.y)
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



module.exports = {
    vAdd: vAdd,
    vInverse: vInverse,
    vSubtract: vSubtract,
    vScalarMult: vScalarMult,

    matrix: matrix,
    vectorsToMatrix: vectorsToMatrix,
    det: det,
    mScalarMult: mScalarMult,
    mInverse, mInverse,
}