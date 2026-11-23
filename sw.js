// Service Worker — أسعار الذهب الإمارات
// الصفحات: الشبكة أولاً ثم آخر نسخة محفوظة (عشان الأسعار تكون جديدة)
// الملفات الثابتة: من الكاش مع تحديث في الخلفية
// طلبات الذهب والصرف: الشبكة فقط، لا يتحول الكاش القديم إلى سعر جديد
const V='gold-uae-v10';
const PRECACHE=['/','/en/','/assets/style.css','/assets/app.js','/manifest.json','/icons/icon-192x192.png','/offline.html'];
const API=['api.gold-api.com','supabase.co','open.er-api.com'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);

  if(API.some(h=>url.hostname===h||url.hostname.endsWith('.'+h))){
    // A cached successful API response must never impersonate a new quote.
    e.respondWith(fetch(req).catch(()=>new Response('{"error":"offline"}',{status:503,headers:{'Content-Type':'application/json'}})));
    return;
  }

  if(req.mode==='navigate'){
    e.respondWith(networkFirst(req).then(r=>r||caches.match('/offline.html')));
    return;
  }
  if(url.origin===location.origin||url.hostname.includes('fonts.g')){
    e.respondWith(staleWhileRevalidate(req));
  }
});

async function networkFirst(req){
  const c=await caches.open(V);
  try{
    const res=await fetch(req);
    if(res.ok) c.put(req,res.clone());
    return res;
  }catch(err){
    const hit=await c.match(req);
    if(hit) return hit;
    if(req.mode==='navigate') return null;
    return new Response('{"error":"offline"}',{status:503,headers:{'Content-Type':'application/json'}});
  }
}
async function staleWhileRevalidate(req){
  const c=await caches.open(V);
  const hit=await c.match(req);
  const net=fetch(req).then(res=>{if(res.ok) c.put(req,res.clone());return res;}).catch(()=>hit);
  return hit||net;
}

// This handles a click only. It does not poll prices or provide background delivery.
self.addEventListener('notificationclick',event=>{
  if(!event.notification.tag.startsWith('gold-target-'))return;
  const path=event.notification.data?.url;
  if(path!=='/price-alerts/'&&path!=='/en/price-alerts/')return;
  event.notification.close();
  const target=new URL(path,self.location.origin).href;
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(windows=>{
    const found=windows.find(w=>w.url===target);return found?found.focus():clients.openWindow(target);
  }));
});
