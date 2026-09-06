(()=>{
  'use strict';
  const root=document.querySelector('[data-application-root]');
  const cfg=window.SOZOROCK_APPLICATIONS||{};
  if(!root||cfg.enabled!==true||!/^https:\/\/[a-z0-9]+\.execute-api\.us-east-1\.amazonaws\.com$/.test(cfg.apiEndpoint||''))return;
  const choices=[['applied-ai-systems','Applied AI Systems'],['cybersecurity-grc','Cybersecurity GRC'],['identity-access-management','Identity & Access Management'],['ai-governance','AI Governance']];
  root.innerHTML=`<form aria-label="US application"><label>Your name<input name="name" autocomplete="name" required minlength="2" maxlength="100"></label><label>Email address<input name="email" type="email" autocomplete="email" required maxlength="254"></label><label>Program<select name="programme" required>${choices.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select></label><label>What would you like to learn and apply?<textarea name="motivation" required minlength="20" maxlength="3000" aria-describedby="application-help"></textarea></label><p id="application-help">20–3,000 characters. Do not include identity documents, passwords, health information or payment details.</p><label><input name="consent" type="checkbox" required> I agree that SozoRock Tech Inc. may use these details to review and respond to my application, as described in the <a href="/privacy.html">privacy notice</a>.</label><label class="honey" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><p>No payment is collected with this application. Submitting does not guarantee admission.</p><button type="submit">Submit application</button><p role="status" tabindex="-1"></p></form>`;
  document.querySelector('[data-application-unavailable]')?.setAttribute('hidden','');
  const form=root.querySelector('form'),button=form.querySelector('button'),status=form.querySelector('[role=status]');
  const selected=new URLSearchParams(location.search).get('program');
  if(choices.some(([id])=>id===selected))form.elements.programme.value=selected;
  let busy=false,requestId=crypto.randomUUID(),attempted=null;
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(busy)return;
    for(const name of ['name','email','motivation'])form.elements[name].value=form.elements[name].value.trim();
    if(!form.reportValidity())return;
    const payload={name:form.elements.name.value,email:form.elements.email.value,programme:form.elements.programme.value,motivation:form.elements.motivation.value,consent:form.elements.consent.checked,website:form.elements.website.value};
    const signature=JSON.stringify(payload);
    if(attempted!==null&&attempted!==signature){status.textContent='A previous submission could not be confirmed. Restore those details and retry, or contact contact@sozorock.com with reference '+requestId+' before starting another application.';status.focus();return;}
    attempted=signature;payload.requestId=requestId;busy=true;button.disabled=true;status.textContent='Sending application…';
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try{
      const response=await fetch(cfg.apiEndpoint+'/applications',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
      const data=await response.json();
      if(!response.ok||data.id!==requestId||data.status!=='received'){
        if(response.status===400)attempted=null;
        throw new Error(response.status===409?'This reference has different details. Contact contact@sozorock.com with reference '+requestId+'.':'Receipt could not be confirmed. Keep these details and retry. Reference: '+requestId+'.');
      }
      root.replaceChildren();const message=document.createElement('p');message.setAttribute('role','status');message.tabIndex=-1;message.textContent='Your application was received. Reference: '+data.id+'. Keep this reference for follow-up. No payment has been taken.';root.append(message);message.focus();
    }catch(error){status.textContent=error.name==='AbortError'?'The connection timed out before receipt was confirmed. Retry with the same details and reference: '+requestId+'.':error.message;status.focus();}
    finally{clearTimeout(timer);busy=false;button.disabled=false;}
  });
})();
