# 英検1級 模試 第2回 (オリジナル問題). Format: see SPEC['ek1'] in build.py.
from mxh import G, L, LQ, B

TEST = {
    'R': [
        {'type': 'gap', 'items': [
            G('The professor\'s argument was so (　) that even her harshest critics had to admit it was persuasive.', ['tenuous', 'cogent', 'spurious', 'frivolous'], 1,
              'cogent で「説得力のある」。tenuous(根拠の薄い)・spurious(見せかけの)は逆の意味です。'),
            G('The new CEO moved quickly to (　) the company\'s bloated management structure, cutting three layers of executives.', ['embellish', 'augment', 'perpetuate', 'streamline'], 3,
              'streamline で「合理化する、効率化する」。'),
            G('Despite years of effort, the two nations\' relationship remained (　), with neither side willing to trust the other.', ['frosty', 'lucrative', 'placid', 'opulent'], 0,
              'frosty で「冷ややかな」。'),
            G('The documentary was criticized for presenting a (　) view of history that ignored the experiences of ordinary people.', ['candid', 'pristine', 'myopic', 'tenacious'], 2,
              'myopic で「視野の狭い、近視眼的な」。'),
            G('The minister\'s speech was full of (　) that sounded impressive but contained little real substance.', ['rebuttals', 'anecdotes', 'platitudes', 'lampoons'], 2,
              'platitude で「陳腐な決まり文句」。中身のない言葉です。'),
            G('The startup\'s rapid growth was (　) by a series of generous investments from venture capital firms.', ['fueled', 'quelled', 'thwarted', 'muted'], 0,
              'fuel で「あおる、勢いづける」。投資が急成長を後押ししました。'),
            G('The author\'s (　) prose style, full of long sentences and obscure words, made the novel difficult to read.', ['terse', 'lucid', 'sparse', 'convoluted'], 3,
              'convoluted で「入り組んだ、難解な」。'),
            G('After the scandal, the company issued a statement that tried to (　) public anger by promising a full investigation.', ['inflame', 'placate', 'provoke', 'exacerbate'], 1,
              'placate で「なだめる」。ほかは怒りをあおる意味です。'),
            G('The auditor noticed a small (　) in the company\'s accounts that eventually revealed a much larger problem.', ['discrepancy', 'precedent', 'proclivity', 'paradigm'], 0,
              'discrepancy で「食い違い、不一致」。'),
            G('Although the plan seemed (　) at first, it soon became clear that it had serious flaws.', ['dubious', 'defunct', 'foolproof', 'obsolete'], 2,
              'foolproof で「絶対確実な」。Although で「重大な欠陥があった」と対比しています。'),
            G('The village has been (　) by drought for three years, and many families have been forced to move away.', ['bolstered', 'ravaged', 'pampered', 'vindicated'], 1,
              'ravage で「荒廃させる、大きな被害を与える」。'),
            G('The company was accused of trying to (　) the investigation by refusing to hand over important documents.', ['expedite', 'facilitate', 'corroborate', 'obstruct'], 3,
              'obstruct で「妨害する」。書類の提出を拒んでいます。'),
            G('Her (　) for detail made her the ideal person to proofread the final version of the contract.', ['penchant', 'disdain', 'aversion', 'apathy'], 0,
              'a penchant for ～ で「～を好む傾向、こだわり」。'),
            G('The museum\'s collection of ancient pottery is (　), attracting scholars from around the world.', ['mediocre', 'meager', 'unrivaled', 'insipid'], 2,
              'unrivaled で「比類のない」。'),
            G('Critics said the new tax would disproportionately (　) the poor, who spend a larger share of their income on basic goods.', ['exempt', 'benefit', 'spare', 'burden'], 3,
              'burden で「負担をかける」。収入に占める生活必需品の割合が高い人ほど重くのしかかります。'),
            G('The climbers had to (　) their attempt to reach the summit when a sudden storm moved in.', ['augment', 'abort', 'abet', 'abide'], 1,
              'abort で「(計画などを)途中で中止する」。'),
            G('The government\'s new policy has been (　) by economists as both unrealistic and expensive.', ['panned', 'hailed', 'touted', 'lauded'], 0,
              'pan で「酷評する」。hail・tout・laud はほめる意味です。'),
            G('Sales of the product began to (　) after a famous actor was seen using it on television.', ['dwindle', 'wane', 'skyrocket', 'stagnate'], 2,
              'skyrocket で「急上昇する」。'),
            G('The negotiators worked through the night to (　) out an agreement before the deadline.', ['cash', 'rule', 'phase', 'hammer'], 3,
              'hammer out で「(議論を重ねて)まとめ上げる」。'),
            G('The young pianist\'s talent was obvious, but she needed years of practice to (　) her technique.', ['dull', 'hone', 'hamper', 'hinder'], 1,
              'hone で「(技術を)磨く」。'),
            G('The company decided to (　) up its marketing efforts in Asia, where demand for its products was growing quickly.', ['ramp', 'prop', 'pent', 'bottle'], 0,
              'ramp up で「強化する、増強する」。'),
            G('When the manager asked for volunteers to work on the weekend, most of the staff (　), saying they had family plans.', ['chipped in', 'stepped up', 'pitched in', 'begged off'], 3,
              'beg off で「(理由をつけて)断る」。ほかは協力する意味です。'),
        ]},
        {'type': 'pgap', 'blocks': [
            B('[A]', 'text', '''In the 1960s, the psychologist Robert Zajonc conducted a series of experiments that revealed a curious feature of human preference. Participants were shown unfamiliar images, such as Chinese characters or faces, a varying number of times. Later, when asked how much they liked each image, they consistently gave higher ratings to those they had seen more often, even though they ( 23 ). Zajonc called this the mere-exposure effect.
Subsequent research has shown that the effect is remarkably robust. It occurs with words, music, and even people, and it appears to be strongest when exposure is brief or ( 24 ). In some studies, images flashed too quickly to be consciously perceived still increased participants' liking for them. One explanation is that familiar stimuli are easier for the brain to process, and people mistake this ease for genuine preference.
The implications for advertising are obvious. Repeated exposure to a brand name or logo can increase positive feelings toward it, even if consumers pay little attention to the advertisements. ( 25 ), the effect has limits. When people are exposed to something too many times, or when they initially dislike it, repetition can lead to boredom or even greater dislike.''', [
                G('', ['had been told to dislike them', 'recognized them immediately', 'could not always remember having seen them', 'were paid for each rating'], 2,
                  'even though(～にもかかわらず)とあるので、「見たことを覚えていないのに」好みが上がった、という意外さです。'),
                G('', ['not noticed at all', 'repeated hundreds of times', 'accompanied by music', 'explained in detail'], 0,
                  '次の文で「意識できないほど速く見せた画像でも効果があった」とあるので、「まったく気づかれない」とき。'),
                G('', ['As a result', 'In other words', 'For this reason', 'That said'], 3,
                  '広告への応用を述べたあと、「とはいえ」限界もある、と譲歩を示します。'),
            ], title='Familiarity Breeds Liking'),
            B('[B]', 'text', '''The placebo effect—the improvement patients sometimes experience after receiving a treatment with no active ingredients—has long been seen as depending on deception. It was assumed that a sugar pill could only help if patients ( 26 ). For this reason, doctors have generally regarded placebos as ethically problematic outside of carefully controlled trials.
In recent years, however, researchers have begun to question this assumption. In a series of studies on so-called open-label placebos, patients were told plainly that the pills they were taking contained no medicine. Surprisingly, many still reported significant improvements in conditions such as chronic back pain and irritable bowel syndrome. Some researchers believe that ( 27 ), such as taking a pill at a fixed time each day, may trigger the body's own healing responses through conditioning.
These findings remain controversial. Critics point out that most of the studies have been small and that the improvements reported are mostly in subjective symptoms such as pain, rather than in measurable physical changes. ( 28 ), the research has raised intriguing questions about the role that the mind and the act of treatment itself play in healing.''', [
                G('', ['took it with food', 'believed it was real medicine', 'had already recovered', 'received it from a specialist'], 1,
                  '「だますこと」が前提とされていたので、「本物の薬だと信じた場合」にだけ効くと考えられていました。'),
                G('', ['the color of the pills', 'expensive treatments', 'talking to other patients', 'the ritual of treatment'], 3,
                  '「毎日決まった時間に飲む」は治療の「儀式」の例です。'),
                G('', ['Nonetheless', 'Consequently', 'Similarly', 'In particular'], 0,
                  '研究の弱点を挙げたあと、「それでもなお」興味深い問いを提起した、という逆接です。'),
            ], title='Placebos Without Deception'),
        ]},
        {'type': 'passage', 'blocks': [
            B('[A]', 'text', '''In the summer of 1858, an unusually hot spell turned the River Thames into what one politician called "a Stygian pool." For centuries, London had disposed of human waste by letting it flow into the river, and the city's rapid population growth, combined with the spread of flushing toilets, had made the problem far worse. As temperatures rose, the smell became so overwhelming that Parliament, whose building stood beside the river, considered moving elsewhere. Curtains soaked in chemicals were hung over its windows in an attempt to block the odor.
At the time, most doctors believed that diseases such as cholera were caused by "miasma," or bad air. Ironically, this mistaken theory helped bring about a solution. Fearing that the foul air itself might cause an epidemic among politicians, Parliament quickly approved funding for a massive new sewer system designed by the engineer Joseph Bazalgette. Built over the following two decades, the system intercepted waste before it reached central London and carried it far downstream.
Bazalgette's work had consequences that went far beyond eliminating the smell. Cholera, which had killed tens of thousands of Londoners in earlier outbreaks, largely disappeared from the city, although the real reason—that the disease was spread through contaminated water rather than air—was only gradually accepted. Notably, Bazalgette designed his tunnels to be much larger than the population of the time required, anticipating the city's future growth. Many of them remain in use today.''', [
                G('Why did the problem of the Thames become worse in the 1850s?', ['Factories began dumping chemicals into the river.', 'Parliament stopped paying for the river to be cleaned.', 'A growing population and flushing toilets increased the waste.', 'The river had been dammed upstream.'], 2,
                  '人口の急増と水洗トイレの普及で、川に流れこむ汚物が増えたからです。'),
                G('What role did the miasma theory play?', ['It encouraged Parliament to fund a sewer system quickly.', 'It led doctors to find the true cause of cholera.', 'It convinced Bazalgette to move Parliament.', 'It delayed the construction of the sewers for decades.'], 0,
                  '悪い空気で議員に病気が広がることを恐れ、議会はすぐに下水道の資金を承認しました(皮肉にも誤った理論が解決を後押し)。'),
                G('What does the passage suggest about Bazalgette?', ['He correctly identified how cholera spread.', 'He planned for London\'s future population.', 'He publicly opposed the miasma theory.', 'He designed tunnels that were too small.'], 1,
                  '当時の人口に必要な大きさよりずっと大きく作り、将来の成長を見こしていました。'),
            ], title='The Great Stink'),
            B('[B]', 'text', '''Passengers flying from New York to London often arrive surprisingly early, while the return journey can take more than an hour longer. The reason lies about ten kilometers above the ground, where powerful bands of wind known as jet streams flow from west to east around the planet. These winds, created by the temperature difference between polar and tropical air, can exceed 300 kilometers per hour. In February 2020, a passenger jet riding an exceptionally strong jet stream crossed the Atlantic from New York to London in under five hours, reaching a ground speed of over 1,300 kilometers per hour—faster than the speed of sound, although its speed relative to the surrounding air remained normal.
The existence of these winds was first documented in the 1920s by the Japanese meteorologist Wasaburo Oishi, who tracked weather balloons launched from an observatory northeast of Tokyo. However, Oishi published his findings in Esperanto, an artificial language he hoped would promote international communication, and his work went largely unnoticed abroad. It was not until the Second World War, when high-altitude bombers encountered unexpectedly fierce winds, that the jet stream became widely known.
Today, airlines plan routes carefully to take advantage of jet streams or avoid them. Across the North Atlantic, flight tracks are redrawn every day, shifting by hundreds of kilometers depending on where the strongest winds are located. Riding a tailwind can save several tons of fuel on a single flight, reducing both costs and emissions.
Jet streams also pose challenges, however. Where wind speeds change sharply over short distances, they can create clear-air turbulence, which is invisible to both pilots and weather radar. Some studies suggest that climate change is increasing these differences in wind speed. One analysis found that severe clear-air turbulence over the North Atlantic increased by more than 50 percent between 1979 and 2020, raising concerns that flights may become bumpier in the future.''', [
                G('Why can flights from New York to London be faster than the return flights?', ['They use more powerful engines.', 'They fly at a lower altitude.', 'They take a shorter route over Canada.', 'They are pushed by winds flowing from west to east.'], 3,
                  '西から東へ流れるジェット気流に押されるからです。'),
                G('Why did Oishi\'s discovery go largely unnoticed abroad?', ['It was kept secret by the Japanese government.', 'He wrote about it in a language few scientists read.', 'His weather balloons were lost.', 'Other scientists did not believe his data.'], 1,
                  '国際語として願ったエスペラント語で発表したため、海外ではほとんど知られませんでした。'),
                G('How do airlines respond to jet streams today?', ['They avoid flying across the North Atlantic.', 'They fly only at night when the winds are weaker.', 'They change their routes daily depending on the winds.', 'They use the same route every day to save fuel.'], 2,
                  '北大西洋の航路は風に合わせて毎日引き直されます。'),
                G('What concern is raised at the end of the passage?', ['Turbulence may become more common because of climate change.', 'Jet streams may disappear in the future.', 'Weather radar may stop working at high altitudes.', 'Flights may become slower across the Atlantic.'], 0,
                  '気候変動で晴天乱気流が増え、揺れが多くなるおそれが述べられています。'),
            ], title='Rivers of Wind'),
        ]},
        {'type': 'summary',
         'prompt': '以下の英文を読んで、その内容を英語で要約し、解答欄に記入しなさい。\n語数の目安は90語〜110語です。',
         'body': '''In recent years, several countries have introduced laws giving workers a "right to disconnect." France was one of the first, requiring larger companies from 2017 to negotiate rules limiting work-related emails and calls outside working hours. Similar laws have since been adopted in countries such as Portugal and Australia, reflecting growing concern that smartphones have blurred the boundary between work and private life.
Supporters argue that such laws protect workers' health. Being constantly reachable can make it difficult for employees to rest, contributing to stress, sleep problems, and burnout. They also claim that well-rested employees are more productive, so companies themselves benefit when workers can switch off completely.
Critics, however, question whether a single rule can suit all jobs. In global companies, employees often need to communicate with colleagues in different time zones, and some workers prefer the flexibility of handling messages in the evening in exchange for leaving early. Others note that such laws are difficult to enforce, since workers may feel pressure to respond anyway for fear of harming their careers.''',
         'rules': ['解答は、英文要約の解答欄に書きなさい。なお、解答欄の外に書かれたものは採点されません。', '要約の内容が英文から逸れていると判断された場合は、0点と採点されることがあります。英文をよく読んでから答えてください。'],
         'model': 'Several countries, beginning with France in 2017 and later including Portugal and Australia, have passed laws giving workers a right to disconnect from work-related communication outside working hours, as smartphones have blurred the line between work and private life. Supporters say these laws protect workers from stress, sleep problems, and burnout, and that rested employees are more productive, which benefits companies. Critics, however, argue that one rule cannot fit every job, since global firms must work across time zones and some workers value flexible hours. They also point out that such laws are hard to enforce because employees may still feel pressured to reply.',
         'checks': ['「つながらない権利」の法律とは何か(フランスなどで導入・背景)が入っている', '支持する理由(健康・生産性)が入っている', '批判(仕事による違い・時差・柔軟性・実効性)が入っている', '本文をそのまま写さず、言いかえて短くまとめている', '語数が90〜110語になっている']},
        {'type': 'opinion',
         'prompt': '以下のTOPICについて、あなたの意見とその理由を2つ書きなさい。\nPOINTSは理由を書く際の参考となる観点を示したものです。ただし、これら以外の観点から理由を書いてもかまいません。\n\nTOPIC\nIs the increasing use of surveillance cameras in public places justified?\n\nPOINTS\n・Crime prevention\n・Privacy\n・Public safety\n・Technology',
         'rules': ['語数の目安は200語〜240語です。', '構成は、序論・本論・結論が望ましい。', 'TOPICに示された問いに答えていない場合や、内容がTOPICからずれている場合は、0点と採点されることがあります。'],
         'model': 'In recent decades, surveillance cameras have become a familiar sight in streets, stations, and shops. Although some people regard them as a threat to privacy, I believe that their increasing use is justified, for two main reasons.\nFirst, cameras play a significant role in preventing and solving crimes. People are less likely to commit offenses such as theft or vandalism when they know they are being recorded. Moreover, when crimes do occur, footage often provides crucial evidence that allows police to identify suspects quickly, which in turn helps prevent further harm to the community.\nSecond, cameras contribute to public safety in ways that go beyond crime. In crowded places like train stations, they allow staff to respond rapidly to accidents, medical emergencies, or dangerous overcrowding. After natural disasters, camera footage can also help authorities assess damage and direct rescue teams to the areas where they are most needed.\nAdmittedly, concerns about privacy are legitimate, particularly as technologies such as facial recognition become more powerful. However, this problem can be addressed through strict regulations that limit how long footage is stored and who is allowed to access it, rather than by rejecting cameras altogether.\nIn conclusion, because surveillance cameras help reduce crime and protect people in emergencies, their expanded use is justified, provided that clear rules are in place to safeguard individual privacy.',
         'checks': ['序論で自分の立場をはっきり述べている', 'POINTSなどを使った理由を2つ、具体例とともに書いている', '反対意見にふれ、それに答えている(Admittedly … However …)', '結論で立場と理由をまとめ直している', '語数が200〜240語になっている']},
    ],
    'L': [
        {'type': 'dlg', 'items': [
            L('W: Greg, have you looked at the proposal from the design agency?\nM: I skimmed it. Their concepts are striking, but their quote is nearly double what we budgeted.\nW: I know. But our last campaign flopped partly because the visuals were so bland.\nM: True. What if we asked them to scale back to the two strongest concepts? That might bring the cost down to something we could justify.\nW: Worth a try. I\'ll set up a call with them tomorrow.',
              'What will the woman do?', ['Look for a cheaper agency.', 'Approve the full proposal.', 'Arrange to discuss a reduced plan with the agency.', 'Ask for a larger budget.'], 2,
              '案を2つにしぼって費用を下げられないか、明日代理店と話す予定です。'),
            L('M: How did the meeting with the landlord go?\nW: Not great. He\'s raising the rent by fifteen percent when our lease renews in March.\nM: Fifteen percent? That\'s steep. Did you try negotiating?\nW: I pointed out that we\'ve never missed a payment and that we\'ve taken care of repairs ourselves. He agreed to ten percent if we sign a two-year lease.\nM: Hmm. Moving would cost us more than that difference anyway. Let\'s accept.',
              'What do the speakers decide to do?', ['Sign a longer lease with a smaller increase.', 'Look for a cheaper apartment.', 'Refuse to pay any increase.', 'Ask the landlord to make repairs.'], 0,
              '2年契約にする代わりに値上げを10%にしてもらい、それを受け入れます。'),
            L('W: Mr. Patel, your test results came back. Your cholesterol is a bit high, though not alarmingly so.\nM: Do I need medication?\nW: Not at this point. I\'d rather see whether changes in diet and exercise make a difference first. Let\'s recheck in three months.\nM: And if it hasn\'t improved by then?\nW: Then we\'ll discuss medication.',
              'What does the doctor recommend?', ['Starting medication immediately.', 'Getting a second opinion.', 'Taking more tests next week.', 'Trying lifestyle changes before medication.'], 3,
              'まず食事と運動の改善を試し、3か月後に再検査します。'),
            L('M: I\'ve been asked to give the keynote speech at the industry conference next month.\nW: That\'s a big honor! Why do you look so worried?\nM: The organizers want me to talk about our company\'s failures as well as our successes. I\'m not sure management will be comfortable with that.\nW: Actually, I think being candid could work in your favor. Audiences respect honesty. Why not run an outline by the director first?\nM: Good idea. That way, there won\'t be any surprises.',
              'What does the woman suggest?', ['Declining the invitation.', 'Getting the director\'s approval of the content beforehand.', 'Talking only about the company\'s successes.', 'Asking the organizers to change the topic.'], 1,
              'run an outline by the director(事前に概要を部長に見せる)ことを勧めています。'),
            L('W: Have you decided which graduate program to accept?\nM: I\'m torn. Westbrook offered me a full scholarship, but Halton has the professor I really want to work with.\nW: Have you contacted her directly?\nM: I emailed her last week. She said she might be moving to another university next year.\nW: Then that settles it, doesn\'t it?\nM: I suppose it does.',
              'Which program will the man probably choose?', ['Halton.', 'Westbrook.', 'Neither of them.', 'The professor\'s new university.'], 1,
              '指導を受けたい教授が移るかもしれないので、奨学金の出るウェストブルックに決まりそうです。'),
            L('M: Ms. Rivera, our team won\'t be able to meet Friday\'s deadline for the software update.\nW: What\'s the hold-up?\nM: During testing, we found a security flaw. Fixing it properly will take at least another week.\nW: I\'d rather delay than release something vulnerable. But the client needs to hear it from us today, not on Friday.\nM: I\'ll call them this afternoon.',
              'What does the woman want the man to do?', ['Release the update on Friday.', 'Ignore the security flaw.', 'Hire more testers.', 'Inform the client about the delay right away.'], 3,
              '金曜ではなく今日中に顧客へ遅れを伝えるよう求めています。'),
            L('W: I heard you\'re thinking of leaving your job to start a bakery.\nM: Yes, but I keep going back and forth. My savings would last about a year, but I have no experience running a business.\nW: Why not start smaller? You could sell at the weekend farmers\' market first and see how it goes.\nM: That way, I could keep my salary while I test the idea. I like that.',
              'What will the man probably do?', ['Sell his baked goods at a market on weekends.', 'Quit his job immediately.', 'Take a business course.', 'Open a bakery next year.'], 0,
              '仕事を続けながら週末の朝市で売ってみるつもりです。'),
            L('M: Did you see the email from HR about the new performance review system?\nW: Yes. Instead of an annual review, managers will give feedback every quarter.\nM: I\'m not sure about that. It sounds like a lot more paperwork.\nW: Maybe, but I\'d rather know where I stand during the year than get surprised in December.\nM: I guess that\'s a fair point.',
              'What is the woman\'s opinion of the new system?', ['It will create too much paperwork.', 'It should apply only to managers.', 'It will help employees understand their performance sooner.', 'It is no better than the old system.'], 2,
              '年末に驚くより、年の途中で自分の評価を知りたいと言っています。'),
            L('W: The city council wants to turn the old railway line into a walking and cycling trail.\nM: I read about that. Some residents along the route are against it.\nW: Why? It would be great for the neighborhood.\nM: They\'re worried about strangers passing behind their houses and about noise late at night.\nW: Couldn\'t the council close the trail after dark and install lighting?\nM: Apparently, that\'s exactly what the proposal includes.',
              'What do we learn about the proposal?', ['It has been rejected by the council.', 'It will reopen the railway line.', 'It ignores residents\' concerns.', 'It includes measures to address safety and noise.'], 3,
              '夜間閉鎖や照明など、住民の不安への対策が含まれています。'),
            L('M: Hello, I\'m calling about the order of 500 brochures we placed last week. The proof you sent has the wrong phone number.\nW: I\'m very sorry. Did the error come from the file you sent us?\nM: No, I checked. Our file had the correct number.\nW: Then it\'s our mistake. We\'ll fix it and reprint at no charge, and we\'ll send them by express delivery so they arrive by Thursday.\nM: Thank you. That\'s a relief.',
              'What will the printing company do?', ['Correct and reprint the brochures for free.', 'Ask the man to send a new file.', 'Give the man a partial refund.', 'Deliver the brochures next week.'], 0,
              '自社のミスなので無料で直して刷り直し、木曜までに速達で送ります。'),
        ]},
        {'type': 'mono', 'items': [
            LQ('N: The Cobra Effect. According to a well-known story, the British government in colonial India once grew concerned about the number of venomous cobras in Delhi. To reduce the population, it offered a reward for every dead cobra. At first, the policy seemed to work. Before long, however, some people began breeding cobras in order to collect the reward. When officials discovered this and canceled the program, the breeders released their now-worthless snakes, and the cobra population ended up larger than before. Although historians question whether the story is entirely true, economists use the term "cobra effect" to describe policies that produce the opposite of their intended result.', [
                G('Why did the cobra population increase?', ['The reward made people afraid to kill cobras.', 'Breeders released their snakes when the reward ended.', 'Officials accidentally released cobras.', 'The government stopped hunting cobras.'], 1,
                  '報奨金が打ち切られ、繁殖させていた人が価値のなくなったヘビを放したためです。'),
                G('What does the term "cobra effect" describe?', ['A policy that is never fully carried out.', 'A program that becomes too expensive.', 'A reward that is too small to work.', 'A policy that causes the opposite of what was intended.'], 3,
                  '意図と逆の結果を生む政策を指します。'),
            ], title='The Cobra Effect'),
            LQ('N: Nature\'s Toughest Animal. Tardigrades, also called water bears, are tiny animals usually less than one millimeter long. They are found almost everywhere on Earth, from mountaintops to the deep sea. When their environment dries out, tardigrades can enter a state called a tun, in which they lose almost all of the water in their bodies and their metabolism nearly stops. In this state, they can survive extreme temperatures, high levels of radiation, and even, as one 2007 experiment showed, exposure to the vacuum of space. When water returns, they can revive within hours.', [
                G('What happens when a tardigrade enters the tun state?', ['It loses most of the water in its body.', 'It grows much larger.', 'It begins to eat more.', 'It moves to the deep sea.'], 0,
                  '体内の水分をほとんど失い、代謝もほぼ止まります。'),
                G('What did the 2007 experiment show?', ['Tardigrades can live without food for decades.', 'Tardigrades are found on other planets.', 'Tardigrades can survive exposure to space.', 'Tardigrades die at very low temperatures.'], 2,
                  '宇宙の真空にさらされても生き延びられることを示しました。'),
            ], title='Nature\'s Toughest Animal'),
            LQ('N: Harvesting Water from the Air. In parts of Chile\'s Atacama Desert, one of the driest places on Earth, it almost never rains. However, thick fog regularly drifts in from the Pacific Ocean. Since the 1980s, communities there have used large mesh nets, known as fog catchers, to capture tiny water droplets from the fog. The droplets collect on the nets, run down into gutters, and are stored in tanks. A single large net can collect hundreds of liters of water on a foggy day. The water has been used for drinking, farming, and even brewing beer, and similar projects have since been launched in countries such as Morocco and Peru.', [
                G('Why are fog catchers useful in the Atacama Desert?', ['The area has many rivers.', 'It rains heavily in winter.', 'The ocean water is easy to drink.', 'Fog is common even though rain is rare.'], 3,
                  '雨はほとんど降らないが、太平洋から霧が定期的に流れこむからです。'),
                G('What happens to the water droplets that collect on the nets?', ['They are frozen and stored.', 'They flow into gutters and are stored in tanks.', 'They are sent through pipes to the ocean.', 'They are left to evaporate.'], 1,
                  'run down into gutters, and are stored in tanks とあります。'),
            ], title='Harvesting Water from the Air'),
            LQ('N: Sleeping at the Controls. On long flights, pilot fatigue is a serious safety concern. To address it, aviation authorities in many countries, including those in Europe, allow a practice called "controlled rest." During a quiet stage of the flight, one pilot may take a short nap in the cockpit seat while the other remains fully in charge of the aircraft. The nap is usually limited to about 40 minutes, because sleeping longer can lead to deep sleep, from which people wake up feeling confused. Research has shown that even a short nap can significantly improve a pilot\'s alertness during the most demanding stage of the flight: the approach and landing.', [
                G('What is "controlled rest"?', ['A rule that pilots must sleep before every flight.', 'A break in a special room for passengers.', 'A short nap taken by one pilot while the other flies.', 'A system that flies the plane automatically.'], 2,
                  '1人のパイロットが操縦席で短い仮眠をとり、もう1人が操縦を担当します。'),
                G('Why is the nap usually limited to about 40 minutes?', ['Longer sleep can leave pilots feeling confused when they wake.', 'The other pilot cannot fly alone for longer.', 'The airline wants to save money.', 'The cockpit seats are uncomfortable.'], 0,
                  '長く眠ると深い眠りに入り、起きたとき頭がぼんやりするからです。'),
            ], title='Sleeping at the Controls'),
            LQ('N: The Art of Repair. Kintsugi is a traditional Japanese technique for repairing broken pottery. Rather than hiding the cracks, craftspeople fill them with lacquer mixed with powdered gold or silver, so that the lines of the break shine brightly. The technique is said to date back to the fifteenth century. Today, kintsugi has attracted interest far beyond Japan, not only as an art form but also as a philosophy. Many people see it as a symbol of the idea that damage and imperfection are part of an object\'s history and can even make it more beautiful.', [
                G('How does kintsugi treat the cracks in broken pottery?', ['It hides them completely.', 'It highlights them with gold or silver.', 'It replaces the broken pieces with new ones.', 'It covers them with paint.'], 1,
                  '割れ目を隠さず、金や銀の粉をまぜた漆で輝かせます。'),
                G('Why has kintsugi attracted interest abroad?', ['It is cheaper than buying new pottery.', 'It was invented recently.', 'It uses rare materials from Japan.', 'It expresses the idea that imperfection can be beautiful.'], 3,
                  '傷や不完全さも歴史の一部で、美しさになりうるという考え方の象徴とされています。'),
            ], title='The Art of Repair'),
        ]},
        {'type': 'real', 'items': [
            L('W: Hi, this is Mia from Facilities, returning your call about room bookings for next Tuesday. Room A holds 20 people and has a projector, but it\'s booked all afternoon. Room B holds 15 people and is available, but its projector is being repaired until Wednesday. Room C has a projector and is free all day, but it only holds 10 people. Room D holds 16 and is free after 1 p.m.; there\'s no built-in projector, but we can bring a portable one if you request it by Monday.',
              'What should you do?', ['Book Room A.', 'Book Room B.', 'Book Room C.', 'Book Room D and request a portable projector.'], 3,
              'Aは予約済み、Bはプロジェクター修理中、Cは10人まで。Dなら月曜までに頼めば持ち運び式を使えます。',
              situ='You are a manager. You need to book a meeting room for 12 people next Tuesday afternoon, and you need a projector. You hear the following voicemail from the facilities office.'),
            L('N: Attention, passengers who have missed connecting flights from Tokyo. We apologize for the delay. Passengers continuing to London may proceed to the transfer desk on Level 2. Passengers continuing to Paris have been rebooked on tonight\'s 2:30 a.m. flight, arriving at 7:40 a.m.; please collect new boarding passes at Transfer Desk 3. If you would prefer to stay overnight and travel on tomorrow\'s 9:15 a.m. flight, which arrives at 2:20 p.m., please speak to staff at Desk 5, where hotel vouchers are available.',
              'What should you do?', ['Go to Transfer Desk 3.', 'Go to the transfer desk on Level 2.', 'Speak to staff at Desk 5.', 'Wait at the gate for your original flight.'], 0,
              '正午前にパリに着くには、7:40着の深夜便。搭乗券はトランスファーデスク3で受け取ります。',
              situ='You are flying from Tokyo to Paris with a connection in Dubai. Your first flight arrived late, and you have missed your connection. You want to reach Paris before noon tomorrow. You hear the following announcement.'),
            L('M: We have four savings accounts. The Basic account has no minimum deposit and allows withdrawals at any time, but there\'s a monthly fee of 200 yen. The Plus account requires a minimum of 100,000 yen, has no monthly fee, and allows withdrawals at any time. The Premium account requires 1 million yen and has no fees. Finally, the Fixed account offers the highest interest and no fees, but you can\'t withdraw money for one year.',
              'Which account should you open?', ['The Basic account.', 'The Premium account.', 'The Plus account.', 'The Fixed account.'], 2,
              '30万円で手数料なし・いつでも引き出せるのはPlus。Basicは月額手数料、Premiumは100万円必要、Fixedは1年引き出せません。',
              situ='You want to open a savings account. You plan to deposit 300,000 yen, you do not want to pay any monthly fees, and you want to be able to withdraw money at any time. A bank employee explains the following.'),
            L('W: Hi, it\'s Professor Grant. I looked into funding options for your project. The Hamilton Foundation offers up to 500,000 yen, and applications are due next month. The Science Council grant covers up to 1 million yen, but the deadline was last week. The University Research Fund provides up to 1 million yen, with applications due at the end of next month, but you need a letter of support from a faculty member, which I\'m happy to write. Let me know.',
              'What should you do?', ['Apply to the Hamilton Foundation.', 'Ask the professor for a letter and apply to the University Research Fund.', 'Apply to the Science Council.', 'Apply to both the Hamilton Foundation and the Science Council.'], 1,
              '80万円必要なのでHamilton(50万円)では足りず、Science Councilは締め切り済み。教授に推薦状を頼んで大学の基金へ。',
              situ='You are a graduate student. You want to apply for a research grant. Your project will cost about 800,000 yen, and you will submit your application next month. Your adviser leaves you a message.'),
            L('N: Good morning, guests. Here are the current wait times for our roller coasters. Thunder Peak has a wait of 15 minutes; riders must be at least 140 centimeters tall. Dragon Flight has a wait of 70 minutes, with a minimum height of 120 centimeters. Comet Run is temporarily closed for maintenance. Wild Mine Train has a wait of 25 minutes, with a minimum height of 110 centimeters.',
              'Which ride should you choose?', ['Thunder Peak.', 'Dragon Flight.', 'Comet Run.', 'Wild Mine Train.'], 3,
              '125cmの息子が乗れて30分以内なのは Wild Mine Train(110cm以上・25分)です。',
              situ='You are at a theme park with your 9-year-old son, who is 125 centimeters tall. You want to ride a roller coaster together, and you do not want to wait more than 30 minutes. You hear the following announcement.'),
        ]},
        {'type': 'interview', 'items': [
            LQ('''N: This is an interview with Naomi Sato, an aerospace engineer who works on reducing aircraft noise.
M: Today we\'re joined by Naomi Sato, an engineer who works on making airplanes quieter. Naomi, welcome.
W: Thank you. It\'s great to be here.
M: Most people think of aircraft noise as coming from the engines. Is that right?
W: Partly. The engines are certainly the main source during takeoff. But when a plane is landing, a surprisingly large share of the noise comes from the airframe itself: the landing gear, the flaps, and other parts that stick out into the airflow. Air rushing around those shapes creates turbulence, and turbulence creates noise.
M: So how do you make those parts quieter?
W: A lot of it is about smoothing the airflow. For example, we\'ve tested fairings, which are smooth covers placed around parts of the landing gear. Another approach is to change how planes approach airports. In a continuous descent, the plane comes down steadily instead of leveling off several times, so the engines can stay at low power for longer.
M: Communities near airports often complain about noise. Do you think the problem can ever be solved completely?
W: Honestly, no aircraft will ever be completely silent. But modern airliners are already far quieter than those of the 1970s, and the area around airports affected by loud noise has shrunk dramatically. The challenge is that air traffic keeps growing, so the improvements for each plane are partly cancelled out by the increasing number of flights. That\'s why technology alone isn\'t enough. Airports also need to think carefully about flight paths and operating hours.
M: Finally, what got you interested in this field?
W: I grew up under a flight path, actually. As a kid, I loved watching the planes, but I also saw how the noise affected my neighbors. Working on this problem lets me combine both of those experiences.''', [
                G('According to Naomi Sato, what is a major source of noise when a plane is landing?', ['The engines at full power.', 'The passengers in the cabin.', 'Parts of the airframe, such as the landing gear.', 'The wheels touching the runway.'], 2,
                  '着陸時は脚(ランディングギア)やフラップなど機体そのものから多くの騒音が出ると述べています。'),
                G('What does she say about the future of aircraft noise?', ['Technology must be combined with better flight paths and operating hours.', 'New engines will make planes completely silent.', 'Noise is no longer a problem near most airports.', 'The number of flights will soon decrease.'], 0,
                  '便数が増え続けるので技術だけでは足りず、飛行経路や運用時間の工夫も必要だと述べています。'),
            ], title='Interview: Making Planes Quieter'),
        ]},
    ],
}
