function startWorld() {
    intMode = 3;
    setElement(document.body, 'audio', 'audPlayground', 'audio/ogg', 'aud/playground.ogg', '<NOCLASS>', false, true);
    setElement(document.body, 'div', 'cntWorldBackground', '<NOTYPE>', '<NOVALUE>', '<NOCLASS>', false, false);
   
    setWorldBaseTiles();
    setWorldBaseTilesCollision();

    setElement(cntWorldBase, 'img', 'imgWorldTenant', 'image/png', 'img/char/tenant/world/d.png', 'image', false, true);
    setElement(document.body, 'div', 'cntWorldImgProtector', '<NOTYPE>', '<NOVALUE>', '<NOCLASS>', false, false);

    imgWorldTenant.style.transform = 'translateX(0px) translateY(0px)';
    setFade(true);
    audPlayground.play();

   
    setInterval(function () { setWorldUpdate() }, 1);
}

function setWorldBaseTiles() {
    setElement(document.body, 'div', 'cntWorldBase', '<NOTYPE>', '<NOVALUE>', 'tile', false, false);

    setElement(cntWorldBase, 'img', 'imgWorldBaseTL', 'image/png', 'img/bg/world/playground/base/tl.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseT', 'image/png', 'img/bg/world/playground/base/t.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseTR', 'image/png', 'img/bg/world/playground/base/tr.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseML', 'image/png', 'img/bg/world/playground/base/ml.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseM', 'image/png', 'img/bg/world/playground/base/m.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseMR', 'image/png', 'img/bg/world/playground/base/mr.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseBL', 'image/png', 'img/bg/world/playground/base/bl.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseB', 'image/png', 'img/bg/world/playground/base/b.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseBR', 'image/png', 'img/bg/world/playground/base/br.png', '<NOCLASS>', false, true);
}
function setWorldBaseTilesCollision() {
    setElement(document.body, 'div', 'cntWorldBaseCollision', '<NOTYPE>', '<NOVALUE>', 'tile', false, false);
    cntWorldBaseCollision.style.transform = 'translateX(0px) translateY(-256px)';



    setElement(cntWorldBaseCollision, 'img', 'imgWBC000C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC001C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC002C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC003C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC004C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC005C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC006P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC007P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC008P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC009C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC010C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC011P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC012P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC013P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC014C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC015C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC016P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC017P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC018P', 'image/png', 'img/bg/world/playground/collision/passage.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC019C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC020C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC021C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC022C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC023C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
    setElement(cntWorldBaseCollision, 'img', 'imgWBC024C', 'image/png', 'img/bg/world/playground/collision/collision.png', '<NOCLASS>', false, true);
}

function setWorldUpdate() {
    let arrTenantMovement = [parseInt(imgWorldTenant.style.transform.split(' ')[0].match(/[-]?\d+/)),
                             parseInt(imgWorldTenant.style.transform.split(' ')[1].match(/[-]?\d+/))];
    let arrPassableMovements = [true, true, true, true]

    checkCollision(arrPassableMovements);
    setCharImg(arrTenantMovement, arrPassableMovements);

    imgWorldTenant.style.transform = 'translateX(' + arrTenantMovement[0] + 'px) translateY(' + arrTenantMovement[1] + 'px)';
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
    let childrens = cntWorldBaseCollision.children;
    let tenantDOM = imgWorldTenant.getBoundingClientRect();

    // For number of tiles set in the collision world
    for (let i = 0; i < childrens.length; i++) {

        // Get the HTML element of that tile 
        let childrenElement = document.getElementById(childrens[i].id);

        // Get the JavaScript DOM object of that tile
        let childrenDOM = childrenElement.getBoundingClientRect();

        // If that tile's last fixed character ends with C
        if (childrens[i].id.substring(9) == 'C') {

            /*
             * Offsets for tenantDOM is used to accomidate the actual
             * picture boundary. In other words, since all world-related
             * assets are 64x64 and Tenant is visually shown smaller than that,
             * we use offsets to not evaluate the extra spaces that Tenant
             * has.
             */

            if (Math.abs(tenantDOM.x - childrenDOM.x) * 2 < (tenantDOM.width + childrenDOM.width) &&
                Math.abs(tenantDOM.y - childrenDOM.y) * 2 < (tenantDOM.height + childrenDOM.height)) {

                // Checks for up. Else, down.
                if (tenantDOM.bottom - childrenDOM.bottom > 0 &&
                    tenantDOM.top - childrenDOM.top > 0) {
                    arrPassableMovements[0] = false;

                } else if (tenantDOM.bottom - childrenDOM.bottom < 0 &&
                    tenantDOM.top - childrenDOM.top < 0) {
                    arrPassableMovements[1] = false;
                }

                // Checks for left. Else, right.
                if (tenantDOM.left - childrenDOM.left > 0 &&
                    tenantDOM.right - childrenDOM.right > 0) {
                    arrPassableMovements[2] = false;
                } else if (tenantDOM.left - childrenDOM.left < 0 &&
                    tenantDOM.right - childrenDOM.right < 0) {
                    arrPassableMovements[3] = false;
                }

            }
        }
    }
}
