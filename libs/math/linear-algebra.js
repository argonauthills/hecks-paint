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

/////////////////////////////
// General Geometry /////////
/////////////////////////////

function lineIntersection(line1, line2) {
    var x1 = line1[0].x
    var x2 = line1[1].x
    var x3 = line2[0].x
    var x4 = line2[1].x

    var y1 = line1[0].y
    var y2 = line1[1].y
    var y3 = line2[0].y
    var y4 = line2[1].y

    var denom = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
    var num1 = (x1*y2)-(y1*x2)
    var num2 = (x3*y4)-(y3*x4)

    if (denom == 0) throw new Error("cannot find intersection of parallel lines.")
    return {
        x: (num1*(x3-x4) - num2*(x1-x2)) / denom,
        y: (num1*(y3-y4) - num2*(y1-y2)) / denom,
    }
}

function midpoint(segment) {
    var v1 = segment[0]
    var v2 = segment[1]
    return vAdd(vScalarMult(vSubtract(v1, v2), .5), v2)
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

    lineIntersection: lineIntersection,
    midpoint: midpoint,

    matrix: matrix,
    vectorsToMatrix: vectorsToMatrix,
    det: det,
    mScalarMult: mScalarMult,
    mInverse: mInverse,
    applyMatrix: applyMatrix
}