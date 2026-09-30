export function assignDecisionConditions({
  decision_id,
  conditions,
  created_at
}){
  return Object.freeze(conditions.map((c,index)=>({
    condition_id:c.condition_id??`${decision_id}-condition-${index+1}`,
    decision_id,
    title:c.title,
    owner:c.owner,
    due_at:c.due_at??null,
    evidence_required:c.evidence_required??[],
    status:"open",
    created_at
  })));
}

export function resolveDecisionCondition(condition,{evidence_refs=[],resolved_at}){
  if(!resolved_at) throw new Error("resolved_at required");
  return Object.freeze({...condition,status:"resolved",evidence_refs,resolved_at});
}
