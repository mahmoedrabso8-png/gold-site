import { seoA1 } from './seo-a1.mjs';
import { seoA2 } from './seo-a2.mjs';
import { seoA3 } from './seo-a3.mjs';
import { seoA4 } from './seo-a4.mjs';
import { seoA5 } from './seo-a5.mjs';
import { seoA6 } from './seo-a6.mjs';
import { seoA7 } from './seo-a7.mjs';
import { seoA8 } from './seo-a8.mjs';
import { seoA9 } from './seo-a9.mjs';
import { seoA10 } from './seo-a10.mjs';
import { seoA11 } from './seo-a11.mjs';
const all=()=>[...seoA1(),...seoA2(),...seoA3(),...seoA4(),...seoA5(),...seoA6(),...seoA7(),...seoA8(),...seoA9(),...seoA10(),...seoA11()];
export const SEO_SLUGS=all().map(d=>d.slug);
export const SEO_DATE='24 November 2026';
export function seoLinksHtml(){return all().map(d=>`<a href="/en/${d.slug}/">${d.crumb||d.h1}</a>`).join(' · ');}
const a=(u,t)=>`<a href="${u}" rel="noopener">${t}</a>`;
export function seoPages(ctx){
 const defs=all();
 const built=new Set(defs.map(d=>d.slug));
 const fill=h=>String(h).replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g,(m,s,t)=>built.has(s)?`<a href="/en/${s}/">${t}</a>`:t);
 return defs.map(d=>{
  const body=`<div class="hero"><h1>${d.h1}</h1><p class="hero-sub">${fill(d.hook)}</p><p class="note">Published <time datetime="${d.date}" dir="ltr">${d.date}</time> · Updated <time datetime="${d.date}" dir="ltr">${d.date}</time></p></div>
<section class="card-section"><h2>Quick answer</h2><div class="table-wrap"><table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>${d.table.map(([k,v])=>`<tr><td><strong>${fill(k)}</strong></td><td>${fill(v)}</td></tr>`).join('')}</tbody></table></div></section>
${d.sections.map(([h,t])=>`<section class="card-section"><h2>${h}</h2><div class="prose">${fill(t)}</div></section>`).join('\n')}
<section class="card-section"><h2>Conclusion</h2><div class="prose">${fill(d.conclusion)}</div></section>
<section class="card-section"><h2>Related on this site</h2><div class="prose"><ul>${d.related.map(([u,t])=>`<li>${fill(u.startsWith('[[')?u:`<a href="${u}">${t}</a>`)}</li>`).join('')}</ul></div></section>
<section class="card-section"><h2>Sources (checked ${d.checked||SEO_DATE})</h2><div class="prose"><ul>${d.sources.map(([u,t])=>`<li>${a(u,t)}</li>`).join('')}</ul><p class="note">${d.note||'General information, not financial advice. Figures quoted are from the cited publisher on the dates shown and are not live prices.'}</p></div></section>`;
  return {lang:'en',slug:d.slug,alt:false,fixed:true,lastmod:d.date,title:d.title,desc:d.desc,
   crumbs:[[d.crumb||d.h1.slice(0,40),'/en/'+d.slug+'/']],body,faq:d.faq,
   schema:[{'@context':'https://schema.org','@type':'Article',headline:d.h1,description:d.desc,datePublished:d.date,dateModified:d.date,mainEntityOfPage:'https://www.maelumatii.com/en/'+d.slug+'/',inLanguage:'en',author:{'@type':'Organization',name:'Maelumatii',url:'https://www.maelumatii.com/'},publisher:{'@type':'Organization',name:'Maelumatii',url:'https://www.maelumatii.com/'}}]};
 });
}
