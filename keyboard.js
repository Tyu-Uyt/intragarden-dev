document.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;

    // If the user is in world mode
    if (intMode == 3) {
        arrKeys.push(event.key);
    }


    // Filter out duplicate keys
    arrKeys = Array.from(new Set(arrKeys));
}, false);

document.addEventListener('keyup', (event) => {

    // If the user is in the world mode

    if (intMode == 3) {
        arrKeys.splice(arrKeys.indexOf(event.key), 1);
        console.log(arrKeys);
    }
}, false);