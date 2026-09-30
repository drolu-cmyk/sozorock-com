export function discoverFact({
  development,fact_id,principal,source_system,observed_at,evidence_reference
}){
  const fact=development.facts.find(f=>f.fact_id===fact_id);
  if(!fact) throw new Error("Unknown fact");
  if(fact.visibility==="hidden" && !fact.discoverable_by.includes(principal.role_id)){
    throw new Error("Fact not discoverable by role");
  }
  if(fact.systems?.length && source_system && !fact.systems.includes(source_system)){
    throw new Error("Fact source mismatch");
  }
  return Object.freeze({
    event_type:"enterprise.fact_discovered",
    development_id:development.development_id,
    fact_id,
    employee_id:principal.employee_id,
    role_id:principal.role_id,
    source_system,
    observed_at,
    evidence_reference
  });
}
