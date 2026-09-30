import { isBusinessDay } from "./business-calendar.mjs";

export function businessMinutesBetween(startAt,endAt,policy){
  const start=new Date(startAt), end=new Date(endAt);
  if(end<start) throw new Error("end before start");
  let cursor=new Date(start), total=0;

  while(cursor<end){
    if(isBusinessDay(cursor,{holidays:policy.holidays ?? []})){
      const [sh,sm]=policy.workday_start.split(":").map(Number);
      const [eh,em]=policy.workday_end.split(":").map(Number);
      const dayStart=new Date(cursor); dayStart.setHours(sh,sm,0,0);
      const dayEnd=new Date(cursor); dayEnd.setHours(eh,em,0,0);
      const sliceStart=new Date(Math.max(cursor.getTime(),dayStart.getTime()));
      const sliceEnd=new Date(Math.min(end.getTime(),dayEnd.getTime()));
      if(sliceEnd>sliceStart) total+=(sliceEnd-sliceStart)/60000;
    }
    cursor.setDate(cursor.getDate()+1);
    cursor.setHours(0,0,0,0);
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
