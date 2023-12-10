/**
 * @typedef {Object} Subset
 * @property {string} color
 * @property {number} amount
 */

const fs = require("fs");
const colorRegex = /(red)|(green)|(blue)/;

const possibleGames = {
	red: 12,
	green: 13,
	blue: 14,
};

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
	const showedCubes = record.replaceAll(";", ",").split(",");
	return showedCubes.map((cube) => ({
		color: cube.match(colorRegex)[0],
		amount: parseInt(cube.match(/\d+/)[0]),
	}));
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
		console.log(game.Id);
		const isPlayable = game.subsets.every((subset) => {
			console.log(subset);
			return subset.amount <= possibleGames[subset.color];
		});

		if (isPlayable) {
			payableGames += game.Id;
		}
	});

	console.log(payableGames);
})();
