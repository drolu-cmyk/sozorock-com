import { DEFAULT_WORKPLACE_TIMEZONE, workplaceTimeParts, workplaceInstant, followingCalendarDay } from "./workplace-time.mjs";

export function isBusinessDay(date,{holidays=[],workdays=[1,2,3,4,5],timezone=DEFAULT_WORKPLACE_TIMEZONE}={}){
  const parts=workplaceTimeParts(date,timezone);
  return workdays.includes(parts.weekday) && !holidays.includes(parts.date_key);
}

export function nextBusinessDay(date,options={}){
  let next=new Date(date);
  do { next=followingCalendarDay(next,options.timezone); } while(!isBusinessDay(next,options));
  return next;
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
