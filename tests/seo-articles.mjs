import fs from 'node:fs';
import { SEO_SLUGS } from '../seo-content.mjs';
const bad=[];const chk=(c,m)=>{if(!c)bad.push(m)};
const BANNED=[/in today's fast-paced world/i,/navigating the complexities/i,/delve into/i,/tapestry/i,/game-changer/i,/it is important to note/i,/in conclusion/i,/comprehensive guide to everything/i,/unlock the/i,/\u2014/];
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
let n=0,words=[];
for(const slug of SEO_SLUGS){
 const f=`dist/en/${slug}/index.html`;chk(fs.existsSync(f),`${slug} not built`);if(!fs.existsSync(f))continue;n++;
 const h=fs.readFileSync(f,'utf8'),u='/en/'+slug+'/';
 const title=(h.match(/<title>([^<]*)<\/title>/)||[])[1].replace(/&amp;/g,'&'),desc=(h.match(/<meta name="description" content="([^"]*)"/)||[])[1];
 chk(title.length<=60,`${u} title ${title.length}`);chk(desc.length<=155,`${u} desc ${desc.length}`);
 const main=h.match(/<main[\s\S]*?<\/main>/)[0],text=strip(main);words.push(text.split(' ').length);
 for(const b of BANNED)chk(!b.test(text),`${u} banned phrase ${b}`);
 chk((main.match(/<h1/g)||[]).length===1,`${u} h1`);
 chk(!/\[\[|\]\]/.test(main),`${u} unresolved placeholder`);
 const faqs=[...main.matchAll(/<details class="faq"><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p>/g)];chk(faqs.length>=3,`${u} needs FAQs`);
 for(const m of faqs){const w=strip(m[2]).split(' ').length;chk(w>=35&&w<=65,`${u} FAQ ${w} words: ${m[1].slice(0,40)}`);}
 chk(/<table/.test(main),`${u} table`);chk(/Sources \(checked/.test(main),`${u} sources`);
 chk(/"@type":"Article"/.test(h),`${u} article schema`);
}
if(bad.length){console.log('FAIL:\n'+bad.join('\n')+'\nwords: '+words.join(','));process.exit(1)}
console.log('PASS: '+n+' SEO articles; words: '+words.join(','));
