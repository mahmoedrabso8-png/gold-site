import fs from 'node:fs';
const bad=[];const chk=(c,m)=>{if(!c)bad.push(m)};
import { TRAVEL_SLUGS } from '../travel-content.mjs';
const BANNED=[/in today's fast-paced world/i,/navigating the complexities/i,/delve into/i,/tapestry/i,/game-changer/i,/it is important to note/i,/in conclusion/i,/comprehensive guide to everything/i,/whether you are a seasoned traveler/i,/\u2014/];
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
let n=0,words=[];
for(const [num,slug] of Object.entries(TRAVEL_SLUGS)){
 const f=`dist/en/${slug}/index.html`;if(!fs.existsSync(f))continue;n++;
 const h=fs.readFileSync(f,'utf8'),u='/en/'+slug+'/';
 const title=(h.match(/<title>([^<]*)<\/title>/)||[])[1].replace(/&amp;/g,'&'),desc=(h.match(/<meta name="description" content="([^"]*)"/)||[])[1];
 chk(title.length<=60,`${u} title ${title.length}`);chk(desc.length<=155,`${u} desc ${desc.length}`);
 const main=h.match(/<main[\s\S]*?<\/main>/)[0],text=strip(main);words.push([slug,text.split(' ').length]);
 for(const b of BANNED)chk(!b.test(text),`${u} banned phrase ${b}`);
 chk((main.match(/<h1/g)||[]).length===1,`${u} h1`);
 const faqs=[...main.matchAll(/<details class="faq"><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p>/g)];chk(faqs.length===5,`${u} needs 5 FAQs`);
 for(const m of faqs){const w=strip(m[2]).split(' ').length;chk(w>=40&&w<=60,`${u} FAQ ${w} words: ${m[1].slice(0,40)}`);}
 chk(/Common Mistakes Travelers Make \(and How to Avoid Them\)/.test(main),`${u} mistakes h2`);
 chk((main.match(/<blockquote>/g)||[]).length>=2,`${u} needs 2+ pro tips`);
 chk(/<table/.test(main),`${u} table`);
 if(+num!==1&&fs.existsSync(`dist/en/${TRAVEL_SLUGS[1]}/index.html`)){const first=strip(main.slice(main.indexOf('hero'))).split(' ').slice(0,150).join(' ');chk(main.slice(0,main.indexOf('Quick answer')).includes(`/en/${TRAVEL_SLUGS[1]}/`),`${u} pillar link in intro`);}
}
if(bad.length){console.log('FAIL:\n'+bad.join('\n')+'\nwords: '+words.map(w=>w[1]).join(','));process.exit(1)}
console.log('PASS: '+n+' travel articles; words: '+words.map(w=>w[1]).join(','));
