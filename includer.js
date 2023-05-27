class Includer {
	constructor(fileContents) {
		this.buildInclusionList(fileContents);
	}

	buildInclusionList(fileContents) {
		const splitContents = fileContents.split("\n");
		this.inclusions = splitContents.map(line => line.split(","));
	}

	include(markableCsv) {
		for (const line of markableCsv) {
			if (this.shouldBeIncluded(line)) {
				line.delete = false;
			}
		}
	}

	shouldBeIncluded(line) {
		const lineAsFields = line.content.split(",");
		for (const inclusionTerms of this.inclusions) {
			if (this.matchesAllTerms(lineAsFields, inclusionTerms)) {
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

module.exports = Includer;