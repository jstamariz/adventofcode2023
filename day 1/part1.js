const fs = require("fs");
const contents = fs.readFileSync("./input.txt", "utf-8").split("\n");

/**
 * @param {string} line
 * @returns {number}
 */
function getDigitsFromLine(line) {
	const digits = line.match(/[1-9]/g);
	if (digits.length === 1) {
		return parseInt(digits + digits);
	} else {
		return parseInt(digits[0] + digits[digits.length - 1]);
	}
}

console.log(
	contents.reduce((accumulator, current) => {
		return accumulator + getDigitsFromLine(current);
	}, 0)
);
