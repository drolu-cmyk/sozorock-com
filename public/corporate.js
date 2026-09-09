(()=>{'use strict';
 const button=document.querySelector('.corporate-menu'),nav=document.querySelector('#corporate-nav');
 if(button&&nav){
  button.hidden=false;
  const close=()=>{button.setAttribute('aria-expanded','false');nav.removeAttribute('data-open');button.textContent='Menu';document.body.style.overflow='';};
  const controls=()=>[...nav.querySelectorAll('a,summary')].filter(el=>el.getClientRects().length);
  button.addEventListener('click',()=>{if(button.getAttribute('aria-expanded')==='true')close();else{button.setAttribute('aria-expanded','true');button.textContent='Close';nav.setAttribute('data-open','');document.body.style.overflow='hidden';controls()[0]?.focus();}});
  document.addEventListener('keydown',e=>{if(button.getAttribute('aria-expanded')!=='true')return;const items=controls(),first=items[0],last=items.at(-1);if(e.key==='Escape'){close();button.focus();}if(e.key==='Tab'){if(!e.shiftKey&&document.activeElement===last){e.preventDefault();button.focus()}else if(e.shiftKey&&document.activeElement===first){e.preventDefault();button.focus()}else if(document.activeElement===button){e.preventDefault();(e.shiftKey?last:first)?.focus()}}});
  window.addEventListener('resize',()=>{if(innerWidth>960)close()});
  document.documentElement.classList.add('has-js');
  for(const a of nav.querySelectorAll('a'))if(new URL(a.href).pathname===location.pathname)a.setAttribute('aria-current','page');
  for(const detail of nav.querySelectorAll('details'))detail.addEventListener('toggle',()=>{if(detail.open)for(const other of nav.querySelectorAll('details'))if(other!==detail)other.open=false});
  document.addEventListener('click',e=>{if(!nav.contains(e.target))for(const d of nav.querySelectorAll('details'))d.open=false});
 }
 for(const select of document.querySelectorAll('[data-section-select]'))select.addEventListener('change',()=>document.getElementById(select.value)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
 if(location.pathname==='/'&&['#programs','#apply','#director'].includes(location.hash)){
  const dest=location.hash==='#apply'?'/school/apply':location.hash==='#director'?'/school/about#director':'/school#programs';const target=new URL(dest,location.origin);target.search=location.search;location.replace(target.href);
 }
})();
