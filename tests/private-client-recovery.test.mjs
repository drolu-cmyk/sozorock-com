import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source=readFileSync(new URL('../public/offers.js',import.meta.url),'utf8');
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const offer={programme:'applied-ai-systems',status:'offered',fee:{currency:'USD',enrollment:49,tuition:250,total:299},terms:{version:'us-offer-2026-10-05',equipment:'Synthetic equipment terms',cancellationRefund:'Synthetic cancellation terms'}};
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.listeners={};this.dataset={};this.textContent='';this.hidden=false;this.disabled=false;}
 append(...nodes){for(const node of nodes)if(node instanceof Element)node.parent=this;this.children.push(...nodes);}
 setAttribute(name,value){this.attributes[name]=value;}
 addEventListener(name,callback){this.listeners[name]=callback;}
 focus(){this.focused=true;}
 click(){if(!this.disabled)return this.listeners.click?.();}
 remove(){this.parent.children=this.parent.children.filter(node=>node!==this);}
 reportValidity(){return this.children.flatMap(node=>node.children||[]).filter(node=>node.tag==='input').every(node=>node.checked);}
}
function harness(plans){
 const host=new Element('main'),requests=[],timers=new Map();let timerId=0;
 const location={hash:'#token=synthetic-private-token',pathname:'/school/offer'};
 const pending=signal=>new Promise((resolve,reject)=>{const abort=()=>{const error=new Error('Synthetic timeout');error.name='AbortError';reject(error);};if(signal.aborted)abort();else signal.addEventListener('abort',abort,{once:true});});
 const context=vm.createContext({window:{SOZOROCK_APPLICATIONS:{apiEndpoint:'https://synthetic.execute-api.us-east-1.amazonaws.com'}},location,URLSearchParams,AbortController,
  history:{replaceState(state,title,url){assert.equal(url,'/school/offer');location.hash='';}},
  document:{querySelector:()=>host,createElement:tag=>new Element(tag),createTextNode:value=>value},
  setTimeout(callback){const id=++timerId;timers.set(id,callback);return id;},clearTimeout:id=>timers.delete(id),
  fetch:async(url,options)=>{requests.push({url,options,payload:JSON.parse(options.body)});assert.ok(options.signal);assert.equal(options.cache,'no-store');assert.equal(options.referrerPolicy,'no-referrer');const plan=plans.shift();assert.ok(plan,'Unexpected request');if(plan==='headers')return pending(options.signal);if(plan==='network')throw new TypeError('Network unavailable');return {status:plan.status||200,json:()=>plan==='body'?pending(options.signal):plan==='json'?Promise.reject(new SyntaxError('Invalid JSON')):Promise.resolve(plan.data)};}
 });
 vm.runInContext(source,context);
 const nodes=(node=host)=>[node,...node.children.filter(child=>child instanceof Element).flatMap(child=>nodes(child))];
 return {location,requests,timers,nodes,text:()=>nodes().map(node=>node.textContent).join(' '),button:label=>nodes().find(node=>node.tag==='button'&&node.textContent===label),
 async timeout(){for(const [id,callback]of [...timers]){timers.delete(id);callback();}await tick();},
 async decide(action){const input=nodes().find(node=>node.tag==='input');input.checked=true;if(action==='accept')nodes().find(node=>node.tag==='form').listeners.submit({preventDefault(){}});else{const decline=nodes().find(node=>node.tag==='button'&&/decline/i.test(node.textContent));decline.click();if(decline.textContent==='Confirm decline')decline.click();}await tick();}
 };
}
test('private offer load retries after stalled headers/body without restoring credentials to URL',async()=>{
 for(const phase of ['headers','body']){
  const page=harness([phase,{data:offer}]);await tick();assert.equal(page.location.hash,'');assert.equal(page.timers.size,1);await page.timeout();assert.match(page.text(),/connection timed out/);assert.equal(page.button('Try loading offer again').hidden,false);page.button('Try loading offer again').click();await tick();assert.ok(page.button('Accept offer'));assert.deepEqual(page.requests[0].payload,page.requests[1].payload);assert.equal(page.timers.size,0);
 }
});
test('offer decisions require the exact final status and safely retry uncertain transport',async()=>{
 for(const action of ['accept','decline']){
  const expected=action==='accept'?'offer_accepted':'offer_declined',opposite=action==='accept'?'offer_declined':'offer_accepted';
  for(const failure of ['headers','body','network','json',{data:{status:opposite}},{status:202,data:{status:expected}},{data:{}}]){
   const page=harness([{data:offer},failure,{data:{status:expected}}]);await tick();await page.decide(action);if(failure==='headers'||failure==='body')await page.timeout();assert.match(page.text(),/cannot yet confirm receipt/);assert.ok(page.nodes().some(node=>node.tag==='form'));await page.decide(action);assert.match(page.text(),action==='accept'?/acceptance has been recorded/:/has been declined/);assert.deepEqual(page.requests[1].payload,page.requests[2].payload);assert.equal(page.requests[1].url,page.requests[2].url);if(action==='accept'){assert.equal(page.requests[1].payload.consent,true);assert.equal(page.requests[1].payload.termsVersion,offer.terms.version);}else assert.equal(page.requests[1].payload.consent,undefined);assert.equal(page.timers.size,0);
  }
 }
});
test('an unconfirmed decision cannot silently become the opposite decision',async()=>{
 const page=harness([{data:offer},'network']);await tick();await page.decide('accept');await page.decide('decline');assert.equal(page.requests.length,2);assert.match(page.text(),/before changing it/);
});
test('invalid offer totals and missing terms never enable acceptance',async()=>{
 for(const invalid of [{...offer,fee:{...offer.fee,total:1}},{...offer,fee:{...offer.fee,tuition:-1}},{...offer,terms:{version:offer.terms.version,equipment:' ',cancellationRefund:'Terms'}},{...offer,terms:{equipment:'Equipment',cancellationRefund:'Terms'}}]){const page=harness([{data:invalid}]);await tick();assert.equal(page.button('Accept offer'),undefined);}
});
test('an admin mutation cannot repaint records or private links after logout during body parsing',async()=>{
 const admin=readFileSync(new URL('../public/admin.js',import.meta.url),'utf8');
 const start=admin.indexOf('  async function mutate('),end=admin.indexOf('  for(const control',start);
 const messages=[],items=new Map();let signedIn=true,rendered=0,complete;
 const context=vm.createContext({token:()=>signedIn?'synthetic-access':null,clear(){signedIn=false;},say:message=>messages.push(message),busy:false,activeRequest:null,AbortController,setTimeout,clearTimeout,cfg:{apiEndpoint:'https://synthetic.invalid'},items,render(){rendered++;},location:{origin:'https://www.sozorock.com'},URL,
  fetch:async()=>({status:200,ok:true,json:()=>new Promise(resolve=>{complete=resolve;})})
 });
 vm.runInContext(admin.slice(start,end)+'\nglobalThis.run=mutate;',context);
 const pending=context.run({id:'synthetic-reference'},'offer',{},{});await tick();signedIn=false;complete({status:'offered',version:2,offerUrl:'https://www.sozorock.com/school/offer#token=private'});await pending;
 assert.equal(items.size,0);assert.equal(rendered,0);assert.deepEqual(messages,['Saving offer…']);
});

test('public enquiry receipt requires a completed write and preserves retry identity',async()=>{
 const contact=readFileSync(new URL('../public/contact.js',import.meta.url),'utf8');
 const reference='00000000-0000-4000-8000-000000000001';
 for(const firstResponse of [{status:202,data:{id:reference}},{status:200,data:{id:'different-reference'}},{status:503,data:{id:reference}}]){
  const status={focus(){}},button={},listeners={},requests=[];let resets=0,uuidCalls=0;
  const form={elements:{name:{value:'Synthetic Person'},email:{value:'synthetic@example.com'},message:{value:'Synthetic enquiry for this isolated test.'},organization:{value:'Synthetic Organization'},website:{value:''}},
   querySelector:selector=>selector==='button'?button:status,addEventListener:(event,callback)=>listeners[event]=callback,reportValidity:()=>true,reset(){resets++;}};
  const root={dataset:{context:'corporate'},querySelector:()=>form};
  const plans=[firstResponse,{status:200,data:{id:reference}}];
  const context=vm.createContext({document:{querySelector:()=>root},window:{SOZOROCK_CONTACT:{apiEndpoint:'https://synthetic.execute-api.us-east-1.amazonaws.com'}},location:{search:''},URLSearchParams,AbortController,setTimeout,clearTimeout,crypto:{randomUUID(){uuidCalls++;return reference;}},
   FormData:class{constructor(value){this.values=Object.entries(value.elements).map(([key,field])=>[key,field.value]);}[Symbol.iterator](){return this.values[Symbol.iterator]();}},
   fetch:async(url,options)=>{requests.push(JSON.parse(options.body));const next=plans.shift();return {status:next.status,ok:next.status<300,json:async()=>next.data};}
  });
  vm.runInContext(contact,context);await listeners.submit({preventDefault(){}});assert.equal(resets,0);assert.match(status.textContent,/could not be confirmed/);assert.equal(button.disabled,false);await listeners.submit({preventDefault(){}});assert.equal(resets,1);assert.match(status.textContent,/was received/);assert.deepEqual(requests[0],requests[1]);assert.equal(uuidCalls,2);
 }
});
