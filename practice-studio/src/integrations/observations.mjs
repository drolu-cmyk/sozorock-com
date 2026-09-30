export function normalizePermissionObservation({
  source_system,
  subject,
  resource,
  role,
  observed_at,
  reference_id,
  metadata={}
}){
  if(!source_system||!subject||!resource||!observed_at||!reference_id) throw new Error("Incomplete permission observation");
  return Object.freeze({
    observation_type:"permission",
    source_system,
    subject,
    resource,
    role:role ?? "none",
    observed_at,
    reference_id,
    metadata
  });
}

export function observationToEvidenceRef(observation){
  return Object.freeze({
    source_system:observation.source_system,
    reference_id:observation.reference_id,
    observed_at:observation.observed_at,
    summary:`${observation.subject} has ${observation.role} access to ${observation.resource}`
  });
}
