const DEFAULT_WORKDAYS = Object.freeze([1,2,3,4,5]);

export function createWorkdayPolicy(overrides = {}) {
  return Object.freeze({
    timezone: "America/New_York",
    workday_start: "09:00",
    workday_end: "17:00",
    core_collaboration_start: "10:00",
    core_collaboration_end: "15:00",
    lunch_start: "12:30",
    lunch_end: "13:00",
    workdays: DEFAULT_WORKDAYS,
    holidays: [],
    ...overrides
  });
}

export function localClockParts(value) {
  if (typeof value === "string") {
    const match = value.match(/T(\d{2}):(\d{2})(?::(\d{2}))?/);
    if (match) {
      return {
        hour: Number(match[1]),
        minute: Number(match[2]),
        second: Number(match[3] ?? 0)
      };
    }
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date");
  return {hour:d.getHours(), minute:d.getMinutes(), second:d.getSeconds()};
}

export function isWithinWorkday(value, policy=createWorkdayPolicy()) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date");
  if (!policy.workdays.includes(d.getDay())) return false;
  const {hour,minute} = localClockParts(value);
  const minutes = hour * 60 + minute;
  const [sh,sm] = policy.workday_start.split(":").map(Number);
  const [eh,em] = policy.workday_end.split(":").map(Number);
  return minutes >= sh*60+sm && minutes <= eh*60+em;
}
