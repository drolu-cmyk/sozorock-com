export function buildPersonGrounding({
  person,
  worldFacts=[],
  memoryFacts=[],
  currentWork=null,
  employee=null
}){
  if(!person?.person_id) throw new Error("person required");
  const allowedFacts=worldFacts.filter(f=>isKnownToPerson(f,person));
  return Object.freeze({
    person:{
      person_id:person.person_id,
      name:person.name,
      role:person.role,
      team:person.team,
      authority_scope:person.authority_scope ?? [],
      knowledge_scope:person.knowledge_scope ?? []
    },
    employee:employee?{
      employee_id:employee.employee_id,
      name:employee.preferred_name ?? employee.registered_name,
      role_id:employee.role_id
    }:null,
    current_work:currentWork,
    authoritative_facts:allowedFacts,
    remembered_interactions:memoryFacts,
    rules:[
      "Do not invent enterprise facts.",
      "Do not claim authority outside the person's authority scope.",
      "Do not mutate workplace state through conversation alone.",
      "If information is unknown, say so or ask for clarification.",
      "Treat employee actions as proposals until an authorized tool/action confirms a mutation."
    ]
  });
}

function isKnownToPerson(fact,person){
  if(fact.public===true) return true;
  if(!fact.scope) return false;
  return (person.knowledge_scope ?? []).some(scope=>fact.scope.includes(scope));
}
