/* ═══════════════════════════════════════════════════════════════════════
   ENGLISH — словарь программы

       lang/en.js      (машинка — shared/lang.js)

   Ключ — русская фраза, как она стоит в коде. Нет ключа в этом файле —
   человек увидит русские слова: дыра ведёт к живому слову, а не к
   пустому месту.

   Говоры (en-GB, en-CA, en-AU) лежат отдельными короткими файлами и
   кладутся ПОВЕРХ этого: там только отличия вроде colour против color.

   ── КАК ВЫБРАНЫ СЛОВА ───────────────────────────────────────────────

   Не дословно, а так, как это называется в английских приложениях. У
   программы свой голос: коротко, по-человечески, без канцелярита. Он
   должен остаться и по-английски.

       «Лента»        Feed       (не «Tape» и не «Ribbon»)
       «Ещё»          More
       «Заработать»   Earn
       «Оформление»   Appearance (так это зовётся в iOS и Android)
       «Пока пусто»   Nothing here yet

   Ключ куба — Key 2, это имя, его не переводим.
   CUBE и CubeWorld тоже имена.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('en', {

  /* ── нижнее меню и боковое меню ───────────────────────────────── */
  'Лента':        'Feed',
  'Чаты':         'Chats',
  'Группы':       'Groups',
  'Ещё':          'More',
  'Сигналы':      'Signals',
  'Маркетплейс':  'Marketplace',
  'Заработать':   'Earn',
  'Кошелёк':      'Wallet',
  'Аналитика':    'Analytics',
  'Рефералы':     'Referrals',
  'Оформление':   'Appearance',
  'Выйти':        'Log out',
  'Стримить':     'Go live',

  /* заголовки групп в боковом меню */
  'Главное':      'Main',
  'Контент':      'Content',
  'Монетизация':  'Earnings',
  'Инструменты':  'Tools',

  /* ── шапка оболочки ───────────────────────────────────────────── */
  'В мир':                'To the world',
  'Мой профиль':          'My profile',
  'Поиск Cube':           'Search CubeWorld',
  'Уведомления':          'Notifications',
  'Голосовые команды':    'Voice commands',
  'Добавить':             'Add',
  'Создать куб':          'Create a cube',
  'Открыть куб':          'Open a cube',
  'Выйти из куба':        'Leave cube',
  'Key 2 ключ куба и ссылка-приглашение': 'Key 2: the cube key and invite link',

  /* ── что программа говорит ────────────────────────────────────── */
  'Нет связи с сервером':   'No connection to the server',
  'Не вышло выйти':         'Could not leave',
  'Ключ не пришёл':         'The key did not arrive',
  'Ключ куба виден только его создателю': 'Only the cube owner can see its key',
  'Key 2 принадлежит кубу: открой куб, и ключ покажется':
    'Key 2 belongs to a cube: open a cube and the key will show',
  'Голосовой помощник не приехал': 'The voice assistant did not load',
  'Вышли из «{имя}»':       'Left “{имя}”',
  'Куб {н}':                'Cube {н}',
  '«{имя}» ещё не готова':  '“{имя}” is not ready yet',

  /* ── рама окна: общая на все окна программы ───────────────────── */
  'Назад':    'Back',
  'Закрыть':  'Close',
  'Пока пусто': 'Nothing here yet',
  'Заполни то, что подсвечено': 'Fill in the highlighted fields',
  'Не удалось открыть: {что}': 'Could not open: {что}',

  /* ── названия вкладок браузера ────────────────────────────────
     «Лента · CubeWorld» на вкладке. Подставляет shared/lang.js одной
     рукой на все страницы. Те, что совпадают с пунктами меню, уже
     переведены выше. */
  'Мир':             'World',
  'Группа':          'Group',
  'Переписка':       'Chat',
  'Портфолио':       'Portfolio',
  'Избранное':       'Saved',
  'Документы':       'Documents',
  'Карта':           'Map',
  'Поиск':           'Search',
  'Тарифы':          'Plans',
  'Загрузка видео':  'Video upload',
  'Звонок':          'Call',
  'Видеозвонок':     'Video call',

  /* ── выбор языка (окно «Оформление») ──────────────────────────── */
  'Язык':   'Language',
  'скоро':  'soon',
  'Язык сменится на всех экранах после перезагрузки':
    'The language will change on every screen after the reload',
  'Переведено не всё: остальное пока по-русски':
    'Not everything is translated yet: the rest is still in Russian'
,

  /* ═══ ЛЕНТА (feed.html) ═══════════════════════════════════════ */

  /* вкладки и шапка */
  'Шортс':      'Shorts',
  'Посты':      'Posts',
  'Для тебя':   'For you',
  'Топ':        'Top',
  'Поиск по ленте':   'Search the feed',
  'Скрыть шапку':     'Hide the header',
  'Показать шапку':   'Show the header',
  'Закрыть поиск':    'Close search',
  'Имя, заголовок, описание, тег': 'Name, title, description, tag',
  'Пока ничего. Загрузка…': 'Nothing yet. Loading…',
  'Ничего не нашлось':      'Nothing found',
  'Без названия':           'Untitled',

  /* когда лента не пришла */
  'Лента не загрузилась':     'The feed did not load',
  'Сервер ответил не лентой': 'The server did not return a feed',
  'Сервер не ответил.':       'The server did not respond.',
  'Сервер не отвечает. Бывает, что он просыпается после простоя, тогда помогает «Повторить».':
    'The server is not responding. It sometimes wakes up after being idle, and “Retry” helps.',
  'Повторить': 'Retry',

  /* пустые экраны */
  'Пока не на кого смотреть': 'No one to watch yet',
  'Подпишись на авторов: в этой вкладке будут только их новые публикации.':
    'Follow some authors: this tab shows only their new posts.',
  'Нет постов (POST)':  'No posts yet (POST)',
  'Нет видео (SHORT)':  'No videos yet (SHORT)',
  'Лента пуста':        'The feed is empty',
  'Нажми «Добавить контент»: опубликуй SHORT или POST, и он появится здесь сразу.':
    'Tap “Add content”: publish a SHORT or a POST and it appears here right away.',

  /* кадр ленты */
  'Ролик не открылся':            'The video did not open',
  'Этот браузер не открыл видео': 'This browser could not play the video',
  'Участник #{н}':                'Member #{н}',
  'Два нажатия — включить звук':  'Double tap for sound on',
  'Два нажатия — выключить звук': 'Double tap for sound off',
  'одно — пауза':                 'single tap to pause',

  /* что можно сделать с записью */
  'Поделиться':    'Share',
  'Репост':        'Repost',
  'Скачать':       'Download',
  'Чаевые автору': 'Tip the author',
  'Редактировать': 'Edit',
  'Удалить':       'Delete',
  'Пожаловаться':  'Report',
  'Сохранить':     'Save',
  'Сохранено':     'Saved',

  'Лайк не прошёл':          'The like did not go through',
  'Запись у тебя в ленте':   'The post is now in your feed',
  'Репост не прошёл':        'The repost did not go through',
  'Убрано из сохранённых':   'Removed from saved',
  'Не вышло сохранить':      'Could not save',
  'Этой публикации в ленте уже нет': 'That post is no longer in the feed',

  /* окно удаления: «Удалить запись?» */
  'запись': 'post',
  'Лайки и комментарии исчезнут вместе с ней.':
    'Its likes and comments will be gone with it.',

  /* ═══ ЧАТЫ (chats.html) ═══════════════════════════════════════ */

  'Не вышло открыть чаты':  'Could not open chats',
  'Поиск или новый чат…':   'Search or start a new chat…',
  'Диалогов нет':           'No conversations yet',
  'Убрано в архив':         'Moved to archive',

  /* полки над списком */
  'Избранные': 'Saved',
  'Папки':     'Folders',
  'Архив':     'Archive',
  'Звуки':     'Sounds',
  'Сторис':    'Stories',
  '{имя}: отдельное окно, его ещё нет': '{имя}: a separate window, not built yet',

  /* чем кончается строка списка */
  'Снимок':              'Photo',
  'Видео':               'Video',
  'Голосовое сообщение': 'Voice message',
  'Аудиозапись':         'Audio',
  'Видеокружок':         'Video circle',
  'Геопозиция':          'Location',
  'Файл':                'File',
  'Вложение':            'Attachment',

  /* полоса сторис */
  'Моя':                  'Mine',
  'Загрузка…':            'Loading…',
  'Смотреть свою сторис': 'View your story',
  'Добавить ещё':         'Add another',
  'Чужих сторис пока нет': 'No one else has posted a story yet',
  'Сторис не ответили':   'Stories did not load',
  'У {кто} нечего смотреть': 'Nothing to watch from {кто}',
  'него':                 'them',

  /* ═══ ГРУППЫ (groups.html) ════════════════════════════════════ */

  'Не вышло получить группы': 'Could not load groups',
  'Создать группу':  'Create a group',
  'Все группы':      'All groups',
  'Мои группы':      'My groups',
  'Название группы…': 'Group name…',
  'Групп нет':       'No groups yet',
  'Ещё на площадке': 'More on CubeWorld',
  'Открыть':         'Open',
  'Войти':           'Join',
  'Вхожу…':          'Joining…',
  'Не вышло войти':  'Could not join',
  '{н} уч.':         '{н} mem.',

  /* слово при числе: Т.мн сам выберет форму по языку */
  'участник':   'member',
  'участника':  'members',
  'участников': 'members',

  /* ═══ ВРЕМЯ И ДАТЫ (shared/time.js) ═══════════════════════════
     Месяцы и порядок чисел пишет сам браузер - ему сказали язык.
     Здесь только слова вокруг них. */
  'вчера':            'yesterday',
  'сегодня в {часы}': 'today at {часы}',
  'вчера в {часы}':   'yesterday at {часы}',
  '{день} в {часы}':  '{день} at {часы}',
  'только что':       'just now',
  '{н} мин назад':    '{н} min ago',
  '{н} ч назад':      '{н} h ago',
  '{н}м':             '{н}m',
  '{н}ч':             '{н}h',
  '{н}д':             '{н}d',
  'истёк':            'expired',
  '{н} ч':            '{н} h',
  '{н} мин':          '{н} min',

  /* ═══ ПЕРЕПИСКИ: общие части (shared/chat.js) ═════════════════ */

  'Это окно':  'This window',
  '«{имя}»: отдельное окно, его ещё нет': '“{имя}”: a separate window, not built yet',
  'Вниз, к последнему':  'Down to the latest',
  'Не вышло проиграть запись': 'Could not play the recording',
  'изменено':  'edited',

  /* карточка звонка */
  'Исходящий звонок':    'Outgoing call',
  'Входящий звонок':     'Incoming call',
  'Пропущенный звонок':  'Missed call',
  'Отменённый звонок':   'Cancelled call',
  'Занято':              'Busy',
  'Не ответили':         'No answer',
  'Видеозвонок':         'Video call',
  'Аудиозвонок':         'Voice call',
  'занято':              'busy',
  'отменён':             'cancelled',
  'пропущен':            'missed',
  '{н} с':               '{н} s',
  '{н} мин':             '{н} min',
  '{н} Б':               '{н} B',
  '{н} КБ':              '{н} KB',
  '{н} МБ':              '{н} MB',

  /* строка ввода */
  'Приложить файл':  'Attach a file',
  'Сообщение…':      'Message…',
  'Отправить':       'Send',
  'Голосом':         'Voice message',
  'двойное нажатие переключает': 'double tap switches',
  'Скрыть через':    'Disappear after',
  'Навсегда':        'Never',
  '5 минут':         '5 minutes',
  '1 час':           '1 hour',
  '24 часа':         '24 hours',
  '7 дней':          '7 days',
  'Кнопка пишет видеокружок': 'The button records a video circle',
  'Кнопка пишет голосовое':   'The button records a voice message',
  'Запись голоса не приехала': 'The voice recorder did not load',
  'Не отправилось':  'Not sent',
  'Этому окну некуда класть вложения': 'This window has nowhere to put attachments',
  'Сообщений пока нет. Напиши первым.': 'No messages yet. Be the first to write.',
  'Переписка не открылась': 'The conversation did not open',

  /* разделы смайлов */
  'Часто':    'Frequent',
  'Смайлы':   'Smileys',
  'Жесты':    'Gestures',
  'Люди':     'People',
  'Звери':    'Animals',
  'Еда':      'Food',
  'Спорт':    'Activity',
  'Места':    'Places',
  'Предметы': 'Objects',
  'Знаки':    'Symbols',
  'Карты':    'Cards',
  'Флаги':    'Flags',
  'Здесь появятся те, что выбираешь чаще': 'The ones you use most will show up here',

  /* пометки формата */
  'Жирный':       'Bold',
  'Курсив':       'Italic',
  'Зачёркнутый':  'Strikethrough',
  'Подчёркнутый': 'Underline',
  'Моноширинный': 'Monospace',
  'Скрытый':      'Spoiler',
  'Цитата':       'Quote',
  'Ссылка':       'Link',
  'ссылка':       'link',
  'Адрес ссылки': 'Link address',

  /* поиск по переписке */
  'Поиск по переписке':  'Search this conversation',
  'Искать в переписке…': 'Search the conversation…',
  'Выше':   'Previous',
  'Ниже':   'Next',
  'Фото':   'Photos',
  'Аудио':  'Audio',
  'Ссылки': 'Links',
  'Нашлось: {н}':    'Found: {н}',
  'В разделе: {н}':  'In this tab: {н}',

  /* ═══ ПЕРЕПИСКА С ЧЕЛОВЕКОМ (windows/dm.html) ═════════════════ */

  'Переписка открыта отдельным окном. Закрой его, чтобы вернуться к списку.':
    'This conversation is a separate window. Close it to go back to the list.',
  'Не указано, с кем переписка': 'No one specified for this conversation',
  'Добавить кнопку':      'Add a button',
  'Добавить ряд кнопок':  'Add a row of buttons',
  'Очистить переписку':   'Clear the conversation',
  'Очистить переписку у себя?': 'Clear this conversation for yourself?',
  'Очистить':             'Clear',
  'Оставить':             'Keep it',
  'Переписка очищена':    'Conversation cleared',
  'Не вышло очистить':    'Could not clear it',
  'Закреплено':   'Pinned',
  'Откреплено':   'Unpinned',
  'Скопировано':  'Copied',
  'Моё место':    'My location',
  'Меню не приехало': 'The menu did not load',
  'Выбор не приехал': 'Selection did not load',
  'Везу файлы…':      'Uploading files…',
  'Готово: {н} файла': 'Done: {н} files',
  'Файл заменён':      'File replaced',
  'Удалить сообщение?': 'Delete this message?',
  'Сообщение удалено':  'Message deleted',
  'Уйдёт у обоих.':       'It goes for both of you.',
  'Уйдёт только у тебя.': 'It goes only for you.',

  /* ═══ ПЕРЕПИСКА ГРУППЫ (windows/group.html) ══════════════════ */

  'Группа открыта отдельным окном. Закрой его, чтобы вернуться к списку.':
    'This group is a separate window. Close it to go back to the list.',
  'Не указано, какая группа': 'No group specified',
  'Группа':        'Group',
  'Группа #{н}':   'Group #{н}',
  'Уйдёт у всех в группе.': 'It goes for everyone in the group.',
  'Удалять можно только свои сообщения': 'You can only delete your own messages',
  'Чужие сообщения оставлены: их удаляет автор':
    'Other people’s messages were kept: only their author can delete them',
  'Войти в «{имя}»?':  'Join “{имя}”?',
  'группу':            'this group',
  'группы':            'this group',
  'Ты в группе':       'You are in the group',
  'Только посмотреть': 'Just look around',
  'Аудиозвонок группе':  'Voice call the group',
  'Видеозвонок группе':  'Video call the group',
  'Информация о группе': 'Group info',
  'Выйти из группы':     'Leave the group',
  'Выйти из «{имя}»?':   'Leave “{имя}”?',
  'Вышла из группы':     'You left the group',
  'Остаться':            'Stay',
  'Не вышло':            'Did not work'

});
