const fs = require("node:fs");
const Modifier = require("./modifier.js");
const Excluder = require("./excluder.js");
const Includer = require("./includer.js");

try {
	const rawCsv = fs.readFileSync("./202301.csv", "utf8").trim();

	const modificationsFileContents = fs.readFileSync("./refiners/202301/modifications.txt", "utf8");
	const exclusionFileContents = fs.readFileSync("./refiners/202301/exclusions.txt", "utf8");
	const inclusionFileContents = fs.readFileSync("./refiners/202301/inclusions.txt", "utf8");

	const splitCsv = rawCsv.split("\n");
	const markableCsv = splitCsv.map(line => ({
		delete: false,
		content: line,
	}));

	const modder = new Modifier(modificationsFileContents.trim());
	const excluder = new Excluder(exclusionFileContents.trim());
	const includer = new Includer(inclusionFileContents.trim());

	excluder.exclude(markableCsv);
	includer.include(markableCsv);

	console.log(markableCsv);
} catch (error) {
	console.log(error);
}

