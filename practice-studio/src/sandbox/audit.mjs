export function createSandboxAuditRecord({
  audit_id,
  tenant_id,
  employee_id,
  lease_id,
  provider,
  action,
  allowed,
  reason,
  timestamp
}){
  if(!audit_id||!tenant_id||!employee_id||!lease_id||!provider||!action||!timestamp){
    throw new Error("Incomplete sandbox audit record");
  }
  return Object.freeze({
    audit_id,tenant_id,employee_id,lease_id,provider,action,
    allowed:Boolean(allowed),reason:reason??null,timestamp
  });
}
