export function createCrossFunctionalHandoff({
  handoff_id,
  development_id,
  from_role,
  to_role,
  from_employee_id,
  to_employee_id=null,
  context_id,
  subject,
  request,
  evidence_refs=[],
  created_at
}){
  if(!handoff_id||!development_id||!from_role||!to_role||!context_id||!subject||!request||!created_at){
    throw new Error("Incomplete cross-functional handoff");
  }
  return Object.freeze({
    handoff_id,development_id,from_role,to_role,from_employee_id,
    to_employee_id,context_id,subject,request,evidence_refs,created_at,status:"open"
  });
}

export function resolveCrossFunctionalHandoff(handoff,{response,evidence_refs=[],resolved_at}){
  if(!response?.trim()||!resolved_at) throw new Error("Incomplete handoff resolution");
  return Object.freeze({
    ...handoff,response:response.trim(),
    response_evidence_refs:evidence_refs,
    resolved_at,status:"resolved"
  });
}
