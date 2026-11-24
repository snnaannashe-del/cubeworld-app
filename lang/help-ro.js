/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-ro.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('ro', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Postări, videoclipuri și clipuri rotunde. Tot de aici se deschid comentariile și reacțiile.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Conversații private, mesaje vocale și clipuri rotunde, cele salvate.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Comunități publice: chat comun, flux de evenimente, membri.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Semnale de tranzacționare: direcție, intrare, țintă și stop. Prețul îl urmărește serverul singur.',
  'Объявления и обмен между людьми.':
    'Anunțuri și schimb între oameni.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Ratele recompenselor, swapul și tot ce aduce CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Soldul tău de CUBE, alimentări, retrageri și istoric.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Ce se întâmplă cu cuburile și postările tale, în cifre.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE este moneda internă a platformei. Serverul o acordă o dată pe zi pentru activitate: zi activă, postările și comentariile tale, oamenii pe care i-ai invitat. În swap prețul CUBE este fix: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Serverul închide recompensele o dată pe zi. Se numără: o zi activă online, postările și comentariile tale de la 10 mii de vizualizări, invitații care au plătit abonamentul, și sporurile pentru o săptămână, o lună și un an la rând. Ratele exacte sunt mereu la zi în secțiunea Câștigă.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Ca să nu se poată umfla nimic prin trucuri, serverul ține limite zilnice: 20 de chaturi noi, 500 de aprecieri, 50 de comentarii, 500 de urmăriri. Vizualizările nu se pot umfla deloc, se numără doar din afișări reale. Cât a mai rămas azi se vede în Câștigă.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swapul schimbă cripto în CUBE și înapoi: 16 monede și rețelele lor, cursul se ia în clipa cererii, CUBE se socotește la $0.50. Intrările și retragerile trec printr-un furnizor de plăți; cheile de la burse sau portofele ale nimănui nu le luăm și nu le păstrăm. Se poate retrage doar ce ai câștigat, nu ce a fost dat cadou.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Portofelul arată soldul de CUBE, istoricul și butoanele de alimentare și retragere. Alimentarea și retragerea se fac prin swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Cheia deschide posibilități: Free este baza, Silver este extins, Gold dă mai multe cuburi și statistici. Cheile se cumpără cu CUBE. Abonamentul Premium dă o parte din fondul de recompense după contribuția ta din lună.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Semnalul înseamnă direcție, punct de intrare, țintă și stop. Serverul urmărește singur prețul și închide semnalul la țintă sau la stop. Chei de la burse nu cerem: tranzacționezi tu, la tine.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Reacția de sub o postare aduce CUBE autorului. Se pot da până la 500 de aprecieri pe zi, mai departe serverul pur și simplu nu le mai numără.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Cubul este spațiul tău: chat, flux, camere private și un cronometru de viață. Se creează cu «+» în lume. Oamenii se cheamă prin link sau prin cheia cubului.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Cubul este o lume aparte în interiorul platformei: are numele său, coperta, chatul, fluxul și durata de viață. Cuburile se văd pe hartă, se poate umbla printre ele și se poate intra în ele.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Grupurile sunt comunități publice: chat comun, flux de evenimente și listă de membri. Al tău îl poți crea în secțiunea Grupuri.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Jocul cu cuburi se deschide cu un buton de pe hartă. Acțiunile se împart în împingeri (explozie, aruncări, aruncat în sus, artificii, haos) și moduri (lăsat să cadă sau fără greutate, unul din două, magnet, vârtej, înghețare). Modurile se adună și țin până le scoți. Toate merg cu butonul, cu un gest în fața camerei și cu vocea.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'În joc se pot porni gesturile: o mișcare în lateral e aruncare, în sus e aruncat în sus, în jos e lăsat să cadă, palma înainte e explozie, un cerc e vârtej, ambele mâini e haos. Imaginea de la cameră nu pleacă nicăieri, totul se calculează chiar pe dispozitivul tău.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Obiectele nu sunt doar cuburi: cristal, triunghi, octaedru, sferă, piramidă, prismă, stea, icosaedru, inel, dolar, euro, yuan. Poți pune imaginea ta sau un videoclip al tău de până la 15 secunde; cel vertical 9:16 se taie din centru în pătrat.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'În joc sunt opt personaje: pisică, vecin, câine, robot, fantomă, panda, broască și extraterestru. Pot fi mângâiate, gâdilate și scuturate, și răspund prin voce și mișcare. Acțiunea ta se adaugă cu un buton: nume, comandă, descriere și cu ce se face — cu mâna, piciorul, capul sau tot corpul.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Aspectul schimbă culoarea și transparența ferestrelor: Culoarea 1 sunt titlurile și barele, Culoarea 2 este fereastra însăși, Culoarea 3 este coperta și rama portofoliului. Fundalurile conversațiilor se aleg în același loc, ale tale pot fi puse în 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Cu vocea merge aproape tot: secțiunile, jocul, formele, personajele, peste nouăzeci de comenzi. Lista completă în toate cele douăzeci de limbi este pe pagina Comenzi vocale: se deschide din Aspect sau spunând «comenzi vocale». Comutatorul pentru răspuns cu voce sau în tăcere este tot acolo.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Documentele se deschid din meniul contului → Documente. Sunt șapte: condițiile de utilizare, politica de confidențialitate, regulile comunității, recompense și limite, swap și plăți, abonament și chei, cameră și microfon. Merge și cu vocea, spune «documente».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Invitațiile dau CUBE când cel invitat plătește abonamentul. Linkul tău este în secțiunea invitațiilor.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Portofoliul este vitrina profilului: copertă, descriere și lucrări. Înfățișarea copertei și a ramei se schimbă cu Culoarea 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Statisticile arată ce se întâmplă cu cuburile și postările tale: vizualizări, reacții, oamenii care vin.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'În profil poți ascunde numele și poza, în locul lor va fi un număr anonim. Dar asta te ascunde de ceilalți oameni, nu de server: adresa IP a unei conexiuni o vede orice site de pe internet, și al nostru la fel. Ceva care să ascundă IP-ul nu există în aplicație.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Marketplace-ul înseamnă anunțuri și schimb între oameni.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Postările, comentariile, reclamele, numele și descrierile trec printr-o verificare. Ce este clar interzis nu se publică, ce este discutabil merge la o verificare umană. Marketplace-ul nu este atins de această verificare.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Bună. Sunt asistentul platformei: răspund despre cuburi, recompense, portofel, joc și setări, și găsesc de asemenea cuburi, oameni și grupuri. Întreabă în cuvinte, de pildă «cum câștig», «caută cubul Art», «cine e @anna». Despre restul lumii este fila NET de alături.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE și bani',
  'Что такое CUBE?':
    'Ce este CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE sunt punctele interne ale platformei. Serverul le acordă o dată pe zi pentru activitate. În swap prețul este fix: 1 CUBE = $0.50. Nu este titlu de valoare și nu este o promisiune de venit.',
  'Как заработать?':
    'Cum câștig?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Socotește serverul și închide ziua o dată la 24 de ore: zi activă online, postările și comentariile tale de la 10 mii de vizualizări, reacțiile de sub postările tale, invitații care au plătit abonamentul, și sporurile pentru o săptămână, o lună și un an la rând. Ratele exacte sunt în Câștigă.',
  'Какие лимиты в сутки?':
    'Ce limite sunt pe zi?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 de chaturi noi, 500 de aprecieri, 50 de comentarii, 500 de urmăriri. Vizualizările nu se pot umfla deloc. Socoteala merge pe zile UTC; dacă ai atins limita, acțiunea pur și simplu nu se numără, și nu există pedeapsă pentru asta.',
  'Что считается накруткой?':
    'Ce se consideră trucaj?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Pachete de conturi, aprecieri și urmăriri automate, cumpărarea de vizualizări, înțelegeri pentru reacții reciproce. Recompensele obținute astfel se retrag.',
  'Как работает свайп?':
    'Cum funcționează swapul?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swapul schimbă cripto în CUBE și înapoi: 16 monede și rețelele lor. Cursul criptomonedei se ia în clipa cererii, CUBE se socotește la $0.50. Primirea și trimiterea trec printr-un furnizor de plăți.',
  'Как пополнить кошелёк?':
    'Cum alimentez portofelul?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Prin swap: creezi o cerere, primești o adresă și o sumă, și trimiți transferul din propriul portofel. Contează ca moneda și rețeaua să coincidă cu cererea, altfel transferul nu se mai poate recupera.',
  'Как вывести деньги?':
    'Cum retrag banii?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Cererea de retragere se creează spre adresa ta, iar comisionul rețelei îl plătește cel care primește. Verificăm și trimitem manual, de obicei într-o zi lucrătoare.',
  'Почему вывести можно не всё?':
    'De ce nu pot retrage tot?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Se retrage doar ce ai câștigat. CUBE acordați cadou sau ca bonus se cheltuiesc în interiorul platformei, dar nu se retrag; altfel ar fi de ajuns să împarți cadouri și să le prefaci în bani.',
  'Какие монеты поддерживаются?':
    'Ce monede sunt acceptate?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 monede și rețelele lor: BTC, ETH, USDT, USDC, BNB și încă unsprezece din primele după rulaj. Lista completă cu rețele este în fereastra swapului.',
  'Что если отправил не в ту сеть?':
    'Și dacă am trimis pe rețeaua greșită?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Un transfer în blockchain nu se poate întoarce. Scrie imediat la suport: uneori se poate ajuta, dar nu se poate promite. De aceea rețeaua din cerere și cea din portofel trebuie să coincidă.',
  'Берёте ли вы ключи от бирж?':
    'Luați cheile de la burse?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Nu. Nici chei de la burse, nici fraze seed, nici acces la portofelul tău nu cerem și nu primim. Dacă cineva cere așa ceva în numele platformei, este un escroc.',
  'Платите ли вы налоги за меня?':
    'Plătiți impozitele mele?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Nu. Ce datorezi statului hotărăști și plătești singur. Nu suntem agent fiscal.',
  'Ключи и подписка':
    'Chei și abonament',
  'Какие бывают ключи?':
    'Ce chei există?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free este baza, Silver este extins, Gold dă mai multe cuburi și statistici. Cheia se ridică cu CUBE în Magazinul de chei.',
  'Что даёт Premium?':
    'Ce dă Premium?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'O parte din fondul de recompense după contribuția ta din lună, conectarea portofelelor externe pentru afișare, statistici și clasament, prioritate la semnale, insignă în profil și în chat, cuburi Premium închise.',
  'Сколько стоит подписка?':
    'Cât costă abonamentul?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 pe lună sau $59.99 pe an.',
  'Как отменить подписку?':
    'Cum anulez abonamentul?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Oricând: duce la capăt perioada plătită și nu se prelungește. Ce s-a plătit pentru perioada curentă nu se întoarce, în afara cazurilor în care legea cere restituirea.',
  'Я потерял ключ: что делать?':
    'Mi-am pierdut cheia, ce fac?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Nu se poate recupera. Nu cerem nici e-mail, nici telefon, deci nu avem cu ce verifica dacă acel cont este al tău. Cheia este contul; ține-o unde n-o pierzi.',
  'Можно ли передать ключ другому?':
    'Pot da cheia altcuiva?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Poți, dar tot ce se face cu ea se socotește făcut de tine.',
  'Кубы и группы':
    'Cuburi și grupuri',
  'Что такое куб?':
    'Ce este un cub?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Cubul este o lume aparte în interiorul platformei: nume propriu, copertă, chat, flux, camere private și durată de viață. Cuburile se văd pe hartă și se poate intra în ele.',
  'Как создать куб?':
    'Cum creez un cub?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Cu «+» în lume sau în Universul meu. Stabilești numele, coperta, tipul și durata de viață. Oamenii se cheamă prin link sau prin cheia cubului.',
  'Что такое таймер жизни куба?':
    'Ce este cronometrul de viață al cubului?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Cubul trăiește timpul stabilit, apoi se închide. Durata se alege la creare, de la o oră la un an.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Ce sunt grupurile?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Comunități publice: chat comun, flux de evenimente și listă de membri.',
  'Как найти куб или человека?':
    'Cum găsesc un cub sau o persoană?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Scrie chiar aici: «caută cubul Art», «@anna», «grup de fotografie». Caut pe platformă și arăt cartonașe: cuburi, oameni, grupuri și transmisiuni care merg chiar acum.',
  'Лента и посты':
    'Flux și postări',
  'Как выложить пост?':
    'Cum public o postare?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Cu butonul de creare din flux. Sunt permise un videoclip, o imagine, un titlu și o descriere.',
  'Почему пост не опубликовался?':
    'De ce nu mi s-a publicat postarea?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Textul nu a trecut verificarea dinaintea publicării. Mesajul spune motivul: mărfuri interzise, escrocherie, amenințări și altele. Regulile sunt în Documente, iar dacă e o greșeală, scrie la suport.',
  'Что дают реакции?':
    'Ce aduc reacțiile?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Reacția de sub o postare aduce CUBE autorului. Se pot da până la 500 de aprecieri pe zi.',
  'Как пожаловаться на пост?':
    'Cum raportez o postare?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Sub fiecare postare și fiecare mesaj există un buton de raportare. Raportul merge la o verificare umană.',
  'Сколько просмотров нужно для начисления?':
    'Câte vizualizări sunt necesare pentru recompensă?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'De la 10 mii de afișări reale: postările și comentariile tale încep să aducă CUBE de la acest prag.',
  'Игра с кубами':
    'Jocul cu cuburi',
  'Как играть кубами?':
    'Cum mă joc cu cuburile?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Butonul jocului este pe hartă. Cuburile zboară între pereți și nu pot ieși. Acțiunile se apasă cu butonul, se arată cu mâna în fața camerei sau se spun cu voce tare.',
  'Что такое режимы и толчки?':
    'Ce sunt modurile și împingerile?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Împingerile sunt explozia, aruncările, aruncatul în sus, artificiile și haosul: merg o dată și lucrează peste tot. Modurile țin până le scoți și se adună: gravitația (lăsat să cadă SAU fără greutate), magnet, vârtej, înghețare.',
  'Как работают жесты рукой?':
    'Cum funcționează gesturile mâinii?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'O mișcare în lateral e aruncare, în sus e aruncat în sus, în jos e lăsat să cadă, palma înainte e explozie, un cerc e vârtej, ambele mâini e haos. Cadrele se prelucrează chiar pe dispozitivul tău și nu pleacă nicăieri.',
  'Какие есть формы?':
    'Ce forme există?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Cub, cristal, triunghi, octaedru, sferă, piramidă, prismă, stea, icosaedru, inel, dolar, euro, yuan, și imaginea ta. În plus «amestecat», unde fiecare obiect are forma lui.',
  'Как поставить свою картинку?':
    'Cum pun imaginea mea?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'În joc → Forma obiectului → căsuța «A mea». Cel mai bine merge una pătrată; cea verticală 9:16 se taie din centru. Apasă «A mea» din nou ca s-o schimbi.',
  'Можно ли поставить видео?':
    'Se poate folosi un videoclip?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Da, de până la 15 secunde. Mai lung nu se primește. Videoclipul rezistă și la reîncărcarea paginii.',
  'Кто такие персонажи?':
    'Cine sunt personajele?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Opt personaje: pisică, vecin, câine, robot, fantomă, panda, broască, extraterestru. Pot fi mângâiate, gâdilate și scuturate, și răspund prin voce și mișcare.',
  'Как добавить своё действие?':
    'Cum adaug acțiunea mea?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Cu un buton în secțiunea personajelor: nume, comandă, descriere și cu ce se face — cu mâna, piciorul, capul sau tot corpul. Acțiunea în sine se alege din șaisprezece efecte gata făcute.',
  'Как крутятся предметы?':
    'Cum se rotesc obiectele?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Cinci moduri: în sensul axei, împotriva axei, peste vârf, pe dedesubt, și de-a valma. Rotirea din aruncare se adaugă peste modul ales.',
  'Как начать эфир?':
    'Cum încep o transmisiune?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Butonul Transmisiune din flux sau comanda vocală «transmisiune». Alegi un titlu și un mod, și ești în direct. Privitorii primesc imaginea direct de la tine.',
  'Какие режимы эфира?':
    'Ce moduri de transmisiune există?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Cameră și cuburi: scena peste imaginea camerei, cu gesturile funcționând. Doar cuburi: scena fără cameră. Transmisiune curată: doar camera, fără comentarii, reacții și cadouri.',
  'Сколько зрителей выдержит эфир?':
    'Câți privitori duce o transmisiune?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Imaginea merge direct de la cel care transmite la fiecare privitor, deci atârnă de conexiunea lui: pe o linie de acasă se uită comod zece-cincisprezece oameni. O sală mai mare are nevoie de un server de retransmisie.',
  'Что такое подарки?':
    'Ce sunt cadourile?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Treizeci de cadouri, de la Trandafir cu 1 CUBE până la Cubul Legendă cu 1000. Cadoul este un transfer de CUBE către cel care transmite, în întregime; platforma nu ia nimic.',
  'Как закончить эфир?':
    'Cum închei transmisiunea?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Butonul Încheie transmisiunea din antetul ferestrei, se vede în orice mod. Închiderea ferestrei cu crucea nu oprește transmisiunea: merge până apeși Încheie.',
  'Голос и языки':
    'Voce și limbi',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Ce comenzi vocale există?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Peste nouăzeci: secțiuni, ferestre, creare, flux, joc, forme, personaje, control. Lista completă cu căutare este pe pagina Comenzi vocale: meniul contului → Comenzi vocale, sau în Aspect, sau spune pur și simplu «comenzi vocale».',
  'На каких языках работает голос?':
    'În ce limbi funcționează vocea?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'În douăzeci: rusă, engleză (și cea din India), ucraineană, germană, franceză (și cea din Canada), spaniolă (și cea latino-americană), italiană, portugheză, poloneză, turcă, arabă (și cea din Golf), vietnameză, chineză, japoneză, coreeană, hindi. Limba se alege pe pagina comenzilor și în Aspect.',
  'Как включить микрофон?':
    'Cum pornesc microfonul?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Butonul microfonului este în bara de sus. Îl apeși și ascultă, îl apeși din nou și se oprește.',
  'Как выключить озвучку?':
    'Cum opresc răspunsurile cu voce?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Pe pagina Comenzi vocale există un comutator între răspuns cu voce și răspuns în tăcere. Vocea ascultă oricum; diferă doar răspunsul.',
  'Куда уходит мой голос?':
    'Unde ajunge vocea mea?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Recunoașterea o face însuși navigatorul. Chrome și navigatoarele clădite pe el trimit sunetul la serverele Google; așa este făcută recunoașterea lor, iar platforma nu hotărăște nimic acolo. Dacă asta nu-ți convine, nu porni microfonul: totul există și ca butoane.',
  'Как поменять тему?':
    'Cum schimb tema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Aspect → Temă: întunecată, deschisă, sau «Cameră», unde fundalul este imaginea camerei tale.',
  'Что такое Цвет 1, 2 и 3?':
    'Ce sunt Culoarea 1, 2 și 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Culoarea 1 sunt titlurile, barele de scris și filele. Culoarea 2 este fereastra însăși: fundalul chatului și lista de comentarii. Culoarea 3 este coperta și rama portofoliului. Fiecare are cursorul ei de transparență.',
  'Как поставить обои?':
    'Cum pun un fundal?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Aspect → Fundal: un set gata făcut sau imaginea ta în 9:16. Culoarea 2 stă peste fundal ca o nuanță, iar cursorul hotărăște cât de tare.',
  'Правила и безопасность':
    'Reguli și siguranță',
  'Что нельзя выкладывать?':
    'Ce nu se poate publica?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Materiale cu copii, amenințări și îndemnuri la violență, ațâțarea urii, escrocherii, mărfuri interzise, munca altuia fără drept asupra ei, pretinderea de a fi altcineva, spam și activitate prefăcută. Pe larg, în Regulile comunității.',
  'Как работает модерация?':
    'Cum funcționează moderarea?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Postările, comentariile, mesajele din grupuri, numele și descrierile se verifică pe server înainte de publicare. Ce este clar interzis nu se publică, ce este discutabil merge la un om. Marketplace-ul și conversațiile private nu se verifică.',
  'Виден ли мой IP?':
    'Se vede IP-ul meu?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Da, serverul îl vede, ca orice site de pe internet: fără IP n-ar ști unde să trimită răspunsul. Modul ascuns ascunde numele și poza de ceilalți oameni, dar nu de server.',
  'Что вы храните обо мне?':
    'Ce păstrați despre mine?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Cheia contului, profilul completat de tine, conținutul tău, contoarele zilnice și datele tehnice ale conexiunii. Nici e-mail, nici telefon, nici parole, nici chei de portofele.',
  'Куда жаловаться?':
    'Unde mă plâng?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Despre un conținut, cu butonul de raportare de sub el. Despre orice altceva, prin suportul din interiorul platformei.',
  'Где документы?':
    'Unde sunt documentele?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Meniul contului → Documente. Sunt șapte: condițiile, politica de confidențialitate, regulile comunității, recompense și limite, swap și plăți, abonament și chei, cameră și microfon.',
  'Что такое карта?':
    'Ce este harta?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Harta platformei: 177 de țări și 1150 de orașe cu coordonate reale, poziția soarelui calculată pentru ora curentă, partea de noapte și zorii exact acolo unde sunt pe cer. Douăzeci de priveliști: din spațiu, Pământul noaptea, zi și noapte, străzile OpenStreetMap, vremea, cutremurele, fusurile orare, cuburile și transmisiunile noastre. Se deschide din meniul contului sau cu cuvântul «hartă».',
  'Как проложить маршрут на карте?':
    'Cum trasez un traseu pe hartă?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Atinge începutul pe hartă, apoi sfârșitul, și alege una din cele douăzeci de căi. Cercul mare și loxodroma, adică așa cum se zboară și se navighează cu adevărat. Doar pe uscat și doar pe apă: o căutare adevărată de drum peste continente, fără un singur pas în celălalt element. Pe umbră și pe lumină: urmând partea de noapte. Pe lângă cuburi, transmisiuni și oameni: prin acele noastre. Traseul pe străzi îl calculează motorul extern OSRM; dacă nu răspunde, o spunem.',
  'Видно ли меня на карте?':
    'Mă vede cineva pe hartă?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Doar dacă ai înfipt tu însuți acul «sunt aici». El trăiește o jumătate de oră și se șterge singur, coordonatele se rotunjesc la un kilometru încă înainte de a fi trimise pe server, iar «scoate-mă de pe hartă» șterge înregistrarea în loc s-o ascundă. Fără acel ac nu ești pe hartă deloc.',
  'Есть ли на карте спутник и пробки?':
    'Are harta imagini din satelit și trafic?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nu. Imaginile din satelit și traficul le dau furnizori cu plată, pe bază de cheie. Locul pentru aceste straturi este pregătit: pui o cheie și se aprind. Cât timp nu există cheie, harta o spune pe față în loc să deseneze o minciună frumoasă.',
  'Что такое забег по улице?':
    'Ce este alergarea pe stradă?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Un salt în interiorul hărții: vedere la persoana întâi, clădirile și cotiturile adevărate ale străzii tale. Alergi tu: tragi în lateral ca să schimbi banda, la intersecție ca să virezi, în sus ca să sari, în jos ca să aluneci. Aduni cuburi și ocolești bariere și raze. Pe drum dai peste transmisiuni, cuburi și vitrine ale altora. Există și o plimbare liniștită cu joystick. Se deschide din meniul contului, de pe hartă cu butonul În stradă, sau cu cuvântul «alergare».',
  'Откуда берутся дома в забеге?':
    'De unde sunt clădirile din alergare?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Din OpenStreetMap: contururi și număr de etaje reale, drumuri reale cu lățimile și cotiturile lor. Socotim un etaj drept trei metri; dacă numărul de etaje lipsește, înălțimea se ia din amprenta clădirii. Fotografii ale străzilor nu există, acelea le dau furnizori cu plată. Dacă serverul hărții e ocupat, jocul o spune cinstit și ridică un cartier al nostru.',
  'Что такое шопинг в маркетплейсе?':
    'Ce este cumpărăturile în marketplace?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'A doua secțiune a marketplace-ului, pentru lucruri și nu pentru fișiere: șaisprezece categorii de la haine la artă, un cartonaș cu marca, mărimile, culorile, caracteristicile și până la douăzeci de fotografii. Pe fiecare cartonaș se rotește o figură cu numele mărcii, oricare dintre cele douăzeci de forme. Secțiunea nu atinge banii: plata și livrarea sunt între oameni, de aceea scrie «scrie vânzătorului», nu «cumpără cu CUBE».',
  'Игры, чаты и новое':
    'Jocuri, chaturi și noutăți',
  'Сколько игр в зале?':
    'Câte jocuri sunt în sală?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Opt, și toate se pot juca: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Se joacă cu degetul și cu tastatura.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Jocurile dau CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nu. Jocurile dau puncte și un record personal, păstrate în navigatorul tău. CUBE îl acordă serverul pentru vizualizări și din fondul comun; a bate monedă într-un navigator ar fi o minciună.',
  'Как играть в DataMine?':
    'Cum se joacă DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Un teren de opt pe opt. Atingi o căsuță și sapi datele; cifra arată câți viruși sunt alături. O apăsare lungă pune un steag. Trei vieți, apoi un strat nou.',
  'Как играть в CipherBreak?':
    'Cum se joacă CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Ghicește un cod din patru simboluri. După o încercare, cercul plin înseamnă că simbolul e la locul lui, cel gol că e în cod, dar în altă parte. Opt încercări.',
  'Как играть в Phantom Escape?':
    'Cum se joacă Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Adună cinci chei și ieși pe ușă. Fantomele te urmăresc pe drumul cel mai scurt, iar la fiecare etaj sunt mai multe.',
  'Как играть в Block Trade?':
    'Cum se joacă Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Un minut și jumătate, cu 1000 în mână. Cumpără mai ieftin, vinde mai scump. Scorul tău e tot ce trece de o mie.',
  'Как играть в TrustChain?':
    'Cum se joacă TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Atinge blocurile în ordine crescătoare cât timp merge ceasul. O greșeală și lanțul se rupe. Cu fiecare rundă lanțul se lungește.',
  'Как играть в CubeBuilder?':
    'Cum se joacă CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Placa merge în lateral, iar o atingere o lasă să cadă. Ce iese în afară cade, iar placa se îngustează. Dacă ratezi turnul, s-a terminat.',
  'Что показывает строка курсов?':
    'Ce arată banda cursurilor?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Treizeci de monede cu prețul și schimbarea zilei. Datele vin prin serverul nostru, care ține o jumătate de minut în memorie. Banda nu se târăște: pe ecran încap un număr întreg de căsuțe, iar ele se schimbă la câteva secunde.',
  'Что значит число кубов в шапке?':
    'Ce înseamnă numărul de cuburi din antet?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Câte cuburi sunt acum în lumea ta, cele pe care le vezi în fața ta. Nu numărul total de cuburi de pe platformă.',
  'Можно ли войти вторым аккаунтом?':
    'Pot intra cu un al doilea cont?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Poți. Meniul contului → Adaugă un cont: cheia de acum rămâne în listă, iar la ea te întorci cu o atingere din același meniu. Se țin minte până la opt.',
  'Зачем «Сохранить» в окне игры?':
    'La ce folosește Salvează din fereastra jocului?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Ține minte forma obiectului, personajul, gesturile și mărimea. Data viitoare găsești totul acolo unde ai lăsat.',
  'Чем режим отличается от толчка?':
    'Prin ce se deosebește un mod de o împingere?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Modul ține până îl stingi cu a doua atingere și rămâne aprins. Împingerea merge o dată și nu se aprinde; lasă doar un semn subțire că ea a fost apăsată ultima.',
  'Почему кубы больше не исчезают?':
    'De ce nu mai dispar cuburile?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Cuburile de pildă din vitrină trăiau puțin, cinci și cincisprezece minute. Acum primesc cel puțin o jumătate de zi și sunt pornite din nou înainte să se termine. Cuburile adevărate trăiesc exact cât li s-a dat la creare.',
  'Как сделать фото прямо в чат?':
    'Cum fac o fotografie direct în conversație?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Agrafa → Cameră deschide filmarea noastră. O atingere face o fotografie, o apăsare lungă înregistrează un videoclip de până la un minut. Galeria este punctul de alături, Fotografie sau videoclip.',
  'Что такое галерея переписки?':
    'Ce este galeria conversației?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Lupa din antetul conversației deschide căutarea și, deasupra ei, un raft: fotografii, videoclipuri, sunete și linkuri din acea conversație. Se adună chiar din mesaje și nimic nu pleacă nicăieri.',
  'Как удалить сразу несколько сообщений?':
    'Cum șterg mai multe mesaje deodată?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'O apăsare lungă pe un mesaj pornește selecția, apoi bifezi ce vrei și apeși Șterge în bara de jos. Până la o sută odată.',
  'Можно ли изменить своё сообщение?':
    'Pot să-mi modific propriul mesaj?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Poți, pe ale tale și doar cele de text: meniul mesajului → Modifică. Alături apare semnul «modificat». Conversația nu se închide în timpul ăsta.',
  'Что такое сторис?':
    'Ce sunt poveștile?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Postări scurte care trăiesc o zi, deasupra listei de conversații: o fotografie sau un videoclip de până la un minut. Se privesc una după alta și după o zi dispar singure.',
  'Сколько фото можно в группу?':
    'Câte fotografii încap într-un grup?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Până la șapte fotografii, sau un videoclip de până la un minut. Plus o pictogramă din set și etichete sub descriere.',
  'Что такое теги группы?':
    'Ce sunt etichetele grupului?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Câteva cuvinte despărțite prin virgule, după care grupul este găsit la căutare.',
  'Видно ли участников группы?':
    'Se văd membrii grupului?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Hotărăște proprietarul la creare: lista de membri poate fi arătată tuturor sau lăsată vizibilă doar proprietarului.',
  'Почему поле ссылки на видео убрали?':
    'De ce a fost scos câmpul cu linkul video?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Linkul altcuiva se strica atunci când era șters la celălalt capăt, iar platforma nu putea răspunde pentru asta. Videoclipul se încarcă drept fișier în depozitul nostru.',
  'Сколько длится видео в посте?':
    'Cât de lung poate fi un videoclip într-o postare?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Deocamdată un fișier de până la 50 MB. Pe un server mai mare vor fi trepte: 15 secunde, un minut, trei minute și cincisprezece.',
  'Что делает кнопка «Чаевые автору»?':
    'Ce face butonul Bacșiș autorului?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Transferă CUBE din soldul tău autorului postării în întregime, fără parte pentru platformă. Suma este 1, 5, 10, 25 sau a ta.',
  'Как пожаловаться на видео?':
    'Cum raportez un videoclip?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Cele trei puncte de sub videoclip → Raportează: alegi un motiv și poți adăuga propriile cuvinte. Ajunge la un om.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Cum distribui o postare?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Cele trei puncte de sub videoclip → Distribuie. Primești un link pe care îl poți trimite oricui.',
  'Куда девается «Сохранить»?':
    'Unde pune lucrurile butonul Salvează?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'În profilul tău, pe raftul salvatelor, sub pictograma semnului de carte de sub filele profilului.',
  'Что видно в моём профиле?':
    'Ce se vede în profilul meu?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Două file: Shorts pentru videoclipurile scurte, Postări pentru tot restul. Atingerea unui cartonaș îl deschide la fel ca în flux. Modificarea și ștergerea le vede doar autorul.',
  'Как изменить профиль?':
    'Cum îmi modific profilul?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Butonul cu creionul din propriul profil: nume, @nume de utilizator, descriere, tipul contului, starea, linkuri și adresă.',
  'Чем бизнес-аккаунт отличается?':
    'Prin ce se deosebește un cont de afaceri?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Public înseamnă că te văd toți. Ascuns înseamnă că numele și poza îți sunt ascunse de ceilalți. De afaceri adaugă o descriere a activității tale, linkuri și o adresă.',
  'Что показывает «онлайн» в шапке?':
    'Ce arată «online» din antet?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Câți oameni sunt acum pe platformă după server. Se împrospătează la fiecare jumătate de minut.',
  'Закрывается ли игра вместе с эфиром?':
    'Se închide jocul odată cu transmisiunea?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Da. Dacă în transmisiune erau cuburi, jocul se stinge singur când se încheie transmisiunea; altfel obiectele ar zbura mai departe peste o hartă goală.',
  'Есть ли смайлы в эфире?':
    'Există emoji în transmisiune?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Există, butonul de emoji de lângă bara de scris are toată colecția comună, aceeași ca în conversații.',
  'Что такое «Все вопросы»?':
    'Ce este Toate întrebările?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Îndrumarul complet al asistentului: peste o sută de întrebări cu răspunsuri, așezate pe secțiuni, cu căutare după titlu.',
  'Куда делась кнопка NET?':
    'Unde a dispărut butonul NET?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'A fost scos. Platforma nu caută în internetul cel mare, iar butonul promitea că o face. Asistentul răspunde despre platformă și găsește cuburi, oameni, grupuri și transmisiuni.',
  'Почему звук повторялся дважды?':
    'De ce se repeta sunetul de două ori?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Vorbeau două bucăți diferite de cod și niciuna n-o întrerupea pe cealaltă. Acum fiecare frază o anulează pe cea dinainte, iar același text nu se repetă de două ori la rând.',
  'Как выключить голос совсем?':
    'Cum opresc vocea cu totul?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Pe pagina Comenzi vocale există un comutator între răspuns cu voce și răspuns în tăcere. Acum chiar o oprește: înainte stăpânea doar o intrare, iar vocea o ocolea.',
  'Что хранится только в моём браузере?':
    'Ce se păstrează doar în navigatorul meu?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Recordurile la jocuri, setările jocului cu cuburi, limba aleasă, tema și fundalul, și lista conturilor tale. Nimic din toate astea nu ajunge pe server.',
  'Почему просят подтвердить удаление?':
    'De ce mi se cere să confirm ștergerea?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Pentru că nu se mai poate întoarce. În conversații se mai întreabă și ce copie să fie scoasă, doar a ta sau a tuturor.',
  'Что такое «У всех» при удалении?':
    'Ce înseamnă «Pentru toți» la ștergere?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Pentru mine» ascunde mesajul doar de pe ecranul tău. «Pentru toți» cere serverului să-l scoată și la celălalt om.',
  'Сколько живёт сообщение с таймером?':
    'Cât trăiește un mesaj cu termen?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Cât ai ales: cinci minute, o oră, o zi, o săptămână sau pentru totdeauna. Butonul ∞ de lângă bara de scris.',
  'Как переслать сообщение?':
    'Cum redirecționez un mesaj?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Meniul mesajului → Redirecționează. Alegi către cine.',
  'Что делает «В избранное»?':
    'Ce face Salvează la favorite?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Pune mesajul în Salvate, caietul tău cu însemnări și lucruri păstrate.',
  'Как найти сообщение в переписке?':
    'Cum găsesc un mesaj în conversație?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Lupa din antetul conversației: caută în text, iar săgețile sar între potriviri. Raftul cu fotografii, videoclipuri, sunete și linkuri este tot acolo.',
  'Что такое «Пригласить в группу»?':
    'Ce este Invită în grup?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Un link din informațiile grupului: cine îl deschide intră în grup.',
  'Можно ли выйти из группы?':
    'Pot ieși dintr-un grup?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Poți, cu un buton din informațiile grupului. Dacă iese proprietarul, grupul în sine nu se șterge.',
  'Сколько форм у предметов?':
    'Câte forme au obiectele?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Douăzeci, plus imaginea sau videoclipul tău peste ele, și modul amestecat.',
  'Что такое шопинг?':
    'Ce sunt cumpărăturile?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'A doua secțiune a marketplace-ului, pentru lucruri: șaisprezece categorii, un cartonaș cu marca și până la douăzeci de fotografii, și o figură care se rotește cu numele mărcii. Plata și livrarea sunt între oameni.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Întreabă în cuvinte: de pildă «cum câștig» sau «caută cubul Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Ce să caut? Scrie ceva de felul «caută cubul Art» sau «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Despre «{что}» nu am un răspuns. Ce cunosc este platforma: CUBE și recompensele, limitele, swapul, portofelul, cheile, semnalele, cuburile și grupurile, jocul cu cuburi, transmisiunile, aspectul și comenzile vocale.'

});
