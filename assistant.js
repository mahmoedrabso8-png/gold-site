/* مساعد الذهب — محرك إجابات يعمل بالكامل داخل المتصفح (بدون خادم وبدون مفاتيح)
   يجيب عن أسعار الذهب والعملات من الأسعار الحية (Gold-API + open.er-api) */
(function () {
'use strict';
const AR = document.documentElement.lang === 'ar';
const TROY = 31.1035, AED = 3.6725;
const DIG = '٠١٢٣٤٥٦٧٨٩';

/* ── أسعار الصرف: الربط الثابت مقابل الدولار لما لا يرد في __FX ── */
const PEG = { USD: 1, AED: 3.6725, SAR: 3.75, QAR: 3.64, OMR: 0.3845, BHD: 0.376, JOD: 0.709 };
let FX = Object.assign({}, PEG, window.__FX || {});
let G24_USD = window.__G ? window.__G / AED : null;   // غرام 24 بالدولار
let AG_USD = window.__AG ? window.__AG / AED : null;  // غرام الفضة بالدولار
let PRICE_AT = null;

/* ── الدول: slug، عملة، كسور، أسماء/ألقاب، العيار الشائع، المقال ── */
const CS = [
  ['uae', 'AED', 2, ['الإمارات', 'الامارات', 'امارات', 'دبي', 'ابوظبي', 'أبوظبي', 'uae', 'dubai', 'emirates', 'abu dhabi'], 21, null, 'الإمارات', 'UAE'],
  ['saudi', 'SAR', 2, ['السعودية', 'السعوديه', 'سعودي', 'الرياض', 'جدة', 'saudi', 'riyadh', 'jeddah', 'ksa'], 21, 'buying-gold-saudi-arabia', 'السعودية', 'Saudi Arabia'],
  ['kuwait', 'KWD', 3, ['الكويت', 'كويتي', 'kuwait', 'kuwaiti'], 21, 'buying-gold-kuwait', 'الكويت', 'Kuwait'],
  ['qatar', 'QAR', 2, ['قطر', 'قطري', 'الدوحة', 'qatar', 'doha'], 21, 'buying-gold-qatar', 'قطر', 'Qatar'],
  ['oman', 'OMR', 3, ['عمان', 'عُمان', 'عماني', 'مسقط', 'oman', 'muscat'], 21, 'buying-gold-oman', 'عُمان', 'Oman'],
  ['bahrain', 'BHD', 3, ['البحرين', 'بحريني', 'المنامة', 'bahrain', 'manama'], 21, 'buying-gold-bahrain', 'البحرين', 'Bahrain'],
  ['egypt', 'EGP', 2, ['مصر', 'مصري', 'مصريه', 'القاهرة', 'egypt', 'egyptian', 'cairo'], 21, 'why-gold-rises-egypt', 'مصر', 'Egypt'],
  ['iraq', 'IQD', 0, ['العراق', 'عراقي', 'بغداد', 'iraq', 'iraqi', 'baghdad'], 21, 'gold-iraq-21k-mithqal', 'العراق', 'Iraq'],
  ['jordan', 'JOD', 3, ['الأردن', 'الاردن', 'أردني', 'اردني', 'عمان الاردن', 'jordan', 'amman'], 21, 'buying-gold-jordan', 'الأردن', 'Jordan'],
  ['morocco', 'MAD', 2, ['المغرب', 'مغربي', 'morocco', 'moroccan', 'casablanca'], 18, 'gold-morocco-18k', 'المغرب', 'Morocco'],
  ['algeria', 'DZD', 0, ['الجزائر', 'جزائري', 'algeria', 'algerian', 'algiers'], 18, 'gold-algeria-18k', 'الجزائر', 'Algeria'],
  ['tunisia', 'TND', 2, ['تونس', 'تونسي', 'tunisia', 'tunisian', 'tunis'], 18, 'gold-tunisia-18k', 'تونس', 'Tunisia'],
  ['libya', 'LYD', 2, ['ليبيا', 'ليبي', 'طرابلس', 'libya', 'libyan', 'tripoli'], 21, 'gold-libya-21k', 'ليبيا', 'Libya'],
  ['yemen', 'YER', 0, ['اليمن', 'يمني', 'صنعاء', 'عدن', 'yemen', 'yemeni', 'sanaa', 'aden'], 21, 'gold-yemen-21k', 'اليمن', 'Yemen'],
  ['lebanon', 'LBP', 0, ['لبنان', 'لبناني', 'بيروت', 'lebanon', 'lebanese', 'beirut'], 21, 'gold-lebanon-dollar-pricing', 'لبنان', 'Lebanon'],
  ['india', 'INR', 0, ['الهند', 'هندي', 'مومباي', 'دلهي', 'india', 'indian', 'mumbai', 'delhi'], 22, 'why-gold-rises-india', 'الهند', 'India'],
  ['pakistan', 'PKR', 0, ['باكستان', 'باكستاني', 'كراتشي', 'لاهور', 'pakistan', 'pakistani', 'karachi', 'lahore'], 22, 'why-gold-rises-pakistan', 'باكستان', 'Pakistan'],
  ['bangladesh', 'BDT', 0, ['بنجلاديش', 'بنغلاديش', 'بنجلاديشي', 'دكا', 'bangladesh', 'dhaka'], 22, 'why-gold-rises-bangladesh', 'بنجلاديش', 'Bangladesh'],
  ['nepal', 'NPR', 0, ['نيبال', 'نيبالي', 'nepal', 'nepali', 'kathmandu'], 22, 'why-gold-rises-nepal', 'نيبال', 'Nepal'],
  ['srilanka', 'LKR', 0, ['سريلانكا', 'سيرلانكا', 'سريلانكي', 'كولومبو', 'sri lanka', 'srilanka', 'colombo'], 22, 'why-gold-rises-srilanka', 'سريلانكا', 'Sri Lanka'],
  ['turkey', 'TRY', 2, ['تركيا', 'تركي', 'اسطنبول', 'إسطنبول', 'turkey', 'turkish', 'istanbul'], 22, 'why-gold-rises-turkey', 'تركيا', 'Turkey'],
  ['malaysia', 'MYR', 2, ['ماليزيا', 'ماليزي', 'كوالالمبور', 'malaysia', 'malaysian', 'kuala lumpur'], 22, 'emas-916-vs-999-malaysia', 'ماليزيا', 'Malaysia'],
  ['indonesia', 'IDR', 0, ['إندونيسيا', 'اندونيسيا', 'إندونيسي', 'جاكرتا', 'indonesia', 'indonesian', 'jakarta'], 22, 'why-gold-rises-indonesia', 'إندونيسيا', 'Indonesia'],
  ['thailand', 'THB', 2, ['تايلاند', 'تايلند', 'تايلاندي', 'بانكوك', 'thailand', 'thai', 'bangkok'], 23, 'thai-gold-baht-purity-guide', 'تايلاند', 'Thailand'],
  ['vietnam', 'VND', 0, ['فيتنام', 'فيتنامي', 'هانوي', 'vietnam', 'vietnamese', 'hanoi'], 24, 'vietnam-gold-sjc-tael-guide', 'فيتنام', 'Vietnam'],
  ['singapore', 'SGD', 2, ['سنغافورة', 'سنغافوري', 'singapore'], 24, 'buying-gold-singapore-gst-free', 'سنغافورة', 'Singapore'],
  ['philippines', 'PHP', 0, ['الفلبين', 'فلبيني', 'مانيلا', 'philippines', 'filipino', 'manila'], 21, '21k-vs-24k-gold-philippines', 'الفلبين', 'Philippines'],
  ['japan', 'JPY', 0, ['اليابان', 'ياباني', 'طوكيو', 'japan', 'japanese', 'tokyo'], 24, 'why-gold-rises-japan', 'اليابان', 'Japan'],
  ['china', 'CNY', 2, ['الصين', 'صيني', 'بكين', 'شنغهاي', 'china', 'chinese', 'beijing', 'shanghai'], 24, 'gold-china-999-shanghai-premium', 'الصين', 'China'],
  ['germany', 'EUR', 2, ['ألمانيا', 'المانيا', 'ألماني', 'برلين', 'germany', 'german', 'berlin'], 24, 'buying-gold-germany-vat-free', 'ألمانيا', 'Germany'],
  ['france', 'EUR', 2, ['فرنسا', 'فرنسي', 'باريس', 'france', 'french', 'paris'], 18, 'gold-france-napoleon-18k', 'فرنسا', 'France'],
  ['italy', 'EUR', 2, ['إيطاليا', 'ايطاليا', 'إيطالي', 'روما', 'ميلانو', 'italy', 'italian', 'rome', 'milan'], 18, 'gold-italy-18k-standard', 'إيطاليا', 'Italy'],
  ['spain', 'EUR', 2, ['إسبانيا', 'اسبانيا', 'إسباني', 'مدريد', 'spain', 'spanish', 'madrid'], 18, 'gold-spain-oro-18k', 'إسبانيا', 'Spain'],
  ['switzerland', 'CHF', 2, ['سويسرا', 'سويسري', 'زيورخ', 'جنيف', 'switzerland', 'swiss', 'zurich', 'geneva'], 24, 'buying-gold-switzerland-pamp', 'سويسرا', 'Switzerland'],
  ['uk', 'GBP', 2, ['بريطانيا', 'انجلترا', 'إنجلترا', 'بريطاني', 'لندن', 'uk', 'britain', 'british', 'london', 'england'], 22, 'gold-karats-uk', 'بريطانيا', 'UK'],
  ['usa', 'USD', 2, ['أمريكا', 'امريكا', 'أمريكي', 'امريكي', 'أميركا', 'نيويورك', 'usa', 'america', 'american', 'new york', 'united states'], 24, 'why-gold-rises-usa', 'أمريكا', 'USA'],
  ['canada', 'CAD', 2, ['كندا', 'كندي', 'تورونتو', 'canada', 'canadian', 'toronto'], 24, 'why-gold-rises-canada', 'كندا', 'Canada'],
  ['australia', 'AUD', 2, ['أستراليا', 'استراليا', 'أسترالي', 'سيدني', 'australia', 'australian', 'sydney'], 24, 'why-gold-rises-australia', 'أستراليا', 'Australia'],
  ['nigeria', 'NGN', 0, ['نيجيريا', 'نيجيري', 'لاجوس', 'nigeria', 'nigerian', 'lagos'], 22, 'why-gold-rises-nigeria', 'نيجيريا', 'Nigeria'],
  ['ghana', 'GHS', 2, ['غانا', 'غاني', 'أكرا', 'ghana', 'ghanaian', 'accra'], 22, 'gold-ghana-prices-cedi', 'غانا', 'Ghana'],
  ['kenya', 'KES', 0, ['كينيا', 'كيني', 'نيروبي', 'kenya', 'kenyan', 'nairobi'], 22, 'why-gold-rises-kenya', 'كينيا', 'Kenya'],
  ['mexico', 'MXN', 2, ['المكسيك', 'مكسيكي', 'mexico', 'mexican'], 22, 'gold-mexico-centenario', 'المكسيك', 'Mexico'],
  ['brazil', 'BRL', 2, ['البرازيل', 'برازيلي', 'ساو باولو', 'brazil', 'brazilian', 'sao paulo'], 18, 'gold-brazil-ouro-750', 'البرازيل', 'Brazil'],
  ['southafrica', 'ZAR', 2, ['جنوب أفريقيا', 'جنوب افريقيا', 'جوهانسبرج', 'south africa', 'johannesburg'], 24, 'gold-southafrica-krugerrand', 'جنوب أفريقيا', 'South Africa']
];
const CUR_NAME = {
  AED: ['درهم', 'dirham'], USD: ['دولار', 'dollar'], EUR: ['يورو', 'euro'], SAR: ['ريال سعودي', 'Saudi riyal'],
  KWD: ['دينار كويتي', 'Kuwaiti dinar'], QAR: ['ريال قطري', 'Qatari riyal'], OMR: ['ريال عُماني', 'Omani rial'],
  BHD: ['دينار بحريني', 'Bahraini dinar'], EGP: ['جنيه', 'pound'], INR: ['روبية', 'rupee'], PKR: ['روبية باكستانية', 'Pakistani rupee'],
  GBP: ['جنيه إسترليني', 'pound sterling'], TRY: ['ليرة تركية', 'Turkish lira'], JOD: ['دينار أردني', 'Jordanian dinar'],
  IQD: ['دينار عراقي', 'Iraqi dinar'], MAD: ['درهم مغربي', 'Moroccan dirham'], DZD: ['دينار جزائري', 'Algerian dinar'],
  TND: ['دينار تونسي', 'Tunisian dinar'], LYD: ['دينار ليبي', 'Libyan dinar'], LBP: ['ليرة لبنانية', 'Lebanese pound']
};
const curN = (c, i) => (CUR_NAME[c] ? CUR_NAME[c][AR ? 0 : 1] : c);

/* العملات القابلة للتحويل المباشر + ألقابها */
const CUR_ALIAS = [
  ['USD', ['دولار', 'دولارات', 'usd', 'dollar', 'dollars', '$']],
  ['EUR', ['يورو', 'euro', 'euros', 'eur', '€']],
  ['GBP', ['إسترليني', 'استرليني', 'باوند', 'sterling', 'gbp', 'pound']],
  ['EGP', ['جنيه', 'جنية', 'جنيهات', 'egp']],
  ['SAR', ['ريال سعودي', 'ريال', 'ريالات', 'sar', 'riyal', 'riyals']],
  ['AED', ['درهم إماراتي', 'درهم', 'دراهم', 'aed', 'dirham', 'dirhams']],
  ['KWD', ['دينار كويتي', 'kwd']],
  ['QAR', ['ريال قطري', 'qar']],
  ['OMR', ['ريال عماني', 'ريال عُماني', 'omr']],
  ['BHD', ['دينار بحريني', 'bhd']],
  ['JOD', ['دينار أردني', 'jod']],
  ['IQD', ['دينار عراقي', 'iqd']],
  ['INR', ['روبية هندية', 'روبية', 'inr', 'rupee', 'rupees']],
  ['PKR', ['روبية باكستانية', 'pkr']],
  ['TRY', ['ليرة تركية', 'try', 'lira']],
  ['JPY', ['ين', 'ين ياباني', 'jpy', 'yen']],
  ['CNY', ['يوان', 'cny', 'yuan']],
  ['CHF', ['فرنك سويسري', 'chf', 'franc']]
];

/* وحدات الوزن بالغرام */
const UNITS = [
  ['tola', 11.6638, ['تولة', 'توله', 'تولا', 'tola', 'tolas']],
  ['ounce', TROY, ['أونصة', 'اونصة', 'أوقية', 'اوقية', 'ounce', 'ounces', 'oz']],
  ['bhori', 11.664, ['بهوري', 'بوري', 'bhori', 'vori', 'bhari']],
  ['mithqal', 5, ['مثقال', 'mithqal', 'mesghal']],
  ['baht', 15.244, ['باهت', 'baht']],
  ['tael', 37.5, ['تايل', 'tael', 'taels']],
  ['kg', 1000, ['كيلو', 'كيلوغرام', 'كيلوجرام', 'kg', 'kilo', 'kilogram']],
  ['gram', 1, ['جرام', 'غرام', 'جم', 'gram', 'grams', 'g']]
];
const KARATS = { 24: 1, 22: 22 / 24, 21: 21 / 24, 18: 18 / 24 };

/* ── تطبيع النص ── */
function norm(s) {
  s = String(s).toLowerCase();
  s = s.replace(/[٠-٩]/g, d => DIG.indexOf(d));
  s = s.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[ً-ْٰ]/g, '');
  s = s.replace(/[,،]/g, '.').replace(/[^\p{L}\p{N}.$\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  return s.replace(/بيغلي|بيزيد|غالي|يرتفع|ارتفاع|يرتفع/g,'ارتفاع').replace(/rising|rises|rise/g,'rise');
}
const has = (q, words) => words.some(w => (w = (w || '').trim()) && q.includes(w));
function findCountry(q) { return CS.find(c => has(q, c[3].map(norm))); }
function findUnit(q) { return UNITS.find(u => has(q, u[2].map(norm))); }
function findCur(q) { const hit = CUR_ALIAS.filter(c => has(q, c[1].map(norm))); return hit; }
function findKarat(q) {
  const m = q.match(/(?:عيار|k|قيراط|ك)\s*(24|22|21|18)\b/) || q.match(/\b(24|22|21|18)\s*(?:k|قيراط|عيار)\b/);
  return m ? +m[1] : null;
}
function findNum(q) {
  const m = q.match(/\d+(?:\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

/* ── الأسعار الحية ── */
async function refresh() {
  try {
    const r = await fetch('https://api.gold-api.com/price/XAU', { cache: 'no-store' });
    const d = await r.json();
    if (d.price > 500) { G24_USD = d.price / TROY; PRICE_AT = d.updatedAt || new Date().toISOString(); }
  } catch (e) {}
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/USD');
    const d = await r.json();
    if (d.rates) FX = Object.assign({}, PEG, d.rates);
  } catch (e) {}
  try {
    const r = await fetch('https://api.gold-api.com/price/XAG', { cache: 'no-store' });
    const d = await r.json();
    if (d.price > 1) AG_USD = d.price / TROY;
  } catch (e) {}
}
const g24 = code => G24_USD && FX[code] ? G24_USD * FX[code] : null;
const fmt = (v, d = 2) => new Intl.NumberFormat('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
const bdi = (v, d) => `<bdi>${fmt(v, d)}</bdi>`;
const srcLine = () => AR
  ? `<span class="chat-src">السعر المباشر: Gold-API.com${PRICE_AT ? ' · ' + new Date(PRICE_AT).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' }) + ' بتوقيت دبي' : ''} — للاطلاع فقط وليس نصيحة استثمارية. المحلات تضيف المصنعية والضريبة.</span>`
  : `<span class="chat-src">Live price: Gold-API.com${PRICE_AT ? ' · ' + new Date(PRICE_AT).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' }) + ' Dubai time' : ''} — information only, not investment advice. Shops add making charges and tax.</span>`;
const link = (href, t) => `<a href="${href}">${t}</a>`;

function priceRows(code, dec, weight, karat) {
  const g = g24(code); if (!g) return null;
  const ks = karat ? [karat] : [24, 22, 21, 18];
  return '<div class="chat-nums">' + ks.map(k =>
    `<div>${AR ? `عيار ${k}` : k + 'K'}<strong>${bdi(g * KARATS[k] * weight, dec)}</strong></div>`).join('') + '</div>';
}

/* ── الإجابات ── */
function ansCountryPrice(c, num, unit, karat) {
  const [, code, dec, , defK, art, arN, enN] = c;
  if (!g24(code)) return AR ? 'تعذر تحميل السعر المباشر الآن، جرّب بعد لحظات أو افتح صفحة ' + link('/' + c[0] + '/', arN) + '.' : 'Live price unavailable right now, try again in a moment or open the ' + link('/en/' + c[0] + '/', enN) + ' page.';
  const w = unit ? unit[1] : 1;
  const amount = num || 1;
  const gramsW = unit ? amount * unit[1] : amount;
  let head;
  if (num || unit) {
    const k = karat || defK;
    head = AR
      ? `سعر ${fmt(amount)} ${unitName(unit, amount)} عيار ${k} في ${arN} الآن:`
      : `${fmt(amount)} ${unitName(unit, amount)} of ${k}K gold in ${enN} now:`;
    const g = g24(code);
    head += `<div class="chat-big"><strong>${bdi(g * KARATS[k] * gramsW, dec)}</strong> ${curN(code)}</div>`;
    head += `<div class="chat-sub">≈ ${bdi(g * KARATS[k] * gramsW / FX[code] * FX.USD, 2)} ${AR ? 'دولار' : 'USD'}</div>`;
  } else {
    head = AR ? `سعر غرام الذهب في ${arN} الآن (${curN(code)}):` : `Gold price per gram in ${enN} now (${code}):`;
    head += priceRows(code, dec, 1, karat);
  }
  const more = AR
    ? `التفاصيل الكاملة والرسوم: ${link('/' + c[0] + '/', 'صفحة ' + arN)}${art ? ' · ' + link('/en/articles/' + art + '/', 'دليل ' + arN + ' (إنجليزي)') : ''} · ${link('/gold-calculator/', 'حاسبة الذهب')}`
    : `Full details & charts: ${link('/en/' + c[0] + '/', enN + ' page')}${art ? ' · ' + link('/en/articles/' + art + '/', enN + ' gold guide') : ''} · ${link('/en/gold-calculator/', 'Gold calculator')}`;
  return head + `<div class="chat-links">${more}</div>` + srcLine();
}
function unitName(unit, n) {
  if (!unit) return AR ? (n > 2 && n <= 10 ? 'جرامات' : 'جرام') : (n === 1 ? 'gram' : 'grams');
  const arNames = { tola: 'تولة', ounce: 'أونصة', bhori: 'بهوري', mithqal: 'مثقال', baht: 'باهت', tael: 'تايل', kg: 'كيلوغرام', gram: 'جرام' };
  return AR ? arNames[unit[0]] : unit[0] + (n === 1 ? '' : 's');
}

function ansKaratPrice(karat, num, unit) {
  if (!g24('AED')) return AR ? 'تعذر تحميل السعر المباشر الآن.' : 'Live price unavailable right now.';
  const k = karat || 21;
  const w = num ? num * (unit ? unit[1] : 1) : 1;
  let h = AR
    ? `سعر ${w === 1 ? 'غرام' : fmt(w) + ' جرام'} عيار ${k} الآن:<div class="chat-big"><strong>${bdi(g24('AED') * KARATS[k] * w)}</strong> درهم</div><div class="chat-sub">≈ ${bdi(G24_USD * KARATS[k] * w, 2)} دولار</div>`
    : `${w === 1 ? 'One gram' : fmt(w) + ' grams'} of ${k}K gold now:<div class="chat-big"><strong>${bdi(g24('AED') * KARATS[k] * w)}</strong> AED</div><div class="chat-sub">≈ $${bdi(G24_USD * KARATS[k] * w, 2)}</div>`;
  h += AR
    ? `<div class="chat-links">اسأل عن أي دولة («سعر الذهب في مصر») أو افتح ${link('/gold-' + k + 'k/', 'صفحة عيار ' + k)} · ${link('/gcc/', 'مقارنة الخليج')}</div>`
    : `<div class="chat-links">Ask about any country ("gold price in Egypt") or open ${link('/en/gold-' + k + 'k/', 'the ' + k + 'K page')} · ${link('/en/gcc/', 'Gulf comparison')}</div>`;
  return h + srcLine();
}

function ansOverview() {
  if (!g24('AED')) return AR ? 'تعذر تحميل السعر المباشر الآن.' : 'Live price unavailable right now.';
  let h = AR
    ? `أسعار الذهب الآن:<div class="chat-big"><strong>${bdi(g24('AED'))}</strong> درهم / غرام عيار 24</div><div class="chat-sub">الأونصة العالمية ≈ ${bdi(G24_USD * TROY, 2)} دولار · عيار 21 ≈ ${bdi(g24('AED') * 21 / 24)} درهم</div>`
    : `Gold right now:<div class="chat-big"><strong>${bdi(g24('AED'))}</strong> AED / gram 24K</div><div class="chat-sub">Global ounce ≈ $${bdi(G24_USD * TROY, 2)} · 21K ≈ ${bdi(g24('AED') * 21 / 24)} AED</div>`;
  h += AR
    ? `<div class="chat-links">اكتب اسم أي دولة من الـ44 («سعر الذهب في الهند») أو وزناً («سعر 10 جرام عيار 21 في السعودية»).</div>`
    : `<div class="chat-links">Type any of the 44 countries ("gold price in India") or a weight ("price of 10 grams 22K in Pakistan").</div>`;
  return h + srcLine();
}

function ansUnit(unit, num) {
  const g = unit[1];
  let h = AR
    ? `ال${unitName(unit, 2)} = <strong>${fmt(g, g % 1 ? 4 : 0)} جرام</strong>.`
    : `1 ${unit[0]} = <strong>${fmt(g, g % 1 ? 4 : 0)} grams</strong>.`;
  if (num && num !== 1) h += AR ? `<br>${fmt(num)} ${unitName(unit, num)} = <strong>${fmt(num * g, 2)} جرام</strong> من الذهب.` : `<br>${fmt(num)} ${unit[0]}${num > 1 ? 's' : ''} = <strong>${fmt(num * g, 2)} grams</strong> of gold.`;
  if (g24('AED')) {
    const v = g24('AED') * (num || 1) * g;
    h += AR ? `<div class="chat-sub">قيمة ${num && num !== 1 ? fmt(num) + ' ' + unitName(unit, num) : 'واحدة'} من عيار 24 الآن ≈ ${bdi(v)} درهم (${bdi(v / AED, 2)} دولار).</div>`
      : `<div class="chat-sub">${num && num !== 1 ? fmt(num) + ' ' + unit[0] + 's' : 'One'} of 24K is now worth ≈ ${bdi(v)} AED ($${bdi(v / AED, 2)}).</div>`;
  }
  return h + srcLine();
}

function ansFx(amount, from, to) {
  const rate = FX[from] && FX[to] ? FX[to] / FX[from] : null;
  if (!rate) return AR ? 'لا أعرف سعر صرف هذه العملة حالياً.' : 'I do not have that exchange rate right now.';
  let h = AR
    ? `${fmt(amount)} ${curN(from)} = <div class="chat-big"><strong>${bdi(amount * rate, amount * rate >= 100 ? 0 : 2)}</strong> ${curN(to)}</div>`
    : `${fmt(amount)} ${from} = <div class="chat-big"><strong>${bdi(amount * rate, amount * rate >= 100 ? 0 : 2)}</strong> ${to}</div>`;
  h += AR
    ? `<div class="chat-sub">1 ${curN(from)} ≈ ${fmt(rate, rate < 0.01 ? 5 : rate < 1 ? 4 : 2)} ${curN(to)} · أسعار الصرف من open.er-api.com وقد تختلف عن السوق المحلي (خاصة الجنيه المصري في السوق الموازية).</div>`
    : `<div class="chat-sub">1 ${from} ≈ ${fmt(rate, rate < 0.01 ? 5 : rate < 1 ? 4 : 2)} ${to} · Rates from open.er-api.com; local market rates (e.g. EGP parallel market) may differ.</div>`;
  h += AR ? `<div class="chat-links">${link('/dollar/', 'سعر الدولار اليوم بكل العملات')}</div>` : `<div class="chat-links">${link('/en/dollar/', 'Live US dollar rate in 40 currencies')}</div>`;
  return h;
}

function ansZakat() {
  const NISAB = 85;
  let h = AR
    ? `نصاب زكاة الذهب <strong>${NISAB} جراماً من الذهب الخالص (عيار 24)</strong>، ومقدارها <strong>2.5%</strong> (ربع العشر) إذا حال الحول.`
    : `The zakat nisab for gold is <strong>${NISAB} grams of pure gold (24K)</strong>, and the due amount is <strong>2.5%</strong> after one lunar year.`;
  if (g24('AED')) {
    const nisabV = g24('AED') * NISAB;
    h += AR
      ? `<div class="chat-sub">قيمة النصاب اليوم ≈ ${bdi(nisabV, 0)} درهم، ومن ملك ${NISAB} جراماً فزكاته الآن ≈ ${bdi(nisabV * 0.025)} درهم.</div>`
      : `<div class="chat-sub">Nisab value today ≈ ${bdi(nisabV, 0)} AED; zakat on exactly ${NISAB} g ≈ ${bdi(nisabV * 0.025)} AED.</div>`;
  }
  h += AR
    ? `<div class="chat-sub">الذهب المخلوط يُحوَّل إلى وزن خالص: عيار 21 × 0.875، عيار 18 × 0.75.</div><div class="chat-links">${link('/zakat-calculator/', 'حاسبة زكاة الذهب — أدخل وزنك واحسب')}</div>`
    : `<div class="chat-sub">Alloyed gold converts to pure weight: 21K × 0.875, 18K × 0.75.</div><div class="chat-links">${link('/en/zakat-calculator/', 'Zakat calculator — enter your weight')}</div>`;
  return h + srcLine();
}

function ansKaratInfo() {
  return (AR
    ? `العيار هو نسبة الذهب الخالص في القطعة:<div class="chat-nums"><div>عيار 24<strong>99.9%</strong></div><div>عيار 22<strong>91.7%</strong></div><div>عيار 21<strong>87.5%</strong></div><div>عيار 18<strong>75%</strong></div></div>عيار 24 للسبائك والادخار، و22 للمجوهرات الهندية، و21 الأكثر طلباً في الخليج ومصر، و18 لمجوهرات الألماس والتصاميم الأوروبية.<div class="chat-links">${link('/gold-24k/', 'عيار 24')} · ${link('/gold-22k/', 'عيار 22')} · ${link('/gold-21k/', 'عيار 21')} · ${link('/gold-18k/', 'عيار 18')}</div>`
    : `Karat is the share of pure gold in the piece:<div class="chat-nums"><div>24K<strong>99.9%</strong></div><div>22K<strong>91.7%</strong></div><div>21K<strong>87.5%</strong></div><div>18K<strong>75%</strong></div></div>24K is for bars and saving, 22K for Indian jewellery, 21K the Gulf and Egypt favourite, 18K for diamond and European designs.<div class="chat-links">${link('/en/gold-24k/', '24K')} · ${link('/en/gold-22k/', '22K')} · ${link('/en/gold-21k/', '21K')} · ${link('/en/gold-18k/', '18K')}</div>`);
}

function ansForecast() {
  return (AR
    ? `لا أحد يستطيع الجزم باتجاه الذهب قصير المدى. السعر يتبع السوق العالمية ويتأثر بالفائدة الأمريكية وقوة الدولار والتضخم والطلب من البنوك المركزية والأزمات. على المدى الطويل تاريخياً ارتفع الذهب، لكن الماضي لا يضمن المستقبل.<div class="chat-links">${link('/gold-forecast/', 'صفحة التوقعات والاتجاه الفعلي لآخر 7 و30 يوماً')} · ${link('/gold-price-yesterday/', 'سعر أمس وآخر 10 أيام')}</div>`
    : `Nobody can call gold's short-term direction with certainty. The price follows the global market: US interest rates, dollar strength, inflation, central-bank buying and crises. Historically gold rose over the long term, but the past does not guarantee the future.<div class="chat-links">${link('/en/gold-forecast/', 'Forecast page with the actual 7/30-day trend')} · ${link('/en/gold-price-yesterday/', 'Last 10 days')}</div>`)
    + (AR ? '<div class="chat-sub">للاطلاع فقط — ليس نصيحة استثمارية.</div>' : '<div class="chat-sub">Information only — not investment advice.</div>');
}

function ansBuying() {
  return (AR
    ? `نصائح الشراء السريعة:<br>1) اسأل عن <strong>سعر الغرام قبل المصنعية</strong> ثم المصنعية وحدها، وقارن بين المحلات.<br>2) المصنعية تُضاف للغرام وتختلف حسب التصميم، وعند البيع تسترد سعر الذهب الخام فقط غالباً.<br>3) الضريبة تختلف: الإمارات 5%، السعودية 15%، البحرين 10%، عُمان 5%، والكويت وقطر بلا ضريبة حالياً.<br>4) للادخار السبائك أوفر من المشغولات لأن مصنعيتها أقل.<div class="chat-links">${link('/gold-calculator/', 'حاسبة الذهب بالمصنعية والضريبة')} · ${link('/gold-bars/', 'أسعار السبائك')}</div>`
    : `Quick buying tips:<br>1) Ask for the <strong>gram rate before making charges</strong>, then the making charge separately, and compare shops.<br>2) Making charges are added per gram and vary by design; on resale you usually get back only the raw gold value.<br>3) VAT differs: UAE 5%, Saudi 15%, Bahrain 10%, Oman 5%, Kuwait and Qatar none for now.<br>4) For saving, bars beat jewellery thanks to lower making charges.<div class="chat-links">${link('/en/gold-calculator/', 'Gold calculator with making & VAT')} · ${link('/en/gold-bars/', 'Gold bar prices')}</div>`);
}

function ansSilver() {
  if (!AG_USD) return AR ? 'سعر الفضة المباشر غير متاح الآن — افتح ' + link('/silver/', 'صفحة الفضة') + '.' : 'Live silver price unavailable — open the ' + link('/en/silver/', 'silver page') + '.';
  const aed = AG_USD * AED;
  return (AR
    ? `سعر الفضة الآن:<div class="chat-big"><strong>${bdi(aed)}</strong> درهم / غرام</div><div class="chat-sub">الأونصة ≈ ${bdi(AG_USD * TROY, 2)} دولار · الكيلو ≈ ${bdi(aed * 1000, 0)} درهم</div><div class="chat-links">${link('/silver/', 'صفحة الفضة الكاملة')}</div>`
    : `Silver right now:<div class="chat-big"><strong>${bdi(aed)}</strong> AED / gram</div><div class="chat-sub">Ounce ≈ $${bdi(AG_USD * TROY, 2)} · Kilo ≈ ${bdi(aed * 1000, 0)} AED</div><div class="chat-links">${link('/en/silver/', 'Full silver page')}</div>`) + srcLine();
}

function ansGreeting() {
  return AR
    ? `أهلاً! أنا مساعد الذهب في معلوماتي. اسألني مثلاً: «سعر الذهب في مصر»، «سعر 10 جرام عيار 21 في السعودية»، «التولة كام جرام»، «100 دولار كام جنيه»، «زكاة الذهب».`
    : `Hi! I'm the gold assistant at Gold Prices Today. Try: "gold price in India", "price of 10 grams 22K in Pakistan", "how many grams in a tola", "convert 100 USD to EUR", or "zakat on gold".`;
}
function ansFallback() {
  return AR
    ? `لم أفهم السؤال تماماً. أستطيع الإجابة عن:<br>• سعر الذهب في أي دولة من 44 دولة («سعر الذهب في تركيا»)<br>• سعر وزن معين («سعر 5 تولة عيار 22 في باكستان»)<br>• تحويل الأوزان («الأونصة كام جرام»)<br>• تحويل العملات («100 دولار كام درهم»)<br>• الفرق بين العيارات، زكاة الذهب، نصائح الشراء، سعر الفضة`
    : `I did not quite get that. I can answer:<br>• Gold price in any of 44 countries ("gold price in Turkey")<br>• A specific weight ("price of 5 tola 22K in Pakistan")<br>• Weight conversions ("how many grams in an ounce")<br>• Currency conversion ("100 USD to AED")<br>• Karat differences, gold zakat, buying tips, silver price`;
}

/* ── قاعدة المعرفة: بحث استرجاعي في مقالات الموقع وأدلتها ── */
const KB = AR ? (window.__KB_AR || []) : (window.__KB_EN || []);
const STOP = new Set(norm(AR
  ? 'في من على إلى الى عن ما هو هي هذا هذه ذلك الذي التي او أو ثم قد لو هل سعر اسعار الذهب دهب بكم بكام كام كم ايه إيه اي أي النهارده النهاردة اليوم الان الآن لو سمحت من فضلك عندي عايز عاوز بدي كيف لماذا ليه متى امتى اين فين عند عندما غرام جرام'
  : 'the a an of in on at is are was were what which who how much many price prices rate rates gold for to and or it its this that these those please tell me about do does did can could should will would today now current currently best good gram grams per').split(' '));
const tokensOf = q => norm(q).split(' ').map(t => /^[\u0600-\u06ff]+$/.test(t) ? t.replace(/^ال/, '') : t).filter(t => t.length > 1 && !STOP.has(t));
const KB_N = KB.map(e => ({ t: e.t, d: e.d, u: e.u, _n: tokensOf(e.t + ' ' + e.d), _title: tokensOf(e.t) }));
function kbSearch(q) {
  const toks = [...new Set(tokensOf(q))];
  if (!toks.length) return null;
  let best = null, bs = 0;
  for (const e of KB_N) { let s = 0; for (const t of toks) if (e._n.includes(t)) s += 1 + (e._title.includes(t) ? 0.7 : 0); s += toks.filter(t => tokensOf(e.d).includes(t)).length * 0.25 + Math.min(e.d.length, 400) / 2000; if (s > bs) { bs = s; best = e; } }
  if (!best || bs < 2 || (toks.length >= 4 && bs < toks.length * 0.5)) return null;
  return (AR
    ? `أقرب معلومة لسؤالك من أدلتنا:<br><strong>${best.t}</strong><br>${best.d}<div class="chat-links">${link(best.u, 'اقرأ الدليل كاملاً')}</div>`
    : `Closest match from our guides:<br><strong>${best.t}</strong><br>${best.d}<div class="chat-links">${link(best.u, 'Read the full guide')}</div>`);
}

/* ── محرك الأنماط ── */
function answer(raw) {
  const q = norm(raw);
  if (!q) return ansFallback();
  if (has(q, ['سلام', 'اهلا', 'مرحبا', 'هاي', 'hello', 'hi ', 'hey']) && q.length < 30) return ansGreeting();
  if (has(q, ['why', 'what', 'how', 'difference', 'vs', 'tax', 'vat', 'gst', 'buy', 'making', 'premium', 'hallmark', 'purity', 'ليه', 'لماذا', 'ازاي', 'كيف', 'ضريب', 'مصنعي', 'ختم', 'دمغ', 'فرق', 'شراء', 'ادخار', 'استثمار'])) { const knowledge = kbSearch(q); if (knowledge) return knowledge; }
  if (has(q, ['زكاه', 'الزكاه', 'zakat', 'nisab', 'نصاب'])) return ansZakat();
  if (has(q, ['فضه', 'الفضه', 'silver'])) return ansSilver();
  if (has(q, ['توقع', 'هيزيد', 'هيرتفع', 'هيزيد', 'هينزل', 'هيقل', 'هيغلي', 'forecast', 'will gold', 'go up', 'ذهب هل', 'رايك في الذهب', 'اتوقع', 'future'])) return ansForecast();
  if (has(q, ['مصنعيه', 'مصنعية', 'ضريبه', 'ضريبة', 'vat', 'making', 'اشتري', 'اشترى', 'اشتري الذهب', 'بيع الذهب', 'نصيحه شراء', 'نصايح', 'should i buy', 'buy gold', 'tips', 'بيع'])) return ansBuying();
  if (has(q, ['فرق بين', 'الفرق بين', 'difference between', 'معني عيار', 'معنى عيار', 'يعني ايه عيار', 'what is 2', 'what is 1', 'karat mean', 'vs 2', 'vs 1'])) return ansKaratInfo();

  const country = findCountry(q);
  const unit = findUnit(q);
  const karat = findKarat(q);
  const num = findNum(q.replace(/(?:عيار|k|قيراط|ك)\s*(24|22|21|18)\b|\b(24|22|21|18)\s*k\b/g, ' '));

  /* تحويل عملات: عملتان ورقم */
  const curs = findCur(q);
  if (!country && num != null && curs.length >= 1 && has(q, ['كام', 'بكم', 'يساوي', 'حول', 'convert', 'to', '=', 'في', 'in'])) {
    let from = curs[0][0], to = curs.length > 1 ? curs[1][0] : null;
    if (!to) to = from === 'USD' ? 'EGP' : 'USD';
    if (from === to) to = from === 'USD' ? 'EGP' : 'USD';
    return ansFx(num, from, to);
  }
  /* سؤال وحدة وزن بلا دولة */
  if (!country && unit && has(q, ['كام', 'كم', 'يساوي', 'حول', 'how many', 'convert', 'in grams', 'جرام', 'gram']) && !karat) return ansUnit(unit, num);
  /* دولة */
  if (country) return ansCountryPrice(country, num, unit && unit[0] !== 'gram' ? unit : (num ? UNITS[7] : null), karat);
  /* عيار فقط */
  if (karat) return ansKaratPrice(karat, num, unit);
  if (has(q, ['سعر الذهب', 'الذهب', 'gold', 'دهب'])) return num ? ansKaratPrice(karat || 24, num, unit) : ansOverview();
  const kb = kbSearch(q);
  if (kb) return kb;
  return ansFallback();
}

/* ── واجهة المحادثة: تُربط بأي حاوية فيها .chat-log/.chat-chips/.chat-form/.chat-in ── */
const CHIPS = AR
  ? ['سعر الذهب في مصر', 'سعر 10 جرام عيار 21', 'التولة كام جرام', 'زكاة الذهب', '100 دولار كام جنيه', 'سعر الفضة']
  : ['Gold price in India', 'Price of 10 grams 22K', 'How many grams in a tola?', 'Convert 100 USD to EUR', 'Will gold go up?', 'Silver price'];
let refreshed = false;
function mount(root) {
  if (!root || root.__gaMounted) return;
  root.__gaMounted = 1;
  const log = root.querySelector('.chat-log');
  const form = root.querySelector('.chat-form');
  const input = root.querySelector('.chat-in');
  const chips = root.querySelector('.chat-chips');
  if (!log || !form || !input) return;
  function bubble(html, me) {
    const d = document.createElement('div');
    d.className = 'chat-msg' + (me ? ' me' : '');
    if (me) d.textContent = html; else d.innerHTML = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }
  function ask(text) {
    const q = String(text || '').trim();
    if (!q) return;
    bubble(q, true);
    input.value = '';
    const t = bubble('<span class="chat-typing">•••</span>', false);
    setTimeout(() => { t.innerHTML = answer(q); log.scrollTop = log.scrollHeight; }, 350);
  }
  form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
  if (chips) CHIPS.forEach(c => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chat-chip'; b.textContent = c;
    b.addEventListener('click', () => ask(c));
    chips.appendChild(b);
  });
  if (!refreshed) { refreshed = true; refresh(); }
  bubble(ansGreeting(), false);
}
window.GoldAssistant = { mount };
mount(document.getElementById('assistant'));
})();
