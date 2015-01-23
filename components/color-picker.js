var options = [
    color("red", "red"),
    color("orange", "orange"),
    color("yellow", "yellow")
]


module.exports = function main (element) {
    element
}



function color(hexValue, alias) {
    return {hexValue: hexValue, alias: alias}
}