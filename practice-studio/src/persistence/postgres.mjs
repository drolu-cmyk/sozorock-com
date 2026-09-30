import crypto from "node:crypto";

export class PgPracticeStudioStore {
  constructor({db}) {
    if(!db) throw new Error("db required");
    this.db=db;
  }

  async appendEvent(event,tenantId){
    requireTenant(event,tenantId);
    await this.db.query(
      `insert into ps_events (
        event_id,tenant_id,employee_id,occurred_at,workplace_day,actor_type,actor_id,
        source_system,event_type,object_type,object_id,context_id,visible_to,payload,
        authoritative,causation_id,correlation_id,state_version
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14::jsonb,$15,$16,$17,$18)`,
      [
        event.event_id,tenantId,event.employee_id??null,event.occurred_at,event.workplace_day??null,
        event.actor_type,event.actor_id,event.source_system,event.event_type,event.object_type??null,
        event.object_id??null,event.context_id,JSON.stringify(event.visible_to??[]),
        JSON.stringify(event.payload??{}),Boolean(event.authoritative),event.causation_id??null,
        event.correlation_id??null,event.state_version??null
      ]
    );
    return event.event_id;
  }

  async appendEvidence(record,tenantId){
    if(record.tenant_id && record.tenant_id!==tenantId) throw new Error("Tenant scope violation");
    const hash=record.integrity_hash ?? hashEvidence(record);
    await this.db.query(
      `insert into ps_evidence (
        evidence_id,tenant_id,employee_id,timestamp,workplace_day,source_system,context_id,event_type,
        information_available,employee_action,artifact_or_target,immediate_result,downstream_consequence,
        evidence_reference,competency_tags,confidence,assessor_visibility,integrity_hash
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10,$11,$12,$13,$14,$15::jsonb,$16,$17,$18)`,
      [
        record.evidence_id,tenantId,record.employee_id,record.timestamp,record.workplace_day??null,
        record.source_system,record.context_id,record.event_type,JSON.stringify(record.information_available??[]),
        record.employee_action,record.artifact_or_target??null,record.immediate_result??null,
        record.downstream_consequence??null,record.evidence_reference??null,
        JSON.stringify(record.competency_tags??[]),record.confidence??null,
        record.assessor_visibility??"reviewable",hash
      ]
    );
    return record.evidence_id;
  }

  async listEventsByContext({tenantId,contextId,limit=1000}){
    const {rows}=await this.db.query(
      `select * from ps_events where tenant_id=$1 and context_id=$2 order by occurred_at asc limit $3`,
      [tenantId,contextId,limit]
    );
    return rows;
  }

  async listEvidenceByEmployee({tenantId,employeeId,limit=1000}){
    const {rows}=await this.db.query(
      `select * from ps_evidence where tenant_id=$1 and employee_id=$2 order by timestamp asc limit $3`,
      [tenantId,employeeId,limit]
    );
    return rows;
  }

  async loadWorldState({tenantId}){
    const {rows}=await this.db.query(
      `select state_version,state from ps_world_state where tenant_id=$1`,
      [tenantId]
    );
    return rows[0] ?? {state_version:0,state:{}};
  }

  async saveWorldState({tenantId,expectedVersion,nextState}){
    const {rowCount,rows}=await this.db.query(
      `insert into ps_world_state(tenant_id,state_version,state,updated_at)
       values($1,1,$2::jsonb,now())
       on conflict(tenant_id) do update
       set state_version=ps_world_state.state_version+1,state=excluded.state,updated_at=now()
       where ps_world_state.state_version=$3
       returning state_version,state`,
      [tenantId,JSON.stringify(nextState),expectedVersion]
    );
    if(rowCount!==1) throw new Error("World state version conflict");
    return rows[0];
  }
}

function requireTenant(event,tenantId){
  if(event.tenant_id && event.tenant_id!==tenantId) throw new Error("Tenant scope violation");
}
function hashEvidence(record){
  return crypto.createHash("sha256").update(JSON.stringify({
    employee_id:record.employee_id,
    timestamp:record.timestamp,
    source_system:record.source_system,
    context_id:record.context_id,
    event_type:record.event_type,
    employee_action:record.employee_action,
    evidence_reference:record.evidence_reference??null
  })).digest("hex");
}
