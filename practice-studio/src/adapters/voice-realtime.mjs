import { PracticeStudioAdapter } from "./base.mjs";

export class VoiceRealtimeAdapter extends PracticeStudioAdapter {
  constructor(provider){ super(); this.provider=provider; }

  async provision(employee){
    return {provider:this.provider?.name ?? "unconfigured",employee_id:employee.employee_id,realtime:true};
  }

  async authorize(employee,action){ return Boolean(employee && action); }

  async execute(action){
    if(!this.provider) throw new Error("Voice provider not configured");
    return this.provider.execute(action);
  }

  async observe(since){
    if(!this.provider) return [];
    return this.provider.observe?.(since) ?? [];
  }

  normalize(rawEvent){
    return {
      source_system:"voice",
      event_type:rawEvent.event_type ?? "person.spoke",
      object_type:"conversation_turn",
      object_id:rawEvent.turn_id,
      payload:{
        transcript:rawEvent.transcript,
        speaker:rawEvent.speaker,
        latency_ms:rawEvent.latency_ms
      }
    };
  }

  async teardown(employee){
    return {employee_id:employee.employee_id,session_closed:true};
  }

  async healthcheck(){ return {ok:Boolean(this.provider)}; }
  async costStatus(){ return {meter:"active-audio"}; }
}
