import { reconstructEpisode } from "../evidence/reconstruct.mjs";

export async function buildManagerDebriefGrounding({
  employee_id,
  context_id,
  eventStore,
  evidenceStore,
  manager
}){
  const episode=await reconstructEpisode({employee_id,context_id,eventStore,evidenceStore});
  return Object.freeze({
    manager:{person_id:manager.person_id,name:manager.name,role:manager.role},
    episode,
    permissible_topics:[
      "sequence of events",
      "evidence used",
      "decision rationale",
      "alternatives considered",
      "communication",
      "downstream consequences",
      "what should happen next"
    ],
    forbidden_behavior:[
      "inventing actions not present in the episode",
      "revealing hidden scoring rules",
      "changing the historical record",
      "claiming assessment certainty unsupported by evidence"
    ]
  });
}
