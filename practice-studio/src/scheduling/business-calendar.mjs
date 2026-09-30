const WEEKEND_DAYS=new Set([0,6]);

export function isBusinessDay(date,{holidays=[]}={}){
  const d=new Date(date);
  if(Number.isNaN(d.getTime())) throw new Error("Invalid date");
  if(WEEKEND_DAYS.has(d.getDay())) return false;
  const iso=d.toISOString().slice(0,10);
  return !holidays.includes(iso);
}

export function nextBusinessDay(date,options={}){
  const d=new Date(date);
  if(Number.isNaN(d.getTime())) throw new Error("Invalid date");
  do { d.setDate(d.getDate()+1); } while(!isBusinessDay(d,options));
  return d;
}

export function atLocalTime(date,hourMinute){
  const d=new Date(date);
  const [hour,minute]=hourMinute.split(":").map(Number);
  d.setHours(hour,minute,0,0);
  return d;
}

export function nextWorkdayStart(date,{workday_start="09:00",holidays=[]}={}){
  let d=new Date(date);
  if(Number.isNaN(d.getTime())) throw new Error("Invalid date");
  if(!isBusinessDay(d,{holidays}) || d >= atLocalTime(d,"17:00")){
    d=nextBusinessDay(d,{holidays});
  }
  return atLocalTime(d,workday_start);
}
