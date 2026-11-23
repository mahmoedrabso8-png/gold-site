import {priceState} from './price-state.mjs';
export const MELT_UNITS={g:1,ozt:31.1034768,dwt:1.55517384};
export function goldSpotRef({g24,sourceAt,fx={},fxAt},cur,now=Date.now()){
 if(!priceState({g24,sourceAt},now).usable)return null;
 const usd=g24/3.6725*31.1035;
 if(cur==='USD')return usd;
 const ft=typeof fxAt==='number'?fxAt:Date.parse(fxAt),r=Number(fx[cur]);
 return Number.isFinite(ft)&&ft>0&&now-ft<=4*86400000&&ft-now<=120000&&Number.isFinite(r)&&r>0?usd*r:null;
}
export function meltValue({weight,unit,fineness,spot,payoutPct}){
 for(const v of [weight,fineness,spot,payoutPct])if(!Number.isFinite(v))throw Error('invalid');
 const f=MELT_UNITS[unit];
 if(!f||weight<=0||weight>1e9||fineness<=0||fineness>1000||spot<=0||spot>1e9||payoutPct<0||payoutPct>200)throw Error('invalid');
 const grams=weight*f,fineG=grams*fineness/1000,fineOz=fineG/MELT_UNITS.ozt,melt=fineOz*spot,payout=melt*payoutPct/100;
 if(!Number.isFinite(payout))throw Error('invalid');
 return {grams,fineG,fineOz,melt,payout,gap:melt-payout};
}
