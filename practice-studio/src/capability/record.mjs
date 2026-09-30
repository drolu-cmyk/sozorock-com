import {CAPABILITY_DIMENSIONS} from "./observation.mjs";

export function buildCapabilityRecord({employee_id,observations=[],artifacts=[],feedback=[]}){
  if(!employee_id) throw new Error("employee_id required");
  const dimensions=Object.fromEntries(CAPABILITY_DIMENSIONS.map(d=>{
    const items=observations.filter(o=>o.dimension===d);
    return [d,Object.freeze({
      observations:items,
      evidence_refs:[...new Set(items.flatMap(x=>x.evidence_refs??[]))],
      independence_history:items.map(x=>({at:x.observed_at,level:x.independence,context_id:x.context_id}))
    })];
  }));
  return Object.freeze({
    employee_id,dimensions,artifacts,feedback,
    generated_at:new Date().toISOString(),
    grading_model:"none"
  });
}