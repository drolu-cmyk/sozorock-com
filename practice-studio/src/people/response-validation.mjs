export function validatePersonResponse({response,grounding}){
  if(!response?.text?.trim()) throw new Error("Response text required");
  const citations=response.source_refs ?? [];
  const knownIds=new Set((grounding.authoritative_facts ?? []).map(f=>f.fact_id));
  const unknown=citations.filter(id=>!knownIds.has(id));

  return Object.freeze({
    valid:unknown.length===0,
    unknown_source_refs:unknown,
    text:response.text.trim(),
    state_mutation_allowed:false
  });
}
