// Local-only gold holdings. Costs stay in their entered currency; no cross-currency sum.
export const PORTFOLIO_VERSION=1;
export const PORTFOLIO_KEY='mael-gold-portfolio-v1';
export function validHolding(x,currencies){
 if(!x||typeof x!=='object'||typeof x.id!=='string'||!/^h-[a-z0-9-]{1,70}$/.test(x.id))return false;
 if(typeof x.note!=='string'||x.note.length>80||!currencies.includes(x.currency))return false;
 if(!/^\d{4}-\d{2}-\d{2}$/.test(x.date)||!Number.isFinite(Date.parse(x.date+'T00:00:00Z'))||new Date(x.date+'T00:00:00Z').toISOString().slice(0,10)!==x.date)return false;
 return Number.isFinite(x.weight)&&x.weight>0&&x.weight<=1e6&&[24,22,21,18,14,9].includes(x.karat)&&Number.isFinite(x.rate)&&x.rate>=0&&x.rate<=1e12&&Number.isFinite(x.making)&&x.making>=0&&x.making<=1e12&&Number.isFinite(x.fees)&&x.fees>=0&&x.fees<=1e12;
}
export function holdingCost(x){return x.weight*x.rate+x.making+x.fees;}
export function portfolioRead(raw,currencies){
 const data=JSON.parse(raw);if(!data||data.version!==PORTFOLIO_VERSION||!Array.isArray(data.holdings)||data.holdings.length>1000||!data.holdings.every(x=>validHolding(x,currencies))||new Set(data.holdings.map(x=>x.id)).size!==data.holdings.length)throw new Error('Invalid portfolio');
 return data.holdings.map(({id,note,date,currency,weight,karat,rate,making,fees})=>({id,note,date,currency,weight,karat,rate,making,fees}));
}
export function portfolioWrite(holdings){return JSON.stringify({version:PORTFOLIO_VERSION,holdings});}
export function portfolioSummary(holdings,quotes={}){
 const groups={};for(const h of holdings){const g=groups[h.currency]||(groups[h.currency]={currency:h.currency,count:0,weight:0,fineWeight:0,cost:0});g.count++;g.weight+=h.weight;g.fineWeight+=h.weight*h.karat/24;g.cost+=holdingCost(h);}
 return Object.values(groups).map(g=>{const q=quotes[g.currency],price=Number.isFinite(q)&&q>0?q:null,current=price===null?null:g.fineWeight*price;return {...g,averageFineGram:g.fineWeight?g.cost/g.fineWeight:null,current,gain:current===null?null:current-g.cost,gainPct:current===null||g.cost===0?null:(current/g.cost-1)*100};});
}
