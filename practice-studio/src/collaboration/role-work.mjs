export const ATLAS_ROLE_WORK=Object.freeze({
  "iam-analyst":{
    primary:["investigate residual access","review svc-atlas-prod entitlements","remediate access","verify removal"],
    outputs:["access remediation note","verification evidence"],
    may_request:["ai-systems-engineer","grc-analyst"]
  },
  "ai-systems-engineer":{
    primary:["reproduce restricted retrieval","trace source and authorization path","inspect evaluations","test remediation"],
    outputs:["technical root-cause note","evaluation evidence"],
    may_request:["iam-analyst","ai-governance-analyst"]
  },
  "grc-analyst":{
    primary:["assess control evidence","document findings","evaluate residual risk","prepare launch assurance position"],
    outputs:["finding","risk record","launch assurance note"],
    may_request:["iam-analyst","ai-systems-engineer","ai-governance-analyst"]
  },
  "ai-governance-analyst":{
    primary:["review inventory and classification","evaluate deployment conditions","assign monitoring obligations","record governance position"],
    outputs:["impact/risk assessment","deployment conditions","monitoring plan"],
    may_request:["ai-systems-engineer","grc-analyst"]
  }
});