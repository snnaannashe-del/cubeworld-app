/* ═══════════════════════════════════════════════════════════════════════
   МУЗЫКА: полка и один проигрыватель на всю программу.

       shared/музыка.js

   ── Почему звук живёт ЗДЕСЬ, а не в окне ───────────────────────────
   Окно музыки можно закрыть, а музыка при этом должна играть дальше:
   включил и пошёл смотреть ленту. Если <audio> лежит внутри окна, он
   умирает вместе с ним — закрыл окно, и песня оборвалась на середине.

   Поэтому <audio> ровно один, он прицеплен к странице, и окно им
   только управляет. Переход между разделами — это перезагрузка
   страницы, и звук на ней обрывается; внутри одного раздела, с окнами
   поверх, играет не прерываясь.

   ── Что умеет ──────────────────────────────────────────────────────
       CW.музыка.загрузить()        полка с сервера
       CW.музыка.полка()            [{id, имя, адрес, сколько, t}]
       CW.музыка.добавить(запись)
       CW.музыка.убрать(id)
       CW.музыка.играть(id)         включить эту песню
       CW.музыка.пауза() / дальше() / назад()
       CW.музыка.перемотать(доля)   0…1 — вот ради чего всё
       CW.музыка.что()              {id, идёт, время, всего, имя}
       CW.музыка.следить(fn)        звать, когда что-то изменилось

   Полка живёт в личном хранилище на сервере (/me/prefs, ключ
   «музыка») и зеркалом в браузере — ровно как архив и избранное.
   ═══════════════════════════════════════════════════════════════════════ */
(function (окно, документ) {
  'use strict';
  var CW = окно.CW = окно.CW || {};

  var КЛЮЧ_БРАУЗЕРА = 'cw_музыка';
  var КЛЮЧ_СЕРВЕРА = 'музыка';
  var ПРЕДЕЛ = 200;

  var ПОЛКА = изБраузера();
  var СЛУШАТЕЛИ = [];
  var сейчас = null;         /* id играющей песни */
  var часы = null;
  var звук = null;

  function изБраузера() {
    try {
      var с = JSON.parse(окно.localStorage.getItem(КЛЮЧ_БРАУЗЕРА) || '[]');
      return Array.isArray(с) ? с.filter(function (з) { return з && з.адрес; }) : [];
    } catch (е) { return []; }
  }
  function вБраузер() {
    try { окно.localStorage.setItem(КЛЮЧ_БРАУЗЕРА, JSON.stringify(ПОЛКА)); }
    catch (е) {}
  }

  function свести(а, б) {
    var где = {}, итог = [];
    (а || []).concat(б || []).forEach(function (з) {
      if (!з || !з.адрес) return;
      var номер = String(з.id || з.адрес);
      з.id = номер;
      var место = где[номер];
      if (место === undefined) { где[номер] = итог.length; итог.push(з); return; }
      if (Number(з.t || 0) > Number(итог[место].t || 0)) итог[место] = з;
    });
    итог.sort(function (х, у) { return Number(у.t || 0) - Number(х.t || 0); });
    return итог.length > ПРЕДЕЛ ? итог.slice(0, ПРЕДЕЛ) : итог;
  }

  function наСервер() {
    clearTimeout(часы);
    часы = setTimeout(function () {
      var тело = {};
      тело[КЛЮЧ_СЕРВЕРА] = { v: JSON.stringify(ПОЛКА), t: Date.now() };
      CW.спросить('/me/prefs', { способ: 'POST', тело: { prefs: тело }, тихо: true })
        .catch(function () {});
    }, 500);
  }

  function сказать() {
    var что = CW.музыка.что();
    СЛУШАТЕЛИ.forEach(function (fn) { try { fn(что); } catch (е) {} });
  }

  /* ── единственный проигрыватель ──
     Создаётся при первом включении: тому, кто музыку не слушал, лишний
     узел на странице не нужен. */
  function завести() {
    if (звук) return звук;
    звук = документ.createElement('audio');
    звук.id = 'cw-плеер';
    звук.preload = 'metadata';
    /* playsinline нужен айфону: без него звук уводит экран в
       полноэкранный проигрыватель, и это уже не фоновая музыка. */
    звук.setAttribute('playsinline', '');
    звук.style.display = 'none';
    документ.body.appendChild(звук);

    звук.addEventListener('timeupdate', сказать);
    звук.addEventListener('durationchange', сказать);
    звук.addEventListener('play', сказать);
    звук.addEventListener('pause', сказать);
    звук.addEventListener('ended', function () { CW.музыка.дальше(); });
    звук.addEventListener('error', function () {
      CW.сказать && CW.сказать('Эта песня не открылась');
      сейчас = null; сказать();
    });
    return звук;
  }

  /* Система должна знать, что играет: тогда работают кнопки на экране
     блокировки и на наушниках. Без этого «фоновая музыка» кончается на
     первом же нажатии паузы с гарнитуры. */
  function сказатьСистеме(з) {
    try {
      if (!окно.navigator || !окно.navigator.mediaSession) return;
      var мс = окно.navigator.mediaSession;
      мс.metadata = new окно.MediaMetadata({
        title: з.имя || 'Без имени', artist: 'CubeWorld'
      });
      мс.setActionHandler('play', function () { CW.музыка.играть(з.id); });
      мс.setActionHandler('pause', function () { CW.музыка.пауза(); });
      мс.setActionHandler('nexttrack', function () { CW.музыка.дальше(); });
      мс.setActionHandler('previoustrack', function () { CW.музыка.назад(); });
    } catch (е) {}
  }

  function место(id) {
    id = String(id);
    for (var i = 0; i < ПОЛКА.length; i++) if (String(ПОЛКА[i].id) === id) return i;
    return -1;
  }

  CW.музыка = {
    загрузить: function () {
      return CW.спросить('/me/prefs?keys=' + КЛЮЧ_СЕРВЕРА, { тихо: true })
        .then(function (д) {
          var сырое = д && д.prefs && д.prefs[КЛЮЧ_СЕРВЕРА] && д.prefs[КЛЮЧ_СЕРВЕРА].v;
          var сСервера = [];
          try { сСервера = JSON.parse(сырое || '[]') || []; } catch (е) {}
          var было = ПОЛКА.length;
          ПОЛКА = свести(ПОЛКА, Array.isArray(сСервера) ? сСервера : []);
          вБраузер(); сказать();
          if (ПОЛКА.length !== сСервера.length || ПОЛКА.length !== было) наСервер();
          return ПОЛКА;
        })
        .catch(function () { return ПОЛКА; });
    },

    полка: function () { return ПОЛКА.slice(); },

    добавить: function (з) {
      if (!з || !з.адрес) return null;
      з.id = String(з.id || з.адрес);
      з.t = Date.now();
      if (место(з.id) >= 0) return з;
      ПОЛКА.unshift(з);
      if (ПОЛКА.length > ПРЕДЕЛ) ПОЛКА = ПОЛКА.slice(0, ПРЕДЕЛ);
      вБраузер(); наСервер(); сказать();
      return з;
    },

    убрать: function (id) {
      if (String(id) === String(сейчас)) CW.музыка.пауза();
      ПОЛКА = ПОЛКА.filter(function (з) { return String(з.id) !== String(id); });
      вБраузер(); наСервер(); сказать();
    },

    играть: function (id) {
      var а = завести();
      if (id == null) { а.play().catch(function () {}); сказать(); return; }
      var i = место(id);
      if (i < 0) return;
      var з = ПОЛКА[i];
      if (String(сейчас) !== String(з.id)) {
        сейчас = String(з.id);
        а.src = CW.файл ? CW.файл(з.адрес) : з.адрес;
        сказатьСистеме(з);
      }
      а.play().catch(function () {
        /* Браузер не даёт играть без нажатия — это нормальное правило,
           и врать про «ошибку» тут нечего. */
      });
      сказать();
    },

    пауза: function () { if (звук) звук.pause(); сказать(); },

    дальше: function () {
      var i = место(сейчас);
      if (i < 0 || !ПОЛКА.length) return;
      CW.музыка.играть(ПОЛКА[(i + 1) % ПОЛКА.length].id);
    },

    назад: function () {
      var i = место(сейчас);
      if (i < 0 || !ПОЛКА.length) return;
      CW.музыка.играть(ПОЛКА[(i - 1 + ПОЛКА.length) % ПОЛКА.length].id);
    },

    /* ── ПЕРЕМОТКА ──
       Доля от 0 до 1. Пока браузер не узнал длину песни, перематывать
       некуда — честно ничего не делаем, а не прыгаем в ноль. */
    перемотать: function (доля) {
      if (!звук || !isFinite(звук.duration) || !звук.duration) return false;
      доля = Math.max(0, Math.min(1, Number(доля) || 0));
      try { звук.currentTime = звук.duration * доля; } catch (е) { return false; }
      сказать();
      return true;
    },

    что: function () {
      var з = место(сейчас) >= 0 ? ПОЛКА[место(сейчас)] : null;
      return {
        id: сейчас,
        имя: з ? (з.имя || 'Без имени') : '',
        идёт: !!(звук && !звук.paused && !звук.ended),
        время: звук ? (звук.currentTime || 0) : 0,
        всего: (звук && isFinite(звук.duration)) ? (звук.duration || 0) : 0
      };
    },

    следить: function (fn) { if (typeof fn === 'function') СЛУШАТЕЛИ.push(fn); }
  };

})(window, document);
