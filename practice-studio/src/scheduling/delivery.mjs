import { isBusinessDay, nextBusinessDay, atLocalTime } from "./business-calendar.mjs";

export function classifyDelivery({event,policy}){
  const when=new Date(event.occurred_at ?? event.run_at);
  if(Number.isNaN(when.getTime())) throw new Error("Invalid event time");
  const start=atLocalTime(when,policy.workday_start,policy);
  const end=atLocalTime(when,policy.workday_end,policy);
  if(event.urgent || (isBusinessDay(when,policy) && when>=start && when<end)){
    return {mode:"immediate",deliver_at:when.toISOString()};
  }
  const next=(!isBusinessDay(when,policy) || when>=end) ? nextBusinessDay(when,policy) : when;
  return {mode:"queued_next_work_period",deliver_at:atLocalTime(next,policy.workday_start,policy).toISOString()};
}

export function delayWithinWorkday({from,minutes,policy}){
  if(!Number.isFinite(minutes) || minutes<0) throw new Error("Invalid delay");
  let cursor=new Date(from), remaining=minutes;
  if(Number.isNaN(cursor.getTime())) throw new Error("Invalid date");
  if(policy.workday_start>=policy.workday_end) throw new Error("Invalid workday window");
  while(true){
    const start=atLocalTime(cursor,policy.workday_start,policy);
    const end=atLocalTime(cursor,policy.workday_end,policy);
    if(!isBusinessDay(cursor,policy) || cursor>=end){
      cursor=atLocalTime(nextBusinessDay(cursor,policy),policy.workday_start,policy);
      continue;
    }
    if(cursor<start) cursor=start;
    const available=(end-cursor)/60000;
    if(remaining<=available) return new Date(cursor.getTime()+remaining*60000).toISOString();
    remaining-=available;
    cursor=atLocalTime(nextBusinessDay(cursor,policy),policy.workday_start,policy);
  }
}
