import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { articleBody, articleLibrary, relatedArticles } from '../article-discovery.mjs';
import { ARTICLES, ARTICLES_EN } from '../articles.mjs';

const root=path.resolve(process.argv[2]||'dist'),site='https://www.maelumatii.com';
const errors=[],pages=new Map(),incoming=new Map();
const attr=(s,n)=>new RegExp(`\\b${n}=(\x22|\x27)([^]*?)\\1`,'i').exec(s)?.[2];
const tags=(s,name)=>[...s.matchAll(new RegExp(`<${name}\\b[^>]*>`,'gi'))].map(x=>x[0]);
async function walk(dir){for(const x of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,x.name);if(x.isDirectory())await walk(p);else if(x.name.endsWith('.html')){let u='/'+path.relative(root,p).split(path.sep).join('/');if(u.endsWith('index.html'))u=u.slice(0,-10);pages.set(u,await fs.readFile(p,'utf8'));}}}
await walk(root);
const fail=(u,m)=>errors.push(`${u}: ${m}`);
const titles=new Map(),descs=new Map();
for(const[u,s]of pages){
 const noindex=/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(s);
 const title=/<title>([^]*?)<\/title>/i.exec(s)?.[1];
 const desc=tags(s,'meta').find(x=>attr(x,'name')==='description');
 const links=tags(s,'link'),canonical=links.find(x=>attr(x,'rel')==='canonical');
 if(!noindex){
  if(!title)fail(u,'missing title');
  else{const old=titles.get(title);if(old)fail(u,`duplicate title with ${old}`);titles.set(title,u);}
  const d=desc&&attr(desc,'content');if(!d)fail(u,'missing description');else{const old=descs.get(d);if(old)fail(u,`duplicate description with ${old}`);descs.set(d,u);}
  if(!canonical||attr(canonical,'href')!==site+u)fail(u,'canonical mismatch');
  if((s.match(/<h1\b/gi)||[]).length!==1)fail(u,'expected one h1');
 }
 const lang=attr(/<html\b[^>]*>/i.exec(s)?.[0]||'','lang');
 if(lang==='ar'&&!/<html\b[^>]*dir=["']rtl["']/i.test(s))fail(u,'Arabic page must be RTL');
 if((lang==='ar'||lang==='en')&&!noindex){const nav=/<nav\b[^>]*class=["'][^"']*grouped-nav[^]*?<\/nav>/i.exec(s)?.[0];if(!nav||(nav.replace(/<ul\b[^>]*class=["']nav-dropdown["'][^]*?<\/ul>/gi,'').match(/<li\b/gi)||[]).length!==5)fail(u,'expected five main navigation tabs');}
 const alt=links.filter(x=>attr(x,'hreflang'));
 for(const a of alt){let target;try{target=new URL(attr(a,'href'));}catch{fail(u,'invalid hreflang URL');continue;}const dest=pages.get(target.pathname);if(!dest){fail(u,`hreflang target missing ${target.pathname}`);continue;}if(attr(a,'hreflang')!=='x-default'&&!tags(dest,'link').some(x=>attr(x,'hreflang')===lang&&attr(x,'href')===site+u))fail(u,`nonreciprocal hreflang ${target.pathname}`);}
 for(const a of tags(s,'a')){const h=attr(a,'href');if(!h)continue;let target;try{target=new URL(h,site+u);}catch{fail(u,'invalid anchor URL');continue;}if(target.origin!==site)continue;const targetPath=decodeURIComponent(target.pathname);if(pages.has(targetPath)){incoming.set(targetPath,(incoming.get(targetPath)||0)+1);if(target.hash){const id=decodeURIComponent(target.hash.slice(1));if(!pages.get(targetPath).includes(`id="${id}"`)&&!pages.get(targetPath).includes(`id='${id}'`))fail(u,`missing fragment ${h}`);}}else{try{await fs.access(path.join(root,targetPath));}catch{fail(u,`missing internal target ${targetPath}`);}}}
 for(const img of tags(s,'img'))if(attr(img,'alt')===undefined)fail(u,'image missing alt');
 const schemas=[...s.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([^]*?)<\/script>/gi)];let faq=0;
 for(const sc of schemas){let objs;try{const v=JSON.parse(sc[1]);objs=Array.isArray(v)?v:[v];}catch{fail(u,'invalid JSON-LD');continue;}for(const o of objs){if(o['@type']==='FAQPage')faq++;if(o['@type']==='Article'){for(const k of ['headline','author','datePublished','dateModified'])if(!o[k])fail(u,`Article missing ${k}`);for(const k of ['datePublished','dateModified'])if(!s.includes(`datetime="${o[k]}"`))fail(u,`visible date does not match ${k}`);}}}if(faq>1)fail(u,'multiple FAQPage schemas');
}
const sm=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');const urls=[...sm.matchAll(/<loc>([^<]*)<\/loc>/g)].map(x=>new URL(x[1]));const sitemap=new Set(urls.map(x=>x.pathname));
for(const u of sitemap)if(!pages.has(u))fail(u,'sitemap target missing');
for(const[u,s]of pages)if(!/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(s)){if(!sitemap.has(u))fail(u,'indexable page missing from sitemap');if(u!=='/'&&!incoming.get(u))fail(u,'no incoming links');}
// Discovery helpers remain deterministic, crawlable and bounded.
for(const[lang,list]of[['ar',ARTICLES],['en',ARTICLES_EN]]){
 assert.equal((articleLibrary(list,lang).match(/data-article-card/g)||[]).length,list.length);
 for(const a of list){const result=articleBody(a,lang);assert(result.date.includes(a.datePublished||'2026-11-22'));assert.equal((relatedArticles(a,list,lang).match(/data-article-card/g)||[]).length,Math.min(4,list.length-1));}
}
if(errors.length){console.error(`FAILED: ${errors.length} issue(s)\n`+errors.join('\n'));process.exitCode=1;}else console.log(`PASS: ${pages.size} HTML pages, ${sitemap.size} sitemap URLs; metadata, links, fragments, hreflang, schema, dates, five-tab nav and discovery checks.`);
