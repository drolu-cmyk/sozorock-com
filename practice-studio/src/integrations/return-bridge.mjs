import { observationToEvidenceRef } from "./observations.mjs";
import { attachContextEvidence } from "../work-context/index.mjs";

export function returnFromProfessionalSystem({context,observation}){
  const evidenceRef=observationToEvidenceRef(observation);
  const updatedContext=attachContextEvidence(context,evidenceRef);
  return Object.freeze({
    context:updatedContext,
    resume:{
      route:`/work/${context.work_item_id}`,
      focus:"evidence",
      message:`Evidence from ${observation.source_system} was attached to this work item.`
    }
  });
}
