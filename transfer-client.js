(function(){'use strict';
var root=document.getElementById('transfer-tool');if(!root)return;
var key=root.dataset.key,short=root.dataset.short,ref=parseFloat(root.dataset.ref);
var $=function(i){return document.getElementById(i)};
var nf=new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
function load(){try{var v=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(v)?v.filter(function(q){return q&&typeof q.name==='string'&&isFinite(q.rate)&&isFinite(q.pct)&&isFinite(q.flat)}):[]}catch(e){return[]}}
function save(v){try{localStorage.setItem(key,JSON.stringify(v));return true}catch(e){return false}}
function net(q,amt){var fee=amt*q.pct/100+q.flat,n=amt-fee;return n>0?n*q.rate:null}
function cell(tr,txt){var td=document.createElement('td');td.textContent=txt;tr.appendChild(td);return td}
function render(){var out=$('tf-results'),qs=load(),amt=parseFloat($('tf-amount').value);out.replaceChildren();
if(!qs.length||!(amt>0))return;
var rows=qs.map(function(q){return{q:q,n:net(q,amt)}});
rows.sort(function(a,b){return(b.n||-1)-(a.n||-1)});
var h=document.createElement('h3');h.textContent='عروضك لمبلغ '+nf.format(amt)+' '+short;out.appendChild(h);
var w=document.createElement('div');w.className='table-wrap';var t=document.createElement('table');t.className='data-table';
var hd=document.createElement('tr');['المزود','السعر','الرسوم','يوصل بالجنيه','الفرق عن المرجع',''].forEach(function(x){var th=document.createElement('th');th.textContent=x;hd.appendChild(th)});
var th=document.createElement('thead');th.appendChild(hd);t.appendChild(th);var tb=document.createElement('tbody');
rows.forEach(function(r,i){var tr=document.createElement('tr'),q=r.q;
cell(tr,q.name+(i===0&&rows.length>1&&r.n!=null?' (الأعلى بين عروضك)':''));
cell(tr,nf.format(q.rate));
cell(tr,(q.pct?q.pct+'% ':'')+(q.flat?nf.format(q.flat)+' '+short:'')||'0');
cell(tr,r.n==null?'الرسوم أكبر من المبلغ':nf.format(r.n)+' جنيه');
var gap='—';if(r.n!=null&&ref>0){var ideal=amt*ref;gap=nf.format((r.n/ideal-1)*100)+'%'}cell(tr,gap);
var td=document.createElement('td'),b=document.createElement('button');b.type='button';b.className='btn-sm';b.textContent='حذف';b.addEventListener('click',function(){save(load().filter(function(x){return x.name!==q.name}));render()});td.appendChild(b);tr.appendChild(td);tb.appendChild(tr)});
t.appendChild(tb);w.appendChild(t);out.appendChild(w);
var p=document.createElement('p');p.className='note';p.textContent='الفرق عن المرجع = الصافي مقارنة بالمبلغ لو حُوّل بسعر المرجع بدون رسوم. حسابنا من أرقامك، وليس عرضًا من الشركات.';out.appendChild(p)}
$('tf-form').addEventListener('submit',function(e){e.preventDefault();var st=$('tf-status'),name=$('tf-name').value.trim().slice(0,40),rate=parseFloat($('tf-rate').value),pct=parseFloat($('tf-pct').value)||0,flat=parseFloat($('tf-flat').value)||0,amt=parseFloat($('tf-amount').value);
if(!name||!(rate>0)||!(amt>0)||pct<0||pct>100||flat<0){st.textContent='راجع الأرقام: السعر والمبلغ لازم يكونوا أكبر من صفر.';return}
if(net({rate:rate,pct:pct,flat:flat},amt)==null){st.textContent='الرسوم أكبر من المبلغ.';return}
var qs=load().filter(function(x){return x.name!==name});qs.push({name:name,rate:rate,pct:pct,flat:flat});
st.textContent=save(qs)?'تم الحفظ على جهازك.':'تعذر الحفظ في المتصفح، العروض ظاهرة هذه الجلسة فقط.';render()});
$('tf-amount').addEventListener('input',render);
$('tf-clear').addEventListener('click',function(){save([]);render();$('tf-status').textContent='تم مسح العروض المحفوظة.'});
render()})();
