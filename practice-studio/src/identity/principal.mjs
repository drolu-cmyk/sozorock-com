export function createPrincipal({
  principal_id,
  account_subject,
  tenant_id,
  employee_id,
  role_id,
  team_id,
  manager_id,
  auth_strength="standard"
}){
  if(!principal_id||!account_subject||!tenant_id||!employee_id||!role_id) throw new Error("Incomplete principal");
  return Object.freeze({
    principal_id,account_subject,tenant_id,employee_id,role_id,
    team_id:team_id??null,manager_id:manager_id??null,
    auth_strength,issued_at:new Date().toISOString()
  });
}

export function resolvePrincipal({session,identityDirectory}){
  if(!session?.subject) throw new Error("Unauthenticated");
  const mapped=identityDirectory[session.subject];
  if(!mapped) throw new Error("Identity not provisioned");
  return createPrincipal({
    principal_id:mapped.principal_id,
    account_subject:session.subject,
    tenant_id:mapped.tenant_id,
    employee_id:mapped.employee_id,
    role_id:mapped.role_id,
    team_id:mapped.team_id,
    manager_id:mapped.manager_id,
    auth_strength:session.auth_strength??"standard"
  });
}
