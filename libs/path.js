var bm = require('./math/basic')

var paths = [
    path("red"),
    path("orange"),
    path("yellow")
]

function defaultPathList() {
    return {
        current: paths[0],
        paths: paths
    }
}

function defaultPath() {
    return path()
}

function path(fillColor, strokeColor, strokeWidth) {
    return {
        fillColor: fillColor || "black",
        strokeColor: strokeColor || "black",
        strokeWidth: strokeWidth || 1,
        id: bm.randomId()
    }
}

function changeFill(path, color) {
    path.fillColor = color
}

function changeStroke(path, color) {
    path.strokeColor = color
}

module.exports =  {
    changeFill: changeFill,
    changeStroke: changeStroke,
    defaultPathList: defaultPathList
}