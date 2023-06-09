import jsdom from "jsdom";
import {Delivery} from "./Delivery.js";
import {MeetingDetails} from "./MeetingDetails.js";
import {CourseFieldSet} from "./CourseFieldSet.js";

export function rawCourseCsv(pageSrc) {
	// Const dom = new DOMParser().parseFromString(pageSrc, 'text/html');
	const {JSDOM} = jsdom;
	const dom = new JSDOM(pageSrc);
	const document = dom.window.document;
	const trs = Array.from(document.querySelectorAll("tr[data-id]"));
	const csv = ["term,subject,course,section,title,capacity,dow,start,end,room,instructor"];
	const allDeliveries = [];

	for (const tr of trs) {
		try {
			const courseFieldSet = new CourseFieldSet(tr);
			const deliveries = extractDeliveriesFrom(courseFieldSet);
			allDeliveries.push(...deliveries);

			for (const delivery of deliveries) {
				csv.push(delivery.asCsvRow());
			}
		} catch (error) {
			console.log(error);
		}
	}

	const csvAsText = csv.join("\n");
	return csvAsText;
}

function extractDeliveriesFrom(courseFieldSet) {
	const deliveries = [];
	const meetingDetails = new MeetingDetails(courseFieldSet.meetingTimeField);

	for (const detail of meetingDetails.details) {
		deliveries.push(new Delivery(courseFieldSet, detail));
	}

	return deliveries;
}

