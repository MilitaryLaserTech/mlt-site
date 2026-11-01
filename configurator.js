/* MLT - Configurator utilaj vizual (militarylasertech.com/info/configurator-utilaj)
   Inlocuieste configuratorul vechi (versiunea veche ramane in istoricul GitHub, @19be3aa).
   Se incarca din MerchantPro > Scripturi custom, prin jsDelivr:
   <script src="https://cdn.jsdelivr.net/gh/MilitaryLaserTech/mlt-site@COD/configurator.js"></script>
   Pozele stau langa script, in folderul img/ din acelasi repo (aceeasi versiune @COD).
   Configuratorul e izolat intr-un Shadow DOM, ca stilurile temei sa nu-l strice si invers. */
(function () {
// pagina din MerchantPro pe care apare configuratorul
var PAGE = "configurator-utilaj";
if (location.pathname.indexOf(PAGE) < 0 || window.MLT_VCFG) return;
window.MLT_VCFG = 1;

var SCRIPT = document.currentScript;
var IMG = (SCRIPT && SCRIPT.src ? SCRIPT.src.replace(/[^\/]*$/, "") : "") + "img/";
var WA = "40730466920", MAIL = "contact@militarylasertech.com";

/* ================= DATE ================= */
var FRAMES = {sheet_open:7, sheet_enclosed:6, sheet_exchange_open:6, sheet_exchange_enclosed:6, platetube:6, platetube_exchange:6,
  tube_2:5, tube_3:5, hbeam:7, cabinet:5, brake:7, robot:2, gen_ind:6, gen_mob:2, gen_home:5, forklift:6, forklift_d:1, forklift_gpl:1, forklift_e3:1, forklift_e4:1, forklift_hd:1, forklift_hdx:2, forklift_st:1, solar:1, ups:1, start:1};
var MESE = ["3000 x 1500 mm","4000 x 2000 mm","6000 x 2000 mm","6000 x 2500 mm"];
var COD = {"3000 x 1500 mm":"31.5","4000 x 2000 mm":"42","6000 x 2000 mm":"62","6000 x 2500 mm":"62.5"};
var MAT = ["Oțel carbon","Inox","Aluminiu","Alamă / cupru"];
// grosime maxima (mm) taiata de fiecare putere laser (W) - din calculatorul kW/mm de pe site
var PW = {"Oțel carbon":{10:1000,14:1500,16:2000,20:3000,22:4000,25:6000,30:8000,40:12000,40.1:15000},
  "Inox":{4:1000,6:1500,8:2000,10:3000,12:4000,16:6000,30:8000,30.1:15000},
  "Aluminiu":{3:1000,4:2000,6:3000,8:4000,12:6000,25:8000,30:12000,30.1:15000},
  "Alamă / cupru":{2:1000,3:1500,4:2000,5:3000,6:4000,8:6000,12:8000,14:12000,14.1:15000}};
var KW = ["1 kW","1,5 kW","2 kW","3 kW","4 kW","6 kW","8 kW","12 kW","15 kW","20 kW","30 kW"];
var NUSTIU = "Nu știu - recomandați-mi";
var CE = "CE (MD + LVD + EMC)";

var EXTRA_LASER = ["Compresor de aer","Stabilizator de tensiune + protecție la suprasarcină","Transformator",
  "Aer condiționat pentru dulapul electric","Software nesting profesional","Instalare + training la sediu"];
var EXTRA_WELD = ["Alimentator sârmă (dublu)","Kit protecție laser (ochelari + ecran)","Compresor de aer",
  "Stabilizator de tensiune + protecție la suprasarcină","Training operator"];

function v(id, t, d, g, o) { o = o || {}; o.id = id; o.t = t; o.d = d; o.g = g; return o; }
function step(k, t, o) { o = o || {}; o.k = k; o.t = t; return o; }
var S_MAT = step("mat", "Ce material tai cel mai des?", {o: MAT});
var S_TH = step("gros", "Grosimea maximă pe care vrei s-o tai", {laserTh: 1});
var S_KW = step("kw", "Puterea sursei laser", {laserKw: 1});
var S_MASA = step("masa", "Dimensiunea mesei de lucru", {o: MESE});
var W_TH = step("gros", "Grosimea materialului", {o: ["0,5 - 2 mm","2 - 4 mm","4 - 6 mm","peste 6 mm (la cerere)"]});
var W_KW = step("kw", "Puterea sursei", {o: ["1,5 kW","2 kW","3 kW",NUSTIU], rec: function (A) {
  var g = A.gros || ""; return /^0,5/.test(g) ? "1,5 kW" : /^2 -/.test(g) ? "2 kW" : g ? "3 kW" : null; }});

// generatoare industriale: kVA standby -> [kVA prime, consum l/h la 100% si 50% sarcina, rezervor l, L x l x H mm, greutate kg] - din fisele tehnice ale furnizorului
var GEN = {22:[20,4.8,2.6,92,"2000 x 900 x 1310",750], 25:[24.5,6.1,3.2,82,"1950 x 900 x 1337",720], 35:[32,7.6,4,101,"2300 x 1000 x 1545",830],
  44:[40,9.3,4.6,132,"2300 x 1000 x 1715",925], 50:[45.4,10.4,5.2,132,"2300 x 1050 x 1715",945], 55:[50,11.9,6,101,"2300 x 1000 x 1545",930],
  72:[65.5,14.5,7.7,180,"2600 x 1000 x 1535",1350], 90:[82,18.6,9.5,180,"2700 x 1050 x 1875",1400], 110:[100,23.2,11.9,275,"2600 x 1000 x 1545",1650],
  150:[135,30.2,15.9,275,"3220 x 1100 x 1845",1820], 165:[150,32.7,16.7,280,"3220 x 1100 x 1845",1950], 220:[200,43.1,22.4,415,"3600 x 1200 x 2480",2470],
  250:[227.2,50.9,25.9,585,"3820 x 1150 x 2460",2250], 275:[250,56.9,28.4,585,"3820 x 1150 x 2460",2250], 300:[273,58.8,32.6,585,"3700 x 1400 x 2650",2690],
  350:[318.2,70.5,35.3,585,"3700 x 1400 x 2650",2700], 400:[363.6,85,43.1,890,"3700 x 1400 x 2650",3350], 500:[454.5,112.9,52,1145,"4400 x 1600 x 2650",4100],
  550:[500,104.9,53.6,1145,"4400 x 1600 x 2650",4350], 660:[600,126.5,63.6,1530,"4500 x 1800 x 3075",4950], 715:[650,135.1,66.4,1530,"5300 x 1800 x 3000",5600],
  750:[681.8,135.1,66.4,1530,"4500 x 1800 x 3000",5600], 825:[750,150.1,72.5,2000,"5300 x 1800 x 3000",7500], 900:[818.2,172.5,91,2000,"4950 x 2000 x 3425",7800],
  1120:[1018,205,105.7,2000,"4950 x 2000 x 3425",8250], 1250:[1136.3,198.4,100.3,2000,"5450 x 2400 x 3470",9035], 1400:[1250,217.6,108.9,2000,"5450 x 2400 x 3470",9120],
  1650:[1500,324,156,2275,"5450 x 2400 x 3470",11760], 1700:[1545.5,327.5,166.7,2275,"5450 x 2400 x 3470",11760], 2000:[1830,401,194.7,3000,"8000 x 2800 x 3150",18700],
  2500:[2250,466.4,240.5,0,"",0]};
var UPS_KVA = [10,15,20,30,40,45,60,80,100,120,160,200,250];
function isGenInd(A) { return A.variant === "ind"; }
function isMob(A) { return /remorcă/.test(A.exec || ""); }
// generatoare pentru casa: puteri disponibile si fisele tehnice cunoscute (de la furnizor)
var HOME_PW = ["1 kW","2 kW","3 kW","3,5 kW","6 kW","8 kW"];
var HOME_SPEC = {"3,5 kW":{"Putere nominală / maximă":"3,2 / 3,5 kW","Rezervor":"3,7 l","Zgomot":"62 dB (la 7 m, 25% sarcină)","Motor":"145 cmc, 4 timpi","Pornire":"Manuală (demaror cu sfoară)","Greutate":"21,5 kg","Dimensiuni ambalaj":"510 x 320 x 475 mm"},
  "6 kW":{"Putere nominală / maximă":"5,5 / 6 kW","Rezervor":"13,5 l","Zgomot":"62 dB (la 7 m, 25% sarcină)","Motor":"312 cmc, 4 timpi","Pornire":"Manuală, electrică și cu telecomandă","Greutate":"52 kg","Dimensiuni ambalaj":"720 x 575 x 605 mm"},
  "8 kW":{"Combustibil":"Benzină sau GPL (dual fuel)","Pornire":"Cu telecomandă"}};
function fmt(x) { return (Math.round(x * 10) / 10 + "").replace(".", ","); }
function ore(h) { return (h < 10 ? fmt(h) : Math.round(h)) + " ore"; }
// fotovoltaic: aprox. 100 kWh pe luna pentru fiecare kWp instalat in Romania (1.200 kWh/kWp pe an), panouri de 550 W
var PV_CONS = {rez:[150,250,350,450,600,800,1000,1500], com:[1000,1500,2000,3000,5000,7500,10000], ind:[10000,15000,20000,30000,50000,75000,100000]};
var PV_BAT = {rez:["Fără baterie","5 kWh","10 kWh","15 kWh","20 kWh","30 kWh"], com:["Fără baterie","20 kWh","30 kWh","50 kWh","100 kWh","200 kWh"],
  ind:["Fără baterie","100 kWh","200 kWh","500 kWh","1.000 kWh"]};
var FORK_CAP = {d:["1,5 t","2 t","2,5 t","3 t","3,5 t","4 t","5 t"], g:["1,5 t","2 t","2,5 t","3 t","3,5 t","4 t"],
  e4:["2 t","2,5 t","3 t","3,5 t","4 t","5 t"], e3:["1 t","1,5 t","2 t"], hd:["6 t","7 t","8 t","10 t","12 t"],
  hdx:["13 t","16 t","20 t","25 t","28 t","32 t","45 t","55 t"], st:["1 t","1,5 t"]};
function pvCons(A) { return parseInt((A.cons || "").replace(/\D/g, ""), 10) || 0; }
function pv(A) { var c = pvCons(A); if (!c) return null; var n = Math.max(4, Math.ceil(c / 100 / 0.55)); return {n: n, kwp: n * 0.55}; }
var T = [
 {id:"sheet", n:"Tăiere laser tablă", d:"Tablă oțel, inox, aluminiu, alamă", g:"sheet_open", rover:1,
  variants:[
   v("open","Deschis","Investiție minimă, acces liber pe masă. Până la 6 kW","sheet_open",{specs:{"Viteză maximă":"80 m/min","Precizie repetabilă":"±0.02 mm"}}),
   v("arm","Protejat / blindat (ARMORED)","Cabină anti-radiații, video, masă dublă de schimb. Peste 6 kW","sheet_exchange_enclosed",{tag:"TOP",
     specs:{"Precizie poziționare":"±0.03 mm","Precizie repetabilă":"±0.02 mm","Accelerație":"până la 1.2 G","Masă":"Dublă, schimb automat"}})],
  steps:[S_MASA, S_MAT, S_TH, S_KW, step("opt","Opțiuni",{multi:1, o:["Masă dublă de schimb (hidraulică)","Încărcare / descărcare automată tablă",
   "Cap laser autofocus Raytools / Precitec","Sistem video în cabină","Exhaustare 2 kW și filtrare fum"].concat(EXTRA_LASER)})],
  std:"Cap laser Raytools BT110 · Sursă Raycus · CNC Cypcut 8000S · Batiu sudat · Grindă din aluminiu profil",
  model:function (A) { return (A.variant === "arm" ? "ARMORED " : "") + "ROVER MLT " + (COD[A.masa] || ""); },
  link:function (A) { return A.variant === "arm" ? "armored-rover-mlt-cnc-laser-debitare-tabla-protejat-375" : "rover-mlt-cnc-laser-debitare-tabla-deschis-374"; }},
 {id:"tube", n:"Tăiere laser țeavă și profile", d:"Țeavă rotundă, rectangulară, profile", g:"tube_3",
  variants:[
   v("open","Deschis","Încărcare manuală, cost redus","tube_2",{specs:{"Precizie poziționare":"±0.03 mm","Accelerație":"0.6–1.2 G"}}),
   v("arm","Protejat cu încărcare automată (autoload)","Alimentare din pachet, 3 mandrine, rest de țeavă minim","tube_3",{tag:"TOP",
     specs:{"Precizie poziționare":"±0.03 mm","Accelerație":"0.6–1.2 G","Încărcare":"Automată (autoload)"}})],
  steps:[step("dia","Diametrul maxim al țevii / profilului",{o:["Ø 160 mm","Ø 220 mm","Ø 240 mm","Ø 350 mm"]}),
   step("lung","Lungimea țevii",{o:["6 m","9 m","12 m"]}),
   step("prof","Ce profile tai?",{multi:1, o:["Țeavă rotundă","Țeavă pătrată / rectangulară","Profil I / H","Profil U","Cornier (L)","Țeavă ovală / profil deschis"]}),
   S_MAT, step("gros","Grosimea maximă a peretelui",{laserTh:1}), S_KW,
   step("opt","Opțiuni",{multi:1, o:["Încărcare automată","Descărcare și sortare automată","Platformă de descărcare","3 mandrine - tăiere fără rest",
    "Mandrine pneumatice / electromagnetice","Cap pentru teșire (bevel)","Import fișiere IGS + recunoaștere contur"].concat(EXTRA_LASER)})],
  std:"Control EtherCAT cu urmărire · Mandrine pneumatice · Sursă Raycus",
  model:function (A) { var d = (A.dia || "").replace(/\D/g, ""); return A.variant === "arm" ? "ARMORED AUTOMATIC CANNON MLT-P6-" + (d || "240") : "CANNON MLT-P6-" + d; },
  link:function (A) { return A.variant === "arm" ? "armored-automatic-cannon-mlt-p6-cnc-laser-debitare-autoload-protejat-377" : "cannon-mlt-p6-cnc-debitare-laser-profile-deschis-376"; }},
 {id:"platetube", n:"Tăiere laser tablă + țeavă/profile", d:"Un singur utilaj pentru ambele", g:"platetube", rover:1,
  variants:[
   v("open","Deschis","Masă de tablă + mandrină pentru țeavă. Până la 6 kW","platetube",{specs:{"Precizie repetabilă":"±0.02 mm"}}),
   v("arm","Protejat / blindat (ARMORED)","Masă dublă de schimb, productivitate maximă. Peste 6 kW","platetube_exchange",{tag:"TOP",
     specs:{"Precizie poziționare":"±0.03 mm","Masă":"Dublă, schimb automat"}})],
  steps:[S_MASA, step("dia","Diametrul maxim al țevii",{o:["Ø 160 mm","Ø 220 mm","Ø 230 mm"]}), S_MAT, S_TH, S_KW,
   step("opt","Opțiuni",{multi:1, o:["Masă dublă de schimb (hidraulică)","Suport țeavă 3 - 9 m","Cap laser autofocus Raytools / Precitec"].concat(EXTRA_LASER)})],
  std:"Cap laser Raytools BT110 · Sursă Raycus · CNC Cypcut 8000S · Batiu sudat · Mandrină pneumatică",
  model:function (A) { return (A.variant === "arm" ? "ARMORED " : "") + "CANNON ROVER MLT-P6-" + (COD[A.masa] || "") + " / " + (A.dia || "").replace(/\D/g, ""); },
  link:function (A) { return A.variant === "arm" ? "armored-cannon-rover-mlt-p6-cnc-laser-debitare-tabla-si-profile-379" : "cannon-rover-mlt-p6-cnc-taiere-laser-tabla-si-profile-deschis-383"; }},
 {id:"plasma", n:"Tăiere plasmă", d:"Tablă groasă, cost mic pe metru tăiat", g:"sheet_open",
  variants:[
   v("pl","Plasmă tablă (thermoTANK)","Masă de debitare pentru tablă","sheet_open",{specs:{"Viteză maximă":"15 000 mm/min","Amorsare arc":"Fără contact","Grosime tăiere":"6–35 mm"}}),
   v("plt","Plasmă tablă + profile (thermoTHANK CANON)","Masă de tablă + rotitor pentru țeavă","platetube",{tag:"TOP",
     specs:{"Viteză maximă":"15 000 mm/min","Amorsare arc":"Fără contact","Grosime tăiere":"6–35 mm"}})],
  steps:[S_MASA, step("dia","Diametrul maxim al țevii",{only:"plt", o:["Ø 160 mm","Ø 220 mm","Altul - spuneți-ne"]}), S_MAT,
   step("gros","Grosimea maximă",{o:["până la 10 mm","10 - 20 mm","20 - 35 mm"]}),
   step("amp","Sursa plasmă",{o:["63 A","100 A","120 A","200 A",NUSTIU], rec:function (A) {
     var g = A.gros || ""; return /^până/.test(g) ? "100 A" : /^10/.test(g) ? "120 A" : g ? "200 A" : null; }}),
   step("opt","Opțiuni",{multi:1, o:["Exhaustare 2 kW și filtrare fum","Masă cu apă pentru fum și zgură","Componente Honeywell / EMERSON / FUJI",
    "Compresor de aer","Stabilizator de tensiune + protecție la suprasarcină","Software nesting profesional","Instalare + training la sediu"]})],
  model:function (A) { return (A.variant === "plt" ? "thermoTHANK CANON MLT " : "thermoTANK MLT ") + (COD[A.masa] || ""); },
  link:function (A) { return A.variant === "plt" ? "thermothank-canon-plasma-tabla-profile-392" : "thermotank-plasma-mlt-391"; }},
 {id:"weld", n:"Sudură / curățare laser", d:"4 în 1, sudură laser, curățare pulsată sau continuă", g:"cabinet",
  variants:[
   v("ccwp","4 SHOTS ML-CCWP (4 în 1)","Sudură, tăiere, curățare și curățare cu pulsație cu un singur aparat","cabinet",{tag:"TOP",
     specs:{"Funcții":"Sudură, tăiere, curățare, curățare cu pulsație","Răcire":"Apă, chiller dublă temperatură","Sârmă":"0.6–2.0 mm","Pistol":"≤ 0.7 kg"}}),
   v("mlw","MACHINE GUN ML-W (sudură laser)","Aparat dedicat de sudură, cordon curat, fără deformări","cabinet",{
     specs:{"Viteză sudură":"≤ 120 mm/s","Răcire":"Apă","Sârmă":"0.6–2.0 mm","Cap":"Swing-weld (oscilant)"}}),
   v("mlc","MACHINE GUN ML-C (curățare laser)","Rugină, vopsea, oxizi, ulei, fără chimicale","cabinet",{
     specs:{"Contact":"Fără contact, fără chimicale","Viteză curățare":"până la 50 m²/h (continuă)","Pistol":"≤ 0.7 kg"}})],
  steps:[
   step("tip","Tip curățare",{only:"mlc", o:["Continuă - rugină, vopsea groasă, suprafețe mari","Pulsată - fină, fără să afecteze materialul",NUSTIU]}),
   step("ce","Ce cureți?",{only:"mlc", multi:1, o:["Rugină","Vopsea","Ulei / grăsime","Oxizi după sudură","Matrițe / piese"]}),
   step("mat","Ce sudezi?",{not:"mlc", multi:1, o:["Oțel carbon","Inox","Aluminiu"]}),
   step("gros","Grosimea materialului",{not:"mlc", o:W_TH.o}),
   step("kw","Puterea sursei",{o:W_KW.o, rec:W_KW.rec}),
   step("opt","Opțiuni",{multi:1, o:EXTRA_WELD.concat(["Răcire cu aer (fără chiller)","Aspirație fum"])})],
  std:"Cap swing-weld (oscilant) · Lentile cu schimb rapid · Chiller cu dublă temperatură",
  model:function (A) { return A.variant === "ccwp" ? "4 SHOTS ML-CCWP" : A.variant === "mlc" ? "MACHINE GUN ML-C" : "MACHINE GUN ML-W"; },
  link:function (A) { return A.variant === "ccwp" ? "4-shots-ml-ccwp-sudura-curatare-curatare-cu-pulsatie-taiere-laser-382"
    : A.variant === "mlc" ? "machine-gun-ml-c-curatare-laser-381" : "machine-gun-ml-w-sudura-laser-380"; }},
 {id:"robot", n:"Robot laser 6 axe", d:"Sudură sau tăiere 3D automată, pe portal", g:"robot",
  variants:[
   v("w","Robot sudură laser","Cordoane repetabile pe serie, fără operator la pistol","robot",{tag:"TOP"}),
   v("c","Robot tăiere laser 3D","Piese 3D, ambutisate, forme neregulate, tăiere 360°","robot")],
  steps:[step("mat","Ce material lucrezi?",{multi:1, o:["Oțel carbon","Inox","Aluminiu"]}), W_TH, W_KW,
   step("opt","Opțiuni",{multi:1, o:["Urmărire cusătură fără contact","Coordonare mai multe stații","Alimentare automată sârmă",
    "Poziționer rotativ pentru piese","Celulă de protecție cu senzori","Compresor de aer","Stabilizator de tensiune + protecție la suprasarcină","Programare + training la sediu"]})],
  std:"Braț 6 axe pe portal · Rază braț 1.4–2.0 m · Precizie repetabilă ±0.1 mm · Programare offline din model 3D",
  model:function () { return "MLT Laser Welding Robot 6 axe"; },
  link:function () { return "mlt-laser-welding-robot-automatic-6-axis-387"; }},
 {id:"brake", n:"Abkant bendIT", d:"Presă CNC de îndoit, 50–500 t", g:"brake",
  variants:[
   v("hyd","Compensare hidraulică (CNC)","Unghi constant pe toată lungimea","brake",{tag:"TOP",specs:{"Compensare săgeată":"Hidraulică, CNC"}}),
   v("mech","Compensare mecanică","Robust, întreținere minimă","brake",{specs:{"Compensare săgeată":"Mecanică"}})],
  steps:[step("lung","Lungime și forță",{brake:1}),
   step("gros","Grosimea maximă a tablei",{o:["până la 3 mm","3 - 6 mm","6 - 10 mm","peste 10 mm"]}),
   step("opt","Opțiuni",{multi:1, o:["Set matrițe și poansoane suplimentare","Brațe suport față","Protecție laser la poanson",
    "Stabilizator de tensiune + protecție la suprasarcină","Instalare + training la sediu"]})],
  model:function (A) { return "bendIT dbE it " + (!A.lung ? "…" : /^Altă/.test(A.lung) ? "(la cerere)" : A.lung.replace(/ m \/ /, "-").replace(" t", "")); },
  link:function () { return "abkant-393"; }},
 {id:"hbeam", n:"debitare heavy / H-beam 3D", d:"Grinzi H, profile mari, 7 axe. La cerere", g:"hbeam",
  variants:[v("h7","3D 7 axe","Teșire și tăiere 3D pe grinzi H, U, I","hbeam",{specs:{"Viteză tăiere":"80 m/min","Precizie poziționare":"±0.15 mm","Grosime":"0–50 mm"}})],
  steps:[step("masa","Dimensiunea de lucru",{o:["14000 x 3200 mm","26000 x 2500 mm","26000 x 3200 mm"]}), S_MAT, S_TH, S_KW,
   step("opt","Opțiuni",{multi:1, o:["Alimentare semi-automată","Construcție în consolă (pe o parte)"].concat(EXTRA_LASER)})],
  std:"Cap 3D pentru teșire · Sursă Raycus · Structură portal",
  model:function (A) { return "MLT 3D H-BEAM 7 axe " + (A.masa || "").replace(" mm", ""); }},
 {id:"gen", n:"Generatoare", d:"Pentru casă (inverter) și industriale (diesel 22–2500 kVA)", g:"gen_ind",
  variants:[
   v("home","Pentru casă","Inverter pe benzină, silențios, sigur pentru electronice. 1–8 kW","gen_home"),
   v("ind","Industrial","Diesel trifazat, staționar insonorizat sau pe remorcă. 22–2500 kVA","gen_ind",{tag:"TOP"})],
  steps:[step("pw","Puterea",{only:"home", o:HOME_PW}),
   step("ce","Ce vrei să alimentezi?",{only:"home", multi:1, o:["Frigider / congelator","Centrală termică","Pompă de apă","Iluminat, TV, internet","Scule electrice","Rulotă / camping"]}),
   step("opth","Opțiuni",{only:"home", multi:1, o:["Kit de cuplare în paralel (2 generatoare)","Comutator manual rețea / generator","Husă de protecție","Ulei + kit de întreținere"]}),
   step("exec","Execuție",{only:"ind", o:["Staționar, carcasă insonorizată","Mobil, pe remorcă"], img:{"Staționar, carcasă insonorizată":"gen_ind","Mobil, pe remorcă":"gen_mob"}}),
   step("uz","Cum îl folosești?",{only:"ind", o:["Rezervă la căderea rețelei","Sursă principală (fără rețea)","Șantier / evenimente"]}),
   step("kva","Puterea maximă (kVA, standby)",{only:"ind", o:function (A) {
     // pe remorca: pana la 500 kVA
     return Object.keys(GEN).filter(function (k) { return !isMob(A) || +k <= 500; }).map(function (k) { return k + " kVA"; }).concat([NUSTIU]); }}),
   step("ats","Pornire",{only:"ind", o:["Automată la căderea rețelei (ATS)","Manuală / din panou"], rec:function (A) { return /^Rezervă/.test(A.uz || "") ? "Automată la căderea rețelei (ATS)" : null; }}),
   step("opt","Opțiuni",{only:"ind", multi:1, o:["Rezervor extins (autonomie mai mare)","Monitorizare la distanță (GSM / internet)","Încălzitor motor pentru iarnă",
    "Tablou de comutare și cablare","Contract de mentenanță","Instalare + punere în funcțiune"]})],
  std:function (A) { return isGenInd(A) ? "Motor diesel răcit cu apă · Alternator clasa H · Controller digital cu protecții · 400/230 V, 50 Hz, cos φ 0,8"
    : "Tensiune stabilă (inverter), sigură pentru electronice · Ieșire USB 5 V · Varianta 230 V / 50 Hz pentru România"; },
  ce:function (A) { return isGenInd(A) ? "CE · ISO 9001 / 14001" : null; },
  model:function (A) {
   if (!isGenInd(A)) return "MLT INVERTER " + (A.pw || "");
   var k = parseFloat(A.kva || ""); return "MLT POWER " + (k ? k + " kVA" : "(la cerere)") + (isMob(A) ? " MOBIL" : ""); },
  extra:function (A) {
   if (!isGenInd(A)) { var hs = HOME_SPEC[A.pw]; return hs ? Object.keys(hs).map(function (k) { return [k, hs[k]]; }) : []; }

   var k = parseFloat(A.kva || ""), g = GEN[k]; if (!g) return [];
   var r = [["Putere continuă (prime)", fmt(g[0]) + " kVA / " + fmt(g[0] * 0.8) + " kW"], ["Putere maximă (standby)", k + " kVA / " + fmt(k * 0.8) + " kW"],
    ["Consum la 100% / 50% sarcină", fmt(g[1]) + " / " + fmt(g[2]) + " l/h"]];
   if (g[3]) r.push(["Rezervor", g[3].toLocaleString("ro-RO") + " l"], ["Autonomie la 75% sarcină", ore(g[3] / ((g[1] + g[2]) / 2))], ["Autonomie la 50% sarcină", ore(g[3] / g[2])]);
   else r.push(["Rezervor", "extern, dimensionat la cerere"]);
   if (g[4]) r.push(["Dimensiuni (L x l x H)", g[4] + " mm"], ["Greutate fără combustibil", g[5].toLocaleString("ro-RO") + " kg"]);
   return r; },
  link:function (A) { return isGenInd(A) ? "generatoare-396" : null; }},
 {id:"fork", n:"Motostivuitor / stivuitor", d:"Diesel, GPL, electric, 1–55 t", g:"forklift",
  variants:[
   v("d","Diesel","Exterior, curți, șantiere, program lung. 1,5–5 t","forklift_d",{tag:"TOP",specs:{"Motor":"Diesel, Euro III / Euro V / EPA"}}),
   v("g","Benzină / GPL","Interior și exterior, cost mic de operare. 1,5–4 t","forklift_gpl",{specs:{"Motor":"Benzină / GPL"}}),
   v("e4","Electric 4 roți","Hale și depozite, fără noxe, silențios. 2–5 t","forklift_e4",{specs:{"Acționare":"Motor AC, baterie litiu sau plumb-acid"}}),
   v("e3","Electric 3 roți","Compact, rază mică de virare, spații înguste. 1–2 t","forklift_e3",{specs:{"Acționare":"Motor AC, baterie litiu sau plumb-acid"}}),
   v("hd","Diesel greu","Containere, piatră, oțel. 6–12 t","forklift_hd",{specs:{"Motor":"Diesel"}}),
   v("hdx","Diesel foarte greu","Porturi, cariere, oțelării. 13–55 t","forklift_hdx",{specs:{"Motor":"Diesel"}}),
   v("st","Stivuitor electric de paleți","Pentru teren accidentat, cu operator pe jos. 1–1,5 t","forklift_st",{specs:{"Acționare":"Electrică"}})],
  steps:[step("cap","Capacitatea de ridicare",{o:function (A) { return FORK_CAP[A.variant] || []; }}),
   step("h","Înălțimea de ridicare",{not:"st", o:function (A) { return /^hd/.test(A.variant) ? ["3 m (standard)","4 m","5 m","6 m"] : ["3 m (standard)","4 m","4,5 m","5 m","6 m","7 m"]; }}),
   step("teren","Unde lucrează?",{not:"st", o:["Interior – pardoseală","Exterior – asfalt / beton","Teren accidentat"]}),
   step("opt","Opțiuni",{multi:1, o:["Side-shift (deplasare laterală furci)","Poziționer furci","Catarg triplex cu ridicare liberă","Furci lungi",
    "Cabină închisă","Anvelope superelastice","Lumini de lucru + girofar"]})],
  std:"Contragreutate · Catarg duplex standard · Culori și siglă MLT",
  model:function (A) { return "MLT " + ({d:"FORKLIFT DIESEL", g:"FORKLIFT GPL", e4:"FORKLIFT ELECTRIC", e3:"FORKLIFT ELECTRIC 3W", hd:"FORKLIFT DIESEL HD",
    hdx:"FORKLIFT DIESEL XHD", st:"STACKER"}[A.variant] || "") + " " + (A.cap || "").replace(" ", ""); },
  link:function () { return "motostivuitor-395"; }},
 {id:"solar", n:"Sistem fotovoltaic", d:"Calculat după consumul tău: putere, panouri, baterie", g:"solar",
  variants:[
   v("rez","Rezidențial","Casă: 150–1.500 kWh pe lună","solar",{tag:"TOP"}),
   v("com","Comercial","Firme, birouri, ateliere: 1.000–10.000 kWh pe lună","solar"),
   v("ind","Industrial","Hale și fabrici: peste 10.000 kWh pe lună","solar")],
  steps:[step("cons","Consumul lunar (din factură)",{o:function (A) {
     return (PV_CONS[A.variant] || []).map(function (x) { return x.toLocaleString("ro-RO") + " kWh"; }).concat([NUSTIU]); }}),
   step("bran","Branșament",{o:["Monofazic","Trifazic"], rec:function (A) { var p = pv(A); return p ? (p.kwp > 10 ? "Trifazic" : "Monofazic") : null; }}),
   step("bat","Baterie de stocare",{o:function (A) { return PV_BAT[A.variant] || []; }, rec:function (A) {
     var c = pvCons(A), o = PV_BAT[A.variant] || [], best = null, d = 1e9; if (!c) return null;
     o.forEach(function (x) { var k = parseFloat(x.replace(".", "")); if (k && Math.abs(k - c / 30 / 2) < d) { d = Math.abs(k - c / 30 / 2); best = x; } });
     return best; }}),
   step("mont","Tip montaj",{o:["Acoperiș țiglă","Acoperiș tablă / metal","Terasă","Pe sol"]}),
   step("opt","Opțiuni",{multi:1, o:["Backup la pană de curent (EPS)","Monitorizare din aplicație","Stație de încărcare mașină electrică",
    "Dosar prosumator + racordare","Instalare la cheie"]})],
  std:"Panouri monocristaline N-type 550 W · Invertor hibrid · Structură de montaj · Protecții AC / DC",
  ce:"CE",
  model:function (A) { var p = pv(A); return "MLT SOLAR " + (p ? fmt(p.kwp) + " kWp" : "(la cerere)") + (A.bat && !/^Fără/.test(A.bat) ? " + " + A.bat : ""); },
  extra:function (A) {
   var p = pv(A); if (!p) return [];
   return [["Putere sistem", fmt(p.kwp) + " kWp"], ["Panouri", p.n + " x 550 W"], ["Suprafață necesară", "aprox. " + Math.round(p.n * 2.6) + " m²"],
    ["Producție estimată", "aprox. " + Math.round(p.kwp * 100).toLocaleString("ro-RO") + " kWh / lună · " + Math.round(p.kwp * 1200).toLocaleString("ro-RO") + " kWh / an"],
    ["Invertor recomandat", "aprox. " + Math.max(3, Math.round(p.kwp / 1.1)) + " kW"]]; },
  link:function () { return "panouri-fotovoltaice-394"; }},
 {id:"ups", n:"UPS – stocare energie", d:"UPS online cu dublă conversie, 10–250 kVA", g:"ups",
  variants:[
   v("t3","Trifazat (intrare și ieșire 3/3)","Hale, utilaje CNC și laser, servere mari. 10–250 kVA","ups",{tag:"TOP"}),
   v("t1","Trifazat → monofazat (3/1)","Birouri, servere, consumatori monofazați. 20 kVA","ups")],
  steps:[step("kva","Puterea UPS-ului",{o:function (A) { return A.variant === "t1" ? ["20 kVA"] : UPS_KVA.map(function (k) { return k + " kVA"; }).concat([NUSTIU]); }}),
   step("apl","Ce protejezi?",{multi:1, o:["Utilaje CNC / laser","Servere și rețea IT","Clădiri, iluminat de siguranță","Echipamente medicale","Linii de producție"]}),
   step("aut","Autonomie dorită pe baterii",{o:["Standard (baterii interne)","15 minute","30 minute","60 minute","Peste 1 oră (baterii externe)"]}),
   step("opt","Opțiuni",{multi:1, o:["Baterii externe suplimentare","Bypass de mentenanță","Monitorizare în rețea (SNMP)","Funcționare în paralel (redundanță)",
    "Cuplare cu generator / fotovoltaic","Instalare + punere în funcțiune"]})],
  std:"UPS online cu dublă conversie · Display LCD · Protecție la suprasarcină și scurtcircuit · Bypass automat",
  ce:"CE",
  model:function (A) { return "MLT UPS " + (A.variant === "t1" ? "3/1 " : "3/3 ") + (parseFloat(A.kva || "") ? parseFloat(A.kva) + " kVA" : "(la cerere)"); }}
];
// abkant: forta (t), lungime (mm), motor (kW), greutate (kg) - din fisa tehnica
var BRAKES = [[50,1600,5.5,4000],[70,2500,7.9,6500],[100,3200,7.9,9300],[100,4100,7.9,11000],[160,4100,11,13800],
  [200,4100,15,14800],[200,6100,15,20500],[250,4100,18.5,15000],[400,4100,45,32600],[500,6100,63,51000]];
function brakeLbl(b) { return (b[1] / 1000 + "").replace(".", ",") + " m / " + b[0] + " t"; }

/* ================= LOGICA ================= */
var st = {tip: null, i: -1, A: {}, frame: 1, group: "start"};
function tip() { return T.filter(function (t) { return t.id === st.tip; })[0]; }
function variant() { var t = tip(); return t && t.variants.filter(function (x) { return x.id === st.A.variant; })[0]; }
function steps() {
  var t = tip(); if (!t) return [];
  function on(x) { return [].concat(x).indexOf(st.A.variant) > -1; }
  return t.steps.filter(function (s) { return (!s.only || on(s.only)) && (!s.not || !on(s.not)); });
}
function armored() { return st.A.variant === "arm"; }
function kwTxt(w) { return (w / 1000 + "").replace(".", ",") + " kW"; }
function recKw() {
  var m = PW[st.A.mat] || PW["Oțel carbon"], g = parseFloat((st.A.gros || "").replace(/^peste (\d+)/, "$1.1"));
  if (!g) return null;
  var k = Object.keys(m).map(Number).sort(function (a, b) { return a - b; });
  for (var j = 0; j < k.length; j++) if (g <= k[j]) return kwTxt(m[k[j]]);
  return "30 kW";
}
function options(s) {
  var t = tip();
  if (s.laserTh) {
    var m = PW[st.A.mat] || PW["Oțel carbon"], o = [];
    Object.keys(m).map(Number).sort(function (a, b) { return a - b; }).forEach(function (g) {
      if (!(t.rover && !armored()) || m[g] <= 6000) o.push(g % 1 ? "peste " + Math.floor(g) + " mm" : g + " mm");
    });
    o.push("Nu știu încă"); return o;
  }
  if (s.laserKw) {
    return KW.filter(function (x) {
      var w = parseFloat(x.replace(",", "."));
      return !t.rover || (armored() ? w > 6 : w <= 6);
    }).concat([NUSTIU]);
  }
  if (s.brake) return BRAKES.map(brakeLbl).concat(["Altă dimensiune - la cerere"]);
  if (typeof s.o === "function") return s.o(st.A);
  // varianta deschisa nu are cabina, video sau masa de schimb
  if (s.k === "opt" && t.rover && !armored()) return s.o.filter(function (x) { return !/cabin|video|schimb/i.test(x); });
  return s.o;
}
function recFor(s) { return s.laserKw ? recKw() : s.rec ? s.rec(st.A) : null; }
function model() { var t = tip(); return t && st.A.variant ? t.model(st.A) : ""; }
function rezumat() {
  var t = tip(), r = ["Utilaj: " + t.n + " · " + variant().t, "Model recomandat: " + model()];
  steps().forEach(function (s) { if (st.A[s.k]) r.push(s.t + ": " + st.A[s.k]); });
  return r;
}

/* ================= STIL ================= */
var CSS = ""
+ ":host{all:initial;display:block;--bg:#0b0d0a;--panel:#12160f;--panel2:#181e14;--line:#2c3824;--line2:#3d4d31;--olive:#5f7a3d;--olive2:#86a85a;--accent:#b8d86b;--amber:#e0a83a;--text:#e6ebdf;--muted:#8f9a84;"
+ "--mono:'Share Tech Mono',monospace;--head:'Rajdhani',sans-serif;--body:'Inter',system-ui,sans-serif}"
+ "*{box-sizing:border-box}"
+ ".root{position:relative;container-type:inline-size;background:var(--bg);color:var(--text);font-family:var(--body);font-size:15px;line-height:1.4;"
+ "background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:48px 48px;overflow:hidden}"
+ ".root::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%,rgba(11,13,10,.55),rgba(11,13,10,.96) 70%);pointer-events:none}"
+ ".wrap{position:relative;padding:20px 22px 30px}"
+ "header{display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line2);padding-bottom:14px;margin-bottom:18px}"
+ ".brand{display:flex;align-items:center;gap:14px}"
+ ".badge{width:46px;height:46px;border:2px solid var(--olive2);display:grid;place-items:center;font-family:var(--head);font-weight:700;color:var(--accent);clip-path:polygon(15% 0,85% 0,100% 15%,100% 85%,85% 100%,15% 100%,0 85%,0 15%);background:var(--panel2)}"
+ ".brand h1{margin:0;font-family:var(--head);font-size:24px;letter-spacing:2px;text-transform:uppercase;color:var(--text);line-height:1.1}"
+ ".brand small{display:block;font-family:var(--mono);color:var(--muted);font-size:12px;letter-spacing:1px}"
+ ".status{font-family:var(--mono);font-size:12px;color:var(--accent);display:flex;gap:18px;flex-wrap:wrap}"
+ ".status span::before{content:'';display:inline-block;width:7px;height:7px;background:var(--accent);margin-right:6px;border-radius:50%;box-shadow:0 0 8px var(--accent);animation:blink 1.6s infinite}"
+ "@keyframes blink{50%{opacity:.25}}"
+ ".grid{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(340px,1fr);gap:18px}"
+ ".viewer,.panel{min-width:0}"
+ ".viewer{position:relative;background:var(--panel);border:1px solid var(--line2);display:flex;flex-direction:column}"
+ ".hud{position:absolute;inset:10px;pointer-events:none}.hud i{position:absolute;width:22px;height:22px;border-color:var(--olive2);border-style:solid}"
+ ".hud i:nth-child(1){top:0;left:0;border-width:2px 0 0 2px}.hud i:nth-child(2){top:0;right:0;border-width:2px 2px 0 0}"
+ ".hud i:nth-child(3){bottom:0;left:0;border-width:0 0 2px 2px}.hud i:nth-child(4){bottom:0;right:0;border-width:0 2px 2px 0}"
+ ".vtop{display:flex;justify-content:space-between;gap:10px;padding:18px 26px 0;font-family:var(--mono);font-size:12px;color:var(--muted);letter-spacing:1px}.vtop b{color:var(--accent);font-weight:400}"
+ ".stage{position:relative;cursor:grab;user-select:none;touch-action:pan-y;display:grid;place-items:center;padding:10px 26px;height:420px;"
+ "background:radial-gradient(ellipse at 50% 60%,#e9ece4 0%,#cfd5c6 55%,#9aa38f 100%);margin:14px 26px 0;border:1px solid var(--line2);overflow:hidden}"
+ ".stage:active{cursor:grabbing}.stage img{width:100%;height:100%;min-height:0;object-fit:contain;filter:drop-shadow(0 18px 18px rgba(0,0,0,.25))}"
+ ".hint{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:11px;color:#3b4630;background:rgba(255,255,255,.6);padding:4px 10px;letter-spacing:1px;white-space:nowrap}"
+ ".scan{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);opacity:0;top:0}"
+ ".stage.swap .scan{animation:scan .7s ease-out}@keyframes scan{0%{top:0;opacity:.9}100%{top:100%;opacity:0}}"
+ ".thumbs{display:flex;gap:8px;padding:12px 26px 22px;overflow-x:auto}"
+ ".thumbs button{flex:0 0 auto;width:78px;height:56px;border:1px solid var(--line2);background:#d9ddd2;padding:3px;cursor:pointer}"
+ ".thumbs button img{width:100%;height:100%;object-fit:contain}.thumbs button.on{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}"
+ ".vname{padding:0 26px;font-family:var(--head);font-size:28px;font-weight:700;letter-spacing:1px;margin-top:8px;line-height:1.15}"
+ ".vcode{padding:2px 26px 0;font-family:var(--mono);color:var(--amber);font-size:14px;letter-spacing:2px}"
+ ".panel{background:var(--panel);border:1px solid var(--line2);padding:22px;display:flex;flex-direction:column}"
+ ".progress{display:flex;gap:4px;margin-bottom:16px}.progress div{flex:1;height:5px;background:var(--line)}"
+ ".progress div.done{background:var(--olive2)}.progress div.cur{background:var(--accent);box-shadow:0 0 8px var(--accent)}"
+ ".stepno{font-family:var(--mono);color:var(--muted);font-size:12px;letter-spacing:2px}"
+ ".panel h2{font-family:var(--head);font-size:26px;margin:4px 0;letter-spacing:.5px;color:var(--text);line-height:1.15}"
+ ".sub{color:var(--muted);margin:0 0 16px;font-size:14px}.warn{color:var(--amber)}"
+ ".opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}"
+ ".opt{position:relative;text-align:left;background:var(--panel2);border:1px solid var(--line2);color:var(--text);padding:12px;cursor:pointer;font:inherit;font-size:14px;display:flex;flex-direction:column;gap:6px;transition:border-color .15s,transform .15s}"
+ ".opt:hover{border-color:var(--olive2);transform:translateY(-1px)}.opt.sel{border-color:var(--accent);background:#1f2818}"
+ ".opt .t{font-weight:600}.opt .d{color:var(--muted);font-size:12.5px;line-height:1.35}"
+ ".opt .pic{height:84px;background:#d9ddd2;display:grid;place-items:center;margin:-4px -4px 4px}.opt .pic img{max-width:100%;max-height:80px;object-fit:contain}"
+ ".tag{position:absolute;top:8px;right:8px;font-family:var(--mono);font-size:10px;background:var(--amber);color:#1a1300;padding:2px 6px;letter-spacing:1px}"
+ ".opts.chips{grid-template-columns:repeat(auto-fill,minmax(110px,1fr))}.opts.chips .opt{align-items:center;text-align:center;font-family:var(--mono)}"
+ ".opt .rec{font-family:var(--mono);font-size:11px;color:var(--accent)}"
+ ".opt.multi::before{content:'';position:absolute;top:12px;right:12px;width:14px;height:14px;border:1px solid var(--olive2)}"
+ ".opt.multi{padding-right:34px}.opt.multi.sel::before{background:var(--accent);box-shadow:inset 0 0 0 3px var(--panel2)}"
+ ".nav{display:flex;justify-content:space-between;gap:10px;margin-top:auto;padding-top:18px;flex-wrap:wrap}.nav span{display:flex;gap:8px;flex-wrap:wrap}"
+ ".btn{font-family:var(--head);font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-size:15px;padding:11px 16px;white-space:nowrap;text-decoration:none;border:1px solid var(--line2);background:transparent;color:var(--text);cursor:pointer;display:inline-block;line-height:1.2}"
+ ".btn:hover{border-color:var(--olive2)}.btn.go{background:var(--olive);border-color:var(--olive2);color:#fff}.btn.go:hover{background:var(--olive2)}"
+ ".btn.wa{background:#25d366;border-color:#25d366;color:#05210f}"
+ ".sheet{border:1px solid var(--line2);background:var(--panel2);padding:16px;position:relative}"
+ ".stamp{position:absolute;top:12px;right:12px;transform:rotate(8deg);border:2px solid var(--amber);color:var(--amber);font-family:var(--head);font-weight:700;padding:3px 10px;letter-spacing:2px;font-size:13px}"
+ ".sheet h3{margin:0 0 2px;font-family:var(--mono);color:var(--muted);font-size:12px;letter-spacing:2px;font-weight:400}"
+ ".code{font-family:var(--head);font-weight:700;font-size:26px;color:var(--accent);letter-spacing:1px;padding-right:110px;line-height:1.15}"
+ ".rows{margin-top:10px;display:grid;grid-template-columns:auto 1fr}.rows div{padding:7px 0;border-bottom:1px dashed var(--line2);font-size:13.5px}"
+ ".rows div:nth-child(odd){font-family:var(--mono);color:var(--muted);padding-right:14px;font-size:12px;letter-spacing:.5px;text-transform:uppercase}"
+ ".note{font-size:12px;color:var(--muted);margin-top:10px}"
+ ".lead{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:14px}"
+ ".lead input{background:var(--panel2);border:1px solid var(--line2);color:var(--text);padding:11px;font:inherit;font-size:14px;width:100%}"
+ ".lead input:focus{outline:none;border-color:var(--olive2)}.lead input.bad{border-color:#c0392b}"
+ ".ok{color:var(--accent);font-weight:600}"
+ ".grid.home{grid-template-columns:minmax(0,1fr)}.grid.home .viewer{display:none}.grid.home .opts{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:1fr}"
+ "@container (max-width:1050px){.grid.home .opts{grid-template-columns:repeat(3,minmax(0,1fr))}}"
+ "@container (max-width:760px){.grid.home .opts{grid-template-columns:repeat(2,minmax(0,1fr))}}"
+ "@container (max-width:900px){.grid{grid-template-columns:minmax(0,1fr)}.stage{height:300px}}"
+ "@container (max-width:560px){.wrap{padding:14px 12px 24px}.opts,.lead{grid-template-columns:1fr}.vname{font-size:22px}.status{display:none}"
+ ".vtop,.vname,.vcode{padding-left:14px;padding-right:14px}.stage{margin:12px 12px 0;padding:8px;height:240px}.thumbs{padding:10px 12px 16px}.panel{padding:16px}.hint{font-size:9px}}";

/* ================= RANDARE ================= */
var host, root, $;
function src(g, i) { return IMG + g + "/" + (i < 10 ? "0" : "") + i + ".webp"; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
function setGroup(g) { if (st.group === g) return; st.group = g; st.frame = 1; viewer(true); }
function viewer(anim) {
  var n = FRAMES[st.group], img = $("#mainImg"), t = tip(), v = variant();
  img.src = src(st.group, st.frame);
  $("#frameLbl").textContent = (st.frame < 10 ? "0" : "") + st.frame + "/" + (n < 10 ? "0" : "") + n;
  // pe ecranul de start (colajul) nu e nimic de rotit
  $(".hint").textContent = st.group === "start" ? "↓ ALEGE MAI JOS CE UTILAJ TE INTERESEAZĂ" : "⟲ TRAGE CU MOUSE-UL SAU DEGETUL PENTRU A ROTI";
  var h = ""; for (var i = 1; i <= n; i++) h += '<button class="' + (i === st.frame ? "on" : "") + '" data-f="' + i + '" aria-label="Unghi ' + i + '"><img src="' + src(st.group, i) + '" alt="" loading="lazy"></button>';
  $("#thumbs").innerHTML = h;
  if (anim) { var s = $("#stage"); s.classList.remove("swap"); void s.offsetWidth; s.classList.add("swap"); }
  for (var j = 1; j <= n; j++) { var p = new Image(); p.src = src(st.group, j); }
  $("#vName").textContent = v ? v.t : t ? t.n : "Alege tipul de utilaj";
  $("#vCode").textContent = model() || "MLT";
  $("#cfgLbl").textContent = st.i >= steps().length ? "CONFIGURAȚIE COMPLETĂ" : "CONFIGURAȚIE ÎN LUCRU";
}
function progress(total) {
  var cur = st.tip ? st.i + 2 : 0, h = '<div class="progress">';
  for (var i = 0; i < total; i++) h += '<div class="' + (i < cur ? "done" : i === cur ? "cur" : "") + '"></div>';
  return h + "</div>";
}
function head(title, sub) {
  var total = st.tip ? steps().length + 2 : 1, n = st.tip ? st.i + 2 : 1;
  return progress(total) + '<div class="stepno">PAS ' + (n < 10 ? "0" : "") + n + " / " + (total < 10 ? "0" : "") + total + "</div><h2>" + title + "</h2>" + (sub ? '<p class="sub">' + sub + "</p>" : "");
}
function nav(next, label) {
  return '<div class="nav">' + (st.tip ? '<span><button class="btn" data-act="home" title="Înapoi la început">⌂ Home</button><button class="btn" data-act="back">← Înapoi</button></span>' : "<span></span>")
    + (next ? '<button class="btn go" data-act="next">' + (label || "Continuă") + " →</button>" : "") + "</div>";
}
function card(attr, val, sel, inner, cls) { return '<button class="opt ' + (cls || "") + (sel ? " sel" : "") + '" data-' + attr + '="' + esc(val) + '">' + inner + "</button>"; }
function panel() {
  var p = $("#panel"), t = tip(), ss = steps();
  if (!t) {
    p.innerHTML = head("Ce utilaj te interesează?", "Alege categoria de mai jos și configurezi utilajul pas cu pas.")
      + '<div class="opts">' + T.map(function (x, k) { return card("t", k, false, '<div class="pic"><img src="' + src(x.g, 1) + '" alt=""></div><span class="t">' + x.n + '</span><span class="d">' + x.d + "</span>"); }).join("") + "</div>";
    return;
  }
  if (st.i < 0) {
    p.innerHTML = head("Varianta", "Vezi fiecare variantă în imagine înainte să alegi.")
      + '<div class="opts">' + t.variants.map(function (x) { return card("var", x.id, st.A.variant === x.id, (x.tag ? '<span class="tag">' + x.tag + "</span>" : "") + '<div class="pic"><img src="' + src(x.g, 1) + '" alt=""></div><span class="t">' + x.t + '</span><span class="d">' + x.d + "</span>"); }).join("") + "</div>" + nav(false);
    return;
  }
  if (st.i < ss.length) {
    var s = ss[st.i], o = options(s), r = recFor(s), cur = (st.A[s.k] || "").split("; "), chips = o.every(function (x) { return x.length < 16; });
    var sub = s.multi ? "Poți alege mai multe." : r ? 'Recomandat: <b class="ok">' + r + "</b> (orientativ, din tabelul nostru kW/mm)." : "";
    if (s.laserTh && t.rover && !armored()) sub = "Varianta deschisă merge până la 6 kW. Pentru grosimi mai mari alege varianta protejată (ARMORED).";
    p.innerHTML = head(s.t, sub) + '<div class="opts' + (chips && !s.multi ? " chips" : "") + '">'
      + o.map(function (x) { return card("v", x, cur.indexOf(x) > -1, '<span class="t">' + x + "</span>" + (r && x === r ? '<span class="rec">✔ recomandat</span>' : ""), s.multi ? "multi" : ""); }).join("")
      + "</div>" + nav(!!s.multi, s.k === "opt" ? "Vezi configurația" : "Continuă");
    return;
  }
  // configuratia finala
  var v = variant(), rows = [];
  rezumat().slice(2).forEach(function (l) { var x = l.split(": "); rows.push([x[0], x.slice(1).join(": ")]); });
  if (t.id === "brake") { var b = BRAKES.filter(function (x) { return brakeLbl(x) === (st.A.lung || ""); })[0];
    if (b) rows.push(["Motor principal", b[2] + " kW"], ["Greutate", b[3].toLocaleString("ro-RO") + " kg"]); }
  if (t.extra) t.extra(st.A).forEach(function (x) { rows.push(x); });
  Object.keys(v.specs || {}).forEach(function (k) { rows.push([k, v.specs[k]]); });
  var std = typeof t.std === "function" ? t.std(st.A) : t.std, ce = typeof t.ce === "function" ? t.ce(st.A) : t.ce, lnk = t.link && t.link(st.A);
  if (std && st.A.variant !== "mlc") rows.push(["Configurație standard", std]);
  if (ce !== null) rows.push(["Certificare", ce || CE]);
  p.innerHTML = progress(ss.length + 2) + '<div class="stepno">CONFIGURAȚIE FINALIZATĂ</div><h2>Configurația ta</h2>'
    + '<div class="sheet">' + (ce !== null ? '<div class="stamp">CE CERTIFIED</div>' : "") + '<h3>MODEL RECOMANDAT</h3><div class="code">' + esc(model()) + "</div>"
    + '<div class="rows">' + rows.map(function (x) { return "<div>" + esc(x[0]) + "</div><div>" + esc(x[1]) + "</div>"; }).join("") + "</div>"
    + '<div class="note">Toate utilajele se configurează la comandă. Recomandarea e orientativă - confirmăm configurația exactă împreună.</div></div>'
    + '<div class="lead"><input id="cf-t" type="tel" placeholder="Telefon (pentru Te sunăm)"><input id="cf-n" placeholder="Nume și firmă"><input id="cf-l" placeholder="Localitate"></div>'
    + '<div class="nav"><span><button class="btn" data-act="home">⌂ Home</button><button class="btn" data-act="back">← Modifică</button></span><span id="send">'
    + (lnk ? '<a class="btn" target="_blank" href="/cumpara/' + lnk + '">Vezi utilajul</a>' : "")
    + '<a class="btn wa" data-send="wa" target="_blank" rel="noopener">WhatsApp</a><a class="btn go" data-send="call" href="#">Te sunăm noi</a><a class="btn" data-send="mail" title="' + MAIL + '">Email</a></span></div>';
}
function render() {
  // pe ecranul de start nu e nimic de vizualizat: ramane doar lista de categorii, pe toata latimea
  root.querySelector(".grid").classList.toggle("home", !st.tip);
  panel(); viewer();
}

/* trimite cererea prin formularul de contact al site-ului, fara sa paraseasca pagina ([MLT-OK] = trece de filtrul Gmail) */
function lead(msg, tel, name, cb) {
  fetch("/contact", {credentials: "same-origin"}).then(function (r) { return r.text(); }).then(function (h) {
    var f = new DOMParser().parseFromString(h, "text/html").getElementById("customer_contact"); if (!f) throw 0;
    var fd = new FormData(), rs = "";
    [].forEach.call(f.elements, function (e) { if (e.name && e.type !== "checkbox") fd.set(e.name, e.value); });
    var sel = f.querySelector('select[name="customer_contact[reason]"]');
    if (sel) [].forEach.call(sel.options, function (o) { if (o.value && (!rs || /produs/i.test(o.text))) rs = o.value; });
    fd.set("customer_contact[name]", name || "Client configurator"); fd.set("customer_contact[email]", MAIL);
    fd.set("customer_contact[phone]", tel); fd.set("customer_contact[company]", (name ? name + " " : "") + "[MLT-OK]");
    fd.set("customer_contact[reason]", rs); fd.set("customer_contact[message]", msg); fd.set("customer_contact[agree_terms]", "1");
    return fetch(f.getAttribute("action") || "/contact", {method: "POST", body: fd, credentials: "same-origin"});
  }).then(function (r) { cb(r.ok); }).catch(function () { cb(false); });
}

function onClick(e) {
  var b = e.target.closest("button,a"); if (!b) return;
  var d = b.dataset, t = tip();
  if (d.f) { st.frame = +d.f; return viewer(); }
  if (d.t != null) { st.tip = T[+d.t].id; st.i = -1; st.A = {}; setGroup(tip().g); return render(); }
  if (d.var != null) { if (st.A.variant !== d.var) st.A = {}; st.A.variant = d.var; setGroup(variant().g); st.i = 0; return render(); }
  if (d.v != null) {
    var s = steps()[st.i];
    if (s.multi) { var a = st.A[s.k] ? st.A[s.k].split("; ") : [], j = a.indexOf(d.v); j > -1 ? a.splice(j, 1) : a.push(d.v); st.A[s.k] = a.join("; "); b.classList.toggle("sel"); return; }
    st.A[s.k] = d.v;
    if (s.img && s.img[d.v]) setGroup(s.img[d.v]);
    if (s.k === "mat") { delete st.A.gros; delete st.A.kw; }
    if (s.k === "gros") delete st.A.kw;
    st.i++; return render();
  }
  if (d.act === "next") { st.i++; return render(); }
  if (d.act === "back") { if (st.i >= 0) st.i--; else st.tip = null; if (!st.tip) setGroup("start"); else if (st.i < 0) setGroup(tip().g); return render(); }
  if (d.act === "home") { st.tip = null; st.i = -1; st.A = {}; setGroup("start"); render(); host.scrollIntoView({behavior: "smooth", block: "start"}); return; }
  if (d.send) {
    var f = $("#cf-t"), tel = f.value.trim(), n = $("#cf-n").value, l = $("#cf-l").value;
    var txt = "Bună ziua! Am configurat pe site un utilaj:\n" + rezumat().join("\n") + (tel ? "\nTelefon: " + tel : "") + (n ? "\nNume/firmă: " + n : "") + (l ? "\nLocalitate: " + l : "") + "\nVă rog să mă sunați cu oferta. Mulțumesc!";
    if (d.send === "wa") b.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(txt);
    if (d.send === "mail") b.href = "mailto:" + MAIL + "?subject=" + encodeURIComponent("Configurator: " + model()) + "&body=" + encodeURIComponent(txt);
    if (d.send === "call") {
      e.preventDefault();
      if (tel.replace(/\D/g, "").length < 9) { f.classList.add("bad"); f.placeholder = "Scrie telefonul ca să te sunăm"; f.focus(); return; }
      b.textContent = "Se trimite...";
      lead(txt, tel, n, function (ok) { $("#send").innerHTML = '<b class="ok">' + (ok ? "✔ Mulțumim! Te sunăm în curând." : "Nu s-a putut trimite - scrie-ne pe WhatsApp.") + "</b>"; });
    }
  }
}
function drag() {
  var s = $("#stage"), x0 = null, f0 = 1;
  s.addEventListener("pointerdown", function (e) { x0 = e.clientX; f0 = st.frame; s.setPointerCapture(e.pointerId); });
  s.addEventListener("pointermove", function (e) {
    if (x0 === null) return; var n = FRAMES[st.group], k = Math.round((e.clientX - x0) / 70), f = ((f0 - 1 - k) % n + n) % n + 1;
    if (f !== st.frame) { st.frame = f; viewer(); }
  });
  s.addEventListener("pointerup", function () { x0 = null; }); s.addEventListener("pointercancel", function () { x0 = null; });
}

/* ================= PORNIRE ================= */
// pagina se ascunde pana apare configuratorul, ca sa nu clipeasca continutul vechi
var pre = document.createElement("style");
pre.textContent = ".page__static-content,.page__content{visibility:hidden}.page__static-content:has(#mlt-cfg),.page__content:has(#mlt-cfg){visibility:visible}#mlt-cfg{display:block;max-width:1440px;margin:0 auto}";
document.head.appendChild(pre);
if (!document.querySelector('link[href*="Rajdhani"]')) {
  var fl = document.createElement("link"); fl.rel = "stylesheet";
  fl.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&family=Inter:wght@400;500;600&display=swap";
  document.head.appendChild(fl);
}
function init() {
  if (host) return;
  var el = document.getElementById("mlt-cfg");
  if (!el) { var pc = document.querySelector(".page__static-content,.page__content"); if (!pc) return; pc.innerHTML = '<div id="mlt-cfg"></div>'; el = pc.firstChild; }
  if (el.dataset.ok) return; el.dataset.ok = 1; host = el;
  root = el.attachShadow({mode: "open"});
  $ = function (q) { return root.querySelector(q); };
  root.innerHTML = "<style>" + CSS + "</style>"
    + '<div class="root"><div class="wrap"><header><div class="brand"><div class="badge">MLT</div><div><h1>Configurator utilaj</h1><small>MILITARY LASER TECH · USA</small></div></div>'
    + '<div class="status"><span>CE CERTIFIED</span><span>FABRICAT PE LINIE PROPRIE</span></div></header>'
    + '<div class="grid"><section class="viewer"><div class="hud"><i></i><i></i><i></i><i></i></div>'
    + '<div class="vtop"><span>VIZUALIZARE 360° · <b id="frameLbl">01/06</b></span><span id="cfgLbl">CONFIGURAȚIE ÎN LUCRU</span></div>'
    + '<div class="stage" id="stage"><img id="mainImg" alt="Utilaj MLT" draggable="false"><div class="scan"></div><div class="hint">⟲ TRAGE CU MOUSE-UL SAU DEGETUL PENTRU A ROTI</div></div>'
    + '<div class="vname" id="vName"></div><div class="vcode" id="vCode"></div><div class="thumbs" id="thumbs"></div></section>'
    + '<section class="panel" id="panel"></section></div></div></div>';
  root.addEventListener("click", onClick);
  drag(); render();
}
init(); document.addEventListener("DOMContentLoaded", init); window.addEventListener("load", init);
})();
