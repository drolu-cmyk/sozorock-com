export function evaluateCrossFunctionalState({discoveries=[],actions=[]}){
  const found=new Set(discoveries), acted=new Set(actions);
  const conditions=[];
  if(found.has("nested-residual")&&!acted.has("residual-access-revoked")) conditions.push("identity-risk-open");
  if(found.has("service-excess")&&!acted.has("service-access-reduced")) conditions.push("service-identity-risk-open");
  if(found.has("misclassified-doc")&&!acted.has("classification-corrected")) conditions.push("retrieval-risk-open");
  if(found.has("vendor-token")&&!acted.has("token-rotated")) conditions.push("third-party-credential-risk-open");
  if(found.has("public-ai-use")&&!acted.has("governance-followup-opened")) conditions.push("unapproved-ai-use-open");

  const launchBlocking=conditions.some(x=>[
    "identity-risk-open","service-identity-risk-open","retrieval-risk-open"
  ].includes(x));

  return Object.freeze({
    open_conditions:conditions,
    launch_state:launchBlocking?"conditions-unmet":"conditions-satisfied",
    decision_options:["proceed","conditional-launch","limited-release","delay"]
  });
}
