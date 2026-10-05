import { DEFAULT_WORKPLACE_TIMEZONE, workplaceTimeParts, workplaceInstant, followingCalendarDay } from "./workplace-time.mjs";

export function isBusinessDay(date,{holidays=[],workdays=[1,2,3,4,5],timezone=DEFAULT_WORKPLACE_TIMEZONE}={}){
  const parts=workplaceTimeParts(date,timezone);
  return workdays.includes(parts.weekday) && !holidays.includes(parts.date_key);
}

export function nextBusinessDay(date,options={}){
  const original=workplaceTimeParts(date,options.timezone);
  // Walk calendar dates at noon so a skipped DST hour on a non-working day cannot block the next workday.
  let next=atLocalTime(date,"12:00",options);
  do { next=followingCalendarDay(next,options.timezone); } while(!isBusinessDay(next,options));
  return workplaceInstant({...workplaceTimeParts(next,options.timezone),hour:original.hour,minute:original.minute,second:original.second},options.timezone);
}

export function atLocalTime(date,hourMinute,{timezone=DEFAULT_WORKPLACE_TIMEZONE}={}){
  const [hour,minute]=hourMinute.split(":").map(Number);
  return workplaceInstant({...workplaceTimeParts(date,timezone),hour,minute,second:0},timezone);
}

export function nextWorkdayStart(date,policy={}){
  let next=new Date(date);
  if(!isBusinessDay(next,policy) || next>=atLocalTime(next,policy.workday_end??"17:00",policy)){
    next=nextBusinessDay(next,policy);
  }
  return atLocalTime(next,policy.workday_start??"09:00",policy);
}
