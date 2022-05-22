function startBattle() {
    // Set to battle mode
    intMode = 2;

    // Describe controls for battle
    setElement(document.body, 'label', 'lblFooterBattle', '', '[Esc]: Back to world | [Spacebar]: Jump | [←]: Go left | [→]: Go right | [↓]: Crouch', 'footer', true, false); 

    // Set necessary values
    objBattle = {
        info: {
            isCutscene: false,
            combinations: [['z'],
                           ['z', 'z'],
                           ['z', 'z', 'z'],
                           ['z', 'x'],
                           ['z', 'x', 'z'],
                           ['x'],
                           ['x', 'x'],
                           ['x', 'x', 'x'],
                           ['x', 'z'],
                           ['x', 'z', 'x'],
                        ],
            combinator: [],
            timers: {
                combinator: null,
                cooldown: null
            }
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
                    base: 'img/char/gilbert/battle/left/normal.png',
                    frames: ['img/char/gilbert/battle/left/basic0.png',
                             'img/char/gilbert/battle/left/basic1.png',]
                },
                right: {
                    base: 'img/char/gilbert/battle/right/normal.png',
                    frames: ['img/char/gilbert/battle/right/basic0.png',
                             'img/char/gilbert/battle/right/basic1.png',]
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
    setElement(document.body, 'div', 'cntPlatform', '', '', '', false, false);
    setElement(cntPlatform, 'div', 'cntUpperGround', '', '', '', false, false);
    setElement(cntPlatform, 'div', 'cntGround', '', '', '', false, false);
    setElement(cntPlatform, 'div', 'cntLowerGround', '', '', '', false, false);
    setElement(cntPlatform, 'div', 'cntFallground', '', '', '', false, false);
    cntUpperGround.style.backgroundImage = objBattle.level[0].upperground;
    cntGround.style.backgroundImage = objBattle.level[0].ground;
    cntLowerGround.style.backgroundImage = objBattle.level[0].lowerground;
    cntFallground.style.backgroundImage = objBattle.level[0].fallground;

    // Set a character
    setElement(document.body, 'div', 'cntUser', '', '', '', false, false);
    setElement(cntUser, 'div', 'cntUserFight', '', '', '', false, false);
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

        checkCombinator('z');
        checkCombinator('x');
    }
}

function checkCombinator(strLetter) {
    if (arrKeys.includes(strLetter) && objBattle.info.timers.cooldown == null) {
        if (objBattle.info.timers.combinator != null) {
            clearTimeout(objBattle.info.timers.combinator);
        }

        objBattle.info.combinator.push(strLetter);
        objBattle.info.timers.cooldown = setTimeout(function() {
            if (arrKeys.includes(strLetter)) {
                objBattle.info.timers.cooldown = setTimeout(arguments.callee, 100);
            } else {
                objBattle.info.timers.cooldown = null;
            }},100);
        objBattle.info.timers.combinator = setTimeout(function() {
            alert(objBattle.info.combinator);
            objBattle.info.combinator = [];}, 1000);
        
    }
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function setCombinations (arrCombinator, arrCombinations) {
    blnCanPass = false;

    for (let i = 0; i < arrCombinations.length; i++) {
        if (arrayEquals(arrCombinator, arrCombinations[i])) {
            blnCanPass = true;
            break;
        }
    }

    if (blnCanPass) {

    }
}

function boundaries(objBattle, arrUserMovementPossibilities, domUser, domPlatform) {
    if (domUser.left - 10 < 0) {
        arrUserMovementPossibilities[0] = false;
    }

    if (domUser.right + 10 > window.innerWidth) {
        arrUserMovementPossibilities[1] = false;
    }

    if (domUser.top - 10 < domPlatform[0].top) {
        arrUserMovementPossibilities[2] = false;
    }

    if (domUser.bottom + 10 > domPlatform[2].bottom) {
        arrUserMovementPossibilities[3] = false;
    }
}

function setBattleUpdate(objBattle) {

    let arrUserMovement = [parseFloat(cntUser.style.transform.split(' ')[0].match(/[-]?\d+\.\d+/)),
    parseFloat(cntUser.style.transform.split(' ')[1].match(/[-]?\d+\.\d+/))];
    let arrUserMovementPossibilities = [true, true, true, true];
    let domUser = cntUserBottom.getBoundingClientRect();
    let domPlatform = [cntUpperGround.getBoundingClientRect(), cntGround.getBoundingClientRect(), cntLowerGround.getBoundingClientRect(), cntFallground.getBoundingClientRect()];

    boundaries(objBattle, arrUserMovementPossibilities, domUser, domPlatform);
    checkKeys(objBattle, arrUserMovement, arrUserMovementPossibilities);

    cntUser.style.transform = 'translateX(' + arrUserMovement[0] + 'vw) translateY(' + arrUserMovement[1] + 'vh)';
}