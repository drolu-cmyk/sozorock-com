import { PracticeStudioAdapter } from "./base.mjs";

export class GitHubAdapter extends PracticeStudioAdapter {
  constructor(client){ super(); this.client=client; }

  async provision(employee,role){
    return {provider:"github",employee_id:employee.employee_id,role,mode:"sandbox"};
  }

  async authorize(employee,action){
    return Boolean(employee && action);
  }

  async execute(action){
    if(!this.client) throw new Error("GitHub client not configured");
    return this.client.execute(action);
  }

  async observe(since){
    if(!this.client) return [];
    return this.client.observe(since);
  }

  normalize(rawEvent){
    return {
      source_system:"github",
      event_type:rawEvent.event_type,
      object_type:rawEvent.object_type ?? "repository",
      object_id:rawEvent.object_id,
      payload:rawEvent.payload ?? {}
    };
  }

  async teardown(employee){
    return {employee_id:employee.employee_id,revoked:true};
  }

  async healthcheck(){ return {ok:Boolean(this.client)}; }
  async costStatus(){ return {meter:"external-plan"}; }
}
