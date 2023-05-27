class Excluder {
	constructor(fileContents) {
		this.buildExclusionList(fileContents);
	}

	buildExclusionList(fileContents) {
		const splitContents = fileContents.split("\n");
		this.exlusions = splitContents.map(line => line.split(","));
	}

	exclude(markableCsv) {
		for (const line of markableCsv) {
			if (this.shouldBeExcluded(line)) {
				line.delete = true;
			}
		}
	}

	shouldBeExcluded(line) {
		const lineAsFields = line.content.split(",");
		for (const exclusionTerms of this.exlusions) {
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
