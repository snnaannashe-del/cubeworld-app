/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-nl.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('nl', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Berichten, video\'s en ronde clips. Hiervandaan openen ook de reacties en de likes.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Privégesprekken, spraakberichten en ronde video\'s, bewaarde dingen.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Openbare gemeenschappen: een gedeelde chat, een stroom van gebeurtenissen, de leden.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Handelssignalen: richting, instap, doel en stop. De server bewaakt de prijs zelf.',
  'Объявления и обмен между людьми.':
    'Advertenties en ruil tussen mensen.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'De tarieven van de beloningen, de swap en alles waarvoor CUBE binnenkomt.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Je CUBE-saldo, stortingen, opnames en de geschiedenis.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Wat er met je kubussen en berichten gebeurt, in cijfers.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE is de interne munt van het platform. De server schrijft hem één keer per dag bij voor activiteit: een actieve dag, eigen berichten en reacties, uitgenodigde mensen. In de swap ligt de CUBE-prijs vast: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'De server sluit de beloningen één keer per dag af. Meetellen: een actieve dag online, eigen berichten en reacties vanaf 10 duizend weergaven, uitgenodigden die een abonnement betaalden, en toeslagen voor een week, een maand en een jaar achter elkaar. De precieze tarieven staan altijd actueel in Verdienen.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Zodat niets met trucs opgeblazen kan worden, houdt de server daglimieten aan: 20 nieuwe chats, 500 likes, 50 reacties, 500 volgacties. Weergaven zijn helemaal niet op te blazen, ze tellen alleen uit echte vertoningen. Hoeveel er vandaag over is, zie je in Verdienen.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'De swap wisselt crypto om in CUBE en terug: 16 munten en hun netwerken, de koers wordt genomen op het moment van de aanvraag, CUBE telt tegen $0.50. Binnenkomst en opname lopen via een betaaldienst; sleutels van beurzen of wallets van wie dan ook nemen en bewaren we niet. Opnemen kan alleen wat verdiend is, niet wat als cadeau is bijgeschreven.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'De wallet toont je CUBE-saldo, de geschiedenis en de knoppen voor storten en opnemen. Storten en opnemen gaat via de swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Een sleutel opent mogelijkheden: Free is de basis, Silver is uitgebreid, Gold geeft meer kubussen en statistieken. Sleutels koop je met CUBE. Het Premium-abonnement geeft een deel van de beloningspot naar je bijdrage van de maand.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Een signaal is een richting, een instappunt, een doel en een stop. De server bewaakt de prijs zelf en sluit het signaal op het doel of op de stop. Beurssleutels vragen we niet: je handelt zelf, bij jezelf.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Een reactie onder een bericht levert de maker CUBE op. Per dag kun je tot 500 likes geven, daarna telt de server ze simpelweg niet meer.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Een kubus is je eigen ruimte: chat, stroom, privékamers en een levenstimer. Je maakt er een met de «+» in de wereld. Mensen nodig je uit met een link of met de sleutel van de kubus.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Een kubus is een aparte wereld binnen het platform: met een eigen naam, omslag, chat, stroom en levensduur. Kubussen zie je op de kaart, je kunt eromheen lopen en je kunt erbij komen.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Groepen zijn openbare gemeenschappen: een gedeelde chat, een stroom van gebeurtenissen en een ledenlijst. Een eigen groep maak je in het onderdeel Groepen.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Het kubusspel opent met een knop op de kaart. De acties vallen uiteen in zetten (explosie, worpen, opgooien, vuurwerk, chaos) en standen (laten vallen of gewichtloos, een van de twee, magneet, wervel, bevriezen). Standen stapelen en blijven tot je ze uitzet. Dit alles werkt met de knop, met een gebaar voor de camera en met de stem.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'In het spel kun je gebaren aanzetten: een beweging opzij is een worp, omhoog is opgooien, omlaag is laten vallen, handpalm naar voren is de explosie, een cirkel is de wervel, twee handen is de chaos. Het camerabeeld gaat nergens heen, alles wordt op je eigen apparaat berekend.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'De voorwerpen zijn niet alleen kubussen: kristal, driehoek, octaëder, bol, piramide, prisma, ster, icosaëder, ring, dollar, euro, yuan. Je kunt je eigen plaatje of je eigen video tot 15 seconden plaatsen; een staande 9:16 wordt vanuit het midden vierkant bijgesneden.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Het spel heeft acht figuren: een kat, een buur, een hond, een robot, een spook, een panda, een kikker en een alien. Je kunt ze aaien, kietelen en door elkaar schudden, en ze antwoorden met stem en beweging. Een eigen actie voeg je toe met een knop: een naam, een commando, een beschrijving en waarmee, met hand, voet, hoofd of het hele lichaam.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'De vormgeving verandert kleur en doorzichtigheid van de vensters: Kleur 1 zijn de kopbalken en de balken, Kleur 2 is het venster zelf, Kleur 3 zijn de omslag en de lijst van het portfolio. Achtergronden voor gesprekken kies je op dezelfde plek, eigen mag in 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Bijna alles werkt met de stem: de onderdelen, het spel, de vormen, de figuren, meer dan negentig opdrachten. De volledige lijst in alle twintig talen staat op de pagina Spraakopdrachten: die opent vanuit Vormgeving of met de woorden «spraakopdrachten». De schakelaar voor hardop of stil antwoorden staat daar ook.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'De documenten openen vanuit het accountmenu → Documenten. Het zijn er zeven: de gebruiksvoorwaarden, de privacyverklaring, de gedragsregels, beloningen en limieten, swap en betalingen, abonnement en sleutels, camera en microfoon. Ook met de stem, zeg gewoon «documenten».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Uitnodigingen geven CUBE wanneer de uitgenodigde een abonnement betaalt. Je eigen link staat in het onderdeel uitnodigingen.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Het portfolio is de etalage van het profiel: omslag, beschrijving en werk. Het uiterlijk van omslag en lijst verander je met Kleur 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'De statistieken laten zien wat er met je kubussen en berichten gebeurt: weergaven, reacties, mensen die binnenkomen.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'In je profiel kun je naam en foto verbergen; in plaats daarvan komt er een anoniem nummer. Maar dat verbergt je voor andere mensen, niet voor de server: het IP-adres van een verbinding ziet elke site op internet, de onze ook. Iets wat het IP verbergt zit niet in de app.',
  'Маркетплейс: объявления и обмен между людьми.':
    'De marktplaats is advertenties en ruil tussen mensen.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Berichten, reacties, advertenties, namen en beschrijvingen gaan door een controle. Wat duidelijk verboden is wordt niet geplaatst, twijfelgevallen gaan naar een mens. De marktplaats raakt deze controle niet.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Hallo. Ik ben de helper van het platform: ik beantwoord vragen over kubussen, beloningen, de wallet, het spel en de instellingen, en ik vind ook kubussen, mensen en groepen. Vraag het in woorden, bijvoorbeeld «hoe verdien ik», «zoek de kubus Art», «wie is @anna». Over de rest van de wereld gaat het tabblad NET hiernaast.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE en geld',
  'Что такое CUBE?':
    'Wat is CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE zijn de interne punten van het platform. De server schrijft ze één keer per dag bij voor activiteit. In de swap ligt de prijs vast: 1 CUBE = $0.50. Het is geen waardepapier en geen belofte van inkomen.',
  'Как заработать?':
    'Hoe verdien ik?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'De server telt en sluit de dag één keer per 24 uur af: actieve dag online, eigen berichten en reacties vanaf 10 duizend weergaven, reacties onder jouw berichten, uitgenodigden die een abonnement betaalden, en toeslagen voor een week, een maand en een jaar achter elkaar. De precieze tarieven staan in Verdienen.',
  'Какие лимиты в сутки?':
    'Welke daglimieten zijn er?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 nieuwe chats, 500 likes, 50 reacties, 500 volgacties. Weergaven zijn helemaal niet op te blazen. Er wordt per UTC-dag geteld; haal je de limiet, dan telt de handeling simpelweg niet, en er staat geen straf op.',
  'Что считается накруткой?':
    'Wat geldt als trucje?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Stapels accounts, automatische likes en volgacties, gekochte weergaven, afspraken om elkaar te liken. Zo verkregen beloningen worden weer afgeboekt.',
  'Как работает свайп?':
    'Hoe werkt de swap?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'De swap wisselt crypto om in CUBE en terug: 16 munten en hun netwerken. De cryptokoers wordt genomen op het moment van de aanvraag, CUBE telt tegen $0.50. Ontvangen en versturen loopt via een betaaldienst.',
  'Как пополнить кошелёк?':
    'Hoe vul ik de wallet aan?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Via de swap: je maakt een aanvraag, krijgt een adres en een bedrag, en stuurt de overboeking vanuit je eigen wallet. Het is belangrijk dat munt en netwerk met de aanvraag overeenkomen, anders is de overboeking niet terug te halen.',
  'Как вывести деньги?':
    'Hoe neem ik geld op?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'De opnameaanvraag wordt op jouw adres gemaakt, en de netwerkkosten betaalt de ontvanger. We controleren en versturen met de hand, meestal binnen een werkdag.',
  'Почему вывести можно не всё?':
    'Waarom kan ik niet alles opnemen?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Alleen wat verdiend is, wordt uitbetaald. CUBE die als cadeau of bonus is bijgeschreven geef je binnen het platform uit, maar neem je niet op; anders zou het genoeg zijn om cadeaus uit te delen en ze te verzilveren.',
  'Какие монеты поддерживаются?':
    'Welke munten worden ondersteund?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 munten en hun netwerken: BTC, ETH, USDT, USDC, BNB en nog elf uit de top naar omzet. De volledige lijst met netwerken staat in het swapvenster.',
  'Что если отправил не в ту сеть?':
    'En als ik naar het verkeerde netwerk heb gestuurd?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Een overboeking in de blockchain is onomkeerbaar. Schrijf meteen naar support: soms valt er te helpen, maar beloven kan dat niet. Daarom moeten het netwerk in de aanvraag en dat in je wallet overeenkomen.',
  'Берёте ли вы ключи от бирж?':
    'Nemen jullie beurssleutels aan?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Nee. Beurssleutels, seed-zinnen of toegang tot je wallet vragen en accepteren wij niet. Vraagt iemand daarom namens het platform, dan is dat een oplichter.',
  'Платите ли вы налоги за меня?':
    'Betalen jullie mijn belasting?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Nee. Wat je de staat verschuldigd bent, bepaal en betaal je zelf. Wij zijn geen belastingagent.',
  'Ключи и подписка':
    'Sleutels en abonnement',
  'Какие бывают ключи?':
    'Welke sleutels zijn er?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free is de basis, Silver is uitgebreid, Gold geeft meer kubussen en statistieken. De sleutel verhoog je met CUBE in de Sleutelwinkel.',
  'Что даёт Premium?':
    'Wat geeft Premium?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'Een deel van de beloningspot naar je bijdrage van de maand, externe wallets gekoppeld om te tonen, statistieken en een ranglijst, voorrang bij de signalen, een insigne in je profiel en in de chat, en gesloten Premium-kubussen.',
  'Сколько стоит подписка?':
    'Wat kost het abonnement?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 per maand of $59.99 per jaar.',
  'Как отменить подписку?':
    'Hoe zeg ik het abonnement op?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Op elk moment: het loopt de betaalde termijn uit en wordt niet verlengd. Wat voor de lopende termijn betaald is, wordt niet terugbetaald, behalve waar de wet terugbetaling eist.',
  'Я потерял ключ: что делать?':
    'Ik ben mijn sleutel kwijt, wat nu?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Herstellen kan niet. We vragen geen e-mail en geen telefoonnummer, dus we hebben niets om mee te controleren of het account van jou is. De sleutel is het account; bewaar hem waar je hem niet kwijtraakt.',
  'Можно ли передать ключ другому?':
    'Mag ik mijn sleutel aan iemand geven?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Dat mag, maar alles wat ermee gedaan wordt, geldt als door jou gedaan.',
  'Кубы и группы':
    'Kubussen en groepen',
  'Что такое куб?':
    'Wat is een kubus?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Een kubus is een aparte wereld binnen het platform: een eigen naam, omslag, chat, stroom, privékamers en levensduur. Kubussen zie je op de kaart en je kunt erbij komen.',
  'Как создать куб?':
    'Hoe maak ik een kubus?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Met de «+» in de wereld of in Mijn universum. Je stelt naam, omslag, soort en levensduur in. Mensen nodig je uit met een link of met de sleutel van de kubus.',
  'Что такое таймер жизни куба?':
    'Wat is de levenstimer van de kubus?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Een kubus leeft de ingestelde tijd en sluit daarna. De termijn kies je bij het maken, van een uur tot een jaar.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Wat zijn groepen?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Openbare gemeenschappen: een gedeelde chat, een stroom van gebeurtenissen en een ledenlijst.',
  'Как найти куб или человека?':
    'Hoe vind ik een kubus of een persoon?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Schrijf het hier: «zoek de kubus Art», «@anna», «fotogroep». Ik zoek op het platform en laat kaarten zien: kubussen, mensen, groepen en uitzendingen die nu bezig zijn.',
  'Лента и посты':
    'Stroom en berichten',
  'Как выложить пост?':
    'Hoe plaats ik een bericht?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Met de maakknop in de stroom. Een video, een afbeelding, een titel en een beschrijving mogen.',
  'Почему пост не опубликовался?':
    'Waarom is mijn bericht niet geplaatst?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'De tekst kwam niet door de controle vóór plaatsing. Het bericht noemt de reden: verboden waar, fraude, bedreigingen enzovoort. De regels staan in Documenten, en als het een vergissing is, schrijf dan naar support.',
  'Что дают реакции?':
    'Wat leveren likes op?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Een reactie onder een bericht levert de maker CUBE op. Per dag kun je tot 500 likes geven.',
  'Как пожаловаться на пост?':
    'Hoe meld ik een bericht?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Onder elk bericht en elke boodschap zit een meldknop. Een melding gaat naar een mens.',
  'Сколько просмотров нужно для начисления?':
    'Hoeveel weergaven zijn nodig voor een beloning?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Vanaf 10 duizend echte vertoningen: eigen berichten en reacties beginnen vanaf die grens CUBE op te leveren.',
  'Игра с кубами':
    'Het kubusspel',
  'Как играть кубами?':
    'Hoe speel ik met de kubussen?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'De spelknop staat op de kaart. De kubussen vliegen binnen muren en kunnen er niet uit. Acties druk je met een knop, laat je met je hand voor de camera zien, of zeg je hardop.',
  'Что такое режимы и толчки?':
    'Wat zijn standen en zetten?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Zetten zijn explosie, worpen, opgooien, vuurwerk en chaos: ze gaan één keer en werken boven alles. Standen blijven tot je ze uitzet en stapelen: zwaartekracht (laten vallen OF gewichtloos), magneet, wervel, bevriezen.',
  'Как работают жесты рукой?':
    'Hoe werken handgebaren?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Een beweging opzij is een worp, omhoog is opgooien, omlaag is laten vallen, handpalm naar voren is de explosie, een cirkel is de wervel, twee handen is de chaos. De beelden worden op je eigen apparaat verwerkt en gaan nergens heen.',
  'Какие есть формы?':
    'Welke vormen zijn er?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kubus, kristal, driehoek, octaëder, bol, piramide, prisma, ster, icosaëder, ring, dollar, euro, yuan, en je eigen plaatje. Plus «door elkaar», waarbij elk voorwerp zijn eigen vorm heeft.',
  'Как поставить свою картинку?':
    'Hoe zet ik mijn eigen plaatje?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'In het spel → Vorm van het voorwerp → het vak «Mijne». Een vierkante werkt het best; een staande 9:16 wordt vanuit het midden bijgesneden. Tik nog eens op «Mijne» om hem te vervangen.',
  'Можно ли поставить видео?':
    'Kan er een video in?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Ja, tot 15 seconden. Langer wordt geweigerd. De video overleeft het herladen van de pagina.',
  'Кто такие персонажи?':
    'Wie zijn de figuren?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Acht figuren: een kat, een buur, een hond, een robot, een spook, een panda, een kikker, een alien. Je kunt ze aaien, kietelen en door elkaar schudden, en ze antwoorden met stem en beweging.',
  'Как добавить своё действие?':
    'Hoe voeg ik een eigen actie toe?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Met een knop in het onderdeel figuren: een naam, een commando, een beschrijving en waarmee, met hand, voet, hoofd of het hele lichaam. De actie zelf kies je uit zestien kant-en-klare effecten.',
  'Как крутятся предметы?':
    'Hoe draaien de voorwerpen?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Vijf standen: met de as mee, tegen de as in, over de kop, onderlangs, en alle kanten op. De draai van een worp komt bovenop de gekozen stand.',
  'Как начать эфир?':
    'Hoe begin ik een uitzending?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'De knop Uitzending in de stroom, of de spraakopdracht «uitzending». Je kiest een titel en een stand, en je bent in de lucht. De kijkers krijgen het beeld rechtstreeks van jou.',
  'Какие режимы эфира?':
    'Welke uitzendstanden zijn er?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Camera en kubussen: de scène boven het camerabeeld, met werkende gebaren. Alleen kubussen: de scène zonder camera. Schone uitzending: alleen de camera, zonder reacties, likes en cadeaus.',
  'Сколько зрителей выдержит эфир?':
    'Hoeveel kijkers houdt een uitzending?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Het beeld gaat rechtstreeks van de maker naar elke kijker, dus het hangt af van de verbinding van de maker: op een thuislijn kijken tien tot vijftien mensen comfortabel mee. Een grotere zaal heeft een doorgeefserver nodig.',
  'Что такое подарки?':
    'Wat zijn cadeaus?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Dertig cadeaus, van een Roos voor 1 CUBE tot een Legendekubus voor 1000. Een cadeau is een overboeking van CUBE naar de maker in zijn geheel; het platform houdt niets in.',
  'Как закончить эфир?':
    'Hoe beëindig ik een uitzending?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'De knop Uitzending beëindigen in de kopbalk van het venster, zichtbaar in elke stand. Het venster met het kruisje sluiten stopt de uitzending niet: die loopt door tot je op Beëindigen drukt.',
  'Голос и языки':
    'Stem en talen',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Welke spraakopdrachten zijn er?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Meer dan negentig: onderdelen, vensters, maken, de stroom, het spel, de vormen, de figuren, de besturing. De volledige lijst met zoekveld staat op de pagina Spraakopdrachten: accountmenu → Spraakopdrachten, of in Vormgeving, of zeg gewoon «spraakopdrachten».',
  'На каких языках работает голос?':
    'In welke talen werkt de stem?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'In twintig: Russisch, Engels (ook dat van India), Oekraïens, Duits, Frans (en dat van Canada), Spaans (en dat van Latijns-Amerika), Italiaans, Portugees, Pools, Turks, Arabisch (en dat van de Golf), Vietnamees, Chinees, Japans, Koreaans, Hindi. De taal kies je op de opdrachtenpagina en in Vormgeving.',
  'Как включить микрофон?':
    'Hoe zet ik de microfoon aan?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'De microfoonknop zit in de bovenbalk. Druk erop en hij luistert, druk nog eens en hij stopt.',
  'Как выключить озвучку?':
    'Hoe zet ik de gesproken antwoorden uit?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Op de pagina Spraakopdrachten staat een schakelaar tussen hardop antwoorden en stil antwoorden. De stem luistert hoe dan ook; alleen het antwoord verschilt.',
  'Куда уходит мой голос?':
    'Waar gaat mijn stem heen?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'De herkenning doet de browser zelf. Chrome en de browsers die erop gebouwd zijn sturen het geluid naar de servers van Google; zo is hun herkenning gemaakt en het platform beslist daar niets over. Bevalt dat niet, zet de microfoon dan niet aan: alles zit ook op knoppen.',
  'Как поменять тему?':
    'Hoe verander ik het thema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Vormgeving → Thema: donker, licht, of Camera, waarbij het beeld van je camera de achtergrond is.',
  'Что такое Цвет 1, 2 и 3?':
    'Wat zijn Kleur 1, 2 en 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Kleur 1 zijn de kopbalken, de invoerbalken en de tabbladen. Kleur 2 is het venster zelf: de achtergrond van de chat en de reactielijst. Kleur 3 zijn de omslag en de lijst van het portfolio. Elk heeft zijn eigen schuif voor doorzichtigheid.',
  'Как поставить обои?':
    'Hoe stel ik een achtergrond in?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Vormgeving → Achtergrond: een set kant-en-klare achtergronden of je eigen plaatje in 9:16. Kleur 2 ligt als tint over de achtergrond, en de schuif bepaalt hoe sterk.',
  'Правила и безопасность':
    'Regels en veiligheid',
  'Что нельзя выкладывать?':
    'Wat mag niet geplaatst worden?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Materiaal met kinderen, bedreigingen en oproepen tot geweld, aanzetten tot haat, fraude, verboden waar, andermans werk zonder er recht op te hebben, je voordoen als iemand anders, spam en nagebootste activiteit. Volledig in de Gedragsregels.',
  'Как работает модерация?':
    'Hoe werkt de moderatie?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Berichten, reacties, groepsberichten, namen en beschrijvingen worden op de server gecontroleerd vóór plaatsing. Wat duidelijk verboden is wordt niet geplaatst, twijfelgevallen gaan naar een mens. De marktplaats en privégesprekken worden niet gecontroleerd.',
  'Виден ли мой IP?':
    'Is mijn IP zichtbaar?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Ja, de server ziet het, net als elke site op internet: zonder IP zou hij niet weten waar het antwoord heen moet. De verborgen stand verbergt naam en foto voor andere mensen, maar niet voor de server.',
  'Что вы храните обо мне?':
    'Wat bewaren jullie over mij?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'De accountsleutel, het profiel dat je zelf hebt ingevuld, je inhoud, de dagtellers en technische verbindingsgegevens. Geen e-mail, geen telefoonnummer, geen wachtwoorden en geen walletsleutels.',
  'Куда жаловаться?':
    'Waar klaag ik?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Over een stuk inhoud met de meldknop eronder. Over al het andere via support binnen het platform.',
  'Где документы?':
    'Waar staan de documenten?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Accountmenu → Documenten. Het zijn er zeven: de voorwaarden, de privacyverklaring, de gedragsregels, beloningen en limieten, swap en betalingen, abonnement en sleutels, camera en microfoon.',
  'Что такое карта?':
    'Wat is de kaart?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'De kaart van het platform: 177 landen en 1150 steden met echte coördinaten, de stand van de zon berekend voor de huidige tijd, de nachtzijde en de dageraad precies waar ze aan de hemel staan. Twintig aanzichten: vanuit de ruimte, de aarde bij nacht, dag en nacht, de straten van OpenStreetMap, weer, aardbevingen, tijdzones, onze kubussen en uitzendingen. Hij opent vanuit het accountmenu of met het woord «kaart».',
  'Как проложить маршрут на карте?':
    'Hoe teken ik een route op de kaart?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Tik het begin op de kaart aan, dan het eind, en kies een van de twintig wegen. De grootcirkel en de loxodroom, zoals er echt gevlogen en gevaren wordt. Alleen over land en alleen over water, een echte zoektocht over de continenten zonder één stap in het andere element. Door de schaduw en door het licht, de nachtzijde volgend. Langs kubussen, uitzendingen en mensen, via onze spelden. De straatroute rekent de externe motor OSRM; antwoordt die niet, dan zeggen we dat.',
  'Видно ли меня на карте?':
    'Ben ik zichtbaar op de kaart?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Alleen als je zelf de speld «ik ben hier» hebt gezet. Die leeft een half uur en wist zichzelf, de coördinaten worden op een kilometer afgerond nog vóór ze naar de server gaan, en «haal me van de kaart» wist het record in plaats van het te verbergen. Zonder die speld sta je helemaal niet op de kaart.',
  'Есть ли на карте спутник и пробки?':
    'Heeft de kaart satellietbeelden en verkeer?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nee. Satellietbeelden en verkeer leveren betaalde aanbieders met een sleutel. De plek voor die lagen is klaar: een sleutel invullen en ze gaan aan. Zolang er geen sleutel is, zegt de kaart dat eerlijk in plaats van een mooie leugen te tekenen.',
  'Что такое забег по улице?':
    'Wat is de straatrun?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Een sprong de kaart in: beeld in de eerste persoon, de echte gebouwen en bochten van je eigen straat. Je rent zelf: veeg opzij om van baan te wisselen, en bij een kruising om af te slaan, omhoog om te springen, omlaag om te glijden. Je verzamelt kubussen en ontwijkt hekken en stralen. Onderweg kom je uitzendingen, kubussen en etalages van anderen tegen. Er is ook een rustige wandeling met een joystick. Hij opent vanuit het accountmenu, vanaf de kaart met de knop Naar de straat, of met het woord «run».',
  'Откуда берутся дома в забеге?':
    'Waar komen de gebouwen in de run vandaan?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Van OpenStreetMap: echte contouren en verdiepingsaantallen, echte wegen met hun breedtes en bochten. We rekenen een verdieping als drie meter; ontbreekt het aantal verdiepingen, dan komt de hoogte uit de voetafdruk van het gebouw. Straatfoto\'s zijn er niet, die leveren betaalde aanbieders. Is de kaartserver bezet, dan zegt het spel dat eerlijk en bouwt het een eigen buurt.',
  'Что такое шопинг в маркетплейсе?':
    'Wat is shoppen in de marktplaats?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Het tweede onderdeel van de marktplaats, voor dingen in plaats van bestanden: zestien categorieën van kleding tot kunst, een kaart met het merk, maten, kleuren, kenmerken en tot twintig foto\'s. Op elke kaart draait een figuur met de merknaam erop, een van de twintig vormen. Het onderdeel raakt geen geld aan: betaling en bezorging zijn tussen mensen, daarom staat er «schrijf de verkoper» en niet «koop met CUBE».',
  'Игры, чаты и новое':
    'Spellen, chats en nieuws',
  'Сколько игр в зале?':
    'Hoeveel spellen staan er in de hal?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Acht, en ze zijn allemaal te spelen: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Ze gaan met de vinger en met het toetsenbord.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Geven de spellen CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nee. De spellen geven punten en een persoonlijk record, bewaard in je browser. CUBE schrijft de server bij voor weergaven en uit de gezamenlijke pot; munten slaan in een browser zou een leugen zijn.',
  'Как играть в DataMine?':
    'Hoe speel je DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Een veld van acht bij acht. Je tikt een vakje aan en graaft de gegevens op; het cijfer laat zien hoeveel virussen ernaast liggen. Lang drukken zet een vlag. Drie levens, dan een nieuwe laag.',
  'Как играть в CipherBreak?':
    'Hoe speel je CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Raad een code van vier tekens. Na een poging betekent een gevulde cirkel dat het teken op de goede plek staat, een lege dat het in de code zit maar elders. Acht pogingen.',
  'Как играть в Phantom Escape?':
    'Hoe speel je Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Verzamel vijf sleutels en ga door de deur naar buiten. De spoken volgen je langs de kortste weg, en op elke verdieping zijn het er meer.',
  'Как играть в Block Trade?':
    'Hoe speel je Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Anderhalve minuut, met 1000 in handen. Koop goedkoper, verkoop duurder. Je score is alles boven de duizend.',
  'Как играть в TrustChain?':
    'Hoe speel je TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Tik de blokken in oplopende volgorde aan terwijl de klok loopt. Eén fout en de keten breekt. Elke ronde wordt de keten langer.',
  'Как играть в CubeBuilder?':
    'Hoe speel je CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'De plaat schuift opzij en een tik laat hem vallen. Wat uitsteekt valt eraf, en de plaat wordt smaller. Mis je de toren, dan is het voorbij.',
  'Что показывает строка курсов?':
    'Wat laat de koersbalk zien?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Dertig munten met hun prijs en de verandering van de dag. De gegevens komen via onze server, die een halve minuut bewaart. De balk kruipt niet: op het scherm past een heel aantal vakjes en ze wisselen om de paar seconden.',
  'Что значит число кубов в шапке?':
    'Wat betekent het aantal kubussen in de kopbalk?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Hoeveel kubussen er nu in jouw wereld zijn, die je voor je ziet. Niet het totale aantal kubussen op het platform.',
  'Можно ли войти вторым аккаунтом?':
    'Kan ik met een tweede account inloggen?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Ja. Accountmenu → Account toevoegen: de huidige sleutel blijft in de lijst, en je keert er met één tik vanuit hetzelfde menu naar terug. Er worden er tot acht onthouden.',
  'Зачем «Сохранить» в окне игры?':
    'Waarvoor is Opslaan in het spelvenster?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Het onthoudt de vorm van het voorwerp, de figuur, de gebaren en de grootte. De volgende keer staat alles waar je het liet.',
  'Чем режим отличается от толчка?':
    'Waarin verschilt een stand van een zet?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Een stand blijft tot je hem met een tweede tik uitzet, en blijft oplichten. Een zet gaat één keer en licht niet op; hij houdt alleen een dun teken dat hij als laatste werd gedrukt.',
  'Почему кубы больше не исчезают?':
    'Waarom verdwijnen de kubussen niet meer?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'De voorbeeldkubussen in de etalage leefden kort, vijf en vijftien minuten. Nu krijgen ze minstens een halve dag en worden ze opnieuw gestart voordat ze aflopen. Echte kubussen leven precies zolang als ze bij het maken kregen.',
  'Как сделать фото прямо в чат?':
    'Hoe maak ik een foto rechtstreeks in een gesprek?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'De paperclip → Camera opent onze eigen opname. Een tik maakt een foto, lang drukken neemt video op tot een minuut. De galerij is het punt ernaast, Foto of video.',
  'Что такое галерея переписки?':
    'Wat is de galerij van een gesprek?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Het vergrootglas in de kopbalk van een gesprek opent het zoeken en daarboven een plank: foto\'s, video\'s, audio en links uit dat gesprek. Die wordt uit de berichten zelf verzameld en niets gaat ergens heen.',
  'Как удалить сразу несколько сообщений?':
    'Hoe verwijder ik meerdere berichten tegelijk?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Lang drukken op een bericht zet de selectie aan, daarna vink je aan wat je wilt en druk je op Verwijderen in de onderbalk. Tot honderd tegelijk.',
  'Можно ли изменить своё сообщение?':
    'Kan ik mijn eigen bericht aanpassen?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Ja, je eigen en alleen tekstberichten: berichtmenu → Bewerken. Ernaast verschijnt het teken «bewerkt». Het gesprek sluit daarbij niet.',
  'Что такое сторис?':
    'Wat zijn verhalen?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Korte berichten die een dag meegaan, boven de lijst met gesprekken: een foto of een video tot een minuut. Je bekijkt ze na elkaar en na een dag verdwijnen ze vanzelf.',
  'Сколько фото можно в группу?':
    'Hoeveel foto\'s passen in een groep?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Tot zeven foto\'s, of één video tot een minuut. Plus een pictogram uit de set en labels onder de beschrijving.',
  'Что такое теги группы?':
    'Wat zijn groepslabels?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Een paar woorden door komma\'s gescheiden, waarmee de groep in het zoeken gevonden wordt.',
  'Видно ли участников группы?':
    'Zijn de groepsleden zichtbaar?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Dat beslist de eigenaar bij het maken: de ledenlijst kan aan iedereen getoond worden of alleen voor de eigenaar zichtbaar blijven.',
  'Почему поле ссылки на видео убрали?':
    'Waarom is het veld met de videolink weggehaald?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Een link van elders brak als hij aan de andere kant verwijderd werd, en het platform kon daar niet voor instaan. Een video wordt als bestand naar onze eigen opslag geladen.',
  'Сколько длится видео в посте?':
    'Hoe lang mag een video in een bericht zijn?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Voorlopig een bestand tot 50 MB. Op een grotere server komen er trappen: 15 seconden, een minuut, drie minuten en vijftien.',
  'Что делает кнопка «Чаевые автору»?':
    'Wat doet de knop Fooi voor de maker?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Die maakt CUBE van jouw saldo in zijn geheel over naar de maker van het bericht, zonder deel voor het platform. Het bedrag is 1, 5, 10, 25 of je eigen.',
  'Как пожаловаться на видео?':
    'Hoe meld ik een video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'De drie puntjes onder de video → Melden: je kiest een reden en kunt er eigen woorden bij zetten. Het gaat naar een mens.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Hoe deel ik een bericht?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'De drie puntjes onder de video → Delen. Je krijgt een link die je naar iedereen kunt sturen.',
  'Куда девается «Сохранить»?':
    'Waar legt Bewaren de dingen neer?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'In je profiel, op de plank met bewaarde dingen, onder het bladwijzerpictogram onder de profieltabs.',
  'Что видно в моём профиле?':
    'Wat is er in mijn profiel te zien?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Twee tabbladen: Shorts voor je korte video\'s, Berichten voor al het andere. Een kaart aantikken opent hem net als in de stroom. Bewerken en verwijderen ziet alleen de maker.',
  'Как изменить профиль?':
    'Hoe bewerk ik mijn profiel?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'De potloodknop in je eigen profiel: naam, @naam, beschrijving, soort account, status, links en adres.',
  'Чем бизнес-аккаунт отличается?':
    'Waarin verschilt een zakelijk account?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Openbaar betekent dat iedereen je ziet. Verborgen betekent dat naam en foto voor andere mensen verborgen zijn. Zakelijk voegt een beschrijving van je werk, links en een adres toe.',
  'Что показывает «онлайн» в шапке?':
    'Wat laat «online» in de kopbalk zien?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Hoeveel mensen er volgens de server nu op het platform zijn. Het wordt elke halve minuut ververst.',
  'Закрывается ли игра вместе с эфиром?':
    'Sluit het spel samen met de uitzending?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Ja. Had de uitzending kubussen, dan gaat het spel vanzelf uit als de uitzending eindigt; anders bleven de voorwerpen boven een lege kaart vliegen.',
  'Есть ли смайлы в эфире?':
    'Zijn er emoji in een uitzending?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Ja, de emoji-knop naast de invoerbalk heeft de hele gedeelde verzameling, dezelfde als in de gesprekken.',
  'Что такое «Все вопросы»?':
    'Wat is Alle vragen?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Het volledige handboek van de helper: meer dan honderd vragen met antwoorden, geordend per onderdeel, met zoeken op titel.',
  'Куда делась кнопка NET?':
    'Waar is de NET-knop gebleven?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Die is weggehaald. Het platform zoekt niet op het grote internet, en de knop beloofde van wel. De helper antwoordt over het platform en vindt kubussen, mensen, groepen en uitzendingen.',
  'Почему звук повторялся дважды?':
    'Waarom kwam het geluid twee keer?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Er spraken twee verschillende stukken code en geen van beide brak de ander af. Nu annuleert elke zin de vorige, en dezelfde tekst wordt niet twee keer achter elkaar herhaald.',
  'Как выключить голос совсем?':
    'Hoe zet ik de stem helemaal uit?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Op de pagina Spraakopdrachten staat een schakelaar tussen hardop antwoorden en stil antwoorden. Nu zet die hem echt uit: eerder heerste hij maar over één ingang en de stem ging eromheen.',
  'Что хранится только в моём браузере?':
    'Wat wordt alleen in mijn browser bewaard?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'De spelrecords, de instellingen van het kubusspel, de gekozen taal, het thema en de achtergrond, en de lijst van je eigen accounts. Niets daarvan gaat naar de server.',
  'Почему просят подтвердить удаление?':
    'Waarom wordt me gevraagd een verwijdering te bevestigen?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Omdat die niet ongedaan te maken is. In gesprekken wordt er bovendien gevraagd welke kopie weg moet, alleen die van jou of die van iedereen.',
  'Что такое «У всех» при удалении?':
    'Wat betekent «Voor iedereen» bij verwijderen?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Voor mij» verbergt het bericht van je eigen scherm. «Voor iedereen» vraagt de server het ook bij de ander weg te halen.',
  'Сколько живёт сообщение с таймером?':
    'Hoe lang leeft een bericht met een termijn?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Zolang je hebt gekozen: vijf minuten, een uur, een dag, een week of voor altijd. De knop ∞ naast de invoerbalk.',
  'Как переслать сообщение?':
    'Hoe stuur ik een bericht door?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Berichtmenu → Doorsturen. Je kiest naar wie.',
  'Что делает «В избранное»?':
    'Wat doet Opslaan in favorieten?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Het legt het bericht in Bewaard, je eigen schrift met notities en bewaarde dingen.',
  'Как найти сообщение в переписке?':
    'Hoe vind ik een bericht in een gesprek?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Het vergrootglas in de kopbalk van het gesprek: het zoekt in de tekst en de pijlen springen tussen de treffers. De plank met foto\'s, video\'s, audio en links zit op dezelfde plek.',
  'Что такое «Пригласить в группу»?':
    'Wat is Uitnodigen voor de groep?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Een link uit de groepsinformatie: wie hem opent, komt bij de groep.',
  'Можно ли выйти из группы?':
    'Kan ik een groep verlaten?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Ja, met een knop in de groepsinformatie. Verlaat de eigenaar de groep, dan wordt de groep zelf niet verwijderd.',
  'Сколько форм у предметов?':
    'Hoeveel vormen hebben de voorwerpen?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Twintig, plus je eigen plaatje of video erbovenop, en de stand door elkaar.',
  'Что такое шопинг?':
    'Wat is shoppen?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Het tweede onderdeel van de marktplaats, voor dingen: zestien categorieën, een kaart met het merk en tot twintig foto\'s, en een draaiende figuur met de merknaam. Betaling en bezorging zijn tussen mensen.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Vraag het in woorden: bijvoorbeeld «hoe verdien ik» of «zoek de kubus Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Waarnaar moet ik zoeken? Schrijf iets als «zoek de kubus Art» of «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Over «{что}» heb ik geen antwoord. Wat ik ken is het platform: CUBE en beloningen, limieten, de swap, de wallet, sleutels, signalen, kubussen en groepen, het kubusspel, uitzendingen, de vormgeving en de spraakopdrachten.'

});
