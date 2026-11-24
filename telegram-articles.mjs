// Posts one site article to the Telegram channel. Runs every 2 hours from .github/workflows/telegram-articles.yml.
// Separate from telegram.mjs (price posts) and the X workflow. Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
import fs from 'node:fs';
import { TRAVEL_SLUGS } from './travel-content.mjs';
import { SEO_SLUGS } from './seo-content.mjs';
const TOKEN=process.env.TELEGRAM_BOT_TOKEN,CHAT=process.env.TELEGRAM_CHAT_ID;
const STATE='data/telegram-articles-state.json';
const MIN_GAP_MIN=100;
if(!TOKEN||!CHAT)throw new Error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing');
const queue=[...Object.entries(TRAVEL_SLUGS).sort((a,b)=>+a[0]-+b[0]).map(e=>e[1]),...SEO_SLUGS];
const st=JSON.parse(fs.readFileSync(STATE,'utf8'));
if(st.lastPostedAt&&(Date.now()-Date.parse(st.lastPostedAt))/60000<MIN_GAP_MIN){console.log('Posted less than '+MIN_GAP_MIN+' minutes ago, skipping.');process.exit(0);}
const un=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
let tries=0,idx=st.next%queue.length;
while(tries<queue.length){
  const slug=queue[idx],url=`https://www.maelumatii.com/en/${slug}/`;
  const r=await fetch(url);
  if(r.ok){
    const h=await r.text();
    const title=un((h.match(/<title>([^<]*)<\/title>/)||[])[1]||slug),desc=un((h.match(/<meta name="description" content="([^"]*)"/)||[])[1]||'');
    const text=`📘 <b>${esc(title)}</b>\n\n${esc(desc)}\n\n${url}\n\n📘 مقال من موسوعة معلومتي (بالإنجليزية)`;
    const p=await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({chat_id:CHAT,text,parse_mode:'HTML',disable_web_page_preview:false})});
    const j=await p.json();
    if(!j.ok)throw new Error('Telegram error: '+j.description);
    st.next=(idx+1)%queue.length;st.lastPostedAt=new Date().toISOString();st.last=slug;
    fs.writeFileSync(STATE,JSON.stringify(st,null,1)+'\n');
    console.log('Posted',slug,'message',j.result.message_id);
    process.exit(0);
  }
  console.log('Skipping',slug,'HTTP',r.status);idx=(idx+1)%queue.length;tries++;
}
throw new Error('No article page reachable');
