// Set the timezone to MESZ (UTC+2)
const timezoneOffset = 2 * 60 * 60 * 1000;

// Define the timestamps
const dailyResetTimestamp = getTimestamp('09:00');
const edenResetTimestamp = getWeeklyTimestamp('Sunday', '09:00');
const sanctuaryIslandsGeyserWaxTimestamps = getTimestampsEveryOtherHour(5);
const forestGrandmaDinnerWaxTimestamps = getTimestampsEveryOtherHour(35);
const sanctuaryTurtleWaxTimestamps = getTimestampsEveryOtherHour(50);
const auroraConcertTimestamps = getTimestampsEveryNHours(4);

// Get the next event and remaining time until then
const nextEvent = getNextEvent();
const remainingTime = formatTime(nextEvent.timestamp - Date.now());

// Display the results
document.getElementById('next-event').textContent = nextEvent.name;
document.getElementById('remaining-time').textContent = remainingTime;

// Functions to calculate the timestamps
function getTimestamp(timeString) {
  const [hour, minute] = timeString.split(':').map(Number);
  const timestamp = new Date();
  timestamp.setHours(hour);
  timestamp.setMinutes(minute);
  timestamp.setSeconds(0);
  timestamp.setMilliseconds(0);
  return timestamp.getTime() + timezoneOffset;
}

function getWeeklyTimestamp(weekday, timeString) {
  const timestamp = getTimestamp(timeString);
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(weekday);
  const daysUntilNextWeekday = (7 + day - new Date(timestamp).getDay()) % 7;
  return timestamp + daysUntilNextWeekday * 24 * 60 * 60 * 1000;
}

function getTimestampsEveryOtherHour(minutes) {
  const timestamps = [];
  const now = new Date();
  const hour = now.getHours();
  const nextEvenHour = hour + (hour % 2 === 0 ? 2 : 1);
  for (let i = nextEvenHour; i < 24; i += 2) {
    const timestamp = new Date();
    timestamp.setHours(i);
    timestamp.setMinutes(minutes);
    timestamp.setSeconds(0);
    timestamp.setMilliseconds(0);
    timestamps.push(timestamp.getTime() + timezoneOffset);
  }
  return timestamps;
}

function getTimestampsEveryNHours(n) {
  const timestamps = [];
  const now = new Date();
  const hour = now.getHours();
  const nextTimestampHour = Math.ceil(hour / n) * n;
  for (let i = nextTimestampHour; i < 24; i += n) {
    const timestamp = new Date();
    timestamp.setHours(i);
    timestamp.setMinutes(0);
    timestamp.setSeconds(0);
    timestamp.setMilliseconds(0);
    timestamps.push(timestamp.getTime() + timezoneOffset);
  }
  return timestamps;
}

// Function to get the next event
function getNextEvent() {
  const allEvents = [
    { name: 'Daily Reset', timestamp: dailyResetTimestamp },
    { name: 'Eden Reset', timestamp: edenResetTimestamp },
    ...sanctuaryIslandsGeyserWaxTimestamps.map(timestamp => ({ name: 'Sanctuary Islands Geyser Wax', timestamp })),
    ...forestGrandmaDinnerWaxTimestamps.map(timestamp => ({ name: 'Forest Grandma Dinner Wax', timestamp })),
    ...sanctuaryTurtleWaxTimestamps.map(timestamp => ({ name: 'Sanctuary Turtle Wax', timestamp })),
    ...auroraConcertTimestamps.map(timestamp => ({ name: 'AURORA // Concert', timestamp })),
];
allEvents.sort((a, b) => a.timestamp - b.timestamp);
const now = Date.now();
for (let i = 0; i < allEvents.length; i++) {
if (allEvents[i].timestamp >= now) {
return allEvents[i];
}
}
return allEvents[0];
}

// Function to format the remaining time
function formatTime(time) {
const hours = Math.floor(time / (60 * 60 * 1000));
const minutes = Math.floor(time / (60 * 1000)) % 60;
const seconds = Math.floor(time / 1000) % 60;
return ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
}
