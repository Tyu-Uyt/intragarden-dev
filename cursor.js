function setCursor(cntParent) {
    setElement(document.body, 'img', 'imgCursor', 'image/png', 'img/ugi/cursor.png', '<NOCLASS>', false, true);
    imgCursor.style.position = 'absolute';
    imgCursor.style.zIndex = 5;
    imgCursor.style.pointerEvents = 'none';
}

window.addEventListener("mouseup", function (e) {
    //let tmp = document.elementFromPoint(intCursorX + intCursorPX, intCursorY + intCursorPY);
    //blnMutex = true;
    //tmp.click();
    imgCursor.style.left = (intCursorPX + intCursorX) + "px";
    imgCursor.style.top = (intCursorPY + intCursorY) + "px";
});


window.addEventListener("mousemove", function (e) {
    intCursorX = e.clientX;
    intCursorY = e.clientY;
    imgCursor.style.left = (intCursorPX + intCursorX) + "px";
    imgCursor.style.top = (intCursorPY + intCursorY) + "px";
});