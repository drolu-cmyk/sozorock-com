export function sanitizeSupportForEmployee(resource){
  return Object.freeze({
    resource_id:resource.resource_id,
    kind:resource.kind,
    title:resource.title,
    plain_language:resource.plain_language,
    body:resource.body,
    source_ref:resource.source_ref
  });
}

export function validateSupportBoundary(resource){
  const prohibited=[
    /correct answer/i,/score/i,/hidden rubric/i,/choose approve/i,/choose deny/i,
    /you must approve/i,/you must deny/i
  ];
  const text=`${resource.title} ${resource.plain_language??""} ${resource.body}`;
  return Object.freeze({
    safe:!prohibited.some(p=>p.test(text)),
    reveals_assessment:prohibited.some(p=>p.test(text))
  });
}
