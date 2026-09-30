export function buildMeetingSurface({meetings,now,employee_id}){
  const sorted=[...meetings].sort((a,b)=>new Date(a.start_at)-new Date(b.start_at));
  return Object.freeze({
    surface:"meetings",
    upcoming:sorted.filter(m=>new Date(m.end_at)>=new Date(now)).map(m=>({
      meeting_id:m.meeting_id,title:m.title,start_at:m.start_at,end_at:m.end_at,
      invited:m.participants?.includes(employee_id)??false,
      required:Boolean(m.required),
      modalities:["voice","text","captions"]
    })),
    past:sorted.filter(m=>new Date(m.end_at)<new Date(now)).map(m=>({
      meeting_id:m.meeting_id,title:m.title,start_at:m.start_at,end_at:m.end_at
    }))
  });
}
