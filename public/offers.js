(()=>{
'use strict';
const root=document.querySelector('[data-offer-root]'),cfg=window.SOZOROCK_APPLICATIONS||{};
if(!root)return;
// Keep the signed token only in memory; never send it in a URL, analytics or browser storage.
const token=new URLSearchParams(location.hash.slice(1)).get('token');history.replaceState(null,'',location.pathname);
const labels={'applied-ai-systems':'Applied AI Systems','cybersecurity-grc':'Cybersecurity GRC','identity-access-management':'Identity & Access Management','ai-governance':'AI Governance'};
const status=document.createElement('p');status.setAttribute('role','status');status.tabIndex=-1;root.append(status);
const retry=document.createElement('button');retry.type='button';retry.textContent='Try loading offer again';retry.hidden=true;root.append(retry);
let busy=false,attemptedDecision=null,termsVersion=null;
async function api(action){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
 try{
  const response=await fetch(cfg.apiEndpoint+'/offers/'+action,{method:'POST',headers:{'content-type':'application/json'},cache:'no-store',referrerPolicy:'no-referrer',body:JSON.stringify(action==='accept'?{token,consent:true,termsVersion}:{token}),signal:controller.signal});
  const data=await response.json();
  if(response.status!==200)throw new Error(response.status===410?'This offer link has expired or has already been used. Contact the School if you need help.':response.status===409?'The offer has changed or a decision has already been recorded. Contact the School to confirm your status.':'The offer could not be confirmed. Contact the School if this continues.');
  return data;
 }finally{clearTimeout(timer);}
}
function line(label,value){const p=document.createElement('p'),strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(String(value)));root.append(p);}
async function start(){
 if(busy)return;
 if(!token||!/^https:\/\/[a-z0-9]+\.execute-api\.us-east-1\.amazonaws\.com$/.test(cfg.apiEndpoint||'')){status.textContent='Open the complete private offer link supplied by the School. If you need a replacement, contact the School.';return;}
 busy=true;retry.hidden=true;status.textContent='Checking your offer…';
 try{
  const offer=await api('view');
  if(!offer||!labels[offer.programme]||!['offered','offer_accepted','offer_declined'].includes(offer.status)||!offer.fee||offer.fee.currency!=='USD'||![offer.fee.enrollment,offer.fee.tuition,offer.fee.total].every(value=>Number.isFinite(value)&&value>=0)||Math.abs(offer.fee.enrollment+offer.fee.tuition-offer.fee.total)>.005)throw new Error('The offer details could not be verified. Contact the School before accepting.');
  line('Program',labels[offer.programme]);line('Commitment',offer.duration||'12 weeks');line('Participation',offer.weeklyCommitment||'3 to 6 hours/week');line('Delivery',offer.format||'100% virtual');line('Enrollment fee','USD $'+offer.fee.enrollment);line('Tuition','USD $'+offer.fee.tuition);line('Total program fee','USD $'+offer.fee.total);line('Equipment and session expectations',offer.terms?.equipment||'');line('Cancellation and refund terms',offer.terms?.cancellationRefund||'');if(offer.expiresAt)line('Offer expires',new Date(Number(offer.expiresAt)*1000).toLocaleString());line('Payment','No payment is collected here. Payment follows acceptance; online payment is not available yet. Enrollment is confirmed separately after payment is verified.');
  if(offer.status!=='offered'){status.textContent='Offer status: '+String(offer.status).replaceAll('_',' ')+'. No payment has been taken on this page.';return;}
  if(typeof offer.terms?.version!=='string'||!offer.terms.version.trim()||typeof offer.terms?.cancellationRefund!=='string'||!offer.terms.cancellationRefund.trim()||typeof offer.terms?.equipment!=='string'||!offer.terms.equipment.trim()){status.textContent='This offer is missing required terms. Contact the School before accepting.';return;}
  termsVersion=offer.terms.version;
  const form=document.createElement('form'),label=document.createElement('label'),check=document.createElement('input'),text=document.createElement('span');label.className='application-check';check.type='checkbox';check.required=true;text.textContent='I have reviewed this offer, its commitment, fees, and cancellation and refund terms.';label.append(check,text);const actions=document.createElement('div');actions.className='application-actions';const accept=document.createElement('button'),decline=document.createElement('button');accept.type='submit';accept.textContent='Accept offer';decline.type='button';decline.textContent='Decline offer';actions.append(accept,decline);form.append(label,actions);root.append(form);status.textContent='Review your offer before choosing. Accepting does not take a payment.';
  async function decide(action){
   if(busy)return;
   if(attemptedDecision&&attemptedDecision!==action){status.textContent='Your earlier decision could not be confirmed. Retry the same decision or contact the School before changing it.';status.focus();return;}
   attemptedDecision=action;busy=true;accept.disabled=true;decline.disabled=true;status.textContent='Recording your decision…';
   try{
    const data=await api(action),expected=action==='accept'?'offer_accepted':'offer_declined';
    if(data?.status!==expected)throw new Error('Your decision could not be confirmed.');
    form.remove();status.textContent=action==='accept'?'Your offer acceptance has been recorded. No payment has been taken. Online payment is not available yet; enrollment will be confirmed separately after verified payment.':'Your offer has been declined. No payment has been taken.';status.focus();
   }catch(error){status.textContent='We cannot yet confirm receipt of your decision. Retry the same decision or contact the School. No payment has been taken.';status.focus();}
   finally{busy=false;accept.disabled=false;decline.disabled=false;}
  }
  form.addEventListener('submit',event=>{event.preventDefault();if(form.reportValidity())decide('accept');});
  decline.addEventListener('click',()=>{if(decline.dataset.confirm==='true')decide('decline');else{decline.dataset.confirm='true';decline.textContent='Confirm decline';status.textContent='Select Confirm decline to decline this offer, or Accept offer to continue.';}});
 }catch(error){status.textContent=error.name==='AbortError'?'The connection timed out while loading your offer. Try again.':'Your offer could not be loaded or verified. Try again, or contact the School if this continues.';retry.hidden=false;status.focus();}
 finally{busy=false;}
}
retry.addEventListener('click',start);
start();
})();
