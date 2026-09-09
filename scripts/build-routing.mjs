import {readFileSync,writeFileSync} from 'node:fs';
import {LEGACY,ROUTES} from '../src/site.mjs';
export function routingSource(release='') {
 if(release&&!/^[a-f0-9]{40}$/.test(release))throw new Error('Release must be an exact Git commit');
 return `var redirects=${JSON.stringify(LEGACY)};var routes=${JSON.stringify(ROUTES)};var release=${JSON.stringify(release)};\n`+readFileSync(new URL('../infra/aws/public-routing.js',import.meta.url),'utf8');
}
if(process.argv[1]?.endsWith('build-routing.mjs'))writeFileSync(process.argv[3]||'dist/routing.js',routingSource(process.argv[2]||''));
