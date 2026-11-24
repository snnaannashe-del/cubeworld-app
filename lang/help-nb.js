/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-nb.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('nb', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Innlegg, videoer og runde klipp. Herfra åpnes både kommentarene og reaksjonene.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Personlige samtaler, talemeldinger og runde videoer, det lagrede.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Offentlige fellesskap: felles chat, strøm av hendelser, medlemmer.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Handelssignaler: retning, inngang, mål og stopp. Prisen følger serveren selv.',
  'Объявления и обмен между людьми.':
    'Annonser og bytte mellom folk.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Satsene for belønninger, swappen og alt som gir CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Saldoen din i CUBE, innskudd, uttak og historikk.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Hva som skjer med kubene og innleggene dine, i tall.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE er plattformens interne valuta. Serveren godskriver den én gang om dagen for aktivitet: en aktiv dag, egne innlegg og kommentarer, de du har invitert. Inne i swappen er prisen på CUBE fast: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Serveren gjør opp belønningene én gang om dagen. Det som teller: en aktiv dag på nett, egne innlegg og kommentarer fra 10 tusen visninger, inviterte som har betalt for abonnement, og bonuser for en uke, en måned og et år på rad. De nøyaktige satsene er alltid ferske i avsnittet Tjen.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'For at ingenting skal kunne blåses opp med juks holder serveren daglige grenser: 20 nye chatter, 500 likes, 50 kommentarer, 500 følginger. Visninger kan ikke blåses opp i det hele tatt, de teller bare fra ekte visninger. Hvor mye som er igjen i dag, ser du i Tjen.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swappen veksler krypto til CUBE og tilbake: 16 valutaer og nettverkene deres, kursen tas i det øyeblikket forespørselen gjøres, CUBE regnes til $0.50. Innskudd og uttak går gjennom en betalingsleverandør; børsnøkler eller lommeboknøkler tar vi ikke imot og lagrer ikke. Bare det du har tjent kan tas ut, ikke det som er gitt i gave.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Lommeboken viser saldoen i CUBE, historikken og knappene for innskudd og uttak. Innskudd og uttak skjer gjennom swappen.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Nøkkelen åpner muligheter: Free er grunnlaget, Silver er utvidet, Gold gir flere kuber og statistikk. Nøkler kjøpes med CUBE. Premium-abonnementet gir en andel av belønningspotten etter bidraget ditt i måneden.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Et signal er retning, inngangspunkt, mål og stopp. Serveren følger prisen selv og lukker signalet ved målet eller ved stoppet. Børsnøkler ber vi ikke om: du handler selv, med ditt eget.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'En reaksjon under et innlegg gir forfatteren CUBE. Per dag kan det gis opptil 500 likes, lenger enn det teller serveren dem rett og slett ikke.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'En kube er ditt eget rom: chat, strøm, private rom og en livstimer. Den lages med «+» i verdenen. Folk inviterer du med en lenke eller med nøkkelen til kuben.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'En kube er en egen verden inne i plattformen: eget navn, forside, chat, strøm og levetid. Kuber er synlige på kartet, du kan gå blant dem og gå inn i dem.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Grupper er offentlige fellesskap: felles chat, strøm av hendelser og en liste over medlemmer. Din egen kan du lage i avsnittet Grupper.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Spillet med kubene åpnes med en knapp på kartet. Handlingene deles i støt (sprengning, kast, oppkast, fyrverkeri, kaos) og moduser (fall eller vektløshet, det ene eller det andre, magnet, virvel, frysing). Moduser legges sammen og holder til du slår dem av. Alt dette virker med knapp, med gest foran kameraet og med stemmen.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'I spillet kan du slå på gestene: en bevegelse til siden er et kast, oppover et oppkast, nedover et fall, håndflaten fram en sprengning, en sirkel en virvel, og begge hendene kaos. Bildet fra kameraet går ingen steder, alt regnes ut på din egen enhet.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Gjenstandene er ikke bare kuber: krystall, trekant, oktaeder, kule, pyramide, prisme, stjerne, ikosaeder, ring, dollar, euro, yuan. Du kan legge inn eget bilde eller egen video på opptil 15 sekunder; et stående 9:16 beskjæres fra midten til et kvadrat.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'I spillet finnes åtte figurer: katt, nabo, hund, robot, spøkelse, panda, frosk og romvesen. Du kan klappe dem, kile dem og riste dem, og de svarer med stemme og bevegelse. Din egen handling legger du til med en knapp: navn, kommando, beskrivelse og hva den gjøres med — hånden, foten, hodet eller hele kroppen.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Utseendet endrer farge og gjennomsiktighet på vinduene: Farge 1 er titlene og radene, Farge 2 er selve vinduet, Farge 3 er forsiden og rammen i profilen. Bakgrunnene til chattene velges på samme sted, egne legges inn i 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Med stemmen virker nesten alt: avsnittene, spillet, formene, figurene, over nitti kommandoer. Hele listen på alle tjue språk er på siden Stemmekommandoer: den åpnes fra Utseende eller ved å si «stemmekommandoer». Bryteren mellom svar høyt og svar stille er der også.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Dokumentene åpnes fra kontomenyen → Dokumenter. De er sju: vilkårene, personvernerklæringen, reglene for fellesskapet, belønninger og grenser, swap og betalinger, abonnement og nøkler, kamera og mikrofon. Det går med stemmen også, si «dokumenter».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Invitasjoner gir CUBE når den inviterte betaler for abonnement. Din egen lenke er i avsnittet for invitasjoner.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Profilen er utstillingsvinduet ditt: forside, beskrivelse og arbeider. Utseendet på forsiden og rammen endres med Farge 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Statistikken viser hva som skjer med kubene og innleggene dine: visninger, reaksjoner, strømmen av folk.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'I profilen kan du skjule navn og bilde, i stedet kommer et anonymt nummer. Men det skjuler deg for andre folk, ikke for serveren: IP-adressen til en forbindelse ser hvert nettsted på internett, og vårt også. Noe som skjuler IP-adressen finnes ikke i appen.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Markedet er annonser og bytte mellom folk.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Innlegg, kommentarer, annonser, navn og beskrivelser blir sjekket. Det som er klart forbudt blir ikke publisert, det tvilsomme går til et menneske. Markedet rører den sjekken ikke.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Hei. Jeg er plattformens hjelper: jeg svarer om kuber, belønninger, lommeboken, spillet og innstillingene, og jeg finner også kuber, folk og grupper. Spør meg med ord, for eksempel «hvordan tjener jeg», «finn kuben Art», «hvem er @anna». For resten av verden finnes NET-fanen ved siden av.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE og penger',
  'Что такое CUBE?':
    'Hva er CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE er plattformens interne poeng. Serveren godskriver dem én gang om dagen for aktivitet. Inne i swappen er prisen fast: 1 CUBE = $0.50. Det er ikke et verdipapir og ikke et løfte om inntekt.',
  'Как заработать?':
    'Hvordan tjener jeg?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Serveren teller og gjør opp dagen én gang per 24 timer: en aktiv dag på nett, egne innlegg og kommentarer fra 10 tusen visninger, reaksjoner under innleggene dine, inviterte som har betalt for abonnement, og bonuser for en uke, en måned og et år på rad. De nøyaktige satsene er i Tjen.',
  'Какие лимиты в сутки?':
    'Hvilke daglige grenser finnes?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 nye chatter, 500 likes, 50 kommentarer, 500 følginger. Visninger kan ikke blåses opp i det hele tatt. Tellingen går på UTC-døgn; når du grensen teller handlingen rett og slett ikke, og noen straff for det finnes ikke.',
  'Что считается накруткой?':
    'Hva regnes som juks?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Bunter av kontoer, automatiske likes og følginger, kjøpte visninger, avtaler om gjensidige reaksjoner. Belønninger som er fått slik, blir tatt tilbake.',
  'Как работает свайп?':
    'Hvordan virker swappen?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swappen veksler krypto til CUBE og tilbake: 16 valutaer og nettverkene deres. Kryptokursen tas i det øyeblikket forespørselen gjøres, CUBE regnes til $0.50. Innskudd og uttak går gjennom en betalingsleverandør.',
  'Как пополнить кошелёк?':
    'Hvordan fyller jeg opp lommeboken?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Gjennom swappen: du lager en forespørsel, får en adresse og et beløp og sender overføringen fra din egen lommebok. Det er viktig at valutaen og nettverket stemmer med forespørselen, ellers kan ikke overføringen hentes tilbake.',
  'Как вывести деньги?':
    'Hvordan tar jeg ut penger?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Det lages en uttaksforespørsel til adressen din, og nettverksgebyret betales av mottakeren. Vi sjekker og sender for hånd, oftest i løpet av en arbeidsdag.',
  'Почему вывести можно не всё?':
    'Hvorfor kan jeg ikke ta ut alt?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Bare det du har tjent kan tas ut. CUBE som er godskrevet som gave eller bonus kan brukes inne i plattformen men ikke tas ut; ellers ville det holdt å dele ut gaver og løse dem inn.',
  'Какие монеты поддерживаются?':
    'Hvilke valutaer støttes?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 valutaer og nettverkene deres: BTC, ETH, USDT, USDC, BNB og elleve til fra toppen etter omsetning. Hele listen med nettverkene er i swap-vinduet.',
  'Что если отправил не в ту сеть?':
    'Hva om jeg sendte til feil nettverk?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'En overføring i en blokkjede kan ikke snus. Skriv til støtten med en gang: noen ganger går det an å gjøre noe, men det kan ingen love. Derfor må nettverket i forespørselen og i lommeboken din være det samme.',
  'Берёте ли вы ключи от бирж?':
    'Tar dere imot børsnøkler?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Nei. Vi ber ikke om og tar ikke imot børsnøkler, seed-fraser eller tilgang til lommeboken din. Om noen ber om det på plattformens vegne, er det en bedrager.',
  'Платите ли вы налоги за меня?':
    'Betaler dere skattene mine?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Nei. Det du skylder staten, finner du ut av og betaler selv. Vi er ingen skatteagent.',
  'Ключи и подписка':
    'Nøkler og abonnement',
  'Какие бывают ключи?':
    'Hvilke nøkler finnes?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free er grunnlaget, Silver er utvidet, Gold gir flere kuber og analyse. Nøkkelen oppgraderes med CUBE i nøkkelbutikken.',
  'Что даёт Premium?':
    'Hva gir Premium?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'En andel av belønningspotten etter bidraget ditt i måneden, eksterne lommebøker koblet til for visning, statistikk og en rangering, forkjørsrett i signalene, et merke i profilen og i chattene, og lukkede Premium-kuber.',
  'Сколько стоит подписка?':
    'Hva koster abonnementet?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 i måneden eller $59.99 i året.',
  'Как отменить подписку?':
    'Hvordan sier jeg opp abonnementet?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Når som helst: det løper ut perioden du har betalt for og fornyes ikke. Det som er betalt for den gjeldende perioden, betales ikke tilbake, bortsett fra der loven krever det.',
  'Я потерял ключ: что делать?':
    'Jeg har mistet nøkkelen min, hva gjør jeg?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Den kan ikke hentes tilbake. Vi ber verken om e-post eller telefonnummer, så vi har ingen måte å bekrefte at kontoen er din. Nøkkelen er kontoen; ta vare på den et sted du ikke mister den.',
  'Можно ли передать ключ другому?':
    'Kan jeg gi nøkkelen min til noen andre?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Det kan du, men alt som gjøres med den regnes som gjort av deg.',
  'Кубы и группы':
    'Kuber og grupper',
  'Что такое куб?':
    'Hva er en kube?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'En kube er en egen verden inne i plattformen: eget navn, forside, chat, strøm, private rom og levetid. Kuber er synlige på kartet og du kan gå inn i dem.',
  'Как создать куб?':
    'Hvordan lager jeg en kube?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Med «+» i verdenen eller i Mitt univers. Du setter navn, forside, type og levetid. Folk inviterer du med en lenke eller med nøkkelen til kuben.',
  'Что такое таймер жизни куба?':
    'Hva er livstimeren til kuben?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'En kube lever en bestemt tid og lukker seg så. Tiden velges når du lager den, fra en time til et år.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Hva er grupper?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Offentlige fellesskap: en felles chat, en strøm av hendelser og en liste over medlemmer.',
  'Как найти куб или человека?':
    'Hvordan finner jeg en kube eller en person?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Skriv det her: «finn kuben Art», «@anna», «fotogruppe». Jeg søker i plattformen og viser kort: kuber, folk, grupper og sendinger som går akkurat nå.',
  'Лента и посты':
    'Strøm og innlegg',
  'Как выложить пост?':
    'Hvordan publiserer jeg et innlegg?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Med lag-knappen i strømmen. Video, bilde, tittel og beskrivelse er alle tillatt.',
  'Почему пост не опубликовался?':
    'Hvorfor ble ikke innlegget mitt publisert?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Teksten kom ikke gjennom sjekken før publisering. Meldingen sier grunnen: forbudte varer, svindel, trusler og annet. Reglene er i Dokumenter, og er det en feil, skriv til støtten.',
  'Что дают реакции?':
    'Hva gir reaksjonene?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'En reaksjon under et innlegg gir forfatteren CUBE. Per dag kan det gis opptil 500 likes.',
  'Как пожаловаться на пост?':
    'Hvordan melder jeg et innlegg?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Under hvert innlegg og hver melding er det en meldeknapp. En melding går til et menneske.',
  'Сколько просмотров нужно для начисления?':
    'Hvor mange visninger trengs for en belønning?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Fra 10 tusen ekte visninger: egne innlegg og kommentarer begynner å gi CUBE fra den terskelen.',
  'Игра с кубами':
    'Spillet med kubene',
  'Как играть кубами?':
    'Hvordan spiller man med kubene?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Spillknappen er på kartet. Kubene flyr inne i vegger og kan ikke komme ut. Handlingene trykkes med en knapp, vises med hånden foran kameraet eller sies høyt.',
  'Что такое режимы и толчки?':
    'Hva er moduser og støt?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Støt er sprengning, kast, oppkast, fyrverkeri og kaos: de går én gang og virker over alt. Moduser holder til du slår dem av, og de legges sammen: gravitasjon (fall ELLER vektløshet), magnet, virvel, frysing.',
  'Как работают жесты рукой?':
    'Hvordan virker håndgestene?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'En bevegelse til siden er et kast, oppover et oppkast, nedover et fall, håndflaten fram en sprengning, en sirkel en virvel, begge hendene kaos. Bildene bearbeides på din egen enhet og går ingen steder.',
  'Какие есть формы?':
    'Hvilke former finnes?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kube, krystall, trekant, oktaeder, kule, pyramide, prisme, stjerne, ikosaeder, ring, dollar, euro, yuan, og ditt eget bilde. Pluss «blandet», der hver gjenstand har sin egen form.',
  'Как поставить свою картинку?':
    'Hvordan legger jeg inn mitt eget bilde?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'I spillet → Form på gjenstanden → ruten «Min». Kvadratisk er best; et stående 9:16 beskjæres fra midten. Trykk «Min» igjen for å bytte det.',
  'Можно ли поставить видео?':
    'Går det med video?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Det går, opptil 15 sekunder. Lenger tas ikke imot. Videoen tåler at siden lastes om.',
  'Кто такие персонажи?':
    'Hvem er figurene?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Åtte figurer: katt, nabo, hund, robot, spøkelse, panda, frosk, romvesen. Du kan klappe dem, kile dem og riste dem, og de svarer med stemme og bevegelse.',
  'Как добавить своё действие?':
    'Hvordan legger jeg til min egen handling?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Med en knapp i avsnittet for figurene: navn, kommando, beskrivelse og hva den gjøres med — hånden, foten, hodet eller hele kroppen. Selve handlingen velges blant seksten ferdige effekter.',
  'Как крутятся предметы?':
    'Hvordan roterer gjenstandene?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Fem moduser: langs aksen, mot aksen, over toppen, under bunnen, og hulter til bulter. Rotasjonen fra et kast legges til den valgte modusen.',
  'Как начать эфир?':
    'Hvordan starter jeg en sending?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Knappen Sending i strømmen eller stemmekommandoen «sending». Du velger tittel og modus, og du er i lufta. Seerne får bildet rett fra deg.',
  'Какие режимы эфира?':
    'Hvilke sendingsmoduser finnes?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera og kuber: scenen oppå kamerabildet, med gestene i gang. Bare kuber: scenen uten kamera. Rein sending: bare kameraet, uten kommentarer, reaksjoner og gaver.',
  'Сколько зрителей выдержит эфир?':
    'Hvor mange seere tåler en sending?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Bildet går rett fra den som sender til hver seer, så det kommer an på forbindelsen hans: på en hjemmelinje ser ti til femten folk greit. En større sal krever en relé-server.',
  'Что такое подарки?':
    'Hva er gavene?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Tretti gaver, fra en Rose for 1 CUBE til en Legendekube for 1000. En gave er en overføring av CUBE til den som sender, i sin helhet; plattformen tar ingenting.',
  'Как закончить эфир?':
    'Hvordan avslutter jeg en sending?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Knappen Avslutt sendingen i tittelen på vinduet, synlig i hver modus. Å lukke vinduet med krysset stopper ikke sendingen: den går til du trykker Avslutt.',
  'Голос и языки':
    'Stemme og språk',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Hvilke stemmekommandoer finnes?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Mer enn nitti: avsnitt, vinduer, oppretting, strømmen, spillet, former, figurer, styring. Hele listen med søk er på siden Stemmekommandoer: kontomenyen → Stemmekommandoer, eller i Utseende, eller si bare «stemmekommandoer».',
  'На каких языках работает голос?':
    'Hvilke språk virker stemmen på?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'På tjue: russisk, engelsk (og den indiske), ukrainsk, tysk, fransk (og den kanadiske), spansk (og den latinamerikanske), italiensk, portugisisk, polsk, tyrkisk, arabisk (og den fra Gulfen), vietnamesisk, kinesisk, japansk, koreansk, hindi. Språket velges på kommandosiden og i Utseende.',
  'Как включить микрофон?':
    'Hvordan slår jeg på mikrofonen?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Mikrofonknappen er i den øverste raden. Trykker du på den, lytter den; trykker du igjen, stopper den.',
  'Как выключить озвучку?':
    'Hvordan slår jeg av svarene med stemme?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'På siden Stemmekommandoer er det en bryter mellom svar høyt og svar stille. Stemmen lytter i begge tilfeller; bare svaret er forskjellig.',
  'Куда уходит мой голос?':
    'Hvor går stemmen min?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Gjenkjenningen gjør nettleseren selv. Chrome og nettlesere bygget på den sender lyden til Googles servere; slik er gjenkjenningen deres laget, og plattformen bestemmer ingenting om det. Passer det deg ikke, så slå ikke på mikrofonen: alt finnes med knapper også.',
  'Как поменять тему?':
    'Hvordan bytter jeg tema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Utseende → Tema: mørkt, lyst, eller Kamera, der bildet fra kameraet ditt er bakgrunn.',
  'Что такое Цвет 1, 2 и 3?':
    'Hva er Farge 1, 2 og 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Farge 1 er titlene, skriveradene og fanene. Farge 2 er selve vinduet: bakgrunnen i chatten og kommentarlisten. Farge 3 er forsiden og rammen i profilen. Hver av dem har sin egen glidebryter for gjennomsiktighet.',
  'Как поставить обои?':
    'Hvordan legger jeg inn en bakgrunn?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Utseende → Bakgrunn: et ferdig sett eller ditt eget bilde i 9:16. Farge 2 legger seg over bakgrunnen som en tone, og glidebryteren bestemmer hvor sterkt.',
  'Правила и безопасность':
    'Regler og sikkerhet',
  'Что нельзя выкладывать?':
    'Hva kan ikke publiseres?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Materiale med barn, trusler og oppfordringer til vold, oppfordring til hat, svindel, forbudte varer, andres arbeid uten rett til det, å utgi seg for en annen, spam og falsk aktivitet. I sin helhet i Reglene for fellesskapet.',
  'Как работает модерация?':
    'Hvordan virker moderasjonen?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Innlegg, kommentarer, gruppemeldinger, navn og beskrivelser sjekkes på serveren før publisering. Det som er klart forbudt blir ikke publisert, det tvilsomme går til et menneske. Markedet og de personlige samtalene sjekkes ikke.',
  'Виден ли мой IP?':
    'Er IP-en min synlig?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Ja, serveren ser den, som hvert nettsted på internett: uten IP ville den ikke vite hvor svaret skal sendes. Den skjulte modusen skjuler navnet og bildet ditt for andre folk, men ikke for serveren.',
  'Что вы храните обо мне?':
    'Hva lagrer dere om meg?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Nøkkelen til kontoen, profilen du har fylt ut selv, innholdet ditt, de daglige tellerne og de tekniske dataene om forbindelsen. Verken e-post, telefonnummer, passord eller lommeboknøkler.',
  'Куда жаловаться?':
    'Hvor klager jeg?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Om et innhold, med meldeknappen under det. Om alt annet, gjennom støtten inne i plattformen.',
  'Где документы?':
    'Hvor er dokumentene?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Kontomenyen → Dokumenter. De er sju: vilkårene, personvernerklæringen, reglene for fellesskapet, belønninger og grenser, swap og betalinger, abonnement og nøkler, kamera og mikrofon.',
  'Что такое карта?':
    'Hva er kartet?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Plattformens kart: 177 land og 1150 byer med ekte koordinater, solens posisjon regnet ut for den gjeldende tiden, nattsiden og morgengryet nøyaktig der de er på himmelen. Tjue visninger: fra rommet, jorden om natten, dag og natt, gatene i OpenStreetMap, været, jordskjelvene, tidssonene, kubene og sendingene våre. Det åpnes fra kontomenyen eller ved å si «kart».',
  'Как проложить маршрут на карте?':
    'Hvordan tegner jeg en rute på kartet?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Trykk på starten på kartet, så på slutten, og velg en av tjue veier. Storsirkelen og loksodromen — slik man virkelig flyr og seiler. Bare over land og bare over vann: et ekte veisøk gjennom kontinentene uten et eneste skritt i det andre elementet. Langs skyggen og langs lyset: langs nattsiden. Forbi kuber, sendinger og folk: gjennom nålene våre. Ruten langs gatene regnes ut av den eksterne motoren OSRM; svarer den ikke, sier vi det.',
  'Видно ли меня на карте?':
    'Er jeg synlig på kartet?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Bare om du selv har satt ut nålen «jeg er her». Den lever en halvtime og sletter seg selv, koordinatene rundes av til kilometeren alt før de går til serveren, og «fjern meg fra kartet» sletter oppføringen i stedet for å skjule den. Uten den nålen finnes du ikke på kartet i det hele tatt.',
  'Есть ли на карте спутник и пробки?':
    'Har kartet satellitt og trafikk?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nei. Satellittbilder og trafikk gis av betalte leverandører med en nøkkel. Plassen for de lagene er klar: du setter inn en nøkkel og de slås på. Så lenge det ikke finnes nøkkel, sier kartet det rett ut i stedet for å tegne en pen løgn.',
  'Что такое забег по улице?':
    'Hva er gateløpet?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Et sprang inne i kartet: førstepersonsvisning, de ekte husene og svingene i din egen gate. Du løper selv: sveip til siden for å bytte fil, i et kryss for å svinge, oppover for å hoppe, nedover for å gli. Du samler kuber og unngår hindre og stråler. På veien møter du andres sendinger, kuber og utstillingsvinduer. Det finnes også en rolig tur med styrespak. Det åpnes fra kontomenyen, fra kartet med knappen Ut i gata, eller ved å si «løp».',
  'Откуда берутся дома в забеге?':
    'Hvor kommer husene i løpet fra?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Fra OpenStreetMap: ekte husformer og antall etasjer, ekte veier med bredden og svingene sine. En etasje regner vi som tre meter; mangler antallet etasjer, tas høyden fra husets grunnflate. Gatebilder finnes ikke, dem gir betalte leverandører. Er kartserveren opptatt, sier spillet det ærlig og bygger vårt eget kvartal.',
  'Что такое шопинг в маркетплейсе?':
    'Hva er shoppingen på markedet?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Markedets andre avsnitt, for ting og ikke for filer: seksten kategorier fra klær til kunst, et kort med merket, størrelser, farger, egenskaper og opptil tjue bilder. På hvert kort roterer en figur med navnet på merket, hvilken som helst av tjue former. Avsnittet rører ikke pengene: betaling og levering skjer mellom folkene, derfor står det «skriv til selgeren» og ikke «kjøp med CUBE».',
  'Игры, чаты и новое':
    'Spill, chatter og nytt',
  'Сколько игр в зале?':
    'Hvor mange spill er det i hallen?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Åtte, og alle kan spilles: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. De styres med fingeren og med tastaturet.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Gir spillene CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nei. Spillene gir poeng og en personlig rekord, som ligger i nettleseren din. CUBE godskrives av serveren for visninger og fra den felles potten; å prege mynter i en nettleser ville vært en løgn.',
  'Как играть в DataMine?':
    'Hvordan spiller man DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Et felt åtte ganger åtte. Du trykker på en rute og graver fram dataene; tallet viser hvor mange virus som er ved siden av. Et langt trykk setter et flagg. Tre liv, så et nytt lag.',
  'Как играть в CipherBreak?':
    'Hvordan spiller man CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Gjett en kode på fire tegn. Etter et forsøk betyr en fylt ring at tegnet står på plassen sin, en tom at det er i koden men et annet sted. Åtte forsøk.',
  'Как играть в Phantom Escape?':
    'Hvordan spiller man Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Samle fem nøkler og gå ut gjennom døren. Spøkelsene jager deg langs den korteste veien, og i hver etasje er de flere.',
  'Как играть в Block Trade?':
    'Hvordan spiller man Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Ett og et halvt minutt, med 1000 i hånden. Kjøp billigere, selg dyrere. Resultatet ditt er alt over tusenlappen.',
  'Как играть в TrustChain?':
    'Hvordan spiller man TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Trykk på blokkene i stigende rekkefølge mens klokken går. Én feil og kjeden brytes. For hver runde blir kjeden lenger.',
  'Как играть в CubeBuilder?':
    'Hvordan spiller man CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Platen går til siden, og et trykk slipper den. Det som stikker ut faller av, og platen blir smalere. Bommer du på tårnet, er det slutt.',
  'Что показывает строка курсов?':
    'Hva viser kursraden?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Tretti valutaer med pris og endringen for dagen. Dataene kommer gjennom serveren vår, som holder et halvt minutt i minnet. Raden kryper ikke: et helt antall ruter går inn på skjermen, og de byttes med noen sekunders mellomrom.',
  'Что значит число кубов в шапке?':
    'Hva betyr antallet kuber i tittelen?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Hvor mange kuber som er i verdenen din nå, de du ser foran deg. Ikke det samlede antallet kuber i plattformen.',
  'Можно ли войти вторым аккаунтом?':
    'Kan jeg logge inn med en andre konto?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Det kan du. Kontomenyen → Legg til konto: den gjeldende nøkkelen blir liggende i listen, og du går tilbake til den med ett trykk fra samme meny. Opptil åtte huskes.',
  'Зачем «Сохранить» в окне игры?':
    'Hva er Lagre til i spillvinduet?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Det husker formen på gjenstanden, figuren, gestene og størrelsen. Neste gang du kommer inn, er alt der du forlot det.',
  'Чем режим отличается от толчка?':
    'Hvordan er en modus forskjellig fra et støt?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'En modus holder til du slår den av med et andre trykk, og den lyser videre. Et støt går én gang og lyser ikke; det etterlater bare et tynt merke om at det ble trykket sist.',
  'Почему кубы больше не исчезают?':
    'Hvorfor forsvinner ikke kubene lenger?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Visningskubene i utstillingsvinduet levde kort, fem og femten minutter. Nå får de minst et halvt døgn og startes på nytt før de tar slutt. Ekte kuber lever nøyaktig så lenge de fikk da de ble laget.',
  'Как сделать фото прямо в чат?':
    'Hvordan tar jeg bilde rett i chatten?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Binders → Kamera åpner vårt eget kamera. Ett trykk tar et bilde, et langt trykk spiller inn video i opptil ett minutt. Galleriet er punktet ved siden av, Bilde eller video.',
  'Что такое галерея переписки?':
    'Hva er galleriet i chatten?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Lupen i tittelen på chatten åpner søket, og over det en hylle: bilder, videoer, lyd og lenker fra den chatten. Den samles fra meldingene selv, og ingenting går noen steder.',
  'Как удалить сразу несколько сообщений?':
    'Hvordan sletter jeg flere meldinger på en gang?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Et langt trykk på en melding slår på utvalget, så krysser du av dem du vil og trykker Slett i den nederste raden. Opptil hundre om gangen.',
  'Можно ли изменить своё сообщение?':
    'Kan jeg rette min egen melding?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Det kan du, dine egne og bare tekstmeldinger: menyen til meldingen → Rediger. Ved siden av vises merket «redigert». Chatten lukkes ikke mens du gjør det.',
  'Что такое сторис?':
    'Hva er historiene?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Korte innlegg som lever et døgn, over listen med chatter: et bilde eller en video i opptil ett minutt. De ses én etter én og forsvinner av seg selv etter et døgn.',
  'Сколько фото можно в группу?':
    'Hvor mange bilder får plass i en gruppe?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Opptil sju bilder, eller én video i opptil ett minutt. Pluss et ikon fra settet og etiketter under beskrivelsen.',
  'Что такое теги группы?':
    'Hva er etikettene til gruppen?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Noen ord, skilt med komma, som gruppen finnes med i søket.',
  'Видно ли участников группы?':
    'Er medlemmene i gruppen synlige?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Eieren bestemmer når den lages: medlemslisten kan vises for alle eller bli synlig bare for eieren.',
  'Почему поле ссылки на видео убрали?':
    'Hvorfor fjernet dere feltet for videolenke?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'En annens lenke gikk i stykker når den ble slettet i den andre enden, og plattformen kunne ikke svare for det. En video lastes opp som en fil i vårt eget lager.',
  'Сколько длится видео в посте?':
    'Hvor lang kan videoen i et innlegg være?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Foreløpig en fil på opptil 50 MB. På en større server blir det trinn: 15 sekunder, ett minutt, tre minutter og femten.',
  'Что делает кнопка «Чаевые автору»?':
    'Hva gjør knappen Tips til forfatteren?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Den overfører CUBE fra saldoen din til forfatteren av innlegget i sin helhet, uten andel for plattformen. Beløpet er 1, 5, 10, 25 eller ditt eget.',
  'Как пожаловаться на видео?':
    'Hvordan melder jeg en video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'De tre punktene under videoen → Meld: du velger en grunn og kan legge til egne ord. Det går til et levende menneske.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Hvordan deler jeg et innlegg?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'De tre punktene under videoen → Del. Du får en lenke du kan sende til hvem du vil.',
  'Куда девается «Сохранить»?':
    'Hvor legger Lagre tingene?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'I profilen din, på hyllen med det lagrede, under bokmerkeikonet nedenfor fanene i profilen.',
  'Что видно в моём профиле?':
    'Hva er synlig i profilen min?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'To faner: Shorts for de korte videoene, Innlegg for alt annet. Et trykk på et kort åpner det akkurat som i strømmen. Rediger og slett ser bare forfatteren.',
  'Как изменить профиль?':
    'Hvordan redigerer jeg profilen min?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Blyantknappen i din egen profil: navn, @brukernavn, beskrivelse, kontotype, status, lenker og adresse.',
  'Чем бизнес-аккаунт отличается?':
    'Hvordan er en bedriftskonto forskjellig?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Offentlig betyr at alle ser deg. Skjult betyr at navnet og bildet ditt er skjult for andre folk. Bedrift legger til en beskrivelse av virksomheten din, lenker og en adresse.',
  'Что показывает «онлайн» в шапке?':
    'Hva viser «på nett» i tittelen?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Hvor mange folk som er i plattformen nå ifølge serveren. Det oppdateres hvert halve minutt.',
  'Закрывается ли игра вместе с эфиром?':
    'Lukkes spillet sammen med sendingen?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Ja. Hadde sendingen kuber i seg, slår spillet seg av selv når den er slutt; ellers ville gjenstandene flydd over et tomt kart.',
  'Есть ли смайлы в эфире?':
    'Finnes det emoji i en sending?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Det finnes, emoji-knappen ved siden av skriveraden holder hele det felles settet, det samme som i chattene.',
  'Что такое «Все вопросы»?':
    'Hva er Alle spørsmål?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Hjelperens fullstendige håndbok: mer enn hundre spørsmål med svar, sortert i avsnitt, med søk på tittelen.',
  'Куда делась кнопка NET?':
    'Hvor ble NET-knappen av?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Vi fjernet den. Plattformen søker ikke i det store internettet, og knappen lovet at den gjorde det. Hjelperen svarer om plattformen og finner kuber, folk, grupper og sendinger.',
  'Почему звук повторялся дважды?':
    'Hvorfor ble lyden gjentatt to ganger?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'To forskjellige biter kode snakket, og ingen av dem avbrøt den andre. Nå avbryter hver frase den forrige, og samme tekst gjentas ikke to ganger på rad.',
  'Как выключить голос совсем?':
    'Hvordan slår jeg av stemmen helt?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'På siden Stemmekommandoer er det en bryter mellom svar høyt og svar stille. Nå slår den av for ordentlig: før styrte den bare én inngang, og stemmen gikk rundt den.',
  'Что хранится только в моём браузере?':
    'Hva lagres bare i nettleseren min?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Spillrekordene, innstillingene for spillet med kubene, det valgte språket, temaet og bakgrunnen, og listen over kontoene dine. Ingenting av det går til serveren.',
  'Почему просят подтвердить удаление?':
    'Hvorfor ber dere om bekreftelse for en sletting?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Fordi den ikke kan tas tilbake. I chattene spør vi også hvis kopi som skal bort, bare din eller alles.',
  'Что такое «У всех» при удалении?':
    'Hva betyr «For alle» ved sletting?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«For meg» skjuler meldingen bare fra din egen skjerm. «For alle» ber serveren fjerne den hos den andre personen også.',
  'Сколько живёт сообщение с таймером?':
    'Hvor lenge lever en melding med frist?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Så lenge du har valgt: fem minutter, en time, et døgn, en uke eller for alltid. Knappen ∞ ved siden av skriveraden.',
  'Как переслать сообщение?':
    'Hvordan videresender jeg en melding?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Menyen til meldingen → Videresend. Du velger til hvem.',
  'Что делает «В избранное»?':
    'Hva gjør Lagre i favoritter?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Det legger meldingen i Lagret — din egen notatbok med notater og lagrede ting.',
  'Как найти сообщение в переписке?':
    'Hvordan finner jeg en melding i en chat?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Lupen i tittelen på chatten: den søker i teksten, og pilene hopper mellom treffene. Hyllen med bilder, videoer, lyd og lenker er på samme sted.',
  'Что такое «Пригласить в группу»?':
    'Hva er Inviter til gruppen?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'En lenke fra opplysningene om gruppen: den som åpner den, går inn i gruppen.',
  'Можно ли выйти из группы?':
    'Kan jeg gå ut av en gruppe?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Det kan du, med en knapp i opplysningene om gruppen. Går eieren ut, slettes ikke selve gruppen.',
  'Сколько форм у предметов?':
    'Hvor mange former har gjenstandene?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Tjue, pluss ditt eget bilde eller video oppå dem, og modusen «blandet».',
  'Что такое шопинг?':
    'Hva er shoppingen?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Markedets andre avsnitt, for ting: seksten kategorier, et kort med merket og opptil tjue bilder, og en roterende figur med navnet på merket. Betaling og levering skjer mellom folkene.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Spør med ord: for eksempel «hvordan tjener jeg» eller «finn kuben Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Hva skal jeg se etter? Skriv noe som «finn kuben Art» eller «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Om «{что}» har jeg ikke noe svar. Det jeg kan, er plattformen: CUBE og belønninger, grenser, swappen, lommeboken, nøklene, signalene, kubene og gruppene, spillet med kubene, sendingene, utseendet og stemmekommandoene.'

});
