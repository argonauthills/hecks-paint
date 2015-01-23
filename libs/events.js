function pathAltered(element) {
    document.dispatchEvent(pathAlteredEvent())
}

function pathAlteredEvent() {
    return new Event("path altered")
}

function pathAlteredListener(element, callback) {
    element.addEventListener("path altered", callback)
}

module.exports = {
    pathAltered: pathAltered,
    pathAlteredEvent: pathAlteredEvent,
    pathAlteredListener: pathAlteredListener
}