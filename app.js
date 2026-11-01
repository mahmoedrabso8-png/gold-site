/* أسعار الذهب الإمارات — سكريبت مشترك لكل الصفحات */
(function(){
'use strict';
const SB_URL='https://kmvadxkjehxfxpeveekg.supabase.co';
const SB_KEY='sb_publishable_kWJE1YujD-0VdmAOET0dVw_xOUNu2d1';
const CACHE_MS=5*60*1000;      // 5 دقائق
const TROY=31.1035;
const AED=3.6725;              // الدرهم مربوط بالدولار رسمياً
const NISAB_G=85;              // نصاب الذهب بالغرام (عيار 24)
const EN=document.documentElement.lang==='en';
const T=EN?{
  upd:'Updated',fail:'Could not load live prices — showing last saved price.',
  load:'Loading prices…',yes:'Nisab reached — zakat is due',no:'Below nisab — no zakat due',
  need:'You need about',more:'more grams of pure gold',inst:'Install the app',instSub:'Quick access to gold prices from your home screen',instBtn:'Install',
  refresh:'Refresh',refreshing:'Updating…'
}:{
  upd:'آخر تحديث',fail:'تعذّر تحميل السعر المباشر — نعرض آخر سعر محفوظ.',
  load:'جارٍ تحميل الأسعار…',yes:'بلغ النصاب — تجب الزكاة',no:'لم يبلغ النصاب — لا تجب الزكاة',
  need:'تحتاج تقريباً',more:'غرام إضافي من الذهب الخالص',inst:'ثبّت التطبيق على هاتفك',instSub:'وصول سريع لأسعار الذهب من الشاشة الرئيسية',instBtn:'تثبيت',
  refresh:'تحديث',refreshing:'جارٍ التحديث…'
};

let G={g24:+(window.__G||0)||null};

const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const fmt=(v,d=2)=>new Intl.NumberFormat('en-US',{minimumFractionDigits:d,maximumFractionDigits:d}).format(v);
const num=id=>{const el=document.getElementById(id);if(!el)return 0;const v=parseFloat(String(el.value).replace(',','.'));return isFinite(v)&&v>0?v:0;};
const dubaiTime=d=>new Date(d).toLocaleString(EN?'en-AE':'ar-AE',{hour:'2-digit',minute:'2-digit',day:'numeric',month:'short',timeZone:'Asia/Dubai'});

/* ── Clock ── */
const clock=$('#live-time');
if(clock){const t=()=>clock.textContent=new Date().toLocaleTimeString(EN?'en-AE':'ar-AE',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Dubai'})+(EN?' Dubai':' دبي');t();setInterval(t,30000);}

/* ── Supabase ── */
async function sb(path,opts={}){
  const r=await fetch(SB_URL+'/rest/v1'+path,{...opts,headers:{apikey:SB_KEY,Authorization:'Bearer '+SB_KEY,'Content-Type':'application/json',Prefer:'return=minimal',...(opts.headers||{})}});
  if(!r.ok) throw new Error('db '+r.status);
  return opts.method==='POST'?null:r.json();
}
const latestRow=async()=>(await sb('/gold_prices?order=fetched_at.desc&limit=1&select=fetched_at,price_24k'))[0]||null;
async function rowBefore(ms){
  const t=new Date(Date.now()-ms).toISOString();
  return (await sb(`/gold_prices?fetched_at=lte.${t}&order=fetched_at.desc&limit=1&select=price_24k`))[0]||null;
}
function saveRow(g24,usd){
  return sb('/gold_prices',{method:'POST',body:JSON.stringify({currency:'AED',
    price_24k:+g24.toFixed(4),price_22k:+(g24*22/24).toFixed(4),price_21k:+(g24*21/24).toFixed(4),price_18k:+(g24*18/24).toFixed(4),
    price_troy:+(g24*TROY).toFixed(4),raw_json:{priceUSD:usd,usdToAed:AED,source:'browser'}})});
}

/* ── Live price ── */
async function fetchLive(){
  const r=await fetch('https://api.gold-api.com/price/XAU',{cache:'no-store'});
  if(!r.ok) throw new Error('gold-api '+r.status);
  const d=await r.json();
  if(!(d.price>500)) throw new Error('bad price');
  return {g24:d.price*AED/TROY,usd:d.price,at:d.updatedAt||new Date().toISOString()};
}

async function getPrice(){
  let cached=null;
  try{cached=await latestRow();}catch(e){}
  if(cached&&Date.now()-new Date(cached.fetched_at).getTime()<CACHE_MS)
    return {g24:+cached.price_24k,at:cached.fetched_at};
  try{
    const live=await fetchLive();
    saveRow(live.g24,live.usd).catch(()=>{});
    return live;
  }catch(e){
    if(cached) return {g24:+cached.price_24k,at:cached.fetched_at,stale:true};
    throw e;
  }
}

/* ── Render ── */
// data-p: سعر قابل للتحديث. data-m="ag" للفضة (data-f = النقاء)، غير كده ذهب (data-k = العيار)
// data-cur: aed (افتراضي) | usd | inr | pkr ...
G.ag=+(window.__AG||0)||null; G.fx=window.__FX||{};
// عملات مربوطة بالدولار بسعر ثابت (رسمي). الدينار الكويتي مش مربوط فبييجي من سعر الصرف اليومي
const PEG={USD:1,AED:3.6725,SAR:3.75,QAR:3.64,OMR:0.3845,BHD:0.376};
const rate=c=>PEG[c.toUpperCase()]||G.fx[c.toUpperCase()]||null;

/* ── الدولة المختارة من القائمة اللي فوق ── */
const CTRY={AED:'',SAR:'saudi',KWD:'kuwait',QAR:'qatar',OMR:'oman',BHD:'bahrain'};
const DEC={AED:2,SAR:2,QAR:2,KWD:3,OMR:3,BHD:3};
const NAME={AED:'درهم',SAR:'ريال',KWD:'دينار',QAR:'ريال',OMR:'ريال',BHD:'دينار'};
const BD=document.body.dataset;
// صفحة خاصة بدولة (الرئيسية وعيار 21 و24 لكل دولة): عملتها ثابتة
const PAGE_CUR=BD.ctry?(BD.ctry==='uae'?'AED':Object.keys(CTRY).find(k=>CTRY[k]===BD.ctry)):null;
// صفحات عملتها ثابتة: صفحات الدول + صفحات فيها أرقام ثابتة (الأرشيف، المقارنة، الروبية...)
const FIXED=!!PAGE_CUR||BD.fixed==='1';
let SAVED=null;try{SAVED=localStorage.getItem('cur');}catch(e){}
let SEL=PAGE_CUR||(CTRY.hasOwnProperty(SAVED)?SAVED:'AED');
const pageFor=c=>(EN?'/en/':'/')+(CTRY[c]?CTRY[c]+'/':'')+(BD.sub?BD.sub+'/':'');
// صفحة إماراتية ليها نسخة لكل دولة، والزائر اختار دولة تانية قبل كده: نوديه لصفحة دولته
if(BD.ctry==='uae'&&SAVED&&SAVED!=='AED'&&CTRY[SAVED]) location.replace(pageFor(SAVED));
// معامل التحويل من الدرهم للعملة المختارة (null لو سعر الصرف لسه ما وصلش)
function conv(){if(FIXED||SEL==='AED')return 1;const r=rate(SEL);return r?r/AED:null;}
const effCur=()=>FIXED?'AED':(conv()==null?'AED':SEL);
function labels(){
  if(FIXED) return;
  const c=effCur();
  $$('[data-cl]').forEach(el=>el.textContent=el.dataset.cl==='n'&&!EN?NAME[c]:c);
}
function nisab(){if(G.g24) $$('[data-nisab]').forEach(el=>el.textContent=fmt(G.g24*NISAB_G*(conv()||1),DEC[effCur()]));}
const csel=$('#country');
if(csel){
  csel.value=SEL;
  csel.addEventListener('change',()=>{
    const c=csel.value;try{localStorage.setItem('cur',c);}catch(e){}
    if(PAGE_CUR){location.href=pageFor(c);return;}
    SEL=c;
    if(c==='KWD'&&!G.fx.KWD) loadFX(true);
    syncCalcCur();paint();labels();calc();zakat();nisab();
  });
}
function syncCalcCur(){const cs=$('#c-cur');if(cs&&!FIXED&&[...cs.options].some(o=>o.value===SEL)) cs.value=SEL;}
syncCalcCur();
function paint(){
  $$('[data-p]').forEach(el=>{
    const ag=el.dataset.m==='ag';
    const base=ag?G.ag*(+(el.dataset.f||1)):G.g24&&G.g24*(+(el.dataset.k||24))/24;
    if(!base) return;
    let cur=el.dataset.cur||'aed';
    // الأسعار بالدرهم في الصفحات العامة تتحوّل لعملة الدولة المختارة
    const auto=cur==='aed'&&!FIXED&&SEL!=='AED';
    if(auto) cur=SEL.toLowerCase();
    let v=(base+(+(el.dataset.mc||0)))*(+(el.dataset.w||1));
    let ok=true;
    if(cur!=='aed'){const r=rate(cur);if(r) v=v/AED*r; else if(auto) ok=false; else return;}
    const d=el.dataset.d!=null?+el.dataset.d:(v>=100000?0:(auto&&ok?DEC[SEL]:2));
    el.textContent=fmt(v,d);
  });
}
function render(p){
  G.g24=p.g24;
  paint();
  $$('[data-upd]').forEach(el=>el.textContent=dubaiTime(p.at));
  nisab();labels();
  calc();zakat();
}
async function loadSilver(){
  if(!$('[data-m="ag"]')) return;
  try{
    const r=await fetch('https://api.gold-api.com/price/XAG',{cache:'no-store'});
    const d=await r.json();
    if(d.price>1){G.ag=d.price*AED/TROY;paint();$$('[data-upd-ag]').forEach(el=>el.textContent=dubaiTime(d.updatedAt||Date.now()));}
  }catch(e){}
}
async function loadFX(force){
  if(!force&&!(SEL==='KWD'&&!FIXED)&&![...$$('[data-cur]'),...$$('#c-cur option')].some(el=>!PEG[(el.dataset.cur||el.value||'').toUpperCase()])) return;
  try{
    const d=await (await fetch('https://open.er-api.com/v6/latest/USD')).json();
    if(d.rates){G.fx=d.rates;paint();labels();nisab();calc();zakat();$$('[data-fx]').forEach(el=>{const v=d.rates[el.dataset.fx];if(v) el.textContent=fmt(v/AED,4);});}
  }catch(e){}
}

function renderChange(pct){
  $$('[data-chg]').forEach(el=>{
    const dir=pct>0.005?'up':pct<-0.005?'dn':'fl';
    el.className='chg '+dir;
    el.textContent=(dir==='up'?'▲ ':dir==='dn'?'▼ ':'● ')+Math.abs(pct).toFixed(2)+'%'+(EN?' / 24h':' / 24 ساعة');
    el.hidden=false;
  });
}

async function load(){
  const btn=$('#refresh');
  if(btn){btn.disabled=true;btn.textContent=T.refreshing;}
  const err=$('#price-error');
  try{
    const p=await getPrice();
    render(p);
    if(err) err.hidden=!p.stale, err.textContent=T.fail;
    try{const old=await rowBefore(24*3600*1000);if(old) renderChange((p.g24-old.price_24k)/old.price_24k*100);}catch(e){}
  }catch(e){
    if(err){err.hidden=false;err.textContent=T.fail;}
    if(G.g24){paint();labels();nisab();calc();zakat();}
  }finally{
    if(btn){btn.disabled=false;btn.textContent='🔄 '+T.refresh;}
  }
}

/* ── Sparkline (48h) ── */
async function spark(){
  const cv=$('#spark');if(!cv) return;
  let rows=[];
  try{
    const s=new Date(Date.now()-48*3600*1000).toISOString();
    rows=(await sb(`/gold_prices?fetched_at=gte.${s}&order=fetched_at.desc&limit=600&select=fetched_at,price_24k`)).reverse();
  }catch(e){}
  if(rows.length<2){const box=cv.closest('.card-section');if(box) box.hidden=true;return;}
  const ctx=cv.getContext('2d'),dpr=window.devicePixelRatio||1,W=cv.clientWidth||700,H=130;
  cv.width=W*dpr;cv.height=H*dpr;ctx.scale(dpr,dpr);
  // الوضع العادي: 4 عيارات بالدرهم. data-mode="usd": الأونصة بالدولار
  const usd=cv.dataset.mode==='usd';
  const ser=usd?[[TROY*24/AED,'#fce35c']]:[[24,'#fce35c'],[22,'#f9a825'],[21,'#ff8a50'],[18,'#a09880']];
  const val=(r,k)=>usd?r.price_24k*TROY/AED:r.price_24k*k/24;
  let lo=Infinity,hi=-Infinity;
  rows.forEach(r=>ser.forEach(([k])=>{const v=val(r,k);if(v<lo)lo=v;if(v>hi)hi=v;}));
  const pad=(hi-lo)*.08||1;lo-=pad;hi+=pad;
  const x=i=>i/(rows.length-1)*W,y=v=>H-(v-lo)/(hi-lo)*H;
  ctx.strokeStyle='rgba(255,255,255,.05)';ctx.lineWidth=1;
  for(let i=1;i<4;i++){ctx.beginPath();ctx.moveTo(0,i*H/4);ctx.lineTo(W,i*H/4);ctx.stroke();}
  ser.forEach(([k,c])=>{ctx.beginPath();ctx.strokeStyle=c;ctx.lineWidth=1.6;ctx.lineJoin='round';
    rows.forEach((r,i)=>{const yy=y(val(r,k));i?ctx.lineTo(x(i),yy):ctx.moveTo(x(i),yy);});ctx.stroke();});
  if(usd){ctx.fillStyle='#b0a890';ctx.font='11px Cairo, sans-serif';ctx.fillText('$'+fmt(hi-pad,0),4,12);ctx.fillText('$'+fmt(lo+pad,0),4,H-4);}
}

/* ── Gold calculator ── */
function setText(id,v){const el=document.getElementById(id);if(el) el.textContent=v;}
function calc(){
  if(!$('#calc')||!G.g24) return;
  // العملة والضريبة حسب البلد (من اختيار العملة)
  const sel=$('#c-cur'),opt=sel?sel.options[sel.selectedIndex]:null;
  const cur=opt?opt.value:'AED',vr=opt?+opt.dataset.vat:5,dp=opt?+(opt.dataset.d||2):2,r=rate(cur);
  $$('.c-curl').forEach(el=>el.textContent=cur);
  setText('c-vatp',vr);
  const vbox=$('#c-vat');if(vbox){vbox.disabled=!vr;if(!vr)vbox.checked=false;}
  if(!r){['c-pg','c-gold','c-make','c-tax','c-total','c-usd'].forEach(id=>setText(id,'—'));return;}
  const w=num('c-w'),k=+$('#c-k').value,mc=num('c-mc'),vat=vbox&&vbox.checked;
  const pg=G.g24*k/24/AED*r,gold=pg*w,make=mc*w,sub=gold+make,tax=vat?sub*vr/100:0,total=sub+tax;
  setText('c-pg',fmt(pg,dp));setText('c-gold',fmt(gold,dp));setText('c-make',fmt(make,dp));
  setText('c-tax',fmt(tax,dp));setText('c-total',fmt(total,dp));setText('c-usd',fmt(total/r));
}

/* ── Zakat calculator ── */
function zakat(){
  if(!$('#zakat')||!G.g24) return;
  const pure=num('z-24')+num('z-22')*22/24+num('z-21')*21/24+num('z-18')*18/24;
  const dp=DEC[effCur()],value=pure*G.g24*(conv()||1),due=pure>=NISAB_G;
  setText('z-pure',fmt(pure));setText('z-val',fmt(value,dp));
  setText('z-amt',fmt(due?value*0.025:0,dp));
  const msg=$('#z-msg');
  if(msg){
    if(!pure){msg.textContent='';return;}
    msg.className='result-msg '+(due?'ok':'no');
    msg.textContent=due?'✅ '+T.yes:'❌ '+T.no+' — '+T.need+' '+fmt(NISAB_G-pure,1)+' '+T.more;
  }
}
document.addEventListener('input',e=>{if(e.target.closest('#calc'))calc();if(e.target.closest('#zakat'))zakat();});
document.addEventListener('change',e=>{if(e.target.closest('#calc'))calc();if(e.target.closest('#zakat'))zakat();});

const rb=$('#refresh');if(rb) rb.addEventListener('click',load);

// نعرض الأسعار المكتوبة في الصفحة بعملة الدولة المختارة فوراً، قبل ما السعر المباشر يوصل
paint();labels();nisab();
load();spark();loadSilver();loadFX();
setInterval(()=>{load();loadSilver();},CACHE_MS);

/* ── PWA ── */
if('serviceWorker' in navigator) addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
let deferred=null;
addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferred=e;
  try{if(localStorage.getItem('installDismissed'))return;}catch(_){}
  setTimeout(()=>{
    if(!deferred||$('#install-banner')) return;
    const b=document.createElement('div');b.id='install-banner';
    b.innerHTML=`<img src="/icons/icon-96x96.png" alt=""><div class="t"><b>${T.inst}</b>${T.instSub}</div><button class="go">${T.instBtn}</button><button class="x" aria-label="close">✕</button>`;
    document.body.appendChild(b);
    b.querySelector('.go').onclick=()=>{deferred.prompt();deferred.userChoice.finally(()=>{b.remove();deferred=null;});};
    b.querySelector('.x').onclick=()=>{b.remove();try{localStorage.setItem('installDismissed','1');}catch(_){}};
  },6000);
});
addEventListener('appinstalled',()=>{const b=$('#install-banner');if(b)b.remove();});
})();
