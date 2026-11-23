import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {priceState} from '../price-state.mjs';
import {historySeries,historyGraph} from '../history-core.mjs';

// Run the production calculator function with a minimal DOM, never with live prices.
const app=await fs.readFile(new URL('../app.js',import.meta.url),'utf8');
const calc=app.slice(app.indexOf('function calc(){'),app.indexOf('/* ── Zakat calculator'));
assert(calc.includes('function calc(){')&&calc.includes('c-total'));
const nodes=new Map();
for(const id of ['calc','c-cur','c-rate','c-w','c-k','c-mc','c-mtype','c-tax-base','c-tax-rate','c-pg','c-gold','c-make','c-tax','c-total','c-usd','c-rate-source'])nodes.set(id,{value:'',textContent:'',validity:{valid:true}});
nodes.get('calc').querySelectorAll=()=>['c-rate','c-w','c-mc','c-tax-rate'].map(id=>nodes.get(id));
const moneyLabels=Array.from({length:6},()=>({textContent:''}));
const rates={USD:1,AED:3.6725,EGP:50,INR:90,EUR:.9};
const context={console,EN:true,priceState,G:{g24:367.25,sourceAt:Date.now()},AED:3.6725,$:s=>nodes.get(s.slice(1)),$$:()=>moneyLabels,rate:c=>rates[c]||1.25,num:id=>Math.max(0,Number(nodes.get(id).value)||0),setText:(id,v)=>nodes.get(id).textContent=v,fmt:(v,d=2)=>v.toFixed(d)};
vm.createContext(context);vm.runInContext(calc,context);
const html=await fs.readFile(new URL('../dist/en/gold-calculator/index.html',import.meta.url),'utf8');
const options=[...html.matchAll(/<option value="([A-Z]+)" data-market="([^"]+)" data-d="(\d+)"/g)].map(m=>({value:m[1],market:m[2],dataset:{d:m[3]}}));
assert.equal(options.length,44);let cases=0;
const set=(id,value)=>nodes.get(id).value=String(value);
for(const opt of options)for(const k of [24,22,21,18,14])for(const mode of ['gram','piece','percent'])for(const base of ['all','gold','making']){
 Object.assign(nodes.get('c-cur'),{options:[opt],selectedIndex:0});
 for(const [id,v]of Object.entries({'c-rate':100,'c-w':10,'c-k':k,'c-mc':5,'c-mtype':mode,'c-tax-base':base,'c-tax-rate':10}))set(id,v);
 context.calc();const making=mode==='piece'?5:50,taxable=base==='gold'?1000:base==='making'?making:1000+making;
 assert.equal(Number(nodes.get('c-total').textContent),Number((1000+making+taxable*.1).toFixed(Number(opt.dataset.d))),`${opt.market} ${k} ${mode} ${base}`);cases++;
}
console.log(`PASS: ${cases} purchase combinations, 44 country options, five karats, three making modes, three tax bases`);
nodes.get('c-rate').validity.valid=false;context.calc();assert.equal(nodes.get('c-total').textContent,'—');nodes.get('c-rate').validity.valid=true;console.log('PASS: invalid purchase input clears results');
Object.assign(nodes.get('c-cur'),{options:[{value:'USD',dataset:{d:'2'}}],selectedIndex:0});set('c-rate','');set('c-k',18);set('c-w',10);set('c-mc',0);set('c-tax-rate',0);context.calc();assert.equal(Number(nodes.get('c-total').textContent),750);console.log('PASS: automatic 18K rate uses USD/AED conversion correctly');

const rows=[{day:'2026-01-01',usdGram:100,fx:{EGP:50}},{day:'2026-01-03',usdGram:110,fx:{EGP:60}}];
const points=historySeries({rows},'EGP',18,'30','2026-01-03');assert.deepEqual(points.map(p=>p.value),[3750,4950]);assert.equal((historyGraph(points,'en','EGP',18).match(/M\d/g)||[]).length,2);console.log('PASS: history uses same-day FX/karat and preserves missing-day gap');

// Real alert module, isolated from network, browser permissions and clock races.
const store=new Map(),snap={g24:367.25,at:Date.now(),stale:false,fx:{EGP:50},fxAt:Date.now()};
const alerts={console,Date,Number,Math,JSON,Set,Intl,Promise,document:{documentElement:{lang:'en'},getElementById:()=>null,createElement:()=>({setAttribute(){},append(){}}),body:{appendChild(){}}},window:{getGoldAlertSnapshot:()=>snap},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},navigator:{},addEventListener(){}};
vm.createContext(alerts);vm.runInContext(await fs.readFile(new URL('../alerts.js',import.meta.url),'utf8'),alerts);await alerts.window.GoldAlerts.check();
const key='mael-gold-alerts-v1',target={id:'unit-1',cur:'EGP',k:21,direction:'below',target:4300,firedAt:0,lang:'en'};
store.set(key,JSON.stringify([target]));await alerts.window.GoldAlerts.check();assert.equal(JSON.parse(store.get(key))[0].firedAt,0);
snap.g24=350;await alerts.window.GoldAlerts.check();const fired=JSON.parse(store.get(key))[0].firedAt;assert(fired>0);await alerts.window.GoldAlerts.check();assert.equal(JSON.parse(store.get(key))[0].firedAt,fired);
for(const kind of ['gold','fx','stale']){store.set(key,JSON.stringify([{...target,target:5000}]));snap.at=kind==='gold'?Date.now()-3600000:Date.now();snap.fxAt=kind==='fx'?Date.now()-5*86400000:Date.now();snap.stale=kind==='stale';await alerts.window.GoldAlerts.check();assert.equal(JSON.parse(store.get(key))[0].firedAt,0,kind);}
console.log('PASS: isolated alert trigger, once-only behavior, stale gold, stale FX and stale flag suppression');
