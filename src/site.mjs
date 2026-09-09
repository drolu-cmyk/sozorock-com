export const ORIGIN = 'https://www.sozorock.com';
export const SCHOOL = '/school';
export const LEGACY = Object.freeze({
  '/programs.html':'/school/programs', '/experience.html':'/school/how-you-learn',
  '/enrollment-fees.html':'/school/admissions', '/apply.html':'/school/apply',
  '/applied-ai-systems.html':'/school/programs/applied-ai-systems',
  '/cybersecurity-grc.html':'/school/programs/cybersecurity-grc',
  '/identity-access-management.html':'/school/programs/identity-access-management',
  '/ai-governance.html':'/school/programs/ai-governance',
  '/credential-standards.html':'/school/credentials', '/verify.html':'/school/verify',
  '/about.html':'/school/about', '/organizations.html':'/school/for-organizations',
  '/contact.html':'/school/contact', '/media.html':'/school/media',
  '/privacy.html':'/school/privacy', '/terms.html':'/school/terms',
  '/accessibility.html':'/accessibility', '/index.html':'/', '/school/index.html':'/school'
});
export const CORPORATE_ROUTES = ['/', '/what-we-build', '/work', '/work/cb-cap', '/work/place-intelligence', '/company', '/contact', '/privacy', '/terms', '/accessibility', '/legal'];
export const ROUTES = [...new Set([...CORPORATE_ROUTES, SCHOOL, ...Object.values(LEGACY)])];
export const schoolPath = name => LEGACY['/'+name+'.html'];
export function schoolLinks(html) {
  return html.replace(/(href=["'])\/([^"']*)/g, (all, prefix, rest) => {
    const match = rest.match(/^([^?#]*)(.*)$/);
    const old = '/'+match[1];
    return prefix+(LEGACY[old] || (old==='/'?SCHOOL:old))+match[2];
  });
}
export const schoolFacts = Object.freeze({
  weeks:12, hours:'3 to 6', fee:'USD $299 introductory total per program: $49 enrollment + $250 tuition.',
  relationship:'Applied learning by SozoRock Technology',
  status:'open',
  // Website collection is separately gated by the verified mutable applications-config.js.
  availability:'SozoRockSchool is open. See admissions for the current application route.'
});
