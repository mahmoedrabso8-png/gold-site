const historyRoot=document.getElementById('gold-history');
if(historyRoot){
 const NS='http://www.w3.org/2000/svg',mk=(n,a)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e;};
 const fmtP=v=>new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).format(v);
 function hoverChart(svg,k){
  if(!svg||!svg.dataset.pts)return;
  const pts=svg.dataset.pts.split(';').map(s=>{const a=s.split('|');return{x:+a[0],y:+a[1],day:a[2],v:+a[3]};});
  const vb=svg.viewBox.baseVal,H=+svg.dataset.h,top=18,bot=H-36,cu=cur;
  const g=mk('g',{'pointer-events':'none',visibility:'hidden'});
  const line=mk('line',{y1:top,y2:bot,stroke:'var(--t2)','stroke-dasharray':'3 3'});
  const dot=mk('circle',{r:5,fill:'var(--g4)',stroke:'var(--bc2)','stroke-width':2});
  const box=mk('rect',{rx:6,height:40,fill:'var(--bc2)',stroke:'var(--g4)'});
  const t1=mk('text',{'font-size':13,'font-weight':700,fill:'var(--t1)','font-family':'system-ui,sans-serif'});
  const t2=mk('text',{'font-size':12,fill:'var(--t2)','font-family':'system-ui,sans-serif'});
  g.append(line,dot,box,t1,t2);svg.append(g);
  svg.style.touchAction='pan-y';svg.style.cursor='crosshair';
  const show=e=>{
   const r=svg.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*vb.width;
   let b=pts[0];for(const p of pts)if(Math.abs(p.x-px)<Math.abs(b.x-px))b=p;
   t1.textContent=fmtP(b.v)+' '+cu+' · '+k+'K';t2.textContent=b.day;
   const w=Math.max(t1.getComputedTextLength(),t2.getComputedTextLength())+20;
   let bx=b.x+10;if(bx+w>vb.width-4)bx=b.x-10-w;if(bx<4)bx=4;
   const by=Math.max(top,Math.min(b.y-50,bot-42));
   line.setAttribute('x1',b.x);line.setAttribute('x2',b.x);dot.setAttribute('cx',b.x);dot.setAttribute('cy',b.y);
   box.setAttribute('x',bx);box.setAttribute('y',by);box.setAttribute('width',w);
   t1.setAttribute('x',bx+10);t1.setAttribute('y',by+17);t2.setAttribute('x',bx+10);t2.setAttribute('y',by+33);
   g.setAttribute('visibility','visible');
  };
  svg.addEventListener('pointermove',show);svg.addEventListener('pointerdown',show);
  svg.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')g.setAttribute('visibility','hidden');});
  svg.addEventListener('pointercancel',()=>g.setAttribute('visibility','hidden'));
 }
 const L=document.documentElement.lang==='ar'?'ar':'en',t=HISTORY_TEXT[L],cur=historyRoot.dataset.currency,asOf=historyRoot.dataset.asOf;
 const view=historyRoot.querySelector('.history-view'),message=historyRoot.querySelector('.history-message'),karat=historyRoot.querySelector('#history-karat');
 const initial=JSON.parse(historyRoot.querySelector('#history-initial').textContent);
 let period='30',full=null,busy=false;
 const draw=()=>{const k=+karat.value,points=full?historySeries(full,cur,k,period,asOf):initial.map(p=>({day:p.day,value:p.value*k/24}));view.innerHTML=historyView(points,L,cur,k,Math.max(280,Math.round(view.clientWidth)));hoverChart(view.querySelector('.history-svg'),k);};
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
