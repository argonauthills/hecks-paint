function euclideanModulus(dividend, divisor) {
    // Javascript % allows for negative remainders.  This function, however, gives a remainder r such 
    // that 0 <= r < divisor
    return ((dividend % divisor) + Math.abs(divisor)) % divisor
}

function line(slope, yInt) {
    function eval(x) {
        return slope * x + yInt
    }
    return {
        eval: eval
    }
}

module.exports = {
    euclideanModulus: euclideanModulus
}