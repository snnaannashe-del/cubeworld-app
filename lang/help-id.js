/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-id.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('id', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Postingan, video, dan klip bulat. Komentar dan reaksi juga terbuka dari sini.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Obrolan pribadi, pesan suara dan video bulat, yang tersimpan.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Komunitas terbuka: obrolan bersama, arus peristiwa, anggota.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Sinyal dagang: arah, masuk, target, dan stop. Harganya dijaga sendiri oleh server.',
  'Объявления и обмен между людьми.':
    'Iklan dan tukar-menukar antarorang.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Tarif imbalan, swap, dan semua yang mendatangkan CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Saldo CUBE kamu, pengisian, penarikan, dan riwayat.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Apa yang terjadi pada kubus dan postinganmu, dalam angka.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE adalah mata uang internal platform. Server memberikannya sekali sehari untuk keaktifan: hari aktif, postingan dan komentarmu sendiri, orang yang kamu undang. Di dalam swap harga CUBE tetap: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Server menutup perhitungan imbalan sekali sehari. Yang dihitung: hari aktif daring, postingan dan komentarmu mulai dari 10 ribu tayangan, undangan yang membayar langganan, serta tambahan untuk seminggu, sebulan, dan setahun berturut-turut. Tarif pastinya selalu terbaru di bagian Dapatkan.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Agar tak ada yang bisa digelembungkan dengan curang, server menjaga batas harian: 20 obrolan baru, 500 suka, 50 komentar, 500 ikutan. Tayangan sama sekali tak bisa digelembungkan, hanya dihitung dari tampilan nyata. Berapa sisa hari ini terlihat di Dapatkan.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swap menukar kripto menjadi CUBE dan sebaliknya: 16 koin beserta jaringannya, kursnya diambil saat permintaan dibuat, CUBE dihitung $0.50. Pemasukan dan penarikan lewat penyedia pembayaran; kunci bursa atau dompet milik siapa pun tidak kami ambil dan tidak kami simpan. Yang bisa ditarik hanya yang dihasilkan, bukan yang diberikan sebagai hadiah.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Dompet menampilkan saldo CUBE, riwayat, serta tombol isi dan tarik. Mengisi dan menarik dilakukan lewat swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Kunci membuka kemungkinan: Free dasar, Silver lebih luas, Gold memberi lebih banyak kubus dan statistik. Kunci dibeli dengan CUBE. Langganan Premium memberi bagian dari dana imbalan sesuai sumbanganmu dalam sebulan.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Sinyal adalah arah, titik masuk, target, dan stop. Server menjaga harga sendiri dan menutup sinyal di target atau di stop. Kunci bursa tidak kami minta: kamu berdagang sendiri, di tempatmu.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Reaksi di bawah postingan mendatangkan CUBE bagi penulisnya. Sehari bisa memberi sampai 500 suka, lebih dari itu server tidak menghitungnya.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Kubus adalah ruangmu sendiri: obrolan, arus, kamar tertutup, dan penghitung umur. Dibuat dengan «+» di dunia. Orang diundang lewat tautan atau lewat kunci kubus.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Kubus adalah dunia tersendiri di dalam platform: punya nama, sampul, obrolan, arus, dan masa hidup. Kubus terlihat di peta, bisa dikelilingi dan bisa dimasuki.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Grup adalah komunitas terbuka: obrolan bersama, arus peristiwa, dan daftar anggota. Grupmu sendiri bisa dibuat di bagian Grup.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Permainan kubus dibuka dengan tombol di peta. Tindakannya terbagi jadi dorongan (ledakan, lemparan, lempar ke atas, kembang api, kekacauan) dan mode (jatuhkan atau tanpa bobot, pilih satu, magnet, pusaran, beku). Mode bertumpuk dan bertahan sampai dimatikan. Semua itu bekerja lewat tombol, lewat gerakan tangan di depan kamera, dan lewat suara.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'Dalam permainan bisa dinyalakan gerakan tangan: ayunan ke samping itu lemparan, ke atas melempar tinggi, ke bawah menjatuhkan, telapak ke depan ledakan, lingkaran pusaran, dua tangan kekacauan. Gambar dari kamera tidak pergi ke mana pun, semuanya dihitung di perangkatmu sendiri.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Bendanya bukan hanya kubus: kristal, segitiga, oktahedron, bola, piramida, prisma, bintang, ikosahedron, cincin, dolar, euro, yuan. Kamu bisa memasang gambarmu atau videomu sendiri sampai 15 detik; yang tegak 9:16 dipotong dari tengah menjadi persegi.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Dalam permainan ada delapan karakter: kucing, tetangga, anjing, robot, hantu, panda, katak, dan alien. Mereka bisa diusap, digelitik, dan digoyang, dan mereka menjawab dengan suara dan gerak. Tindakanmu sendiri ditambahkan lewat tombol: nama, perintah, keterangan, dan dengan apa dilakukan — tangan, kaki, kepala, atau seluruh tubuh.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Tampilan mengubah warna dan tembus pandang jendela: Warna 1 untuk judul dan bilah, Warna 2 untuk jendelanya sendiri, Warna 3 untuk sampul dan bingkai profil. Latar obrolan juga dipilih di tempat yang sama, punyamu sendiri boleh dalam 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Dengan suara hampir semuanya bisa: bagian-bagian, permainan, bentuk, karakter, lebih dari sembilan puluh perintah. Daftar lengkap dalam kedua puluh bahasa ada di halaman Perintah suara: dibuka dari Tampilan atau dengan mengucapkan «perintah suara». Sakelar menjawab bersuara atau diam juga ada di sana.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Dokumen dibuka dari menu akun → Dokumen. Ada tujuh: syarat penggunaan, kebijakan privasi, aturan komunitas, imbalan dan batas, swap dan pembayaran, langganan dan kunci, kamera dan mikrofon. Lewat suara juga bisa, ucapkan «dokumen».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Undangan memberi CUBE ketika orang yang diundang membayar langganan. Tautanmu sendiri ada di bagian undangan.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Profil adalah etalase dirimu: sampul, keterangan, dan karya. Rupa sampul dan bingkainya diubah dengan Warna 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Statistik menunjukkan apa yang terjadi pada kubus dan postinganmu: tayangan, reaksi, orang yang berdatangan.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'Di profil kamu bisa menyembunyikan nama dan foto, sebagai gantinya muncul nomor tanpa nama. Tapi itu menyembunyikanmu dari orang lain, bukan dari server: alamat IP sebuah sambungan dilihat oleh situs mana pun di internet, termasuk punya kami. Tidak ada apa pun di aplikasi yang menyembunyikan IP.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Pasar adalah iklan dan tukar-menukar antarorang.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Postingan, komentar, iklan, nama, dan keterangan melewati pemeriksaan. Yang jelas-jelas terlarang tidak diterbitkan, yang meragukan diserahkan kepada manusia. Pemeriksaan ini tidak menyentuh pasar.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Halo. Aku asisten platform: aku menjawab tentang kubus, imbalan, dompet, permainan, dan pengaturan, dan aku juga mencari kubus, orang, dan grup. Tanyakan dengan kata-kata, misalnya «bagaimana mendapatkan», «cari kubus Art», «siapa @anna». Soal dunia selebihnya, ada tab NET di sebelah.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE dan uang',
  'Что такое CUBE?':
    'Apa itu CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE adalah poin internal platform. Server memberikannya sekali sehari untuk keaktifan. Di dalam swap harganya tetap: 1 CUBE = $0.50. Ini bukan surat berharga dan bukan janji penghasilan.',
  'Как заработать?':
    'Bagaimana cara mendapatkan?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Yang menghitung adalah server, dan ia menutup hari sekali tiap 24 jam: hari aktif daring, postingan dan komentarmu mulai dari 10 ribu tayangan, reaksi di bawah postinganmu, undangan yang membayar langganan, serta tambahan untuk seminggu, sebulan, dan setahun berturut-turut. Tarif pastinya ada di Dapatkan.',
  'Какие лимиты в сутки?':
    'Berapa batas hariannya?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 obrolan baru, 500 suka, 50 komentar, 500 ikutan. Tayangan sama sekali tak bisa digelembungkan. Hitungannya per hari UTC; kalau batasnya tercapai, tindakan itu sekadar tidak dihitung, dan tidak ada hukuman.',
  'Что считается накруткой?':
    'Apa yang dianggap kecurangan?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Akun berkelompok, suka dan ikutan otomatis, membeli tayangan, bersepakat saling memberi reaksi. Imbalan yang diperoleh begitu ditarik kembali.',
  'Как работает свайп?':
    'Bagaimana swap bekerja?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swap menukar kripto menjadi CUBE dan sebaliknya: 16 koin beserta jaringannya. Kurs kripto diambil saat permintaan dibuat, CUBE dihitung $0.50. Menerima dan mengirim lewat penyedia pembayaran.',
  'Как пополнить кошелёк?':
    'Bagaimana mengisi dompet?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Lewat swap: kamu membuat permintaan, menerima alamat dan jumlah, lalu mengirim dari dompetmu sendiri. Penting bahwa koin dan jaringannya sesuai dengan permintaan, kalau tidak kiriman itu tak bisa dikembalikan.',
  'Как вывести деньги?':
    'Bagaimana menarik uang?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Permintaan penarikan dibuat ke alamatmu, biaya jaringan dibayar oleh penerima. Kami periksa dan kirim dengan tangan, biasanya dalam satu hari kerja.',
  'Почему вывести можно не всё?':
    'Kenapa tidak semuanya bisa ditarik?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Yang ditarik hanya yang dihasilkan. CUBE yang diberikan sebagai hadiah atau bonus bisa dibelanjakan di dalam platform tapi tidak bisa ditarik; kalau tidak, cukup bagi-bagi hadiah lalu mencairkannya.',
  'Какие монеты поддерживаются?':
    'Koin apa saja yang didukung?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 koin beserta jaringannya: BTC, ETH, USDT, USDC, BNB, dan sebelas lagi dari jajaran teratas menurut perputaran. Daftar lengkap beserta jaringannya ada di jendela swap.',
  'Что если отправил не в ту сеть?':
    'Bagaimana kalau aku mengirim ke jaringan yang salah?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Kiriman di rantai blok tak bisa dibatalkan. Tulislah ke dukungan segera: kadang bisa dibantu, tapi itu tak bisa dijanjikan. Karena itu jaringan di permintaan dan di dompet harus sama.',
  'Берёте ли вы ключи от бирж?':
    'Apakah kalian menerima kunci bursa?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Tidak. Kunci bursa, frasa pemulihan, maupun akses ke dompetmu, tidak kami minta dan tidak kami terima. Kalau ada yang meminta itu atas nama platform, dia penipu.',
  'Платите ли вы налоги за меня?':
    'Apakah kalian membayar pajakku?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Tidak. Apa yang kamu utang kepada negara, kamu sendiri yang menentukan dan membayar. Kami bukan agen pajak.',
  'Ключи и подписка':
    'Kunci dan langganan',
  'Какие бывают ключи?':
    'Kunci apa saja yang ada?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free dasar, Silver lebih luas, Gold memberi lebih banyak kubus dan statistik. Kunci dinaikkan dengan CUBE di Toko kunci.',
  'Что даёт Premium?':
    'Apa yang diberikan Premium?',
  'Долю в фонде наград, эфиры, свои сигналы, аналитику куба, создание файлов, продажу на маркетплейсе, чаевые и подарки, больше кубов и больше места под файлы. Полный список — в «Документах».':
    'Bagian dana hadiah, siaran langsung, sinyal sendiri, analitik kubus, membuat berkas, jualan di pasar, tip dan hadiah, lebih banyak kubus dan lebih banyak tempat. Daftar lengkapnya ada di «Dokumen».',
  'Сколько стоит подписка?':
    'Berapa harga langganannya?',
  'Сильвер — 14 CUBE в месяц или 120 CUBE за год. Голд — 30 CUBE в месяц или 252 CUBE за год. Точные цифры всегда в окне подписки.':
    'Perak 14 CUBE sebulan atau 120 CUBE setahun. Emas 30 CUBE sebulan atau 252 CUBE setahun. Angka pastinya selalu ada di jendela langganan.',
  'Как отменить подписку?':
    'Bagaimana membatalkan langganan?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Kapan saja: ia menghabiskan masa yang sudah dibayar lalu tidak diperpanjang. Yang sudah dibayar untuk masa berjalan tidak dikembalikan, kecuali bila hukum mewajibkan pengembalian.',
  'Я потерял ключ: что делать?':
    'Aku kehilangan kunciku, bagaimana?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Tidak bisa dipulihkan. Kami tidak menanyakan surel maupun nomor telepon, jadi tidak ada cara untuk memastikan akun itu milikmu. Kunci itulah akunnya; simpan di tempat yang tidak akan hilang.',
  'Можно ли передать ключ другому?':
    'Boleh memberikan kunciku kepada orang lain?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Boleh, tapi semua yang dilakukan dengannya dianggap kamu yang melakukan.',
  'Кубы и группы':
    'Kubus dan grup',
  'Что такое куб?':
    'Apa itu kubus?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Kubus adalah dunia tersendiri di dalam platform: punya nama, sampul, obrolan, arus, kamar tertutup, dan masa hidup. Kubus terlihat di peta dan bisa dimasuki.',
  'Как создать куб?':
    'Bagaimana membuat kubus?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Lewat «+» di dunia atau di Alam semestaku. Kamu menentukan nama, sampul, jenis, dan masa hidup. Orang diundang lewat tautan atau lewat kunci kubus.',
  'Что такое таймер жизни куба?':
    'Apa itu penghitung umur kubus?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Kubus hidup selama waktu yang ditentukan lalu tertutup. Jangkanya dipilih saat dibuat, dari satu jam sampai satu tahun.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Apa itu grup?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Komunitas terbuka: obrolan bersama, arus peristiwa, dan daftar anggota.',
  'Как найти куб или человека?':
    'Bagaimana mencari kubus atau orang?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Tulis saja di sini: «cari kubus Art», «@anna», «grup foto». Aku akan mencari di platform dan menampilkan kartu: kubus, orang, grup, dan siaran yang sedang berlangsung sekarang.',
  'Лента и посты':
    'Arus dan postingan',
  'Как выложить пост?':
    'Bagaimana menerbitkan postingan?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Dengan tombol buat di arus. Boleh video, gambar, judul, dan keterangan.',
  'Почему пост не опубликовался?':
    'Kenapa postinganku tidak terbit?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Teksnya tidak lolos pemeriksaan sebelum terbit. Pesannya menyebut alasannya: barang terlarang, penipuan, ancaman, dan sebagainya. Aturannya ada di Dokumen, dan kalau itu keliru, tulislah ke dukungan.',
  'Что дают реакции?':
    'Apa gunanya reaksi?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Reaksi di bawah postingan mendatangkan CUBE bagi penulisnya. Sehari bisa memberi sampai 500 suka.',
  'Как пожаловаться на пост?':
    'Bagaimana melaporkan postingan?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Di bawah setiap postingan dan setiap pesan ada tombol lapor. Laporan diserahkan kepada manusia.',
  'Сколько просмотров нужно для начисления?':
    'Berapa tayangan yang dibutuhkan untuk imbalan?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Mulai dari 10 ribu tampilan nyata: postingan dan komentarmu mulai mendatangkan CUBE dari ambang itu.',
  'Игра с кубами':
    'Permainan kubus',
  'Как играть кубами?':
    'Bagaimana bermain dengan kubus?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Tombol permainan ada di peta. Kubus terbang di dalam dinding dan tak bisa keluar. Tindakan ditekan lewat tombol, ditunjukkan dengan tangan di depan kamera, atau diucapkan keras-keras.',
  'Что такое режимы и толчки?':
    'Apa itu mode dan dorongan?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Dorongan adalah ledakan, lemparan, lempar ke atas, kembang api, dan kekacauan: terjadi sekali dan bekerja di atas segalanya. Mode bertahan sampai dimatikan dan bertumpuk: gravitasi (jatuhkan ATAU tanpa bobot), magnet, pusaran, beku.',
  'Как работают жесты рукой?':
    'Bagaimana gerakan tangan bekerja?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Ayunan ke samping itu lemparan, ke atas melempar tinggi, ke bawah menjatuhkan, telapak ke depan ledakan, lingkaran pusaran, dua tangan kekacauan. Gambarnya diolah di perangkatmu sendiri dan tidak pergi ke mana pun.',
  'Какие есть формы?':
    'Ada bentuk apa saja?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Kubus, kristal, segitiga, oktahedron, bola, piramida, prisma, bintang, ikosahedron, cincin, dolar, euro, yuan, dan gambarmu sendiri. Ditambah «campur», ketika setiap benda punya bentuknya sendiri.',
  'Как поставить свою картинку?':
    'Bagaimana memasang gambarku sendiri?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'Dalam permainan → Bentuk benda → kotak «Punyaku». Paling cocok yang persegi; yang tegak 9:16 dipotong dari tengah. Tekan «Punyaku» sekali lagi untuk menggantinya.',
  'Можно ли поставить видео?':
    'Boleh pakai video?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Boleh, sampai 15 detik. Yang lebih panjang tidak diterima. Videonya bertahan meski halaman dimuat ulang.',
  'Кто такие персонажи?':
    'Siapa saja karakternya?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Delapan karakter: kucing, tetangga, anjing, robot, hantu, panda, katak, alien. Mereka bisa diusap, digelitik, dan digoyang, dan menjawab dengan suara dan gerak.',
  'Как добавить своё действие?':
    'Bagaimana menambah tindakanku sendiri?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Lewat tombol di bagian karakter: nama, perintah, keterangan, dan dengan apa dilakukan — tangan, kaki, kepala, atau seluruh tubuh. Tindakannya sendiri dipilih dari enam belas efek yang sudah ada.',
  'Как крутятся предметы?':
    'Bagaimana benda berputar?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Lima mode: searah sumbu, melawan sumbu, lewat atas, lewat bawah, dan acak. Putaran dari lemparan ditambahkan di atas mode yang dipilih.',
  'Как начать эфир?':
    'Bagaimana memulai siaran?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Tombol Siaran di arus, atau perintah suara «siaran». Kamu memilih judul dan mode, lalu kamu sudah mengudara. Penonton menerima gambar langsung darimu.',
  'Какие режимы эфира?':
    'Ada mode siaran apa saja?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Kamera dan kubus: adegan di atas gambar kamera, gerakan tangan tetap jalan. Hanya kubus: adegan tanpa kamera. Siaran bersih: hanya kamera, tanpa komentar, reaksi, dan hadiah.',
  'Сколько зрителей выдержит эфир?':
    'Berapa penonton yang bisa ditanggung satu siaran?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Gambarnya langsung dari penyiar ke tiap penonton, jadi bergantung pada sambungan penyiar: di jalur rumahan sepuluh sampai lima belas orang menonton dengan nyaman. Ruang yang lebih besar butuh server penerus.',
  'Что такое подарки?':
    'Apa itu hadiah?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Tiga puluh hadiah, dari Mawar seharga 1 CUBE sampai Kubus Legenda seharga 1000. Hadiah adalah pengiriman CUBE kepada penyiar seutuhnya; platform tidak mengambil apa pun.',
  'Как закончить эфир?':
    'Bagaimana mengakhiri siaran?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Tombol Akhiri siaran di kepala jendela, terlihat di semua mode. Menutup jendela dengan tanda silang tidak menghentikan siaran: ia berjalan sampai kamu menekan Akhiri.',
  'Голос и языки':
    'Suara dan bahasa',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Ada perintah suara apa saja?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Lebih dari sembilan puluh: bagian-bagian, jendela, membuat, arus, permainan, bentuk, karakter, kendali. Daftar lengkap dengan pencarian ada di halaman Perintah suara: menu akun → Perintah suara, atau di Tampilan, atau cukup ucapkan «perintah suara».',
  'На каких языках работает голос?':
    'Suara bekerja dalam bahasa apa saja?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'Dalam dua puluh bahasa: Rusia, Inggris (termasuk logat India), Ukraina, Jerman, Prancis (dan logat Kanada), Spanyol (dan logat Amerika Latin), Italia, Portugis, Polandia, Turki, Arab (dan logat Teluk), Vietnam, Tionghoa, Jepang, Korea, Hindi. Bahasanya dipilih di halaman perintah dan di Tampilan.',
  'Как включить микрофон?':
    'Bagaimana menyalakan mikrofon?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Tombol mikrofon ada di bilah atas. Ditekan ia mendengar, ditekan lagi ia berhenti.',
  'Как выключить озвучку?':
    'Bagaimana mematikan jawaban bersuara?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Di halaman Perintah suara ada sakelar antara menjawab bersuara dan menjawab diam. Suara tetap mendengar pada keduanya; yang berbeda hanya jawabannya.',
  'Куда уходит мой голос?':
    'Ke mana suaraku pergi?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Pengenalannya dilakukan oleh peramban itu sendiri. Chrome dan peramban yang dibangun di atasnya mengirim bunyi ke server Google; begitulah pengenalan mereka dibuat dan platform tidak menentukan apa pun di situ. Kalau itu tak cocok untukmu, jangan nyalakan mikrofon: semuanya ada dalam bentuk tombol juga.',
  'Как поменять тему?':
    'Bagaimana mengubah tema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Tampilan → Tema: gelap, terang, atau «Kamera», ketika gambar dari kameramu menjadi latar.',
  'Что такое Цвет 1, 2 и 3?':
    'Apa itu Warna 1, 2, dan 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Warna 1 adalah judul, bilah ketik, dan tab. Warna 2 adalah jendelanya sendiri: latar obrolan dan daftar komentar. Warna 3 adalah sampul dan bingkai profil. Masing-masing punya penggeser tembus pandangnya sendiri.',
  'Как поставить обои?':
    'Bagaimana memasang latar?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Tampilan → Latar: satu set yang sudah ada atau gambarmu sendiri dalam 9:16. Warna 2 menimpa latar sebagai rona, dan penggesernya menentukan seberapa kuat.',
  'Правила и безопасность':
    'Aturan dan keamanan',
  'Что нельзя выкладывать?':
    'Apa yang tidak boleh diterbitkan?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Materi yang menyangkut anak-anak, ancaman dan ajakan kekerasan, menyulut kebencian, penipuan, barang terlarang, karya orang lain tanpa hak atasnya, menyamar sebagai orang lain, spam, dan keaktifan palsu. Selengkapnya di Aturan komunitas.',
  'Как работает модерация?':
    'Bagaimana penyaringan bekerja?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Postingan, komentar, pesan grup, nama, dan keterangan diperiksa di server sebelum terbit. Yang jelas-jelas terlarang tidak diterbitkan, yang meragukan diserahkan kepada manusia. Pasar dan obrolan pribadi tidak diperiksa.',
  'Виден ли мой IP?':
    'Apakah IP-ku terlihat?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Ya, server melihatnya, sama seperti situs mana pun di internet: tanpa IP ia tak akan tahu ke mana mengirim jawabannya. Mode tersembunyi menyembunyikan nama dan foto dari orang lain, bukan dari server.',
  'Что вы храните обо мне?':
    'Apa yang kalian simpan tentangku?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Kunci akun, profil yang kamu isi sendiri, isi buatanmu, penghitung harian, dan data teknis sambungan. Tanpa surel, tanpa nomor telepon, tanpa kata sandi, tanpa kunci dompet.',
  'Куда жаловаться?':
    'Ke mana mengadu?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Soal sebuah isi: lewat tombol lapor di bawahnya. Soal yang lain: lewat dukungan di dalam platform.',
  'Где документы?':
    'Di mana dokumennya?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Menu akun → Dokumen. Ada tujuh: syarat, kebijakan privasi, aturan komunitas, imbalan dan batas, swap dan pembayaran, langganan dan kunci, kamera dan mikrofon.',
  'Что такое карта?':
    'Apa itu peta?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Peta platform: 177 negara dan 1150 kota dengan koordinat sungguhan, kedudukan matahari dihitung untuk waktu sekarang, sisi malam dan fajar persis di tempatnya di langit. Dua puluh tampilan: dari angkasa, Bumi di malam hari, siang dan malam, jalan-jalan OpenStreetMap, cuaca, gempa, zona waktu, kubus dan siaran kita. Dibuka dari menu akun atau dengan kata «peta».',
  'Как проложить маршрут на карте?':
    'Bagaimana menarik rute di peta?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Sentuh titik awal di peta, lalu titik akhir, dan pilih satu dari dua puluh jalan. Lingkaran besar dan loksodrom, yaitu cara orang benar-benar terbang dan berlayar. Hanya lewat darat dan hanya lewat air: pencarian jalan sungguhan melintasi benua tanpa satu langkah pun ke unsur yang lain. Menyusur bayangan dan menyusur cahaya: mengikuti sisi malam. Melewati kubus, siaran, dan orang: lewat pin-pin kita. Rute jalan dihitung oleh mesin luar OSRM; kalau ia tak menjawab, kami mengatakannya.',
  'Видно ли меня на карте?':
    'Apakah aku terlihat di peta?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Hanya kalau kamu sendiri menancapkan pin «aku di sini». Pin itu hidup setengah jam lalu terhapus sendiri, koordinatnya dibulatkan ke satu kilometer bahkan sebelum dikirim ke server, dan «hapus aku dari peta» menghapus catatannya, bukan menyembunyikannya. Tanpa pin itu kamu sama sekali tidak ada di peta.',
  'Есть ли на карте спутник и пробки?':
    'Apakah peta punya citra satelit dan lalu lintas?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Tidak. Citra satelit dan lalu lintas disediakan penyedia berbayar dengan kunci. Tempat untuk lapisan-lapisan itu sudah siap: masukkan kunci dan mereka menyala. Selama belum ada kunci, peta mengatakannya terus terang alih-alih menggambar dusta yang indah.',
  'Что такое забег по улице?':
    'Apa itu lari di jalan?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Lompatan ke dalam peta: pandangan orang pertama, bangunan dan belokan sungguhan di jalanmu sendiri. Kamu sendiri yang berlari: geser ke samping untuk pindah lajur, di persimpangan untuk berbelok, ke atas untuk melompat, ke bawah untuk meluncur. Kamu memungut kubus dan menghindari palang serta sinar. Di sepanjang jalan kamu berpapasan dengan siaran, kubus, dan etalase orang lain. Ada juga jalan-jalan santai dengan tuas. Dibuka dari menu akun, dari peta dengan tombol Ke jalan, atau dengan kata «lari».',
  'Откуда берутся дома в забеге?':
    'Dari mana bangunan dalam lari berasal?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Dari OpenStreetMap: garis bangunan dan jumlah lantai yang sungguhan, jalan sungguhan dengan lebar dan belokannya. Satu lantai kami hitung tiga meter; kalau jumlah lantainya tak ada, tingginya diambil dari luas dasar bangunan. Tidak ada foto jalanan, itu disediakan penyedia berbayar. Kalau server peta sibuk, permainan mengatakannya dengan jujur dan membangun blok milik kita sendiri.',
  'Что такое шопинг в маркетплейсе?':
    'Apa itu belanja di pasar?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Bagian kedua pasar, untuk barang dan bukan berkas: enam belas kategori dari pakaian sampai seni, kartu dengan merek, ukuran, warna, spesifikasi, dan sampai dua puluh foto. Pada tiap kartu ada bangun berputar bertuliskan nama merek, salah satu dari dua puluh bentuk. Bagian ini tidak menyentuh uang: pembayaran dan pengiriman urusan antarorang, karena itu tertulis «tulis ke penjual», bukan «beli dengan CUBE».',
  'Игры, чаты и новое':
    'Permainan, obrolan, dan yang baru',
  'Сколько игр в зале?':
    'Ada berapa permainan di aula?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Delapan, dan semuanya bisa dimainkan: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Dikendalikan dengan jari dan dengan papan ketik.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Apakah permainan memberi CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Tidak. Permainan memberi poin dan rekor pribadi, yang tersimpan di perambanmu. CUBE diberikan server untuk tayangan dan dari dana bersama; mencetak uang di dalam peramban akan menjadi kebohongan.',
  'Как играть в DataMine?':
    'Bagaimana bermain DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Petak delapan kali delapan. Kamu menyentuh satu kotak dan menggali datanya; angkanya menunjukkan berapa virus di sebelahnya. Tekan lama untuk menancapkan bendera. Tiga nyawa, lalu lapisan baru.',
  'Как играть в CipherBreak?':
    'Bagaimana bermain CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Tebak sandi empat lambang. Setelah satu percobaan, lingkaran penuh berarti lambangnya di tempat yang benar, lingkaran kosong berarti ia ada di sandi tapi di tempat lain. Delapan percobaan.',
  'Как играть в Phantom Escape?':
    'Bagaimana bermain Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Kumpulkan lima kunci dan keluar lewat pintu. Hantu-hantu mengejarmu lewat jalan terpendek, dan di tiap lantai jumlahnya bertambah.',
  'Как играть в Block Trade?':
    'Bagaimana bermain Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Satu setengah menit, dengan 1000 di tangan. Beli murah, jual mahal. Nilaimu adalah semua yang melebihi seribu.',
  'Как играть в TrustChain?':
    'Bagaimana bermain TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Sentuh blok-blok berurutan menaik selagi jam berjalan. Satu kesalahan dan rantainya putus. Tiap babak rantainya makin panjang.',
  'Как играть в CubeBuilder?':
    'Bagaimana bermain CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Papannya bergeser ke samping dan satu sentuhan menjatuhkannya. Bagian yang menjulur akan rontok, dan papannya menyempit. Meleset dari menara, selesai sudah.',
  'Что показывает строка курсов?':
    'Apa yang ditampilkan pita harga?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Tiga puluh koin dengan harganya dan perubahan hari itu. Datanya lewat server kami, yang menyimpannya setengah menit. Pitanya tidak merayap: di layar muat sejumlah kotak bulat dan mereka berganti tiap beberapa detik.',
  'Что значит число кубов в шапке?':
    'Apa arti jumlah kubus di bilah atas?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Berapa kubus yang ada di duniamu sekarang, yang kamu lihat di depanmu. Bukan jumlah seluruh kubus di platform.',
  'Можно ли войти вторым аккаунтом?':
    'Bisakah aku masuk dengan akun kedua?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Bisa. Menu akun → Tambah akun: kunci yang sekarang tetap ada di daftar, dan kamu kembali ke sana dengan satu sentuhan dari menu yang sama. Yang diingat sampai delapan.',
  'Зачем «Сохранить» в окне игры?':
    'Untuk apa tombol Simpan di jendela permainan?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Ia mengingat bentuk benda, karakter, gerakan tangan, dan ukuran. Lain kali kamu masuk, semuanya persis seperti kamu tinggalkan.',
  'Чем режим отличается от толчка?':
    'Apa bedanya mode dengan dorongan?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Mode bertahan sampai kamu matikan dengan sentuhan kedua, dan tetap menyala. Dorongan terjadi sekali dan tidak menyala; ia hanya meninggalkan garis tipis bahwa ia yang terakhir ditekan.',
  'Почему кубы больше не исчезают?':
    'Kenapa kubus tidak lagi menghilang?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Kubus contoh di etalase dulu hidup sebentar, lima dan lima belas menit. Sekarang mereka diberi setidaknya setengah hari dan dijalankan ulang sebelum habis. Kubus sungguhan hidup persis selama yang diberikan saat dibuat.',
  'Как сделать фото прямо в чат?':
    'Bagaimana memotret langsung ke dalam obrolan?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Penjepit kertas → Kamera membuka pengambilan gambar milik kami sendiri. Satu sentuhan memotret, tekan lama merekam video sampai satu menit. Galeri adalah pilihan di sebelahnya, Foto atau video.',
  'Что такое галерея переписки?':
    'Apa itu galeri obrolan?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Kaca pembesar di kepala obrolan membuka pencarian dan sebuah rak di atasnya: foto, video, suara, dan tautan dari obrolan itu. Ia dikumpulkan dari pesan-pesannya sendiri dan tidak ada yang pergi ke mana pun.',
  'Как удалить сразу несколько сообщений?':
    'Bagaimana menghapus beberapa pesan sekaligus?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Tekan lama sebuah pesan untuk menyalakan pemilihan, lalu tandai yang kamu mau dan tekan Hapus di bilah bawah. Sampai seratus sekali jalan.',
  'Можно ли изменить своё сообщение?':
    'Bisakah aku menyunting pesanku sendiri?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Bisa, pesanmu sendiri dan yang berupa teks saja: menu pesan → Sunting. Di sebelahnya muncul tanda «disunting». Obrolannya tidak tertutup selama itu.',
  'Что такое сторис?':
    'Apa itu cerita?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Postingan pendek yang bertahan sehari, di atas daftar obrolan: sebuah foto atau video sampai satu menit. Ditonton satu per satu dan setelah sehari hilang sendiri.',
  'Сколько фото можно в группу?':
    'Berapa foto yang muat dalam satu grup?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Sampai tujuh foto, atau satu video sampai satu menit. Ditambah sebuah ikon dari kumpulan dan label di bawah keterangan.',
  'Что такое теги группы?':
    'Apa itu label grup?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Beberapa kata dipisahkan koma, dengannya grup ditemukan dalam pencarian.',
  'Видно ли участников группы?':
    'Apakah anggota grup terlihat?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Pemiliknya yang memutuskan saat membuat: daftar anggota bisa ditampilkan kepada semua orang atau dibiarkan hanya terlihat oleh pemilik.',
  'Почему поле ссылки на видео убрали?':
    'Kenapa kolom tautan video dihapus?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Tautan milik orang lain rusak ketika dihapus di ujung sana, dan platform tak bisa bertanggung jawab atas itu. Video diunggah sebagai berkas ke penyimpanan kami sendiri.',
  'Сколько длится видео в посте?':
    'Berapa panjang video dalam sebuah postingan?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Untuk sekarang berkas sampai 50 MB. Di server yang lebih besar akan ada tingkatan: 15 detik, satu menit, tiga menit, dan lima belas.',
  'Что делает кнопка «Чаевые автору»?':
    'Apa yang dilakukan tombol Beri tip ke penulis?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Ia mengirim CUBE dari saldomu ke penulis postingan seutuhnya, tanpa bagian untuk platform. Jumlahnya 1, 5, 10, 25, atau sesukamu.',
  'Как пожаловаться на видео?':
    'Bagaimana melaporkan sebuah video?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Tiga titik di bawah video → Laporkan: kamu memilih alasan dan boleh menambahkan kata-katamu sendiri. Laporannya sampai ke manusia.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Bagaimana membagikan sebuah postingan?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Tiga titik di bawah video → Bagikan. Kamu menerima tautan yang bisa dikirim ke siapa saja.',
  'Куда девается «Сохранить»?':
    'Ke mana tombol Simpan menaruh barangnya?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Ke profilmu, di rak simpanan, di bawah ikon penanda yang ada di bawah tab profil.',
  'Что видно в моём профиле?':
    'Apa yang terlihat di profilku?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Dua tab: Shorts untuk video pendekmu, Postingan untuk selebihnya. Menyentuh kartu akan membukanya persis seperti di arus. Sunting dan hapus hanya terlihat oleh penulisnya.',
  'Как изменить профиль?':
    'Bagaimana menyunting profilku?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Tombol pensil di profilmu sendiri: nama, @nama pengguna, keterangan, jenis akun, status, tautan, dan alamat.',
  'Чем бизнес-аккаунт отличается?':
    'Apa bedanya akun bisnis?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Terbuka berarti semua orang melihatmu. Tersembunyi berarti nama dan fotomu disembunyikan dari orang lain. Bisnis menambahkan keterangan usahamu, tautan, dan sebuah alamat.',
  'Что показывает «онлайн» в шапке?':
    'Apa yang ditunjukkan «daring» di bilah atas?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Menurut server, berapa orang yang sedang ada di platform saat ini. Diperbarui tiap setengah menit.',
  'Закрывается ли игра вместе с эфиром?':
    'Apakah permainan tertutup bersama siaran?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Ya. Kalau siarannya memakai kubus, permainan mati sendiri ketika siaran berakhir; kalau tidak, benda-benda itu akan terus terbang di atas peta kosong.',
  'Есть ли смайлы в эфире?':
    'Apakah ada emoji di dalam siaran?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Ada, tombol emoji di sebelah bilah ketik memuat seluruh kumpulan bersama, sama seperti di obrolan.',
  'Что такое «Все вопросы»?':
    'Apa itu «Semua pertanyaan»?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Buku panduan lengkap asisten: lebih dari seratus pertanyaan beserta jawabannya, tersusun per bagian, dengan pencarian berdasarkan judul.',
  'Куда делась кнопка NET?':
    'Ke mana tombol NET pergi?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Dihapus. Platform tidak mencari di internet yang luas, sedangkan tombol itu menjanjikan sebaliknya. Asisten menjawab tentang platform dan menemukan kubus, orang, grup, dan siaran.',
  'Почему звук повторялся дважды?':
    'Kenapa suaranya terulang dua kali?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Ada dua potongan kode berbeda yang berbicara dan tak satu pun memotong yang lain. Sekarang tiap kalimat membatalkan kalimat sebelumnya, dan teks yang sama tidak diulang dua kali berturut-turut.',
  'Как выключить голос совсем?':
    'Bagaimana mematikan suara sama sekali?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Di halaman Perintah suara ada sakelar antara menjawab bersuara dan menjawab diam. Sekarang ia benar-benar mematikannya: dulu ia hanya menguasai satu pintu masuk dan suaranya memutarinya.',
  'Что хранится только в моём браузере?':
    'Apa yang hanya disimpan di perambanku?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Rekor permainan, pengaturan permainan kubus, bahasa yang dipilih, tema dan latar, serta daftar akunmu sendiri. Tak satu pun dari itu pergi ke server.',
  'Почему просят подтвердить удаление?':
    'Kenapa aku diminta memastikan penghapusan?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Karena itu tak bisa dibatalkan. Di obrolan ditanya pula salinan mana yang dihapus, hanya milikmu atau milik semua.',
  'Что такое «У всех» при удалении?':
    'Apa arti «Untuk semua» saat menghapus?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Untukku» hanya menyembunyikan pesan dari layarmu sendiri. «Untuk semua» meminta server menghapusnya juga di sisi lawan bicara.',
  'Сколько живёт сообщение с таймером?':
    'Berapa lama pesan berbatas waktu hidup?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Selama yang kamu pilih: lima menit, satu jam, satu hari, satu minggu, atau selamanya. Tombol ∞ di sebelah bilah ketik.',
  'Как переслать сообщение?':
    'Bagaimana meneruskan sebuah pesan?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Menu pesan → Teruskan. Kamu memilih kepada siapa.',
  'Что делает «В избранное»?':
    'Apa yang dilakukan Simpan ke favorit?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Ia menaruh pesan ke dalam Simpanan, buku catatanmu sendiri berisi catatan dan hal-hal yang kamu simpan.',
  'Как найти сообщение в переписке?':
    'Bagaimana menemukan pesan di dalam obrolan?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Kaca pembesar di kepala obrolan: ia mencari di dalam teks, dan panah melompat di antara yang cocok. Rak berisi foto, video, suara, dan tautan ada di tempat yang sama.',
  'Что такое «Пригласить в группу»?':
    'Apa itu «Undang ke grup»?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Sebuah tautan dari keterangan grup: siapa yang membukanya akan bergabung ke grup.',
  'Можно ли выйти из группы?':
    'Bisakah aku keluar dari grup?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Bisa, lewat tombol di keterangan grup. Kalau pemiliknya keluar, grupnya sendiri tidak terhapus.',
  'Сколько форм у предметов?':
    'Berapa bentuk yang dimiliki benda?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Dua puluh, ditambah gambar atau videomu sendiri di atasnya, dan mode campur.',
  'Что такое шопинг?':
    'Apa itu belanja?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Bagian kedua pasar, untuk barang: enam belas kategori, kartu dengan merek dan sampai dua puluh foto, serta bangun berputar bertuliskan nama merek. Pembayaran dan pengiriman urusan antarorang.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Tanyakan dengan kata-kata: misalnya «bagaimana mendapatkan» atau «cari kubus Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Mau mencari apa? Tulis sesuatu seperti «cari kubus Art» atau «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Soal «{что}» aku tidak punya jawaban. Yang kutahu adalah platform ini: CUBE dan imbalan, batas, swap, dompet, kunci, sinyal, kubus dan grup, permainan kubus, siaran, tampilan, dan perintah suara.'

});
