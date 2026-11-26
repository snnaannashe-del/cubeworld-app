/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-it.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('it', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Post, video e clip rotondi. Da qui si aprono anche i commenti e le reazioni.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Chat private, messaggi vocali e video rotondi, salvati.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Comunità pubbliche: una chat comune, un feed di eventi, i membri.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Segnali di trading: direzione, ingresso, obiettivo e stop. Il server sorveglia il prezzo da solo.',
  'Объявления и обмен между людьми.':
    'Annunci e scambio tra persone.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'I tassi dei premi, lo swap e tutto ciò per cui arrivano i CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Il tuo saldo in CUBE, ricariche, prelievi e cronologia.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Che cosa succede ai tuoi cubi e ai tuoi post, in numeri.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE è la valuta interna della piattaforma. Il server l\'accredita una volta al giorno per l\'attività: giornata attiva, i tuoi post e commenti, le persone che hai invitato. Nello swap il prezzo del CUBE è fissato: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Il server chiude i premi una volta al giorno. Contano: una giornata attiva online, i tuoi post e commenti da 10 mila visualizzazioni, gli invitati che hanno pagato l\'abbonamento, e i supplementi per una settimana, un mese e un anno di fila. I tassi esatti sono sempre aggiornati in Guadagna.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Perché niente si possa gonfiare con i trucchi, il server tiene limiti giornalieri: 20 nuove chat, 500 mi piace, 50 commenti, 500 iscrizioni. Le visualizzazioni non si gonfiano affatto, si contano solo dalle impressioni vere. Quanto resta oggi si vede in Guadagna.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Lo swap cambia cripto in CUBE e viceversa: 16 monete e le loro reti, il cambio si prende al momento della richiesta, il CUBE si conta a $0.50. Entrate e prelievi passano da un fornitore di pagamenti; chiavi di borse o portafogli di nessuno le prendiamo né le conserviamo. Si può prelevare solo ciò che è stato guadagnato, non ciò che è stato accreditato in regalo.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Il portafoglio mostra il tuo saldo in CUBE, la cronologia e i pulsanti di ricarica e prelievo. Ricaricare e prelevare si fa con lo swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Una chiave apre possibilità: Free è la base, Silver è esteso, Gold dà più cubi e statistiche. Le chiavi si comprano con i CUBE. L\'abbonamento Premium dà una quota del fondo premi secondo il tuo contributo del mese.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Un segnale è una direzione, un punto d\'ingresso, un obiettivo e uno stop. Il server sorveglia il prezzo da solo e chiude il segnale all\'obiettivo o allo stop. Non chiediamo chiavi delle borse: operi tu, da te.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Una reazione sotto un post porta CUBE all\'autore. Si possono mettere fino a 500 mi piace al giorno; oltre, il server smette semplicemente di contarli.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Un cubo è il tuo spazio: chat, feed, stanze private e un timer di vita. Si crea con il «+» nel mondo. Le persone si invitano con un link o con la chiave del cubo.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Un cubo è un mondo a parte dentro la piattaforma: ha un nome proprio, una copertina, una chat, un feed e una durata di vita. I cubi si vedono sulla mappa, ci si può girare intorno e ci si può entrare.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'I gruppi sono comunità pubbliche: una chat comune, un feed di eventi e un elenco di membri. Il tuo lo puoi creare nella sezione Gruppi.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Il gioco con i cubi si apre con un pulsante sulla mappa. Le azioni si dividono in spinte (esplosione, lanci, lanciare in aria, fuochi d\'artificio, caos) e modi (lasciar cadere o senza peso, uno dei due, magnete, vortice, congelamento). I modi si sommano e restano finché non si tolgono. Tutto questo funziona con il pulsante, con un gesto davanti alla fotocamera e con la voce.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'Nel gioco si possono accendere i gesti: un movimento di lato è un lancio, in alto lancia in aria, in basso lascia cadere, il palmo in avanti è l\'esplosione, un cerchio è il vortice, due mani sono il caos. L\'immagine della fotocamera non va da nessuna parte, tutto si calcola sul tuo apparecchio.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Gli oggetti non sono solo cubi: cristallo, triangolo, ottaedro, sfera, piramide, prisma, stella, icosaedro, anello, dollaro, euro, yuan. Puoi mettere la tua immagine o il tuo video fino a 15 secondi; uno verticale 9:16 viene ritagliato dal centro in un quadrato.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Il gioco ha otto personaggi: un gatto, un vicino, un cane, un robot, un fantasma, un panda, una rana e un alieno. Si possono accarezzare, fare il solletico e scuotere, e rispondono con voce e movimento. La tua azione si aggiunge con un pulsante: un nome, un comando, una descrizione e con che cosa farla, con la mano, il piede, la testa o tutto il corpo.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'L\'aspetto cambia colore e trasparenza delle finestre: il Colore 1 sono le intestazioni e le barre, il Colore 2 è la finestra stessa, il Colore 3 è la copertina e la cornice del portfolio. Gli sfondi delle chat si scelgono nello stesso posto, e puoi mettere i tuoi in 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Quasi tutto funziona a voce: le sezioni, il gioco, le forme, i personaggi, più di novanta comandi. L\'elenco completo in tutte e venti le lingue è nella pagina Comandi vocali: si apre dall\'Aspetto o dicendo «comandi vocali». L\'interruttore per rispondere ad alta voce o in silenzio è lì accanto.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'I documenti si aprono dal menu dell\'account → Documenti. Sono sette: le condizioni d\'uso, l\'informativa sulla privacy, le regole della comunità, premi e limiti, swap e pagamenti, abbonamento e chiavi, fotocamera e microfono. Anche a voce, basta dire «documenti».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Gli inviti danno CUBE quando l\'invitato paga l\'abbonamento. Il tuo link è nella sezione degli inviti.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Il portfolio è la vetrina del profilo: copertina, descrizione e lavori. L\'aspetto della copertina e della cornice si cambia con il Colore 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Le statistiche mostrano che cosa succede ai tuoi cubi e ai tuoi post: visualizzazioni, reazioni, persone che arrivano.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'Nel profilo puoi nascondere nome e foto; al loro posto resta un numero anonimo. Ma questo ti nasconde dalle altre persone, non dal server: l\'indirizzo IP di una connessione lo vede qualsiasi sito di internet, anche il nostro. Nell\'applicazione non c\'è nulla che nasconda l\'IP.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Il mercato sono annunci e scambio tra persone.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Post, commenti, pubblicità, nomi e descrizioni passano un controllo. Ciò che è chiaramente vietato non viene pubblicato, il dubbio va a un esame umano. Il mercato questo controllo non lo tocca.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Ciao. Sono l\'assistente della piattaforma: rispondo su cubi, premi, portafoglio, gioco e impostazioni, e trovo anche cubi, persone e gruppi. Chiedi a parole, per esempio «come guadagnare», «trova il cubo Art», «chi è @anna». Per il resto del mondo c\'è la scheda NET qui accanto.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE e denaro',
  'Что такое CUBE?':
    'Che cos\'è il CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'I CUBE sono i punti interni della piattaforma. Il server li accredita una volta al giorno per l\'attività. Nello swap il prezzo è fissato: 1 CUBE = $0.50. Non è un titolo finanziario né una promessa di guadagno.',
  'Как заработать?':
    'Come si guadagna?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Conta il server e chiude la giornata una volta ogni 24 ore: giornata attiva online, i tuoi post e commenti da 10 mila visualizzazioni, reazioni sotto i tuoi post, invitati che hanno pagato l\'abbonamento, e supplementi per una settimana, un mese e un anno di fila. I tassi esatti sono in Guadagna.',
  'Какие лимиты в сутки?':
    'Quali limiti ci sono al giorno?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 nuove chat, 500 mi piace, 50 commenti, 500 iscrizioni. Le visualizzazioni non si gonfiano affatto. Il conto va per giornate UTC; se arrivi al limite, l\'azione semplicemente non conta, e non c\'è punizione.',
  'Что считается накруткой?':
    'Che cosa conta come trucco?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Lotti di account, mi piace e iscrizioni automatici, acquisto di visualizzazioni, accordi per reagire a vicenda. I premi ottenuti così vengono tolti.',
  'Как работает свайп?':
    'Come funziona lo swap?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Lo swap cambia cripto in CUBE e viceversa: 16 monete e le loro reti. Il cambio della cripto si prende al momento della richiesta, il CUBE si conta a $0.50. Ricevere e inviare passa da un fornitore di pagamenti.',
  'Как пополнить кошелёк?':
    'Come ricarico il portafoglio?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Con lo swap: crei una richiesta, ricevi un indirizzo e un importo, e mandi il trasferimento dal tuo portafoglio. È importante che moneta e rete coincidano con la richiesta, altrimenti il trasferimento non si recupera.',
  'Как вывести деньги?':
    'Come prelevo i soldi?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'La richiesta di prelievo si crea verso il tuo indirizzo, e la commissione di rete la paga chi riceve. Controlliamo e inviamo a mano, di solito entro una giornata lavorativa.',
  'Почему вывести можно не всё?':
    'Perché non posso prelevare tutto?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Si preleva solo ciò che è stato guadagnato. I CUBE accreditati in regalo o come bonus si spendono dentro la piattaforma ma non si prelevano; altrimenti basterebbe distribuire regali e incassarli.',
  'Какие монеты поддерживаются?':
    'Quali monete sono supportate?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 monete e le loro reti: BTC, ETH, USDT, USDC, BNB e altre undici tra le prime per volume. L\'elenco completo con le reti è nella finestra dello swap.',
  'Что если отправил не в ту сеть?':
    'E se ho mandato sulla rete sbagliata?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Un trasferimento sulla blockchain non si annulla. Scrivi subito all\'assistenza: a volte si può aiutare, ma non si può promettere. Per questo la rete della richiesta e quella del portafoglio devono coincidere.',
  'Берёте ли вы ключи от бирж?':
    'Prendete le chiavi delle borse?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'No. Non chiediamo né accettiamo chiavi di borse, frasi seed o accesso al tuo portafoglio. Se qualcuno lo chiede a nome della piattaforma, è un truffatore.',
  'Платите ли вы налоги за меня?':
    'Pagate le mie tasse?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'No. Quello che devi allo Stato lo decidi e lo paghi tu. Non siamo un sostituto d\'imposta.',
  'Ключи и подписка':
    'Chiavi e abbonamento',
  'Какие бывают ключи?':
    'Quali chiavi esistono?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free è la base, Silver è esteso, Gold dà più cubi e statistiche. La chiave si alza con i CUBE nel Negozio delle chiavi.',
  'Что даёт Premium?':
    'Che cosa dà il Premium?',
  'Долю в фонде наград, эфиры, свои сигналы, аналитику куба, создание файлов, продажу на маркетплейсе, чаевые и подарки, больше кубов и больше места под файлы. Полный список — в «Документах».':
    'Una quota del fondo premi, le dirette, i tuoi segnali, l’analisi del cubo, la creazione di file, la vendita sul mercato, mance e regali, più cubi e più spazio. L’elenco completo è in «Documenti».',
  'Сколько стоит подписка?':
    'Quanto costa l\'abbonamento?',
  'Сильвер — 14 CUBE в месяц или 120 CUBE за год. Голд — 30 CUBE в месяц или 252 CUBE за год. Точные цифры всегда в окне подписки.':
    'Argento costa 14 CUBE al mese o 120 CUBE all’anno. Oro, 30 CUBE al mese o 252 CUBE all’anno. Le cifre esatte sono sempre nella finestra dell’abbonamento.',
  'Как отменить подписку?':
    'Come annullo l\'abbonamento?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'In qualsiasi momento: arriva alla fine del periodo pagato e non si rinnova. Quanto pagato per il periodo in corso non viene restituito, salvo dove il rimborso è richiesto dalla legge.',
  'Я потерял ключ: что делать?':
    'Ho perso la chiave, che faccio?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Non si può recuperare. Non chiediamo né email né telefono, quindi non abbiamo come verificare che l\'account sia tuo. La chiave è l\'account; tienila dove non la perderai.',
  'Можно ли передать ключ другому?':
    'Posso dare la mia chiave a un altro?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Puoi, ma tutto ciò che verrà fatto con essa conta come fatto da te.',
  'Кубы и группы':
    'Cubi e gruppi',
  'Что такое куб?':
    'Che cos\'è un cubo?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Un cubo è un mondo a parte dentro la piattaforma: nome proprio, copertina, chat, feed, stanze private e durata di vita. I cubi si vedono sulla mappa e ci si può entrare.',
  'Как создать куб?':
    'Come creo un cubo?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Con il «+» nel mondo o in Il mio universo. Imposti nome, copertina, tipo e durata di vita. Le persone si invitano con un link o con la chiave del cubo.',
  'Что такое таймер жизни куба?':
    'Che cos\'è il timer di vita del cubo?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Un cubo vive il tempo impostato e poi si chiude. La durata si sceglie alla creazione, da un\'ora a un anno.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Che cosa sono i gruppi?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Comunità pubbliche: una chat comune, un feed di eventi e un elenco di membri.',
  'Как найти куб или человека?':
    'Come trovo un cubo o una persona?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Scrivilo qui: «trova il cubo Art», «@anna», «gruppo foto». Cerco nella piattaforma e mostro schede: cubi, persone, gruppi e dirette in corso adesso.',
  'Лента и посты':
    'Feed e post',
  'Как выложить пост?':
    'Come pubblico un post?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Con il pulsante di creazione nel feed. Sono ammessi un video, un\'immagine, un titolo e una descrizione.',
  'Почему пост не опубликовался?':
    'Perché il mio post non è stato pubblicato?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Il testo non ha passato il controllo prima della pubblicazione. Il messaggio indica il motivo: merci vietate, frode, minacce e così via. Le regole sono nei Documenti, e se è un errore, scrivi all\'assistenza.',
  'Что дают реакции?':
    'Che cosa danno le reazioni?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Una reazione sotto un post porta CUBE all\'autore. Si possono mettere fino a 500 mi piace al giorno.',
  'Как пожаловаться на пост?':
    'Come segnalo un post?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Sotto ogni post e ogni messaggio c\'è un pulsante di segnalazione. La segnalazione va a un esame umano.',
  'Сколько просмотров нужно для начисления?':
    'Quante visualizzazioni servono per essere pagati?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Da 10 mila impressioni vere: i tuoi post e commenti iniziano a portare CUBE da questa soglia.',
  'Игра с кубами':
    'Il gioco con i cubi',
  'Как играть кубами?':
    'Come si gioca con i cubi?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Il pulsante del gioco è sulla mappa. I cubi volano dentro delle pareti e non possono uscirne. Le azioni si premono con un pulsante, si mostrano con la mano davanti alla fotocamera, o si dicono ad alta voce.',
  'Что такое режимы и толчки?':
    'Che cosa sono i modi e le spinte?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Le spinte sono esplosione, lanci, lanciare in aria, fuochi d\'artificio e caos: vanno una volta e funzionano sopra tutto. I modi restano finché non si tolgono e si sommano: gravità (lasciar cadere O senza peso), magnete, vortice, congelamento.',
  'Как работают жесты рукой?':
    'Come funzionano i gesti della mano?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Un movimento di lato è un lancio, in alto lancia in aria, in basso lascia cadere, il palmo in avanti è l\'esplosione, un cerchio è il vortice, due mani sono il caos. I fotogrammi si elaborano sul tuo apparecchio e non vanno da nessuna parte.',
  'Какие есть формы?':
    'Che forme ci sono?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Cubo, cristallo, triangolo, ottaedro, sfera, piramide, prisma, stella, icosaedro, anello, dollaro, euro, yuan, e la tua immagine. In più il «mescolato», dove ogni oggetto ha la sua forma.',
  'Как поставить свою картинку?':
    'Come metto la mia immagine?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'Nel gioco → Forma dell\'oggetto → la casella «Mia». Meglio una quadrata; una verticale 9:16 viene ritagliata dal centro. Premi di nuovo «Mia» per sostituirla.',
  'Можно ли поставить видео?':
    'Si può usare un video?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Sì, fino a 15 secondi. Più lungo viene rifiutato. Il video sopravvive a un ricaricamento della pagina.',
  'Кто такие персонажи?':
    'Chi sono i personaggi?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Otto personaggi: un gatto, un vicino, un cane, un robot, un fantasma, un panda, una rana, un alieno. Si possono accarezzare, fare il solletico e scuotere, e rispondono con voce e movimento.',
  'Как добавить своё действие?':
    'Come aggiungo la mia azione?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Con un pulsante nella sezione dei personaggi: un nome, un comando, una descrizione e con che cosa farla, con la mano, il piede, la testa o tutto il corpo. L\'azione si sceglie tra sedici effetti già pronti.',
  'Как крутятся предметы?':
    'Come girano gli oggetti?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Cinque modi: nel senso dell\'asse, contro l\'asse, sopra la testa, sotto il fondo, e alla rinfusa. La rotazione di un lancio si somma al modo scelto.',
  'Как начать эфир?':
    'Come inizio una diretta?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Il pulsante Diretta nel feed, o il comando vocale «diretta». Scegli un titolo e un modo, e sei in onda. Gli spettatori ricevono l\'immagine direttamente da te.',
  'Какие режимы эфира?':
    'Quali modi di diretta ci sono?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Fotocamera e cubi: la scena sopra l\'immagine della fotocamera, con i gesti attivi. Solo cubi: la scena senza fotocamera. Diretta pulita: solo la fotocamera, senza commenti, reazioni e regali.',
  'Сколько зрителей выдержит эфир?':
    'Quanti spettatori regge una diretta?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'L\'immagine va direttamente dall\'autore a ogni spettatore, quindi dipende dalla connessione dell\'autore: su una linea di casa dieci o quindici persone guardano comodamente. Una sala più grande ha bisogno di un server ripetitore.',
  'Что такое подарки?':
    'Che cosa sono i regali?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Trenta regali, da una Rosa per 1 CUBE a un Cubo Leggenda per 1000. Un regalo è un trasferimento di CUBE all\'autore per intero; la piattaforma non trattiene nulla.',
  'Как закончить эфир?':
    'Come chiudo una diretta?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Il pulsante Termina diretta nell\'intestazione della finestra, visibile in ogni modo. Chiudere la finestra con la croce non ferma la diretta: continua finché non premi Termina.',
  'Голос и языки':
    'Voce e lingue',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Quali comandi vocali esistono?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Più di novanta: sezioni, finestre, creazione, il feed, il gioco, le forme, i personaggi, i controlli. L\'elenco completo con la ricerca è nella pagina Comandi vocali: menu dell\'account → Comandi vocali, oppure in Aspetto, oppure di\' semplicemente «comandi vocali».',
  'На каких языках работает голос?':
    'In quali lingue funziona la voce?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'In venti: russo, inglese (anche quello indiano), ucraino, tedesco, francese (e quello del Canada), spagnolo (e quello latinoamericano), italiano, portoghese, polacco, turco, arabo (e quello del Golfo), vietnamita, cinese, giapponese, coreano, hindi. La lingua si sceglie nella pagina dei comandi e in Aspetto.',
  'Как включить микрофон?':
    'Come accendo il microfono?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Il pulsante del microfono è nella barra in alto. Lo premi e ascolta, lo premi di nuovo e si ferma.',
  'Как выключить озвучку?':
    'Come spengo le risposte parlate?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Nella pagina Comandi vocali c\'è un interruttore tra rispondere ad alta voce e rispondere in silenzio. La voce ascolta comunque; cambia solo la risposta.',
  'Куда уходит мой голос?':
    'Dove va la mia voce?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Il riconoscimento lo fa il browser stesso. Chrome e i browser che ne derivano mandano il suono ai server di Google; il loro riconoscimento è fatto così e la piattaforma non decide nulla in merito. Se non ti va bene, non accendere il microfono: tutto c\'è anche come pulsanti.',
  'Как поменять тему?':
    'Come cambio il tema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Aspetto → Tema: scuro, chiaro, o Fotocamera, dove lo sfondo è l\'immagine della tua fotocamera.',
  'Что такое Цвет 1, 2 и 3?':
    'Che cosa sono il Colore 1, 2 e 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Il Colore 1 sono le intestazioni, le barre di scrittura e le schede. Il Colore 2 è la finestra stessa: lo sfondo della chat e l\'elenco dei commenti. Il Colore 3 è la copertina e la cornice del portfolio. Ognuno ha il suo cursore di trasparenza.',
  'Как поставить обои?':
    'Come metto uno sfondo?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Aspetto → Sfondo: un insieme di sfondi pronti o la tua immagine in 9:16. Il Colore 2 si posa sullo sfondo come una tinta, e il cursore decide quanto forte.',
  'Правила и безопасность':
    'Regole e sicurezza',
  'Что нельзя выкладывать?':
    'Che cosa non si può pubblicare?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Materiale con minori, minacce e appelli alla violenza, incitamento all\'odio, frode, merci vietate, lavoro altrui senza averne diritto, farsi passare per un altro, spam e attività finta. Per intero, nelle Regole della comunità.',
  'Как работает модерация?':
    'Come funziona la moderazione?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Post, commenti, messaggi di gruppo, nomi e descrizioni vengono controllati sul server prima della pubblicazione. Ciò che è chiaramente vietato non viene pubblicato, il dubbio va a un esame umano. Il mercato e le chat private non vengono controllati.',
  'Виден ли мой IP?':
    'Il mio IP è visibile?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Sì, il server lo vede, come qualsiasi sito di internet: senza IP non saprebbe dove mandare la risposta. La modalità nascosta nasconde nome e foto dalle altre persone, ma non dal server.',
  'Что вы храните обо мне?':
    'Che cosa conservate su di me?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'La chiave dell\'account, il profilo che hai riempito tu, i tuoi contenuti, i contatori giornalieri e i dati tecnici della connessione. Né email, né telefono, né password, né chiavi di portafogli.',
  'Куда жаловаться?':
    'Dove mi lamento?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Per un contenuto, con il pulsante di segnalazione sotto di esso. Per tutto il resto, con l\'assistenza dentro la piattaforma.',
  'Где документы?':
    'Dove sono i documenti?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Menu dell\'account → Documenti. Sono sette: le condizioni, l\'informativa sulla privacy, le regole della comunità, premi e limiti, swap e pagamenti, abbonamento e chiavi, fotocamera e microfono.',
  'Что такое карта?':
    'Che cos\'è la mappa?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'La mappa della piattaforma: 177 paesi e 1150 città con coordinate vere, la posizione del sole calcolata per l\'ora attuale, il lato notturno e l\'alba esattamente dove stanno nel cielo. Venti viste: dallo spazio, la Terra di notte, giorno e notte, le strade di OpenStreetMap, il tempo, i terremoti, i fusi orari, i nostri cubi e le dirette. Si apre dal menu dell\'account o dicendo «mappa».',
  'Как проложить маршрут на карте?':
    'Come traccio un percorso sulla mappa?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Tocca l\'inizio sulla mappa, poi la fine, e scegli una delle venti strade. Il cerchio massimo e la lossodromia, il modo in cui si vola e si naviga davvero. Solo terra e solo acqua, una vera ricerca di cammino attraverso i continenti senza un solo passo nell\'altro elemento. Per l\'ombra e per la luce, seguendo il lato notturno. Accanto a cubi, dirette e persone, per i nostri segnaposti. Il percorso per strade lo calcola il motore esterno OSRM; se non risponde, lo diciamo.',
  'Видно ли меня на карте?':
    'Sono visibile sulla mappa?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Solo se hai messo tu stesso il segnaposto «sono qui». Vive mezz\'ora e si cancella da solo, le coordinate vengono arrotondate al chilometro ancora prima di essere mandate al server, e «toglimi dalla mappa» cancella il record invece di nasconderlo. Senza quel segnaposto non sei sulla mappa per niente.',
  'Есть ли на карте спутник и пробки?':
    'La mappa ha le immagini satellitari e il traffico?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'No. Le immagini satellitari e il traffico li servono fornitori a pagamento con una chiave. Il posto per quei livelli è pronto: si mette una chiave e si accendono. Finché non c\'è chiave, la mappa lo dice chiaramente invece di disegnare una bella bugia.',
  'Что такое забег по улице?':
    'Che cos\'è la corsa per strada?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Un salto dentro la mappa: vista in prima persona, gli edifici e le curve vere della tua strada. Corri tu: scorri di lato per cambiare corsia, e a un incrocio per girare, in alto per saltare, in basso per scivolare. Raccogli cubi ed eviti barriere e raggi. Lungo la strada incontri dirette, cubi e vetrine di altre persone. C\'è anche una passeggiata tranquilla con il joystick. Si apre dal menu dell\'account, dalla mappa con il pulsante Alla strada, o dicendo «corsa».',
  'Откуда берутся дома в забеге?':
    'Da dove vengono gli edifici della corsa?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Da OpenStreetMap: contorni e numeri di piani veri, strade vere con le loro larghezze e curve. Contiamo un piano come tre metri; se manca il numero di piani, l\'altezza si ricava dall\'impronta dell\'edificio. Non ci sono fotografie delle strade, quelle le servono fornitori a pagamento. Se il server della mappa è occupato, il gioco lo dice onestamente e costruisce un quartiere nostro.',
  'Что такое шопинг в маркетплейсе?':
    'Che cos\'è lo shopping nel mercato?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'La seconda sezione del mercato, per cose invece che file: sedici categorie dai vestiti all\'arte, una scheda con la marca, taglie, colori, caratteristiche e fino a venti foto. Ogni scheda ha una figura che gira con sopra il nome della marca, una delle venti forme. La sezione non tocca il denaro: pagamento e consegna sono tra le persone, per questo c\'è scritto «scrivi al venditore» e non «compra con i CUBE».',
  'Игры, чаты и новое':
    'Giochi, chat e novità',
  'Сколько игр в зале?':
    'Quanti giochi ci sono nella sala?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Otto, e si possono giocare tutti: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Si comandano con il dito e con la tastiera.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'I giochi danno CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'No. I giochi danno punti e un record personale, conservati nel tuo browser. I CUBE li accredita il server per le visualizzazioni e dal fondo comune; coniare monete in un browser sarebbe una bugia.',
  'Как играть в DataMine?':
    'Come si gioca a DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Un campo di otto per otto. Tocchi una casella e scavi i dati; il numero mostra quanti virus ci sono accanto. Una pressione lunga mette una bandierina. Tre vite, poi uno strato nuovo.',
  'Как играть в CipherBreak?':
    'Come si gioca a CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Indovina un codice di quattro simboli. Dopo un tentativo, un cerchio pieno vuol dire che il simbolo è al posto giusto, uno vuoto che è nel codice ma altrove. Otto tentativi.',
  'Как играть в Phantom Escape?':
    'Come si gioca a Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Raccogli cinque chiavi ed esci dalla porta. I fantasmi ti seguono per la via più breve, e a ogni piano sono di più.',
  'Как играть в Block Trade?':
    'Come si gioca a Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Un minuto e mezzo, con 1000 in mano. Compra più basso, vendi più alto. Il tuo punteggio è tutto quello che supera il migliaio.',
  'Как играть в TrustChain?':
    'Come si gioca a TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Tocca i blocchi in ordine crescente mentre corre l\'orologio. Un errore e la catena si spezza. A ogni giro la catena si allunga.',
  'Как играть в CubeBuilder?':
    'Come si gioca a CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'La lastra va di lato e un tocco la lascia cadere. Ciò che sporge cade, e la lastra si restringe. Se sbagli la torre, è finita.',
  'Что показывает строка курсов?':
    'Che cosa mostra il nastro dei prezzi?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Trenta monete con il prezzo e la variazione del giorno. I dati arrivano tramite il nostro server, che tiene mezzo minuto in cache. Il nastro non striscia: sullo schermo entra un numero intero di celle e cambiano ogni pochi secondi.',
  'Что значит число кубов в шапке?':
    'Che cosa vuol dire il numero di cubi nell\'intestazione?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Quanti cubi ci sono adesso nel tuo mondo, quelli che vedi davanti a te. Non il numero totale di cubi della piattaforma.',
  'Можно ли войти вторым аккаунтом?':
    'Posso entrare con un secondo account?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Sì. Menu dell\'account → Aggiungi un account: la chiave attuale resta nell\'elenco, e ci torni con un tocco dallo stesso menu. Se ne ricordano fino a otto.',
  'Зачем «Сохранить» в окне игры?':
    'A che serve Salva nella finestra del gioco?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Ricorda la forma dell\'oggetto, il personaggio, i gesti e la dimensione. La volta dopo trovi tutto dove l\'hai lasciato.',
  'Чем режим отличается от толчка?':
    'In che cosa un modo è diverso da una spinta?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Un modo resta finché non lo spegni con un secondo tocco, e rimane acceso. Una spinta va una volta e non si accende; tiene solo un segno sottile di essere stata l\'ultima premuta.',
  'Почему кубы больше не исчезают?':
    'Perché i cubi non spariscono più?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'I cubi di prova della vetrina vivevano poco, cinque e quindici minuti. Ora hanno almeno mezza giornata, e vengono riavviati prima di esaurirsi. I cubi veri vivono esattamente quanto è stato dato loro alla creazione.',
  'Как сделать фото прямо в чат?':
    'Come faccio una foto direttamente in una chat?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'La graffetta → Fotocamera apre la nostra ripresa. Un tocco fa una foto, una pressione lunga registra video fino a un minuto. La galleria è la voce accanto, Foto o video.',
  'Что такое галерея переписки?':
    'Che cos\'è la galleria della chat?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'La lente nell\'intestazione di una chat apre la ricerca e sopra uno scaffale: foto, video, audio e link di quella chat. Si raccoglie dai messaggi stessi e nulla va da nessuna parte.',
  'Как удалить сразу несколько сообщений?':
    'Come cancello più messaggi insieme?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Una pressione lunga su un messaggio accende la selezione, poi spunti quelli che vuoi e premi Cancella nella barra in basso. Fino a cento per volta.',
  'Можно ли изменить своё сообщение?':
    'Posso modificare un mio messaggio?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Sì, i tuoi e solo quelli di testo: menu del messaggio → Modifica. Accanto compare la scritta «modificato». La chat non si chiude mentre lo fai.',
  'Что такое сторис?':
    'Che cosa sono le storie?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Post brevi che durano un giorno, sopra l\'elenco delle chat: una foto o un video fino a un minuto. Si guardano uno dopo l\'altro e dopo un giorno spariscono da sole.',
  'Сколько фото можно в группу?':
    'Quante foto stanno in un gruppo?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Fino a sette foto, o un video fino a un minuto. In più un\'icona dall\'insieme e le etichette sotto la descrizione.',
  'Что такое теги группы?':
    'Che cosa sono le etichette del gruppo?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Qualche parola separata da virgole, per cui il gruppo si trova nella ricerca.',
  'Видно ли участников группы?':
    'I membri del gruppo si vedono?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Lo decide il proprietario alla creazione: l\'elenco dei membri può essere mostrato a tutti o restare visibile solo al proprietario.',
  'Почему поле ссылки на видео убрали?':
    'Perché è stato tolto il campo del link al video?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Un link altrui si rompeva quando lo cancellavano dall\'altra parte, e la piattaforma non poteva risponderne. Un video si carica come file nel nostro archivio.',
  'Сколько длится видео в посте?':
    'Quanto può durare un video in un post?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Per ora un file fino a 50 MB. Su un server più grande ci saranno gradini: 15 secondi, un minuto, tre minuti e quindici.',
  'Что делает кнопка «Чаевые автору»?':
    'Che cosa fa il pulsante Mancia all\'autore?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Trasferisce CUBE dal tuo saldo all\'autore del post per intero, senza quota per la piattaforma. L\'importo è 1, 5, 10, 25 o il tuo.',
  'Как пожаловаться на видео?':
    'Come segnalo un video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'I tre puntini sotto il video → Segnala: scegli un motivo e puoi aggiungere parole tue. Va a un esaminatore umano.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Come condivido un post?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'I tre puntini sotto il video → Condividi. Ricevi un link che puoi mandare a chiunque.',
  'Куда девается «Сохранить»?':
    'Dove mette le cose Salva?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Nel tuo profilo, sullo scaffale dei salvati, sotto l\'icona del segnalibro sotto le schede del profilo.',
  'Что видно в моём профиле?':
    'Che cosa si vede nel mio profilo?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Due schede: Shorts per i tuoi video brevi, Post per tutto il resto. Toccando una scheda si apre come nel feed. Modifica ed elimina li vede solo l\'autore.',
  'Как изменить профиль?':
    'Come modifico il mio profilo?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Il pulsante con la matita nel tuo profilo: nome, @nome utente, descrizione, tipo di account, stato, link e indirizzo.',
  'Чем бизнес-аккаунт отличается?':
    'In che cosa è diverso un account aziendale?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Pubblico vuol dire che ti vedono tutti. Nascosto vuol dire che nome e foto sono nascosti dalle altre persone. Azienda aggiunge una descrizione della tua attività, link e un indirizzo.',
  'Что показывает «онлайн» в шапке?':
    'Che cosa mostra «online» nell\'intestazione?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Quante persone sono adesso sulla piattaforma secondo il server. Si aggiorna ogni mezzo minuto.',
  'Закрывается ли игра вместе с эфиром?':
    'Il gioco si chiude insieme alla diretta?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Sì. Se la diretta aveva i cubi, il gioco si spegne da solo quando la diretta finisce; altrimenti gli oggetti continuavano a volare sopra una mappa vuota.',
  'Есть ли смайлы в эфире?':
    'Ci sono le emoji in una diretta?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Sì, il pulsante delle emoji accanto alla barra di scrittura ha tutta la raccolta comune, la stessa delle chat.',
  'Что такое «Все вопросы»?':
    'Che cos\'è Tutte le domande?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Il manuale completo dell\'assistente: più di cento domande con risposte, ordinate per sezioni, con ricerca per titolo.',
  'Куда делась кнопка NET?':
    'Dov\'è finito il pulsante NET?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'È stato tolto. La piattaforma non cerca nella rete grande, e il pulsante prometteva il contrario. L\'assistente risponde sulla piattaforma e trova cubi, persone, gruppi e dirette.',
  'Почему звук повторялся дважды?':
    'Perché il suono si ripeteva due volte?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Parlavano due pezzi di codice diversi e nessuno tagliava l\'altro. Ora ogni frase annulla la precedente, e lo stesso testo non si ripete due volte di fila.',
  'Как выключить голос совсем?':
    'Come spengo la voce del tutto?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Nella pagina Comandi vocali c\'è un interruttore tra rispondere ad alta voce e rispondere in silenzio. Ora la spegne davvero: prima comandava solo un ingresso e la voce lo aggirava.',
  'Что хранится только в моём браузере?':
    'Che cosa resta solo nel mio browser?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'I record dei giochi, le impostazioni del gioco con i cubi, la lingua scelta, il tema e lo sfondo, e l\'elenco dei tuoi account. Niente di tutto questo va al server.',
  'Почему просят подтвердить удаление?':
    'Perché mi chiedono di confermare una cancellazione?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Perché non si può annullare. Nelle chat chiedono anche quale copia togliere, solo la tua o quella di tutti.',
  'Что такое «У всех» при удалении?':
    'Che cosa vuol dire «Per tutti» quando si cancella?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Per me» nasconde il messaggio dal tuo schermo. «Per tutti» chiede al server di toglierlo anche all\'altra persona.',
  'Сколько живёт сообщение с таймером?':
    'Quanto vive un messaggio a tempo?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Quanto hai scelto: cinque minuti, un\'ora, un giorno, una settimana o per sempre. Il pulsante ∞ accanto alla barra di scrittura.',
  'Как переслать сообщение?':
    'Come inoltro un messaggio?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Menu del messaggio → Inoltra. Scegli a chi.',
  'Что делает «В избранное»?':
    'Che cosa fa Salva nei preferiti?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Mette il messaggio in Salvati, il tuo quaderno con note e cose conservate.',
  'Как найти сообщение в переписке?':
    'Come trovo un messaggio in una chat?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'La lente nell\'intestazione della chat: cerca nel testo e le frecce saltano tra le corrispondenze. Lo scaffale con foto, video, audio e link è nello stesso posto.',
  'Что такое «Пригласить в группу»?':
    'Che cos\'è Invita nel gruppo?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Un link dalle informazioni del gruppo: chi lo apre entra nel gruppo.',
  'Можно ли выйти из группы?':
    'Posso uscire da un gruppo?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Sì, con un pulsante nelle informazioni del gruppo. Se esce il proprietario, il gruppo non viene cancellato.',
  'Сколько форм у предметов?':
    'Quante forme hanno gli oggetti?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Venti, più la tua immagine o il tuo video sopra di esse, e il modo mescolato.',
  'Что такое шопинг?':
    'Che cos\'è lo shopping?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'La seconda sezione del mercato, per le cose: sedici categorie, una scheda con la marca e fino a venti foto, e una figura che gira con il nome della marca. Pagamento e consegna sono tra le persone.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Chiedi a parole: per esempio «come guadagnare» o «trova il cubo Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Che cosa cerco? Scrivi qualcosa come «trova il cubo Art» o «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Su «{что}» non ho una risposta. Quello che conosco è la piattaforma: CUBE e premi, limiti, lo swap, il portafoglio, le chiavi, i segnali, i cubi e i gruppi, il gioco con i cubi, le dirette, l\'aspetto e i comandi vocali.'

});
