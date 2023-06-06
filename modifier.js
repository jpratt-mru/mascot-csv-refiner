class Modifier {
	constructor(fileContents) {
		console.log(fileContents);
		this.buildModifierList(fileContents);
	}

	buildModifierList(fileContents) {
		const splitContents = fileContents.split("\n");
		this.modifiers = splitContents.map(line => line.replace(/\s*>\s*/g, ">").split(">"));
	}

	modify(markableCsv) {
		const modifiedCsv = [];
		for (const line of markableCsv) {
			const modifiedEntry = {delete: line.delete};
			modifiedEntry.content = this.applyModification(line);
			modifiedCsv.push(modifiedEntry);
		}

		return modifiedCsv;
	}

	applyModification(line) {
		for (const modificationTerms of this.modifiers) {
			line = line.content.replaceAll(modificationTerms[0], modificationTerms[1]);
		}

		return line;
	}
}

module.exports = Modifier;
