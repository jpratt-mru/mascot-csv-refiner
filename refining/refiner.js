/**
 * Superclass for Excluders and Includers
 */
class Refiner {
	/**
	 * Create a Refiner:
	 *
	 * The requiredMatches are 0 or more lines of text, each line containing 1 or more
	 * terms that need to match the content of a csv line in order for the refinement
	 * to be applied.
	 *
	 * needToAttemptRefinementFor(entry) is a callback that returns true if a refinement attempt
	 * even needs to be made for a given entry. For example, an excluder doesn't need to
	 * refine a csv entry that is already being targeted for deletion, while modifiers
	 * always need to be attempted.
	 *
	 * refine(entry) is a callback that "refines" an entry - the entry is mutated.
	 */
	constructor(
		requiredMatches,
		needToAttemptRefinementFor,
		refine,
	) {
		this.matchList = requiredMatches === "" ? [] : requiredMatches.split("\n").map(line => line.split(","));
		this.needToAttemptRefinementFor = needToAttemptRefinementFor;
		this.refine = refine;
	}

	/**
	 * Given a markable csv, return a "refined" version of that csv by applying
	 * a refinement to each line in the original csv.
	 *
	 * For example, an excluder will refine the csv by marking a line for deletion
	 * and a modifier will refine it by changing some text in the csv line to something else.
	 *
	 * If there are no rules (for example, there are no modifications desired), then
	 * the returned csv is simply the original csv.
	 */
	refined(markableCsv) {
		if (this.matchList.length === 0) {
			return markableCsv;
		}

		// Header
		const refinedCsv = [markableCsv[0]];

		// Usually don't like standard for loops...but gotta skip that header!
		for (let index = 1; index < markableCsv.length; index++) {
			const entry = markableCsv[index];

			// Start off with a copy.
			const refinedEntry = {
				delete: entry.delete,
				content: entry.content,
			};

			if (this.needToAttemptRefinementFor(entry) && shouldBeRefined(entry, this.matchList)) {
				this.refine(refinedEntry);
			}

			refinedCsv.push(refinedEntry);
		}

		return refinedCsv;
	}
}

/**
 * For excluders and includers, this is the function you use to figure out
 * whether a given entry should be refined - as long as ONE of the matchList
 * entries as ALL its match terms line up with a csv entry line, the
 * excluder/includer should kick in.
 *
 * For example, say we had this entry:
 * {
 *   delete: true,
 *   content: "202101,GNED,1103,004,Innovation,40,Monday,11:30,12:50,None,Laura Marik"
 * }
 *
 * If our matchList had these matches:
 * [
 *   ["gned","1103", "Laura Marik"],
 *   ["gned", 1103", "Jordan Kidney"]
 * ]
 *
 * then because the entry's content has ALL of "gned", "1103", and "Laura Marik" in it,
 * that entry should be refined.
 */
function shouldBeRefined(entry, matchList) {
	const entryFields = entry.content.split(",");
	return matchList.some(matchTerms => allMatchTermsFound(entryFields, matchTerms));

	function allMatchTermsFound(entryFields, matchTerms) {
		let numberMatchesFound = 0;
		for (const term of matchTerms) {
			const regex = new RegExp(`^${term}$`, "ig");

			if (entryFields.some(field => regex.test(field))) {
				numberMatchesFound++;
			}
		}

		return numberMatchesFound === matchTerms.length;
	}
}

export {Refiner};
