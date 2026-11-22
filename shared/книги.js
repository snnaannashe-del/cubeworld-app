/* ═══════════════════════════════════════════════════════════════════════
   ЧУЖИЕ КНИГИ.          /home/claude/новое/cubeworld-app/shared/книги.js

       CW.книги.умеем('xlsx')        читаем ли такой вид
       CW.книги.текстом(байты, вид)  → обещание: строка или null

   Таблица .xlsx и документ .docx, принесённые с компьютера, — это не
   текст, а зип с кучей XML внутри. Страница читала их как текст и
   получала крошево, поэтому окно честно говорило «храним, но не
   правим». Теперь распаковываем и разбираем прямо здесь:

       xlsx  →  строки таблицы, собранные как .csv — их открывает наш
                редактор таблиц, и дальше это обычная наша таблица
       docx  →  текст абзацами — его открывает редактор документа

   Почему в странице, а не на сервере. Так это работает сразу, без
   выкладки, и не заставляет сервер держать в памяти целую книгу ради
   одного просмотра. Распаковка у браузера своя (DecompressionStream),
   разбор XML тоже свой (DOMParser) — ни одной сторонней библиотеки
   сюда тащить не нужно.

   Чего здесь нет: обратной записи. Сохранив такую книгу, человек
   пишет наш текст в наше же поле, а исходный .xlsx остаётся в
   хранилище нетронутым. Настоящая выгрузка обратно в .xlsx —
   отдельная работа.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ПРЕДЕЛ_СТРОК = 5000;        /* больше в окно всё равно не влезет */
  var ПРЕДЕЛ_СТОЛБЦОВ = 200;
  var ПРЕДЕЛ_ЗНАКОВ = 400000;

  var ТАБЛ = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
  var ДОК  = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  var СВЯЗЬ = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

  /* ── Зип ───────────────────────────────────────────────────────────
     Читаем опись в конце файла, а не идём подряд: только в описи
     сказано, где лежит каждый кусок и чем он сжат. */
  function описью(байты) {
    var в = new DataView(байты.buffer, байты.byteOffset, байты.byteLength);
    var конец = -1;
    var докуда = Math.max(0, байты.length - 66000);
    for (var i = байты.length - 22; i >= докуда; i--) {
      if (в.getUint32(i, true) === 0x06054b50) { конец = i; break; }
    }
    if (конец < 0) return null;

    var сколько = в.getUint16(конец + 10, true);
    var место = в.getUint32(конец + 16, true);
    var опись = {};
    for (var н = 0; н < сколько; н++) {
      if (место + 46 > байты.length) break;
      if (в.getUint32(место, true) !== 0x02014b50) break;
      var способ = в.getUint16(место + 10, true);
      var сжато = в.getUint32(место + 20, true);
      var имяД = в.getUint16(место + 28, true);
      var лишнее = в.getUint16(место + 30, true);
      var примечание = в.getUint16(место + 32, true);
      var начало = в.getUint32(место + 42, true);
      var имя = new TextDecoder('utf-8')
        .decode(байты.subarray(место + 46, место + 46 + имяД));
      опись[имя] = { способ: способ, сжато: сжато, начало: начало };
      место += 46 + имяД + лишнее + примечание;
    }
    return { в: в, байты: байты, опись: опись };
  }

  function кусок(зип, имя) {
    var о = зип.опись[имя];
    if (!о) return Promise.resolve(null);
    var м = о.начало;
    if (зип.в.getUint32(м, true) !== 0x04034b50) return Promise.resolve(null);
    var имяД = зип.в.getUint16(м + 26, true);
    var лишнее = зип.в.getUint16(м + 28, true);
    var откуда = м + 30 + имяД + лишнее;
    var сырое = зип.байты.subarray(откуда, откуда + о.сжато);
    if (о.способ === 0) return Promise.resolve(текстом(сырое));
    return раздуть(сырое).then(текстом);
  }

  function текстом(м) {
    return м ? new TextDecoder('utf-8').decode(м) : null;
  }

  /* Раздувает сам браузер: своего разжатия мы не пишем. */
  function раздуть(сырое) {
    if (typeof DecompressionStream === 'undefined') {
      return Promise.reject(new Error('Браузер не умеет распаковывать'));
    }
    var поток = new Blob([сырое]).stream()
      .pipeThrough(new DecompressionStream('deflate-raw'));
    return new Response(поток).arrayBuffer().then(function (б) {
      return new Uint8Array(б);
    });
  }

  function разбор(текст) {
    if (!текст) return null;
    try {
      var д = new DOMParser().parseFromString(текст, 'application/xml');
      return д.querySelector('parsererror') ? null : д;
    } catch (е) { return null; }
  }

  function детей(узел, имя, где) {
    return [].slice.call(узел.getElementsByTagNameNS(где, имя));
  }

  /* A1 → 0, B2 → 1, AA7 → 26: номер столбца спрятан в буквах ссылки. */
  function столбцом(ссылка) {
    var б = String(ссылка || '').match(/^([A-Za-z]+)/);
    if (!б) return null;
    var н = 0, с = б[1].toUpperCase();
    for (var i = 0; i < с.length; i++) н = н * 26 + (с.charCodeAt(i) - 64);
    return н - 1;
  }

  function собратьCSV(ряды) {
    return ряды.map(function (р) {
      return р.map(function (з) {
        з = String(з == null ? '' : з);
        return /[",\n]/.test(з) ? '"' + з.replace(/"/g, '""') + '"' : з;
      }).join(',');
    }).join('\n');
  }

  /* ── Таблица ──────────────────────────────────────────────────── */
  function таблицей(зип) {
    return Promise.all([
      кусок(зип, 'xl/sharedStrings.xml'),
      кусок(зип, 'xl/workbook.xml'),
      кусок(зип, 'xl/_rels/workbook.xml.rels')
    ]).then(function (трое) {
      var общие = общимиСтроками(разбор(трое[0]));
      var лист = первыйЛист(зип, разбор(трое[1]), разбор(трое[2]));
      if (!лист) return null;
      return кусок(зип, лист).then(function (т) {
        var д = разбор(т);
        if (!д) return null;
        return листомВСтроки(д, общие);
      });
    });
  }

  /* В .xlsx текст клетки чаще лежит не в ней, а в общем списке: в
     клетке стоит только номер в этом списке. */
  function общимиСтроками(д) {
    if (!д) return [];
    return детей(д.documentElement, 'si', ТАБЛ).map(function (si) {
      return детей(si, 't', ТАБЛ).map(function (т) {
        return т.textContent || '';
      }).join('');
    });
  }

  /* Обычно это sheet1.xml, но не всегда: порядок листов задан в
     workbook.xml, а настоящее имя файла — в связях. */
  function первыйЛист(зип, книга, связи) {
    if (книга && связи) {
      var листы = детей(книга.documentElement, 'sheet', ТАБЛ);
      if (листы.length) {
        var ид = листы[0].getAttributeNS(СВЯЗЬ, 'id') || листы[0].getAttribute('r:id');
        var все = [].slice.call(связи.getElementsByTagName('*'));
        for (var i = 0; i < все.length; i++) {
          if (все[i].getAttribute('Id') !== ид) continue;
          var цель = String(все[i].getAttribute('Target') || '').replace(/^\//, '');
          if (цель.indexOf('xl/') !== 0) цель = 'xl/' + цель;
          if (зип.опись[цель]) return цель;
        }
      }
    }
    for (var имя in зип.опись) {
      if (имя.indexOf('xl/worksheets/') === 0 && /\.xml$/.test(имя)) return имя;
    }
    return null;
  }

  function листомВСтроки(д, общие) {
    var ряды = [];
    var строки = детей(д.documentElement, 'row', ТАБЛ);
    for (var i = 0; i < строки.length && ряды.length < ПРЕДЕЛ_СТРОК; i++) {
      var ряд = [];
      детей(строки[i], 'c', ТАБЛ).forEach(function (c) {
        var место = столбцом(c.getAttribute('r'));
        if (место === null) место = ряд.length;
        if (место >= ПРЕДЕЛ_СТОЛБЦОВ) return;
        while (ряд.length <= место) ряд.push('');
        var тип = c.getAttribute('t') || '';
        if (тип === 'inlineStr') {
          ряд[место] = детей(c, 't', ТАБЛ).map(function (т) {
            return т.textContent || '';
          }).join('');
          return;
        }
        var v = детей(c, 'v', ТАБЛ)[0];
        var знач = v ? (v.textContent || '') : '';
        if (тип === 's') {
          знач = общие[Number(знач)] || '';
        } else if (тип === 'b') {
          знач = (знач === '1') ? 'да' : 'нет';
        } else if (знач !== '') {
          /* Целое пишем без хвоста .0: в таблице это штуки, не доли. */
          var ч = Number(знач);
          if (!isNaN(ч) && ч === Math.round(ч) && Math.abs(ч) < 1e15) {
            знач = String(Math.round(ч));
          }
        }
        ряд[место] = знач;
      });
      ряды.push(ряд);
    }
    while (ряды.length && !ряды[ряды.length - 1].some(function (з) { return з; })) {
      ряды.pop();
    }
    if (!ряды.length) return '';
    var ширина = 0;
    ряды.forEach(function (р) { if (р.length > ширина) ширина = р.length; });
    ряды.forEach(function (р) { while (р.length < ширина) р.push(''); });
    return собратьCSV(ряды).slice(0, ПРЕДЕЛ_ЗНАКОВ);
  }

  /* ── Документ ─────────────────────────────────────────────────── */
  function документом(зип) {
    return кусок(зип, 'word/document.xml').then(function (т) {
      var д = разбор(т);
      if (!д) return null;
      var абзацы = детей(д.documentElement, 'p', ДОК).slice(0, ПРЕДЕЛ_СТРОК)
        .map(function (p) {
          var куски = [];
          [].slice.call(p.getElementsByTagName('*')).forEach(function (у) {
            if (у.namespaceURI !== ДОК) return;
            var имя = у.localName;
            if (имя === 't') куски.push(у.textContent || '');
            else if (имя === 'tab') куски.push('\t');
            else if (имя === 'br' || имя === 'cr') куски.push('\n');
          });
          return куски.join('');
        });
      while (абзацы.length && !абзацы[абзацы.length - 1].trim()) абзацы.pop();
      return абзацы.join('\n').slice(0, ПРЕДЕЛ_ЗНАКОВ);
    });
  }

  /* Виды, которые лежат просто текстом: их читаем без распаковки. */
  var ПРОСТЫЕ = { txt: 1, md: 1, json: 1, html: 1, csv: 1, py: 1, svg: 1 };
  var ЗИПОМ = { xlsx: 1, docx: 1 };

  CW.книги = {
    умеем: function (вид) {
      return !!(ПРОСТЫЕ[вид] || ЗИПОМ[вид]);
    },

    текстом: function (байты, вид) {
      вид = String(вид || '').toLowerCase();
      if (ПРОСТЫЕ[вид]) {
        return Promise.resolve(текстом(байты).slice(0, ПРЕДЕЛ_ЗНАКОВ));
      }
      if (!ЗИПОМ[вид]) return Promise.resolve(null);
      var зип = описью(байты);
      if (!зип) return Promise.resolve(null);
      var делаем = (вид === 'xlsx') ? таблицей(зип) : документом(зип);
      return делаем.catch(function () { return null; });
    }
  };
})();
