(() => {
  'use strict';
  const root = document.querySelector('[data-cbcap]');
  if (!root) return;
  const find = name => root.querySelector(`[data-${name}]`);
  const status = find('status');
  status.textContent = 'Loading county selection. The Albany County snapshot remains available.';
  const fmt = n => Number.isFinite(n) ? n.toFixed(1) : null;
  const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const labels = {transport: 'Transportation barriers', uninsured: 'Adults without health insurance', diabetes: 'Diagnosed diabetes'};
  const population = key => key === 'uninsured' ? 'Adults aged 18 to 64' : 'Adults aged 18 and older';
  const interval = d => Number.isFinite(d[1]) && Number.isFinite(d[2]) ? `95% confidence interval: ${fmt(d[1])}% to ${fmt(d[2])}%` : 'Confidence interval unavailable';
  const number = d => Number.isFinite(d[0]) ? `<p class="number">${fmt(d[0])}<small>%</small></p>` : '<p class="missing-estimate">Estimate unavailable</p>';
  fetch('/assets/data/cbcap-counties-2025.json', {credentials: 'omit'})
    .then(response => { if (!response.ok) throw new Error('Unavailable'); return response.json(); })
    .then(data => {
      if (!Array.isArray(data) || !data.length || !data.every(c => /^\d{5}$/.test(c.fips) && c.state && c.county && Object.keys(labels).every(k => Array.isArray(c[k]) && c[k].length === 3))) throw new Error('Invalid data');
      const state = find('state'), county = find('county'), measure = find('measure'), result = find('result');
      let step = 'explore', comparison = '36091';
      const options = (rows, value) => rows.map(c => `<option value="${c.fips}"${c.fips === value ? ' selected' : ''}>${escape(c.county)}</option>`).join('');
      const states = [...new Set(data.map(c => c.state))].sort();
      state.innerHTML = states.map(s => `<option${s === 'New York' ? ' selected' : ''}>${escape(s)}</option>`).join('');
      function setCounties(preferred) {
        const rows = data.filter(c => c.state === state.value).sort((a,b) => a.county.localeCompare(b.county));
        county.innerHTML = options(rows, preferred);
        render();
      }
      function render() {
        const c = data.find(c => c.fips === county.value), key = measure.value, d = c[key];
        const peers = data.filter(p => p.state === c.state && p.fips !== c.fips).sort((a,b) => a.county.localeCompare(b.county));
        if (!peers.some(p => p.fips === comparison)) comparison = peers[0]?.fips;
        if (step === 'explore') {
          result.innerHTML = `<div class="reading"><div><p class="place-label">${escape(c.county)}, ${escape(c.state)}</p>${number(d)}<p class="ci">${interval(d)}</p></div><div><h3>${labels[key]}</h3><p>${population(key)}</p><p>County FIPS ${c.fips} · Model-based estimate</p></div></div>`;
        } else if (step === 'compare') {
          if (!peers.length) { result.innerHTML = '<p>This geography has no second county to compare. Choose another state to compare counties within that state.</p>'; return; }
          const other = peers.find(p => p.fips === comparison);
          result.innerHTML = `<div class="compare-reading"><div><p class="place-label">${escape(c.county)}</p>${number(d)}<p>${interval(d)}</p></div><div><label>Compare with<select data-comparison>${options(peers, comparison)}</select></label>${number(other[key])}<p>${interval(other[key])}</p></div></div><p class="compare-note">${labels[key]} · ${population(key)}. Differences between estimates do not establish statistical significance or causation.</p>`;
          find('comparison').addEventListener('change', event => { comparison = event.target.value; render(); find('comparison').focus(); });
        } else {
          result.innerHTML = `<dl class="source-trace"><div><dt>Publisher / dataset</dt><dd><a href="https://data.cdc.gov/500-Cities-Places/PLACES-County-Data-GIS-Friendly-Format-2025-releas/i46a-9kgh">CDC PLACES, 2025 county release</a></dd></div><div><dt>Selected geography</dt><dd>${escape(c.county)}, ${escape(c.state)} · FIPS ${c.fips}</dd></div><div><dt>Measure / population</dt><dd>${labels[key]} · ${population(key)}</dd></div><div><dt>Release / underlying years</dt><dd>December 4, 2025<br>BRFSS 2023/2022; Census 2023; ACS 2019 to 2023/2018 to 2022</dd></div><div><dt>Estimate / uncertainty</dt><dd>${fmt(d[0]) === null ? 'Estimate unavailable' : fmt(d[0]) + '%'} · ${interval(d)}</dd></div><div><dt>Interpretation</dt><dd>County-level model-based estimates. Not individual diagnoses, current service counts or evidence of causation.</dd></div></dl>`;
        }
      }
      state.addEventListener('change', () => setCounties());
      county.addEventListener('change', render);
      measure.addEventListener('change', render);
      root.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
        step = button.dataset.step;
        root.querySelectorAll('[data-step]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        render();
      }));
      setCounties('36001');
      find('tools').hidden = false; find('steps').hidden = false; status.hidden = true;
    })
    .catch(() => { status.textContent = 'County selection could not load. The Albany County snapshot and source details remain available. Reload this page to try again.'; });
})();
