class Modifier {
	constructor(modificationRules) {
		this.buildModifierList(modificationRules);
	}

	buildModifierList(modificationRules) {
		this.modifiers = undefined;

		if (modificationRules !== "") {
			const splitContents = modificationRules.split("\n");
			this.modifiers = splitContents.map(line => line.replace(/\s*>\s*/g, ">").split(">"));
		}
	}

	refined(markableCsv) {
		if (this.modifiers === undefined) {
			return markableCsv;
		}

		const refinedCsv = [markableCsv[0]]; // Add the header

		for (let index = 1; index < markableCsv.length; index++) { // Skip header
			const line = markableCsv[index];

			if (line.delete) {
				continue;
			}

			const modifiedEntry = {delete: line.delete};
			modifiedEntry.content = this.applyModification(line);
			refinedCsv.push(modifiedEntry);
		}

		return refinedCsv;
	}

	applyModification(line) {
		let lineContent = line.content;

		for (const modificationTerms of this.modifiers) {
			const regex = new RegExp(modificationTerms[0], "ig");
			lineContent = lineContent.replaceAll(regex, modificationTerms[1]);
		}

		return lineContent;
	}
}

module.exports = Modifier;
