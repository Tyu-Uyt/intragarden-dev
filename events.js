window.addEventListener('load', function () {

    // If no cookies are present
    if (document.cookie == '') {

        // If the location is on the specified domain
        // Else if the location is not localhost
        if (this.location.hostname == '') {
            setFade(true);
            getPremadeContainer();

            btnOK.onclick = function() {    
                audFirstClick.play();
    
                setCookies();

                setTimeout(function() {setFade(false);}, 3000)
                setTimeout(function() {startWorld();}, 3500);
            }
        } else if (this.location.hostname != '') {
            alert('Unrecognized host.');
        } else {

            setCookies();
            startWorld();
        }
    } else {
        parseCookies();

        // TODO: Check if the player would still be alive
        
        startWorld();
    }

    
});

window.addEventListener('beforeunload', function (e) {
    for (let objKey in objCookies) {
        Cookies.set(objKey, objCookies[objKey], {sameSite: 'strict', expires: 7 });
    }
});

document.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;

    // If the user is in world mode
    if (intMode == 3 || intMode == 2) {
        arrKeys.push(event.key);
    }


    // Filter out duplicate keys
    arrKeys = Array.from(new Set(arrKeys));
}, false);

document.addEventListener('keyup', (event) => {

    // If the user is in world or battle mode
    if (intMode == 3 || intMode == 2) {
        arrKeys.splice(arrKeys.indexOf(event.key), 1);
    }
}, false);