# 英検3級 模試 第2回 (オリジナル問題). Format: see SPEC['ek3'] in build.py.
from mxh import G, L, B

TEST = {
    'R': [
        {'type': 'gap', 'items': [
            G('A: Have you finished your homework (　)?\nB: No, not yet.', ['already', 'yet', 'still', 'ever'], 1,
              '疑問文の「もう」は yet。答えの not yet(まだです)もヒントです。'),
            G('This is the (　) interesting book that I have ever read.', ['very', 'more', 'much', 'most'], 3,
              'the most + 形容詞で最上級。that I have ever read は「今までに読んだ中で」。'),
            G('My sister can speak English (　) than me.', ['good', 'well', 'better', 'best'], 2,
              'than があるので比較級。well の比較級は better です。'),
            G('The man (　) a red cap is my uncle.', ['wear', 'wearing', 'worn', 'wears'], 1,
              '「赤い帽子をかぶっている男性」。〜ing が後ろから名詞(The man)を説明しています。'),
            G('A: Whose umbrella is this?\nB: It\'s (　). I left it here this morning.', ['my', 'me', 'mine', 'I'], 2,
              '「私のもの」は mine。'),
            G('I was very (　) to hear that you won the contest.', ['happy', 'happily', 'happiness', 'happen'], 0,
              'be happy to ～ で「～してうれしい」。気持ちの原因を不定詞で表します。'),
            G('Please be careful. The road is (　) because of the snow.', ['slippery', 'sleepy', 'salty', 'sunny'], 0,
              'slippery=すべりやすい。雪のせいで道がすべりやすくなっています。'),
            G('We will have a barbecue if it (　) tomorrow.', ['won\'t rain', 'doesn\'t rain', 'didn\'t rain', 'not rain'], 1,
              'if の中では、未来のことも現在形で表します。'),
            G('Tom is good at (　) pictures.', ['draw', 'drew', 'drawn', 'drawing'], 3,
              '前置詞 at のあとは動名詞(～ing)。be good at ～ing で「～するのが得意」。'),
            G('A: What time does the movie (　)?\nB: At three thirty.', ['begin', 'beginning', 'began', 'begun'], 0,
              'does があるので、あとの動詞は原形です。'),
            G('Ken got up late this morning, so he (　) the train.', ['caught', 'missed', 'took', 'rode'], 1,
              'miss the train で「電車に乗り遅れる」。寝坊したので乗り遅れました。'),
            G('This bridge is (　) for its beautiful view at night.', ['famous', 'popular', 'favorite', 'different'], 0,
              'be famous for ～ で「～で有名だ」。'),
            G('My grandmother lives (　) a small town near the sea.', ['at', 'on', 'to', 'in'], 3,
              '町や国のような広い場所の前は in。'),
            G('The students were (　) about the school trip.', ['exciting', 'excited', 'excite', 'excites'], 1,
              '人が「わくわくしている」ときは excited。exciting は「(物事が)わくわくさせる」。'),
            G('I\'ll call you (　) I arrive at the station.', ['when', 'what', 'which', 'who'], 0,
              'when=～するとき。「駅に着いたら電話するね」。'),
        ]},
        {'type': 'dgap', 'items': [
            G('Boy: Do you want to play tennis after school?\nGirl: (　) I have to go to the dentist.',
              ['Sorry, I can\'t.', 'Yes, let\'s.', 'I like tennis.', 'It was fun.'], 0,
              '歯医者に行かなければならない、と続くので断っています。'),
            G('Mother: Where are you going, Mike?\nSon: To the library. (　)\nMother: OK. Be home by six.',
              ['It was closed.', 'I read it yesterday.', 'I\'ll be back before dinner.', 'It\'s far from here.'], 2,
              '母が「6時までに帰ってね」と答えているので、「夕食前に帰るよ」がつながります。'),
            G('Clerk: May I help you?\nCustomer: Yes. (　)\nClerk: Sure. The fitting room is over there.',
              ['How much is this?', 'Can I try this on?', 'I\'ll pay by card.', 'Do you have a bag?'], 1,
              '店員が試着室の場所を教えているので「試着してもいいですか」。'),
            G('Girl: I\'m going to Kyoto with my family this weekend.\nBoy: That\'s nice. (　)\nGirl: For three days.',
              ['How will you get there?', 'Who will you go with?', 'Where will you stay?', 'How long will you stay there?'], 3,
              'For three days.(3日間)と答えているので、期間をたずねる How long。'),
            G('Man: Excuse me. Is there a bank near here?\nWoman: (　) Go straight and turn left at the corner.',
              ['I don\'t know it.', 'Yes, there is one on Green Street.', 'It closes at three.', 'No, thank you.'], 1,
              'あとに道順の説明が続くので「はい、グリーン通りにあります」。'),
        ]},
        {'type': 'passage', 'blocks': [
            B('[A]', 'notice', '''Summer Cooking Class for Kids
at Sakura Community Center

Let's make curry and rice and a fruit salad together!

Date: Saturday, August 2
Time: 10:00 a.m. to 1:00 p.m.
For: Students from 10 to 15 years old
Price: 800 yen (food included)

Please bring an apron and a towel.
After cooking, we will eat lunch together.
Only 20 students can join, so please call us by July 25.''', [
                G('What will the students do after cooking?', ['Go shopping.', 'Eat lunch together.', 'Clean the center.', 'Take a cooking test.'], 1,
                  'After cooking, we will eat lunch together. とあります。'),
                G('Students who want to join the class must', ['bring some food.', 'be older than 15.', 'call the center by July 25.', 'pay 1,000 yen.'], 2,
                  'please call us by July 25 とあります。食材は料金にふくまれています。'),
            ], title='Summer Cooking Class'),
            B('[B]', 'email', '''From: Ryan Clark
To: Haruto Sato
Date: November 10
Subject: My trip to Japan

Hi Haruto,
Great news! My family is going to visit Japan in December. We'll stay in Tokyo for four days, and then we'll go to Hokkaido by plane. I've never seen snow before, so I'm really excited. What kind of clothes should I bring? I live in Australia, and December is summer here, so I don't have a warm coat.
Also, can we meet in Tokyo? I'd like to try real Japanese ramen with you.
Your friend,
Ryan

From: Haruto Sato
To: Ryan Clark
Date: November 11
Subject: Re: My trip to Japan

Hi Ryan,
That's wonderful! Hokkaido is very cold in December, so you'll need a warm coat, gloves and a hat. You should also wear boots, because the roads can be slippery. You don't have to buy everything in Australia. There are many cheap clothing stores in Tokyo, and I can take you to one.
Of course we can meet! There's a famous ramen shop near my house. Let's go there, and then go shopping for your coat.
Haruto''', [
                G('Where does Ryan live?', ['In Tokyo.', 'In Hokkaido.', 'In Australia.', 'In Canada.'], 2,
                  'I live in Australia とあります。'),
                G('Why is Ryan excited?', ['He will see snow for the first time.', 'He will buy a new coat.', 'He will go back to Australia.', 'He will eat ramen for the first time.'], 0,
                  'I\'ve never seen snow before, so I\'m really excited. とあります。'),
                G('What will Haruto and Ryan do in Tokyo?', ['Go skiing.', 'Eat ramen and go shopping.', 'Fly to Hokkaido together.', 'Visit Haruto\'s school.'], 1,
                  'ラーメン屋に行ってから、コートを買いに行こうと書いています。'),
            ]),
            B('[C]', 'text', '''Junko Tabei was born in Fukushima in 1939. She was a small and weak child. When she was ten years old, her teacher took her class to climb Mt. Nasu. Junko was surprised by the beautiful view from the top, and she started to love mountains.
After she finished university, Junko climbed many mountains in Japan. At that time, many people thought that mountain climbing was only for men. So in 1969, she started a climbing club for women.
In 1975, Junko and her team tried to climb Mt. Everest, the highest mountain in the world. During the climb, a big snow slide hit their tents, and Junko was hurt. But she did not give up. Twelve days later, on May 16, she reached the top. She was the first woman in the world to climb Mt. Everest.
Later, she became the first woman to climb the highest mountain on each of the seven continents. She also worried about the trash that climbers left on mountains, so she worked hard to keep mountains clean.
After the big earthquake in 2011, Junko took high school students from Tohoku to climb Mt. Fuji every summer. She wanted to give them hope. Junko died in 2016, but many people still remember her love of mountains.''', [
                G('What happened when Junko was ten years old?', ['She moved to Tokyo.', 'She climbed a mountain with her class.', 'She started a climbing club.', 'She became sick.'], 1,
                  '10歳のとき、先生がクラスを那須岳に連れて行きました。'),
                G('Why did Junko start a climbing club for women?', ['Many people thought climbing was only for men.', 'Her teacher asked her to.', 'She wanted to make money.', 'She wanted to climb Mt. Fuji.'], 0,
                  '登山は男性のものだと考える人が多かったからです。'),
                G('What happened during the climb of Mt. Everest?', ['Junko lost her way.', 'The team ran out of food.', 'A snow slide hit their tents.', 'Junko decided to go home.'], 2,
                  'a big snow slide hit their tents(雪崩がテントをおそった)とあります。'),
                G('What did Junko do after the earthquake in 2011?', ['She cleaned Mt. Everest.', 'She climbed seven mountains.', 'She wrote a book.', 'She took students to climb Mt. Fuji.'], 3,
                  '東北の高校生を毎年夏に富士山に連れて行きました。'),
                G('What is this story about?', ['A woman who loved mountains and did not give up.', 'The history of Mt. Everest.', 'A teacher who climbed Mt. Nasu.', 'How to keep mountains clean.'], 0,
                  '山を愛し、困難にあってもあきらめなかった女性の話です。'),
            ], title='Junko Tabei'),
        ]},
        {'type': 'email',
         'prompt': 'あなたは、外国人の友達(Sam)から以下のEメールを受け取りました。Eメールを読み、それに対する返信メールを英文で書きなさい。\nあなたが書く返信メールの中で、友達(Sam)からの2つの質問に対応する内容を、あなた自身で自由に考えて答えなさい。\n返信は「Hi, Sam! Thank you for your e-mail.」で始まり「Best wishes,」で終わります(この部分は書かなくてよい)。',
         'body': 'Hi!\nI heard you started a new hobby. I want to know about it. What is your new hobby? And when do you usually do it?\nYour friend,\nSam',
         'rules': ['語数の目安は15語〜25語です。', '2つの質問(新しい趣味は何か・ふだんいつするか)の両方に答えましょう。'],
         'model': 'My new hobby is taking pictures of airplanes. I usually do it on Sunday mornings at the airport near my house.',
         'checks': ['新しい趣味が何か(質問1)に答えている', 'ふだんいつするか(質問2)に答えている', '語数が15〜25語になっている', '主語と動詞がある文になっている(My new hobby is … など)', 'ふだんのことなので現在形を使っている']},
        {'type': 'opinion',
         'prompt': 'あなたは、外国人の知り合いから以下のQUESTIONをされました。QUESTIONについて、あなたの考えとその理由を2つ英文で書きなさい。\n\nQUESTION\nWhich do you like better, going to the sea or going to the mountains?',
         'rules': ['語数の目安は25語〜35語です。', '理由は2つ書きましょう。', 'QUESTIONに答えていない場合や、内容がQUESTIONからずれている場合は、0点と採点されることがあります。'],
         'model': 'I like going to the mountains better. I have two reasons. First, I can enjoy beautiful views from the top. Second, it is cooler than the sea in summer.',
         'checks': ['最初の文でどちらが好きか答えている', '理由を2つ書いている', 'First, … Second, … のようにつないでいる', '語数が25〜35語になっている', 'スペルや文法のミスがない']},
    ],
    'L': [
        {'type': 'resp', 'items': [
            L('G: Mom, I\'m going to Emi\'s house.\nW: Will you be home for dinner?\nG: Yes. What are we having?', '',
              ['Curry and rice.', 'At six o\'clock.', 'With your father.'], 0,
              '夕食に何を食べるか聞かれているので、料理名で答えます。', pic='👧🏠👩'),
            L('B: Excuse me. Is this the bus to the city hall?\nW: No, it isn\'t.\nB: Which bus should I take?', '',
              ['It\'s very crowded.', 'Take the number 5 bus.', 'I\'m going to the bank.'], 1,
              'Which bus(どのバス)なので、乗るバスを答えます。', pic='👦🚌👩'),
            L('M: What are you reading, Kate?\nG: A book about space.\nM: Is it interesting?', '',
              ['I bought it last week.', 'It\'s my brother\'s.', 'Yes, I can\'t stop reading it.'], 2,
              'おもしろいかと聞かれて「やめられないほど」と答えています。', pic='👨📖👧'),
            L('W: Hello, Green Hotel.\nM: Hi. I\'d like to book a room for this Friday.\nW: For how many people?', '',
              ['Just one.', 'For two nights.', 'At about five.'], 0,
              'For how many people?(何人ですか)なので人数で答えます。', pic='👩☎️👨'),
            L('B: I can\'t find my math notebook.\nG: Did you look in your locker?\nB: Not yet.', '',
              ['I have two notebooks.', 'Then go and check it now.', 'Math is my favorite.'], 1,
              'まだロッカーを見ていない→「じゃあ今見ておいで」。', pic='👦📓👧'),
            L('G: This cake is delicious!\nB: Thanks. I made it myself.\nG: Really? Can you teach me how to make it?', '',
              ['It was my birthday.', 'I bought it at a shop.', 'Sure. It\'s easy.'], 2,
              '作り方を教えてほしい→「いいよ、簡単だよ」。', pic='👧🍰👦'),
            L('M: Are you ready to order?\nW: Yes. I\'ll have the chicken salad.\nM: Anything to drink?', '',
              ['An orange juice, please.', 'No, I\'m not hungry.', 'It looks good.'], 0,
              '飲み物を聞かれているので、飲み物を注文します。', pic='👨📋👩'),
            L('B: Grandma, I\'m going to the park.\nW: It\'s very cold today.\nB: I know.', '',
              ['The park is big.', 'I went there yesterday.', 'Then wear your scarf.'], 2,
              '寒い日に出かける孫に「マフラーをしていきなさい」。', pic='👦🧣👵'),
            L('W: Hi, Ben. How was the soccer game?\nB: We lost.\nW: Oh, that\'s too bad.', '',
              ['It was on Saturday.', 'We\'ll do better next time.', 'I\'m on the team.'], 1,
              '残念だったね→「次はもっとがんばるよ」。', pic='👩⚽👦'),
            L('G: Dad, can I use your computer?\nM: What for?\nG: I need to check something for my homework.', '',
              ['OK, but don\'t use it too long.', 'I bought it last year.', 'It\'s in my room.'], 0,
              '宿題のためと聞いて「いいよ、でも長く使わないでね」。', pic='👧💻👨'),
        ]},
        {'type': 'dlg', 'items': [
            L('B: Mom, have you seen my soccer shoes?\nW: They were by the front door this morning.\nB: They aren\'t there now.\nW: Maybe your father put them in the garage.',
              'Where might the boy\'s soccer shoes be?', ['By the front door.', 'In his room.', 'In the garage.', 'At school.'], 2,
              '「お父さんがガレージに入れたのかも」と言っています。'),
            L('G: Mr. Brown, when is the English test?\nM: It\'s next Thursday.\nG: Will it be difficult?\nM: Not if you study chapter four.',
              'When is the English test?', ['This Thursday.', 'Next Thursday.', 'Next Tuesday.', 'Next Friday.'], 1,
              'It\'s next Thursday. と言っています。'),
            L('W: Excuse me, how much are these apples?\nM: They\'re one hundred yen each, or five for four hundred yen.\nW: I\'ll take five, please.\nM: Thank you.',
              'How much will the woman pay?', ['100 yen.', '400 yen.', '500 yen.', '1,000 yen.'], 1,
              '5個で400円です。1個100円×5=500円ではありません。'),
            L('B: What are you doing this weekend, Lucy?\nG: I\'m going to visit my grandparents in Nagano.\nB: How will you get there?\nG: By train. It takes about two hours.',
              'How will Lucy go to Nagano?', ['By car.', 'By bus.', 'By plane.', 'By train.'], 3,
              'By train. と答えています。'),
            L('M: Hello, this is Dr. Smith\'s office.\nW: Hi. I\'d like to see the doctor today. I have a bad headache.\nM: Can you come at four?\nW: Yes, that\'s fine.',
              'Why is the woman calling?', ['To make a doctor\'s appointment.', 'To cancel her appointment.', 'To ask about medicine.', 'To talk to her friend.'], 0,
              '頭痛がひどいので、今日みてもらう予約をしています。'),
            L('G: Did you finish the science report?\nB: Almost. I just need to draw a graph.\nG: When do we have to give it to Ms. Ito?\nB: Tomorrow morning.',
              'What does the boy still need to do?', ['Write the report.', 'Draw a graph.', 'Talk to Ms. Ito.', 'Read a book.'], 1,
              'I just need to draw a graph. と言っています。'),
            L('W: Jack, it\'s raining. Take your umbrella.\nB: I can\'t find it, Mom.\nW: Then take mine. It\'s next to the door.\nB: Thanks.',
              'Whose umbrella will Jack take?', ['His own.', 'His father\'s.', 'His mother\'s.', 'His friend\'s.'], 2,
              'Then take mine.(じゃあ私のを持っていって)と母が言っています。'),
            L('M: Are you going to the summer festival tonight?\nG: Yes. I\'m going to wear a yukata.\nM: That sounds nice. What time does it start?\nG: At six thirty.',
              'What will the girl wear?', ['A T-shirt.', 'A school uniform.', 'A raincoat.', 'A yukata.'], 3,
              'I\'m going to wear a yukata. と言っています。'),
            L('B: Excuse me. I bought this shirt yesterday, but it\'s too small.\nW: Would you like a bigger one?\nB: Yes, please.\nW: Here\'s a large one.',
              'What is the boy\'s problem?', ['His shirt is too big.', 'His shirt is too small.', 'He lost his shirt.', 'He doesn\'t like the color.'], 1,
              'it\'s too small(小さすぎる)と言っています。'),
            L('G: Let\'s eat lunch in the park.\nB: Good idea. Should we buy sandwiches first?\nG: I made rice balls for both of us.\nB: Great, thanks!',
              'What will they eat for lunch?', ['Sandwiches.', 'Hamburgers.', 'Rice balls.', 'Pizza.'], 2,
              '女の子が2人分のおにぎりを作ってきました。'),
        ]},
        {'type': 'mono', 'items': [
            L('B: Yesterday was my mother\'s birthday. My sister and I made a cake for her. It didn\'t look very good, but my mother said it was the best cake in the world.',
              'What did the boy and his sister do for their mother?', ['They bought flowers.', 'They made a cake.', 'They cleaned the house.', 'They wrote a letter.'], 1,
              'My sister and I made a cake for her. とあります。'),
            L('N: Welcome to Green Park Zoo. The panda house will close at three today because of cleaning. The elephant show starts at two in front of the gift shop. Enjoy your day.',
              'What time will the panda house close today?', ['At one.', 'At two.', 'At three.', 'At four.'], 2,
              'The panda house will close at three today とあります。2時はゾウのショーです。'),
            L('G: I joined the brass band this year. I play the trumpet. It was difficult at first, but now I can play three songs. Our first concert is in December.',
              'What instrument does the girl play?', ['The piano.', 'The drums.', 'The guitar.', 'The trumpet.'], 3,
              'I play the trumpet. とあります。'),
            L('M: Every morning, I take the train to work. It\'s always crowded, so I usually stand and listen to English lessons on my phone. I want to travel to London next year.',
              'What does the man do on the train?', ['He reads the newspaper.', 'He sleeps.', 'He listens to English lessons.', 'He plays games.'], 2,
              'listen to English lessons on my phone とあります。'),
            L('W: Last weekend, my family went camping by a lake. We wanted to go fishing, but it was too windy. So we played cards in the tent. It was still a lot of fun.',
              'Why didn\'t the family go fishing?', ['It was too windy.', 'It was raining.', 'They forgot the fishing rods.', 'The lake was closed.'], 0,
              'it was too windy(風が強すぎた)とあります。'),
            L('B: I usually go to school by bike. But tomorrow, I have to go by bus because my bike is broken. My father will fix it on Sunday.',
              'Why will the boy go to school by bus tomorrow?', ['It will rain.', 'His bike is broken.', 'He will get up late.', 'His school is far.'], 1,
              'because my bike is broken とあります。'),
            L('N: Thank you for flying with Sky Airlines. We will arrive at Fukuoka Airport in about twenty minutes. The weather in Fukuoka is sunny, and the temperature is eighteen degrees.',
              'When will the plane arrive at Fukuoka Airport?', ['In about twenty minutes.', 'In about ten minutes.', 'In about thirty minutes.', 'In about one hour.'], 0,
              'in about twenty minutes(約20分後)とあります。'),
            L('G: My favorite season is winter. I like skiing, and my family goes to Nagano every January. This year, my best friend Aya is going to come with us.',
              'Who will go to Nagano with the girl\'s family this year?', ['Her teacher.', 'Her cousin.', 'Her grandmother.', 'Her friend Aya.'], 3,
              'my best friend Aya is going to come with us とあります。'),
            L('W: I work at a flower shop. On Mother\'s Day, we are very busy. Many people buy red carnations. This year, we sold more than five hundred.',
              'What do many people buy on Mother\'s Day?', ['Roses.', 'Red carnations.', 'Sunflowers.', 'Tulips.'], 1,
              'Many people buy red carnations. とあります。'),
            L('B: Last night, I watched a TV program about the moon. I learned that people first walked on the moon in 1969. I want to be an astronaut in the future.',
              'What does the boy want to be?', ['A scientist.', 'A pilot.', 'An astronaut.', 'A TV reporter.'], 2,
              'I want to be an astronaut in the future. とあります。'),
        ]},
    ],
}
