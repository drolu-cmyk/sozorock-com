import {policies} from './corporate-policies.mjs';
import {commercialNav, commercialFooter, commercialPages} from './commercial-content.mjs';
export const link=(href,text)=>`<a class="text-link" href="${href}">${text}</a>`;
export const nav=commercialNav;
export const footer=commercialFooter;
export const pages={...policies,...commercialPages};
