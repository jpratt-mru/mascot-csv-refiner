/**
 * Run with `node refine.js [semester]`, where semester
 * is like 2022-01, 2023-04, etc.
 */

import {readFileSync, writeFileSync} from "node:fs";
import {RefinerFactory} from "./refining/refiner-factory.js";
import {CsvUtils} from "./csv-utils/csv-utils.js";

const SEMESTER = process.argv[2];
const WORKING_DIR = `./semesters/${SEMESTER}`;

const RAW_CSV = `${SEMESTER}-raw.csv`;
const REFINED_CSV = `${SEMESTER}-refined.csv`;

const rawCsv = readFileSync(`${WORKING_DIR}/${RAW_CSV}`, "utf8").trim();

const exclusionFileContents = readFileSync(`${WORKING_DIR}/exclusions.txt`, "utf8").trim();
const inclusionFileContents = readFileSync(`${WORKING_DIR}/inclusions.txt`, "utf8").trim();
const modificationsFileContents = readFileSync(`${WORKING_DIR}/modifications.txt`, "utf8").trim();

let markableCsv = CsvUtils.markableCsvFrom(rawCsv);

const excluder = RefinerFactory.createExcluder(exclusionFileContents);
const includer = RefinerFactory.createIncluder(inclusionFileContents);
const modder = RefinerFactory.createModifer(modificationsFileContents);

// The order here IS important: preliminary exclusions need to happen first,
// then inclusions can "undo" exclusions that need to be undone, and then
// you can modify things that are left standing.
markableCsv = excluder.refined(markableCsv);
markableCsv = includer.refined(markableCsv);
markableCsv = modder.refined(markableCsv);

const refinedCsv = CsvUtils.refinedCsvFrom(markableCsv);

writeFileSync(`${WORKING_DIR}/${REFINED_CSV}`, refinedCsv);
console.log(`Wrote refined csv to ${WORKING_DIR}/${REFINED_CSV}`);

