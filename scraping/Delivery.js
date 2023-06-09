import {CourseCapacity} from './CourseCapacity.js';
import {CourseInstructor} from './CourseInstructor.js';
import {CourseNumber} from './CourseNumber.js';
import {CourseSection} from './CourseSection.js';
import {CourseSubject} from './CourseSubject.js';
import {CourseTitle} from './CourseTitle.js';

class Delivery {
	constructor(courseFieldSet, meetingDetails) {
		this.subject = new CourseSubject(courseFieldSet.courseSubjectField).subject;

		this.number = new CourseNumber(courseFieldSet.courseNumberField).number;

		this.section = new CourseSection(courseFieldSet.courseSectionField).section;

		this.title = new CourseTitle(courseFieldSet.courseTitleField).title;

		this.capacity = new CourseCapacity(courseFieldSet.courseCapacityField).capacity;

		this.instructor = new CourseInstructor(courseFieldSet.instructorField).instructor;

		this.meetingDetails = meetingDetails;
	}

	asCsvRow() {
		const fieldElements = [
			this.meetingDetails.term,
			this.subject,
			this.number,
			this.section,
			this.title,
			this.capacity,
			this.meetingDetails.day,
			this.meetingDetails.start,
			this.meetingDetails.end,
			this.meetingDetails.room,
			this.instructor,
		];

		const cleanedFieldElements = fieldElements.map(element => csvCleaned(element));

		return cleanedFieldElements.join(',');
	}
}

function csvCleaned(s) {
	return String(s).replace(/"/g, '').replace(/,/g, '');
}

export {Delivery};
