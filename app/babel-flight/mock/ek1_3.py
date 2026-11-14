# 英検1級 模試 第3回 (オリジナル問題). Format: see SPEC['ek1'] in build.py.
from mxh import G, L, LQ, B

TEST = {
    'R': [
        {'type': 'gap', 'items': [
            G('The company\'s profits have been (　) in recent years, falling steadily as competition has increased.', ['dwindling', 'burgeoning', 'soaring', 'proliferating'], 0,
              'dwindle で「次第に減る」。ほかは増える意味です。'),
            G('The court\'s decision set an important (　) that will influence similar cases for decades.', ['prototype', 'premise', 'precedent', 'pretext'], 2,
              'precedent で「先例、判例」。'),
            G('The diplomat was praised for her (　) handling of the tense negotiations, which avoided offending either side.', ['clumsy', 'brash', 'callous', 'deft'], 3,
              'deft で「手際のよい、巧みな」。'),
            G('The heavy rain (　) the rescue efforts, making it difficult for helicopters to reach the stranded hikers.', ['expedited', 'hampered', 'galvanized', 'bolstered'], 1,
              'hamper で「妨げる」。'),
            G('The theory was once widely accepted but has since been (　) by new evidence.', ['endorsed', 'espoused', 'vindicated', 'debunked'], 3,
              'debunk で「誤りを暴く、論破する」。but のあとで「新しい証拠に否定された」流れです。'),
            G('The CEO\'s (　) remarks about his employees caused an uproar on social media.', ['disparaging', 'laudatory', 'benevolent', 'eloquent'], 0,
              'disparaging で「見下した、けなすような」。'),
            G('Years of neglect had left the historic theater in a (　) state, with a leaking roof and broken seats.', ['pristine', 'robust', 'dilapidated', 'meticulous'], 2,
              'dilapidated で「荒れ果てた」。'),
            G('The scientist was reluctant to (　) on the cause of the illness until more tests had been done.', ['elaborate', 'speculate', 'capitulate', 'reciprocate'], 1,
              'speculate on ～ で「～について推測する」。'),
            G('The two companies\' cultures were so different that the merger was (　) to problems from the start.', ['prone', 'immune', 'averse', 'oblivious'], 0,
              'be prone to ～ で「～に陥りやすい」。'),
            G('The novel\'s (　) plot, full of unexpected twists, kept readers guessing until the final page.', ['mundane', 'predictable', 'monotonous', 'intricate'], 3,
              'intricate で「入り組んだ、複雑な」。'),
            G('The new manager quickly gained a reputation for being (　), refusing to change her mind once she had made a decision.', ['amenable', 'obstinate', 'pliable', 'docile'], 1,
              'obstinate で「頑固な」。ほかは素直・従順の意味です。'),
            G('Rising sea levels pose a serious threat to low-lying island nations, some of which may become (　) within this century.', ['arable', 'fertile', 'uninhabitable', 'autonomous'], 2,
              'uninhabitable で「人が住めない」。'),
            G('The politician tried to (　) the blame for the failure onto his advisers.', ['shift', 'sift', 'shun', 'shirk'], 0,
              'shift the blame onto ～ で「責任を～に押しつける」。'),
            G('The charity\'s work has been (　) by a lack of funding, forcing it to close several of its centers.', ['buoyed', 'spurred', 'enriched', 'crippled'], 3,
              'cripple で「(機能を)まひさせる、大打撃を与える」。'),
            G('The athlete\'s (　) recovery from a serious knee injury surprised even her doctors.', ['sluggish', 'tentative', 'swift', 'dismal'], 2,
              'swift で「迅速な」。医師も驚くほどの早い回復です。'),
            G('Due to a (　) of applications, the university extended its deadline by two weeks.', ['glut', 'dearth', 'surfeit', 'plethora'], 1,
              'dearth で「不足」。応募が少ないので締め切りを延ばしました。ほかは「過剰」の意味です。'),
            G('The new evidence (　) doubt on the official explanation of the accident.', ['cast', 'drew', 'made', 'took'], 0,
              'cast doubt on ～ で「～に疑いを投げかける」。'),
            G('Despite the economic downturn, the company managed to (　) the storm without laying off any workers.', ['brew', 'stir', 'weather', 'whip'], 2,
              'weather the storm で「難局を乗り切る」。'),
            G('Tom tried to (　) up a conversation with the woman sitting next to him on the plane.', ['crank', 'strike', 'cave', 'break'], 1,
              'strike up a conversation で「会話を始める」。'),
            G('The rumors about the company\'s financial troubles eventually (　) out to be true.', ['came', 'set', 'gave', 'turned'], 3,
              'turn out to be ～ で「～だとわかる」。'),
            G('After weeks of debate, the committee finally (　) on a design for the new city hall.', ['settled', 'sorted', 'sized', 'sealed'], 0,
              'settle on ～ で「～に決める」。'),
            G('The tech company is trying to (　) out older models of its phones to focus on its newest products.', ['bail', 'stake', 'phase', 'fend'], 2,
              'phase out で「段階的に廃止する」。'),
        ]},
        {'type': 'pgap', 'blocks': [
            B('[A]', 'text', '''Look closely at almost any park or university campus, and you will find narrow dirt tracks cutting across the grass, where people have repeatedly taken shortcuts instead of following the paved paths. Urban planners call these "desire paths." To some, they are simply a nuisance, evidence that people ( 23 ). Increasingly, however, designers see them as valuable information about how people actually want to move through a space.
Some planners have even used them deliberately. Rather than laying paths when a new campus or park opens, they ( 24 ). Once clear tracks have formed in the grass, the most heavily used routes are then paved. This approach, which has been attributed to several universities, is said to produce layouts that are both convenient and well used.
Desire paths also illustrate a broader lesson for designers. People tend to choose the most efficient route, even if it means ignoring signs or stepping over low fences. ( 25 ), designs that work against human behavior are likely to fail, no matter how attractive they appear on paper.''', [
                G('', ['enjoy walking on grass', 'ignore the designers\' plans', 'need more benches', 'prefer paved surfaces'], 1,
                  '舗装された道を通らず近道をする=「設計者の計画を無視している」証拠、という見方です。'),
                G('', ['ask students to vote on a design', 'copy the layouts of older campuses', 'build fences around the grass', 'wait to see where people walk'], 3,
                  '最初に道を作らず、芝生に跡ができてから舗装する=「人がどこを歩くか様子を見る」。'),
                G('', ['Ultimately', 'Conversely', 'Meanwhile', 'Alternatively'], 0,
                  '人は効率的な道を選ぶ→「結局のところ」人の行動に逆らう設計は失敗する、というまとめです。'),
            ], title='Paths of Desire'),
            B('[B]', 'text', '''For many years, it was widely believed that speaking two languages gave people a general mental advantage. Early studies suggested that bilinguals, who constantly switch between languages and suppress the one they are not using, ( 26 ). These findings were widely reported in the media and encouraged many parents to raise their children bilingually.
More recently, however, the so-called bilingual advantage has come under scrutiny. Several large-scale studies involving thousands of participants have ( 27 ) between bilinguals and monolinguals on tasks measuring attention and self-control. Some researchers argue that the earlier studies were too small and that journals were more likely to publish positive results than negative ones.
None of this means that learning a second language is not worthwhile. ( 28 ), the debate highlights the importance of replicating scientific findings before drawing broad conclusions from them.''', [
                G('', ['learned languages more slowly', 'preferred one language strongly', 'performed better on tasks requiring focus and self-control', 'had smaller vocabularies'], 2,
                  '「頭脳面の利点」を示した初期研究の内容なので、「集中力や自制心が必要な課題で成績が良かった」。'),
                G('', ['found little or no difference', 'discovered large gaps', 'confirmed the advantage', 'measured language ability'], 0,
                  'however で利点が疑われていると続くので、大規模研究では「ほとんど差がなかった」。'),
                G('', ['As expected', 'In the same way', 'For example', 'Rather'], 3,
                  'None of this means … を受けて、「そうではなく、むしろ」再現の大切さを示している、という流れ。'),
            ], title='Is There a Bilingual Advantage?'),
        ]},
        {'type': 'passage', 'blocks': [
            B('[A]', 'text', '''In July 1518, a woman known as Frau Troffea stepped into a street in the city of Strasbourg and began to dance. She continued for days, apparently unable to stop. Within weeks, dozens of other people had joined her, and according to some accounts, as many as 400 people were eventually affected. Some reportedly danced until they collapsed from exhaustion.
The response of the city's authorities seems strange today. Believing that the dancers suffered from "hot blood" and needed to dance it out, officials opened halls, built a wooden stage, and even hired musicians to keep the dancers moving. Unsurprisingly, this only seemed to make matters worse, and the authorities eventually changed course, banning public music and dancing and sending the dancers to a shrine to pray for a cure.
Historians have long debated what caused the outbreak. One theory blames ergot, a fungus that grows on rye and can cause hallucinations and spasms. However, ergot poisoning usually restricts blood flow to the arms and legs, making long periods of dancing physically unlikely. Many historians now favor the view that the episode was a form of mass psychogenic illness. The people of Strasbourg had recently suffered from famine and disease, and a widespread belief in a saint who could curse people with uncontrollable dancing may have shaped how their extreme distress was expressed.''', [
                G('How did the authorities first respond to the dancing?', ['They arrested the dancers.', 'They encouraged the dancers to keep dancing.', 'They called doctors from other cities.', 'They closed the city to visitors.'], 1,
                  '「熱い血」を踊って出すべきだと考え、ホールや舞台、楽団まで用意しました。'),
                G('Why do some historians doubt the ergot theory?', ['Rye was not grown near Strasbourg.', 'Ergot causes people to sleep for days.', 'No one in the city ate bread at the time.', 'Ergot poisoning makes long periods of dancing unlikely.'], 3,
                  '麦角中毒は手足の血流を妨げるので、長時間踊り続けるのは考えにくいからです。'),
                G('According to many historians, what may have contributed to the outbreak?', ['Extreme distress combined with religious beliefs.', 'A new type of music that was popular at the time.', 'A fungus that grew in the city\'s water supply.', 'A festival that lasted several weeks.'], 0,
                  '飢饉や病気による極度の苦しみと、踊りの呪いをかける聖人への信仰が影響したと考えられています。'),
            ], title='The Dancing Plague'),
            B('[B]', 'text', '''On March 27, 1977, two Boeing 747s collided on a fog-covered runway at Tenerife in the Canary Islands, killing 583 people. It remains the deadliest accident in aviation history. Both planes had been diverted to the small island airport after a bomb exploded at their original destination, and the crowded airport, thick fog, and pressure to depart before the crew's legal working hours ran out created a dangerous combination.
The investigation found that the captain of one aircraft began his takeoff without clearance from air traffic control. Radio messages had been partly blocked by simultaneous transmissions, and the phrases used by the pilots and controllers were ambiguous. Most strikingly, the plane's flight engineer appeared to question whether the other aircraft was still on the runway, but the captain, a senior and highly respected pilot, dismissed the concern, and the takeoff continued.
The disaster, together with several other accidents in the 1970s, led the aviation industry to rethink how cockpit crews work together. The result was a training approach known as crew resource management, or CRM. Rather than relying on the authority of the captain alone, CRM teaches crews to share information openly, to question decisions when something seems wrong, and to confirm critical instructions. Junior crew members are explicitly encouraged to speak up, and captains are trained to listen.
Standard radio language was also tightened. Today, the word "takeoff" is used only when a plane is actually cleared to take off; at other times, controllers and pilots use the word "departure." The principles of CRM have since spread beyond aviation to fields such as surgery and firefighting, where teamwork under pressure can be a matter of life and death.''', [
                G('Why were both planes at Tenerife airport?', ['They had stopped to refuel on a long flight.', 'They were scheduled to fly together.', 'They had been diverted after a bomb exploded elsewhere.', 'The fog had closed all other airports.'], 2,
                  '本来の目的地の空港で爆弾が爆発し、小さな島の空港に回されていました。'),
                G('What does the passage suggest about the flight engineer?', ['He gave the order to take off.', 'He raised a concern that was not acted upon.', 'He was responsible for the radio problems.', 'He was the most senior member of the crew.'], 1,
                  '相手機がまだ滑走路にいるのではと疑問を示しましたが、機長に退けられました。'),
                G('What is one principle of crew resource management?', ['The captain should make all decisions alone.', 'Crews should avoid talking during takeoff.', 'Junior crew members should follow orders without question.', 'Crew members should question decisions that seem wrong.'], 3,
                  'おかしいと思った判断には疑問を投げかけるよう教えます。'),
                G('What change was made to radio language?', ['The word "takeoff" is used only when a plane is cleared to take off.', 'Pilots must use their own language when talking to controllers.', 'Controllers no longer use the word "departure."', 'Messages are now sent only in writing.'], 0,
                  '「takeoff」は離陸許可のときだけ使い、それ以外は「departure」と言います。'),
            ], title='Learning from Tenerife'),
        ]},
        {'type': 'summary',
         'prompt': '以下の英文を読んで、その内容を英語で要約し、解答欄に記入しなさい。\n語数の目安は90語〜110語です。',
         'body': '''In recent years, diamonds grown in laboratories have rapidly gained a share of the jewelry market. These stones are created by reproducing the high temperature and pressure found deep inside the Earth, or by depositing carbon atoms layer by layer, and they are physically and chemically identical to diamonds dug from the ground. Because they can be produced in weeks rather than formed over billions of years, they are far cheaper than mined stones.
Supporters say that lab-grown diamonds offer clear advantages. Consumers can buy larger stones for the same price, and they need not worry that their purchase has funded conflicts or harmful working conditions, which have been linked to some mines in the past. Producers also claim that growing diamonds causes less damage to the landscape than mining.
Critics, however, point out that the environmental benefits depend heavily on how the electricity used in production is generated. They also warn that falling prices could hurt countries such as Botswana, whose economies rely on diamond mining for jobs and government income. Some jewelers add that lab-grown stones may not keep their value over time as production becomes cheaper.''',
         'rules': ['解答は、英文要約の解答欄に書きなさい。なお、解答欄の外に書かれたものは採点されません。', '要約の内容が英文から逸れていると判断された場合は、0点と採点されることがあります。英文をよく読んでから答えてください。'],
         'model': 'Laboratory-grown diamonds, which are identical to mined diamonds but can be produced quickly by imitating conditions inside the Earth, have become much more popular because they cost far less. Supporters argue that they let consumers buy larger stones cheaply, avoid links to conflicts and poor working conditions at some mines, and cause less damage to the land. Critics, however, say their environmental benefits depend on how the electricity used to make them is produced, and that falling prices could harm countries like Botswana that depend on mining. Some jewelers also doubt that these stones will keep their value.',
         'checks': ['人工ダイヤとは何か(天然と同じ・安い・広がっている)が入っている', '支持する理由(安さ・紛争や労働問題との無関係・土地への影響)が入っている', '批判(電力の作り方・産出国への打撃・価値の維持)が入っている', '本文をそのまま写さず、言いかえて短くまとめている', '語数が90〜110語になっている']},
        {'type': 'opinion',
         'prompt': '以下のTOPICについて、あなたの意見とその理由を2つ書きなさい。\nPOINTSは理由を書く際の参考となる観点を示したものです。ただし、これら以外の観点から理由を書いてもかまいません。\n\nTOPIC\nShould museums return cultural artifacts to their countries of origin?\n\nPOINTS\n・Justice\n・Cultural identity\n・Preservation\n・International cooperation',
         'rules': ['語数の目安は200語〜240語です。', '構成は、序論・本論・結論が望ましい。', 'TOPICに示された問いに答えていない場合や、内容がTOPICからずれている場合は、0点と採点されることがあります。'],
         'model': 'Many of the world\'s most famous museums contain objects that were taken from other countries, often during periods of colonial rule or war. In my view, museums should return such artifacts to their countries of origin, for two main reasons.\nFirst, returning artifacts is a matter of justice. Many of these objects were removed without the consent of the people who created them, sometimes by force. Keeping them in foreign museums continues an injustice that began long ago. Returning them would acknowledge this history and show respect for the cultures from which they came.\nSecond, artifacts have the greatest meaning in the places where they were made. For local communities, they are not merely objects of display but part of their identity, religion, and history. When they are returned, people can learn about their own heritage directly, and young generations can develop a stronger connection to their culture.\nSome argue that major museums are better equipped to preserve fragile objects and that they allow more people to see them. However, many countries of origin now have modern museums of their own, and international cooperation, such as loans and joint exhibitions, can ensure that artifacts remain accessible to a global audience.\nIn conclusion, because it corrects historical injustices and restores cultural heritage to the communities to which it belongs, the return of artifacts should be actively pursued.',
         'checks': ['序論で自分の立場をはっきり述べている', 'POINTSなどを使った理由を2つ、具体例とともに書いている', '反対意見にふれ、それに答えている(Some argue … However …)', '結論で立場と理由をまとめ直している', '語数が200〜240語になっている']},
    ],
    'L': [
        {'type': 'dlg', 'items': [
            L('M: Jess, I heard the board rejected your proposal for the new customer app.\nW: Not exactly. They liked the idea but felt the timeline was unrealistic.\nM: So what happens now?\nW: They\'ve asked me to come back next month with a phased plan, launching the basic features first and adding the rest later.\nM: That sounds more manageable, honestly.',
              'What is the woman going to do?', ['Abandon the app project.', 'Present a revised plan that introduces features in stages.', 'Launch the app with all its features next month.', 'Look for funding outside the company.'], 1,
              '基本機能から段階的に出す計画を来月あらためて提出します。'),
            L('W: You look exhausted. Is the new puppy keeping you up?\nM: Every night. She cries whenever we leave her alone in the kitchen.\nW: Have you tried putting her crate in your bedroom? My trainer said puppies settle down faster when they can hear their owners.\nM: We were worried that would create a bad habit.\nW: You can move the crate out gradually once she\'s calmer.\nM: All right. We\'ll give it a shot tonight.',
              'What will the man probably do tonight?', ['Leave the puppy alone in the kitchen.', 'Hire a dog trainer.', 'Let the puppy sleep on his bed.', 'Move the puppy\'s crate into his bedroom.'], 3,
              'クレートを寝室に置く方法を今夜試します。'),
            L('M: Professor Lang, I wanted to ask about my grade on the midterm essay.\nW: Of course. I thought your research was excellent, but your argument wasn\'t clearly structured.\nM: I see. Is there any way to improve my grade?\nW: I don\'t allow rewrites, but the final paper counts for 40 percent. If you\'d like, bring me an outline two weeks before it\'s due, and I\'ll give you feedback.\nM: I\'ll definitely do that.',
              'What does the professor offer to do?', ['Comment on the student\'s outline for the final paper.', 'Let the student rewrite the midterm essay.', 'Change the student\'s midterm grade.', 'Reduce the weight of the final paper.'], 0,
              '期末レポートの構成案を見てアドバイスすると申し出ています。書き直しは認めていません。'),
            L('W: Have you heard? Our department is moving to the new building downtown in April.\nM: Downtown? My commute will double.\nW: Mine will be shorter, but I know several people feel the same way you do. Apparently, management is considering letting people work from home two days a week to make up for it.\nM: If that happens, I could live with the move.',
              'What does the man imply?', ['He will quit if the department moves.', 'He prefers working in the office every day.', 'Partial remote work would make the move acceptable to him.', 'His commute will become shorter.'], 2,
              '週2日の在宅勤務が認められれば移転を受け入れられる、と言っています。'),
            L('M: Did you finish reading the market research report?\nW: Yes. The survey results are encouraging, but the sample is quite small: only 200 people, mostly in their twenties.\nM: Our target customers are mainly people in their forties and fifties.\nW: Exactly. I don\'t think we can base a major decision on it. We should commission a broader survey before the launch.\nM: Agreed. I\'ll bring it up at tomorrow\'s meeting.',
              'What is the woman\'s concern about the report?', ['It does not represent the company\'s main customers.', 'The survey results are discouraging.', 'It took too long to complete.', 'It is too expensive to repeat.'], 0,
              '回答者が20代中心で、主な顧客の40〜50代を反映していません。'),
            L('W: Hello, I\'m calling to complain about my recent stay at your hotel. I booked a room with a sea view, but my room faced the parking lot.\nM: I\'m very sorry, ma\'am. May I have your reservation number?\nW: It\'s 4471.\nM: Thank you. I see the problem. We\'ll refund the difference between the two room types, and we\'d also like to offer you a free night on your next visit.\nW: Well, I appreciate that.',
              'What does the hotel offer?', ['A full refund for her stay.', 'An immediate upgrade to a suite.', 'A partial refund and a free night in the future.', 'A discount on parking.'], 2,
              '部屋の差額の返金と、次回の無料宿泊を申し出ています。'),
            L('M: Are you going to vote for the plan to build the new library?\nW: I\'m leaning toward no. The current library is in perfectly good condition.\nM: But it\'s too small. There\'s no space for study groups or children\'s events.\nW: Then why not renovate and expand the existing building? It would cost half as much.\nM: That\'s actually not a bad idea. Has anyone suggested it at the council?',
              'What does the woman propose?', ['Building a new library.', 'Closing the library on weekends.', 'Moving the library downtown.', 'Expanding the current library.'], 3,
              '今の建物を改修して広げることを提案しています。'),
            L('W: Ken, could you look over my presentation before the client meeting?\nM: Sure. Hmm, the data is strong, but you have over forty slides for a thirty-minute meeting.\nW: I know it\'s a lot, but I wanted to cover everything.\nM: Clients usually remember only a few key points. I\'d cut it down to fifteen slides and put the rest in a handout.\nW: Good idea. I\'ll do that tonight.',
              'What does the man suggest?', ['Adding more data to the slides.', 'Reducing the number of slides and giving a handout.', 'Extending the meeting to an hour.', 'Asking the client what they want to see.'], 1,
              'スライドを15枚にしぼり、残りは配布資料にするよう勧めています。'),
            L('M: I\'m thinking about switching from the economics major to computer science.\nW: Isn\'t it a bit late? You\'re already in your third year.\nM: I know, but I\'ve really enjoyed the programming electives I\'ve taken. The adviser said I\'d need an extra year to graduate.\nW: Have you considered a minor in computer science instead? You could still graduate on time.\nM: Hmm, that might be the best of both worlds.',
              'What does the woman suggest?', ['Adding computer science as a minor.', 'Changing majors immediately.', 'Taking an extra year to graduate.', 'Dropping the programming electives.'], 0,
              '副専攻にすれば予定どおり卒業できると提案しています。'),
            L('W: The manufacturer just told us the parts shipment will be three weeks late.\nM: Three weeks? We promised the customer delivery by the end of the month.\nW: I checked with another supplier. They can deliver in one week, but their parts cost about 20 percent more.\nM: Paying more is better than breaking our promise. Go ahead and place the order.',
              'What does the man decide?', ['To ask the customer for more time.', 'To cancel the customer\'s order.', 'To wait for the original shipment.', 'To buy the parts from another supplier.'], 3,
              '約束を守るため、高くても別の業者から部品を買うことにしました。'),
        ]},
        {'type': 'mono', 'items': [
            LQ('N: Why We Yawn. Although everyone yawns, scientists still do not fully agree on why. One popular theory is that yawning helps cool the brain. Taking in a large breath of air and stretching the jaw may increase blood flow and bring cooler air into the head, helping the brain work more efficiently. Yawning is also famously contagious: seeing, hearing, or even reading about yawning can make people yawn. Some studies have found that people are more likely to catch yawns from family members and close friends than from strangers, suggesting a link with social bonds.', [
                G('What is one theory about why people yawn?', ['It helps cool the brain.', 'It helps people fall asleep.', 'It increases the amount of oxygen in the blood.', 'It strengthens the jaw muscles.'], 0,
                  'yawning helps cool the brain という説が紹介されています。'),
                G('What have some studies found?', ['Strangers make people yawn more than friends do.', 'Only humans catch yawns from others.', 'People catch yawns more easily from people close to them.', 'Reading about yawning has no effect.'], 2,
                  '他人より家族や親しい友人からあくびがうつりやすいとわかりました。'),
            ], title='Why We Yawn'),
            LQ('N: Flying Far from Land. For decades, airliners with only two engines were not allowed to fly long routes over oceans, because if one engine failed, the plane needed to be able to reach an airport quickly. In 1985, regulators introduced rules known as ETOPS, which allowed twin-engine planes to fly up to two hours away from the nearest airport if they met strict reliability standards. As engines became more reliable, these limits were gradually extended, and some aircraft are now certified to fly more than five hours from the nearest airport. This change made it possible for efficient twin-engine planes to replace larger four-engine jets on most long-distance routes.', [
                G('Why were twin-engine planes once restricted on ocean routes?', ['They could not carry enough passengers.', 'They were slower than four-engine jets.', 'They used too much fuel.', 'They needed to reach an airport quickly if an engine failed.'], 3,
                  'エンジンが1つ止まったとき、すぐに空港へ行ける必要があったからです。'),
                G('What was one result of the ETOPS rules?', ['Four-engine jets became more common.', 'Twin-engine planes replaced larger jets on many long routes.', 'Planes were required to fly closer to land.', 'Airports were built in the middle of oceans.'], 1,
                  '燃費の良い双発機が、長距離路線で大型の4発機に取って代わりました。'),
            ], title='Flying Far from Land'),
            LQ('N: Underground Networks. Beneath the forest floor, the roots of many trees are connected by vast networks of fungi. The fungi supply trees with water and nutrients from the soil, and in return, they receive sugars that the trees produce through photosynthesis. Some researchers have suggested that trees use these networks to share resources and even send warning signals to one another, and the idea of a "wood wide web" has become popular in books and documentaries. However, other scientists caution that the evidence for such cooperation is limited and that popular accounts have often exaggerated what the research actually shows.', [
                G('What do the fungi receive from trees?', ['Water from the soil.', 'Protection from insects.', 'Sugars made through photosynthesis.', 'Warning signals.'], 2,
                  'in return, they receive sugars that the trees produce through photosynthesis とあります。'),
                G('What do some scientists say about the "wood wide web"?', ['Its importance may have been exaggerated.', 'It has been proven beyond doubt.', 'It exists only in tropical forests.', 'It harms the growth of trees.'], 0,
                  '証拠は限られていて、一般向けの説明は誇張されがちだと注意しています。'),
            ], title='Underground Networks'),
            LQ('N: A City That Wasted Nothing. During the Edo period, from the early 1600s to the mid-1800s, the city of Edo, now Tokyo, was one of the largest cities in the world, with a population of around one million. Yet it was remarkably clean. Almost everything was reused or recycled. Worn-out clothes were repaired many times and finally used as rags or burned as fuel, and the ashes were sold as fertilizer. Even human waste was collected by farmers, who paid for it and used it on their fields. Some historians see Edo as an early model of what is now called a circular economy.', [
                G('What was remarkable about Edo?', ['It had very few people.', 'It was very clean despite its large population.', 'It imported most of its goods.', 'It had no farmers nearby.'], 1,
                  '人口約100万の大都市なのに、とても清潔でした。'),
                G('What happened to human waste in Edo?', ['It was dumped into the sea.', 'It was burned as fuel.', 'It was used to make clothes.', 'Farmers paid for it and used it as fertilizer.'], 3,
                  '農家がお金を払って買い取り、畑の肥料にしました。'),
            ], title='A City That Wasted Nothing'),
            LQ('N: The Birth of a Language. In the late 1970s, Nicaragua opened its first schools for deaf children. Most of the students had grown up communicating only with simple home signs, and teachers tried to teach them lip-reading in Spanish, with little success. In the schoolyard and on buses, however, the children began combining their signs into a shared system. Over the following years, younger children who joined the schools turned this system into a full language with complex grammar. Linguists have studied Nicaraguan Sign Language closely because it offers a rare chance to observe a new language being born.', [
                G('How did the new sign language develop?', ['Deaf children created it while communicating with each other.', 'Teachers designed it for their students.', 'It was brought in from another country.', 'Linguists invented it for research.'], 0,
                  '校庭やバスで子どもたちが手話を組み合わせて共通の体系を作りました。'),
                G('Why are linguists interested in Nicaraguan Sign Language?', ['It is the oldest sign language in the world.', 'It uses Spanish grammar.', 'It shows how a new language comes into being.', 'It is used only by teachers.'], 2,
                  '新しい言語が生まれる様子を観察できる、めったにない機会だからです。'),
            ], title='The Birth of a Language'),
        ]},
        {'type': 'real', 'items': [
            L('M: Thank you for choosing Coastline Rentals. Child seats are available for an extra 1,000 yen per day. Infant seats are for babies under one year old, and booster seats are for children four and over. For children aged one to three, we have standard child seats, but they must be reserved at least 24 hours in advance. If you can\'t reserve in time, you\'re welcome to bring your own seat. Our partner shop next door also rents child seats, from 9 a.m.',
              'What should you do?', ['Reserve a booster seat.', 'Rent a seat from the partner shop.', 'Bring your own child seat.', 'Reserve an infant seat.'], 2,
              '3歳用は24時間前までの予約が必要で間に合わず、隣の店は9時開店で7時の受け取りに間に合いません。自分のシートを持参します。',
              situ='You are renting a car and need a child seat for your 3-year-old daughter. You will pick up the car at 7 a.m. tomorrow. It is now 8 p.m., and you have a child seat at home. The rental company tells you the following.'),
            L('W: Thank you for calling Blue Harbor Aquarium. Guided tours for school groups are available on weekdays at 10 a.m. and 1 p.m. Each tour can include up to 40 people. Groups larger than 40 must split into two tours. Reservations are required at least two weeks in advance and can be made only through our website. For questions about lunch areas, please press 2.',
              'What should you do?', ['Reserve a tour on the website at least two weeks ahead.', 'Call again and press 2.', 'Split the class into two tours.', 'Visit the aquarium on a weekend.'], 0,
              '35人なので1つのツアーに入れます。予約は2週間前までにウェブサイトで。',
              situ='You are a teacher planning a school trip to an aquarium for a group of 35 people, including teachers. You want to join a guided tour. You hear the following recorded message.'),
            L('M: Thank you for calling NetLink. Installation for new customers normally takes three weeks from the date of application, and in March it may take up to four weeks. Our Express plan, for an extra fee of 5,000 yen, lets you choose any installation date within the next two weeks. If you need internet sooner, we also offer a portable Wi-Fi router, which can be delivered in two days and used until installation is complete.',
              'What should you do?', ['Apply for standard installation.', 'Order only a portable Wi-Fi router.', 'Wait until March 20 to apply.', 'Apply for the Express plan.'], 3,
              '通常は3〜4週間で引っ越しに間に合わない。2週間以内なら日付を選べる Express なら3月20日に設置できます。',
              situ='You will move to a new apartment on March 20. You want home internet installed on the day you move in. Today is March 10. You call an internet provider.'),
            L('N: Good afternoon, everyone. A few changes to this afternoon\'s program: the session on AI in healthcare, originally scheduled for 2 p.m. in Hall A, has been moved to 4 p.m. in Hall C. The session on AI and education will begin as planned at 1:30 p.m. in Room 204 and will end at 2:45. The panel on renewable energy has been canceled. Finally, recordings of all sessions will be available online next week.',
              'What should you do?', ['Attend the session in Hall A at 2 p.m.', 'Go to Room 204 at 1:30 p.m.', 'Go to Hall C at 4 p.m.', 'Attend the renewable energy panel.'], 1,
              '3:30には出発するので、4時に移った医療AIは無理。1:30〜2:45の教育AIのセッションなら参加できます。',
              situ='You are at a conference. You want to attend a session about artificial intelligence, but you must leave the venue by 3:30 p.m. to catch a flight. You hear the following announcement.'),
            L('W: We can replace the screen for 30,000 yen with an original part from the manufacturer, but that takes about two weeks because we have to order it. We also have compatible screens in stock for 18,000 yen, and we can install one in three days. If your laptop were still under warranty, the manufacturer would repair it for free, but that usually takes three weeks. Or, if you\'d like, we can buy your laptop for 15,000 yen toward a new one.',
              'What should you do?', ['Order the original screen.', 'Ask the manufacturer to repair it for free.', 'Have a compatible screen installed.', 'Sell your laptop to the shop.'], 2,
              '予算25,000円・1週間以内に合うのは、18,000円で3日の互換画面です。保証は切れています。',
              situ='The screen of your laptop is broken. The warranty ended last month. You want it repaired within a week, and your budget is 25,000 yen. A repair shop employee tells you the following.'),
        ]},
        {'type': 'interview', 'items': [
            LQ('''N: This is an interview with Leo Martins, a flight dispatcher at a major airline.
W: Today we\'re talking with Leo Martins, a flight dispatcher. Leo, many people have never heard of your job. What does a dispatcher do?
M: In simple terms, we plan every flight before it leaves. We look at the weather, the winds at different altitudes, the weight of the aircraft, and any restrictions at airports along the way, and then we decide on the route and how much fuel to carry. The captain reviews the plan, and both of us have to agree before the flight can depart. In that sense, we share responsibility for the safety of the flight.
W: Does your work stop once the plane takes off?
M: Not at all. Each dispatcher monitors a number of flights at the same time. If a storm develops or an airport suddenly closes, we work with the pilots to find alternatives, such as a different route or a different airport to land at. We can send messages directly to the cockpit, even over the ocean.
W: What\'s the most challenging part of the job?
M: Balancing safety and efficiency. Carrying extra fuel makes a plane heavier, which means it burns more fuel. So you don\'t want to carry much more than you need. But you always need enough for unexpected situations. Getting that balance right, hundreds of times a day across the airline, makes a huge difference to both costs and emissions.
W: What kind of person is suited to this work?
M: Someone who stays calm when plans fall apart. On a bad weather day, everything can change in minutes, and you have to make sound decisions quickly while communicating clearly with many people.''', [
                G('What does Leo say about a dispatcher\'s responsibility?', ['Dispatchers decide which pilots will fly each plane.', 'Dispatchers are responsible only for fuel costs.', 'Dispatchers have no role after a plane takes off.', 'Dispatchers share responsibility with the captain for a flight\'s safety.'], 3,
                  '機長と運航管理者の両方が合意して出発し、安全の責任を分かち合うと述べています。'),
                G('Why is deciding how much fuel to carry challenging?', ['Fuel prices change every day.', 'Extra fuel adds weight, but some extra is needed for safety.', 'Pilots always want to carry as little fuel as possible.', 'Planes cannot be refueled at some airports.'], 1,
                  '余分な燃料は重さで燃費を悪くするが、予想外の事態に備える分は必要、というバランスです。'),
            ], title='Interview: The Flight Dispatcher'),
        ]},
    ],
}
