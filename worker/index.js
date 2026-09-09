// Generated routing payload is inserted by prepare-sites-build.mjs.
import {LEGACY,ROUTES} from '../src/site.mjs';
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(!['GET','HEAD'].includes(request.method)||url.pathname.startsWith('/api/'))return env.ASSETS.fetch(request);
 const normalized=url.pathname.length>1?url.pathname.replace(/\/+$/,''):url.pathname;
 const target=LEGACY[normalized]||normalized;
 if(target!==url.pathname){url.pathname=target;return Response.redirect(url.href,301);}
 if(ROUTES.includes(target))url.pathname=target==='/'?'/index.html':target+'/index.html';
 const response=await env.ASSETS.fetch(new Request(url,request));
 if(response.status!==404)return response;
 url.pathname='/404.html';url.search='';
 const page=await env.ASSETS.fetch(new Request(url,request));
 return new Response(page.body,{status:404,headers:page.headers});
}};
