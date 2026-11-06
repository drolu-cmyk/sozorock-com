// Verified Google Workspace aliases. All deliver to the existing administrator mailbox.
export const operationalContacts = Object.freeze([
  ['Admissions', 'admissions'], ['Registrar', 'registrar'], ['Support', 'support'],
  ['Billing', 'billing'], ['Partnerships', 'partnerships'], ['Contact', 'contact'],
  ['Security', 'security'], ['Privacy', 'privacy']
]);
export const operationalContactLinks = () => operationalContacts.map(([label, alias]) =>
  `<a href="mailto:${alias}@sozorock.com"><span>${label}</span><span>${alias}@sozorock.com</span></a>`).join('');
