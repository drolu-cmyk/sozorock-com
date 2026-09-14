(()=>{
  'use strict';
  const cfg=window.SOZOROCK_APPLICATIONS||{},callback=location.origin+'/admin.html';
  const login=document.querySelector('#admin-login'),logout=document.querySelector('#admin-logout'),content=document.querySelector('#admin-content'),status=document.querySelector('#admin-status'),rows=document.querySelector('#admin-records'),more=document.querySelector('#admin-more'),refresh=document.querySelector('#admin-refresh'),count=document.querySelector('#admin-count');
  const tokenKey='sozorock_us_admin_access',pkceKey='sozorock_us_admin_pkce';
  const view=document.querySelector('#admin-view');
  const search=document.querySelector('#admin-search'),program=document.querySelector('#admin-program'),filterStatus=document.querySelector('#admin-filter-status');
  const statuses=['received','under_review','waitlisted','offered','offer_accepted','offer_declined','payment_pending','paid','enrolled','not_selected','withdrawn'];
  const statusLabel=value=>value==='received'?'Submitted':String(value).replaceAll('_',' ');
  const time=value=>value?new Date(Number(value)*1000).toLocaleString():'';
  for(const value of statuses){const option=document.createElement('option');option.value=value;option.textContent=statusLabel(value);filterStatus.append(option);}
  const filtered=()=>[...items.values()].filter(item=>view.value==='enquiries'||((!program.value||item.programme===program.value)&&(!filterStatus.value||item.status===filterStatus.value)&&(!search.value||[item.name,item.email,item.id].some(value=>String(value||'').toLowerCase().includes(search.value.toLowerCase()))))).sort((a,b)=>Number(b.createdAt)-Number(a.createdAt));
  let cursor=null,busy=false,items=new Map(),activeRequest=null,sessionTimer=null;
  const labels=()=>view.value==='enquiries'?'enquiries':'applications';
  const configured=/^https:\/\/[a-z0-9]+\.execute-api\.us-east-1\.amazonaws\.com$/.test(cfg.apiEndpoint||'')&&/^https:\/\/[a-z0-9-]+\.auth\.us-east-1\.amazoncognito\.com$/.test(cfg.adminLoginOrigin||'')&&/^[a-z0-9]+$/.test(cfg.adminClientId||'');
  const encode=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const random=()=>encode(crypto.getRandomValues(new Uint8Array(32)));
  const say=message=>{status.textContent=message;};
  const clear=()=>{activeRequest?.abort();activeRequest=null;busy=false;clearTimeout(sessionTimer);sessionStorage.removeItem(tokenKey);sessionStorage.removeItem(pkceKey);items.clear();rows.replaceChildren();count.textContent='';cursor=null;content.hidden=true;logout.hidden=true;login.hidden=false;};
  const token=()=>{try{const saved=JSON.parse(sessionStorage.getItem(tokenKey));return saved&&saved.expiresAt>Date.now()?saved.accessToken:null;}catch{return null;}};
  function expireSession(){
    clearTimeout(sessionTimer);
    let saved;try{saved=JSON.parse(sessionStorage.getItem(tokenKey));}catch{}
    if(!saved||!Number.isFinite(saved.expiresAt)||saved.expiresAt<=Date.now()){clear();say('Your session expired. Sign in again.');return;}
    sessionTimer=setTimeout(expireSession,Math.min(saved.expiresAt-Date.now(),900000));
  }
  function render(){
    rows.replaceChildren();
    document.querySelector('#application-filters').hidden=view.value!=='applications';
    for(const item of filtered()){
      const article=document.createElement('article'),heading=document.createElement('h2');heading.textContent=item.name;article.append(heading);
      const fields=[['Reference','id'],['Email','email'],...(view.value==='enquiries'?[['Organization','organization'],['Topic','intent'],['Message','message']]:[['Market','market'],['State or territory','state'],['Program','programme'],['Current role','role'],['Organization','organization'],['Learning goal','motivation'],['Availability','availability'],['Status','status'],['Consent version','consentVersion']])];
      for(const [label,key] of fields){const p=document.createElement('p'),strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(String(item[key]??'')));article.append(p);}
      const submitted=document.createElement('p');submitted.textContent='Submitted: '+time(item.createdAt);article.append(submitted);
      if(view.value==='applications'){
        const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Review history and actions';details.append(summary);
        for(const change of item.history||[]){const p=document.createElement('p');p.textContent=[time(change.at||change.timestamp),change.actor,statusLabel(change.status||change.to||''),change.note].filter(Boolean).join(' · ');details.append(p);}
        for(const note of item.notes||[]){const p=document.createElement('p');p.textContent=typeof note==='string'?note:[time(note.at||note.timestamp),note.actor,note.note||note.text].filter(Boolean).join(' · ');details.append(p);}
        const form=document.createElement('form'),label=document.createElement('label'),select=document.createElement('select');label.textContent='Review status';label.append(select);
        // Payment and offer decisions come only from their dedicated server workflows.
        for(const value of [item.status,...({received:['under_review','withdrawn'],under_review:['waitlisted','not_selected','withdrawn'],waitlisted:['under_review','not_selected','withdrawn'],offered:['withdrawn'],offer_accepted:['withdrawn']}[item.status]||[])]){const option=document.createElement('option');option.value=value;option.textContent=statusLabel(value);select.append(option);}select.value=item.status;
        const noteLabel=document.createElement('label'),note=document.createElement('textarea');noteLabel.textContent='Internal review note (not shared with applicant)';note.maxLength=2000;noteLabel.append(note);
        const save=document.createElement('button');save.type='submit';save.textContent='Save review';form.append(label,noteLabel,save);form.addEventListener('submit',async event=>{event.preventDefault();await mutate(item,'status',{status:select.value,note:note.value,expectedVersion:item.version},save);});details.append(form);
        if(['under_review','waitlisted'].includes(item.status)){const offer=document.createElement('button');offer.type='button';offer.textContent='Issue offer';offer.addEventListener('click',()=>mutate(item,'offer',{expectedVersion:item.version},offer));details.append(offer);}
        const payment=document.createElement('p');payment.textContent='Payment and enrollment status: '+statusLabel(item.status)+'. Online payment is not available yet. No payment is collected with an application.';details.append(payment);article.append(details);
      }
      rows.append(article);
    }
    count.textContent=filtered().length+' matching / '+items.size+' loaded '+labels()+(cursor?'. More are available.':'.');more.hidden=!cursor;
  }
  async function mutate(item,action,payload,button){
    const access=token();if(!access){clear();say('Your session expired. Sign in again.');return;}if(busy)return;
    busy=true;button.disabled=true;const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);activeRequest=controller;
    say('Saving '+action+'…');
    try{const response=await fetch(cfg.apiEndpoint+'/admin/applications/'+encodeURIComponent(item.id)+'/'+action,{method:'POST',headers:{Authorization:'Bearer '+access,'content-type':'application/json'},cache:'no-store',body:JSON.stringify(payload),signal:controller.signal});
      if(activeRequest!==controller||token()!==access)return;
      if(response.status===401||response.status===403){clear();say('Your session expired or this account is not authorized.');return;}
      const data=await response.json();if(!response.ok)throw new Error(response.status===409?'This application changed or the transition is not permitted. Refresh before reviewing it again.':response.status===503?'This operation is not configured. No offer was issued.':'The change could not be confirmed. Refresh before retrying.');
      items.set(item.id,{...item,status:data.status,version:data.version});render();say('Saved. Refresh to load the complete audit history.');
      if(data.offerUrl){const url=new URL(data.offerUrl);if(url.origin===location.origin&&url.pathname==='/school/offer'){const p=document.createElement('p'),link=document.createElement('a');link.href=url.href;link.textContent='Open newly issued offer';link.rel='noreferrer';p.append(link,document.createTextNode(' — this private one-time link is for the applicant.'));status.append(p);}}
    }catch(error){if(activeRequest===controller)say(error.name==='AbortError'?'Saving timed out. Refresh before retrying.':error.message);}finally{clearTimeout(timer);if(activeRequest===controller){activeRequest=null;busy=false;button.disabled=false;}}
  }
  for(const control of [search,program,filterStatus])control.addEventListener('input',render);
  document.querySelector('#admin-export').addEventListener('click',()=>{
    if(!token()){clear();say('Sign in again before exporting.');return;}
    const fields=['id','name','email','state','programme','role','organization','status','createdAt'];
    // Neutralize spreadsheet formula injection, including leading whitespace/control characters.
    const cell=value=>'"'+String(value??'').replace(/^[\s\u0000-\u001f]*([=+@-])/u,"'$1").replaceAll('"','""')+'"';
    const csv=[fields,...filtered().map(item=>fields.map(key=>item[key]))].map(row=>row.map(cell).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='school-applications.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);say('Exported '+filtered().length+' loaded records.');
  });
  async function load(reset=false){
    if(busy)return;const access=token();if(!access){clear();say('Sign in to view records.');return;}
    expireSession();const requestedView=view.value;
    busy=true;more.disabled=true;refresh.disabled=true;
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    activeRequest=controller;say('Loading '+labels()+'…');
    try{
      const url=new URL(cfg.apiEndpoint+'/admin/'+requestedView);url.searchParams.set('limit','25');if(!reset&&cursor)url.searchParams.set('cursor',cursor);
      const response=await fetch(url,{headers:{Authorization:'Bearer '+access},cache:'no-store',signal:controller.signal});
      if(activeRequest!==controller)return;
      if(response.status===401||response.status===403){clear();say('Your session expired or this account is not authorized. Sign in with an administrator account.');return;}
      if(!response.ok)throw new Error('Records could not be loaded. Retry or contact your administrator.');
      const data=await response.json();if(!Array.isArray(data.items)||!(data.nextCursor==null||typeof data.nextCursor==='string'))throw new Error('The service returned an invalid response.');
      if(activeRequest!==controller||requestedView!==view.value||token()!==access)return;
      if(reset)items.clear();for(const item of data.items)if(item&&typeof item.id==='string')items.set(item.id,item);
      cursor=data.nextCursor||null;content.hidden=false;logout.hidden=false;login.hidden=true;render();say('Only authorized staff can view these records.');
    }catch(error){if(activeRequest===controller)say(error.name==='AbortError'?'Loading timed out. You can retry.':error.message);}finally{clearTimeout(timer);if(activeRequest===controller){activeRequest=null;busy=false;more.disabled=false;refresh.disabled=false;}}
  }
  login.addEventListener('click',async()=>{
    if(!configured){say('Administrator sign-in is not configured yet.');return;}
    try{const verifier=random(),state=random();sessionStorage.setItem(pkceKey,JSON.stringify({verifier,state,createdAt:Date.now()}));const challenge=encode(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));const params=new URLSearchParams({client_id:cfg.adminClientId,response_type:'code',scope:'openid email aws.cognito.signin.user.admin',redirect_uri:callback,state,code_challenge_method:'S256',code_challenge:challenge});location.assign(cfg.adminLoginOrigin+'/oauth2/authorize?'+params);}catch{say('Sign-in could not start. Check browser storage settings.');}
  });
  logout.addEventListener('click',()=>{clear();const params=new URLSearchParams({client_id:cfg.adminClientId,logout_uri:location.origin+'/'});location.assign(cfg.adminLoginOrigin+'/logout?'+params);});
  more.addEventListener('click',()=>load());refresh.addEventListener('click',()=>load(true));
  view.addEventListener('change',()=>{activeRequest?.abort();activeRequest=null;busy=false;items.clear();rows.replaceChildren();cursor=null;count.textContent='';more.hidden=true;load(true);});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!content.hidden)expireSession();});
  async function start(){
    const query=new URLSearchParams(location.search),code=query.get('code'),state=query.get('state'),authError=query.has('error');
    if(code||authError)history.replaceState(null,'',location.pathname);
    if(!configured){clear();say('Administrator sign-in is not configured yet.');return;}
    if(authError){clear();say('Sign-in was not completed.');return;}
    if(code){
      try{
        const saved=JSON.parse(sessionStorage.getItem(pkceKey));sessionStorage.removeItem(pkceKey);
        if(!saved||saved.state!==state||typeof saved.verifier!=='string'||!Number.isFinite(saved.createdAt)||saved.createdAt>Date.now()||Date.now()-saved.createdAt>600000)throw new Error();
        const body=new URLSearchParams({grant_type:'authorization_code',client_id:cfg.adminClientId,code,redirect_uri:callback,code_verifier:saved.verifier});
        const response=await fetch(cfg.adminLoginOrigin+'/oauth2/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body});const data=await response.json();
        if(!response.ok||typeof data.access_token!=='string'||!Number.isFinite(data.expires_in)||data.expires_in<=0)throw new Error();
        sessionStorage.setItem(tokenKey,JSON.stringify({accessToken:data.access_token,expiresAt:Date.now()+data.expires_in*1000}));
      }catch{clear();say('The sign-in response could not be verified. Please start sign-in again.');return;}
    }
    if(token()){content.hidden=false;logout.hidden=false;login.hidden=true;await load(true);}
  }
  start();
})();
