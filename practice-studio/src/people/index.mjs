import { requireFields } from "../domain/index.mjs";

export function createPerson(input){
  requireFields(input,["person_id","name","person_type","role","tenant_id"]);
  return Object.freeze({
    team:null,
    authority_scope:[],
    knowledge_scope:[],
    communication_channels:["text"],
    availability:{},
    relationship_state:{},
    memory_state:{},
    ...input
  });
}

export class PersonMemory {
  #facts=new Map();

  remember(personId,key,value,metadata={}){
    if(!personId||!key) throw new Error("personId and key required");
    const compound=personId+"::"+key;
    this.#facts.set(compound,{value:structuredClone(value),metadata:structuredClone(metadata)});
  }

  recall(personId,key){
    const found=this.#facts.get(personId+"::"+key);
    return found ? structuredClone(found) : null;
  }

  forget(personId,key){
    return this.#facts.delete(personId+"::"+key);
  }
}
