export function buildCrossFunctionalDecisionRecord({
  development_id,
  positions,
  world_state,
  decision_owner
}){
  if(!development_id||!positions?.length||!decision_owner) throw new Error("Incomplete decision record");
  return Object.freeze({
    development_id,
    decision_owner,
    role_positions:positions,
    current_world_state:world_state,
    open_conditions:[...new Set(positions.flatMap(p=>p.conditions??[]))],
    open_uncertainties:[...new Set(positions.flatMap(p=>p.uncertainties??[]))],
    evidence_refs:[...new Set(positions.flatMap(p=>p.evidence_refs??[]))],
    status:"pending-owner-decision"
  });
}
