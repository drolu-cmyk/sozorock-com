import { createEnterpriseFact } from "./facts.mjs";

export function createEnterpriseDevelopment({
  development_id,title,starts_at,source,summary,facts,work_triggers=[]
}){
  if(!development_id||!title||!starts_at||!source) throw new Error("Incomplete enterprise development");
  return Object.freeze({
    development_id,title,starts_at,source,summary,
    facts:facts.map(createEnterpriseFact),
    work_triggers
  });
}

export function eligibleWorkTriggers({development,role_id,known_fact_ids=[]}){
  const known=new Set(known_fact_ids);
  return development.work_triggers.filter(t=>
    t.roles.includes(role_id) &&
    (!t.requires_fact_ids?.length || t.requires_fact_ids.every(x=>known.has(x)))
  );
}
