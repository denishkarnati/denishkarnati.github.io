(()=>{
'use strict';
const dialog=document.querySelector('.bench-dialog');if(!dialog)return;
const triggers=[...document.querySelectorAll('.bench-open')],image=dialog.querySelector('.bench-dialog-image img'),description=dialog.querySelector('[data-bench-description]');
let index=0,opener=null,oldOverflow='';
const tools=dialog.querySelector('.bench-dialog-toolbar');const wrap=document.createElement('div');wrap.className='bench-dialog-tools';const actual=document.createElement('button');actual.type='button';actual.textContent='Actual size';actual.setAttribute('aria-pressed','false');wrap.append(actual);wrap.append(dialog.querySelector('[data-bench-close]'));tools.append(wrap);
function show(i){index=(i+triggers.length)%triggers.length;const button=triggers[index];image.src=button.dataset.benchSrc;image.alt=button.querySelector('img').alt;description.textContent=(index+1)+' / '+triggers.length+' — '+button.dataset.benchCaption;dialog.classList.remove('is-actual');actual.setAttribute('aria-pressed','false');actual.textContent='Actual size';dialog.querySelector('.bench-dialog-image').scrollTop=0;dialog.querySelector('.bench-dialog-image').scrollLeft=0;}
triggers.forEach((button,i)=>button.addEventListener('click',()=>{opener=button;show(i);oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('[data-bench-close]').focus();}));
dialog.querySelector('[data-bench-close]').addEventListener('click',()=>dialog.close());
dialog.querySelector('[data-bench-prev]').addEventListener('click',()=>show(index-1));dialog.querySelector('[data-bench-next]').addEventListener('click',()=>show(index+1));
actual.addEventListener('click',()=>{const on=dialog.classList.toggle('is-actual');actual.setAttribute('aria-pressed',String(on));actual.textContent=on?'Fit to view':'Actual size';});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(index+1);}if(event.key==='ArrowLeft'){event.preventDefault();show(index-1);}});
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;opener?.focus();});
})();
