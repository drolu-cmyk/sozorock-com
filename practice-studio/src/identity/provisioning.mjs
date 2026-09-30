export function createProvisioningRecord({
  account_subject,tenant_id,employee_id,role_id,team_id,manager_id
}){
  if(!account_subject||!tenant_id||!employee_id||!role_id) throw new Error("Incomplete provisioning record");
  return Object.freeze({
    principal_id:crypto.randomUUID(),
    account_subject,tenant_id,employee_id,role_id,
    team_id:team_id??null,manager_id:manager_id??null,
    status:"active",created_at:new Date().toISOString()
  });
}
