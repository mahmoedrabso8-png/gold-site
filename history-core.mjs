// Shared, deterministic chart rendering. All values come from dated source snapshots.
export const HISTORY_TEXT={
 en:{title:'Gold price history',day:'30 days',year:'1 year',karat:'Karat',unit:'per gram',first:'First',last:'Latest',low:'Lowest',high:'Highest',change:'Change',date:'Date',price:'Reference price',rows:'available daily snapshots',gap:'Missing days are left as gaps, not estimated.',note:'Daily raw-gold reference prices using gold and exchange rates from the same dated snapshot. Not local shop quotes; premiums, making charges and tax are excluded. Daily reference data can differ from the live feed above.',source:'Data source',table:'View the latest 10 observations',error:'Could not load the longer history. The saved 30-day view remains available.',loading:'Loading history…',stale:'Latest available observation'},
 ar:{title:'تاريخ أسعار الذهب',day:'30 يوماً',year:'سنة',karat:'العيار',unit:'للغرام',first:'أول سعر',last:'آخر سعر',low:'الأدنى',high:'الأعلى',change:'التغير',date:'التاريخ',price:'السعر المرجعي',rows:'يومًا مسجّلًا',gap:'تُترك الأيام المفقودة كفجوات ولا تُقدَّر أسعارها.',note:'أسعار مرجعية يومية للذهب الخام باستخدام الذهب وسعر الصرف من بيانات اليوم نفسه. ليست أسعار محلات بلدك ولا تشمل هامش البائع أو المصنعية أو الضريبة. قد تختلف البيانات اليومية عن السعر المباشر أعلاه.',source:'مصدر البيانات',table:'عرض آخر 10 أيام',error:'تعذّر تحميل المدة الأطول. يظل عرض 30 يوماً المحفوظ متاحاً.',loading:'جارٍ تحميل التاريخ…',stale:'آخر يوم مسجّل'}
};
const hf=v=>new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(v);
export function historySeries(data,currency,karat,period,asOf){
 const end=new Date(asOf+'T00:00:00Z'),start=new Date(end);
 if(period==='year') start.setUTCFullYear(start.getUTCFullYear()-1); else start.setUTCDate(start.getUTCDate()-29);
 const from=start.toISOString().slice(0,10);
 return data.rows.filter(r=>r.day>=from&&r.day<=asOf&&r.fx[currency]>0&&r.usdGram>0).map(r=>({day:r.day,value:r.usdGram*r.fx[currency]*karat/24}));
}
export function historyGraph(points,L,currency,karat,width=720){
 const t=HISTORY_TEXT[L],h=225,left=width<450?66:80,right=12,top=18,bottom=36;
 if(points.length<2)return '';
 const values=points.map(p=>p.value),min=Math.min(...values),max=Math.max(...values),pad=Math.max((max-min)*.12,max*.005),lo=min-pad,hi=max+pad;
 const t0=Date.parse(points[0].day),tn=Date.parse(points.at(-1).day);
 const x=p=>left+(Date.parse(p.day)-t0)/(tn-t0||1)*(width-left-right),y=v=>top+(hi-v)/(hi-lo)*(h-top-bottom);
 let last=0;const path=points.map(p=>{const now=Date.parse(p.day),move=!last||now-last>86400000*1.5;last=now;return `${move?'M':'L'}${x(p).toFixed(1)},${y(p.value).toFixed(1)}`;}).join(' ');
 const grid=[0,.5,1].map(f=>{const v=lo+(hi-lo)*f,yy=y(v);return `<line x1="${left}" x2="${width-right}" y1="${yy}" y2="${yy}" stroke="var(--bb)"/><text x="${left-8}" y="${yy+4}" text-anchor="end">${width<450&&v>=10000?new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(v):hf(v)}</text>`;}).join('');
 return `<svg class="history-svg" viewBox="0 0 ${width} ${h}" data-pts="${points.map(p=>[+x(p).toFixed(1),+y(p.value).toFixed(1),p.day,+p.value.toFixed(2)].join('|')).join(';')}" data-h="${h}" data-left="${left}" data-right="${right}" role="img" aria-label="${t.title}: ${karat}K ${currency} ${t.unit}, ${points[0].day} - ${points.at(-1).day}" xmlns="http://www.w3.org/2000/svg"><title>${t.title}: ${karat}K ${currency} ${t.unit}</title><g fill="var(--t2)" font-size="12" font-family="system-ui,sans-serif" direction="ltr">${grid}<text x="${left}" y="${h-10}" text-anchor="start">${points[0].day}</text><text x="${width-right}" y="${h-10}" text-anchor="end">${points.at(-1).day}</text></g><path d="${path}" fill="none" stroke="var(--g4)" stroke-width="2.5" stroke-linejoin="round"/><circle cx="${x(points.at(-1))}" cy="${y(points.at(-1).value)}" r="3.5" fill="var(--g4)"/></svg>`;
}
export function historyView(points,L,currency,karat,width=720){
 const t=HISTORY_TEXT[L];if(!points.length)return `<p>${t.error}</p>`;
 const first=points[0].value,last=points.at(-1).value,values=points.map(p=>p.value),pct=(last/first-1)*100;
 const stats=[[t.first,hf(first)],[t.last,hf(last)],[t.low,hf(Math.min(...values))],[t.high,hf(Math.max(...values))],[t.change,(pct>=0?'+':'')+pct.toFixed(2)+'%']];
 return `<p class="history-unit"><strong>${karat}K · ${currency} ${t.unit}</strong> · ${points.length} ${t.rows}</p>${historyGraph(points,L,currency,karat,width)}<div class="history-stats">${stats.map(([label,value])=>`<div><span>${label}</span><strong dir="ltr">${value}</strong></div>`).join('')}</div><p class="note">${t.stale}: <time dir="ltr">${points.at(-1).day}</time>. ${t.gap}</p><details><summary>${t.table}</summary><div class="table-wrap"><table><thead><tr><th>${t.date}</th><th>${t.price} (${currency} ${t.unit})</th></tr></thead><tbody>${points.slice(-10).reverse().map(p=>`<tr><td dir="ltr">${p.day}</td><td>${hf(p.value)}</td></tr>`).join('')}</tbody></table></div></details>`;
}
export function historySection(data,market,L,asOf){
 const t=HISTORY_TEXT[L],points=historySeries(data,market.currency,24,'30',asOf);
 return `<section class="card-section" id="gold-history" data-currency="${market.currency}" data-as-of="${asOf}"><script type="application/json" id="history-initial">${JSON.stringify(points)}</script><h2>${t.title} · ${L==='ar'?market.ar:market.en}</h2><div class="history-controls"><div role="group" aria-label="${t.title}"><button type="button" data-period="30" aria-pressed="true">${t.day}</button><button type="button" data-period="year" aria-pressed="false">${t.year}</button></div><label>${t.karat} <select id="history-karat">${[24,22,21,18].map(k=>`<option value="${k}">${k}K</option>`).join('')}</select></label></div><p class="note history-message" role="status"></p><div class="history-view">${historyView(points,L,market.currency,24)}</div><p class="note">${t.note}</p><p class="note">${t.source}: <a href="https://github.com/fawazahmed0/exchange-api/" rel="noopener">Exchange API (CC0)</a></p></section>`;
}
