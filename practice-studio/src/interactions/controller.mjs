import { performEmployeeAction } from "./employee-actions.mjs";

export class WorkplaceController {
  constructor({eventStore,evidenceStore,worldState}){
    this.eventStore=eventStore;
    this.evidenceStore=evidenceStore;
    this.worldState=worldState;
  }

  async dispatch(input){
    const result=performEmployeeAction(input);
    await this.eventStore.append(result.event);
    if(result.evidence) await this.evidenceStore.append(result.evidence);
    return result;
  }
}
