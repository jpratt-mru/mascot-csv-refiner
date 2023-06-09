/**
 * Course subjects, as displayed in <td data-property="instructor">.
 *
 * These td elements will have one of these 2 present:
 *    1. an empty string (no instructor assigned yet), or
 *    1. an instructor name with "(Primary)" appended
 *
 * It will assume that a name, if present, has the proper name case.
 *
 * It will trim leading/trailing whitespace.
 *
 * WARNING: Some deliveries have more than one instructor! This code
 * does NOT handle that case. It's so rare, that it's easier to
 * just handle these situations manually when they come up and tweak
 * the resulting CSV by hand.
 */
class CourseInstructor {
	constructor(scrapedInstructor) {
		const extracted = instructorExtractedFrom(scrapedInstructor).trim();
		this.instructor = extracted.length === 0 ? 'TBA' : extracted;
	}
}

function instructorExtractedFrom(scrapedInstructor) {
	return scrapedInstructor.replace('(Primary)', '');
}

export {CourseInstructor};
