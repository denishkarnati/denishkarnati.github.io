(()=>{'use strict';
if(location.hostname!=='denishkarnati.github.io'||navigator.doNotTrack==='1')return;
fetch('/analytics-config.json',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(c=>{
const endpoint=c?.goatcounterEndpoint;if(!endpoint)return;
let u;try{u=new URL(endpoint);}catch{return;}
if(u.protocol!=='https:'||!u.hostname.endsWith('.goatcounter.com')||u.pathname!=='/count'||u.search||u.hash||u.username||u.password)return;
const s=document.createElement('script');s.async=true;s.src='https://gc.zgo.at/count.js';s.setAttribute('data-goatcounter',endpoint);document.head.appendChild(s);
}).catch(()=>{});
})();