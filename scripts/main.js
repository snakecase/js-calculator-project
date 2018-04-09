const inputField = document.getElementById(`calc-input`);

const inputNumber = function (item) {
	item = item.currentTarget.textContent;
	const lastPart = inputField.textContent.split(/[-+*/ ]/).slice(-1);

	if (/^0$/.test(lastPart)) {
		inputField.textContent = inputField.textContent.replace(/.$/, item);
	} else {
		inputField.textContent += item;
	}
}

const isOperator = function (item) {
	return /[-+*/]/.test(item);
}

const inputOperator = function (item) {
	item = item.currentTarget.textContent;
	const lastSymbols = inputField.textContent.slice(-2);

	/* Check if there is an operator set already */
	if (isOperator(lastSymbols)) {
		inputField.textContent = inputField.textContent.replace(/ . $/, ` ${item} `);
	} else {
		inputField.textContent += ` ${item} `;
	}
}

const isDot = function (item) {
	return /[.]/.test(item);
}

const inputDot = function () {
	const lastSymbols = inputField.textContent.slice(-2);
	const lastPart = inputField.textContent.split(/[-+*/ ]/).slice(-1);

	if (inputField.textContent === ``) {
		inputField.textContent = `0.`;
	} else if (isOperator(lastSymbols)) {
		inputField.textContent += `0.`;
	} else if (!isDot(lastPart)) {
		inputField.textContent += `.`;
	}
}

const evaluate = function () {
	const lastChar = inputField.textContent.slice(-1);
	if (/[0-9]/.test(lastChar)) {
		inputField.textContent = eval(inputField.textContent);
	}
}

const listenButtons = function () {
	// Numbers section
	let btns = document.getElementsByClassName(`num-btn`);
	btns = Array.from(btns);
	btns.forEach(element => {
		element.onclick = inputNumber;
		});

	// Operators section
	let oprs = document.getElementsByClassName(`opr-btn`);
	oprs = Array.from(oprs);
	oprs.forEach(element => {
		element.onclick = inputOperator;
		});

	// Dot section
	const dot = document.getElementById(`dot-btn`);
	dot.onclick = inputDot;

	// Result section
	const result = document.getElementById(`result-btn`);
	result.onclick = evaluate;
}

listenButtons();