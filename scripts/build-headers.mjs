import {writeFileSync} from 'node:fs';
import {headers,CSP} from '../src/security-headers.mjs';
const mode=process.argv[2]||'report-only';if(!['report-only','enforce'].includes(mode))throw new Error('Unknown CSP mode');
const values=headers(mode==='enforce');
const custom=Object.entries(values).filter(([name])=>['Content-Security-Policy-Report-Only','Permissions-Policy'].includes(name));
writeFileSync(process.argv[3]||'dist/response-headers.json',JSON.stringify({Name:'sozorock-com-corporate-'+mode,Comment:'US corporate and School headers; no sibling domains',SecurityHeadersConfig:{ContentTypeOptions:{Override:true},FrameOptions:{FrameOption:'DENY',Override:true},ReferrerPolicy:{ReferrerPolicy:'no-referrer',Override:true},StrictTransportSecurity:{AccessControlMaxAgeSec:31536000,IncludeSubdomains:false,Preload:false,Override:true},...(mode==='enforce'?{ContentSecurityPolicy:{ContentSecurityPolicy:CSP,Override:true}}:{})},CustomHeadersConfig:{Quantity:custom.length,Items:custom.map(([Header,Value])=>({Header,Value,Override:true}))}},null,2));
