/**
 * Superclass for Excluders, Includers, and Modifiers.
 */
class Refiner {
	constructor(rulesAsText, refinementPossible, refine) {
		this.buildRulesList(rulesAsText);
		this.refinementPossible = refinementPossible;
		this.refine = refine;
	}

	buildRulesList(rulesAsText) {
		this.rulesList = undefined;

		if (rulesAsText !== "") {
			const splitContents = rulesAsText.split("\n");
			this.rulesList = splitContents.map(line => line.split(","));
		}
	}

	refined(markableCsv) {
		if (this.rulesList === undefined) {
			return markableCsv;
		}

		const refinedCsv = [markableCsv[0]];

		for (let index = 1; index < markableCsv.length; index++) { // Skip header
			const line = markableCsv[index];

			const entry = {
				delete: line.delete,
				content: line.content,
			};

			if (this.refinementPossible(line) && this.refinementApplicable(line)) {
				this.refine(entry);
			}

			refinedCsv.push(entry);
		}

		return refinedCsv;
	}

	refinementApplicable(line) {
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

module.exports = Refiner;
