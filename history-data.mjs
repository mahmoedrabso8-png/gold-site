import fs from 'node:fs/promises';
const CODES='AED SAR KWD QAR OMR BHD EGP INR PKR BDT TRY USD GBP CAD AUD PHP MYR NPR ZAR IQD JOD MAD DZD IDR THB VND SGD LKR EUR JPY CHF NGN GHS KES MXN BRL CNY LBP TND LYD YER'.split(' ');
function validRows(data,from,to){
 if(!Array.isArray(data?.rows))return [];
 return data.rows.filter(r=>/^\d{4}-\d{2}-\d{2}$/.test(r.day)&&r.day>=from&&r.day<=to&&Number.isFinite(r.usdGram)&&r.usdGram>0&&r.fx&&typeof r.fx==='object').map(r=>({day:r.day,usdGram:r.usdGram,fx:Object.fromEntries(CODES.filter(c=>Number.isFinite(r.fx[c])&&r.fx[c]>0).map(c=>[c,r.fx[c]]))}));
}
async function json(url){const r=await fetch(url,{signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('HTTP '+r.status);return r.json();}
export async function loadCountryHistory(asOf){
 const start=new Date(asOf+'T00:00:00Z');start.setUTCFullYear(start.getUTCFullYear()-1);const from=start.toISOString().slice(0,10),map=new Map();
 try{for(const r of validRows(JSON.parse(await fs.readFile('data/gold-history.json','utf8')),from,asOf))map.set(r.day,r);}catch(e){console.warn('History seed unavailable:',e.message);}
 // Carry forward prior deployments so the rolling year grows without committing generated data or changing posting workflows.
 try{for(const r of validRows(await json('https://www.maelumatii.com/assets/gold-history.json'),from,asOf))map.set(r.day,r);}catch{}
 const missing=[];for(let d=new Date(start);d.toISOString().slice(0,10)<=asOf;d.setUTCDate(d.getUTCDate()+1)){const day=d.toISOString().slice(0,10);if(!map.has(day))missing.push(day);}
 async function daily(day){
  for(const base of [`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${day}`,`https://${day}.currency-api.pages.dev`]){
   try{const j=await json(base+'/v1/currencies/usd.min.json');if(j.date!==day||!(j.usd?.xau>0&&j.usd.xau<1))continue;
    const fx=Object.fromEntries(CODES.filter(c=>Number.isFinite(j.usd[c.toLowerCase()])&&j.usd[c.toLowerCase()]>0).map(c=>[c,j.usd[c.toLowerCase()]]));
    map.set(day,{day,usdGram:+(1/j.usd.xau/31.1035).toFixed(8),fx});return;
   }catch{}
  }
 }
 for(let i=0;i<missing.length;i+=6)await Promise.all(missing.slice(i,i+6).map(daily));
 const rows=[...map.values()].sort((a,b)=>a.day.localeCompare(b.day));
 console.log('country history:',rows.length,'daily snapshots;',missing.filter(d=>!map.has(d)).length,'missing dates');
 return {source:'https://github.com/fawazahmed0/exchange-api/',method:'Daily XAU and same-date USD FX snapshots. Indicative raw gold, not retail quotes.',rows};
}
