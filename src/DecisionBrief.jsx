import React,{useId,useRef,useState} from 'react';
import {calculateBrief,briefText,assumptions} from './decision-brief.mjs';

export default function DecisionBrief({currency='CAD'}) {
  const id=useId(), form=useRef(null), resultRef=useRef(null), errorRef=useRef(null);
  const [result,setResult]=useState(null),[error,setError]=useState('');
  const fmt=n=>n.toLocaleString('en',{maximumFractionDigits:2});
  const field=(name,label,props={})=><label key={name} htmlFor={`${id}-${name}`}>{label}<input id={`${id}-${name}`} name={name} required autoComplete="off" maxLength={120} {...props}/></label>;
  function calculate(event) {
    event.preventDefault();
    try {setResult(calculateBrief(Object.fromEntries(new FormData(form.current)),currency));setError('');requestAnimationFrame(()=>resultRef.current?.focus());}
    catch(e){setResult(null);setError(e.message);requestAnimationFrame(()=>errorRef.current?.focus());}
  }
  function download() {
    const url=URL.createObjectURL(new Blob([briefText(result)],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='cb-cap-decision-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <section className="decision-brief" id="decision-brief" aria-labelledby={`${id}-title`}>
    <header><p className="eyebrow">FROM EVIDENCE TO A DECISION</p><h2 id={`${id}-title`}>Build a service capacity brief.</h2><p>Use your own aggregate figures to compare one capacity change, its operating cost and the result your team will review.</p></header>
    <p className="decision-privacy">Enter public or approved aggregate information only. Use a team or role for accountability; do not enter names, contact details or patient records. Entries are processed in your browser and are not sent to SozoRock. Use Clear entries when finished, or download a brief to retain it.</p>
    <form ref={form} onSubmit={calculate} onChange={()=>{setResult(null);setError('');}}>
      <fieldset><legend>1. Define the evidence</legend><div className="decision-fields">
        {field('service','Service being planned',{placeholder:'e.g. community transport trips'})}
        {field('area','Operating area',{maxLength:160,placeholder:'Use your actual service boundary'})}
        {field('source','Source and reporting period',{maxLength:300,placeholder:'e.g. published monthly service report, July 2026'})}
        {field('sourceDate','Source as of',{type:'date'})}
      </div><p>Use the same service definition, area and monthly period for demand and capacity. The sample map is separate from your calculations.</p></fieldset>
      <fieldset><legend>2. Compare capacity and cost</legend><div className="decision-fields">
        {field('demand','Monthly service requests',{type:'number',min:0,max:1e9,step:'any',inputMode:'decimal'})}
        {field('capacity','Current capacity (requests/month)',{type:'number',min:0,max:1e9,step:'any',inputMode:'decimal'})}
        {field('added','Proposed added capacity (requests/month)',{type:'number',min:0,max:1e9,step:'any',inputMode:'decimal'})}
        {field('cost',`Additional operating cost (${currency}/month)`,{type:'number',min:0,max:1e9,step:'any',inputMode:'decimal'})}
        {field('months','Planning period (months)',{type:'number',min:1,max:36,step:1,inputMode:'numeric'})}
      </div></fieldset>
      <fieldset><legend>3. Assign the review</legend><div className="decision-fields">
        {field('owner','Accountable team or role',{placeholder:'e.g. service planning team'})}
        {field('outcome','Outcome measure',{maxLength:200,placeholder:'e.g. completed transport requests per month'})}
        {field('target','Target to assess at review',{placeholder:'e.g. 120 completed requests per month'})}
        {field('reviewDate','Review date',{type:'date'})}
      </div></fieldset>
      {error&&<p className="decision-error" role="alert" tabIndex={-1} ref={errorRef}>{error}</p>}
      <div className="decision-actions"><button className="primary" type="submit">Calculate decision brief</button><button className="text-link" type="reset" onClick={()=>{setResult(null);setError('');}}>Clear entries</button></div>
    </form>
    {result&&<section className="decision-result" ref={resultRef} tabIndex={-1} aria-labelledby={`${id}-result`}>
      <p className="eyebrow">YOUR INPUTS · CONDITIONAL CALCULATION</p><h3 id={`${id}-result`}>Capacity and budget comparison</h3>
      <dl className="decision-metrics"><div><dt>Current capacity gap</dt><dd>{fmt(result.currentGap)}<small> requests/month</small></dd></div><div><dt>Planned capacity gap</dt><dd>{fmt(result.plannedGap)}<small> requests/month</small></dd></div><div><dt>Additional operating budget</dt><dd>{currency} {fmt(result.totalCost)}<small> over {result.inputs.months} months</small></dd></div></dl>
      <p>Added capacity applicable to the current gap: <strong>{fmt(result.capacityApplied)} requests/month</strong>. Operating cost per additional request capacity: <strong>{result.costPerRequest===null?'not applicable (no gap reduction)':`${currency} ${fmt(result.costPerRequest)}`}</strong>.</p>
      <p>This calculates capacity under your assumptions. It does not establish that requests will be completed or that health outcomes will improve.</p>
      <button className="primary" type="button" onClick={download}>Download decision brief</button>
      <details><summary>Read or copy the full brief</summary><label htmlFor={`${id}-export`}>Decision brief<textarea id={`${id}-export`} readOnly rows={15} value={briefText(result)}/></label></details>
    </section>}
    <details className="decision-method"><summary>Method and assumptions</summary><p>Current gap = the greater of monthly requests minus current capacity, or zero. Planned gap also subtracts proposed added capacity. The budget multiplies additional monthly cost by the planning period. Unit cost divides monthly cost by added capacity applicable to the current gap.</p><ul>{assumptions.map(a=><li key={a}>{a}</li>)}</ul><p>Source quality, local constraints and the review target remain your team's responsibility. Keep the source date and outcome review attached when sharing a brief.</p></details>
  </section>;
}
