import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=process.argv[2]||'dist';
let count=0;
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=dir+'/'+item.name;if(item.isDirectory())walk(file);else if(file.endsWith('.html')){const html=fs.readFileSync(file,'utf8');const script=[...html.matchAll(/<script>([^]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('mael-theme'));assert.ok(script,`Theme initializer missing: ${file}`);for(const saved of [null,'dark','light','invalid']){let actual;vm.runInNewContext(script,{localStorage:{getItem:()=>saved},document:{documentElement:{setAttribute:(k,v)=>actual=v}}});assert.equal(actual,saved==='light'?'light':'dark',file);}let actual;vm.runInNewContext(script,{localStorage:{getItem:()=>{throw Error('unavailable')}},document:{documentElement:{setAttribute:(k,v)=>actual=v}}});assert.equal(actual,'dark',file);count++;}}}
walk(root);console.log(`PASS: dark default, saved light/dark, invalid/unavailable storage on ${count} pages`);
