export const ROLE_ENTITLEMENTS=Object.freeze({
  "iam-analyst":{
    systems:["github-sandbox","aws-iam-sandbox","workplace-email","workplace-calendar"],
    capabilities:["inspect-permissions","review-access","submit-artifact"],
    credential_ttl_minutes:90
  },
  "iam-manager":{
    systems:["github-sandbox","aws-iam-sandbox","workplace-email","workplace-calendar"],
    capabilities:["inspect-permissions","review-access","approve-standard-access","review-employee"],
    credential_ttl_minutes:90
  }
});

export function entitlementsForPrincipal(principal){
  const e=ROLE_ENTITLEMENTS[principal.role_id];
  if(!e) throw new Error("No entitlement profile for role");
  return Object.freeze({...e});
}
