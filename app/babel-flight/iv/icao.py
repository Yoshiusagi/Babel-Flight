"""航空英語能力証明 (ICAO Language Proficiency) practice, following the MLIT 実地試験実施基準:
導入 (Warm up, not marked) → Single Picture Card → 模擬ATC及びフライトの描写 (flight data, a simulated exchange with the
controller including an emergency and a misunderstanding to clear up, then telling what happened) → Sequence
Picture Card (4 pictures, past events) → 終結 (Wind down, not marked). Marked on the six ICAO areas (発音・文構造・
語彙・流暢さ・理解力・対応力); the overall level is the lowest of the six, level 4 or higher is needed.
Everything here is original and fictional (the airline "Skyline", flight numbers, frequencies). Numbers in the
controller's lines and the model answers are written the way they are spoken on the radio."""
from cards import S, POOL, CARD, HIDE, END_K, Q, scene, say_b, think_b
from intl import ANS

ATC = lambda t: {'k': 'say', 't': t, 'r': 'atc'}
RT = ['便名(コールサイン)を最後に', '数字は1けたずつ(flight level one five zero)', '指示の要点を正確に復唱']


def ICAO_SET(pic, pic_q, pic_m, f1, f1m, info, atc, fd_m, panels, seq_m, f2, f2m):
    """pic: the single picture; atc: [(controller line or None, answer id, hint / cue, model, points)];
    panels: 4 pictures of what happened"""
    steps = [
        S("Now, I'd like you to look at this picture. Please describe what you can see."), dict(CARD, show='pic'),
        ANS('pic', 60, '写真の描写', tip='何が・どこで・だれが・何をしているか。天気や雰囲気も'),
        S(f1), ANS('f1', 30, '写真の質問'), HIDE,
        S("Thank you. Next, we'll do a simulated radio exchange. Here is your flight information. Please read it, and then imagine you are the pilot. I'll play the part of the air traffic controller."),
        dict(CARD, show='info'), {'k': 'prep', 'sec': 30, 'label': 'フライト情報を読む'},
    ]
    items = {
        'pic': {'no': '写真の描写', 'pts': 6, 'q': 'Please describe what you can see.', 'ja': '写真に見えるものを説明する', 'model': [pic_m],
                'points': ['全体 → 細部(In the foreground / In the background)', '現在進行形で', '状況の推測(It looks like …)']},
        'f1': {'no': '写真の質問', 'pts': 4, 'q': f1, 'ja': pic_q, 'model': [f1m], 'points': ['自分の経験や考えで2〜3文']},
    }
    for n, (line, i, cue, model, points) in enumerate(atc):
        if line: steps.append(ATC(line))
        steps.append(ANS(i, 25, '交信%d' % (n + 1), hint=None if line else cue, cue=cue if line else None))
        items[i] = {'no': '交信%d' % (n + 1), 'pts': 4, 'q': line or '(パイロットから呼びかける)', 'ja': cue or 'ふつうの指示: 正しく復唱', 'model': [model], 'points': points or RT}
    steps += [
        S("Thank you. That's the end of the radio exchange. Now, please tell me what happened during the flight, from the beginning."),
        ANS('fd', 90, 'フライトの描写', tip='過去形で、順番に(First / Then / After that / In the end)'), HIDE,
        S("Thank you. Now, please look at these pictures. They show something that happened at an airport. Please tell me the story."),
        dict(CARD, show='panels'), {'k': 'prep', 'sec': 30, 'label': '絵を見て準備'},
        S("Please begin."), ANS('seq', 90, '連続絵の描写', tip='4枚すべて、過去形で'),
        S(f2), ANS('f2', 30, '連続絵の質問'), HIDE,
    ]
    items.update({
        'fd': {'no': 'フライトの描写', 'pts': 8, 'q': 'Please tell me what happened during the flight.', 'ja': '交信した内容を、過去のできごととして説明する', 'model': [fd_m],
               'points': ['過去形・過去進行形', '何が起き、だれに何を頼み、どうなったか', '交信の言い回しではなく、ふつうの英語で']},
        'seq': {'no': '連続絵の描写', 'pts': 8, 'q': 'Please tell me the story.', 'ja': '4枚の絵のできごとを、順番に過去形で話す', 'model': [seq_m],
                'points': ['4枚すべてを入れる', 'つなぎの語(First / Soon after / Finally)', '人の気持ちや理由も']},
        'f2': {'no': '連続絵の質問', 'pts': 4, 'q': f2, 'ja': f2m[1], 'model': [f2m[0]], 'points': ['自分の考え + 理由']},
    })
    return {'card': {'title': 'ICAO', 'picTitle': 'Picture', 'pic': pic, 'info': {'title': 'Flight information', 'rows': info},
                     'seqTitle': 'Sequence pictures', 'panels': panels}, 'steps': steps, 'items': items}


ICAO_SETS = [
  ICAO_SET(
    scene('airport', [['🌧️', 60, 28, 36], ['🌧️', 240, 26, 36], ['✈️', 150, 90, 86], ['🚛', 60, 140, 46], ['👷', 98, 132, 34], ['🧳', 214, 150, 22], ['🧳', 236, 150, 22], ['👷', 262, 132, 34]]),
    'この写真について: 雨は空港の仕事にどんな影響がありますか。',
    "In this picture, I can see an airliner parked at the gate on a rainy day. On the left, there's a fuel truck, and a worker is refuelling the aircraft. On the right, another worker is loading suitcases into the cargo hold. Everyone looks busy, and it seems that the plane is getting ready for its next flight.",
    'How can heavy rain affect operations at an airport?',
    'Heavy rain makes the runway wet, so the stopping distance becomes longer. Visibility can also be poor, so there may be delays, and ground staff need more time to load baggage safely.',
    [['Call sign', 'Skyline 247'], ['Aircraft', 'Boeing 767'], ['Route', 'Tokyo/Haneda (RJTT) → Fukuoka (RJFF)'], ['Persons on board', '212'], ['Fuel endurance', '3 hours 10 minutes'], ['Departure frequency', '126.0']],
    [(None, 'a1', '羽田を離陸した。出発管制(Tokyo Departure)に最初の呼びかけ: いま 2,000フィートを通過、3,000フィートへ上昇中',
      'Tokyo Departure, Skyline two four seven, passing two thousand feet, climbing to three thousand feet.', ['相手 → 自分の便名 → 高度', '上昇中は passing … climbing to …']),
     ("Skyline two four seven, Tokyo Departure, radar contact. Climb and maintain flight level one five zero. Turn right heading two four zero.", 'a2', None,
      'Climb and maintain flight level one five zero, right heading two four zero, Skyline two four seven.', None),
     ("Skyline two three five, descend and maintain flight level one two zero.", 'a3', '自分の便名は 247。似た便名への指示かも? このまま従わずに確認しよう',
      'Tokyo Departure, Skyline two four seven. Confirm, was that instruction for Skyline two four seven?', ['従う前に確認する(Confirm …)', '便名の聞き違いは事故のもと']),
     ("Skyline two four seven, negative. That was for Skyline two three five. Continue climb to flight level one five zero.", 'a4', None,
      'Continue climb to flight level one five zero, Skyline two four seven.', None),
     (None, 'a5', '巡航中、客室乗務員から報告: 乗客1名が意識を失った。医師の乗客が対応中。関西空港に目的地を変更し、到着時に救急車を頼みたい(緊急度は PAN PAN)',
      'PAN PAN, PAN PAN, PAN PAN. Tokyo Control, Skyline two four seven. We have a medical emergency. One passenger is unconscious, and a doctor on board is helping. Request diversion to Kansai, and please have an ambulance meet us on arrival.',
      ['PAN PAN を3回', '何が起きたか → 何をしたいか', 'request diversion / ambulance on arrival']),
     ("Skyline two four seven, roger. Turn left heading two seven zero, descend and maintain flight level one zero zero. Say persons on board and fuel endurance.", 'a6', 'フライト情報カードを見て答えよう',
      'Left heading two seven zero, descend and maintain flight level one zero zero. Two hundred twelve persons on board, fuel endurance three hours and ten minutes, Skyline two four seven.', ['指示の復唱 + 質問の答え', '情報カードの数字を正確に']),
     ("Skyline two four seven, an ambulance will be waiting at the gate. Contact Kansai Approach on one one eight decimal four.", 'a7', None,
      'Contact Kansai Approach on one one eight decimal four. Thank you for your help, Skyline two four seven.', ['周波数は decimal で']),
    ],
    "After we took off from Haneda, I called Tokyo Departure, and the controller told us to climb to flight level one five zero. Then the controller gave a descent instruction for a flight with a similar call sign, so I checked whether it was for us. It wasn't, so we continued our climb. During the cruise, a cabin attendant told us that a passenger had lost consciousness. A doctor on board was looking after him, so we declared an urgency and asked to divert to Kansai. The controller gave us a new heading and a lower altitude and asked about the number of people on board and our fuel. Finally, the controller told us that an ambulance would be waiting at the gate.",
    [scene('airport', [['✈️', 150, 90, 70], ['🛫', 150, 150, 26]], cap='Takeoff'),
     scene('sky', [['✈️', 120, 100, 70], ['🐦', 190, 70, 26], ['🐦', 210, 92, 22], ['💥', 160, 112, 30]], cap='Climbing'),
     scene('cockpit', [['🧑‍✈️', 90, 120, 48], ['🧑‍✈️', 210, 120, 48], ['🎧', 72, 100, 20]], bubbles=[say_b(150, 34, 'Mayday, we hit birds. Request return.', 170)], cap='In the cockpit'),
     scene('airport', [['🛬', 120, 110, 60], ['🚒', 220, 140, 44], ['🚒', 268, 140, 40]], cap='Back at the airport')],
    "Shortly after the plane took off, it flew through a flock of birds, and one of them hit the engine. There was a loud bang. In the cockpit, the captain declared an emergency and told the controller that they wanted to return to the airport. The plane landed safely, and fire engines were waiting next to the runway just in case. Fortunately, nobody was hurt.",
    'What can airports do to reduce the risk of bird strikes?',
    ("Airports can use sounds or trained dogs to scare birds away from the runways. They can also cut the grass short and remove water, so that birds are not attracted to the area.", '空港は鳥との衝突(バードストライク)を減らすために何ができますか。')),
  ICAO_SET(
    scene('airport', [['🏢', 150, 60, 70], ['🧑‍💼', 60, 130, 38], ['👨‍👩‍👧', 106, 130, 40], ['🧳', 132, 150, 22], ['🧍', 176, 132, 36], ['🧍‍♀️', 206, 132, 36], ['🧍', 236, 132, 36], ['🕘', 268, 40, 26]],
          signs=[{'x': 150, 'y': 24, 't': 'CHECK-IN', 'c': '#2e5e8c'}]),
    'この写真について: 空港が混雑するのはなぜですか。',
    "This picture shows a busy check-in area at an airport. There's a long line of passengers waiting in front of the counter. A family with a suitcase is at the counter, and a member of staff is checking their tickets. The clock shows nine o'clock, so it's probably the morning rush, maybe at the start of a holiday.",
    'Why do you think airports become so crowded at certain times?',
    "Many flights leave in the morning, and during holidays like the New Year, a lot of families travel at the same time. If a flight is delayed, passengers also stay longer in the terminal.",
    [['Call sign', 'Skyline 512'], ['Aircraft', 'Airbus A320'], ['Route', 'Osaka/Itami (RJOO) → Sendai (RJSS)'], ['Persons on board', '146'], ['Fuel endurance', '2 hours 30 minutes'], ['Cruising level', 'FL 330']],
    [("Skyline five one two, Tokyo Control, climb and maintain flight level three three zero.", 'a1', None,
      'Climb and maintain flight level three three zero, Skyline five one two.', None),
     (None, 'a2', '巡航中、客室後方から焦げたにおいと煙。すぐに降下して、最寄りの名古屋(中部)に着陸したい(緊急度は MAYDAY)',
      'MAYDAY, MAYDAY, MAYDAY. Tokyo Control, Skyline five one two. We have smoke in the cabin. Request immediate descent and diversion to Chubu.', ['MAYDAY を3回', '状況(smoke in the cabin)→ 要求(immediate descent / diversion)']),
     ("Skyline five one two, roger MAYDAY. Descend and maintain one zero thousand feet. Turn left heading —", 'a3', '指示の途中で無線が途切れた。聞こえなかった部分を聞き返そう',
      'Descend and maintain one zero thousand feet. Tokyo Control, Skyline five one two, say again the heading.', ['聞こえた部分は復唱', 'Say again … で聞き返す']),
     ("Skyline five one two, turn left heading two one zero. Expect ILS approach runway three six at Chubu.", 'a4', None,
      'Left heading two one zero, expect ILS approach runway three six, Skyline five one two.', None),
     (None, 'a5', '煙は止まった。原因は客室のオーブン(電源を切った)。それでも予定どおり中部に着陸し、着陸後に消防の点検を頼みたい',
      'Tokyo Control, Skyline five one two. The smoke has stopped. It came from an oven in the galley, and we have switched it off. We will continue to Chubu, and we request the fire services to check the aircraft after landing.',
      ['状況の変化を報告', 'We will … / We request …']),
     ("Skyline five one two, roger. Fire services will be standing by. Contact Chubu Approach on one two zero decimal two.", 'a6', None,
      'Contact Chubu Approach on one two zero decimal two, Skyline five one two.', None),
    ],
    "After departing from Itami, we were cleared to climb to flight level three three zero. During the cruise, there was smoke in the cabin and a burning smell, so we declared a MAYDAY and asked to descend and divert to Chubu. The controller's instruction was cut off, so I asked him to say the heading again. Then we were given a heading and told to expect an ILS approach. Soon after that, the smoke stopped. It had come from an oven in the galley, which the crew switched off. We decided to land at Chubu anyway, and the controller said that the fire services would be standing by.",
    [scene('snow', [['✈️', 150, 96, 80], ['❄️', 50, 30, 24], ['❄️', 120, 22, 22], ['❄️', 250, 32, 24]], cap='Early morning'),
     scene('snow', [['✈️', 120, 96, 72], ['🚛', 236, 132, 50], ['💦', 190, 104, 30]], cap='At the gate'),
     scene('airport', [['🪟', 150, 46, 60], ['❄️', 150, 44, 26], ['🧍', 70, 132, 38], ['🧍‍♀️', 110, 132, 38], ['👨‍👩‍👦', 200, 132, 42]], signs=[{'x': 150, 'y': 94, 't': 'DELAYED 40 MIN'}], cap='In the terminal'),
     scene('sky', [['✈️', 150, 80, 70], ['☀️', 250, 34, 34], ['☁️', 70, 140, 50], ['☁️', 220, 146, 50]], cap='After takeoff')],
    "Early one morning, it was snowing heavily, and the plane was covered with snow. At the gate, a de-icing truck sprayed the aircraft to remove the snow and ice. Because this took a long time, the flight was delayed by forty minutes, and the passengers were waiting in the terminal. Finally, the plane took off safely, and above the clouds the sun was shining.",
    'Why is it important to remove snow and ice from an aircraft before takeoff?',
    ("Snow and ice on the wings change their shape, so the wings cannot produce enough lift. This can be very dangerous during takeoff.", '離陸前に機体の雪や氷を取り除くことはなぜ大切ですか。')),
  ICAO_SET(
    scene('cockpit', [['⛈️', 150, 44, 50], ['⚡', 210, 40, 26], ['🧑‍✈️', 80, 124, 48], ['📋', 106, 136, 22], ['🧑‍✈️', 220, 124, 48]]),
    'この写真について: 雷雲(積乱雲)はパイロットにとってなぜ危険ですか。',
    "This is a view from the cockpit of an airliner. Through the windscreen, I can see a large thunderstorm with lightning in front of the aircraft. On the left, the captain is holding a checklist, and on the right, the first officer is looking outside. They are probably discussing how to fly around the storm.",
    'Why are thunderstorms dangerous for aircraft?',
    'Thunderstorms can cause severe turbulence, hail and lightning. Strong winds near the ground can also make takeoff and landing very difficult, so pilots usually avoid them by a wide margin.',
    [['Call sign', 'Skyline 88'], ['Aircraft', 'Boeing 787'], ['Route', 'Tokyo/Narita (RJAA) → Okinawa/Naha (ROAH)'], ['Persons on board', '268'], ['Fuel endurance', '4 hours 20 minutes'], ['Cruising level', 'FL 370']],
    [(None, 'a1', '前方に雷雲。進路の左20マイルへよけたい(deviate)と要求しよう',
      'Fukuoka Control, Skyline eight eight. Request deviation two zero miles left of track due to weather.', ['Request deviation … due to weather']),
     ("Skyline eight eight, deviation two zero miles left of track approved. Report clear of weather.", 'a2', None,
      'Deviation two zero miles left of track approved, will report clear of weather, Skyline eight eight.', None),
     (None, 'a3', '揺れが強くなった。高度を下げたい: FL330 への降下を要求',
      'Fukuoka Control, Skyline eight eight. We are experiencing severe turbulence. Request descent to flight level three three zero.', ['severe turbulence を報告', 'Request descent to …']),
     ("Skyline eight eight, climb and maintain flight level three nine zero.", 'a4', '頼んだのは降下(FL330)なのに、上昇(FL390)の指示? 確認しよう',
      'Fukuoka Control, Skyline eight eight. Confirm climb to flight level three nine zero? We requested descent to flight level three three zero.', ['矛盾に気づいたら確認', 'Confirm … ? We requested …']),
     ("Skyline eight eight, correction, descend and maintain flight level three three zero.", 'a5', None,
      'Descend and maintain flight level three three zero, Skyline eight eight.', None),
     (None, 'a6', '雷雲はよけ終わった。客室乗務員1名が揺れで転んで手首をけが。那覇到着時に医療チームを頼みたい(緊急度は PAN PAN)',
      'PAN PAN, PAN PAN, PAN PAN. Fukuoka Control, Skyline eight eight. We are clear of weather. One cabin attendant was injured during the turbulence. Request medical assistance on arrival at Naha.', ['clear of weather の報告', 'けが人の報告 + 依頼']),
     ("Skyline eight eight, roger. Medical assistance will be arranged. Proceed direct to Naha.", 'a7', None,
      'Direct to Naha, Skyline eight eight. Thank you.', None),
    ],
    "During the flight to Naha, there was a large thunderstorm ahead of us, so we asked to deviate twenty miles to the left, and the controller approved it. Then we encountered severe turbulence, so we requested a descent. However, the controller told us to climb, so I asked him to confirm. He corrected the instruction and cleared us to descend to flight level three three zero. Unfortunately, one cabin attendant fell and hurt her wrist during the turbulence. After we were clear of the weather, we reported this and asked for medical assistance at Naha, and the controller cleared us direct to Naha.",
    [scene('park', [['🧑', 80, 128, 42], ['🎮', 104, 136, 20], ['🛸', 170, 60, 30], ['🛬', 260, 40, 40]], cap='A park near the airport'),
     scene('sky', [['✈️', 110, 90, 70], ['🛸', 200, 80, 30]], bubbles=[think_b(220, 36, '⚠️', 44)], cap='On approach'),
     scene('airport', [['🛫', 150, 70, 64]], signs=[{'x': 150, 'y': 140, 't': 'GO-AROUND', 'c': '#a35a1f'}], cap='Go-around'),
     scene('park', [['👮', 130, 124, 46], ['🧑', 200, 128, 42], ['🛸', 230, 142, 22]], bubbles=[say_b(130, 40, 'You cannot fly drones near the airport.', 170)], cap='Later')],
    "A man was flying a drone in a park near the airport. While a plane was on approach, the pilots saw the drone very close to their aircraft. To be safe, they decided to go around and reported the drone to the tower. Later, a police officer found the man in the park and told him that he could not fly drones near the airport.",
    'Do you think there should be stricter rules for flying drones?',
    ("Yes, I do. Even a small drone can damage an engine or a windscreen. People should register their drones, and there should be large no-fly zones around airports.", 'ドローンの飛行にはもっと厳しいルールが必要だと思いますか。')),
  ICAO_SET(
    scene('snow', [['🛬', 130, 60, 56], ['🚜', 80, 140, 44], ['🚜', 150, 140, 44], ['🚜', 220, 140, 44], ['❄️', 260, 30, 24]]),
    'この写真について: 雪の日の空港ではどんな問題が起きますか。',
    "In this picture, it's snowing at an airport. Three snowplows are clearing snow from the runway, and an aircraft is approaching in the background. It looks very cold, and the runway is probably slippery, so the plane might have to wait until the snow is removed.",
    'What problems can snow cause at an airport?',
    'Snow makes the runway slippery, so planes need more distance to stop. Airports may have to close runways for snow removal, which causes delays and cancellations.',
    [['Call sign', 'Skyline 361'], ['Aircraft', 'Boeing 737'], ['Route', 'Fukuoka (RJFF) → Okinawa/Naha (ROAH)'], ['Persons on board', '158'], ['Fuel endurance', '2 hours 40 minutes'], ['Landing runway (ATIS)', '18']],
    [(None, 'a1', '那覇への進入中。車輪(脚)を出したが、前輪の緑のランプがつかない。進入をやめて上空で待機(hold)して点検したい(緊急度は PAN PAN)',
      'PAN PAN, PAN PAN, PAN PAN. Naha Approach, Skyline three six one. We have a landing gear problem. The nose gear does not show down and locked. Request holding to check the problem.', ['問題を具体的に(nose gear not down and locked)', 'Request holding …']),
     ("Skyline three six one, roger. Climb and maintain four thousand feet. Hold north of the field, right turns. Report ready for approach.", 'a2', None,
      'Climb and maintain four thousand feet, hold north of the field, right turns, will report ready for approach, Skyline three six one.', None),
     (None, 'a3', 'チェックリストを実施したがランプはつかないまま。タワーの前を低く飛んで(low pass)、目で脚を確認してもらいたい',
      'Naha Approach, Skyline three six one. The light is still not on after the checklist. Request a low pass over the tower to check the nose gear visually.', ['結果の報告 + 次の要求', 'low pass / check visually']),
     ("Skyline three six one, Naha Tower. Low pass approved, runway three six, not below five hundred feet.", 'a4', 'タワーに切り替わった。ATIS では使用滑走路は 18。36 と言われた? 確認しよう',
      'Naha Tower, Skyline three six one. Confirm runway three six? The ATIS says runway one eight is in use.', ['情報の食い違いを確認', 'Confirm runway …? The ATIS says …']),
     ("Skyline three six one, correction, runway one eight. Low pass approved, not below five hundred feet.", 'a5', None,
      'Runway one eight, low pass approved, not below five hundred feet, Skyline three six one.', None),
     ("Skyline three six one, your nose gear appears to be down. Emergency vehicles are standing by. Cleared to land runway one eight.", 'a6', None,
      'Cleared to land runway one eight, Skyline three six one. Thank you.', None),
    ],
    "On the approach to Naha, we lowered the landing gear, but the light for the nose gear did not come on. We told the controller and asked to hold, so he told us to climb to four thousand feet and hold north of the airport. We used the checklist, but the light was still off, so we asked to fly low past the tower so that they could look at the gear. The tower controller said runway three six, but the ATIS said runway one eight, so I asked him to confirm, and he corrected it. The tower saw that the gear seemed to be down, and we landed on runway one eight with emergency vehicles standing by.",
    [scene('airport', [['✈️', 120, 90, 72], ['🚚', 230, 136, 44]], cap='At the gate'),
     scene('airport', [['✈️', 120, 90, 72], ['🚚', 186, 120, 44], ['💥', 166, 100, 26]], cap='A few minutes later'),
     scene('airport', [['✈️', 110, 90, 66], ['👷', 196, 128, 40], ['🔦', 176, 116, 18], ['🧑‍✈️', 250, 126, 42]], cap='Checking the damage'),
     scene('airport', [['🧍', 70, 132, 38], ['🧍‍♀️', 110, 132, 38], ['👩‍💼', 220, 128, 42]], signs=[{'x': 150, 'y': 40, 't': 'FLIGHT 361 CANCELED'}], cap='In the terminal')],
    "While the plane was at the gate, a catering truck was driving towards it to deliver meals. A few minutes later, the truck accidentally hit the side of the aircraft near the door. An engineer checked the damage with a flashlight, and the captain watched carefully. Because the aircraft needed to be repaired, the flight was canceled, and an airline staff member explained the situation to the passengers in the terminal.",
    'Who do you think should be responsible when ground equipment damages an aircraft?',
    ("I think the company that operates the vehicle is responsible, but the airport should also have clear rules and training, so that this kind of accident doesn't happen again.", '地上の車両が機体を傷つけたとき、責任はだれにあると思いますか。')),
]
# ---- set 5 (original): "unable", an emergency descent, a heading to check; a lost suitcase ----
ICAO_SETS += [
  ICAO_SET(
    scene('airport', [['🌙', 262, 28, 28], ['✈️', 150, 88, 86], ['🧑‍✈️', 62, 132, 40], ['🔦', 86, 122, 18], ['🚚', 248, 140, 44]]),
    'この写真について: パイロットが毎回飛行前に機体を点検するのはなぜだと思いますか。',
    "In this picture, I can see an airliner at the gate in the evening. On the left, a pilot is walking around the aircraft with a flashlight. I think he is doing the pre-flight inspection. On the right, a catering truck is delivering food and drinks to the plane. It looks like the plane will depart soon.",
    'Why do you think pilots check the aircraft before every flight?',
    "They need to make sure there is no damage or leak before the flight. Even a small problem, such as a damaged tyre, can become dangerous during takeoff or landing.",
    [['Call sign', 'Skyline 630'], ['Aircraft', 'Airbus A321'], ['Route', 'Sapporo/New Chitose (RJCC) → Tokyo/Haneda (RJTT)'], ['Persons on board', '190'], ['Fuel endurance', '2 hours 50 minutes'], ['Cruising level', 'FL370']],
    [(None, 'a1', '新千歳を離陸した。札幌管制(Sapporo Control)に最初の呼びかけ: いま flight level 280 を通過、flight level 370 へ上昇中',
      'Sapporo Control, Skyline six three zero, passing flight level two eight zero, climbing to flight level three seven zero.', ['相手 → 自分の便名 → 高度', '上昇中は passing … climbing to …']),
     ("Skyline six three zero, Sapporo Control, radar contact. Climb and maintain flight level three nine zero.", 'a2', '機体が重く、今は flight level 390 まで上がれない。できないことと理由を伝え、370 を希望しよう',
      'Unable flight level three nine zero due to aircraft weight. Request flight level three seven zero, Skyline six three zero.', ['できないときは Unable …', '理由(due to …)+ 代わりの希望(Request …)']),
     ("Skyline six three zero, roger. Maintain flight level three seven zero.", 'a3', None,
      'Maintain flight level three seven zero, Skyline six three zero.', None),
     (None, 'a4', '巡航中、客室の気圧が下がる警報(与圧の異常)。酸素マスクをつけ、10,000フィートへ緊急降下を始めた(緊急度は MAYDAY)',
      'MAYDAY, MAYDAY, MAYDAY. Sapporo Control, Skyline six three zero. We have a pressurization problem. We are making an emergency descent to one zero thousand feet.',
      ['MAYDAY を3回', '状況 → 今していること(emergency descent)', '高度は one zero thousand feet']),
     ("Skyline six three zero, roger MAYDAY. Descend and maintain one zero thousand feet. Squawk seven seven zero zero. Say intentions.", 'a5', 'すべて復唱し、仙台へのダイバート(目的地変更)を希望。けが人がいないことも伝えよう',
      'Descend and maintain one zero thousand feet, squawk seven seven zero zero. We request diversion to Sendai. There are no injuries on board, Skyline six three zero.',
      ['指示を順に復唱 → 希望(intentions)', 'squawk seven seven zero zero=緊急を示す番号']),
     ("Skyline six three zero, cleared direct Sendai. Turn left heading zero one zero.", 'a6', '仙台は南にある。北向き(010)の指示は逆方向かも? 従う前に確認しよう',
      'Confirm left heading zero one zero? Sendai is to the south, Skyline six three zero.', ['おかしいと思ったら Confirm …', '理由も短く']),
     ("Skyline six three zero, correction. Turn right heading one eight zero, direct Sendai when able. Contact Sendai Approach on one two zero decimal five.", 'a7', None,
      'Right heading one eight zero, direct Sendai when able, contact Sendai Approach on one two zero decimal five, Skyline six three zero.', ['訂正(correction)後の指示を正確に', '周波数は decimal で']),
    ],
    "After we departed from New Chitose, I called Sapporo Control. The controller told us to climb to flight level three nine zero, but the aircraft was too heavy, so I said we were unable and asked to stay at flight level three seven zero. During the cruise, we had a pressurization problem, so I declared a MAYDAY and started an emergency descent to ten thousand feet. I asked to divert to Sendai and reported that no one was injured. Then the controller gave us a heading to the north, which was the wrong direction, so I checked it. The controller corrected it to heading one eight zero, and we were handed over to Sendai Approach.",
    [scene('airport', [['🧳', 110, 150, 26], ['🧳', 166, 150, 26], ['🧍', 56, 128, 40], ['👩', 236, 124, 46]], signs=[{'x': 150, 'y': 60, 't': 'BAGGAGE CLAIM'}], cap='At baggage claim'),
     scene('airport', [['🕐', 254, 36, 28], ['👩', 150, 124, 48]], bubbles=[think_b(86, 56, '🧳❓', 54)], cap='An hour later'),
     scene('office', [['👩', 76, 124, 46], ['📋', 116, 134, 20], ['👨‍💼', 196, 124, 46], ['💻', 230, 140, 24]], cap='At the lost baggage office'),
     scene('street', [['🏨', 252, 74, 56], ['🚐', 176, 140, 44], ['🧳', 116, 150, 26], ['👩', 70, 124, 44]], bubbles=[think_b(70, 56, '😊', 44)], cap='The next day')],
    "A woman arrived at the airport and waited for her suitcase at baggage claim. Other passengers picked up their bags, but her suitcase didn't come out. An hour later, she was still waiting, and she looked very worried. She went to the lost baggage office, and a staff member checked on his computer and wrote down where she was staying. The next day, a driver brought her suitcase to her hotel, and she was very relieved.",
    'What should airlines do to prevent baggage from being lost?',
    ("Airlines can attach tags with electronic chips to bags so that they can track them. They should also give ground staff enough time to transfer bags between connecting flights.", '航空会社は荷物の紛失を防ぐために何をすべきですか。')),
]
ICAO_WU = [
    Q('What do you do?', 'お仕事は何ですか。', ["I'm a first officer at a domestic airline. I fly the Boeing seven-three-seven."], ['パイロットになったつもりで']),
    Q('How long have you been flying?', 'どのくらい飛んでいますか。', ["I've been flying for about five years, and I've been with my current airline for two years."], ['現在完了で']),
    Q('Why did you want to become a pilot?', 'なぜパイロットになりたかったのですか。', ["I've loved airplanes since I was a child. I used to watch them at the airport with my father."], ['理由 + 思い出']),
    Q('Which airport do you like flying into the most?', 'いちばん好きな着陸先の空港はどこですか。', ['I like flying into Naha, because the view of the sea on the approach is beautiful.'], ['理由も']),
    Q('What do you usually do before a flight?', '飛行前にふだん何をしますか。', ['I check the weather and the flight plan, and then I have a briefing with the captain and the cabin crew.'], ['順番に']),
]
ICAO_WD = [
    Q('What are your plans after this test?', 'このテストのあとの予定は何ですか。', ["I'm going to have lunch with a friend and then go home and rest."], ['未来の表現(be going to / will)']),
    Q('Where would you like to fly in the future?', '将来どこへ飛びたいですか。', ["I'd like to fly long-haul routes to Europe, especially to London."], ["I'd like to …"]),
    Q('What do you do on your days off?', '休みの日は何をしますか。', ['I usually go cycling or spend time with my family.'], ['ふだんのことは現在形']),
    Q('Do you have any plans for your next holiday?', '次の休暇の予定はありますか。', ["Yes, I'm going to visit my grandparents in Hokkaido."], ['予定は be going to']),
    Q('How do you keep your English skills up?', '英語力をどうやって保っていますか。', ['I listen to aviation podcasts and practise radio phraseology with my colleagues.'], ['具体的に']),
]
ICAO_WU += [
    Q('What do you like most about your job?', '仕事のいちばん好きなところは何ですか。', ['I love the view from the cockpit, especially when the sun rises above the clouds.'], ['具体的な場面を']),
    Q('Where did you do your flight training?', 'どこで飛行訓練を受けましたか。', ['I trained at the Civil Aviation College in Japan. The first part of the training was in Miyazaki.'], ['過去形で']),
    Q('How do you stay healthy with an irregular schedule?', '不規則な勤務でどうやって健康を保っていますか。', ['I try to sleep well before early flights, and I use the hotel gym when I have a long layover.'], ['習慣は現在形で']),
    Q('What is the most challenging part of your job?', '仕事でいちばん大変なことは何ですか。', ['Flying in bad weather is the most challenging part. I have to make quick decisions while keeping everyone safe.'], ['理由も']),
    Q('How do you usually get to the airport?', 'ふだんどうやって空港へ行きますか。', ["I usually take the train, but for very early flights I drive because the trains aren't running yet."], ['ふだんのことは現在形']),
]
ICAO_WD += [
    Q('What are you going to do this weekend?', '今週末は何をする予定ですか。', ["I'm going to go hiking with my friends if the weather is good."], ['予定は be going to']),
    Q('Which city do you enjoy visiting the most?', 'いちばん訪れるのが楽しい都市はどこですか。', ['I like Sapporo, because the food is great, especially the seafood.'], ['理由も']),
    Q('Do you have a hobby outside aviation?', '航空以外の趣味はありますか。', ['Yes, I enjoy photography. I often take pictures of landscapes when I travel.'], ['Yes / No + 1〜2文']),
    Q('How did you find the test today?', '今日のテストはどうでしたか。', ['It was challenging, but I think the radio exchange went well.'], ['感想を過去形で']),
    Q('What advice would you give to someone who wants to become a pilot?', 'パイロットになりたい人にどんなアドバイスをしますか。', ['Study English and science hard, and take care of your health. The training takes a long time, so never give up.'], ['命令文や should を使って']),
]
ICAO_ITEMS = {
    'pron': {'no': '発音', 'pts': 6, 'overall': True, 'q': '(全体)', 'ja': 'Pronunciation', 'points': ['理解をさまたげない発音・強勢・リズム']},
    'str': {'no': '文構造', 'pts': 6, 'overall': True, 'q': '(全体)', 'ja': 'Structure', 'points': ['基本の文型と時制を正しく、予想外の場面でも']},
    'voc': {'no': '語彙', 'pts': 6, 'overall': True, 'q': '(全体)', 'ja': 'Vocabulary', 'points': ['ふつうの話題と仕事の話題を言いかえられる']},
    'flu': {'no': '流暢さ', 'pts': 6, 'overall': True, 'q': '(全体)', 'ja': 'Fluency', 'points': ['適切な速さで、つなぎの言葉も使って話せる']},
    'comp': {'no': '理解力', 'pts': 6, 'overall': True, 'q': '(全体)', 'ja': 'Comprehension', 'points': ['予想外の展開でも、ほぼ正確に理解できた']},
    'int': {'no': '対応力', 'pts': 6, 'overall': True, 'q': '(全体)', 'ja': 'Interactions', 'points': ['すぐに適切に答え、確認・聞き返しで誤解を解けた']},
}
ICAO = {
    'grade': '航空英語能力証明', 'tier': 2, 'minutes': 20, 'lang': 'en-US', 'unit': 'セット', 'att': False, 'pardon': 'Say again?',
    'atcName': '管制官(対話者)',
    'varies': '導入と終結の質問は毎回変わります。',
    'origNote': '問題はBabel Flightのオリジナルです(航空会社・便名・周波数は架空。流れは国土交通省の実地試験実施基準と同じ)。',
    'markNote': '採点は本番のレベル判定とは違う、自分でつける目安です。',
    'voiceNote': '対話者(面接官)と管制官の英語は、この端末の音声で読み上げます。パイロットになったつもりで答えよう。',
    'sumNote': '本番は6つの観点のうち、いちばん低い観点のレベルが総合のレベルになります(レベル4以上が必要)。自己採点でも、いちばん低い観点に注目しよう。',
    'againNote': '導入と終結の質問は変わります',
    'flow': ['導入(Warm up) ・ 名前や仕事について(採点なし)', '写真の描写(Single Picture)+ 質問', '模擬ATC ・ フライト情報を読む → 管制官との交信(緊急事態と、行き違いの確認をふくむ)→ フライトの描写', '連続絵(Sequence Pictures, 4枚)を過去のできごととして話す + 質問', '終結(Wind down) ・ これからの予定など(採点なし)'],
    'exs': [['Mr. Sato', 'm'], ['Ms. Ito', 'f'], ['Mr. Brown', 'm'], ['Ms. Green', 'f']],
    'open': [S("Good morning. My name is {ex}, and I'll be your interlocutor today. Could you tell me your name, please?"), ANS('name', 8, '名前'),
             S("Thank you. Before we start, I'd like to ask you a few questions."),
             POOL('icao_wu', 'wu1', 25, '導入', '', 0), POOL('icao_wu', 'wu2', 25, '導入', '', 0)],
    'close': [S("Thank you. That's the end of the main part of the test. Just a couple more questions before we finish."),
              POOL('icao_wd', 'wd1', 25, '終結', '', 0), POOL('icao_wd', 'wd2', 25, '終結', '', 0),
              S("Thank you very much. That's the end of the test."), END_K],
    'items': ICAO_ITEMS, 'cards': ICAO_SETS, 'pools': {'icao_wu': ICAO_WU, 'icao_wd': ICAO_WD},
}
