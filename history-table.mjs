// Server-rendered 30-day data table and CSV for country pages. Same dated snapshots as the chart.
import { historySeries } from './history-core.mjs';
const KS = [24, 22, 21, 18];
const TXT = {
  en: { h: 'Last 30 days: daily reference prices', cap: (c) => `Daily raw gold reference price per gram in ${c}, by karat`, date: 'Date', k: (k) => `${k}K`, csv: 'Download CSV (30 days)', note: 'The table lists every available daily snapshot from the last 30 days. Missing days are left out, not estimated. Reference prices only: no shop premium, making charges or tax.', src: 'Source' },
  ar: { h: 'آخر 30 يوماً: الأسعار المرجعية اليومية', cap: (c) => `السعر المرجعي اليومي للذهب الخام للغرام بالعملة ${c}، حسب العيار`, date: 'التاريخ', k: (k) => `عيار ${k}`, csv: 'تنزيل CSV (30 يوماً)', note: 'الجدول يضم كل لقطة يومية متاحة في آخر 30 يوماً. الأيام المفقودة لا تُقدَّر بل تُحذف. أسعار مرجعية فقط بدون هامش البائع أو المصنعية أو الضريبة.', src: 'المصدر' },
};
const f2 = v => (v >= 10 ? v.toFixed(2) : v.toFixed(3));
const nf = v => new Intl.NumberFormat('en-US', { minimumFractionDigits: v >= 10 ? 2 : 3, maximumFractionDigits: v >= 10 ? 2 : 3 }).format(v);
export const csvPath = cur => `/assets/history/${cur.toLowerCase()}-30d.csv`;
export function historyCsv(data, cur, asOf) {
  const rows = historySeries(data, cur, 24, '30', asOf);
  return ['date,currency,karat_24_per_gram,karat_22_per_gram,karat_21_per_gram,karat_18_per_gram', ...rows.map(p => [p.day, cur, ...KS.map(k => f2(p.value * k / 24))].join(','))].join('\n') + '\n';
}
export function historyTable30(data, market, L, asOf) {
  const t = TXT[L], cur = market.currency, rows = historySeries(data, cur, 24, '30', asOf);
  if (rows.length < 2) return '';
  const body = rows.slice().reverse().map(p => `<tr><td dir="ltr">${p.day}</td>${KS.map(k => `<td class="n" dir="ltr">${nf(p.value * k / 24)}</td>`).join('')}</tr>`).join('');
  return `<div class="history-table30"><h3>${t.h}</h3><div class="table-wrap"><table class="data-table"><caption>${t.cap(cur)}</caption><thead><tr><th scope="col">${t.date}</th>${KS.map(k => `<th scope="col">${t.k(k)}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div><p class="note">${t.note} <a href="${csvPath(cur)}" download>${t.csv}</a></p></div>`;
}
