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
# ---- OPIc: sets 3〜5 (original) ----
OPIC_SETS += [
  OPIC_SET([INTRO,
    ('국내 여행 · 묘사', "You indicated in the survey that you like to travel in your country. Tell me about a place in Korea that you like to visit. What is it like?", '국내에서 좋아하는 여행지를 묘사해 주세요.',
     "One of my favorite places is Gangneung, on the east coast. It takes about two hours from Seoul by KTX. There's a long, beautiful beach, and the water is really clear. Near the beach, there's a street full of coffee shops, so people call it a coffee town. I love sitting by the window of a café and just looking at the sea. It's the perfect place to relax.", None),
    ('국내 여행 · 루틴', "What do you usually do to prepare for a trip? Tell me everything you do, from the beginning to the end.", '여행 준비를 할 때 보통 무엇을 하나요?',
     "First, I decide where to go with my friends. Then we book train tickets and a guesthouse online, usually a few weeks before the trip. After that, I search for good restaurants and make a simple plan, but not too detailed. The night before the trip, I pack my bag. I always bring a portable charger, a light jacket and comfortable shoes.", None),
    ('국내 여행 · 경험', "Tell me about a trip that didn't go as planned. What happened, and how did you handle it?", '계획대로 되지 않았던 여행 경험을 말해 주세요.',
     "Last year, I went to Busan with my friends, but a typhoon came on the second day. All the outdoor plans were canceled, and we were stuck in our guesthouse. At first, we were really disappointed. But then we found a small board game café nearby and spent the whole afternoon there. We also tried a famous pork soup restaurant. In the end, it became one of our funniest trips.", ['문제 → 해결 → 그 후 느낀 점']),
    ('카페 · 묘사', "You said that you go to coffee shops. Describe a coffee shop you often go to. What does it look like?", '자주 가는 카페를 묘사해 주세요.',
     "There's a small café near my school that I go to almost every day. It's on the second floor, so you can see the street through big windows. The walls are white, and there are a lot of plants everywhere. They play calm jazz music, so it's a nice place to study. My favorite drink there is an iced vanilla latte.", None),
    ('카페 · 루틴', "What do you usually do when you go to a coffee shop? Tell me about a typical visit.", '카페에 가면 보통 무엇을 하나요?',
     "I usually go in the afternoon after my classes. First, I order a drink and find a seat near an outlet. Then I open my laptop and do my assignments for about two hours. Sometimes my friends join me, and we take a break and chat. Before I leave, I usually buy a piece of cake to take home.", None),
    ('카페 · 경험', "Tell me about a memorable experience you had at a coffee shop.", '카페에서 기억에 남는 경험을 말해 주세요.',
     "One day, I was studying at a café when I spilled my coffee all over my laptop. I panicked, but the staff came right away with lots of tissues and helped me clean it. Luckily, the laptop still worked. They even gave me a new coffee for free. Since then, I always put my drink far away from my laptop, and I go to that café even more often.", ['문제 → 해결 → 그 후 달라진 점']),
    ('롤플레이 · 질문하기', "I'd like to give you a situation and ask you to act it out. You want to join a fitness center near your home. Call the fitness center and ask three or four questions to get the information you need.", '롤플레이: 헬스장에 전화해서 3~4가지 질문하기',
     "Hi, I'm thinking about joining your fitness center, so I have a few questions. First, what are your opening hours on weekends? Also, how much is a monthly membership? Is there a discount if I sign up for three months? And do you offer any group classes, like yoga or spinning? Lastly, is there a shower room and lockers? Thanks a lot.", ['인사 → 목적 → 질문 3~4개 → 감사']),
    ('롤플레이 · 문제 해결', "I'm sorry, but there is a problem I need you to resolve. You signed up for a yoga class, but when you arrive, you find out that the class has been canceled. Talk to the staff, explain the situation and suggest two or three alternatives.", '롤플레이: 요가 수업이 취소된 문제를 설명하고 대안 2~3가지 제시하기',
     "Hi, I came for the seven o'clock yoga class, but I just heard it's been canceled. I didn't get any message about it, and I came straight from work. Could I join another yoga class tonight or tomorrow instead? If that's not possible, could you add one extra class to my membership? Or maybe I could get a discount for this month. Please let me know.", ['상황 설명 → 대안 2~3가지']),
    ('롤플레이 · 관련 경험', "Have you ever had a problem with a class or an event that was canceled at the last minute? What happened, and how did you deal with it?", '수업이나 행사가 갑자기 취소된 경험이 있나요?',
     "Yes, last spring my friends and I bought tickets for an outdoor concert, but it was canceled two hours before it started because of heavy rain. We were already on the way, so we were really upset. We got a full refund a few days later. Instead of going home, we went to a nearby restaurant and listened to the band's songs together. It wasn't the same, but it was still fun.", ['배경 → 문제 → 해결 → 느낀 점']),
    ('돌발 · 교통', "Let's talk about something different. What is public transportation like in your country? Describe the buses and subways.", '돌발 주제: 한국의 대중교통을 묘사해 주세요.',
     "Public transportation in Korea is really convenient. In Seoul, the subway goes almost everywhere, and trains come every few minutes. Buses are color-coded, so it's easy to know where they're going. You can use one transportation card for both buses and the subway, and you get a discount when you transfer. It's also clean and safe, even late at night.", None),
    ('돌발 · 변화', "How has public transportation changed compared to the past? Tell me about the changes you have noticed.", '과거와 비교해 대중교통은 어떻게 바뀌었나요?',
     "When I was little, I had to pay with cash on the bus, and there was no information about when the bus would come. These days, there are screens at bus stops that show the arrival time, and I can check everything on my phone. Many buses are now electric, so they're quieter and cleaner. I think it's become much more comfortable.", ['과거(used to) → 지금 → 내 생각']),
  ]),
  OPIC_SET([INTRO,
    ('요리 · 묘사', "You indicated in the survey that you like cooking. What kind of food do you like to cook? Describe a dish you are good at.", '자주 만드는 요리를 묘사해 주세요.',
     "I really enjoy cooking Korean food, and my best dish is kimchi fried rice. It's simple, but it tastes amazing. I fry kimchi with some pork and green onions, then add rice and a little gochujang. At the end, I put a fried egg on top and sprinkle some sesame seeds. It's my go-to meal when I'm hungry late at night.", None),
    ('요리 · 루틴', "Tell me about the steps you usually take when you cook a meal at home, from shopping to cleaning up.", '집에서 요리할 때의 과정을 처음부터 끝까지 말해 주세요.',
     "First, I check what's in the fridge and make a short list. Then I go to the supermarket near my apartment to buy fresh vegetables and meat. When I get home, I wash and cut everything before I start cooking, so it goes smoothly. After I eat, I wash the dishes right away and wipe the kitchen counter. I don't like leaving a mess.", None),
    ('요리 · 경험', "Tell me about a time when you cooked something special for other people. What happened?", '다른 사람들을 위해 특별한 요리를 했던 경험을 말해 주세요.',
     "Last year, I made a birthday dinner for my mom. I wanted to surprise her, so I cooked seaweed soup, japchae and grilled fish while she was out. I'd never made japchae before, so I watched a video three times. The noodles got a little too soft, but my mom said it was the best birthday dinner ever. I felt really proud.", ['배경 → 한 일 → 결과와 느낌']),
    ('공연 · 묘사', "You said that you go to see performances. Tell me about a theater or concert hall you have been to. What was it like?", '가 본 공연장을 묘사해 주세요.',
     "I've been to a concert hall in the Olympic Park in Seoul a few times. It's a huge round building, and it can hold thousands of people. Inside, the stage is really big, and there are giant screens on both sides, so you can see the performers even from the back. Outside, there's a big park, so people often take pictures before the show.", None),
    ('공연 · 루틴', "What do you usually do before and after you watch a performance?", '공연을 보기 전과 후에 보통 무엇을 하나요?',
     "Before the show, I usually meet my friends and have dinner nearby. We arrive at the hall about thirty minutes early to buy some merchandise and find our seats. After the show, we always go to a café and talk about our favorite moments. Then I post a few pictures on social media before I go to bed.", None),
    ('공연 · 경험', "Tell me about the most memorable performance you have ever seen.", '가장 기억에 남는 공연을 말해 주세요.',
     "The most memorable one was a musical I saw with my sister for her graduation. We got seats in the second row, so we could see the actors' faces clearly. In the last scene, the main actor sang a song about following your dreams, and my sister started crying. Afterward, we waited outside and got the actor's autograph. It was a really special day for both of us.", ['언제 · 누구와 → 무엇을 · 어땠는지']),
    ('롤플레이 · 질문하기', "I'd like to give you a situation and ask you to act it out. You want to buy a new smartphone. Go to a store and ask the salesperson three or four questions about the phone you want.", '롤플레이: 휴대폰 매장에서 점원에게 3~4가지 질문하기',
     "Hi, I'm looking for a new smartphone. Could you tell me about this model? First, how long does the battery last? And how good is the camera, especially at night? I'd also like to know if it comes in other colors. One more thing, is there any discount if I trade in my old phone? Thank you.", ['인사 → 목적 → 질문 3~4개 → 감사']),
    ('롤플레이 · 문제 해결', "I'm sorry, but there is a problem I need you to resolve. A few days after you bought the phone, the screen stopped working. Go to the store, explain the problem and suggest two or three ways to solve it.", '롤플레이: 산 지 며칠 된 휴대폰 화면이 고장 난 문제를 해결하기',
     "Hi, I bought this phone here three days ago, but the screen suddenly stopped working this morning. I didn't drop it or get it wet. I have the receipt with me. Could you exchange it for a new one? If you don't have the same model in stock, could you give me a full refund? Or at least, could you lend me a phone while it's being repaired?", ['문제 설명 → 대안 2~3가지']),
    ('롤플레이 · 관련 경험', "Have you ever bought something that turned out to be broken or different from what you expected? Tell me what happened.", '산 물건이 고장 났거나 기대와 달랐던 경험이 있나요?',
     "Yes, I once ordered a jacket online, but when it arrived, it was much smaller than the size on the website. I contacted the seller and sent them pictures. They apologized and told me to send it back for free. A week later, I got the right size. Since then, I always read the reviews about sizes before I buy clothes online.", ['배경 → 문제 → 해결 → 배운 점']),
    ('돌발 · 은행', "Let's talk about something different. How do people in your country usually use banks? Describe what people do at the bank.", '돌발 주제: 한국 사람들은 은행을 어떻게 이용하나요?',
     "These days, most people in Korea use banking apps on their phones. You can send money to friends in a few seconds, pay bills and even open an account without visiting a bank. People still go to the bank for more complicated things, like getting a loan. Older people also visit the bank more often, because they're more comfortable talking to staff in person.", None),
    ('돌발 · 변화', "How has banking changed over the years? Tell me about the changes you have noticed.", '은행 이용은 예전과 어떻게 달라졌나요?',
     "When I was a child, my parents had to wait in line at the bank for a long time, and they kept a paper bankbook. Now, almost everything can be done on a phone, and many bank branches have closed. Cash is used much less, too. It's very convenient, but I think it can be difficult for elderly people who aren't used to smartphones.", ['과거(used to) → 지금 → 내 생각']),
  ]),
  OPIC_SET([INTRO,
    ('조깅 · 묘사', "You indicated in the survey that you go jogging. Where do you usually jog? Describe the place.", '보통 조깅하는 곳을 묘사해 주세요.',
     "I usually jog in a park near my apartment. There's a running track that goes around a small lake, and it's about two kilometers long. There are tall trees along the track, so it's shady even in summer. In the morning, there are a lot of people walking their dogs or doing exercises. The air is fresh, and I can hear birds singing.", None),
    ('조깅 · 루틴', "When do you usually go jogging, and what do you do before and after? Tell me about your routine.", '조깅을 하기 전후의 루틴을 말해 주세요.',
     "I usually jog three times a week, early in the morning before school. First, I drink a glass of water and do some stretching for about five minutes. Then I put on my earphones and run for about thirty minutes. After that, I walk slowly to cool down and stretch again. When I get home, I take a shower and eat a big breakfast.", None),
    ('조깅 · 경험', "Tell me about a memorable experience you had while jogging or exercising.", '조깅이나 운동을 하다가 기억에 남는 경험을 말해 주세요.',
     "Last spring, I ran my first ten-kilometer race with my older brother. At around the seventh kilometer, I got a cramp in my leg and almost gave up. My brother slowed down and ran with me until the end. We finished in just over an hour. It wasn't a great time, but crossing the finish line together was an amazing feeling.", ['배경 → 문제 → 결과 → 느낀 점']),
    ('집 · 묘사', "You said that you live in an apartment. Describe your home for me. What does it look like?", '살고 있는 집을 묘사해 주세요.',
     "I live in an apartment on the twelfth floor with my family. When you open the door, there's a living room with a big sofa and a TV. The kitchen is right next to it. There are three bedrooms and two bathrooms. My room is small, but I love it because it has a big window, and I can see the mountains on a clear day.", None),
    ('집 · 루틴', "What do you usually do at home on weekends? Tell me about a typical weekend at home.", '주말에 집에서 보통 무엇을 하나요?',
     "On Saturday mornings, I sleep in until about ten. Then I help my parents clean the house. I usually vacuum the living room and clean my own room. In the afternoon, I watch a movie or play games. On Sunday evenings, my family orders fried chicken and we watch a variety show together. It's my favorite time of the week.", None),
    ('집 · 경험', "Tell me about a time when something went wrong at home, like a broken appliance. What happened, and how did you solve it?", '집에서 문제가 생겼던 경험을 말해 주세요.',
     "Last summer, our air conditioner suddenly broke during a heat wave. It was so hot that we couldn't sleep. We called the repair service, but they said they couldn't come for four days because they were too busy. So we bought two electric fans and slept in the living room together, like camping. When the repairman finally came, it only took him twenty minutes to fix it.", ['문제 → 해결 → 결과']),
    ('롤플레이 · 질문하기', "I'd like to give you a situation and ask you to act it out. A friend has invited you to a party. Call your friend and ask three or four questions about the party.", '롤플레이: 파티에 초대한 친구에게 전화해서 3~4가지 질문하기',
     "Hey, thanks for inviting me to your party! I just have a few questions. What time does it start, and how long will it last? Also, who else is coming? Should I bring anything, like drinks or snacks? And is there parking near your place, or should I take the subway? Let me know. I'm really looking forward to it.", ['인사 → 질문 3~4개 → 마무리']),
    ('롤플레이 · 문제 해결', "I'm sorry, but there is a problem I need you to resolve. On the day of the party, you suddenly can't go. Call your friend, explain the situation and suggest two or three alternatives.", '롤플레이: 파티에 갈 수 없게 된 상황을 설명하고 대안 제시하기',
     "Hi, it's me. I'm so sorry, but I can't come to your party tonight. My grandmother suddenly got sick, and I have to go to the hospital with my parents. I feel really bad about it. How about I take you out for dinner next weekend instead? Or I could come over tomorrow and help you clean up. Anyway, I'll send you a little present. Have a great time tonight.", ['사과 → 이유 → 대안 2~3가지']),
    ('롤플레이 · 관련 경험', "Have you ever had to cancel a plan with a friend at the last minute? Tell me what happened.", '친구와의 약속을 갑자기 취소해야 했던 경험이 있나요?',
     "Yes, once I had to cancel a movie date with my best friend because I had a high fever. I called her an hour before we were supposed to meet. She wasn't angry at all. In fact, she came to my house with some porridge and medicine. We watched a movie on my laptop instead. That's when I realized what a good friend she is.", ['배경 → 일어난 일 → 느낀 점']),
    ('돌발 · 인터넷', "Let's talk about something different. How do people in your country use the internet in their daily lives?", '돌발 주제: 한국 사람들은 일상에서 인터넷을 어떻게 사용하나요?',
     "In Korea, the internet is part of almost everything. People use it to order food, shop, watch videos and even see a doctor online. The internet is really fast, and there's free Wi-Fi in most places, like subways and cafés. Many people also work or study online. Honestly, it's hard to imagine a day without the internet here.", None),
    ('돌발 · 문제', "What are some problems caused by the internet? Tell me about a problem that people in your country are worried about.", '인터넷 때문에 생기는 문제는 무엇인가요?',
     "One big problem is that people spend too much time on their phones. Some students stay up late watching videos and can't focus in class. Another problem is fake news. False information spreads very quickly online, and some people believe it without checking. I think schools should teach students how to use the internet in a healthy and smart way.", ['문제 1 → 문제 2 → 내 생각']),
  ]),
]
OPIC = {
    'grade': 'OPIc', 'tier': 2, 'minutes': 40, 'lang': 'en-US', 'unit': 'セット', 'att': False, 'pardon': 'Replay',
    'exs': [['Eva', 'f']], 'roles': {}, 'ui': 'ko',
    'varies': '다섯 가지 세트 중에서 고를 수 있어요. ',
    'origNote': '질문은 Babel Flight가 만든 것입니다(흐름은 실제 시험과 같아요. 실제로는 7번 문제 뒤에 난이도를 다시 고릅니다). ',
    'markNote': '채점은 실제 등급과 다른, 스스로 매기는 기준입니다.',
    'voiceNote': '질문은 이 기기의 음성으로 읽어 줍니다. 실제 시험에서도 질문은 두 번까지 들을 수 있어요(Replay). ',
    'subNote': '질문 영어 표시(실제 시험에서는 표시되지 않아요)', 'hideNote': '(질문을 읽고 있어요. 영어는 표시하지 않음)', 'ansNote': '영어로 대답해 보세요',
    'sumNote': '실제 시험은 전체 답변을 보고 NL~AL 등급을 매깁니다. 70%를 넘으면 준비가 잘 되어 있는 편이에요.',
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
# ---- CET-SET4 / CET-SET6: sets 3〜5 (original) ----
CET4_SETS += [
  CET4_SET(
    "Many people like to keep pets, such as dogs and cats. Pets can make their owners feel less lonely, and walking a dog every day is good for health. Children who grow up with pets often learn to be responsible and kind. However, keeping a pet is not always easy. Owners need to spend time and money on food, cleaning and visits to the vet. Before getting a pet, people should think carefully about whether they can take care of it for many years.",
    ['However, / Before getting a pet, 之后稍作停顿', 'lonely / responsible / carefully 的发音', '意群之间自然停顿'],
    [('How can pets help their owners?', '宠物如何帮助主人?', 'Pets can make their owners feel less lonely, and walking a dog is good for their health.'),
     ('What should people think about before getting a pet?', '养宠物之前人们应该考虑什么?', 'They should think about whether they can take care of it for many years.')],
    {'t': 'Talk about a person who has influenced you a lot.', 'b': ['who the person is', 'what he or she is like', 'what you have learned from him or her'], 'e': 'and how he or she has changed you.'},
    "The person who has influenced me the most is my high school English teacher, Ms. Zhang. She was strict but very patient, and she always encouraged us to speak up in class, even when we made mistakes. From her, I learned that making mistakes is part of learning. Before I met her, I was too shy to speak English. Now I enjoy talking with foreign students, and I even joined the English club at college. She really changed the way I see learning.",
    ('Your class wants to raise money for a charity. Discuss with your partner whether to hold a second-hand book sale or a charity concert.', ['Give your opinion and reasons.', "Respond to your partner's ideas.", 'Try to reach an agreement.']),
    [("I think a charity concert would be more fun. Lots of students would come. What do you think?", '先表达自己的观点(支持旧书义卖)并说明理由', "A concert sounds exciting, but it needs a lot of preparation and equipment. A second-hand book sale is easier to organize, and it's also good for the environment."),
     ("That's true, but will people really buy old books?", '回应对方的担心,并说明理由', "I think so. Many students need cheap textbooks and novels. We could also sell them at very low prices, so they'd sell quickly."),
     ("OK. Maybe we could have a few students play music at the book sale, too.", '同意并总结', "That's a great idea. A book sale with some live music would attract more people and raise more money.")]),
  CET4_SET(
    "Sleep is very important for college students, but many of them do not get enough of it. Some stay up late to study for exams, while others spend hours on their phones before going to bed. Lack of sleep can make students feel tired in class and affect their memory. Experts suggest that young adults should sleep for seven to nine hours a night. Putting the phone away an hour before bedtime and going to bed at the same time every day can help students sleep better.",
    ['Lack of sleep / Experts suggest 之后稍作停顿', 'memory / suggest / bedtime 的发音', '数字 seven to nine 读清楚'],
    [('Why do many college students not get enough sleep?', '为什么很多大学生睡眠不足?', 'Some stay up late to study for exams, and others spend hours on their phones before bed.'),
     ('What can students do to sleep better?', '学生可以怎样提高睡眠质量?', 'They can put their phones away an hour before bedtime and go to bed at the same time every day.')],
    {'t': 'Talk about your favorite way to spend a weekend.', 'b': ['what you usually do', 'who you spend it with', 'why you enjoy it'], 'e': 'and how it helps you get ready for the next week.'},
    "My favorite way to spend a weekend is to go cycling with my roommates. On Saturday morning, we usually ride along the river near our campus for about two hours. Then we have lunch at a small noodle restaurant. I enjoy it because it's a great way to exercise and enjoy fresh air after studying all week. It also gives me time to talk with my friends. After a weekend like that, I feel relaxed and full of energy for the next week.",
    ('Your university is thinking about banning mobile phones in classrooms. Discuss with your partner whether this is a good idea.', ['Give your opinion and reasons.', "Respond to your partner's ideas.", 'Try to reach an agreement.']),
    [("I think banning phones is a good idea. Many students play games during class.", '先表达自己的观点(反对全面禁止)并说明理由', "I understand that, but phones can also be useful in class. We use them to look up words or to answer online quizzes."),
     ("Hmm, but it's hard for teachers to check what students are really doing.", '回应,并提出折中方案', "That's a fair point. Maybe students could keep their phones in their bags and only use them when the teacher allows it."),
     ("That sounds reasonable. Teachers could decide the rules for their own classes.", '同意并总结', "Exactly. So instead of a complete ban, each teacher can set clear rules about using phones in class.")]),
  CET4_SET(
    "Many college students choose to travel during the summer vacation. Traveling helps them learn about different cultures and see places they have only read about in books. It can also make them more independent, because they have to plan their trips and solve problems by themselves. However, traveling can be expensive. To save money, many students take trains instead of planes, stay in youth hostels, and travel with friends to share the costs.",
    ['However, / To save money, 之后稍作停顿', 'independent / expensive / hostels 的发音', '列举部分(trains … hostels … friends)的节奏'],
    [('How can traveling help college students?', '旅行对大学生有什么帮助?', 'It helps them learn about different cultures and become more independent.'),
     ('How do many students save money when they travel?', '很多学生旅行时怎样省钱?', 'They take trains instead of planes, stay in youth hostels, and travel with friends to share the costs.')],
    {'t': 'Talk about a place in your hometown that you would recommend to visitors.', 'b': ['where it is', 'what people can do there', 'the best time to visit'], 'e': 'and why you recommend it.'},
    "I'd recommend the old town in my hometown. It's in the center of the city, next to the river. There are narrow stone streets, traditional houses and many small shops selling local snacks and handicrafts. Visitors can take a boat ride on the river or try the famous rice noodles. The best time to visit is in spring, when the weather is mild and the flowers are blooming. I recommend it because it shows the history and culture of my hometown.",
    ('Your class is planning a trip for the summer vacation. Discuss with your partner whether to travel in China or go abroad.', ['Give your opinion and reasons.', "Respond to your partner's ideas.", 'Decide together.']),
    [("I'd really like to go abroad. It would be a great chance to practice English. How about you?", '先表达自己的观点(在国内旅行)并说明理由', "That sounds great, but going abroad is expensive, and getting visas takes time. There are also many beautiful places in China that we haven't visited yet."),
     ("That's true. But we could choose a nearby country, so the flights wouldn't be too expensive.", '回应,并提出具体建议', "That's a good point. But for a class trip, we need a plan that everyone can afford. How about Yunnan? It has amazing nature and many ethnic cultures."),
     ("Yunnan sounds wonderful. Maybe we can plan a trip abroad after graduation.", '同意并总结', "Great. So this summer we'll go to Yunnan, and we'll save money for a trip abroad after graduation.")]),
]
CET6_SETS += [
  CET6_SET(
    ('What kind of books do you like to read, and why?', '你喜欢读什么样的书?为什么?', "I like reading biographies, because I can learn from the experiences of successful people and how they dealt with difficulties."),
    {'t': 'Should people buy fewer things to protect the environment?', 'b': ['your opinion', 'the reasons', 'an example from daily life'], 'e': 'and a conclusion.'},
    "In my opinion, people should buy fewer things, especially things they don't really need. First, producing goods uses a lot of energy and natural resources, and it creates pollution. Second, many products are thrown away after being used only a few times, which creates a huge amount of waste. For example, many of my classmates buy new clothes during online shopping festivals, but they only wear them once or twice. If we think carefully before buying, we can save money and reduce waste at the same time. In conclusion, buying less is a simple but effective way for everyone to protect the environment.",
    ('Some people think it is better to work for a large company, while others prefer a small company or a start-up. Discuss the pros and cons with your partner.', ['Share your views.', "Respond to your partner's points.", 'Try to come to a conclusion.']),
    [("I'd rather work for a large company. The salary is usually higher, and the job is more stable.", '回应对方,并指出小公司的优点', "That's true, but in a small company you can take on more responsibility and learn many different skills quickly."),
     ("But small companies can be risky. Some of them close after a few years.", '承认风险,并补充自己的看法', "I agree that's a risk. Still, the experience you gain there can be very valuable, even if the company doesn't last."),
     ("So maybe it depends on what stage of your career you're at?", '表示同意并总结', "Exactly. Young graduates might learn more at a start-up, while people who want stability may prefer a large company.")],
    ('How can young people find a balance between work and personal life?', '年轻人怎样才能在工作和个人生活之间取得平衡?', "They should set clear boundaries, for example by not checking work messages late at night. It's also important to make time for exercise and friends, because a healthy life helps them work better."),
  ),
  CET6_SET(
    ('Who do you usually turn to when you have a problem? Why?', '遇到问题时,你通常向谁求助?为什么?', "I usually talk to my older sister, because she has had similar experiences and always gives me honest advice."),
    {'t': 'Is it necessary for college students to learn a second foreign language?', 'b': ['your opinion', 'the benefits or difficulties', 'an example'], 'e': 'and a conclusion.'},
    "I believe it's very useful, though not necessary for everyone. On the one hand, a second foreign language can open more doors in the job market, especially in international companies. It also helps us understand other cultures more deeply. For example, my roommate learned Spanish in her free time, and she got an internship at a company that trades with Latin America. On the other hand, learning a new language takes a lot of time, and some students are already very busy with their major courses. So in my view, students who are interested should be encouraged, but it shouldn't be required.",
    ('Many students now study in libraries, while others prefer studying in coffee shops. Discuss with your partner which place is better for studying.', ['Share your views.', "Respond to your partner's points.", 'Reach a conclusion.']),
    [("I prefer coffee shops. The atmosphere is relaxing, and I can get a drink whenever I want.", '回应,并说明图书馆的优点', "I see why you like that. But libraries are much quieter, and they have all the books and resources we need for research."),
     ("True, but sometimes libraries are too quiet. I feel sleepy there.", '承认对方的观点,并补充', "That's interesting. Some background noise can actually help people concentrate. But coffee shops can be crowded and expensive if you go every day."),
     ("So which do you think is better in the end?", '给出结论', "I think it depends on the task. For reading and research, the library is better, but for group discussions or light work, a coffee shop can be a good choice.")],
    ('What are the advantages and disadvantages of studying abroad?', '出国留学有哪些优点和缺点?', "Studying abroad helps students improve their language skills and become more independent. However, it's expensive, and some students feel lonely or find it hard to adapt to a new culture at first."),
  ),
  CET6_SET(
    ('What do you think is the most important quality of a good friend?', '你认为好朋友最重要的品质是什么?', "I think honesty is the most important quality. A good friend tells you the truth, even when it's not what you want to hear."),
    {'t': 'Should universities require students to take physical education classes every year?', 'b': ['your opinion', 'the reasons', 'an example'], 'e': 'and a conclusion.'},
    "In my opinion, universities should require physical education every year. First, many college students spend most of their day sitting in classrooms or in front of computers, so they don't get enough exercise. Second, regular exercise reduces stress and helps students concentrate on their studies. For example, when I was preparing for exams last term, playing badminton twice a week helped me sleep better and feel more positive. Some students may say they don't have time, but even one or two hours a week can make a big difference. Therefore, I believe PE classes are a good investment in students' health.",
    ('Some people think online shopping will replace shopping in physical stores. Discuss this with your partner.', ['Share your views.', "Respond to your partner's points.", 'Try to come to a conclusion.']),
    [("I think physical stores will disappear soon. Online shopping is cheaper and much more convenient.", '回应对方,并说明实体店的优点', "It's true that online shopping is convenient, but in a store you can try things on and get help from staff right away."),
     ("But many stores are already closing because people shop online.", '承认事实,并补充自己的看法', "That's right. However, some stores are changing. They offer experiences, like cafés or workshops, that you can't get online."),
     ("So maybe stores won't disappear, but they will change?", '表示同意并总结', "Exactly. Online and physical shopping will probably exist together, and successful stores will focus on giving customers a good experience.")],
    ('How do you think technology will change the way people work in the future?', '你认为科技将如何改变人们未来的工作方式?', "I think more people will work remotely, and AI will take over many repetitive tasks. So workers will need to keep learning new skills, especially creative and communication skills."),
  ),
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
    'grade': 'CET-SET4', 'tier': 1, 'minutes': 15, 'varies': '五套题可以选择。',
    'flow': ['Part 1 自我介绍(20秒)', 'Part 2 短文朗读(准备45秒,朗读1分钟)', 'Part 3 简短回答(2个问题)', 'Part 4 个人陈述(准备45秒,陈述1分钟)', 'Part 5 两人互动(准备1分钟,讨论3分钟)'],
    'cards': CET4_SETS,
})
CET6 = dict(CET_COMMON, **{
    'grade': 'CET-SET6', 'tier': 2, 'minutes': 15, 'varies': '五套题可以选择。',
    'flow': ['Part 1 自我介绍和问答', 'Part 2 个人陈述(准备1分钟,陈述1分30秒)+ 两人讨论(3分钟)', 'Part 3 问答'],
    'cards': CET6_SETS,
})
ASIA = {'opic': OPIC, 'cetset4': CET4, 'cetset6': CET6}
