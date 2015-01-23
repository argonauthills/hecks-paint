var pLib = require('../libs/path')
var events = require('../libs/events')

var rainbow = [
    color("#CC0E79"),
    color("#FF1212"),
    color("#FF7D12"),
    color("#FFB012"),
    color("#FFD612"),
    color("#FFFF12"),
    color("#A4EE10"),
    color("#0ECC0E"),
    color("#0B9999"),
    color("#1C47AB"),
    color("#411FAF"),
    color("#7514AA")
]

var palette = {
    name: "Heck Fire",
    colors: rainbow
}


module.exports = function main (element, pathSettings) {
    render(element, null, palette)
    element.addEventListener("click", clickHandler(element, pathSettings))
    element.addEventListener("contextmenu", contextmenuHandler(element, pathSettings))

    return {
        render: function() { render(element, null, palette) }
    }
}

function clickHandler(element, pathSettings) {
    return function (event) {
        var hexValue = event.target.value || null
        if (!!hexValue) {
            pLib.changeCurrentFill(pathSettings, hexValue)
            events.pathAltered(element)
        }
    }
}

function contextmenuHandler(element, pathSettings) {
    return function(event) {
        event.preventDefault()
        var hexValue = event.target.value || null
        if (!!hexValue) {
            pLib.changeCurrentStroke(pathSettings, hexValue)
            events.pathAltered(element)
        }
    }
}


function render(element, palettes, palette) {
    element.innerHTML = palette.colors.map(function(color) {return renderColor(color)}).join(" ")
}

function color(hexValue, alias) {
    return {hexValue: hexValue, alias: alias}
}

function renderColor(color) {
    return "<button class='color-button' value="+color.hexValue+" style='background-color:"+color.hexValue+";'></button>"
}