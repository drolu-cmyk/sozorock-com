# Identity and Authorization Model

## Principle
The browser is never trusted to declare its tenant, employee identity, role or system permissions.

Authenticated account identity is mapped server-side to a Practice Studio principal.

## Identity chain
Registered participant account
-> authenticated account subject
-> Practice Studio principal
-> tenant
-> simulated employee
-> role/team/manager
-> entitlement profile
-> short-lived system credentials

## Authorization
Authorization combines:
- tenant boundary;
- role;
- employee scope;
- resource ownership;
- review/operator privileges;
- sandbox lease state.

## Roles
Initial product roles:
- participant employee roles, e.g. iam-analyst;
- simulated manager role as workplace identity, separate from authorization principal unless a human manager is involved;
- assessor;
- operator.

## Temporary credentials
Real-system credentials must:
- be short-lived;
- be tied to tenant, employee and active sandbox lease;
- never be stored in browser local storage where avoidable;
- expire with the lease;
- be revocable by emergency control;
- expose only the minimum system scope.

## School integration
School registration may initiate provisioning, but School UI never supplies authoritative Practice Studio role or tenant values at runtime. Those are resolved from server-side provisioning records.
