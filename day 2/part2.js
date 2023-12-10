const fs = require("fs");

/**
 * @param {string} record
 */
function getPowerOfFewestCubes(line) {
	const fewest = {};
	const colorRegex = /(red)|(green)|(blue)/;
	const record = line.split(":")[1];
	const showedCubes = record.replaceAll(";", ",").split(",");
	showedCubes.forEach((cube) => {
		const color = cube.match(colorRegex)[0];
		const amount = parseInt(cube.match(/\d+/)[0]);
		if (fewest[color] && fewest[color] > amount) {
			return;
		} else {
			fewest[color] = amount;
		}
	});
	return Object.values(fewest).reduce((acc, current) => acc * current, 1);
}

(() => {
	const lines = fs.readFileSync("./input.txt", "utf-8").split("\n");
	const result = lines.reduce((acc, current, index) => {
		return acc + getPowerOfFewestCubes(lines[index]);
	}, 0);
	console.log(result);
})();
