var bm = require('./math/basic')

function defaultPath() {
    return {
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 1,
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
    defaultPath: defaultPath,
    changeFill: changeFill,
    changeStroke: changeStroke
}