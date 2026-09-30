import { PracticeStudioAdapter } from "./base.mjs";

export class AwsIamAdapter extends PracticeStudioAdapter {
  constructor(client){ super(); this.client=client; }

  async provision(employee,role){
    return {provider:"aws",employee_id:employee.employee_id,role,mode:"isolated-sandbox"};
  }

  async authorize(employee,action){
    return Boolean(employee?.permissions_profile && action);
  }

  async execute(action){
    if(!this.client) throw new Error("AWS client not configured");
    return this.client.execute(action);
  }

  async observe(since){
    if(!this.client) return [];
    return this.client.observe(since);
  }

  normalize(rawEvent){
    return {
      source_system:"aws",
      event_type:rawEvent.event_type,
      object_type:rawEvent.object_type ?? "iam",
      object_id:rawEvent.object_id,
      payload:rawEvent.payload ?? {}
    };
  }

  async teardown(employee){
    return {employee_id:employee.employee_id,disabled:true,resources_expire:true};
  }

  async healthcheck(){ return {ok:Boolean(this.client)}; }
  async costStatus(){ return {budget_guard:true,ttl_required:true}; }
}
