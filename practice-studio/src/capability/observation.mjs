export const CAPABILITY_DIMENSIONS=Object.freeze([
  "investigation","execution","evidence-use","judgment","professional-artifacts","communication","feedback-response","independence"
]);

export function createCapabilityObservation({
  observation_id,employee_id,dimension,context_id,evidence_refs=[],
  observed_behavior,observer_type,observer_id=null,observed_at,
  independence="supported"
}){
  if(!observation_id||!employee_id||!CAPABILITY_DIMENSIONS.includes(dimension)||!context_id||!observed_behavior||!observer_type||!observed_at){
    throw new Error("Incomplete capability observation");
  }
  if(!["guided","supported","independent"].includes(independence)) throw new Error("Invalid independence level");
  return Object.freeze({
    observation_id,employee_id,dimension,context_id,evidence_refs,
    observed_behavior,observer_type,observer_id,observed_at,independence
  });
}