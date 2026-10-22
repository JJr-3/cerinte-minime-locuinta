const GROUPS={g1:["RO","IT","FR","DE","AT","CH","US"],g2:["ES","NL","BE","UK","IE","FI"],g3:["SE","NO","DK","PL","CZ","HU"],g4:["MD","BG","GR","HR","RS","SI","SK"]};
const NS="http://www.w3.org/2000/svg";
const fmt=n=>String(n).replace(".",",");
const byA3={},byCode={};DATA.countries.forEach(c=>{byA3[c.a3]=c;byCode[c.code]=c;});
let mk="c1e",sel="RO",grp="g1";{const h=location.hash.match(/k=(\w+)/);if(h&&METRICS[h[1]])mk=h[1];const q=location.hash.match(/c=(\w+)/);if(q&&byCode[q[1]])sel=q[1];}
function val(code){const e=METRICS[mk].v[code];if(!e)return null;return {v:e[0],st:e[1]||""};}
function text(code){const e=val(code),m=METRICS[mk];if(!e)return"";if(m.kind==="cat"&&e.v!==null){const tx=m.tx&&m.tx[code];return m.cats[e.v].l+(tx&&/\d/.test(tx)?" ≤ "+tx+" m²":"")+(e.st==="dedus"?" (dedus)":e.st==="nv"?" (neverificat)":"");}if(e.v===null)return e.st==="nv"?"neverificat":e.st==="dedus"?"dedus, fără valoare":"– (fără regulă)";const s=typeof e.v==="number"?fmt(e.v)+" "+(m.unit||""):e.v;return s+(e.st==="dedus"?" (dedus)":e.st==="nv"?" (neverificat)":"");}
const STOPS=[[0,"#FFF8C4"],[0.35,"#FFF100"],[0.7,"#FFA200"],[1,"#8A4B00"]];const DOM={c1e:[0,50,10],c2:[0,50,10],cr:[0,15,5],cw:[1.5,2.5,0.5],cc:[0.8,1.3,0.1],cm:[1,2,0.5],c8:[0,5,1],c12:[0,25,5]};
function dom(){const m=METRICS[mk];if(DOM[mk])return DOM[mk];const n=Object.values(m.v).map(x=>x[0]).filter(x=>typeof x==="number");const lo=Math.min(...n),hi=Math.max(...n);return[lo,hi===lo?lo+1:hi,null];}
const hx=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
function ramp(t){t=Math.max(0,Math.min(1,t));let i=0;while(i<STOPS.length-2&&t>STOPS[i+1][0])i++;const[a0,c0]=STOPS[i],[a1,c1]=STOPS[i+1];const f=(t-a0)/(a1-a0),A=hx(c0),B=hx(c1);return"rgb("+A.map((x,k)=>Math.round(x+(B[k]-x)*f)).join(",")+")";}
function col(v){const[lo,hi]=dom();return ramp((v-lo)/(hi-lo));}const GREY="#9ca3af",BASE="#e5e5e5";
const BR={c1e:[10,20,30],c2:[30,40,50],c3:[2.5,2.6,2.7],c8:[3,4,5],c11:[1,2,3],c12:[10,15,20]};
function cls(v){const b=BR[mk]||[];let i=0;while(i<b.length&&v>=b[i])i++;return i;}
function brLabel(i){const b=BR[mk],u=METRICS[mk].unit==="% din pardoseală"?"%":METRICS[mk].unit;if(i===0)return"< "+fmt(b[0])+" "+u;if(i===b.length)return"≥ "+fmt(b[b.length-1])+" "+u;return fmt(b[i-1])+"–<"+fmt(b[i])+" "+u;}
function fill(code){const e=val(code),m=METRICS[mk];if(!e)return BASE;if(e.st==="nv")return"url(#hatch)";if(e.v===null)return GREY;if(m.kind==="bool")return e.v==="da"?"#FFF100":"#ffffff";if(m.kind==="cat")return m.cats[e.v].c;return typeof e.v==="number"?col(e.v):BASE;}
function ttype(code){const e=val(code),m=METRICS[mk];if(!e)return null;if(e.v===null)return e.st==="nv"?"nv":"none";const t=m.tp&&m.tp[code];if(t==="reg")return"reg";if(t==="ded"||e.st==="dedus")return"ded";if(e.st==="nv")return"nv";return"nat";}
function tagLabel(code){const e=val(code);if(!e)return null;const ty=ttype(code);if(e.v===null||e.st==="nv")return{t:e.st==="nv"?"?":"–",ty:e.st==="nv"?"nv":"none"};const M_=METRICS[mk];let t=M_.kind==="cat"?((M_.tx&&M_.tx[code])||e.v):typeof e.v==="number"?fmt(e.v):(e.v==="da"?"DA":"NU");if(ty==="ded")t+="*";const un=uAbbr();const hasU=un&&(M_.kind==="num"||(M_.kind==="cat"&&/\d/.test(t)));return{t,ty,u:hasU?un:""};}
function uAbbr(){const u=METRICS[mk].unit||"";return u==="% din pardoseală"?"%":u;}
const LL={ROU:[25,45.9],ITA:[12.6,42.9],FRA:[2.4,46.9],DEU:[10.3,51.2],AUT:[14.4,47.6],CHE:[8.2,46.8],ESP:[-3.7,40.1],NLD:[5.7,52.3],BEL:[4.6,50.6],GBR:[-1.6,52.8],IRL:[-8,53.2],FIN:[26.5,63],SWE:[15.5,62.8],NOR:[9.5,61.5],DNK:[9.2,56.1],POL:[19.3,52.1],CZE:[15.4,49.8],HUN:[19.4,47.1],MDA:[28.5,47.3],BGR:[25.3,42.7],GRC:[22.2,39.6],HRV:[16.3,45.5],SRB:[20.8,44.0],SVN:[14.8,46.1],SVK:[19.6,48.7]};
const OFF={NLD:[4.3,54.0],BEL:[2.2,52.0],DNK:[7.2,57.5],CHE:[7.6,43.9],SVN:[13.3,44.6],HRV:[15.4,43.5],MDA:[31.0,46.0],AUT:[14.6,47.4],SVK:[19.6,48.7]};
function pj(ll){const P=DATA.proj;return[(ll[0]-P.L0)*P.k*P.S,(P.B1-ll[1])*P.S];}
const tip=()=>document.getElementById("tip");
function showTip(ev,c){const t=tip();if(!t)return;const TPL={nat:"național",reg:"regional (oraș)",ded:"dedus",nv:"neverificat",none:"fără regulă"};const ty=ttype(c.code),M=METRICS[mk];t.innerHTML=`<b>${c.name}</b><br>${text(c.code)}${ty?" · "+TPL[ty]:""}${M.nt&&M.nt[c.code]?"<br>"+M.nt[c.code]:""}`;const r=t.parentNode.getBoundingClientRect();t.style.left=(ev.clientX-r.left+12)+"px";t.style.top=(ev.clientY-r.top+12)+"px";t.style.display="block";}
function hideTip(){const t=tip();if(t)t.style.display="none";}
function fitEU(svg){const p=[...svg.querySelectorAll("path[data-c]")];if(!p.length)return;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;p.forEach(e=>{const b=e.getBBox();x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);});const m=12;let W=x1-x0+2*m,H=y1-y0+2*m,X=x0-m,Y=y0-m;const R=svg.getBoundingClientRect();if(0&&R.width&&R.height){const ca=R.width/R.height;if(ca>W/H){const nW=H*ca;X-=(nW-W)*0.35;W=nW;}else{const nH=W/ca;Y-=(nH-H)/2;H=nH;}}svg.setAttribute("viewBox",[X,Y,W,H].join(" "));document.documentElement.style.setProperty("--ar",((x1-x0+2*m)/(y1-y0+2*m)).toFixed(3));}
function drawMap(svg,shapes,isUS){svg.innerHTML='<defs><pattern id="hatch'+(isUS?"u":"")+'" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="#dbdbdb"/><line x1="0" y1="0" x2="0" y2="5" stroke="#000" stroke-width="1"/></pattern></defs>';
 const vb=svg.viewBox.baseVal,R=svg.getBoundingClientRect();const sc=Math.min(R.width/vb.width,R.height/vb.height)||1;const u=1/sc;
 const g=document.createElementNS(NS,"g"),tg=document.createElementNS(NS,"g");const T=[];
 shapes.forEach(s=>{const c=byA3[s.a3];const p=document.createElementNS(NS,"path");p.setAttribute("d",s.d);let f=c?fill(c.code):BASE;if(isUS&&f==="url(#hatch)")f="url(#hatchu)";p.setAttribute("fill",f);p.setAttribute("stroke","#fff");p.setAttribute("stroke-width",0.8*u);p.setAttribute("stroke-linejoin","round");
  if(c){p.setAttribute("data-c",c.code);p.style.cursor="pointer";p.onclick=ev=>{sel=c.code;render();};p.onmousemove=ev=>showTip(ev,c);p.onmouseenter=()=>panel(c.code);p.onmouseleave=()=>{panel(sel);hideTip();};if(c.code===sel){p.setAttribute("stroke","#000");p.setAttribute("stroke-width",1.8*u);}}g.appendChild(p);
  if(c){const L=tagLabel(c.code);if(!L)return;let a,o;if(isUS){a=[180,95];o=a;}else{a=LL[s.a3]?pj(LL[s.a3]):[0,0];o=a;}const w=(L.t.length*6.6+(L.u?L.u.length*4.8+3:0)+8)*u,h=15*u;T.push({c,L,ax:a[0],ay:a[1],x:o[0],y:o[1],w,h,fixed:!!OFF[s.a3]});}});
 const sel_=g.querySelector('[stroke="#000"]');if(sel_)g.appendChild(sel_);

 T.forEach(o=>{const gg=document.createElementNS(NS,"g");gg.style.cursor="pointer";gg.onclick=()=>{sel=o.c.code;render();};gg.onmousemove=ev=>showTip(ev,o.c);gg.onmouseleave=hideTip;

  const dk=o.L.ty==="nv"||o.L.ty==="none";const r=document.createElementNS(NS,"rect");r.setAttribute("x",o.x-o.w/2);r.setAttribute("y",o.y-o.h/2);r.setAttribute("width",o.w);r.setAttribute("height",o.h);r.setAttribute("fill",dk?"#000":"#fff");r.setAttribute("stroke","#000");r.setAttribute("stroke-width",0.8*u);
  const t=document.createElementNS(NS,"text");t.setAttribute("x",o.x);t.setAttribute("y",o.y+4*u);t.setAttribute("text-anchor","middle");t.setAttribute("font-size",11.5*u);t.setAttribute("font-weight","600");t.setAttribute("font-family","Inter Tight,Helvetica,Arial,sans-serif");t.setAttribute("fill",dk?"#fff":"#000");t.textContent=o.L.t;if(o.L.u){const us=document.createElementNS(NS,"tspan");us.setAttribute("font-size",8.5*u);us.setAttribute("font-weight","500");us.setAttribute("fill","#555");us.textContent="\u2009"+o.L.u;t.appendChild(us);}gg.append(r,t);tg.appendChild(gg);});
 svg.append(g,tg);}
function panel(code){const M=METRICS[mk],P=document.getElementById("pbody");const TPL={nat:"explicit · național",reg:"explicit · regional / oraș",ded:"dedus",nv:"neverificat",none:"fără regulă"};
 const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
 if(!code||!byCode[code])code="RO";
 const c=byCode[code],l=tagLabel(code),ty=ttype(code);const src=(M.src&&M.src[code])||c.src||[];
 const e=val(code),unit=METRICS[mk].unit==="% din pardoseală"?"%":(METRICS[mk].unit||"");let big;if(!e||e.v===null)big=e&&e.st==="nv"?"?":"–";else if(typeof e.v==="number")big=esc(fmt(e.v))+(ty==="ded"?"*":"")+`<small> ${esc(unit)}</small>`;else big=esc(text(code).replace(/ \((dedus|neverificat)\)$/,""));
 P.innerHTML=`<div id="pname">${esc(c.name)}</div><div class="pval">${big}</div><div class="pstt">${ty?TPL[ty]:""}</div>${M.nt&&M.nt[code]?`<p class="pnt">${esc(M.nt[code])}</p>`:""}
 <div class="psh">Surse</div><ul class="psrc">${src.map(s=>`<li><a href="${s.h}" target="_blank" rel="noopener">${esc(s.t)} ↗</a></li>`).join("")||"<li>—</li>"}</ul>`;
 }
function fitView(){const mb=document.querySelector("#view .mapbox"),ar=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ar"))||0.9;if(mb&&innerWidth>760){const h=mb.clientHeight;if(h)document.documentElement.style.setProperty("--mw",Math.round(h*ar)+"px");}const v=document.getElementById("view");if(innerWidth<=700){v.style.height="";return;}v.style.height=(innerHeight-document.querySelector("header").offsetHeight)+"px";}
function render(){fitView();const m=METRICS[mk];
 document.getElementById("crit").innerHTML=Object.keys(METRICS).map(k=>`<button class="${k===mk?"on":""}" data-k="${k}">${METRICS[k].label}</button>`).join("");
 {const S=document.getElementById("critsel");S.innerHTML=Object.keys(METRICS).map(k=>`<option value="${k}"${k===mk?" selected":""}>${METRICS[k].label}</option>`).join("");S.onchange=()=>{mk=S.value;render();};document.getElementById("cdesc").textContent=m.ds||("Minimul cerut de lege. Atinge sau dă click pe o țară pentru notă și surse.");}
 document.querySelectorAll("#crit button").forEach(b=>b.onclick=()=>{mk=b.dataset.k;render();});
 const nums=Object.values(m.v).map(x=>x[0]).filter(x=>typeof x==="number");
 {const b=BR[mk];let h="";if(m.kind==="bool")h=`<span><i style="background:#FFF100"></i>da</span><span><i style="background:#fff"></i>nu</span>`;else if(m.kind==="cat")h=Object.values(m.cats).map(c=>`<span><i style="background:${c.c}"></i>${c.l}</span>`).join("")+(mk==="ca"?`<span>cifra = prag m²</span>`:"");else{const[lo,hi,st]=dom();const step=st||(hi-lo)/4;let tk=[];for(let x=lo;x<=hi+1e-9;x+=step)tk.push(Math.round(x*100)/100);const g="linear-gradient(90deg,"+STOPS.map(s=>s[1]+" "+s[0]*100+"%").join(",")+")";const u=m.unit==="% din pardoseală"?"%":(m.unit||"");h=`<span class="grad"><span class="bar" style="background:${g}"></span><span class="tk">${tk.map(x=>`<s style="left:${(x-lo)/(hi-lo)*100}%">${fmt(x)}</s>`).join("")}</span></span><span>${u}</span>`;}
 h+=`<span class="sep"></span><span><em class="tg w">16*</em>dedus</span><span><em class="tg k">?</em><i class="h"></i>neverificat</span><span><em class="tg k">–</em><i style="background:${GREY}"></i>fără regulă</span>`;document.getElementById("legend").innerHTML=h;}
 {const eu=document.getElementById("eu");{eu.setAttribute("viewBox","0 0 1000 1006");drawMap(eu,DATA.eu,false);fitEU(eu);}drawMap(eu,DATA.eu,false);}drawMap(document.getElementById("us"),DATA.us,true);
 panel(sel);
 document.getElementById("grp").innerHTML=Object.keys(GROUPS).map(g=>`<button class="${g===grp?"on":""}" data-g="${g}">${GROUPS[g].map(x=>x==="US"?"SUA":x).join(", ")}</button>`).join("");
 document.querySelectorAll("#grp button").forEach(b=>b.onclick=()=>{grp=b.dataset.g;render();});
 const cs=GROUPS[grp];document.getElementById("full").innerHTML=`<tr><th>Criteriu</th>${cs.map(x=>`<th>${x==="US"?"SUA":x}</th>`).join("")}</tr>`+DATA.crit.map((k,i)=>`<tr><td class="k">${i+1}. ${k}</td>${cs.map(x=>`<td>${byCode[x].cells[i]}</td>`).join("")}</tr>`).join("");}
render();window.addEventListener("resize",()=>{clearTimeout(window._rt);window._rt=setTimeout(render,150);});
window.addEventListener("load",()=>requestAnimationFrame(render));
new ResizeObserver(()=>{clearTimeout(window._ro);window._ro=setTimeout(render,60);}).observe(document.querySelector("#view .mapbox"));
