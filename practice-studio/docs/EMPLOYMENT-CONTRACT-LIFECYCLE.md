# Employment contract lifecycle

Implemented as engine functions in `src/employment/lifecycle.mjs`. This is a simulated employment contract, not an employment agreement. Harborline is the fictional enterprise.

## State and responsibility

`onboarding → guided → supported → independent → cross_functional → handover → exited`

A contract carries tenant, employee, assigned manager, role, start/end instants, version, responsibility level, transition history and a configurable progression policy. It is serializable so a service can keep it in canonical persisted world state. Dates do not advance responsibility by themselves.

Onboarding requires authoritative readiness. Further advancement requires observed work at the next responsibility level, evidence from distinct contexts, capability dimensions and a completed assigned-manager review. Open review concerns or follow-up block advancement. Evidence from another employee, from before the current phase, or from the future cannot qualify. The starting policy requires two contexts and execution/judgment evidence; this is a configurable engine default requiring pilot validation, not a claim of validated assessment thresholds.

Only the assigned manager with `employee.review` authorization can apply a transition. Commands check tenant scope, reject backward time and reject repeated event IDs in contract history. Results contain the next contract and canonical authoritative event. The service must save both atomically with optimistic version checks; the pure functions do not claim to provide a deployed transaction layer.

The current authorization profiles support IAM manager commands. Other pathway manager permissions and complete role work remain part of Gate 2.

## Handover and exit

Handover may begin early or at contract end. It records unfinished work. Exit requires:

- a scoped handover artifact accepted by the assigned manager;
- a successor for every recorded open work item;
- scoped, completed teardown evidence from the integration/orchestration layer;
- a completed manager exit review grounded in the recorded professional episode;
- portfolio observations and artifacts belonging to this employee.

Exit returns an exited employee, a capability evidence portfolio, grounded debrief prompts and an exit event. It does not issue real cloud revocations; it requires the verified result of those revocations. Contract expiry blocks ordinary work even when exit is still awaiting handover. Operator/service cleanup must continue after the work period ends.

## Service integration boundary

`contractAllowsWork` is the time/phase gate for ordinary work. A future authenticated service must apply it before work commands, credential issuance, and external-system launch. It must resolve records and manager identity server-side, never trust browser-provided observations, reviews, readiness or teardown claims, and persist events/state together. Existing generic authorization is not yet wired to this contract gate.

`contractWorkItems` supplies arrival, manager-review and handover items. It is a work model, not the final UI or the complete multi-week experience scheduler. Support remains available in guided and later phases; independence is demonstrated behavior, not removal of contextual help.

## Verification

The lifecycle test carries one contract across October–December, manager reviews, evidence, reloads, handover, verified teardown and portfolio exit. Negative tests cover cross-tenant commands, unauthorized managers, elapsed-time-only promotion, stale/future/foreign observations, unresolved feedback, repeated events, backward time, missing successors, teardown and debrief requirements.
