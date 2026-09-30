export function createLiveMeetingContext({
  meeting,
  employee,
  people,
  work_context,
  captions=true
}){
  if(!meeting||!employee||!work_context) throw new Error("Incomplete live meeting context");
  return Object.freeze({
    meeting_id:meeting.meeting_id,
    title:meeting.title,
    employee_id:employee.employee_id,
    context_id:work_context.context_id,
    participants:people.map(p=>({person_id:p.person_id,name:p.name,role:p.role})),
    modalities:["voice","text"],
    captions,
    interruption_policy:"natural_barge_in",
    transcript_policy:"tenant_configured",
    state_changes_require_authorized_action:true
  });
}
