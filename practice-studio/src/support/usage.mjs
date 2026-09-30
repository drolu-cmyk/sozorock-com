export function recordSupportUse({
  employee_id,context_id,resource_id,opened_at,closed_at=null
}){
  if(!employee_id||!resource_id||!opened_at) throw new Error("Incomplete support usage");
  return Object.freeze({
    event_type:"support.resource_opened",
    employee_id,context_id:context_id??null,resource_id,opened_at,closed_at
  });
}
