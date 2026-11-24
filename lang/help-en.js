/* ═══════════════════════════════════════════════════════════════════════
   HELP (ENGLISH) — справочник помощника по-английски

       lang/help-en.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов — всё, что знает shared/помощник.js. В общий
   словарь это не положено нарочно: тридцать килобайт на язык, а
   помощник открывается в двух окнах из двадцати одного.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: по-русски их
   список лежит в самом справочнике, а на других языках вопрос
   узнаётся по словам этого перевода.

   Везёт этот файл то окно, которому он нужен:

       CW.довезти('help').then(нарисовать);
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('en', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Posts, videos and round clips. Comments and reactions open from here too.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Private chats, voice messages and round videos, saved items.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Public communities: a shared chat, a feed of events, the members.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Trading signals: direction, entry, target and stop. The server watches the price itself.',
  'Объявления и обмен между людьми.':
    'Listings and trade between people.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Reward rates, the swap and everything CUBE comes for.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Your CUBE balance, top-ups, withdrawals and history.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'What is happening to your cubes and posts, in numbers.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE is the platform\'s internal currency. The server credits it once a day for activity: an active day, your own posts and comments, people you invited. Inside the swap the CUBE price is fixed: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'The server closes the rewards once a day. What counts: an active day online, your own posts and comments from 10 thousand views, invited people who paid for a subscription, and bonuses for a week, a month and a year in a row. The exact rates are always current in Earn.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'So that nothing can be inflated by faking, the server keeps daily limits: 20 new chats, 500 likes, 50 comments, 500 follows. Views cannot be faked at all, they are counted only from real impressions. How much is left today is shown in Earn.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'The swap exchanges crypto for CUBE and back: 16 coins and their networks, the rate is taken at the moment of the request, CUBE is counted at $0.50. Deposits and withdrawals go through a payment provider; we do not take or keep anyone\'s exchange or wallet keys. Only what you earned can be withdrawn, not what was credited as a gift.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'The wallet shows your CUBE balance, the history and the top-up and withdrawal buttons. Topping up and withdrawing go through the swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'A key unlocks features: Free is the basics, Silver is extended, Gold gives more cubes and analytics. Keys are bought with CUBE. A Premium subscription gives a share of the reward pool according to your contribution for the month.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'A signal is a direction, an entry point, a target and a stop. The server watches the price itself and closes the signal at the target or the stop. We do not ask for exchange keys: you trade yourself, at your own place.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'A reaction under a post brings the author CUBE. You can give up to 500 likes a day; beyond that the server simply stops counting them.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'A cube is your own space: a chat, a feed, private rooms and a life timer. You create one with the “+” in the world. People are invited by a link or by the cube key.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'A cube is a separate world inside the platform: it has its own name, cover, chat, feed and lifetime. Cubes are visible on the map, you can walk around them and join them.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Groups are public communities: a shared chat, a feed of events and a list of members. You can create your own in the Groups section.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'The cube game opens with a button on the map. The actions split into pushes (blast, throws, toss up, fireworks, chaos) and modes (drop or weightless, one of the two, magnet, whirl, freeze). Modes stack and hold until they are switched off. All of it works by button, by a gesture in front of the camera and by voice.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'In the game you can switch on gestures: a swing sideways for a throw, up to toss, down to drop, palm forward for a blast, a circle for a whirl, both hands for chaos. The camera image goes nowhere, everything is computed right on your device.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'The objects are not only cubes: a crystal, a triangle, an octahedron, a sphere, a pyramid, a prism, a star, an icosahedron, a ring, a dollar, a euro, a yuan. You can put your own picture or your own video of up to 15 seconds; a vertical 9:16 one is cropped from the centre into a square.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'The game has eight characters: a cat, a neighbour, a dog, a robot, a ghost, a panda, a frog and an alien. You can pet them, tickle them and shake them up, and they answer with voice and movement. Your own action is added with a button: a name, a command, a description and what to do it with, a hand, a foot, the head or the whole body.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Appearance changes the colour and transparency of the windows: Colour 1 is the headers and bars, Colour 2 is the window itself, Colour 3 is the portfolio cover and frame. Chat wallpapers are picked in the same place, and you can put your own in 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Almost everything works by voice: the sections, the game, the shapes, the characters, more than ninety commands. The full list in all twenty languages is on the Voice commands page: it opens from Appearance or by saying “voice commands”. The switch for answering aloud or silently is there too.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'The documents open from your account menu → Documents. There are seven: the terms of use, the privacy policy, the community rules, rewards and limits, swap and payments, subscription and keys, camera and microphone. By voice as well, just say “documents”.',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Invitations give CUBE when the invited person pays for a subscription. Your own link is in the invitations section.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'The portfolio is the showcase of a profile: a cover, a description and the work. The look of the cover and the frame is changed with Colour 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Analytics shows what is happening to your cubes and posts: views, reactions, people coming in.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'In your profile you can hide your name and avatar; an anonymous number is shown instead. But that hides you from other people, not from the server: the IP address of a connection is visible to any site on the internet, ours included. There is nothing in the app that hides an IP.',
  'Маркетплейс: объявления и обмен между людьми.':
    'The marketplace is listings and trade between people.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Posts, comments, ads, names and descriptions go through a check. Clearly forbidden things are not published, borderline ones go to a human for review. The marketplace is not touched by this check.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Hello. I am the platform\'s helper: I answer about cubes, rewards, the wallet, the game and the settings, and I also find cubes, people and groups. Ask in words, for example “how do I earn”, “find the cube Art”, “who is @anna”. For the rest of the world there is the NET tab next door.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE and money',
  'Что такое CUBE?':
    'What is CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE are the platform\'s internal points. The server credits them once a day for activity. Inside the swap the price is fixed: 1 CUBE = $0.50. It is not a security and not a promise of income.',
  'Как заработать?':
    'How do I earn?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'The server counts and closes the day once every 24 hours: an active day online, your own posts and comments from 10 thousand views, reactions under your posts, invited people who paid for a subscription, and bonuses for a week, a month and a year in a row. The exact rates are in Earn.',
  'Какие лимиты в сутки?':
    'What are the daily limits?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 new chats, 500 likes, 50 comments, 500 follows. Views cannot be faked at all. The count runs on UTC days; if you hit the limit the action simply does not count, and there is no punishment for it.',
  'Что считается накруткой?':
    'What counts as faking?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Batches of accounts, automatic likes and follows, buying views, arranging mutual reactions. Rewards obtained that way are taken back.',
  'Как работает свайп?':
    'How does the swap work?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'The swap exchanges crypto for CUBE and back: 16 coins and their networks. The crypto rate is taken at the moment of the request, CUBE is counted at $0.50. Receiving and sending go through a payment provider.',
  'Как пополнить кошелёк?':
    'How do I top up the wallet?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Through the swap: you create a request, get an address and an amount, and send the transfer from your own wallet. It matters that the coin and the network match the request, otherwise the transfer cannot be recovered.',
  'Как вывести деньги?':
    'How do I withdraw money?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'A withdrawal request is created to your address, and the network fee is paid by the recipient. We check and send it by hand, usually within a working day.',
  'Почему вывести можно не всё?':
    'Why can I not withdraw everything?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Only what you earned can be withdrawn. CUBE credited as a gift or a bonus can be spent inside the platform but not withdrawn; otherwise it would be enough to hand out gifts and cash them out.',
  'Какие монеты поддерживаются?':
    'Which coins are supported?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 coins and their networks: BTC, ETH, USDT, USDC, BNB and eleven more from the top by turnover. The full list with the networks is in the swap window.',
  'Что если отправил не в ту сеть?':
    'What if I sent it to the wrong network?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'A transfer on a blockchain cannot be reversed. Write to support straight away: sometimes it can be helped, but that cannot be promised. This is why the network in the request and in your wallet have to match.',
  'Берёте ли вы ключи от бирж?':
    'Do you take exchange keys?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'No. We neither ask for nor accept exchange keys, seed phrases or access to your wallet. If someone asks for that on behalf of the platform, they are a scammer.',
  'Платите ли вы налоги за меня?':
    'Do you pay my taxes?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'No. What you owe the state is yours to work out and to pay. We are not a tax agent.',
  'Ключи и подписка':
    'Keys and subscription',
  'Какие бывают ключи?':
    'What keys are there?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free is the basics, Silver is extended, Gold gives more cubes and analytics. A key is upgraded with CUBE in the Key shop.',
  'Что даёт Premium?':
    'What does Premium give?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'A share of the reward pool according to your contribution for the month, external wallets connected for display, statistics and a rating, priority in signals, a badge in your profile and in chats, and closed Premium cubes.',
  'Сколько стоит подписка?':
    'How much is the subscription?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 a month or $59.99 a year.',
  'Как отменить подписку?':
    'How do I cancel the subscription?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'At any time: it runs out the period you paid for and is not renewed. What was paid for the current period is not refunded, except where a refund is required by law.',
  'Я потерял ключ: что делать?':
    'I lost my key, what do I do?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'It cannot be recovered. We ask for neither an email nor a phone number, so we have no way to confirm the account is yours. The key is the account; keep it somewhere you will not lose it.',
  'Можно ли передать ключ другому?':
    'Can I give my key to someone else?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'You can, but everything done under it counts as done by you.',
  'Кубы и группы':
    'Cubes and groups',
  'Что такое куб?':
    'What is a cube?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'A cube is a separate world inside the platform: its own name, cover, chat, feed, private rooms and lifetime. Cubes are visible on the map and you can join them.',
  'Как создать куб?':
    'How do I create a cube?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'With the “+” in the world or in My Universe. You set a name, a cover, the type and the lifetime. People are invited by a link or by the cube key.',
  'Что такое таймер жизни куба?':
    'What is the cube life timer?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'A cube lives for a set time and then closes. The period is chosen when you create it, from an hour to a year.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'What are groups?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Public communities: a shared chat, a feed of events and a list of members.',
  'Как найти куб или человека?':
    'How do I find a cube or a person?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Write it right here: “find the cube Art”, “@anna”, “photo group”. I will search the platform and show cards: cubes, people, groups and streams that are live right now.',
  'Лента и посты':
    'Feed and posts',
  'Как выложить пост?':
    'How do I publish a post?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'With the create button in the feed. A video, a picture, a title and a description are all allowed.',
  'Почему пост не опубликовался?':
    'Why was my post not published?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'The text did not pass the check before publishing. The message shows the reason: forbidden goods, fraud, threats and so on. The rules are in Documents, and if it is a mistake, write to support.',
  'Что дают реакции?':
    'What do reactions give?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'A reaction under a post brings the author CUBE. You can give up to 500 likes a day.',
  'Как пожаловаться на пост?':
    'How do I report a post?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'There is a report button under every post and message. A report goes to a human for review.',
  'Сколько просмотров нужно для начисления?':
    'How many views are needed for a reward?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'From 10 thousand real impressions: your own posts and comments start bringing CUBE from that threshold.',
  'Игра с кубами':
    'The cube game',
  'Как играть кубами?':
    'How do I play with cubes?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'The game button is on the map. The cubes fly inside walls and cannot leave them. Actions are pressed with a button, shown with a hand in front of the camera, or said out loud.',
  'Что такое режимы и толчки?':
    'What are modes and pushes?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Pushes are blast, throws, toss up, fireworks and chaos: one-off and they work on top of everything. Modes hold until they are switched off and they stack: gravity (drop OR weightless), magnet, whirl, freeze.',
  'Как работают жесты рукой?':
    'How do hand gestures work?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'A swing sideways is a throw, up is a toss, down is a drop, palm forward is a blast, a circle is a whirl, both hands is chaos. The frames are processed right on your device and go nowhere.',
  'Какие есть формы?':
    'What shapes are there?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'A cube, a crystal, a triangle, an octahedron, a sphere, a pyramid, a prism, a star, an icosahedron, a ring, a dollar, a euro, a yuan, and your own picture. Plus “mixed up”, where every object has its own shape.',
  'Как поставить свою картинку?':
    'How do I use my own picture?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'In the game → Object shape → the “Mine” tile. A square works best; a vertical 9:16 one is cropped from the centre. Tap “Mine” again to replace it.',
  'Можно ли поставить видео?':
    'Can I use a video?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Yes, up to 15 seconds. Longer than that is refused. The video survives a page reload.',
  'Кто такие персонажи?':
    'Who are the characters?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Eight characters: a cat, a neighbour, a dog, a robot, a ghost, a panda, a frog, an alien. You can pet them, tickle them and shake them up, and they answer with voice and movement.',
  'Как добавить своё действие?':
    'How do I add my own action?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'With a button in the characters section: a name, a command, a description and what to do it with, a hand, a foot, the head or the whole body. The action itself is picked from sixteen ready effects.',
  'Как крутятся предметы?':
    'How do the objects spin?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Five modes: along the axis, against the axis, over the top, under the bottom, and all over the place. The spin from a throw is added on top of the chosen mode.',
  'Как начать эфир?':
    'How do I start a stream?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'The Stream button in the feed, or the voice command “stream”. You choose a title and a mode, and you are live. Viewers get the picture straight from you.',
  'Какие режимы эфира?':
    'What stream modes are there?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Camera and cubes: the scene on top of the camera image, with gestures working. Cubes only: the scene without the camera. Clean stream: just the camera, with no comments, reactions or gifts.',
  'Сколько зрителей выдержит эфир?':
    'How many viewers can a stream hold?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'The picture goes straight from the host to every viewer, so it is limited by the host\'s connection: on a home line ten to fifteen people watch comfortably. A bigger room needs a relay server.',
  'Что такое подарки?':
    'What are gifts?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Thirty gifts, from a Rose for 1 CUBE to a Legend Cube for 1000. A gift is a transfer of CUBE to the host in full; the platform takes no share.',
  'Как закончить эфир?':
    'How do I end a stream?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'The End stream button in the window header, visible in every mode. Closing the window with the cross does not stop the stream: it keeps going until you press End.',
  'Голос и языки':
    'Voice and languages',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'What voice commands are there?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'More than ninety: sections, windows, creating, the feed, the game, shapes, characters, controls. The full list with a search is on the Voice commands page: your account menu → Voice commands, or in Appearance, or just say “voice commands”.',
  'На каких языках работает голос?':
    'Which languages does voice work in?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'In twenty: Russian, English (Indian English too), Ukrainian, German, French (and Canadian), Spanish (and Latin American), Italian, Portuguese, Polish, Turkish, Arabic (and Gulf Arabic), Vietnamese, Chinese, Japanese, Korean, Hindi. The language is chosen on the commands page and in Appearance.',
  'Как включить микрофон?':
    'How do I switch the microphone on?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'The microphone button is in the top bar. Press it and it listens, press again and it stops.',
  'Как выключить озвучку?':
    'How do I switch off the spoken replies?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'On the Voice commands page there is a switch between answering aloud and answering silently. Voice listens either way; only the reply differs.',
  'Куда уходит мой голос?':
    'Where does my voice go?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'The browser does the recognition itself. Chrome and browsers based on it send the sound to Google\'s servers; that is how their recognition is built and the platform has no say in it. If that does not suit you, do not switch the microphone on: everything is there as buttons too.',
  'Как поменять тему?':
    'How do I change the theme?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Appearance → Theme: dark, light, or Camera, where the picture from your camera is the background.',
  'Что такое Цвет 1, 2 и 3?':
    'What are Colour 1, 2 and 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Colour 1 is the headers, input bars and tabs. Colour 2 is the window itself: the chat background and the comment list. Colour 3 is the portfolio cover and frame. Each one has its own transparency slider.',
  'Как поставить обои?':
    'How do I set a wallpaper?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Appearance → Wallpaper: a set of ready ones or your own picture in 9:16. Colour 2 lies over the wallpaper as a tint, and the slider decides how strongly.',
  'Правила и безопасность':
    'Rules and safety',
  'Что нельзя выкладывать?':
    'What may not be posted?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Material involving children, threats and calls for violence, stirring up hatred, fraud, forbidden goods, other people\'s work without the right to it, impersonation, spam and faked activity. In full, in the Community rules.',
  'Как работает модерация?':
    'How does moderation work?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Posts, comments, group messages, names and descriptions are checked on the server before publishing. Clearly forbidden things are not published, borderline ones go to a human for review. The marketplace and private chats are not checked.',
  'Виден ли мой IP?':
    'Is my IP visible?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Yes, the server sees it, as does any site on the internet: without an IP it would not know where to send the answer. Hidden mode hides your name and avatar from other people, but not from the server.',
  'Что вы храните обо мне?':
    'What do you store about me?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'The account key, the profile you filled in yourself, your content, the daily counters and technical connection data. No email, no phone number, no passwords and no wallet keys.',
  'Куда жаловаться?':
    'Where do I complain?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'About a piece of content, with the report button under it. About anything else, through support inside the platform.',
  'Где документы?':
    'Where are the documents?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Your account menu → Documents. There are seven: the terms, the privacy policy, the community rules, rewards and limits, swap and payments, subscription and keys, camera and microphone.',
  'Что такое карта?':
    'What is the map?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'The platform\'s map: 177 countries and 1150 cities with real coordinates, the sun\'s position computed for the current time, the night side and the dawn exactly where they are in the sky. Twenty views: from space, Earth at night, day and night, OpenStreetMap streets, weather, earthquakes, time zones, our cubes and streams. It opens from your account menu or by saying “map”.',
  'Как проложить маршрут на карте?':
    'How do I draw a route on the map?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Tap the start on the map, then the end, and pick one of twenty roads. The great circle and the loxodrome, the way people really fly and sail. Land only and water only, a real path search over the continents with not a single step into the other element. Along the shadow and along the light, following the night side. Past cubes, streams and people, through our pins. The street route is computed by the external OSRM engine; if it does not answer, we say so.',
  'Видно ли меня на карте?':
    'Am I visible on the map?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Only if you dropped the “I am here” pin yourself. It lives for half an hour and erases itself, the coordinates are rounded to a kilometre before they are even sent to the server, and “remove myself from the map” deletes the record rather than hiding it. Without that pin you are not on the map at all.',
  'Есть ли на карте спутник и пробки?':
    'Does the map have satellite imagery and traffic?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'No. Satellite imagery and traffic are served by paid providers with a key. The place for those layers is ready: put in a key and they switch on. While there is no key the map says so plainly instead of drawing a pretty lie.',
  'Что такое забег по улице?':
    'What is the street run?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'A jump inside the map: a first-person view, the real buildings and turns of your own street. You run yourself: swipe sideways to change lane, and at a crossing to turn, up to jump, down to slide. You collect cubes and dodge barriers and beams. Along the way you come across other people\'s streams, cubes and shopping displays. There is a calm walk with a joystick too. It opens from your account menu, from the map with the To the street button, or by saying “run”.',
  'Откуда берутся дома в забеге?':
    'Where do the buildings in the run come from?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'From OpenStreetMap: real building outlines and floor counts, real roads with their widths and turns. We count a floor as three metres; if the floor count is missing, the height is taken from the building\'s footprint. There are no street photographs, those are served by paid providers. If the map server is busy, the game says so honestly and builds our own block.',
  'Что такое шопинг в маркетплейсе?':
    'What is shopping in the marketplace?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'The second section of the marketplace, for things rather than files: sixteen categories from clothes to art, a card with the brand, sizes, colours, specifications and up to twenty photos. Every card has a spinning figure with the brand name on it, any of twenty shapes. The section does not touch money: payment and delivery are between people, which is why it says “message the seller” rather than “buy with CUBE”.',
  'Игры, чаты и новое':
    'Games, chats and what is new',
  'Сколько игр в зале?':
    'How many games are in the arcade?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Eight, and all of them are playable: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. They are controlled by finger and by keyboard.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Do the games give CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'No. The games give points and a personal record, kept in your browser. CUBE is credited by the server for views and out of the shared pool; minting coins in a browser would be a lie.',
  'Как играть в DataMine?':
    'How do I play DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'An eight by eight field. You tap a cell and dig the data; the number shows how many viruses are next to it. A long press plants a flag. Three lives, then a new layer.',
  'Как играть в CipherBreak?':
    'How do I play CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Work out a code of four symbols. After an attempt a filled circle means the symbol is in the right place, an empty one means it is in the code but elsewhere. Eight attempts.',
  'Как играть в Phantom Escape?':
    'How do I play Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Collect five keys and leave through the door. The ghosts follow you by the shortest path, and there are more of them on every floor.',
  'Как играть в Block Trade?':
    'How do I play Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'A minute and a half, with 1000 in hand. Buy cheaper, sell dearer. Your score is everything above the thousand.',
  'Как играть в TrustChain?':
    'How do I play TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Tap the blocks in ascending order while the clock runs. One mistake and the chain breaks. Every round the chain gets longer.',
  'Как играть в CubeBuilder?':
    'How do I play CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'The slab moves sideways and a tap drops it. Whatever hangs over falls away, and the slab gets narrower. Miss the tower and it is over.',
  'Что показывает строка курсов?':
    'What does the ticker show?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Thirty coins with their price and the daily change. The data comes through our server, which holds a half-minute cache. The strip does not crawl: a whole number of cells fits the screen and they change every few seconds.',
  'Что значит число кубов в шапке?':
    'What does the cube count in the header mean?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'How many cubes are in your world right now, the ones you see in front of you. Not the total number of cubes on the platform.',
  'Можно ли войти вторым аккаунтом?':
    'Can I sign in with a second account?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Yes. Your account menu → Add an account: the current key stays in the list, and you can switch back to it with one tap from the same menu. Up to eight are remembered.',
  'Зачем «Сохранить» в окне игры?':
    'What is Save for in the game window?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'It remembers the object shape, the character, the gestures and the size. Next time you come in, everything is where you left it.',
  'Чем режим отличается от толчка?':
    'How is a mode different from a push?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'A mode holds until you switch it off with a second tap, and it stays lit. A push fires once and does not light up; it only keeps a thin mark saying it was pressed last.',
  'Почему кубы больше не исчезают?':
    'Why do the cubes no longer disappear?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'The demo cubes in the showcase used to have short lives, five and fifteen minutes. Now they get at least half a day, and they are restarted before they run out. Real cubes live exactly as long as they were given when created.',
  'Как сделать фото прямо в чат?':
    'How do I take a photo straight into a chat?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'The paperclip → Camera opens our own capture. A tap takes a photo, a long press records video of up to a minute. The gallery is the neighbouring item, Photo or video.',
  'Что такое галерея переписки?':
    'What is the chat gallery?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'The magnifier in a chat header opens the search and a shelf above it: photos, videos, audio and links from that chat. It is gathered from the messages themselves and nothing goes anywhere.',
  'Как удалить сразу несколько сообщений?':
    'How do I delete several messages at once?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'A long press on a message turns on selection, then you tick the ones you want and press Delete in the bottom bar. Up to a hundred at a time.',
  'Можно ли изменить своё сообщение?':
    'Can I edit my own message?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Yes, your own and only text ones: the message menu → Edit. An “edited” mark appears next to it. The chat does not close while you do it.',
  'Что такое сторис?':
    'What are stories?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Short posts that last a day, above the list of chats: a photo or a video of up to a minute. They are watched one after another and disappear by themselves after a day.',
  'Сколько фото можно в группу?':
    'How many photos can go in a group?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Up to seven photos, or one video of up to a minute. Plus an icon from the set and tags under the description.',
  'Что такое теги группы?':
    'What are group tags?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'A few words separated by commas, by which the group is found in search.',
  'Видно ли участников группы?':
    'Are group members visible?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'The owner decides when creating it: the member list can be shown to everyone or kept visible to the owner alone.',
  'Почему поле ссылки на видео убрали?':
    'Why was the video link field removed?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Someone else\'s link broke when it was deleted at the other end, and the platform could not answer for that. A video is uploaded as a file into our own storage.',
  'Сколько длится видео в посте?':
    'How long can a video in a post be?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'For now a file of up to 50 MB. On a bigger server there will be steps: 15 seconds, a minute, three minutes and fifteen.',
  'Что делает кнопка «Чаевые автору»?':
    'What does the Tip the author button do?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'It transfers CUBE from your balance to the author of the post in full, with no share for the platform. The amount is 1, 5, 10, 25 or your own.',
  'Как пожаловаться на видео?':
    'How do I report a video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'The three dots under the video → Report: you pick a reason and can add your own words. It goes to a human reviewer.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'How do I share a post?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'The three dots under the video → Share. You get a link you can send to anyone.',
  'Куда девается «Сохранить»?':
    'Where does Save put things?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Into your profile, onto the saved shelf, under the bookmark icon below the profile tabs.',
  'Что видно в моём профиле?':
    'What is visible in my profile?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Two tabs: Shorts for your short videos, Posts for everything else. Tapping a card opens it just as in the feed. Edit and delete are visible only to the author.',
  'Как изменить профиль?':
    'How do I edit my profile?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'The pencil button in your own profile: name, @username, description, account type, status, links and address.',
  'Чем бизнес-аккаунт отличается?':
    'How is a business account different?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Public means everyone sees you. Hidden means your name and avatar are hidden from other people. Business adds a description of your business, links and an address.',
  'Что показывает «онлайн» в шапке?':
    'What does “online” in the header show?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'How many people are on the platform right now according to the server. It refreshes every half minute.',
  'Закрывается ли игра вместе с эфиром?':
    'Does the game close together with the stream?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Yes. If the stream had cubes in it, the game switches itself off when the stream ends; otherwise the objects kept flying over an empty map.',
  'Есть ли смайлы в эфире?':
    'Are there emoji in a stream?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Yes, the emoji button next to the input bar holds the whole shared collection, the same one as in chats.',
  'Что такое «Все вопросы»?':
    'What is All questions?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'The helper\'s full reference: more than a hundred questions with answers, sorted into sections, with a search by title.',
  'Куда делась кнопка NET?':
    'Where did the NET button go?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'It was removed. The platform does not search the wider internet, and the button promised that it did. The helper answers about the platform and finds cubes, people, groups and streams.',
  'Почему звук повторялся дважды?':
    'Why did the sound repeat twice?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Two different pieces of code were speaking and neither cut the other off. Now every phrase cancels the previous one, and the same text is not repeated twice in a row.',
  'Как выключить голос совсем?':
    'How do I switch voice off completely?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'On the Voice commands page there is a switch between answering aloud and answering silently. It now switches it off for real: before, it only governed one entry point and the voice went around it.',
  'Что хранится только в моём браузере?':
    'What is stored only in my browser?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Game records, the cube game settings, the chosen language, the theme and the wallpaper, and the list of your own accounts. None of that goes to the server.',
  'Почему просят подтвердить удаление?':
    'Why am I asked to confirm a deletion?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Because it cannot be undone. In chats you are also asked whose copy to remove, yours only or everyone\'s.',
  'Что такое «У всех» при удалении?':
    'What does “For everyone” mean when deleting?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '“For me” hides the message from your own screen. “For everyone” asks the server to remove it from the other person as well.',
  'Сколько живёт сообщение с таймером?':
    'How long does a timed message live?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'As long as you chose: five minutes, an hour, a day, a week or forever. The ∞ button next to the input bar.',
  'Как переслать сообщение?':
    'How do I forward a message?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'The message menu → Forward. You choose who to.',
  'Что делает «В избранное»?':
    'What does Save to favourites do?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'It puts the message into Saved, your own notebook with notes and kept things.',
  'Как найти сообщение в переписке?':
    'How do I find a message in a chat?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'The magnifier in the chat header: it searches the text and the arrows jump between matches. The shelf with photos, videos, audio and links is in the same place.',
  'Что такое «Пригласить в группу»?':
    'What is Invite to the group?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'A link from the group information: whoever opens it joins the group.',
  'Можно ли выйти из группы?':
    'Can I leave a group?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Yes, with a button in the group information. If the owner leaves, the group itself is not deleted.',
  'Сколько форм у предметов?':
    'How many shapes do the objects have?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Twenty, plus your own picture or video on top of them, and the mixed-up mode.',
  'Что такое шопинг?':
    'What is shopping?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'The second section of the marketplace, for things: sixteen categories, a card with the brand and up to twenty photos, and a spinning figure with the brand name. Payment and delivery are between people.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Ask in words: for example “how do I earn” or “find the cube Art”.',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'What should I look for? Write something like “find the cube Art” or “@anna”.',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'I have no answer about “{что}”. What I know is the platform: CUBE and rewards, limits, the swap, the wallet, keys, signals, cubes and groups, the cube game, streams, appearance and voice commands.'

});
