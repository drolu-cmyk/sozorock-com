export const NAMING_CRITERIA=Object.freeze([
  "distinct from SozoRock School",
  "credible for employers and professional services buyers",
  "not education-coded",
  "not limited to cybersecurity or AI",
  "supports onboarding readiness assessment and workforce development",
  "short enough to become a standalone product brand",
  "does not depend on the word simulation",
  "can name a platform rather than a course",
  "passes legal trademark and domain review before launch"
]);

export const REJECTED_WORKING_DIRECTIONS=Object.freeze([
  {name:"Practice Studio",reason:"retain only as internal/category descriptor; too generic for final brand"},
  {name:"Praxis",reason:"active simulation and workplace software uses"},
  {name:"WorkForge",reason:"active training and software brands"},
  {name:"Workscape",reason:"active workplace software brand"},
  {name:"Workstate",reason:"active software/consulting brand"},
  {name:"Workframe",reason:"active operational software brand"},
  {name:"Roleframe",reason:"active software brand"},
  {name:"WorkProof",reason:"active software brands"},
  {name:"Workloom",reason:"multiple active software brands"}
]);

export function validateCandidateName(name){
  if(!name?.trim()) return {valid:false,reasons:["empty"]};
  const normalized=name.trim().toLowerCase();
  const collision=REJECTED_WORKING_DIRECTIONS.find(x=>x.name.toLowerCase()===normalized);
  return collision
    ? {valid:false,reasons:[collision.reason]}
    : {valid:true,reasons:["requires formal trademark/domain clearance"]};
}
