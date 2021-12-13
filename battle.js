function startBattle() {

    // Set necessary values
    objBattle = {
        info: {
            isCutscene: false,
        },
        user: {
            isAlive: true,
            isFalling: true,
            isRising: false,
            isMoving: false,
            isHit: false
        },
        foe: {
            isAlive: true,
        },
        character: {
            user: {
                base: 'img/char/gilbert/battle/normal.png',
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
    setElement(document.body, 'div', 'cntGround', '<NOTYPE>', '<NOVALUE>', '<NOCLASS>', false, false);
    cntGround.style.backgroundImage = objBattle.level[0].ground;

    // Set a character
    setElement(document.body, 'img', 'imgUser', 'image/png', objBattle.character.user.base, 'image', false, true);

    // Give the user a coordinate starter
    imgUser.style.transform = 'translateX(20.1vw) translateY(20.1vh)';

    // On each milisecond, check for updates
    setInterval(function () { setBattleUpdate(objBattle) }, 1);

    // Create a fade effect
    setFade(true);
}

function setBattleUpdate(objBattle) {
    let arrUserMovement = [parseFloat(imgUser.style.transform.split(' ')[0].match(/[-]?\d+\.\d+/)),
    parseFloat(imgUser.style.transform.split(' ')[1].match(/[-]?\d+\.\d+/))];
    let domUser = imgUser.getBoundingClientRect();
    let domGround = cntGround.getBoundingClientRect();

    if (objBattle.user.isFalling) {
        if (domUser.bottom + 1 < domGround.top) {
            arrUserMovement[1] += 1;
        } else {
            objBattle.user.isFalling = false;
        }
    }

    imgUser.style.transform = 'translateX(' + arrUserMovement[0] + 'vw) translateY(' + arrUserMovement[1] + 'vh)';
}