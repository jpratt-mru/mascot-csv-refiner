const Refiner = require("./refiner.js");

const RefinerFactory = {
	createExcluder(exclusionFileContents) {
		return new Refiner(exclusionFileContents,
			line => line.split(","),
			entry => entry.delete === false,
			refinementApplicable,
			entry => {
				entry.delete = true;
			});
	},

	createIncluder(inclusionFileContents) {
		return new Refiner(inclusionFileContents,
			line => line.split(","),
			entry => entry.delete === true,
			refinementApplicable,
			entry => {
				entry.delete = false;
			});
	},

	createModifer(modificationsFileContents) {
		return new Refiner(modificationsFileContents,
			line => line.replace(/\s*>\s*/g, ">").split(">"),
			entry => entry.delete === false,
			() => true,
			(entry, rulesList) => {
				for (const modificationTerms of rulesList) {
					const regex = new RegExp(modificationTerms[0], "ig");
					entry.content = entry.content.replaceAll(regex, modificationTerms[1]);
				}
			});
	},
};

function refinementApplicable(line) {
	const lineAsFields = line.content.split(",");
	for (const ruleTerms of this.rulesList) {
		if (matchesAllTerms(lineAsFields, ruleTerms)) {
			return true;
		}
	}

	return false;

	function matchesAllTerms(lineAsFields, ruleTerms) {
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

module.exports = RefinerFactory;
