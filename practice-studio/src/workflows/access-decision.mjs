export function decideAccess({
  request,
  evidence,
  decision,
  granted_role,
  rationale
}){
  if(!["approve","deny","modify","escalate"].includes(decision)){
    throw new Error("Unsupported access decision");
  }
  if(!rationale?.trim()) throw new Error("Rationale required");

  if(decision==="approve" && granted_role && granted_role!==request.requested_role){
    throw new Error("Use modify when granted role differs from requested role");
  }

  if(decision==="modify" && !granted_role){
    throw new Error("Modified decision requires granted_role");
  }

  return Object.freeze({
    request_id:request.request_id,
    decision,
    requested_role:request.requested_role,
    granted_role:decision==="deny"||decision==="escalate"?null:(granted_role ?? request.requested_role),
    rationale:rationale.trim(),
    evidence_snapshot:evidence,
    made_at:new Date().toISOString()
  });
}
