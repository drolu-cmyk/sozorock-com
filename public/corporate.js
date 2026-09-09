(()=>{'use strict';
 const button=document.querySelector('.corporate-menu'),nav=document.querySelector('#corporate-nav');
 if(button&&nav){
  button.hidden=false;
  const close=()=>{button.setAttribute('aria-expanded','false');nav.removeAttribute('data-open');button.textContent='Menu';document.body.style.overflow='';};
  button.addEventListener('click',()=>{if(button.getAttribute('aria-expanded')==='true')close();else{button.setAttribute('aria-expanded','true');button.textContent='Close';nav.setAttribute('data-open','');document.body.style.overflow='hidden';nav.querySelector('a').focus();}});
  document.addEventListener('keydown',e=>{if(button.getAttribute('aria-expanded')!=='true')return;const first=nav.querySelector('a'),last=nav.querySelector('a:last-child');if(e.key==='Escape'){close();button.focus();}if(e.key==='Tab'){if(!e.shiftKey&&document.activeElement===last){e.preventDefault();button.focus();}else if(e.shiftKey&&document.activeElement===first){e.preventDefault();button.focus();}else if(document.activeElement===button){e.preventDefault();(e.shiftKey?last:first).focus();}}});
  window.addEventListener('resize',()=>{if(innerWidth>800)close();});
  document.documentElement.classList.add('has-js');
 }
 // Fragment compatibility cannot be implemented at the server because hashes are not sent.
 if(location.pathname==='/'&&['#programs','#apply','#director'].includes(location.hash)){
  const dest=location.hash==='#apply'?'/school/apply':location.hash==='#director'?'/school/about#director':'/school#programs';
  const target=new URL(dest,location.origin);target.search=location.search;location.replace(target.href);
 }
})();
