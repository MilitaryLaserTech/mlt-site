/* MLT - Configurator utilaj (militarylasertech.com/info/configurator-utilaj) */
// CONFIGURATOR 1/3 - DATE: utilaje laser si plasma, tabel putere kW/mm
(function(){
var WA="40730466920",MAIL="contact@militarylasertech.com";
var MESE=["3000 x 1500 mm","4000 x 2000 mm","6000 x 2000 mm","6000 x 2500 mm"],MESEXL=MESE.concat(["Format mare 14000 x 3200 mm (la cerere)"]),COD={"3000 x 1500 mm":"31.5","4000 x 2000 mm":"42","6000 x 2000 mm":"62","6000 x 2500 mm":"62.5"};
var MAT=["Oțel carbon","Inox","Aluminiu","Alamă / cupru"];
// grosime maxima (mm) taiata de fiecare putere laser (W) - din calculatorul kW/mm de pe site
var PW={"Oțel carbon":{10:1000,14:1500,16:2000,20:3000,22:4000,25:6000,30:8000,40:12000,40.1:15000},"Inox":{4:1000,6:1500,8:2000,10:3000,12:4000,16:6000,30:8000,30.1:15000},"Aluminiu":{3:1000,4:2000,6:3000,8:4000,12:6000,25:8000,30:12000,30.1:15000},"Alamă / cupru":{2:1000,3:1500,4:2000,5:3000,6:4000,8:6000,12:8000,14:12000,14.1:15000}};
var KW=["1 kW","1,5 kW","2 kW","3 kW","4 kW","6 kW","8 kW","12 kW","15 kW","20 kW","30 kW"];
var VAR={k:"var",t:"Variantă constructivă",o:["Deschis (investiție minimă)","Protejat / blindat (cabină anti-radiații, video, masă dublă)"]};
var MATS={k:"mat",t:"Ce material tai cel mai des?",o:MAT};
var GROS={k:"gros",t:"Grosimea maximă pe care vrei s-o tai",g:1};
var PUT={k:"kw",t:"Puterea sursei laser",p:1};
var T=[
{n:"Tăiere laser tablă",c:"rover",s:[VAR,{k:"masa",t:"Dimensiunea mesei de lucru",o:MESEXL},MATS,GROS,PUT,{k:"opt",t:"Opțiuni (poți alege mai multe)",m:1,o:["Masă dublă de schimb (hidraulică)","Încărcare / descărcare automată tablă","Cap laser autofocus Raytools / Precitec","Sistem video în cabină","Exhaustare 2 kW și filtrare fum"]}]},
{n:"Tăiere laser țeavă și profile",c:"cannon",s:[{k:"var",t:"Variantă constructivă",o:["Deschis","Protejat cu încărcare automată (autoload)"]},{k:"dia",t:"Diametrul maxim al țevii / profilului",o:["Ø 160 mm","Ø 220 mm","Ø 240 mm","Ø 350 mm"]},{k:"lung",t:"Lungimea țevii",o:["6 m","9 m","12 m"]},{k:"prof",t:"Ce profile tai?",m:1,o:["Țeavă rotundă","Țeavă pătrată / rectangulară","Profil I / H","Profil U","Cornier (L)","Țeavă ovală / profil deschis"]},MATS,{k:"gros",t:"Grosimea maximă a peretelui",g:1},PUT,{k:"opt",t:"Opțiuni",m:1,o:["Încărcare automată","Descărcare și sortare automată","3 mandrine - tăiere fără rest","Mandrine pneumatice / electromagnetice","Import fișiere IGS + recunoaștere contur"]}]},
{n:"Tăiere laser tablă + țeavă/profile",c:"cannonrover",s:[VAR,{k:"masa",t:"Dimensiunea mesei de lucru",o:MESE},{k:"dia",t:"Diametrul maxim al țevii",o:["Ø 160 mm","Ø 220 mm","Ø 230 mm"]},MATS,GROS,PUT,{k:"opt",t:"Opțiuni",m:1,o:["Masă dublă de schimb (hidraulică)","Suport țeavă 3 - 9 m","Cap laser autofocus Raytools / Precitec"]}]},
{n:"Tăiere plasmă tablă",c:"tank",s:[{k:"masa",t:"Dimensiunea mesei de lucru",o:MESE},MATS,{k:"gros",t:"Grosimea maximă",o:["până la 10 mm","10 - 20 mm","20 - 35 mm"]},{k:"amp",t:"Sursa plasmă",o:["63 A","100 A","120 A","200 A","Nu știu - recomandați-mi"]},{k:"opt",t:"Opțiuni",m:1,o:["Exhaustare 2 kW și filtrare fum","Componente Honeywell / EMERSON / FUJI"]}]},
{n:"Tăiere plasmă tablă + profile",c:"tankcanon",s:[{k:"masa",t:"Dimensiunea mesei de lucru",o:MESE},{k:"dia",t:"Diametrul maxim al țevii",o:["Ø 160 mm","Ø 220 mm","Altul - spuneți-ne"]},MATS,{k:"gros",t:"Grosimea maximă",o:["până la 10 mm","10 - 20 mm","20 - 35 mm"]},{k:"amp",t:"Sursa plasmă",o:["63 A","100 A","120 A","200 A","Nu știu - recomandați-mi"]}]}
];
window.MLT_CFG={WA:WA,MAIL:MAIL,COD:COD,PW:PW,KW:KW,T:T,MAT:MATS};
})();
// CONFIGURATOR 2/3 - DATE: sudura, curatare, robot, abkant + model recomandat + aspect
(function go(){
var C=window.MLT_CFG;if(!C){if(!go.w){go.w=1;document.addEventListener("DOMContentLoaded",go);}return;}if(C.model)return;
C.T.push(
{n:"Sudură laser manuală",c:"mlw",s:[{k:"kw",t:"Puterea sursei",o:["1,5 kW","2 kW","3 kW","Nu știu - recomandați-mi"]},{k:"mat",t:"Ce sudezi?",m:1,o:["Oțel carbon","Inox","Aluminiu"]},{k:"gros",t:"Grosimea materialului",o:["0,5 - 2 mm","2 - 4 mm","4 - 6 mm","peste 6 mm (la cerere)"]},{k:"opt",t:"Opțiuni",m:1,o:["Alimentator sârmă (dublu)","Răcire cu aer (fără chiller)","Funcție curățare (3 în 1)","Funcție tăiere (4 în 1)"]}]},
{n:"Curățare laser",c:"mlc",s:[{k:"tip",t:"Tip curățare",o:["Continuă - rugină, vopsea groasă, suprafețe mari","Pulsată - fină, fără să afecteze materialul","Nu știu - recomandați-mi"]},{k:"kw",t:"Puterea sursei",o:["1,5 kW","2 kW","3 kW","Nu știu - recomandați-mi"]},{k:"ce",t:"Ce cureți?",m:1,o:["Rugină","Vopsea","Ulei / grăsime","Oxizi după sudură","Matrițe / piese"]}]},
{n:"4 în 1: sudură, curățare, tăiere",c:"ccwp",s:[{k:"kw",t:"Puterea sursei",o:["1,5 kW","2 kW","3 kW"]},{k:"mat",t:"Materiale",m:1,o:["Oțel carbon","Inox","Aluminiu"]}]},
{n:"Robot sudură laser 6 axe",c:"robot",s:[{k:"apl",t:"Aplicația",m:1,o:["Sudură 3D","Tăiere 3D"]},{k:"kw",t:"Puterea sursei",o:["1,5 kW","2 kW","3 kW","Nu știu - recomandați-mi"]},{k:"opt",t:"Opțiuni",m:1,o:["Urmărire cusătură fără contact","Coordonare mai multe stații","Alimentare automată sârmă"]}]},
{n:"Abkant / îndoire",c:"abkant",s:[{k:"lung",t:"Lungime și forță",o:["3200 mm / 100 t (bendIT dbE it 3,2-100)","Altă dimensiune - la cerere"]},{k:"gros",t:"Grosimea maximă a tablei",o:["până la 3 mm","3 - 6 mm","6 - 10 mm","peste 10 mm"]}]}
);
C.kwTxt=function(w){return(w/1000+"").replace(".",",")+" kW";};
C.rec=function(A){var m=C.PW[A.mat]||C.PW["Oțel carbon"],g=parseFloat((A.gros||"").replace(/^peste (\d+)/,"$1.1"));if(!g)return null;
var k=Object.keys(m).map(Number).sort(function(a,b){return a-b});for(var j=0;j<k.length;j++)if(g<=k[j])return m[k[j]];return 30000;};
C.model=function(tip,A){var COD=C.COD;
var c=tip.c,cod=COD[A.masa]||"",d=(A.dia||"").replace(/\D/g,""),p=/rotej/.test(A.var||"");
if(c=="rover")return(p?"ARMORED ":"")+"ROVER MLT "+cod;
if(c=="cannon")return p?"ARMORED AUTOMATIC CANNON MLT-P6-"+(d||"240"):"CANNON MLT-P6-"+(d.length>3?"la cerere":d);
if(c=="cannonrover")return(p?"ARMORED ":"")+"CANNON ROVER MLT-P6-"+cod+" / "+d;
if(c=="tank")return"thermoTANK MLT "+cod;if(c=="tankcanon")return"thermoTHANK CANON MLT "+cod;
if(c=="mlw")return/3 în 1|4 în 1/.test(A.opt||"")?"4 SHOTS ML-CCWP":"MACHINE GUN ML-W";
if(c=="mlc")return"MACHINE GUN ML-C";if(c=="ccwp")return"4 SHOTS ML-CCWP";if(c=="robot")return"MLT Laser Welding Robot 6 axe";return"bendIT dbE it 3,2-100";};
if(/configurator/.test(location.pathname)){var st=document.createElement("style");
st.textContent=".page__static-content,.page__content{visibility:hidden}.page__static-content:has(#mlt-cfg),.page__content:has(#mlt-cfg){visibility:visible}#mlt-cfg{max-width:860px;margin:0 auto;font-family:inherit}.cf{background:#e9ebe4;border-radius:12px;padding:20px;color:#2f3a12}.cf h2{margin:0 0 4px;font-size:24px;color:#2f3a12}.cf .sub{margin:0 0 14px;color:#4b5320}"+
".cf-bar{height:8px;background:#c9cdbf;border-radius:4px;overflow:hidden;margin-bottom:16px}.cf-bar i{display:block;height:100%;background:#4b5320;transition:width .3s}"+
".cf h3{margin:0 0 12px;font-size:19px}.cf-o{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}"+
".cf-o button{text-align:left;padding:13px 14px;border:2px solid #c9cdbf;border-radius:8px;background:#fff;color:#2f3a12;font-weight:600;font-size:15px;cursor:pointer}"+
".cf-o button:hover{border-color:#4b5320}.cf-o button.on{background:#4b5320;border-color:#4b5320;color:#fff}.cf-o small{display:block;font-weight:400;opacity:.8}"+
".cf-nav{display:flex;justify-content:space-between;gap:10px;margin-top:18px;flex-wrap:wrap}.cf-b{padding:12px 22px;border:0;border-radius:6px;font-weight:700;font-size:15px;cursor:pointer;text-decoration:none!important;display:inline-block}"+
".cf-g{background:#4b5320;color:#fff!important}.cf-l{background:#fff;color:#2f3a12;border:1px solid #c9cdbf}.cf-w{background:#25d366;color:#fff!important}"+
".cf table{width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden}.cf td{padding:9px 12px;border-bottom:1px solid #e1e4da;vertical-align:top}.cf td:first-child{font-weight:700;width:42%}"+
".cf-rec{background:#fff;border-left:5px solid #4b5320;padding:12px 14px;border-radius:6px;margin:0 0 14px}.cf input{width:100%;padding:11px;border:1px solid #c9cdbf;border-radius:6px;font-size:15px;box-sizing:border-box;margin-top:8px}";
document.head.appendChild(st);}
})();
// CONFIGURATOR 3/3 - FUNCTIONARE
(function(){
function init(){
var C=window.MLT_CFG;if(!C||!C.model)return;var el=document.getElementById("mlt-cfg");
if(!el&&/configurator/.test(location.pathname)){var pc=document.querySelector(".page__static-content,.page__content");if(!pc)return;pc.innerHTML='<div id="mlt-cfg"></div>';el=pc.firstChild;}
if(!el||el.dataset.ok)return;el.dataset.ok=1;
var WA=C.WA,MAIL=C.MAIL,PW=C.PW,KW=C.KW,T=C.T;function model(){return C.model(tip,A);}
var tip=null,i=0,A={};
function rec(){return C.rec?C.rec(A):null;}function kwTxt(w){return C.kwTxt?C.kwTxt(w):w/1e3+" kW";}
function dsc(){return/^Deschis/.test(A.var||"")&&/rover/.test(tip.c);}
function opts(s){
if(s.g){var m=PW[A.mat]||PW["Oțel carbon"],o=[];Object.keys(m).map(Number).sort(function(a,b){return a-b}).forEach(function(g){if(!dsc()||m[g]<=6000)o.push(g%1?"peste "+Math.floor(g)+" mm":g+" mm")});o.push("Nu știu încă");return o;}
if(s.p){var r=rec(),o=KW.filter(function(x){return!C.ok||C.ok(x,A,tip)});o.push("Nu știu - recomandați-mi");return o.map(function(x){return r&&x==kwTxt(r)?x+"|recomandat pentru "+A.gros+" "+A.mat.toLowerCase():x});}
return /^Deschis/.test(A.var||"")?s.o.filter(function(x){return!/cabin|video|schimb/i.test(x)}):s.o;}
function rezumat(){var r=["Utilaj: "+tip.n,"Model recomandat: "+model()];tip.s.forEach(function(s){if(A[s.k])r.push(s.t+": "+A[s.k])});return r;}
function draw(){
var h='<div class="cf"><h2>Configurator utilaj MLT</h2><p class="sub">Alege pas cu pas și primești recomandarea și oferta pe WhatsApp.</p>';
var tot=tip?tip.s.length+2:1,pas=tip?i+1:0;h+='<div class="cf-bar"><i style="width:'+Math.round(pas/tot*100)+'%"></i></div>';
if(!tip){h+='<h3>Ce utilaj te interesează?</h3><div class="cf-o">';T.forEach(function(t,k){h+='<button data-t="'+k+'">'+t.n+'</button>'});h+='</div></div>';}
else if(i<tip.s.length){var s=tip.s[i],sel=(A[s.k]||"").split("; ");h+='<h3>'+s.t+'</h3>'+(s.g&&dsc()?'<p class="sub">Varianta deschisă merge până la 6 kW. Pentru grosimi mai mari alege varianta protejată (ARMORED).</p>':'')+'<div class="cf-o">';
opts(s).forEach(function(o){var v=o.split("|")[0];h+='<button data-v="'+v+'" class="'+(sel.indexOf(v)>-1?"on":"")+'">'+v+(o.split("|")[1]?'<small>✔ '+o.split("|")[1]+'</small>':'')+'</button>'});
h+='</div><div class="cf-nav"><button class="cf-b cf-l" data-back>← Înapoi</button>'+(s.m?'<button class="cf-b cf-g" data-next>Continuă →</button>':'')+'</div></div>';}
else{var r=rezumat(),w=rec();h+='<h3>Configurația ta</h3><div class="cf-rec"><b>'+model()+'</b>'+(w&&tip.s.some(function(s){return s.p})?'<br>Putere minimă pentru '+A.gros+' '+A.mat.toLowerCase()+': <b>'+kwTxt(w)+'</b>':'')+'</div><table>';
r.slice(2).forEach(function(l){var x=l.split(": ");h+='<tr><td>'+x[0]+'</td><td>'+x.slice(1).join(": ")+'</td></tr>'});
h+='</table><input id="cf-t" type="tel" placeholder="Telefon (pentru Te sunăm)"><input id="cf-n" placeholder="Nume și firmă"><input id="cf-l" placeholder="Localitate"><div class="cf-nav"><button class="cf-b cf-l" data-back>← Înapoi</button><span class="cf-s">'+C.btns(tip,A)+'</span></div><p style="margin:12px 0 0;font-size:13px;opacity:.8">Toate utilajele se configurează la comandă. Recomandarea e orientativă - confirmăm configurația exactă împreună.</p></div>';}
el.innerHTML=h;}
el.addEventListener("click",function(e){var b=e.target.closest("button,a");if(!b)return;
if(b.dataset.t!=null){tip=T[+b.dataset.t];i=0;A={};return draw();}
if(b.hasAttribute("data-back")){if(i>0)i--;else tip=null;return draw();}
if(b.hasAttribute("data-next")){i++;return draw();}
if(b.dataset.v!=null){var s=tip.s[i],v=b.dataset.v;
if(s.m){var a=A[s.k]?A[s.k].split("; "):[],j=a.indexOf(v);j>-1?a.splice(j,1):a.push(v);A[s.k]=a.join("; ");b.classList.toggle("on");return;}
A[s.k]=v;if(s.k=="mat"&&A.gros)delete A.gros;i++;return draw();}
if(b.dataset.send){var f=document.getElementById("cf-t"),tel=f.value.trim(),n=document.getElementById("cf-n").value,l=document.getElementById("cf-l").value;
var t="Bună ziua! Am configurat pe site un utilaj:\n"+rezumat().join("\n")+(tel?"\nTelefon: "+tel:"")+(n?"\nNume/firmă: "+n:"")+(l?"\nLocalitate: "+l:"")+"\nVă rog să mă sunați cu oferta. Mulțumesc!";
C.send(b,e,f,t,tel,n,model());}
});
draw();
}
init();document.addEventListener("DOMContentLoaded",init);window.addEventListener("load",init);
})();
// CONFIGURATOR 4/4 - LIMITE PUTERE ROVER + LINK SPRE PAGINA UTILAJULUI
(function go(){
var C=window.MLT_CFG;if(!C){if(!go.w){go.w=1;document.addEventListener("DOMContentLoaded",go);}return;}
// puteri laser ROVER / CANNON ROVER: deschis pana la 6 kW, protejat (ARMORED) peste 6 kW
C.ok=function(x,A,tip){var w=parseFloat(x.replace(",","."));if(!/rover/.test(tip.c)||isNaN(w))return true;return/^Deschis/.test(A.var||"")?w<=6:w>6;};
// pagina produsului care corespunde alegerii (deschis / protejat)
C.link=function(tip,A){var p=/rotej/.test(A.var||""),L={
rover:p?"armored-rover-mlt-cnc-laser-debitare-tabla-protejat-375":"rover-mlt-cnc-laser-debitare-tabla-deschis-374",
cannon:p?"armored-automatic-cannon-mlt-p6-cnc-laser-debitare-autoload-protejat-377":"cannon-mlt-p6-cnc-debitare-laser-profile-deschis-376",
cannonrover:p?"armored-cannon-rover-mlt-p6-cnc-laser-debitare-tabla-si-profile-379":"cannon-rover-mlt-p6-cnc-taiere-laser-tabla-si-profile-deschis-383",
tank:"thermotank-plasma-mlt-391",tankcanon:"thermothank-canon-plasma-tabla-profile-392",
mlw:"machine-gun-ml-w-sudura-laser-380",mlc:"machine-gun-ml-c-curatare-laser-381",
ccwp:"4-shots-ml-ccwp-sudura-curatare-curatare-cu-pulsatie-taiere-laser-382",
robot:"mlt-laser-welding-robot-automatic-6-axis-387",abkant:"abkant-393"};
return"/cumpara/"+L[tip.c];};
// trimite cererea prin formularul de contact al site-ului, fara sa paraseasca pagina ([MLT-OK] = trece de filtrul Gmail)
C.lead=function(msg,tel,name,cb){
fetch("/contact",{credentials:"same-origin"}).then(function(r){return r.text();}).then(function(h){
var f=new DOMParser().parseFromString(h,"text/html").getElementById("customer_contact");if(!f)throw 0;
var fd=new FormData(),rs="";
[].forEach.call(f.elements,function(e){if(e.name&&e.type!="checkbox")fd.set(e.name,e.value);});
var sel=f.querySelector('select[name="customer_contact[reason]"]');
if(sel)[].forEach.call(sel.options,function(o){if(o.value&&(!rs||/produs/i.test(o.text)))rs=o.value;});
fd.set("customer_contact[name]",name||"Client configurator");fd.set("customer_contact[email]",C.MAIL);
fd.set("customer_contact[phone]",tel);fd.set("customer_contact[company]",(name?name+" ":"")+"[MLT-OK]");
fd.set("customer_contact[reason]",rs);fd.set("customer_contact[message]",msg);fd.set("customer_contact[agree_terms]","1");
return fetch(f.getAttribute("action")||"/contact",{method:"POST",body:fd,credentials:"same-origin"});
}).then(function(r){cb(r.ok);}).catch(function(){cb(false);});};
// butoanele de trimitere: Vezi utilajul / WhatsApp / Te sunăm / Email
C.btns=function(tip,A){return'<a class="cf-b cf-l" target="_blank" href="'+C.link(tip,A)+'">Vezi utilajul</a><a class="cf-b cf-w" data-send="wa" target="_blank" rel="noopener">WhatsApp</a><a class="cf-b cf-g" data-send="call">Te sunăm noi</a><a class="cf-b cf-l" data-send="mail" title="'+C.MAIL+'">Email</a>';};
C.send=function(b,e,f,t,tel,n,mod){var k=b.dataset.send;
if(k=="wa")b.href="https://wa.me/"+C.WA+"?text="+encodeURIComponent(t);
if(k=="mail")b.href="mailto:"+C.MAIL+"?subject="+encodeURIComponent("Configurator: "+mod)+"&body="+encodeURIComponent(t);
if(k=="call"){e.preventDefault();if(tel.replace(/\D/g,"").length<9){f.style.borderColor="#c0392b";f.placeholder="Scrie telefonul ca să te sunăm";f.focus();return;}
b.textContent="Se trimite...";C.lead(t,tel,n,function(ok){b.parentNode.innerHTML='<b>'+(ok?"✔ Mulțumim! Te sunăm în curând.":"Nu s-a putut trimite - scrie-ne pe WhatsApp.")+'</b>';});}};
if(/configurator/.test(location.pathname)){var st=document.createElement("style");st.textContent=".cf-s{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}.cf-s .cf-b{padding:10px 15px;font-size:14px}";document.head.appendChild(st);}
})();
