export const IAM_SUPPORT_LIBRARY=Object.freeze({
  "least-privilege":{
    plain_language:"Give a person only the access they need to perform the approved work.",
    why_it_matters:"Unnecessary permissions increase the impact of mistakes or compromised credentials.",
    example:"If someone only needs to view repository content, read access is usually more appropriate than maintain access.",
    policy_excerpt:"Access should be limited to the minimum permissions required for approved responsibilities."
  },
  "access-approval":{
    plain_language:"An access request should have a clear business reason and an authorized approver.",
    why_it_matters:"Approval establishes accountability and helps prevent informal privilege growth.",
    example:"A manager confirms that a contractor needs temporary read access to one repository for a defined engagement.",
    policy_excerpt:"Privileged access requires documented need, appropriate authorization, and periodic review."
  }
});
