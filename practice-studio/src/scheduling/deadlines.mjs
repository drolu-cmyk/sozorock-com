import { isBusinessDay, atLocalTime, nextBusinessDay } from "./business-calendar.mjs";

export function businessMinutesBetween(startAt,endAt,policy){
  const start=new Date(startAt), end=new Date(endAt);
  if(Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) throw new Error("Invalid date");
  if(end<start) throw new Error("end before start");
  let cursor=new Date(start), total=0;

  while(cursor<end){
    if(isBusinessDay(cursor,policy)){
      const dayStart=atLocalTime(cursor,policy.workday_start,policy);
      const dayEnd=atLocalTime(cursor,policy.workday_end,policy);
      const sliceStart=new Date(Math.max(cursor.getTime(),dayStart.getTime()));
      const sliceEnd=new Date(Math.min(end.getTime(),dayEnd.getTime()));
      if(sliceEnd>sliceStart) total+=(sliceEnd-sliceStart)/60000;
    }
    cursor=atLocalTime(nextBusinessDay(cursor,policy),"00:00",policy);
  }
  return Math.floor(total);
}

export function deadlineStatus({now,due_at,policy}){
  const mins=businessMinutesBetween(now,due_at,policy);
  return {
    business_minutes_remaining:mins,
    status:mins<=0?"due":mins<=120?"attention":"on_track"
  };
}
