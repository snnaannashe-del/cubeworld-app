/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-hu.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('hu', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Bejegyzések, videók és kerek klipek. Innen nyílnak a hozzászólások és a reakciók is.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Személyes üzenetek, hangüzenetek és kerek videók, a mentettek.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Nyilvános közösségek: közös csevegés, eseményfolyam, tagok.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Kereskedési jelzések: irány, belépő, cél és stop. Az árat a kiszolgáló maga figyeli.',
  'Объявления и обмен между людьми.':
    'Hirdetések és csere emberek között.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'A jutalmak mértéke, a swap és minden, amiért CUBE jár.',
  'Баланс CUBE, пополнение, вывод и история.':
    'A CUBE-egyenleged, feltöltések, kifizetések és előzmények.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Mi történik a kockáiddal és a bejegyzéseiddel, számokban.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'A CUBE a platform belső pénze. A kiszolgáló naponta egyszer írja jóvá a tevékenységért: aktív nap, saját bejegyzések és hozzászólások, meghívott emberek. A swapon belül a CUBE ára rögzített: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'A kiszolgáló naponta egyszer zárja a jutalmakat. Számít: egy aktív nap online, saját bejegyzések és hozzászólások 10 ezer megtekintéstől, a meghívottak, akik előfizettek, és a ráadás egy hétért, egy hónapért és egy évért egyhuzamban. A pontos mértékek mindig frissen a Keresés részben.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Hogy semmit ne lehessen csalással felfújni, a kiszolgáló napi korlátokat tart: 20 új csevegés, 500 kedvelés, 50 hozzászólás, 500 követés. A megtekintéseket egyáltalán nem lehet felfújni, csak valódi megjelenésekből számolódnak. Hogy mennyi maradt ma, a Keresés részben látszik.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'A swap kriptót vált CUBE-ra és vissza: 16 érme és hálózataik, az árfolyamot a kérés pillanatában vesszük, a CUBE $0.50-val számol. A beérkezés és a kifizetés fizetési szolgáltatón át megy; senki tőzsdei vagy tárcakulcsát nem vesszük át és nem tároljuk. Csak a megkeresett vehető ki, nem az, amit ajándékba írtak jóvá.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'A tárca mutatja a CUBE-egyenleget, az előzményeket és a feltöltés meg a kifizetés gombját. A feltöltés és a kifizetés a swapon át megy.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'A kulcs lehetőségeket nyit: a Free az alap, a Silver bővített, a Gold több kockát és statisztikát ad. A kulcsokat CUBE-ért veszik. A Premium előfizetés részt ad a jutalomalapból a havi hozzájárulásod szerint.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'A jelzés irány, belépési pont, cél és stop. A kiszolgáló maga figyeli az árat, és a célnál vagy a stopnál lezárja a jelzést. Tőzsdei kulcsot nem kérünk: te kereskedsz, magadnál.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'A bejegyzés alatti reakció CUBE-ot hoz a szerzőnek. Naponta 500 kedvelés adható, azon túl a kiszolgáló egyszerűen nem számolja őket.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'A kocka a saját tered: csevegés, folyam, zárt szobák és élet-időzítő. A világban a «+» gombbal készül. Embereket hivatkozással vagy a kocka kulcsával hívsz.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'A kocka külön világ a platformon belül: saját neve, borítója, csevegése, folyama és élettartama van. A kockák látszanak a térképen, körbejárhatók, és be lehet lépni hozzájuk.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'A csoportok nyilvános közösségek: közös csevegés, eseményfolyam és taglista. A sajátodat a Csoportok részben hozhatod létre.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'A kockajáték a térképen lévő gombbal nyílik. A műveletek lökésekre (robbanás, dobások, feldobás, tűzijáték, káosz) és módokra (leejtés vagy súlytalanság, a kettőből egy, mágnes, örvény, fagyasztás) oszlanak. A módok összeadódnak, és addig tartanak, amíg le nem veszed. Mindez megy gombbal, a kamera előtti kézjellel és hanggal is.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'A játékban bekapcsolhatók a kézjelek: oldalra lendítés dobás, felfelé feldobás, lefelé leejtés, tenyér előre robbanás, kör örvény, két kéz káosz. A kamera képe sehová nem megy, minden a saját készülékeden számolódik.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'A tárgyak nem csak kockák: kristály, háromszög, oktaéder, gömb, piramis, prizma, csillag, ikozaéder, gyűrű, dollár, euró, jüan. Tehetsz rá saját képet vagy legfeljebb 15 másodperces saját videót; az álló 9:16-os a közepéből négyzetre vágódik.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'A játékban nyolc figura van: macska, szomszéd, kutya, robot, szellem, panda, béka és földönkívüli. Simogathatók, csiklandozhatók és rázhatók, hanggal és mozgással válaszolnak. A saját műveletedet gombbal adod hozzá: név, parancs, leírás és hogy mivel történjen — kézzel, lábbal, fejjel vagy az egész testtel.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'A megjelenés az ablakok színét és átlátszóságát változtatja: az 1. szín a fejlécek és a sávok, a 2. szín maga az ablak, a 3. szín a profil borítója és kerete. A beszélgetések háttere ugyanitt választható, sajátot 9:16-ban tehetsz fel.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Hanggal szinte minden megy: a részek, a játék, az alakok, a figurák, több mint kilencven parancs. A teljes lista mind a húsz nyelven a Hangparancsok oldalon van: a Megjelenésből nyílik, vagy mondd azt, hogy «hangparancsok». A hangos vagy néma válasz kapcsolója is ott van.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'A dokumentumok a fiók menüjéből nyílnak → Dokumentumok. Hét van: felhasználási feltételek, adatvédelmi szabályzat, közösségi szabályok, jutalmak és korlátok, swap és fizetés, előfizetés és kulcsok, kamera és mikrofon. Hanggal is megy, mondd azt: «dokumentumok».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'A meghívások akkor adnak CUBE-ot, amikor a meghívott kifizeti az előfizetést. A saját hivatkozásod a meghívások részben van.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'A profil a kirakatod: borító, leírás és munkák. A borító és a keret kinézetét a 3. szín változtatja.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'A statisztika megmutatja, mi történik a kockáiddal és a bejegyzéseiddel: megtekintések, reakciók, az érkező emberek.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'A profilban elrejtheted a nevedet és a képedet, helyettük névtelen szám lesz. De ez az emberek elől rejt el, nem a kiszolgáló elől: egy kapcsolat IP-címét az interneten bármelyik oldal látja, a miénk is. Semmi olyan nincs az alkalmazásban, ami az IP-t elrejtené.',
  'Маркетплейс: объявления и обмен между людьми.':
    'A piactér hirdetések és csere emberek között.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'A bejegyzések, hozzászólások, hirdetések, nevek és leírások ellenőrzésen mennek át. Ami nyilvánvalóan tilos, nem jelenik meg, a vitás ember elé kerül. A piacteret ez az ellenőrzés nem érinti.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Szia. A platform segítője vagyok: válaszolok a kockákról, a jutalmakról, a tárcáról, a játékról és a beállításokról, és kockákat, embereket meg csoportokat is keresek. Kérdezz szavakkal, például «hogyan lehet keresni», «keresd meg az Art kockát», «ki az a @anna». A világ többi részéről a szomszédos NET fül szól.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE és pénz',
  'Что такое CUBE?':
    'Mi az a CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'A CUBE a platform belső pontja. A kiszolgáló naponta egyszer írja jóvá a tevékenységért. A swapban az ár rögzített: 1 CUBE = $0.50. Nem értékpapír és nem ígéret jövedelemre.',
  'Как заработать?':
    'Hogyan lehet keresni?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'A kiszolgáló számol, és 24 óránként egyszer zárja a napot: aktív nap online, saját bejegyzések és hozzászólások 10 ezer megtekintéstől, a bejegyzéseid alatti reakciók, a meghívottak, akik előfizettek, és a ráadás egy hétért, egy hónapért és egy évért egyhuzamban. A pontos mértékek a Keresés részben vannak.',
  'Какие лимиты в сутки?':
    'Milyen napi korlátok vannak?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 új csevegés, 500 kedvelés, 50 hozzászólás, 500 követés. A megtekintéseket egyáltalán nem lehet felfújni. A számolás UTC-napokban megy; ha eléred a korlátot, a művelet egyszerűen nem számít, és nincs érte büntetés.',
  'Что считается накруткой?':
    'Mi számít csalásnak?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Fiókok kötegben, önműködő kedvelés és követés, megtekintések vásárlása, összebeszélés kölcsönös reakciókra. Az így szerzett jutalmakat visszavonjuk.',
  'Как работает свайп?':
    'Hogyan működik a swap?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'A swap kriptót vált CUBE-ra és vissza: 16 érme és hálózataik. A kripto árfolyamát a kérés pillanatában vesszük, a CUBE $0.50-val számol. A fogadás és a küldés fizetési szolgáltatón át megy.',
  'Как пополнить кошелёк?':
    'Hogyan töltöm fel a tárcát?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'A swapon át: létrehozol egy kérést, kapsz egy címet és egy összeget, és elküldöd az átutalást a saját tárcádból. Fontos, hogy az érme és a hálózat egyezzen a kéréssel, különben az átutalás nem hozható vissza.',
  'Как вывести деньги?':
    'Hogyan veszem ki a pénzt?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'A kifizetési kérés a te címedre készül, a hálózati díjat a fogadó fizeti. Kézzel ellenőrizzük és küldjük, rendszerint egy munkanapon belül.',
  'Почему вывести можно не всё?':
    'Miért nem vehetem ki az egészet?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Csak a megkeresett vehető ki. Az ajándékba vagy jutalomként jóváírt CUBE elkölthető a platformon belül, de nem vehető ki; különben elég volna ajándékokat osztogatni, majd pénzzé tenni őket.',
  'Какие монеты поддерживаются?':
    'Milyen érméket támogattok?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 érmét és hálózataikat: BTC, ETH, USDT, USDC, BNB és még tizenegyet a forgalom szerinti élmezőnyből. A teljes lista a hálózatokkal a swap ablakában van.',
  'Что если отправил не в ту сеть?':
    'Mi van, ha rossz hálózatra küldtem?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'A blokkláncon az átutalás visszafordíthatatlan. Írj azonnal a támogatásnak: néha lehet segíteni, de ezt nem lehet megígérni. Ezért kell a kérés és a tárca hálózatának egyeznie.',
  'Берёте ли вы ключи от бирж?':
    'Elkéritek a tőzsdei kulcsokat?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Nem. Sem tőzsdei kulcsot, sem helyreállító mondatot, sem hozzáférést a tárcádhoz nem kérünk és nem fogadunk el. Ha valaki ilyet kér a platform nevében, az csaló.',
  'Платите ли вы налоги за меня?':
    'Ti fizetitek helyettem az adót?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Nem. Amivel az államnak tartozol, azt magad döntöd el és fizeted. Nem vagyunk adóügynök.',
  'Ключи и подписка':
    'Kulcsok és előfizetés',
  'Какие бывают ключи?':
    'Milyen kulcsok vannak?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'A Free az alap, a Silver bővített, a Gold több kockát és statisztikát ad. A kulcs CUBE-ért emelhető a Kulcsboltban.',
  'Что даёт Premium?':
    'Mit ad a Premium?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'Részt a jutalomalapból a havi hozzájárulásod szerint, külső tárcák bekötését megjelenítésre, statisztikát és rangsort, elsőbbséget a jelzéseknél, jelvényt a profilban és a csevegésben, zárt Premium kockákat.',
  'Сколько стоит подписка?':
    'Mennyibe kerül az előfizetés?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 havonta vagy $59.99 évente.',
  'Как отменить подписку?':
    'Hogyan mondom le az előfizetést?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Bármikor: kitölti a kifizetett időszakot, és nem hosszabbodik meg. A folyó időszakra kifizetett összeget nem térítjük vissza, kivéve ahol a törvény visszatérítést ír elő.',
  'Я потерял ключ: что делать?':
    'Elvesztettem a kulcsomat, mit tegyek?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Nem lehet visszaszerezni. Sem e-mailt, sem telefont nem kérünk, így nincs mivel ellenőriznünk, hogy a fiók a tiéd. A kulcs maga a fiók; tartsd ott, ahol nem veszik el.',
  'Можно ли передать ключ другому?':
    'Odaadhatom a kulcsomat másnak?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Odaadhatod, de minden, amit vele tesznek, a te tettednek számít.',
  'Кубы и группы':
    'Kockák és csoportok',
  'Что такое куб?':
    'Mi az a kocka?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'A kocka külön világ a platformon belül: saját név, borító, csevegés, folyam, zárt szobák és élettartam. A kockák látszanak a térképen, és be lehet lépni hozzájuk.',
  'Как создать куб?':
    'Hogyan hozok létre kockát?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'A világban a «+» gombbal vagy a Saját univerzumban. Megadod a nevet, a borítót, a fajtát és az élettartamot. Embereket hivatkozással vagy a kocka kulcsával hívsz.',
  'Что такое таймер жизни куба?':
    'Mi a kocka élet-időzítője?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'A kocka a megadott ideig él, aztán bezár. Az időtartamot a létrehozáskor választod, egy órától egy évig.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Mik azok a csoportok?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Nyilvános közösségek: közös csevegés, eseményfolyam és taglista.',
  'Как найти куб или человека?':
    'Hogyan találok kockát vagy embert?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Írd ide: «keresd meg az Art kockát», «@anna», «fotós csoport». Átnézem a platformot, és kártyákat mutatok: kockák, emberek, csoportok és éppen futó adások.',
  'Лента и посты':
    'Folyam és bejegyzések',
  'Как выложить пост?':
    'Hogyan teszek közzé bejegyzést?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'A folyamban a létrehozás gombbal. Lehet videó, kép, cím és leírás.',
  'Почему пост не опубликовался?':
    'Miért nem jelent meg a bejegyzésem?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'A szöveg nem ment át a közzététel előtti ellenőrzésen. Az üzenet megírja az okát: tiltott áru, csalás, fenyegetés és hasonlók. A szabályok a Dokumentumokban vannak, és ha tévedés, írj a támogatásnak.',
  'Что дают реакции?':
    'Mit adnak a reakciók?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'A bejegyzés alatti reakció CUBE-ot hoz a szerzőnek. Naponta 500 kedvelés adható.',
  'Как пожаловаться на пост?':
    'Hogyan jelentek egy bejegyzést?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Minden bejegyzés és minden üzenet alatt van jelentés gomb. A jelentés emberhez kerül.',
  'Сколько просмотров нужно для начисления?':
    'Hány megtekintés kell a jutalomhoz?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    '10 ezer valódi megjelenéstől: a saját bejegyzések és hozzászólások ettől a határtól kezdenek CUBE-ot hozni.',
  'Игра с кубами':
    'A kockajáték',
  'Как играть кубами?':
    'Hogyan játszom a kockákkal?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'A játék gombja a térképen van. A kockák falak között repülnek, és nem tudnak kijönni. A műveleteket gombbal nyomod, kézzel mutatod a kamera előtt, vagy hangosan kimondod.',
  'Что такое режимы и толчки?':
    'Mik a módok és a lökések?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'A lökések a robbanás, a dobások, a feldobás, a tűzijáték és a káosz: egyszer futnak le, és mindenen felül hatnak. A módok addig tartanak, amíg le nem veszed, és összeadódnak: gravitáció (leejtés VAGY súlytalanság), mágnes, örvény, fagyasztás.',
  'Как работают жесты рукой?':
    'Hogyan működnek a kézjelek?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Oldalra lendítés dobás, felfelé feldobás, lefelé leejtés, tenyér előre robbanás, kör örvény, két kéz káosz. A képkockák a saját készülékeden dolgozódnak fel, és sehová nem mennek.',
  'Какие есть формы?':
    'Milyen alakok vannak?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kocka, kristály, háromszög, oktaéder, gömb, piramis, prizma, csillag, ikozaéder, gyűrű, dollár, euró, jüan és a saját képed. Ezenkívül a «vegyesen», ahol minden tárgynak saját alakja van.',
  'Как поставить свою картинку?':
    'Hogyan teszek fel saját képet?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'A játékban → Tárgy alakja → a «Sajátom» mező. A négyzetes a legjobb; az álló 9:16-os a közepéből vágódik. Nyomd meg újra a «Sajátom» gombot, és kicseréled.',
  'Можно ли поставить видео?':
    'Lehet videót használni?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Lehet, 15 másodpercig. A hosszabbat nem fogadja el. A videó túléli az oldal újratöltését.',
  'Кто такие персонажи?':
    'Kik a figurák?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Nyolc figura: macska, szomszéd, kutya, robot, szellem, panda, béka, földönkívüli. Simogathatók, csiklandozhatók és rázhatók, hanggal és mozgással válaszolnak.',
  'Как добавить своё действие?':
    'Hogyan adok hozzá saját műveletet?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'A figurák részében egy gombbal: név, parancs, leírás és hogy mivel történjen — kézzel, lábbal, fejjel vagy az egész testtel. Magát a műveletet tizenhat kész hatás közül választod.',
  'Как крутятся предметы?':
    'Hogyan forognak a tárgyak?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Öt mód: a tengely mentén, a tengellyel szemben, felül át, alul át, és összevissza. A dobásból jövő pörgés hozzáadódik a választott módhoz.',
  'Как начать эфир?':
    'Hogyan kezdek adást?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'A folyamban az Adás gomb, vagy a «adás» hangparancs. Kiválasztod a címet és a módot, és már élőben vagy. A nézők közvetlenül tőled kapják a képet.',
  'Какие режимы эфира?':
    'Milyen adásmódok vannak?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera és kockák: a jelenet a kamera képe fölött, a kézjelek működnek. Csak kockák: a jelenet kamera nélkül. Tiszta adás: csak a kamera, hozzászólások, reakciók és ajándékok nélkül.',
  'Сколько зрителей выдержит эфир?':
    'Hány nézőt bír el egy adás?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'A kép közvetlenül az adótól megy minden nézőhöz, tehát az ő kapcsolatán múlik: otthoni vonalon tíz-tizenöt ember nézi kényelmesen. A nagyobb terem átjátszó kiszolgálót kíván.',
  'Что такое подарки?':
    'Mik azok az ajándékok?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Harminc ajándék, az 1 CUBE-os Rózsától az 1000-es Legenda kockáig. Az ajándék a CUBE teljes átutalása az adónak; a platform semmit nem tart meg.',
  'Как закончить эфир?':
    'Hogyan fejezem be az adást?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Az ablak fejlécében az Adás befejezése gomb, minden módban látszik. Az ablakot kereszttel bezárni nem állítja le az adást: addig megy, amíg meg nem nyomod a Befejezést.',
  'Голос и языки':
    'Hang és nyelvek',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Milyen hangparancsok vannak?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Több mint kilencven: részek, ablakok, létrehozás, folyam, játék, alakok, figurák, vezérlés. A teljes lista kereséssel a Hangparancsok oldalon van: fiókmenü → Hangparancsok, vagy a Megjelenésben, vagy mondd egyszerűen: «hangparancsok».',
  'На каких языках работает голос?':
    'Milyen nyelveken működik a hang?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'Húszon: orosz, angol (az indiai is), ukrán, német, francia (és a kanadai), spanyol (és a latin-amerikai), olasz, portugál, lengyel, török, arab (és az öbölbeli), vietnámi, kínai, japán, koreai, hindi. A nyelvet a parancsok oldalán és a Megjelenésben választod.',
  'Как включить микрофон?':
    'Hogyan kapcsolom be a mikrofont?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'A mikrofon gombja a felső sávban van. Megnyomod, és hallgat, újra megnyomod, és abbahagyja.',
  'Как выключить озвучку?':
    'Hogyan kapcsolom ki a hangos válaszokat?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'A Hangparancsok oldalán van egy kapcsoló a hangos és a néma válasz között. A hang mindkét esetben hallgat; csak a válasz más.',
  'Куда уходит мой голос?':
    'Hová megy a hangom?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'A felismerést maga a böngésző végzi. A Chrome és a rá épülő böngészők a hangot a Google kiszolgálóira küldik; így készült a felismerésük, és ebben a platform nem dönt semmit. Ha ez nem felel meg, ne kapcsold be a mikrofont: minden gombokkal is megvan.',
  'Как поменять тему?':
    'Hogyan váltok témát?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Megjelenés → Téma: sötét, világos, vagy a Kamera, ahol a hátteret a kamerád képe adja.',
  'Что такое Цвет 1, 2 и 3?':
    'Mi az 1., 2. és 3. szín?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Az 1. szín a fejlécek, a beíró sávok és a fülek. A 2. szín maga az ablak: a csevegés háttere és a hozzászólások listája. A 3. szín a profil borítója és kerete. Mindegyiknek külön átlátszóság-csúszkája van.',
  'Как поставить обои?':
    'Hogyan teszek fel hátteret?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Megjelenés → Háttér: egy kész készlet vagy a saját képed 9:16-ban. A 2. szín árnyalatként fekszik a háttérre, a csúszka pedig eldönti, milyen erősen.',
  'Правила и безопасность':
    'Szabályok és biztonság',
  'Что нельзя выкладывать?':
    'Mit nem szabad közzétenni?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Gyerekekkel kapcsolatos anyagot, fenyegetést és erőszakra buzdítást, gyűlöletkeltést, csalást, tiltott árut, más munkáját jog nélkül, más nevében való fellépést, kéretlen reklámot és színlelt tevékenységet. Teljes egészében a Közösségi szabályokban.',
  'Как работает модерация?':
    'Hogyan működik a moderálás?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'A bejegyzéseket, hozzászólásokat, csoportüzeneteket, neveket és leírásokat a kiszolgáló a közzététel előtt ellenőrzi. Ami nyilvánvalóan tilos, nem jelenik meg, a vitás emberhez kerül. A piacteret és a személyes beszélgetéseket nem ellenőrizzük.',
  'Виден ли мой IP?':
    'Látszik az IP-címem?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Igen, a kiszolgáló látja, mint bármely oldal az interneten: IP nélkül nem tudná, hová küldje a választ. A rejtett mód a nevet és a képet az emberek elől rejti el, nem a kiszolgáló elől.',
  'Что вы храните обо мне?':
    'Mit tároltok rólam?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'A fiók kulcsát, a profilt, amit magad töltöttél ki, a tartalmaidat, a napi számlálókat és a kapcsolat műszaki adatait. Sem e-mailt, sem telefont, sem jelszavakat, sem tárcakulcsokat.',
  'Куда жаловаться?':
    'Hová panaszkodhatom?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Egy tartalomra az alatta lévő jelentés gombbal. Minden másra a platformon belüli támogatáson át.',
  'Где документы?':
    'Hol vannak a dokumentumok?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Fiókmenü → Dokumentumok. Hét van: feltételek, adatvédelmi szabályzat, közösségi szabályok, jutalmak és korlátok, swap és fizetés, előfizetés és kulcsok, kamera és mikrofon.',
  'Что такое карта?':
    'Mi az a térkép?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'A platform térképe: 177 ország és 1150 város valódi koordinátákkal, a nap helyzete a mostani időre számolva, az éjszakai oldal és a hajnal pontosan ott, ahol az égen vannak. Húsz nézet: az űrből, a Föld éjjel, nappal és éjjel, az OpenStreetMap utcái, időjárás, földrengések, időzónák, a mi kockáink és adásaink. A fiókmenüből nyílik, vagy a «térkép» szóra.',
  'Как проложить маршрут на карте?':
    'Hogyan rajzolok útvonalat a térképen?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Érintsd meg a kezdetet a térképen, aztán a véget, és válassz a húsz út közül. A főkör és a loxodroma, vagyis ahogy valóban repülnek és hajóznak. Csak szárazföldön és csak vízen: valódi útkeresés a kontinenseken, egyetlen lépés nélkül a másik elembe. Az árnyék mentén és a fény mentén: az éjszakai oldalt követve. Kockák, adások és emberek mellett: a mi tűinken át. Az utcai útvonalat a külső OSRM motor számolja; ha nem válaszol, megmondjuk.',
  'Видно ли меня на карте?':
    'Látszom a térképen?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Csak ha magad szúrtad le az «itt vagyok» tűt. Fél órát él, és magától törlődik, a koordinátákat már a kiszolgálóra küldés előtt egy kilométerre kerekítjük, a «vegyél le a térképről» pedig törli a bejegyzést, nem elrejti. E tű nélkül egyáltalán nem vagy rajta a térképen.',
  'Есть ли на карте спутник и пробки?':
    'Van a térképen műholdkép és forgalom?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nincs. A műholdképet és a forgalmat fizetős szolgáltatók adják kulccsal. E rétegek helye készen áll: beírod a kulcsot, és bekapcsolnak. Amíg nincs kulcs, a térkép ezt nyíltan megmondja, ahelyett hogy szép hazugságot rajzolna.',
  'Что такое забег по улице?':
    'Mi az utcai futás?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Ugrás a térkép belsejébe: első személyű nézet, a saját utcád valódi házai és kanyarjai. Te futsz: oldalra húzva sávot váltasz, kereszteződésben kanyarodsz, felfelé ugrasz, lefelé csúszol. Kockákat gyűjtesz, és kitérsz a sorompók meg a sugarak elől. Útközben mások adásaiba, kockáiba és kirakataiba botlasz. Van nyugodt séta is botkormánnyal. A fiókmenüből, a térképen az Utcára gombbal, vagy a «futás» szóra nyílik.',
  'Откуда берутся дома в забеге?':
    'Honnan vannak a futás házai?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Az OpenStreetMapből: valódi körvonalak és szintszámok, valódi utak a szélességükkel és kanyarjaikkal. Egy szintet három méternek számolunk; ha a szintszám hiányzik, a magasságot a ház alapterületéből vesszük. Utcaképek nincsenek, azokat fizetős szolgáltatók adják. Ha a térkép kiszolgálója elfoglalt, a játék ezt őszintén megmondja, és felépíti a saját negyedünket.',
  'Что такое шопинг в маркетплейсе?':
    'Mi a vásárlás a piactéren?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'A piactér második része, tárgyakra és nem fájlokra: tizenhat kategória a ruhától a művészetig, kártya márkával, méretekkel, színekkel, adatokkal és legfeljebb húsz fényképpel. Minden kártyán forog egy alakzat a márka nevével, a húsz alak bármelyike. Ez a rész nem nyúl a pénzhez: a fizetés és a szállítás emberek között van, ezért áll ott, hogy «írj az eladónak», és nem az, hogy «vedd meg CUBE-ért».',
  'Игры, чаты и новое':
    'Játékok, csevegések és újdonságok',
  'Сколько игр в зале?':
    'Hány játék van a teremben?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Nyolc, és mind játszható: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Ujjal és billentyűzettel is mennek.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Adnak a játékok CUBE-ot?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nem. A játékok pontot és személyes csúcsot adnak, ezek a böngésződben maradnak. A CUBE-ot a kiszolgáló írja jóvá megtekintésekért és a közös alapból; böngészőben pénzt verni hazugság volna.',
  'Как играть в DataMine?':
    'Hogyan kell a DataMine-t játszani?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Nyolcszor nyolcas mező. Megérintesz egy kockát, és kiásod az adatot; a szám mutatja, hány vírus van mellette. Hosszú nyomás zászlót tesz. Három élet, aztán új réteg.',
  'Как играть в CipherBreak?':
    'Hogyan kell a CipherBreak-et játszani?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Találd ki a négy jelből álló kódot. Egy próba után a teli kör azt jelenti, hogy a jel a helyén van, az üres azt, hogy benne van a kódban, de máshol. Nyolc próba.',
  'Как играть в Phantom Escape?':
    'Hogyan kell a Phantom Escape-et játszani?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Szedj össze öt kulcsot, és menj ki az ajtón. A szellemek a legrövidebb úton követnek, és minden emeleten többen vannak.',
  'Как играть в Block Trade?':
    'Hogyan kell a Block Trade-et játszani?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Másfél perc, a kezedben 1000. Végy olcsóbban, adj el drágábban. A pontszámod minden, ami ezer fölött marad.',
  'Как играть в TrustChain?':
    'Hogyan kell a TrustChain-t játszani?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Érintsd a blokkokat növekvő sorrendben, amíg jár az óra. Egy hiba, és a lánc elszakad. Minden körben hosszabb a lánc.',
  'Как играть в CubeBuilder?':
    'Hogyan kell a CubeBuilder-t játszani?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'A lap oldalra jár, egy érintés leejti. Ami kilóg, leesik, és a lap keskenyebb lesz. Ha elvéted a tornyot, vége.',
  'Что показывает строка курсов?':
    'Mit mutat az árfolyamsáv?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Harminc érmét az árával és a napi változásával. Az adatok a mi kiszolgálónkon át jönnek, amely fél percet tárol. A sáv nem kúszik: a képernyőre egész számú mező fér, és néhány másodpercenként váltanak.',
  'Что значит число кубов в шапке?':
    'Mit jelent a kockák száma a fejlécben?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Hány kocka van most a te világodban, azok, amiket magad előtt látsz. Nem a platform összes kockájának száma.',
  'Можно ли войти вторым аккаунтом?':
    'Beléphetek egy második fiókkal?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Be. Fiókmenü → Fiók hozzáadása: a mostani kulcs a listában marad, és ugyanabból a menüből egy érintéssel visszatérsz hozzá. Nyolcig jegyzi meg.',
  'Зачем «Сохранить» в окне игры?':
    'Mire jó a Mentés a játék ablakában?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Megjegyzi a tárgy alakját, a figurát, a kézjeleket és a méretet. Legközelebb minden ott lesz, ahol hagytad.',
  'Чем режим отличается от толчка?':
    'Miben más a mód, mint a lökés?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'A mód addig tart, amíg második érintéssel le nem kapcsolod, és világít. A lökés egyszer fut le, és nem világít; csak vékony jelet hagy, hogy utoljára azt nyomták.',
  'Почему кубы больше не исчезают?':
    'Miért nem tűnnek el többé a kockák?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'A kirakat mintakockái rövid életűek voltak, öt és tizenöt perc. Most legalább fél napot kapnak, és lejárat előtt újraindulnak. A valódi kockák pontosan annyit élnek, amennyit létrehozáskor kaptak.',
  'Как сделать фото прямо в чат?':
    'Hogyan fényképezek egyenesen a beszélgetésbe?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'A gémkapocs → Kamera a mi saját felvételünket nyitja. Egy érintés fényképez, a hosszú nyomás egy percig videózik. A galéria a szomszédos pont, Fotó vagy videó.',
  'Что такое галерея переписки?':
    'Mi a beszélgetés galériája?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'A beszélgetés fejlécében a nagyító megnyitja a keresést és fölötte egy polcot: fotók, videók, hangok és hivatkozások abból a beszélgetésből. Magukból az üzenetekből gyűlik össze, és semmi nem megy sehová.',
  'Как удалить сразу несколько сообщений?':
    'Hogyan törlök több üzenetet egyszerre?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Egy üzenet hosszú nyomása bekapcsolja a kijelölést, aztán megjelölöd, amit akarsz, és megnyomod a Törlés gombot az alsó sávban. Egyszerre százig.',
  'Можно ли изменить своё сообщение?':
    'Szerkeszthetem a saját üzenetemet?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Igen, a sajátodat és csak a szöveges üzenetet: üzenet menü → Szerkesztés. Mellette megjelenik a «szerkesztve» jelzés. A beszélgetés közben nem záródik be.',
  'Что такое сторис?':
    'Mik azok a történetek?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Rövid bejegyzések, amelyek egy napig élnek, a beszélgetések listája fölött: egy fotó vagy legfeljebb egyperces videó. Egymás után nézed őket, és egy nap múlva maguktól eltűnnek.',
  'Сколько фото можно в группу?':
    'Hány fotó fér egy csoportba?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Legfeljebb hét fotó, vagy egy legfeljebb egyperces videó. Ezenfelül egy ikon a készletből és címkék a leírás alatt.',
  'Что такое теги группы?':
    'Mik a csoport címkéi?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Néhány vesszővel elválasztott szó, amelyek alapján a csoport megtalálható a keresésben.',
  'Видно ли участников группы?':
    'Látszanak a csoport tagjai?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'A tulajdonos dönt róla a létrehozáskor: a taglista megmutatható mindenkinek, vagy maradhat csak a tulajdonos számára láthatóan.',
  'Почему поле ссылки на видео убрали?':
    'Miért tűnt el a videóhivatkozás mezője?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Az idegen hivatkozás elromlott, amikor a másik végén törölték, és a platform ezért nem felelhetett. A videó fájlként töltődik fel a saját tárhelyünkre.',
  'Сколько длится видео в посте?':
    'Milyen hosszú lehet a videó egy bejegyzésben?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Egyelőre 50 MB-ig terjedő fájl. Nagyobb kiszolgálón lesznek fokozatok: 15 másodperc, egy perc, három perc és tizenöt.',
  'Что делает кнопка «Чаевые автору»?':
    'Mit csinál a Borravaló a szerzőnek gomb?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Az egyenlegedről teljes egészében átutalja a CUBE-ot a bejegyzés szerzőjének, a platformnak nem marad része. Az összeg 1, 5, 10, 25 vagy saját.',
  'Как пожаловаться на видео?':
    'Hogyan jelentek egy videót?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'A videó alatti három pont → Jelentés: kiválasztod az okot, és hozzáírhatod a saját szavaidat. Élő emberhez kerül.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Hogyan osztok meg egy bejegyzést?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'A videó alatti három pont → Megosztás. Kapsz egy hivatkozást, amit bárkinek elküldhetsz.',
  'Куда девается «Сохранить»?':
    'Hová teszi a Mentés a dolgokat?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'A profilodba, a mentettek polcára, a profil fülei alatti könyvjelző ikon alá.',
  'Что видно в моём профиле?':
    'Mi látszik a profilomban?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Két fül: Shorts a rövid videóidnak, Bejegyzések minden másnak. Egy kártyát megérintve ugyanúgy nyílik meg, mint a folyamban. A szerkesztést és a törlést csak a szerző látja.',
  'Как изменить профиль?':
    'Hogyan szerkesztem a profilomat?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'A saját profilodban a ceruza gomb: név, @felhasználónév, leírás, fióktípus, állapot, hivatkozások és cím.',
  'Чем бизнес-аккаунт отличается?':
    'Miben más az üzleti fiók?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'A nyilvános azt jelenti, hogy mindenki lát téged. A rejtett azt, hogy a neved és a képed el van rejtve az emberek elől. Az üzleti hozzáadja a tevékenységed leírását, a hivatkozásokat és egy címet.',
  'Что показывает «онлайн» в шапке?':
    'Mit mutat az «online» a fejlécben?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Hányan vannak a kiszolgáló szerint most a platformon. Félpercenként frissül.',
  'Закрывается ли игра вместе с эфиром?':
    'Bezárul a játék az adással együtt?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Igen. Ha az adásban kockák voltak, a játék az adás végén magától kikapcsol; különben a tárgyak tovább repülnének egy üres térkép fölött.',
  'Есть ли смайлы в эфире?':
    'Vannak hangulatjelek az adásban?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Vannak, a beíró sáv melletti hangulatjel gombban ott a teljes közös gyűjtemény, ugyanaz, mint a beszélgetésekben.',
  'Что такое «Все вопросы»?':
    'Mi az Összes kérdés?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'A segítő teljes kézikönyve: több mint száz kérdés válaszokkal, részekbe rendezve, cím szerinti kereséssel.',
  'Куда делась кнопка NET?':
    'Hová tűnt a NET gomb?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Eltávolítottuk. A platform nem keres a nagy interneten, a gomb viszont azt ígérte. A segítő a platformról válaszol, és kockákat, embereket, csoportokat és adásokat talál.',
  'Почему звук повторялся дважды?':
    'Miért ismétlődött a hang kétszer?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Két különböző kóddarab beszélt, és egyik sem vágott a másik szavába. Most minden mondat visszavonja az előzőt, és ugyanaz a szöveg nem hangzik el kétszer egymás után.',
  'Как выключить голос совсем?':
    'Hogyan kapcsolom ki a hangot teljesen?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'A Hangparancsok oldalán van egy kapcsoló a hangos és a néma válasz között. Most tényleg kikapcsolja: korábban csak egy bejáratot uralt, és a hang megkerülte.',
  'Что хранится только в моём браузере?':
    'Mi tárolódik csak az én böngészőmben?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'A játékcsúcsok, a kockajáték beállításai, a választott nyelv, a téma és a háttér, és a saját fiókjaid listája. Ezek közül semmi nem megy a kiszolgálóra.',
  'Почему просят подтвердить удаление?':
    'Miért kérünk megerősítést a törléshez?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Mert nem lehet visszacsinálni. A beszélgetésekben azt is megkérdezzük, melyik példányt vegyük le, csak a tiédet vagy mindenkiét.',
  'Что такое «У всех» при удалении?':
    'Mit jelent a «Mindenkinek» törléskor?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    'A «Nekem» csak a te képernyődről rejti el az üzenetet. A «Mindenkinek» megkéri a kiszolgálót, hogy a másiknál is vegye le.',
  'Сколько живёт сообщение с таймером?':
    'Meddig él a határidős üzenet?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Ameddig választottad: öt perc, egy óra, egy nap, egy hét vagy örökké. A beíró sáv melletti ∞ gomb.',
  'Как переслать сообщение?':
    'Hogyan továbbítok üzenetet?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Üzenet menü → Továbbítás. Kiválasztod, kinek.',
  'Что делает «В избранное»?':
    'Mit csinál a Mentés a kedvencekbe?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Az üzenetet a Mentettek közé teszi, a te saját füzetedbe, ahol a jegyzetek és a megőrzött dolgok vannak.',
  'Как найти сообщение в переписке?':
    'Hogyan találok meg egy üzenetet a beszélgetésben?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'A beszélgetés fejlécében a nagyító: a szövegben keres, a nyilak pedig a találatok között ugrálnak. A fotók, videók, hangok és hivatkozások polca ugyanott van.',
  'Что такое «Пригласить в группу»?':
    'Mi a Meghívás a csoportba?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Egy hivatkozás a csoport adatlapjáról: aki megnyitja, belép a csoportba.',
  'Можно ли выйти из группы?':
    'Kiléphetek egy csoportból?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Ki, a csoport adatlapján lévő gombbal. Ha a tulajdonos lép ki, maga a csoport nem törlődik.',
  'Сколько форм у предметов?':
    'Hány alakja van a tárgyaknak?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Húsz, fölötte a saját képed vagy videód, és a vegyes mód.',
  'Что такое шопинг?':
    'Mi az a vásárlás?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'A piactér második része, tárgyakra: tizenhat kategória, kártya márkával és legfeljebb húsz fényképpel, és egy forgó alakzat a márka nevével. A fizetés és a szállítás emberek között van.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Kérdezz szavakkal: például «hogyan lehet keresni» vagy «keresd meg az Art kockát».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Mit keressek? Írj valami ilyesmit: «keresd meg az Art kockát» vagy «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    '«{что}» kérdésre nincs válaszom. Amit ismerek, az a platform: CUBE és jutalmak, korlátok, swap, tárca, kulcsok, jelzések, kockák és csoportok, a kockajáték, az adások, a megjelenés és a hangparancsok.'

});
