import { createSupportResource } from "./index.mjs";

export const IAM_SUPPORT=Object.freeze([
  createSupportResource({
    resource_id:"iam-least-privilege",kind:"definition",title:"Least privilege",
    plain_language:"Give a person only the access needed to do the work, for only as long as it is needed.",
    body:"Least privilege limits permissions to the minimum necessary scope. Check the work need, resource, permission level and duration before granting access.",
    terms:["least privilege","least-privilege"],roles:["iam-analyst","iam-manager"],contexts:["request","incident"]
  }),
  createSupportResource({
    resource_id:"iam-repository",kind:"definition",title:"Repository",
    plain_language:"A managed place where a team stores and changes source code or related files.",
    body:"A repository usually includes files, change history, branches, pull requests and permissions. Access levels can differ by platform.",
    terms:["repository","repo"],roles:["iam-analyst"],contexts:["request"]
  }),
  createSupportResource({
    resource_id:"iam-access-review",kind:"one_pager",title:"Reviewing an access request",
    plain_language:"Establish who needs access, why, what level is necessary, who approved it and how long it should last.",
    body:"Start with the request. Verify business need and authorization. Inspect existing access. Compare the requested permission with the work required. Ask for clarification when evidence is incomplete. Record the decision and rationale.",
    terms:["access review","access request"],roles:["iam-analyst"],contexts:["request"]
  }),
  createSupportResource({
    resource_id:"iam-evidence",kind:"definition",title:"Evidence",
    plain_language:"Information you can point to that supports what you concluded or did.",
    body:"Evidence can include an approved request, system permission observation, policy, log, message, meeting note or artifact. Strong evidence is relevant, attributable and timely.",
    terms:["evidence"],roles:["iam-analyst"],contexts:["request","incident"]
  })
]);
