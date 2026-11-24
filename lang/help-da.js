/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-da.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('da', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Opslag, videoer og runde klip. Herfra åbnes både kommentarerne og reaktionerne.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Personlige samtaler, talebeskeder og runde videoer, det gemte.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Offentlige fællesskaber: fælles chat, strøm af begivenheder, medlemmer.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Handelssignaler: retning, indgang, mål og stop. Prisen følger serveren selv.',
  'Объявления и обмен между людьми.':
    'Annoncer og bytte mellem mennesker.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Satserne for belønninger, swappen og alt, der giver CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Din saldo i CUBE, indbetalinger, udbetalinger og historik.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Hvad der sker med dine kuber og opslag, i tal.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE er platformens interne valuta. Serveren tilskriver den en gang om dagen for aktivitet: en aktiv dag, egne opslag og kommentarer, dem du har inviteret. Inde i swappen er prisen på CUBE fast: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Serveren gør belønningerne op en gang om dagen. Det, der tæller: en aktiv dag online, egne opslag og kommentarer fra 10 tusind visninger, inviterede, der har betalt for abonnement, og bonusser for en uge, en måned og et år i træk. De præcise satser er altid friske i afsnittet Tjen.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'For at intet skal kunne pustes op med snyd holder serveren daglige grænser: 20 nye chats, 500 likes, 50 kommentarer, 500 følgninger. Visninger kan slet ikke pustes op, de tæller kun fra ægte visninger. Hvor meget der er tilbage i dag, kan du se i Tjen.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swappen veksler krypto til CUBE og tilbage: 16 valutaer og deres netværk, kursen tages i det øjeblik, anmodningen laves, CUBE regnes til $0.50. Indbetalinger og udbetalinger går gennem en betalingsudbyder; børsnøgler eller tegnebogsnøgler tager vi ikke imod og gemmer ikke. Kun det, du har tjent, kan tages ud, ikke det, der er givet i gave.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Tegnebogen viser saldoen i CUBE, historikken og knapperne til indbetaling og udbetaling. Indbetaling og udbetaling sker gennem swappen.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Nøglen åbner muligheder: Free er grundlaget, Silver er udvidet, Gold giver flere kuber og statistik. Nøgler købes med CUBE. Premium-abonnementet giver en andel af belønningspuljen efter dit bidrag i måneden.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Et signal er retning, indgangspunkt, mål og stop. Serveren følger prisen selv og lukker signalet ved målet eller ved stoppet. Børsnøgler beder vi ikke om: du handler selv, med dit eget.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'En reaktion under et opslag giver forfatteren CUBE. Om dagen kan der gives op til 500 likes, længere end det tæller serveren dem simpelt hen ikke.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'En kube er dit eget rum: chat, strøm, private rum og en livstimer. Den laves med «+» i verdenen. Folk inviterer du med et link eller med kubens nøgle.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'En kube er en egen verden inde i platformen: eget navn, forside, chat, strøm og levetid. Kuber er synlige på kortet, du kan gå mellem dem og gå ind i dem.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Grupper er offentlige fællesskaber: fælles chat, strøm af begivenheder og en liste over medlemmer. Din egen kan du lave i afsnittet Grupper.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Spillet med kuberne åbnes med en knap på kortet. Handlingerne deles i stød (sprængning, kast, opkast, fyrværkeri, kaos) og tilstande (fald eller vægtløshed, det ene eller det andet, magnet, hvirvel, frysning). Tilstande lægges sammen og holder, indtil du slukker dem. Alt det virker med knap, med gestus foran kameraet og med stemmen.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'I spillet kan du tænde gestusserne: en bevægelse til siden er et kast, opad et opkast, nedad et fald, håndfladen frem en sprængning, en cirkel en hvirvel, og begge hænder kaos. Billedet fra kameraet går ingen steder, alt regnes ud på din egen enhed.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Genstandene er ikke kun kuber: krystal, trekant, oktaeder, kugle, pyramide, prisme, stjerne, ikosaeder, ring, dollar, euro, yuan. Du kan lægge dit eget billede eller din egen video på op til 15 sekunder ind; en lodret 9:16 beskæres fra midten til et kvadrat.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'I spillet er der otte figurer: kat, nabo, hund, robot, spøgelse, panda, frø og rumvæsen. Du kan klappe dem, kilde dem og ryste dem, og de svarer med stemme og bevægelse. Din egen handling tilføjer du med en knap: navn, kommando, beskrivelse og hvad den gøres med — hånden, foden, hovedet eller hele kroppen.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Udseendet ændrer vinduernes farve og gennemsigtighed: Farve 1 er titlerne og linjerne, Farve 2 er selve vinduet, Farve 3 er forsiden og rammen i profilen. Baggrundene til chatterne vælges på samme sted, egne lægges ind i 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Med stemmen virker næsten alt: afsnittene, spillet, formerne, figurerne, over halvfems kommandoer. Hele listen på alle tyve sprog er på siden Stemmekommandoer: den åbnes fra Udseende eller ved at sige «stemmekommandoer». Omskifteren mellem svar højt og svar stille er der også.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Dokumenterne åbnes fra kontomenuen → Dokumenter. De er syv: vilkårene, privatlivspolitikken, fællesskabets regler, belønninger og grænser, swap og betalinger, abonnement og nøgler, kamera og mikrofon. Det går med stemmen også, sig «dokumenter».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Invitationer giver CUBE, når den inviterede betaler for abonnement. Dit eget link er i afsnittet for invitationer.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Profilen er dit udstillingsvindue: forside, beskrivelse og arbejder. Udseendet af forsiden og rammen ændres med Farve 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Statistikken viser, hvad der sker med dine kuber og opslag: visninger, reaktioner, strømmen af mennesker.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'I profilen kan du skjule navn og billede, i stedet kommer et anonymt nummer. Men det skjuler dig for andre mennesker, ikke for serveren: IP-adressen på en forbindelse ser hvert websted på internettet, og vores også. Noget, der skjuler IP-adressen, findes ikke i appen.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Markedet er annoncer og bytte mellem mennesker.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Opslag, kommentarer, annoncer, navne og beskrivelser bliver tjekket. Det, der er klart forbudt, bliver ikke udgivet, det tvivlsomme går til et menneske. Markedet rører det tjek ikke.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Hej. Jeg er platformens hjælper: jeg svarer om kuber, belønninger, tegnebogen, spillet og indstillingerne, og jeg finder også kuber, mennesker og grupper. Spørg mig med ord, for eksempel «hvordan tjener jeg», «find kuben Art», «hvem er @anna». For resten af verden er der NET-fanen ved siden af.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE og penge',
  'Что такое CUBE?':
    'Hvad er CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE er platformens interne point. Serveren tilskriver dem en gang om dagen for aktivitet. Inde i swappen er prisen fast: 1 CUBE = $0.50. Det er ikke et værdipapir og ikke et løfte om indtægt.',
  'Как заработать?':
    'Hvordan tjener jeg?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Serveren tæller og gør dagen op en gang per 24 timer: en aktiv dag online, egne opslag og kommentarer fra 10 tusind visninger, reaktioner under dine opslag, inviterede, der har betalt for abonnement, og bonusser for en uge, en måned og et år i træk. De præcise satser er i Tjen.',
  'Какие лимиты в сутки?':
    'Hvilke daglige grænser er der?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 nye chats, 500 likes, 50 kommentarer, 500 følgninger. Visninger kan slet ikke pustes op. Tællingen går på UTC-døgn; når du grænsen, tæller handlingen simpelt hen ikke, og nogen straf for det findes ikke.',
  'Что считается накруткой?':
    'Hvad regnes som snyd?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Bunker af konti, automatiske likes og følgninger, købte visninger, aftaler om gensidige reaktioner. Belønninger, der er fået på den måde, bliver taget tilbage.',
  'Как работает свайп?':
    'Hvordan virker swappen?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swappen veksler krypto til CUBE og tilbage: 16 valutaer og deres netværk. Kryptokursen tages i det øjeblik, anmodningen laves, CUBE regnes til $0.50. Indbetalinger og udbetalinger går gennem en betalingsudbyder.',
  'Как пополнить кошелёк?':
    'Hvordan fylder jeg tegnebogen op?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Gennem swappen: du laver en anmodning, får en adresse og et beløb og sender overførslen fra din egen tegnebog. Det er vigtigt, at valutaen og netværket passer med anmodningen, ellers kan overførslen ikke hentes tilbage.',
  'Как вывести деньги?':
    'Hvordan hæver jeg penge?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Der laves en udbetalingsanmodning til din adresse, og netværksgebyret betales af modtageren. Vi tjekker og sender i hånden, oftest i løbet af en arbejdsdag.',
  'Почему вывести можно не всё?':
    'Hvorfor kan jeg ikke hæve alt?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Kun det, du har tjent, kan tages ud. CUBE, der er tilskrevet som gave eller bonus, kan bruges inde i platformen men ikke tages ud; ellers havde det været nok at dele gaver ud og veksle dem.',
  'Какие монеты поддерживаются?':
    'Hvilke valutaer understøttes?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 valutaer og deres netværk: BTC, ETH, USDT, USDC, BNB og elleve mere fra toppen efter omsætning. Hele listen med netværkene er i swap-vinduet.',
  'Что если отправил не в ту сеть?':
    'Hvad hvis jeg sendte til det forkerte netværk?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'En overførsel i en blokkæde kan ikke vendes. Skriv til supporten med det samme: nogle gange kan der gøres noget, men det kan ingen love. Derfor skal netværket i anmodningen og i din tegnebog være det samme.',
  'Берёте ли вы ключи от бирж?':
    'Tager I imod børsnøgler?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Nej. Vi beder ikke om og tager ikke imod børsnøgler, seed-fraser eller adgang til din tegnebog. Hvis nogen beder om det på platformens vegne, er det en bedrager.',
  'Платите ли вы налоги за меня?':
    'Betaler I mine skatter?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Nej. Det, du skylder staten, finder du ud af og betaler selv. Vi er ikke nogen skatteagent.',
  'Ключи и подписка':
    'Nøgler og abonnement',
  'Какие бывают ключи?':
    'Hvilke nøgler er der?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free er grundlaget, Silver er udvidet, Gold giver flere kuber og analyse. Nøglen opgraderes med CUBE i nøglebutikken.',
  'Что даёт Premium?':
    'Hvad giver Premium?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'En andel af belønningspuljen efter dit bidrag i måneden, eksterne tegnebøger tilsluttet til visning, statistik og en rangliste, fortrinsret i signalerne, et mærke i profilen og i chatterne, og lukkede Premium-kuber.',
  'Сколько стоит подписка?':
    'Hvad koster abonnementet?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 om måneden eller $59.99 om året.',
  'Как отменить подписку?':
    'Hvordan opsiger jeg abonnementet?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Når som helst: det løber den periode ud, du har betalt for, og fornyes ikke. Det, der er betalt for den igangværende periode, betales ikke tilbage, undtagen hvor loven kræver det.',
  'Я потерял ключ: что делать?':
    'Jeg har mistet min nøgle, hvad gør jeg?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Den kan ikke hentes tilbage. Vi beder hverken om e-mail eller telefonnummer, så vi har ingen måde at bekræfte, at kontoen er din. Nøglen er kontoen; gem den et sted, hvor du ikke mister den.',
  'Можно ли передать ключ другому?':
    'Kan jeg give min nøgle til en anden?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Det kan du, men alt, der gøres med den, regnes som gjort af dig.',
  'Кубы и группы':
    'Kuber og grupper',
  'Что такое куб?':
    'Hvad er en kube?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'En kube er en egen verden inde i platformen: eget navn, forside, chat, strøm, private rum og levetid. Kuber er synlige på kortet, og du kan gå ind i dem.',
  'Как создать куб?':
    'Hvordan laver jeg en kube?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Med «+» i verdenen eller i Mit univers. Du sætter navn, forside, type og levetid. Folk inviterer du med et link eller med kubens nøgle.',
  'Что такое таймер жизни куба?':
    'Hvad er kubens livstimer?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'En kube lever en bestemt tid og lukker så. Tiden vælges, når du laver den, fra en time til et år.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Hvad er grupper?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Offentlige fællesskaber: en fælles chat, en strøm af begivenheder og en liste over medlemmer.',
  'Как найти куб или человека?':
    'Hvordan finder jeg en kube eller en person?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Skriv det her: «find kuben Art», «@anna», «fotogruppe». Jeg søger i platformen og viser kort: kuber, mennesker, grupper og udsendelser, der kører lige nu.',
  'Лента и посты':
    'Strøm og opslag',
  'Как выложить пост?':
    'Hvordan udgiver jeg et opslag?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Med opret-knappen i strømmen. Video, billede, titel og beskrivelse er alle tilladt.',
  'Почему пост не опубликовался?':
    'Hvorfor blev mit opslag ikke udgivet?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Teksten kom ikke gennem tjekket før udgivelse. Beskeden siger grunden: forbudte varer, svindel, trusler og andet. Reglerne er i Dokumenter, og er det en fejl, så skriv til supporten.',
  'Что дают реакции?':
    'Hvad giver reaktionerne?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'En reaktion under et opslag giver forfatteren CUBE. Om dagen kan der gives op til 500 likes.',
  'Как пожаловаться на пост?':
    'Hvordan anmelder jeg et opslag?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Under hvert opslag og hver besked er der en anmeldeknap. En anmeldelse går til et menneske.',
  'Сколько просмотров нужно для начисления?':
    'Hvor mange visninger skal der til for en belønning?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Fra 10 tusind ægte visninger: egne opslag og kommentarer begynder at give CUBE fra den grænse.',
  'Игра с кубами':
    'Spillet med kuberne',
  'Как играть кубами?':
    'Hvordan spiller man med kuberne?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Spilleknappen er på kortet. Kuberne flyver inde i vægge og kan ikke komme ud. Handlingerne trykkes med en knap, vises med hånden foran kameraet eller siges højt.',
  'Что такое режимы и толчки?':
    'Hvad er tilstande og stød?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Stød er sprængning, kast, opkast, fyrværkeri og kaos: de går en gang og virker over alt. Tilstande holder, indtil du slukker dem, og de lægges sammen: tyngdekraft (fald ELLER vægtløshed), magnet, hvirvel, frysning.',
  'Как работают жесты рукой?':
    'Hvordan virker håndgestusserne?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'En bevægelse til siden er et kast, opad et opkast, nedad et fald, håndfladen frem en sprængning, en cirkel en hvirvel, begge hænder kaos. Billederne behandles på din egen enhed og går ingen steder.',
  'Какие есть формы?':
    'Hvilke former er der?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kube, krystal, trekant, oktaeder, kugle, pyramide, prisme, stjerne, ikosaeder, ring, dollar, euro, yuan, og dit eget billede. Plus «blandet», hvor hver genstand har sin egen form.',
  'Как поставить свою картинку?':
    'Hvordan lægger jeg mit eget billede ind?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'I spillet → Genstandens form → feltet «Mit». Kvadratisk er bedst; et lodret 9:16 beskæres fra midten. Tryk på «Mit» igen for at skifte det.',
  'Можно ли поставить видео?':
    'Går det med video?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Det går, op til 15 sekunder. Længere tages ikke imod. Videoen tåler, at siden hentes igen.',
  'Кто такие персонажи?':
    'Hvem er figurerne?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Otte figurer: kat, nabo, hund, robot, spøgelse, panda, frø, rumvæsen. Du kan klappe dem, kilde dem og ryste dem, og de svarer med stemme og bevægelse.',
  'Как добавить своё действие?':
    'Hvordan tilføjer jeg min egen handling?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Med en knap i afsnittet for figurerne: navn, kommando, beskrivelse og hvad den gøres med — hånden, foden, hovedet eller hele kroppen. Selve handlingen vælges blandt seksten færdige effekter.',
  'Как крутятся предметы?':
    'Hvordan roterer genstandene?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Fem tilstande: langs aksen, mod aksen, over toppen, under bunden, og hulter til bulter. Rotationen fra et kast lægges til den valgte tilstand.',
  'Как начать эфир?':
    'Hvordan starter jeg en udsendelse?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Knappen Udsendelse i strømmen eller stemmekommandoen «udsendelse». Du vælger titel og tilstand, og du er i luften. Seerne får billedet direkte fra dig.',
  'Какие режимы эфира?':
    'Hvilke udsendelsestilstande er der?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera og kuber: scenen oven på kamerabilledet, med gestusserne i gang. Kun kuber: scenen uden kamera. Ren udsendelse: kun kameraet, uden kommentarer, reaktioner og gaver.',
  'Сколько зрителей выдержит эфир?':
    'Hvor mange seere kan en udsendelse holde?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Billedet går direkte fra den, der sender, til hver seer, så det afhænger af hans forbindelse: på en hjemmelinje ser ti til femten mennesker uden besvær. En større sal kræver en relæserver.',
  'Что такое подарки?':
    'Hvad er gaverne?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Tredive gaver, fra en Rose for 1 CUBE til en Legendekube for 1000. En gave er en overførsel af CUBE til den, der sender, i sin helhed; platformen tager ingenting.',
  'Как закончить эфир?':
    'Hvordan afslutter jeg en udsendelse?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Knappen Afslut udsendelsen i vinduets titel, synlig i hver tilstand. At lukke vinduet med krydset stopper ikke udsendelsen: den kører, indtil du trykker Afslut.',
  'Голос и языки':
    'Stemme og sprog',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Hvilke stemmekommandoer er der?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Mere end halvfems: afsnit, vinduer, oprettelse, strømmen, spillet, former, figurer, styring. Hele listen med søgning er på siden Stemmekommandoer: kontomenuen → Stemmekommandoer, eller i Udseende, eller sig bare «stemmekommandoer».',
  'На каких языках работает голос?':
    'Hvilke sprog virker stemmen på?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'På tyve: russisk, engelsk (og det indiske), ukrainsk, tysk, fransk (og det canadiske), spansk (og det latinamerikanske), italiensk, portugisisk, polsk, tyrkisk, arabisk (og det fra Golfen), vietnamesisk, kinesisk, japansk, koreansk, hindi. Sproget vælges på kommandosiden og i Udseende.',
  'Как включить микрофон?':
    'Hvordan tænder jeg mikrofonen?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Mikrofonknappen er i den øverste linje. Trykker du på den, lytter den; trykker du igen, stopper den.',
  'Как выключить озвучку?':
    'Hvordan slukker jeg svarene med stemme?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'På siden Stemmekommandoer er der en omskifter mellem svar højt og svar stille. Stemmen lytter i begge tilfælde; kun svaret er forskelligt.',
  'Куда уходит мой голос?':
    'Hvor går min stemme hen?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Genkendelsen laver browseren selv. Chrome og browsere bygget på den sender lyden til Googles servere; sådan er deres genkendelse bygget, og platformen bestemmer ingenting om det. Passer det dig ikke, så tænd ikke mikrofonen: alt findes med knapper også.',
  'Как поменять тему?':
    'Hvordan skifter jeg tema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Udseende → Tema: mørkt, lyst, eller Kamera, hvor billedet fra dit kamera er baggrund.',
  'Что такое Цвет 1, 2 и 3?':
    'Hvad er Farve 1, 2 og 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Farve 1 er titlerne, skrivelinjerne og fanerne. Farve 2 er selve vinduet: chattens baggrund og kommentarlisten. Farve 3 er profilens forside og ramme. Hver af dem har sin egen skyder til gennemsigtighed.',
  'Как поставить обои?':
    'Hvordan lægger jeg en baggrund ind?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Udseende → Baggrund: et færdigt sæt eller dit eget billede i 9:16. Farve 2 lægger sig over baggrunden som en tone, og skyderen bestemmer, hvor stærkt.',
  'Правила и безопасность':
    'Regler og sikkerhed',
  'Что нельзя выкладывать?':
    'Hvad må ikke udgives?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Materiale med børn, trusler og opfordringer til vold, opildning til had, svindel, forbudte varer, andres arbejde uden ret til det, at udgive sig for en anden, spam og foregivet aktivitet. I sin helhed i Fællesskabets regler.',
  'Как работает модерация?':
    'Hvordan virker moderationen?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Opslag, kommentarer, gruppebeskeder, navne og beskrivelser tjekkes på serveren før udgivelse. Det, der er klart forbudt, bliver ikke udgivet, det tvivlsomme går til et menneske. Markedet og de personlige samtaler tjekkes ikke.',
  'Виден ли мой IP?':
    'Er min IP synlig?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Ja, serveren ser den, som hvert websted på internettet: uden IP ville den ikke vide, hvor svaret skal sendes. Den skjulte tilstand skjuler dit navn og billede for andre mennesker, men ikke for serveren.',
  'Что вы храните обо мне?':
    'Hvad gemmer I om mig?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Kontoens nøgle, profilen du selv har udfyldt, dit indhold, de daglige tællere og forbindelsens tekniske data. Hverken e-mail, telefonnummer, adgangskoder eller tegnebogsnøgler.',
  'Куда жаловаться?':
    'Hvor klager jeg?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Om et indhold, med anmeldeknappen under det. Om alt andet, gennem supporten inde i platformen.',
  'Где документы?':
    'Hvor er dokumenterne?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Kontomenuen → Dokumenter. De er syv: vilkårene, privatlivspolitikken, fællesskabets regler, belønninger og grænser, swap og betalinger, abonnement og nøgler, kamera og mikrofon.',
  'Что такое карта?':
    'Hvad er kortet?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Platformens kort: 177 lande og 1150 byer med ægte koordinater, solens position regnet ud for det aktuelle tidspunkt, natsiden og daggryet præcis der, hvor de er på himlen. Tyve visninger: fra rummet, Jorden om natten, dag og nat, OpenStreetMaps gader, vejret, jordskælvene, tidszonerne, vores kuber og udsendelser. Det åbnes fra kontomenuen eller ved at sige «kort».',
  'Как проложить маршрут на карте?':
    'Hvordan tegner jeg en rute på kortet?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Tryk på begyndelsen på kortet, så på slutningen, og vælg en af tyve veje. Storcirklen og loksodromen — sådan som man virkelig flyver og sejler. Kun over land og kun over vand: en ægte vejsøgning gennem kontinenterne uden et enkelt skridt i det andet element. Langs skyggen og langs lyset: langs natsiden. Forbi kuber, udsendelser og mennesker: gennem vores nåle. Ruten langs gaderne regnes ud af den eksterne maskine OSRM; svarer den ikke, siger vi det.',
  'Видно ли меня на карте?':
    'Er jeg synlig på kortet?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Kun hvis du selv har sat nålen «jeg er her». Den lever en halv time og sletter sig selv, koordinaterne rundes af til kilometeren, allerede før de går til serveren, og «fjern mig fra kortet» sletter posten i stedet for at skjule den. Uden den nål er du slet ikke på kortet.',
  'Есть ли на карте спутник и пробки?':
    'Har kortet satellit og trafik?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nej. Satellitbilleder og trafik gives af betalte udbydere med en nøgle. Pladsen til de lag er klar: du sætter en nøgle ind, og de tændes. Så længe der ikke er nogen nøgle, siger kortet det lige ud i stedet for at tegne en smuk løgn.',
  'Что такое забег по улице?':
    'Hvad er gadeløbet?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Et spring inde i kortet: førstepersonsvisning, de ægte huse og sving i din egen gade. Du løber selv: stryg til siden for at skifte vognbane, i et kryds for at dreje, opad for at hoppe, nedad for at glide. Du samler kuber og undgår forhindringer og stråler. På vejen møder du andres udsendelser, kuber og udstillingsvinduer. Der er også en rolig gåtur med joystick. Det åbnes fra kontomenuen, fra kortet med knappen Ud på gaden, eller ved at sige «løb».',
  'Откуда берутся дома в забеге?':
    'Hvor kommer husene i løbet fra?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Fra OpenStreetMap: ægte husformer og antal etager, ægte veje med deres bredde og sving. En etage regner vi som tre meter; mangler antallet af etager, tages højden fra husets grundflade. Gadebilleder findes ikke, dem giver betalte udbydere. Er kortserveren travl, siger spillet det ærligt og bygger vores eget kvarter.',
  'Что такое шопинг в маркетплейсе?':
    'Hvad er shoppingen på markedet?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Markedets andet afsnit, for ting og ikke for filer: seksten kategorier fra tøj til kunst, et kort med mærket, størrelser, farver, egenskaber og op til tyve billeder. På hvert kort roterer en figur med mærkets navn, hvilken som helst af tyve former. Afsnittet rører ikke pengene: betaling og levering sker mellem menneskerne, derfor står der «skriv til sælgeren» og ikke «køb med CUBE».',
  'Игры, чаты и новое':
    'Spil, chats og nyt',
  'Сколько игр в зале?':
    'Hvor mange spil er der i hallen?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Otte, og de kan alle spilles: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. De styres med fingeren og med tastaturet.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Giver spillene CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nej. Spillene giver point og en personlig rekord, som ligger i din browser. CUBE tilskrives af serveren for visninger og fra den fælles pulje; at præge mønter i en browser ville være en løgn.',
  'Как играть в DataMine?':
    'Hvordan spiller man DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Et felt otte gange otte. Du trykker på et felt og graver dataene frem; tallet viser, hvor mange virusser der er ved siden af. Et langt tryk sætter et flag. Tre liv, så et nyt lag.',
  'Как играть в CipherBreak?':
    'Hvordan spiller man CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Gæt en kode på fire tegn. Efter et forsøg betyder en fyldt ring, at tegnet står på sin plads, en tom, at det er i koden men et andet sted. Otte forsøg.',
  'Как играть в Phantom Escape?':
    'Hvordan spiller man Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Saml fem nøgler og gå ud gennem døren. Spøgelserne jager dig ad den korteste vej, og på hver etage er de flere.',
  'Как играть в Block Trade?':
    'Hvordan spiller man Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Halvandet minut, med 1000 i hånden. Køb billigere, sælg dyrere. Dit resultat er alt over tusindet.',
  'Как играть в TrustChain?':
    'Hvordan spiller man TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Tryk på blokkene i stigende rækkefølge, mens uret går. En fejl, og kæden brydes. For hver runde bliver kæden længere.',
  'Как играть в CubeBuilder?':
    'Hvordan spiller man CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Pladen går til siden, og et tryk slipper den. Det, der stikker ud, falder af, og pladen bliver smallere. Rammer du ikke tårnet, er det slut.',
  'Что показывает строка курсов?':
    'Hvad viser kurslinjen?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Tredive valutaer med pris og ændringen for dagen. Dataene kommer gennem vores server, som holder et halvt minut i hukommelsen. Linjen kravler ikke: et helt antal felter går ind på skærmen, og de skiftes med nogle sekunders mellemrum.',
  'Что значит число кубов в шапке?':
    'Hvad betyder antallet af kuber i titlen?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Hvor mange kuber der er i din verden nu, dem du ser foran dig. Ikke det samlede antal kuber i platformen.',
  'Можно ли войти вторым аккаунтом?':
    'Kan jeg logge ind med en anden konto?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Det kan du. Kontomenuen → Tilføj konto: den nuværende nøgle bliver liggende i listen, og du går tilbage til den med et tryk fra samme menu. Op til otte huskes.',
  'Зачем «Сохранить» в окне игры?':
    'Hvad er Gem til i spilvinduet?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Det husker genstandens form, figuren, gestusserne og størrelsen. Næste gang du kommer ind, er alt, hvor du forlod det.',
  'Чем режим отличается от толчка?':
    'Hvordan er en tilstand forskellig fra et stød?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'En tilstand holder, indtil du slukker den med et andet tryk, og den lyser videre. Et stød går en gang og lyser ikke; det efterlader kun et tyndt mærke om, at det blev trykket sidst.',
  'Почему кубы больше не исчезают?':
    'Hvorfor forsvinder kuberne ikke længere?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Udstillingsvinduets visningskuber levede kort, fem og femten minutter. Nu får de mindst et halvt døgn og startes forfra, før de slipper op. Ægte kuber lever præcis så længe, de fik, da de blev lavet.',
  'Как сделать фото прямо в чат?':
    'Hvordan tager jeg et billede direkte i chatten?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Clipsen → Kamera åbner vores eget kamera. Et tryk tager et billede, et langt tryk optager video i op til et minut. Galleriet er punktet ved siden af, Billede eller video.',
  'Что такое галерея переписки?':
    'Hvad er chattens galleri?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Lupen i chattens titel åbner søgningen, og over den en hylde: billeder, videoer, lyd og links fra den chat. Den samles fra beskederne selv, og ingenting går nogen steder.',
  'Как удалить сразу несколько сообщений?':
    'Hvordan sletter jeg flere beskeder på én gang?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Et langt tryk på en besked tænder udvalget, så sætter du flueben ved dem, du vil, og trykker Slet i den nederste linje. Op til hundrede ad gangen.',
  'Можно ли изменить своё сообщение?':
    'Kan jeg rette min egen besked?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Det kan du, dine egne og kun tekstbeskeder: beskedens menu → Rediger. Ved siden af vises mærket «redigeret». Chatten lukkes ikke, mens du gør det.',
  'Что такое сторис?':
    'Hvad er historierne?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Korte opslag, der lever et døgn, over listen med chats: et billede eller en video i op til et minut. De ses én efter én og forsvinder af sig selv efter et døgn.',
  'Сколько фото можно в группу?':
    'Hvor mange billeder er der plads til i en gruppe?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Op til syv billeder, eller én video i op til et minut. Plus et ikon fra sættet og etiketter under beskrivelsen.',
  'Что такое теги группы?':
    'Hvad er gruppens etiketter?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Nogle ord, skilt med kommaer, som gruppen findes med i søgningen.',
  'Видно ли участников группы?':
    'Er gruppens medlemmer synlige?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Ejeren bestemmer, når den laves: medlemslisten kan vises for alle eller blive synlig kun for ejeren.',
  'Почему поле ссылки на видео убрали?':
    'Hvorfor fjernede I feltet til videolink?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Et fremmed link gik i stykker, når det blev slettet i den anden ende, og platformen kunne ikke svare for det. En video lægges op som en fil i vores eget lager.',
  'Сколько длится видео в посте?':
    'Hvor lang kan videoen i et opslag være?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Indtil videre en fil på op til 50 MB. På en større server bliver der trin: 15 sekunder, et minut, tre minutter og femten.',
  'Что делает кнопка «Чаевые автору»?':
    'Hvad gør knappen Drikkepenge til forfatteren?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Den overfører CUBE fra din saldo til opslagets forfatter i sin helhed, uden andel til platformen. Beløbet er 1, 5, 10, 25 eller dit eget.',
  'Как пожаловаться на видео?':
    'Hvordan anmelder jeg en video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'De tre punkter under videoen → Anmeld: du vælger en grund og kan tilføje dine egne ord. Det går til et levende menneske.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Hvordan deler jeg et opslag?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'De tre punkter under videoen → Del. Du får et link, du kan sende til hvem du vil.',
  'Куда девается «Сохранить»?':
    'Hvor lægger Gem tingene?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'I din profil, på hylden med det gemte, under bogmærkeikonet under profilens faner.',
  'Что видно в моём профиле?':
    'Hvad er synligt i min profil?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'To faner: Shorts til de korte videoer, Opslag til alt andet. Et tryk på et kort åbner det præcis som i strømmen. Rediger og slet ser kun forfatteren.',
  'Как изменить профиль?':
    'Hvordan redigerer jeg min profil?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Blyantknappen i din egen profil: navn, @brugernavn, beskrivelse, kontotype, status, links og adresse.',
  'Чем бизнес-аккаунт отличается?':
    'Hvordan er en virksomhedskonto forskellig?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Offentlig betyder, at alle ser dig. Skjult betyder, at dit navn og billede er skjult for andre mennesker. Virksomhed tilføjer en beskrivelse af din virksomhed, links og en adresse.',
  'Что показывает «онлайн» в шапке?':
    'Hvad viser «online» i titlen?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Hvor mange mennesker der er i platformen nu ifølge serveren. Det opdateres hvert halve minut.',
  'Закрывается ли игра вместе с эфиром?':
    'Lukkes spillet sammen med udsendelsen?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Ja. Havde udsendelsen kuber i sig, slukker spillet sig selv, når den slutter; ellers ville genstandene flyve over et tomt kort.',
  'Есть ли смайлы в эфире?':
    'Er der emoji i en udsendelse?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Der er, emoji-knappen ved siden af skrivelinjen holder hele det fælles sæt, det samme som i chatterne.',
  'Что такое «Все вопросы»?':
    'Hvad er Alle spørgsmål?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Hjælperens fuldstændige håndbog: mere end hundrede spørgsmål med svar, sorteret i afsnit, med søgning på titlen.',
  'Куда делась кнопка NET?':
    'Hvor blev NET-knappen af?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Vi fjernede den. Platformen søger ikke i det store internet, og knappen lovede, at den gjorde det. Hjælperen svarer om platformen og finder kuber, mennesker, grupper og udsendelser.',
  'Почему звук повторялся дважды?':
    'Hvorfor blev lyden gentaget to gange?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'To forskellige stykker kode talte, og ingen af dem afbrød den anden. Nu afbryder hver sætning den forrige, og den samme tekst gentages ikke to gange i træk.',
  'Как выключить голос совсем?':
    'Hvordan slukker jeg stemmen helt?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'På siden Stemmekommandoer er der en omskifter mellem svar højt og svar stille. Nu slukker den for alvor: før styrede den kun én indgang, og stemmen gik rundt om den.',
  'Что хранится только в моём браузере?':
    'Hvad gemmes kun i min browser?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Spillerekorderne, indstillingerne til spillet med kuberne, det valgte sprog, temaet og baggrunden, og listen over dine konti. Ingenting af det går til serveren.',
  'Почему просят подтвердить удаление?':
    'Hvorfor beder I om bekræftelse for en sletning?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Fordi den ikke kan tages tilbage. I chatterne spørger vi også, hvis kopi der skal væk, kun din eller alles.',
  'Что такое «У всех» при удалении?':
    'Hvad betyder «For alle» ved sletning?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«For mig» skjuler beskeden kun fra din egen skærm. «For alle» beder serveren om at fjerne den hos den anden person også.',
  'Сколько живёт сообщение с таймером?':
    'Hvor længe lever en besked med frist?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Så længe du har valgt: fem minutter, en time, et døgn, en uge eller for altid. Knappen ∞ ved siden af skrivelinjen.',
  'Как переслать сообщение?':
    'Hvordan videresender jeg en besked?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Beskedens menu → Videresend. Du vælger til hvem.',
  'Что делает «В избранное»?':
    'Hvad gør Gem i favoritter?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Det lægger beskeden i Gemt — din egen notesbog med noter og gemte ting.',
  'Как найти сообщение в переписке?':
    'Hvordan finder jeg en besked i en chat?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Lupen i chattens titel: den søger i teksten, og pilene hopper mellem fundene. Hylden med billeder, videoer, lyd og links er på samme sted.',
  'Что такое «Пригласить в группу»?':
    'Hvad er Inviter til gruppen?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Et link fra gruppens oplysninger: den, der åbner det, kommer ind i gruppen.',
  'Можно ли выйти из группы?':
    'Kan jeg gå ud af en gruppe?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Det kan du, med en knap i gruppens oplysninger. Går ejeren ud, slettes selve gruppen ikke.',
  'Сколько форм у предметов?':
    'Hvor mange former har genstandene?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Tyve, plus dit eget billede eller video oven på dem, og tilstanden «blandet».',
  'Что такое шопинг?':
    'Hvad er shoppingen?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Markedets andet afsnit, for ting: seksten kategorier, et kort med mærket og op til tyve billeder, og en roterende figur med mærkets navn. Betaling og levering sker mellem menneskerne.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Spørg med ord: for eksempel «hvordan tjener jeg» eller «find kuben Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Hvad skal jeg søge efter? Skriv noget som «find kuben Art» eller «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Om «{что}» har jeg ikke noget svar. Det, jeg kan, er platformen: CUBE og belønninger, grænser, swappen, tegnebogen, nøglerne, signalerne, kuberne og grupperne, spillet med kuberne, udsendelserne, udseendet og stemmekommandoerne.'

});
