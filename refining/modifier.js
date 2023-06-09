/**
 * A Modifier is used to change all text in a csv to some other text. For example,
 * in the current course listings, Michael is listed as Michael Uzoka, but we
 * want to change that to Faith Michael Uzoka.
 */
class Modifier {
	constructor(requiredModifications) {
		if (requiredModifications === "") {
			this.modificationList = [];
		} else {
			this.modificationList = requiredModifications
				.split("\n")
				.map(line => line.replace(/\s*>\s*/g, ">").split(">"));
		}
	}

	refined(markableCsv) {
		if (this.modificationList.length === 0) {
			return markableCsv;
		}

		const refinedCsv = [...markableCsv];

		// Walk through every entry of the csv...and attempt to do all modifications
		// in the modificationList upon it.
		for (const entry of refinedCsv) {
			if (!entry.delete) {
				for (const modificationTerms of this.modificationList) {
					const regex = new RegExp(modificationTerms[0], "ig");
					entry.content = entry.content.replaceAll(regex, modificationTerms[1]);
				}
			}
		}

		return refinedCsv;
	}
}

export {Modifier};
