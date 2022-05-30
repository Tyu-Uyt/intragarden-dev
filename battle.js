function startBattle() {
    // Set to battle mode
    intMode = 2;

    // Describe controls for battle
    setElement(document.body, 'label', 'lblFooterBattle', '', '[Esc]: Back to world | [←↑↓→]: Move | [6]: Get knocked', 'footer', true, false); 

    // Set necessary values
    objBattle = {
        characterIndex: 0,
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
            },
            velocity: 0,
        },
        user: {
            health: 100,
            isAlive: true,
            isHit: false,
            isKnocked: false,
            isFacingRight: true,
            isFinishingFromKnock: false,
            wasAlreadyBelow: false,
        },
        foe: {
            isAlive: true,
        },
        character: {
            0: {
                left: {
                    base: 'img/char/gilbert/battle/left/normal.png',
                },
                right: {
                    base: 'img/char/gilbert/battle/right/normal.png',
                },
                knocked: {
                    left: {
                        frames: ['img/char/gilbert/battle/left/knocked0.png',
                                 'img/char/gilbert/battle/left/knocked1.png',
                                 'img/char/gilbert/battle/left/knocked2.png',
                                 'img/char/gilbert/battle/left/knocked3.png',]
                    },
                    right: {
                        frames: ['img/char/gilbert/battle/right/knocked0.png',
                                 'img/char/gilbert/battle/right/knocked1.png',
                                 'img/char/gilbert/battle/right/knocked2.png',
                                 'img/char/gilbert/battle/right/knocked3.png',]
                    }
                },
                combinationsMeta: {
                    0: {
                        left: {
                            base: 'img/char/gilbert/battle/left/basic0.png',
                        },
                        right: {
                            base: 'img/char/gilbert/battle/right/basic0.png',
                        }
                    },
                    1: {
                        left: {
                            base: 'img/char/gilbert/battle/left/basic1.png',
                        },
                        right: {
                            base: 'img/char/gilbert/battle/right/basic1.png',
                        }
                    },
                },
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
    setElement(cntUser, 'img', 'imgUser', 'image/png', objBattle.character[objBattle.characterIndex].right.base, 'image', false, true);

    // Give the user a coordinate starter
    cntUser.style.transform = 'translateX(20.1vw) translateY(64.1066vh)';

    // On each milisecond, check for updates
    itvBattle = setInterval(function () { setBattleUpdate(objBattle) }, 0);

    // Create a fade effect
    setFade(true);
}

function checkKeys(objBattle, arrUserMovement, arrUserMovementPossibilities, domUser, domPlatform) {
    if (arrKeys.includes('Escape')) {
        
        clearInterval(itvBattle);
        setFade(false);
        setTimeout(function() {document.body.style.backgroundImage = '';}, 310);
        setTimeout(function() {setFade(true); startWorld();}, 1000);
    } else {
        if (objBattle.user.isKnocked == false && objBattle.user.isFinishingFromKnock == false) {
            checkCombinator('z');
            checkCombinator('x');

            if (arrKeys.includes('6')) {

                if (domUser.bottom > domPlatform[2].top) {
                    objBattle.user.wasAlreadyBelow = true;
                }

                objBattle.user.isKnocked = true;
                objBattle.info.velocity += 20;
                if (objBattle.user.isFacingRight) {
                    imgUser.src = objBattle.character[objBattle.characterIndex].knocked.right.frames[0];
                } else {
                    imgUser.src = objBattle.character[objBattle.characterIndex].knocked.left.frames[0];
                }
                
            }

            if (objBattle.user.isKnocked == false && objBattle.info.combinator.length == 0) {
    
                if (arrKeys.includes('ArrowLeft') && arrUserMovementPossibilities[0]) {
                    objBattle.user.isFacingRight = false;
            
                    arrUserMovement[0] -= 0.5;
                    imgUser.src = objBattle.character[objBattle.characterIndex].left.base;
                }
            
                if (arrKeys.includes('ArrowRight') && arrUserMovementPossibilities[1]) {
                    objBattle.user.isFacingRight = true;
            
                    arrUserMovement[0] += 0.5;
                    imgUser.src = objBattle.character[objBattle.characterIndex].right.base;
                }
            
                if (arrKeys.includes('ArrowUp') && arrUserMovementPossibilities[2]) {
                    arrUserMovement[1] -= 0.5;
                }
    
                if (arrKeys.includes('ArrowDown') && arrUserMovementPossibilities[3]) {
                    arrUserMovement[1] += 0.5;
                }
            }
        }
    }
}

function getKnocked(objBattle, domUser, domPlatform, arrUserMovement) {
    let oldY = domUser.y;

    // Calculate the future falling
    domUser.y -= 1 * (objBattle.info.velocity + 1 * 1 / 2);

    if(domUser.y > oldY) {

        if (objBattle.user.isFacingRight) {
            imgUser.src = objBattle.character[objBattle.characterIndex].knocked.right.frames[1];
        } else {
            imgUser.src = objBattle.character[objBattle.characterIndex].knocked.left.frames[1];
        }
    }


    // Based on the future Y, is the future bottom go beyond the ground?
    if ((domUser.bottom > domPlatform[2].top && objBattle.user.wasAlreadyBelow == false) || ((domUser.bottom + 10 > domPlatform[3].top && objBattle.user.wasAlreadyBelow == true))) {
        objBattle.user.wasAlreadyBelow = false;

        if (objBattle.user.isFacingRight) {
            imgUser.src = objBattle.character[objBattle.characterIndex].knocked.right.frames[2];
        } else {
            imgUser.src = objBattle.character[objBattle.characterIndex].knocked.left.frames[2];
        }
        
        setTimeout( function() {
            
            imgUser.style.bottom = "0";
            imgUser.style.maxHeight = "20vh";
            arrUserMovement[1] -= 15;
            cntUser.style.transform = 'translateX(' + arrUserMovement[0] + 'vw) translateY(' + arrUserMovement[1] + 'vh)';

            setTimeout(function() {
                objBattle.user.isFinishingFromKnock = false;
                imgUser.style.bottom = "";
                imgUser.style.maxHeight = "23vh";
                if (objBattle.user.isFacingRight) {
                    imgUser.src = objBattle.character[objBattle.characterIndex].right.base;
                } else {
                    imgUser.src = objBattle.character[objBattle.characterIndex].left.base;
                }
            }, 700);

            if (objBattle.user.isFacingRight) {
                imgUser.src = objBattle.character[objBattle.characterIndex].knocked.right.frames[3];
            } else {
                imgUser.src = objBattle.character[objBattle.characterIndex].knocked.left.frames[3];
            }
        }, 1000, arrUserMovement);

        objBattle.user.isFinishingFromKnock = true;
        objBattle.user.isKnocked = false;
        objBattle.info.velocity = 0;
    } else {
        // Keep falling
        objBattle.info.velocity -= 1;
    }

    // Convert Y coordinates to Viewpoint Height
    let dblUserVH = domUser.y / (window.innerHeight * 0.01);

    // Apply the Viewpoint Height to the movement
    arrUserMovement[1] += dblUserVH - arrUserMovement[1];

    if (objBattle.user.isFacingRight) {
        arrUserMovement[0] -= 0.5;
    } else {
        arrUserMovement[0] += 0.5;
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
            objBattle.info.combinator = [];

            if (objBattle.user.isKnocked == false) {
                if (objBattle.user.isFacingRight) {
                    imgUser.src = objBattle.character[objBattle.characterIndex].right.base;
                } else {
                    imgUser.src = objBattle.character[objBattle.characterIndex].left.base;
                }
            }
            
            cntUserFight.style.width = '8vh';
            cntUserFight.style.left = '0vh'
            imgUser.style.left = '0vh';
        
        }, 500);
        
    }
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function setCombinations (objBattle) {
    blnCanPass = false;
    intMatchedIndex = 0;

    for (let i = 0; i < objBattle.info.combinations.length; i++) {
        if (arrayEquals(objBattle.info.combinator, objBattle.info.combinations[i])) {
            blnCanPass = true;
            intMatchedIndex = i;
            break;
        }
    }

    if (blnCanPass) {
        cntUserFight.style.width = '12vh';

        
        if (objBattle.user.isKnocked == false) {
            if (objBattle.user.isFacingRight) {
                imgUser.src = objBattle.character[objBattle.characterIndex].combinationsMeta[intMatchedIndex].right.base;
            } else {
                imgUser.src = objBattle.character[objBattle.characterIndex].combinationsMeta[intMatchedIndex].left.base;
                cntUserFight.style.left = '-4vh';
                imgUser.style.left = '-4vh';
            }    
        }
    }
}

function boundaries(objBattle, arrUserMovementPossibilities, domUser, domPlatform, arrUserMovement) {
    if (domUser.left - 10 < 0) {
        arrUserMovementPossibilities[0] = false;

        if (objBattle.user.isKnocked) {
            arrUserMovement[0] += 0.5;
        }
    }

    if (domUser.right + 10 > window.innerWidth) {
        arrUserMovementPossibilities[1] = false;

        if (objBattle.user.isKnocked) {
            arrUserMovement[0] -= 0.5;
        }
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
    let domUserJump = imgUser.getBoundingClientRect();
    let domPlatform = [cntUpperGround.getBoundingClientRect(), cntGround.getBoundingClientRect(), cntLowerGround.getBoundingClientRect(), cntFallground.getBoundingClientRect()];

    boundaries(objBattle, arrUserMovementPossibilities, domUser, domPlatform, arrUserMovement);
    setCombinations(objBattle);
    checkKeys(objBattle, arrUserMovement, arrUserMovementPossibilities, domUser, domPlatform);

    if (objBattle.user.isKnocked) {
        getKnocked(objBattle, domUserJump, domPlatform, arrUserMovement);
    }

    cntUser.style.transform = 'translateX(' + arrUserMovement[0] + 'vw) translateY(' + arrUserMovement[1] + 'vh)';
}