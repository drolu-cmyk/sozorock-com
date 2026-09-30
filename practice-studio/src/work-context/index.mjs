export function createWorkContext({context_id,employee_id,work_item_id,tenant_id}){
  if(!context_id||!employee_id||!work_item_id||!tenant_id) throw new Error("Incomplete work context");
  return Object.freeze({
    context_id,employee_id,work_item_id,tenant_id,
    opened_systems:[],
    evidence_refs:[],
    communications:[],
    artifacts:[],
    status:"active"
  });
}

export function attachContextEvidence(context,evidenceRef){
  if(!evidenceRef?.source_system||!evidenceRef?.reference_id) throw new Error("Invalid evidence reference");
  return Object.freeze({
    ...context,
    evidence_refs:[...context.evidence_refs,evidenceRef]
  });
}
