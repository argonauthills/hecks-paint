var bm = require('./math/basic')
var _ = require('lodash')
var hexRender = require('./render/hex-render')
var cLib = require('./colors')

var paths = [
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
    randomPath(),
]

function defaultPathList() {
    return {
        current: paths[0],
        paths: paths,
        subscribedCallbacks: []
    }
}

function defaultPath() {
    return path()
}


// SUBSCRIPTIONS

function addSubscribedCallback(pathList, callback) {
    pathList.subscribedCallbacks.push(callback)
}

function runSubscriptions(pathList) {
    pathList.subscribedCallbacks.map(function(callback) {callback()})
}

// ACTIONS ON PATHLIST

function setCurrentPath(pathList, path) {
    //var !!_.find(pathList.paths, function(p) { return p.id == path.id})  // do something to add paths we don't currently have in list
    pathList.current = path
    runSubscriptions(pathList)
}

function addPath(pathList) {
    pathList.paths.push(path("black", "black"))
    runSubscriptions(pathList)
}

function changeCurrentFill(pathList, color) {
    if (!!pathList.current) changeFill(pathList.current, color)
    runSubscriptions(pathList)
}

function changeCurrentStroke(pathList, color) {
    if (!!pathList.current) changeStroke(pathList.current, color)
    runSubscriptions(pathList)
}

function heckMode(pathList) {
    pathList.paths.map(function(path) { path.heckMode = true})
    changeAllRenderFuncs(pathList, hexRender.heckRenderPath)
}

function changeAllRenderFuncs(pathList, func) {
    pathList.paths.map(function(path) {
        path.pathRenderFunc = func
    })
    runSubscriptions(pathList)
}

function changeCurrentRenderFunc(pathList, func) {
    if (!!pathList.current) {
        pathList.current.pathRenderFunc = func
        runSubscriptions(pathList)
    }
}

function getPath(pathList, id) {
    return _.find(pathList.paths, function(p) {return p.id == id})
}

// ACTIONS ON PATHS

function path(fillColor, strokeColor, strokeWidth, renderFunc) {
    return {
        fillColor: fillColor || "black",
        strokeColor: strokeColor || "black",
        strokeWidth: strokeWidth || 1,
        id: bm.randomId(),
        pathRenderFunc: hexRender.normalRenderPath,
        heckMode: false
    }
}

function randomPath() {
    return path(cLib.randomColor(), cLib.randomColor())
}

function changeFill(path, color) {
    path.fillColor = color
}

function changeStroke(path, color) {
    path.strokeColor = color
}

module.exports =  {
    addPath: addPath,
    addSubscribedCallback: addSubscribedCallback,
    runSubscriptions: runSubscriptions,
    getPath: getPath,
    setCurrentPath: setCurrentPath,
    changeCurrentFill: changeCurrentFill,
    changeCurrentStroke: changeCurrentStroke,
    // changeFill: changeFill,
    // changeStroke: changeStroke,
    defaultPathList: defaultPathList,
    heckMode: heckMode
}