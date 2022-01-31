function startBattle() {
    // Set to battle mode
    intMode = 2;

    // Set necessary values
    objBattle = {
        info: {
            isCutscene: false,
        },
        user: {
            isAlive: true,
            isOnAir: false,
            isCrouching: false,
            isHit: false,
            isFacingRight: true,
            isThrowsCooling: false,
            cameFromCrouching: false,
            intTimeInAir: 0,
            dblVelocity: 0,
            arrThrows: []
        },
        foe: {
            isAlive: true,
        },
        character: {
            user: {
                base: 'img/char/gilbert/battle/normal.png',
                left: {
                    base: 'img/char/gilbert/battle/left/normal.png'
                },
                right: {
                    base: 'img/char/gilbert/battle/right/normal.png'
                },
                crouch: {
                    left: {
                        base: 'img/char/gilbert/battle/crouch/left/normal.png'
                    },
                    right: {
                        base: 'img/char/gilbert/battle/crouch/right/normal.png'
                    }
                }
            },
        },
        level: {
            0: {
                background: 'url("img/bg/battle/playground/bg.png")',
                ground: 'url("img/bg/battle/playground/base/tl.png")'
            }
        }
    }

    // Set a background image on the Body element on-demand
    document.body.style.backgroundImage = objBattle.level[0].background;

    // Set a ground base
    setElement(document.body, 'div', 'cntGround', '', '', '', false, false);
    cntGround.style.backgroundImage = objBattle.level[0].ground;

    // Set a character
    setElement(document.body, 'img', 'imgUser', 'image/png', objBattle.character.user.base, 'image', false, true);

    // Give the user a coordinate starter
    imgUser.style.transform = 'translateX(20.1vw) translateY(64.1066vh)';

    // On each milisecond, check for updates
    setInterval(function () { setBattleUpdate(objBattle) }, 1);

    // Create a fade effect
    setFade(true);
}

function checkKeys(objBattle, arrUserMovement) {



    if (arrKeys.includes(' ') && !objBattle.user.isOnAir) {
        objBattle.user.isOnAir = true;
        objBattle.user.dblVelocity += 20;
    }

    if (arrKeys.includes('ArrowLeft')) {
        objBattle.user.isFacingRight = false;

        arrUserMovement[0] -= 0.5;
        imgUser.src = objBattle.character.user.left.base;
    }

    if (arrKeys.includes('ArrowRight')) {
        objBattle.user.isFacingRight = true;

        arrUserMovement[0] += 0.5;
        imgUser.src = objBattle.character.user.right.base;
    }

    if (arrKeys.includes('ArrowDown') && !objBattle.user.isOnAir) {
        objBattle.user.isCrouching = true;

        if (objBattle.user.isFacingRight) {
            imgUser.src = objBattle.character.user.crouch.right.base;
        } else {
            imgUser.src = objBattle.character.user.crouch.left.base;
        }
    } else if (!arrKeys.includes('ArrowDown') && objBattle.user.isCrouching) {
        objBattle.user.isCrouching = false;
        objBattle.user.cameFromCrouching = true;

        if (objBattle.user.isFacingRight) {
            imgUser.src = objBattle.character.user.right.base;
        } else {
            imgUser.src = objBattle.character.user.left.base;
        }
    }

    if ((arrKeys.includes('z') || arrKeys.includes('ArrowUp')) && !objBattle.user.isThrowsCooling) {
        if (arrKeys.includes('ArrowUp')) {
            setThrow(objBattle, 0);
        } else {
            if (objBattle.user.isFacingRight) {
                setThrow(objBattle, 2);
            } else {
                setThrow(objBattle, 1);
            }
        }
    }
}

function setThrow(objBattle, intActionCode) {
    // Action - Which directio are we creating?
    // 0 - Upper
    // 1 - Left
    // 2 - Right

    let strAbbreviation = '';

    if (intActionCode == 0) {
        strAbbreviation = 'U';
    } else if (intActionCode == 1) {
        strAbbreviation = 'L';
    } else {
        strAbbreviation = 'R';
    }

    objBattle.user.arrThrows.push(setElement(imgUser, 'img', objBattle.user.arrThrows.length + strAbbreviation, 'image/png', '<IMAGE>', 'image', false, true));
    objBattle.user.isThrowsCooling = true;
    setTimeout(function () { objBattle.user.isThrowsCooling = false; }, 500);
}

function isOffscreen(domObject) {
    if (domObject.left >= window.innerWidth ||
        domObject.right <= 0 ||
        domObject.bottom <= 0 ||
        domObject.top >= window.innerHeight) {
        return true;
    }
    return false;
}

function setBattleUpdate(objBattle) {
    const TIME_STEP = 1;
    const ACCELERATION = 1;

    let arrUserMovement = [parseFloat(imgUser.style.transform.split(' ')[0].match(/[-]?\d+\.\d+/)),
    parseFloat(imgUser.style.transform.split(' ')[1].match(/[-]?\d+\.\d+/))];
    let domUser = imgUser.getBoundingClientRect();
    let domGround = cntGround.getBoundingClientRect();

    checkKeys(objBattle, arrUserMovement);

    if (objBattle.user.isOnAir) {
        // Add a counter in air
        objBattle.user.intTimeInAir += TIME_STEP;

        // Calculate the future falling
        domUser.y -= 1 * (objBattle.user.dblVelocity + TIME_STEP * ACCELERATION / 2);

        // Based on the future Y, is the future bottom go beyond the ground?
        if (domUser.bottom > domGround.top) {
            // Adjust the future Y to even with the ground
            domUser.y = domGround.top - domUser.height;

            // Clean-up
            objBattle.user.isOnAir = false;
            objBattle.user.intTimeInAir = 0;
            objBattle.user.dblVelocity = 0;
        } else {
            // Calculate the new velocity
            objBattle.user.dblVelocity -= TIME_STEP * ACCELERATION;
        }

        // Convert Y coordinates to Viewpoint Height
        let dblUserVH = domUser.y / (window.innerHeight * 0.01);

        // Apply the Viewpoint Height to the movement
        arrUserMovement[1] += dblUserVH - arrUserMovement[1];
    } else if (objBattle.user.isCrouching) {
        if (domUser.bottom < domGround.top) {
            domUser.y = domGround.top - domUser.height;

            // Convert Y coordinates to Viewpoint Height
            let dblUserVH = domUser.y / (window.innerHeight * 0.01);

            // Apply the Viewpoint Height to the movement
            arrUserMovement[1] += dblUserVH - arrUserMovement[1];
        }
    } else if (objBattle.user.cameFromCrouching) {

        objBattle.user.cameFromCrouching = false;
        // TODO Get Gilbert to get back up.
        domUser.y -= domUser.height - 1

        // Convert Y coordinates to Viewpoint Height
        let dblUserVH = domUser.y / (window.innerHeight * 0.01);

        // Apply the Viewpoint Height to the movement
        arrUserMovement[1] += dblUserVH - arrUserMovement[1];
    }

    if (objBattle.user.arrThrows.length > 0) {
        for (let intIndex = 0; intIndex < objBattle.user.arrThrows.length; intIndex++) {
            let strID = objBattle.user.arrThrows[intIndex].id;
            let strAbbreviation = strID.charAt(strID.length - 1);
            let domThrowee = objBattle.user.arrThrows[intIndex].getBoundingClientRect();

            if (isOffscreen(domThrowee)) {
                objBattle.user.arrTrhows.splice(intIndex, 1);
            } else {
                switch (strAbbreviation) {
                    case 'U':
                        break;
                    case 'L':
                        domThrowee.x -= 5;
                        break;
                    default:

                }
            }
        }
    }

    imgUser.style.transform = 'translateX(' + arrUserMovement[0] + 'vw) translateY(' + arrUserMovement[1] + 'vh)';
}