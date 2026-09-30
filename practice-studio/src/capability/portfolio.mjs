export function buildEvidencePortfolio({employee,record,selected_contexts=[]}){
  const selected=new Set(selected_contexts);
  const observations=Object.values(record.dimensions)
    .flatMap(x=>x.observations)
    .filter(x=>!selected.size||selected.has(x.context_id));
  return Object.freeze({
    employee:{
      employee_id:employee.employee_id,
      name:employee.preferred_name??employee.registered_name,
      role_id:employee.role_id,
      contract_start:employee.contract_start,
      contract_end:employee.contract_end
    },
    demonstrated_work:observations.map(o=>({
      dimension:o.dimension,
      context_id:o.context_id,
      behavior:o.observed_behavior,
      evidence_refs:o.evidence_refs,
      independence:o.independence,
      observed_at:o.observed_at
    })),
    artifacts:record.artifacts.filter(a=>!selected.size||selected.has(a.context_id)),
    feedback:record.feedback.filter(f=>!selected.size||selected.has(f.context_id)),
    disclaimer:"This record describes demonstrated work inside a simulated enterprise environment. It is not a record of employment."
  });
}