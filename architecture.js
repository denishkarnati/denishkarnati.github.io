(()=>{
'use strict';
document.querySelectorAll('.system-blocks').forEach(group=>group.addEventListener('click',event=>{
 const button=event.target.closest('.system-block');if(!button)return;
 group.querySelectorAll('.system-block').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 const panel=group.nextElementSibling;panel.querySelector('strong').textContent=button.querySelector('strong').textContent;panel.querySelector('p').textContent=button.dataset.explain;
}));
})();
