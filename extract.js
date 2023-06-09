/**
 * Run with `node extract.js [semester]`, where semester
 * is like 2022-01, 2023-04, etc.
 */

import {readFileSync, writeFileSync} from "node:fs";
import {rawCourseCsv} from "./scraping/scraper.js";

const SEMESTER = process.argv[2]; // Grab semester from command line
const WORKING_DIR = `./semesters/${SEMESTER}`;

const RAW_HTML = `${SEMESTER}.html`;
const RAW_CSV = `${SEMESTER}-raw.csv`;

// Yes, the reads & writes should be try/caught. Sue me.
const rawHtml = readFileSync(`${WORKING_DIR}/${RAW_HTML}`, "utf8")
	.trim()
	.replace(/\s+/g, " "); // When you save the html files, vscode's formatters add some extra tabs and such - need it gone!

writeFileSync(`${WORKING_DIR}/${RAW_CSV}`, rawCourseCsv(rawHtml));
console.log(`Wrote raw csv to ${WORKING_DIR}/${RAW_CSV}`);
