/**
 * Employee workplace view model.
 * The UI consumes this object and never calculates hidden assessment or world state itself.
 */
export function buildWorkplaceView({
  employee,
  now,
  work=[],
  people=[],
  messages=[],
  meetings=[],
  files=[],
  systems=[],
  support=[]
}){
  if(!employee?.employee_id) throw new Error("employee required");

  return Object.freeze({
    employee:{
      employee_id:employee.employee_id,
      registered_name:employee.registered_name,
      preferred_name:employee.preferred_name ?? employee.registered_name,
      role_id:employee.role_id,
      team_id:employee.team_id ?? null,
      manager_id:employee.manager_id ?? null,
      workplace_day:employee.current_workplace_day ?? 1
    },
    now,
    navigation:["Today","Work","People","Messages","Meetings","Files","Systems","Support"],
    today:{
      greeting:greetingFor(now, employee.preferred_name ?? employee.registered_name),
      unread_messages:messages.filter(m=>m.unread).length,
      upcoming_meetings:meetings.filter(m=>new Date(m.start_at)>=new Date(now)),
      active_work:work.filter(w=>["open","in_progress"].includes(w.status ?? "open"))
    },
    work,
    people,
    messages,
    meetings,
    files,
    systems,
    support
  });
}

function greetingFor(now,name){
  const hour=new Date(now).getHours();
  const prefix=hour<12?"Good morning":hour<18?"Good afternoon":"Good evening";
  return `${prefix}, ${name}.`;
}
