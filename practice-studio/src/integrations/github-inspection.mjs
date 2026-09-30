import { normalizePermissionObservation } from "../integrations/observations.mjs";

export function inspectGitHubAccess({requestor,resource,permission,observed_at}){
  return normalizePermissionObservation({
    source_system:"github",
    subject:requestor,
    resource,
    role:permission,
    observed_at,
    reference_id:`github:${resource}:${requestor}`,
    metadata:{provider_object:"repository-permission"}
  });
}
