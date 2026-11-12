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
  EKP2P('Bicycle-Sharing Services',
        'In many cities, people can rent bicycles from bicycle-sharing services. Users can borrow a bicycle at one station and return it at another. People can ride bicycles instead of taking taxis, and in this way they can save money. However, some users leave bicycles in the wrong places, so cities need to make clear rules.',
        [scene('room', [['📺', 150, 92, 34], ['👦', 100, 124, 44], ['👨', 200, 120, 50]], bubbles=[say_b(110, 34, "Let's go cycling by the lake this weekend!", 160)], cap='One day'),
         scene('park', [['🏞️', 240, 80, 64], ['🚴', 110, 128, 48], ['👨', 196, 124, 48], ['📷', 220, 112, 22]], cap='On the weekend'),
         scene('street', [['🌧️', 70, 30, 40], ['🌧️', 150, 26, 40], ['🚲', 70, 142, 40], ['👦', 110, 126, 42], ['🚲', 196, 142, 40], ['👨', 240, 122, 48]],
               bubbles=[think_b(196, 68, '☂️❌', 62)], cap='On the way home')],
        'One day, Ken was talking with his father in the living room.',
        'how can people save money?', ['By riding bicycles instead of taking taxis.'], ['in this way が指す内容', 'By ～ing の形で'],
        ["One day, Ken was talking with his father in the living room. Ken said to his father, \"Let's go cycling by the lake this weekend!\" On the weekend, Ken was riding his bicycle by the lake, and his father was taking pictures of him. On the way home, it started to rain, and they realized that they didn't have umbrellas."],
        'Do you think more people will use bicycles in the future?',
        "Yes. → Riding a bicycle is good for people's health. It is also better for the environment than driving a car.",
        'No. → Riding a bicycle on busy roads is dangerous. Also, many people do not want to ride in the rain.',
        ['bicycle-sharing をひとまとまりで', 'and in this way の前で区切る', 'However, のあとで少し間を'],
        '人々はどうやってお金を節約できますか。', '将来、自転車を使う人は増えると思いますか。'),
  EKP2P('E-books at Libraries',
        'Today, some public libraries lend e-books on the Internet. People can borrow e-books without going to the library. They can read books on their smartphones at any time, and by doing so they can use their free time well. However, some people prefer paper books, so libraries still need to keep many printed books.',
        [scene('classroom', [['👧', 80, 126, 42], ['👦', 130, 128, 40], ['👩‍🏫', 230, 122, 50]], bubbles=[say_b(210, 34, 'Please write a report about birds by Friday.', 170)],
               signs=[{'x': 240, 'y': 84, 't': 'BIRDS', 'c': '#2e6b4f'}], cap='One day'),
         scene('library', [['📚', 40, 64, 40], ['📚', 86, 64, 40], ['👧', 150, 126, 44], ['📖', 176, 118, 22], ['👩', 236, 122, 48], ['💻', 262, 138, 22]], cap='After school'),
         scene('room', [['🕛', 250, 34, 30], ['👧', 110, 124, 44], ['✏️', 138, 138, 20], ['📄', 160, 142, 22], ['👩', 226, 122, 48], ['🍵', 200, 112, 20]], cap='On Thursday night')],
        'One day, Mika was in her classroom.',
        'how can people use their free time well?', ['By reading books on their smartphones at any time.'], ['by doing so の doing so が指す内容', 'By ～ing の形で'],
        ['One day, Mika was in her classroom. Her teacher said to the students, "Please write a report about birds by Friday." After school, Mika was looking for books about birds at the library, and a librarian was helping her. On Thursday night, Mika was still writing her report at midnight. Her mother was bringing her a cup of tea.'],
        'Do you think people will stop buying paper books in the future?',
        'Yes. → E-books are cheaper and easy to carry. People can buy them on their smartphones in a few seconds.',
        'No. → Many people like the feel of paper books. Paper books are also easier on the eyes.',
        ['e-books / libraries の発音', 'by doing so の前で区切る', 'printed books をはっきり'],
        '人々はどうやって自由な時間をうまく使えますか。', '将来、人々は紙の本を買わなくなると思いますか。'),
  EKP2P('Food Delivery Services',
        'These days, food delivery services are becoming popular. People can order meals from restaurants with their smartphones. Restaurants can sell food to people who cannot come to the restaurant, and in this way they can get more customers. However, delivery workers must ride on busy roads, so they need to be careful about traffic accidents.',
        [scene('restaurant', [['👨‍🍳', 100, 122, 50], ['🍜', 150, 142, 24], ['👩', 196, 122, 48]], bubbles=[say_b(196, 34, "Let's start a delivery service!", 150)], cap='One day'),
         scene('restaurant', [['👨‍🍳', 56, 122, 48], ['🍳', 86, 138, 22], ['👩', 150, 122, 46], ['📦', 176, 134, 24], ['🛵', 236, 140, 40], ['🧑', 272, 122, 40]], cap='A month later'),
         scene('restaurant', [['👨‍🍳', 120, 124, 48], ['📦', 170, 142, 22], ['📦', 192, 142, 22], ['📦', 214, 142, 22], ['📦', 181, 122, 22], ['📦', 203, 122, 22], ['👩', 262, 122, 46]],
               bubbles=[think_b(78, 74, '👥➕', 60)], signs=[{'x': 220, 'y': 30, 't': 'ORDERS: 25', 'c': '#46586d'}], cap='One evening')],
        'One day, Mr. Mori was talking with his wife at his restaurant.',
        'how can restaurants get more customers?', ['By selling food to people who cannot come to the restaurant.'], ['in this way が指す内容', 'By ～ing の形で'],
        ["One day, Mr. Mori was talking with his wife at his restaurant. His wife said to him, \"Let's start a delivery service!\" A month later, Mr. Mori was cooking, and his wife was giving food to a delivery worker. One evening, they got too many orders. Mr. Mori was very busy, and he was thinking about hiring more workers."],
        'Do you think it is a good idea to order food from restaurants often?',
        'Yes. → People who are busy can save time. They can spend more time with their families.',
        'No. → Ordering food often costs a lot of money. It is healthier to cook at home.',
        ['delivery services の発音', 'who cannot come… をひとまとまりで', 'traffic accidents をはっきり'],
        'レストランはどうやって客を増やすことができますか。', 'レストランの料理をよく注文するのは良い考えだと思いますか。'),
  EKP2P('School Trips Abroad',
        'Some high schools in Japan take their students on school trips to other countries. Students can visit local schools and talk with students there. They can use English in real situations, and by doing so they can improve their communication skills. However, trips abroad cost a lot of money, so some families find it hard to pay for them.',
        [scene('classroom', [['👧', 90, 126, 44], ['👱‍♀️', 170, 126, 44], ['🗺️', 250, 80, 40]], bubbles=[say_b(170, 34, 'Our school trip to Australia is next month!', 170)], cap='One day'),
         scene('room', [['👧', 100, 124, 44], ['📱', 126, 132, 18], ['🎧', 76, 134, 20], ['👦', 212, 128, 40], ['🎮', 236, 136, 20]], cap='The next week'),
         scene('airport', [['🪟', 150, 42, 60], ['✈️', 150, 40, 30], ['👧', 110, 126, 44], ['🧳', 138, 148, 24], ['👦', 196, 128, 40], ['🧳', 220, 148, 24], ['👩‍🏫', 262, 122, 46]],
               bubbles=[think_b(58, 70, '🏠🛂', 64)], cap='On the day of the trip')],
        'One day, Aya was talking with her friend at school.',
        'how can students improve their communication skills?', ['By using English in real situations.'], ['by doing so の doing so が指す内容', 'By ～ing の形で'],
        ['One day, Aya was talking with her friend at school. Her friend said to her, "Our school trip to Australia is next month!" The next week, Aya was practicing English with her smartphone, and her brother was playing a video game. On the day of the trip, Aya was at the airport with her classmates. She realized that she had left her passport at home.'],
        'Do you think it is important for students to make friends with people from other countries?',
        'Yes. → Students can learn about different cultures. They can also practice speaking English with their friends.',
        'No. → It is more important to make good friends at school. Students can learn about other cultures from books and the Internet.',
        ['communication skills の発音', 'by doing so の前で区切る', 'However, のあとで少し間を'],
        '生徒たちはどうやってコミュニケーション能力を高めることができますか。', '外国の人と友達になることは大切だと思いますか。'),
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
    QYN('Some people say that students should do volunteer work. Do you agree with this opinion?', '学生はボランティア活動をするべきだという意見に賛成ですか。', 'Why?', 'Why not?',
        'Yes. → Students can learn how to help other people. They can also meet people of different ages.',
        'No. → Students are busy with their studies and club activities. Volunteer work should be their own choice.', OPINION, 30),
    QYN('Some people say that a job you enjoy is better than a job that pays well. Do you agree with this opinion?', '給料が良い仕事より楽しめる仕事のほうがよいという意見に賛成ですか。', 'Why?', 'Why not?',
        'Yes. → People spend many hours at work every day. If they enjoy their job, they can work hard for a long time.',
        'No. → People need money to support their families. They can enjoy their hobbies on weekends.', OPINION, 30),
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
  EK2('Face Recognition at Airports',
      'Today, some airports are using face recognition technology. Passengers have their faces scanned instead of showing their passports and tickets many times. Airports can check passengers more quickly, and by doing so they can make waiting times shorter. However, some people worry about how their personal information is used, so airports need to explain how they protect it.',
      [scene('airport', [['👩', 110, 122, 50], ['🧳', 140, 148, 24], ['👦', 186, 128, 42]], bubbles=[say_b(196, 34, 'I want to watch the airplanes from the observation deck!', 170)], cap='One day'),
       scene('airport', [['🪟', 80, 42, 60], ['✈️', 80, 40, 30], ['👦', 80, 128, 42], ['👩', 220, 122, 48], ['🎁', 194, 136, 22]],
             signs=[{'x': 220, 'y': 40, 't': 'SOUVENIRS', 'c': '#a35a1f'}], cap='An hour later'),
       scene('airport', [['🏃‍♀️', 120, 122, 56], ['🏃', 200, 128, 48]], signs=[{'x': 150, 'y': 40, 't': 'GATE 12  LAST CALL'}], cap='A little later')],
      'One day, Mrs. Ito and her son were at the airport.',
      'how can airports make waiting times shorter?', ['By checking passengers more quickly.'], ['by doing so の前を答える', 'By ～ing'],
      ['One day, Mrs. Ito and her son were at the airport. Her son said to her, "I want to watch the airplanes from the observation deck!" An hour later, her son was watching airplanes through the window, and Mrs. Ito was buying souvenirs. A little later, they saw that it was the last call for their flight. They were running to the gate.'],
      ['最初の文から', '2人がそれぞれしていることを説明', 'LAST CALL = 搭乗の最終案内'],
      'Some people say that technology is making people\'s lives less private. What do you think about that?',
      ['I agree. Many apps collect information about where we go and what we buy. Some companies use this information without asking us clearly.',
       'I disagree. People can choose which information they share. Also, there are laws to protect personal information.'],
      '空港はどうやって待ち時間を短くできますか。', 'テクノロジーによって生活のプライバシーが減っているという意見について、どう思いますか。',
      ['face recognition technology をひとまとまりで', 'by doing so の前で区切る', 'personal information の発音']),
  EK2('Reducing Food Waste',
      'In Japan, a large amount of food is thrown away every day. Some restaurants give customers containers for food that they could not finish, and in this way they reduce food waste. Customers can enjoy the rest of their meals at home. However, food can go bad quickly in hot weather, so restaurants need to tell customers to eat it soon.',
      [scene('kitchen', [['👨', 100, 122, 50], ['🌱', 150, 140, 26], ['👩', 196, 122, 50]], bubbles=[say_b(196, 34, "Let's grow vegetables in our garden!", 160)], cap='One day'),
       scene('outdoor', [['🌿', 40, 108, 38], ['🍅', 66, 100, 18], ['🍅', 80, 114, 18], ['👨', 112, 124, 48], ['🧺', 162, 144, 30], ['👩', 212, 122, 48], ['🌿', 262, 108, 38], ['🍅', 252, 98, 18]], cap='A few months later'),
       scene('kitchen', [['👨', 56, 122, 48], ['🍅', 120, 142, 20], ['🍅', 138, 142, 20], ['🍅', 156, 142, 20], ['🍅', 174, 142, 20], ['🍅', 129, 126, 20], ['🍅', 147, 126, 20], ['🍅', 165, 126, 20], ['👩', 244, 122, 48]],
             bubbles=[think_b(204, 50, '🏠🍅', 64)], cap='That evening')],
      'One day, Mr. and Mrs. Yamada were talking in the kitchen.',
      'how do some restaurants reduce food waste?', ['By giving customers containers for food that they could not finish.'], ['in this way の前を答える', 'By ～ing'],
      ['One day, Mr. and Mrs. Yamada were talking in the kitchen. Mrs. Yamada said to her husband, "Let\'s grow vegetables in our garden!" A few months later, Mr. Yamada was picking tomatoes, and Mrs. Yamada was carrying a basket. That evening, they had too many tomatoes. Mrs. Yamada was thinking of giving some of them to their neighbors.'],
      ['最初の文から', '2人がそれぞれしていることを説明', '3コマ目は考えていること(was thinking of ～ing)'],
      'Some people say that people should buy only the food that they need. What do you think about that?',
      ['I agree. If people buy too much food, they often throw some of it away. Planning meals before shopping can also save money.',
       'I disagree. It is useful to keep some extra food at home. For example, people need food when a big disaster happens.'],
      'いくつかのレストランはどうやって食品ロスを減らしていますか。', '必要な分だけ食べ物を買うべきだという意見について、どう思いますか。',
      ['a large amount of をなめらかに', 'and in this way の前で区切る', 'thrown / quickly の発音']),
  EK2('Moving to the Countryside',
      'These days, the number of people living in the countryside is decreasing. Some towns offer cheap houses to young families from big cities. By doing so, they hope to bring more people to their towns. Young families can enjoy a quiet life surrounded by nature. However, there are not many jobs in some towns, so people need to think carefully before moving.',
      [scene('station', [['👨', 100, 124, 48], ['👩', 190, 124, 48]], signs=[{'x': 90, 'y': 70, 't': 'LIVE IN MIDORI TOWN!', 'c': '#2e7d4f'}],
             bubbles=[say_b(214, 30, 'Life in the countryside sounds nice.', 150)], cap='One day'),
       scene('outdoor', [['🏡', 246, 90, 60], ['👨', 76, 124, 48], ['🥬', 116, 146, 22], ['🥬', 138, 146, 22], ['👩', 182, 126, 46], ['🐕', 226, 148, 26]], cap='A few months later'),
       scene('snow', [['❄️', 40, 30, 22], ['❄️', 110, 22, 22], ['❄️', 280, 30, 22], ['🚗', 120, 140, 54], ['👨', 236, 124, 48]],
             bubbles=[think_b(196, 64, '⏰😰', 60)], cap='One winter morning')],
      'One day, Mr. and Mrs. Ueda were at the station.',
      'how do some towns hope to bring more people to their towns?', ['By offering cheap houses to young families from big cities.'], ['By doing so の前の文を答える', 'By ～ing'],
      ['One day, Mr. and Mrs. Ueda were at the station. They saw a poster about living in Midori Town, and Mrs. Ueda said to her husband, "Life in the countryside sounds nice." A few months later, they were living in Midori Town. Mr. Ueda was growing vegetables, and Mrs. Ueda was walking their dog. One winter morning, there was a lot of snow, and Mr. Ueda couldn\'t use his car. He was worried that he would be late for work.'],
      ['最初の文から', 'ポスターの内容も説明できると◎', '3コマ目: 雪で車が使えない'],
      'Some people say that it is better for children to grow up in the countryside. What do you think about that?',
      ['I agree. Children can play outside in nature every day. They can also learn about farming and animals.',
       'I disagree. In big cities, children can visit museums and choose from many different schools. They have more chances to learn new things.'],
      'いくつかの町はどうやって町に人を呼びたいと考えていますか。', '子どもは田舎で育つほうがよいという意見について、どう思いますか。',
      ['countryside / surrounded の発音', 'By doing so, の文をはっきり', 'However, の前で区切る']),
  EK2('Disaster Information',
      'Japan has many natural disasters, such as earthquakes and heavy rain. Some local governments send emergency information to people\'s smartphones. People can quickly learn where they should go, and by doing so they can get to safe places in time. However, some elderly people do not use smartphones, so local governments also need other ways to give information.',
      [scene('room', [['📺', 150, 86, 44], ['🌀', 150, 84, 22], ['👧', 80, 126, 42], ['👨', 230, 122, 50]], bubbles=[say_b(220, 30, 'A big typhoon is coming this weekend.', 150)], cap='One day'),
       scene('shop', [['👧', 90, 126, 42], ['🔦', 114, 120, 20], ['👨', 180, 122, 48], ['🛒', 226, 142, 36], ['💧', 218, 126, 18], ['🥫', 236, 126, 18]], cap='The next day'),
       scene('night', [['🪟', 150, 50, 56], ['🌧️', 150, 48, 26], ['👧', 90, 126, 42], ['🔦', 114, 118, 20], ['🕯️', 186, 136, 26], ['👨', 226, 122, 48]], cap='That night')],
      'One day, Saki was watching TV with her father.',
      'how can people get to safe places in time?', ['By quickly learning where they should go.'], ['by doing so の前を答える', 'By ～ing'],
      ['One day, Saki was watching TV with her father. Her father said to her, "A big typhoon is coming this weekend." The next day, they went shopping. Saki was holding a flashlight, and her father was putting water and canned food into the shopping cart. That night, there was a power outage because of the typhoon. Saki was using a flashlight, and her father was lighting a candle.'],
      ['最初の文から', 'The next day / That night などコマの言葉を使う', '停電 = power outage'],
      'Some people say that schools should have more disaster drills. What do you think about that?',
      ['I agree. Students need to know what to do when an earthquake happens. Practicing many times helps them move quickly and safely.',
       'I disagree. Schools already have drills a few times a year. Students should spend more time on their classes.'],
      '人々はどうやって間に合うように安全な場所へ行くことができますか。', '学校は避難訓練をもっと行うべきだという意見について、どう思いますか。',
      ['natural disasters / emergency の発音', 'by doing so の前で区切る', 'elderly people をはっきり']),
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
    QYN('Today, car companies are developing self-driving cars. Do you think self-driving cars will become common in the future?', '将来、自動運転車は広まると思いますか。', 'Why?', 'Why not?',
        'Yes. → Self-driving cars can help elderly people who cannot drive. They may also reduce traffic accidents.',
        'No. → Many people do not trust machines to drive safely. Also, many roads in Japan are narrow and busy.', SOC, 35),
    QYN('In Japan, many stores are open 24 hours a day. Do you think stores should stay open all night?', 'お店は夜通し営業するべきだと思いますか。', 'Why?', 'Why not?',
        'Yes. → Some people work at night and need to buy things. Stores are also safe places for people who need help at night.',
        'No. → It is hard for stores to find workers for the night. Closing at night can also save electricity.', SOC, 35),
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
def WHO(who, panels):  # the person asked about in No.1 (woman / man / boy / girl)
    panels[0]['who'] = who
    return panels
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
  EKP1('a man who wanted to get more exercise', WHO('man', [
         scene('hospital', [['👨', 100, 124, 48], ['🧑‍⚕️', 200, 122, 50], ['📋', 226, 134, 22]], bubbles=[say_b(210, 34, 'You should get more exercise.', 150)], cap='One day'),
         scene('gym', [['🏋️', 110, 124, 52], ['🧑', 200, 124, 46], ['📋', 224, 134, 20]], cap='The next week'),
         scene('office', [['🕘', 262, 30, 26], ['👨', 100, 124, 48], ['💻', 130, 140, 24], ['📄', 184, 128, 22], ['🧑‍💼', 214, 124, 48]], bubbles=[think_b(70, 50, '🏋️❌', 60)], cap='A few weeks later'),
         scene('street', [['🏢', 270, 70, 54], ['🚴', 110, 126, 50], ['💦', 140, 98, 18], ['👩', 220, 124, 46]], bubbles=[think_b(186, 52, '😲', 44)], cap='Some time later'),
       ]), 'One day, a man was having a health checkup at a hospital.',
       ['One day, a man was having a health checkup at a hospital. The doctor said to him, "You should get more exercise." The man looked worried. The next week, he joined a gym. He was lifting weights, and a trainer was giving him advice. A few weeks later, he was still working at the office late at night. His boss was giving him more documents, and the man was thinking that he couldn\'t go to the gym. Some time later, the man was riding a bicycle to work. He was sweating a lot, and one of his coworkers looked surprised.'],
       ["I'd be thinking, \"Cycling to work is a good way to get exercise without going to the gym. But I should bring a change of clothes.\""],
       'Do you think companies should do more to help their employees stay healthy?',
       ['Yes. Healthy employees can work better and take fewer sick days. For example, companies can give workers time to exercise or offer healthy lunches. As a result, the whole company benefits.'],
       '会社は社員の健康を保つためにもっと取り組むべきだと思いますか。'),
  EKP1('a woman who traveled abroad', WHO('woman', [
         scene('room', [['👩', 100, 124, 48], ['💻', 150, 140, 26], ['👨', 200, 124, 48]], bubbles=[say_b(200, 34, "Let's go to Italy this summer!", 150)], cap='One day'),
         scene('street', [['👨', 30, 126, 44], ['🧳', 52, 148, 22], ['👩', 90, 124, 48], ['📱', 116, 116, 20], ['🧔', 176, 124, 46], ['🚕', 252, 138, 46]], cap='In Italy'),
         scene('restaurant', [['👨', 40, 126, 44], ['👩', 100, 124, 48], ['📱', 126, 118, 20], ['🍝', 160, 148, 22], ['🤵', 226, 122, 50]],
               signs=[{'x': 126, 'y': 86, 't': 'NO SIGNAL', 'c': '#46586d'}], bubbles=[say_b(226, 30, 'Buonasera! Cosa desidera?', 130)], cap='That evening'),
         scene('room', [['📘', 70, 142, 22], ['👩', 110, 124, 48], ['💻', 176, 136, 40]], bubbles=[say_b(110, 40, 'Grazie mille!', 100)], cap='After the trip'),
       ]), 'One day, a woman and her husband were planning their vacation.',
       ['One day, a woman and her husband were planning their vacation. Her husband said to her, "Let\'s go to Italy this summer!" When they arrived in Italy, the woman was using a translation app on her smartphone to talk to a taxi driver, and her husband was carrying their suitcases. That evening, they went to a restaurant. The waiter was speaking Italian, but the woman\'s smartphone had no signal, so she couldn\'t understand him. After the trip, the woman was taking an online Italian lesson at home.'],
       ["I'd be thinking, \"Translation apps are useful, but I can't always depend on them. If I learn some Italian, our next trip will be more enjoyable.\""],
       'Do you think translation technology will make learning foreign languages unnecessary?',
       ["No. Translation apps are getting better, but they cannot fully show the speaker's feelings or culture. Also, people can build closer relationships when they speak the same language."],
       '翻訳技術によって外国語を学ぶ必要はなくなると思いますか。'),
  EKP1('a girl who got her first smartphone', WHO('girl', [
         scene('room', [['👧', 100, 126, 42], ['🎂', 146, 142, 28], ['👩', 190, 122, 48], ['🎁', 214, 136, 22], ['👨', 262, 122, 48]],
               bubbles=[say_b(180, 34, "Happy birthday! Here's your first smartphone.", 170)], cap='One day'),
         scene('night', [['🕐', 250, 36, 28], ['🛏️', 140, 136, 70], ['👧', 130, 118, 36], ['📱', 156, 110, 18]], cap='A month later'),
         scene('classroom', [['👧', 100, 128, 42], ['💤', 126, 98, 20], ['👩‍🏫', 220, 122, 50]], bubbles=[say_b(220, 34, 'Please wake up!', 110)], cap='The next morning'),
         scene('room', [['👨', 60, 122, 48], ['👩', 128, 122, 48], ['🧺', 172, 148, 26], ['📱', 172, 138, 16], ['👧', 226, 126, 42]],
               signs=[{'x': 150, 'y': 40, 't': 'NO PHONES AFTER 9 P.M.', 'c': '#2e5e8c'}], cap='That evening'),
       ]), 'One day, a girl was celebrating her birthday with her parents.',
       ['One day, a girl was celebrating her birthday with her parents. Her mother said to her, "Happy birthday! Here\'s your first smartphone." The girl looked very happy. A month later, she was using her smartphone in bed late at night. It was already one o\'clock. The next morning, she was sleeping during class, and her teacher was telling her to wake up. That evening, her parents were talking to her about rules for using her smartphone. They decided that she would not use it after 9 p.m.'],
       ["I'd be thinking, \"I'm sorry that I used my smartphone so late. My parents are right, so I'll follow the rules from now on.\""],
       'Should parents limit how much time their children spend on smartphones?',
       ['Yes. Children often cannot control how much time they spend on games and videos. If parents set some rules, their children can get enough sleep and focus on their studies.'],
       '親は子どもがスマートフォンを使う時間を制限すべきですか。'),
  EKP1('a man who opened a café in the countryside', WHO('man', [
         scene('office', [['🕘', 270, 24, 24], ['👨', 100, 124, 48], ['💻', 130, 140, 24]], signs=[{'x': 196, 'y': 74, 't': 'NEW LIFE IN THE COUNTRY', 'c': '#2e7d4f'}],
               bubbles=[think_b(60, 50, '☕🌲', 60)], cap='One day'),
         scene('outdoor', [['🏠', 140, 84, 70], ['👨‍🍳', 262, 124, 46]], signs=[{'x': 140, 'y': 30, 't': 'CAFE MIDORI', 'c': '#8a5a2b'}], bubbles=[think_b(224, 52, '😟', 44)], cap='Half a year later'),
         scene('restaurant', [['👨‍🍳', 110, 124, 48], ['📱', 136, 114, 20], ['🍰', 172, 144, 26], ['☕', 198, 144, 22]], cap='A few weeks later'),
         scene('street', [['🏠', 36, 84, 54], ['🧑', 76, 130, 34], ['👩', 102, 130, 34], ['🧑', 128, 130, 34], ['👨‍🍳', 170, 124, 44], ['👵', 222, 124, 44], ['🚗', 254, 160, 32], ['🚙', 286, 160, 28]],
               bubbles=[say_b(214, 30, 'There are too many cars on our street!', 160)], cap='The next month'),
       ]), 'One day, a man was working late at his office in the city.',
       ['One day, a man was working late at his office in the city. He saw a poster about life in the countryside, and he was thinking about opening a café there. Half a year later, he had opened a café in a small town, but there were no customers, and he looked worried. A few weeks later, he was taking pictures of his cakes to post on social media. The next month, many people were waiting in line outside his café. However, their cars were parked on the street, and an elderly woman said to him, "There are too many cars on our street!"'],
       ["I'd be thinking, \"I'm glad that so many customers are coming, but I don't want to cause trouble for my neighbors. I should find a parking lot for my customers.\""],
       'Do you think social media is a good way for small businesses to find customers?',
       ['Yes. Social media is free and can reach many people quickly. For example, a small café can become popular when customers share photos of its food. As a result, it can compete with big companies.'],
       'SNSは小さな店が客を見つける良い方法だと思いますか。'),
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
    Q('Should more people take part in volunteer activities in their local communities?', '地域のボランティア活動にもっと多くの人が参加すべきですか。',
      ['Yes. Local communities have many problems, such as caring for elderly people. If more people volunteer, they can solve these problems together and build stronger relationships.'], P1S),
    Q('Do you think Japan should make more efforts to produce its own food?', '日本は自国での食料生産にもっと力を入れるべきだと思いますか。',
      ['Yes. Japan imports much of its food, so prices can rise when there are problems in other countries. Supporting local farmers would make the food supply more stable.'], P1S),
    Q('Is it important for people to keep learning after they start working?', '働き始めてからも学び続けることは大切ですか。',
      ['Yes. Technology changes quickly, so the skills people learn at school can soon become out of date. By taking courses, workers can keep up with changes and find better jobs.'], P1S),
    Q('Should cities do more to reduce the number of cars on their roads?', '都市は道路を走る車を減らすためにもっと取り組むべきですか。',
      ['Yes. Cars cause traffic jams and air pollution. If cities improve public transportation and build more bike lanes, people will not need to drive as much.'], P1S),
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
  EK1([
      {'t': 'Should more university classes in Japan be taught in English?',
       'outline': ['立場: Yes', '理由1: 国際的に活躍できる人材を育てられる', '理由2: 海外からの留学生や研究者を呼びやすくなる', 'まとめ: 内容の理解を助けるサポートも必要'],
       'qs': ["Wouldn't students understand difficult subjects better in Japanese?", 'Should English be taught from a younger age in Japan?']},
      {'t': 'Is globalization a threat to local cultures?',
       'outline': ['立場: No(脅威だけではない)', '理由1: 海外からの関心が伝統文化を守る力になる(観光・ファン)', '理由2: ただし大きなチェーン店などで町の個性が失われることもある', 'まとめ: 地域が自分たちの文化の価値を発信することが大切'],
       'qs': ['Can you give an example of a local tradition that is disappearing?', 'Should governments protect traditional industries from foreign competition?']},
      {'t': 'Should companies have a fixed retirement age?',
       'outline': ['立場: No', '理由1: 年齢ではなく能力と健康で判断すべき', '理由2: 人手不足の中、経験のある人の力が必要', 'まとめ: 働き方を選べる柔軟な制度が良い'],
       'qs': ["How can companies make use of older workers' experience?", 'Would older people continuing to work reduce opportunities for young people?']},
      {'t': 'Will artificial intelligence create more jobs than it destroys?',
       'outline': ['立場: 長い目で見ればYes', '理由1: 産業革命のように、新しい技術は新しい仕事を生んできた', '理由2: ただし変化の間に仕事を失う人を支える必要がある', 'まとめ: 学び直し(リスキリング)の支援がカギ'],
       'qs': ['What kinds of jobs do you think are most at risk from AI?', 'Who should pay for retraining workers who lose their jobs?']},
      {'t': 'Should more be done to protect endangered species?',
       'outline': ['立場: Yes', '理由1: 生態系のバランスが崩れると、食料や薬など人間の生活にも影響する', '理由2: 一度絶滅した種は二度と戻らない', 'まとめ: 生息地の保護と国際協力が必要'],
       'qs': ['Are zoos an effective way to protect endangered animals?', 'Should economic development ever come before protecting nature?']},
  ]),
  EK1([
      {'t': 'Is a four-day workweek realistic for Japan?',
       'outline': ['立場: 一部の業界ではYes', '理由1: 休みが増えると集中力と生産性が上がるという試みの結果がある', '理由2: しかし医療やサービス業などは人手不足で難しい', 'まとめ: 業界ごとに柔軟に取り入れるべき'],
       'qs': ['Do Japanese people work too much?', 'How would a shorter workweek affect small businesses?']},
      {'t': 'Should advertising aimed at children be restricted?',
       'outline': ['立場: Yes', '理由1: 子どもは広告と情報の区別がつきにくい', '理由2: お菓子やゲームの課金の広告が、健康やお金の問題につながる', 'まとめ: 親と学校がメディアの見方を教えることも大切'],
       'qs': ['Who is mainly responsible for what children watch: parents or companies?', 'Are online influencers a bad influence on young viewers?']},
      {'t': 'Are international sporting events worth the cost of hosting them?',
       'outline': ['立場: 条件付きでYes', '理由1: 観光客が増え、国の魅力を世界に発信できる', '理由2: しかし大会後に使われない施設が残るなど、費用の問題がある', 'まとめ: 今ある施設を使うなど、費用を抑える工夫が必要'],
       'qs': ['What should happen to stadiums after the event is over?', 'Do sporting events help improve relations between countries?']},
      {'t': 'Should the number of tourists be limited at popular destinations?',
       'outline': ['立場: Yes', '理由1: 混雑やごみで住民の生活が苦しくなる(オーバーツーリズム)', '理由2: 自然や文化財が傷つくのを防げる', 'まとめ: 予約制や入場料で、量より質の観光へ'],
       'qs': ['Should foreign tourists pay higher prices than local people at tourist sites?', 'How can tourists be encouraged to visit less famous places?']},
      {'t': 'Is it important to preserve traditional crafts in modern society?',
       'outline': ['立場: Yes', '理由1: 地域の歴史や技術を次の世代に伝えられる', '理由2: 手作りの良さは海外でも評価され、地域経済の力になる', 'まとめ: 若い職人を育てる支援と、新しいデザインとの組み合わせ'],
       'qs': ['Why do you think fewer young people become craftspeople?', 'Can modern technology help traditional crafts survive?']},
  ]),
  EK1([
      {'t': 'Should high-speed trains replace short-distance flights?',
       'outline': ['立場: 一部の路線ではYes', '理由1: 鉄道は飛行機よりCO2の排出が少ない', '理由2: 街の中心の駅から乗れるので、合計の移動時間が短いこともある', 'まとめ: 島や遠い地域には飛行機が必要なので、使い分けが大切'],
       'qs': ['Which do you prefer for long trips in Japan, trains or planes?', 'How do you think air travel will change in the next twenty years?']},
      {'t': 'Should people have the right to have their personal information removed from the Internet?',
       'outline': ['立場: Yes', '理由1: 昔の失敗や個人情報がずっと残ると、仕事や生活に影響する', '理由2: プライバシーは大切な権利', 'まとめ: ただし公共の利益(政治家の記録など)とのバランスが必要'],
       'qs': ['Do people share too much about themselves on social media?', 'Should search engine companies decide what information to remove?']},
      {'t': 'Should Japan invest more in renewable energy?',
       'outline': ['立場: Yes', '理由1: 輸入に頼る燃料が減り、エネルギーが安定する', '理由2: 温室効果ガスを減らせる', 'まとめ: 天気に左右される弱点は、電気をためる技術で補う'],
       'qs': ['What kind of renewable energy is most suitable for Japan?', 'Should people pay more for electricity to support clean energy?']},
      {'t': 'Is it acceptable to use animals in scientific research?',
       'outline': ['立場: 厳しい条件付きでYes', '理由1: 新しい薬やワクチンの安全性の確認に役立ってきた', '理由2: ただし動物の苦痛を最小限にする責任がある', 'まとめ: コンピューターや培養細胞など、代わりの方法の開発を進める'],
       'qs': ['Should cosmetics companies be allowed to test products on animals?', 'Do you think technology can completely replace animal testing?']},
      {'t': 'Should computer programming be a required subject in elementary schools?',
       'outline': ['立場: Yes', '理由1: 筋道を立てて考える力が身につく', '理由2: これからの社会でデジタルの知識は欠かせない', 'まとめ: 先生の研修と、ほかの教科とのバランスが必要'],
       'qs': ['Are there enough teachers who can teach programming?', 'Do children spend too much time using computers and tablets?']},
  ]),
  EK1([
      {'t': 'Is a university degree necessary for success today?',
       'outline': ['立場: No(必ずしも必要ではない)', '理由1: オンライン講座や仕事の経験で専門的なスキルを身につけられる', '理由2: ただし医師やパイロットのように専門の教育や資格が必要な仕事もある', 'まとめ: 目標に合わせて学び方を選ぶことが大切'],
       'qs': ['Should companies stop caring about which university applicants went to?', 'Is university education too expensive in Japan?']},
      {'t': 'Should cities spend more money on public spaces such as parks?',
       'outline': ['立場: Yes', '理由1: 運動や休息の場になり、住民の健康に良い', '理由2: 地域の人どうしの交流が生まれる', 'まとめ: 災害のときの避難場所としても役立つ'],
       'qs': ['How can parks be made more useful for elderly people?', 'Should some parks be used for housing in crowded cities?']},
      {'t': 'Will remote work change where people choose to live?',
       'outline': ['立場: Yes', '理由1: 毎日通勤しなくてよいので、家賃の安い地方に住める', '理由2: 地方の人口が増え、地域の経済が元気になる可能性がある', 'まとめ: ただし通信環境や仕事の種類によって差がある'],
       'qs': ['What are the disadvantages of working from home?', 'Should companies let employees choose where they work?']},
      {'t': 'Should genetically modified foods be more widely accepted?',
       'outline': ['立場: 安全の確認を条件にYes', '理由1: 病気や乾燥に強い作物で、食料不足を減らせる', '理由2: 農薬の使用を減らせる場合もある', 'まとめ: 表示をわかりやすくして、消費者が選べるようにする'],
       'qs': ['Why do you think many consumers are worried about genetically modified foods?', 'How can the world solve the problem of food shortages?']},
      {'t': 'Is international cooperation the key to solving global health problems?',
       'outline': ['立場: Yes', '理由1: 感染症は国境をこえて広がるので、一つの国だけでは防げない', '理由2: 技術やワクチンを分け合うと、世界全体が安全になる', 'まとめ: 国際機関を通じた情報の共有と資金の協力が必要'],
       'qs': ['Should rich countries do more to help poorer countries improve their health care?', 'What lessons did the world learn from the COVID-19 pandemic?']},
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
