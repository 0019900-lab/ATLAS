'use strict';
const $=s=>document.querySelector(s),cv=$('#cv'),ctx=cv.getContext('2d');
const IC={open:'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',save:'M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM7 3v6h8V3M7 21v-7h10v7',down:'M12 3v12M7 10l5 5 5-5M5 21h14',image:'M4 4h16v16H4zM4 15l5-5 4 4 3-3 4 4M9 8.5h.01',film:'M4 4h16v16H4zM8 4v16M16 4v16M4 9h4M4 15h4M16 9h4M16 15h4',plus:'M12 5v14M5 12h14',minus:'M5 12h14',undo:'M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',redo:'M15 14l5-5-5-5M20 9H10a6 6 0 0 0 0 12h3',prev:'M19 20L9 12l10-8zM5 19V5',next:'M5 4l10 8-10 8zM19 5v14',play:'M6 4l14 8-14 8z',pause:'M8 4v16M16 4v16',fit:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',copy:'M9 9h11v11H9zM5 15V5h10',trash:'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',reset:'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5',left:'M15 6l-6 6 6 6',right:'M9 6l6 6-6 6',repeat:'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',file:'M6 3h8l5 5v13H6zM14 3v5h5',anchor:'M3 20h18M12 4v12M8 12l4 4 4-4',scale:'M4 14v6h6M20 10V4h-6M4 20l6-6M20 4l-6 6',grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',x:'M6 6l12 12M18 6L6 18',zap:'M13 2L4 14h7l-1 8 9-12h-7z',menu:'M4 6h16M4 12h16M4 18h16',move:'M12 3v18M3 12h18M8 7l4-4 4 4M8 17l4 4 4-4M7 8l-4 4 4 4M17 8l4 4-4 4',lock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',unlock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 7-2',ruler:'M3 17L17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2',kbd:'M3 6h18v12H3zM7 10h.01M11 10h.01M15 10h.01M8 14h8'};
const ic=(n,s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[n].split('M').filter(Boolean).map(d=>`<path d="M${d}"/>`).join('')}</svg>`;
document.querySelectorAll('[data-i]').forEach(e=>e.insertAdjacentHTML('afterbegin',ic(e.dataset.i)));
addEventListener('click',e=>{if(e.target.closest('button'))navigator.vibrate&&navigator.vibrate(6)});
const D={Fps:12,Spd:1,Mode:'loop',Tw:'none',Bl:40,Gy:90,Gs:1,Bg:'dark',BgC:'#2a2540',Grid:true,Onion:false,Tr:0,GlC:'#a78bfa',Sh:0,Shw:80,Ol:0,OlC:'#000000',Px:false,OnN:1,TrX:false,ShC:'const',La:315,Li:0,NM:false},S={...D};
const DK={Cols:4,Rows:2,KeyOn:true,Key:'#00ff00',Tol:100,Soft:30,Spill:true,Smart:true,Gap:10,Fl:true,Hole:0,Er:0,Auto:false,Dust:2,Dec:true,Norm:false,Hue:0,Sat:100},K=Object.keys(DK);
const FD={sc:1,ox:0,oy:0,hold:1,on:true,sh:0,sq:0,rot:0,pvx:0,pvy:0,gl:0,fl:0,key:false,ft:null,ly:null,fe:null,fx:false,hx:0,hy:0,hw:0,hh:0};
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
row(fr,'اهتزاز الصدمة',gF('sh',{min:0,max:40,step:1}));row(fr,'ضغط/مط (Squash & Stretch)',gF('sq',{min:-.5,max:.5,step:.01,u:v=>Math.round(v*100)+'%'}));row(fr,'دوران °',gF('rot',{min:-90,max:90,step:1}));row(fr,'نقطة الدوران X',gF('pvx',{min:-200,max:200,step:1}));row(fr,'نقطة الدوران Y',gF('pvy',{min:-400,max:100,step:1}));row(fr,'توهج (Glow)',gF('gl',{min:0,max:60,step:1}));row(fr,'وميض أبيض (Hit Flash)',gF('fl',{min:0,max:1,step:.05,u:v=>Math.round(v*100)+'%'}));row(fr,'قلب أفقي (X)',gF('fx',{t:'k'}));row(fr,'مربع الاصطدام X',gF('hx',{t:'n',min:-800,max:800,step:1}));row(fr,'مربع الاصطدام Y',gF('hy',{t:'n',min:-800,max:800,step:1}));row(fr,'عرض المربع (0 = بدون)',gF('hw',{t:'n',min:0,max:1000,step:1}));row(fr,'ارتفاع المربع',gF('hh',{t:'n',min:0,max:1000,step:1}));row(fr,'مفعّل في التشغيل',gF('on',{t:'k'}));
row(pb,'FPS (فريم/ثانية)',gS('Fps',{t:'n',min:1,max:60,step:1,chips:[6,8,12,15,24,30],u:()=>'فريم/ث'}));row(pb,'السرعة',gS('Spd',{min:.1,max:3,step:.05,chips:[.5,1,1.5,2],cu:'×',u:v=>v.toFixed(2)+'×'}));
row(pb,'ذيل الحركة (Trail)',gS('Tr',{min:0,max:8,step:1}));row(pb,'تضمين الذيل في الأطلس',gS('TrX',{t:'k'}));row(pb,'منحنى الاهتزاز',gS('ShC',{t:'s',opts:[['const','ثابت'],['fade','يتلاشى']]}));row(pb,'نمط التشغيل',gS('Mode',{t:'s',opts:[['loop','تكرار'],['pp','ذهاب وعودة'],['once','مرة واحدة']]}));
row(pb,'الانتقال بين الفريمات',gS('Tw',{t:'s',opts:[['none','بدون (حاد)'],['fade','تلاشي تدريجي'],['move','حركة انسيابية'],['both','تلاشي + حركة']]}));row(pb,'نسبة الانتقال من مدة الفريم',gS('Bl',{min:5,max:100,step:5,u:v=>v+'%'}));
row(sh,'أعمدة',gH('Cols',{t:'n',min:1,max:16,step:1}));row(sh,'صفوف',gH('Rows',{t:'n',min:1,max:16,step:1}));row(sh,'قص ذكي (يلحق الإفكتات الطالعة برة الخلية)',gH('Smart',{t:'k'}));row(sh,'دمج الأجزاء القريبة (px)',gH('Gap',{min:0,max:40,step:1}));row(sh,'تقسيم تلقائي بدون شبكة (شيتات غير منتظمة)',gH('Auto',{t:'k'}));row(sh,'حذف البقع الصغيرة (حجم بالبلوك 4px)',gH('Dust',{min:0,max:30,step:1}));row(sh,'تنظيف هالة الخلفية على الحواف',gH('Dec',{t:'k'}));row(sh,'توحيد ألوان الفريمات (يخفف الوميض)',gH('Norm',{t:'k'}));row(sh,'درجة اللون (Hue)',gH('Hue',{min:-180,max:180,step:1}));row(sh,'التشبع %',gH('Sat',{min:0,max:200,step:5}));
row(sh,'إزالة الكروما',gH('KeyOn',{t:'k'}));row(sh,'حذف الخلفية المتصلة بالحافة فقط (تحمي ألوان الشخصية)',gH('Fl',{t:'k'}));row(sh,'حذف ثقوب الخلفية المحاصرة الأكبر من (px) — 0 = بدون',gH('Hole',{min:0,max:3000,step:10}));row(sh,'نحت الحواف (px)',gH('Er',{min:0,max:4,step:1}));row(sh,'لون الكروما',gH('Key',{t:'c'}));row(sh,'التسامح',gH('Tol',{min:0,max:255,step:1}));row(sh,'نعومة الحواف',gH('Soft',{min:0,max:100,step:1}));row(sh,'إزالة الانعكاس',gH('Spill',{t:'k'}));
row(vp,'خط الأرض %',gS('Gy',{min:40,max:100,step:1}));row(vp,'الحجم العام (الكل)',gS('Gs',{min:.2,max:3,step:.01,u:v=>pc(v)}));row(vp,'الخلفية',gS('Bg',{t:'s',opts:[['dark','غامقة'],['light','فاتحة'],['chk','شطرنج'],['cus','مخصصة']]}));row(vp,'لون مخصص',gS('BgC',{t:'c'}));row(vp,'لون التوهج والذيل',gS('GlC',{t:'c'}));row(vp,'ظل تحت الشخصية %',gS('Sh',{min:0,max:100,step:1}));row(vp,'عرض الظل %',gS('Shw',{min:20,max:200,step:5}));row(vp,'حد خارجي (px)',gS('Ol',{min:0,max:4,step:1}));row(vp,'لون الحد الخارجي',gS('OlC',{t:'c'}));row(vp,'بكسل آرت (بدون تنعيم)',gS('Px',{t:'k'}));row(vp,'مسطرة وشبكة',gS('Grid',{t:'k'}));row(vp,'ظل الفريمات (قبل أحمر / بعد أخضر)',gS('Onion',{t:'k'}));row(vp,'عدد فريمات الظل',gS('OnN',{min:1,max:4,step:1}));row(vp,'اتجاه الإضاءة °',gS('La',{min:0,max:360,step:5}));row(vp,'قوة الإضاءة %',gS('Li',{min:0,max:100,step:5}));row(vp,'تصدير Normal Map مع حزمة Godot',gS('NM',{t:'k'}));
const pages=[...document.querySelectorAll('.pg')],tabs=[...document.querySelectorAll('#tn button')];
const asd=$('aside'),mob=()=>innerWidth<=760;let tbi=0;const goTab=i=>{pages.forEach((p,k)=>p.classList.toggle('on',k==i));tabs.forEach((b,k)=>b.classList.toggle('on',k==i));if(mob())asd.classList.add('open');tbi=i};tabs.forEach((b,i)=>b.onclick=()=>{if(mob()&&asd.classList.contains('open')&&tbi==i)asd.classList.remove('open');else goTab(i)});goTab(0);asd.classList.remove('open');
function info(){const o=F.filter(f=>f.on),T=o.reduce((s,f)=>s+ms(f),0);$('#eff').innerHTML=`السرعة الفعلية <b>${(S.Fps*S.Spd).toFixed(1)}</b> فريم/ث<br>${o.length} فريم · المدة <b>${(T/1000).toFixed(2)}</b> ثانية`;$('#hud').textContent=`${(S.Fps*S.Spd).toFixed(1)} fps · ${F.length?sel+1+'/'+F.length:'—'}`}
function chg(k,h){if(k=='Cols'||k=='Rows'||k=='Auto'){h.ov={};h.sm=[];F=F.filter(f=>f.s!=act);sliceS(h);rekey(h);addAll(act);sel=0;thumbs();dirty()}else{h.ov={};clearTimeout(rt);rt=setTimeout(()=>rekey(h),120)}}
const D0=(s,c)=>({s,c,...FD}),fo=f=>SH[f.s]&&SH[f.s].fr&&SH[f.s].fr[f.c],bb=f=>{const r=fo(f);return r&&r.b},cbb=f=>{const r=fo(f);return r&&(r.cb||r.b)};
const addAll=s=>{const h=SH[s];for(let c=0;c<(h.N||h.Cols*h.Rows);c++)F.push(D0(s,c))};
const sliceS=h=>{h.cw=h.img.width/h.Cols|0;h.ch=h.img.height/h.Rows|0};
function seg(h,a,W,H){const B=4,bw=Math.ceil(W/B),bh=Math.ceil(H/B),on=new Uint8Array(bw*bh),{cw,ch,Cols,Rows}=h,g=Math.max(1,Math.round(h.Gap/B)),L=new Int32Array(bw*bh).fill(-1),own=[],bx=[],zs=[];
 for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(a[(y*W+x)*4+3]>12)on[(y/B|0)*bw+(x/B|0)]=1;
 for(let s=0,n=0;s<on.length;s++){if(!on[s]||L[s]>=0)continue;const q=[s],cnt=new Map();L[s]=n;let x0=1e9,y0=1e9,x1=-1,y1=-1,zz=0;
  while(q.length){zz++;const i=q.pop(),X=i%bw,Y=i/bw|0;x0=Math.min(x0,X);x1=Math.max(x1,X);y0=Math.min(y0,Y);y1=Math.max(y1,Y);const k=Math.min(Cols-1,(X*B+2)/cw|0)+Math.min(Rows-1,(Y*B+2)/ch|0)*Cols;cnt.set(k,(cnt.get(k)||0)+1);
   for(let v=Math.max(0,Y-g);v<=Math.min(bh-1,Y+g);v++)for(let u=Math.max(0,X-g);u<=Math.min(bw-1,X+g);u++){const j=v*bw+u;if(on[j]&&L[j]<0){L[j]=n;q.push(j)}}}
  own.push(zz<=h.Dust?-1:h.ov&&h.ov[n]!=null?h.ov[n]:[...cnt].sort((m,k)=>k[1]-m[1])[0][0]);bx.push([x0,y0,x1,y1]);zs.push(zz);n++}
 h.L=L;h.bw=bw;h.SB=B;let NF=Cols*Rows,OR=c=>[(c%Cols)*cw,(c/Cols|0)*ch];if(h.Auto){const g=autoGroup(h,bx,zs,B);own.splice(0,own.length,...g.own);NF=g.NF;OR=c=>g.O[c];h.cw=g.cw;h.ch=g.ch}h.N=NF;for(let c=0;c<NF;c++){const cs=[];own.forEach((o,i)=>o==c&&cs.push(i));if(!cs.length){h.fr.push(null);continue}
  const X0=Math.min(...cs.map(i=>bx[i][0]))*B,Y0=Math.min(...cs.map(i=>bx[i][1]))*B,X1=Math.min(W,(Math.max(...cs.map(i=>bx[i][2]))+1)*B),Y1=Math.min(H,(Math.max(...cs.map(i=>bx[i][3]))+1)*B),w=X1-X0,hh=Y1-Y0,im=new ImageData(w,hh),od=im.data,set=new Set(cs),b=[1e9,1e9,-1,-1],cb=[1e9,1e9,-1,-1],big=cs.reduce((m,i)=>zs[i]>zs[m]?i:m,cs[0]);
  for(let y=0;y<hh;y++)for(let x=0;x<w;x++){const i=((Y0+y)*W+X0+x)*4;const lb=L[((Y0+y)/B|0)*bw+((X0+x)/B|0)];if(set.has(lb)){const o=(y*w+x)*4;od[o]=a[i];od[o+1]=a[i+1];od[o+2]=a[i+2];od[o+3]=a[i+3];if(a[i+3]>16){b[0]=Math.min(b[0],x);b[1]=Math.min(b[1],y);b[2]=Math.max(b[2],x);b[3]=Math.max(b[3],y);if(lb==big){cb[0]=Math.min(cb[0],x);cb[1]=Math.min(cb[1],y);cb[2]=Math.max(cb[2],x);cb[3]=Math.max(cb[3],y)}}}}
  const[oX,oY]=OR(c);h._o=[oX,oY];fin(h,c,im,X0-oX,Y0-oY,b,cb[2]<0?null:cb)}}
function fin(h,c,im,x,y,b,cb){if(b[2]<0){h.fr.push(null);return}const w=b[2]-b[0]+1,hh=b[3]-b[1]+1,k=document.createElement('canvas');k.width=w;k.height=hh;k.getContext('2d').putImageData(im,-b[0],-b[1],b[0],b[1],w,hh);const X=x+b[0],Y=y+b[1],q=cb||b;h.fr.push({cv:k,cx:h._o[0],cy:h._o[1],x:X,y:Y,b:{x0:X,y0:Y,x1:X+w-1,y1:Y+hh-1,h:hh},cb:{x0:x+q[0],y0:y+q[1],x1:x+q[2],y1:y+q[3],h:q[3]-q[1]+1}})}
function rekey(h){const W=h.img.width,H=h.img.height,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(h.img,0,0);const d=x.getImageData(0,0,W,H),a=d.data,{cw,ch}=h;
 if(h.KeyOn){const k=parseInt(h.Key.slice(1),16),R=k>>16,G=k>>8&255,B=k&255,T=h.Tol,Wd=h.Soft*2+1,ki=[R,G,B].indexOf(Math.max(R,G,B)),N=W*H,E=new Float32Array(N),M=new Uint8Array(N),V=new Uint8Array(N),Kp=new Uint8Array(N);
  for(let i=0;i<N;i++){const e=Math.hypot(a[i*4]-R,a[i*4+1]-G,a[i*4+2]-B);E[i]=e;if(e<T+Wd)M[i]=1}
  const fl=(s,co)=>{const q=[s];V[s]=1;let n=0,j;while(q.length){const i=q.pop();n++;if(co)co.push(i);const x=i%W,y=i/W|0;if(x>0&&M[j=i-1]&&!V[j]){V[j]=1;q.push(j)}if(x<W-1&&M[j=i+1]&&!V[j]){V[j]=1;q.push(j)}if(y>0&&M[j=i-W]&&!V[j]){V[j]=1;q.push(j)}if(y<H-1&&M[j=i+W]&&!V[j]){V[j]=1;q.push(j)}}return n};
  if(h.Fl){for(let x=0;x<W;x++)for(const i of[x,(H-1)*W+x])if(M[i]&&!V[i])fl(i);for(let y=0;y<H;y++)for(const i of[y*W,y*W+W-1])if(M[i]&&!V[i])fl(i);if(h.Hole>0)for(let i=0;i<N;i++)if(M[i]&&!V[i]){const co=[];if(fl(i,co)<h.Hole)co.forEach(j=>Kp[j]=1)}}else V.set(M);
  for(let i=0;i<N;i++){if(!V[i]||Kp[i])continue;const e=E[i],al=e<=T?0:e>=T+Wd?1:(e-T)/Wd,p=i*4;if(h.Dec&&al>0&&al<1)for(let c=0;c<3;c++)a[p+c]=Math.max(0,Math.min(255,(a[p+c]-(1-al)*[R,G,B][c])/al));if(al>0&&h.Spill){const m=Math.max(a[p+(ki+1)%3],a[p+(ki+2)%3]);if(a[p+ki]>m)a[p+ki]=m}a[p+3]*=al}
  for(let n=0;n<h.Er;n++){const Z=new Uint8Array(N);for(let i=0;i<N;i++)Z[i]=a[i*4+3]==0?1:0;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;if(!Z[i]&&(x==0||y==0||x==W-1||y==H-1||Z[i-1]||Z[i+1]||Z[i-W]||Z[i+W]))a[i*4+3]=0}}}
 x.putImageData(d,0,0);h.kc=c;h.fr=[];
 h.N=h.Cols*h.Rows;if(h.Smart||h.Auto)seg(h,a,W,H);else for(let r=0;r<h.Rows;r++)for(let q=0;q<h.Cols;q++){const im=x.getImageData(q*cw,r*ch,cw,ch),p=im.data,b=[1e9,1e9,-1,-1];for(let y=0;y<ch;y++)for(let u=0;u<cw;u++)if(p[(y*cw+u)*4+3]>16){b[0]=Math.min(b[0],u);b[1]=Math.min(b[1],y);b[2]=Math.max(b[2],u);b[3]=Math.max(b[3],y)}h._o=[q*cw,r*ch];fin(h,r*h.Cols+q,im,0,0,b)}
 hueFx(h);mkSmears(h);if(h.Norm)norm(h);if(!fitted){fitted=1;fitView()}browser();thumbs()}
function autoKey(h,i){const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.drawImage(i,0,0,3,3,0,0,1,1);const[r,g,b,a]=x.getImageData(0,0,1,1).data;if(a<200)h.KeyOn=false;else{h.KeyOn=true;h.Key='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}}
const addSheet=o=>new Promise(ok=>{const i=new Image();i.onload=()=>{const h={name:o.name,data:o.data,img:i,...DK,ov:{...(o.ov||{})},sm:(o.sm||[]).map(m=>({...m}))};if(o.Cols)K.forEach(k=>o[k]!==undefined&&(h[k]=o[k]));else autoKey(h,i);SH.push(h);act=SH.length-1;if(SH.length==1&&!o.Cols)$('#nm').value=o.name;sliceS(h);rekey(h);if(!F.length&&!o.Cols){addAll(act);thumbs()}refresh();ok()};i.src=o.data});
async function readFiles(fs){fs=[...fs].filter(f=>f.type.startsWith('image/'));const n0=SH.length;for(const f of fs){const d=await new Promise(r=>{const x=new FileReader();x.onload=()=>r(x.result);x.readAsDataURL(f)});await addSheet({name:f.name.replace(/\.\w+$/,''),data:d});if(!n0&&f===fs[0])$('#nm').value=f.name.replace(/\.[^.]+$/,'')}
 if(!U.length)cur=JSON.stringify(F);browser();thumbs();if(n0&&fs.length){goTab(2);toast('اتفتح '+fs.length+' شيت — اضغط على الفريمات أو "إضافة كل الشيت"')}}
$('#bo').onclick=$('#bo2').onclick=()=>$('#fi').click();$('#fi').onchange=e=>{readFiles(e.target.files);e.target.value=''};
addEventListener('dragover',e=>e.preventDefault());addEventListener('drop',e=>{e.preventDefault();readFiles(e.dataTransfer.files)});
const th=(h,c,H)=>{const k=document.createElement('canvas'),s=H/h.ch;k.width=Math.max(1,Math.round(h.cw*s));k.height=H;const f=h.fr&&h.fr[c];if(f)k.getContext('2d').drawImage(f.cv,f.x*s,f.y*s,f.cv.width*s,f.cv.height*s);return k};
function delSheet(i){if(!confirm('حذف الشيت وفريماته؟'))return;F=F.filter(f=>f.s!=i).map(f=>({...f,s:f.s>i?f.s-1:f.s}));SH.splice(i,1);act=Math.max(0,Math.min(act,SH.length-1));browser();thumbs();refresh();dirty()}
function browser(){const t=$('#tabs');t.innerHTML='';SH.forEach((h,i)=>{const b=document.createElement('div');b.className='sc'+(i==act?' on':'');b.innerHTML=`<span>${i+1}</span><b></b><button class="x" title="حذف الشيت">${ic('x',12)}</button>`;b.querySelector('b').textContent=h.name;b.onclick=e=>{if(e.target.closest('.x'))delSheet(i);else{act=i;refresh();browser()}};t.append(b)});
 fillLy();const g=$('#cells');g.innerHTML='';const h=SH[act];if(!h||!h.fr)return;
 for(let c=0;c<(h.N||h.Cols*h.Rows);c++){const k=th(h,c,56);k.className='cl';k.onclick=()=>{if(rep&&F[sel])Object.assign(F[sel],{s:act,c});else{F.splice(sel+1,0,D0(act,c));if(F.length>1)sel++}thumbs();dirty();toast('فريم '+(sel+1)+'/'+F.length)};g.append(k)}}
$('#md').lastChild.textContent='النقر: إضافة';$('#md').onclick=()=>{rep=!rep;$('#md').lastChild.textContent='النقر: '+(rep?'استبدال':'إضافة')};
$('#aa').onclick=()=>{if(SH[act]){addAll(act);thumbs();dirty();toast('تمت إضافة الشيت كله')}};
function thumbs(){const s=$('#strip');s.innerHTML='';F.forEach((f,i)=>{const h=SH[f.s],d=document.createElement('div');d.className='th'+(f.on?'':' off');d.append(h&&h.fr?th(h,f.c,64):document.createElement('canvas'));d.insertAdjacentHTML('beforeend',`<em>${i+1}</em>`);d.onclick=()=>{play=false;sync();setSel(i)};d.draggable=true;d.ondragstart=e=>{window.dg=i;e.dataTransfer.setData('t','x')};d.ondragover=e=>e.preventDefault();d.ondrop=e=>{e.preventDefault();const a=window.dg;if(a==null||a==i)return;const[m]=F.splice(a,1);F.splice(i,0,m);sel=i;window.dg=null;thumbs();dirty()};if(f.hold!=1)d.insertAdjacentHTML('beforeend',`<i>×${f.hold}</i>`);if(f.key)d.insertAdjacentHTML('beforeend','<u>◆</u>');if(f.fe)d.insertAdjacentHTML('beforeend','<u style="top:auto;bottom:1px;right:auto;left:3px">✦</u>');s.append(d)});setSel(Math.min(sel,F.length-1))}
function setSel(i){sel=Math.max(0,i);[...$('#strip').children].forEach((e,k)=>{e.classList.toggle('on',k==i);if(k==i&&play)e.scrollIntoView({inline:'nearest',block:'nearest'})});$('#fn').textContent=F.length?`${sel+1}/${F.length}`:'';refresh()}
const mv=d=>{const j=sel+d;if(j<0||j>=F.length)return;[F[sel],F[j]]=[F[j],F[sel]];sel=j;thumbs();dirty()},dup=n=>{if(!F[sel])return;F.splice(sel+1,0,...Array.from({length:n},()=>({...F[sel]})));thumbs();dirty();toast('تم النسخ ×'+n)};
$('#b1').onclick=()=>mv(-1);$('#b2').onclick=()=>mv(1);$('#d1').onclick=()=>dup(1);$('#d2').onclick=()=>dup(2);$('#d4').onclick=()=>dup(4);$('#b4').onclick=()=>{if(F.length>1){F.splice(sel,1);sel=Math.min(sel,F.length-1);thumbs();dirty()}};
$('#u1').onclick=()=>{const r=cbb(F[sel]);if(!r)return;F.forEach(f=>{const b=cbb(f);if(b)f.sc=Math.min(3,Math.max(.2,+(r.h/b.h).toFixed(3)))});$('#u2').click();$('#u6').click();toast('تم توحيد الحجم والقدم والمركز')};
$('#u2').onclick=()=>{F.forEach(f=>{const b=cbb(f),h=SH[f.s];if(b)f.oy=Math.round(h.ch*S.Gy/100-b.y1-1)});setSel(sel);dirty();toast('تمت المحاذاة على الأرض')};
$('#u0').onclick=()=>{if(F[sel]){Object.assign(F[sel],FD);thumbs();dirty();toast('ريسيت للفريم')}};$('#u3').onclick=()=>{F.forEach(f=>Object.assign(f,FD));thumbs();dirty();toast('ريسيت لكل الفريمات')};
function commit(){const j=JSON.stringify(F);if(j==cur)return;if(Date.now()-lt>500){U.push(cur);if(U.length>100)U.shift()}lt=Date.now();cur=j;R=[]}
const undo=()=>{if(!U.length)return;R.push(cur);cur=U.pop();F=JSON.parse(cur);thumbs();dirty(1)},redo=()=>{if(!R.length)return;U.push(cur);cur=R.pop();F=JSON.parse(cur);thumbs();dirty(1)};$('#un').onclick=undo;$('#rd').onclick=redo;
function dF(f,al,p){paint(ctx,f,al,p,z*devicePixelRatio)}
const db=new Promise(r=>{const q=indexedDB.open('spritelab',1);q.onupgradeneeded=()=>q.result.createObjectStore('p');q.onsuccess=()=>r(q.result)});
const tx=async(m,f)=>{const d=await db;return new Promise(r=>{const q=f(d.transaction('p',m).objectStore('p'));q.onsuccess=()=>r(q.result)})};
const nm=()=>($('#nm').value.trim()||'animation').replace(/[\\\/:*?"<>|]+/g,'_');
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
 if(bgI){const k=Math.max(W/bgI.width,H/bgI.height);ctx.drawImage(bgI,(W-bgI.width*k)/2,(H-bgI.height*k)/2,bgI.width*k,bgI.height*k)}ctx.setTransform(z*dp,0,0,z*dp,px*dp,py*dp);ctx.fillStyle=lt?'rgba(0,0,0,.09)':'rgba(255,255,255,.06)';ctx.fillRect(-1e5,0,2e5,1e5);if(S.Grid)ruler(lt);
 ctx.strokeStyle='#a78bfa';ctx.lineWidth=2/z;ctx.beginPath();ctx.moveTo(-1e5,0);ctx.lineTo(1e5,0);ctx.stroke();drawG();
 if(!F.length){ctx.fillStyle=lt?'#555':'#aaa';ctx.font=`${16/z}px sans-serif`;ctx.textAlign='center';['افتح شيت أو اسحبه هنا','① افتح شيت  ② اختار الفريمات  ③ اضغط تشغيل','اضغط مطولاً على أي زر أو خاصية لشرحها'].forEach((t,i)=>ctx.fillText(t,0,(-70+i*26)/z));ctx.textAlign='start';return}
 const f=F[sel];if(!f)return;if((play||Date.now()-(window.shT||0)<800)&&f.sh)ctx.translate((Math.random()-.5)*f.sh*shA(),(Math.random()-.5)*f.sh*shA());fxDraw(1);drawShadow(f);if(S.Tr&&play)hist.slice(-S.Tr).forEach((q,i,A)=>dF({...q,gl:0,fl:1,tc:S.GlC},.4*(i+1)/A.length));if(S.Onion&&!play)for(let i=1;i<=S.OnN;i++){const al=.34/i;if(F[sel-i])dF({...F[sel-i],gl:0,fl:1,tc:'#ff5d73'},al);if(F[sel+i])dF({...F[sel+i],gl:0,fl:1,tc:'#35d0ba'},al)}
 if(po&&po.w>0&&po.n){const w=po.w,n=po.n,tw=S.Tw=='move'||S.Tw=='both',fd=S.Tw=='fade'||S.Tw=='both',p=tw?lp(f,n,w):null;dF(f,1,p||f);if(fd)dF(n,w,p||n)}else dF(f,1);if(f.hw>0){ctx.strokeStyle='#ff5d73';ctx.lineWidth=1.5/z;ctx.setLineDash([4/z,3/z]);ctx.strokeRect(f.hx,f.hy,f.hw,f.hh);ctx.setLineDash([])}fxDraw(0);drawFoot(f)}
const order=()=>{const o=F.map((f,i)=>f.on?i:-1).filter(i=>i>=0);return S.Mode=='pp'&&o.length>2?o.concat(o.slice(1,-1).reverse()):o},dur=i=>1000*F[i].hold/(S.Fps*S.Spd);
const sync=()=>{$('#pp').innerHTML=ic(play?'pause':'play')},step=d=>{if(!F.length)return;play=false;sync();setSel((sel+d+F.length)%F.length)};
$('#pp').onclick=()=>{play=!play;if(play){const o=order(),k=o.indexOf(sel);tm=0;for(let j=0;j<k;j++)tm+=dur(o[j])}sync()};$('#pv').onclick=()=>step(-1);$('#nx').onclick=()=>step(1);sync();
function tick(t){requestAnimationFrame(tick);const dl=Math.min(100,t-last);last=t;let po=null;const o=order();
 if(play&&o.length){const T=o.reduce((s,i)=>s+dur(i),0);tm+=dl;if(S.Mode=='once'&&tm>=T){tm=T-.01;play=false;sync()}else tm%=T;let k=0,s=0;while(k<o.length-1&&tm>=s+dur(o[k])){s+=dur(o[k]);k++}
  if(t-ht>40){ht=t;hist.push({...F[o[k]]});if(hist.length>12)hist.shift()}const u=(tm-s)/dur(o[k]),bl=S.Tw!='none'?S.Bl/100:0,nk=k+1<o.length?k+1:S.Mode=='once'?-1:0;window.gu=u;if(o[k]!=sel){setSel(o[k]);if(F[o[k]].fe)FXR.push({e:F[o[k]].fe,t})}
  po={w:bl&&nk>=0&&o.length>1&&u>1-bl?ease((u-(1-bl))/bl):0,n:nk>=0?F[o[nk]]:null}}
 if(!play)hist.length=0;draw(po)}
new ResizeObserver(()=>{cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;if(!F.length){px=cv.clientWidth/2;py=cv.clientHeight*.7}}).observe(cv);
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&/^[zy]$/i.test(e.key)){e.preventDefault();(e.key.toLowerCase()=='y'||e.shiftKey)?redo():undo();return}
 if(/INPUT|SELECT/.test(e.target.tagName)&&e.target.type!='range'&&e.target.type!='checkbox')return;const f=F[sel],s=e.shiftKey?10:1;
 if(e.code=='Space'){e.preventDefault();$('#pp').click()}else if(e.key=='['||e.key==']')step(e.key=='['?-1:1);
 else if(f&&e.key.startsWith('Arrow')){e.preventDefault();f.ox+=({ArrowRight:s,ArrowLeft:-s})[e.key]||0;f.oy+=({ArrowDown:s,ArrowUp:-s})[e.key]||0;setSel(sel);dirty()}});
async function save(q){if(!SH.length)return;stash();await tx('readwrite',s=>s.put({th:thumbURL(),SH:SH.map(h=>({name:h.name,data:h.data,ov:h.ov,sm:h.sm,...Object.fromEntries(K.map(k=>[k,h[k]]))})),S:{...S},F,sel,act,AN,ca,G},nm()));if(!q)toast('تم الحفظ ✔');list()}
function dirty(n){if(!n)commit();clearTimeout(dt);dt=setTimeout(()=>save(true),700);info()}
async function list(){const k=await tx('readonly',s=>s.getAllKeys());$('#pl').innerHTML='<option value="">— مشاريع محفوظة —</option>'+k.map(n=>`<option>${n}</option>`).join('')}
$('#pl').onchange=async e=>{const n=e.target.value;if(!n)return;loadProj(n,await tx('readonly',s=>s.get(n)))};async function loadProj(n,r){if(!r.SH){r.SH=[{...r.S,name:n,data:r.data}];r.F.forEach(f=>f.s=0)}
 SH=[];F=[];fitted=0;for(const o of r.SH)await addSheet(o);Object.assign(S,D,r.S);AN=r.AN||[{name:'idle'}];ca=Math.min(r.ca||0,AN.length-1);AN.forEach(a=>{if(a.F)a.F=a.F.map(f=>({...FD,...f}))});F=AN[ca].F||r.F.map(f=>({...FD,...f}));if(AN[ca].S)Object.assign(S,AN[ca].S);anUI();G=r.G||[];renderG();act=Math.min(r.act||0,SH.length-1);$('#nm').value=n;browser();thumbs();setSel(r.sel||0);cur=JSON.stringify(F);U=[];R=[];fitView();toast('تم الفتح')};
$('#bs').onclick=()=>save();$('#bn').onclick=async()=>{await save(true);location.reload()};
const PK2=['sc','ox','oy','sq','rot','pvx','pvy'],lp=(a,b,w)=>Object.fromEntries(PK2.map(k=>[k,a[k]+(b[k]-a[k])*w])),hist=[];let ht=0;
function tint(r,c){r.tc=r.tc||{};if(!r.tc[c]){const k=document.createElement('canvas');k.width=r.cv.width;k.height=r.cv.height;const x=k.getContext('2d');x.drawImage(r.cv,0,0);x.globalCompositeOperation='source-in';x.fillStyle=c;x.fillRect(0,0,k.width,k.height);r.tc[c]=k}return r.tc[c]}
function paint(x,f,al,p,k){p=p||f;const h=SH[f.s],r=fo(f);if(!r)return;x.save();x.globalAlpha=al;x.imageSmoothingEnabled=!S.Px;if(f.fx)x.scale(-1,1);const g=h.ch*S.Gy/100,s=S.Gs*p.sc,q=1+(p.sq||0),X=r.x-h.cw/2+p.ox,Y=r.y-g+p.oy;
 if(p.rot){x.translate(p.pvx||0,p.pvy||0);x.rotate(p.rot*Math.PI/180);x.translate(-(p.pvx||0),-(p.pvy||0))}x.scale(s*q,s/q);const ly=f.ly&&SH[f.ly.s]&&SH[f.ly.s].fr&&SH[f.ly.s].fr[f.ly.c],dl=()=>{if(!ly)return;const h2=SH[f.ly.s];x.drawImage(ly.cv,ly.x-h2.cw/2+p.ox+f.ly.dx,ly.y-h2.ch*S.Gy/100+p.oy+f.ly.dy)};if(ly&&f.ly.u)dl();
 if(S.Ol>0){const t=tint(r,S.OlC),o=S.Ol;for(const[a,b]of[[o,0],[-o,0],[0,o],[0,-o],[o,o],[-o,-o],[o,-o],[-o,o]])x.drawImage(t,X+a,Y+b)}if(f.gl){const t=tint(r,S.GlC);x.save();x.globalCompositeOperation='lighter';x.shadowColor=S.GlC;x.shadowBlur=f.gl*k;for(let i=0;i<3;i++)x.drawImage(t,X,Y);x.restore()}x.drawImage(lit(r),X,Y);
 if(f.fl){x.globalAlpha=al*f.fl;x.drawImage(tint(r,f.tc||'#fff'),X,Y)}if(ly&&!f.ly.u)dl();x.restore()}
function atlas(){const o=F.filter(f=>f.on&&bb(f)),Z=S.Gs,tr=S.TrX&&S.Tr?S.Tr:0;let L=0,Rr=0,T=0,B=0,gm=0;
 const ext=f=>{const s=Z*f.sc,q=1+f.sq,a=s*q,e=s/q,c=Math.cos(f.rot*Math.PI/180),n=Math.sin(f.rot*Math.PI/180);gm=Math.max(gm,f.gl*2+f.sh*Z+S.Ol*2*Z);const ly=f.ly&&SH[f.ly.s]&&SH[f.ly.s].fr&&SH[f.ly.s].fr[f.ly.c];
  [[bb(f),SH[f.s],f.ox,f.oy],...(ly?[[ly.b,SH[f.ly.s],f.ox+f.ly.dx,f.oy+f.ly.dy]]:[])].forEach(([b,h,ox,oy])=>{const g=h.ch*S.Gy/100;[[b.x0,b.y0],[b.x1+1,b.y0],[b.x0,b.y1+1],[b.x1+1,b.y1+1]].forEach(([X,Y])=>{const u=(X-h.cw/2+ox)*a-f.pvx,v=(Y-g+oy)*e-f.pvy,x=f.pvx+u*c-v*n,y=f.pvy+u*n+v*c;L=Math.max(L,-x);Rr=Math.max(Rr,x);T=Math.max(T,-y);B=Math.max(B,y)})})};
 o.forEach((f,i)=>{ext(f);for(let k=1;k<=tr;k++)if(o[i-k])ext(o[i-k])});
 const hf=Math.ceil(Math.max(L,Rr)+gm)+4,W=hf*2,pv=Math.ceil(T+gm)+4,H=pv+Math.ceil(B+gm)+4,c=document.createElement('canvas');c.width=Math.max(1,W*o.length);c.height=H;const x=c.getContext('2d');
 o.forEach((f,i)=>{x.save();x.translate(i*W+hf,pv);for(let k=tr;k>=1;k--)if(o[i-k])paint(x,{...o[i-k],gl:0,fl:1,tc:S.GlC},.4*(1-(k-1)/tr),o[i-k],1);paint(x,f,1,f,1);x.restore()});return{c,o,W,H,hf,pv}}
function pack(name){const{c,o,W,H,hf,pv}=atlas();return{format:'spritelab/3',name,fps:S.Fps,speed:S.Spd,mode:S.Mode,transition:{type:S.Tw,blend:S.Bl/100},frameCount:o.length,cell:[W,H],pivot:[hf,pv],frames:o.map((f,i)=>({x:i*W,y:0,w:W,h:H,hold:f.hold,ms:ms(f),shake:f.sh||0})),atlas:c.toDataURL('image/png')}}
function frames(ns){const{o,W,H,hf,pv}=atlas(),bl=S.Tw=='none'?0:S.Bl/100,tw=S.Tw=='move'||S.Tw=='both',fd=S.Tw=='fade'||S.Tw=='both',cs=[],dl=[];let ix=o.map((_,i)=>i);if(S.Mode=='pp'&&ix.length>2)ix=ix.concat(ix.slice(1,-1).reverse());
 const mk=(f,n,w)=>{const k=document.createElement('canvas');k.width=W;k.height=H;const x=k.getContext('2d'),sk=(f.sh||0)*S.Gs;x.translate(hf+(Math.random()-.5)*sk,pv+(Math.random()-.5)*sk);const p=tw&&n?lp(f,n,w):null;paint(x,f,1,p||f,1);if(fd&&n)paint(x,n,w,p||n,1);cs.push(k)};
 ix.forEach((i,k)=>{const f=o[i],d=ms(f);mk(f);dl.push(d*(1-bl));if(bl&&(k<ix.length-1||S.Mode=='loop')){const n=o[ix[(k+1)%ix.length]];for(let s=1;s<=ns;s++){mk(f,n,ease(s/(ns+1)));dl.push(d*bl/ns)}}});return{cs,dl,W,H}}
const CT=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})(),crc=b=>{let c=-1;for(const x of b)c=CT[(c^x)&255]^(c>>>8);return(c^-1)>>>0};
async function apng(cs,dl,W,H){const bs=await Promise.all(cs.map(c=>new Promise(r=>c.toBlob(r)).then(b=>b.arrayBuffer()))),out=[];let seq=0;
 const chunk=(t,d)=>{const b=new Uint8Array(12+d.length),v=new DataView(b.buffer);v.setUint32(0,d.length);for(let i=0;i<4;i++)b[4+i]=t.charCodeAt(i);b.set(d,8);v.setUint32(8+d.length,crc(b.subarray(4,8+d.length)));out.push(b)};
 out.push(new Uint8Array([137,80,78,71,13,10,26,10]));
 bs.forEach((ab,i)=>{const a=new Uint8Array(ab),v=new DataView(ab),id=[];let p=8;while(p<a.length){const n=v.getUint32(p),t=String.fromCharCode(...a.subarray(p+4,p+8)),d=a.subarray(p+8,p+8+n);if(i==0&&t=='IHDR'){chunk('IHDR',d);const ac=new Uint8Array(8);new DataView(ac.buffer).setUint32(0,cs.length);chunk('acTL',ac)}if(t=='IDAT')id.push(d);p+=12+n}
  const f=new Uint8Array(26),fv=new DataView(f.buffer);fv.setUint32(0,seq++);fv.setUint32(4,W);fv.setUint32(8,H);fv.setUint16(20,Math.max(1,Math.round(dl[i])));fv.setUint16(22,1000);chunk('fcTL',f);
  id.forEach(d=>{if(i==0)chunk('IDAT',d);else{const q=new Uint8Array(4+d.length);new DataView(q.buffer).setUint32(0,seq++);q.set(d,4);chunk('fdAT',q)}})});chunk('IEND',new Uint8Array(0));return new Blob(out,{type:'image/png'})}
$('#bx').onclick=()=>{if(!F.length)return;dn(new Blob([JSON.stringify(pack(nm()))],{type:'application/json'}),nm()+'.anim.json');toast('تم التصدير: '+nm()+'.anim.json')};
$('#bp').onclick=()=>{if(F.length)atlas().c.toBlob(b=>dn(b,nm()+'.png'))};
$('#bg').onclick=()=>{if(!F.length)return;toast('جاري إنشاء GIF…');setTimeout(()=>{const{cs,dl,W,H}=frames(3);dn(new Blob([gifBytes(cs,dl,W,H)],{type:'image/gif'}),nm()+'.gif');toast('تم تصدير GIF')},30)};
$('#ba').onclick=()=>{if(!F.length)return;toast('جاري إنشاء APNG…');setTimeout(async()=>{const{cs,dl,W,H}=frames(6);dn(await apng(cs,dl,W,H),nm()+'.apng.png');toast('تم تصدير APNG (شفافية كاملة)')},30)};
const PK=['Fps','Spd','Mode','Tw','Bl','Tr'];let AN=[{name:'idle'}],ca=0;
const stash=()=>{AN[ca]={...AN[ca],F,sel,S:Object.fromEntries(PK.map(k=>[k,S[k]]))}};
function anUI(){$('#an').innerHTML=AN.map((a,i)=>`<option value="${i}">${i+1}· ${a.name.replace(/</g,'')}</option>`).join('');$('#an').value=ca;$('#ant').innerHTML='<option value="">— لا شيء —</option>'+AN.map(a=>`<option>${a.name.replace(/</g,'')}</option>`).join('');$('#ant').value=AN[ca].next||'';$('#nt').value=AN[ca].notes||''}
function loadAnim(i){ca=i;const a=AN[i];F=a.F||[];sel=Math.min(a.sel||0,Math.max(0,F.length-1));if(a.S)Object.assign(S,a.S);cur=JSON.stringify(F);U=[];R=[];tm=0;anUI();thumbs();dirty()}
const useAnim=i=>{stash();loadAnim(i)};$('#an').onchange=e=>useAnim(+e.target.value);
$('#an1').onclick=()=>{const n=prompt('اسم الأنيميشن الجديد','anim'+(AN.length+1));if(!n)return;stash();AN.push({name:n,F:[],sel:0});loadAnim(AN.length-1)};
$('#an2').onclick=()=>{const n=prompt('اسم النسخة',AN[ca].name+'_copy');if(!n)return;stash();AN.push({name:n,F:JSON.parse(JSON.stringify(F)),sel,S:{...AN[ca].S}});loadAnim(AN.length-1)};
$('#an3').onclick=()=>{const n=prompt('اسم جديد',AN[ca].name);if(n){AN[ca].name=n;anUI();dirty()}};
$('#an4').onclick=()=>{if(AN.length<2||!confirm('حذف الأنيميشن "'+AN[ca].name+'"؟'))return;AN.splice(ca,1);loadAnim(Math.min(ca,AN.length-1))};
$('#bxa').onclick=()=>{stash();const F0=F,S0={...S},out=AN.filter(a=>a.F&&a.F.length).map(a=>{F=a.F.map(f=>({...FD,...f}));Object.assign(S,a.S);return pack(a.name)});F=F0;Object.assign(S,S0);dn(new Blob([JSON.stringify({format:'spritelab/pack',name:nm(),anims:out})],{type:'application/json'}),nm()+'.pack.json');toast('تم تصدير '+out.length+' أنيميشن')};
$('#u5').onclick=()=>{if(F[sel]){Object.assign(F[sel],{hold:3,sh:12,fl:.6,sq:.15,gl:14});thumbs();dirty();toast('💥 تأثير صدمة')}};
$('#u6').onclick=()=>{F.forEach(f=>{const b=cbb(f),h=SH[f.s];if(b)f.ox=Math.round(h.cw/2-(b.x0+b.x1)/2)});setSel(sel);dirty();toast('تم التوسيط الأفقي')};
let mp=0;$('#u7').onclick=()=>{mp=!mp;$('#u7').classList.toggle('on',mp);toast(mp?'دبل-كليك على الجزء اللي عاوز تنقله':'اتقفل وضع النقل')};
cv.ondblclick=e=>{if(!mp)return;const f=F[sel],r=f&&fo(f),h=f&&SH[f.s];if(!r||!h.L)return;const R0=cv.getBoundingClientRect(),wx=(e.clientX-R0.left-px)/z,wy=(e.clientY-R0.top-py)/z,s=S.Gs*f.sc,g=h.ch*S.Gy/100,
 sx=Math.floor(r.cx+r.x+wx/s-(r.x-h.cw/2+f.ox)),sy=Math.floor(r.cy+r.y+wy/s-(r.y-g+f.oy)),B=h.SB,bw=h.bw;if(sx<0||sy<0||sx>=h.img.width||sy>=h.img.height)return;
 const l=h.L[(sy/B|0)*bw+(sx/B|0)];if(l<0)return toast('مفيش جزء هنا');const t=parseInt(prompt('انقل الجزء ده لفريم/خلية رقم (1 - '+(h.N||h.Cols*h.Rows)+')'));if(t>=1&&t<=(h.N||h.Cols*h.Rows)){h.ov[l]=t-1;rekey(h);dirty();toast('اتنقل الجزء للخلية '+t)}};
addEventListener('pagehide',()=>save(true));document.addEventListener('visibilitychange',()=>document.hidden&&save(true));
anUI();list();info();requestAnimationFrame(tick);if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');

const pops=[['mf','pf'],['mx','px']];const closeP=()=>pops.forEach(([,p])=>$('#'+p).classList.remove('on'));
pops.forEach(([b,p])=>$('#'+b).addEventListener('click',e=>{e.stopPropagation();const o=$('#'+p).classList.contains('on');closeP();if(!o)$('#'+p).classList.add('on')}));
addEventListener('click',e=>{if(!e.target.closest('.pop select'))closeP()});$('#pl').addEventListener('click',e=>e.stopPropagation());
const sk=$('#sk'),skT=()=>sk.hidden=!sk.hidden;$('#bk').onclick=skT;$('#skc').onclick=skT;sk.onclick=e=>{if(e.target==sk)skT()};
addEventListener('keydown',e=>{const t=e.target.tagName,ed=/INPUT|SELECT|TEXTAREA/.test(t)&&e.target.type!='range'&&e.target.type!='checkbox',k=e.key,ck=e.ctrlKey||e.metaKey;if(ck&&k=='s'){e.preventDefault();$('#bs').click();return}if(ck&&k=='e'){e.preventDefault();$('#bx').click();return}if(ed)return;
 if(ck&&k=='d'){e.preventDefault();dup(1);return}if(ck)return;if(k=='Escape'){closeP();sk.hidden=true;if(mob())asd.classList.remove('open')}
 else if(k=='?')skT();else if(k=='Delete'||k=='Backspace')$('#b4').click();else if(k==','||k=='.')step(k==','?-1:1);else if(k=='Home'||k=='End'){play=false;sync();setSel(k=='Home'?0:F.length-1)}
 else if(k=='h'||k=='H'){const f=F[sel];if(f){f.hold=Math.max(.25,Math.min(30,f.hold+(k=='H'?-.25:.25)));thumbs();dirty()}}
 else if(k=='f'||k=='F')$('#ft').click();else if(k=='1')$('#z1').click();else if(k=='+'||k=='=')$('#zi').click();else if(k=='-')$('#zo').click();
 else if(k=='g'||k=='G'){S.Grid=!S.Grid;refresh();dirty()}else if(k=='o'||k=='O'){S.Onion=!S.Onion;refresh();dirty()}else if(k=='b'||k=='B'){const o=['dark','light','chk','cus'];S.Bg=o[(o.indexOf(S.Bg)+1)%4];refresh();dirty();toast('الخلفية: '+S.Bg)}
 else if('qwer'.includes(k.toLowerCase())&&k.length==1)goTab('qwer'.indexOf(k.toLowerCase()))});
document.querySelectorAll('.pop button').forEach(b=>b.addEventListener('click',()=>{if(b.id!='bk')closeP()}));

let G=[],fdOn=true;const GC=['#ff5d73','#35d0ba','#ffd166','#4cc9f0'],ptrs=new Set();let dr=null;
function drawG(){G.forEach(g=>{ctx.save();ctx.strokeStyle=g.c;ctx.lineWidth=1.5/z;ctx.setLineDash([8/z,5/z]);ctx.beginPath();ctx.moveTo(-1e5,g.y);ctx.lineTo(1e5,g.y);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=g.c;ctx.font=`${13/z}px sans-serif`;ctx.textAlign='start';ctx.fillText((g.lock?'🔒 ':'↕ ')+Math.round(-g.y/S.Gs)+'px',(8-px)/z,g.y-4/z);ctx.restore()});if(MP.length){ctx.save();ctx.strokeStyle=ctx.fillStyle='#fff';ctx.lineWidth=1.5/z;MP.forEach(p=>{ctx.beginPath();ctx.arc(p[0],p[1],4/z,0,7);ctx.fill()});if(MP.length>1){ctx.beginPath();ctx.moveTo(...MP[0]);ctx.lineTo(...MP[1]);ctx.stroke();const dx=MP[1][0]-MP[0][0],dy=MP[1][1]-MP[0][1];ctx.font=`${13/z}px sans-serif`;ctx.fillText(Math.round(Math.hypot(dx,dy)/S.Gs)+'px (dx '+Math.round(dx/S.Gs)+' · dy '+Math.round(-dy/S.Gs)+')',(MP[0][0]+MP[1][0])/2+6/z,(MP[0][1]+MP[1][1])/2)}ctx.restore()}}
vp.insertAdjacentHTML('beforeend','<h4>خطوط القياس</h4><button id="ga" data-i="plus"><span>إضافة خط ارتفاع</span></button><div id="gl"></div><p class="h">اسحب الخط في الكانفاس لأي ارتفاع · دبل-كليك عليه = قفل/فتح · الرقم = الارتفاع فوق الأرض بالبكسل</p>');$('#ga').insertAdjacentHTML('afterbegin',ic('plus'));
function renderG(){const l=$('#gl');if(!l)return;l.innerHTML='';G.forEach((g,i)=>{const d=document.createElement('div');d.className='gr';d.innerHTML=`<input type="color" value="${g.c}"><input type="number" value="${Math.round(-g.y/S.Gs)}" step="1"><button class="lk">${ic(g.lock?'lock':'unlock',16)}</button><button class="dl">${ic('trash',16)}</button>`;const[c,n,lk,dl]=d.children;c.oninput=()=>{g.c=c.value;dirty()};n.onchange=()=>{g.y=-(+n.value||0)*S.Gs;dirty()};lk.onclick=()=>{g.lock=!g.lock;renderG();dirty()};dl.onclick=()=>{G.splice(i,1);renderG();dirty()};l.append(d)})}
$('#ga').onclick=()=>{G.push({y:-150*S.Gs,c:GC[G.length%4],lock:false});renderG();dirty();toast('اسحب الخط لأي ارتفاع')};renderG();
const W2=e=>{const R0=cv.getBoundingClientRect();return[(e.clientX-R0.left-px)/z,(e.clientY-R0.top-py)/z]};
cv.addEventListener('pointerdown',e=>{ptrs.add(e.pointerId);if(ptrs.size>1){dr=null;return}if(eyed){pick(e);e.stopImmediatePropagation();return}if(footMode){setFoot(e);e.stopImmediatePropagation();return}if(fxMode){const f=F[sel];if(f&&f.fe){const[wx,wy]=W2(e);f.fe.x=Math.round(wx);f.fe.y=Math.round(wy);dirty()}fxMode=false;cv.style.cursor='';toast('اتحدد مكان الإفكت');e.stopImmediatePropagation();return}if(meas){MP=MP.length>1?[]:MP;MP.push(W2(e));e.stopImmediatePropagation();return}const[wx,wy]=W2(e),gi=G.findIndex(g=>!g.lock&&Math.abs(g.y-wy)*z<14);
 if(gi>=0){dr={t:'g',g:G[gi]};e.stopImmediatePropagation();cv.setPointerCapture(e.pointerId);return}
 const f=F[sel],b=f&&fdOn&&bb(f);if(b){const h=SH[f.s],s=S.Gs*f.sc,g=h.ch*S.Gy/100,x0=(b.x0-h.cw/2+f.ox)*s,x1=(b.x1+1-h.cw/2+f.ox)*s,y0=(b.y0-g+f.oy)*s,y1=(b.y1+1-g+f.oy)*s;
  if(wx>=x0-6&&wx<=x1+6&&wy>=y0-6&&wy<=y1+6){play=false;sync();dr={t:'f',x:e.clientX,y:e.clientY,ox:f.ox,oy:f.oy};e.stopImmediatePropagation();cv.setPointerCapture(e.pointerId)}}},true);
cv.addEventListener('pointermove',e=>{if(!dr)return;e.stopImmediatePropagation();if(dr.t=='g')dr.g.y=W2(e)[1];else{const f=F[sel],s=z*S.Gs*f.sc;f.ox=Math.round(dr.ox+(e.clientX-dr.x)/s);f.oy=Math.round(dr.oy+(e.clientY-dr.y)/s);refresh()}},true);
const pe=e=>{ptrs.delete(e.pointerId);if(dr){dr.t=='g'?renderG():0;dirty();dr=null}};addEventListener('pointerup',pe);addEventListener('pointercancel',pe);
cv.addEventListener('dblclick',e=>{const wy=W2(e)[1],g=G.find(g=>Math.abs(g.y-wy)*z<14);if(g){g.lock=!g.lock;renderG();dirty();toast(g.lock?'🔒 اتقفل':'اتفتح')}});
$('#fd').onclick=()=>{fdOn=!fdOn;$('#fd').classList.toggle('on',fdOn);toast(fdOn?'سحب الفريم شغال':'سحب الفريم متوقف')};
const pm=document.createElement('div');pm.className='ov';pm.hidden=true;document.body.append(pm);pm.onclick=e=>{if(e.target==pm)pm.hidden=true};
async function pmOpen(){const k=await tx('readonly',s=>s.getAllKeys()),v=await tx('readonly',s=>s.getAll());pm.innerHTML='<div><b>المشاريع المحفوظة</b><div id="pml"></div><button id="pmc">إغلاق</button></div>';const l=pm.querySelector('#pml');if(!k.length)l.textContent='مفيش مشاريع محفوظة';
 k.forEach((n,i)=>{const r=document.createElement('div');r.className='pmr';r.innerHTML=`${v[i]&&v[i].th?'<img src="'+v[i].th+'">':''}<b></b><button class="o">فتح</button><button class="d">${ic('trash',16)}</button>`;r.querySelector('b').textContent=n;r.querySelector('.o').onclick=()=>{pm.hidden=true;$('#pl').value=n;$('#pl').onchange({target:$('#pl')})};r.querySelector('.d').onclick=async()=>{if(confirm('حذف المشروع "'+n+'" نهائياً؟')){await tx('readwrite',s=>s.delete(n));r.remove();list();toast('اتحذف')}};l.append(r)});pm.hidden=false;pm.querySelector('#pmc').onclick=()=>pm.hidden=true}
$('#bm').onclick=pmOpen;
$('#bz').onclick=()=>{if(!F.length)return;const{c,o,W,H,hf,pv}=atlas(),n=nm();c.toBlob(b=>dn(b,n+'.png'));setTimeout(()=>dn(new Blob([JSON.stringify({format:'atlas/1',image:n+'.png',size:[c.width,c.height],cell:[W,H],pivot:[hf,pv],fps:S.Fps,speed:S.Spd,mode:S.Mode,transition:{type:S.Tw,blend:S.Bl/100},frames:o.map((f,i)=>({index:i,rect:[i*W,0,W,H],ms:ms(f),shake:f.sh||0}))},null,1)],{type:'application/json'}),n+'.atlas.json'),400);toast('تم تصدير أطلس اللعبة (ملفين)')};

IC.drop='M3 21l1-5 11-11 4 4L8 20zM14 6l4 4M17 3l4 4-3 3-4-4z';let eyed=false;
const GD=`class_name AtlasPlayer
extends AnimatedSprite2D
## ATLAS -> Godot 4. حط الملفات (zip) في res://anim/ ثم:
## 1) أضف الـ Node ده (AtlasPlayer)  2) json_path = res://anim/NAME.atlas.json
## 3) start_animation = اسم الأنيميشن  — نقطة (0,0) للعقدة = القدم/الأرض.
signal shake_requested(amount: float, duration: float, fade: bool)
signal effect_requested(info: Dictionary)
@export var auto_effects := true
var _dir := ""
signal root_motion(delta: Vector2)
@export_file("*.json") var json_path: String = ""
@export var start_animation: String = ""
var _meta := {}

func _ready() -> void:
	animation_changed.connect(_apply_pivot)
	frame_changed.connect(_on_frame)
	animation_finished.connect(_on_done)
	if json_path != "":
		load_atlas(json_path)
	if start_animation != "":
		play(start_animation)

func load_atlas(path: String) -> void:
	var data: Dictionary = JSON.parse_string(FileAccess.get_file_as_string(path))
	var dir := path.get_base_dir()
	_dir = dir
	var sf := SpriteFrames.new()
	if sf.has_animation("default"):
		sf.remove_animation("default")
	for a in data["anims"]:
		var tex: Texture2D = load(dir.path_join(a["image"]))
		var n: String = a["name"]
		_meta[n] = a
		sf.add_animation(n)
		sf.set_animation_speed(n, 1.0)
		sf.set_animation_loop(n, a["mode"] != "once")
		var ntex: Texture2D = null
		if a.get("normal", "") != "":
			ntex = load(dir.path_join(a["normal"]))
		for f in a["frames"]:
			var at := AtlasTexture.new()
			at.atlas = tex
			at.region = Rect2(f["rect"][0], f["rect"][1], f["rect"][2], f["rect"][3])
			var ft: Texture2D = at
			if ntex:
				var an := AtlasTexture.new()
				an.atlas = ntex
				an.region = at.region
				var ct := CanvasTexture.new()
				ct.diffuse_texture = at
				ct.normal_texture = an
				ft = ct
			sf.add_frame(n, ft, f["ms"] / 1000.0)
	sprite_frames = sf
	centered = false
	_apply_pivot()

func _apply_pivot() -> void:
	if _meta.has(animation):
		var p = _meta[animation]["pivot"]
		offset = -Vector2(p[0], p[1])

func _on_frame() -> void:
	if _meta.has(animation):
		var f = _meta[animation]["frames"][frame]
		if f["shake"] > 0:
			shake_requested.emit(f["shake"], f["ms"] / 1000.0, _meta[animation].get("shake_curve", "const") == "fade")
		if f.get("fx") != null:
			effect_requested.emit(f["fx"])
			if auto_effects:
				_spawn_fx(f["fx"])
		if frame > 0:
			var r = f.get("root", [0, 0])
			var pr = _meta[animation]["frames"][frame - 1].get("root", [0, 0])
			root_motion.emit(Vector2(r[0] - pr[0], r[1] - pr[1]))

func _on_done() -> void:
	if _meta.has(animation) and _meta[animation].get("next", "") != "":
		play(_meta[animation]["next"])

func _spawn_fx(info: Dictionary) -> void:
	var ef = _meta[animation]["effects"][int(info["id"])]
	var tex: Texture2D = load(_dir.path_join(ef["image"]))
	var sf := SpriteFrames.new()
	if sf.has_animation("default"):
		sf.remove_animation("default")
	sf.add_animation("fx")
	sf.set_animation_loop("fx", false)
	sf.set_animation_speed("fx", float(ef["fps"]))
	var w: float = ef["cell"][0]
	for i in range(int(ef["frames"])):
		var at := AtlasTexture.new()
		at.atlas = tex
		at.region = Rect2(i * w, 0, w, ef["cell"][1])
		sf.add_frame("fx", at)
	var s := AnimatedSprite2D.new()
	s.sprite_frames = sf
	s.centered = false
	s.offset = -Vector2(ef["pivot"][0], ef["pivot"][1])
	var sx: float = -1.0 if flip_h else 1.0
	s.position = Vector2(info["x"] * sx, info["y"])
	s.z_index = 1 if info["above"] else -1
	s.flip_h = flip_h
	add_child(s)
	s.play("fx")
	s.animation_finished.connect(s.queue_free)

func hitbox() -> Rect2:
	var h = _meta[animation]["frames"][frame].get("hit", [0, 0, 0, 0])
	return Rect2(h[0], h[1], h[2], h[3])
`;
function zip(files){const en=new TextEncoder(),out=[],cd=[];let off=0;
 files.forEach(f=>{const nb=en.encode(f.n),c=crc(f.d),h=new Uint8Array(30+nb.length),v=new DataView(h.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x0800,true);v.setUint16(12,0x21,true);v.setUint32(14,c,true);v.setUint32(18,f.d.length,true);v.setUint32(22,f.d.length,true);v.setUint16(26,nb.length,true);h.set(nb,30);out.push(h,f.d);
  const e=new Uint8Array(46+nb.length),w=new DataView(e.buffer);w.setUint32(0,0x02014b50,true);w.setUint16(4,20,true);w.setUint16(6,20,true);w.setUint16(8,0x0800,true);w.setUint16(14,0x21,true);w.setUint32(16,c,true);w.setUint32(20,f.d.length,true);w.setUint32(24,f.d.length,true);w.setUint16(28,nb.length,true);w.setUint32(42,off,true);e.set(nb,46);cd.push(e);off+=h.length+f.d.length});
 const cs=cd.reduce((s,e)=>s+e.length,0),end=new Uint8Array(22),w=new DataView(end.buffer);w.setUint32(0,0x06054b50,true);w.setUint16(8,files.length,true);w.setUint16(10,files.length,true);w.setUint32(12,cs,true);w.setUint32(16,off,true);return new Blob([...out,...cd,end],{type:'application/zip'})}
$('#bz').onclick=async()=>{stash();const n=nm(),an=AN.filter(a=>a.F&&a.F.length);if(!an.length){toast('مفيش فريمات للتصدير');return}toast('جاري تجهيز ملف Godot…');const F0=F,S0={...S},files=[],out=[];
 try{for(const a of an){F=a.F.map(f=>({...FD,...f}));Object.assign(S,a.S);if(S.NM)S.Li=0;const{c,o,W,H,hf,pv}=atlas();if(!o.length)continue;let ix=o.map((_,i)=>i);if(S.Mode=='pp'&&ix.length>2)ix=ix.concat(ix.slice(1,-1).reverse());
  const img=n+'_'+a.name.replace(/[^\w\u0600-\u06FF-]+/g,'_')+'.png',b=await new Promise(r=>c.toBlob(r));files.push({n:img,d:new Uint8Array(await b.arrayBuffer())});
  const bs=img.slice(0,-4),fxs=[],fxMeta=[];let nname='';const fxk=e=>{const key=(e.k||'s'+e.s)+':'+e.c+':'+e.n;let i=fxs.findIndex(q=>q.key==key);if(i<0){i=fxs.length;fxs.push({key,e})}return i},fxF=ix.map(i=>{const e=o[i].fe;return e?{id:fxk(e),x:e.x,y:e.y,above:!e.u}:null});
  for(let q=0;q<fxs.length;q++){const e=fxs[q].e,A=fxAtlas(e),fb=await new Promise(r=>A.c.toBlob(r)),nm2=bs+'_fx'+q+'.png';files.push({n:nm2,d:new Uint8Array(await fb.arrayBuffer())});fxMeta.push({id:q,image:nm2,cell:[A.W,A.H],pivot:[A.hf,A.pv],frames:e.n,fps:e.fps})}
  if(S.NM){const nc=normalCanvas(c),nb=await new Promise(r=>nc.toBlob(r));nname=bs+'_n.png';files.push({n:nname,d:new Uint8Array(await nb.arrayBuffer())})}
  out.push({name:a.name,next:a.next||'',notes:a.notes||'',normal:nname,effects:fxMeta,shake_curve:S.ShC,image:img,size:[c.width,c.height],cell:[W,H],pivot:[hf,pv],fps:S.Fps,speed:S.Spd,mode:S.Mode,transition:{type:S.Tw,blend:S.Bl/100},frames:ix.map((i,qi)=>({fx:fxF[qi],rect:[i*W,0,W,H],ms:ms(o[i]),shake:o[i].sh||0,hit:[o[i].hx||0,o[i].hy||0,o[i].hw||0,o[i].hh||0],root:rootOf(o[i])}))})}}finally{F=F0;Object.assign(S,S0)}
 const te=new TextEncoder();files.unshift({n:n+'.atlas.json',d:te.encode(JSON.stringify({format:'atlas/2',name:n,anims:out},null,1))});files.push({n:'atlas_player.gd',d:te.encode(GD)});
 {let id=0;const ex=[],sub=[],an=[];out.forEach((a,ai)=>{ex.push(`[ext_resource type="Texture2D" path="res://anim/${a.image}" id="${ai+1}"]`);const fr=a.frames.map(f=>{id++;sub.push(`[sub_resource type="AtlasTexture" id="AT_${id}"]\natlas = ExtResource("${ai+1}")\nregion = Rect2(${f.rect.join(', ')})\n`);return `{\n"duration": ${(f.ms/1000).toFixed(4)},\n"texture": SubResource("AT_${id}")\n}`}).join(', ');an.push(`{\n"frames": [${fr}],\n"loop": ${a.mode!='once'},\n"name": &"${a.name.replace(/"/g,'')}",\n"speed": 1.0\n}`)});
 files.push({n:n+'.tres',d:te.encode(`[gd_resource type="SpriteFrames" load_steps=${ex.length+sub.length+1} format=3]\n\n${ex.join('\n')}\n\n${sub.join('\n')}\n[resource]\nanimations = [${an.join(', ')}]\n`)});
 files.push({n:'README.txt',d:te.encode('ATLAS -> Godot 4\n1) ضع كل الملفات في res://anim/\n2) الطريقة السريعة: AnimatedSprite2D + sprite_frames = '+n+'.tres ، centered=false ، offset = -pivot:\n'+out.map(a=>'   '+a.name+': offset = Vector2('+(-a.pivot[0])+', '+(-a.pivot[1])+')').join('\n')+'\n3) أو استخدم atlas_player.gd (AtlasPlayer) مع json_path — بيظبط الـoffset لوحده ويدعم next وshake_requested وhitbox()\n')})}
dn(zip(files),n+'.zip');toast('تم تصدير '+n+'.zip ('+out.length+' أنيميشن)')};
function pick(e){eyed=false;cv.style.cursor='';const f=F[sel],r=f&&fo(f),h=f&&SH[f.s];if(!r)return;const[wx,wy]=W2(e),s=S.Gs*f.sc,g=h.ch*S.Gy/100,sx=Math.floor(r.cx+r.x+wx/s-(r.x-h.cw/2+f.ox)),sy=Math.floor(r.cy+r.y+wy/s-(r.y-g+f.oy));
 if(sx<0||sy<0||sx>=h.img.width||sy>=h.img.height)return toast('برة الصورة');const d=h.kc.getContext('2d').getImageData(sx,sy,1,1).data;if(d[3]<30)return toast('مفيش بكسل هنا — المس الشخصية');S.GlC='#'+[d[0],d[1],d[2]].map(v=>v.toString(16).padStart(2,'0')).join('');refresh();dirty();toast('اتسحب اللون '+S.GlC)}
row(fr,'لون التوهج',gS('GlC',{t:'c'}));{const g=[...fr.children].find(e=>e.firstChild.textContent.includes('توهج (Glow)'));g.after(fr.lastChild)}
function addEd(par,t){const l=[...par.children].find(e=>e.firstChild&&e.firstChild.textContent.includes(t));if(!l)return;const b=document.createElement('button');b.innerHTML=ic('drop',16)+'<span>قطّارة</span>';b.onclick=()=>{eyed=true;cv.style.cursor='crosshair';toast('المس نقطة على الشخصية لسحب اللون');if(innerWidth<=760)asd.classList.remove('open')};l.querySelector('.rc').append(b)}
addEd(fr,'لون التوهج');addEd(vp,'لون التوهج والذيل');
addEventListener('error',e=>toast('خطأ: '+(e.message||'غير معروف')));addEventListener('unhandledrejection',e=>toast('خطأ: '+((e.reason&&e.reason.message)||e.reason)));

let meas=false,MP=[],bgI=null;const STY=['sc','sq','rot','pvx','pvy','gl','fl','sh','hold','fx'];let sty=null;
function drawShadow(f){if(!S.Sh)return;const h=SH[f.s],b=cbb(f);if(!b)return;const s=S.Gs*f.sc,g=h.ch*S.Gy/100,w=(b.x1-b.x0+1)*s*S.Shw/100,cx=(f.fx?-1:1)*((b.x0+b.x1)/2-h.cw/2+f.ox)*s,air=Math.max(0,-((b.y1+1-g+f.oy)*s))/S.Gs,k=Math.max(.3,1-air/300);ctx.save();ctx.fillStyle=`rgba(0,0,0,${S.Sh/100*k})`;ctx.beginPath();ctx.ellipse(cx,0,w*k/2,Math.max(2,w*.12*k),0,0,7);ctx.fill();ctx.restore()}
const rec=()=>{stash();return{SH:SH.map(h=>({name:h.name,data:h.data,ov:h.ov,sm:h.sm,...Object.fromEntries(K.map(k=>[k,h[k]]))})),S:{...S},F,sel,act,AN,ca,G}},thumbURL=()=>{try{const f=F[0],h=f&&SH[f.s];return h?th(h,f.c,64).toDataURL():''}catch(e){return ''}};
$('#bb').onclick=()=>{if(!SH.length)return toast('مفيش مشروع');const r=rec();r.th=thumbURL();dn(new Blob([JSON.stringify(r)],{type:'application/json'}),nm()+'.atlas-project.json');toast('تم حفظ نسخة احتياطية')};
const fj=document.createElement('input');fj.type='file';fj.accept='.json,application/json';fj.hidden=true;document.body.append(fj);$('#bi').onclick=()=>fj.click();
fj.onchange=async()=>{const f=fj.files[0];fj.value='';if(!f)return;try{const r=JSON.parse(await f.text());if(!r.SH)throw Error('ملف غير صالح');await loadProj(f.name.replace(/\.atlas-project\.json$|\.json$/,''),r)}catch(e){toast('فشل الاستيراد: '+e.message)}};
$('#ant').onchange=e=>{AN[ca].next=e.target.value;dirty()};$('#nt').oninput=e=>{AN[ca].notes=e.target.value;dirty()};anUI();
const ap=(f,ks)=>ks.forEach(k=>f[k]=sty[k]);
$('#u8').onclick=()=>{const f=F[sel];if(!f)return;sty=Object.fromEntries(STY.map(k=>[k,f[k]]));toast('اتنسخت التأثيرات')};
$('#u9').onclick=()=>{if(!sty||!F[sel])return toast('انسخ التأثيرات الأول');ap(F[sel],STY);thumbs();dirty();toast('اتلصقت على الفريم')};
$('#u10').onclick=()=>{if(!sty)return toast('انسخ التأثيرات الأول');F.forEach(f=>ap(f,STY));thumbs();dirty();toast('اتلصقت على الكل')};
$('#u11').onclick=()=>{F.forEach(f=>f.fx=!f.fx);setSel(sel);dirty();toast('اتقلبت كل الفريمات ↔')};
$('#ms').onclick=()=>{meas=!meas;MP=[];$('#ms').classList.toggle('on',meas);cv.style.cursor=meas?'crosshair':'';toast(meas?'المس نقطتين لقياس المسافة':'اتقفل القياس')};
const bf=document.createElement('input');bf.type='file';bf.accept='image/*';bf.hidden=true;document.body.append(bf);
vp.insertAdjacentHTML('beforeend','<h4>صورة خلفية للمعاينة</h4><div class="g2"><button id="bgb"><span>رفع صورة مرحلة</span></button><button id="bgx"><span>إزالة</span></button></div>');
$('#bgb').onclick=()=>bf.click();$('#bgx').onclick=()=>{bgI=null};bf.onchange=()=>{const f=bf.files[0];bf.value='';if(!f)return;const i=new Image();i.onload=()=>{bgI=i;toast('اتضافت الخلفية (معاينة فقط)')};i.src=URL.createObjectURL(f)};
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.ctrlKey||e.metaKey)return;const k=e.key.toLowerCase();if(k=='x'&&F[sel]){F[sel].fx=!F[sel].fx;setSel(sel);dirty()}else if(k=='m')$('#ms').click()});

function autoGroup(h,bx,zs,B){const n=bx.length,mx=Math.max(...zs),big=[];for(let i=0;i<n;i++)if(zs[i]>=mx*.2&&zs[i]>h.Dust)big.push(i);
 const W=i=>(bx[i][2]-bx[i][0]+1)*B,Ht=i=>(bx[i][3]-bx[i][1]+1)*B,cx=i=>(bx[i][0]+bx[i][2]+1)*B/2,cy=i=>(bx[i][1]+bx[i][3]+1)*B/2,mh=big.map(Ht).sort((a,b)=>a-b)[big.length>>1]||1,rows=[];
 [...big].sort((a,b)=>cy(a)-cy(b)).forEach(i=>{const r=rows.find(r=>Math.abs(r.y-cy(i))<mh*.6);if(r){r.l.push(i);r.y=(r.y*(r.l.length-1)+cy(i))/r.l.length}else rows.push({y:cy(i),l:[i]})});
 const order=[];rows.sort((a,b)=>a.y-b.y).forEach(r=>r.l.sort((a,b)=>cx(a)-cx(b)).forEach(i=>order.push(i)));const idx=new Map(order.map((i,k)=>[i,k])),own=[];
 for(let i=0;i<n;i++){if(idx.has(i))own[i]=idx.get(i);else if(zs[i]<=h.Dust)own[i]=-1;else{let best=-1,bd=1e18;order.forEach((j,k)=>{const dx=Math.max(0,bx[j][0]-bx[i][2],bx[i][0]-bx[j][2]),dy=Math.max(0,bx[j][1]-bx[i][3],bx[i][1]-bx[j][3]),d=dx*dx+dy*dy;if(d<bd){bd=d;best=k}});own[i]=best}if(h.ov&&h.ov[i]!=null)own[i]=h.ov[i]}
 const cw=Math.ceil(Math.max(1,...big.map(W))*1.25),ch=Math.ceil(Math.max(1,...big.map(Ht))*1.2);return{own,NF:order.length,cw,ch,O:order.map(i=>[Math.round(cx(i)-cw/2),Math.round((bx[i][3]+1)*B-ch*.9)])}}
function norm(h){const st=h.fr.map(f=>{if(!f)return null;const x=f.cv.getContext('2d'),im=x.getImageData(0,0,f.cv.width,f.cv.height),d=im.data;let r=0,g=0,b=0,n=0;for(let i=0;i<d.length;i+=4)if(d[i+3]>200){r+=d[i];g+=d[i+1];b+=d[i+2];n++}return n?{im,x,m:[r/n,g/n,b/n]}:null}).filter(Boolean);if(st.length<2)return;
 const ref=[0,1,2].map(c=>st.reduce((s,q)=>s+q.m[c],0)/st.length);st.forEach(q=>{const k=q.m.map((v,c)=>Math.min(1.12,Math.max(.88,ref[c]/(v||1)))),d=q.im.data;for(let i=0;i<d.length;i+=4){d[i]=Math.min(255,d[i]*k[0]);d[i+1]=Math.min(255,d[i+1]*k[1]);d[i+2]=Math.min(255,d[i+2]*k[2])}q.x.putImageData(q.im,0,0)})}
$('#u12').onclick=()=>{let n=0;F.forEach(f=>{const r=fo(f),h=SH[f.s];if(!r||!r.cb)return;const c=r.cb,y0=Math.round(c.y0+(c.y1-c.y0)*.35),y1=Math.round(c.y0+(c.y1-c.y0)*.65),x0=Math.max(0,c.x0-r.x),w=Math.min(r.cv.width-x0,c.x1-c.x0+1),yy=Math.max(0,y0-r.y),hh=Math.max(1,Math.min(r.cv.height-yy,y1-y0));if(w<1)return;
 const d=r.cv.getContext('2d').getImageData(x0,yy,w,hh).data;let sx=0,sa=0;for(let i=0;i<d.length;i+=4){const a=d[i+3];if(a>40){sx+=((i/4)%w)*a;sa+=a}}if(!sa)return;f.ox=Math.round(h.cw/2-(r.x+x0+sx/sa));f.oy=Math.round(h.ch*S.Gy/100-c.y1-1);n++});setSel(sel);dirty();toast('تم تثبيت جسم '+n+' فريم (مركز الجذع + القدم)')};
if(navigator.storage&&navigator.storage.persist){navigator.storage.persist();navigator.storage.estimate().then(e=>{if(e.quota&&e.usage/e.quota>.8)toast('⚠ مساحة التخزين قربت تخلص — اعمل نسخة احتياطية')})}

let footMode=false;
function drawFoot(f){if(!f.ft)return;const h=SH[f.s],s=S.Gs*f.sc,g=h.ch*S.Gy/100,x=(f.fx?-1:1)*(f.ft[0]-h.cw/2+f.ox)*s,y=(f.ft[1]-g+f.oy)*s;ctx.fillStyle='#4cc9f0';ctx.beginPath();ctx.arc(x,y,5/z,0,7);ctx.fill()}
function setFoot(e){footMode=false;cv.style.cursor='';const f=F[sel],h=f&&SH[f.s];if(!h)return;const[wx,wy]=W2(e),s=S.Gs*f.sc;f.ft=[Math.round((f.fx?-wx:wx)/s+h.cw/2-f.ox),Math.round(wy/s+h.ch*S.Gy/100-f.oy)];dirty();toast('اتعلّمت نقطة القدم')}
function mkSmears(h){(h.sm||[]).forEach((m,i)=>{const b=h.fr[m.c];if(!b){h.fr[h.N+i]=null;return}const ex=m.dx*.8,ey=m.dy*.8,xo=Math.max(0,-ex),yo=Math.max(0,-ey),k=document.createElement('canvas');k.width=Math.ceil(b.cv.width+Math.abs(ex));k.height=Math.ceil(b.cv.height+Math.abs(ey));const x=k.getContext('2d');
 for(let j=6;j>=0;j--){const t=j/6;x.globalAlpha=j?.12+.35*(1-t):1;x.drawImage(b.cv,xo+ex*t,yo+ey*t)}const n=b.b;h.fr[h.N+i]={cv:k,cx:b.cx,cy:b.cy,x:b.x-xo,y:b.y-yo,b:{x0:n.x0-xo,y0:n.y0-yo,x1:n.x1+Math.max(0,ex),y1:n.y1+Math.max(0,ey),h:n.h+Math.abs(ey)},cb:b.cb}})}
const EZ={lin:t=>t,in:t=>t*t,out:t=>1-(1-t)*(1-t),io:ease},TPL={attack:t=>t<.3?2:t<.5?.5:t<.62?3:1.5,jump:t=>.6+1.4*(1-Math.abs(2*t-1)),land:t=>t<.4?.5:1.5,hurt:t=>t<.2?3:1,even:()=>1};
function inb(n){const a=F[sel],b=F[sel+1];if(!b)return toast('مفيش فريم بعده');const ins=[];for(let i=1;i<=n;i++){const t=i/(n+1),o={...(t<.5?a:b)};PK2.forEach(k=>o[k]=+(a[k]+(b[k]-a[k])*t).toFixed(3));o.hold=Math.max(.25,a.hold/2);o.key=false;ins.push(o)}F.splice(sel+1,0,...ins);thumbs();dirty();toast('اتضاف '+n+' فريم وسيط')}
$('#i1').onclick=()=>inb(1);$('#i2').onclick=()=>inb(2);$('#i3').onclick=()=>inb(3);
$('#ky').onclick=()=>{const f=F[sel];if(f){f.key=!f.key;thumbs();dirty();toast(f.key?'◆ فريم مفتاحي':'اتشال المفتاح')}};
$('#kf').onclick=()=>{const ks=F.map((f,i)=>f.key?i:-1).filter(i=>i>=0);if(ks.length<2)return toast('علّم مفتاحين (◆) على الأقل');const e=EZ[$('#ez').value];let n=0;for(let q=0;q<ks.length-1;q++){const a=ks[q],b=ks[q+1];for(let j=a+1;j<b;j++){const t=e((j-a)/(b-a));PK2.forEach(k=>F[j][k]=+(F[a][k]+(F[b][k]-F[a][k])*t).toFixed(3));n++}}setSel(sel);dirty();toast('اتملت '+n+' فريم بين المفاتيح')};
$('#sm').onclick=()=>{const a=F[sel],b=F[sel+1];if(!b)return toast('مفيش فريم بعده');const h=SH[a.s],c1=cbb(a),c2=cbb(b);if(!c1||!c2)return;const wx=(f,c)=>((c.x0+c.x1)/2-SH[f.s].cw/2+f.ox)*f.sc,wy=(f,c)=>(c.y1-SH[f.s].ch*S.Gy/100+f.oy)*f.sc,dx=Math.round((wx(b,c2)-wx(a,c1))/a.sc),dy=Math.round((wy(b,c2)-wy(a,c1))/a.sc);
 if(!dx&&!dy)return toast('مفيش حركة بين الفريمين');h.sm=h.sm||[];h.sm.push({c:a.c,dx,dy});mkSmears(h);F.splice(sel+1,0,{...a,c:h.N+h.sm.length-1,hold:.5,key:false});thumbs();dirty();toast('اتضاف فريم Smear')};
$('#u13').onclick=()=>{const m=F.filter(f=>f.ft&&fo(f));if(m.length<2)return toast('علّم القدم على فريمين على الأقل');const a=m[0],wx=(a.ft[0]-SH[a.s].cw/2+a.ox)*a.sc*(a.fx?-1:1);m.forEach(f=>{const h=SH[f.s];f.ox=Math.round(wx*(f.fx?-1:1)/f.sc-(f.ft[0]-h.cw/2));f.oy=Math.round(h.ch*S.Gy/100-f.ft[1])});setSel(sel);dirty();toast('اتثبتت القدم على '+m.length+' فريم')};
$('#u14').onclick=()=>{footMode=!footMode;cv.style.cursor=footMode?'crosshair':'';toast(footMode?'المس مكان القدم على الشخصية':'اتلغى')};
$('#tpa').onclick=()=>{const ix=F.map((f,i)=>f.on?i:-1).filter(i=>i>=0),n=ix.length;if(n<2)return toast('محتاج فريمين على الأقل');const fn=TPL[$('#tp').value];ix.forEach((i,k)=>F[i].hold=Math.max(.25,Math.round(fn(k/(n-1))*4)/4));thumbs();dirty();toast('اتطبّق قالب التوقيت')};
$('#gd').onclick=()=>{const h=SH[act];if(!h)return;const W=h.kc.width,H=h.kc.height,d=h.kc.getContext('2d').getImageData(0,0,W,H).data,cm=new Float64Array(W),rm=new Float64Array(H);let T=0;for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(d[(y*W+x)*4+3]>40){cm[x]++;rm[y]++;T++}if(!T)return;
 const best=(m,L)=>{for(let c=16;c>1;c--){let s=0;for(let k=1;k<c;k++){const p=Math.round(L*k/c);for(let q=-2;q<=2;q++)s+=m[Math.min(L-1,Math.max(0,p+q))]}if(s<=T*.0015)return c}return 1};
 h.Cols=best(cm,W);h.Rows=best(rm,H);chg('Cols',h);refresh();toast('اتكشفت الشبكة: '+h.Cols+'×'+h.Rows)};
/* ===== UX ===== */
const TIPS={mf:'ملف: فتح شيت، حفظ، مشاريع، نسخ احتياطي',mx:'تصدير: GIF / APNG / PNG / حزمة Godot',bo:'فتح شيت (صورة سبرايت) — تقدر تختار أكتر من واحد',bs:'حفظ المشروع (Ctrl+S) — بيتحفظ لوحده كمان',bn:'مشروع جديد (بيحفظ الحالي الأول)',bm:'قايمة المشاريع المحفوظة: فتح أو حذف',bb:'ملف احتياطي فيه كل شيء وتقدر تستورده في أي جهاز',bi:'استيراد ملف نسخة احتياطية',bk:'شرح طريقة الاستخدام والاختصارات',bx:'ملف JSON فيه الأطلس والفريمات',bp:'صورة PNG بكل الفريمات جنب بعض',bg:'تصدير GIF متحرك',ba:'تصدير APNG متحرك بشفافية كاملة',bz:'حزمة Godot 4 (ZIP): صور + JSON + سكريبت + ‎.tres',bxa:'تصدير كل الأنيميشنات في ملف واحد',fd:'سحب الفريم بالإصبع أو الماوس لتحريكه (شغال/متوقف)',ms:'قياس المسافة بين نقطتين (M)',un:'تراجع (Ctrl+Z)',rd:'إعادة (Ctrl+Y)',pv:'الفريم السابق ( , )',pp:'تشغيل / إيقاف (Space)',nx:'الفريم التالي ( . )',zo:'تصغير (-)',zi:'تكبير (+)',ft:'ملاءمة الشاشة (F)',z1:'حجم 100% (1)',b1:'تقديم الفريم خطوة في الترتيب',b2:'تأخير الفريم خطوة في الترتيب',b4:'حذف الفريم (Delete)',d1:'نسخ الفريم مرة (Ctrl+D)',d2:'نسخ الفريم مرتين',d4:'نسخ الفريم 4 مرات',u0:'ريسيت: رجّع الفريم لإعداداته الأصلية',u1:'توحيد حجم كل الفريمات على الفريم المحدد + القدم + المركز',u2:'محاذاة قدم كل الفريمات على خط الأرض',u3:'ريسيت لكل الفريمات',u5:'تأثير صدمة: وقفة + اهتزاز + وميض + ضغط + توهج',u6:'توسيط الفريمات أفقياً',u7:'نقل جزء/إفكت لفريم تاني: فعّله ثم دبل-كليك على الجزء',u8:'نسخ تأثيرات الفريم',u9:'لصق التأثيرات على الفريم',u10:'لصق التأثيرات على كل الفريمات',u11:'قلب كل الفريمات يمين/شمال',u12:'تثبيت الجسم: مركز الجذع + القدم لكل الفريمات (يقلل الرعشة)',u13:'تثبيت القدم: يخلي القدم المعلَّمة في نفس المكان',u14:'علّم نقطة القدم: فعّله ثم المس القدم',i1:'فريم وسيط واحد بين الفريم الحالي والتالي',i2:'فريمين وسيطين',i3:'3 فريمات وسيطة',sm:'Smear: فريم ممطوط يوضح السرعة بين الفريم والتالي',ky:'علّم الفريم كمفتاح ◆ للتحريك المفتاحي',kf:'املأ الفريمات اللي بين المفاتيح بالمنحنى المختار',tpa:'طبّق قالب التوقيت على كل فريمات الأنيميشن',gd:'اكتشاف عدد الأعمدة والصفوف تلقائياً',ga:'إضافة خط قياس أفقي تسحبه لأي ارتفاع',aa:'إضافة كل فريمات الشيت للتايم لاين',md:'النقر على فريم من الشيت: يضيف أو يستبدل',bo2:'إضافة شيت',an1:'أنيميشن جديد',an2:'تكرار الأنيميشن الحالي',an3:'إعادة تسمية الأنيميشن',an4:'حذف الأنيميشن'},
 RT={'حجم الفريم':'تكبير/تصغير الفريم ده فقط','إزاحة X':'تحريك أفقي','إزاحة Y':'تحريك رأسي (سالب = لفوق)','مدة الفريم':'كام مرة يتكرر زمن الفريم (×2 = ضعف المدة)','اهتزاز':'اهتزاز الشاشة وقت الفريم ده','ضغط/مط':'يمط الشخصية رأسياً ويضغطها أفقياً أو العكس','دوران':'يلف الفريم حوالين نقطة الدوران','توهج (Glow)':'هالة مضيئة حوالين الشخصية بلون التوهج','وميض':'يبيّض الفريم لحظة الضربة','قلب أفقي':'يعكس الفريم يمين/شمال','مربع':'مربع بيتصدّر للّعبة لحساب الضرب (نسبة لنقطة القدم)','FPS':'عدد الفريمات في الثانية','السرعة':'مضاعف السرعة العام','نمط':'تكرار / ذهاب وعودة / مرة واحدة','الانتقال':'يلين التحويل بين الفريمات (تلاشي أو حركة)','نسبة الانتقال':'جزء من مدة الفريم يتم فيه الانتقال','ذيل':'أشباح خلف الشخصية وقت الحركة','أعمدة':'عدد أعمدة الشيت (أو اضغط اكتشاف الشبكة)','تقسيم تلقائي':'يكتشف كل شخصية من غير شبكة','قص ذكي':'الإفكت الطالع برة الخلية يفضل مع فريمه','دمج':'يدمج الأجزاء القريبة في فريم واحد','حذف البقع':'يمسح النقط الشاردة الصغيرة','إزالة الكروما':'حذف لون الخلفية','الخلفية المتصلة':'يشيل الخلفية المتصلة بحافة الشيت فقط — بيحمي ألوان الشخصية','التسامح':'مدى تشابه اللون مع الخلفية لحذفه','نعومة':'نعومة حواف الحذف','نحت':'يقصّ بكسلات من حواف الشخصية','تنظيف هالة':'يشيل لمعة لون الخلفية من الحواف','توحيد ألوان':'يقرّب ألوان الفريمات من بعض','خط الأرض':'مكان خط الأرض في الخلية','الحجم العام':'تكبير كل شيء (معاينة وتصدير)','ظل تحت':'ظل بيضاوي تحت الشخصية','حد خارجي':'إطار حوالين الشخصية','بكسل آرت':'إيقاف تنعيم الصورة'};
Object.entries(TIPS).forEach(([id,t])=>{const e=document.getElementById(id);if(e){e.title=t;e.dataset.tip=t}});
['خصائص الفريم المحدد','السرعة والانتقال والأنيميشنات','قص الشيت وإزالة الخلفية','العرض والخطوط والتأثيرات'].forEach((t,i)=>{tabs[i].dataset.tip=t;tabs[i].title=t});
document.querySelectorAll('.rw label').forEach(l=>{const k=Object.keys(RT).find(k=>l.textContent.includes(k));if(k){l.dataset.tip=RT[k];l.title=RT[k]}});
const hint=document.createElement('div');hint.id='hint';$('#vw').append(hint);let hT,lpT,lpD=false;const showHint=t=>{hint.textContent=t;hint.classList.add('s');clearTimeout(hT);hT=setTimeout(()=>hint.classList.remove('s'),3200)};
addEventListener('pointerdown',e=>{const el=e.target.closest('[data-tip]');lpD=false;clearTimeout(lpT);if(el)lpT=setTimeout(()=>{lpD=true;showHint(el.dataset.tip)},450)},true);addEventListener('pointerup',()=>clearTimeout(lpT),true);addEventListener('pointercancel',()=>clearTimeout(lpT),true);
addEventListener('click',e=>{if(lpD){e.stopImmediatePropagation();e.preventDefault();lpD=false}},true);
document.addEventListener('mouseover',e=>{const el=e.target.closest&&e.target.closest('[data-tip]');if(el&&matchMedia('(hover:hover)').matches){clearTimeout(el._h);el._h=setTimeout(()=>showHint(el.dataset.tip),500);el.addEventListener('mouseleave',()=>clearTimeout(el._h),{once:true})}});
const fq=document.createElement('div');fq.id='fq';[['left','تقديم الفريم',()=>$('#b1').click()],['right','تأخير الفريم',()=>$('#b2').click()],['copy','نسخ الفريم',()=>$('#d1').click()],['trash','حذف الفريم',()=>$('#b4').click()],['repeat','قلب الفريم يمين/شمال (X)',()=>{const f=F[sel];if(f){f.fx=!f.fx;setSel(sel);dirty()}}],['minus','تقليل مدة الفريم',()=>{const f=F[sel];if(f){f.hold=Math.max(.25,f.hold-.25);thumbs();dirty()}}],['plus','زيادة مدة الفريم',()=>{const f=F[sel];if(f){f.hold=Math.min(30,f.hold+.25);thumbs();dirty()}}],['zap','تأثير صدمة',()=>$('#u5').click()],['reset','ريسيت الفريم',()=>$('#u0').click()]].forEach(([i,t,fn])=>{const b=document.createElement('button');b.innerHTML=ic(i,16);b.title=b.dataset.tip=t;b.onclick=fn;fq.append(b)});$('#vw').append(fq);
function grp(par,title,keys,open){const rows=[...par.children].filter(e=>e.classList.contains('rw')&&keys.some(k=>e.firstChild.textContent.includes(k)));if(!rows.length)return;const d=document.createElement('details');d.open=open;d.innerHTML=`<summary>${title}</summary>`;par.insertBefore(d,rows[0]);rows.forEach(r=>d.append(r))}
grp(fr,'الحجم والموضع',['حجم الفريم','إزاحة','قلب','ضغط','دوران','نقطة الدوران'],true);grp(fr,'المدة والتفعيل',['مدة','مفعّل'],true);grp(fr,'التأثيرات',['اهتزاز','توهج','وميض'],false);grp(fr,'مربع الاصطدام',['مربع'],false);
grp(pb,'السرعة والنمط',['FPS','السرعة','نمط'],true);grp(pb,'الانتقال والذيل',['الانتقال','نسبة','ذيل','الاهتزاز','الأطلس'],false);
grp(sh,'القص والتقسيم',['أعمدة','صفوف','قص ذكي','دمج','تقسيم','البقع'],true);grp(sh,'إزالة الخلفية',['الكروما','الخلفية المتصلة','ثقوب','التسامح','نعومة','الانعكاس','نحت','هالة','توحيد ألوان'],false);grp(sh,'ألوان الشيت (تبديل الألوان)',['درجة اللون','التشبع'],false);
grp(vp,'الأرض والخلفية',['خط الأرض','الحجم العام','الخلفية','لون مخصص','مسطرة'],true);grp(vp,'تأثيرات المعاينة',['ظل','لون التوهج','حد خارجي','لون الحد','بكسل','الإضاءة','Normal'],false);
function colH(pg,op){[...pg.querySelectorAll('h4')].forEach(h=>{if(h.closest('details')||h.querySelector('#fn'))return;const d=document.createElement('details'),s=document.createElement('summary');d.open=op.some(k=>h.textContent.includes(k));s.textContent=h.textContent;h.before(d);d.append(s);let n=h.nextElementSibling;while(n&&n.tagName!='H4'&&!n.classList.contains('h')&&n.tagName!='DETAILS'){const x=n.nextElementSibling;d.append(n);n=x}h.remove()})}
colH($('#p0'),['ترتيب']);colH($('#p3'),[]);

const rootOf=f=>{const c=cbb(f),h=SH[f.s];if(!c)return[0,0];const s=S.Gs*f.sc;return[+(((c.x0+c.x1)/2-h.cw/2)*s*(f.fx?-1:1)).toFixed(1),+((c.y1+1-h.ch*S.Gy/100)*s).toFixed(1)]};
function fillLy(){['#lys','#fxs'].forEach(q=>{const e=$(q);if(!e)return;const v=e.value;e.innerHTML=SH.map((h,i)=>`<option value="${i}">${i+1}· ${h.name.replace(/</g,'')}</option>`).join('');if(v&&SH[+v])e.value=v})}
$('#lya').onclick=()=>{const si=+$('#lys').value,h=SH[si];if(!h||!h.fr)return toast('افتح شيت الطبقة الأول');const lag=+$('#lyl').value||0,u=$('#lyu').value=='u',dx=+$('#lyx').value||0,dy=+$('#lyy').value||0,ix=F.map((f,i)=>f.on?i:-1).filter(i=>i>=0),n=h.N;ix.forEach((i,k)=>{F[i].ly={s:si,c:(((k-lag)%n)+n)%n,dx,dy,u}});thumbs();dirty();toast('اتطبّقت الطبقة على '+ix.length+' فريم')};
$('#lyr').onclick=()=>{F.forEach(f=>f.ly=null);thumbs();dirty();toast('اتشالت الطبقة')};
$('#pra').onclick=()=>{const f=F[sel];if(!f)return;const n=Math.max(3,Math.min(24,+$('#prn').value||8)),k=$('#pr').value,out=[];for(let i=0;i<n;i++){const w=Math.sin(2*Math.PI*i/n),o={...f,key:false};if(k=='br')o.sq=+(f.sq+.05*w).toFixed(3);else if(k=='fl')o.oy=Math.round(f.oy-8*w);else if(k=='pu'){o.sc=+(f.sc*(1+.06*w)).toFixed(3);o.gl=Math.max(f.gl,Math.round(10+8*w))}else o.rot=+(f.rot+3*w).toFixed(2);out.push(o)}F.splice(sel,1,...out);thumbs();dirty();toast('اتولّد '+n+' فريم تكراري')};
function analyze(){const ix=F.map((f,i)=>f.on?i:-1).filter(i=>i>=0),n=ix.length;if(n<2)return toast('محتاج فريمين على الأقل');
 const pos=ix.map(i=>{const f=F[i],c=cbb(f),h=SH[f.s];return c?[((c.x0+c.x1)/2-h.cw/2+f.ox)*f.sc,(c.y1-h.ch*S.Gy/100+f.oy)*f.sc]:[0,0]}),d=pos.map((p,i)=>{const q=pos[(i+1)%n];return Math.hypot(q[0]-p[0],q[1]-p[1])}),avg=d.slice(0,-1).reduce((s,v)=>s+v,0)/(n-1)||1;
 const img=ix.map(i=>{const f=F[i],h=SH[f.s],k=th(h,f.c,48);return k.getContext('2d').getImageData(0,0,k.width,48).data}),idf=(a,b)=>{const m=Math.min(a.length,b.length);let s=0;for(let i=3;i<m;i+=4)s+=Math.abs(a[i]-b[i]);return s/(m/4)/255},di=img.map((a,i)=>idf(a,img[(i+1)%n])),ai=di.slice(0,-1).reduce((s,v)=>s+v,0)/(n-1)||.001;
 const w=Math.max(d[n-1]/avg,di[n-1]/ai),vd=w<=1.6?'✅ التكرار ناعم':w<=2.6?'⚠ فيه قفزة بسيطة عند التكرار (آخر ← أول فريم)':'❌ قفزة واضحة عند التكرار — حط فريم وسيط بين الأخير والأول';
 pm.innerHTML=`<div><b>تحليل الحركة</b><canvas id="mg" width="320" height="150" style="width:100%;background:#0003;border-radius:10px;margin:8px 0"></canvas><p>${vd}<br><small>القفزة الأخيرة = ${(d[n-1]/avg).toFixed(1)}× المتوسط (موضع) · ${(di[n-1]/ai).toFixed(1)}× (شكل). الأحمر = قفزة أكبر من ضعف المتوسط، البرتقالي = التكرار.</small></p><button id="pmc">إغلاق</button></div>`;pm.hidden=false;pm.querySelector('#pmc').onclick=()=>pm.hidden=true;
 const g=pm.querySelector('#mg').getContext('2d'),mx=Math.max(...d,1),bw=300/n,hm=Math.max(...ix.map(i=>F[i].hold));g.font='10px sans-serif';d.forEach((v,i)=>{const h=v/mx*110;g.fillStyle=i==n-1?'#ffa94d':v>avg*2?'#ff5d73':'#8b6cf0';g.fillRect(10+i*bw+2,130-h,Math.max(2,bw-4),h);g.fillStyle='#fff9';g.fillText(i+1,10+i*bw+2,145)});
 g.strokeStyle='#35d0ba';g.beginPath();ix.forEach((q,i)=>{const y=130-F[q].hold/hm*100;i?g.lineTo(10+i*bw+bw/2,y):g.moveTo(10+bw/2,y)});g.stroke();g.fillStyle='#35d0ba';g.fillText('— مدة الفريم',230,12)}
$('#lc').onclick=analyze;$('#rg').onclick=analyze;
Object.entries({lc:'فحص نعومة التكرار: يقارن آخر فريم بأول فريم ويحذّر من القفزة',rg:'رسم بياني لحجم الحركة بين الفريمات ومدة كل فريم',pra:'يولّد فريمات تكرارية (تنفس/طفو/نبض/تمايل) من الفريم الحالي',lya:'طبّق الطبقة الثانوية على كل فريمات الأنيميشن بالتأخير المحدد',lyr:'إزالة الطبقة الثانوية من كل الفريمات'}).forEach(([i,t])=>{const e=document.getElementById(i);if(e){e.title=t;e.dataset.tip=t}});

let FXR=[],fxMode=false;const FXG={};
function genFx(k,n){const key=k+n;if(FXG[key])return FXG[key];const a=[];for(let i=0;i<n;i++){const c=document.createElement('canvas');c.width=96;c.height=64;const x=c.getContext('2d'),t=i/Math.max(1,n-1);x.translate(48,56);
 if(k=='dust'){for(let j=0;j<5;j++){const d=j-2,r=6+t*14+(j%2)*3;x.fillStyle=`rgba(200,190,180,${.55*(1-t)})`;x.beginPath();x.arc(d*(8+t*14),-r*.6-t*6*(j%2),r,0,7);x.fill()}}
 else{x.strokeStyle=`rgba(255,${200-t*80|0},80,${1-t})`;x.lineWidth=2;for(let j=0;j<8;j++){const q=-Math.PI*(.1+.8*j/7),r1=6+t*10,r2=r1+8+t*14;x.beginPath();x.moveTo(Math.cos(q)*r1,Math.sin(q)*r1);x.lineTo(Math.cos(q)*r2,Math.sin(q)*r2);x.stroke()}}a.push(c)}FXG[key]=a;return a}
function fxFrame(e,i){if(e.k)return{cv:genFx(e.k,e.n)[i],x:-48,y:-56};const h=SH[e.s],fr=h&&h.fr&&h.fr[e.c+i];return fr?{cv:fr.cv,x:fr.x-h.cw/2,y:fr.y-h.ch*S.Gy/100}:null}
function fxDraw(below){const now=performance.now();FXR=FXR.filter(r=>now-r.t<r.e.n*1000/r.e.fps);const f=F[sel],L=play?FXR:(f&&f.fe?[{e:f.fe,t:now,pv:1}]:[]);
 L.forEach(r=>{const e=r.e;if(!!e.u!==!!below)return;const fr=fxFrame(e,r.pv?0:Math.min(e.n-1,Math.floor((now-r.t)*e.fps/1000)));if(!fr)return;ctx.save();ctx.globalAlpha=r.pv?.7:1;ctx.translate(e.x,e.y);ctx.scale(S.Gs,S.Gs);ctx.drawImage(fr.cv,fr.x,fr.y);ctx.restore()})}
function fxAtlas(e){const Z=S.Gs,fs=Array.from({length:e.n},(_,i)=>fxFrame(e,i));let L=0,R=0,T=0,B=0;fs.forEach(f=>{if(!f)return;L=Math.max(L,-f.x*Z);R=Math.max(R,(f.x+f.cv.width)*Z);T=Math.max(T,-f.y*Z);B=Math.max(B,(f.y+f.cv.height)*Z)});
 const hf=Math.ceil(Math.max(L,R))+2,W=hf*2,pv=Math.ceil(T)+2,H=pv+Math.ceil(B)+2,c=document.createElement('canvas');c.width=W*e.n;c.height=H;const x=c.getContext('2d');x.imageSmoothingEnabled=!S.Px;fs.forEach((f,i)=>{if(f)x.drawImage(f.cv,i*W+hf+f.x*Z,pv+f.y*Z,f.cv.width*Z,f.cv.height*Z)});return{c,W,H,hf,pv}}
function nrmData(d,w,h){const H=new Float32Array(w*h),B=new Float32Array(w*h),n=new Float32Array(w*h*3);for(let i=0;i<w*h;i++)H[i]=d[i*4+3]/255*(.299*d[i*4]+.587*d[i*4+1]+.114*d[i*4+2])/255;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){let s=0,c=0;for(let v=-1;v<=1;v++)for(let u=-1;u<=1;u++){const X=x+u,Y=y+v;if(X>=0&&Y>=0&&X<w&&Y<h){s+=H[Y*w+X];c++}}B[y*w+x]=s/c}
 const g=(X,Y)=>B[Math.min(h-1,Math.max(0,Y))*w+Math.min(w-1,Math.max(0,X))];for(let y=0;y<h;y++)for(let x=0;x<w;x++){const dx=(g(x+1,y)-g(x-1,y))*3,dy=(g(x,y+1)-g(x,y-1))*3,l=Math.hypot(dx,dy,1),i=(y*w+x)*3;n[i]=-dx/l;n[i+1]=-dy/l;n[i+2]=1/l}return n}
const nrm=r=>r.nrm||(r.nrm=nrmData(r.cv.getContext('2d').getImageData(0,0,r.cv.width,r.cv.height).data,r.cv.width,r.cv.height));
function lit(r){if(!S.Li)return r.cv;const key=S.La+':'+S.Li;if(r.lk==key)return r.lc;const n=nrm(r),w=r.cv.width,h=r.cv.height,im=r.cv.getContext('2d').getImageData(0,0,w,h),d=im.data,a=S.La*Math.PI/180,L=[Math.cos(a)*.7,-Math.sin(a)*.7,.55],ln=Math.hypot(...L),base=L[2]/ln;
 for(let i=0;i<w*h;i++){const f=1+((n[i*3]*L[0]+n[i*3+1]*L[1]+n[i*3+2]*L[2])/ln-base)*S.Li/100*1.6;d[i*4]=Math.min(255,d[i*4]*f);d[i*4+1]=Math.min(255,d[i*4+1]*f);d[i*4+2]=Math.min(255,d[i*4+2]*f)}
 const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').putImageData(im,0,0);r.lc=c;r.lk=key;return c}
function normalCanvas(c){const w=c.width,h=c.height,im=c.getContext('2d').getImageData(0,0,w,h),n=nrmData(im.data,w,h),o=new ImageData(w,h);for(let i=0;i<w*h;i++){for(let j=0;j<3;j++)o.data[i*4+j]=(n[i*3+j]*.5+.5)*255;o.data[i*4+3]=im.data[i*4+3]}const k=document.createElement('canvas');k.width=w;k.height=h;k.getContext('2d').putImageData(o,0,0);return k}
function hueFx(h){if(!h.Hue&&h.Sat==100)return;h.fr.forEach(f=>{if(!f)return;const x=f.cv.getContext('2d'),im=x.getImageData(0,0,f.cv.width,f.cv.height),d=im.data;for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;const r=d[i]/255,g=d[i+1]/255,b=d[i+2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,dl=mx-mn;let hh=0,s=0;if(dl){s=l>.5?dl/(2-mx-mn):dl/(mx+mn);hh=60*(mx==r?(g-b)/dl+(g<b?6:0):mx==g?(b-r)/dl+2:(r-g)/dl+4)}
 hh=(hh+h.Hue+360)%360;s=Math.min(1,s*h.Sat/100);const c=(1-Math.abs(2*l-1))*s,xx=c*(1-Math.abs((hh/60)%2-1)),m=l-c/2,v=[[c,xx,0],[xx,c,0],[0,c,xx],[0,xx,c],[xx,0,c],[c,0,xx]][Math.floor(hh/60)%6];d[i]=(v[0]+m)*255;d[i+1]=(v[1]+m)*255;d[i+2]=(v[2]+m)*255}x.putImageData(im,0,0)})}
const shA=()=>S.ShC=='fade'&&play?Math.pow(1-(window.gu||0),2):1;
$('#fxa').onclick=()=>{const f=F[sel];if(!f)return;const k=$('#fxk').value,e={k:k||null,s:+$('#fxs').value||0,c:Math.max(0,(+$('#fxc').value||1)-1),n:Math.max(1,Math.min(24,+$('#fxn').value||6)),fps:+$('#fxf').value||12,x:f.fe?f.fe.x:0,y:f.fe?f.fe.y:-40,u:$('#fxu').value=='u'};if(!k&&!fxFrame(e,0))return toast('اختار شيت وخلية صحيحة');f.fe=e;thumbs();dirty();toast('اتحط الإفكت — حدّد مكانه بلمسة')};
$('#fxr').onclick=()=>{if(F[sel]){F[sel].fe=null;thumbs();dirty();toast('اتشال الإفكت')}};
$('#fxp').onclick=()=>{if(!F[sel]||!F[sel].fe)return toast('ضع الإفكت على الفريم الأول');fxMode=!fxMode;cv.style.cursor=fxMode?'crosshair':'';toast(fxMode?'المس مكان الإفكت (بالنسبة لنقطة القدم)':'اتلغى')};
$('#dps').onclick=async()=>{const h=SH[act];if(!h)return;const o={name:h.name+'_v'+(SH.length+1),data:h.data,ov:h.ov,sm:h.sm};K.forEach(k=>o[k]=h[k]);let nh=h.Hue+120;if(nh>180)nh-=360;o.Hue=nh;await addSheet(o);goTab(2);toast('اتعملت نسخة — غيّر "درجة اللون" ليها')};
Object.entries({fxa:'ضع الإفكت (غبار/شرارات/سبرايت) على الفريم ده — بيشتغل لما الأنيميشن يوصل له',fxp:'المس مكان ظهور الإفكت على الكانفاس (بالنسبة لنقطة القدم)',fxr:'إزالة الإفكت من الفريم',dps:'نسخة من الشيت بنفس الإعدادات تغيّر لونها (للأعداء والسكينات)'}).forEach(([i,t])=>{const e=document.getElementById(i);if(e){e.title=t;e.dataset.tip=t}});
