(()=>{
  'use strict';
  const cfg=window.SOZOROCK_APPLICATIONS||{},callback=location.origin+'/admin.html';
  const login=document.querySelector('#admin-login'),logout=document.querySelector('#admin-logout'),content=document.querySelector('#admin-content'),status=document.querySelector('#admin-status'),rows=document.querySelector('#admin-records'),more=document.querySelector('#admin-more'),refresh=document.querySelector('#admin-refresh'),count=document.querySelector('#admin-count');
  const tokenKey='sozorock_us_admin_access',pkceKey='sozorock_us_admin_pkce';
  const view=document.querySelector('#admin-view');
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
    for(const item of [...items.values()].sort((a,b)=>Number(b.createdAt)-Number(a.createdAt))){
      const article=document.createElement('article'),heading=document.createElement('h2');heading.textContent=item.name;article.append(heading);
      const fields=[['Reference','id'],['Email','email'],...(view.value==='enquiries'?[['Organization','organization'],['Topic','intent'],['Message','message']]:[['Program','programme'],['Response','motivation'],['Status','status']])];
      for(const [label,key] of fields){const p=document.createElement('p'),strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(String(item[key]??'')));article.append(p);}
      rows.append(article);
    }
    count.textContent=items.size+' loaded '+labels()+(cursor?'. More are available.':'.');more.hidden=!cursor;
  }
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
