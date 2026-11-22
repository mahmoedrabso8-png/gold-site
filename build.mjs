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

const SITE   = 'https://www.maelumatii.com';
const OUT    = 'dist';
const TROY   = 31.1035;
const AED    = 3.6725;
const SB_URL = 'https://kmvadxkjehxfxpeveekg.supabase.co';
const SB_KEY = process.env.SUPABASE_KEY || 'sb_publishable_kWJE1YujD-0VdmAOET0dVw_xOUNu2d1';
const TODAY  = new Date().toISOString().slice(0, 10);
const ASSET_V = { js: TODAY, css: TODAY };

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
  return { g24: g, ag, fx, PEG, rateOf, P, S, FX, FXD, updated, chg, daily, fmt, AED, TROY, SITE, TODAY, url, AD };
}

// ── Layout ────────────────────────────────────────────────────
export const url = (lang, slug) => (lang === 'ar' ? '/' : `/${lang}/`) + (slug ? slug + '/' : '');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const NAV = {
  ar: [['', 'الرئيسية'], ['gold-21k', 'عيار 21'], ['gold-24k', 'عيار 24'], ['gold-22k', 'عيار 22'], ['gold-18k', 'عيار 18'], ['gcc', 'مقارنة الخليج'], ['gold-price-usd', 'السعر العالمي'], ['silver', 'الفضة'], ['gold-bars', 'السبائك'], ['gold-calculator', 'حاسبة الذهب'], ['zakat-calculator', 'زكاة الذهب'], ['gold-price-yesterday', 'سعر أمس'], ['gold-forecast', 'توقعات الذهب'], ['articles', 'مقالات'], ['history', 'الأرشيف']],
  en: [['', 'Home'], ['gold-22k', '22K'], ['gold-24k', '24K'], ['gold-18k', '18K'], ['gold-21k', '21K'], ['gcc', 'Gulf compare'], ['gold-price-usd', 'Gold in USD'], ['silver', 'Silver'], ['gold-rate-inr', 'In INR'], ['gold-rate-pkr', 'In PKR'], ['gold-bars', 'Gold Bars'], ['gold-calculator', 'Calculator'], ['gold-price-yesterday', 'Last 10 days'], ['zakat-calculator', 'Zakat']],
  tr: [['turkiye', 'Gram Altın'], ['turkiye/24-ayar-altin', '24 Ayar'], ['turkiye/22-ayar-altin', '22 Ayar'], ['turkiye/21-ayar-altin', '21 Ayar'], ['turkiye/18-ayar-altin', '18 Ayar']]
};

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
  const self = SITE + url(L, p.slug);
  // الصفحات الخاصة بدولة: الرئيسية وصفحات العيارات الأربعة (عربي وإنجليزي)
  let ctry = '', sub = '';
  const cm = p.slug.match(/^(saudi|kuwait|qatar|oman|bahrain|egypt|india|pakistan|bangladesh|turkey|usa|uk|canada|australia|philippines|malaysia|nepal|southafrica|iraq|jordan|morocco|algeria|indonesia|thailand|vietnam|singapore|srilanka|germany|japan|switzerland|nigeria|ghana|kenya|mexico|brazil|china|france|italy|spain|lebanon|tunisia|libya|yemen)(?:\/(gold-(?:24|22|21|18)k))?$/);
  if (cm) { ctry = cm[1]; sub = cm[2] || ''; }
  else if (tr) {
    const tm = p.slug.match(/^turkiye(?:\/(24|22|21|18)-ayar-altin)?$/);
    if (tm) { ctry = 'turkey'; sub = tm[1] ? `gold-${tm[1]}k` : ''; }
  }
  else if (p.slug === '' && !p.file) ctry = 'uae';
  else if (/^gold-(?:24|22|21|18)k$/.test(p.slug)) { ctry = 'uae'; sub = p.slug; }
  const body = !ctry && !p.fixed ? markCur(p.body) : p.body;
  const cselect = `<select id="country" class="ctry" aria-label="${en ? 'Country' : tr ? 'Ülke' : 'الدولة'}">${COUNTRIES.map(([c, a, e]) => `<option value="${c}">${L === 'ar' ? a : e}</option>`).join('')}</select>`;
  const altLinks = p.alts
    ? p.alts.map(([h, u]) => `<link rel="alternate" hreflang="${h}" href="${SITE + u}" />`).join('\n  ')
    : p.alt
    ? `<link rel="alternate" hreflang="ar" href="${SITE + url('ar', p.slug)}" />
  <link rel="alternate" hreflang="en" href="${SITE + url('en', p.slug)}" />
  <link rel="alternate" hreflang="x-default" href="${SITE + url('ar', p.slug)}" />`
    : `<link rel="alternate" hreflang="${L}" href="${self}" />
  <link rel="alternate" hreflang="x-default" href="${self}" />`;
  const crumbs = [[en ? 'Home' : tr ? 'Ana sayfa' : 'الرئيسية', url(L, tr ? 'turkiye' : '')], ...(p.crumbs || [])];
  const schema = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: p.title, description: p.desc, url: self, inLanguage: L, dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', name: en ? 'UAE Gold Prices — Maelumatii' : 'معلوماتي — أسعار الذهب في الإمارات', url: SITE + '/' },
      publisher: { '@type': 'Organization', name: 'Maelumatii', url: SITE + '/', logo: SITE + '/icons/icon-512x512.png' } },
    ...(crumbs.length > 1 ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) }] : []),
    ...(p.faq ? [{ '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) }] : []),
    ...(p.schema || [])
  ];
  const nav = NAV[L].map(([s, n]) => `<li><a href="${url(L, s)}"${s === p.slug ? ' aria-current="page"' : ''}>${n}</a></li>`).join('');
  const langLink = tr
    ? `<a class="lang-link" href="${url('en', p.trEn || '')}" hreflang="en">English</a>`
    : p.alt
    ? `<a class="lang-link" href="${url(en ? 'ar' : 'en', p.slug)}" hreflang="${en ? 'ar' : 'en'}">${en ? 'عربي' : 'English'}</a>`
    : `<a class="lang-link" href="${url(en ? 'ar' : 'en', '')}">${en ? 'عربي' : 'English'}</a>`;
  const crumbHtml = crumbs.length > 1
    ? `<nav class="crumbs" aria-label="breadcrumb">${crumbs.map(([n, u], i) => i < crumbs.length - 1 ? `<a href="${u}">${n}</a> › ` : `<span>${n}</span>`).join('')}</nav>` : '';
  const footer = tr
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
<html lang="${L}" dir="${L === 'ar' ? 'rtl' : 'ltr'}">
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
  <meta property="og:locale" content="${tr ? 'tr_TR' : en ? 'en_AE' : 'ar_AE'}" />
  <meta property="og:site_name" content="${tr ? 'Maelumatii — Altın Fiyatları' : en ? 'Maelumatii — Gulf Gold Prices' : 'معلوماتي — أسعار الذهب في الخليج'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${SITE}/icons/og-image.png" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#e8b800" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="${tr ? 'Altın' : en ? 'UAE Gold' : 'ذهب الإمارات'}" />
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
  <link rel="icon" href="/icons/icon-96x96.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://api.gold-api.com" />
  <link rel="preconnect" href="https://kmvadxkjehxfxpeveekg.supabase.co" />
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/style.css?v=${ASSET_V.css}" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1982414703735990" crossorigin="anonymous"></script>
  ${schema.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ')}
</head>
<body data-ctry="${ctry}" data-sub="${sub}"${p.fixed ? ' data-fixed="1"' : ''}>
<header class="site-header"><div class="container"><div class="header-inner">
  <a href="${url(L, tr ? 'turkiye' : '')}" class="logo"><img src="/icons/icon-72x72.png" alt="" width="28" height="28" /><span>${tr ? 'Altın Fiyatları' : en ? 'Gulf Gold Prices' : 'أسعار الذهب اليوم'}</span></a>
  <div class="header-side"><span class="header-time" id="live-time"></span>${cselect}${langLink}</div>
</div></div></header>
<nav class="site-nav" aria-label="${en ? 'Main menu' : 'القائمة الرئيسية'}"><div class="container"><ul class="nav-list">${nav}</ul></div></nav>
<main><div class="container">
${crumbHtml}
${body}
${p.faq ? `<section class="card-section" id="faq"><h2>${en ? 'Frequently asked questions' : 'أسئلة شائعة'}</h2>${p.faq.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>` : ''}
${p.noAds ? '' : AD}
</div></main>
<footer class="site-footer"><div class="container">${footer}</div></footer>
<script>window.__G=${ctx.g24 ? ctx.g24.toFixed(4) : 'null'};${p.usesAg ? `window.__AG=${ctx.ag ? ctx.ag.toFixed(4) : 'null'};` : ''}${p.usesFx ? `window.__FX=${JSON.stringify({ INR: ctx.fx.INR, PKR: ctx.fx.PKR, KWD: ctx.fx.KWD, EGP: ctx.fx.EGP, BDT: ctx.fx.BDT, TRY: ctx.fx.TRY, GBP: ctx.fx.GBP, CAD: ctx.fx.CAD, AUD: ctx.fx.AUD, PHP: ctx.fx.PHP, MYR: ctx.fx.MYR, NPR: ctx.fx.NPR, ZAR: ctx.fx.ZAR, IQD: ctx.fx.IQD, MAD: ctx.fx.MAD, DZD: ctx.fx.DZD, IDR: ctx.fx.IDR, THB: ctx.fx.THB, VND: ctx.fx.VND, SGD: ctx.fx.SGD, LKR: ctx.fx.LKR, EUR: ctx.fx.EUR, JPY: ctx.fx.JPY, CHF: ctx.fx.CHF, NGN: ctx.fx.NGN, GHS: ctx.fx.GHS, KES: ctx.fx.KES, MXN: ctx.fx.MXN, BRL: ctx.fx.BRL, CNY: ctx.fx.CNY, LBP: ctx.fx.LBP, TND: ctx.fx.TND, LYD: ctx.fx.LYD, YER: ctx.fx.YER })};` : ''}</script>
<a class="tg-float" href="https://t.me/emaratijob" target="_blank" rel="noopener" aria-label="${L === 'ar' ? 'أسعار الذهب يومياً على تيليجرام' : 'Daily gold prices on Telegram'}"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M9.04 15.9l-.38 5.36c.55 0 .79-.24 1.08-.52l2.6-2.48 5.38 3.94c.99.55 1.69.26 1.96-.9l3.55-16.64c.32-1.45-.52-2.02-1.47-1.66L1.7 10.8c-1.42.55-1.4 1.34-.24 1.7l5.3 1.65L18.98 5.7c.58-.38 1.1-.17.67.21L9.04 15.9z"/></svg><span>${L === 'ar' ? 'أسعار الذهب يومياً' : 'Daily prices on Telegram'}</span></a>
<script src="/assets/app.js?v=${ASSET_V.js}" defer></script>
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
for (const f of ['style.css', 'app.js']) await place(f, ['assets', '.'], path.join(OUT, 'assets', f));
for (const f of ['sw.js', 'manifest.json', 'ads.txt', '_headers']) await place(f, ['static', '.'], path.join(OUT, f));
for (const s of [72, 96, 128, 144, 152, 192, 384, 512]) {
  const f = `icon-${s}x${s}.png`;
  await place(f, ['static/icons', 'icons', '.'], path.join(OUT, 'icons', f));
}
await place('og-image.png', ['static/icons', 'icons', '.'], path.join(OUT, 'icons', 'og-image.png'));

// رقم نسخة من محتوى الملف نفسه: أي تعديل في السكريبت أو التصميم يغيّر الرابط، فالمتصفح يجيب النسخة الجديدة فوراً
const hashOf = async f => crypto.createHash('md5').update(await fs.readFile(path.join(OUT, 'assets', f))).digest('hex').slice(0, 10);
ASSET_V.js = await hashOf('app.js'); ASSET_V.css = await hashOf('style.css');
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
console.log(`built ${list.length} pages, ${sitemap.length} in sitemap → ${OUT}/`);
