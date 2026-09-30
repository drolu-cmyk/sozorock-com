export function makeExecutiveDecision({
  decision_id,
  development_id,
  decision_owner,
  position,
  rationale,
  evidence_refs=[],
  conditions=[],
  owners=[],
  uncertainties=[],
  decided_at
}){
  if(!["proceed","conditional-launch","limited-release","delay"].includes(position)){
    throw new Error("Unsupported executive decision");
  }
  if(!decision_id||!development_id||!decision_owner||!rationale?.trim()||!decided_at){
    throw new Error("Incomplete executive decision");
  }
  return Object.freeze({
    decision_id,development_id,decision_owner,position,
    rationale:rationale.trim(),evidence_refs,conditions,owners,uncertainties,
    decided_at,status:"recorded"
  });
}

export function validateDecisionOwnership({decision_owner,authority_checker}){
  return authority_checker(decision_owner,"final-launch-decision");
}
