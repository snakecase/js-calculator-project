const inputField = document.getElementById(`calc-input`);
let evaluated = false;

const inputNumber = function (item) {
	const lastPart = inputField.textContent.split(/[-+*/ ]/).slice(-1);

	if (evaluated) {
		evaluated = false;
		inputField.textContent = item;
	} else if (/^0$/.test(lastPart)) {
		// Replace 0 if display value begins with it
		inputField.textContent = inputField.textContent.replace(/0$/, item);
	} else {
		inputField.textContent += item;
	}
}

const isOperator = function (item) {
	return /[-+*/]/.test(item);
}

const isLastOperator = function (item) {
	return / [-+*/] $/.test(item);
}

const inputOperator = function (item) {
	if (evaluated) {
		evaluated = false;
		inputField.textContent = `0 ${item}`;
	} else if (isLastOperator(inputField.textContent)) {
		// Replace operator if it is set already
		inputField.textContent = inputField.textContent.replace(/ [-+*/] $/, ` ${item} `);
	} else {
		inputField.textContent += ` ${item} `;
	}
}

const isDot = function (item) {
	return /[.]/.test(item);
}

const inputDot = function () {
	const lastPart = inputField.textContent.split(/[-+*/ ]/).slice(-1);

	if (evaluated) {
		evaluated = false;
		inputField.textContent = `0.`;
	} else if (isLastOperator(inputField.textContent)) {
		inputField.textContent += `0.`;
	} else if (!isDot(lastPart)) {
		inputField.textContent += `.`;
	}
}

// Check if user injected some unrelated shit via DevTools etc.
const isDangerousToEval = function (item) {
	/[^0-9-+*/. ]/.test(item);
}

const evaluate = function () {
	if (evaluated) {
		evaluated = false;
		inputField.textContent = `0`;
	} else if (isDangerousToEval(inputField.textContent)) {
		return;
	} else if (!isOperator(inputField.textContent)) {
		return;
	} else if (/[0-9]$/.test(inputField.textContent)) {
		evaluated = true;
		inputField.textContent = eval(inputField.textContent);
	}
}

const cleanEntry = function () {
	if (evaluated || inputField.textContent.length === 1) {
		inputField.textContent = `0`;
	} else if (isLastOperator(inputField.textContent)) {
		// Remove operator and spaces around it
		inputField.textContent = inputField.textContent.slice(0, -3);
	} else {
		inputField.textContent = inputField.textContent.slice(0, -1);
	}
};

const listenButtons = function () {
	// Number buttons
	let btns = document.getElementsByClassName(`num-btn`);
	btns = Array.from(btns);
	btns.forEach(element => {
		element.onclick = function (event) {
			inputNumber(event.currentTarget.textContent);
		}
	});

	window.addEventListener(`keypress`, pressed => {
		if (/[0-9]/.test(pressed.key)) {
			inputNumber(pressed.key);
		}
	});

	// Operator buttons
	let oprs = document.getElementsByClassName(`opr-btn`);
	oprs = Array.from(oprs);
	oprs.forEach(element => {
		element.onclick = function (event) {
			inputOperator(event.currentTarget.textContent);
		}
	});

	window.addEventListener(`keypress`, pressed => {
		if (isOperator(pressed.key)) {
			inputOperator(pressed.key);
		}
	});

	// Dot button
	const dot = document.getElementById(`dot-btn`);
	dot.onclick = inputDot;

	window.addEventListener(`keypress`, pressed => {
		if (isDot(pressed.key)) {
			inputDot();
		}
	});

	// Result button
	const result = document.getElementById(`result-btn`);
	result.onclick = evaluate;

	window.addEventListener(`keypress`, pressed => {
		if (/Enter|=/.test(pressed.key)) {
			evaluate();
		}
	});

	// Backspace button
	const backspace = document.getElementById(`backspace-btn`);
	backspace.onclick = cleanEntry;

	window.addEventListener(`keydown`, pressed => {
		if (/Backspace|Delete/.test(pressed.key)) {
			cleanEntry();
		}
	});

	// Reset button
	const reset = document.getElementById(`reset-btn`);
	reset.onclick = function () {
		inputField.textContent = `0`;
	};
}

listenButtons();