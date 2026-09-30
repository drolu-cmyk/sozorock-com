import { PracticeStudioAdapter } from "./base.mjs";

export class CommunicationsAdapter extends PracticeStudioAdapter {
  constructor(client){ super(); this.client=client; }

  async provision(employee){
    return {provider:"workplace-comms",employee_id:employee.employee_id,mailbox:true,calendar:true};
  }

  async authorize(employee,action){ return Boolean(employee && action); }

  async execute(action){
    if(!this.client) throw new Error("Communications client not configured");
    return this.client.execute(action);
  }

  async observe(since){
    if(!this.client) return [];
    return this.client.observe(since);
  }

  normalize(rawEvent){
    return {
      source_system:rawEvent.channel ?? "email",
      event_type:rawEvent.event_type,
      object_type:"communication",
      object_id:rawEvent.object_id,
      payload:rawEvent.payload ?? {}
    };
  }

  async teardown(employee){
    return {employee_id:employee.employee_id,mailbox_disabled:true,calendar_disabled:true};
  }

  async healthcheck(){ return {ok:Boolean(this.client)}; }
  async costStatus(){ return {meter:"seat-or-message"}; }
}
