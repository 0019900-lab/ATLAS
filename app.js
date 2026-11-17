'use strict';
const $=s=>document.querySelector(s),cv=$('#cv'),ctx=cv.getContext('2d');
const C=['الشيت والكروما',['Cols','أعمدة','n',1,16,1,4],['Rows','صفوف','n',1,16,1,2],['KeyOn','إزالة الكروما','k',0,0,0,true],['Key','لون الكروما','c',0,0,0,'#00ff00'],['Tol','التسامح','r',0,255,1,100],['Soft','نعومة الحواف','r',0,100,1,30],['Spill','إزالة الانعكاس','k',0,0,0,true],
'التشغيل',['Fps','FPS','n',1,60,1,12],['Spd','السرعة','r',.1,3,.05,1],['Mode','نمط التشغيل','s',['loop|تكرار','pp|ذهاب وعودة','once|مرة واحدة'],0,0,'loop'],
'الحجم والأرض',['Gy','خط الأرض %','r',40,100,1,90],['Gs','الحجم العام (الكل)','r',.2,3,.01,1],
'العرض',['Bg','الخلفية','s',['dark|غامقة','light|فاتحة','chk|شطرنج','cus|مخصصة'],0,0,'dark'],['BgC','لون مخصص','c',0,0,0,'#2a2540'],['Grid','مسطرة وشبكة','k',0,0,0,true],['Onion','ظل الفريم السابق','k',0,0,0,false]];
const K=['Cols','Rows','KeyOn','Key','Tol','Soft','Spill'],S={},IN={};
let SH=[],act=0,F=[],sel=0,z=1,px=0,py=0,play=true,acc=0,p=0,dir=1,rt,dt,last=0,rep=false,cur='[]',U=[],R=[],lt=0;
const P=$('#pn');
function setS(id,v){S[id]=v;const i=IN[id];i.type=='checkbox'?i.checked=v:i.value=v}
C.forEach(c=>{if(typeof c=='string'){P.insertAdjacentHTML('beforeend',`<h4>${c}</h4>`);return}
 const[id,lb,t,a,b,st,d]=c,l=document.createElement('label');l.innerHTML=`<span>${lb}</span>`;let i;
 if(t=='s'){i=document.createElement('select');i.innerHTML=a.map(o=>{const[v,n]=o.split('|');return`<option value=${v}>${n}</option>`}).join('')}
 else{i=document.createElement('input');i.type={n:'number',r:'range',c:'color',k:'checkbox'}[t];if(t=='n'||t=='r'){i.min=a;i.max=b;i.step=st}}
 IN[id]=i;setS(id,d);i.oninput=()=>{S[id]=t=='k'?i.checked:(t=='n'||t=='r')?+i.value:i.value;chg(id)};l.append(i);P.append(l)});
const syncUI=()=>{const h=SH[act];h&&K.forEach(k=>setS(k,h[k]))};
function chg(id){if(K.includes(id)){const h=SH[act];if(!h)return;h[id]=S[id];if(id=='Cols'||id=='Rows'){F=F.filter(f=>f.s!=act);sliceS(h);addAll(act);rekey(h);sel=0;dirty()}else{clearTimeout(rt);rt=setTimeout(()=>rekey(h),50)}}else dirty()}
const toast=m=>{const t=$('#ts');t.textContent=m;t.style.opacity=1;clearTimeout(toast.t);toast.t=setTimeout(()=>t.style.opacity=0,1800)};
const D0=(s,c)=>({s,c,sc:1,ox:0,oy:0,hold:1,on:true,sh:0}),bb=f=>SH[f.s]&&SH[f.s].bbs[f.c];
const addAll=s=>{const h=SH[s];for(let c=0;c<h.Cols*h.Rows;c++)F.push(D0(s,c))};
const sliceS=h=>{h.cw=h.img.width/h.Cols|0;h.ch=h.img.height/h.Rows|0};
function rekey(h){const c=document.createElement('canvas');c.width=h.img.width;c.height=h.img.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(h.img,0,0);const d=x.getImageData(0,0,c.width,c.height),a=d.data,{cw,ch}=h;
 if(h.KeyOn){const k=parseInt(h.Key.slice(1),16),R=k>>16,G=k>>8&255,B=k&255,T=h.Tol,W=h.Soft*2+1,ki=[R,G,B].indexOf(Math.max(R,G,B));
  for(let i=0;i<a.length;i+=4){const e=Math.hypot(a[i]-R,a[i+1]-G,a[i+2]-B),al=e<=T?0:e>=T+W?1:(e-T)/W;
   if(al>0&&h.Spill){const m=Math.max(a[i+(ki+1)%3],a[i+(ki+2)%3]);if(a[i+ki]>m)a[i+ki]=m}a[i+3]*=al}}
 x.putImageData(d,0,0);h.kc=c;h.bbs=[];
 for(let r=0;r<h.Rows;r++)for(let q=0;q<h.Cols;q++){let x0=1e9,y0=1e9,x1=-1,y1=-1;for(let y=0;y<ch;y++)for(let u=0;u<cw;u++)if(a[((r*ch+y)*c.width+q*cw+u)*4+3]>40){if(u<x0)x0=u;if(u>x1)x1=u;if(y<y0)y0=y;if(y>y1)y1=y}h.bbs.push({x0,y0,x1,y1,h:y1-y0+1})}
 if(!fitted){fitted=1;fitView()}browser();thumbs()}
let fitted=0;
function autoKey(h,i){const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.drawImage(i,0,0,3,3,0,0,1,1);const[r,g,b,a]=x.getImageData(0,0,1,1).data;
 if(a<200)h.KeyOn=false;else{h.KeyOn=true;h.Key='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}}
const addSheet=o=>new Promise(ok=>{const i=new Image();i.onload=()=>{const h={name:o.name,data:o.data,img:i,Cols:4,Rows:2,KeyOn:true,Key:'#00ff00',Tol:100,Soft:30,Spill:true};if(o.Cols)K.forEach(k=>h[k]=o[k]);else autoKey(h,i);SH.push(h);act=SH.length-1;syncUI();sliceS(h);if(!F.length&&!o.Cols)addAll(act);rekey(h);ok()};i.src=o.data});
async function readFiles(fs){for(const f of fs){const d=await new Promise(r=>{const x=new FileReader();x.onload=()=>r(x.result);x.readAsDataURL(f)});await addSheet({name:f.name.replace(/\.\w+$/,''),data:d});if($('#nm').value=='animation')$('#nm').value=SH[0].name}if(!U.length)cur=JSON.stringify(F);browser();thumbs()}
$('#bo').onclick=()=>$('#fi').click();$('#fi').onchange=e=>readFiles([...e.target.files]);
addEventListener('dragover',e=>e.preventDefault());addEventListener('drop',e=>{e.preventDefault();readFiles([...e.dataTransfer.files])});
function browser(){const t=$('#tabs');t.innerHTML='';SH.forEach((h,i)=>{const b=document.createElement('button');b.textContent=(i+1)+'· '+h.name.slice(-9);b.className=i==act?'on':'';b.onclick=()=>{act=i;syncUI();browser()};t.append(b)});
 const g=$('#cells');g.innerHTML='';const h=SH[act];if(!h||!h.kc)return;
 for(let c=0;c<h.Cols*h.Rows;c++){const k=document.createElement('canvas'),H=56,W=Math.round(h.cw*H/h.ch);k.width=W;k.height=H;k.getContext('2d').drawImage(h.kc,(c%h.Cols)*h.cw,(c/h.Cols|0)*h.ch,h.cw,h.ch,0,0,W,H);k.className='cl';
  k.onclick=()=>{if(rep&&F[sel])Object.assign(F[sel],{s:act,c});else{F.splice(sel+1,0,D0(act,c));if(F.length>1)sel++}thumbs();dirty()};g.append(k)}}
$('#md').onclick=e=>{rep=!rep;e.target.textContent='وضع النقر: '+(rep?'استبدال المحدد':'إضافة')};
$('#aa').onclick=()=>{if(SH[act]){addAll(act);thumbs();dirty()}};
$('#rs').onclick=()=>{if(!SH.length||!confirm('حذف الشيت وفريماته؟'))return;F=F.filter(f=>f.s!=act).map(f=>({...f,s:f.s>act?f.s-1:f.s}));SH.splice(act,1);act=Math.max(0,act-1);syncUI();browser();thumbs();dirty()};
function thumbs(){const s=$('#strip');s.innerHTML='';F.forEach((f,i)=>{const h=SH[f.s],c=document.createElement('canvas'),H=64,W=h?Math.round(h.cw*H/h.ch):64;c.width=W;c.height=H;if(h&&h.kc)c.getContext('2d').drawImage(h.kc,(f.c%h.Cols)*h.cw,(f.c/h.Cols|0)*h.ch,h.cw,h.ch,0,0,W,H);
 const d=document.createElement('div');d.className='th'+(f.on?'':' off');d.append(c);d.onclick=()=>{play=false;sync();setSel(i)};if(f.hold!=1){const b=document.createElement('i');b.textContent='×'+f.hold;d.append(b)}s.append(d)});setSel(Math.min(sel,F.length-1))}
function setSel(i){sel=i;[...$('#strip').children].forEach((e,k)=>e.classList.toggle('on',k==i));const f=F[i];if(!f)return;$('#fsc').value=f.sc;$('#fox').value=f.ox;$('#foy').value=f.oy;$('#fho').value=f.hold;$('#fsh').value=f.sh||0;$('#fon').checked=f.on;$('#fn').textContent=`${i+1}/${F.length}`}
[['fsc','sc'],['fox','ox'],['foy','oy'],['fho','hold'],['fsh','sh']].forEach(([id,k])=>$('#'+id).oninput=e=>{F[sel][k]=+e.target.value||(k=='sh'?0:1);if(k=='hold')thumbs();dirty()});
$('#fon').onchange=e=>{F[sel].on=e.target.checked;thumbs();dirty()};
const mv=d=>{const j=sel+d;if(j<0||j>=F.length)return;[F[sel],F[j]]=[F[j],F[sel]];sel=j;thumbs();dirty()};
$('#b1').onclick=()=>mv(-1);$('#b2').onclick=()=>mv(1);$('#b3').onclick=()=>{F.splice(sel+1,0,{...F[sel]});sel++;thumbs();dirty()};$('#b4').onclick=()=>{if(F.length>1){F.splice(sel,1);thumbs();dirty()}};
$('#u1').onclick=()=>{const r=bb(F[sel]);if(!r)return;F.forEach(f=>{const b=bb(f);if(b&&b.x1>=0)f.sc=Math.min(3,Math.max(.2,+(r.h/b.h).toFixed(3)))});setSel(sel);dirty();toast('تم توحيد الحجم')};
$('#u2').onclick=()=>{F.forEach(f=>{const b=bb(f),h=SH[f.s];if(b&&b.x1>=0)f.oy=Math.round(h.ch*S.Gy/100-b.y1-1)});setSel(sel);dirty();toast('تمت المحاذاة على الأرض')};
$('#u3').onclick=()=>{F.forEach(f=>Object.assign(f,{sc:1,ox:0,oy:0,hold:1,on:true,sh:0}));thumbs();dirty()};
function commit(){const j=JSON.stringify(F);if(j==cur)return;if(Date.now()-lt>500){U.push(cur);if(U.length>100)U.shift()}lt=Date.now();cur=j;R=[]}
const undo=()=>{if(!U.length)return;R.push(cur);cur=U.pop();F=JSON.parse(cur);thumbs();dirty()},redo=()=>{if(!R.length)return;U.push(cur);cur=R.pop();F=JSON.parse(cur);thumbs();dirty()};
$('#un').onclick=undo;$('#rd').onclick=redo;
function dF(f,al){const h=SH[f.s];if(!h||!h.kc)return;ctx.save();ctx.globalAlpha=al;const g=h.ch*S.Gy/100,s=S.Gs*f.sc;ctx.scale(s,s);ctx.drawImage(h.kc,(f.c%h.Cols)*h.cw,(f.c/h.Cols|0)*h.ch,h.cw,h.ch,-h.cw/2+f.ox,-g+f.oy,h.cw,h.ch);ctx.restore()}
function ruler(lt){const dp=devicePixelRatio,w=cv.width/dp,h=cv.height/dp,x0=-px/z,x1=(w-px)/z,y0=-py/z,y1=(h-py)/z,st=z<.3?500:z<.7?200:100;ctx.lineWidth=1/z;ctx.font=`${11/z}px sans-serif`;ctx.fillStyle=ctx.strokeStyle=lt?'rgba(0,0,0,.28)':'rgba(255,255,255,.22)';
 for(let x=Math.ceil(x0/st)*st;x<x1;x+=st){ctx.beginPath();ctx.moveTo(x,y0);ctx.lineTo(x,y1);ctx.stroke();ctx.fillText(x,x+3/z,y0+13/z)}
 for(let y=Math.ceil(y0/st)*st;y<y1;y+=st){if(!y)continue;ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke();ctx.fillText(-y,x0+4/z,y-3/z)}}
function draw(){const W=cv.width,H=cv.height,dp=devicePixelRatio;ctx.setTransform(1,0,0,1,0,0);const lt=S.Bg=='light'||S.Bg=='chk';
 if(S.Bg=='chk'){ctx.fillStyle='#bbb';ctx.fillRect(0,0,W,H);ctx.fillStyle='#999';const n=24*dp;for(let y=0;y<H;y+=n)for(let x=(y/n&1)*n;x<W;x+=2*n)ctx.fillRect(x,y,n,n)}
 else{ctx.fillStyle={dark:'#16131f',light:'#e9e7f0',cus:S.BgC}[S.Bg];ctx.fillRect(0,0,W,H)}
 ctx.setTransform(z*dp,0,0,z*dp,px*dp,py*dp);ctx.fillStyle=lt?'rgba(0,0,0,.09)':'rgba(255,255,255,.06)';ctx.fillRect(-1e5,0,2e5,1e5);if(S.Grid)ruler(lt);
 ctx.strokeStyle='#a78bfa';ctx.lineWidth=2/z;ctx.beginPath();ctx.moveTo(-1e5,0);ctx.lineTo(1e5,0);ctx.stroke();
 if(!F.length){ctx.fillStyle=lt?'#555':'#aaa';ctx.font=`${16/z}px sans-serif`;ctx.textAlign='center';ctx.fillText('افتح شيت أو اسحبه هنا',0,-60/z);ctx.textAlign='start';return}
 const f=F[sel];if(!f)return;if(play&&f.sh)ctx.translate((Math.random()-.5)*f.sh,(Math.random()-.5)*f.sh);if(S.Onion&&sel>0)dF(F[sel-1],.3);dF(f,1)}
function fitView(){const h=SH[act]||SH[0];if(!h)return;const w=cv.clientWidth,H=cv.clientHeight,g=h.ch*S.Gy/100;z=Math.min(w/(h.cw*1.1),H/(h.ch*1.1));px=w/2;py=(H-h.ch*z)/2+g*z}
function zoomAt([cx,cy],k){const r=cv.getBoundingClientRect(),nz=Math.min(8,Math.max(.05,z*k));cx-=r.left;cy-=r.top;px=cx-(cx-px)*nz/z;py=cy-(cy-py)*nz/z;z=nz}
const cen=()=>{const r=cv.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
const pt=new Map(),pd=()=>{const a=[...pt.values()];return a.length==2?Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]):0};let pl=0;
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);pt.set(e.pointerId,[e.clientX,e.clientY]);pl=pd()};
cv.onpointermove=e=>{const o=pt.get(e.pointerId);if(!o)return;pt.set(e.pointerId,[e.clientX,e.clientY]);if(pt.size==1){px+=e.clientX-o[0];py+=e.clientY-o[1]}else if(pt.size==2){const d=pd(),a=[...pt.values()];if(pl)zoomAt([(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2],d/pl);pl=d}};
cv.onpointerup=cv.onpointercancel=e=>pt.delete(e.pointerId);cv.onwheel=e=>{e.preventDefault();zoomAt([e.clientX,e.clientY],e.deltaY<0?1.12:1/1.12)};
$('#zi').onclick=()=>zoomAt(cen(),1.25);$('#zo').onclick=()=>zoomAt(cen(),.8);$('#ft').onclick=fitView;$('#z1').onclick=()=>{const h=SH[act];if(!h)return;z=1;px=cv.clientWidth/2;py=cv.clientHeight/2+h.ch*S.Gy/200};
const seq=()=>F.map((f,i)=>f.on?i:-1).filter(i=>i>=0),sync=()=>$('#pp').textContent=play?'⏸':'▶';
const step=d=>{if(!F.length)return;play=false;sync();setSel((sel+d+F.length)%F.length)};
$('#pp').onclick=()=>{play=!play;if(play){p=Math.max(0,seq().indexOf(sel));acc=0}sync()};$('#pv').onclick=()=>step(-1);$('#nx').onclick=()=>step(1);
function adv(n){if(S.Mode=='loop')p=(p+1)%n;else if(S.Mode=='pp'){if(n<2)return;if(p+dir>=n||p+dir<0)dir=-dir;p+=dir}else if(p<n-1)p++;else{play=false;sync()}}
function tick(t){requestAnimationFrame(tick);const o=seq();if(play&&o.length){if(p>=o.length)p=0;acc+=t-last;let ms;while(play&&acc>=(ms=1000*F[o[p]].hold/(S.Fps*S.Spd))){acc-=ms;adv(o.length)}if(o[p]!=null&&o[p]!=sel)setSel(o[p])}last=t;draw()}
new ResizeObserver(()=>{cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;if(!F.length){px=cv.clientWidth/2;py=cv.clientHeight*.7}}).observe(cv);
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&/^[zy]$/i.test(e.key)){e.preventDefault();(e.key.toLowerCase()=='y'||e.shiftKey)?redo():undo();return}
 if(/INPUT|SELECT/.test(e.target.tagName)&&e.target.type!='range'&&e.target.type!='checkbox')return;const f=F[sel],s=e.shiftKey?10:1;
 if(e.code=='Space'){e.preventDefault();$('#pp').click()}else if(e.key=='['||e.key==']')step(e.key=='['?-1:1);
 else if(f&&e.key.startsWith('Arrow')){e.preventDefault();f.ox+=({ArrowRight:s,ArrowLeft:-s})[e.key]||0;f.oy+=({ArrowDown:s,ArrowUp:-s})[e.key]||0;setSel(sel);dirty()}});
const db=new Promise(r=>{const q=indexedDB.open('spritelab',1);q.onupgradeneeded=()=>q.result.createObjectStore('p');q.onsuccess=()=>r(q.result)});
const tx=async(m,f)=>{const d=await db;return new Promise(r=>{const q=f(d.transaction('p',m).objectStore('p'));q.onsuccess=()=>r(q.result)})};
const nm=()=>($('#nm').value.trim()||'animation').replace(/[^\w\u0600-\u06FF-]+/g,'_');
async function save(q){if(!SH.length)return;await tx('readwrite',s=>s.put({SH:SH.map(h=>({name:h.name,data:h.data,...Object.fromEntries(K.map(k=>[k,h[k]]))})),S:{...S},F,sel,act},nm()));if(!q)toast('تم الحفظ ✔');list()}
function dirty(){commit();clearTimeout(dt);dt=setTimeout(()=>save(true),2000)}
async function list(){const k=await tx('readonly',s=>s.getAllKeys());$('#pl').innerHTML='<option value="">— مشاريع محفوظة —</option>'+k.map(n=>`<option>${n}</option>`).join('')}
$('#pl').onchange=async e=>{const n=e.target.value;if(!n)return;const r=await tx('readonly',s=>s.get(n));if(!r.SH){r.SH=[{...r.S,name:n,data:r.data}];r.F.forEach(f=>f.s=0)}
 SH=[];F=[];fitted=0;for(const o of r.SH)await addSheet(o);Object.keys(r.S).forEach(k=>IN[k]&&!K.includes(k)&&setS(k,r.S[k]));F=r.F;act=Math.min(r.act||0,SH.length-1);syncUI();$('#nm').value=n;browser();thumbs();setSel(r.sel||0);cur=JSON.stringify(F);U=[];R=[];fitView();toast('تم الفتح')};
$('#dl').onclick=async()=>{if(confirm('حذف المشروع '+nm()+' من الحفظ؟')){await tx('readwrite',s=>s.delete(nm()));list()}};
$('#bs').onclick=()=>save();$('#bn').onclick=async()=>{await save(true);location.reload()};
function atlas(){const o=F.filter(f=>f.on&&bb(f)),Z=S.Gs;let L=0,Rr=0,T=0,B=0;
 o.forEach(f=>{const b=bb(f),h=SH[f.s],g=h.ch*S.Gy/100,s=Z*f.sc;if(b.x1<0)return;L=Math.max(L,-(b.x0-h.cw/2+f.ox)*s);Rr=Math.max(Rr,(b.x1+1-h.cw/2+f.ox)*s);T=Math.max(T,-(b.y0-g+f.oy)*s);B=Math.max(B,(b.y1+1-g+f.oy)*s)});
 const hf=Math.ceil(Math.max(L,Rr))+4,W=hf*2,pv=Math.ceil(T)+4,H=pv+Math.ceil(B)+4,c=document.createElement('canvas');c.width=Math.max(1,W*o.length);c.height=H;const x=c.getContext('2d');
 o.forEach((f,i)=>{const h=SH[f.s],g=h.ch*S.Gy/100,s=Z*f.sc;x.save();x.translate(i*W+hf,pv);x.scale(s,s);x.drawImage(h.kc,(f.c%h.Cols)*h.cw,(f.c/h.Cols|0)*h.ch,h.cw,h.ch,-h.cw/2+f.ox,-g+f.oy,h.cw,h.ch);x.restore()});return{c,o,W,H,hf,pv}}
const dn=(b,n)=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4e3)};
const ms=f=>Math.round(1000*f.hold/(S.Fps*S.Spd));
$('#bx').onclick=()=>{if(!F.length)return;const{c,o,W,H,hf,pv}=atlas();dn(new Blob([JSON.stringify({format:'spritelab/2',name:nm(),fps:S.Fps,speed:S.Spd,mode:S.Mode,frameCount:o.length,cell:[W,H],pivot:[hf,pv],frames:o.map((f,i)=>({x:i*W,y:0,w:W,h:H,hold:f.hold,ms:ms(f),shake:f.sh||0})),atlas:c.toDataURL('image/png')})],{type:'application/json'}),nm()+'.anim.json');toast('تم التصدير: '+nm()+'.anim.json')};
$('#bp').onclick=()=>{if(F.length)atlas().c.toBlob(b=>dn(b,nm()+'.png'))};
function lzw(px,o){const cc=256,eoi=257;let bits=9,nx=258,d=new Map(),cb=0,cn=0,buf=[];const em=c=>{cb|=c<<cn;cn+=bits;while(cn>=8){buf.push(cb&255);cb>>=8;cn-=8}};
 em(cc);let pre=px[0];for(let i=1;i<px.length;i++){const k=px[i],key=pre<<8|k,v=d.get(key);if(v===undefined){em(pre);if(nx==4096){em(cc);d.clear();nx=258;bits=9}else{if(nx>=(1<<bits))bits++;d.set(key,nx++)}pre=k}else pre=v}
 em(pre);em(eoi);if(cn>0)buf.push(cb&255);for(let i=0;i<buf.length;i+=255){const n=Math.min(255,buf.length-i);o.push(n);for(let j=0;j<n;j++)o.push(buf[i+j])}}
function gifBytes(fr,dl,W,H){const o=[],w=n=>o.push(n&255,n>>8&255),s=t=>[...t].forEach(c=>o.push(c.charCodeAt(0)));s('GIF89a');w(W);w(H);o.push(0xF7,0,0,0,0,0);
 for(let r=0;r<6;r++)for(let g=0;g<7;g++)for(let b=0;b<6;b++)o.push(r*51,Math.round(g*42.5),b*51);while(o.length<13+768)o.push(0);o.push(0x21,0xFF,11);s('NETSCAPE2.0');o.push(3,1,0,0,0);
 fr.forEach((c,i)=>{const d=c.getContext('2d').getImageData(0,0,W,H).data,q=new Uint8Array(W*H);for(let j=0;j<q.length;j++)q[j]=d[j*4+3]<128?0:1+(Math.round(d[j*4]/51)*7+Math.round(d[j*4+1]/42.5))*6+Math.round(d[j*4+2]/51);
  o.push(0x21,0xF9,4,9);w(Math.max(2,Math.round(dl[i]/10)));o.push(0,0,0x2C);w(0);w(0);w(W);w(H);o.push(0,8);lzw(q,o);o.push(0)});o.push(0x3B);return new Uint8Array(o)}
$('#bg').onclick=()=>{if(!F.length)return;toast('جاري إنشاء GIF…');setTimeout(()=>{const{c,o,W,H}=atlas();let ix=o.map((_,i)=>i);if(S.Mode=='pp'&&ix.length>2)ix=ix.concat(ix.slice(1,-1).reverse());const cs=[],dl=[];
 ix.forEach(i=>{const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(c,i*W,0,W,H,0,0,W,H);cs.push(k);dl.push(ms(o[i]))});dn(new Blob([gifBytes(cs,dl,W,H)],{type:'image/gif'}),nm()+'.gif');toast('تم تصدير GIF')},30)};
list();requestAnimationFrame(tick);if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
