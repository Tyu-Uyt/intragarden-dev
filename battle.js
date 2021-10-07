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

function buttonLayout(){
	setElement(cntCommand, 'img', 'imgLeave', 'image/png', 'leave.png', 'image', false, true);
	setElement(cntCommand, 'img', 'imgGuard', 'image/png', 'guard.png', 'image', false, true);
	setElement(cntCommand, 'img', 'imgFight', 'image/png', 'fight.png', 'image', false, true);
	
	imgFight.onclick = function() {
		removeContent(cntCommand);
		setElement(cntCommand, 'img', 'imgBack', 'image/png', 'back.png', 'image', false, true);
		setElement(cntCommand, 'img', 'imgSpeak', 'image/png', 'speech.png', 'image', false, true);
		setElement(cntCommand, 'img', 'imgMagic', 'image/png', 'magic.png', 'image', false, true);
		setElement(cntCommand, 'img', 'imgBrawl', 'image/png', 'brawl.png', 'image', false, true);
			
		imgBack.onclick = function() {
			removeContent(cntCommand);
			buttonLayout();
		}
		
		// <-- Ghost Breakpoint -->
		imgSpeak.onclick = function() {
			endTurn(DECISIONS[2]);
		}
		
		imgMagic.onclick = function() {
			if (arrP1[1] > 0) {
				endTurn(DECISIONS[1]);
			} else {
				alert('Not enough magic!');
			}
		}
		
		imgBrawl.onclick = function() {
			endTurn(DECISIONS[0]);
		}
	}
	
	imgGuard.onclick = function() {
		endTurn(DECISIONS[3]);
	}
}

function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
}

function startAttack(arrFrom, arrTo, intDecision, strName){
	switch(intDecision){
		case 0: // Brawl
			arrTo[0] -= arrAttack[intDecision];
			console.log(strName + ' used brawl');
			break;
		case 1: // Magic
			arrTo[0] -= arrAttack[intDecision];
			arrFrom[intDecision] -= arrAttack[intDecision];
			
			if (arrFrom[intDecision] < 0) {
				arrFrom[intDecision] = 0;
			}
			
			console.log(strName + ' used magic');
			break;
		case 2: // Speech
			if (getRandomInt(arrTo[3]+1) < arrTo[3]){
				arrTo[2] -= arrAttack[intDecision];
				console.log(strName + ' used speech');
			} else {
				console.log(strName + ' failed on speech');
			}
			break;
		default: // Guard
		{
			console.log(strName + ' guard itself');
		}
	}
}

function endTurn(intP1Decision) {
	let blnCanProceed = false;
	let arrInLine = [arrP1, arrP2];
	let arrInLineDecision = [];
	let intP2Decision;
	
	removeContent(cntCommand);
	
	// Have AI make a decision
	while (blnCanProceed == false){
		intP2Decision = DECISIONS[getRandomInt(3)];
		
		if (intP2Decision != 1 || arrP2[1] > 0){
			blnCanProceed = true;
		}
	}
	
	// Shuffle and align the in line to their choices
	shuffleArray(arrInLine);
	
	// <-- Ghost Breakpoint -->
	(arrInLine[0][4] == 'P1') ? arrInLineDecision[0] = intP1Decision : arrInLineDecision[0] = intP2Decision;
	(arrInLine[1][4] == 'P1') ? arrInLineDecision[1] = intP1Decision : arrInLineDecision[1] = intP2Decision;
	
	// Start attacking
	if (arrInLineDecision[0] != arrInLineDecision[1]) {
		for (let i = 0; i < arrInLine.length; i++){
			if (i == 0){
				arrAttack = ATTACKS[2];
				startAttack(arrInLine[0], arrInLine[1], arrInLineDecision[0], arrInLine[0][4]);
			} else {
				(arrInLineDecision[0] == 3) ? arrAttack = ATTACKS[0] : arrAttack = ATTACKS[1];
				startAttack(arrInLine[1], arrInLine[0], arrInLineDecision[1], arrInLine[1][4]);
			}
		}
	} else {
		arrAttack = ATTACKS[0];
		let intBaseDecision = arrInLineDecision[0];
		arrP1[intBaseDecision] -= arrAttack[intBaseDecision];
		
		if (intBaseDecision < 2) {
			
			
			if (intBaseDecision == 0){
				console.log('Both used brawl!');
			} else {
				arrP1[1] -= arrAttack[intBaseDecision];
				console.log('Both used magic!');
			}
		} else if (intBaseDecision == 2) {
			console.log('Both used speech!');
		} else {
			console.log('Both did nothing!');
		}
	}

	
	
	if (arrP1[0] <= 0 || arrP2[0] <= 0 || arrP1[2] <= 0 || arrP2[2] <= 0){
		if (arrP1[0] <= 0) {
			alert('P2 Won; P1 lost by health');
		} else if (arrP1[2] <= 0) {
			alert('P2 Won; P1 lost by mental');
		} else if (arrP2[0] <= 0) {
			alert('P1 Won; P2 lost by health');
		} else {
			alert('P1 Won; P2 lost by mental');
		}
		
		setTimeout(function() {
			setElement(document.body, 'div', 'fadeOut', '%NOTYPE%', '%NOVALUE%', 'container', false, false);
		}, 3000);
		
		setTimeout(function() {
			removeContent(document.body);
		}, 4000);
	} else {
		// Count a turn
		arrGeneral[0] += 1;
		
		// Return to P1 decision
		setTimeout(function() {
			buttonLayout();
		}, 1000);
	}

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function removeContent(cntParent){
		while (cntParent.firstChild) {
			cntParent.removeChild(cntParent.firstChild);
		} // End while
}

function startBattle() {
	buttonLayout();
}