export function createWorkplaceMailbox({employee,domain="practice.internal"}){
  if(!employee?.employee_id||!employee?.registered_name) throw new Error("employee required");
  const local=(employee.preferred_name??employee.registered_name)
    .toLowerCase().replace(/[^a-z0-9]+/g,".").replace(/^\.|\.$/g,"");
  return Object.freeze({
    mailbox_id:`mailbox-${employee.employee_id}`,
    address:`${local}@${domain}`,
    display_name:employee.preferred_name??employee.registered_name,
    status:"active",
    external_delivery:false
  });
}

export function createWorkplaceCalendar({employee}){
  return Object.freeze({
    calendar_id:`calendar-${employee.employee_id}`,
    owner_employee_id:employee.employee_id,
    timezone:employee.timezone??"America/New_York",
    status:"active"
  });
}
