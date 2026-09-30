/**
 * Storage contracts for Practice Studio.
 * Implementations may use Postgres/object storage, but the engine depends only on these interfaces.
 */

export class EventStore {
  async append(_event){ throw new Error("Not implemented"); }
  async listByEmployee(_employeeId,_options={}){ throw new Error("Not implemented"); }
  async listByContext(_contextId,_options={}){ throw new Error("Not implemented"); }
  async getLatestStateVersion(_tenantId){ throw new Error("Not implemented"); }
}

export class EvidenceStore {
  async append(_record){ throw new Error("Not implemented"); }
  async listByEmployee(_employeeId,_options={}){ throw new Error("Not implemented"); }
  async listByCompetency(_employeeId,_competencyId,_options={}){ throw new Error("Not implemented"); }
}

export class ArtifactStore {
  async put(_artifact){ throw new Error("Not implemented"); }
  async get(_artifactId){ throw new Error("Not implemented"); }
  async linkEvidence(_artifactId,_evidenceId){ throw new Error("Not implemented"); }
}
