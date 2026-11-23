/* أسعار الذهب الإمارات — سكريبت مشترك لكل الصفحات */
(function(){
'use strict';
const SB_URL='https://kmvadxkjehxfxpeveekg.supabase.co';
const SB_KEY='sb_publishable_kWJE1YujD-0VdmAOET0dVw_xOUNu2d1';
const CACHE_MS=5*60*1000;      // 5 دقائق
const TROY=31.1035;
const AED=3.6725;              // الدرهم مربوط بالدولار رسمياً
const NISAB_G=85;              // نصاب الذهب بالغرام (عيار 24)
const EN=document.documentElement.lang!=='ar';
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

let G={g24:+(window.__G||0)||null,...(window.__QUOTE||{})};
G.at=epoch(G.sourceAt);G.stale=!priceState(G).usable;
function statusPrice(){const status=priceState(G);G.stale=!status.usable;document.querySelectorAll('[data-price-state]').forEach(el=>{el.dataset.priceState=status.state;el.textContent=priceLabel(status.state,document.documentElement.lang);});document.querySelectorAll('[data-provenance]').forEach(el=>{const t=epoch(G[el.dataset.provenance]);el.textContent=t?new Date(t).toLocaleString(EN?'en-GB':'ar-EG',{timeZoneName:'short'}):'—';});document.querySelectorAll('[data-fx-state]').forEach(el=>{const c=el.dataset.fxState,pegged=['AED','USD','SAR','QAR','OMR','BHD','JOD'].includes(c),ok=pegged||G.fxAt&&Date.now()-G.fxAt<=4*86400000&&G.fxAt-Date.now()<=120000&&G.fx?.[c]>0;el.textContent=pegged?(document.documentElement.lang==='ar'?'التحويل المرجعي المربوط':'Pegged reference conversion'):(document.documentElement.lang==='ar'?(ok?'الصرف المؤرخ متاح':'الصرف قديم أو غير متاح، التحويل غير موثوق'):(ok?'Dated FX available':'FX stale or unavailable; conversion not usable'));});document.querySelectorAll('[data-asset-state]').forEach(el=>{if(el.dataset.assetState==='silver'){const s=priceState({g24:G.ag,sourceAt:G.agAt});el.textContent=(EN?'Silver: ':'الفضة: ')+priceLabel(s.state,EN?'en':'ar');el.dataset.state=s.state;}else{const ok=G.fxAt&&Date.now()-G.fxAt<=4*86400000&&G.fxAt-Date.now()<=120000;el.textContent=(EN?'Daily reference FX, not a bank/cash quote. ':'صرف مرجعي يومي، ليس سعر بنك أو سوق نقدي. ')+(ok?'DELAYED':'STALE');el.dataset.state=ok?'DELAYED':'STALE';}});return status;}
statusPrice();G.displayedAt=new Date().toISOString();setInterval(()=>{statusPrice();calc();zakat();if(window.GoldAlerts)window.GoldAlerts.check();},30000);

const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
/* Native disclosure navigation, one group at a time, with outside/Escape dismissal. */
const navGroups=[...document.querySelectorAll('.grouped-nav details')];
navGroups.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)navGroups.forEach(other=>{if(other!==d)other.open=false;});}));
document.addEventListener('click',e=>{if(!e.target.closest('.grouped-nav'))navGroups.forEach(d=>d.open=false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=navGroups.find(d=>d.open);if(open){open.open=false;open.querySelector('summary').focus();}}});
/* Article library: progressive enhancement, with all links available without JS. */
const library=document.querySelector('[data-article-library]');
if(library){
  const controls=library.querySelector('.article-controls'),input=library.querySelector('#article-search'),cards=[...library.querySelectorAll('[data-article-card]')],status=library.querySelector('.article-count'),empty=library.querySelector('.article-empty');
  const normalize=s=>s.toLocaleLowerCase().normalize('NFKD').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي');
  const filter=()=>{const q=normalize(input.value.trim()),topic=library.querySelector('[name="article-topic"]:checked').value;let shown=0;cards.forEach(c=>{const show=(topic==='all'||c.dataset.topic===topic)&&normalize(c.textContent).includes(q);c.hidden=!show;if(show)shown++;});status.textContent=EN?`${shown} of ${cards.length} guides`:`${shown} من ${cards.length} دليل`;empty.hidden=shown>0;};
  controls.hidden=false;input.addEventListener('input',filter);library.querySelectorAll('[name="article-topic"]').forEach(r=>r.addEventListener('change',filter));library.querySelector('.article-reset').addEventListener('click',()=>{input.value='';library.querySelector('[value="all"]').checked=true;filter();input.focus();});filter();
}
const fmt=(v,d=2)=>new Intl.NumberFormat('en-US',{minimumFractionDigits:d,maximumFractionDigits:d}).format(v);
const num=id=>{const el=document.getElementById(id);if(!el)return 0;const v=parseFloat(String(el.value).replace(',','.'));return isFinite(v)&&v>0?v:0;};
const dubaiTime=d=>new Date(d).toLocaleString(EN?'en-AE':'ar-AE',{hour:'2-digit',minute:'2-digit',day:'numeric',month:'short',timeZone:document.body.dataset.marketZone||'Asia/Dubai'});

/* ── Clock ── */
const clock=$('#live-time');
if(clock){const t=()=>clock.textContent=new Date().toLocaleTimeString(EN?'en-AE':'ar-AE',{hour:'2-digit',minute:'2-digit',timeZone:document.body.dataset.marketZone||'Asia/Dubai'})+' '+(document.body.dataset.marketZone||'Asia/Dubai');t();setInterval(t,30000);}

/* ── Theme toggle ── */
const themeBtn=$('#theme-toggle');
const paintTheme=()=>{if(themeBtn)themeBtn.textContent=document.documentElement.getAttribute('data-theme')==='light'?'☀':'◐';};
paintTheme();
if(themeBtn)themeBtn.addEventListener('click',()=>{const t=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem('mael-theme',t)}catch(e){}paintTheme();});

/* ── Supabase ── */
async function sb(path,opts={}){
  const r=await fetch(SB_URL+'/rest/v1'+path,{...opts,cache:'no-store',headers:{apikey:SB_KEY,Authorization:'Bearer '+SB_KEY,'Content-Type':'application/json',Prefer:'return=minimal',...(opts.headers||{})}});
  if(!r.ok) throw new Error('db '+r.status);
  return opts.method==='POST'?null:r.json();
}
const latestRow=async()=>(await sb('/gold_prices?order=fetched_at.desc&limit=1&select=fetched_at,price_24k,raw_json'))[0]||null;
async function rowBefore(ms){
  const t=new Date(Date.now()-ms).toISOString();
  return (await sb(`/gold_prices?fetched_at=lte.${t}&order=fetched_at.desc&limit=1&select=price_24k,fetched_at`))[0]||null;
}
function saveRow(g24,usd,sourceAt){
  return sb('/gold_prices',{method:'POST',body:JSON.stringify({currency:'AED',
    price_24k:+g24.toFixed(4),price_22k:+(g24*22/24).toFixed(4),price_21k:+(g24*21/24).toFixed(4),price_18k:+(g24*18/24).toFixed(4),
    price_troy:+(g24*TROY).toFixed(4),raw_json:{priceUSD:usd,usdToAed:AED,source:'browser',sourceAt:sourceAt||null}})});
}

/* ── Live price ── */
async function fetchLive(){
  const r=await fetch('https://api.gold-api.com/price/XAU',{cache:'no-store'});
  if(!r.ok) throw new Error('gold-api '+r.status);
  const d=await r.json();
  if(!(d.price>500)) throw new Error('bad price');
  if(!epoch(d.updatedAt))throw new Error('missing source timestamp');
  return {g24:d.price*AED/TROY,usd:d.price,at:d.updatedAt||null,sourceAt:d.updatedAt||null,fetchedAt:new Date().toISOString(),storedAt:null};
}

async function getPrice(){
  let cached=null;
  try{cached=await latestRow();}catch(e){}
  const stored=cached?{g24:+cached.price_24k,at:cached.raw_json?.sourceAt||cached.fetched_at,sourceAt:cached.raw_json?.sourceAt||null,storedAt:cached.fetched_at,fetchedAt:new Date().toISOString()}:null;
  if(stored&&priceState(stored).state==='LIVE')return stored;
  try{
    const live=await fetchLive();
    saveRow(live.g24,live.usd,live.sourceAt).catch(()=>{});
    return live;
  }catch(e){
    if(stored) return stored;
    throw e;
  }
}

/* ── Render ── */
// data-p: سعر قابل للتحديث. data-m="ag" للفضة (data-f = النقاء)، غير كده ذهب (data-k = العيار)
// data-cur: aed (افتراضي) | usd | inr | pkr ...
G.ag=+(window.__AG||0)||null;G.agAt=epoch(window.__AG_AT); G.fx=window.__FX||{};G.fxAt=epoch(window.__FX_AT);statusPrice();
// عملات مربوطة بالدولار بسعر ثابت (رسمي). الدينار الكويتي مش مربوط فبييجي من سعر الصرف اليومي
const PEG={USD:1,AED:3.6725,SAR:3.75,QAR:3.64,OMR:0.3845,BHD:0.376,JOD:0.709};
const rate=c=>PEG[c.toUpperCase()]||(G.fxAt&&Date.now()-G.fxAt<=4*86400000&&G.fxAt-Date.now()<=2*60000?G.fx[c.toUpperCase()]||null:null);

/* ── الدولة المختارة من القائمة اللي فوق ── */
const CTRY={AED:'',SAR:'saudi',KWD:'kuwait',QAR:'qatar',OMR:'oman',BHD:'bahrain',EGP:'egypt',INR:'india',PKR:'pakistan',BDT:'bangladesh',TRY:'turkey',USD:'usa',GBP:'uk',CAD:'canada',AUD:'australia',PHP:'philippines',MYR:'malaysia',NPR:'nepal',ZAR:'southafrica',IQD:'iraq',JOD:'jordan',MAD:'morocco',DZD:'algeria',IDR:'indonesia',THB:'thailand',VND:'vietnam',SGD:'singapore',LKR:'srilanka',EUR:'germany',JPY:'japan',CHF:'switzerland',NGN:'nigeria',GHS:'ghana',KES:'kenya',MXN:'mexico',BRL:'brazil',CNY:'china',LBP:'lebanon',TND:'tunisia',LYD:'libya',YER:'yemen'};
const DEC={AED:2,SAR:2,QAR:2,KWD:3,OMR:3,BHD:3,EGP:0,INR:0,PKR:0,BDT:0,TRY:0,USD:2,GBP:2,CAD:2,AUD:2,PHP:0,MYR:2,NPR:0,ZAR:2,IQD:0,JOD:3,MAD:2,DZD:0,IDR:0,THB:2,VND:0,SGD:2,LKR:0,EUR:2,JPY:0,CHF:2,NGN:0,GHS:2,KES:0,MXN:2,BRL:2,CNY:2,LBP:0,TND:2,LYD:2,YER:0};
const NAME={AED:'درهم',SAR:'ريال',KWD:'دينار',QAR:'ريال',OMR:'ريال',BHD:'دينار',EGP:'جنيه',INR:'روبية',PKR:'روبية باكستانية',BDT:'تاكا',TRY:'ليرة',USD:'دولار',GBP:'إسترليني',CAD:'دولار كندي',AUD:'دولار أسترالي',PHP:'بيسو',MYR:'رينغيت',NPR:'روبية نيبالية',ZAR:'راند',IQD:'دينار عراقي',JOD:'دينار أردني',MAD:'درهم مغربي',DZD:'دينار جزائري',IDR:'روبية إندونيسية',THB:'باهت',VND:'دونغ',SGD:'دولار سنغافوري',LKR:'روبية سريلانكية',EUR:'يورو',JPY:'ين',CHF:'فرنك سويسري',NGN:'نايرا',GHS:'سيدي',KES:'شلن',MXN:'بيسو مكسيكي',BRL:'ريال برازيلي',CNY:'يوان',LBP:'ليرة لبنانية',TND:'دينار تونسي',LYD:'دينار ليبي',YER:'ريال يمني'};
// دول صفحاتها إنجليزي بس: التحويل من الصفحات العربية يروح للنسخة الإنجليزية بدل 404
const EN_ONLY={INR:1,PKR:1,BDT:1,TRY:1,USD:1,GBP:1,CAD:1,AUD:1,PHP:1,MYR:1,NPR:1,ZAR:1,IDR:1,THB:1,VND:1,SGD:1,LKR:1,EUR:1,JPY:1,CHF:1,NGN:1,GHS:1,KES:1,MXN:1,BRL:1,CNY:1};
const BD=document.body.dataset;
// دول بتشارك نفس العملة (اليورو): القائمة فيها ألمانيا لكن الصفحات دي عملتها يورو برضه
const EXTRA_SLUGS={france:'EUR',italy:'EUR',spain:'EUR'};
// صفحة خاصة بدولة (الرئيسية وعيار 21 و24 لكل دولة): عملتها ثابتة
const PAGE_CUR=BD.silverCountry?(BD.silverCountry==='egypt'?'EGP':'SAR'):BD.ctry?(BD.ctry==='uae'?'AED':(Object.keys(CTRY).find(k=>CTRY[k]===BD.ctry)||EXTRA_SLUGS[BD.ctry])):null;
// صفحات عملتها ثابتة: صفحات الدول + صفحات فيها أرقام ثابتة (الأرشيف، المقارنة، الروبية...)
const FIXED=!!PAGE_CUR||BD.fixed==='1';
// صفحات الدولار: تغيير الدولة ينقل لصفحة دولار الدولة الجديدة بدل صفحة الذهب
const DPG=BD.dollar==='1';
let SAVED=null;try{SAVED=localStorage.getItem('cur');}catch(e){}
let SEL=PAGE_CUR||(CTRY.hasOwnProperty(SAVED)?SAVED:'AED');
const pageFor=c=>BD.silverCountry&&['EGP','SAR','AED'].includes(c)?(EN?'/en/':'/')+(c==='AED'?'silver/':'silver-'+(c==='EGP'?'egypt':'saudi')+'/'):((EN||EN_ONLY[c])?'/en/':'/')+(DPG?'dollar-'+(c==='AED'?'uae':CTRY[c])+'/':(CTRY[c]?CTRY[c]+'/':''))+(DPG?'':BD.sub?BD.sub+'/':'');
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
// دول بتشارك عملة غيرها (فرنسا/إيطاليا/إسبانيا باليورو): اعرض اسم الدولة الصح في القائمة بدل ألمانيا
const EURP={france:['فرنسا','France'],italy:['إيطاليا','Italy'],spain:['إسبانيا','Spain']};
if(csel){
  csel.value=SEL;
  if(EXTRA_SLUGS[BD.ctry]&&EURP[BD.ctry]){const o=[...csel.options].find(op=>op.value===EXTRA_SLUGS[BD.ctry]);if(o)o.textContent=EN?EURP[BD.ctry][1]:EURP[BD.ctry][0];}
  csel.addEventListener('change',()=>{
    const c=csel.value;try{localStorage.setItem('cur',c);}catch(e){}
    if(PAGE_CUR||DPG){location.href=pageFor(c);return;}
    SEL=c;
    if(!G.fx[c]&&!{AED:1,USD:1,SAR:1,QAR:1,OMR:1,BHD:1,JOD:1}[c]) loadFX(true);
    syncCalcCur();paint();labels();calc();zakat();nisab();
  });
}
const modeSel=$('#price-mode');
if(modeSel)modeSel.addEventListener('change',()=>{
  const code=csel&&csel.value;
  const c=code&&Object.prototype.hasOwnProperty.call(CTRY,code)?(CTRY[code]||'uae'):(BD.ctry||'uae');
  const base=(EN||EN_ONLY[code])?'/en/':'/';
  location.href=base+(modeSel.value==='dollar'?(c==='usa'?'dollar/':'dollar-'+c+'/'):(c==='uae'?'':c+'/'));
});
// قائمة اللغات: تنتقل للرابط المحسوب لكل لغة في الصفحة (window.__LANGURLS)
const lsel=$('#langsel');
if(lsel) lsel.addEventListener('change',()=>{const u=(window.__LANGURLS||{})[lsel.value];if(u)location.href=u;});
function syncCalcCur(){const cs=$('#c-cur');if(cs&&!FIXED&&cs.value!==SEL&&[...cs.options].some(o=>o.value===SEL)){cs.value=SEL;cs.dispatchEvent(new Event('change',{bubbles:true}));}}
syncCalcCur();
const calcSelect=$('#c-cur');if(calcSelect)calcSelect.addEventListener('change',()=>{if($('#c-rate'))$('#c-rate').value='';if($('#c-mtype').value!=='percent')$('#c-mc').value='0';$('#c-tax-rate').value='0';if($('#c-discount'))$('#c-discount').value='0';});
const calcCountry=new URLSearchParams(location.search).get('country');
if(calcCountry&&$('#c-cur')){const co=[...$('#c-cur').options].find(o=>o.dataset.market===calcCountry);if(co)co.selected=true;}
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
    if(cur!=='aed'){const r=rate(cur);if(r) v=v/AED*r; else if(auto) ok=false; else {el.textContent='—';return;}}
    const d=el.dataset.d!=null?+el.dataset.d:(v>=100000?0:(auto&&ok?DEC[SEL]:2));
    el.textContent=fmt(v,d);
  });
  silverToolsUpdate();
}
function render(p){
  Object.assign(G,p);G.at=epoch(p.sourceAt);G.displayedAt=new Date().toISOString();statusPrice();
  paint();
  $$('[data-upd]').forEach(el=>el.textContent=p.sourceAt?dubaiTime(p.sourceAt):(EN?'Source time unavailable':'وقت المصدر غير متاح'));
  nisab();labels();
  calc();zakat();if(window.GoldAlerts)window.GoldAlerts.check();
}
async function loadSilver(){
  if(!$('[data-m="ag"]')) return;
  try{
    const r=await fetch('https://api.gold-api.com/price/XAG',{cache:'no-store'});
    if(!r.ok)throw Error('silver '+r.status);const d=await r.json();
    if(d.price>1){G.ag=d.price*AED/TROY;G.agAt=epoch(d.updatedAt);statusPrice();paint();silverToolsUpdate();$$('[data-upd-ag]').forEach(el=>el.textContent=d.updatedAt?dubaiTime(d.updatedAt):(EN?'Source time unavailable':'وقت المصدر غير متاح'));}
  }catch(e){}
}
async function loadFX(force){
  if(G.fxLoading)return;
  if(!force&&!$$('[data-fxd]').length&&!$('#fx-tool')&&!$$('[data-egp]').length&&!(!PEG[SEL]&&!FIXED&&SEL)&&![...$$('[data-cur]'),...$$('#c-cur option')].some(el=>!PEG[(el.dataset.cur||el.value||'').toUpperCase()])) return;
  G.fxLoading=true;
  try{
    const d=await (await fetch('https://open.er-api.com/v6/latest/USD')).json();
    if(d.rates){if(DPG)$$('[data-upd]').forEach(el=>el.textContent=d.time_last_update_unix?dubaiTime(d.time_last_update_unix*1000):(EN?'Source time unavailable':'وقت المصدر غير متاح'));G.fx=d.rates;G.fxAt=Number(d.time_last_update_unix)*1000||0;G.fxFetchedAt=Date.now();statusPrice();if(window.GoldAlerts)window.GoldAlerts.check();paint();labels();nisab();calc();zakat();dconv('usd');silverToolsUpdate();fxToolUpdate();meltToolUpdate();$$('[data-fx]').forEach(el=>{const v=d.rates[el.dataset.fx];if(v) el.textContent=fmt(v/AED,4);});$$('[data-fxd]').forEach(el=>{const v=d.rates[el.dataset.fxd];if(v){const w=+(el.dataset.w||1);el.textContent=fmt(el.dataset.i?w/v:v*w,+el.dataset.d||0);}});}
  }catch(e){}finally{G.fxLoading=false;}
}

function renderChange(pct,baselineAt){
  $$('[data-chg]').forEach(el=>{
    const dir=pct>0.005?'up':pct<-0.005?'dn':'fl';
    el.className='chg '+dir;
    el.textContent=(dir==='up'?'▲ ':dir==='dn'?'▼ ':'● ')+Math.abs(pct).toFixed(2)+'%'+(EN?' vs stored quote':' مقارنة بسعر محفوظ');
    el.title=(EN?'Stored baseline: ':'المرجع المحفوظ: ')+(baselineAt?dubaiTime(baselineAt):'—');el.hidden=false;
  });
}

async function load(){
  const btn=$('#refresh');
  if(btn){btn.disabled=true;btn.textContent=T.refreshing;}
  const err=$('#price-error');
  if(err)err.hidden=true;
  try{
    if(DPG){await loadFX(true);return;}
    const p=await getPrice();
    render(p);
    const status=priceState(G);
    if(err){err.hidden=status.state==='LIVE';if(!err.hidden)err.textContent=priceLabel(status.state,EN?'en':'ar');}
    try{const old=await rowBefore(24*3600*1000);if(old) renderChange((p.g24-old.price_24k)/old.price_24k*100,old.fetched_at);}catch(e){}
  }catch(e){
    G.stale=!priceState(G).usable;statusPrice();if(window.GoldAlerts)window.GoldAlerts.check();
    if(err){err.hidden=false;err.textContent=EN?'Refresh failed. '+priceLabel(priceState(G).state,'en'):'تعذر التحديث. '+priceLabel(priceState(G).state,'ar');}
    if(G.g24){paint();labels();nisab();calc();zakat();}
  }finally{
    if(btn){btn.disabled=false;btn.textContent='↻ '+T.refresh;}
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

/* ── Dollar converter (two-way, dollar pages) ── */
function dconv(dir){
  const box=$('#dcv');if(!box)return;
  const sel=$('#dcv-cur');
  const o=sel?sel.selectedOptions[0]:null;
  const code=o?o.value:box.dataset.code;
  const r=rate(code);
  if(!r){const other=$(dir==='loc'?'#dcv-usd':'#dcv-loc');if(other)other.value='';return;}
  const d=+(o?o.dataset.d:box.dataset.d)||0;
  const usd=$('#dcv-usd'),loc=$('#dcv-loc');if(!usd||!loc)return;
  const lbl=$('#dcv-locl');if(lbl&&o)lbl.textContent=o.textContent;
  if(dir==='loc'){const v=parseFloat(loc.value);usd.value=isFinite(v)?+(v/r).toFixed(2):'';}
  else{const v=parseFloat(usd.value);loc.value=isFinite(v)?+(v*r).toFixed(d):'';}
}
/* ── Gold calculator ── */
function setText(id,v){const el=document.getElementById(id);if(el) el.textContent=v;}
function calc(){
  if(!$('#calc')) return;
  if([...$('#calc').querySelectorAll('input')].some(el=>!el.validity.valid)){['c-pg','c-gold','c-make','c-tax','c-total','c-usd','c-discount-total','c-final-gram'].forEach(id=>setText(id,'—'));setText('c-rate-source',EN?'Check your inputs: values cannot be negative; tax must be between 0 and 100%.':'راجع المدخلات: لا تقبل القيم السالبة، والضريبة من صفر إلى 100%.');return;}
  const sel=$('#c-cur'),opt=sel?sel.options[sel.selectedIndex]:null;
  const cur=opt?opt.value:'AED',dp=opt?+(opt.dataset.d||2):2,r=rate(cur);
  $$('.c-curl').forEach(el=>el.textContent=cur);
  const quoted=num('c-rate'),w=num('c-w'),k=+$('#c-k').value,mc=num('c-mc');
  const pg=quoted>0?quoted:(G.g24&&r?G.g24*k/24/AED*r:0);
  setText('c-rate-source',quoted>0?(EN?'Using your shop gram price for the selected karat.':'يُستخدم سعر غرام المحل للعيار المختار.'):(EN?'Using the indicative raw gold rate. Check the source status and FX timestamp.':'يُستخدم سعر الذهب الخام المرجعي. راجع حالة المصدر وتاريخ الصرف.'));
  if(!quoted&&!priceState(G).usable){['c-pg','c-gold','c-make','c-tax','c-total','c-usd','c-discount-total','c-final-gram'].forEach(id=>setText(id,'—'));setText('c-rate-source',EN?'Automatic estimate paused: the gold source time is missing or older than 15 minutes. Enter a shop gram quote to calculate manually.':'توقف التقدير التلقائي: وقت المصدر مفقود أو أقدم من 15 دقيقة. أدخل سعر المحل للحساب اليدوي.');return;}
  if(!pg){['c-pg','c-gold','c-make','c-tax','c-total','c-usd','c-discount-total','c-final-gram'].forEach(id=>setText(id,'—'));return;}
  const gold=pg*w,mode=$('#c-mtype').value,make=mode==='piece'?mc:mode==='percent'?gold*mc/100:mc*w;
  const base=$('#c-tax-base').value,taxable=base==='making'?make:base==='gold'?gold:gold+make;
  const tax=taxable*Math.min(num('c-tax-rate'),100)/100,beforeDiscount=gold+make+tax;
  const discountMode=$('#c-discount-mode')?.value||'amount',discountInput=num('c-discount'),discount=Math.min(beforeDiscount,discountMode==='percent'?beforeDiscount*discountInput/100:discountInput),total=beforeDiscount-discount;
  setText('c-discount-total',fmt(discount,dp));setText('c-final-gram',w>0?fmt(total/w,dp):'—');
  setText('c-pg',fmt(pg,dp));setText('c-gold',fmt(gold,dp));setText('c-make',fmt(make,dp));
  setText('c-tax',fmt(tax,dp));setText('c-total',fmt(total,dp));setText('c-usd',r?fmt(total/r):'—');
}

/* ── Zakat calculator ── */
function zakat(){
  if(!$('#zakat')||!G.g24) return;
  if(!priceState(G).usable){['z-val','z-amt'].forEach(id=>setText(id,'—'));return;}
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
document.addEventListener('input',e=>{if(e.target.closest('#calc'))calc();if(e.target.closest('#zakat'))zakat();if(e.target.closest('#dcv'))dconv(e.target.id==='dcv-loc'?'loc':'usd');});
document.addEventListener('change',e=>{if(e.target.closest('#calc'))calc();if(e.target.closest('#zakat'))zakat();if(e.target.closest('#dcv'))dconv('usd');});

function silverToolsUpdate(){
 const tool=$('#silver-tool');if(!tool)return;const currency=tool.dataset.silverCurrency,ref=silverReference(G,currency);
 const button=$('#sc-reference');button.disabled=ref==null;
 const ratio=$('[data-silver-ratio]');if(ratio)ratio.textContent=priceState(G).usable&&priceState({g24:G.ag,sourceAt:G.agAt}).usable?fmt(G.g24/G.ag,2):'—';
 const note=$('[data-silver-conversion]');if(note)note.textContent=(EN?'Conversion: ':'التحويل: ')+(ref==null?(EN?'reference unavailable or stale; use a manual dealer quote.':'المرجع غير متاح أو قديم؛ استخدم عرضاً يدوياً من البائع.'):(currency==='SAR'?(EN?'SAR 3.75 per USD reference peg.':'مرجع الربط 3.75 ريال للدولار.'):(EN?'daily EGP reference, not a bank or cash-market quote.':'مرجع يومي للجنيه، ليس سعر بنك أو سوق نقدي.')));
 const fxTime=$('[data-silver-fx-time]');if(fxTime)fxTime.textContent=currency==='SAR'?(EN?'Reference peg 3.75 SAR/USD':'مرجع الربط 3.75 ريال/دولار'):(G.fxAt?new Date(G.fxAt).toLocaleString(EN?'en-GB':'ar-EG',{timeZone:document.body.dataset.marketZone,timeZoneName:'short'}):'—');
 if(ref==null)$$('[data-m="ag"][data-cur="'+currency.toLowerCase()+'"]').forEach(e=>e.textContent='—');
}
const silverForm=$('#silver-form');
if(silverForm){
 $('#sc-reference').addEventListener('click',()=>{const r=silverReference(G,$('#silver-tool').dataset.silverCurrency);if(r==null){silverToolsUpdate();return;}$('#sc-rate').value=r.toFixed(6);$('#sc-status').textContent=EN?'Reference copied. Check the invoice and enter making charges and actual tax.':'تم نسخ المرجع. راجع الفاتورة وأدخل المصنعية والضريبة الفعلية.';});
 silverForm.addEventListener('submit',e=>{e.preventDefault();try{const val=id=>{const v=$('#sc-'+id).value.trim();return v===''?NaN:Number(v)},r=silverInvoice({weight:val('weight'),purity:val('purity'),rate:val('rate'),making:val('making'),tax:val('tax'),taxBase:$('#sc-tax-base').value}),cur=$('#silver-tool').dataset.silverCurrency;
 $('#sc-results').innerHTML='<dl class="quote-result-rows">'+[['fineWeight',EN?'Fine silver weight (g)':'وزن الفضة الخالص (غرام)'],['metal',EN?'Metal value':'قيمة المعدن'],['making',EN?'Making charge':'المصنعية'],['taxAmount',EN?'Tax':'الضريبة'],['total',EN?'Total':'الإجمالي']].map(([k,label])=>'<dt>'+label+'</dt><dd data-sc-result="'+k+'">'+fmt(r[k],k==='fineWeight'?3:2)+(k==='fineWeight'?'':' '+cur)+'</dd>').join('')+'</dl>';
 }catch{ $('#sc-results').textContent=EN?'Check positive weight/rate and valid making charges, purity and tax.':'راجع الوزن والسعر الموجبين والمصنعية والنقاء والضريبة.';}});
 silverForm.addEventListener('input',()=>{$('#sc-results').textContent='';});
 silverToolsUpdate();setInterval(silverToolsUpdate,30000);
}

function fxToolUpdate(){
 $$('[data-egp]').forEach(el=>{const r=egpReference(G,el.dataset.egp);el.textContent=r==null?'—':fmt(r*(+el.dataset.w||1),+el.dataset.d||2);});
 const st=egpReference(G,'SAR')!=null;$$('[data-asset-state="fx"]').forEach(el=>{el.textContent=(EN?'Daily reference FX, check source time':'سعر صرف مرجعي يومي، راجع وقت المصدر')+' · '+(st?'DELAYED':'STALE');});
 $$('[data-provenance="fxAt"]').forEach(el=>{el.textContent=G.fxAt?new Date(G.fxAt).toLocaleString(EN?'en-GB':'ar-EG',{timeZone:'Africa/Cairo',timeZoneName:'short'}):'—';});
 const tool=$('#fx-tool');if(!tool)return;const ref=egpReference(G,tool.dataset.fxCur);$('#fx-reference').disabled=ref==null;
}
const fxForm=$('#fx-form');
if(fxForm){
 const tool=$('#fx-tool'),cur=tool.dataset.fxCur;
 $('#fx-reference').addEventListener('click',()=>{const r=egpReference(G,cur);if(r==null){fxToolUpdate();return;}$('#fx-rate').value=r.toFixed(4);$('#fx-status').textContent=EN?'Reference copied. It is a daily reference, not your provider rate. Enter your fees.':'تم نسخ المرجع. هو مرجع يومي مش سعر جهة التحويل. أدخل الرسوم.';});
 fxForm.addEventListener('submit',e=>{e.preventDefault();try{const val=id=>{const v=$('#fx-'+id).value.trim();return v===''?NaN:Number(v)},dir=$('#fx-dir').value,r=fxConvert({amount:val('amount'),rate:val('rate'),feePct:val('pct'),flatFee:val('flat'),direction:dir}),inC=dir==='from'?cur:'EGP',outC=dir==='from'?'EGP':cur;
 $('#fx-results').innerHTML='<dl class="quote-result-rows">'+[['fee',EN?'Total fees':'إجمالي الرسوم',inC],['net',EN?'Amount converted after fees':'المبلغ المحوّل بعد الرسوم',inC],['result',EN?'You receive (estimate)':'المستلم (تقدير)',outC]].map(([k,l,u])=>'<dt>'+l+'</dt><dd data-fx-result="'+k+'">'+fmt(r[k],2)+' '+u+'</dd>').join('')+'</dl>';
 }catch(err){$('#fx-results').textContent=err.message==='fees'?(EN?'Fees are as large as the amount. Check the fee fields.':'الرسوم تساوي المبلغ أو تزيد عليه. راجع خانات الرسوم.'):(EN?'Check a positive amount and rate, a fee between 0 and 100%, and a non-negative flat fee.':'راجع مبلغاً وسعراً موجبين، ونسبة بين 0 و100، ورسماً ثابتاً غير سالب.');}});
 fxForm.addEventListener('input',()=>{$('#fx-results').textContent='';});
 fxForm.addEventListener('change',()=>{$('#fx-results').textContent='';});
}
fxToolUpdate();setInterval(fxToolUpdate,30000);

function meltToolUpdate(){
 const tool=$('#melt-tool');if(!tool)return;const cur=tool.dataset.meltCur,ref=goldSpotRef(G,cur);$('#mv-reference').disabled=ref==null;
 const n=$('[data-melt-ref]');if(n)n.textContent=ref==null?(EN?'Reference spot unavailable or stale. Enter a spot price from your own source.':'Reference unavailable.'):('Reference spot (Gold-API XAU, '+cur+' per troy ounce): '+fmt(ref,2)+' · '+(priceState(G).state)+'. Not a dealer price.');
}
const meltForm=$('#melt-form');
if(meltForm){
 const cur=$('#melt-tool').dataset.meltCur;
 $('#mv-preset').addEventListener('change',()=>{if($('#mv-preset').value!=='custom')$('#mv-fine').value=$('#mv-preset').value;});
 $('#mv-fine').addEventListener('input',()=>{$('#mv-preset').value='custom';});
 $('#mv-reference').addEventListener('click',()=>{const r=goldSpotRef(G,cur);if(r==null){meltToolUpdate();return;}$('#mv-spot').value=r.toFixed(2);$('#mv-status').textContent='Reference copied. It is a reference quote, not a buyer offer. Enter your buyer payout percentage.';});
 meltForm.addEventListener('submit',e=>{e.preventDefault();try{const v=id=>{const x=$('#mv-'+id).value.trim();return x===''?NaN:Number(x)},r=meltValue({weight:v('weight'),unit:$('#mv-unit').value,fineness:v('fine'),spot:v('spot'),payoutPct:v('payout')});
 $('#mv-results').innerHTML='<dl class="quote-result-rows">'+[['grams','Item weight (g)',fmt(r.grams,3)],['fineG','Pure gold (g)',fmt(r.fineG,3)],['fineOz','Pure gold (troy oz)',fmt(r.fineOz,4)],['melt','Melt value',fmt(r.melt,2)+' '+cur],['payout','Estimated payout at your %',fmt(r.payout,2)+' '+cur],['gap','Gap to melt',fmt(r.gap,2)+' '+cur]].map(([k,l,x])=>'<dt>'+l+'</dt><dd data-mv-result="'+k+'">'+x+'</dd>').join('')+'</dl>';
 }catch{$('#mv-results').textContent='Check a positive weight, fineness up to 1000, a positive spot price and a payout between 0 and 200%.';}});
 meltForm.addEventListener('input',()=>{$('#mv-results').textContent='';});
}
meltToolUpdate();setInterval(meltToolUpdate,30000);

const rb=$('#refresh');if(rb) rb.addEventListener('click',load);

// نعرض الأسعار المكتوبة في الصفحة بعملة الدولة المختارة فوراً، قبل ما السعر المباشر يوصل
paint();labels();nisab();
load();spark();loadSilver();loadFX();
setInterval(()=>{load();loadSilver();if(window.GoldAlerts?.hasActive()&&Date.now()-(G.fxFetchedAt||0)>6*3600000)loadFX(true);},CACHE_MS);

/* Weight conversion loads only on its own pages. */
if(document.getElementById('weight-tool')){const s=document.createElement('script');s.src='/assets/weight.js?v='+(document.body.dataset.avWeight||'');document.head.appendChild(s);}
/* Resale arithmetic loads only on its own pages. */
if(document.getElementById('resale-tool')){const s=document.createElement('script');s.src='/assets/resale.js?v='+(document.body.dataset.avResale||'');document.head.appendChild(s);}

/* ── Device-only gold targets ── */
window.getGoldAlertSnapshot=()=>({g24:G.g24,at:epoch(G.sourceAt),sourceAt:G.sourceAt||null,fetchedAt:G.fetchedAt||null,storedAt:G.storedAt||null,displayedAt:G.displayedAt||null,state:priceState(G).state,stale:!priceState(G).usable,fx:G.fx||{},fxAt:G.fxAt||0,ag:G.ag||null,agAt:G.agAt||0});
window.ensureGoldAlertRates=()=>loadFX(true);
window.ensureGoldAssistantRates=async()=>{await Promise.all([G.fxAt&&Date.now()-G.fxAt<86400000?Promise.resolve():loadFX(true),G.agAt&&Date.now()-G.agAt<CACHE_MS?Promise.resolve():loadSilver()]);};
try{if(document.getElementById('price-alerts')||(JSON.parse(localStorage.getItem('mael-gold-alerts-v1')||'[]')||[]).length){const script=document.createElement('script');script.src='/assets/alerts.js?v='+(document.body.dataset.avAlerts||'');document.head.appendChild(script);}}catch{}

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

/* ── المساعد العائم: زر المحادثة أسفل الشاشة ── */
const chatFab=$('#chat-fab'),chatPanel=$('#chat-panel');
if(chatFab&&chatPanel){
  const loadJs=src=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});
  let chatReady=false,chatLoading=false;
  const openChat=async()=>{
    chatPanel.hidden=false;chatFab.setAttribute('aria-expanded','true');
    if(!chatReady&&!chatLoading){
      chatLoading=true;
      try{
        if(!window.GoldAssistant){
          const av=document.body.dataset;
          await loadJs('/assets/assistant-kb.js?v='+(av.avKb||''));
          await loadJs('/assets/assistant.js?v='+(av.avAssist||''));
        }
        if(window.GoldAssistant){window.GoldAssistant.mount(chatPanel);chatReady=true;}
      }catch(e){}
      chatLoading=false;
    }
    const inp=chatPanel.querySelector('.chat-in');
    if(inp)setTimeout(()=>inp.focus(),60);
  };
  const closeChat=()=>{chatPanel.hidden=true;chatFab.setAttribute('aria-expanded','false');};
  chatFab.addEventListener('click',()=>chatPanel.hidden?openChat():closeChat());
  const cx=chatPanel.querySelector('.chat-close');
  if(cx)cx.addEventListener('click',closeChat);
  /* رفع الزر فوق بانر التثبيت عند ظهوره */
  new MutationObserver(()=>document.body.classList.toggle('ib',!!document.getElementById('install-banner'))).observe(document.body,{childList:true});
}
})();
