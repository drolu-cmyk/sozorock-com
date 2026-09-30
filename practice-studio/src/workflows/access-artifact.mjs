export function buildAccessReviewArtifact({
  employee,
  request,
  evidence,
  decision
}){
  if(!employee||!request||!evidence||!decision) throw new Error("Incomplete access review artifact");

  return Object.freeze({
    artifact_type:"access-review-note",
    title:`Access review: ${request.resource}`,
    author:employee.registered_name,
    employee_id:employee.employee_id,
    request_id:request.request_id,
    requestor:request.requestor,
    resource:request.resource,
    requested_role:request.requested_role,
    observed_access:{
      repository:evidence.current_repo_access,
      cloud:evidence.current_cloud_role
    },
    verification:{
      business_need:evidence.business_need_verified,
      approver:evidence.approver_verified
    },
    anomalies:evidence.anomalies,
    decision:decision.decision,
    granted_role:decision.granted_role,
    rationale:decision.rationale,
    created_at:decision.made_at
  });
}

export function renderAccessReviewOnePager(artifact){
  const anomalies=artifact.anomalies.length?artifact.anomalies.map(x=>`- ${x}`).join("\n"):"- None identified";
  return [
    `# ${artifact.title}`,
    "",
    `Author: ${artifact.author}`,
    `Requestor: ${artifact.requestor}`,
    `Resource: ${artifact.resource}`,
    `Requested role: ${artifact.requested_role}`,
    `Decision: ${artifact.decision}${artifact.granted_role?` (${artifact.granted_role})`:""}`,
    "",
    "## Verification",
    `- Business need verified: ${artifact.verification.business_need?"Yes":"No"}`,
    `- Approver verified: ${artifact.verification.approver?"Yes":"No"}`,
    "",
    "## Observed access",
    `- Repository: ${artifact.observed_access.repository ?? "None recorded"}`,
    `- Cloud: ${artifact.observed_access.cloud ?? "None recorded"}`,
    "",
    "## Anomalies",
    anomalies,
    "",
    "## Rationale",
    artifact.rationale
  ].join("\n");
}
