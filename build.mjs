// ══════════════════════════════════════════════════════════════
//  مولّد موقع أسعار الذهب — maelumatii.com
//  التشغيل:  node build.mjs      → يبني الموقع في مجلد dist/
//  يجيب السعر الحالي ويكتبه داخل الـ HTML (عشان جوجل يشوفه)،
//  ويبني أرشيف الأسعار اليومي من قاعدة البيانات.
// ══════════════════════════════════════════════════════════════
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { pages } from './content.mjs';
import { loadCountryHistory } from './history-data.mjs';
import { historySection } from './history-core.mjs';
import { ARTICLES, ARTICLES_EN } from './articles.mjs';

const SITE   = 'https://www.maelumatii.com';
const OUT    = 'dist';
const TROY   = 31.1035;
const AED    = 3.6725;
const SB_URL = 'https://kmvadxkjehxfxpeveekg.supabase.co';
const SB_KEY = process.env.SUPABASE_KEY || 'sb_publishable_kWJE1YujD-0VdmAOET0dVw_xOUNu2d1';
const TODAY  = new Date().toISOString().slice(0, 10);
const ASSET_V = { js: TODAY, css: TODAY, assist: TODAY };

// ── Data ──────────────────────────────────────────────────────
async function getJSON(url, opts = {}) {
  const r = await fetch(url, { ...opts, signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(url + ' → ' + r.status);
  return r.status === 201 || r.status === 204 ? null : r.json();
}
const sbHeaders = { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json' };

async function loadPrice() {
  try {
    const d = await getJSON('https://api.gold-api.com/price/XAU');
    if (!(d.price > 500)) throw new Error('bad price');
    const g24 = d.price * AED / TROY;
    if (process.env.WRITE_DB === '1') {
      await fetch(SB_URL + '/rest/v1/gold_prices', {
        method: 'POST', headers: { ...sbHeaders, Prefer: 'return=minimal' },
        body: JSON.stringify({ currency: 'AED', price_24k: +g24.toFixed(4), price_22k: +(g24 * 22 / 24).toFixed(4),
          price_21k: +(g24 * 21 / 24).toFixed(4), price_18k: +(g24 * 18 / 24).toFixed(4), price_troy: +(g24 * TROY).toFixed(4),
          raw_json: { priceUSD: d.price, usdToAed: AED, source: 'build' } })
      }).catch(() => {});
    }
    return { g24, at: d.updatedAt || new Date().toISOString() };
  } catch (e) {
    console.warn('live price failed:', e.message);
    try {
      const [row] = await getJSON(SB_URL + '/rest/v1/gold_prices?order=fetched_at.desc&limit=1&select=fetched_at,price_24k', { headers: sbHeaders });
      if (row) return { g24: +row.price_24k, at: row.fetched_at };
    } catch (e2) { console.warn('db fallback failed:', e2.message); }
    return { g24: null, at: null };
  }
}

const dubaiDay = iso => new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });

async function loadDaily() {
  // 1) الـ view الجاهزة (لو اتعمل ملف supabase.sql)
  try {
    const rows = await getJSON(SB_URL + '/rest/v1/gold_daily?order=day.asc&select=*', { headers: sbHeaders });
    return rows.map(r => ({ day: r.day, open: +r.open_24k, close: +r.close_24k, high: +r.high_24k, low: +r.low_24k, n: +r.n }));
  } catch (e) { console.warn('gold_daily view not available:', e.message); }
  // 2) احتياطي: نجيب كل الصفوف ونجمّعها هنا
  try {
    const all = [];
    for (let off = 0; off < 300000; off += 1000) {
      const part = await getJSON(SB_URL + `/rest/v1/gold_prices?order=fetched_at.asc&select=fetched_at,price_24k&limit=1000&offset=${off}`, { headers: sbHeaders });
      all.push(...part);
      if (part.length < 1000) break;
    }
    const map = new Map();
    for (const r of all) {
      const v = +r.price_24k; if (!(v > 100)) continue;
      const d = dubaiDay(r.fetched_at);
      const m = map.get(d);
      if (!m) map.set(d, { day: d, open: v, close: v, high: v, low: v, n: 1 });
      else { m.close = v; m.high = Math.max(m.high, v); m.low = Math.min(m.low, v); m.n++; }
    }
    return [...map.values()];
  } catch (e) { console.warn('history failed:', e.message); return []; }
}

// ── Helpers shared with content.mjs ───────────────────────────
export const fmt = (v, d = 2) => v == null || !isFinite(v) ? '—' : new Intl.NumberFormat('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);

function makeCtx(price, daily, extra = {}) {
  const g = price.g24, ag = extra.ag ?? null, fx = extra.fx || {};
  // عملات مربوطة بالدولار بسعر ثابت رسمي؛ غيرها (زي الدينار الكويتي والروبية) من سعر الصرف اليومي
  const PEG = { USD: 1, AED, SAR: 3.75, QAR: 3.64, OMR: 0.3845, BHD: 0.376, JOD: 0.709 };
  const rateOf = c => PEG[c.toUpperCase()] || fx[c.toUpperCase()] || null;
  const conv = (v, cur) => {
    if (v == null || cur === 'aed') return v;
    const r = rateOf(cur);
    return r ? v / AED * r : null;
  };
  const span = (attrs, v, d) => `<span ${attrs}${d != null ? ` data-d="${d}"` : ''}>${fmt(v, d != null ? d : v >= 100000 ? 0 : 2)}</span>`;
  // سعر ذهب قابل للتحديث: الرقم مكتوب في الـ HTML والـ JS بيحدّثه
  const P = (k = 24, w = 1, { cur = 'aed', mc = 0, d } = {}) => {
    const v = conv(g == null ? null : (g * k / 24 + mc) * w, cur);
    return span(`data-p data-k="${k}"${w !== 1 ? ` data-w="${w}"` : ''}${mc ? ` data-mc="${mc}"` : ''}${cur !== 'aed' ? ` data-cur="${cur}"` : ''}`, v, d);
  };
  // سعر فضة: f = النقاء (1 = 999، 0.925 = استرليني)
  const S = (f = 1, w = 1, { cur = 'aed', d } = {}) => {
    const v = conv(ag == null ? null : ag * f * w, cur);
    return span(`data-p data-m="ag"${f !== 1 ? ` data-f="${f}"` : ''}${w !== 1 ? ` data-w="${w}"` : ''}${cur !== 'aed' ? ` data-cur="${cur}"` : ''}`, v, d);
  };
  const FX = c => `<span data-fx="${c}">${fx[c] ? fmt(fx[c] / AED, 4) : '—'}</span>`;
  // سعر الدولار بعملة معينة (قابل للتحديث لحظياً): w = عدد الدولارات، i = الاتجاه العكسي (من العملة إلى الدولار)
  const FXD = (c, { w = 1, i = false, d } = {}) => {
    const r = fx[c.toUpperCase()];
    const v = r == null ? null : (i ? w / r : r * w);
    const dd = d != null ? d : (v == null ? 2 : v < 10 ? 4 : v >= 100000 ? 0 : 2);
    return `<span data-fxd="${c.toUpperCase()}"${w !== 1 ? ` data-w="${w}"` : ''}${i ? ' data-i="1"' : ''} data-d="${dd}">${v == null ? '—' : fmt(v, dd)}</span>`;
  };
  const updated = lang => `<span data-upd>${price.at ? new Date(price.at).toLocaleString(lang === 'en' ? 'en-AE' : 'ar-AE-u-nu-latn', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', timeZone: 'Asia/Dubai' }) : '—'}</span>`;
  let chg = '';
  if (daily.length >= 2 && g) {
    const prev = daily[daily.length - 2].close;
    const pct = (g - prev) / prev * 100;
    const dir = pct > 0.005 ? 'up' : pct < -0.005 ? 'dn' : 'fl';
    chg = `<span class="chg ${dir}" data-chg>${dir === 'up' ? '▲' : dir === 'dn' ? '▼' : '●'} ${Math.abs(pct).toFixed(2)}%</span>`;
  } else chg = '<span class="chg fl" data-chg hidden></span>';
  const markets = Object.entries(CNAMES).map(([slug, [ar, en]]) => ({slug, ar, en, currency: (COUNTRIES.find(c => c[2] === en || c[1] === ar) || ['EUR'])[0]}));
  return { markets, g24: g, ag, fx, PEG, rateOf, P, S, FX, FXD, updated, chg, daily, fmt, AED, TROY, SITE, TODAY, url, AD };
}

// ── Layout ────────────────────────────────────────────────────
export const url = (lang, slug) => (lang === 'ar' ? '/' : `/${lang}/`) + (slug ? slug + '/' : '');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const NAV = {
  ar: [['', 'الرئيسية'], ['gold-21k', 'عيار 21'], ['gold-24k', 'عيار 24'], ['gold-22k', 'عيار 22'], ['gold-18k', 'عيار 18'], ['gcc', 'مقارنة الخليج'], ['gold-price-usd', 'السعر العالمي'], ['silver', 'الفضة'], ['gold-bars', 'السبائك'], ['gold-calculator', 'حاسبة الذهب'], ['gold-resale-calculator', 'بيع الذهب'], ['price-alerts', 'تنبيهات السعر'], ['zakat-calculator', 'زكاة الذهب'], ['gold-price-yesterday', 'سعر أمس'], ['gold-forecast', 'توقعات الذهب'], ['articles', 'مقالات'], ['assistant', 'المساعد'], ['history', 'الأرشيف']],
  en: [['', 'Home'], ['gold-22k', '22K'], ['gold-24k', '24K'], ['gold-18k', '18K'], ['gold-21k', '21K'], ['gcc', 'Gulf compare'], ['gold-price-usd', 'Gold in USD'], ['silver', 'Silver'], ['gold-rate-inr', 'In INR'], ['gold-rate-pkr', 'In PKR'], ['gold-bars', 'Gold Bars'], ['gold-calculator', 'Calculator'], ['gold-resale-calculator', 'Resale'], ['price-alerts', 'Price alerts'], ['gold-price-yesterday', 'Last 10 days'], ['zakat-calculator', 'Zakat'], ['articles', 'Articles'], ['assistant', 'Assistant']],
  tr: [['turkiye', 'Gram Altın'], ['turkiye/24-ayar-altin', '24 Ayar'], ['turkiye/22-ayar-altin', '22 Ayar'], ['turkiye/21-ayar-altin', '21 Ayar'], ['turkiye/18-ayar-altin', '18 Ayar']],
  hi: [['sone-ka-bhav', 'सोने का भाव'], ['sone-ka-bhav/24-karat', '24 कैरेट'], ['sone-ka-bhav/22-karat', '22 कैरेट'], ['sone-ka-bhav/18-karat', '18 कैरेट'], ['sone-ka-bhav/21-karat', '21 कैरेट']],
  ur: [['sone-ka-rate', 'سونے کا ریٹ'], ['sone-ka-rate/24-karat', '24 کیرٹ'], ['sone-ka-rate/22-karat', '22 کیرٹ'], ['sone-ka-rate/18-karat', '18 کیرٹ'], ['sone-ka-rate/21-karat', '21 کیرٹ']],
  id: [['harga-emas', 'Harga Emas'], ['harga-emas/24-karat', '24 Karat'], ['harga-emas/22-karat', '22 Karat'], ['harga-emas/18-karat', '18 Karat'], ['harga-emas/21-karat', '21 Karat']],
  bn: [['sonar-dam', 'সোনার দাম'], ['sonar-dam/24-karat', '২৪ ক্যারেট'], ['sonar-dam/22-karat', '২২ ক্যারেট'], ['sonar-dam/18-karat', '১৮ ক্যারেট'], ['sonar-dam/21-karat', '২১ ক্যারেট']],
  tl: [['presyo-ng-ginto', 'Presyo ng Ginto'], ['presyo-ng-ginto/24-karat', '24 Karat'], ['presyo-ng-ginto/22-karat', '22 Karat'], ['presyo-ng-ginto/21-karat', '21 Karat'], ['presyo-ng-ginto/18-karat', '18 Karat']],
  ms: [['harga-emas', 'Harga Emas'], ['harga-emas/24-karat', 'Emas 999'], ['harga-emas/22-karat', 'Emas 916'], ['harga-emas/21-karat', 'Emas 875'], ['harga-emas/18-karat', 'Emas 750']]
};

// قوائم اللغات وخرائط التنقل بين اللغات وبين صفحات الذهب والدولار
const LANGS = [['ar', 'العربية'], ['en', 'English'], ['tr', 'Türkçe'], ['hi', 'हिन्दी'], ['ur', 'اردو'], ['id', 'Indonesia'], ['bn', 'বাংলা'], ['tl', 'Filipino'], ['ms', 'Melayu']];
const LANG_HOME = { ar: '', en: '', tr: 'turkiye', hi: 'sone-ka-bhav', ur: 'sone-ka-rate', id: 'harga-emas', bn: 'sonar-dam', tl: 'presyo-ng-ginto', ms: 'harga-emas' };
// دول لها صفحات عربية (غير enOnly) + الرئيسية للإمارات
const AR_CTRIES = new Set(['saudi', 'kuwait', 'qatar', 'oman', 'bahrain', 'egypt', 'iraq', 'jordan', 'morocco', 'algeria', 'lebanon', 'tunisia', 'libya', 'yemen']);
// دولة كل لغة تجريبية: [slug الدولة, slug الصفحة في اللغة]
const PILOT_CTRY = { tr: ['turkey', 'turkiye'], hi: ['india', 'sone-ka-bhav'], ur: ['pakistan', 'sone-ka-rate'], id: ['indonesia', 'harga-emas'], bn: ['bangladesh', 'sonar-dam'], tl: ['philippines', 'presyo-ng-ginto'], ms: ['malaysia', 'harga-emas'] };
const CNAMES = { uae: ['الإمارات', 'UAE'], saudi: ['السعودية', 'Saudi Arabia'], kuwait: ['الكويت', 'Kuwait'], qatar: ['قطر', 'Qatar'], oman: ['عُمان', 'Oman'], bahrain: ['البحرين', 'Bahrain'], egypt: ['مصر', 'Egypt'], india: ['الهند', 'India'], pakistan: ['باكستان', 'Pakistan'], bangladesh: ['بنجلاديش', 'Bangladesh'], turkey: ['تركيا', 'Turkey'], usa: ['أمريكا', 'USA'], uk: ['بريطانيا', 'UK'], canada: ['كندا', 'Canada'], australia: ['أستراليا', 'Australia'], philippines: ['الفلبين', 'Philippines'], malaysia: ['ماليزيا', 'Malaysia'], nepal: ['نيبال', 'Nepal'], southafrica: ['جنوب أفريقيا', 'South Africa'], iraq: ['العراق', 'Iraq'], jordan: ['الأردن', 'Jordan'], morocco: ['المغرب', 'Morocco'], algeria: ['الجزائر', 'Algeria'], indonesia: ['إندونيسيا', 'Indonesia'], thailand: ['تايلاند', 'Thailand'], vietnam: ['فيتنام', 'Vietnam'], singapore: ['سنغافورة', 'Singapore'], srilanka: ['سريلانكا', 'Sri Lanka'], germany: ['ألمانيا', 'Germany'], japan: ['اليابان', 'Japan'], switzerland: ['سويسرا', 'Switzerland'], nigeria: ['نيجيريا', 'Nigeria'], ghana: ['غانا', 'Ghana'], kenya: ['كينيا', 'Kenya'], mexico: ['المكسيك', 'Mexico'], brazil: ['البرازيل', 'Brazil'], china: ['الصين', 'China'], france: ['فرنسا', 'France'], italy: ['إيطاليا', 'Italy'], spain: ['إسبانيا', 'Spain'], lebanon: ['لبنان', 'Lebanon'], tunisia: ['تونس', 'Tunisia'], libya: ['ليبيا', 'Libya'], yemen: ['اليمن', 'Yemen'] };

// كود الإعلان كما أرسله صاحب الموقع (بدون تعديل)
export const AD = `<div class="ad-slot">
<!-- HIJUN -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1982414703735990"
     data-ad-slot="2556841535"
     data-page-url="https://www.uaewazyef.xyz/"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>`;

// قائمة الدول اللي فوق
const COUNTRIES = [['AED', 'الإمارات', 'UAE'], ['SAR', 'السعودية', 'Saudi Arabia'], ['KWD', 'الكويت', 'Kuwait'], ['QAR', 'قطر', 'Qatar'], ['OMR', 'عُمان', 'Oman'], ['BHD', 'البحرين', 'Bahrain'], ['EGP', 'مصر', 'Egypt'], ['INR', 'الهند', 'India'], ['PKR', 'باكستان', 'Pakistan'], ['BDT', 'بنجلاديش', 'Bangladesh'], ['TRY', 'تركيا', 'Turkey'], ['USD', 'أمريكا', 'USA'], ['GBP', 'بريطانيا', 'UK'], ['CAD', 'كندا', 'Canada'], ['AUD', 'أستراليا', 'Australia'], ['PHP', 'الفلبين', 'Philippines'], ['MYR', 'ماليزيا', 'Malaysia'], ['NPR', 'نيبال', 'Nepal'], ['ZAR', 'جنوب أفريقيا', 'South Africa'], ['IQD', 'العراق', 'Iraq'], ['JOD', 'الأردن', 'Jordan'], ['MAD', 'المغرب', 'Morocco'], ['DZD', 'الجزائر', 'Algeria'], ['IDR', 'إندونيسيا', 'Indonesia'], ['THB', 'تايلاند', 'Thailand'], ['VND', 'فيتنام', 'Vietnam'], ['SGD', 'سنغافورة', 'Singapore'], ['LKR', 'سريلانكا', 'Sri Lanka'], ['EUR', 'ألمانيا', 'Germany'], ['JPY', 'اليابان', 'Japan'], ['CHF', 'سويسرا', 'Switzerland'], ['NGN', 'نيجيريا', 'Nigeria'], ['GHS', 'غانا', 'Ghana'], ['KES', 'كينيا', 'Kenya'], ['MXN', 'المكسيك', 'Mexico'], ['BRL', 'البرازيل', 'Brazil'], ['CNY', 'الصين', 'China'], ['LBP', 'لبنان', 'Lebanon'], ['TND', 'تونس', 'Tunisia'], ['LYD', 'ليبيا', 'Libya'], ['YER', 'اليمن', 'Yemen']];
// نعلّم كلمة "درهم" و"AED" في النص عشان تتغير لعملة الدولة المختارة
// (ما عدا جوه القوائم والسكريبتات، وجملة سعر الربط "3.6725 درهم للدولار")
function markCur(html) {
  let skip = 0;
  return html.split(/(<[^>]+>)/).map(t => {
    if (t.startsWith('<')) {
      if (/^<(option|script|title|textarea|select)\b/i.test(t)) skip++;
      else if (/^<\/(option|script|title|textarea|select)>/i.test(t)) skip = Math.max(0, skip - 1);
      return t;
    }
    if (skip) return t;
    return t.replace(/\bAED\b(?!\s*per (US )?dollar)/g, '<span data-cl="c">AED</span>')
      .replace(/(?<![\u0600-\u06FF])درهم(?![\u0600-\u06FF])(?!\s*للدولار)/g, '<span data-cl="n">درهم</span>');
  }).join('');
}

function layout(p, ctx) {
  const L = p.lang, en = L === 'en', tr = L === 'tr';
  const self = SITE + (p.file ? '/' + p.file : url(L, p.slug));
  // الصفحات الخاصة بدولة: الرئيسية وصفحات العيارات الأربعة (عربي وإنجليزي)
  let ctry = '', sub = '';
  const cm = p.slug.match(/^(saudi|kuwait|qatar|oman|bahrain|egypt|india|pakistan|bangladesh|turkey|usa|uk|canada|australia|philippines|malaysia|nepal|southafrica|iraq|jordan|morocco|algeria|indonesia|thailand|vietnam|singapore|srilanka|germany|japan|switzerland|nigeria|ghana|kenya|mexico|brazil|china|france|italy|spain|lebanon|tunisia|libya|yemen)(?:\/(gold-(?:24|22|21|18)k))?$/);
  if (cm) { ctry = cm[1]; sub = cm[2] || ''; }
  else if (tr) {
    const tm = p.slug.match(/^turkiye(?:\/(24|22|21|18)-ayar-altin)?$/);
    if (tm) { ctry = 'turkey'; sub = tm[1] ? `gold-${tm[1]}k` : ''; }
  } else if (L === 'hi') {
    const hm = p.slug.match(/^sone-ka-bhav(?:\/(24|22|21|18)-karat)?$/);
    if (hm) { ctry = 'india'; sub = hm[1] ? `gold-${hm[1]}k` : ''; }
  } else if (L === 'ur') {
    const um = p.slug.match(/^sone-ka-rate(?:\/(24|22|21|18)-karat)?$/);
    if (um) { ctry = 'pakistan'; sub = um[1] ? `gold-${um[1]}k` : ''; }
  } else if (L === 'id') {
    const im = p.slug.match(/^harga-emas(?:\/(24|22|21|18)-karat)?$/);
    if (im) { ctry = 'indonesia'; sub = im[1] ? `gold-${im[1]}k` : ''; }
  } else if (L === 'bn') {
    const bm = p.slug.match(/^sonar-dam(?:\/(24|22|21|18)-karat)?$/);
    if (bm) { ctry = 'bangladesh'; sub = bm[1] ? `gold-${bm[1]}k` : ''; }
  } else if (L === 'tl') {
    const pm = p.slug.match(/^presyo-ng-ginto(?:\/(24|22|21|18)-karat)?$/);
    if (pm) { ctry = 'philippines'; sub = pm[1] ? `gold-${pm[1]}k` : ''; }
  } else if (L === 'ms') {
    const mm = p.slug.match(/^harga-emas(?:\/(24|22|21|18)-karat)?$/);
    if (mm) { ctry = 'malaysia'; sub = mm[1] ? `gold-${mm[1]}k` : ''; }
  }
  else if (/^dollar-.+$/.test(p.slug)) ctry = p.slug.slice(7);
  else if (p.slug === '' && !p.file) ctry = 'uae';
  else if (/^gold-(?:24|22|21|18)k$/.test(p.slug)) { ctry = 'uae'; sub = p.slug; }
  let body = !ctry && !p.fixed ? markCur(p.body) : p.body;
  if (ctry && !p.slug.endsWith('gold-calculator')) body = body.replace(/href="(\/(?:en\/)?gold-calculator\/)"/g, (_, href) => `href="${href}?country=${ctry}"`);
  if(ctry && !sub && !p.slug.startsWith('dollar-') && (L==='ar'||en)){const market=ctx.markets.find(m=>m.slug===ctry);if(market){const alertLink=`<p class="country-alert-link"><a href="${url(L,'price-alerts')}?country=${ctry}">${en?'Save a gold price target for this country':'احفظ سعراً مستهدفاً للذهب في هذه الدولة'}</a> <small>${en?'Free device alert while the site is open':'تنبيه مجاني على الجهاز أثناء فتح الموقع'}</small></p>`;const chart=alertLink+historySection(ctx.countryHistory,market,L,TODAY).replace('data-as-of=',`data-version="${ASSET_V.historydata}" data-as-of=`);body=body.replace('</section>','</section>'+chart);}}
  const cselect = `<select id="country" class="ctry" aria-label="${en ? 'Country' : tr ? 'Ülke' : L === 'hi' ? 'देश' : L === 'ur' ? 'ملک' : L === 'id' ? 'Negara' : L === 'ms' ? 'Negara' : L === 'tl' ? 'Bansa' : L === 'bn' ? 'দেশ' : 'الدولة'}">${COUNTRIES.map(([c, a, e]) => `<option value="${c}">${L === 'ar' ? a : e}</option>`).join('')}</select>`;
  const altLinks = p.noindex ? '' : p.alts
    ? p.alts.map(([h, u]) => `<link rel="alternate" hreflang="${h}" href="${SITE + u}" />`).join('\n  ')
    : p.alt
    ? `<link rel="alternate" hreflang="ar" href="${SITE + url('ar', p.slug)}" />
  <link rel="alternate" hreflang="en" href="${SITE + url('en', p.slug)}" />
  <link rel="alternate" hreflang="x-default" href="${SITE + url('ar', p.slug)}" />`
    : `<link rel="alternate" hreflang="${L}" href="${self}" />
  <link rel="alternate" hreflang="x-default" href="${self}" />`;
  const langHome = tr ? 'turkiye' : L === 'hi' ? 'sone-ka-bhav' : L === 'ur' ? 'sone-ka-rate' : L === 'id' ? 'harga-emas' : L === 'bn' ? 'sonar-dam' : L === 'tl' ? 'presyo-ng-ginto' : L === 'ms' ? 'harga-emas' : '';
  const crumbs = [[en ? 'Home' : tr ? 'Ana sayfa' : L === 'hi' ? 'होम' : L === 'ur' ? 'ہوم' : L === 'id' ? 'Beranda' : L === 'bn' ? 'হোম' : L === 'tl' ? 'Home' : L === 'ms' ? 'Laman Utama' : 'الرئيسية', url(L, langHome)], ...(p.crumbs || [])];
  const schema = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: p.title, description: p.desc, url: self, inLanguage: L, dateModified: p.lastmod || TODAY,
      isPartOf: { '@type': 'WebSite', name: en ? 'Gold Prices Today — Maelumatii' : 'معلوماتي — أسعار الذهب في الإمارات', url: SITE + '/' },
      publisher: { '@type': 'Organization', name: 'Maelumatii', url: SITE + '/', logo: SITE + '/icons/icon-512x512.png' } },
    ...(crumbs.length > 1 ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) }] : []),
    ...(p.faq ? [{ '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) }] : []),
    ...(p.schema || [])
  ];
  const nav = NAV[L].map(([s, n]) => `<li><a href="${url(L, s)}"${s === p.slug ? ' aria-current="page"' : ''}>${n}</a></li>`).join('');
  // روابط التحويل لكل لغة: تحافظ على الدولة/العيار/الدولار لو فيه مقابل، وإلا لرئيسية اللغة
  const langUrlFor = lg => {
    const home = LANG_HOME[lg] || '';
    if (p.dollar) {
      const ds = ctry ? (ctry === 'uae' ? 'dollar-uae' : `dollar-${ctry}`) : 'dollar';
      if (lg === 'ar') return url('ar', (!ctry || ctry === 'uae' || AR_CTRIES.has(ctry)) ? ds : home);
      return url('en', ds);
    }
    if (ctry) {
      const ks = sub ? sub.replace('gold-', '').replace('k', '') : '';
      const goldSlug = () => (ctry === 'uae' ? (ks ? `gold-${ks}k` : '') : ctry + (ks ? `/gold-${ks}k` : ''));
      if (lg === 'ar') return url('ar', ctry === 'uae' || AR_CTRIES.has(ctry) ? goldSlug() : home);
      if (lg === 'en') return url('en', goldSlug());
      const pc = PILOT_CTRY[lg];
      if (pc && pc[0] === ctry) {
        if (lg === 'tr') return url('tr', ks ? `turkiye/${ks}-ayar-altin` : 'turkiye');
        return url(lg, pc[1] + (ks ? `/${ks}-karat` : ''));
      }
      return url(lg, home);
    }
    if ((lg === 'ar' || lg === 'en') && p.alt) return url(lg, p.slug);
    return url(lg, home);
  };
  const langUrls = Object.fromEntries(LANGS.map(([lg]) => [lg, langUrlFor(lg)]));
  const langSel = `<select id="langsel" class="ctry" aria-label="${L === 'ar' ? 'اللغة' : 'Language'}">${LANGS.map(([lg, nm]) => `<option value="${lg}"${lg === L ? ' selected' : ''}>${nm}</option>`).join('')}</select>`;
  // زر التبديل بين صفحة الذهب وصفحة الدولار لنفس الدولة (في الاتجاهين)
  let toggle = '', toggleM = '';
  if (p.dollar) {
    const backUrl = ctry && CNAMES[ctry]
      ? ((L === 'ar' && (ctry === 'uae' || AR_CTRIES.has(ctry))) ? url('ar', ctry === 'uae' ? '' : ctry) : url('en', ctry === 'uae' ? '' : ctry))
      : url(L === 'ar' ? 'ar' : 'en', '');
    const backLabel = ctry && CNAMES[ctry]
      ? (L === 'ar' ? `سعر الذهب في ${CNAMES[ctry][0]}` : `Gold price in ${CNAMES[ctry][1]}`)
      : (L === 'ar' ? 'أسعار الذهب' : 'Gold prices');
    toggle = `<div class="page-toggle"><a href="${backUrl}">🪙 ${backLabel}</a></div>`;
    toggleM = `<a class="page-toggle-m" href="${backUrl}" aria-label="${backLabel}">🪙</a>`;
  } else if (ctry && CNAMES[ctry] && ctry !== 'usa') {
    const ds = ctry === 'uae' ? 'dollar-uae' : `dollar-${ctry}`;
    const du = (L === 'ar' && (ctry === 'uae' || AR_CTRIES.has(ctry))) ? url('ar', ds) : url('en', ds);
    const dLabel = L === 'ar' ? `سعر الدولار في ${CNAMES[ctry][0]}` : `Dollar price in ${CNAMES[ctry][1]}`;
    toggle = `<div class="page-toggle"><a href="${du}">💵 ${dLabel}</a></div>`;
    toggleM = `<a class="page-toggle-m" href="${du}" aria-label="${dLabel}">💵</a>`;
  }
  const modeNames = {ar:['أسعار الذهب','أسعار الدولار'],en:['Gold prices','Dollar prices'],tr:['Altın fiyatları','Dolar fiyatları'],hi:['सोने की कीमत','डॉलर की कीमत'],ur:['سونے کی قیمت','ڈالر کی قیمت'],id:['Harga emas','Harga dolar'],ms:['Harga emas','Harga dolar'],bn:['সোনার দাম','ডলারের দাম'],tl:['Presyo ng ginto','Presyo ng dolyar']}[L] || ['Gold prices','Dollar prices'];
  const modeCountry = ctry && CNAMES[ctry] ? ctry : 'uae';
  const modeLang = L === 'ar' && (modeCountry === 'uae' || AR_CTRIES.has(modeCountry)) ? 'ar' : 'en';
  const modeGold = url(modeLang, modeCountry === 'uae' ? '' : modeCountry);
  const modeDollar = url(modeLang, modeCountry === 'usa' ? 'dollar' : 'dollar-' + modeCountry);
  toggleM = `<select class="ctry price-mode" id="price-mode" aria-label="${L === 'ar' ? 'نوع الأسعار' : 'Price type'}"><option value="gold"${!p.dollar ? ' selected' : ''} data-url="${modeGold}">${modeNames[0]}</option><option value="dollar"${p.dollar ? ' selected' : ''} data-url="${modeDollar}">${modeNames[1]}</option></select>`;
  const crumbHtml = crumbs.length > 1
    ? `<nav class="crumbs" aria-label="breadcrumb">${crumbs.map(([n, u], i) => i < crumbs.length - 1 ? `<a href="${u}">${n}</a> › ` : `<span>${n}</span>`).join('')}</nav>` : '';
  const footer = L === 'tl'
    ? `<div class="footer-links"><a href="/tl/presyo-ng-ginto/">Presyo ng ginto</a><a href="/en/philippines/">English version</a><a href="/privacy/">Privacy</a></div>
<p>Pinagmulan ng presyo: Gold-API.com · Palitan: open.er-api.com · Ina-update kada 5 minuto.</p>
<p>Hindi kasama ang making charge at buwis. Para sa impormasyon lamang; hindi payo sa pamumuhunan. © ${TODAY.slice(0, 4)} maelumatii.com</p>`
    : L === 'ms'
    ? `<div class="footer-links"><a href="/ms/harga-emas/">Harga emas</a><a href="/en/malaysia/">English version</a><a href="/privacy/">Privasi</a></div>
<p>Sumber harga: Gold-API.com · Kadar tukaran: open.er-api.com · Dikemas kini setiap 5 minit.</p>
<p>Harga tidak termasuk upah dan cukai. Untuk maklumat sahaja; bukan nasihat pelaburan. © ${TODAY.slice(0, 4)} maelumatii.com</p>`
    : L === 'bn'
    ? `<div class="footer-links"><a href="/bn/sonar-dam/">সোনার দাম</a><a href="/en/bangladesh/">English version</a><a href="/privacy/">গোপনীয়তা</a></div>
<p>মূল্যের উৎস: Gold-API.com · বিনিময় হার: open.er-api.com · প্রতি ৫ মিনিটে হালনাগাদ।</p>
<p>দামে মজুরি ও ভ্যাট অন্তর্ভুক্ত নয়। শুধুমাত্র তথ্যের জন্য; বিনিয়োগ পরামর্শ নয়। © ${TODAY.slice(0, 4)} maelumatii.com</p>`
    : L === 'id'
    ? `<div class="footer-links"><a href="/id/harga-emas/">Harga emas</a><a href="/en/indonesia/">English version</a><a href="/privacy/">Privasi</a></div>
<p>Data harga: Gold-API.com · Kurs: open.er-api.com · Diperbarui setiap 5 menit.</p>
<p>Harga belum termasuk ongkos pembuatan dan pajak. Hanya untuk informasi; bukan saran investasi. © ${TODAY.slice(0, 4)} maelumatii.com</p>`
    : L === 'ur'
    ? `<div class="footer-links"><a href="/ur/sone-ka-rate/">سونے کا ریٹ</a><a href="/en/pakistan/">English version</a><a href="/privacy/">پرائیویسی</a></div>
<p>قیمتوں کا ذریعہ: Gold-API.com · شرح تبادلہ: open.er-api.com · ہر 5 منٹ میں تازہ کاری۔</p>
<p>قیمتوں میں مزدوری اور ٹیکس شامل نہیں۔ صرف معلومات کے لیے؛ سرمایہ کاری کا مشورہ نہیں۔ © ${TODAY.slice(0, 4)} maelumatii.com</p>`
    : L === 'hi'
    ? `<div class="footer-links"><a href="/hi/sone-ka-bhav/">सोने का भाव</a><a href="/en/india/">English version</a><a href="/privacy/">गोपनीयता</a></div>
<p>मूल्य डेटा: Gold-API.com · विनिमय दरें: open.er-api.com · हर 5 मिनट में अपडेट।</p>
<p>कीमतों में मेकिंग चार्ज और GST शामिल नहीं हैं। केवल जानकारी के लिए; निवेश सलाह नहीं। © ${TODAY.slice(0, 4)} maelumatii.com</p>`
    : tr
    ? `<div class="footer-links"><a href="/tr/turkiye/">Gram altın</a><a href="/en/turkey/">English version</a><a href="/privacy/">Gizlilik</a></div>
<p>Fiyat verileri: Gold-API.com · Döviz kurları: open.er-api.com · Her 5 dakikada güncellenir.</p>
<p>Fiyatlara işçilik ve KDV dahil değildir. Bilgi amaçlıdır; yatırım tavsiyesi değildir. © ${TODAY.slice(0, 4)} maelumatii.com</p>`
    : en
    ? `<div class="footer-links"><a href="/en/">Gold price UAE</a><a href="/en/gold-calculator/">Gold calculator</a><a href="/en/gold-bars/">Gold bars</a><a href="/about/">About us (Arabic)</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy policy</a></div>
<p>Spot price data: Gold-API.com · USD/AED fixed peg 3.6725 · Updated every 5 minutes.</p>
<p>Prices exclude making charges and VAT. For information only — not investment advice. © ${TODAY.slice(0, 4)} maelumatii.com</p>`
    : `<div class="footer-links"><a href="/">سعر الذهب اليوم</a><a href="/history/">أرشيف الأسعار</a><a href="/gcc/">أسعار الذهب في الخليج</a><a href="/about/">من نحن</a><a href="/contact/">اتصل بنا</a><a href="/privacy/">سياسة الخصوصية</a><a href="/en/">English</a></div>
<p>مصدر السعر العالمي: Gold-API.com · سعر الدولار مقابل الدرهم ثابت رسمياً 3.6725 · تحديث كل 5 دقائق.</p>
<p>الأسعار لا تشمل المصنعية أو ضريبة القيمة المضافة، وهي للاطلاع فقط ولا تمثّل نصيحة استثمارية. © ${TODAY.slice(0, 4)} maelumatii.com</p>`;

  return `<!DOCTYPE html>
<html lang="${L}" dir="${L === 'ar' || L === 'ur' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.desc)}" />
  <meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large'}" />
  <link rel="canonical" href="${self}" />
  ${altLinks}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${self}" />
  <meta property="og:title" content="${esc(p.title)}" />
  <meta property="og:description" content="${esc(p.desc)}" />
  <meta property="og:image" content="${SITE}/icons/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="${tr ? 'tr_TR' : L === 'hi' ? 'hi_IN' : L === 'ur' ? 'ur_PK' : L === 'id' ? 'id_ID' : L === 'bn' ? 'bn_BD' : L === 'tl' ? 'tl_PH' : L === 'ms' ? 'ms_MY' : en ? 'en_AE' : 'ar_AE'}" />
  <meta property="og:site_name" content="${tr ? 'Maelumatii — Altın Fiyatları' : en ? 'Maelumatii — Gold Prices Today' : 'معلوماتي — أسعار الذهب في الخليج'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${SITE}/icons/og-image.png" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#e8b800" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="${tr ? 'Altın' : L === 'hi' ? 'सोना' : L === 'ur' ? 'سونا' : L === 'id' ? 'Emas' : L === 'bn' ? 'সোনা' : L === 'tl' ? 'Ginto' : L === 'ms' ? 'Emas' : en ? 'Gold Prices' : 'ذهب الإمارات'}" />
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
  <link rel="icon" href="/icons/icon-96x96.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://api.gold-api.com" />
  <link rel="preconnect" href="https://kmvadxkjehxfxpeveekg.supabase.co" />
  <script>try{if(localStorage.getItem('mael-theme')!=='dark')document.documentElement.setAttribute('data-theme','light')}catch(e){document.documentElement.setAttribute('data-theme','light')}</script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=optional" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/style.css?v=${ASSET_V.css}" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1982414703735990" crossorigin="anonymous"></script>
  ${schema.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ')}
</head>
<body data-ctry="${ctry}" data-sub="${sub}"${p.fixed ? ' data-fixed="1"' : ''}${p.dollar ? ' data-dollar="1"' : ''} data-av-resale="${ASSET_V.resale}" data-av-alerts="${ASSET_V.alerts}" data-av-assist="${ASSET_V.assist}" data-av-kb="${ASSET_V.kb}">
<header class="site-header"><div class="container"><div class="header-inner">
  <a href="${url(L, langHome)}" class="logo" aria-label="${L === 'ar' ? 'أسعار الذهب اليوم، الرئيسية' : 'Gold Prices Today, home'}"><img src="/icons/icon-72x72.png" alt="" width="28" height="28" /><span>${tr ? 'Altın Fiyatları' : L === 'hi' ? 'सोने का भाव' : L === 'ur' ? 'سونے کا ریٹ' : L === 'id' ? 'Harga Emas' : L === 'bn' ? 'সোনার দাম' : L === 'tl' ? 'Presyo ng Ginto' : L === 'ms' ? 'Harga Emas' : en ? 'Gold Prices Today' : 'أسعار الذهب اليوم'}</span></a>
  ${toggle}
  <div class="header-side"><span class="header-time" id="live-time"></span>${toggleM}<button type="button" class="theme-toggle" id="theme-toggle" aria-label="${L === 'ar' ? 'التبديل بين المظهر الداكن والفاتح' : 'Switch between dark and light theme'}">🌙</button>${langSel}${cselect}</div>
</div></div></header>
<nav class="site-nav" aria-label="${en ? 'Main menu' : 'القائمة الرئيسية'}"><div class="container"><ul class="nav-list">${nav}</ul></div></nav>
<main><div class="container">
${crumbHtml}
${body}
${p.faq ? `<section class="card-section" id="faq"><h2>${en ? 'Frequently asked questions' : 'أسئلة شائعة'}</h2>${p.faq.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>` : ''}
${p.noAds ? '' : AD}
</div></main>
<footer class="site-footer"><div class="container">${footer}</div></footer>
<script>window.__G=${ctx.g24 ? ctx.g24.toFixed(4) : 'null'};window.__LANGURLS=${JSON.stringify(langUrls)};${p.usesAg ? `window.__AG=${ctx.ag ? ctx.ag.toFixed(4) : 'null'};` : ''}${p.usesFx ? `window.__FX=${JSON.stringify({ INR: ctx.fx.INR, PKR: ctx.fx.PKR, KWD: ctx.fx.KWD, EGP: ctx.fx.EGP, BDT: ctx.fx.BDT, TRY: ctx.fx.TRY, GBP: ctx.fx.GBP, CAD: ctx.fx.CAD, AUD: ctx.fx.AUD, PHP: ctx.fx.PHP, MYR: ctx.fx.MYR, NPR: ctx.fx.NPR, ZAR: ctx.fx.ZAR, IQD: ctx.fx.IQD, MAD: ctx.fx.MAD, DZD: ctx.fx.DZD, IDR: ctx.fx.IDR, THB: ctx.fx.THB, VND: ctx.fx.VND, SGD: ctx.fx.SGD, LKR: ctx.fx.LKR, EUR: ctx.fx.EUR, JPY: ctx.fx.JPY, CHF: ctx.fx.CHF, NGN: ctx.fx.NGN, GHS: ctx.fx.GHS, KES: ctx.fx.KES, MXN: ctx.fx.MXN, BRL: ctx.fx.BRL, CNY: ctx.fx.CNY, LBP: ctx.fx.LBP, TND: ctx.fx.TND, LYD: ctx.fx.LYD, YER: ctx.fx.YER })};` : ''}</script>
<a class="tg-float" href="https://t.me/emaratijob" target="_blank" rel="noopener" aria-label="${L === 'ar' ? 'أسعار الذهب يومياً على تيليجرام' : 'Daily gold prices on Telegram'}"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M9.04 15.9l-.38 5.36c.55 0 .79-.24 1.08-.52l2.6-2.48 5.38 3.94c.99.55 1.69.26 1.96-.9l3.55-16.64c.32-1.45-.52-2.02-1.47-1.66L1.7 10.8c-1.42.55-1.4 1.34-.24 1.7l5.3 1.65L18.98 5.7c.58-.38 1.1-.17.67.21L9.04 15.9z"/></svg><span>${L === 'ar' ? 'أسعار الذهب يومياً' : 'Daily prices on Telegram'}</span></a>
<div id="chat-widget">
<button type="button" id="chat-fab" aria-expanded="false" aria-label="${L === 'ar' ? 'اسأل مساعد الذهب' : 'Ask the gold assistant'}">💬</button>
<div id="chat-panel" class="chat-panel" hidden role="dialog" aria-label="${L === 'ar' ? 'مساعد الذهب' : 'Gold assistant'}">
  <div class="chat-panel-head"><span>🪙 ${L === 'ar' ? 'مساعد الذهب' : 'Gold assistant'}</span><a class="chat-full" href="${url(L === 'ar' ? 'ar' : 'en', 'assistant')}" aria-label="${L === 'ar' ? 'فتح صفحة المساعد' : 'Open assistant page'}">⛶</a><button type="button" class="chat-close" aria-label="${L === 'ar' ? 'إغلاق' : 'Close'}">✕</button></div>
  <div class="chat-log" aria-live="polite"></div>
  <div class="chat-chips"></div>
  <form class="chat-form"><input class="chat-in" type="text" autocomplete="off" placeholder="${L === 'ar' ? 'اسأل عن أسعار الذهب…' : 'Ask about gold prices…'}" aria-label="${L === 'ar' ? 'سؤالك' : 'Your question'}" /><button type="submit">${L === 'ar' ? 'اسأل' : 'Ask'}</button></form>
</div>
</div>
<script src="/assets/app.js?v=${ASSET_V.js}" defer></script>
${body.includes('id="gold-history"') ? `<script src="/assets/history.js?v=${ASSET_V.history}" defer></script>` : ''}
${p.assistant ? `<script src="/assets/assistant-kb.js?v=${ASSET_V.kb}" defer></script>\n<script src="/assets/assistant.js?v=${ASSET_V.assist}" defer></script>` : ''}
</body>
</html>`;
}

// ── Build ─────────────────────────────────────────────────────
async function write(file, content) {
  const f = path.join(OUT, file);
  await fs.mkdir(path.dirname(f), { recursive: true });
  await fs.writeFile(f, content);
}

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  for (const e of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    e.isDirectory() ? await copyDir(s, d) : await fs.copyFile(s, d);
  }
}

async function loadSilver() {
  try { const d = await getJSON('https://api.gold-api.com/price/XAG'); return d.price > 1 ? d.price * AED / TROY : null; }
  catch (e) { console.warn('silver failed:', e.message); return null; }
}
async function loadFX() {
  try { const d = await getJSON('https://open.er-api.com/v6/latest/USD'); return d.rates || {}; }
  catch (e) { console.warn('fx failed:', e.message); return {}; }
}

const price = await loadPrice();
const daily = process.env.FAKE_HISTORY ? JSON.parse(await fs.readFile(process.env.FAKE_HISTORY, 'utf8')) : await loadDaily();
let ag = await loadSilver(), fx = await loadFX();
if (process.env.FAKE_PRICE) { price.g24 = +process.env.FAKE_PRICE; price.at = new Date().toISOString(); ag = 49.25 * AED / TROY; fx = { INR: 95.0, PKR: 281.5, AED: 3.6725, KWD: 0.3065 }; }
const ctx = makeCtx(price, daily, { ag, fx });
ctx.countryHistory = await loadCountryHistory(TODAY);
console.log('price 24k:', price.g24 ? price.g24.toFixed(2) : 'n/a', '| days in archive:', daily.length);

await fs.rm(OUT, { recursive: true, force: true });
// الملفات ممكن تكون جوه فولدرات (static/ و assets/) أو كلها جنب بعض (لو اترفعت من المتصفح)
const exists = async p => !!(await fs.stat(p).catch(() => null));
async function place(name, dirs, dest) {
  for (const d of dirs) {
    const src = path.join(d, name);
    if (await exists(src)) { await fs.mkdir(path.dirname(dest), { recursive: true }); await fs.copyFile(src, dest); return; }
  }
  throw new Error('missing file: ' + name);
}
for (const f of ['style.css', 'app.js', 'assistant.js', 'alerts.js', 'resale.js']) await place(f, ['assets', '.'], path.join(OUT, 'assets', f));

/* قاعدة معرفة المساعد: تُبنى من مقالات الموقع وأسئلتها الشائعة (استرجاع نصي داخل المتصفح) */
{
  const stripH = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const cut = (s, n = 240) => (s.length <= n ? s : s.slice(0, n).replace(/\s\S*$/, '') + '…');
  const kbFrom = (arr, lang) => arr.flatMap(a => {
    const u = url(lang, 'articles/' + a.slug);
    const out = [{ t: stripH(a.h1 || a.title), d: cut(stripH(a.intro || a.desc), 600), u }];
    for (const match of String(a.body || '').matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) { const text = stripH(match[1]); if (text.length > 80) out.push({t: stripH(a.h1 || a.title), d: cut(text, 700), u}); }
    for (const [q, ans] of (a.faq || [])) out.push({ t: stripH(q), d: cut(stripH(ans)), u });
    return out;
  });
  const kbJs = 'window.__KB_AR=' + JSON.stringify(kbFrom(ARTICLES, 'ar')) + ';window.__KB_EN=' + JSON.stringify(kbFrom(ARTICLES_EN, 'en')) + ';';
  await fs.writeFile(path.join(OUT, 'assets', 'assistant-kb.js'), kbJs);
}
for (const f of ['sw.js', 'manifest.json', 'ads.txt', '_headers']) await place(f, ['static', '.'], path.join(OUT, f));
for (const s of [72, 96, 128, 144, 152, 192, 384, 512]) {
  const f = `icon-${s}x${s}.png`;
  await place(f, ['static/icons', 'icons', '.'], path.join(OUT, 'icons', f));
}
await place('og-image.png', ['static/icons', 'icons', '.'], path.join(OUT, 'icons', 'og-image.png'));

// رقم نسخة من محتوى الملف نفسه: أي تعديل في السكريبت أو التصميم يغيّر الرابط، فالمتصفح يجيب النسخة الجديدة فوراً
const hashOf = async f => crypto.createHash('md5').update(await fs.readFile(path.join(OUT, 'assets', f))).digest('hex').slice(0, 10);
ASSET_V.resale = await hashOf('resale.js'); ASSET_V.alerts = await hashOf('alerts.js'); ASSET_V.js = await hashOf('app.js'); ASSET_V.css = await hashOf('style.css'); ASSET_V.assist = await hashOf('assistant.js'); ASSET_V.kb = await hashOf('assistant-kb.js');
await fs.writeFile(path.join(OUT,'assets','gold-history.json'),JSON.stringify(ctx.countryHistory));
const historyJs='(function(){'+(await fs.readFile('history-core.mjs','utf8')).replace(/^export /gm,'')+'\n'+await fs.readFile('history-client.js','utf8')+'})();';
await fs.writeFile(path.join(OUT,'assets','history.js'),historyJs);
ASSET_V.history=await hashOf('history.js'); ASSET_V.historydata=await hashOf('gold-history.json');
const list = pages(ctx);
const sitemap = [];
for (const p of list) {
  const html = layout(p, ctx);
  await write(p.file || path.join(url(p.lang, p.slug), 'index.html'), html);
  if (!p.noindex && !p.file) sitemap.push(p);
}

const smEntries = sitemap.map(p => {
  const alts = p.alts
    ? p.alts.map(([h, u]) => `\n    <xhtml:link rel="alternate" hreflang="${h}" href="${SITE + u}"/>`).join('')
    : p.alt ? ['ar', 'en'].map(l => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE + url(l, p.slug)}"/>`).join('') +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE + url('ar', p.slug)}"/>`
    : `\n    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${SITE + url(p.lang, p.slug)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE + url(p.lang, p.slug)}"/>`;
  return `  <url>\n    <loc>${SITE + url(p.lang, p.slug)}</loc>\n    <lastmod>${p.lastmod || TODAY}</lastmod>${alts}\n  </url>`;
}).join('\n');
await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${smEntries}\n</urlset>\n`);
await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
// llms.txt — ملف تعريفي لبرامج الذكاء الاصطناعي الزاحفة (مثل robots.txt لكن للنماذج)
const llmsArticles = sitemap.filter(p => p.slug.startsWith('articles/'));
const llmsCountries = sitemap.filter(p => p.lang === 'en' && Object.prototype.hasOwnProperty.call(CNAMES, p.slug));
await write('llms.txt', `# Gold Prices Today (maelumatii.com)\n\n> Live gold prices in 44 countries and 40+ currencies, in 9 languages: per gram, tola, ounce and kilo for karats 24K, 22K, 21K and 18K, updated every 5 minutes, plus gold and zakat calculators, a free gold/currency search assistant, and localized buying guides. The chat widget retrieves passages from ${ARTICLES.length + ARTICLES_EN.length} articles and FAQs; it is not a general-purpose language model.\n\n## Core tools\n\n- [Gold price in UAE (Arabic)](${SITE}/): الصفحة الرئيسية بالعربية\n- [Gold price in UAE (English)](${SITE}/en/): live 24K/22K/21K/18K gram prices\n- [Gold calculator](${SITE}/en/gold-calculator/): with making charges and VAT\n- [Gold resale calculator](${SITE}/en/gold-resale-calculator/): net offers and break-even\n- [Price alerts](${SITE}/en/price-alerts/): device-only targets while the site is open\n- [Zakat calculator](${SITE}/en/zakat-calculator/): nisab and zakat due\n- [Gold bar prices](${SITE}/en/gold-bars/): 1 g to 1 kg\n- [Gold price in USD](${SITE}/en/gold-price-usd/): live XAU/USD ounce\n- [US dollar rate](${SITE}/en/dollar/): USD vs 40 currencies\n- [Silver price](${SITE}/en/silver/)\n- [Gulf comparison](${SITE}/en/gcc/): 6 GCC countries side by side\n- [Gold forecast](${SITE}/en/gold-forecast/): trend and drivers\n- [Price history](${SITE}/history/): daily archive\n- [Gold assistant](${SITE}/en/assistant/): ask any gold or currency question\n\n## Gold prices by country (English)\n\n${llmsCountries.map(p => `- [${p.title}](${SITE}${url(p.lang, p.slug)})`).join('\n')}\n\n## Guides and articles\n\n${llmsArticles.map(p => `- [${p.title}](${SITE}${url(p.lang, p.slug)})`).join('\n')}\n\n## Data sources\n\nSpot price: Gold-API.com, refreshed every 5 minutes. Exchange rates: open.er-api.com. Prices exclude making charges and local taxes; content is informational, not investment advice.\n`);
console.log(`built ${list.length} pages, ${sitemap.length} in sitemap → ${OUT}/`);
