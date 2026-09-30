export function createWorkDependency({
  dependency_id,
  upstream_context_id,
  downstream_context_id,
  condition,
  description
}){
  if(!dependency_id||!upstream_context_id||!downstream_context_id||!condition){
    throw new Error("Incomplete work dependency");
  }
  return Object.freeze({
    dependency_id,upstream_context_id,downstream_context_id,condition,description,status:"waiting"
  });
}

export function evaluateWorkDependency(dependency,worldState){
  const met=Boolean(worldState?.completed_actions?.includes(dependency.condition));
  return Object.freeze({
    ...dependency,
    status:met?"ready":"waiting",
    evaluated_at:new Date().toISOString()
  });
}
