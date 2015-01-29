var pLib = require('../libs/path')

module.exports = function main (element, pathSettings) {

    pLib.changeCurrentStrokeWidth(pathSettings, 2)
    console.log("pathSettings", pathSettings.current)
    return {
        render: function() {return }
    }
}