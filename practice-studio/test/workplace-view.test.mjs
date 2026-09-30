import test from "node:test";
import assert from "node:assert/strict";
import { buildWorkplaceView } from "../src/ui/workplace-view.mjs";

test("workplace shell produces employee-first navigation",()=>{
  const view=buildWorkplaceView({
    employee:{
      employee_id:"emp-1",
      registered_name:"Olu",
      role_id:"iam-analyst",
      current_workplace_day:1
    },
    now:"2026-10-01T08:55:00-04:00",
    messages:[{id:"m1",unread:true}]
  });

  assert.equal(view.today.greeting,"Good morning, Olu.");
  assert.deepEqual(view.navigation,["Today","Work","People","Messages","Meetings","Files","Systems","Support"]);
  assert.equal(view.navigation.includes("Modules"),false);
  assert.equal("progress_percent" in view,false);
});
