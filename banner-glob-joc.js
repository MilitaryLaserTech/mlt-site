/* Joc pe bannerul glob MLT. Langa luneta scrie: SEARCHING TARGET / TINTA FIXATA (peste un utilaj) / CONTACT BASE (peste o sigla).
   Tragi (click): fascicul laser din vultur, utilajul zboara pe ecran si aterizeaza pe USCAT pe fata globului, cu flash;
   acolo apare cardul READY FOR DELIVERY + bonusul MLT-TARGET (kit consumabile gratuit + oferta in 24h), cu butoane spre
   configurator (utilajul ales) si WhatsApp. La 3 s dupa tragere, din sigla Military Laser Tech iese pe orbita ALT produs
   (unul care nu e deja pe orbita). Se pune ca "Scripturi custom". */
(function () {
  var RESTOCK = 3000;  // dupa cat timp iese din vultur produsul nou (ms)
  var WA = 'https://wa.me/40730466920?text=';
  var BASE = { e: 'MILITARY LASER TECH', m: 'MLT', b: 'bendIT' };
  var CFG = 'https://www.militarylasertech.com/info/configurator-utilaj?tip=';
  var CLD = 'https://res.cloudinary.com/dgauuodyr/image/upload/h_160/';
  var UTM = '&utm_source=banner-joc&utm_medium=hero';   // ca sa se vada in statistici clickurile din banner
  // produse in plus, care nu sunt pe orbita la inceput: asa produsul care iese e mereu altul
  var EXTRA = [
    { src: CLD + 'v1793836547/mlt-site/inel-robot.webp', href: CFG + 'robot' + UTM, title: 'Robot sudura', label: 'Robot sudură' },
    { src: CLD + 'v1793836549/mlt-site/inel-cabinet.webp', href: CFG + 'weld' + UTM, title: 'Sudura si curatare laser', label: 'Sudură / curățare laser' }
  ];
  // harta uscat/apa 180x90 (2 grade/celula, bit 1 = uscat), din Natural Earth
  var MASK = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4n38AP//gAAAAAMBD///8DAAAADwACfw3/gP//gAAA4AMH///////gAAf////59jwH/+AAAP/gA//////////8P//////h+H/gAAAf/z///////////M///////n8D8A+AA+/f///////////AP/////4g4D4AAAH9/////////////Af/////gHgA4AAAP5///////////PwAHgP///gH0AAAAAH4/////////+CMAADAB///4H+AAAAGCx/////////8A8AAAAA////n/gAAAODj/////////wA4AAAAAf///v/wAAAbP///////////AwAAAAAP/////wAAAH////////////AAAAAAAH////8YAAAB///////////9AAAAAAAD////8EAAAB///////////9AAAAAAAD////+AAAAB//5fP//////4AAAAAAAD////gAAAAPxvwPP//////jAAAAAAAD////AAAAAfib//n/////+CAAAAAAAD///+AAAAAfADf/n////+MCAAAAAAAB///8AAAAAOeRP/3/////mOAAAAAAAA///8AAAAAH+AA///////E8AAAAAAAAf//wAAAAAP/gB///////hgAAAAAAAAP//gAAAAAf/7////////gAAAAAAAAAH/gwAAAAAf////f/////gAAAAAAAAAF+AQAAAAB///+/v/////AAAAAAAAAAC+AAAAAAD/////0X////AAAAAAAAAAAeAQAAAAD////f/D///8gAAAAAAAAAAfEEAAAAH////v/B/z/QAAAAAAAAAAAPMBgAAAD////v+A/B+gAAAAAAAAAAAD8AAAAAD////34AeB/AgAAAAAAAAAAAPAAAAAH////3wAcAfggAAAAAAAAAAADAAAAAD////+AAcAfgAAAAAAAAAAAABDwAAAD////9wAMATAYAAAAAAAAAAAA//AAAB/////gAOAQAIAAAAAAAAAAAAH/gAAA/////gACAIAIAAAAAAAAAAAAH/8AAAfH///AAAAsGAAAAAAAAAAAAAH/+AAAAB//+AAAAcOAAAAAAAAAAAAAP/+AAAAB//8AAAAc+gAAAAAAAAAAAAP//gAAAD//4AAAAMeggAAAAAAAAAAAP//8AAAB//wAAAAGdg+AAAAAAAAAAAf///AAAA//wAAAACAAPkAAAAAAAAAAP///gAAA//wAAAABwAHwAAAAAAAAAAP///AAAA//wAAAAAAIDYAAAAAAAAAAH///AAAAf/wAAAAAAAAAAAAAAAAAAAD//+AAAA//wgAAAAABxAAAAAAAAAAAD//+AAAA//xgAAAAAPxgAAAAAAAAAAA//+AAAA//zgAAAAAf/gAAAAAAAAAAAf/8AAAA//DgAAAAAf/wAAAAAAAAAAAf/8AAAAf/DAAAAAD//4CAAAAAAAAAAf/4AAAAf/DAAAAAH//8AAAAAAAAAAAf/AAAAAf+CAAAAAH//8AAAAAAAAAAA//AAAAAf8AAAAAAH//+AAAAAAAAAAA/+AAAAAP8AAAAAAH//+AAAAAAAAAAA/+AAAAAH4AAAAAAD//+AAAAAAAAAAA/8AAAAAHwAAAAAADwf8AAAAAAAAAAA/4AAAAAAAAAAAAACAH4AAAAAAAAAAB/wAAAAAAAAAAAAAAAD4AEAAAAAAAAB/AAAAAAAAAAAAAAAAAAAGAAAAAAAAB+AAAAAAAAAAAAAAAAAQAMAAAAAAAAB8AAAAAAAAAAAAAAAAAQAYAAAAAAAAB4AAAAAAAAAAAAAAAAAAAwAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  var bits = (function () { var s = atob(MASK), b = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i); return b; })();
  function isLand(lon, lat) {
    var x = Math.floor(((lon + 180) % 360 + 360) % 360 / 2), y = Math.floor((90 - lat) / 2);
    if (y < 0 || y > 89) return false;
    var k = y * 180 + x;
    return (bits[k >> 3] >> (7 - (k & 7))) & 1;
  }

  function init() {
    var root = document.querySelector('.mlt-gl');
    if (!root || root.getAttribute('data-joc')) return;
    root.setAttribute('data-joc', '1');
    root.classList.add('mlt-gl-joc');
    function el(cls, tag) { var d = document.createElement(tag || 'div'); d.className = cls; root.appendChild(d); return d; }
    var beam = el('mlt-gl-beam'), tag = el('mlt-gl-tag'), readyTimer = 0;
    // cardul de la aterizare: READY FOR DELIVERY + bonusul MLT-TARGET, cu doua butoane
    var ready = el('mlt-gl-ready');
    function add(par, cls, tag2, txt) { var d = document.createElement(tag2 || 'div'); d.className = cls; if (txt) d.textContent = txt; par.appendChild(d); return d; }
    var rx = add(ready, 'x', 'button', '×');
    var rTitle = add(ready, 't');
    add(ready, 'b', 'div', '🎯 CLAIM YOUR BONUS: Kit consumabile GRATUIT + ofertă în 24h');
    var code = add(ready, 'c', 'div', 'cod ');
    add(code, '', 'strong', 'MLT-TARGET');
    code.appendChild(document.createTextNode(' · valabil 30 de zile, la comenzile de utilaje laser'));
    var btns = add(ready, 'bt');
    var goCfg = add(btns, 'go', 'a', 'Configurează →');
    var goWa = add(btns, 'go wa', 'a', 'Revendică pe WhatsApp →');
    goWa.target = '_blank'; goWa.rel = 'noopener';
    rx.addEventListener('click', function (e) { e.stopPropagation(); ready.classList.remove('on'); });
    ready.addEventListener('mouseenter', function () { clearTimeout(readyTimer); });   // nu dispare cat timp e mouse-ul pe el
    var slots = Array.prototype.slice.call(root.querySelectorAll('.mlt-gl-u'));
    // toate produsele: cele 7 de pe orbita + cele in plus; fiecare slot tine minte ce produs arata
    var pool = slots.map(function (a, i) {
      a.setAttribute('data-p', i);
      return { src: a.querySelector('img').src, href: a.href, title: a.getAttribute('title'), label: label(a) };
    }).concat(EXTRA);

    function say(txt, cls) { tag.textContent = txt; tag.className = 'mlt-gl-tag' + (cls ? ' ' + cls : ''); }
    function searching() { say('◎ SEARCHING TARGET…', 'scan'); }
    searching();
    function label(a) { var lb = a.querySelector('.mlt-gl-lb'); return lb ? lb.textContent : a.getAttribute('title') || 'utilaj'; }

    function rel(r) { var R = root.getBoundingClientRect(); return { x: r.left - R.left, y: r.top - R.top, w: r.width, h: r.height }; }
    function mid(r) { return [r.x + r.w / 2, r.y + r.h / 2]; }
    // unghiul globului (sigle: vultur 0, MLT 120, bendIT 240 grade)
    function globeAngle() {
      var rot = root.querySelector('.mlt-gl-rot'), an = rot && rot.getAnimations ? rot.getAnimations()[0] : null;
      if (!an) return 0;
      var d = an.effect.getComputedTiming().duration;
      return 360 * ((an.currentTime % d) / d);
    }
    function eagleFront() { return Math.cos(globeAngle() * Math.PI / 180) > 0.3; }

    // punctul de pe glob (coordonate in banner) -> longitudine/latitudine pe harta care se roteste
    function lonLat(px, py, sphEl, sph) {
      var bp = getComputedStyle(sphEl).backgroundPosition.split(',')[0].trim().split(' ');
      var s = sph.w / (sphEl.offsetWidth || sph.w);           // pe mobil bannerul e micsorat
      var bx = (parseFloat(bp[0]) || 0) * s, by = (parseFloat(bp[1]) || 0) * s;
      var mw = sph.w * Math.PI, mh = sph.w * Math.PI / 2;   // harta: latime = circumferinta, inaltime = jumatate
      var u = ((px - sph.x - bx) % mw + mw) % mw, v = py - sph.y - by;
      return [u / mw * 360 - 180, 90 - v / mh * 180];
    }
    // cel mai apropiat punct de USCAT de pe fata globului, spre partea utilajului
    function landingPoint(mc, sphEl, sph) {
      var gc = mid(sph), gr = sph.w / 2;
      var vx = mc[0] - gc[0], vy = mc[1] - gc[1], vl = Math.sqrt(vx * vx + vy * vy) || 1;
      var want = [gc[0] + vx / vl * gr * 0.5, gc[1] + vy / vl * gr * 0.5], best = null, bd = 1e9;
      for (var yy = gc[1] - gr * 0.8; yy <= gc[1] + gr * 0.8; yy += 6) {
        for (var xx = gc[0] - gr * 0.8; xx <= gc[0] + gr * 0.8; xx += 6) {
          var ddx = xx - gc[0], ddy = yy - gc[1];
          if (ddx * ddx + ddy * ddy > gr * gr * 0.62) continue;
          var ll = lonLat(xx, yy, sphEl, sph);
          if (!isLand(ll[0], ll[1])) continue;
          var d = (xx - want[0]) * (xx - want[0]) + (yy - want[1]) * (yy - want[1]);
          if (d < bd) { bd = d; best = [xx, yy]; }
        }
      }
      return best || want;
    }

    // eticheta urmareste luneta
    root.addEventListener('mousemove', function (e) {
      var R = root.getBoundingClientRect(), x = e.clientX - R.left, y = e.clientY - R.top;
      var w = tag.offsetWidth || 160;
      tag.style.left = (x + 24 + w > R.width ? x - 24 - w : x + 24) + 'px';
      tag.style.top = (y + 16) + 'px';
      root.classList.add('mlt-gl-aim');
    });
    root.addEventListener('mouseleave', function () { root.classList.remove('mlt-gl-aim'); });
    root.addEventListener('mouseover', function (e) {
      if (!e.target.closest) return;
      var g = e.target.closest('.mlt-gl-lg');
      if (g) { say('⌂ CONTACT BASE — ' + BASE[g.classList.contains('e') ? 'e' : g.classList.contains('m') ? 'm' : 'b'], 'base'); return; }
      var a = e.target.closest('.mlt-gl-u');
      if (a && !a.classList.contains('hit')) say('⌖ ȚINTĂ FIXATĂ: ' + label(a).toUpperCase(), 'lock');
    });
    root.addEventListener('mouseout', function (e) {
      var a = e.target.closest ? e.target.closest('.mlt-gl-u, .mlt-gl-lg') : null;
      if (a) searching();
    });

    root.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('.mlt-gl-u') : null;
      if (!a) return;
      e.preventDefault();
      if (a.classList.contains('hit')) return;
      var img = a.querySelector('img'), m = rel(img.getBoundingClientRect()), mc = mid(m);
      var sphEl = root.querySelector('.mlt-gl-sph'), sph = rel(sphEl.getBoundingClientRect());
      // fasciculul: din vultur (daca e in fata), altfel din centrul globului
      var o = eagleFront() ? mid(rel(root.querySelector('.mlt-gl-lg.e img').getBoundingClientRect())) : mid(sph);
      var dx = mc[0] - o[0], dy = mc[1] - o[1];
      beam.style.left = o[0] + 'px'; beam.style.top = o[1] + 'px';
      beam.style.width = Math.sqrt(dx * dx + dy * dy) + 'px';
      beam.style.transform = 'rotate(' + Math.atan2(dy, dx) + 'rad)';
      beam.classList.remove('on'); void beam.offsetWidth; beam.classList.add('on');
      var land = landingPoint(mc, sphEl, sph);
      // copie 2D a utilajului, deasupra a tot, care zboara spre glob; originalul ramane ascuns pe orbita
      var cl = img.cloneNode(true);
      cl.className = 'mlt-gl-fly';
      cl.style.left = m.x + 'px'; cl.style.top = m.y + 'px'; cl.style.width = m.w + 'px'; cl.style.height = m.h + 'px';
      root.appendChild(cl);
      var shot = { label: label(a), href: a.href };
      a.classList.remove('back'); a.classList.add('hit');
      var tx = land[0] - mc[0], ty = land[1] - mc[1];
      cl.animate([
        { transform: 'translate(0,0) scale(1)', filter: 'brightness(2.2) drop-shadow(0 0 14px #ff7a3a)' },
        { transform: 'translate(' + tx * 0.15 + 'px,' + (ty * 0.15 - 14) + 'px) scale(.85)', filter: 'brightness(1.5) drop-shadow(0 0 10px #ffb347)', offset: 0.25 },
        { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(.14)', filter: 'brightness(1.2)', opacity: 0.35 }
      ], { duration: 1300, easing: 'cubic-bezier(.5,0,.9,.6)', fill: 'forwards' });
      // la aterizare (cu temporizator, ca sa mearga si cand fereastra nu deseneaza cadre)
      setTimeout(function () {
        cl.remove();
        var f = el('mlt-gl-flash');
        f.style.left = land[0] + 'px'; f.style.top = land[1] + 'px';
        setTimeout(function () { f.remove(); }, 1200);
        // READY FOR DELIVERY, chiar unde a aterizat, buton spre configurator
        clearTimeout(readyTimer);
        rTitle.textContent = '✓ READY FOR DELIVERY — ' + shot.label;
        goCfg.href = shot.href;
        goWa.href = WA + encodeURIComponent('Bună! Am câștigat bonusul MLT-TARGET (kit consumabile + ofertă în 24h). Mă interesează: ' + shot.label + '.');
        // cardul sub punctul de aterizare, tinut in interiorul bannerului
        var cw = ready.offsetWidth || 320, ch = ready.offsetHeight || 150;
        var x = Math.max(cw / 2 + 8, Math.min(root.clientWidth - cw / 2 - 8, land[0]));
        var y = Math.max(8, Math.min(root.clientHeight - ch - 8, land[1] + 22));
        ready.style.left = x + 'px'; ready.style.top = y + 'px';
        ready.classList.remove('on'); void ready.offsetWidth; ready.classList.add('on');
        readyTimer = setTimeout(function () { ready.classList.remove('on'); }, 9000);
      }, 1300);
      // la 3 s, din vultur iese pe orbita alt produs
      clearTimeout(a._rt);
      a._rt = setTimeout(function () { restock(a); }, RESTOCK);
    });

    // pune in slot un produs care nu e deja pe orbita (nici cel tocmai lovit) si il scoate din vultur
    function restock(a) {
      var shown = slots.map(function (s) { return +s.getAttribute('data-p'); });
      var free = pool.map(function (p, i) { return i; }).filter(function (i) { return shown.indexOf(i) < 0; });
      if (free.length) {
        var k = free[Math.floor(Math.random() * free.length)], P = pool[k];
        a.setAttribute('data-p', k);
        a.href = P.href; a.setAttribute('title', P.title);
        var im = a.querySelector('img'); im.src = P.src; im.alt = P.title;
        var lb = a.querySelector('.mlt-gl-lb'); if (lb) lb.textContent = P.label;
      }
      var span = a.querySelector('.mlt-gl-d'), img = a.querySelector('img');
      a.classList.remove('hit');
      var ar = a.getBoundingClientRect(), p = img.getBoundingClientRect().height / img.offsetHeight || 1;
      var L = root.querySelector('.mlt-gl-lg.e img').getBoundingClientRect();
      span.style.setProperty('--rx', ((L.left + L.width / 2 - ar.left) / p) + 'px');
      span.style.setProperty('--ry', ((L.top + L.height / 2 - ar.top) / p) + 'px');
      void span.offsetWidth;
      a.classList.add('back');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('load', init);
})();
