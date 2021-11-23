/*
	Rules on code standardization:
	[1] - 	Each variable must have three character identifier.
			So far:
			int	-	Integer
			ele	-	HTML element
			arr	-	Array
			itv	-	Interval
			tmr	-	Timer
			dte	-	Date
			lbl - 	HTML label element
			cnt -	HTML container element
			tmp - 	Temporarily
			btn - 	Button
	[2]	-	Each function must start with set or get.
	[3] -	Each string must be encapsuled with single quotes.
	[4] -	If applicable, then the first function parameter must
			be the parent, the child's given name, who does the
			child associate as, and what variables needs to be
			handled or given.
	[5]	-	Placing styles in setElement function is prohibited.
*/

function setStopIntervals(){
	let totHighestId = setTimeout(";");

	for (let intInterval = 0 ; intInterval < totHighestId ; intInterval++) {
		clearTimeout(intInterval);
	} // End for
} // End of setStopIntervals function

function setDeath(){
	setStopIntervals();
	document.body.style.backgroundImage = 'none';
	document.body.style.backgroundColor = 'black';
	document.body.style.backgroundColor = 'black';
	setCanvas([], [], 0, 0, true, false);
	let imgTenant = setElement(document.body, 'img', 'imgTenant', 'image/png', 'img/char/tenant/dying.png', 'image', false, true);
	setTimeout(function() {imgTenant.remove();}, 1500);
	setTimeout(function() {
		let lblDeath = setElement(document.body, 'label', 'lblDeath', '%NOTYPE%', 'Unfortunately, your tenant has deceased.', 'label', true, false);
	}, 4000);
} // End of setDeath function

function setStatus(arrVariables, arrRequests){
	//	Purpose	-	To create messages after the event is finished
	//	Motive	-	Enhance readability to btnEat_onClick function

	// 	Atanomy of the array parameter:
	// 	[Even]	-	Status to be modified
	// 	[Odd]	-	Value to be implied

	//	Is it correct to call the modifier value modifiee?
	//	For each given status and the desired modifiee
	let counter = -1;
	let cntParameter = setElement(document.body, 'div', 'cntParameter', '%NOTYPE%', '%NOVALUE%', 'container', false, false);

	for (let i = 0; i < arrRequests.length - 1; i += 2){
		let tmpStatus = "";
		let tmpIndicator = "";
		let tmpExpression = "";
		let tmpValue = parseInt(arrRequests[i+1]);
		let tmpNumber = Math.abs(tmpValue).toString();
		let isSelected = false;

		arrVariables[arrRequests[i]] += tmpValue;

		// Check and change the values interally

		if (arrVariables[arrRequests[i]] > 100) {
			arrVariables[arrRequests[i]] = 100
		}
		else if (arrVariables[arrRequests[i]] < 0) {
			setDeath();
			break;
		} // End if

		// 	Action codes goes the same listing as arrVariables
		switch(arrRequests[i]) {
			case 0:
				tmpStatus = "Energy";
				isSelected = true;
				break;
			case 1:
				tmpStatus = "Hunger";
				isSelected = true;
				break;
			default:
				tmpStatus = "Social";
				isSelected = true
		} // End switch

		if (isSelected) {counter++;} // End if

		// There should be no way for the modifier be zero
		// in any circumstances.

		if (tmpValue > 0) {
			tmpIndicator = "increased";
			tmpExpression = "!";
		}
		else {
			tmpIndicator = "decreased";
			tmpExpression = ".";
		} // End if

		// 	Note the `` encapsulement,
		//	and the explicit .toString() preferrence

		let tmpLabel = setElement(cntParameter, 'label', 'tmpLabel' + counter, '%NOTYPE%', `${tmpStatus} value has ${tmpIndicator} by ${tmpNumber}${tmpExpression}`, 'label', true, false);

		if (i == 0) {
			tmpLabel.style.marginTop = '300px';
		} // End if
	} // End for
} // End of setStatus function

function setTextParse(cntTextbox, stringParameter){
	let arrCodes = [
						'#tenant#',
						'#advocate#',
						'#tenant_happy#',
						'#tenant_angry#',
						'#tenant_normal#',
						'#advocate_card_read#',
						'#advocate_shocked#',
						'#advocate_angry#',
						'#advocate_cry#',
						'#advocate_depressed#',
						'#advocate_delusional#',
						'#advocate_normal#',
						'#advocate_left#',
						'#advocate_right#',
						'#advocate_above#',
						'#advocate_below#',
						'#tenant_center#',
						'#tenant_shocked#',
						'#tenant_sad#',
						'#advocate_card_shocked#',
						'#advocate_card_normal#',
				   ];

	for (let i = 0; i < arrCodes.length; i++) {
		if (stringParameter.indexOf(arrCodes[i]) > -1) {
			stringParameter = stringParameter.slice(arrCodes[i].length);

			switch (i){
				case 0: // tenant
					setElement(cntTextbox, 'img', 'imgTenant', 'image/png', 'img/char/tenant/normal.png', 'image', false, true);
					break;
				case 1: // advocate
					setElement(cntTextbox, 'img', 'imgAdvocate', 'image/png', 'img/char/advocate/normal.png', 'image', false, true);
					break;
				case 2: // tenant_happy
					imgTenant.src = 'img/char/tenant/happy.png';
					break;
				case 3: // tenant_angry
					break;
				case 4: // tenant_normal
					imgTenant.src = 'img/char/tenant/normal.png';
					break;
				case 5: // advocate_card_read
					imgAdvocate.src = 'img/char/advocate/card_read.png';
					break;
				case 6: // advocate_shocked
					imgAdvocate.src = 'img/char/advocate/shocked.png';
					break;
				case 7: // advocate_angry
					imgAdvocate.src = 'img/char/advocate/angry.png';
					break;
				case 8: // advocate_cry
					break;
				case 9: // advocate_depressed
					break;
				case 10: // advocate_delusional
					imgAdvocate.src = 'img/char/advocate/delusional.png';
					break;
				case 11: // advocate_normal
					imgAdvocate.src = 'img/char/advocate/normal.png';
					break;
				case 12: // advocate_left
					imgAdvocate.style.transform = 'translate(0vh, -245px) rotateY(180deg)';
					break;
				case 13: // advocate_right
					break;
				case 14: // advocate_above
					// Nonesense as Advocate is already above.
					break;
				case 15: // advocate_below
					break;
				case 16: // tenant_center
					imgTenant.style.transform = 'translate(20vw, -330px)';
					break;
				case 17: // tenant_shocked
					imgTenant.src = 'img/char/tenant/shocked.png';
					break;
				case 18: // tenant_sad
					imgTenant.src = 'img/char/tenant/sad.png';
				 	break;
				case 19: // advocate_card_shocked
					imgAdvocate.src = 'img/char/advocate/card_shocked.png';
					break;
				case 20: // advocate_card_normal
					imgAdvocate.src = 'img/char/advocate/card_normal.png';
			} // End Switch
		} // End if
	} // End for

	return stringParameter;
} // End of setEmotion function

function setEvent(arrVariables, arrTexts, arrRequests, intEventNumber, blnShowParameter){
	setCanvas(arrVariables, arrTexts, 0, 0, true, false);
	let cntTextbox = 	setElement(document.body, 'div', 'cntTextbox', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	let imgArrow = 		setElement(cntTextbox, 'img', 'imgArrow', 'image/png', 'img/ugi/arrow.png', 'image', false, true);
	let lblText =		setElement(cntTextbox, 'label', 'lblText', '%NOTYPE%', arrTexts[intEventNumber][1], 'label', true, false);
	let intCounter = 1;


	cntTextbox.onclick = function(){
			intCounter++;

			if (intCounter < arrTexts[intEventNumber].length){lblText.firstChild.nodeValue = setTextParse(cntTextbox, arrTexts[intEventNumber][intCounter]);}
			else{
				cntTextbox.remove();

				if (blnShowParameter){
					setStatus(arrVariables, arrRequests);
					setTimeout(function() {
						setCanvas(arrVariables, arrTexts, 1, 0, true, false);
					}, 3000);
				}
				else {
					setTimeout(function() {setCanvas(arrVariables, arrTexts, 1, 0, true, false);}, 1);
				} // End if
			} // End if
	};
	setTimeout(function(){cntTextbox.click();}, 1);
} // End of setEvent function

function getDataCard(arrVariables){
	arrVariables = arrVariables.map(String);

	for (let i = 0; i < 3; i++) {
		if (arrVariables[i].length == 1) {
			arrVariables[i] = "00" + arrVariables[i];
		}
		else if (arrVariables[i].length == 2) {
			arrVariables[i] = "0" + arrVariables[i];
		}
	}

	return new Date().getTime().toString() + arrVariables.slice(0,3).join("");
} // End of getDataCard function

function getReadableTime(intEpochTime){
	let intDays = Math.floor(intEpochTime / (1000 * 60 * 60 * 24));
	let intHours = Math.floor((intEpochTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let intMinutes = Math.floor((intEpochTime % (1000 * 60 * 60)) / (1000 * 60));
	let intSeconds = Math.floor((intEpochTime % (1000 * 60)) / 1000);
	return [intDays, intHours, intMinutes, intSeconds];
} // End of getReadableTime function

function getValidation(arrVariables, arrTexts){
	// In order of precense to check
	// 0] The value's length is equivilant to about 15-22
	// 1] The value are numbers
	// 3] The first 16 digits can allow users to continue

	let input = boxDataLogin.value;

	if (input.length >= 15 && input.length <= 22){
		if (!isNaN(input)) {
			let arrBrokenedData = [];
			arrBrokenedData[0] = parseInt(input.substring(0, 13));
			input = input.substring(13);

			for (let i = 0; i < 3; i++){
				arrBrokenedData[i+1] = parseInt(input.substring(0, 3));
				input = input.substring(3);
			} // End for

			let arrTime = getReadableTime(new Date().getTime() -  arrBrokenedData[0]);
			let intHours = arrTime[1] + arrTime[0] * 24;

			if (intHours < 100) {
				for (let i = 0; i < 3; i++) {
					arrVariables[i] = arrBrokenedData[i+1] - intHours;
					if (arrVariables[i] <= 0) {
						arrVariables[0] = 100;
						arrVariables[1] = 100;
						arrVariables[2] = 100;
						setEvent(arrVariables, arrTexts, [], 3, false);
						break;
					}
					else if (i == 2) {
						setEvent(arrVariables, arrTexts, [], 2,  false);
					} // End if
				} // End for

			} else {setEvent(arrVariables, arrTexts, [], 3, false);} // End if
		} else {alert('Input is not numeric.');} // End if
	} else {alert('Input is less less than 15 characters, or more than 22.');} // End if
} // End of getValidation function

function setBlink(){
	imgTenant.src = 'img/char/tenant/normal_blinking.png';
	setTimeout(function() {imgTenant.src = 'img/char/tenant/normal.png';
						   setTimeout( function() {setBlink();}, 4000);
						   }, 130);
} // End of setBlink function

function setButtonFunctionality(arrVariables, arrTexts, arrRequests, intCode, blnShowTenant){
	//	Purpose	-	To give status buttons a reason to live
	//	Motive	-	Part of RAD translation

	setCanvas(arrVariables, arrTexts, 0, 0, true, false);
	let imgTenant = 	setElement(document.body, 'img', 'imgTenant', 'image/png', 'img/char/tenant/normal.png', 'image', false, true);

	//	Associate the button as:
	//	[0]	Eating
	//	[1]	Sleeping
	//	[2]	Talking
	//	[3] Leaving

	if (!blnShowTenant) {
		imgTenant.remove()
	}

	switch (intCode) {
		case 0:
			imgTenant.src = 'img/char/tenant/eating.png';
			setTimeout(function() {imgTenant.src = 'img/char/tenant/normal.png';
								   setStatus(arrVariables, arrRequests);}, 2000);
			setTimeout(function() {setCanvas(arrVariables, arrTexts, 1, 0, true, false);}, 5000);
			break;
		case 1:
			let tmpSeconds = 5;
			imgTenant.src = 'img/char/tenant/sleeping.png';
			setCountdown(tmpSeconds);
			setTimeout(function() {imgTenant.src = 'img/char/tenant/normal.png';
								   setStatus(arrVariables, arrRequests);}, (tmpSeconds) * 1000 + 50);
			setTimeout(function() {setCanvas(arrVariables, arrTexts, 1, 0, true, false);}, (tmpSeconds + 3) * 1000);
			break;
		case 2:
			setEvent(arrVariables, arrTexts, arrRequests, 5, true);
			break;
		default:
			setCanvas(arrVariables, arrTexts, 1, 2, false, false);
			break;
	} // End switch
} // End of buttonFunctionality function

function setCanvas(arrVariables, arrTexts, intCode, intCodeSecondary, blnRemoveScreen, blnDeath) {
	/* Primary Action - What are we doing?
	* [0] - Do nothing
	*	[1]	-	Draw a canvas
	*			|_ Secondary Action - What exactly are we drawling?
	*						[0] - Main
	*						[1] - Login
	*						[2] - Logout
	*	[2] -	Update the status display */

	if (blnRemoveScreen) {
		setStopIntervals();
		let cntParent = document.body;
		while (cntParent.firstChild) {
			cntParent.removeChild(cntParent.firstChild);
		} // End while
	}

	switch (intCode) {
		case 0: // Do nothing
			break;
		case 1: // Draw a canvas
			switch (intCodeSecondary) {
				case 0: // Main
					let cntCommand = 	setElement(document.body, 'div', 'cntCommand', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
					let cntStatus =		setElement(cntCommand, 'div', 'cntStatus', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
					let cntButtonsMain = 	setElement(cntCommand, 'div', 'cntButtonsMain', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
					let imgTenant = 	setElement(document.body, 'img', 'imgTenant', 'image/png', 'img/char/tenant/normal.png', 'image', false, true);
					let lblEnergy = 	setElement(cntStatus, 'label', 'lblEnergy', '%NOTYPE%', 'Energy: ' + arrVariables[0] + '/' + arrVariables[3], 'label', true, false);
					let lblHunger = 	setElement(cntStatus, 'label', 'lblHunger', '%NOTYPE%', 'Hunger: ' + arrVariables[1] + '/' + arrVariables[4], 'label', true, false);
					let	lblSocial =		setElement(cntStatus, 'label', 'lblSocial', '%NOTYPE%', 'Social: ' + arrVariables[2] + '/' + arrVariables[5], 'label', true, false);
					let btnSleep =		setElement(cntButtonsMain, 'input', 'btnSleep', 'button', 'Sleep', 'button', false, false);
					let btnEat = 		setElement(cntButtonsMain, 'input', 'btnEat', 'button', 'Eat', 'button', false, false);
					let btnTalk =		setElement(cntButtonsMain, 'input', 'btnTalk', 'button', 'Talk', 'button', false, false);
					let btnLeave =		setElement(cntButtonsMain, 'input', 'btnLeave', 'button', 'Leave', 'button', false, false);

					btnLeave.style.marginRight = '0px';

					btnEat.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 1, 20], 0, true);};
					btnSleep.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, 20, 1, -10], 1, true);};
					btnTalk.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 2, 20], 2, true);};
					btnLeave.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 2, 20], 3, false);};

					setTimeout(function() {setBlink();}, 4000);
					setInterval(function(){getBackgroundUpdate(arrVariables, arrTexts)}, 7500);
					break;
				case 1: // Login
					let cntLogin = 				setElement(document.body, 'div', 'cntLogin', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
					let imgAdvocateLogin = 			setElement(cntLogin, 'img', 'imgAdvocateLogin', 'image/png', 'img/char/advocate/normal.svg', 'image', false, true);
					let lblTitleLogin = 				setElement(cntLogin, 'label', 'lblTitle', '%NOTYPE%', 'Welcome', 'label', true, false);
					let lblParagraphLogin =			setElement(cntLogin, 'label', 'lblParagraphLogin', '%NOTYPE%', 'Provide me your given data card from your last visit:', 'label', true, false);
					let boxDataLogin =			setElement(cntLogin, 'input', 'boxDataLogin', 'textbox', '', 'textbox', false, false);
					let cntButtonsLogin =			setElement(cntLogin, 'div', 'cntButtonsLogin', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
					let btnContinueLogin = 			setElement(cntButtonsLogin, 'input', 'btnContinueLogin', 'button', 'Here it is!', 'button', false, false);
					let btnBackLogin =				setElement(cntButtonsLogin, 'input', 'btnBackLogin', 'button', 'Huh?', 'button', false, false);

					btnContinueLogin.onclick = function(){getValidation(arrVariables, arrTexts);};
					btnBackLogin.onclick = function(){
						setEvent(arrVariables, arrTexts, [], 4, false);};
					break;
				default: // Logout
					let cntPrompt = 	setElement(document.body, 'div', 'cntPrompt', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
					let imgAdvocateLogout =	setElement(cntPrompt, 'img', 'imgAdvocateLogout', 'image/png', 'img/char/advocate/normal.png', 'image', false, true);
					let lblTitleLogout = setElement(cntPrompt, 'label', 'lblTitle', '%NOTYPE%', 'Aww, leaving already?', 'label', true, false);
					let lblParagraphLogout = setElement(cntPrompt, 'label', 'lblParagraphLogout', '%NOTYPE%', 'Before you go, here is our data card. Please don\'t forget about our existance!', 'label', true, false);
					let boxData = setElement(cntPrompt, 'input', 'boxData', 'textbox', getDataCard(arrVariables), 'textbox', false, false);
					let cntButtonsLogout = setElement(cntPrompt, 'div', 'cntButtonsLogout', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
					let btnContinueLogout =	setElement(cntButtonsLogout, 'input', 'btnContinueLogout', 'button', 'See ya!', 'button', false, false);
					let btnBackLogout = setElement(cntButtonsLogout, 'input', 'btnBackLogout', 'button', 'Hold on', 'button', false, false);
					btnContinueLogout.onclick = 	function(){location.href = 'https://www.google.com/';};
					btnBackLogout.onclick = 		function(){setCanvas(arrVariables, arrTexts, 1, 0, true, false)};
			}
			break;
		default: // Update the status display
			if (blnDeath){setDeath();}
			else {
				lblEnergy.firstChild.nodeValue = 'ENERGY: ' + arrVariables[0] + '/' + arrVariables[3];
				lblHunger.firstChild.nodeValue = 'HUNGER: ' + arrVariables[1] + '/' + arrVariables[4];
				lblSocial.firstChild.nodeValue = 'SOCIAL: ' + arrVariables[2] + '/' + arrVariables[5];
			} // End if
	} // End Switch
} // End of setCanvas function

function getBackgroundUpdate(arrVariables, arrTexts){
	let blnDeath = false

	for (let intInterval = 0; intInterval < arrVariables.length - 3; intInterval++) {
		arrVariables[intInterval] -= 1;
		if (arrVariables[intInterval] <= 0) {
			blnDeath = true;
			break;
		}
		else if (arrVariables[intInterval] > 100) {arrVariables[intInterval] = 100;} // End if
	} // End for

	setCanvas(arrVariables, arrTexts, 2, 0, false, blnDeath);

	// CONSIDER:	Maybe this is where random events can happen be called here?
} // End of getBackgroundUpdate function

function setCountdown(intSeconds){
	let cntParameter = setElement(document.body, 'div', 'cntParameter', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	let lblCountdown = setElement(cntParameter, 'label', 'lblCountdown', '%NOTYPE%', 'Starting countdown', 'label', true, false);
	let dteDeadline = new Date();

	dteDeadline.setSeconds(dteDeadline.getSeconds() + intSeconds);
	dteDeadline = dteDeadline.getTime();

	itvCountdown = setInterval(function() {
		let intDifference = dteDeadline - new Date().getTime();
		let arrTime = getReadableTime(intDifference);
		let strCountdown = "";

		arrTime = arrTime.map(String);

		for (let i = 0; i < arrTime.length; i++)
		{
			let strElement = arrTime[i];

			if (strElement.length == 1){
				strElement = "0" + strElement;
			} // End if

			strCountdown += strElement + ":";
		} // End for

		strCountdown = strCountdown.substring(0, strCountdown.length - 1);
		lblCountdown.firstChild.nodeValue = strCountdown;

		if (intDifference < 0) {
				clearInterval(itvCountdown);
				lblCountdown.remove();
		} // End if
	}, 1000);
} // End of setCountdown function

function startCare() {
	intMode = 1;
	setCanvas(arrVariables, arrTexts, 1, 1, false, false);
	setFade(true);
}