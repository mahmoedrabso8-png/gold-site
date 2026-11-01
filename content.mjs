// محتوى صفحات الموقع (عربي + إنجليزي)
export function pages(ctx) {
  const { P, updated, chg, daily, fmt, url, AD, TODAY } = ctx;
  const out = [];

  // ── معلومات العيارات ─────────────────────────────────────
  const K = {
    24: { purity: '99.9%', mark: '999',
      ar: { label: 'ذهب خالص', use: 'السبائك والعملات الذهبية والادخار والاستثمار',
        about: `<p><strong>الذهب عيار 24</strong> هو أنقى أنواع الذهب المتداولة، بنسبة ذهب تبلغ <strong>99.9%</strong> ويحمل ختم <strong>999</strong>. لأنه طري جداً لا يُستخدم كثيراً في المجوهرات اليومية، ويُباع غالباً على شكل <strong>سبائك وعملات ذهبية</strong> لمن يريد الادخار أو الاستثمار.</p>
<p>سعر غرام عيار 24 هو الأساس الذي تُحسب منه بقية العيارات: عيار 22 = 91.7% من سعره، وعيار 21 = 87.5%، وعيار 18 = 75%. لذلك يتابعه التجار والمستثمرون أكثر من أي عيار آخر.</p>
<p>في الإمارات يُعامل <strong>الذهب الاستثماري</strong> (نقاء 99% فأكثر) عادةً بنسبة صفر في ضريبة القيمة المضافة، بخلاف المشغولات الذهبية التي تُفرض عليها ضريبة 5%. تأكد من الفاتورة عند الشراء.</p>`,
        tips: ['اشترِ السبائك من جهة معروفة واطلب شهادة تحمل الوزن والنقاء والرقم التسلسلي.', 'السبائك الصغيرة (1–5 غرام) يكون فرق سعرها عن السعر العالمي أعلى نسبياً من السبائك الكبيرة.', 'احتفظ بالتغليف الأصلي للسبيكة لأنه يسهّل إعادة بيعها بسعر جيد.'],
        faq: [['هل الذهب عيار 24 مناسب للمجوهرات؟', 'نادراً، لأنه طري ويتشوه ويُخدش بسهولة. يُفضَّل للسبائك والعملات والادخار، بينما تُصنع أغلب المجوهرات من عيار 22 أو 21 أو 18.']] },
      en: { label: 'Pure gold', use: 'bars, coins, savings and investment',
        about: `<p><strong>24 karat gold</strong> is the purest gold traded, at <strong>99.9%</strong> fineness with the hallmark <strong>999</strong>. It is too soft for everyday jewellery, so in the UAE it is mostly sold as <strong>bars and coins</strong> for saving and investing.</p>
<p>The 24K gram price is the base for every other karat: 22K is 91.7% of it, 21K is 87.5% and 18K is 75%. That is why traders and investors follow it more than any other rate.</p>
<p>In the UAE, <strong>investment gold</strong> (99% purity or higher) is generally zero-rated for VAT, while gold jewellery carries 5% VAT. Always check the invoice.</p>`,
        tips: ['Buy bars from a known dealer and ask for a certificate showing weight, purity and serial number.', 'Small bars (1–5 g) carry a higher premium over the spot price than larger bars.', 'Keep the original sealed packaging — it makes resale easier.'],
        faq: [['Is 24K gold good for jewellery?', 'Rarely. It is soft and scratches or bends easily. It is best for bars, coins and savings; most jewellery is made in 22K, 21K or 18K.']] } },
    22: { purity: '91.7%', mark: '916',
      ar: { label: 'عيار 22', use: 'الأساور والقلائد والمجوهرات الهندية',
        about: `<p><strong>الذهب عيار 22</strong> يحتوي على <strong>91.7%</strong> ذهب خالص ويُختم برقم <strong>916</strong>. وهو العيار المفضل لدى الجاليات الهندية وجنوب آسيا في الإمارات، ويُستخدم بكثرة في الأساور والقلائد وطقم العرائس.</p>
<p>يجمع عيار 22 بين لون ذهبي غني قريب من الذهب الخالص وصلابة أفضل من عيار 24، لذلك يُعدّ خياراً جيداً لمن يريد مجوهرات تحتفظ بقيمتها.</p>
<p>تُعلن محلات الذهب في دبي سعراً يومياً لعيار 22 يتبع السعر العالمي، ثم تُضاف المصنعية حسب القطعة وضريبة القيمة المضافة 5%.</p>`,
        tips: ['تأكد من وجود ختم 916 على القطعة.', 'قارن المصنعية بين أكثر من محل، فهي تختلف كثيراً حسب التصميم.', 'اطلب فاتورة توضح الوزن والعيار والمصنعية والضريبة كل بند على حدة.'],
        faq: [['ما معنى ختم 916 على الذهب؟', 'يعني أن القطعة تحتوي على 916 جزءاً من الذهب الخالص من كل 1000 جزء، أي 91.6–91.7%، وهو عيار 22.']] },
      en: { label: '22 karat', use: 'bangles, necklaces and Indian jewellery',
        about: `<p><strong>22 karat gold</strong> contains <strong>91.7%</strong> pure gold and is hallmarked <strong>916</strong>. It is the favourite karat of the Indian and South Asian community in the UAE and is widely used for bangles, chains and bridal sets.</p>
<p>22K keeps a rich yellow colour close to pure gold while being harder than 24K, so it is a good choice for jewellery that holds its value.</p>
<p>Dubai jewellers announce a daily 22K rate that follows the global spot price; making charges and 5% VAT are then added per piece.</p>`,
        tips: ['Check for the 916 hallmark on the piece.', 'Compare making charges between shops — they vary a lot by design.', 'Ask for an invoice listing weight, karat, making charge and VAT separately.'],
        faq: [['What does the 916 hallmark mean?', 'It means the piece contains 916 parts pure gold per 1000, i.e. about 91.6–91.7% — which is 22 karat.']] } },
    21: { purity: '87.5%', mark: '875',
      ar: { label: 'عيار 21', use: 'المجوهرات الخليجية والعربية',
        about: `<p><strong>الذهب عيار 21</strong> هو الأكثر طلباً في المجوهرات الخليجية والعربية، ويحتوي على <strong>87.5%</strong> ذهب خالص ويُختم برقم <strong>875</strong>.</p>
<p>يتميز بتوازن جيد بين النقاء والصلابة: لونه أصفر واضح، ويتحمل الاستخدام اليومي أكثر من عيار 22 و24، ولذلك هو العيار الأشهر في الشبكة والأطقم والخواتم في الإمارات ودول الخليج.</p>
<p>يُحسب سعر غرام عيار 21 بضرب سعر غرام عيار 24 في 0.875. والسعر المعروض هنا هو سعر الذهب الخام، أما في المحل فتُضاف المصنعية وضريبة القيمة المضافة 5%.</p>`,
        tips: ['اسأل عن سعر الغرام قبل المصنعية ثم المصنعية لوحدها، حتى تقارن بين المحلات بدقة.', 'عند البيع يشتري التاجر بسعر الذهب الخام تقريباً بدون المصنعية التي دفعتها.', 'القطع الخفيفة كثيرة النقوش تكون مصنعيتها أعلى نسبةً إلى وزنها.'],
        faq: [['لماذا عيار 21 هو الأكثر انتشاراً في الخليج؟', 'لأنه يجمع بين نسبة ذهب عالية (87.5%) تحفظ القيمة، وصلابة مناسبة للاستخدام اليومي، ولون أصفر يفضّله الذوق الخليجي.']] },
      en: { label: '21 karat', use: 'Gulf and Arabic jewellery',
        about: `<p><strong>21 karat gold</strong> is the most popular karat in Gulf and Arabic jewellery. It contains <strong>87.5%</strong> pure gold and is hallmarked <strong>875</strong>.</p>
<p>It balances purity and durability: a clear yellow colour, and harder than 22K and 24K for daily wear — which is why it dominates wedding sets and rings across the UAE and the Gulf.</p>
<p>The 21K gram price equals the 24K gram price × 0.875. The price shown here is raw gold; shops add making charges and 5% VAT.</p>`,
        tips: ['Ask for the gram rate before making charges, then the making charge separately, to compare shops properly.', 'When you sell, shops pay roughly the raw gold price — not the making charge you paid.', 'Light, heavily patterned pieces have higher making charges relative to their weight.'],
        faq: [['Why is 21K so popular in the Gulf?', 'It combines high gold content (87.5%) that holds value, enough hardness for daily wear, and the yellow tone favoured in Gulf taste.']] } },
    18: { purity: '75%', mark: '750',
      ar: { label: 'عيار 18', use: 'مجوهرات الألماس والتصاميم الأوروبية',
        about: `<p><strong>الذهب عيار 18</strong> يحتوي على <strong>75%</strong> ذهب خالص ويُختم برقم <strong>750</strong>. يُستخدم كثيراً في <strong>مجوهرات الألماس</strong> والأحجار الكريمة والتصاميم الإيطالية والأوروبية، ويتوفر بألوان أصفر وأبيض وروز.</p>
<p>لأنه أكثر صلابة من العيارات الأعلى، يثبّت الأحجار جيداً ويقاوم الخدش، لكن سعر الغرام فيه أقل لأن نسبة الذهب أقل.</p>
<p>في مجوهرات الألماس يكون الجزء الأكبر من السعر للأحجار والتصميم وليس للذهب، فلا تقارن سعرها بسعر الغرام فقط.</p>`,
        tips: ['في قطع الألماس اطلب شهادة للأحجار منفصلة عن فاتورة الذهب.', 'الذهب الأبيض عيار 18 يكون مطلياً غالباً بالروديوم ويحتاج إعادة طلاء مع الوقت.', 'عند إعادة البيع تُقيَّم القطعة غالباً بوزن الذهب فقط.'],
        faq: [['هل عيار 18 ذهب حقيقي؟', 'نعم، هو ذهب حقيقي بنسبة 75% مخلوط بمعادن أخرى لزيادة الصلابة وتغيير اللون، وهو معيار عالمي في المجوهرات الفاخرة.']] },
      en: { label: '18 karat', use: 'diamond jewellery and European designs',
        about: `<p><strong>18 karat gold</strong> contains <strong>75%</strong> pure gold and is hallmarked <strong>750</strong>. It is the standard for <strong>diamond and gemstone jewellery</strong> and Italian/European designs, and comes in yellow, white and rose.</p>
<p>Being harder than higher karats, it holds stones securely and resists scratches, but the gram price is lower because it contains less gold.</p>
<p>In diamond jewellery most of the price is the stones and design, not the gold — so don't compare it on gram price alone.</p>`,
        tips: ['For diamond pieces, ask for a separate stone certificate.', '18K white gold is usually rhodium-plated and needs re-plating over time.', 'On resale, a piece is usually valued on its gold weight only.'],
        faq: [['Is 18K real gold?', 'Yes — it is 75% real gold alloyed with other metals for hardness and colour, and it is the global standard for fine jewellery.']] } }
  };
  const KS = [24, 22, 21, 18];
  const TOLA = 11.6638;

  // ── أجزاء مشتركة ──────────────────────────────────────
  const errBox = '<p id="price-error" class="error-box" hidden></p>';
  const karatCards = L => `<div class="karat-grid">${KS.map(k => `<a class="karat-card" href="${url(L, 'gold-' + k + 'k')}">
  <span class="karat-badge">${L === 'en' ? k + 'K' : 'عيار ' + k}</span>
  <div class="karat-label">${K[k][L].label} · <bdi>${K[k].purity}</bdi></div>
  <div class="k-price">${P(k)}</div>
  <div class="k-usd">$${P(k, 1, { cur: 'usd' })}</div>
  <div class="k-unit">${L === 'en' ? 'AED per gram' : 'درهم / غرام'}</div></a>`).join('')}</div>`;
  const metaRow = L => `<div class="meta-row">
  <span>${L === 'en' ? 'Updated' : 'آخر تحديث'}: <strong>${updated(L)}</strong> ${L === 'en' ? '(Dubai)' : '(بتوقيت دبي)'}</span>
  <span>${L === 'en' ? 'Ounce' : 'الأونصة'}: <strong>${P(24, ctx.TROY)} AED</strong> · <strong>$${P(24, ctx.TROY, { cur: 'usd' })}</strong></span>
  ${chg}
  <button class="btn-sm" id="refresh" type="button">🔄 ${L === 'en' ? 'Refresh' : 'تحديث'}</button></div>`;
  const spark = L => `<section class="card-section"><div class="chart-header"><h2 style="border:0;margin:0;padding:0">${L === 'en' ? 'Price movement — last 48 hours' : 'حركة السعر — آخر 48 ساعة'}</h2>
  <div class="chart-legend">${[[24, '#fce35c'], [22, '#f9a825'], [21, '#ff8a50'], [18, '#a09880']].map(([k, c]) => `<span class="legend-item"><span class="legend-dot" style="background:${c}"></span>${k}K</span>`).join('')}</div></div>
  <canvas id="spark" aria-label="chart"></canvas></section>`;
  const LINKS = {
    ar: [['gold-21k', 'سعر عيار 21', 'الأكثر طلباً في الخليج'], ['gold-24k', 'سعر عيار 24', 'الذهب الخالص والسبائك'], ['gold-22k', 'سعر عيار 22', 'المجوهرات الهندية'], ['gold-18k', 'سعر عيار 18', 'مجوهرات الألماس'],
      ['gold-price-usd', 'سعر الذهب عالمياً', 'الأونصة بالدولار مباشر'], ['silver', 'سعر الفضة اليوم', 'الغرام والأونصة والكيلو'],
      ['gold-bars', 'أسعار السبائك', 'من 1 غرام إلى 1 كيلو'], ['gold-calculator', 'حاسبة الذهب', 'بالمصنعية والضريبة'], ['zakat-calculator', 'حاسبة زكاة الذهب', 'النصاب وقيمة الزكاة'],
      ['gold-price-yesterday', 'سعر الذهب أمس', 'وآخر 10 أيام'], ['gold-forecast', 'توقعات الذهب', 'الاتجاه والعوامل المؤثرة'], ['history', 'أرشيف الأسعار', 'سعر الذهب يوماً بيوم']],
    en: [['gold-22k', '22K gold rate', 'Popular for Indian jewellery'], ['gold-24k', '24K gold rate', 'Pure gold & bars'], ['gold-21k', '21K gold rate', 'Gulf jewellery'], ['gold-18k', '18K gold rate', 'Diamond jewellery'],
      ['gold-price-usd', 'Gold price in USD', 'Live ounce XAU/USD'], ['silver', 'Silver price', 'Per gram, ounce & kg'], ['gold-rate-inr', 'Gold rate in INR', 'Dubai price in rupees'], ['gold-rate-pkr', 'Gold rate in PKR', 'Per tola in rupees'],
      ['gold-bars', 'Gold bar prices', '1 g to 1 kg, tola bars'], ['gold-calculator', 'Gold calculator', 'With making charges & VAT'], ['gold-price-yesterday', 'Last 10 days', 'Yesterday\'s gold rate'], ['zakat-calculator', 'Zakat calculator', 'Nisab and zakat due']]
  };
  const links = (L, skip) => `<section class="card-section"><h2>${L === 'en' ? 'More gold prices & tools' : 'أسعار وأدوات أخرى'}</h2><div class="links-grid">${LINKS[L].filter(l => l[0] !== skip).map(([s, n, d]) => `<a class="link-card" href="${url(L, s)}">${n}<span>${d}</span></a>`).join('')}</div></section>`;
  const why = L => L === 'en'
    ? `<section class="card-section"><h2>Why is the shop price higher than this price?</h2><div class="prose">
<p>This site shows the <strong>raw gold price</strong> calculated from the global spot price (ounce in USD × 3.6725 ÷ 31.1035 g). Dubai jewellers announce their own daily rate per karat, which closely follows the spot price with a small difference. On top of that, a shop invoice adds:</p>
<ul><li><strong>Making charges</strong> — usually a few dirhams up to 15+ AED per gram depending on the design.</li><li><strong>5% VAT</strong> on jewellery (investment bars of 99%+ purity are generally zero-rated).</li></ul>
<p>Use the <a href="/en/gold-calculator/">gold calculator</a> to add making charges and VAT and see the final price.</p></div></section>`
    : `<section class="card-section"><h2>لماذا يختلف سعر المحل عن السعر المعروض هنا؟</h2><div class="prose">
<p>نعرض هنا <strong>سعر الذهب الخام</strong> محسوباً من السعر العالمي (سعر الأونصة بالدولار × 3.6725 ÷ 31.1035 غرام). محلات الذهب في دبي تعلن سعراً يومياً لكل عيار يتبع السعر العالمي مع فرق بسيط، ثم تُضاف إلى الفاتورة:</p>
<ul><li><strong>المصنعية (أجرة الصياغة)</strong> — من بضعة دراهم حتى 15 درهماً أو أكثر للغرام حسب التصميم.</li><li><strong>ضريبة القيمة المضافة 5%</strong> على المشغولات الذهبية (السبائك الاستثمارية بنقاء 99% فأكثر معفاة عادةً).</li></ul>
<p>استخدم <a href="/gold-calculator/">حاسبة الذهب</a> لإضافة المصنعية والضريبة ومعرفة السعر النهائي.</p></div></section>`;
  const sources = L => L === 'en'
    ? `<section class="card-section"><h2>Data source & method</h2><div class="trust-grid">
<div class="trust-item"><strong>Spot price</strong>Gold-API.com, based on international market prices.</div>
<div class="trust-item"><strong>USD/AED</strong>The dirham is officially pegged at 3.6725 per US dollar.</div>
<div class="trust-item"><strong>Updates</strong>Every 5 minutes, times shown in Dubai time (GST).</div>
<div class="trust-item"><strong>Formula</strong>(Ounce USD × 3.6725 ÷ 31.1035) × karat purity.</div>
<div class="trust-item"><strong>Not included</strong>Making charges and VAT. For information only.</div>
<div class="trust-item"><strong>Corrections</strong>Spotted an error? <a href="/contact/">Contact us</a>.</div></div></section>`
    : `<section class="card-section"><h2>مصدر البيانات وطريقة الحساب</h2><div class="trust-grid">
<div class="trust-item"><strong>السعر العالمي</strong>Gold-API.com، بناءً على أسعار السوق العالمية للذهب.</div>
<div class="trust-item"><strong>الدولار مقابل الدرهم</strong>الدرهم مربوط رسمياً بالدولار عند 3.6725.</div>
<div class="trust-item"><strong>التحديث</strong>كل 5 دقائق، والأوقات بتوقيت دبي.</div>
<div class="trust-item"><strong>المعادلة</strong>(سعر الأونصة بالدولار × 3.6725 ÷ 31.1035) × نسبة العيار.</div>
<div class="trust-item"><strong>غير مشمول</strong>المصنعية وضريبة القيمة المضافة. الأسعار للاطلاع فقط.</div>
<div class="trust-item"><strong>التصحيح</strong>لاحظت خطأ؟ <a href="/contact/">راسلنا</a> ونراجعه فوراً. <a href="/about/">من نحن</a></div></div></section>`;
  const hero = (h1, sub, L) => `<div class="hero"><h1>${h1}</h1><p class="hero-sub">${sub}</p><div class="update-badge"><span class="update-dot"></span>${L === 'en' ? 'Live — updated every 5 minutes' : 'مباشر — يُحدَّث كل 5 دقائق'}</div></div>`;

  // ── الصفحة الرئيسية ────────────────────────────────────
  out.push({ lang: 'ar', slug: '', alt: true,
    title: 'سعر الذهب اليوم في الإمارات بالدرهم | عيار 24 و22 و21 و18',
    desc: 'سعر الذهب اليوم في الإمارات ودبي بالدرهم الإماراتي، محدَّث كل 5 دقائق: عيار 24 و22 و21 و18، سعر الأونصة والتولة والسبائك، مع حاسبة الذهب بالمصنعية وحاسبة الزكاة.',
    body: `${hero('سعر الذهب اليوم في الإمارات بالدرهم', 'سعر غرام الذهب الخام لعيار 24 و22 و21 و18 بالدرهم الإماراتي والدولار', 'ar')}
${errBox}${karatCards('ar')}${metaRow('ar')}
${AD}
<section class="card-section"><h2>جدول أسعار الذهب في الإمارات اليوم</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>العيار</th><th>الغرام (درهم)</th><th>الغرام (دولار)</th><th>10 غرام (درهم)</th><th>التولة (درهم)</th><th>الأونصة (درهم)</th></tr></thead><tbody>
${KS.map(k => `<tr><td><a href="${url('ar', 'gold-' + k + 'k')}"><strong>عيار ${k}</strong></a> <span class="sub"><bdi>${K[k].purity}</bdi></span></td><td class="n">${P(k)}</td><td class="n">$${P(k, 1, { cur: 'usd' })}</td><td class="n">${P(k, 10)}</td><td class="n">${P(k, TOLA)}</td><td class="n">${P(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">السعر للذهب الخام بدون مصنعية أو ضريبة. التولة = 11.664 غرام · الأونصة = 31.1035 غرام.</p></section>
${spark('ar')}${why('ar')}${links('ar', '')}
${AD}
<section class="card-section"><h2>دليل سعر الذهب في الإمارات</h2><div class="prose">
<p>تُعدّ <strong>الإمارات</strong> من أكبر مراكز تجارة الذهب في العالم، ويشتهر <strong>سوق الذهب في ديرة بدبي</strong> وسوق الذهب في الشارقة بتنوع المحلات وتنافس الأسعار. تتحدد <strong>أسعار الذهب في الإمارات</strong> على أساس السعر العالمي للأونصة بالدولار، ولأن الدرهم مربوط بالدولار عند 3.6725 فإن حركة السعر المحلي تتبع السوق العالمية مباشرة.</p>
<p>يُتداول الذهب بعدة عيارات: <a href="/gold-24k/">عيار 24</a> للسبائك والادخار، و<a href="/gold-22k/">عيار 22</a> المنتشر في المجوهرات الهندية، و<a href="/gold-21k/">عيار 21</a> الأكثر طلباً في المجوهرات الخليجية، و<a href="/gold-18k/">عيار 18</a> لمجوهرات الألماس.</p>
<p>قبل الشراء احسب السعر النهائي بالمصنعية والضريبة من <a href="/gold-calculator/">حاسبة الذهب</a>، وإذا كنت تملك ذهباً بلغ النصاب فاحسب زكاته من <a href="/zakat-calculator/">حاسبة زكاة الذهب</a>. ويمكنك متابعة تغيّر السعر يوماً بيوم في <a href="/history/">أرشيف أسعار الذهب</a>.</p></div></section>
${sources('ar')}`,
    faq: [
      ['كم سعر غرام الذهب عيار 21 في الإمارات اليوم؟', 'يظهر سعر غرام عيار 21 محدَّثاً في أعلى الصفحة بالدرهم والدولار، ويُحدَّث كل 5 دقائق تقريباً. وهو سعر الذهب الخام بدون مصنعية أو ضريبة.'],
      ['كيف يُحسب سعر غرام الذهب بالدرهم؟', 'سعر غرام عيار 24 = سعر الأونصة بالدولار × 3.6725 ÷ 31.1035. ثم يُضرب في نسبة العيار: 0.917 لعيار 22، و0.875 لعيار 21، و0.75 لعيار 18.'],
      ['هل السعر المعروض يشمل المصنعية والضريبة؟', 'لا. السعر المعروض للذهب الخام فقط. في المحل تُضاف المصنعية حسب القطعة، وضريبة القيمة المضافة 5% على المشغولات الذهبية.'],
      ['ما الفرق بين عيار 24 و22 و21 و18؟', 'نسبة الذهب الخالص: عيار 24 = 99.9%، عيار 22 = 91.7%، عيار 21 = 87.5%، عيار 18 = 75%. كلما زاد العيار زاد السعر وقلّت صلابة الذهب.'],
      ['هل سعر الذهب في دبي مختلف عن أبوظبي والشارقة؟', 'السعر الأساسي للذهب واحد تقريباً في كل الإمارات لأنه يتبع السعر العالمي، والفرق يكون في المصنعية والعروض بين المحلات.'],
      ['ما هي التولة وكم وزنها؟', 'التولة وحدة وزن شائعة في أسواق الذهب بالإمارات والهند، وتساوي 11.664 غرام تقريباً. والسبيكة الشائعة "10 تولة" تزن نحو 116.64 غرام.']
    ] });

  out.push({ lang: 'en', slug: '', alt: true,
    title: 'Gold Rate in UAE Today (AED) — 24K, 22K, 21K, 18K Live Price',
    desc: 'Today\'s gold rate in the UAE and Dubai in AED, updated every 5 minutes: 24K, 22K, 21K and 18K per gram, per tola and per ounce, plus gold bar prices and a gold calculator with making charges and VAT.',
    body: `${hero('Gold Rate in UAE Today', '24K, 22K, 21K and 18K gold price per gram in UAE dirhams (AED) and US dollars', 'en')}
${errBox}${karatCards('en')}${metaRow('en')}
${AD}
<section class="card-section"><h2>UAE gold price table today</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Karat</th><th>1 gram (AED)</th><th>1 gram (USD)</th><th>10 grams (AED)</th><th>1 tola (AED)</th><th>1 ounce (AED)</th></tr></thead><tbody>
${KS.map(k => `<tr><td><a href="${url('en', 'gold-' + k + 'k')}"><strong>${k}K</strong></a> <span class="sub"><bdi>${K[k].purity}</bdi></span></td><td class="n">${P(k)}</td><td class="n">$${P(k, 1, { cur: 'usd' })}</td><td class="n">${P(k, 10)}</td><td class="n">${P(k, TOLA)}</td><td class="n">${P(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">Raw gold price excluding making charges and VAT. 1 tola = 11.664 g · 1 troy ounce = 31.1035 g.</p></section>
${spark('en')}${why('en')}${links('en', '')}
${AD}
<section class="card-section"><h2>Buying gold in the UAE</h2><div class="prose">
<p>The <strong>UAE</strong> is one of the world's biggest gold trading hubs, and the <strong>Deira Gold Souk in Dubai</strong> and the Sharjah gold souk are known for competitive prices. Because the dirham is pegged to the US dollar at 3.6725, the <strong>gold rate in Dubai</strong> moves directly with the global ounce price.</p>
<p>Gold is sold in several karats: <a href="/en/gold-24k/">24K</a> for bars and savings, <a href="/en/gold-22k/">22K</a> — the most popular choice for Indian jewellery — <a href="/en/gold-21k/">21K</a> for Gulf-style jewellery and <a href="/en/gold-18k/">18K</a> for diamond pieces.</p>
<p>Before you buy, work out the final price including making charges and VAT with the <a href="/en/gold-calculator/">gold calculator</a>, and compare <a href="/en/gold-bars/">gold bar prices</a> if you are buying for investment.</p></div></section>
${sources('en')}`,
    faq: [
      ['What is the 22K gold rate in Dubai today?', 'The live 22K price per gram is shown at the top of this page in AED and USD and refreshes about every 5 minutes. It is the raw gold price without making charges or VAT.'],
      ['How is the gold price per gram in AED calculated?', '24K price per gram = ounce price in USD × 3.6725 ÷ 31.1035. Multiply by the karat purity: 0.917 for 22K, 0.875 for 21K and 0.75 for 18K.'],
      ['Does the price include making charges and VAT?', 'No. It is the raw gold price only. Shops add making charges per piece and 5% VAT on jewellery.'],
      ['Is the gold rate the same in Dubai, Abu Dhabi and Sharjah?', 'The base gold rate is practically the same across the UAE because it follows the global price; differences come from making charges and shop offers.'],
      ['How many grams is one tola?', 'One tola is about 11.664 grams. The popular "10 tola" gold bar weighs about 116.64 grams.']
    ] });

  // ── صفحات العيارات ────────────────────────────────────
  const WEIGHTS = [1, 2, 4, 5, 8, 10, 20, 50, 100];
  for (const L of ['ar', 'en']) for (const k of KS) {
    const d = K[k][L], en = L === 'en';
    const rows = [...WEIGHTS.map(w => [en ? `${w} g` : `${w} غرام`, w]), [en ? '1 tola (11.66 g)' : 'تولة (11.66 غ)', TOLA], [en ? '1 ounce (31.1 g)' : 'أونصة (31.1 غ)', ctx.TROY]];
    const table = k === 24
      ? `<thead><tr><th>${en ? 'Weight' : 'الوزن'}</th><th>${en ? 'Price (AED)' : 'السعر (درهم)'}</th><th>${en ? 'Price (USD)' : 'السعر (دولار)'}</th></tr></thead><tbody>${rows.map(([n, w]) => `<tr><td>${n}</td><td class="n">${P(k, w)}</td><td class="n">$${P(k, w, { cur: 'usd' })}</td></tr>`).join('')}</tbody>`
      : `<thead><tr><th>${en ? 'Weight' : 'الوزن'}</th><th>${en ? 'Gold price (AED)' : 'سعر الذهب (درهم)'}</th><th>${en ? '+ making 3 AED/g' : '+ مصنعية 3 د/غ'}</th><th>${en ? '+ making 15 AED/g' : '+ مصنعية 15 د/غ'}</th></tr></thead><tbody>${rows.map(([n, w]) => `<tr><td>${n}</td><td class="n">${P(k, w)}</td><td class="n">${P(k, w, { mc: 3 })}</td><td class="n">${P(k, w, { mc: 15 })}</td></tr>`).join('')}</tbody>`;
    const title = en ? `${k}K Gold Rate in UAE Today — Price per Gram in AED` : `سعر الذهب عيار ${k} اليوم في الإمارات بالدرهم`;
    out.push({ lang: L, slug: `gold-${k}k`, alt: true,
      crumbs: [[en ? `${k}K gold rate` : `سعر عيار ${k}`, url(L, `gold-${k}k`)]],
      title,
      desc: en ? `Live ${k}K gold price per gram in the UAE and Dubai in AED and USD, updated every 5 minutes, with prices for 1 g to 100 g, tola and ounce${k === 24 ? '' : ' and estimates including making charges'}.`
        : `سعر غرام الذهب عيار ${k} اليوم في الإمارات ودبي بالدرهم والدولار، محدَّث كل 5 دقائق، مع جدول أسعار من 1 إلى 100 غرام والتولة والأونصة${k === 24 ? '' : ' وتقدير السعر بالمصنعية'}.`,
      body: `${hero(en ? `${k}K Gold Rate in UAE Today` : `سعر الذهب عيار ${k} اليوم في الإمارات`, en ? `${d.label} · ${K[k].purity} purity · hallmark ${K[k].mark} — used for ${d.use}` : `${d.label} · نقاء ${K[k].purity} · ختم ${K[k].mark} — يُستخدم في ${d.use}`, L)}
${errBox}
<div class="big-price"><div class="u">${en ? `${k}K — price per gram` : `سعر غرام عيار ${k}`}</div><div class="v">${P(k)} <span style="font-size:.45em">AED</span></div><div class="s">≈ $${P(k, 1, { cur: 'usd' })} USD</div>${chg}
<div class="note">${en ? 'Updated' : 'آخر تحديث'}: ${updated(L)} ${en ? '(Dubai time)' : '(بتوقيت دبي)'} · <button class="btn-sm" id="refresh" type="button">🔄 ${en ? 'Refresh' : 'تحديث'}</button></div></div>
${AD}
<section class="card-section"><h2>${en ? `${k}K gold price by weight` : `سعر الذهب عيار ${k} حسب الوزن`}</h2><div class="table-wrap"><table class="data-table">${table}</table></div>
<p class="note">${en ? 'Making-charge columns are estimates; actual charges depend on the shop and design. VAT (5% on jewellery) not included.' : 'أعمدة المصنعية تقديرية، والمصنعية الفعلية تختلف حسب المحل والتصميم. لا تشمل ضريبة القيمة المضافة (5% على المشغولات).'}</p></section>
<section class="card-section"><h2>${en ? `About ${k}K gold` : `عن الذهب عيار ${k}`}</h2><div class="prose">${d.about}
<h3>${en ? 'How the price is calculated' : 'طريقة حساب السعر'}</h3>
<p>${en ? `${k}K price per gram = (ounce price in USD × 3.6725 ÷ 31.1035) × ${(k / 24).toFixed(3)}.` : `سعر غرام عيار ${k} = (سعر الأونصة بالدولار × 3.6725 ÷ 31.1035) × ${(k / 24).toFixed(3)}.`}</p>
<h3>${en ? 'Buying tips' : 'نصائح عند الشراء'}</h3><ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul></div></section>
${links(L, `gold-${k}k`)}`,
      faq: [
        [en ? `What is the ${k}K gold price per gram in the UAE today?` : `كم سعر غرام الذهب عيار ${k} في الإمارات اليوم؟`,
          en ? `The live ${k}K price per gram is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges or VAT.` : `يظهر سعر غرام عيار ${k} محدَّثاً في أعلى هذه الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية أو ضريبة.`],
        [en ? `How much gold is in ${k}K?` : `كم نسبة الذهب في عيار ${k}؟`,
          en ? `${k}K gold contains ${K[k].purity} pure gold and carries the hallmark ${K[k].mark}.` : `يحتوي عيار ${k} على ${K[k].purity} ذهب خالص ويحمل ختم ${K[k].mark}.`],
        ...d.faq
      ] });
  }

  // ── حاسبة الذهب ───────────────────────────────────────
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    const opt = [24, 22, 21, 18, 14].map(k => `<option value="${k}"${k === (en ? 22 : 21) ? ' selected' : ''}>${en ? `${k}K (${k === 14 ? '58.3%' : K[k].purity})` : `عيار ${k} (${k === 14 ? '58.3%' : K[k].purity})`}</option>`).join('');
    out.push({ lang: L, slug: 'gold-calculator', alt: true,
      crumbs: [[en ? 'Gold calculator' : 'حاسبة الذهب', url(L, 'gold-calculator')]],
      title: en ? 'Gold Price Calculator UAE — With Making Charges & VAT (AED)' : 'حاسبة سعر الذهب في الإمارات بالمصنعية والضريبة | بالدرهم',
      desc: en ? 'Calculate the price of gold in the UAE by weight and karat using today\'s live rate, then add making charges and 5% VAT to get the final shop price in AED and USD.'
        : 'احسب سعر الذهب في الإمارات حسب الوزن والعيار بسعر اليوم المباشر، وأضف المصنعية وضريبة القيمة المضافة 5% لمعرفة السعر النهائي في المحل بالدرهم والدولار.',
      schema: [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: en ? 'UAE Gold Price Calculator' : 'حاسبة سعر الذهب الإمارات', applicationCategory: 'FinanceApplication', operatingSystem: 'Any', inLanguage: L, url: ctx.SITE + url(L, 'gold-calculator'), offers: { '@type': 'Offer', price: '0', priceCurrency: 'AED' } }],
      body: `${hero(en ? 'Gold Price Calculator (UAE)' : 'حاسبة سعر الذهب بالمصنعية والضريبة', en ? 'Today\'s live rate × weight + making charges + VAT' : 'سعر اليوم المباشر × الوزن + المصنعية + الضريبة', L)}
${errBox}
<section class="card-section" id="calc"><h2>${en ? 'Calculate your gold price' : 'احسب سعر ذهبك'}</h2>
<div class="form-grid">
<div class="field"><label for="c-w">${en ? 'Weight (grams)' : 'الوزن (غرام)'}</label><input id="c-w" type="number" inputmode="decimal" min="0" step="0.01" value="10" /></div>
<div class="field"><label for="c-k">${en ? 'Karat' : 'العيار'}</label><select id="c-k">${opt}</select></div>
<div class="field"><label for="c-mc">${en ? 'Making charge (AED per gram)' : 'المصنعية (درهم للغرام)'}</label><input id="c-mc" type="number" inputmode="decimal" min="0" step="0.5" value="0" /></div>
<div class="field" style="display:flex;align-items:flex-end"><label class="check"><input id="c-vat" type="checkbox" /> ${en ? 'Add 5% VAT (jewellery)' : 'إضافة ضريبة القيمة المضافة 5% (للمشغولات)'}</label></div>
</div>
<div class="result">
<div class="result-row"><span>${en ? 'Price per gram' : 'سعر الغرام'}</span><strong><span id="c-pg">—</span> AED</strong></div>
<div class="result-row"><span>${en ? 'Gold value' : 'قيمة الذهب'}</span><strong><span id="c-gold">—</span> AED</strong></div>
<div class="result-row"><span>${en ? 'Making charges' : 'المصنعية'}</span><strong><span id="c-make">—</span> AED</strong></div>
<div class="result-row"><span>${en ? 'VAT' : 'الضريبة'}</span><strong><span id="c-tax">—</span> AED</strong></div>
<div class="result-row total"><span>${en ? 'Total' : 'الإجمالي'}</span><strong><span id="c-total">—</span> AED</strong></div>
<div class="result-row"><span>${en ? 'Total in USD' : 'الإجمالي بالدولار'}</span><strong>$<span id="c-usd">—</span></strong></div>
</div>
<p class="note">${en ? 'Based on the live raw gold price. Shop rates can differ slightly.' : 'الحساب على سعر الذهب الخام المباشر، وقد يختلف سعر المحل قليلاً.'}</p></section>
${AD}
<section class="card-section"><h2>${en ? 'How to use the calculator' : 'طريقة استخدام الحاسبة'}</h2><div class="prose">
${en ? `<p>Enter the weight shown on the tag or invoice, choose the karat, and type the making charge the shop quotes per gram. Tick VAT for jewellery to see the final amount you will pay.</p>
<p><strong>Selling gold?</strong> Leave making charges at 0 and VAT unticked — shops buy back based on the raw gold value, usually minus a small margin.</p>
<p>Formula: total = weight × (gram price of the karat + making charge) × (1.05 if VAT applies).</p>`
        : `<p>أدخل الوزن المكتوب على البطاقة أو الفاتورة، واختر العيار، ثم اكتب المصنعية التي يطلبها المحل للغرام. فعّل الضريبة إذا كانت القطعة مشغولات ذهبية لتعرف المبلغ النهائي.</p>
<p><strong>تريد البيع؟</strong> اجعل المصنعية صفراً وألغِ الضريبة، فالمحل يشتري على أساس قيمة الذهب الخام مع خصم بسيط في الغالب.</p>
<p>المعادلة: الإجمالي = الوزن × (سعر غرام العيار + المصنعية) × (1.05 إذا طُبّقت الضريبة).</p>`}</div></section>
${links(L, 'gold-calculator')}`,
      faq: en ? [
        ['How much are making charges in the UAE?', 'They vary by shop and design — from a few dirhams per gram for simple chains to 15 AED per gram or more for detailed pieces. Always ask for it separately from the gold rate.'],
        ['Is VAT charged on gold in the UAE?', 'Gold jewellery carries 5% VAT. Investment gold of 99% purity or higher is generally zero-rated.'],
        ['Is the calculator price the same as the shop price?', 'It is very close for the gold value. Shops set their own daily rate that follows the global price, so small differences are normal.']
      ] : [
        ['كم تبلغ المصنعية في الإمارات؟', 'تختلف حسب المحل والتصميم، من بضعة دراهم للغرام في السلاسل البسيطة حتى 15 درهماً أو أكثر للقطع المشغولة. اطلبها دائماً منفصلة عن سعر الغرام.'],
        ['هل توجد ضريبة على الذهب في الإمارات؟', 'نعم، ضريبة القيمة المضافة 5% على المشغولات الذهبية. أما الذهب الاستثماري بنقاء 99% فأكثر فيُعامل عادةً بنسبة صفر.'],
        ['هل سعر الحاسبة هو نفس سعر المحل؟', 'قريب جداً في قيمة الذهب، لكن المحلات تعلن سعراً يومياً خاصاً بها يتبع السعر العالمي، لذلك الفروق البسيطة طبيعية.']
      ] });
  }

  // ── حاسبة الزكاة ──────────────────────────────────────
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    const inp = k => `<div class="field"><label for="z-${k}">${en ? `${k}K gold (grams)` : `ذهب عيار ${k} (غرام)`}</label><input id="z-${k}" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0" /></div>`;
    out.push({ lang: L, slug: 'zakat-calculator', alt: true,
      crumbs: [[en ? 'Zakat calculator' : 'حاسبة زكاة الذهب', url(L, 'zakat-calculator')]],
      title: en ? 'Zakat on Gold Calculator UAE — Nisab Today in AED' : 'حاسبة زكاة الذهب في الإمارات | قيمة النصاب اليوم بالدرهم',
      desc: en ? 'Calculate zakat on your gold in the UAE using today\'s live gold price. Enter grams per karat to see the pure-gold weight, whether you reach the nisab (85 g) and the 2.5% zakat due in AED.'
        : 'احسب زكاة الذهب في الإمارات بسعر اليوم المباشر: أدخل الوزن لكل عيار لتعرف وزن الذهب الخالص، وهل بلغ النصاب (85 غرام)، وقيمة الزكاة 2.5% بالدرهم.',
      schema: [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: en ? 'Zakat on Gold Calculator' : 'حاسبة زكاة الذهب', applicationCategory: 'FinanceApplication', operatingSystem: 'Any', inLanguage: L, url: ctx.SITE + url(L, 'zakat-calculator'), offers: { '@type': 'Offer', price: '0', priceCurrency: 'AED' } }],
      body: `${hero(en ? 'Zakat on Gold Calculator' : 'حاسبة زكاة الذهب', en ? 'Nisab and zakat due at today\'s live gold price' : 'النصاب وقيمة الزكاة بسعر الذهب اليوم', L)}
${errBox}
<section class="card-section" id="zakat"><h2>${en ? 'Calculate zakat on your gold' : 'احسب زكاة ذهبك'}</h2>
<div class="info-box">${en ? 'Nisab today = 85 g of pure gold ≈ ' : 'نصاب الذهب اليوم = 85 غرام ذهب خالص ≈ '}<strong><span data-nisab>${ctx.g24 ? fmt(ctx.g24 * 85) : '—'}</span> ${en ? 'AED' : 'درهم'}</strong></div>
<div class="form-grid">${[24, 22, 21, 18].map(inp).join('')}</div>
<div class="result"><p class="result-msg" id="z-msg"></p>
<div class="result-row"><span>${en ? 'Pure gold equivalent' : 'ما يعادله من الذهب الخالص'}</span><strong><span id="z-pure">0.00</span> ${en ? 'g' : 'غ'}</strong></div>
<div class="result-row"><span>${en ? 'Value of your gold' : 'قيمة ذهبك'}</span><strong><span id="z-val">0.00</span> AED</strong></div>
<div class="result-row total"><span>${en ? 'Zakat due (2.5%)' : 'الزكاة الواجبة (2.5%)'}</span><strong><span id="z-amt">0.00</span> AED</strong></div></div>
<p class="note">${en ? 'Zakat is due when your gold reaches the nisab and one lunar year (hawl) has passed. Scholars differ on jewellery worn for personal use — ask a trusted scholar or the official fatwa authority.' : 'تجب الزكاة إذا بلغ الذهب النصاب ومرّ عليه حول قمري كامل. ويختلف العلماء في زكاة الحُلي المعدّ للبس، فيُستحسن سؤال عالم موثوق أو جهة الإفتاء الرسمية في الدولة.'}</p></section>
${AD}
<section class="card-section"><h2>${en ? 'How zakat on gold is calculated' : 'كيف تُحسب زكاة الذهب؟'}</h2><div class="prose">
${en ? `<p>1. Convert each karat to pure gold: 22K × 0.917, 21K × 0.875, 18K × 0.75.<br>2. If the total pure gold is <strong>85 grams or more</strong>, you have reached the nisab.<br>3. Zakat = total value × <strong>2.5%</strong>.</p><p>Some scholars use a nisab of about 87.48 g (20 mithqal); the difference is small. The calculator uses 85 g, the figure most commonly used today.</p>`
        : `<p>1. حوّل كل عيار إلى ما يعادله من الذهب الخالص: عيار 22 × 0.917، عيار 21 × 0.875، عيار 18 × 0.75.<br>2. إذا بلغ المجموع <strong>85 غراماً أو أكثر</strong> فقد بلغت النصاب.<br>3. الزكاة = إجمالي القيمة × <strong>2.5%</strong>.</p><p>يقدّر بعض العلماء النصاب بنحو 87.48 غرام (20 مثقالاً)، والفرق بسيط. تعتمد الحاسبة 85 غراماً وهو التقدير الأكثر استخداماً اليوم.</p>`}</div></section>
${links(L, 'zakat-calculator')}`,
      faq: en ? [
        ['What is the nisab of gold?', 'The nisab is 85 grams of pure (24K) gold. Its value in AED changes with the gold price and is shown live on this page.'],
        ['Is zakat due on gold jewellery?', 'Scholars differ: some require zakat on all gold, others exempt jewellery worn normally. Ask a trusted scholar for your case.'],
        ['What rate is zakat on gold?', 'Zakat on gold is 2.5% of its total value once it reaches the nisab and a lunar year has passed.']
      ] : [
        ['ما هو نصاب الذهب؟', 'نصاب الذهب 85 غراماً من الذهب الخالص (عيار 24)، وتتغير قيمته بالدرهم مع سعر الذهب وتظهر محدَّثة في هذه الصفحة.'],
        ['هل تجب الزكاة في ذهب الزينة؟', 'اختلف العلماء: منهم من أوجبها في كل ذهب، ومنهم من أعفى الحُلي المعدّ للبس المعتاد. يُستحسن سؤال عالم موثوق عن حالتك.'],
        ['كم نسبة زكاة الذهب؟', 'نسبة الزكاة 2.5% من إجمالي قيمة الذهب إذا بلغ النصاب ومرّ عليه حول قمري.']
      ] });
  }

  // ── السبائك ────────────────────────────────────────────
  const BARS = [[1, '1 g', '1 غرام'], [2.5, '2.5 g', '2.5 غرام'], [5, '5 g', '5 غرام'], [10, '10 g', '10 غرام'], [20, '20 g', '20 غرام'], [ctx.TROY, '1 oz (31.1 g)', 'أونصة (31.1 غ)'], [50, '50 g', '50 غرام'], [100, '100 g', '100 غرام'], [TOLA * 10, '10 tola (116.64 g)', '10 تولة (116.64 غ)'], [250, '250 g', '250 غرام'], [500, '500 g', '500 غرام'], [1000, '1 kg', '1 كيلوغرام']];
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    out.push({ lang: L, slug: 'gold-bars', alt: true,
      crumbs: [[en ? 'Gold bar prices' : 'أسعار السبائك', url(L, 'gold-bars')]],
      title: en ? 'Gold Bar Price in UAE Today — 1g, 10g, 100g, 10 Tola, 1kg (AED)' : 'سعر سبيكة الذهب اليوم في الإمارات | 10 غرام و100 غرام و10 تولة',
      desc: en ? 'Today\'s 24K gold bar prices in the UAE in AED and USD: 1 g, 5 g, 10 g, 1 ounce, 100 g, 10 tola and 1 kg, updated every 5 minutes, with tips on premiums and VAT.'
        : 'أسعار سبائك الذهب عيار 24 اليوم في الإمارات بالدرهم والدولار: 1 و5 و10 غرام، الأونصة، 100 غرام، 10 تولة، والكيلو، محدَّثة كل 5 دقائق مع نصائح الشراء.',
      body: `${hero(en ? 'Gold Bar Prices in UAE Today' : 'أسعار سبائك الذهب اليوم في الإمارات', en ? '24K (999.9) bars by weight — raw gold value' : 'سبائك عيار 24 حسب الوزن — قيمة الذهب الخام', L)}
${errBox}
<section class="card-section"><h2>${en ? 'Gold bar prices by weight' : 'سعر السبيكة حسب الوزن'}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Bar' : 'السبيكة'}</th><th>${en ? 'Price (AED)' : 'السعر (درهم)'}</th><th>${en ? 'Price (USD)' : 'السعر (دولار)'}</th></tr></thead><tbody>
${BARS.map(([w, e, a]) => `<tr><td>${en ? e : a}</td><td class="n">${P(24, w)}</td><td class="n">$${P(24, w, { cur: 'usd' })}</td></tr>`).join('')}
</tbody></table></div><p class="note">${en ? 'Updated' : 'آخر تحديث'}: ${updated(L)} · ${en ? 'Raw gold value; dealers add a premium, higher for small bars.' : 'قيمة الذهب الخام، ويضيف التاجر علاوة تكون أعلى في السبائك الصغيرة.'}</p></section>
${AD}
<section class="card-section"><h2>${en ? 'Buying gold bars in the UAE' : 'شراء سبائك الذهب في الإمارات'}</h2><div class="prose">
${en ? `<p>Gold bars are the simplest way to invest in physical gold: you pay close to the raw gold value with little or no making charge. In the UAE they are sold by jewellers, bullion dealers and some banks, in sizes from 1 gram to 1 kilogram. The <strong>10 tola bar</strong> (116.64 g) is a local favourite.</p>
<ul><li><strong>Premium:</strong> every bar is priced a little above the spot value. The premium per gram is highest on 1–5 g bars and lowest on 100 g and 1 kg bars.</li><li><strong>VAT:</strong> investment gold of 99% purity or higher is generally zero-rated in the UAE — check your invoice.</li><li><strong>Authenticity:</strong> buy sealed bars from recognised refiners with a serial number and assay certificate.</li><li><strong>Resale:</strong> sealed, undamaged bars sell back more easily and closer to the spot price.</li></ul>`
        : `<p>السبائك أبسط طريقة للاستثمار في الذهب الفعلي، لأنك تدفع سعراً قريباً من قيمة الذهب الخام بمصنعية بسيطة أو بدونها. تُباع في الإمارات لدى محلات الذهب وتجار السبائك وبعض البنوك بأوزان من 1 غرام حتى 1 كيلوغرام، وتشتهر محلياً <strong>سبيكة 10 تولة</strong> (116.64 غرام).</p>
<ul><li><strong>العلاوة:</strong> كل سبيكة تُباع أعلى قليلاً من قيمة الذهب الخام، والعلاوة للغرام أعلى في السبائك الصغيرة (1–5 غرام) وأقل في سبائك 100 غرام والكيلو.</li><li><strong>الضريبة:</strong> الذهب الاستثماري بنقاء 99% فأكثر يُعامل عادةً بنسبة صفر في الإمارات، تأكد من الفاتورة.</li><li><strong>الأصالة:</strong> اشترِ سبائك مغلّفة من مصافٍ معروفة تحمل رقماً تسلسلياً وشهادة فحص.</li><li><strong>إعادة البيع:</strong> السبيكة المغلّفة السليمة تُباع بسهولة أكبر وبسعر أقرب للسعر العالمي.</li></ul>`}</div></section>
${links(L, 'gold-bars')}`,
      faq: en ? [
        ['What is the price of a 10 gram gold bar in the UAE today?', 'The live raw value of a 10 g 24K bar is shown in the table above. Dealers add a small premium, so the shop price is slightly higher.'],
        ['What is a 10 tola gold bar?', 'A 10 tola bar weighs about 116.64 grams of 24K gold and is one of the most traded bar sizes in the UAE.'],
        ['Is there VAT on gold bars in the UAE?', 'Investment gold of 99% purity or higher is generally zero-rated for VAT in the UAE.']
      ] : [
        ['كم سعر سبيكة 10 غرام في الإمارات اليوم؟', 'تظهر قيمة سبيكة 10 غرام عيار 24 محدَّثة في الجدول أعلاه، ويضيف التاجر علاوة بسيطة فيكون سعر المحل أعلى قليلاً.'],
        ['ما هي سبيكة 10 تولة؟', 'سبيكة وزنها نحو 116.64 غرام من الذهب عيار 24، وهي من أكثر أوزان السبائك تداولاً في الإمارات.'],
        ['هل توجد ضريبة على سبائك الذهب في الإمارات؟', 'الذهب الاستثماري بنقاء 99% فأكثر يُعامل عادةً بنسبة صفر في ضريبة القيمة المضافة.']
      ] });
  }

  // ── أرشيف الأسعار ─────────────────────────────────────
  const arDate = d => new Intl.DateTimeFormat('ar-AE-u-nu-latn', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(d + 'T00:00:00Z'));
  const arMonth = d => new Intl.DateTimeFormat('ar-AE-u-nu-latn', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(d + 'T00:00:00Z'));
  const pct = (a, b) => b ? (a - b) / b * 100 : null;
  const chgTxt = v => v == null ? '—' : `<span class="chg ${v > 0.005 ? 'up' : v < -0.005 ? 'dn' : 'fl'}" style="margin:0">${v > 0.005 ? '▲' : v < -0.005 ? '▼' : '●'} ${Math.abs(v).toFixed(2)}%</span>`;
  const days = daily.filter(d => d.n >= 1).sort((a, b) => a.day < b.day ? -1 : 1);
  const desc = [...days].reverse();
  let histBody;
  if (!days.length) {
    histBody = `<p class="empty">سيظهر الأرشيف هنا تلقائياً بعد أول أيام من تسجيل الأسعار.</p>`;
  } else {
    const months = new Map();
    desc.forEach(d => { const m = d.day.slice(0, 7); if (!months.has(m)) months.set(m, []); months.get(m).push(d); });
    histBody = [...months.entries()].map(([m, list]) => `<section class="card-section"><h2>أسعار الذهب في ${arMonth(m + '-01')}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>التاريخ</th><th>عيار 24</th><th>عيار 22</th><th>عيار 21</th><th>عيار 18</th><th>التغير</th></tr></thead><tbody>
${list.map(d => { const i = days.indexOf(d); return `<tr><td>${d.n >= 3 ? `<a href="/history/${d.day}/">${arDate(d.day)}</a>` : arDate(d.day)}</td>${KS.map(k => `<td class="n">${fmt(d.close * k / 24)}</td>`).join('')}<td>${chgTxt(i > 0 ? pct(d.close, days[i - 1].close) : null)}</td></tr>`; }).join('')}
</tbody></table></div><p class="note">سعر الإغلاق لغرام الذهب بالدرهم بتوقيت دبي.</p></section>`).join('');
  }
  out.push({ lang: 'ar', slug: 'history', noindex: days.length < 7,
    crumbs: [['أرشيف الأسعار', '/history/']],
    title: 'أرشيف أسعار الذهب في الإمارات | سعر الذهب يوماً بيوم',
    desc: 'سجل أسعار الذهب في الإمارات يوماً بيوم بالدرهم: سعر الإغلاق لعيار 24 و22 و21 و18 ونسبة التغير اليومية، مع صفحة تفصيلية لكل يوم.',
    body: `${hero('أرشيف أسعار الذهب في الإمارات', 'سعر الإغلاق اليومي لغرام الذهب بالدرهم الإماراتي', 'ar')}
${spark('ar')}${histBody}${links('ar', 'history')}` });

  days.forEach((d, i) => {
    if (d.n < 3) return;
    const prev = days[i - 1], next = days[i + 1];
    const c21 = d.close * 21 / 24, p = prev ? pct(d.close, prev.close) : null;
    const word = p == null ? '' : p > 0.005 ? `بارتفاع ${p.toFixed(2)}%` : p < -0.005 ? `بانخفاض ${Math.abs(p).toFixed(2)}%` : 'دون تغيّر يُذكر';
    out.push({ lang: 'ar', slug: `history/${d.day}`, lastmod: d.day, noAds: false,
      crumbs: [['أرشيف الأسعار', '/history/'], [arDate(d.day), `/history/${d.day}/`]],
      title: `سعر الذهب في الإمارات يوم ${arDate(d.day)} بالدرهم`,
      desc: `أسعار الذهب في الإمارات يوم ${arDate(d.day)}: أغلق عيار 21 عند ${fmt(c21)} درهم للغرام وعيار 24 عند ${fmt(d.close)} درهم${word ? '، ' + word + ' عن اليوم السابق' : ''}.`,
      body: `<div class="hero"><h1>سعر الذهب في الإمارات يوم ${arDate(d.day)}</h1><p class="hero-sub">الافتتاح والإغلاق وأعلى وأدنى سعر لغرام الذهب بالدرهم</p></div>
<div class="day-nav">${prev ? `<a href="/history/${prev.day}/">→ ${arDate(prev.day)}</a>` : '<span></span>'}${next ? `<a href="/history/${next.day}/">${arDate(next.day)} ←</a>` : '<a href="/">سعر اليوم ←</a>'}</div>
<section class="card-section"><h2>ملخص اليوم</h2><p class="prose">أغلق سعر غرام الذهب <strong>عيار 21</strong> في الإمارات يوم ${arDate(d.day)} عند <strong>${fmt(c21)} درهم</strong>${word ? ' ' + word + ' مقارنة باليوم السابق' : ''}، بينما أغلق <strong>عيار 24</strong> عند ${fmt(d.close)} درهم و<strong>عيار 22</strong> عند ${fmt(d.close * 22 / 24)} درهم. وتراوح سعر عيار 24 خلال اليوم بين ${fmt(d.low)} و${fmt(d.high)} درهم.</p></section>
<section class="card-section"><h2>أسعار العيارات يوم ${arDate(d.day)}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>العيار</th><th>الافتتاح</th><th>الأعلى</th><th>الأدنى</th><th>الإغلاق</th></tr></thead><tbody>
${KS.map(k => `<tr><td><a href="/gold-${k}k/"><strong>عيار ${k}</strong></a></td>${[d.open, d.high, d.low, d.close].map(v => `<td class="n">${fmt(v * k / 24)}</td>`).join('')}</tr>`).join('')}
<tr><td><strong>الأونصة</strong></td>${[d.open, d.high, d.low, d.close].map(v => `<td class="n">${fmt(v * ctx.TROY)}</td>`).join('')}</tr>
</tbody></table></div><p class="note">الأسعار بالدرهم للغرام بتوقيت دبي، للذهب الخام بدون مصنعية أو ضريبة.</p></section>
${links('ar', '')}` });
  });

  // ── من نحن / اتصل بنا / الخصوصية ───────────────────────
  out.push({ lang: 'ar', slug: 'about', crumbs: [['من نحن', '/about/']],
    title: 'من نحن | معلوماتي — أسعار الذهب في الإمارات',
    desc: 'تعرّف على موقع معلوماتي لأسعار الذهب في الإمارات: مصادر البيانات، طريقة حساب الأسعار، سياسة التحرير والتصحيح.',
    schema: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'من نحن', url: ctx.SITE + '/about/' }],
    body: `<div class="hero"><h1>من نحن</h1></div>
<section class="card-section"><h2>عن الموقع</h2><div class="prose">
<p><strong>معلوماتي (maelumatii.com)</strong> موقع عربي مستقل متخصص في <strong>أسعار الذهب في الإمارات</strong> والأدوات المالية المرتبطة بها، مثل حاسبة الذهب بالمصنعية والضريبة وحاسبة زكاة الذهب وأسعار السبائك وأرشيف الأسعار اليومي. هدفنا أن يجد الزائر سعراً واضحاً ومحدَّثاً وطريقة حساب مفهومة قبل أن يشتري أو يبيع.</p>
<p>يدير الموقع ويراجع بياناته <strong>فريق تحرير معلوماتي</strong>.</p></div></section>
<section class="card-section"><h2>مصادر البيانات وطريقة الحساب</h2><div class="prose">
<p>نحصل على سعر الأونصة العالمي بالدولار من <strong>Gold-API.com</strong>، ونحوّله إلى الدرهم بسعر الربط الرسمي <strong>3.6725</strong> درهم للدولار، ثم نقسمه على 31.1035 (غرامات الأونصة) لنحصل على سعر غرام عيار 24، ونضربه في نسبة كل عيار.</p>
<p>يُحدَّث السعر كل 5 دقائق تقريباً، ويُحفظ في قاعدة بيانات لبناء الرسم البياني والأرشيف اليومي. جميع الأوقات بتوقيت دبي.</p></div></section>
<section class="card-section"><h2>سياسة التحرير والتصحيح</h2><div class="prose">
<ul><li>الأسعار تُحسب آلياً من المصدر دون أي تعديل يدوي.</li><li>إذا تعذّر الاتصال بالمصدر نعرض آخر سعر محفوظ مع تنبيه واضح للزائر.</li><li>نوضّح دائماً أن الأسعار للذهب الخام ولا تشمل المصنعية أو ضريبة القيمة المضافة.</li><li>المحتوى الإرشادي يُراجع دورياً، وأي خطأ يُبلَّغ عنه نصحّحه في أسرع وقت. <a href="/contact/">أبلغنا عن خطأ</a>.</li></ul>
<p><strong>تنبيه:</strong> المعلومات في الموقع للاطلاع فقط ولا تمثّل نصيحة مالية أو استثمارية.</p></div></section>` });

  out.push({ lang: 'ar', slug: 'contact', crumbs: [['اتصل بنا', '/contact/']],
    title: 'اتصل بنا | معلوماتي — أسعار الذهب في الإمارات',
    desc: 'تواصل مع فريق موقع معلوماتي لأسعار الذهب في الإمارات للاستفسارات والاقتراحات والإبلاغ عن الأخطاء.',
    schema: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'اتصل بنا', url: ctx.SITE + '/contact/' }],
    body: `<div class="hero"><h1>اتصل بنا</h1><p class="hero-sub">Contact us</p></div>
<section class="card-section"><div class="prose">
<p>يسعدنا تواصلك للاستفسارات أو الاقتراحات أو الإبلاغ عن خطأ في الأسعار أو المحتوى.</p>
<p><strong>البريد الإلكتروني:</strong> <a href="mailto:contact@maelumatii.com">contact@maelumatii.com</a></p>
<p>نردّ عادةً خلال يومي عمل. عند الإبلاغ عن خطأ في السعر يُرجى ذكر الصفحة والوقت بتوقيت دبي.</p>
<p>For enquiries in English, email <a href="mailto:contact@maelumatii.com">contact@maelumatii.com</a>.</p></div></section>` });

  out.push({ lang: 'ar', slug: 'privacy', crumbs: [['سياسة الخصوصية', '/privacy/']],
    title: 'سياسة الخصوصية | معلوماتي',
    desc: 'سياسة الخصوصية لموقع معلوماتي: البيانات التي نجمعها، ملفات تعريف الارتباط، إعلانات Google AdSense، وحقوقك.',
    body: `<div class="hero"><h1>سياسة الخصوصية</h1><p class="hero-sub">آخر تحديث: ${arDate(TODAY)}</p></div>
<section class="card-section"><div class="prose">
<p>توضح هذه السياسة كيف يتعامل موقع <strong>maelumatii.com</strong> مع بيانات الزوار.</p>
<h3>البيانات التي نجمعها</h3>
<p>لا نطلب تسجيلاً ولا نجمع أسماء أو أرقام هواتف. قيم الحاسبات (الوزن والعيار والمصنعية) تُحسب داخل متصفحك ولا تُرسل إلينا. قد تحفظ صفحاتنا تفضيلات بسيطة في متصفحك (مثل إخفاء نافذة تثبيت التطبيق).</p>
<h3>الإعلانات وملفات تعريف الارتباط</h3>
<p>نستخدم <strong>Google AdSense</strong> لعرض الإعلانات. تستخدم Google وشركاؤها ملفات تعريف الارتباط (Cookies) لعرض إعلانات بناءً على زياراتك السابقة لهذا الموقع ومواقع أخرى. يتيح ملف تعريف الارتباط الخاص بالإعلانات لـ Google وشركائها عرض الإعلانات لك بناءً على زياراتك.</p>
<p>يمكنك إيقاف الإعلانات المخصصة من <a href="https://www.google.com/settings/ads" rel="nofollow noopener" target="_blank">إعدادات الإعلانات في Google</a>، والاطلاع على <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow noopener" target="_blank">كيف تستخدم Google البيانات</a>. كما يمكنك إيقاف ملفات تعريف الارتباط من إعدادات متصفحك.</p>
<h3>خدمات خارجية</h3>
<p>نجلب أسعار الذهب من Gold-API.com ونحفظ الأسعار (وليس بيانات الزوار) في قاعدة بيانات Supabase. ونستخدم خطوط Google Fonts، وتتم استضافة الموقع على Cloudflare التي قد تسجّل بيانات تقنية مثل عنوان IP لأغراض الأمان.</p>
<h3>الأطفال</h3><p>الموقع غير موجّه للأطفال دون 13 عاماً ولا نجمع بياناتهم عن قصد.</p>
<h3>التواصل</h3><p>لأي سؤال عن الخصوصية: <a href="mailto:contact@maelumatii.com">contact@maelumatii.com</a>.</p>
</div></section>` });

  // ══════════════ الصفحات الجديدة (من بيانات Keyword Planner) ══════════════
  const { S, FX } = ctx;
  const enDate = d => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(d + 'T00:00:00Z'));
  const todayDubai = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });

  // ── الفضة ──────────────────────────────────────────────
  const AGP = [[1, '999', 'فضة خالصة', 'Fine silver'], [0.925, '925', 'فضة استرليني', 'Sterling silver'], [0.9, '900', 'فضة 900', 'Coin silver'], [0.8, '800', 'فضة 800', '800 silver']];
  const AGW = [[1, '1 g', '1 غرام'], [10, '10 g', '10 غرام'], [ctx.TROY, '1 oz (31.1 g)', 'أونصة (31.1 غ)'], [100, '100 g', '100 غرام'], [TOLA * 10, '10 tola (116.64 g)', '10 تولة (116.64 غ)'], [500, '500 g', '500 غرام'], [1000, '1 kg', '1 كيلوغرام']];
  const ratio = ctx.g24 && ctx.ag ? fmt(ctx.g24 / ctx.ag, 1) : '—';
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    out.push({ lang: L, slug: 'silver', alt: true, usesAg: true,
      crumbs: [[en ? 'Silver price' : 'سعر الفضة', url(L, 'silver')]],
      title: en ? 'Silver Price in UAE Today — per Gram, Ounce & Kg in AED' : 'سعر الفضة اليوم في الإمارات بالدرهم | الغرام والأونصة والكيلو',
      desc: en ? 'Live silver price in the UAE and Dubai in AED and USD: price per gram for 999 and 925 sterling silver, per ounce, per tola and per kilo, updated every 5 minutes.'
        : 'سعر الفضة اليوم في الإمارات ودبي بالدرهم والدولار: سعر غرام الفضة عيار 999 و925، وسعر الأونصة والتولة والكيلو، محدَّث كل 5 دقائق.',
      body: `${hero(en ? 'Silver Price in UAE Today' : 'سعر الفضة اليوم في الإمارات', en ? 'Price per gram, ounce and kilo in UAE dirhams and US dollars' : 'سعر الغرام والأونصة والكيلو بالدرهم الإماراتي والدولار', L)}
<div class="big-price"><div class="u">${en ? 'Fine silver (999) — per gram' : 'غرام الفضة الخالصة (999)'}</div><div class="v">${S(1)} <span style="font-size:.45em">AED</span></div>
<div class="s">${en ? 'Ounce' : 'الأونصة'}: <bdi>$${S(1, ctx.TROY, { cur: 'usd' })}</bdi> · <bdi>${S(1, ctx.TROY)} AED</bdi></div>
<div class="note">${en ? 'Updated' : 'آخر تحديث'}: <span data-upd-ag>${en ? 'live' : 'مباشر'}</span> · ${en ? 'Gold/silver ratio' : 'نسبة الذهب إلى الفضة'}: <strong>${ratio}</strong></div></div>
${AD}
<section class="card-section"><h2>${en ? 'Silver price per gram by purity' : 'سعر غرام الفضة حسب العيار'}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Purity' : 'العيار'}</th><th>${en ? '1 gram (AED)' : 'الغرام (درهم)'}</th><th>${en ? '1 gram (USD)' : 'الغرام (دولار)'}</th><th>${en ? '100 g (AED)' : '100 غرام (درهم)'}</th></tr></thead><tbody>
${AGP.map(([f, m, a, e]) => `<tr><td><strong>${m}</strong> <span class="sub">${en ? e : a}</span></td><td class="n">${S(f, 1, { d: 2 })}</td><td class="n">$${S(f, 1, { cur: 'usd', d: 3 })}</td><td class="n">${S(f, 100)}</td></tr>`).join('')}
</tbody></table></div></section>
<section class="card-section"><h2>${en ? 'Fine silver (999) price by weight' : 'سعر الفضة الخالصة حسب الوزن'}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Weight' : 'الوزن'}</th><th>${en ? 'Price (AED)' : 'السعر (درهم)'}</th><th>${en ? 'Price (USD)' : 'السعر (دولار)'}</th></tr></thead><tbody>
${AGW.map(([w, e, a]) => `<tr><td>${en ? e : a}</td><td class="n">${S(1, w)}</td><td class="n">$${S(1, w, { cur: 'usd' })}</td></tr>`).join('')}
</tbody></table></div><p class="note">${en ? 'Raw silver value from the global spot price; bars, coins and jewellery are sold with a premium or making charge.' : 'قيمة الفضة الخام من السعر العالمي، والسبائك والعملات والمشغولات تُباع بعلاوة أو مصنعية إضافية.'}</p></section>
<section class="card-section"><h2>${en ? 'About silver prices in the UAE' : 'عن سعر الفضة في الإمارات'}</h2><div class="prose">
${en ? `<p>The silver price in the UAE follows the global spot price of silver in US dollars per troy ounce, converted at the fixed rate of 3.6725 AED per dollar. Silver moves more sharply than gold — daily swings of 2–3% are common — so prices can change noticeably within the same day.</p>
<p><strong>999 fine silver</strong> is used for bars and coins, while <strong>925 sterling silver</strong> (92.5% silver) is the standard for jewellery. Jewellery prices are driven mostly by design and making charges rather than the metal value.</p>
<p>The <strong>gold/silver ratio</strong> tells you how many ounces of silver buy one ounce of gold. Investors watch it to judge whether silver looks cheap or expensive relative to gold.</p>`
        : `<p>يتبع سعر الفضة في الإمارات السعر العالمي لأونصة الفضة بالدولار، محوَّلاً بسعر الربط الثابت 3.6725 درهم للدولار. والفضة أكثر تقلباً من الذهب، فتغيّر 2–3% في يوم واحد أمر شائع.</p>
<p>تُستخدم <strong>الفضة الخالصة 999</strong> في السبائك والعملات، أما <strong>الفضة الاسترليني 925</strong> (92.5% فضة) فهي المعيار في المجوهرات، وسعر المشغولات يعتمد على التصميم والمصنعية أكثر من قيمة المعدن.</p>
<p><strong>نسبة الذهب إلى الفضة</strong> تعني كم أونصة فضة تساوي أونصة ذهب واحدة، ويتابعها المستثمرون لمعرفة هل الفضة رخيصة أم غالية مقارنة بالذهب.</p>`}</div></section>
${links(L, 'silver')}`,
      faq: en ? [
        ['What is the silver price per gram in the UAE today?', 'The live price of fine (999) silver per gram is shown at the top of this page in AED and USD, along with 925 sterling silver.'],
        ['What is 925 silver?', '925 or sterling silver contains 92.5% pure silver mixed with other metals for strength. It is the standard purity for silver jewellery.'],
        ['How much is 1 kg of silver in AED?', 'The live value of 1 kg of fine silver is shown in the weight table above; dealers add a premium for bars.']
      ] : [
        ['كم سعر غرام الفضة اليوم في الإمارات؟', 'يظهر سعر غرام الفضة الخالصة (999) محدَّثاً في أعلى الصفحة بالدرهم والدولار، ومعه سعر الفضة الاسترليني 925.'],
        ['ما معنى فضة 925؟', 'فضة 925 أو الاسترليني تحتوي على 92.5% فضة خالصة مخلوطة بمعادن أخرى لزيادة الصلابة، وهي العيار المعتاد في مجوهرات الفضة.'],
        ['كم سعر كيلو الفضة اليوم؟', 'قيمة كيلو الفضة الخالصة تظهر في جدول الأوزان أعلاه بالدرهم والدولار، ويضيف التاجر علاوة عند بيع السبائك.']
      ] });
  }

  // ── السعر العالمي بالدولار ─────────────────────────────
  const last10 = days.slice(-10).reverse();
  const usdTable = en => last10.length ? `<section class="card-section"><h2>${en ? 'Gold ounce price in USD — recent days' : 'سعر أونصة الذهب بالدولار — آخر الأيام'}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Date' : 'التاريخ'}</th><th>${en ? 'Close (USD/oz)' : 'الإغلاق ($/أونصة)'}</th><th>${en ? 'High' : 'الأعلى'}</th><th>${en ? 'Low' : 'الأدنى'}</th></tr></thead><tbody>
${last10.map(d => `<tr><td>${en ? enDate(d.day) : arDate(d.day)}</td>${[d.close, d.high, d.low].map(v => `<td class="n">${fmt(v * ctx.TROY / ctx.AED)}</td>`).join('')}</tr>`).join('')}
</tbody></table></div></section>` : '';
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    out.push({ lang: L, slug: 'gold-price-usd', alt: true,
      crumbs: [[en ? 'Gold price in USD' : 'سعر الذهب عالمياً', url(L, 'gold-price-usd')]],
      title: en ? 'Gold Price in USD Today — Live Ounce Price (XAU/USD)' : 'سعر الذهب عالمياً بالدولار اليوم | سعر أونصة الذهب مباشر',
      desc: en ? 'Live gold price in US dollars: ounce (XAU/USD), gram for 24K, 22K, 21K and 18K, and kilo, with a 48-hour chart and recent daily prices. Updated every 5 minutes.'
        : 'سعر الذهب عالمياً بالدولار مباشر: سعر أونصة الذهب (XAU/USD)، وسعر الغرام لعيار 24 و22 و21 و18، وسعر الكيلو، مع رسم بياني لآخر 48 ساعة. تحديث كل 5 دقائق.',
      body: `${hero(en ? 'Gold Price in USD Today' : 'سعر الذهب عالمياً بالدولار', en ? 'Live spot price of gold per troy ounce (XAU/USD)' : 'سعر أونصة الذهب في السوق العالمية (XAU/USD) مباشر', L)}
${errBox}
<div class="big-price"><div class="u">${en ? 'Gold ounce (XAU/USD)' : 'أونصة الذهب (XAU/USD)'}</div><div class="v">$${P(24, ctx.TROY, { cur: 'usd' })}</div><div class="s">= ${P(24, ctx.TROY)} AED</div>${chg}
<div class="note">${en ? 'Updated' : 'آخر تحديث'}: ${updated(L)} · <button class="btn-sm" id="refresh" type="button">🔄 ${en ? 'Refresh' : 'تحديث'}</button></div></div>
${AD}
<section class="card-section"><div class="chart-header"><h2 style="border:0;margin:0;padding:0">${en ? 'Gold ounce in USD — last 48 hours' : 'أونصة الذهب بالدولار — آخر 48 ساعة'}</h2></div><canvas id="spark" data-mode="usd" aria-label="chart"></canvas></section>
<section class="card-section"><h2>${en ? 'Gold price in US dollars' : 'أسعار الذهب بالدولار'}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Unit' : 'الوحدة'}</th><th>${en ? 'Price (USD)' : 'السعر (دولار)'}</th><th>${en ? 'Price (AED)' : 'السعر (درهم)'}</th></tr></thead><tbody>
<tr><td>${en ? '1 troy ounce (24K)' : 'أونصة (عيار 24)'}</td><td class="n">$${P(24, ctx.TROY, { cur: 'usd' })}</td><td class="n">${P(24, ctx.TROY)}</td></tr>
${KS.map(k => `<tr><td>${en ? `1 gram ${k}K` : `غرام عيار ${k}`}</td><td class="n">$${P(k, 1, { cur: 'usd' })}</td><td class="n">${P(k)}</td></tr>`).join('')}
<tr><td>${en ? '1 kilogram (24K)' : 'كيلوغرام (عيار 24)'}</td><td class="n">$${P(24, 1000, { cur: 'usd', d: 0 })}</td><td class="n">${P(24, 1000, { d: 0 })}</td></tr>
</tbody></table></div></section>
${usdTable(en)}
<section class="card-section"><h2>${en ? 'What moves the global gold price?' : 'ما الذي يحرّك سعر الذهب عالمياً؟'}</h2><div class="prose">
${en ? `<ul><li><strong>US interest rates:</strong> higher rates usually pressure gold because it pays no interest; expected cuts tend to support it.</li><li><strong>The US dollar:</strong> gold is priced in dollars, so a weaker dollar usually lifts the gold price.</li><li><strong>Inflation:</strong> investors buy gold as a store of value when inflation rises.</li><li><strong>Central bank buying:</strong> large purchases by central banks have been a major source of demand.</li><li><strong>Geopolitical risk:</strong> wars and crises push investors toward safe-haven assets like gold.</li></ul>
<p>Because the dirham is pegged to the dollar, every move in XAU/USD passes straight into the UAE gold rate.</p>`
        : `<ul><li><strong>أسعار الفائدة الأمريكية:</strong> ارتفاع الفائدة يضغط على الذهب عادةً لأنه لا يدرّ عائداً، وتوقعات خفضها تدعمه.</li><li><strong>الدولار الأمريكي:</strong> الذهب مُسعَّر بالدولار، فضعف الدولار يرفع سعر الذهب غالباً.</li><li><strong>التضخم:</strong> يشتري المستثمرون الذهب لحفظ القيمة عند ارتفاع التضخم.</li><li><strong>مشتريات البنوك المركزية:</strong> من أكبر مصادر الطلب على الذهب.</li><li><strong>المخاطر الجيوسياسية:</strong> الحروب والأزمات تدفع المستثمرين إلى الذهب كملاذ آمن.</li></ul>
<p>ولأن الدرهم مربوط بالدولار، تنتقل كل حركة في سعر الأونصة مباشرة إلى سعر الذهب في الإمارات. <a href="/gold-forecast/">اقرأ عن اتجاه السعر</a>.</p>`}</div></section>
${links(L, 'gold-price-usd')}`,
      faq: en ? [
        ['What is XAU/USD?', 'XAU/USD is the price of one troy ounce of gold in US dollars — the global benchmark that local gold prices are calculated from.'],
        ['How many grams are in a troy ounce?', 'One troy ounce equals 31.1035 grams.'],
        ['Why is gold priced in US dollars?', 'Gold is traded globally in dollars, the world\'s main reserve currency. Local prices are converted from the dollar price.']
      ] : [
        ['ما هي الأونصة وكم غراماً تساوي؟', 'الأونصة (التروي) وحدة وزن المعادن الثمينة عالمياً وتساوي 31.1035 غراماً.'],
        ['ما معنى XAU/USD؟', 'هو سعر أونصة الذهب بالدولار الأمريكي في السوق العالمية، ومنه تُحسب أسعار الذهب المحلية في كل الدول.'],
        ['لماذا يُسعَّر الذهب بالدولار؟', 'لأن الذهب يُتداول عالمياً بالدولار عملة الاحتياط الرئيسية، ثم يُحوَّل السعر إلى العملات المحلية.']
      ] });
  }

  // ── الذهب بالروبية الهندية والباكستانية (إنجليزي) ─────────
  const RUP = {
    inr: { code: 'INR', name: 'Indian Rupees', short: '₹', country: 'India', ks: [24, 22, 18],
      title: 'Dubai Gold Rate in Indian Rupees (INR) Today — 22K & 24K',
      desc: 'Today\'s UAE and Dubai gold rate converted to Indian rupees: 24K, 22K and 18K per gram, per 10 grams and per tola in INR, with the live AED to INR rate.',
      text: `<p>Many Indian residents compare the <strong>Dubai gold rate</strong> with prices back home. This page converts the live UAE rate into rupees so you can compare like for like.</p>
<p>Gold in India is usually more expensive than in Dubai because Indian prices include <strong>import duty and GST</strong>, while the UAE price here is the raw rate before making charges and VAT. Making charges in both markets can change the final comparison a lot, so compare the full invoice.</p>
<p><strong>Carrying gold to India:</strong> duty-free allowances and documentation rules for travellers change from time to time — check the latest rules with Indian customs (CBIC) before you travel, and keep your UAE invoice.</p>` },
    pkr: { code: 'PKR', name: 'Pakistani Rupees', short: 'Rs', country: 'Pakistan', ks: [24, 22, 21],
      title: 'Dubai Gold Rate in Pakistani Rupees (PKR) per Tola Today',
      desc: 'Today\'s UAE and Dubai gold rate converted to Pakistani rupees: 24K, 22K and 21K per tola, per 10 grams and per gram in PKR, with the live AED to PKR rate.',
      text: `<p>In Pakistan gold is quoted <strong>per tola</strong> (11.664 g), so this page shows the live <strong>Dubai gold rate per tola in PKR</strong> next to the gram price.</p>
<p>The local Pakistani rate is set by the domestic market and is often different from the converted Dubai price because of supply, the open-market dollar rate and local premiums. Use this page to compare, not as the Pakistani market rate.</p>
<p><strong>Carrying gold to Pakistan:</strong> baggage allowances and declaration rules change — check the latest rules with Pakistan customs (FBR) before you travel, and keep your UAE invoice.</p>` }
  };
  for (const [slug, r] of Object.entries(RUP)) {
    const c = slug;
    out.push({ lang: 'en', slug: `gold-rate-${slug}`, usesFx: true,
      crumbs: [[`Gold rate in ${r.code}`, url('en', `gold-rate-${slug}`)]],
      title: r.title, desc: r.desc,
      body: `${hero(`UAE Gold Rate in ${r.name}`, `Live Dubai gold price converted to ${r.code} — 1 AED = ${FX(r.code)} ${r.code}`, 'en')}
${errBox}
<div class="karat-grid">${r.ks.map(k => `<a class="karat-card" href="/en/gold-${k}k/"><span class="karat-badge">${k}K</span><div class="karat-label">${slug === 'pkr' ? 'per tola' : 'per 10 g'}</div><div class="k-price">${r.short} ${P(k, slug === 'pkr' ? TOLA : 10, { cur: c, d: 0 })}</div><div class="k-unit">${P(k, slug === 'pkr' ? TOLA : 10)} AED</div></a>`).join('')}</div>
${AD}
<section class="card-section"><h2>Dubai gold rate in ${r.code}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Karat</th><th>1 gram (${r.code})</th><th>10 grams (${r.code})</th><th>1 tola (${r.code})</th><th>1 gram (AED)</th></tr></thead><tbody>
${r.ks.map(k => `<tr><td><a href="/en/gold-${k}k/"><strong>${k}K</strong></a></td><td class="n">${P(k, 1, { cur: c, d: 0 })}</td><td class="n">${P(k, 10, { cur: c, d: 0 })}</td><td class="n">${P(k, TOLA, { cur: c, d: 0 })}</td><td class="n">${P(k)}</td></tr>`).join('')}
</tbody></table></div><p class="note">Raw gold rate without making charges or VAT. Exchange rate updated daily — <a href="https://www.exchangerate-api.com" rel="nofollow noopener" target="_blank">Rates By Exchange Rate API</a>.</p></section>
<section class="card-section"><h2>Dubai vs ${r.country}: what to know</h2><div class="prose">${r.text}</div></section>
${links('en', '')}`,
      faq: [
        [`What is the Dubai 22K gold rate in ${r.code} today?`, `The live Dubai 22K rate converted to ${r.code} is shown in the table above, per gram, per 10 grams and per tola.`],
        [`Is gold cheaper in Dubai than in ${r.country}?`, `The raw Dubai rate is often lower, but the final comparison depends on making charges, VAT/taxes and the exchange rate you get. Compare full invoices.`],
        ['How many grams is one tola?', 'One tola is about 11.664 grams.']
      ] });
  }

  // ── سعر أمس وآخر 10 أيام ─────────────────────────────
  const past = days.filter(d => d.day < todayDubai);
  const yday = past[past.length - 1], before = past[past.length - 2];
  const last10p = past.slice(-10).reverse();
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    const dd = d => en ? enDate(d) : arDate(d);
    const pc = yday && before ? pct(yday.close, before.close) : null;
    out.push({ lang: L, slug: 'gold-price-yesterday', alt: true, noindex: !yday,
      crumbs: [[en ? 'Gold rate yesterday' : 'سعر الذهب أمس', url(L, 'gold-price-yesterday')]],
      title: en ? 'Gold Rate Yesterday in UAE & Last 10 Days Prices (AED)' : 'سعر الذهب أمس في الإمارات وأسعار آخر 10 أيام بالدرهم',
      desc: en ? 'Yesterday\'s closing gold rate in the UAE for 24K, 22K, 21K and 18K, compared with today\'s live price, plus the gold rate for the last 10 days.'
        : 'سعر إغلاق الذهب أمس في الإمارات لعيار 24 و22 و21 و18 مقارنة بسعر اليوم المباشر، مع جدول أسعار الذهب لآخر 10 أيام.',
      body: `${hero(en ? 'Gold Rate Yesterday in UAE' : 'سعر الذهب أمس في الإمارات', yday ? (en ? `Closing prices for ${dd(yday.day)} and the last 10 days` : `أسعار الإغلاق يوم ${dd(yday.day)} وآخر 10 أيام`) : '', L)}
${errBox}
${yday ? `<section class="card-section"><h2>${en ? `Yesterday (${dd(yday.day)}) vs today` : `أمس (${dd(yday.day)}) مقارنة باليوم`}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Karat' : 'العيار'}</th><th>${en ? 'Yesterday close' : 'إغلاق أمس'}</th><th>${en ? 'Today (live)' : 'اليوم (مباشر)'}</th></tr></thead><tbody>
${KS.map(k => `<tr><td><a href="${url(L, 'gold-' + k + 'k')}"><strong>${en ? k + 'K' : 'عيار ' + k}</strong></a></td><td class="n">${fmt(yday.close * k / 24)}</td><td class="n">${P(k)}</td></tr>`).join('')}
</tbody></table></div><p class="note">${en ? 'AED per gram. Yesterday vs the day before' : 'بالدرهم للغرام. تغيّر أمس عن اليوم السابق'}: ${chgTxt(pc)}</p></section>
${AD}
<section class="card-section"><h2>${en ? 'Gold rate — last 10 days' : 'سعر الذهب في آخر 10 أيام'}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Date' : 'التاريخ'}</th>${KS.map(k => `<th>${en ? k + 'K' : 'عيار ' + k}</th>`).join('')}<th>${en ? 'Change' : 'التغير'}</th></tr></thead><tbody>
${last10p.map(d => { const i = days.indexOf(d); const link = !en && d.n >= 3 ? `<a href="/history/${d.day}/">${dd(d.day)}</a>` : dd(d.day); return `<tr><td>${link}</td>${KS.map(k => `<td class="n">${fmt(d.close * k / 24)}</td>`).join('')}<td>${chgTxt(i > 0 ? pct(d.close, days[i - 1].close) : null)}</td></tr>`; }).join('')}
</tbody></table></div><p class="note">${en ? 'Closing price per gram in AED, Dubai time.' : 'سعر الإغلاق للغرام بالدرهم بتوقيت دبي.'} ${en ? '' : '<a href="/history/">الأرشيف الكامل</a>'}</p></section>`
        : `<p class="empty">${en ? 'Daily prices will appear here once the archive has data.' : 'ستظهر الأسعار هنا تلقائياً بعد تسجيل أول أيام في الأرشيف.'}</p>`}
${links(L, 'gold-price-yesterday')}` });
  }

  // ── توقعات أسعار الذهب (عربي) ─────────────────────────
  const chgN = n => { const p0 = past[past.length - 1 - n], p1 = past[past.length - 1]; return p0 && p1 ? pct(p1.close, p0.close) : null; };
  const w7 = chgN(7), w30 = chgN(30);
  const trendLine = (v, label) => v == null ? '' : `<li>خلال ${label}: ${v > 0.005 ? 'ارتفع' : v < -0.005 ? 'انخفض' : 'استقر'} سعر الذهب ${v > 0.005 || v < -0.005 ? `بنسبة <strong>${Math.abs(v).toFixed(2)}%</strong>` : ''}.</li>`;
  const hiLo30 = past.slice(-30);
  out.push({ lang: 'ar', slug: 'gold-forecast',
    crumbs: [['توقعات أسعار الذهب', '/gold-forecast/']],
    title: 'توقعات أسعار الذهب في الإمارات | اتجاه السعر والعوامل المؤثرة',
    desc: 'اتجاه أسعار الذهب في الإمارات خلال آخر 7 و30 يوماً من بيانات فعلية، وأهم العوامل التي تحرّك السعر: الفائدة الأمريكية والدولار والتضخم ومواسم الطلب.',
    body: `${hero('توقعات أسعار الذهب في الإمارات', 'اتجاه السعر من البيانات الفعلية وأهم العوامل المؤثرة', 'ar')}
<section class="card-section"><h2>اتجاه السعر الحالي</h2><div class="prose">
<p>سعر غرام عيار 21 الآن: <strong>${P(21)} درهم</strong> · عيار 24: <strong>${P(24)} درهم</strong> (آخر تحديث ${updated('ar')}).</p>
${w7 != null || w30 != null ? `<ul>${trendLine(w7, 'آخر 7 أيام')}${trendLine(w30, 'آخر 30 يوماً')}${hiLo30.length >= 5 ? `<li>تراوح سعر غرام عيار 24 في آخر ${hiLo30.length} يوماً بين <strong>${fmt(Math.min(...hiLo30.map(d => d.low)))}</strong> و<strong>${fmt(Math.max(...hiLo30.map(d => d.high)))}</strong> درهم.</li>` : ''}</ul>` : '<p>سيظهر هنا ملخص اتجاه السعر لآخر 7 و30 يوماً تلقائياً بعد تجمّع بيانات كافية في الأرشيف.</p>'}
<p class="note">هذه أرقام فعلية لما حدث، وليست توقعاً لما سيحدث.</p></div></section>
${AD}
<section class="card-section"><h2>العوامل التي تحدد اتجاه الذهب</h2><div class="prose"><ul>
<li><strong>قرارات الفيدرالي الأمريكي:</strong> توقعات خفض الفائدة تدعم الذهب، ورفعها يضغط عليه.</li>
<li><strong>قوة الدولار:</strong> الذهب مُسعَّر بالدولار، وضعف الدولار يرفع سعره عادةً. والدرهم مربوط بالدولار فالأثر ينتقل مباشرة إلى الإمارات.</li>
<li><strong>التضخم والأزمات:</strong> يزيد الطلب على الذهب كملاذ آمن في أوقات التضخم والتوترات الجيوسياسية.</li>
<li><strong>مشتريات البنوك المركزية:</strong> من أكبر مصادر الطلب في السنوات الأخيرة.</li>
<li><strong>مواسم الطلب في الإمارات:</strong> يزيد الإقبال على الشراء في مواسم الأعياد والأعراس، وفي مواسم الجالية الهندية مثل ديوالي وأكشايا تريتيا، وهو ما ينعكس على العروض والمصنعية أكثر من السعر العالمي.</li></ul></div></section>
<section class="card-section"><h2>نصائح قبل أن تشتري</h2><div class="prose"><ul>
<li>لا أحد يستطيع توقع سعر الذهب بدقة في المدى القصير، فاحذر من أي جهة تَعِد بأرباح مضمونة.</li>
<li>إذا كان هدفك الادخار، فالشراء على دفعات في أوقات مختلفة يقلل أثر تقلبات السعر.</li>
<li>للادخار تكون السبائك أوفر لأن مصنعيتها أقل من المجوهرات. قارن من <a href="/gold-bars/">أسعار السبائك</a>.</li>
<li>تابع <a href="/gold-price-usd/">سعر الأونصة عالمياً</a> و<a href="/gold-price-yesterday/">سعر الذهب أمس</a> قبل الشراء.</li></ul>
<p><strong>تنبيه:</strong> المحتوى للمعرفة فقط ولا يمثّل نصيحة استثمارية.</p></div></section>
${links('ar', '')}`,
    faq: [
      ['هل سيرتفع سعر الذهب في الإمارات؟', 'لا يمكن الجزم باتجاه الذهب على المدى القصير. السعر يتبع السوق العالمية ويتأثر بالفائدة الأمريكية والدولار والتضخم والأزمات. نعرض في هذه الصفحة الاتجاه الفعلي لآخر 7 و30 يوماً.'],
      ['هل الوقت مناسب لشراء الذهب؟', 'يعتمد على هدفك. للادخار طويل المدى يفضّل كثيرون الشراء على دفعات بدلاً من انتظار السعر المثالي. هذا ليس نصيحة استثمارية.']
    ] });

  // ── صفحات خاصة (خارج الـ sitemap) ─────────────────────
  out.push({ lang: 'ar', slug: '404', file: '404.html', noindex: true,
    title: 'الصفحة غير موجودة | Page not found', desc: 'الصفحة غير موجودة',
    body: `<div class="hero"><h1>الصفحة غير موجودة</h1><p class="hero-sub">Page not found — <a href="/en/">go to the English site</a></p></div>
<section class="card-section"><p class="prose">ربما نُقلت الصفحة أو حُذفت. يمكنك متابعة <a href="/">سعر الذهب اليوم في الإمارات</a> أو استخدام الروابط التالية.</p></section>${links('ar', '')}` });
  out.push({ lang: 'ar', slug: 'offline', file: 'offline.html', noindex: true, noAds: true,
    title: 'لا يوجد اتصال | Offline', desc: 'لا يوجد اتصال بالإنترنت',
    body: `<div class="hero"><h1>لا يوجد اتصال بالإنترنت</h1><p class="hero-sub">You are offline — prices will refresh when you reconnect.</p></div>
<section class="card-section"><p class="prose">افتح <a href="/">الصفحة الرئيسية</a> لعرض آخر سعر محفوظ على جهازك.</p></section>` });

  return out;
}
