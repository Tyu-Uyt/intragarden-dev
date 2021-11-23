function buttonLayout(){
	setElement(cntBattleCommand, 'img', 'imgLeave', 'image/png', 'img/ugi/battle/leave.png', 'image', false, true);
	setElement(cntBattleCommand, 'img', 'imgGuard', 'image/png', 'img/ugi/battle/guard.png', 'image', false, true);
	setElement(cntBattleCommand, 'img', 'imgFight', 'image/png', 'img/ugi/battle/fight.png', 'image', false, true);
	
	imgFight.onclick = function() {
		removeContent(cntBattleCommand);
		setElement(cntBattleCommand, 'img', 'imgBack', 'image/png', 'img/ugi/battle/back.png', 'image', false, true);
		setElement(cntBattleCommand, 'img', 'imgSpeak', 'image/png', 'img/ugi/battle/speech.png', 'image', false, true);
		setElement(cntBattleCommand, 'img', 'imgMagic', 'image/png', 'img/ugi/battle/magic.png', 'image', false, true);
		setElement(cntBattleCommand, 'img', 'imgBrawl', 'image/png', 'img/ugi/battle/brawl.png', 'image', false, true);
			
		imgBack.onclick = function() {
			removeContent(cntBattleCommand);
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
	
	removeContent(cntBattleCommand);
	
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

	
	
	if (arrP1[0] <= 0 || arrP2[0] <= 0 || arrP1[2] <= 0 || arrP2[2] <= 0) {
		audBattle.pause();
		if (arrP1[0] <= 0) {
			alert('P2 Won; P1 lost by health');
		} else if (arrP1[2] <= 0) {
			alert('P2 Won; P1 lost by mental');
		} else if (arrP2[0] <= 0) {
			alert('P1 Won; P2 lost by health');
		} else {
			alert('P1 Won; P2 lost by mental');
		}

		
		setTimeout(function () {
			setFade(false);
		}, 800);

		setTimeout(function () {
			startMenu();
		}, 2000);

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

function startBattle() {
	intMode = 3;
	setElement(document.body, 'audio', 'audBattle', 'audio/ogg', 'aud/battle.ogg', '<NOCLASS>', false, true, true);
	setElement(document.body, 'div', 'cntBattlePattern', '%NOTYPE%', '%NOVALUE%', 'pattern', false, false);
	setElement(cntBattlePattern, 'div', 'cntBattleTopPattern', '%NOTYPE%', '%NOVALUE%', 'pattern', false, false);
	setElement(cntBattlePattern, 'div', 'cntBattleBottomPattern', '%NOTYPE%', '%NOVALUE%', 'pattern', false, false);
	setElement(document.body, 'img', 'imgBattleFoe', 'image/png', 'img/char/foe/foe.png', 'image', false, true);
	setElement(document.body, 'img', 'imgBattleTenant', 'image/png', 'img/char/tenant/battle/normal.png', 'image', false, true);
	setElement(document.body, 'img', 'imgBattleAdvocate', 'image/png', 'img/char/advocate/battle/normal.png', 'image', false, true);
	setElement(document.body, 'div', 'cntBattleCommand', '%NOTYPE%', '%NOVALUE%', '%NOCLASS%', false, false);
	buttonLayout();
	setFade(true);
	audBattle.play();
}