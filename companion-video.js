(()=>{
'use strict';const video=document.querySelector('.companion-video');if(!video)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),toggle=document.querySelector('[data-companion-toggle]'),full=document.querySelector('[data-companion-fullscreen]'),label=document.querySelector('[data-companion-state]'),progress=document.querySelector('[data-companion-progress]');
let manualPause=reduced.matches,inView=false;
video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;
if(toggle){toggle.hidden=false;full.hidden=false;video.controls=false;}
function update(){if(toggle){toggle.textContent=video.paused?'Play':'Pause';toggle.setAttribute('aria-label',video.paused?'Play companion animation':'Pause companion animation');}if(label)label.textContent=video.paused?'DESKTOP COMPANION / PAUSED':'DESKTOP COMPANION / PLAYING';}
function sync(){if(!manualPause&&inView&&!document.hidden){video.play().then(update).catch(update);}else{video.pause();update();}}
if(reduced.matches){video.removeAttribute('autoplay');video.pause();}else{video.autoplay=true;}
new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.12}).observe(video);
toggle?.addEventListener('click',()=>{manualPause=!video.paused;if(manualPause){video.pause();}else{video.play().catch(update);}update();});
full?.addEventListener('click',()=>{if(video.requestFullscreen)video.requestFullscreen().catch(()=>{});else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();});
video.addEventListener('play',update);video.addEventListener('pause',update);video.addEventListener('timeupdate',()=>{if(progress)progress.style.width=(video.duration?video.currentTime/video.duration*100:0)+'%';});document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',e=>{manualPause=e.matches;sync();});update();
})();
