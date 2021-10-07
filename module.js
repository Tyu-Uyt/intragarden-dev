function setElement(cntParent, strElement, strID, strType, strValue, strClass, blnCreateText, blnIsPicture) {

	let tmpElement = document.createElement(strElement);


	if (blnCreateText) {
		let tmpText = document.createTextNode(strValue);
		tmpElement.append(tmpText);
	} // End if

	if (blnIsPicture) {
		tmpElement.src = strValue;
		cntParent.prepend(tmpElement);
	}
	else {
		tmpElement.setAttribute('value', strValue);
		cntParent.append(tmpElement);
	} // End if

	tmpElement.setAttribute('id', strID);
	tmpElement.setAttribute('type', strType);
	tmpElement.setAttribute('class', strClass);

	return tmpElement;
} // End of setElement function