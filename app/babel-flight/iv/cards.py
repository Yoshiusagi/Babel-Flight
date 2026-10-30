"""英検 二次試験 (面接) practice cards, 3級〜1級. Original content; the flow, timing and question types
follow the real interview (2024 renewal onward). Built into public/iv/<key>.json by build.py.

Pictures are drawn by the page from emoji: a scene is a 300x180 box with a background (bg) and items
[emoji, x, y, size]; bubbles are speech ('say', text) or thought ('think', emoji / text) bubbles."""

def S(t): return {'k': 'say', 't': t}
def A(i, sec): return {'k': 'ans', 'id': i, 'sec': sec}
def YN(i, sec, yes, no, fsec): return {'k': 'yn', 'id': i, 'sec': sec, 'follow': {'yes': yes, 'no': no}, 'fsec': fsec}
CARD = {'k': 'card'}
HIDE = {'k': 'hide'}
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

GREET = lambda grade: [
    S("Hello. My name is Ms. Brown. May I have your name, please?"), A('name', 8),
    S("Thank you. This is the Grade %s test. OK? How are you today?" % grade), A('how', 6),
    S("Let's start the test. Here is your card."), CARD,
]
END = [S("This is the end of the test. Could I have the card back, please?"), HIDE, S("Thank you. You may go now."), {'k': 'end'}]

CARDS = {}

# ---------------------------------------------------------------- 3級
CARDS['ek3'] = {
  'grade': '3級', 'tier': 1, 'minutes': 5,
  'card': {
    'title': 'Airports',
    'passage': 'Many people go to airports to travel. Some airports have nice shops and restaurants, so people also enjoy shopping and eating there. Children like watching airplanes from the windows.',
    'pic': scene('airport', [['🪟', 150, 40, 70], ['✈️', 150, 38, 34], ['🧑', 38, 124, 48], ['🧳', 76, 152, 24], ['🧳', 102, 152, 24],
                             ['👩', 150, 124, 48], ['📷', 176, 112, 22], ['👦', 220, 130, 42], ['🍦', 242, 120, 18], ['🧳', 280, 152, 24]]),
  },
}
CARDS['ek3']['steps'] = GREET('3') + [
    S("First, please read the passage silently for 20 seconds."), PREP(20, '黙読'),
    S("All right. Now, please read it aloud."), READ(30),
    S("Now, I'll ask you five questions."),
    S("Number 1. Please look at the passage. Why do people also enjoy shopping and eating at some airports?"), A('q1', 15),
    S("Number 2. Please look at the picture. How many suitcases are there?"), A('q2', 12),
    S("Number 3. Please look at the woman. What is she doing?"), A('q3', 12),
    S("Now, please turn the card over."), HIDE,
    S("Number 4. What do you usually do on weekends?"), A('q4', 15),
    S("Number 5. Do you like to travel?"), YN('q5', 8, "Please tell me more.", "What do you want to do this summer?", 15),
] + END
CARDS['ek3']['items'] = {
  'read': {'no': '音読', 'pts': 5, 'points': ['タイトルから読む', '意味のまとまりで区切る(…restaurants, / so people…)', 'airports / restaurants / airplanes の発音']},
  'q1': {'no': 'No.1', 'pts': 5, 'q': 'Why do people also enjoy shopping and eating at some airports?', 'ja': 'なぜ、いくつかの空港では買い物や食事も楽しめるのですか。',
         'model': ['Because they have nice shops and restaurants.'],
         'points': ['so の前の部分が答え', 'Some airports を they に置きかえる', 'Because で始める']},
  'q2': {'no': 'No.2', 'pts': 5, 'q': 'How many suitcases are there?', 'ja': 'スーツケースはいくつありますか。',
         'model': ['There are three.', 'There are three suitcases.'], 'points': ['There are ～. で答える', '数を正しく']},
  'q3': {'no': 'No.3', 'pts': 5, 'q': 'What is she doing?', 'ja': '女性は何をしていますか。',
         'model': ['She is taking a picture.', "She's taking a photo."], 'points': ['She is ～ing. の形', 'take a picture']},
  'q4': {'no': 'No.4', 'pts': 5, 'q': 'What do you usually do on weekends?', 'ja': 'ふだん週末に何をしますか。',
         'model': ['I usually play soccer with my friends.', 'I usually study English at home.'], 'points': ['I usually ～. で答える', '主語と動詞のある文で']},
  'q5': {'no': 'No.5', 'pts': 5, 'q': 'Do you like to travel?', 'ja': '旅行は好きですか。',
         'model': {'yes': 'Yes. → I like to visit new places. I went to Kyoto with my family last year.',
                   'no': 'No. → I want to go camping with my friends.'},
         'points': ['まず Yes / No', '2つ目の質問にも1文以上で']},
}

# ---------------------------------------------------------------- 準2級
CARDS['ekp2'] = {
  'grade': '準2級', 'tier': 1, 'minutes': 6,
  'card': {
    'title': 'Lessons for Travelers',
    'passage': 'Many people enjoy traveling to other countries. However, they sometimes worry about speaking foreign languages. Now, some companies offer short online lessons for travelers. Travelers take such lessons before their trips, and by doing so they can learn useful phrases for airports and hotels quickly.',
    'picA': scene('park', [['🌳', 28, 52, 44], ['🌳', 272, 50, 40], ['🧔', 30, 132, 40], ['📰', 52, 126, 22], ['👧', 92, 136, 36], ['🧃', 109, 128, 17],
                           ['👩', 150, 130, 40], ['📦', 172, 124, 22], ['🚴', 214, 134, 40], ['👨', 260, 132, 38], ['📱', 279, 122, 16]]),
    'picB': scene('outdoor', [['🗻', 210, 70, 70], ['☁️', 200, 66, 54], ['☁️', 232, 74, 46], ['👩', 90, 130, 56], ['📷', 122, 118, 26]],
                  bubbles=[think_b(60, 46, '🗻📷')]),
  },
  'steps': GREET('Pre-2') + [
    S("First, please read the passage silently for 20 seconds."), PREP(20, '黙読'),
    S("All right. Now, please read it aloud."), READ(45),
    S("Now, I'll ask you five questions."),
    S("Number 1. According to the passage, how can travelers learn useful phrases for airports and hotels quickly?"), A('q1', 18),
    S("Number 2. Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing."), A('q2', 40),
    S("Number 3. Now, look at the woman in Picture B. Please describe the situation."), A('q3', 25),
    S("Now, please turn over the card and put it down."), HIDE,
    S("Number 4. Do you think more people will take online lessons in the future?"), YN('q4', 8, "Why?", "Why not?", 30),
    S("Number 5. These days, many people enjoy camping. Do you like to go camping?"), YN('q5', 8, "Please tell me more.", "Why not?", 25),
] + END,
}
CARDS['ekp2']['items'] = {
  'read': {'no': '音読', 'pts': 5, 'points': ['タイトルから読む', 'However, / Now, のあとで少し区切る', 'by doing so を自然につなげる']},
  'q1': {'no': 'No.1', 'pts': 5, 'q': 'According to the passage, how can travelers learn useful phrases for airports and hotels quickly?', 'ja': '旅行者は、どうすれば空港やホテルで役立つ表現を早く学べますか。',
         'model': ['By taking such lessons before their trips.', 'They take short online lessons before their trips.'],
         'points': ['by doing so の doing so が指す内容を答える', 'such lessons → short online lessons と言いかえてもOK']},
  'q2': {'no': 'No.2', 'pts': 5, 'q': 'Tell me as much as you can about what they are doing.', 'ja': '(イラストA)人々がしていることを、できるだけたくさん説明してください。',
         'model': ['A man is reading a newspaper. A girl is drinking juice. A woman is carrying a box. A boy is riding a bicycle. A man is talking on the phone.'],
         'points': ['5人分を現在進行形で', '1人につき1文', 'carry a box / ride a bicycle / talk on the phone']},
  'q3': {'no': 'No.3', 'pts': 5, 'q': 'Please describe the situation.', 'ja': '(イラストB)女性の状況を説明してください。',
         'model': ["She wants to take a picture of the mountain, but she can't because it's cloudy."],
         'points': ['吹き出しの「したいこと」+ できない理由', 'wants to ～, but she can\'t because ～']},
  'q4': {'no': 'No.4', 'pts': 5, 'q': 'Do you think more people will take online lessons in the future?', 'ja': '将来、オンラインレッスンを受ける人は増えると思いますか。',
         'model': {'yes': 'Yes. → People can take lessons at home. They don\'t need to go to a school, so it saves time.',
                   'no': 'No. → Many people want to talk with teachers face to face. They can learn better in a classroom.'},
         'points': ['Yes / No をはっきり', '理由を2文で']},
  'q5': {'no': 'No.5', 'pts': 5, 'q': 'Do you like to go camping?', 'ja': 'キャンプに行くのは好きですか。',
         'model': {'yes': 'Yes. → I like cooking outside with my family. Last summer, we went camping near a lake.',
                   'no': 'No. → I don\'t like insects. I prefer staying in a hotel.'},
         'points': ['Yes なら具体的な経験を', 'No なら理由を']},
}

# ---------------------------------------------------------------- 準2級プラス
NARR3_P2P = [
  scene('room', [['🛋️', 150, 140, 60], ['👧', 110, 120, 46], ['👩', 190, 118, 50]], bubbles=[say_b(150, 34, "Let's make a cake for Dad's birthday!", 150)], cap='One day'),
  scene('shop', [['🛒', 90, 140, 40], ['👧', 70, 118, 44], ['🍓', 100, 110, 22], ['👩', 170, 118, 48], ['📝', 196, 108, 24]], cap='At the supermarket'),
  scene('kitchen', [['👧', 80, 122, 44], ['👩', 150, 120, 48], ['🍰', 118, 152, 20]], bubbles=[think_b(225, 46, '🥚❌')], cap='At home'),
]
CARDS['ekp2p'] = {
  'grade': '準2級プラス', 'tier': 2, 'minutes': 7,
  'card': {
    'title': 'Self-Service Checkouts',
    'passage': 'Many supermarkets have introduced self-service checkouts. Customers scan the products they buy and pay by themselves. Supermarkets can reduce the number of workers needed at checkouts, and in this way they can save money. However, some older customers find these machines difficult to use, so staff members are still needed to help them.',
    'panels': NARR3_P2P,
    'start': 'One day, Yuki was talking with her mother in the living room.',
  },
  'steps': GREET('Pre-2 Plus') + [
    S("First, please read the passage silently for 20 seconds."), PREP(20, '黙読'),
    S("All right. Now, please read it aloud."), READ(50),
    S("Now, I'll ask you four questions."),
    S("Number 1. According to the passage, how can supermarkets save money?"), A('q1', 20),
    S("Number 2. Now, please look at the pictures and describe the situation. You have 20 seconds to prepare. Your story should begin with the sentence on the card."), PREP(20, '準備'),
    S("Please begin."), A('q2', 60),
    S("Now, please turn over the card and put it down."), HIDE,
    S("Number 3. Do you think it is a good idea for stores to use more machines instead of workers?"), YN('q3', 8, "Why?", "Why not?", 30),
    S("Number 4. Some people say that students should learn about money at school. Do you agree with this opinion?"), YN('q4', 8, "Why?", "Why not?", 30),
] + END,
}
CARDS['ekp2p']['items'] = {
  'read': {'no': '音読', 'pts': 5, 'points': ['self-service checkouts をはっきり', 'and in this way の前で区切る', '長い文はまとまりごとに']},
  'q1': {'no': 'No.1', 'pts': 5, 'q': 'According to the passage, how can supermarkets save money?', 'ja': 'スーパーはどうやってお金を節約できますか。',
         'model': ['By reducing the number of workers needed at checkouts.'],
         'points': ['in this way が指す内容', 'By ～ing の形で']},
  'q2': {'no': 'No.2', 'pts': 5, 'q': 'Please describe the situation. (3コマ)', 'ja': '3コマのイラストの話を、カードの最初の文から説明してください。',
         'model': ["One day, Yuki was talking with her mother in the living room. Her mother said to her, \"Let's make a cake for Dad's birthday!\" At the supermarket, Yuki was putting strawberries into the shopping cart, and her mother was looking at a shopping list. When they got home, they realized that they had forgotten to buy eggs."],
         'points': ['最初の文から始める', '過去形・過去進行形で', 'コマの間の言葉(At the supermarket / At home)を使う', '吹き出しのセリフは said to ～, "…"']},
  'q3': {'no': 'No.3', 'pts': 5, 'q': 'Do you think it is a good idea for stores to use more machines instead of workers?', 'ja': '店が店員の代わりに機械をもっと使うのは良い考えだと思いますか。',
         'model': {'yes': 'Yes. → Machines can work for many hours without a break. Stores can keep their prices low.',
                   'no': 'No. → Some people cannot use machines well. They need workers to help them.'},
         'points': ['Yes / No + 理由2文', '具体的な人や場面を入れる']},
  'q4': {'no': 'No.4', 'pts': 5, 'q': 'Some people say that students should learn about money at school. Do you agree with this opinion?', 'ja': '学校でお金について学ぶべきだという意見に賛成ですか。',
         'model': {'yes': 'Yes. → Young people will need to manage their own money in the future. It is important to learn how to save money early.',
                   'no': 'No. → Students can learn about money from their families. Schools should spend more time on other subjects.'},
         'points': ['Yes / No + 理由2文', 'I think ～ / For example, ～ を使ってもOK']},
}

# ---------------------------------------------------------------- 2級
NARR3_G2 = [
  scene('room', [['👨', 100, 122, 50], ['👩', 190, 122, 50], ['📖', 145, 140, 26]], bubbles=[say_b(150, 34, "Let's go to Okinawa this summer!", 150)], cap='One day'),
  scene('room', [['👨', 70, 122, 48], ['💻', 100, 138, 26], ['👩', 200, 122, 48], ['🧳', 236, 140, 32]], cap='A week later'),
  scene('airport', [['🪟', 150, 42, 60], ['🌀', 150, 40, 34], ['👨', 100, 124, 48], ['👩', 190, 124, 48]], bubbles=[think_b(250, 70, '😢', 52)], signs=[{'x': 150, 'y': 92, 't': 'CANCELED'}], cap='On the day of the trip'),
]
CARDS['ek2'] = {
  'grade': '2級', 'tier': 2, 'minutes': 7,
  'card': {
    'title': 'Drones for Deliveries',
    'passage': 'Today, some companies are testing drones to deliver goods. Drones can fly over roads and rivers, and in this way they can reach places that are hard to get to by car. Companies hope that drones will help people living in mountain areas. However, drones can be affected by bad weather, so companies need to make sure they can fly safely.',
    'panels': NARR3_G2,
    'start': 'One day, Mr. and Mrs. Sato were talking about their summer vacation.',
  },
  'steps': GREET('2') + [
    S("First, please read the passage silently for 20 seconds."), PREP(20, '黙読'),
    S("All right. Now, please read it aloud."), READ(50),
    S("Now, I'll ask you four questions."),
    S("Number 1. According to the passage, how can drones reach places that are hard to get to by car?"), A('q1', 20),
    S("Number 2. Now, please look at the pictures and describe the situation. You have 20 seconds to prepare. Your story should begin with the sentence on the card."), PREP(20, '準備'),
    S("Please begin."), A('q2', 60),
    S("Now, please turn over the card and put it down."), HIDE,
    S("Number 3. Some people say that families should spend more time together. What do you think about that?"), A('q3', 35),
    S("Number 4. Today, many people buy things on the Internet. Do you think online shopping will become more popular in the future?"), YN('q4', 8, "Why?", "Why not?", 35),
] + END,
}
CARDS['ek2']['items'] = {
  'read': {'no': '音読', 'pts': 5, 'points': ['Drones / Deliveries の発音', 'and in this way / However, の前で区切る', '内容のまとまりを意識して']},
  'q1': {'no': 'No.1', 'pts': 5, 'q': 'According to the passage, how can drones reach places that are hard to get to by car?', 'ja': 'ドローンはどうやって車で行きにくい場所に届くことができますか。',
         'model': ['By flying over roads and rivers.'], 'points': ['in this way の前を答える', 'By ～ing']},
  'q2': {'no': 'No.2', 'pts': 5, 'q': 'Please describe the situation. (3コマ)', 'ja': '3コマのイラストの話を、カードの最初の文から説明してください。',
         'model': ["One day, Mr. and Mrs. Sato were talking about their summer vacation. Mrs. Sato said to her husband, \"Let's go to Okinawa this summer!\" A week later, Mr. Sato was booking plane tickets on his computer, and Mrs. Sato was packing a suitcase. On the day of the trip, they were at the airport. They found out that their flight had been canceled because of a typhoon."],
         'points': ['最初の文から', '2人がそれぞれしていることを説明', '過去完了(had been canceled)も使えると◎']},
  'q3': {'no': 'No.3', 'pts': 5, 'q': 'Some people say that families should spend more time together. What do you think about that?', 'ja': '家族はもっと一緒に過ごすべきだという意見について、どう思いますか。',
         'model': ['I agree. Spending time together helps family members understand each other. For example, they can talk about their problems during dinner.',
                   'I disagree. Many people are busy with work and school. It is more important for families to enjoy the time they have together.'],
         'points': ['I agree / I disagree で立場を', '理由 + 例(For example, ～)']},
  'q4': {'no': 'No.4', 'pts': 5, 'q': 'Do you think online shopping will become more popular in the future?', 'ja': '将来、ネットショッピングはもっと広まると思いますか。',
         'model': {'yes': 'Yes. → It is convenient because people can buy things at any time. Also, delivery services are getting faster.',
                   'no': 'No. → Many people want to see products before they buy them. They also enjoy shopping with their friends at stores.'},
         'points': ['Yes / No + 理由2文', '社会全体の視点で']},
}

# ---------------------------------------------------------------- 準1級
NARR4_P1 = [
  scene('office', [['🧑‍💼', 80, 124, 48], ['👩', 150, 124, 48], ['🧑', 220, 124, 44]], bubbles=[say_b(150, 34, 'Starting next month, you can work from home.', 170)], cap='One day'),
  scene('room', [['👩', 120, 122, 48], ['💻', 150, 140, 26], ['🐕', 210, 140, 34], ['☕', 172, 136, 20]], cap='A month later'),
  scene('room', [['👩', 120, 122, 48], ['💻', 150, 140, 26], ['🏗️', 250, 110, 44], ['🔊', 216, 92, 24]], bubbles=[think_b(70, 40, '😣')], cap='A few weeks later'),
  scene('office', [['👩', 110, 124, 48], ['🧑‍💼', 190, 124, 48], ['💻', 140, 140, 24]], cap='The next week'),
]
CARDS['ekp1'] = {
  'grade': '準1級', 'tier': 2, 'minutes': 8,
  'card': {'title': 'You have one minute to prepare.', 'panels': NARR4_P1, 'start': 'One day, a woman was talking with her coworkers in the office.'},
  'steps': [
    S("Hello. My name is Ms. Brown. May I have your name, please?"), A('name', 8),
    S("Thank you. This is the Grade Pre-1 test. First, please tell me about yourself."), A('free1', 25),
    S("I see. What do you like to do in your free time?"), A('free2', 25),
    S("Thank you. Now, let's start the test. Here is your card."), CARD,
    S("You have one minute to prepare. This is a story about a woman who started working from home. Your story should begin with the sentence on the card."), PREP(60, '準備'),
    S("All right. Please begin your narration. You have two minutes."), A('narr', 120),
    S("Now, I'll ask you four questions."),
    S("Number 1. Please look at the fourth picture. If you were the woman, what would you be thinking?"), A('q1', 35),
    S("Now, please turn over the card and put it down."), HIDE,
    S("Number 2. Do you think companies should allow more employees to work from home?"), A('q2', 40),
    S("Number 3. Should the government do more to support small businesses in rural areas?"), A('q3', 40),
    S("Number 4. These days, many people read the news on their smartphones. Do you think people trust the news less than they did in the past?"), A('q4', 40),
  ] + END,
}
CARDS['ekp1']['items'] = {
  'free1': {'no': '自由会話', 'pts': 0, 'q': 'Please tell me about yourself.', 'ja': '自己紹介をしてください。', 'model': ["I'm a high school student. I'm interested in airplanes, and I want to become an airline pilot in the future."], 'points': ['2〜3文で']},
  'free2': {'no': '自由会話', 'pts': 0, 'q': 'What do you like to do in your free time?', 'ja': '自由な時間に何をするのが好きですか。', 'model': ['I like riding my bike. On weekends, I often ride to the airport to watch planes.'], 'points': ['理由や具体例を一言']},
  'narr': {'no': 'ナレーション', 'pts': 15, 'q': 'Narration (4コマ)', 'ja': '4コマのイラストの話を、カードの最初の文から2分で説明してください。',
           'model': ["One day, a woman was talking with her coworkers in the office. Her boss said to them, \"Starting next month, you can work from home.\" The woman looked happy to hear this. A month later, she was working on her computer at home. She was drinking coffee, and her dog was sitting next to her. A few weeks later, there was construction work near her house. It was very noisy, and she couldn't concentrate on her work. The next week, she was working at the office again, and she was talking with her boss."],
           'points': ['4コマすべて + コマ間の言葉(A month later など)', '過去形・過去進行形', '吹き出しのセリフ・表情も説明', '1分の準備で各コマ1〜2文を決める']},
  'q1': {'no': 'No.1', 'pts': 5, 'q': 'If you were the woman, what would you be thinking?', 'ja': 'あなたがこの女性だったら、何を考えているでしょうか。',
         'model': ["I'd be thinking, \"Working from home was comfortable, but it's easier to concentrate at the office. Maybe I should come to the office on some days.\""],
         'points': ["I'd be thinking, \"…\" の形", '4コマ目の状況に合わせる']},
  'q2': {'no': 'No.2', 'pts': 5, 'q': 'Do you think companies should allow more employees to work from home?', 'ja': '会社はもっと多くの社員に在宅勤務を認めるべきだと思いますか。',
         'model': ["Yes. Employees can save time because they don't have to commute. As a result, they may have more energy for their work and their families."], 'points': ['意見 + 理由 + 結果(As a result)']},
  'q3': {'no': 'No.3', 'pts': 5, 'q': 'Should the government do more to support small businesses in rural areas?', 'ja': '政府は地方の小さな会社をもっと支援すべきですか。',
         'model': ['Yes. Small businesses create jobs for local people. If they close, young people will move to big cities, and rural areas will become even smaller.'], 'points': ['社会全体への影響を']},
  'q4': {'no': 'No.4', 'pts': 5, 'q': 'Do you think people trust the news less than they did in the past?', 'ja': '人々は昔よりニュースを信頼しなくなったと思いますか。',
         'model': ["Yes. There is a lot of false information on the Internet. It is sometimes hard for people to tell which news is true."], 'points': ['前置きの文(These days, …)を受けて答える']},
}

# ---------------------------------------------------------------- 1級
CARDS['ek1'] = {
  'grade': '1級', 'tier': 2, 'minutes': 10,
  'card': {
    'title': 'Choose one topic.',
    'topics': [
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
    ],
  },
  'steps': [
    S("Hello. My name is Ms. Brown. May I have your name, please?"), A('name', 8),
    S("Thank you. This is the Grade 1 test. First, please tell me a little about yourself."), A('free1', 30),
    S("Thank you. What are you interested in these days?"), A('free2', 30),
    S("All right. Here is your topic card. You have one minute to choose one topic and prepare your speech. You can't take notes."), CARD, {'k': 'topics', 'sec': 60},
    S("All right. Please begin your speech. You have two minutes."), A('speech', 120),
    {'k': 'tq', 'n': 0, 'sec': 45}, {'k': 'tq', 'n': 1, 'sec': 45},
    S("Thank you. That is the end of the question period."), HIDE,
    S("This is the end of the test. Thank you. You may go now."), {'k': 'end'},
  ],
}
CARDS['ek1']['items'] = {
  'free1': {'no': '自由会話', 'pts': 0, 'q': 'Please tell me a little about yourself.', 'ja': '少し自己紹介をしてください。', 'model': ["I'm a student, and I'm interested in aviation. I'm studying English because I want to work as an international pilot."], 'points': ['落ち着いて2〜3文']},
  'free2': {'no': '自由会話', 'pts': 0, 'q': 'What are you interested in these days?', 'ja': '最近、何に興味がありますか。', 'model': ["Recently, I've been interested in new airplane technology, such as planes that use cleaner fuel."], 'points': ['具体的に']},
  'speech': {'no': 'スピーチ', 'pts': 10, 'q': 'Speech (2 minutes)', 'ja': '選んだトピックについて2分でスピーチ。', 'model': [], 'points': ['最初に立場をはっきり', '理由を2つ、それぞれ例つきで', '最後にまとめ', '2分を使い切る(時間をこえると止められる)']},
  'tq0': {'no': '質疑応答1', 'pts': 10, 'q': '(トピックについての質問)', 'ja': 'スピーチについての質問', 'model': [], 'points': ['質問に直接答えてから理由', '会話を続ける姿勢']},
  'tq1': {'no': '質疑応答2', 'pts': 0, 'q': '(トピックについての質問)', 'ja': 'スピーチについての質問', 'model': [], 'points': ['反対の意見にも触れられると◎']},
  'gv': {'no': '文法・語彙', 'pts': 10, 'q': '(全体)', 'ja': 'スピーチと質疑応答を通して', 'model': [], 'points': ['同じ語のくり返しを避ける', '時制・単数複数のミスが少ない']},
  'pf': {'no': '発音・流ちょうさ', 'pts': 10, 'q': '(全体)', 'ja': 'スピーチと質疑応答を通して', 'model': [], 'points': ['聞き取りやすい速さと区切り', '長い沈黙を作らない']},
}
