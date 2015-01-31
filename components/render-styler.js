var pLib = require('../libs/path')

module.exports = function main (element, pathSettings) {
    
    element.addEventListener("click", clickHandler(pathSettings))
    render(element, pathSettings)

    return {
        render: function() { render(element, pathSettings) }
    }

}

function render(element, pathSettings) {
    // var tools = pathSettings.paths
    // var current = toolSettings.current
    // var html = toolSettings.tools.map(function(tool) {
    //     isSelected = tool.id == current.id
    //     return renderTool(tool, isSelected)
    // }).join(" ")

    // element.innerHTML = html
}

function clickHandler(toolSettings) {
    return function (event) {
        var id = event.target.value || event.target.parentElement.value || null
        if (!!id) tLib.switchTool(toolSettings, id)
    }
}

// function renderTool(tool, isSelected) {
//     var selectedClass = (isSelected) ? "tool-selected" : ""
//     return  "<button class='tool-button " + selectedClass + "' value='"+tool.id+"'>" +
//                 tool.id +

//                 //"<div class='tool-sample' pointer-events='none' style='background-color:"+path.fillColor+"; border-color:"+path.strokeColor+"'></div>"+
//             "</button>"
// }