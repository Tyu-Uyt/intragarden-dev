function startBattle() {
    // Set to battle mode
    intMode = 2;

    // Describe controls for battle
    setElement(document.body, 'label', 'lblFooterBattle', '', '[Esc]: Back to world | [Spacebar]: Jump | [←]: Go left | [→]: Go right | [↓]: Crouch', 'footer', true, false); 

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
                background: 'url("img/bg/battle/0/bg.png")',
                upperground: 'url("img/bg/battle/0/base/3.png")',
                ground: 'url("img/bg/battle/0/base/2.png")',
                lowerground: 'url("img/bg/battle/0/base/1.png")',
                fallground: 'url("img/bg/battle/0/base/0.png")',
            }
        }
    }

    // Set a background image on the Body element on-demand
    document.body.style.backgroundImage = objBattle.level[0].background;

    // Set a ground base
    setElement(document.body, 'div', 'cntUpperGround', '', '', '', false, false);
    setElement(document.body, 'div', 'cntGround', '', '', '', false, false);
    setElement(document.body, 'div', 'cntLowerGround', '', '', '', false, false);
    setElement(document.body, 'div', 'cntFallground', '', '', '', false, false);
    cntUpperGround.style.backgroundImage = objBattle.level[0].upperground;
    cntGround.style.backgroundImage = objBattle.level[0].ground;
    cntLowerGround.style.backgroundImage = objBattle.level[0].lowerground;
    cntFallground.style.backgroundImage = objBattle.level[0].fallground;

    // Set a character
    setElement(document.body, 'div', 'cntUser', '', '', '', false, false);
    setElement(cntUser, 'div', 'cntUserBottom', '', '', '', false, false);
    setElement(cntUser, 'img', 'imgUser', 'image/png', objBattle.character.user.base, 'image', false, true);

    // Give the user a coordinate starter
    cntUser.style.transform = 'translateX(20.1vw) translateY(64.1066vh)';

    // On each milisecond, check for updates
    itvBattle = setInterval(function () { setBattleUpdate(objBattle) }, 0);

    // Create a fade effect
    setFade(true);
}

function checkKeys(objBattle, arrUserMovement, arrUserMovementPossibilities) {


    if (arrKeys.includes('Escape')) {
        
        clearInterval(itvBattle);
        setFade(false);
        setTimeout(function() {document.body.style.backgroundImage = '';}, 310);
        setTimeout(function() {setFade(true); startWorld();}, 1000);
    } else {
        if (arrKeys.includes(' ') && !objBattle.user.isOnAir) {
            objBattle.user.isOnAir = true;
            objBattle.user.dblVelocity += 20;
        }
    
        if (arrKeys.includes('ArrowLeft') && arrUserMovementPossibilities[0]) {
            objBattle.user.isFacingRight = false;
    
            arrUserMovement[0] -= 0.5;
            imgUser.src = objBattle.character.user.left.base;
        }
    
        if (arrKeys.includes('ArrowRight') && arrUserMovementPossibilities[1]) {
            objBattle.user.isFacingRight = true;
    
            arrUserMovement[0] += 0.5;
            imgUser.src = objBattle.character.user.right.base;
        }
    
        if (arrKeys.includes('ArrowUp') && arrUserMovementPossibilities[2]) {
            arrUserMovement[1] -= 0.5;
        }

        if (arrKeys.includes('ArrowDown') && arrUserMovementPossibilities[3]) {
            arrUserMovement[1] += 0.5;
        }
    }
}

function setThrow(objBattle, intActionCode) {
    // Action - Which direction are we creating?
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

function boundaries(objBattle, arrUserMovementPossibilities, domUser, domPlatform) {
    if (domUser.left - 20 < 0) {
        arrUserMovementPossibilities[0] = false;
    }

    if (domUser.right + 20 > window.innerWidth) {
        arrUserMovementPossibilities[1] = false;
    }

    if (domUser.top - 10 < domPlatform[0].top) {
        arrUserMovementPossibilities[2] = false;
    }

    if (domUser.bottom - 30 > domPlatform[2].top) {
        arrUserMovementPossibilities[3] = false;
    }
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

    let arrUserMovement = [parseFloat(cntUser.style.transform.split(' ')[0].match(/[-]?\d+\.\d+/)),
    parseFloat(cntUser.style.transform.split(' ')[1].match(/[-]?\d+\.\d+/))];
    let arrUserMovementPossibilities = [true, true, true, true];
    let domUser = cntUserBottom.getBoundingClientRect();
    let domPlatform = [cntUpperGround.getBoundingClientRect(), cntGround.getBoundingClientRect(), cntLowerGround.getBoundingClientRect(), cntFallground.getBoundingClientRect()];

    boundaries(objBattle, arrUserMovementPossibilities, domUser, domPlatform);
    checkKeys(objBattle, arrUserMovement, arrUserMovementPossibilities);

    cntUser.style.transform = 'translateX(' + arrUserMovement[0] + 'vw) translateY(' + arrUserMovement[1] + 'vh)';
}