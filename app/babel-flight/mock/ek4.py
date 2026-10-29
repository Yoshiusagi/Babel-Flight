# 英検4級 模試 (オリジナル問題). Format: see SPEC['ek4'] in build.py.
from mxh import G, O, L, B

TEST = {
    'R': [
        {'type': 'gap', 'items': [
            G('A: Did you (　) your homework, Kenta?\nB: Yes, I finished it before dinner.', ['do', 'did', 'does', 'doing'], 0,
              'Did you のあとは動詞の原形。do your homework で「宿題をする」です。'),
            G('My grandmother lives in a small town. I often (　) her in summer.', ['listen', 'close', 'visit', 'teach'], 2,
              'visit で「(人を)訪ねる」。夏によくおばあちゃんの家に行く、という意味です。'),
            G('It\'s going to (　) tomorrow, so take your umbrella.', ['rains', 'rain', 'rained', 'raining'], 1,
              'be going to のあとは動詞の原形。「明日は雨になりそう」。'),
            G('This bag is (　) than that one.', ['heavy', 'heaviest', 'more heavy', 'heavier'], 3,
              'than があるので比較級。heavy は y を i にかえて heavier です。'),
            G('A: (　) you help me with these boxes?\nB: Sure.', ['Must', 'Could', 'Shall', 'Should'], 1,
              'Could you ～? は「～していただけますか」とていねいにお願いする言い方です。'),
            G('Jane is the (　) runner in her class.', ['fastest', 'faster', 'fast', 'more fast'], 0,
              'the ～ in her class(クラスの中で一番～)なので最上級の fastest。'),
            G('We (　) to the zoo last Sunday. It was a lot of fun.', ['go', 'goes', 'went', 'going'], 2,
              'last Sunday(この前の日曜日)なので過去形の went です。'),
            G('There (　) many people at the station this morning.', ['was', 'is', 'be', 'were'], 3,
              'many people(複数)で this morning(過去)なので were。'),
            G('I want (　) a doctor in the future.', ['to be', 'be', 'being', 'been'], 0,
              'want to ～ で「～したい」。want to be ～ で「～になりたい」です。'),
            G('A: Where\'s Dad?\nB: He\'s (　) the car in the garage.', ['wash', 'washing', 'washed', 'washes'], 1,
              'He\'s(He is)のあとに ing 形で「今～している」。'),
            G('My brother is good (　) drawing pictures.', ['for', 'in', 'at', 'on'], 2,
              'be good at ～ で「～が得意だ」。'),
            G('A: What are you going to do this weekend?\nB: I\'m going to (　) a movie with my friends.', ['hear', 'see', 'tell', 'say'], 1,
              '映画を見るは see a movie(または watch a movie)。'),
            G('You (　) be quiet in the library.', ['are', 'do', 'did', 'must'], 3,
              'must のあとは動詞の原形。must be quiet で「静かにしなければならない」。'),
            G('A: How was the test?\nB: It was (　) difficult. I couldn\'t answer some questions.', ['very', 'many', 'few', 'any'], 0,
              '形容詞 difficult を強めるのは very(とても)です。'),
            G('Mike (　) up late yesterday, so he missed the bus.', ['get', 'gets', 'got', 'getting'], 2,
              'yesterday なので過去形。get up の過去形は got up です。'),
        ]},
        {'type': 'dgap', 'items': [
            G('Boy: Mom, can I go to Tom\'s house?\nMother: OK, but (　)\nBoy: I will.',
              ['come home by six.', 'I\'m busy now.', 'he\'s my friend.', 'you\'re welcome.'], 0,
              '「6時までに帰ってきてね」→「そうするよ(I will.)」という流れです。'),
            G('Girl: I lost my pencil case.\nBoy: (　)\nGirl: Thanks. I\'ll give it back tomorrow.',
              ['It\'s on Friday.', 'I\'m not hungry.', 'You can use my pen.', 'That\'s too bad. See you.'], 2,
              '女の子が「ありがとう、明日返すね」と言っているので、ペンを貸してあげたとわかります。'),
            G('Man: Excuse me. How can I get to the library?\nWoman: (　) It\'s next to the post office.',
              ['It\'s about two hours.', 'I don\'t like books.', 'It opens on Mondays.', 'Go straight and turn left at the second corner.'], 3,
              'How can I get to ～?(～へはどう行けばいいですか)には道順で答えます。'),
            G('Girl 1: Are you free this Saturday?\nGirl 2: (　) What\'s up?\nGirl 1: Let\'s go shopping together.',
              ['No, thank you.', 'Yes, I am.', 'It\'s mine.', 'Here you are.'], 1,
              'Are you free ～?(ひま?)に Yes, I am. と答え、「どうしたの?」と続けています。'),
            G('Boy: How long did you stay in Kyoto?\nGirl: (　)',
              ['For three days.', 'By train.', 'With my family.', 'Last month.'], 0,
              'How long(どのくらいの間)には期間 For three days.(3日間)で答えます。'),
        ]},
        {'type': 'order', 'items': [
            O('あなたはネコとイヌのどちらが好きですか。', '', ['like', 'you', 'better', 'do', 'Which'], [5, 4, 2, 1, 3], ', cats or dogs?',
              'Which do you like better, A or B? で「AとBのどちらが好きですか」。'),
            O('私の夢は世界中を旅行することです。', 'My dream', ['to', 'around', 'is', 'travel', 'the'], [3, 1, 4, 2, 5], 'world.',
              '「～することです」は is to ～。around the world で「世界中を」。My dream is to travel around the world.'),
            O('宿題を手伝ってくれてありがとう。', 'Thank', ['helping', 'with', 'for', 'you', 'me'], [4, 3, 1, 5, 2], 'my homework.',
              'Thank you for ～ing.(～してくれてありがとう)。help 人 with ～ で「人の～を手伝う」。'),
            O('私がこの箱を運ぶのは難しいです。', 'It\'s', ['me', 'difficult', 'to', 'for', 'carry'], [2, 4, 1, 3, 5], 'this box.',
              'It\'s difficult for 人 to ～. で「人にとって～するのは難しい」。'),
            O('図書館には本が何冊ありますか。', 'How', ['are', 'books', 'there', 'many', 'in'], [4, 2, 1, 3, 5], 'the library?',
              '数をたずねる How many books のあとに are there(ありますか)が続きます。'),
        ]},
        {'type': 'passage', 'blocks': [
            B('[A]', 'notice', '''Come and listen to stories in English!
Date: Saturday, July 12
Time: 10:30 a.m. to 11:30 a.m.
Place: Room 2, Riverside Library
Children from 5 to 9 years old can join. Parents can come, too.
After the stories, we will make paper animals together.
If you want to join, please call the library by July 10.
Phone: 555-0134''', [
                G('How long is Story Time?', ['For thirty minutes.', 'For one hour.', 'For two hours.', 'For three hours.'], 1,
                  '10:30 a.m. から 11:30 a.m. までなので1時間です。'),
                G('After the stories, children will', ['read books in Room 1.', 'call the library.', 'make paper animals.', 'watch a movie.'], 2,
                  'After the stories, we will make paper animals together. とあります。'),
            ], title='Riverside Library Story Time'),
            B('[B]', 'email', '''From: Emily Clark
To: Haruka Sato
Date: May 20
Subject: Your visit

Hi Haruka,
Thank you for your email. I'm happy that you're coming to Canada this summer! You'll stay with my family for two weeks, right? My mother says you can use my sister's room. My sister is studying in Toronto now, so her room is free.
In August, my town has a big music festival. Many people come to listen to music in the park. Do you want to go with me? Also, what food do you like? My father loves cooking, and he wants to make dinner for you.
Your friend,
Emily

From: Haruka Sato
To: Emily Clark
Date: May 21
Subject: Thank you!

Hi Emily,
Thanks for your email. Yes, I'll stay with your family for two weeks, from August 3 to August 17. I'd love to go to the music festival with you! I play the trumpet in the brass band at my school, so I love music.
I can eat almost everything, but I don't like spicy food very much. I'm going to bring some Japanese snacks for your family. I'm really excited!
See you soon,
Haruka''', [
                G('Where will Haruka sleep in Canada?', ['In a hotel.', 'In Emily\'s sister\'s room.', 'In Emily\'s room.', 'In Toronto.'], 1,
                  'Emily のお母さんが「妹の部屋を使っていい」と言っています。'),
                G('What does Emily\'s father want to do?', ['Make dinner for Haruka.', 'Play the trumpet.', 'Go to Toronto.', 'Buy some snacks.'], 0,
                  'he wants to make dinner for you とあります。'),
                G('What is Haruka going to bring?', ['Spicy food.', 'Her trumpet.', 'Some Japanese snacks.', 'Some music CDs.'], 2,
                  'I\'m going to bring some Japanese snacks for your family. とあります。'),
            ]),
            B('[C]', 'text', '''Daniel is thirteen years old and lives in a small town in Australia. Last spring, his grandfather gave him some seeds. "Let's grow vegetables together," he said. Daniel didn't know much about plants, but he wanted to try.
First, they made a small garden behind Daniel's house. They planted tomatoes, carrots, and beans. Every morning before school, Daniel gave water to the plants. Sometimes he forgot, and his grandfather called him and said, "Your tomatoes are thirsty!"
In summer, the weather was very hot, and some of the beans died. Daniel was sad, but his grandfather told him, "Don't worry. Farmers have problems every year. Let's put some straw on the ground. It will keep the soil wet." Daniel did that, and the other plants grew well.
In February, Daniel picked his first tomatoes. They were small, but they were sweet. He took them to school and shared them with his friends. His teacher, Ms. White, liked them very much. She asked Daniel to talk about his garden in class.
Now Daniel wants to grow strawberries next year. He also wants to start a garden club at his school.''', [
                G('Who gave Daniel some seeds?', ['His teacher.', 'His grandfather.', 'A farmer.', 'His friend.'], 1,
                  'his grandfather gave him some seeds とあります。'),
                G('What did Daniel do every morning?', ['He picked tomatoes.', 'He called his grandfather.', 'He gave water to the plants.', 'He went to a farm.'], 2,
                  'Every morning before school, Daniel gave water to the plants. とあります。'),
                G('Why did some of the beans die?', ['It was very hot.', 'It rained a lot.', 'Daniel didn\'t plant them.', 'Animals ate them.'], 0,
                  'the weather was very hot, and some of the beans died とあります。'),
                G('What did Ms. White ask Daniel to do?', ['Give her some beans.', 'Start a garden club.', 'Grow strawberries.', 'Talk about his garden in class.'], 3,
                  'She asked Daniel to talk about his garden in class. とあります。'),
                G('What is this story about?', ['A boy who goes to a farm in Japan.', 'A boy who grows vegetables with his grandfather.', 'A teacher who loves tomatoes.', 'A grandfather who sells vegetables.'], 1,
                  'おじいさんと一緒に野菜を育てた男の子の話です。'),
            ], title='Daniel\'s Vegetable Garden'),
        ]},
    ],
    'L': [
        {'type': 'resp', 'items': [
            L('W: Are you hungry, Tom?\nB: Yes, Mom.\nW: Do you want some pizza?', '',
              ['Yes, please.', 'I\'m from Canada.', 'It was yesterday.'], 0, '「ピザ食べる?」→「うん、お願い。」', pic='👩🍕👦'),
            L('B: What are you reading?\nG: A book about space.\nB: Is it interesting?', '',
              ['I bought it at the station.', 'Yes, it\'s really exciting.', 'No, it\'s my brother\'s.'], 1,
              'Is it interesting?(おもしろい?)に「うん、すごくワクワクする」と答えます。', pic='👦📖👧'),
            L('M: Would you like some coffee?\nW: No, thank you.\nM: How about some tea?', '',
              ['It\'s very cold outside.', 'I drank it last week.', 'Sure, I\'d love some.'], 2,
              'How about ～?(～はどう?)とすすめられて「ええ、いただきます」。', pic='🧑☕👩'),
            L('G: It\'s raining hard.\nB: Do you have an umbrella?\nG: No. Can I use yours?', '',
              ['It\'s sunny today.', 'Sure. Here you are.', 'No, I\'m not.'], 1,
              'Can I use yours?(あなたのを使っていい?)→「いいよ、はいどうぞ」。', pic='👧🌧️👦'),
            L('W: May I help you?\nB: Yes. I\'m looking for a T-shirt.\nW: What color do you want?', '',
              ['It\'s ten dollars.', 'I\'ll come back tomorrow.', 'Something blue.'], 2,
              'What color(何色)と聞かれているので色で答えます。', pic='👩👕👦'),
            L('B: Hello. This is Ken. Is Mike there?\nW: Sorry, he\'s not home now.\nB: When will he be back?', '',
              ['Around five o\'clock.', 'He\'s my son.', 'At the park, I think.'], 0,
              'When(いつ)なので時間で答えます。', pic='👦📞👩'),
            L('G: Mom, this is a present for you.\nW: Oh, thank you! What is it?\nG: Open it and see.', '',
              ['You\'re welcome.', 'Wow, a beautiful scarf!', 'It\'s my birthday tomorrow.'], 1,
              'プレゼントを開けたお母さんの反応です。', pic='👧🎁👩'),
            L('M: Excuse me. Does this train go to Midori Station?\nG: Yes, it does.\nM: How long does it take?', '',
              ['It\'s two hundred yen.', 'Every Monday.', 'About fifteen minutes.'], 2,
              'How long does it take?(どのくらいかかる?)には時間で答えます。', pic='👨🚃👧'),
            L('G: Your dog is so cute. What\'s his name?\nB: Max.\nG: How old is he?', '',
              ['He\'s three.', 'He\'s very big.', 'He likes balls.'], 0,
              'How old(何歳)なので年齢で答えます。', pic='👧🐕👦'),
            L('W: You look tired, Ken.\nB: I went to bed late last night.\nW: Why?', '',
              ['At eleven last night.', 'I was watching a soccer game.', 'I\'m going to bed now.'], 1,
              'Why(なぜ)と聞かれているので理由を答えます。', pic='👩‍🏫😪👦'),
        ]},
        {'type': 'dlg', 'items': [
            L('B: Mom, have you seen my soccer shoes?\nW: Aren\'t they in your room?\nB: No, I looked there.\nW: Then check the car. You used them yesterday.',
              'Where will the boy look for his shoes next?', ['In his room.', 'In the car.', 'At school.', 'At the park.'], 1,
              'お母さんが Then check the car.(じゃあ車を見て)と言っています。'),
            L('G: What are you going to do during summer vacation, Mr. Lee?\nM: I\'m going to visit my parents in Korea.\nG: Sounds nice. How long will you stay?\nM: For ten days.',
              'What is Mr. Lee going to do?', ['Visit his parents.', 'Teach in Korea.', 'Go to Hawaii.', 'Stay at home.'], 0,
              'I\'m going to visit my parents in Korea. と言っています。'),
            L('W: Excuse me. How much is this cake?\nM: It\'s three dollars.\nW: I\'ll take two, please.\nM: That\'s six dollars.',
              'How many cakes will the woman buy?', ['One.', 'Three.', 'Six.', 'Two.'], 3,
              'I\'ll take two(2つください)と言っています。six dollars は値段です。'),
            L('B: Did you go to the movie with Kate yesterday?\nG: No. She was sick, so I went with my sister.\nB: Was it good?\nG: Yes, very.',
              'Who did the girl go to the movie with?', ['Kate.', 'Her mother.', 'The boy.', 'Her sister.'], 3,
              'Kate は病気だったので、妹(姉)と行きました。'),
            L('M: Lucy, it\'s time for dinner.\nG: Just a minute, Dad. I\'m finishing my homework.\nM: OK. Come down in five minutes.',
              'What is Lucy doing now?', ['Eating dinner.', 'Cooking.', 'Doing her homework.', 'Watching TV.'], 2,
              'I\'m finishing my homework.(宿題を終わらせているところ)と言っています。'),
            L('G: I\'m going to the library after school. Do you want to come?\nB: I can\'t. I have tennis practice.\nG: How about tomorrow?\nB: OK.',
              'When will they go to the library?', ['Today.', 'This weekend.', 'Tomorrow.', 'Next week.'], 2,
              '今日はテニスの練習があるので、明日行くことにしました。'),
            L('W: How do you go to school, Jack?\nB: I usually walk, but today I took the bus.\nW: Why?\nB: Because it was raining.',
              'How did Jack go to school today?', ['He walked.', 'By bus.', 'By bike.', 'By car.'], 1,
              'いつもは歩きですが、今日は雨だったのでバスで行きました。'),
            L('B: This is a nice picture. Did you draw it?\nG: No, my brother did. He wants to be an artist.\nB: He\'s very good.',
              'Who drew the picture?', ['The boy.', 'The girl.', 'The girl\'s brother.', 'The boy\'s brother.'], 2,
              'my brother did(兄[弟]が描いた)と女の子が言っています。'),
            L('M: Excuse me. Is there a post office near here?\nW: Yes. Go down this street. It\'s next to the bank.\nM: Thank you.',
              'Where is the post office?', ['Next to the bank.', 'Next to the station.', 'Behind the school.', 'Near the park.'], 0,
              'It\'s next to the bank.(銀行のとなり)と言っています。'),
            L('G: I\'m going to make cookies for Mom\'s birthday.\nB: That\'s a good idea. When is her birthday?\nG: It\'s this Friday.',
              'What will the girl make?', ['A cake.', 'A card.', 'Dinner.', 'Cookies.'], 3,
              'I\'m going to make cookies と言っています。'),
        ]},
        {'type': 'mono', 'items': [
            L('B: I usually go to bed at ten. But last night, I watched a soccer game on TV, so I went to bed at twelve. This morning, I was very sleepy.',
              'Why was the boy sleepy this morning?', ['He went to bed late.', 'He played soccer.', 'He got up at five.', 'He studied all night.'], 0,
              'サッカーの試合を見て12時に寝たからです。'),
            L('G: My family has a cat and two dogs. The cat is old, but the dogs are young. I walk the dogs every morning.',
              'How many dogs does the girl\'s family have?', ['One.', 'Three.', 'Two.', 'Four.'], 2,
              'a cat and two dogs(ねこ1匹と犬2匹)です。'),
            L('N: Attention, please. Today\'s tennis practice is canceled because of the rain. Students in the tennis club should go to the gym. We\'ll have a meeting there.',
              'Where should the tennis club students go?', ['To the gym.', 'To the tennis court.', 'To the library.', 'To their homes.'], 0,
              'should go to the gym(体育館に行くこと)とあります。'),
            L('G: Yesterday was my mother\'s birthday. My sister and I made a cake for her. My father bought flowers. My mother was very happy.',
              'What did the girl\'s father do?', ['He made a cake.', 'He cooked dinner.', 'He wrote a card.', 'He bought flowers.'], 3,
              'My father bought flowers. とあります。ケーキを作ったのは姉妹です。'),
            L('M: Mike likes sports. He plays baseball on weekends and swims on Wednesdays. Next year, he wants to try basketball.',
              'What does Mike do on Wednesdays?', ['He plays baseball.', 'He swims.', 'He plays basketball.', 'He plays tennis.'], 1,
              'swims on Wednesdays(水曜日に泳ぐ)とあります。'),
            L('B: Last summer, I went to Hokkaido with my family. We stayed there for five days. The weather was cool, and the food was delicious. I want to go there again in winter.',
              'When does the boy want to go to Hokkaido again?', ['Next summer.', 'In spring.', 'In winter.', 'Next week.'], 2,
              'I want to go there again in winter. とあります。'),
            L('G: I\'m Sara. I\'m a high school student. I work at a bakery on Saturdays. I\'m saving money because I want to buy a new computer.',
              'Why is Sara saving money?', ['To go abroad.', 'To buy a new computer.', 'To buy a bike.', 'To open a bakery.'], 1,
              'I want to buy a new computer が理由です。'),
            L('N: Welcome to Green Zoo. The zoo closes at five p.m. today. The lion show starts at two p.m. near the main gate. Please enjoy your day.',
              'What time does the lion show start?', ['At noon.', 'At one p.m.', 'At five p.m.', 'At two p.m.'], 3,
              'The lion show starts at two p.m. とあります。5時は閉園時間です。'),
            L('G: My brother is a cook. He works at a restaurant near the station. On his days off, he often cooks for our family. His curry is the best.',
              'Where does the girl\'s brother work?', ['At a hotel.', 'At a school.', 'At a restaurant.', 'At the station.'], 2,
              'He works at a restaurant near the station. とあります。'),
            L('G: Yesterday, I lost my key on the way home. I looked everywhere. Then my friend Ben called me. He found it at the park.',
              'Who found the key?', ['Ben.', 'The girl.', 'Her mother.', 'A police officer.'], 0,
              '友達の Ben が公園で見つけてくれました。'),
        ]},
    ],
}
