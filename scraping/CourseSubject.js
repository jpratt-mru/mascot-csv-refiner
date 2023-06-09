/**
 * Course subjects, as displayed in <td data-property="subject">.
 *
 * We want these to be in all caps.
 * These currently don't need any transformation, but I'm being a bit paranoid
 * and uppercasing things anyway.
 *
 * It will trim leading/trailing whitespace.
 */
class CourseSubject {
	constructor(scrapedSubject) {
		this.subject = scrapedSubject.toUpperCase().trim();
	}
}

export {CourseSubject};
