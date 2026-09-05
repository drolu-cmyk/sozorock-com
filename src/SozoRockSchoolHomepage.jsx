import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Check, ShieldCheck, Workflow, KeyRound, Scale, ChevronDown } from 'lucide-react';
import './sozorockschool.css';
import './market.css';
import {HeroMedia} from './HeroMedia.jsx';
import {SiteFooter} from './SiteFooter.jsx';
const programs = [{
  id: 'ai',
  name: 'Applied AI Systems',
  title: 'Make AI useful beyond the prompt.',
  description: 'Explore how an idea becomes a dependable workflow. Connect the steps, test the output, and keep a person in charge of the decisions that matter.',
  feedback: 'A review before an external action lets a person verify the result before it affects someone. The right checkpoint also depends on the impact of the task.',
  task: 'An AI assistant drafts a reply to a customer. Choose where a person should review it.',
  icon: Workflow,
  artifact: 'A workflow you can explain',
  learn: ['Define a useful problem', 'Connect inputs, tools and decisions', 'Evaluate failures and human oversight']
}, {
  id: 'grc',
  name: 'Cybersecurity GRC',
  title: 'Turn risk into a decision.',
  description: 'Move from a list of controls to a defensible recommendation. Ask for evidence, weigh the consequences, and make the trade-offs visible.',
  feedback: 'Evidence of access controls helps you assess who can reach the data and how that access is reviewed. A claim becomes useful when you can test it.',
  task: 'A new vendor will handle customer data. Your team needs a recommendation before signing.',
  icon: ShieldCheck,
  artifact: 'A risk recommendation with evidence',
  learn: ['Frame risk in business terms', 'Evaluate control evidence', 'Explain a practical response']
}, {
  id: 'iam',
  name: 'Identity & Access Management',
  title: 'Give access a reason.',
  description: 'Follow an identity from arrival to departure. Explore how the right permissions protect the organization while letting people do their work.',
  feedback: 'Time-limited, read-only access matches this task. Confirm the project owner’s approval and remove access when the assignment ends.',
  task: 'A contractor needs to read one project’s documents for a 30-day assignment.',
  icon: KeyRound,
  artifact: 'An access decision you can defend',
  learn: ['Map identities to responsibilities', 'Apply least privilege', 'Plan reviews and offboarding']
}, {
  id: 'governance',
  name: 'AI Governance',
  title: 'Decide what AI is allowed to do.',
  description: 'Make accountability part of the design. Examine who an AI system affects, what evidence a release needs, and when to pause.',
  feedback: 'Pause and evaluate the system across the people it will affect. Assign an accountable owner and define review and appeal routes before considering release.',
  task: 'A hiring tool performs well overall, but its evaluation does not cover all applicant groups.',
  icon: Scale,
  artifact: 'A documented release decision',
  learn: ['Identify affected people', 'Define evaluation and oversight', 'Document accountable decisions']
}];
function Artifact({
  program: p
}) {
  return <div className={`artifact artifact-${p.id}`}>{p.id === 'ai' ? <><span className="artifact-kicker">A workflow with a checkpoint</span><div className="flow-block">Customer request</div><div className="flow-line" /><div className="flow-block model">AI drafts a response</div><div className="flow-line" /><div className="flow-split"><span>Human review</span><span>Revise</span></div><div className="flow-line" /><div className="flow-block">Approved reply</div></> : p.id === 'grc' ? <><div className="dossier-back" /><div className="dossier"><ShieldCheck size={30} /><span className="artifact-kicker">Vendor review</span><h4>Claims need<br />evidence.</h4><div>Access policy <Check size={17} /></div><div>Review history <Check size={17} /></div><div>Open questions <span>2</span></div><p>Evidence → judgment → action</p></div></> : p.id === 'iam' ? <><span className="artifact-kicker">Permission by purpose</span><div className="identity"><KeyRound /><span>Project contractor<small>30-day assignment</small></span></div><div className="permission-row"><span>Project documents</span><strong>Read</strong></div><div className="permission-row"><span>Billing records</span><span>No access</span></div><div className="permission-row"><span>Administration</span><span>No access</span></div><div className="expiry">Access expires with the task</div></> : <><Scale size={42} /><span className="artifact-kicker">A decision before deployment</span><h4>Ready is a<br />responsibility.</h4><div className="release-line"><span>Impact</span><span>Evidence</span><span>Owner</span></div><div className="release-stamp">Review before release</div></>}</div>;
}
function Practice({
  program: p,
  focusRequest
}) {
  const [choice, setChoice] = useState(null),
    [evidence, setEvidence] = useState(false),
    [access, setAccess] = useState('none'),
    [expiry, setExpiry] = useState('permanent'),
    [checks, setChecks] = useState([]);
  const heading = useRef(null);
  useEffect(() => {
    if (focusRequest && heading.current) {
      heading.current.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'center'
      });
      heading.current.focus({
        preventScroll: true
      });
    }
  }, [focusRequest]);
  const response = p.id === 'iam' ? access === 'read' && expiry === '30' ? 'This scope matches the task. Confirm owner approval and remove access when the assignment ends.' : 'Match the permission to the task: read-only project access, expiring after 30 days.' : p.feedback;
  return <div className="practice" style={{
    '--accent': `var(--${p.id})`
  }}><div className="practice-top"><p>Try a practice decision</p><p>Illustrative scenario</p></div><h3 ref={heading} tabIndex={-1}>{p.task}</h3>
 {p.id === 'ai' && <fieldset><legend>Place a human checkpoint in the workflow.</legend><div className="checkpoint-flow">{['Request received', 'Draft prepared', 'Reply sent'].map((step, i) => <div key={step}><span>{step}</span>{i < 2 && <button onClick={() => setChoice(i)} aria-pressed={choice === i}>{choice === i ? <Check size={18} /> : <span>+</span>} Review here</button>}</div>)}</div></fieldset>}
 {p.id === 'grc' && <><button className="evidence-toggle" aria-expanded={evidence} onClick={() => setEvidence(!evidence)}>Inspect the vendor’s evidence <ChevronDown size={18} /></button>{evidence && <div className="evidence-paper"><strong>Evidence provided</strong><p>Access policy: supplied.<br />Latest access review: missing.<br />Named control owner: not identified.</p></div>}<fieldset><legend>What would you recommend?</legend>{['Approve on the policy alone', 'Request the review record and owner'].map((c, i) => <button key={c} disabled={!evidence} aria-pressed={choice === i} onClick={() => setChoice(i)}>{c}<ArrowUpRight size={18} /></button>)}</fieldset>{!evidence && <p className="interaction-hint">Inspect the evidence to make your recommendation.</p>}</>}
 {p.id === 'iam' && <><div className="access-config"><label>Project permission<select value={access} onChange={e => {
            setAccess(e.target.value);
            setChoice(null);
          }}><option value="none">No access</option><option value="read">Read only</option><option value="admin">Administrator</option></select></label><label>Access expires<select value={expiry} onChange={e => {
            setExpiry(e.target.value);
            setChoice(null);
          }}><option value="permanent">No expiry</option><option value="30">After 30 days</option></select></label></div><button className="evaluate" onClick={() => setChoice(1)}>Check this access decision <ArrowRight size={18} /></button></>}
 {p.id === 'governance' && <><fieldset><legend>Build the review required before a release decision.</legend>{['Evaluate performance across applicant groups', 'Assign an accountable owner', 'Define a human review and appeal route'].map((c, i) => <label className="review-check" key={c}><input type="checkbox" checked={checks.includes(i)} onChange={() => {
            setChecks(checks.includes(i) ? checks.filter(x => x !== i) : [...checks, i]);
            setChoice(null);
          }} />{c}</label>)}</fieldset><button className="evaluate" onClick={() => setChoice(1)}>Review readiness <ArrowRight size={18} /></button></>}
 <div className="feedback" role="status">{choice !== null && (p.id === 'governance' ? <><strong>{checks.length === 3 ? 'Review plan assembled.' : 'The review plan has gaps.'}</strong> {checks.length === 3 ? 'These checks prepare the review; they do not establish that the system is safe to release. Gather and assess the evidence before deciding.' : 'Consider evaluation coverage, accountability, and a route for people to challenge a decision.'}</> : <><strong>{p.id === 'iam' ? 'Check the scope.' : choice === 1 ? 'A considered choice.' : 'Reconsider the timing or evidence.'}</strong> {p.id === 'grc' ? 'A policy describes intent. Request the review record and a named owner to assess whether the control operates in practice.' : response}</>)}</div></div>;
}
export function SozoRockSchoolHomepage() {
  const [active, setActive] = useState('ai');
  const [focusRequest, setFocusRequest] = useState(0);

  const p = programs.find(p => p.id === active);
  return <><a className="skip" href="#courses">Skip to programs</a><section className="hero"><HeroMedia/><div className="hero-shade" /><header><a href="#" className="brand" aria-label="SozoRock School home">SozoRock<span>School</span></a><nav aria-label="Main navigation"><a href="#courses">Programs</a><a href="#experience">How you learn</a><a href="/organizations.html">For organizations</a></nav><a className="button light header-cta" href="#courses">Find your program <ArrowUpRight size={18} /></a></header><div className="hero-copy"><h1>Learn it.<br />Put it to work.</h1><p>Build your judgment in AI systems,<br className="desktop-break" /> cybersecurity and AI governance.</p><div className="hero-actions"><a className="button light" href="#courses">Explore the programs <ArrowUpRight size={20} /></a><a className="text-link" href="#director">Meet the director <ArrowRight size={18} /></a></div></div><div className="hero-foot"><span>Four disciplines. Work that matters.</span><a href="#courses" aria-label="Discover the programs"><ChevronDown /></a></div></section>
 <section id="courses" className="section explorer"><div className="section-heading"><h2>Start with the decisions<br />you want to make.</h2><p>Start with the kind of problem you want to solve.<br />Try a decision. Find a direction.</p></div><div className="explorer-grid"><div className="program-picker" aria-label="Choose a program">{programs.map(item => <button key={item.id} className={active === item.id ? 'active' : ''} aria-pressed={active === item.id} onClick={() => {
            setActive(item.id);
            setFocusRequest(0);
          }}><item.icon size={22} /><span>{item.name}</span><ArrowUpRight size={22} /></button>)}<a className="small-link" href={`#program-${p.id}`}>Explore {p.name} <ArrowRight size={18} /></a></div><Practice key={p.id} program={p} focusRequest={focusRequest} /></div></section>
 <section className="section program-stories">{programs.map((item, i) => <article id={`program-${item.id}`} className={`program-story ${item.id}`} key={item.id}><div className="story-copy"><p className="program-name">{item.name}</p><h3>{item.title}</h3><p>{item.description}</p><details><summary>What you’ll explore <span>+</span></summary><ul>{item.learn.map(l => <li key={l}>{l}</li>)}</ul></details><button className="text-link" onClick={() => {
            setActive(item.id);
            setFocusRequest(n => n + 1);
          }}>Try an {item.id === 'iam' ? 'access' : item.id === 'grc' ? 'evidence' : item.id === 'ai' ? 'AI workflow' : 'AI release'} decision <ArrowUpRight size={20} /></button></div><div className={`program-art art-${item.id}`}><Artifact program={item} /></div></article>)}</section>
 <section id="experience" className="journey section"><h2>A skill becomes yours<br />when you can use it.</h2><p className="journey-intro">Work through a problem. Make choices. Understand why they matter.</p><div className="journey-steps">{[['Understand the brief', 'Identify the problem, the people involved and the constraints.'], ['Build a response', 'Turn the idea into a workflow, analysis or decision.'], ['Test your choices', 'Look for weak evidence, failure modes and unintended effects.'], ['Explain the result', 'Make your reasoning clear enough for someone else to examine.']].map(([title, copy], i) => <div key={title}><span className="step-number">{i + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
 <section id="director" className="section director"><img src="/media/director.webp" alt="Dr. Oluwabiyi Adeyemo" width="400" height="500" loading="lazy"/><div><h2>Learning with a<br/>clear standard.</h2><p className="director-name">Dr. Oluwabiyi Adeyemo</p><p>Director of Learning, AI &amp; Cybersecurity</p><p>Our focus is the reasoning behind the result: how you define a problem, test an approach and explain your decisions.</p><a className="text-link" href="/about.html">Meet the director <ArrowUpRight size={20}/></a></div></section><section id="outcomes" className="section outcomes"><h2>More than an answer.<br />A reason behind it.</h2><div><p>Technology changes. The ability to investigate a problem, test a solution and explain a decision travels with you.</p><p>Explore the program that matches the work you want to understand. These practice examples introduce the subject; they are not assessments or credential awards.</p><a href="#courses" className="text-link">Explore the four disciplines <ArrowUpRight size={20} /></a></div></section><section id="apply" className="section admissions"><div><h2>Make a more informed<br />next move.</h2><p>Take a closer look at the work before choosing your path.</p></div><div><a className="button dark" href="#courses">Explore your program <ArrowUpRight size={20} /></a><p className="availability">Online applications are not available yet.<br />Program dates and admissions details will be published here when confirmed.</p></div></section><SiteFooter/></>;
}
