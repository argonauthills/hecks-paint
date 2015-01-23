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
var colors = require('./components/color-picker')(document.getElementById('color-picker'), pathSettings)
var paths = require('./components/paths')(document.getElementById("path-list"), pathSettings)


pLib.addSubscribedCallback(pathSettings, canvas.render)
pLib.addSubscribedCallback(pathSettings, colors.render)
pLib.addSubscribedCallback(pathSettings, paths.render)
