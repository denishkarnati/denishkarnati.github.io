(()=>{
'use strict';
const menu=document.querySelector('.folio-menu'),nav=document.getElementById('folio-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav?.classList.toggle('is-open',open);});
nav?.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){nav.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');menu?.focus();}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{let count=0;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.work-case[data-category],.project-card[data-category]').forEach(card=>{const show=button.dataset.filter==='all'||card.dataset.category===button.dataset.filter;card.hidden=!show;if(show)count++;if(show){card.classList.remove('will-reveal');card.classList.add('is-visible');}});const status=document.querySelector('.filter-status');if(status)status.textContent=`${count} project${count===1?'':'s'}`;}));
function openWalkthrough(){if(location.hash==='#walkthrough'){const p=document.getElementById('walkthrough');if(p)p.open=true;}}
openWalkthrough();window.addEventListener('hashchange',openWalkthrough);
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>d.querySelector('summary')?.setAttribute('aria-expanded',String(d.open))));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}},{threshold:.04,rootMargin:'0px 0px 70px 0px'});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});}
})();
