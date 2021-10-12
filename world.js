function startWorld() {
    setCursor();
    setElement(document.body, 'audio', 'audPlayground', 'audio/ogg', 'aud/playground.ogg', '<NOCLASS>', false, true);
    setElement(document.body, 'div', 'cntWorldBackground', '<NOTYPE>', '<NOVALUE>', '<NOCLASS>', false, false);
    setElement(document.body, 'div', 'cntWorldBase', '<NOTYPE', '<NOVALUE>', '<NOCLASS>', false, false);
    setElement(cntWorldBase, 'img', 'imgWorldBaseBR', 'image/png', 'img/bg/world/playground/base/br.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseB', 'image/png', 'img/bg/world/playground/base/b.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseBL', 'image/png', 'img/bg/world/playground/base/bl.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseMR', 'image/png', 'img/bg/world/playground/base/mr.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseM', 'image/png', 'img/bg/world/playground/base/m.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseML', 'image/png', 'img/bg/world/playground/base/ml.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseTR', 'image/png', 'img/bg/world/playground/base/tr.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseT', 'image/png', 'img/bg/world/playground/base/t.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldBaseTL', 'image/png', 'img/bg/world/playground/base/tl.png', '<NOCLASS>', false, true);
    setElement(cntWorldBase, 'img', 'imgWorldTenant', 'image/png', 'img/char/tenant/world/d.png', 'image', false, true);
    setFade(true);
    audPlayground.play();
}