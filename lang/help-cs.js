/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-cs.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('cs', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Příspěvky, videa a kolečka. Odtud se otevírají i komentáře a reakce.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Soukromé zprávy, hlasové zprávy a kulatá videa, uložené.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Veřejná společenství: společný chat, proud událostí, členové.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Obchodní signály: směr, vstup, cíl a stop. Cenu hlídá server sám.',
  'Объявления и обмен между людьми.':
    'Inzeráty a výměna mezi lidmi.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Sazby odměn, swap a všechno, za co chodí CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Tvůj zůstatek CUBE, dobití, výběry a historie.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Co se děje s tvými kostkami a příspěvky, v číslech.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE je vnitřní měna platformy. Server ji připisuje jednou denně za aktivitu: aktivní den, vlastní příspěvky a komentáře, pozvaní lidé. Ve swapu je cena CUBE pevná: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Server uzavírá odměny jednou denně. Počítá se: aktivní den online, vlastní příspěvky a komentáře od 10 tisíc zhlédnutí, pozvaní, kteří zaplatili předplatné, a příplatky za týden, měsíc a rok v řadě. Přesné sazby jsou vždy aktuální v sekci Vydělat.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Aby se nedalo nic nafouknout podvodem, drží server denní limity: 20 nových chatů, 500 lajků, 50 komentářů, 500 odběrů. Zhlédnutí se nafouknout nedají vůbec, počítají se jen ze skutečných zobrazení. Kolik dnes zbývá, je vidět ve Vydělat.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swap mění krypto na CUBE a zpět: 16 mincí a jejich sítě, kurz se bere v okamžiku žádosti, CUBE se počítá po $0.50. Příjem a výběr jdou přes platebního poskytovatele; cizí klíče od burz a peněženek nebereme ani neuchováváme. Vybrat lze jen vydělané, ne to, co bylo připsáno darem.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Peněženka ukazuje zůstatek CUBE, historii a tlačítka dobití a výběru. Dobití i výběr jdou přes swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Klíč otevírá možnosti: Free je základ, Silver je rozšíření, Gold dává víc kostek a statistiky. Klíče se kupují za CUBE. Předplatné Premium dává podíl z fondu odměn podle tvého přínosu za měsíc.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Signál je směr, vstupní bod, cíl a stop. Server sám hlídá cenu a zavírá signál na cíli nebo na stopu. Klíče od burz nechceme: obchoduješ sám, u sebe.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Reakce pod příspěvkem přináší autorovi CUBE. Denně lze dát až 500 lajků, dál je server prostě nepočítá.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Kostka je tvůj vlastní prostor: chat, proud, soukromé místnosti a časovač života. Vytváří se tlačítkem «+» ve světě. Lidi zveš odkazem nebo klíčem kostky.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Kostka je samostatný svět uvnitř platformy: má své jméno, obálku, chat, proud a dobu života. Kostky jsou vidět na mapě, dá se mezi nimi chodit a dá se do nich vstupovat.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Skupiny jsou veřejná společenství: společný chat, proud událostí a seznam členů. Vlastní si můžeš založit v sekci Skupiny.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Hra s kostkami se otevírá tlačítkem na mapě. Akce se dělí na postrky (výbuch, hody, vyhození, ohňostroj, chaos) a režimy (upustit nebo beztíže, jedno ze dvou, magnet, vír, zmrazení). Režimy se sčítají a drží, dokud je nevypneš. Všechno to funguje tlačítkem, gestem před kamerou i hlasem.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'Ve hře se dají zapnout gesta: mávnutí do strany je hod, nahoru vyhození, dolů upuštění, dlaň dopředu výbuch, kruh vír, obě ruce chaos. Obraz z kamery nikam nejde, všechno se počítá přímo na tvém zařízení.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Předměty nejsou jen kostky: krystal, trojúhelník, osmistěn, koule, pyramida, hranol, hvězda, dvacetistěn, prsten, dolar, euro, jüan. Můžeš dát vlastní obrázek nebo vlastní video do 15 sekund; svislé 9:16 se ořízne ze středu na čtverec.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Ve hře je osm postav: kočka, soused, pes, robot, duch, panda, žába a mimozemšťan. Dají se hladit, lechtat a třást s nimi, odpovídají hlasem i pohybem. Vlastní akci přidáš tlačítkem: jméno, příkaz, popis a čím se provádí — rukou, nohou, hlavou nebo celým tělem.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Vzhled mění barvu a průhlednost oken: Barva 1 jsou záhlaví a lišty, Barva 2 je samo okno, Barva 3 je obálka a rámeček portfolia. Pozadí pro konverzace se vybírá na stejném místě, vlastní jde dát v 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Hlasem funguje skoro všechno: sekce, hra, tvary, postavy, víc než devadesát příkazů. Úplný seznam ve všech dvaceti jazycích je na stránce Hlasové příkazy: otevře se ze Vzhledu nebo slovy «hlasové příkazy». Přepínač odpovídat nahlas nebo potichu je tam také.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Dokumenty se otevírají z nabídky účtu → Dokumenty. Je jich sedm: podmínky užívání, zásady soukromí, pravidla komunity, odměny a limity, swap a platby, předplatné a klíče, kamera a mikrofon. Jde to i hlasem, řekni «dokumenty».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Pozvánky dávají CUBE, když pozvaný zaplatí předplatné. Vlastní odkaz je v sekci pozvánek.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Portfolio je výkladní skříň profilu: obálka, popis a práce. Vzhled obálky a rámečku se mění Barvou 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Statistiky ukazují, co se děje s tvými kostkami a příspěvky: zhlédnutí, reakce, příliv lidí.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'V profilu můžeš skrýt jméno i obrázek, místo nich bude anonymní číslo. Ale to tě skryje před lidmi, ne před serverem: IP adresu spojení vidí každá stránka na internetu, i ta naše. Nic, co by IP skrývalo, v aplikaci není.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Tržiště jsou inzeráty a výměna mezi lidmi.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Příspěvky, komentáře, reklama, jména a popisy procházejí kontrolou. Jasně zakázané se nezveřejní, sporné jde na ruční posouzení. Tržiště se tato kontrola netýká.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Ahoj. Jsem pomocník platformy: odpovídám na kostky, odměny, peněženku, hru a nastavení, a taky hledám kostky, lidi a skupiny. Ptej se slovy, třeba «jak vydělat», «najdi kostku Art», «kdo je @anna». O zbytku světa je vedle záložka NET.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE a peníze',
  'Что такое CUBE?':
    'Co je CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE jsou vnitřní body platformy. Server je připisuje jednou denně za aktivitu. Ve swapu je cena pevná: 1 CUBE = $0.50. Není to cenný papír ani slib výdělku.',
  'Как заработать?':
    'Jak vydělat?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Počítá server a uzavírá den jednou za 24 hodin: aktivní den online, vlastní příspěvky a komentáře od 10 tisíc zhlédnutí, reakce pod tvými příspěvky, pozvaní, kteří zaplatili předplatné, a příplatky za týden, měsíc a rok v řadě. Přesné sazby jsou ve Vydělat.',
  'Какие лимиты в сутки?':
    'Jaké jsou denní limity?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 nových chatů, 500 lajků, 50 komentářů, 500 odběrů. Zhlédnutí se nafouknout nedají vůbec. Počítá se po dnech UTC; když narazíš na limit, akce se prostě nezapočítá a trest za to není.',
  'Что считается накруткой?':
    'Co se považuje za podvod?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Balíky účtů, automatické lajky a odběry, nákup zhlédnutí, domluva na vzájemných reakcích. Odměny získané takto se odepisují.',
  'Как работает свайп?':
    'Jak funguje swap?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swap mění krypto na CUBE a zpět: 16 mincí a jejich sítě. Kurz krypta se bere v okamžiku žádosti, CUBE se počítá po $0.50. Příjem a odeslání jdou přes platebního poskytovatele.',
  'Как пополнить кошелёк?':
    'Jak dobít peněženku?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Přes swap: vytvoříš žádost, dostaneš adresu a částku a pošleš převod ze své peněženky. Je důležité, aby se mince a síť shodovaly se žádostí, jinak se převod nevrátí.',
  'Как вывести деньги?':
    'Jak vybrat peníze?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Žádost o výběr se vytvoří na tvou adresu, poplatek sítě platí příjemce. Ručně zkontrolujeme a odešleme, obvykle během pracovního dne.',
  'Почему вывести можно не всё?':
    'Proč nejde vybrat všechno?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Vybírá se jen vydělané. CUBE připsané darem nebo bonusem se utratí uvnitř platformy, ale nevybírají se; jinak by stačilo rozdat dary a proměnit je v peníze.',
  'Какие монеты поддерживаются?':
    'Jaké mince jsou podporované?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 mincí a jejich sítě: BTC, ETH, USDT, USDC, BNB a dalších jedenáct z prvních podle obratu. Úplný seznam i se sítěmi je v okně swapu.',
  'Что если отправил не в ту сеть?':
    'Co když jsem poslal do špatné sítě?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Převod v blockchainu se vrátit nedá. Napiš hned podpoře: občas pomoci jde, ale slíbit to nelze. Proto se síť v žádosti a v peněžence musí shodovat.',
  'Берёте ли вы ключи от бирж?':
    'Berete klíče od burz?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Ne. Ani klíče od burz, ani seed fráze, ani přístup k peněžence nechceme a nepřijímáme. Pokud o to někdo jménem platformy žádá, je to podvodník.',
  'Платите ли вы налоги за меня?':
    'Platíte za mě daně?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Ne. Co dlužíš státu, rozhoduješ a platíš sám. Nejsme daňový zástupce.',
  'Ключи и подписка':
    'Klíče a předplatné',
  'Какие бывают ключи?':
    'Jaké jsou klíče?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free je základ, Silver je rozšíření, Gold dává víc kostek a statistiky. Klíč se zvyšuje za CUBE v Obchodu s klíči.',
  'Что даёт Premium?':
    'Co dává Premium?',
  'Долю в фонде наград, эфиры, свои сигналы, аналитику куба, создание файлов, продажу на маркетплейсе, чаевые и подарки, больше кубов и больше места под файлы. Полный список — в «Документах».':
    'Podíl na fondu odměn, přenosy, vlastní signály, analytiku kostky, zakládání souborů, prodej na tržišti, dýška a dárky, víc kostek a víc místa. Celý seznam je v «Dokumentech».',
  'Сколько стоит подписка?':
    'Kolik stojí předplatné?',
  'Сильвер — 14 CUBE в месяц или 120 CUBE за год. Голд — 30 CUBE в месяц или 252 CUBE за год. Точные цифры всегда в окне подписки.':
    'Stříbro stojí 14 CUBE měsíčně nebo 120 CUBE za rok. Zlato 30 CUBE měsíčně nebo 252 CUBE za rok. Přesná čísla jsou vždy v okně předplatného.',
  'Как отменить подписку?':
    'Jak zrušit předplatné?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Kdykoli: doběhne zaplacenou dobu a neprodlouží se. Zaplacené za běžné období se nevrací, kromě případů, kdy vrácení vyžaduje zákon.',
  'Я потерял ключ: что делать?':
    'Ztratil jsem klíč, co teď?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Obnovit ho nelze. Neptáme se na e-mail ani na telefon, takže nemáme čím ověřit, že účet je tvůj. Klíč je účet sám; uchovej ho tam, kde ho neztratíš.',
  'Можно ли передать ключ другому?':
    'Můžu klíč předat někomu jinému?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Můžeš, ale všechno, co se pod ním udělá, se počítá jako udělané tebou.',
  'Кубы и группы':
    'Kostky a skupiny',
  'Что такое куб?':
    'Co je kostka?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Kostka je samostatný svět uvnitř platformy: vlastní jméno, obálka, chat, proud, soukromé místnosti a doba života. Kostky jsou vidět na mapě a dá se do nich vstupovat.',
  'Как создать куб?':
    'Jak vytvořit kostku?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Tlačítkem «+» ve světě nebo v Mém vesmíru. Zadáš jméno, obálku, typ a dobu života. Lidi zveš odkazem nebo klíčem kostky.',
  'Что такое таймер жизни куба?':
    'Co je časovač života kostky?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Kostka žije zadanou dobu a potom se zavře. Doba se volí při vytváření, od hodiny do roku.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Co jsou skupiny?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Veřejná společenství: společný chat, proud událostí a seznam členů.',
  'Как найти куб или человека?':
    'Jak najít kostku nebo člověka?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Napiš to rovnou sem: «najdi kostku Art», «@anna», «fotoskupina». Prohledám platformu a ukážu karty: kostky, lidi, skupiny a vysílání, která právě běží.',
  'Лента и посты':
    'Proud a příspěvky',
  'Как выложить пост?':
    'Jak zveřejnit příspěvek?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Tlačítkem pro vytvoření v proudu. Lze video, obrázek, nadpis a popis.',
  'Почему пост не опубликовался?':
    'Proč se můj příspěvek nezveřejnil?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Text neprošel kontrolou před zveřejněním. Hláška uvádí důvod: zakázané zboží, podvod, výhrůžky a podobně. Pravidla jsou v Dokumentech, a pokud je to omyl, napiš podpoře.',
  'Что дают реакции?':
    'Co dávají reakce?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Reakce pod příspěvkem přináší autorovi CUBE. Denně lze dát až 500 lajků.',
  'Как пожаловаться на пост?':
    'Jak nahlásit příspěvek?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Pod každým příspěvkem i každou zprávou je tlačítko pro nahlášení. Hlášení jde na ruční posouzení.',
  'Сколько просмотров нужно для начисления?':
    'Kolik zhlédnutí je potřeba na odměnu?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Od 10 tisíc skutečných zobrazení: vlastní příspěvky a komentáře začínají přinášet CUBE od této hranice.',
  'Игра с кубами':
    'Hra s kostkami',
  'Как играть кубами?':
    'Jak hrát s kostkami?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Tlačítko hry je na mapě. Kostky létají uvnitř stěn a nemohou je opustit. Akce se mačkají tlačítkem, ukazují rukou před kamerou nebo říkají nahlas.',
  'Что такое режимы и толчки?':
    'Co jsou režimy a postrky?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Postrky jsou výbuch, hody, vyhození, ohňostroj a chaos: jdou jednou a působí nad vším. Režimy drží, dokud je nevypneš, a sčítají se: gravitace (upustit NEBO beztíže), magnet, vír, zmrazení.',
  'Как работают жесты рукой?':
    'Jak fungují gesta rukou?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Mávnutí do strany je hod, nahoru vyhození, dolů upuštění, dlaň dopředu výbuch, kruh vír, obě ruce chaos. Snímky se zpracovávají přímo na tvém zařízení a nikam nejdou.',
  'Какие есть формы?':
    'Jaké jsou tvary?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kostka, krystal, trojúhelník, osmistěn, koule, pyramida, hranol, hvězda, dvacetistěn, prsten, dolar, euro, jüan a tvůj vlastní obrázek. K tomu «namíchané», kde má každý předmět svůj tvar.',
  'Как поставить свою картинку?':
    'Jak dát vlastní obrázek?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'Ve hře → Tvar předmětu → dlaždice «Můj». Nejlépe čtvercový; svislý 9:16 se ořízne ze středu. Stiskni «Můj» znovu a vyměníš ho.',
  'Можно ли поставить видео?':
    'Dá se použít video?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Dá, do 15 sekund. Delší se nepřijme. Video přežije i obnovení stránky.',
  'Кто такие персонажи?':
    'Kdo jsou postavy?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Osm postav: kočka, soused, pes, robot, duch, panda, žába, mimozemšťan. Dají se hladit, lechtat a třást s nimi, odpovídají hlasem i pohybem.',
  'Как добавить своё действие?':
    'Jak přidat vlastní akci?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Tlačítkem v sekci postav: jméno, příkaz, popis a čím se provádí — rukou, nohou, hlavou nebo celým tělem. Samotná akce se vybírá ze šestnácti hotových efektů.',
  'Как крутятся предметы?':
    'Jak se předměty otáčejí?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Pět režimů: po ose, proti ose, přes vršek, spodem a jak se dá. Otáčení z hodu se přičítá ke zvolenému režimu.',
  'Как начать эфир?':
    'Jak začít vysílání?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Tlačítko Vysílání v proudu nebo hlasový příkaz «vysílání». Vybereš název a režim a jsi v éteru. Diváci dostávají obraz přímo od tebe.',
  'Какие режимы эфира?':
    'Jaké jsou režimy vysílání?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera a kostky: scéna přes obraz z kamery, gesta fungují. Jen kostky: scéna bez kamery. Čisté vysílání: jen kamera, bez komentářů, reakcí a darů.',
  'Сколько зрителей выдержит эфир?':
    'Kolik diváků vysílání unese?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Obraz jde přímo od vysílajícího ke každému divákovi, takže záleží na jeho připojení: na domácí lince se pohodlně dívá deset až patnáct lidí. Větší sál potřebuje přenosový server.',
  'Что такое подарки?':
    'Co jsou dary?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Třicet darů, od Růže za 1 CUBE po Legendární kostku za 1000. Dar je převod CUBE vysílajícímu v plné výši; platforma si nebere nic.',
  'Как закончить эфир?':
    'Jak ukončit vysílání?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Tlačítko Ukončit vysílání v záhlaví okna, vidět je v každém režimu. Zavřít okno křížkem vysílání nezastaví: běží, dokud nestiskneš Ukončit.',
  'Голос и языки':
    'Hlas a jazyky',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Jaké jsou hlasové příkazy?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Víc než devadesát: sekce, okna, vytváření, proud, hra, tvary, postavy, ovládání. Úplný seznam s hledáním je na stránce Hlasové příkazy: nabídka účtu → Hlasové příkazy, nebo ve Vzhledu, nebo prostě řekni «hlasové příkazy».',
  'На каких языках работает голос?':
    'V jakých jazycích hlas funguje?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'Ve dvaceti: ruština, angličtina (i indická), ukrajinština, němčina, francouzština (i kanadská), španělština (i latinskoamerická), italština, portugalština, polština, turečtina, arabština (i zálivová), vietnamština, čínština, japonština, korejština, hindština. Jazyk se vybírá na stránce příkazů a ve Vzhledu.',
  'Как включить микрофон?':
    'Jak zapnout mikrofon?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Tlačítko mikrofonu je v horní liště. Stiskneš a poslouchá, stiskneš znovu a přestane.',
  'Как выключить озвучку?':
    'Jak vypnout mluvené odpovědi?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Na stránce Hlasové příkazy je přepínač mezi odpovídáním nahlas a potichu. Hlas poslouchá tak i tak; liší se jen odpověď.',
  'Куда уходит мой голос?':
    'Kam jde můj hlas?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Rozpoznávání dělá sám prohlížeč. Chrome a prohlížeče na něm postavené posílají zvuk na servery Googlu; tak je jejich rozpoznávání udělané a platforma o tom nerozhoduje. Pokud ti to nevyhovuje, mikrofon nezapínej: všechno je i na tlačítkách.',
  'Как поменять тему?':
    'Jak změnit motiv?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Vzhled → Motiv: tmavý, světlý nebo Kamera, kde je pozadím obraz z tvé kamery.',
  'Что такое Цвет 1, 2 и 3?':
    'Co jsou Barva 1, 2 a 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Barva 1 jsou záhlaví, lišty pro psaní a záložky. Barva 2 je samo okno: pozadí chatu a seznam komentářů. Barva 3 je obálka a rámeček portfolia. Každá má svůj posuvník průhlednosti.',
  'Как поставить обои?':
    'Jak nastavit pozadí?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Vzhled → Pozadí: sada hotových nebo tvůj obrázek v 9:16. Barva 2 leží na pozadí jako nádech a posuvník rozhoduje, jak silný.',
  'Правила и безопасность':
    'Pravidla a bezpečnost',
  'Что нельзя выкладывать?':
    'Co se nesmí zveřejňovat?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Materiály s dětmi, výhrůžky a výzvy k násilí, rozdmýchávání nenávisti, podvody, zakázané zboží, cizí práce bez práva na ni, vydávání se za někoho jiného, spam a předstíraná aktivita. Celé v Pravidlech komunity.',
  'Как работает модерация?':
    'Jak funguje moderace?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Příspěvky, komentáře, zprávy ve skupinách, jména a popisy se kontrolují na serveru před zveřejněním. Jasně zakázané se nezveřejní, sporné jde k člověku. Tržiště a soukromé konverzace se nekontrolují.',
  'Виден ли мой IP?':
    'Je moje IP vidět?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Ano, server ji vidí, stejně jako každá stránka na internetu: bez IP by nevěděl, kam poslat odpověď. Skrytý režim skryje jméno a obrázek před lidmi, ne před serverem.',
  'Что вы храните обо мне?':
    'Co o mně uchováváte?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Klíč účtu, profil, který sis vyplnil sám, tvůj obsah, denní počítadla a technické údaje spojení. Žádný e-mail, žádný telefon, žádná hesla a žádné klíče k peněženkám.',
  'Куда жаловаться?':
    'Kam si stěžovat?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Na obsah tlačítkem pro nahlášení pod ním. Na všechno ostatní přes podporu uvnitř platformy.',
  'Где документы?':
    'Kde jsou dokumenty?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Nabídka účtu → Dokumenty. Je jich sedm: podmínky, zásady soukromí, pravidla komunity, odměny a limity, swap a platby, předplatné a klíče, kamera a mikrofon.',
  'Что такое карта?':
    'Co je mapa?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Mapa platformy: 177 zemí a 1150 měst se skutečnými souřadnicemi, poloha slunce spočítaná pro aktuální čas, noční strana a svítání přesně tam, kde jsou na obloze. Dvacet pohledů: z vesmíru, Země v noci, den a noc, ulice z OpenStreetMap, počasí, zemětřesení, časová pásma, naše kostky a vysílání. Otevírá se z nabídky účtu nebo slovem «mapa».',
  'Как проложить маршрут на карте?':
    'Jak nakreslit trasu na mapě?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Klepni na mapě na začátek, potom na konec a vyber jednu z dvaceti cest. Velká kružnice a loxodroma, tedy jak se opravdu létá a pluje. Jen po souši a jen po vodě: skutečné hledání cesty přes kontinenty bez jediného kroku do druhého živlu. Po stínu a po světle: po noční straně. Kolem kostek, vysílání a lidí: přes naše špendlíky. Trasu po ulicích počítá vnější stroj OSRM; když neodpoví, řekneme to.',
  'Видно ли меня на карте?':
    'Jsem vidět na mapě?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Jen když jsi sám zapíchl špendlík «jsem tady». Žije půl hodiny a sám se smaže, souřadnice se zaokrouhlí na kilometr ještě před odesláním na server a «odstraň mě z mapy» záznam smaže, místo aby ho schovalo. Bez toho špendlíku na mapě vůbec nejsi.',
  'Есть ли на карте спутник и пробки?':
    'Má mapa satelitní snímky a dopravu?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nemá. Satelitní snímky a dopravu dávají placení poskytovatelé s klíčem. Místo pro tyto vrstvy je připravené: vloží se klíč a zapnou se. Dokud klíč není, mapa to rovnou řekne, místo aby kreslila hezkou lež.',
  'Что такое забег по улице?':
    'Co je běh ulicí?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Skok dovnitř mapy: pohled z první osoby, skutečné domy a zatáčky tvé vlastní ulice. Běžíš sám: tažením do strany měníš pruh, na křižovatce zatáčíš, nahoru skáčeš, dolů kloužeš. Sbíráš kostky a uhýbáš zábranám a paprskům. Cestou potkáváš cizí vysílání, kostky a výlohy. Je i klidná procházka s páčkou. Otevírá se z nabídky účtu, z mapy tlačítkem Na ulici, nebo slovem «běh».',
  'Откуда берутся дома в забеге?':
    'Odkud se berou domy v běhu?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Z OpenStreetMap: skutečné obrysy a počty pater, skutečné silnice s jejich šířkou a zatáčkami. Patro počítáme jako tři metry; když počet pater chybí, výška se bere z půdorysu domu. Fotografie ulic nejsou, ty dávají placení poskytovatelé. Když je server mapy zaneprázdněný, hra to poctivě řekne a postaví naši vlastní čtvrť.',
  'Что такое шопинг в маркетплейсе?':
    'Co je nakupování na tržišti?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Druhá sekce tržiště, pro věci místo souborů: šestnáct kategorií od oblečení po umění, karta se značkou, velikostmi, barvami, parametry a až dvaceti fotkami. Na každé kartě se točí útvar s názvem značky, kterýkoli z dvaceti tvarů. Tato sekce se peněz nedotýká: platba a doručení jsou mezi lidmi, proto je tam «napsat prodávajícímu», a ne «koupit za CUBE».',
  'Игры, чаты и новое':
    'Hry, chaty a novinky',
  'Сколько игр в зале?':
    'Kolik her je v herně?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Osm a všechny se dají hrát: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Ovládají se prstem i klávesnicí.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Dávají hry CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nedávají. Hry dávají body a osobní rekord, které zůstávají v tvém prohlížeči. CUBE připisuje server za zhlédnutí a ze společného fondu; razit mince v prohlížeči by byla lež.',
  'Как играть в DataMine?':
    'Jak se hraje DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Pole osm krát osm. Klepneš na políčko a vykopeš data; číslo ukazuje, kolik virů je vedle. Dlouhé stisknutí zapíchne vlajku. Tři životy, pak nová vrstva.',
  'Как играть в CipherBreak?':
    'Jak se hraje CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Uhodni kód ze čtyř znaků. Po pokusu plné kolečko znamená, že znak je na správném místě, prázdné že je v kódu, ale jinde. Osm pokusů.',
  'Как играть в Phantom Escape?':
    'Jak se hraje Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Posbírej pět klíčů a vyjdi dveřmi. Duchové tě sledují nejkratší cestou a na každém patře jich je víc.',
  'Как играть в Block Trade?':
    'Jak se hraje Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Minuta a půl, v ruce 1000. Kupuj levněji, prodávej dráž. Tvé skóre je všechno nad tisícem.',
  'Как играть в TrustChain?':
    'Jak se hraje TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Klepej na bloky vzestupně, dokud běží hodiny. Jedna chyba a řetěz se přetrhne. S každým kolem je řetěz delší.',
  'Как играть в CubeBuilder?':
    'Jak se hraje CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Deska jede do strany a klepnutí ji pustí. Co přečuhuje, odpadne a deska se zúží. Mineš věž a je konec.',
  'Что показывает строка курсов?':
    'Co ukazuje pás kurzů?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Třicet mincí s cenou a denní změnou. Data jdou přes náš server, který drží půl minuty v paměti. Pás se neplazí: na obrazovku se vejde celý počet políček a mění se každých pár vteřin.',
  'Что значит число кубов в шапке?':
    'Co znamená počet kostek v záhlaví?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Kolik kostek je právě teď v tvém světě, těch, které vidíš před sebou. Ne celkový počet kostek na platformě.',
  'Можно ли войти вторым аккаунтом?':
    'Můžu se přihlásit druhým účtem?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Můžeš. Nabídka účtu → Přidat účet: současný klíč zůstane v seznamu a vrátíš se k němu jedním klepnutím z téže nabídky. Pamatuje se jich až osm.',
  'Зачем «Сохранить» в окне игры?':
    'K čemu je Uložit v okně hry?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Pamatuje si tvar předmětu, postavu, gesta a velikost. Příště najdeš všechno tak, jak jsi to nechal.',
  'Чем режим отличается от толчка?':
    'Čím se liší režim od postrku?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Režim drží, dokud ho druhým klepnutím nevypneš, a zůstává rozsvícený. Postrk jde jednou a nesvítí; nechává jen tenkou značku, že byl stisknut naposled.',
  'Почему кубы больше не исчезают?':
    'Proč kostky už nemizí?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Ukázkové kostky ve výloze žily krátce, pět a patnáct minut. Teď dostávají aspoň půl dne a spouštějí se znovu dřív, než vyprší. Skutečné kostky žijí přesně tak dlouho, jak jim bylo dáno při vytvoření.',
  'Как сделать фото прямо в чат?':
    'Jak vyfotit rovnou do konverzace?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Sponka → Kamera otevře naše vlastní snímání. Klepnutí pořídí fotku, dlouhé stisknutí natočí video až minutu. Galerie je položka vedle, Foto nebo video.',
  'Что такое галерея переписки?':
    'Co je galerie konverzace?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Lupa v záhlaví konverzace otevře hledání a nad ním polici: fotky, videa, zvuky a odkazy z té konverzace. Sbírá se ze samotných zpráv a nic nikam nejde.',
  'Как удалить сразу несколько сообщений?':
    'Jak smazat několik zpráv najednou?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Dlouhé stisknutí zprávy zapne výběr, pak zaškrtneš ty, které chceš, a stiskneš Smazat ve spodní liště. Až sto najednou.',
  'Можно ли изменить своё сообщение?':
    'Můžu upravit vlastní zprávu?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Můžeš, vlastní a jen textové: nabídka zprávy → Upravit. Vedle se objeví značka «upraveno». Konverzace se při tom nezavírá.',
  'Что такое сторис?':
    'Co jsou příběhy?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Krátké příspěvky, které žijí den, nad seznamem konverzací: fotka nebo video až minutu. Prohlížejí se jeden za druhým a po dni samy zmizí.',
  'Сколько фото можно в группу?':
    'Kolik fotek se vejde do skupiny?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Až sedm fotek, nebo jedno video až minutu. K tomu ikona ze sady a štítky pod popisem.',
  'Что такое теги группы?':
    'Co jsou štítky skupiny?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Pár slov oddělených čárkami, podle kterých se skupina najde ve hledání.',
  'Видно ли участников группы?':
    'Jsou členové skupiny vidět?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Rozhoduje majitel při vytváření: seznam členů se může ukázat všem nebo zůstat viditelný jen majiteli.',
  'Почему поле ссылки на видео убрали?':
    'Proč bylo odstraněno pole s odkazem na video?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Cizí odkaz se rozbil, když ho na druhém konci smazali, a platforma za to nemohla ručit. Video se nahrává jako soubor do našeho vlastního úložiště.',
  'Сколько длится видео в посте?':
    'Jak dlouhé může být video v příspěvku?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Zatím soubor do 50 MB. Na větším serveru budou stupně: 15 vteřin, minuta, tři minuty a patnáct.',
  'Что делает кнопка «Чаевые автору»?':
    'Co dělá tlačítko Spropitné autorovi?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Převede CUBE z tvého zůstatku autorovi příspěvku v plné výši, bez podílu pro platformu. Částka je 1, 5, 10, 25 nebo vlastní.',
  'Как пожаловаться на видео?':
    'Jak nahlásit video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Tři tečky pod videem → Nahlásit: vybereš důvod a můžeš přidat vlastní slova. Jde to k živému člověku.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Jak sdílet příspěvek?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Tři tečky pod videem → Sdílet. Dostaneš odkaz, který můžeš poslat komukoli.',
  'Куда девается «Сохранить»?':
    'Kam ukládá tlačítko Uložit?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Do tvého profilu, na polici uložených, pod ikonu záložky pod záložkami profilu.',
  'Что видно в моём профиле?':
    'Co je vidět v mém profilu?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Dvě záložky: Shorts pro krátká videa, Příspěvky pro všechno ostatní. Klepnutí na kartu ji otevře stejně jako v proudu. Úpravu a smazání vidí jen autor.',
  'Как изменить профиль?':
    'Jak upravit profil?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Tlačítko s tužkou ve vlastním profilu: jméno, @přezdívka, popis, typ účtu, stav, odkazy a adresa.',
  'Чем бизнес-аккаунт отличается?':
    'Čím se liší firemní účet?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Veřejný znamená, že tě vidí všichni. Skrytý znamená, že jméno a obrázek jsou skryté před lidmi. Firemní přidává popis tvé činnosti, odkazy a adresu.',
  'Что показывает «онлайн» в шапке?':
    'Co ukazuje «online» v záhlaví?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Kolik lidí je podle serveru právě teď na platformě. Obnovuje se každou půlminutu.',
  'Закрывается ли игра вместе с эфиром?':
    'Zavírá se hra spolu s vysíláním?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Ano. Pokud ve vysílání byly kostky, hra se po jeho konci sama vypne; jinak by předměty dál létaly nad prázdnou mapou.',
  'Есть ли смайлы в эфире?':
    'Jsou ve vysílání emotikony?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Jsou, tlačítko emotikonů vedle lišty pro psaní má celou společnou sbírku, tu samou jako v konverzacích.',
  'Что такое «Все вопросы»?':
    'Co je Všechny otázky?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Úplná příručka pomocníka: víc než sto otázek s odpověďmi, roztříděných do sekcí, s hledáním podle názvu.',
  'Куда делась кнопка NET?':
    'Kam zmizelo tlačítko NET?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Bylo odstraněno. Platforma nehledá ve velkém internetu a to tlačítko slibovalo, že ano. Pomocník odpovídá o platformě a hledá kostky, lidi, skupiny a vysílání.',
  'Почему звук повторялся дважды?':
    'Proč se zvuk opakoval dvakrát?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Mluvily dva různé kusy kódu a žádný druhý nepřerušil. Teď každá věta ruší předchozí a stejný text se dvakrát po sobě neopakuje.',
  'Как выключить голос совсем?':
    'Jak hlas úplně vypnout?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Na stránce Hlasové příkazy je přepínač mezi odpovídáním nahlas a potichu. Teď ho vypíná doopravdy: dřív vládl jen jednomu vstupu a hlas ho obcházel.',
  'Что хранится только в моём браузере?':
    'Co se ukládá jen v mém prohlížeči?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Rekordy ve hrách, nastavení hry s kostkami, zvolený jazyk, motiv a pozadí a seznam tvých účtů. Nic z toho nejde na server.',
  'Почему просят подтвердить удаление?':
    'Proč se mě ptáte na potvrzení smazání?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Protože se nedá vzít zpět. V konverzacích se navíc ptáme, kterou kopii odstranit, jen tvoji, nebo všem.',
  'Что такое «У всех» при удалении?':
    'Co znamená «Pro všechny» při mazání?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Pro mě» skryje zprávu z tvé obrazovky. «Pro všechny» požádá server, aby ji odstranil i u druhého člověka.',
  'Сколько живёт сообщение с таймером?':
    'Jak dlouho žije zpráva s lhůtou?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Tak dlouho, jak jsi zvolil: pět minut, hodina, den, týden nebo navždy. Tlačítko ∞ vedle lišty pro psaní.',
  'Как переслать сообщение?':
    'Jak přeposlat zprávu?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Nabídka zprávy → Přeposlat. Vybereš komu.',
  'Что делает «В избранное»?':
    'Co dělá Uložit do oblíbených?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Vloží zprávu do Uložených, tvého vlastního sešitu s poznámkami a schovanými věcmi.',
  'Как найти сообщение в переписке?':
    'Jak najít zprávu v konverzaci?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Lupa v záhlaví konverzace: hledá v textu a šipky skáčou mezi shodami. Police s fotkami, videi, zvuky a odkazy je na stejném místě.',
  'Что такое «Пригласить в группу»?':
    'Co je Pozvat do skupiny?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Odkaz z informací o skupině: kdo ho otevře, vstoupí do skupiny.',
  'Можно ли выйти из группы?':
    'Můžu ze skupiny odejít?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Můžeš, tlačítkem v informacích o skupině. Když odejde majitel, skupina sama se nesmaže.',
  'Сколько форм у предметов?':
    'Kolik tvarů mají předměty?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Dvacet, k tomu tvůj obrázek nebo video navrch a režim namíchané.',
  'Что такое шопинг?':
    'Co je nakupování?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Druhá sekce tržiště, pro věci: šestnáct kategorií, karta se značkou a až dvaceti fotkami a točící se útvar s názvem značky. Platba a doručení jsou mezi lidmi.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Ptej se slovy: třeba «jak vydělat» nebo «najdi kostku Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Co mám hledat? Napiš něco jako «najdi kostku Art» nebo «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Na «{что}» odpověď nemám. Znám platformu: CUBE a odměny, limity, swap, peněženku, klíče, signály, kostky a skupiny, hru s kostkami, vysílání, vzhled a hlasové příkazy.'

});
