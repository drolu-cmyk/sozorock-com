// Deterministic capacity arithmetic. No inference from the public sample map.
export const assumptions = [
  'Demand stays constant over the planning period; no backlog, seasonality or population growth is modeled.',
  'Demand and capacity use the same service, area, monthly period and definition of a request. Requests are not unique people.',
  'All added capacity is usable. Staffing, transport, eligibility and other constraints must be checked separately.',
  'Costs are incremental operating costs only; existing costs, one-time setup costs and wider savings are excluded.',
  'Results are conditional arithmetic, not a demand forecast, clinical assessment or evidence of intervention effectiveness.'
];
const numbers = {demand:'Monthly service requests',capacity:'Current monthly capacity',added:'Added monthly capacity',cost:'Additional monthly operating cost',months:'Planning period'};
const requiredText = {area:160,service:120,source:300,sourceDate:10,owner:120,outcome:200,target:120,reviewDate:10};
export function calculateBrief(input, currency='CAD') {
  if (!['CAD','USD'].includes(currency)) throw Error('Choose a supported currency.');
  const data = {};
  for (const [key,label] of Object.entries(numbers)) {
    const raw = String(input[key] ?? '').trim();
    if (!/^\d+(?:\.\d+)?$/.test(raw)) throw Error(`${label}: enter a number of zero or more.`);
    data[key] = Number(raw);
    if (!Number.isFinite(data[key]) || data[key] > 1e9) throw Error(`${label}: the value is outside the supported range.`);
  }
  if (!Number.isInteger(data.months) || data.months < 1 || data.months > 36) throw Error('Choose a planning period from 1 to 36 whole months.');
  for (const [key,limit] of Object.entries(requiredText)) {
    data[key] = String(input[key] ?? '').trim();
    if (!data[key] || data[key].length > limit || /[\u0000-\u001f\u007f]/.test(data[key])) throw Error('Complete the source, service area, accountability and review fields within their stated limits.');
  }
  for (const key of ['sourceDate','reviewDate']) {
    const value=data[key];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0,10)!==value) throw Error('Enter valid source and review dates.');
  }
  if (data.reviewDate < data.sourceDate) throw Error('The review date must be on or after the source date.');
  const currentGap=Math.max(0,data.demand-data.capacity);
  const plannedGap=Math.max(0,data.demand-data.capacity-data.added);
  const capacityApplied=currentGap-plannedGap;
  const costPerRequest=capacityApplied>0?data.cost/capacityApplied:null;
  if (costPerRequest!==null && !Number.isFinite(costPerRequest)) throw Error('The unit cost is outside the supported range. Check demand and capacity values.');
  return {version:1,currency,inputs:data,currentGap,plannedGap,capacityApplied,totalCost:data.cost*data.months,costPerRequest,assumptions:[...assumptions]};
}
export function briefText(brief) {
  const b=brief.inputs, fmt=n=>Number(n).toLocaleString('en',{maximumFractionDigits:2}), money=n=>`${brief.currency} ${fmt(n)}`;
  return [
    'CB-CAP | Service capacity decision brief',
    'User-supplied aggregate inputs · not independently verified',
    '',`Service: ${b.service}`,`Operating area: ${b.area}`,`Source and reporting period: ${b.source}`,`Source as of: ${b.sourceDate}`,
    '',`Monthly service requests: ${fmt(b.demand)}`,`Current monthly capacity: ${fmt(b.capacity)}`,`Proposed added monthly capacity: ${fmt(b.added)}`,
    `Current monthly capacity gap: ${fmt(brief.currentGap)} requests`,`Planned monthly capacity gap: ${fmt(brief.plannedGap)} requests`,`Added capacity applicable to current gap: ${fmt(brief.capacityApplied)} requests/month`,
    `Additional monthly operating cost: ${money(b.cost)}`,`Planning period: ${b.months} months`,`Additional operating budget: ${money(brief.totalCost)}`,
    `Operating cost per additional request capacity: ${brief.costPerRequest===null?'Not applicable: no reduction in the current capacity gap':money(brief.costPerRequest)}`,
    '',`Accountable team or role: ${b.owner}`,`Outcome measure: ${b.outcome}`,`Review target: ${b.target}`,`Review date: ${b.reviewDate}`,
    '', 'Method: current gap = max(requests − current capacity, 0); planned gap = max(requests − current capacity − added capacity, 0). Budget = monthly cost × months. Unit cost = monthly cost ÷ added capacity applicable to the current gap.',
    '', 'Assumptions to review:', ...brief.assumptions.map(a=>`• ${a}`),
    '', 'Decision status: draft for human review. Agree on delivery constraints and data quality before approving resources. Compare observed outcomes with the target at the review date.'
  ].join('\n');
}
