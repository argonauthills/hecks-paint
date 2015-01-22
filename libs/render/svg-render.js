var _ = require('lodash')

function svgPoint(point) {
    return point.x + "," + point.y
}

function svgPoints(points) {
    return points.map(function(p) {return svgPoint(p)}).join(" ")
}

function moveTo(point) {
    return "M" + svgPoint(point)
}

function linearPath(points) {
    return "L" + svgPoints(points)
}

function cycle(points) {
    console.log("points", points)
    return moveTo(_.first(points)) + linearPath(_.rest(points))
}

function polygon(points, color) {
    return "<polygon pointer-events='none' points='"+svgPoints(points)+"' style='black'/>"
}

function path(d) {
    return "<path pointer-events='visible-painted' fill-rule='evenodd' d='"+ d +"'>"
}


module.exports = {
    svgPoints: svgPoints,
    polygon: polygon,
    path: path,
    cycle: cycle
}