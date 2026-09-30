import { visibleFacts } from "./facts.mjs";
import { eligibleWorkTriggers } from "./enterprise-development.mjs";

export function buildRoleDevelopmentView({
  development,principal,system_access=[],discoveries=[]
}){
  const facts=visibleFacts({
    facts:development.facts,
    role_id:principal.role_id,
    system_access,
    discoveries
  });
  const known=facts.map(f=>f.fact_id);
  return Object.freeze({
    development_id:development.development_id,
    title:development.title,
    summary:development.summary,
    known_facts:facts,
    work:eligibleWorkTriggers({
      development,
      role_id:principal.role_id,
      known_fact_ids:known
    }),
    hidden_fact_count:development.facts.length-facts.length
  });
}
