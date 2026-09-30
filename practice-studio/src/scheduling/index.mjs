import { createEvent } from "../events/index.mjs";

function compareByTime(a,b){ return new Date(a.run_at).getTime()-new Date(b.run_at).getTime(); }

export class WorkplaceScheduler {
  #queue=[];
  #clock;

  constructor(startAt) {
    this.#clock = new Date(startAt);
    if (Number.isNaN(this.#clock.getTime())) throw new Error("Invalid start time");
  }

  now(){ return this.#clock.toISOString(); }

  schedule(input){
    if (!input?.scheduled_id || !input?.run_at || !input?.event) throw new Error("Invalid scheduled event");
    this.#queue.push(structuredClone(input));
    this.#queue.sort(compareByTime);
    return input.scheduled_id;
  }

  advanceTo(targetAt){
    const target=new Date(targetAt);
    if (Number.isNaN(target.getTime())) throw new Error("Invalid target time");
    if (target < this.#clock) throw new Error("Workplace clock cannot move backward");

    const due=[];
    while(this.#queue.length && new Date(this.#queue[0].run_at) <= target){
      const item=this.#queue.shift();
      due.push(createEvent(item.event));
    }
    this.#clock=target;
    return due;
  }

  pending(){ return structuredClone(this.#queue); }
}
