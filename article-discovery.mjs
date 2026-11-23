// Article discovery helpers. All cards remain server-rendered and crawlable.
const terms = {
  selling: /selling|spread|used-gold/,
  weight: /karat|purity|weight|21k-vs|916|999|baht|mithqal|tael/,
  planning: /zakat|when-to-buy|bars-vs|making-charges|calculated/,
  currency: /dollar|parallel/
};
export function articleTopic(a) {
  for(const [k,re] of Object.entries(terms)) if(re.test(a.slug)) return k;
  return 'markets';
}
export function articleCard(a,lang) {
  return `<a class="link-card" data-article-card data-topic="${articleTopic(a)}" href="${lang==='en'?'/en':''}/articles/${a.slug}/">${a.h1}<span>${a.teaser}</span></a>`;
}
export function articleLibrary(list,lang) {
  const en=lang==='en';
  const labels=en?{all:'All guides',selling:'Selling gold',weight:'Weight & purity',planning:'Buying & planning',currency:'Currencies',markets:'Country guides'}:{all:'كل الأدلة',selling:'بيع الذهب',weight:'الوزن والعيارات',planning:'الشراء والتخطيط',currency:'العملات',markets:'أدلة الدول'};
  return `<section class="card-section article-library" data-article-library data-total="${list.length}" aria-labelledby="library-title"><h2 id="library-title">${en?'Find a guide':'اختار دليلك'}</h2><p>${en?'Search titles and summaries, or choose a topic. Prices and tax rules can change; check the source and your invoice before a purchase.':'ابحث في العناوين والملخصات أو اختار الموضوع. الأسعار والقواعد الضريبية قد تتغير؛ راجع المصدر والفاتورة قبل الشراء.'}</p><div class="article-controls" hidden><label for="article-search">${en?'Search guides':'البحث في الأدلة'}</label><input id="article-search" type="search" placeholder="${en?'Try: Singapore, purity, selling…':'مثال: مصر، العيارات، بيع الذهب…'}" autocomplete="off"><fieldset class="article-topics"><legend>${en?'Topic':'الموضوع'}</legend>${Object.entries(labels).map(([k,v],i)=>`<label><input type="radio" name="article-topic" value="${k}" ${i===0?'checked':''}><span>${v}</span></label>`).join('')}</fieldset><p class="article-count" role="status" aria-live="polite" aria-atomic="true"></p></div><div class="links-grid article-grid">${list.map(a=>articleCard(a,lang)).join('')}</div><p class="article-empty" hidden>${en?'No guides match. Try another word or topic.':'لا توجد أدلة مطابقة. جرّب كلمة أو موضوع تاني.'} <button type="button" class="article-reset">${en?'Clear filters':'مسح البحث'}</button></p></section>`;
}
export function relatedArticles(a,list,lang) {
  const topic=articleTopic(a);
  return list.filter(x=>x.slug!==a.slug).map((x,i)=>({x,i,score:(articleTopic(x)===topic?10:0)+(x.paired?1:0)})).sort((a,b)=>b.score-a.score||a.i-b.i).slice(0,4).map(({x})=>articleCard(x,lang)).join('');
}
export function articleBody(a,lang) {
  const en=lang==='en';let i=0;const headings=[];
  const body=a.body.replace(/<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g,(match,level,text)=>{const id='guide-section-'+(++i);headings.push({id,text:text.replace(/<[^>]+>/g,'')});return `<h${level} id="${id}" class="guide-heading">${text}</h${level}>`;});
  const published=a.datePublished||'2026-11-22',modified=a.dateModified||published;
  const date=`<p class="article-dates">${en?'Published':'نُشر'}: <time datetime="${published}" dir="ltr">${published}</time>${modified!==published?` · ${en?'Updated':'حُدث'}: <time datetime="${modified}" dir="ltr">${modified}</time>`:''} · ${en?'Maelumatii':'معلوماتي'}</p>`;
  const toc=headings.length>=3?`<nav class="article-toc" aria-label="${en?'On this page':'في هذا الدليل'}"><h2>${en?'In this guide':'في هذا الدليل'}</h2><ol>${headings.map(h=>`<li><a href="#${h.id}">${h.text}</a></li>`).join('')}</ol></nav>`:'';
  return {body,date,toc};
}
