var alg = require('./libs/math/linear-algebra')
var hex = require('./libs/math/hex')

var basis = hex.hexBasis(
    alg.vScalarMult({x:20, y:0}, 2),
    alg.vScalarMult({x:10, y:8}, 2)
)

var grid = require('./libs/grid').newGrid()
var pathsList = {}

var canvas = require('./components/canvas')(document.getElementById("canvas"), grid, basis, pathsList)

var downloader = require('./components/downloader')(document.getElementById("downloader"), grid, basis, pathsList)

