/**
 * Course sections, as displayed in <td data-property="sequenceNumber">.
 *
 * No transformation necessary currently.
 */
class CourseSection {
	constructor(scrapedSection) {
		this.section = scrapedSection.trim();
	}
}

export {CourseSection};

