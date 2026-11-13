# 英検3級 模試 第3回 (オリジナル問題). Format: see SPEC['ek3'] in build.py.
from mxh import G, L, B

TEST = {
    'R': [
        {'type': 'gap', 'items': [
            G('A: (　) do you go to the gym?\nB: Twice a week.', ['How much', 'How many', 'How often', 'How long'], 2,
              'Twice a week(週2回)と答えているので、回数・頻度をたずねる How often。'),
            G('The movie was so (　) that I fell asleep.', ['exciting', 'boring', 'surprising', 'interesting'], 1,
              '眠ってしまったので boring(退屈な)。so ～ that … は「とても～なので…」。'),
            G('I have two brothers. One lives in Osaka, and the (　) lives in Sapporo.', ['another', 'others', 'other', 'some'], 2,
              '2人のうち、一人は one、もう一人は the other。'),
            G('My father bought me a watch (　) in Switzerland.', ['make', 'made', 'making', 'makes'], 1,
              '「スイスで作られた時計」。過去分詞が後ろから名詞(a watch)を説明しています。'),
            G('A: Would you like (　) more tea?\nB: No, thank you.', ['some', 'any', 'many', 'few'], 0,
              '人に物をすすめる疑問文では some を使います。'),
            G('Emi practiced the piano every day, and she finally (　) the contest.', ['lost', 'gave', 'left', 'won'], 3,
              '毎日練習して「ついにコンテストで優勝した」。win の過去形は won。'),
            G('It is important (　) breakfast every morning.', ['eat', 'to eat', 'ate', 'eaten'], 1,
              'It is ～ to ….(…することは～だ)。'),
            G('The train was (　) because of the heavy snow.', ['delayed', 'delivered', 'decided', 'designed'], 0,
              'delayed=遅れた。大雪のせいで電車が遅れました。'),
            G('Mike has (　) been to Japan, but he wants to go there someday.', ['ever', 'never', 'already', 'just'], 1,
              'never=一度も～ない。「いつか行きたい」と続くので、まだ行ったことがありません。'),
            G('A: Can you tell me (　) to get to the museum?\nB: Take the number 3 bus.', ['where', 'what', 'how', 'when'], 2,
              'how to ～ で「～の仕方」。how to get to ～ は「～への行き方」。'),
            G('Sam is the (　) runner on our team.', ['fast', 'faster', 'more fast', 'fastest'], 3,
              'the があるので最上級。fast の最上級は fastest。'),
            G('Please (　) off your shoes before you come in.', ['take', 'put', 'turn', 'get'], 0,
              'take off で「(服やくつを)脱ぐ」。反対は put on。'),
            G('I couldn\'t answer the question because it was too (　).', ['easy', 'simple', 'difficult', 'short'], 2,
              '答えられなかった理由なので difficult(難しい)。'),
            G('The concert will (　) at the city hall next Sunday.', ['be held', 'hold', 'held', 'holding'], 0,
              'be held で「開かれる」(hold の受け身)。'),
            G('A: How about going to the zoo tomorrow?\nB: That (　) like fun.', ['looks', 'sounds', 'hears', 'feels'], 1,
              '相手の話を聞いて「楽しそうだね」は That sounds like fun.'),
        ]},
        {'type': 'dgap', 'items': [
            G('Girl: Your English is very good, Ken.\nBoy: Thanks. (　)\nGirl: That\'s why you speak so well.',
              ['I lived in Canada for three years.', 'I don\'t like English.', 'I\'ll study harder.', 'It\'s my first time.'], 0,
              '「だから上手なんだね」と続くので、上手な理由(カナダに住んでいた)が入ります。'),
            G('Man: Excuse me. Could you take our picture?\nWoman: (　) Say cheese!',
              ['No, I don\'t have one.', 'It\'s not mine.', 'Sure, I\'d be happy to.', 'I like pictures.'], 2,
              '「はい、チーズ!」と続くので、引き受けています。'),
            G('Boy: Mom, I\'m hungry. (　)\nMother: In about thirty minutes. Can you wait?',
              ['What are we having?', 'When will dinner be ready?', 'Who is cooking dinner?', 'Where is the kitchen?'], 1,
              '「30分くらいで」と時間を答えているので、When(いつ)の質問です。'),
            G('Woman: This T-shirt is nice. (　)\nClerk: It\'s 2,000 yen.',
              ['What color is it?', 'Do you have a larger one?', 'Can I try it on?', 'How much is it?'], 3,
              '値段を答えているので How much。'),
            G('Boy: I lost my wallet on the way to school.\nGirl: (　) You should go to the police station.',
              ['That\'s too bad.', 'That\'s great.', 'Me, too.', 'Here you are.'], 0,
              '財布をなくした友達に「それは大変だね」。'),
        ]},
        {'type': 'passage', 'blocks': [
            B('[A]', 'notice', '''Notice from the School Library

From next Monday, the library will open at 7:45 a.m., thirty minutes earlier than before.
Students can now borrow five books at a time for two weeks.

We also have a new corner for English books. There are more than 200 easy English stories, so please try them!

The library will be closed on Wednesday afternoon, November 12, because of a teachers' meeting.

If you have any questions, please ask Ms. Yamada.''', [
                G('What time will the library open from next Monday?', ['At 7:15 a.m.', 'At 7:45 a.m.', 'At 8:15 a.m.', 'At 8:45 a.m.'], 1,
                  'the library will open at 7:45 a.m. とあります。'),
                G('Why will the library be closed on November 12?', ['Because of a teachers\' meeting.', 'Because of new English books.', 'Because Ms. Yamada will be absent.', 'Because it will be cleaned.'], 0,
                  'because of a teachers\' meeting(職員会議のため)とあります。'),
            ], title='School Library'),
            B('[B]', 'email', '''From: Daniel Lee
To: Saki Mori
Date: February 3
Subject: Japan Day

Hi Saki,
How are you? Next month, my school is going to have a Japan Day. Each class will make a poster about Japanese culture. My class chose "school life in Japan." Could you send me some pictures of your school? I'd like to show my classmates your classroom and your club activities.
Also, what do Japanese students eat for lunch? Do you bring lunch from home?
Thanks,
Daniel

From: Saki Mori
To: Daniel Lee
Date: February 4
Subject: Re: Japan Day

Hi Daniel,
That sounds fun! I'll ask my teacher if I can take pictures at school. I think she will say yes. I'll send them to you next week.
At my school, we don't bring lunch from home. We eat school lunch in our classroom. Students take turns serving the food to their classmates. Today we had rice, fish, soup and a salad. After lunch, we clean the classroom together.
If you want, we can have a video call, and you can ask more questions.
Saki''', [
                G('What will Daniel\'s class make for Japan Day?', ['A video about Japan.', 'A poster about school life in Japan.', 'Some Japanese food.', 'A Japanese school lunch.'], 1,
                  'Each class will make a poster ～. My class chose "school life in Japan." とあります。'),
                G('What will Saki do before she takes pictures at school?', ['Ask her teacher.', 'Clean the classroom.', 'Call Daniel.', 'Eat lunch.'], 0,
                  'I\'ll ask my teacher if I can take pictures at school. とあります。'),
                G('What do students at Saki\'s school do after lunch?', ['They play outside.', 'They have a video call.', 'They clean the classroom.', 'They go home.'], 2,
                  'After lunch, we clean the classroom together. とあります。'),
            ]),
            B('[C]', 'text', '''Chuhachi Ninomiya was born in Ehime in 1866. As a young man, he served in the army. One day in 1889, he was eating lunch outside when he saw some crows. They were flying through the air without moving their wings. "Maybe people can fly in the same way," he thought.
Chuhachi started to make small model planes. In 1891, he made a model with wings like a crow's. It had a propeller that turned with a rubber band. When he tested it, the model flew through the air. This was more than ten years before the Wright brothers flew their plane in the United States.
Next, Chuhachi wanted to make a plane that could carry a person. He asked the army for money, but they did not help him. So he decided to save the money by himself. He worked very hard at a company that sold medicine.
However, a few years later, he learned that the Wright brothers had already flown a plane with a person in it in 1903. Chuhachi was very sad, and he stopped making his plane.
Later, many people around the world died in plane accidents. Chuhachi built a small shrine in Kyoto to pray for them. Today, many people visit it, and Chuhachi is remembered as one of Japan's first airplane inventors.''', [
                G('What gave Chuhachi the idea for his plane?', ['Pictures of planes from America.', 'Crows flying without moving their wings.', 'A book about flying.', 'A model plane from his friend.'], 1,
                  '羽を動かさずに飛ぶカラスを見て思いつきました。'),
                G('What happened in 1891?', ['Chuhachi saw some crows for the first time.', 'The army gave Chuhachi money.', 'Chuhachi\'s model plane flew.', 'The Wright brothers visited Japan.'], 2,
                  '1891年に作ったカラスのような翼の模型が空を飛びました。'),
                G('Why did Chuhachi work at a medicine company?', ['To save money for his plane.', 'To learn about medicine.', 'To help sick soldiers.', 'To meet the Wright brothers.'], 0,
                  '軍がお金を出してくれなかったので、自分でお金をためるためです。'),
                G('Why did Chuhachi stop making his plane?', ['He became sick.', 'The army told him to stop.', 'He did not have enough money.', 'The Wright brothers had already flown.'], 3,
                  'ライト兄弟がすでに人を乗せて飛んでいたと知ったからです。'),
                G('What did Chuhachi build in Kyoto?', ['An airport.', 'A medicine company.', 'A shrine.', 'A school for pilots.'], 2,
                  '飛行機事故で亡くなった人のために小さな神社を建てました。'),
            ], title='Chuhachi Ninomiya'),
        ]},
        {'type': 'email',
         'prompt': 'あなたは、外国人の友達(Chris)から以下のEメールを受け取りました。Eメールを読み、それに対する返信メールを英文で書きなさい。\nあなたが書く返信メールの中で、友達(Chris)からの2つの質問に対応する内容を、あなた自身で自由に考えて答えなさい。\n返信は「Hi, Chris! Thank you for your e-mail.」で始まり「Best wishes,」で終わります(この部分は書かなくてよい)。',
         'body': 'Hi!\nI heard you went to a museum last Sunday. Which museum did you go to? And what did you see there?\nYour friend,\nChris',
         'rules': ['語数の目安は15語〜25語です。', '2つの質問(どの博物館に行ったか・何を見たか)の両方に答えましょう。'],
         'model': 'I went to the science museum in Ueno with my father. We saw a big model of a rocket. It was really exciting.',
         'checks': ['どの博物館に行ったか(質問1)に答えている', '何を見たか(質問2)に答えている', '語数が15〜25語になっている', '主語と動詞がある文になっている(We saw … など)', '過去のことなので過去形を使っている']},
        {'type': 'opinion',
         'prompt': 'あなたは、外国人の知り合いから以下のQUESTIONをされました。QUESTIONについて、あなたの考えとその理由を2つ英文で書きなさい。\n\nQUESTION\nWhich do you like better, eating at home or eating at restaurants?',
         'rules': ['語数の目安は25語〜35語です。', '理由は2つ書きましょう。', 'QUESTIONに答えていない場合や、内容がQUESTIONからずれている場合は、0点と採点されることがあります。'],
         'model': 'I like eating at home better. I have two reasons. First, my mother\'s cooking is delicious. Second, I can relax and talk with my family.',
         'checks': ['最初の文でどちらが好きか答えている', '理由を2つ書いている', 'First, … Second, … のようにつないでいる', '語数が25〜35語になっている', 'スペルや文法のミスがない']},
    ],
    'L': [
        {'type': 'resp', 'items': [
            L('B: Did you bring your swimsuit?\nG: Oh no, I forgot it.\nB: The pool closes at five.', '',
              ['Then I\'ll go home and get it.', 'I can swim well.', 'It was very hot.'], 0,
              '水着を忘れた→「じゃあ家に取りに帰る」。', pic='👦🏊👧'),
            L('W: Can I help you?\nM: Yes. I\'m looking for a birthday present for my daughter.\nW: How old is she?', '',
              ['She likes pink.', 'She\'s turning eight.', 'On Sunday.'], 1,
              'How old(何歳)なので年齢で答えます。', pic='👩🎁👨'),
            L('G: Your shirt is cool, Tom.\nB: Thanks. My grandmother gave it to me.\nG: Is it a birthday present?', '',
              ['It\'s my favorite color.', 'I bought it last week.', 'No, a Christmas present.'], 2,
              '誕生日プレゼントか聞かれて「いいえ、クリスマスプレゼントだよ」。', pic='👧👕👦'),
            L('M: Excuse me. Does this train go to Shibuya?\nW: No, it goes to Shinjuku.\nM: Oh no. What should I do?', '',
              ['Change trains at the next station.', 'It\'s a fast train.', 'I\'m going to Shinjuku, too.'], 0,
              'どうすればいいか→「次の駅で乗りかえて」。', pic='👨🚃👩'),
            L('B: Mom, can I go to the movies with Jack?\nW: Have you finished your homework?\nB: Almost.', '',
              ['The movie is popular.', 'Then finish it first.', 'Jack is your friend.'], 1,
              '宿題がまだ少し残っている→「じゃあ先に終わらせなさい」。', pic='👦🎬👩'),
            L('G: What are you going to do during the winter vacation?\nB: I\'m going to visit my aunt in Hawaii.\nG: Wow! How long will you stay?', '',
              ['By plane.', 'With my parents.', 'For one week.'], 2,
              'How long(どのくらいの期間)なので期間で答えます。', pic='👧🌺👦'),
            L('W: You look tired, Dad.\nM: I worked late last night.\nW: Why don\'t you take a nap?', '',
              ['Good idea. Wake me up at three.', 'I like my job.', 'It was a long meeting.'], 0,
              '昼寝をすすめられて「いいね。3時に起こして」。', pic='👩😴👨'),
            L('B: Excuse me, Ms. White. Can I ask you a question?\nW: Of course. What is it?\nB: I don\'t understand this word.', '',
              ['I\'m busy now.', 'It\'s an English book.', 'Let me see. It means "quickly."'], 2,
              '単語の意味を教えています。', pic='👦📖👩'),
            L('M: Welcome to Pizza House. For here or to go?\nW: To go, please.\nM: What would you like?', '',
              ['At the counter.', 'A large cheese pizza, please.', 'It\'s very hot.'], 1,
              '何にするか聞かれているので、注文を答えます。', pic='👨🍕👩'),
            L('G: Look! It\'s snowing!\nB: Wow! Let\'s go outside.\nG: Wait. Put on your gloves first.', '',
              ['All right. Where are they?', 'I like summer better.', 'It snowed last year.'], 0,
              '手ぶくろをつけて→「わかった。どこにある?」。', pic='👧❄️👦'),
        ]},
        {'type': 'dlg', 'items': [
            L('W: Excuse me, I\'m looking for the art museum.\nM: Go straight for two blocks, and it\'s on your left.\nW: Is it far?\nM: No, it\'s only about five minutes on foot.',
              'How long will it take the woman to walk to the museum?', ['About two minutes.', 'About five minutes.', 'About ten minutes.', 'About fifteen minutes.'], 1,
              'about five minutes on foot(歩いて約5分)と言っています。'),
            L('B: Mom, I want to have a party for my birthday.\nW: OK. How many friends do you want to invite?\nB: About ten.\nW: That\'s too many for our house. How about five?',
              'How many friends does the boy\'s mother want him to invite?', ['Ten.', 'Fifteen.', 'Five.', 'Two.'], 2,
              '母は「10人は多すぎる。5人はどう?」と言っています。'),
            L('G: Mr. Jones, can I leave school early today?\nM: Why, Yumi?\nG: I have to go to the airport. My grandfather is coming from Brazil.\nM: OK. Tell your homeroom teacher, too.',
              'Why does Yumi want to leave school early?', ['She feels sick.', 'She has a piano lesson.', 'She is going to Brazil.', 'She has to go to the airport.'], 3,
              'ブラジルから来る祖父をむかえに空港へ行くためです。'),
            L('M: Hi, Lisa. Did you go to the new bakery?\nW: Yes. I bought some bread there this morning.\nM: How was it?\nW: Delicious, but a little expensive.',
              'What did Lisa think about the bakery?', ['The bread was bad.', 'The bread was cheap.', 'The bread was good but a little expensive.', 'The bakery was closed.'], 2,
              'Delicious, but a little expensive. と言っています。'),
            L('B: Are you free this Saturday, Kate?\nG: I have a tennis lesson in the morning, but I\'m free in the afternoon.\nB: Let\'s go to see a movie then.\nG: Sure.',
              'When will they see a movie?', ['On Saturday morning.', 'On Saturday afternoon.', 'On Sunday morning.', 'On Sunday afternoon.'], 1,
              '土曜の午前はテニス、午後は空いているので、土曜の午後です。'),
            L('W: Hello?\nB: Hi, Mom. I\'m at the station. Can you pick me up?\nW: Sorry, I\'m cooking dinner now. Can you take a taxi?\nB: OK. See you soon.',
              'How will the boy probably get home?', ['By bus.', 'On foot.', 'In his mother\'s car.', 'By taxi.'], 3,
              '母は迎えに行けず、タクシーで帰るように言っています。'),
            L('G: What\'s that, Dad?\nM: It\'s a new camera. I bought it for our trip to Okinawa.\nG: Can I use it, too?\nM: Of course. I\'ll show you how.',
              'Why did the girl\'s father buy a camera?', ['For his work.', 'For the girl\'s birthday.', 'For their trip to Okinawa.', 'For a photo contest.'], 2,
              'I bought it for our trip to Okinawa. と言っています。'),
            L('M: Excuse me. Do you have this book in English?\nW: I\'m sorry, we only have it in Japanese.\nM: Can you order the English one?\nW: Yes. It will come in about a week.',
              'When will the English book come?', ['In about a week.', 'Tomorrow.', 'In about three days.', 'Next month.'], 0,
              'It will come in about a week. と言っています。'),
            L('B: I\'m going to join the soccer club.\nG: Really? I thought you liked basketball.\nB: I do, but my best friend is in the soccer club.\nG: I see.',
              'Why is the boy going to join the soccer club?', ['He doesn\'t like basketball.', 'His best friend is in it.', 'His father told him to.', 'He is good at soccer.'], 1,
              'my best friend is in the soccer club と言っています。'),
            L('W: Did you water the flowers, Bob?\nB: Not yet. I\'ll do it after lunch.\nW: Please do it now. It\'s going to be very hot this afternoon.\nB: OK.',
              'What will Bob do now?', ['Eat lunch.', 'Buy some flowers.', 'Go out to play.', 'Water the flowers.'], 3,
              '午後は暑くなるので、今すぐ花に水をやるように言われています。'),
        ]},
        {'type': 'mono', 'items': [
            L('G: I have a dog named Max. Every morning, I walk him in the park before school. On weekends, my brother walks him because I have club practice.',
              'Who walks Max on weekends?', ['The girl.', 'The girl\'s brother.', 'The girl\'s mother.', 'The girl\'s friend.'], 1,
              'On weekends, my brother walks him とあります。'),
            L('N: Good morning, everyone. Today\'s sports day will start at nine. Please wear your school T-shirt and a hat because it will be sunny and hot. Don\'t forget to drink water.',
              'What should the students wear?', ['A school uniform and a jacket.', 'A raincoat.', 'A school T-shirt and a hat.', 'Their own clothes.'], 2,
              'Please wear your school T-shirt and a hat とあります。'),
            L('B: Last summer, I went to Canada for two weeks. I stayed with a host family. They were very kind. My host brother taught me how to play ice hockey.',
              'What did the boy learn in Canada?', ['How to play ice hockey.', 'How to cook.', 'How to ski.', 'How to swim.'], 0,
              'My host brother taught me how to play ice hockey. とあります。'),
            L('W: I\'m a nurse at a hospital. I usually work during the day, but this month I\'m working at night. I sleep in the morning and go shopping in the afternoon.',
              'When does the woman work this month?', ['In the morning.', 'In the afternoon.', 'In the evening only.', 'At night.'], 3,
              'this month I\'m working at night とあります。'),
            L('M: Yesterday, I lost my wallet on the train. I was worried, but a high school student found it and took it to the station office. I want to thank her.',
              'Who found the man\'s wallet?', ['A station worker.', 'A high school student.', 'A police officer.', 'A taxi driver.'], 1,
              'a high school student found it とあります。'),
            L('G: My family loves Italian food. My father makes pizza every Sunday. Last week, I helped him, and we put tomatoes, cheese and mushrooms on it.',
              'What does the girl\'s father do every Sunday?', ['He makes pizza.', 'He goes to an Italian restaurant.', 'He buys mushrooms.', 'He works at a restaurant.'], 0,
              'My father makes pizza every Sunday. とあります。'),
            L('N: Attention, passengers. The train for Tokyo will leave from track 4, not track 2. We are sorry for the change.',
              'Where will the train for Tokyo leave from?', ['Track 1.', 'Track 2.', 'Track 3.', 'Track 4.'], 3,
              'from track 4, not track 2 とあります。'),
            L('B: I started learning Korean last year. I watch Korean dramas to practice listening. Next spring, I\'m going to visit Seoul with my mother.',
              'Why does the boy watch Korean dramas?', ['To learn cooking.', 'To meet friends.', 'To practice listening.', 'To relax.'], 2,
              'I watch Korean dramas to practice listening. とあります。'),
            L('W: My son wanted a new bike for his birthday. But he already has one, so we gave him a guitar. He practices it every day now.',
              'What did the woman give her son for his birthday?', ['A bike.', 'A guitar.', 'A computer.', 'A watch.'], 1,
              'we gave him a guitar とあります。'),
            L('G: This morning, I woke up late because my alarm clock didn\'t ring. I ran to the station, but I missed the train. I was ten minutes late for school.',
              'Why was the girl late for school?', ['She was sick.', 'The train was late.', 'She forgot her bag.', 'Her alarm clock didn\'t ring.'], 3,
              '目覚まし時計が鳴らず寝坊したからです。'),
        ]},
    ],
}
