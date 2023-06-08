/**
 * Superclass for Excluders, Includers, and Modifiers.
 */
class Refiner {
	/**
	 *
	 * @param {*} rulesAsText are 0 or more lines of comma-separated rules
	 * @param {*} refinementPossible is a callback determining whether refining is even possible for a given line in a csv
	 * @param {*} refine is a callback which refines the content of a csv entry
	 */
	constructor(rulesAsText, lineTransform, refinementPossible, refinementApplicable, refine) {
		this.buildRulesList(rulesAsText, lineTransform);
		this.refinementPossible = refinementPossible;
		this.refinementApplicable = refinementApplicable;
		this.refine = refine;
	}

	buildRulesList(rulesAsText, lineTransform) {
		this.rulesList = undefined;

		if (rulesAsText !== "") {
			const splitContents = rulesAsText.split("\n");
			this.rulesList = splitContents.map(line => lineTransform(line));
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
				this.refine(entry, this.rulesList);
			}

			refinedCsv.push(entry);
		}

		return refinedCsv;
	}
}

module.exports = Refiner;
