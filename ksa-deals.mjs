// KSA deals channel poster (Phase 1: plain store links, no affiliate). Separate from telegram.mjs, telegram-articles.mjs and the X workflow.
// Sends at most one due post per run. Skips pending-link posts, expired posts, and does nothing until the bot is channel admin.
import fs from 'node:fs';
const TOKEN=process.env.KSA_DEALS_BOT_TOKEN||process.env.TELEGRAM_BOT_TOKEN;
const CHAT=process.env.KSA_DEALS_CHAT||'@uaejobsss';
const FILE='data/ksa-deals-queue.json';
const MIN_GAP_MIN=50, MAX_LATE_H=12;
if(!TOKEN)throw new Error('bot token missing');
const api=(m,b)=>fetch(`https://api.telegram.org/bot${TOKEN}/${m}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(b||{})}).then(r=>r.json());
const me=await api('getMe');
const mem=await api('getChatMember',{chat_id:CHAT,user_id:me.result.id});
if(!mem.ok||mem.result.status!=='administrator'||mem.result.can_post_messages===false){console.log('Bot is not a channel admin with post rights yet, nothing sent.',mem.description||'');process.exit(0);}
const q=JSON.parse(fs.readFileSync(FILE,'utf8'));
const now=Date.now();
const last=Math.max(0,...q.filter(p=>p.sent_at).map(p=>Date.parse(p.sent_at)));
if(last&&(now-last)/60000<MIN_GAP_MIN){console.log('Posted less than '+MIN_GAP_MIN+' minutes ago, skipping.');process.exit(0);}
let changed=false;
for(const p of q){
  if(p.status!=='queued')continue;
  if(now>Date.parse(p.expire_at)){p.status='expired';changed=true;console.log('Expired',p.id);continue;}
  if(now-Date.parse(p.send_at)>MAX_LATE_H*3600e3){p.status='missed';changed=true;console.log('Missed',p.id);continue;}
}
const due=q.filter(p=>p.status==='queued'&&p.text&&(p.link||p.template==='T4')&&Date.parse(p.send_at)<=now).sort((a,b)=>Date.parse(a.send_at)-Date.parse(b.send_at))[0];
// Affiliate: Amazon.sa links get the Associates tag plus a disclosure line. Other stores stay plain until real affiliate links exist.
const AZ_TAG=process.env.AMAZON_SA_TAG||'zezo0b8-21';
const DISCLOSE='\n🔔 روابط أفلييت';
export function affiliate(text){
  let used=false;
  const out=text.replace(/https:\/\/(www\.)?amazon\.sa[^\s]*/g,u=>{
    used=true;
    try{const x=new URL(u);x.searchParams.set('tag',AZ_TAG);return x.toString();}catch(e){return u;}
  });
  return used&&!out.includes('روابط أفلييت')?out+DISCLOSE:out;
}
if(due){
  const j=await api('sendMessage',{chat_id:CHAT,text:affiliate(due.text),disable_web_page_preview:false});
  if(!j.ok)throw new Error('Telegram error: '+j.description);
  due.status='sent';due.sent_at=new Date().toISOString();due.message_id=j.result.message_id;changed=true;
  console.log('Posted',due.id,'message',j.result.message_id);
}else console.log('Nothing due.');
if(changed)fs.writeFileSync(FILE,JSON.stringify(q,null,1)+'\n');
