'use strict';
const $=s=>document.querySelector(s),cv=$('#cv'),ctx=cv.getContext('2d');
const IC={open:'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',save:'M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM7 3v6h8V3M7 21v-7h10v7',down:'M12 3v12M7 10l5 5 5-5M5 21h14',image:'M4 4h16v16H4zM4 15l5-5 4 4 3-3 4 4M9 8.5h.01',film:'M4 4h16v16H4zM8 4v16M16 4v16M4 9h4M4 15h4M16 9h4M16 15h4',plus:'M12 5v14M5 12h14',minus:'M5 12h14',undo:'M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',redo:'M15 14l5-5-5-5M20 9H10a6 6 0 0 0 0 12h3',prev:'M19 20L9 12l10-8zM5 19V5',next:'M5 4l10 8-10 8zM19 5v14',play:'M6 4l14 8-14 8z',pause:'M8 4v16M16 4v16',fit:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',copy:'M9 9h11v11H9zM5 15V5h10',trash:'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',reset:'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5',left:'M15 6l-6 6 6 6',right:'M9 6l6 6-6 6',repeat:'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',file:'M6 3h8l5 5v13H6zM14 3v5h5',anchor:'M3 20h18M12 4v12M8 12l4 4 4-4',scale:'M4 14v6h6M20 10V4h-6M4 20l6-6M20 4l-6 6',grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',x:'M6 6l12 12M18 6L6 18'};
const ic=(n,s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[n].split('M').filter(Boolean).map(d=>`<path d="M${d}"/>`).join('')}</svg>`;
document.querySelectorAll('[data-i]').forEach(e=>e.insertAdjacentHTML('afterbegin',ic(e.dataset.i)));
addEventListener('click',e=>{if(e.target.closest('button'))navigator.vibrate&&navigator.vibrate(6)});
const D={Fps:12,Spd:1,Mode:'loop',Tw:'none',Bl:40,Gy:90,Gs:1,Bg:'dark',BgC:'#2a2540',Grid:true,Onion:false},S={...D};
const DK={Cols:4,Rows:2,KeyOn:true,Key:'#00ff00',Tol:100,Soft:30,Spill:true,Smart:true,Gap:10},K=Object.keys(DK);
const FD={sc:1,ox:0,oy:0,hold:1,on:true,sh:0};
let SH=[],act=0,F=[],sel=0,z=1,px=0,py=0,play=true,tm=0,rt,dt,last=0,rep=false,cur='[]',U=[],R=[],lt=0,fitted=0;
const ROWS=[],refresh=()=>{ROWS.forEach(f=>f());info()},ease=t=>t*t*(3-2*t);
const toast=m=>{const t=$('#ts');t.textContent=m;t.classList.add('s');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('s'),1800)};
function row(par,lb,o){const t=o.t||'r',l=document.createElement('div');l.className='rw';l.innerHTML=`<label>${lb}</label><button class="rs" title="رجوع للافتراضي">${ic('reset',13)}</button><div class="rc"></div>`;
 const c=l.querySelector('.rc'),rs=l.querySelector('.rs'),mk=(g,y)=>Object.assign(document.createElement(g),y?{type:y}:{}),ch=[];let a,b,u;
 const cl=v=>Math.min(o.max,Math.max(o.min,+v)),set=v=>{o.s(v);up(1)};
 const num=()=>{b=mk('input','number');b.min=o.min;b.max=o.max;b.step=o.step;b.onchange=()=>set(isNaN(parseFloat(b.value))?o.def:cl(b.value))};
 if(t=='s'){a=mk('select');a.innerHTML=o.opts.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('');a.onchange=()=>set(a.value);c.append(a)}
 else if(t=='k'){a=mk('input','checkbox');a.className='sw';a.onchange=()=>set(a.checked);c.append(a)}
 else if(t=='c'){a=mk('input','color');a.oninput=()=>set(a.value);c.append(a)}
 else if(t=='r'){a=mk('input','range');a.min=o.min;a.max=o.max;a.step=o.step;a.oninput=()=>set(+a.value);num();c.append(a,b)}
 else{num();const m=mk('button'),p=mk('button');m.innerHTML=ic('minus',14);p.innerHTML=ic('plus',14);m.onclick=()=>set(cl((+o.g()-o.step).toFixed(3)));p.onclick=()=>set(cl((+o.g()+o.step).toFixed(3)));c.append(m,b,p)}
 if(o.u){u=mk('span');u.className='u';c.append(u)}
 if(o.chips){const d=mk('div');d.className='chs';o.chips.forEach(v=>{const x=mk('button');x.textContent=v+(o.cu||'');x.onclick=()=>set(v);d.append(x);ch.push([v,x])});l.append(d)}
 const up=fl=>{const v=o.g();if(a&&t!='n')t=='k'?a.checked=v:a.value=v;if(b)b.value=+(+v).toFixed(3);if(u)u.textContent=o.u(v);rs.style.visibility=v==o.def?'hidden':'visible';ch.forEach(([q,x])=>x.classList.toggle('on',q==v));
  if(fl&&t!='k'){const e=b||a;e.classList.add('fl');clearTimeout(e.ft);e.ft=setTimeout(()=>e.classList.remove('fl'),200)}};
 rs.onclick=l.firstChild.ondblclick=()=>{set(o.def);toast('رجعت للافتراضي ↺')};ROWS.push(()=>up());par.append(l);up()}
const gS=(id,o)=>({g:()=>S[id],s:v=>{S[id]=v;dirty()},def:D[id],...o}),
 gF=(k,o)=>({g:()=>F[sel]?F[sel][k]:FD[k],s:v=>{if(F[sel]){F[sel][k]=v;if(k=='hold')thumbs();if(k=='sh')window.shT=Date.now();dirty()}},def:FD[k],...o}),
 gH=(k,o)=>({g:()=>SH[act]?SH[act][k]:DK[k],s:v=>{const h=SH[act];if(h){h[k]=v;chg(k,h)}},def:DK[k],...o});
const ms=f=>Math.round(1000*f.hold/(S.Fps*S.Spd)),pc=v=>Math.round(v*100)+'%';
const fr=$('#fr'),pb=$('#pb'),sh=$('#sh'),vp=$('#vp');
row(fr,'حجم الفريم',gF('sc',{min:.2,max:3,step:.01,u:v=>pc(v)}));row(fr,'إزاحة X',gF('ox',{min:-300,max:300,step:1}));row(fr,'إزاحة Y',gF('oy',{min:-300,max:300,step:1}));
row(fr,'مدة الفريم (×)',gF('hold',{t:'n',min:.25,max:30,step:.25,chips:[1,2,3,4,6],cu:'×',u:()=>F[sel]?'= '+ms(F[sel])+' مللي':''}));
row(fr,'اهتزاز الصدمة',gF('sh',{min:0,max:40,step:1}));row(fr,'مفعّل في التشغيل',gF('on',{t:'k'}));
row(pb,'FPS (فريم/ثانية)',gS('Fps',{t:'n',min:1,max:60,step:1,chips:[6,8,12,15,24,30],u:()=>'فريم/ث'}));row(pb,'السرعة',gS('Spd',{min:.1,max:3,step:.05,chips:[.5,1,1.5,2],cu:'×',u:v=>v.toFixed(2)+'×'}));
row(pb,'نمط التشغيل',gS('Mode',{t:'s',opts:[['loop','تكرار'],['pp','ذهاب وعودة'],['once','مرة واحدة']]}));
row(pb,'الانتقال بين الفريمات',gS('Tw',{t:'s',opts:[['none','بدون (حاد)'],['fade','تلاشي تدريجي'],['move','حركة انسيابية'],['both','تلاشي + حركة']]}));row(pb,'نسبة الانتقال من مدة الفريم',gS('Bl',{min:5,max:100,step:5,u:v=>v+'%'}));
row(sh,'أعمدة',gH('Cols',{t:'n',min:1,max:16,step:1}));row(sh,'صفوف',gH('Rows',{t:'n',min:1,max:16,step:1}));row(sh,'قص ذكي (يلحق الإفكتات الطالعة برة الخلية)',gH('Smart',{t:'k'}));row(sh,'دمج الأجزاء القريبة (px)',gH('Gap',{min:0,max:40,step:1}));
row(sh,'إزالة الكروما',gH('KeyOn',{t:'k'}));row(sh,'لون الكروما',gH('Key',{t:'c'}));row(sh,'التسامح',gH('Tol',{min:0,max:255,step:1}));row(sh,'نعومة الحواف',gH('Soft',{min:0,max:100,step:1}));row(sh,'إزالة الانعكاس',gH('Spill',{t:'k'}));
row(vp,'خط الأرض %',gS('Gy',{min:40,max:100,step:1}));row(vp,'الحجم العام (الكل)',gS('Gs',{min:.2,max:3,step:.01,u:v=>pc(v)}));row(vp,'الخلفية',gS('Bg',{t:'s',opts:[['dark','غامقة'],['light','فاتحة'],['chk','شطرنج'],['cus','مخصصة']]}));row(vp,'لون مخصص',gS('BgC',{t:'c'}));row(vp,'مسطرة وشبكة',gS('Grid',{t:'k'}));row(vp,'ظل الفريم السابق',gS('Onion',{t:'k'}));
const pages=[...document.querySelectorAll('.pg')],tabs=[...document.querySelectorAll('#tn button')];
const goTab=i=>{pages.forEach((p,k)=>p.classList.toggle('on',k==i));tabs.forEach((b,k)=>b.classList.toggle('on',k==i))};tabs.forEach((b,i)=>b.onclick=()=>goTab(i));goTab(0);
function info(){const o=F.filter(f=>f.on),T=o.reduce((s,f)=>s+ms(f),0);$('#eff').innerHTML=`السرعة الفعلية <b>${(S.Fps*S.Spd).toFixed(1)}</b> فريم/ث<br>${o.length} فريم · المدة <b>${(T/1000).toFixed(2)}</b> ثانية`;$('#hud').textContent=`${(S.Fps*S.Spd).toFixed(1)} fps · ${F.length?sel+1+'/'+F.length:'—'}`}
function chg(k,h){if(k=='Cols'||k=='Rows'){F=F.filter(f=>f.s!=act);sliceS(h);rekey(h);addAll(act);sel=0;thumbs();dirty()}else{clearTimeout(rt);rt=setTimeout(()=>rekey(h),120)}}
const D0=(s,c)=>({s,c,...FD}),fo=f=>SH[f.s]&&SH[f.s].fr&&SH[f.s].fr[f.c],bb=f=>{const r=fo(f);return r&&r.b};
const addAll=s=>{const h=SH[s];for(let c=0;c<h.Cols*h.Rows;c++)F.push(D0(s,c))};
const sliceS=h=>{h.cw=h.img.width/h.Cols|0;h.ch=h.img.height/h.Rows|0};
function seg(h,a,W,H){const B=4,bw=Math.ceil(W/B),bh=Math.ceil(H/B),on=new Uint8Array(bw*bh),{cw,ch,Cols,Rows}=h,g=Math.max(1,Math.round(h.Gap/B)),L=new Int32Array(bw*bh).fill(-1),own=[],bx=[];
 for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(a[(y*W+x)*4+3]>12)on[(y/B|0)*bw+(x/B|0)]=1;
 for(let s=0,n=0;s<on.length;s++){if(!on[s]||L[s]>=0)continue;const q=[s],cnt=new Map();L[s]=n;let x0=1e9,y0=1e9,x1=-1,y1=-1;
  while(q.length){const i=q.pop(),X=i%bw,Y=i/bw|0;x0=Math.min(x0,X);x1=Math.max(x1,X);y0=Math.min(y0,Y);y1=Math.max(y1,Y);const k=Math.min(Cols-1,(X*B+2)/cw|0)+Math.min(Rows-1,(Y*B+2)/ch|0)*Cols;cnt.set(k,(cnt.get(k)||0)+1);
   for(let v=Math.max(0,Y-g);v<=Math.min(bh-1,Y+g);v++)for(let u=Math.max(0,X-g);u<=Math.min(bw-1,X+g);u++){const j=v*bw+u;if(on[j]&&L[j]<0){L[j]=n;q.push(j)}}}
  own.push([...cnt].sort((m,k)=>k[1]-m[1])[0][0]);bx.push([x0,y0,x1,y1]);n++}
 for(let c=0;c<Cols*Rows;c++){const cs=[];own.forEach((o,i)=>o==c&&cs.push(i));if(!cs.length){h.fr.push(null);continue}
  const X0=Math.min(...cs.map(i=>bx[i][0]))*B,Y0=Math.min(...cs.map(i=>bx[i][1]))*B,X1=Math.min(W,(Math.max(...cs.map(i=>bx[i][2]))+1)*B),Y1=Math.min(H,(Math.max(...cs.map(i=>bx[i][3]))+1)*B),w=X1-X0,hh=Y1-Y0,im=new ImageData(w,hh),od=im.data,set=new Set(cs),b=[1e9,1e9,-1,-1];
  for(let y=0;y<hh;y++)for(let x=0;x<w;x++){const i=((Y0+y)*W+X0+x)*4;if(set.has(L[((Y0+y)/B|0)*bw+((X0+x)/B|0)])){const o=(y*w+x)*4;od[o]=a[i];od[o+1]=a[i+1];od[o+2]=a[i+2];od[o+3]=a[i+3];if(a[i+3]>40){b[0]=Math.min(b[0],x);b[1]=Math.min(b[1],y);b[2]=Math.max(b[2],x);b[3]=Math.max(b[3],y)}}}
  fin(h,c,im,X0-(c%Cols)*cw,Y0-(c/Cols|0)*ch,b)}}
function fin(h,c,im,x,y,b){if(b[2]<0){h.fr.push(null);return}const k=document.createElement('canvas');k.width=im.width;k.height=im.height;k.getContext('2d').putImageData(im,0,0);h.fr.push({cv:k,x,y,b:{x0:x+b[0],y0:y+b[1],x1:x+b[2],y1:y+b[3],h:b[3]-b[1]+1}})}
function rekey(h){const W=h.img.width,H=h.img.height,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(h.img,0,0);const d=x.getImageData(0,0,W,H),a=d.data,{cw,ch}=h;
 if(h.KeyOn){const k=parseInt(h.Key.slice(1),16),R=k>>16,G=k>>8&255,B=k&255,T=h.Tol,Wd=h.Soft*2+1,ki=[R,G,B].indexOf(Math.max(R,G,B));
  for(let i=0;i<a.length;i+=4){const e=Math.hypot(a[i]-R,a[i+1]-G,a[i+2]-B),al=e<=T?0:e>=T+Wd?1:(e-T)/Wd;if(al>0&&h.Spill){const m=Math.max(a[i+(ki+1)%3],a[i+(ki+2)%3]);if(a[i+ki]>m)a[i+ki]=m}a[i+3]*=al}}
 x.putImageData(d,0,0);h.kc=c;h.fr=[];
 if(h.Smart)seg(h,a,W,H);else for(let r=0;r<h.Rows;r++)for(let q=0;q<h.Cols;q++){const im=x.getImageData(q*cw,r*ch,cw,ch),p=im.data,b=[1e9,1e9,-1,-1];for(let y=0;y<ch;y++)for(let u=0;u<cw;u++)if(p[(y*cw+u)*4+3]>40){b[0]=Math.min(b[0],u);b[1]=Math.min(b[1],y);b[2]=Math.max(b[2],u);b[3]=Math.max(b[3],y)}fin(h,r*h.Cols+q,im,0,0,b)}
 if(!fitted){fitted=1;fitView()}browser();thumbs()}
function autoKey(h,i){const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.drawImage(i,0,0,3,3,0,0,1,1);const[r,g,b,a]=x.getImageData(0,0,1,1).data;if(a<200)h.KeyOn=false;else{h.KeyOn=true;h.Key='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}}
const addSheet=o=>new Promise(ok=>{const i=new Image();i.onload=()=>{const h={name:o.name,data:o.data,img:i,...DK};if(o.Cols)K.forEach(k=>o[k]!==undefined&&(h[k]=o[k]));else autoKey(h,i);SH.push(h);act=SH.length-1;sliceS(h);if(!F.length&&!o.Cols)addAll(act);rekey(h);refresh();ok()};i.src=o.data});
async function readFiles(fs){fs=[...fs].filter(f=>f.type.startsWith('image/'));const n0=SH.length;for(const f of fs){const d=await new Promise(r=>{const x=new FileReader();x.onload=()=>r(x.result);x.readAsDataURL(f)});await addSheet({name:f.name.replace(/\.\w+$/,''),data:d});if($('#nm').value=='animation')$('#nm').value=SH[0].name}
 if(!U.length)cur=JSON.stringify(F);browser();thumbs();if(n0&&fs.length){goTab(2);toast('اتفتح '+fs.length+' شيت — اضغط على الفريمات أو "إضافة كل الشيت"')}}
$('#bo').onclick=$('#bo2').onclick=()=>$('#fi').click();$('#fi').onchange=e=>{readFiles(e.target.files);e.target.value=''};
addEventListener('dragover',e=>e.preventDefault());addEventListener('drop',e=>{e.preventDefault();readFiles(e.dataTransfer.files)});
const th=(h,c,H)=>{const k=document.createElement('canvas'),s=H/h.ch;k.width=Math.max(1,Math.round(h.cw*s));k.height=H;const f=h.fr&&h.fr[c];if(f)k.getContext('2d').drawImage(f.cv,f.x*s,f.y*s,f.cv.width*s,f.cv.height*s);return k};
function delSheet(i){if(!confirm('حذف الشيت وفريماته؟'))return;F=F.filter(f=>f.s!=i).map(f=>({...f,s:f.s>i?f.s-1:f.s}));SH.splice(i,1);act=Math.max(0,Math.min(act,SH.length-1));browser();thumbs();refresh();dirty()}
function browser(){const t=$('#tabs');t.innerHTML='';SH.forEach((h,i)=>{const b=document.createElement('div');b.className='sc'+(i==act?' on':'');b.innerHTML=`<span>${i+1}</span><b></b><button class="x" title="حذف الشيت">${ic('x',12)}</button>`;b.querySelector('b').textContent=h.name;b.onclick=e=>{if(e.target.closest('.x'))delSheet(i);else{act=i;refresh();browser()}};t.append(b)});
 const g=$('#cells');g.innerHTML='';const h=SH[act];if(!h||!h.fr)return;
 for(let c=0;c<h.Cols*h.Rows;c++){const k=th(h,c,56);k.className='cl';k.onclick=()=>{if(rep&&F[sel])Object.assign(F[sel],{s:act,c});else{F.splice(sel+1,0,D0(act,c));if(F.length>1)sel++}thumbs();dirty();toast('فريم '+(sel+1)+'/'+F.length)};g.append(k)}}
$('#md').lastChild.textContent='النقر: إضافة';$('#md').onclick=()=>{rep=!rep;$('#md').lastChild.textContent='النقر: '+(rep?'استبدال':'إضافة')};
$('#aa').onclick=()=>{if(SH[act]){addAll(act);thumbs();dirty();toast('تمت إضافة الشيت كله')}};
function thumbs(){const s=$('#strip');s.innerHTML='';F.forEach((f,i)=>{const h=SH[f.s],d=document.createElement('div');d.className='th'+(f.on?'':' off');d.append(h&&h.fr?th(h,f.c,64):document.createElement('canvas'));d.insertAdjacentHTML('beforeend',`<em>${i+1}</em>`);d.onclick=()=>{play=false;sync();setSel(i)};if(f.hold!=1)d.insertAdjacentHTML('beforeend',`<i>×${f.hold}</i>`);s.append(d)});setSel(Math.min(sel,F.length-1))}
function setSel(i){sel=Math.max(0,i);[...$('#strip').children].forEach((e,k)=>{e.classList.toggle('on',k==i);if(k==i&&play)e.scrollIntoView({inline:'nearest',block:'nearest'})});$('#fn').textContent=F.length?`${sel+1}/${F.length}`:'';refresh()}
const mv=d=>{const j=sel+d;if(j<0||j>=F.length)return;[F[sel],F[j]]=[F[j],F[sel]];sel=j;thumbs();dirty()},dup=n=>{if(!F[sel])return;F.splice(sel+1,0,...Array.from({length:n},()=>({...F[sel]})));thumbs();dirty();toast('تم النسخ ×'+n)};
$('#b1').onclick=()=>mv(-1);$('#b2').onclick=()=>mv(1);$('#d1').onclick=()=>dup(1);$('#d2').onclick=()=>dup(2);$('#d4').onclick=()=>dup(4);$('#b4').onclick=()=>{if(F.length>1){F.splice(sel,1);sel=Math.min(sel,F.length-1);thumbs();dirty()}};
$('#u1').onclick=()=>{const r=bb(F[sel]);if(!r)return;F.forEach(f=>{const b=bb(f);if(b)f.sc=Math.min(3,Math.max(.2,+(r.h/b.h).toFixed(3)))});setSel(sel);dirty();toast('تم توحيد الحجم')};
$('#u2').onclick=()=>{F.forEach(f=>{const b=bb(f),h=SH[f.s];if(b)f.oy=Math.round(h.ch*S.Gy/100-b.y1-1)});setSel(sel);dirty();toast('تمت المحاذاة على الأرض')};
$('#u0').onclick=()=>{if(F[sel]){Object.assign(F[sel],FD);thumbs();dirty();toast('ريسيت للفريم')}};$('#u3').onclick=()=>{F.forEach(f=>Object.assign(f,FD));thumbs();dirty();toast('ريسيت لكل الفريمات')};
function commit(){const j=JSON.stringify(F);if(j==cur)return;if(Date.now()-lt>500){U.push(cur);if(U.length>100)U.shift()}lt=Date.now();cur=j;R=[]}
const undo=()=>{if(!U.length)return;R.push(cur);cur=U.pop();F=JSON.parse(cur);thumbs();dirty(1)},redo=()=>{if(!R.length)return;U.push(cur);cur=R.pop();F=JSON.parse(cur);thumbs();dirty(1)};$('#un').onclick=undo;$('#rd').onclick=redo;
function dF(f,al,p){p=p||f;const h=SH[f.s],r=fo(f);if(!r)return;ctx.save();ctx.globalAlpha=al;const g=h.ch*S.Gy/100,s=S.Gs*p.sc;ctx.scale(s,s);ctx.drawImage(r.cv,r.x-h.cw/2+p.ox,r.y-g+p.oy);ctx.restore()}
const db=new Promise(r=>{const q=indexedDB.open('spritelab',1);q.onupgradeneeded=()=>q.result.createObjectStore('p');q.onsuccess=()=>r(q.result)});
const tx=async(m,f)=>{const d=await db;return new Promise(r=>{const q=f(d.transaction('p',m).objectStore('p'));q.onsuccess=()=>r(q.result)})};
const nm=()=>($('#nm').value.trim()||'animation').replace(/[^\w\u0600-\u06FF-]+/g,'_');
const dn=(b,n)=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4e3)};
function ruler(lt){const dp=devicePixelRatio,w=cv.width/dp,h=cv.height/dp,x0=-px/z,x1=(w-px)/z,y0=-py/z,y1=(h-py)/z,st=z<.3?500:z<.7?200:100;ctx.lineWidth=1/z;ctx.font=`${11/z}px sans-serif`;ctx.fillStyle=ctx.strokeStyle=lt?'rgba(0,0,0,.28)':'rgba(255,255,255,.22)';
 for(let x=Math.ceil(x0/st)*st;x<x1;x+=st){ctx.beginPath();ctx.moveTo(x,y0);ctx.lineTo(x,y1);ctx.stroke();ctx.fillText(x,x+3/z,y0+13/z)}
 for(let y=Math.ceil(y0/st)*st;y<y1;y+=st){if(!y)continue;ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke();ctx.fillText(-y,x0+4/z,y-3/z)}}
function fitView(){const h=SH[act]||SH[0];if(!h)return;const w=cv.clientWidth,H=cv.clientHeight,g=h.ch*S.Gy/100;z=Math.min(w/(h.cw*1.1),H/(h.ch*1.1));px=w/2;py=(H-h.ch*z)/2+g*z}
function zoomAt([cx,cy],k){const r=cv.getBoundingClientRect(),nz=Math.min(8,Math.max(.05,z*k));cx-=r.left;cy-=r.top;px=cx-(cx-px)*nz/z;py=cy-(cy-py)*nz/z;z=nz}
const cen=()=>{const r=cv.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
const pt=new Map(),pd=()=>{const a=[...pt.values()];return a.length==2?Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]):0};let pl=0;
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);pt.set(e.pointerId,[e.clientX,e.clientY]);pl=pd()};
cv.onpointermove=e=>{const o=pt.get(e.pointerId);if(!o)return;pt.set(e.pointerId,[e.clientX,e.clientY]);if(pt.size==1){px+=e.clientX-o[0];py+=e.clientY-o[1]}else if(pt.size==2){const d=pd(),a=[...pt.values()];if(pl)zoomAt([(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2],d/pl);pl=d}};
cv.onpointerup=cv.onpointercancel=e=>pt.delete(e.pointerId);cv.onwheel=e=>{e.preventDefault();zoomAt([e.clientX,e.clientY],e.deltaY<0?1.12:1/1.12)};
$('#zi').onclick=()=>zoomAt(cen(),1.25);$('#zo').onclick=()=>zoomAt(cen(),.8);$('#ft').onclick=fitView;$('#z1').onclick=()=>{const h=SH[act];if(!h)return;z=1;px=cv.clientWidth/2;py=cv.clientHeight/2+h.ch*S.Gy/200};
function draw(po){const W=cv.width,H=cv.height,dp=devicePixelRatio;ctx.setTransform(1,0,0,1,0,0);const lt=S.Bg=='light'||S.Bg=='chk';
 if(S.Bg=='chk'){ctx.fillStyle='#bbb';ctx.fillRect(0,0,W,H);ctx.fillStyle='#999';const n=24*dp;for(let y=0;y<H;y+=n)for(let x=(y/n&1)*n;x<W;x+=2*n)ctx.fillRect(x,y,n,n)}
 else{ctx.fillStyle={dark:'#16131f',light:'#e9e7f0',cus:S.BgC}[S.Bg];ctx.fillRect(0,0,W,H)}
 ctx.setTransform(z*dp,0,0,z*dp,px*dp,py*dp);ctx.fillStyle=lt?'rgba(0,0,0,.09)':'rgba(255,255,255,.06)';ctx.fillRect(-1e5,0,2e5,1e5);if(S.Grid)ruler(lt);
 ctx.strokeStyle='#a78bfa';ctx.lineWidth=2/z;ctx.beginPath();ctx.moveTo(-1e5,0);ctx.lineTo(1e5,0);ctx.stroke();
 if(!F.length){ctx.fillStyle=lt?'#555':'#aaa';ctx.font=`${16/z}px sans-serif`;ctx.textAlign='center';ctx.fillText('افتح شيت أو اسحبه هنا',0,-60/z);ctx.textAlign='start';return}
 const f=F[sel];if(!f)return;if((play||Date.now()-(window.shT||0)<800)&&f.sh)ctx.translate((Math.random()-.5)*f.sh,(Math.random()-.5)*f.sh);if(S.Onion&&sel>0)dF(F[sel-1],.3);
 if(po&&po.w>0&&po.n){const w=po.w,n=po.n,tw=S.Tw=='move'||S.Tw=='both',fd=S.Tw=='fade'||S.Tw=='both',l=(a,b)=>a+(b-a)*w,p=tw?{sc:l(f.sc,n.sc),ox:l(f.ox,n.ox),oy:l(f.oy,n.oy)}:null;dF(f,1,p||f);if(fd)dF(n,w,p||n)}else dF(f,1)}
const order=()=>{const o=F.map((f,i)=>f.on?i:-1).filter(i=>i>=0);return S.Mode=='pp'&&o.length>2?o.concat(o.slice(1,-1).reverse()):o},dur=i=>1000*F[i].hold/(S.Fps*S.Spd);
const sync=()=>{$('#pp').innerHTML=ic(play?'pause':'play')},step=d=>{if(!F.length)return;play=false;sync();setSel((sel+d+F.length)%F.length)};
$('#pp').onclick=()=>{play=!play;if(play){const o=order(),k=o.indexOf(sel);tm=0;for(let j=0;j<k;j++)tm+=dur(o[j])}sync()};$('#pv').onclick=()=>step(-1);$('#nx').onclick=()=>step(1);sync();
function tick(t){requestAnimationFrame(tick);const dl=Math.min(100,t-last);last=t;let po=null;const o=order();
 if(play&&o.length){const T=o.reduce((s,i)=>s+dur(i),0);tm+=dl;if(S.Mode=='once'&&tm>=T){tm=T-.01;play=false;sync()}else tm%=T;let k=0,s=0;while(k<o.length-1&&tm>=s+dur(o[k])){s+=dur(o[k]);k++}
  const u=(tm-s)/dur(o[k]),bl=S.Tw!='none'?S.Bl/100:0,nk=k+1<o.length?k+1:S.Mode=='once'?-1:0;if(o[k]!=sel)setSel(o[k]);
  po={w:bl&&nk>=0&&o.length>1&&u>1-bl?ease((u-(1-bl))/bl):0,n:nk>=0?F[o[nk]]:null}}
 draw(po)}
new ResizeObserver(()=>{cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;if(!F.length){px=cv.clientWidth/2;py=cv.clientHeight*.7}}).observe(cv);
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&/^[zy]$/i.test(e.key)){e.preventDefault();(e.key.toLowerCase()=='y'||e.shiftKey)?redo():undo();return}
 if(/INPUT|SELECT/.test(e.target.tagName)&&e.target.type!='range'&&e.target.type!='checkbox')return;const f=F[sel],s=e.shiftKey?10:1;
 if(e.code=='Space'){e.preventDefault();$('#pp').click()}else if(e.key=='['||e.key==']')step(e.key=='['?-1:1);
 else if(f&&e.key.startsWith('Arrow')){e.preventDefault();f.ox+=({ArrowRight:s,ArrowLeft:-s})[e.key]||0;f.oy+=({ArrowDown:s,ArrowUp:-s})[e.key]||0;setSel(sel);dirty()}});
async function save(q){if(!SH.length)return;await tx('readwrite',s=>s.put({SH:SH.map(h=>({name:h.name,data:h.data,...Object.fromEntries(K.map(k=>[k,h[k]]))})),S:{...S},F,sel,act},nm()));if(!q)toast('تم الحفظ ✔');list()}
function dirty(n){if(!n)commit();clearTimeout(dt);dt=setTimeout(()=>save(true),700);info()}
async function list(){const k=await tx('readonly',s=>s.getAllKeys());$('#pl').innerHTML='<option value="">— مشاريع محفوظة —</option>'+k.map(n=>`<option>${n}</option>`).join('')}
$('#pl').onchange=async e=>{const n=e.target.value;if(!n)return;const r=await tx('readonly',s=>s.get(n));if(!r.SH){r.SH=[{...r.S,name:n,data:r.data}];r.F.forEach(f=>f.s=0)}
 SH=[];F=[];fitted=0;for(const o of r.SH)await addSheet(o);Object.assign(S,D,r.S);F=r.F.map(f=>({...FD,...f}));act=Math.min(r.act||0,SH.length-1);$('#nm').value=n;browser();thumbs();setSel(r.sel||0);cur=JSON.stringify(F);U=[];R=[];fitView();toast('تم الفتح')};
$('#bs').onclick=()=>save();$('#bn').onclick=async()=>{await save(true);location.reload()};
function atlas(){const o=F.filter(f=>f.on&&bb(f)),Z=S.Gs;let L=0,Rr=0,T=0,B=0;
 o.forEach(f=>{const b=bb(f),h=SH[f.s],g=h.ch*S.Gy/100,s=Z*f.sc;L=Math.max(L,-(b.x0-h.cw/2+f.ox)*s);Rr=Math.max(Rr,(b.x1+1-h.cw/2+f.ox)*s);T=Math.max(T,-(b.y0-g+f.oy)*s);B=Math.max(B,(b.y1+1-g+f.oy)*s)});
 const hf=Math.ceil(Math.max(L,Rr))+4,W=hf*2,pv=Math.ceil(T)+4,H=pv+Math.ceil(B)+4,c=document.createElement('canvas');c.width=Math.max(1,W*o.length);c.height=H;const x=c.getContext('2d');
 o.forEach((f,i)=>{const h=SH[f.s],r=fo(f),g=h.ch*S.Gy/100,s=Z*f.sc;x.save();x.translate(i*W+hf,pv);x.scale(s,s);x.drawImage(r.cv,r.x-h.cw/2+f.ox,r.y-g+f.oy);x.restore()});return{c,o,W,H,hf,pv}}
$('#bx').onclick=()=>{if(!F.length)return;const{c,o,W,H,hf,pv}=atlas();dn(new Blob([JSON.stringify({format:'spritelab/3',name:nm(),fps:S.Fps,speed:S.Spd,mode:S.Mode,transition:{type:S.Tw,blend:S.Bl/100},frameCount:o.length,cell:[W,H],pivot:[hf,pv],frames:o.map((f,i)=>({x:i*W,y:0,w:W,h:H,hold:f.hold,ms:ms(f),shake:f.sh||0})),atlas:c.toDataURL('image/png')})],{type:'application/json'}),nm()+'.anim.json');toast('تم التصدير: '+nm()+'.anim.json')};
$('#bp').onclick=()=>{if(F.length)atlas().c.toBlob(b=>dn(b,nm()+'.png'))};
$('#bg').onclick=()=>{if(!F.length)return;toast('جاري إنشاء GIF…');setTimeout(()=>{const{c,o,W,H}=atlas();let ix=o.map((_,i)=>i);if(S.Mode=='pp'&&ix.length>2)ix=ix.concat(ix.slice(1,-1).reverse());const cs=[],dl=[],bl=S.Tw=='none'||S.Tw=='move'?0:S.Bl/100,ns=3,mk=(i,j,al)=>{const k=document.createElement('canvas');k.width=W;k.height=H;const x=k.getContext('2d'),sk=(o[i].sh||0)*S.Gs,dx=(Math.random()-.5)*sk,dy=(Math.random()-.5)*sk;x.drawImage(c,i*W,0,W,H,dx,dy,W,H);if(j!=null){x.globalAlpha=al;x.drawImage(c,j*W,0,W,H,0,0,W,H)}return k};
 ix.forEach((i,n)=>{const d=ms(o[i]);cs.push(mk(i));dl.push(d*(1-bl));if(bl&&(n<ix.length-1||S.Mode=='loop')){const j=ix[(n+1)%ix.length];for(let s=1;s<=ns;s++){cs.push(mk(i,j,ease(s/(ns+1))));dl.push(d*bl/ns)}}});
 dn(new Blob([gifBytes(cs,dl,W,H)],{type:'image/gif'}),nm()+'.gif');toast('تم تصدير GIF')},30)};
addEventListener('pagehide',()=>save(true));document.addEventListener('visibilitychange',()=>document.hidden&&save(true));
list();info();requestAnimationFrame(tick);if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
