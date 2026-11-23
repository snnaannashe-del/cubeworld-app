/* ═══════════════════════════════════════════════════════════════════════
   ПОДЕЛИТЬСЯ.

   Сначала пробуем то, что умеет сама система: на телефоне это родное
   окно «Поделиться» со всеми установленными программами, и ничего
   лучше мы не сделаем. На маке и в обычном браузере его нет — тогда
   показываем своё: ссылку, кнопку копирования и пару мест, куда
   отправляют чаще всего.

   Ссылку собираем здесь, а не принимаем готовой: окно, которое просят
   «поделись вот этим», должно само знать, как выглядит адрес записи,
   группы или профиля. Иначе каждый зовущий соберёт её по-своему, и
   однажды кто-нибудь ошибётся.

       CW.открыть('share', {что:'пост', ид:12, имя:'…'});
       что: пост | группа | куб | профиль | товар
   ═══════════════════════════════════════════════════════════════════════ */
CW.модаль('share', function (данные) {
  'use strict';
  данные = данные || {};

  var корень = location.origin
    + (location.pathname.indexOf('/windows/') >= 0
        ? location.pathname.replace(/\/windows\/.*$/, '/')
        : location.pathname.replace(/\/[^\/]*$/, '/'));

  var АДРЕСА = {
    пост:    function (ид) { return корень + 'feed.html?пост=' + ид; },
    группа:  function (ид) { return корень + 'windows/group.html?ид=' + ид; },
    куб:     function (ид) { return корень + 'feed.html?id=' + ид; },
    профиль: function (ид) { return корень + 'windows/profile.html?кто=' + ид; },
    товар:   function (ид) { return корень + 'market.html?товар=' + ид; }
  };

  var делать = АДРЕСА[данные.что] || АДРЕСА.пост;
  var ссылка = данные.ссылка || делать(данные.ид);
  var подпись = данные.имя || '';

  /* Родное окно системы — лучшее, что может быть. Пробуем его первым,
     и если оно есть, своё окно не показываем вовсе. */
  if (navigator.share && !данные.своё) {
    navigator.share({ title: подпись || 'CubeWorld', url: ссылка })
      .catch(function () { своё(); });
    return null;
  }

  return своё();

  function своё() {
    var М = CW.модалка({
      имя: 'поделиться',
      знак: 'поделиться',
      заголовок: Т('Поделиться'),
      подзаголовок: подпись || ссылка.replace(/^https?:\/\//, ''),
      подвал: [
        { имя: 'закрыть', подпись: Т('Закрыть'), делать: function () { М.закрыть(); } }
      ]
    });

    var поле = document.createElement('div');
    поле.className = 'ок-поле';
    поле.innerHTML = '<label>' + CW.безопасно(Т('Ссылка')) + '</label>';
    var ряд = document.createElement('div');
    ряд.style.cssText = 'display:flex;gap:8px';
    var вход = document.createElement('input');
    вход.type = 'text';
    вход.readOnly = true;
    вход.value = ссылка;
    вход.onclick = function () { this.select(); };
    ряд.appendChild(вход);
    var кн = document.createElement('button');
    кн.className = 'кнопка главная';
    кн.style.flex = '0 0 auto';
    кн.textContent = Т('Копировать');
    кн.onclick = function () { скопировать(ссылка); };
    ряд.appendChild(кн);
    поле.appendChild(ряд);
    М.тело.appendChild(поле);

    /* Внутри программы — переслать в переписку. Это самое частое, и
       оно не требует выходить наружу вовсе. */
    var внутри = document.createElement('button');
    внутри.type = 'button';
    внутри.className = 'ок-строка';
    внутри.style.cssText = 'width:100%;border:none;background:none;'
                         + 'cursor:pointer;text-align:left;color:var(--текст)';
    var зн = document.createElement('div');
    зн.className = 'ок-знак';
    зн.innerHTML = CW.значок('речь');
    внутри.appendChild(зн);
    var т = document.createElement('div');
    т.className = 'текст';
    т.innerHTML = '<b>' + CW.безопасно(Т('Переслать в переписку')) + '</b>'
                + '<span>' + CW.безопасно(Т('Выбрать, кому: и ссылка уйдёт сообщением')) + '</span>';
    внутри.appendChild(т);
    внутри.onclick = function () {
      М.закрыть();
      CW.уйти(CW.раздел('chats') + '?переслать=' + encodeURIComponent(ссылка));
    };
    М.тело.appendChild(внутри);

    var п = document.createElement('div');
    п.className = 'подсказ';
    п.style.cssText = 'margin-top:12px;line-height:1.65';
    п.textContent = Т('По ссылке откроется ровно это место. Если оно закрытое, ')
      + 'тот, кому ты её дашь, увидит просьбу войти.';
    М.тело.appendChild(п);

    М.открыть();
    return М;
  }

  function скопировать(текст) {
    CW.вбуфер(текст, Т('Ссылка скопирована'));
  }
});
