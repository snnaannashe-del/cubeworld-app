/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-de.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('de', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Beiträge, Videos und runde Clips. Von hier aus öffnen sich auch die Kommentare und die Reaktionen.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Private Unterhaltungen, Sprachnachrichten und runde Videos, Gespeichertes.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Öffentliche Gemeinschaften: ein gemeinsamer Chat, ein Ereignis-Feed, die Mitglieder.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Handelssignale: Richtung, Einstieg, Ziel und Stopp. Der Server beobachtet den Preis selbst.',
  'Объявления и обмен между людьми.':
    'Anzeigen und Tausch zwischen Menschen.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Die Sätze der Gutschriften, der Swap und alles, wofür CUBE kommt.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Dein CUBE-Guthaben, Einzahlungen, Auszahlungen und der Verlauf.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Was mit deinen Würfeln und Beiträgen geschieht, in Zahlen.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE ist die interne Währung der Plattform. Der Server schreibt sie einmal am Tag für Aktivität gut: ein aktiver Tag, eigene Beiträge und Kommentare, eingeladene Leute. Im Swap ist der CUBE-Preis festgelegt: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Der Server schließt die Gutschriften einmal am Tag ab. Es zählen: ein aktiver Tag online, eigene Beiträge und Kommentare ab 10 Tausend Aufrufen, eingeladene Leute, die ein Abo bezahlt haben, und Zuschläge für eine Woche, einen Monat und ein Jahr am Stück. Die genauen Sätze stehen immer aktuell unter Verdienen.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Damit sich nichts durch Tricks aufblasen lässt, hält der Server Tagesgrenzen: 20 neue Chats, 500 Likes, 50 Kommentare, 500 Abos. Aufrufe lassen sich überhaupt nicht fälschen, sie zählen nur aus echten Einblendungen. Wie viel heute übrig ist, steht unter Verdienen.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Der Swap tauscht Krypto gegen CUBE und zurück: 16 Münzen und ihre Netze, der Kurs wird im Moment des Auftrags genommen, CUBE zählt zu $0.50. Eingänge und Auszahlungen laufen über einen Zahlungsdienstleister; Börsen- oder Wallet-Schlüssel von irgendwem nehmen und speichern wir nicht. Auszahlen lässt sich nur Verdientes, nicht das, was als Geschenk gutgeschrieben wurde.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Die Wallet zeigt dein CUBE-Guthaben, den Verlauf und die Knöpfe für Einzahlung und Auszahlung. Einzahlen und Auszahlen geht über den Swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Ein Schlüssel öffnet Möglichkeiten: Free ist die Grundlage, Silver ist erweitert, Gold gibt mehr Würfel und Statistik. Schlüssel werden mit CUBE gekauft. Das Premium-Abo gibt einen Anteil am Belohnungstopf nach deinem Beitrag im Monat.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Ein Signal ist eine Richtung, ein Einstiegspunkt, ein Ziel und ein Stopp. Der Server beobachtet den Preis selbst und schließt das Signal am Ziel oder am Stopp. Börsenschlüssel verlangen wir nicht: du handelst selbst, bei dir.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Eine Reaktion unter einem Beitrag bringt dem Autor CUBE. Bis zu 500 Likes am Tag sind möglich, danach zählt der Server sie einfach nicht mehr.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Ein Würfel ist dein eigener Raum: Chat, Feed, private Räume und ein Lebenszeitgeber. Erstellt wird er mit dem „+“ in der Welt. Leute lädt man per Link oder per Würfelschlüssel ein.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Ein Würfel ist eine eigene Welt innerhalb der Plattform: mit eigenem Namen, Titelbild, Chat, Feed und Lebensdauer. Würfel sind auf der Karte zu sehen, man kann um sie herumgehen und ihnen beitreten.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Gruppen sind öffentliche Gemeinschaften: ein gemeinsamer Chat, ein Ereignis-Feed und eine Mitgliederliste. Eine eigene kannst du im Bereich Gruppen erstellen.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Das Würfelspiel öffnet ein Knopf auf der Karte. Die Aktionen teilen sich in Stöße (Explosion, Würfe, Hochwerfen, Feuerwerk, Chaos) und Modi (Fallen lassen oder Schwerelos, eines von beiden, Magnet, Wirbel, Einfrieren). Modi summieren sich und halten, bis man sie abschaltet. Das alles geht per Knopf, per Geste vor der Kamera und per Stimme.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'Im Spiel lassen sich Gesten einschalten: eine Bewegung zur Seite wirft, nach oben wirft hoch, nach unten lässt fallen, Handfläche nach vorn ist die Explosion, ein Kreis ist der Wirbel, beide Hände sind das Chaos. Das Kamerabild geht nirgendwohin, alles wird direkt auf deinem Gerät gerechnet.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Die Gegenstände sind nicht nur Würfel: Kristall, Dreieck, Oktaeder, Kugel, Pyramide, Prisma, Stern, Ikosaeder, Ring, Dollar, Euro, Yuan. Du kannst dein eigenes Bild oder dein eigenes Video bis 15 Sekunden einsetzen; ein hochkantes 9:16 wird aus der Mitte quadratisch zugeschnitten.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Das Spiel hat acht Figuren: Katze, Nachbar, Hund, Roboter, Geist, Panda, Frosch und Alien. Man kann sie streicheln, kitzeln und durchrütteln, und sie antworten mit Stimme und Bewegung. Eine eigene Aktion fügt ein Knopf hinzu: ein Name, ein Befehl, eine Beschreibung und womit, mit Hand, Fuß, Kopf oder dem ganzen Körper.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Die Darstellung ändert Farbe und Durchsichtigkeit der Fenster: Farbe 1 sind die Kopfzeilen und Leisten, Farbe 2 ist das Fenster selbst, Farbe 3 sind Titelbild und Rahmen des Portfolios. Hintergründe für Unterhaltungen wählt man am selben Ort, eigene gehen in 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Fast alles geht per Stimme: die Bereiche, das Spiel, die Formen, die Figuren, mehr als neunzig Befehle. Die vollständige Liste in allen zwanzig Sprachen steht auf der Seite Sprachbefehle: sie öffnet sich aus der Darstellung oder mit dem Satz „Sprachbefehle“. Der Schalter für Antwort laut oder still ist ebenfalls dort.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Die Dokumente öffnen sich aus dem Kontomenü → Dokumente. Es sind sieben: die Nutzungsbedingungen, die Datenschutzerklärung, die Gemeinschaftsregeln, Gutschriften und Grenzen, Swap und Zahlungen, Abo und Schlüssel, Kamera und Mikrofon. Auch per Stimme, sag einfach „Dokumente“.',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Einladungen geben CUBE, wenn der Eingeladene ein Abo bezahlt. Dein eigener Link steht im Bereich der Einladungen.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Das Portfolio ist das Schaufenster des Profils: Titelbild, Beschreibung und Arbeiten. Das Aussehen von Titelbild und Rahmen ändert Farbe 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Die Statistik zeigt, was mit deinen Würfeln und Beiträgen geschieht: Aufrufe, Reaktionen, Zulauf von Leuten.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'Im Profil kannst du Namen und Bild verbergen, statt ihrer steht dann eine anonyme Nummer. Das verbirgt dich aber vor anderen Leuten, nicht vor dem Server: die IP-Adresse einer Verbindung sieht jede Website im Internet, unsere auch. Etwas, das die IP verbirgt, gibt es in der App nicht.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Der Marktplatz sind Anzeigen und Tausch zwischen Menschen.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Beiträge, Kommentare, Werbung, Namen und Beschreibungen durchlaufen eine Prüfung. Offensichtlich Verbotenes wird nicht veröffentlicht, Strittiges geht zur Prüfung an einen Menschen. Den Marktplatz berührt diese Prüfung nicht.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Hallo. Ich bin der Helfer der Plattform: ich antworte zu Würfeln, Gutschriften, Wallet, Spiel und Einstellungen, und ich finde außerdem Würfel, Leute und Gruppen. Frag mit Worten, zum Beispiel „wie verdiene ich“, „finde den Würfel Art“, „wer ist @anna“. Für den Rest der Welt gibt es nebenan den Reiter NET.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE und Geld',
  'Что такое CUBE?':
    'Was ist CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE sind die internen Punkte der Plattform. Der Server schreibt sie einmal am Tag für Aktivität gut. Im Swap ist der Preis festgelegt: 1 CUBE = $0.50. Es ist kein Wertpapier und kein Versprechen auf Einkommen.',
  'Как заработать?':
    'Wie verdiene ich?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Der Server rechnet und schließt den Tag einmal in 24 Stunden ab: aktiver Tag online, eigene Beiträge und Kommentare ab 10 Tausend Aufrufen, Reaktionen unter deinen Beiträgen, eingeladene Leute, die ein Abo bezahlt haben, und Zuschläge für eine Woche, einen Monat und ein Jahr am Stück. Die genauen Sätze stehen unter Verdienen.',
  'Какие лимиты в сутки?':
    'Welche Tagesgrenzen gibt es?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 neue Chats, 500 Likes, 50 Kommentare, 500 Abos. Aufrufe lassen sich überhaupt nicht fälschen. Gezählt wird nach UTC-Tagen; wer die Grenze erreicht, dessen Aktion zählt einfach nicht, eine Strafe gibt es dafür nicht.',
  'Что считается накруткой?':
    'Was gilt als Trickserei?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Stapel von Konten, automatische Likes und Abos, gekaufte Aufrufe, Absprachen für gegenseitige Reaktionen. So erhaltene Gutschriften werden wieder abgezogen.',
  'Как работает свайп?':
    'Wie funktioniert der Swap?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Der Swap tauscht Krypto gegen CUBE und zurück: 16 Münzen und ihre Netze. Der Kryptokurs wird im Moment des Auftrags genommen, CUBE zählt zu $0.50. Empfangen und Senden laufen über einen Zahlungsdienstleister.',
  'Как пополнить кошелёк?':
    'Wie lade ich die Wallet auf?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Über den Swap: du legst einen Auftrag an, bekommst eine Adresse und einen Betrag und schickst die Überweisung aus deiner eigenen Wallet. Wichtig ist, dass Münze und Netz mit dem Auftrag übereinstimmen, sonst lässt sich die Überweisung nicht zurückholen.',
  'Как вывести деньги?':
    'Wie zahle ich Geld aus?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Der Auszahlungsauftrag wird auf deine Adresse angelegt, die Netzgebühr zahlt der Empfänger. Wir prüfen und senden von Hand, meist innerhalb eines Werktages.',
  'Почему вывести можно не всё?':
    'Warum kann ich nicht alles auszahlen?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Ausgezahlt wird nur Verdientes. CUBE, die als Geschenk oder Bonus gutgeschrieben wurden, lassen sich innerhalb der Plattform ausgeben, aber nicht auszahlen; sonst würde es genügen, Geschenke zu verteilen und sie in Geld zu verwandeln.',
  'Какие монеты поддерживаются?':
    'Welche Münzen werden unterstützt?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 Münzen und ihre Netze: BTC, ETH, USDT, USDC, BNB und elf weitere aus den ersten nach Umsatz. Die vollständige Liste mit den Netzen steht im Swap-Fenster.',
  'Что если отправил не в ту сеть?':
    'Und wenn ich ins falsche Netz geschickt habe?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Eine Überweisung in der Blockchain lässt sich nicht rückgängig machen. Schreib sofort an den Support: manchmal lässt sich helfen, versprechen kann man es nicht. Darum müssen Netz im Auftrag und Netz in der Wallet übereinstimmen.',
  'Берёте ли вы ключи от бирж?':
    'Nehmt ihr Börsenschlüssel?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Nein. Weder Börsenschlüssel noch Seed-Phrasen noch Zugang zur Wallet verlangen oder nehmen wir an. Wenn jemand so etwas im Namen der Plattform verlangt, ist das ein Betrüger.',
  'Платите ли вы налоги за меня?':
    'Zahlt ihr meine Steuern?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Nein. Was du dem Staat schuldest, entscheidest und zahlst du selbst. Wir sind kein Steueragent.',
  'Ключи и подписка':
    'Schlüssel und Abo',
  'Какие бывают ключи?':
    'Welche Schlüssel gibt es?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free ist die Grundlage, Silver ist erweitert, Gold gibt mehr Würfel und Statistik. Der Schlüssel wird mit CUBE im Schlüsselshop erhöht.',
  'Что даёт Premium?':
    'Was gibt Premium?',
  'Долю в фонде наград, эфиры, свои сигналы, аналитику куба, создание файлов, продажу на маркетплейсе, чаевые и подарки, больше кубов и больше места под файлы. Полный список — в «Документах».':
    'Einen Anteil am Belohnungsfonds, Live-Sendungen, eigene Signale, Würfel-Analyse, Dateien anlegen, Verkauf auf dem Marktplatz, Trinkgeld und Geschenke, mehr Würfel und mehr Platz für Dateien. Die ganze Liste steht in «Dokumente».',
  'Сколько стоит подписка?':
    'Was kostet das Abo?',
  'Сильвер — 14 CUBE в месяц или 120 CUBE за год. Голд — 30 CUBE в месяц или 252 CUBE за год. Точные цифры всегда в окне подписки.':
    'Silber kostet 14 CUBE im Monat oder 120 CUBE im Jahr. Gold 30 CUBE im Monat oder 252 CUBE im Jahr. Die genauen Zahlen stehen immer im Abo-Fenster.',
  'Как отменить подписку?':
    'Wie kündige ich das Abo?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Jederzeit: es läuft die bezahlte Frist zu Ende und verlängert sich nicht. Das für den laufenden Zeitraum Bezahlte wird nicht erstattet, außer wo das Gesetz eine Erstattung verlangt.',
  'Я потерял ключ: что делать?':
    'Ich habe meinen Schlüssel verloren, was nun?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Wiederherstellen geht nicht. Wir fragen weder nach E-Mail noch nach Telefon, also haben wir nichts, womit wir prüfen könnten, dass das Konto deines ist. Der Schlüssel ist das Konto; bewahre ihn dort auf, wo du ihn nicht verlierst.',
  'Можно ли передать ключ другому?':
    'Darf ich meinen Schlüssel weitergeben?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Du darfst, aber alles, was damit getan wird, gilt als von dir getan.',
  'Кубы и группы':
    'Würfel und Gruppen',
  'Что такое куб?':
    'Was ist ein Würfel?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Ein Würfel ist eine eigene Welt innerhalb der Plattform: eigener Name, Titelbild, Chat, Feed, private Räume und Lebensdauer. Würfel sind auf der Karte zu sehen und man kann ihnen beitreten.',
  'Как создать куб?':
    'Wie erstelle ich einen Würfel?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Mit dem „+“ in der Welt oder in Mein Universum. Du legst Namen, Titelbild, Art und Lebensdauer fest. Leute lädt man per Link oder per Würfelschlüssel ein.',
  'Что такое таймер жизни куба?':
    'Was ist der Lebenszeitgeber des Würfels?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Ein Würfel lebt die eingestellte Zeit und schließt danach. Die Frist wird beim Erstellen gewählt, von einer Stunde bis zu einem Jahr.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Was sind Gruppen?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Öffentliche Gemeinschaften: ein gemeinsamer Chat, ein Ereignis-Feed und eine Mitgliederliste.',
  'Как найти куб или человека?':
    'Wie finde ich einen Würfel oder eine Person?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Schreib es gleich hier: „finde den Würfel Art“, „@anna“, „Fotogruppe“. Ich suche auf der Plattform und zeige Karten: Würfel, Leute, Gruppen und Livestreams, die gerade laufen.',
  'Лента и посты':
    'Feed und Beiträge',
  'Как выложить пост?':
    'Wie veröffentliche ich einen Beitrag?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Mit dem Erstellen-Knopf im Feed. Erlaubt sind ein Video, ein Bild, ein Titel und eine Beschreibung.',
  'Почему пост не опубликовался?':
    'Warum wurde mein Beitrag nicht veröffentlicht?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Der Text hat die Prüfung vor der Veröffentlichung nicht bestanden. Die Meldung nennt den Grund: verbotene Waren, Betrug, Drohungen und so weiter. Die Regeln stehen in den Dokumenten, und wenn es ein Irrtum ist, schreib an den Support.',
  'Что дают реакции?':
    'Was bringen Reaktionen?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Eine Reaktion unter einem Beitrag bringt dem Autor CUBE. Bis zu 500 Likes am Tag sind möglich.',
  'Как пожаловаться на пост?':
    'Wie melde ich einen Beitrag?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Unter jedem Beitrag und jeder Nachricht gibt es einen Meldeknopf. Eine Meldung geht zur Prüfung an einen Menschen.',
  'Сколько просмотров нужно для начисления?':
    'Wie viele Aufrufe braucht es für eine Gutschrift?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Ab 10 Tausend echten Einblendungen: eigene Beiträge und Kommentare bringen ab dieser Schwelle CUBE.',
  'Игра с кубами':
    'Das Würfelspiel',
  'Как играть кубами?':
    'Wie spiele ich mit den Würfeln?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Der Spielknopf ist auf der Karte. Die Würfel fliegen innerhalb von Wänden und können sie nicht verlassen. Aktionen drückt man per Knopf, zeigt man mit der Hand vor der Kamera, oder sagt man laut.',
  'Что такое режимы и толчки?':
    'Was sind Modi und Stöße?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Stöße sind Explosion, Würfe, Hochwerfen, Feuerwerk und Chaos: sie gehen einmal und wirken über allem. Modi halten, bis man sie abschaltet, und summieren sich: Schwerkraft (Fallen lassen ODER Schwerelos), Magnet, Wirbel, Einfrieren.',
  'Как работают жесты рукой?':
    'Wie funktionieren Handgesten?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Eine Bewegung zur Seite ist ein Wurf, nach oben ist Hochwerfen, nach unten ist Fallen lassen, Handfläche nach vorn ist die Explosion, ein Kreis ist der Wirbel, beide Hände sind das Chaos. Die Bilder werden direkt auf deinem Gerät verarbeitet und gehen nirgendwohin.',
  'Какие есть формы?':
    'Welche Formen gibt es?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Würfel, Kristall, Dreieck, Oktaeder, Kugel, Pyramide, Prisma, Stern, Ikosaeder, Ring, Dollar, Euro, Yuan, und dein eigenes Bild. Dazu „gemischt“, wo jeder Gegenstand seine eigene Form hat.',
  'Как поставить свою картинку?':
    'Wie setze ich mein eigenes Bild ein?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'Im Spiel → Form des Gegenstands → die Kachel „Meins“. Am besten ein quadratisches; ein hochkantes 9:16 wird aus der Mitte zugeschnitten. Tippe erneut auf „Meins“, um es zu ersetzen.',
  'Можно ли поставить видео?':
    'Kann man ein Video nehmen?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Ja, bis 15 Sekunden. Längeres wird abgelehnt. Das Video übersteht ein Neuladen der Seite.',
  'Кто такие персонажи?':
    'Wer sind die Figuren?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Acht Figuren: Katze, Nachbar, Hund, Roboter, Geist, Panda, Frosch, Alien. Man kann sie streicheln, kitzeln und durchrütteln, und sie antworten mit Stimme und Bewegung.',
  'Как добавить своё действие?':
    'Wie füge ich eine eigene Aktion hinzu?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Mit einem Knopf im Bereich der Figuren: ein Name, ein Befehl, eine Beschreibung und womit, mit Hand, Fuß, Kopf oder dem ganzen Körper. Die Aktion selbst wählt man aus sechzehn fertigen Effekten.',
  'Как крутятся предметы?':
    'Wie drehen sich die Gegenstände?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Fünf Modi: mit der Achse, gegen die Achse, über den Kopf, unter dem Boden durch, und wild durcheinander. Die Drehung aus einem Wurf kommt zum gewählten Modus hinzu.',
  'Как начать эфир?':
    'Wie starte ich einen Livestream?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Der Knopf Livestream im Feed oder der Sprachbefehl „Livestream“. Du wählst Titel und Modus, und bist auf Sendung. Die Zuschauer bekommen das Bild direkt von dir.',
  'Какие режимы эфира?':
    'Welche Livestream-Modi gibt es?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera und Würfel: die Szene über dem Kamerabild, mit funktionierenden Gesten. Nur Würfel: die Szene ohne Kamera. Sauberer Stream: nur die Kamera, ohne Kommentare, Reaktionen und Geschenke.',
  'Сколько зрителей выдержит эфир?':
    'Wie viele Zuschauer hält ein Livestream aus?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Das Bild geht direkt vom Autor zu jedem Zuschauer, es hängt also an der Verbindung des Autors: an einem Hausanschluss schauen zehn bis fünfzehn Leute bequem zu. Ein größerer Raum braucht einen Relay-Server.',
  'Что такое подарки?':
    'Was sind Geschenke?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Dreißig Geschenke, von der Rose für 1 CUBE bis zum Legenden-Würfel für 1000. Ein Geschenk ist eine Überweisung von CUBE an den Autor in voller Höhe; die Plattform nimmt nichts davon.',
  'Как закончить эфир?':
    'Wie beende ich einen Livestream?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Der Knopf Stream beenden in der Kopfzeile des Fensters, in jedem Modus sichtbar. Das Fenster mit dem Kreuz zu schließen beendet den Stream nicht: er läuft weiter, bis du Beenden drückst.',
  'Голос и языки':
    'Stimme und Sprachen',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Welche Sprachbefehle gibt es?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Mehr als neunzig: Bereiche, Fenster, Erstellen, der Feed, das Spiel, Formen, Figuren, Steuerung. Die vollständige Liste mit Suche steht auf der Seite Sprachbefehle: Kontomenü → Sprachbefehle, oder in der Darstellung, oder sag einfach „Sprachbefehle“.',
  'На каких языках работает голос?':
    'In welchen Sprachen funktioniert die Stimme?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'In zwanzig: Russisch, Englisch (auch das indische), Ukrainisch, Deutsch, Französisch (und das kanadische), Spanisch (und das lateinamerikanische), Italienisch, Portugiesisch, Polnisch, Türkisch, Arabisch (und das des Golfs), Vietnamesisch, Chinesisch, Japanisch, Koreanisch, Hindi. Die Sprache wählt man auf der Befehlsseite und in der Darstellung.',
  'Как включить микрофон?':
    'Wie schalte ich das Mikrofon ein?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Der Mikrofonknopf ist in der oberen Leiste. Einmal drücken und es hört zu, noch einmal drücken und es hört auf.',
  'Как выключить озвучку?':
    'Wie schalte ich die gesprochenen Antworten ab?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Auf der Seite Sprachbefehle gibt es einen Schalter zwischen laut antworten und still antworten. Die Stimme hört so oder so zu; nur die Antwort ist anders.',
  'Куда уходит мой голос?':
    'Wohin geht meine Stimme?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Die Erkennung macht der Browser selbst. Chrome und die darauf aufbauenden Browser schicken den Ton an die Server von Google; so ist ihre Erkennung gebaut, und die Plattform entscheidet darüber nichts. Wenn dir das nicht passt, schalte das Mikrofon nicht ein: alles gibt es auch als Knöpfe.',
  'Как поменять тему?':
    'Wie ändere ich das Thema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Darstellung → Thema: dunkel, hell, oder Kamera, wo das Bild deiner Kamera der Hintergrund ist.',
  'Что такое Цвет 1, 2 и 3?':
    'Was sind Farbe 1, 2 und 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Farbe 1 sind die Kopfzeilen, Eingabeleisten und Reiter. Farbe 2 ist das Fenster selbst: der Hintergrund des Chats und die Kommentarliste. Farbe 3 sind Titelbild und Rahmen des Portfolios. Jede hat ihren eigenen Regler für Durchsichtigkeit.',
  'Как поставить обои?':
    'Wie setze ich einen Hintergrund?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Darstellung → Hintergrund: ein Satz fertiger Hintergründe oder dein eigenes Bild in 9:16. Farbe 2 legt sich als Tönung über den Hintergrund, und der Regler bestimmt, wie stark.',
  'Правила и безопасность':
    'Regeln und Sicherheit',
  'Что нельзя выкладывать?':
    'Was darf man nicht veröffentlichen?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Material mit Kindern, Drohungen und Aufrufe zu Gewalt, Hetze, Betrug, verbotene Waren, fremde Arbeit ohne das Recht daran, Ausgeben als jemand anderes, Spam und vorgetäuschte Aktivität. Vollständig in den Gemeinschaftsregeln.',
  'Как работает модерация?':
    'Wie funktioniert die Moderation?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Beiträge, Kommentare, Gruppennachrichten, Namen und Beschreibungen werden vor der Veröffentlichung auf dem Server geprüft. Offensichtlich Verbotenes wird nicht veröffentlicht, Strittiges geht an einen Menschen. Marktplatz und private Unterhaltungen werden nicht geprüft.',
  'Виден ли мой IP?':
    'Ist meine IP sichtbar?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Ja, der Server sieht sie, wie jede Website im Internet: ohne IP wüsste er nicht, wohin er die Antwort schicken soll. Der verborgene Modus verbirgt Namen und Bild vor anderen Leuten, aber nicht vor dem Server.',
  'Что вы храните обо мне?':
    'Was speichert ihr über mich?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Den Kontoschlüssel, das Profil, das du selbst ausgefüllt hast, deine Inhalte, die Tageszähler und technische Verbindungsdaten. Keine E-Mail, keine Telefonnummer, keine Passwörter und keine Wallet-Schlüssel.',
  'Куда жаловаться?':
    'Wo beschwere ich mich?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Über einen Inhalt mit dem Meldeknopf darunter. Über alles andere über den Support innerhalb der Plattform.',
  'Где документы?':
    'Wo sind die Dokumente?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Kontomenü → Dokumente. Es sind sieben: die Bedingungen, die Datenschutzerklärung, die Gemeinschaftsregeln, Gutschriften und Grenzen, Swap und Zahlungen, Abo und Schlüssel, Kamera und Mikrofon.',
  'Что такое карта?':
    'Was ist die Karte?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Die Karte der Plattform: 177 Länder und 1150 Städte mit echten Koordinaten, die Sonnenposition für die aktuelle Zeit berechnet, die Nachtseite und die Dämmerung genau dort, wo sie am Himmel stehen. Zwanzig Ansichten: aus dem Weltraum, die Erde bei Nacht, Tag und Nacht, die Straßen von OpenStreetMap, Wetter, Erdbeben, Zeitzonen, unsere Würfel und Livestreams. Sie öffnet sich aus dem Kontomenü oder mit dem Wort „Karte“.',
  'Как проложить маршрут на карте?':
    'Wie zeichne ich eine Route auf der Karte?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Tippe den Anfang auf der Karte an, dann das Ende, und wähle einen der zwanzig Wege. Der Großkreis und die Loxodrome, so wie wirklich geflogen und gesegelt wird. Nur Land und nur Wasser, eine echte Wegsuche über die Kontinente ohne einen einzigen Schritt ins andere Element. Durch den Schatten und durch das Licht, der Nachtseite folgend. An Würfeln, Livestreams und Leuten vorbei, über unsere Nadeln. Die Straßenroute rechnet die externe Maschine OSRM; antwortet sie nicht, sagen wir es.',
  'Видно ли меня на карте?':
    'Bin ich auf der Karte sichtbar?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Nur wenn du selbst die Nadel „ich bin hier“ gesetzt hast. Sie lebt eine halbe Stunde und löscht sich selbst, die Koordinaten werden schon vor dem Senden auf einen Kilometer gerundet, und „mich von der Karte nehmen“ löscht den Eintrag, statt ihn zu verstecken. Ohne diese Nadel bist du überhaupt nicht auf der Karte.',
  'Есть ли на карте спутник и пробки?':
    'Hat die Karte Satellitenbilder und Verkehr?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nein. Satellitenbilder und Verkehr liefern kostenpflichtige Anbieter mit einem Schlüssel. Der Platz für diese Ebenen ist fertig: Schlüssel eintragen, und sie schalten sich ein. Solange kein Schlüssel da ist, sagt die Karte das offen, statt eine hübsche Lüge zu zeichnen.',
  'Что такое забег по улице?':
    'Was ist der Straßenlauf?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Ein Sprung in die Karte hinein: Ich-Perspektive, die echten Gebäude und Kurven deiner eigenen Straße. Du läufst selbst: zur Seite wischen wechselt die Spur, an einer Kreuzung biegt ab, nach oben springt, nach unten rutscht. Du sammelst Würfel und weichst Schranken und Strahlen aus. Unterwegs begegnest du Livestreams, Würfeln und Schaufenstern anderer Leute. Es gibt auch einen ruhigen Spaziergang mit Joystick. Er öffnet sich aus dem Kontomenü, von der Karte mit dem Knopf Auf die Straße, oder mit dem Wort „Lauf“.',
  'Откуда берутся дома в забеге?':
    'Woher kommen die Gebäude im Lauf?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Von OpenStreetMap: echte Umrisse und Stockwerkszahlen, echte Straßen mit ihren Breiten und Kurven. Wir rechnen ein Stockwerk als drei Meter; fehlt die Stockwerkszahl, wird die Höhe aus der Grundfläche genommen. Straßenfotos gibt es nicht, die liefern kostenpflichtige Anbieter. Ist der Kartenserver beschäftigt, sagt das Spiel es ehrlich und baut ein eigenes Viertel.',
  'Что такое шопинг в маркетплейсе?':
    'Was ist Shopping im Marktplatz?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Der zweite Bereich des Marktplatzes, für Dinge statt Dateien: sechzehn Kategorien von Kleidung bis Kunst, eine Karte mit Marke, Größen, Farben, Merkmalen und bis zu zwanzig Fotos. Jede Karte hat eine sich drehende Figur mit dem Markennamen darauf, eine der zwanzig Formen. Der Bereich rührt kein Geld an: Zahlung und Lieferung sind Sache der Leute, deshalb steht dort „dem Verkäufer schreiben“ und nicht „mit CUBE kaufen“.',
  'Игры, чаты и новое':
    'Spiele, Chats und Neues',
  'Сколько игр в зале?':
    'Wie viele Spiele gibt es in der Halle?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Acht, und alle sind spielbar: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Gesteuert werden sie mit dem Finger und mit der Tastatur.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Geben die Spiele CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nein. Die Spiele geben Punkte und einen persönlichen Rekord, gespeichert in deinem Browser. CUBE schreibt der Server für Aufrufe und aus dem gemeinsamen Topf gut; Münzen im Browser zu prägen wäre gelogen.',
  'Как играть в DataMine?':
    'Wie spielt man DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Ein Feld von acht mal acht. Du tippst eine Zelle an und gräbst die Daten aus; die Zahl zeigt, wie viele Viren daneben liegen. Ein langer Druck setzt eine Flagge. Drei Leben, dann eine neue Schicht.',
  'Как играть в CipherBreak?':
    'Wie spielt man CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Errate einen Code aus vier Zeichen. Nach einem Versuch bedeutet ein gefüllter Kreis, dass das Zeichen am richtigen Platz steht, ein leerer, dass es im Code ist, aber woanders. Acht Versuche.',
  'Как играть в Phantom Escape?':
    'Wie spielt man Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Sammle fünf Schlüssel und geh durch die Tür hinaus. Die Geister folgen dir auf dem kürzesten Weg, und auf jeder Etage sind es mehr.',
  'Как играть в Block Trade?':
    'Wie spielt man Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Anderthalb Minuten, mit 1000 in der Hand. Billiger kaufen, teurer verkaufen. Deine Punktzahl ist alles über dem Tausend.',
  'Как играть в TrustChain?':
    'Wie spielt man TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Tippe die Blöcke in aufsteigender Reihenfolge an, während die Uhr läuft. Ein Fehler, und die Kette reißt. Mit jeder Runde wird die Kette länger.',
  'Как играть в CubeBuilder?':
    'Wie spielt man CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Die Platte fährt seitwärts, ein Tippen lässt sie fallen. Was übersteht, bricht ab, und die Platte wird schmaler. Verfehlst du den Turm, ist es vorbei.',
  'Что показывает строка курсов?':
    'Was zeigt das Kursband?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Dreißig Münzen mit Preis und Tagesänderung. Die Daten kommen über unseren Server, der eine halbe Minute zwischenspeichert. Das Band kriecht nicht: auf den Bildschirm passt eine ganze Zahl von Zellen, und sie wechseln alle paar Sekunden.',
  'Что значит число кубов в шапке?':
    'Was bedeutet die Würfelzahl in der Kopfzeile?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Wie viele Würfel gerade in deiner Welt sind, die, die du vor dir siehst. Nicht die Gesamtzahl der Würfel auf der Plattform.',
  'Можно ли войти вторым аккаунтом?':
    'Kann ich mich mit einem zweiten Konto anmelden?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Ja. Kontomenü → Konto hinzufügen: der aktuelle Schlüssel bleibt in der Liste, und du kommst mit einem Tipp aus demselben Menü zurück. Bis zu acht werden gemerkt.',
  'Зачем «Сохранить» в окне игры?':
    'Wofür ist Speichern im Spielfenster?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Es merkt sich Form des Gegenstands, Figur, Gesten und Größe. Beim nächsten Mal ist alles so, wie du es verlassen hast.',
  'Чем режим отличается от толчка?':
    'Worin unterscheidet sich ein Modus von einem Stoß?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Ein Modus hält, bis du ihn mit einem zweiten Tipp abschaltest, und bleibt leuchtend. Ein Stoß geht einmal und leuchtet nicht; er behält nur eine dünne Marke, dass er zuletzt gedrückt wurde.',
  'Почему кубы больше не исчезают?':
    'Warum verschwinden die Würfel nicht mehr?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Die Beispielwürfel im Schaufenster lebten kurz, fünf und fünfzehn Minuten. Jetzt bekommen sie mindestens einen halben Tag und werden vor dem Ablauf neu gestartet. Echte Würfel leben genau so lange, wie ihnen beim Erstellen gegeben wurde.',
  'Как сделать фото прямо в чат?':
    'Wie fotografiere ich direkt in eine Unterhaltung?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Die Büroklammer → Kamera öffnet unsere eigene Aufnahme. Ein Tipp macht ein Foto, ein langer Druck nimmt Video bis zu einer Minute auf. Die Galerie ist der Punkt daneben, Foto oder Video.',
  'Что такое галерея переписки?':
    'Was ist die Galerie der Unterhaltung?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Die Lupe in der Kopfzeile einer Unterhaltung öffnet die Suche und darüber ein Regal: Fotos, Videos, Audio und Links aus dieser Unterhaltung. Es wird aus den Nachrichten selbst zusammengestellt, und nichts geht irgendwohin.',
  'Как удалить сразу несколько сообщений?':
    'Wie lösche ich mehrere Nachrichten auf einmal?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Ein langer Druck auf eine Nachricht schaltet die Auswahl ein, dann hakst du die gewünschten ab und drückst Löschen in der unteren Leiste. Bis zu hundert auf einmal.',
  'Можно ли изменить своё сообщение?':
    'Kann ich meine eigene Nachricht bearbeiten?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Ja, deine eigenen und nur Textnachrichten: Nachrichtenmenü → Bearbeiten. Daneben erscheint die Marke „bearbeitet“. Die Unterhaltung schließt sich dabei nicht.',
  'Что такое сторис?':
    'Was sind Stories?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Kurze Beiträge, die einen Tag halten, über der Chatliste: ein Foto oder ein Video bis zu einer Minute. Man sieht sie nacheinander an, und nach einem Tag verschwinden sie von selbst.',
  'Сколько фото можно в группу?':
    'Wie viele Fotos passen in eine Gruppe?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Bis zu sieben Fotos oder ein Video bis zu einer Minute. Dazu ein Symbol aus dem Satz und Schlagwörter unter der Beschreibung.',
  'Что такое теги группы?':
    'Was sind Gruppen-Schlagwörter?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Ein paar durch Kommas getrennte Wörter, über die die Gruppe in der Suche gefunden wird.',
  'Видно ли участников группы?':
    'Sind die Gruppenmitglieder sichtbar?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Das entscheidet der Besitzer beim Erstellen: die Mitgliederliste kann allen gezeigt werden oder nur für den Besitzer sichtbar bleiben.',
  'Почему поле ссылки на видео убрали?':
    'Warum wurde das Feld für den Videolink entfernt?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Ein fremder Link ging kaputt, wenn man ihn am anderen Ende löschte, und die Plattform konnte dafür nicht einstehen. Ein Video wird als Datei in unseren eigenen Speicher geladen.',
  'Сколько длится видео в посте?':
    'Wie lang darf ein Video in einem Beitrag sein?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Vorerst eine Datei bis 50 MB. Auf einem größeren Server wird es Stufen geben: 15 Sekunden, eine Minute, drei Minuten und fünfzehn.',
  'Что делает кнопка «Чаевые автору»?':
    'Was macht der Knopf Trinkgeld an den Autor?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Er überweist CUBE von deinem Guthaben in voller Höhe an den Autor des Beitrags, ohne Anteil für die Plattform. Der Betrag ist 1, 5, 10, 25 oder ein eigener.',
  'Как пожаловаться на видео?':
    'Wie melde ich ein Video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Die drei Punkte unter dem Video → Melden: du wählst einen Grund und kannst eigene Worte hinzufügen. Es geht an einen menschlichen Prüfer.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Wie teile ich einen Beitrag?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Die drei Punkte unter dem Video → Teilen. Du bekommst einen Link, den du an jeden schicken kannst.',
  'Куда девается «Сохранить»?':
    'Wohin legt Speichern die Sachen?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'In dein Profil, auf das Regal der Gespeicherten, unter das Lesezeichen-Symbol unterhalb der Profilreiter.',
  'Что видно в моём профиле?':
    'Was ist in meinem Profil zu sehen?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Zwei Reiter: Shorts für deine kurzen Videos, Beiträge für alles andere. Ein Tipp auf eine Karte öffnet sie wie im Feed. Bearbeiten und Löschen sieht nur der Autor.',
  'Как изменить профиль?':
    'Wie bearbeite ich mein Profil?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Der Stiftknopf im eigenen Profil: Name, @Name, Beschreibung, Kontoart, Status, Links und Adresse.',
  'Чем бизнес-аккаунт отличается?':
    'Worin unterscheidet sich ein Geschäftskonto?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Öffentlich heißt, dass dich alle sehen. Verborgen heißt, dass Name und Bild vor anderen Leuten verborgen sind. Geschäft fügt eine Beschreibung deines Geschäfts, Links und eine Adresse hinzu.',
  'Что показывает «онлайн» в шапке?':
    'Was zeigt „online“ in der Kopfzeile?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Wie viele Leute laut Server gerade auf der Plattform sind. Es wird jede halbe Minute aufgefrischt.',
  'Закрывается ли игра вместе с эфиром?':
    'Schließt sich das Spiel zusammen mit dem Livestream?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Ja. Hatte der Stream Würfel, schaltet sich das Spiel am Ende des Streams selbst ab; sonst flogen die Gegenstände über einer leeren Karte weiter.',
  'Есть ли смайлы в эфире?':
    'Gibt es Emojis im Livestream?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Ja, der Emoji-Knopf neben der Eingabeleiste enthält die ganze gemeinsame Sammlung, dieselbe wie in den Unterhaltungen.',
  'Что такое «Все вопросы»?':
    'Was ist Alle Fragen?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Das vollständige Handbuch des Helfers: mehr als hundert Fragen mit Antworten, nach Bereichen geordnet, mit Suche nach Titel.',
  'Куда делась кнопка NET?':
    'Wo ist der NET-Knopf hin?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Er wurde entfernt. Die Plattform sucht nicht im großen Internet, und der Knopf versprach das Gegenteil. Der Helfer antwortet über die Plattform und findet Würfel, Leute, Gruppen und Livestreams.',
  'Почему звук повторялся дважды?':
    'Warum kam der Ton zweimal?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Zwei verschiedene Stücke Code sprachen, und keines schnitt das andere ab. Jetzt bricht jeder Satz den vorherigen ab, und derselbe Text wird nicht zweimal hintereinander wiederholt.',
  'Как выключить голос совсем?':
    'Wie schalte ich die Stimme ganz ab?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Auf der Seite Sprachbefehle gibt es einen Schalter zwischen laut antworten und still antworten. Jetzt schaltet er sie wirklich ab: vorher regierte er nur einen Eingang, und die Stimme ging daran vorbei.',
  'Что хранится только в моём браузере?':
    'Was wird nur in meinem Browser gespeichert?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Die Spielrekorde, die Einstellungen des Würfelspiels, die gewählte Sprache, das Thema und der Hintergrund und die Liste deiner eigenen Konten. Nichts davon geht an den Server.',
  'Почему просят подтвердить удаление?':
    'Warum werde ich gebeten, ein Löschen zu bestätigen?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Weil es sich nicht rückgängig machen lässt. In Unterhaltungen wird zusätzlich gefragt, welche Kopie entfernt werden soll, nur deine oder die von allen.',
  'Что такое «У всех» при удалении?':
    'Was heißt „Für alle“ beim Löschen?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '„Für mich“ verbirgt die Nachricht von deinem eigenen Bildschirm. „Für alle“ bittet den Server, sie auch beim anderen zu entfernen.',
  'Сколько живёт сообщение с таймером?':
    'Wie lange lebt eine Nachricht mit Frist?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'So lange, wie du gewählt hast: fünf Minuten, eine Stunde, ein Tag, eine Woche oder für immer. Der Knopf ∞ neben der Eingabeleiste.',
  'Как переслать сообщение?':
    'Wie leite ich eine Nachricht weiter?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Nachrichtenmenü → Weiterleiten. Du wählst, an wen.',
  'Что делает «В избранное»?':
    'Was macht In Favoriten speichern?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Es legt die Nachricht in Gespeichertes, dein eigenes Heft mit Notizen und aufbewahrten Dingen.',
  'Как найти сообщение в переписке?':
    'Wie finde ich eine Nachricht in einer Unterhaltung?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Die Lupe in der Kopfzeile der Unterhaltung: sie sucht im Text, und die Pfeile springen zwischen den Treffern. Das Regal mit Fotos, Videos, Audio und Links ist am selben Ort.',
  'Что такое «Пригласить в группу»?':
    'Was ist In die Gruppe einladen?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Ein Link aus den Gruppeninformationen: wer ihn öffnet, tritt der Gruppe bei.',
  'Можно ли выйти из группы?':
    'Kann ich eine Gruppe verlassen?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Ja, mit einem Knopf in den Gruppeninformationen. Verlässt der Besitzer sie, wird die Gruppe selbst nicht gelöscht.',
  'Сколько форм у предметов?':
    'Wie viele Formen haben die Gegenstände?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Zwanzig, dazu dein eigenes Bild oder Video darüber, und der gemischte Modus.',
  'Что такое шопинг?':
    'Was ist Shopping?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Der zweite Bereich des Marktplatzes, für Dinge: sechzehn Kategorien, eine Karte mit Marke und bis zu zwanzig Fotos, und eine sich drehende Figur mit dem Markennamen. Zahlung und Lieferung sind Sache der Leute.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Frag mit Worten: zum Beispiel „wie verdiene ich“ oder „finde den Würfel Art“.',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Wonach soll ich suchen? Schreib so etwas wie „finde den Würfel Art“ oder „@anna“.',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Zu «{что}» habe ich keine Antwort. Was ich kenne, ist die Plattform: CUBE und Gutschriften, Grenzen, den Swap, die Wallet, Schlüssel, Signale, Würfel und Gruppen, das Würfelspiel, Livestreams, die Darstellung und die Sprachbefehle.'

});
