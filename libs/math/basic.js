function euclideanModulus(dividend, divisor) {
    // Javascript % allows for negative remainders.  This function, however, gives a remainder r such 
    // that 0 <= r < divisor
    return ((dividend % divisor) + Math.abs(divisor)) % divisor
}

function pythagorean(a, b) {
    return Math.sqrt(a * a + b * b)
}

function line(slope, yInt) {
    function eval(x) {
        return slope * x + yInt
    }
    return {
        eval: eval
    }
}


function walkLine(p0, p1) {  //from red blob games
    var dx = p1.x-p0.x, dy = p1.y-p0.y;
    var nx = Math.abs(dx), ny = Math.abs(dy);
    var sign_x = dx > 0? 1 : -1, sign_y = dy > 0? 1 : -1;

    var p = {x: p0.x, y: p0.y}
    var points = [{x: p.x, y:p.y}]
    for (var ix = 0, iy = 0; ix < nx || iy < ny;) {
        if ((0.5+ix) / nx < (0.5+iy) / ny) {
            // next step is horizontal
            p.x += sign_x;
            ix++;
        } else {
            // next step is vertical
            p.y += sign_y;
            iy++;
        }
        points.push({x: p.x, y: p.y});
    }
    return points
}


function interpolatedSegment(p0, p1, numPoints) { //from red blob games
    var points = [];
    var N = numPoints
    for (var step = 0; step <= N; step++) {
        var t = N == 0? 0.0 : step / N;
        points.push(lerpPoint(p0, p1, t));
    }
    return points;
}

function lerpPoint(p0, p1, t) {
    return {
            x: lerp(p0.x, p1.x, t),
            y: lerp(p0.y, p1.y, t)
        }
}

function lerp(start, end, t) {
    return start + t * (end-start);
}

module.exports = {
    euclideanModulus: euclideanModulus,
    line: line,
    pythagorean: pythagorean,
    walkLine: walkLine,
    interpolatedSegment: interpolatedSegment
}