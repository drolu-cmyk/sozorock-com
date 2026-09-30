import { createWorkItem } from "../domain/index.mjs";

export function createAccessRequestCase({
  request_id,
  employee_id,
  requestor,
  resource,
  requested_role,
  business_reason,
  approver,
  created_at
}){
  if(!request_id||!employee_id||!requestor||!resource||!requested_role||!created_at){
    throw new Error("Incomplete access request");
  }

  return Object.freeze({
    work:createWorkItem({
      work_item_id:request_id,
      type:"request",
      title:`Review access request for ${resource}`,
      owner:employee_id,
      source:"service-desk",
      related_systems:["github","aws"],
      competency_tags:["least-privilege","access-review","evidence-use"]
    }),
    request:{
      request_id,
      requestor,
      resource,
      requested_role,
      business_reason:business_reason ?? null,
      approver:approver ?? null,
      created_at,
      status:"pending-review"
    }
  });
}

export function evaluateRequestEvidence({request,repositoryAccess,cloudRole,managerConfirmation}){
  const evidence={
    business_need_verified:Boolean(request.business_reason),
    approver_verified:Boolean(request.approver || managerConfirmation?.approved),
    current_repo_access:repositoryAccess?.current_role ?? null,
    current_cloud_role:cloudRole?.current_role ?? null,
    requested_role:request.requested_role,
    anomalies:[]
  };

  if(repositoryAccess?.current_role==="maintain" && request.requested_role==="read"){
    evidence.anomalies.push("Current repository role exceeds requested access");
  }
  if(cloudRole?.current_role && !request.business_reason){
    evidence.anomalies.push("Existing cloud access lacks documented business need");
  }

  return Object.freeze(evidence);
}
