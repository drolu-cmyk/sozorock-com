# IAM Access Review Workflow

## Objective
Turn the first ordinary access request into real professional practice rather than a multiple-choice exercise.

## Employee flow
1. Receive the access request through the workplace.
2. Inspect the requestor, resource, requested role, business reason and approval.
3. Open authorized professional systems to check current repository/cloud access.
4. Ask the requestor, manager or system owner for clarification where evidence is incomplete.
5. Use contextual support if terminology or policy is unfamiliar.
6. Approve, deny, modify or escalate the request.
7. Write a rationale.
8. Apply the decision through the appropriate adapter when connected.
9. Produce an access-review note.
10. Persist the decision, evidence and artifact.
11. Allow world-state consequences to determine whether later events become eligible.

## Design rule
The product never asks "Which answer is correct?"

It asks the employee to perform the work and leaves an evidence trail that can later be reconstructed and discussed.

## Real-system integration
When live adapters are connected:
- GitHub provides current repository permissions and applies repository-role changes where authorized.
- AWS/IAM provides cloud identity/access context and controlled sandbox mutations.
- Email/chat provides clarification with requestors/managers.
- Voice allows the same clarification and debrief through natural conversation.

Provider actions remain behind the adapter authorization layer and sandbox controls.
