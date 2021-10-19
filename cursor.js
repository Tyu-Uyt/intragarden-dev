function setCursor() {
    setElement(document.body, 'img', 'imgCursor', 'image/png', 'img/ugi/cursor.png', '<NOCLASS>', false, true);
    imgCursor.style.position = 'absolute';
    imgCursor.style.zIndex = 5;
    imgCursor.style.pointerEvents = 'none';
}

window.addEventListener("mouseup", function (e) {
    if (intMode == 3) {
        let elmTmp = document.elementFromPoint(intCursorX + intCursorPX, intCursorY + intCursorPY);
        elmTmp.click();
    }

    blnMouseDown = false;
    imgCursor.style.left = (intCursorPX + intCursorX) + "px";
    imgCursor.style.top = (intCursorPY + intCursorY) + "px";
});

window.addEventListener("mousedown", function (e) {

    if (!blnMouseDown) {
        blnMouseDown = true;
        setLoggedCursorPos();
    }

});

function setLoggedCursorPos() {
    intCursorLoggedX = intCursorX;
    intCursorLoggedY = intCursorY;
}

function reverseNumbers(blnPositive, intNumber) {
    if (blnPositive) {
        return -Math.abs(intNumber);
    } else {
        return Math.abs(intNumber);
    }
}

function checkCollision(char, SPEED) {
    let childrens = cntWorldBaseCollision.children;
    let tenantDOM = imgWorldTenant.getBoundingClientRect();

    for (let i = 0; i < childrens.length; i++) {
        let childrenElement = document.getElementById(childrens[i].id);
        let childrenDOM = childrenElement.getBoundingClientRect();

        if (childrens[i].id.substring(9) == 'C') {
            if (tenantDOM.top < childrenDOM.bottom) {
                char[1] += SPEED;
            } else if (tenantDOM.bottom > childrenDOM.top) {
                char[1] += -SPEED;
            }

            if (tenantDOM.left < childrenDOM.right) {
                char[0] += SPEED;
            } else if (tenantDOM.right > childrenDOM.left) {
                char[0] += -SPEED;
            }
        }
    }
}

function checkDirection(char, charMov, directions, degrees, SPEED) {
    if (degrees >= 0 && degrees <= 30) {
        char[1] += SPEED;
        directions[1] = true;
    } else if (degrees >= 30 && degrees <= 60) {
        if (charMov[0] > 0) {
            char[0] += SPEED;
            directions[3] = true;
        } else {
            char[0] += -SPEED;
            directions[2] = true;
        }
        char[1] += SPEED;
        directions[1] = true;
    } else if (degrees >= 60 && degrees <= 120) {
        if (charMov[0] > 0) {
            char[0] += SPEED;
            directions[3] = true;
        } else {
            char[0] += -SPEED;
            directions[2] = true;
        }
    } else if (degrees >= 120 && degrees <= 150) {
        if (charMov[0] > 0) {
            char[0] += SPEED;
            directions[3] = true;
        } else {
            char[0] += -SPEED;
            directions[2] = true;
        }
        char[1] += -SPEED;
        directions[0] = true;
    } else {
        char[1] += -SPEED;
        directions[0] = true;
    }
}

function setCharImg(directions) {
    if (directions[0]) {
        if (directions[2]) {
            imgWorldTenant.src = 'img/char/tenant/world/ul.png';
        } else if (directions[3]) {
            imgWorldTenant.src = 'img/char/tenant/world/ur.png';
        } else {
            imgWorldTenant.src = 'img/char/tenant/world/u.png';
        }
    } else if (directions[1]) {
        if (directions[2]) {
            imgWorldTenant.src = 'img/char/tenant/world/dl.png';
        } else if (directions[3]) {
            imgWorldTenant.src = 'img/char/tenant/world/dr.png';
        } else {
            imgWorldTenant.src = 'img/char/tenant/world/d.png';
        }
    } else if (directions[2]) {
        imgWorldTenant.src = 'img/char/tenant/world/l.png';
    } else {
        imgWorldTenant.src = 'img/char/tenant/world/r.png';
    }
}

window.addEventListener("mousemove", function (e) {

    intCursorX = e.clientX;
    intCursorY = e.clientY;
    imgCursor.style.left = (intCursorPX + intCursorX) + "px";
    imgCursor.style.top = (intCursorPY + intCursorY) + "px";

    if (blnMouseDown && intMode == 3) {
        const DEADZONE = 3;
        const RESET_POINT = 3;
        const SPEED = 1;

        let directions = [false, false, false, false];
        let char = [parseInt(imgWorldTenant.style.transform.split(' ')[0].match(/[-]?\d+/)),
        parseInt(imgWorldTenant.style.transform.split(' ')[1].match(/[-]?\d+/))];
        let charMov = [intCursorX - intCursorLoggedX, intCursorY - intCursorLoggedY];
        let radian = Math.acos(charMov[1] /
            (Math.sqrt(Math.pow(charMov[0], 2) + Math.pow(charMov[1], 2) * Math.sqrt(Math.pow(0, 2) + Math.pow(1, 2)))));
        let degrees = radian * (180 / Math.PI);

        if ((charMov[0] >= DEADZONE || charMov[0] <= -DEADZONE) ||
            (charMov[1] >= DEADZONE || charMov[1] <= -DEADZONE)) {

            checkDirection(char, charMov, directions, degrees, SPEED);
            checkCollision(char, SPEED);
            setCharImg(directions);

            imgWorldTenant.style.transform = 'translateX(' + char[0] + 'px) translateY(' + char[1] + 'px)';

            if (intCursorDownCounter > RESET_POINT) {
                intCursorDownCounter = 0;
                setLoggedCursorPos();

            } else {
                intCursorDownCounter += 1;
            }
        }
    }
});
