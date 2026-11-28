import { egpReference } from './currency-core.mjs';
// Gulf to Egypt money-transfer pages. Only figures the providers publish on their own pages are shown, each with its link and the date we read it.
export const TRANSFER_HUB = 'tahweel-folous';
const CHECKED = '28 نوفمبر 2026';
const WU = c => `https://www.westernunion.com/${c}/en/send-money-to-egypt.html`;
export const CORRIDORS = [
  { code: 'SAR', slug: 'tahweel-folous-saudia-masr', from: 'السعودية', cur: 'ريال سعودي', short: 'ريال', pair: 'sar-to-egp', dollar: 'dollar-saudi', gold: 'saudi', wuc: 'sa',
    wu: ['من 15 ريال للتحويل أونلاين', 'تقول الصفحة إن التحويل أونلاين لحساب بنكي أو استلام نقدي من أكثر من 200 فرع ووكيل في مصر.'],
    wise: 'لم نقرأ صفحة وايز الخاصة بالسعودية، فلا نقول إن الخدمة متاحة أو غير متاحة.',
    remitly: 'لم نستطع قراءة صفحة ريميتلي الخاصة بالسعودية.' },
  { code: 'AED', slug: 'tahweel-folous-emarat-masr', from: 'الإمارات', cur: 'درهم إماراتي', short: 'درهم', pair: 'aed-to-egp', dollar: 'dollar-uae', gold: '', wuc: 'ae',
    wu: ['15 درهم للتحويل أونلاين، وتقول الصفحة إن أول تحويل أونلاين بدون رسوم تحويل (مع أرباح فرق الصرف)', 'تحويل لحساب بنكي أو استلام نقدي من وكيل في مصر.'],
    wise: 'تقول صفحة وايز للإمارات إنها تعمل على السماح بإرسال الجنيه المصري من الإمارات وإنها لم تصل لذلك بعد.',
    remitly: 'تعرض صفحة ريميتلي للإمارات "سعر ترحيبي" 1 درهم = 15.01 جنيه للعملاء الجدد فقط، لأول 4,000 درهم، بدون رسوم على أول تحويل. السعر العادي غير منشور على الصفحة.' },
  { code: 'KWD', slug: 'tahweel-folous-kuwait-masr', from: 'الكويت', cur: 'دينار كويتي', short: 'دينار', pair: 'kwd-to-egp', dollar: 'dollar-kuwait', gold: 'kuwait', wuc: 'kw',
    wu: ['الصفحة لا تنشر رقمًا للرسوم', 'تقول إنك تعرف الرسوم والسعر والحد الأقصى قبل التحويل.'],
    wise: 'لم نقرأ صفحة وايز الخاصة بالكويت.', remitly: 'لم نستطع قراءة صفحة ريميتلي الخاصة بالكويت.' },
  { code: 'QAR', slug: 'tahweel-folous-qatar-masr', from: 'قطر', cur: 'ريال قطري', short: 'ريال', pair: null, dollar: 'dollar-qatar', gold: 'qatar', wuc: 'qa',
    wu: ['من 15 ريال قطري للتحويل أونلاين', 'تحويل لحساب بنكي أو استلام نقدي من وكيل في مصر.'],
    wise: 'لم نقرأ صفحة وايز الخاصة بقطر.', remitly: 'لم نستطع قراءة صفحة ريميتلي الخاصة بقطر.' },
  { code: 'BHD', slug: 'tahweel-folous-bahrain-masr', from: 'البحرين', cur: 'دينار بحريني', short: 'دينار', pair: null, dollar: 'dollar-bahrain', gold: 'bahrain', wuc: 'bh',
    wu: ['من 0.5 دينار بحريني للتحويل أونلاين', 'تحويل لحساب بنكي أو استلام نقدي من وكيل في مصر.'],
    wise: 'لم نقرأ صفحة وايز الخاصة بالبحرين.', remitly: 'لم نستطع قراءة صفحة ريميتلي الخاصة بالبحرين.' },
  { code: 'OMR', slug: 'tahweel-folous-oman-masr', from: 'عُمان', cur: 'ريال عماني', short: 'ريال', pair: null, dollar: 'dollar-oman', gold: 'oman', wuc: 'om',
    wu: ['2 ريال عماني رسوم تحويل كما تعرضها الصفحة', 'تقول الصفحة إن التحويل متاح على مدار الساعة.'],
    wise: 'لم نقرأ صفحة وايز الخاصة بعُمان.', remitly: 'لم نستطع قراءة صفحة ريميتلي الخاصة بعُمان.' }
];
const E = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
export function transferPages(ctx) {
  const b = '/';
  const ref = c => egpReference({ fx: ctx.fx, fxAt: ctx.fxSourceAt }, c.code);
  const when = (() => {
    const d = ctx.fxSourceAt ? new Date(ctx.fxSourceAt) : null;
    if (!d || isNaN(d)) return '—';
    return new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', dateStyle: 'medium', timeStyle: 'short' }).format(d) + ' بتوقيت القاهرة';
  })();
  const badge = '<div class="update-badge" data-price-state="UNAVAILABLE" role="status"></div><details class="quote-provenance"><summary>المصدر ووقت البيانات</summary></details>';
  const refLine = c => { const r = ref(c); return r == null ? null : r; };
  const fmt = (n, d) => ctx.fmt(n, d);
  const refBox = c => {
    const r = refLine(c);
    return `<div class="card-section transfer-ref"><h2>السعر المرجعي قبل ما تكتب أي حاجة</h2>${r == null
      ? '<p>السعر المرجعي غير متاح الآن لأن بيانات الصرف قديمة. لا نعرض رقمًا غير مؤرخ.</p>'
      : `<p class="rate-line">1 ${c.short} = <strong>${fmt(r, 3)}</strong> جنيه مصري &nbsp;·&nbsp; 1,000 ${c.short} = <strong>${fmt(r * 1000, 0)}</strong> جنيه</p>`}<p class="note">مصدر المرجع: <a href="https://open.er-api.com" rel="noopener">open.er-api.com (Exchange Rate API)</a> · آخر تحديث للمصدر: <time>${when}</time>. هذا سعر منتصف السوق اليومي، وليس سعر أي شركة تحويل أو بنك، وهو يتحرك. السعر الذي تحصل عليه فعليًا أقل منه عادةً بقدر هامش الشركة ورسومها.</p></div>`;
  };
  const sourcesFor = c => {
    const l = [[WU(c.wuc), 'ويسترن يونيون: إرسال أموال إلى مصر (' + c.from + ')']];
    if (c.code === 'AED') { l.push(['https://www.remitly.com/ae/en/egypt', 'ريميتلي: إرسال أموال إلى مصر من الإمارات'], ['https://wise.com/ae/send-money/send-money-to-egypt', 'وايز: إرسال أموال إلى مصر من الإمارات']); }
    l.push(['https://open.er-api.com', 'Exchange Rate API: سعر الصرف المرجعي']);
    return `<ul>${l.map(([u, t]) => `<li><a href="${u}" rel="noopener" target="_blank">${t}</a></li>`).join('')}</ul>`;
  };
  const tool = c => {
    const r = refLine(c);
    return `<section class="card-section" id="transfer-tool" data-code="${c.code}" data-short="${E(c.short)}" data-ref="${r == null ? '' : r}" data-key="tf-${c.code}"><h2>احسب صافي اللي يوصل بالجنيه</h2>
<p class="note">اسأل كل مزود عن سعره ورسومه في تطبيقه أو فرعه، واكتبهم هنا. نخزن آخر عرض كتبته لكل مزود على جهازك فقط، فتتكون المقارنة وأنت تسأل. لا نرسل شيئًا لأي سيرفر، والحساب حسابنا، وليس عرضًا من أي شركة.</p>
<form id="tf-form"><div class="form-grid">
<div class="field"><label for="tf-name">اسم المزود</label><input id="tf-name" type="text" list="tf-names" maxlength="40" required placeholder="مثال: ويسترن يونيون"><datalist id="tf-names"><option value="ويسترن يونيون"><option value="ريميتلي"><option value="وايز"><option value="موني جرام"><option value="STC Pay"><option value="مصرف الراجحي"><option value="بنك محلي"></datalist></div>
<div class="field"><label for="tf-amount">المبلغ المرسل (${c.short})</label><input id="tf-amount" type="number" inputmode="decimal" min="0" step="any" value="1000" required></div>
<div class="field"><label for="tf-rate">سعر المزود (جنيه لكل 1 ${c.short})</label><input id="tf-rate" type="number" inputmode="decimal" min="0" step="any" required></div>
<div class="field"><label for="tf-pct">رسوم نسبة (%)</label><input id="tf-pct" type="number" inputmode="decimal" min="0" max="100" step="any" value="0"></div>
<div class="field"><label for="tf-flat">رسوم ثابتة (${c.short})</label><input id="tf-flat" type="number" inputmode="decimal" min="0" step="any" value="0"></div>
</div><div class="silver-actions"><button class="btn" type="submit">احسب واحفظ العرض</button><button id="tf-clear" class="btn-sm" type="button">امسح العروض المحفوظة</button></div></form>
<p id="tf-status" role="status"></p><div id="tf-results" aria-live="polite"></div>
<p class="note">الرسوم تُخصم من المبلغ قبل التحويل. الترتيب بين العروض التي كتبتها أنت فقط، وليس حكمًا على السوق. تأكد من الرقم النهائي في شاشة التأكيد عند المزود قبل ما تدفع.</p></section>`;
  };
  const corridorPage = c => {
    const name = `من ${c.from} لمصر`;
    const rows = `<tr><td data-label="المزود"><strong>ويسترن يونيون</strong></td><td data-label="الرسوم المنشورة">${c.wu[0]}</td><td data-label="السعر">لا تنشر الصفحة سعرًا. تعرضه بعد "Send now" وتقول إن الشركة تربح أيضًا من فرق الصرف.</td><td data-label="الاستلام">${c.wu[1]}</td></tr>
<tr><td data-label="المزود"><strong>ريميتلي</strong></td><td data-label="الرسوم المنشورة">${c.remitly}</td><td data-label="السعر">${c.code === 'AED' ? 'السعر الترحيبي أعلاه فقط' : 'غير متاح لنا'}</td><td data-label="الاستلام في مصر">${c.code === 'AED' ? 'تعرض الصفحة: حساب بنكي، استلام نقدي، محفظة موبايل، إيداع على بطاقة.' : 'غير متاح لنا'}</td></tr>
<tr><td data-label="المزود"><strong>وايز</strong></td><td data-label="الرسوم المنشورة">${c.wise}</td><td data-label="السعر">غير متاح لنا</td><td data-label="الاستلام في مصر">غير متاح لنا</td></tr>
<tr><td data-label="المزود"><strong>بنوك وتطبيقات أخرى</strong></td><td data-label="الرسوم المنشورة">لم نستطع قراءة أسعار ورسوم STC Pay ومصرف الراجحي وموني جرام والبنوك المحلية من صفحاتها. اسألهم واكتب عرضهم في الحاسبة أدناه.</td><td data-label="السعر">غير متاح لنا</td><td data-label="الاستلام في مصر">غير متاح لنا</td></tr>`;
    const links = [`<a href="${b}${TRANSFER_HUB}/">تحويل فلوس لمصر: كل الدول</a>`,
      c.pair ? `<a href="${b}${c.pair}/">سعر ${c.cur} مقابل الجنيه</a>` : `<a href="${b}egp-exchange-rates/">أسعار العملات مقابل الجنيه</a>`,
      `<a href="${b}${c.dollar}/">سعر الدولار في ${c.from}</a>`, `<a href="${b}dollar-egypt/">سعر الدولار في مصر</a>`];
    return { lang: 'ar', slug: c.slug, alt: false, fixed: true, usesFx: true, fxRef: true, lastmod: '2026-11-28',
      title: `تحويل فلوس ${name} | قارن صافي الجنيه`,
      desc: `تحويل فلوس ${name}: السعر المرجعي المؤرخ، الرسوم التي ينشرها كل مزود بمصدرها، وحاسبة تحسب لك صافي الجنيه الواصل. لا أسعار مخترعة.`,
      crumbs: [['تحويل فلوس لمصر', b + TRANSFER_HUB + '/'], [name, b + c.slug + '/']],
      body: `<div class="hero"><h1>تحويل فلوس ${name}: قارن صافي الجنيه اللي يوصل</h1><p class="hero-sub">أو "تحويل الأموال ${name}" بالتعبير الرسمي. نعرض السعر المرجعي مؤرخًا وما تنشره الشركات على صفحاتها فقط، ونترك لك حساب الصافي.</p>${badge}</div>
${refBox(c)}
<section class="card-section"><h2>اللي ينشره كل مزود على صفحته (قرأناه ${CHECKED})</h2><div class="table-wrap"><table class="data-table responsive-prices"><thead><tr><th>المزود</th><th>الرسوم المنشورة</th><th>السعر</th><th>الاستلام في مصر</th></tr></thead><tbody>${rows}</tbody></table></div><p class="note">السعر الفعلي والرسوم تتغير حسب المبلغ وطريقة الدفع والاستلام ووقت التحويل. هذه أرقام الصفحات يوم القراءة ولا تُعتبر سعرًا مباشرًا. لا نذكر أرخص مزود لأن الأسعار الفعلية غير منشورة على الصفحات.</p></section>
${tool(c)}${ctx.AD}
<section class="card-section"><h2>قبل ما تحوّل</h2><div class="prose"><ul><li>قارن "المبلغ اللي يوصل بالجنيه" وليس السعر المعلن فقط. بعض الشركات تعرض رسومًا قليلة وتربح من فرق الصرف.</li><li>الاستلام نقدًا أو في حساب بنكي أو محفظة قد يختلف سعره وسرعته عند نفس الشركة.</li><li>اسأل عن الحد الأقصى للتحويل ومتطلبات الهوية قبل الذهاب للفرع.</li></ul><p>${links.join(' · ')}</p><h3>المصادر (قرأناها ${CHECKED})</h3>${sourcesFor(c)}</div></section>`,
      faq: [[`كم يوصل من ${c.from} لمصر لو حولت 1000 ${c.short}؟`, 'يعتمد على سعر المزود ورسومه يوم التحويل. نعرض سعرًا مرجعيًا مؤرخًا للمقارنة، ولا نعرض سعر شركة غير منشور. اكتب عرض المزود في الحاسبة لتعرف الصافي.'],
        ['أي مزود أرخص؟', 'لا نعرف دون سعر كل مزود اليوم، وهو غير منشور على صفحاتهم. الحاسبة ترتب العروض التي تكتبها أنت بحسب الصافي.'],
        ['هل السعر المرجعي هو سعر البنك؟', 'لا. هو سعر منتصف السوق اليومي من Exchange Rate API. سعر البنك أو الشركة أقل منه عادةً بقدر هامشهم، وهو يتحرك خلال اليوم.']] };
  };
  const hubRows = CORRIDORS.map(c => { const r = refLine(c); return `<tr><td data-label="الدولة"><a href="${b}${c.slug}/"><strong>${c.from} ← مصر</strong></a></td><td class="n" data-label="1,000 بالمرجع">${r == null ? '—' : fmt(r * 1000, 0) + ' جنيه'}</td><td data-label="رسوم ويسترن يونيون المنشورة">${c.wu[0].split('،')[0]}</td></tr>`; }).join('');
  const hub = { lang: 'ar', slug: TRANSFER_HUB, alt: false, fixed: true, usesFx: true, fxRef: true, lastmod: '2026-11-28',
    title: 'تحويل فلوس من الخليج لمصر | قارن صافي الجنيه',
    desc: 'تحويل فلوس من السعودية والإمارات والكويت وقطر والبحرين وعُمان لمصر: سعر مرجعي مؤرخ، رسوم المزودين المنشورة بمصادرها، وحاسبة صافي الجنيه.',
    crumbs: [['تحويل فلوس لمصر', b + TRANSFER_HUB + '/']],
    body: `<div class="hero"><h1>تحويل فلوس من الخليج لمصر</h1><p class="hero-sub">أو "تحويل الأموال" و"أسعار التحويل" بالتعبير الرسمي. اختر دولة الإرسال، شوف السعر المرجعي المؤرخ، واحسب صافي الجنيه اللي يوصل من عروض المزودين.</p>${badge}</div>
<section class="card-section"><h2>اختار الدولة</h2><div class="table-wrap"><table class="data-table responsive-prices"><thead><tr><th>الدولة</th><th>1,000 بسعر مرجعي</th><th>رسوم ويسترن يونيون المنشورة</th></tr></thead><tbody>${hubRows}</tbody></table></div><p class="note">المرجع من <a href="https://open.er-api.com" rel="noopener">Exchange Rate API</a>، آخر تحديث للمصدر ${when}. هو سعر منتصف السوق ولا يخص أي شركة، ويتحرك. الرسوم المنشورة من صفحات ويسترن يونيون يوم ${CHECKED}.</p></section>${ctx.AD}
<section class="card-section"><h2>إزاي تقارن صح</h2><div class="prose"><ol><li>اسأل كل مزود: كام جنيه تستلم مقابل المبلغ ده، وكام الرسوم.</li><li>اكتبهم في حاسبة صفحة دولتك. بتحفظ آخر عرض لكل مزود على جهازك.</li><li>قارن "الصافي بالجنيه" والفرق عن المرجع.</li></ol><p>لا نعرض أرخص مزود لأن أسعار الشركات الفعلية غير منشورة على صفحاتها. نعرض فقط ما نشرته الشركات بمصدره وتاريخه.</p><p><a href="${b}egp-exchange-rates/">أسعار العملات مقابل الجنيه</a> · <a href="${b}dollar-egypt/">سعر الدولار في مصر</a></p></div></section>`,
    faq: [['إزاي أعرف أرخص طريقة تحويل فلوس لمصر؟', 'اسأل كل مزود عن سعره ورسومه، واكتبهم في حاسبة الصفحة لتقارن صافي الجنيه الواصل. أسعار المزودين الفعلية غير منشورة على صفحاتهم، فلا نعرض ترتيبًا جاهزًا.'],
      ['ما الفرق بين السعر المرجعي وسعر الشركة؟', 'المرجعي هو منتصف السوق اليومي. الشركة تضيف هامشًا ورسومًا، فالمبلغ الواصل أقل عادةً.'],
      ['هل بياناتي بتتخزن؟', 'العروض التي تكتبها في الحاسبة تُحفظ على جهازك فقط في المتصفح، ولا تُرسل لأي سيرفر.']] };
  return [hub, ...CORRIDORS.map(corridorPage)];
}
