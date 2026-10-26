(()=>{
'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const states=[];
const bounded=(v,min,max)=>Math.max(min,Math.min(max,Number(v)||0));
document.querySelectorAll('[data-demo]').forEach(el=>{
 const kind=el.dataset.demo;
 const s={el,kind,running:false,link:true,fault:false,t:0,count:0,frames:0,generated:0,buffered:0,delivered:0,queue:[],next:1,on:false,lastPacket:0};
 const out=(name,value)=>{const n=el.querySelector(`[data-out="${name}"]`);if(n)n.textContent=value;};
 const button=(name)=>el.querySelector(`[data-action="${name}"]`);
 const input=(name)=>el.querySelector(`[data-input="${name}"]`);
 const status=(message,name='status')=>out(name,message);
 const pressed=(name,value)=>button(name)?.setAttribute('aria-pressed',String(value));
 function wave(){
  if(!['wearable','phantom'].includes(kind))return;
  const phantom=kind==='phantom', hr=phantom?+input('hr').value:72,sys=phantom?+input('sys').value:120,dia=phantom?+input('dia').value:80;
  if(phantom){out('hr',`${hr} bpm`);out('sys',`${sys} mmHg`);out('dia',`${dia} mmHg`);}
  const paths=[[],[]];
  for(let x=0;x<=680;x+=2){
   for(let channel=0;channel<2;channel++){
    const phase=((x/680*5+s.t)*hr/60-channel*.1)%1;
    const pulse=Math.exp(-Math.pow((phase-.16)/.065,2))+.18*Math.exp(-Math.pow((phase-.43)/.08,2));
    const y=phantom?145-(dia+(sys-dia)*pulse-30)/170*130:94-channel*22-34*pulse-7*Math.sin((x/55+s.t)*2+channel);
    paths[channel].push(`${x?'L':'M'}${x},${y.toFixed(2)}`);
   }
  }
  el.querySelector('.primary').setAttribute('d',paths[0].join(' '));el.querySelector('.secondary').setAttribute('d',paths[1].join(' '));
 }
 function wearable(){out('link',s.link?'Simulated BLE online':'Simulated BLE offline');out('packets',s.count);out('acquisition',s.running?'Sampling':'Stopped');button('start').textContent=s.running?'Pause stream':'Start stream';button('link').textContent=`BLE link: ${s.link?'on':'off'}`;pressed('link',s.link);wave();}
 function can(){const demand=+(input('demand')?.value??35),active=s.running&&!s.fault;out('demand',`${demand}%`);out('drive',`${active?demand:0}%`);out('can-link',s.fault?'Timeout':s.running?'Delivering frames':'Ready');out('frames',s.frames);out('state',s.running?(s.fault?'Timeout / inhibit':'Command path active'):'Idle');el.classList.toggle('demo-running',active);el.classList.toggle('motor-active',active&&demand>0);el.style.setProperty('--motor-duration',`${3-demand*.027}s`);el.classList.toggle('demo-fault',s.fault);button('start').textContent=s.running?'Pause bench':'Run bench';button('fault').textContent=s.fault?'Restore CAN link':'Inject CAN timeout';pressed('fault',s.fault);}
 function yocto(){out('generated',s.generated);out('buffered',s.buffered);out('delivered',s.delivered);button('link').textContent=`MQTT: ${s.link?'connected':'offline'}`;pressed('link',s.link);el.classList.toggle('demo-fault',!s.link);}
 function fifo(){
  const box=el.querySelector('.fifo-slots');box.replaceChildren();
  for(let i=0;i<8;i++){const n=document.createElement('span');n.textContent=i<s.queue.length?s.queue[i].toString(16).toUpperCase().padStart(2,'0'):'—';n.className=i<s.queue.length?'filled':'';n.setAttribute('aria-label',`Slot ${i+1}: ${i<s.queue.length?s.queue[i]:'empty'}`);box.append(n);}
  out('occupancy',`${s.queue.length} / 8`);out('empty',s.queue.length?'No':'Yes');out('full',s.queue.length===8?'Yes':'No');
 }
 function iot(){out('output',s.on?'ON':'OFF');out('broker',s.link?'Broker connected':'Broker offline');el.querySelector('[data-node="lamp"]').setAttribute('aria-label',`Simulated lamp ${s.on?'on':'off'}`);el.classList.toggle('lamp-on',s.on);button('link').textContent=`MQTT: ${s.link?'connected':'offline'}`;pressed('link',s.link);}
 function render(){if(kind==='wearable')wearable();if(kind==='phantom'){wave();button('start').textContent=s.running?'Pause simulation':'Run simulation';}if(kind==='can')can();if(kind==='yocto')yocto();if(kind==='rtl')fifo();if(kind==='iot')iot();}
 el.addEventListener('input',event=>{
  if(kind==='can'){can();status(s.running&&!s.fault?'Drive demand updated. The conceptual motor command follows the input.':s.fault?'Demand changed; delivery remains inhibited until the CAN link is restored.':'Drive demand set. Run the bench to deliver commands.');}
  if(kind==='phantom'){
   if(+input('sys').value<=+input('dia').value+10){if(event.target===input('sys'))input('dia').value=+input('sys').value-11;else input('sys').value=+input('dia').value+11;}
   wave();status('Setpoints updated. The displayed traces are synthetic.');
  }
 });
 el.addEventListener('click',event=>{
  const b=event.target.closest('button[data-action]');if(!b)return;
  const action=b.dataset.action;
  if(action==='start'){
   s.running=!s.running;
   if(kind==='wearable')status(s.running?'Acquisition started. Toggle BLE to inspect delivery behavior.':'Acquisition paused.');
   if(kind==='phantom')status(s.running?(reduced?'Running with reduced motion; setpoints remain interactive.':'Synthetic inlet and outlet pressure traces running.'):'Simulation paused.');
   if(kind==='can')status(s.running?'Bench running. ECU commands pass through the CAN link.':'Bench paused.');
  }
  if(action==='link'){
   s.link=!s.link;
   if(kind==='wearable')status(s.link?'Simulated BLE link restored.':'BLE delivery paused; acquisition can continue.');
   if(kind==='yocto'){
    if(s.link){const n=s.buffered;s.delivered+=n;s.buffered=0;status(`Broker reconnected. Delivered ${n} buffered sample${n===1?'':'s'}.`);}else status('Broker offline. New samples will be buffered locally.');
   }
   if(kind==='iot')status(s.link?'Broker connected. Commands can be delivered.':'Broker offline. New commands will be rejected.');
  }
  if(action==='fault'){s.fault=!s.fault;status(s.fault?'Simulated CAN timeout. New command delivery is inhibited.':'CAN link restored. Command delivery can resume.');}
  if(action==='sample'){
   s.generated++;if(s.link)s.delivered++;else s.buffered++;
   const sample={sequence:s.generated,optical_raw:1800+(s.generated*37)%300,temperature_demo_c:+(24+(s.generated%9)*.1).toFixed(1),synthetic:true};
   out('payload',JSON.stringify(sample,null,2));status(s.link?'Sample delivered via the simulated MQTT link.':'Sample buffered. Reconnect MQTT to deliver it.');
  }
  if(action==='execute'){
   const a=bounded(input('r1').value,0,255),b=bounded(input('r2').value,0,255);input('r1').value=Math.trunc(a);input('r2').value=Math.trunc(b);out('r3',Math.trunc(a)+Math.trunc(b));status(`ADD completed: r3 ← ${Math.trunc(a)} + ${Math.trunc(b)} = ${Math.trunc(a)+Math.trunc(b)}. Register write-back illustrated.`,'mips-status');
  }
  if(action==='push'){
   if(s.queue.length===8)status('Overflow blocked: FIFO is full. No data was overwritten.','fifo-status');
   else{const value=s.next++%256;s.queue.push(value);status(`Wrote 0x${value.toString(16).toUpperCase().padStart(2,'0')} to the tail.`,'fifo-status');}
  }
  if(action==='pop'){
   if(!s.queue.length)status('Underflow blocked: FIFO is empty.','fifo-status');
   else{const value=s.queue.shift();status(`Read oldest byte: 0x${value.toString(16).toUpperCase().padStart(2,'0')}.`,'fifo-status');}
  }
  if(action==='mips-tab'||action==='fifo-tab'){
   const isMips=action==='mips-tab';el.querySelector('#mips-panel').hidden=!isMips;el.querySelector('#fifo-panel').hidden=isMips;
   ['mips','fifo'].forEach(n=>{const selected=(n==='mips')===isMips;const tab=button(n+'-tab');tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
  }
  if(action==='on'||action==='off'){
   if(!s.link)status('Command rejected: the broker is offline. GPIO output is unchanged.');
   else{s.on=action==='on';out('payload',`Topic: demo/switch/command\nPayload: ${s.on?'ON':'OFF'}\nAcknowledged: GPIO ${s.on?'HIGH':'LOW'}`);status(`Command delivered. Simulated output ${s.on?'on':'off'}.`);}
  }
  if(action==='reset'){
   s.running=false;s.t=0;s.count=0;s.frames=0;s.fault=false;s.queue=[];s.next=1;s.generated=s.buffered=s.delivered=0;s.link=true;s.lastPacket=0;
   if(kind==='phantom'){input('hr').value=72;input('sys').value=120;input('dia').value=80;}
   if(kind==='can'&&input('demand'))input('demand').value=35;
   if(kind==='rtl')status('Queue cleared. Empty flag set.','fifo-status');else status('Reset. Ready to start again.');
   if(kind==='yocto')out('payload','Waiting for a sample…');
  }
  render();
 });
 el.querySelector('[role="tablist"]')?.addEventListener('keydown',event=>{
  if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const target=event.key==='Home'?'mips-tab':event.key==='End'?'fifo-tab':event.target.dataset.action==='mips-tab'?'fifo-tab':'mips-tab';button(target).click();button(target).focus();}
 });
 s.tick=dt=>{
  if(!s.running)return;if(!reduced)s.t+=dt;s.lastPacket+=dt;
  if(kind==='wearable'){if(s.lastPacket>=1){if(s.link)s.count++;s.lastPacket=0;}wearable();}
  if(kind==='phantom')wave();
  if(kind==='can'&&s.lastPacket>=.5){if(!s.fault)s.frames++;s.lastPacket=0;can();}
 };
 render();states.push(s);
});
let last=performance.now();
setInterval(()=>{const now=performance.now(),dt=Math.min((now-last)/1000,.2);last=now;if(document.hidden)return;for(const s of states){const b=s.el.getBoundingClientRect();if(b.bottom>0&&b.top<innerHeight)s.tick(dt);}},100);
})();
