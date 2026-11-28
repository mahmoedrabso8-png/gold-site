// Daily jobs digest for the @emaratijob channel. Separate from the gold, KSA and article posters.
// Fetches the digest the jobs site publishes and posts it only when the digest is dated today (Cairo).
// Expected shape: { date:'YYYY-MM-DD', items:[{ title, link, country, lang }] } ("jobs" and "url" also accepted).
import fs from 'node:fs';
const TOKEN=process.env.TELEGRAM_BOT_TOKEN;
const CHAT=process.env.JOBS_DIGEST_CHAT||'@emaratijob';
const URL_=process.env.JOBS_DIGEST_URL||'https://gulf-jobs.pages.dev/digest.json';
const DRY=process.env.DRY_RUN==='1';
const MAXITEMS=+(process.env.JOBS_DIGEST_MAX||40);
const today=new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Cairo'});
if(!TOKEN&&!DRY)throw new Error('TELEGRAM_BOT_TOKEN missing');
const api=async(m,b)=>{const r=await fetch(`https://api.telegram.org/bot${TOKEN}/${m}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(b)});const j=await r.json();if(!j.ok)throw new Error(m+': '+JSON.stringify(j));return j;};
let d;
if(process.env.JOBS_DIGEST_FILE)d=JSON.parse(fs.readFileSync(process.env.JOBS_DIGEST_FILE,'utf8'));
else{const r=await fetch(URL_+'?t='+Date.now(),{headers:{'cache-control':'no-cache'}});if(!r.ok)throw new Error('digest fetch '+r.status);d=await r.json();}
const date=String(d.date||'').slice(0,10);
if(date!==today&&process.env.JOBS_DIGEST_FORCE!=='1'){console.log(`digest dated ${date||'none'}, today is ${today}: not posting`);process.exit(0);}
const SITE=/^https?:\/\//.test(d.site||'')?d.site:'https://gulf-jobs.pages.dev/';
const raw=d.items||d.jobs||[];
const items=raw.map(x=>({title:String(x.title||'').replace(/\s+/g,' ').trim(),en:String(x.title_en||'').replace(/\s+/g,' ').trim(),link:x.link||x.url,country:String(x.country||'').toLowerCase()})).filter(x=>x.title&&/^https?:\/\//.test(x.link||''));
if(!items.length){console.log('digest has no usable items: not posting');process.exit(0);}
const CN={uae:'🇦🇪 الإمارات',ae:'🇦🇪 الإمارات',saudi:'🇸🇦 السعودية','saudi arabia':'🇸🇦 السعودية',sa:'🇸🇦 السعودية',ksa:'🇸🇦 السعودية',qatar:'🇶🇦 قطر',qa:'🇶🇦 قطر',bahrain:'🇧🇭 البحرين',bh:'🇧🇭 البحرين',kuwait:'🇰🇼 الكويت',kw:'🇰🇼 الكويت',oman:'🇴🇲 عُمان',om:'🇴🇲 عُمان'};
const order=['🇦🇪 الإمارات','🇸🇦 السعودية','🇶🇦 قطر','🇧🇭 البحرين','🇰🇼 الكويت','🇴🇲 عُمان'];
const groups=new Map();
for(const it of items.slice(0,MAXITEMS)){const k=CN[it.country]||'🌍 دول الخليج';(groups.get(k)||groups.set(k,[]).get(k)).push(it);}
const keys=[...groups.keys()].sort((a,b)=>(order.indexOf(a)+99)%99-(order.indexOf(b)+99)%99);
const blocks=[`📋 نشرة وظائف اليوم · ${date}\n`+(+d.total_new>items.length?`${d.total_new} وظيفة جديدة، وهذه أبرز ${items.length}`:`${items.length} وظيفة جديدة`)];
for(const k of keys){const g=groups.get(k);blocks.push(`${k} (${g.length})\n`+g.map(x=>`▫️ ${x.title}${x.en&&x.en!==x.title?` (${x.en})`:''}\n${x.link}`).join('\n\n'));}
if(items.length>MAXITEMS)blocks.push(`+${items.length-MAXITEMS} وظيفة أخرى على الموقع:\n${SITE}`);
else blocks.push(`كل الوظائف على الموقع:\n${SITE}`);
const msgs=[];let cur='';
for(const b of blocks){if(cur&&(cur+'\n\n'+b).length>3800){msgs.push(cur);cur=b;}else cur=cur?cur+'\n\n'+b:b;}
if(cur)msgs.push(cur);
if(DRY){console.log(msgs.join('\n-----\n'));process.exit(0);}
const me=await api('getMe',{});
const mem=await api('getChatMember',{chat_id:CHAT,user_id:me.result.id});
if(!['administrator','creator'].includes(mem.result.status))throw new Error('bot is not admin of '+CHAT+' ('+mem.result.status+')');
for(const text of msgs){const j=await api('sendMessage',{chat_id:CHAT,text,disable_web_page_preview:true});console.log('posted message_id',j.result.message_id);await new Promise(r=>setTimeout(r,1500));}
