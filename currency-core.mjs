export const FX_MAX_AGE=4*86400000;
export const FX_PEGS={USD:1,SAR:3.75,AED:3.6725};
export function egpReference({fx={},fxAt},cur,now=Date.now()){
 const ft=typeof fxAt==='number'?fxAt:Date.parse(fxAt);
 if(!Number.isFinite(ft)||ft<=0||now-ft>FX_MAX_AGE||ft-now>120000)return null;
 const e=Number(fx.EGP),per=FX_PEGS[cur]||Number(fx[cur]);
 return Number.isFinite(e)&&e>0&&Number.isFinite(per)&&per>0?e/per:null;
}
export function fxConvert({amount,rate,feePct,flatFee,direction}){
 for(const v of [amount,rate,feePct,flatFee])if(!Number.isFinite(v)||v<0)throw Error('invalid');
 if(amount<=0||amount>1e12||rate<=0||rate>1e9||feePct>100||flatFee>1e12||!['from','to'].includes(direction))throw Error('invalid');
 const fee=amount*feePct/100+flatFee,net=amount-fee;
 if(net<=0)throw Error('fees');
 const result=direction==='from'?net*rate:net/rate;
 if(!Number.isFinite(result))throw Error('invalid');
 return {fee,net,result};
}
