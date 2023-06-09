/**
 * Course capacity, as extracted from <td data-property="status">.
 *
 * The status has a titles of 2 different flavours:
 *
 *   1. "x of y seats remain", or
 *   2. "FULL: 0 of y seats remain"
 *
 * In both cases, we want the "y"; so that's the string right after "of" (or
 * before "seats", depending on how you look at it.)
 */
class CourseCapacity {
	constructor(scrapedStatus) {
		this.capacity = capacityExtractedFrom(scrapedStatus);
	}
}

const CAP_CAPTURE = /of (?<cap>\d{1,2}) seats/i;

function capacityExtractedFrom(scrapedStatus) {
	const capturedGroups = scrapedStatus.match(CAP_CAPTURE).groups;
	return Number(capturedGroups.cap);
}

export {CourseCapacity};
