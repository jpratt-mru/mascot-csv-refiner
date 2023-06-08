/**
 * An Excluder marks markable csv lines matching criteria as being eligible
 * for deletion, based on rules passed in to the constructor.
 */
const Refiner = require("./refiner.js");

class Excluder extends Refiner {
	refined(markableCsv) {
		if (this.rulesList === undefined) {
			return markableCsv;
		}

		const refinedCsv = [markableCsv[0]];

		for (let index = 1; index < markableCsv.length; index++) { // Skip header
			const line = markableCsv[index];

			const modifiedEntry = {
				delete: line.delete,
				content: line.content,
			};

			if (this.shouldBeRefined(line)) {
				modifiedEntry.delete = true;
			}

			refinedCsv.push(modifiedEntry);
		}

		return refinedCsv;
	}

	shouldBeRefined(line) {
		if (line.delete) {
			return true;
		}

		const lineAsFields = line.content.split(",");
		for (const ruleTerms of this.rulesList) {
			if (this.matchesAllTerms(lineAsFields, ruleTerms)) {
				return true;
			}
		}

		return false;
	}

	matchesAllTerms(lineAsFields, ruleTerms) {
		let numberMatches = 0;
		for (const term of ruleTerms) {
			const regex = new RegExp(`^${term}$`, "ig");

			if (lineAsFields.some(field => regex.test(field))) {
				numberMatches++;
			}
		}

		return numberMatches === ruleTerms.length;
	}
}

module.exports = Excluder;
