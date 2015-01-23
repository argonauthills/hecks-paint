var bm = require('./math/basic')
var _ = require('lodash')

var paths = [
    path("red"),
    path("orange", "red"),
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


// ACTIONS ON PATHLIST

function setCurrentPath(pathList, path) {
    //var !!_.find(pathList.paths, function(p) { return p.id == path.id})  // do something to add paths we don't currently have in list
    pathList.current = path
}

function changeCurrentFill(pathList, color) {
    if (!!pathList.current) changeFill(pathList.current, color)
}

function changeCurrentStroke(pathList, color) {
    if (!!pathList.current) changeStroke(pathList.current, color)
}

function getPath(pathList, id) {
    return _.find(pathList.paths, function(p) {return p.id == id})
}

// ACTIONS ON PATHS

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
    getPath: getPath,
    setCurrentPath: setCurrentPath,
    changeCurrentFill: changeCurrentFill,
    changeCurrentStroke: changeCurrentStroke,
    changeFill: changeFill,
    changeStroke: changeStroke,
    defaultPathList: defaultPathList
}