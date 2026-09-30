export const HARBORLINE_IDENTITY_MODEL=Object.freeze({
 authoritative_sources:{
  employees:"people-operations",
  contractors:"vendor-and-sponsor-record",
  service_identities:"system-owner-registry"
 },
 lifecycle:["joiner","mover","leaver"],
 groups:[
  {group_id:"grp-atlas-users",name:"Atlas Users",type:"direct",owner:"data-ai",risk:"standard"},
  {group_id:"grp-data-platform",name:"Data Platform",type:"nested",owner:"data-ai",risk:"elevated"},
  {group_id:"grp-client-analytics",name:"Client Analytics",type:"nested",owner:"client-ops",risk:"elevated"},
  {group_id:"grp-cloud-admin",name:"Cloud Administrators",type:"privileged",owner:"it-ops",risk:"critical"},
  {group_id:"grp-ai-prod",name:"AI Production Operators",type:"privileged",owner:"data-ai",risk:"critical"}
 ],
 service_identities:[
  {identity_id:"svc-atlas-prod",owner:"data-ai",purpose:"Atlas production retrieval and actions",credential_policy:"short-lived-preferred",risk:"critical"},
  {identity_id:"svc-client-analytics",owner:"client-ops",purpose:"scheduled client analytics processing",credential_policy:"managed",risk:"high"}
 ],
 review_cadence:{privileged_days:90,standard_days:180,contractor_end_date_required:true}
});