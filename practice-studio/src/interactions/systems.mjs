export function buildSystemsDirectory(systems,employee){
  return systems
    .filter(s=>s.authorized_roles?.includes(employee.role_id))
    .map(s=>({
      system_id:s.system_id,
      name:s.name,
      purpose:s.purpose,
      environment:s.environment,
      launch_mode:s.launch_mode ?? "external",
      status:s.status ?? "available"
    }));
}

export function createSystemLaunch({system,employee,context_id}){
  if(!system||!employee||!context_id) throw new Error("Incomplete system launch");
  return Object.freeze({
    system_id:system.system_id,
    employee_id:employee.employee_id,
    context_id,
    requested_scope:"least_privileged",
    return_to:"practice-studio"
  });
}
