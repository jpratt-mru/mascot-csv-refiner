/**
 * Because a class is typically held over multiple days in a given week, the
 * title attribute text will need to return an array of time/dow/room clumps.
 *
 */

import {Days} from './Days.js';
import {MeetingDetail} from './MeetingDetail.js';

class MeetingDetails {
	constructor(scrapedMeetingTime) {
		const individualMeetingTimes = meetingTimesExtractedFrom(scrapedMeetingTime);

		this.details = [];

		for (const meetingTime of individualMeetingTimes) {
			if (meetingTime === '') {
				continue;
			} // ?

			const days = new Days(meetingTime);
			for (const day of days.days) {
				const meetingForDay = new MeetingDetail(meetingTime, day);
				this.details.push(meetingForDay);
			}
		}
	}
}

function meetingTimesExtractedFrom(scrapedMeetingTime) {
	const splitMeetingTimes = scrapedMeetingTime.split(/End Date: (?:\d{2}\/){2}\d{4}/);
	return splitMeetingTimes;
}

export {MeetingDetails};

