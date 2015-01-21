var alg = require('./libs/math/linear-algebra')
var hex = require('./libs/math/hex')

var basis = hex.hexBasis(
    {x:100, y:0},
    {x:50, y:100}
)

var grid = require('./libs/grid').newGrid()

var canvas = require('./components/canvas')(document.getElementById("canvas"), grid, basis)

