import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import vm from 'node:vm';
import {routingSource} from './build-routing.mjs';
import {headers} from '../src/security-headers.mjs';
const root=resolve('dist/client'),sandbox={};vm.createContext(sandbox);vm.runInContext(routingSource(),sandbox);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.xml':'application/xml','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.mp4':'video/mp4','.txt':'text/plain'};
http.createServer(async(req,res)=>{
 for(const [name,value]of Object.entries(headers(process.env.CSP_MODE==='enforce')))res.setHeader(name,value);
 const url=new URL(req.url,'http://127.0.0.1'),querystring={};
 for(const key of new Set(url.searchParams.keys())){const values=url.searchParams.getAll(key).map(value=>({value:encodeURIComponent(value)}));querystring[encodeURIComponent(key)]={value:values[0].value,...(values.length>1?{multiValue:values}:{})};}
 const result=sandbox.handler({request:{method:req.method,uri:url.pathname,headers:{host:{value:'www.sozorock.com'}},querystring}});
 if(result.statusCode){res.writeHead(result.statusCode,Object.fromEntries(Object.entries(result.headers).map(([k,v])=>[k,k==='location'?v.value.replace('https://www.sozorock.com','http://'+req.headers.host):v.value])));res.end(req.method==='HEAD'?'':result.body||'');return;}
 const file=resolve(root,'.'+result.uri);
 if(!file.startsWith(root+'/')&&!file.startsWith(root+'\\')){res.writeHead(403);res.end();return;}
 try{const data=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream','cache-control':'no-store'});res.end(req.method==='HEAD'?'':data);}catch{res.writeHead(404,{'content-type':'text/html'});res.end(await readFile(resolve(root,'404.html')));}
}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Review server http://127.0.0.1:'+(process.env.PORT||4173)));
