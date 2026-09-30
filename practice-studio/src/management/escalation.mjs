export function createEscalation({
  escalation_id,
  development_id,
  from_employee_id,
  from_role,
  to_person_id,
  reason,
  evidence_refs=[],
  created_at,
  urgency="normal"
}){
  if(!escalation_id||!development_id||!from_employee_id||!from_role||!to_person_id||!reason||!created_at){
    throw new Error("Incomplete escalation");
  }
  return Object.freeze({
    escalation_id,development_id,from_employee_id,from_role,to_person_id,
    reason,evidence_refs,created_at,urgency,status:"open"
  });
}

export function escalationRequired({open_conditions=[],authority_scope=[]}){
  const critical=open_conditions.some(x=>[
    "identity-risk-open","service-identity-risk-open","retrieval-risk-open"
  ].includes(x));
  return critical && !authority_scope.includes("final-launch-decision");
}
