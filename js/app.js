(function(){
const S=window.SITE,KEY="kolding-ai-korekort",N=S.kapitler.length;
const $=s=>document.querySelector(s);
const r=document.documentElement.style,F=S.farver;
r.setProperty("--primaer",F.primaer);r.setProperty("--accent",F.accent);r.setProperty("--baggrund",F.baggrund);r.setProperty("--tekst",F.tekst);r.setProperty("--kort",F.kort);
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{done:[],notes:{}}}catch(e){return{done:[],notes:{}}}}
function save(p){try{localStorage.setItem(KEY,JSON.stringify(p))}catch(e){}}
const p=load(),done=i=>p.done.includes(i),open=i=>i===0||done(i-1);
document.querySelectorAll("[data-site]").forEach(e=>e.textContent=S[e.dataset.site]);
document.title=S.titel+" – "+S.kommune;
if($("#bar"))$("#bar").style.width=Math.round(p.done.length/N*100)+"%";
if($("#pct"))$("#pct").textContent=p.done.length+" af "+N+" kapitler gennemført";
const list=$("#kapitler");
if(list){S.kapitler.forEach((k,i)=>{const d=document.createElement("div");d.className="kort"+(open(i)?"":" last");
 d.innerHTML=`<h2>Kapitel ${i+1}: ${k.titel} ${done(i)?'<span class="merke">Gennemført</span>':""}</h2><p>${k.intro}</p>`+(open(i)?`<a class="knap" href="kapitel.html?k=${i+1}">${done(i)?"Læs igen":"Start kapitel"}</a>`:"<em>Låses op, når forrige kapitel er gennemført.</em>");
 list.appendChild(d)});
 if(p.done.length===N&&$("#cert"))$("#cert").hidden=false}
const kap=$("#kapitel");
if(kap){const i=(parseInt(new URLSearchParams(location.search).get("k"))||1)-1,k=S.kapitler[i];
 if(!k||!open(i)){location.replace("index.html");return}
 kap.innerHTML=`<p><a href="index.html">← Oversigt</a></p><h1>Kapitel ${i+1}: ${k.titel}</h1><div class="kort"><p>${k.intro}</p><ul>${k.punkter.map(x=>"<li>"+x+"</li>").join("")}</ul></div>
 <div class="kort"><h2>Refleksion</h2><p>${k.refleksion}</p><textarea id="note" placeholder="Skriv dine tanker her (gemmes kun i din browser)"></textarea></div>
 <button class="knap" id="ok">${i+1<N?"Markér som gennemført og fortsæt":"Markér som gennemført og få certifikat"}</button>`;
 $("#note").value=p.notes[i]||"";
 $("#note").addEventListener("input",e=>{p.notes[i]=e.target.value;save(p)});
 $("#ok").onclick=()=>{if(!done(i))p.done.push(i);save(p);location.href=i+1<N?"kapitel.html?k="+(i+2):"certifikat.html"}}
const cv=$("#canvas");
if(cv){if(p.done.length<N){$("#laast").hidden=false;$("#gen").hidden=true}
 const draw=()=>{const c=cv.getContext("2d"),W=cv.width,H=cv.height,navn=$("#navn").value||"Dit navn";
 c.fillStyle="#fff";c.fillRect(0,0,W,H);c.strokeStyle=F.primaer;c.lineWidth=14;c.strokeRect(30,30,W-60,H-60);
 c.strokeStyle=F.accent;c.lineWidth=4;c.strokeRect(52,52,W-104,H-104);
 c.textAlign="center";c.fillStyle=F.primaer;c.font="bold 30px sans-serif";c.fillText(S.logoTekst,W/2,130);
 c.fillStyle="#222";c.font="bold 64px Georgia,serif";c.fillText("Kørekort i AI",W/2,230);
 c.font="28px sans-serif";c.fillText("Hermed bekræftes det, at",W/2,310);
 c.fillStyle=F.primaer;c.font="bold 56px Georgia,serif";c.fillText(navn,W/2,390);
 c.fillStyle="#222";c.font="28px sans-serif";c.fillText(S.certifikatTekst,W/2,450);
 c.font="22px sans-serif";c.fillText(new Date().toLocaleDateString("da-DK",{day:"numeric",month:"long",year:"numeric"}),W/2,H-110)};
 $("#navn").addEventListener("input",draw);draw();
 $("#hent").onclick=()=>{const a=document.createElement("a");a.download="ai-korekort.png";a.href=cv.toDataURL("image/png");a.click()}}
})();
