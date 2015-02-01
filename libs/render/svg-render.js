var _ = require('lodash')

function svgPoint(point) {
    return point.x + ',' + point.y
}

function svgPoints(points) {
    return points.map(function(p) {return svgPoint(p)}).join(' ')
}

function moveTo(point) {
    return 'M' + svgPoint(point)
}

function lineTo(point) {
    return 'L' + svgPoint(point)
}

function linearPath(points) {
    return 'L' + svgPoints(points)
}

function quadraticBezier(control, endpoint) {
    return 'Q' + svgPoint(control) + ' ' + svgPoint(endpoint)
}

function smoothQuadraticBezier(endpoint) {
    return 'T' + svgPoint(endpoint)
}

function cycle(points) {
    var first = _.first(points)
    var rotated = _.rest(points)
    rotated.push(first)
    return moveTo(first) + ' ' + linearPath(rotated)
}

function polygon(points, color) {
    return '<polygon pointer-events="none" points="'+svgPoints(points)+'" style="black"/>'
}

function path(d, pathInfo) {
    return '<path pointer-events="none" fill-rule="evenodd" fill="'+pathInfo.fillColor+'" stroke="'+pathInfo.strokeColor+'" stroke-width="'+pathInfo.strokeWidth+'" stroke-linecap="round" d="'+ d +'"/>'
}

function wrapSvg(contentString) {
    return '<?xml version="1.0" standalone="no"?> ' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ' +
        '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> ' +
        '<svg viewBox="-450 -450 900 900" version="1.1" ' +
        'xmlns="http://www.w3.org/2000/svg"> ' +
            '<rect x="-450" y="-450" height="900" width="900" fill="#333333" stroke="#333333"/>' +
            contentString +
        '</svg>'
}


module.exports = {
    svgPoints: svgPoints,
    polygon: polygon,
    path: path,
    cycle: cycle,
    quadraticBezier: quadraticBezier,
    smoothQuadraticBezier: smoothQuadraticBezier,
    lineTo: lineTo,
    moveTo: moveTo,
    wrapSvg: wrapSvg
}