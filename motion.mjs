import {buildDraft} from './vendor/nullmotion/drafts.mjs';
function start(){
 const gsap=window.gsap;if(!gsap)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const card=document.querySelector('.motion-card'),root=document.querySelector('.motion-scene'),viewport=document.querySelector('.motion-viewport'),fallback=document.querySelector('.motion-fallback'),toggle=document.querySelector('[data-motion-toggle]');
 let timeline=null,userPaused=reduced.matches,inView=true;
 const labels=['Hardware / Interfaces','BLE / Host tools','Python / Verification'];
 const beats=[['capture','Acquire.',{label:'Hardware / Interfaces',src:'/images/pressure-hardware-bench.webp',alt:'User-supplied pressure-sensing hardware photograph'}],['capture','Connect.',{label:'BLE / Host tools',src:'/images/ble-live-plot-desktop.webp',alt:'User-supplied BLE console and two-channel plotting screenshot'}],['capture','Inspect.',{label:'Python / Verification',src:'/images/phantom-verification-desktop.webp',alt:'User-supplied phantom verification code screenshot'}]];
 if(card&&root){
  try{
   timeline=buildDraft(root,beats,12,{bg:'#000000'});timeline.repeat(-1);timeline.pause(1.1);fallback.hidden=true;root.style.visibility='visible';toggle.hidden=false;
   const fit=()=>{root.style.transform=`scale(${viewport.clientWidth/640})`;};new ResizeObserver(fit).observe(viewport);fit();
   let stage=-1;timeline.eventCallback('onUpdate',()=>{const next=Math.min(2,Math.floor(timeline.time()/4));if(next!==stage){stage=next;card.querySelector('[data-motion-label]').textContent=labels[next];card.querySelectorAll('.motion-dots i').forEach((dot,i)=>dot.classList.toggle('active',i===next));}});
   const sync=()=>{const active=!userPaused&&inView&&!document.hidden;if(active)timeline.play();else timeline.pause();toggle.textContent=userPaused?'Play motion':'Pause motion';};
   toggle.addEventListener('click',()=>{userPaused=!userPaused;sync();});
   new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.15}).observe(card);
   document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',event=>{userPaused=event.matches;sync();});sync();
  }catch{if(timeline)timeline.kill();root.style.visibility='hidden';fallback.hidden=false;toggle.hidden=true;}
 }
 if(!reduced.matches){
  gsap.fromTo('.focus-hero-copy>*',{y:17,opacity:.55},{y:0,opacity:1,duration:.8,stagger:.075,ease:'power3.out',clearProps:'transform,opacity'});
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){gsap.fromTo(entry.target,{y:17,opacity:.6},{y:0,opacity:1,duration:.7,ease:'power3.out',clearProps:'transform,opacity'});observer.unobserve(entry.target);}},{threshold:.08});
  document.querySelectorAll('.focus-project,.focus-section-head,.bench-card,.focus-about>div,.focus-note-list').forEach(node=>observer.observe(node));
 }
 const bar=document.querySelector('.reading-progress');let queued=false;
 const update=()=>{queued=false;const range=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${range>0?scrollY/range:0})`;document.body.classList.toggle('has-scrolled',scrollY>40);};
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();
}
if(document.readyState==='complete')start();else addEventListener('load',start,{once:true});
