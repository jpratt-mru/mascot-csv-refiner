/**
 * Rooms, as contained in <td data-property="meetingTime"> (no, not a typo).
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
class Room {
	constructor(scrapedMeetingTime) {
		this.room = roomExtractedFrom(scrapedMeetingTime).trim();
	}
}

const ROOM_CAPTURE = /room: (?<room>[a-z]+\d+|none)/i;

function roomExtractedFrom(scrapedMeetingTime) {
	const capturedGroups = scrapedMeetingTime.match(ROOM_CAPTURE).groups;
	return capturedGroups.room;
}

export {Room};
