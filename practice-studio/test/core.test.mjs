import test from "node:test";
import assert from "node:assert/strict";
import { createEmployee, createTenant, createWorkItem } from "../src/domain/index.mjs";
import { createEvent } from "../src/events/index.mjs";
import { createEvidenceRecord } from "../src/evidence/index.mjs";
import { WorldState } from "../src/engine/world-state.mjs";

test("creates a tenant independent of School", () => {
  const tenant = createTenant({
    tenant_id: "tenant-school-us",
    name: "SozoRock School US",
    operator_type: "licensed_operator"
  });
  assert.equal(tenant.operator_type, "licensed_operator");
});

test("creates an employee identity", () => {
  const employee = createEmployee({
    employee_id: "emp-001",
    registered_name: "Olu Adeyemo",
    role_id: "iam-analyst",
    tenant_id: "tenant-school-us"
  });
  assert.equal(employee.current_workplace_day, 1);
});

test("rejects LMS-style work item types", () => {
  assert.throws(() => createWorkItem({
    work_item_id: "w1",
    type: "module",
    title: "IAM Module 1",
    owner: "emp-001"
  }), /Unsupported work item type/);
});

test("validates canonical events", () => {
  const event = createEvent({
    event_id: "evt-1",
    occurred_at: "2026-09-30T09:00:00-04:00",
    actor_type: "participant_employee",
    actor_id: "emp-001",
    source_system: "practice-studio",
    event_type: "workday.started",
    context_id: "day-1"
  });
  assert.equal(event.event_type, "workday.started");
});

test("captures evidence without reducing it to a score", () => {
  const evidence = createEvidenceRecord({
    evidence_id: "ev-1",
    employee_id: "emp-001",
    timestamp: "2026-09-30T11:10:00-04:00",
    source_system: "aws",
    context_id: "access-review-1",
    event_type: "access.revoked",
    employee_action: "Revoked an unnecessary privileged role"
  });
  assert.equal(evidence.assessor_visibility, "reviewable");
  assert.equal("score" in evidence, false);
});

test("an action can persistently change later world state", () => {
  const world = new WorldState({
    systems: {
      "aws-sandbox": {
        privileged_access: {
          "contractor-17": true
        }
      }
    }
  });

  const event = world.record({
    event_id: "evt-revoke",
    occurred_at: "2026-09-30T14:22:00-04:00",
    actor_type: "participant_employee",
    actor_id: "emp-001",
    source_system: "aws",
    event_type: "access.revoked",
    context_id: "access-review-1"
  });

  const consequence = world.applyConsequence({
    consequence_id: "con-1",
    triggering_event_id: event.event_id,
    applied_at: "2026-09-30T14:22:01-04:00",
    target_collection: "systems",
    target_id: "aws-sandbox",
    patch: {
      privileged_access: {
        "contractor-17": false
      }
    }
  });

  assert.equal(world.snapshot().systems["aws-sandbox"].privileged_access["contractor-17"], false);
  assert.equal(consequence.state_version, 1);
});
