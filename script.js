// Simple single-file client-side routing (show/hide sections)
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('nav [data-link]');
function showSection(hash) {
  const id = (hash || '#home').replace('#','');
  pages.forEach(p => p.id === id ? p.classList.remove('hidden') : p.classList.add('hidden'));
  // close mobile menu
  document.getElementById('mobileMenu').classList.add('hidden');
  // update current nav link underline
  navLinks.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#'+id ? 'page' : 'false'));
}
// link clicks
document.querySelectorAll('[data-link]').forEach(a => a.addEventListener('click', (e) => {
  e.preventDefault();
  const target = a.getAttribute('href') || a.dataset.href || a.getAttribute('data-href');
  if (target) {
    history.pushState(null, '', target);
    showSection(target);
  }
}));
window.addEventListener('popstate', ()=> showSection(location.hash || '#home'));
// initial show
showSection(location.hash || '#home');

// mobile menu toggle
const mobileBtn = document.getElementById('mobileBtn');
mobileBtn.addEventListener('click', ()=> {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

// countdown timer to Nov 16, 2025 — runs every second
function updateCountdown(){
  const target = new Date('2025-11-16T09:00:00+08:00');
  const now = new Date();
  const diff = target - now;
  const el = document.getElementById('countdown');
  if (!el) return;
  if (diff <= 0) { el.textContent = 'Event started'; return; }
  const pad = n => String(n).padStart(2,'0');
  const days = Math.floor(diff / (1000*60*60*24));
  const hrs = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
  const secs = Math.floor((diff % (1000*60)) / 1000);
  el.textContent = `${days}d ${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`;
}
updateCountdown(); setInterval(updateCountdown, 1000);

// news ticker sample items
const news = [
  'Opening plenary confirmed: ASEAN climate accord progress report.',
  'Side event: Green Finance Forum — registration open.',
  'Cultural night performers announced: regional troupe lineup.'
];
const newsTicker = document.getElementById('newsTicker');
if (newsTicker) newsTicker.textContent = news.join('  •  ');

// program expand/collapse
document.querySelectorAll('.day-toggle').forEach(btn => {
  btn.addEventListener('click', ()=> {
    const content = btn.nextElementSibling;
    content.classList.toggle('hidden');
  });
});

// gallery lightbox
function openLightbox(src, alt){
  const img = document.getElementById('lightboxImg');
  if (!img) return;
  img.src = src;
  img.alt = alt || 'enlarged image';
  const lb = document.getElementById('lightbox');
  lb.classList.remove('hidden'); lb.classList.add('flex');
}
const closeBtn = document.getElementById('closeLightbox');
if (closeBtn) closeBtn.addEventListener('click', ()=>{
  const lb = document.getElementById('lightbox');
  lb.classList.add('hidden'); lb.classList.remove('flex');
});

document.querySelectorAll('.gallery-thumb').forEach(img => {
  img.addEventListener('click', ()=> openLightbox(img.src, img.alt));
  img.addEventListener('keypress', (e)=> { if (e.key === 'Enter') openLightbox(img.src, img.alt); });
  img.setAttribute('tabindex','0');
  img.setAttribute('role','button');
  img.setAttribute('aria-label','Open image');
});

// accessibility: focus outlines for keyboard users only
(function(){
  function handleFirstTab(e) { if (e.key === 'Tab') document.body.classList.add('user-is-tabbing'); }
  window.addEventListener('keydown', handleFirstTab);
})();