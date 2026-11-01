// نشر أسعار الذهب على X (تويتر) — maelumatii.com
// محتاج: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET
const { TwitterApi } = require('twitter-api-v2');

const SITE = 'https://www.maelumatii.com';
const TROY = 31.1035;
const SB_URL = 'https://kmvadxkjehxfxpeveekg.supabase.co';
const SB_KEY = 'sb_publishable_kWJE1YujD-0VdmAOET0dVw_xOUNu2d1';

const COUNTRIES = [
  { flag: '🇦🇪', name: 'الإمارات', code: 'AED', cur: 'درهم', usd: 3.6725, d: 2, tz: 'Asia/Dubai', path: '/', tag: '#الإمارات' },
  { flag: '🇸🇦', name: 'السعودية', code: 'SAR', cur: 'ريال', usd: 3.75, d: 2, tz: 'Asia/Riyadh', path: '/saudi/', tag: '#السعودية' },
  { flag: '🇰🇼', name: 'الكويت', code: 'KWD', cur: 'دينار', usd: null, d: 3, tz: 'Asia/Kuwait', path: '/kuwait/', tag: '#الكويت' },
  { flag: '🇶🇦', name: 'قطر', code: 'QAR', cur: 'ريال', usd: 3.64, d: 2, tz: 'Asia/Qatar', path: '/qatar/', tag: '#قطر' },
  { flag: '🇴🇲', name: 'عُمان', code: 'OMR', cur: 'ريال', usd: 0.3845, d: 3, tz: 'Asia/Muscat', path: '/oman/', tag: '#عمان' },
  { flag: '🇧🇭', name: 'البحرين', code: 'BHD', cur: 'دينار', usd: 0.376, d: 3, tz: 'Asia/Bahrain', path: '/bahrain/', tag: '#البحرين' }
];

const getJSON = async (u, o = {}) => { const r = await fetch(u, { ...o, signal: AbortSignal.timeout(15000) }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); };
const f = (v, d = 2) => new Intl.NumberFormat('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
const sleep = ms => new Promise(r => setTimeout(r, ms));

// طول التغريدة بحسب حساب تويتر: الرابط 23، الإيموجي 2
function tweetLen(t) {
  t = t.replace(/https?:\/\/\S+/g, 'x'.repeat(23));
  let n = 0;
  for (const ch of t) n += /\p{Extended_Pictographic}/u.test(ch) ? 2 : 1;
  return n;
}

async function main() {
  const need = ['X_API_KEY', 'X_API_SECRET', 'X_ACCESS_TOKEN', 'X_ACCESS_SECRET'];
  const dry = !!process.env.DRY_RUN;
  if (!dry && need.some(k => !process.env[k])) throw new Error('X keys missing');

  const client = dry ? null : new TwitterApi({
    appKey: process.env.X_API_KEY, appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN, accessSecret: process.env.X_ACCESS_SECRET
  });

  const fake = process.env.FAKE_USD;
  const ounceUSD = fake ? +fake : (await getJSON('https://api.gold-api.com/price/XAU')).price;
  if (!(ounceUSD > 500)) throw new Error('bad gold price');
  let kwd = 0.307;
  try { if (!fake) kwd = (await getJSON('https://open.er-api.com/v6/latest/USD')).rates.KWD || kwd; } catch {}

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

  // للتجربة: ONLY=SAR أو ONLY=SAR,AED
  const only = process.env.ONLY ? process.env.ONLY.split(',').map(s => s.trim()) : null;

  for (const c of COUNTRIES) {
    if (only && !only.includes(c.code)) continue;
    const usd = c.usd ?? kwd;
    const gram = k => ounceUSD / TROY * k / 24 * usd;
    const when = new Date().toLocaleString('ar-EG-u-nu-latn', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', timeZone: c.tz });

    const link = `${SITE}${c.path}?utm_source=twitter`;
    const parts = {
      title: `${c.flag} أسعار الذهب في ${c.name} اليوم`,
      when: `🗓 ${when}`,
      chg,
      k24: `🟡 عيار 24: ${f(gram(24), c.d)} ${c.cur}`,
      k22: `🟡 عيار 22: ${f(gram(22), c.d)} ${c.cur}`,
      k21: `🟡 عيار 21: ${f(gram(21), c.d)} ${c.cur}`,
      k18: `🟡 عيار 18: ${f(gram(18), c.d)} ${c.cur}`,
      usd: `💵 الدولار: ${f(usd, 4)} ${c.cur}`,
      link: `📊 الأسعار لحظة بلحظة:\n${link}`,
      tags: `#سعر_الذهب #الذهب ${c.tag}`
    };

    // الترتيب: الأقل أهمية يتشال الأول لو التغريدة زادت عن 280
    const order = ['title', 'when', 'chg', 'k24', 'k22', 'k21', 'k18', 'usd', 'link', 'tags'];
    const drop = ['tags', 'usd', 'when', 'k18'];
    const build = () => order.filter(k => parts[k]).map(k => parts[k]).join('\n');
    // سطر فاضي قبل الأسعار وقبل الرابط
    const build2 = () => {
      const top = ['title', 'when', 'chg'].filter(k => parts[k]).map(k => parts[k]).join('\n');
      const mid = ['k24', 'k22', 'k21', 'k18', 'usd'].filter(k => parts[k]).map(k => parts[k]).join('\n');
      const bot = ['link', 'tags'].filter(k => parts[k]).map(k => parts[k]).join('\n');
      return [top, mid, bot].filter(Boolean).join('\n\n');
    };
    let text = build2();
    for (const k of drop) { if (tweetLen(text) <= 280) break; parts[k] = ''; text = build2(); }
    if (tweetLen(text) > 280) throw new Error('tweet too long for ' + c.code);

    if (dry) console.log(text + `\n[${tweetLen(text)}/280]\n────────────`);
    else { const r = await client.v2.tweet(text); console.log('posted', c.code, r.data.id); }
    await sleep(2000);
  }
  console.log('done');
}
main().catch(e => { console.error(e.message, e.data ? JSON.stringify(e.data) : ''); process.exit(1); });
