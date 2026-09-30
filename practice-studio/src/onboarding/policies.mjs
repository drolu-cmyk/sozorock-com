export const DAY_ONE_POLICIES=Object.freeze([
  {
    policy_id:"confidentiality",
    title:"Confidentiality and handling of workplace information",
    required:true,
    one_pager:true
  },
  {
    policy_id:"privileged-access",
    title:"Privileged access and least-privilege expectations",
    required:true,
    one_pager:true
  },
  {
    policy_id:"acceptable-use",
    title:"Acceptable use of systems and simulated data",
    required:true,
    one_pager:true
  }
]);

export function requiredDayOneTraining(roleId){
  const base=["confidentiality","acceptable-use"];
  if(roleId==="iam-analyst"||roleId==="iam-manager") base.push("privileged-access");
  return Object.freeze(base);
}
