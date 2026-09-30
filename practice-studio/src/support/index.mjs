export const SUPPORT_KINDS=Object.freeze([
  "definition","acronym","example","policy_excerpt","one_pager","how_to"
]);

export function createSupportResource({
  resource_id,kind,title,plain_language,body,
  terms=[],roles=[],contexts=[],source_ref=null
}){
  if(!resource_id||!SUPPORT_KINDS.includes(kind)||!title||!body) throw new Error("Invalid support resource");
  return Object.freeze({
    resource_id,kind,title,plain_language:plain_language??null,body,
    terms,roles,contexts,source_ref
  });
}

export function contextualSupport({resources,role_id,work_type,terms=[]}){
  const wanted=new Set(terms.map(x=>x.toLowerCase()));
  return resources.filter(r=>{
    const roleOk=!r.roles.length||r.roles.includes(role_id);
    const contextOk=!r.contexts.length||r.contexts.includes(work_type);
    const termOk=!wanted.size||r.terms.some(t=>wanted.has(t.toLowerCase()));
    return roleOk&&contextOk&&termOk;
  });
}
