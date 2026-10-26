(()=>{
'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav?.addEventListener('click',event=>{if(event.target.closest('a')){nav.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('is-open')){nav.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');menu?.focus();}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const category=button.dataset.filter;let visible=0;
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelectorAll('.project-card[data-category]').forEach(card=>{const show=category==='all'||card.dataset.category===category;card.hidden=!show;if(show)visible++;});
 const status=document.querySelector('.filter-status');if(status)status.textContent=`${visible} project${visible===1?'':'s'}`;
}));
function revealWalkthrough(){if(location.hash==='#walkthrough'){const panel=document.getElementById('walkthrough');if(panel)panel.open=true;}}
revealWalkthrough();window.addEventListener('hashchange',revealWalkthrough);
document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>detail.querySelector('summary')?.setAttribute('aria-expanded',String(detail.open))));
})();
