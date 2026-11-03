// MLT - butoane spre configurator: (1) plutitor stanga jos, langa Leasing calc / Laser Power; (2) pe pagina produsului, deschis pe categoria produsului. RO/EN dupa limba paginii.
(function(){
var D=document,EN=(D.documentElement.lang||"ro").slice(0,2).toLowerCase()=="en";
var URL=(EN?"/en":"")+"/info/configurator-utilaj";
if(location.pathname.indexOf("configurator-utilaj")>-1)return;
// categorie MerchantPro -> categorie configurator
var CAT={71:"sheet",73:"tube",76:"platetube",67:"platetube",79:"plasma",83:"plasma",84:"plasma",81:"weld",75:"weld",69:"weld",85:"robot",89:"brake",92:"gen",93:"fork",90:"solar"};
var css=D.createElement("style");css.textContent=
"#cfgBtn{position:fixed;left:20px;bottom:150px;z-index:9;height:40px;padding:5px 12px;border:0;border-radius:8px;background:#4b5320;color:#fff;font:400 14.4px Calibri,sans-serif;cursor:pointer;text-decoration:none!important;display:flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,.25)}"+
"#cfgBtn:hover{background:#5d6728}#cfgBtn .g{display:inline-block;animation:cfgSpin 6s linear infinite}@keyframes cfgSpin{to{transform:rotate(360deg)}}"+
".cfg-prod{display:inline-flex;width:fit-content;align-self:flex-start;align-items:center;gap:8px;margin:10px 0 4px;padding:11px 18px;border-radius:6px;background:#4b5320;color:#fff!important;font-weight:700;font-size:14px;text-decoration:none!important}"+
".cfg-prod:hover{background:#5d6728}";
D.head.appendChild(css);
function init(){
 if(!D.getElementById("cfgBtn")){var a=D.createElement("a");a.id="cfgBtn";a.href=URL;a.innerHTML='<span class="g">⚙</span> '+(EN?"Configurator":"Configurator");D.body.appendChild(a);}
 var act=D.querySelector(".product-summary__info--actions,.product-action--price-on-request");
 if(act&&!D.getElementById("cfgProd")){var tip="",m;
  [].forEach.call(D.querySelectorAll("[class*=breadcrumb] a"),function(x){if(m=/-(\d+)$/.exec(x.getAttribute("href")||""))if(CAT[m[1]])tip=CAT[m[1]];});
  var b=D.createElement("a");b.id="cfgProd";b.className="cfg-prod";b.href=URL+(tip?"?tip="+tip:"");
  b.innerHTML="⚙ "+(EN?"Configure your machine":"Configurează-ți utilajul");
  var v=D.getElementById("mltd");(v||act).parentNode.insertBefore(b,(v||act).nextSibling);}
}
if(D.readyState=="loading")D.addEventListener("DOMContentLoaded",init);else init();
window.addEventListener("load",function(){setTimeout(init,500);});
})();
