/* ================= 職業の1日シミュレーション (every class, 英語, 日本語 display) =================
   One working day of the job chosen in 職業モード, scene after scene, on the same engine as the route simulation
   (f33_route.js: RTX, view 'route', scene units, sceneFinish → next stage). パイロット / 客室乗務員 / 医師・看護師 /
   ITエンジニア. Each day has one trouble, picked at random from two, and not shown before it happens.
   Entry: a card on the home screen in 職業モード (English, a job that has a day). Counts as one lesson (mode 'jobday').
   All lines are original. turn: [partner line, its Japanese, your answer, its Japanese, reading, note]. */

var JD={
 pilot:{title:'パイロットの1日',lat:'A DAY AS A FIRST OFFICER',place:'羽田 → ロサンゼルス',arr:['ARRIVED','LOS ANGELES','ロサンゼルス'],fno:'BF 012',you:'副操縦士',
  lead:'国際線の副操縦士として、出発前のブリーフィングから着陸まで。機長・客室乗務員・管制官と英語でやりとりします。',
  plan:[['jd-p-brief','jd-p-clr','jd-p-cabin'],['jd-p-sick','jd-p-wx'],['jd-p-land']],
  st:{
  'jd-p-brief':{jp:'出発前ブリーフィング',lat:'PRE-FLIGHT BRIEFING',role:'機長',ini:'機',sit:'出発の90分前。機長と天気・燃料・どちらが操縦するかを確認します。',lead:'',
   t:[[["Morning. Have you checked the weather at Los Angeles?","おはよう。ロサンゼルスの天気は確認した？","Yes. It's clear, with light winds from the west.","はい。晴れで、西から弱い風です","","天気は「空の様子 → 風」の順に伝えると、聞き手が整理しやすいです。"],
     ["Good. What about fuel?","よし。燃料はどう？","We have enough fuel, plus thirty minutes extra.","十分な燃料と、30分の予備があります","","extra =「余分の」。予備の燃料は安全のための大事な確認事項です。"],
     ["Would you like to fly the first leg?","最初の区間は君が操縦する？","Yes, I'd be happy to.","はい、ぜひ","","I'd be happy to. は「喜んで」。仕事で引き受けるときの気持ちのいい返事です。"]],
    ["Great. You have control after takeoff, then.","いいね。じゃあ離陸後は君の操縦で"]]},
  'jd-p-clr':{jp:'管制承認をもらう',lat:'CLEARANCE',role:'管制官(デリバリー)',ini:'管',sit:'エンジンをかける前に、管制官から飛行ルートの許可(管制承認)をもらいます。',lead:'コックピットに入り、出発の準備。まずは管制にルートの許可をもらいます。',
   t:[[["","","Tokyo Delivery, Babel 12, request clearance to Los Angeles.","東京デリバリー、バベル12、ロサンゼルスへの承認を要求します","","無線では「相手 → 自分 → 用件」の順。決まった型で短く言います。"],
     ["Babel 12, cleared to Los Angeles, climb to flight level two four zero.","バベル12、ロサンゼルスへの飛行を承認、高度24,000フィートまで上昇","Cleared to Los Angeles, flight level two four zero, Babel 12.","ロサンゼルスへ承認、高度240、バベル12","","管制の指示は、大事な部分を復唱(リードバック)して、最後に自分の便名を言います。"],
     ["Readback correct. Contact ground when ready.","復唱は正しいです。準備ができたらグランドへ","Contact ground when ready, Babel 12.","準備ができたらグランドへ、バベル12","","「了解」だけで終わらず、指示をくり返すのがプロの基本です。"]],
    ["Babel 12, have a good flight.","バベル12、よいフライトを"]]},
  'jd-p-cabin':{jp:'客室乗務員との打ち合わせ',lat:'CREW BRIEFING',role:'チーフパーサー',ini:'客',sit:'チーフパーサーに、飛行時間と揺れの予報を伝えます。',lead:'客室の準備も進んでいます。チーフパーサーがコックピットに来ました。',
   t:[[["Hi. How long is the flight today?","こんにちは。今日の飛行時間はどのくらいですか","About nine hours and forty minutes.","約9時間40分です","","About ＋ 時間で「約〜」。"],
     ["Are we expecting any turbulence?","揺れは予想されていますか","Yes, about two hours after takeoff, for twenty minutes.","はい、離陸の約2時間後に20分ほど","","turbulence =「(飛行機の)揺れ」。いつ・どのくらいの長さかをセットで伝えます。"],
     ["Okay. Should we finish the meal service before that?","わかりました。その前に食事のサービスを終えたほうがいいですか","Yes, please. We'll turn on the seat belt sign.","はい、お願いします。シートベルトのサインをつけます","",""]],
    ["Got it. I'll tell the team.","了解です。チームに伝えます"]]},
  'jd-p-sick':{jp:'トラブル: 機内で急病人',lat:'MEDICAL EMERGENCY',role:'チーフパーサー',ini:'客',sit:'太平洋の上で、チーフパーサーから急ぎの連絡。乗客の具合が悪いようです。',trouble:1,lead:'巡航中。インターホンが鳴りました…',
   t:[[["We have a sick passenger. He has chest pain.","具合の悪い乗客がいます。胸が痛いそうです","Is there a doctor on board?","機内にお医者さんはいますか","","on board =「機内に」。まず医師がいるかを確かめます。"],
     ["Yes, a doctor is with him now.","はい、今お医者さんがついています","Please ask the doctor if we need to land.","着陸が必要か、お医者さんに聞いてください","","ask 〜 if … =「…かどうか〜に聞く」。"],
     ["The doctor says he's stable for now.","今は落ち着いているそうです","Okay. Please keep me updated every fifteen minutes.","わかりました。15分ごとに様子を教えてください","","keep me updated =「状況を知らせ続けて」。仕事でとても使う表現です。"]],
    ["Will do. I'll call you right away if anything changes.","わかりました。何かあればすぐ連絡します"]]},
  'jd-p-wx':{jp:'トラブル: 目的地の天気が悪化',lat:'WEATHER CHANGE',role:'機長',ini:'機',sit:'到着の1時間前。ロサンゼルスに霧が出てきたという情報が入りました。',trouble:1,lead:'到着の1時間前。最新の天気が届きました…',
   t:[[["The new weather shows fog at Los Angeles.","最新の天気で、ロサンゼルスに霧が出ています","How far can we see on the runway?","滑走路の見える距離はどのくらいですか","","霧のときは「どこまで見えるか」が着陸できるかの決め手です。"],
     ["About five hundred meters, and getting worse.","約500メートルで、悪くなっています","Do we have enough fuel to go to San Francisco?","サンフランシスコへ行ける燃料はありますか","","別の空港へ向かうこと(ダイバート)も考えて、燃料を確認します。"],
     ["Yes, we do. Let's try one approach first.","あるよ。まずは1回、進入してみよう","Agreed. If we can't see the runway, we'll go to San Francisco.","賛成です。滑走路が見えなければ、サンフランシスコへ向かいましょう","","Agreed. =「賛成です」。決めごとは、もしもの場合までセットで確認します。"]],
    ["Good plan. Let's brief the approach.","いい計画だ。進入の打ち合わせをしよう"]]},
  'jd-p-land':{jp:'着陸許可から駐機まで',lat:'LANDING',role:'管制官(タワー)',ini:'管',sit:'ロサンゼルスに近づきました。タワーの管制官から着陸許可をもらいます。',lead:'いよいよ着陸。滑走路が見えてきました。',
   t:[[["Babel 12, wind two five zero at eight, runway two five left, cleared to land.","バベル12、風は250度から8ノット、滑走路25L、着陸を許可","Runway two five left, cleared to land, Babel 12.","滑走路25L、着陸許可、バベル12","","着陸許可は必ず「滑走路の番号」と一緒に復唱します。"],
     ["Babel 12, turn left at the next exit, contact ground.","バベル12、次の出口を左へ、グランドへ","Left at the next exit, contact ground, Babel 12.","次の出口を左、グランドへ、バベル12","",""],
     ["Babel 12, taxi to gate fifty-two.","バベル12、52番ゲートへ地上走行してください","Taxi to gate fifty-two, Babel 12. Thank you.","52番ゲートへ、バベル12。ありがとう","","taxi は飛行機が地上を走ること。最後のお礼で1日が終わります。"]],
    ["Welcome to Los Angeles, Babel 12.","ロサンゼルスへようこそ、バベル12"]]}
 }},
 crew:{title:'客室乗務員の1日',lat:'A DAY AS CABIN CREW',place:'成田 → ロンドン',arr:['ARRIVED','LONDON','ロンドン'],fno:'BF 201',you:'客室乗務員',
  lead:'国際線の客室乗務員として、搭乗のお出迎えからお見送りまで。いろいろなお客さんに英語で対応します。',
  plan:[['jd-c-board','jd-c-seat','jd-c-meal'],['jd-c-sick','jd-c-noise'],['jd-c-bye']],
  st:{
  'jd-c-board':{jp:'搭乗のお出迎え',lat:'BOARDING',role:'乗客',ini:'客',sit:'搭乗が始まりました。席がわからないお客さんと、荷物が棚に入らないお客さん。',lead:'',
   t:[[["Hi. Where's seat thirty-four C?","こんにちは。34Cの席はどこですか","It's on the right side, by the aisle.","右側の通路側です","","by the aisle =「通路側」。窓側は by the window。"],
     ["Thanks. My bag doesn't fit in the bin.","ありがとう。かばんが棚に入らないんです","Let me find another space for you.","別の場所を探しますね","","Let me 〜 =「わたしが〜しますね」。お客さんを安心させる言い方です。"],
     ["Oh, that's very kind.","まあ、ご親切に","My pleasure. Please take your seat.","どういたしまして。お席にどうぞ","","My pleasure. はていねいな「どういたしまして」。接客の定番です。"]],
    ["Thank you so much.","本当にありがとう"]]},
  'jd-c-seat':{jp:'席を替えてほしいと頼まれる',lat:'SEAT CHANGE',role:'乗客',ini:'客',sit:'家族連れのお客さんから、席がバラバラなので一緒に座りたいと相談されました。',lead:'ドアが閉まる少し前。呼び出しボタンが光りました。',
   t:[[["Excuse me. My family is sitting apart. Can we sit together?","すみません。家族の席が離れてしまって。一緒に座れますか","Let me check if there are any free seats.","空いている席があるか確認しますね","","check if 〜 =「〜かどうか確かめる」。"],
     ["Thank you. There are three of us.","ありがとう。3人なんです","There are three seats together in row forty.","40列に3席並んで空いています","","row =「(座席の)列」。"],
     ["Can we move there now?","今そこに移れますか","Yes, please follow me.","はい、ついて来てください","","follow me =「ついて来てください」。案内するときに使います。"]],
    ["That's great. Thank you!","よかった。ありがとう！"]]},
  'jd-c-meal':{jp:'機内食をお配りする',lat:'MEAL SERVICE',role:'乗客',ini:'客',sit:'機内食の時間。ところが、チキンが先になくなってしまいました。',lead:'離陸して1時間。機内食のカートを押して通路へ。',
   t:[[["","","Would you like fish or pasta?","お魚とパスタ、どちらになさいますか","","チキンがなくなったら、残っているものだけを聞くのがコツです。"],
     ["I wanted chicken. Is there any left?","チキンがよかったんですが、残っていますか","I'm sorry, we've run out of chicken.","申し訳ありません、チキンは終わってしまいました","","run out of 〜 =「〜を切らす」。"],
     ["Oh, okay. What's the pasta like?","そうですか。パスタはどんな料理ですか","It's tomato pasta with vegetables. It's very popular.","野菜のトマトパスタです。とても人気ですよ","","料理の説明 → ひとことおすすめ、で選びやすくなります。"]],
    ["Then I'll have the pasta, please.","じゃあパスタをお願いします"]]},
  'jd-c-sick':{jp:'トラブル: 気分が悪いお客さん',lat:'SICK PASSENGER',role:'乗客',ini:'客',sit:'夜の機内。青い顔をしたお客さんがギャレーに来ました。',trouble:1,lead:'機内の照明を落とした、静かな時間…',
   t:[[["Excuse me. I feel sick.","すみません。気分が悪いんです","I'm sorry to hear that. Please sit down here.","それはおつらいですね。ここに座ってください","","I'm sorry to hear that. は相手を気づかう決まり文句。まず座ってもらいます。"],
     ["I feel dizzy and a little hot.","めまいがして、少し熱っぽいです","Here's some cold water. Do you have any allergies?","冷たいお水をどうぞ。アレルギーはありますか","","具合の悪い人には、アレルギーや持病を先に聞いておくと安心です。"],
     ["No, I don't.","いいえ、ありません","Okay. I'll check on you again in a few minutes.","わかりました。数分後にまた様子を見に来ますね","","check on 〜 =「〜の様子を見る」。"]],
    ["Thank you. I feel a little better already.","ありがとう。もう少し楽になりました"]]},
  'jd-c-noise':{jp:'トラブル: 後ろの席の人が蹴ってくる',lat:'PASSENGER ISSUE',role:'乗客',ini:'客',sit:'お客さんから「後ろの人がずっと座席を蹴ってくる」と相談されました。',trouble:1,lead:'食事のあと。呼び出しボタンが光りました…',
   t:[[["The person behind me keeps kicking my seat.","後ろの人がずっと座席を蹴ってくるんです","I'm sorry about that. I'll talk to them.","申し訳ありません。わたしから話してみます","","お客さん同士で話させず、乗務員が間に入るのが基本です。"],
     ["Thank you. I can't sleep at all.","ありがとう。ぜんぜん眠れなくて","I understand. Would you like another blanket?","そうですよね。毛布をもう1枚いかがですか","","I understand. で気持ちを受け止めてから、できることを提案します。"],
     ["Yes, please.","はい、お願いします","Here you are. Please call me if it happens again.","どうぞ。また起きたら呼んでくださいね","",""]],
    ["I will. Thanks for your help.","そうします。助かりました"]]},
  'jd-c-bye':{jp:'着陸前とお見送り',lat:'ARRIVAL',role:'乗客',ini:'客',sit:'まもなくロンドンに着陸。乗り継ぎが心配なお客さんがいます。',lead:'まもなく着陸。客室の最後の確認です。',
   t:[[["Excuse me. I have a connecting flight to Paris.","すみません。パリ行きの乗り継ぎがあるんです","Please follow the signs for flight connections.","乗り継ぎの案内表示に沿って進んでください","","flight connections は空港の「乗り継ぎ」の表示。"],
     ["I only have fifty minutes. Is that okay?","50分しかないんですが、大丈夫ですか","Don't worry. A staff member will meet you at the gate.","ご安心ください。ゲートで係員がお待ちしています","","Don't worry. で安心させてから、具体的に説明します。"],
     ["Oh, thank you so much.","ああ、ありがとうございます","Have a safe trip to Paris.","パリまでお気をつけて","","Have a safe trip. はお見送りの決まり文句です。"]],
    ["Thank you. It was a great flight.","ありがとう。最高のフライトでした"]]}
 }},
 med:{title:'病院の1日',lat:'A DAY AT THE CLINIC',place:'国際外来',arr:['SHIFT COMPLETE','OFF DUTY','外来の勤務、おつかれさまでした'],fno:'CLINIC',you:'医師・看護師',
  lead:'外国人の患者さんが来る外来で、受付から診察、お薬の説明まで。患者さんを安心させながら英語で対応します。',
  plan:[['jd-m-recep','jd-m-hist','jd-m-exam'],['jd-m-allergy','jd-m-lang'],['jd-m-meds']],
  st:{
  'jd-m-recep':{jp:'受付で用件を聞く',lat:'RECEPTION',role:'患者',ini:'患',sit:'朝の外来。英語を話す患者さんが受付にやって来ました。',lead:'',
   t:[[["Hello. I'd like to see a doctor.","こんにちは。お医者さんに診てもらいたいのですが","Of course. Is this your first visit?","わかりました。初めてですか","","first visit =「初診」。最初に必ず聞くことです。"],
     ["Yes, it is.","はい、初めてです","Could you fill out this form, please?","この用紙に記入していただけますか","","fill out =「(用紙に)記入する」。"],
     ["Sure. Do you need my insurance card?","はい。保険証は必要ですか","Yes, and your passport too, please.","はい、パスポートもお願いします","","旅行者は、保険とパスポートを両方確認することが多いです。"]],
    ["Here you are.","はい、どうぞ"]]},
  'jd-m-hist':{jp:'症状を聞く',lat:'SYMPTOMS',role:'患者',ini:'患',sit:'診察室。いつから・どこが・どのくらい痛いのかを聞き取ります。',lead:'名前が呼ばれ、診察室へ。',
   t:[[["","","What brings you in today?","今日はどうされましたか","","医療の現場でよく使う「どうしましたか」。直訳しないのがポイントです。"],
     ["I have a stomachache.","おなかが痛いんです","When did it start?","いつからですか","","いつから → どこが → どのくらい、の順に聞いていきます。"],
     ["Last night, after dinner.","昨日の夜、夕食のあとからです","On a scale of one to ten, how bad is the pain?","1から10で言うと、痛みはどのくらいですか","","痛みを数字で答えてもらう、世界共通の聞き方です。"]],
    ["About a six, I think.","6くらいだと思います"]]},
  'jd-m-exam':{jp:'診察する',lat:'EXAMINATION',role:'患者',ini:'患',sit:'体温を測って、おなかを診察します。声をかけながら進めます。',lead:'問診のあとは診察です。',
   t:[[["What should I do?","どうすればいいですか","Please lie down on the bed.","ベッドに横になってください","","lie down =「横になる」。"],
     ["Like this?","こうですか","Yes. Tell me if it hurts when I press here.","はい。ここを押して痛かったら教えてください","","Tell me if 〜 =「〜なら教えて」。"],
     ["Ow, yes, that hurts.","いたっ、はい、痛いです","Okay. Take a deep breath for me.","わかりました。大きく息を吸ってください","","for me を付けると、やわらかいお願いになります。"]],
    ["Okay.","はい"]]},
  'jd-m-allergy':{jp:'トラブル: 薬のアレルギーが判明',lat:'DRUG ALLERGY',role:'患者',ini:'患',sit:'お薬を出そうとしたとき、患者さんが「前に薬でじんましんが出た」と言い出しました。',trouble:1,lead:'お薬を決めようとしたそのとき…',
   t:[[["Wait. I once got a rash from some medicine.","待って。前に薬でじんましんが出たことがあるんです","Do you remember the name of the medicine?","その薬の名前を覚えていますか","","rash =「発疹・じんましん」。薬の名前を確かめるのが最優先です。"],
     ["I think it was penicillin.","ペニシリンだったと思います","Thank you for telling me. I'll choose a different medicine.","教えてくれてありがとう。別の薬にしますね","","言ってくれたことに感謝すると、患者さんは話しやすくなります。"],
     ["Is that safe?","それは安全ですか","Yes, it's safe for people with a penicillin allergy.","はい、ペニシリンにアレルギーがある人でも安全です","","不安な質問には、Yes ＋ 理由で答えます。"]],
    ["That's a relief.","ほっとしました"]]},
  'jd-m-lang':{jp:'トラブル: 説明がうまく伝わらない',lat:'COMMUNICATION',role:'患者',ini:'患',sit:'検査の説明をしたら、患者さんが不安そうな顔をしています。難しい言葉が多すぎたようです。',trouble:1,lead:'検査について説明していると…',
   t:[[["Sorry, I don't understand. Is it serious?","ごめんなさい、わかりません。重い病気なんですか","Let me explain it more simply.","もっとかんたんに説明しますね","","専門用語を使わず、やさしい言葉に言いかえるのも大事な技術です。"],
     ["Thank you.","ありがとう","We need to take a picture of your stomach. It doesn't hurt.","おなかの写真を撮る必要があります。痛くないですよ","","ultrasound(超音波)のような言葉も、take a picture と言うと伝わります。"],
     ["Okay. How long does it take?","わかりました。どのくらいかかりますか","About ten minutes.","10分くらいです","",""]],
    ["Okay. I feel better now.","わかりました。安心しました"]]},
  'jd-m-meds':{jp:'お薬の説明と帰りのあいさつ',lat:'MEDICATION',role:'患者',ini:'患',sit:'診察の終わり。お薬の飲み方と、また来るべきときを説明します。',lead:'診察が終わりました。最後にお薬の説明です。',
   t:[[["How should I take this medicine?","この薬はどう飲めばいいですか","Take one tablet three times a day, after meals.","1日3回、食後に1錠ずつ飲んでください","","回数 → タイミング、の順に言うと聞きまちがいが減ります。"],
     ["For how many days?","何日間ですか","For five days. Please finish all of it.","5日間です。全部飲みきってください","","finish all of it =「全部飲みきる」。"],
     ["What if it doesn't get better?","よくならなかったらどうしますか","Please come back if you still have pain after three days.","3日たっても痛かったら、また来てください","","come back =「また来る」。困ったときの次の行動まで伝えます。"]],
    ["I will. Thank you, doctor.","そうします。ありがとうございました、先生"]]}
 }},
 it:{title:'ITエンジニアの1日',lat:'A DAY AS AN ENGINEER',place:'グローバルチーム',arr:['SHIFT COMPLETE','OFF DUTY','今日の仕事、おつかれさまでした'],fno:'DEV',you:'ITエンジニア',
  lead:'海外のメンバーがいるチームで、朝会からコードレビュー、仕様の確認まで。仕事で毎日使う英語のやりとりです。',
  plan:[['jd-i-stand','jd-i-review','jd-i-spec'],['jd-i-down','jd-i-late'],['jd-i-wrap']],
  st:{
  'jd-i-stand':{jp:'朝会(スタンドアップ)',lat:'STAND-UP',role:'チームリーダー',ini:'リ',sit:'毎朝15分のオンライン朝会。昨日やったこと・今日やること・困っていることを話します。',lead:'',
   t:[[["Good morning. What did you work on yesterday?","おはよう。昨日は何をしていた？","I finished the login page.","ログイン画面を仕上げました","","朝会は短く。「やったこと」をひとことで言います。"],
     ["Nice. What's your plan for today?","いいね。今日の予定は？","Today I'll start on the search feature.","今日は検索機能に取りかかります","","start on 〜 =「〜に取りかかる」。"],
     ["Any blockers?","何か困っていることは？","Yes. I need access to the test server.","はい。テストサーバーへのアクセス権が必要です","","blocker =「作業を止めている問題」。朝会の決まり文句です。"]],
    ["Okay, I'll get that for you after the meeting.","わかった、会議のあとで用意するよ"]]},
  'jd-i-review':{jp:'コードレビュー',lat:'CODE REVIEW',role:'先輩エンジニア',ini:'先',sit:'あなたが書いたコードに、海外の先輩がコメントをくれました。',lead:'午前中。プルリクエストにコメントがつきました。',
   t:[[["I left a few comments on your pull request.","プルリクエストにいくつかコメントしたよ","Thanks. I'll take a look now.","ありがとうございます。今見ます","","take a look =「見てみる」。"],
     ["This function is a bit long. Could you split it up?","この関数は少し長いね。分けられる？","Good point. I'll split it into two functions.","たしかに。2つの関数に分けます","","Good point. =「いい指摘です」。指摘を前向きに受けとめる一言です。"],
     ["Also, please add a test for the error case.","あと、エラーの場合のテストも追加してね","Sure. I'll push the changes this afternoon.","わかりました。午後に修正を上げます","","いつまでにやるかを言うと、相手が安心します。"]],
    ["Perfect. I'll approve it after that.","完璧。そのあと承認するね"]]},
  'jd-i-spec':{jp:'仕様を確認する',lat:'REQUIREMENTS',role:'プロダクトマネージャー',ini:'P',sit:'新しい機能の仕様があいまいです。プロダクトマネージャーに確認します。',lead:'午後。新しい機能の仕様書を読んでいて、わからない点が…',
   t:[[["Hi. Did you have a question about the spec?","こんにちは。仕様のことで質問があるんだって？","Yes. Should the search include old posts?","はい。検索には古い投稿も含めますか","","Should 〜? で「〜すべきですか」と確認できます。"],
     ["Hmm, only posts from the last year.","うーん、ここ1年の投稿だけで","Got it. And should the results be sorted by date?","わかりました。結果は日付順に並べますか","","Got it. で受けとってから、次の質問へ。"],
     ["Yes, newest first.","うん、新しい順で","Okay. I'll write that down in the ticket.","わかりました。チケットに書いておきます","","口で決めたことは文字に残すのが、海外チームの基本です。"]],
    ["Thanks for checking. That really helps.","確認してくれてありがとう。助かるよ"]]},
  'jd-i-down':{jp:'トラブル: 本番環境でエラー',lat:'INCIDENT',role:'チームリーダー',ini:'リ',sit:'夕方。アプリにログインできないという連絡が次々と届きました！',trouble:1,lead:'夕方。チャットが急に騒がしくなりました…',
   t:[[["Users can't log in! Do you know what happened?","ユーザーがログインできない！何が起きたかわかる？","I think it started after my update an hour ago.","1時間前のわたしの更新のあとから始まったと思います","","まず、わかっている事実を正直に伝えるのがいちばん大事です。"],
     ["Can you roll it back?","元に戻せる？","Yes. I'm rolling it back now.","はい。今戻しています","","roll back =「(更新を)元に戻す」。"],
     ["Okay, people can log in again.","よし、またログインできるようになった","I'm sorry about that. I'll find the cause and add a test.","すみませんでした。原因を調べて、テストを追加します","","謝る → 次に何をするか、までセットで言います。"]],
    ["Thanks for acting so fast. Let's talk about it tomorrow.","すばやく動いてくれてありがとう。明日ふり返ろう"]]},
  'jd-i-late':{jp:'トラブル: 締め切りに間に合わない',lat:'DEADLINE',role:'プロダクトマネージャー',ini:'P',sit:'金曜日の締め切りに、どうしても間に合いそうにありません。早めに伝えます。',trouble:1,lead:'夕方。作業の見積もりを見直していたら…',
   t:[[["","","Do you have a minute? I need to talk about the deadline.","ちょっといいですか。締め切りのことでお話が","","悪い知らせは、早めに・自分から伝えるのが信頼につながります。"],
     ["Sure. What's up?","いいよ。どうしたの？","I don't think I can finish the search feature by Friday.","検索機能を金曜日までに終えられそうにありません","","I don't think I can 〜 =「〜できそうにない」。やわらかく伝えられます。"],
     ["I see. How much more time do you need?","なるほど。あとどのくらい必要？","Two more days. Or I can finish a simpler version by Friday.","あと2日です。もしくは、かんたんな版なら金曜日に終えられます","","問題を伝えるときは、選べる案も一緒に出すと話が進みます。"]],
    ["Let's do the simpler version first. Thanks for telling me early.","まずはかんたんな版でいこう。早めに言ってくれてありがとう"]]},
  'jd-i-wrap':{jp:'1日の終わりの引き継ぎ',lat:'HANDOFF',role:'海外のエンジニア',ini:'海',sit:'日本の夕方は、アメリカのチームの朝。今日の作業を引き継ぎます。',lead:'1日の終わり。アメリカのチームが仕事を始める時間です。',
   t:[[["Morning! Anything I should know?","おはよう！知っておくべきことはある？","Yes. I finished the code review changes today.","はい。今日はレビューの修正を終えました","","時差のあるチームでは、1日の終わりに状況をまとめて渡します。"],
     ["Great. Is there anything I can help with?","いいね。何か手伝えることはある？","Could you check the test results tonight?","今夜、テストの結果を確認してもらえますか","","tonight は相手にとっての「今日の仕事中」。時差の言い方に注意。"],
     ["Sure. I'll send you a message if anything fails.","了解。何か失敗したらメッセージを送るよ","Thanks. Have a good day!","ありがとう。よい1日を！","","相手は朝なので Have a good day!(よい1日を)で締めます。"]],
    ["You too. Good night!","そちらもね。おやすみ！"]]}
 }}
};
/* register every stage as a scene unit (English only), and in RT_META so the route screen can list it */
Object.keys(JD).forEach(function(job){
  var st=JD[job].st;
  Object.keys(st).forEach(function(id){
    var s=st[id];
    RT_META[id]={jp:s.jp,lat:s.lat,role:s.role,ini:s.ini,sit:s.sit,trouble:s.trouble?1:0};
    if(s.lead)RT_LEAD[id]=s.lead;
    SCENE_META[id]={jp:s.jp,lat:s.lat,role:s.role,ini:s.ini,sit:s.sit,grp:'route'};UM[id]={jp:s.jp,lat:s.lat};
    if(UNITS.en)UNITS.en[id]={id:id,items:[],turns:s.t[0].map(function(t){return {p:t[0],pj:t[1],a:t[2],aj:t[3],r:t[4]||'',n:t[5]||''};}),end:s.t[1],track:'scene',kind:'scene',route:1};
  });
});
var JD_REC='babelflight.jobdays';
function jdOn(){return save.lang==='en'&&!!JD[save.prof]&&!!UNITS.en&&(typeof UI==='undefined'||UI==='ja');}
function jdRec(){try{return JSON.parse(lsGet(JD_REC)||'{}')||{};}catch(e){return {};}}
/* the usual stages, then one of the two troubles (at random), then the end of the day */
function jdPlan(job){var p=JD[job].plan;return p[0].concat([p[1][Math.random()<0.5?0:1]],p[2]);}
function jdStart(){
  if(!jdOn())return;
  closeSheet();
  RTX={L:'en',job:save.prof,stages:jdPlan(save.prof),i:0,mode:(lsGet('babelflight.rtMode')==='type'?'type':'call'),res:[],step:'intro',t0:Date.now()};
  view='route';render();window.scrollTo(0,0);
}
function jdHTML(){
  var R=RTX,J=JD[R.job],id=R.stages[R.i],m=RT_META[id];
  var h='<div class="rt jd"><div class="fl-top"><button class="x" type="button" data-rt-quit aria-label="やめる">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">'+J.lat+'</span><b>'+esc(J.title)+'</b></div></div>';
  h+='<section class="rt-pass jd-pass" aria-label="今日の勤務"><div class="rt-pass-h"><span class="lbl">DUTY ・ '+esc(J.fno)+'</span><span class="mono">ENGLISH</span></div>'+
    '<div class="jd-who"><b>'+esc(J.you)+'</b><small>'+esc(J.place)+'</small></div>'+
    '<div class="rt-pass-f"><span>'+R.stages.length+'つの場面</span><span>トラブル 1つ</span><span>'+(R.mode==='call'?'通話モード':'入力モード')+'</span></div></section>';
  if(R.step==='intro'){
    h+='<p class="dim rt-lead">'+esc(J.lead)+'</p><p class="rt-warn">⚠️ 1日のどこかで<b>トラブル</b>が起きます。何が起きるかは毎回ちがいます。</p>'+
      '<ol class="rt-list">'+R.stages.map(rtStageRow).join('')+'</ol>'+
      '<div class="set-block"><span class="lbl">話し方</span>'+seg('data-rt-mode',R.mode,[['call','📞 通話モード(声に出す)'],['type','⌨️ 入力モード(文字で答える)']])+'</div>'+
      '<button class="go" type="button" data-rt-next>勤務を始める<small>約'+Math.round(R.stages.length*2.5)+'分 ・ 途中でやめても大丈夫</small></button>';
  }else{
    var lead=RT_LEAD[id]||'';
    h+=(m.trouble?'<div class="rt-alert" role="status"><b>⚠️ トラブル発生！</b><span>'+esc(m.jp.replace(/^トラブル: /,''))+'</span></div>':'')+
      (lead?'<p class="rt-lead2">'+esc(lead)+'</p>':'')+'<ol class="rt-list">'+R.stages.map(rtStageRow).join('')+'</ol>'+
      '<button class="go" type="button" data-rt-next>'+(m.trouble?'なんとかする':'次へ進む')+'<small>'+(m.trouble?'':esc(m.jp)+' ・ ')+esc(m.role)+'と話す</small></button>';
  }
  return h+'</div>';
}
function jdDone(){
  var R=RTX,J=JD[R.job],ans=0,corr=0,pts=0,max=0,wrong=[];
  R.res.forEach(function(r){ans+=r.n;corr+=r.ok;pts+=r.pts;max+=r.max;r.wrong.forEach(function(w){if(wrong.length<4)wrong.push(w);});});
  var ratio=max?pts/max:0,stars=ratio>=0.9?3:ratio>=0.6?2:1;
  var o=jdRec();o[R.job]=o[R.job]||{n:0,best:0};o[R.job].n++;o[R.job].best=Math.max(o[R.job].best,stars);o[R.job].last=dayStr();lsSet(JD_REC,JSON.stringify(o));
  var grade=[stars===3?'おつかれさまでした！完璧な1日':stars===2?'おつかれさまでした！いい1日':'おつかれさまでした',J.lat+' ・ COMPLETE',
    R.stages.length+'つの場面を英語で乗りきりました(トラブル1つ)。'+(stars===3?'本物の現場でも通用しそう！':'△や✕のところを、もう一度言ってみよう。')];
  var last=R.stages[R.stages.length-1];RTX=null;
  completeLesson({L:'en',uid:last,mode:'jobday',landNo:J.arr[0],city:[J.arr[1],J.arr[2],0,0],stars:stars,answered:ans,corr:corr,corrLabel:'◎',grade:grade,wrong:wrong,wrongTitle:'もう一度言いたいフレーズ',wrongNote:'本番の仕事の前に'});
}
/* the home card in 職業モード */
function jdHomeHTML(){
  if(save.mode!=='job'||!jdOn())return '';
  var J=JD[save.prof],r=jdRec()[save.prof];
  return '<section class="card jd-home"><div class="card-h"><span class="lbl">'+J.lat+'</span>'+(r&&r.n?'<span class="lbl">'+r.n+'回 ・ 最高 '+'★★★'.slice(0,r.best)+'</span>':'<span class="lbl">NEW</span>')+'</div>'+
    '<h2 class="jh">'+esc(J.title)+'を体験</h2><p class="dim">'+esc(J.lead)+'</p>'+
    '<button class="go" type="button" data-jd-open>勤務を始める<small>約'+Math.round(jdPlan(save.prof).length*2.5)+'分 ・ トラブルが1つ起きます</small></button></section>';
}
if(typeof MODE_TITLE==='object')MODE_TITLE.jobday='職業の1日';
(function(){
  var rh=routeHTML;
  routeHTML=function(){return RTX&&RTX.job?jdHTML():rh.apply(this,arguments);};
  var rd=rtDone;
  rtDone=function(){return RTX&&RTX.job?jdDone():rd.apply(this,arguments);};
  var hh=homeHTML;
  homeHTML=function(){
    var h=hh.apply(this,arguments),add=jdHomeHTML();if(!add)return h;
    /* the day card goes under the FIRST CLASS LOUNGE card, so the map above it keeps its place and height */
    var fc=h.indexOf('class="card fcl"');
    if(fc>=0){var fe=h.indexOf('</section>',fc);if(fe>=0)return h.slice(0,fe+10)+add+h.slice(fe+10);}
    var i=h.indexOf('</header>');return i>=0?h.slice(0,i+9)+add+h.slice(i+9):add+h;
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-jd-open')){jdStart();}
});
