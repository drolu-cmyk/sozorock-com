export function createSandboxConfig(env=process.env){
  const cfg={
    mode:env.PRACTICE_STUDIO_SANDBOX_MODE ?? "stub",
    github:{
      organization:env.PRACTICE_STUDIO_GITHUB_ORG ?? null,
      repository_prefix:env.PRACTICE_STUDIO_GITHUB_REPO_PREFIX ?? "ps-",
      allow_mutations:env.PRACTICE_STUDIO_GITHUB_ALLOW_MUTATIONS==="true"
    },
    aws:{
      account_id:env.PRACTICE_STUDIO_AWS_ACCOUNT_ID ?? null,
      region:env.PRACTICE_STUDIO_AWS_REGION ?? "us-east-1",
      role_arn:env.PRACTICE_STUDIO_AWS_ROLE_ARN ?? null,
      allow_mutations:env.PRACTICE_STUDIO_AWS_ALLOW_MUTATIONS==="true",
      max_session_minutes:Number(env.PRACTICE_STUDIO_AWS_MAX_SESSION_MINUTES ?? 90)
    }
  };
  if(cfg.mode==="live-sandbox"){
    if(!cfg.github.organization) throw new Error("GitHub sandbox organization required");
    if(!cfg.aws.account_id || !cfg.aws.role_arn) throw new Error("AWS sandbox account and role required");
  }
  return Object.freeze(cfg);
}
