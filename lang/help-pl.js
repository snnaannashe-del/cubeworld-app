/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-pl.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('pl', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Posty, filmy i okrągłe klipy. Stąd otwierają się też komentarze i reakcje.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Prywatne rozmowy, wiadomości głosowe i okrągłe filmy, zapisane.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Publiczne społeczności: wspólny czat, strumień wydarzeń, uczestnicy.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Sygnały handlowe: kierunek, wejście, cel i stop. Serwer sam pilnuje ceny.',
  'Объявления и обмен между людьми.':
    'Ogłoszenia i wymiana między ludźmi.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Stawki naliczeń, swap i wszystko, za co przychodzi CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Twoje saldo CUBE, doładowania, wypłaty i historia.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Co dzieje się z twoimi kostkami i postami, w liczbach.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE to wewnętrzna waluta platformy. Serwer nalicza ją raz na dobę za aktywność: aktywny dzień, własne posty i komentarze, zaproszeni ludzie. W swapie cena CUBE jest ustalona: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Serwer zamyka naliczenia raz na dobę. Liczą się: aktywny dzień w sieci, własne posty i komentarze od 10 tysięcy wyświetleń, zaproszeni, którzy opłacili subskrypcję, oraz dodatki za tydzień, miesiąc i rok z rzędu. Dokładne stawki są zawsze aktualne w Zarabiaj.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Żeby niczego nie dało się napompować oszustwem, serwer trzyma limity dobowe: 20 nowych czatów, 500 polubień, 50 komentarzy, 500 obserwacji. Wyświetleń nie da się napompować wcale, liczą się tylko prawdziwe odsłony. Ile zostało dzisiaj, widać w Zarabiaj.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swap zamienia krypto na CUBE i z powrotem: 16 monet i ich sieci, kurs bierze się w chwili zlecenia, CUBE liczy się po $0.50. Wpłaty i wypłaty idą przez dostawcę płatności; cudzych kluczy do giełd i portfeli nie bierzemy i nie przechowujemy. Wypłacić można tylko zarobione, a nie to, co naliczono w prezencie.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Portfel pokazuje saldo CUBE, historię oraz przyciski doładowania i wypłaty. Doładowanie i wypłata idą przez swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Klucz otwiera możliwości: Free to podstawa, Silver to rozszerzenie, Gold daje więcej kostek i statystyki. Klucze kupuje się za CUBE. Subskrypcja Premium daje udział w funduszu nagród według twojego wkładu z miesiąca.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Sygnał to kierunek, punkt wejścia, cel i stop. Serwer sam pilnuje ceny i zamyka sygnał na celu albo na stopie. Kluczy do giełd nie prosimy: handlujesz sam, u siebie.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Reakcja pod postem przynosi autorowi CUBE. Dziennie można dać do 500 polubień, dalej serwer po prostu przestaje je liczyć.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Kostka to twoja własna przestrzeń: czat, strumień, prywatne pokoje i licznik życia. Tworzy się ją przez «+» w świecie. Ludzi zaprasza się linkiem albo kluczem kostki.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Kostka to osobny świat wewnątrz platformy: ma swoją nazwę, okładkę, czat, strumień i czas życia. Kostki widać na mapie, można wokół nich chodzić i można do nich wchodzić.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Grupy to publiczne społeczności: wspólny czat, strumień wydarzeń i lista uczestników. Swoją można założyć w dziale Grupy.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Gra z kostkami otwiera się przyciskiem na mapie. Działania dzielą się na pchnięcia (wybuch, rzuty, podrzut, fajerwerki, chaos) i tryby (upuszczenie albo brak wagi, jedno z dwóch, magnes, wir, zamrożenie). Tryby sumują się i trzymają, dopóki się ich nie zdejmie. Wszystko to działa przyciskiem, gestem przed kamerą i głosem.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'W grze można włączyć gesty: ruch w bok to rzut, w górę to podrzut, w dół to upuszczenie, dłoń do przodu to wybuch, koło to wir, obie ręce to chaos. Obraz z kamery nigdzie nie wychodzi, wszystko liczy się na twoim urządzeniu.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Przedmioty to nie tylko kostki: kryształ, trójkąt, ośmiościan, kula, piramida, pryzmat, gwiazda, dwudziestościan, pierścień, dolar, euro, juan. Można wstawić własny obrazek albo własny film do 15 sekund; pionowy 9:16 zostanie przycięty od środka do kwadratu.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'W grze jest osiem postaci: kot, sąsiad, pies, robot, duch, panda, żaba i obcy. Można je głaskać, łaskotać i potrząsać nimi, a one odpowiadają głosem i ruchem. Własne działanie dodaje się przyciskiem: nazwa, komenda, opis i czym je wykonać, dłonią, stopą, głową albo całym ciałem.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Wygląd zmienia kolor i przezroczystość okien: Kolor 1 to nagłówki i paski, Kolor 2 to samo okno, Kolor 3 to okładka i ramka portfolio. Tła rozmów wybiera się w tym samym miejscu, swoje można wstawić w 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Głosem działa prawie wszystko: działy, gra, kształty, postacie, ponad dziewięćdziesiąt komend. Pełna lista we wszystkich dwudziestu językach jest na stronie Komendy głosowe: otwiera się z Wyglądu albo słowami «komendy głosowe». Przełącznik odpowiadania na głos lub po cichu jest tam samo.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Dokumenty otwierają się z menu konta → Dokumenty. Jest ich siedem: warunki korzystania, polityka prywatności, zasady społeczności, naliczenia i limity, swap i płatności, subskrypcja i klucze, kamera i mikrofon. Można też głosem, powiedz «dokumenty».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Zaproszenia dają CUBE, kiedy zaproszony opłaci subskrypcję. Własny link jest w dziale zaproszeń.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Portfolio to witryna profilu: okładka, opis i prace. Wygląd okładki i ramki zmienia Kolor 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Statystyki pokazują, co dzieje się z twoimi kostkami i postami: wyświetlenia, reakcje, napływ ludzi.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'W profilu można ukryć imię i zdjęcie, zamiast nich będzie anonimowy numer. Ale to chowa cię przed innymi ludźmi, a nie przed serwerem: adres IP połączenia widzi każda strona w internecie, nasza też. Niczego, co ukrywa IP, w aplikacji nie ma.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Marketplace to ogłoszenia i wymiana między ludźmi.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Posty, komentarze, reklamy, nazwy i opisy przechodzą sprawdzenie. Wyraźnie zakazane nie zostaje opublikowane, wątpliwe idzie do ręcznego rozpatrzenia. Marketplace\'u to sprawdzenie nie dotyczy.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Cześć. Jestem pomocnikiem platformy: odpowiadam o kostkach, naliczeniach, portfelu, grze i ustawieniach, a także znajduję kostki, ludzi i grupy. Pytaj słowami, na przykład «jak zarobić», «znajdź kostkę Art», «kto to @anna». O reszcie świata jest zakładka NET obok.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE i pieniądze',
  'Что такое CUBE?':
    'Czym jest CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE to wewnętrzne punkty platformy. Serwer nalicza je raz na dobę za aktywność. W swapie cena jest ustalona: 1 CUBE = $0.50. To nie papier wartościowy ani obietnica dochodu.',
  'Как заработать?':
    'Jak zarobić?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Liczy serwer i zamyka dzień raz na 24 godziny: aktywny dzień w sieci, własne posty i komentarze od 10 tysięcy wyświetleń, reakcje pod twoimi postami, zaproszeni, którzy opłacili subskrypcję, oraz dodatki za tydzień, miesiąc i rok z rzędu. Dokładne stawki są w Zarabiaj.',
  'Какие лимиты в сутки?':
    'Jakie są limity dobowe?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 nowych czatów, 500 polubień, 50 komentarzy, 500 obserwacji. Wyświetleń nie da się napompować wcale. Liczy się po dobach UTC; po osiągnięciu limitu działanie po prostu się nie liczy, i nie ma za to kary.',
  'Что считается накруткой?':
    'Co liczy się jako oszustwo?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Paczki kont, automatyczne polubienia i obserwacje, kupowanie wyświetleń, zmowy dla wzajemnych reakcji. Naliczenia zdobyte w ten sposób są odbierane.',
  'Как работает свайп?':
    'Jak działa swap?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swap zamienia krypto na CUBE i z powrotem: 16 monet i ich sieci. Kurs krypto bierze się w chwili zlecenia, CUBE liczy się po $0.50. Odbiór i wysyłka idą przez dostawcę płatności.',
  'Как пополнить кошелёк?':
    'Jak doładować portfel?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Przez swap: tworzysz zlecenie, dostajesz adres i kwotę, i wysyłasz przelew ze swojego portfela. Ważne, żeby moneta i sieć zgadzały się ze zleceniem, inaczej przelewu nie da się odzyskać.',
  'Как вывести деньги?':
    'Jak wypłacić pieniądze?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Zlecenie wypłaty tworzy się na twój adres, a prowizję sieci płaci odbiorca. Sprawdzamy i wysyłamy ręcznie, zwykle w ciągu dnia roboczego.',
  'Почему вывести можно не всё?':
    'Dlaczego nie da się wypłacić wszystkiego?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Wypłaca się tylko zarobione. CUBE naliczone w prezencie albo jako bonus wydaje się wewnątrz platformy, ale nie wypłaca; inaczej wystarczyłoby rozdać prezenty i zamienić je na pieniądze.',
  'Какие монеты поддерживаются?':
    'Jakie monety są obsługiwane?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 monet i ich sieci: BTC, ETH, USDT, USDC, BNB i jeszcze jedenaście z pierwszych pod względem obrotu. Pełna lista z sieciami jest w oknie swapu.',
  'Что если отправил не в ту сеть?':
    'A jeśli wysłałem do złej sieci?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Przelewu w łańcuchu bloków nie da się cofnąć. Napisz od razu do wsparcia: czasem da się pomóc, ale obiecać tego nie można. Dlatego sieć w zleceniu i w portfelu muszą się zgadzać.',
  'Берёте ли вы ключи от бирж?':
    'Bierzecie klucze do giełd?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Nie. Ani kluczy do giełd, ani fraz seed, ani dostępu do portfela nie prosimy i nie przyjmujemy. Jeśli ktoś prosi o to w imieniu platformy, to oszust.',
  'Платите ли вы налоги за меня?':
    'Płacicie moje podatki?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Nie. Co jesteś winien państwu, ustalasz i płacisz sam. Nie jesteśmy płatnikiem podatku.',
  'Ключи и подписка':
    'Klucze i subskrypcja',
  'Какие бывают ключи?':
    'Jakie są klucze?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free to podstawa, Silver to rozszerzenie, Gold daje więcej kostek i statystyki. Klucz podnosi się za CUBE w Sklepie kluczy.',
  'Что даёт Premium?':
    'Co daje Premium?',
  'Долю в фонде наград, эфиры, свои сигналы, аналитику куба, создание файлов, продажу на маркетплейсе, чаевые и подарки, больше кубов и больше места под файлы. Полный список — в «Документах».':
    'Udział w funduszu nagród, transmisje, własne sygnały, analizę kostki, tworzenie plików, sprzedaż na targowisku, napiwki i prezenty, więcej kostek i więcej miejsca. Pełna lista jest w «Dokumentach».',
  'Сколько стоит подписка?':
    'Ile kosztuje subskrypcja?',
  'Сильвер — 14 CUBE в месяц или 120 CUBE за год. Голд — 30 CUBE в месяц или 252 CUBE за год. Точные цифры всегда в окне подписки.':
    'Srebro to 14 CUBE miesięcznie albo 120 CUBE za rok. Złoto — 30 CUBE miesięcznie albo 252 CUBE za rok. Dokładne liczby zawsze są w oknie subskrypcji.',
  'Как отменить подписку?':
    'Jak anulować subskrypcję?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'W dowolnej chwili: dochodzi do końca opłaconego okresu i się nie przedłuża. Opłaty za bieżący okres nie zwracamy, poza przypadkami, gdy zwrotu wymaga prawo.',
  'Я потерял ключ: что делать?':
    'Zgubiłem klucz, co robić?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Nie da się go odzyskać. Nie pytamy ani o pocztę, ani o telefon, więc nie mamy czym sprawdzić, że konto jest twoje. Klucz to konto; trzymaj go tam, gdzie go nie zgubisz.',
  'Можно ли передать ключ другому?':
    'Czy mogę oddać klucz komuś innemu?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Możesz, ale wszystko, co ktoś pod nim zrobi, liczy się jako zrobione przez ciebie.',
  'Кубы и группы':
    'Kostki i grupy',
  'Что такое куб?':
    'Czym jest kostka?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Kostka to osobny świat wewnątrz platformy: własna nazwa, okładka, czat, strumień, prywatne pokoje i czas życia. Kostki widać na mapie i można do nich wchodzić.',
  'Как создать куб?':
    'Jak stworzyć kostkę?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Przez «+» w świecie albo w Moim wszechświecie. Ustawiasz nazwę, okładkę, typ i czas życia. Ludzi zaprasza się linkiem albo kluczem kostki.',
  'Что такое таймер жизни куба?':
    'Czym jest licznik życia kostki?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Kostka żyje zadany czas, a potem się zamyka. Okres wybiera się przy tworzeniu, od godziny do roku.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Czym są grupy?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Publiczne społeczności: wspólny czat, strumień wydarzeń i lista uczestników.',
  'Как найти куб или человека?':
    'Jak znaleźć kostkę albo osobę?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Napisz to tutaj: «znajdź kostkę Art», «@anna», «grupa fotograficzna». Poszukam na platformie i pokażę karty: kostki, ludzi, grupy i transmisje, które trwają teraz.',
  'Лента и посты':
    'Strumień i posty',
  'Как выложить пост?':
    'Jak opublikować post?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Przyciskiem tworzenia w strumieniu. Wolno dodać film, obrazek, tytuł i opis.',
  'Почему пост не опубликовался?':
    'Dlaczego mój post nie został opublikowany?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Tekst nie przeszedł sprawdzenia przed publikacją. Komunikat podaje powód: zakazane towary, oszustwo, groźby i tak dalej. Zasady są w Dokumentach, a jeśli to pomyłka, napisz do wsparcia.',
  'Что дают реакции?':
    'Co dają reakcje?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Reakcja pod postem przynosi autorowi CUBE. Dziennie można dać do 500 polubień.',
  'Как пожаловаться на пост?':
    'Jak zgłosić post?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Pod każdym postem i każdą wiadomością jest przycisk zgłoszenia. Zgłoszenie idzie do ręcznego rozpatrzenia.',
  'Сколько просмотров нужно для начисления?':
    'Ile wyświetleń trzeba, żeby dostać naliczenie?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Od 10 tysięcy prawdziwych odsłon: własne posty i komentarze zaczynają przynosić CUBE od tego progu.',
  'Игра с кубами':
    'Gra z kostkami',
  'Как играть кубами?':
    'Jak grać z kostkami?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Przycisk gry jest na mapie. Kostki latają wewnątrz ścian i nie mogą z nich wylecieć. Działania naciska się przyciskiem, pokazuje dłonią przed kamerą albo mówi na głos.',
  'Что такое режимы и толчки?':
    'Czym są tryby i pchnięcia?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Pchnięcia to wybuch, rzuty, podrzut, fajerwerki i chaos: idą raz i działają ponad wszystkim. Tryby trzymają się, dopóki się ich nie zdejmie, i sumują się: grawitacja (upuszczenie ALBO brak wagi), magnes, wir, zamrożenie.',
  'Как работают жесты рукой?':
    'Jak działają gesty dłonią?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Ruch w bok to rzut, w górę to podrzut, w dół to upuszczenie, dłoń do przodu to wybuch, koło to wir, obie ręce to chaos. Klatki przetwarzane są na twoim urządzeniu i nigdzie nie wychodzą.',
  'Какие есть формы?':
    'Jakie są kształty?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kostka, kryształ, trójkąt, ośmiościan, kula, piramida, pryzmat, gwiazda, dwudziestościan, pierścień, dolar, euro, juan, i twój własny obrazek. Plus «na wyrywki», gdzie każdy przedmiot ma swój kształt.',
  'Как поставить свою картинку?':
    'Jak wstawić własny obrazek?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'W grze → Kształt przedmiotu → kafelek «Mój». Najlepiej kwadratowy; pionowy 9:16 zostanie przycięty od środka. Naciśnij «Mój» jeszcze raz, żeby go wymienić.',
  'Можно ли поставить видео?':
    'Czy można użyć filmu?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Można, do 15 sekund. Dłuższy nie zostanie przyjęty. Film przeżywa przeładowanie strony.',
  'Кто такие персонажи?':
    'Kim są postacie?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Osiem postaci: kot, sąsiad, pies, robot, duch, panda, żaba, obcy. Można je głaskać, łaskotać i potrząsać nimi, a one odpowiadają głosem i ruchem.',
  'Как добавить своё действие?':
    'Jak dodać własne działanie?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Przyciskiem w dziale postaci: nazwa, komenda, opis i czym je wykonać, dłonią, stopą, głową albo całym ciałem. Samo działanie wybiera się z szesnastu gotowych efektów.',
  'Как крутятся предметы?':
    'Jak obracają się przedmioty?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Pięć trybów: zgodnie z osią, przeciw osi, przez górę, przez dół, i na wyrywki. Obrót z rzutu dodaje się do wybranego trybu.',
  'Как начать эфир?':
    'Jak zacząć transmisję?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Przycisk Transmisja w strumieniu albo komenda głosowa «transmisja». Wybierasz tytuł i tryb, i jesteś na antenie. Widzowie dostają obraz prosto od ciebie.',
  'Какие режимы эфира?':
    'Jakie są tryby transmisji?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera i kostki: scena na obrazie z kamery, z działającymi gestami. Tylko kostki: scena bez kamery. Czysta transmisja: sama kamera, bez komentarzy, reakcji i prezentów.',
  'Сколько зрителей выдержит эфир?':
    'Ilu widzów wytrzyma transmisja?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Obraz idzie prosto od autora do każdego widza, więc zależy od łącza autora: na domowym łączu dziesięć do piętnastu osób ogląda wygodnie. Większa sala potrzebuje serwera przekaźnikowego.',
  'Что такое подарки?':
    'Czym są prezenty?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Trzydzieści prezentów, od Róży za 1 CUBE do Kostki Legendy za 1000. Prezent to przelew CUBE do autora w całości; platforma nie bierze nic.',
  'Как закончить эфир?':
    'Jak zakończyć transmisję?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Przycisk Zakończ transmisję w nagłówku okna, widoczny w każdym trybie. Zamknięcie okna krzyżykiem nie kończy transmisji: trwa, dopóki nie naciśniesz Zakończ.',
  'Голос и языки':
    'Głos i języki',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Jakie są komendy głosowe?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Ponad dziewięćdziesiąt: działy, okna, tworzenie, strumień, gra, kształty, postacie, sterowanie. Pełna lista z wyszukiwaniem jest na stronie Komendy głosowe: menu konta → Komendy głosowe, albo w Wyglądzie, albo powiedz po prostu «komendy głosowe».',
  'На каких языках работает голос?':
    'W jakich językach działa głos?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'W dwudziestu: rosyjski, angielski (także indyjski), ukraiński, niemiecki, francuski (i kanadyjski), hiszpański (i latynoamerykański), włoski, portugalski, polski, turecki, arabski (i zatokowy), wietnamski, chiński, japoński, koreański, hindi. Język wybiera się na stronie komend i w Wyglądzie.',
  'Как включить микрофон?':
    'Jak włączyć mikrofon?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Przycisk mikrofonu jest w górnym pasku. Naciskasz i słucha, naciskasz znowu i przestaje.',
  'Как выключить озвучку?':
    'Jak wyłączyć odpowiedzi na głos?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Na stronie Komendy głosowe jest przełącznik między odpowiadaniem na głos a odpowiadaniem po cichu. Głos słucha tak czy inaczej; zmienia się tylko odpowiedź.',
  'Куда уходит мой голос?':
    'Dokąd idzie mój głos?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Rozpoznawanie robi sama przeglądarka. Chrome i przeglądarki na nim oparte wysyłają dźwięk na serwery Google; tak jest zbudowane ich rozpoznawanie i platforma nic o tym nie decyduje. Jeśli ci to nie pasuje, nie włączaj mikrofonu: wszystko jest też na przyciskach.',
  'Как поменять тему?':
    'Jak zmienić motyw?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Wygląd → Motyw: ciemny, jasny albo Kamera, gdzie tłem jest obraz z twojej kamery.',
  'Что такое Цвет 1, 2 и 3?':
    'Czym są Kolor 1, 2 i 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Kolor 1 to nagłówki, paski pisania i zakładki. Kolor 2 to samo okno: tło czatu i lista komentarzy. Kolor 3 to okładka i ramka portfolio. Każdy ma własny suwak przezroczystości.',
  'Как поставить обои?':
    'Jak ustawić tło?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Wygląd → Tło: zestaw gotowych teł albo twój obrazek w 9:16. Kolor 2 kładzie się na tle jako odcień, a suwak decyduje, jak mocno.',
  'Правила и безопасность':
    'Zasady i bezpieczeństwo',
  'Что нельзя выкладывать?':
    'Czego nie wolno publikować?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Materiałów z dziećmi, gróźb i wezwań do przemocy, podżegania do nienawiści, oszustw, zakazanych towarów, cudzej pracy bez prawa do niej, podszywania się, spamu i udawanej aktywności. W całości w Zasadach społeczności.',
  'Как работает модерация?':
    'Jak działa moderacja?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Posty, komentarze, wiadomości w grupach, nazwy i opisy są sprawdzane na serwerze przed publikacją. Wyraźnie zakazane nie zostaje opublikowane, wątpliwe idzie do człowieka. Marketplace i prywatne rozmowy nie są sprawdzane.',
  'Виден ли мой IP?':
    'Czy moje IP jest widoczne?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Tak, serwer je widzi, jak każda strona w internecie: bez IP nie wiedziałby, dokąd wysłać odpowiedź. Tryb ukryty chowa imię i zdjęcie przed innymi ludźmi, ale nie przed serwerem.',
  'Что вы храните обо мне?':
    'Co o mnie przechowujecie?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Klucz konta, profil, który sam wypełniłeś, twoje treści, liczniki dobowe i techniczne dane połączenia. Ani poczty, ani telefonu, ani haseł, ani kluczy do portfeli.',
  'Куда жаловаться?':
    'Gdzie się poskarżyć?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Na treść — przyciskiem zgłoszenia pod nią. Na wszystko inne — przez wsparcie wewnątrz platformy.',
  'Где документы?':
    'Gdzie są dokumenty?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Menu konta → Dokumenty. Jest ich siedem: warunki, polityka prywatności, zasady społeczności, naliczenia i limity, swap i płatności, subskrypcja i klucze, kamera i mikrofon.',
  'Что такое карта?':
    'Czym jest mapa?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Mapa platformy: 177 krajów i 1150 miast z prawdziwymi współrzędnymi, położenie słońca policzone na bieżącą godzinę, nocna strona i świt dokładnie tam, gdzie są na niebie. Dwadzieścia widoków: z kosmosu, Ziemia nocą, dzień i noc, ulice z OpenStreetMap, pogoda, trzęsienia ziemi, strefy czasowe, nasze kostki i transmisje. Otwiera się z menu konta albo słowem «mapa».',
  'Как проложить маршрут на карте?':
    'Jak wytyczyć trasę na mapie?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Dotknij początku na mapie, potem końca, i wybierz jedną z dwudziestu dróg. Koło wielkie i loksodroma, tak jak naprawdę się lata i pływa. Tylko po lądzie i tylko po wodzie, prawdziwe szukanie drogi przez kontynenty bez jednego kroku w drugi żywioł. Przez cień i przez światło, śladem nocnej strony. Obok kostek, transmisji i ludzi, przez nasze pinezki. Trasę ulicami liczy zewnętrzny silnik OSRM; jeśli nie odpowie, mówimy o tym.',
  'Видно ли меня на карте?':
    'Czy widać mnie na mapie?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Tylko jeśli sam postawiłeś pinezkę «jestem tutaj». Żyje pół godziny i kasuje się sama, współrzędne zaokrąglane są do kilometra jeszcze przed wysłaniem na serwer, a «zdejmij mnie z mapy» usuwa wpis, zamiast go chować. Bez tej pinezki nie ma cię na mapie wcale.',
  'Есть ли на карте спутник и пробки?':
    'Czy mapa ma zdjęcia satelitarne i ruch drogowy?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Nie. Zdjęcia satelitarne i ruch dostarczają płatni dostawcy z kluczem. Miejsce na te warstwy jest gotowe: wpisuje się klucz i włączają się. Dopóki klucza nie ma, mapa mówi o tym wprost, zamiast rysować ładne kłamstwo.',
  'Что такое забег по улице?':
    'Czym jest bieg po ulicy?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Skok do wnętrza mapy: widok z pierwszej osoby, prawdziwe budynki i zakręty twojej ulicy. Biegniesz sam: przesuwasz w bok, żeby zmienić pas, a na skrzyżowaniu, żeby skręcić, w górę, żeby skoczyć, w dół, żeby się ześlizgnąć. Zbierasz kostki i omijasz barierki i promienie. Po drodze trafiasz na cudze transmisje, kostki i witryny. Jest też spokojny spacer z joystickiem. Otwiera się z menu konta, z mapy przyciskiem Na ulicę, albo słowem «bieg».',
  'Откуда берутся дома в забеге?':
    'Skąd biorą się budynki w biegu?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Z OpenStreetMap: prawdziwe obrysy i liczby pięter, prawdziwe drogi z ich szerokościami i zakrętami. Liczymy piętro jako trzy metry; jeśli brakuje liczby pięter, wysokość bierzemy z obrysu budynku. Zdjęć ulic nie ma, te dostarczają płatni dostawcy. Jeśli serwer mapy jest zajęty, gra mówi o tym uczciwie i buduje naszą własną dzielnicę.',
  'Что такое шопинг в маркетплейсе?':
    'Czym są zakupy w marketplace?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Drugi dział marketplace\'u, na rzeczy zamiast plików: szesnaście kategorii od ubrań po sztukę, karta z marką, rozmiarami, kolorami, parametrami i do dwudziestu zdjęć. Na każdej karcie kręci się figura z nazwą marki, dowolny z dwudziestu kształtów. Dział nie dotyka pieniędzy: zapłata i dostawa są między ludźmi, dlatego jest napisane «napisz do sprzedającego», a nie «kup za CUBE».',
  'Игры, чаты и новое':
    'Gry, czaty i nowości',
  'Сколько игр в зале?':
    'Ile gier jest w salonie?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Osiem i we wszystkie da się grać: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Steruje się nimi palcem i klawiaturą.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Czy gry dają CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Nie. Gry dają punkty i rekord osobisty, trzymane w twojej przeglądarce. CUBE nalicza serwer za wyświetlenia i z wspólnego funduszu; bicie monet w przeglądarce byłoby kłamstwem.',
  'Как играть в DataMine?':
    'Jak grać w DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Pole osiem na osiem. Dotykasz komórki i wykopujesz dane; liczba pokazuje, ile wirusów jest obok. Długie przytrzymanie stawia flagę. Trzy życia, potem nowa warstwa.',
  'Как играть в CipherBreak?':
    'Jak grać w CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Odgadnij kod z czterech symboli. Po próbie pełne kółko znaczy, że symbol jest na swoim miejscu, puste, że jest w kodzie, ale gdzie indziej. Osiem prób.',
  'Как играть в Phantom Escape?':
    'Jak grać w Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Zbierz pięć kluczy i wyjdź drzwiami. Duchy idą za tobą najkrótszą drogą, a na każdym piętrze jest ich więcej.',
  'Как играть в Block Trade?':
    'Jak grać w Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Półtorej minuty, z 1000 w ręku. Kupuj taniej, sprzedawaj drożej. Twój wynik to wszystko ponad tysiąc.',
  'Как играть в TrustChain?':
    'Jak grać w TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Dotykaj bloków rosnąco, dopóki idzie zegar. Jeden błąd i łańcuch pęka. Z każdą rundą łańcuch się wydłuża.',
  'Как играть в CubeBuilder?':
    'Jak grać w CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Płyta jedzie w bok, a dotknięcie ją upuszcza. To, co wystaje, odpada, a płyta się zwęża. Chybisz wieżę i koniec.',
  'Что показывает строка курсов?':
    'Co pokazuje pasek kursów?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Trzydzieści monet z ceną i zmianą dnia. Dane idą przez nasz serwer, który trzyma pół minuty w pamięci. Pasek nie pełznie: na ekran wchodzi całkowita liczba komórek i zmieniają się co kilka sekund.',
  'Что значит число кубов в шапке?':
    'Co znaczy liczba kostek w nagłówku?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Ile kostek jest teraz w twoim świecie, tych, które widzisz przed sobą. Nie całkowita liczba kostek na platformie.',
  'Можно ли войти вторым аккаунтом?':
    'Czy mogę wejść na drugie konto?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Tak. Menu konta → Dodaj konto: obecny klucz zostaje na liście i wracasz do niego jednym dotknięciem z tego samego menu. Pamiętanych jest do ośmiu.',
  'Зачем «Сохранить» в окне игры?':
    'Po co jest Zapisz w oknie gry?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Zapamiętuje kształt przedmiotu, postać, gesty i rozmiar. Następnym razem wszystko jest tam, gdzie zostawiłeś.',
  'Чем режим отличается от толчка?':
    'Czym tryb różni się od pchnięcia?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Tryb trzyma się, dopóki nie zdejmiesz go drugim dotknięciem, i zostaje zapalony. Pchnięcie idzie raz i się nie zapala; zostawia tylko cienki ślad, że było naciśnięte ostatnie.',
  'Почему кубы больше не исчезают?':
    'Dlaczego kostki już nie znikają?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Pokazowe kostki w witrynie żyły krótko, pięć i piętnaście minut. Teraz dostają co najmniej pół doby i są uruchamiane od nowa, zanim się skończą. Prawdziwe kostki żyją dokładnie tyle, ile im dano przy tworzeniu.',
  'Как сделать фото прямо в чат?':
    'Jak zrobić zdjęcie prosto do rozmowy?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Spinacz → Kamera otwiera nasze własne ujęcie. Dotknięcie robi zdjęcie, długie przytrzymanie nagrywa film do minuty. Galeria to sąsiednia pozycja, Zdjęcie albo film.',
  'Что такое галерея переписки?':
    'Czym jest galeria rozmowy?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Lupka w nagłówku rozmowy otwiera wyszukiwanie, a nad nim półkę: zdjęcia, filmy, audio i linki z tej rozmowy. Zbiera się z samych wiadomości i nic nigdzie nie wychodzi.',
  'Как удалить сразу несколько сообщений?':
    'Jak usunąć kilka wiadomości naraz?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Długie przytrzymanie wiadomości włącza zaznaczanie, potem zaznaczasz te, które chcesz, i naciskasz Usuń na dolnym pasku. Do stu naraz.',
  'Можно ли изменить своё сообщение?':
    'Czy mogę poprawić własną wiadomość?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Tak, własne i tylko tekstowe: menu wiadomości → Edytuj. Obok pojawia się znak «edytowane». Rozmowa się przy tym nie zamyka.',
  'Что такое сторис?':
    'Czym są relacje?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Krótkie posty, które żyją dobę, nad listą rozmów: zdjęcie albo film do minuty. Ogląda się je jedna po drugiej i po dobie znikają same.',
  'Сколько фото можно в группу?':
    'Ile zdjęć mieści się w grupie?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Do siedmiu zdjęć albo jeden film do minuty. Plus ikona z zestawu i tagi pod opisem.',
  'Что такое теги группы?':
    'Czym są tagi grupy?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Kilka słów oddzielonych przecinkami, po których grupę znajduje wyszukiwarka.',
  'Видно ли участников группы?':
    'Czy widać uczestników grupy?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Decyduje właściciel przy tworzeniu: listę uczestników można pokazać wszystkim albo zostawić widoczną tylko dla właściciela.',
  'Почему поле ссылки на видео убрали?':
    'Dlaczego usunięto pole z linkiem do filmu?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Cudzy link psuł się, gdy go kasowano po drugiej stronie, a platforma nie mogła za to odpowiadać. Film wgrywa się jako plik do naszego własnego magazynu.',
  'Сколько длится видео в посте?':
    'Jak długi może być film w poście?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Na razie plik do 50 MB. Na większym serwerze będą stopnie: 15 sekund, minuta, trzy minuty i piętnaście.',
  'Что делает кнопка «Чаевые автору»?':
    'Co robi przycisk Napiwek dla autora?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Przelewa CUBE z twojego salda do autora posta w całości, bez udziału platformy. Kwota to 1, 5, 10, 25 albo własna.',
  'Как пожаловаться на видео?':
    'Jak zgłosić film?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Trzy kropki pod filmem → Zgłoś: wybierasz powód i możesz dopisać własne słowa. Trafia do człowieka.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Jak udostępnić post?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Trzy kropki pod filmem → Udostępnij. Dostajesz link, który możesz wysłać komukolwiek.',
  'Куда девается «Сохранить»?':
    'Gdzie Zapisz kładzie rzeczy?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Do twojego profilu, na półkę zapisanych, pod ikoną zakładki poniżej zakładek profilu.',
  'Что видно в моём профиле?':
    'Co widać w moim profilu?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Dwie zakładki: Shorty na twoje krótkie filmy, Posty na całą resztę. Dotknięcie karty otwiera ją tak jak w strumieniu. Edycję i usuwanie widzi tylko autor.',
  'Как изменить профиль?':
    'Jak edytować profil?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Przycisk z ołówkiem we własnym profilu: imię, @nazwa, opis, typ konta, status, linki i adres.',
  'Чем бизнес-аккаунт отличается?':
    'Czym różni się konto firmowe?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Publiczne znaczy, że widzą cię wszyscy. Ukryte znaczy, że imię i zdjęcie są schowane przed innymi ludźmi. Firmowe dodaje opis twojej działalności, linki i adres.',
  'Что показывает «онлайн» в шапке?':
    'Co pokazuje «online» w nagłówku?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Ilu ludzi jest teraz na platformie według serwera. Odświeża się co pół minuty.',
  'Закрывается ли игра вместе с эфиром?':
    'Czy gra zamyka się razem z transmisją?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Tak. Jeśli w transmisji były kostki, gra wyłącza się sama po jej końcu; inaczej przedmioty latałyby dalej nad pustą mapą.',
  'Есть ли смайлы в эфире?':
    'Czy w transmisji są emoji?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Tak, przycisk emoji obok paska pisania ma cały wspólny zbiór, ten sam co w rozmowach.',
  'Что такое «Все вопросы»?':
    'Czym są Wszystkie pytania?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Pełny podręcznik pomocnika: ponad sto pytań z odpowiedziami, poukładanych w działy, z wyszukiwaniem po tytule.',
  'Куда делась кнопка NET?':
    'Gdzie podział się przycisk NET?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Został usunięty. Platforma nie szuka w wielkim internecie, a przycisk obiecywał, że szuka. Pomocnik odpowiada o platformie i znajduje kostki, ludzi, grupy i transmisje.',
  'Почему звук повторялся дважды?':
    'Dlaczego dźwięk powtarzał się dwa razy?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Mówiły dwa różne kawałki kodu i żaden nie przerywał drugiemu. Teraz każda fraza anuluje poprzednią, a ten sam tekst nie powtarza się dwa razy z rzędu.',
  'Как выключить голос совсем?':
    'Jak całkiem wyłączyć głos?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Na stronie Komendy głosowe jest przełącznik między odpowiadaniem na głos a odpowiadaniem po cichu. Teraz wyłącza naprawdę: wcześniej rządził tylko jednym wejściem, a głos je omijał.',
  'Что хранится только в моём браузере?':
    'Co jest trzymane tylko w mojej przeglądarce?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Rekordy gier, ustawienia gry z kostkami, wybrany język, motyw i tło oraz lista twoich kont. Nic z tego nie idzie na serwer.',
  'Почему просят подтвердить удаление?':
    'Dlaczego pytacie o potwierdzenie usunięcia?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Bo nie da się tego cofnąć. W rozmowach pytamy jeszcze, którą kopię zdjąć, tylko twoją czy wszystkich.',
  'Что такое «У всех» при удалении?':
    'Co znaczy «Dla wszystkich» przy usuwaniu?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Dla mnie» chowa wiadomość z twojego ekranu. «Dla wszystkich» prosi serwer, żeby zdjął ją także u drugiej osoby.',
  'Сколько живёт сообщение с таймером?':
    'Jak długo żyje wiadomość z terminem?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Tyle, ile wybrałeś: pięć minut, godzina, doba, tydzień albo na zawsze. Przycisk ∞ obok paska pisania.',
  'Как переслать сообщение?':
    'Jak przesłać wiadomość dalej?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Menu wiadomości → Prześlij dalej. Wybierasz komu.',
  'Что делает «В избранное»?':
    'Co robi Zapisz w ulubionych?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Wkłada wiadomość do Zapisanych, twojego własnego zeszytu z notatkami i schowanymi rzeczami.',
  'Как найти сообщение в переписке?':
    'Jak znaleźć wiadomość w rozmowie?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Lupka w nagłówku rozmowy: szuka w tekście, a strzałki skaczą między trafieniami. Półka ze zdjęciami, filmami, audio i linkami jest w tym samym miejscu.',
  'Что такое «Пригласить в группу»?':
    'Czym jest Zaproś do grupy?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Link z informacji o grupie: kto go otworzy, wchodzi do grupy.',
  'Можно ли выйти из группы?':
    'Czy mogę wyjść z grupy?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Tak, przyciskiem w informacjach o grupie. Jeśli wyjdzie właściciel, sama grupa nie znika.',
  'Сколько форм у предметов?':
    'Ile kształtów mają przedmioty?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Dwadzieścia, plus twój obrazek albo film na nich, i tryb na wyrywki.',
  'Что такое шопинг?':
    'Czym są zakupy?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Drugi dział marketplace\'u, na rzeczy: szesnaście kategorii, karta z marką i do dwudziestu zdjęć, i kręcąca się figura z nazwą marki. Zapłata i dostawa są między ludźmi.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Pytaj słowami: na przykład «jak zarobić» albo «znajdź kostkę Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Czego szukać? Napisz coś takiego jak «znajdź kostkę Art» albo «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'O «{что}» nie mam odpowiedzi. Znam platformę: CUBE i naliczenia, limity, swap, portfel, klucze, sygnały, kostki i grupy, grę z kostkami, transmisje, wygląd i komendy głosowe.'

});
