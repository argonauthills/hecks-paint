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
    var first = _.first(points)
    var rotated = _.rest(points)
    rotated.push(first)
    return moveTo(first) + " " + linearPath(rotated)
}

function polygon(points, color) {
    return "<polygon pointer-events='none' points='"+svgPoints(points)+"' style='black'/>"
}

function path(d, pathInfo) {
    return "<path pointer-events='none' fill-rule='evenodd' fill="+pathInfo.fillColor+" stroke="+pathInfo.strokeColor+" stroke-width="+pathInfo.strokeWidth+" d='"+ d +"'>"
}


module.exports = {
    svgPoints: svgPoints,
    polygon: polygon,
    path: path,
    cycle: cycle
}