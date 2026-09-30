export function createTemporaryCredentialRequest({principal,system_id,lease,requested_at}){
  if(!principal||!system_id||!lease||!requested_at) throw new Error("Incomplete credential request");
  if(principal.tenant_id!==lease.tenant_id||principal.employee_id!==lease.employee_id){
    throw new Error("Credential scope mismatch");
  }
  return Object.freeze({
    request_id:crypto.randomUUID(),
    tenant_id:principal.tenant_id,
    employee_id:principal.employee_id,
    system_id,
    lease_id:lease.lease_id,
    requested_at,
    expires_at:lease.expires_at,
    subject:principal.account_subject
  });
}
