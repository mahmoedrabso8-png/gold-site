import { usTravel as usTravel0 } from './travel-us.mjs';
import { pillarTravel } from './travel-pillar.mjs';
import { intlTravel } from './travel-intl.mjs';
import { intlTravel2 } from './travel-intl2.mjs';
import { tsaTravel } from './travel-tsa.mjs';
import { fxTravel } from './travel-fx.mjs';
import { fx2Travel } from './travel-fx2.mjs';
import { domTravel } from './travel-dom.mjs';
const usTravel=()=>[...pillarTravel(),...usTravel0(),...intlTravel(),...intlTravel2(),...tsaTravel(),...fxTravel(),...fx2Travel(),...domTravel()];
export const TRAVEL_DATE='23 November 2026';
export const TRAVEL_SLUGS={1:'traveling-internationally-with-gold-and-cash',2:'travel-with-gold-bars-on-a-plane',3:'gold-in-carry-on-vs-checked-luggage',4:'does-gold-set-off-airport-metal-detectors',5:'declare-personal-gold-jewelry-at-customs',6:'how-to-pack-hide-gold-safely-traveling',7:'traveling-with-gold-coins-customs-rules',8:'how-much-gold-bring-into-usa',9:'bringing-gold-into-uk-customs-rules',10:'traveling-to-dubai-with-gold-customs',11:'bringing-gold-from-dubai-to-usa',12:'canada-gold-customs-limit',13:'bringing-gold-into-europe-eu-customs',14:'australia-gold-import-customs-rules',15:'how-much-gold-carry-to-india-from-usa',16:'how-much-us-cash-travel-internationally',17:'how-to-fill-out-fincen-form-105',18:'10000-customs-limit-per-person-or-family',19:'penalty-not-declaring-cash-at-customs',20:'flying-domestically-us-with-large-cash',21:'declare-foreign-currency-at-us-customs',22:'old-torn-us-dollar-bills-rejected-abroad',23:'is-gold-cheaper-in-dubai-than-usa',24:'vat-refund-on-gold-dubai-airport',25:'best-countries-to-buy-24k-gold',26:'best-way-exchange-usd-local-currency',27:'exchange-us-dollars-at-airport-or-wait',28:'usd-cash-vs-travel-credit-cards-abroad',29:'dynamic-currency-conversion-pay-in-usd',30:'spot-fake-gold-jewelry-buying-abroad'};
export function travelLinksHtml(){const defs=[...usTravel()];return defs.map(d=>`<a href="/en/${TRAVEL_SLUGS[d.n]}/">${d.crumb||d.h1}</a>`).join(' · ');}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
export function travelPages(ctx){
 const defs=[...usTravel()];
 const built=new Set(defs.map(d=>d.n));
 const a=(u,t)=>`<a href="${u}" rel="noopener">${t}</a>`;
 const fill=h=>String(h).replace(/\[\[(\d+)\|([^\]]+)\]\]/g,(m,n,t)=>built.has(+n)?`<a href="/en/${TRAVEL_SLUGS[n]}/">${t}</a>`:t);
 return defs.map(d=>{
  const body=`<div class="hero"><h1>${d.h1}</h1><p class="hero-sub">${fill(d.hook)}</p><p class="note">Published <time datetime="${d.date||'2026-11-23'}" dir="ltr">${d.date||'2026-11-23'}</time> · Updated <time datetime="${d.date||'2026-11-23'}" dir="ltr">${d.date||'2026-11-23'}</time></p></div>
<section class="card-section"><h2>Quick answer at a glance</h2><div class="table-wrap"><table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>${d.table.map(([k,v])=>`<tr><td><strong>${fill(k)}</strong></td><td>${fill(v)}</td></tr>`).join('')}</tbody></table></div><p class="note">Checked against the official pages listed at the end, ${d.checked||TRAVEL_DATE}. Not legal advice.</p></section>
${d.sections.map(([h,t])=>`<section class="card-section"><h2>${h}</h2><div class="prose">${fill(t)}</div></section>`).join('\n')}
<section class="card-section"><h2>Common Mistakes Travelers Make (and How to Avoid Them)</h2><div class="prose"><ul>${d.mistakes.map(([b,t])=>`<li><strong>${b}</strong> ${fill(t)}</li>`).join('')}</ul></div></section>
<section class="card-section"><h2>Pre-flight action checklist</h2><div class="prose"><ul>${d.checklist.map(x=>`<li>${fill(x)}</li>`).join('')}</ul></div></section>
<section class="card-section"><h2>Bottom line: ${d.kw}</h2><div class="prose">${fill(d.bottom)}</div></section>
<section class="card-section"><h2>Official sources (checked ${d.checked||TRAVEL_DATE})</h2><div class="prose"><ul>${d.sources.map(([u,t])=>`<li>${a(u,t)}</li>`).join('')}</ul><p class="note">Customs rules, duty-free thresholds and exchange policies change from time to time. Check the current rule with the official authority named above before you fly.</p></div></section>`;
  return {lang:'en',slug:TRAVEL_SLUGS[d.n],alt:false,fixed:true,lastmod:(d.date||'2026-11-23'),title:d.title,desc:d.desc,
   crumbs:(built.has(1)&&d.n!==1?[['Traveling with gold and cash','/en/'+TRAVEL_SLUGS[1]+'/']]:[]).concat([[d.crumb||d.h1.slice(0,40),'/en/'+TRAVEL_SLUGS[d.n]+'/']]),
   body,faq:d.faq,
   schema:[{'@context':'https://schema.org','@type':'Article',headline:d.h1,description:d.desc,datePublished:(d.date||'2026-11-23'),dateModified:(d.date||'2026-11-23'),mainEntityOfPage:'https://www.maelumatii.com/en/'+TRAVEL_SLUGS[d.n]+'/',inLanguage:'en',author:{'@type':'Organization',name:'Maelumatii',url:'https://www.maelumatii.com/'},publisher:{'@type':'Organization',name:'Maelumatii',url:'https://www.maelumatii.com/'}}]};
 });
}
