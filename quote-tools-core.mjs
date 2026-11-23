// All comparisons are manual invoice arithmetic, not inferred tax law or retail offers.
export function quoteTotal(x){
 if(!x||![x.weight,x.karat,x.rate,x.making,x.tax,x.discount].every(Number.isFinite)||x.weight<=0||x.weight>1e6||![24,22,21,18,14,9].includes(x.karat)||x.rate<0||x.rate>1e12||x.making<0||x.making>1e12||x.tax<0||x.tax>100||x.discount<0||x.discount>1e12||!['gram','fixed','percent'].includes(x.makingMode)||!['all','gold','making'].includes(x.taxBase)||!['fixed','percent'].includes(x.discountMode)||x.discountMode==='percent'&&x.discount>100)throw new Error('Invalid quote');
 const gold=x.weight*x.rate,making=x.makingMode==='gram'?x.making*x.weight:x.makingMode==='percent'?gold*x.making/100:x.making,base=x.taxBase==='gold'?gold:x.taxBase==='making'?making:gold+making,tax=base*x.tax/100,before=gold+making+tax,discount=Math.min(before,x.discountMode==='percent'?before*x.discount/100:x.discount),total=before-discount,fineWeight=x.weight*x.karat/24;
 return {gold,making,tax,discount,total,fineWeight,perGram:total/x.weight,perFineGram:total/fineWeight};
}
export function bullionTotal(x){
 if(!x||![x.weight,x.fineness,x.pureRate,x.premium,x.tax].every(Number.isFinite)||x.weight<=0||x.weight>1e6||x.fineness<=0||x.fineness>1000||x.pureRate<0||x.pureRate>1e12||x.premium<0||x.premium>1e12||x.tax<0||x.tax>100||!['fixed','percent','gram'].includes(x.premiumMode)||!['all','metal','premium'].includes(x.taxBase))throw Error('Invalid bar');
 const fineWeight=x.weight*x.fineness/1000,metal=fineWeight*x.pureRate,premium=x.premiumMode==='gram'?x.weight*x.premium:x.premiumMode==='percent'?metal*x.premium/100:x.premium,tax=(x.taxBase==='metal'?metal:x.taxBase==='premium'?premium:metal+premium)*x.tax/100,total=metal+premium+tax;
 return {fineWeight,metal,premium,tax,total,perGram:total/x.weight,perFineGram:total/fineWeight};
}
