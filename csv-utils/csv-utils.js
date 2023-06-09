const CsvUtils = {
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
	markableCsvFrom(csv) {
		const csvLines = csv.split("\n");
		return csvLines.map(line => ({
			delete: false,
			content: line,
		}));
	},

	/**
	 * Create the csv from the markable csv - we only want the content
	 * of lines that aren't marked for deletion.
	 *
	 * @param {*} markableCsv
	 * @returns A "real" csv with all excluded lines removed.
	 */
	refinedCsvFrom(markableCsv) {
		return markableCsv
			.filter(line => !line.delete)
			.map(line => line.content)
			.join("\n");
	},
};

export {CsvUtils};
