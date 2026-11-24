/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-tr.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('tr', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Gönderiler, videolar ve yuvarlak klipler. Yorumlar ve tepkiler de buradan açılır.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Özel yazışmalar, sesli mesajlar ve yuvarlak videolar, kaydedilenler.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Herkese açık topluluklar: ortak sohbet, olay akışı, üyeler.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Alım satım sinyalleri: yön, giriş, hedef ve stop. Fiyatı sunucu kendisi izler.',
  'Объявления и обмен между людьми.':
    'İlanlar ve insanlar arası takas.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Kazanç oranları, swap ve CUBE\'ün geldiği her şey.',
  'Баланс CUBE, пополнение, вывод и история.':
    'CUBE bakiyen, yüklemeler, çekimler ve geçmiş.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Küplerine ve gönderilerine ne olduğu, sayılarla.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE, platformun iç parasıdır. Sunucu onu günde bir kez etkinlik için yatırır: aktif gün, kendi gönderilerin ve yorumların, davet ettiğin kişiler. Swap içinde CUBE fiyatı sabittir: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Sunucu kazançları günde bir kez kapatır. Sayılanlar: çevrimiçi aktif gün, 10 bin görüntülemeden itibaren kendi gönderilerin ve yorumların, aboneliği ödeyen davetliler, ve üst üste bir hafta, bir ay, bir yıl için ek ödemeler. Kesin oranlar Kazan bölümünde her zaman günceldir.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Hiçbir şey şişirilemesin diye sunucu günlük sınırlar tutar: 20 yeni sohbet, 500 beğeni, 50 yorum, 500 takip. Görüntülemeler hiçbir şekilde şişirilemez, yalnızca gerçek gösterimlerden sayılır. Bugün ne kadar kaldığı Kazan bölümünde görünür.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swap kriptoyu CUBE\'e ve geri çevirir: 16 para ve ağları, kur istek anında alınır, CUBE $0.50 üzerinden sayılır. Yatırma ve çekme bir ödeme sağlayıcısı üzerinden gider; kimsenin borsa ya da cüzdan anahtarını almaz ve saklamayız. Yalnızca kazanılan çekilebilir, hediye olarak yatırılan değil.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Cüzdan CUBE bakiyeni, geçmişi ve yükleme ile çekme düğmelerini gösterir. Yükleme ve çekme swap üzerinden olur.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Anahtar olanak açar: Free temel, Silver geniş, Gold daha çok küp ve istatistik verir. Anahtarlar CUBE ile alınır. Premium aboneliği, ayki katkına göre ödül havuzundan pay verir.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Sinyal; yön, giriş noktası, hedef ve stoptur. Sunucu fiyatı kendisi izler ve sinyali hedefte ya da stopta kapatır. Borsa anahtarı istemiyoruz: alım satımı kendi yerinde kendin yaparsın.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Bir gönderinin altındaki tepki, yazarına CUBE getirir. Günde 500 beğeniye kadar verilebilir, sonrası sunucu tarafından sayılmaz.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Küp senin kendi alanındır: sohbet, akış, özel odalar ve yaşam sayacı. Dünyadaki «+» ile oluşturulur. İnsanlar bağlantıyla ya da küpün anahtarıyla çağrılır.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Küp, platformun içindeki ayrı bir dünyadır: kendi adı, kapağı, sohbeti, akışı ve yaşam süresi vardır. Küpler haritada görünür, aralarında gezilebilir ve onlara katılınabilir.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Gruplar herkese açık topluluklardır: ortak sohbet, olay akışı ve üye listesi. Kendi grubunu Gruplar bölümünde kurabilirsin.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Küp oyunu haritadaki bir düğmeyle açılır. Hareketler itmelere (patlama, atışlar, havaya atma, havai fişek, karmaşa) ve kiplere (düşürme ya da ağırlıksızlık, ikisinden biri, mıknatıs, hortum, dondurma) ayrılır. Kipler toplanır ve kaldırılana kadar durur. Bunların hepsi düğmeyle, kamera önünde el hareketiyle ve sesle çalışır.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'Oyunda el hareketleri açılabilir: yana savurma atıştır, yukarı havaya atmadır, aşağı düşürmedir, avuç ileri patlamadır, daire hortumdur, iki el karmaşadır. Kameradan gelen görüntü hiçbir yere gitmez, her şey kendi cihazında hesaplanır.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Nesneler yalnızca küp değildir: kristal, üçgen, sekiz yüzlü, küre, piramit, prizma, yıldız, yirmi yüzlü, halka, dolar, euro, yuan. Kendi resmini ya da 15 saniyeye kadar kendi videonu koyabilirsin; dikey 9:16 olan ortadan kare olarak kırpılır.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Oyunda sekiz karakter var: kedi, komşu, köpek, robot, hayalet, panda, kurbağa ve uzaylı. Onları okşayabilir, gıdıklayabilir ve sarsabilirsin, sesle ve hareketle cevap verirler. Kendi hareketin bir düğmeyle eklenir: ad, komut, açıklama ve neyle yapılacağı — el, ayak, baş ya da tüm beden.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Görünüm, pencerelerin rengini ve saydamlığını değiştirir: Renk 1 başlıklar ve çubuklar, Renk 2 pencerenin kendisi, Renk 3 portföyün kapağı ve çerçevesi. Yazışma duvar kâğıtları aynı yerden seçilir, kendi resmini 9:16 koyabilirsin.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Sesle neredeyse her şey çalışır: bölümler, oyun, şekiller, karakterler, doksandan fazla komut. Yirmi dilin tamamındaki tam liste Sesli komutlar sayfasındadır: Görünüm\'den açılır ya da «sesli komutlar» denir. Sesli mi sessiz mi yanıt verileceği düğmesi de oradadır.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Belgeler hesap menüsünden açılır: Hesap menüsü → Belgeler. Yedi tane: kullanım koşulları, gizlilik politikası, topluluk kuralları, kazançlar ve sınırlar, swap ve ödemeler, abonelik ve anahtarlar, kamera ve mikrofon. Sesle de olur, «belgeler» de yeter.',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Davetler, davet edilen kişi aboneliği ödediğinde CUBE verir. Kendi bağlantın davetler bölümündedir.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Portföy, profilin vitrinidir: kapak, açıklama ve işler. Kapağın ve çerçevenin görünümü Renk 3 ile değişir.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'İstatistik, küplerine ve gönderilerine ne olduğunu gösterir: görüntülemeler, tepkiler, gelen insanlar.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'Profilde adını ve resmini gizleyebilirsin, yerlerine anonim bir numara gelir. Ama bu seni diğer insanlardan gizler, sunucudan değil: bir bağlantının IP adresini internetteki her site görür, bizimki de. Uygulamada IP\'yi gizleyen hiçbir şey yok.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Pazar yeri, insanlar arası ilan ve takastır.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Gönderiler, yorumlar, reklamlar, adlar ve açıklamalar denetimden geçer. Açıkça yasak olan yayımlanmaz, tartışmalı olan elle incelemeye gider. Bu denetim pazar yerine dokunmaz.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Merhaba. Platformun yardımcısıyım: küpler, kazançlar, cüzdan, oyun ve ayarlar hakkında cevap veririm, ayrıca küp, insan ve grup bulurum. Kelimelerle sor, örneğin «nasıl kazanırım», «Art küpünü bul», «@anna kim». Dünyanın geri kalanı için yanda NET sekmesi var.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE ve para',
  'Что такое CUBE?':
    'CUBE nedir?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE, platformun iç puanlarıdır. Sunucu onları günde bir kez etkinlik için yatırır. Swap içinde fiyat sabittir: 1 CUBE = $0.50. Bu bir menkul kıymet değildir ve gelir vaadi değildir.',
  'Как заработать?':
    'Nasıl kazanılır?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Sunucu hesaplar ve günü 24 saatte bir kapatır: çevrimiçi aktif gün, 10 bin görüntülemeden itibaren kendi gönderilerin ve yorumların, gönderilerinin altındaki tepkiler, aboneliği ödeyen davetliler, ve üst üste bir hafta, bir ay, bir yıl için ek ödemeler. Kesin oranlar Kazan bölümünde.',
  'Какие лимиты в сутки?':
    'Günlük sınırlar neler?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 yeni sohbet, 500 beğeni, 50 yorum, 500 takip. Görüntülemeler hiçbir şekilde şişirilemez. Sayım UTC günlerine göre gider; sınıra dayandıysan işlem sadece sayılmaz, bunun cezası yoktur.',
  'Что считается накруткой?':
    'Şişirme sayılan nedir?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Hesap yığınları, otomatik beğeni ve takipler, görüntüleme satın alma, karşılıklı tepki için anlaşma. Böyle elde edilen kazançlar geri alınır.',
  'Как работает свайп?':
    'Swap nasıl çalışır?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swap kriptoyu CUBE\'e ve geri çevirir: 16 para ve ağları. Kripto kuru istek anında alınır, CUBE $0.50 üzerinden sayılır. Alma ve gönderme bir ödeme sağlayıcısı üzerinden olur.',
  'Как пополнить кошелёк?':
    'Cüzdanı nasıl yüklerim?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Swap ile: bir istek oluşturursun, adres ve tutar alırsın, transferi kendi cüzdanından gönderirsin. Paranın ve ağın istekle aynı olması önemlidir, yoksa transfer geri alınamaz.',
  'Как вывести деньги?':
    'Parayı nasıl çekerim?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Çekim isteği senin adresine oluşturulur, ağ ücretini alan öder. Elle kontrol edip göndeririz, genelde bir iş günü içinde.',
  'Почему вывести можно не всё?':
    'Neden hepsini çekemiyorum?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Yalnızca kazanılan çekilir. Hediye ya da ikramiye olarak yatırılan CUBE platform içinde harcanır ama çekilmez; yoksa hediye dağıtıp paraya çevirmek yeterdi.',
  'Какие монеты поддерживаются?':
    'Hangi paralar destekleniyor?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 para ve ağları: BTC, ETH, USDT, USDC, BNB ve işlem hacmine göre ilk sıradakilerden on bir tane daha. Ağlarla birlikte tam liste swap penceresinde.',
  'Что если отправил не в ту сеть?':
    'Yanlış ağa gönderdiysem?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Blok zincirdeki transfer geri alınamaz. Hemen desteğe yaz: bazen yardım edilebilir, ama bu söz verilemez. Bu yüzden istekteki ağ ile cüzdandaki ağ aynı olmalı.',
  'Берёте ли вы ключи от бирж?':
    'Borsa anahtarı alıyor musunuz?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Hayır. Ne borsa anahtarı, ne tohum cümlesi, ne de cüzdan erişimi isteriz ve kabul ederiz. Biri platform adına bunu istiyorsa, o bir dolandırıcıdır.',
  'Платите ли вы налоги за меня?':
    'Vergilerimi siz mi ödüyorsunuz?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Hayır. Devlete ne borçlu olduğuna kendin karar verir ve kendin ödersin. Biz vergi sorumlusu değiliz.',
  'Ключи и подписка':
    'Anahtarlar ve abonelik',
  'Какие бывают ключи?':
    'Hangi anahtarlar var?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free temel, Silver geniş, Gold daha çok küp ve istatistik verir. Anahtar, Anahtar mağazasında CUBE ile yükseltilir.',
  'Что даёт Premium?':
    'Premium ne verir?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'Ayki katkına göre ödül havuzundan pay, gösterim için bağlanan dış cüzdanlar, istatistik ve sıralama, sinyallerde öncelik, profilde ve sohbette rozet, kapalı Premium küpler.',
  'Сколько стоит подписка?':
    'Abonelik ne kadar?',
  '$6.99 в месяц или $59.99 в год.':
    'Ayda $6.99 ya da yılda $59.99.',
  'Как отменить подписку?':
    'Aboneliği nasıl iptal ederim?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'İstediğin an: ödenmiş süreyi tamamlar ve uzamaz. Geçerli dönem için ödenen geri verilmez, iadeyi kanunun gerektirdiği durumlar dışında.',
  'Я потерял ключ: что делать?':
    'Anahtarımı kaybettim, ne yapmalıyım?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Geri getirilemez. Ne e-posta ne telefon soruyoruz, dolayısıyla hesabın senin olduğunu doğrulayacak bir şeyimiz yok. Anahtar hesabın kendisidir; kaybetmeyeceğin bir yerde sakla.',
  'Можно ли передать ключ другому?':
    'Anahtarımı başkasına verebilir miyim?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Verebilirsin, ama onunla yapılan her şey senin yapmış sayılır.',
  'Кубы и группы':
    'Küpler ve gruplar',
  'Что такое куб?':
    'Küp nedir?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Küp, platformun içindeki ayrı bir dünyadır: kendi adı, kapağı, sohbeti, akışı, özel odaları ve yaşam süresi. Küpler haritada görünür ve onlara katılınabilir.',
  'Как создать куб?':
    'Küp nasıl oluşturulur?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Dünyadaki «+» ile ya da Benim Evrenim\'de. Ad, kapak, tür ve yaşam süresi belirlersin. İnsanlar bağlantıyla ya da küpün anahtarıyla çağrılır.',
  'Что такое таймер жизни куба?':
    'Küpün yaşam sayacı nedir?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Küp verilen süre kadar yaşar ve sonra kapanır. Süre oluştururken seçilir, bir saatten bir yıla kadar.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Gruplar nedir?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Herkese açık topluluklar: ortak sohbet, olay akışı ve üye listesi.',
  'Как найти куб или человека?':
    'Bir küpü ya da kişiyi nasıl bulurum?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Buraya yaz: «Art küpünü bul», «@anna», «fotoğraf grubu». Platformda arar ve kartlar gösteririm: küpler, insanlar, gruplar ve şu anda süren yayınlar.',
  'Лента и посты':
    'Akış ve gönderiler',
  'Как выложить пост?':
    'Nasıl gönderi paylaşırım?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Akıştaki oluştur düğmesiyle. Video, resim, başlık ve açıklama olabilir.',
  'Почему пост не опубликовался?':
    'Gönderim neden yayımlanmadı?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Metin, yayından önceki denetimden geçmedi. Bildirim nedeni söyler: yasak mallar, dolandırıcılık, tehdit ve benzeri. Kurallar Belgeler\'de, yanlışlık varsa desteğe yaz.',
  'Что дают реакции?':
    'Tepkiler ne verir?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Bir gönderinin altındaki tepki, yazarına CUBE getirir. Günde 500 beğeniye kadar verilebilir.',
  'Как пожаловаться на пост?':
    'Bir gönderiyi nasıl bildiririm?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Her gönderinin ve her mesajın altında bir bildirme düğmesi var. Bildirim elle incelemeye gider.',
  'Сколько просмотров нужно для начисления?':
    'Kazanç için kaç görüntüleme gerekir?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    '10 bin gerçek gösterimden itibaren: kendi gönderilerin ve yorumların bu eşikten sonra CUBE getirmeye başlar.',
  'Игра с кубами':
    'Küp oyunu',
  'Как играть кубами?':
    'Küplerle nasıl oynanır?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Oyun düğmesi haritada. Küpler duvarların içinde uçar ve dışarı çıkamaz. Hareketler düğmeyle basılır, kamera önünde elle gösterilir ya da yüksek sesle söylenir.',
  'Что такое режимы и толчки?':
    'Kipler ve itmeler nedir?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'İtmeler patlama, atışlar, havaya atma, havai fişek ve karmaşadır: bir kez gider ve her şeyin üstünde çalışır. Kipler kaldırılana kadar durur ve toplanır: yer çekimi (düşürme YA DA ağırlıksızlık), mıknatıs, hortum, dondurma.',
  'Как работают жесты рукой?':
    'El hareketleri nasıl çalışır?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Yana savurma atıştır, yukarı havaya atmadır, aşağı düşürmedir, avuç ileri patlamadır, daire hortumdur, iki el karmaşadır. Kareler kendi cihazında işlenir ve hiçbir yere gitmez.',
  'Какие есть формы?':
    'Hangi şekiller var?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Küp, kristal, üçgen, sekiz yüzlü, küre, piramit, prizma, yıldız, yirmi yüzlü, halka, dolar, euro, yuan ve kendi resmin. Bir de «karışık», her nesnenin kendi şekli olur.',
  'Как поставить свою картинку?':
    'Kendi resmimi nasıl koyarım?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'Oyunda → Nesnenin şekli → «Benimki» karesi. En iyisi kare olanıdır; dikey 9:16 ortadan kırpılır. Değiştirmek için «Benimki»ye yeniden bas.',
  'Можно ли поставить видео?':
    'Video kullanılabilir mi?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Evet, 15 saniyeye kadar. Daha uzunu kabul edilmez. Video, sayfa yeniden yüklense de kalır.',
  'Кто такие персонажи?':
    'Karakterler kimler?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Sekiz karakter: kedi, komşu, köpek, robot, hayalet, panda, kurbağa, uzaylı. Onları okşayabilir, gıdıklayabilir ve sarsabilirsin, sesle ve hareketle cevap verirler.',
  'Как добавить своё действие?':
    'Kendi hareketimi nasıl eklerim?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Karakterler bölümündeki düğmeyle: ad, komut, açıklama ve neyle yapılacağı — el, ayak, baş ya da tüm beden. Hareketin kendisi on altı hazır etkiden seçilir.',
  'Как крутятся предметы?':
    'Nesneler nasıl döner?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Beş kip: eksen yönünde, eksene karşı, üstten, alttan ve rastgele. Atıştan gelen dönüş, seçilen kipin üstüne eklenir.',
  'Как начать эфир?':
    'Yayına nasıl başlarım?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Akıştaki Yayın düğmesi ya da «yayın» sesli komutu. Başlık ve kip seçersin ve yayındasın. İzleyiciler görüntüyü doğrudan senden alır.',
  'Какие режимы эфира?':
    'Hangi yayın kipleri var?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera ve küpler: sahne kamera görüntüsünün üstünde, el hareketleri çalışır. Yalnızca küpler: kamerasız sahne. Temiz yayın: yalnızca kamera, yorum, tepki ve hediye olmadan.',
  'Сколько зрителей выдержит эфир?':
    'Bir yayın kaç izleyici taşır?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Görüntü doğrudan yayıncıdan her izleyiciye gider, yani yayıncının bağlantısına bağlıdır: ev hattında on on beş kişi rahat izler. Daha büyük salon için aktarıcı sunucu gerekir.',
  'Что такое подарки?':
    'Hediyeler nedir?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Otuz hediye, 1 CUBE\'lük Gül\'den 1000\'lik Efsane Küp\'e kadar. Hediye, CUBE\'ün yayıncıya tamamen aktarılmasıdır; platform pay almaz.',
  'Как закончить эфир?':
    'Yayını nasıl bitiririm?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Pencere başlığındaki Yayını bitir düğmesi, her kipte görünür. Pencereyi çarpıyla kapatmak yayını durdurmaz: Bitir\'e basana kadar sürer.',
  'Голос и языки':
    'Ses ve diller',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Hangi sesli komutlar var?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Doksandan fazla: bölümler, pencereler, oluşturma, akış, oyun, şekiller, karakterler, denetim. Aramalı tam liste Sesli komutlar sayfasında: hesap menüsü → Sesli komutlar, ya da Görünüm\'de, ya da sadece «sesli komutlar» de.',
  'На каких языках работает голос?':
    'Ses hangi dillerde çalışır?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'Yirmi dilde: Rusça, İngilizce (Hindistan\'ınki de), Ukraynaca, Almanca, Fransızca (Kanada\'nınki de), İspanyolca (Latin Amerika\'nınki de), İtalyanca, Portekizce, Lehçe, Türkçe, Arapça (Körfez\'inki de), Vietnamca, Çince, Japonca, Korece, Hintçe. Dil, komutlar sayfasında ve Görünüm\'de seçilir.',
  'Как включить микрофон?':
    'Mikrofonu nasıl açarım?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Mikrofon düğmesi üst çubukta. Basınca dinler, yeniden basınca durur.',
  'Как выключить озвучку?':
    'Sesli yanıtları nasıl kapatırım?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Sesli komutlar sayfasında, yüksek sesle yanıtlamakla sessiz yanıtlamak arasında bir düğme var. Ses her türlü dinler; yalnızca yanıt değişir.',
  'Куда уходит мой голос?':
    'Sesim nereye gidiyor?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Tanımayı tarayıcının kendisi yapar. Chrome ve ona dayalı tarayıcılar sesi Google\'ın sunucularına gönderir; onların tanıması böyle kurulmuştur ve platformun burada bir kararı yoktur. Bu sana uymuyorsa mikrofonu açma: her şey düğme olarak da var.',
  'Как поменять тему?':
    'Temayı nasıl değiştiririm?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Görünüm → Tema: koyu, açık ya da kameranın görüntüsünün arka plan olduğu Kamera.',
  'Что такое Цвет 1, 2 и 3?':
    'Renk 1, 2 ve 3 nedir?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Renk 1 başlıklar, yazma çubukları ve sekmelerdir. Renk 2 pencerenin kendisidir: sohbetin arka planı ve yorum listesi. Renk 3 portföyün kapağı ve çerçevesidir. Her birinin kendi saydamlık sürgüsü var.',
  'Как поставить обои?':
    'Duvar kâğıdını nasıl koyarım?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Görünüm → Duvar kâğıdı: hazır bir takım ya da 9:16 kendi resmin. Renk 2 duvar kâğıdının üstüne bir ton gibi yatar, sürgü de ne kadar güçlü olacağını belirler.',
  'Правила и безопасность':
    'Kurallar ve güvenlik',
  'Что нельзя выкладывать?':
    'Ne yayımlanamaz?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Çocuklarla ilgili içerik, tehdit ve şiddet çağrısı, nefret körükleme, dolandırıcılık, yasak mallar, hakkı olmadan başkasının işi, başkası gibi davranma, spam ve sahte etkinlik. Tamamı Topluluk kurallarında.',
  'Как работает модерация?':
    'Denetim nasıl çalışır?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Gönderiler, yorumlar, grup mesajları, adlar ve açıklamalar yayımdan önce sunucuda denetlenir. Açıkça yasak olan yayımlanmaz, tartışmalı olan bir insana gider. Pazar yeri ve özel yazışmalar denetlenmez.',
  'Виден ли мой IP?':
    'IP\'m görünüyor mu?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Evet, sunucu onu görür, internetteki her site gibi: IP olmadan yanıtı nereye göndereceğini bilemezdi. Gizli kip adını ve resmini diğer insanlardan gizler, sunucudan değil.',
  'Что вы храните обо мне?':
    'Hakkımda ne saklıyorsunuz?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Hesap anahtarını, kendi doldurduğun profili, içeriğini, günlük sayaçları ve bağlantının teknik verilerini. Ne e-posta, ne telefon, ne parola, ne cüzdan anahtarı.',
  'Куда жаловаться?':
    'Nereye şikâyet ederim?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Bir içerik için altındaki bildirme düğmesiyle. Diğer her şey için platform içindeki destek üzerinden.',
  'Где документы?':
    'Belgeler nerede?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Hesap menüsü → Belgeler. Yedi tane: koşullar, gizlilik politikası, topluluk kuralları, kazançlar ve sınırlar, swap ve ödemeler, abonelik ve anahtarlar, kamera ve mikrofon.',
  'Что такое карта?':
    'Harita nedir?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Platformun haritası: gerçek koordinatlarıyla 177 ülke ve 1150 şehir, şu anki saate göre hesaplanan güneş konumu, gece yarısı ve şafak tam gökyüzünde oldukları yerde. Yirmi görünüm: uzaydan, geceleyin Dünya, gece ve gündüz, OpenStreetMap sokakları, hava, depremler, saat dilimleri, bizim küplerimiz ve yayınlar. Hesap menüsünden ya da «harita» sözüyle açılır.',
  'Как проложить маршрут на карте?':
    'Haritada nasıl rota çizerim?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Haritada başlangıca, sonra bitişe dokun ve yirmi yoldan birini seç. Büyük daire ve loksodrom, gerçekten uçulup yelken açılan yollar. Yalnızca karadan ve yalnızca sudan, kıtalar boyunca öbür unsura tek adım atmayan gerçek bir yol arayışı. Gölgeden ve ışıktan, gece tarafını izleyerek. Küplerin, yayınların ve insanların yanından, bizim iğnelerimizden. Sokak rotasını dış motor OSRM hesaplar; yanıt vermezse bunu söyleriz.',
  'Видно ли меня на карте?':
    'Haritada görünüyor muyum?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Yalnızca «buradayım» iğnesini kendin koyduysan. Yarım saat yaşar ve kendini siler, koordinatlar sunucuya gönderilmeden önce bir kilometreye yuvarlanır, «beni haritadan kaldır» ise kaydı gizlemek yerine siler. O iğne olmadan haritada hiç yoksun.',
  'Есть ли на карте спутник и пробки?':
    'Haritada uydu görüntüsü ve trafik var mı?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Yok. Uydu görüntüsünü ve trafiği anahtarla çalışan ücretli sağlayıcılar verir. Bu katmanların yeri hazır: anahtar konur ve açılırlar. Anahtar yokken harita bunu açıkça söyler, güzel bir yalan çizmez.',
  'Что такое забег по улице?':
    'Sokak koşusu nedir?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Haritanın içine bir sıçrama: birinci şahıs görünümü, kendi sokağının gerçek binaları ve dönüşleri. Kendin koşarsın: şerit değiştirmek için yana kaydır, kavşakta dönmek için yine yana, zıplamak için yukarı, kaymak için aşağı. Küp toplar, bariyerlerden ve ışınlardan kaçarsın. Yol boyunca başkalarının yayınlarına, küplerine ve vitrinlerine rastlarsın. Oyun çubuğuyla sakin bir yürüyüş de var. Hesap menüsünden, haritadan Sokağa düğmesiyle ya da «koşu» sözüyle açılır.',
  'Откуда берутся дома в забеге?':
    'Koşudaki binalar nereden geliyor?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'OpenStreetMap\'ten: gerçek bina hatları ve kat sayıları, gerçek yollar, genişlikleri ve dönüşleriyle. Bir katı üç metre sayarız; kat sayısı yoksa yükseklik binanın tabanından alınır. Sokak fotoğrafı yok, onları ücretli sağlayıcılar verir. Harita sunucusu meşgulse oyun bunu dürüstçe söyler ve kendi mahallemizi kurar.',
  'Что такое шопинг в маркетплейсе?':
    'Pazar yerindeki alışveriş nedir?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Pazar yerinin ikinci bölümü, dosya yerine eşya için: giyimden sanata on altı kategori, markası, bedenleri, renkleri, özellikleri ve yirmiye kadar fotoğrafı olan bir kart. Her kartta marka adı yazılı dönen bir şekil var, yirmi şekilden herhangi biri. Bölüm paraya dokunmaz: ödeme ve teslimat insanlar arasındadır, bu yüzden «satıcıya yaz» der, «CUBE ile satın al» demez.',
  'Игры, чаты и новое':
    'Oyunlar, sohbetler ve yenilikler',
  'Сколько игр в зале?':
    'Salonda kaç oyun var?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Sekiz ve hepsi oynanabilir: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Parmakla ve klavyeyle oynanır.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Oyunlar CUBE veriyor mu?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Hayır. Oyunlar puan ve kişisel rekor verir, bunlar tarayıcında saklanır. CUBE\'ü sunucu görüntülemeler için ve ortak havuzdan yatırır; tarayıcıda para basmak yalan olurdu.',
  'Как играть в DataMine?':
    'DataMine nasıl oynanır?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Sekize sekiz bir alan. Bir kareye dokunup veriyi kazarsın; sayı yanında kaç virüs olduğunu gösterir. Uzun basış bayrak koyar. Üç can, sonra yeni katman.',
  'Как играть в CipherBreak?':
    'CipherBreak nasıl oynanır?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Dört simgelik bir kodu bul. Denemeden sonra dolu daire simgenin doğru yerde olduğunu, boş daire kodda olduğunu ama başka yerde olduğunu gösterir. Sekiz deneme.',
  'Как играть в Phantom Escape?':
    'Phantom Escape nasıl oynanır?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Beş anahtar topla ve kapıdan çık. Hayaletler seni en kısa yoldan izler, her katta sayıları artar.',
  'Как играть в Block Trade?':
    'Block Trade nasıl oynanır?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Bir buçuk dakika, elinde 1000. Ucuza al, pahalıya sat. Puanın bini aşan her şeydir.',
  'Как играть в TrustChain?':
    'TrustChain nasıl oynanır?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Saat işlerken bloklara artan sırayla dokun. Bir hata ve zincir kopar. Her turda zincir uzar.',
  'Как играть в CubeBuilder?':
    'CubeBuilder nasıl oynanır?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Plaka yana gider, bir dokunuş onu bırakır. Taşan kısım düşer ve plaka daralır. Kuleyi ıskalarsan biter.',
  'Что показывает строка курсов?':
    'Fiyat şeridi ne gösterir?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Otuz para, fiyatı ve günlük değişimiyle. Veriler yarım dakika önbellek tutan sunucumuz üzerinden gelir. Şerit sürünmez: ekrana tam sayıda hücre sığar ve birkaç saniyede bir değişirler.',
  'Что значит число кубов в шапке?':
    'Başlıktaki küp sayısı ne demek?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Şu anda senin dünyanda kaç küp olduğu, önünde gördüklerin. Platformdaki toplam küp sayısı değil.',
  'Можно ли войти вторым аккаунтом?':
    'İkinci hesapla girebilir miyim?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Evet. Hesap menüsü → Hesap ekle: şu anki anahtar listede kalır ve aynı menüden tek dokunuşla ona dönersin. Sekize kadar hatırlanır.',
  'Зачем «Сохранить» в окне игры?':
    'Oyun penceresindeki Kaydet ne işe yarar?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Nesnenin şeklini, karakteri, el hareketlerini ve boyutu hatırlar. Bir dahaki girişinde her şey bıraktığın yerde olur.',
  'Чем режим отличается от толчка?':
    'Kip ile itme arasındaki fark ne?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Kip, ikinci dokunuşla kapatana kadar durur ve yanık kalır. İtme bir kez gider ve yanmaz; yalnızca en son basılan olduğunu söyleyen ince bir iz bırakır.',
  'Почему кубы больше не исчезают?':
    'Küpler neden artık kaybolmuyor?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Vitrindeki örnek küpler az yaşıyordu, beş ve on beş dakika. Artık en az yarım gün alıyorlar ve bitmeden yeniden başlatılıyorlar. Gerçek küpler, oluşturulurken verilen süre kadar yaşar.',
  'Как сделать фото прямо в чат?':
    'Doğrudan yazışmaya nasıl fotoğraf çekerim?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Ataç → Kamera kendi çekimimizi açar. Bir dokunuş fotoğraf çeker, uzun basış bir dakikaya kadar video kaydeder. Galeri yandaki seçenektir, Fotoğraf ya da video.',
  'Что такое галерея переписки?':
    'Yazışma galerisi nedir?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Yazışma başlığındaki büyüteç aramayı ve üstünde bir rafı açar: o yazışmadaki fotoğraflar, videolar, sesler ve bağlantılar. Mesajların kendisinden toplanır ve hiçbir yere gitmez.',
  'Как удалить сразу несколько сообщений?':
    'Birkaç mesajı birden nasıl silerim?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Bir mesaja uzun basmak seçimi açar, sonra istediklerini işaretler ve alt çubuktaki Sil\'e basarsın. Bir seferde yüze kadar.',
  'Можно ли изменить своё сообщение?':
    'Kendi mesajımı düzenleyebilir miyim?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Evet, kendi mesajlarını ve yalnızca metin olanları: mesaj menüsü → Düzenle. Yanında «düzenlendi» işareti çıkar. Yazışma bu sırada kapanmaz.',
  'Что такое сторис?':
    'Hikâyeler nedir?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Bir gün süren kısa gönderiler, sohbet listesinin üstünde: bir fotoğraf ya da bir dakikaya kadar video. Arka arkaya izlenir ve bir gün sonra kendiliğinden kaybolur.',
  'Сколько фото можно в группу?':
    'Bir gruba kaç fotoğraf sığar?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Yediye kadar fotoğraf ya da bir dakikaya kadar bir video. Ayrıca takımdan bir simge ve açıklamanın altında etiketler.',
  'Что такое теги группы?':
    'Grup etiketleri nedir?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Virgülle ayrılmış birkaç kelime; grup aramada bunlarla bulunur.',
  'Видно ли участников группы?':
    'Grup üyeleri görünür mü?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Buna sahibi oluştururken karar verir: üye listesi herkese gösterilebilir ya da yalnızca sahibine görünür kalabilir.',
  'Почему поле ссылки на видео убрали?':
    'Video bağlantısı alanı neden kaldırıldı?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Başkasının bağlantısı öbür uçta silindiğinde bozuluyordu ve platform bundan sorumlu olamazdı. Video, dosya olarak kendi deponuza yüklenir.',
  'Сколько длится видео в посте?':
    'Bir gönderideki video ne kadar uzun olabilir?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Şimdilik 50 MB\'a kadar bir dosya. Daha büyük bir sunucuda basamaklar olacak: 15 saniye, bir dakika, üç dakika ve on beş.',
  'Что делает кнопка «Чаевые автору»?':
    'Yazara bahşiş düğmesi ne yapar?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Bakiyenden CUBE\'ü gönderinin yazarına tamamen aktarır, platforma pay kalmaz. Tutar 1, 5, 10, 25 ya da kendi belirlediğin.',
  'Как пожаловаться на видео?':
    'Bir videoyu nasıl bildiririm?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Videonun altındaki üç nokta → Bildir: bir neden seçer ve kendi sözlerini ekleyebilirsin. Bir insana gider.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Bir gönderiyi nasıl paylaşırım?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Videonun altındaki üç nokta → Paylaş. İstediğine gönderebileceğin bir bağlantı alırsın.',
  'Куда девается «Сохранить»?':
    'Kaydet nereye koyar?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Profiline, kaydedilenler rafına, profil sekmelerinin altındaki yer imi simgesinin altına.',
  'Что видно в моём профиле?':
    'Profilimde ne görünür?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'İki sekme: kısa videoların için Shorts, geri kalan her şey için Gönderiler. Bir karta dokununca akıştaki gibi açılır. Düzenle ve sil yalnızca yazara görünür.',
  'Как изменить профиль?':
    'Profilimi nasıl düzenlerim?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Kendi profilindeki kalem düğmesi: ad, @kullanıcı adı, açıklama, hesap türü, durum, bağlantılar ve adres.',
  'Чем бизнес-аккаунт отличается?':
    'İşletme hesabının farkı ne?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Herkese açık, seni herkesin gördüğü anlamına gelir. Gizli, adının ve resminin diğer insanlardan gizlendiği anlamına gelir. İşletme ise işinin açıklamasını, bağlantıları ve bir adresi ekler.',
  'Что показывает «онлайн» в шапке?':
    'Başlıktaki «çevrimiçi» ne gösterir?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Sunucuya göre şu anda platformda kaç kişi olduğunu. Her yarım dakikada yenilenir.',
  'Закрывается ли игра вместе с эфиром?':
    'Oyun yayınla birlikte kapanır mı?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Evet. Yayında küpler varsa, yayın bitince oyun kendiliğinden kapanır; yoksa nesneler boş bir haritanın üstünde uçmaya devam ederdi.',
  'Есть ли смайлы в эфире?':
    'Yayında emoji var mı?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Var, yazma çubuğunun yanındaki emoji düğmesinde ortak koleksiyonun tamamı var, yazışmalardakiyle aynı.',
  'Что такое «Все вопросы»?':
    'Tüm sorular nedir?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Yardımcının tam el kitabı: bölümlere ayrılmış, başlığa göre aranabilen yüzden fazla soru ve cevap.',
  'Куда делась кнопка NET?':
    'NET düğmesi nereye gitti?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Kaldırıldı. Platform büyük internette arama yapmıyor, düğme ise yaptığını vaat ediyordu. Yardımcı platform hakkında cevap verir ve küp, insan, grup ve yayın bulur.',
  'Почему звук повторялся дважды?':
    'Ses neden iki kez tekrarlanıyordu?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'İki ayrı kod parçası konuşuyordu ve hiçbiri diğerini kesmiyordu. Artık her cümle bir öncekini iptal eder ve aynı metin üst üste iki kez tekrarlanmaz.',
  'Как выключить голос совсем?':
    'Sesi tamamen nasıl kapatırım?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Sesli komutlar sayfasında, yüksek sesle yanıtlamakla sessiz yanıtlamak arasında bir düğme var. Artık gerçekten kapatıyor: önce yalnızca tek bir girişi yönetiyordu ve ses onu dolanıyordu.',
  'Что хранится только в моём браузере?':
    'Yalnızca tarayıcımda ne saklanır?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Oyun rekorları, küp oyununun ayarları, seçilen dil, tema ve duvar kâğıdı, ve kendi hesaplarının listesi. Bunların hiçbiri sunucuya gitmez.',
  'Почему просят подтвердить удаление?':
    'Neden silmeyi onaylamam isteniyor?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Çünkü geri alınamaz. Yazışmalarda ayrıca hangi kopyanın kaldırılacağı sorulur, yalnızca seninki mi yoksa herkesinki mi.',
  'Что такое «У всех» при удалении?':
    'Silerken «Herkes için» ne demek?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Benim için» mesajı kendi ekranından gizler. «Herkes için» sunucudan onu karşı taraftan da kaldırmasını ister.',
  'Сколько живёт сообщение с таймером?':
    'Süreli mesaj ne kadar yaşar?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Seçtiğin kadar: beş dakika, bir saat, bir gün, bir hafta ya da sonsuza dek. Yazma çubuğunun yanındaki ∞ düğmesi.',
  'Как переслать сообщение?':
    'Bir mesajı nasıl iletirim?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Mesaj menüsü → İlet. Kime olduğunu seçersin.',
  'Что делает «В избранное»?':
    'Sık kullanılanlara kaydet ne yapar?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Mesajı Kaydedilenler\'e koyar, notlarının ve sakladıklarının bulunduğu kendi defterine.',
  'Как найти сообщение в переписке?':
    'Yazışmada bir mesajı nasıl bulurum?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Yazışma başlığındaki büyüteç: metinde arar ve oklar eşleşmeler arasında atlar. Fotoğraf, video, ses ve bağlantı rafı da aynı yerdedir.',
  'Что такое «Пригласить в группу»?':
    'Gruba davet et nedir?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Grup bilgisindeki bir bağlantı: onu açan gruba katılır.',
  'Можно ли выйти из группы?':
    'Bir gruptan çıkabilir miyim?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Evet, grup bilgisindeki bir düğmeyle. Sahibi çıkarsa grup silinmez.',
  'Сколько форм у предметов?':
    'Nesnelerin kaç şekli var?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Yirmi, üstlerine kendi resmin ya da videon, bir de karışık kip.',
  'Что такое шопинг?':
    'Alışveriş nedir?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Pazar yerinin eşya için olan ikinci bölümü: on altı kategori, markası ve yirmiye kadar fotoğrafı olan bir kart, ve marka adıyla dönen bir şekil. Ödeme ve teslimat insanlar arasındadır.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Kelimelerle sor: örneğin «nasıl kazanırım» ya da «Art küpünü bul».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Ne arayayım? «Art küpünü bul» ya da «@anna» gibi bir şey yaz.',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    '«{что}» hakkında bir cevabım yok. Bildiğim şey platform: CUBE ve kazançlar, sınırlar, swap, cüzdan, anahtarlar, sinyaller, küpler ve gruplar, küp oyunu, yayınlar, görünüm ve sesli komutlar.'

});
