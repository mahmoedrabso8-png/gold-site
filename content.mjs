import { articleLibrary, articleBody, relatedArticles } from './article-discovery.mjs';
import { weightPages } from './weight-content.mjs';
import { resalePages } from './resale-content.mjs';
import { priceAlertPages } from './alerts-content.mjs';
import { pilotGuide } from './local-guides.mjs';
// محتوى صفحات الموقع (عربي + إنجليزي)
import { ARTICLES, ARTICLES_EN } from './articles.mjs';

export function pages(ctx) {
  const { P, FXD, updated, chg, daily, fmt, url, AD, TODAY } = ctx;
  const out = [...priceAlertPages(ctx), ...resalePages(ctx), ...weightPages()];
  const px = k => ctx.g24 ? fmt(ctx.g24 * k / 24) : null;   // سعر الغرام لإدراجه في العناوين

  // ── معلومات العيارات ─────────────────────────────────────
  const K = {
    24: { purity: '99.9%', mark: '999',
      ar: { label: 'ذهب خالص', use: 'السبائك والعملات الذهبية والادخار والاستثمار',
        about: `<p><strong>الذهب عيار 24</strong> هو أنقى أنواع الذهب المتداولة، بنسبة ذهب تبلغ <strong>99.9%</strong> ويحمل ختم <strong>999</strong>. لأنه طري جداً لا يُستخدم كثيراً في المجوهرات اليومية، ويُباع غالباً على شكل <strong>سبائك وعملات ذهبية</strong> لمن يريد الادخار أو الاستثمار.</p>
<p>سعر غرام عيار 24 هو الأساس الذي تُحسب منه بقية العيارات: عيار 22 = 91.7% من سعره، وعيار 21 = 87.5%، وعيار 18 = 75%. لذلك يتابعه التجار والمستثمرون أكثر من أي عيار آخر.</p>
<p>في الإمارات يُعامل <strong>الذهب الاستثماري</strong> (نقاء 99% فأكثر وبشكل قابل للتداول في أسواق السبائك العالمية) بنسبة صفر في ضريبة القيمة المضافة، بخلاف المشغولات الذهبية التي تُفرض عليها ضريبة 5%. تأكد من الفاتورة عند الشراء. <a href="https://tax.gov.ae/datafolder/Files/Legislation/2026/Law-No-8-of-2017-and-its-amendments--09-2026.pdf">اللائحة التنفيذية، المادة 36</a>.</p>`,
        tips: ['اشترِ السبائك من جهة معروفة واطلب شهادة تحمل الوزن والنقاء والرقم التسلسلي.', 'السبائك الصغيرة (1–5 غرام) يكون فرق سعرها عن السعر العالمي أعلى نسبياً من السبائك الكبيرة.', 'احتفظ بالتغليف الأصلي للسبيكة لأنه يسهّل إعادة بيعها بسعر جيد.'],
        faq: [['هل الذهب عيار 24 مناسب للمجوهرات؟', 'نادراً، لأنه طري ويتشوه ويُخدش بسهولة. يُفضَّل للسبائك والعملات والادخار، بينما تُصنع أغلب المجوهرات من عيار 22 أو 21 أو 18.']] },
      en: { label: 'Pure gold', use: 'bars, coins, savings and investment',
        about: `<p><strong>24 karat gold</strong> is the purest gold traded, at <strong>99.9%</strong> fineness with the hallmark <strong>999</strong>. It is too soft for everyday jewellery, so in the UAE it is mostly sold as <strong>bars and coins</strong> for saving and investing.</p>
<p>The 24K gram price is the base for every other karat: 22K is 91.7% of it, 21K is 87.5% and 18K is 75%. That is why traders and investors follow it more than any other rate.</p>
<p>In the UAE, <strong>investment gold</strong> (at least 99% pure and in a form tradeable in global bullion markets) is zero-rated for VAT, while gold jewellery carries 5% VAT. Always check the invoice. <a href="https://tax.gov.ae/datafolder/Files/Legislation/2026/Law-No-8-of-2017-and-its-amendments--09-2026.pdf">FTA Executive Regulation, Article 36</a>.</p>`,
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
  // عملات الحاسبة: الكود، الاسم، نسبة ضريبة القيمة المضافة، عدد الكسور
  const CURS = [['AED', 'درهم إماراتي', 'UAE dirham', 5, 2], ['SAR', 'ريال سعودي', 'Saudi riyal', 15, 2], ['KWD', 'دينار كويتي', 'Kuwaiti dinar', 0, 3],
    ['QAR', 'ريال قطري', 'Qatari riyal', 0, 2], ['OMR', 'ريال عُماني', 'Omani rial', 5, 3], ['BHD', 'دينار بحريني', 'Bahraini dinar', 10, 3],
    ['EGP', 'جنيه مصري', 'Egyptian pound', 0, 0], ['INR', 'روبية هندية', 'Indian rupee', 3, 0],
    ['PKR', 'روبية باكستانية', 'Pakistani rupee', 0, 0], ['BDT', 'تاكا بنجلاديشي', 'Bangladeshi taka', 0, 0], ['TRY', 'ليرة تركية', 'Turkish lira', 0, 0],
    ['USD', 'دولار أمريكي', 'US dollar', 0, 2], ['GBP', 'جنيه إسترليني', 'British pound', 0, 2], ['CAD', 'دولار كندي', 'Canadian dollar', 0, 2], ['AUD', 'دولار أسترالي', 'Australian dollar', 0, 2],
    ['PHP', 'بيسو فلبيني', 'Philippine peso', 0, 0], ['MYR', 'رينغيت ماليزي', 'Malaysian ringgit', 0, 2], ['NPR', 'روبية نيبالية', 'Nepalese rupee', 0, 0], ['ZAR', 'راند جنوب أفريقيا', 'South African rand', 0, 2],
    ['IQD', 'دينار عراقي', 'Iraqi dinar', 0, 0], ['JOD', 'دينار أردني', 'Jordanian dinar', 0, 3], ['MAD', 'درهم مغربي', 'Moroccan dirham', 0, 2], ['DZD', 'دينار جزائري', 'Algerian dinar', 0, 0],
    ['IDR', 'روبية إندونيسية', 'Indonesian rupiah', 0, 0], ['THB', 'باهت تايلاندي', 'Thai baht', 0, 2], ['VND', 'دونغ فيتنامي', 'Vietnamese dong', 0, 0], ['SGD', 'دولار سنغافوري', 'Singapore dollar', 0, 2],
    ['LKR', 'روبية سريلانكية', 'Sri Lankan rupee', 0, 0], ['EUR', 'يورو', 'Euro', 0, 2], ['JPY', 'ين ياباني', 'Japanese yen', 0, 0], ['CHF', 'فرنك سويسري', 'Swiss franc', 0, 2],
    ['NGN', 'نايرا نيجيرية', 'Nigerian naira', 0, 0], ['GHS', 'سيدي غاني', 'Ghanaian cedi', 0, 2], ['KES', 'شلن كيني', 'Kenyan shilling', 0, 0],
    ['MXN', 'بيسو مكسيكي', 'Mexican peso', 0, 2], ['BRL', 'ريال برازيلي', 'Brazilian real', 0, 2], ['CNY', 'يوان صيني', 'Chinese yuan', 0, 2],
    ['LBP', 'ليرة لبنانية', 'Lebanese pound', 0, 0], ['TND', 'دينار تونسي', 'Tunisian dinar', 0, 2], ['LYD', 'دينار ليبي', 'Libyan dinar', 0, 2], ['YER', 'ريال يمني', 'Yemeni rial', 0, 0]];
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
    ar: [['assistant', 'مساعد الذهب الذكي', 'اسأل أي سؤال عن الذهب والعملات'], ['gold-21k', 'سعر عيار 21', 'الأكثر طلباً في الخليج'], ['gold-24k', 'سعر عيار 24', 'الذهب الخالص والسبائك'], ['gold-22k', 'سعر عيار 22', 'المجوهرات الهندية'], ['gold-18k', 'سعر عيار 18', 'مجوهرات الألماس'],
      ['gold-price-usd', 'سعر الذهب عالمياً', 'الأونصة بالدولار مباشر'], ['dollar', 'سعر الدولار اليوم', 'مباشر بكل العملات'], ['silver', 'سعر الفضة اليوم', 'الغرام والأونصة والكيلو'],
      ['gcc', 'أسعار الذهب في الخليج', 'مقارنة بين 6 دول'], ['saudi', 'سعر الذهب في السعودية', 'بالريال السعودي'], ['kuwait', 'سعر الذهب في الكويت', 'بالدينار الكويتي'],
      ['qatar', 'سعر الذهب في قطر', 'بالريال القطري'], ['oman', 'سعر الذهب في عُمان', 'بالريال العُماني'], ['bahrain', 'سعر الذهب في البحرين', 'بالدينار البحريني'], ['egypt', 'سعر الذهب في مصر', 'بالجنيه المصري'], ['iraq', 'سعر الذهب في العراق', 'بالدينار العراقي'], ['jordan', 'سعر الذهب في الأردن', 'بالدينار الأردني'], ['morocco', 'سعر الذهب في المغرب', 'بالدرهم المغربي'], ['algeria', 'سعر الذهب في الجزائر', 'بالدينار الجزائري'], ['lebanon', 'سعر الذهب في لبنان', 'بالليرة والدولار'], ['tunisia', 'سعر الذهب في تونس', 'بالدينار التونسي'], ['libya', 'سعر الذهب في ليبيا', 'بالدينار الليبي'], ['yemen', 'سعر الذهب في اليمن', 'بالريال اليمني'],
      ['gold-bars', 'أسعار السبائك', 'من 1 غرام إلى 1 كيلو'], ['gold-calculator', 'حاسبة الذهب', 'بالمصنعية والضريبة'], ['gold-resale-calculator', 'حاسبة بيع الذهب', 'قارن صافي العروض ونقطة التعادل'], ['gold-weight-converter', 'محول الوزن والنقاء', 'غرام وأونصة وذهب خالص'], ['zakat-calculator', 'حاسبة زكاة الذهب', 'النصاب وقيمة الزكاة'],
      ['gold-price-yesterday', 'سعر الذهب أمس', 'وآخر 10 أيام'], ['gold-forecast', 'توقعات الذهب', 'الاتجاه والعوامل المؤثرة'], ['history', 'أرشيف الأسعار', 'سعر الذهب يوماً بيوم'],
      ['articles', 'مقالات وأدلة الذهب', 'شروحات الشراء والادخار والزكاة']],
    en: [['assistant', 'Gold price assistant', 'Ask any gold or currency question'], ['gold-22k', '22K gold rate', 'Popular for Indian jewellery'], ['gold-24k', '24K gold rate', 'Pure gold & bars'], ['gold-21k', '21K gold rate', 'Gulf jewellery'], ['gold-18k', '18K gold rate', 'Diamond jewellery'],
      ['gold-price-usd', 'Gold price in USD', 'Live ounce XAU/USD'], ['dollar', 'US dollar rate', 'Live vs 40 currencies'], ['silver', 'Silver price', 'Per gram, ounce & kg'],
      ['gcc', 'Gulf gold prices', 'Compare 6 countries'], ['saudi', 'Gold price in Saudi Arabia', 'In SAR'], ['kuwait', 'Gold price in Kuwait', 'In KWD'],
      ['qatar', 'Gold price in Qatar', 'In QAR'], ['oman', 'Gold price in Oman', 'In OMR'], ['bahrain', 'Gold price in Bahrain', 'In BHD'], ['egypt', 'Gold price in Egypt', 'In EGP'], ['india', 'Gold rate in India', 'In INR, 22K & 24K'], ['pakistan', 'Gold rate in Pakistan', 'In PKR, per tola'], ['bangladesh', 'Gold price in Bangladesh', 'In BDT'], ['turkey', 'Gold price in Turkey', 'Gram altın in TRY'], ['usa', 'Gold price in USA', 'In USD'], ['uk', 'Gold price in UK', 'In GBP'], ['canada', 'Gold price in Canada', 'In CAD'], ['australia', 'Gold price in Australia', 'In AUD'], ['philippines', 'Gold price in Philippines', 'In PHP'], ['malaysia', 'Gold price in Malaysia', 'Emas 916 in MYR'], ['nepal', 'Gold price in Nepal', 'In NPR, per tola'], ['southafrica', 'Gold price in South Africa', 'Krugerrand in ZAR'], ['iraq', 'Gold price in Iraq', 'In IQD'], ['jordan', 'Gold price in Jordan', 'In JOD'], ['morocco', 'Gold price in Morocco', 'In MAD'], ['algeria', 'Gold price in Algeria', 'In DZD'], ['indonesia', 'Gold price in Indonesia', 'Antam bars in IDR'], ['thailand', 'Gold price in Thailand', 'Per baht weight, THB'], ['vietnam', 'Gold price in Vietnam', 'SJC bars in VND'], ['singapore', 'Gold price in Singapore', 'GST-free IPM in SGD'], ['srilanka', 'Gold price in Sri Lanka', 'In LKR'], ['germany', 'Gold price in Germany', 'VAT-free bullion, EUR'], ['japan', 'Gold price in Japan', 'In JPY'], ['switzerland', 'Gold price in Switzerland', 'Home of PAMP, CHF'], ['nigeria', 'Gold price in Nigeria', 'In NGN'], ['ghana', 'Gold price in Ghana', 'The Gold Coast, GHS'], ['kenya', 'Gold price in Kenya', 'In KES'], ['mexico', 'Gold price in Mexico', 'Centenario in MXN'], ['brazil', 'Gold price in Brazil', 'Ouro 18K in BRL'], ['china', 'Gold price in China', '999 gold in CNY'], ['france', 'Gold price in France', 'Napoleon coins, EUR'], ['italy', 'Gold price in Italy', '18K standard, EUR'], ['spain', 'Gold price in Spain', 'Oro de ley, EUR'], ['lebanon', 'Gold price in Lebanon', 'In LBP & USD'], ['tunisia', 'Gold price in Tunisia', 'In TND'], ['libya', 'Gold price in Libya', 'In LYD'], ['yemen', 'Gold price in Yemen', 'In YER'], ['gold-rate-inr', 'Gold rate in INR', 'Dubai price in rupees'], ['gold-rate-pkr', 'Gold rate in PKR', 'Per tola in rupees'],
      ['gold-bars', 'Gold bar prices', '1 g to 1 kg, tola bars'], ['gold-calculator', 'Gold calculator', 'With making charges & VAT'], ['gold-resale-calculator', 'Resale calculator', 'Compare net offers & break-even'], ['gold-weight-converter', 'Weight & purity', 'Grams, troy ounces & fine gold'], ['gold-price-yesterday', 'Last 10 days', 'Yesterday\'s gold rate'], ['zakat-calculator', 'Zakat calculator', 'Nisab and zakat due'],
      ['articles', 'Gold guides & articles', 'Buying tips, karats and why prices rise']]
  };
  const links = (L, skip) => `<section class="card-section"><h2>${L === 'en' ? 'More gold prices & tools' : 'أسعار وأدوات أخرى'}</h2><div class="links-grid">${LINKS[L].filter(l => l[0] !== skip).map(([s, n, d]) => `<a class="link-card" href="${url(L, s)}">${n}<span>${d}</span></a>`).join('')}</div></section>`;
  const why = L => L === 'en'
    ? `<section class="card-section"><h2>Why is the shop price higher than this price?</h2><div class="prose">
<p>This site shows the <strong>raw gold price</strong> calculated from the global spot price (ounce in USD × 3.6725 ÷ 31.1035 g). Dubai jewellers announce their own daily rate per karat, which closely follows the spot price with a small difference. On top of that, a shop invoice adds:</p>
<ul><li><strong>Making charges</strong> — usually a few dirhams up to 15+ AED per gram depending on the design.</li><li><strong>5% VAT</strong> on jewellery (qualifying investment metals need at least 99% purity and a form tradeable in global bullion markets for zero-rating).</li></ul>
<p>Use the <a href="/en/gold-calculator/">gold calculator</a> to add making charges and VAT and see the final price.</p>
<p>Related: <a href="/en/gold-24k/">24K gold rate</a> · <a href="/en/gold-22k/">22K gold rate</a> · <a href="/en/gold-18k/">18K gold rate</a> · <a href="/en/gold-bars/">gold bar prices</a> · <a href="/en/silver/">silver price</a> · <a href="/en/saudi/">gold price in Saudi Arabia</a> · <a href="/en/gcc/">Gulf gold prices</a>.</p></div></section>`
    : `<section class="card-section"><h2>لماذا يختلف سعر المحل عن السعر المعروض هنا؟</h2><div class="prose">
<p>نعرض هنا <strong>سعر الذهب الخام</strong> محسوباً من السعر العالمي (سعر الأونصة بالدولار × 3.6725 ÷ 31.1035 غرام). محلات الذهب في دبي تعلن سعراً يومياً لكل عيار يتبع السعر العالمي مع فرق بسيط، ثم تُضاف إلى الفاتورة:</p>
<ul><li><strong>المصنعية (أجرة الصياغة)</strong> — من بضعة دراهم حتى 15 درهماً أو أكثر للغرام حسب التصميم.</li><li><strong>ضريبة القيمة المضافة 5%</strong> على المشغولات الذهبية (نسبة الصفر للمعادن الاستثمارية تتطلب نقاء 99% فأكثر وشكلاً قابلاً للتداول في أسواق السبائك العالمية).</li></ul>
<p>استخدم <a href="/gold-calculator/">حاسبة الذهب</a> لإضافة المصنعية والضريبة ومعرفة السعر النهائي.</p>
<p>مواضيع ذات صلة: <a href="/gold-24k/">سعر عيار 24</a> · <a href="/gold-bars/">سبائك الذهب</a> · <a href="/silver/">سعر الفضة</a> · <a href="/gcc/">أسعار الذهب في الخليج</a> · <a href="/zakat-calculator/">حاسبة الزكاة</a> · <a href="/gold-price-yesterday/">سعر الذهب أمس</a>.</p></div></section>`;
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
  const hero = (h1, sub, L) => `<div class="hero"><h1>${h1}</h1><p class="hero-sub">${sub}</p><div class="update-badge"><span class="update-dot"></span>${L === 'en' ? 'Live — updated every 5 minutes' : L === 'tr' ? 'Canlı — her 5 dakikada güncellenir' : L === 'hi' ? 'लाइव — हर 5 मिनट में अपडेट' : L === 'ur' ? 'لائیو — ہر 5 منٹ میں تازہ کاری' : L === 'id' ? 'Langsung — diperbarui setiap 5 menit' : L === 'bn' ? 'লাইভ — প্রতি ৫ মিনিটে হালনাগাদ' : L === 'tl' ? 'Live — ina-update kada 5 minuto' : L === 'ms' ? 'Langsung — dikemas kini setiap 5 minit' : 'مباشر — يُحدَّث كل 5 دقائق'}</div></div>`;
  const TG_CHANNEL = 'https://t.me/emaratijob';
  const share = (L, slug, title) => {
    const en = L === 'en', u = encodeURIComponent(ctx.SITE + url(L, slug)), t = encodeURIComponent(title);
    return `<section class="card-section share-section"><h2>${en ? 'Share & follow' : 'شارك وتابع'}</h2><div class="share-row">
<a class="share-btn wa" href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener">${en ? 'Share on WhatsApp' : 'مشاركة واتساب'}</a>
<a class="share-btn tg" href="https://t.me/share/url?url=${u}&text=${t}" target="_blank" rel="noopener">${en ? 'Share on Telegram' : 'مشاركة تيليجرام'}</a>
<a class="share-btn join" href="${TG_CHANNEL}" target="_blank" rel="noopener">📢 ${en ? 'Daily gold prices on our Telegram channel' : 'أسعار الذهب يومياً على قناتنا في تيليجرام'}</a>
</div></section>`;
  };

  // ── الصفحة الرئيسية ────────────────────────────────────
  out.push({ lang: 'ar', slug: '', alt: true,
    title: px(21) ? `سعر الذهب اليوم في الإمارات | عيار 21: ${px(21)} درهم` : 'سعر الذهب اليوم في الإمارات بالدرهم | عيار 24 و22 و21 و18',
    desc: (px(21) ? `سعر الذهب اليوم في الإمارات: عيار 21 بـ ${px(21)} درهم، عيار 24 بـ ${px(24)}، عيار 22 بـ ${px(22)}، عيار 18 بـ ${px(18)} للغرام. ` : 'سعر الذهب اليوم في الإمارات ودبي بالدرهم. ') + 'تحديث كل 5 دقائق، مع سعر الأونصة والسبائك والحاسبة.',
    body: `${hero('سعر الذهب اليوم في الإمارات بالدرهم', 'سعر غرام الذهب الخام لعيار 24 و22 و21 و18 بالدرهم الإماراتي والدولار', 'ar')}
${errBox}${karatCards('ar')}${metaRow('ar')}
${AD}
<section class="card-section"><h2>جدول أسعار الذهب في الإمارات اليوم</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>العيار</th><th>الغرام (درهم)</th><th>الغرام (دولار)</th><th>10 غرام (درهم)</th><th>التولة (درهم)</th><th>الأونصة (درهم)</th></tr></thead><tbody>
${KS.map(k => `<tr><td><a href="${url('ar', 'gold-' + k + 'k')}"><strong>عيار ${k}</strong></a> <span class="sub"><bdi>${K[k].purity}</bdi></span></td><td class="n">${P(k)}</td><td class="n">$${P(k, 1, { cur: 'usd' })}</td><td class="n">${P(k, 10)}</td><td class="n">${P(k, TOLA)}</td><td class="n">${P(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">السعر للذهب الخام بدون مصنعية أو ضريبة. التولة = 11.664 غرام · الأونصة = 31.1035 غرام.</p></section>
<section class="card-section"><h2>سعر الذهب عيار 21 بالدولار وبالمصنعية</h2><div class="prose">
<p><strong>سعر غرام عيار 21 بالدولار</strong> اليوم نحو <bdi>$${P(21, 1, { cur: 'usd' })}</bdi>، وسعر غرام عيار 24 نحو <bdi>$${P(24, 1, { cur: 'usd' })}</bdi>، وسعر الأونصة العالمي <bdi>$${P(24, ctx.TROY, { cur: 'usd' })}</bdi>.</p>
<p><strong>سعر الذهب في الإمارات بالمصنعية:</strong> إذا كانت المصنعية 5 دراهم للغرام يصبح غرام عيار 21 نحو <bdi>${P(21, 1, { mc: 5 })} درهم</bdi>، وبمصنعية 10 دراهم نحو <bdi>${P(21, 1, { mc: 10 })} درهم</bdi>، وبمصنعية 15 درهماً نحو <bdi>${P(21, 1, { mc: 15 })} درهم</bdi> (قبل ضريبة 5% على المشغولات). لحساب وزنك ومصنعيتك بدقة استخدم <a href="/gold-calculator/">حاسبة الذهب بالمصنعية</a>.</p></div></section>
${spark('ar')}${why('ar')}${links('ar', '')}
<section class="card-section"><h2>مقالات وأدلة عن الذهب</h2><div class="links-grid">${ARTICLES.map(a => `<a class="link-card" href="/articles/${a.slug}/">${a.h1}<span>${a.teaser}</span></a>`).join('')}</div></section>
${AD}
<section class="card-section"><h2>دليل سعر الذهب في الإمارات</h2><div class="prose">
<p>تُعدّ <strong>الإمارات</strong> من أكبر مراكز تجارة الذهب في العالم، ويشتهر <strong>سوق الذهب في ديرة بدبي</strong> وسوق الذهب في الشارقة بتنوع المحلات وتنافس الأسعار. تتحدد <strong>أسعار الذهب في الإمارات</strong> على أساس السعر العالمي للأونصة بالدولار، ولأن الدرهم مربوط بالدولار عند 3.6725 فإن حركة السعر المحلي تتبع السوق العالمية مباشرة.</p>
<p>يُتداول الذهب بعدة عيارات: <a href="/gold-24k/">عيار 24</a> للسبائك والادخار، و<a href="/gold-22k/">عيار 22</a> المنتشر في المجوهرات الهندية، و<a href="/gold-21k/">عيار 21</a> الأكثر طلباً في المجوهرات الخليجية، و<a href="/gold-18k/">عيار 18</a> لمجوهرات الألماس.</p>
<p>قبل الشراء احسب السعر النهائي بالمصنعية والضريبة من <a href="/gold-calculator/">حاسبة الذهب</a>، وإذا كنت تملك ذهباً بلغ النصاب فاحسب زكاته من <a href="/zakat-calculator/">حاسبة زكاة الذهب</a>. ويمكنك متابعة تغيّر السعر يوماً بيوم في <a href="/history/">أرشيف أسعار الذهب</a>.</p></div></section>
${sources('ar')}`,
    faq: [
      ['كم سعر غرام الذهب عيار 21 في الإمارات اليوم؟', 'يظهر سعر غرام عيار 21 محدَّثاً في أعلى الصفحة بالدرهم والدولار، ويُحدَّث كل 5 دقائق تقريباً. وهو سعر الذهب الخام بدون مصنعية أو ضريبة.'],
      ['كم سعر الذهب عيار 21 بالدولار اليوم؟', 'سعر غرام عيار 21 بالدولار = (سعر الأونصة بالدولار ÷ 31.1035) × 0.875، ويظهر محدَّثاً بالدولار في جدول الأسعار أعلاه وفي قسم "سعر الذهب عيار 21 بالدولار وبالمصنعية".'],
      ['كم سعر الذهب في الإمارات بالمصنعية؟', 'أضف المصنعية للغرام إلى سعر الغرام ثم اضرب في الوزن، وأضف ضريبة 5% على المشغولات. المصنعية تبدأ من بضعة دراهم وتصل إلى 15 درهماً أو أكثر حسب التصميم، ويمكنك الحساب بدقة من حاسبة الذهب.'],
      ['كيف يُحسب سعر غرام الذهب بالدرهم؟', 'سعر غرام عيار 24 = سعر الأونصة بالدولار × 3.6725 ÷ 31.1035. ثم يُضرب في نسبة العيار: 0.917 لعيار 22، و0.875 لعيار 21، و0.75 لعيار 18.'],
      ['هل السعر المعروض يشمل المصنعية والضريبة؟', 'لا. السعر المعروض للذهب الخام فقط. في المحل تُضاف المصنعية حسب القطعة، وضريبة القيمة المضافة 5% على المشغولات الذهبية.'],
      ['ما الفرق بين عيار 24 و22 و21 و18؟', 'نسبة الذهب الخالص: عيار 24 = 99.9%، عيار 22 = 91.7%، عيار 21 = 87.5%، عيار 18 = 75%. كلما زاد العيار زاد السعر وقلّت صلابة الذهب.'],
      ['هل سعر الذهب في دبي مختلف عن أبوظبي والشارقة؟', 'السعر الأساسي للذهب واحد تقريباً في كل الإمارات لأنه يتبع السعر العالمي، والفرق يكون في المصنعية والعروض بين المحلات.'],
      ['ما هي التولة وكم وزنها؟', 'التولة وحدة وزن شائعة في أسواق الذهب بالإمارات والهند، وتساوي 11.664 غرام تقريباً. والسبيكة الشائعة "10 تولة" تزن نحو 116.64 غرام.']
    ] });

  out.push({ lang: 'en', slug: '', alt: true,
    title: px(24) ? `Gold Rate in UAE Today: 24K ${px(24)} AED, 22K ${px(22)} AED` : 'Gold Rate in UAE Today (AED) — 24K, 22K, 21K, 18K Live Price',
    desc: 'Today\'s gold rate in the UAE and Dubai in AED, updated every 5 minutes: 24K, 22K, 21K and 18K per gram, tola and ounce, plus gold bar prices and a gold calculator.',
    body: `${hero('Gold Rate in UAE Today', '24K, 22K, 21K and 18K gold price per gram in UAE dirhams (AED) and US dollars', 'en')}
${errBox}${karatCards('en')}${metaRow('en')}
${AD}
<section class="card-section"><h2>UAE gold price table today</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Karat</th><th>1 gram (AED)</th><th>1 gram (USD)</th><th>10 grams (AED)</th><th>1 tola (AED)</th><th>1 ounce (AED)</th></tr></thead><tbody>
${KS.map(k => `<tr><td><a href="${url('en', 'gold-' + k + 'k')}"><strong>${k}K</strong></a> <span class="sub"><bdi>${K[k].purity}</bdi></span></td><td class="n">${P(k)}</td><td class="n">$${P(k, 1, { cur: 'usd' })}</td><td class="n">${P(k, 10)}</td><td class="n">${P(k, TOLA)}</td><td class="n">${P(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">Raw gold price excluding making charges and VAT. 1 tola = 11.664 g · 1 troy ounce = 31.1035 g.</p></section>
${spark('en')}${why('en')}
<section class="card-section"><h2>Gold guides & articles</h2><div class="links-grid">${ARTICLES_EN.map(a => `<a class="link-card" href="/en/articles/${a.slug}/">${a.h1}<span>${a.teaser}</span></a>`).join('')}</div></section>
${links('en', '')}
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
    const title = px(k) ? (en ? `${k}K Gold Rate in UAE Today: ${px(k)} AED per Gram` : `سعر الذهب عيار ${k} اليوم في الإمارات: ${px(k)} درهم للغرام`) : (en ? `${k}K Gold Rate in UAE Today — Price per Gram in AED` : `سعر الذهب عيار ${k} اليوم في الإمارات بالدرهم`);
    out.push({ lang: L, slug: `gold-${k}k`, alt: true,
      crumbs: [[en ? `${k}K gold rate` : `سعر عيار ${k}`, url(L, `gold-${k}k`)]],
      title,
      desc: en ? `Live ${k}K gold price per gram in the UAE and Dubai in AED and USD, updated every 5 minutes, with prices for 1 g to 100 g, tola and ounce${k === 24 ? '' : ' and making-charge estimates'}.`
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
${share(L, `gold-${k}k`, en ? `${k}K gold rate in UAE today` : `سعر الذهب عيار ${k} اليوم في الإمارات`)}
${links(L, `gold-${k}k`)}`,
      faq: [
        [en ? `What is the ${k}K gold price per gram in the UAE today?` : `كم سعر غرام الذهب عيار ${k} في الإمارات اليوم؟`,
          en ? `The live ${k}K price per gram is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges or VAT.` : `يظهر سعر غرام عيار ${k} محدَّثاً في أعلى هذه الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية أو ضريبة.`],
        [en ? `How much gold is in ${k}K?` : `كم نسبة الذهب في عيار ${k}؟`,
          en ? `${k}K gold contains ${K[k].purity} pure gold and carries the hallmark ${K[k].mark}.` : `يحتوي عيار ${k} على ${K[k].purity} ذهب خالص ويحمل ختم ${K[k].mark}.`],
        ...d.faq
      ] });
  }

  // ── حاسبة المجوهرات لكل دولة ──
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    const opt = [24, 22, 21, 18, 14].map(k => `<option value="${k}"${k === (en ? 22 : 21) ? ' selected' : ''}>${en ? k + 'K' : 'عيار ' + k}</option>`).join('');
    const mopts = ctx.markets.map(m => `<option value="${m.currency}" data-market="${m.slug}" data-d="${(CURS.find(c=>c[0]===m.currency)||[])[4] ?? 2}">${en ? m.en : m.ar} (${m.currency})</option>`).join('');
    out.push({lang:L, slug:'gold-calculator', alt:true, usesFx:true,
      title:en?'Gold Jewelry Calculator: Making Charges & Tax by Country':'حاسبة الذهب بالمصنعية والضريبة حسب الدولة',
      desc:en?'Calculate jewelry cost in 44 countries: weight, karat, live or shop gram price, making charges per gram, per piece or percent, and your invoice tax rate.':'احسب تكلفة الذهب في 44 دولة بالوزن والعيار وسعر الغرام والمصنعية للغرام أو للقطعة أو كنسبة، مع ضريبة قابلة للتعديل حسب فاتورة المحل.',
      crumbs:[[en?'Jewelry calculator':'حاسبة المجوهرات',url(L,'gold-calculator')]],
      schema:[{'@context':'https://schema.org','@type':'WebApplication',name:en?'Gold Jewelry Calculator':'حاسبة المجوهرات الذهبية',applicationCategory:'FinanceApplication',operatingSystem:'Any',inLanguage:L,url:ctx.SITE+url(L,'gold-calculator'),offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}}],
      body:`${hero(en?'Gold jewelry cost calculator':'حاسبة تكلفة المجوهرات الذهبية',en?'Choose your country, then enter the shop’s charges and tax.':'اختر الدولة، ثم أدخل مصنعية المحل والضريبة الفعلية.',L)}${errBox}
<section class="card-section" id="calc"><h2>${en?'Build your estimate':'احسب التكلفة التقديرية'}</h2><div class="form-grid">
<div class="field"><label for="c-cur">${en?'Country / currency':'الدولة / العملة'}</label><select id="c-cur">${mopts}</select></div>
<div class="field"><label for="c-w">${en?'Gold weight, excluding stones (grams)':'وزن الذهب بدون الأحجار (غرام)'}</label><input id="c-w" type="number" inputmode="decimal" min="0" step="0.01" value="10" /></div>
<div class="field"><label for="c-k">${en?'Karat':'العيار'}</label><select id="c-k">${opt}</select></div>
<div class="field"><label for="c-rate">${en?'Shop gram price (optional)':'سعر غرام المحل (اختياري)'}</label><input id="c-rate" type="number" inputmode="decimal" min="0" step="0.01" placeholder="${en?'Blank = live raw gold rate':'فارغ = سعر الذهب الخام المباشر'}" /></div>
<div class="field"><label for="c-mtype">${en?'How is making charged?':'طريقة حساب المصنعية'}</label><select id="c-mtype"><option value="gram">${en?'Per gram':'لكل غرام'}</option><option value="piece">${en?'Total for this piece':'إجمالي القطعة'}</option><option value="percent">${en?'Percent of gold value':'نسبة من قيمة الذهب'}</option></select></div>
<div class="field"><label for="c-mc">${en?'Making charge (currency or %, as selected)':'المصنعية (بالعملة أو % حسب الاختيار)'}</label><input id="c-mc" type="number" inputmode="decimal" min="0" step="0.01" value="0" /></div>
<div class="field"><label for="c-tax-rate">${en?'Tax rate from your invoice (%)':'نسبة الضريبة من فاتورتك (%)'}</label><input id="c-tax-rate" type="number" inputmode="decimal" min="0" max="100" step="0.01" value="0" /></div>
<div class="field"><label for="c-tax-base">${en?'Tax applies to':'تُحسب الضريبة على'}</label><select id="c-tax-base"><option value="all">${en?'Gold + making charges':'الذهب والمصنعية'}</option><option value="making">${en?'Making charges only':'المصنعية فقط'}</option><option value="gold">${en?'Gold value only':'قيمة الذهب فقط'}</option></select></div>
</div>
<p class="note">${en?'Tax starts at 0 because rules differ by product and location. Enter the rate and tax base on the shop’s invoice. Zero here does not mean tax-exempt.':'تبدأ الضريبة بصفر لأن القواعد تختلف حسب المنتج والمكان. أدخل النسبة وأساس الحساب المكتوبين في فاتورة المحل. الصفر هنا لا يعني الإعفاء الضريبي.'}</p>
<div class="result" aria-live="polite">
${[['c-pg',en?'Price per gram':'سعر الغرام'],['c-gold',en?'Gold value':'قيمة الذهب'],['c-make',en?'Making charges':'المصنعية'],['c-tax',en?'Tax':'الضريبة'],['c-total',en?'Estimated total':'الإجمالي التقديري']].map(([id,label])=>`<div class="result-row${id==='c-total'?' total':''}"><span>${label}</span><strong><span id="${id}">—</span> <span class="c-curl">AED</span></strong></div>`).join('')}
<div class="result-row"><span>${en?'Estimated total in USD':'الإجمالي التقديري بالدولار'}</span><strong>$<span id="c-usd">—</span></strong></div></div>
<p class="note" id="c-rate-source"></p></section>${AD}
<section class="card-section"><h2>${en?'How the estimate works':'كيف تُحسب التكلفة'}</h2><div class="prose"><p>${en?'Gold value = gold weight × gram price for the selected karat. Making charges can be per gram, a fixed amount for the piece, or a percentage of the gold value. Tax is calculated on the base you choose. Total = gold + making + tax.':'قيمة الذهب = وزن الذهب × سعر غرام العيار المختار. يمكن أن تكون المصنعية لكل غرام أو مبلغاً ثابتاً للقطعة أو نسبة من قيمة الذهب. تُحسب الضريبة على الأساس الذي تختاره. الإجمالي = الذهب + المصنعية + الضريبة.'}</p><p>${en?'The automatic rate is international raw gold converted at the current exchange rate. It is not a guaranteed local retail quote. Enter the shop gram price to match an actual offer. Stones, delivery, other fees and buyback deductions are not included.':'السعر التلقائي هو الذهب الخام العالمي محوّلاً بسعر الصرف الحالي، وليس عرضاً مضموناً من محلات بلدك. أدخل سعر غرام المحل لمقارنة عرض فعلي. لا يشمل الحساب الأحجار أو التوصيل أو الرسوم الأخرى أو خصم إعادة الشراء.'}</p></div></section>${links(L,'gold-calculator')}`,
      faq:en?[
        ['Can I use the calculator outside the UAE?','Yes. Select any of the 44 countries to use its currency. Enter the making charge and actual invoice tax; tax rules are not assumed.'],
        ['Can I enter the shop’s own gram price?','Yes. The optional shop-price field replaces the live raw rate for the selected karat. Leave it blank to use the live rate.'],
        ['Does zero tax mean gold is exempt?','No. Zero is an initial input, not tax advice. Use the rate and taxable base quoted by your retailer.']
      ]:[
        ['هل تعمل الحاسبة خارج الإمارات؟','نعم، اختر أياً من 44 دولة لاستخدام عملتها، ثم أدخل المصنعية والضريبة الفعلية من الفاتورة. لا تفترض الحاسبة قواعد ضريبية.'],
        ['هل يمكن إدخال سعر غرام المحل؟','نعم، الحقل الاختياري يستبدل السعر المباشر بسعر غرام المحل للعيار المختار. اتركه فارغاً لاستخدام السعر المباشر.'],
        ['هل الضريبة صفر تعني إعفاء الذهب؟','لا. الصفر قيمة ابتدائية وليس نصيحة ضريبية. استخدم النسبة وأساس الحساب اللذين يحددهما البائع.']
      ]});
  }

  // ── المساعد الذكي ─────────────────────────────────────
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    const assistantFaq = en ? [
      ['Is the gold assistant free?', 'Yes, completely free with no sign-up. It answers instantly in your browser using the same live gold and exchange rates shown across the site.'],
      ['Which countries can I ask about?', 'All 44 countries covered by the site: the UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain, Egypt, India, Pakistan, Bangladesh, Turkey, the USA, UK, Europe, Southeast Asia, Africa, Latin America and more — in each local currency.'],
      ['Where do the answers come from?', 'Prices are computed from the live international spot price (Gold-API) and current exchange rates (open.er-api.com), the same sources the rest of the site uses. Shop prices add making charges and local taxes.'],
      ['Can the assistant give investment advice?', 'No. It explains prices, karats, units and zakat rules and converts currencies, but nothing it says is investment advice.'],
      ['What can I ask besides prices?', 'Karat differences (24K vs 22K vs 21K vs 18K), weight units like tola, ounce, baht, mithqal and tael, gold zakat and nisab, buying tips and making charges, silver prices, and currency conversion.']
    ] : [
      ['هل المساعد مجاني؟', 'نعم، مجاني تماماً وبدون تسجيل. يجيب فوراً داخل متصفحك باستخدام نفس الأسعار الحية للذهب والصرف المعروضة في الموقع.'],
      ['عن أي الدول أستطيع أن أسأل؟', 'كل الدول الـ44 التي يغطيها الموقع: الإمارات والسعودية والكويت وقطر وعُمان والبحرين ومصر والهند وباكستان وبنجلاديش وتركيا وأمريكا وبريطانيا وأوروبا وجنوب شرق آسيا وأفريقيا وأمريكا اللاتينية وغيرها، بكل عملة محلية.'],
      ['من أين تأتي الإجابات؟', 'تُحسب الأسعار من السعر العالمي المباشر (Gold-API) وأسعار الصرف الحالية (open.er-api.com)، وهي نفس مصادر باقي صفحات الموقع. أسعار المحلات تضيف المصنعية والضرائب المحلية.'],
      ['هل يقدم المساعد نصيحة استثمارية؟', 'لا. يشرح الأسعار والعيارات والأوزان وأحكام الزكاة ويحوّل العملات، لكن لا شيء مما يقوله نصيحة استثمارية.'],
      ['بماذا يجيب غير الأسعار؟', 'الفرق بين العيارات (24 و22 و21 و18)، ووحدات الوزن مثل التولة والأونصة والباهت والمثقال والتايل، وزكاة الذهب والنصاب، ونصائح الشراء والمصنعية، وأسعار الفضة، وتحويل العملات.']
    ];
    out.push({ lang: L, slug: 'assistant', alt: true, usesFx: true, usesAg: true, assistant: true,
      crumbs: [[en ? 'Gold assistant' : 'مساعد الذهب', url(L, 'assistant')]],
      title: en ? 'Gold Price Assistant: Ask Any Gold or Currency Question' : 'مساعد الذهب الذكي: اسأل أي سؤال عن الذهب والعملات',
      desc: en
        ? 'Free gold assistant: live prices in 44 countries, weight and currency conversions, zakat and buying guides. Chat on any page in Arabic or English.'
        : 'مساعد الذهب المجاني: أسعار الذهب المباشرة في 44 دولة، تحويل العيارات والأوزان (تولة، أونصة، باهت)، زكاة الذهب وتحويل العملات — إجابات فورية من الأسعار الحية.',
      faq: assistantFaq,
      body: `
<header class="page-head"><h1>${en ? 'Gold price assistant' : 'مساعد الذهب الذكي'}</h1>
<p class="lead">${en ? 'Ask anything about gold and currencies — live prices in 44 countries, conversions, zakat and buying tips. Answers are computed instantly from the live rates, free and with no sign-up.' : 'اسأل أي سؤال عن الذهب والعملات — أسعار مباشرة في 44 دولة، تحويلات، زكاة ونصائح شراء. الإجابات تُحسب فوراً من الأسعار الحية، مجاناً وبدون تسجيل.'}</p></header>
<section class="chat-wrap" id="assistant" aria-label="${en ? 'Gold assistant chat' : 'محادثة مساعد الذهب'}">
  <div class="chat-log" id="chat-log" aria-live="polite"></div>
  <div class="chat-chips" id="chat-chips"></div>
  <form class="chat-form" id="chat-form">
    <input class="chat-in" id="chat-in" type="text" autocomplete="off" placeholder="${en ? 'Ask: gold price in India, 10 grams 22K…' : 'اسأل: سعر الذهب في مصر، 10 جرام عيار 21…'}" aria-label="${en ? 'Your question' : 'سؤالك'}" />
    <button type="submit" aria-label="${en ? 'Send' : 'إرسال'}">${en ? 'Ask' : 'اسأل'}</button>
  </form>
</section>
<section class="card-section"><h2>${en ? 'What you can ask' : 'ماذا يمكنك أن تسأل؟'}</h2><div class="prose">
${en ? `<ul>
<li><strong>Live gold prices:</strong> "gold price in Egypt", "gold rate in India today", "gold price in Saudi Arabia" — any of the 44 countries, in its local currency and karats 24K, 22K, 21K and 18K.</li>
<li><strong>A specific weight:</strong> "price of 10 grams 22K in Pakistan", "5 tola gold price".</li>
<li><strong>Weight conversions:</strong> tola = 11.664 g, troy ounce = 31.103 g, Thai baht = 15.244 g, Iraqi mithqal = 5 g, Vietnamese tael = 37.5 g.</li>
<li><strong>Currency conversion:</strong> "convert 100 USD to EGP" across 40 currencies.</li>
<li><strong>Gold zakat:</strong> the 85-gram nisab, its value today, and the 2.5% due — then use the <a href="/en/zakat-calculator/">zakat calculator</a>.</li>
<li><strong>Karats and buying:</strong> the difference between 24K, 22K, 21K and 18K, making charges, VAT by country, and whether bars or jewellery suit saving.</li>
</ul>
<p>The assistant reads the same live spot price and exchange rates as the rest of Gold Prices Today, so its numbers match the country pages. For deep dives, browse the <a href="/en/articles/">gold guides</a> or open any <a href="/en/gcc/">country comparison</a>.</p>`
: `<ul>
<li><strong>أسعار الذهب المباشرة:</strong> «سعر الذهب في مصر»، «سعر الذهب في السعودية»، «سعر الذهب في الهند» — أي دولة من 44 دولة بعملتها المحلية وعيارات 24 و22 و21 و18.</li>
<li><strong>وزن معين:</strong> «سعر 10 جرام عيار 21»، «سعر 5 تولة عيار 22 في باكستان».</li>
<li><strong>تحويل الأوزان:</strong> التولة = 11.664 جرام، الأونصة = 31.103 جرام، الباهت التايلاندي = 15.244 جرام، المثقال العراقي = 5 جرام، التايل الفيتنامي = 37.5 جرام.</li>
<li><strong>تحويل العملات:</strong> «100 دولار كام جنيه» بين 40 عملة.</li>
<li><strong>زكاة الذهب:</strong> النصاب 85 جراماً وقيمته اليوم والزكاة المستحقة 2.5% — ثم احسب من <a href="/zakat-calculator/">حاسبة الزكاة</a>.</li>
<li><strong>العيارات والشراء:</strong> الفرق بين عيار 24 و22 و21 و18، والمصنعية، والضريبة في كل دولة، وأيهما أوفر للادخار: السبائك أم المشغولات.</li>
</ul>
<p>يقرأ المساعد نفس السعر العالمي المباشر وأسعار الصرف المستخدمة في باقي صفحات الموقع، لذلك أرقامه مطابقة لصفحات الدول. وللتفصيل تصفح <a href="/articles/">مقالات الذهب</a> أو افتح <a href="/gcc/">مقارنة أسعار الخليج</a>.</p>`}</div></section>
${links(L, 'assistant')}`
    });
  }

  // ── حاسبة الزكاة ──────────────────────────────────────
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    const inp = k => `<div class="field"><label for="z-${k}">${en ? `${k}K gold (grams)` : `ذهب عيار ${k} (غرام)`}</label><input id="z-${k}" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0" /></div>`;
    out.push({ lang: L, slug: 'zakat-calculator', alt: true,
      crumbs: [[en ? 'Zakat calculator' : 'حاسبة زكاة الذهب', url(L, 'zakat-calculator')]],
      title: en ? 'Zakat on Gold Calculator UAE — Nisab Today in AED' : 'حاسبة زكاة الذهب في الإمارات | قيمة النصاب اليوم بالدرهم',
      desc: en ? 'Calculate zakat on your gold using today\'s live price. Enter grams per karat to see the pure-gold weight, whether you reach the nisab (85 g) and the 2.5% due.'
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
      title: en ? `Gold Bar Price in UAE Today: 100g${px(24) ? ' = ' + fmt(ctx.g24 * 100) + ' AED' : ''}, 1kg, 10 Tola` : `سعر سبيكة الذهب اليوم في الإمارات${px(24) ? ': 100 غرام = ' + fmt(ctx.g24 * 100) + ' درهم' : ''}`,
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
<ul><li><strong>Premium:</strong> every bar is priced a little above the spot value. The premium per gram is highest on 1–5 g bars and lowest on 100 g and 1 kg bars.</li><li><strong>VAT:</strong> investment gold is zero-rated in the UAE only when it is at least 99% pure and in a form tradeable in global bullion markets — check your invoice.</li><li><strong>Authenticity:</strong> buy sealed bars from recognised refiners with a serial number and assay certificate.</li><li><strong>Resale:</strong> sealed, undamaged bars sell back more easily and closer to the spot price.</li></ul>`
        : `<p>السبائك أبسط طريقة للاستثمار في الذهب الفعلي، لأنك تدفع سعراً قريباً من قيمة الذهب الخام بمصنعية بسيطة أو بدونها. تُباع في الإمارات لدى محلات الذهب وتجار السبائك وبعض البنوك بأوزان من 1 غرام حتى 1 كيلوغرام، وتشتهر محلياً <strong>سبيكة 10 تولة</strong> (116.64 غرام).</p>
<ul><li><strong>العلاوة:</strong> كل سبيكة تُباع أعلى قليلاً من قيمة الذهب الخام، والعلاوة للغرام أعلى في السبائك الصغيرة (1–5 غرام) وأقل في سبائك 100 غرام والكيلو.</li><li><strong>الضريبة:</strong> الذهب الاستثماري بنقاء 99% فأكثر وبشكل قابل للتداول في أسواق السبائك العالمية يخضع لنسبة الصفر في الإمارات، تأكد من الفاتورة.</li><li><strong>الأصالة:</strong> اشترِ سبائك مغلّفة من مصافٍ معروفة تحمل رقماً تسلسلياً وشهادة فحص.</li><li><strong>إعادة البيع:</strong> السبيكة المغلّفة السليمة تُباع بسهولة أكبر وبسعر أقرب للسعر العالمي.</li></ul>`}</div></section>
<section class="card-section"><h2>${en ? 'Popular gold bar sizes — quick prices' : 'أشهر أوزان السبائك — الأسعار باختصار'}</h2><div class="prose">
${en ? `<ul><li><strong>1 gram gold bar:</strong> about <bdi>${P(24, 1)} AED</bdi> raw value — the smallest bar, highest premium per gram.</li>
<li><strong>10 gram gold bar:</strong> about <bdi>${P(24, 10)} AED</bdi>.</li>
<li><strong>100 gram gold bar:</strong> about <bdi>${P(24, 100)} AED</bdi> — the most searched size, with a much lower premium.</li>
<li><strong>10 tola gold bar (116.64 g):</strong> about <bdi>${P(24, TOLA * 10)} AED</bdi>.</li>
<li><strong>1 kg gold bar:</strong> about <bdi>${P(24, 1000)} AED</bdi> — the lowest premium, used by investors and dealers.</li></ul>
<p>Want to price a piece with a different weight? Use the <a href="/en/gold-calculator/">gold calculator</a>, or see today's <a href="/en/gold-24k/">24K gold rate per gram</a>.</p>`
 : `<ul><li><strong>سبيكة ذهب 1 غرام:</strong> قيمتها الخام نحو <bdi>${P(24, 1)} درهم</bdi>، وهي أصغر سبيكة وعلاوتها للغرام الأعلى.</li>
<li><strong>سبيكة 10 غرام:</strong> نحو <bdi>${P(24, 10)} درهم</bdi>.</li>
<li><strong>سبيكة ذهب 100 غرام:</strong> نحو <bdi>${P(24, 100)} درهم</bdi>، وهي الأكثر بحثاً وعلاوتها أقل بكثير.</li>
<li><strong>سبيكة 10 تولة (116.64 غرام):</strong> نحو <bdi>${P(24, TOLA * 10)} درهم</bdi>.</li>
<li><strong>سبيكة كيلو ذهب:</strong> نحو <bdi>${P(24, 1000)} درهم</bdi>، وعلاوتها الأقل، ويشتريها المستثمرون والتجار.</li></ul>
<p>تريد حساب وزن مختلف؟ استخدم <a href="/gold-calculator/">حاسبة الذهب</a> أو اطلع على <a href="/gold-24k/">سعر غرام عيار 24 اليوم</a>.</p>`}</div></section>
${links(L, 'gold-bars')}`,
      faq: en ? [
        ['What is the price of a 10 gram gold bar in the UAE today?', 'The live raw value of a 10 g 24K bar is shown in the table above. Dealers add a small premium, so the shop price is slightly higher.'],
        ['What is a 10 tola gold bar?', 'A 10 tola bar weighs about 116.64 grams of 24K gold and is one of the most traded bar sizes in the UAE.'],
        ['Is there VAT on gold bars in the UAE?', 'UAE zero-rating requires investment gold of at least 99% purity in a form tradeable in global bullion markets. Purity alone is not enough.'],
        ['How much is a 100 gram gold bar in the UAE?', 'The live raw value of a 100 g 24K bar is in the table above (100 g row) and in the quick-price list. Dealers add a premium, usually lower per gram than on small bars.'],
        ['How much is a 1 kg gold bar in the UAE?', 'The 1 kg row in the table shows the live raw value. 1 kg bars carry the lowest premium per gram.'],
        ['Where can I buy a gold bar in Dubai?', 'Licensed bullion dealers, jewellers in the Gold Souk and some banks sell gold bars. Buy sealed bars from recognised refiners with a serial number and certificate.']
      ] : [
        ['كم سعر سبيكة 10 غرام في الإمارات اليوم؟', 'تظهر قيمة سبيكة 10 غرام عيار 24 محدَّثة في الجدول أعلاه، ويضيف التاجر علاوة بسيطة فيكون سعر المحل أعلى قليلاً.'],
        ['ما هي سبيكة 10 تولة؟', 'سبيكة وزنها نحو 116.64 غرام من الذهب عيار 24، وهي من أكثر أوزان السبائك تداولاً في الإمارات.'],
        ['هل توجد ضريبة على سبائك الذهب في الإمارات؟', 'يشترط لنسبة الصفر في الإمارات نقاء 99% فأكثر وأن يكون المعدن بشكل قابل للتداول في أسواق السبائك العالمية؛ النقاء وحده لا يكفي.'],
        ['كم سعر سبيكة الذهب 100 غرام في الإمارات اليوم؟', 'تظهر القيمة الخام لسبيكة 100 غرام عيار 24 محدَّثة في الجدول أعلاه وفي قائمة الأسعار السريعة، ويضيف التاجر علاوة تكون أقل للغرام من السبائك الصغيرة.'],
        ['كم سعر كيلو الذهب اليوم في الإمارات؟', 'يظهر سعر سبيكة الكيلو في الجدول أعلاه، وعلاوتها هي الأقل للغرام بين كل الأوزان.'],
        ['أين أشتري سبيكة ذهب في دبي؟', 'تبيعها شركات تجارة السبائك المرخصة ومحلات سوق الذهب وبعض البنوك. اشترِ سبائك مغلّفة من مصافٍ معروفة برقم تسلسلي وشهادة.']
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
  out.push({ lang: 'ar', fixed: true, slug: 'history', noindex: days.length < 7,
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
    out.push({ lang: 'ar', fixed: true, slug: `history/${d.day}`, lastmod: d.day, noAds: false,
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
  out.push({ lang: 'ar', fixed: true, slug: 'about', crumbs: [['من نحن', '/about/']],
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

  out.push({ lang: 'ar', fixed: true, slug: 'contact', crumbs: [['اتصل بنا', '/contact/']],
    title: 'اتصل بنا | معلوماتي — أسعار الذهب في الإمارات',
    desc: 'تواصل مع فريق موقع معلوماتي لأسعار الذهب في الإمارات للاستفسارات والاقتراحات والإبلاغ عن الأخطاء.',
    schema: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'اتصل بنا', url: ctx.SITE + '/contact/' }],
    body: `<div class="hero"><h1>اتصل بنا</h1><p class="hero-sub">Contact us</p></div>
<section class="card-section"><div class="prose">
<p>يسعدنا تواصلك للاستفسارات أو الاقتراحات أو الإبلاغ عن خطأ في الأسعار أو المحتوى.</p>
<p><strong>البريد الإلكتروني:</strong> <a href="mailto:contact@maelumatii.com">contact@maelumatii.com</a></p>
<p>عند الإبلاغ عن خطأ، أرسل رابط الصفحة والدولة والعملة والعيار والوقت الذي شاهدت فيه الرقم، واذكر المنطقة الزمنية. تساعد لقطة شاشة واضحة على فهم المشكلة؛ لا ترسل بيانات دفع أو كلمات مرور أو مستندات شخصية.</p><p>السعر المرجعي للذهب الخام لا يشمل المصنعية أو ضريبة الفاتورة أو هامش المحل. إذا كان استفسارك عن فرق بين الموقع وعرض شراء أو بيع، وضّح أساس المقارنة دون إرسال بيانات حساسة.</p><p>الموقع يقدم معلومات وأدوات حسابية، ولا يشتري الذهب أو يبيعه ولا يفحص نقاء القطع. راجع مختصاً محلياً عند الحاجة لتقييم قطعة أو تفسير التزام ضريبي.</p>
<p>For enquiries in English, email <a href="mailto:contact@maelumatii.com">contact@maelumatii.com</a>.</p></div></section>` });

  out.push({ lang: 'ar', fixed: true, slug: 'privacy', crumbs: [['سياسة الخصوصية', '/privacy/']],
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
<h3>تنبيهات الأسعار على الجهاز</h3><p>إذا حفظت هدفاً لسعر الذهب، يُحفظ في التخزين المحلي لهذا المتصفح ولا يُرفع إلى خادمنا أو يتزامن مع أجهزة أخرى. يمكنك حذفه من صفحة التنبيهات أو بمسح بيانات الموقع. إشعارات المتصفح اختيارية وتتطلب إذنك؛ تظل التنبيهات مرتبطة بفتح الموقع ولا تعمل كمراسلات تليجرام أو بريد.</p>
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
      title: en ? `Silver Price in Dubai & UAE Today${ctx.ag ? ': ' + fmt(ctx.ag, 2) + ' AED per Gram' : ''}` : `سعر الفضة اليوم في دبي والإمارات${ctx.ag ? ': ' + fmt(ctx.ag, 2) + ' درهم للغرام' : ''}`,
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
<section class="card-section"><h2>${en ? 'Silver bullion, bars & coins in Dubai' : 'سبائك وعملات الفضة في دبي'}</h2><div class="prose">
${en ? `<p>Searching for the <strong>silver bullion price</strong> or <strong>silver coin prices</strong> in Dubai? Bars and coins are priced from the spot value above plus a dealer premium that is higher on small coins and lower on large bars.</p>
<ul><li><strong>1 oz silver coin / bar:</strong> spot value about <bdi>${S(1, ctx.TROY)} AED</bdi>.</li><li><strong>100 g silver bar:</strong> about <bdi>${S(1, 100)} AED</bdi>.</li><li><strong>1 kg silver bar:</strong> about <bdi>${S(1, 1000)} AED</bdi>.</li></ul>
<p>Compare with gold: see today's <a href="/en/gold-bars/">gold bar prices</a> and the <a href="/en/gold-price-usd/">global gold price in USD</a>.</p>`
 : `<p>تبحث عن <strong>سعر سبائك الفضة</strong> أو <strong>عملات الفضة</strong> في دبي؟ تُسعَّر السبائك والعملات من القيمة الخام أعلاه مع علاوة للتاجر، وهي أعلى في العملات الصغيرة وأقل في السبائك الكبيرة.</p>
<ul><li><strong>أونصة فضة (عملة أو سبيكة):</strong> القيمة الخام نحو <bdi>${S(1, ctx.TROY)} درهم</bdi>.</li><li><strong>سبيكة فضة 100 غرام:</strong> نحو <bdi>${S(1, 100)} درهم</bdi>.</li><li><strong>سبيكة فضة كيلو:</strong> نحو <bdi>${S(1, 1000)} درهم</bdi>.</li></ul>
<p>للمقارنة مع الذهب: <a href="/gold-bars/">أسعار سبائك الذهب</a> و<a href="/gold-price-usd/">سعر الذهب عالمياً بالدولار</a>.</p>`}</div></section>
${links(L, 'silver')}`,
      faq: en ? [
        ['What is the silver price per gram in the UAE today?', 'The live price of fine (999) silver per gram is shown at the top of this page in AED and USD, along with 925 sterling silver.'],
        ['What is 925 silver?', '925 or sterling silver contains 92.5% pure silver mixed with other metals for strength. It is the standard purity for silver jewellery.'],
        ['How much is 1 kg of silver in AED?', 'The live value of 1 kg of fine silver is shown in the weight table above; dealers add a premium for bars.'],
        ['What is the silver price in Dubai today?', 'Dubai follows the global spot price converted at 3.6725 AED per dollar. The live price per gram, ounce and kilo is at the top of this page.'],
        ['What is the silver bullion price in the UAE?', 'Bullion bars and coins are sold at the spot value plus a dealer premium. The raw value of 1 oz, 100 g and 1 kg is listed above.']
      ] : [
        ['كم سعر غرام الفضة اليوم في الإمارات؟', 'يظهر سعر غرام الفضة الخالصة (999) محدَّثاً في أعلى الصفحة بالدرهم والدولار، ومعه سعر الفضة الاسترليني 925.'],
        ['ما معنى فضة 925؟', 'فضة 925 أو الاسترليني تحتوي على 92.5% فضة خالصة مخلوطة بمعادن أخرى لزيادة الصلابة، وهي العيار المعتاد في مجوهرات الفضة.'],
        ['كم سعر كيلو الفضة اليوم؟', 'قيمة كيلو الفضة الخالصة تظهر في جدول الأوزان أعلاه بالدرهم والدولار، ويضيف التاجر علاوة عند بيع السبائك.'],
        ['كم سعر الفضة في دبي اليوم؟', 'تتبع دبي السعر العالمي محوَّلاً بسعر 3.6725 درهم للدولار، ويظهر سعر الغرام والأونصة والكيلو الحالي في أعلى الصفحة.'],
        ['كم سعر سبائك الفضة في الإمارات؟', 'تُباع السبائك والعملات بقيمة الفضة الخام مع علاوة للتاجر، وقيمة الأونصة و100 غرام والكيلو الخام مذكورة أعلاه.']
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
    out.push({ lang: 'en', fixed: true, slug: `gold-rate-${slug}`, usesFx: true,
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
    out.push({ lang: L, fixed: true, slug: 'gold-price-yesterday', alt: true, noindex: !yday,
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
  out.push({ lang: 'ar', fixed: true, slug: 'gold-forecast',
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

  // ══════════════ دول الخليج ══════════════
  const GCC = {
    saudi: { code: 'SAR', d: 2, vat: 15, peg: 'مربوط بالدولار رسمياً عند 3.75 ريال', pegEn: 'officially pegged at 3.75 riyals per US dollar',
      ar: { n: 'السعودية', in: 'في السعودية', cur: 'ريال سعودي', curS: 'ريال', cities: 'الرياض وجدة والدمام ومكة المكرمة والمدينة المنورة' },
      en: { n: 'Saudi Arabia', adj: 'Saudi', cur: 'Saudi riyal', cities: 'Riyadh, Jeddah, Dammam, Makkah and Madinah' },
      noteAr: 'تُطبَّق في السعودية ضريبة القيمة المضافة بنسبة 15% على المشغولات الذهبية، وهي من أعلى نسب الضريبة في الخليج، لذلك يكون الفرق بين سعر الذهب الخام وسعر الفاتورة أكبر من دول الجوار. أما الذهب الاستثماري (السبائك والعملات بنقاء 99% فأكثر) فيُعامل عادةً معاملة مختلفة، فتأكد من الفاتورة عند الشراء.',
      noteEn: 'Saudi Arabia charges 15% VAT on gold jewellery — one of the highest rates in the Gulf — so the gap between the raw gold price and the shop invoice is larger than in neighbouring countries. Investment gold (bars and coins of 99% purity or higher) is usually treated differently; check your invoice.' },
    kuwait: { code: 'KWD', d: 3, vat: 0, peg: 'مربوط بسلة عملات وليس بالدولار وحده، لذلك يتغير سعر صرفه يومياً', pegEn: 'pegged to a basket of currencies rather than the dollar alone, so its exchange rate moves daily', fx: true,
      ar: { n: 'الكويت', in: 'في الكويت', cur: 'دينار كويتي', curS: 'دينار', cities: 'مدينة الكويت والفروانية وحولي والأحمدي' },
      en: { n: 'Kuwait', adj: 'Kuwaiti', cur: 'Kuwaiti dinar', cities: 'Kuwait City, Farwaniya, Hawalli and Ahmadi' },
      noteAr: 'لا تُطبَّق ضريبة القيمة المضافة في الكويت حتى الآن، لذلك يتكون سعر الذهب في المحل من سعر الذهب الخام والمصنعية فقط. ولأن الدينار الكويتي غير مربوط بالدولار وحده، قد يتغير سعر الذهب بالدينار قليلاً حتى لو ثبت سعر الأونصة عالمياً. والدينار مقسّم إلى 1000 فلس، لذلك نعرض الأسعار بثلاث خانات عشرية.',
      noteEn: 'Kuwait does not apply VAT, so the shop price is simply the raw gold price plus making charges. Because the Kuwaiti dinar is not pegged to the dollar alone, the gold price in dinars can move slightly even when the global ounce price is flat. The dinar has 1,000 fils, so prices are shown to three decimals.' },
    qatar: { code: 'QAR', d: 2, vat: 0, peg: 'مربوط بالدولار رسمياً عند 3.64 ريال', pegEn: 'officially pegged at 3.64 riyals per US dollar',
      ar: { n: 'قطر', in: 'في قطر', cur: 'ريال قطري', curS: 'ريال', cities: 'الدوحة والريان والوكرة' },
      en: { n: 'Qatar', adj: 'Qatari', cur: 'Qatari riyal', cities: 'Doha, Al Rayyan and Al Wakrah' },
      noteAr: 'لا تُطبَّق ضريبة القيمة المضافة في قطر حتى الآن، فيتكون سعر الذهب في المحل من سعر الذهب الخام والمصنعية. ولأن الريال القطري مربوط بالدولار، يتحرك سعر الذهب في قطر مع السعر العالمي مباشرة.',
      noteEn: 'Qatar does not apply VAT, so the shop price is the raw gold price plus making charges. Because the Qatari riyal is pegged to the dollar, the gold price in Qatar moves directly with the global price.' },
    oman: { code: 'OMR', d: 3, vat: 5, peg: 'مربوط بالدولار رسمياً (الريال يساوي نحو 2.6 دولار)', pegEn: 'officially pegged to the US dollar (1 rial ≈ 2.6 dollars)',
      ar: { n: 'عُمان', in: 'في عُمان', cur: 'ريال عُماني', curS: 'ريال', cities: 'مسقط وصلالة وصحار ونزوى' },
      en: { n: 'Oman', adj: 'Omani', cur: 'Omani rial', cities: 'Muscat, Salalah, Sohar and Nizwa' },
      noteAr: 'تُطبَّق في سلطنة عُمان ضريبة القيمة المضافة بنسبة 5% على المشغولات الذهبية، ويُعامل الذهب الاستثماري عادةً معاملة مختلفة. الريال العُماني من أعلى العملات قيمة في العالم ومقسّم إلى 1000 بيسة، لذلك تظهر أسعار الغرام بأرقام صغيرة وبثلاث خانات عشرية.',
      noteEn: 'Oman applies 5% VAT on gold jewellery, while investment gold is usually treated differently. The Omani rial is one of the world\'s highest-valued currencies and has 1,000 baisa, so gram prices look small and are shown to three decimals.' },
    bahrain: { code: 'BHD', d: 3, vat: 10, peg: 'مربوط بالدولار رسمياً عند 0.376 دينار', pegEn: 'officially pegged at 0.376 dinars per US dollar',
      ar: { n: 'البحرين', in: 'في البحرين', cur: 'دينار بحريني', curS: 'دينار', cities: 'المنامة والمحرق والرفاع' },
      en: { n: 'Bahrain', adj: 'Bahraini', cur: 'Bahraini dinar', cities: 'Manama, Muharraq and Riffa' },
      noteAr: 'تُطبَّق في البحرين ضريبة القيمة المضافة بنسبة 10% على المشغولات الذهبية، ويُعامل الذهب الاستثماري عادةً معاملة مختلفة. والدينار البحريني مقسّم إلى 1000 فلس، لذلك نعرض الأسعار بثلاث خانات عشرية.',
      noteEn: 'Bahrain applies 10% VAT on gold jewellery, while investment gold is usually treated differently. The Bahraini dinar has 1,000 fils, so prices are shown to three decimals.' }
  };
  // دول خارج الخليج تبنى بنفس القالب (لا تدخل في صفحة مقارنة الخليج ولا قوائم دول الخليج)
  const OTHERS = {
    egypt: { code: 'EGP', d: 0, vat: 0, peg: 'غير مربوط بالدولار، وسعر صرفه يتغير يومياً', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true,
      ar: { n: 'مصر', in: 'في مصر', cur: 'جنيه', curS: 'جنيه', cities: 'القاهرة والإسكندرية والجيزة والمنصورة وأسيوط' },
      en: { n: 'Egypt', adj: 'Egyptian', cur: 'Egyptian pound', cities: 'Cairo, Alexandria, Giza, Mansoura and Asyut' },
      noteAr: 'الجنيه المصري غير مربوط بالدولار، لذلك يتحرك سعر الذهب بالجنيه مع السعر العالمي ومع سعر الصرف معاً، وقد يتغير حتى لو ثبت سعر الأونصة عالمياً. عيار 21 هو الأكثر تداولاً في محلات الصاغة المصرية، يليه عيار 18. وفي مصر تُطبَّق ضريبة القيمة المضافة 14% على المصنعية وأجور التصنيع فقط وليس على قيمة الذهب نفسها، إضافة إلى رسوم الدمغة، لذلك لا نعرض عمود ضريبة على قيمة الذهب. وقد يزيد السعر في السوق المحلية عن السعر المحسوب هنا بعلاوة تختلف حسب العرض والطلب وتوافر الذهب.',
      noteEn: 'The Egyptian pound is not pegged to the dollar, so the gold price in EGP moves with both the global price and the exchange rate, and can change even when the global ounce price is flat. 21K is the most traded karat in Egyptian jewellery shops, followed by 18K. In Egypt, 14% VAT applies to making charges and workmanship only, not to the gold value itself, plus hallmarking (damgha) fees — so we show no VAT column on the gold value. Local market prices can run above the calculated price here by a premium that varies with supply and demand.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 21 في مصر اليوم؟', 'يظهر سعر غرام عيار 21 بالجنيه المصري محدَّثاً في أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام المحسوب من السعر العالمي وسعر الصرف، بدون مصنعية أو رسوم دمغة.'],
        ['هل توجد ضريبة على الذهب في مصر؟', 'تُطبَّق ضريبة القيمة المضافة 14% على المصنعية وأجور التصنيع ورسوم الدمغة فقط، وليس على قيمة الذهب الخام نفسها.'],
        ['لماذا يختلف السعر في محلات الصاغة عن السعر المعروض هنا؟', 'السعر هنا محسوب من السعر العالمي وسعر صرف الجنيه لحظياً. في السوق المحلية تُضاف المصنعية ورسوم الدمغة، وقد تُضاف علاوة حسب العرض والطلب وتوافر الذهب، فيكون سعر المحل أعلى.']
      ],
      faqEn: [
        ['What is the 21K gold price in Egypt today?', 'The live 21K price per gram in Egyptian pounds is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price calculated from the global spot price and the EGP exchange rate, without making charges or hallmarking fees.'],
        ['Is there VAT on gold in Egypt?', 'Egypt applies 14% VAT on making charges and workmanship only, not on the gold value itself, plus hallmarking (damgha) fees.'],
        ['Why do Egyptian shop prices differ from this page?', 'The price here is calculated live from the global spot price and the EGP exchange rate. Local shops add making charges and hallmarking fees, and may add a market premium depending on supply and demand.']
      ] },
    india: { code: 'INR', d: 0, vat: 3, taxName: 'GST', peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      tEn: 'Gold Rate in India Today (INR) — 22K & 24K per Gram',
      dEn: 'Live gold rate in India today in rupees (INR) and dollars: 22K and 24K gold price per gram, 10 grams, tola and ounce with 3% GST column, updated every 5 minutes.',
      ar: { n: 'الهند', in: 'في الهند', cur: 'روبية', curS: 'روبية', cities: '' },
      en: { n: 'India', adj: 'Indian', cur: 'Indian rupee', cities: 'Mumbai, Delhi, Chennai, Kolkata and Hyderabad' },
      noteAr: '',
      noteEn: 'The Indian rupee is not pegged to the dollar, so the gold rate in INR moves with both the global price and the exchange rate. 22K is the most traded karat in India, while 24K is bought mainly as coins and bars. The official retail-jewellery FAQ applies 3% GST to the total transaction value, including making charges even when shown separately. Its separate 5% job-work example is not the same retail sale. The GST column here adds 3% to the reference metal value only and is not a complete jewellery invoice. Local product prices can differ from the reference metal value because of import costs, dealer premiums and workmanship. <a href="https://www.gstcouncil.gov.in/sites/default/files/2024-02/sectoral-fq-gems-jewellery.pdf">Official jewellery GST FAQ, questions 7 and 8</a>. Confirm the treatment of your exact supply on the invoice.',
      faqEn: [
        ['What is the 22K gold rate in India today?', 'The live 22K price per gram in Indian rupees is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold rate calculated from the global spot price and the INR exchange rate, without making charges or GST.'],
        ['Is there GST on gold in India?', 'The official FAQ applies 3% GST to the total retail-jewellery transaction value including making charges. A separate job-work supply is different. This page only adds 3% to its reference metal value, not to an unknown shop invoice.'],
        ['Why do Indian shop prices differ from this page?', 'The rate here is calculated live from the global spot price and the INR exchange rate. Local jewellers quote per-city rates that add making charges, GST, and often a premium caused by import duties and local demand.']
      ] },
    pakistan: { code: 'PKR', d: 0, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      tEn: 'Gold Rate in Pakistan Today (PKR) — Per Tola & Gram',
      dEn: 'Live gold rate in Pakistan today in rupees (PKR) and dollars: 24K, 22K, 21K and 18K per tola, per gram and per ounce, updated every 5 minutes.',
      ar: { n: 'باكستان', in: 'في باكستان', cur: 'روبية', curS: 'روبية', cities: '' },
      en: { n: 'Pakistan', adj: 'Pakistani', cur: 'Pakistani rupee', cities: 'Karachi, Lahore, Islamabad and Peshawar' },
      noteAr: '',
      noteEn: 'The Pakistani rupee is not pegged to the dollar, so the gold rate in PKR moves with both the global price and the exchange rate. Jewellery in Pakistan is mostly 22K and 21K, while 24K is bought as bars and coins. Gold in Pakistan is commonly quoted per tola (11.664 g), and the table above includes the tola column. City sarafa associations announce daily rates that can include a premium over international parity, and shops add making charges per piece.',
      faqEn: [
        ['What is the gold rate per tola in Pakistan today?', 'The live 24K rate per tola (11.664 g) in Pakistani rupees is shown in the price table above and refreshes about every 5 minutes. Per-gram rates for 22K, 21K and 18K are shown on their own pages.'],
        ['Which karat is most common in Pakistan?', 'Most jewellery in Pakistan is made in 22K and 21K gold, while 24K is used for bars and coins bought for saving and investment.'],
        ['Why do Pakistani shop rates differ from this page?', 'The rate here is calculated live from the global spot price and the PKR exchange rate. City sarafa associations announce daily rates that can include a premium, and shops add making charges per piece.']
      ] },
    bangladesh: { code: 'BDT', d: 0, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'بنجلاديش', in: 'في بنجلاديش', cur: 'تاكا', curS: 'تاكا', cities: '' },
      en: { n: 'Bangladesh', adj: 'Bangladeshi', cur: 'Bangladeshi taka', cities: 'Dhaka, Chattogram, Khulna and Sylhet' },
      noteAr: '',
      noteEn: 'The Bangladeshi taka is not pegged to the dollar, so the gold price in BDT moves with both the global price and the exchange rate. Most jewellery in Bangladesh is 22K, with 21K also common. The national jewellers association announces reference prices that can sit above international parity, and shops add making charges per piece — so expect shop prices to be higher than the raw rate shown here.',
      faqEn: [
        ['What is the gold price in Bangladesh today?', 'The live price per gram in Bangladeshi taka is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without making charges.'],
        ['Which karat is most common in Bangladesh?', 'Most jewellery in Bangladesh is made in 22K gold, with 21K also widely available. 24K is used mainly for bars and coins.'],
        ['Why do shop prices in Bangladesh differ from this page?', 'The rate here is calculated live from the global spot price and the BDT exchange rate. The jewellers association announces reference rates that include a premium, and shops add making charges per piece.']
      ] },
    turkey: { code: 'TRY', d: 0, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      tEn: 'Gold Price in Turkey Today (TRY) — Gram Altın Rates',
      dEn: 'Live gram altın price in Turkey today in lira (TRY) and dollars: 24K gram gold, 22K, 21K and 18K per gram and per ounce, updated every 5 minutes.',
      ar: { n: 'تركيا', in: 'في تركيا', cur: 'ليرة', curS: 'ليرة', cities: '' },
      en: { n: 'Turkey', adj: 'Turkish', cur: 'Turkish lira', cities: 'Istanbul, Ankara, Izmir and Bursa' },
      noteAr: '',
      noteEn: 'The Turkish lira floats freely, so the gold price in TRY moves with both the global price and the exchange rate, and can change even when the global ounce price is flat. Turkey has a strong gram-gold culture: 24K is bought as gram gold (gram altin) and coins for saving, while jewellery is usually 22K (bilezik) or 18K. Investment gold is generally exempt from VAT (KDV); jewellery carries KDV on the workmanship portion. The famous quarter coin (ceyrek altin) weighs about 1.75 g of 22K gold.',
      faqEn: [
        ['What is the gram gold (gram altin) price in Turkey today?', 'The live 24K price per gram in Turkish lira is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold rate calculated from the global spot price and the TRY exchange rate.'],
        ['What is ceyrek altin (quarter gold coin)?', 'A small Turkish gold coin weighing about 1.75 g of 22K gold, traditionally given as a gift and used for saving. Its value tracks the 22K rate per gram.'],
        ['Is there VAT on gold in Turkey?', 'Investment gold (bars and coins) is generally exempt from VAT (KDV) in Turkey, while jewellery carries KDV on the workmanship portion.']
      ] },
    usa: { code: 'USD', d: 2, vat: 0, peg: '', pegEn: 'the base currency of the global gold market, so the US price follows the global spot price directly', fx: false, enOnly: true,
      tEn: 'Gold Price Today in USA (USD) — Per Gram & Ounce',
      dEn: 'Live gold price in the USA today in US dollars: 24K, 22K, 21K and 18K per gram, per ounce and per kilo, updated every 5 minutes from the global spot price.',
      ar: { n: 'أمريكا', in: 'في أمريكا', cur: 'دولار', curS: 'دولار', cities: '' },
      en: { n: 'USA', adj: 'American', cur: 'US dollar', cities: 'New York, Los Angeles, Chicago and Houston' },
      noteAr: '',
      noteEn: 'The US dollar is the base currency of the global gold market, so the gold price in the USA tracks the spot price directly with no exchange-rate step. Everyday jewellery in the US is most often 14K or 10K, while 18K is the standard for fine jewellery and 24K is bought as bars and coins. Investment-grade bullion is exempt from sales tax in many states, while jewellery is usually taxed at the local rate; tax rules differ by state, so this page shows the raw gold value only.',
      faqEn: [
        ['What is the gold price in the USA today?', 'The live price per gram in US dollars is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate calculated directly from the global spot price, without tax or making charges.'],
        ['Which karat is most common in the USA?', 'Most everyday jewellery in the US is 14K or 10K, with 18K used for fine jewellery. 24K is bought mainly as bars and coins for investment.'],
        ['Is gold taxed in the USA?', 'Tax rules differ by state: many states exempt investment-grade bullion from sales tax, while jewellery is usually taxed at the local rate. This page shows the raw gold value only.']
      ] },
    uk: { code: 'GBP', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'بريطانيا', in: 'في بريطانيا', cur: 'جنيه إسترليني', curS: 'إسترليني', cities: '' },
      en: { n: 'UK', adj: 'British', cur: 'British pound', cities: 'London, Birmingham, Manchester and Leeds' },
      noteAr: '',
      noteEn: 'The pound sterling floats freely, so the gold price in GBP moves with both the global price and the exchange rate. Jewellery in the UK is most often 9K or 18K, and all gold sold is hallmarked by an official assay office. Investment gold (qualifying bars and coins) is exempt from VAT in the UK, while jewellery carries 20% VAT included in the shop price — so this page shows the raw gold value only.',
      faqEn: [
        ['What is the gold price in the UK today?', 'The live price per gram in British pounds is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without VAT or making charges.'],
        ['Is there VAT on gold in the UK?', 'Investment gold (qualifying bars and coins) is VAT-exempt in the UK. Gold jewellery carries 20% VAT, which shops include in the final price.'],
        ['Which karat is most common in the UK?', 'Most British jewellery is 9K or 18K, and every piece over one gram must carry a hallmark from an official assay office. 22K is popular in South Asian communities, and 24K is bought as bars and coins.']
      ] },
    canada: { code: 'CAD', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'كندا', in: 'في كندا', cur: 'دولار كندي', curS: 'دولار', cities: '' },
      en: { n: 'Canada', adj: 'Canadian', cur: 'Canadian dollar', cities: 'Toronto, Vancouver, Montreal and Calgary' },
      noteAr: '',
      noteEn: 'The Canadian dollar floats freely, so the gold price in CAD moves with both the global price and the exchange rate. Canada is a major gold producer, and bars and coins of 99.5% purity or higher are exempt from GST/HST as investment precious metals, while jewellery is taxed at the local rate. Everyday jewellery is most often 10K or 14K, with 18K for fine pieces.',
      faqEn: [
        ['What is the gold price in Canada today?', 'The live price per gram in Canadian dollars is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without tax or making charges.'],
        ['Is gold taxed in Canada?', 'Bars and coins of at least 99.5% purity are exempt from GST/HST as investment precious metals. Gold jewellery is taxed at the local GST/HST/PST rate, included in the shop price.'],
        ['Which karat is most common in Canada?', 'Most everyday jewellery in Canada is 10K or 14K, with 18K used for fine jewellery. 24K is bought as bars and coins, including the Maple Leaf coin.']
      ] },
    australia: { code: 'AUD', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'أستراليا', in: 'في أستراليا', cur: 'دولار أسترالي', curS: 'دولار', cities: '' },
      en: { n: 'Australia', adj: 'Australian', cur: 'Australian dollar', cities: 'Sydney, Melbourne, Brisbane and Perth' },
      noteAr: '',
      noteEn: 'The Australian dollar floats freely, so the gold price in AUD moves with both the global price and the exchange rate. Australia is one of the world\'s largest gold producers, and investment-grade gold (bars and coins of 99.5% purity or higher) is GST-free, while jewellery carries 10% GST in the shop price. Everyday jewellery is most often 9K or 18K.',
      faqEn: [
        ['What is the gold price in Australia today?', 'The live price per gram in Australian dollars is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without GST or making charges.'],
        ['Is there GST on gold in Australia?', 'Investment-grade gold (bars and coins of at least 99.5% purity) is GST-free in Australia. Gold jewellery carries 10% GST, included in the shop price.'],
        ['Which karat is most common in Australia?', 'Most everyday jewellery in Australia is 9K or 18K. 24K is bought as bars and coins, including Perth Mint products.']
      ] },
    philippines: { code: 'PHP', d: 0, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'الفلبين', in: 'في الفلبين', cur: 'بيسو', curS: 'بيسو', cities: '' },
      en: { n: 'Philippines', adj: 'Filipino', cur: 'Philippine peso', cities: 'Manila, Quezon City, Cebu and Davao' },
      noteAr: '',
      noteEn: 'The Philippine peso floats freely, so the gold price in PHP moves with both the global price and the exchange rate. Jewellery in the Philippines is most often 18K or 14K, and pieces sold as Saudi gold (18K and 21K) are especially popular with overseas Filipino workers. Jewellery carries 12% VAT in the shop price, and pawnshops and dealers add their own margins — so this page shows the raw gold value only.',
      faqEn: [
        ['What is the gold price in the Philippines today?', 'The live price per gram in Philippine pesos is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without VAT or making charges.'],
        ['Which karat is most common in the Philippines?', 'Most jewellery in the Philippines is 18K or 14K. Saudi gold pieces in 18K and 21K are widely bought, especially by overseas Filipino workers.'],
        ['Is gold taxed in the Philippines?', 'Gold jewellery carries 12% VAT in the Philippines, included in the shop price. Dealers and pawnshops also add their own margins over the raw gold value shown here.']
      ] },
    malaysia: { code: 'MYR', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      tEn: 'Gold Price in Malaysia Today (MYR) — Emas 916 & 999',
      dEn: 'Live gold price in Malaysia today in ringgit (MYR) and dollars: emas 916 (22K), 999 (24K) and 18K per gram and per ounce, updated every 5 minutes.',
      ar: { n: 'ماليزيا', in: 'في ماليزيا', cur: 'رينغيت', curS: 'رينغيت', cities: '' },
      en: { n: 'Malaysia', adj: 'Malaysian', cur: 'Malaysian ringgit', cities: 'Kuala Lumpur, Penang, Johor Bahru and Ipoh' },
      noteAr: '',
      noteEn: 'The Malaysian ringgit floats freely, so the gold price in MYR moves with both the global price and the exchange rate. Malaysia has a strong 22K culture: emas 916 (91.6% gold) is the standard for jewellery and saving, while 999 gold is bought as bars and dinar coins. Investment precious metals are exempt from sales and service tax in Malaysia, and jewellers quote daily rates that add workmanship per piece.',
      faqEn: [
        ['What is the gold price in Malaysia today?', 'The live price per gram in Malaysian ringgit is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without workmanship charges.'],
        ['What is emas 916?', 'Emas 916 is 22K gold (91.6% purity), the standard karat for jewellery and saving in Malaysia. Its price per gram tracks the 22K rate shown on this page.'],
        ['Is gold taxed in Malaysia?', 'Investment precious metals are exempt from sales and service tax (SST) in Malaysia. Jewellery prices add workmanship charges per piece over the raw gold value.']
      ] },
    nepal: { code: 'NPR', d: 0, vat: 0, peg: '', pegEn: 'pegged to the Indian rupee, which itself floats against the US dollar', fx: true, enOnly: true,
      tEn: 'Gold Price in Nepal Today (NPR) — Per Tola & Gram',
      dEn: 'Live gold price in Nepal today in rupees (NPR) and dollars: 24K, 22K, 21K and 18K per tola, per gram and per ounce, updated every 5 minutes.',
      ar: { n: 'نيبال', in: 'في نيبال', cur: 'روبية', curS: 'روبية', cities: '' },
      en: { n: 'Nepal', adj: 'Nepali', cur: 'Nepalese rupee', cities: 'Kathmandu, Pokhara, Lalitpur and Biratnagar' },
      noteAr: '',
      noteEn: 'The Nepalese rupee is pegged to the Indian rupee (NPR 1.6 = INR 1), which floats against the US dollar, so the gold price in NPR moves with both the global price and the exchange rate. Gold in Nepal is traditionally quoted per tola (11.664 g), and the table above includes the tola column. The national gold and silver dealers association announces daily reference rates, and hallmark-certified (chhapawal) gold commands a premium over the raw rate shown here.',
      faqEn: [
        ['What is the gold price per tola in Nepal today?', 'The live 24K rate per tola (11.664 g) in Nepalese rupees is shown in the price table above and refreshes about every 5 minutes. Per-gram rates for 22K, 21K and 18K are on their own pages.'],
        ['What is chhapawal gold?', 'Chhapawal is hallmark-certified gold in Nepal, tested and stamped for purity. It trades at a premium over non-certified (tejabi) gold, and both track the international rate shown here.'],
        ['Which karat is most common in Nepal?', 'Traditional jewellery in Nepal is mostly 24K and 22K, bought per tola. 18K is used for diamond and modern designs.']
      ] },
    southafrica: { code: 'ZAR', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'جنوب أفريقيا', in: 'في جنوب أفريقيا', cur: 'راند', curS: 'راند', cities: '' },
      en: { n: 'South Africa', adj: 'South African', cur: 'South African rand', cities: 'Johannesburg, Cape Town, Durban and Pretoria' },
      noteAr: '',
      noteEn: 'The South African rand floats freely, so the gold price in ZAR moves with both the global price and the exchange rate. South Africa is one of the historic giants of gold mining and the home of the Krugerrand, the 22K investment coin that contains exactly one ounce of pure gold. Krugerrands are zero-rated for VAT, while jewellery carries 15% VAT in the shop price. Everyday jewellery is most often 9K or 18K.',
      faqEn: [
        ['What is the gold price in South Africa today?', 'The live price per gram in South African rand is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without VAT or making charges.'],
        ['What is a Krugerrand?', 'A South African investment coin minted since 1967, made of 22K gold and containing exactly one troy ounce of pure gold. Its value tracks the gold price per ounce shown on this page, plus a small minting premium.'],
        ['Is there VAT on gold in South Africa?', 'Krugerrands and qualifying investment coins are zero-rated for VAT in South Africa. Gold jewellery carries 15% VAT, included in the shop price.']
      ] },
    iraq: { code: 'IQD', d: 0, vat: 0, peg: 'مربوط بسعر رسمي للبنك المركزي مقابل الدولار، مع سعر سوق قد يختلف عنه', pegEn: 'managed at an official rate against the US dollar, with a market rate that can differ', fx: true,
      ar: { n: 'العراق', in: 'في العراق', cur: 'دينار', curS: 'دينار', cities: 'بغداد والبصرة وأربيل والنجف' },
      en: { n: 'Iraq', adj: 'Iraqi', cur: 'Iraqi dinar', cities: 'Baghdad, Basra, Erbil and Najaf' },
      noteAr: 'يعتمد هذا الموقع سعر الصرف اليومي للسوق للدينار العراقي، وقد يختلف عن السعر الرسمي للبنك المركزي (1,310 دينار للدولار)، لذلك قد تجد فرقاً عن نشرات الصاغة المحلية. عيار 21 هو الأكثر انتشاراً في المجوهرات العراقية، بينما يُشترى عيار 24 كسبائك وليرات ذهبية للادخار، وتُضاف المصنعية على كل قطعة حسب الصياغ.',
      noteEn: 'This page uses the daily market exchange rate of the Iraqi dinar; the official Central Bank rate (1,310 IQD per USD) can differ, so local gold dealer bulletins may show different figures. 21K is the standard karat for Iraqi jewellery, while 24K is bought as bars and gold coins for saving, and making charges are added per piece.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 21 في العراق اليوم؟', 'يظهر سعر غرام عيار 21 بالدينار محدَّثاً في أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية.'],
        ['لماذا يختلف السعر هنا عن نشرة الصاغة في العراق؟', 'نحسب السعر من السعر العالمي وسعر صرف السوق اليومي للدينار، وقد يختلف سعر الصرف عن السعر الرسمي للبنك المركزي، كما تضيف المحلات مصنعية وهامشاً محلياً.'],
        ['ما العيار الأكثر انتشاراً في العراق؟', 'عيار 21 هو الأكثر انتشاراً في المجوهرات العراقية، ويُستخدم عيار 24 للسبائك والليرات الذهبية.']
      ],
      faqEn: [
        ['What is the 21K gold price in Iraq today?', 'The live 21K price per gram in Iraqi dinars is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges.'],
        ['Why does this rate differ from Iraqi dealer bulletins?', 'This page uses the daily market exchange rate of the dinar, which can differ from the official Central Bank rate (1,310 IQD per USD). Local shops also add making charges and a market premium.'],
        ['Which karat is most common in Iraq?', '21K is the standard karat for Iraqi jewellery, while 24K is bought as bars and gold coins for saving.']
      ] },
    jordan: { code: 'JOD', d: 3, vat: 0, peg: 'مربوط بالدولار بسعر ثابت (0.709)', pegEn: 'pegged to the US dollar at 0.709', fx: false,
      ar: { n: 'الأردن', in: 'في الأردن', cur: 'دينار', curS: 'دينار', cities: 'عمّان وإربد والزرقاء والعقبة' },
      en: { n: 'Jordan', adj: 'Jordanian', cur: 'Jordanian dinar', cities: 'Amman, Irbid, Zarqa and Aqaba' },
      noteAr: 'الدينار الأردني مربوط بالدولار بسعر ثابت 0.709 منذ عام 1995، لذلك يتحرك سعر الذهب بالدينار مع السعر العالمي بشكل شبه مباشر. عيار 21 هو الأكثر انتشاراً في المجوهرات الأردنية، بينما يُشترى عيار 24 كسبائك وعملات للادخار، وتضيف المحلات المصنعية على كل قطعة.',
      noteEn: 'The Jordanian dinar has been pegged to the US dollar at 0.709 since 1995, so the gold price in JOD follows the global price almost one-to-one. 21K is the standard karat for jewellery in Jordan, while 24K is bought as bars and coins, and shops add making charges per piece.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 21 في الأردن اليوم؟', 'يظهر سعر غرام عيار 21 بالدينار محدَّثاً في أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية.'],
        ['هل الدينار الأردني مربوط بالدولار؟', 'نعم، الدينار الأردني مربوط بالدولار بسعر ثابت 0.709 منذ عام 1995، لذلك يتحرك سعر الذهب بالدينار مع السعر العالمي مباشرة تقريباً.'],
        ['ما العيار الأكثر انتشاراً في الأردن؟', 'عيار 21 هو الأكثر انتشاراً في المجوهرات الأردنية، بينما يُشترى عيار 24 كسبائك وعملات للادخار.']
      ],
      faqEn: [
        ['What is the 21K gold price in Jordan today?', 'The live 21K price per gram in Jordanian dinars is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges.'],
        ['Is the Jordanian dinar pegged to the dollar?', 'Yes. The Jordanian dinar has been pegged at 0.709 JOD per USD since 1995, so the gold price in JOD follows the global price almost directly.'],
        ['Which karat is most common in Jordan?', '21K is the standard karat for Jordanian jewellery, while 24K is bought as bars and coins for saving.']
      ] },
    morocco: { code: 'MAD', d: 2, vat: 0, peg: 'مُدار بسعر مرن مقابل سلة من اليورو والدولار', pegEn: 'managed against a basket of the euro and the US dollar, so its rate moves daily', fx: true, noK21: true,
      ar: { n: 'المغرب', in: 'في المغرب', cur: 'درهم', curS: 'درهم', cities: 'الدار البيضاء والرباط ومراكش وفاس' },
      en: { n: 'Morocco', adj: 'Moroccan', cur: 'Moroccan dirham', cities: 'Casablanca, Rabat, Marrakech and Fes' },
      noteAr: 'الدرهم المغربي يُدار بسعر مرن مقابل سلة من اليورو والدولار، لذلك يتحرك سعر الذهب بالدرهم مع السعر العالمي وسعر الصرف معاً. عيار 18 هو الأكثر انتشاراً في المجوهرات المغربية التقليدية والعصرية، بينما يُقتنى عيار 24 كسبائك وعملات، وتُضاف المصنعية على كل قطعة.',
      noteEn: 'The Moroccan dirham is managed against a basket of the euro and the US dollar, so the gold price in MAD moves with both the global price and the exchange rate. 18K is the standard karat for Moroccan jewellery, both traditional and modern, while 24K is bought as bars and coins, and making charges are added per piece.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 18 في المغرب اليوم؟', 'يظهر سعر غرام عيار 18 بالدرهم في جدول الأسعار أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية.'],
        ['ما العيار الأكثر انتشاراً في المغرب؟', 'عيار 18 هو الأكثر انتشاراً في المجوهرات المغربية، ويُقتنى عيار 24 كسبائك وعملات للادخار.'],
        ['لماذا يختلف سعر المحل عن هذه الصفحة؟', 'السعر هنا خام محسوب من السعر العالمي وسعر صرف الدرهم، والمحلات تضيف المصنعية والضرائب وهامش الربح على كل قطعة.']
      ],
      faqEn: [
        ['What is the 18K gold price in Morocco today?', 'The live 18K price per gram in Moroccan dirhams is shown in the price table above and refreshes about every 5 minutes. It is the raw gold price without making charges.'],
        ['Which karat is most common in Morocco?', '18K is the standard karat for Moroccan jewellery, both traditional and modern, while 24K is bought as bars and coins.'],
        ['Why do Moroccan shop prices differ from this page?', 'The rate here is the raw gold value calculated from the global price and the dirham exchange rate. Shops add making charges, taxes and their margin per piece.']
      ] },
    algeria: { code: 'DZD', d: 0, vat: 0, peg: 'مُدار بسعر مرن مقابل الدولار', pegEn: 'managed against the US dollar, so its rate moves daily', fx: true, noK21: true,
      ar: { n: 'الجزائر', in: 'في الجزائر', cur: 'دينار', curS: 'دينار', cities: 'الجزائر العاصمة ووهران وقسنطينة وسطيف' },
      en: { n: 'Algeria', adj: 'Algerian', cur: 'Algerian dinar', cities: 'Algiers, Oran, Constantine and Setif' },
      noteAr: 'الدينار الجزائري يُدار بسعر مرن مقابل الدولار، لذلك يتحرك سعر الذهب بالدينار مع السعر العالمي وسعر الصرف معاً. عيار 18 هو الأكثر انتشاراً في المجوهرات الجزائرية، بينما يُقتنى عيار 24 كسبائك وعملات للادخار، وتُضاف المصنعية على كل قطعة.',
      noteEn: 'The Algerian dinar is managed against the US dollar, so the gold price in DZD moves with both the global price and the exchange rate. 18K is the standard karat for Algerian jewellery, while 24K is bought as bars and coins for saving, and making charges are added per piece.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 18 في الجزائر اليوم؟', 'يظهر سعر غرام عيار 18 بالدينار في جدول الأسعار أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية.'],
        ['ما العيار الأكثر انتشاراً في الجزائر؟', 'عيار 18 هو الأكثر انتشاراً في المجوهرات الجزائرية، ويُقتنى عيار 24 كسبائك وعملات للادخار.'],
        ['لماذا يختلف سعر المحل عن هذه الصفحة؟', 'السعر هنا خام محسوب من السعر العالمي وسعر صرف الدينار، والمحلات تضيف المصنعية وهامش الربح على كل قطعة.']
      ],
      faqEn: [
        ['What is the 18K gold price in Algeria today?', 'The live 18K price per gram in Algerian dinars is shown in the price table above and refreshes about every 5 minutes. It is the raw gold price without making charges.'],
        ['Which karat is most common in Algeria?', '18K is the standard karat for Algerian jewellery, while 24K is bought as bars and coins for saving.'],
        ['Why do Algerian shop prices differ from this page?', 'The rate here is the raw gold value calculated from the global price and the dinar exchange rate. Shops add making charges and their margin per piece.']
      ] },
    indonesia: { code: 'IDR', d: 0, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'إندونيسيا', in: 'في إندونيسيا', cur: 'روبية', curS: 'روبية', cities: '' },
      en: { n: 'Indonesia', adj: 'Indonesian', cur: 'Indonesian rupiah', cities: 'Jakarta, Surabaya, Bandung and Medan' },
      noteAr: '',
      noteEn: 'The Indonesian rupiah floats freely, so the gold price in IDR moves with both the global price and the exchange rate. Indonesia has a strong 24K saving culture: Antam bars (Logam Mulia, the state refiner) are the standard investment product and trade at a premium over the raw rate shown here, while everyday jewellery is often made in lower local purities. Gold bars in Indonesia are priced per gram with buyback spreads at official boutiques.',
      faqEn: [
        ['What is the gold price in Indonesia today?', 'The live price per gram in Indonesian rupiah is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without premiums or making charges.'],
        ['What is an Antam gold bar?', 'A bar produced by Logam Mulia, the precious-metal refinery of the Indonesian state miner Antam. It is the standard gold investment product in Indonesia and trades at a premium over the international rate shown here.'],
        ['Which karat is most common in Indonesia?', 'For saving, Indonesians prefer 24K bars and coins. Jewellery is often made in lower local purities as well as 18K and 22K.']
      ] },
    thailand: { code: 'THB', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true, un: ['1 baht (15.244 g)', 15.244],
      tEn: 'Gold Price in Thailand Today (THB) — Baht & Gram',
      dEn: 'Live gold price in Thailand today in baht (THB) and dollars: 24K, 22K, 21K and 18K per gram, per baht weight (15.244 g) and per ounce, updated every 5 minutes.',
      ar: { n: 'تايلاند', in: 'في تايلاند', cur: 'باهت', curS: 'باهت', cities: '' },
      en: { n: 'Thailand', adj: 'Thai', cur: 'Thai baht', cities: 'Bangkok, Chiang Mai, Phuket and Hat Yai' },
      noteAr: '',
      noteEn: 'The Thai baht floats freely, so the gold price in THB moves with both the global price and the exchange rate. Thailand has its own gold standard: jewellery and bars are 96.5% pure (roughly 23K) and are traded per baht of weight, where one baht of gold equals 15.244 grams. The Gold Traders Association announces reference prices several times a day in Bangkok, and those rates track the international price shown here plus a small local premium.',
      faqEn: [
        ['What is the gold price in Thailand today?', 'The live price per gram in Thai baht is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate without the local premium.'],
        ['How much is one baht of gold in grams?', 'In Thailand, gold is traded per baht of weight: one baht of gold equals 15.244 grams. A one-baht 24K gold bar is worth about 15.244 times the per-gram price shown on this page.'],
        ['What purity is Thai gold?', 'Standard Thai gold, both bars and jewellery, is 96.5% pure, which is roughly 23 karat. International-standard 24K and 18K pieces are also sold.']
      ] },
    vietnam: { code: 'VND', d: 0, vat: 0, peg: '', pegEn: 'managed against the US dollar, so its rate moves daily', fx: true, enOnly: true, un: ['1 tael (37.5 g)', 37.5],
      tEn: 'Gold Price in Vietnam Today (VND) — Per Tael & Gram',
      dEn: 'Live gold price in Vietnam today in dong (VND) and dollars: 24K, 22K, 21K and 18K per gram, per tael (lượng, 37.5 g) and per ounce, updated every 5 minutes.',
      ar: { n: 'فيتنام', in: 'في فيتنام', cur: 'دونغ', curS: 'دونغ', cities: '' },
      en: { n: 'Vietnam', adj: 'Vietnamese', cur: 'Vietnamese dong', cities: 'Hanoi, Ho Chi Minh City, Da Nang and Hai Phong' },
      noteAr: '',
      noteEn: 'The Vietnamese dong is managed against the US dollar, so the gold price in VND moves with both the global price and the exchange rate. Vietnam has one of the strongest gold-saving cultures in Asia: 24K SJC bars are the national standard and are traded per tael (luong), where one tael equals 37.5 grams. SJC bars often carry a large premium over the international rate shown here because of tight supply controls, while jewellery rings (nhan) trade closer to the international price.',
      faqEn: [
        ['What is the gold price in Vietnam today?', 'The live price per gram in Vietnamese dong is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate without the local premium.'],
        ['How much is one tael of gold in grams?', 'In Vietnam, gold is traded per tael (luong or cay): one tael equals 37.5 grams. A one-tael 24K bar is worth about 37.5 times the per-gram price shown on this page.'],
        ['What is an SJC gold bar?', 'A 24K bar produced by the state-licensed Saigon Jewelry Company, the standard gold investment product in Vietnam. SJC bars often trade at a significant premium over the international rate because of supply controls.']
      ] },
    singapore: { code: 'SGD', d: 2, vat: 0, peg: '', pegEn: 'managed against a trade-weighted basket of currencies, so its rate moves daily', fx: true, enOnly: true,
      ar: { n: 'سنغافورة', in: 'في سنغافورة', cur: 'دولار', curS: 'دولار', cities: '' },
      en: { n: 'Singapore', adj: 'Singaporean', cur: 'Singapore dollar', cities: 'Little India, Chinatown and the city centre' },
      noteAr: '',
      noteEn: 'The Singapore dollar is managed against a trade-weighted basket of currencies, so the gold price in SGD moves with both the global price and the exchange rate. Singapore is a major gold-trading hub: qualifying investment precious metals are exempt from GST. Gold bars need at least 99.5% purity plus recognised refiner/marking, international tradability and non-decorative form; eligible coins must meet the prescribed-list and legal-tender criteria. Jewellery does not qualify for this IPM exemption. Check the supplier’s tax invoice and current IRAS rules. Jewellery in Singapore is most often 22K (916) or 18K.',
      faqEn: [
        ['What is the gold price in Singapore today?', 'The live price per gram in Singapore dollars is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without GST or making charges.'],
        ['Is gold taxed in Singapore?', 'Only qualifying investment precious metals receive the IPM exemption. Gold purity of 99.5% alone is not sufficient: form, accreditation/marking and tradability criteria also apply, with prescribed criteria for coins. Jewellery is not IPM.'],
        ['Which karat is most common in Singapore?', 'Most jewellery in Singapore is 22K (marked 916) or 18K, while 24K is bought as bars and coins for investment.']
      ] },
    srilanka: { code: 'LKR', d: 0, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      tEn: 'Gold Rate in Sri Lanka Today (LKR) — 22K & 24K',
      dEn: 'Live gold rate in Sri Lanka today in rupees (LKR) and dollars: 22K and 24K gold price per gram, 10 grams, tola and ounce, updated every 5 minutes.',
      ar: { n: 'سريلانكا', in: 'في سريلانكا', cur: 'روبية', curS: 'روبية', cities: '' },
      en: { n: 'Sri Lanka', adj: 'Sri Lankan', cur: 'Sri Lankan rupee', cities: 'Colombo, Kandy, Galle and Jaffna' },
      noteAr: '',
      noteEn: 'The Sri Lankan rupee floats freely, so the gold price in LKR moves with both the global price and the exchange rate. Jewellery in Sri Lanka is traditionally 22K, and gold is also widely used for pawning and savings. Local dealers quote daily rates that follow the international price shown here, then add making charges per piece, and import duties can put a premium on the local market.',
      faqEn: [
        ['What is the gold price in Sri Lanka today?', 'The live price per gram in Sri Lankan rupees is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate without making charges.'],
        ['Which karat is most common in Sri Lanka?', 'Most traditional jewellery in Sri Lanka is 22K, while 24K is bought as coins and bars for saving.'],
        ['Why do Sri Lankan shop prices differ from this page?', 'The rate here is calculated live from the global spot price and the LKR exchange rate. Shops add making charges, and import duties and local demand can add a premium.']
      ] },
    germany: { code: 'EUR', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'ألمانيا', in: 'في ألمانيا', cur: 'يورو', curS: 'يورو', cities: '' },
      en: { n: 'Germany', adj: 'German', cur: 'euro', cities: 'Berlin, Munich, Hamburg and Frankfurt' },
      noteAr: '',
      noteEn: 'The euro floats freely, so the gold price in EUR moves with both the global price and the exchange rate. Germany is one of the largest private gold markets in the world: investment gold (qualifying bars and coins) is exempt from VAT across the EU, while jewellery carries 19% VAT in the shop price. German jewellery is most often 8K (333), 14K (585) or 18K (750), while 24K is bought as bars and coins for saving.',
      faqEn: [
        ['What is the gold price in Germany today?', 'The live price per gram in euros is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without VAT or dealer premiums.'],
        ['Is gold taxed in Germany?', 'Investment gold (qualifying bars and coins) is exempt from VAT in Germany and across the EU. Gold jewellery carries 19% VAT, included in the shop price.'],
        ['Which karat is most common in Germany?', 'German jewellery is most often 8K (333), 14K (585) or 18K (750). 24K is bought mainly as bars and coins for investment.']
      ] },
    japan: { code: 'JPY', d: 0, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'اليابان', in: 'في اليابان', cur: 'ين', curS: 'ين', cities: '' },
      en: { n: 'Japan', adj: 'Japanese', cur: 'Japanese yen', cities: 'Tokyo, Osaka, Nagoya and Fukuoka' },
      noteAr: '',
      noteEn: 'The Japanese yen floats freely, so the gold price in JPY moves with both the global price and the exchange rate. Japan is unusual among major markets in charging 10% consumption tax on gold bars as well as jewellery, so dealer prices include the tax on top of the rate shown here, while the tax is recovered on resale through dealers. Retailers such as Tanaka quote daily per-gram rates that follow the international price, and 18K is the most common jewellery karat.',
      faqEn: [
        ['What is the gold price in Japan today?', 'The live price per gram in Japanese yen is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate before consumption tax.'],
        ['Is gold taxed in Japan?', 'Yes. Japan charges 10% consumption tax on gold purchases, including bars, which dealer prices include on top of the international rate shown here.'],
        ['Which karat is most common in Japan?', 'Most jewellery in Japan is 18K (marked K18), while 24K is bought as bars and coins for saving.']
      ] },
    switzerland: { code: 'CHF', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'سويسرا', in: 'في سويسرا', cur: 'فرنك', curS: 'فرنك', cities: '' },
      en: { n: 'Switzerland', adj: 'Swiss', cur: 'Swiss franc', cities: 'Zurich, Geneva, Basel and Bern' },
      noteAr: '',
      noteEn: 'The Swiss franc floats freely, so the gold price in CHF moves with both the global price and the exchange rate. Switzerland is the refining capital of the world: most of the world\'s gold bars are refined there, and investment gold is exempt from Swiss VAT, while jewellery carries 8.1% VAT in the shop price. Swiss buyers favour 24K bars from refiners such as PAMP and Valcambi, and jewellery is most often 18K.',
      faqEn: [
        ['What is the gold price in Switzerland today?', 'The live price per gram in Swiss francs is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without VAT or dealer premiums.'],
        ['Is gold taxed in Switzerland?', 'Investment gold is exempt from VAT in Switzerland. Gold jewellery carries 8.1% VAT, included in the shop price.'],
        ['Why is Switzerland important for gold?', 'Switzerland refines the majority of the world\'s gold bars through refiners such as PAMP, Valcambi and Argor-Heraeus, and Zurich is one of the historic centres of the global gold trade.']
      ] },
    nigeria: { code: 'NGN', d: 0, vat: 0, peg: '', pegEn: 'managed against the US dollar, so its rate moves daily', fx: true, enOnly: true,
      ar: { n: 'نيجيريا', in: 'في نيجيريا', cur: 'نايرا', curS: 'نايرا', cities: '' },
      en: { n: 'Nigeria', adj: 'Nigerian', cur: 'Nigerian naira', cities: 'Lagos, Abuja, Kano and Port Harcourt' },
      noteAr: '',
      noteEn: 'The Nigerian naira is managed against the US dollar, so the gold price in NGN moves with both the global price and the exchange rate, and the gap between official and market exchange rates can widen local prices. Jewellery in Nigeria is most often 18K or 22K for weddings and celebrations, and local dealers quote per gram with wide spreads over the international rate shown here.',
      faqEn: [
        ['What is the gold price in Nigeria today?', 'The live price per gram in Nigerian naira is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate without dealer spreads.'],
        ['Which karat is most common in Nigeria?', 'Most jewellery in Nigeria is 18K or 22K, bought for weddings and celebrations, while 24K is bought as coins and bars by savers.'],
        ['Why do Nigerian dealer prices differ from this page?', 'The rate here is calculated from the global spot price and the market exchange rate. Dealers add wide spreads, making charges, and sometimes price off a different dollar rate.']
      ] },
    ghana: { code: 'GHS', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'غانا', in: 'في غانا', cur: 'سيدي', curS: 'سيدي', cities: '' },
      en: { n: 'Ghana', adj: 'Ghanaian', cur: 'Ghanaian cedi', cities: 'Accra, Kumasi, Takoradi and Tema' },
      noteAr: '',
      noteEn: 'The Ghanaian cedi floats freely, so the gold price in GHS moves with both the global price and the exchange rate. Ghana is the Gold Coast: one of the largest gold producers in Africa, with a deep gold culture from the Ashanti kingdom to modern mining. Jewellery is most often 22K or 18K, and licensed gold dealers in Accra and Kumasi quote daily rates that follow the international price shown here.',
      faqEn: [
        ['What is the gold price in Ghana today?', 'The live price per gram in Ghanaian cedis is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate without dealer margins.'],
        ['Why is Ghana called the Gold Coast?', 'Ghana was named the Gold Coast by European traders for its rich gold deposits, and it remains one of the largest gold producers in Africa, with mining centred on the Ashanti region.'],
        ['Which karat is most common in Ghana?', 'Most traditional jewellery in Ghana is 22K or 18K, while 24K is held as bars and coins.']
      ] },
    kenya: { code: 'KES', d: 0, vat: 0, peg: '', pegEn: 'managed against the US dollar, so its rate moves daily', fx: true, enOnly: true,
      ar: { n: 'كينيا', in: 'في كينيا', cur: 'شلن', curS: 'شلن', cities: '' },
      en: { n: 'Kenya', adj: 'Kenyan', cur: 'Kenyan shilling', cities: 'Nairobi, Mombasa, Kisumu and Nakuru' },
      noteAr: '',
      noteEn: 'The Kenyan shilling is managed against the US dollar, so the gold price in KES moves with both the global price and the exchange rate. Kenya is East Africa\'s trading hub, and gold dealing is licensed and concentrated in Nairobi. Jewellery is most often 18K or 22K, and dealers quote per gram over the international rate shown here with a local premium.',
      faqEn: [
        ['What is the gold price in Kenya today?', 'The live price per gram in Kenyan shillings is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate without dealer premiums.'],
        ['Which karat is most common in Kenya?', 'Most jewellery in Kenya is 18K or 22K, while 24K is bought as coins and small bars for saving.'],
        ['Where is gold traded in Kenya?', 'Licensed gold dealing is concentrated in Nairobi, with prices that track the international rate plus a local premium.']
      ] },
    mexico: { code: 'MXN', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'المكسيك', in: 'في المكسيك', cur: 'بيسو', curS: 'بيسو', cities: '' },
      en: { n: 'Mexico', adj: 'Mexican', cur: 'Mexican peso', cities: 'Mexico City, Guadalajara, Monterrey and Cancun' },
      noteAr: '',
      noteEn: 'The Mexican peso floats freely, so the gold price in MXN moves with both the global price and the exchange rate. Mexico has a proud coinage tradition: the Centenario, first minted in 1921, contains 37.5 grams of pure gold and remains the classic Mexican investment coin. Everyday jewellery is most often 14K or 10K, and investment gold coins are exempt from VAT in Mexico, while jewellery is taxed at 16%.',
      faqEn: [
        ['What is the gold price in Mexico today?', 'The live price per gram in Mexican pesos is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate without dealer premiums.'],
        ['What is a Centenario coin?', 'Mexico\'s classic gold coin, first minted in 1921, containing 37.5 grams of pure gold. Its value tracks the gold price shown on this page plus a collector and dealer premium.'],
        ['Which karat is most common in Mexico?', 'Most everyday jewellery in Mexico is 14K or 10K, while the Centenario and Libertad coins are bought for investment.']
      ] },
    brazil: { code: 'BRL', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'البرازيل', in: 'في البرازيل', cur: 'ريال', curS: 'ريال', cities: '' },
      en: { n: 'Brazil', adj: 'Brazilian', cur: 'Brazilian real', cities: 'Sao Paulo, Rio de Janeiro, Belo Horizonte and Brasilia' },
      noteAr: '',
      noteEn: 'The Brazilian real floats freely, so the gold price in BRL moves with both the global price and the exchange rate. Brazil is one of the largest jewellery markets in the world, and its standard is unmistakable: ouro 18K (750) dominates Brazilian jewellery, while investment gold is traded on the B3 exchange and through banks in bars of certified purity.',
      faqEn: [
        ['What is the gold price in Brazil today?', 'The live price per gram in Brazilian reais is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate without dealer premiums.'],
        ['Which karat is most common in Brazil?', '18K gold (marked 750) is the Brazilian standard for jewellery, dominating the market. 24K is traded as bars on the B3 exchange and through banks.'],
        ['Why do Brazilian shop prices differ from this page?', 'The rate here is calculated live from the global spot price and the BRL exchange rate. Shops add making charges and their margin per piece.']
      ] },
    china: { code: 'CNY', d: 2, vat: 0, peg: '', pegEn: 'managed against the US dollar, so its rate moves daily', fx: true, enOnly: true,
      ar: { n: 'الصين', in: 'في الصين', cur: 'يوان', curS: 'يوان', cities: '' },
      en: { n: 'China', adj: 'Chinese', cur: 'Chinese yuan', cities: 'Shanghai, Beijing, Shenzhen and Guangzhou' },
      noteAr: '',
      noteEn: 'The Chinese yuan is managed against the US dollar, so the gold price in CNY moves with both the global price and the exchange rate. China is the world\'s largest gold consumer and producer: 24K gold (marked 999 or 9999) is the national standard for both saving and traditional jewellery, and prices are anchored by the Shanghai Gold Exchange, which can trade at a premium over the international rate shown here.',
      faqEn: [
        ['What is the gold price in China today?', 'The live price per gram in Chinese yuan is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw international rate; Shanghai Gold Exchange prices can carry a premium.'],
        ['Which karat is most common in China?', '24K gold (marked 999 or 9999) is the Chinese standard for both saving and traditional jewellery, unlike most Western markets.'],
        ['Why do Chinese retail prices differ from this page?', 'Chinese retail gold follows the Shanghai Gold Exchange, which can trade at a premium over the international rate, and brands add making charges per gram.']
      ] },
    france: { code: 'EUR', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'فرنسا', in: 'في فرنسا', cur: 'يورو', curS: 'يورو', cities: '' },
      en: { n: 'France', adj: 'French', cur: 'euro', cities: 'Paris, Marseille, Lyon and Toulouse' },
      noteAr: '',
      noteEn: 'The euro floats freely, so the gold price in EUR moves with both the global price and the exchange rate. France has a deep gold tradition: the Napoleon 20-franc coin is still traded daily by savers, investment gold is exempt from VAT, and jewellery is almost exclusively 18K (750), guaranteed by the eagle-head hallmark, with 20% VAT included in the shop price.',
      faqEn: [
        ['What is the gold price in France today?', 'The live price per gram in euros is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without VAT or dealer premiums.'],
        ['Is gold taxed in France?', 'Investment gold (qualifying bars and coins) is exempt from VAT in France, as across the EU. Gold jewellery carries 20% VAT, included in the shop price.'],
        ['Which karat is most common in France?', 'French jewellery is almost exclusively 18K (750), guaranteed by the eagle-head hallmark. The Napoleon 20-franc coin remains the classic French investment gold piece.']
      ] },
    italy: { code: 'EUR', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'إيطاليا', in: 'في إيطاليا', cur: 'يورو', curS: 'يورو', cities: '' },
      en: { n: 'Italy', adj: 'Italian', cur: 'euro', cities: 'Milan, Rome, Florence and Naples' },
      noteAr: '',
      noteEn: 'The euro floats freely, so the gold price in EUR moves with both the global price and the exchange rate. Italy is one of the great goldsmith nations: the districts of Vicenza, Arezzo and Valenza produce jewellery exported worldwide, and the Italian standard is 18K (750), marked with the star-and-number maker hallmark. Investment gold is exempt from VAT in Italy, while jewellery carries 22% VAT in the shop price.',
      faqEn: [
        ['What is the gold price in Italy today?', 'The live price per gram in euros is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without VAT or making charges.'],
        ['Is gold taxed in Italy?', 'Investment gold (qualifying bars and coins) is exempt from VAT in Italy, as across the EU. Gold jewellery carries 22% VAT, included in the shop price.'],
        ['Which karat is most common in Italy?', 'The Italian jewellery standard is 18K (750), marked with the star-and-number maker hallmark. Vicenza, Arezzo and Valenza are the historic goldsmith districts.']
      ] },
    spain: { code: 'EUR', d: 2, vat: 0, peg: '', pegEn: 'not pegged to the US dollar; its exchange rate moves daily', fx: true, enOnly: true,
      ar: { n: 'إسبانيا', in: 'في إسبانيا', cur: 'يورو', curS: 'يورو', cities: '' },
      en: { n: 'Spain', adj: 'Spanish', cur: 'euro', cities: 'Madrid, Barcelona, Valencia and Seville' },
      noteAr: '',
      noteEn: 'The euro floats freely, so the gold price in EUR moves with both the global price and the exchange rate. In Spain, jewellery is traditionally oro de ley, 18K (750), stamped with an official hallmark, while investment gold in qualifying bars and coins is exempt from VAT and jewellery carries 21% VAT in the shop price.',
      faqEn: [
        ['What is the gold price in Spain today?', 'The live price per gram in euros is shown at the top of this page for 24K, 22K, 21K and 18K, refreshing about every 5 minutes. It is the raw gold rate without VAT or making charges.'],
        ['Is gold taxed in Spain?', 'Investment gold (qualifying bars and coins) is exempt from VAT in Spain, as across the EU. Gold jewellery carries 21% VAT, included in the shop price.'],
        ['Which karat is most common in Spain?', 'Spanish jewellery is traditionally oro de ley, 18K (750), stamped with an official hallmark. 24K is bought as bars and coins for investment.']
      ] },
    lebanon: { code: 'LBP', d: 0, vat: 0, peg: 'مربوط رسمياً بالدولار، مع سعر سوق يختلف كثيراً عن السعر الرسمي', pegEn: 'officially pegged to the US dollar, with a market rate that can differ widely', fx: true,
      ar: { n: 'لبنان', in: 'في لبنان', cur: 'ليرة', curS: 'ليرة', cities: 'بيروت وطرابلس وصيدا وزحلة' },
      en: { n: 'Lebanon', adj: 'Lebanese', cur: 'Lebanese pound', cities: 'Beirut, Tripoli, Sidon and Zahle' },
      noteAr: 'يعتمد هذا الموقع سعر الصرف اليومي للسوق، وقد يختلف كثيراً عن السعر الرسمي للمصرف المركزي، لذلك يُفضَّل متابعة السعر بالدولار أيضاً. كثير من الصاغة في لبنان يُسعِّرون بالدولار الأمريكي مباشرة. عيار 18 و21 هما الأكثر انتشاراً في المجوهرات اللبنانية، وتُضاف المصنعية على كل قطعة.',
      noteEn: 'This page uses the daily market exchange rate, which can differ widely from the official central bank rate, so following the US dollar price alongside is recommended. Many Lebanese jewellers price directly in US dollars. 18K and 21K are the most common jewellery karats in Lebanon, and making charges are added per piece.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 21 في لبنان اليوم؟', 'يظهر سعر غرام عيار 21 بالليرة محدَّثاً في أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية.'],
        ['لماذا يُسعِّر الصاغة في لبنان بالدولار؟', 'بسبب فرق سعر الصرف الرسمي عن سعر السوق، يعتمد كثير من الصاغة التسعير بالدولار مباشرة. يظهر السعر بالدولار بجانب السعر بالليرة في أعلى الصفحة.'],
        ['ما العيار الأكثر انتشاراً في لبنان؟', 'عيار 18 و21 هما الأكثر انتشاراً في المجوهرات اللبنانية، بينما يُقتنى عيار 24 كسبائك وعملات للادخار.']
      ],
      faqEn: [
        ['What is the 21K gold price in Lebanon today?', 'The live 21K price per gram in Lebanese pounds is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges.'],
        ['Why do Lebanese jewellers price in dollars?', 'Because the market exchange rate differs widely from the official rate, many jewellers price directly in US dollars. The dollar price is shown next to the pound price at the top of this page.'],
        ['Which karat is most common in Lebanon?', '18K and 21K are the most common jewellery karats in Lebanon, while 24K is bought as bars and coins for saving.']
      ] },
    tunisia: { code: 'TND', d: 2, vat: 0, peg: 'مُدار بسعر مرن مقابل الدولار', pegEn: 'managed against the US dollar, so its rate moves daily', fx: true, noK21: true,
      ar: { n: 'تونس', in: 'في تونس', cur: 'دينار', curS: 'دينار', cities: 'تونس العاصمة وصفاقس وسوسة والقيروان' },
      en: { n: 'Tunisia', adj: 'Tunisian', cur: 'Tunisian dinar', cities: 'Tunis, Sfax, Sousse and Kairouan' },
      noteAr: 'الدينار التونسي يُدار بسعر مرن مقابل الدولار، لذلك يتحرك سعر الذهب بالدينار مع السعر العالمي وسعر الصرف معاً. عيار 18 هو الأكثر انتشاراً في المجوهرات التونسية، وتُباع السبائك الصغيرة والعملات للادخار، وتُضاف المصنعية على كل قطعة.',
      noteEn: 'The Tunisian dinar is managed against the US dollar, so the gold price in TND moves with both the global price and the exchange rate. 18K is the most common karat in Tunisian jewellery, while small bars and coins are bought for saving, and making charges are added per piece.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 18 في تونس اليوم؟', 'يظهر سعر غرام عيار 18 بالدينار في جدول الأسعار أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية.'],
        ['ما العيار الأكثر انتشاراً في تونس؟', 'عيار 18 هو الأكثر انتشاراً في المجوهرات التونسية، بينما تُقتنى السبائك الصغيرة والعملات للادخار.'],
        ['لماذا يختلف سعر المحل عن هذه الصفحة؟', 'السعر هنا خام محسوب من السعر العالمي وسعر صرف الدينار، والمحلات تضيف المصنعية وهامش الربح على كل قطعة.']
      ],
      faqEn: [
        ['What is the 18K gold price in Tunisia today?', 'The live 18K price per gram in Tunisian dinars is shown in the price table above and refreshes about every 5 minutes. It is the raw gold price without making charges.'],
        ['Which karat is most common in Tunisia?', '18K is the most common karat in Tunisian jewellery, while small bars and coins are bought for saving.'],
        ['Why do Tunisian shop prices differ from this page?', 'The rate here is the raw gold value calculated from the global price and the dinar exchange rate. Shops add making charges and their margin per piece.']
      ] },
    libya: { code: 'LYD', d: 2, vat: 0, peg: 'مُدار بسعر شبه ثابت مقابل الدولار، مع سعر سوق موازٍ قد يختلف', pegEn: 'managed at a near-fixed rate against the US dollar, with a parallel market rate that can differ', fx: true,
      ar: { n: 'ليبيا', in: 'في ليبيا', cur: 'دينار', curS: 'دينار', cities: 'طرابلس وبنغازي ومصراتة وسبها' },
      en: { n: 'Libya', adj: 'Libyan', cur: 'Libyan dinar', cities: 'Tripoli, Benghazi, Misrata and Sabha' },
      noteAr: 'الدينار الليبي مُدار بسعر شبه ثابت مقابل الدولار مع سعر سوق موازٍ قد يختلف، ويعتمد هذا الموقع سعر الصرف اليومي المتاح. عيار 21 و18 هما الأكثر انتشاراً في المجوهرات الليبية، وتُضاف المصنعية على كل قطعة.',
      noteEn: 'The Libyan dinar is managed at a near-fixed rate against the US dollar with a parallel market rate that can differ, and this page uses the daily available exchange rate. 21K and 18K are the most common jewellery karats in Libya, and making charges are added per piece.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 21 في ليبيا اليوم؟', 'يظهر سعر غرام عيار 21 بالدينار محدَّثاً في أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية.'],
        ['ما العيار الأكثر انتشاراً في ليبيا؟', 'عيار 21 و18 هما الأكثر انتشاراً في المجوهرات الليبية، بينما يُقتنى عيار 24 كسبائك وعملات للادخار.'],
        ['لماذا يختلف سعر المحل عن هذه الصفحة؟', 'السعر هنا خام محسوب من السعر العالمي وسعر صرف الدينار، والمحلات تضيف المصنعية وهامش الربح على كل قطعة.']
      ],
      faqEn: [
        ['What is the 21K gold price in Libya today?', 'The live 21K price per gram in Libyan dinars is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges.'],
        ['Which karat is most common in Libya?', '21K and 18K are the most common jewellery karats in Libya, while 24K is bought as bars and coins for saving.'],
        ['Why do Libyan shop prices differ from this page?', 'The rate here is the raw gold value calculated from the global price and the dinar exchange rate. Shops add making charges and their margin per piece.']
      ] },
    yemen: { code: 'YER', d: 0, vat: 0, peg: 'مُدار مقابل الدولار، وتتعدد أسعار الصرف بين المناطق', pegEn: 'managed against the US dollar, with exchange rates differing between regions', fx: true,
      ar: { n: 'اليمن', in: 'في اليمن', cur: 'ريال', curS: 'ريال', cities: 'صنعاء وعدن وتعز والمكلا' },
      en: { n: 'Yemen', adj: 'Yemeni', cur: 'Yemeni rial', cities: 'Sanaa, Aden, Taiz and Mukalla' },
      noteAr: 'يتعدد سعر صرف الريال اليمني بين المناطق، ويعتمد هذا الموقع سعر الصرف اليومي المتاح، لذلك قد يختلف السعر الفعلي في السوق المحلية عن المعروض هنا. عيار 21 هو الأكثر انتشاراً في المجوهرات اليمنية، وتُضاف المصنعية على كل قطعة.',
      noteEn: 'The Yemeni rial trades at different rates in different regions, and this page uses the daily available exchange rate, so the actual local market price may differ from what is shown here. 21K is the most common jewellery karat in Yemen, and making charges are added per piece.',
      faqAr: [
        ['كم سعر غرام الذهب عيار 21 في اليمن اليوم؟', 'يظهر سعر غرام عيار 21 بالريال محدَّثاً في أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية.'],
        ['لماذا يختلف سعر الذهب بين المناطق في اليمن؟', 'لأن سعر صرف الريال يختلف بين المناطق، ويُحسب السعر هنا بسعر الصرف اليومي المتاح، فقد تجد فرقاً عن السوق المحلية في منطقتك.'],
        ['ما العيار الأكثر انتشاراً في اليمن؟', 'عيار 21 هو الأكثر انتشاراً في المجوهرات اليمنية، ويُستخدم عيار 18 في بعض التصاميم الحديثة.']
      ],
      faqEn: [
        ['What is the 21K gold price in Yemen today?', 'The live 21K price per gram in Yemeni rials is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges.'],
        ['Why does the gold price differ between regions in Yemen?', 'The rial trades at different rates in different regions. This page uses the daily available rate, so your local market price may differ.'],
        ['Which karat is most common in Yemen?', '21K is the most common jewellery karat in Yemen, with 18K used in some modern designs.']
      ] }
  };
  const COUNTRY_PAGES = { ...GCC, ...OTHERS };
  // مقال إنجليزي مخصص لكل سوق كبير — يظهر في صفحة الدولة الإنجليزية
  const CTRY_ART = { india: 'why-gold-rises-india', usa: 'why-gold-rises-usa', uk: 'gold-karats-uk', canada: 'why-gold-rises-canada', australia: 'why-gold-rises-australia', philippines: '21k-vs-24k-gold-philippines',
    pakistan: 'why-gold-rises-pakistan', bangladesh: 'why-gold-rises-bangladesh', nepal: 'why-gold-rises-nepal', srilanka: 'why-gold-rises-srilanka', turkey: 'why-gold-rises-turkey', malaysia: 'emas-916-vs-999-malaysia',
    indonesia: 'why-gold-rises-indonesia', thailand: 'thai-gold-baht-purity-guide', vietnam: 'vietnam-gold-sjc-tael-guide', singapore: 'buying-gold-singapore-gst-free', japan: 'why-gold-rises-japan', china: 'gold-china-999-shanghai-premium',
    germany: 'buying-gold-germany-vat-free', france: 'gold-france-napoleon-18k', italy: 'gold-italy-18k-standard', spain: 'gold-spain-oro-18k', switzerland: 'buying-gold-switzerland-pamp', nigeria: 'why-gold-rises-nigeria',
    ghana: 'gold-ghana-prices-cedi', kenya: 'why-gold-rises-kenya', mexico: 'gold-mexico-centenario', brazil: 'gold-brazil-ouro-750', saudi: 'buying-gold-saudi-arabia', kuwait: 'buying-gold-kuwait', southafrica: 'gold-southafrica-krugerrand',
    qatar: 'buying-gold-qatar', oman: 'buying-gold-oman', bahrain: 'buying-gold-bahrain', egypt: 'why-gold-rises-egypt', iraq: 'gold-iraq-21k-mithqal', jordan: 'buying-gold-jordan',
    morocco: 'gold-morocco-18k', algeria: 'gold-algeria-18k', lebanon: 'gold-lebanon-dollar-pricing', tunisia: 'gold-tunisia-18k', libya: 'gold-libya-21k', yemen: 'gold-yemen-21k' };
  const ART_BY_SLUG = Object.fromEntries(ARTICLES_EN.map(a => [a.slug, a]));
  const AR_CTRY_ART = { egypt: 'gold-guide-egypt', saudi: 'gold-guide-saudi', kuwait: 'gold-guide-kuwait', qatar: 'gold-guide-qatar', oman: 'gold-guide-oman', bahrain: 'gold-guide-bahrain', iraq: 'gold-guide-iraq', jordan: 'gold-guide-jordan', lebanon: 'gold-guide-lebanon', morocco: 'gold-guide-morocco', algeria: 'gold-guide-algeria', tunisia: 'gold-guide-tunisia', libya: 'gold-guide-libya', yemen: 'gold-guide-yemen' };
  const ART_BY_SLUG_AR = Object.fromEntries(ARTICLES.map(a => [a.slug, a]));
  const GW = [1, 5, 10, 20, 50, 100];
  for (const [slug, c] of Object.entries(COUNTRY_PAGES)) {
    const cur = c.code.toLowerCase(), d = c.d;
    const TN = c.taxName || 'VAT';
    const opt = (o = {}) => ({ cur, d: o.d ?? d, ...o });
    const other = L => `<section class="card-section"><h2>${L === 'en' ? 'Gold prices in other countries' : 'سعر الذهب في دول أخرى'}</h2><div class="links-grid">
${[['', L === 'en' ? 'UAE' : 'الإمارات'], ...Object.entries(COUNTRY_PAGES).filter(([s, o]) => s !== slug && (L === 'en' || !o.enOnly)).map(([s, o]) => [s, o[L].n])].map(([s, n]) => `<a class="link-card" href="${url(L, s)}">${L === 'en' ? `Gold price in ${n}` : `سعر الذهب في ${n}`}</a>`).join('')}
${c.code !== 'USD' ? `<a class="link-card" href="${url(L, 'dollar-' + slug)}">${L === 'en' ? `Dollar rate in ${c.en.n}` : `سعر الدولار ${c.ar.in}`}</a>` : ''}
<a class="link-card" href="${url(L, 'gcc')}">${L === 'en' ? 'Compare Gulf gold prices' : 'مقارنة أسعار الذهب في الخليج'}</a>
<a class="link-card" href="${url(L, 'gold-calculator')}">${L === 'en' ? 'Gold calculator' : 'حاسبة الذهب'}<span>${c.code}</span></a></div></section>`;

    for (const L of c.enOnly ? ['en'] : ['ar', 'en']) {
      const en = L === 'en', x = c[L];
      const vatCol = c.vat ? `<th>${en ? `+ ${TN} ${c.vat}%` : `شامل الضريبة ${c.vat}%`}</th>` : '';
      out.push({ lang: L, slug, alt: !c.enOnly, usesFx: !!c.fx,
        crumbs: [[en ? `Gold price in ${x.n}` : `سعر الذهب ${x.in}`, url(L, slug)]],
        title: en ? (c.tEn || `Gold Price in ${x.n} Today (${c.code}) — 24K, 22K, 21K, 18K`) : `سعر الذهب اليوم ${x.in} بال${x.cur} | عيار 24 و22 و21 و18`,
        desc: en ? (c.dEn || `Live gold price in ${x.n} today in ${x.cur} (${c.code}) and US dollars: 24K, 22K, 21K and 18K per gram, tola and ounce, updated every 5 minutes${c.vat ? `, incl. ${c.vat}% ${TN}` : ''}.`)
          : `سعر الذهب اليوم ${x.in} بال${x.cur} والدولار، محدَّث كل 5 دقائق: سعر غرام عيار 24 و22 و21 و18، وسعر الأونصة والتولة${c.vat ? `، والسعر شامل ضريبة ${c.vat}%` : ''}.`,
        body: `${hero(en ? `Gold Price in ${x.n} Today` : `سعر الذهب اليوم ${x.in}`, en ? `Raw gold price per gram in ${x.cur} (${c.code}) and US dollars` : `سعر غرام الذهب الخام بال${x.cur} (${c.code}) والدولار`, L)}
${errBox}
<div class="karat-grid">${KS.map(k => { const link = true; const tag = `a class="karat-card" href="${url(L, `${slug}/gold-${k}k`)}"`;
  return `<${tag}><span class="karat-badge">${en ? k + 'K' : 'عيار ' + k}</span><div class="karat-label"><bdi>${K[k].purity}</bdi></div><div class="k-price">${P(k, 1, opt())}</div>${c.code === 'USD' ? '' : `<div class="k-usd">$${P(k, 1, { cur: 'usd' })}</div>`}<div class="k-unit">${en ? `${c.code} per gram` : `${x.curS} / غرام`}</div></${link ? 'a' : 'div'}>`; }).join('')}</div>
<div class="meta-row">
<span>${en ? 'Updated' : 'آخر تحديث'}: <strong>${updated(L)}</strong></span>
<span>${en ? 'Ounce' : 'الأونصة'}: <strong>${P(24, ctx.TROY, opt())} ${c.code}</strong>${c.code === 'USD' ? '' : ` · <strong>$${P(24, ctx.TROY, { cur: 'usd' })}</strong>`}</span>
${chg}<button class="btn-sm" id="refresh" type="button">🔄 ${en ? 'Refresh' : 'تحديث'}</button></div>
${AD}
<section class="card-section"><h2>${en ? `Gold price table in ${x.n} today` : `جدول أسعار الذهب ${x.in} اليوم`}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Karat' : 'العيار'}</th><th>${en ? `1 gram (${c.code})` : `الغرام (${x.curS})`}</th>${vatCol}<th>${en ? `10 grams (${c.code})` : `10 غرام (${x.curS})`}</th><th>${c.un ? `${c.un[0]} (${c.code})` : en ? `1 tola (${c.code})` : `التولة (${x.curS})`}</th><th>${en ? `1 ounce (${c.code})` : `الأونصة (${x.curS})`}</th></tr></thead><tbody>
${KS.map(k => `<tr><td><strong>${en ? k + 'K' : 'عيار ' + k}</strong> <span class="sub"><bdi>${K[k].purity}</bdi></span></td><td class="n">${P(k, 1, opt())}</td>${c.vat ? `<td class="n">${P(k, 1 + c.vat / 100, opt())}</td>` : ''}<td class="n">${P(k, 10, opt())}</td><td class="n">${P(k, c.un ? c.un[1] : TOLA, opt())}</td><td class="n">${P(k, ctx.TROY, opt())}</td></tr>`).join('')}
</tbody></table></div><p class="note">${en ? `Raw gold price without making charges${c.vat ? `; the VAT column adds ${c.vat}% to the gold value only` : ''}. ${c.un ? c.un[0] : '1 tola = 11.664 g'} · 1 ounce = 31.1035 g.` : `سعر الذهب الخام بدون مصنعية${c.vat ? `، وعمود الضريبة يضيف ${c.vat}% على قيمة الذهب فقط` : ''}. التولة = 11.664 غرام · الأونصة = 31.1035 غرام.`}</p></section>
<section class="card-section"><h2>${en ? `Gold price by weight in ${x.n} (21K and 24K)` : `سعر الذهب حسب الوزن ${x.in} (عيار 21 و24)`}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Weight' : 'الوزن'}</th><th>${en ? '21K' : 'عيار 21'}</th><th>${en ? '24K' : 'عيار 24'}</th></tr></thead><tbody>
${GW.map(w => `<tr><td>${en ? w + ' g' : w + ' غرام'}</td><td class="n">${P(21, w, opt())}</td><td class="n">${P(24, w, opt())}</td></tr>`).join('')}
</tbody></table></div></section>
<section class="card-section"><h2>${en ? `About the gold price in ${x.n}` : `عن سعر الذهب ${x.in}`}</h2><div class="prose">
${en ? `<p>The gold price in ${x.n} follows the global spot price of gold in US dollars per ounce. The ${x.cur} is ${c.pegEn}, so the local price is calculated as: <strong>(${c.code === 'USD' ? 'ounce price in USD ÷ 31.1035' : `ounce price in USD × USD/${c.code} rate ÷ 31.1035`}) × karat purity</strong>.</p><p>${c.noteEn}</p><p>Gold shops in ${x.cities} usually quote a daily rate per karat that follows the global price, then add making charges per piece${c.vat ? ` and ${c.vat}% ${TN}` : ''}. Use the <a href="/en/gold-calculator/">gold calculator</a> and choose ${c.code} to see the final price.</p>`
          : `<p>يتبع سعر الذهب ${x.in} السعر العالمي لأونصة الذهب بالدولار. وال${x.cur} ${c.peg}، لذلك يُحسب السعر المحلي هكذا: <strong>(سعر الأونصة بالدولار × سعر صرف الدولار بال${x.cur} ÷ 31.1035) × نسبة العيار</strong>.</p><p>${c.noteAr}</p><p>تُعلن محلات الذهب في ${x.cities} سعراً يومياً لكل عيار يتبع السعر العالمي، ثم تُضاف المصنعية حسب القطعة${c.vat ? ` وضريبة القيمة المضافة ${c.vat}%` : ''}. استخدم <a href="/gold-calculator/">حاسبة الذهب</a> واختر ${x.cur} لمعرفة السعر النهائي.</p>`}</div></section>
${en && ART_BY_SLUG[CTRY_ART[slug]] ? `<section class="card-section"><h2>Gold guide for ${x.n}</h2><div class="links-grid"><a class="link-card" href="/en/articles/${CTRY_ART[slug]}/">${ART_BY_SLUG[CTRY_ART[slug]].h1}<span>${ART_BY_SLUG[CTRY_ART[slug]].teaser}</span></a></div></section>` : ''}
${!en && ART_BY_SLUG_AR[AR_CTRY_ART[slug]] ? `<section class="card-section"><h2>دليل الذهب في ${x.n}</h2><div class="links-grid"><a class="link-card" href="/articles/${AR_CTRY_ART[slug]}/">${ART_BY_SLUG_AR[AR_CTRY_ART[slug]].h1}<span>${ART_BY_SLUG_AR[AR_CTRY_ART[slug]].teaser}</span></a></div></section>` : ''}
${share(L, slug, en ? `Gold price in ${x.n} today` : `سعر الذهب اليوم ${x.in}`)}
${other(L)}`,
        faq: en ? (c.faqEn || [
          [`What is the 21K gold price in ${x.n} today?`, `The live 21K price per gram in ${x.cur} is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges${c.vat ? ' or VAT' : ''}.`],
          [`Is there VAT on gold in ${x.n}?`, c.vat ? `Yes. ${x.n} applies ${c.vat}% VAT on gold jewellery; investment gold is usually treated differently.` : `${x.n} does not currently apply VAT, so the shop price is the gold price plus making charges.`],
          [`Is gold cheaper in ${x.n} or in the UAE?`, `The raw gold price is practically the same across the Gulf because it follows the global price. Differences come from VAT, making charges and shop premiums.`]
        ]) : (c.faqAr || [
          [`كم سعر غرام الذهب عيار 21 ${x.in} اليوم؟`, `يظهر سعر غرام عيار 21 بال${x.cur} محدَّثاً في أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية${c.vat ? ' أو ضريبة' : ''}.`],
          [`هل توجد ضريبة على الذهب ${x.in}؟`, c.vat ? `نعم، تُطبَّق ضريبة القيمة المضافة بنسبة ${c.vat}% على المشغولات الذهبية ${x.in}، ويُعامل الذهب الاستثماري عادةً معاملة مختلفة.` : `لا تُطبَّق ضريبة القيمة المضافة ${x.in} حتى الآن، فيتكون سعر المحل من سعر الذهب والمصنعية.`],
          [`هل الذهب أرخص ${x.in} أم في الإمارات؟`, 'سعر الذهب الخام متقارب جداً في كل دول الخليج لأنه يتبع السعر العالمي، والفرق الحقيقي يكون في الضريبة والمصنعية وهامش المحل.']
        ]) });
    }

    // صفحات العيارات لكل دولة (عربي)
    if (!c.enOnly) for (const k of [24, 22, 21, 18]) {
      const x = c.ar;
      const rows = [...[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => [`${w} غرام`, w]), ['تولة (11.66 غ)', TOLA], ['أونصة (31.1 غ)', ctx.TROY]];
      out.push({ lang: 'ar', slug: `${slug}/gold-${k}k`, alt: true, usesFx: !!c.fx,
        crumbs: [[`سعر الذهب ${x.in}`, url('ar', slug)], [`عيار ${k}`, url('ar', `${slug}/gold-${k}k`)]],
        title: `سعر الذهب عيار ${k} اليوم ${x.in} بال${x.cur}`,
        desc: `سعر غرام الذهب عيار ${k} اليوم ${x.in} بال${x.cur} والدولار، محدَّث كل 5 دقائق، مع جدول الأسعار من 1 إلى 100 غرام والتولة والأونصة${c.vat ? ` والسعر شامل ضريبة ${c.vat}%` : ''}.`,
        body: `${hero(`سعر الذهب عيار ${k} اليوم ${x.in}`, `${K[k].ar.label} · نقاء <bdi>${K[k].purity}</bdi> · ختم ${K[k].mark}`, 'ar')}
${errBox}
<div class="big-price"><div class="u">سعر غرام عيار ${k} بال${x.cur}</div><div class="v">${P(k, 1, opt())} <span style="font-size:.45em">${c.code}</span></div><div class="s"><bdi>≈ $${P(k, 1, { cur: 'usd' })}</bdi>${c.vat ? ` · شامل الضريبة ${c.vat}%: <bdi>${P(k, 1 + c.vat / 100, opt())} ${c.code}</bdi>` : ''}</div>${chg}
<div class="note">آخر تحديث: ${updated('ar')} · <button class="btn-sm" id="refresh" type="button">🔄 تحديث</button></div></div>
${AD}
<section class="card-section"><h2>سعر الذهب عيار ${k} حسب الوزن ${x.in}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>الوزن</th><th>السعر (${x.curS})</th>${c.vat ? `<th>شامل الضريبة ${c.vat}%</th>` : ''}<th>السعر (دولار)</th></tr></thead><tbody>
${rows.map(([n, w]) => `<tr><td>${n}</td><td class="n">${P(k, w, opt())}</td>${c.vat ? `<td class="n">${P(k, w * (1 + c.vat / 100), opt())}</td>` : ''}<td class="n">$${P(k, w, { cur: 'usd' })}</td></tr>`).join('')}
</tbody></table></div><p class="note">سعر الذهب الخام بدون مصنعية. ${k === 24 ? 'أسعار السبائك عند التجار تكون أعلى قليلاً بسبب العلاوة.' : 'تُضاف المصنعية حسب القطعة والمحل.'}</p></section>
<section class="card-section"><h2>عن الذهب عيار ${k} ${x.in}</h2><div class="prose">
<p>${k === 21 ? `<strong>عيار 21</strong> هو الأكثر انتشاراً في المجوهرات الخليجية، ويحتوي على <strong>87.5%</strong> ذهب خالص ويُختم برقم <strong>875</strong>. يجمع بين نسبة ذهب عالية تحفظ القيمة وصلابة مناسبة للاستخدام اليومي${c.noK21 ? '، وهو الأشهر في مصر والعراق والخليج، بينما عيار 18 هو الغالب على المجوهرات ' + x.in + '.' : '، لذلك هو الخيار الأشهر في الشبكة والأطقم ' + x.in + '.'}`
          : k === 22 ? `<strong>عيار 22</strong> يحتوي على <strong>91.7%</strong> ذهب خالص ويُختم برقم <strong>916</strong>. وهو العيار المفضل في المجوهرات الهندية والأساور والقلائد، ويجمع بين لون قريب من الذهب الخالص وصلابة أفضل من عيار 24.`
          : k === 18 ? `<strong>عيار 18</strong> يحتوي على <strong>75%</strong> ذهب خالص ويُختم برقم <strong>750</strong>. يُستخدم كثيراً في مجوهرات الألماس والتصاميم الأوروبية، ويتوفر بألوان أصفر وأبيض وروز، وهو أصلب العيارات المتداولة.`
          : `<strong>عيار 24</strong> هو الذهب الخالص بنسبة <strong>99.9%</strong> ويُختم برقم <strong>999</strong>. يُستخدم أساساً في السبائك والعملات الذهبية للادخار والاستثمار، لأنه طري لا يناسب المجوهرات اليومية.`}</p>
<p>المعادلة: سعر غرام عيار ${k} = (سعر الأونصة بالدولار × سعر صرف الدولار بال${x.cur} ÷ 31.1035) × ${(k / 24).toFixed(3)}.</p>
<p>${c.noteAr}</p></div></section>
${share('ar', `${slug}/gold-${k}k`, `سعر الذهب عيار ${k} اليوم ${x.in}`)}
<section class="card-section"><h2>روابط مفيدة</h2><div class="links-grid">
<a class="link-card" href="${url('ar', slug)}">كل العيارات ${x.in}<span>24 و22 و21 و18</span></a>
${KS.filter(o => o !== k).map(o => `<a class="link-card" href="${url('ar', `${slug}/gold-${o}k`)}">سعر عيار ${o} ${x.in}</a>`).join('\n')}
<a class="link-card" href="/gold-calculator/">حاسبة الذهب<span>اختر ${x.cur}</span></a>
<a class="link-card" href="/zakat-calculator/">حاسبة زكاة الذهب</a>
<a class="link-card" href="/gcc/">مقارنة أسعار الخليج</a>
<a class="link-card" href="/gold-${k}k/">سعر عيار ${k} في الإمارات</a></div></section>`,
        faq: [
          [`كم سعر غرام الذهب عيار ${k} ${x.in} اليوم؟`, `يظهر سعر غرام عيار ${k} بال${x.cur} محدَّثاً في أعلى الصفحة ويُحدَّث كل 5 دقائق تقريباً، وهو سعر الذهب الخام بدون مصنعية${c.vat ? ' أو ضريبة' : ''}.`],
          [`كم نسبة الذهب في عيار ${k}؟`, `يحتوي عيار ${k} على ${K[k].purity} ذهب خالص ويحمل ختم ${K[k].mark}.`]
        ] });
    }
    // صفحات العيارات لكل دولة (إنجليزي)
    for (const k of [24, 22, 21, 18]) {
      const x = c.en, ko = K[k].en;
      const rows = [...[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => [`${w} g`, w]), [c.un ? c.un[0] : '1 tola (11.66 g)', c.un ? c.un[1] : TOLA], ['1 ounce (31.1 g)', ctx.TROY]];
      out.push({ lang: 'en', slug: `${slug}/gold-${k}k`, alt: !c.enOnly, usesFx: !!c.fx,
        crumbs: [[`Gold price in ${x.n}`, url('en', slug)], [`${k}K`, url('en', `${slug}/gold-${k}k`)]],
        title: `${k}K Gold Rate in ${x.n} Today (${c.code}) — Price per Gram`,
        desc: `Live ${k}K gold rate in ${x.n} today in ${x.cur} (${c.code}) and US dollars: price per gram, 10 grams, tola and ounce, updated every 5 minutes${c.vat ? `, including ${c.vat}% ${TN}` : ''}.`,
        body: `${hero(`${k}K Gold Rate in ${x.n} Today`, `${ko.label} · ${K[k].purity} purity · hallmark ${K[k].mark}`, 'en')}
${errBox}
<div class="big-price"><div class="u">${k}K — price per gram in ${x.cur}</div><div class="v">${P(k, 1, opt())} <span style="font-size:.45em">${c.code}</span></div>${c.code === 'USD' ? '' : `<div class="s"><bdi>≈ $${P(k, 1, { cur: 'usd' })} USD</bdi></div>`}
<div class="note">Updated: ${updated('en')} · <button class="btn-sm" id="refresh" type="button">🔄 Refresh</button></div></div>
${AD}
<section class="card-section"><h2>${k}K gold price by weight in ${x.n}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Weight</th><th>Price (${c.code})</th>${c.vat ? `<th>+ ${c.vat}% ${TN}</th>` : ''}${c.code === 'USD' ? '' : '<th>Price (USD)</th>'}</tr></thead><tbody>
${rows.map(([n, w]) => `<tr><td>${n}</td><td class="n">${P(k, w, opt())}</td>${c.vat ? `<td class="n">${P(k, w * (1 + c.vat / 100), opt())}</td>` : ''}${c.code === 'USD' ? '' : `<td class="n">$${P(k, w, { cur: 'usd' })}</td>`}</tr>`).join('')}
</tbody></table></div><p class="note">Raw gold price without making charges. ${k === 24 ? 'Bar prices at dealers are slightly higher because of the premium.' : 'Shops add making charges per piece' + (c.vat ? ` and ${c.vat}% ${TN}.` : '.')}</p></section>
<section class="card-section"><h2>About ${k}K gold in ${x.n}</h2><div class="prose">
<p><strong>${k} karat gold</strong> contains <strong>${K[k].purity}</strong> pure gold and is hallmarked <strong>${K[k].mark}</strong>. It is commonly used for ${ko.use}.</p>
<p>Formula: ${k}K price per gram = (ounce price in USD × USD/${c.code} rate ÷ 31.1035) × ${(k / 24).toFixed(3)}. The ${x.cur} is ${c.pegEn}.</p>
<p>${c.noteEn}</p></div></section>
${share('en', `${slug}/gold-${k}k`, `${k}K gold rate in ${x.n} today`)}
<section class="card-section"><h2>Related pages</h2><div class="links-grid">
<a class="link-card" href="${url('en', slug)}">All karats in ${x.n}<span>24K, 22K, 21K, 18K</span></a>
${KS.filter(o => o !== k).map(o => `<a class="link-card" href="${url('en', `${slug}/gold-${o}k`)}">${o}K gold rate in ${x.n}</a>`).join('')}
<a class="link-card" href="/en/gold-calculator/">Gold calculator<span>${c.code}</span></a>
<a class="link-card" href="/en/gcc/">Compare Gulf gold prices</a>
<a class="link-card" href="/en/gold-${k}k/">${k}K gold rate in the UAE</a></div></section>`,
        faq: [
          [`What is the ${k}K gold rate in ${x.n} today?`, `The live ${k}K price per gram in ${x.cur} is shown at the top of this page and refreshes about every 5 minutes. It is the raw gold price without making charges${c.vat ? ` or ${c.vat}% ${TN}` : ''}.`],
          [`What is ${k}K gold?`, `${k}K gold contains ${K[k].purity} pure gold and carries the hallmark ${K[k].mark}.`]
        ] });
    }
  }

  // ── صفحة مقارنة أسعار الخليج ──────────────────────────
  const ALL = [['', 'aed', 2, 'الإمارات', 'UAE', 'درهم', 5], ...Object.entries(GCC).map(([s, c]) => [s, c.code.toLowerCase(), c.d, c.ar.n, c.en.n, c.ar.curS, c.vat])];
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    out.push({ lang: L, fixed: true, slug: 'gcc', alt: true, usesFx: true,
      crumbs: [[en ? 'Gulf gold prices' : 'أسعار الذهب في الخليج', url(L, 'gcc')]],
      title: en ? 'Gulf Gold Prices Today: UAE, Saudi, Kuwait, Qatar, Oman, Bahrain' : 'أسعار الذهب في الخليج اليوم | الإمارات والسعودية والكويت وقطر',
      desc: en ? 'Compare today\'s gold price across the GCC in local currencies: UAE, Saudi Arabia, Kuwait, Qatar, Oman and Bahrain — 24K, 22K, 21K and 18K per gram, with VAT rates.'
        : 'قارن سعر الذهب اليوم في دول الخليج بالعملات المحلية: الإمارات والسعودية والكويت وقطر وعُمان والبحرين، لعيار 24 و22 و21 و18، مع نسب الضريبة في كل دولة.',
      body: `${hero(en ? 'Gold Prices in the Gulf Today' : 'أسعار الذهب في دول الخليج اليوم', en ? 'Price per gram in each country\'s currency' : 'سعر الغرام بالعملة المحلية لكل دولة', L)}
${errBox}
<section class="card-section"><h2>${en ? 'Gold price per gram by country' : 'سعر غرام الذهب حسب الدولة'}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Country' : 'الدولة'}</th>${KS.map(k => `<th>${en ? k + 'K' : 'عيار ' + k}</th>`).join('')}<th>${en ? 'VAT' : 'الضريبة'}</th></tr></thead><tbody>
${ALL.map(([s, cur, d, an, enn, curS, vat]) => `<tr><td><a href="${url(L, s)}"><strong>${en ? enn : an}</strong></a> <span class="sub">${cur.toUpperCase()}</span></td>${KS.map(k => `<td class="n">${P(k, 1, { cur, d })}</td>`).join('')}<td>${vat ? vat + '%' : (en ? 'None' : 'لا يوجد')}</td></tr>`).join('')}
</tbody></table></div><p class="note">${en ? 'Raw gold price per gram in local currency, without making charges or VAT.' : 'سعر غرام الذهب الخام بالعملة المحلية، بدون مصنعية أو ضريبة.'}</p></section>
${AD}
<section class="card-section"><h2>${en ? '21K gold price in the Gulf in AED and USD' : 'سعر عيار 21 في الخليج بالدرهم والدولار'}</h2><div class="prose">
<p>${en ? `Before VAT, a gram of 21K gold costs the same everywhere in the Gulf: <strong>${P(21)} AED</strong> ≈ <strong>$${P(21, 1, { cur: 'usd' })}</strong>. The real difference for buyers is VAT and making charges:` : `قبل الضريبة، سعر غرام الذهب عيار 21 واحد تقريباً في كل دول الخليج: <strong>${P(21)} درهم</strong> ≈ <strong>$${P(21, 1, { cur: 'usd' })}</strong>. والفرق الحقيقي للمشتري يكون في الضريبة والمصنعية:`}</p>
<ul>${ALL.map(([s, cur, d, an, enn, curS, vat]) => `<li><strong>${en ? enn : an}:</strong> ${en ? `21K with ${vat}% VAT ≈ ${P(21, 1 + vat / 100, { cur, d })} ${cur.toUpperCase()}` : `عيار 21 شامل ضريبة ${vat}% ≈ ${P(21, 1 + vat / 100, { cur, d })} ${curS}`}</li>`).join('')}</ul>
<p>${en ? 'Kuwait and Qatar do not apply VAT, so they are usually the cheapest places in the Gulf to buy gold jewellery, before making charges.' : 'الكويت وقطر لا تطبقان ضريبة القيمة المضافة، لذلك يكونان غالباً الأرخص في الخليج لشراء المشغولات الذهبية قبل احتساب المصنعية.'}</p></div></section>`,
      faq: en ? [
        ['Which Gulf country has the cheapest gold?', 'The raw gold price is practically the same across the GCC. Kuwait and Qatar have no VAT, so jewellery is usually cheapest there before making charges.'],
        ['Why is the gold price different in each Gulf currency?', 'Only the currency changes: the price is the same global gold price converted at each country\'s exchange rate. Most Gulf currencies are pegged to the dollar.']
      ] : [
        ['أين أرخص سعر للذهب في الخليج؟', 'سعر الذهب الخام واحد تقريباً في كل دول الخليج. والكويت وقطر بلا ضريبة قيمة مضافة، فتكون المشغولات فيهما أرخص غالباً قبل المصنعية.'],
        ['لماذا يختلف سعر الذهب بين عملات الخليج؟', 'الذي يختلف هو العملة فقط: فالسعر واحد وهو السعر العالمي محوَّلاً بسعر صرف كل دولة، ومعظم عملات الخليج مربوطة بالدولار.']
      ] });
  }

  // ── صفحات سعر الدولار وأسعار الصرف ─────────────────────
  // روابط مقالات الدولار (عربي فقط) لصفحات الدولار العربية
  const DART = `<section class="card-section"><h2>مقالات عن الدولار</h2><div class="links-grid">
<a class="link-card" href="/articles/why-dollar-rises-egypt/">ليه سعر الدولار بيزيد في مصر؟<span>الأسباب الحقيقية وراء ارتفاعه</span></a>
<a class="link-card" href="/articles/official-vs-parallel-dollar-rate/">السعر الرسمي وسعر السوق الموازية<span>الفرق بينهما ببساطة</span></a>
<a class="link-card" href="/articles/dollar-forecast-egypt/">توقعات سعر الدولار في مصر<span>العوامل والسيناريوهات</span></a></div></section>`;
  // محول دولار تفاعلي (من وإلى): c = عملة صفحة دولة، وبدونه = نسخة المركز مع اختيار عملة
  const dcvConv = (L, c) => {
    const en = L === 'en';
    const note = en ? 'Type in either field — the other side updates instantly at the live mid-market rate.' : 'اكتب في أي خانة والثانية تتحدث تلقائياً بسعر السوق المتوسط المباشر.';
    if (c) {
      const rate = ctx.fx[c.code];
      return `<section class="card-section" id="dcv" data-code="${c.code}" data-rate="${rate || ''}" data-d="${c.d}"><h2>${en ? 'Convert USD both ways' : 'حوّل من وإلى الدولار'}</h2>
<div class="form-grid">
<div class="field"><label for="dcv-usd">${en ? 'US dollar (USD)' : 'دولار أمريكي (USD)'}</label><input id="dcv-usd" type="number" inputmode="decimal" min="0" step="any" value="100"></div>
<div class="field"><label for="dcv-loc">${c[L].cur} (${c.code})</label><input id="dcv-loc" type="number" inputmode="decimal" min="0" step="any" value="${rate ? +(rate * 100).toFixed(c.d) : ''}"></div>
</div><p class="note">${note}</p></section>`;
    }
    const eg = DCS.find(([s]) => s === 'egypt')[1], egRate = ctx.fx.EGP;
    return `<section class="card-section" id="dcv"><h2>${en ? 'Convert USD both ways' : 'حوّل من وإلى الدولار'}</h2>
<div class="form-grid">
<div class="field"><label for="dcv-cur">${en ? 'Currency' : 'العملة'}</label><select id="dcv-cur">${DCS.map(([s, cc]) => `<option value="${cc.code}" data-rate="${ctx.fx[cc.code] || ''}" data-d="${cc.d}"${s === 'egypt' ? ' selected' : ''}>${en ? cc.en.cur : cc.ar.cur} (${cc.code})</option>`).join('')}</select></div>
<div class="field"><label for="dcv-usd">${en ? 'US dollar (USD)' : 'دولار أمريكي (USD)'}</label><input id="dcv-usd" type="number" inputmode="decimal" min="0" step="any" value="100"></div>
<div class="field"><label for="dcv-loc" id="dcv-locl">${en ? eg.en.cur : eg.ar.cur} (${eg.code})</label><input id="dcv-loc" type="number" inputmode="decimal" min="0" step="any" value="${egRate ? +(egRate * 100).toFixed(eg.d) : ''}"></div>
</div><p class="note">${note}</p></section>`;
  };
  const DCS = [['uae', { code: 'AED', d: 2, peg: 'مربوط بالدولار رسمياً عند 3.6725 درهم', pegEn: 'officially pegged at 3.6725 dirhams per US dollar', ar: { n: 'الإمارات', in: 'في الإمارات', cur: 'درهم إماراتي', curS: 'درهم' }, en: { n: 'the UAE', adj: 'UAE', cur: 'UAE dirham' } }],
    ...Object.entries(COUNTRY_PAGES).filter(([, c]) => c.code !== 'USD')];
  for (const L of ['ar', 'en']) {
    const en = L === 'en';
    out.push({ lang: L, fixed: true, dollar: true, slug: 'dollar', alt: true, usesFx: true,
      crumbs: [[en ? 'US dollar rate today' : 'سعر الدولار اليوم', url(L, 'dollar')]],
      title: en ? 'US Dollar Rate Today — Live Exchange Rates for 40 Currencies' : 'سعر الدولار اليوم | سعر الصرف مباشر مقابل 40 عملة',
      desc: en ? 'Live US dollar rate today against 40 currencies: Egyptian pound, Saudi riyal, UAE dirham, Indian rupee, Turkish lira and more, updated every 5 minutes.'
        : 'سعر الدولار اليوم مباشر مقابل 40 عملة: الجنيه المصري والريال السعودي والدرهم الإماراتي والروبية الهندية والليرة التركية وغيرها — محدَّث كل 5 دقائق.',
      body: `${hero(en ? 'US Dollar Rate Today' : 'سعر الدولار اليوم', en ? 'Live exchange rate against every currency we cover' : 'سعر الصرف مباشر مقابل كل العملات التي نغطيها', L)}
${errBox}
<section class="card-section"><h2>${en ? '1 US dollar in every currency' : 'سعر الدولار بجميع العملات'}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'Country' : 'الدولة'}</th><th>${en ? 'Currency' : 'العملة'}</th><th>${en ? '1 USD' : '1 دولار'}</th><th>${en ? '100 USD' : '100 دولار'}</th></tr></thead><tbody>
${DCS.filter(([, c]) => en || !c.enOnly).map(([s, c]) => `<tr><td><a href="${url(L, 'dollar-' + s)}"><strong>${c[L].n}</strong></a></td><td><span class="sub">${c.code}</span></td><td class="n">${FXD(c.code, { d: c.d })}</td><td class="n">${FXD(c.code, { w: 100, d: c.d })}</td></tr>`).join('')}
</tbody></table></div><p class="note">${en ? 'Mid-market rates, refreshed live. Gulf currencies (AED, SAR, QAR, OMR, BHD) and the Jordanian dinar are officially pegged to the US dollar.' : 'أسعار السوق المتوسطة وتُحدَّث لحظياً. عملات الخليج (الدرهم والريال السعودي والقطري والعُماني والدينار البحريني) والدينار الأردني مربوطة رسمياً بالدولار.'}</p></section>
${dcvConv(L)}
${AD}
<section class="card-section"><h2>${en ? 'About these exchange rates' : 'عن أسعار الصرف هذه'}</h2><div class="prose">
<p>${en ? 'These are mid-market rates from the open.er-api.com feed — the same rates used to convert the global gold price into each local currency on this site. Banks and exchange offices add a margin, so the counter rate you get will differ slightly.' : 'هذه أسعار السوق المتوسطة من مصدر open.er-api.com، وهي نفسها المستخدمة لتحويل السعر العالمي للذهب إلى كل عملة محلية في هذا الموقع. البنوك ومكاتب الصرافة تضيف هامشاً، لذلك يختلف السعر الذي تحصل عليه قليلاً.'}</p>
<p>${en ? 'For currencies not pegged to the dollar — like the Egyptian pound, Indian rupee and Turkish lira — the rate moves daily, and the local gold price moves with it. Pegged currencies stay fixed by official policy.' : 'العملات غير المربوطة بالدولار — مثل الجنيه المصري والروبية الهندية والليرة التركية — يتغير سعرها يومياً، ويتغير معها سعر الذهب المحلي. أما العملات المربوطة فتظل ثابتة بقرار رسمي.'}</p>
<p>${en ? `Related: <a href="${url(L, 'gold-price-usd')}">gold price in USD</a> · <a href="${url(L, 'gold-calculator')}">gold calculator</a> · <a href="${url(L, 'gcc')}">Gulf gold prices</a>.` : `مواضيع ذات صلة: <a href="${url(L, 'gold-price-usd')}">سعر الذهب بالدولار</a> · <a href="${url(L, 'gold-calculator')}">حاسبة الذهب</a> · <a href="${url(L, 'gcc')}">أسعار الذهب في الخليج</a>.`}</p></div></section>${en ? '' : DART}`,
      faq: en ? [
        ['What is the US dollar rate today?', 'The live mid-market rate for 1 USD against each currency appears in the table above and refreshes about every 5 minutes.'],
        ['Why is my bank\'s dollar rate different from this rate?', 'Banks and exchange offices add a margin to the mid-market rate, and cash rates differ from transfer rates. The rate here is the mid-market reference.']
      ] : [
        ['كم سعر الدولار اليوم؟', 'يظهر السعر المباشر للدولار مقابل كل عملة في الجدول أعلاه ويُحدَّث كل 5 دقائق تقريباً.'],
        ['لماذا يختلف سعر الدولار في البنك عن المعروض هنا؟', 'البنوك ومكاتب الصرافة تضيف هامشاً على سعر السوق المتوسط، وسعر الكاش يختلف عن سعر التحويل. السعر هنا هو سعر السوق المتوسط المرجعي.']
      ] });
  }
  const DAMTS = [1, 5, 10, 25, 50, 100, 500, 1000];
  const DAMTS_L = [1, 10, 50, 100, 500, 1000, 5000, 10000];
  for (const [slug, c] of DCS) {
    const rate = ctx.fx[c.code], dd = c.d ?? 2;
    const rTxt = rate ? fmt(rate, rate < 10 ? 4 : dd) : '';
    for (const L of c.enOnly ? ['en'] : ['ar', 'en']) {
      const en = L === 'en', x = c[L];
      out.push({ lang: L, fixed: true, dollar: true, slug: `dollar-${slug}`, alt: !c.enOnly, usesFx: true,
        crumbs: [[en ? `Dollar rate in ${x.n}` : `سعر الدولار ${x.in}`, url(L, `dollar-${slug}`)]],
        title: en ? `US Dollar Rate in ${x.n} Today: 1 USD = ${rTxt} ${c.code}` : `سعر الدولار اليوم ${x.in}: 1 دولار = ${rTxt} ${x.cur}`,
        desc: en ? `Live US dollar rate in ${x.n} today: 1 USD = ${rTxt} ${c.code}. Conversion tables from 1 to 1,000 dollars and back, updated every 5 minutes.`
          : `سعر الدولار اليوم ${x.in} بال${x.cur}: 1 دولار = ${rTxt} ${x.cur}. جداول تحويل من 1 حتى 1000 دولار والعكس، محدَّث كل 5 دقائق.`,
        body: `${hero(en ? `US Dollar Rate in ${x.n} Today` : `سعر الدولار اليوم ${x.in}`, en ? `1 US dollar = ${rTxt} ${x.cur}` : `1 دولار = ${rTxt} ${x.cur}`, L)}
${errBox}
<section class="card-section"><div class="table-wrap"><table class="data-table"><tbody>
<tr><th>${en ? '1 US dollar' : '1 دولار أمريكي'}</th><td class="n">${FXD(c.code, { d: dd })} ${c.code}</td></tr>
<tr><th>${en ? `1 ${x.cur}` : `1 ${x.cur}`}</th><td class="n">$${FXD(c.code, { i: true, d: 4 })}</td></tr>
</tbody></table></div><p class="note">${en ? 'Updated' : 'آخر تحديث'}: ${updated(L)} ${en ? '(Dubai time)' : '(بتوقيت دبي)'} · ${en ? 'mid-market rate' : 'سعر السوق المتوسط'}</p></section>
${dcvConv(L, c)}
${AD}
<section class="card-section"><h2>${en ? `Convert USD to ${x.cur}` : `تحويل الدولار إلى ${x.cur}`}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${en ? 'USD' : 'دولار'}</th><th>${c.code}</th></tr></thead><tbody>
${DAMTS.map(w => `<tr><td class="n">$${w.toLocaleString('en-US')}</td><td class="n">${FXD(c.code, { w, d: dd })}</td></tr>`).join('')}
</tbody></table></div></section>
<section class="card-section"><h2>${en ? `Convert ${x.cur} to USD` : `تحويل ال${x.curS || x.cur} إلى دولار`}</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>${c.code}</th><th>${en ? 'USD' : 'دولار'}</th></tr></thead><tbody>
${DAMTS_L.map(w => `<tr><td class="n">${w.toLocaleString('en-US')}</td><td class="n">$${FXD(c.code, { w, i: true, d: rate && w / rate >= 100 ? 2 : 4 })}</td></tr>`).join('')}
</tbody></table></div></section>
<section class="card-section"><h2>${en ? 'About this rate' : 'عن هذا السعر'}</h2><div class="prose">
<p>${en ? `The ${x.cur} is ${c.pegEn}.` : `ال${x.curS || x.cur} ${c.peg}.`}</p>
<p>${en ? 'The rate shown is the mid-market rate from the daily open.er-api.com feed. Banks and exchange offices include a margin, and where a parallel market exists the street rate can differ.' : 'السعر المعروض هو سعر السوق المتوسط من مصدر open.er-api.com اليومي. أسعار البنوك والصرافة تشمل هامشاً، وحيث توجد سوق موازية قد يختلف سعرها.'}</p>
<p>${en ? `Related: <a href="${url(L, slug === 'uae' ? '' : slug)}">gold price in ${x.n}</a> · <a href="${url(L, 'dollar')}">dollar rate in all currencies</a> · <a href="${url(L, 'gold-calculator')}">gold calculator</a>.` : `مواضيع ذات صلة: <a href="${url(L, slug === 'uae' ? '' : slug)}">سعر الذهب ${x.in}</a> · <a href="${url(L, 'dollar')}">سعر الدولار بجميع العملات</a> · <a href="${url(L, 'gold-calculator')}">حاسبة الذهب</a>.`}</p></div></section>${en ? '' : DART}`,
        faq: en ? [
          [`What is 1 USD in ${x.cur} today?`, `1 US dollar = ${rTxt} ${c.code} at the live mid-market rate shown above, refreshed every 5 minutes.`],
          [`How much is 100 US dollars in ${x.cur}?`, `100 USD = ${rate ? fmt(rate * 100, dd) : ''} ${c.code} at the current rate. The full conversion table above updates live every 5 minutes.`]
        ] : [
          [`كم سعر الدولار اليوم ${x.in}؟`, `1 دولار = ${rTxt} ${x.cur} بسعر السوق المتوسط المباشر أعلى الصفحة، ويُحدَّث كل 5 دقائق تقريباً.`],
          [`كيف أحوّل الدولار إلى ${x.cur}؟`, `اضرب المبلغ بالدولار في سعر الصرف (${rTxt})، أو استخدم جدول التحويل أعلاه الذي يعرض القيم من 1 حتى 1000 دولار.`]
        ] });
    }
  }

  // ── Turkish pilot: Turkey pages in Turkish (real content, hreflang-paired with en) ──
  {
    const tryG = (k, w = 1) => ctx.g24 && ctx.fx.TRY ? fmt(ctx.g24 * k / 24 * w / ctx.AED * ctx.fx.TRY, 0) : null;
    const trP = (k, w = 1, o = {}) => P(k, w, { cur: 'try', d: 0, ...o });
    const TRK = [[24, '24 Ayar', '24-ayar-altin'], [22, '22 Ayar', '22-ayar-altin'], [21, '21 Ayar', '21-ayar-altin'], [18, '18 Ayar', '18-ayar-altin']];
    const TR_EN = { 'turkiye': 'turkey', 'turkiye/24-ayar-altin': 'turkey/gold-24k', 'turkiye/22-ayar-altin': 'turkey/gold-22k', 'turkiye/21-ayar-altin': 'turkey/gold-21k', 'turkiye/18-ayar-altin': 'turkey/gold-18k' };
    const TR_ALTS = ts => [['tr', url('tr', ts)], ['en', url('en', TR_EN[ts])], ['x-default', url('en', TR_EN[ts])]];
    const g24t = tryG(24);
    out.push({ lang: 'tr', fixed: true, slug: 'turkiye', usesFx: true, trEn: 'turkey',
      alts: TR_ALTS('turkiye'),
      crumbs: [['Gram altın fiyatı', url('tr', 'turkiye')]],
      title: `Gram Altın Fiyatı Bugün: ${g24t} TL — Canlı Altın Fiyatları`,
      desc: 'Canlı gram altın fiyatı: 24, 22, 21 ve 18 ayar altının gram ve ons fiyatı Türk lirası ve dolar olarak her 5 dakikada güncellenir.',
      body: `${hero('Gram Altın Fiyatı Bugün', 'Gram başına Türk lirası (TL) ve ABD doları canlı fiyat', 'tr')}
${errBox}
<div class="karat-grid">${TRK.map(([k, n, s]) => `<a class="karat-card" href="${url('tr', 'turkiye/' + s)}">
<span class="karat-badge">${n}</span>
<div class="k-price">${trP(k)}</div>
<div class="k-usd">$${P(k, 1, { cur: 'usd', d: 2 })}</div>
<div class="k-unit">TL / gram</div></a>`).join('')}</div>
<div class="meta-row"><span>Güncelleme: <strong>${updated('en')}</strong> (Dubai)</span><span>Ons: <strong>${trP(24, ctx.TROY)} TL</strong> · <strong>$${P(24, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 Yenile</button></div>
<section class="card-section"><h2>Bugün altın fiyatları — gram, 10 gram ve ons</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Ayar</th><th>1 gram (TL)</th><th>10 gram (TL)</th><th>1 ons (TL)</th></tr></thead><tbody>
${TRK.map(([k, n]) => `<tr><td><strong>${n}</strong></td><td class="n">${trP(k)}</td><td class="n">${trP(k, 10)}</td><td class="n">${trP(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">İşçilik ve KDV hariç ham altın fiyatıdır. 1 ons = 31.1035 g.</p></section>
${AD}
<section class="card-section"><h2>Gram altın ve çeyrek altın hakkında</h2><div class="prose">
<p><strong>Gram altın</strong>, Türkiye'de yatırım için en çok tercih edilen altın türüdür ve 24 ayar (999 milyem) saf altından üretilir. Fiyatı, ons başına dolar bazındaki küresel altın fiyatının güncel dolar/TL kuruyla çevrilmesiyle belirlenir; bu yüzden gram altın hem ons fiyatıyla hem de dolar kuruyla birlikte hareket eder.</p>
<p><strong>Çeyrek altın</strong> için ürün türünü ayırt edin: Darphane belgesine göre ziynet çeyrek 1,754 gram, sikke çeyrek 1,804 gramdır ve ikisi de 22 ayardır. Bunlar brüt metal ağırlıklarıdır; tamamı saf altın değildir. Bu sayfadaki gram fiyatı sikkenin mağaza satış fiyatı değil, ham metal için referanstır.</p>
<p>İlgili sayfalar: <a href="${url('en', 'turkey')}">English version</a> · <a href="${url('tr', 'turkiye/22-ayar-altin')}">22 ayar altın fiyatı</a> · <a href="${url('en', 'gold-price-usd')}">Ons altın (USD)</a>.</p>
</div></section>`,
      faq: [
        ['Gram altın bugün ne kadar?', `1 gram 24 ayar altın şu anda yaklaşık ${g24t} TL'dir; güncel fiyat sayfanın üstünde her 5 dakikada bir yenilenir.`],
        ['Altın fiyatı neden sürekli değişiyor?', 'Gram altın fiyatı iki etkene bağlıdır: küresel ons fiyatı (dolar) ve dolar/TL kuru. İkisi değişince TL bazındaki fiyat da değişir.'],
        ['Çeyrek altın kaç gramdır?', 'Darphane belgesine göre ziynet çeyrek 1,754 gram, sikke çeyrek 1,804 gramdır. İkisi de 22 ayardır; ürün türünü ayırt etmek gerekir.']
      ] });
    for (const [k, n, s] of TRK) {
      const ts = `turkiye/${s}`, kt = tryG(k);
      out.push({ lang: 'tr', fixed: true, slug: ts, usesFx: true, trEn: TR_EN[ts],
        alts: TR_ALTS(ts),
        crumbs: [['Gram altın', url('tr', 'turkiye')], [`${n} fiyatı`, url('tr', ts)]],
        title: `${n} Altın Fiyatı Bugün: Gram = ${kt} TL`,
        desc: `Canlı ${n.toLowerCase()} altın fiyatı: gram, 10 gram ve ons bazında Türk lirası ve dolar, her 5 dakikada güncellenir. İşçilik ve KDV hariç ham fiyat.`,
        body: `${hero(`${n} Altın Fiyatı Bugün`, `Gram başına ${kt} TL — canlı`, 'tr')}
${errBox}
<div class="meta-row"><span>Güncelleme: <strong>${updated('en')}</strong> (Dubai)</span><span>Ons: <strong>${trP(k, ctx.TROY)} TL</strong> · <strong>$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 Yenile</button></div>
<section class="card-section"><h2>${n} altın — ağırlığa göre fiyatlar</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Ağırlık</th><th>Fiyat (TL)</th><th>Fiyat (USD)</th></tr></thead><tbody>
${[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => `<tr><td class="n">${w} g</td><td class="n">${trP(k, w)}</td><td class="n">$${P(k, w, { cur: 'usd', d: 2 })}</td></tr>`).join('')}
<tr><td class="n">1 ons (31.1 g)</td><td class="n">${trP(k, ctx.TROY)}</td><td class="n">$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</td></tr>
</tbody></table></div><p class="note">İşçilik ve KDV hariç ham altın fiyatıdır.</p></section>
${AD}
<section class="card-section"><h2>Diğer ayarlar</h2><div class="links-grid">
${TRK.filter(([k2]) => k2 !== k).map(([, n2, s2]) => `<a class="link-card" href="${url('tr', 'turkiye/' + s2)}">${n2} altın fiyatı</a>`).join('')}
<a class="link-card" href="${url('tr', 'turkiye')}">Gram altın (tüm ayarlar)</a>
<a class="link-card" href="${url('en', TR_EN[ts])}">English version</a></div></section>`,
        faq: [
          [`${n} gram altın bugün ne kadar?`, `1 gram ${n.toLowerCase()} altın şu anda yaklaşık ${kt} TL'dir; güncel fiyat her 5 dakikada bir yenilenir.`],
          [`${n} altın neye göre fiyatlanır?`, `Fiyat, küresel ons fiyatının (dolar) güncel dolar/TL kuruyla çevrilmesi ve ${n} saflık oranının uygulanmasıyla hesaplanır.`]
        ] });
    }
    // karşılıklı hreflang: İngilizce Turkey sayfalarına tr bağlantısı ekle
    for (const p2 of out) {
      const ts = Object.keys(TR_EN).find(k2 => TR_EN[k2] === p2.slug);
      if (ts && p2.lang === 'en') p2.alts = [['en', url('en', p2.slug)], ['tr', url('tr', ts)], ['x-default', url('en', p2.slug)]];
    }
  }

  // ── Hindi pilot: India pages in Hindi (real content, hreflang-paired with en) ──
  {
    const inrG = (k, w = 1) => ctx.g24 && ctx.fx.INR ? fmt(ctx.g24 * k / 24 * w / ctx.AED * ctx.fx.INR, 0) : null;
    const hiP = (k, w = 1, o = {}) => P(k, w, { cur: 'inr', d: 0, ...o });
    const HIK = [[24, '24 कैरेट', '24-karat'], [22, '22 कैरेट', '22-karat'], [21, '21 कैरेट', '21-karat'], [18, '18 कैरेट', '18-karat']];
    const HI_EN = { 'sone-ka-bhav': 'india', 'sone-ka-bhav/24-karat': 'india/gold-24k', 'sone-ka-bhav/22-karat': 'india/gold-22k', 'sone-ka-bhav/21-karat': 'india/gold-21k', 'sone-ka-bhav/18-karat': 'india/gold-18k' };
    const HI_ALTS = hs => [['hi', url('hi', hs)], ['en', url('en', HI_EN[hs])], ['x-default', url('en', HI_EN[hs])]];
    const g24h = inrG(24), TOLA2 = 11.6638;
    out.push({ lang: 'hi', fixed: true, slug: 'sone-ka-bhav', usesFx: true, trEn: 'india',
      alts: HI_ALTS('sone-ka-bhav'),
      crumbs: [['आज का सोने का भाव', url('hi', 'sone-ka-bhav')]],
      title: `आज का सोने का भाव: ${g24h} रुपये/ग्राम — 22 और 24 कैरेट`,
      desc: 'आज का सोने का ताजा भाव: 24, 22, 21 और 18 कैरेट सोने की ग्राम, 10 ग्राम, तोला और औंस कीमत रुपये और डॉलर में, हर 5 मिनट में अपडेट।',
      body: `${hero('आज का सोने का भाव', 'प्रति ग्राम रुपये (INR) और अमेरिकी डॉलर में लाइव भाव', 'hi')}
${errBox}
<div class="karat-grid">${HIK.map(([k, n, s]) => `<a class="karat-card" href="${url('hi', 'sone-ka-bhav/' + s)}">
<span class="karat-badge">${n}</span>
<div class="k-price">${hiP(k)}</div>
<div class="k-usd">$${P(k, 1, { cur: 'usd', d: 2 })}</div>
<div class="k-unit">रुपये / ग्राम</div></a>`).join('')}</div>
<div class="meta-row"><span>अपडेट: <strong>${updated('en')}</strong> (दुबई)</span><span>औंस: <strong>${hiP(24, ctx.TROY)} रु.</strong> · <strong>$${P(24, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 रीफ्रेश</button></div>
<section class="card-section"><h2>आज सोने का भाव — ग्राम, 10 ग्राम, तोला और औंस</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>कैरेट</th><th>1 ग्राम (रु.)</th><th>10 ग्राम (रु.)</th><th>1 तोला (रु.)</th><th>1 औंस (रु.)</th></tr></thead><tbody>
${HIK.map(([k, n]) => `<tr><td><strong>${n}</strong></td><td class="n">${hiP(k)}</td><td class="n">${hiP(k, 10)}</td><td class="n">${hiP(k, TOLA2)}</td><td class="n">${hiP(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">मेकिंग चार्ज और लागू कर के बिना कच्चे सोने का भाव। 1 तोला = 11.664 ग्राम · 1 औंस = 31.1035 ग्राम।</p></section>
${AD}
<section class="card-section"><h2>22 और 24 कैरेट सोने के बारे में</h2><div class="prose">
<p><strong>24 कैरेट सोना</strong> (999 शुद्धता) सबसे शुद्ध सोना है और भारत में मुख्य रूप से सिक्कों और बिस्किट (बार) के रूप में निवेश के लिए खरीदा जाता है। <strong>22 कैरेट</strong> (916, जिसे BIS हॉलमार्क 916 कहा जाता है) गहनों का मानक है — इसीलिए गहनों की दुकानों की बोर्ड दर आमतौर पर 22 कैरेट के लिए होती है।</p>
<p>भारत में सोने की दर दो चीजों से बनती है: अंतरराष्ट्रीय औंस भाव (डॉलर में) और डॉलर/रुपया विनिमय दर। दुकान के अंतिम बिल में लागू कर, मेकिंग चार्ज और दूसरे शुल्क अलग जांचें; यहां दिखाया गया भाव कच्चा (GST के बिना) है।</p>
<p>संबंधित पेज: <a href="${url('en', 'india')}">English version</a> · <a href="${url('hi', 'sone-ka-bhav/22-karat')}">22 कैरेट सोने का भाव</a> · <a href="${url('en', 'gold-rate-inr')}">Gold rate in INR</a>.</p>
</div></section>`,
      faq: [
        ['आज सोने का भाव क्या है?', `1 ग्राम 24 कैरेट सोना अभी लगभग ${g24h} रुपये है; ताजा भाव ऊपर हर 5 मिनट में अपडेट होता है।`],
        ['सोने का भाव रोज क्यों बदलता है?', 'सोने का भाव अंतरराष्ट्रीय औंस भाव (डॉलर) और डॉलर/रुपया विनिमय दर पर निर्भर करता है। दोनों बदलते हैं तो रुपये में भाव भी बदलता है।'],
        ['1 तोला कितने ग्राम होता है?', '1 तोला = 11.664 ग्राम। भारत में सोना अक्सर तोला और 10 ग्राम में मापा जाता है।']
      ] });
    for (const [k, n, s] of HIK) {
      const hs = `sone-ka-bhav/${s}`, kt = inrG(k);
      out.push({ lang: 'hi', fixed: true, slug: hs, usesFx: true, trEn: HI_EN[hs],
        alts: HI_ALTS(hs),
        crumbs: [['सोने का भाव', url('hi', 'sone-ka-bhav')], [`${n} भाव`, url('hi', hs)]],
        title: `${n} सोने का भाव आज: 1 ग्राम = ${kt} रुपये`,
        desc: `${n} सोने का ताजा भाव: ग्राम, 10 ग्राम, तोला और औंस में रुपये और डॉलर, हर 5 मिनट में अपडेट। मेकिंग चार्ज और GST के बिना कच्चा भाव।`,
        body: `${hero(`${n} सोने का भाव आज`, `प्रति ग्राम ${kt} रुपये — लाइव`, 'hi')}
${errBox}
<div class="meta-row"><span>अपडेट: <strong>${updated('en')}</strong> (दुबई)</span><span>औंस: <strong>${hiP(k, ctx.TROY)} रु.</strong> · <strong>$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 रीफ्रेश</button></div>
<section class="card-section"><h2>${n} सोना — वजन के हिसाब से भाव</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>वजन</th><th>भाव (रु.)</th><th>भाव (USD)</th></tr></thead><tbody>
${[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => `<tr><td class="n">${w} ग्राम</td><td class="n">${hiP(k, w)}</td><td class="n">$${P(k, w, { cur: 'usd', d: 2 })}</td></tr>`).join('')}
<tr><td class="n">1 तोला (11.66 ग्राम)</td><td class="n">${hiP(k, TOLA2)}</td><td class="n">$${P(k, TOLA2, { cur: 'usd', d: 2 })}</td></tr>
<tr><td class="n">1 औंस (31.1 ग्राम)</td><td class="n">${hiP(k, ctx.TROY)}</td><td class="n">$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</td></tr>
</tbody></table></div><p class="note">मेकिंग चार्ज और GST के बिना कच्चा भाव।</p></section>
${AD}
<section class="card-section"><h2>अन्य कैरेट</h2><div class="links-grid">
${HIK.filter(([k2]) => k2 !== k).map(([, n2, s2]) => `<a class="link-card" href="${url('hi', 'sone-ka-bhav/' + s2)}">${n2} सोने का भाव</a>`).join('')}
<a class="link-card" href="${url('hi', 'sone-ka-bhav')}">सभी कैरेट का भाव</a>
<a class="link-card" href="${url('en', HI_EN[hs])}">English version</a></div></section>`,
        faq: [
          [`${n} सोने का भाव आज क्या है?`, `1 ग्राम ${n} सोना अभी लगभग ${kt} रुपये है; ताजा भाव हर 5 मिनट में अपडेट होता है।`],
          [`${n} सोने का भाव कैसे तय होता है?`, `अंतरराष्ट्रीय औंस भाव (डॉलर) को डॉलर/रुपया दर से बदलकर ${n} शुद्धता का अनुपात लगाया जाता है।`]
        ] });
    }
    for (const p2 of out) {
      const hs = Object.keys(HI_EN).find(k2 => HI_EN[k2] === p2.slug);
      if (hs && p2.lang === 'en') p2.alts = [['en', url('en', p2.slug)], ['hi', url('hi', hs)], ['x-default', url('en', p2.slug)]];
    }
  }

  // ── Urdu pilot: Pakistan pages in Urdu (real content, hreflang-paired with en) ──
  {
    const pkrG = (k, w = 1) => ctx.g24 && ctx.fx.PKR ? fmt(ctx.g24 * k / 24 * w / ctx.AED * ctx.fx.PKR, 0) : null;
    const urP = (k, w = 1, o = {}) => P(k, w, { cur: 'pkr', d: 0, ...o });
    const URK = [[24, '24 کیرٹ', '24-karat'], [22, '22 کیرٹ', '22-karat'], [21, '21 کیرٹ', '21-karat'], [18, '18 کیرٹ', '18-karat']];
    const UR_EN = { 'sone-ka-rate': 'pakistan', 'sone-ka-rate/24-karat': 'pakistan/gold-24k', 'sone-ka-rate/22-karat': 'pakistan/gold-22k', 'sone-ka-rate/21-karat': 'pakistan/gold-21k', 'sone-ka-rate/18-karat': 'pakistan/gold-18k' };
    const UR_ALTS = us => [['ur', url('ur', us)], ['en', url('en', UR_EN[us])], ['x-default', url('en', UR_EN[us])]];
    const g24u = pkrG(24), TOLA3 = 11.6638;
    out.push({ lang: 'ur', fixed: true, slug: 'sone-ka-rate', usesFx: true, trEn: 'pakistan',
      alts: UR_ALTS('sone-ka-rate'),
      crumbs: [['آج کا سونے کا ریٹ', url('ur', 'sone-ka-rate')]],
      title: `آج کا سونے کا ریٹ: ${g24u} روپے فی گرام — 22 اور 24 کیرٹ`,
      desc: 'آج کا تازہ سونے کا ریٹ: 24، 22، 21 اور 18 کیرٹ سونے کی گرام، 10 گرام، تولہ اور اونس قیمت روپے اور ڈالر میں، ہر 5 منٹ میں تازہ کاری۔',
      body: `${hero('آج کا سونے کا ریٹ', 'فی گرام روپے (PKR) اور امریکی ڈالر میں لائیو ریٹ', 'ur')}
${errBox}
<div class="karat-grid">${URK.map(([k, n, s]) => `<a class="karat-card" href="${url('ur', 'sone-ka-rate/' + s)}">
<span class="karat-badge">${n}</span>
<div class="k-price">${urP(k)}</div>
<div class="k-usd">$${P(k, 1, { cur: 'usd', d: 2 })}</div>
<div class="k-unit">روپے / گرام</div></a>`).join('')}</div>
<div class="meta-row"><span>تازہ کاری: <strong>${updated('en')}</strong> (دبئی)</span><span>اونس: <strong>${urP(24, ctx.TROY)} روپے</strong> · <strong>$${P(24, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 تازہ کریں</button></div>
<section class="card-section"><h2>آج سونے کا ریٹ — گرام، 10 گرام، تولہ اور اونس</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>کیرٹ</th><th>1 گرام (روپے)</th><th>10 گرام (روپے)</th><th>1 تولہ (روپے)</th><th>1 اونس (روپے)</th></tr></thead><tbody>
${URK.map(([k, n]) => `<tr><td><strong>${n}</strong></td><td class="n">${urP(k)}</td><td class="n">${urP(k, 10)}</td><td class="n">${urP(k, TOLA3)}</td><td class="n">${urP(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">مزدوری کے بغیر خام سونے کا ریٹ۔ 1 تولہ = 11.664 گرام · 1 اونس = 31.1035 گرام۔</p></section>
${AD}
<section class="card-section"><h2>22 اور 24 کیرٹ سونے کے بارے میں</h2><div class="prose">
<p><strong>24 کیرٹ سونا</strong> (999 خالص) سب سے خالص سونا ہے اور پاکستان میں عموماً بسکٹ اور سِکّوں کی صورت میں بچت کے لیے خریدا جاتا ہے۔ <strong>22 کیرٹ</strong> (916) زیورات میں استعمال ہوتا ہے۔ صرافہ بورڈ پر درج نرخ کا کیرٹ الگ سے معلوم کریں؛ ہر بورڈ کو 22 کیرٹ فرض نہ کریں۔</p>
<p>پاکستان میں سونے کا ریٹ دو چیزوں سے بنتا ہے: بین الاقوامی اونس ریٹ (ڈالر میں) اور ڈالر/روپے کی شرح تبادلہ۔ دکان پر حتمی قیمت میں مزدوری شامل ہوتی ہے؛ یہاں دکھایا گیا ریٹ خام (مزدوری کے بغیر) ہے۔</p>
<p>متعلقہ صفحات: <a href="${url('en', 'pakistan')}">English version</a> · <a href="${url('ur', 'sone-ka-rate/22-karat')}">22 کیرٹ سونے کا ریٹ</a> · <a href="${url('en', 'gold-rate-pkr')}">Gold rate in PKR</a>.</p>
</div></section>`,
      faq: [
        ['آج سونے کا ریٹ کیا ہے؟', `1 گرام 24 کیرٹ سونا اس وقت تقریباً ${g24u} روپے ہے؛ تازہ ریٹ اوپر ہر 5 منٹ میں تازہ ہوتا ہے۔`],
        ['سونے کا ریٹ روز کیوں بدلتا ہے؟', 'سونے کا ریٹ بین الاقوامی اونس ریٹ (ڈالر) اور ڈالر/روپے کی شرح تبادلہ پر منحصر ہے۔ دونوں بدلیں تو روپے میں ریٹ بھی بدلتا ہے۔'],
        ['1 تولہ کتنے گرام ہوتا ہے؟', '1 تولہ = 11.664 گرام۔ پاکستان میں سونا اکثر تولہ اور 10 گرام میں ناپا جاتا ہے۔']
      ] });
    for (const [k, n, s] of URK) {
      const us = `sone-ka-rate/${s}`, kt = pkrG(k);
      out.push({ lang: 'ur', fixed: true, slug: us, usesFx: true, trEn: UR_EN[us],
        alts: UR_ALTS(us),
        crumbs: [['سونے کا ریٹ', url('ur', 'sone-ka-rate')], [`${n} ریٹ`, url('ur', us)]],
        title: `${n} سونے کا ریٹ آج: 1 گرام = ${kt} روپے`,
        desc: `${n} سونے کا تازہ ریٹ: گرام، 10 گرام، تولہ اور اونس میں روپے اور ڈالر، ہر 5 منٹ میں تازہ کاری۔ مزدوری کے بغیر خام ریٹ۔`,
        body: `${hero(`${n} سونے کا ریٹ آج`, `فی گرام ${kt} روپے — لائیو`, 'ur')}
${errBox}
<div class="meta-row"><span>تازہ کاری: <strong>${updated('en')}</strong> (دبئی)</span><span>اونس: <strong>${urP(k, ctx.TROY)} روپے</strong> · <strong>$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 تازہ کریں</button></div>
<section class="card-section"><h2>${n} سونا — وزن کے حساب سے ریٹ</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>وزن</th><th>ریٹ (روپے)</th><th>ریٹ (USD)</th></tr></thead><tbody>
${[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => `<tr><td class="n">${w} گرام</td><td class="n">${urP(k, w)}</td><td class="n">$${P(k, w, { cur: 'usd', d: 2 })}</td></tr>`).join('')}
<tr><td class="n">1 تولہ (11.66 گرام)</td><td class="n">${urP(k, TOLA3)}</td><td class="n">$${P(k, TOLA3, { cur: 'usd', d: 2 })}</td></tr>
<tr><td class="n">1 اونس (31.1 گرام)</td><td class="n">${urP(k, ctx.TROY)}</td><td class="n">$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</td></tr>
</tbody></table></div><p class="note">مزدوری کے بغیر خام ریٹ۔</p></section>
${AD}
<section class="card-section"><h2>دیگر کیرٹ</h2><div class="links-grid">
${URK.filter(([k2]) => k2 !== k).map(([, n2, s2]) => `<a class="link-card" href="${url('ur', 'sone-ka-rate/' + s2)}">${n2} سونے کا ریٹ</a>`).join('')}
<a class="link-card" href="${url('ur', 'sone-ka-rate')}">تمام کیرٹ کا ریٹ</a>
<a class="link-card" href="${url('en', UR_EN[us])}">English version</a></div></section>`,
        faq: [
          [`${n} سونے کا ریٹ آج کیا ہے؟`, `1 گرام ${n} سونا اس وقت تقریباً ${kt} روپے ہے؛ تازہ ریٹ ہر 5 منٹ میں تازہ ہوتا ہے۔`],
          [`${n} سونے کا ریٹ کیسے طے ہوتا ہے؟`, `بین الاقوامی اونس ریٹ (ڈالر) کو ڈالر/روپے کی شرح سے بدل کر ${n} خلوص کا تناسب لگایا جاتا ہے۔`]
        ] });
    }
    for (const p2 of out) {
      const us = Object.keys(UR_EN).find(k2 => UR_EN[k2] === p2.slug);
      if (us && p2.lang === 'en') p2.alts = p2.alts ? [...p2.alts.filter(a => a[0] !== 'x-default'), ['ur', url('ur', us)], ['x-default', url('en', p2.slug)]] : [['en', url('en', p2.slug)], ['ur', url('ur', us)], ['x-default', url('en', p2.slug)]];
    }
  }

  // ── Indonesian pilot: Indonesia pages in Bahasa (real content, hreflang-paired with en) ──
  {
    const idrG = (k, w = 1) => ctx.g24 && ctx.fx.IDR ? fmt(ctx.g24 * k / 24 * w / ctx.AED * ctx.fx.IDR, 0) : null;
    const idP = (k, w = 1, o = {}) => P(k, w, { cur: 'idr', d: 0, ...o });
    const IDK = [[24, '24 Karat', '24-karat'], [22, '22 Karat', '22-karat'], [21, '21 Karat', '21-karat'], [18, '18 Karat', '18-karat']];
    const ID_EN = { 'harga-emas': 'indonesia', 'harga-emas/24-karat': 'indonesia/gold-24k', 'harga-emas/22-karat': 'indonesia/gold-22k', 'harga-emas/21-karat': 'indonesia/gold-21k', 'harga-emas/18-karat': 'indonesia/gold-18k' };
    const ID_ALTS = is2 => [['id', url('id', is2)], ['en', url('en', ID_EN[is2])], ['x-default', url('en', ID_EN[is2])]];
    const g24i = idrG(24);
    out.push({ lang: 'id', fixed: true, slug: 'harga-emas', usesFx: true, trEn: 'indonesia',
      alts: ID_ALTS('harga-emas'),
      crumbs: [['Harga emas hari ini', url('id', 'harga-emas')]],
      title: `Harga Emas Hari Ini: ${g24i} Rupiah per Gram — 22 & 24 Karat`,
      desc: 'Harga emas terkini hari ini: 24, 22, 21 dan 18 karat per gram, 10 gram dan troy ounce dalam rupiah dan dolar, diperbarui setiap 5 menit.',
      body: `${hero('Harga Emas Hari Ini', 'Harga langsung per gram dalam rupiah (IDR) dan dolar AS', 'id')}
${errBox}
<div class="karat-grid">${IDK.map(([k, n, s]) => `<a class="karat-card" href="${url('id', 'harga-emas/' + s)}">
<span class="karat-badge">${n}</span>
<div class="k-price">${idP(k)}</div>
<div class="k-usd">$${P(k, 1, { cur: 'usd', d: 2 })}</div>
<div class="k-unit">IDR / gram</div></a>`).join('')}</div>
<div class="meta-row"><span>Diperbarui: <strong>${updated('en')}</strong> (Dubai)</span><span>Troy ounce: <strong>${idP(24, ctx.TROY)} IDR</strong> · <strong>$${P(24, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 Muat ulang</button></div>
<section class="card-section"><h2>Harga emas hari ini — gram, 10 gram dan troy ounce</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Karat</th><th>1 gram (IDR)</th><th>10 gram (IDR)</th><th>1 troy ounce (IDR)</th></tr></thead><tbody>
${IDK.map(([k, n]) => `<tr><td><strong>${n}</strong></td><td class="n">${idP(k)}</td><td class="n">${idP(k, 10)}</td><td class="n">${idP(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">Harga emas murni tanpa ongkos pembuatan. 1 troy ounce = 31.1035 g.</p></section>
${AD}
<section class="card-section"><h2>Tentang emas 22 dan 24 karat di Indonesia</h2><div class="prose">
<p><strong>Emas 24 karat</strong> (999) adalah emas paling murni dan di Indonesia paling dikenal lewat <strong>emas Antam</strong> — batangan dan kepingan resmi dari PT Aneka Tambang yang menjadi patokan harga nasional. <strong>Emas 22 karat</strong> banyak dipakai untuk perhiasan, sedangkan perhiasan toko emas sehari-hari sering memakai kadar 18 karat (750) atau lebih rendah.</p>
<p>Harga emas di Indonesia ditentukan oleh dua hal: harga troy ounce internasional (dalam dolar) dan kurs dolar/rupiah. Harga di toko ditambah ongkos pembuatan; harga di halaman ini adalah harga murni tanpa ongkos.</p>
<p>Halaman terkait: <a href="${url('en', 'indonesia')}">English version</a> · <a href="${url('id', 'harga-emas/22-karat')}">Harga emas 22 karat</a> · <a href="${url('en', 'gold-price-usd')}">Harga troy ounce (USD)</a>.</p>
</div></section>`,
      faq: [
        ['Berapa harga emas hari ini?', `1 gram emas 24 karat saat ini sekitar ${g24i} rupiah; harga terkini diperbarui di bagian atas halaman setiap 5 menit.`],
        ['Mengapa harga emas berubah setiap hari?', 'Harga emas tergantung pada harga troy ounce internasional (dolar) dan kurs dolar/rupiah. Jika keduanya berubah, harga dalam rupiah ikut berubah.'],
        ['Apa itu emas Antam?', 'Emas Antam adalah emas batangan resmi produksi PT Aneka Tambang (BUMN) dengan kemurnian 999.9, dan harga jual-belinya menjadi acuan pasar emas di Indonesia.']
      ] });
    for (const [k, n, s] of IDK) {
      const is2 = `harga-emas/${s}`, kt = idrG(k);
      out.push({ lang: 'id', fixed: true, slug: is2, usesFx: true, trEn: ID_EN[is2],
        alts: ID_ALTS(is2),
        crumbs: [['Harga emas', url('id', 'harga-emas')], [`Harga ${n.toLowerCase()}`, url('id', is2)]],
        title: `Harga Emas ${n} Hari Ini: 1 Gram = ${kt} Rupiah`,
        desc: `Harga emas ${n.toLowerCase()} terkini: per gram, 10 gram dan troy ounce dalam rupiah dan dolar, diperbarui setiap 5 menit. Harga murni tanpa ongkos pembuatan.`,
        body: `${hero(`Harga Emas ${n} Hari Ini`, `${kt} rupiah per gram — langsung`, 'id')}
${errBox}
<div class="meta-row"><span>Diperbarui: <strong>${updated('en')}</strong> (Dubai)</span><span>Troy ounce: <strong>${idP(k, ctx.TROY)} IDR</strong> · <strong>$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 Muat ulang</button></div>
<section class="card-section"><h2>Emas ${n.toLowerCase()} — harga menurut berat</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Berat</th><th>Harga (IDR)</th><th>Harga (USD)</th></tr></thead><tbody>
${[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => `<tr><td class="n">${w} gram</td><td class="n">${idP(k, w)}</td><td class="n">$${P(k, w, { cur: 'usd', d: 2 })}</td></tr>`).join('')}
<tr><td class="n">1 troy ounce (31.1 g)</td><td class="n">${idP(k, ctx.TROY)}</td><td class="n">$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</td></tr>
</tbody></table></div><p class="note">Harga murni tanpa ongkos pembuatan.</p></section>
${AD}
<section class="card-section"><h2>Karat lainnya</h2><div class="links-grid">
${IDK.filter(([k2]) => k2 !== k).map(([, n2, s2]) => `<a class="link-card" href="${url('id', 'harga-emas/' + s2)}">Harga emas ${n2.toLowerCase()}</a>`).join('')}
<a class="link-card" href="${url('id', 'harga-emas')}">Harga semua karat</a>
<a class="link-card" href="${url('en', ID_EN[is2])}">English version</a></div></section>`,
        faq: [
          [`Berapa harga emas ${n.toLowerCase()} hari ini?`, `1 gram emas ${n.toLowerCase()} saat ini sekitar ${kt} rupiah; harga terkini diperbarui setiap 5 menit.`],
          [`Bagaimana harga emas ${n.toLowerCase()} ditentukan?`, `Harga troy ounce internasional (dolar) dikonversi dengan kurs dolar/rupiah lalu dikalikan rasio kemurnian ${n.toLowerCase()}.`]
        ] });
    }
    for (const p2 of out) {
      const is2 = Object.keys(ID_EN).find(k2 => ID_EN[k2] === p2.slug);
      if (is2 && p2.lang === 'en') p2.alts = p2.alts ? [...p2.alts.filter(a => a[0] !== 'x-default'), ['id', url('id', is2)], ['x-default', url('en', p2.slug)]] : [['en', url('en', p2.slug)], ['id', url('id', is2)], ['x-default', url('en', p2.slug)]];
    }
  }

  // ── Bengali pilot: Bangladesh pages in Bengali (real content, hreflang-paired with en) ──
  {
    const bdtG = (k, w = 1) => ctx.g24 && ctx.fx.BDT ? fmt(ctx.g24 * k / 24 * w / ctx.AED * ctx.fx.BDT, 0) : null;
    const bnP = (k, w = 1, o = {}) => P(k, w, { cur: 'bdt', d: 0, ...o });
    const BNK = [[24, '২৪ ক্যারেট', '24-karat'], [22, '২২ ক্যারেট', '22-karat'], [21, '২১ ক্যারেট', '21-karat'], [18, '১৮ ক্যারেট', '18-karat']];
    const BN_EN = { 'sonar-dam': 'bangladesh', 'sonar-dam/24-karat': 'bangladesh/gold-24k', 'sonar-dam/22-karat': 'bangladesh/gold-22k', 'sonar-dam/21-karat': 'bangladesh/gold-21k', 'sonar-dam/18-karat': 'bangladesh/gold-18k' };
    const BN_ALTS = bs => [['bn', url('bn', bs)], ['en', url('en', BN_EN[bs])], ['x-default', url('en', BN_EN[bs])]];
    const g24b = bdtG(24), BHORI = 11.6638;
    out.push({ lang: 'bn', fixed: true, slug: 'sonar-dam', usesFx: true, trEn: 'bangladesh',
      alts: BN_ALTS('sonar-dam'),
      crumbs: [['আজকের সোনার দাম', url('bn', 'sonar-dam')]],
      title: `আজকের সোনার দাম: ${g24b} টাকা প্রতি গ্রাম — ২২ ও ২৪ ক্যারেট`,
      desc: 'আজকের সোনার সর্বশেষ দাম: ২৪, ২২, ২১ ও ১৮ ক্যারেট সোনার গ্রাম, ১০ গ্রাম, ভরি এবং আউন্সের দাম টাকা ও ডলারে, প্রতি ৫ মিনিটে হালনাগাদ।',
      body: `${hero('আজকের সোনার দাম', 'প্রতি গ্রামে টাকা (BDT) ও আমেরিকান ডলারে লাইভ দাম', 'bn')}
${errBox}
<div class="karat-grid">${BNK.map(([k, n, s]) => `<a class="karat-card" href="${url('bn', 'sonar-dam/' + s)}">
<span class="karat-badge">${n}</span>
<div class="k-price">${bnP(k)}</div>
<div class="k-usd">$${P(k, 1, { cur: 'usd', d: 2 })}</div>
<div class="k-unit">টাকা / গ্রাম</div></a>`).join('')}</div>
<div class="meta-row"><span>হালনাগাদ: <strong>${updated('en')}</strong> (দুবাই)</span><span>আউন্স: <strong>${bnP(24, ctx.TROY)} টাকা</strong> · <strong>$${P(24, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 রিফ্রেশ</button></div>
<section class="card-section"><h2>আজ সোনার দাম — গ্রাম, ১০ গ্রাম, ভরি ও আউন্স</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>ক্যারেট</th><th>১ গ্রাম (টাকা)</th><th>১০ গ্রাম (টাকা)</th><th>১ ভরি (টাকা)</th><th>১ আউন্স (টাকা)</th></tr></thead><tbody>
${BNK.map(([k, n]) => `<tr><td><strong>${n}</strong></td><td class="n">${bnP(k)}</td><td class="n">${bnP(k, 10)}</td><td class="n">${bnP(k, BHORI)}</td><td class="n">${bnP(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">মজুরি ছাড়া খাঁটি সোনার দাম। ১ ভরি = ১১.৬৬৪ গ্রাম · ১ আউন্স = ৩১.১০৩৫ গ্রাম।</p></section>
${AD}
<section class="card-section"><h2>২২ ও ২৪ ক্যারেট সোনা সম্পর্কে</h2><div class="prose">
<p><strong>২৪ ক্যারেট সোনা</strong> (৯৯৯ খাঁটি) সবচেয়ে বিশুদ্ধ সোনা এবং বাংলাদেশে মূলত বার ও কয়েন আকারে সঞ্চয়ের জন্য কেনা হয়। <strong>২২ ক্যারেট</strong> (৯১৬) গহনার মান — তাই বাজুস (BAJUS) ঘোষিত দৈনিক দর সাধারণত ২২ ক্যারেটের জন্যই হয়।</p>
<p>বাংলাদেশে সোনার দাম দুটি বিষয়ের ওপর নির্ভর করে: আন্তর্জাতিক আউন্স মূল্য (ডলারে) এবং ডলার/টাকা বিনিময় হার। দোকানে চূড়ান্ত দামে মজুরি ও ভ্যাট যোগ হয়; এখানে দেখানো দাম মজুরি ছাড়া খাঁটি মূল্য।</p>
<p>সম্পর্কিত পাতা: <a href="${url('en', 'bangladesh')}">English version</a> · <a href="${url('bn', 'sonar-dam/22-karat')}">২২ ক্যারেট সোনার দাম</a> · <a href="${url('en', 'gold-price-usd')}">আউন্সের দাম (USD)</a>.</p>
</div></section>`,
      faq: [
        ['আজ সোনার দাম কত?', `১ গ্রাম ২৪ ক্যারেট সোনার দাম এখন প্রায় ${g24b} টাকা; সর্বশেষ দাম উপরে প্রতি ৫ মিনিটে হালনাগাদ হয়।`],
        ['সোনার দাম প্রতিদিন কেন বদলায়?', 'সোনার দাম নির্ভর করে আন্তর্জাতিক আউন্স মূল্য (ডলার) এবং ডলার/টাকা বিনিময় হারের ওপর। দুটো বদলালে টাকায় দামও বদলায়।'],
        ['১ ভরি কত গ্রাম?', '১ ভরি = ১১.৬৬৪ গ্রাম। বাংলাদেশে সোনা সাধারণত ভরি ও গ্রামে মাপা হয়।']
      ] });
    for (const [k, n, s] of BNK) {
      const bs = `sonar-dam/${s}`, kt = bdtG(k);
      out.push({ lang: 'bn', fixed: true, slug: bs, usesFx: true, trEn: BN_EN[bs],
        alts: BN_ALTS(bs),
        crumbs: [['সোনার দাম', url('bn', 'sonar-dam')], [`${n} দাম`, url('bn', bs)]],
        title: `${n} সোনার দাম আজ: ১ গ্রাম = ${kt} টাকা`,
        desc: `${n} সোনার সর্বশেষ দাম: গ্রাম, ১০ গ্রাম, ভরি ও আউন্সে টাকা ও ডলার, প্রতি ৫ মিনিটে হালনাগাদ। মজুরি ছাড়া খাঁটি দাম।`,
        body: `${hero(`${n} সোনার দাম আজ`, `প্রতি গ্রাম ${kt} টাকা — লাইভ`, 'bn')}
${errBox}
<div class="meta-row"><span>হালনাগাদ: <strong>${updated('en')}</strong> (দুবাই)</span><span>আউন্স: <strong>${bnP(k, ctx.TROY)} টাকা</strong> · <strong>$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 রিফ্রেশ</button></div>
<section class="card-section"><h2>${n} সোনা — ওজন অনুযায়ী দাম</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>ওজন</th><th>দাম (টাকা)</th><th>দাম (USD)</th></tr></thead><tbody>
${[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => `<tr><td class="n">${w} গ্রাম</td><td class="n">${bnP(k, w)}</td><td class="n">$${P(k, w, { cur: 'usd', d: 2 })}</td></tr>`).join('')}
<tr><td class="n">১ ভরি (১১.৬৬ গ্রাম)</td><td class="n">${bnP(k, BHORI)}</td><td class="n">$${P(k, BHORI, { cur: 'usd', d: 2 })}</td></tr>
<tr><td class="n">১ আউন্স (৩১.১ গ্রাম)</td><td class="n">${bnP(k, ctx.TROY)}</td><td class="n">$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</td></tr>
</tbody></table></div><p class="note">মজুরি ছাড়া খাঁটি দাম।</p></section>
${AD}
<section class="card-section"><h2>অন্যান্য ক্যারেট</h2><div class="links-grid">
${BNK.filter(([k2]) => k2 !== k).map(([, n2, s2]) => `<a class="link-card" href="${url('bn', 'sonar-dam/' + s2)}">${n2} সোনার দাম</a>`).join('')}
<a class="link-card" href="${url('bn', 'sonar-dam')}">সব ক্যারেটের দাম</a>
<a class="link-card" href="${url('en', BN_EN[bs])}">English version</a></div></section>`,
        faq: [
          [`${n} সোনার দাম আজ কত?`, `১ গ্রাম ${n} সোনার দাম এখন প্রায় ${kt} টাকা; সর্বশেষ দাম প্রতি ৫ মিনিটে হালনাগাদ হয়।`],
          [`${n} সোনার দাম কীভাবে নির্ধারিত হয়?`, `আন্তর্জাতিক আউন্স মূল্য (ডলার) ডলার/টাকা হারে রূপান্তর করে ${n} বিশুদ্ধতার অনুপাত প্রয়োগ করা হয়।`]
        ] });
    }
    for (const p2 of out) {
      const bs = Object.keys(BN_EN).find(k2 => BN_EN[k2] === p2.slug);
      if (bs && p2.lang === 'en') p2.alts = p2.alts ? [...p2.alts.filter(a => a[0] !== 'x-default'), ['bn', url('bn', bs)], ['x-default', url('en', p2.slug)]] : [['en', url('en', p2.slug)], ['bn', url('bn', bs)], ['x-default', url('en', p2.slug)]];
    }
  }

  // ── Filipino pilot: Philippines pages in Filipino (real content, hreflang-paired with en) ──
  {
    const phpG = (k, w = 1) => ctx.g24 && ctx.fx.PHP ? fmt(ctx.g24 * k / 24 * w / ctx.AED * ctx.fx.PHP, 0) : null;
    const tlP = (k, w = 1, o = {}) => P(k, w, { cur: 'php', d: 0, ...o });
    const TLK = [[24, '24 karat', '24-karat'], [22, '22 karat', '22-karat'], [21, '21 karat', '21-karat'], [18, '18 karat', '18-karat']];
    const TL_EN = { 'presyo-ng-ginto': 'philippines', 'presyo-ng-ginto/24-karat': 'philippines/gold-24k', 'presyo-ng-ginto/22-karat': 'philippines/gold-22k', 'presyo-ng-ginto/21-karat': 'philippines/gold-21k', 'presyo-ng-ginto/18-karat': 'philippines/gold-18k' };
    const TL_ALTS = ts => [['tl', url('tl', ts)], ['en', url('en', TL_EN[ts])], ['x-default', url('en', TL_EN[ts])]];
    const g24t = phpG(24);
    out.push({ lang: 'tl', fixed: true, slug: 'presyo-ng-ginto', usesFx: true, trEn: 'philippines',
      alts: TL_ALTS('presyo-ng-ginto'),
      crumbs: [['Presyo ng ginto', url('tl', 'presyo-ng-ginto')]],
      title: `Presyo ng Ginto Ngayon: ₱${g24t} kada Gramo — 22 at 24 Karat`,
      desc: 'Pinakabagong presyo ng ginto: 24, 22, 21 at 18 karat na ginto kada gramo, 10 gramo at onsa, sa piso at dolyar, ina-update kada 5 minuto.',
      body: `${hero('Presyo ng Ginto Ngayon', 'Live na presyo kada gramo sa piso (PHP) at dolyar ng Amerika', 'tl')}
${errBox}
<div class="karat-grid">${TLK.map(([k, n, s]) => `<a class="karat-card" href="${url('tl', 'presyo-ng-ginto/' + s)}">
<span class="karat-badge">${n}</span>
<div class="k-price">${tlP(k)}</div>
<div class="k-usd">$${P(k, 1, { cur: 'usd', d: 2 })}</div>
<div class="k-unit">piso / gramo</div></a>`).join('')}</div>
<div class="meta-row"><span>Na-update: <strong>${updated('en')}</strong> (Dubai)</span><span>Onsa: <strong>₱${tlP(24, ctx.TROY)}</strong> · <strong>$${P(24, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 I-refresh</button></div>
<section class="card-section"><h2>Presyo ng ginto ngayon — gramo, 10 gramo at onsa</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Karat</th><th>1 gramo (₱)</th><th>10 gramo (₱)</th><th>1 onsa (₱)</th></tr></thead><tbody>
${TLK.map(([k, n]) => `<tr><td><strong>${n}</strong></td><td class="n">${tlP(k)}</td><td class="n">${tlP(k, 10)}</td><td class="n">${tlP(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">Purong presyo ng ginto, walang making charge. 1 onsa = 31.1035 gramo.</p></section>
${AD}
<section class="card-section"><h2>Tungkol sa 22 at 24 karat na ginto sa Pilipinas</h2><div class="prose">
<p><strong>Ang 24 karat na ginto</strong> (999 puro) ang pinakadalisay na ginto at karaniwang binibili bilang bar o barya para sa ipon. <strong>Ang 22 at 21 karat</strong> naman ang karaniwang ginagamit sa alahas — kilala sa Pilipinas ang tinatawag na “Saudi gold” na kadalasang 21K o 18K.</p>
<p>Ang presyo ng ginto sa Pilipinas ay nakadepende sa dalawang bagay: ang internasyonal na presyo ng onsa (sa dolyar) at ang palitan ng dolyar at piso. Ang mga pawnshop tulad ng Cebuana Lhuillier at Palawan Pawnshop ay araw-araw naglalabas ng kanilang bilihan at sanglaan rate; ang presyo rito ay purong halaga ng ginto, walang making charge.</p>
<p>Kaugnay na pahina: <a href="${url('en', 'philippines')}">English version</a> · <a href="${url('tl', 'presyo-ng-ginto/22-karat')}">Presyo ng 22 karat na ginto</a> · <a href="${url('en', 'gold-price-usd')}">Presyo ng onsa (USD)</a>.</p>
</div></section>`,
      faq: [
        ['Magkano ang presyo ng ginto ngayon?', `Ang 1 gramo ng 24 karat na ginto ay humigit-kumulang ₱${g24t} ngayon; ang pinakabagong presyo ay ina-update kada 5 minuto sa itaas.`],
        ['Bakit nagbabago ang presyo ng ginto araw-araw?', 'Nakadepende ang presyo ng ginto sa internasyonal na presyo ng onsa (dolyar) at sa palitan ng USD/PHP. Kapag gumalaw ang alinman sa dalawa, gumagalaw din ang presyo sa piso.'],
        ['Ano ang pagkakaiba ng 18K, 21K, 22K at 24K?', 'Ang karat ang sukatan ng kadalisayan: 24K = 99.9% puro, 22K = 91.6%, 21K = 87.5%, at 18K = 75%. Mas mataas ang karat, mas mahal ang kada gramo.']
      ] });
    for (const [k, n, s] of TLK) {
      const ts = `presyo-ng-ginto/${s}`, kt = phpG(k);
      out.push({ lang: 'tl', fixed: true, slug: ts, usesFx: true, trEn: TL_EN[ts],
        alts: TL_ALTS(ts),
        crumbs: [['Presyo ng ginto', url('tl', 'presyo-ng-ginto')], [`${n} na ginto`, url('tl', ts)]],
        title: `Presyo ng ${n} na Ginto Ngayon: 1 Gramo = ₱${kt}`,
        desc: `Pinakabagong presyo ng ${n} na ginto: kada gramo, 10 gramo at onsa, sa piso at dolyar, ina-update kada 5 minuto. Purong presyo, walang making charge.`,
        body: `${hero(`Presyo ng ${n} na Ginto Ngayon`, `₱${kt} kada gramo — live`, 'tl')}
${errBox}
<div class="meta-row"><span>Na-update: <strong>${updated('en')}</strong> (Dubai)</span><span>Onsa: <strong>₱${tlP(k, ctx.TROY)}</strong> · <strong>$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 I-refresh</button></div>
<section class="card-section"><h2>${n} na ginto — presyo ayon sa timbang</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Timbang</th><th>Presyo (₱)</th><th>Presyo (USD)</th></tr></thead><tbody>
${[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => `<tr><td class="n">${w} gramo</td><td class="n">${tlP(k, w)}</td><td class="n">$${P(k, w, { cur: 'usd', d: 2 })}</td></tr>`).join('')}
<tr><td class="n">1 onsa (31.1 g)</td><td class="n">${tlP(k, ctx.TROY)}</td><td class="n">$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</td></tr>
</tbody></table></div><p class="note">Purong presyo, walang making charge.</p></section>
${AD}
<section class="card-section"><h2>Iba pang karat</h2><div class="links-grid">
${TLK.filter(([k2]) => k2 !== k).map(([, n2, s2]) => `<a class="link-card" href="${url('tl', 'presyo-ng-ginto/' + s2)}">Presyo ng ${n2} na ginto</a>`).join('')}
<a class="link-card" href="${url('tl', 'presyo-ng-ginto')}">Presyo ng lahat ng karat</a>
<a class="link-card" href="${url('en', TL_EN[ts])}">English version</a></div></section>`,
        faq: [
          [`Magkano ang presyo ng ${n} na ginto ngayon?`, `Ang 1 gramo ng ${n} na ginto ay humigit-kumulang ₱${kt} ngayon; ina-update ang presyo kada 5 minuto.`],
          [`Paano nakukuha ang presyo ng ${n} na ginto?`, `Ang internasyonal na presyo ng onsa (dolyar) ay kino-convert gamit ang palitan ng USD/PHP, pagkatapos ay minumultiply sa ratio ng kadalisayan ng ${n}.`]
        ] });
    }
    for (const p2 of out) {
      const ts = Object.keys(TL_EN).find(k2 => TL_EN[k2] === p2.slug);
      if (ts && p2.lang === 'en') p2.alts = p2.alts ? [...p2.alts.filter(a => a[0] !== 'x-default'), ['tl', url('tl', ts)], ['x-default', url('en', p2.slug)]] : [['en', url('en', p2.slug)], ['tl', url('tl', ts)], ['x-default', url('en', p2.slug)]];
    }
  }

  // ── Malay pilot: Malaysia pages in Malay (real content, hreflang-paired with en) ──
  {
    const myrG = (k, w = 1) => ctx.g24 && ctx.fx.MYR ? fmt(ctx.g24 * k / 24 * w / ctx.AED * ctx.fx.MYR, 2) : null;
    const msP = (k, w = 1, o = {}) => P(k, w, { cur: 'myr', d: 2, ...o });
    const MSK = [[24, '999 (24 karat)', '24-karat'], [22, '916 (22 karat)', '22-karat'], [21, '875 (21 karat)', '21-karat'], [18, '750 (18 karat)', '18-karat']];
    const MS_EN = { 'harga-emas': 'malaysia', 'harga-emas/24-karat': 'malaysia/gold-24k', 'harga-emas/22-karat': 'malaysia/gold-22k', 'harga-emas/21-karat': 'malaysia/gold-21k', 'harga-emas/18-karat': 'malaysia/gold-18k' };
    const MS_ALTS = ms2 => [['ms', url('ms', ms2)], ['en', url('en', MS_EN[ms2])], ['x-default', url('en', MS_EN[ms2])]];
    const g24m = myrG(24);
    out.push({ lang: 'ms', fixed: true, slug: 'harga-emas', usesFx: true, trEn: 'malaysia',
      alts: MS_ALTS('harga-emas'),
      crumbs: [['Harga emas', url('ms', 'harga-emas')]],
      title: `Harga Emas Hari Ini: RM${g24m} Segram — Emas 916 & 999`,
      desc: 'Harga emas terkini: emas 999, 916, 875 dan 750 segram, 10 gram dan auns, dalam ringgit dan dolar, dikemas kini setiap 5 minit.',
      body: `${hero('Harga Emas Hari Ini', 'Harga langsung segram dalam ringgit (MYR) dan dolar Amerika', 'ms')}
${errBox}
<div class="karat-grid">${MSK.map(([k, n, s]) => `<a class="karat-card" href="${url('ms', 'harga-emas/' + s)}">
<span class="karat-badge">${n}</span>
<div class="k-price">${msP(k)}</div>
<div class="k-usd">$${P(k, 1, { cur: 'usd', d: 2 })}</div>
<div class="k-unit">RM / gram</div></a>`).join('')}</div>
<div class="meta-row"><span>Dikemas kini: <strong>${updated('en')}</strong> (Dubai)</span><span>Auns: <strong>RM${msP(24, ctx.TROY)}</strong> · <strong>$${P(24, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 Muat semula</button></div>
<section class="card-section"><h2>Harga emas hari ini — gram, 10 gram dan auns</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Karat</th><th>1 gram (RM)</th><th>10 gram (RM)</th><th>1 auns (RM)</th></tr></thead><tbody>
${MSK.map(([k, n]) => `<tr><td><strong>${n}</strong></td><td class="n">${msP(k)}</td><td class="n">${msP(k, 10)}</td><td class="n">${msP(k, ctx.TROY)}</td></tr>`).join('')}
</tbody></table></div><p class="note">Harga emas tulen tanpa upah. 1 auns = 31.1035 gram.</p></section>
${AD}
<section class="card-section"><h2>Tentang emas 916 dan 999 di Malaysia</h2><div class="prose">
<p><strong>Emas 999</strong> (24 karat) ialah emas paling tulen dan biasanya dibeli sebagai jongkong atau dinar untuk simpanan. <strong>Emas 916</strong> (22 karat) pula menjadi standard barang kemas di Malaysia, manakala <strong>emas 750</strong> (18 karat) popular untuk barang kemas fesyen.</p>
<p>Harga emas di Malaysia bergantung pada dua perkara: harga auns antarabangsa (dalam dolar) dan kadar tukaran dolar/ringgit. Kedai emas menambah upah pada harga akhir; harga di halaman ini ialah harga tulen tanpa upah.</p>
<p>Halaman berkaitan: <a href="${url('en', 'malaysia')}">English version</a> · <a href="${url('ms', 'harga-emas/22-karat')}">Harga emas 916</a> · <a href="${url('en', 'gold-price-usd')}">Harga auns (USD)</a>.</p>
</div></section>`,
      faq: [
        ['Berapa harga emas hari ini?', `1 gram emas 999 kini sekitar RM${g24m}; harga terkini dikemas kini di bahagian atas halaman setiap 5 minit.`],
        ['Mengapa harga emas berubah setiap hari?', 'Harga emas bergantung pada harga auns antarabangsa (dolar) dan kadar tukaran USD/MYR. Apabila kedua-duanya berubah, harga dalam ringgit turut berubah.'],
        ['Apa itu emas 916?', 'Emas 916 ialah emas 22 karat dengan ketulenan 91.6%, dan ia merupakan standard barang kemas yang paling lazim di Malaysia.']
      ] });
    for (const [k, n, s] of MSK) {
      const ms2 = `harga-emas/${s}`, kt = myrG(k);
      out.push({ lang: 'ms', fixed: true, slug: ms2, usesFx: true, trEn: MS_EN[ms2],
        alts: MS_ALTS(ms2),
        crumbs: [['Harga emas', url('ms', 'harga-emas')], [`Harga emas ${n}`, url('ms', ms2)]],
        title: `Harga Emas ${n} Hari Ini: 1 Gram = RM${kt}`,
        desc: `Harga emas ${n} terkini: segram, 10 gram dan auns, dalam ringgit dan dolar, dikemas kini setiap 5 minit. Harga tulen tanpa upah.`,
        body: `${hero(`Harga Emas ${n} Hari Ini`, `RM${kt} segram — langsung`, 'ms')}
${errBox}
<div class="meta-row"><span>Dikemas kini: <strong>${updated('en')}</strong> (Dubai)</span><span>Auns: <strong>RM${msP(k, ctx.TROY)}</strong> · <strong>$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</strong></span><button class="btn-sm" id="refresh" type="button">🔄 Muat semula</button></div>
<section class="card-section"><h2>Emas ${n} — harga mengikut berat</h2><div class="table-wrap"><table class="data-table">
<thead><tr><th>Berat</th><th>Harga (RM)</th><th>Harga (USD)</th></tr></thead><tbody>
${[1, 2, 4, 5, 8, 10, 20, 50, 100].map(w => `<tr><td class="n">${w} gram</td><td class="n">${msP(k, w)}</td><td class="n">$${P(k, w, { cur: 'usd', d: 2 })}</td></tr>`).join('')}
<tr><td class="n">1 auns (31.1 g)</td><td class="n">${msP(k, ctx.TROY)}</td><td class="n">$${P(k, ctx.TROY, { cur: 'usd', d: 2 })}</td></tr>
</tbody></table></div><p class="note">Harga tulen tanpa upah.</p></section>
${AD}
<section class="card-section"><h2>Karat lain</h2><div class="links-grid">
${MSK.filter(([k2]) => k2 !== k).map(([, n2, s2]) => `<a class="link-card" href="${url('ms', 'harga-emas/' + s2)}">Harga emas ${n2}</a>`).join('')}
<a class="link-card" href="${url('ms', 'harga-emas')}">Harga semua karat</a>
<a class="link-card" href="${url('en', MS_EN[ms2])}">English version</a></div></section>`,
        faq: [
          [`Berapa harga emas ${n} hari ini?`, `1 gram emas ${n} kini sekitar RM${kt}; harga dikemas kini setiap 5 minit.`],
          [`Bagaimana harga emas ${n} ditentukan?`, `Harga auns antarabangsa (dolar) ditukar mengikut kadar USD/MYR kemudian didarab dengan nisbah ketulenan emas ${n}.`]
        ] });
    }
    for (const p2 of out) {
      const ms2 = Object.keys(MS_EN).find(k2 => MS_EN[k2] === p2.slug);
      if (ms2 && p2.lang === 'en') p2.alts = p2.alts ? [...p2.alts.filter(a => a[0] !== 'x-default'), ['ms', url('ms', ms2)], ['x-default', url('en', p2.slug)]] : [['en', url('en', p2.slug)], ['ms', url('ms', ms2)], ['x-default', url('en', p2.slug)]];
    }
  }

  // ── صفحات خاصة (خارج الـ sitemap) ─────────────────────
  // ── المقالات التعليمية ─────────────────────────────────
  out.push({ lang: 'ar', fixed: true, slug: 'articles',
    title: 'مقالات الذهب: أدلة الشراء والادخار والزكاة | معلوماتي',
    desc: 'مقالات تعليمية مبسطة عن الذهب: كيف يُحسب السعر، الفرق بين العيارات، المصنعية، السبائك أم المشغولات، زكاة الذهب، ومتى تشتري.',
    crumbs: [['مقالات الذهب', '/articles/']],
    body: `<div class="hero"><h1>مقالات وأدلة الذهب</h1><p class="hero-sub">شروحات مبسطة تساعدك تشتري وتدخر في الذهب بفهم</p></div>
${articleLibrary(ARTICLES,'ar')}
${links('ar', 'articles')}` });
  for (const a of ARTICLES) {
    const reading = articleBody(a,'ar');
    out.push({ lang: 'ar', fixed: true, ...(a.paired?{alt:true}:{}), slug: `articles/${a.slug}`,
      title: a.title, desc: a.desc, lastmod: a.dateModified || a.datePublished || '2026-11-22',
      crumbs: [['مقالات الذهب', '/articles/'], [a.h1, `/articles/${a.slug}/`]],
      body: `<div class="hero"><h1>${a.h1}</h1><p class="hero-sub">${a.intro}</p></div>
<article class="card-section">${reading.date}${reading.toc}<div class="prose">${reading.body}</div></article>
<section class="card-section"><h2>مقالات أخرى</h2><div class="links-grid related-articles">${relatedArticles(a,ARTICLES,'ar')}</div></section>
<p class="all-guides"><a href="/articles/">تصفح كل الأدلة</a></p>
${share('ar', `articles/${a.slug}`, a.h1)}`,
      faq: a.faq,
      schema: [{ '@context': 'https://schema.org', '@type': 'Article', headline: a.h1, description: a.desc,
        datePublished: a.datePublished || '2026-11-22', dateModified: a.dateModified || a.datePublished || '2026-11-22', inLanguage: 'ar',
        author: { '@type': 'Organization', name: 'Maelumatii', url: ctx.SITE + '/' },
        mainEntityOfPage: ctx.SITE + `/articles/${a.slug}/` }]
    });
  }

  // ── المقالات الإنجليزية (دليل لكل سوق كبير) ──────────────
  out.push({ lang: 'en', fixed: true, slug: 'articles',
    title: 'Gold Guides: Karats, Prices and Buying Tips | Maelumatii',
    desc: 'Plain-English gold guides for 40 markets: why prices rise, karats and local units explained, and how to buy well in your country.',
    crumbs: [['Gold articles', '/en/articles/']],
    body: `<div class="hero"><h1>Gold Guides & Articles</h1><p class="hero-sub">Plain-English guides to help you buy and save in gold with confidence</p></div>
${articleLibrary(ARTICLES_EN,'en')}
${links('en', 'articles')}` });
  for (const a of ARTICLES_EN) {
    const reading = articleBody(a,'en');
    out.push({ lang: 'en', fixed: true, ...(a.paired?{alt:true}:{}), slug: `articles/${a.slug}`,
      title: a.title, desc: a.desc, lastmod: a.dateModified || a.datePublished || '2026-11-22',
      crumbs: [['Gold articles', '/en/articles/'], [a.h1, `/en/articles/${a.slug}/`]],
      body: `<div class="hero"><h1>${a.h1}</h1><p class="hero-sub">${a.intro}</p></div>
<article class="card-section">${reading.date}${reading.toc}<div class="prose">${reading.body}</div></article>
<section class="card-section"><h2>More articles</h2><div class="links-grid related-articles">${relatedArticles(a,ARTICLES_EN,'en')}</div></section>
<p class="all-guides"><a href="/en/articles/">Browse all guides</a></p>
${share('en', `articles/${a.slug}`, a.h1)}`,
      faq: a.faq,
      schema: [{ '@context': 'https://schema.org', '@type': 'Article', headline: a.h1, description: a.desc,
        datePublished: a.datePublished || '2026-11-22', dateModified: a.dateModified || a.datePublished || '2026-11-22', inLanguage: 'en',
        author: { '@type': 'Organization', name: 'Maelumatii', url: ctx.SITE + '/' },
        mainEntityOfPage: ctx.SITE + `/en/articles/${a.slug}/` }]
    });
  }

  out.push({ lang: 'ar', fixed: true, slug: '404', file: '404.html', noindex: true,
    title: 'الصفحة غير موجودة | Page not found', desc: 'الصفحة غير موجودة',
    body: `<div class="hero"><h1>الصفحة غير موجودة</h1><p class="hero-sub">Page not found — <a href="/en/">go to the English site</a></p></div>
<section class="card-section"><p class="prose">ربما نُقلت الصفحة أو حُذفت. يمكنك متابعة <a href="/">سعر الذهب اليوم في الإمارات</a> أو استخدام الروابط التالية.</p></section>${links('ar', '')}` });
  out.push({ lang: 'ar', fixed: true, slug: 'offline', file: 'offline.html', noindex: true, noAds: true,
    title: 'لا يوجد اتصال | Offline', desc: 'لا يوجد اتصال بالإنترنت',
    body: `<div class="hero"><h1>لا يوجد اتصال بالإنترنت</h1><p class="hero-sub">You are offline — prices will refresh when you reconnect.</p></div>
<section class="card-section"><p class="prose">افتح <a href="/">الصفحة الرئيسية</a> لعرض آخر سعر محفوظ على جهازك.</p></section>` });

  for(const p of out){
    if(['tr','hi','ur','id','bn','tl','ms'].includes(p.lang)){
      const match=p.slug.match(/(?:^|\/)(24|22|21|18)-(?:karat|ayar-altin)$/);
      const guide=pilotGuide(p.lang,match?+match[1]:0);
      p.body=p.body.replace('</section>','</section>'+guide);
    }
  }
  return out;
}
