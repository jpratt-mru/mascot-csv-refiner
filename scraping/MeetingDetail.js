/**
 * An academic class is like a meeting - it has a certain start time,
 * duration (or end time), day of the week, and a location.
 *
 * In the scrape, all of this information is located in the title attribute
 * of a given <td data-property="meetingTime">.
 *
 * We'll call these meeting details.
 */

import {Room} from './Room.js';
import {Term} from './Term.js';
import {TimeSpan} from './TimeSpan.js';

class MeetingDetail {
	constructor(singleScrapedMeetingTime, day) {
		this.room = new Room(singleScrapedMeetingTime).room;
		this.term = new Term(singleScrapedMeetingTime).term;

		const timeSpan = new TimeSpan(singleScrapedMeetingTime);
		this.start = timeSpan.start;
		this.end = timeSpan.end;

		this.day = day;
	}
}

export {MeetingDetail};
