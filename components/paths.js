var pLib = require('../libs/path')

var paths = [pLib.defaultPath(), pLib.defaultPath()]
pLib.changeFill(paths[0], "red")
console.log(paths[0])

module.exports = function main (element, children, pathsHolder) {
    
    element.addEventListener("click", clickHandler)

    render(element, paths, paths[1])

}

function render(element, paths, currentPath) {

    var html = paths.map(function(path) {
        isSelected = path.id == currentPath.id
        return renderPath(path, isSelected)
    }).join(" ")

    console.log("html", html, "el", element)

    element.innerHTML = html
}

function clickHandler() {}

function renderPath(path, isSelected) {
    var selectedClass = (isSelected) ? "path-box-selected" : ""
    return  "<div class='path-box " + selectedClass + "'>" +
                "<div class='path-sample' style='background-color:"+path.fillColor+"; border-color:"+path.strokeColor+"'></div>"+
            "</div>"
}