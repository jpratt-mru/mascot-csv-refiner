/**
 * Course numbers, as displayed in <td data-property="courseNumber">.
 *
 * These currently don't need any transformation, except we do want to
 * watch out for trailing/leading whitespace.
 */
class CourseNumber {
	constructor(scrapedNumber) {
		this.number = scrapedNumber.trim();
	}
}

export {CourseNumber};

