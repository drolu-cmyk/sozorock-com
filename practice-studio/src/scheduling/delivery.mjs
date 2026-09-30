import { isBusinessDay, nextBusinessDay, atLocalTime } from "./business-calendar.mjs";

export function classifyDelivery({event,policy}){
  const when=new Date(event.occurred_at ?? event.run_at);
  if(Number.isNaN(when.getTime())) throw new Error("Invalid event time");

  const urgent=Boolean(event.urgent);
  const [startH,startM]=policy.workday_start.split(":").map(Number);
  const [endH,endM]=policy.workday_end.split(":").map(Number);

  const start=new Date(when); start.setHours(startH,startM,0,0);
  const end=new Date(when); end.setHours(endH,endM,0,0);

  if(urgent) return {mode:"immediate",deliver_at:when.toISOString()};
  if(isBusinessDay(when,{holidays:policy.holidays ?? []}) && when>=start && when<=end){
    return {mode:"immediate",deliver_at:when.toISOString()};
  }

  let next=when;
  if(!isBusinessDay(next,{holidays:policy.holidays ?? []}) || next>end){
    next=nextBusinessDay(next,{holidays:policy.holidays ?? []});
  }
  next=atLocalTime(next,policy.workday_start);
  return {mode:"queued_next_work_period",deliver_at:next.toISOString()};
}

export function delayWithinWorkday({from,minutes,policy}){
  const start=new Date(from);
  const target=new Date(start.getTime()+minutes*60000);
  const [endH,endM]=policy.workday_end.split(":").map(Number);
  const end=new Date(start); end.setHours(endH,endM,0,0);

  if(target<=end) return target.toISOString();

  const overflow=target.getTime()-end.getTime();
  const next=nextBusinessDay(start,{holidays:policy.holidays ?? []});
  const [startH,startM]=policy.workday_start.split(":").map(Number);
  next.setHours(startH,startM,0,0);
  return new Date(next.getTime()+overflow).toISOString();
}
