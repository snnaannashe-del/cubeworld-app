/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-fi.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('fi', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Julkaisut, videot ja pyöreät pätkät. Täältä avautuvat myös kommentit ja reaktiot.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Henkilökohtaiset keskustelut, ääniviestit ja pyöreät videot, tallennetut.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Julkiset yhteisöt: yhteinen keskustelu, tapahtumien virta, jäsenet.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Kaupankäynnin signaalit: suunta, sisäänmeno, tavoite ja stoppi. Hintaa seuraa palvelin itse.',
  'Объявления и обмен между людьми.':
    'Ilmoitukset ja vaihto ihmisten kesken.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Palkkioiden kertoimet, swap ja kaikki, mikä tuo CUBEa.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Saldosi CUBEina, panot, nostot ja historia.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Mitä kuutioillesi ja julkaisuillesi tapahtuu, numeroina.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE on alustan sisäinen valuutta. Palvelin hyvittää sitä kerran päivässä aktiivisuudesta: aktiivinen päivä, omat julkaisut ja kommentit, kutsumasi ihmiset. Swapin sisällä CUBEn hinta on kiinteä: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Palvelin laskee palkkiot kerran päivässä. Mikä lasketaan: aktiivinen päivä verkossa, omat julkaisut ja kommentit 10 tuhannesta näytöstä, kutsutut, jotka maksoivat tilauksen, ja lisät viikosta, kuukaudesta ja vuodesta putkeen. Tarkat kertoimet ovat aina tuoreina osiossa Tienaa.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Jottei mitään voisi puhaltaa huijaamalla, palvelin pitää päivärajoja: 20 uutta keskustelua, 500 tykkäystä, 50 kommenttia, 500 seuraamista. Näyttöjä ei voi puhaltaa lainkaan, ne lasketaan vain oikeista näytöistä. Paljonko tänään on jäljellä, näkyy osiossa Tienaa.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swap vaihtaa kryptoa CUBEksi ja takaisin: 16 valuuttaa ja niiden verkot, kurssi otetaan pyynnön hetkellä, CUBE lasketaan hintaan $0.50. Panot ja nostot kulkevat maksunvälittäjän kautta; pörssien tai lompakoiden avaimia emme ota emmekä säilytä. Nostaa voi vain sen, minkä on tienannut, ei sitä, mikä on annettu lahjaksi.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Lompakko näyttää saldon CUBEina, historian ja panon ja noston napit. Pano ja nosto tehdään swapin kautta.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Avain avaa mahdollisuuksia: Free on perusta, Silver on laajennettu, Gold antaa enemmän kuutioita ja tilastoja. Avaimet ostetaan CUBEilla. Premium-tilaus antaa osuuden palkkiopotista sen mukaan, paljonko olet kuussa tuonut.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Signaali on suunta, sisäänmenon piste, tavoite ja stoppi. Palvelin seuraa hintaa itse ja sulkee signaalin tavoitteessa tai stopissa. Pörssin avaimia emme pyydä: käyt kauppaa itse, omillasi.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Reaktio julkaisun alla tuo tekijälle CUBEa. Päivässä voi antaa enintään 500 tykkäystä, sen yli palvelin ei niitä yksinkertaisesti laske.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Kuutio on oma tilasi: keskustelu, virta, yksityiset huoneet ja elinaikalaskuri. Se tehdään «+»-napilla maailmassa. Ihmiset kutsut linkillä tai kuution avaimella.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Kuutio on oma maailma alustan sisällä: oma nimi, kansi, keskustelu, virta ja elinaika. Kuutiot näkyvät kartalla, niiden välissä voi kulkea ja niihin voi mennä sisään.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Ryhmät ovat julkisia yhteisöjä: yhteinen keskustelu, tapahtumien virta ja jäsenten lista. Omasi voit tehdä osiossa Ryhmät.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Peli kuutioilla avautuu napista kartalla. Teot jakautuvat sysäyksiin (räjähdys, heitot, heitto ylös, ilotulitus, kaaos) ja tiloihin (putoaminen tai painottomuus, toinen tai toinen, magneetti, pyörre, jäätyminen). Tilat lasketaan yhteen ja pysyvät, kunnes sammutat ne. Kaikki tämä toimii napista, eleellä kameran edessä ja äänellä.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'Pelissä voi sytyttää eleet: liike sivulle on heitto, ylös heitto ylös, alas putoaminen, kämmen eteen räjähdys, ympyrä pyörre, ja molemmat kädet kaaos. Kameran kuva ei mene minnekään, kaikki lasketaan omalla laitteellasi.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Esineet eivät ole vain kuutioita: kristalli, kolmio, oktaedri, pallo, pyramidi, prisma, tähti, ikosaedri, rengas, dollari, euro, juan. Voit laittaa oman kuvan tai oman videon enintään 15 sekuntia; pystysuora 9:16 rajataan keskeltä neliöksi.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Pelissä on kahdeksan hahmoa: kissa, naapuri, koira, robotti, haamu, panda, sammakko ja avaruusolento. Niitä voi silittää, kutittaa ja ravistella, ja ne vastaavat äänellä ja liikkeellä. Oman tekosi lisäät napista: nimi, komento, kuvaus ja millä se tehdään — kädellä, jalalla, päällä vai koko keholla.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Ulkoasu muuttaa ikkunoiden väriä ja läpinäkyvyyttä: Väri 1 on otsikot ja palkit, Väri 2 on itse ikkuna, Väri 3 on kansi ja profiilin kehys. Keskustelujen taustat valitaan samasta paikasta, omat laitetaan 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Äänellä toimii melkein kaikki: osiot, peli, muodot, hahmot, yli yhdeksänkymmentä komentoa. Koko lista kaikilla kahdellakymmenellä kielellä on sivulla Äänikomennot: se avautuu Ulkoasusta tai sanomalla «äänikomennot». Vaihtokytkin ääneen vastaamisen ja hiljaisen vastauksen välillä on sekin siellä.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Asiakirjat avautuvat tilin valikosta → Asiakirjat. Niitä on seitsemän: käyttöehdot, tietosuojakäytäntö, yhteisön säännöt, palkkiot ja rajat, swap ja maksut, tilaus ja avaimet, kamera ja mikrofoni. Se käy äänelläkin, sano «asiakirjat».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Kutsut antavat CUBEa, kun kutsuttu maksaa tilauksen. Oma linkkisi on kutsujen osiossa.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Profiili on näyteikkunasi: kansi, kuvaus ja työt. Kannen ja kehyksen ulkonäkö muuttuu Värillä 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Tilastot näyttävät, mitä kuutioillesi ja julkaisuillesi tapahtuu: näytöt, reaktiot, ihmisten virta.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'Profiilissa voit piilottaa nimen ja kuvan, niiden sijaan tulee nimetön numero. Mutta se piilottaa sinut muilta ihmisiltä, ei palvelimelta: yhteyden IP-osoitteen näkee jokainen sivusto internetissä, ja meidänkin. Mitään, mikä piilottaisi IP-osoitteen, ei sovelluksessa ole.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Tori on ilmoituksia ja vaihtoa ihmisten kesken.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Julkaisut, kommentit, mainokset, nimet ja kuvaukset tarkastetaan. Mikä on selvästi kiellettyä, ei mene julki, epäselvä menee ihmiselle. Toria tämä tarkastus ei koske.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Hei. Olen alustan avustaja: vastaan kuutioista, palkkioista, lompakosta, pelistä ja asetuksista, ja löydän myös kuutioita, ihmisiä ja ryhmiä. Kysy minulta sanoin, esimerkiksi «miten tienaan», «etsi kuutio Art», «kuka on @anna». Muuta maailmaa varten on vieressä NET-välilehti.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE ja rahat',
  'Что такое CUBE?':
    'Mitä CUBE on?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE on alustan sisäisiä pisteitä. Palvelin hyvittää niitä kerran päivässä aktiivisuudesta. Swapin sisällä hinta on kiinteä: 1 CUBE = $0.50. Se ei ole arvopaperi eikä lupaus tuloista.',
  'Как заработать?':
    'Miten tienaan?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Palvelin laskee ja sulkee päivän kerran 24 tunnissa: aktiivinen päivä verkossa, omat julkaisut ja kommentit 10 tuhannesta näytöstä, reaktiot julkaisujesi alla, kutsutut, jotka maksoivat tilauksen, ja lisät viikosta, kuukaudesta ja vuodesta putkeen. Tarkat kertoimet ovat osiossa Tienaa.',
  'Какие лимиты в сутки?':
    'Mitkä ovat päivärajat?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 uutta keskustelua, 500 tykkäystä, 50 kommenttia, 500 seuraamista. Näyttöjä ei voi puhaltaa lainkaan. Laskenta kulkee UTC-vuorokausina; jos raja tulee täyteen, tekoa ei yksinkertaisesti lasketa, eikä siitä rangaista.',
  'Что считается накруткой?':
    'Mikä lasketaan huijaamiseksi?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Tilinippujen käyttö, automaattiset tykkäykset ja seuraamiset, ostetut näytöt, sopimukset keskinäisistä reaktioista. Näin saadut palkkiot otetaan takaisin.',
  'Как работает свайп?':
    'Miten swap toimii?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swap vaihtaa kryptoa CUBEksi ja takaisin: 16 valuuttaa ja niiden verkot. Krypton kurssi otetaan pyynnön hetkellä, CUBE lasketaan hintaan $0.50. Panot ja nostot kulkevat maksunvälittäjän kautta.',
  'Как пополнить кошелёк?':
    'Miten lataan lompakon?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Swapin kautta: teet pyynnön, saat osoitteen ja summan ja lähetät siirron omasta lompakostasi. On tärkeää, että valuutta ja verkko vastaavat pyyntöä, muuten siirtoa ei saa takaisin.',
  'Как вывести деньги?':
    'Miten nostan rahat?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Osoitteeseesi tehdään nostopyyntö, ja verkkomaksun maksaa vastaanottaja. Tarkastamme ja lähetämme käsin, useimmiten yhden työpäivän kuluessa.',
  'Почему вывести можно не всё?':
    'Miksi en voi nostaa kaikkea?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Nostaa voi vain sen, minkä on tienannut. Lahjana tai lisänä hyvitettyä CUBEa voi käyttää alustan sisällä mutta ei nostaa; muuten riittäisi jakaa lahjoja ja muuttaa ne rahaksi.',
  'Какие монеты поддерживаются?':
    'Mitä valuuttoja tuetaan?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 valuuttaa ja niiden verkot: BTC, ETH, USDT, USDC, BNB ja yksitoista muuta vaihdon kärjestä. Koko lista verkkoineen on swap-ikkunassa.',
  'Что если отправил не в ту сеть?':
    'Mitä jos lähetin väärään verkkoon?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Lohkoketjussa tehtyä siirtoa ei voi peruuttaa. Kirjoita tuelle heti: joskus jotain voi tehdä, mutta sitä ei voi luvata. Siksi verkon pyynnössä ja lompakossasi pitää olla sama.',
  'Берёте ли вы ключи от бирж?':
    'Otatteko pörssien avaimia?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Emme. Emme pyydä emmekä ota pörssien avaimia, seed-lauseita tai pääsyä lompakkoosi. Jos joku pyytää sitä alustan nimissä, hän on huijari.',
  'Платите ли вы налоги за меня?':
    'Maksatteko veroni?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Emme. Mitä olet valtiolle velkaa, sen selvität ja maksat itse. Emme ole veroasiamies.',
  'Ключи и подписка':
    'Avaimet ja tilaus',
  'Какие бывают ключи?':
    'Mitä avaimia on?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free on perusta, Silver on laajennettu, Gold antaa enemmän kuutioita ja analytiikkaa. Avain päivitetään CUBEilla avainkaupassa.',
  'Что даёт Premium?':
    'Mitä Premium antaa?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'Osuuden palkkiopotista sen mukaan, paljonko olet kuussa tuonut, ulkoiset lompakot liitettynä näkyviin, tilastot ja listasijoituksen, etuoikeuden signaaleissa, merkin profiiliin ja keskusteluihin, sekä suljetut Premium-kuutiot.',
  'Сколько стоит подписка?':
    'Paljonko tilaus maksaa?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 kuussa tai $59.99 vuodessa.',
  'Как отменить подписку?':
    'Miten peruutan tilauksen?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Milloin tahansa: se kuluu loppuun sen jakson, jonka maksoit, eikä uusiudu. Kuluvalta jaksolta maksettua ei palauteta, paitsi jos laki vaatii palautuksen.',
  'Я потерял ключ: что делать?':
    'Hukkasin avaimeni, mitä teen?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Sitä ei saa takaisin. Emme pyydä sähköpostia emmekä puhelinnumeroa, joten meillä ei ole tapaa varmistaa, että tili on sinun. Avain on tili; säilytä se paikassa, josta se ei katoa.',
  'Можно ли передать ключ другому?':
    'Voinko antaa avaimeni toiselle?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Voit, mutta kaikki sillä tehty lasketaan sinun tekemäksesi.',
  'Кубы и группы':
    'Kuutiot ja ryhmät',
  'Что такое куб?':
    'Mikä kuutio on?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Kuutio on oma maailma alustan sisällä: oma nimi, kansi, keskustelu, virta, yksityiset huoneet ja elinaika. Kuutiot näkyvät kartalla, ja niihin voi mennä sisään.',
  'Как создать куб?':
    'Miten teen kuution?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    '«+»-napilla maailmassa tai Minun maailmankaikkeudessani. Annat nimen, kannen, tyypin ja elinajan. Ihmiset kutsut linkillä tai kuution avaimella.',
  'Что такое таймер жизни куба?':
    'Mikä on kuution elinaikalaskuri?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Kuutio elää määrätyn ajan ja sulkeutuu sitten. Aika valitaan, kun sen tekee, tunnista vuoteen.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Mitä ryhmät ovat?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Julkisia yhteisöjä: yhteinen keskustelu, tapahtumien virta ja jäsenten lista.',
  'Как найти куб или человека?':
    'Miten löydän kuution tai ihmisen?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Kirjoita se tähän: «etsi kuutio Art», «@anna», «valokuvaryhmä». Etsin alustalta ja näytän kortteja: kuutioita, ihmisiä, ryhmiä ja lähetyksiä, jotka ovat juuri nyt käynnissä.',
  'Лента и посты':
    'Virta ja julkaisut',
  'Как выложить пост?':
    'Miten julkaisen?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Virran luomisnapista. Video, kuva, otsikko ja kuvaus ovat kaikki sallittuja.',
  'Почему пост не опубликовался?':
    'Miksi julkaisuni ei mennyt läpi?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Teksti ei läpäissyt tarkastusta ennen julkaisua. Viesti kertoo syyn: kielletyt tavarat, petos, uhkaukset ja muut. Säännöt ovat Asiakirjoissa, ja jos kyse on virheestä, kirjoita tuelle.',
  'Что дают реакции?':
    'Mitä reaktiot antavat?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Reaktio julkaisun alla tuo tekijälle CUBEa. Päivässä voi antaa enintään 500 tykkäystä.',
  'Как пожаловаться на пост?':
    'Miten ilmoitan julkaisusta?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Jokaisen julkaisun ja jokaisen viestin alla on ilmoitusnappi. Ilmoitus menee ihmiselle.',
  'Сколько просмотров нужно для начисления?':
    'Montako näyttöä palkkioon tarvitaan?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    '10 tuhannesta oikeasta näytöstä: omat julkaisut ja kommentit alkavat tuoda CUBEa siitä rajasta.',
  'Игра с кубами':
    'Peli kuutioilla',
  'Как играть кубами?':
    'Miten kuutioilla pelataan?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Pelin nappi on kartalla. Kuutiot lentävät seinien sisällä eivätkä pääse ulos. Teot painetaan napista, näytetään kädellä kameran edessä tai sanotaan ääneen.',
  'Что такое режимы и толчки?':
    'Mitä tilat ja sysäykset ovat?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Sysäyksiä ovat räjähdys, heitot, heitto ylös, ilotulitus ja kaaos: ne käyvät kerran ja vaikuttavat kaiken yli. Tilat pysyvät, kunnes sammutat ne, ja ne lasketaan yhteen: painovoima (putoaminen TAI painottomuus), magneetti, pyörre, jäätyminen.',
  'Как работают жесты рукой?':
    'Miten käden eleet toimivat?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Liike sivulle on heitto, ylös heitto ylös, alas putoaminen, kämmen eteen räjähdys, ympyrä pyörre, molemmat kädet kaaos. Kuvat käsitellään omalla laitteellasi, eivätkä ne mene minnekään.',
  'Какие есть формы?':
    'Mitä muotoja on?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kuutio, kristalli, kolmio, oktaedri, pallo, pyramidi, prisma, tähti, ikosaedri, rengas, dollari, euro, juan, ja oma kuvasi. Lisäksi «sekaisin», jossa jokaisella esineellä on oma muotonsa.',
  'Как поставить свою картинку?':
    'Miten laitan oman kuvani?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'Pelissä → Esineen muoto → ruutu «Oma». Neliö on paras; pystysuora 9:16 rajataan keskeltä. Paina «Oma» uudelleen vaihtaaksesi sen.',
  'Можно ли поставить видео?':
    'Käykö video?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Käy, enintään 15 sekuntia. Pidempää ei oteta vastaan. Video kestää sivun uudelleenlatauksen.',
  'Кто такие персонажи?':
    'Keitä hahmot ovat?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Kahdeksan hahmoa: kissa, naapuri, koira, robotti, haamu, panda, sammakko, avaruusolento. Niitä voi silittää, kutittaa ja ravistella, ja ne vastaavat äänellä ja liikkeellä.',
  'Как добавить своё действие?':
    'Miten lisään oman tekoni?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Napista hahmojen osiossa: nimi, komento, kuvaus ja millä se tehdään — kädellä, jalalla, päällä vai koko keholla. Itse teko valitaan kuudestatoista valmiista tehosteesta.',
  'Как крутятся предметы?':
    'Miten esineet pyörivät?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Viisi tilaa: akselin suuntaan, akselia vastaan, yläkautta, alakautta ja sekaisin. Heitosta tuleva pyörintä lisätään valittuun tilaan.',
  'Как начать эфир?':
    'Miten aloitan lähetyksen?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Virran Lähetys-nappi tai äänikomento «lähetys». Valitset otsikon ja tilan, ja olet suorassa. Katsojat saavat kuvan suoraan sinulta.',
  'Какие режимы эфира?':
    'Mitä lähetystiloja on?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera ja kuutiot: näyttämö kameran kuvan päällä, eleet toimivat. Vain kuutiot: näyttämö ilman kameraa. Puhdas lähetys: pelkkä kamera, ilman kommentteja, reaktioita ja lahjoja.',
  'Сколько зрителей выдержит эфир?':
    'Montako katsojaa lähetys kestää?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Kuva menee suoraan lähettäjältä jokaiselle katsojalle, joten se riippuu hänen yhteydestään: kotilinjalla kymmenen–viisitoista ihmistä katsoo vaivatta. Isompi sali vaatii välityspalvelimen.',
  'Что такое подарки?':
    'Mitä lahjat ovat?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Kolmekymmentä lahjaa, Ruususta hintaan 1 CUBE Legenda-kuutioon hintaan 1000. Lahja on CUBEn siirto lähettäjälle kokonaisuudessaan; alusta ei ota mitään.',
  'Как закончить эфир?':
    'Miten lopetan lähetyksen?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Ikkunan otsikossa oleva Lopeta lähetys -nappi, näkyy joka tilassa. Ikkunan sulkeminen rastista ei pysäytä lähetystä: se jatkuu, kunnes painat Lopeta.',
  'Голос и языки':
    'Ääni ja kielet',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Mitä äänikomentoja on?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Yli yhdeksänkymmentä: osiot, ikkunat, luominen, virta, peli, muodot, hahmot, ohjaus. Koko lista hakutoiminnolla on sivulla Äänikomennot: tilin valikko → Äänikomennot, tai Ulkoasussa, tai sano vain «äänikomennot».',
  'На каких языках работает голос?':
    'Millä kielillä ääni toimii?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'Kahdellakymmenellä: venäjä, englanti (ja intialainen), ukraina, saksa, ranska (ja kanadalainen), espanja (ja latinalaisamerikkalainen), italia, portugali, puola, turkki, arabia (ja Persianlahden), vietnam, kiina, japani, korea, hindi. Kieli valitaan komentosivulla ja Ulkoasussa.',
  'Как включить микрофон?':
    'Miten laitan mikrofonin päälle?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Mikrofonin nappi on ylimmässä palkissa. Painat sitä ja se kuuntelee, painat uudelleen ja se lopettaa.',
  'Как выключить озвучку?':
    'Miten laitan ääneen vastaamisen pois?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Sivulla Äänikomennot on vaihtokytkin ääneen vastaamisen ja hiljaisen vastauksen välillä. Ääni kuuntelee kummassakin tapauksessa; vain vastaus on eri.',
  'Куда уходит мой голос?':
    'Minne ääneni menee?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Tunnistuksen tekee selain itse. Chrome ja siihen perustuvat selaimet lähettävät äänen Googlen palvelimille; niin heidän tunnistuksensa on rakennettu, eikä alusta päätä siitä mitään. Jos se ei sovi sinulle, älä laita mikrofonia päälle: kaikki on olemassa napeillakin.',
  'Как поменять тему?':
    'Miten vaihdan teeman?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Ulkoasu → Teema: tumma, vaalea, tai Kamera, jossa taustana on kamerasi kuva.',
  'Что такое Цвет 1, 2 и 3?':
    'Mitä ovat Väri 1, 2 ja 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Väri 1 on otsikot, kirjoituspalkit ja välilehdet. Väri 2 on itse ikkuna: keskustelun tausta ja kommenttien lista. Väri 3 on profiilin kansi ja kehys. Jokaisella on oma läpinäkyvyyden liukusäätimensä.',
  'Как поставить обои?':
    'Miten laitan taustakuvan?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Ulkoasu → Taustakuva: valmis sarja tai oma kuvasi 9:16. Väri 2 asettuu taustakuvan päälle sävynä, ja liukusäädin päättää, miten voimakkaasti.',
  'Правила и безопасность':
    'Säännöt ja turvallisuus',
  'Что нельзя выкладывать?':
    'Mitä ei saa julkaista?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Lapsiin liittyvää aineistoa, uhkauksia ja väkivaltaan kehottamista, vihan lietsontaa, petoksia, kiellettyjä tavaroita, toisen työtä ilman oikeutta siihen, toisena esiintymistä, roskapostia ja teennäistä aktiivisuutta. Kokonaisuudessaan Yhteisön säännöissä.',
  'Как работает модерация?':
    'Miten tarkastus toimii?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Julkaisut, kommentit, ryhmäviestit, nimet ja kuvaukset tarkastetaan palvelimella ennen julkaisua. Selvästi kielletty ei mene julki, epäselvä menee ihmiselle. Toria ja henkilökohtaisia keskusteluja ei tarkasteta.',
  'Виден ли мой IP?':
    'Näkyykö IP-osoitteeni?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Näkyy, palvelin näkee sen, kuten jokainen sivusto internetissä: ilman IP-osoitetta se ei tietäisi, minne vastaus lähetetään. Piilotettu tila piilottaa nimesi ja kuvasi muilta ihmisiltä, mutta ei palvelimelta.',
  'Что вы храните обо мне?':
    'Mitä te minusta säilytätte?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Tilin avaimen, profiilin, jonka olet itse täyttänyt, sisältösi, päivälaskurit ja yhteyden tekniset tiedot. Ei sähköpostia, ei puhelinnumeroa, ei salasanoja eikä lompakoiden avaimia.',
  'Куда жаловаться?':
    'Minne valitan?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Sisällöstä sen alla olevalla ilmoitusnapilla. Kaikesta muusta alustan sisäisen tuen kautta.',
  'Где документы?':
    'Missä asiakirjat ovat?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Tilin valikko → Asiakirjat. Niitä on seitsemän: käyttöehdot, tietosuojakäytäntö, yhteisön säännöt, palkkiot ja rajat, swap ja maksut, tilaus ja avaimet, kamera ja mikrofoni.',
  'Что такое карта?':
    'Mikä kartta on?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Alustan kartta: 177 maata ja 1150 kaupunkia oikeilla koordinaateilla, auringon paikka laskettuna nykyiselle hetkelle, yön puoli ja aamunkoitto tarkalleen siellä, missä ne taivaalla ovat. Kaksikymmentä näkymää: avaruudesta, Maa yöllä, päivä ja yö, OpenStreetMapin kadut, sää, maanjäristykset, aikavyöhykkeet, meidän kuutiot ja lähetykset. Se avautuu tilin valikosta tai sanomalla «kartta».',
  'Как проложить маршрут на карте?':
    'Miten piirrän reitin kartalle?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Kosketa alkua kartalla, sitten loppua, ja valitse yksi kahdestakymmenestä tiestä. Isoympyrä ja loksodromi — niin kuin todella lennetään ja purjehditaan. Vain maata ja vain vettä: oikea tienhaku mannerten läpi ilman yhtäkään askelta toisessa elementissä. Varjoa pitkin ja valoa pitkin: yön puolta pitkin. Kuutioiden, lähetysten ja ihmisten ohi: meidän nuppineulojemme kautta. Katuja pitkin kulkevan reitin laskee ulkoinen kone OSRM; jos se ei vastaa, sanomme sen.',
  'Видно ли меня на карте?':
    'Näynkö minä kartalla?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Vain jos olet itse pistänyt nuppineulan «olen tässä». Se elää puoli tuntia ja pyyhkii itsensä, koordinaatit pyöristetään kilometriin jo ennen kuin ne lähtevät palvelimelle, ja «poista minut kartalta» poistaa tiedon sen sijaan että piilottaisi sen. Ilman sitä neulaa sinua ei ole kartalla lainkaan.',
  'Есть ли на карте спутник и пробки?':
    'Onko kartalla satelliitti ja ruuhkat?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Ei ole. Satelliittikuvat ja ruuhkat antavat maksulliset toimittajat avaimella. Paikka näille tasoille on valmiina: laitat avaimen ja ne syttyvät. Niin kauan kuin avainta ei ole, kartta sanoo sen suoraan sen sijaan että piirtäisi kauniin valheen.',
  'Что такое забег по улице?':
    'Mikä on katujuoksu?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Hyppy kartan sisään: näkymä omasta silmästä, oman katusi oikeat rakennukset ja mutkat. Juokset itse: pyyhkäisy sivulle vaihtaa kaistaa, risteyksessä kääntää, ylös hyppää, alas liukuu. Keräät kuutioita ja väistät esteitä ja säteitä. Matkalla kohtaat toisten lähetyksiä, kuutioita ja näyteikkunoita. On myös rauhallinen kävely ohjaussauvalla. Se avautuu tilin valikosta, kartalta Kadulle-napista, tai sanomalla «juoksu».',
  'Откуда берутся дома в забеге?':
    'Mistä juoksun rakennukset tulevat?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'OpenStreetMapista: oikeat rakennusten ääriviivat ja kerrosluvut, oikeat tiet leveyksineen ja mutkineen. Kerroksen laskemme kolmeksi metriksi; jos kerrosluku puuttuu, korkeus otetaan rakennuksen pohjan koosta. Katukuvia ei ole, niitä antavat maksulliset toimittajat. Jos karttapalvelin on kiireinen, peli sanoo sen rehellisesti ja rakentaa oman korttelimme.',
  'Что такое шопинг в маркетплейсе?':
    'Mikä on torin shoppailu?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Torin toinen osio, tavaroille eikä tiedostoille: kuusitoista luokkaa vaatteista taiteeseen, kortti merkin kanssa, koot, värit, ominaisuudet ja enintään kaksikymmentä kuvaa. Joka kortilla pyörii hahmo merkin nimellä, mikä tahansa kahdestakymmenestä muodosta. Osio ei koske rahaa: maksu ja toimitus ovat ihmisten välisiä, siksi siellä sanotaan «kirjoita myyjälle» eikä «osta CUBEilla».',
  'Игры, чаты и новое':
    'Pelit, keskustelut ja uutta',
  'Сколько игр в зале?':
    'Montako peliä salissa on?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Kahdeksan, ja kaikkia voi pelata: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Niitä ohjataan sormella ja näppäimistöllä.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Antavatko pelit CUBEa?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Eivät. Pelit antavat pisteitä ja oman ennätyksen, jotka ovat selaimessasi. CUBEn hyvittää palvelin näytöistä ja yhteisestä potista; kolikoiden lyöminen selaimessa olisi valhetta.',
  'Как играть в DataMine?':
    'Miten DataMineä pelataan?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Kenttä kahdeksan kertaa kahdeksan. Kosketat ruutua ja kaivat datan esiin; numero kertoo, montako virusta on sen vieressä. Pitkä painallus asettaa lipun. Kolme elämää, sitten uusi kerros.',
  'Как играть в CipherBreak?':
    'Miten CipherBreakia pelataan?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Arvaa neljän merkin koodi. Yrityksen jälkeen täysi rengas tarkoittaa, että merkki on paikallaan, tyhjä sitä, että se on koodissa mutta muualla. Kahdeksan yritystä.',
  'Как играть в Phantom Escape?':
    'Miten Phantom Escapea pelataan?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Kerää viisi avainta ja poistu ovesta. Haamut jahtaavat sinua lyhintä tietä, ja joka kerroksessa niitä on enemmän.',
  'Как играть в Block Trade?':
    'Miten Block Tradea pelataan?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Puolitoista minuuttia, 1000 kädessä. Osta halvemmalla, myy kalliimmalla. Tuloksesi on kaikki tuhannen yli menevä.',
  'Как играть в TrustChain?':
    'Miten TrustChainia pelataan?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Kosketa lohkoja nousevassa järjestyksessä kellon käydessä. Yksi virhe ja ketju katkeaa. Joka kierroksella ketju pitenee.',
  'Как играть в CubeBuilder?':
    'Miten CubeBuilderia pelataan?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Laatta kulkee sivusuunnassa, ja kosketus pudottaa sen. Yli jäävä putoaa, ja laatta kapenee. Jos ohitat tornin, peli loppuu.',
  'Что показывает строка курсов?':
    'Mitä kurssipalkki näyttää?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Kolmekymmentä valuuttaa hintoineen ja päivän muutoksineen. Tiedot tulevat palvelimemme kautta, joka pitää puolen minuutin välimuistin. Palkki ei liu\'u: ruudulle mahtuu kokonainen määrä ruutuja, ja ne vaihtuvat parin sekunnin välein.',
  'Что значит число кубов в шапке?':
    'Mitä otsikon kuutioluku tarkoittaa?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Montako kuutiota maailmassasi on nyt, ne jotka näet edessäsi. Ei alustan kuutioiden kokonaismäärää.',
  'Можно ли войти вторым аккаунтом?':
    'Voinko kirjautua toisella tilillä?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Voit. Tilin valikko → Lisää tili: nykyinen avain jää listaan, ja palaat siihen yhdellä kosketuksella samasta valikosta. Kahdeksan muistetaan.',
  'Зачем «Сохранить» в окне игры?':
    'Mitä varten pelin ikkunan Tallenna on?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Se muistaa esineen muodon, hahmon, eleet ja koon. Seuraavalla kerralla kaikki on siellä, mihin sen jätit.',
  'Чем режим отличается от толчка?':
    'Miten tila eroaa sysäyksestä?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Tila pysyy, kunnes sammutat sen toisella kosketuksella, ja se jää palamaan. Sysäys käy kerran eikä syty; se jättää vain ohuen merkin siitä, että sitä painettiin viimeksi.',
  'Почему кубы больше не исчезают?':
    'Miksi kuutiot eivät enää katoa?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Näyteikkunan esittelykuutiot elivät vähän, viisi ja viisitoista minuuttia. Nyt ne saavat vähintään puoli vuorokautta ja käynnistetään uudelleen ennen kuin ne loppuvat. Oikeat kuutiot elävät tarkalleen niin kauan kuin niille annettiin luomisen hetkellä.',
  'Как сделать фото прямо в чат?':
    'Miten kuvaan suoraan keskusteluun?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Klemmari → Kamera avaa oman kuvauksemme. Yksi kosketus ottaa kuvan, pitkä painallus tallentaa videota enintään minuutin. Galleria on vieressä oleva kohta, Kuva tai video.',
  'Что такое галерея переписки?':
    'Mikä on keskustelun galleria?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Keskustelun otsikon suurennuslasi avaa haun, ja sen yllä hyllyn: kuvat, videot, äänet ja linkit tästä keskustelusta. Se kerätään viesteistä itsestään, eikä mikään mene minnekään.',
  'Как удалить сразу несколько сообщений?':
    'Miten poistan useita viestejä kerralla?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Pitkä painallus viestin kohdalla sytyttää valinnan, sitten rastitat haluamasi ja painat Poista alapalkissa. Enintään sata kerrallaan.',
  'Можно ли изменить своё сообщение?':
    'Voinko korjata oman viestini?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Voit, omiasi ja vain tekstiviestejä: viestin valikko → Muokkaa. Viereen tulee merkki «muokattu». Keskustelu ei sulkeudu sillä välin.',
  'Что такое сторис?':
    'Mitä tarinat ovat?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Lyhyitä julkaisuja, jotka elävät vuorokauden, keskustelujen listan yläpuolella: kuva tai video enintään minuutin. Niitä katsotaan yksi toisensa jälkeen, ja vuorokauden kuluttua ne katoavat itsestään.',
  'Сколько фото можно в группу?':
    'Montako kuvaa ryhmään mahtuu?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Enintään seitsemän kuvaa tai yksi video enintään minuutin. Lisäksi kuvake sarjasta ja tunnisteet kuvauksen alle.',
  'Что такое теги группы?':
    'Mitä ryhmän tunnisteet ovat?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Muutama pilkuilla eroteltu sana, joiden avulla ryhmä löytyy haussa.',
  'Видно ли участников группы?':
    'Näkyvätkö ryhmän jäsenet?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Omistaja päättää sen luodessaan: jäsenten lista voidaan näyttää kaikille tai jättää näkyväksi vain omistajalle.',
  'Почему поле ссылки на видео убрали?':
    'Miksi poistitte videolinkin kentän?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Vieras linkki hajosi, kun se poistettiin toisesta päästä, eikä alusta voinut vastata siitä. Video ladataan tiedostona omaan varastoomme.',
  'Сколько длится видео в посте?':
    'Miten pitkä julkaisun video voi olla?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Toistaiseksi tiedosto enintään 50 MB. Isommalla palvelimella tulee portaat: 15 sekuntia, minuutti, kolme minuuttia ja viisitoista.',
  'Что делает кнопка «Чаевые автору»?':
    'Mitä Tippi tekijälle -nappi tekee?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Se siirtää CUBEa saldostasi julkaisun tekijälle kokonaisuudessaan, ilman osuutta alustalle. Summa on 1, 5, 10, 25 tai oma.',
  'Как пожаловаться на видео?':
    'Miten ilmoitan videosta?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Videon alla olevat kolme pistettä → Ilmoita: valitset syyn ja voit lisätä omat sanasi. Se menee elävälle ihmiselle.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Miten jaan julkaisun?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Videon alla olevat kolme pistettä → Jaa. Saat linkin, jonka voit lähettää kenelle haluat.',
  'Куда девается «Сохранить»?':
    'Minne Tallenna panee asiat?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Profiiliisi, tallennettujen hyllylle, kirjanmerkkikuvakkeen alle profiilin välilehtien alapuolelle.',
  'Что видно в моём профиле?':
    'Mitä profiilissani näkyy?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Kaksi välilehteä: Shorts lyhyille videoille, Julkaisut kaikelle muulle. Kortin kosketus avaa sen aivan kuin virrassa. Muokkauksen ja poiston näkee vain tekijä.',
  'Как изменить профиль?':
    'Miten muokkaan profiiliani?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Oman profiilin kynänappi: nimi, @käyttäjä, kuvaus, tilin tyyppi, tila, linkit ja osoite.',
  'Чем бизнес-аккаунт отличается?':
    'Miten yritystili eroaa muista?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Julkinen tarkoittaa, että kaikki näkevät sinut. Piilotettu tarkoittaa, että nimesi ja kuvasi on piilotettu muilta ihmisiltä. Yritys lisää kuvauksen työstäsi, linkit ja osoitteen.',
  'Что показывает «онлайн» в шапке?':
    'Mitä otsikon «verkossa» näyttää?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Montako ihmistä on alustalla juuri nyt palvelimen mukaan. Se päivittyy puolen minuutin välein.',
  'Закрывается ли игра вместе с эфиром?':
    'Sulkeutuuko peli lähetyksen mukana?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Kyllä. Jos lähetyksessä oli kuutioita, peli sammuu itse, kun lähetys loppuu; muuten esineet lentelisivät tyhjän kartan yllä.',
  'Есть ли смайлы в эфире?':
    'Onko lähetyksessä emojeja?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'On, kirjoituspalkin vieressä oleva emojinappi pitää koko yhteistä sarjaa, samaa kuin keskusteluissa.',
  'Что такое «Все вопросы»?':
    'Mikä on «Kaikki kysymykset»?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Avustajan täydellinen opas: yli sata kysymystä vastauksineen, osioihin järjestettynä, otsikkohaulla.',
  'Куда делась кнопка NET?':
    'Minne NET-nappi meni?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Poistimme sen. Alusta ei etsi suuresta internetistä, ja nappi lupasi, että etsii. Avustaja vastaa alustasta ja löytää kuutioita, ihmisiä, ryhmiä ja lähetyksiä.',
  'Почему звук повторялся дважды?':
    'Miksi ääni toistui kaksi kertaa?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Kaksi eri koodinpalaa puhui, eikä kumpikaan keskeyttänyt toista. Nyt jokainen lause peruu edellisen, eikä sama teksti toistu kahdesti peräkkäin.',
  'Как выключить голос совсем?':
    'Miten sammutan äänen kokonaan?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Sivulla Äänikomennot on vaihtokytkin ääneen vastaamisen ja hiljaisen vastauksen välillä. Nyt se sammuttaa todella: ennen se ohjasi vain yhtä sisäänmenoa ja ääni kiersi sen.',
  'Что хранится только в моём браузере?':
    'Mitä säilytetään vain selaimessani?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Pelien ennätykset, kuutiopelin asetukset, valittu kieli, teema ja taustakuva, sekä tiliesi lista. Mikään näistä ei mene palvelimelle.',
  'Почему просят подтвердить удаление?':
    'Miksi pyydätte vahvistusta poistolle?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Koska sitä ei saa takaisin. Keskusteluissa kysymme myös, kumpi kopio poistetaan, vain sinun vai kaikkien.',
  'Что такое «У всех» при удалении?':
    'Mitä «Kaikilta» tarkoittaa poistossa?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Minulta» piilottaa viestin vain omalta ruudultasi. «Kaikilta» pyytää palvelinta poistamaan sen myös toiselta ihmiseltä.',
  'Сколько живёт сообщение с таймером?':
    'Kauanko määräaikainen viesti elää?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Niin kauan kuin valitsit: viisi minuuttia, tunti, vuorokausi, viikko tai ikuisesti. Kirjoituspalkin vieressä oleva ∞-nappi.',
  'Как переслать сообщение?':
    'Miten välitän viestin?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Viestin valikko → Välitä. Valitset kenelle.',
  'Что делает «В избранное»?':
    'Mitä «Tallenna suosikkeihin» tekee?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Se panee viestin kohtaan Tallennetut — omaan muistikirjaasi, jossa ovat muistiinpanot ja talteen pannut asiat.',
  'Как найти сообщение в переписке?':
    'Miten löydän viestin keskustelusta?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Keskustelun otsikon suurennuslasi: se etsii tekstistä, ja nuolet hyppivät löytöjen välillä. Kuvien, videoiden, äänten ja linkkien hylly on samassa paikassa.',
  'Что такое «Пригласить в группу»?':
    'Mikä on «Kutsu ryhmään»?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Linkki ryhmän tiedoista: se, joka sen avaa, liittyy ryhmään.',
  'Можно ли выйти из группы?':
    'Voinko poistua ryhmästä?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Voit, napista ryhmän tiedoissa. Jos omistaja poistuu, itse ryhmää ei poisteta.',
  'Сколько форм у предметов?':
    'Montako muotoa esineillä on?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Kaksikymmentä, lisäksi oma kuvasi tai videosi niiden päällä, ja tila «sekaisin».',
  'Что такое шопинг?':
    'Mitä shoppailu on?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Torin toinen osio, tavaroille: kuusitoista luokkaa, kortti merkin kanssa ja enintään kaksikymmentä kuvaa, sekä pyörivä hahmo merkin nimellä. Maksu ja toimitus ovat ihmisten välisiä.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Kysy sanoin: esimerkiksi «miten tienaan» tai «etsi kuutio Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Mitä etsin? Kirjoita jotain tyyliin «etsi kuutio Art» tai «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Aiheesta «{что}» minulla ei ole vastausta. Se, minkä osaan, on alusta: CUBE ja palkkiot, rajat, swap, lompakko, avaimet, signaalit, kuutiot ja ryhmät, peli kuutioilla, lähetykset, ulkoasu ja äänikomennot.'

});
