// Same allowlist for local CSP observation and the scoped CDN response policy.
export const CSP="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; connect-src 'self' https://q9l0fuov97.execute-api.us-east-1.amazonaws.com https://8z9jdpp371.execute-api.us-east-1.amazonaws.com https://sozorock-us-admin-791860731989.auth.us-east-1.amazoncognito.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'";
export function headers(enforce=false){return {
 [enforce?'Content-Security-Policy':'Content-Security-Policy-Report-Only']:CSP,
 'Strict-Transport-Security':'max-age=31536000',
 'X-Content-Type-Options':'nosniff',
 'Referrer-Policy':'no-referrer',
 'X-Frame-Options':'DENY',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=()'
};}
