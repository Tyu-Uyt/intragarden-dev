/*
	TODO: Introductory comments
*/

function createButton(type, name, value, parentSource) {
	let temp_button = document.createElement('input');
	temp_button.setAttribute('type', type);
	temp_button.setAttribute('id', name);
	temp_button.setAttribute('value', value);
	parentSource.appendChild(temp_button);
	
	return temp_button;
}

function createPicture(picLocation, parentSource, name) {
	let temp_picture = document.createElement('img');
	temp_picture.src = picLocation;
	temp_picture.setAttribute('id', name);
	parentSource.appendChild(temp_picture);
	
	return temp_picture;
}

function createLabel(text, name, parentSource) {
	
	let temp_label = document.createElement('LABEL');
	let temp_text = document.createTextNode(text);
	temp_label.appendChild(temp_text);
	temp_label.setAttribute('id', name);
	parentSource.appendChild(temp_label);
	
	temp_label.style.margin = '10px';
	return temp_label;
}

function createPre(text, name, parentSource) {
	let temp_pre = document.createElement('pre');
	let temp_text = document.createTextNode(text);
	temp_pre.appendChild(temp_text);
	parentSource.appendChild(temp_pre);
	
	return temp_pre;
}

function createContainer(parentSource, name) {
	let temp_container = document.createElement('div');
	temp_container.setAttribute('id', name);
	parentSource.appendChild(temp_container);
	
	return temp_container;
}

function initalize() {

	/* TODO: Header Comment */
	let src = document.getElementById('square');
	
	// TODO : Add Integers
	let intMaxEnergy = 100;
	let intMaxHunger = 100;
	let intMaxSocial = 100;

	let intCurEnergy = 75;
	let intCurHunger = 50;
	let intCurSocial = 25;	
	
	// 	Add Images
	let picCharacter = createPicture('img_tempCharacter.png', src, 'picCharacter');
	picCharacter.style.display = 'block';
	picCharacter.style.marginLeft = 'auto';
	picCharacter.style.marginRight = 'auto';
	
	//	Add Containers
	
	// Also known as the Command Container
	let cntCommand = createContainer(src, 'cntCommand');
	cntCommand.style.position = 'absolute';
	cntCommand.style.width = '100%';
	cntCommand.style.bottom = '3%';
	
	// Also known as the Status Container
	let cntStats = createContainer(cntCommand, 'cntStats');
	cntStats.style.textAlign = 'center';
	cntStats.style.position = 'relative';
	
	// Also known as the Action Container
	let cntButtons = createContainer(cntCommand, 'cntButtons');
	cntButtons.style.position = 'absolute';
	cntButtons.style.marginLeft = '46%';
	
	// 	Add Labels
	
	let lblEnergy = createLabel('ENERGY:', 'energy_label', cntStats);
	let lblEnergyValue = createLabel(intCurEnergy + '/' + intMaxEnergy, 'energy_value', cntStats);
	let lblHunger = createLabel('HUNGER:', 'hunger_label', cntStats);
	let lblHungerValue = createLabel(intCurHunger + '/' + intMaxHunger, 'hunger_value', cntStats);
	let lblSocial = createLabel('SOCIAL:', 'social_label', cntStats);
	let lblSocialValue = createLabel(intCurSocial + '/' + intMaxSocial, 'social_value', cntStats);
	
	// 	Add Buttons
	//		|_	Each buttons must have their inner functions	
	//		|_	Ensure that OnClick method is functional
	
	let btnEat = createButton('button', 'btnEat', 'Eat', cntButtons);
	let btnSleep = createButton('button', 'btnSleep', 'Sleep', cntButtons);
	let btnTalk = createButton('button', 'btnTalk', 'Talk', cntButtons);
	let btnGoodbye = createButton('button', 'btnGoodbye', 'Goodbye', cntButtons);
	
	return [intCurEnergy, intCurHunger, intCurSocial, intMaxEnergy, intMaxHunger, intMaxSocial];
}

function update(intActionCode, arrParent) {
	/* Action Codes -
		0 -> Decrease stats by 5
	*/
	
	let blnStartDeathSequence = false
	
	if (intActionCode == 0) {
		// TODO: Continue with migrating more VB.NET logic.
		// 	|_ Especially to stop the values going to negative
		
		for (let i = 0; i < arrParent.length - 3; i++) {
			
			arrParent[i] -= 1;
		}
	} // End if
	
	
	// If one of the current status is less then or equal to 0, then
	// set the flag to initalize death Sequence.
	// Otherwise, if the current status is greater than 100, then
	// normalize it to 100
	for (let i = 0; i < arrParent.length - 3; i++) {
			
		if (arrParent[i] <= 0) {
			blnStartDeathSequence = true;
			break;
		}
		else if (arrParent[i] > 100) {
			arrParent[i] = 100;
		}
	}
	
	refreshCanvas(arrParent, blnStartDeathSequence, );
} // End of update function

function refreshCanvas(arrParent, blnStartDeathSequence) {
	
	if (blnStartDeathSequence) {
		deathSequence();
	}
	else {
		document.getElementById('energy_value').innerHTML = arrParent[0] + '/' + arrParent[3];
		document.getElementById('hunger_value').innerHTML = arrParent[1] + '/' + arrParent[4];
		document.getElementById('social_value').innerHTML = arrParent[2] + '/' + arrParent[5];
	}
	
}

function deathSequence() {
	
	// Hack to stop all timers. Thanks SeanDowney!
	let highestTimeoutId = setTimeout(";");
	for (let i = 0 ; i < highestTimeoutId ; i++) {
		clearTimeout(i); 
	}

	document.getElementById('square').style.backgroundColor = 'black';
	document.getElementById('cntCommand').remove();
	document.getElementById('picCharacter').src = 'img_tempCharacterDying.png';
	setTimeout(function() {document.getElementById('picCharacter').remove();}, 1500);
	
	// NOTE: There is an issue with the pre element. If there are tabs within, to beautify the code, it 'literally' interprets as an actual text.
	// TODO: Find a better solution to format the text vertical AND beautify the code
	
	setTimeout(function() {
		let lblDeathText = createPre('Congratulations\n\nYou have KILLED your child.\nARE YOU HAPPY WITH YOUR DECISION?!\n\nCome back when you realized what you have done.\nThere is no turning back now...',
									  'death_pre', document.getElementById('square'));
		lblDeathText.style.color = '#fff';
		lblDeathText.style.textAlign = 'center';
		lblDeathText.style.position = 'relative';
		lblDeathText.style.top = '50%';
		lblDeathText.style.fontWeight = 'bolder';
		
	}, 4000);
	
}

// Start reading JavaScript AFTER the page is loaded and parsed
window.addEventListener('load', function(){ 
	
	/* TODO: Header Comment */
	
	/* arrVariables Lists -
		[0] -> intCurEnergy
		[1] -> intCurHunger
		[2] -> intCurSocial
		[3] -> intMaxEnergy
		[4] -> intMaxHunger
		[5] -> intMaxSocial
	*/
	
	arrVariables = initalize();
	setInterval(function(){update(0, arrVariables)}, 5000);
});