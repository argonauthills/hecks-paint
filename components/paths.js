var pLib = require('../libs/path')
var events = require('../libs/events')

module.exports = function main (element, pathSettings) {
    
    element.addEventListener("click", clickHandler(pathSettings))

    events.pathAlteredListener(element, function() {render(element, pathSettings.paths, pathSettings.current)})

    render(element, pathSettings.paths, pathSettings.current)

}

function render(element, paths, currentPath) {

    var html = paths.map(function(path) {
        isSelected = path.id == currentPath.id
        return renderPath(path, isSelected)
    }).join(" ")

    element.innerHTML = html
}

function clickHandler(pathSettings) {
    return function (event) {
        var id = event.target.value || event.target.parentElement.value || null
        if (!!id) {
            var path = pLib.getPath(pathSettings, id)
            pLib.setCurrentPath(pathSettings, path)
        }
    }
}

function renderPath(path, isSelected) {
    var selectedClass = (isSelected) ? "path-box-selected" : ""
    return  "<button class='path-button " + selectedClass + "' value='"+path.id+"'>" +
                "<div class='path-sample' pointer-events='none' style='background-color:"+path.fillColor+"; border-color:"+path.strokeColor+"'></div>"+
            "</button>"
}