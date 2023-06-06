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

	modify(markableCsv) {
		if (this.modifiers === undefined) {
			return markableCsv;
		}

		const modifiedCsv = [markableCsv[0]]; // Add the header

		for (let index = 1; index < markableCsv.length; index++) { // Skip header
			const line = markableCsv[index];

			if (line.delete) {
				continue;
			}

			const modifiedEntry = {delete: line.delete};
			modifiedEntry.content = this.applyModification(line);
			modifiedCsv.push(modifiedEntry);
		}

		return modifiedCsv;
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
