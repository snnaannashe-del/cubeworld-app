/* ═══════════════════════════════════════════════════════════════════════
   ПРИГЛАШЕНИЯ.

   Главное здесь — ссылка, и она должна копироваться одним нажатием.
   Код, который надо переписывать руками, приглашениями не пользуются.

   Сколько приглашено и сколько заработано показываем рядом со ссылкой,
   а не отдельной страницей: человек делится охотнее, когда видит, что
   с прошлых раз что-то вышло.

       CW.открыть('invites');
   ═══════════════════════════════════════════════════════════════════════ */
CW.модаль('invites', function (данные) {
  'use strict';
  данные = данные || {};

  var М = CW.модалка({
    имя: 'приглашения',
    знак: 'звено',
    заголовок: 'Приглашения',
    подзаголовок: 'спрашиваю…'
  });
  М.открыть();
  CW.ждём(М.тело);

  CW.спросить('/me/referral', { тихо: true })
    .then(нарисовать)
    .catch(function (е) {
      М.пусто({ знак: 'внимание', заголовок: 'Не открылось',
                текст: (е && е.сеть) ? 'Нет связи с сервером'
                                     : ((е && е.message) || 'Сервер не ответил') });
    });

  function нарисовать(д) {
    д = д || {};
    var код = д.code || '';
    var ссылка = location.origin + (location.pathname.indexOf('/windows/') >= 0
                   ? location.pathname.replace(/\/windows\/.*$/, '/') : '/')
               + 'index.html?ref=' + encodeURIComponent(код);

    М.имя('Приглашения', код ? ('твой код · ' + код) : 'кода пока нет');
    М.тело.innerHTML = '';

    /* ── ссылка ── */
    var поле = document.createElement('div');
    поле.className = 'ок-поле';
    поле.innerHTML = '<label>Твоя ссылка</label>';
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
    кн.textContent = 'Копировать';
    кн.onclick = function () { скопировать(ссылка); };
    ряд.appendChild(кн);
    поле.appendChild(ряд);
    М.тело.appendChild(поле);

    /* ── что вышло ── */
    var счёты = document.createElement('div');
    счёты.className = 'оц-счёты';
    [[д.invited || 0, 'приглашено'],
     [д.active || 0, 'прижилось'],
     [Math.round(Number(д.earned || 0)), 'CUBE заработано']
    ].forEach(function (п) {
      var к = document.createElement('div');
      к.className = 'оц-счёт';
      к.innerHTML = '<b>' + п[0] + '</b><span>' + п[1] + '</span>';
      счёты.appendChild(к);
    });
    М.тело.appendChild(счёты);

    if (Number(д.bonus_inviter || 0) || Number(д.bonus_friend || 0)) {
      var п = document.createElement('div');
      п.className = 'подсказ';
      п.style.cssText = 'margin-top:12px;line-height:1.65';
      п.textContent = 'За каждого, кто придёт по ссылке и останется: тебе '
        + Math.round(Number(д.bonus_inviter || 0)) + ' CUBE, ему '
        + Math.round(Number(д.bonus_friend || 0)) + ' CUBE.';
      М.тело.appendChild(п);
    }

    /* ── кто пришёл ── */
    var друзья = д.friends || [];
    if (друзья.length) {
      var зг = document.createElement('div');
      зг.className = 'по-раздел';
      зг.style.padding = '18px 0 6px';
      зг.textContent = 'Пришли по ссылке';
      М.тело.appendChild(зг);

      друзья.slice(0, 20).forEach(function (ч) {
        var с = document.createElement('div');
        с.className = 'ок-строка';
        с.appendChild(CW.кружок({ размер: 34, кто: ч.id, снимок: ч.avatar_url,
                                  версия: ч.avatar_ver }));
        var т = document.createElement('div');
        т.className = 'текст';
        т.innerHTML = '<b>' + CW.безопасно(CW.имяЧеловека(ч)) + '</b>'
                    + '<span>' + (ч.active ? 'остался' : 'пока осматривается') + '</span>';
        if (CW.лица) CW.лица.подписать(т.querySelector('b'), ч.id, CW.имяЧеловека(ч));
        с.appendChild(т);
        М.тело.appendChild(с);
      });
    }
  }

  function скопировать(текст) {
    CW.вбуфер(текст, 'Ссылка скопирована');
  }

  return М;
});
