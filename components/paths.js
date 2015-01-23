module.exports = function main (element, pathSettings) {
    
    element.addEventListener("click", clickHandler)

    render(element, pathSettings.paths, pathSettings.current)

}

function render(element, paths, currentPath) {

    var html = paths.map(function(path) {
        isSelected = path.id == currentPath.id
        return renderPath(path, isSelected)
    }).join(" ")

    element.innerHTML = html
}

function clickHandler() {}

function renderPath(path, isSelected) {
    var selectedClass = (isSelected) ? "path-box-selected" : ""
    return  "<div class='path-box " + selectedClass + "'>" +
                "<div class='path-sample' style='background-color:"+path.fillColor+"; border-color:"+path.strokeColor+"'></div>"+
            "</div>"
}