export class InMemoryEventStore {
  #events=[];
  async append(event){ this.#events.push(structuredClone(event)); return event.event_id; }
  async listByEmployee(employeeId,{limit=100}={}){
    return this.#events.filter(e=>e.actor_id===employeeId || e.visible_to?.includes(employeeId)).slice(-limit).map(structuredClone);
  }
  async listByContext(contextId,{limit=100}={}){
    return this.#events.filter(e=>e.context_id===contextId).slice(-limit).map(structuredClone);
  }
  async getLatestStateVersion(){ return 0; }
}

export class InMemoryEvidenceStore {
  #records=[];
  async append(record){ this.#records.push(structuredClone(record)); return record.evidence_id; }
  async listByEmployee(employeeId,{limit=100}={}){
    return this.#records.filter(r=>r.employee_id===employeeId).slice(-limit).map(structuredClone);
  }
  async listByCompetency(employeeId,competencyId,{limit=100}={}){
    return this.#records.filter(r=>r.employee_id===employeeId && r.competency_tags?.includes(competencyId)).slice(-limit).map(structuredClone);
  }
}
