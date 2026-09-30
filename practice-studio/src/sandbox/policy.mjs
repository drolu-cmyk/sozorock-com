export function createContainmentPolicy(input={}){
  return Object.freeze({
    allowed_regions:["us-east-1"],
    denied_services:["organizations","account","route53domains"],
    max_resource_ttl_minutes:120,
    max_concurrent_resources:12,
    max_session_minutes:90,
    allow_public_ip:false,
    allow_internet_egress:false,
    allow_cross_account:false,
    require_tags:["practice-studio-lease","employee-id","tenant-id","expires-at"],
    emergency_kill_enabled:true,
    ...input
  });
}

export function authorizeSandboxAction({action,policy}){
  if(!action?.service||!action?.operation) return {allowed:false,reason:"incomplete-action"};
  if(policy.denied_services.includes(action.service)) return {allowed:false,reason:"service-denied"};
  if(action.region && !policy.allowed_regions.includes(action.region)) return {allowed:false,reason:"region-denied"};
  if(action.requests_public_ip && !policy.allow_public_ip) return {allowed:false,reason:"public-ip-denied"};
  if(action.cross_account && !policy.allow_cross_account) return {allowed:false,reason:"cross-account-denied"};
  return {allowed:true,reason:"allowed"};
}
