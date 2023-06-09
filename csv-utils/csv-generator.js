class CsvGenerator {
	constructor(deliveries) {
		this.deliveries = deliveries;
	}

	coursesCsv() {
		const csv = ["subject,number,title"];
		for (const delivery of this.deliveries) {
			const fields = [
				delivery.subject,
				delivery.number,
				delivery.title,
			];
			csv.push(fields.join(","));
		}

		const csvAsSet = new Set(csv);

		return [...csvAsSet].join("\n");
	}

	instructorsCsv() {
		const csv = ["user_name,first_name,last_name"];
		for (const delivery of this.deliveries) {
			const instructorFullName = delivery.instructor;
			const firstSpaceIndex = instructorFullName.indexOf(" ");
			const firstName = instructorFullName.slice(0, Math.max(0, firstSpaceIndex));
			const lastName = instructorFullName.slice(Math.max(0, firstSpaceIndex + 1));
			const fields = [
				usernameFrom(firstName, lastName),
				firstName,
				lastName,
			];
			csv.push(fields.join(","));
		}

		const csvAsSet = new Set(csv);

		return [...csvAsSet].join("\n");
	}

	courseAvailabilitiesCsv() {
		const csv = ["course_subject,course_number,term_year,term_semester"];
		for (const delivery of this.deliveries) {
			const subject = delivery.subject;
			const number = delivery.number;
			const [year, semester] = yearAndSemesterFrom(delivery.meetingDetails.term);
			const fields = [
				subject,
				number,
				year,
				semester,
			];
			csv.push(fields.join(","));
		}

		const csvAsSet = new Set(csv);

		return [...csvAsSet].join("\n");
	}

	courseDeliveriesCsv() {}
}

function usernameFrom(firstName, lastName) {
	const firstInitial = firstName.slice(0, 1).toLowerCase();
	const squishedLastName = lastName
		.replace(/ /g, "")
		.replace("-", "")
		.replace("'", "")
		.toLowerCase();
	return `${firstInitial}${squishedLastName}`;
}

function yearAndSemesterFrom(term) {
	const year = term.slice(0, 4);
	const semester = term.slice(4);
	return [year, semester];
}

export {CsvGenerator};
