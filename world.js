function startWorld() {
    setCursor();
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