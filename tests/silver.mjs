import assert from 'node:assert/strict';
import {silverReference,silverInvoice} from '../silver-core.mjs';
const now=Date.parse('2026-11-23T04:00:00Z'),q={ag:3.6725,agAt:now,fx:{EGP:50},fxAt:now};
assert.equal(silverReference(q,'EGP',now),50);assert.equal(silverReference(q,'SAR',now),3.75);
for(const patch of [{ag:0},{ag:Infinity},{agAt:now-16*60000},{agAt:null},{agAt:now+121000},{fxAt:now-5*86400000},{fxAt:now+121000},{fx:{}}])assert.equal(silverReference({...q,...patch},'EGP',now),null);
assert.equal(silverReference({...q,fxAt:0},'SAR',now),3.75);
let n=0;for(const purity of [925,999])for(const weight of [1,10,100,1000])for(const rate of [1.2345,50])for(const making of [0,25])for(const tax of [0,5,15])for(const taxBase of ['all','metal','making']){const r=silverInvoice({weight,purity,rate,making,tax,taxBase}),metal=weight*purity/1000*rate;assert(Math.abs(r.metal-metal)<1e-7);assert(Math.abs(r.total-(metal+making+tax/100*(taxBase==='all'?metal+making:taxBase==='metal'?metal:making)))<1e-7);n++;}
const good={weight:100,purity:925,rate:50,making:20,tax:10,taxBase:'all'};assert.equal(silverInvoice(good).total,5109.5);
for(const patch of [{weight:0},{weight:-1},{rate:NaN},{rate:0},{purity:1000},{making:-1},{tax:101},{taxBase:'bad'}])assert.throws(()=>silverInvoice({...good,...patch}));
console.log(`PASS: ${n} silver invoices, purity once, exact fixture, stale/missing/future silver+FX, peg and invalid inputs`);
