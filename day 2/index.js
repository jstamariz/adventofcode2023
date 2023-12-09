const fs = require("fs");
const possibleGames = {
	red: 12,
	green: 13,
	blue: 14,
};

/**
 * @typedef {Object} Subset
 * @property {string} color
 * @property {number} amount
 */

/**
 * @param {string} record
 */
function getGameId(record) {
	return parseInt(record.match(/\d+/)[0]);
}

/**
 * @param {string} record
 * @returns {Subset[]}
 */
function parseSubsets(record) {
	return Object.keys(possibleGames).map((color) => {
		const amountsRegex = new RegExp(`(\\d+) ${color}`, "g");
		return {
			color,
			amount: Array.from(record.matchAll(amountsRegex), (match) =>
				parseInt(match[1])
			).reduce((acc, current) => acc + current, 0),
		};
	});
}

/**
 * @param {string} record
 */
function parseGame(record) {
	const [gameName, subsets] = record.split(":");
	return {
		Id: getGameId(gameName),
		subsets: parseSubsets(subsets),
	};
}

(() => {
	let payableGames = 0;

	const lines = fs.readFileSync("./input.txt", "utf-8").split("\n");
	lines.forEach((line) => {
		const game = parseGame(line);
		console.log(game);
		const isPlayable = game.subsets.every((subset) => {
			return subset.amount <= possibleGames[subset.color];
		});

		if (isPlayable) {
			payableGames += game.Id;
		}
	});

	console.log(payableGames);
})();
