class Term {
	constructor(scrapedMeetingTime) {
		this.term = termExtractedFrom(scrapedMeetingTime);
	}
}

const CAP_CAPTURE
  = /start date: (?<start>\d{2})\/\d{2}\/(?<year>\d{4})/i;

function termExtractedFrom(scrapedMeetingTime) {
	const capturedGroups = scrapedMeetingTime.match(CAP_CAPTURE).groups;
	const term = termFromMonth(capturedGroups.start);
	return `${capturedGroups.year}${term}`;
}

function termFromMonth(startMonth) {
	if (startMonth === '01') {
		return '01';
	}

	if (startMonth === '05') {
		return '02';
	}

	if (startMonth === '07') {
		return '03';
	}

	if (startMonth === '09') {
		return '04';
	}

	return 'xx';
}

export {Term};
