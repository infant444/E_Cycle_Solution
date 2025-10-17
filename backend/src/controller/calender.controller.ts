export const createICSFile=(title:string,type:string, description:string, start_date:string, start_time:string, end_date:string, end_time:string)=>{

const startUTC = toUTCDateTime(start_date, start_time);
const endUTC = toUTCDateTime(end_date, end_time);

// ---- Create ICS content (universal calendar format) ----
const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//E-Cycle Solution//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:${Date.now()}@ecycle-solution.com
DTSTAMP:${startUTC}
DTSTART:${startUTC}
DTEND:${endUTC}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${type}
ORGANIZER;CN=E-Cycle Solution:mailto:infant0467@gmail.com
END:VEVENT
END:VCALENDAR
`.trim();

return icsContent;
}
function toUTCDateTime(dateStr:string, timeStr:string) {
  const local = new Date(`${dateStr}T${timeStr}:00+05:30`); // adjust timezone if needed
  return local.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}
