import http from 'node:http';
import fs from 'node:fs';
const font=new URL('../../public/assets/fonts/instrument-sans-latin.woff2',import.meta.url);
http.createServer((req,res)=>{
 if(req.url==='/font.woff2'){res.writeHead(200,{'Content-Type':'font/woff2'});res.end(fs.readFileSync(font));return;}
 const cb=req.url==='/cbcap';
 if(!cb&&req.url!=='/corporate'){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
 res.end(`<!doctype html><html lang="en-US"><meta charset="utf-8"><title>SozoRock social card</title><style>@font-face{font-family:Instrument;src:url('/font.woff2')}*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;background:#fff;color:#132b42;font-family:Instrument,Arial,sans-serif}main{height:630px;padding:52px 60px;display:flex;flex-direction:column;align-items:flex-start}.brand{font-size:30px;letter-spacing:-1px;font-weight:650;line-height:1.05}.brand span{display:block;font-size:18px;font-weight:400;letter-spacing:0}h1{font-size:${cb?78:82}px;line-height:1.02;font-weight:600;letter-spacing:-3px;margin:43px 0 24px;max-width:1040px}p{font-size:26px;margin:0;line-height:1.4;max-width:1000px}.footer{margin-top:auto;font-size:19px;color:#214fcc}small{font-size:20px;color:#214fcc;margin-left:auto;position:absolute;right:60px;top:62px}</style><main><div class="brand">SozoRock<span>Technology</span></div>${cb?'<small>CB-CAP</small>':''}<h1>${cb?'See where access breaks down.<br>Plan what comes next.':'Build the systems<br>your business depends on.'}</h1><p>${cb?'Spatial intelligence for care access.':'AI, data infrastructure, cybersecurity and product engineering.'}</p><div class="footer">sozorock.com${cb?'/cb-cap':''}</div></main></html>`);
}).listen(4182,'127.0.0.1',()=>console.log('Social card preview on 4182'));
