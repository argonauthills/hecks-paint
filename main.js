var alg = require('./libs/math/linear-algebra')
var hex = require('./libs/math/hex')
var pLib = require('./libs/path')
var tLib = require('./libs/tools')


///////////////////
// Global State ///
///////////////////

var basis = hex.hexBasis(
    alg.vScalarMult({x:6, y:0}, 8),  //6
    alg.vScalarMult({x:3, y:Math.sqrt(3)}, 8)
)

var grid = require('./libs/grid').newGrid()

var pathSettings = pLib.defaultPathList(basis)

var toolSettings = tLib.defaultToolList()


///////////////////
// Components /////
///////////////////

var canvas = require('./components/canvas')(document.getElementById("canvas"), grid, basis, pathSettings, toolSettings)

var downloader = require('./components/downloader')(document.getElementById("downloader"), grid, basis, pathSettings)
var colors = require('./components/color-picker')(document.getElementById('color-picker'), pathSettings)
var strokes = require('./components/render-styler')(document.getElementById('stroke-styler'), pathSettings)
var paths = require('./components/paths')(document.getElementById("path-list"), pathSettings)
var tools = require('./components/tools')(document.getElementById("tool-list"), toolSettings)

document.getElementById("heck-mode-button").addEventListener("click", function() {pLib.heckMode(pathSettings)})


////////////////////////////
// state change callbacks //
////////////////////////////

pLib.addSubscribedCallback(pathSettings, canvas.render)
pLib.addSubscribedCallback(pathSettings, colors.render)
pLib.addSubscribedCallback(pathSettings, paths.render)

tLib.addSubscribedCallback(toolSettings, tools.render)
