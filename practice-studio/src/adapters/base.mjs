/**
 * External professional-system adapter contract.
 *
 * Adapters must normalize real-system activity into Practice Studio events.
 * External systems are never the authoritative source for simulation-world facts.
 */
export class PracticeStudioAdapter {
  async provision(_employee, _role) { throw new Error("Not implemented"); }
  async authorize(_employee, _action) { throw new Error("Not implemented"); }
  async execute(_action) { throw new Error("Not implemented"); }
  async observe(_since) { throw new Error("Not implemented"); }
  normalize(_rawEvent) { throw new Error("Not implemented"); }
  async teardown(_employee) { throw new Error("Not implemented"); }
  async healthcheck() { throw new Error("Not implemented"); }
  async costStatus() { throw new Error("Not implemented"); }
  evidenceLinks(_event) { return []; }
}
