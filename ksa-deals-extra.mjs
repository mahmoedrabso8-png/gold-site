// One-off: appends extra verified posts (spec: ksa-deals-extra-verified-items) to data/ksa-deals-queue.json, spread over free hourly slots. Idempotent by id.
import fs from 'node:fs';
const F='data/ksa-deals-queue.json',q=JSON.parse(fs.readFileSync(F,'utf8'));
const NOTE='ℹ️ الأسعار والعروض بتتغير، تأكد من صفحة المتجر.',TERMS='📌 تطبق الشروط والأحكام.';
const AZ='https://www.amazon.sa/whitefriday',NO='https://www.noon.com/saudi-ar/yellow-friday-sale-offers/',TR='https://www.trendyol.sa/';
const az=(id,head,body,terms)=>({id,store:'amazon',template:'T1x',link:AZ,text:`🟠 أمازون السعودية | ${head}\n${body}\n🔗 ${AZ}\n${terms?TERMS+'\n':''}${NOTE}`});
const X=[
az('x01-az-groceries','البقالة والمستلزمات اليومية','🔥 خصومات حتى 30% على القهوة والمشروبات والفيتامينات والعناية الشخصية ومنتجات الغسيل (في الجمعة البيضاء)'),
az('x02-az-electronics','إلكترونيات وألعاب','🔥 خصومات حتى 35% على التلفزيونات والتابلت والسماعات وملحقات الألعاب وغيرها\n📱 وأجهزة أمازون (Echo وKindle وRing) حتى 50%'),
az('x03-az-beauty','الجمال والعطور','🔥 خصومات حتى 30% على العطور ومنتجات الجمال من علامات مختلفة'),
az('x04-az-beautybox','بوكس جمال هدية','🎁 بوكس جمال محدود من الفنانة السعودية راما تركي مجاني مع مشتريات الجمال الفاخرة بقيمة 150 ريال أو أكثر\n(العرض حسب شروط أمازون)',true),
az('x05-az-fashion','الأزياء والإكسسوارات','🔥 خصومات حتى 35% على الحقائب والساعات والمجوهرات والنظارات والأحذية وملابس الرياضة'),
az('x06-az-home','المنزل والمطبخ','🔥 خصومات حتى 40% على المكانس الذكية وأجهزة تنقية الهواء وماكينات القهوة والقلايات الهوائية والخلاطات'),
az('x07-az-baby-sports','الأطفال والرياضة','👶 مستلزمات الأطفال حتى 25%\n🏋️ معدات الرياضة وأجهزة اللياقة حتى 20%'),
az('x08-az-global','المتجر العالمي','🌍 عروض الجمعة البيضاء كمان على منتجات تُشحن من أمازون العالمية، مع شحن دولي مجاني على الطلبات المؤهلة',true),
az('x09-az-bazaar','أمازون بازار','🛒 حتى 25% على موضة ومنزل وستايل لما تشتري 7 قطع أو أكثر بكود WFBZ15\n🔗 amazon.sa/bazaar',true),
az('x10-az-bank','عرض البنوك','💳 خصم فوري إضافي حتى 30% مع بطاقات بنك الراجحي والبنك السعودي الأول (ساب) الائتمانية على الطلبات المؤهلة',true),
az('x11-az-pay','الدفع بالتقسيط','💸 قسّم مشترياتك على 4 دفعات بدون فوائد مع تابي وتمارا، أو خطط تقسيط 0% مع بنوك شريكة عند الدفع',true),
az('x12-az-egift','بطاقة هدية','🎁 اشتري بطاقة هدية إلكترونية من أمازون بقيمة 500 ريال أو أكثر وخذ 50 ريال رصيد ترويجي، لحد 30 نوفمبر',true),
az('x13-az-prime','برايم','⚡ اشتراك برايم 16 ريال شهريًا أو 140 ريال سنويًا، توصيل سريع مجاني ومزايا للأعضاء\n🔗 amazon.sa/prime',false),
az('x14-az-delivery','التوصيل','🚚 توصيل في نفس اليوم أو اليوم التالي على المنتجات المؤهلة في الجمعة البيضاء'),
{id:'x15-noon-cats',store:'noon',template:'T1x',link:NO,text:`🟡 نون | الجمعة الصفراء\nعروض في الجوالات والأزياء والإلكترونيات والجمال والبقالة ومستلزمات المطبخ\n🔥 خصومات حتى 80%\n🔗 ${NO}\n${NOTE}`},
{id:'x16-noon-reminder',store:'noon',template:'T1x',link:NO,text:`🟡 نون | تذكير\nالجمعة الصفراء شغالة لحد 30 نوفمبر، وأكبر يوم فيها الجمعة 27 نوفمبر\n🔥 خصومات حتى 80%\n🔗 ${NO}\n${NOTE}`},
{id:'x17-trendyol-cats',store:'trendyol',template:'T1x',link:TR,text:`🟣 ترينديول | الجمعة الأسطورية\nأزياء وجمال وإلكترونيات ومنزل وستايل، من أكثر من 15,500 بائع في المنطقة\n🔥 خصومات حتى 90%\n🔗 ${TR}\n${NOTE}`},
{id:'x18-trendyol-reminder',store:'trendyol',template:'T1x',link:TR,text:`🟣 ترينديول | تذكير\nالجمعة الأسطورية لحد 30 نوفمبر\n🔥 خصومات حتى 90%\n🔗 ${TR}\n${NOTE}`},
{id:'x19-tip-license',store:'tip',template:'T4',link:null,text:`💡 تأكد إن الخصم مرخص\nحسب تقارير صحفية، وزارة التجارة السعودية تشترط ترخيصًا لأي خصم أو تخفيضات. اسأل عن الترخيص وراجعه قبل ما تشتري.\n${NOTE}`},
{id:'x20-tip-return',store:'tip',template:'T4',link:null,text:`💡 قبل ما تدفع\nراجع سياسة الإرجاع وموعد التوصيل، واقرأ تقييم البائع. الخصم الكبير مع إرجاع صعب مش دايمًا صفقة.\n${NOTE}`},
{id:'x21-tip-cart',store:'tip',template:'T4',link:null,text:`💡 نصيحة الجمعة البيضاء\nحدد اللي محتاجه قبل ما تفتح المتاجر، وحط حد لميزانيتك. العروض كتير والمشتريات الزايدة بتضيع الخصم.\n${NOTE}`},
];
const ex=new Set(q.map(p=>p.id)),add=X.filter(p=>!ex.has(p.id));
const taken=new Set(q.map(p=>p.send_at));
const slots=[];const now=Date.now()+30*60e3;
for(let d=25;d<=30;d++)for(let h=10;h<=23;h++){const s=`2026-11-${d}T${String(h).padStart(2,'0')}:00:00+03:00`;if(Date.parse(s)>now&&!taken.has(s)&&!(d===30&&h>=20))slots.push(s);}
// interleave stores: amazon posts spread, others slotted between
const order=[];const a=add.filter(p=>p.store==='amazon'),o=add.filter(p=>p.store!=='amazon');
while(a.length||o.length){if(a.length)order.push(a.shift());if(a.length)order.push(a.shift());if(o.length)order.push(o.shift());}
const step=slots.length/order.length;
order.forEach((p,i)=>{const s=slots[Math.floor(i*step)];q.push({...p,send_at:s,expire_at:'2026-11-30T23:59:00+03:00',status:'queued'});});
q.sort((x,y)=>Date.parse(x.send_at)-Date.parse(y.send_at));
fs.writeFileSync(F,JSON.stringify(q,null,1)+'\n');
console.log(order.length,'added; free slots',slots.length);
for(const p of q)console.log(p.send_at.slice(5,16),p.status,p.id);
