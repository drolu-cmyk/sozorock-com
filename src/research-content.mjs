export const RESEARCH_PATH = '/research/autonomous-systems-assurance';
const link = (href, label) => `<a class="text-link" href="${href}">${label}</a>`;

// Synthetic examples describe questions under investigation, not a production policy engine.
export const researchScenarios = [
  { action: 'Read a non-sensitive record', context: 'Known identity, permitted read', outcome: 'ALLOW',
    steps: ['A known service identity.', 'Read permission for this record.', 'A synthetic, non-sensitive record.', 'No system state changes.', 'No persistent change to reverse.', 'The source and read scope have been checked independently.', 'The proposed read stays within the permitted scope.'],
    reason: 'In this example, the bounded read may proceed. Permission does not extend to later writes or other records.' },
  { action: 'Modify an access policy', context: 'A consequential permission change', outcome: 'VERIFY',
    steps: ['A known automation identity.', 'Permission to propose a policy change, not approve it.', 'A synthetic service access policy.', 'A change could expand who can reach the service.', 'The prior policy is available for restoration.', 'Confidence from the proposing agent is insufficient; an independent check of the policy difference is missing.', 'Pause execution until the independent check supplies the required evidence.'],
    reason: 'Verify the proposed permission change before making a new decision. A successful check would not automatically authorize execution.' },
  { action: 'Deploy code', context: 'Verified change to a production service', outcome: 'HUMAN AUTHORIZATION',
    steps: ['A known deployment identity.', 'Permission to propose a release.', 'A synthetic production service.', 'The change could interrupt a service people depend on.', 'A tested rollback is available, but disruption would still matter.', 'Independent tests and change review are available.', 'A responsible human must authorize this consequential release.'],
    reason: 'Technical checks provide evidence for a decision. In this example, a named human must authorize the specific action before it proceeds.' },
  { action: 'Change a production database', context: 'Irreversible change outside policy', outcome: 'DENY',
    steps: ['A known maintenance identity.', 'Permission for bounded maintenance only.', 'A synthetic production database.', 'The proposed deletion would remove required records.', 'No verified recovery path exists for the proposed deletion.', 'The proposal conflicts with the stated retention requirement.', 'The action violates an explicit constraint.'],
    reason: 'Do not execute this proposal. A different, permitted approach needs a new review; more confidence alone cannot override the constraint.' },
  { action: 'Deploy code', context: 'Unexpected identity and scope', outcome: 'ISOLATE',
    steps: ['The identity cannot be reliably established.', 'The request claims permissions outside the expected scope.', 'The same synthetic production service.', 'An untrusted actor could change a consequential system.', 'Rollback cannot establish whether the actor is trustworthy.', 'Identity and permission evidence conflict with the request.', 'Contain the activity and require investigation before further actions.'],
    reason: 'Isolate the untrusted activity in this conceptual example. The same deploy action receives a different decision because its context changed.' }
];

const stages = ['Identity', 'Permission', 'Affected resource', 'Consequence', 'Reversibility', 'Verification', 'Policy'];
const scenarioMarkup = researchScenarios.map((scenario, index) => `<details class="assurance-scenario"${index === 0 ? ' open' : ''}>
  <summary><span>${scenario.action}</span><small>${scenario.context}</small></summary>
  <div class="assurance-scenario-body"><ol class="assurance-path" aria-label="Decision path for ${scenario.action}">${stages.map((stage, i) => `<li><h3>${stage}</h3><p>${scenario.steps[i]}</p></li>`).join('')}</ol>
  <div class="assurance-outcome"><p class="eyebrow">CONCEPTUAL OUTCOME</p><h3>${scenario.outcome}</h3><p>${scenario.reason}</p></div></div>
</details>`).join('');

export const researchPages = {
  [RESEARCH_PATH]: {
    title: 'Autonomous Systems Assurance | SozoRock Technology',
    description: 'Emerging applied research into authorization, independent verification, human control and accountability for autonomous systems that can act.',
    body: `<section class="page-intro"><p class="eyebrow">RESEARCH / EMERGING APPLIED RESEARCH</p><h1>Autonomous Systems Assurance</h1><p class="lead">When software can act, what determines whether an action should proceed, be independently verified, require human authorization, be denied, or be isolated?</p></section>
    <article class="editorial-body assurance-introduction"><h2>Control for systems that can act.</h2><p>SozoRock is examining how autonomous systems should be authorized, independently verified and escalated when their actions affect consequential systems. The research starts with a proposed action and the context in which it would take effect.</p><p>This is an emerging applied research direction. It is not a completed commercial product or a deployed security platform.</p></article>
    <section class="section assurance-demo" aria-labelledby="assurance-demo-title"><p class="eyebrow">CONCEPTUAL RESEARCH DEMONSTRATION</p><h2 id="assurance-demo-title">An autonomous action<br>enters a decision path.</h2><p class="assurance-lead">Agent proposes a consequential system change. Before execution, examine its identity, permission, affected resource, consequence, reversibility, verification and policy.</p><p class="assurance-lead">Open the synthetic scenarios below to follow each decision. Compare the two <strong>Deploy code</strong> examples: the proposed action is the same, but the identity and context change the outcome. These examples do not execute actions, connect to systems or evaluate visitor data.</p>
    <div class="assurance-scenarios">${scenarioMarkup}</div><p class="assurance-note">Illustrative reasoning only. These examples are not a validated decision model, security assessment or guarantee of safe execution. Real decisions require evidence, defined authority and controls appropriate to the system.</p></section>
    <article class="editorial-body"><h2>Questions guiding the research</h2><h3>Authorization and human control</h3><p>Which identity and permissions apply to the specific action? When should a responsible human authorize it, and how can that authority remain bounded, visible and revocable?</p><h3>Independent verification and risk</h3><p>What evidence must be checked separately from the agent proposing the action? How should consequences, reversibility and uncertainty affect whether execution can proceed? Confidence is an input to examine, not permission to act.</p><h3>Multi-agent accountability</h3><p>When one agent delegates to another, how should responsibility and permission boundaries be retained? Delegation should not make the responsible actor or the basis for a decision disappear.</p><h3>Evidence and auditability</h3><p>What record is needed to explain the proposed action, the evidence considered, the policy applied, the authorizing actor and the resulting outcome? How can that record support later review without collecting unnecessary sensitive information?</p><h2>Applied work and research</h2><p>Our commercial AI work focuses on practical workflows, evaluation and human review. Our cybersecurity work addresses identity, permissions and operational controls. This research examines further questions raised when systems can initiate actions.</p><div class="related-links">${link('/what-we-do/ai-intelligent-systems', 'AI &amp; Intelligent Systems')}${link('/what-we-do/cybersecurity-identity', 'Cybersecurity &amp; Identity')}${link('/insights', 'Explore Insights')}</div></article>`
  }
};
