// ══════════════════════════════════════════════════════════════
//  نشر أسعار الذهب في قناة تيليجرام — maelumatii.com
//  كل مرة يشتغل: منشور واحد مجمّع لكل الدول (الخليج + مصر)
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
  { flag: '🇦🇪', name: 'الإمارات', code: 'AED', cur: 'درهم', usd: 3.6725, d: 2 },
  { flag: '🇸🇦', name: 'السعودية', code: 'SAR', cur: 'ريال', usd: 3.75, d: 2 },
  { flag: '🇰🇼', name: 'الكويت', code: 'KWD', cur: 'دينار', usd: null, d: 3 },
  { flag: '🇶🇦', name: 'قطر', code: 'QAR', cur: 'ريال', usd: 3.64, d: 2 },
  { flag: '🇴🇲', name: 'عُمان', code: 'OMR', cur: 'ريال', usd: 0.3845, d: 3 },
  { flag: '🇧🇭', name: 'البحرين', code: 'BHD', cur: 'دينار', usd: 0.376, d: 3 },
  { flag: '🇪🇬', name: 'مصر', code: 'EGP', cur: 'جنيه', usd: null, d: 0 }
];
// احتياطي لو خدمة سعر الصرف وقعت: آخر قيم تقريبية (تتجاوزها القيمة الحية عند توفرها)
const FX_FALLBACK = { KWD: 0.307, EGP: 50 };

const getJSON = async (u, o = {}) => { const r = await fetch(u, { ...o, signal: AbortSignal.timeout(15000) }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); };
const f = (v, d = 2) => new Intl.NumberFormat('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);

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
  // عملات غير مربوطة بالدولار (الدينار الكويتي والجنيه المصري) من سعر الصرف اليومي
  const fx = { ...FX_FALLBACK };
  try {
    const rates = (await getJSON('https://open.er-api.com/v6/latest/USD')).rates;
    for (const c of Object.keys(fx)) if (rates[c]) fx[c] = rates[c];
  } catch {}

  // التغيّر عن إغلاق أمس (نفس النسبة لكل الدول تقريباً لأن السعر العالمي واحد)
  let chg = '';
  try {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });
    const rows = await getJSON(`${SB_URL}/rest/v1/gold_daily?day=lt.${today}&order=day.desc&limit=1&select=close_24k`,
      { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY } });
    if (rows[0]) {
      const p = (ounceUSD * 3.6725 / TROY - rows[0].close_24k) / rows[0].close_24k * 100;
      chg = Math.abs(p) < 0.01 ? '➖ بدون تغيير يُذكر عن أمس' : p > 0 ? `🔺 ارتفاع ${f(p)}% عن إغلاق أمس` : `🔻 انخفاض ${f(Math.abs(p))}% عن إغلاق أمس`;
    }
  } catch {}

  const only = process.env.ONLY;   // للتجربة: ONLY=EGP ينشر مصر بس
  const list = COUNTRIES.filter(c => !only || only === c.code);
  const now = new Date();
  const day = now.toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Dubai' });
  const hour = +now.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Dubai' });
  const part = hour < 12 ? 'تحديث الصبح' : hour < 17 ? 'تحديث الظهر' : 'تحديث المساء';

  const lines = [
    `🟡 <b>أسعار الذهب اليوم — ${day}</b>`,
    `<i>${part}</i>${chg ? ' · ' + chg : ''}`,
    ``
  ];
  for (const c of list) {
    const usd = c.usd ?? fx[c.code];
    const gram = k => ounceUSD / TROY * k / 24 * usd;
    lines.push(`${c.flag} <b>${c.name}</b> · عيار 21: <b>${f(gram(21), c.d)}</b> · عيار 24: <b>${f(gram(24), c.d)}</b> ${c.cur}`);
  }
  lines.push(
    ``,
    `🌍 الأونصة العالمية: <b>$${f(ounceUSD)}</b>`,
    ``,
    `📊 كل العيارات لحظة بلحظة + حاسبة الذهب:`,
    `${SITE}/?utm_source=telegram`,
    ``,
    `<i>الأسعار للذهب الخام بدون مصنعية أو ضريبة.</i>`
  );
  await send(lines.join('\n'));
  console.log('done');
}
main().catch(e => { console.error(e.message); process.exit(1); });
