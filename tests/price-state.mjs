import assert from 'node:assert/strict';
import {priceState,priceLabel} from '../price-state.mjs';
const now=Date.parse('2026-11-23T00:00:00Z'),q=age=>({g24:400,sourceAt:now-age});
assert.equal(priceState(q(60000),now).state,'LIVE');assert.equal(priceState(q(5*60000),now).state,'LIVE');assert.equal(priceState(q(6*60000),now).state,'DELAYED');assert.equal(priceState(q(16*60000),now).state,'STALE');
assert.equal(priceState({g24:400,storedAt:now},now).state,'STALE');assert.equal(priceState({g24:400,sourceAt:'invalid'},now).state,'STALE');assert.equal(priceState(q(-10*60000),now).state,'STALE');assert.equal(priceState(null,now).state,'UNAVAILABLE');assert.equal(priceState({...q(0),g24:0},now).state,'UNAVAILABLE');assert.equal(priceState({...q(0),g24:Infinity},now).state,'UNAVAILABLE');
assert.equal(priceState(q(16*60000),now).usable,false);assert(priceLabel('STALE','ar').includes('ليس مباشراً'));const sat=Date.parse('2026-11-28T10:00:00Z');assert.equal(priceState({g24:400,sourceAt:sat-60000},sat).state,'CLOSED');assert.equal(priceState({g24:400,sourceAt:sat-60000},sat).usable,true);assert.equal(priceState({g24:400,sourceAt:sat-5*86400000},sat).state,'STALE');assert(priceLabel('CLOSED','ar',sat).includes('آخر إغلاق'));
console.log('PASS: timestamp boundaries, missing/invalid/future source time, stored-time non-substitution, invalid values and Arabic labels');
