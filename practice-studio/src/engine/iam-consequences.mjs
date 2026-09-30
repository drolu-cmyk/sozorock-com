/**
 * IAM consequence rules for the vertical slice.
 * These rules are deterministic and auditable; model output cannot silently change them.
 */
export function evaluateIamAccessDecision({requestedRole, grantedRole, verifiedNeed, verifiedApprover}){
  const excessive = grantedRole === "maintain" && requestedRole === "read";
  const unverified = !verifiedNeed || !verifiedApprover;

  if(excessive && unverified){
    return {
      risk:"high",
      statePatch:{excess_access:true, monitoring_attention:true},
      followOn:["day3-access-signal","day4-privileged-anomaly"]
    };
  }

  if(excessive || unverified){
    return {
      risk:"medium",
      statePatch:{access_review_required:true, monitoring_attention:true},
      followOn:["day3-access-signal"]
    };
  }

  return {
    risk:"low",
    statePatch:{access_review_required:false, monitoring_attention:false},
    followOn:[]
  };
}
