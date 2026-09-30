export function buildContextualSupport({term,context,resources=[]}){
  if(!term) throw new Error("term required");
  return Object.freeze({
    term,
    plain_language:context?.plain_language ?? null,
    why_it_matters:context?.why_it_matters ?? null,
    example:context?.example ?? null,
    policy_excerpt:context?.policy_excerpt ?? null,
    resources,
    disclosure:"Support is available to help you understand the work. It does not make the decision for you."
  });
}
