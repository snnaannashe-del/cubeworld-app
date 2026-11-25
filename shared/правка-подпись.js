/* ═══════════════════════════════════════════════════════════════════════
   ПОДПИСЬ (sign): росчерк пером.

       CW.правкаПодпись(узел, файл, {менялось, счёт}) → {тело(), снимок()}

   Подпись хранится разборно — цвет, толщина и точки росчерка, —
   поэтому её всегда можно открыть и поправить. Наружу (в документ, в
   переписку, в скачанный файл) она уходит снимком с прозрачным фоном:
   таким её и кладут в бумагу.

   Лист в клетку, а не белый: подпись ставят поверх чужого документа, и
   белый квадрат под росчерком перекрыл бы текст. Клетка показывает,
   что фон прозрачный.

   Набранной буквами подписи здесь больше нет — её рисуют. Старый файл,
   набранный буквами, всё же откроется, и одна кнопка переведёт его на
   росчерк: иначе такой файл остался бы без выхода.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var Ш = 900, В = 320;

  /* Почерки остались от набранной подписи: ими показываются старые
     файлы, новые пишутся росчерком. */
  var ПЕРЬЯ = [
    { к: 'росчерк', имя: 'Росчерк',
      шрифт: '"Snell Roundhand","Brush Script MT","Segoe Script",cursive' },
    { к: 'перо', имя: 'Перо',
      шрифт: '"Apple Chancery","Lucida Handwriting","Comic Sans MS",cursive' },
    { к: 'печатно', имя: 'Печатно', шрифт: '"Georgia","Times New Roman",serif' }
  ];

  function эл(тег, класс) {
    var у = document.createElement(тег);
    if (класс) у.className = класс;
    return у;
  }

  function перомПо(к) {
    for (var i = 0; i < ПЕРЬЯ.length; i++) if (ПЕРЬЯ[i].к === к) return ПЕРЬЯ[i];
    return ПЕРЬЯ[0];
  }

  /* Если в файле лежит своё число, показываем его в списке, а не
     подменяем первым попавшимся. */
  function сНашим(набор, своё) {
    своё = Number(своё) || 0;
    if (!своё || набор.indexOf(своё) >= 0) return набор;
    return набор.concat([своё]).sort(function (а, б) { return а - б; });
  }

  function поУмолчанию() {
    return { вид: 'рисунок', штрихи: [], цвет: '#101a3c', толщина: 5,
             текст: '', перо: 'росчерк', размер: 110, наклон: -6 };
  }

  function изТела(тело) {
    var п = поУмолчанию();
    var д = null;
    try { д = JSON.parse(тело || ''); } catch (е) {}
    if (д && typeof д === 'object' && !Array.isArray(д)) {
      for (var к in п) if (Object.prototype.hasOwnProperty.call(д, к)) п[к] = д[к];
    } else if (тело && /<svg/i.test(тело)) {
      /* Старая подпись лежала обычным svg — читаем её теми же мазками,
         что и рисунок. */
      п.штрихи = CW.мазки.изСВГ(тело);
    }
    if (!Array.isArray(п.штрихи)) п.штрихи = [];
    return п;
  }

  function наХолст(п, масштаб) {
    масштаб = масштаб || 1;
    var х = document.createElement('canvas');
    х.width = Math.round(Ш * масштаб);
    х.height = Math.round(В * масштаб);
    var г = х.getContext('2d');
    г.scale(масштаб, масштаб);
    г.lineCap = 'round';
    г.lineJoin = 'round';
    if (п.вид === 'набор') {
      var перо = перомПо(п.перо);
      г.fillStyle = п.цвет;
      г.font = (п.перо === 'печатно' ? 'italic ' : '') + п.размер + 'px ' + перо.шрифт;
      г.textAlign = 'center';
      г.textBaseline = 'middle';
      г.save();
      г.translate(Ш / 2, В / 2);
      г.rotate((Number(п.наклон) || 0) * Math.PI / 180);
      г.fillText(String(п.текст || ''), 0, 0);
      г.restore();
      return х;
    }
    (п.штрихи || []).forEach(function (ш) {
      if (!ш.точки || !ш.точки.length) return;
      г.strokeStyle = ш.цвет;
      г.lineWidth = ш.толщина;
      г.beginPath();
      ш.точки.forEach(function (т, и) {
        if (и) г.lineTo(т[0], т[1]); else г.moveTo(т[0], т[1]);
      });
      /* Точка без движения — тоже след пера: иначе «поставил точку» не
         оставляет ничего. */
      if (ш.точки.length === 1) г.lineTo(ш.точки[0][0] + 0.1, ш.точки[0][1]);
      г.stroke();
    });
    return х;
  }

  /* Наружу — чтобы документ мог взять готовую подпись из папки и
     положить её в лист, не открывая редактор. */
  CW.знакПодпись = { изТела: изТела, наХолст: наХолст };

  CW.правкаПодпись = function (куда, ф, зов) {
    var п = изТела(ф.body);

    var столбец = эл('div', 'фл-столбец');
    var вкладки = эл('div', 'фл-лента');
    var полоса = эл('div', 'фл-полоса');
    var сцена = эл('div', 'фл-сцена клеткой');
    var холст = эл('canvas', 'фл-холст фл-клетка');
    холст.width = Ш; холст.height = В;
    сцена.appendChild(холст);
    столбец.appendChild(вкладки);
    столбец.appendChild(полоса);
    столбец.appendChild(сцена);
    куда.appendChild(столбец);

    var г = холст.getContext('2d');

    function перерисовать() {
      г.clearRect(0, 0, Ш, В);
      г.drawImage(наХолст(п, 1), 0, 0);
      зов.счёт(п.вид === 'набор'
        ? ('набрано · знаков ' + String(п.текст || '').length)
        : Т.с('росчерк · мазков {н}', { н: (п.штрихи || []).length }));
    }

    function вкладкой() {
      вкладки.innerHTML = '';
      if (п.вид === 'рисунок') { вкладки.style.display = 'none'; return; }
      вкладки.style.display = '';
      var б = эл('button');
      б.type = 'button';
      б.textContent = Т('Перевести на росчерк');
      б.onclick = function () { п.вид = 'рисунок'; зов.менялось(); собрать(); };
      вкладки.appendChild(б);
    }

    var палитра = null;
    function кнопкаЦвета(подсказка) {
      var б = эл('button', 'фл-цвет');
      б.type = 'button';
      б.title = подсказка;
      б.style.setProperty('--цвет', п.цвет);
      б.onclick = function () {
        if (палитра) { палитра.убрать(); палитра = null; return; }
        CW.нужен('shared/выбор-знака.js').then(function () {
          палитра = CW.палитраЦвета(холст.closest('.ок-окно') || столбец, {
            цвет: п.цвет,
            меняется: function (ц) {
              п.цвет = ц;
              б.style.setProperty('--цвет', ц);
              зов.менялось();
              перерисовать();
            },
            закрыли: function () { палитра = null; }
          });
          палитра.узел.classList.add('под-полосой');
        });
      };
      return б;
    }

    function полосой() {
      полоса.innerHTML = '';
      полоса.appendChild(кнопкаЦвета('Цвет чернил'));

      var толщина = эл('select');
      толщина.title = Т('Толщина');
      сНашим([3, 5, 8, 12], п.толщина).forEach(function (т) {
        var о = document.createElement('option');
        о.value = т; о.textContent = т;
        if (т === п.толщина) о.selected = true;
        толщина.appendChild(о);
      });
      толщина.onchange = function () { п.толщина = Number(this.value) || 5; зов.менялось(); };
      полоса.appendChild(толщина);

      полоса.appendChild(эл('span', 'щель'));

      var назад = эл('button');
      назад.type = 'button';
      назад.textContent = '↺';
      назад.title = Т('Отменить последний мазок');
      назад.onclick = function () {
        if (!п.штрихи.length) return;
        п.штрихи.pop();
        зов.менялось();
        перерисовать();
      };
      полоса.appendChild(назад);

      var чисто = эл('button');
      чисто.type = 'button';
      чисто.innerHTML = CW.значок('урна', 15);
      чисто.title = Т('Очистить подпись');
      чисто.onclick = function () {
        if (!п.штрихи.length) return;
        CW.открыть('delete', {
          чего: 'подпись',
          что: ф.name || 'подпись',
          ещё: Т('Росчерк уйдёт.'),
          кнопка: Т('Очистить'),
          навсегда: true,
          делать: function () {
            п.штрихи = [];
            зов.менялось();
            перерисовать();
          }
        });
      };
      полоса.appendChild(чисто);
    }

    function собрать() { вкладкой(); полосой(); перерисовать(); }

    /* Точка пальца — в точках холста: он показан уменьшенным, и без
       пересчёта росчерк шёл бы мимо руки. */
    function где(е) {
      var р = холст.getBoundingClientRect();
      return [(е.clientX - р.left) * Ш / р.width,
              (е.clientY - р.top) * В / р.height];
    }

    var ведём = null;
    холст.addEventListener('pointerdown', function (е) {
      if (п.вид !== 'рисунок') return;
      е.preventDefault();
      try { холст.setPointerCapture(е.pointerId); } catch (б) {}
      ведём = { цвет: п.цвет, толщина: п.толщина, точки: [где(е)] };
      п.штрихи.push(ведём);
    });
    холст.addEventListener('pointermove', function (е) {
      if (!ведём) return;
      ведём.точки.push(где(е));
      перерисовать();
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (с) {
      холст.addEventListener(с, function () {
        if (!ведём) return;
        ведём = null;
        зов.менялось();
        перерисовать();
      });
    });

    собрать();

    return {
      тело: function () { return JSON.stringify(п); },
      снимок: function () { return наХолст(п, 2); },
      расширение: 'png'
    };
  };
})();
