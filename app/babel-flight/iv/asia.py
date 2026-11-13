"""Speaking tests of the other display languages: OPIc (한국어 display, English test) and CET-SET4 / CET-SET6
(大学英语四、六级口语考试, 简体中文 display). The texts for the learner are written in that display language; the
engine's own words come from the dictionaries (i18n/ko/iv.tsv, i18n/zh/iv.tsv). Original material.

OPIc: computer-based interview with an avatar; a background survey decides the topics. Self-introduction, then
combos of 2-3 questions on one topic (describe → routine → past experience), a role-play (ask questions → solve a
problem → a related experience) and an unexpected topic. Each question can be heard twice; no time limit per
answer (about 1-2 minutes is usual). Rated NL … AL.
CET-SET4: self-introduction (20 s) → read a short passage aloud (45 s to prepare, 1 min) → 2 short questions →
individual presentation (45 s to prepare, 1 min) → pair discussion (1 min to prepare, 3 min).
CET-SET6: self-introduction + a question → individual presentation (1 min to prepare, 1.5 min) + pair discussion
(3 min) → one more question. Graded A / B / C / D."""
from cards import S, CARD, HIDE, END_K, PREP, READ
from intl import ANS

PT = lambda t: {'k': 'say', 't': t, 'r': 'pt'}

# ================================================================ OPIc (한국어)
OPIC_PTS = ['도입 → 구체적인 예 → 마무리', '1~2분 정도, 자연스럽게 이어서 말하기']


def OPIC_SET(qs):
    """[(label, question, Korean meaning, model, tips or None)] in order"""
    steps, items = [], {}
    for j, (lb, q, ko, model, pts) in enumerate(qs):
        i = 'q%d' % (j + 1)
        steps += [S(q), ANS(i, 120, tip='1~2분. 시간 제한은 없지만 전체 40분')]
        items[i] = {'no': 'Q%d %s' % (j + 1, lb), 'pts': 5, 'q': q, 'ja': ko, 'model': [model], 'points': pts or OPIC_PTS}
    return {'card': {'title': 'OPIc'}, 'steps': steps, 'items': items}


INTRO = ('자기소개', "Let's start the interview now. Tell me something about yourself.", '자기소개를 해 주세요.',
         "Hi, my name is Minjun, and I'm a university student in Seoul. I'm majoring in business, and I'm in my third year. I live with my parents and my younger sister in an apartment near the Han River. In my free time, I like listening to music and riding my bike along the river. I'm a pretty outgoing person, so I enjoy meeting new people. After I graduate, I hope to work for an international company, so I'm trying hard to improve my English.",
         ['이름 → 하는 일 → 사는 곳 → 취미 → 앞으로의 목표', '외운 티가 나지 않게 자연스럽게'])
OPIC_SETS = [
  OPIC_SET([INTRO,
    ('음악 · 묘사', "You indicated in the survey that you listen to music. What kind of music do you like? Who are some of your favorite singers or bands?", '어떤 음악을 좋아하나요? 좋아하는 가수나 밴드는?',
     "I listen to all kinds of music, but my favorite is K-pop and some indie rock. I especially like a band called Day6, because their songs have really meaningful lyrics, and they actually play their own instruments. When I'm tired, their songs give me energy. I also listen to some old pop songs that my parents used to play when I was a kid, so I guess my taste is pretty mixed.", None),
    ('음악 · 루틴', "When and where do you usually listen to music? Describe a typical day when you listen to music.", '보통 언제, 어디에서 음악을 듣나요? 하루의 흐름을 설명해 주세요.',
     "I usually listen to music on my way to school. It takes about forty minutes by subway, so I put on my earphones as soon as I leave home. In the afternoon, I listen to calm music while I'm studying at the library. Then at night, before I go to bed, I listen to something relaxing. So basically, music is with me all day long.", None),
    ('음악 · 경험', "Tell me about a memorable experience related to music, such as a concert you went to. What happened, and why was it so memorable?", '음악과 관련된 기억에 남는 경험을 말해 주세요.',
     "Last summer, I went to an outdoor music festival with my friends. It was really hot, and we waited in line for almost two hours. But when my favorite band came on stage, everyone started singing along, and I totally forgot about the heat. Then suddenly it started to rain, but nobody left. We just kept dancing in the rain. It was one of the best days of my life.", ['과거 시제로', '언제 → 무슨 일 → 왜 기억에 남는지']),
    ('자전거 · 묘사', "You said that you ride a bicycle. Where do you usually go cycling? Describe the place for me.", '보통 어디에서 자전거를 타나요? 그곳을 묘사해 주세요.',
     "I usually ride along the Han River. There's a long bike path that goes all the way across the city. On one side, you can see the river, and on the other side, there are parks and convenience stores. In the evening, the bridges light up, and the view is really beautiful. There are always a lot of people jogging or having picnics, so it feels lively.", None),
    ('자전거 · 루틴', "What do you usually do to get ready before you go cycling? Tell me about your routine.", '자전거를 타기 전에 보통 무엇을 하나요?',
     "Before I go, I check the weather first, because riding in the rain is dangerous. Then I check the tires and the brakes. I always wear a helmet and bring a bottle of water. I also make a playlist for the ride. Usually I leave around six in the evening, when it's not too hot, and ride for about an hour.", None),
    ('자전거 · 경험', "Tell me about a time when something unexpected happened while you were cycling. What happened, and how did you deal with it?", '자전거를 타다가 예상치 못한 일이 있었던 경험은?',
     "One time, I got a flat tire when I was really far from home. I didn't have any tools, and my phone battery was almost dead. I was kind of panicking, but luckily, another cyclist stopped and helped me. He had a repair kit and fixed it in ten minutes. Since then, I always carry a small repair kit with me.", ['문제 → 해결 → 그 후 달라진 점']),
    ('롤플레이 · 질문하기', "I'd like to give you a situation and ask you to act it out. You are planning a trip to Jeju Island and want to book a hotel. Call the hotel and ask three or four questions about the rooms.", '롤플레이: 제주도 호텔에 전화해서 객실에 대해 3~4가지 질문하기',
     "Hi, I'm calling because I'd like to book a room for next weekend. First, do you have any double rooms available from Friday to Sunday? And how much is it per night? Also, is breakfast included in the price? One more thing, do you have a room with an ocean view? And finally, is there free parking at the hotel? Thank you so much.", ['인사 → 전화한 이유 → 질문 3~4개', 'Do you have … / Is … included? / How much …?']),
    ('롤플레이 · 문제 해결', "I'm sorry, but there is a problem I need you to resolve. When you arrive at the hotel, the staff says your reservation is not in the system. Explain the situation and offer two or three alternatives to solve the problem.", '롤플레이: 예약이 안 되어 있다는 문제를 설명하고 해결책 2~3가지 제안하기',
     "Hi, I booked a double room for two nights last week, but you're saying my reservation isn't in the system. I have the confirmation email right here on my phone. Could you check again with my phone number? If there's really no record, could you give me a similar room at the same price? Or if the hotel is full, could you help me find another hotel nearby? I'd really appreciate your help.", ['상황 설명 → 증거 → 대안 2~3개', 'Could you …? 로 정중하게']),
    ('롤플레이 · 관련 경험', "Have you ever had a problem with a reservation, like at a hotel or a restaurant? Tell me what happened and how you solved it.", '예약과 관련해 문제가 있었던 경험이 있나요?',
     "Yes, it happened last year on my birthday. I booked a table at an Italian restaurant, but when we arrived, they said they had no reservation for us. I showed them the text message, and the manager apologized. They didn't have a table at that moment, so they gave us free drinks while we waited for about twenty minutes. In the end, it was fine.", None),
    ('돌발 · 재활용', "Let's talk about something different. How do people recycle in your country? Describe the recycling system.", '돌발 주제: 한국의 재활용 방법을 설명해 주세요.',
     "In Korea, recycling is really strict. We have to separate plastic, paper, cans and glass, and food waste goes in a special bag. In my apartment, there's a recycling area, and we can take things out only on certain days of the week. If you don't separate things properly, you can get a fine. It's a bit annoying, but I think it's a good system.", None),
    ('돌발 · 변화', "How has recycling changed compared to the past? Tell me about any changes you have noticed.", '과거와 비교해 재활용은 어떻게 바뀌었나요?',
     "When I was a kid, people didn't separate their trash that much. Now, everyone is much more careful. For example, these days, we have to remove the labels from plastic bottles before we throw them away. Also, a lot of cafés don't give out plastic straws anymore. I think people have become more aware of environmental problems.", ['과거(used to) vs 현재(these days)']),
  ]),
  OPIC_SET([INTRO,
    ('영화 · 묘사', "In the survey, you indicated that you like watching movies. What kinds of movies do you like, and why?", '어떤 영화를 좋아하나요? 이유는?',
     "I like action movies and also animated movies. Action movies are exciting, and they help me forget about stress. Animated movies, especially Japanese ones, have really beautiful scenes and warm stories. I usually watch movies on weekends. If a movie gets good reviews, I go to the theater, but most of the time I watch them at home.", None),
    ('영화 · 루틴', "Describe what you usually do when you go to the movies, from the beginning to the end.", '영화를 보러 갈 때 보통 무엇을 하나요? 처음부터 끝까지 설명해 주세요.',
     "First, I check the reviews online and book tickets with an app. I usually go with my best friend. We meet about thirty minutes early and buy popcorn and drinks. After the movie, we go to a café and talk about the story. Sometimes we disagree about the ending, and that's actually the most fun part.", None),
    ('영화 · 경험', "Tell me about the most memorable movie you have ever seen. What was it about, and why do you remember it?", '가장 기억에 남는 영화는? 왜 기억에 남나요?',
     "The most memorable movie for me is a documentary about a pilot who flew around the world in a small plane. I watched it with my father when I was in high school. There were so many problems during the trip, but she never gave up. After watching it, I started to think more seriously about my dreams. That's why I still remember it.", None),
    ('공원 · 묘사', "You said that you go to parks. Describe a park you often go to. What does it look like?", '자주 가는 공원을 묘사해 주세요.',
     "There's a big park near my house called Olympic Park. It has huge lawns, a lake and a lot of sculptures. In the spring, there are cherry blossoms everywhere, and in the fall, the trees turn yellow and red. There are walking trails and bike paths, and on weekends, there are sometimes concerts. It's my favorite place to relax.", None),
    ('공원 · 루틴', "What do you usually do when you go to the park? Tell me about a typical visit.", '공원에 가면 보통 무엇을 하나요?',
     "Usually I go there on Sunday mornings. I walk around the lake for about an hour while listening to a podcast. Then I sit on a bench and read a book or just watch people. Sometimes I meet my friends there, and we play badminton. On the way home, I usually stop at a bakery and buy some bread.", None),
    ('공원 · 경험', "Tell me about a special day you had at a park. What happened?", '공원에서 있었던 특별한 하루를 말해 주세요.',
     "Last spring, my family had a picnic in the park to celebrate my grandmother's seventieth birthday. We prepared lots of food, and my sister and I made a cake. While we were eating, a street musician started playing near us, and he even played a birthday song for my grandmother. She was so happy that she cried a little. I'll never forget that day.", None),
    ('롤플레이 · 질문하기', "Let me give you a situation to act out. You want to buy a new smartphone. Go to an electronics store and ask the clerk three or four questions about the phone you want.", '롤플레이: 휴대폰 매장에서 점원에게 3~4가지 질문하기',
     "Hi, I'm looking for a new smartphone. I'm interested in this model. How long does the battery last? And how much storage does it have? Also, does it come in other colors, like blue or green? Lastly, is there any discount if I trade in my old phone? Thanks for your help.", ['Is there …? / Does it …? / How long …?']),
    ('롤플레이 · 문제 해결', "I'm sorry, but there is a problem. After you bought the phone, you found out that it doesn't charge. Call the store, explain the problem, and suggest two or three ways to solve it.", '롤플레이: 산 휴대폰이 충전되지 않는 문제를 설명하고 해결책 제안하기',
     "Hello, I bought a smartphone at your store yesterday, but it won't charge at all. I tried a different cable and charger, but it still doesn't work. Could I exchange it for a new one? If you don't have the same model in stock, could I get a refund? Or, if you can repair it within two or three days, that would be okay too. Please let me know what's possible.", None),
    ('롤플레이 · 관련 경험', "Have you ever bought something that didn't work properly? Tell me what happened and what you did about it.", '산 물건이 제대로 작동하지 않았던 경험은?',
     "Yes, I once bought wireless earphones online, and the right one didn't make any sound. I contacted the seller and sent a video showing the problem. They apologized and sent me a new pair, but it took almost two weeks. Since then, I prefer to buy electronics at a store, so I can exchange them right away.", None),
    ('돌발 · 계절', "Let's talk about the weather. Describe the seasons in your country. What is the weather like in each season?", '돌발 주제: 한국의 계절과 날씨를 설명해 주세요.',
     "Korea has four distinct seasons. Spring is warm, and flowers bloom everywhere, but there's a lot of fine dust. Summer is hot and humid, and we have a rainy season in July. Fall is my favorite season, because the sky is clear and the weather is cool. Winter is very cold and dry, and sometimes it snows.", None),
    ('돌발 · 변화', "How has the weather in your country changed compared to when you were a child?", '어렸을 때와 비교해 날씨는 어떻게 바뀌었나요?',
     "I think summers have become much hotter. When I was a kid, we didn't use the air conditioner that often, but now we can't live without it. Also, spring and fall feel shorter than before. It seems like it goes from winter to summer very quickly. I think climate change is the reason.", ['예전(used to) vs 요즘']),
  ]),
]
OPIC = {
    'grade': 'OPIc', 'tier': 2, 'minutes': 40, 'lang': 'en-US', 'unit': 'セット', 'att': False, 'pardon': 'Replay',
    'exs': [['Eva', 'f']], 'roles': {}, 'ui': 'ko',
    'varies': '두 가지 세트 중에서 고를 수 있어요. ',
    'origNote': '질문은 Babel Flight가 만든 것입니다(흐름은 실제 시험과 같아요. 실제로는 7번 문제 뒤에 난이도를 다시 고릅니다). ',
    'markNote': '채점은 실제 등급과 다른, 스스로 매기는 기준입니다.',
    'voiceNote': '질문은 이 기기의 음성으로 읽어 줍니다. 실제 시험에서도 질문은 두 번까지 들을 수 있어요(Replay). ',
    'subNote': '질문 영어 표시(실제 시험에서는 표시되지 않아요)', 'hideNote': '(질문을 읽고 있어요. 영어는 표시하지 않음)', 'ansNote': '영어로 대답해 보세요',
    'sumNote': '실제 시험은 전체 답변을 보고 NL~AL 등급을 매깁니다. 70%를 넘으면 IM2~IM3 정도의 느낌이에요.',
    'againNote': '같은 질문으로 한 번 더',
    'flow': ['자기소개', '설문 주제 콤보(묘사 → 루틴 → 경험)× 2', '롤플레이(질문하기 → 문제 해결 → 관련 경험)', '돌발 주제'],
    'open': [S("Hi, I'm Eva. I'll be asking you some questions today. Please answer as completely as you can.")],
    'close': [S("Thank you. That's the end of the interview."), END_K],
    'items': {}, 'cards': OPIC_SETS, 'pools': {},
}

# ================================================================ CET-SET4 / CET-SET6 (简体中文)
def CET4_SET(passage, pts, qs, pres, pres_m, disc, talk):
    steps = [
        S("Good morning. Welcome to the CET Spoken English Test. Now, let's start with self-introduction. Please introduce yourself."), ANS('intro', 20, '自我介绍'),
        S("Thank you. Now, let's move on to Part Two. You'll read a short passage aloud. You have forty-five seconds to prepare."),
        dict(CARD, show='passage'), PREP(45, '准备'), S("Please begin."), READ(60), HIDE,
        S("Thank you. Now, Part Three. I'll ask you two questions about the passage."), S(qs[0][0]), ANS('a1', 20), S(qs[1][0]), ANS('a2', 20),
        S("Thank you. Now, Part Four. You'll give a short presentation. You have forty-five seconds to prepare."),
        dict(CARD, show='cue'), PREP(45, '准备'), S("Please begin."), ANS('pres', 60, tip='1分钟'), HIDE,
        S("Thank you. Now, Part Five. You'll discuss a topic with your partner. You have one minute to prepare."),
        dict(CARD, show='role0'), PREP(60, '准备'),
    ]
    items = {'read': {'no': '短文朗读', 'pts': 5, 'points': pts},
             'intro': {'no': '自我介绍', 'pts': 2, 'q': 'Please introduce yourself.', 'ja': '20秒自我介绍', 'model': ["Good morning. My name is Li Ming, and I'm a sophomore majoring in computer science. I'm interested in technology, and I enjoy playing basketball in my free time."], 'points': ['姓名 → 专业 → 爱好']},
             'a1': {'no': '简短回答 1', 'pts': 3, 'q': qs[0][0], 'ja': qs[0][1], 'model': [qs[0][2]], 'points': ['直接回答,再加一句理由']},
             'a2': {'no': '简短回答 2', 'pts': 3, 'q': qs[1][0], 'ja': qs[1][1], 'model': [qs[1][2]], 'points': ['直接回答,再加一句理由']},
             'pres': {'no': '个人陈述', 'pts': 6, 'q': pres['t'], 'ja': '根据提示做1分钟陈述', 'model': [pres_m], 'points': ['观点 → 理由/例子 → 总结', '覆盖所有提示']}}
    for j, (line, cue, model) in enumerate(talk):
        i = 'd%d' % (j + 1)
        steps += [PT(line), ANS(i, 30, cue=cue)]
        items[i] = {'no': '两人互动 %d' % (j + 1), 'pts': 3, 'q': line, 'ja': cue, 'model': [model], 'points': ['回应对方 → 提出自己的看法', '用问题把讨论继续下去']}
    steps.append(HIDE)
    return {'card': {'title': 'CET-SET4', 'passage': passage, 'cue': {'t': pres['t'], 'b': pres['b'], 'e': pres['e']},
                     'roles': [{'title': 'Part 5: Pair discussion', 'setting': disc[0], 'task': disc[1]}]}, 'steps': steps, 'items': items}


CET4_SETS = [
  CET4_SET(
    "Many college students today take part-time jobs. Some work in cafés or shops, while others teach children or help with online projects. A part-time job can help students earn money and learn how to manage their time. It also gives them a chance to develop skills that are useful after graduation, such as communication and teamwork. However, students should be careful not to spend too much time working. If they work too many hours, they may feel tired in class and their grades may suffer. Finding a good balance between study and work is the key.",
    ['意群停顿(However, / such as …)', 'part-time / graduation / balance 的发音', '语速适中,不要太快'],
    [('What can students learn from a part-time job?', '学生可以从兼职中学到什么?', 'They can learn how to manage their time, and they can develop skills like communication and teamwork.'),
     ('What may happen if students work too many hours?', '如果学生工作时间太长,会怎样?', 'They may feel tired in class, and their grades may suffer.')],
    {'t': 'Talk about a skill you would like to learn at college.', 'b': ['what the skill is', 'why you want to learn it', 'how you plan to learn it'], 'e': 'and how it will help you in the future.'},
    "The skill I'd most like to learn at college is public speaking. Right now, I get nervous when I speak in front of a lot of people, and my voice shakes. I want to learn it because almost every job needs good presentation skills. My plan is to join the debate club and practice speaking in English every week. I'll also record myself and watch the videos to improve. I believe this skill will help me in job interviews and in my future career.",
    ('Your university plans to build either a new gym or a new library. Discuss with your partner which one is better for students.', ['Give your opinion and reasons.', "Respond to your partner's ideas.", 'Try to reach an agreement.']),
    [("I think a new gym would be better. Many students don't get enough exercise. What do you think?", '先表达自己的观点(支持图书馆)并说明理由', "I see your point, but I'd prefer a new library. Our library is always crowded during exam weeks, and it's hard to find a seat."),
     ("That's true, but a gym is also good for students' mental health. Studying all day is stressful.", '承认对方的观点,再补充自己的理由', "I agree that exercise helps reduce stress. But a library is useful for every student, while not everyone uses a gym."),
     ("Hmm, maybe we could have a library with a small exercise room?", '回应并尝试达成一致', "That's a great idea. A library with a small fitness area would meet both needs. Let's suggest that to the university.")]),
  CET4_SET(
    "Online learning has become very popular in recent years. With a computer or a smartphone, students can attend classes from anywhere and study at their own pace. They can also watch recorded lectures again and again until they understand them. However, online learning has some disadvantages. It is easy to get distracted at home, and students may feel lonely without classmates around them. In addition, it is harder to ask teachers questions immediately. Therefore, many experts believe that the best approach is to combine online learning with traditional classes.",
    ['However, / In addition, / Therefore, 之后稍作停顿', 'distracted / immediately / approach 的发音', '句尾语调自然下降'],
    [('What are the advantages of online learning mentioned in the passage?', '文中提到了在线学习的哪些优点?', 'Students can study from anywhere at their own pace, and they can watch recorded lectures again.'),
     ('What do many experts think is the best approach?', '很多专家认为最好的方法是什么?', 'They think the best approach is to combine online learning with traditional classes.')],
    {'t': 'Talk about the best place to study on your campus.', 'b': ['where it is', 'what it is like', 'when you usually go there'], 'e': 'and why it is good for studying.'},
    "For me, the best place to study on campus is the reading room on the fifth floor of the library. It's quiet, bright and has big windows facing the lake. I usually go there in the morning, when there are not many people. There are power outlets at every desk, so I can use my laptop. Most importantly, everyone around me is studying hard, which motivates me to concentrate. That's why it's my favorite place to study.",
    ('Your class is planning a weekend trip. Discuss with your partner whether to go hiking in the mountains or visit a museum in the city.', ['Give your opinion and reasons.', "Respond to your partner's ideas.", 'Decide together.']),
    [("I'd like to go hiking. We spend all week indoors. How about you?", '表达自己的观点(选择博物馆)并说明理由', "Hiking sounds nice, but I'm worried about the weather. The forecast says it might rain this weekend, so a museum may be safer."),
     ("Good point. But a museum might be boring for some classmates.", '回应,并提出解决方法', "That's true. We could choose an interactive science museum. There are lots of hands-on activities, so it won't be boring."),
     ("OK, and if the weather is nice next time, we can go hiking then.", '同意并总结', "Sounds perfect. So this weekend we'll visit the science museum, and we'll plan a hiking trip for next month.")]),
]


def CET6_SET(q1, pres, pres_m, disc, talk, q3):
    steps = [
        S("Good afternoon. Welcome to the CET Spoken English Test. First, please introduce yourself."), ANS('intro', 20, '自我介绍'),
        S(q1[0]), ANS('q1', 30),
        S("Thank you. Now, Part Two. First, you'll give a presentation. You have one minute to prepare."),
        dict(CARD, show='cue'), PREP(60, '准备'), S("Please begin."), ANS('pres', 90, tip='1分30秒'), HIDE,
        S("Thank you. Now, you'll discuss a topic with your partner."), dict(CARD, show='role0'),
    ]
    items = {'intro': {'no': '自我介绍', 'pts': 2, 'q': 'Please introduce yourself.', 'ja': '20秒自我介绍', 'model': ["Good afternoon. I'm Wang Fang, a junior majoring in international trade. I'm interested in cross-cultural communication, and in my spare time I enjoy photography and traveling."], 'points': ['简洁、自然']},
             'q1': {'no': '问答', 'pts': 3, 'q': q1[0], 'ja': q1[1], 'model': [q1[2]], 'points': ['回答 + 理由或例子']},
             'pres': {'no': '个人陈述', 'pts': 8, 'q': pres['t'], 'ja': '根据提示做1分30秒陈述', 'model': [pres_m], 'points': ['观点明确', '两个理由,各有例子', '总结']},
             'q3': {'no': '问答(Part 3)', 'pts': 4, 'q': q3[0], 'ja': q3[1], 'model': [q3[2]], 'points': ['深入一点:原因、影响、建议']}}
    for j, (line, cue, model) in enumerate(talk):
        i = 'd%d' % (j + 1)
        steps += [PT(line), ANS(i, 35, cue=cue)]
        items[i] = {'no': '讨论 %d' % (j + 1), 'pts': 3, 'q': line, 'ja': cue, 'model': [model], 'points': ['回应对方 → 提出自己的看法', '用问题把讨论继续下去']}
    steps += [HIDE, S("Thank you. Now, Part Three. " + q3[0]), ANS('q3', 45)]
    return {'card': {'title': 'CET-SET6', 'cue': {'t': pres['t'], 'b': pres['b'], 'e': pres['e']},
                     'roles': [{'title': 'Pair discussion', 'setting': disc[0], 'task': disc[1]}]}, 'steps': steps, 'items': items}


CET6_SETS = [
  CET6_SET(
    ('What do you usually do to relax after a busy week?', '忙碌的一周后,你通常怎么放松?', "I usually go for a long walk in the park or watch a movie with my roommates. It helps me clear my mind and get ready for the next week."),
    {'t': 'Should college students be required to take part in volunteer work?', 'b': ['your opinion', 'the benefits or problems', 'an example from your experience'], 'e': 'and a conclusion.'},
    "In my opinion, volunteer work should be encouraged, but it shouldn't be required. On the one hand, volunteering has many benefits. Students can develop a sense of responsibility and learn skills that they can't learn in the classroom. For example, last year I taught English to children in a rural school for two weeks, and it made me much more patient. On the other hand, if volunteering becomes compulsory, some students may do it only to get credits, without real enthusiasm. That would not help the people they are supposed to serve. So I think universities should offer more opportunities and rewards, but leave the final choice to students.",
    ('Many young people now prefer to work in big cities, while others choose to go back to their hometowns. Discuss with your partner the advantages and disadvantages of both choices.', ['Share your views.', "Respond to your partner's points.", 'Try to come to a conclusion.']),
    [("I think big cities offer more job opportunities and higher salaries. That's why I want to stay in a big city.", '回应对方,并指出大城市的缺点', "That's true, but the cost of living in big cities is very high. Housing alone can take half of a young person's salary."),
     ("Well, that's a problem. But small towns often don't have the jobs we studied for.", '承认对方的观点,补充回家乡的优点', "I agree that's a challenge. However, with remote work, more jobs can be done from anywhere. And in your hometown, you can stay close to your family."),
     ("So maybe it depends on the person's career and priorities?", '表示同意并总结', "Exactly. It depends on the industry and what people value most. Young people should think carefully about their long-term goals before deciding.")],
    ('Do you think the government should do more to help young people find jobs? Why?', '你认为政府应该做更多来帮助年轻人就业吗?为什么?', "Yes, I do. The government could provide more training programs and support for small businesses, which create a lot of jobs. It could also help graduates in rural areas get internships. These measures would reduce unemployment and make society more stable.")),
  CET6_SET(
    ('How often do you use social media, and what do you use it for?', '你多久用一次社交媒体?用来做什么?', "I use it every day, mainly to keep in touch with my friends and to follow news about technology. I try to limit it to about an hour a day."),
    {'t': 'Is artificial intelligence a help or a threat to college students?', 'b': ['your opinion', 'how students use AI', 'possible problems'], 'e': 'and what students should do.'},
    "I believe artificial intelligence is mainly a help to college students, as long as we use it wisely. Today, many students use AI tools to search for information, check their grammar or get explanations of difficult concepts. For instance, when I didn't understand a statistics problem, an AI tool explained it to me step by step, which saved me a lot of time. However, there are also risks. Some students simply copy answers from AI and stop thinking for themselves, and the information AI gives is not always correct. Therefore, students should use AI as a learning partner, not as a replacement for their own work, and always check important facts.",
    ('Some people think university students should live on campus, while others prefer to rent an apartment off campus. Discuss the pros and cons with your partner.', ['Share your views.', "Respond to your partner's points.", 'Reach a conclusion.']),
    [("Living on campus is cheaper and more convenient. You can walk to class in five minutes.", '回应,并提出校外住宿的优点', "That's a good point. But living off campus gives you more privacy and freedom. In a dorm, it's hard to study when your roommates are noisy."),
     ("True, but living off campus can make you feel isolated from campus life.", '承认对方观点,并补充', "I agree. Campus activities are an important part of college. Maybe students who live off campus need to make more effort to join clubs."),
     ("So which do you think is better for first-year students?", '给出结论', "For first-year students, I think living on campus is better, because it helps them make friends and adapt to college life. Later, they can choose for themselves.")],
    ('How do you think universities can better prepare students for their future careers?', '你认为大学怎样才能更好地帮助学生为将来的职业做准备?', "Universities could offer more internships and invite professionals to share their experience. They could also teach practical skills like teamwork and communication, not just theory. This would help students move smoothly from campus to the workplace.")),
]
CET_COMMON = {
    'lang': 'en-US', 'unit': 'セット', 'att': False, 'ui': 'zh',
    'exs': [['the examiner', 'f'], ['the examiner', 'm']], 'roles': {'pt': {'av': '🧑‍🎓', 'name': '搭档(模拟)'}},
    'origNote': '题目为 Babel Flight 原创(流程和时间与正式考试相同)。正式考试两人一组,这里由“搭档”的声音模拟。',
    'markNote': '评分是自己打分的参考,与正式成绩不同。',
    'voiceNote': '考官和搭档的英语由本设备的语音朗读。',
    'subNote': '显示英文(正式考试不显示)', 'hideNote': '(考官正在说话,英文不显示)', 'ansNote': '请用英语回答',
    'sumNote': '正式考试成绩分为 A、B、C、D 四个等级。超过70%说明准备得不错。',
    'againNote': '同一套题再练一次',
    'close': [S("Thank you. That's the end of the test."), END_K], 'open': [], 'items': {}, 'pools': {},
}
CET4 = dict(CET_COMMON, **{
    'grade': 'CET-SET4', 'tier': 1, 'minutes': 15, 'varies': '两套题可以选择。',
    'flow': ['Part 1 自我介绍(20秒)', 'Part 2 短文朗读(准备45秒,朗读1分钟)', 'Part 3 简短回答(2个问题)', 'Part 4 个人陈述(准备45秒,陈述1分钟)', 'Part 5 两人互动(准备1分钟,讨论3分钟)'],
    'cards': CET4_SETS,
})
CET6 = dict(CET_COMMON, **{
    'grade': 'CET-SET6', 'tier': 2, 'minutes': 15, 'varies': '两套题可以选择。',
    'flow': ['Part 1 自我介绍和问答', 'Part 2 个人陈述(准备1分钟,陈述1分30秒)+ 两人讨论(3分钟)', 'Part 3 问答'],
    'cards': CET6_SETS,
})
ASIA = {'opic': OPIC, 'cetset4': CET4, 'cetset6': CET6}
