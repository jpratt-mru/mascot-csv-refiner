/**
 * An Excluder marks markable csv lines matching criteria as being eligible
 * for deletion, based on rules passed in to the constructor.
 */
class Excluder {
	constructor(exclusionRules) {
		this.buildExclusionList(exclusionRules);
	}

	buildExclusionList(exclusionRules) {
		this.exclusions = undefined;
		console.log(exclusionRules);

		if (exclusionRules !== "") {
			console.log("foo");
			const splitContents = exclusionRules.split("\n");
			this.exclusions = splitContents.map(line => line.split(","));
			console.log(this.exclusions);
		}
	}

	exclude(markableCsv) {
		if (this.exclusions === undefined) {
			console.log("ping");
			return markableCsv;
		}

		const modifiedCsv = [markableCsv[0]];

		for (let index = 1; index < markableCsv.length; index++) { // Skip header
			const line = markableCsv[index];

			const modifiedEntry = {
				delete: line.delete,
				content: line.content,
			};

			if (this.shouldBeExcluded(line)) {
				modifiedEntry.delete = true;
			}

			modifiedCsv.push(modifiedEntry);
		}

		return modifiedCsv;
	}

	shouldBeExcluded(line) {
		const lineAsFields = line.content.split(",");
		for (const exclusionTerms of this.exclusions) {
			if (this.matchesAllTerms(lineAsFields, exclusionTerms)) {
				return true;
			}
		}

		return false;
	}

	matchesAllTerms(lineAsFields, terms) {
		let numberMatches = 0;
		for (const term of terms) {
			const regex = new RegExp(`^${term}$`, "ig");

			if (lineAsFields.some(field => regex.test(field))) {
				numberMatches++;
			}
		}

		return numberMatches === terms.length;
	}
}

module.exports = Excluder;
