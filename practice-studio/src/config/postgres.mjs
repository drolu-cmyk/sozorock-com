export function createPgClientConfig(env=process.env){
  const required=["PRACTICE_STUDIO_DATABASE_URL"];
  for(const key of required) if(!env[key]) throw new Error("Missing "+key);
  return Object.freeze({
    connectionString:env.PRACTICE_STUDIO_DATABASE_URL,
    ssl:env.PRACTICE_STUDIO_DATABASE_SSL==="disable"?false:{rejectUnauthorized:true},
    application_name:"practice-studio"
  });
}
