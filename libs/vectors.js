function add(v1, v2) {
    return {x:v1.x + v2.x, y:v1.y + v2.y}
}

function inv(v) {
    return {x: -v.x, y: -v.y}
}

function sub(v1, v2) {
    return add(v1, inv(v2))
}

module.exports = {
    add: add,
    inv: inv,
    sub: sub
}