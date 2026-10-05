export const DEFAULT_WORKPLACE_TIMEZONE = "America/New_York";

export function workplaceTimeParts(value, timezone=DEFAULT_WORKPLACE_TIMEZONE) {
  const date=new Date(value);
  if(Number.isNaN(date.getTime())) throw new Error("Invalid date");
  const parts=new Intl.DateTimeFormat("en-US", {
    timeZone:timezone, year:"numeric", month:"2-digit", day:"2-digit",
    hour:"2-digit", minute:"2-digit", second:"2-digit", hourCycle:"h23"
  }).formatToParts(date);
  const fields=Object.fromEntries(parts.filter(p=>p.type!=="literal").map(p=>[p.type,Number(p.value)]));
  return {...fields, weekday:new Date(Date.UTC(fields.year,fields.month-1,fields.day)).getUTCDay(),
    date_key:`${fields.year}-${String(fields.month).padStart(2,"0")}-${String(fields.day).padStart(2,"0")}`};
}

// Resolve a local calendar time without relying on the host machine's timezone.
export function workplaceInstant(parts, timezone=DEFAULT_WORKPLACE_TIMEZONE) {
  const target=Date.UTC(parts.year,parts.month-1,parts.day,parts.hour??0,parts.minute??0,parts.second??0);
  let candidate=target;
  for(let attempt=0;attempt<5;attempt++) {
    const actual=workplaceTimeParts(candidate,timezone);
    const local=Date.UTC(actual.year,actual.month-1,actual.day,actual.hour,actual.minute,actual.second);
    if(local===target) return new Date(candidate);
    candidate+=target-local;
  }
  throw new Error("Local time does not exist in workplace timezone");
}

export function followingCalendarDay(value, timezone=DEFAULT_WORKPLACE_TIMEZONE) {
  const parts=workplaceTimeParts(value,timezone);
  const next=new Date(Date.UTC(parts.year,parts.month-1,parts.day+1));
  return workplaceInstant({...parts,year:next.getUTCFullYear(),month:next.getUTCMonth()+1,day:next.getUTCDate()},timezone);
}
