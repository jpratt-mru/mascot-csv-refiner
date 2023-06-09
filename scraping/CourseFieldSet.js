/**
 * The fields of interest extracted from a <tr> in a table scrape.
 */

class CourseFieldSet {
	constructor(tr) {
		this.courseTitleField = tr
			.querySelector('td[data-property=courseTitle]')
			.textContent;
		this.courseSubjectField = tr
			.querySelector('td[data-property=subject]')
			.textContent;
		this.courseNumberField = tr
			.querySelector('td[data-property=courseNumber]')
			.textContent;
		this.courseSectionField = tr
			.querySelector('td[data-property=sequenceNumber]')
			.textContent;
		this.courseCapacityField = tr
			.querySelector('td[data-property=status]')
			.title;
		this.instructorField = tr
			.querySelector('td[data-property=instructor]')
			.textContent;
		this.meetingTimeField = tr
			.querySelector('td[data-property=meetingTime]')
			.title;
	}
}

export {CourseFieldSet};
