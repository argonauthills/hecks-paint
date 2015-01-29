// mo stuff fo yo dash
var _ = require('lodash')

function rotated(array) {  
    return _.rest(array).concat([_.first(array)])
}

module.exports = {
    rotated: rotated,
}