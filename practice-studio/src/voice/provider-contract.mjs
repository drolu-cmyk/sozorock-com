export class VoiceProvider{
 constructor({name}){this.name=name;}
 async healthcheck(){return{ok:false};}
 async connect(){throw new Error("Not implemented");}
 async sendText(){throw new Error("Not implemented");}
 async sendAudio(){throw new Error("Not implemented");}
 async interrupt(){throw new Error("Not implemented");}
 async close(){throw new Error("Not implemented");}
 estimateCost(){return null;}
}
export function providerScore(m){
 const h=m.human_ratings??{},n=h.naturalness??0,c=h.workplace_credibility??0,completion=(m.turn_completion_rate??0)*5,barge=(m.barge_in_success??0)*5,captions=(m.caption_coverage??0)*5,penalty=Math.min(5,(m.round_trip_ms??5000)/1000);
 return(n+c+completion+barge+captions-penalty)/5;
}