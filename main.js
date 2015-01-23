var alg = require('./libs/math/linear-algebra')
var hex = require('./libs/math/hex')
var pLib = require('./libs/path')

var basis = hex.hexBasis(
    alg.vScalarMult({x:20, y:0}, 2),
    alg.vScalarMult({x:10, y:6}, 2)
)

var grid = require('./libs/grid').newGrid()

var pathSettings = pLib.defaultPathList()


var canvas = require('./components/canvas')(document.getElementById("canvas"), grid, basis, pathSettings)

var downloader = require('./components/downloader')(document.getElementById("downloader"), grid, basis, pathSettings)

var paths = require('./components/paths')(document.getElementById("path-list"), pathSettings)

