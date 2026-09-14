import {policies} from './corporate-policies.mjs';
import {commercialNav, commercialFooter, commercialPages} from './commercial-content.mjs';
import {researchPages, RESEARCH_PATH} from './research-content.mjs';
export const link=(href,text)=>`<a class="text-link" href="${href}">${text}</a>`;
export const nav=commercialNav;
export const footer=commercialFooter;
export const pages={...policies,...commercialPages,...researchPages};
for(const path of ['/', '/what-we-do/ai-intelligent-systems', '/what-we-do/cybersecurity-identity', RESEARCH_PATH]) {
  pages[path].styles='<link rel="stylesheet" href="/assets/assurance-research.css">';
}
