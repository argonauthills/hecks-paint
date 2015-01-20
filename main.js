var alg = require('./libs/math/linear-algebra')
var hex = require('./libs/math/hex')


var grid = require('./libs/grid').newGrid()

var canvas = require('./components/canvas')(document.getElementById("canvas"), grid)

// Listeners

