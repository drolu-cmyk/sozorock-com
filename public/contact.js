(()=>{'use strict';
 const root=document.querySelector('[data-contact-root]');if(!root)return;
 const endpoint=window.SOZOROCK_CONTACT?.apiEndpoint,corporate=root.dataset.context==='corporate',demo=root.dataset.product==='cb-cap';
 if(!/^https:\/\/[a-z0-9]+\.execute-api\.us-east-1\.amazonaws\.com$/.test(endpoint||'')){
  root.innerHTML='<div class="contact-unavailable"><h2>Online enquiries are unavailable.</h2><p>This form does not collect or store your information while the service is unavailable. Please try again later.</p></div>';return;
 }
 root.innerHTML=`<form aria-label="${demo?'CB-CAP demo':corporate?'Business':'School'} enquiry"><label>Your name<input name="name" autocomplete="name" required minlength="2" maxlength="100"></label><label>Email address<input name="email" type="email" autocomplete="email" required maxlength="254"></label>${corporate?'<label>Organization (optional)<input name="organization" autocomplete="organization" maxlength="200"></label>':'<label>What can we help with?<select name="intent"><option value="general">Program information</option><option value="organization">Organization or team enquiry</option><option value="media">Media enquiry</option><option value="privacy">Privacy request</option><option value="accessibility">Accessibility support</option></select></label>'}<label>Your message<textarea name="message" required minlength="20" maxlength="${demo?2970:3000}" aria-describedby="message-help"></textarea><small id="message-help">${demo?'20 to 2,970':'20 to 3,000'} characters. Do not include sensitive documents or payment details.</small></label><label class="honey" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><p>We use these details to review and respond to your enquiry. Read our <a href="${corporate?'/privacy':'/school/privacy'}">privacy notice</a>.</p><button type="submit">${demo?'Send demo request':'Send enquiry'}</button><div class="form-status" role="status" tabindex="-1"></div></form>`;
 const form=root.querySelector('form'),status=form.querySelector('[role=status]'),button=form.querySelector('button');
 const intent=new URLSearchParams(location.search).get('intent');if(form.elements.intent&&[...form.elements.intent.options].some(o=>o.value===intent))form.elements.intent.value=intent;
 let busy=false,receipt=crypto.randomUUID(),attempted=null;
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;
  for(const name of ['name','email','message','organization'])if(form.elements[name])form.elements[name].value=form.elements[name].value.trim();
  if(!form.reportValidity())return;
  const payload=Object.fromEntries(new FormData(form));payload.context=corporate?'corporate':'school';payload.intent=payload.intent||'general';if(demo)payload.message='CB-CAP demo request\n\n'+payload.message;
  const signature=JSON.stringify(payload);
  if(attempted!==null&&attempted!==signature){status.textContent='The earlier enquiry could not be confirmed. Restore those details and retry with reference '+receipt+'.';status.focus();return;}
  attempted=signature;payload.requestId=receipt;busy=true;button.disabled=true;status.textContent='Sending enquiry...';
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
  try{
   const response=await fetch(endpoint+'/enquiries',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
   const data=await response.json();
   if(!response.ok||data.id!==receipt){if(response.status===400)attempted=null;throw new Error('Receipt could not be confirmed. Keep these details and retry. Reference: '+receipt+'.');}
   status.textContent='Your enquiry was received. Reference: '+data.id+'. Keep this reference for follow-up.';form.reset();receipt=crypto.randomUUID();attempted=null;
  }catch(error){status.textContent=error.name==='AbortError'?'The connection timed out before receipt was confirmed. Retry with the same details. Reference: '+receipt+'.':error.message;}
  finally{clearTimeout(timer);busy=false;button.disabled=false;status.focus();}
 });
})();
