/* ═══════════════════════════════════════════════════════════════════════
   ГОЛОСОВОЙ ПОМОЩНИК.

   Нажал микрофон — и говоришь командами подряд, не нажимая кнопку перед
   каждой. Распознавание делает сам браузер.

       CW.нужен('shared/голос.js').then(function () {
         CW.голос.переключить();        включить или выключить микрофон
         CW.голос.команды();            весь список — для окна
         CW.голос.добавить({…});        своя команда от другого куска
       });

   ── Чего он НЕ умеет, и мы говорим об этом прямо ───────────────────
   Свободную речь он не понимает — только слова из списка. И на телефоне
   микрофон работает ТОЛЬКО по https: по http браузер не даёт к нему
   доступ вовсе. Это правило самого браузера, обойти его нельзя, и
   честнее сказать это сразу, чем показывать кнопку, которая молчит.

   Речь уходит на серверы того, кто делал браузер: у Chrome это Google.
   Так устроено их распознавание, и площадка на это не влияет. Поэтому
   микрофон включается только кнопкой и гаснет, как только его снимут.

   ── Язык речи — свой ключ, и это важнее, чем кажется ───────────────
   В боевой программе он брался из «языка перевода сообщений». Стоило раз
   перевести чужое сообщение на английский — и распознавание начинало
   слушать английский. Человек говорит «лента», браузер слышит «lenta», и
   ни одна команда не узнаётся. Выглядит как «он меня не понимает», а на
   самом деле он слушал не тот язык. Здесь язык речи хранится отдельно и
   меняется только в окне голосовых команд.

   ── Слова отдельно от действий ─────────────────────────────────────
   Добавить язык — значит добавить набор слов, а не трогать действия.
   Сейчас слов шестнадцать языков; местные выговоры (Канада, Мексика,
   залив, Индия) берут слова своего основного языка.
   ═══════════════════════════════════════════════════════════════════════ */
(function (окно, документ) {
  'use strict';
  var CW = окно.CW = окно.CW || {};

  /* ═════════════════════════════════════════════════════════════════════
     ЯЗЫКИ РЕЧИ

     Рядом с основными стоят их местные выговоры. Это не прихоть:
     распознавание слушает именно выбранный код, и «Español (España)» с
     «Español (Latinoamérica)» для него разные языки — в Мексике по
     испанскому из Испании слова узнаются заметно хуже.
     ═════════════════════════════════════════════════════════════════════ */
  var ЯЗЫКИ = [
    ['ru-RU', 'Русский', 'ru'],
    ['en-US', 'English', 'en'],
    ['en-IN', 'English (India)', 'en'],
    ['uk-UA', 'Українська', 'uk'],
    ['de-DE', 'Deutsch', 'de'],
    ['fr-FR', 'Français', 'fr'],
    ['fr-CA', 'Français (Canada)', 'fr'],
    ['es-ES', 'Español', 'es'],
    ['es-MX', 'Español (Latinoamérica)', 'es'],
    ['it-IT', 'Italiano', 'it'],
    ['pt-PT', 'Português', 'pt'],
    ['pl-PL', 'Polski', 'pl'],
    ['tr-TR', 'Türkçe', 'tr'],
    ['ar-SA', 'العربية', 'ar'],
    ['ar-AE', 'العربية (الخليج)', 'ar'],
    ['vi-VN', 'Tiếng Việt', 'vi'],
    ['zh-CN', '中文', 'zh'],
    ['ja-JP', '日本語', 'ja'],
    ['ko-KR', '한국어', 'ko'],
    ['hi-IN', 'हिन्दी', 'hi']
  ];
  CW.голос = {};
  CW.голос.ЯЗЫКИ = ЯЗЫКИ.map(function (я) { return { код: я[0], имя: я[1] }; });

  function известен(код) {
    for (var i = 0; i < ЯЗЫКИ.length; i++) if (ЯЗЫКИ[i][0] === код) return true;
    return false;
  }
  function короткий(код) {
    for (var i = 0; i < ЯЗЫКИ.length; i++) if (ЯЗЫКИ[i][0] === код) return ЯЗЫКИ[i][2];
    return 'ru';
  }

  var ПАМЯТЬ = 'cw_язык-речи', ВСЛУХ = 'cw_отвечает-вслух';
  /* ── ПОЧЕМУ МИКРОФОН ПЕРЕЖИВАЕТ ПЕРЕХОД ──
     Почти каждая команда уводит на другую страницу: «лента», «кошелёк»,
     «в мир». Страница перезагружается — и распознавание умирает вместе
     с ней. Со стороны это выглядит так: сказал одну команду, микрофон
     погас, говори снова — и так каждый раз.

     Поэтому помним, что он был включён, и поднимаем его на новой
     странице сами. Разрешение на микрофон браузер даёт не на страницу, а
     на адрес целиком, и второй раз не спрашивает.

     Флаг живёт во вкладке (sessionStorage), а не навсегда: закрыл
     вкладку — микрофон не включится сам при следующем заходе. Включать
     микрофон без спроса на новом сеансе нельзя. */
  var СЛУШАЛ = 'cw_голос-слушал';
  function пометить(да) {
    try {
      if (да) окно.sessionStorage.setItem(СЛУШАЛ, '1');
      else окно.sessionStorage.removeItem(СЛУШАЛ);
    } catch (е) {}
  }
  /* ── ПЕРЕЗАГРУЗКА — НЕ ПЕРЕХОД ──
     Пометка «микрофон был включён» живёт на время вкладки, и этого
     хватало для наших переходов. Но обычное обновление страницы (F5,
     кнопка в браузере) для вкладки тоже «та же вкладка» — и микрофон
     поднимался сам, хотя человек его не включал. Это пугает: прибор,
     который сам просыпается, выглядит как прибор, который слушает
     всегда.

     Отличаем по тому, как браузер пришёл на страницу: 'reload' — это
     обновление, и тогда пометку снимаем вовсе. Микрофон после неё
     включает только человек. */
  var ПЕРЕЗАГРУЗКА = (function () {
    try {
      var з = окно.performance && окно.performance.getEntriesByType
            ? окно.performance.getEntriesByType('navigation')[0] : null;
      if (з && з.type) return з.type === 'reload';
      /* Старые браузеры: 1 — TYPE_RELOAD. */
      return !!(окно.performance && окно.performance.navigation
                && окно.performance.navigation.type === 1);
    } catch (е) { return false; }
  })();

  CW.голос.слушалРаньше = function () {
    if (ПЕРЕЗАГРУЗКА) { пометить(false); return false; }
    try { return окно.sessionStorage.getItem(СЛУШАЛ) === '1'; } catch (е) { return false; }
  };

  CW.голос.язык = function (код) {
    if (код === undefined) {
      var свой = null;
      try { свой = CW.взять(ПАМЯТЬ); } catch (е) {}
      return (свой && известен(свой)) ? свой : 'ru-RU';
    }
    if (!известен(код)) return;
    try { CW.положить(ПАМЯТЬ, код); } catch (е) {}
    /* У запущенного распознавания язык не поменять — поднимаем заново. */
    if (хотим) { CW.голос.выключить(true); setTimeout(CW.голос.включить, 250); }
    сказатьВсем();
  };

  /* По умолчанию помощник ОТВЕЧАЕТ МОЛЧА. Голос в наушниках, когда его
     не просили, пугает сильнее, чем радует: у человека может играть
     музыка, рядом могут спать. Включается он одной кнопкой в окне
     голосовых команд и запоминается. */
  CW.голос.вслух = function (да) {
    if (да === undefined) {
      try { return CW.взять(ВСЛУХ) === '1'; } catch (е) { return false; }
    }
    try { CW.положить(ВСЛУХ, да ? '1' : ''); } catch (е) {}
    сказатьВсем();
    return !!да;
  };

  /* ═════════════════════════════════════════════════════════════════════
     ЕСТЬ ЛИ ЧЕМ СЛУШАТЬ
     ═════════════════════════════════════════════════════════════════════ */
  function Распознавание() {
    return окно.SpeechRecognition || окно.webkitSpeechRecognition || null;
  }
  CW.голос.есть = function () { return !!Распознавание(); };

  /* Микрофон требует защищённого соединения. По http его не будет —
     и лучше сказать это сразу, чем показывать молчащую кнопку. */
  CW.голос.защищено = function () {
    try {
      return окно.isSecureContext === true
          || location.protocol === 'https:'
          || location.hostname === 'localhost'
          || location.hostname === '127.0.0.1';
    } catch (е) { return false; }
  };

  CW.голос.беда = function () {
    if (!CW.голос.есть()) return 'Этот браузер не умеет распознавать речь. '
      + 'Команды из списка всё равно делаются руками.';
    if (!CW.голос.защищено()) return 'Микрофон работает только по защищённому '
      + 'адресу (https). По обычному http браузер к нему не пускает.';
    return '';
  };

  /* ═════════════════════════════════════════════════════════════════════
     КОМАНДЫ
     ═════════════════════════════════════════════════════════════════════ */
  function идти(имя) {
    CW.уйти(CW.раздел(имя, CW.какойКуб ? CW.какойКуб() : null));
  }
  function вОкно(имя) {
    try { окно.sessionStorage.setItem('cw_откуда', ''); } catch (е) {}
    CW.уйти(CW.окно(имя));
  }
  function тема(какая) {
    if (CW.оформление) CW.оформление.поставить({ тема: какая });
  }
  function наверх() {
    try { окно.scrollTo({ top: 0, behavior: 'smooth' }); } catch (е) { окно.scrollTo(0, 0); }
    var т = документ.querySelector('.ок-подложка.видно .ок-тело');
    if (т) т.scrollTop = 0;
  }
  function закрытьВерхнее() {
    var п = документ.querySelectorAll('.ок-подложка.видно');
    var в = п[п.length - 1];
    if (!в) return;
    var х = в.querySelector('.ок-кн.выход');
    if (х) х.click();
  }
  /* Лента отдаёт наружу семь действий. Нет её на странице — значит
     человек не в ленте: уводим туда, а не молчим. */
  function вЛенте(что, довод, ответ) {
    if (!CW.лента) {
      if (что === 'вкладка' && довод) {
        try { CW.положить('cw_feed_tab', довод); } catch (е) {}
      }
      идти('feed');
      return 'Это в ленте: открываю ленту';
    }
    CW.лента[что](довод);
    return ответ;
  }

  /* Раздел рынка запоминаем и уходим на витрину: страница поднимет его
     из памяти сама. */
  function вРынок(режим) {
    try { CW.положить('cw_рынок', режим); } catch (е) {}
    идти('market');
  }

  function сказатьСчёт() {
    CW.спросить('/me', { тихо: true }).then(function (я) {
      if (!я) { говорить('Счёт не ответил'); return; }
      говорить('На счету ' + Math.round(я.cube_balance || 0) + ' CUBE');
    });
  }

  var КОМАНДЫ = [
    { к: 'feed', раздел: 'Разделы', имя: 'Открыть ленту',
      слова: { ru:['лент','новости','видео лент'], en:['feed','shorts feed','news'], uk:['стрічк','новин'], de:['feed','neuigkeiten','startseite'], fr:['fil','actualité','accueil'], es:['feed','noticias','inicio'], it:['feed','notizie','home'], pt:['feed','notícias','início'], pl:['aktualnoś','kanał','strona główna'], tr:['akış','haberler','ana sayfa'], ar:['التغذية','الأخبار','الرئيسية'], vi:['bảng tin','tin tức','trang chủ'], zh:['动态','信息流','首页'], ja:['フィード','ニュース','ホーム'], ko:['피드','뉴스','홈'], hi:['फ़ीड','खबर','होम'] },
      делать: function () { идти('feed'); return 'Открываю ленту'; } },
    { к: 'chat', раздел: 'Разделы', имя: 'Открыть чаты',
      слова: { ru:['чат','сообщен','переписк','личк'], en:['chat','message','dm'], uk:['чат','повідомлен','листуван'], de:['chat','nachricht'], fr:['discussion','message','chat'], es:['chat','mensaje'], it:['chat','messaggio'], pt:['conversa','mensagem','chat'], pl:['czat','wiadomoś'], tr:['sohbet','mesaj'], ar:['محادثة','رسائل','دردشة'], vi:['trò chuyện','tin nhắn','chat'], zh:['聊天','消息'], ja:['チャット','メッセージ'], ko:['채팅','메시지'], hi:['चैट','संदेश'] },
      делать: function () { идти('chats'); return 'Открываю чаты'; } },
    { к: 'groups', раздел: 'Разделы', имя: 'Открыть группы',
      слова: { ru:['групп','сообществ'], en:['group','communit'], uk:['груп','спільнот'], de:['gruppe','community'], fr:['groupe','communauté'], es:['grupo','comunidad'], it:['gruppo','comunità'], pt:['grupo','comunidade'], pl:['grup','społeczno'], tr:['grup','topluluk'], ar:['مجموعة','مجموعات','مجتمع'], vi:['nhóm','cộng đồng'], zh:['群组','社区'], ja:['グループ','コミュニティ'], ko:['그룹','커뮤니티'], hi:['समूह','ग्रुप'] },
      делать: function () { идти('groups'); return 'Открываю группы'; } },
    { к: 'signals', раздел: 'Разделы', имя: 'Открыть сигналы',
      слова: { ru:['сигнал'], en:['signal'], uk:['сигнал'], de:['signal'], fr:['signal','signaux'], es:['señal','señales'], it:['segnale','segnali'], pt:['sinal','sinais'], pl:['sygnał'], tr:['sinyal'], ar:['إشارة','إشارات'], vi:['tín hiệu'], zh:['信号'], ja:['シグナル'], ko:['시그널','신호'], hi:['सिग्नल','संकेत'] },
      делать: function () { идти('signals'); return 'Открываю сигналы'; } },
    { к: 'market', раздел: 'Разделы', имя: 'Открыть маркетплейс',
      слова: { ru:['маркет','витрин','товар'], en:['market','storefront','goods'], uk:['маркет','товар'], de:['markt','marktplatz','ware'], fr:['marché','boutique','article'], es:['mercado','tienda','producto'], it:['mercato','negozio','prodotto'], pt:['mercado','loja','produto'], pl:['rynek','sklep','towar'], tr:['pazar','mağaza','ürün'], ar:['سوق','متجر','منتج'], vi:['chợ','cửa hàng','sản phẩm'], zh:['市场','商店','商品'], ja:['マーケット','ショップ','商品'], ko:['마켓','상점','상품'], hi:['बाज़ार','दुकान','सामान'] },
      делать: function () { идти('market'); return 'Открываю маркетплейс'; } },
    { к: 'earn', раздел: 'Разделы', имя: 'Открыть «Заработать»',
      слова: { ru:['заработ','награ','доход','монетизац'], en:['earn','reward','income'], uk:['заробіт','заробл','дохід','нагород'], de:['verdien','belohnung','einnahmen'], fr:['gagner','récompense','revenu'], es:['ganar','recompensa','ingreso'], it:['guadagn','ricompensa','entrate'], pt:['ganhar','recompensa','renda'], pl:['zarob','nagrod','dochód'], tr:['kazan','ödül','gelir'], ar:['اربح','ربح','مكافأة','دخل'], vi:['kiếm tiền','phần thưởng','thu nhập'], zh:['赚钱','奖励','收入'], ja:['稼ぐ','報酬','収入'], ko:['수익','보상','벌기'], hi:['कमाई','इनाम','कमाओ'] },
      делать: function () { идти('earn'); return 'Открываю «Заработать»'; } },
    { к: 'wallet', раздел: 'Разделы', имя: 'Открыть кошелёк',
      слова: { ru:['кошел','счёт','счет'], en:['wallet','account'], uk:['гаманц','гаманец','рахунок'], de:['brieftasche','geldbörse','konto'], fr:['portefeuille','compte'], es:['cartera','billetera','cuenta'], it:['portafoglio','conto'], pt:['carteira','conta'], pl:['portfel','konto'], tr:['cüzdan','hesap'], ar:['محفظة','حساب'], vi:['ví','tài khoản'], zh:['钱包','账户'], ja:['ウォレット','財布','口座'], ko:['지갑','계정'], hi:['वॉलेट','बटुआ','खाता'] },
      делать: function () { идти('wallet'); return 'Открываю кошелёк'; } },
    { к: 'analytics', раздел: 'Разделы', имя: 'Открыть аналитику',
      слова: { ru:['аналитик','статистик'], en:['analytic','statistic'], uk:['аналітик','статистик'], de:['analyse','statistik'], fr:['analyse','statistique'], es:['analítica','estadística'], it:['analisi','statistic'], pt:['análise','estatística'], pl:['analityk','statystyk'], tr:['analiz','istatistik'], ar:['تحليلات','إحصائيات'], vi:['phân tích','thống kê'], zh:['分析','统计'], ja:['分析','統計'], ko:['분석','통계'], hi:['विश्लेषण','आँकड़े'] },
      делать: function () { идти('stats'); return 'Открываю аналитику'; } },
    { к: 'refs', раздел: 'Разделы', имя: 'Рефералы',
      слова: { ru:['реферал','приглас','приглаш','пригласи'], en:['referral','invite'], uk:['запрош','реферал'], de:['einladung','empfehlung'], fr:['invitation','parrainage'], es:['invitación','referido'], it:['invito','referral'], pt:['convite','indicação'], pl:['zaproszen','polecen'], tr:['davet','referans'], ar:['دعوة','إحالة'], vi:['lời mời','giới thiệu'], zh:['邀请','推荐'], ja:['招待','紹介'], ko:['초대','추천인'], hi:['निमंत्रण','रेफरल'] },
      делать: function () { идти('refs'); return 'Открываю приглашения'; } },
    { к: 'exit', раздел: 'Разделы', имя: 'В мир',
      слова: { ru:['в мир','выйти из куба','наружу','на карту'], en:['world','exit cube','go out'], uk:['у світ','вийти з куба','на карту'], de:['zur welt','würfel verlassen'], fr:['au monde','quitter le cube'], es:['al mundo','salir del cubo'], it:['al mondo','esci dal cubo'], pt:['para o mundo','sair do cubo'], pl:['do świata','wyjdź z kostki'], tr:['dünyaya','küpten çık'], ar:['إلى العالم','اخرج من المكعب'], vi:['ra thế giới','thoát khối'], zh:['回到世界','离开方块'], ja:['ワールドへ','キューブを出る'], ko:['월드로','큐브 나가기'], hi:['दुनिया में','क्यूब से बाहर'] },
      делать: function () { CW.уйти(CW.раздел('world')); return 'Возвращаю в мир'; } },
    { к: 'profile', раздел: 'Окна', имя: 'Мой профиль',
      слова: { ru:['мой профиль','профиль','моя страница','портфолио'], en:['my profile','profile'], uk:['мій профіль','профіл','портфоліо'], de:['mein profil','profil'], fr:['mon profil','profil'], es:['mi perfil','perfil'], it:['il mio profilo','profilo'], pt:['meu perfil','perfil'], pl:['mój profil','profil'], tr:['profilim','profil'], ar:['ملفي','الملف الشخصي'], vi:['hồ sơ của tôi','hồ sơ'], zh:['我的资料','个人资料'], ja:['プロフィール','マイページ'], ko:['내 프로필','프로필'], hi:['मेरी प्रोफ़ाइल','प्रोफ़ाइल'] },
      делать: function () { вОкно('profile'); return 'Открываю профиль'; } },
    { к: 'favorites', раздел: 'Окна', имя: 'Избранное',
      слова: { ru:['избранн','заметки'], en:['saved messages','favourites','favorites'], uk:['обран','збережен'], de:['favoriten','gespeichert'], fr:['favoris','enregistré'], es:['favoritos','guardado'], it:['preferiti','salvati'], pt:['favoritos','salvos'], pl:['ulubion','zapisan'], tr:['favoriler','kaydedilen'], ar:['المفضلة','المحفوظات'], vi:['yêu thích','đã lưu'], zh:['收藏','已保存'], ja:['お気に入り','保存済み'], ko:['즐겨찾기','저장됨'], hi:['पसंदीदा','सहेजे'] },
      делать: function () { вОкно('favorites'); return 'Открываю избранное'; } },
    { к: 'notifs', раздел: 'Окна', имя: 'Уведомления',
      слова: { ru:['уведомлен','оповещен','колокольчик'], en:['notification','bell'], uk:['сповіщен','дзвіночок'], de:['benachrichtigung','glocke'], fr:['notification','cloche'], es:['notificación','campana'], it:['notifica','campanella'], pt:['notificação','sino'], pl:['powiadomien','dzwonek'], tr:['bildirim','zil'], ar:['إشعارات','الجرس'], vi:['thông báo','chuông'], zh:['通知','铃铛'], ja:['通知','ベル'], ko:['알림','종'], hi:['सूचना','घंटी'] },
      делать: function () { вОкно('notifications'); return 'Открываю уведомления'; } },
    { к: 'search', раздел: 'Окна', имя: 'Поиск',
      слова: { ru:['поиск','найди','искать'], en:['search','find'], uk:['пошук','знайди','шукат'], de:['suche','finde','suchen'], fr:['recherche','cherche','trouve'], es:['buscar','búsqueda','encuentra'], it:['cerca','ricerca','trova'], pt:['buscar','pesquisa','encontre'], pl:['szukaj','wyszukiwan','znajdź'], tr:['ara','arama','bul'], ar:['بحث','ابحث'], vi:['tìm kiếm','tìm'], zh:['搜索','查找'], ja:['検索','探して'], ko:['검색','찾아'], hi:['खोज','ढूंढो'] },
      делать: function () { вОкно('search'); return 'Открываю поиск'; } },
    { к: 'look', раздел: 'Окна', имя: 'Оформление',
      слова: { ru:['оформлен','внешний вид','вид приложен'], en:['appearance','look'], uk:['оформлен','зовнішній вигляд'], de:['aussehen','darstellung','design'], fr:['apparence','affichage'], es:['apariencia','aspecto'], it:['aspetto','tema'], pt:['aparência','tema'], pl:['wygląd','motyw'], tr:['görünüm','tema'], ar:['المظهر','السمة'], vi:['giao diện','chủ đề'], zh:['外观','主题'], ja:['外観','テーマ'], ko:['모양','테마'], hi:['रूप','थीम'] },
      делать: function () { вОкно('theme'); return 'Открываю оформление'; } },
    { к: 'universe', раздел: 'Окна', имя: 'Мой Юниверс',
      слова: { ru:['вселенн','мои кубы','все кубы','карта кубов'], en:['universe','my cubes','all cubes'], uk:['всесвіт','мої куби','карта куб'], de:['universum','meine würfel','alle würfel'], fr:['univers','mes cubes','tous les cubes'], es:['universo','mis cubos','todos los cubos'], it:['universo','i miei cubi','tutti i cubi'], pt:['universo','meus cubos','todos os cubos'], pl:['wszechświat','moje kostki','wszystkie kostki'], tr:['evren','küplerim','tüm küpler'], ar:['الكون','مكعباتي','كل المكعبات'], vi:['vũ trụ','khối của tôi','tất cả khối'], zh:['宇宙','我的方块','所有方块'], ja:['ユニバース','私のキューブ','すべてのキューブ'], ko:['유니버스','내 큐브','모든 큐브'], hi:['ब्रह्मांड','मेरे क्यूब','सभी क्यूब'] },
      делать: function () { CW.открыть('universe'); return 'Открываю Юниверс'; } },
    { к: 'games', раздел: 'Окна', имя: 'Игры',
      слова: { ru:['игр'], en:['game'], uk:['гра','ігр'], de:['spiel'], fr:['jeu','jeux'], es:['juego'], it:['gioco','giochi'], pt:['jogo','jogos'], pl:['gra','gry'], tr:['oyun'], ar:['لعبة','ألعاب'], vi:['trò chơi','game'], zh:['游戏'], ja:['ゲーム'], ko:['게임'], hi:['खेल','गेम'] },
      делать: function () { CW.открыть('games'); return 'Открываю игры'; } },
    { к: 'keyshop', раздел: 'Окна', имя: 'Ключи',
      слова: { ru:['магазин ключ','апгрейд ключ','купить ключ','улучшить ключ','ключи'], en:['key shop','upgrade key','buy key','keys'], uk:['магазин ключ','купити ключ','ключі'], de:['schlüssel kaufen','schlüsselshop','schlüssel'], fr:['acheter une clé','boutique de clés','clés'], es:['comprar llave','tienda de llaves','llaves'], it:['comprare chiave','negozio chiavi','chiavi'], pt:['comprar chave','loja de chaves','chaves'], pl:['kup klucz','sklep z kluczami','klucze'], tr:['anahtar al','anahtar mağaza','anahtarlar'], ar:['شراء مفتاح','متجر المفاتيح','مفاتيح'], vi:['mua chìa khóa','cửa hàng chìa khóa','chìa khóa'], zh:['买钥匙','钥匙商店','钥匙'], ja:['キーを買う','キーショップ','キー'], ko:['키 구매','키 상점','키'], hi:['चाबी खरीदो','चाबी की दुकान','चाबियाँ'] },
      делать: function () { CW.открыть('keys'); return 'Открываю ключи'; } },
    { к: 'premium', раздел: 'Окна', имя: 'Премиум',
      слова: { ru:['премиум'], en:['premium'], uk:['преміум'], de:['premium'], fr:['premium'], es:['premium'], it:['premium'], pt:['premium'], pl:['premium'], tr:['premium'], ar:['بريميوم','المميز'], vi:['premium'], zh:['高级会员'], ja:['プレミアム'], ko:['프리미엄'], hi:['प्रीमियम'] },
      делать: function () { CW.открыть('premium'); return 'Открываю премиум'; } },
    { к: 'help', раздел: 'Окна', имя: 'Список голосовых команд',
      слова: { ru:['что ты умеешь','список команд','помощь','команды','помоги'], en:['what can you do','commands','help'], uk:['що ти вмієш','команди','допомог'], de:['was kannst du','befehle','hilfe'], fr:['que sais-tu faire','commandes','aide'], es:['qué sabes hacer','comandos','ayuda'], it:['cosa sai fare','comandi','aiuto'], pt:['o que você sabe','comandos','ajuda'], pl:['co potrafisz','komendy','pomoc'], tr:['neler yapabilirsin','komutlar','yardım'], ar:['ماذا تستطيع','الأوامر','مساعدة'], vi:['bạn làm được gì','lệnh','trợ giúp'], zh:['你会什么','命令','帮助'], ja:['何ができる','コマンド','ヘルプ'], ko:['뭘 할 수 있어','명령어','도움말'], hi:['तुम क्या कर सकते हो','कमांड','मदद'] },
      делать: function () { вОкно('voice'); return 'Вот что я понимаю'; } },
    { к: 'createCube', раздел: 'Создать', имя: 'Создать куб',
      слова: { ru:['создать куб','новый куб','сделать куб'], en:['create cube','new cube'], uk:['створити куб','новий куб'], de:['würfel erstellen','neuer würfel'], fr:['créer un cube','nouveau cube'], es:['crear cubo','nuevo cubo'], it:['crea cubo','nuovo cubo'], pt:['criar cubo','novo cubo'], pl:['stwórz kostk','nowa kostk'], tr:['küp oluştur','yeni küp'], ar:['أنشئ مكعب','مكعب جديد'], vi:['tạo khối','khối mới'], zh:['创建方块','新方块'], ja:['キューブを作成','新しいキューブ'], ko:['큐브 만들기','새 큐브'], hi:['क्यूब बनाओ','नया क्यूब'] },
      делать: function () { CW.открыть('create-cube'); return 'Создаём куб'; } },
    { к: 'createGroup', раздел: 'Создать', имя: 'Создать группу',
      слова: { ru:['создать групп','новая групп','сделать групп'], en:['create group','new group'], uk:['створити груп','нова груп'], de:['gruppe erstellen','neue gruppe'], fr:['créer un groupe','nouveau groupe'], es:['crear grupo','nuevo grupo'], it:['crea gruppo','nuovo gruppo'], pt:['criar grupo','novo grupo'], pl:['stwórz grup','nowa grup'], tr:['grup oluştur','yeni grup'], ar:['أنشئ مجموعة','مجموعة جديدة'], vi:['tạo nhóm','nhóm mới'], zh:['创建群组','新群组'], ja:['グループを作成','新しいグループ'], ko:['그룹 만들기','새 그룹'], hi:['समूह बनाओ','नया समूह'] },
      делать: function () { CW.открыть('create-group'); return 'Создаём группу'; } },
    { к: 'createPost', раздел: 'Создать', имя: 'Создать пост',
      слова: { ru:['создать пост','новый пост','добавить контент','опубликовать'], en:['create post','new post','add content','publish'], uk:['створити пост','новий пост','опублікувати'], de:['beitrag erstellen','neuer beitrag','veröffentlichen'], fr:['créer un post','nouvelle publication','publier'], es:['crear publicación','nueva publicación','publicar'], it:['crea post','nuovo post','pubblica'], pt:['criar post','nova publicação','publicar'], pl:['nowy post','opublikuj'], tr:['gönderi oluştur','yeni gönderi','yayınla'], ar:['منشور جديد','انشر'], vi:['tạo bài','bài mới','đăng bài'], zh:['发帖','新帖子','发布'], ja:['投稿を作成','新しい投稿','公開'], ko:['게시물 작성','새 게시물','게시'], hi:['पोस्ट बनाओ','नई पोस्ट','प्रकाशित'] },
      делать: function () { CW.открыть('create-post'); return 'Создаём пост'; } },
    { к: 'newChat', раздел: 'Создать', имя: 'Новый чат',
      слова: { ru:['новый чат','новая переписка','написать кому'], en:['new chat'], uk:['новий чат'], de:['neuer chat'], fr:['nouvelle discussion'], es:['nuevo chat'], it:['nuova chat'], pt:['nova conversa'], pl:['nowy czat'], tr:['yeni sohbet'], ar:['محادثة جديدة'], vi:['trò chuyện mới'], zh:['新聊天'], ja:['新しいチャット'], ko:['새 채팅'], hi:['नई चैट'] },
      делать: function () { идти('chats'); return 'Открываю чаты'; } },
    { к: 'newSignal', раздел: 'Создать', имя: 'Новый сигнал',
      слова: { ru:['новый сигнал','создать сигнал','выставить сигнал'], en:['new signal','create signal'], uk:['новий сигнал'], de:['neues signal'], fr:['nouveau signal'], es:['nueva señal'], it:['nuovo segnale'], pt:['novo sinal'], pl:['nowy sygnał'], tr:['yeni sinyal'], ar:['إشارة جديدة'], vi:['tín hiệu mới'], zh:['新信号'], ja:['新しいシグナル'], ko:['새 시그널'], hi:['नया सिग्नल'] },
      делать: function () { CW.открыть('create-signal', {куб: CW.какойКуб && CW.какойКуб()}); return 'Создаём сигнал'; } },
    { к: 'sell', раздел: 'Создать', имя: 'Выставить товар',
      слова: { ru:['продать','выставить товар','разместить товар'], en:['sell','list item'], uk:['продат','виставити товар'], de:['verkaufen','anbieten'], fr:['vendre'], es:['vender'], it:['vendere','vendi'], pt:['vender'], pl:['sprzedaj'], tr:['satışa koy','sat'], ar:['بيع','للبيع'], vi:['bán'], zh:['出售'], ja:['出品','売る'], ko:['판매','팔기'], hi:['बेचो','बिक्री'] },
      делать: function () { CW.открыть('create-product'); return 'Выставляем товар'; } },
    { к: 'stream', раздел: 'Создать', имя: 'Начать эфир',
      слова: { ru:['стрим','эфир','трансляц'], en:['stream','go live','broadcast'], uk:['стрім','ефір','трансляц'], de:['stream','live gehen','übertragung'], fr:['direct','stream','diffusion'], es:['directo','transmisión','stream'], it:['diretta','streaming','trasmissione'], pt:['ao vivo','transmissão','stream'], pl:['transmisj','na żywo','stream'], tr:['yayın','canlı'], ar:['بث','مباشر'], vi:['phát trực tiếp','livestream','stream'], zh:['直播','开播'], ja:['配信','ライブ'], ko:['방송','라이브','스트림'], hi:['लाइव','प्रसारण','स्ट्रीम'] },
      делать: function () { CW.открыть('create-live'); return 'Начинаем эфир'; } },
    { к: 'balance', раздел: 'Управление', имя: 'Сколько на счету',
      слова: { ru:['мой баланс','сколько у меня','сколько куб','баланс'], en:['my balance','how much do i have','balance'], uk:['баланс','скільки в мене'], de:['guthaben','kontostand'], fr:['solde','mon solde'], es:['saldo','mi saldo'], it:['saldo','il mio saldo'], pt:['saldo','meu saldo'], pl:['saldo','mój stan'], tr:['bakiye','bakiyem'], ar:['الرصيد','رصيدي'], vi:['số dư'], zh:['余额'], ja:['残高'], ko:['잔액'], hi:['बैलेंस'] },
      делать: function () { сказатьСчёт(); return ''; } },
    { к: 'themeDark', раздел: 'Управление', имя: 'Тёмная тема',
      слова: { ru:['тёмн','темн','чёрн','черн','ночн'], en:['dark'], uk:['темн','чорн','нічн'], de:['dunkel','schwarz','nacht'], fr:['sombre','noir','nuit'], es:['oscuro','negro','noche'], it:['scuro','nero','notte'], pt:['escuro','preto','noite'], pl:['ciemn','czarn','noc'], tr:['koyu','siyah','gece'], ar:['داكن','أسود','ليلي'], vi:['tối','đen','ban đêm'], zh:['深色','黑色','夜间'], ja:['ダーク','黒','夜'], ko:['다크','검정','야간'], hi:['डार्क','काला','रात'] },
      делать: function () { тема('тёмная'); return 'Тёмная тема'; } },
    { к: 'themeLight', раздел: 'Управление', имя: 'Светлая тема',
      слова: { ru:['светл','бел','дневн'], en:['light'], uk:['світл','біл','денн'], de:['hell','weiß','tag'], fr:['clair','blanc','jour'], es:['claro','blanco','día'], it:['chiaro','bianco','giorno'], pt:['claro','branco','dia'], pl:['jasn','biał','dzień'], tr:['açık','beyaz','gündüz'], ar:['فاتح','أبيض','نهاري'], vi:['sáng','trắng','ban ngày'], zh:['浅色','白色','日间'], ja:['ライト','白','昼'], ko:['라이트','흰색','주간'], hi:['लाइट','सफेद','दिन'] },
      делать: function () { тема('светлая'); return 'Светлая тема'; } },
    { к: 'close', раздел: 'Управление', имя: 'Закрыть окно',
      слова: { ru:['закрой','закрыть','отмена'], en:['close','dismiss'], uk:['закрий','закрит','скасуват'], de:['schließen','abbrechen'], fr:['fermer','annuler'], es:['cerrar','cancelar'], it:['chiudi','annulla'], pt:['fechar','cancelar'], pl:['zamknij','anuluj'], tr:['kapat','iptal'], ar:['إغلاق','أغلق','إلغاء'], vi:['đóng','hủy'], zh:['关闭','取消'], ja:['閉じる','キャンセル'], ko:['닫기','취소'], hi:['बंद','रद्द'] },
      делать: function () { закрытьВерхнее(); return 'Закрыла'; } },
    { к: 'back', раздел: 'Управление', имя: 'Назад',
      слова: { ru:['назад'], en:['back'], uk:['назад'], de:['zurück'], fr:['retour'], es:['atrás'], it:['indietro'], pt:['voltar'], pl:['wstecz','cofnij'], tr:['geri'], ar:['رجوع'], vi:['quay lại'], zh:['返回'], ja:['戻る'], ko:['뒤로'], hi:['वापस'] },
      делать: function () { окно.history.back(); return 'Иду назад'; } },
    { к: 'top', раздел: 'Управление', имя: 'Наверх',
      слова: { ru:['наверх','в начало','к началу'], en:['scroll to top','to the top'], uk:['вгору','на початок'], de:['nach oben','zum anfang'], fr:['en haut','au début'], es:['arriba','al principio'], it:['in alto','inizio'], pt:['para cima','ao início'], pl:['do góry','na początek'], tr:['yukarı','başa'], ar:['إلى الأعلى','للبداية'], vi:['lên đầu','về đầu'], zh:['回到顶部'], ja:['一番上','先頭へ'], ko:['맨 위로','처음으로'], hi:['ऊपर','शुरू में'] },
      делать: function () { наверх(); return 'Наверх'; } },
    { к: 'logout', раздел: 'Управление', имя: 'Выйти из аккаунта',
      слова: { ru:['выйти из аккаунта','сменить ключ','выйти совсем'], en:['log out','sign out','change key'], uk:['вийти з акаунт','змінити ключ'], de:['abmelden','ausloggen','schlüssel wechseln'], fr:['déconnexion','se déconnecter','changer de clé'], es:['cerrar sesión','cambiar llave'], it:['disconnetti','cambia chiave'], pt:['sair da conta','trocar chave'], pl:['wyloguj','zmień klucz'], tr:['çıkış yap','anahtarı değiştir'], ar:['تسجيل الخروج','تغيير المفتاح'], vi:['đăng xuất','đổi khóa'], zh:['退出登录','更换钥匙'], ja:['ログアウト','キーを変更'], ko:['로그아웃','키 변경'], hi:['लॉग आउट','चाबी बदलो'] },
      делать: function () { return 'Выход: только руками: я не стану выходить за тебя'; } },
    { к: 'stop', раздел: 'Управление', имя: 'Хватит слушать',
      слова: { ru:['стоп','хватит','выключись','замолчи','спасибо'], en:['stop','enough','turn off'], uk:['стоп','досить','замовкни'], de:['stopp','genug','sei still'], fr:['stop','arrête','tais-toi'], es:['para','basta','cállate'], it:['stop','basta','zitto'], pt:['pare','chega','cala'], pl:['stop','wystarczy','cisza'], tr:['dur','yeter','sus'], ar:['توقف','كفى','اصمت'], vi:['dừng','đủ rồi','im lặng'], zh:['停','够了','安静'], ja:['ストップ','やめて','静かに'], ko:['정지','그만','조용히'], hi:['रुको','बस','चुप'] },
      делать: function () { CW.голос.выключить(); return 'Выключаю микрофон'; } },

    /* ── ДОБАВЛЕНО СВЕРХ БОЕВОЙ ТАБЛИЦЫ ──
       Окна, которых в той таблице не было, а в программе они есть.
       Слова здесь русские и английские: переводить «подарить ключ» на
       шестнадцать языков, не зная их, нечестно — а оставить команду без
       слов значит оставить её без голоса. */
    { к: 'docs', раздел: 'Окна', имя: 'Документы площадки',
      слова: { ru: ['документ', 'правила', 'соглашение', 'политика конфиденциальн', 'оферт'],
               en: ['documents', 'terms', 'privacy'] },
      делать: function () { вОкно('docs'); return 'Открываю документы'; } },

    { к: 'map', раздел: 'Окна', имя: 'Живая карта',
      слова: { ru: ['живая карта', 'карта площадки', 'кто сейчас'],
               en: ['live map'] },
      делать: function () { вОкно('map'); return 'Открываю живую карту'; } },

    { к: 'tariff', раздел: 'Окна', имя: 'Тарифы',
      слова: { ru: ['тариф', 'планы', 'сколько стоит'], en: ['plans', 'pricing'] },
      делать: function () { CW.уйти(CW.корень + 'tariff.html'); return 'Открываю тарифы'; } },

    { к: 'invites', раздел: 'Окна', имя: 'Мои приглашения',
      слова: { ru: ['мои приглашения', 'мой код', 'пригласительн'],
               en: ['my invites', 'invite code'] },
      делать: function () { CW.открыть('invites'); return 'Открываю приглашения'; } },

    { к: 'addAccount', раздел: 'Окна', имя: 'Добавить аккаунт',
      слова: { ru: ['добавить аккаунт', 'другой аккаунт', 'сменить аккаунт'],
               en: ['add account', 'switch account'] },
      делать: function () { CW.открыть('add-account'); return 'Открываю'; } },

    { к: 'download', раздел: 'Окна', имя: 'Скачать Cube',
      слова: { ru: ['скачать', 'установить приложение', 'на телефон'],
               en: ['download app', 'install'] },
      делать: function () { CW.открыть('download'); return 'Открываю'; } },

    { к: 'story', раздел: 'Создать', имя: 'Добавить историю',
      слова: { ru: ['истори', 'сторис'], en: ['story', 'stories'] },
      делать: function () { CW.открыть('create-story'); return 'Добавляем историю'; } },

    { к: 'sellItem', раздел: 'Создать', имя: 'Выставить вещь',
      слова: { ru: ['выставить вещь', 'продать вещь', 'новая вещь'],
               en: ['sell item', 'new item'] },
      делать: function () { CW.открыть('create-item'); return 'Выставляем вещь'; } },

    { к: 'joinKey', раздел: 'Ключи и деньги', имя: 'Войти по ключу',
      слова: { ru: ['войти по ключ', 'ввести ключ', 'у меня ключ'],
               en: ['enter key', 'join by key'] },
      делать: function () { CW.открыть('join-by-key'); return 'Открываю вход по ключу'; } },

    { к: 'giftKey', раздел: 'Ключи и деньги', имя: 'Подарить ключ',
      слова: { ru: ['подарить ключ', 'дать ключ'], en: ['gift key'] },
      делать: function () { CW.открыть('gift-key'); return 'Открываю'; } },

    { к: 'transfer', раздел: 'Ключи и деньги', имя: 'Перевести CUBE',
      слова: { ru: ['перевест', 'отправить куб', 'перевод'],
               en: ['transfer', 'send cube'] },
      делать: function () { CW.открыть('transfer'); return 'Открываю перевод'; } },

    { к: 'withdraw', раздел: 'Ключи и деньги', имя: 'Вывести',
      слова: { ru: ['вывест', 'вывод денег', 'на кошелёк'],
               en: ['withdraw', 'cash out'] },
      делать: function () { CW.открыть('withdraw'); return 'Открываю вывод'; } },

    { к: 'swap', раздел: 'Ключи и деньги', имя: 'Свайп: обмен',
      слова: { ru: ['свайп', 'обмен', 'поменять монет'],
               en: ['swap', 'exchange'] },
      делать: function () { CW.открыть('swap'); return 'Открываю обмен'; } },

    /* ── ЛЕНТА ──
       Эти команды делают то же, что палец на самой ленте. Лента отдаёт
       наружу ровно семь действий (CW.лента); на других страницах её
       нет, и команда честно говорит, что она для ленты. */
    { к: 'tabShorts', раздел: 'Лента', имя: 'Вкладка «Шортс»',
      слова: { ru: ['шортс', 'коротк', 'ролики'], en: ['shorts'] },
      делать: function () { return вЛенте('вкладка', 'shorts', 'Шортс'); } },

    { к: 'tabPosts', раздел: 'Лента', имя: 'Вкладка «Посты»',
      слова: { ru: ['посты', 'публикац'], en: ['posts'] },
      делать: function () { return вЛенте('вкладка', 'post', 'Посты'); } },

    { к: 'tabRec', раздел: 'Лента', имя: 'Вкладка «Для тебя»',
      слова: { ru: ['для тебя', 'рекомендац'], en: ['for you'] },
      делать: function () { return вЛенте('вкладка', 'rec', 'Для тебя'); } },

    { к: 'tabTop', раздел: 'Лента', имя: 'Вкладка «Топ»',
      слова: { ru: ['топ', 'лучшее'], en: ['top', 'best'] },
      делать: function () { return вЛенте('вкладка', 'top', 'Топ'); } },

    { к: 'next', раздел: 'Лента', имя: 'Следующая запись',
      слова: { ru: ['дальше', 'следующ', 'листай'], en: ['next'] },
      делать: function () { return вЛенте('дальше', null, 'Листаю'); } },

    { к: 'prev', раздел: 'Лента', имя: 'Предыдущая запись',
      слова: { ru: ['предыдущ', 'верни запись', 'назад запись'], en: ['previous'] },
      делать: function () { return вЛенте('назад', null, 'Назад'); } },

    { к: 'like', раздел: 'Лента', имя: 'Лайк',
      слова: { ru: ['лайк', 'нравится', 'сердечк'], en: ['like'] },
      делать: function () { return вЛенте('лайк', null, 'Поставила лайк'); } },

    { к: 'comments', раздел: 'Лента', имя: 'Комментарии',
      слова: { ru: ['комментар', 'обсужден'], en: ['comments'] },
      делать: function () { return вЛенте('коммент', null, 'Открываю комментарии'); } },

    { к: 'share', раздел: 'Лента', имя: 'Поделиться записью',
      слова: { ru: ['поделит', 'отправить запись'], en: ['share'] },
      делать: function () { return вЛенте('делись', null, 'Открываю «Поделиться»'); } },

    { к: 'sound', раздел: 'Лента', имя: 'Звук в ленте',
      слова: { ru: ['звук', 'громкост', 'включи звук', 'выключи звук'],
               en: ['sound', 'mute', 'unmute'] },
      делать: function () {
        if (!CW.лента) return 'Звук переключается в ленте: открываю её';
        CW.лента.звук();
        return CW.лента.тихоЛи() ? 'Звук выключен' : 'Звук включён';
      } },

    /* ── МАРКЕТПЛЕЙС: два раздела ── */
    { к: 'shopOpen', раздел: 'Разделы', имя: 'Шопинг: вещи',
      слова: { ru: ['шопинг', 'магазин вещей', 'купить вещь'], en: ['shopping'] },
      делать: function () { вРынок('shop'); return 'Открываю шопинг'; } },

    { к: 'shopDigi', раздел: 'Разделы', имя: 'Цифровой маркетплейс',
      слова: { ru: ['цифровой маркет', 'цифровые товар'], en: ['digital market'] },
      делать: function () { вРынок('digital'); return 'Открываю цифровой раздел'; } },

    { к: 'themeAuto', раздел: 'Управление', имя: 'Тема как в системе',
      слова: { ru: ['как в системе', 'системная тема', 'авто тема'],
               en: ['system theme'] },
      делать: function () { тема('система'); return 'Тема как в системе'; } },

    { к: 'walletLink', раздел: 'Ключи и деньги', имя: 'Кошельки для выплат',
      слова: { ru: ['привязать кошел', 'адрес кошельк', 'мои кошельки'],
               en: ['link wallet'] },
      делать: function () { CW.открыть('wallet-link'); return 'Открываю кошельки'; } }
  ];

  /* Другие куски добавляют свои команды сюда: игра, формы, персонаж.
     Слова у них русские и английские — остальным языкам слова для
     «вихрь» и «шестерёнка» никто пока не написал, и выдумывать их я не
     стану. */
  CW.голос.добавить = function (к) {
    if (!к || !к.к || typeof к.делать !== 'function') return false;
    for (var i = 0; i < КОМАНДЫ.length; i++) {
      if (КОМАНДЫ[i].к === к.к) { КОМАНДЫ[i] = к; сказатьВсем(); return true; }
    }
    КОМАНДЫ.push(к);
    сказатьВсем();
    return true;
  };

  CW.голос.команды = function () {
    var я = короткий(CW.голос.язык());
    return КОМАНДЫ.map(function (к) {
      return { к: к.к, раздел: к.раздел, имя: к.имя,
               слова: (к.слова && (к.слова[я] || к.слова.ru)) || [] };
    });
  };

  /* ═════════════════════════════════════════════════════════════════════
     РАЗБОР

     Ищем самое длинное совпадение: «новый куб» должен победить «куб».
     Слова храним огрызками («лент», «кошел») — так ловятся и «ленту», и
     «ленте», и «кошелёк».
     ═════════════════════════════════════════════════════════════════════ */
  function ровно(т) {
    return String(т || '').toLowerCase().replace(/ё/g, 'е').replace(/[. !?;:]/g, ' ').trim();
  }

  CW.голос.разобрать = function (текст) {
    var т = ровно(текст);
    if (!т) return null;
    var я = короткий(CW.голос.язык());
    var лучший = null, длина = 0;

    /* Сперва в выбранном языке, потом — в русском и английском: человек
       мог сказать «stop» при русском распознавании, и это понятно. */
    [я, 'ru', 'en'].forEach(function (яз, шаг) {
      if (лучший && шаг) return;
      КОМАНДЫ.forEach(function (к) {
        var слова = (к.слова && к.слова[яз]) || [];
        слова.forEach(function (с) {
          var ф = ровно(с);
          if (ф.length > длина && т.indexOf(ф) >= 0) { длина = ф.length; лучший = к; }
        });
      });
    });
    return лучший;
  };

  CW.голос.выполнить = function (текст) {
    var к = CW.голос.разобрать(текст);
    if (!к) return false;
    var ответ = к.делать();
    if (ответ) говорить(ответ);
    return true;
  };

  /* ═════════════════════════════════════════════════════════════════════
     ОТВЕТ: ВСЛУХ И СТРОКОЙ

     Строка нужна даже при включённом голосе: в тихом месте звук выключен,
     а понять, что именно услышано, всё равно надо. Больше того — строка
     показывает НЕУЗНАННОЕ: без неё «он меня не понимает» не отличить от
     «он слушает не тот язык», а это разные беды.
     ═════════════════════════════════════════════════════════════════════ */
  function говорить(текст) {
    if (CW.голос.вслух()) {
      try {
        if (окно.speechSynthesis) {
          var у = new окно.SpeechSynthesisUtterance(текст);
          у.lang = CW.голос.язык(); у.rate = 1.04;
          окно.speechSynthesis.cancel();
          окно.speechSynthesis.speak(у);
        }
      } catch (е) {}
    }
    показать(текст, true);
  }
  CW.голос.говорить = говорить;

  var часыСтроки = null;
  function показать(текст, ответ) {
    var э = документ.getElementById('гл-слышу');
    if (!э) {
      э = документ.createElement('div');
      э.id = 'гл-слышу';
      э.className = 'гл-слышу';
      документ.body.appendChild(э);
    }
    э.innerHTML = (ответ ? '' : '<b>слышу:</b> ') + CW.безопасно(текст);
    э.classList.add('видно');
    clearTimeout(часыСтроки);
    часыСтроки = setTimeout(function () { э.classList.remove('видно'); },
                            ответ ? 4200 : 2400);
  }

  /* ═════════════════════════════════════════════════════════════════════
     НЕПРЕРЫВНОЕ СЛУШАНИЕ

     Включил — и говоришь командами подряд. Браузер сам обрывает поток
     после паузы, поэтому поднимаем его обратно, пока человек не выключил
     микрофон сам.
     ═════════════════════════════════════════════════════════════════════ */
  var рек = null, слушает = false, хотим = false, поднимаем = false;
  var сделано = {};

  CW.голос.идёт = function () { return хотим; };
  CW.голос.слышит = function () { return слушает; };

  CW.голос.включить = function () {
    var беда = CW.голос.беда();
    if (беда) { говорить(беда); return false; }
    if (хотим) return true;
    хотим = true;
    пометить(true);
    сделано = {};
    запустить();
    показать('Слушаю. Скажи команду из списка', true);
    сказатьВсем();
    return true;
  };

  CW.голос.выключить = function (молча, напереход) {
    хотим = false; поднимаем = false;
    /* Уход со страницы — не «выключил»: на новой странице микрофон
       должен подняться сам. Флаг снимаем только когда выключили сами. */
    if (!напереход) пометить(false);
    try { if (рек) рек.stop(); } catch (е) {}
    рек = null; слушает = false;
    if (!молча) показать('Микрофон выключен', true);
    сказатьВсем();
  };

  CW.голос.переключить = function () {
    if (хотим) CW.голос.выключить(); else CW.голос.включить();
  };

  /* Разбираем не один вариант, а все, что предложил браузер: короткое
     слово вроде «чат» он часто ставит первым как «чад» или «Чад», а
     нужное лежит вторым. Проверить пять строк стоит ничего. */
  function изВариантов(рез) {
    var сколько = Math.min(рез.length || 1, 5);
    var первый = '';
    for (var i = 0; i < сколько; i++) {
      var т = '';
      try { т = (рез[i] && рез[i].transcript) || ''; } catch (е) {}
      т = т.trim();
      if (!т) continue;
      if (!первый) первый = т;
      if (CW.голос.разобрать(т)) return { текст: т, узнали: true };
    }
    return { текст: первый, узнали: false };
  }

  function запустить() {
    var Р = Распознавание();
    if (!Р || !хотим || слушает || поднимаем) return;
    поднимаем = true;
    try { рек = new Р(); } catch (е) { хотим = false; поднимаем = false; return; }

    рек.lang = CW.голос.язык();
    рек.continuous = true;          /* не по одной фразе, а подряд */
    /* Догадки на лету нужны не для красоты: короткое слово браузер
       иногда так и не объявляет окончательным, пока не услышит
       следующую фразу, и человек в это время молча ждёт. */
    рек.interimResults = true;
    рек.maxAlternatives = 5;

    рек.onstart = function () {
      слушает = true; поднимаем = false; сказатьВсем();
    };

    рек.onresult = function (е) {
      for (var i = е.resultIndex; i < е.results.length; i++) {
        var рез = е.results[i];
        var в = изВариантов(рез);
        if (!в.текст) continue;
        if (рез.isFinal) выполнить(в.текст, i);
        else if (в.узнали) выполнить(в.текст, i);
        else показать(в.текст, false);   /* видно, что микрофон слышит */
      }
    };

    рек.onerror = function (е) {
      var код = (е && е.error) || '';
      if (код === 'not-allowed' || код === 'service-not-allowed') {
        хотим = false;
        говорить('Браузер не дал микрофон. Разреши его в настройках сайта');
      } else if (код === 'network') {
        показать('Сеть не отвечает: распознавание идёт через неё', true);
      }
      /* Молчание и обрыв — не беда: поток поднимется ниже. */
      сказатьВсем();
    };

    рек.onend = function () {
      слушает = false; поднимаем = false; сказатьВсем();
      /* Поднимаем почти сразу: за те доли секунды, что раньше выжидались,
         человек успевал начать говорить — и начало фразы пропадало. */
      if (хотим) setTimeout(function () { if (хотим) запустить(); }, 60);
    };

    try { рек.start(); } catch (е) { поднимаем = false; }
  }

  /* Одна и та же фраза прилетает дважды: сперва догадкой, потом
     окончательным разбором. Делать её два раза нельзя — «закрой» закроет
     два окна. Браузер нумерует фразы, по номеру и считаем. */
  function выполнить(текст, номер) {
    var к = CW.голос.разобрать(текст);
    if (!к) { показать(текст, false); return; }
    var было = сделано[номер];
    if (было && было.к === к.к && Date.now() - было.когда < 8000) return;
    сделано[номер] = { к: к.к, когда: Date.now() };
    показать(текст, false);
    var ответ = к.делать();
    if (ответ) говорить(ответ);
  }

  /* Сторож: бывает, что поток умер, а onend не пришёл — тогда микрофон
     горит, а не слышит ничего. */
  setInterval(function () {
    if (хотим && !слушает && !поднимаем) запустить();
  }, 3000);

  документ.addEventListener('visibilitychange', function () {
    if (документ.hidden && хотим) CW.голос.выключить(true, true);
  });
  окно.addEventListener('pagehide', function () {
    if (хотим) CW.голос.выключить(true, true);
  });

  /* Вернулись во вкладку, а микрофон был включён — поднимаем. */
  документ.addEventListener('visibilitychange', function () {
    if (!документ.hidden && !хотим && CW.голос.слушалРаньше() && !CW.голос.беда()) {
      CW.голос.включить();
    }
  });

  /* ── САМ ПОДНИМАЕТСЯ ПОСЛЕ ПЕРЕХОДА ──
     Файл приехал, а микрофон был включён до перехода — значит человек
     его не выключал, и ждать от него второго нажатия неправильно. */
  if (CW.голос.слушалРаньше() && !CW.голос.беда()) {
    setTimeout(function () {
      if (!хотим) { хотим = true; сделано = {}; запустить(); сказатьВсем(); }
    }, 300);
  }

  /* ═════════════════════════════════════════════════════════════════════
     КТО СЛЕДИТ
     ═════════════════════════════════════════════════════════════════════ */
  var слушатели = [];
  CW.голос.следить = function (fn) {
    if (typeof fn !== 'function') return function () {};
    слушатели.push(fn);
    return function () {
      var и = слушатели.indexOf(fn);
      if (и >= 0) слушатели.splice(и, 1);
    };
  };
  function сказатьВсем() {
    слушатели.forEach(function (fn) { try { fn(); } catch (е) {} });
  }

  /* ═════════════════════════════════════════════════════════════════════
     КОМАНДЫ ИГРЫ, ФОРМ И ПЕРСОНАЖА

     Их добавляем, только если эти куски есть на странице: игра живёт в
     мире, и на ленте команда «взрыв» означала бы кнопку в пустоту.

     Слова здесь русские и английские. Писать «шестерёнку» на корейском,
     не зная корейского, я не стану: лучше честные два языка, чем
     двадцать, из которых восемнадцать наугад.
     ═════════════════════════════════════════════════════════════════════ */
  (function приделать() {

    /* ── ИГРА ЖИВЁТ В МИРЕ ──
       Список команд человек читает и в окне голоса, и на ленте — там
       кубов нет, двигать нечего. Молчать в ответ нельзя: команда есть в
       списке, значит она должна что-то сделать. Поэтому уводим в мир,
       где она и работает, и говорим об этом вслух. */
    function вМире(делать) {
      return function () {
        if (!CW.игра.естьМир()) {
          CW.уйти(CW.раздел('world'));
          return 'Это делается в мире: открываю мир';
        }
        return делать();
      };
    }

    if (CW.игра) {
      CW.голос.добавить({ к: 'playOn', раздел: 'Игра с кубами', имя: 'Включить игру',
        слова: { ru: ['включи игру', 'игра с куб', 'поиграем'], en: ['start game', 'play cubes'] },
        делать: вМире(function () { CW.игра.включить(); return 'Игра включена'; }) });

      CW.голос.добавить({ к: 'playOff', раздел: 'Игра с кубами', имя: 'Выключить игру',
        слова: { ru: ['выключи игру', 'хватит играть', 'останови кубы'], en: ['stop game'] },
        делать: вМире(function () { CW.игра.выключить(); return 'Игра выключена'; }) });

      CW.голос.добавить({ к: 'playGest', раздел: 'Игра с кубами', имя: 'Жесты рукой',
        слова: { ru: ['жесты', 'управление рукой', 'включи жесты'], en: ['gestures', 'hand control'] },
        делать: вМире(function () {
          CW.нужен('shared/жесты.js').then(function () {
            return CW.жесты(!CW.жестыИдут && CW.жестыИдут() ? false : true);
          });
          return 'Переключаю жесты';
        }) });

      var СЛОВА_ИГРЫ = {
        'бросок_влево':  { ru: ['брось влево', 'кинь влево', 'бросок влево'], en: ['throw left'] },
        'бросок_вправо': { ru: ['брось вправо', 'кинь вправо', 'бросок вправо'], en: ['throw right'] },
        'подбросить':    { ru: ['подбрось', 'подкинь', 'вверх кубы'], en: ['toss up'] },
        'уронить':       { ru: ['урони', 'сбрось', 'вниз кубы'], en: ['drop'] },
        'взрыв':         { ru: ['взорви', 'взрыв', 'бум'], en: ['explode', 'boom'] },
        'вихрь':         { ru: ['закрути', 'вихрь', 'воронк'], en: ['vortex', 'swirl'] },
        'хаос':          { ru: ['хаос', 'вразнос', 'перемешай'], en: ['chaos'] },
        'магнит':        { ru: ['магнит', 'собери кубы', 'к центру'], en: ['magnet'] },
        'невесомость':   { ru: ['невесомост', 'парите', 'плавайте'], en: ['zero gravity', 'float'] },
        'фейерверк':     { ru: ['фейерверк', 'салют'], en: ['fireworks'] },
        'заморозка':     { ru: ['заморозь', 'замри', 'стоп кубы'], en: ['freeze'] },
        'карусель':      { ru: ['карусель', 'по кругу'], en: ['carousel'] },
        'волна':         { ru: ['волна', 'волной'], en: ['wave'] },
        'хоровод':       { ru: ['хоровод', 'встаньте в круг'], en: ['round dance'] },
        'сальто':        { ru: ['сальто', 'кувырок'], en: ['flip'] },
        'прыжки':        { ru: ['прыжки', 'прыгайте', 'прыгай'], en: ['jump'] },
        'бумеранг':      { ru: ['бумеранг', 'туда обратно'], en: ['boomerang'] },
        'пузыри':        { ru: ['пузыри', 'всплывайте'], en: ['bubbles'] },
        'прилёт':        { ru: ['прилёт', 'прилет', 'издалека', 'налетай'], en: ['fly in'] },
        'домой':         { ru: ['по местам', 'верни кубы', 'на место'], en: ['go home', 'reset cubes'] }
      };
      CW.игра.ДЕЙСТВИЯ.forEach(function (д) {
        var с = СЛОВА_ИГРЫ[д.к];
        if (!с) return;
        CW.голос.добавить({ к: 'pl_' + д.к, раздел: 'Действия с кубами', имя: д.имя,
          слова: с,
          делать: вМире(function () { CW.игра.сделать(д.к); return д.имя; }) });
      });
    }

    if (CW.формы) {
      var СЛОВА_ФОРМ = {
        'куб':      { ru: ['форма куб', 'сделай куб', 'кубы'], en: ['cube shape'] },
        'кристалл': { ru: ['кристал'], en: ['crystal'] },
        'треуг':    { ru: ['треугольник', 'тетраэдр'], en: ['triangle', 'tetrahedron'] },
        'октаэдр':  { ru: ['октаэдр'], en: ['octahedron'] },
        'шар':      { ru: ['шар', 'круглые', 'сферы'], en: ['ball', 'sphere'] },
        'пирамида': { ru: ['пирамид'], en: ['pyramid'] },
        'призма':   { ru: ['призм'], en: ['prism'] },
        'цилиндр':  { ru: ['цилиндр'], en: ['cylinder'] },
        'конус':    { ru: ['конус'], en: ['cone'] },
        'звезда':   { ru: ['звезд', 'звёзд'], en: ['star'] },
        'икоса':    { ru: ['икосаэдр'], en: ['icosahedron'] },
        'алмаз':    { ru: ['алмаз', 'бриллиант'], en: ['diamond'] },
        'кольцо':   { ru: ['кольц', 'бублик'], en: ['ring', 'donut'] },
        'сердце':   { ru: ['сердц'], en: ['heart'] },
        'крест':    { ru: ['крест'], en: ['cross'] },
        'шестерня': { ru: ['шестерён', 'шестерен'], en: ['gear'] },
        'доллар':   { ru: ['доллар', 'монет'], en: ['dollar', 'coin'] },
        'евро':     { ru: ['евро'], en: ['euro'] },
        'юань':     { ru: ['юань', 'юани', 'китайск'], en: ['yuan'] },
        'биткоин':  { ru: ['биткоин', 'биткойн'], en: ['bitcoin', 'btc'] }
      };
      CW.формы.СПИСОК.forEach(function (ф) {
        var с = СЛОВА_ФОРМ[ф.к];
        if (!с) return;
        /* «Форма: куб», но «Форма: BTC» — имя из одних прописных не
           трогаем: это не слово, а обозначение. */
        var имя = (ф.имя === ф.имя.toUpperCase()) ? ф.имя : ф.имя.toLowerCase();
        CW.голос.добавить({ к: 'sh_' + ф.к, раздел: 'Формы', имя: 'Форма: ' + имя,
          слова: с,
          делать: вМире(function () { CW.формы.поставить(ф.к); return ф.имя; }) });
      });
      CW.голос.добавить({ к: 'sh_mix', раздел: 'Формы', имя: 'Формы вразнобой',
        слова: { ru: ['вразнобой', 'разные формы', 'перемешай формы'], en: ['mixed shapes'] },
        делать: вМире(function () {
          var ид = ((CW.игра && CW.игра.тела()) || []).map(function (т) { return т.куб.id; });
          CW.формы.вразнобой(ид);
          return 'Вразнобой';
        }) });
    }

    if (CW.персонаж) {
      var СЛОВА_ГЕРОЕВ = {
        'кот':      { ru: ['кот', 'кошк', 'котик'], en: ['cat'] },
        'сосед':    { ru: ['сосед'], en: ['neighbour', 'neighbor'] },
        'пёс':      { ru: ['пёс', 'пес', 'собак'], en: ['dog'] },
        'робот':    { ru: ['робот'], en: ['robot'] },
        'призрак':  { ru: ['призрак', 'привидение'], en: ['ghost'] },
        'панда':    { ru: ['панда'], en: ['panda'] },
        'лягушка':  { ru: ['лягушк', 'жаб'], en: ['frog'] },
        'пришелец': { ru: ['пришелец', 'инопланетян'], en: ['alien'] }
      };
      CW.персонаж.СПИСОК.forEach(function (п) {
        var с = СЛОВА_ГЕРОЕВ[п.к];
        if (!с) return;
        CW.голос.добавить({ к: 'ch_' + п.к, раздел: 'Персонажи', имя: п.имя,
          слова: с,
          делать: вМире(function () { CW.персонаж.включить(п.к); return п.имя + ' тут'; }) });
      });
      CW.голос.добавить({ к: 'ch_off', раздел: 'Персонажи', имя: 'Убрать персонажа',
        слова: { ru: ['убери персонаж', 'выключи персонаж'], en: ['remove character'] },
        делать: вМире(function () { CW.персонаж.включить(null); return 'Персонаж убран'; }) });

      [['гладить', 'Погладить', { ru: ['погладь', 'погладить'], en: ['pet'] }],
       ['бить',    'Побить',    { ru: ['побей', 'ударь', 'стукни'], en: ['hit'] }],
       ['щекот',   'Пощекотать',{ ru: ['пощекоч', 'щекот'], en: ['tickle'] }]
      ].forEach(function (д) {
        CW.голос.добавить({ к: 'ch_' + д[0], раздел: 'Персонажи', имя: д[1],
          слова: д[2],
          делать: вМире(function () {
            if (!CW.персонаж.кто()) return 'Сначала включи персонажа';
            CW.персонаж.реакция(д[0]);
            return '';
          }) });
      });

      /* Свои действия человека — наравне с нашими: он сам написал, какой
         фразой их звать. */
      CW.персонаж.мои().forEach(function (д, и) {
        var фраза = String(д.команда || д.имя || '').trim();
        if (!фраза) return;
        CW.голос.добавить({ к: 'my_' + и, раздел: 'Свои действия', имя: д.имя,
          слова: { ru: [фраза], en: [фраза] },
          делать: вМире(function () { CW.персонаж.сделать(д.что); return д.имя; }) });
      });
    }
  })();

})(window, document);
