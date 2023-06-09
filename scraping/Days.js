/**
 * Day(s), as contained in <td data-property="meetingTime"> (no, not a typo).
 *
 * These td elements have Rooms embedded in their title attribute:
 *    1. "blahblahRoom: XXXXblahblah"
 *    2. "blahblahRoom: Noneblahblah"
 *
 * It will assume that a room, if present, has its prefix in uppercase.
 * (So EA2031, not ea2031.)
 *
 * It will trim leading/trailing whitespace.
 */
class Days {
	constructor(scrapedMeetingTime) {
		const daysAsText = daysExtractedFrom(scrapedMeetingTime).trim();
		this.days = daysAsArray(daysAsText);
	}
}

const DAYS_CAPTURE = /(?<days>.+)smtwtfs/i;

function daysExtractedFrom(scrapedMeetingTime) {
	const capturedGroups = scrapedMeetingTime.match(DAYS_CAPTURE).groups;
	return capturedGroups.days;
}

function daysAsArray(daysAsText) {
	if (daysAsText.toUpperCase() === 'NONE') {
		return [];
	}

	return daysAsText.replace(/ /g, '').split(',');
}

export {Days};
