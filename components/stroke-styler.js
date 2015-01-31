var pLib = require('../libs/path')

module.exports = function main (element, pathSettings) {

    pLib.changeCurrentStrokeWidth(pathSettings, 2)
    return {
        render: function() {return }
    }
}