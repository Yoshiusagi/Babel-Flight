# 英検3級 模試 (オリジナル問題). Format: see SPEC['ek3'] in build.py.
from mxh import G, L, B

TEST = {
    'R': [
        {'type': 'gap', 'items': [
            G('A: Have you ever (　) to Okinawa?\nB: Yes, I went there last year.', ['be', 'was', 'been', 'being'], 2,
              'Have you ever been to ～?(～へ行ったことがありますか)。現在完了の経験です。'),
            G('This temple was (　) about 500 years ago.', ['built', 'build', 'building', 'builds'], 0,
              'was + 過去分詞で「～された」(受け身)。build の過去分詞は built。'),
            G('The girl (　) is talking with Mr. Smith is my cousin.', ['which', 'who', 'what', 'where'], 1,
              '人(The girl)を説明する関係代名詞は who です。'),
            G('My mother told me (　) my room.', ['clean', 'cleaned', 'cleaning', 'to clean'], 3,
              'tell 人 to ～ で「人に～するように言う」。'),
            G('A: Do you know (　) the next bus comes?\nB: In ten minutes.', ['what', 'who', 'when', 'which'], 2,
              '答えが In ten minutes(10分後)なので「いつ」の when。文の中の疑問文は〈疑問詞+主語+動詞〉の順です。'),
            G('I\'m interested (　) Japanese history.', ['on', 'in', 'at', 'with'], 1,
              'be interested in ～ で「～に興味がある」。'),
            G('This book is (　) difficult for me to read.', ['too', 'so', 'very', 'enough'], 0,
              'too ～ to … で「あまりに～なので…できない」。'),
            G('Kenji enjoyed (　) soccer with his friends after school.', ['play', 'to play', 'played', 'playing'], 3,
              'enjoy のあとは ～ing 形(動名詞)。enjoy playing で「するのを楽しむ」。'),
            G('A: How long have you lived in this town?\nB: (　) ten years.', ['For', 'Since', 'During', 'Ago'], 0,
              '期間(ten years)の前は for。since は「～から」で始まりの時点に使います。'),
            G('The museum is closed on Mondays, so please (　) on another day.', ['came', 'come', 'coming', 'comes'], 1,
              'please のあとは動詞の原形(命令文)です。'),
            G('We had a party to celebrate Emma\'s (　) from high school.', ['population', 'invention', 'graduation', 'station'], 2,
              'graduation from high school で「高校の卒業」。'),
            G('A: Can you (　) me the salt, please?\nB: Here you are.', ['pull', 'push', 'pick', 'pass'], 3,
              'pass 人 物 で「人に物を手渡す」。食卓での定番表現です。'),
            G('It started to rain, so we decided to (　) the picnic.', ['put off', 'get up', 'look at', 'come from'], 0,
              'put off で「延期する」。雨なのでピクニックを延期しました。'),
            G('Sarah has a lot of homework today. She (　) watch TV tonight.', ['has to', 'can\'t', 'must', 'will'], 1,
              '宿題がたくさんあるので「今夜テレビは見られない」。'),
            G('The weather was bad, (　) the baseball game was canceled.', ['but', 'if', 'so', 'because'], 2,
              '天気が悪かった、だから(so)試合が中止になった。'),
        ]},
        {'type': 'dgap', 'items': [
            G('Woman: Excuse me. Is this seat taken?\nMan: (　) Please sit down.',
              ['Yes, my friend is coming.', 'No, it\'s not.', 'I\'ll take it.', 'It\'s ten minutes.'], 1,
              'Is this seat taken?(この席はふさがっていますか)→「いいえ、どうぞ座って」。'),
            G('Boy: I\'m going to Tokyo next week.\nGirl: Really? (　)\nBoy: To see a baseball game.',
              ['How will you go there?', 'When did you go?', 'Who is your favorite player?', 'What are you going to do there?'], 3,
              '答えが To see a baseball game.(野球の試合を見るため)なので、「そこで何をするの?」。'),
            G('Daughter: Dad, can you help me with my math homework?\nFather: Sure, (　)\nDaughter: Thanks. I\'ll wait.',
              ['but give me ten minutes.', 'and you\'re welcome.', 'it\'s in my bag.', 'I did it yesterday.'], 0,
              '娘が「待ってるね」と答えているので、「10分待って」がつながります。'),
            G('Girl 1: What did you think of the movie?\nGirl 2: (　) I want to see it again.',
              ['It was too long and boring.', 'I haven\'t seen it.', 'It was amazing.', 'It starts at seven.'], 2,
              '「もう一度見たい」と続くので、ほめている It was amazing. です。'),
            G('Man: I\'d like to send this package to Australia.\nClerk: OK. (　)\nMan: By airmail, please.',
              ['How much is it?', 'How would you like to send it?', 'When did you buy it?', 'What\'s in your bag?'], 1,
              'By airmail(航空便で)と答えているので、送り方をたずねています。'),
        ]},
        {'type': 'passage', 'blocks': [
            B('[A]', 'notice', '''Volunteers Wanted!
Help us at the Midori City Marathon

Date: Sunday, October 19
Time: 7:00 a.m. to 1:00 p.m.

We need people to give water to the runners and to clean the streets after the race.
High school students and adults can join. Junior high school students can join if they come with a parent.
All volunteers will get a marathon T-shirt and a free lunch.
Please sign up on our website by October 5.''', [
                G('When should people sign up to be a volunteer?', ['By October 5.', 'By October 19.', 'On the day of the marathon.', 'After the race.'], 0,
                  'Please sign up on our website by October 5. とあります。'),
                G('Junior high school students who want to help must', ['run in the marathon.', 'bring their own lunch.', 'come with a parent.', 'buy a T-shirt.'], 2,
                  '中学生は親と一緒なら参加できます。'),
            ], title='Midori City Marathon'),
            B('[B]', 'email', '''From: Olivia Brown
To: Mika Tanaka
Date: April 8
Subject: Japanese lessons

Hi Mika,
How are you? I started learning Japanese at a community center last month. The class is on Tuesday evenings, and the teacher is very kind. I can read hiragana now, but katakana is still difficult for me. Do you have any good ideas for learning katakana?
Also, my class is going to have a Japanese culture day in June. Each student has to show something from Japan. I'm thinking about making origami. Can you teach me how to make a crane when we talk online next time?
Your friend,
Olivia

From: Mika Tanaka
To: Olivia Brown
Date: April 9
Subject: Re: Japanese lessons

Hi Olivia,
That's great news! When I learned katakana, I read the names of foods on menus and snack bags. Many of them are written in katakana, so it's good practice, and it's fun. You can try it at a Japanese supermarket.
Of course I'll teach you how to make a crane! Please get some origami paper before we talk. Square paper is fine, too. Let's talk on Saturday morning.
Mika''', [
                G('What is difficult for Olivia?', ['Reading hiragana.', 'Reading katakana.', 'Going to the community center.', 'Talking with her teacher.'], 1,
                  'katakana is still difficult for me とあります。'),
                G('What does Olivia want Mika to do?', ['Send her some Japanese snacks.', 'Come to the culture day.', 'Teach her how to make a crane.', 'Write a menu in katakana.'], 2,
                  'Can you teach me how to make a crane? とお願いしています。'),
                G('What does Mika tell Olivia to do?', ['Read the names of foods in katakana.', 'Buy a new textbook.', 'Take another class.', 'Write letters in Japanese.'], 0,
                  'メニューやお菓子の袋の名前を読むとよい、とアドバイスしています。'),
            ]),
            B('[C]', 'text', '''Bessie Coleman was born in Texas in the United States in 1892. Her family was poor, and she had to work in cotton fields when she was a child. But she loved to read, and she walked a long way to school every day.
When Bessie was in her twenties, she moved to Chicago. There, she heard stories about pilots who flew planes during World War I. She decided to become a pilot. However, flight schools in the United States did not accept her because she was a Black woman.
Bessie did not give up. She learned French and saved money, and in 1920 she went to France. Flight schools there accepted her. In 1921, she got her international pilot's license. She was the first Black woman in the world to get one.
After she came back to the United States, she flew in air shows. Many people came to see her flying. Bessie also gave talks at schools and churches. She wanted to open a flight school for Black people, so that they could also learn to fly.
Bessie died in a plane accident in 1926, and she could not open her school. But her dream did not end. Many people remember her, and her story has encouraged young people who want to fly.''', [
                G('When Bessie was a child,', ['she lived in France.', 'she worked in cotton fields.', 'she flew planes.', 'she taught at a school.'], 1,
                  'she had to work in cotton fields when she was a child とあります。'),
                G('Why did Bessie go to France?', ['To learn to fly.', 'To find a job in a cotton field.', 'To fight in World War I.', 'To study at a church.'], 0,
                  'アメリカの飛行学校が受け入れてくれなかったので、フランスで学びました。'),
                G('What did Bessie get in 1921?', ['A new plane.', 'Money for a school.', 'An international pilot\'s license.', 'A job in Chicago.'], 2,
                  'In 1921, she got her international pilot\'s license. とあります。'),
                G('What did Bessie want to do?', ['Move to France.', 'Write a book about planes.', 'Stop flying in air shows.', 'Open a flight school for Black people.'], 3,
                  'She wanted to open a flight school for Black people とあります。'),
                G('What is this story about?', ['A woman who opened the first flight school in Texas.', 'A pilot who did not give up on her dream.', 'The history of air shows in France.', 'A teacher who taught French in Chicago.'], 1,
                  '差別にあっても夢をあきらめなかったパイロットの話です。'),
            ], title='Bessie Coleman'),
        ]},
        {'type': 'email',
         'prompt': 'あなたは、外国人の友達(Alex)から以下のEメールを受け取りました。Eメールを読み、それに対する返信メールを英文で書きなさい。\nあなたが書く返信メールの中で、友達(Alex)からの2つの質問に対応する内容を、あなた自身で自由に考えて答えなさい。\n返信は「Hi, Alex! Thank you for your e-mail.」で始まり「Best wishes,」で終わります(この部分は書かなくてよい)。',
         'body': 'Hi!\nI heard you went to a summer festival last weekend. I want to know about it. Who did you go to the festival with? And what did you eat there?\nYour friend,\nAlex',
         'rules': ['語数の目安は15語〜25語です。', '2つの質問(だれと行ったか・何を食べたか)の両方に答えましょう。'],
         'model': 'I went there with my brother and two friends from school. We ate yakisoba and shaved ice. They were really delicious.',
         'checks': ['だれと行ったか(質問1)に答えている', '何を食べたか(質問2)に答えている', '語数が15〜25語になっている', '主語と動詞がある文になっている(We ate … など)', '過去のことなので過去形を使っている']},
        {'type': 'opinion',
         'prompt': 'あなたは、外国人の知り合いから以下のQUESTIONをされました。QUESTIONについて、あなたの考えとその理由を2つ英文で書きなさい。\n\nQUESTION\nWhich do you like better, studying in the morning or studying at night?',
         'rules': ['語数の目安は25語〜35語です。', '理由は2つ書きましょう。', 'QUESTIONに答えていない場合や、内容がQUESTIONからずれている場合は、0点と採点されることがあります。'],
         'model': 'I like studying in the morning better. I have two reasons. First, my head is clear after I sleep. Second, it is quiet because my family is still sleeping.',
         'checks': ['最初の文でどちらが好きか答えている', '理由を2つ書いている', 'First, … Second, … のようにつないでいる', '語数が25〜35語になっている', 'スペルや文法のミスがない']},
    ],
    'L': [
        {'type': 'resp', 'items': [
            L('B: Mom, where\'s my jacket?\nW: It\'s in the closet.\nB: I can\'t find it.', '',
              ['I\'ll come and look.', 'It\'s very cold today.', 'I bought it yesterday.'], 0,
              '「見つからない」→「探しに行くね」。', pic='👦🧥👩'),
            L('G: Are you going to the school festival tomorrow?\nB: Yes. My class is going to do a play.\nG: What part do you have?', '',
              ['At ten o\'clock.', 'I\'m the king.', 'In the gym.'], 1,
              'What part(何の役)と聞かれているので役で答えます。', pic='👧🎭👦'),
            L('M: Excuse me. I\'m looking for a book about birds.\nW: The science books are on the second floor.\nM: Is there an elevator?', '',
              ['It\'s a good book.', 'Birds can fly.', 'Yes, it\'s over there.'], 2,
              'エレベーターはあるか→「はい、あちらです」。', pic='👨📚👩'),
            L('W: How was your trip to London?\nB: It was great.\nW: What did you like the most?', '',
              ['The museums were amazing.', 'I went there by plane.', 'For six days.'], 0,
              '一番気に入ったものを答えています。', pic='👩🏰👦'),
            L('G: Dad, I got a perfect score on my English test!\nM: That\'s wonderful!\nG: Can we have pizza tonight?', '',
              ['I\'m not good at English.', 'Sure. Let\'s celebrate.', 'It was last week.'], 1,
              'ピザを食べたいとお願い→「いいよ、お祝いしよう」。', pic='👧💯👨'),
            L('B: This bag is heavy.\nG: Shall I help you?\nB: Thanks. Can you carry this box?', '',
              ['It\'s my bag.', 'I don\'t have one.', 'Sure, no problem.'], 2,
              'Can you carry this box?(この箱を運べる?)→「もちろん」。', pic='👦📦👧'),
            L('W: Welcome to Blue Café. How many people?\nM: Two, please.\nW: Would you like a table by the window?', '',
              ['Yes, that would be nice.', 'A coffee, please.', 'Two people.'], 0,
              '窓ぎわの席を勧められて「それはいいですね」。', pic='👩🪟👨'),
            L('B: Did you see Mr. Kato?\nG: He went to the teachers\' room.\nB: When will he come back?', '',
              ['He\'s a math teacher.', 'Maybe in a few minutes.', 'He came by car.'], 1,
              'When(いつ)なので時間で答えます。', pic='👦🏫👧'),
            L('G: I\'m going to start piano lessons.\nB: That\'s nice. Who\'s your teacher?\nG: My aunt.', '',
              ['Every Friday.', 'I play the guitar.', 'Oh, she plays well, right?'], 2,
              'おばさんが先生→「おばさん、上手なんだよね?」と会話が続きます。', pic='👧🎹👦'),
            L('M: You look sad, Lisa.\nG: I lost my favorite pen.\nM: Where did you see it last?', '',
              ['In the music room, I think.', 'It was a present.', 'It\'s blue and white.'], 0,
              'Where(どこ)なので場所を答えます。', pic='👨🖊️👧'),
        ]},
        {'type': 'dlg', 'items': [
            L('G: Dad, can you take me to the station tomorrow morning?\nM: Sorry, I have a meeting. Ask your mother.\nG: She\'s going to the hospital to see Grandma.\nM: Then you\'ll have to take the bus.',
              'How will the girl probably go to the station?', ['By car with her father.', 'By car with her mother.', 'On foot.', 'By bus.'], 3,
              '両親とも送れないので、バスで行くことになりそうです。'),
            L('B: Ms. Green, I can\'t come to club practice today.\nW: Why not, Ken?\nB: I have to take my sister to the dentist.\nW: OK. See you tomorrow.',
              'Why can\'t Ken go to club practice today?', ['He is sick.', 'He has to go to the dentist himself.', 'He has to take his sister to the dentist.', 'He has to study for a test.'], 2,
              '妹(姉)を歯医者に連れて行かなければなりません。'),
            L('W: Excuse me. Do you have this sweater in a smaller size?\nM: Let me check. ... Sorry, we only have it in large.\nW: Oh. Then I\'ll take this blue one in medium.\nM: Sure.',
              'What will the woman buy?', ['A large sweater.', 'A small sweater.', 'A blue sweater.', 'Nothing.'], 2,
              '最後に this blue one in medium(青のMサイズ)を買うと言っています。'),
            L('G: How was your weekend, Tom?\nB: Not so good. I wanted to go camping, but it rained.\nG: What did you do then?\nB: I stayed home and played video games.',
              'What did Tom do on the weekend?', ['He stayed home.', 'He went camping.', 'He went to the movies.', 'He visited his friend.'], 0,
              '雨でキャンプに行けず、家でゲームをしました。'),
            L('M: Hello, this is Mike from the bike shop. Your bike is ready.\nW: Great. Can I pick it up today?\nM: Sure. We close at seven.\nW: I\'ll be there at six.',
              'What time will the woman go to the shop?', ['At five.', 'At six.', 'At seven.', 'At eight.'], 1,
              'I\'ll be there at six. と言っています。7時は閉店時間です。'),
            L('B: Mom, I\'m home. Is there anything to eat?\nW: There are some cookies on the table.\nB: Can I have some juice, too?\nW: Sure, it\'s in the fridge.',
              'Where are the cookies?', ['In the fridge.', 'In the box.', 'On the table.', 'In the kitchen cupboard.'], 2,
              'There are some cookies on the table. と言っています。'),
            L('G: Are you going to join the English speech contest?\nB: I want to, but I\'m nervous.\nG: You should try. I\'ll help you practice.\nB: Thanks. I\'ll do it.',
              'What will the girl do?', ['Join the contest herself.', 'Help the boy practice.', 'Write a speech for the boy.', 'Talk to the teacher.'], 1,
              'I\'ll help you practice. と言っています。'),
            L('M: Excuse me, how often does the bus go to the airport?\nW: Every thirty minutes.\nM: When does the next one come?\nW: In ten minutes.',
              'When will the next bus come?', ['In five minutes.', 'In ten minutes.', 'In thirty minutes.', 'In one hour.'], 1,
              'In ten minutes.(10分後)です。30分は運行の間隔です。'),
            L('B: That was a great concert!\nG: Yeah. I really liked the last song.\nB: Me, too. Let\'s buy their new CD.\nG: Good idea. There\'s a shop near the exit.',
              'What will they do next?', ['Buy a CD.', 'Go to another concert.', 'Go home.', 'Eat dinner.'], 0,
              '新しいCDを買いに行くことにしました。'),
            L('W: Jason, did you clean your room?\nB: Not yet. I\'m doing my homework now.\nW: OK, but clean it before dinner.\nB: All right.',
              'What is Jason doing now?', ['Cleaning his room.', 'Eating dinner.', 'Doing his homework.', 'Cooking dinner.'], 2,
              'I\'m doing my homework now. と言っています。'),
        ]},
        {'type': 'mono', 'items': [
            L('G: Last Saturday, I went to the aquarium with my family. We saw many kinds of fish and a dolphin show. My little brother liked the penguins the best. I want to go again next month.',
              'What did the girl\'s brother like the best?', ['The dolphins.', 'The sharks.', 'The fish.', 'The penguins.'], 3,
              'My little brother liked the penguins the best. とあります。'),
            L('N: Attention, shoppers. Today only, all T-shirts are half price. Also, if you buy two pairs of shoes, you will get a free bag. Thank you for shopping with us.',
              'What will people get if they buy two pairs of shoes?', ['A free T-shirt.', 'Half-price shoes.', 'A gift card.', 'A free bag.'], 3,
              'if you buy two pairs of shoes, you will get a free bag とあります。'),
            L('B: I\'m on the basketball team at school. We practice four days a week. Next month, we have an important game. I\'m practicing my shooting every day after dinner.',
              'What does the boy do every day after dinner?', ['He plays games.', 'He watches basketball.', 'He does his homework.', 'He practices shooting.'], 3,
              'I\'m practicing my shooting every day after dinner. とあります。'),
            L('W: My daughter loves animals. She wanted a dog, but our apartment is too small. So last week, we got a hamster. She takes care of it every day.',
              'Why didn\'t the woman\'s family get a dog?', ['Their apartment is too small.', 'Dogs are expensive.', 'Her daughter is afraid of dogs.', 'They already have a cat.'], 0,
              'our apartment is too small とあります。'),
            L('M: Yesterday, I went to a new Italian restaurant near my office. The pasta was good, but I had to wait for forty minutes. Next time, I\'ll go before noon.',
              'What will the man do next time?', ['Go to a different restaurant.', 'Order pizza.', 'Go there before noon.', 'Wait for forty minutes.'], 2,
              'Next time, I\'ll go before noon. とあります。'),
            L('G: Next week, my class is going on a school trip to Nara. We will visit some old temples and see the deer in the park. I\'m going to buy some souvenirs for my family.',
              'What is the girl going to buy?', ['Some deer food.', 'Some books.', 'A camera.', 'Some souvenirs.'], 3,
              'I\'m going to buy some souvenirs for my family. とあります。'),
            L('N: Good morning, students. Tomorrow, the school bus will leave thirty minutes early because of the road work. Please be at the bus stop by seven fifteen.',
              'Why will the bus leave early tomorrow?', ['Because of the road work.', 'Because of the snow.', 'Because of a school event.', 'Because the driver is sick.'], 0,
              'because of the road work(道路工事のため)とあります。'),
            L('B: My father is a pilot. He flies planes between Tokyo and Singapore. He is often away from home, but he always brings me something when he comes back. I want to be a pilot like him.',
              'What does the boy want to be in the future?', ['A teacher.', 'A pilot.', 'A flight attendant.', 'A doctor.'], 1,
              'I want to be a pilot like him. とあります。'),
            L('W: I started jogging last month. At first, I could only run for ten minutes. Now I can run for thirty minutes. I want to join a ten-kilometer race next spring.',
              'How long can the woman run now?', ['For ten minutes.', 'For twenty minutes.', 'For thirty minutes.', 'For one hour.'], 2,
              'Now I can run for thirty minutes. とあります。'),
            L('G: I usually walk to school with my friend Emi. But this week, Emi has a cold, so I\'m walking alone. I hope she gets better soon.',
              'Why is the girl walking to school alone this week?', ['Emi moved to another town.', 'Emi has a cold.', 'Emi goes by bus now.', 'Emi has club practice.'], 1,
              'Emi has a cold(エミがかぜをひいている)とあります。'),
        ]},
    ],
}
