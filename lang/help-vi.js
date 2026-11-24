/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-vi.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('vi', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Bài đăng, video và clip tròn. Bình luận và cảm xúc cũng mở từ đây.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Trò chuyện riêng, tin nhắn thoại và video tròn, mục đã lưu.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Cộng đồng công khai: trò chuyện chung, dòng sự kiện, thành viên.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Tín hiệu giao dịch: hướng, điểm vào, mục tiêu và cắt lỗ. Giá do máy chủ tự theo dõi.',
  'Объявления и обмен между людьми.':
    'Rao vặt và trao đổi giữa mọi người.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Mức thưởng, swap và mọi thứ mang CUBE về.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Số dư CUBE của bạn, nạp, rút và lịch sử.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Chuyện gì đang xảy ra với khối và bài đăng của bạn, bằng con số.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE là đồng tiền nội bộ của nền tảng. Máy chủ cộng nó mỗi ngày một lần cho hoạt động: ngày hoạt động, bài đăng và bình luận của bạn, những người bạn mời. Trong swap giá CUBE cố định: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'Máy chủ chốt phần thưởng mỗi ngày một lần. Được tính: một ngày hoạt động trực tuyến, bài đăng và bình luận của bạn từ 10 nghìn lượt xem, người được mời đã trả phí đăng ký, và phần cộng thêm cho một tuần, một tháng và một năm liên tiếp. Mức chính xác luôn được cập nhật trong mục Kiếm tiền.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Để không gì có thể bị thổi phồng bằng gian lận, máy chủ giữ hạn mức mỗi ngày: 20 cuộc trò chuyện mới, 500 lượt thích, 50 bình luận, 500 lượt theo dõi. Lượt xem hoàn toàn không thể thổi phồng, chỉ tính từ lần hiển thị thật. Hôm nay còn bao nhiêu thì xem trong Kiếm tiền.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'Swap đổi tiền mã hóa lấy CUBE và ngược lại: 16 đồng và các mạng của chúng, tỷ giá lấy tại thời điểm yêu cầu, CUBE tính theo $0.50. Nạp và rút đi qua nhà cung cấp thanh toán; khóa sàn hay khóa ví của ai chúng tôi đều không nhận và không giữ. Chỉ rút được phần đã kiếm, không rút được phần được tặng.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'Ví hiển thị số dư CUBE, lịch sử và các nút nạp, rút. Nạp và rút đều qua swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Chìa khóa mở ra khả năng: Free là nền, Silver là mở rộng, Gold cho nhiều khối hơn và thống kê. Chìa khóa mua bằng CUBE. Gói Premium cho bạn một phần quỹ thưởng theo đóng góp trong tháng.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Tín hiệu là hướng, điểm vào, mục tiêu và cắt lỗ. Máy chủ tự theo dõi giá và đóng tín hiệu tại mục tiêu hoặc cắt lỗ. Chúng tôi không hỏi khóa sàn: bạn tự giao dịch, ở chỗ của mình.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Cảm xúc dưới bài đăng mang CUBE về cho tác giả. Mỗi ngày có thể thả đến 500 lượt thích, quá đó máy chủ đơn giản là không tính nữa.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Khối là không gian của riêng bạn: trò chuyện, dòng tin, phòng riêng và đồng hồ đếm đời. Tạo bằng dấu «+» trong thế giới. Mời người bằng đường dẫn hoặc bằng chìa khóa của khối.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Khối là một thế giới riêng bên trong nền tảng: có tên, ảnh bìa, trò chuyện, dòng tin và thời gian sống của nó. Khối hiện trên bản đồ, có thể đi quanh và có thể tham gia.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Nhóm là cộng đồng công khai: trò chuyện chung, dòng sự kiện và danh sách thành viên. Bạn có thể lập nhóm của mình trong mục Nhóm.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'Trò chơi với khối mở bằng nút trên bản đồ. Các hành động chia thành cú đẩy (nổ, ném, tung lên, pháo hoa, hỗn loạn) và chế độ (thả rơi hoặc không trọng lực, chọn một trong hai, nam châm, lốc xoáy, đóng băng). Chế độ cộng dồn và giữ nguyên cho tới khi tắt. Tất cả đều chạy bằng nút, bằng cử chỉ trước máy ảnh và bằng giọng nói.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'Trong trò chơi có thể bật cử chỉ: vung sang bên là ném, lên trên là tung, xuống dưới là thả rơi, lòng bàn tay đưa tới là nổ, vẽ vòng tròn là lốc xoáy, hai tay là hỗn loạn. Hình từ máy ảnh không đi đâu cả, mọi thứ được tính ngay trên máy của bạn.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Vật thể không chỉ là khối: tinh thể, tam giác, khối tám mặt, hình cầu, kim tự tháp, lăng trụ, ngôi sao, khối hai mươi mặt, vòng, đô la, euro, nhân dân tệ. Có thể đặt ảnh của bạn hoặc video của bạn dài tới 15 giây; ảnh dọc 9:16 sẽ bị cắt từ giữa thành hình vuông.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'Trò chơi có tám nhân vật: mèo, người bên cạnh, chó, robot, ma, gấu trúc, ếch và người ngoài hành tinh. Có thể vuốt ve, cù và lắc chúng, chúng đáp lại bằng tiếng và bằng động tác. Hành động riêng của bạn thêm bằng một nút: tên, khẩu lệnh, mô tả và làm bằng gì — tay, chân, đầu hay cả người.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'Giao diện đổi màu và độ trong của cửa sổ: Màu 1 là tiêu đề và các thanh, Màu 2 là chính cửa sổ, Màu 3 là ảnh bìa và khung trang cá nhân. Hình nền cho trò chuyện cũng chọn ở đó, có thể đặt ảnh của bạn theo 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Bằng giọng nói hầu như làm được mọi thứ: các mục, trò chơi, hình dạng, nhân vật, hơn chín mươi lệnh. Danh sách đầy đủ bằng cả hai mươi thứ tiếng nằm ở trang Lệnh thoại: mở từ Giao diện hoặc nói «lệnh thoại». Công tắc trả lời thành tiếng hay im lặng cũng ở đó.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Tài liệu mở từ trình đơn tài khoản → Tài liệu. Có bảy bản: điều khoản sử dụng, chính sách riêng tư, quy tắc cộng đồng, phần thưởng và hạn mức, swap và thanh toán, đăng ký và chìa khóa, máy ảnh và micro. Bằng giọng nói cũng được, chỉ cần nói «tài liệu».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Lời mời cho CUBE khi người được mời trả phí đăng ký. Đường dẫn của bạn nằm trong mục lời mời.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'Trang cá nhân là tủ kính của bạn: ảnh bìa, mô tả và các tác phẩm. Dáng vẻ của bìa và khung đổi bằng Màu 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Thống kê cho thấy chuyện gì đang xảy ra với khối và bài đăng của bạn: lượt xem, cảm xúc, người tìm đến.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'Trong trang cá nhân có thể giấu tên và ảnh đại diện, thay vào đó là một số vô danh. Nhưng điều đó giấu bạn khỏi người khác, không phải khỏi máy chủ: địa chỉ IP của một kết nối thì trang nào trên mạng cũng thấy, trang của chúng tôi cũng vậy. Trong ứng dụng không có gì giấu được IP.',
  'Маркетплейс: объявления и обмен между людьми.':
    'Chợ là rao vặt và trao đổi giữa mọi người.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Bài đăng, bình luận, quảng cáo, tên và mô tả đều qua kiểm tra. Thứ rõ ràng bị cấm thì không được đăng, thứ còn tranh cãi chuyển cho người xem xét. Kiểm tra này không đụng tới chợ.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Chào bạn. Tôi là trợ lý của nền tảng: tôi trả lời về khối, phần thưởng, ví, trò chơi và cài đặt, và tôi cũng tìm khối, người và nhóm. Hãy hỏi bằng lời, ví dụ «kiếm tiền thế nào», «tìm khối Art», «@anna là ai». Còn phần còn lại của thế giới thì có thẻ NET ngay bên cạnh.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE và tiền',
  'Что такое CUBE?':
    'CUBE là gì?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE là điểm nội bộ của nền tảng. Máy chủ cộng chúng mỗi ngày một lần cho hoạt động. Trong swap giá cố định: 1 CUBE = $0.50. Đây không phải chứng khoán và cũng không phải lời hứa thu nhập.',
  'Как заработать?':
    'Kiếm tiền thế nào?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Máy chủ tính và chốt ngày mỗi 24 giờ một lần: ngày hoạt động trực tuyến, bài đăng và bình luận của bạn từ 10 nghìn lượt xem, cảm xúc dưới bài của bạn, người được mời đã trả phí đăng ký, và phần cộng thêm cho một tuần, một tháng và một năm liên tiếp. Mức chính xác nằm trong Kiếm tiền.',
  'Какие лимиты в сутки?':
    'Mỗi ngày có hạn mức nào?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 cuộc trò chuyện mới, 500 lượt thích, 50 bình luận, 500 lượt theo dõi. Lượt xem hoàn toàn không thể thổi phồng. Tính theo ngày UTC; chạm hạn mức thì hành động chỉ đơn giản là không được tính, và không có hình phạt nào.',
  'Что считается накруткой?':
    'Thế nào bị coi là gian lận?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Hàng loạt tài khoản, thích và theo dõi tự động, mua lượt xem, bắt tay nhau để thả cảm xúc qua lại. Phần thưởng kiếm theo cách đó sẽ bị thu lại.',
  'Как работает свайп?':
    'Swap hoạt động ra sao?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'Swap đổi tiền mã hóa lấy CUBE và ngược lại: 16 đồng và các mạng của chúng. Tỷ giá tiền mã hóa lấy tại thời điểm yêu cầu, CUBE tính theo $0.50. Nhận và gửi đi qua nhà cung cấp thanh toán.',
  'Как пополнить кошелёк?':
    'Nạp ví thế nào?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Qua swap: bạn tạo một yêu cầu, nhận địa chỉ và số tiền, rồi gửi chuyển khoản từ ví của mình. Quan trọng là đồng tiền và mạng phải khớp với yêu cầu, nếu không thì không lấy lại được.',
  'Как вывести деньги?':
    'Rút tiền thế nào?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'Yêu cầu rút được tạo về địa chỉ của bạn, phí mạng do người nhận trả. Chúng tôi kiểm tra và gửi bằng tay, thường trong vòng một ngày làm việc.',
  'Почему вывести можно не всё?':
    'Vì sao không rút được tất cả?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Chỉ rút được phần đã kiếm. CUBE được tặng hoặc thưởng thì tiêu được trong nền tảng nhưng không rút được; nếu không thì chỉ cần tặng nhau rồi đổi ra tiền là xong.',
  'Какие монеты поддерживаются?':
    'Hỗ trợ những đồng nào?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 đồng và các mạng của chúng: BTC, ETH, USDT, USDC, BNB và mười một đồng nữa trong nhóm dẫn đầu về khối lượng. Danh sách đầy đủ kèm mạng nằm trong cửa sổ swap.',
  'Что если отправил не в ту сеть?':
    'Nếu tôi gửi nhầm mạng thì sao?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Giao dịch trên chuỗi khối không thể đảo ngược. Hãy viết cho hỗ trợ ngay: đôi khi giúp được, nhưng không thể hứa. Vì thế mạng trong yêu cầu và trong ví phải khớp nhau.',
  'Берёте ли вы ключи от бирж?':
    'Các bạn có lấy khóa sàn không?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Không. Khóa sàn, cụm từ khôi phục hay quyền vào ví, chúng tôi đều không hỏi và không nhận. Nếu ai đó nhân danh nền tảng hỏi những thứ ấy thì đó là kẻ lừa đảo.',
  'Платите ли вы налоги за меня?':
    'Các bạn có nộp thuế hộ tôi không?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Không. Bạn nợ nhà nước những gì thì bạn tự quyết và tự nộp. Chúng tôi không phải đại lý thuế.',
  'Ключи и подписка':
    'Chìa khóa và đăng ký',
  'Какие бывают ключи?':
    'Có những chìa khóa nào?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free là nền, Silver là mở rộng, Gold cho nhiều khối hơn và thống kê. Chìa khóa nâng bằng CUBE trong Cửa hàng chìa khóa.',
  'Что даёт Premium?':
    'Premium cho gì?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'Một phần quỹ thưởng theo đóng góp trong tháng, kết nối ví ngoài để hiển thị, thống kê và xếp hạng, ưu tiên trong tín hiệu, huy hiệu trong trang cá nhân và trò chuyện, các khối Premium khép kín.',
  'Сколько стоит подписка?':
    'Đăng ký giá bao nhiêu?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 mỗi tháng hoặc $59.99 mỗi năm.',
  'Как отменить подписку?':
    'Hủy đăng ký thế nào?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'Bất cứ lúc nào: nó chạy hết kỳ đã trả rồi không gia hạn. Khoản đã trả cho kỳ hiện tại không hoàn lại, trừ khi luật buộc phải hoàn.',
  'Я потерял ключ: что делать?':
    'Tôi mất chìa khóa, phải làm sao?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Không khôi phục được. Chúng tôi không hỏi thư điện tử cũng không hỏi điện thoại, nên không có gì để xác nhận tài khoản là của bạn. Chìa khóa chính là tài khoản; hãy giữ ở nơi bạn không làm mất.',
  'Можно ли передать ключ другому?':
    'Tôi có thể đưa chìa khóa cho người khác không?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Được, nhưng mọi việc làm bằng chìa khóa đó đều coi như bạn làm.',
  'Кубы и группы':
    'Khối và nhóm',
  'Что такое куб?':
    'Khối là gì?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Khối là một thế giới riêng bên trong nền tảng: có tên, ảnh bìa, trò chuyện, dòng tin, phòng riêng và thời gian sống. Khối hiện trên bản đồ và có thể tham gia.',
  'Как создать куб?':
    'Tạo khối thế nào?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Bằng dấu «+» trong thế giới hoặc trong Vũ trụ của tôi. Bạn đặt tên, ảnh bìa, loại và thời gian sống. Mời người bằng đường dẫn hoặc bằng chìa khóa của khối.',
  'Что такое таймер жизни куба?':
    'Đồng hồ đếm đời của khối là gì?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Khối sống đúng khoảng thời gian đã đặt rồi đóng lại. Thời hạn chọn lúc tạo, từ một giờ đến một năm.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'Nhóm là gì?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Cộng đồng công khai: trò chuyện chung, dòng sự kiện và danh sách thành viên.',
  'Как найти куб или человека?':
    'Tìm một khối hay một người thế nào?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Hãy viết ngay ở đây: «tìm khối Art», «@anna», «nhóm nhiếp ảnh». Tôi sẽ tìm trong nền tảng và đưa ra các thẻ: khối, người, nhóm và những buổi phát đang diễn ra ngay lúc này.',
  'Лента и посты':
    'Dòng tin và bài đăng',
  'Как выложить пост?':
    'Đăng bài thế nào?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Bằng nút tạo trong dòng tin. Được phép video, ảnh, tiêu đề và mô tả.',
  'Почему пост не опубликовался?':
    'Vì sao bài của tôi không được đăng?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'Nội dung không qua được vòng kiểm tra trước khi đăng. Thông báo có nêu lý do: hàng cấm, lừa đảo, đe dọa và tương tự. Quy tắc nằm trong Tài liệu, còn nếu đó là nhầm lẫn thì hãy viết cho hỗ trợ.',
  'Что дают реакции?':
    'Cảm xúc mang lại gì?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Cảm xúc dưới bài đăng mang CUBE về cho tác giả. Mỗi ngày có thể thả đến 500 lượt thích.',
  'Как пожаловаться на пост?':
    'Báo cáo một bài đăng thế nào?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Dưới mỗi bài đăng và mỗi tin nhắn đều có nút báo cáo. Báo cáo được chuyển cho người xem xét.',
  'Сколько просмотров нужно для начисления?':
    'Cần bao nhiêu lượt xem để được thưởng?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'Từ 10 nghìn lần hiển thị thật: bài đăng và bình luận của bạn bắt đầu mang CUBE về từ ngưỡng đó.',
  'Игра с кубами':
    'Trò chơi với khối',
  'Как играть кубами?':
    'Chơi với khối thế nào?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'Nút trò chơi nằm trên bản đồ. Các khối bay bên trong những bức tường và không ra khỏi được. Hành động thì bấm bằng nút, ra hiệu bằng tay trước máy ảnh, hoặc nói thành lời.',
  'Что такое режимы и толчки?':
    'Chế độ và cú đẩy là gì?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Cú đẩy gồm nổ, ném, tung lên, pháo hoa và hỗn loạn: chạy một lần và tác động lên tất cả. Chế độ giữ nguyên cho tới khi tắt và cộng dồn: trọng lực (thả rơi HOẶC không trọng lực), nam châm, lốc xoáy, đóng băng.',
  'Как работают жесты рукой?':
    'Cử chỉ tay hoạt động ra sao?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Vung sang bên là ném, lên trên là tung, xuống dưới là thả rơi, lòng bàn tay đưa tới là nổ, vẽ vòng tròn là lốc xoáy, hai tay là hỗn loạn. Các khung hình được xử lý ngay trên máy của bạn và không đi đâu cả.',
  'Какие есть формы?':
    'Có những hình dạng nào?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Khối lập phương, tinh thể, tam giác, khối tám mặt, hình cầu, kim tự tháp, lăng trụ, ngôi sao, khối hai mươi mặt, vòng, đô la, euro, nhân dân tệ, và ảnh của chính bạn. Thêm nữa là «lẫn lộn», mỗi vật một hình dạng.',
  'Как поставить свою картинку?':
    'Đặt ảnh của mình thế nào?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'Trong trò chơi → Hình dạng vật thể → ô «Của tôi». Ảnh vuông là hợp nhất; ảnh dọc 9:16 sẽ bị cắt từ giữa. Bấm «Của tôi» lần nữa để thay.',
  'Можно ли поставить видео?':
    'Dùng video được không?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Được, tối đa 15 giây. Dài hơn thì không nhận. Video vẫn còn sau khi tải lại trang.',
  'Кто такие персонажи?':
    'Các nhân vật là ai?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Tám nhân vật: mèo, người bên cạnh, chó, robot, ma, gấu trúc, ếch, người ngoài hành tinh. Có thể vuốt ve, cù và lắc chúng, chúng đáp lại bằng tiếng và động tác.',
  'Как добавить своё действие?':
    'Thêm hành động của mình thế nào?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Bằng một nút trong mục nhân vật: tên, khẩu lệnh, mô tả và làm bằng gì — tay, chân, đầu hay cả người. Còn bản thân hành động thì chọn trong mười sáu hiệu ứng có sẵn.',
  'Как крутятся предметы?':
    'Vật thể xoay thế nào?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Năm chế độ: thuận trục, ngược trục, lộn qua đỉnh, lộn qua đáy, và lung tung. Vòng xoay từ cú ném được cộng thêm vào chế độ đã chọn.',
  'Как начать эфир?':
    'Bắt đầu buổi phát thế nào?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'Nút «Phát trực tiếp» trong dòng tin, hoặc lệnh thoại «phát trực tiếp». Bạn chọn tiêu đề và chế độ, thế là đang lên sóng. Người xem nhận hình trực tiếp từ bạn.',
  'Какие режимы эфира?':
    'Có những chế độ phát nào?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Máy ảnh và khối: cảnh nằm trên hình máy ảnh, cử chỉ vẫn chạy. Chỉ khối: cảnh không có máy ảnh. Phát sạch: chỉ máy ảnh, không bình luận, không cảm xúc, không quà.',
  'Сколько зрителей выдержит эфир?':
    'Một buổi phát chịu được bao nhiêu người xem?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'Hình đi thẳng từ người phát tới từng người xem, nên phụ thuộc vào đường truyền của người phát: với đường nhà, mười đến mười lăm người xem thoải mái. Phòng lớn hơn thì cần máy chủ trung chuyển.',
  'Что такое подарки?':
    'Quà là gì?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Ba mươi món quà, từ Hoa hồng giá 1 CUBE đến Khối huyền thoại giá 1000. Quà là chuyển CUBE cho người phát trọn vẹn; nền tảng không lấy phần nào.',
  'Как закончить эфир?':
    'Kết thúc buổi phát thế nào?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'Nút «Kết thúc» ở đầu cửa sổ, thấy được ở mọi chế độ. Đóng cửa sổ bằng dấu × không dừng buổi phát: nó vẫn chạy cho tới khi bạn bấm «Kết thúc».',
  'Голос и языки':
    'Giọng nói và ngôn ngữ',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Có những lệnh thoại nào?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Hơn chín mươi: các mục, cửa sổ, tạo mới, dòng tin, trò chơi, hình dạng, nhân vật, điều khiển. Danh sách đầy đủ kèm ô tìm nằm ở trang Lệnh thoại: trình đơn tài khoản → Lệnh thoại, hoặc trong Giao diện, hoặc chỉ cần nói «lệnh thoại».',
  'На каких языках работает голос?':
    'Giọng nói chạy được bằng những thứ tiếng nào?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'Hai mươi thứ tiếng: Nga, Anh (cả giọng Ấn Độ), Ukraina, Đức, Pháp (và giọng Canada), Tây Ban Nha (và giọng Mỹ Latinh), Ý, Bồ Đào Nha, Ba Lan, Thổ Nhĩ Kỳ, Ả Rập (và giọng vùng Vịnh), Việt, Trung, Nhật, Hàn, Hindi. Ngôn ngữ chọn ở trang lệnh và trong Giao diện.',
  'Как включить микрофон?':
    'Bật micro thế nào?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'Nút micro nằm ở thanh trên cùng. Bấm thì nó nghe, bấm lần nữa thì dừng.',
  'Как выключить озвучку?':
    'Tắt trả lời thành tiếng thế nào?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Ở trang Lệnh thoại có công tắc giữa trả lời thành tiếng và trả lời im lặng. Dù thế nào giọng nói vẫn nghe; chỉ khác ở cách trả lời.',
  'Куда уходит мой голос?':
    'Giọng của tôi đi đâu?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'Việc nhận dạng do chính trình duyệt làm. Chrome và các trình duyệt dựa trên nó gửi âm thanh tới máy chủ của Google; bộ nhận dạng của họ được làm như vậy và nền tảng không quyết định gì ở đó. Nếu điều đó không hợp với bạn thì đừng bật micro: mọi thứ đều có nút bấm.',
  'Как поменять тему?':
    'Đổi chủ đề thế nào?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Giao diện → Chủ đề: tối, sáng, hoặc «Máy ảnh», khi đó hình từ máy ảnh làm nền.',
  'Что такое Цвет 1, 2 и 3?':
    'Màu 1, 2 và 3 là gì?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'Màu 1 là tiêu đề, thanh nhập và các thẻ. Màu 2 là chính cửa sổ: nền của trò chuyện và danh sách bình luận. Màu 3 là ảnh bìa và khung trang cá nhân. Mỗi màu có thanh trượt độ trong riêng.',
  'Как поставить обои?':
    'Đặt hình nền thế nào?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Giao diện → Hình nền: một bộ có sẵn hoặc ảnh 9:16 của bạn. Màu 2 phủ lên hình nền như một lớp sắc, còn thanh trượt quyết định đậm nhạt.',
  'Правила и безопасность':
    'Quy tắc và an toàn',
  'Что нельзя выкладывать?':
    'Không được đăng những gì?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Nội dung liên quan đến trẻ em, đe dọa và kêu gọi bạo lực, kích động thù ghét, lừa đảo, hàng cấm, tác phẩm của người khác khi không có quyền, mạo danh, thư rác và hoạt động giả tạo. Đầy đủ trong Quy tắc cộng đồng.',
  'Как работает модерация?':
    'Việc kiểm duyệt diễn ra thế nào?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Bài đăng, bình luận, tin nhắn nhóm, tên và mô tả được kiểm tra trên máy chủ trước khi đăng. Thứ rõ ràng bị cấm thì không được đăng, thứ còn tranh cãi chuyển cho người xem xét. Chợ và trò chuyện riêng thì không bị kiểm tra.',
  'Виден ли мой IP?':
    'IP của tôi có bị nhìn thấy không?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Có, máy chủ thấy nó, cũng như bất kỳ trang nào trên mạng: không có IP thì nó không biết gửi câu trả lời về đâu. Chế độ ẩn giấu tên và ảnh khỏi người khác, chứ không giấu khỏi máy chủ.',
  'Что вы храните обо мне?':
    'Các bạn lưu gì về tôi?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'Chìa khóa tài khoản, trang cá nhân do chính bạn điền, nội dung của bạn, các bộ đếm theo ngày và dữ liệu kỹ thuật của kết nối. Không thư điện tử, không điện thoại, không mật khẩu, không khóa ví.',
  'Куда жаловаться?':
    'Khiếu nại ở đâu?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Về một nội dung thì bằng nút báo cáo ngay dưới nó. Về mọi thứ khác thì qua hỗ trợ bên trong nền tảng.',
  'Где документы?':
    'Tài liệu ở đâu?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Trình đơn tài khoản → Tài liệu. Có bảy bản: điều khoản, chính sách riêng tư, quy tắc cộng đồng, phần thưởng và hạn mức, swap và thanh toán, đăng ký và chìa khóa, máy ảnh và micro.',
  'Что такое карта?':
    'Bản đồ là gì?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'Bản đồ của nền tảng: 177 quốc gia và 1150 thành phố với tọa độ thật, vị trí mặt trời tính theo giờ hiện tại, phần đêm và bình minh đúng chỗ của chúng trên bầu trời. Hai mươi kiểu xem: từ vũ trụ, Trái Đất ban đêm, ngày và đêm, đường phố của OpenStreetMap, thời tiết, động đất, múi giờ, khối và buổi phát của chúng ta. Mở từ trình đơn tài khoản hoặc bằng lời «bản đồ».',
  'Как проложить маршрут на карте?':
    'Vẽ lộ trình trên bản đồ thế nào?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Chạm điểm đầu trên bản đồ, rồi điểm cuối, và chọn một trong hai mươi con đường. Vòng tròn lớn và đường tà hành, đúng như cách người ta thật sự bay và đi biển. Chỉ trên đất liền và chỉ trên mặt nước: một phép tìm đường thật qua các lục địa, không đặt một bước nào sang phần kia. Theo bóng tối và theo ánh sáng: bám theo phần đêm. Đi ngang các khối, buổi phát và con người: qua những ghim của chúng ta. Lộ trình theo đường phố do máy ngoài OSRM tính; nếu nó không trả lời, chúng tôi nói thẳng.',
  'Видно ли меня на карте?':
    'Tôi có hiện trên bản đồ không?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Chỉ khi chính bạn cắm ghim «tôi ở đây». Nó sống nửa giờ rồi tự xóa, tọa độ được làm tròn tới một cây số ngay trước khi gửi lên máy chủ, còn «gỡ tôi khỏi bản đồ» là xóa bản ghi chứ không phải giấu đi. Không có cái ghim ấy thì bạn hoàn toàn không có trên bản đồ.',
  'Есть ли на карте спутник и пробки?':
    'Bản đồ có ảnh vệ tinh và tình hình giao thông không?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Không. Ảnh vệ tinh và giao thông do các nhà cung cấp trả phí đưa ra kèm khóa. Chỗ cho những lớp ấy đã sẵn sàng: đặt khóa vào là chúng bật lên. Khi chưa có khóa, bản đồ nói thẳng điều đó thay vì vẽ ra một lời nói dối đẹp đẽ.',
  'Что такое забег по улице?':
    'Chạy trên phố là gì?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Một cú nhảy vào bên trong bản đồ: góc nhìn thứ nhất, những ngôi nhà và khúc rẽ thật của chính con phố bạn. Bạn tự chạy: vuốt ngang để đổi làn, ở ngã tư để rẽ, vuốt lên để nhảy, vuốt xuống để trượt. Bạn nhặt khối và né rào chắn cùng những tia sáng. Dọc đường bạn gặp buổi phát, khối và tủ kính của người khác. Cũng có kiểu đi dạo thong thả bằng cần điều khiển. Mở từ trình đơn tài khoản, từ bản đồ bằng nút «Ra phố», hoặc bằng lời «chạy».',
  'Откуда берутся дома в забеге?':
    'Nhà cửa trong phần chạy lấy từ đâu?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Từ OpenStreetMap: đường viền nhà và số tầng thật, đường sá thật với bề rộng và khúc rẽ của chúng. Chúng tôi tính một tầng là ba mét; thiếu số tầng thì lấy chiều cao từ diện tích nền nhà. Không có ảnh chụp phố, thứ đó do các nhà cung cấp trả phí đưa ra. Nếu máy chủ bản đồ bận, trò chơi nói thật điều đó và dựng lên một khu phố của chúng ta.',
  'Что такое шопинг в маркетплейсе?':
    'Mua sắm trong chợ là gì?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'Mục thứ hai của chợ, dành cho đồ vật chứ không phải tệp: mười sáu loại từ quần áo tới nghệ thuật, một thẻ có thương hiệu, cỡ, màu, thông số và tới hai mươi tấm ảnh. Trên mỗi thẻ có một hình xoay mang tên thương hiệu, là một trong hai mươi hình dạng. Mục này không đụng tới tiền: trả tiền và giao hàng là việc giữa người với người, vì thế mới ghi «nhắn cho người bán» chứ không phải «mua bằng CUBE».',
  'Игры, чаты и новое':
    'Trò chơi, trò chuyện và cái mới',
  'Сколько игр в зале?':
    'Trong sảnh có bao nhiêu trò chơi?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Tám, và trò nào cũng chơi được: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Điều khiển bằng ngón tay và bằng bàn phím.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Trò chơi có cho CUBE không?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Không. Trò chơi cho điểm và kỷ lục cá nhân, chúng nằm trong trình duyệt của bạn. Còn CUBE thì máy chủ cộng cho lượt xem và từ quỹ chung; đúc tiền trong trình duyệt sẽ là nói dối.',
  'Как играть в DataMine?':
    'Chơi DataMine thế nào?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Một bàn tám nhân tám. Chạm vào ô là đào dữ liệu lên; con số cho biết bên cạnh có bao nhiêu virus. Nhấn giữ thì cắm cờ. Ba mạng, rồi sang lớp mới.',
  'Как играть в CipherBreak?':
    'Chơi CipherBreak thế nào?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Đoán một mã gồm bốn ký hiệu. Sau mỗi lần thử, vòng tròn đặc nghĩa là ký hiệu đúng chỗ, vòng tròn rỗng nghĩa là nó có trong mã nhưng ở chỗ khác. Tám lần thử.',
  'Как играть в Phantom Escape?':
    'Chơi Phantom Escape thế nào?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Gom năm chìa khóa rồi ra cửa. Các bóng ma bám theo bạn bằng đường ngắn nhất, và mỗi tầng chúng lại đông hơn.',
  'Как играть в Block Trade?':
    'Chơi Block Trade thế nào?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Một phút rưỡi, trong tay có 1000. Mua rẻ, bán đắt. Điểm của bạn là tất cả phần vượt quá một nghìn.',
  'Как играть в TrustChain?':
    'Chơi TrustChain thế nào?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Chạm các khối theo thứ tự tăng dần khi đồng hồ còn chạy. Sai một lần là chuỗi đứt. Mỗi vòng chuỗi lại dài thêm.',
  'Как играть в CubeBuilder?':
    'Chơi CubeBuilder thế nào?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'Tấm ván chạy ngang, chạm một cái là nó rơi xuống. Phần thừa ra sẽ rụng, và tấm ván hẹp dần. Hụt mất tháp là xong.',
  'Что показывает строка курсов?':
    'Dải giá hiển thị gì?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Ba mươi đồng tiền cùng giá và mức thay đổi trong ngày. Dữ liệu đi qua máy chủ của chúng tôi, nơi giữ lại nửa phút. Dải không bò: màn hình chứa vừa một số nguyên ô và chúng đổi sau vài giây.',
  'Что значит число кубов в шапке?':
    'Con số khối ở thanh đầu nghĩa là gì?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Hiện trong thế giới của bạn có bao nhiêu khối, chính những cái bạn thấy trước mặt. Không phải tổng số khối trên nền tảng.',
  'Можно ли войти вторым аккаунтом?':
    'Tôi đăng nhập bằng tài khoản thứ hai được không?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Được. Trình đơn tài khoản → Thêm tài khoản: chìa khóa hiện tại vẫn nằm trong danh sách, và bạn quay lại nó bằng một chạm từ chính trình đơn ấy. Nhớ được tới tám cái.',
  'Зачем «Сохранить» в окне игры?':
    'Nút Lưu trong cửa sổ trò chơi để làm gì?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Nó nhớ hình dạng vật thể, nhân vật, cử chỉ và kích thước. Lần sau vào, mọi thứ vẫn y như lúc bạn rời đi.',
  'Чем режим отличается от толчка?':
    'Chế độ khác cú đẩy ở chỗ nào?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Chế độ giữ nguyên cho tới khi bạn chạm lần nữa để tắt, và vẫn sáng. Cú đẩy chạy một lần và không sáng; nó chỉ để lại một vạch mảnh cho biết nó được bấm sau cùng.',
  'Почему кубы больше не исчезают?':
    'Vì sao các khối không còn biến mất?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Những khối mẫu trong tủ kính trước đây sống ngắn, năm phút và mười lăm phút. Giờ chúng được ít nhất nửa ngày và được khởi động lại trước khi hết hạn. Còn khối thật thì sống đúng bằng khoảng thời gian đặt lúc tạo.',
  'Как сделать фото прямо в чат?':
    'Chụp ảnh thẳng vào cuộc trò chuyện thế nào?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'Cái kẹp giấy → Máy ảnh sẽ mở phần chụp của chính chúng tôi. Một chạm là chụp ảnh, nhấn giữ là quay video tới một phút. Thư viện là mục bên cạnh, Ảnh hoặc video.',
  'Что такое галерея переписки?':
    'Thư viện của cuộc trò chuyện là gì?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'Kính lúp ở đầu cuộc trò chuyện mở ô tìm và một ngăn phía trên: ảnh, video, âm thanh và đường dẫn của chính cuộc trò chuyện đó. Nó được gom từ các tin nhắn và không có gì đi đâu cả.',
  'Как удалить сразу несколько сообщений?':
    'Xóa nhiều tin nhắn cùng lúc thế nào?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Nhấn giữ một tin nhắn sẽ bật chế độ chọn, sau đó đánh dấu những cái bạn muốn và bấm Xóa ở thanh dưới. Tối đa một trăm mỗi lần.',
  'Можно ли изменить своё сообщение?':
    'Tôi sửa được tin nhắn của mình không?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Được, tin của bạn và chỉ tin bằng chữ: trình đơn tin nhắn → Sửa. Bên cạnh sẽ hiện dấu «đã sửa». Cuộc trò chuyện không đóng lại khi bạn sửa.',
  'Что такое сторис?':
    'Tin ngắn trong ngày là gì?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Những bài ngắn sống một ngày, nằm trên danh sách trò chuyện: một tấm ảnh hoặc một video tới một phút. Xem lần lượt từng cái, sau một ngày chúng tự biến mất.',
  'Сколько фото можно в группу?':
    'Một nhóm chứa được bao nhiêu ảnh?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Tối đa bảy ảnh, hoặc một video tới một phút. Thêm vào đó là một biểu tượng trong bộ có sẵn và các thẻ dưới phần mô tả.',
  'Что такое теги группы?':
    'Thẻ của nhóm là gì?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Vài từ cách nhau bằng dấu phẩy, nhờ chúng mà nhóm được tìm thấy khi tìm kiếm.',
  'Видно ли участников группы?':
    'Thành viên nhóm có hiện ra không?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Chủ nhóm quyết định lúc tạo: danh sách thành viên có thể cho mọi người thấy, hoặc chỉ để chủ nhóm thấy.',
  'Почему поле ссылки на видео убрали?':
    'Vì sao bỏ ô nhập đường dẫn video?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Đường dẫn của nơi khác bị hỏng khi người ta xóa ở đầu bên kia, và nền tảng không thể chịu trách nhiệm cho chuyện đó. Video được tải lên dưới dạng tệp vào kho của chính chúng tôi.',
  'Сколько длится видео в посте?':
    'Video trong bài đăng dài được bao nhiêu?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Hiện giờ là tệp tới 50 MB. Trên máy chủ lớn hơn sẽ có các bậc: 15 giây, một phút, ba phút và mười lăm.',
  'Что делает кнопка «Чаевые автору»?':
    'Nút Thưởng cho tác giả làm gì?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Nó chuyển CUBE từ số dư của bạn tới tác giả bài đăng trọn vẹn, nền tảng không giữ phần nào. Mức là 1, 5, 10, 25 hoặc do bạn tự đặt.',
  'Как пожаловаться на видео?':
    'Báo cáo một video thế nào?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Ba chấm dưới video → Báo cáo: bạn chọn lý do và có thể thêm lời của mình. Nó được chuyển tới người xem xét.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Chia sẻ một bài đăng thế nào?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Ba chấm dưới video → Chia sẻ. Bạn nhận một đường dẫn và gửi được cho bất kỳ ai.',
  'Куда девается «Сохранить»?':
    'Nút Lưu cất đồ vào đâu?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'Vào trang cá nhân của bạn, trên ngăn đã lưu, dưới biểu tượng dấu trang bên dưới các thẻ của trang.',
  'Что видно в моём профиле?':
    'Trang cá nhân của tôi hiện những gì?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Hai thẻ: Shorts cho video ngắn, Bài đăng cho tất cả phần còn lại. Chạm vào một thẻ thì nó mở ra như trong dòng tin. Sửa và xóa thì chỉ tác giả mới thấy.',
  'Как изменить профиль?':
    'Sửa trang cá nhân thế nào?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'Nút bút chì trong trang của chính bạn: tên, @tên người dùng, mô tả, loại tài khoản, trạng thái, đường dẫn và địa chỉ.',
  'Чем бизнес-аккаунт отличается?':
    'Tài khoản doanh nghiệp khác ở chỗ nào?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Công khai nghĩa là mọi người đều thấy bạn. Ẩn nghĩa là tên và ảnh được giấu khỏi người khác. Doanh nghiệp thì thêm phần mô tả công việc, các đường dẫn và một địa chỉ.',
  'Что показывает «онлайн» в шапке?':
    'Chữ «trực tuyến» ở thanh đầu cho thấy gì?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Theo máy chủ thì hiện có bao nhiêu người đang ở trên nền tảng. Nó làm mới mỗi nửa phút.',
  'Закрывается ли игра вместе с эфиром?':
    'Trò chơi có đóng cùng với buổi phát không?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Có. Nếu buổi phát có khối thì trò chơi tự tắt khi buổi phát kết thúc; nếu không thì các vật vẫn bay trên một bản đồ trống.',
  'Есть ли смайлы в эфире?':
    'Trong buổi phát có biểu tượng cảm xúc không?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Có, nút biểu tượng cạnh thanh nhập chứa cả bộ chung, đúng bộ như trong trò chuyện.',
  'Что такое «Все вопросы»?':
    '«Tất cả câu hỏi» là gì?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'Sách hướng dẫn đầy đủ của trợ lý: hơn một trăm câu hỏi kèm câu trả lời, xếp theo mục, có tìm theo tiêu đề.',
  'Куда делась кнопка NET?':
    'Nút NET đi đâu rồi?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Đã bỏ. Nền tảng không tìm trong internet rộng lớn, còn cái nút thì hứa là có. Trợ lý trả lời về nền tảng và tìm khối, người, nhóm và buổi phát.',
  'Почему звук повторялся дважды?':
    'Vì sao âm thanh lặp lại hai lần?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Có hai đoạn mã khác nhau cùng nói và không đoạn nào cắt lời đoạn kia. Giờ mỗi câu hủy câu trước, và cùng một đoạn chữ không được đọc hai lần liên tiếp.',
  'Как выключить голос совсем?':
    'Tắt hẳn giọng nói thế nào?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Ở trang Lệnh thoại có công tắc giữa trả lời thành tiếng và trả lời im lặng. Giờ nó tắt thật: trước đây nó chỉ cai quản một lối vào và giọng nói đi vòng qua.',
  'Что хранится только в моём браузере?':
    'Những gì chỉ nằm trong trình duyệt của tôi?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Kỷ lục trò chơi, cài đặt trò chơi với khối, ngôn ngữ đã chọn, chủ đề và hình nền, cùng danh sách tài khoản của bạn. Không thứ nào trong đó đi lên máy chủ.',
  'Почему просят подтвердить удаление?':
    'Vì sao tôi bị hỏi xác nhận khi xóa?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Vì không thể hoàn lại. Trong trò chuyện còn hỏi thêm là gỡ bản nào, chỉ của bạn hay của tất cả.',
  'Что такое «У всех» при удалении?':
    '«Cho tất cả» khi xóa nghĩa là gì?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Cho tôi» chỉ giấu tin nhắn khỏi màn hình của bạn. «Cho tất cả» là nhờ máy chủ gỡ nó cả ở phía người kia.',
  'Сколько живёт сообщение с таймером?':
    'Tin nhắn có hạn sống được bao lâu?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Đúng bằng khoảng bạn chọn: năm phút, một giờ, một ngày, một tuần, hoặc mãi mãi. Nút ∞ cạnh thanh nhập.',
  'Как переслать сообщение?':
    'Chuyển tiếp một tin nhắn thế nào?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Trình đơn tin nhắn → Chuyển tiếp. Bạn chọn gửi cho ai.',
  'Что делает «В избранное»?':
    'Nút Lưu vào mục yêu thích làm gì?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Nó đặt tin nhắn vào mục Đã lưu, cuốn sổ của riêng bạn với ghi chú và những thứ giữ lại.',
  'Как найти сообщение в переписке?':
    'Tìm một tin nhắn trong cuộc trò chuyện thế nào?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'Kính lúp ở đầu cuộc trò chuyện: nó tìm trong chữ, còn các mũi tên nhảy giữa những chỗ khớp. Ngăn ảnh, video, âm thanh và đường dẫn cũng ở ngay đó.',
  'Что такое «Пригласить в группу»?':
    '«Mời vào nhóm» là gì?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Một đường dẫn trong phần thông tin nhóm: ai mở nó thì vào nhóm.',
  'Можно ли выйти из группы?':
    'Tôi rời nhóm được không?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Được, bằng một nút trong phần thông tin nhóm. Chủ nhóm rời đi thì bản thân nhóm cũng không bị xóa.',
  'Сколько форм у предметов?':
    'Vật thể có bao nhiêu hình dạng?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Hai mươi, thêm ảnh hoặc video của bạn phủ lên chúng, và chế độ lẫn lộn.',
  'Что такое шопинг?':
    'Mua sắm là gì?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'Mục thứ hai của chợ, dành cho đồ vật: mười sáu loại, một thẻ có thương hiệu và tới hai mươi tấm ảnh, cùng một hình xoay mang tên thương hiệu. Trả tiền và giao hàng là việc giữa người với người.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Hãy hỏi bằng lời: ví dụ «kiếm tiền thế nào» hoặc «tìm khối Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'Tìm gì đây? Hãy viết đại loại «tìm khối Art» hoặc «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Về «{что}» thì tôi không có câu trả lời. Thứ tôi biết là nền tảng này: CUBE và phần thưởng, hạn mức, swap, ví, chìa khóa, tín hiệu, khối và nhóm, trò chơi với khối, buổi phát, giao diện và lệnh thoại.'

});
