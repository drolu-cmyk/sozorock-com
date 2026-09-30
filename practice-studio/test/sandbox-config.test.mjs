import test from "node:test";
import assert from "node:assert/strict";
import { createSandboxConfig } from "../src/config/sandbox.mjs";
import { GitHubSandboxAdapter } from "../src/adapters/github-sandbox.mjs";
import { AwsIamSandboxAdapter } from "../src/adapters/aws-iam-sandbox.mjs";

test("sandbox defaults to non-live and non-mutating",()=>{
  const c=createSandboxConfig({});
  assert.equal(c.mode,"stub");
  assert.equal(c.github.allow_mutations,false);
  assert.equal(c.aws.allow_mutations,false);
});

test("live sandbox requires explicit provider boundaries",()=>{
  assert.throws(()=>createSandboxConfig({PRACTICE_STUDIO_SANDBOX_MODE:"live-sandbox"}));
});

test("GitHub sandbox blocks mutations until enabled",async()=>{
  const adapter=new GitHubSandboxAdapter({
    client:{execute:async x=>x},
    config:{organization:"sozorock-sandbox",repository_prefix:"ps-",allow_mutations:false}
  });
  await assert.rejects(()=>adapter.execute({mutation:true}),/mutations disabled/);
});

test("AWS sandbox blocks mutations until enabled",async()=>{
  const adapter=new AwsIamSandboxAdapter({
    client:{execute:async x=>x},
    config:{account_id:"123",region:"us-east-1",role_arn:"arn:test",max_session_minutes:90,allow_mutations:false}
  });
  await assert.rejects(()=>adapter.execute({mutation:true}),/mutations disabled/);
});
