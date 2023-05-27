class Modifier {
	constructor(fileContents) {
		console.log(fileContents);
		this.buildModifierList(fileContents);
	}

	buildModifierList(fileContents) {
		const splitContents = fileContents.split("\n");
		this.modifiers = splitContents.map(line => line.replace(/\s+/g, "").split(">"));
	}

	modify(markableCsv) {
		const remaining = markableCsv.filter(entry => !entry.delete);
		console.log(remaining);
	}
}

module.exports = Modifier;
