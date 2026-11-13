"""IELTS Speaking and TOEFL iBT Speaking (2026 format) practice sets. Original questions; the order, timing and
kinds of questions follow the real tests. Built into public/iv/<key>.json by build.py (with cards.py).

IELTS (11-14 min, examiner face to face): Part 1 = name / what to call you / where you're from / ID, then three
topics about yourself (the first one is studies or home); Part 2 = a cue card, 1 minute to prepare with notes,
1-2 minutes of talk, a short rounding-off question; Part 3 = two themes from the Part 2 topic, more abstract.
Marked on Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation (bands 0-9).

TOEFL iBT Speaking (from January 2026, about 8 minutes, no preparation): Listen and Repeat = 7 sentences in one
situation, getting longer; Take an Interview = 4 questions on one topic, 45 seconds each. Scored 1-6."""
from cards import S, A, POOL, CARD, HIDE, END_K, PREP


def ANS(i, sec, no=None, hint=None, tip=None, cue=None):
    d = A(i, sec, hint)
    if no: d['no'] = no
    if tip: d['tip'] = tip
    if cue: d['cue'] = cue
    return d


def GROUP(title, intro, qs, sec=25, pts=3):
    """a Part 1 topic: the examiner's lead-in, then 3-4 questions [(q, ja, model, points)]"""
    steps, items = [], {}
    for j, (q, ja, model, points) in enumerate(qs):
        i = str(j + 1)
        steps += [S((intro + ' ' if j == 0 else '') + q), ANS(i, sec)]
        items[i] = {'no': '%s %d' % (title, j + 1), 'pts': pts, 'q': q, 'ja': ja, 'model': [model], 'points': points}
    return {'name': title, 'steps': steps, 'items': items}


def P3(q, ja, model, points=None):
    return {'q': q, 'ja': ja, 'model': [model], 'points': points or ['意見 → 理由 → 例', '一般論として(people / society)']}


# ================================================================ IELTS
IELTS_EX = [['Emma Clarke', 'f'], ['James Hughes', 'm'], ['Sarah Wilson', 'f'], ['Daniel Moore', 'm'], ['Lucy Bennett', 'f'], ['Tom Harris', 'm']]
P1_PTS = ['質問に直接答えてから、理由や例を1〜2文', '短すぎ(Yes. だけ)も長すぎもNG']
IELTS_OPEN = [
    S("Good afternoon. My name is {ex}. Can you tell me your full name, please?"), ANS('name', 8, '名前'),
    S("Thank you. And what shall I call you?"), ANS('call', 5, '呼び名'),
    S("And can you tell me where you're from?"), ANS('from', 8, '出身'),
    S("Can I see your identification, please?"), ANS('idc', 5, '身分証', hint='パスポートなどの身分証を見せながら(Here you are.)'),
    S("Thank you. That's fine. Now, in this first part of the test, I'd like to ask you some questions about yourself."),
    POOL('ielts_p1a', 'p1a', 25, 'Part 1', '', 3),
    POOL('ielts_p1', 'p1b', 25, 'Part 1', '', 3),
    POOL('ielts_p1', 'p1c', 25, 'Part 1', '', 3),
]
IELTS_CLOSE = [S("Thank you. That is the end of the speaking test."), END_K]
IELTS_ITEMS = {
    'fc': {'no': '流暢さと一貫性', 'pts': 10, 'overall': True, 'q': '(全体)', 'ja': 'Fluency and Coherence',
           'points': ['長く止まらずに話し続けられた', 'First / Also / On the other hand などで話をつなげた']},
    'lr': {'no': '語彙', 'pts': 10, 'overall': True, 'q': '(全体)', 'ja': 'Lexical Resource',
           'points': ['同じ語のくり返しを避け、言いかえができた', '話題に合った語(collocation)を使えた']},
    'gra': {'no': '文法', 'pts': 10, 'overall': True, 'q': '(全体)', 'ja': 'Grammatical Range and Accuracy',
            'points': ['単文だけでなく、関係詞・if・because などの複文も使えた', '時制や三単現のミスが少ない']},
    'pr': {'no': '発音', 'pts': 10, 'overall': True, 'q': '(全体)', 'ja': 'Pronunciation',
           'points': ['聞き取りやすい発音とリズム', '大事な語を強く、文の終わりの抑揚も自然に']},
}

IELTS_P1A = [
    GROUP('勉強', "Let's talk about what you do.", [
        ('Do you work, or are you a student?', '働いていますか、それとも学生ですか。', "I'm a student. I'm in my final year of junior high school, and I'm preparing for high school entrance exams.", P1_PTS),
        ('What subject do you enjoy most?', 'いちばん好きな科目は何ですか。', 'I enjoy English most, because I can use it to talk with people from other countries. I also like science.', P1_PTS),
        ("Is there anything you'd like to change about your school?", '学校について変えたいことはありますか。', "I'd like my school to have more chances to speak English, for example, an exchange programme with a school abroad.", P1_PTS),
        ('What do you plan to do after you finish your studies?', '勉強を終えたら何をするつもりですか。', 'I hope to become an airline pilot, so I want to go to a flight school after university.', P1_PTS),
    ]),
    GROUP('地元', "Let's talk about your hometown.", [
        ('Where is your hometown?', '地元はどこですか。', "My hometown is a city near Tokyo. It's about thirty minutes from the centre by train.", P1_PTS),
        ('What do you like most about it?', 'いちばん好きなところは何ですか。', "I like the river that runs through the town. There's a long cycling path along it.", P1_PTS),
        ('Is it a good place for young people?', '若い人にとって良い場所ですか。', "Yes, I think so. It's quiet, but it's easy to get to the city for shopping or concerts.", P1_PTS),
        ('Has your hometown changed much since you were a child?', '子どものころから地元は大きく変わりましたか。', 'A little. A new shopping centre was built near the station, so it has become much busier.', P1_PTS),
    ]),
    GROUP('住まい', "Let's talk about where you live.", [
        ('Do you live in a house or an apartment?', '一戸建てに住んでいますか、それとも集合住宅ですか。', 'I live in an apartment with my family. It is on the eighth floor, so the view is nice.', P1_PTS),
        ('Which room do you spend the most time in?', 'どの部屋でいちばん長く過ごしますか。', 'Probably my own room, because I study there and also listen to music in the evening.', P1_PTS),
        ("What would you like to change about your home?", '家について変えたいことは何ですか。', "I'd like a bigger desk in my room. At the moment there isn't enough space for my books and my laptop.", P1_PTS),
        ('Do you plan to live there for a long time?', 'そこに長く住むつもりですか。', "Not really. If I become a pilot, I'll probably move closer to a big airport.", P1_PTS),
    ]),
    GROUP('近所', "Let's talk about your neighbourhood.", [
        ('Can you describe the area where you live?', '住んでいる地域について説明してください。', "It's a residential area with a lot of apartment buildings and a big park in the middle.", P1_PTS),
        ('What facilities are there near your home?', '家の近くにはどんな施設がありますか。', "There's a supermarket, a library and a sports centre, all within walking distance.", P1_PTS),
        ('Do you know your neighbours well?', '近所の人をよく知っていますか。', 'Only a few of them. We say hello in the lift, but we rarely have long conversations.', P1_PTS),
        ('Would you like to move to a different area in the future?', '将来、別の地域に引っ越したいですか。', "Yes, I'd like to live abroad for a while, maybe in Canada or Australia.", P1_PTS),
    ]),
]
IELTS_P1 = [
    GROUP('音楽', "Now let's talk about music.", [
        ('What kind of music do you like?', 'どんな音楽が好きですか。', 'I mostly listen to K-pop. The songs are catchy, and I like watching the dance performances too.', P1_PTS),
        ('When do you usually listen to music?', 'ふだんいつ音楽を聞きますか。', 'Usually on my way to school and while I am doing homework, if it is not too difficult.', P1_PTS),
        ('Have you ever learned to play a musical instrument?', '楽器を習ったことはありますか。', 'Yes, I took piano lessons for about three years when I was in primary school.', P1_PTS),
    ]),
    GROUP('天気', "Let's move on to talk about the weather.", [
        ("What's the weather usually like where you live?", '住んでいる所の天気はふだんどうですか。', 'It changes a lot with the seasons. Summers are hot and humid, and winters are dry and quite cold.', P1_PTS),
        ('What kind of weather do you like best?', 'どんな天気がいちばん好きですか。', 'I like clear, sunny days in autumn, because it is not too hot and I can go cycling.', P1_PTS),
        ('Does the weather ever change your plans?', '天気のせいで予定が変わることはありますか。', 'Yes, sometimes. If there is a typhoon, trains stop and we have to cancel our plans.', P1_PTS),
    ]),
    GROUP('自転車', "Let's talk about bicycles.", [
        ('How often do you ride a bicycle?', 'どのくらい自転車に乗りますか。', 'Almost every day. I ride to school, and at weekends I often go on longer rides.', P1_PTS),
        ('When did you learn to ride a bicycle?', 'いつ自転車に乗れるようになりましたか。', 'When I was about six. My father taught me in a park near our home.', P1_PTS),
        ('Do you think cycling is popular in your country?', 'あなたの国でサイクリングは人気だと思いますか。', 'Yes, very. Many people use bicycles for shopping or commuting because they are cheap and convenient.', P1_PTS),
    ]),
    GROUP('運動', "Let's talk about exercise.", [
        ('What kind of exercise do you do?', 'どんな運動をしますか。', 'I do some strength training at home, like push-ups and squats, three times a week.', P1_PTS),
        ('Did you do much exercise when you were younger?', '小さいころはよく運動しましたか。', 'Yes, I played football with my friends almost every day after school.', P1_PTS),
        ('Do you prefer exercising alone or with other people?', '一人で運動するのと、人と運動するのとどちらが好きですか。', 'I prefer exercising alone, because I can choose my own pace and time.', P1_PTS),
    ]),
    GROUP('食べ物', "I'd like to talk about food.", [
        ('What is your favourite food?', 'いちばん好きな食べ物は何ですか。', "I love ramen, especially miso ramen. There's a great ramen shop near my school.", P1_PTS),
        ('Do you often cook at home?', '家でよく料理をしますか。', "Not very often, but I sometimes make simple dishes like fried rice at the weekend.", P1_PTS),
        ('Is there any food you disliked as a child but enjoy now?', '子どものころは苦手で、今は好きな食べ物はありますか。', "Yes, green peppers. I couldn't eat them when I was little, but now I quite like them.", P1_PTS),
    ]),
    GROUP('スマートフォン', "Let's talk about mobile phones.", [
        ('How often do you use your mobile phone?', 'どのくらい携帯電話を使いますか。', "Quite a lot, maybe three hours a day. I use it for messages, music and studying vocabulary.", P1_PTS),
        ('What do you use your phone for most?', 'いちばん何に使いますか。', 'Mainly for chatting with friends, but I also use apps to learn languages.', P1_PTS),
        ('Could you live without your phone for a week?', '1週間スマホなしで過ごせますか。', 'It would be difficult, but I think I could. I would probably read more books.', P1_PTS),
    ]),
    GROUP('週末', "Let's talk about weekends.", [
        ('What do you usually do at the weekend?', '週末はふだん何をしますか。', 'I usually study in the morning and then go cycling or meet my friends in the afternoon.', P1_PTS),
        ('Did you do anything special last weekend?', '先週末は何か特別なことをしましたか。', 'Yes, I went to the airport to watch planes taking off. It was really exciting.', P1_PTS),
        ('Do you prefer busy weekends or relaxing ones?', '忙しい週末とのんびりした週末、どちらが好きですか。', 'I prefer relaxing ones, because school days are already busy.', P1_PTS),
    ]),
    GROUP('読書', "Let's talk about reading.", [
        ('Do you enjoy reading?', '読書は好きですか。', 'Yes, I do, although I mostly read magazines and articles online rather than novels.', P1_PTS),
        ('What kind of books did you read as a child?', '子どものころはどんな本を読みましたか。', 'I loved picture books about vehicles, especially trains and aeroplanes.', P1_PTS),
        ('Do you prefer reading on paper or on a screen?', '紙で読むのと画面で読むのとどちらが好きですか。', 'On paper, because it is easier on my eyes and I can concentrate better.', P1_PTS),
    ]),
    GROUP('写真', "Let's talk about photographs.", [
        ('Do you like taking photos?', '写真を撮るのは好きですか。', 'Yes, I especially like taking photos of aircraft at the airport.', P1_PTS),
        ('What do you do with the photos you take?', '撮った写真をどうしますか。', 'I usually keep them on my phone, and sometimes I share the best ones with my friends.', P1_PTS),
        ('Do you have any photos on the walls of your home?', '家の壁に写真を飾っていますか。', 'Yes, there are some family photos in our living room from our trips.', P1_PTS),
    ]),
    GROUP('旅行', "Let's talk about travelling.", [
        ('Do you like travelling?', '旅行は好きですか。', "Yes, very much. I love the moment when the plane takes off.", P1_PTS),
        ('Where did you go on your last trip?', '最近の旅行ではどこへ行きましたか。', 'I went to Okinawa with my family last summer. The sea was amazingly clear.', P1_PTS),
        ('Would you rather travel in your own country or abroad?', '国内旅行と海外旅行、どちらがいいですか。', "Abroad, because I'd like to use English and experience a different culture.", P1_PTS),
    ]),
]
# ---- IELTS Part 1: 4 more opening topics and 10 more topics (original) ----
IELTS_P1A += [
    GROUP('勉強 (2)', "Let's talk about your studies.", [
        ('What are you studying at the moment?', '今、何を勉強していますか。', "I'm a junior high school student, so I study all the main subjects, but at the moment I'm focusing on English and maths for my entrance exams.", P1_PTS),
        ('Which subject do you find the most difficult?', 'いちばん難しいと感じる科目は何ですか。', 'Probably Japanese classical literature. The old language is very different from modern Japanese.', P1_PTS),
        ('Do you prefer studying alone or with friends?', '一人で勉強するのと友達とするのと、どちらが好きですか。', 'Mostly alone, because I can concentrate better. But before exams, I sometimes study with friends and test each other.', P1_PTS),
        ('Is there anything you would like to learn in the future?', '将来学びたいことはありますか。', "I'd like to learn more about aircraft engineering, because I'm interested in how planes actually fly.", P1_PTS),
    ]),
    GROUP('地元 (2)', "Let's talk about the town you come from.", [
        ('What is your town famous for?', 'あなたの町は何で有名ですか。', "It isn't very famous, but it's known for a large park with cherry trees, which is crowded in spring.", P1_PTS),
        ('Do many tourists visit your town?', '観光客はたくさん来ますか。', 'Not many. Most visitors come only in spring to see the cherry blossoms.', P1_PTS),
        ('What do people there usually do at weekends?', 'そこの人々は週末にふだん何をしますか。', 'Families often go to the shopping centre or have picnics by the river.', P1_PTS),
        ('Would you like to live there in the future?', '将来もそこに住みたいですか。', "Maybe when I'm older, but first I'd like to live in a bigger city near an international airport.", P1_PTS),
    ]),
    GROUP('住まい (2)', "Let's talk about your home.", [
        ('Who do you live with?', 'だれと住んでいますか。', 'I live with my parents and my younger brother.', P1_PTS),
        ('How long have you lived there?', 'そこにどのくらい住んでいますか。', "We've lived there for about ten years, since I started primary school.", P1_PTS),
        ('What can you see from your window?', '窓から何が見えますか。', 'I can see a park and, on clear days, planes coming in to land in the distance.', P1_PTS),
        ('What do you like most about your home?', '家のいちばん好きなところは何ですか。', "I like the balcony, because it's a quiet place to read when the weather is nice.", P1_PTS),
    ]),
    GROUP('通学', "Let's talk about how you get to school.", [
        ('How do you usually get to school?', 'ふだんどうやって学校に行きますか。', 'I usually go by bicycle. It takes about fifteen minutes.', P1_PTS),
        ('Do you enjoy the journey?', '通学は楽しいですか。', 'Yes, I do, especially in spring and autumn. I ride along the river, so the view is nice.', P1_PTS),
        ('What do you do when it rains?', '雨の日はどうしますか。', 'I take the bus instead. It takes longer because of the traffic, so I have to leave earlier.', P1_PTS),
        ('Would you like to live closer to your school?', '学校の近くに住みたいですか。', "Not really. I like having a little time to wake up and think before classes start.", P1_PTS),
    ]),
]
IELTS_P1 += [
    GROUP('空港', "Let's talk about airports.", [
        ('Do you often go to airports?', 'よく空港に行きますか。', "Quite often, actually. I like going to the observation deck to watch the planes, even when I'm not travelling.", P1_PTS),
        ('What do you think makes a good airport?', 'よい空港とはどんな空港だと思いますか。', 'Clear signs, short queues at security and good transport to the city centre.', P1_PTS),
        ('Would you like to work at an airport?', '空港で働いてみたいですか。', "Yes, I'd love to, but my dream is to work in the cockpit rather than in the terminal.", P1_PTS),
    ]),
    GROUP('友達', "Let's talk about friends.", [
        ('How often do you see your friends?', 'どのくらい友達に会いますか。', 'Almost every day at school, and sometimes at weekends as well.', P1_PTS),
        ('What do you usually do together?', 'ふだん一緒に何をしますか。', 'We usually play video games or go cycling together.', P1_PTS),
        ('Is it easy for you to make new friends?', '新しい友達を作るのは簡単ですか。', "Not very. I'm a bit shy at first, but once I get to know people, I'm quite talkative.", P1_PTS),
    ]),
    GROUP('朝', "Let's talk about mornings.", [
        ('Are you a morning person?', '朝型ですか。', "Not really. I find it hard to get up early, especially in winter.", P1_PTS),
        ('What do you usually do in the morning?', '朝はふだん何をしますか。', 'I have a quick breakfast, check the weather and then cycle to school.', P1_PTS),
        ('Would you like to change your morning routine?', '朝の過ごし方を変えたいですか。', "Yes. I'd like to get up a bit earlier so that I can go for a short run.", P1_PTS),
    ]),
    GROUP('映画', "Let's talk about films.", [
        ('What kind of films do you like?', 'どんな映画が好きですか。', 'I like action films and documentaries, especially ones about science and aviation.', P1_PTS),
        ('Do you prefer watching films at home or at the cinema?', '家と映画館、どちらで映画を見るのが好きですか。', 'At the cinema, because the screen and the sound are much more exciting.', P1_PTS),
        ('Have you ever watched a film more than once?', '同じ映画を2回以上見たことはありますか。', "Yes, many times. There's a film about fighter pilots that I've watched at least five times.", P1_PTS),
    ]),
    GROUP('買い物', "Let's talk about shopping.", [
        ('Do you enjoy shopping?', '買い物は好きですか。', "It depends. I enjoy shopping for gadgets, but I don't like shopping for clothes very much.", P1_PTS),
        ('Do you prefer shopping online or in shops?', 'ネットと店、どちらで買うのが好きですか。', 'For gadgets I compare prices online, but I like to see clothes and shoes in shops first.', P1_PTS),
        ('What was the last thing you bought?', '最後に買ったものは何ですか。', 'I bought a new pair of earphones last week. The old ones broke.', P1_PTS),
    ]),
    GROUP('料理', "Let's talk about cooking.", [
        ('Can you cook?', '料理はできますか。', "Only simple things, like fried rice or omelettes.", P1_PTS),
        ('Who does most of the cooking in your family?', '家ではだれがいちばん料理をしますか。', 'My mother does most of it, but my father cooks on Sundays.', P1_PTS),
        ('Would you like to learn to cook better?', 'もっと料理が上手になりたいですか。', "Yes, definitely. If I live alone in the future, I'll need to cook healthy meals for myself.", P1_PTS),
    ]),
    GROUP('ゲーム', "Let's talk about games.", [
        ('Do you play any games?', '何かゲームをしますか。', 'Yes, I play video games, mainly flight simulators and racing games.', P1_PTS),
        ('Did you play different games when you were a child?', '子どものころは違うゲームをしていましたか。', 'Yes. I used to play card games and tag with my friends in the park.', P1_PTS),
        ('Do you think games can be educational?', 'ゲームは勉強になると思いますか。', 'Some can. For example, flight simulators taught me a lot about how planes are controlled.', P1_PTS),
    ]),
    GROUP('季節', "Let's talk about seasons.", [
        ('Which season do you like best?', 'どの季節がいちばん好きですか。', 'Autumn, because the weather is comfortable and the leaves change colour.', P1_PTS),
        ('Is there a season you dislike?', '嫌いな季節はありますか。', 'The rainy season in June. It rains almost every day, and it is very humid.', P1_PTS),
        ('Do you do different activities in different seasons?', '季節によって違うことをしますか。', 'Yes. I go cycling in spring and autumn, and in winter I prefer reading at home.', P1_PTS),
    ]),
    GROUP('公園', "Let's talk about parks.", [
        ('Is there a park near your home?', '家の近くに公園はありますか。', 'Yes, there is a big park about five minutes away on foot.', P1_PTS),
        ('What do people do there?', 'そこで人々は何をしていますか。', 'People walk their dogs, children play football, and older people do exercises in the morning.', P1_PTS),
        ('Do you think cities need more parks?', '都市にはもっと公園が必要だと思いますか。', 'Yes, because parks give people a place to relax and get some fresh air.', P1_PTS),
    ]),
    GROUP('時間の使い方', "Let's talk about time.", [
        ('Do you usually arrive on time?', 'ふだん時間どおりに着きますか。', "Yes. I don't like being late, so I usually arrive a few minutes early.", P1_PTS),
        ('How do you plan your day?', '1日の予定をどう立てますか。', 'I write a short to-do list on my phone every morning.', P1_PTS),
        ('Do you ever feel that you have too little time?', '時間が足りないと感じることはありますか。', 'Yes, especially before exams. That is when I try to cut down on games and social media.', P1_PTS),
    ]),
]
P2_PTS = ['カードの4つの点をすべて入れる(順番どおりでなくてもOK)', '最後の and explain … をいちばん厚く', '過去の話は過去形で、話をつなぐ語(First / After that / What I remember most is …)']


def IELTS_SET(cue, verb, topic, round_q, round_m, model, theme1, intro1, q1, theme2, intro2, q2):
    """one Part 2 + Part 3 set. cue = (title, [bullets], 'and explain …')"""
    n = len(IELTS_SETS) + 1
    return {
        'card': {'title': 'Part 2', 'cue': {'t': cue[0], 'b': cue[1], 'e': cue[2]}},
        'steps': [
            S("Thank you. Now, I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish. Do you understand?"),
            ANS('und', 4, '確認', hint='Yes. / Yes, I do. など'),
            S("Here's some paper and a pencil for making notes, and here's your topic. I'd like you to %s." % verb),
            dict(CARD, show='cue'), dict(PREP(60, '準備 ・ 1分(メモしてOK)'), notes=True),
            S("All right? Remember, you have one to two minutes for this, so don't worry if I stop you. I'll tell you when the time is up. Can you start speaking now, please?"),
            ANS('p2', 120, tip='1分以上、できれば2分近く話そう。2分たつと止められます'),
            S("Thank you. " + round_q), ANS('p2r', 20),
            S("Thank you. Can I have the booklet, pencil and paper, please?"), HIDE,
            S("We've been talking about %s, and I'd like to discuss with you one or two more general questions related to this. Let's consider first of all %s." % (topic, intro1)),
            POOL('ielts_p3_%da' % n, 'p3a', 40, 'Part 3 (1)', '', 5), POOL('ielts_p3_%da' % n, 'p3b', 40, 'Part 3 (2)', '', 5),
            S("Now let's move on to %s." % intro2),
            POOL('ielts_p3_%db' % n, 'p3c', 40, 'Part 3 (3)', '', 5), POOL('ielts_p3_%db' % n, 'p3d', 40, 'Part 3 (4)', '', 5),
        ],
        'items': {
            'p2': {'no': 'Part 2 スピーチ', 'pts': 15, 'q': cue[0], 'ja': '1〜2分で話す(準備1分・メモOK)', 'model': [model], 'points': P2_PTS},
            'p2r': {'no': 'Part 2 最後の質問', 'pts': 3, 'q': round_q, 'ja': 'スピーチのあとの短い質問', 'model': [round_m], 'points': ['1〜2文で短く']},
        },
        'pools': {'ielts_p3_%da' % n: q1, 'ielts_p3_%db' % n: q2},
        'themes': [theme1, theme2],
    }


IELTS_SETS = []
IELTS_SETS.append(IELTS_SET(
    ('Describe a journey you remember well.', ['where you went', 'how you travelled', 'who you went with'], 'and explain why you remember this journey well.'),
    'describe a journey you remember well', 'journeys', 'Do you enjoy long journeys?', 'Yes, as long as I can look out of the window. I find it relaxing.',
    "I'd like to talk about a trip I took to Hokkaido with my family two years ago. We flew from Haneda to New Chitose Airport, and it was my first time on a large plane, a Boeing seven-seven-seven. I went with my parents and my younger brother. The flight itself was only about ninety minutes, but I remember almost every minute of it. I had a window seat, and when we took off, I could see Mount Fuji above the clouds. A cabin attendant even gave me a small card about the aircraft. The main reason I remember this journey so well is that it was the moment I decided I wanted to become a pilot. Before that trip, I just thought planes were cool, but seeing the view from the cockpit window when we visited after landing made me realise it could be a real job. So, for me, it wasn't just a holiday, it was the start of my dream.",
    'travel and transport', 'how people travel today',
    [P3('Why do people travel more now than they did in the past?', '昔より人々が旅行するようになったのはなぜですか。', 'Mainly because it has become much cheaper and easier. Budget airlines and online booking mean that people can plan a trip in a few minutes, and more people have the money and the time to travel.'),
     P3('Do you think air travel will become cheaper or more expensive in the future?', '将来、空の旅は安くなると思いますか、高くなると思いますか。', "I think it might become more expensive, at least for a while, because airlines will have to use cleaner fuels, which cost more. On the other hand, new technology could lower costs in the long run."),
     P3('What are the advantages of travelling by train compared with flying?', '飛行機と比べて、鉄道で移動する利点は何ですか。', 'Trains usually leave from the city centre, so you save time getting to the airport and going through security. They are also better for the environment on short routes.'),
     P3('How can cities reduce traffic congestion?', '都市はどうやって渋滞を減らせますか。', 'The most effective way is to make public transport cheap and reliable. Cities can also build safe cycle lanes, so that people feel comfortable leaving their cars at home.')],
    'tourism', 'tourism',
    [P3('What are the benefits of tourism for a country?', '観光は国にどんな利益をもたらしますか。', 'Tourism creates jobs, especially in hotels and restaurants, and brings money into local areas. It can also help people from different countries understand each other better.'),
     P3('Can tourism cause problems for local people?', '観光は地元の人々に問題を起こすことがありますか。', 'Yes, it can. In very popular places, too many visitors cause crowded streets and rising prices, so it becomes harder for local people to live there.'),
     P3('Is it better to travel alone or in a group?', '一人旅とグループ旅行、どちらが良いですか。', 'It depends on the person. Travelling alone gives you more freedom and makes you talk to local people, whereas travelling in a group is safer and usually more fun.'),
     P3('How might holidays change in the future?', '将来、休暇の過ごし方はどう変わるでしょうか。', 'I think people may take shorter trips closer to home to reduce their carbon footprint. Virtual reality might also let people "visit" places before they decide to go there.')]))
IELTS_SETS.append(IELTS_SET(
    ('Describe a skill you would like to learn.', ['what the skill is', 'how you would learn it', 'how difficult it would be'], 'and explain why you want to learn this skill.'),
    'describe a skill you would like to learn', 'learning new skills', 'Is it easy for you to find time to learn new things?', 'Not really, because I have a lot of homework, but I try to use weekends.',
    "The skill I'd really like to learn is flying a small aircraft, like a Cessna. I think I would learn it at a flying club or a flight school, where an instructor sits next to you and explains everything step by step. Before actually flying, I would probably practise on a flight simulator, because it's much cheaper and you can make mistakes safely. I imagine it would be quite difficult. You have to control the plane, talk to air traffic control in English and keep checking the instruments, all at the same time. Landing especially seems tricky, because you have to judge the wind. The reason I want to learn this skill is that I'm hoping to become an airline pilot. Learning to fly a small plane would show me whether I really enjoy flying, and it would give me a head start before professional training. Also, I think it would make me more confident in general.",
    'learning skills', 'learning skills in general',
    [P3('Which skills are most useful for young people today?', '今の若者にとっていちばん役に立つスキルは何ですか。', 'I would say communication skills and digital skills. Almost every job now involves working with computers and explaining ideas to other people, often in English.'),
     P3('Is it better to learn a skill from a teacher or by yourself online?', 'スキルは先生から学ぶのとオンラインで独学するのと、どちらが良いですか。', 'For practical skills, a teacher is better because they can correct your mistakes immediately. However, online courses are cheaper and flexible, so they are good for the basics.'),
     P3('Why do some people give up learning new skills?', '新しいスキルの習得をあきらめてしまう人がいるのはなぜですか。', 'Often because they expect quick results. When progress becomes slow, they lose motivation, especially if they are busy with work or school.'),
     P3('Should schools teach more practical skills, like cooking or managing money?', '学校は料理やお金の管理などの実用的なスキルをもっと教えるべきですか。', 'Yes, I think so. These skills are needed by everyone, and not all families have time to teach them. They could be taught for an hour a week without affecting other subjects.')],
    'work and skills', 'skills and work',
    [P3('What skills will people need for jobs in the future?', '将来の仕事にはどんなスキルが必要になりますか。', 'People will need to be flexible and keep learning, because technology changes so fast. Skills that machines cannot easily copy, such as creativity and teamwork, will be especially valuable.'),
     P3('Do older people find it harder to learn new technology?', '年配の人は新しい技術を学ぶのが難しいと思いますか。', 'Generally yes, because they did not grow up with it. But with patient teaching, many older people learn to use smartphones very well.'),
     P3('Is it important to keep learning throughout your life?', '一生学び続けることは大切ですか。', 'Definitely. Learning keeps your mind active, and in many jobs you have to update your knowledge regularly, just like pilots who train every year.'),
     P3('Should companies pay for their employees\' training?', '会社は社員の研修費を払うべきですか。', 'I think they should, because the company benefits directly when its staff become more skilled. It also makes employees more loyal.')]))
IELTS_SETS.append(IELTS_SET(
    ('Describe a person who has influenced you.', ['who this person is', 'how you know this person', 'what this person has done'], 'and explain how this person has influenced you.'),
    'describe a person who has influenced you', 'people who influence us', 'Do you still keep in touch with this person?', "Yes, we send each other messages from time to time, especially around New Year.",
    "I'd like to talk about my English teacher from primary school, Ms. Yamada. I met her when I was in the fifth grade, when she started teaching our class. What made her special was that she never made us afraid of mistakes. She used games and songs, and she always said that speaking a little is better than staying silent. She also organised an online exchange with a school in Australia, so for the first time I talked with children of my own age in English. She has influenced me a lot. Before her lessons, I was quite shy and hated speaking in front of others. Because of her, I started to enjoy English, and now it's one of my favourite subjects. In fact, I think she is one of the reasons I want a career that uses English every day, like being an international pilot. I really hope I can thank her properly one day.",
    'role models', 'role models',
    [P3('Who are the role models for young people today?', '今の若者のロールモデルはだれですか。', 'Many young people look up to athletes and pop stars, but I think teachers and family members are still important, because they are the people we see every day.'),
     P3('Do famous people have a responsibility to behave well?', '有名人には良いふるまいをする責任がありますか。', 'Yes, to some extent. Millions of young fans copy what they do, so if a celebrity behaves badly, it can send the wrong message.'),
     P3('Are parents the most important role models for children?', '親は子どもにとっていちばん大切なロールモデルですか。', 'In most cases, yes. Children learn habits and values by watching their parents, often without realising it.'),
     P3('How do social media influencers affect young people?', 'SNSのインフルエンサーは若者にどんな影響を与えますか。', 'They can be positive, for example by sharing study tips or healthy habits. However, some of them make young people compare themselves with unrealistic images.')],
    'family and friends', 'family and friends',
    [P3('How important are friends compared with family?', '友達は家族と比べてどのくらい大切ですか。', 'Both are important, but in different ways. Family support is usually more stable, while friends are the people we share our interests and problems with as we grow up.'),
     P3('Do people spend less time with their families than in the past?', '昔より家族と過ごす時間は減っていますか。', 'I think so. Parents often work long hours, and children are busy with clubs and cram schools, so families rarely eat dinner together.'),
     P3('What makes a good friend?', '良い友達とはどんな人ですか。', 'Someone you can trust and who is honest with you, even when the truth is not pleasant to hear.'),
     P3('Is it easier to make friends now because of the Internet?', 'インターネットのおかげで友達を作りやすくなりましたか。', 'It is easier to meet people with the same hobbies online, but I think it is harder to build deep friendships without meeting face to face.')]))
IELTS_SETS.append(IELTS_SET(
    ('Describe a piece of technology you find useful.', ['what it is', 'when you got it', 'how often you use it'], 'and explain why it is useful to you.'),
    'describe a piece of technology you find useful', 'technology', 'Is there any technology you don\'t like using?', "I'm not keen on voice assistants, because they often misunderstand me.",
    "The piece of technology I find most useful is my tablet computer. I got it about a year ago, when I started preparing seriously for exams, as a birthday present from my parents. I use it every single day, usually for two or three hours. In the morning I check the weather and the news, and in the evening I use it for studying. For example, I have a vocabulary app, a dictionary and some online English courses on it. I also use a flight-tracking app to follow planes in real time, which is one of my hobbies. The reason it's so useful is that it combines lots of things in one device. Instead of carrying several heavy books, I can carry one light tablet. It also helps me study more efficiently, because the apps remember which words I keep forgetting. Of course, I have to be careful not to waste time on videos, but overall it has made studying much easier.",
    'technology in daily life', 'technology in everyday life',
    [P3('How has technology changed the way people communicate?', '技術によって人々のコミュニケーションはどう変わりましたか。', 'It has made communication instant and cheap. We can video call someone on the other side of the world, but some people now prefer messages to real conversations.'),
     P3('Do people rely too much on their smartphones?', '人々はスマートフォンに頼りすぎていますか。', 'Many people do. For example, people use maps apps so often that they cannot find their way without them, and they check their phones even during meals.'),
     P3('What problems can new technology cause for older people?', '新しい技術は高齢者にどんな問題を起こしますか。', 'Many services are moving online, such as banking and booking tickets, so older people who are not confident with technology can be left behind.'),
     P3('Will robots do more household tasks in the future?', '将来、ロボットはもっと家事をするようになるでしょうか。', 'I think so. Robot vacuum cleaners are already common, and as prices fall, robots that can cook or fold laundry may become normal.')],
    'technology and education', 'technology in education',
    [P3('Should children use computers at school from a young age?', '子どもは小さいころから学校でコンピューターを使うべきですか。', 'Yes, but in moderation. Basic digital skills are essential, but young children also need to learn by writing by hand and playing with others.'),
     P3('Can online lessons replace teachers in the classroom?', 'オンライン授業は教室の先生の代わりになりますか。', "Not completely. Online lessons are useful for explaining facts, but a teacher in the room can notice when a student is confused and motivate them."),
     P3('What are the risks of students using AI to do their homework?', '生徒がAIで宿題をすることの危険は何ですか。', 'The main risk is that students stop thinking for themselves. If AI writes their essays, they will not develop their own writing and reasoning skills.'),
     P3('How might classrooms look different in twenty years?', '20年後の教室はどう違っているでしょうか。', 'Perhaps every student will have a personal learning programme on a device, and teachers will spend more time on discussions and projects than on lectures.')]))
IELTS_SETS.append(IELTS_SET(
    ('Describe a place outdoors where you like to spend time.', ['where it is', 'how often you go there', 'what you do there'], 'and explain why you like spending time there.'),
    'describe a place outdoors where you like to spend time', 'places outdoors', 'Did you spend a lot of time outdoors as a child?', 'Yes, I did. I played in the park near my home almost every day.',
    "I'd like to describe a riverside park about twenty minutes from my home by bicycle. It's a long, narrow park along a river, with a cycling path, some football fields and lots of cherry trees. I go there about twice a week, more often in spring and autumn when the weather is pleasant. Usually I ride my bike along the path for an hour or so. Sometimes I stop at a bench and listen to music, and when I have exams I even bring a vocabulary book and study there. On some days, if the wind is right, planes fly quite low over the park on their way to the airport, which I love watching. The main reason I like it there is that it helps me relax. At home I'm always thinking about homework, but at the park I can clear my head. Being outside and getting some exercise also makes me feel more energetic, so I can concentrate better when I get home.",
    'outdoor places', 'parks and public spaces',
    [P3('Why are parks important in cities?', '都市において公園はなぜ大切ですか。', 'Parks give people a place to relax and exercise for free. They also help to cool the city in summer and are good for wildlife.'),
     P3('Should more money be spent on public spaces?', '公共の空間にもっとお金を使うべきですか。', 'I believe so. Good public spaces improve people\'s health and give communities a place to meet, which may reduce loneliness.'),
     P3('Do children today spend less time outdoors than in the past?', '今の子どもは昔より外で過ごす時間が少ないですか。', 'Yes, I think they do. They have more indoor entertainment, such as games and videos, and parents may worry more about safety.'),
     P3('What can be done to encourage people to go outside more?', '人々がもっと外に出るように、何ができますか。', 'Local governments could organise free events in parks, like outdoor concerts or exercise classes. Building safe walking and cycling paths would also help.')],
    'nature and the environment', 'nature and the environment',
    [P3('How can people protect the natural environment?', '人々はどうやって自然環境を守ることができますか。', 'In daily life, people can reduce waste and use public transport. On a bigger scale, governments need to protect forests and coastlines from overdevelopment.'),
     P3('Is it the responsibility of individuals or governments to protect nature?', '自然を守るのは個人の責任ですか、それとも政府の責任ですか。', 'Both, but governments have more power. Individuals can change their habits, but only governments can make laws that affect whole industries.'),
     P3('Why do some people prefer the countryside to the city?', '都会より田舎を好む人がいるのはなぜですか。', 'Mainly for the peace and quiet. The air is cleaner, houses are cheaper, and people feel closer to nature.'),
     P3('How will climate change affect the way people spend time outdoors?', '気候変動は人々の屋外での過ごし方にどう影響しますか。', 'Summers are getting hotter, so people may avoid going out in the middle of the day. Outdoor sports and events might move to the early morning or evening.')]))

# ---- IELTS Part 3: 4 more questions for every pool (original) ----
_P3_MORE = {
  'ielts_p3_1a': [
    P3('Why do some people feel nervous about flying?', '飛行機に乗るのを不安に思う人がいるのはなぜですか。', "Mainly because they feel they have no control. Turbulence can also be frightening, even though it is rarely dangerous. Explaining how safe flying actually is can help."),
    P3('How has the way people book travel changed?', '旅行の予約のしかたはどう変わりましたか。', 'Most people now book everything online, often on their phones. They can compare prices instantly and read reviews, so travel agents are used much less than before.'),
    P3('Should governments spend more on high-speed railways?', '政府は高速鉄道にもっとお金を使うべきですか。', 'I think so, especially for journeys of a few hundred kilometres. Fast trains produce far less carbon than planes and connect city centres directly.'),
    P3('What problems do commuters face in big cities?', '大都市の通勤者はどんな問題を抱えていますか。', 'Crowded trains and long journeys are the biggest problems. Many people spend two hours a day commuting, which leaves them tired and with little free time.'),
  ],
  'ielts_p3_1b': [
    P3('Why do people like to visit famous landmarks?', 'なぜ人々は有名な名所を訪れたがるのですか。', 'Partly because they want to see with their own eyes something they have seen in pictures for years. Taking a photo there also gives people a sense of achievement.'),
    P3('Should popular tourist sites limit the number of visitors?', '人気の観光地は訪問者の数を制限すべきですか。', 'In some cases, yes. If a place is too crowded, it can be damaged, and visitors cannot enjoy it either. A booking system is a fair way to manage numbers.'),
    P3('How can tourists show respect for local cultures?', '観光客はどうやって地元の文化への敬意を示せますか。', 'By learning a few words of the local language and following local customs, for example dressing modestly at religious sites.'),
    P3('Do you think travel helps people understand each other?', '旅行は人々の相互理解に役立つと思いますか。', 'Yes. Meeting people from other countries face to face breaks down stereotypes. You realise that people everywhere have similar hopes and worries.'),
  ],
  'ielts_p3_2a': [
    P3('Is it more important to be good at many things or excellent at one thing?', '多くのことができるのと、一つのことに秀でるのと、どちらが大切ですか。', "It depends on the job, but I think it is best to have one main strength and some general skills. That way you are valuable but also flexible."),
    P3('Why do some people learn faster than others?', 'なぜ学ぶのが速い人とそうでない人がいるのですか。', 'Motivation is a big factor. People who are really interested practise more. Good study habits and a supportive environment also make a difference.'),
    P3('Should children be pushed to take many after-school lessons?', '子どもにたくさんの習い事をさせるべきですか。', 'Not too many. Children need free time to play and rest. One or two activities they really enjoy are better than five they are forced to do.'),
    P3('How has the internet changed the way people learn skills?', 'インターネットは技能の学び方をどう変えましたか。', 'It has made learning much more accessible. You can watch a video tutorial on almost anything for free, although it is harder to get feedback than with a real teacher.'),
  ],
  'ielts_p3_2b': [
    P3('Which jobs are likely to disappear in the future?', '将来なくなりそうな仕事は何ですか。', 'Jobs that involve repeating the same task, such as some factory or data entry work, may be done by machines. However, new jobs will also appear.'),
    P3('Is a university degree still necessary to get a good job?', '良い仕事に就くのに大学の学位は今でも必要ですか。', 'For some careers, like medicine or engineering, definitely. In other fields, practical skills and experience are becoming just as important as a degree.'),
    P3('Should older workers be encouraged to keep working?', '高齢の労働者に働き続けるよう勧めるべきですか。', 'If they want to and are healthy, yes. They have a lot of experience to share, and many people enjoy feeling useful.'),
    P3('What makes a job satisfying?', '仕事の満足感は何から生まれますか。', 'Feeling that your work matters is the most important thing. Good colleagues and the chance to keep learning also make a big difference.'),
  ],
  'ielts_p3_3a': [
    P3('Can a person be a role model without being famous?', '有名でなくてもロールモデルになれますか。', 'Of course. Teachers, coaches and older brothers or sisters influence young people every day, often more than celebrities.'),
    P3('What qualities make someone a good leader?', '良いリーダーにはどんな資質がありますか。', 'A good leader listens to others, makes decisions calmly and takes responsibility when things go wrong.'),
    P3('Do people change their opinions because of others?', '人は他人の影響で意見を変えますか。', 'Yes, quite often, especially when they respect the other person. Social media also makes people more likely to follow the majority.'),
    P3('Is it good for young people to copy their heroes?', '若者がヒーローのまねをするのはよいことですか。', 'It can be, if they copy good habits like hard work. But they should also think for themselves and not copy everything blindly.'),
  ],
  'ielts_p3_3b': [
    P3('How do friendships change as people get older?', '年齢とともに友情はどう変わりますか。', 'People usually have fewer friends but closer ones. They also have less free time because of work and family, so they see their friends less often.'),
    P3('Is it possible to be friends with someone you have never met in person?', '会ったことのない人と友達になれますか。', 'I think so. Many people make real friends through online games or study groups. Meeting in person later can make the friendship even stronger.'),
    P3('Should parents choose their children\'s friends?', '親は子どもの友達を選ぶべきですか。', 'Not really. Parents can give advice, but children need to learn to judge people for themselves.'),
    P3('Why do some people prefer to spend time alone?', '一人で過ごすのを好む人がいるのはなぜですか。', 'Some people recharge their energy by being alone. It gives them time to think, read or work on their hobbies without distractions.'),
  ],
  'ielts_p3_4a': [
    P3('Is technology making people less patient?', '技術のせいで人々は我慢強くなくなっていますか。', 'Probably. We are used to getting information and products instantly, so waiting even a few minutes can feel frustrating.'),
    P3('Should there be age limits for using social media?', 'SNSの利用に年齢制限を設けるべきですか。', 'Yes, I think so. Young children are not ready to deal with online pressure or strangers, so a minimum age protects them.'),
    P3('What are the benefits of online banking and shopping?', 'ネットバンキングやネット通販の利点は何ですか。', 'They save a lot of time, and you can do them at any time of day. They are especially helpful for people who live far from shops.'),
    P3('Do you think people will still use cash in the future?', '将来も人々は現金を使うと思いますか。', 'Less and less, but I do not think it will disappear completely. Some people prefer cash, and it is useful when there is a power cut.'),
  ],
  'ielts_p3_4b': [
    P3('Should mobile phones be banned in schools?', '学校でスマホを禁止すべきですか。', 'Not completely. They can be useful for research, but there should be clear rules, such as keeping them in bags during lessons.'),
    P3('What skills do teachers need in the digital age?', 'デジタル時代の教師にはどんな能力が必要ですか。', 'They need to use technology confidently, but more importantly, they need to teach students how to judge whether information online is reliable.'),
    P3('Is it better to read books on paper or on a screen?', '紙の本と画面、どちらで読むほうがよいですか。', 'For studying, I think paper is better, because it is easier to concentrate and take notes. Screens are convenient for carrying many books when travelling.'),
    P3('How can schools make sure all students have access to technology?', '学校はどうやって全生徒が技術を使えるようにできますか。', 'Schools can lend tablets to students who do not have one and provide free internet access in libraries.'),
  ],
  'ielts_p3_5a': [
    P3('Should cars be banned from city centres?', '都市の中心部から車を締め出すべきですか。', 'In some areas, yes. Car-free streets are safer and quieter, and they are good for shops because people walk more slowly and look around.'),
    P3('What kinds of outdoor activities are popular in your country?', 'あなたの国ではどんな屋外活動が人気ですか。', 'Hiking and camping are very popular, and in spring many people have picnics under the cherry trees.'),
    P3('Do people need to live near nature to be happy?', '人は自然の近くに住まないと幸せになれませんか。', 'Not necessarily, but even a small park or some trees can make a big difference to how people feel.'),
    P3('How has city life changed in recent years?', '近年、都市の生活はどう変わりましたか。', 'Cities have become more crowded and expensive, but there are also more cafés, cycle lanes and green spaces than before.'),
  ],
  'ielts_p3_5b': [
    P3('Should people be fined for dropping litter?', 'ごみのポイ捨てに罰金を科すべきですか。', 'Yes. Fines send a clear message, and the money can be used to clean public places.'),
    P3('What can schools do to teach children about nature?', '学校は自然について子どもに何を教えられますか。', 'Taking classes outside is the best way. Children who grow vegetables or study insects in real life care more about nature.'),
    P3('Are national parks important? Why?', '国立公園は大切ですか。なぜですか。', 'Yes. They protect wildlife and landscapes for future generations, and they give people a place to enjoy nature.'),
    P3('Will people live differently in the future because of environmental problems?', '環境問題のために、人々の暮らしは将来変わるでしょうか。', 'I think so. People may eat less meat, travel less by plane and use more renewable energy at home.'),
  ],
}
for _s in IELTS_SETS:
    for _k in _s['pools']:
        _s['pools'][_k] += _P3_MORE[_k]
IELTS = {
    'grade': 'IELTS', 'tier': 2, 'minutes': 14, 'lang': 'en-GB', 'unit': 'セット', 'att': False,
    'varies': 'Part 1 の話題と Part 3 の質問は毎回変わります。',
    'origNote': '問題はBabel Flightのオリジナルです(進め方・時間は本番と同じ)。',
    'markNote': '採点は本番のバンドスコアとは違う、自分でつける目安です。',
    'voiceNote': '試験官の英語はこの端末の音声で読み上げます(イギリス英語の声があれば使います)。試験官は毎回変わります。',
    'sumNote': '本番は4つの観点(流暢さと一貫性・語彙・文法・発音)を0〜9のバンドで評価します。70%をこえたら手ごたえあり。',
    'againNote': 'Part 1・3 の質問は変わります',
    'flow': ['Part 1(4〜5分) ・ 名前と身分証の確認 → 自分のことについて3つの話題', 'Part 2(3〜4分) ・ トピックカード → 1分準備(メモOK)→ 1〜2分スピーチ → 短い質問', 'Part 3(4〜5分) ・ Part 2 の話題について、より一般的なディスカッション'],
    'exs': IELTS_EX, 'open': IELTS_OPEN, 'close': IELTS_CLOSE, 'items': IELTS_ITEMS,
    'cards': [{'card': s['card'], 'steps': s['steps'], 'items': s['items']} for s in IELTS_SETS],
    'pools': dict({'ielts_p1a': IELTS_P1A, 'ielts_p1': IELTS_P1}, **{k: v for s in IELTS_SETS for k, v in s['pools'].items()}),
}

# ================================================================ TOEFL iBT (2026)
def LR(where, sents):
    """Listen and Repeat: one situation, 7 sentences getting longer"""
    steps = [S(where)]
    items = {}
    for j, t in enumerate(sents):
        i = str(j + 1)
        steps.append({'k': 'rep', 'id': i, 't': t, 'sec': min(16, 6 + len(t.split()) // 2)})
        items[i] = {'no': 'リピート%d' % (j + 1), 'pts': 2, 'rep': t, 'points': ['語順と小さな語(a / the / to)まで', '区切りとイントネーションもまねる']}
    return {'name': where, 'steps': steps, 'items': items}


TOEFL_LR = [
    LR("You are new at a university library. A librarian is telling you about the library.", [
        "The library opens at eight.",
        "Study rooms can be booked online.",
        "You can borrow up to ten books.",
        "Please keep your voice down on the second floor.",
        "If you need help finding a book, ask at the front desk.",
        "Books that are returned late will be charged a small fee each day.",
        "Students who want to use the printers must add money to their student cards first.",
    ]),
    LR("You are visiting a science museum. A guide is talking to your group.", [
        "Welcome to the museum.",
        "Please stay with the group.",
        "The gift shop is next to the main entrance.",
        "Photos are allowed, but please don't use a flash.",
        "Our next stop is the room where the old aircraft are displayed.",
        "After the tour, you are welcome to try the flight simulator on the third floor.",
        "If you look up, you can see a model of the first plane that crossed the ocean.",
    ]),
    LR("You have just joined a student cycling club. The club leader is explaining the rules.", [
        "We meet every Saturday.",
        "Always wear a helmet.",
        "Check your tires before each ride.",
        "We usually ride about thirty kilometers.",
        "If you get a flat tire, raise your hand and we'll stop.",
        "Riders who are new to the club should stay near the front of the group.",
        "In case of rain, the leader will send a message by seven in the morning to say whether the ride is canceled.",
    ]),
    LR("You are starting a part-time job at the campus cafe. The manager is training you.", [
        "Your shift starts at nine.",
        "Please wash your hands first.",
        "The cups are kept under the counter.",
        "Customers can pay with cash or by card.",
        "When the cafe is busy, take orders and let others make the drinks.",
        "Write the customer's name on the cup so that orders don't get mixed up.",
        "Before you leave, make sure the machines are clean and the milk has been put back in the fridge.",
    ]),
    LR("You are at an orientation for international students. An advisor is speaking.", [
        "Welcome to the university.",
        "Classes begin next Monday.",
        "The health center is open on weekdays.",
        "Your student ID card is also your library card.",
        "You should register for your classes by the end of this week.",
        "If you have questions about your visa, please visit the international office.",
        "Students who would like a conversation partner can sign up at the welcome desk before they leave today.",
    ]),
    LR("You are moving into a student dormitory. The dormitory manager is explaining the rules.", [
        "Welcome to the dormitory.",
        "The kitchen closes at eleven.",
        "Please sort your trash into three bins.",
        "Guests must leave the building by ten at night.",
        "The laundry room is in the basement next to the stairs.",
        "If something in your room is broken, fill out a repair form online.",
        "Residents who plan to stay during the winter break should tell the office by the first of December.",
    ]),
    LR("You are taking a tour of the university sports center. A staff member is guiding you.", [
        "This is the main gym.",
        "Lockers are free for students.",
        "Please bring your own towel.",
        "The swimming pool is closed on Mondays.",
        "You need to show your student card at the entrance.",
        "Fitness classes are held every evening from six to nine o'clock.",
        "Students who want to use the climbing wall must take a short safety course first.",
    ]),
    LR("You are joining a field trip to a national park. The tour leader is giving instructions.", [
        "Good morning, everyone.",
        "The bus leaves at nine.",
        "Please stay on the marked trails.",
        "Do not feed any of the animals in the park.",
        "We will stop for lunch at a picnic area near the lake.",
        "If you feel sick or tired at any time, let one of the leaders know.",
        "Anyone who wants to take photos from the viewpoint should be careful near the edge of the cliff.",
    ]),
    LR("You have started volunteering at a city animal shelter. A staff member is explaining your tasks.", [
        "Thank you for coming.",
        "Please wash your hands first.",
        "The dogs are walked twice a day.",
        "Each cage has a card with the animal's name.",
        "Some of the cats are shy, so move slowly around them.",
        "If an animal looks sick or hurt, tell a staff member right away.",
        "Volunteers who would like to help at the adoption event next weekend can write their names on the list.",
    ]),
    LR("You are at the first meeting of a university photography club. The president is speaking.", [
        "Welcome to the club.",
        "We meet every Thursday.",
        "You don't need an expensive camera.",
        "Most members just use their smartphones.",
        "Each month, we choose a theme for a photo contest.",
        "The best photos will be shown in the library during the school festival.",
        "Anyone who would like to borrow one of the club's cameras should talk to me after the meeting.",
    ]),
]
INT_PTS = ['最初の1文で答えをはっきり', '理由 + 具体例(体験)で45秒を使い切る', '最後にひとことまとめる']


def INTERVIEW(context, qs):
    """Take an Interview: a situation and 4 questions [(q, ja, model)]"""
    steps = [S("Take an Interview. " + context)]
    items = {}
    for j, (q, ja, model) in enumerate(qs):
        i = 'i%d' % (j + 1)
        steps += [S(q), ANS(i, 45)]
        items[i] = {'no': '質問%d' % (j + 1), 'pts': 5, 'q': q, 'ja': ja, 'model': [model], 'points': INT_PTS}
    return {'card': {'title': 'Take an Interview'}, 'steps': steps, 'items': items}


TOEFL_CARDS = [
    INTERVIEW("You have agreed to take part in a research study about how students use technology for learning. A researcher will interview you online.", [
        ('First, can you tell me about a piece of technology you use for studying, and how you use it?', '勉強に使っている機器と、その使い方を教えてください。',
         "I mostly use a vocabulary app on my phone. Every morning on the train, I review about thirty words. The app shows me the words I often forget more frequently, so it's very efficient. I also use my laptop to watch online lectures when I don't understand something in class."),
        ('Some students prefer to read on paper, while others prefer reading on a screen. Which do you prefer, and why?', '紙で読むのと画面で読むの、どちらが好きですか。理由も。',
         "I prefer reading on paper, especially for difficult texts. I can write notes in the margins and I remember the information better. Reading on a screen is convenient for short articles, but after an hour my eyes get tired and I start checking messages instead of reading."),
        ('Have you ever had a problem with technology during a class or an exam? What happened?', '授業や試験中に機器のトラブルがあったことはありますか。',
         "Yes. During an online English test, my Internet connection suddenly stopped. I was very nervous, but I contacted the teacher by phone, and she let me restart the test later. Since then, I always charge my devices and check the connection before important classes."),
        ('Some people think schools should limit how much students use phones in class. Do you agree? Why or why not?', '授業中のスマホ利用を学校が制限すべきだという意見に賛成ですか。',
         "I partly agree. Phones can be distracting, because students check social media instead of listening. However, phones are also useful tools, for example for looking up words. So I think teachers should decide when phones can be used, rather than banning them completely."),
    ]),
    INTERVIEW("Your university is collecting opinions about student life. A staff member from the student center will ask you some questions.", [
        ('First, how do you usually spend your time between classes?', '授業の合間はふだんどう過ごしていますか。',
         "Usually I go to the library and review my notes from the previous class. If I have a long break, I meet my friends at the cafeteria. Sometimes I also go to the gym for a short workout, because it helps me focus in the afternoon."),
        ('Would you rather live in a dormitory on campus or in an apartment off campus? Why?', 'キャンパス内の寮と、キャンパス外のアパート、どちらに住みたいですか。',
         "I'd rather live in a dormitory, at least in my first year. It's close to classes, so I wouldn't waste time commuting. It's also a great way to make friends from different countries, which would help me improve my English quickly."),
        ('Tell me about a club or activity you have joined. What did you get out of it?', '参加したクラブや活動と、そこで得たことを教えてください。',
         "In junior high school, I joined the science club. We built small model rockets and tested them on the school field. Through this activity, I learned how to work in a team and how to deal with failure, because our rockets didn't fly well at first."),
        ('Some people say students should have a part-time job while they are studying. What do you think?', '学生はアルバイトをするべきだという意見について、どう思いますか。',
         "I think a part-time job can be valuable if it's only a few hours a week. Students learn responsibility and how to communicate with customers. But if they work too much, their grades may suffer, so they need to balance work and study carefully."),
    ]),
    INTERVIEW("A travel magazine is writing an article about young people and travel. A reporter will interview you.", [
        ('First, tell me about a place you have visited that you would recommend to others.', 'ほかの人にすすめたい、行ったことのある場所を教えてください。',
         "I'd recommend Okinawa. The beaches are beautiful, and the water is so clear that you can see fish without diving. I also enjoyed learning about its history and culture, which are quite different from the rest of Japan. The food is great too."),
        ('When you travel, do you prefer to plan everything in advance or decide things as you go? Why?', '旅行では事前に全部計画するのと、その場で決めるのとどちらが好きですか。',
         "I prefer to plan the main things in advance, like transportation and hotels, because it saves time and stress. But I like to leave some free time each day to explore, because the best experiences often happen when you don't expect them."),
        ('Have you ever had a problem while traveling? How did you deal with it?', '旅行中に困ったことはありますか。どう対処しましたか。',
         "Once our flight was delayed for four hours because of a typhoon. At first I was frustrated, but I watched the planes and chatted with the airline staff. They explained how pilots decide whether it's safe to fly, which was actually really interesting."),
        ('Do you think young people should travel abroad before they start working? Why or why not?', '若者は働き始める前に海外へ行くべきだと思いますか。',
         "Yes, I do. Traveling abroad helps young people become more independent and open-minded. They have to communicate in another language and solve problems by themselves. These experiences are useful in almost any job, especially in international companies."),
    ]),
    INTERVIEW("You are taking part in a study about how students manage their time. A researcher will ask you a few questions.", [
        ('First, can you describe a typical weekday for you?', 'ふだんの平日の過ごし方を説明してください。',
         "I get up at six thirty and leave for school at seven thirty. Classes finish around three, and then I have club activities until five. After dinner I study for about two hours, and I usually go to bed around eleven."),
        ('Do you prefer to study in the morning or at night? Why?', '朝に勉強するのと夜に勉強するの、どちらが好きですか。',
         "I prefer studying in the morning, even though it's hard to wake up. My mind is fresh, and there are fewer distractions because my friends aren't sending messages yet. At night I'm often tired, so I only do easy review then."),
        ('Tell me about a time when you had too much to do. How did you handle it?', 'やることが多すぎたときのことと、どう乗り切ったかを教えてください。',
         "Last winter I had exams, a speech contest and a club event in the same week. I made a list of everything and decided what was most urgent. I also asked my teacher for advice on the speech. It was tough, but I finished everything on time."),
        ('Some people say it is better to study for long periods without breaks. Do you agree?', '休憩なしで長時間勉強するほうがよいという意見に賛成ですか。',
         "No, I don't agree. When I study for too long without a break, I stop understanding what I read. I find it more effective to study for about fifty minutes and then rest for ten. Short breaks help me stay focused for the whole day."),
    ]),
    INTERVIEW("A university is planning a new program about careers. An advisor will interview you about your goals.", [
        ('First, what kind of job are you interested in, and why?', 'どんな仕事に興味がありますか。理由も。',
         "I'm interested in becoming an airline pilot. I've loved airplanes since I was a child, and I like the idea of a job that combines technology, teamwork and travel. It's also a job where English is used every day, which I enjoy."),
        ('Who has given you the most useful advice about your future? What did they say?', '将来について、いちばん役に立つアドバイスをくれたのはだれですか。',
         "My uncle gave me the most useful advice. He works for a trading company, and he told me that English is just a tool, and what matters is what you can do with it. Since then, I've tried to learn about science and aviation in English, not just the language."),
        ('Would you prefer to work for a large company or a small one? Why?', '大企業と小さな会社、どちらで働きたいですか。',
         "I'd prefer a large company. Large companies usually offer better training programs, which is important for a job like pilot. They also have more chances to work abroad. On the other hand, I understand that small companies can give you responsibility earlier."),
        ('Some people think it is important to choose a career early, while others think it is better to wait. What do you think?', '進路を早く決めるべきか、待つべきか、どう思いますか。',
         "I think it's good to have a goal early, because you can prepare step by step. For example, I've been studying English with my goal in mind. However, people should stay flexible, because they may discover new interests along the way."),
    ]),
]
TOEFL = {
    'grade': 'TOEFL iBT', 'tier': 2, 'minutes': 8, 'lang': 'en-US', 'unit': 'セット', 'att': False, 'noPardon': True,
    'varies': 'Listen and Repeat の場面は毎回変わります。',
    'origNote': '問題はBabel Flightのオリジナルです(2026年1月からの新形式に合わせています)。',
    'markNote': '採点は本番のスコア(1〜6)とは違う、自分でつける目安です。',
    'voiceNote': '英語はこの端末の音声で読み上げます。本番は録音の音声なので、聞き返し(Pardon?)はできません。',
    'subNote': 'インタビューの質問を表示する(本番は画面にも出ます)',
    'sumNote': '本番は1〜6のバンドで評価されます(必要なスコアは大学や機関によって違います)。70%をこえたら手ごたえあり。',
    'againNote': 'リピートの場面は変わります',
    'exs': [['the interviewer', 'f'], ['the interviewer', 'm']],
    'flow': ['Listen and Repeat ・ 1つの場面の英文7つを、聞いたとおりにくり返す(準備なし・英文は表示されない)', 'Take an Interview ・ 1つのテーマについての質問4つに、それぞれ45秒で答える(準備なし)'],
    'open': [S("This is the Speaking section. There are two tasks. In the first task, you will hear seven sentences. After each one, repeat exactly what you heard."),
             POOL('toefl_lr', 'lr', 10, 'Listen and Repeat', '', 2)],
    'close': [S("This is the end of the Speaking section."), END_K],
    'cards': TOEFL_CARDS, 'pools': {'toefl_lr': TOEFL_LR}, 'items': {},
}

INTL = {'ielts': IELTS, 'toefl': TOEFL}
