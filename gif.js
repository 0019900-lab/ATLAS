function lzw(px,o){const cc=256,eoi=257;let bits=9,nx=258,d=new Map(),cb=0,cn=0,buf=[];const em=c=>{cb|=c<<cn;cn+=bits;while(cn>=8){buf.push(cb&255);cb>>=8;cn-=8}};
 em(cc);let pre=px[0];for(let i=1;i<px.length;i++){const k=px[i],key=pre<<8|k,v=d.get(key);if(v===undefined){em(pre);if(nx==4096){em(cc);d.clear();nx=258;bits=9}else{if(nx>=(1<<bits))bits++;d.set(key,nx++)}pre=k}else pre=v}
 em(pre);em(eoi);if(cn>0)buf.push(cb&255);for(let i=0;i<buf.length;i+=255){const n=Math.min(255,buf.length-i);o.push(n);for(let j=0;j<n;j++)o.push(buf[i+j])}}
function gifBytes(fr,dl,W,H){const o=[],w=n=>o.push(n&255,n>>8&255),s=t=>[...t].forEach(c=>o.push(c.charCodeAt(0)));s('GIF89a');w(W);w(H);o.push(0xF7,0,0,0,0,0);
 for(let r=0;r<6;r++)for(let g=0;g<7;g++)for(let b=0;b<6;b++)o.push(r*51,Math.round(g*42.5),b*51);while(o.length<13+768)o.push(0);o.push(0x21,0xFF,11);s('NETSCAPE2.0');o.push(3,1,0,0,0);
 fr.forEach((c,i)=>{const d=c.getContext('2d').getImageData(0,0,W,H).data,q=new Uint8Array(W*H);for(let j=0;j<q.length;j++)q[j]=d[j*4+3]<128?0:1+(Math.round(d[j*4]/51)*7+Math.round(d[j*4+1]/42.5))*6+Math.round(d[j*4+2]/51);
  o.push(0x21,0xF9,4,9);w(Math.max(2,Math.round(dl[i]/10)));o.push(0,0,0x2C);w(0);w(0);w(W);w(H);o.push(0,8);lzw(q,o);o.push(0)});o.push(0x3B);return new Uint8Array(o)}
