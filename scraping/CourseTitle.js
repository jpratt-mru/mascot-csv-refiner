/**
 * Titles of a course, as displayed in a typical <td data-property="courseTitle">.
 *
 * I'm currently grabbing the title attribute value from these td elements,
 * instead of the the <a> tab that is the text content of the same td - it
 * just seemed cleaner.
 *
 * The designer of the page has suffixed the words Lecture/Laboratory/Tutorial
 * onto the "true" title, so we have to strip those suffixes off.
 *
 * We also need to strip off newline characters and tabs in the title attribute value.
 */
class CourseTitle {
	constructor(scrapedTitle) {
		this.title = titleWithSuffixRemoved(scrapedTitle.trim());
	}
}

const ENDING_LEC = /lecture$/i;
const ENDING_LAB = /laboratory$/i;
const ENDING_TUT = /tutorial$/i;
const WHITESPACE_BLOCKS = /\s+/g;

function titleWithSuffixRemoved(scrapedTitle) {
	return scrapedTitle
		.replace(ENDING_LEC, '')
		.replace(ENDING_LAB, '')
		.replace(ENDING_TUT, '')
		.replace(WHITESPACE_BLOCKS, ' ');
}

export {CourseTitle};
