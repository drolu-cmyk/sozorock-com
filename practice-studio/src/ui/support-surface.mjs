import { contextualSupport } from "../support/index.mjs";
import { sanitizeSupportForEmployee, validateSupportBoundary } from "../support/boundary.mjs";

export function buildSupportSurface({resources,employee,workItem,encounteredTerms=[]}){
  const selected=contextualSupport({
    resources,role_id:employee.role_id,work_type:workItem?.type,terms:encounteredTerms
  }).filter(r=>validateSupportBoundary(r).safe).map(sanitizeSupportForEmployee);

  return Object.freeze({
    surface:"support",
    context_id:workItem?.context_id??null,
    heading:workItem?"Help with this work":"Support",
    resources:selected,
    principles:[
      "Support explains the work without making the decision for you.",
      "You can return to the same matter at any time."
    ]
  });
}
