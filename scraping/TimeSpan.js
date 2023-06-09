/**
 * Course time spans, as displayed in <td data-property="meetingTime">.
 *
 * These td elements will have a title attribute with the time string present:
 *    ex. "blahblah11:30  AM - 12:20  PMblahblah"
 *
 * The whitespacing is wonky, so the regex used is flexible.
 *
 * The returned start and end times will simple be strings representing
 * time in 24-hour format.
 */
class TimeSpan {
  constructor(scrapedMeetingTime) {
    let span = { start: "None", end: "None" };
    try {
      const { start, end } = extractedTimesFrom(scrapedMeetingTime);

      span = {
        start: in24hourFormat(start),
        end: in24hourFormat(end),
      };
    } catch (e) {
      span = { start: "None", end: "None" };
    }
    return span;
  }
}

const TIME_CAPTURE =
  /(?<start>[0-9]{2}:[0-9]{2}\s+[AP]M)\s+-\s+(?<end>[0-9]{2}:[0-9]{2}\s+[AP]M)/i;

function extractedTimesFrom(scrapedMeetingTime) {
  try {
    const capturedGroups = scrapedMeetingTime.match(TIME_CAPTURE).groups;
    return {
      start: capturedGroups.start,
      end: capturedGroups.end,
    };
  } catch (e) {
    throw new Error(`Tried to make a TimeSpan from ${scrapedMeetingTime}.`);
  }
}

function in24hourFormat(time) {
  let splitTime = time.split(":");
  let hourAsNum = Number(splitTime[0]);

  let tod = time.split(" ")[2];
  if (tod === "PM" && hourAsNum !== 12) {
    hourAsNum += 12;
  }

  let adjHour = String(hourAsNum).padStart(2, "0");
  return `${adjHour}:${splitTime[1]}`
    .replace(/AM/, "")
    .replace(/PM/, "")
    .trim();
}

export { TimeSpan };
