"""Interviews for jobs: OET Speaking (healthcare), the cabin crew English interview, and 全国通訳案内士 口述試験.
Original material.

OET Speaking: a short warm-up about your work (not marked) → two role-plays, each with 3 minutes to read the role
card; the interlocutor plays the patient or a relative. Marked on 4 language criteria and 5 clinical
communication criteria.
客室乗務員 (cabin crew): there is no single official test; this follows a common pattern of airline interviews in
English (self-introduction, motivation, experience questions, reading an announcement, a role-play with a
passenger).
全国通訳案内士 口述試験 (about 10 minutes): 通訳 (the examiner reads Japanese aloud, you put it into the foreign language)
with questions about it and about how a guide would respond → プレゼンテーション (choose 1 of 3 themes, explain it)
with questions. Marked on presentation, communication, grammar and vocabulary, pronunciation and delivery,
hospitality."""
from cards import S, POOL, CARD, HIDE, END_K, Q, READ, PREP
from intl import ANS
from romance import TOPICS, TQ

PT = lambda t: {'k': 'say', 't': t, 'r': 'pt'}
JP = lambda t: {'k': 'say', 't': t, 'v': 'ja-JP', 'r': 'jp'}


# ================================================================ OET
def ROLE(n, title, setting, lines, task, talk):
    """a role-play: the candidate's card, then [(patient line, what to do, model)]"""
    steps = [S("Now let's start the %s role-play. Here is your card. You have three minutes to prepare." % ('first' if n == 0 else 'second')),
             dict(CARD, show='role%d' % n), dict(PREP(180, 'ロールカードを読む(3分・メモOK)'), notes=True),
             S("Are you ready? I'll start.")]
    items = {}
    for j, (line, cue, model) in enumerate(talk):
        i = 'r%d_%d' % (n + 1, j + 1)
        steps += [PT(line), ANS(i, 35, cue=cue)]
        items[i] = {'no': 'ロールプレイ%d-%d' % (n + 1, j + 1), 'pts': 3, 'q': line, 'ja': cue, 'model': [model],
                    'points': ['相手の言葉を受けとめてから(I understand …)', '専門用語は言いかえる', '確認の質問(Does that make sense?)']}
    steps += [S("Thank you. That's the end of the %s role-play." % ('first' if n == 0 else 'second')), HIDE]
    return {'title': title, 'setting': setting, 'lines': lines, 'task': task}, steps, items


def OET_SET(r1, r2):
    a, sa, ia = ROLE(0, *r1)
    b, sb, ib = ROLE(1, *r2)
    return {'card': {'title': 'OET Speaking', 'roles': [a, b]}, 'steps': sa + sb, 'items': dict(ia, **ib)}


OET_SETS = [
  OET_SET(
    ('Role-play 1 (Medicine)', 'Setting: General practice', ['Patient: a 45-year-old office worker who has come about headaches.'],
     ['Find out more about the headaches (how long, when, how bad).', 'Ask about work, screen time, sleep and stress.', 'Reassure the patient that serious causes are unlikely.', 'Advise on lifestyle changes (regular breaks, water, sleep).', 'Explain when to come back.'],
     [("Hello, doctor. I've been getting these headaches for about three weeks now, and I'm getting a bit worried.", '頭痛についてくわしく聞く(いつ・どのくらい)',
       "I'm sorry to hear that. Let's see if we can find out what's causing them. Can you tell me when the headaches usually start, and how bad they are on a scale of one to ten?"),
      ("They usually start in the afternoon, at work. Maybe a six. It feels like a tight band around my head.", '仕事・画面を見る時間・睡眠・ストレスをたずねる',
       "Thank you, that's helpful. Could you tell me a bit about your work? For example, how many hours a day do you spend in front of a computer, and how have you been sleeping recently?"),
      ("I'm on the computer most of the day, and I've been working late because of a big project. I only sleep about five hours.", '安心させる(重い病気の可能性は低い)',
       "I see. From what you've told me, these sound like tension headaches. They're very common and usually not caused by anything serious, so please try not to worry too much."),
      ("That's a relief. But what can I do about them?", '生活の改善をアドバイス(休憩・水分・睡眠)',
       "There are a few things that really help. Try to take a short break from the screen every hour, drink plenty of water, and aim for at least seven hours of sleep. Gentle neck stretches can also help."),
      ("OK, I'll try that. Should I come back?", 'いつ再受診すべきか説明する',
       "Yes, if the headaches don't improve in two weeks, or if you notice anything unusual, like problems with your vision or very sudden, severe pain, please come back straight away. Does that sound all right?")]),
    ('Role-play 2 (Medicine)', 'Setting: Hospital emergency department', ["Relative: the parent of a 9-year-old child with appendicitis. The child needs an operation today."],
     ['Explain the diagnosis in simple language.', 'Explain why an operation is needed today.', "Respond to the parent's worries about the operation.", 'Explain what will happen next.', 'Check understanding and invite questions.'],
     [("Doctor, what's wrong with my son? He's in so much pain.", '診断をわかりやすく説明する(虫垂炎)',
       "I understand this is very worrying. Your son has appendicitis. That means his appendix, a small part of the bowel, has become inflamed and painful."),
      ("Does he really need an operation? Can't you give him medicine?", '今日手術が必要な理由を説明する',
       "That's a very good question. In his case, the appendix is badly swollen, and if we wait, it could burst and cause a serious infection. So the safest option is to remove it today."),
      ("I'm scared. He's never had an operation before.", '不安に寄りそう(よくある手術・安全性)',
       "It's completely natural to feel that way. This is one of the most common operations for children, and our team does it very often. He'll be asleep the whole time, so he won't feel any pain."),
      ("What happens now?", '次の流れを説明する(麻酔科医・手術時間・回復)',
       "The anaesthetist will come to see you both shortly. The operation itself usually takes about an hour, and most children can go home after one or two days."),
      ("OK... I think I understand.", '理解を確認し、質問をうながす',
       "Thank you for listening. Just to check, could you tell me in your own words why he needs the operation today? And please ask me anything you're unsure about.")]),
  ),
  OET_SET(
    ('Role-play 1 (Nursing)', 'Setting: Surgical ward', ['Patient: a 68-year-old man, one day after knee surgery, who does not want to get out of bed.'],
     ['Find out why the patient does not want to walk.', 'Acknowledge his pain and fear.', 'Explain why walking soon after surgery is important.', 'Explain how you will help him walk safely.', 'Agree on a plan.'],
     [("Nurse, I'm not getting up today. My knee hurts too much.", '歩きたくない理由をたずねる',
       "I'm sorry your knee is hurting. Can you tell me a bit more about how you're feeling? Is it mainly the pain, or are you worried about something else?"),
      ("Well, both. I'm afraid I'll fall and damage the new knee.", '痛みと不安を受けとめる',
       "That's a very understandable worry, and lots of patients feel the same way. Thank you for telling me."),
      ("So why can't I just stay in bed for a few days?", '早く歩くことの大切さを説明する(血栓・回復)',
       "Staying in bed for too long can actually slow down your recovery. Getting up early helps prevent blood clots, keeps your muscles strong and helps the new knee move better."),
      ("But what if I fall?", '安全に歩くための支えを説明する(痛み止め・歩行器・付き添い)',
       "I'll make sure you're safe. We'll give you some pain relief first, and then I'll be right beside you with a walking frame. We'll only take a few steps to start with."),
      ("Hmm, OK. Maybe I can try.", '計画に合意する(30分後に)',
       "That's great. How about I bring your pain relief now, and we try in about thirty minutes, once it's working? We'll go at your pace.")]),
    ('Role-play 2 (Nursing)', 'Setting: Day surgery unit', ['Patient: a 30-year-old woman going home today after minor surgery on her hand.'],
     ['Explain how to look after the wound.', 'Explain the signs of infection.', 'Give advice about pain relief.', 'Explain when the stitches will be removed.', 'Check understanding.'],
     [("So I can go home now? What do I need to do with this bandage?", '傷の手当ての方法を説明する(乾かす)',
       "Yes, you can go home today. Please keep the bandage clean and dry for the next five days. When you shower, cover your hand with a plastic bag."),
      ("What if something goes wrong?", '感染のサインを説明する',
       "Good question. Please look out for signs of infection, like increasing redness, swelling, a bad smell, or if you develop a fever. If you notice any of these, call us straight away."),
      ("It's starting to hurt a little.", '痛み止めについてアドバイスする',
       "That's normal after the anaesthetic wears off. You can take paracetamol every six hours as needed, and keeping your hand raised on a pillow will also reduce the swelling."),
      ("When do the stitches come out?", '抜糸の時期を説明する',
       "The stitches will be removed in ten days. You can make an appointment with the practice nurse at your local clinic."),
      ("OK, thank you.", '理解を確認する',
       "You're welcome. Just to make sure I've explained everything clearly, could you tell me what signs would mean you need to call us?")]),
  ),
  OET_SET(
    ('Role-play 1 (Medicine)', 'Setting: General practice', ['Patient: a 25-year-old university student with a cold who is asking for antibiotics.'],
     ["Find out about the patient's symptoms.", 'Explain that the illness is caused by a virus.', 'Explain why antibiotics will not help.', 'Suggest ways to relieve the symptoms.', 'Explain when to come back.'],
     [("Hi, doctor. I've got a terrible cold and I need antibiotics. I have exams next week.", '症状をたずねる(いつから・熱)',
       "I'm sorry you're feeling unwell, especially before your exams. Can you tell me about your symptoms? When did they start, and have you had a fever?"),
      ("Three days ago. Sore throat, runny nose, a bit of a temperature yesterday.", 'ウイルス性の風邪だと説明する',
       "Thank you. From your symptoms and my examination, this looks like a common cold, which is caused by a virus."),
      ("But antibiotics will make it go away faster, won't they?", '抗生物質が効かない理由を説明する',
       "I can see why you'd think that, but antibiotics only work against bacteria, not viruses. They wouldn't help you get better faster, and they can cause side effects like stomach upset."),
      ("So what can I do? I really need to study.", '症状を楽にする方法を提案する',
       "Rest as much as you can, drink plenty of fluids, and you can take paracetamol for the sore throat and temperature. Most colds get better within a week to ten days."),
      ("OK. And if it doesn't get better?", 'いつ再受診すべきか説明する',
       "If you're not improving after ten days, or if you develop a high fever or difficulty breathing, please come back and we'll take another look. I hope your exams go well.")]),
    ('Role-play 2 (Medicine)', 'Setting: Hospital outpatient clinic', ['Patient: a 52-year-old taxi driver who has just been told he has type 2 diabetes.'],
     ["Find out what the patient knows about diabetes.", 'Explain the condition simply.', 'Discuss diet and exercise.', "Respond to the patient's concern about his job.", 'Explain the follow-up plan.'],
     [("Diabetes? I don't really understand what that means.", '患者が知っていることをたずねる',
       "That's completely fine; it's a lot to take in. Before I explain, can I ask what you already know about diabetes, if anything?"),
      ("Only that it's something about sugar.", '病気をわかりやすく説明する',
       "You're right, it's about sugar. Your body isn't using insulin properly, so the sugar level in your blood is higher than it should be. Over time, that can damage your eyes, kidneys and heart, which is why we want to control it."),
      ("Will I have to stop eating everything I like?", '食事と運動について話す',
       "Not everything. It's more about balance: smaller portions, less sugary drinks and white rice, and more vegetables. Walking for thirty minutes a day would also make a big difference."),
      ("I drive a taxi all day. How can I exercise?", '仕事についての心配に答える',
       "I understand; long hours in the car make it hard. Perhaps you could take a short walk during your breaks, or park a little further away and walk. Even small changes help."),
      ("OK. What happens next?", '今後の計画を説明する',
       "We'll start you on a tablet called metformin, and you'll see a dietitian next week. We'll check your blood sugar again in three months. Do you have any questions so far?")]),
  ),
]
OET_ITEMS = {k: {'no': n, 'pts': 3, 'overall': True, 'q': '(全体)', 'ja': j, 'points': p} for k, n, j, p in [
    ('int', 'Intelligibility', '聞き取りやすさ', ['発音・強勢・リズムで伝わる']), ('flu', 'Fluency', '流ちょうさ', ['自然な速さ、不要な間を作らない']),
    ('app', 'Appropriateness of language', '場面に合った言葉', ['専門用語を患者向けに言いかえる']), ('gr', 'Resources of grammar and expression', '文法と表現の幅', ['正確で多様な表現']),
    ('rb', 'Relationship-building', '関係づくり', ['あいさつ・共感・敬意']), ('pp', "Understanding the patient's perspective", '患者の視点の理解', ['不安や考えを引き出して受けとめる']),
    ('st', 'Providing structure', '話の構成', ['話の流れを示す(First, I\'d like to …)']), ('ig', 'Information-gathering', '情報を集める', ['開いた質問 → 閉じた質問']),
    ('ip', 'Information-giving', '情報を伝える', ['少しずつ伝えて理解を確認する'])]}
OET = {
    'grade': 'OET', 'tier': 2, 'minutes': 20, 'lang': 'en-GB', 'unit': 'セット', 'att': False,
    'roles': {'pt': {'av': '🧑', 'name': '患者・家族(対話者)'}},
    'varies': '最初の質問は毎回変わります。',
    'origNote': 'ロールカードはBabel Flightのオリジナルです(進め方・時間は本番と同じ。本番は職種ごとの試験です)。',
    'markNote': '採点は本番のグレードとは違う、自分でつける目安です。',
    'voiceNote': '対話者(患者や家族の役)の英語は、この端末の音声で読み上げます。医師・看護師になったつもりで答えよう。',
    'sumNote': '本番は言葉の4観点と、臨床コミュニケーションの5観点で評価されます。70%をこえたら手ごたえあり。',
    'againNote': '最初の質問は変わります',
    'flow': ['ウォームアップ ・ 仕事についての質問(採点なし)', 'ロールプレイ1 ・ ロールカードを3分読む → 患者・家族役との会話(約5分)', 'ロールプレイ2 ・ 同じ流れ'],
    'exs': [['Dr. Clarke', 'f'], ['Mr. Hughes', 'm'], ['Ms. Patel', 'f'], ['Mr. Walker', 'm']],
    'open': [S("Hello. My name is {ex}, and I'll be your interlocutor today. Can you tell me your name and your profession, please?"), ANS('name', 10, '名前と職業'),
             S("Thank you. Before we start the role-plays, I'd like to ask you a little about your work."),
             POOL('oet_wu', 'wu1', 30, 'ウォームアップ', '', 0)],
    'close': [S("Thank you. That's the end of the speaking test."), END_K],
    'items': OET_ITEMS, 'cards': OET_SETS,
    'pools': {'oet_wu': [
        Q('Where did you train?', 'どこで研修を受けましたか。', ['I trained at a university hospital in Tokyo, and I have been working there for three years.'], ['仕事の経歴を簡単に']),
        Q('What do you enjoy most about your work?', '仕事でいちばん楽しいことは何ですか。', ['I enjoy seeing patients recover and go home. It makes the long shifts worthwhile.'], ['理由を一言']),
        Q('Why would you like to work abroad?', 'なぜ海外で働きたいのですか。', ['I would like to learn about different healthcare systems and improve my skills in an international team.'], ['具体的に']),
        Q('What is a typical day like for you at work?', '仕事の典型的な1日を教えてください。', ['I usually start at eight with a handover, then see patients on the ward and update their records.'], ['順番に']),
    ]},
}

# ================================================================ 客室乗務員の英語面接
CREW_DOOR = {'enter': {'no': '入室', 'pts': 0, 'model': ['Good morning.']}, 'sit': {'no': '着席', 'pts': 0, 'model': ['Thank you.']},
             'bye': {'no': '退室', 'pts': 0, 'model': ['Thank you very much for your time.']}}


def CREW_SET(ann_title, ann, ann_pts, scene_line, talk):
    steps = [S("Thank you. Now, I'd like you to read an in-flight announcement. Please read it silently first."),
             dict(CARD, show='passage'), PREP(20, '黙読'), S("All right. Please read it aloud, as if you were on board."), READ(60), HIDE,
             S("Thank you. Finally, let's do a short role-play. I'm a passenger, and you are a member of the cabin crew. " + scene_line)]
    items = {'read': {'no': 'アナウンス', 'pts': 6, 'points': ann_pts}}
    for j, (line, cue, model) in enumerate(talk):
        i = 'rp%d' % (j + 1)
        steps += [PT(line), ANS(i, 30, cue=cue)]
        items[i] = {'no': 'ロールプレイ%d' % (j + 1), 'pts': 4, 'q': line, 'ja': cue, 'model': [model], 'points': ['まず謝罪・共感(I\'m sorry to hear that.)', 'できることを具体的に提案']}
    return {'card': {'title': ann_title, 'passage': ann}, 'steps': steps, 'items': items}


CREW_SETS = [
  CREW_SET('Welcome on board',
           "Good morning, ladies and gentlemen. Welcome aboard Skyline flight two four seven to Fukuoka. Our flight time will be one hour and forty minutes. Please make sure your seat belt is fastened and your seat back is in the upright position. Thank you.",
           ['flight two four seven を数字1つずつ', 'ゆっくり、笑顔の声で', 'ladies and gentlemen / fastened の発音'],
           "The seat belt sign is on, and you come to my seat.",
           [("Excuse me, I ordered a vegetarian meal, but I got chicken.", '謝って、確認すると伝える', "I'm very sorry about that. Let me check the special meal list for you right away."),
            ("I really can't eat meat.", '特別食がない場合の代わりを提案する', "I understand. I'm afraid we don't have another vegetarian meal, but I can offer you some bread, salad and fruit from our other meals."),
            ("I guess that's OK. I'm quite hungry.", 'すぐ用意すると伝え、ほかに必要なものを聞く', "I'll bring them to you straight away. Would you like something to drink as well?"),
            ("Some water, please.", 'お礼と、改めてのおわび', "Of course. Here you are. Again, I apologise for the mistake, and thank you for your patience.")]),
  CREW_SET('Turbulence',
           "Ladies and gentlemen, the captain has turned on the seat belt sign. We are expecting some turbulence. Please return to your seats and fasten your seat belts. The lavatories should not be used at this time. Thank you for your cooperation.",
           ['落ち着いた、はっきりした声', 'turbulence / cooperation の発音', '文の切れ目で少し間を'],
           "During the flight, you see me looking pale.",
           [("Excuse me... I'm feeling sick. I think it's the turbulence.", '共感し、体調をたずねる', "I'm sorry you're not feeling well. Can you tell me how you're feeling? Are you dizzy, or do you feel like you might be sick?"),
            ("I feel like I'm going to be sick.", 'エチケット袋と水を渡す', "Here is a sick bag, just in case, and I'll bring you a glass of water. Try to take slow, deep breaths."),
            ("Is the shaking going to stop soon?", '安心させる情報を伝える', "The captain expects it to be smoother in about fifteen minutes. The aircraft is designed to handle turbulence safely."),
            ("Thank you. You're very kind.", 'また様子を見に来ると伝える', "You're welcome. Please press the call button if you need anything. I'll come back to check on you shortly.")]),
  CREW_SET('Before landing',
           "Ladies and gentlemen, we will be landing at Haneda Airport in about twenty minutes. The local time is three fifteen p.m., and the temperature is eighteen degrees Celsius. Please return your seat to the upright position and make sure your seat belt is fastened. Thank you.",
           ['時刻と気温をはっきり', 'Celsius / position の発音', '最後の Thank you. まで笑顔で'],
           "Just before landing, you come to my seat.",
           [("Excuse me, my connecting flight leaves in forty minutes. Will I make it?", '不安を受けとめ、便名をたずねる', "I understand that you're worried. Could you tell me your connecting flight number, please?"),
            ("It's flight five one two to Sapporo.", '地上係員に伝えると約束する', "Thank you. I'll ask the captain to inform our ground staff, so they can help you when we arrive."),
            ("Can I move to the front so I can get off quickly?", '着陸前は席を移動できないと説明し、代わりの案', "I'm afraid you can't change seats now because we're about to land. But I'll ask the other passengers if you can get off first."),
            ("Thank you so much.", '安心させる言葉', "You're welcome. A member of our ground staff will meet you at the gate. Have a good flight to Sapporo.")]),
]
CREW_POOL = [
    Q('Could you introduce yourself?', '自己紹介をしてください。', ["Good morning. My name is Yuki Sato. I'm a university student majoring in international communication. I enjoy meeting people from different cultures, and I have worked part-time at a hotel for two years."], ['1分以内', '名前 → 学校・仕事 → 強み']),
    Q('Why do you want to become a cabin attendant?', 'なぜ客室乗務員になりたいのですか。', ['Because I want a job where I can make people\'s journeys safe and comfortable. When I flew abroad as a child, a cabin attendant helped me when I was nervous, and I still remember her kindness.'], ['きっかけの体験', '安全と快適さの両方']),
    Q('Why did you choose our airline?', 'なぜ当社を選んだのですか。', ['I was impressed by your service when I flew with you last year, especially the way the crew paid attention to each passenger. I would like to be part of that team.'], ['具体的な体験', 'その会社らしさ']),
    Q('Tell me about a time you dealt with a difficult customer.', '難しいお客さまに対応した経験を話してください。', ['At my part-time job at a hotel, a guest was angry because his room was not ready. I listened carefully, apologised, and offered him a seat in the lounge with a drink. In the end, he thanked me.'], ['状況 → 行動 → 結果(STAR)']),
    Q('What is your strength?', 'あなたの強みは何ですか。', ['My strength is staying calm under pressure. In my club activities, I was the captain, and I had to make quick decisions during matches.'], ['強み + 具体例']),
    Q('How do you work in a team?', 'チームでどのように働きますか。', ['I try to communicate clearly and help others when they are busy. I believe good teamwork is important for safety on board.'], ['安全とのつながり']),
]
CREW = {
    'grade': '客室乗務員の英語面接', 'tier': 2, 'minutes': 12, 'lang': 'en-US', 'unit': 'セット',
    'roles': {'pt': {'av': '🧳', 'name': '乗客(面接官)'}},
    'entry': [ANS('enter', 6, hint='ノックして入室。Good morning. とあいさつしよう'), S("Good morning. Please have a seat."), ANS('sit', 4, hint='Thank you. と言ってから座ろう')],
    'exit': [S("That's all for today. Thank you for coming."), ANS('bye', 5, hint='お礼を言って退室(Thank you very much for your time.)'), END_K],
    'varies': '面接の質問は毎回変わります。',
    'origNote': '客室乗務員の英語面接には共通の公式試験はありません。航空会社の面接でよくある流れをもとにした、Babel Flightのオリジナルです。',
    'markNote': '採点は自分でつける目安です。',
    'voiceNote': '面接官の英語はこの端末の音声で読み上げます。面接官は毎回変わります。',
    'sumNote': '会社によって形式は違います。70%をこえたら、英語面接の準備はかなりできています。',
    'flow': ['入室 → あいさつ → 着席', '面接の質問(自己紹介・志望動機・経験)', '機内アナウンスの音読(黙読20秒のあと)', '乗客とのロールプレイ', '退室'],
    'exs': [['Ms. Taylor', 'f'], ['Mr. Clark', 'm'], ['Ms. Wright', 'f'], ['Mr. Kim', 'm']],
    'open': [S("{hello}My name is {ex}. Thank you for coming today."), POOL('crew_q', 'q1', 45, '面接の質問1', '', 5), POOL('crew_q', 'q2', 45, '面接の質問2', '', 5), POOL('crew_q', 'q3', 45, '面接の質問3', '', 5)],
    'close': [S("That's all for today. Thank you for coming."), END_K],
    'items': CREW_DOOR, 'cards': CREW_SETS, 'pools': {'crew_q': CREW_POOL},
}
