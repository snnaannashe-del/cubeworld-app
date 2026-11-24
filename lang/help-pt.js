/* ═══════════════════════════════════════════════════════════════════════
   HELP — справочник помощника

       lang/help-pt.js      (машинка — shared/lang.js, CW.довезти('help'))

   Сто двенадцать вопросов с ответами, короткие ответы по словам и
   названия разделов. Везёт это окно помощника, а не все страницы:
   тридцать килобайт на язык.

   Слова, по которым вопрос УЗНАЁТСЯ, здесь не нужны: вопрос узнаётся
   по словам самого перевода.

   Ключ — русская фраза из кода, её трогать нельзя. Правится только
   правая сторона.
   ═══════════════════════════════════════════════════════════════════════ */
CW.словарь('pt', {

  /* ── разделы программы и короткие ответы по словам ── */
  'Посты, видео и кружки. Отсюда же открываются комментарии и реакции.':
    'Publicações, vídeos e clipes redondos. Daqui abrem-se também os comentários e as reações.',
  'Личная переписка, голосовые и видеокружки, избранное.':
    'Conversas privadas, mensagens de voz e vídeos redondos, guardados.',
  'Публичные сообщества: общий чат, лента событий, участники.':
    'Comunidades públicas: um chat comum, um feed de eventos, os membros.',
  'Торговые сигналы: направление, вход, цель и стоп. Сервер сам следит за ценой.':
    'Sinais de trading: direção, entrada, alvo e stop. O servidor vigia o preço sozinho.',
  'Объявления и обмен между людьми.':
    'Anúncios e troca entre pessoas.',
  'Ставки начислений, свайп и всё, за что приходит CUBE.':
    'Taxas de recompensa, o swap e tudo por que chega CUBE.',
  'Баланс CUBE, пополнение, вывод и история.':
    'O teu saldo de CUBE, carregamentos, levantamentos e histórico.',
  'Что происходит с твоими кубами и постами в цифрах.':
    'O que se passa com os teus cubos e publicações, em números.',
  'CUBE: внутренняя валюта площадки. Её начисляет сервер раз в сутки за активность: активный день, свои посты и комментарии, приглашённые. В свайпе цена CUBE закреплена: 1 CUBE = $0.50.':
    'CUBE é a moeda interna da plataforma. O servidor credita-a uma vez por dia por atividade: dia ativo, as tuas publicações e comentários, as pessoas que convidaste. Dentro do swap o preço do CUBE está fixado: 1 CUBE = $0.50.',
  'Начисления сервер закрывает раз в сутки. Считаются: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки всегда свежие в разделе «Заработать».':
    'O servidor fecha as recompensas uma vez por dia. Conta: um dia ativo online, as tuas publicações e comentários a partir de 10 mil visualizações, convidados que pagaram a subscrição, e acréscimos por uma semana, um mês e um ano seguidos. As taxas exatas estão sempre atualizadas em Ganhar.',
  'Чтобы накрутками ничего нельзя было надуть, сервер держит суточные пределы: новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе, они считаются только по настоящим показам. Сколько осталось сегодня, видно в «Заработать».':
    'Para que nada possa ser inflado com batota, o servidor mantém limites diários: 20 conversas novas, 500 gostos, 50 comentários, 500 seguimentos. As visualizações não se inflam de maneira nenhuma, contam-se só por exibições reais. Quanto resta hoje vê-se em Ganhar.',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети, курс берётся на момент заявки, CUBE считается по $0.50. Приём и вывод идут через платёжного провайдера, чужие ключи от бирж и кошельков мы не берём и не храним. Вывести можно только заработанное, а не то, что начислено в подарок.':
    'O swap troca cripto por CUBE e ao contrário: 16 moedas e as suas redes, a cotação é tomada no momento do pedido, o CUBE conta-se a $0.50. As entradas e os levantamentos passam por um fornecedor de pagamentos; não aceitamos nem guardamos chaves de corretoras ou de carteiras de ninguém. Só se pode levantar o que foi ganho, não o que foi creditado de presente.',
  'Кошелёк показывает баланс CUBE, историю и кнопки пополнения и вывода. Пополнение и вывод, через свайп.':
    'A carteira mostra o teu saldo de CUBE, o histórico e os botões de carregar e levantar. Carregar e levantar faz-se pelo swap.',
  'Ключ открывает возможности: Free, база, Silver, расширенно, Gold, больше кубов и аналитика. Ключи покупаются за CUBE. Подписка Premium даёт долю в фонде наград по вкладу за месяц.':
    'Uma chave abre possibilidades: Free é o básico, Silver é alargado, Gold dá mais cubos e estatísticas. As chaves compram-se com CUBE. A subscrição Premium dá uma parte do fundo de recompensas conforme o teu contributo do mês.',
  'Сигнал: это направление, точка входа, цель и стоп. Сервер сам следит за ценой и закрывает сигнал по цели или стопу. Ключи от бирж мы не просим: торгуешь ты сам, у себя.':
    'Um sinal é uma direção, um ponto de entrada, um alvo e um stop. O servidor vigia o preço sozinho e fecha o sinal no alvo ou no stop. Não pedimos chaves de corretoras: negoceias tu, no teu sítio.',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500, дальше сервер их просто не считает.':
    'Uma reação debaixo de uma publicação traz CUBE ao autor. Podem dar-se até 500 gostos por dia; a partir daí o servidor simplesmente deixa de os contar.',
  'Куб: твоё пространство: чат, лента, приватные комнаты и таймер жизни. Создаётся через «+» в мире. Людей зовут по ссылке или ключу куба.':
    'Um cubo é o teu próprio espaço: chat, feed, salas privadas e um temporizador de vida. Cria-se com o «+» no mundo. As pessoas são convidadas por ligação ou pela chave do cubo.',
  'Куб: это отдельный мир внутри площадки: у него своё имя, обложка, чат, лента и срок жизни. Кубы видно на карте, по ним можно ходить и в них можно вступать.':
    'Um cubo é um mundo à parte dentro da plataforma: tem o seu nome, capa, chat, feed e tempo de vida. Os cubos veem-se no mapa, pode andar-se por eles e pode entrar-se neles.',
  'Группы: публичные сообщества: общий чат, лента событий и список участников. Создать свою можно в разделе «Группы».':
    'Os grupos são comunidades públicas: um chat comum, um feed de eventos e uma lista de membros. Podes criar o teu na secção Grupos.',
  'Игра с кубами открывается кнопкой на карте. Действия делятся на толчки (взрыв, броски, подбросить, фейерверк, хаос) и режимы (уронить или невесомость, одно из двух, магнит, вихрь, заморозка). Режимы складываются и держатся, пока их не снимут. Всё это работает кнопкой, жестом перед камерой и голосом.':
    'O jogo com cubos abre-se com um botão no mapa. As ações dividem-se em empurrões (explosão, lançamentos, atirar ao ar, fogo de artifício, caos) e modos (deixar cair ou sem gravidade, um dos dois, íman, remoinho, congelar). Os modos somam-se e mantêm-se até serem desligados. Tudo isto funciona com o botão, com um gesto à frente da câmara e com a voz.',
  'В игре можно включить жесты: взмах в сторону, бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Картинка с камеры никуда не уходит, всё считается прямо на твоём устройстве.':
    'No jogo podem ligar-se os gestos: um movimento para o lado é lançar, para cima é atirar ao ar, para baixo é deixar cair, a palma para a frente é a explosão, um círculo é o remoinho, as duas mãos são o caos. A imagem da câmara não vai para lado nenhum, tudo é calculado no teu próprio aparelho.',
  'Предметы бывают не только кубами: кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань. Можно поставить свою картинку или своё видео до 15 секунд, вертикальное 9:16 обрежется по центру в квадрат.':
    'Os objetos não são só cubos: cristal, triângulo, octaedro, esfera, pirâmide, prisma, estrela, icosaedro, anel, dólar, euro, yuan. Podes pôr a tua própria imagem ou o teu próprio vídeo até 15 segundos; um vertical 9:16 é cortado a partir do centro num quadrado.',
  'В игре есть восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка и пришелец. Их можно гладить, щекотать и тормошить, они отвечают голосом и движением. Своё действие добавляется кнопкой: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом.':
    'O jogo tem oito personagens: um gato, um vizinho, um cão, um robô, um fantasma, um panda, uma rã e um extraterrestre. Pode fazer-se-lhes festas, cócegas e sacudi-los, e respondem com voz e movimento. A tua própria ação acrescenta-se com um botão: um nome, um comando, uma descrição e com que a fazer, com a mão, o pé, a cabeça ou o corpo todo.',
  'Оформление меняет цвет и прозрачность окон: Цвет 1, шапки и строки, Цвет 2, само окно, Цвет 3, обложка и рамка портфолио. Обои для переписки выбираются там же, можно поставить свои в 9:16.':
    'O aspeto muda a cor e a transparência das janelas: a Cor 1 são os cabeçalhos e as barras, a Cor 2 é a própria janela, a Cor 3 é a capa e a moldura do portefólio. Os fundos das conversas escolhem-se no mesmo sítio, e podes pôr os teus em 9:16.',
  'Голосом работает почти всё: разделы, игра, формы, персонажи, больше девяноста команд. Полный список на всех двадцати языках, на странице «Голосовые команды»: открывается из «Оформления» или голосом «голосовые команды». Там же переключатель, отвечать вслух или молча.':
    'Quase tudo funciona por voz: as secções, o jogo, as formas, as personagens, mais de noventa comandos. A lista completa nas vinte línguas está na página Comandos de voz: abre-se a partir de Aspeto ou dizendo «comandos de voz». O interruptor para responder em voz alta ou em silêncio também está lá.',
  'Документы открываются из кабинета: меню аккаунта → «Документы». Их семь: пользовательское соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон. Можно и голосом, скажи «документы».':
    'Os documentos abrem-se a partir do menu da conta → Documentos. São sete: as condições de utilização, a política de privacidade, as regras da comunidade, recompensas e limites, swap e pagamentos, subscrição e chaves, câmara e microfone. Também por voz, basta dizer «documentos».',
  'Приглашения дают CUBE, когда приглашённый оплачивает подписку. Своя ссылка, в разделе приглашений.':
    'Os convites dão CUBE quando o convidado paga a subscrição. A tua própria ligação está na secção de convites.',
  'Портфолио: витрина профиля: обложка, описание и работы. Оформление обложки и рамки меняется Цветом 3.':
    'O portefólio é a montra do perfil: capa, descrição e trabalhos. O aspeto da capa e da moldura muda-se com a Cor 3.',
  'Аналитика показывает, что происходит с кубами и постами: просмотры, реакции, приток людей.':
    'As estatísticas mostram o que se passa com os teus cubos e publicações: visualizações, reações, gente que chega.',
  'В профиле можно скрыть имя и аватар, вместо них будет анонимный номер. Но это прячет тебя от других людей, а не от сервера: IP-адрес соединения видит любой сайт в интернете, и наш тоже. Ничего, что прячет IP, в приложении нет.':
    'No perfil podes esconder o teu nome e a tua foto; em vez deles fica um número anónimo. Mas isso esconde-te das outras pessoas, não do servidor: o endereço IP de uma ligação é visto por qualquer site da internet, o nosso também. Na aplicação não há nada que esconda o IP.',
  'Маркетплейс: объявления и обмен между людьми.':
    'O mercado são anúncios e troca entre pessoas.',
  'Посты, комментарии, реклама, имена и описания проходят проверку. Явно запрещённое не публикуется, спорное уходит на ручной разбор. Маркетплейс эта проверка не трогает.':
    'As publicações, os comentários, a publicidade, os nomes e as descrições passam por uma verificação. O claramente proibido não é publicado, o duvidoso vai para análise manual. O mercado não é tocado por esta verificação.',
  'Привет. Я помощник площадки: отвечаю про кубы, начисления, кошелёк, игру и настройки, а ещё ищу кубы, людей и группы. Спроси словами, например, «как заработать», «найди куб Art», «кто такой @anna». Про остальной мир, вкладка NET рядом.':
    'Olá. Sou o ajudante da plataforma: respondo sobre os cubos, as recompensas, a carteira, o jogo e as definições, e também encontro cubos, pessoas e grupos. Pergunta por palavras, por exemplo «como ganhar», «encontra o cubo Art», «quem é o @anna». Para o resto do mundo há o separador NET aqui ao lado.',

  /* ── CUBE и деньги · ключи и подписка ── */
  'CUBE и деньги':
    'CUBE e dinheiro',
  'Что такое CUBE?':
    'O que é o CUBE?',
  'CUBE: внутренние баллы площадки. Их начисляет сервер раз в сутки за активность. В свайпе цена закреплена: 1 CUBE = $0.50. Это не ценная бумага и не обещание дохода.':
    'CUBE são os pontos internos da plataforma. O servidor credita-os uma vez por dia por atividade. No swap o preço está fixado: 1 CUBE = $0.50. Não é um valor mobiliário nem uma promessa de rendimento.',
  'Как заработать?':
    'Como se ganha?',
  'Считает сервер и закрывает день раз в сутки: активный день в сети, свои посты и комментарии от 10 тысяч просмотров, реакции под твоими постами, приглашённые, оплатившие подписку, и надбавки за неделю, месяц и год подряд. Точные ставки, в «Заработать».':
    'Conta o servidor e fecha o dia uma vez em cada 24 horas: dia ativo online, as tuas publicações e comentários a partir de 10 mil visualizações, reações debaixo das tuas publicações, convidados que pagaram a subscrição, e acréscimos por uma semana, um mês e um ano seguidos. As taxas exatas estão em Ganhar.',
  'Какие лимиты в сутки?':
    'Que limites há por dia?',
  'Новых чатов 20, лайков 500, комментариев 50, подписок 500. Просмотры не накручиваются вовсе. Счёт идёт по суткам UTC; упёрся, действие просто не засчитывается, наказания за это нет.':
    '20 conversas novas, 500 gostos, 50 comentários, 500 seguimentos. As visualizações não se inflam de maneira nenhuma. A contagem vai por dias UTC; se chegares ao limite, a ação simplesmente não conta, e não há castigo por isso.',
  'Что считается накруткой?':
    'O que conta como batota?',
  'Пачки аккаунтов, автоматические лайки и подписки, покупка просмотров, сговор ради взаимных реакций. Начисления, полученные так, списываются.':
    'Lotes de contas, gostos e seguimentos automáticos, compra de visualizações, combinações para reagir uns aos outros. As recompensas obtidas assim são retiradas.',
  'Как работает свайп?':
    'Como funciona o swap?',
  'Свайп меняет крипту на CUBE и обратно: 16 монет и их сети. Курс крипты берётся на момент заявки, CUBE считается по $0.50. Приём и отправка, через платёжного провайдера.':
    'O swap troca cripto por CUBE e ao contrário: 16 moedas e as suas redes. A cotação da cripto é tomada no momento do pedido, o CUBE conta-se a $0.50. Receber e enviar passa por um fornecedor de pagamentos.',
  'Как пополнить кошелёк?':
    'Como carrego a carteira?',
  'Через свайп: создаёшь заявку, получаешь адрес и сумму, отправляешь перевод со своего кошелька. Важно, чтобы монета и сеть совпали с заявкой, иначе перевод не вернуть.':
    'Pelo swap: crias um pedido, recebes um endereço e um valor, e envias a transferência da tua própria carteira. É importante que a moeda e a rede coincidam com o pedido, senão a transferência não se recupera.',
  'Как вывести деньги?':
    'Como levanto dinheiro?',
  'Заявка на вывод создаётся на твой адрес, комиссию сети платит получатель. Вручную проверяем и отправляем, обычно в течение рабочего дня.':
    'O pedido de levantamento é criado para o teu endereço, e a comissão da rede é paga por quem recebe. Verificamos e enviamos à mão, normalmente dentro de um dia útil.',
  'Почему вывести можно не всё?':
    'Porque não posso levantar tudo?',
  'Выводится только заработанное. CUBE, начисленные в подарок или бонусом, тратятся внутри площадки, но не выводятся, иначе достаточно было бы раздать подарки и вывести их деньгами.':
    'Só se levanta o que foi ganho. Os CUBE creditados de presente ou como bónus gastam-se dentro da plataforma mas não se levantam; senão bastava distribuir presentes e tirá-los em dinheiro.',
  'Какие монеты поддерживаются?':
    'Que moedas são aceites?',
  '16 монет и их сети: BTC, ETH, USDT, USDC, BNB и ещё одиннадцать из первой десятки по обороту. Полный список и сети, в окне свайпа.':
    '16 moedas e as suas redes: BTC, ETH, USDT, USDC, BNB e mais onze das primeiras por volume. A lista completa com as redes está na janela do swap.',
  'Что если отправил не в ту сеть?':
    'E se enviei pela rede errada?',
  'Перевод в блокчейне необратим. Напиши в поддержку сразу: иногда помочь можно, но обещать этого нельзя. Поэтому сеть в заявке и в кошельке должны совпадать.':
    'Uma transferência na cadeia de blocos não se desfaz. Escreve ao apoio já: às vezes dá para ajudar, mas não se pode prometer. Por isso a rede do pedido e a da tua carteira têm de coincidir.',
  'Берёте ли вы ключи от бирж?':
    'Aceitam chaves de corretoras?',
  'Нет. Ни ключей от бирж, ни seed-фраз, ни доступа к кошельку мы не просим и не принимаем. Если кто-то от имени площадки просит такое, это мошенник.':
    'Não. Não pedimos nem aceitamos chaves de corretoras, nem frases-semente, nem acesso à tua carteira. Se alguém pedir isso em nome da plataforma, é um burlão.',
  'Платите ли вы налоги за меня?':
    'Pagam os meus impostos?',
  'Нет. Что должен государству, решаешь и платишь сам. Мы не налоговый агент.':
    'Não. O que deves ao Estado decides e pagas tu. Não somos agente fiscal.',
  'Ключи и подписка':
    'Chaves e subscrição',
  'Какие бывают ключи?':
    'Que chaves existem?',
  'Free: база, Silver: расширенно, Gold, больше кубов и аналитика. Ключ повышается за CUBE в «Магазине ключей».':
    'Free é o básico, Silver é alargado, Gold dá mais cubos e estatísticas. A chave sobe com CUBE na Loja de chaves.',
  'Что даёт Premium?':
    'O que dá o Premium?',
  'Долю в фонде наград по вкладу за месяц, подключение внешних кошельков для отображения, статистику и рейтинг, приоритет в сигналах, значок в профиле и чате, закрытые Premium-кубы.':
    'Uma parte do fundo de recompensas conforme o teu contributo do mês, carteiras externas ligadas para mostrar, estatísticas e classificação, prioridade nos sinais, um emblema no perfil e no chat, e cubos Premium fechados.',
  'Сколько стоит подписка?':
    'Quanto custa a subscrição?',
  '$6.99 в месяц или $59.99 в год.':
    '$6.99 por mês ou $59.99 por ano.',
  'Как отменить подписку?':
    'Como cancelo a subscrição?',
  'В любой момент: она доработает оплаченный срок и не продлится. Оплаченное за текущий срок не возвращается, кроме случаев, когда возврат требует закон.':
    'A qualquer momento: cumpre o prazo pago e não se renova. O que foi pago pelo prazo atual não é devolvido, exceto quando a lei exige a devolução.',
  'Я потерял ключ: что делать?':
    'Perdi a minha chave, o que faço?',
  'Восстановить нельзя. Ни почты, ни телефона мы не спрашиваем, и убедиться, что аккаунт твой, нам нечем. Ключ, это и есть аккаунт, храни его там, где не потеряешь.':
    'Não se pode recuperar. Não pedimos nem email nem telefone, por isso não temos como confirmar que a conta é tua. A chave é a conta; guarda-a onde não a percas.',
  'Можно ли передать ключ другому?':
    'Posso dar a minha chave a outra pessoa?',
  'Можно, но всё, что сделают под ним, считается сделанным тобой.':
    'Podes, mas tudo o que fizerem com ela conta como feito por ti.',
  'Кубы и группы':
    'Cubos e grupos',
  'Что такое куб?':
    'O que é um cubo?',
  'Куб: отдельный мир внутри площадки: своё имя, обложка, чат, лента, приватные комнаты и срок жизни. Кубы видно на карте, в них можно вступать.':
    'Um cubo é um mundo à parte dentro da plataforma: nome próprio, capa, chat, feed, salas privadas e tempo de vida. Os cubos veem-se no mapa e pode entrar-se neles.',
  'Как создать куб?':
    'Como crio um cubo?',
  'Через «+» в мире или в «Моей вселенной». Задаёшь имя, обложку, тип и срок жизни. Людей зовут по ссылке или ключу куба.':
    'Com o «+» no mundo ou no Meu universo. Defines o nome, a capa, o tipo e o tempo de vida. As pessoas são convidadas por ligação ou pela chave do cubo.',
  'Что такое таймер жизни куба?':
    'O que é o temporizador de vida do cubo?',
  'Куб живёт заданное время и потом закрывается. Срок выбирается при создании, от часа до года.':
    'Um cubo vive um tempo definido e depois fecha. O prazo escolhe-se ao criá-lo, de uma hora a um ano.',

  /* ── лента, игра, эфиры ── */
  'Что такое группы?':
    'O que são os grupos?',
  'Публичные сообщества: общий чат, лента событий и список участников.':
    'Comunidades públicas: um chat comum, um feed de eventos e uma lista de membros.',
  'Как найти куб или человека?':
    'Como encontro um cubo ou uma pessoa?',
  'Напиши прямо здесь: «найди куб Art», «@anna», «группа фото». Я поищу по площадке и покажу карточками, кубы, людей, группы и эфиры, которые идут прямо сейчас.':
    'Escreve aqui mesmo: «encontra o cubo Art», «@anna», «grupo de fotografia». Procuro na plataforma e mostro cartões: cubos, pessoas, grupos e diretos que estão a acontecer agora mesmo.',
  'Лента и посты':
    'Feed e publicações',
  'Как выложить пост?':
    'Como publico uma publicação?',
  'Кнопкой создания в ленте. Можно видео, картинку, заголовок и описание.':
    'Com o botão de criar no feed. São permitidos um vídeo, uma imagem, um título e uma descrição.',
  'Почему пост не опубликовался?':
    'Porque é que a minha publicação não foi publicada?',
  'Текст не прошёл проверку перед публикацией. Причину показывает сообщение, запрещённые товары, мошенничество, угрозы и так далее. Правила, в «Документах», а если это ошибка, напиши в поддержку.':
    'O texto não passou a verificação antes de publicar. A mensagem indica o motivo: produtos proibidos, fraude, ameaças e assim por diante. As regras estão em Documentos, e se for um engano, escreve ao apoio.',
  'Что дают реакции?':
    'O que dão as reações?',
  'Реакция под постом приносит автору CUBE. Лайков в сутки можно поставить до 500.':
    'Uma reação debaixo de uma publicação traz CUBE ao autor. Podem dar-se até 500 gostos por dia.',
  'Как пожаловаться на пост?':
    'Como denuncio uma publicação?',
  'Кнопка жалобы есть под каждым постом и сообщением. Жалоба уходит на разбор человеком.':
    'Debaixo de cada publicação e de cada mensagem há um botão de denúncia. A denúncia vai para análise manual.',
  'Сколько просмотров нужно для начисления?':
    'Quantas visualizações são precisas para receber?',
  'От 10 тысяч настоящих показов, свои посты и комментарии начинают приносить CUBE с этого порога.':
    'A partir de 10 mil exibições reais: as tuas publicações e comentários começam a trazer CUBE a partir desse limiar.',
  'Игра с кубами':
    'O jogo com cubos',
  'Как играть кубами?':
    'Como se joga com os cubos?',
  'Кнопка игры на карте. Кубы летают внутри стен и не могут из них выйти. Действия нажимаются кнопкой, показываются рукой перед камерой или говорятся голосом.':
    'O botão do jogo está no mapa. Os cubos voam dentro de paredes e não conseguem sair delas. As ações carregam-se num botão, mostram-se com a mão à frente da câmara, ou dizem-se em voz alta.',
  'Что такое режимы и толчки?':
    'O que são modos e empurrões?',
  'Толчки: взрыв, броски, подбросить, фейерверк, хаос, разовые и работают поверх всего. Режимы держатся, пока их не снимут, и складываются: тяжесть (уронить ИЛИ невесомость), магнит, вихрь, заморозка.':
    'Os empurrões são explosão, lançamentos, atirar ao ar, fogo de artifício e caos: vão uma vez e funcionam por cima de tudo. Os modos mantêm-se até serem desligados e somam-se: gravidade (deixar cair OU sem gravidade), íman, remoinho, congelar.',
  'Как работают жесты рукой?':
    'Como funcionam os gestos com a mão?',
  'Взмах в сторону: бросок, вверх, подбросить, вниз, уронить, ладонь вперёд, взрыв, круг, вихрь, обе руки, хаос. Кадры разбираются прямо в твоём устройстве и никуда не уходят.':
    'Um movimento para o lado é um lançamento, para cima é atirar ao ar, para baixo é deixar cair, a palma para a frente é a explosão, um círculo é o remoinho, as duas mãos são o caos. Os fotogramas são tratados no teu próprio aparelho e não vão para lado nenhum.',
  'Какие есть формы?':
    'Que formas existem?',
  'Куб, кристалл, треугольник, октаэдр, шар, пирамида, призма, звезда, икосаэдр, кольцо, доллар, евро, юань, и своя картинка. Плюс «вразнобой», когда у каждого предмета своя форма.':
    'Cubo, cristal, triângulo, octaedro, esfera, pirâmide, prisma, estrela, icosaedro, anel, dólar, euro, yuan, e a tua própria imagem. Mais o «misturado», em que cada objeto tem a sua forma.',
  'Как поставить свою картинку?':
    'Como ponho a minha própria imagem?',
  'В игре → «Форма предметов» → плитка «Своя». Лучше квадрат; вертикальное 9:16 обрежется по центру. Нажми по «Своей» ещё раз, чтобы заменить.':
    'No jogo → Forma do objeto → o quadrado «Minha». O melhor é uma quadrada; uma vertical 9:16 é cortada a partir do centro. Carrega em «Minha» outra vez para a trocar.',
  'Можно ли поставить видео?':
    'Pode usar-se um vídeo?',
  'Да, до 15 секунд. Длиннее: откажет. Видео переживает перезагрузку страницы.':
    'Pode, até 15 segundos. Mais comprido não é aceite. O vídeo sobrevive a um recarregamento da página.',
  'Кто такие персонажи?':
    'Quem são as personagens?',
  'Восемь персонажей: кот, сосед, пёс, робот, призрак, панда, лягушка, пришелец. Их можно гладить, щекотать и тормошить, отвечают голосом и движением.':
    'Oito personagens: um gato, um vizinho, um cão, um robô, um fantasma, um panda, uma rã, um extraterrestre. Pode fazer-se-lhes festas, cócegas e sacudi-los, e respondem com voz e movimento.',
  'Как добавить своё действие?':
    'Como acrescento a minha própria ação?',
  'Кнопкой в разделе персонажей: название, команда, описание и чем выполнять, рукой, ногой, головой или всем телом. Само действие выбирается из шестнадцати готовых эффектов.':
    'Com um botão na secção das personagens: um nome, um comando, uma descrição e com que a fazer, com a mão, o pé, a cabeça ou o corpo todo. A ação em si escolhe-se entre dezasseis efeitos prontos.',
  'Как крутятся предметы?':
    'Como giram os objetos?',
  'Пять режимов: по оси, против оси, через верх, через низ и вразнос. Раскрут от броска добавляется поверх выбранного режима.':
    'Cinco modos: a favor do eixo, contra o eixo, por cima, por baixo, e à toa. O giro de um lançamento soma-se ao modo escolhido.',
  'Как начать эфир?':
    'Como começo um direto?',
  'Кнопка «Стримить» в ленте или голосом «стрим». Выбираешь название и режим, и ты в эфире. Зрители видят картинку напрямую от тебя.':
    'O botão Direto no feed, ou o comando de voz «direto». Escolhes um título e um modo, e estás no ar. Os espectadores recebem a imagem diretamente de ti.',
  'Какие режимы эфира?':
    'Que modos de direto existem?',
  'Камера и кубы: сцена поверх картинки с камеры, жесты работают. Только кубы, сцена без камеры. Чистый эфир, одна камера, без комментариев, реакций и подарков.':
    'Câmara e cubos: a cena por cima da imagem da câmara, com os gestos a funcionar. Só cubos: a cena sem câmara. Direto limpo: só a câmara, sem comentários, reações nem presentes.',
  'Сколько зрителей выдержит эфир?':
    'Quantos espectadores aguenta um direto?',
  'Картинка идёт напрямую от ведущего каждому зрителю, поэтому упирается в его интернет: на домашнем канале спокойно смотрят человек десять-пятнадцать. Для зала побольше нужен пересылающий сервер.':
    'A imagem vai diretamente do autor para cada espectador, por isso depende da ligação do autor: numa linha de casa dez a quinze pessoas veem com à-vontade. Uma sala maior precisa de um servidor repetidor.',
  'Что такое подарки?':
    'O que são os presentes?',
  'Тридцать подарков от Розы за 1 CUBE до Куба-легенды за 1000. Подарок, это перевод CUBE ведущему целиком, доли площадки нет.':
    'Trinta presentes, de uma Rosa por 1 CUBE a um Cubo Lenda por 1000. Um presente é uma transferência de CUBE para o autor por inteiro; a plataforma não fica com nada.',
  'Как закончить эфир?':
    'Como termino um direto?',
  'Кнопка «Закончить эфир» в шапке окна, она на виду в любом режиме. Закрыть окно крестиком эфир не останавливает: он продолжается, пока не нажмёшь «Закончить».':
    'O botão Terminar direto no cabeçalho da janela, visível em todos os modos. Fechar a janela na cruz não para o direto: continua até carregares em Terminar.',
  'Голос и языки':
    'Voz e línguas',

  /* ── голос, оформление, правила, карта, забег, шопинг ── */
  'Какие есть голосовые команды?':
    'Que comandos de voz existem?',
  'Больше девяноста: разделы, окна, создание, лента, игра, формы, персонажи, управление. Полный список с поиском, на странице «Голосовые команды»: кабинет → Голосовые команды, или в «Оформлении», или скажи «голосовые команды».':
    'Mais de noventa: secções, janelas, criar, o feed, o jogo, as formas, as personagens, os controlos. A lista completa com pesquisa está na página Comandos de voz: menu da conta → Comandos de voz, ou em Aspeto, ou diz simplesmente «comandos de voz».',
  'На каких языках работает голос?':
    'Em que línguas funciona a voz?',
  'На двадцати: русский, английский (в том числе индийский), украинский, немецкий, французский (и канадский), испанский (и латиноамериканский), итальянский, португальский, польский, турецкий, арабский (и залива), вьетнамский, китайский, японский, корейский, хинди. Язык выбирается на странице команд и в «Оформлении».':
    'Em vinte: russo, inglês (também o da Índia), ucraniano, alemão, francês (e o do Canadá), espanhol (e o da América Latina), italiano, português, polaco, turco, árabe (e o do Golfo), vietnamita, chinês, japonês, coreano, hindi. A língua escolhe-se na página de comandos e em Aspeto.',
  'Как включить микрофон?':
    'Como ligo o microfone?',
  'Кнопка микрофона в верхней строке. Нажал, слушает, нажал ещё раз, перестал.':
    'O botão do microfone está na barra de cima. Carregas e ele ouve, carregas outra vez e para.',
  'Как выключить озвучку?':
    'Como desligo as respostas faladas?',
  'На странице «Голосовые команды» есть переключатель «Отвечает вслух / Отвечает молча». Голос слушает в обоих случаях, разница только в ответе.':
    'Na página Comandos de voz há um interruptor entre responder em voz alta e responder em silêncio. A voz ouve à mesma; só a resposta muda.',
  'Куда уходит мой голос?':
    'Para onde vai a minha voz?',
  'Распознаёт сам браузер. Chrome и браузеры на его основе отправляют звук на серверы Google, так устроено их распознавание, и площадка на это не влияет. Не подходит, не включай микрофон, всё то же есть кнопками.':
    'O reconhecimento é feito pelo próprio navegador. O Chrome e os navegadores baseados nele enviam o som para os servidores da Google; é assim que o reconhecimento deles é feito e a plataforma não manda nisso. Se não te serve, não ligues o microfone: está tudo também em botões.',
  'Как поменять тему?':
    'Como mudo o tema?',
  'Оформление → Тема: тёмная, светлая или «Камера», когда фоном идёт картинка с твоей камеры.':
    'Aspeto → Tema: escuro, claro, ou Câmara, em que o fundo é a imagem da tua câmara.',
  'Что такое Цвет 1, 2 и 3?':
    'O que são a Cor 1, 2 e 3?',
  'Цвет 1: шапки, строки ввода и вкладки. Цвет 2, само окно: фон переписки и список комментариев. Цвет 3, обложка и рамка Портфолио. У каждого свой ползунок прозрачности.':
    'A Cor 1 são os cabeçalhos, as barras de escrita e os separadores. A Cor 2 é a própria janela: o fundo do chat e a lista de comentários. A Cor 3 é a capa e a moldura do portefólio. Cada uma tem o seu controlo de transparência.',
  'Как поставить обои?':
    'Como ponho um fundo?',
  'Оформление → Обои: набор готовых или своя картинка в 9:16. Цвет 2 ложится поверх обоев подкраской, ползунок решает, насколько сильно.':
    'Aspeto → Fundo: um conjunto de fundos prontos ou a tua própria imagem em 9:16. A Cor 2 fica por cima do fundo como um tom, e o controlo decide com que força.',
  'Правила и безопасность':
    'Regras e segurança',
  'Что нельзя выкладывать?':
    'O que não se pode publicar?',
  'Материалы с детьми, угрозы и призывы к расправе, разжигание ненависти, мошенничество, запрещённые товары, чужое без права, выдачу себя за другого, спам и накрутки. Полностью, в «Правилах сообщества».':
    'Material com menores, ameaças e apelos à violência, incitamento ao ódio, fraude, produtos proibidos, obra alheia sem direito a ela, fazer-se passar por outro, spam e atividade falsa. Por inteiro, nas Regras da comunidade.',
  'Как работает модерация?':
    'Como funciona a moderação?',
  'Посты, комментарии, сообщения в группах, названия и описания проходят проверку на сервере перед публикацией. Явно запрещённое не публикуется, спорное уходит на разбор человеком. Маркетплейс и личная переписка не проверяются.':
    'As publicações, os comentários, as mensagens de grupo, os nomes e as descrições são verificados no servidor antes de serem publicados. O claramente proibido não é publicado, o duvidoso vai para análise manual. O mercado e as conversas privadas não são verificados.',
  'Виден ли мой IP?':
    'O meu IP é visível?',
  'Да, серверу виден: как и любому сайту в интернете: без IP он не знает, куда слать ответ. Скрытый режим прячет имя и аватар от других людей, но не от сервера.':
    'Sim, o servidor vê-o, tal como qualquer site da internet: sem IP não saberia para onde mandar a resposta. O modo escondido esconde o teu nome e a tua foto das outras pessoas, mas não do servidor.',
  'Что вы храните обо мне?':
    'O que guardam sobre mim?',
  'Ключ аккаунта, профиль, который ты сам заполнил, твой контент, счётчики за сутки и технические данные соединения. Почты, телефона, паролей и ключей от кошельков, нет.':
    'A chave da conta, o perfil que preencheste, o teu conteúdo, os contadores diários e os dados técnicos da ligação. Nem email, nem telefone, nem palavras-passe, nem chaves de carteiras.',
  'Куда жаловаться?':
    'Onde me queixo?',
  'На материал: кнопкой жалобы под ним. По остальному, через поддержку внутри площадки.':
    'Sobre um conteúdo, no botão de denúncia que está por baixo. Sobre tudo o resto, pelo apoio dentro da plataforma.',
  'Где документы?':
    'Onde estão os documentos?',
  'Кабинет → «Документы». Семь штук: соглашение, политика конфиденциальности, правила сообщества, начисления и лимиты, свайп и платежи, подписка и ключи, камера и микрофон.':
    'Menu da conta → Documentos. São sete: as condições, a política de privacidade, as regras da comunidade, recompensas e limites, swap e pagamentos, subscrição e chaves, câmara e microfone.',
  'Что такое карта?':
    'O que é o mapa?',
  'Карта площадки: 177 стран и 1150 городов с настоящими координатами, положение солнца считается на текущее время, ночная сторона и рассвет там же, где в небе. Двадцать видов: из космоса, ночь Земли, день и ночь, улицы OpenStreetMap, погода, землетрясения, часовые пояса, наши кубы и эфиры. Открывается из кабинета или голосом «карта».':
    'O mapa da plataforma: 177 países e 1150 cidades com coordenadas reais, a posição do sol calculada para a hora atual, o lado noturno e o nascer do dia exatamente onde estão no céu. Vinte vistas: do espaço, a Terra de noite, dia e noite, as ruas do OpenStreetMap, o tempo, os sismos, os fusos horários, os nossos cubos e diretos. Abre-se no menu da conta ou dizendo «mapa».',
  'Как проложить маршрут на карте?':
    'Como traço um percurso no mapa?',
  'Нажми по карте начало, потом конец, и выбери одну из двадцати дорог. По большому кругу и локсодрома, как летают и ходят по-настоящему. Только по суше и только по воде, настоящий поиск пути по материкам, ни шагу в чужую стихию. По тени и по свету, вдоль ночной стороны. Мимо кубов, эфиров и людей, через наши метки. Путь по улицам считает внешний движок OSRM; не ответил, так и скажем.':
    'Toca no início no mapa, depois no fim, e escolhe um dos vinte caminhos. O círculo máximo e a loxodromia, a maneira como de facto se voa e se navega. Só por terra e só por água, uma procura real de caminho pelos continentes sem um único passo no outro elemento. Pela sombra e pela luz, a seguir o lado noturno. Por cubos, diretos e pessoas, pelos nossos pinos. O percurso por ruas é calculado pelo motor externo OSRM; se não responder, dizemo-lo.',
  'Видно ли меня на карте?':
    'Estou visível no mapa?',
  'Только если ты сам поставил метку «Я здесь». Она живёт полчаса и стирается сама, координаты округляются до километра ещё до отправки на сервер, а «убрать себя с карты» удаляет строку, а не прячет её. Без этой метки тебя на карте нет вовсе.':
    'Só se tiveres posto tu mesmo o pino «estou aqui». Vive meia hora e apaga-se sozinho, as coordenadas são arredondadas a um quilómetro ainda antes de serem enviadas para o servidor, e «tirar-me do mapa» apaga o registo em vez de o esconder. Sem esse pino não estás no mapa de todo.',
  'Есть ли на карте спутник и пробки?':
    'O mapa tem imagens de satélite e trânsito?',
  'Нет. Спутниковые снимки и пробки отдают платные провайдеры по ключу. Место под эти слои готово, впишешь ключ, и они включатся. Пока ключа нет, карта пишет об этом прямо, а не рисует красивое враньё.':
    'Não. As imagens de satélite e o trânsito são servidos por fornecedores pagos com uma chave. O lugar para essas camadas está pronto: põe-se uma chave e ligam-se. Enquanto não houver chave, o mapa di-lo com clareza em vez de desenhar uma mentira bonita.',
  'Что такое забег по улице?':
    'O que é a corrida pela rua?',
  'Прыжок внутрь карты: вид от первого лица, настоящие дома и повороты твоей улицы. Бежишь сам, свайп вбок, сменить полосу, а на перекрёстке свернуть, вверх, прыжок, вниз, подкат. Собираешь кубики, уворачиваешься от барьеров и балок. По дороге попадаются чужие эфиры, кубы и витрины шопинга. Есть и спокойная прогулка с джойстиком. Открывается из кабинета, с карты кнопкой «На улицу» или голосом «забег».':
    'Um salto para dentro do mapa: vista na primeira pessoa, os edifícios e as curvas reais da tua própria rua. Corres tu: deslizas para o lado para mudar de faixa, e num cruzamento para virar, para cima para saltar, para baixo para escorregar. Apanhas cubos e desvias-te de barreiras e raios. Pelo caminho encontras diretos, cubos e montras de outras pessoas. Há também um passeio calmo com comando. Abre-se no menu da conta, no mapa com o botão Para a rua, ou dizendo «corrida».',
  'Откуда берутся дома в забеге?':
    'De onde vêm os edifícios da corrida?',
  'Из OpenStreetMap: настоящие контуры зданий и этажность, настоящие дороги с их шириной и поворотами. Этаж считаем по три метра; если этажность не указана, высота берётся по размеру пятна дома. Фотографий улиц нет, их отдают платные провайдеры. Если сервер карт занят, игра честно скажет и построит наш квартал.':
    'Do OpenStreetMap: contornos e número de pisos reais, estradas reais com as suas larguras e curvas. Contamos um piso como três metros; se faltar o número de pisos, a altura é tirada da área do edifício. Não há fotografias das ruas, essas são servidas por fornecedores pagos. Se o servidor do mapa estiver ocupado, o jogo di-lo com honestidade e constrói um bairro nosso.',
  'Что такое шопинг в маркетплейсе?':
    'O que são as compras no mercado?',
  'Второй раздел маркетплейса: для вещей, а не для файлов: шестнадцать разделов от одежды до искусства, карточка с брендом, размерами, цветами, характеристиками и до двадцати снимков. У каждой карточки крутится фигура с именем бренда, любая из двадцати форм. Денег раздел не трогает: расчёт и доставка между людьми, поэтому там «написать продавцу», а не «купить за CUBE».':
    'A segunda secção do mercado, para coisas em vez de ficheiros: dezasseis categorias, da roupa à arte, um cartão com a marca, tamanhos, cores, características e até vinte fotografias. Cada cartão tem uma figura a girar com o nome da marca, qualquer uma das vinte formas. A secção não toca no dinheiro: o pagamento e a entrega são entre pessoas, por isso diz «escrever ao vendedor» e não «comprar com CUBE».',
  'Игры, чаты и новое':
    'Jogos, conversas e novidades',
  'Сколько игр в зале?':
    'Quantos jogos há na sala?',
  'Восемь, и все играются: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Управление и пальцем, и клавишами.':
    'Oito, e todos se podem jogar: CryptoTetris, CubeRun, DataMine, CipherBreak, Phantom Escape, Block Trade, TrustChain, CubeBuilder. Jogam-se com o dedo e com o teclado.',

  /* ── игры зала, чаты, группы, посты ── */
  'Дают ли игры CUBE?':
    'Os jogos dão CUBE?',
  'Нет. Игры дают очки и личный рекорд, он хранится в твоём браузере. CUBE начисляет сервер за просмотры и из общего котла, рисовать монеты в браузере значило бы врать.':
    'Não. Os jogos dão pontos e um recorde pessoal, guardados no teu navegador. O CUBE é creditado pelo servidor por visualizações e do fundo comum; cunhar moedas num navegador seria mentira.',
  'Как играть в DataMine?':
    'Como se joga o DataMine?',
  'Поле восемь на восемь. Нажимаешь клетку, копаешь данные, число показывает, сколько вирусов рядом. Долгое нажатие ставит флажок. Три жизни, дальше новый слой.':
    'Um campo de oito por oito. Tocas numa célula e escavas os dados; o número mostra quantos vírus estão ao lado. Uma pressão longa põe uma bandeira. Três vidas, depois uma camada nova.',
  'Как играть в CipherBreak?':
    'Como se joga o CipherBreak?',
  'Собери код из четырёх знаков. После попытки полный кружок, знак на своём месте, пустой, есть в коде, но не там. Восемь попыток.':
    'Descobre um código de quatro símbolos. Depois de uma tentativa, um círculo cheio significa que o símbolo está no sítio certo, um vazio que está no código mas noutro lugar. Oito tentativas.',
  'Как играть в Phantom Escape?':
    'Como se joga o Phantom Escape?',
  'Собери пять ключей и уйди в дверь. Призраки идут за тобой кратчайшим путём, с каждым этажом их больше.':
    'Junta cinco chaves e sai pela porta. Os fantasmas seguem-te pelo caminho mais curto, e em cada piso há mais.',
  'Как играть в Block Trade?':
    'Como se joga o Block Trade?',
  'Полторы минуты, на руках 1000. Покупай дешевле, продавай дороже. Счёт, всё, что сверх тысячи.':
    'Minuto e meio, com 1000 na mão. Compra mais barato, vende mais caro. A tua pontuação é tudo o que passar dos mil.',
  'Как играть в TrustChain?':
    'Como se joga o TrustChain?',
  'Нажимай блоки по возрастанию номера, пока идёт время. Ошибся, цепь рвётся. Каждый круг цепь длиннее.':
    'Toca nos blocos por ordem crescente enquanto o relógio corre. Um erro e a cadeia parte-se. A cada ronda a cadeia fica mais comprida.',
  'Как играть в CubeBuilder?':
    'Como se joga o CubeBuilder?',
  'Плита ходит вбок, нажатие её роняет. Что свесилось, отваливается, и плита становится уже. Промахнулся мимо башни, конец.':
    'A laje anda de lado e um toque larga-a. O que ficar de fora cai, e a laje fica mais estreita. Se falhares a torre, acabou.',
  'Что показывает строка курсов?':
    'O que mostra a fita de preços?',
  'Тридцать монет с ценой и суточным изменением. Данные идут через наш сервер, он держит кэш полминуты. Лента не ползёт: на экране целое число ячеек, они меняются раз в несколько секунд.':
    'Trinta moedas com o preço e a variação do dia. Os dados chegam pelo nosso servidor, que guarda meio minuto em cache. A fita não se arrasta: no ecrã cabe um número inteiro de células e elas mudam de poucos em poucos segundos.',
  'Что значит число кубов в шапке?':
    'O que significa o número de cubos no cabeçalho?',
  'Сколько кубов сейчас в твоём мире, тех, что ты видишь перед собой. Не общее число кубов площадки.':
    'Quantos cubos estão agora mesmo no teu mundo, os que vês à tua frente. Não o número total de cubos da plataforma.',
  'Можно ли войти вторым аккаунтом?':
    'Posso entrar com uma segunda conta?',
  'Да. Кабинет → «Добавить аккаунт»: нынешний ключ остаётся в списке, и вернуться к нему можно одним нажатием из того же меню. Помнится до восьми.':
    'Posso. Menu da conta → Acrescentar uma conta: a chave atual fica na lista, e podes voltar a ela com um toque no mesmo menu. São lembradas até oito.',
  'Зачем «Сохранить» в окне игры?':
    'Para que serve Guardar na janela do jogo?',
  'Запоминает форму предметов, персонажа, жесты и размер. При следующем входе всё стоит на своих местах.':
    'Lembra a forma do objeto, a personagem, os gestos e o tamanho. Da próxima vez que entrares, está tudo onde o deixaste.',
  'Чем режим отличается от толчка?':
    'Em que é que um modo é diferente de um empurrão?',
  'Режим держится, пока не снимешь вторым нажатием, и горит. Толчок срабатывает разом и не горит, у него остаётся только тонкая отметка «нажато последним».':
    'Um modo mantém-se até o desligares com um segundo toque, e fica aceso. Um empurrão vai uma vez e não acende; só deixa uma marca fina de ter sido o último carregado.',
  'Почему кубы больше не исчезают?':
    'Porque é que os cubos já não desaparecem?',
  'У показательных кубов витрины жизнь была короткой, пять и пятнадцать минут. Теперь им не меньше полусуток, и перед концом они заводятся заново. Настоящие кубы живут столько, сколько им отмерено при создании.':
    'Os cubos de mostra da montra viviam pouco, cinco e quinze minutos. Agora têm pelo menos meio dia, e são reiniciados antes de se esgotarem. Os cubos a sério vivem exatamente o que lhes foi dado ao criá-los.',
  'Как сделать фото прямо в чат?':
    'Como tiro uma fotografia diretamente para uma conversa?',
  'Скрепка → «Камера»: открывается своя съёмка. Нажатие, снимок, долгое нажатие, видео до минуты. Галерея, это соседний пункт «Фото или видео».':
    'O clipe → Câmara abre a nossa própria captura. Um toque tira uma fotografia, uma pressão longa grava vídeo até um minuto. A galeria é a opção ao lado, Foto ou vídeo.',
  'Что такое галерея переписки?':
    'O que é a galeria da conversa?',
  'Лупа в шапке переписки открывает поиск и над ним полку: фото, видео, аудио и ссылки из этой переписки. Собирается из самих сообщений, ничего никуда не уходит.':
    'A lupa no cabeçalho de uma conversa abre a pesquisa e uma prateleira por cima: fotografias, vídeos, áudios e ligações dessa conversa. É reunida a partir das próprias mensagens e nada vai para lado nenhum.',
  'Как удалить сразу несколько сообщений?':
    'Como apago várias mensagens de uma vez?',
  'Долгое нажатие по сообщению включает выбор, дальше отмечаешь нужные и жмёшь «Удалить» в нижней полоске. За раз до ста штук.':
    'Uma pressão longa numa mensagem liga a seleção, depois marcas as que quiseres e carregas em Apagar na barra de baixo. Até cem de cada vez.',
  'Можно ли изменить своё сообщение?':
    'Posso editar a minha própria mensagem?',
  'Да, своё и текстовое: меню сообщения → «Изменить». Рядом с ним появится пометка «изменено». Переписка при этом не закрывается.':
    'Podes, as tuas e só as de texto: menu da mensagem → Editar. Ao lado aparece a marca «editada». A conversa não se fecha enquanto o fazes.',
  'Что такое сторис?':
    'O que são as histórias?',
  'Короткие записи на сутки над списком переписок: фото или видео до минуты. Смотрятся по очереди, через сутки пропадают сами.':
    'Publicações curtas que duram um dia, por cima da lista de conversas: uma fotografia ou um vídeo até um minuto. Veem-se umas a seguir às outras e desaparecem sozinhas ao fim de um dia.',
  'Сколько фото можно в группу?':
    'Quantas fotografias cabem num grupo?',
  'До семи снимков или одно видео до минуты. Плюс значок из набора и теги под описанием.':
    'Até sete fotografias, ou um vídeo até um minuto. Mais um ícone do conjunto e etiquetas debaixo da descrição.',
  'Что такое теги группы?':
    'O que são as etiquetas do grupo?',
  'Несколько слов через запятую, по которым группу находят в поиске.':
    'Umas quantas palavras separadas por vírgulas, pelas quais o grupo é encontrado na pesquisa.',
  'Видно ли участников группы?':
    'Os membros do grupo são visíveis?',
  'Решает владелец при создании: список участников можно показать всем или оставить видным только ему.':
    'Decide o dono ao criá-lo: a lista de membros pode ser mostrada a todos ou ficar visível só para o dono.',
  'Почему поле ссылки на видео убрали?':
    'Porque foi tirado o campo de ligação para vídeo?',
  'Чужая ссылка ломалась, когда её удаляли на той стороне, и платформа за это не отвечала. Видео загружается файлом в наше хранилище.':
    'Uma ligação alheia partia-se quando a apagavam do outro lado, e a plataforma não podia responder por isso. Um vídeo é carregado como ficheiro para o nosso próprio armazenamento.',
  'Сколько длится видео в посте?':
    'Quanto pode durar um vídeo numa publicação?',
  'Пока файл до 50 МБ. На большом сервере будут ступени: 15 секунд, минута, три минуты и пятнадцать.':
    'Por agora um ficheiro até 50 MB. Num servidor maior haverá degraus: 15 segundos, um minuto, três minutos e quinze.',
  'Что делает кнопка «Чаевые автору»?':
    'O que faz o botão Gorjeta ao autor?',
  'Переводит CUBE с твоего баланса автору публикации целиком, без доли площадки. Сумма, 1, 5, 10, 25 или своя.':
    'Transfere CUBE do teu saldo para o autor da publicação por inteiro, sem parte para a plataforma. O valor é 1, 5, 10, 25 ou o teu.',
  'Как пожаловаться на видео?':
    'Como denuncio um vídeo?',
  'Три точки под видео → «Пожаловаться»: выбираешь причину, можно дописать своими словами. Уходит проверяющему человеку.':
    'Os três pontos debaixo do vídeo → Denunciar: escolhes um motivo e podes acrescentar as tuas palavras. Vai para análise manual.',

  /* ── профиль, переписки, прочее ── */
  'Как поделиться публикацией?':
    'Como partilho uma publicação?',
  'Три точки под видео → «Поделиться». Получишь ссылку, которую можно отправить кому угодно.':
    'Os três pontos debaixo do vídeo → Partilhar. Recebes uma ligação que podes mandar a quem quiseres.',
  'Куда девается «Сохранить»?':
    'Onde é que o Guardar põe as coisas?',
  'В профиль, на полку сохранённого, значок закладки под вкладками профиля.':
    'No teu perfil, na prateleira de guardados, debaixo do ícone do marcador por baixo dos separadores do perfil.',
  'Что видно в моём профиле?':
    'O que se vê no meu perfil?',
  'Две вкладки: Shorts: твои короткие видео, Посты, всё остальное. Нажатие по карточке разворачивает её так же, как в ленте. Изменить и удалить видно только автору.':
    'Dois separadores: Shorts para os teus vídeos curtos, Publicações para tudo o resto. Ao tocar num cartão, abre-se tal como no feed. Editar e apagar só o autor é que vê.',
  'Как изменить профиль?':
    'Como edito o meu perfil?',
  'Кнопка с карандашом в своём профиле: имя, @ник, описание, тип аккаунта, статус, ссылки и адрес.':
    'O botão do lápis no teu próprio perfil: nome, @utilizador, descrição, tipo de conta, estado, ligações e morada.',
  'Чем бизнес-аккаунт отличается?':
    'Em que é diferente uma conta de empresa?',
  'Публичный: тебя видно всем. Скрытый, имя и аватар прячутся от других людей. Бизнес, добавляются описание дела, ссылки и адрес.':
    'Pública quer dizer que toda a gente te vê. Escondida quer dizer que o teu nome e a tua foto estão escondidos das outras pessoas. Empresa acrescenta uma descrição do teu negócio, ligações e uma morada.',
  'Что показывает «онлайн» в шапке?':
    'O que mostra o «online» no cabeçalho?',
  'Сколько людей сейчас на площадке по данным сервера. Обновляется раз в полминуты.':
    'Quanta gente está agora mesmo na plataforma segundo o servidor. Atualiza-se a cada meio minuto.',
  'Закрывается ли игра вместе с эфиром?':
    'O jogo fecha-se junto com o direto?',
  'Да. Если шёл эфир с кубами, при его завершении игра выключается сама, иначе предметы продолжали летать на пустой карте.':
    'Fecha. Se o direto tinha cubos, o jogo desliga-se sozinho quando o direto acaba; senão os objetos continuavam a voar sobre um mapa vazio.',
  'Есть ли смайлы в эфире?':
    'Há emojis num direto?',
  'Да, кнопка со смайлом рядом со строкой, там вся общая коллекция, та же, что в чатах.':
    'Há, o botão de emojis ao lado da barra de escrita tem a coleção comum toda, a mesma das conversas.',
  'Что такое «Все вопросы»?':
    'O que é Todas as perguntas?',
  'Полный справочник помощника: больше сотни вопросов с ответами, разложенных по разделам, с поиском по названию.':
    'O manual completo do ajudante: mais de cem perguntas com respostas, arrumadas por secções, com pesquisa por título.',
  'Куда делась кнопка NET?':
    'Para onde foi o botão NET?',
  'Убрана. Поиск по чужому интернету площадка не делает, а кнопка это обещала. Помощник отвечает про площадку и ищет кубы, людей, группы и эфиры.':
    'Foi tirado. A plataforma não procura na internet grande, e o botão prometia que sim. O ajudante responde sobre a plataforma e encontra cubos, pessoas, grupos e diretos.',
  'Почему звук повторялся дважды?':
    'Porque é que o som se repetia duas vezes?',
  'Говорили два разных куска кода, и ни один не обрывал другой. Теперь перед каждой фразой предыдущая отменяется, а один и тот же текст подряд не повторяется.':
    'Falavam dois pedaços de código diferentes e nenhum cortava o outro. Agora cada frase cancela a anterior, e o mesmo texto não se repete duas vezes seguidas.',
  'Как выключить голос совсем?':
    'Como desligo a voz por completo?',
  'На странице «Голосовые команды» переключатель «Отвечает вслух / Отвечает молча». Теперь он выключает по-настоящему: раньше он правил только одну точку входа, а голос шёл мимо неё.':
    'Na página Comandos de voz há um interruptor entre responder em voz alta e responder em silêncio. Agora desliga a sério: antes mandava só numa entrada e a voz dava a volta.',
  'Что хранится только в моём браузере?':
    'O que é guardado só no meu navegador?',
  'Рекорды игр, настройки игры с кубами, выбранный язык, тема и обои, список своих аккаунтов. Всё это не уходит на сервер.':
    'Os recordes dos jogos, as definições do jogo com cubos, a língua escolhida, o tema e o fundo, e a lista das tuas próprias contas. Nada disso vai para o servidor.',
  'Почему просят подтвердить удаление?':
    'Porque me pedem para confirmar que apago?',
  'Потому что вернуть нельзя. В переписках спрашивается ещё и у кого убрать, только у себя или у всех.':
    'Porque não se pode desfazer. Nas conversas perguntam ainda que cópia tirar, só a tua ou a de todos.',
  'Что такое «У всех» при удалении?':
    'O que quer dizer «Para todos» ao apagar?',
  '«У себя» прячет сообщение с твоего экрана. «У всех» просит сервер убрать его у собеседника тоже.':
    '«Para mim» esconde a mensagem do teu próprio ecrã. «Para todos» pede ao servidor que a tire também à outra pessoa.',
  'Сколько живёт сообщение с таймером?':
    'Quanto vive uma mensagem com prazo?',
  'Сколько выбрал: пять минут, час, сутки, неделя или навсегда. Кнопка с ∞ рядом со строкой ввода.':
    'O que tiveres escolhido: cinco minutos, uma hora, um dia, uma semana ou para sempre. O botão ∞ ao lado da barra de escrita.',
  'Как переслать сообщение?':
    'Como reencaminho uma mensagem?',
  'Меню сообщения → «Переслать». Выбираешь, кому.':
    'Menu da mensagem → Reencaminhar. Escolhes para quem.',
  'Что делает «В избранное»?':
    'O que faz Guardar nos favoritos?',
  'Кладёт сообщение в «Избранное», твой личный блокнот с заметками и сохранённым.':
    'Põe a mensagem em Guardados, o teu próprio caderno com notas e coisas guardadas.',
  'Как найти сообщение в переписке?':
    'Como encontro uma mensagem numa conversa?',
  'Лупа в шапке переписки: ищет по тексту и прыгает стрелками между совпадениями. Там же полка с фото, видео, аудио и ссылками.':
    'A lupa no cabeçalho da conversa: procura no texto e as setas saltam entre ocorrências. A prateleira com fotografias, vídeos, áudios e ligações está no mesmo sítio.',
  'Что такое «Пригласить в группу»?':
    'O que é Convidar para o grupo?',
  'Ссылка из сведений о группе: кто откроет, попадёт в неё.':
    'Uma ligação da informação do grupo: quem a abrir entra no grupo.',
  'Можно ли выйти из группы?':
    'Posso sair de um grupo?',
  'Да, кнопкой в сведениях о группе. Владелец при этом группу не удаляет.':
    'Posso, com um botão na informação do grupo. Se o dono sair, o grupo não é apagado.',
  'Сколько форм у предметов?':
    'Quantas formas têm os objetos?',
  'Двадцать, плюс своя картинка или видео сверху и режим «вразнобой».':
    'Vinte, mais a tua própria imagem ou vídeo por cima delas, e o modo misturado.',
  'Что такое шопинг?':
    'O que são as compras?',
  'Второй раздел маркетплейса: для вещей: шестнадцать разделов, карточка с брендом и до двадцати снимков, крутящаяся фигура с именем бренда. Расчёт и доставка между людьми.':
    'A segunda secção do mercado, para coisas: dezasseis categorias, um cartão com a marca e até vinte fotografias, e uma figura a girar com o nome da marca. O pagamento e a entrega são entre pessoas.',
  'Спроси словами: например, «как заработать» или «найди куб Art».':
    'Pergunta por palavras: por exemplo «como ganhar» ou «encontra o cubo Art».',
  'Что искать? Напиши, например, «найди куб Art» или «@anna».':
    'O que procuro? Escreve algo como «encontra o cubo Art» ou «@anna».',

  /* ── ответа нет ── */
  'Про «{что}» у меня ответа нет. Я знаю площадку: CUBE и начисления, лимиты, свайп, кошелёк, ключи, сигналы, кубы и группы, игру с кубами, эфиры, оформление и голосовые команды.':
    'Não tenho resposta sobre «{что}». O que sei é a plataforma: CUBE e recompensas, limites, o swap, a carteira, as chaves, os sinais, os cubos e os grupos, o jogo com cubos, os diretos, o aspeto e os comandos de voz.'

});
