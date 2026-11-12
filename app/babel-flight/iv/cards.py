"""英検 二次試験 (面接) practice cards, 3級〜1級. Original content; the flow, timing and question types
follow the real interview (2024 renewal onward). Built into public/iv/<key>.json by build.py.

Each grade: several cards (the page picks one like the real test does), pools for the questions asked after
the card is turned over (drawn each run), and the shared parts of the interview: entering the room (Hello /
the 面接カード / Please have a seat), the greeting, and leaving. {ex} = the examiner's name, {hello} = "Hello. "
when the entry is not practised.

Pictures are drawn by the page from emoji: a scene is a 300x180 box with a background (bg) and items
[emoji, x, y, size]; bubbles are speech ('say', text) or thought ('think', emoji / text) bubbles."""

def S(t): return {'k': 'say', 't': t}
def A(i, sec, hint=None):
    d = {'k': 'ans', 'id': i, 'sec': sec}
    if hint: d['hint'] = hint
    return d
def YN(i, sec, yes, no, fsec): return {'k': 'yn', 'id': i, 'sec': sec, 'follow': {'yes': yes, 'no': no}, 'fsec': fsec}
def POOL(pool, i, sec, no, pre='', pts=5): return {'k': 'pool', 'pool': pool, 'id': i, 'sec': sec, 'no': no, 'pre': pre, 'pts': pts}
CARD = {'k': 'card'}
HIDE = {'k': 'hide'}
END_K = {'k': 'end'}
def PREP(sec, label): return {'k': 'prep', 'sec': sec, 'label': label}
def READ(sec): return {'k': 'read', 'sec': sec}
def scene(bg, items, bubbles=None, signs=None, cap=None):
    d = {'bg': bg, 'items': items}
    if bubbles: d['bubbles'] = bubbles
    if signs: d['signs'] = signs
    if cap: d['cap'] = cap
    return d
def say_b(x, y, t, w=120): return {'kind': 'say', 'x': x, 'y': y, 't': t, 'w': w}
def think_b(x, y, e, w=70): return {'kind': 'think', 'x': x, 'y': y, 'e': e, 'w': w}
# pool entries: an open question, or a Yes / No question with its second question
def Q(q, ja, model, points): return {'q': q, 'ja': ja, 'model': model, 'points': points}
def QYN(q, ja, yes, no, myes, mno, points, fsec=None):
    d = {'q': q, 'ja': ja, 'yn': {'yes': yes, 'no': no}, 'model': {'yes': myes, 'no': mno}, 'points': points}
    if fsec: d['yn']['fsec'] = fsec
    return d

# ---------------------------------------------------------------- entering and leaving (every grade)
ENTRY = [
    A('enter', 6, 'ドアをノックして入室。面接委員に Hello. とあいさつしよう'),
    S("Hello. Can I have your card, please?"), A('cardin', 5, '面接カードを渡しながら'),
    S("Thank you. Please have a seat."), A('sit', 4, 'お礼を言ってから座ろう'),
]
EXIT = [
    S("This is the end of the test. Could I have the card back, please?"), HIDE, A('cardback', 5, '問題カードを返しながら'),
    S("Thank you. You may go now."), A('bye', 5, 'お礼とあいさつをして退室'), END_K,
]
CLOSE = [S("This is the end of the test. Could I have the card back, please?"), HIDE, S("Thank you. You may go now."), END_K]
DOOR = {
  'enter': {'no': '入室', 'pts': 0, 'model': ['Hello.']},
  'cardin': {'no': '面接カードを渡す', 'pts': 0, 'model': ['Here you are.']},
  'sit': {'no': '着席', 'pts': 0, 'model': ['Thank you.']},
  'cardback': {'no': '問題カードを返す', 'pts': 0, 'model': ['Here you are.']},
  'bye': {'no': '退室', 'pts': 0, 'model': ['Thank you. Goodbye.']},
}
def OPEN(grade): return [
    S("{hello}My name is {ex}. May I have your name, please?"), A('name', 8),
    S("Thank you. This is the Grade %s test. OK? How are you today?" % grade), A('how', 6),
    S("Let's start the test. Here is your card."), CARD,
]
def TEST(grade, tier, minutes, open_, cards, pools, varies='カードを裏返したあとの質問は毎回変わります。'):
    return {'grade': grade, 'tier': tier, 'minutes': minutes, 'lang': 'en-US', 'varies': varies,
            'entry': ENTRY, 'open': open_, 'exit': EXIT, 'close': CLOSE, 'items': DOOR, 'cards': cards, 'pools': pools}

CARDS = {}

# ================================================================ 3級
# No.1 the passage (the part before "so"), No.2・No.3 the picture, card turned over, No.4 / No.5 about you (pools)
def EK3(title, passage, pic, q1, a1, q2, a2, p2, q3, a3, p3, read_pts, ja1, ja2, ja3):
    return {
      'card': {'title': title, 'passage': passage, 'pic': pic},
      'steps': [
        S("First, please read the passage silently for 20 seconds."), PREP(20, '黙読'),
        S("All right. Now, please read it aloud."), READ(30),
        S("Now, I'll ask you five questions."),
        S("Number 1. Please look at the passage. " + q1), A('q1', 15),
        S("Number 2. Please look at the picture. " + q2), A('q2', 12),
        S("Number 3. " + q3), A('q3', 12),
        S("Now, please turn the card over."), HIDE,
        POOL('ek3_4', 'q4', 15, 'No.4', 'Number 4. '),
        POOL('ek3_5', 'q5', 15, 'No.5', 'Number 5. '),
      ],
      'items': {
        'read': {'no': '音読', 'pts': 5, 'points': read_pts},
        'q1': {'no': 'No.1', 'pts': 5, 'q': q1, 'ja': ja1, 'model': a1, 'points': ['so の前の部分が答え', '主語を they / it などに置きかえる', 'Because で始める']},
        'q2': {'no': 'No.2', 'pts': 5, 'q': q2, 'ja': ja2, 'model': a2, 'points': p2},
        'q3': {'no': 'No.3', 'pts': 5, 'q': q3.split('. ')[-1], 'ja': ja3, 'model': a3, 'points': p3},
      },
    }

EK3_CARDS = [
  EK3('Airports',
      'Many people go to airports to travel. Some airports have nice shops and restaurants, so people also enjoy shopping and eating there. Children like watching airplanes from the windows.',
      scene('airport', [['🪟', 150, 40, 70], ['✈️', 150, 38, 34], ['🧑', 38, 124, 48], ['🧳', 76, 152, 24], ['🧳', 102, 152, 24],
                        ['👩', 150, 124, 48], ['📷', 176, 112, 22], ['👦', 220, 130, 42], ['🍦', 242, 120, 18], ['🧳', 280, 152, 24]]),
      'Why do people also enjoy shopping and eating at some airports?', ['Because they have nice shops and restaurants.'],
      'How many suitcases are there?', ['There are three.', 'There are three suitcases.'], ['There are ～. で答える', '数を正しく'],
      'Please look at the woman. What is she doing?', ['She is taking a picture.', "She's taking a photo."], ['She is ～ing. の形', 'take a picture'],
      ['タイトルから読む', '意味のまとまりで区切る(…restaurants, / so people…)', 'airports / restaurants / airplanes の発音'],
      'なぜ、いくつかの空港では買い物や食事も楽しめるのですか。', 'スーツケースはいくつありますか。', '女性は何をしていますか。'),
  EK3('Summer Festivals',
      'Many towns in Japan have summer festivals. People can enjoy delicious food and beautiful fireworks there, so these festivals are popular with families. Some people wear yukata at festivals.',
      scene('night', [['🏮', 30, 22, 24], ['🏮', 75, 22, 24], ['🏮', 120, 22, 24], ['🏮', 165, 22, 24], ['🎆', 250, 46, 50],
                      ['👧', 56, 130, 44], ['🍧', 80, 118, 20], ['👦', 150, 132, 42], ['👨', 238, 130, 46], ['🍢', 260, 120, 18]],
            bubbles=[think_b(150, 72, '🎆📷', 62)]),
      'Why are summer festivals popular with families?', ['Because people can enjoy delicious food and beautiful fireworks there.'],
      'How many lanterns are there?', ['There are four.', 'There are four lanterns.'], ['There are ～. で答える', 'lantern=ちょうちん'],
      'Please look at the boy. What is he going to do?', ['He is going to take a picture of the fireworks.'], ['吹き出し=これからすること', 'He is going to ～. の形'],
      ['タイトルから読む', 'fireworks / festivals の発音', 'so の前で少し区切る'],
      'なぜ夏祭りは家族に人気があるのですか。', 'ちょうちんはいくつありますか。', '男の子は何をしようとしていますか。'),
  EK3('Libraries',
      'Many students like to study at libraries. Libraries are quiet, and they have a lot of useful books, so students can study hard there. Some libraries are open until late at night.',
      scene('library', [['📚', 36, 64, 40], ['📚', 82, 64, 40], ['🕒', 254, 30, 28], ['👩', 64, 128, 44], ['📖', 88, 120, 20],
                        ['👦', 150, 130, 40], ['🎒', 172, 136, 20], ['🧑', 226, 128, 44], ['💻', 252, 138, 22]]),
      'Why can students study hard at libraries?', ['Because they are quiet, and they have a lot of useful books.'],
      'What time is it?', ["It's three o'clock.", 'It is three.'], ["It's ～ o'clock. で答える", '時計を見て'],
      'Please look at the man. What is he doing?', ['He is using a computer.'], ['He is ～ing. の形', 'use a computer'],
      ['タイトルから読む', 'libraries / quiet の発音', 'and they have… のまとまり'],
      'なぜ生徒たちは図書館で一生けんめい勉強できるのですか。', '何時ですか。', '男性は何をしていますか。'),
  EK3('Bicycles',
      'Bicycles are useful for getting around towns. Riding a bicycle is good for our health, and it is also cheap, so many people ride bicycles every day. Some cities have special roads for bicycles.',
      scene('street', [['🌳', 42, 66, 50], ['🐈', 44, 142, 24], ['🚴', 132, 128, 46], ['🚶‍♀️', 206, 126, 46], ['🐕', 236, 142, 24], ['🏢', 270, 74, 44]]),
      'Why do many people ride bicycles every day?', ['Because riding a bicycle is good for their health, and it is also cheap.'],
      'Where is the cat?', ["It's under the tree.", 'It is under the tree.'], ["It's ～. で答える", 'under the tree'],
      'Please look at the woman. What is she doing?', ['She is walking her dog.', "She's walking a dog."], ['She is ～ing. の形', 'walk a dog=犬を散歩させる'],
      ['タイトルから読む', 'our health → 答えでは their health', 'Riding a bicycle を1つのまとまりで'],
      'なぜ多くの人が毎日自転車に乗るのですか。', 'ネコはどこにいますか。', '女性は何をしていますか。'),
  EK3('Cooking',
      'Cooking is a popular hobby among students. Cooking at home is fun, and people can choose healthy food, so many families cook together on weekends. Some students make lunch boxes for school.',
      scene('kitchen', [['🍅', 126, 142, 20], ['🍅', 148, 142, 20], ['🍅', 170, 142, 20], ['🥕', 196, 144, 20], ['👧', 60, 124, 44],
                        ['👩', 238, 122, 48], ['🔪', 214, 136, 18]], bubbles=[think_b(78, 52, '🍳', 52)]),
      'Why do many families cook together on weekends?', ['Because cooking at home is fun, and they can choose healthy food.'],
      'How many tomatoes are there?', ['There are three.', 'There are three tomatoes.'], ['There are ～. で答える', '数を正しく(にんじんは数えない)'],
      'Please look at the girl. What is she going to do?', ['She is going to cook eggs.', "She's going to make fried eggs."], ['吹き出し=これからすること', 'She is going to ～.'],
      ['タイトルから読む', 'hobby / healthy の発音', 'so many families… をなめらかに'],
      'なぜ多くの家族が週末に一緒に料理をするのですか。', 'トマトはいくつありますか。', '女の子は何をしようとしていますか。'),
]
EK3_POOLS = {
  'ek3_4': [
    Q('What do you usually do on weekends?', 'ふだん週末に何をしますか。', ['I usually play soccer with my friends.', 'I usually study English at home.'], ['I usually ～. で答える', '主語と動詞のある文で']),
    Q('What time do you usually get up?', 'ふだん何時に起きますか。', ['I usually get up at six thirty.'], ['I usually get up at ～.', 'at + 時刻']),
    Q('Where do you want to go this summer?', 'この夏、どこに行きたいですか。', ['I want to go to Okinawa.', 'I want to go to the beach with my family.'], ['I want to go to ～.', 'だれと行くかを足しても◎']),
    Q('What did you do last Sunday?', 'この前の日曜日に何をしましたか。', ['I went shopping with my mother.', 'I watched a movie at home.'], ['過去形で答える', 'went / watched / played']),
    Q('What kind of food do you like?', 'どんな食べ物が好きですか。', ['I like Italian food.', 'I like curry and rice.'], ['I like ～. で答える']),
    Q('How do you usually go to school?', 'ふだんどうやって学校に行きますか。', ['I usually go to school by bike.', 'I walk to school.'], ['by + 乗り物(by bus / by bike)', 'walk to ～']),
    Q('What are you going to do after this test?', 'この試験のあと、何をする予定ですか。', ["I'm going to have lunch with my family."], ["I'm going to ～. で答える"]),
    Q('What subject do you like the best?', 'いちばん好きな教科は何ですか。', ['I like English the best.', 'I like science the best because it is interesting.'], ['I like ～ the best.', '理由を足しても◎']),
    Q('What do you like to do when it rains?', '雨の日には何をするのが好きですか。', ['I like to read books at home.'], ['I like to ～.']),
    Q('What kind of music do you like?', 'どんな音楽が好きですか。', ['I like K-pop.', 'I like rock music.'], ['I like ～.']),
  ],
  'ek3_5': [
    QYN('Do you like to travel?', '旅行は好きですか。', 'Please tell me more.', 'What do you want to do this summer?',
        'Yes. → I like to visit new places. I went to Kyoto with my family last year.', 'No. → I want to go camping with my friends.', ['まず Yes / No', '2つ目の質問にも1文以上で']),
    QYN('Have you ever been to a zoo?', '動物園に行ったことはありますか。', 'Please tell me more.', 'What animal do you like?',
        'Yes. → I went to Ueno Zoo last spring. I saw pandas there.', 'No. → I like dogs. They are very cute.', ['Yes なら いつ・どこで・何を', 'No なら別の質問に答える']),
    QYN('Do you like cooking?', '料理は好きですか。', 'Please tell me more.', 'What do you like to do in your free time?',
        'Yes. → I often make pancakes on Sundays. My family likes them.', 'No. → I like to play video games.', ['Yes なら具体的に1〜2文', 'No なら別の質問に答える']),
    QYN('Do you play any sports?', '何かスポーツをしますか。', 'Please tell me more.', 'What do you usually do after school?',
        'Yes. → I play basketball. I practice three times a week.', 'No. → I usually go home and do my homework.', ['Yes ならどのくらいするかも', 'No なら別の質問に答える']),
    QYN('Have you ever been to a museum?', '博物館に行ったことはありますか。', 'Please tell me more.', 'Where do you want to go next weekend?',
        'Yes. → I went to a science museum last year. It was very interesting.', 'No. → I want to go to the park with my friends.', ['過去形で', 'It was ～. で感想']),
    QYN('Do you like to go shopping?', '買い物に行くのは好きですか。', 'Please tell me more.', 'What did you do last weekend?',
        'Yes. → I often go shopping with my sister. I like buying clothes.', 'No. → I played tennis with my friends.', ['Yes なら だれと・何を', 'No の質問は過去形で答える']),
    QYN('Do you usually get up early?', 'ふだん早起きしますか。', 'Please tell me more.', 'What time do you usually go to bed?',
        'Yes. → I get up at six. I walk my dog before breakfast.', 'No. → I usually go to bed at eleven.', ['Yes なら何時に・何をするか', 'at + 時刻']),
    QYN('Do you like reading books?', '本を読むのは好きですか。', 'Please tell me more.', 'What kind of TV programs do you like?',
        'Yes. → I like mystery novels. I read before I go to bed.', 'No. → I like music programs.', ['Yes ならどんな本か', 'No なら別の質問に答える']),
    QYN('Do you want to study abroad?', '留学したいですか。', 'Please tell me more.', 'What do you want to be in the future?',
        'Yes. → I want to study in Canada. I want to make friends from other countries.', 'No. → I want to be a pilot.', ['Yes なら どこで・何を', 'I want to be ～.']),
    QYN('Do you often watch movies?', 'よく映画を見ますか。', 'Please tell me more.', 'What do you like to do on Sundays?',
        'Yes. → I watch movies with my family on Friday nights. I like action movies.', 'No. → I like to ride my bike.', ['Yes ならいつ・どんな映画', 'I like to ～.']),
  ],
}
CARDS['ek3'] = TEST('3級', 1, 5, OPEN('3'), EK3_CARDS, EK3_POOLS)

# ================================================================ 準2級
# No.1 the passage (by doing so / in this way), No.2 Picture A (5 people), No.3 Picture B (the situation),
# card turned over, No.4 an opinion about the card's topic, No.5 about you (pool)
def EKP2(title, passage, picA, picB, q1, a1, p1, a2, p2, who3, a3, p3, q4, m4y, m4n, read_pts, ja1, ja4):
    return {
      'card': {'title': title, 'passage': passage, 'picA': picA, 'picB': picB},
      'steps': [
        S("First, please read the passage silently for 20 seconds."), PREP(20, '黙読'),
        S("All right. Now, please read it aloud."), READ(45),
        S("Now, I'll ask you five questions."),
        S("Number 1. According to the passage, " + q1), A('q1', 18),
        S("Number 2. Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing."), A('q2', 40),
        S("Number 3. Now, look at the %s in Picture B. Please describe the situation." % who3), A('q3', 25),
        S("Now, please turn over the card and put it down."), HIDE,
        S("Number 4. " + q4), YN('q4', 8, "Why?", "Why not?", 30),
        POOL('ekp2_5', 'q5', 25, 'No.5', 'Number 5. '),
      ],
      'items': {
        'read': {'no': '音読', 'pts': 5, 'points': read_pts},
        'q1': {'no': 'No.1', 'pts': 5, 'q': 'According to the passage, ' + q1, 'ja': ja1, 'model': a1, 'points': p1},
        'q2': {'no': 'No.2', 'pts': 5, 'q': 'Tell me as much as you can about what they are doing.', 'ja': '(イラストA)人々がしていることを、できるだけたくさん説明してください。', 'model': a2, 'points': p2},
        'q3': {'no': 'No.3', 'pts': 5, 'q': 'Please describe the situation.', 'ja': '(イラストB)%sの状況を説明してください。' % {'woman': '女性', 'man': '男性', 'boy': '男の子', 'girl': '女の子'}[who3], 'model': a3, 'points': p3},
        'q4': {'no': 'No.4', 'pts': 5, 'q': q4, 'ja': ja4, 'model': {'yes': m4y, 'no': m4n}, 'points': ['Yes / No をはっきり', '理由を2文で']},
      },
    }

EKP2_CARDS = [
  EKP2('Lessons for Travelers',
       'Many people enjoy traveling to other countries. However, they sometimes worry about speaking foreign languages. Now, some companies offer short online lessons for travelers. Travelers take such lessons before their trips, and by doing so they can learn useful phrases for airports and hotels quickly.',
       scene('park', [['🌳', 28, 52, 44], ['🌳', 272, 50, 40], ['🧔', 30, 132, 40], ['📰', 52, 126, 22], ['👧', 92, 136, 36], ['🧃', 109, 128, 17],
                      ['👩', 150, 130, 40], ['📦', 172, 124, 22], ['🚴', 214, 134, 40], ['👨', 260, 132, 38], ['📱', 279, 122, 16]]),
       scene('outdoor', [['🗻', 210, 70, 70], ['☁️', 200, 66, 54], ['☁️', 232, 74, 46], ['👩', 90, 130, 56], ['📷', 122, 118, 26]], bubbles=[think_b(60, 46, '🗻📷')]),
       'how can travelers learn useful phrases for airports and hotels quickly?', ['By taking such lessons before their trips.', 'They take short online lessons before their trips.'],
       ['by doing so の doing so が指す内容を答える', 'such lessons → short online lessons と言いかえてもOK'],
       ['A man is reading a newspaper. A girl is drinking juice. A woman is carrying a box. A boy is riding a bicycle. A man is talking on the phone.'],
       ['5人分を現在進行形で', '1人につき1文', 'carry a box / ride a bicycle / talk on the phone'],
       'woman', ["She wants to take a picture of the mountain, but she can't because it's cloudy."], ['吹き出しの「したいこと」+ できない理由', "wants to ～, but she can't because ～"],
       'Do you think more people will take online lessons in the future?',
       "Yes. → People can take lessons at home. They don't need to go to a school, so it saves time.",
       'No. → Many people want to talk with teachers face to face. They can learn better in a classroom.',
       ['タイトルから読む', 'However, / Now, のあとで少し区切る', 'by doing so を自然につなげる'],
       '旅行者は、どうすれば空港やホテルで役立つ表現を早く学べますか。', '将来、オンラインレッスンを受ける人は増えると思いますか。'),
  EKP2('Reusable Bottles',
       'Many people buy drinks in plastic bottles every day. However, plastic bottles can cause problems for the environment. Now, some stores let customers fill their own bottles with water for free. People carry such bottles with them, and by doing so they can reduce plastic waste.',
       scene('park', [['🌳', 270, 52, 44], ['👧', 34, 132, 38], ['🍦', 54, 122, 18], ['🧑', 92, 130, 40], ['🎸', 112, 136, 22],
                      ['👩', 154, 130, 40], ['🐕', 178, 146, 20], ['👦', 214, 132, 38], ['⚽', 234, 150, 16], ['👴', 264, 130, 40], ['📷', 288, 136, 16]]),
       scene('street', [['🚰', 196, 120, 44], ['🧒', 110, 130, 50]], bubbles=[think_b(70, 50, '🚰💧', 64)], signs=[{'x': 196, 'y': 82, 't': 'OUT OF ORDER'}]),
       'how can people reduce plastic waste?', ['By carrying their own bottles with them.', 'They carry their own bottles with them.'],
       ['by doing so の前の内容', 'such bottles → their own bottles'],
       ['A girl is eating ice cream. A man is playing the guitar. A woman is walking her dog. A boy is kicking a ball. An old man is taking a picture.'],
       ['5人分を現在進行形で', 'play the guitar(楽器は the)', 'walk a dog / kick a ball'],
       'boy', ["He wants to drink some water, but he can't because the water fountain is out of order."], ['したいこと(吹き出し)+ できない理由(看板)', 'out of order=故障中'],
       'Do you think more people will carry their own bottles in the future?',
       'Yes. → Many people are interested in the environment. Also, they can save money by not buying drinks.',
       "No. → Carrying a bottle is not convenient. Many people don't want to carry heavy things.",
       ['タイトルから読む', 'environment / reduce の発音', 'However, / Now, のあとで区切る'],
       'どうすれば人々はプラスチックごみを減らせますか。', '将来、自分のボトルを持ち歩く人は増えると思いますか。'),
  EKP2('Volunteer Guides',
       'Many foreign tourists visit Japan every year. However, it is sometimes difficult for them to find their way around big stations. Now, some students work as volunteer guides at stations. They help tourists in English, and in this way they can also practice speaking English.',
       scene('station', [['🚆', 150, 64, 60], ['👩', 34, 130, 40], ['🗺️', 58, 146, 22], ['🧑', 92, 130, 40], ['🧳', 114, 146, 22],
                         ['👧', 152, 134, 36], ['🥤', 170, 124, 17], ['👴', 210, 130, 40], ['📰', 232, 124, 22], ['👦', 264, 132, 38], ['📱', 283, 122, 16]]),
       scene('station', [['🎫', 210, 108, 40], ['👩', 100, 130, 54]], bubbles=[think_b(60, 46, '🎫', 52)], signs=[{'x': 210, 'y': 70, 't': 'CLOSED'}]),
       'how can some students practice speaking English?', ['By helping tourists in English at stations.', 'They work as volunteer guides and help tourists in English.'],
       ['in this way の前の内容', 'By ～ing の形で'],
       ['A woman is looking at a map. A man is carrying a suitcase. A girl is drinking juice. An old man is reading a newspaper. A boy is using his smartphone.'],
       ['5人分を現在進行形で', 'look at a map / carry a suitcase', 'use a smartphone'],
       'woman', ["She wants to buy a ticket, but she can't because the ticket office is closed."], ['したいこと + できない理由', 'ticket office=切符売り場'],
       'Do you think more students should do volunteer work?',
       'Yes. → Students can learn many things by helping other people. It is also a good experience for their future.',
       'No. → Students are busy with studying and club activities. They need time to rest.',
       ['タイトルから読む', 'volunteer / foreign の発音', 'in this way を自然につなげる'],
       '一部の生徒たちはどうやって英語を話す練習ができますか。', 'もっと多くの生徒がボランティア活動をするべきだと思いますか。'),
  EKP2('School Gardens',
       'Some schools have gardens where students grow vegetables. Students take care of the plants every day. Now, some schools use these vegetables in school lunches. Students eat the vegetables they grow, and by doing so they can learn how important food is.',
       scene('outdoor', [['👩', 34, 130, 40], ['🧺', 56, 144, 22], ['👦', 92, 132, 38], ['🪁', 108, 70, 26],
                         ['👧', 150, 134, 36], ['🍙', 168, 124, 17], ['🧑', 206, 130, 40], ['🎨', 228, 136, 22], ['👨', 262, 130, 40], ['📖', 282, 124, 18]]),
       scene('outdoor', [['🌧️', 150, 34, 52], ['🌧️', 230, 40, 46], ['🥕', 230, 146, 26], ['🌱', 260, 146, 22], ['🏫', 60, 92, 40], ['👧', 110, 132, 50]],
             bubbles=[think_b(150, 86, '🌱🥕', 60)]),
       'how can students learn how important food is?', ['By eating the vegetables they grow.', 'They eat the vegetables they grow.'],
       ['by doing so の前の内容', 'they grow までを1つのまとまりで'],
       ['A woman is carrying a basket. A boy is flying a kite. A girl is eating a rice ball. A man is painting a picture. Another man is reading a book.'],
       ['5人分を現在進行形で', 'fly a kite / paint a picture', '2人目の男性は Another man で'],
       'girl', ["She wants to work in the garden, but she can't because it's raining."], ['したいこと + できない理由(天気)', "but she can't because ～"],
       'Do you think schools should teach students how to cook?',
       'Yes. → Cooking is a useful skill for life. Students can also learn about healthy food.',
       'No. → Students can learn cooking at home. Schools should spend more time on other subjects.',
       ['タイトルから読む', 'vegetables / important の発音', 'how important food is を最後まではっきり'],
       'どうすれば生徒たちは食べ物の大切さを学べますか。', '学校は生徒に料理の仕方を教えるべきだと思いますか。'),
  EKP2('Museum Apps',
       'Museums have many interesting things to see. However, visitors sometimes do not know much about the things they are looking at. Now, some museums have apps for smartphones. Visitors listen to explanations on the apps, and by doing so they can enjoy the museums more.',
       scene('room', [['🖼️', 70, 52, 40], ['🖼️', 230, 52, 40], ['🧑', 34, 130, 40], ['📷', 56, 120, 20], ['👧', 92, 134, 36], ['🎧', 92, 108, 18],
                      ['👨', 150, 130, 40], ['☕', 172, 124, 18], ['👩', 208, 130, 40], ['📓', 230, 136, 20], ['🪑', 266, 150, 30], ['👦', 264, 132, 36]]),
       scene('room', [['🖼️', 200, 70, 60], ['👨', 100, 130, 54], ['📷', 132, 118, 24]], bubbles=[think_b(56, 46, '📷🖼️', 60)], signs=[{'x': 200, 'y': 120, 't': 'NO PHOTOS'}]),
       'how can visitors enjoy the museums more?', ['By listening to explanations on the apps.', 'They listen to explanations on the apps.'],
       ['by doing so の前の内容', 'By ～ing の形で'],
       ['A man is taking a picture. A girl is listening to music. Another man is drinking coffee. A woman is writing in a notebook. A boy is sitting on a chair.'],
       ['5人分を現在進行形で', 'listen to music / write in a notebook', 'sit on a chair'],
       'man', ["He wants to take a picture of the painting, but he can't because taking photos is not allowed."], ['したいこと + できない理由(看板)', 'is not allowed=禁止されている'],
       'Do you think museums should be free for students?',
       'Yes. → Students can learn a lot at museums. If museums are free, more young people will visit them.',
       'No. → Museums need money to take care of their collections. Students can pay a small price.',
       ['タイトルから読む', 'museums / explanations の発音', 'they are looking at を1つのまとまりで'],
       'どうすれば来館者は博物館をもっと楽しめますか。', '博物館は学生には無料にするべきだと思いますか。'),
]
EKP2_POOLS = {
  'ekp2_5': [
    QYN('These days, many people enjoy camping. Do you like to go camping?', 'キャンプに行くのは好きですか。', 'Please tell me more.', 'Why not?',
        'Yes. → I like cooking outside with my family. Last summer, we went camping near a lake.', "No. → I don't like insects. I prefer staying in a hotel.", ['Yes なら具体的な経験を', 'No なら理由を']),
    QYN('Many students join club activities at school. Are you in a club at school?', '学校で部活に入っていますか。', 'Please tell me more.', 'Why not?',
        'Yes. → I am in the tennis club. We practice every day after school.', 'No. → I want to use my time for studying. I also go to a cram school.', ['Yes ならどんな部か・どのくらい', 'No なら理由を']),
    QYN('Many people enjoy watching sports on TV. Do you like watching sports?', 'スポーツを見るのは好きですか。', 'Please tell me more.', 'Why not?',
        'Yes. → I like watching baseball games. My favorite team is the Tigers.', "No. → I prefer playing sports to watching them. It's more exciting.", ['Yes ならどのスポーツか', 'No なら理由を']),
    QYN('Some people keep a diary. Do you keep a diary?', '日記をつけていますか。', 'Please tell me more.', 'Why not?',
        'Yes. → I write a diary in English every night. It is good practice for me.', "No. → I'm too busy in the evening. I take pictures instead.", ['Yes ならいつ・どんなふうに', 'No なら理由を']),
    QYN('Many people like going to the beach in summer. Do you often go to the beach?', '夏によく海に行きますか。', 'Please tell me more.', 'Why not?',
        'Yes. → I go to the beach with my friends every summer. We swim and play volleyball.', 'No. → There is no beach near my house. I usually go to the pool.', ['Yes ならだれと・何をする', 'No なら理由を']),
    QYN('These days, many people take pictures with their smartphones. Do you often take pictures?', 'よく写真を撮りますか。', 'Please tell me more.', 'Why not?',
        'Yes. → I like taking pictures of airplanes. I often go to the airport to take them.', "No. → I don't have a smartphone yet. I want to enjoy things with my own eyes.", ['Yes なら何を撮るか', 'No なら理由を']),
    QYN('Some students like to study at cafes. Do you like studying outside your home?', '家の外で勉強するのは好きですか。', 'Please tell me more.', 'Why not?',
        'Yes. → I often study at the library. I can concentrate there.', 'No. → It is noisy outside. I can study better in my room.', ['Yes ならどこで・なぜ', 'No なら理由を']),
    QYN('Many people enjoy cooking at home. Do you often cook for your family?', '家族のためによく料理をしますか。', 'Please tell me more.', 'Why not?',
        'Yes. → I make breakfast on weekends. My family likes my omelets.', "No. → My mother is a good cook. I usually help her wash the dishes.", ['Yes なら何を作るか', 'No なら理由を']),
    QYN('These days, many people use bicycles to get around. Do you often ride a bicycle?', 'よく自転車に乗りますか。', 'Please tell me more.', 'Why not?',
        'Yes. → I ride my bicycle to school every day. On weekends, I ride along the river.', 'No. → My house is on a hill. I usually take the bus.', ['Yes ならいつ・どこへ', 'No なら理由を']),
    QYN('Some people like to travel abroad. Do you want to visit a foreign country?', '外国に行ってみたいですか。', 'Please tell me more.', 'Why not?',
        'Yes. → I want to visit the United States. I want to see a big air show there.', 'No. → There are still many places I want to visit in Japan.', ['Yes ならどこへ・何をしに', 'No なら理由を']),
  ],
}
CARDS['ekp2'] = TEST('準2級', 1, 6, OPEN('Pre-2'), EKP2_CARDS, EKP2_POOLS)

# ================================================================ 準2級プラス
# No.1 the passage, No.2 3-panel story (20 s to prepare), card turned over, No.3 an opinion about the card's
# topic, No.4 another opinion (pool)
def EKP2P(title, passage, panels, start, q1, a1, p1, a2, q3, m3y, m3n, read_pts, ja1, ja3):
    return {
      'card': {'title': title, 'passage': passage, 'panels': panels, 'start': start},
      'steps': [
        S("First, please read the passage silently for 20 seconds."), PREP(20, '黙読'),
        S("All right. Now, please read it aloud."), READ(50),
        S("Now, I'll ask you four questions."),
        S("Number 1. According to the passage, " + q1), A('q1', 20),
        S("Number 2. Now, please look at the pictures and describe the situation. You have 20 seconds to prepare. Your story should begin with the sentence on the card."), PREP(20, '準備'),
        S("Please begin."), A('q2', 60),
        S("Now, please turn over the card and put it down."), HIDE,
        S("Number 3. " + q3), YN('q3', 8, "Why?", "Why not?", 30),
        POOL('ekp2p_4', 'q4', 30, 'No.4', 'Number 4. '),
      ],
      'items': {
        'read': {'no': '音読', 'pts': 5, 'points': read_pts},
        'q1': {'no': 'No.1', 'pts': 5, 'q': 'According to the passage, ' + q1, 'ja': ja1, 'model': a1, 'points': p1},
        'q2': {'no': 'No.2', 'pts': 5, 'q': 'Please describe the situation. (3コマ)', 'ja': '3コマのイラストの話を、カードの最初の文から説明してください。', 'model': a2,
               'points': ['最初の文から始める', '過去形・過去進行形で', 'コマの間の言葉(At the supermarket / At home など)を使う', '吹き出しのセリフは said to ～, "…"']},
        'q3': {'no': 'No.3', 'pts': 5, 'q': q3, 'ja': ja3, 'model': {'yes': m3y, 'no': m3n}, 'points': ['Yes / No + 理由2文', '具体的な人や場面を入れる']},
      },
    }
NARR3_P2P = [
  scene('room', [['🛋️', 150, 140, 60], ['👧', 110, 120, 46], ['👩', 190, 118, 50]], bubbles=[say_b(150, 34, "Let's make a cake for Dad's birthday!", 150)], cap='One day'),
  scene('shop', [['🛒', 90, 140, 40], ['👧', 70, 118, 44], ['🍓', 100, 110, 22], ['👩', 170, 118, 48], ['📝', 196, 108, 24]], cap='At the supermarket'),
  scene('kitchen', [['👧', 80, 122, 44], ['👩', 150, 120, 48], ['🍰', 118, 152, 20]], bubbles=[think_b(225, 46, '🥚❌')], cap='At home'),
]
EKP2P_CARDS = [
  EKP2P('Self-Service Checkouts',
        'Many supermarkets have introduced self-service checkouts. Customers scan the products they buy and pay by themselves. Supermarkets can reduce the number of workers needed at checkouts, and in this way they can save money. However, some older customers find these machines difficult to use, so staff members are still needed to help them.',
        NARR3_P2P, 'One day, Yuki was talking with her mother in the living room.',
        'how can supermarkets save money?', ['By reducing the number of workers needed at checkouts.'], ['in this way が指す内容', 'By ～ing の形で'],
        ["One day, Yuki was talking with her mother in the living room. Her mother said to her, \"Let's make a cake for Dad's birthday!\" At the supermarket, Yuki was putting strawberries into the shopping cart, and her mother was looking at a shopping list. When they got home, they realized that they had forgotten to buy eggs."],
        'Do you think it is a good idea for stores to use more machines instead of workers?',
        'Yes. → Machines can work for many hours without a break. Stores can keep their prices low.',
        'No. → Some people cannot use machines well. They need workers to help them.',
        ['self-service checkouts をはっきり', 'and in this way の前で区切る', '長い文はまとまりごとに'],
        'スーパーはどうやってお金を節約できますか。', '店が店員の代わりに機械をもっと使うのは良い考えだと思いますか。'),
]
OPINION = ['Yes / No + 理由2文', 'I think ～ / For example, ～ を使ってもOK']
EKP2P_POOLS = {
  'ekp2p_4': [
    QYN('Some people say that students should learn about money at school. Do you agree with this opinion?', '学校でお金について学ぶべきだという意見に賛成ですか。', 'Why?', 'Why not?',
        'Yes. → Young people will need to manage their own money in the future. It is important to learn how to save money early.',
        'No. → Students can learn about money from their families. Schools should spend more time on other subjects.', OPINION, 30),
    QYN('Some people say that children should not have smartphones. Do you agree with this opinion?', '子どもはスマートフォンを持つべきではないという意見に賛成ですか。', 'Why?', 'Why not?',
        'Yes. → Children may spend too much time on games and videos. They should play outside and talk with their friends more.',
        'No. → Smartphones are useful when children need to contact their parents. They can also use them to study.', OPINION, 30),
    QYN('Do you think more students will study abroad in the future?', '将来、留学する学生は増えると思いますか。', 'Why?', 'Why not?',
        'Yes. → Many companies need workers who can speak English. Studying abroad is a good way to learn a language.',
        'No. → Studying abroad costs a lot of money. Students can also learn foreign languages online.', OPINION, 30),
    QYN('Some people say that people should use public transportation more often. Do you agree with this opinion?', '人々はもっと公共交通機関を使うべきだという意見に賛成ですか。', 'Why?', 'Why not?',
        'Yes. → Buses and trains are better for the environment than cars. There will also be fewer traffic jams.',
        'No. → In the countryside, buses and trains do not come often. People need cars to go shopping.', OPINION, 30),
    QYN('Do you think school uniforms are necessary?', '学校の制服は必要だと思いますか。', 'Why?', 'Why not?',
        'Yes. → Students do not need to think about what to wear every day. Uniforms also help students feel like a team.',
        'No. → Students should be able to choose their own clothes. Uniforms are also expensive for families.', OPINION, 30),
    QYN('Some people say that it is better to live in a big city than in the countryside. Do you agree with this opinion?', '田舎より大都市に住むほうがよいという意見に賛成ですか。', 'Why?', 'Why not?',
        'Yes. → There are many jobs and stores in big cities. It is also easy to get around by train.',
        'No. → Life in the countryside is quiet and relaxing. People can enjoy nature every day.', OPINION, 30),
    QYN('Do you think people read fewer books these days?', '最近、人々が読む本は減っていると思いますか。', 'Why?', 'Why not?',
        'Yes. → Many people spend their free time watching videos on their phones. They do not have much time to read.',
        'No. → Many people read e-books on their smartphones. It is easy to carry many books.', OPINION, 30),
    QYN('Some people say that everyone should learn how to cook. Do you agree with this opinion?', 'だれもが料理の仕方を学ぶべきだという意見に賛成ですか。', 'Why?', 'Why not?',
        'Yes. → Cooking for yourself is healthier than eating out. It is also a useful skill when you live alone.',
        'No. → Many people are busy with work. They can buy healthy food at supermarkets.', OPINION, 30),
  ],
}
CARDS['ekp2p'] = TEST('準2級プラス', 2, 7, OPEN('Pre-2 Plus'), EKP2P_CARDS, EKP2P_POOLS)

# ================================================================ 2級
# No.1 the passage, No.2 3-panel story, card turned over, No.3 an opinion ("Some people say ~. What do you
# think about that?"), No.4 a Yes / No question about society (pool)
def EK2(title, passage, panels, start, q1, a1, p1, a2, p2, q3, m3, ja1, ja3, read_pts):
    return {
      'card': {'title': title, 'passage': passage, 'panels': panels, 'start': start},
      'steps': [
        S("First, please read the passage silently for 20 seconds."), PREP(20, '黙読'),
        S("All right. Now, please read it aloud."), READ(50),
        S("Now, I'll ask you four questions."),
        S("Number 1. According to the passage, " + q1), A('q1', 20),
        S("Number 2. Now, please look at the pictures and describe the situation. You have 20 seconds to prepare. Your story should begin with the sentence on the card."), PREP(20, '準備'),
        S("Please begin."), A('q2', 60),
        S("Now, please turn over the card and put it down."), HIDE,
        S("Number 3. " + q3), A('q3', 35),
        POOL('ek2_4', 'q4', 35, 'No.4', 'Number 4. '),
      ],
      'items': {
        'read': {'no': '音読', 'pts': 5, 'points': read_pts},
        'q1': {'no': 'No.1', 'pts': 5, 'q': 'According to the passage, ' + q1, 'ja': ja1, 'model': a1, 'points': p1},
        'q2': {'no': 'No.2', 'pts': 5, 'q': 'Please describe the situation. (3コマ)', 'ja': '3コマのイラストの話を、カードの最初の文から説明してください。', 'model': a2, 'points': p2},
        'q3': {'no': 'No.3', 'pts': 5, 'q': q3, 'ja': ja3, 'model': m3, 'points': ['I agree / I disagree で立場を', '理由 + 例(For example, ～)']},
      },
    }
NARR3_G2 = [
  scene('room', [['👨', 100, 122, 50], ['👩', 190, 122, 50], ['📖', 145, 140, 26]], bubbles=[say_b(150, 34, "Let's go to Okinawa this summer!", 150)], cap='One day'),
  scene('room', [['👨', 70, 122, 48], ['💻', 100, 138, 26], ['👩', 200, 122, 48], ['🧳', 236, 140, 32]], cap='A week later'),
  scene('airport', [['🪟', 150, 42, 60], ['🌀', 150, 40, 34], ['👨', 100, 124, 48], ['👩', 190, 124, 48]], bubbles=[think_b(250, 70, '😢', 52)], signs=[{'x': 150, 'y': 92, 't': 'CANCELED'}], cap='On the day of the trip'),
]
EK2_CARDS = [
  EK2('Drones for Deliveries',
      'Today, some companies are testing drones to deliver goods. Drones can fly over roads and rivers, and in this way they can reach places that are hard to get to by car. Companies hope that drones will help people living in mountain areas. However, drones can be affected by bad weather, so companies need to make sure they can fly safely.',
      NARR3_G2, 'One day, Mr. and Mrs. Sato were talking about their summer vacation.',
      'how can drones reach places that are hard to get to by car?', ['By flying over roads and rivers.'], ['in this way の前を答える', 'By ～ing'],
      ["One day, Mr. and Mrs. Sato were talking about their summer vacation. Mrs. Sato said to her husband, \"Let's go to Okinawa this summer!\" A week later, Mr. Sato was booking plane tickets on his computer, and Mrs. Sato was packing a suitcase. On the day of the trip, they were at the airport. They found out that their flight had been canceled because of a typhoon."],
      ['最初の文から', '2人がそれぞれしていることを説明', '過去完了(had been canceled)も使えると◎'],
      'Some people say that families should spend more time together. What do you think about that?',
      ['I agree. Spending time together helps family members understand each other. For example, they can talk about their problems during dinner.',
       'I disagree. Many people are busy with work and school. It is more important for families to enjoy the time they have together.'],
      'ドローンはどうやって車で行きにくい場所に届くことができますか。', '家族はもっと一緒に過ごすべきだという意見について、どう思いますか。',
      ['Drones / Deliveries の発音', 'and in this way / However, の前で区切る', '内容のまとまりを意識して']),
]
SOC = ['Yes / No + 理由2文', '社会全体の視点で']
EK2_POOLS = {
  'ek2_4': [
    QYN('Today, many people buy things on the Internet. Do you think online shopping will become more popular in the future?', '将来、ネットショッピングはもっと広まると思いますか。', 'Why?', 'Why not?',
        'Yes. → It is convenient because people can buy things at any time. Also, delivery services are getting faster.',
        'No. → Many people want to see products before they buy them. They also enjoy shopping with their friends at stores.', SOC, 35),
    QYN('These days, many people pay without cash. Do you think cash will disappear in the future?', '将来、現金はなくなると思いますか。', 'Why?', 'Why not?',
        'Yes. → Paying by smartphone is fast and easy. Stores can also save time because they do not need to count money.',
        'No. → Some elderly people are not used to cashless payments. Cash is also useful when there is a power outage.', SOC, 35),
    QYN('Today, robots are used in many places. Do you think more robots will work in stores and restaurants in the future?', '将来、店やレストランで働くロボットは増えると思いますか。', 'Why?', 'Why not?',
        'Yes. → Many stores do not have enough workers. Robots can do simple jobs such as carrying food.',
        'No. → Many customers want to talk with real people. Robots are also too expensive for small stores.', SOC, 35),
    QYN('In Japan, the number of elderly people is increasing. Do you think the government should do more to help them?', '政府は高齢者をもっと支援すべきだと思いますか。', 'Why?', 'Why not?',
        'Yes. → Many elderly people live alone and need help in their daily lives. The government should build more care facilities.',
        'No. → Families and local communities can support elderly people. The government also needs money for young people.', SOC, 35),
    QYN('These days, many people get news from social media. Do you think the information on social media is reliable?', 'SNSの情報は信頼できると思いますか。', 'Why?', 'Why not?',
        'Yes. → People can get news quickly from people who are actually there. Many news companies also use social media.',
        'No. → Anyone can post information on social media. Some of it is not true, so people need to be careful.', SOC, 35),
    QYN('Today, many students take classes online. Do you think online classes are as good as classes at school?', 'オンライン授業は学校の授業と同じくらい良いと思いますか。', 'Why?', 'Why not?',
        'Yes. → Students can watch the lessons again and again. They can also study at their own pace.',
        'No. → It is difficult to ask teachers questions online. Students also need to make friends at school.', SOC, 35),
    QYN('Many foreign tourists visit Japan. Do you think there should be more signs in foreign languages?', '外国語の案内表示をもっと増やすべきだと思いますか。', 'Why?', 'Why not?',
        'Yes. → Tourists often get lost in big stations. Signs in many languages will help them travel safely.',
        'No. → Many tourists can use translation apps on their smartphones. Too many signs can be confusing.', SOC, 35),
    QYN('Some people say that companies should let workers take longer vacations. Do you think this is a good idea?', '会社は社員にもっと長い休暇を取らせるべきだと思いますか。', 'Why?', 'Why not?',
        'Yes. → Workers can relax and come back with more energy. They can also spend more time with their families.',
        'No. → If many workers take long vacations, the company may not be able to do its work. Customers may have problems.', SOC, 35),
  ],
}
CARDS['ek2'] = TEST('2級', 2, 7, OPEN('2'), EK2_CARDS, EK2_POOLS)

# ================================================================ 準1級
# free conversation (not marked, pool), the 4-panel narration (1 minute to prepare, 2 minutes), No.1 about the
# 4th picture, card turned over, No.2 the card's topic, No.3 / No.4 social questions (pool)
FREE = lambda pool: [
    POOL(pool, 'free1', 25, '自由会話', '', 0),
    POOL(pool, 'free2', 25, '自由会話', 'I see. ', 0),
]
def EKP1(about, panels, start, narr, q1m, q2, q2m, ja2):
    return {
      'card': {'title': 'You have one minute to prepare.', 'panels': panels, 'start': start},
      'steps': [
        S("Thank you. Now, let's start the test. Here is your card."), CARD,
        S("You have one minute to prepare. This is a story about %s. Your story should begin with the sentence on the card." % about), PREP(60, '準備'),
        S("All right. Please begin your narration. You have two minutes."), A('narr', 120),
        S("Now, I'll ask you four questions."),
        S("Number 1. Please look at the fourth picture. If you were the %s, what would you be thinking?" % panels_who(panels)), A('q1', 35),
        S("Now, please turn over the card and put it down."), HIDE,
        S("Number 2. " + q2), A('q2', 40),
        POOL('ekp1_s', 'q3', 40, 'No.3', 'Number 3. '),
        POOL('ekp1_s', 'q4', 40, 'No.4', 'Number 4. '),
      ],
      'items': {
        'narr': {'no': 'ナレーション', 'pts': 15, 'q': 'Narration (4コマ)', 'ja': '4コマのイラストの話を、カードの最初の文から2分で説明してください。', 'model': narr,
                 'points': ['4コマすべて + コマ間の言葉(A month later など)', '過去形・過去進行形', '吹き出しのセリフ・表情も説明', '1分の準備で各コマ1〜2文を決める']},
        'q1': {'no': 'No.1', 'pts': 5, 'q': 'If you were the %s, what would you be thinking?' % panels_who(panels), 'ja': 'あなたがこの%sだったら、何を考えているでしょうか。' % {'woman': '女性', 'man': '男性', 'boy': '男の子', 'girl': '女の子'}[panels_who(panels)],
               'model': q1m, 'points': ["I'd be thinking, \"…\" の形", '4コマ目の状況に合わせる']},
        'q2': {'no': 'No.2', 'pts': 5, 'q': q2, 'ja': ja2, 'model': q2m, 'points': ['意見 + 理由 + 結果(As a result)']},
      },
    }
def panels_who(panels): return panels[0].get('who', 'woman')
NARR4_P1 = [
  scene('office', [['🧑‍💼', 80, 124, 48], ['👩', 150, 124, 48], ['🧑', 220, 124, 44]], bubbles=[say_b(150, 34, 'Starting next month, you can work from home.', 170)], cap='One day'),
  scene('room', [['👩', 120, 122, 48], ['💻', 150, 140, 26], ['🐕', 210, 140, 34], ['☕', 172, 136, 20]], cap='A month later'),
  scene('room', [['👩', 120, 122, 48], ['💻', 150, 140, 26], ['🏗️', 250, 110, 44], ['🔊', 216, 92, 24]], bubbles=[think_b(70, 40, '😣')], cap='A few weeks later'),
  scene('office', [['👩', 110, 124, 48], ['🧑‍💼', 190, 124, 48], ['💻', 140, 140, 24]], cap='The next week'),
]
NARR4_P1[0]['who'] = 'woman'
EKP1_CARDS = [
  EKP1('a woman who started working from home', NARR4_P1, 'One day, a woman was talking with her coworkers in the office.',
       ["One day, a woman was talking with her coworkers in the office. Her boss said to them, \"Starting next month, you can work from home.\" The woman looked happy to hear this. A month later, she was working on her computer at home. She was drinking coffee, and her dog was sitting next to her. A few weeks later, there was construction work near her house. It was very noisy, and she couldn't concentrate on her work. The next week, she was working at the office again, and she was talking with her boss."],
       ["I'd be thinking, \"Working from home was comfortable, but it's easier to concentrate at the office. Maybe I should come to the office on some days.\""],
       'Do you think companies should allow more employees to work from home?',
       ["Yes. Employees can save time because they don't have to commute. As a result, they may have more energy for their work and their families."],
       '会社はもっと多くの社員に在宅勤務を認めるべきだと思いますか。'),
]
P1S = ['意見を最初に', '理由 + 具体例', '社会全体への影響まで言えると◎']
EKP1_POOLS = {
  'ekp1_free': [
    Q('Please tell me a little about yourself.', '少し自己紹介をしてください。', ["I'm a high school student. I'm interested in airplanes, and I want to become an airline pilot in the future."], ['2〜3文で']),
    Q('What do you like to do in your free time?', '自由な時間に何をするのが好きですか。', ['I like riding my bike. On weekends, I often ride to the airport to watch planes.'], ['理由や具体例を一言']),
    Q('How did you come here today?', '今日はどうやってここに来ましたか。', ['I came here by train. It took about thirty minutes.'], ['過去形で', 'かかった時間も']),
    Q('What are you interested in these days?', '最近、何に興味がありますか。', ["Recently, I've been interested in learning Korean. I watch Korean dramas to practice."], ['具体的に']),
    Q('Have you traveled anywhere recently?', '最近どこかに旅行しましたか。', ['Yes. I went to Hokkaido with my family last summer. The food was great.'], ['Yes / No のあとに1〜2文']),
    Q('What do you want to do after you finish school?', '学校を卒業したら何をしたいですか。', ['I want to go to a university and study engineering. After that, I want to work abroad.'], ['want to ～ で']),
  ],
  'ekp1_s': [
    Q('Should the government do more to support small businesses in rural areas?', '政府は地方の小さな会社をもっと支援すべきですか。',
      ['Yes. Small businesses create jobs for local people. If they close, young people will move to big cities, and rural areas will become even smaller.'], P1S),
    Q('These days, many people read the news on their smartphones. Do you think people trust the news less than they did in the past?', '人々は昔よりニュースを信頼しなくなったと思いますか。',
      ['Yes. There is a lot of false information on the Internet. It is sometimes hard for people to tell which news is true.'], ['前置きの文(These days, …)を受けて答える', '理由 + 具体例']),
    Q('Do you think Japan should accept more tourists from abroad?', '日本は海外からの観光客をもっと受け入れるべきだと思いますか。',
      ['Yes. Tourists spend a lot of money, and this helps local economies. However, popular places need rules so that they do not become too crowded.'], P1S),
    Q('Should schools put more emphasis on teaching students about the environment?', '学校は環境についての教育にもっと力を入れるべきですか。',
      ['Yes. Climate change will affect young people the most. If students learn about it early, they can change their habits, such as using less plastic.'], P1S),
    Q('Do you think people today have less free time than in the past?', '今の人は昔より自由な時間が少ないと思いますか。',
      ["Yes. Many people work long hours, and smartphones make it hard to stop working after they get home. As a result, they don't have enough time to relax."], P1S),
    Q('Is it a good idea for companies to hire more older workers?', '会社がもっと高齢の労働者を雇うのは良い考えですか。',
      ['Yes. Older workers have a lot of experience and skills. They can also teach young workers, so the whole company benefits.'], P1S),
    Q('Should professional athletes be paid such high salaries?', 'プロスポーツ選手の高い給料は妥当だと思いますか。',
      ['I think so. Athletes train very hard, and their careers are short. They also bring a lot of money to their teams through ticket sales and advertising.'], P1S),
    Q('Do you think artificial intelligence will make people\'s lives better?', 'AIは人々の生活をより良くすると思いますか。',
      ['Yes, in many ways. AI can help doctors find diseases earlier and make work more efficient. However, we need rules to protect personal information.'], P1S),
  ],
}
CARDS['ekp1'] = TEST('準1級', 2, 8, [
    S("{hello}My name is {ex}. May I have your name, please?"), A('name', 8),
    S("Thank you. This is the Grade Pre-1 test. First, I'd like to ask you a few questions about yourself."),
  ] + FREE('ekp1_free'), EKP1_CARDS, EKP1_POOLS, 'はじめの自由会話と、カードを裏返したあとの質問は毎回変わります。')

# ================================================================ 1級
# free conversation (pool), one minute to choose one of five topics and prepare, a 2-minute speech, Q&A
def EK1(topics):
    return {
      'card': {'title': 'Choose one topic.', 'topics': topics},
      'steps': [
        S("All right. Here is your topic card. You have one minute to choose one topic and prepare your speech. You can't take notes."), CARD, {'k': 'topics', 'sec': 60},
        S("All right. Please begin your speech. You have two minutes."), A('speech', 120),
        {'k': 'tq', 'n': 0, 'sec': 45}, {'k': 'tq', 'n': 1, 'sec': 45},
        S("Thank you. That is the end of the question period."), HIDE,
      ],
      'items': {
        'speech': {'no': 'スピーチ', 'pts': 10, 'q': 'Speech (2 minutes)', 'ja': '選んだトピックについて2分でスピーチ。', 'model': [], 'points': ['最初に立場をはっきり', '理由を2つ、それぞれ例つきで', '最後にまとめ', '2分を使い切る(時間をこえると止められる)']},
        'tq0': {'no': '質疑応答1', 'pts': 10, 'q': '(トピックについての質問)', 'ja': 'スピーチについての質問', 'model': [], 'points': ['質問に直接答えてから理由', '会話を続ける姿勢']},
        'tq1': {'no': '質疑応答2', 'pts': 0, 'q': '(トピックについての質問)', 'ja': 'スピーチについての質問', 'model': [], 'points': ['反対の意見にも触れられると◎']},
        'gv': {'no': '文法・語彙', 'pts': 10, 'q': '(全体)', 'ja': 'スピーチと質疑応答を通して', 'model': [], 'points': ['同じ語のくり返しを避ける', '時制・単数複数のミスが少ない']},
        'pf': {'no': '発音・流ちょうさ', 'pts': 10, 'q': '(全体)', 'ja': 'スピーチと質疑応答を通して', 'model': [], 'points': ['聞き取りやすい速さと区切り', '長い沈黙を作らない']},
      },
    }
EK1_CARDS = [
  EK1([
      {'t': 'Should Japan accept more workers from other countries?',
       'outline': ['立場: Yes', '理由1: 人口が減って、介護や農業で働く人が足りない', '理由2: 多様な考えが新しいアイデアや経済の成長につながる', 'まとめ: 受け入れの準備(言語・生活の支援)も大切'],
       'qs': ['What kinds of support do foreign workers need when they come to Japan?', 'Do you think language barriers are a serious problem in the workplace?']},
      {'t': 'Is space exploration worth its cost?',
       'outline': ['立場: Yes', '理由1: 衛星の技術が天気予報や通信など生活を支えている', '理由2: 新しい技術が医療や環境の分野にも使われる', 'まとめ: 国どうしの協力で費用を分け合える'],
       'qs': ['Should private companies play a bigger role in space exploration?', 'Some people say the money should be spent on problems on Earth. What do you think?']},
      {'t': 'Can technology solve the problem of climate change?',
       'outline': ['立場: 一部は解決できる', '理由1: 再生可能エネルギーや電気自動車で排出を減らせる', '理由2: しかし技術だけでは不十分で、生活の変化も必要', 'まとめ: 技術と個人・政府の行動の両方が必要'],
       'qs': ['What can individuals do to reduce their carbon footprint?', 'Should air travel be more expensive to protect the environment?']},
      {'t': 'Should cities limit the use of cars in their centers?',
       'outline': ['立場: Yes', '理由1: 渋滞と大気汚染が減る', '理由2: 歩きやすい街は店や観光にも良い', 'まとめ: 公共交通を便利にすることが条件'],
       'qs': ['How would limiting cars affect people who live in the suburbs?', 'Do you think public transportation in Japan is good enough?']},
      {'t': 'Are online friendships as meaningful as face-to-face ones?',
       'outline': ['立場: No(同じではない)', '理由1: 表情や体験を共有することで信頼が深まる', '理由2: ただしオンラインは遠くの人や同じ趣味の人とつながれる', 'まとめ: 両方の良さを組み合わせるのが大切'],
       'qs': ['Do social media sites make people feel lonely?', 'Should schools teach students how to use social media safely?']},
  ]),
]
EK1_POOLS = {
  'ek1_free': [
    Q('Please tell me a little about yourself.', '少し自己紹介をしてください。', ["I'm a student, and I'm interested in aviation. I'm studying English because I want to work as an international pilot."], ['落ち着いて2〜3文']),
    Q('What are you interested in these days?', '最近、何に興味がありますか。', ["Recently, I've been interested in new airplane technology, such as planes that use cleaner fuel."], ['具体的に']),
    Q('How do you usually spend your weekends?', 'ふだん週末をどう過ごしますか。', ['I usually study in the morning and go cycling in the afternoon. It helps me relax.'], ['具体的に2文']),
    Q('Why are you taking the Grade 1 test?', 'なぜ1級を受けるのですか。', ['I want to use English in my future job, and I think this test is a good goal to aim for.'], ['理由をはっきり']),
    Q('What kind of books or articles do you read?', 'どんな本や記事を読みますか。', ['I often read articles about science and technology. I also like history books.'], ['ジャンル + 一言']),
    Q('Have you been abroad?', '海外に行ったことはありますか。', ['Yes, I went to Australia on a school trip. It was a great chance to use English.'], ['Yes / No のあとに具体例']),
  ],
}
CARDS['ek1'] = TEST('1級', 2, 10, [
    S("{hello}My name is {ex}. May I have your name, please?"), A('name', 8),
    S("Thank you. This is the Grade 1 test. Before we start, I'd like to ask you a few questions."),
  ] + FREE('ek1_free'), EK1_CARDS, EK1_POOLS, 'はじめの自由会話の質問は毎回変わります。')
