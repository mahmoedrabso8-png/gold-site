const historyRoot=document.getElementById('gold-history');
if(historyRoot){
 const L=document.documentElement.lang==='ar'?'ar':'en',t=HISTORY_TEXT[L],cur=historyRoot.dataset.currency,asOf=historyRoot.dataset.asOf;
 const view=historyRoot.querySelector('.history-view'),message=historyRoot.querySelector('.history-message'),karat=historyRoot.querySelector('#history-karat');
 const initial=JSON.parse(historyRoot.querySelector('#history-initial').textContent);
 let period='30',full=null,busy=false;
 const draw=()=>{const k=+karat.value,points=full?historySeries(full,cur,k,period,asOf):initial.map(p=>({day:p.day,value:p.value*k/24}));view.innerHTML=historyView(points,L,cur,k,Math.max(280,Math.round(view.clientWidth)));};
 const periods=[...historyRoot.querySelectorAll('[data-period]')];
 for(const button of periods)button.addEventListener('click',async()=>{
  if(busy)return;
  if(button.dataset.period==='year'&&!full){
   busy=true;message.textContent=t.loading;periods.forEach(b=>b.disabled=true);
   try{const r=await fetch('/assets/gold-history.json?v='+historyRoot.dataset.version);if(!r.ok)throw Error('history');const data=await r.json();if(!Array.isArray(data.rows)||!data.rows.length)throw Error('history');full=data;message.textContent='';}
   catch{message.textContent=t.error;return;}
   finally{busy=false;periods.forEach(b=>b.disabled=false);}
  }
  period=button.dataset.period;periods.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));draw();
 });
 karat.addEventListener('change',draw);
 if('ResizeObserver'in window){let width=0;new ResizeObserver(()=>{const w=Math.round(view.clientWidth);if(w!==width){width=w;draw();}}).observe(view);}else draw();
}
