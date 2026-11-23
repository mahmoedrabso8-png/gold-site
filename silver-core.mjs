export function silverReference({ag,agAt,fx={},fxAt},currency,now=Date.now()){
 const a=Number(ag),at=typeof agAt==='number'?agAt:Date.parse(agAt),ft=typeof fxAt==='number'?fxAt:Date.parse(fxAt);
 if(!Number.isFinite(a)||a<=0||!at||now-at>15*60000||at-now>120000)return null;
 const r=currency==='SAR'?3.75:currency==='AED'?3.6725:currency==='USD'?1:ft&&now-ft<=4*86400000&&ft-now<=120000?Number(fx[currency]):null;
 return Number.isFinite(r)&&r>0?a/3.6725*r:null;
}
export function silverInvoice({weight,purity,rate,making,tax,taxBase}){
 for(const v of [weight,purity,rate,making,tax])if(!Number.isFinite(v)||v<0)throw Error('invalid');
 if(weight<=0||weight>1000000||rate<=0||rate>1e9||making>1e9||![999,925].includes(purity)||tax>100||!['all','metal','making'].includes(taxBase))throw Error('invalid');
 const fineWeight=weight*purity/1000,metal=fineWeight*rate,taxable=taxBase==='all'?metal+making:taxBase==='metal'?metal:making,taxAmount=taxable*tax/100,total=metal+making+taxAmount;
 if(!Number.isFinite(total))throw Error('invalid');return {fineWeight,metal,making,taxAmount,total};
}
