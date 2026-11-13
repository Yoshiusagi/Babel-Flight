"""全国通訳案内士 口述試験 practice in English, Korean, Spanish and Italian (the four course languages that have the
certificate). The same Japanese passages and themes; the questions, models and the examiner speak the language.
Flow (about 10 minutes): 通訳 (Japanese read aloud → the foreign language) + questions about it and about how a
guide would respond → プレゼンテーション (choose 1 of 3 themes, about 2 minutes; 30 seconds to prepare here) + a
question. Original material."""
from cards import S, CARD, HIDE, END_K
from intl import ANS
from romance import TOPICS, TQ

JP = lambda t: {'k': 'say', 't': t, 'v': 'ja-JP', 'r': 'jp'}
PASSAGES = [
    '浅草寺は東京でいちばん古いお寺です。大きなちょうちんのある雷門をくぐると、仲見世通りという商店街があり、お土産や和菓子を買うことができます。',
    '日本の温泉には、いくつかのマナーがあります。湯船に入る前に体を洗い、タオルはお湯の中に入れないようにしてください。',
    '京都の伏見稲荷大社は、何千本もの赤い鳥居で有名です。山の頂上まで歩くと、往復で2時間ほどかかります。',
]
GUIDE_ITEMS = {k: {'no': n, 'pts': 3, 'overall': True, 'q': '(全体)', 'ja': j, 'points': p} for k, n, j, p in [
    ('pr', 'プレゼンテーション', '伝え方の組み立て', ['結論 → 説明 → 観光客へのおすすめ']),
    ('cm', 'コミュニケーション', 'やりとりの柔軟さ・会話を続ける意欲', ['質問に合わせて答え、話を広げる']),
    ('gv', '文法・語彙', '正確さと表現の幅', ['日本の事物を説明する言いかえ']),
    ('pd', '発音・発声', '聞き取りやすさ', ['はっきり、落ち着いた速さで']),
    ('hp', 'ホスピタリティ', '案内士としてふさわしい対応', ['相手の立場に立った提案・気づかい'])]}


def GUIDE_SET(L, n, tr, qa, themes):
    """L: the language texts; tr: the model interpretation of PASSAGES[n]; qa: [(q, model)] x2; themes: [(title, model, q, qm)] x3"""
    steps = [S(L['tr_intro']), JP(PASSAGES[n]), ANS('tr', 60, tip='一語一語でなく、意味が伝わるように訳そう'),
             S(qa[0][0]), ANS('qa1', 40), S(qa[1][0]), ANS('qa2', 40),
             S(L['pres_intro']), dict(CARD, show='themes'), TOPICS('themes', 30, 'テーマを選んで準備(30秒)'),
             ANS('pres', 120, tip='2分くらい。外国人観光客に紹介するつもりで'), TQ('themes', 'qs', 0, 'pq1', 40), HIDE]
    items = {
        'tr': {'no': '通訳', 'pts': 10, 'q': '(日本語 → %s)' % L['name'], 'ja': PASSAGES[n], 'model': [tr], 'points': ['内容をもれなく', '固有名詞は説明をそえて(Kaminarimon, the Thunder Gate)']},
        'qa1': {'no': '通訳についての質問1', 'pts': 4, 'q': qa[0][0], 'ja': '案内士としての対応', 'model': [qa[0][1]], 'points': ['具体的な提案', '相手への気づかい']},
        'qa2': {'no': '通訳についての質問2', 'pts': 4, 'q': qa[1][0], 'ja': '案内士としての対応・説明', 'model': [qa[1][1]], 'points': ['理由もそえて']},
        'pres': {'no': 'プレゼンテーション', 'pts': 10, 'set': 'themes', 'setLabel': '選んだテーマ', 'q': '(選んだテーマを2分くらいで紹介)', 'ja': '外国人に日本のことを紹介する', 'points': ['結論から', '歴史・特徴・楽しみ方・おすすめ']},
        'pq1': {'no': 'プレゼンについての質問', 'pts': 4, 'q': '', 'ja': 'テーマについての質問', 'points': ['質問に直接答えてから説明']},
    }
    card = {'title': L['card'], 'sets': ['themes'], 'themesTitle': L['card'],
            'themes': [{'t': t, 'model': m, 'qs': [q], 'qsm': [qm]} for t, m, q, qm in themes]}
    return {'card': card, 'steps': steps, 'items': items}


def GUIDE(L, sets, exs):
    return {
        'grade': '全国通訳案内士(%s)' % L['name'], 'tier': 2, 'minutes': 10, 'lang': L['lang'], 'unit': 'セット', 'att': False,
        'roles': {'jp': {'av': '🗾', 'name': '日本語の読み上げ'}},
        'varies': '%dつのセットから選べます。' % len(sets),
        'origNote': '文とテーマはBabel Flightのオリジナルです(流れは本番と同じ。準備の30秒は練習用の目安)。',
        'markNote': '採点は本番とは違う、自分でつける目安です。',
        'voiceNote': '日本語の文と、試験委員の%sを、この端末の音声で読み上げます。' % L['name'],
        'subNote': '読み上げる文を表示する(本番は表示されません)', 'hideNote': '(試験委員が話しています。文は非表示)', 'ansNote': L['name'] + 'で答えよう',
        'chooseNote': 'カードからテーマを1つ選ぼう',
        'sumNote': '本番は、プレゼンテーション・コミュニケーション・文法と語彙・発音と発声・ホスピタリティで評価され、原則として7割が合格の目安です。',
        'againNote': '同じセットでもう一度',
        'flow': ['あいさつ', '通訳 ・ 試験委員が読む日本語を%sに訳す → 内容や案内士としての対応についての質問' % L['name'], 'プレゼンテーション ・ 3つのテーマから1つ選んで紹介(2分くらい)→ 質問'],
        'exs': exs, 'items': GUIDE_ITEMS,
        'open': [S(L['hello']), ANS('name', 8, '名前')],
        'close': [S(L['bye']), END_K],
        'cards': sets, 'pools': {},
    }


EN = {'name': '英語', 'lang': 'en-US', 'card': 'Presentation: choose one theme',
      'hello': "Hello. My name is {ex}. May I have your name, please?",
      'tr_intro': "Thank you. First, I'm going to read a passage in Japanese. Please listen and interpret it into English.",
      'pres_intro': "Thank you. Next is the presentation. Please choose one of these three themes and introduce it to a foreign visitor. You have thirty seconds to prepare.",
      'bye': "Thank you. That's the end of the test."}
GUIDE_EN = GUIDE(EN, [
  GUIDE_SET(EN, 0,
    "Senso-ji is the oldest temple in Tokyo. When you go through Kaminarimon, the Thunder Gate with its huge lantern, you'll find a shopping street called Nakamise, where you can buy souvenirs and traditional Japanese sweets.",
    [("A tourist says Nakamise Street is too crowded. What would you suggest?", "I would suggest coming early in the morning, before it gets busy, or exploring the quieter side streets around the temple, where there are traditional craft shops."),
     ("A tourist wants to take photos inside the main hall. What would you say?", "I would politely explain that photos are usually not allowed inside the main hall, out of respect for people who are praying, but they are welcome to take photos of the buildings from outside.")],
    [('Mount Fuji', "Mount Fuji is the highest mountain in Japan, at three thousand seven hundred and seventy-six meters. It's an active volcano, but it last erupted more than three hundred years ago. For centuries it has been a sacred place and a favorite subject of artists, and it became a World Heritage Site in 2013. In summer, many people climb it to watch the sunrise from the top. If you don't want to climb, I recommend the Fuji Five Lakes area, where you can see the mountain reflected in the water.",
      'When is the best season to see Mount Fuji?', "Winter is the best season, because the air is clear and dry, so you can often see the mountain covered in snow from far away."),
     ('Sushi', "Sushi is vinegared rice combined with fish or other toppings. It started as a way to preserve fish, and the style we know today, nigiri, became popular in Edo, now Tokyo, as a kind of fast food. Today you can enjoy it at a conveyor-belt restaurant for a reasonable price, or at a counter where the chef prepares each piece in front of you. A tip: you can eat nigiri with your hands, and dip the fish side, not the rice, into the soy sauce.",
      'What would you recommend to a visitor who cannot eat raw fish?', "I would recommend cooked toppings such as grilled eel, egg, or shrimp, and vegetable rolls like cucumber rolls. Many restaurants also have fried or seared options."),
     ('Hanami', "Hanami means cherry blossom viewing. In late March and early April, people gather under the cherry trees in parks to have picnics with friends, family or colleagues. The custom goes back more than a thousand years. The blossoms only last about a week, which reminds Japanese people that beautiful things don't last forever. Popular spots in Tokyo include Ueno Park and the Meguro River, which is lit up at night.",
      'What manners should visitors follow during hanami?', "They should not shake or pick the branches, they should take their rubbish home, and they should keep the noise down, especially at night.")]),
  GUIDE_SET(EN, 1,
    "There are some rules of etiquette at Japanese hot springs. Please wash your body before you get into the bath, and don't put your towel in the water.",
    [("A guest with a tattoo wants to use a public hot spring. What would you do?", "I would explain that some hot springs don't allow tattoos, so I would check in advance and recommend a tattoo-friendly hot spring, or a private bath that they can reserve."),
     ("How would you explain why people wash before getting into the bath?", "The bath is shared by everyone, so washing first keeps the water clean. It's a way of showing consideration for other people.")],
    [('The tea ceremony', "The tea ceremony, or sado, is the traditional way of preparing and serving matcha, powdered green tea. It was developed in the sixteenth century by Sen no Rikyu. More than just drinking tea, it's about hospitality, respect and appreciating the moment. Every movement of the host has a meaning, and guests admire the tea bowl and the seasonal decorations. Many temples and cultural centers in Kyoto offer short experiences in English, so it's easy for visitors to try.",
      'What should a guest do before drinking the tea?', "The guest bows to the host, picks up the bowl with the right hand, places it on the left palm, and turns it slightly so as not to drink from the front, which is a sign of respect."),
     ('The Shinkansen', "The Shinkansen is Japan's high-speed train, also known as the bullet train. The first line opened between Tokyo and Osaka in 1964, just before the Tokyo Olympics. Today trains run at up to three hundred and twenty kilometers per hour, and they are famous for being safe and punctual: the average delay is less than a minute. Visitors can save money with the Japan Rail Pass. I recommend buying a bento at the station and enjoying it on board.",
      'How would you explain the Japan Rail Pass to a visitor?', "It's a pass for tourists that allows unlimited travel on most JR trains, including most Shinkansen, for seven, fourteen or twenty-one days. It's good value if you travel between several cities."),
     ('Summer festivals', "Summer festivals, or natsu matsuri, are held all over Japan from July to August. Many of them began as prayers for good harvests or to keep away illness. At festivals, people wear yukata, light summer kimonos, and enjoy food stalls selling yakisoba and shaved ice. Some festivals have huge portable shrines carried through the streets, and many end with fireworks. Famous examples are the Gion Festival in Kyoto and the Nebuta Festival in Aomori.",
      'What advice would you give to a visitor going to a summer festival?', "I would advise them to drink plenty of water because it's very hot, to carry some cash for the food stalls, and to arrive early to get a good spot for the fireworks.")]),
  GUIDE_SET(EN, 2,
    "Fushimi Inari Taisha in Kyoto is famous for its thousands of red torii gates. If you walk to the top of the mountain, it takes about two hours there and back.",
    [("A tourist with a bad knee wants to visit Fushimi Inari. What advice would you give?", "I would recommend walking only the first section, the famous Senbon Torii near the entrance. It's mostly flat, and it's the most photographed part, so they can still enjoy the atmosphere."),
     ("Why are there so many torii gates?", "Each gate was donated by a person or a company, usually to pray for success in business. You can see the donor's name and the date written on the back of each gate.")],
    [('Ramen', "Ramen is a noodle soup that came originally from China and developed into a uniquely Japanese dish. There are four main types of soup: soy sauce, salt, miso and pork bone, called tonkotsu. Each region has its own style, for example miso ramen in Sapporo and tonkotsu ramen in Fukuoka. In many shops you buy a ticket from a machine before you sit down. It's fine to slurp the noodles; it shows you're enjoying them, and it cools them down.",
      'Are there ramen options for vegetarians?', "Yes, more and more shops offer vegetarian or vegan ramen with soup made from vegetables or soy milk. I would check the menu or ask the staff in advance."),
     ('Japanese gardens', "Japanese gardens are designed to represent nature in a small space. There are several types, such as stroll gardens, where you walk around a pond, and dry gardens, or karesansui, where raked gravel represents water. The most famous dry garden is at Ryoan-ji in Kyoto. The gardens change with the seasons, from cherry blossoms in spring to red leaves in autumn. I recommend visiting early in the morning, when it's quiet and you can really feel the calm atmosphere.",
      'What is the meaning of the rocks in a dry garden?', "They can represent mountains or islands in the sea, but their meaning is not fixed. Visitors are encouraged to sit quietly and use their imagination."),
     ('Manga and anime', "Manga are Japanese comics, and anime is Japanese animation. They are enjoyed by people of all ages in Japan, and they cover every kind of story, from sports and romance to history and science fiction. Many anime are based on popular manga. Fans from around the world visit Akihabara in Tokyo and Nipponbashi in Osaka to buy goods. I also recommend the Ghibli Museum, but you need to book tickets in advance.",
      'Why do you think manga and anime are so popular abroad?', "I think it's because the stories are very creative and the characters are easy to relate to. Streaming services have also made it easy for people all over the world to watch them.")]),
], [['Mr. Smith', 'm'], ['Ms. Johnson', 'f'], ['Mr. Brown', 'm'], ['Ms. Davis', 'f']])

KO = {'name': '韓国語', 'lang': 'ko-KR', 'card': '프레젠테이션: 주제를 하나 고르세요',
      'hello': "안녕하세요. 저는 {ex}입니다. 성함이 어떻게 되세요?",
      'tr_intro': "감사합니다. 먼저 일본어 문장을 읽겠습니다. 잘 듣고 한국어로 통역해 주세요.",
      'pres_intro': "감사합니다. 다음은 프레젠테이션입니다. 세 가지 주제 중에서 하나를 골라 외국인 관광객에게 소개해 주세요. 준비 시간은 30초입니다.",
      'bye': "감사합니다. 이것으로 시험을 마치겠습니다."}
GUIDE_KO = GUIDE(KO, [
  GUIDE_SET(KO, 0,
    "센소지는 도쿄에서 가장 오래된 절입니다. 커다란 등이 걸린 가미나리몬을 지나면 나카미세 거리라는 상점가가 있어서, 기념품이나 일본 전통 과자를 살 수 있습니다.",
    [("관광객이 나카미세 거리가 너무 붐빈다고 합니다. 어떻게 안내하시겠습니까?", "사람이 적은 이른 아침에 오시거나, 절 주변의 조용한 골목을 둘러보시라고 권하겠습니다. 그곳에는 전통 공예품 가게도 있습니다."),
     ("관광객이 본당 안에서 사진을 찍고 싶어 합니다. 뭐라고 하시겠습니까?", "본당 안은 기도하는 분들을 배려해서 보통 촬영이 금지되어 있다고 정중하게 설명하고, 밖에서 건물을 찍는 것은 괜찮다고 안내하겠습니다.")],
    [('후지산', "후지산은 일본에서 가장 높은 산으로, 높이는 3,776미터입니다. 활화산이지만 마지막으로 분화한 것은 300년도 더 전입니다. 오래전부터 신성한 산으로 여겨졌고, 많은 화가들이 그림으로 남겼습니다. 2013년에는 세계문화유산이 되었습니다. 여름에는 많은 사람들이 정상에서 해돋이를 보기 위해 등산을 합니다. 등산을 하지 않는다면, 호수에 비친 후지산을 볼 수 있는 후지고코 지역을 추천합니다.",
      '후지산을 보기에 가장 좋은 계절은 언제입니까?', "겨울이 가장 좋습니다. 공기가 맑고 건조해서, 눈 덮인 후지산을 멀리서도 잘 볼 수 있습니다."),
     ('스시', "스시는 식초로 간을 한 밥에 생선 등을 올린 음식입니다. 원래는 생선을 오래 보관하기 위한 방법이었는데, 지금과 같은 니기리즈시는 에도, 즉 지금의 도쿄에서 패스트푸드처럼 인기를 얻었습니다. 회전초밥집에서 저렴하게 즐길 수도 있고, 카운터에서 요리사가 눈앞에서 만들어 주는 가게도 있습니다. 니기리는 손으로 먹어도 되고, 간장은 밥이 아니라 생선 쪽에 찍는 것이 요령입니다.",
      '날생선을 못 먹는 관광객에게는 무엇을 추천하시겠습니까?', "구운 장어나 달걀, 새우처럼 익힌 재료나, 오이 김밥 같은 채소 롤을 추천하겠습니다."),
     ('벚꽃놀이', "하나미는 벚꽃 구경이라는 뜻입니다. 3월 말부터 4월 초에 사람들이 공원의 벚나무 아래에 모여 가족이나 친구, 회사 동료들과 함께 도시락을 먹습니다. 이 풍습은 천 년 이상 이어져 왔습니다. 벚꽃은 일주일 정도밖에 피지 않기 때문에, 아름다운 것은 영원하지 않다는 것을 느끼게 해 줍니다. 도쿄에서는 우에노 공원과 밤에 조명을 밝히는 메구로강이 인기입니다.",
      '벚꽃놀이 때 관광객이 지켜야 할 매너는 무엇입니까?', "나뭇가지를 흔들거나 꺾지 말고, 쓰레기는 가져가고, 특히 밤에는 너무 시끄럽게 하지 않는 것입니다.")]),
  GUIDE_SET(KO, 1,
    "일본 온천에는 몇 가지 매너가 있습니다. 탕에 들어가기 전에 몸을 씻고, 수건은 물에 넣지 않도록 해 주세요.",
    [("문신이 있는 손님이 대중 온천을 이용하고 싶어 합니다. 어떻게 하시겠습니까?", "문신이 있으면 들어갈 수 없는 온천도 있다고 설명하고, 미리 확인해서 문신이 괜찮은 온천이나 예약할 수 있는 개인 욕탕을 안내하겠습니다."),
     ("탕에 들어가기 전에 몸을 씻는 이유를 어떻게 설명하시겠습니까?", "온천은 모두가 함께 쓰기 때문에, 먼저 몸을 씻어서 물을 깨끗하게 유지하는 것입니다. 다른 사람을 배려하는 마음이라고 설명하겠습니다.")],
    [('다도', "다도는 말차를 준비해서 손님에게 대접하는 일본의 전통 문화입니다. 16세기에 센노 리큐가 완성했습니다. 단순히 차를 마시는 것이 아니라, 손님을 대접하는 마음과 서로를 존중하는 마음, 그리고 지금 이 순간을 소중히 여기는 것이 중요합니다. 주인의 동작 하나하나에 의미가 있고, 손님은 찻잔과 계절의 장식을 감상합니다. 교토의 절이나 문화 시설에서 짧은 체험을 할 수 있습니다.",
      '차를 마시기 전에 손님은 무엇을 합니까?', "주인에게 인사를 하고, 오른손으로 찻잔을 들어 왼손 위에 올린 다음, 찻잔의 정면을 피하도록 조금 돌려서 마십니다. 존경의 표시입니다."),
     ('신칸센', "신칸센은 일본의 고속철도입니다. 1964년, 도쿄 올림픽 직전에 도쿄와 오사카 사이에 처음 개통했습니다. 지금은 최고 시속 320킬로미터로 달리며, 안전하고 시간을 잘 지키는 것으로 유명합니다. 평균 지연 시간은 1분도 되지 않습니다. 관광객은 재팬 레일 패스를 이용하면 교통비를 아낄 수 있습니다. 역에서 도시락을 사서 열차 안에서 먹는 것을 추천합니다.",
      '재팬 레일 패스를 관광객에게 어떻게 설명하시겠습니까?', "외국인 관광객을 위한 승차권으로, 7일, 14일, 21일 동안 대부분의 JR 열차와 신칸센을 자유롭게 탈 수 있습니다. 여러 도시를 다닐 때 이득입니다."),
     ('여름 축제', "여름 축제, 나쓰마쓰리는 7월부터 8월까지 일본 전국에서 열립니다. 많은 축제가 풍년을 빌거나 병을 막기 위해 시작되었습니다. 사람들은 유카타라는 여름용 기모노를 입고, 야키소바나 빙수를 파는 노점을 즐깁니다. 커다란 가마를 메고 거리를 행진하는 축제도 있고, 마지막에 불꽃놀이를 하는 축제도 많습니다. 교토의 기온마쓰리와 아오모리의 네부타마쓰리가 유명합니다.",
      '여름 축제에 가는 관광객에게 어떤 조언을 하시겠습니까?', "아주 덥기 때문에 물을 많이 마시고, 노점에서 쓸 현금을 준비하고, 불꽃놀이를 잘 보려면 일찍 가라고 조언하겠습니다.")]),
], [['김민준', 'm'], ['이서연', 'f'], ['박지훈', 'm'], ['최수아', 'f']])

ES = {'name': 'スペイン語', 'lang': 'es-ES', 'card': 'Presentación: elige un tema',
      'hello': "Hola, buenos días. Me llamo {ex}. ¿Cómo se llama usted?",
      'tr_intro': "Gracias. Primero voy a leer un texto en japonés. Escuche con atención e interprételo al español, por favor.",
      'pres_intro': "Gracias. Ahora la presentación. Elija uno de estos tres temas y preséntelo a un turista extranjero. Tiene treinta segundos para prepararse.",
      'bye': "Muchas gracias. Hemos terminado el examen."}
GUIDE_ES = GUIDE(ES, [
  GUIDE_SET(ES, 0,
    "Senso-ji es el templo más antiguo de Tokio. Al pasar por Kaminarimon, la Puerta del Trueno con su enorme farol, se llega a una calle comercial llamada Nakamise, donde se pueden comprar recuerdos y dulces tradicionales japoneses.",
    [("Un turista dice que la calle Nakamise está demasiado llena de gente. ¿Qué le recomendaría?", "Le recomendaría venir temprano por la mañana, antes de que haya mucha gente, o pasear por las calles tranquilas alrededor del templo, donde hay tiendas de artesanía tradicional."),
     ("Un turista quiere hacer fotos dentro del pabellón principal. ¿Qué le diría?", "Le explicaría con amabilidad que normalmente no se permiten fotos dentro, por respeto a las personas que rezan, pero que puede fotografiar los edificios desde fuera.")],
    [('El monte Fuji', "El monte Fuji es la montaña más alta de Japón, con tres mil setecientos setenta y seis metros. Es un volcán activo, aunque su última erupción fue hace más de trescientos años. Desde hace siglos es un lugar sagrado y un tema favorito de los artistas, y en 2013 fue declarado Patrimonio de la Humanidad. En verano, mucha gente lo sube para ver el amanecer desde la cima. Si no quiere subir, le recomiendo la zona de los Cinco Lagos, donde se ve la montaña reflejada en el agua.",
      '¿Cuál es la mejor época para ver el monte Fuji?', "El invierno, porque el aire es claro y seco, y se puede ver la montaña nevada desde muy lejos."),
     ('El sushi', "El sushi es arroz con vinagre acompañado de pescado u otros ingredientes. Empezó como una forma de conservar el pescado, y el estilo actual, el nigiri, se hizo popular en Edo, hoy Tokio, como una especie de comida rápida. Hoy se puede comer en restaurantes de cinta transportadora a buen precio, o en una barra donde el cocinero prepara cada pieza delante de usted. Un consejo: el nigiri se puede comer con la mano, y se moja el pescado, no el arroz, en la salsa de soja.",
      '¿Qué recomendaría a un visitante que no puede comer pescado crudo?', "Le recomendaría ingredientes cocinados, como anguila a la parrilla, tortilla o gambas, y rollos de verdura, como los de pepino."),
     ('El hanami', "Hanami significa contemplar las flores del cerezo. A finales de marzo y principios de abril, la gente se reúne bajo los cerezos en los parques para hacer pícnics con la familia, los amigos o los compañeros de trabajo. Es una costumbre de más de mil años. Las flores solo duran una semana, más o menos, y nos recuerdan que las cosas bonitas no duran para siempre. En Tokio, son muy populares el parque de Ueno y el río Meguro, iluminado por la noche.",
      '¿Qué normas deben respetar los visitantes durante el hanami?', "No deben mover ni cortar las ramas, tienen que llevarse la basura y no deben hacer mucho ruido, sobre todo por la noche.")]),
  GUIDE_SET(ES, 1,
    "En las aguas termales de Japón hay algunas normas de etiqueta. Lávese el cuerpo antes de entrar en el baño y no meta la toalla en el agua.",
    [("Un cliente con un tatuaje quiere usar un baño termal público. ¿Qué haría usted?", "Le explicaría que en algunos baños no se permiten tatuajes, así que lo comprobaría antes y le recomendaría un baño que los acepte o un baño privado que se pueda reservar."),
     ("¿Cómo explicaría por qué hay que lavarse antes de entrar en el baño?", "El baño lo comparten todos, así que lavarse antes mantiene el agua limpia. Es una forma de mostrar respeto por los demás.")],
    [('La ceremonia del té', "La ceremonia del té, o sado, es la forma tradicional de preparar y servir el matcha, el té verde en polvo. La perfeccionó Sen no Rikyu en el siglo dieciséis. No se trata solo de beber té, sino de la hospitalidad, el respeto y disfrutar del momento. Cada movimiento del anfitrión tiene un significado, y los invitados admiran el cuenco y la decoración de la estación. En Kioto, muchos templos ofrecen experiencias cortas para turistas.",
      '¿Qué hace el invitado antes de beber el té?', "Hace una reverencia al anfitrión, toma el cuenco con la mano derecha, lo pone en la palma izquierda y lo gira un poco para no beber por la parte delantera, como señal de respeto."),
     ('El Shinkansen', "El Shinkansen es el tren de alta velocidad de Japón, también llamado tren bala. La primera línea se inauguró entre Tokio y Osaka en 1964, justo antes de los Juegos Olímpicos de Tokio. Hoy los trenes alcanzan los trescientos veinte kilómetros por hora y son famosos por su seguridad y puntualidad: el retraso medio es de menos de un minuto. Los turistas pueden ahorrar con el Japan Rail Pass. Le recomiendo comprar un bento en la estación y comerlo en el tren.",
      '¿Cómo explicaría el Japan Rail Pass a un turista?', "Es un pase para turistas que permite viajar sin límite en casi todos los trenes de JR, incluido el Shinkansen, durante siete, catorce o veintiún días. Sale a cuenta si se visitan varias ciudades."),
     ('Los festivales de verano', "Los festivales de verano, o natsu matsuri, se celebran en todo Japón entre julio y agosto. Muchos empezaron como rezos por una buena cosecha o para alejar las enfermedades. La gente se pone el yukata, un kimono ligero de verano, y disfruta de los puestos de comida, como el yakisoba o el hielo raspado. En algunos festivales se llevan grandes santuarios portátiles por las calles, y muchos terminan con fuegos artificiales.",
      '¿Qué consejos daría a un turista que va a un festival de verano?', "Le aconsejaría beber mucha agua porque hace mucho calor, llevar dinero en efectivo para los puestos y llegar pronto para ver bien los fuegos artificiales.")]),
], [['Lucía Martín', 'f'], ['Javier López', 'm'], ['Carmen Ruiz', 'f'], ['Pablo García', 'm']])

IT = {'name': 'イタリア語', 'lang': 'it-IT', 'card': 'Presentazione: scegli un tema',
      'hello': "Buongiorno. Mi chiamo {ex}. Come si chiama?",
      'tr_intro': "Grazie. Prima leggerò un testo in giapponese. Ascolti con attenzione e lo interpreti in italiano, per favore.",
      'pres_intro': "Grazie. Adesso la presentazione. Scelga uno di questi tre temi e lo presenti a un turista straniero. Ha trenta secondi per prepararsi.",
      'bye': "Grazie. L'esame è finito."}
GUIDE_IT = GUIDE(IT, [
  GUIDE_SET(IT, 0,
    "Il Senso-ji è il tempio più antico di Tokyo. Dopo aver attraversato il Kaminarimon, la Porta del Tuono con la sua grande lanterna, si arriva a una via di negozi chiamata Nakamise, dove si possono comprare souvenir e dolci tradizionali giapponesi.",
    [("Un turista dice che la via Nakamise è troppo affollata. Che cosa gli consiglierebbe?", "Gli consiglierei di venire la mattina presto, quando c'è meno gente, oppure di passeggiare nelle stradine tranquille intorno al tempio, dove ci sono negozi di artigianato tradizionale."),
     ("Un turista vuole fare foto dentro il padiglione principale. Che cosa gli direbbe?", "Gli spiegherei gentilmente che di solito dentro non si possono fare foto, per rispetto verso le persone che pregano, ma che può fotografare gli edifici da fuori.")],
    [('Il monte Fuji', "Il monte Fuji è la montagna più alta del Giappone, con tremilasettecentosettantasei metri. È un vulcano attivo, ma l'ultima eruzione è stata più di trecento anni fa. Da secoli è un luogo sacro e un soggetto amato dagli artisti, e nel 2013 è diventato Patrimonio dell'Umanità. In estate molte persone lo scalano per vedere l'alba dalla cima. Se non volete salire, vi consiglio la zona dei Cinque Laghi, dove si vede la montagna riflessa nell'acqua.",
      'Qual è la stagione migliore per vedere il monte Fuji?', "L'inverno, perché l'aria è limpida e secca e si vede la montagna coperta di neve anche da lontano."),
     ('Il sushi', "Il sushi è riso condito con aceto e accompagnato da pesce o altri ingredienti. È nato come un modo per conservare il pesce, e lo stile di oggi, il nigiri, è diventato popolare a Edo, l'attuale Tokyo, come una specie di cibo veloce. Oggi si può mangiare nei ristoranti con il nastro trasportatore a prezzi bassi, oppure al bancone, dove il cuoco prepara ogni pezzo davanti a voi. Un consiglio: il nigiri si può mangiare con le mani e si intinge il pesce, non il riso, nella salsa di soia.",
      'Che cosa consiglierebbe a un turista che non mangia pesce crudo?', "Gli consiglierei ingredienti cotti, come l'anguilla alla griglia, la frittata o i gamberi, e rotolini di verdure, come quelli al cetriolo."),
     ("L'hanami", "Hanami significa ammirare i fiori di ciliegio. Tra la fine di marzo e l'inizio di aprile, le persone si riuniscono sotto i ciliegi nei parchi per fare un picnic con la famiglia, gli amici o i colleghi. È un'usanza di più di mille anni. I fiori durano solo una settimana circa e ci ricordano che le cose belle non durano per sempre. A Tokyo sono molto famosi il parco di Ueno e il fiume Meguro, illuminato di sera.",
      "Quali regole devono rispettare i turisti durante l'hanami?", "Non devono scuotere né rompere i rami, devono portare via i rifiuti e non devono fare troppo rumore, soprattutto di sera.")]),
  GUIDE_SET(IT, 1,
    "Nelle terme giapponesi ci sono alcune regole di comportamento. Prima di entrare nella vasca lavatevi il corpo, e non mettete l'asciugamano nell'acqua.",
    [("Un ospite con un tatuaggio vuole usare delle terme pubbliche. Che cosa farebbe?", "Gli spiegherei che in alcune terme i tatuaggi non sono ammessi, quindi controllerei prima e gli consiglierei delle terme che li accettano oppure un bagno privato da prenotare."),
     ("Come spiegherebbe perché ci si lava prima di entrare nella vasca?", "La vasca è in comune con tutti, quindi lavarsi prima mantiene l'acqua pulita. È un modo per mostrare rispetto verso gli altri.")],
    [('La cerimonia del tè', "La cerimonia del tè, o sado, è il modo tradizionale di preparare e servire il matcha, il tè verde in polvere. È stata perfezionata da Sen no Rikyu nel sedicesimo secolo. Non si tratta solo di bere il tè, ma di ospitalità, rispetto e attenzione al momento presente. Ogni gesto del padrone di casa ha un significato e gli ospiti ammirano la tazza e le decorazioni della stagione. A Kyoto molti templi offrono brevi esperienze per i turisti.",
      "Che cosa fa l'ospite prima di bere il tè?", "Fa un inchino al padrone di casa, prende la tazza con la mano destra, la appoggia sul palmo sinistro e la gira un po' per non bere dalla parte anteriore, in segno di rispetto."),
     ('Lo Shinkansen', "Lo Shinkansen è il treno ad alta velocità del Giappone, chiamato anche treno proiettile. La prima linea è stata inaugurata tra Tokyo e Osaka nel 1964, poco prima delle Olimpiadi di Tokyo. Oggi i treni arrivano a trecentoventi chilometri all'ora e sono famosi per la sicurezza e la puntualità: il ritardo medio è inferiore a un minuto. I turisti possono risparmiare con il Japan Rail Pass. Vi consiglio di comprare un bento in stazione e di mangiarlo in treno.",
      'Come spiegherebbe il Japan Rail Pass a un turista?', "È un abbonamento per turisti che permette di viaggiare senza limiti su quasi tutti i treni JR, compreso lo Shinkansen, per sette, quattordici o ventuno giorni. Conviene se si visitano più città."),
     ("Le feste d'estate", "Le feste d'estate, o natsu matsuri, si tengono in tutto il Giappone tra luglio e agosto. Molte sono nate come preghiere per un buon raccolto o per allontanare le malattie. Le persone indossano lo yukata, un kimono leggero estivo, e si divertono alle bancarelle di cibo, come lo yakisoba o il ghiaccio tritato. In alcune feste si portano per le strade grandi santuari portatili, e molte finiscono con i fuochi d'artificio.",
      "Che consigli darebbe a un turista che va a una festa d'estate?", "Gli consiglierei di bere molta acqua perché fa molto caldo, di portare contanti per le bancarelle e di arrivare presto per vedere bene i fuochi d'artificio.")]),
], [['Giulia Rossi', 'f'], ['Marco Bianchi', 'm'], ['Chiara Romano', 'f'], ['Luca Esposito', 'm']])

GUIDES = {'guideen': GUIDE_EN, 'guideko': GUIDE_KO, 'guidees': GUIDE_ES, 'guideit': GUIDE_IT}
