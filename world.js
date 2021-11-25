function startWorld() {
    // Set to world mode
    intMode = 3;

    // Create a background image
    setElement(document.body, 'div', 'cntWorldBackground', '<NOTYPE>', '<NOVALUE>', '<NOCLASS>', false, false);

    // TEMPORARILY: Set the level to zero
    let intLevel = 0;

    // Create a world object that has all information
    // necessary to process
    let objWorld = {
        0: {
            info: {
                width: 10 * 64,
                height: 10 * 64,
                music: 'playground',
                music_loop: true
            },

            tenant: {
                x: 130,
                y: 130
            },

            base: {

                map: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 1, 2, 3, 0, 0, 1, 2, 3, 0,
                    0, 4, 5, 5, 5, 5, 5, 5, 6, 0,
                    0, 7, 5, 9, 0, 0, 7, 5, 9, 0,
                    0, 0, 5, 0, 0, 0, 0, 5, 0, 0,
                    0, 0, 5, 0, 0, 0, 0, 5, 0, 0,
                    0, 1, 5, 3, 0, 0, 1, 5, 3, 0,
                    0, 4, 5, 5, 5, 5, 5, 5, 6, 0,
                    0, 7, 8, 9, 0, 0, 7, 8, 9, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],

                assets: {
                    0: {
                        name: 'blank',
                        abbreviation: 'bk'
                    },
                    1: {
                        name: 'tl',
                        abbreviation: 'TL'
                    },
                    2: {
                        name: 't',
                        abbreviation: 'T',
                    },
                    3: {
                        name: 'tr',
                        abbreviation: 'TR'
                    },
                    4: {
                        name: 'ml',
                        abbreviation: 'ML'
                    },
                    5: {
                        name: 'm',
                        abbreviation: 'M'
                    },
                    6: {
                        name: 'mr',
                        abbreviation: 'MR'
                    },
                    7: {
                        name: 'bl',
                        abbreviation: 'BL'
                    },
                    8: {
                        name: 'b',
                        abbreviation: 'B'
                    },
                    9: {
                        name: 'br',
                        abbreviation: 'BR'
                    }
                }

            },
            collision: {
                map: [
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                    1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
                    1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
                    1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                ],

                assets: {
                    0: {
                        name: 'passage',
                        abbreviation: 'P'
                    },
                    1: {
                        name: 'collision',
                        abbreviation: 'C'
                    }
                }
            }
        }
    }

    // Set tiles to be displayed
    setWorldBaseTiles(objWorld, intLevel);

    // Set tiles to be parsed in the collision world
    setWorldBaseTilesCollision(objWorld, intLevel);

    // With the visual tiles setted up, place
    // Tenant within the visual world
    setElement(cntWorldBase, 'img', 'imgWorldTenant', 'image/png', 'img/char/tenant/world/d.png', 'image', false, true);
    
    // Give Tenant coordinates starter
    imgWorldTenant.style.transform = 'translateX(' + objWorld[intLevel].tenant.x + 'px) translateY(' + objWorld[intLevel].tenant.y + 'px)';

    // Create a fade in effect
    setFade(true);

    // Create an HTML audio element and play it
    setElement(document.body, 'audio', 'audBackground', 'audio/ogg', 'aud/' + objWorld[intLevel].info.music + '.ogg', '<NOCLASS>', false, true);
    audBackground.loop = objWorld[intLevel].info.music_loop;
    audBackground.play();

    // On each milisecond, check for updates
    setInterval(function () { setWorldUpdate() }, 1);
}

function setWorldUpdate() {
    // Grab X and Y coordinates from Tenant's CSS transform style
    let arrTenantMovement = [parseInt(imgWorldTenant.style.transform.split(' ')[0].match(/[-]?\d+/)),
        parseInt(imgWorldTenant.style.transform.split(' ')[1].match(/[-]?\d+/))];

    // Set directional movements to be passable.
    // In order, they are up, down, left, and right respectively.
    let arrPassableMovements = [true, true, true, true]

    // Check collision from Tenant
    checkCollision(arrPassableMovements);

    // Set visual and coordinal movements for Tenant
    setCharImg(arrTenantMovement, arrPassableMovements);

    // Update Tenant's CSS transform style to which direction it will be heading
    imgWorldTenant.style.transform = 'translateX(' + arrTenantMovement[0] + 'px) translateY(' + arrTenantMovement[1] + 'px)';
}

function setTiles(objWorld, intLevel, blnIsBase) {
    // If we are parsing for the visual world, then do so.
    // Else, parse it for the collision world.

    if (blnIsBase) {
        // For each digits in base map
        for (intIndex = 0; intIndex < objWorld[intLevel].base.map.length; intIndex++) {
            // Get the current index as string
            let strNumber = intIndex.toString();
            // Get the digit from the base map
            let intDigit = objWorld[intLevel].base.map[intIndex];

            // If there is only one digit, add two
            // zeroes before it.
            // Else if two digits, one zero.
            if (strNumber.length == 1) {
                strNumber = '00' + strNumber;
            } else if (strNumber.length == 2) {
                strNumber = '0' + strNumber;
            }

            // Create a tile for the visual world
            setElement(
                cntWorldBase,
                'img',
                'imgWB' + strNumber + objWorld[intLevel].base.assets[intDigit].abbreviation,
                'image/png',
                'img/bg/world/playground/base/' + objWorld[intLevel].base.assets[intDigit].name + '.png',
                '<NOCLASS>',
                false,
                true
            )
        }
    }
    else {
        // For each digits in collision map
        for (intIndex = 0; intIndex < objWorld[intLevel].collision.map.length; intIndex++) {
            // Get the current index as string
            let strNumber = intIndex.toString();
            // Get the digit from collision map
            let intDigit = objWorld[intLevel].collision.map[intIndex];

            // If there is only one digit, add two
            // zeroes before it.
            // Else if two digits, one zero.
            if (strNumber.length == 1) {
                strNumber = '00' + strNumber;
            } else if (strNumber.length == 2) {
                strNumber = '0' + strNumber;
            }

            // Create a tile for the collision world
            setElement(
                cntWorldBaseCollision,
                'img',
                'imgWBC' + strNumber + objWorld[intLevel].collision.assets[intDigit].abbreviation,
                'image/png',
                'img/bg/world/playground/collision/' + objWorld[intLevel].collision.assets[intDigit].name + '.png',
                '<NOCLASS>',
                false,
                true
            )
        }
    }
}

function setWorldBaseTiles(objWorld, intLevel) {
    // Create the visual world
    setElement(document.body, 'div', 'cntWorldBase', '<NOTYPE>', '<NOVALUE>', 'tile', false, false);

    // Adjust its width based on the given level width from objWorld
    cntWorldBase.style.width = objWorld[intLevel].info.width + 'px';

    // Adjust its height based on the given level height from objWorld
    cntWorldBase.style.height = objWorld[intLevel].info.height + 'px';

    // Parse tiles for the visual world
    setTiles(objWorld, intLevel, true);
}
function setWorldBaseTilesCollision(objWorld, intLevel) {
    // Create the collision world
    setElement(document.body, 'div', 'cntWorldBaseCollision', '<NOTYPE>', '<NOVALUE>', 'tile', false, false);

    // Adjust its width and height based on the given level width and height from objWorld
    cntWorldBaseCollision.style.width = objWorld[intLevel].info.width + 'px';
    cntWorldBaseCollision.style.height = objWorld[intLevel].info.height + 'px';

    // Offset the collision world to perfectly align with the visual world on the given level height from objWorld
    cntWorldBaseCollision.style.transform = 'translateX(0px) translateY(-' + objWorld[intLevel].info.height + 'px)';

    // Parse tiles for the collision world
    setTiles(objWorld, intLevel, false);
}

function setCharImg(arrTenantMovement, arrPassableMovements) {
    // Check if the respective inclusion should have images be mapped

    if (arrKeys.includes('ArrowUp')) {
        if (arrKeys.includes('ArrowLeft')) {
                imgWorldTenant.src = 'img/char/tenant/world/ul.png';
        } else if (arrKeys.includes('ArrowRight')) {
                imgWorldTenant.src = 'img/char/tenant/world/ur.png';
        } else {
                imgWorldTenant.src = 'img/char/tenant/world/u.png';
        }
    } else if (arrKeys.includes('ArrowDown')) {
        if (arrKeys.includes('ArrowLeft')) {
                imgWorldTenant.src = 'img/char/tenant/world/dl.png';
        } else if (arrKeys.includes('ArrowRight')) {
                imgWorldTenant.src = 'img/char/tenant/world/dr.png';
        } else {
                imgWorldTenant.src = 'img/char/tenant/world/d.png';
        }
    } else if (arrKeys.includes('ArrowLeft')) {
            imgWorldTenant.src = 'img/char/tenant/world/l.png';
    } else if (arrKeys.includes('ArrowRight')) {
            imgWorldTenant.src = 'img/char/tenant/world/r.png';
    }

    // Check if the respective inclusion should have Tenant be moving

    if (arrKeys.includes('ArrowUp') && arrPassableMovements[0]) {
            arrTenantMovement[1] -= 3
    }

    if (arrKeys.includes('ArrowDown') && arrPassableMovements[1]) {
            arrTenantMovement[1] += 3
    }

    if (arrKeys.includes('ArrowLeft') && arrPassableMovements[2]) {
            arrTenantMovement[0] -= 3
    }

    if (arrKeys.includes('ArrowRight') && arrPassableMovements[3]) {
            arrTenantMovement[0] += 3
    }
}

function checkCollision(arrPassableMovements) {
    /*
     * Offsets for domTenant is used to accomidate the
     * picture boundary. In other words, since all world-related
     * assets are 64x64 and Tenant is visually shown smaller than that,
     * we use offsets to not evaluate the extra spaces that Tenant
     * has.
     */

    /*
     * For the sake of simplicity, INT_IMAGE_SIZE is the sum
     * of two comparing objects (Tenant and the collision tile) for
     * both width and height.
     */

    const INT_IMAGE_OFFSET = 16;
    const INT_IMAGE_SIZE = 128;
    const INT_STEPS = 3;
    let chdTiles = cntWorldBaseCollision.children;
    let domTenant = imgWorldTenant.getBoundingClientRect();

    // For number of tiles set in the collision world
    for (let intIndex = 0; intIndex < chdTiles.length; intIndex++) {

        // Get the HTML element of that tile 
        let elmTile = document.getElementById(chdTiles[intIndex].id);

        // Get the JavaScript DOM object of that tile
        let domTile = elmTile.getBoundingClientRect();

        // If that tile's last fixed character ends with C
        if (chdTiles[intIndex].id.substring(9) == 'C') {

            // Get the diffence in coordinates from these two object.
            let intXCheck = domTenant.x - domTile.x;
            let intYCheck = domTenant.y - domTile.y;

            // In general, check if the difference in X and Y coordinates is less then
            // the surrounding collision tile. Subtract or add based on which direction
            // it will affect Tenant for the ability to move.

            // Check if going up
            if (Math.abs(intXCheck) * 2 < INT_IMAGE_SIZE - INT_IMAGE_OFFSET &&
                Math.abs(intYCheck - INT_STEPS) * 2 < INT_IMAGE_SIZE - INT_IMAGE_OFFSET) {
                arrPassableMovements[0] = false;
            }

            // Check if going down
            if (Math.abs(intXCheck) * 2 < INT_IMAGE_SIZE - INT_IMAGE_OFFSET &&
                Math.abs(intYCheck + INT_STEPS) * 2 < INT_IMAGE_SIZE - INT_IMAGE_OFFSET) {
                arrPassableMovements[1] = false;
            }

            // Check if going left
            if (Math.abs(intXCheck - INT_STEPS) * 2 < INT_IMAGE_SIZE - INT_IMAGE_OFFSET &&
                Math.abs(intYCheck) * 2 < INT_IMAGE_SIZE - INT_IMAGE_OFFSET) {
                arrPassableMovements[2] = false;
            }

            // Check if going right
            if (Math.abs(intXCheck + INT_STEPS) * 2 < INT_IMAGE_SIZE - INT_IMAGE_OFFSET &&
                Math.abs(intYCheck) * 2 < INT_IMAGE_SIZE - INT_IMAGE_OFFSET) {
                arrPassableMovements[3] = false;
            }
        }
    }
}
