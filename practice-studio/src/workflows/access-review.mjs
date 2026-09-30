import { evaluateIamAccessDecision } from "../engine/iam-consequences.mjs";
import { buildAccessReviewArtifact } from "./access-artifact.mjs";

export function completeAccessReview({
  employee,
  request,
  evidence,
  decision
}){
  const consequence=evaluateIamAccessDecision({
    requestedRole:request.requested_role,
    grantedRole:decision.granted_role,
    verifiedNeed:evidence.business_need_verified,
    verifiedApprover:evidence.approver_verified
  });

  const artifact=buildAccessReviewArtifact({employee,request,evidence,decision});

  return Object.freeze({
    decision,
    consequence,
    artifact,
    next_events:consequence.followOn
  });
}
