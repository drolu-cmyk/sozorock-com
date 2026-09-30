export const HUMAN_VOICE_RUBRIC=Object.freeze({
 naturalness:{scale:"1-5",prompt:"Does the person sound like a believable workplace colleague rather than a synthetic narrator?"},
 conversational_timing:{scale:"1-5",prompt:"Does turn-taking feel natural, including pauses and interruptions?"},
 emotional_fit:{scale:"1-5",prompt:"Does tone fit the workplace situation without sounding theatrical?"},
 intelligibility:{scale:"1-5",prompt:"Is speech consistently understandable across relevant accents and devices?"},
 workplace_credibility:{scale:"1-5",prompt:"Would this voice interaction feel credible inside a serious professional environment?"}
});
export function summarizeHumanRatings(ratings=[]){
 if(!ratings.length)return {};
 return Object.fromEntries(Object.keys(HUMAN_VOICE_RUBRIC).map(k=>{const v=ratings.map(r=>r[k]).filter(x=>typeof x==="number");return[k,v.length?v.reduce((a,b)=>a+b,0)/v.length:null];}));
}