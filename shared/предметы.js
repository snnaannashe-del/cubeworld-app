/* ═══════════════════════════════════════════════════════════════════════
   ПРЕДМЕТЫ ПОВЕРХ ЛИСТА.    /home/claude/новое/cubeworld-app/shared/предметы.js

       var пред = CW.предметы(слой, {менялось, посчитать});

       пред.ставить(разметка, доля)   положить предмет, вернуть узел
       пред.оживить()                 вернуть ручки тем, что пришли
                                      готовой разметкой
       пред.рисунками()               [{рис, x, y, w}] — для файлов,
                                      где предмет только картинка
       пред.поставить(список)         обратно из такого списка

   Картинка, кадр ролика, подпись и печать не встают в строку текста:
   они лежат ПОВЕРХ листа и ставятся куда угодно. Так с ними и
   обращаются на бумаге — подпись в правом нижнем углу, печать поверх
   неё, картинка сбоку от текста.

   Место и ширину держим долями от слоя, а не точками: лист у телефона
   и у большого экрана разной ширины, а предмет должен стоять там же —
   и на экране, и в готовом PDF.

   Сам предмет буквами не правится (contenteditable=false): иначе
   курсор заходит внутрь него и человек печатает в картинку.

   Почему отдельным файлом. Так было в документе, и ровно то же нужно
   таблице: подпись и печать ставят и на счёт, и на смету. Второй
   раз писать перенос, уголок и крестик — значит завести два разных
   поведения у одной и той же вещи.

   Разница только в том, куда предметы ложатся и как хранятся: в
   документе слой — сам лист, и предметы уходят в файл вместе с
   разметкой; в таблице слой свой, поверх клеток, и предметы уходят
   служебной строкой ⟦знаки⟧ (shared/файлы.js).
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function эл(тег, класс) {
    var у = document.createElement(тег);
    if (класс) у.className = класс;
    return у;
  }

  CW.предметы = function (слой, зов) {
    зов = зов || {};
    var тихо = false;         /* пока раскладываем сохранённое */

    function сказали() {
      if (тихо) return;
      if (зов.менялось) зов.менялось();
      if (зов.посчитать) зов.посчитать();
    }

    function положить(э) {
      э.style.left = (Number(э.dataset.x) * 100).toFixed(3) + '%';
      э.style.top = (Number(э.dataset.y) * 100).toFixed(3) + '%';
      э.style.width = (Number(э.dataset.w) * 100).toFixed(3) + '%';
    }

    function ставить(внутри, доля) {
      var э = эл('div', 'фл-пред');
      э.setAttribute('contenteditable', 'false');
      э.dataset.x = 0.08;
      э.dataset.y = 0.08;
      э.dataset.w = доля || 0.3;
      э.innerHTML = внутри;
      положить(э);
      слой.appendChild(э);
      оживить(э);
      сказали();
      return э;
    }

    function оживитьВсе() {
      [].slice.call(слой.querySelectorAll('.фл-пред')).forEach(оживить);
    }

    function оживить(э) {
      if (э.__живой) return;
      э.__живой = true;
      э.setAttribute('contenteditable', 'false');

      var уг = эл('div', 'фл-уг');
      уг.title = 'Потяни за уголок';
      var кр = эл('button', 'фл-убрать');
      кр.type = 'button';
      кр.title = 'Убрать';
      кр.textContent = '✕';
      э.appendChild(уг);
      э.appendChild(кр);

      кр.onclick = function (е) {
        е.preventDefault();
        е.stopPropagation();
        if (э.parentNode) э.parentNode.removeChild(э);
        сказали();
      };

      var ведём = null, тянем = null;

      /* ── перенос: берут за сам предмет ── */
      э.addEventListener('pointerdown', function (е) {
        if (е.target === уг || е.target === кр) return;
        е.preventDefault();
        выбрать(э);
        try { э.setPointerCapture(е.pointerId); } catch (б) {}
        var р = слой.getBoundingClientRect();
        var с = э.getBoundingClientRect();
        ведём = { dx: (е.clientX - с.left) / р.width,
                  dy: (е.clientY - с.top) / р.height,
                  ш: р.width, в: р.height, л: р.left, т: р.top };
      });

      /* ── размер: берут за уголок ── */
      уг.addEventListener('pointerdown', function (е) {
        е.preventDefault();
        е.stopPropagation();
        выбрать(э);
        try { уг.setPointerCapture(е.pointerId); } catch (б) {}
        var р = слой.getBoundingClientRect();
        тянем = { ш: р.width, л: р.left };
      });

      function двигаем(е) {
        if (ведём) {
          var x = (е.clientX - ведём.л) / ведём.ш - ведём.dx;
          var y = (е.clientY - ведём.т) / ведём.в - ведём.dy;
          э.dataset.x = Math.max(0, Math.min(0.98, x));
          э.dataset.y = Math.max(0, Math.min(0.99, y));
          положить(э);
          return;
        }
        if (тянем) {
          var ш = (е.clientX - тянем.л) / тянем.ш - Number(э.dataset.x);
          э.dataset.w = Math.max(0.05, Math.min(1, ш));
          положить(э);
        }
      }
      э.addEventListener('pointermove', двигаем);
      уг.addEventListener('pointermove', двигаем);

      function бросить() {
        if (!ведём && !тянем) return;
        ведём = null;
        тянем = null;
        сказали();
      }
      ['pointerup', 'pointercancel'].forEach(function (с) {
        э.addEventListener(с, бросить);
        уг.addEventListener(с, бросить);
      });
    }

    function выбрать(э) {
      [].slice.call(слой.querySelectorAll('.фл-пред.взят')).forEach(function (д) {
        if (д !== э) д.classList.remove('взят');
      });
      э.classList.add('взят');
    }

    слой.addEventListener('click', function (е) {
      if (!е.target.closest || !е.target.closest('.фл-пред')) {
        [].slice.call(слой.querySelectorAll('.фл-пред.взят')).forEach(function (д) {
          д.classList.remove('взят');
        });
      }
    });

    оживитьВсе();

    return {
      ставить: ставить,
      оживить: оживитьВсе,

      /* Таблице хранить разметку незачем: на клетках лежат только
         картинки — подпись, печать, снимок. Поэтому наружу отдаём
         адрес картинки и место, а не кусок разметки: так в файле не
         окажется ничего, что потом придётся выполнять. */
      рисунками: function () {
        return [].slice.call(слой.querySelectorAll('.фл-пред'))
          .map(function (э) {
            var и = э.querySelector('img');
            return и ? { рис: и.getAttribute('src'),
                         x: Number(э.dataset.x) || 0,
                         y: Number(э.dataset.y) || 0,
                         w: Number(э.dataset.w) || 0.26 } : null;
          })
          .filter(function (о) { return о && о.рис; });
      },

      поставить: function (список) {
        тихо = true;
        (список || []).forEach(function (о) {
          if (!о || !о.рис) return;
          var э = ставить('<img src="' + CW.безопасно(о.рис) + '" alt="">', о.w);
          э.dataset.x = о.x || 0;
          э.dataset.y = о.y || 0;
          положить(э);
        });
        тихо = false;
      }
    };
  };
})();
