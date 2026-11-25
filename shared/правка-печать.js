/* ═══════════════════════════════════════════════════════════════════════
   ПЕЧАТЬ (stamp): оттиск по полям.

       CW.правкаПечать(узел, файл, {менялось, счёт}) → {тело(), снимок()}

   Печать не рисуют, а заполняют: надпись по кругу сверху, строка в
   середине, вторая строка, надпись по кругу снизу. Ровный круг мышью
   не выведешь, поэтому круг, ободок и раскладку букв по дуге рисует
   сама программа, а человек выбирает форму, цвет и толщину ободка.

   Хранится разборно — поля, форма, цвет, — поэтому печать всегда можно
   поправить. Наружу уходит снимком с прозрачным фоном: оттиск ставят
   поверх бумаги, и белый квадрат под ним перекрыл бы текст.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ФОРМЫ = [
    { к: 'круг',   имя: 'Круглая',       ш: 620, в: 620 },
    { к: 'овал',   имя: 'Овальная',      ш: 760, в: 520 },
    { к: 'прямая', имя: 'Прямоугольная', ш: 760, в: 360 }
  ];

  var СЕМЬЯ = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif';

  function эл(тег, класс) {
    var у = document.createElement(тег);
    if (класс) у.className = класс;
    return у;
  }

  function формойПо(к) {
    for (var i = 0; i < ФОРМЫ.length; i++) if (ФОРМЫ[i].к === к) return ФОРМЫ[i];
    return ФОРМЫ[0];
  }

  function сНашим(набор, своё) {
    своё = Number(своё) || 0;
    if (!своё || набор.indexOf(своё) >= 0) return набор;
    return набор.concat([своё]).sort(function (а, б) { return а - б; });
  }

  function поУмолчанию() {
    return { форма: 'круг', верх: '', центр: '', вторая: '', низ: '',
             цвет: '#1b4fa8', толщина: 6 };
  }

  function изТела(тело) {
    var п = поУмолчанию();
    var д = null;
    try { д = JSON.parse(тело || ''); } catch (е) {}
    if (д && typeof д === 'object' && !Array.isArray(д)) {
      for (var к in п) if (Object.prototype.hasOwnProperty.call(д, к)) п[к] = д[к];
    }
    return п;
  }

  /* Буквы по дуге: раскладываем поровну по углу и ставим поперёк
     радиуса. Снизу идём в обратную сторону, иначе читается вверх
     ногами. */
  function поДуге(г, текст, цx, цy, rx, ry, кегль, снизу) {
    текст = String(текст || '');
    if (!текст) return;
    г.save();
    г.font = '600 ' + кегль + 'px ' + СЕМЬЯ;
    г.textAlign = 'center';
    г.textBaseline = 'middle';
    var радиус = (rx + ry) / 2;
    var размах = Math.min(Math.PI * 1.2, (г.measureText(текст).width * 1.1) / радиус);
    var середина = снизу ? Math.PI / 2 : -Math.PI / 2;
    var шаг = текст.length > 1 ? размах / (текст.length - 1) : 0;
    for (var i = 0; i < текст.length; i++) {
      var доля = текст.length > 1 ? (i * шаг - размах / 2) : 0;
      var угол = снизу ? (середина - доля) : (середина + доля);
      г.save();
      г.translate(цx + rx * Math.cos(угол), цy + ry * Math.sin(угол));
      г.rotate(угол + (снизу ? -Math.PI / 2 : Math.PI / 2));
      г.fillText(текст[i], 0, 0);
      г.restore();
    }
    г.restore();
  }

  /* Длинная строка не вылезает за ободок: ужимаем кегль по месту. */
  function строкой(г, текст, цx, y, кегль, жирно, ширина) {
    текст = String(текст || '');
    if (!текст) return;
    г.save();
    г.font = (жирно ? '700 ' : '400 ') + кегль + 'px ' + СЕМЬЯ;
    г.textAlign = 'center';
    г.textBaseline = 'middle';
    var ш = г.measureText(текст).width;
    if (ширина && ш > ширина) {
      г.font = (жирно ? '700 ' : '400 ')
             + Math.max(10, Math.floor(кегль * ширина / ш)) + 'px ' + СЕМЬЯ;
    }
    г.fillText(текст, цx, y);
    г.restore();
  }

  function скруглённый(г, x, y, ш, в, r) {
    г.beginPath();
    г.moveTo(x + r, y);
    г.lineTo(x + ш - r, y); г.quadraticCurveTo(x + ш, y, x + ш, y + r);
    г.lineTo(x + ш, y + в - r); г.quadraticCurveTo(x + ш, y + в, x + ш - r, y + в);
    г.lineTo(x + r, y + в); г.quadraticCurveTo(x, y + в, x, y + в - r);
    г.lineTo(x, y + r); г.quadraticCurveTo(x, y, x + r, y);
    г.closePath();
  }

  function наХолст(п, масштаб) {
    масштаб = масштаб || 1;
    var ф = формойПо(п.форма);
    var х = document.createElement('canvas');
    х.width = Math.round(ф.ш * масштаб);
    х.height = Math.round(ф.в * масштаб);
    var г = х.getContext('2d');
    г.scale(масштаб, масштаб);
    г.strokeStyle = п.цвет;
    г.fillStyle = п.цвет;
    var т = Number(п.толщина) || 6;
    var цx = ф.ш / 2, цy = ф.в / 2;

    if (п.форма === 'прямая') {
      var поле = т + 6;
      г.lineWidth = т;
      скруглённый(г, поле, поле, ф.ш - поле * 2, ф.в - поле * 2, 18);
      г.stroke();
      г.lineWidth = Math.max(1, т / 2);
      скруглённый(г, поле + 13, поле + 13,
                  ф.ш - (поле + 13) * 2, ф.в - (поле + 13) * 2, 12);
      г.stroke();
      строкой(г, п.верх,   цx, цy - 86, 34, false, ф.ш - 130);
      строкой(г, п.центр,  цx, цy - 20, 46, true,  ф.ш - 130);
      строкой(г, п.вторая, цx, цy + 40, 32, false, ф.ш - 130);
      строкой(г, п.низ,    цx, цy + 96, 28, false, ф.ш - 130);
      return х;
    }

    var rx = ф.ш / 2 - т - 6, ry = ф.в / 2 - т - 6;
    г.lineWidth = т;
    г.beginPath(); г.ellipse(цx, цy, rx, ry, 0, 0, Math.PI * 2); г.stroke();
    г.lineWidth = Math.max(1, т / 2);
    г.beginPath(); г.ellipse(цx, цy, rx - 17, ry - 17, 0, 0, Math.PI * 2); г.stroke();
    г.beginPath(); г.ellipse(цx, цy, rx - 76, ry - 64, 0, 0, Math.PI * 2); г.stroke();
    поДуге(г, п.верх, цx, цy, rx - 46, ry - 42, 30, false);
    поДуге(г, п.низ,  цx, цy, rx - 46, ry - 42, 26, true);
    строкой(г, п.центр,  цx, цy - 14, 40, true,  (rx - 84) * 2);
    строкой(г, п.вторая, цx, цy + 34, 28, false, (rx - 84) * 2);
    return х;
  }

  /* Наружу — чтобы документ мог взять готовую печать из папки. */
  CW.знакПечать = { изТела: изТела, наХолст: наХолст };

  CW.правкаПечать = function (куда, ф, зов) {
    var п = изТела(ф.body);

    var столбец = эл('div', 'фл-столбец');
    var полоса = эл('div', 'фл-полоса');
    var поля = эл('div', 'фл-поля');
    var сцена = эл('div', 'фл-сцена клеткой');
    var холст = эл('canvas', 'фл-холст фл-клетка');
    сцена.appendChild(холст);
    столбец.appendChild(полоса);
    столбец.appendChild(поля);
    столбец.appendChild(сцена);
    куда.appendChild(столбец);

    /* ── полоса: форма, цвет, толщина ободка ── */
    var форма = эл('select');
    форма.title = Т('Форма');
    ФОРМЫ.forEach(function (о) {
      var э = document.createElement('option');
      э.value = о.к; э.textContent = о.имя;
      if (о.к === п.форма) э.selected = true;
      форма.appendChild(э);
    });
    форма.onchange = function () { п.форма = this.value; зов.менялось(); перерисовать(); };
    полоса.appendChild(форма);

    var палитра = null;
    var цвет = эл('button', 'фл-цвет');
    цвет.type = 'button';
    цвет.title = Т('Цвет оттиска');
    цвет.style.setProperty('--цвет', п.цвет);
    цвет.onclick = function () {
      if (палитра) { палитра.убрать(); палитра = null; return; }
      CW.нужен('shared/выбор-знака.js').then(function () {
        палитра = CW.палитраЦвета(холст.closest('.ок-окно') || столбец, {
          цвет: п.цвет,
          меняется: function (ц) {
            п.цвет = ц;
            цвет.style.setProperty('--цвет', ц);
            зов.менялось();
            перерисовать();
          },
          закрыли: function () { палитра = null; }
        });
        палитра.узел.classList.add('под-полосой');
      });
    };
    полоса.appendChild(цвет);

    var толщина = эл('select');
    толщина.title = Т('Толщина ободка');
    сНашим([4, 6, 9, 13], п.толщина).forEach(function (т) {
      var о = document.createElement('option');
      о.value = т; о.textContent = т;
      if (т === п.толщина) о.selected = true;
      толщина.appendChild(о);
    });
    толщина.onchange = function () {
      п.толщина = Number(this.value) || 6;
      зов.менялось();
      перерисовать();
    };
    полоса.appendChild(толщина);

    /* ── поля оттиска ── */
    [['верх', Т('Надпись по кругу сверху')],
     ['центр', 'В середине'],
     ['вторая', Т('Вторая строка середины')],
     ['низ', Т('Надпись по кругу снизу')]].forEach(function (о) {
      var поле = эл('input', 'фл-строка');
      поле.value = п[о[0]] || '';
      поле.placeholder = о[1];
      поле.spellcheck = false;
      поле.oninput = function () {
        п[о[0]] = this.value;
        зов.менялось();
        перерисовать();
      };
      поля.appendChild(поле);
    });

    function перерисовать() {
      var ф0 = формойПо(п.форма);
      холст.width = ф0.ш;
      холст.height = ф0.в;
      var г = холст.getContext('2d');
      г.clearRect(0, 0, ф0.ш, ф0.в);
      г.drawImage(наХолст(п, 1), 0, 0);
      зов.счёт(Т(ф0.имя) + ' · ' + ф0.ш + '×' + ф0.в);
    }

    перерисовать();

    return {
      тело: function () { return JSON.stringify(п); },
      снимок: function () { return наХолст(п, 2); },
      расширение: 'png'
    };
  };
})();
