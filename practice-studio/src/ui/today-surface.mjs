export function buildTodaySurface({
  employee,
  now,
  unreadMessages=[],
  meetings=[],
  activeWork=[],
  requiredTraining=[],
  waitingOn=[]
}){
  const upcoming=meetings.filter(m=>new Date(m.start_at)>=new Date(now)).sort((a,b)=>new Date(a.start_at)-new Date(b.start_at));
  return Object.freeze({
    surface:"today",
    greeting:`Good ${daypart(now)}, ${employee.preferred_name??employee.registered_name}.`,
    date_label:new Intl.DateTimeFormat("en-US",{weekday:"long",month:"long",day:"numeric"}).format(new Date(now)),
    briefing:{
      unread_messages:unreadMessages.length,
      next_meeting:upcoming[0]??null,
      active_work:activeWork.length,
      waiting_on:waitingOn.length
    },
    timeline:[
      ...upcoming.map(x=>({type:"meeting",at:x.start_at,title:x.title,id:x.meeting_id})),
      ...activeWork.map(x=>({type:"work",at:x.due_at??null,title:x.title,id:x.work_item_id})),
      ...requiredTraining.map(x=>({type:"required_training",at:x.due_at??null,title:x.title,id:x.work_item_id}))
    ].sort((a,b)=>new Date(a.at??now)-new Date(b.at??now))
  });
}
function daypart(now){
  const h=new Date(now).getHours();
  return h<12?"morning":h<17?"afternoon":"evening";
}
