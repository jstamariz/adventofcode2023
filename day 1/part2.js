const fs = require("fs");
const valuesRegex =
	/(?=(([1-9])|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)))/g;
const numbers = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

/**
 * @param {string} word
 * @returns {number}
 */
function getNumber(word) {
	return numbers[word];
}

/**
 * @param {string} line
 * @returns {number}
 */
function getCalculationValue(line) {
	const results = Array.from(line.matchAll(valuesRegex), (match) => match[1]);
	let calculationValue;

	const firstNumber = getNumber(results.at(0)) ?? results.at(0);
	if (results.length === 1) {
		calculationValue = parseInt(firstNumber + firstNumber);
	}
	const secondNumber =
		getNumber(results.at(results.length - 1)) ?? results.at(results.length - 1);
	calculationValue = parseInt(firstNumber + secondNumber);

	console.log(
		`line is ${line} and results are ${results}, so result is ${calculationValue}`
	);
	return calculationValue;
}

(() => {
	console.log(
		fs
			.readFileSync("input.txt", "utf-8")
			.split("\n")
			.reduce((accumulator, current) => {
				return accumulator + getCalculationValue(current);
			}, 0)
	);
})();
