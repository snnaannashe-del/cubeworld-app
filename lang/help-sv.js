/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-sv.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('sv', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Inlägg, videor och runda klipp. Härifrån öppnas både kommentarerna och reaktionerna.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Personliga samtal, röstmeddelanden och runda videor, det sparade.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Offentliga gemenskaper: gemensam chatt, flöde av händelser, medlemmar.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Handelssignaler: riktning, ingång, mål och stopp. Priset följer servern själv.',
  'Объявления и обмен между людьми.':
    'Annonser och byten mellan människor.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Belöningssatserna, swappen och allt som ger CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Ditt saldo i CUBE, insättningar, uttag och historik.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Vad som händer med dina kuber och inlägg, i siffror.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE är plattformens interna valuta. Servern krediterar den en gång om dagen för aktivitet: en aktiv dag, egna inlägg och kommentarer, de du bjudit in. Inne i swappen är priset på CUBE fast: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Servern stänger belöningarna en gång om dagen. Det som räknas: en aktiv dag online, egna inlägg och kommentarer från 10 tusen visningar, inbjudna som betalat för ett abonnemang, och bonusar för en vecka, en månad och ett år i rad. De exakta satserna är alltid färska i avsnittet Tjäna.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'För att ingenting ska kunna blåsas upp med fusk håller servern dagliga gränser: 20 nya chattar, 500 gillningar, 50 kommentarer, 500 följningar. Visningar kan inte blåsas upp alls, de räknas bara från riktiga visningar. Hur mycket som är kvar idag syns i Tjäna.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swappen växlar krypto till CUBE och tillbaka: 16 valutor och deras nätverk, kursen tas i det ögonblick begäran görs, CUBE räknas till $0.50. Insättningar och uttag går genom en betalleverantör; börsnycklar eller plånboksnycklar tar vi inte emot och sparar inte. Bara det du tjänat kan tas ut, inte det som getts i gåva.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Plånboken visar saldot i CUBE, historiken och knapparna för insättning och uttag. Insättning och uttag sker genom swappen.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Nyckeln öppnar möjligheter: Free är grunden, Silver är utökat, Gold ger fler kuber och statistik. Nycklar köps med CUBE. Premium-abonnemanget ger en andel av belöningspotten efter ditt bidrag under månaden.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'En signal är riktning, ingångspunkt, mål och stopp. Servern följer priset själv och stänger signalen vid målet eller vid stoppet. Börsnycklar ber vi inte om: du handlar själv, med ditt eget.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'En reaktion under ett inlägg ger upphovsmannen CUBE. Per dag kan upp till 500 gillningar ges, längre än så räknar servern dem helt enkelt inte.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'En kub är ditt eget rum: chatt, flöde, privata rum och en livstimer. Den skapas med ”+” i världen. Folk bjuder du in med en länk eller med kubens nyckel.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'En kub är en egen värld inne i plattformen: eget namn, omslag, chatt, flöde och livstid. Kuber syns på kartan, du kan gå bland dem och gå in i dem.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Grupper är offentliga gemenskaper: gemensam chatt, flöde av händelser och en lista över medlemmar. Din egen kan du skapa i avsnittet Grupper.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Spelet med kuberna öppnas med en knapp på kartan. Handlingarna delas i stötar (sprängning, kast, uppkast, fyrverkeri, kaos) och lägen (fall eller tyngdlöshet, det ena eller det andra, magnet, virvel, frysning). Lägen läggs ihop och håller tills du släcker dem. Allt detta fungerar med knapp, med gest framför kameran och med rösten.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'I spelet kan du tända gesterna: en rörelse i sidled är ett kast, uppåt ett uppkast, nedåt ett fall, handflatan framåt en sprängning, en cirkel en virvel, och båda händerna kaos. Bilden från kameran går ingenstans, allt räknas ut på din egen enhet.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Föremålen är inte bara kuber: kristall, triangel, oktaeder, sfär, pyramid, prisma, stjärna, ikosaeder, ring, dollar, euro, yuan. Du kan lägga in en egen bild eller en egen video på upp till 15 sekunder; en lodrät 9:16 beskärs från mitten till en kvadrat.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'I spelet finns åtta figurer: katt, granne, hund, robot, spöke, panda, groda och utomjording. Du kan klappa dem, kittla dem och skaka om dem, och de svarar med röst och rörelse. Din egen handling lägger du till med en knapp: namn, kommando, beskrivning och vad den görs med — handen, foten, huvudet eller hela kroppen.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Utseendet ändrar fönstrens färg och genomskinlighet: Färg 1 är rubrikerna och raderna, Färg 2 är själva fönstret, Färg 3 är omslaget och ramen i profilen. Bakgrunderna till chattarna väljs på samma ställe, egna läggs in i 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Med rösten fungerar nästan allt: avsnitten, spelet, formerna, figurerna, över nittio kommandon. Hela listan på alla tjugo språk finns på sidan Röstkommandon: den öppnas från Utseende eller genom att säga ”röstkommandon”. Omkopplaren mellan svar högt och svar tyst finns där också.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Dokumenten öppnas från kontomenyn → Dokument. De är sju: användarvillkoren, integritetspolicyn, gemenskapens regler, belöningar och gränser, swap och betalningar, abonnemang och nycklar, kamera och mikrofon. Det går med rösten också, säg ”dokument”.',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Inbjudningar ger CUBE när den inbjudna betalar för ett abonnemang. Din egen länk finns i avsnittet för inbjudningar.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Profilen är ditt skyltfönster: omslag, beskrivning och arbeten. Omslagets och ramens utseende ändras med Färg 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Statistiken visar vad som händer med dina kuber och inlägg: visningar, reaktioner, flödet av människor.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'I profilen kan du gömma namn och bild, i stället kommer ett anonymt nummer. Men det gömmer dig för andra människor, inte för servern: IP-adressen för en anslutning ser varje sajt på internet, och vår också. Något som gömmer IP-adressen finns inte i appen.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Marknaden är annonser och byten mellan människor.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Inlägg, kommentarer, annonser, namn och beskrivningar granskas. Det som är klart förbjudet publiceras inte, det tveksamma går till en människa. Marknaden rör den granskningen inte.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Hej. Jag är plattformens hjälpare: jag svarar om kuber, belöningar, plånboken, spelet och inställningarna, och jag hittar också kuber, människor och grupper. Fråga mig med ord, till exempel ”hur tjänar jag”, ”hitta kuben Art”, ”vem är @anna”. För resten av världen finns NET-fliken intill.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE och pengar',
  'Что такое CUBE?':
    'Vad är CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE är plattformens interna poäng. Servern krediterar dem en gång om dagen för aktivitet. Inne i swappen är priset fast: 1 CUBE = $0.50. Det är inget värdepapper och inget löfte om inkomst.',
  'Как заработать?':
    'Hur tjänar jag?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Servern räknar och stänger dagen en gång per 24 timmar: en aktiv dag online, egna inlägg och kommentarer från 10 tusen visningar, reaktioner under dina inlägg, inbjudna som betalat för ett abonnemang, och bonusar för en vecka, en månad och ett år i rad. De exakta satserna finns i Tjäna.',
  'Какие лимиты в сутки?':
    'Vilka dagliga gränser finns?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 nya chattar, 500 gillningar, 50 kommentarer, 500 följningar. Visningar kan inte blåsas upp alls. Räkningen går på UTC-dygn; når du gränsen räknas handlingen helt enkelt inte, och något straff för det finns inte.',
  'Что считается накруткой?':
    'Vad räknas som fusk?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Buntar av konton, automatiska gillningar och följningar, köpta visningar, uppgörelser om ömsesidiga reaktioner. Belöningar som fåtts så tas tillbaka.',
  'Как работает свайп?':
    'Hur fungerar swappen?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swappen växlar krypto till CUBE och tillbaka: 16 valutor och deras nätverk. Kryptokursen tas i det ögonblick begäran görs, CUBE räknas till $0.50. Insättningar och uttag går genom en betalleverantör.',
  'Как пополнить кошелёк?':
    'Hur fyller jag på plånboken?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Genom swappen: du skapar en begäran, får en adress och ett belopp och skickar överföringen från din egen plånbok. Det är viktigt att valutan och nätverket stämmer med begäran, annars går överföringen inte att få tillbaka.',
  'Как вывести деньги?':
    'Hur tar jag ut pengar?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'En uttagsbegäran skapas till din adress, och nätverksavgiften betalas av mottagaren. Vi kontrollerar och skickar för hand, oftast inom en arbetsdag.',
  'Почему вывести можно не всё?':
    'Varför kan jag inte ta ut allt?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Bara det du tjänat kan tas ut. CUBE som krediterats som gåva eller bonus kan användas inne i plattformen men inte tas ut; annars hade det räckt att dela ut gåvor och lösa in dem.',
  'Какие монеты поддерживаются?':
    'Vilka valutor stöds?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 valutor och deras nätverk: BTC, ETH, USDT, USDC, BNB och elva till från toppen efter omsättning. Hela listan med nätverken finns i swap-fönstret.',
  'Что если отправил не в ту сеть?':
    'Vad händer om jag skickade till fel nätverk?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'En överföring i en blockkedja går inte att vända. Skriv till supporten direkt: ibland går det att göra något, men det kan ingen lova. Därför måste nätverket i begäran och i din plånbok vara detsamma.',
  'Берёте ли вы ключи от бирж?':
    'Tar ni emot börsnycklar?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Nej. Vi ber inte om och tar inte emot börsnycklar, seed-fraser eller åtkomst till din plånbok. Om någon ber om det i plattformens namn är det en bedragare.',
  'Платите ли вы налоги за меня?':
    'Betalar ni mina skatter?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Nej. Det du är skyldig staten reder du ut och betalar själv. Vi är inget skatteombud.',
  'Ключи и подписка':
    'Nycklar och abonnemang',
  'Какие бывают ключи?':
    'Vilka nycklar finns?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free är grunden, Silver är utökat, Gold ger fler kuber och analys. Nyckeln uppgraderas med CUBE i nyckelbutiken.',
  'Что даёт Premium?':
    'Vad ger Premium?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'En andel av belöningspotten efter ditt bidrag under månaden, externa plånböcker kopplade för visning, statistik och en ranking, förtur i signalerna, ett märke i profilen och i chattarna, och slutna Premium-kuber.',
  'Сколько стоит подписка?':
    'Vad kostar abonnemanget?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 i månaden eller $59.99 om året.',
  'Как отменить подписку?':
    'Hur avslutar jag abonnemanget?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'När som helst: det löper ut den period du betalat för och förnyas inte. Det som betalats för den pågående perioden betalas inte tillbaka, utom där lagen kräver det.',
  'Я потерял ключ: что делать?':
    'Jag har tappat min nyckel, vad gör jag?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Den går inte att få tillbaka. Vi ber varken om e-post eller telefonnummer, så vi har inget sätt att bekräfta att kontot är ditt. Nyckeln är kontot; förvara den där du inte tappar den.',
  'Можно ли передать ключ другому?':
    'Kan jag ge min nyckel till någon annan?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Det kan du, men allt som görs med den räknas som gjort av dig.',
  'Кубы и группы':
    'Kuber och grupper',
  'Что такое куб?':
    'Vad är en kub?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'En kub är en egen värld inne i plattformen: eget namn, omslag, chatt, flöde, privata rum och livstid. Kuber syns på kartan och du kan gå in i dem.',
  'Как создать куб?':
    'Hur skapar jag en kub?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Med ”+” i världen eller i Mitt universum. Du anger namn, omslag, typ och livstid. Folk bjuder du in med en länk eller med kubens nyckel.',
  'Что такое таймер жизни куба?':
    'Vad är kubens livstimer?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'En kub lever en bestämd tid och stänger sedan. Tiden väljs när du skapar den, från en timme till ett år.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Vad är grupper?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Offentliga gemenskaper: en gemensam chatt, ett flöde av händelser och en lista över medlemmar.',
  'Как найти куб или человека?':
    'Hur hittar jag en kub eller en person?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Skriv det här: ”hitta kuben Art”, ”@anna”, ”fotogrupp”. Jag söker i plattformen och visar kort: kuber, människor, grupper och sändningar som pågår just nu.',
  'Лента и посты':
    'Flöde och inlägg',
  'Как выложить пост?':
    'Hur publicerar jag ett inlägg?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Med skapa-knappen i flödet. Video, bild, rubrik och beskrivning är alla tillåtna.',
  'Почему пост не опубликовался?':
    'Varför publicerades inte mitt inlägg?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Texten klarade inte granskningen före publicering. Meddelandet visar skälet: förbjudna varor, bedrägeri, hot och annat. Reglerna finns i Dokument, och om det är ett fel, skriv till supporten.',
  'Что дают реакции?':
    'Vad ger reaktionerna?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'En reaktion under ett inlägg ger upphovsmannen CUBE. Per dag kan upp till 500 gillningar ges.',
  'Как пожаловаться на пост?':
    'Hur anmäler jag ett inlägg?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Under varje inlägg och varje meddelande finns en anmälningsknapp. En anmälan går till en människa för granskning.',
  'Сколько просмотров нужно для начисления?':
    'Hur många visningar behövs för en belöning?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Från 10 tusen riktiga visningar: egna inlägg och kommentarer börjar ge CUBE från den gränsen.',
  'Игра с кубами':
    'Spelet med kuberna',
  'Как играть кубами?':
    'Hur spelar man med kuberna?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Spelknappen finns på kartan. Kuberna flyger inne i väggar och kan inte komma ut. Handlingarna trycks med en knapp, visas med handen framför kameran eller sägs högt.',
  'Что такое режимы и толчки?':
    'Vad är lägen och stötar?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Stötar är sprängning, kast, uppkast, fyrverkeri och kaos: de går en gång och verkar över allt. Lägen håller tills du släcker dem och de läggs ihop: gravitation (fall ELLER tyngdlöshet), magnet, virvel, frysning.',
  'Как работают жесты рукой?':
    'Hur fungerar handgesterna?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'En rörelse i sidled är ett kast, uppåt ett uppkast, nedåt ett fall, handflatan framåt en sprängning, en cirkel en virvel, båda händerna kaos. Bildrutorna bearbetas på din egen enhet och går ingenstans.',
  'Какие есть формы?':
    'Vilka former finns?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kub, kristall, triangel, oktaeder, sfär, pyramid, prisma, stjärna, ikosaeder, ring, dollar, euro, yuan, och din egen bild. Plus ”blandat”, där varje föremål har sin egen form.',
  'Как поставить свою картинку?':
    'Hur lägger jag in min egen bild?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'I spelet → Föremålets form → rutan ”Min”. Kvadratisk är bäst; en lodrät 9:16 beskärs från mitten. Tryck på ”Min” igen för att byta den.',
  'Можно ли поставить видео?':
    'Går det med video?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Det går, upp till 15 sekunder. Längre tas inte emot. Videon klarar en omladdning av sidan.',
  'Кто такие персонажи?':
    'Vilka är figurerna?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Åtta figurer: katt, granne, hund, robot, spöke, panda, groda, utomjording. Du kan klappa dem, kittla dem och skaka om dem, och de svarar med röst och rörelse.',
  'Как добавить своё действие?':
    'Hur lägger jag till min egen handling?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Med en knapp i avsnittet för figurerna: namn, kommando, beskrivning och vad den görs med — handen, foten, huvudet eller hela kroppen. Själva handlingen väljs bland sexton färdiga effekter.',
  'Как крутятся предметы?':
    'Hur roterar föremålen?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Fem lägen: längs axeln, mot axeln, över toppen, under botten och huller om buller. Rotationen från ett kast läggs till det valda läget.',
  'Как начать эфир?':
    'Hur startar jag en sändning?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Knappen Sändning i flödet eller röstkommandot ”sändning”. Du väljer rubrik och läge och är i luften. Tittarna får bilden direkt från dig.',
  'Какие режимы эфира?':
    'Vilka sändningslägen finns?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera och kuber: scenen ovanpå kamerabilden, med gesterna i gång. Bara kuber: scenen utan kamera. Ren sändning: bara kameran, utan kommentarer, reaktioner och gåvor.',
  'Сколько зрителей выдержит эфир?':
    'Hur många tittare klarar en sändning?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Bilden går direkt från den som sänder till varje tittare, så det beror på hans anslutning: på en hemmalinje ser tio till femton personer bekvämt. En större sal kräver en reläserver.',
  'Что такое подарки?':
    'Vad är gåvorna?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Trettio gåvor, från en Ros för 1 CUBE till en Legendkub för 1000. En gåva är en överföring av CUBE till den som sänder i sin helhet; plattformen tar ingenting.',
  'Как закончить эфир?':
    'Hur avslutar jag en sändning?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Knappen Avsluta sändningen i fönstrets rubrik, syns i varje läge. Att stänga fönstret med krysset stoppar inte sändningen: den fortsätter tills du trycker Avsluta.',
  'Голос и языки':
    'Röst och språk',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Vilka röstkommandon finns?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Mer än nittio: avsnitt, fönster, skapande, flödet, spelet, former, figurer, styrning. Hela listan med sökning finns på sidan Röstkommandon: kontomenyn → Röstkommandon, eller i Utseende, eller säg bara ”röstkommandon”.',
  'На каких языках работает голос?':
    'Vilka språk fungerar rösten på?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'På tjugo: ryska, engelska (och den indiska), ukrainska, tyska, franska (och den kanadensiska), spanska (och den latinamerikanska), italienska, portugisiska, polska, turkiska, arabiska (och den från Gulfen), vietnamesiska, kinesiska, japanska, koreanska, hindi. Språket väljs på kommandosidan och i Utseende.',
  'Как включить микрофон?':
    'Hur sätter jag på mikrofonen?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Mikrofonknappen finns i den övre raden. Trycker du på den lyssnar den, trycker du igen slutar den.',
  'Как выключить озвучку?':
    'Hur stänger jag av svaren med röst?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'På sidan Röstkommandon finns en omkopplare mellan svar högt och svar tyst. Rösten lyssnar i båda fallen; bara svaret skiljer sig.',
  'Куда уходит мой голос?':
    'Vart går min röst?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Igenkänningen gör själva webbläsaren. Chrome och webbläsare byggda på den skickar ljudet till Googles servrar; så är deras igenkänning byggd och plattformen bestämmer ingenting om det. Passar det dig inte, sätt inte på mikrofonen: allt finns med knappar också.',
  'Как поменять тему?':
    'Hur byter jag tema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Utseende → Tema: mörkt, ljust, eller Kamera, där bilden från din kamera är bakgrund.',
  'Что такое Цвет 1, 2 и 3?':
    'Vad är Färg 1, 2 och 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Färg 1 är rubrikerna, skrivraderna och flikarna. Färg 2 är själva fönstret: chattens bakgrund och kommentarslistan. Färg 3 är profilens omslag och ram. Var och en har sin egen genomskinlighetsreglage.',
  'Как поставить обои?':
    'Hur lägger jag in en bakgrund?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Utseende → Bakgrund: en färdig uppsättning eller din egen bild i 9:16. Färg 2 lägger sig över bakgrunden som en ton, och reglaget bestämmer hur starkt.',
  'Правила и безопасность':
    'Regler och säkerhet',
  'Что нельзя выкладывать?':
    'Vad får inte publiceras?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Material med barn, hot och uppmaningar till våld, hets mot folkgrupp, bedrägerier, förbjudna varor, andras arbete utan rätt till det, att utge sig för någon annan, spam och låtsad aktivitet. I sin helhet i Gemenskapens regler.',
  'Как работает модерация?':
    'Hur fungerar granskningen?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Inlägg, kommentarer, gruppmeddelanden, namn och beskrivningar granskas på servern före publicering. Det som är klart förbjudet publiceras inte, det tveksamma går till en människa. Marknaden och de personliga samtalen granskas inte.',
  'Виден ли мой IP?':
    'Syns min IP?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Ja, servern ser den, som varje sajt på internet: utan IP skulle den inte veta vart svaret ska skickas. Det gömda läget gömmer ditt namn och din bild för andra människor, men inte för servern.',
  'Что вы храните обо мне?':
    'Vad sparar ni om mig?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Kontots nyckel, profilen du fyllt i själv, ditt innehåll, de dagliga räknarna och anslutningens tekniska uppgifter. Varken e-post, telefonnummer, lösenord eller plånboksnycklar.',
  'Куда жаловаться?':
    'Var klagar jag?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Om ett innehåll, med anmälningsknappen under det. Om allt annat, genom supporten inne i plattformen.',
  'Где документы?':
    'Var finns dokumenten?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Kontomenyn → Dokument. De är sju: villkoren, integritetspolicyn, gemenskapens regler, belöningar och gränser, swap och betalningar, abonnemang och nycklar, kamera och mikrofon.',
  'Что такое карта?':
    'Vad är kartan?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Plattformens karta: 177 länder och 1150 städer med riktiga koordinater, solens läge räknat för den aktuella tiden, nattsidan och gryningen exakt där de är på himlen. Tjugo vyer: från rymden, jorden om natten, dag och natt, OpenStreetMaps gator, vädret, jordbävningarna, tidszonerna, våra kuber och sändningar. Den öppnas från kontomenyn eller genom att säga ”karta”.',
  'Как проложить маршрут на карте?':
    'Hur ritar jag en rutt på kartan?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Tryck på början på kartan, sedan på slutet, och välj en av tjugo vägar. Storcirkeln och loxodromen — så som man verkligen flyger och seglar. Bara över land och bara över vatten: en riktig vägsökning genom kontinenterna utan ett enda steg i det andra elementet. Längs skuggan och längs ljuset: längs nattsidan. Förbi kuber, sändningar och människor: genom våra nålar. Rutten längs gatorna räknas av den externa motorn OSRM; svarar den inte, säger vi det.',
  'Видно ли меня на карте?':
    'Syns jag på kartan?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Bara om du själv satt ut nålen ”jag är här”. Den lever en halvtimme och raderar sig själv, koordinaterna rundas av till kilometern redan innan de går till servern, och ”ta bort mig från kartan” raderar posten i stället för att gömma den. Utan den nålen finns du inte på kartan alls.',
  'Есть ли на карте спутник и пробки?':
    'Har kartan satellit och trafik?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nej. Satellitbilder och trafik ges av betalda leverantörer med en nyckel. Platsen för de lagren är klar: du sätter in en nyckel och de tänds. Så länge det inte finns någon nyckel säger kartan det rakt ut i stället för att rita en vacker lögn.',
  'Что такое забег по улице?':
    'Vad är gatuloppet?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Ett hopp inne i kartan: vy i första person, de riktiga husen och kurvorna på din egen gata. Du springer själv: svep i sidled för att byta fil, i en korsning för att svänga, uppåt för att hoppa, nedåt för att glida. Du samlar kuber och väjer för hinder och strålar. På vägen möter du andras sändningar, kuber och skyltfönster. Det finns också en lugn promenad med joystick. Det öppnas från kontomenyn, från kartan med knappen Ut på gatan, eller genom att säga ”lopp”.',
  'Откуда берутся дома в забеге?':
    'Varifrån kommer husen i loppet?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Från OpenStreetMap: riktiga husformer och antal våningar, riktiga vägar med sin bredd och sina kurvor. En våning räknar vi som tre meter; saknas antalet våningar tas höjden från husets fotavtryck. Gatufotografier finns inte, dem ger betalda leverantörer. Är kartservern upptagen säger spelet det ärligt och bygger vårt eget kvarter.',
  'Что такое шопинг в маркетплейсе?':
    'Vad är shoppingen på marknaden?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Marknadens andra avsnitt, för saker och inte för filer: sexton kategorier från kläder till konst, ett kort med märket, storlekar, färger, egenskaper och upp till tjugo foton. På varje kort roterar en figur med märkets namn, vilken som helst av tjugo former. Avsnittet rör inte pengarna: betalning och leverans sker mellan människorna, därför står det ”skriv till säljaren” och inte ”köp med CUBE”.',
  'Игры, чаты и новое':
    'Spel, chattar och nytt',
  'Сколько игр в зале?':
    'Hur många spel finns i hallen?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Åtta, och alla går att spela: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. De styrs med fingret och med tangentbordet.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Ger spelen CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nej. Spelen ger poäng och ett personligt rekord, som ligger i din webbläsare. CUBE krediteras av servern för visningar och ur den gemensamma potten; att prägla mynt i en webbläsare vore en lögn.',
  'Как играть в DataMine?':
    'Hur spelar man DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Ett fält åtta gånger åtta. Du trycker på en ruta och gräver fram data; siffran visar hur många virus som finns intill. Ett långt tryck sätter en flagga. Tre liv, sedan ett nytt lager.',
  'Как играть в CipherBreak?':
    'Hur spelar man CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Gissa en kod på fyra tecken. Efter ett försök betyder en ifylld ring att tecknet står på sin plats, en tom att det finns i koden men någon annanstans. Åtta försök.',
  'Как играть в Phantom Escape?':
    'Hur spelar man Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Samla fem nycklar och gå ut genom dörren. Spökena jagar dig längs den kortaste vägen, och på varje våning är de fler.',
  'Как играть в Block Trade?':
    'Hur spelar man Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'En och en halv minut, med 1000 i handen. Köp billigare, sälj dyrare. Ditt resultat är allt över tusenlappen.',
  'Как играть в TrustChain?':
    'Hur spelar man TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Tryck på blocken i stigande ordning medan klockan går. Ett fel och kedjan brister. Varje runda blir kedjan längre.',
  'Как играть в CubeBuilder?':
    'Hur spelar man CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Plattan går i sidled, och ett tryck släpper den. Det som sticker ut faller av, och plattan blir smalare. Missar du tornet är det slut.',
  'Что показывает строка курсов?':
    'Vad visar kursraden?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Trettio valutor med pris och dagens förändring. Uppgifterna kommer genom vår server, som håller en halv minut i minnet. Raden kryper inte: ett helt antal rutor går in på skärmen och de byts med några sekunders mellanrum.',
  'Что значит число кубов в шапке?':
    'Vad betyder antalet kuber i rubriken?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Hur många kuber som finns i din värld just nu, de du ser framför dig. Inte det totala antalet kuber i plattformen.',
  'Можно ли войти вторым аккаунтом?':
    'Kan jag logga in med ett andra konto?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Det kan du. Kontomenyn → Lägg till konto: den nuvarande nyckeln ligger kvar i listan, och du går tillbaka till den med ett tryck från samma meny. Upp till åtta minns.',
  'Зачем «Сохранить» в окне игры?':
    'Vad är Spara till för i spelfönstret?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Det minns föremålets form, figuren, gesterna och storleken. Nästa gång du kommer in är allt där du lämnade det.',
  'Чем режим отличается от толчка?':
    'Hur skiljer sig ett läge från en stöt?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Ett läge håller tills du släcker det med ett andra tryck, och det lyser kvar. En stöt går en gång och lyser inte; den lämnar bara ett tunt märke om att den tryckts senast.',
  'Почему кубы больше не исчезают?':
    'Varför försvinner kuberna inte längre?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Skyltfönstrets visningskuber levde kort, fem och femton minuter. Nu får de minst ett halvt dygn och startas om innan de tar slut. Riktiga kuber lever exakt så länge de fick när de skapades.',
  'Как сделать фото прямо в чат?':
    'Hur fotograferar jag direkt i chatten?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Gemet → Kamera öppnar vår egen kamera. Ett tryck tar ett foto, ett långt tryck spelar in video upp till en minut. Galleriet är punkten intill, Foto eller video.',
  'Что такое галерея переписки?':
    'Vad är chattens galleri?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Förstoringsglaset i chattens rubrik öppnar sökningen, och ovanför den en hylla: foton, videor, ljud och länkar från den chatten. Den samlas ur själva meddelandena och ingenting går någonstans.',
  'Как удалить сразу несколько сообщений?':
    'Hur raderar jag flera meddelanden på en gång?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Ett långt tryck på ett meddelande sätter på markeringen, sedan kryssar du av dem du vill och trycker Radera i den nedre raden. Upp till hundra åt gången.',
  'Можно ли изменить своё сообщение?':
    'Kan jag rätta mitt eget meddelande?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Det kan du, dina egna och bara textmeddelanden: meddelandets meny → Redigera. Intill visas märket ”redigerat”. Chatten stängs inte medan du gör det.',
  'Что такое сторис?':
    'Vad är historierna?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Korta inlägg som lever ett dygn, ovanför listan med chattar: ett foto eller en video på upp till en minut. De ses en efter en och försvinner av sig själva efter ett dygn.',
  'Сколько фото можно в группу?':
    'Hur många foton får plats i en grupp?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Upp till sju foton, eller en video på upp till en minut. Plus en ikon ur uppsättningen och etiketter under beskrivningen.',
  'Что такое теги группы?':
    'Vad är gruppens etiketter?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Några ord, åtskilda med komman, som gruppen hittas med i sökningen.',
  'Видно ли участников группы?':
    'Syns gruppens medlemmar?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Ägaren bestämmer när den skapas: medlemslistan kan visas för alla eller förbli synlig bara för ägaren.',
  'Почему поле ссылки на видео убрали?':
    'Varför tog ni bort fältet för videolänk?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Någon annans länk gick sönder när den togs bort i andra änden, och plattformen kunde inte svara för det. En video laddas upp som en fil i vårt eget lager.',
  'Сколько длится видео в посте?':
    'Hur lång får videon i ett inlägg vara?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Just nu en fil på upp till 50 MB. På en större server blir det steg: 15 sekunder, en minut, tre minuter och femton.',
  'Что делает кнопка «Чаевые автору»?':
    'Vad gör knappen Dricks till upphovsmannen?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Den överför CUBE från ditt saldo till inläggets upphovsman i sin helhet, utan andel för plattformen. Beloppet är 1, 5, 10, 25 eller ditt eget.',
  'Как пожаловаться на видео?':
    'Hur anmäler jag en video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'De tre punkterna under videon → Anmäl: du väljer ett skäl och kan lägga till egna ord. Det går till en levande människa.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Hur delar jag ett inlägg?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'De tre punkterna under videon → Dela. Du får en länk du kan skicka till vem du vill.',
  'Куда девается «Сохранить»?':
    'Vart lägger Spara saker?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'I din profil, på hyllan med det sparade, under bokmärkesikonen nedanför profilens flikar.',
  'Что видно в моём профиле?':
    'Vad syns i min profil?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Två flikar: Shorts för de korta videorna, Inlägg för allt annat. Ett tryck på ett kort öppnar det precis som i flödet. Redigera och radera ser bara upphovsmannen.',
  'Как изменить профиль?':
    'Hur redigerar jag min profil?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Pennknappen i din egen profil: namn, @användarnamn, beskrivning, kontotyp, status, länkar och adress.',
  'Чем бизнес-аккаунт отличается?':
    'Hur skiljer sig ett företagskonto?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Offentligt betyder att alla ser dig. Gömt betyder att ditt namn och din bild är gömda för andra människor. Företag lägger till en beskrivning av din verksamhet, länkar och en adress.',
  'Что показывает «онлайн» в шапке?':
    'Vad visar ”online” i rubriken?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Hur många människor som är i plattformen just nu enligt servern. Det uppdateras varje halvminut.',
  'Закрывается ли игра вместе с эфиром?':
    'Stängs spelet tillsammans med sändningen?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Ja. Hade sändningen kuber i sig stänger spelet av sig självt när den tar slut; annars hade föremålen flugit över en tom karta.',
  'Есть ли смайлы в эфире?':
    'Finns det emoji i en sändning?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Det finns, emoji-knappen intill skrivraden håller hela den gemensamma uppsättningen, samma som i chattarna.',
  'Что такое «Все вопросы»?':
    'Vad är Alla frågor?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Hjälparens fullständiga handbok: mer än hundra frågor med svar, sorterade i avsnitt, med sökning på rubriken.',
  'Куда делась кнопка NET?':
    'Vart tog NET-knappen vägen?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Vi tog bort den. Plattformen söker inte i det stora internet, och knappen lovade att den gjorde det. Hjälparen svarar om plattformen och hittar kuber, människor, grupper och sändningar.',
  'Почему звук повторялся дважды?':
    'Varför upprepades ljudet två gånger?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Två olika bitar kod talade och ingen av dem avbröt den andra. Nu avbryter varje fras den förra, och samma text upprepas inte två gånger i rad.',
  'Как выключить голос совсем?':
    'Hur stänger jag av rösten helt?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'På sidan Röstkommandon finns en omkopplare mellan svar högt och svar tyst. Nu stänger den av på riktigt: förut styrde den bara en ingång och rösten gick runt den.',
  'Что хранится только в моём браузере?':
    'Vad sparas bara i min webbläsare?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Spelrekorden, inställningarna för spelet med kuberna, det valda språket, temat och bakgrunden, och listan över dina konton. Inget av det går till servern.',
  'Почему просят подтвердить удаление?':
    'Varför ber ni om bekräftelse för en radering?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Därför att den inte går att ta tillbaka. I chattarna frågar vi också vems kopia som ska bort, bara din eller allas.',
  'Что такое «У всех» при удалении?':
    'Vad betyder ”För alla” vid radering?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '”För mig” gömmer meddelandet bara från din egen skärm. ”För alla” ber servern att ta bort det hos den andra människan också.',
  'Сколько живёт сообщение с таймером?':
    'Hur länge lever ett meddelande med tidsgräns?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Så länge du valt: fem minuter, en timme, ett dygn, en vecka eller för alltid. Knappen ∞ intill skrivraden.',
  'Как переслать сообщение?':
    'Hur vidarebefordrar jag ett meddelande?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Meddelandets meny → Vidarebefordra. Du väljer till vem.',
  'Что делает «В избранное»?':
    'Vad gör Spara i favoriter?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Det lägger meddelandet i Sparat — din egen anteckningsbok med noteringar och sparade saker.',
  'Как найти сообщение в переписке?':
    'Hur hittar jag ett meddelande i en chatt?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Förstoringsglaset i chattens rubrik: det söker i texten, och pilarna hoppar mellan träffarna. Hyllan med foton, videor, ljud och länkar finns på samma ställe.',
  'Что такое «Пригласить в группу»?':
    'Vad är Bjud in till gruppen?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'En länk ur gruppens uppgifter: den som öppnar den går in i gruppen.',
  'Можно ли выйти из группы?':
    'Kan jag gå ur en grupp?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Det kan du, med en knapp i gruppens uppgifter. Går ägaren ur raderas inte själva gruppen.',
  'Сколько форм у предметов?':
    'Hur många former har föremålen?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Tjugo, plus din egen bild eller video ovanpå dem, och läget ”blandat”.',
  'Что такое шопинг?':
    'Vad är shoppingen?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Marknadens andra avsnitt, för saker: sexton kategorier, ett kort med märket och upp till tjugo foton, och en roterande figur med märkets namn. Betalning och leverans sker mellan människorna.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Fråga med ord: till exempel ”hur tjänar jag” eller ”hitta kuben Art”.',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Vad ska jag söka efter? Skriv något som ”hitta kuben Art” eller ”@anna”.',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Om «{что}» har jag inget svar. Det jag kan är plattformen: CUBE och belöningar, gränser, swappen, plånboken, nycklarna, signalerna, kuberna och grupperna, spelet med kuberna, sändningarna, utseendet och röstkommandona.'

});
