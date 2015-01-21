function svgPoint(point) {
    return point.x + "," + point.y
}

function svgPoints(points) {
    return points.map(function(p) {return svgPoint(p)}).join(" ")
}

function polygon(points, color) {
    return "<polygon pointer-events='none' points='"+svgPoints(points)+"' style='black'/>"
}


module.exports = {
    svgPoints: svgPoints,
    polygon: polygon
}