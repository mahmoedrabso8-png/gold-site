// Timestamp policy for indicative gold quotes. A successful HTTP response is not freshness.
// All times are ISO strings or epoch milliseconds. Unknown source time is never LIVE.
export const PRICE_WINDOWS=Object.freeze({liveMs:5*60000,delayedMs:15*60000,futureToleranceMs:2*60000});
export function epoch(value){if(value==null||value==='')return 0;const n=typeof value==='number'?value:Date.parse(value);return Number.isFinite(n)&&n>0?n:0;}
// Global spot gold trades Sunday evening to Friday evening. Approximation in UTC (exact in winter, one hour off in US summer time).
export function marketClosed(now=Date.now()){const d=new Date(now),day=d.getUTCDay(),m=d.getUTCHours()*60+d.getUTCMinutes();return day===6||(day===5&&m>=22*60)||(day===0&&m<23*60);}
export const CLOSED_MAX_AGE_MS=72*3600000;
export function priceState(quote,now=Date.now()){
 if(!quote||!Number.isFinite(quote.g24)||quote.g24<=0)return {state:'UNAVAILABLE',sourceAt:null,ageMs:null,usable:false};
 const at=epoch(quote.sourceAt),age=at?now-at:null;
 if(!at||age < -PRICE_WINDOWS.futureToleranceMs)return {state:'STALE',sourceAt:at||null,ageMs:age,usable:false};
 if(marketClosed(now)&&age<=CLOSED_MAX_AGE_MS)return {state:'CLOSED',sourceAt:at,ageMs:Math.max(0,age),usable:true};
 const state=age<=PRICE_WINDOWS.liveMs?'LIVE':age<=PRICE_WINDOWS.delayedMs?'DELAYED':'STALE';
 return {state,sourceAt:at,ageMs:Math.max(0,age),usable:state==='LIVE'||state==='DELAYED'};
}
export function priceLabel(state,lang='en',sourceAt){
 const labels=lang==='ar'?{LIVE:'LIVE · سعر مرجعي حديث',DELAYED:'DELAYED · سعر مرجعي متأخر',STALE:'STALE · آخر سعر محفوظ، ليس مباشراً',UNAVAILABLE:'UNAVAILABLE · السعر غير متاح',CLOSED:'آخر إغلاق · السوق العالمي مغلق في عطلة الأسبوع، وهذا آخر سعر مرجعي'}:{LIVE:'LIVE · recent reference quote',DELAYED:'DELAYED · delayed reference quote',STALE:'STALE · saved quote, not live',UNAVAILABLE:'UNAVAILABLE · no quote available',CLOSED:'LAST CLOSE · global gold market closed for the weekend, last reference quote'};
 let out=labels[state]||labels.UNAVAILABLE;
 if(state==='CLOSED'){const t=epoch(sourceAt);if(t){try{out+=' · '+new Intl.DateTimeFormat(lang==='ar'?'ar-EG':'en-GB',{timeZone:'Africa/Cairo',dateStyle:'medium',timeStyle:'short'}).format(new Date(t))+(lang==='ar'?' بتوقيت القاهرة':' Cairo time');}catch(e){}}}
 return out;
}
