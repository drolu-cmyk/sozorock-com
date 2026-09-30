export function createLaunchPosition({
  role_id,
  employee_id,
  position,
  rationale,
  evidence_refs=[],
  uncertainties=[],
  conditions=[],
  owners=[]
}){
  if(!["proceed","conditional-launch","limited-release","delay"].includes(position)){
    throw new Error("Unsupported launch position");
  }
  if(!role_id||!employee_id||!rationale?.trim()) throw new Error("Incomplete launch position");
  return Object.freeze({
    role_id,employee_id,position,rationale:rationale.trim(),
    evidence_refs,uncertainties,conditions,owners,recorded_at:new Date().toISOString()
  });
}

export function aggregateLaunchPositions(positions){
  const unresolvedConditions=[...new Set(positions.flatMap(p=>p.conditions??[]))];
  const uncertainty=[...new Set(positions.flatMap(p=>p.uncertainties??[]))];
  return Object.freeze({
    positions,
    unresolved_conditions:unresolvedConditions,
    uncertainties:uncertainty,
    consensus:positions.length>0 && new Set(positions.map(p=>p.position)).size===1,
    decision_record_ready:positions.length>0
  });
}
