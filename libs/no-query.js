function eventPosition(mouseEvent) {  // relative to moused element  // TODO: consider removing; probably unnecessary
    var el = mouseEvent.target
    console.log("mouseEvent.target", mouseEvent.target)
    console.log("me", mouseEvent.offsetX, el.offsetX)
    return {
        x: mouseEvent.offsetX - el.offsetLeft,
        y: mouseEvent.offsetY - el.offsetTop
    }
}

module.exports = {
    eventPosition: eventPosition
}