import { normalizePermissionObservation } from "../integrations/observations.mjs";

export function inspectAwsIdentity({principal,resource,role,observed_at,account_alias="practice-sandbox"}){
  return normalizePermissionObservation({
    source_system:"aws",
    subject:principal,
    resource,
    role,
    observed_at,
    reference_id:`aws:${account_alias}:${principal}:${resource}`,
    metadata:{account_alias,provider_object:"iam-entitlement"}
  });
}
