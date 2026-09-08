// Constants are generated from src/site.mjs. Production adds an immutable release prefix.
function handler(event) {
 var r=event.request,host=r.headers.host&&r.headers.host.value,uri=r.uri;
 if(r.method!=='GET'&&r.method!=='HEAD')return r;
 // Never redirect API paths or change OAuth callback requests.
 if(uri.indexOf('/api/')===0)return r;
 if(uri==='/admin.html'){
  if(release)r.uri='/releases/'+release+uri;
  return r;
 }
 var path=uri;
 if(path.length>1)path=path.replace(/\/+$/,'');
 if(redirects[path])path=redirects[path];
 else if(path.slice(-11)==='/index.html'&&routes.indexOf(path.slice(0,-11))!==-1)path=path.slice(0,-11);
 if(host==='sozorock.com'||path!==uri){
  var parts=[],q=r.querystring||{};
  Object.keys(q).forEach(function(key){
   var values=q[key].multiValue||[q[key]];
   values.forEach(function(item){parts.push(key+'='+item.value);});
  });
  return {statusCode:301,statusDescription:'Moved Permanently',headers:{location:{value:'https://www.sozorock.com'+path+(parts.length?'?'+parts.join('&'):'')},'cache-control':{value:'public,max-age=300'}}};
 }
 if(uri==='/applications-config.js'||uri==='/engagement-config.js')return r;
 // Keep previous documents' immutable assets reachable through their own release.
 if(/^\/releases\/[a-f0-9]{40}\/(assets\/|media\/)[a-zA-Z0-9_./-]+$/.test(uri)&&uri.indexOf('..')===-1)return r;
 if(/^\/releases\/[a-f0-9]{40}\/(corporate\.css|corporate\.js|school\.css|school-nav\.js|applications\.js|admin\.js|contact\.js|favicon\.svg|favicon-48\.png|apple-touch-icon\.png)$/.test(uri))return r;
 if(routes.indexOf(uri)!==-1)r.uri=(release?'/releases/'+release:'')+(uri==='/'?'/index.html':uri+'/index.html');
 else if(/^\/(assets|media)\/[a-zA-Z0-9_./-]+$/.test(uri)&&uri.indexOf('..')===-1||/^\/(corporate\.css|corporate\.js|school\.css|school-nav\.js|applications\.js|admin\.js|contact\.js|favicon\.svg|favicon-48\.png|apple-touch-icon\.png|menu\.svg|robots\.txt|sitemap\.xml|social-card\.(png|svg)|404\.html)$/.test(uri)){
  r.uri=(release?'/releases/'+release:'')+uri;
 } else return {statusCode:404,statusDescription:'Not Found',headers:{'content-type':{value:'text/html; charset=utf-8'},'cache-control':{value:'no-store'},'x-content-type-options':{value:'nosniff'},'x-frame-options':{value:'DENY'}},body:'<!doctype html><html lang="en-US"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page Not Found | SozoRock Technology</title><link rel="stylesheet" href="/corporate.css"><body class="corporate"><main class="page-intro" id="main"><h1>That page<br>is not here.</h1><p>Check the address or continue to <a href="/">SozoRock Technology</a> or <a href="/school">SozoRockSchool</a>.</p></main></body></html>'};
 return r;
}
