// ══════════════════════════════════════════════════════════════
//  نشر أسعار الذهب في قناة تيليجرام — maelumatii.com
//  كل مرة يشتغل: منشور منفصل لكل دولة (الإمارات، السعودية، الكويت، قطر، عُمان، البحرين)
//  بيشتغل من GitHub Actions (ملف .github/workflows/telegram.yml)
//  محتاج: TELEGRAM_BOT_TOKEN و TELEGRAM_CHAT_ID (اسم القناة زي @mychannel)
// ══════════════════════════════════════════════════════════════
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT = process.env.TELEGRAM_CHAT_ID;
const SITE = 'https://www.maelumatii.com';
const TROY = 31.1035;
const SB_URL = 'https://kmvadxkjehxfxpeveekg.supabase.co';
const SB_KEY = 'sb_publishable_kWJE1YujD-0VdmAOET0dVw_xOUNu2d1';

// الدول بالترتيب: الاسم، العملة، سعر الدولار (null = من سعر الصرف اليومي)، الكسور، المنطقة الزمنية، صفحة الموقع
const COUNTRIES = [
  { flag: '🇦🇪', name: 'الإمارات', code: 'AED', cur: 'درهم', usd: 3.6725, d: 2, tz: 'Asia/Dubai', path: '/' },
  { flag: '🇸🇦', name: 'السعودية', code: 'SAR', cur: 'ريال', usd: 3.75, d: 2, tz: 'Asia/Riyadh', path: '/saudi/' },
  { flag: '🇰🇼', name: 'الكويت', code: 'KWD', cur: 'دينار', usd: null, d: 3, tz: 'Asia/Kuwait', path: '/kuwait/' },
  { flag: '🇶🇦', name: 'قطر', code: 'QAR', cur: 'ريال', usd: 3.64, d: 2, tz: 'Asia/Qatar', path: '/qatar/' },
  { flag: '🇴🇲', name: 'عُمان', code: 'OMR', cur: 'ريال', usd: 0.3845, d: 3, tz: 'Asia/Muscat', path: '/oman/' },
  { flag: '🇧🇭', name: 'البحرين', code: 'BHD', cur: 'دينار', usd: 0.376, d: 3, tz: 'Asia/Bahrain', path: '/bahrain/' }
];

const getJSON = async (u, o = {}) => { const r = await fetch(u, { ...o, signal: AbortSignal.timeout(15000) }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); };
const f = (v, d = 2) => new Intl.NumberFormat('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function send(text) {
  if (process.env.DRY_RUN) { console.log(text + '\n────────────'); return; }
  const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT, text, parse_mode: 'HTML', disable_web_page_preview: true })
  });
  const out = await r.json();
  if (!out.ok) throw new Error('Telegram: ' + out.description);
}

async function main() {
  if (!TOKEN || !CHAT) throw new Error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing');
  const fake = process.env.FAKE_USD;
  const ounceUSD = fake ? +fake : (await getJSON('https://api.gold-api.com/price/XAU')).price;
  if (!(ounceUSD > 500)) throw new Error('bad gold price');
  let kwd = 0.307;
  try { if (!fake) kwd = (await getJSON('https://open.er-api.com/v6/latest/USD')).rates.KWD || kwd; } catch {}

  // التغيّر عن إغلاق أمس (نفس النسبة لكل الدول لأن السعر العالمي واحد)
  let chg = '';
  try {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });
    const rows = await getJSON(`${SB_URL}/rest/v1/gold_daily?day=lt.${today}&order=day.desc&limit=1&select=close_24k`,
      { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY } });
    if (rows[0]) {
      const p = (ounceUSD * 3.6725 / TROY - rows[0].close_24k) / rows[0].close_24k * 100;
      chg = Math.abs(p) < 0.01 ? '➖ بدون تغيير عن أمس' : p > 0 ? `🔺 ارتفاع ${f(p)}% عن أمس` : `🔻 انخفاض ${f(Math.abs(p))}% عن أمس`;
    }
  } catch {}

  const only = process.env.ONLY;   // للتجربة: ONLY=SAR ينشر السعودية بس
  for (const c of COUNTRIES) {
    if (only && only !== c.code) continue;
    const usd = c.usd ?? kwd;                       // سعر الدولار بعملة البلد
    const gram = k => ounceUSD / TROY * k / 24 * usd;
    const when = new Date().toLocaleString('ar-EG-u-nu-latn', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', timeZone: c.tz });
    const text = [
      `${c.flag} <b>أسعار الذهب في ${c.name} اليوم</b>`,
      `🗓 ${when}`,
      chg,
      ``,
      `🟡 سعر جرام عيار 21: <b>${f(gram(21), c.d)} ${c.cur}</b>`,
      `🟡 سعر جرام عيار 24: <b>${f(gram(24), c.d)} ${c.cur}</b>`,
      `🟡 سعر جرام عيار 22: <b>${f(gram(22), c.d)} ${c.cur}</b>`,
      `🟡 سعر جرام عيار 18: <b>${f(gram(18), c.d)} ${c.cur}</b>`,
      ``,
      `💵 سعر الدولار: <b>${f(usd, c.d === 3 ? 4 : 4)} ${c.cur}</b>`,
      `🌍 سعر الأونصة: <b>${f(ounceUSD * usd, c.d === 3 ? 3 : 2)} ${c.cur}</b> ($${f(ounceUSD)})`,
      ``,
      `📊 الأسعار لحظة بلحظة وحاسبة الذهب:`,
      `${SITE}${c.path}?utm_source=telegram`,
      ``,
      `<i>السعر للذهب الخام بدون مصنعية أو ضريبة.</i>`
    ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
    await send(text);
    await sleep(1500);
  }
  console.log('done');
}
main().catch(e => { console.error(e.message); process.exit(1); });
