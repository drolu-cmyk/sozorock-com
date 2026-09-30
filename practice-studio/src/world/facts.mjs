export const FACT_VISIBILITY=Object.freeze({
  PUBLIC:"public",
  ROLE:"role",
  DISCOVERABLE:"discoverable",
  HIDDEN:"hidden"
});

export function createEnterpriseFact({
  fact_id,statement,visibility=FACT_VISIBILITY.DISCOVERABLE,
  roles=[],systems=[],discoverable_by=[],state_key=null
}){
  if(!fact_id||!statement) throw new Error("Incomplete enterprise fact");
  return Object.freeze({fact_id,statement,visibility,roles,systems,discoverable_by,state_key});
}

export function visibleFacts({facts,role_id,system_access=[],discoveries=[]}){
  const systems=new Set(system_access), found=new Set(discoveries);
  return facts.filter(f=>{
    if(f.visibility==="public") return true;
    if(f.visibility==="role") return f.roles.includes(role_id);
    if(f.visibility==="discoverable") {
      return found.has(f.fact_id) ||
        f.systems.some(s=>systems.has(s)) && f.discoverable_by.includes(role_id);
    }
    return found.has(f.fact_id);
  });
}
