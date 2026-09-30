export const WORKPLACE_NAV=Object.freeze([
  ["today","Today"],["work","Work"],["people","People"],["messages","Messages"],
  ["meetings","Meetings"],["files","Files"],["systems","Systems"],["support","Support"]
]);

export function buildNavigation({principal,counts={}}){
  if(!principal?.employee_id) throw new Error("Authenticated employee required");
  return WORKPLACE_NAV.map(([id,label])=>Object.freeze({
    id,label,
    href:`/practice-studio/${id}`,
    badge:["messages","meetings"].includes(id)?(counts[id]??0):null
  }));
}
