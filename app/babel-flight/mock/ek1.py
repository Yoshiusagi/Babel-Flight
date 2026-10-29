# 英検1級 模試 (オリジナル問題). Format: see SPEC['ek1'] in build.py.
from mxh import G, L, LQ, B

TEST = {
    'R': [
        {'type': 'gap', 'items': [
            G('The CEO\'s (　) apology, delivered in a flat voice with no real explanation, only made the public angrier.', ['ebullient', 'perfunctory', 'fastidious', 'magnanimous'], 1,
              'perfunctory で「おざなりの、形だけの」。'),
            G('Despite the economic downturn, the analyst remained (　) about the company\'s long-term prospects.', ['morose', 'despondent', 'sanguine', 'truculent'], 2,
              'sanguine で「楽観的な」。Despite(～にもかかわらず)と対比になります。'),
            G('The referee\'s (　) error in the final minutes cost the team the championship.', ['egregious', 'nascent', 'tenuous', 'laconic'], 0,
              'egregious で「(誤りなどが)ひどい、目に余る」。'),
            G('Social media can have a (　) effect on teenagers\' self-esteem if they constantly compare themselves with others.', ['salubrious', 'benign', 'placid', 'pernicious'], 3,
              'pernicious で「有害な」。salubrious は「健康によい」。'),
            G('The startup is still in its (　) stage, with only five employees and no profits yet.', ['moribund', 'nascent', 'venerable', 'obsolete'], 1,
              'nascent で「生まれたばかりの、初期の」。'),
            G('The program was (　) designed to help small businesses, but most of the money went to large corporations.', ['categorically', 'inexorably', 'ostensibly', 'vicariously'], 2,
              'ostensibly で「表向きは」。but 以下で実態が述べられています。'),
            G('Residents were (　) in their opposition to the new landfill, holding protests every weekend.', ['vociferous', 'reticent', 'apathetic', 'taciturn'], 0,
              'vociferous で「声高な、やかましく主張する」。'),
            G('The government tried to (　) the angry farmers by promising new subsidies.', ['provoke', 'exacerbate', 'incriminate', 'placate'], 3,
              'placate で「なだめる」。'),
            G('New evidence (　) the man who had spent ten years in prison for a crime he did not commit.', ['implicated', 'exculpated', 'extradited', 'indicted'], 1,
              'exculpate で「無罪を証明する」。'),
            G('The treaty was (　) when one of the countries withdrew, claiming that the other had broken its terms.', ['ratified', 'codified', 'abrogated', 'amended'], 2,
              'abrogate で「(条約・法律を)廃止する、破棄する」。'),
            G('Critics accused the opposition leader of trying to (　) unrest among workers for political gain.', ['foment', 'quell', 'assuage', 'allay'], 0,
              'foment で「(争い・不安を)あおる」。quell は「鎮める」。'),
            G('The new policies are intended to (　) the living conditions of people in the poorest neighborhoods.', ['deteriorate', 'obfuscate', 'vilify', 'ameliorate'], 3,
              'ameliorate で「改善する」。'),
            G('Over the decades, the once-innovative company\'s culture had (　), and new ideas were rarely welcomed.', ['flourished', 'ossified', 'diversified', 'galvanized'], 1,
              'ossify で「硬直化する」。新しい考えが歓迎されなくなった様子です。'),
            G('The use of certain pesticides has been (　) in several countries because of their effects on bees.', ['prescribed', 'subscribed', 'proscribed', 'transcribed'], 2,
              'proscribe で「禁止する」。prescribe(処方する)と混同しないように。'),
            G('The broadcast was (　) because of a technical problem, so viewers missed the final scene.', ['truncated', 'elongated', 'corroborated', 'embellished'], 0,
              'truncate で「(途中で)切り詰める、打ち切る」。'),
            G('The politician was (　) in the press after the scandal, even though many of the accusations later proved false.', ['lionized', 'exonerated', 'commended', 'vilified'], 3,
              'vilify で「けなす、中傷する」。'),
            G('The spokesperson tried to (　) the issue with vague language rather than give a clear answer.', ['elucidate', 'obfuscate', 'clarify', 'delineate'], 1,
              'obfuscate で「わかりにくくする、ぼかす」。'),
            G('The contractor tried to weasel (　) of his obligations by claiming that the contract was unclear.', ['off', 'over', 'out', 'through'], 2,
              'weasel out of ～ で「(責任など)からうまく逃れる」。'),
            G('Interest in the project petered (　) after the initial excitement faded.', ['out', 'up', 'in', 'down'], 0,
              'peter out で「次第に消える、尻すぼみになる」。'),
            G('When I asked for a refund, the store manager tried to fob me (　) with a discount coupon.', ['out', 'up', 'over', 'off'], 3,
              'fob 人 off with ～ で「人を～でごまかす、はぐらかす」。'),
            G('Despite years of poor harvests, the farmers managed to eke (　) a living.', ['up', 'out', 'off', 'in'], 1,
              'eke out a living で「なんとか生計を立てる」。'),
            G('The report glossed (　) the safety problems at the factory, focusing instead on its profits.', ['out', 'off', 'over', 'up'], 2,
              'gloss over ～ で「～をうやむやにする、取りつくろう」。'),
        ]},
        {'type': 'pgap', 'blocks': [
            B('[A]', 'text', '''It seems logical that having more options should make people happier. After all, a wider selection increases the chance of finding exactly what one wants. However, research in psychology suggests that ( 23 ). In a frequently cited experiment conducted in a supermarket, shoppers who were offered samples from a display of 24 varieties of jam were more likely to stop at the table, but those who saw only 6 varieties were far more likely to actually make a purchase.
Psychologists have proposed several explanations for this phenomenon. When faced with a large number of choices, people may feel overwhelmed and ( 24 ). Even when they do make a choice, they may be less satisfied with it, because they keep wondering whether one of the many alternatives would have been better.
Nevertheless, later studies have produced mixed results, and some researchers have failed to reproduce the original findings. It now appears that the effect depends heavily on circumstances, such as how familiar people are with the products and how clearly the options are organized. ( 25 ), businesses may do better to help customers navigate their choices than simply to reduce them.''', [
                G('', ['people always prefer fewer options', 'too much choice can sometimes have the opposite effect', 'choice has no effect on happiness', 'shoppers rarely notice how many options there are'], 1,
                  'However のあと、ジャムの実験で「選択肢が多いと逆効果になることもある」と示しています。'),
                G('', ['buy more products than they need', 'choose the most expensive option', 'postpone making a decision altogether', 'ask other shoppers for advice'], 2,
                  '選択肢に圧倒されて「決断そのものを先送りする」ので、購入が減ります。'),
                G('', ['By contrast', 'In light of this', 'Even so', 'Above all'], 1,
                  '効果は状況しだい → それをふまえると(In light of this)、選択を助けるほうがよい。'),
            ], title='The Paradox of Choice'),
            B('[B]', 'text', '''In April 1815, Mount Tambora in what is now Indonesia erupted in one of the most powerful volcanic explosions in recorded history. The eruption killed tens of thousands of people in the surrounding region, but its effects ( 26 ). Huge amounts of ash and sulfur gases were thrown high into the atmosphere, where they spread around the globe and reflected sunlight back into space.
The following year, 1816, became known in Europe and North America as "the Year Without a Summer." Snow fell in parts of New England in June, and cold, wet weather caused crops to fail across much of Europe. Food prices rose sharply, and in some areas, ( 27 ). Historians have linked these events to riots and to a wave of emigration from Europe to North America.
The gloomy weather also had unexpected cultural effects. That summer, a group of English writers staying near Lake Geneva in Switzerland were forced to spend much of their time indoors. To pass the time, they challenged one another to write ghost stories. ( 28 ), one of them, Mary Shelley, began writing Frankenstein, which would become one of the most famous novels in English literature.''', [
                G('', ['lasted only a few days', 'were limited to the island itself', 'were felt far beyond Indonesia', 'were mostly beneficial'], 2,
                  '火山灰や硫黄ガスが地球全体に広がった、と続くので「インドネシアをはるかに越えて」。'),
                G('', ['farmers produced record harvests', 'people faced severe food shortages', 'the government banned all imports', 'summer festivals were held as usual'], 1,
                  '凶作と食料価格の高騰 → 深刻な食料不足。暴動や移民の話にもつながります。'),
                G('', ['As a result', 'In contrast', 'Nonetheless', 'For instance'], 0,
                  '怪奇小説を書き合った「結果として」フランケンシュタインが生まれました。'),
            ], title='The Year Without a Summer'),
        ]},
        {'type': 'passage', 'blocks': [
            B('[A]', 'text', '''Today, thousands of aircraft are in the sky at any given moment, yet collisions between them are extremely rare. This remarkable safety record is largely due to air traffic control, a system that guides planes on the ground and in the air. Its origins, however, were surprisingly simple.
In 1929, at an airport in St. Louis in the United States, a man named Archie League is often credited with becoming one of the first air traffic controllers. Standing on the airfield with a set of flags, he signaled pilots when it was safe to take off or land. As air traffic grew in the 1930s, flags were replaced by radio communication and control towers, allowing controllers to give more detailed instructions. Radar, developed for military purposes during World War II, later made it possible for controllers to track aircraft even when they could not see them.
Despite these advances, the system remained fragmented for many years. In 1956, two passenger planes collided over the Grand Canyon, killing everyone on board both aircraft. At the time, much of the airspace outside the areas around airports was not controlled, and pilots were largely responsible for avoiding one another. The tragedy shocked the public and led to major reforms, including the creation in 1958 of a federal agency with authority over civil aviation safety throughout the country.
In recent years, air traffic control has entered another period of change. Satellite-based systems allow aircraft to broadcast their precise positions continuously, giving controllers and other pilots a more accurate picture than traditional radar. Supporters say such technology will allow planes to fly more direct routes, saving fuel and reducing delays. Nevertheless, experts emphasize that technology alone cannot guarantee safety; the judgment and communication skills of human controllers remain essential, particularly when unexpected situations arise.''', [
                G('What role did Archie League play in the history of air traffic control?', ['He invented radar for use at airports.', 'He was among the first people to direct planes at an airport.', 'He founded a federal aviation agency.', 'He designed the first control tower.'], 1,
                  '1929年に旗で離着陸の合図をした、最初期の管制官とされています。'),
                G('According to the passage, the 1956 collision over the Grand Canyon', ['occurred because radar had not yet been invented.', 'happened in an area where flags were still used.', 'took place in airspace where pilots were mostly responsible for avoiding each other.', 'was caused by a satellite failure.'], 2,
                  '空港周辺以外の多くは管制されず、パイロットが互いを避ける責任を負っていました。'),
                G('What do experts emphasize about new satellite-based systems?', ['Human judgment will still be necessary.', 'They will soon replace all human controllers.', 'They are less accurate than traditional radar.', 'They will make flights longer but safer.'], 0,
                  'technology alone cannot guarantee safety; the judgment ... of human controllers remain essential とあります。'),
            ], title='Guiding the Skies'),
            B('[B]', 'text', '''Does the language we speak shape the way we think? This question, often associated with the linguists Edward Sapir and Benjamin Lee Whorf, has been debated for nearly a century. In its strongest form, the idea, sometimes called linguistic determinism, holds that language determines thought, so that people cannot think about concepts for which their language has no words. Few researchers today accept this version. People routinely understand ideas that their language does not express in a single word, and translation between languages, though imperfect, is clearly possible.
A weaker version of the hypothesis, however, has received considerable support. According to this view, known as linguistic relativity, the habits of a language can influence how its speakers pay attention to and remember certain aspects of the world. One frequently cited example involves color. Russian has two basic words for blue, one for lighter shades and one for darker shades. In experiments, Russian speakers were faster at distinguishing between light and dark blues when the colors fell on different sides of this linguistic boundary, an advantage that English speakers did not show.
An even more striking case comes from languages that describe space using cardinal directions rather than words such as "left" and "right." Speakers of Guugu Yimithirr, an Aboriginal language of Australia, might say that a cup is to the north of a plate rather than to its left. Researchers have found that speakers of such languages maintain a remarkably accurate sense of direction, even indoors or in unfamiliar places, presumably because their language requires them to keep track of it constantly.
Critics caution that such findings must be interpreted carefully. Differences in thinking might arise from culture or environment rather than from language itself, and it is often difficult to separate these factors. Moreover, the effects found in laboratory experiments are sometimes small. Still, most researchers now agree that language and thought interact in subtle ways, even if language does not imprison the mind as the strongest version of the hypothesis once suggested.''', [
                G('Why do few researchers today accept linguistic determinism?', ['Most languages have the same words for colors.', 'People can understand concepts their language lacks a single word for.', 'Sapir and Whorf later rejected the idea themselves.', 'No experiments have ever tested it.'], 1,
                  '一語で表せない概念も理解でき、翻訳も可能だからです。'),
                G('What did the experiments with Russian speakers show?', ['Russian speakers cannot see the color blue clearly.', 'English speakers distinguished blues faster than Russian speakers.', 'Russian speakers were faster at telling apart blues across their language\'s boundary.', 'Color words have no effect on perception.'], 2,
                  '言語上の境界をまたぐ明るい青と暗い青の区別がより速かったのです。'),
                G('According to the passage, speakers of Guugu Yimithirr', ['maintain an accurate sense of direction even indoors.', 'use the words "left" and "right" more often than English speakers.', 'have difficulty describing the location of objects.', 'learn cardinal directions only as adults.'], 0,
                  'maintain a remarkably accurate sense of direction, even indoors とあります。'),
                G('Which of the following best describes the view of most researchers today?', ['Language completely determines what people can think.', 'Language has no influence on thought at all.', 'Culture, not language, is the only factor that shapes thinking.', 'Language and thought influence each other in subtle ways.'], 3,
                  'most researchers now agree that language and thought interact in subtle ways とあります。'),
            ], title='Language and Thought'),
        ]},
        {'type': 'summary',
         'prompt': '以下の英文を読んで、その内容を英語で要約し、解答欄に記入しなさい。\n語数の目安は90語〜110語です。',
         'body': '''In recent decades, a conservation approach known as rewilding has attracted growing attention. Rather than carefully managing every aspect of a natural area, rewilding aims to restore ecosystems by allowing natural processes to take over, often by reintroducing species that once lived there. In Britain, for example, beavers have been released in several areas after disappearing from the country centuries ago.
Supporters argue that rewilding can bring wide-ranging benefits. Beavers build dams that slow the flow of rivers, which can reduce flooding downstream and create wetlands where many other species thrive. Large plant-eating animals such as wild cattle and horses can keep grasslands open, increasing the variety of plants and insects. Rewilded areas may also attract tourists, providing new sources of income for rural communities.
However, rewilding is not without controversy. Farmers sometimes worry that reintroduced animals will damage crops or, in the case of predators such as wolves, attack livestock. Others point out that ecosystems are complex, and that it is difficult to predict exactly how they will change once a species is reintroduced. Critics also argue that land used for rewilding could otherwise be used to grow food, which is a serious concern as the world's population continues to increase.''',
         'rules': ['解答は、英文要約の解答欄に書きなさい。なお、解答欄の外に書かれたものは採点されません。', '要約の内容が英文から逸れていると判断された場合は、0点と採点されることがあります。英文をよく読んでから答えてください。'],
         'model': 'Rewilding is a conservation method that restores ecosystems by letting natural processes work, often by reintroducing animals that once lived in an area, such as beavers in Britain. Its supporters say it offers many benefits: beaver dams can reduce flooding and create wetlands, large plant-eating animals increase biodiversity in grasslands, and rewilded land can bring tourism income to rural areas. However, the approach is controversial. Farmers fear damage to crops and livestock, the effects on complex ecosystems are hard to predict, and some argue that the land would be better used for growing food as the global population increases.',
         'checks': ['リワイルディングの定義(自然のプロセスに任せる・種の再導入)が入っている', '利点(洪水の軽減・生物多様性・観光収入)が入っている', '批判(農家の懸念・予測の難しさ・食料生産との競合)が入っている', '具体例を一般化し、本文を言いかえてまとめている', '語数が90〜110語になっている']},
        {'type': 'opinion',
         'prompt': '以下のTOPICについて、エッセイを書きなさい。\n以下のPOINTSのうち3つを使って、あなたの解答を裏付けなさい。\n構成は、序論・本論・結論とし、語数の目安は200語〜240語です。\n\nTOPIC\nShould governments invest more money in space exploration?\n\nPOINTS\n・Technological innovation\n・Scientific knowledge\n・Education\n・Cost',
         'rules': ['語数の目安は200語〜240語です。', '理由を3つ書き、序論・本論・結論の構成にしましょう。', 'TOPICからずれている場合は、0点と採点されることがあります。'],
         'model': 'Although space exploration is expensive, I believe that governments should invest more money in it. There are three main reasons for my view: it drives technological innovation, expands scientific knowledge, and inspires young people.\nFirst, the challenges of space exploration push engineers to develop new technologies, many of which later find uses on Earth. Satellite navigation, improved medical imaging, and lightweight materials all benefited from space research. Such innovations create new industries and jobs, which can repay the original investment many times over.\nSecond, space research greatly expands our understanding of the universe and of our own planet. Observation satellites, for instance, provide essential data on climate change, deforestation, and natural disasters. Without this information, governments would find it far more difficult to respond effectively to environmental threats.\nThird, space exploration has a unique power to inspire the next generation. Missions to the Moon and Mars capture the imagination of children and encourage many of them to study science and mathematics. A society with more scientists and engineers is better prepared to solve the complex problems of the future.\nIn conclusion, because it promotes innovation, provides valuable scientific knowledge, and motivates young people to pursue science, space exploration deserves greater government investment.',
         'checks': ['序論で立場と3つの理由を予告している', '本論で3つの理由を、それぞれ具体例とともに説明している', 'POINTSのうち3つを使っている', '結論で立場と理由をまとめ直している', '語数が200〜240語になっている']},
    ],
    'L': [
        {'type': 'dlg', 'items': [
            L('W: So, how did the pitch to the investors go?\nM: Mixed, honestly. They loved the product, but they kept grilling me on our customer acquisition costs.\nW: Did you have the numbers?\nM: I had last quarter\'s, but they wanted projections for the next three years, and I didn\'t have anything solid. They said they\'d reconsider if we send them a detailed forecast by the end of the month.\nW: Then let\'s get the finance team on it today.',
              'What do the investors want?', ['A lower price for the product.', 'A detailed financial forecast.', 'A new product design.', 'A meeting with the finance team.'], 1,
              '今後3年の詳しい予測を月末までに送るよう求めています。'),
            L('M: I heard you\'re thinking of leaving the firm.\nW: I\'ve been offered a position at a nonprofit. The pay is about thirty percent lower, though.\nM: That\'s a big cut. What\'s drawing you there?\nW: I\'d be leading their clean-water projects. It\'s the kind of work I went into engineering for.\nM: Well, if money isn\'t the main issue, it sounds like a good move.\nW: My mortgage might disagree, but I think I\'ll take it.',
              'What will the woman probably do?', ['Stay at her current firm.', 'Ask for a pay raise.', 'Accept the nonprofit\'s offer.', 'Sell her house.'], 2,
              'I think I\'ll take it. と言っています。'),
            L('W: Excuse me. I booked a room with a lake view, but my room faces the parking lot.\nM: I\'m terribly sorry, Ms. Patel. We\'re fully booked tonight, but I can move you to a lake-view room tomorrow morning.\nW: I\'m only staying two nights, so that would be half my stay.\nM: In that case, let me offer you a complimentary dinner tonight and upgrade you to a suite tomorrow.\nW: All right, that\'s fair.',
              'What does the hotel offer the woman?', ['A refund for both nights.', 'A lake-view room tonight.', 'A discount on her next stay.', 'A free dinner and an upgrade.'], 3,
              '今夜の無料の夕食と、明日のスイートへのアップグレードです。'),
            L('M: Did you read the proposal to merge the two departments?\nW: I did. On paper it saves money, but I\'m worried about morale.\nM: How so?\nW: The two teams have very different cultures. If it\'s rushed, we\'ll lose good people.\nM: So what would you suggest?\nW: Phase it in over a year, and let the teams work on a joint project first.',
              'What is the woman\'s main concern?', ['Employees may quit if the change is rushed.', 'The merger will cost too much.', 'The project will not be finished on time.', 'Both departments will have to move offices.'], 0,
              '急ぐと優秀な人材が辞めてしまうことを心配しています。'),
            L('M: Doctor, the knee surgery went well, but I still can\'t run without pain.\nW: It\'s only been six weeks. Running puts a lot of stress on the joint.\nM: My half marathon is in two months.\nW: I\'d strongly advise against it. Focus on swimming and cycling for now. We\'ll reassess in a month.\nM: I guess I\'ll have to defer my entry until next year.',
              'What will the man probably do?', ['Run in the half marathon.', 'Have another operation.', 'Postpone his race until next year.', 'Stop exercising completely.'], 2,
              'defer my entry until next year(参加を来年に延ばす)と言っています。'),
            L('W: Did you see that the city council approved the new bike lanes downtown?\nM: Finally. Though some shop owners are furious about losing parking spaces.\nW: Studies in other cities suggest bike lanes actually increase foot traffic to local shops.\nM: Maybe, but those shop owners aren\'t convinced. The council plans to review sales data after a year.',
              'What will the council do after a year?', ['Remove the bike lanes.', 'Build more parking spaces.', 'Pay compensation to shop owners.', 'Review sales data from local shops.'], 3,
              'The council plans to review sales data after a year. と言っています。'),
            L('M: Hi, I\'m calling about the apartment listing on Maple Street. Is it still available?\nW: It is, but I already have three people coming to view it this weekend.\nM: Could I possibly see it tomorrow evening? I\'m very interested.\nW: I can do seven o\'clock. But I should mention that the landlord requires a one-year lease and no pets.\nM: That\'s not a problem.',
              'What does the man ask for?', ['A shorter lease.', 'A viewing before the weekend.', 'Permission to keep a pet.', 'A lower rent.'], 1,
              '週末より前の明日の夕方に内見したいと頼んでいます。'),
            L('W: I can\'t believe our flight was diverted to Osaka.\nM: The pilot said there was heavy fog in Tokyo.\nW: So how do we get to our meeting? It\'s at nine tomorrow.\nM: The airline is offering a bus or a voucher for the bullet train. The train would get us there tonight.\nW: Then let\'s take the train.',
              'What will they do?', ['Take the bullet train.', 'Wait for the fog to clear.', 'Take a bus to Tokyo.', 'Cancel their meeting.'], 0,
              '今夜着ける新幹線にしました。'),
            L('M: Ms. Rogers, I\'d like to discuss my grade on the midterm.\nW: Of course. What\'s the concern?\nM: On question four, I think my answer was correct, but I lost half the points.\nW: Let me see. Your conclusion is right, but you didn\'t show how you got there. In this course, the reasoning matters as much as the answer.\nM: I see. I\'ll be more careful on the final.',
              'Why did the student lose points?', ['His answer was wrong.', 'He submitted the exam late.', 'He didn\'t explain his reasoning.', 'He answered the wrong question.'], 2,
              '結論は正しいが、どう導いたかを示さなかったからです。'),
            L('W: Are you still planning to renovate the kitchen this spring?\nM: We were, but the contractor\'s quote came in way over budget.\nW: Did you get other quotes?\nM: Two more. One was cheaper but couldn\'t start until autumn.\nW: Honestly, I\'d wait. A rushed job could cost you more in the long run.\nM: You\'re probably right.',
              'What does the woman advise?', ['Doing the work himself.', 'Hiring the first contractor.', 'Canceling the renovation.', 'Waiting for the cheaper contractor.'], 3,
              '安い業者が始められる秋まで待つよう勧めています。'),
        ]},
        {'type': 'mono', 'items': [
            LQ('N: The Overview Effect. Many astronauts report that seeing Earth from space changed the way they think about the planet. From orbit, national borders are invisible, and the thin layer of atmosphere that protects all life appears strikingly fragile. The writer Frank White called this experience "the overview effect" in a book published in 1987. Astronauts describe feeling a strong sense of connection to humanity and a new determination to protect the environment. Because very few people can travel to space, some researchers have begun using virtual reality to recreate the view of Earth from orbit. Early results suggest that even a simulated experience can produce some of the same feelings, although the effects appear to be weaker.', [
                G('What is the overview effect?', ['A medical problem caused by weightlessness.', 'A change in perspective from seeing Earth from space.', 'A method of training astronauts.', 'A way of mapping national borders.'], 1,
                  '宇宙から地球を見て、ものの見方が変わる体験のことです。'),
                G('What have early virtual reality studies suggested?', ['They can produce similar but weaker feelings.', 'They have no effect on participants.', 'They are more powerful than real spaceflight.', 'They make people feel sick.'], 0,
                  'some of the same feelings ... although the effects appear to be weaker とあります。'),
            ], title='The Overview Effect'),
            LQ('N: Mangroves and Coastal Protection. Mangroves are trees that grow in salty water along tropical coastlines. Their dense, tangled roots slow down waves and trap sediment, helping to protect coastal communities from storms and erosion. Mangrove forests also store large amounts of carbon in their roots and in the mud beneath them, which makes them valuable in the fight against climate change. Despite these benefits, large areas of mangroves have been cleared over the past several decades, often to make way for shrimp farms and coastal development. In response, many countries have launched replanting projects. Experts note, however, that replanting works best when local communities are involved and when trees are planted in places where mangroves naturally grew.', [
                G('How do mangroves protect coastal communities?', ['By producing food for local people.', 'By attracting tourists.', 'By slowing waves and trapping sediment.', 'By cooling the ocean water.'], 2,
                  '根が波を弱め、土砂をとどめて浸食を防ぎます。'),
                G('According to experts, when does replanting work best?', ['When trees are planted far from the coast.', 'When shrimp farms are built nearby.', 'When only foreign experts are involved.', 'When local communities take part.'], 3,
                  'replanting works best when local communities are involved とあります。'),
            ], title='Mangroves and Coastal Protection'),
            LQ('N: The QWERTY Keyboard. The keyboard layout used on most computers today, known as QWERTY after its first six letters, dates back to typewriters developed in the 1870s by the American inventor Christopher Latham Sholes. A popular story claims that the layout was designed to slow typists down so that the machine would not jam. However, some historians argue that the arrangement was intended to separate letters that were frequently typed one after another, which reduced jamming without necessarily making typing slower. Others point out that the layout was influenced by the needs of telegraph operators, who were among the earliest users. Whatever its origins, QWERTY became the standard, and later layouts designed to be more efficient have never replaced it.', [
                G('What does the popular story claim about the QWERTY layout?', ['It was designed to slow typists down.', 'It was copied from telegraph keys.', 'It was the fastest layout ever made.', 'It was invented for computers.'], 0,
                  'タイピストの速度を落として詰まりを防ぐため、という俗説です。'),
                G('What do some historians argue?', ['Sholes never used the layout himself.', 'The layout separated letters that were often typed together.', 'The layout was chosen in a public vote.', 'More efficient layouts replaced it in the 1900s.'], 1,
                  '続けて打たれやすい文字を離して詰まりを減らした、という説です。'),
            ], title='The QWERTY Keyboard'),
            LQ('N: Light in the Deep Sea. Sunlight cannot reach the deep ocean, yet the darkness there is far from complete. A large proportion of deep-sea animals are able to produce their own light, a process known as bioluminescence. A study of animals observed off the coast of California found that roughly three quarters of them could glow. These creatures use light in a variety of ways. Some, like the anglerfish, use a glowing lure to attract prey. Others flash lights to communicate or to startle predators. Some even use a technique called counter-illumination, producing light on their undersides so that their silhouettes blend in with the faint light coming from above, making them harder for predators below to see.', [
                G('What did the study off the coast of California find?', ['Most deep-sea animals avoid light.', 'About three quarters of the animals observed could produce light.', 'Sunlight reaches deeper than expected.', 'Anglerfish are the only glowing animals.'], 1,
                  'roughly three quarters of them could glow とあります。'),
                G('What is the purpose of counter-illumination?', ['To attract prey from far away.', 'To communicate with other animals.', 'To hide from predators below.', 'To keep warm in cold water.'], 2,
                  '下側を光らせて上からの光にまぎれ、下の捕食者から見えにくくします。'),
            ], title='Light in the Deep Sea'),
            LQ('N: Japan\'s Empty Houses. Japan has a growing number of vacant homes, known as akiya. According to a government survey in 2023, there were about nine million empty houses, or nearly 14 percent of all homes in the country. Several factors are behind this trend, including the aging and shrinking population and the movement of young people from rural areas to large cities. In addition, many people inherit homes they have no intention of living in, but tearing them down can be expensive. To address the problem, many local governments run "akiya banks," which list empty houses for sale or rent, sometimes at very low prices. Some towns have used these programs to attract young families and people who wish to start businesses in the countryside.', [
                G('What is one reason for the increase in empty houses in Japan?', ['The construction of too many new apartments.', 'Young people moving from rural areas to cities.', 'High taxes on large houses.', 'A rise in the number of tourists.'], 1,
                  '高齢化・人口減少に加え、若者が地方から都市へ移ることが挙げられています。'),
                G('How have some towns used akiya banks?', ['To build new shopping centers.', 'To demolish old houses quickly.', 'To attract young families and new businesses.', 'To provide homes for tourists.'], 2,
                  '若い家族や地方で起業したい人を呼び込むのに使っています。'),
            ], title='Japan\'s Empty Houses'),
        ]},
        {'type': 'real', 'items': [
            L('N: Attention, please. The 11:30 ICE train to Munich has been canceled due to a signal failure. Passengers may take the 11:45 regional train to Augsburg and change there for the 13:10 connection to Munich, arriving at 14:20. Alternatively, the next direct ICE train departs at 12:50 and arrives in Munich at 15:55. Tickets for the canceled train are valid on both services.',
              'What should you do?', ['Take the 11:45 regional train.', 'Wait for the 11:30 train.', 'Take the 12:50 direct train.', 'Go to the service desk for a refund.'], 2,
              '乗り換えを避けたく、4時までに着けばよいので、12:50の直通ICE(15:55着)です。',
              situ='You are at a train station in Germany. You need to be in Munich by 4 p.m. You have a heavy suitcase and want to avoid changing trains. It is now 11:20 a.m. You hear the following announcement.'),
            L('W: Hi, it\'s Dana from GreenSave. I looked over your energy usage report. Your biggest cost is the old refrigerator in the back. Replacing it would save about 400 dollars a year, though a new one costs around 2,000. A cheaper option is switching to our off-peak plan. It costs nothing to join, and since you do most of your baking early in the morning, it would save you around 150 a year. LED lighting would save about 80 a year, but installation is around 300.',
              'What should you do?', ['Buy a new refrigerator.', 'Switch to the off-peak plan.', 'Install LED lighting.', 'Bake later in the day.'], 1,
              '初期費用なしで節約できるのは、加入無料のオフピークプランです。',
              situ='You run a small café. You want to reduce your electricity bill without spending any money upfront. You receive the following voicemail from an energy consultant.'),
            L('M: Applications for the Hartley Research Grant are due on May 15. All materials, including two recommendation letters, must be uploaded through the online portal. If a recommender cannot submit by the deadline, applicants may request a one-week extension for the letter only, but this request must be made by May 10. Late proposals will not be accepted under any circumstances.',
              'What should you do?', ['Submit your proposal after May 15.', 'Ask another professor to write both letters.', 'Wait until May 18 to submit everything.', 'Request an extension for the letter by May 10.'], 3,
              '推薦状だけは5月10日までに申請すれば1週間延長でき、18日でも間に合います。提案書は15日までに出します。',
              situ='You are applying for a research grant. Your proposal is finished, but your supervisor says she cannot send her recommendation letter until May 18. Today is May 2. You hear the following message from the grant office.'),
            L('W: The aquarium is open from 9 to 6. Dolphin shows are at 11 and 3, but the 11 o\'clock show is reserved for a school group today. Seats for the 3 o\'clock show are first come, first served, so I\'d recommend arriving at the show area by 2:30. Children under six get in free, and tickets for older children are half price.',
              'What should you do?', ['Arrive at the show area by 2:30.', 'Go to the 11 o\'clock show.', 'Buy a free ticket for your child.', 'Reserve seats online.'], 0,
              '11時の回は団体専用なので、3時の回のため2時半までに行くのがよいです。',
              situ='You are visiting an aquarium with your seven-year-old child. You want to see the dolphin show. A staff member tells you the following.'),
            L('M: Checkout is at 11. We can hold your luggage at the bell desk until 6 p.m. If you need it later than that, there are lockers at the central station that are open 24 hours. Also, the airport shuttle leaves from the hotel at 5:30 and 7 p.m., but you\'ll need to reserve a seat by noon.',
              'What should you do first?', ['Use the lockers at the central station.', 'Reserve a seat on the shuttle by noon.', 'Check out at 6 p.m.', 'Take the 5:30 shuttle.'], 1,
              '7時のシャトルに乗るには、正午までに座席の予約が必要です。',
              situ='You are a hotel guest. Your flight leaves tonight, and you want to take the hotel\'s 7 p.m. shuttle to the airport. You are at the front desk at 10 a.m.'),
        ]},
        {'type': 'interview', 'items': [
            LQ('''N: This is an interview with Karen Liu, an airline captain who trains new pilots.
M: Today we\'re talking with Karen Liu, a captain with over twenty years of experience who now trains new pilots. Karen, thanks for joining us.
W: Thanks for having me.
M: What first drew you to flying?
W: Honestly, it was my grandfather. He was a mechanic at a small airfield, and he\'d take me along on weekends. I remember sitting in the cockpit of a little training plane when I was about eight and thinking, this is where I want to be.
M: These days you spend a lot of your time training first officers. What do you find is the hardest thing for them to learn?
W: People often assume it\'s the technical side, the systems and the procedures. But most trainees are very well prepared in that respect. What takes longer is learning to manage the people in the cockpit and the cabin. A captain has to make decisions under pressure, but also has to create an atmosphere where a junior colleague feels comfortable saying, "I think we have a problem." Many accidents in the past happened because someone noticed something wrong but didn\'t speak up.
M: Modern airliners are highly automated. Some people worry that pilots are losing their manual flying skills. Is that a real concern?
W: It\'s a fair question. Automation has made flying much safer overall. It reduces workload and handles routine tasks very precisely. The risk is that pilots become monitors rather than active flyers, and when the automation hands control back to them in an unusual situation, they may be rusty. So in our training we deliberately schedule practice in which pilots fly by hand, and we encourage them to do so on real flights when conditions allow.
M: Finally, what advice would you give young people who dream of becoming pilots?
W: Study hard, of course, especially math, physics, and English, since English is the language of aviation. But also get involved in team activities. The cockpit is a team environment, and the ability to listen and communicate is just as important as flying skill.''', [
                G('What does Captain Liu say is often the hardest thing for trainees to learn?', ['The aircraft\'s technical systems.', 'Flying in bad weather.', 'Managing people and creating an atmosphere where others speak up.', 'Speaking English fluently.'], 2,
                  '技術面より、プレッシャーの中で人をまとめ、後輩が意見を言える雰囲気を作ることが難しいと述べています。'),
                G('What does Captain Liu say about automation?', ['It has made flying less safe.', 'Pilots should never use it during landings.', 'It will soon replace pilots completely.', 'It is useful, but pilots need to keep practicing manual flying.'], 3,
                  '自動化は安全性を高めたが、手で操縦する練習を意図的に続けていると話しています。'),
            ]),
        ]},
    ],
}
