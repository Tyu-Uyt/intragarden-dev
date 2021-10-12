function setElement(cntParent, strElement, strID, strType, strValue, strClass, blnCreateText, blnIsPicture) {

	let tmpElement = document.createElement(strElement);


	if (blnCreateText) {
		let tmpText = document.createTextNode(strValue);
		tmpElement.append(tmpText);
	} // End if

	if (blnIsPicture) {
		tmpElement.src = strValue;
	}
	else {
		tmpElement.setAttribute('value', strValue);
	} // End if

	cntParent.append(tmpElement);
	tmpElement.setAttribute('id', strID);
	tmpElement.setAttribute('type', strType);
	tmpElement.setAttribute('class', strClass);

	return tmpElement;
} // End of setElement function

function removeContent(cntParent) {
	while (cntParent.firstChild) {
		cntParent.removeChild(cntParent.firstChild);
	} // End while
}

function setFade(blnFadeIn) {

	if (blnFadeIn) {
		setElement(document.body, 'div', 'cntFadeIn', '%NOTYPE%', '%NOVALUE%', '%NOCLASS%', false, false);

		setTimeout(function () { cntFadeIn.remove(); }, 480);
	} else {
		setElement(document.body, 'div', 'cntFadeOut', '%NOTYPE%', '%NOVALUE%', '%NOCLASS%', false, false);

		setTimeout(function () { removeContent(document.body); }, 480);
	}
}