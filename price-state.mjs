// Timestamp policy for indicative gold quotes. A successful HTTP response is not freshness.
// All times are ISO strings or epoch milliseconds. Unknown source time is never LIVE.
export const PRICE_WINDOWS=Object.freeze({liveMs:5*60000,delayedMs:15*60000,futureToleranceMs:2*60000});
export function epoch(value){if(value==null||value==='')return 0;const n=typeof value==='number'?value:Date.parse(value);return Number.isFinite(n)&&n>0?n:0;}
export function priceState(quote,now=Date.now()){
 if(!quote||!Number.isFinite(quote.g24)||quote.g24<=0)return {state:'UNAVAILABLE',sourceAt:null,ageMs:null,usable:false};
 const at=epoch(quote.sourceAt),age=at?now-at:null;
 if(!at||age < -PRICE_WINDOWS.futureToleranceMs)return {state:'STALE',sourceAt:at||null,ageMs:age,usable:false};
 const state=age<=PRICE_WINDOWS.liveMs?'LIVE':age<=PRICE_WINDOWS.delayedMs?'DELAYED':'STALE';
 return {state,sourceAt:at,ageMs:Math.max(0,age),usable:state==='LIVE'||state==='DELAYED'};
}
export function priceLabel(state,lang='en'){
 const labels=lang==='ar'?{LIVE:'LIVE · سعر مرجعي حديث',DELAYED:'DELAYED · سعر مرجعي متأخر',STALE:'STALE · آخر سعر محفوظ، ليس مباشراً',UNAVAILABLE:'UNAVAILABLE · السعر غير متاح'}:{LIVE:'LIVE · recent reference quote',DELAYED:'DELAYED · delayed reference quote',STALE:'STALE · saved quote, not live',UNAVAILABLE:'UNAVAILABLE · no quote available'};
 return labels[state]||labels.UNAVAILABLE;
}
