const fs = require("node:fs");
const Modifier = require("./modifier.js");
const Excluder = require("./excluder.js");
const Includer = require("./includer.js");

const SEMESTER = process.argv[2];
const RAW_CSV = `${SEMESTER}-raw.csv`;
const WORKING_DIR = `./refinements/${SEMESTER}`;
const REFINED_CSV = `${SEMESTER}-refined.csv`;

try {
	const rawCsv = fs.readFileSync(`${WORKING_DIR}/${RAW_CSV}`, "utf8").trim();

	const modificationsFileContents = fs.readFileSync(`${WORKING_DIR}/modifications.txt`, "utf8");
	const exclusionFileContents = fs.readFileSync(`${WORKING_DIR}/exclusions.txt`, "utf8");
	const inclusionFileContents = fs.readFileSync(`${WORKING_DIR}/inclusions.txt`, "utf8");

	const splitCsv = rawCsv.split("\n");
	let markableCsv = splitCsv.map(line => ({
		delete: false,
		content: line,
	}));

	const modder = new Modifier(modificationsFileContents.trim());
	const excluder = new Excluder(exclusionFileContents.trim());
	const includer = new Includer(inclusionFileContents.trim());

	// The order here IS important: preliminary exclusions need to happen first,
	// then inclusions can "undo" exclusions that need to be undone, and then
	// you modify things that are left standing.
	markableCsv = excluder.exclude(markableCsv);
	markableCsv = includer.include(markableCsv);
	markableCsv = modder.modify(markableCsv);

	const refinedCsv = markableCsv
		.filter(line => !line.delete)
		.map(line => line.content)
		.join("\n");

	console.log(refinedCsv);

	try {
		fs.writeFileSync(`${WORKING_DIR}/${REFINED_CSV}`, refinedCsv);
	} catch (error) {
		console.error(error);
	}
} catch (error) {
	console.log(error);
}

