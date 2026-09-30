export const EXECUTIVE_AUTHORITY=Object.freeze({
  "exec-cio":["final-launch-decision","technology-risk-acceptance"],
  "exec-ciso":["security-risk-position","security-escalation"],
  "exec-data":["ai-product-owner","ai-deployment-recommendation"],
  "risk-dir":["risk-assurance-position"],
  "legal-gc":["privacy-legal-position"]
});

export function canExerciseAuthority(person_id,authority){
  return (EXECUTIVE_AUTHORITY[person_id]??[]).includes(authority);
}
