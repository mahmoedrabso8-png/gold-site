import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';

// Prove that the validator fails on representative regressions, never mutate dist.
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'gold-quality-'));
try{
 await fs.cp('dist',dir,{recursive:true});
 const file=path.join(dir,'en/articles/selling-used-gold/index.html');
 const original=await fs.readFile(file,'utf8');
 const cases=[
  ['broken internal link',s=>s.replace('</main>','<a href="/missing-quality-fixture/">Broken test</a></main>'),'missing internal target'],
  ['incorrect canonical',s=>s.replace('rel="canonical" href="https://www.maelumatii.com/en/articles/selling-used-gold/"','rel="canonical" href="https://www.maelumatii.com/wrong/"'),'canonical mismatch'],
  ['visible date mismatch',s=>s.replace(/datetime="2026-11-23"/g,'datetime="2026-11-20"'),'visible date does not match'],
  ['extra main tab',s=>s.replace('<ul class="nav-list">','<ul class="nav-list"><li><a href="/">Extra tab</a></li>'),'expected five main navigation tabs']
 ];
 for(const[name,change,message]of cases){const mutated=change(original);assert.notEqual(mutated,original,`fixture did not change for ${name}`);await fs.writeFile(file,mutated);const run=spawnSync(process.execPath,['tests/site-quality.mjs',dir],{encoding:'utf8'});assert.notEqual(run.status,0,`validator missed ${name}`);assert((run.stderr+run.stdout).includes(message),`wrong failure for ${name}: ${run.stderr}`);console.log(`PASS: rejects ${name}`);await fs.writeFile(file,original);}
}finally{await fs.rm(dir,{recursive:true,force:true});}
