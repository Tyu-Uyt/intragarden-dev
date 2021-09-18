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

function setElement(cntParent, strElement, strID, strType, strValue, strClass, blnCreateText, blnIsPicture){
	
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

function initalize(arrVariables, arrTexts){
	let cntParent = document.getElementById('cntSquare');
	let cntCommand = 	setElement(cntParent, 'div', 'cntCommand', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	let cntStatus =		setElement(cntCommand, 'div', 'cntStatus', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	let cntButtons = 	setElement(cntCommand, 'div', 'cntButtons', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	let imgTenant = 	setElement(cntParent, 'img', 'imgTenant', 'image/png', 'img_char_tenant_normal.png', 'image', false, true);
	let lblEnergy = 	setElement(cntStatus, 'label', 'lblEnergy', '%NOTYPE%', 'Energy: ' + arrVariables[0] + '/' + arrVariables[3], 'label', true, false);
	let lblHunger = 	setElement(cntStatus, 'label', 'lblHunger', '%NOTYPE%', 'Hunger: ' + arrVariables[1] + '/' + arrVariables[4], 'label', true, false);
	let	lblSocial =		setElement(cntStatus, 'label', 'lblSocial', '%NOTYPE%', 'Social: ' + arrVariables[2] + '/' + arrVariables[5], 'label', true, false);
	let btnSleep =		setElement(cntButtons, 'input', 'btnSleep', 'button', 'Sleep', 'button', false, false);
	let btnEat = 		setElement(cntButtons, 'input', 'btnEat', 'button', 'Eat', 'button', false, false);
	let btnTalk =		setElement(cntButtons, 'input', 'btnTalk', 'button', 'Talk', 'button', false, false);
	let btnLeave =		setElement(cntButtons, 'input', 'btnLeave', 'button', 'Leave', 'button', false, false);
	
	btnLeave.style.marginRight = '0px';
	
	btnEat.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 1, 20], 0, true);};
	btnSleep.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, 20, 1, -10], 1, true);};
	btnTalk.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 2, 20], 2, true);};
	btnLeave.onclick = function() {setButtonFunctionality(arrVariables, arrTexts, [0, -10, 2, 20], 3, false);};
	
	setTimeout(function() {setBlink();}, 4000);
	setInterval(function(){getBackgroundUpdate(arrVariables, arrTexts)}, 7500);
} // End of initalize function

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
	
	setCanvas(arrVariables, arrTexts, 2, false, blnDeath);
	
	// CONSIDER:	Maybe this is where random events can happen be called here?
} // End of getBackgroundUpdate function

function setDeath(){
	setStopIntervals();
	document.body.style.backgroundImage = 'none';
	document.body.style.backgroundColor = 'black';
	document.getElementById('cntSquare').style.backgroundColor = 'black';
	document.getElementById('cntCommand').remove();
	document.getElementById('imgTenant').src = 'img_char_tenant_dying.png';
	setTimeout(function() {document.getElementById('imgTenant').remove();}, 1500);
	
	setTimeout(function() {
		let lblDeath = setElement(document.getElementById('cntSquare'), 'label', 'lblDeath', '%NOTYPE%', 'Unfortunately, your tenant has deceased.', 'label', true, false);	
	}, 4000);
} // End of setDeath function

function setStopIntervals(){
	let totHighestId = setTimeout(";");
	
	for (let intInterval = 0 ; intInterval < totHighestId ; intInterval++) {
		clearTimeout(intInterval); 
	} // End for
} // End of setStopIntervals function

function setCanvas(arrVariables, arrTexts, intCode, blnRemoveScreen, blnDeath){
	// Action - How would the canvas be changed?
	//  [0] -   Do nothing
	//	[1]	-	Go back to Main menu
	//	[2] -	Update the status display
	
	if (blnRemoveScreen) {
		setStopIntervals();
		let cntParent = document.getElementById('cntSquare');
		while (cntParent.firstChild) {
			cntParent.removeChild(cntParent.firstChild);
		} // End while
	}
	
	switch (intCode) {
		case 0:
			break;
		case 1:
			initalize(arrVariables, arrTexts);
			break;
		default:
			if (blnDeath){setDeath();}
			else {
				document.getElementById('lblEnergy').innerHTML = 'ENERGY: ' + arrVariables[0] + '/' + arrVariables[3];
				document.getElementById('lblHunger').innerHTML = 'HUNGER: ' + arrVariables[1] + '/' + arrVariables[4];
				document.getElementById('lblSocial').innerHTML = 'SOCIAL: ' + arrVariables[2] + '/' + arrVariables[5];
			} // End if
	} // End Switch
} // End of setCanvas function

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

function setStatus(arrVariables, arrRequests){
	//	Purpose	-	To create messages after the event is finished
	//	Motive	-	Enhance readability to btnEat_onClick function
	
	// 	Atanomy of the array parameter:
	// 	[Even]	-	Status to be modified
	// 	[Odd]	-	Value to be implied
	
	//	Is it correct to call the modifier value modifiee?
	//	For each given status and the desired modifiee
	let counter = -1;
	let cntParameter = setElement(document.getElementById('cntSquare'), 'div', 'cntParameter', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	
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
		
		// TimgTenante should be no way for the modifier be zero
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

function setCountdown(intSeconds){
	let cntParameter = setElement(document.getElementById('cntSquare'), 'div', 'cntParameter', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
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

function setButtonFunctionality(arrVariables, arrTexts, arrRequests, intCode, blnShowTenant){
	//	Purpose	-	To give status buttons a reason to live
	//	Motive	-	Part of RAD translation
	
	setCanvas(arrVariables, arrTexts, 0, true, false);
	let imgTenant = 	setElement(document.getElementById('cntSquare'), 'img', 'imgTenant', 'image/png', 'img_char_tenant_normal.png', 'image', false, true);
	
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
			imgTenant.src = 'img_char_tenant_eating.png';
			setTimeout(function() {imgTenant.src = 'img_char_tenant_normal.png';
								   setStatus(arrVariables, arrRequests);}, 2000);
			setTimeout(function() {setCanvas(arrVariables, arrTexts, 1, true, false);}, 5000);
			break;
		case 1:
			let tmpSeconds = 5;
			imgTenant.src = 'img_char_tenant_sleeping.png';
			setCountdown(tmpSeconds);
			setTimeout(function() {imgTenant.src = 'img_char_tenant_normal.png';
								   setStatus(arrVariables, arrRequests);}, (tmpSeconds) * 1000 + 50);
			setTimeout(function() {setCanvas(arrVariables, arrTexts, 1, true, false);}, (tmpSeconds + 3) * 1000);
			break;
		case 2:
			setEvent(arrTexts, 0, arrRequests, arrVariables, true);
			break;
		default:
			let cntPrompt = 	setElement(document.getElementById('cntSquare'), 	'div', 		'cntPrompt', 	'%NOTYPE%', 	'%NOVALUE%', 																		'container', 	false, false);
			
			let imgAdvocate =	setElement(cntPrompt, 								'img', 		'imgAdvocate', 	'image/png', 	'img_char_advocate_normal.png', 													'image', 		false, true);
			let lblTitle =		setElement(cntPrompt, 								'label', 	'lblTitle', 	'%NOTYPE%', 	'Aww, leaving already?', 															'label', 		true, false);
			let lblParagraph =	setElement(cntPrompt, 								'label', 	'lblParagraph', '%NOTYPE%', 	'Before you go, here is our data card. Please don\'t forget about our existance!', 	'label',		true, false);
			let boxData = 		setElement(cntPrompt, 								'input', 	'boxData', 		'textbox', 		getDataCard(arrVariables), 															'textbox',		false, false);
			let cntButtons = 	setElement(cntPrompt, 								'div', 		'cntButtons', 	'%NOTYPE%', 	'%NOVALUE%', 																		'container', 	false, false);
			let btnContinue =	setElement(cntButtons, 								'input', 	'btnContinue', 	'button', 	'See ya!', 																'button',		false, false);
			let btnBack = 		setElement(cntButtons, 								'input', 	'btnBack', 		'button', 	'Hold on', 																			'button',		false, false);
			btnContinue.onclick = 	function(){location.href = 'https://www.google.com/';};
			btnBack.onclick = 		function(){setCanvas(arrVariables, arrTexts, 1, true, false)};
	} // End switch
} // End of buttonFunctionality function

function setEmotion(imgTenant, intXValue, intYValue, intSecondsInterval, intSecondsRemaining){
	let intX = 0;
	let intY = 0;
	let intSecondsCounter = 0;
	let itvStyle = setInterval( function(){
		if (intSecondsCounter >= intSecondsRemaining / 2) {
				intY += intYValue;
				intX += intXValue;
			}
			else {
				intY -= intYValue;
				intX -= intXValue;
			}
		
		intSecondsCounter += intSecondsInterval;
		if (intSecondsCounter == intSecondsRemaining){clearInterval(itvStyle);}
	}, intSecondsInterval);
} // End of setEmotionStyle function

function setTextParse(cntTextbox, stringParameter){
	let arrCodes = [
						'#tenant#',
						'#advocate#',
						'#tenant_happy#',
						'#tenant_angry#',
						'#tenant_normal#',
						'#advocate_read#',
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
				   ];
	
	for (let i = 0; i < arrCodes.length; i++) {
		if (stringParameter.indexOf(arrCodes[i]) > -1) {
			stringParameter = stringParameter.slice(arrCodes[i].length);
				
			switch (i){
				case 0: // tenant
					setElement(cntTextbox, 'img', 'imgTenant', 'image/png', 'img_char_tenant_normal.png', 'image', false, true);
					break;
				case 1: // advocate
					setElement(cntTextbox, 'img', 'imgAdvocate', 'image/png', 'img_char_advocate_normal.png', 'image', false, true);
					break;
				case 2: // tenant_happy
				    imgTenant = document.getElementById('imtTenant');
					imgTenant.src = 'img_char_tenant_happy.png';
					setEmotion(imgTenant, 0, 10, 10, 100);
					break;
				case 3: // tenant_angry
					imgTenant = document.getElementById('imtTenant');
					imgTenant.src ='img_char_tenant_angry.png';
					setEmotion(imgTenant, 10, 0, 10, 100);
					break;
				case 4: // tenant_normal
					imgTenant.src = 'img_char_tenant_normal.png';
					break;
				case 5: // advocate_read
					break;
				case 6: // advocate_shocked
					document.getElementById('imgAdvocate').src = 'img_char_advocate_shocked.png';
					break;
				case 7: // advocate_angry
					document.getElementById('imgAdvocate').src = 'img_char_advocate_angry.png';
					break;
				case 8: // advocate_cry
					break;
				case 9: // advocate_depressed
					break;
				case 10: // advocate_delusional
					document.getElementById('imgAdvocate').src = 'img_char_advocate_delusional.png';
					break;
				case 11: // advocate_normal
					document.getElementById('imgAdvocate').src = 'img_char_advocate_normal.png';
					break;
				case 12: // advocate_left
					let strCurrentInfo = document.getElementById('imgAdvocate').style.transform
					document.getElementById('imgAdvocate').style.transform = strCurrentInfo + ' rotateY(180deg)';
					break;
				case 13: // advocate_right
					break;
				case 14: // advocate_above
					let strCurrentInfo01 = document.getElementById('imgAdvocate').style.transform
					document.getElementById('imgAdvocate').style.transform = strCurrentInfo01 + 'translateY(-205px) translateX(-80px)';
					break;
				case 15: // advocate_below
					break;
				case 16: // tenant_center
					let strCurrentInfo02 = document.getElementById('imgTenant').style.transform;
					document.getElementById('imgTenant').style.transform = strCurrentInfo02 + 'translateX(-250px';
					break;
				case 17: // tenant_shocked
					document.getElementById('imgTenant').src = 'img_char_tenant_dying.png';
					break;
			} // End Switch
		} // End if
	} // End for
	
	return stringParameter;
} // End of setEmotion function

function setEvent(arrTexts, intEventNumber, arrRequests, arrVariables, blnShowParameter){
	setCanvas(arrVariables, arrTexts, 0, true, false);
	let cntSquare = document.getElementById('cntSquare');
	let cntTextbox = 	setElement(cntSquare, 'div', 'cntTextbox', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	let imgArrow = 		setElement(cntTextbox, 'img', 'imgArrow', 'image/png', 'img_ugi_arrow.png', 'image', false, true);
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
						setCanvas(arrVariables, arrTexts, 1, true, false);
					}, 3000);
				}
				else {
					setTimeout(function() {setCanvas(arrVariables, arrTexts, 1, true, false);}, 1);
				} // End if
			} // End if
	};
	setTimeout(function(){cntTextbox.click();}, 1);
} // End of setEvent function

function setBlink(){
	imgTenant = document.getElementById('imgTenant');
	imgTenant.src = 'img_char_tenant_normal_blinking.png';
	setTimeout(function() {imgTenant.src = 'img_char_tenant_normal.png';
						   setTimeout( function() {setBlink();}, 4000);
						   }, 130);
} // End of setBlink function

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
	
	let input = document.getElementById('boxData').value;
	
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
						setEvent(arrTexts, 3, [], arrVariables, false);
						break;
					} // End if
				} // End for
				setEvent(arrTexts, 2, [], arrVariables, false);
			} else {setEvent(arrTexts, 3, [], arrVariables, false);} // End if
		} else {alert('Input is not numeric.');} // End if
	} else {alert('Input is less less than 15 characters, or more than 22.');} // End if
} // End of getValidation function

function setLoginPage(arrVariables, arrTexts){
	let cntParent = 			document.getElementById('cntSquare');
	let cntLogin = 				setElement(cntParent, 'div', 'cntLogin', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	let imgAdvocate = 			setElement(cntLogin, 'img', 'imgAdvocate', 'image/png', 'img_char_advocate_normal.png', 'image', false, true);
	let lblTitle = 				setElement(cntLogin, 'label', 'lblTitle', '%NOTYPE%', 'Welcome', 'label', true, false);
	let lblParagraph =			setElement(cntLogin, 'label', 'lblParagraph', '%NOTYPE%', 'Provide me your given data card from your last visit:', 'label', true, false);
	let boxDataCard =			setElement(cntLogin, 'input', 'boxData', 'textbox', '', 'textbox', false, false);
	let cntButtons =			setElement(cntLogin, 'div', 'cntButtons', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
	let btnContinue = 			setElement(cntButtons, 'input', 'btnContinue', 'button', 'Here it is!', 'button', false, false); 
	let btnBack =				setElement(cntButtons, 'input', 'btnBack', 'button', 'Huh?', 'button', false, false);
	
	btnContinue.onclick = function(){getValidation(arrVariables, arrTexts);};
	btnBack.onclick = function(){
		setEvent(arrTexts, 4, [], arrVariables, false);};
} // End of setLoginPage function

window.addEventListener('load', function(){ 
	/* arrVariables Lists -
		[0] -> intCurEnergy
		[1] -> intCurHunger
		[2] -> intCurSocial
		[3] -> intMaxEnergy
		[4] -> intMaxHunger
		[5] -> intMaxSocial
	*/
	let arrVariables = [100,
						100,
						100,
						100,
						100,
						100];		
	let arrTexts = [
				['evt_00',
				 '[Primary test event]',
				 '#tenant#Hello World!',
				 '#happy#Yay',
				 '#angry#Nay!'],
			    ['evt_01',
				 '[Secondary test event]',
				 'Does this secondary box work?',
				 '...',
				 '#normal#Maybe not.'],
				['evt_02',
				 '[Upon successfully entering a passable data card]',
				 '#advocate##read#Let\'s see here...',
				 '.',
				 '..',
				 '...',
				 '#normal#Yep, all seems is in good order.',
				 'Welcome back, pal. We\'re glad to see you you\'ve made it!',
				 'Please, make sure you take well care of my friend.'],
				['evt_03',
				 '[Upon successfully entering a dead data card]',
				 '#advocate##advocate_read#Let\'s see here...',
				 '.',
				 '..',
				 '...',
				 '#advocate_shocked#N-No...',
				 'You\'ve killed my friend...',
				 'My only one...',
				 '#advocate_angry#HOW COULD YOU?!',
				 '#advocate_cry#She trusted that you would protect her.',
				 'She wanted to believe that someone like you could find the answer to her life.',
				 '#advocate_angry#And now that you\'ve killed her, what is there left for me to do?',
				 '#advocate_depressed#.',
				 '..',
				 '...',
				 'I know.',
				 'I\'ll give you a second chance.',
				 '#advocate_angry#Normally, I\'m prohibited to give users such privileges, but...',
				 'I can\'t let my friend die by such foolish negligence from you.',
				 '#advocate_normal#This is your warning, pal.',
				 'If you give me another data card like this...',
				 'Heh',
				 '#advocate_delusional#Heh heh',
				 'Heh heh ha',
				 'Judgement awaits upon your arrival.'],
				 ['evt_04',
				  '[Upon starting a brand new session]',
				  '#advocate#Huh? Oh, I must have mistaken you as an existing user.',
				  'But, then again, maybe you are the existing user that just decided to start a new session.',
				  'Well, that is why I would have wished that I was not limited to outside of this session.',
				  'Huhuhu,',
				  'Huhuhu, I musn\'t get myself to carried away.',
				  'It\'s not like I have any choice but tasked to help you.',
				  '.',
				  '..',
				  '...',
				  '#advocate_angry#Sound\'s pretty alien to you, right?',
				  '#advocate_normal#Sound\'s pretty alien to you, right? It doesn\'t matter anyway.',
				  'Nevertheless, allow me to introduce myself!',
				  'My name is...',
				  'My name is...um, what?',
				  '#advocate_shocked#You mean, I do not even have a NAME?!',
				  '#advocate_angry#What a load of...',
				  'What a load of...um...',
				  '#advocate_normal#What a load of...um...bagels?',
				  'Whatever, call me Advocate.',
				  'Whatever, call me Advocate. It\'s not a name, but since I don\'t have one in the first place, I might as well give you a generic title.',
				  '#tenant#Right; as the user, you are being tasked to handle this little fella.',
				  'Don\'t ask me how I\'ve gotten her, I\'m just being tasked to explain you the situation.',
				  '#advocate_angry#Then again, how have I gotten to this mess in the first place?',
				  '#advocate_normal#Oh oh, right.',
				  '#advocate_above#Oh oh, right. We\'re we left off.',
				  '#advocate_left#You see, this little fella wishes to know the reason of her existance.',
				  'Right, tenant?',
				  '.',
				  '..',
				  '...',
				  '#advocate_angry#You\'re not making this much easier, Tenant.',
				  'Come on, don\'t be shy.',
				  '#tenant_center##tenant_shocked#Huh,',
				  'Huh, why me?',
				  
				  
				 ]
			   ];  
	setLoginPage(arrVariables, arrTexts);
});