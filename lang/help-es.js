/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-es.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('es', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Publicaciones, vídeos y clips redondos. Desde aquí se abren también los comentarios y las reacciones.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Conversaciones privadas, mensajes de voz y vídeos redondos, guardados.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Comunidades públicas: un chat común, un feed de eventos, los miembros.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Señales de trading: dirección, entrada, objetivo y stop. El servidor vigila el precio por su cuenta.',
  'Объявления и обмен между людьми.':
    'Anuncios e intercambio entre personas.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Tasas de recompensa, el swap y todo por lo que llega CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'Tu saldo de CUBE, recargas, retiros e historial.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'Qué pasa con tus cubos y publicaciones, en números.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE es la moneda interna de la plataforma. El servidor la abona una vez al día por actividad: día activo, tus propias publicaciones y comentarios, la gente que invitaste. Dentro del swap el precio del CUBE está fijado: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'El servidor cierra las recompensas una vez al día. Cuenta: un día activo en línea, tus propias publicaciones y comentarios a partir de 10 mil visualizaciones, los invitados que pagaron la suscripción, y los extras por una semana, un mes y un año seguidos. Las tasas exactas están siempre al día en Ganar.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Para que nada se pueda inflar con trampas, el servidor mantiene límites diarios: 20 chats nuevos, 500 me gusta, 50 comentarios, 500 seguimientos. Las visualizaciones no se pueden inflar de ninguna manera, se cuentan solo por impresiones reales. Cuánto queda hoy se ve en Ganar.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'El swap cambia cripto por CUBE y al revés: 16 monedas y sus redes, el cambio se toma en el momento de la solicitud, el CUBE se cuenta a $0.50. Los ingresos y los retiros van por un proveedor de pagos; no tomamos ni guardamos las claves de nadie de bolsas ni de carteras. Solo se puede retirar lo ganado, no lo que se abonó de regalo.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'La cartera muestra tu saldo de CUBE, el historial y los botones de recarga y retiro. Recargar y retirar se hace por el swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Una llave abre posibilidades: Free es lo básico, Silver es ampliado, Gold da más cubos y analíticas. Las llaves se compran con CUBE. La suscripción Premium da una parte del fondo de recompensas según tu aporte del mes.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Una señal es una dirección, un punto de entrada, un objetivo y un stop. El servidor vigila el precio por su cuenta y cierra la señal en el objetivo o en el stop. No pedimos claves de bolsas: operas tú, en tu sitio.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Una reacción bajo una publicación le trae CUBE al autor. Se pueden dar hasta 500 me gusta al día; a partir de ahí el servidor simplemente deja de contarlos.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Un cubo es tu propio espacio: chat, feed, salas privadas y un temporizador de vida. Se crea con el «+» en el mundo. A la gente se la invita por enlace o por la llave del cubo.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Un cubo es un mundo aparte dentro de la plataforma: tiene su nombre, su portada, su chat, su feed y su tiempo de vida. Los cubos se ven en el mapa, se puede andar por ellos y se puede entrar en ellos.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Los grupos son comunidades públicas: un chat común, un feed de eventos y una lista de miembros. Puedes crear el tuyo en la sección Grupos.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'El juego con cubos se abre con un botón en el mapa. Las acciones se dividen en empujes (explosión, lanzamientos, lanzar al aire, fuegos artificiales, caos) y modos (dejar caer o sin gravedad, uno de los dos, imán, remolino, congelación). Los modos se suman y se mantienen hasta que se quitan. Todo esto funciona con el botón, con un gesto ante la cámara y con la voz.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'En el juego se pueden encender los gestos: un movimiento hacia el lado para lanzar, hacia arriba para lanzar al aire, hacia abajo para dejar caer, la palma hacia delante para la explosión, un círculo para el remolino, las dos manos para el caos. La imagen de la cámara no sale a ningún sitio, todo se calcula en tu propio dispositivo.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Los objetos no son solo cubos: cristal, triángulo, octaedro, esfera, pirámide, prisma, estrella, icosaedro, anillo, dólar, euro, yuan. Puedes poner tu propia imagen o tu propio vídeo de hasta 15 segundos; uno vertical 9:16 se recorta desde el centro en un cuadrado.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'El juego tiene ocho personajes: un gato, un vecino, un perro, un robot, un fantasma, un panda, una rana y un alienígena. Se les puede acariciar, hacer cosquillas y zarandear, y responden con voz y movimiento. Tu propia acción se añade con un botón: un nombre, un comando, una descripción y con qué hacerla, con la mano, el pie, la cabeza o todo el cuerpo.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'La apariencia cambia el color y la transparencia de las ventanas: el Color 1 son las cabeceras y las barras, el Color 2 es la ventana misma, el Color 3 es la portada y el marco del portafolio. Los fondos de las conversaciones se eligen ahí mismo, y puedes poner los tuyos en 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Casi todo funciona por voz: las secciones, el juego, las formas, los personajes, más de noventa comandos. La lista completa en los veinte idiomas está en la página Comandos de voz: se abre desde Apariencia o diciendo «comandos de voz». El interruptor para responder en voz alta o en silencio también está ahí.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Los documentos se abren desde el menú de la cuenta → Documentos. Son siete: las condiciones de uso, la política de privacidad, las reglas de la comunidad, recompensas y límites, swap y pagos, suscripción y llaves, cámara y micrófono. También por voz, basta decir «documentos».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Las invitaciones dan CUBE cuando el invitado paga la suscripción. Tu propio enlace está en la sección de invitaciones.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'El portafolio es el escaparate del perfil: portada, descripción y trabajos. El aspecto de la portada y del marco se cambia con el Color 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'Las analíticas muestran qué pasa con tus cubos y publicaciones: visualizaciones, reacciones, gente que llega.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'En el perfil puedes ocultar tu nombre y tu foto; en su lugar habrá un número anónimo. Pero eso te esconde de las demás personas, no del servidor: la dirección IP de una conexión la ve cualquier sitio de internet, el nuestro también. En la aplicación no hay nada que esconda la IP.',
  'Маркетплейс: объявления и обмен между людьми.':
    'El marketplace son anuncios e intercambio entre personas.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'Las publicaciones, los comentarios, la publicidad, los nombres y las descripciones pasan una revisión. Lo claramente prohibido no se publica, lo dudoso va a revisión manual. Esta revisión no toca el marketplace.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Hola. Soy el ayudante de la plataforma: respondo sobre los cubos, las recompensas, la cartera, el juego y los ajustes, y además busco cubos, personas y grupos. Pregunta con palabras, por ejemplo «cómo ganar», «busca el cubo Art», «quién es @anna». Para el resto del mundo está la pestaña NET aquí al lado.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE y dinero',
  'Что такое CUBE?':
    '¿Qué es CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE son los puntos internos de la plataforma. El servidor los abona una vez al día por actividad. En el swap el precio está fijado: 1 CUBE = $0.50. No es un valor financiero ni una promesa de ingresos.',
  'Как заработать?':
    '¿Cómo se gana?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Cuenta el servidor y cierra el día una vez cada 24 horas: día activo en línea, tus propias publicaciones y comentarios a partir de 10 mil visualizaciones, reacciones bajo tus publicaciones, invitados que pagaron la suscripción, y extras por una semana, un mes y un año seguidos. Las tasas exactas están en Ganar.',
  'Какие лимиты в сутки?':
    '¿Qué límites hay al día?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 chats nuevos, 500 me gusta, 50 comentarios, 500 seguimientos. Las visualizaciones no se pueden inflar de ninguna manera. La cuenta va por días UTC; si llegas al límite, la acción simplemente no se cuenta, y no hay castigo por ello.',
  'Что считается накруткой?':
    '¿Qué se considera trampa?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Lotes de cuentas, me gusta y seguimientos automáticos, compra de visualizaciones, acuerdos para reaccionar mutuamente. Las recompensas obtenidas así se retiran.',
  'Как работает свайп?':
    '¿Cómo funciona el swap?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'El swap cambia cripto por CUBE y al revés: 16 monedas y sus redes. El cambio de la cripto se toma en el momento de la solicitud, el CUBE se cuenta a $0.50. Recibir y enviar va por un proveedor de pagos.',
  'Как пополнить кошелёк?':
    '¿Cómo recargo la cartera?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Por el swap: creas una solicitud, recibes una dirección y un importe, y envías la transferencia desde tu propia cartera. Importa que la moneda y la red coincidan con la solicitud, si no, la transferencia no se puede recuperar.',
  'Как вывести деньги?':
    '¿Cómo retiro dinero?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'La solicitud de retiro se crea a tu dirección, y la comisión de la red la paga quien recibe. Lo revisamos y lo enviamos a mano, normalmente dentro de un día laborable.',
  'Почему вывести можно не всё?':
    '¿Por qué no puedo retirarlo todo?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Solo se retira lo ganado. Los CUBE abonados de regalo o como bonificación se gastan dentro de la plataforma pero no se retiran; si no, bastaría con repartir regalos y sacarlos en dinero.',
  'Какие монеты поддерживаются?':
    '¿Qué monedas se admiten?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 monedas y sus redes: BTC, ETH, USDT, USDC, BNB y otras once de las primeras por volumen. La lista completa con las redes está en la ventana del swap.',
  'Что если отправил не в ту сеть?':
    '¿Y si lo envié por la red equivocada?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Una transferencia en la cadena de bloques no se puede deshacer. Escribe a soporte enseguida: a veces se puede ayudar, pero no se puede prometer. Por eso la red de la solicitud y la de tu cartera tienen que coincidir.',
  'Берёте ли вы ключи от бирж?':
    '¿Pedís claves de las bolsas?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'No. No pedimos ni aceptamos claves de bolsas, ni frases semilla, ni acceso a tu cartera. Si alguien pide eso en nombre de la plataforma, es un estafador.',
  'Платите ли вы налоги за меня?':
    '¿Pagáis mis impuestos?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'No. Lo que debas al Estado lo decides y lo pagas tú. No somos agente fiscal.',
  'Ключи и подписка':
    'Llaves y suscripción',
  'Какие бывают ключи?':
    '¿Qué llaves hay?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free es lo básico, Silver es ampliado, Gold da más cubos y analíticas. La llave se sube con CUBE en la Tienda de llaves.',
  'Что даёт Premium?':
    '¿Qué da Premium?',
  'Долю в фонде наград, эфиры, свои сигналы, аналитику куба, создание файлов, продажу на маркетплейсе, чаевые и подарки, больше кубов и больше места под файлы. Полный список — в «Документах».':
    'Una parte del fondo de recompensas, directos, tus propias señales, analítica del cubo, creación de archivos, venta en el mercado, propinas y regalos, más cubos y más sitio para archivos. La lista completa está en «Documentos».',
  'Сколько стоит подписка?':
    '¿Cuánto cuesta la suscripción?',
  'Сильвер — 14 CUBE в месяц или 120 CUBE за год. Голд — 30 CUBE в месяц или 252 CUBE за год. Точные цифры всегда в окне подписки.':
    'Plata cuesta 14 CUBE al mes o 120 CUBE al año. Oro, 30 CUBE al mes o 252 CUBE al año. Las cifras exactas están siempre en la ventana de suscripción.',
  'Как отменить подписку?':
    '¿Cómo cancelo la suscripción?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'En cualquier momento: termina el periodo pagado y no se renueva. Lo pagado por el periodo actual no se devuelve, salvo cuando la ley exige la devolución.',
  'Я потерял ключ: что делать?':
    'Perdí mi llave, ¿qué hago?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'No se puede recuperar. No pedimos ni correo ni teléfono, así que no tenemos con qué comprobar que la cuenta es tuya. La llave es la cuenta; guárdala donde no la vayas a perder.',
  'Можно ли передать ключ другому?':
    '¿Puedo dar mi llave a otra persona?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Puedes, pero todo lo que hagan con ella cuenta como hecho por ti.',
  'Кубы и группы':
    'Cubos y grupos',
  'Что такое куб?':
    '¿Qué es un cubo?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Un cubo es un mundo aparte dentro de la plataforma: su nombre, su portada, su chat, su feed, salas privadas y un tiempo de vida. Los cubos se ven en el mapa y se puede entrar en ellos.',
  'Как создать куб?':
    '¿Cómo creo un cubo?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Con el «+» en el mundo o en Mi universo. Pones un nombre, una portada, el tipo y el tiempo de vida. A la gente se la invita por enlace o por la llave del cubo.',
  'Что такое таймер жизни куба?':
    '¿Qué es el temporizador de vida del cubo?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Un cubo vive un tiempo fijado y después se cierra. El plazo se elige al crearlo, de una hora a un año.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    '¿Qué son los grupos?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Comunidades públicas: un chat común, un feed de eventos y una lista de miembros.',
  'Как найти куб или человека?':
    '¿Cómo encuentro un cubo o a una persona?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Escríbelo aquí mismo: «busca el cubo Art», «@anna», «grupo de fotos». Buscaré en la plataforma y mostraré tarjetas: cubos, personas, grupos y directos que están en marcha ahora mismo.',
  'Лента и посты':
    'Feed y publicaciones',
  'Как выложить пост?':
    '¿Cómo publico algo?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Con el botón de crear en el feed. Se permite un vídeo, una imagen, un título y una descripción.',
  'Почему пост не опубликовался?':
    '¿Por qué no se publicó mi publicación?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'El texto no pasó la revisión previa. El mensaje indica el motivo: productos prohibidos, fraude, amenazas y demás. Las reglas están en Documentos, y si es un error, escribe a soporte.',
  'Что дают реакции?':
    '¿Qué dan las reacciones?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Una reacción bajo una publicación le trae CUBE al autor. Se pueden dar hasta 500 me gusta al día.',
  'Как пожаловаться на пост?':
    '¿Cómo denuncio una publicación?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Debajo de cada publicación y de cada mensaje hay un botón de denuncia. La denuncia va a revisión manual.',
  'Сколько просмотров нужно для начисления?':
    '¿Cuántas visualizaciones hacen falta para cobrar?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'A partir de 10 mil impresiones reales: tus propias publicaciones y comentarios empiezan a traer CUBE desde ese umbral.',
  'Игра с кубами':
    'El juego con cubos',
  'Как играть кубами?':
    '¿Cómo se juega con los cubos?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'El botón del juego está en el mapa. Los cubos vuelan dentro de unas paredes y no pueden salir de ellas. Las acciones se pulsan con un botón, se muestran con la mano ante la cámara o se dicen en voz alta.',
  'Что такое режимы и толчки?':
    '¿Qué son los modos y los empujes?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Los empujes son explosión, lanzamientos, lanzar al aire, fuegos artificiales y caos: van una vez y funcionan por encima de todo. Los modos se mantienen hasta que se quitan y se suman: gravedad (dejar caer O sin gravedad), imán, remolino, congelación.',
  'Как работают жесты рукой?':
    '¿Cómo funcionan los gestos con la mano?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Un movimiento hacia el lado es un lanzamiento, hacia arriba es lanzar al aire, hacia abajo es dejar caer, la palma hacia delante es la explosión, un círculo es el remolino, las dos manos son el caos. Los fotogramas se procesan en tu propio dispositivo y no salen a ningún sitio.',
  'Какие есть формы?':
    '¿Qué formas hay?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Cubo, cristal, triángulo, octaedro, esfera, pirámide, prisma, estrella, icosaedro, anillo, dólar, euro, yuan, y tu propia imagen. Además «mezclado», donde cada objeto tiene su propia forma.',
  'Как поставить свою картинку?':
    '¿Cómo pongo mi propia imagen?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'En el juego → Forma del objeto → la casilla «Mía». Lo mejor es una cuadrada; una vertical 9:16 se recorta desde el centro. Pulsa «Mía» otra vez para cambiarla.',
  'Можно ли поставить видео?':
    '¿Se puede usar un vídeo?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Sí, de hasta 15 segundos. Más largo no se acepta. El vídeo sobrevive a una recarga de la página.',
  'Кто такие персонажи?':
    '¿Quiénes son los personajes?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Ocho personajes: un gato, un vecino, un perro, un robot, un fantasma, un panda, una rana, un alienígena. Se les puede acariciar, hacer cosquillas y zarandear, y responden con voz y movimiento.',
  'Как добавить своё действие?':
    '¿Cómo añado mi propia acción?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Con un botón en la sección de personajes: un nombre, un comando, una descripción y con qué hacerla, con la mano, el pie, la cabeza o todo el cuerpo. La acción en sí se elige entre dieciséis efectos ya hechos.',
  'Как крутятся предметы?':
    '¿Cómo giran los objetos?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Cinco modos: a favor del eje, en contra del eje, por arriba, por abajo, y a lo loco. El giro de un lanzamiento se suma al modo elegido.',
  'Как начать эфир?':
    '¿Cómo empiezo un directo?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'El botón Directo en el feed, o el comando de voz «directo». Eliges un título y un modo, y ya estás en el aire. Los espectadores reciben la imagen directamente de ti.',
  'Какие режимы эфира?':
    '¿Qué modos de directo hay?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Cámara y cubos: la escena encima de la imagen de la cámara, con los gestos funcionando. Solo cubos: la escena sin cámara. Directo limpio: solo la cámara, sin comentarios, reacciones ni regalos.',
  'Сколько зрителей выдержит эфир?':
    '¿A cuánta gente aguanta un directo?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'La imagen va directamente del autor a cada espectador, así que depende de la conexión del autor: en una línea de casa diez o quince personas miran con comodidad. Una sala mayor necesita un servidor repetidor.',
  'Что такое подарки?':
    '¿Qué son los regalos?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Treinta regalos, desde una Rosa por 1 CUBE hasta un Cubo de Leyenda por 1000. Un regalo es una transferencia de CUBE al autor por entero; la plataforma no se queda con nada.',
  'Как закончить эфир?':
    '¿Cómo termino un directo?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'El botón Terminar directo en la cabecera de la ventana, visible en todos los modos. Cerrar la ventana con la cruz no detiene el directo: sigue hasta que pulses Terminar.',
  'Голос и языки':
    'Voz e idiomas',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    '¿Qué comandos de voz hay?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Más de noventa: secciones, ventanas, crear, el feed, el juego, las formas, los personajes, los controles. La lista completa con buscador está en la página Comandos de voz: menú de la cuenta → Comandos de voz, o en Apariencia, o simplemente di «comandos de voz».',
  'На каких языках работает голос?':
    '¿En qué idiomas funciona la voz?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'En veinte: ruso, inglés (también el de la India), ucraniano, alemán, francés (y el de Canadá), español (y el de Latinoamérica), italiano, portugués, polaco, turco, árabe (y el del Golfo), vietnamita, chino, japonés, coreano, hindi. El idioma se elige en la página de comandos y en Apariencia.',
  'Как включить микрофон?':
    '¿Cómo enciendo el micrófono?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'El botón del micrófono está en la barra de arriba. Lo pulsas y escucha, lo pulsas otra vez y para.',
  'Как выключить озвучку?':
    '¿Cómo apago las respuestas habladas?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'En la página Comandos de voz hay un interruptor entre responder en voz alta y responder en silencio. La voz escucha igual; solo cambia la respuesta.',
  'Куда уходит мой голос?':
    '¿Adónde va mi voz?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'El reconocimiento lo hace el propio navegador. Chrome y los navegadores basados en él envían el sonido a los servidores de Google; así está hecho su reconocimiento y la plataforma no decide nada en eso. Si no te conviene, no enciendas el micrófono: todo está también en botones.',
  'Как поменять тему?':
    '¿Cómo cambio el tema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Apariencia → Tema: oscuro, claro, o Cámara, donde el fondo es la imagen de tu cámara.',
  'Что такое Цвет 1, 2 и 3?':
    '¿Qué son el Color 1, 2 y 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'El Color 1 son las cabeceras, las barras de escritura y las pestañas. El Color 2 es la ventana misma: el fondo del chat y la lista de comentarios. El Color 3 es la portada y el marco del portafolio. Cada uno tiene su propio control de transparencia.',
  'Как поставить обои?':
    '¿Cómo pongo un fondo?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Apariencia → Fondo: un conjunto de fondos listos o tu propia imagen en 9:16. El Color 2 se pone encima del fondo como un tinte, y el control decide con qué fuerza.',
  'Правила и безопасность':
    'Reglas y seguridad',
  'Что нельзя выкладывать?':
    '¿Qué no se puede publicar?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Material con menores, amenazas y llamadas a la violencia, incitación al odio, fraude, productos prohibidos, obra ajena sin derecho a ella, hacerse pasar por otro, spam y actividad falsa. Al completo, en las Reglas de la comunidad.',
  'Как работает модерация?':
    '¿Cómo funciona la moderación?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'Las publicaciones, los comentarios, los mensajes de grupo, los nombres y las descripciones se revisan en el servidor antes de publicarse. Lo claramente prohibido no se publica, lo dudoso va a revisión manual. El marketplace y las conversaciones privadas no se revisan.',
  'Виден ли мой IP?':
    '¿Se ve mi IP?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Sí, el servidor la ve, igual que cualquier sitio de internet: sin IP no sabría adónde mandar la respuesta. El modo oculto esconde tu nombre y tu foto de las demás personas, pero no del servidor.',
  'Что вы храните обо мне?':
    '¿Qué guardáis sobre mí?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'La llave de la cuenta, el perfil que rellenaste tú, tu contenido, los contadores diarios y los datos técnicos de la conexión. Ni correo, ni teléfono, ni contraseñas, ni claves de carteras.',
  'Куда жаловаться?':
    '¿Dónde reclamo?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Sobre un contenido, con el botón de denuncia que hay debajo. Sobre cualquier otra cosa, por soporte dentro de la plataforma.',
  'Где документы?':
    '¿Dónde están los documentos?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Menú de la cuenta → Documentos. Son siete: las condiciones, la política de privacidad, las reglas de la comunidad, recompensas y límites, swap y pagos, suscripción y llaves, cámara y micrófono.',
  'Что такое карта?':
    '¿Qué es el mapa?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'El mapa de la plataforma: 177 países y 1150 ciudades con coordenadas reales, la posición del sol calculada para la hora actual, el lado nocturno y el amanecer exactamente donde están en el cielo. Veinte vistas: desde el espacio, la Tierra de noche, día y noche, las calles de OpenStreetMap, el tiempo, los terremotos, los husos horarios, nuestros cubos y directos. Se abre desde el menú de la cuenta o diciendo «mapa».',
  'Как проложить маршрут на карте?':
    '¿Cómo trazo una ruta en el mapa?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Toca el inicio en el mapa, luego el final, y elige uno de los veinte caminos. El círculo máximo y la loxodrómica, la forma en que de verdad se vuela y se navega. Solo por tierra y solo por agua, una búsqueda real de camino por los continentes sin un solo paso al otro elemento. Por la sombra y por la luz, siguiendo el lado nocturno. Pasando por cubos, directos y personas, por nuestras chinchetas. La ruta por calles la calcula el motor externo OSRM; si no responde, lo decimos.',
  'Видно ли меня на карте?':
    '¿Se me ve en el mapa?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Solo si tú mismo pusiste la chincheta «estoy aquí». Vive media hora y se borra sola, las coordenadas se redondean a un kilómetro antes incluso de enviarse al servidor, y «quitarme del mapa» borra el registro en vez de esconderlo. Sin esa chincheta no estás en el mapa en absoluto.',
  'Есть ли на карте спутник и пробки?':
    '¿El mapa tiene imágenes de satélite y tráfico?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'No. Las imágenes de satélite y el tráfico los sirven proveedores de pago con una clave. El sitio para esas capas está listo: pones una clave y se encienden. Mientras no haya clave, el mapa lo dice claramente en vez de dibujar una mentira bonita.',
  'Что такое забег по улице?':
    '¿Qué es la carrera por la calle?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Un salto dentro del mapa: vista en primera persona, los edificios y los giros reales de tu propia calle. Corres tú: deslizas hacia el lado para cambiar de carril, y en un cruce para girar, hacia arriba para saltar, hacia abajo para deslizarte. Recoges cubos y esquivas barreras y rayos. Por el camino te encuentras directos, cubos y escaparates de otras personas. También hay un paseo tranquilo con mando. Se abre desde el menú de la cuenta, desde el mapa con el botón A la calle, o diciendo «carrera».',
  'Откуда берутся дома в забеге?':
    '¿De dónde salen los edificios de la carrera?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'De OpenStreetMap: contornos y número de plantas reales, carreteras reales con sus anchos y sus giros. Contamos una planta como tres metros; si falta el número de plantas, la altura se saca de la huella del edificio. No hay fotografías de las calles, esas las sirven proveedores de pago. Si el servidor del mapa está ocupado, el juego lo dice con honestidad y construye un barrio nuestro.',
  'Что такое шопинг в маркетплейсе?':
    '¿Qué son las compras en el marketplace?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'La segunda sección del marketplace, para cosas en vez de archivos: dieciséis categorías, de la ropa al arte, una ficha con la marca, tallas, colores, características y hasta veinte fotos. Cada ficha tiene una figura girando con el nombre de la marca encima, cualquiera de las veinte formas. La sección no toca el dinero: el pago y el envío son entre personas, por eso dice «escribir al vendedor» y no «comprar con CUBE».',
  'Игры, чаты и новое':
    'Juegos, chats y novedades',
  'Сколько игр в зале?':
    '¿Cuántos juegos hay en el salón?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Ocho, y todos se pueden jugar: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Se manejan con el dedo y con el teclado.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    '¿Los juegos dan CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'No. Los juegos dan puntos y un récord personal, guardados en tu navegador. El CUBE lo abona el servidor por visualizaciones y del fondo común; acuñar monedas en un navegador sería mentira.',
  'Как играть в DataMine?':
    '¿Cómo se juega a DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Un campo de ocho por ocho. Tocas una casilla y excavas los datos; el número indica cuántos virus hay al lado. Una pulsación larga pone una bandera. Tres vidas y luego una capa nueva.',
  'Как играть в CipherBreak?':
    '¿Cómo se juega a CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Adivina un código de cuatro símbolos. Tras un intento, un círculo lleno significa que el símbolo está en su sitio, uno vacío que está en el código pero en otro lugar. Ocho intentos.',
  'Как играть в Phantom Escape?':
    '¿Cómo se juega a Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Reúne cinco llaves y sal por la puerta. Los fantasmas te siguen por el camino más corto, y en cada piso hay más.',
  'Как играть в Block Trade?':
    '¿Cómo se juega a Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Minuto y medio, con 1000 en la mano. Compra más barato, vende más caro. Tu puntuación es todo lo que pase de mil.',
  'Как играть в TrustChain?':
    '¿Cómo se juega a TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Toca los bloques en orden ascendente mientras corre el reloj. Un error y la cadena se rompe. Cada ronda la cadena se alarga.',
  'Как играть в CubeBuilder?':
    '¿Cómo se juega a CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'La losa se mueve de lado y un toque la suelta. Lo que sobresale se cae, y la losa se estrecha. Si fallas la torre, se acabó.',
  'Что показывает строка курсов?':
    '¿Qué muestra la cinta de precios?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Treinta monedas con su precio y el cambio del día. Los datos llegan por nuestro servidor, que guarda medio minuto en caché. La cinta no se arrastra: en la pantalla cabe un número entero de celdas y cambian cada pocos segundos.',
  'Что значит число кубов в шапке?':
    '¿Qué significa el número de cubos en la cabecera?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Cuántos cubos hay ahora mismo en tu mundo, los que ves delante de ti. No el número total de cubos de la plataforma.',
  'Можно ли войти вторым аккаунтом?':
    '¿Puedo entrar con una segunda cuenta?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Sí. Menú de la cuenta → Añadir una cuenta: la llave actual se queda en la lista, y puedes volver a ella con un toque desde el mismo menú. Se recuerdan hasta ocho.',
  'Зачем «Сохранить» в окне игры?':
    '¿Para qué sirve Guardar en la ventana del juego?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Recuerda la forma del objeto, el personaje, los gestos y el tamaño. La próxima vez que entres, todo estará donde lo dejaste.',
  'Чем режим отличается от толчка?':
    '¿En qué se diferencia un modo de un empuje?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Un modo se mantiene hasta que lo apagas con un segundo toque, y se queda encendido. Un empuje va una vez y no se enciende; solo deja una marca fina de que fue el último pulsado.',
  'Почему кубы больше не исчезают?':
    '¿Por qué los cubos ya no desaparecen?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Los cubos de muestra del escaparate vivían poco, cinco y quince minutos. Ahora les damos al menos medio día, y se reinician antes de agotarse. Los cubos de verdad viven exactamente lo que se les dio al crearlos.',
  'Как сделать фото прямо в чат?':
    '¿Cómo hago una foto directamente en una conversación?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'El clip → Cámara abre nuestra propia captura. Un toque hace una foto, una pulsación larga graba vídeo de hasta un minuto. La galería es la opción de al lado, Foto o vídeo.',
  'Что такое галерея переписки?':
    '¿Qué es la galería de la conversación?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'La lupa en la cabecera de una conversación abre la búsqueda y una balda encima: fotos, vídeos, audios y enlaces de esa conversación. Se reúne de los propios mensajes y nada sale a ningún sitio.',
  'Как удалить сразу несколько сообщений?':
    '¿Cómo borro varios mensajes a la vez?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Una pulsación larga sobre un mensaje enciende la selección, después marcas los que quieras y pulsas Borrar en la barra de abajo. Hasta cien de una vez.',
  'Можно ли изменить своё сообщение?':
    '¿Puedo editar mi propio mensaje?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Sí, los tuyos y solo los de texto: menú del mensaje → Editar. Al lado aparece la marca «editado». La conversación no se cierra mientras lo haces.',
  'Что такое сторис?':
    '¿Qué son las historias?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Publicaciones cortas que duran un día, encima de la lista de conversaciones: una foto o un vídeo de hasta un minuto. Se ven una tras otra y desaparecen solas al cabo de un día.',
  'Сколько фото можно в группу?':
    '¿Cuántas fotos caben en un grupo?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Hasta siete fotos, o un vídeo de hasta un minuto. Además de un icono del conjunto y etiquetas bajo la descripción.',
  'Что такое теги группы?':
    '¿Qué son las etiquetas de grupo?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Unas pocas palabras separadas por comas, por las que el grupo se encuentra en la búsqueda.',
  'Видно ли участников группы?':
    '¿Se ven los miembros del grupo?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Lo decide el dueño al crearlo: la lista de miembros se puede mostrar a todos o dejarla visible solo para el dueño.',
  'Почему поле ссылки на видео убрали?':
    '¿Por qué se quitó el campo de enlace a vídeo?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Un enlace ajeno se rompía cuando lo borraban en el otro extremo, y la plataforma no podía responder por eso. Un vídeo se sube como archivo a nuestro propio almacenamiento.',
  'Сколько длится видео в посте?':
    '¿Cuánto puede durar un vídeo en una publicación?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Por ahora un archivo de hasta 50 MB. En un servidor mayor habrá escalones: 15 segundos, un minuto, tres minutos y quince.',
  'Что делает кнопка «Чаевые автору»?':
    '¿Qué hace el botón Propina al autor?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Transfiere CUBE de tu saldo al autor de la publicación por entero, sin parte para la plataforma. El importe es 1, 5, 10, 25 o el tuyo propio.',
  'Как пожаловаться на видео?':
    '¿Cómo denuncio un vídeo?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Los tres puntos bajo el vídeo → Denunciar: eliges un motivo y puedes añadir tus propias palabras. Va a revisión manual.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    '¿Cómo comparto una publicación?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Los tres puntos bajo el vídeo → Compartir. Recibes un enlace que puedes mandar a quien quieras.',
  'Куда девается «Сохранить»?':
    '¿Dónde deja las cosas Guardar?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'En tu perfil, en la balda de guardados, bajo el icono del marcador debajo de las pestañas del perfil.',
  'Что видно в моём профиле?':
    '¿Qué se ve en mi perfil?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Dos pestañas: Shorts para tus vídeos cortos, Publicaciones para todo lo demás. Al tocar una ficha se abre igual que en el feed. Editar y borrar solo los ve el autor.',
  'Как изменить профиль?':
    '¿Cómo edito mi perfil?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'El botón del lápiz en tu propio perfil: nombre, @usuario, descripción, tipo de cuenta, estado, enlaces y dirección.',
  'Чем бизнес-аккаунт отличается?':
    '¿En qué se diferencia una cuenta de empresa?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Pública significa que todos te ven. Oculta significa que tu nombre y tu foto están escondidos de las demás personas. Empresa añade una descripción de tu negocio, enlaces y una dirección.',
  'Что показывает «онлайн» в шапке?':
    '¿Qué muestra «en línea» en la cabecera?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Cuánta gente hay ahora mismo en la plataforma según el servidor. Se refresca cada medio minuto.',
  'Закрывается ли игра вместе с эфиром?':
    '¿El juego se cierra junto con el directo?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Sí. Si el directo tenía cubos, el juego se apaga solo cuando termina el directo; si no, los objetos seguían volando sobre un mapa vacío.',
  'Есть ли смайлы в эфире?':
    '¿Hay emojis en un directo?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Sí, el botón de emojis junto a la barra de escritura tiene toda la colección común, la misma que en las conversaciones.',
  'Что такое «Все вопросы»?':
    '¿Qué es Todas las preguntas?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'El manual completo del ayudante: más de cien preguntas con respuestas, ordenadas por secciones, con búsqueda por título.',
  'Куда делась кнопка NET?':
    '¿Adónde fue el botón NET?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Se quitó. La plataforma no busca en el internet grande, y el botón prometía que sí. El ayudante responde sobre la plataforma y encuentra cubos, personas, grupos y directos.',
  'Почему звук повторялся дважды?':
    '¿Por qué el sonido se repetía dos veces?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Hablaban dos trozos de código distintos y ninguno cortaba al otro. Ahora cada frase cancela la anterior, y el mismo texto no se repite dos veces seguidas.',
  'Как выключить голос совсем?':
    '¿Cómo apago la voz del todo?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'En la página Comandos de voz hay un interruptor entre responder en voz alta y responder en silencio. Ahora la apaga de verdad: antes solo mandaba en una entrada y la voz la rodeaba.',
  'Что хранится только в моём браузере?':
    '¿Qué se guarda solo en mi navegador?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Los récords de los juegos, los ajustes del juego con cubos, el idioma elegido, el tema y el fondo, y la lista de tus propias cuentas. Nada de eso va al servidor.',
  'Почему просят подтвердить удаление?':
    '¿Por qué se me pide confirmar un borrado?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Porque no se puede deshacer. En las conversaciones se pregunta además qué copia quitar, solo la tuya o la de todos.',
  'Что такое «У всех» при удалении?':
    '¿Qué significa «Para todos» al borrar?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Para mí» esconde el mensaje de tu propia pantalla. «Para todos» pide al servidor que lo quite también a la otra persona.',
  'Сколько живёт сообщение с таймером?':
    '¿Cuánto vive un mensaje con plazo?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'Lo que hayas elegido: cinco minutos, una hora, un día, una semana o para siempre. El botón ∞ junto a la barra de escritura.',
  'Как переслать сообщение?':
    '¿Cómo reenvío un mensaje?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Menú del mensaje → Reenviar. Eliges a quién.',
  'Что делает «В избранное»?':
    '¿Qué hace Guardar en favoritos?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Mete el mensaje en Guardados, tu propio cuaderno con notas y cosas conservadas.',
  'Как найти сообщение в переписке?':
    '¿Cómo encuentro un mensaje en una conversación?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'La lupa en la cabecera de la conversación: busca en el texto y las flechas saltan entre coincidencias. La balda con fotos, vídeos, audios y enlaces está en el mismo sitio.',
  'Что такое «Пригласить в группу»?':
    '¿Qué es Invitar al grupo?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Un enlace de la información del grupo: quien lo abra entra en el grupo.',
  'Можно ли выйти из группы?':
    '¿Puedo salir de un grupo?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Sí, con un botón en la información del grupo. Si sale el dueño, el grupo no se borra.',
  'Сколько форм у предметов?':
    '¿Cuántas formas tienen los objetos?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Veinte, más tu propia imagen o vídeo encima de ellas, y el modo mezclado.',
  'Что такое шопинг?':
    '¿Qué son las compras?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'La segunda sección del marketplace, para cosas: dieciséis categorías, una ficha con la marca y hasta veinte fotos, y una figura girando con el nombre de la marca. El pago y el envío son entre personas.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Pregunta con palabras: por ejemplo «cómo ganar» o «busca el cubo Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    '¿Qué busco? Escribe algo así como «busca el cubo Art» o «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'No tengo respuesta sobre «{что}». Lo que sé es la plataforma: CUBE y recompensas, límites, el swap, la cartera, las llaves, las señales, los cubos y los grupos, el juego con cubos, los directos, la apariencia y los comandos de voz.'

});
