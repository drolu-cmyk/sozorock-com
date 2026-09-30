export function submitProfessionalArtifact({
  artifact,
  employee,
  work_item,
  submitted_at
}){
  if(!artifact||!employee?.employee_id||!work_item?.work_item_id||!submitted_at){
    throw new Error("Incomplete artifact submission");
  }
  return Object.freeze({
    submission_id:crypto.randomUUID(),
    artifact_id:artifact.artifact_id??crypto.randomUUID(),
    employee_id:employee.employee_id,
    work_item_id:work_item.work_item_id,
    context_id:artifact.context_id??null,
    title:artifact.title,
    artifact_type:artifact.artifact_type,
    body:artifact.body??null,
    submitted_at,
    status:"submitted"
  });
}
