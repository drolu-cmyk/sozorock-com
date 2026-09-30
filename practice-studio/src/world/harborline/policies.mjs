export const HARBORLINE_POLICIES=Object.freeze([
 {policy_id:"access-control",title:"Access Control Standard",owner:"identity",version:"4.2",effective:"2026-03-15",requirements:["least-privilege","manager-or-system-owner-approval","time-bound-contractor-access","quarterly-privileged-review"]},
 {policy_id:"identity-lifecycle",title:"Identity Lifecycle Standard",owner:"identity",version:"3.1",effective:"2026-02-01",requirements:["authoritative-worker-status","termination-revocation","sponsor-owned-contractor-end-date","exception-record"]},
 {policy_id:"ai-governance",title:"AI System Governance Standard",owner:"risk",version:"2.0",effective:"2026-06-01",requirements:["inventory","accountable-owner","risk-classification","evaluation-evidence","deployment-approval","monitoring-plan","change-record"]},
 {policy_id:"secure-engineering",title:"Secure Engineering Standard",owner:"app-eng",version:"5.0",effective:"2026-01-10",requirements:["protected-main-branch","secret-scanning","peer-review","approved-ci","dependency-review"]},
 {policy_id:"third-party-risk",title:"Third-Party Risk Standard",owner:"procurement",version:"3.4",effective:"2026-04-20",requirements:["owner","risk-tier","due-diligence","contract-record","periodic-review"]},
 {policy_id:"information-handling",title:"Information Handling Standard",owner:"legal-privacy",version:"4.0",effective:"2026-05-05",requirements:["classification","approved-storage","minimum-necessary-access","restricted-data-controls"]}
]);

export function policyByRequirement(requirement){
 return HARBORLINE_POLICIES.filter(p=>p.requirements.includes(requirement));
}