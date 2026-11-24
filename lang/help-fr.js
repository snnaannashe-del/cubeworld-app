/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-fr.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('fr', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Publications, vidéos et clips ronds. Les commentaires et les réactions s’ouvrent aussi d’ici.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Discussions privées, messages vocaux et vidéos rondes, enregistrés.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Communautés publiques : une discussion commune, un fil d’événements, les membres.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Signaux de trading : direction, entrée, objectif et stop. Le serveur surveille le prix tout seul.',
  'Объявления и обмен между людьми.':
    'Annonces et échange entre personnes.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Les taux de récompense, le swap et tout ce pour quoi arrivent des CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Ton solde de CUBE, les dépôts, les retraits et l’historique.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Ce qui arrive à tes cubes et à tes publications, en chiffres.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'Le CUBE est la monnaie interne de la plateforme. Le serveur le crédite une fois par jour pour l’activité : une journée active, tes propres publications et commentaires, les gens que tu as invités. Dans le swap le prix du CUBE est fixé : 1 CUBE = 0,50 $.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Le serveur clôt les récompenses une fois par jour. Comptent : une journée active en ligne, tes propres publications et commentaires à partir de 10 mille vues, les invités qui ont payé l’abonnement, et les suppléments pour une semaine, un mois et un an d’affilée. Les taux exacts sont toujours à jour dans Gagner.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Pour que rien ne puisse être gonflé par la triche, le serveur garde des limites quotidiennes : 20 nouvelles discussions, 500 j’aime, 50 commentaires, 500 abonnements. Les vues ne se gonflent pas du tout, elles ne sont comptées que sur de vraies impressions. Ce qu’il reste aujourd’hui se voit dans Gagner.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Le swap échange de la crypto contre des CUBE et inversement : 16 monnaies et leurs réseaux, le cours est pris au moment de la demande, le CUBE est compté à 0,50 $. Les dépôts et les retraits passent par un prestataire de paiement ; nous ne prenons ni ne gardons les clés de bourse ou de portefeuille de personne. On ne peut retirer que ce qui a été gagné, pas ce qui a été crédité en cadeau.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Le portefeuille montre ton solde de CUBE, l’historique et les boutons de dépôt et de retrait. Déposer et retirer passe par le swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Une clé ouvre des possibilités : Free c’est la base, Silver c’est étendu, Gold donne plus de cubes et des statistiques. Les clés s’achètent avec des CUBE. L’abonnement Premium donne une part du fonds de récompenses selon ta contribution du mois.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Un signal, c’est une direction, un point d’entrée, un objectif et un stop. Le serveur surveille le prix tout seul et ferme le signal à l’objectif ou au stop. Nous ne demandons pas de clés de bourse : tu traites toi-même, chez toi.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Une réaction sous une publication rapporte des CUBE à l’auteur. On peut mettre jusqu’à 500 j’aime par jour ; au-delà le serveur cesse simplement de les compter.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Un cube, c’est ton propre espace : une discussion, un fil, des salles privées et un minuteur de vie. On en crée un avec le « + » dans le monde. On invite les gens par un lien ou par la clé du cube.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Un cube est un monde à part à l’intérieur de la plateforme : il a son nom, sa couverture, sa discussion, son fil et sa durée de vie. Les cubes se voient sur la carte, on peut s’y promener et on peut y entrer.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Les groupes sont des communautés publiques : une discussion commune, un fil d’événements et une liste de membres. Tu peux créer le tien dans la section Groupes.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Le jeu avec les cubes s’ouvre par un bouton sur la carte. Les actions se divisent en poussées (explosion, lancers, lancer en l’air, feu d’artifice, chaos) et en modes (faire tomber ou apesanteur, l’un des deux, aimant, tourbillon, gel). Les modes s’additionnent et tiennent jusqu’à ce qu’on les enlève. Tout cela marche au bouton, au geste devant la caméra et à la voix.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'Dans le jeu on peut allumer les gestes : un mouvement sur le côté pour lancer, vers le haut pour lancer en l’air, vers le bas pour faire tomber, la paume en avant pour l’explosion, un cercle pour le tourbillon, les deux mains pour le chaos. L’image de la caméra ne va nulle part, tout est calculé sur ton propre appareil.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Les objets ne sont pas que des cubes : cristal, triangle, octaèdre, sphère, pyramide, prisme, étoile, icosaèdre, anneau, dollar, euro, yuan. Tu peux mettre ta propre image ou ta propre vidéo jusqu’à 15 secondes ; une verticale 9:16 est rognée depuis le centre en carré.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Le jeu a huit personnages : un chat, un voisin, un chien, un robot, un fantôme, un panda, une grenouille et un extraterrestre. On peut les caresser, les chatouiller et les secouer, et ils répondent par la voix et le mouvement. Ta propre action s’ajoute par un bouton : un nom, une commande, une description et avec quoi la faire, la main, le pied, la tête ou tout le corps.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'L’apparence change la couleur et la transparence des fenêtres : la Couleur 1, ce sont les en-têtes et les barres, la Couleur 2, c’est la fenêtre elle-même, la Couleur 3, c’est la couverture et le cadre du portfolio. Les fonds des discussions se choisissent au même endroit, et tu peux mettre le tien en 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Presque tout marche à la voix : les sections, le jeu, les formes, les personnages, plus de quatre-vingt-dix commandes. La liste complète dans les vingt langues est sur la page Commandes vocales : elle s’ouvre depuis l’Apparence ou en disant « commandes vocales ». L’interrupteur pour répondre à voix haute ou en silence y est aussi.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Les documents s’ouvrent depuis le menu du compte → Documents. Il y en a sept : les conditions d’utilisation, la politique de confidentialité, les règles de la communauté, récompenses et limites, swap et paiements, abonnement et clés, caméra et micro. À la voix aussi, il suffit de dire « documents ».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Les invitations donnent des CUBE quand l’invité paie l’abonnement. Ton propre lien est dans la section des invitations.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Le portfolio est la vitrine du profil : une couverture, une description et les travaux. L’allure de la couverture et du cadre se change avec la Couleur 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Les statistiques montrent ce qui arrive à tes cubes et à tes publications : vues, réactions, gens qui arrivent.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'Dans le profil tu peux cacher ton nom et ton avatar ; à leur place il y aura un numéro anonyme. Mais cela te cache des autres gens, pas du serveur : l’adresse IP d’une connexion est vue par n’importe quel site d’internet, le nôtre aussi. Il n’y a rien dans l’application qui cache une IP.',
  'Маркетплейс: объявления и обмен между людьми.':
    'La place de marché, ce sont des annonces et de l’échange entre personnes.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Les publications, les commentaires, la publicité, les noms et les descriptions passent une vérification. Ce qui est clairement interdit n’est pas publié, le douteux part en examen humain. Cette vérification ne touche pas la place de marché.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Bonjour. Je suis l’assistant de la plateforme : je réponds sur les cubes, les récompenses, le portefeuille, le jeu et les réglages, et je trouve aussi des cubes, des gens et des groupes. Demande avec des mots, par exemple « comment gagner », « trouve le cube Art », « qui est @anna ». Pour le reste du monde, il y a l’onglet NET à côté.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE et argent',
  'Что такое CUBE?':
    'Qu’est-ce que le CUBE ?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'Le CUBE, ce sont les points internes de la plateforme. Le serveur les crédite une fois par jour pour l’activité. Dans le swap le prix est fixé : 1 CUBE = 0,50 $. Ce n’est pas un titre financier ni une promesse de revenu.',
  'Как заработать?':
    'Comment gagner ?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'C’est le serveur qui compte et clôt la journée une fois toutes les 24 heures : journée active en ligne, tes propres publications et commentaires à partir de 10 mille vues, réactions sous tes publications, invités qui ont payé l’abonnement, et suppléments pour une semaine, un mois et un an d’affilée. Les taux exacts sont dans Gagner.',
  'Какие лимиты в сутки?':
    'Quelles limites par jour ?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 nouvelles discussions, 500 j’aime, 50 commentaires, 500 abonnements. Les vues ne se gonflent pas du tout. Le compte va par journées UTC ; si tu atteins la limite, l’action n’est simplement pas comptée, et il n’y a pas de punition pour ça.',
  'Что считается накруткой?':
    'Qu’est-ce qui compte comme triche ?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Des lots de comptes, des j’aime et des abonnements automatiques, l’achat de vues, des ententes pour se réagir mutuellement. Les récompenses obtenues ainsi sont reprises.',
  'Как работает свайп?':
    'Comment marche le swap ?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Le swap échange de la crypto contre des CUBE et inversement : 16 monnaies et leurs réseaux. Le cours de la crypto est pris au moment de la demande, le CUBE est compté à 0,50 $. Recevoir et envoyer passe par un prestataire de paiement.',
  'Как пополнить кошелёк?':
    'Comment recharger le portefeuille ?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Par le swap : tu crées une demande, tu reçois une adresse et un montant, et tu envoies le virement depuis ton propre portefeuille. Il importe que la monnaie et le réseau correspondent à la demande, sinon le virement ne se récupère pas.',
  'Как вывести деньги?':
    'Comment retirer de l’argent ?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'La demande de retrait est créée vers ton adresse, et les frais de réseau sont payés par celui qui reçoit. Nous vérifions et envoyons à la main, en général dans la journée ouvrée.',
  'Почему вывести можно не всё?':
    'Pourquoi ne puis-je pas tout retirer ?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'On ne retire que ce qui a été gagné. Les CUBE crédités en cadeau ou en bonus se dépensent à l’intérieur de la plateforme mais ne se retirent pas ; sinon il suffirait de distribuer des cadeaux et de les encaisser.',
  'Какие монеты поддерживаются?':
    'Quelles monnaies sont acceptées ?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 monnaies et leurs réseaux : BTC, ETH, USDT, USDC, BNB et onze autres parmi les premières en volume. La liste complète avec les réseaux est dans la fenêtre du swap.',
  'Что если отправил не в ту сеть?':
    'Et si j’ai envoyé sur le mauvais réseau ?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Un virement sur la chaîne de blocs ne se défait pas. Écris au support tout de suite : parfois on peut aider, mais on ne peut pas le promettre. C’est pour cela que le réseau de la demande et celui de ton portefeuille doivent correspondre.',
  'Берёте ли вы ключи от бирж?':
    'Prenez-vous les clés des bourses ?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Non. Nous ne demandons ni n’acceptons de clés de bourse, de phrases de récupération ou d’accès à ton portefeuille. Si quelqu’un demande cela au nom de la plateforme, c’est un escroc.',
  'Платите ли вы налоги за меня?':
    'Payez-vous mes impôts ?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Non. Ce que tu dois à l’État, tu le décides et tu le paies toi-même. Nous ne sommes pas un agent fiscal.',
  'Ключи и подписка':
    'Clés et abonnement',
  'Какие бывают ключи?':
    'Quelles clés existe-t-il ?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free c’est la base, Silver c’est étendu, Gold donne plus de cubes et des statistiques. La clé se monte avec des CUBE dans la Boutique de clés.',
  'Что даёт Premium?':
    'Qu’apporte Premium ?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'Une part du fonds de récompenses selon ta contribution du mois, des portefeuilles externes rattachés pour l’affichage, des statistiques et un classement, la priorité dans les signaux, un badge dans le profil et les discussions, et des cubes Premium fermés.',
  'Сколько стоит подписка?':
    'Combien coûte l’abonnement ?',
  '$6.99 в месяц или $59.99 в год.':
    '6,99 $ par mois ou 59,99 $ par an.',
  'Как отменить подписку?':
    'Comment annuler l’abonnement ?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'À tout moment : il va au bout de la période payée et ne se renouvelle pas. Ce qui a été payé pour la période en cours n’est pas remboursé, sauf là où la loi l’exige.',
  'Я потерял ключ: что делать?':
    'J’ai perdu ma clé, que faire ?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'On ne peut pas la récupérer. Nous ne demandons ni courriel ni téléphone, donc nous n’avons rien pour vérifier que le compte est le tien. La clé, c’est le compte ; garde-la là où tu ne la perdras pas.',
  'Можно ли передать ключ другому?':
    'Puis-je donner ma clé à quelqu’un ?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Tu peux, mais tout ce qui sera fait avec compte comme fait par toi.',
  'Кубы и группы':
    'Cubes et groupes',
  'Что такое куб?':
    'Qu’est-ce qu’un cube ?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Un cube est un monde à part à l’intérieur de la plateforme : son nom, sa couverture, sa discussion, son fil, des salles privées et une durée de vie. Les cubes se voient sur la carte et on peut y entrer.',
  'Как создать куб?':
    'Comment créer un cube ?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Avec le « + » dans le monde ou dans Mon univers. Tu donnes un nom, une couverture, le type et la durée de vie. On invite les gens par un lien ou par la clé du cube.',
  'Что такое таймер жизни куба?':
    'Qu’est-ce que le minuteur de vie du cube ?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Un cube vit le temps fixé puis se ferme. La durée se choisit à la création, d’une heure à un an.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Qu’est-ce que les groupes ?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Des communautés publiques : une discussion commune, un fil d’événements et une liste de membres.',
  'Как найти куб или человека?':
    'Comment trouver un cube ou une personne ?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Écris-le ici même : « trouve le cube Art », « @anna », « groupe photo ». Je cherche sur la plateforme et je montre des cartes : cubes, gens, groupes et directs en cours en ce moment.',
  'Лента и посты':
    'Fil et publications',
  'Как выложить пост?':
    'Comment publier une publication ?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Avec le bouton de création dans le fil. Une vidéo, une image, un titre et une description sont permis.',
  'Почему пост не опубликовался?':
    'Pourquoi ma publication n’a-t-elle pas été publiée ?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Le texte n’a pas passé la vérification avant publication. Le message indique la raison : produits interdits, fraude, menaces et ainsi de suite. Les règles sont dans Documents, et si c’est une erreur, écris au support.',
  'Что дают реакции?':
    'Qu’apportent les réactions ?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Une réaction sous une publication rapporte des CUBE à l’auteur. On peut mettre jusqu’à 500 j’aime par jour.',
  'Как пожаловаться на пост?':
    'Comment signaler une publication ?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Sous chaque publication et chaque message il y a un bouton de signalement. Un signalement part en examen humain.',
  'Сколько просмотров нужно для начисления?':
    'Combien de vues faut-il pour être payé ?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'À partir de 10 mille impressions réelles : tes propres publications et commentaires commencent à rapporter des CUBE à partir de ce seuil.',
  'Игра с кубами':
    'Le jeu avec les cubes',
  'Как играть кубами?':
    'Comment jouer avec les cubes ?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Le bouton du jeu est sur la carte. Les cubes volent à l’intérieur de murs et ne peuvent pas en sortir. Les actions se pressent au bouton, se montrent avec la main devant la caméra, ou se disent à voix haute.',
  'Что такое режимы и толчки?':
    'Qu’est-ce que les modes et les poussées ?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Les poussées, ce sont l’explosion, les lancers, lancer en l’air, le feu d’artifice et le chaos : elles partent une fois et marchent par-dessus tout. Les modes tiennent jusqu’à ce qu’on les enlève et s’additionnent : gravité (faire tomber OU apesanteur), aimant, tourbillon, gel.',
  'Как работают жесты рукой?':
    'Comment marchent les gestes de la main ?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Un mouvement sur le côté, c’est un lancer, vers le haut, c’est lancer en l’air, vers le bas, c’est faire tomber, la paume en avant, c’est l’explosion, un cercle, c’est le tourbillon, les deux mains, c’est le chaos. Les images sont traitées sur ton propre appareil et ne vont nulle part.',
  'Какие есть формы?':
    'Quelles formes existe-t-il ?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Cube, cristal, triangle, octaèdre, sphère, pyramide, prisme, étoile, icosaèdre, anneau, dollar, euro, yuan, et ta propre image. Plus le « mélangé », où chaque objet a sa forme.',
  'Как поставить свою картинку?':
    'Comment mettre ma propre image ?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'Dans le jeu → Forme de l’objet → la case « La mienne ». Une carrée marche le mieux ; une verticale 9:16 est rognée depuis le centre. Appuie de nouveau sur « La mienne » pour la remplacer.',
  'Можно ли поставить видео?':
    'Peut-on utiliser une vidéo ?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Oui, jusqu’à 15 secondes. Plus long est refusé. La vidéo survit à un rechargement de la page.',
  'Кто такие персонажи?':
    'Qui sont les personnages ?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Huit personnages : un chat, un voisin, un chien, un robot, un fantôme, un panda, une grenouille, un extraterrestre. On peut les caresser, les chatouiller et les secouer, et ils répondent par la voix et le mouvement.',
  'Как добавить своё действие?':
    'Comment ajouter ma propre action ?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Par un bouton dans la section des personnages : un nom, une commande, une description et avec quoi la faire, la main, le pied, la tête ou tout le corps. L’action elle-même se choisit parmi seize effets tout prêts.',
  'Как крутятся предметы?':
    'Comment tournent les objets ?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Cinq modes : dans le sens de l’axe, contre l’axe, par le haut, par le bas, et n’importe comment. La rotation d’un lancer s’ajoute au mode choisi.',
  'Как начать эфир?':
    'Comment lancer un direct ?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Le bouton Direct dans le fil, ou la commande vocale « direct ». Tu choisis un titre et un mode, et te voilà à l’antenne. Les spectateurs reçoivent l’image directement de toi.',
  'Какие режимы эфира?':
    'Quels modes de direct existe-t-il ?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Caméra et cubes : la scène par-dessus l’image de la caméra, avec les gestes qui marchent. Cubes seulement : la scène sans caméra. Direct propre : seulement la caméra, sans commentaires, réactions ni cadeaux.',
  'Сколько зрителей выдержит эфир?':
    'Combien de spectateurs un direct supporte-t-il ?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'L’image va directement de l’auteur à chaque spectateur, donc cela dépend de la connexion de l’auteur : sur une ligne domestique, dix à quinze personnes regardent à l’aise. Une salle plus grande demande un serveur relais.',
  'Что такое подарки?':
    'Qu’est-ce que les cadeaux ?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Trente cadeaux, d’une Rose à 1 CUBE à un Cube Légende à 1000. Un cadeau est un transfert de CUBE à l’auteur en entier ; la plateforme ne prend rien.',
  'Как закончить эфир?':
    'Comment terminer un direct ?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Le bouton Terminer le direct dans l’en-tête de la fenêtre, visible dans tous les modes. Fermer la fenêtre par la croix n’arrête pas le direct : il continue jusqu’à ce que tu appuies sur Terminer.',
  'Голос и языки':
    'Voix et langues',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Quelles commandes vocales existe-t-il ?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Plus de quatre-vingt-dix : sections, fenêtres, création, le fil, le jeu, les formes, les personnages, les commandes. La liste complète avec une recherche est sur la page Commandes vocales : menu du compte → Commandes vocales, ou dans l’Apparence, ou dis simplement « commandes vocales ».',
  'На каких языках работает голос?':
    'Dans quelles langues la voix marche-t-elle ?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'Dans vingt : russe, anglais (celui de l’Inde aussi), ukrainien, allemand, français (et celui du Canada), espagnol (et celui d’Amérique latine), italien, portugais, polonais, turc, arabe (et celui du Golfe), vietnamien, chinois, japonais, coréen, hindi. La langue se choisit sur la page des commandes et dans l’Apparence.',
  'Как включить микрофон?':
    'Comment allumer le micro ?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Le bouton du micro est dans la barre du haut. Tu appuies, il écoute ; tu appuies encore, il s’arrête.',
  'Как выключить озвучку?':
    'Comment couper les réponses à voix haute ?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Sur la page Commandes vocales il y a un interrupteur entre répondre à voix haute et répondre en silence. La voix écoute dans les deux cas ; seule la réponse change.',
  'Куда уходит мой голос?':
    'Où va ma voix ?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'La reconnaissance est faite par le navigateur lui-même. Chrome et les navigateurs qui en dérivent envoient le son aux serveurs de Google ; c’est ainsi que leur reconnaissance est faite et la plateforme n’y décide rien. Si cela ne te va pas, n’allume pas le micro : tout existe aussi en boutons.',
  'Как поменять тему?':
    'Comment changer le thème ?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Apparence → Thème : sombre, clair, ou Caméra, où le fond est l’image de ta caméra.',
  'Что такое Цвет 1, 2 и 3?':
    'Que sont la Couleur 1, 2 et 3 ?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'La Couleur 1, ce sont les en-têtes, les barres de saisie et les onglets. La Couleur 2, c’est la fenêtre elle-même : le fond de la discussion et la liste des commentaires. La Couleur 3, c’est la couverture et le cadre du portfolio. Chacune a son propre curseur de transparence.',
  'Как поставить обои?':
    'Comment mettre un fond d’écran ?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Apparence → Fond : un jeu de fonds tout prêts ou ta propre image en 9:16. La Couleur 2 se pose sur le fond comme une teinte, et le curseur décide de sa force.',
  'Правила и безопасность':
    'Règles et sécurité',
  'Что нельзя выкладывать?':
    'Qu’est-ce qu’on ne peut pas publier ?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Du matériel impliquant des enfants, des menaces et des appels à la violence, l’incitation à la haine, la fraude, les produits interdits, le travail d’autrui sans en avoir le droit, l’usurpation d’identité, le spam et l’activité truquée. En entier, dans les Règles de la communauté.',
  'Как работает модерация?':
    'Comment marche la modération ?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Les publications, les commentaires, les messages de groupe, les noms et les descriptions sont vérifiés sur le serveur avant publication. Ce qui est clairement interdit n’est pas publié, le douteux part en examen humain. La place de marché et les discussions privées ne sont pas vérifiées.',
  'Виден ли мой IP?':
    'Mon IP est-elle visible ?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Oui, le serveur la voit, comme n’importe quel site d’internet : sans IP il ne saurait pas où envoyer la réponse. Le mode caché cache ton nom et ton avatar aux autres gens, mais pas au serveur.',
  'Что вы храните обо мне?':
    'Que gardez-vous sur moi ?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'La clé du compte, le profil que tu as rempli toi-même, ton contenu, les compteurs quotidiens et les données techniques de la connexion. Ni courriel, ni téléphone, ni mots de passe, ni clés de portefeuille.',
  'Куда жаловаться?':
    'Où se plaindre ?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Pour un contenu, par le bouton de signalement en dessous. Pour tout le reste, par le support à l’intérieur de la plateforme.',
  'Где документы?':
    'Où sont les documents ?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Menu du compte → Documents. Il y en a sept : les conditions, la politique de confidentialité, les règles de la communauté, récompenses et limites, swap et paiements, abonnement et clés, caméra et micro.',
  'Что такое карта?':
    'Qu’est-ce que la carte ?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'La carte de la plateforme : 177 pays et 1150 villes avec de vraies coordonnées, la position du soleil calculée pour l’heure actuelle, le côté nuit et l’aube exactement là où ils sont dans le ciel. Vingt vues : depuis l’espace, la Terre la nuit, jour et nuit, les rues d’OpenStreetMap, la météo, les séismes, les fuseaux horaires, nos cubes et nos directs. Elle s’ouvre depuis le menu du compte ou en disant « carte ».',
  'Как проложить маршрут на карте?':
    'Comment tracer un itinéraire sur la carte ?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Touche le départ sur la carte, puis l’arrivée, et choisis l’un des vingt chemins. Le grand cercle et la loxodromie, la façon dont on vole et navigue vraiment. Terre seulement et eau seulement, une vraie recherche de chemin à travers les continents sans un seul pas dans l’autre élément. Par l’ombre et par la lumière, en suivant le côté nuit. Par les cubes, les directs et les gens, par nos épingles. L’itinéraire par les rues est calculé par le moteur externe OSRM ; s’il ne répond pas, nous le disons.',
  'Видно ли меня на карте?':
    'Suis-je visible sur la carte ?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Seulement si tu as posé toi-même l’épingle « je suis ici ». Elle vit une demi-heure et s’efface toute seule, les coordonnées sont arrondies au kilomètre avant même d’être envoyées au serveur, et « me retirer de la carte » supprime l’enregistrement au lieu de le cacher. Sans cette épingle tu n’es pas sur la carte du tout.',
  'Есть ли на карте спутник и пробки?':
    'La carte a-t-elle l’imagerie satellite et le trafic ?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Non. L’imagerie satellite et le trafic sont servis par des prestataires payants avec une clé. La place pour ces couches est prête : on met une clé et elles s’allument. Tant qu’il n’y a pas de clé, la carte le dit franchement au lieu de dessiner un joli mensonge.',
  'Что такое забег по улице?':
    'Qu’est-ce que la course de rue ?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Un saut à l’intérieur de la carte : une vue à la première personne, les vrais bâtiments et les vrais virages de ta propre rue. Tu cours toi-même : glisse sur le côté pour changer de voie, et à un carrefour pour tourner, vers le haut pour sauter, vers le bas pour glisser. Tu ramasses des cubes et tu esquives barrières et rayons. En chemin tu croises des directs, des cubes et des vitrines d’autres gens. Il y a aussi une promenade tranquille au joystick. Elle s’ouvre depuis le menu du compte, depuis la carte par le bouton Vers la rue, ou en disant « course ».',
  'Откуда берутся дома в забеге?':
    'D’où viennent les bâtiments de la course ?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'D’OpenStreetMap : de vrais contours et de vrais nombres d’étages, de vraies routes avec leurs largeurs et leurs virages. Nous comptons un étage pour trois mètres ; si le nombre d’étages manque, la hauteur est tirée de l’emprise du bâtiment. Il n’y a pas de photographies des rues, celles-là sont servies par des prestataires payants. Si le serveur de la carte est occupé, le jeu le dit honnêtement et construit un quartier à nous.',
  'Что такое шопинг в маркетплейсе?':
    'Qu’est-ce que le shopping dans la place de marché ?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'La deuxième section de la place de marché, pour des objets plutôt que des fichiers : seize catégories, du vêtement à l’art, une fiche avec la marque, les tailles, les couleurs, les caractéristiques et jusqu’à vingt photos. Chaque fiche a une figure qui tourne avec le nom de la marque dessus, l’une des vingt formes. La section ne touche pas à l’argent : le paiement et la livraison sont entre les gens, c’est pourquoi il est écrit « écrire au vendeur » et non « acheter avec des CUBE ».',
  'Игры, чаты и новое':
    'Jeux, discussions et nouveautés',
  'Сколько игр в зале?':
    'Combien de jeux y a-t-il dans la salle ?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Huit, et tous se jouent : CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Ils se commandent au doigt et au clavier.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Les jeux donnent-ils des CUBE ?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Non. Les jeux donnent des points et un record personnel, gardés dans ton navigateur. Le CUBE est crédité par le serveur pour les vues et depuis le fonds commun ; frapper de la monnaie dans un navigateur serait un mensonge.',
  'Как играть в DataMine?':
    'Comment jouer à DataMine ?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Un champ de huit sur huit. Tu touches une case et tu creuses les données ; le chiffre indique combien de virus sont à côté. Un appui long pose un drapeau. Trois vies, puis une nouvelle couche.',
  'Как играть в CipherBreak?':
    'Comment jouer à CipherBreak ?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Devine un code de quatre symboles. Après un essai, un cercle plein veut dire que le symbole est à la bonne place, un cercle vide qu’il est dans le code mais ailleurs. Huit essais.',
  'Как играть в Phantom Escape?':
    'Comment jouer à Phantom Escape ?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Rassemble cinq clés et sors par la porte. Les fantômes te suivent par le chemin le plus court, et à chaque étage ils sont plus nombreux.',
  'Как играть в Block Trade?':
    'Comment jouer à Block Trade ?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Une minute et demie, avec 1000 en main. Achète moins cher, vends plus cher. Ton score, c’est tout ce qui dépasse le millier.',
  'Как играть в TrustChain?':
    'Comment jouer à TrustChain ?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Touche les blocs dans l’ordre croissant pendant que l’horloge tourne. Une erreur et la chaîne casse. À chaque tour la chaîne s’allonge.',
  'Как играть в CubeBuilder?':
    'Comment jouer à CubeBuilder ?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'La dalle va de côté et un appui la lâche. Ce qui dépasse tombe, et la dalle rétrécit. Rate la tour et c’est fini.',
  'Что показывает строка курсов?':
    'Que montre le bandeau des cours ?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Trente monnaies avec leur prix et la variation du jour. Les données passent par notre serveur, qui garde une demi-minute en cache. Le bandeau ne rampe pas : un nombre entier de cases tient à l’écran et elles changent toutes les quelques secondes.',
  'Что значит число кубов в шапке?':
    'Que veut dire le nombre de cubes dans l’en-tête ?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Combien de cubes sont dans ton monde en ce moment, ceux que tu vois devant toi. Pas le nombre total de cubes de la plateforme.',
  'Можно ли войти вторым аккаунтом?':
    'Puis-je me connecter avec un deuxième compte ?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Oui. Menu du compte → Ajouter un compte : la clé actuelle reste dans la liste, et tu peux y revenir d’un seul appui depuis le même menu. Huit au maximum sont retenues.',
  'Зачем «Сохранить» в окне игры?':
    'À quoi sert Enregistrer dans la fenêtre du jeu ?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Cela retient la forme de l’objet, le personnage, les gestes et la taille. La prochaine fois que tu entres, tout est là où tu l’avais laissé.',
  'Чем режим отличается от толчка?':
    'En quoi un mode diffère-t-il d’une poussée ?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Un mode tient jusqu’à ce que tu l’éteignes d’un second appui, et il reste allumé. Une poussée part une fois et ne s’allume pas ; elle garde seulement une marque fine disant qu’elle a été la dernière pressée.',
  'Почему кубы больше не исчезают?':
    'Pourquoi les cubes ne disparaissent-ils plus ?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Les cubes de démonstration de la vitrine vivaient peu, cinq et quinze minutes. Maintenant ils ont au moins une demi-journée, et on les relance avant qu’ils ne s’épuisent. Les vrais cubes vivent exactement le temps qu’on leur a donné à la création.',
  'Как сделать фото прямо в чат?':
    'Comment prendre une photo directement dans une discussion ?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Le trombone → Caméra ouvre notre propre prise de vue. Un appui prend une photo, un appui long enregistre une vidéo jusqu’à une minute. La galerie est l’élément d’à côté, Photo ou vidéo.',
  'Что такое галерея переписки?':
    'Qu’est-ce que la galerie d’une discussion ?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'La loupe dans l’en-tête d’une discussion ouvre la recherche et une étagère au-dessus : photos, vidéos, audio et liens de cette discussion. Elle est rassemblée depuis les messages eux-mêmes et rien ne part nulle part.',
  'Как удалить сразу несколько сообщений?':
    'Comment supprimer plusieurs messages d’un coup ?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Un appui long sur un message allume la sélection, puis tu coches ceux que tu veux et tu appuies sur Supprimer dans la barre du bas. Jusqu’à cent à la fois.',
  'Можно ли изменить своё сообщение?':
    'Puis-je modifier mon propre message ?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Oui, les tiens et seulement ceux en texte : menu du message → Modifier. La mention « modifié » apparaît à côté. La discussion ne se ferme pas pendant que tu le fais.',
  'Что такое сторис?':
    'Qu’est-ce que les stories ?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Des publications courtes qui durent un jour, au-dessus de la liste des discussions : une photo ou une vidéo jusqu’à une minute. On les regarde l’une après l’autre et elles disparaissent toutes seules au bout d’un jour.',
  'Сколько фото можно в группу?':
    'Combien de photos peut-on mettre dans un groupe ?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Jusqu’à sept photos, ou une vidéo jusqu’à une minute. Plus une icône du jeu et des étiquettes sous la description.',
  'Что такое теги группы?':
    'Qu’est-ce que les étiquettes de groupe ?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Quelques mots séparés par des virgules, par lesquels le groupe se trouve dans la recherche.',
  'Видно ли участников группы?':
    'Les membres du groupe sont-ils visibles ?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Le propriétaire décide à la création : la liste des membres peut être montrée à tous ou rester visible du seul propriétaire.',
  'Почему поле ссылки на видео убрали?':
    'Pourquoi le champ de lien vidéo a-t-il été retiré ?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Un lien d’ailleurs cassait quand on le supprimait à l’autre bout, et la plateforme ne pouvait pas en répondre. Une vidéo se téléverse comme fichier dans notre propre stockage.',
  'Сколько длится видео в посте?':
    'Quelle durée peut avoir une vidéo dans une publication ?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Pour l’instant un fichier jusqu’à 50 Mo. Sur un serveur plus grand il y aura des paliers : 15 secondes, une minute, trois minutes et quinze.',
  'Что делает кнопка «Чаевые автору»?':
    'Que fait le bouton Pourboire à l’auteur ?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Il transfère des CUBE de ton solde à l’auteur de la publication en entier, sans part pour la plateforme. Le montant est 1, 5, 10, 25 ou le tien.',
  'Как пожаловаться на видео?':
    'Comment signaler une vidéo ?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Les trois points sous la vidéo → Signaler : tu choisis une raison et tu peux ajouter tes propres mots. Cela part en examen humain.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Comment partager une publication ?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Les trois points sous la vidéo → Partager. Tu reçois un lien que tu peux envoyer à qui tu veux.',
  'Куда девается «Сохранить»?':
    'Où Enregistrer met-il les choses ?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Dans ton profil, sur l’étagère des enregistrés, sous l’icône du marque-page en dessous des onglets du profil.',
  'Что видно в моём профиле?':
    'Qu’est-ce qu’on voit dans mon profil ?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Deux onglets : Shorts pour tes vidéos courtes, Publications pour tout le reste. Toucher une carte l’ouvre comme dans le fil. Modifier et supprimer ne sont visibles que par l’auteur.',
  'Как изменить профиль?':
    'Comment modifier mon profil ?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Le bouton crayon dans ton propre profil : nom, @pseudo, description, type de compte, statut, liens et adresse.',
  'Чем бизнес-аккаунт отличается?':
    'En quoi un compte professionnel est-il différent ?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Public veut dire que tout le monde te voit. Caché veut dire que ton nom et ton avatar sont cachés aux autres gens. Professionnel ajoute une description de ton activité, des liens et une adresse.',
  'Что показывает «онлайн» в шапке?':
    'Que montre « en ligne » dans l’en-tête ?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Combien de gens sont sur la plateforme en ce moment d’après le serveur. Cela se rafraîchit toutes les demi-minutes.',
  'Закрывается ли игра вместе с эфиром?':
    'Le jeu se ferme-t-il en même temps que le direct ?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Oui. Si le direct avait des cubes, le jeu s’éteint tout seul à la fin du direct ; sinon les objets continuaient de voler au-dessus d’une carte vide.',
  'Есть ли смайлы в эфире?':
    'Y a-t-il des émojis dans un direct ?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Oui, le bouton émoji à côté de la barre de saisie contient toute la collection commune, la même que dans les discussions.',
  'Что такое «Все вопросы»?':
    'Qu’est-ce que Toutes les questions ?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Le manuel complet de l’assistant : plus de cent questions avec réponses, rangées par sections, avec une recherche par titre.',
  'Куда делась кнопка NET?':
    'Où est passé le bouton NET ?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Il a été retiré. La plateforme ne cherche pas sur le grand internet, et le bouton promettait le contraire. L’assistant répond sur la plateforme et trouve des cubes, des gens, des groupes et des directs.',
  'Почему звук повторялся дважды?':
    'Pourquoi le son se répétait-il deux fois ?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Deux morceaux de code différents parlaient et aucun ne coupait l’autre. Maintenant chaque phrase annule la précédente, et le même texte n’est pas répété deux fois de suite.',
  'Как выключить голос совсем?':
    'Comment couper la voix complètement ?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Sur la page Commandes vocales il y a un interrupteur entre répondre à voix haute et répondre en silence. Maintenant il la coupe pour de bon : avant, il ne gouvernait qu’une entrée et la voix la contournait.',
  'Что хранится только в моём браузере?':
    'Qu’est-ce qui est gardé seulement dans mon navigateur ?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Les records des jeux, les réglages du jeu avec les cubes, la langue choisie, le thème et le fond, et la liste de tes propres comptes. Rien de tout cela ne va au serveur.',
  'Почему просят подтвердить удаление?':
    'Pourquoi me demande-t-on de confirmer une suppression ?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Parce qu’elle ne se défait pas. Dans les discussions on demande en plus quelle copie retirer, la tienne seulement ou celle de tout le monde.',
  'Что такое «У всех» при удалении?':
    'Que veut dire « Pour tout le monde » à la suppression ?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '« Pour moi » cache le message de ton propre écran. « Pour tout le monde » demande au serveur de le retirer aussi chez l’autre personne.',
  'Сколько живёт сообщение с таймером?':
    'Combien de temps vit un message à durée limitée ?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Le temps que tu as choisi : cinq minutes, une heure, un jour, une semaine ou pour toujours. Le bouton ∞ à côté de la barre de saisie.',
  'Как переслать сообщение?':
    'Comment transférer un message ?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Menu du message → Transférer. Tu choisis à qui.',
  'Что делает «В избранное»?':
    'Que fait Enregistrer dans les favoris ?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Cela met le message dans Enregistrés, ton propre carnet avec des notes et des choses gardées.',
  'Как найти сообщение в переписке?':
    'Comment trouver un message dans une discussion ?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'La loupe dans l’en-tête de la discussion : elle cherche dans le texte et les flèches sautent d’une correspondance à l’autre. L’étagère avec photos, vidéos, audio et liens est au même endroit.',
  'Что такое «Пригласить в группу»?':
    'Qu’est-ce qu’Inviter dans le groupe ?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Un lien depuis les informations du groupe : celui qui l’ouvre rejoint le groupe.',
  'Можно ли выйти из группы?':
    'Puis-je quitter un groupe ?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Oui, par un bouton dans les informations du groupe. Si le propriétaire part, le groupe lui-même n’est pas supprimé.',
  'Сколько форм у предметов?':
    'Combien de formes ont les objets ?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Vingt, plus ta propre image ou vidéo par-dessus, et le mode mélangé.',
  'Что такое шопинг?':
    'Qu’est-ce que le shopping ?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'La deuxième section de la place de marché, pour les objets : seize catégories, une fiche avec la marque et jusqu’à vingt photos, et une figure qui tourne avec le nom de la marque. Le paiement et la livraison sont entre les gens.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Demande avec des mots : par exemple « comment gagner » ou « trouve le cube Art ».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Que faut-il chercher ? Écris quelque chose comme « trouve le cube Art » ou « @anna ».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Je n’ai pas de réponse sur « {что} ». Ce que je connais, c’est la plateforme : le CUBE et les récompenses, les limites, le swap, le portefeuille, les clés, les signaux, les cubes et les groupes, le jeu avec les cubes, les directs, l’apparence et les commandes vocales.'

});
