"""DELE A2 / B1 (Prueba de expresión e interacción orales) and CILS A2 / B1 (Produzione orale) practice.
Original material; the order of the tasks, the choices and the times follow the real tests:

DELE A2: 12 minutes to prepare tareas 1-3 (choose 1 of 2 themes and 1 of 2 photos) → Tarea 1 monologue (2-3 min)
→ Tarea 2 the photo (2-3 min) → Tarea 3 a role-play linked to the photo (3-4 min).
DELE B1: 15 minutes to prepare tarea 1 only (choose 1 of 2 themes, notes allowed) → Tarea 1 monologue (2-3 min)
→ Tarea 2 conversation on the same theme (3-4 min) → Tarea 3 choose 1 of 2 photos, describe it (1-2 min) and
answer questions → Tarea 4 read the role card on the back (1 min), role-play (2-3 min, the interviewer starts).
Marked on Coherencia, Fluidez, Corrección, Alcance.
CILS A2 / B1: a short introduction (not marked) → Prova 1 face-to-face conversation on a topic you choose →
Prova 2 a short monologue on a theme you choose."""
from cards import S, CARD, HIDE, END_K, scene, say_b, think_b
from intl import ANS


def TOPICS(set_, sec, label, notes=False):
    d = {'k': 'topics', 'set': set_, 'sec': sec, 'label': label}
    if notes: d['notes'] = True
    return d


def TQ(set_, f, n, i, sec, r=None):
    d = {'k': 'tq', 'set': set_, 'f': f, 'n': n, 'id': i, 'sec': sec}
    if r: d['r'] = r
    return d


def TEMA(t, pts, model, qs=None):
    """a theme: its prompts (shown on the card), a model talk, and (B1) the Tarea 2 questions [(q, model)]"""
    d = {'t': t, 'pts': pts, 'model': model}
    if qs: d['qs'], d['qsm'] = [q for q, m in qs], [m for q, m in qs]
    return d


def FOTO(t, pic, model, rp, qs=None, rol=None):
    """a photo: the description model, (B1) questions about it [(q, model)], the role card (B1), and the
    role-play [(examiner line, what to do, model answer)]"""
    d = {'t': t, 'pic': pic, 'model': model, 'rp': [x[0] for x in rp], 'rpc': [x[1] for x in rp], 'rpm': [x[2] for x in rp]}
    if qs: d['qs'], d['qsm'] = [q for q, m in qs], [m for q, m in qs]
    if rol: d['rol'] = {'t': rol[0], 'pts': rol[1]}
    return d


DELE_ITEMS = {
    'coh': {'no': 'Coherencia(まとまり)', 'pts': 5, 'overall': True, 'q': '(全体)', 'ja': '話の順序とつなぎの言葉', 'points': ['primero / además / por eso / al final でつなぐ']},
    'flu': {'no': 'Fluidez(流ちょうさ)', 'pts': 5, 'overall': True, 'q': '(全体)', 'ja': '止まらずに話せたか', 'points': ['長い沈黙を作らない', '言葉が出ないときは言いかえる']},
    'cor': {'no': 'Corrección(正確さ)', 'pts': 5, 'overall': True, 'q': '(全体)', 'ja': '文法と発音の正確さ', 'points': ['動詞の活用と時制(pretérito / presente)', '性数一致(el / la, -o / -a)']},
    'alc': {'no': 'Alcance(表現の幅)', 'pts': 5, 'overall': True, 'q': '(全体)', 'ja': '語彙と表現の幅', 'points': ['同じ語のくり返しを避ける', '意見・理由の表現(creo que / porque)']},
}
DELE_COMMON = {
    'lang': 'es-ES', 'unit': 'セット', 'att': False, 'pardon': '¿Puede repetir?',
    'exs': [['Lucía Martín', 'f'], ['Javier López', 'm'], ['Carmen Ruiz', 'f'], ['Pablo García', 'm']],
    'origNote': 'テーマ・写真・ロールプレイはBabel Flightのオリジナルです(進め方と時間は本番と同じ)。',
    'markNote': '採点は本番とは違う、自分でつける目安です。',
    'voiceNote': '面接官のスペイン語は、この端末の音声で読み上げます(スペイン語の声がない端末では、うまく読めないことがあります)。面接官は毎回変わります。',
    'subNote': 'スペイン語の文を表示する(本番は表示されません)',
    'hideNote': '(面接官が話しています。スペイン語は非表示)', 'ansNote': 'スペイン語で答えよう',
    'chooseNote': 'カードからテーマを1つ選ぼう',
    'againNote': '同じテーマ・写真でもう一度', 'items': DELE_ITEMS,
}
A2_PTS = ['テーマのすべての項目にふれる', '2〜3分。現在形と点過去(pretérito)を使い分ける']
FOTO_PTS = ['人物・場所・していること', 'Creo que … / Parece que … で推測も', 'このあと何をするか(Van a …)']
RP_PTS = ['あいさつ・お願い・お礼をていねいに(usted)', '1つは自分から質問する']

# ---------------------------------------------------------------- DELE A2
def A2_SET(temas, fotos):
    return {
        'card': {'title': 'DELE A2', 'sets': ['temas', 'fotos'], 'temasTitle': 'Tarea 1: elige un tema', 'fotosTitle': 'Tarea 2: elige una fotografía', 'temas': temas, 'fotos': fotos},
        'steps': [
            S("Hola. Antes de empezar, tienes doce minutos para preparar las tareas uno, dos y tres. Elige un tema para la tarea uno y una fotografía para la tarea dos."),
            CARD, TOPICS('temas', 720, '準備 12分(テーマと写真を選ぶ・メモOK)', notes=True), dict(HIDE, keep=True),
            S("Hola, buenos días. Me llamo {ex}. ¿Cómo te llamas?"), ANS('name', 8, '名前'),
            S("Muy bien. Vamos a empezar. Tarea uno. Háblame del tema que has elegido. Tienes entre dos y tres minutos."),
            ANS('monologo', 180, tip='2〜3分。カードの項目にそって(メモは見てもOK、読み上げはNG)'),
            S("Muy bien, gracias. Tarea dos. Ahora descríbeme la fotografía que has elegido."), dict(CARD, show='fotos'),
            ANS('foto', 150, tip='2〜3分。人・場所・していること・気持ち・このあと'),
            S("Gracias. Tarea tres. Ahora vamos a hacer un diálogo relacionado con la fotografía. Yo empiezo."),
            TQ('fotos', 'rp', 0, 'rp1', 30), TQ('fotos', 'rp', 1, 'rp2', 30), TQ('fotos', 'rp', 2, 'rp3', 30), TQ('fotos', 'rp', 3, 'rp4', 30), HIDE,
        ],
        'items': {
            'monologo': {'no': 'Tarea 1 モノローグ', 'pts': 8, 'set': 'temas', 'setLabel': '選んだテーマ', 'q': '(選んだテーマについて2〜3分)', 'ja': '選んだテーマについて、カードの項目にそって話す', 'points': A2_PTS},
            'foto': {'no': 'Tarea 2 写真の描写', 'pts': 6, 'set': 'fotos', 'setLabel': '選んだ写真', 'q': '(写真を説明する)', 'ja': '選んだ写真について説明する', 'points': FOTO_PTS},
            'rp1': {'no': 'Tarea 3 会話1', 'pts': 3, 'q': '', 'ja': 'ロールプレイ(写真の場面)', 'points': RP_PTS},
            'rp2': {'no': 'Tarea 3 会話2', 'pts': 3, 'q': '', 'ja': 'ロールプレイ(写真の場面)', 'points': RP_PTS},
            'rp3': {'no': 'Tarea 3 会話3', 'pts': 3, 'q': '', 'ja': 'ロールプレイ(写真の場面)', 'points': RP_PTS},
            'rp4': {'no': 'Tarea 3 会話4', 'pts': 3, 'q': '', 'ja': 'ロールプレイ(写真の場面)', 'points': RP_PTS},
        },
    }


DELE_A2_SETS = [
  A2_SET([
    TEMA('Mi tiempo libre', ['¿Qué haces normalmente en tu tiempo libre?', '¿Con quién y dónde?', '¿Qué hiciste el fin de semana pasado?', '¿Qué te gustaría hacer en el futuro?'],
         'En mi tiempo libre me gusta mucho montar en bicicleta. Normalmente salgo los sábados por la mañana con mi padre o con un amigo. Vamos por un camino que está al lado del río. También me gusta escuchar música y ver vídeos de aviones. El fin de semana pasado fui al aeropuerto con mi familia para ver los aviones. Comimos en un restaurante y sacamos muchas fotos. Fue un día muy divertido. En el futuro me gustaría aprender a pilotar un avión pequeño, porque quiero ser piloto.'),
    TEMA('Mi ciudad', ['¿Dónde está y cómo es?', '¿Qué se puede hacer allí?', '¿Qué es lo que más te gusta?', '¿Qué cambiarías?'],
         'Vivo en una ciudad cerca de Tokio. No es muy grande, pero tiene de todo. Hay un río, un parque muy bonito y muchas tiendas cerca de la estación. Allí se puede pasear, hacer deporte o ir de compras. Lo que más me gusta es el parque, porque en primavera hay muchos cerezos. Si pudiera cambiar algo, pondría más carriles para bicicletas, porque las calles son estrechas y a veces es peligroso.'),
  ], [
    FOTO('Foto A: en una tienda de ropa',
         scene('shop', [['👕', 40, 60, 34], ['👗', 80, 60, 34], ['🧥', 120, 60, 34], ['👩', 170, 124, 48], ['🧶', 196, 132, 22], ['🧑‍💼', 250, 124, 46]]),
         'En la foto hay una mujer en una tienda de ropa. Creo que está buscando un jersey, porque tiene uno en la mano. A la derecha hay un dependiente que la está ayudando. La tienda tiene mucha ropa de colores. Parece que la mujer está contenta. Creo que después va a probarse el jersey y lo va a comprar.',
         [('Hola, buenos días. ¿Puedo ayudarle?', 'あなたは客。セーターを探している(サイズはM)', 'Hola, buenos días. Sí, estoy buscando un jersey de la talla M.'),
          ('Tenemos estos jerséis en azul y en gris. ¿Qué color prefiere?', '色を選んで、値段をたずねる', 'Prefiero el azul. ¿Cuánto cuesta?'),
          ('Cuesta treinta y cinco euros. ¿Quiere probárselo?', '試着したいと言い、試着室の場所をたずねる', 'Sí, por favor. ¿Dónde están los probadores?'),
          ('Al fondo, a la derecha. ¿Y cómo va a pagar?', 'カードで払うと伝え、お礼を言う', 'Con tarjeta, por favor. Muchas gracias.')]),
    FOTO('Foto B: en un restaurante',
         scene('restaurant', [['👨', 80, 124, 46], ['👩', 140, 124, 46], ['🍝', 110, 146, 22], ['🤵', 230, 122, 50], ['📋', 254, 134, 20]]),
         'En esta foto hay dos personas en un restaurante. Creo que son una pareja o dos amigos. Están sentados a una mesa y ya tienen un plato de pasta. A la derecha hay un camarero con la carta. Parece que el restaurante es tranquilo. Creo que van a pedir el postre después de comer.',
         [('Buenas noches. ¿Qué van a tomar?', 'あなたは客。メニューのおすすめをたずねる', 'Buenas noches. ¿Qué nos recomienda?'),
          ('La paella de mariscos está muy buena hoy.', 'パエリアを注文し、飲み物(水)もたのむ', 'Muy bien, una paella, por favor. Y una botella de agua.'),
          ('Perfecto. ¿Algo más?', '何かアレルギーがあると伝える(ナッツ)', 'Sí, una pregunta. Tengo alergia a los frutos secos. ¿La paella lleva frutos secos?'),
          ('No, no lleva. No se preocupe.', 'お礼を言い、あとでお会計をお願いすると伝える', 'Muchas gracias. Después, la cuenta, por favor.')]),
  ]),
  A2_SET([
    TEMA('Mi familia', ['¿Cuántas personas sois en tu familia?', '¿Cómo son?', '¿Qué hacéis juntos?', '¿Qué hiciste con tu familia la última vez?'],
         'En mi familia somos cuatro: mi padre, mi madre, mi hermano pequeño y yo. Mi padre trabaja en una empresa y es muy tranquilo. Mi madre es muy simpática y le gusta cocinar. Mi hermano tiene diez años y es muy divertido. Los domingos normalmente comemos juntos y a veces vamos a la montaña. La última vez fuimos a Okinawa en verano. Nadamos en el mar y comimos mucha comida típica. Lo pasamos muy bien.'),
    TEMA('Mis vacaciones', ['¿Dónde pasas normalmente las vacaciones?', '¿Qué te gusta hacer?', 'Unas vacaciones que recuerdas bien', '¿Adónde te gustaría ir?'],
         'Normalmente paso las vacaciones de verano en casa de mis abuelos, en Hokkaido. Allí hace menos calor que en Tokio. Me gusta montar en bicicleta y comer marisco. Recuerdo muy bien las vacaciones del año pasado, porque viajé en avión por primera vez solo. Estaba un poco nervioso, pero fue una experiencia fantástica. En el futuro me gustaría ir a España, porque quiero practicar español y ver la Sagrada Familia.'),
  ], [
    FOTO('Foto A: en la estación de tren',
         scene('station', [['🚆', 60, 92, 60], ['🧑', 150, 126, 44], ['🎒', 172, 138, 20], ['👩‍💼', 240, 124, 46]], signs=[{'x': 240, 'y': 40, 't': 'BILLETES', 'c': '#2e5e8c'}]),
         'En la foto veo una estación de tren. Un chico joven está en la taquilla y habla con una empleada. Lleva una mochila, así que creo que va a hacer un viaje. A la izquierda hay un tren. Parece que el chico está comprando un billete. Creo que después va a subir al tren.',
         [('Buenos días. ¿Qué desea?', 'あなたは客。明日のマドリード行きの切符がほしい', 'Buenos días. Quería un billete para Madrid para mañana, por favor.'),
          ('¿De ida o de ida y vuelta?', '往復と答え、帰りは日曜日と伝える', 'De ida y vuelta. Vuelvo el domingo.'),
          ('Hay un tren a las nueve y otro a las once. ¿Cuál prefiere?', '9時の電車を選び、何番線から出るかたずねる', 'El de las nueve, por favor. ¿De qué andén sale?'),
          ('Sale del andén tres. Son sesenta euros.', 'お金を払ってお礼を言う', 'Aquí tiene. Muchas gracias.')]),
    FOTO('Foto B: en una farmacia',
         scene('hospital', [['💊', 40, 64, 30], ['🧴', 76, 64, 30], ['🧑‍⚕️', 120, 122, 48], ['🙍', 220, 124, 46]], bubbles=[think_b(260, 60, '🤕', 44)]),
         'En esta foto hay una farmacia. A la derecha hay un hombre que no se encuentra bien; creo que le duele la cabeza. Está hablando con la farmacéutica, que lleva una bata blanca. Detrás de ella hay medicinas. Creo que el hombre va a comprar unas pastillas y después va a descansar en casa.',
         [('Hola, buenas tardes. ¿Qué le pasa?', 'あなたは客。昨日から頭が痛いと伝える', 'Buenas tardes. Me duele mucho la cabeza desde ayer.'),
          ('¿Tiene fiebre también?', '熱は少しあると答える', 'Sí, tengo un poco de fiebre.'),
          ('Le recomiendo estas pastillas. Tome una cada ocho horas.', '飲み方を確認する(食後か)', 'Vale. ¿Tengo que tomarlas después de comer?'),
          ('Sí, mejor después de comer. Si no mejora en tres días, vaya al médico.', 'お礼を言って、値段をたずねる', 'De acuerdo, muchas gracias. ¿Cuánto es?')]),
  ]),
  A2_SET([
    TEMA('Mis estudios', ['¿Qué estudias y dónde?', '¿Qué asignatura te gusta más? ¿Por qué?', '¿Cómo es un día normal en tu escuela?', '¿Qué quieres estudiar en el futuro?'],
         'Estudio en un colegio de mi ciudad. Estoy en el último año de secundaria. Mi asignatura favorita es el inglés, porque puedo hablar con personas de otros países. También me gustan las ciencias. Un día normal, las clases empiezan a las ocho y media y terminan a las tres. Después tengo actividades del club de ciencias. En el futuro quiero estudiar ingeniería aeronáutica, porque mi sueño es ser piloto.'),
    TEMA('La comida de mi país', ['¿Cuál es tu comida favorita?', '¿Qué se come normalmente en tu país?', '¿Sabes cocinar algo?', 'Una comida especial que recuerdas'],
         'Mi comida favorita es el ramen, sobre todo el ramen de miso. En Japón normalmente comemos arroz, pescado y sopa de miso. También comemos mucha verdura. Yo sé cocinar algunos platos fáciles, como el arroz frito. Recuerdo una comida especial en Año Nuevo: mi abuela preparó osechi, que es una comida tradicional con muchos platos pequeños. Estaba todo buenísimo.'),
  ], [
    FOTO('Foto A: en la recepción de un hotel',
         scene('room', [['🛎️', 150, 140, 22], ['🧳', 60, 148, 26], ['👨', 90, 124, 46], ['👩‍💼', 210, 122, 48], ['🔑', 186, 132, 20]], signs=[{'x': 210, 'y': 44, 't': 'RECEPCIÓN', 'c': '#8a5a2b'}]),
         'En la foto hay un hombre en la recepción de un hotel. Tiene una maleta, así que creo que acaba de llegar. La recepcionista le está dando la llave de la habitación. El hombre parece cansado, quizás por el viaje. Creo que después va a subir a la habitación para descansar.',
         [('Buenas tardes. Bienvenido al hotel. ¿Tiene una reserva?', 'あなたは客。予約していると伝え、名前を言う', 'Buenas tardes. Sí, tengo una reserva a nombre de Yamada.'),
          ('Sí, aquí está. Una habitación individual para dos noches.', '朝食は何時かたずねる', 'Perfecto. ¿A qué hora es el desayuno?'),
          ('El desayuno es de siete a diez, en el primer piso.', 'Wi-Fi のパスワードをたずねる', 'Muy bien. ¿Y cuál es la contraseña del wifi?'),
          ('Está en esta tarjeta. Su habitación es la doscientos cinco.', 'お礼を言う', 'Muchas gracias. Hasta luego.')]),
    FOTO('Foto B: unos amigos en el parque',
         scene('park', [['🌳', 40, 60, 50], ['🧑', 110, 126, 42], ['👧', 160, 126, 42], ['👦', 210, 126, 42], ['⚽', 240, 150, 22], ['🧺', 136, 150, 24]]),
         'En la foto hay tres amigos en un parque. Hace buen tiempo. Están sentados en la hierba y tienen una cesta con comida, así que creo que están haciendo un pícnic. A la derecha hay un balón. Parece que están hablando y riendo. Creo que después van a jugar al fútbol.',
         [('¡Hola! Oye, ¿quieres hacer un pícnic en el parque este sábado?', 'あなたは友達。行きたいと答え、時間をたずねる', '¡Hola! Sí, me encantaría. ¿A qué hora quedamos?'),
          ('¿Qué te parece a las once?', '11時は少し早いので12時を提案する', 'A las once es un poco pronto para mí. ¿Y a las doce?'),
          ('Vale, a las doce. ¿Puedes traer algo?', '飲み物を持っていくと言う', 'Claro, yo llevo las bebidas.'),
          ('¡Genial! Nos vemos en la entrada del parque.', '別れのあいさつ', '¡Perfecto! Hasta el sábado.')]),
  ]),
]
DELE_A2 = dict(DELE_COMMON, **{
    'grade': 'DELE A2', 'tier': 1, 'minutes': 24, 'chooseNote': 'カードからテーマと写真を1つずつ選ぼう',
    'varies': '3つのセットから、テーマと写真を選べます。',
    'sumNote': '本番の会話テストは25点満点で、聞き取りと合わせて50点中30点以上が合格の条件です(採点者2人が、まとまり・流ちょうさ・正確さ・表現の幅などを見ます)。70%をこえたら手ごたえあり。',
    'flow': ['準備 12分 ・ Tarea 1 のテーマ(2つから1つ)と Tarea 2 の写真(2つから1つ)を選んでメモ', 'Tarea 1 ・ テーマについてモノローグ(2〜3分)', 'Tarea 2 ・ 写真の描写(2〜3分)', 'Tarea 3 ・ 写真の場面でロールプレイ(3〜4分)'],
    'open': [], 'close': [S("Muy bien, hemos terminado. Muchas gracias y hasta luego."), END_K],
    'cards': DELE_A2_SETS, 'pools': {},
})

# ---------------------------------------------------------------- DELE B1
B1_PTS = ['はじめに → 項目ごとに → まとめ', '2〜3分。意見には理由(porque / ya que)を']
QB1_PTS = ['経験・好み・意見・自分の国のことを具体的に', 'sí / no だけで終わらせない']


def B1_SET(temas, fotos):
    q = lambda n: {'no': 'Tarea 2 会話%d' % (n + 1), 'pts': 3, 'q': '', 'ja': 'テーマについての質問', 'points': QB1_PTS}
    r = lambda n: {'no': 'Tarea 4 ロールプレイ%d' % (n + 1), 'pts': 3, 'q': '', 'ja': 'ロールカードの状況で会話', 'points': RP_PTS}
    f = lambda n: {'no': 'Tarea 3 質問%d' % (n + 1), 'pts': 3, 'q': '', 'ja': '写真の話題についての質問', 'points': ['自分の経験や意見で2〜3文']}
    items = {'monologo': {'no': 'Tarea 1 モノローグ', 'pts': 8, 'set': 'temas', 'setLabel': '選んだテーマ', 'q': '(選んだテーマについて2〜3分)', 'ja': '準備したテーマについて、項目にそって話す', 'points': B1_PTS},
             'foto': {'no': 'Tarea 3 写真の描写', 'pts': 6, 'set': 'fotos', 'setLabel': '選んだ写真', 'q': '(写真を説明する)', 'ja': '選んだ写真を1〜2分で説明する', 'points': ['人物・場所・物・人の関係・話していること/気持ち', 'Creo que … / Parece que …']}}
    for n in range(4): items['c%d' % (n + 1)] = q(n); items['r%d' % (n + 1)] = r(n)
    for n in range(2): items['fq%d' % (n + 1)] = f(n)
    return {
        'card': {'title': 'DELE B1', 'sets': ['temas', 'fotos'], 'temasTitle': 'Tarea 1: elige un tema', 'fotosTitle': 'Tarea 3: elige una fotografía',
                 'temas': temas, 'fotos': fotos, 'rolSet': 'fotos', 'rolTitle': 'Tarea 4: situación simulada'},
        'steps': [
            S("Hola. Tienes quince minutos para preparar la tarea uno. Elige uno de los dos temas. Puedes tomar notas, pero no puedes leerlas."),
            dict(CARD, show='temas'), TOPICS('temas', 900, '準備 15分(テーマを選んでメモ)', notes=True), dict(HIDE, keep=True),
            S("Hola, buenos días. Soy {ex}. ¿Cómo te llamas?"), ANS('name', 8, '名前'),
            S("Mucho gusto. Vamos a empezar. Tarea uno. Tienes entre dos y tres minutos para hablar sobre el tema que has preparado. Cuando quieras."),
            ANS('monologo', 180, tip='2〜3分。メモは見てもOK、読み上げはNG'),
            S("Muy bien. Tarea dos. Ahora vamos a hablar un poco más sobre este tema."),
            TQ('temas', 'qs', 0, 'c1', 40), TQ('temas', 'qs', 1, 'c2', 40), TQ('temas', 'qs', 2, 'c3', 40), TQ('temas', 'qs', 3, 'c4', 40), HIDE,
            S("Gracias. Tarea tres. Aquí tienes dos fotografías. Elige una y descríbela durante uno o dos minutos."),
            dict(CARD, show='fotos'), TOPICS('fotos', 20, '写真を選ぶ'),
            ANS('foto', 120, tip='1〜2分。人物・場所・物・関係・気持ち'),
            TQ('fotos', 'qs', 0, 'fq1', 35), TQ('fotos', 'qs', 1, 'fq2', 35), HIDE,
            S("Muy bien. Tarea cuatro. Lee la situación de la tarjeta. Tienes un minuto."),
            dict(CARD, show='rol'), {'k': 'prep', 'sec': 60, 'label': 'ロールカードを読む(1分)'},
            TQ('fotos', 'rp', 0, 'r1', 30), TQ('fotos', 'rp', 1, 'r2', 30), TQ('fotos', 'rp', 2, 'r3', 30), TQ('fotos', 'rp', 3, 'r4', 30), HIDE,
        ],
        'items': items,
    }


DELE_B1_SETS = [
  B1_SET([
    TEMA('Las vacaciones ideales', ['Cómo serían tus vacaciones ideales', 'Unas vacaciones que recuerdas especialmente', 'Si prefieres viajar solo o acompañado, y por qué', 'Ventajas e inconvenientes de viajar en temporada alta', 'Tu opinión sobre el turismo masivo'],
         'Voy a hablar de las vacaciones ideales. Para mí, unas vacaciones ideales serían un viaje a Canadá en avión, con tiempo para hacer senderismo y visitar ciudades. Recuerdo especialmente un viaje a Hokkaido con mi familia: fue la primera vez que vi el paisaje desde la ventanilla y desde entonces quiero ser piloto. Prefiero viajar acompañado, porque es más divertido y más seguro, aunque viajar solo te hace más independiente. Viajar en temporada alta tiene ventajas, como el buen tiempo, pero los precios son más caros y hay mucha gente. Por último, creo que el turismo masivo es un problema en algunos lugares, porque los vecinos no pueden vivir tranquilos. En resumen, me gustan los viajes tranquilos y bien organizados.',
         [('¿Viajas a menudo con tu familia?', 'Sí, normalmente hacemos un viaje en verano y otro en Año Nuevo, casi siempre dentro de Japón.'),
          ('¿Qué lugar de tu país le recomendarías a un turista? ¿Por qué?', 'Le recomendaría Kioto, porque tiene templos preciosos y se puede conocer la cultura tradicional japonesa.'),
          ('¿Has tenido algún problema durante un viaje?', 'Sí, una vez se canceló nuestro vuelo por un tifón. Tuvimos que dormir en un hotel cerca del aeropuerto, pero al final todo salió bien.'),
          ('En tu país, ¿cuándo suele viajar la gente?', 'La mayoría viaja en Año Nuevo, en la Semana Dorada de mayo y en agosto, así que en esas fechas todo está lleno.')]),
    TEMA('El deporte en mi vida', ['Qué deporte practicas o te gustaría practicar', 'Cuándo y dónde lo practicas', 'Una experiencia relacionada con el deporte', 'Ventajas de hacer deporte', 'Tu opinión sobre los deportistas famosos'],
         'Hoy voy a hablar del deporte en mi vida. Yo practico ciclismo y también hago ejercicios de fuerza en casa. Normalmente monto en bicicleta los fines de semana por el río, y hago ejercicios tres veces por semana. Una experiencia que recuerdo es una ruta de cincuenta kilómetros que hice con mi padre: fue muy dura, pero me sentí muy orgulloso. Hacer deporte tiene muchas ventajas: es bueno para la salud, reduce el estrés y ayuda a dormir mejor. En cuanto a los deportistas famosos, creo que son un buen ejemplo para los jóvenes, pero a veces ganan demasiado dinero. Para terminar, para mí el deporte es una parte importante de la vida.',
         [('¿Qué deportes son más populares en tu país?', 'El béisbol y el fútbol son los más populares. Últimamente también el baloncesto.'),
          ('¿Hacías deporte en el colegio cuando eras pequeño?', 'Sí, jugaba al fútbol casi todos los días después de clase con mis amigos.'),
          ('¿Crees que los niños hacen menos deporte que antes?', 'Creo que sí, porque pasan más tiempo con el móvil y los videojuegos.'),
          ('¿Prefieres ver deporte en la televisión o en el estadio?', 'Prefiero el estadio, porque el ambiente es increíble, aunque en la tele se ve mejor el juego.')]),
  ], [
    FOTO('Foto A: una excursión en bicicleta',
         scene('park', [['🌳', 40, 60, 50], ['🚴', 110, 126, 48], ['🚴‍♀️', 180, 126, 48], ['🗺️', 250, 70, 34], ['☀️', 260, 26, 26]]),
         'En la foto hay dos personas que están haciendo una excursión en bicicleta. Creo que son amigos o pareja. Están en el campo, cerca de unos árboles, y hace sol. Llevan casco y ropa de deporte. Parece que están contentos y que están hablando del camino. Creo que van a parar pronto para descansar y comer algo.',
         [('Hola, buenas tardes. Bienvenido al club. ¿En qué puedo ayudarte?', 'あなたはサイクリングクラブに入りたい。あいさつして、入会したいと伝える', 'Hola, buenas tardes. Me gustaría apuntarme al club de ciclismo.'),
          ('¡Estupendo! ¿Has montado alguna vez en grupo?', '経験を説明する(週末に父と50km走る)', 'Sí, suelo montar con mi padre los fines de semana. A veces hacemos rutas de cincuenta kilómetros.'),
          ('Muy bien. Salimos los sábados a las ocho. ¿Te viene bien?', '土曜はいいが朝早いので、ほかの日もあるかたずねる', 'Los sábados me vienen bien, pero las ocho es un poco temprano. ¿Hay salidas otros días?'),
          ('También salimos los domingos a las diez. La cuota es de veinte euros al mes.', '何を持っていけばいいかたずねてお礼を言う', 'Perfecto, entonces los domingos. ¿Qué tengo que llevar? Muchas gracias por la información.')],
         qs=[('¿Te gusta hacer excursiones? ¿Adónde vas normalmente?', 'Sí, me encanta. Normalmente voy en bicicleta por el río o a la montaña con mi padre.'),
             ('¿Crees que en tu ciudad es fácil moverse en bicicleta?', 'No mucho, porque hay pocos carriles bici y las calles son estrechas. Habría que construir más.')],
         rol=('Quieres apuntarte a un club de ciclismo. Hablas con el responsable del club (el entrevistador).', ['Saluda y explica qué quieres.', 'Explica tu experiencia.', 'Habla de los horarios.', 'Pregunta qué tienes que llevar.'])),
    FOTO('Foto B: una familia cocinando',
         scene('kitchen', [['👨', 70, 122, 48], ['👧', 140, 126, 40], ['👩', 210, 122, 48], ['🥘', 140, 150, 26], ['🥕', 176, 148, 20]]),
         'En esta foto veo a una familia en la cocina: el padre, la madre y una niña. Están preparando la comida juntos. La niña está mirando una olla y la madre está cortando zanahorias. Parece que están contentos y que lo pasan bien. Creo que están preparando una comida especial, quizás para una fiesta familiar.',
         [('Hola, ¿qué tal? Oye, ¿vienes a cenar a mi casa el viernes?', 'あなたは友達。招待にお礼を言い、行けると伝える', '¡Hola! Muchas gracias por la invitación. Sí, el viernes puedo ir.'),
          ('¡Genial! Voy a hacer paella. ¿Hay algo que no comas?', '食べられないもの(きのこ)を伝える', 'Como casi de todo, pero no me gustan mucho las setas.'),
          ('No pasa nada, la hago sin setas. ¿Puedes venir a las ocho?', '8時は部活で遅れるので8時半でいいか聞く', 'A las ocho tengo entrenamiento. ¿Puedo llegar a las ocho y media?'),
          ('Claro, sin problema.', '何か持っていくものはあるか聞く', 'Perfecto. ¿Quieres que lleve algo? Puedo llevar el postre.')],
         qs=[('¿Sueles cocinar con tu familia?', 'A veces. Los domingos preparamos gyoza todos juntos y es muy divertido.'),
             ('¿Crees que es importante que los jóvenes sepan cocinar?', 'Sí, porque cuando vivan solos tendrán que cuidar su alimentación y ahorrar dinero.')],
         rol=('Un amigo te invita a cenar a su casa. Habla con él (el entrevistador).', ['Agradece la invitación.', 'Explica qué no comes.', 'Habla de la hora.', 'Ofrécete a llevar algo.'])),
  ]),
  B1_SET([
    TEMA('La tecnología en mi vida', ['Qué aparatos usas cada día y para qué', 'Una aplicación que te parece útil', 'Ventajas e inconvenientes de las redes sociales', 'Cómo usabas la tecnología cuando eras pequeño', 'Tu opinión sobre el uso del móvil en clase'],
         'Voy a hablar de la tecnología en mi vida. Cada día uso el móvil y una tableta: el móvil para hablar con mis amigos y la tableta para estudiar. Una aplicación muy útil para mí es una de vocabulario, porque me repite las palabras que olvido. Las redes sociales tienen ventajas, como estar en contacto con amigos, pero también inconvenientes, como perder mucho tiempo. Cuando era pequeño solo usaba la tableta para ver dibujos animados. Sobre el móvil en clase, creo que no debería estar prohibido del todo, pero el profesor tiene que decidir cuándo se puede usar. En conclusión, la tecnología me ayuda mucho si la uso bien.',
         [('¿Cuántas horas al día usas el móvil?', 'Unas tres horas, sobre todo por la tarde. Intento no usarlo antes de dormir.'),
          ('¿Crees que los jóvenes dependen demasiado de la tecnología?', 'Sí, un poco. Muchos no pueden estar sin el móvil ni una hora.'),
          ('¿Has tenido algún problema con la tecnología?', 'Sí, una vez se me rompió el móvil antes de un viaje y no podía usar el mapa. Tuve que preguntar a la gente.'),
          ('En tu país, ¿las personas mayores usan mucho internet?', 'Cada vez más. Mi abuela ahora hace videollamadas con nosotros.')]),
    TEMA('Aprender idiomas', ['Qué idiomas hablas o estudias', 'Por qué estudias español', 'Qué es lo más difícil para ti', 'Una experiencia usando un idioma extranjero', 'Tu opinión sobre las aplicaciones para aprender idiomas'],
         'Hoy voy a hablar de aprender idiomas. Hablo japonés, estudio inglés en el colegio y español por mi cuenta. Estudio español porque es una lengua que se habla en muchos países y me gustaría viajar por Latinoamérica. Lo más difícil para mí son los verbos, porque tienen muchas formas. Una experiencia que recuerdo es cuando ayudé a unos turistas españoles en la estación: estaba nervioso, pero me entendieron. Sobre las aplicaciones, creo que son muy útiles para el vocabulario, pero para hablar bien hay que practicar con personas. Para terminar, aprender idiomas me abre muchas puertas.',
         [('¿Cuánto tiempo estudias español a la semana?', 'Unas cuatro horas. Estudio un poco cada día con una aplicación y los fines de semana veo series.'),
          ('¿Has estado en algún país de habla hispana?', 'Todavía no, pero me gustaría ir a España o a México el año que viene.'),
          ('¿Crees que es mejor aprender un idioma de niño?', 'Creo que sí, porque los niños aprenden la pronunciación más fácilmente, pero nunca es tarde.'),
          ('En tu país, ¿qué idiomas se estudian más?', 'Sobre todo el inglés. También el chino y el coreano son cada vez más populares.')]),
  ], [
    FOTO('Foto A: en el aeropuerto',
         scene('airport', [['🪟', 150, 42, 60], ['✈️', 150, 40, 30], ['🧑', 80, 126, 44], ['🛄', 118, 140, 26], ['👩‍💼', 220, 124, 46]], bubbles=[think_b(40, 60, '🧳❓', 56)]),
         'En la foto estamos en un aeropuerto. Un chico joven habla con una empleada de la compañía aérea en un mostrador. Creo que ha perdido su maleta, porque parece preocupado y está mirando la cinta de equipajes. Al fondo se ve un avión por la ventana. Creo que la empleada le va a ayudar a encontrarla.',
         [('Buenas tardes. ¿En qué puedo ayudarle?', 'あなたは乗客。スーツケースが出てこなかったと伝える', 'Buenas tardes. Acabo de llegar de Tokio y mi maleta no ha salido.'),
          ('Lo siento mucho. ¿Me puede describir la maleta?', '色・大きさ・特徴(ステッカー)を説明する', 'Sí, es una maleta grande, de color azul, y tiene una pegatina de un avión.'),
          ('Muy bien. Normalmente las maletas llegan en el siguiente vuelo. ¿Dónde se aloja?', 'ホテルの名前を伝え、いつ届くかたずねる', 'Me alojo en el hotel Sol, en el centro. ¿Cuándo cree que llegará?'),
          ('Probablemente mañana por la mañana. Se la enviaremos al hotel.', '必要なものが入っているので、早めにほしいと伝えてお礼', 'Vale, gracias. Es que tengo mis medicinas en la maleta, así que, por favor, envíenla lo antes posible.')],
         qs=[('¿Te gusta viajar en avión? ¿Por qué?', 'Me encanta, porque me interesan los aviones y quiero ser piloto. Además, se llega muy rápido.'),
             ('¿Has perdido algo alguna vez durante un viaje?', 'Sí, una vez me dejé el paraguas en un tren, pero lo recuperé en la oficina de objetos perdidos.')],
         rol=('Has llegado al aeropuerto y tu maleta no ha salido. Hablas con un empleado de la compañía aérea (el entrevistador).', ['Explica el problema.', 'Describe tu maleta.', 'Di dónde te alojas.', 'Pide que te la envíen pronto y explica por qué.'])),
    FOTO('Foto B: en una tienda de electrónica',
         scene('shop', [['📱', 60, 60, 30], ['💻', 110, 60, 34], ['🎧', 160, 60, 30], ['🙎', 100, 124, 46], ['🧑‍💼', 220, 124, 46]], bubbles=[say_b(100, 30, '¡No funciona!', 100)]),
         'En esta foto hay una tienda de aparatos electrónicos. Una mujer está hablando con un dependiente y parece enfadada. Creo que su móvil no funciona y quiere devolverlo o cambiarlo. Detrás hay ordenadores, móviles y auriculares. Creo que el dependiente va a intentar solucionar el problema.',
         [('Hola, buenos días. ¿Qué le pasa?', 'あなたは客。先週買ったスマホが動かないと伝える', 'Buenos días. Compré este móvil la semana pasada y ya no funciona.'),
          ('¿Qué problema tiene exactamente?', '症状を説明する(充電できない)', 'No se carga. Lo conecto al cargador, pero la batería no sube.'),
          ('¿Tiene el tique de compra?', 'レシートを渡し、交換を希望する', 'Sí, aquí lo tiene. Me gustaría cambiarlo por otro nuevo.'),
          ('Ahora mismo no tenemos ese modelo. Podemos repararlo en una semana.', '1週間は長いので、返金をお願いする', 'Una semana es mucho tiempo, porque lo necesito para estudiar. ¿Me pueden devolver el dinero?')],
         qs=[('¿Compras muchas cosas por internet o en tiendas?', 'Compro libros por internet, pero los aparatos electrónicos prefiero verlos en la tienda.'),
             ('¿Qué haces cuando un producto que has comprado no funciona?', 'Vuelvo a la tienda con el tique y pido que me lo cambien.')],
         rol=('El móvil que compraste no funciona. Vuelves a la tienda y hablas con el dependiente (el entrevistador).', ['Explica el problema.', 'Da detalles.', 'Pide un cambio.', 'Si no es posible, propón otra solución.'])),
  ]),
  B1_SET([
    TEMA('Mi lugar favorito', ['Cuál es y dónde está', 'Por qué te gusta', 'Qué haces allí', 'Un recuerdo especial de ese lugar', 'Si recomendarías ese lugar a otras personas'],
         'Mi lugar favorito es un parque al lado del río, a veinte minutos de mi casa en bicicleta. Me gusta porque es tranquilo, hay muchos árboles y se puede respirar aire puro. Allí monto en bicicleta, escucho música y, a veces, estudio en un banco. Además, los aviones pasan muy bajo antes de aterrizar, y me encanta verlos. Un recuerdo especial es un día de primavera en que fui con mis amigos a ver los cerezos y comimos juntos. Sin duda, recomendaría este lugar a cualquier persona que quiera descansar de la ciudad.',
         [('¿Prefieres los lugares tranquilos o los lugares con mucha gente?', 'Prefiero los tranquilos, aunque a veces me gusta ir al centro con amigos.'),
          ('¿Hay muchos parques en tu ciudad?', 'Hay algunos, pero son pequeños. Me gustaría que hubiera más zonas verdes.'),
          ('¿Qué lugar de tu infancia recuerdas especialmente?', 'Recuerdo el jardín de mis abuelos, donde jugaba con mi hermano en verano.'),
          ('¿Crees que la gente pasa poco tiempo al aire libre hoy en día?', 'Sí, sobre todo los jóvenes, porque pasan mucho tiempo con el móvil.')]),
    TEMA('La comida saludable', ['Qué comes normalmente en un día', 'Si crees que comes de forma sana', 'La comida típica de tu país', 'Un plato que te gusta cocinar', 'Tu opinión sobre la comida rápida'],
         'Voy a hablar de la comida saludable. Normalmente desayuno arroz y sopa de miso, como en el colegio y ceno con mi familia. Creo que como de forma bastante sana, aunque a veces como demasiados dulces. La comida típica de Japón es sana, porque tiene mucho pescado y verdura. Me gusta cocinar arroz frito, porque es fácil y rápido. Sobre la comida rápida, creo que no es mala si se come de vez en cuando, pero comerla todos los días es peligroso para la salud. En resumen, intento comer variado.',
         [('¿Quién cocina normalmente en tu casa?', 'Normalmente mi madre, pero los fines de semana cocina mi padre.'),
          ('¿Has cambiado tu forma de comer en los últimos años?', 'Sí, ahora como más proteínas porque hago ejercicios de fuerza.'),
          ('¿Crees que los colegios deberían enseñar a cocinar?', 'Sí, porque es una habilidad necesaria para la vida.'),
          ('¿Qué comida de otro país te gusta?', 'Me encanta la comida italiana, sobre todo la pizza y la pasta.')]),
  ], [
    FOTO('Foto A: una queja en un hotel',
         scene('room', [['🛏️', 70, 136, 60], ['🪟', 70, 50, 44], ['👨', 170, 124, 46], ['👩‍💼', 240, 122, 46]], bubbles=[think_b(120, 40, '❄️😣', 56)]),
         'En la foto hay un hombre en una habitación de hotel. Está hablando con una empleada del hotel y parece que no está contento. Creo que la calefacción no funciona, porque tiene frío. Hay una cama y una ventana. Creo que la empleada le va a cambiar de habitación.',
         [('Buenas noches. ¿En qué puedo ayudarle?', 'あなたは客。部屋の暖房が動かないと伝える', 'Buenas noches. La calefacción de mi habitación no funciona y hace mucho frío.'),
          ('Lo siento. Voy a llamar al técnico, pero no puede venir hasta mañana.', '明日までは待てないので、部屋を替えてほしいと言う', 'Es que no puedo esperar hasta mañana. ¿Me pueden cambiar de habitación?'),
          ('Solo nos queda una habitación doble, que es más cara.', '料金は同じにしてほしいと交渉する', 'Entiendo, pero el problema no es culpa mía. ¿Podría ser al mismo precio?'),
          ('De acuerdo, se la dejamos al mismo precio.', 'お礼を言い、荷物を運ぶのを手伝ってもらえるか聞く', 'Muchísimas gracias. ¿Alguien me puede ayudar con las maletas?')],
         qs=[('¿Alguna vez te has quejado en una tienda o en un hotel?', 'Sí, una vez en un restaurante nos trajeron un plato equivocado y lo dije amablemente.'),
             ('¿Crees que es fácil quejarse en tu país?', 'No mucho. En Japón la gente prefiere no quejarse, pero creo que a veces es necesario.')],
         rol=('Estás en un hotel y la calefacción de tu habitación no funciona. Hablas con la recepción (el entrevistador).', ['Explica el problema.', 'Pide una solución rápida.', 'Negocia el precio.', 'Pide ayuda con el equipaje.'])),
    FOTO('Foto B: una fiesta de cumpleaños',
         scene('room', [['🎈', 40, 40, 30], ['🎈', 260, 40, 30], ['🎂', 150, 146, 32], ['👦', 90, 124, 42], ['👧', 150, 120, 42], ['👨', 210, 122, 46]], bubbles=[say_b(150, 40, '¡Feliz cumpleaños!', 120)]),
         'En esta foto hay una fiesta de cumpleaños en una casa. Hay globos y una tarta grande en la mesa. Creo que es el cumpleaños de la niña, porque todos la miran. Hay dos chicos y un hombre, que puede ser su padre. Todos parecen muy contentos. Creo que después van a comer la tarta y abrir los regalos.',
         [('¡Hola! El sábado es el cumpleaños de Marta y le vamos a hacer una fiesta sorpresa. ¿Vienes?', 'あなたは友達。ぜひ行くと答え、時間と場所をたずねる', '¡Qué buena idea! Claro que voy. ¿A qué hora y dónde es?'),
          ('A las seis en mi casa. Estamos pensando en el regalo. ¿Tienes alguna idea?', 'プレゼントを提案する(好きな歌手のコンサートのチケット)', 'A Marta le encanta la música. ¿Por qué no le regalamos entradas para un concierto?'),
          ('¡Me parece genial! Pero son un poco caras.', 'みんなでお金を出し合おうと提案する', 'Si pagamos entre todos, no es tanto. Somos seis, ¿no?'),
          ('Sí, seis. Vale, yo compro las entradas.', '自分はケーキを担当すると申し出る', 'Perfecto. Entonces yo me encargo de la tarta. ¡Va a ser una sorpresa estupenda!')],
         qs=[('¿Cómo celebras normalmente tu cumpleaños?', 'Normalmente ceno con mi familia y mis padres me compran una tarta.'),
             ('¿Qué regalo te ha hecho más ilusión?', 'Una maqueta de avión que me regalaron mis abuelos. Todavía la tengo en mi habitación.')],
         rol=('Un amigo te propone organizar una fiesta sorpresa. Habla con él (el entrevistador).', ['Acepta y pide detalles.', 'Propón un regalo.', 'Propón cómo pagarlo.', 'Ofrécete a ayudar.'])),
  ]),
]
DELE_B1 = dict(DELE_COMMON, **{
    'grade': 'DELE B1', 'tier': 2, 'minutes': 30,
    'varies': '3つのセットから、テーマと写真を選べます。',
    'sumNote': '本番の会話テストは25点満点で、聞き取りと合わせて50点中30点以上が合格の条件です(採点者2人が、まとまり・流ちょうさ・正確さ・表現の幅などを見ます)。70%をこえたら手ごたえあり。',
    'flow': ['準備 15分 ・ Tarea 1 のテーマを2つから1つ選んでメモ(読み上げはNG)', 'Tarea 1 ・ モノローグ(2〜3分)', 'Tarea 2 ・ 同じテーマについての会話(3〜4分)', 'Tarea 3 ・ 写真を2枚から1枚選んで描写(1〜2分)+ 質問', 'Tarea 4 ・ 写真の裏のロールカードを1分読んで、ロールプレイ(2〜3分)'],
    'open': [], 'close': [S("Muy bien, hemos terminado. Muchas gracias y hasta luego."), END_K],
    'cards': DELE_B1_SETS, 'pools': {},
})

# ---------------------------------------------------------------- CILS A2 / B1
def ARG(t, qs):
    """a conversation topic (Prova 1): the examiner's first question and follow-ups [(q, model)]"""
    return {'t': t, 'qs': [q for q, m in qs], 'qsm': [m for q, m in qs]}


def TEMI(t, model):
    return {'t': t, 'model': model}


CILS_ITEMS = {
    'eff': {'no': '課題の達成', 'pts': 5, 'overall': True, 'q': '(全体)', 'ja': '話題・テーマにそって、言いたいことが伝わったか', 'points': ['質問に合った答え', '例や理由を入れて話をふくらませる']},
    'les': {'no': '語彙', 'pts': 5, 'overall': True, 'q': '(全体)', 'ja': 'ふさわしい語を使えたか', 'points': ['同じ語のくり返しを避ける']},
    'gra': {'no': '文法', 'pts': 5, 'overall': True, 'q': '(全体)', 'ja': '動詞の活用・性数一致・時制', 'points': ['passato prossimo と imperfetto の使い分け', '冠詞と形容詞の性数一致']},
    'pro': {'no': '発音・流ちょうさ', 'pts': 5, 'overall': True, 'q': '(全体)', 'ja': '聞き取りやすさと話の流れ', 'points': ['二重子音(anno / ano)をはっきり', '長い沈黙を作らない']},
}


def CILS_SET(args, temi, mono_sec):
    items = {'mono': {'no': 'Prova 2 モノローグ', 'pts': 10, 'set': 'temi', 'setLabel': '選んだテーマ', 'q': '(選んだテーマについて話す)', 'ja': '選んだテーマについて、ひとりで話す', 'points': ['はじめ → 中身 → まとめ', '時間いっぱい話す']}}
    for n in range(3):
        items['d%d' % (n + 1)] = {'no': 'Prova 1 会話%d' % (n + 1), 'pts': 4, 'q': '', 'ja': '選んだ話題についての会話', 'points': ['理由や例を1〜2文そえる', '相手の質問に合わせて']}
    return {
        'card': {'title': 'CILS', 'sets': ['argomenti', 'temi'], 'argomentiTitle': 'Prova 1: scegli un argomento', 'temiTitle': 'Prova 2: scegli un tema', 'argomenti': args, 'temi': temi},
        'steps': [
            S("Bene. Cominciamo con la prima prova. Ecco alcuni argomenti di conversazione. Scegline uno."),
            dict(CARD, show='argomenti'), TOPICS('argomenti', 30, '話題を選ぶ'),
            TQ('argomenti', 'qs', 0, 'd1', 40), TQ('argomenti', 'qs', 1, 'd2', 40), TQ('argomenti', 'qs', 2, 'd3', 40), HIDE,
            S("Grazie. Adesso passiamo alla seconda prova. Scegli uno di questi temi e preparati per un minuto. Poi parla da solo."),
            dict(CARD, show='temi'), TOPICS('temi', 60, '準備 1分(テーマを選ぶ・メモOK)', notes=True),
            ANS('mono', mono_sec, tip='ひとりで話す。はじめ → 中身 → まとめ'), HIDE,
        ],
        'items': items,
    }


CILS_COMMON = {
    'lang': 'it-IT', 'unit': 'セット', 'att': False, 'pardon': 'Può ripetere?',
    'exs': [['Giulia Rossi', 'f'], ['Marco Bianchi', 'm'], ['Chiara Romano', 'f'], ['Luca Esposito', 'm']],
    'origNote': '話題・テーマはBabel Flightのオリジナルです(流れは本番と同じ。準備の1分は練習用)。',
    'markNote': '採点の観点はこの練習のための目安で、本番の採点とは違います。',
    'voiceNote': '試験官のイタリア語は、この端末の音声で読み上げます(イタリア語の声がない端末では、うまく読めないことがあります)。試験官は毎回変わります。',
    'subNote': 'イタリア語の文を表示する(本番は表示されません)',
    'hideNote': '(試験官が話しています。イタリア語は非表示)', 'ansNote': 'イタリア語で答えよう',
    'chooseNote': 'カードから1つ選ぼう', 'againNote': '同じセットでもう一度', 'items': CILS_ITEMS,
    'open': [S("Buongiorno. Mi chiamo {ex}. Come ti chiami?"), ANS('name', 8, '名前'),
             S("Piacere. Di dove sei?"), ANS('from', 8, '出身'),
             S("E che cosa fai nella vita?"), ANS('job', 12, '仕事・勉強')],
    'close': [S("Bene, abbiamo finito. Grazie e arrivederci."), END_K],
    'pools': {},
}
CILS_A2_SETS = [
  CILS_SET([
    ARG('La tua famiglia', [('Parlami della tua famiglia. Quante persone siete?', 'Siamo in quattro: mio padre, mia madre, mio fratello e io. Mio fratello ha dieci anni.'),
                            ('Che cosa fate insieme nel fine settimana?', 'La domenica pranziamo insieme e qualche volta andiamo in montagna.'),
                            ('Assomigli di più a tua madre o a tuo padre?', 'Assomiglio di più a mio padre, perché anche lui è alto e tranquillo.')]),
    ARG('Il tempo libero', [('Che cosa fai nel tempo libero?', 'Vado in bicicletta e ascolto musica. Mi piace anche guardare gli aerei.'),
                            ('Con chi passi il tempo libero?', 'Di solito con mio padre o con i miei amici di scuola.'),
                            ('Che cosa hai fatto lo scorso fine settimana?', "Sono andato all'aeroporto con la mia famiglia e abbiamo fatto molte foto.")]),
    ARG('La tua casa', [('Dove abiti? In una casa o in un appartamento?', "Abito in un appartamento all'ottavo piano, vicino alla stazione."),
                        ('Qual è la tua stanza preferita?', 'La mia camera, perché lì studio e ascolto musica.'),
                        ('Che cosa vorresti cambiare nella tua casa?', 'Vorrei una scrivania più grande, perché ho tanti libri.')]),
  ], [
    TEMI('Racconta come passi una giornata normale.', 'Di solito mi alzo alle sei e mezza. Faccio colazione con riso e zuppa di miso e poi vado a scuola in bicicletta. Le lezioni cominciano alle otto e mezza e finiscono alle tre. Dopo la scuola vado al club di scienze. Torno a casa verso le sei, ceno con la mia famiglia e poi studio per due ore. Prima di dormire ascolto un po\' di musica. Vado a letto alle undici.'),
    TEMI('Descrivi il tuo migliore amico o la tua migliore amica.', 'Il mio migliore amico si chiama Kenta. Ha quindici anni come me. È alto, ha i capelli corti e porta gli occhiali. È molto simpatico e divertente. Ci conosciamo dalla scuola elementare. Ci piace andare in bicicletta insieme e giocare ai videogiochi. Quando ho un problema, lui mi ascolta sempre. Per me è come un fratello.'),
    TEMI("Racconta l'ultimo viaggio che hai fatto.", "L'estate scorsa sono andato a Okinawa con la mia famiglia. Siamo partiti in aereo da Tokyo e il volo è durato quasi tre ore. A Okinawa faceva molto caldo. Abbiamo nuotato in un mare bellissimo e abbiamo visitato un acquario enorme. Ho mangiato anche molti piatti tipici. È stato un viaggio fantastico e vorrei tornarci."),
  ], 90),
  CILS_SET([
    ARG('La scuola', [('Che cosa studi a scuola?', "Studio molte materie: matematica, scienze, giapponese e inglese."),
                      ('Qual è la tua materia preferita? Perché?', "Mi piace l'inglese, perché posso parlare con persone di altri Paesi."),
                      ('Com\'è la tua scuola?', 'È una scuola abbastanza grande, con una palestra e un bel giardino.')]),
    ARG('Lo sport', [('Fai sport?', 'Sì, vado in bicicletta e faccio esercizi a casa tre volte alla settimana.'),
                     ('Qual è lo sport più popolare nel tuo Paese?', 'In Giappone il baseball è molto popolare, ma anche il calcio.'),
                     ('Preferisci fare sport o guardarlo in TV?', 'Preferisco farlo, perché mi fa sentire bene.')]),
    ARG('Il cibo', [('Qual è il tuo piatto preferito?', 'Il mio piatto preferito è il ramen, soprattutto con il miso.'),
                    ('Sai cucinare?', 'Un po\'. So fare il riso fritto e qualche piatto semplice.'),
                    ('Ti piace la cucina italiana?', 'Sì, moltissimo! Mi piacciono la pizza margherita e la pasta al pomodoro.')]),
  ], [
    TEMI('Descrivi la tua città.', "Abito in una città vicino a Tokyo. Non è molto grande, ma è comoda. C'è un fiume con una pista ciclabile e un parco con tanti ciliegi. Vicino alla stazione ci sono negozi e ristoranti. In primavera la città è molto bella. Mi piace perché è tranquilla, ma è facile andare a Tokyo in treno."),
    TEMI('Racconta il tuo ultimo compleanno.', "Il mio ultimo compleanno è stato a settembre. Era domenica, quindi sono stato a casa con la mia famiglia. Mia madre ha preparato una torta al cioccolato e i miei nonni sono venuti a pranzo. Ho ricevuto un modellino di aereo, il regalo che volevo. La sera ho parlato con i miei amici al telefono. È stata una bella giornata."),
    TEMI("Che cosa ti piace fare in estate?", "In estate mi piace andare al mare e in bicicletta la mattina presto, quando non fa ancora caldo. Spesso vado dai miei nonni a Hokkaido, dove fa più fresco. Lì mangio pesce fresco e vado a vedere i fuochi d'artificio. Mi piace anche leggere riviste di aerei sul balcone la sera."),
  ], 90),
  CILS_SET([
    ARG('Gli amici', [('Hai molti amici?', 'Ho alcuni amici molto cari, soprattutto a scuola.'),
                      ('Che cosa fate insieme?', 'Andiamo in bicicletta, studiamo insieme e qualche volta andiamo al karaoke.'),
                      ('Come hai conosciuto il tuo migliore amico?', 'Alla scuola elementare: eravamo nella stessa classe.')]),
    ARG('La musica', [('Che musica ascolti?', 'Ascolto soprattutto K-pop, ma anche musica giapponese.'),
                      ('Quando ascolti musica?', 'Quando vado a scuola e quando faccio i compiti facili.'),
                      ('Suoni uno strumento?', 'Ho suonato il pianoforte per tre anni quando ero piccolo.')]),
    ARG('I viaggi', [('Ti piace viaggiare?', 'Sì, moltissimo, soprattutto in aereo.'),
                     ('Dove sei stato l\'ultima volta?', 'A Okinawa, con la mia famiglia, l\'estate scorsa.'),
                     ('Dove vorresti andare in futuro?', 'Vorrei andare in Italia per vedere Roma e Venezia.')]),
  ], [
    TEMI('Descrivi la tua stanza.', "La mia stanza non è molto grande, ma è luminosa. C'è un letto vicino alla finestra e una scrivania dove studio. Sulla parete ci sono delle foto di aerei e una mappa del mondo. Sullo scaffale ci sono libri e un modellino di aereo. Mi piace la mia stanza perché è tranquilla."),
    TEMI('Racconta un fine settimana speciale.', "Un fine settimana speciale è stato quando sono andato a una mostra di aerei con mio padre. Siamo partiti presto la mattina in treno. Alla mostra abbiamo visto aerei antichi e moderni e sono anche entrato nella cabina di pilotaggio. Poi abbiamo mangiato in un ristorante vicino. Ero molto felice."),
    TEMI('Parla del tuo lavoro ideale.', "Il mio lavoro ideale è fare il pilota di linea. Mi piacciono gli aerei da quando ero bambino. È un lavoro difficile, perché bisogna studiare molto e parlare bene l'inglese, ma è molto interessante. Vorrei volare in tutto il mondo e conoscere persone diverse. Per questo adesso studio le lingue."),
  ], 90),
]
CILS_B1_SETS = [
  CILS_SET([
    ARG('Tempo libero: in casa o all\'aperto?', [('Preferisci passare il tempo libero in casa o all\'aperto? Perché?', "Preferisco stare all'aperto, perché dopo la scuola ho bisogno di muovermi. Vado spesso in bicicletta lungo il fiume."),
                                                ('Era così anche quando eri bambino?', 'Sì, da piccolo giocavo sempre a calcio al parco con i miei amici, anche quando pioveva.'),
                                                ('Secondo te, i giovani di oggi stanno troppo in casa?', 'Secondo me sì, perché passano molte ore con lo smartphone. Le città dovrebbero offrire più spazi per fare sport.')]),
    ARG('La città dove vivi', [('Ti piace la città dove vivi? Perché?', "Sì, mi piace perché è tranquilla e ci sono tanti spazi verdi, ma è anche vicina a Tokyo."),
                               ('Che cosa cambieresti?', 'Costruirei più piste ciclabili, perché le strade sono strette e andare in bicicletta è pericoloso.'),
                               ('Preferiresti vivere in campagna o in una grande città?', 'In futuro vorrei vivere in una grande città per lavoro, ma in vacanza mi piace la campagna.')]),
    ARG('Lavorare da casa', [('Secondo te, è meglio lavorare da casa o in ufficio?', 'Dipende dal lavoro. Da casa si risparmia tempo, ma in ufficio è più facile collaborare con i colleghi.'),
                             ('Conosci qualcuno che lavora da casa?', 'Sì, mio padre lavora da casa due giorni alla settimana. Dice che è più rilassato.'),
                             ('Il tuo lavoro ideale si può fare da casa?', 'No, io vorrei fare il pilota, quindi devo stare in aereo! Ma mi piace così.')]),
  ], [
    TEMI("Racconta un'esperienza che ti ha cambiato.", "Un'esperienza che mi ha cambiato è stato il mio primo volo da solo, l'anno scorso, per andare dai miei nonni. All'inizio ero molto nervoso, perché dovevo fare tutto da solo: il check-in, i controlli di sicurezza e l'imbarco. Durante il volo, un'assistente di volo mi ha parlato del lavoro dei piloti. Quando sono arrivato, mi sentivo più grande e più sicuro di me. Da quel giorno ho deciso che voglio diventare pilota e ho cominciato a studiare le lingue con più impegno."),
    TEMI('Descrivi una festa tradizionale del tuo Paese.', "In Giappone una festa molto importante è il Capodanno. Alla fine di dicembre le famiglie puliscono la casa e il primo gennaio mangiano l'osechi, un piatto tradizionale con tanti piccoli cibi colorati, ognuno con un significato. Molte persone vanno al tempio per pregare per il nuovo anno, e i bambini ricevono dei soldi in una busta, l'otoshidama. Per me è un momento speciale, perché tutta la famiglia si riunisce."),
    TEMI('Parla di un problema della tua città e di come risolverlo.', "Un problema della mia città è il traffico vicino alla stazione, soprattutto la mattina. Molte persone usano la macchina anche per distanze brevi e le strade sono strette, quindi è pericoloso per chi va a piedi o in bicicletta. Secondo me, la soluzione è costruire piste ciclabili sicure e migliorare gli autobus. Inoltre, il comune potrebbe creare un servizio di biciclette in condivisione. Così ci sarebbero meno macchine e l'aria sarebbe più pulita."),
  ], 120),
  CILS_SET([
    ARG('Imparare le lingue', [('Secondo te, è importante imparare le lingue straniere? Perché?', "Sì, è molto importante, perché oggi il mondo è collegato e molte professioni richiedono l'inglese o altre lingue."),
                               ('Quali lingue studi e come?', "Studio inglese a scuola e italiano da solo, con un'app e guardando video."),
                               ('Qual è la cosa più difficile?', 'Per me la cosa più difficile sono i verbi, perché hanno tante forme diverse.')]),
    ARG('I social network', [('Usi i social network? Quanto tempo al giorno?', 'Sì, circa un\'ora al giorno, soprattutto per parlare con gli amici.'),
                             ('Secondo te, i giovani usano troppo i social network?', 'Penso di sì. Alcuni miei amici controllano il telefono ogni cinque minuti.'),
                             ('Quali sono i vantaggi?', 'Si possono conoscere persone con gli stessi interessi e informarsi velocemente.')]),
    ARG('Treno o aereo?', [('Per viaggiare, preferisci il treno o l\'aereo? Perché?', "Preferisco l'aereo, perché mi piace volare e per le distanze lunghe è più veloce."),
                           ('Hai mai fatto un viaggio lungo in treno?', 'Sì, sono andato da Tokyo a Osaka con lo shinkansen. È stato comodissimo.'),
                           ('Secondo te, bisognerebbe usare meno l\'aereo per l\'ambiente?', "Per i viaggi brevi sì, il treno inquina meno. Per i viaggi lunghi l'aereo è necessario, ma deve diventare più pulito.")]),
  ], [
    TEMI('Racconta di una persona che ammiri.', "Una persona che ammiro è la mia insegnante di inglese delle elementari. Era sempre paziente e ci diceva di non avere paura degli errori. Organizzava giochi e canzoni e una volta ha fatto un collegamento online con una scuola australiana: era la prima volta che parlavo inglese con ragazzi della mia età. Grazie a lei ho cominciato ad amare le lingue. La ammiro perché ha cambiato il mio modo di imparare."),
    TEMI('Descrivi il lavoro dei tuoi sogni.', "Il lavoro dei miei sogni è fare il pilota di linea internazionale. Mi piacerebbe perché unisce tecnologia, lavoro di squadra e viaggi. Un pilota deve essere calmo, responsabile e saper comunicare in inglese con i controllori di volo. Per diventarlo bisogna studiare molto e superare esami difficili, anche di salute. So che sarà dura, ma penso che valga la pena."),
    TEMI('Racconta una difficoltà che hai superato.', "Una difficoltà che ho superato è stata parlare in pubblico. Fino a due anni fa ero molto timido e quando dovevo parlare davanti alla classe mi tremava la voce. Allora ho deciso di partecipare a un concorso di discorsi in inglese. Mi sono allenato ogni giorno davanti allo specchio e il mio insegnante mi ha aiutato. Il giorno del concorso ero agitato, ma ce l'ho fatta. Adesso parlare in pubblico non mi fa più paura."),
  ], 120),
  CILS_SET([
    ARG('Lo sport e i giovani', [('Secondo te, lo sport è importante per i giovani? Perché?', 'Sì, perché aiuta a stare in salute, a ridurre lo stress e a fare amicizia.'),
                                 ('Che sport fai?', 'Vado in bicicletta e faccio esercizi di forza a casa.'),
                                 ('Nel tuo Paese a scuola si fa molto sport?', 'Sì, abbastanza. Molti studenti fanno parte di un club sportivo dopo le lezioni.')]),
    ARG('Fare la spesa', [('Preferisci fare la spesa al supermercato o al mercato? Perché?', 'Preferisco il supermercato perché è più comodo, ma al mercato i prodotti sono più freschi.'),
                          ('Chi fa la spesa nella tua famiglia?', 'Di solito mia madre, ma il sabato andiamo tutti insieme.'),
                          ('Compri qualcosa online?', 'Sì, soprattutto libri e vestiti, perché è più veloce.')]),
    ARG('Vivere da soli', [('Secondo te, è meglio vivere da soli o con la famiglia? Perché?', 'Da giovani è bello vivere con la famiglia, ma vivere da soli insegna a essere indipendenti.'),
                           ('In Giappone a che età i giovani vanno a vivere da soli?', "Spesso quando vanno all'università o quando cominciano a lavorare."),
                           ('Tu vorresti vivere da solo? Dove?', "Sì, vorrei vivere da solo vicino a un grande aeroporto, per il mio lavoro.")]),
  ], [
    TEMI('Racconta un film o un libro che ti è piaciuto.', "Un film che mi è piaciuto molto parla di un giovane pilota che deve affrontare un'emergenza durante il suo primo volo. All'inizio è insicuro, ma con l'aiuto del comandante e della sua squadra riesce a portare l'aereo a terra. Mi è piaciuto perché mostra quanto è importante la comunicazione. Inoltre le scene di volo sono spettacolari. Lo consiglio a tutti quelli che amano gli aerei."),
    TEMI('Descrivi una giornata perfetta.', "La mia giornata perfetta comincerebbe con un giro in bicicletta all'alba lungo il fiume. Poi farei colazione con la mia famiglia e andrei all'aeroporto a guardare gli aerei che decollano. A pranzo mangerei un buon ramen con i miei amici. Nel pomeriggio, mi piacerebbe fare un volo su un piccolo aereo con un istruttore. La sera guarderei un film a casa. Sarebbe una giornata perfetta perché unirebbe tutte le cose che amo."),
    TEMI('Parla dei vantaggi e degli svantaggi della tecnologia.', "La tecnologia ha molti vantaggi: possiamo comunicare con persone lontane, studiare online e trovare informazioni in pochi secondi. Per esempio, io studio l'italiano con un'app. Però ci sono anche svantaggi: molte persone passano troppo tempo davanti allo schermo, dormono meno e parlano meno faccia a faccia. Secondo me, la tecnologia è utile se la usiamo con moderazione, quindi è importante imparare a usarla bene fin da piccoli."),
  ], 120),
]
CILS_A2 = dict(CILS_COMMON, **{
    'grade': 'CILS A2', 'tier': 1, 'minutes': 10,
    'varies': '3つのセットから、話題とテーマを選べます。',
    'sumNote': '本番の採点とは違う、自分でつける目安です。70%をこえたら手ごたえあり。',
    'flow': ['自己紹介(名前・出身・していること)', 'Prova 1 ・ 話題を1つ選んで、試験官と会話', 'Prova 2 ・ テーマを1つ選んで、ひとりで話す(約1分半)'],
    'cards': CILS_A2_SETS,
})
CILS_B1 = dict(CILS_COMMON, **{
    'grade': 'CILS B1', 'tier': 2, 'minutes': 12,
    'varies': '3つのセットから、話題とテーマを選べます。',
    'sumNote': '本番の採点とは違う、自分でつける目安です。70%をこえたら手ごたえあり。',
    'flow': ['自己紹介(名前・出身・していること)', 'Prova 1 ・ 話題を1つ選んで、試験官と会話(意見と理由も)', 'Prova 2 ・ テーマを1つ選んで、ひとりで話す(約2分)'],
    'cards': CILS_B1_SETS,
})
ROMANCE = {'delea2': DELE_A2, 'deleb1': DELE_B1, 'cilsa2': CILS_A2, 'cilsb1': CILS_B1}
