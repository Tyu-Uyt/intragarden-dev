function startMenu() {
    intMode = 0;
    setFade(true);
    setElement(document.body, 'audio', 'audMenu', 'audio/ogg', 'aud/menu.ogg', '<NOCLASS>', false, true, true);
    setElement(document.body, 'audio', 'audStart', 'audio/ogg', 'aud/start.ogg', '<NOCLASS>', false, true, true);
    setElement(document.body, 'div', 'cntMenuSelection', '<NOTYPE>', '<NOVALUE>', '<NOCLASS>', false, false);
    setElement(cntMenuSelection, 'img', 'imgMenuExit', 'image/png', 'img/ugi/menu/placeholder2.png', 'image', false, true);
    setElement(cntMenuSelection, 'img', 'imgMenuWorld', 'image/png', 'img/ugi/menu/placeholder3.png', 'image', false, true);
    setElement(cntMenuSelection, 'img', 'imgMenuBattle', 'image/png', 'img/ugi/menu/placeholder1.png', 'image', false, true);
    setElement(cntMenuSelection, 'img', 'imgMenuCare', 'image/png', 'img/ugi/menu/placeholder.png', 'image', false, true);
    audMenu.play();

    imgMenuCare.onclick = function () {
        setTimeout(function () { startCare(); }, 800);
        setFade(false);
        audStart.play();
    };

    imgMenuBattle.onclick = function () {
        setTimeout(function () { startBattle(); }, 800);
        setFade(false);
        audStart.play();
    }

    imgMenuWorld.onclick = function () {
        setTimeout(function () { startWorld(); }, 800);
        setFade(false);
        audStart.play();
    }

    imgMenuExit.onclick = function () {
        setTimeout(function () { location.href = 'https://www.google.com/'; }, 800);
        setFade(false);
        audStart.play();
    }
}