(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('.primary-nav');
  const toggle = header?.querySelector('.menu-toggle');
  if (!header || !nav || !toggle) return;
  const mobile = window.matchMedia('(max-width: 860px)');
  const setOpen = (open, restoreFocus = false) => {
    nav.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.textContent = open ? 'Close' : 'Menu';
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', event => {
    if (!mobile.matches || !nav.hasAttribute('data-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false, true); }
    const first = nav.querySelector('a');
    if (event.key === 'Tab' && !event.shiftKey && document.activeElement === toggle) {
      event.preventDefault(); first?.focus();
    } else if (event.key === 'Tab' && event.shiftKey && document.activeElement === first) {
      event.preventDefault(); toggle.focus();
    }
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('click', event => {
    if (!header.contains(event.target) && nav.hasAttribute('data-open')) setOpen(false);
  });
  header.addEventListener('focusout', () => {
    queueMicrotask(() => { if (!header.contains(document.activeElement)) setOpen(false); });
  });
  mobile.addEventListener('change', () => setOpen(false));
  header.classList.add('nav-ready');
})();
