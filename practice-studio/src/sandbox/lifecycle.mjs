export function createSandboxLease({
  lease_id,
  tenant_id,
  employee_id,
  provider,
  resource_scope,
  starts_at,
  expires_at,
  budget_usd=null
}){
  if(!lease_id||!tenant_id||!employee_id||!provider||!resource_scope||!starts_at||!expires_at){
    throw new Error("Incomplete sandbox lease");
  }
  return Object.freeze({
    lease_id,tenant_id,employee_id,provider,resource_scope,starts_at,expires_at,
    budget_usd,status:"active",created_at:new Date().toISOString()
  });
}

export function isLeaseActive(lease,now){
  const t=new Date(now).getTime();
  return lease.status==="active" && t>=new Date(lease.starts_at).getTime() && t<new Date(lease.expires_at).getTime();
}

export function expireLease(lease,reason="ttl"){
  return Object.freeze({...lease,status:"expired",expired_reason:reason,expired_at:new Date().toISOString()});
}
