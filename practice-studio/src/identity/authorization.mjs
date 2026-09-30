const ACTIONS=Object.freeze({
  "iam-analyst":[
    "work.read","work.update","message.read","message.send","meeting.join",
    "support.read","github.inspect","aws.inspect","access.review","artifact.submit"
  ],
  "iam-manager":[
    "work.read","work.update","message.read","message.send","meeting.join",
    "support.read","github.inspect","aws.inspect","access.review","access.approve",
    "artifact.submit","employee.review"
  ],
  "assessor":[
    "evidence.read","artifact.read","debrief.review","capability.review"
  ],
  "operator":[
    "tenant.manage","employee.provision","sandbox.disable","integration.manage","audit.read"
  ]
});

export function allowedActionsForRole(roleId){return new Set(ACTIONS[roleId]??[]);}

export function authorize({principal,action,resource}){
  if(!principal?.tenant_id||!principal?.role_id) return {allowed:false,reason:"invalid-principal"};
  if(resource?.tenant_id && resource.tenant_id!==principal.tenant_id) return {allowed:false,reason:"tenant-mismatch"};
  if(!allowedActionsForRole(principal.role_id).has(action)) return {allowed:false,reason:"role-denied"};

  if(resource?.employee_id && ["evidence.read","artifact.read","employee.review"].includes(action)){
    if(principal.role_id==="assessor"||principal.role_id==="operator") return {allowed:true,reason:"authorized-review-role"};
  }

  if(resource?.employee_id && resource.employee_id!==principal.employee_id){
    return {allowed:false,reason:"employee-scope-denied"};
  }

  return {allowed:true,reason:"allowed"};
}

export function assertAuthorized(input){
  const result=authorize(input);
  if(!result.allowed) throw new Error("Authorization denied: "+result.reason);
  return true;
}
