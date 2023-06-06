/**
 * Run with `node refine.js [semester]`, where semester
 * is like 2022-01, 2023-04, etc.
 */

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

	const modificationsFileContents = fs.readFileSync(`${WORKING_DIR}/modifications.txt`, "utf8").trim();
	const exclusionFileContents = fs.readFileSync(`${WORKING_DIR}/exclusions.txt`, "utf8").trim();
	const inclusionFileContents = fs.readFileSync(`${WORKING_DIR}/inclusions.txt`, "utf8").trim();

	let markableCsv = markableCsvFrom(rawCsv);

	const modder = new Modifier(modificationsFileContents);
	const excluder = new Excluder(exclusionFileContents);
	const includer = new Includer(inclusionFileContents);

	// The order here IS important: preliminary exclusions need to happen first,
	// then inclusions can "undo" exclusions that need to be undone, and then
	// you can modify things that are left standing.
	markableCsv = excluder.exclude(markableCsv);
	markableCsv = includer.include(markableCsv);
	markableCsv = modder.modify(markableCsv);

	const refinedCsv = refinedCsvFrom(markableCsv);

	try {
		fs.writeFileSync(`${WORKING_DIR}/${REFINED_CSV}`, refinedCsv);
		console.log(`Wrote refined csv to ${WORKING_DIR}/${REFINED_CSV}`);
	} catch (error) {
		console.error(`Encountered this error attempting to write the refined csv: ${error}`);
	}
} catch (error) {
	console.error(`Encountered this error attempting to read the raw csv: ${error}`);
}

/**
 * A "markable csv" is a list of lines from a csv - but now each line
 * is turned into a JS object of the form:
 * {
 *   delete: false,
 *   content: (original line from csv)
 * }
 *
 * This allows us to mark a line for deletion by setting delete: true...which
 * allows us to later "undelete" it if an inclusion rule requires it by setting
 * delete: false again.
 *
 * @param {*} csv
 * @returns A markable csv, as explained above.
 */
function markableCsvFrom(csv) {
	const csvLines = csv.split("\n");
	return csvLines.map(line => ({
		delete: false,
		content: line,
	}));
}

/**
 * Create the csv from the markable csv - we only want the content
 * of lines that aren't marked for deletion.
 *
 * @param {*} markableCsv
 * @returns A "real" csv with all excluded lines removed.
 */
function refinedCsvFrom(markableCsv) {
	return markableCsv
		.filter(line => !line.delete)
		.map(line => line.content)
		.join("\n");
}
