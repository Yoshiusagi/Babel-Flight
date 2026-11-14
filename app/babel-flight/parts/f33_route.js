/* ================= リアル路線シミュレーション (ファースト, standalone site) =================
   One real route flown from start to finish, scene after scene, on the scene engine (e9_scene.js, 通話モード or
   入力モード): 機内 (飲み物 → 機内食 → 通路を通してもらう) → 入国審査 → タクシー → ホテル → 次の朝の朝ごはん.
   Each flight picks one or two troubles at random (スーツケースが出てこない / タクシーでカードが使えない /
   予約が見つからない), so no two flights are the same; they are not shown before they happen.
   Courses: 英語 (HND → JFK), 韓国語 (HND → ICN), スペイン語 (HND → MAD), イタリア語 (HND → FCO); 日本語 display only.
   The stages are scene units registered here (UNITS[L]['rt-…'], kind 'scene'), after e3e_reg.js, so they are not in
   ALL_IDS and never show on the map. The whole flight counts as one lesson at the end (completeLesson, mode 'route'). */

var RT_META={
 'rt-drink':{jp:'機内: 飲み物を頼む',lat:'IN-FLIGHT DRINKS',role:'客室乗務員',ini:'乗',sit:'離陸して、シートベルトのサインが消えました。客室乗務員が飲み物を配りに来た。'},
 'rt-meal':{jp:'機内: 機内食を選ぶ',lat:'MEAL SERVICE',role:'客室乗務員',ini:'乗',sit:'機内食の時間。2つのメニューから選んで、食後の飲み物も頼もう。'},
 'rt-aisle':{jp:'機内: 通路を通してもらう',lat:'EXCUSE ME',role:'隣の席の人',ini:'隣',sit:'窓側の席。トイレに行きたいけど、通路側の人がくつろいでいる。声をかけて通してもらおう。'},
 'rt-imm':{jp:'入国審査',lat:'IMMIGRATION',role:'入国審査官',ini:'審',sit:'着陸しました。入国審査のカウンターで、審査官の質問に答えよう。'},
 'rt-bag':{jp:'トラブル: スーツケースが出てこない',lat:'LOST BAGGAGE',role:'手荷物カウンターの係員',ini:'係',sit:'ターンテーブルでずっと待っても、自分のスーツケースが出てこない！手荷物カウンターで伝えよう。',trouble:1},
 'rt-taxi':{jp:'タクシーでホテルへ',lat:'TAXI',role:'タクシーの運転手',ini:'運',sit:'空港のタクシー乗り場。行き先を伝えて、料金と払い方を確かめよう。'},
 'rt-taxicard':{jp:'トラブル: タクシーでカードが使えない',lat:'CARD DECLINED',role:'タクシーの運転手',ini:'運',sit:'ホテルに着いて料金を払おうとしたら、カードが通らない！',trouble:1},
 'rt-hotel':{jp:'ホテルにチェックイン',lat:'HOTEL CHECK-IN',role:'ホテルのフロント',ini:'受',sit:'ホテルに到着。フロントでチェックインして、朝ごはんを食べる場所も聞いておこう。'},
 'rt-noresv':{jp:'トラブル: 予約が見つからない',lat:'NO RESERVATION',role:'ホテルのフロント',ini:'受',sit:'フロントで名前を伝えたら、予約が見つからないと言われた！',trouble:1},
 'rt-bfast':{jp:'次の朝: 朝ごはんを買う',lat:'BREAKFAST',role:'お店の人',ini:'店',sit:'次の朝。おなかがすいた。近くのお店で、その街らしい朝ごはんを買おう。'}
};
/* how the trip goes on before each stage */
var RT_LEAD={'rt-meal':'しばらくして、機内食のワゴンがやって来ました。','rt-aisle':'食事のあと。ちょっとトイレに行きたくなった…',
  'rt-imm':'まもなく着陸します。シートベルトをしっかり締めて…','rt-bag':'入国審査を通過。手荷物受取所へ向かいます。',
  'rt-taxi':'荷物を持って到着ロビーへ。タクシー乗り場に向かいます。','rt-taxicard':'タクシーは街の中へ。窓の外に、はじめての景色。',
  'rt-hotel':'ホテルに到着しました。フロントへ。','rt-noresv':'ホテルに到着しました。フロントへ。','rt-bfast':'ぐっすり眠って、次の朝。'};

/* [code, city, airline-style flight number, the language's stages: id → [turns, end]]
   turn: [partner line, its Japanese, your answer, its Japanese, reading, note]; an empty partner line = you speak first */
var RT_ROUTES={
 en:{code:'JFK',city:'ニューヨーク',cityEn:'NEW YORK',fno:'BF 001',hrs:'約13時間',st:{
  'rt-drink':[[["Would you like something to drink?","何かお飲み物はいかがですか","Could I have an orange juice, please?","オレンジジュースをいただけますか","","Could I have 〜, please? は、機内でいちばん使える頼み方です。"],
    ["Sure. Would you like ice with that?","かしこまりました。氷はお入れしますか","No ice, please.","氷なしでお願いします","",""],
    ["Here you go. Anything else?","どうぞ。ほかに何かありますか","Could I also have some water?","お水もいただけますか","","also を入れると「〜も」の意味になります。"]],
   ["Of course. I'll bring it right away.","もちろんです。すぐにお持ちします"]],
  'rt-meal':[[["Would you like chicken or beef?","チキンとビーフ、どちらになさいますか","Chicken, please.","チキンでお願いします","","機内食の定番の質問。料理名 ＋ please だけで通じます。"],
    ["Here you are. Coffee or tea?","どうぞ。コーヒーと紅茶はどちらにしますか","Tea, please.","紅茶をお願いします","",""],
    ["Is everything okay with your meal?","お食事はいかがですか","Yes, it's delicious. Thank you.","はい、おいしいです。ありがとう","",""]],
   ["Glad to hear that. Enjoy your meal.","よかったです。ごゆっくりどうぞ"]],
  'rt-aisle':[[["","","Excuse me. Sorry to bother you.","すみません。お邪魔してごめんなさい","","くつろいでいる人に声をかける時は、まず Excuse me。"],
    ["Oh, yes?","あ、はい？","Could I get by, please?","通してもらえますか","","get by =「横を通る」。機内や電車でよく使います。"],
    ["Sure, go ahead.","どうぞ","Thank you. I'll be right back.","ありがとう。すぐ戻ります","",""]],
   ["No problem.","いいですよ"]],
  'rt-imm':[[["Hello. Passport, please.","こんにちは。パスポートを","Here you are.","はい、どうぞ","","物を渡す時の決まり文句です。"],
    ["What's the purpose of your trip?","旅行の目的は何ですか","Sightseeing. I'm on vacation.","観光です。休暇で来ました","","「Sightseeing.」の一言でも通じます。"],
    ["How long are you staying?","どのくらい滞在しますか","Five days.","5日間です","","「For five days.」でもOK。"],
    ["Where will you be staying?","どこに泊まりますか","At the Park Hotel in Manhattan.","マンハッタンのパークホテルです","",""]],
   ["Okay. Welcome to the United States.","けっこうです。アメリカへようこそ"]],
  'rt-bag':[[["Hi. How can I help you?","こんにちは。どうしましたか","My suitcase didn't come out.","スーツケースが出てきませんでした","","didn't come out =「出てこなかった」。"],
    ["I'm sorry. Do you have your baggage claim tag?","申し訳ありません。手荷物の引換証はありますか","Yes, here it is.","はい、これです","","claim tag は、預けた時にもらうシールの控えのこと。"],
    ["What does your bag look like?","どんなバッグですか","It's a large black suitcase.","大きな黒いスーツケースです","","大きさ → 色 → 物 の順に並べます。"],
    ["We'll deliver it to your hotel. Where are you staying?","ホテルにお届けします。どちらにお泊まりですか","At the Park Hotel in Manhattan.","マンハッタンのパークホテルです","",""]],
   ["Got it. We'll call you as soon as we find it.","承知しました。見つかったらすぐにお電話します"]],
  'rt-taxi':[[["Hi. Where to?","どちらまで？","To the Park Hotel in Manhattan, please.","マンハッタンのパークホテルまでお願いします","","To ＋ 行き先 ＋ please が基本の形です。"],
    ["Sure. It'll take about forty minutes.","はい。40分くらいかかります","About how much will it be?","だいたいいくらになりますか","","About を最初に置くと「だいたい」の意味になります。"],
    ["Around seventy dollars, plus tolls.","70ドルくらいと、有料道路の料金です","Okay. Can I pay by card?","わかりました。カードで払えますか","",""]],
   ["Yes, card is fine. Let's go.","カードで大丈夫ですよ。行きましょう"]],
  'rt-taxicard':[[["Here we are. That's seventy-two dollars.","着きました。72ドルです","Here's my card.","カードでお願いします","",""],
    ["Sorry, your card was declined.","すみません、カードが通りませんでした","Could you try it one more time?","もう一度試してもらえますか","","declined =「(カードが)使えなかった」。"],
    ["It still doesn't work.","やっぱりだめですね","Then I'll pay in cash.","じゃあ現金で払います","","in cash =「現金で」。旅行中は少し現金も持っておくと安心です。"]],
   ["Thanks. Have a good stay.","どうも。よい滞在を"]],
  'rt-hotel':[[["Good evening. Checking in?","こんばんは。チェックインですか","Yes. I have a reservation under Sato.","はい。佐藤で予約しています","","under ＋ 名前 =「〜の名前で」。"],
    ["Thank you. May I see your passport?","ありがとうございます。パスポートを拝見できますか","Sure. Here you are.","はい、どうぞ","",""],
    ["You're in room 1208. Breakfast isn't included.","お部屋は1208号室です。朝食は含まれていません","Is there a good place for breakfast nearby?","近くに朝ごはんを食べるいい所はありますか","",""]],
   ["There's a great deli across the street.","通りの向かいにいいデリがありますよ"]],
  'rt-noresv':[[["Good evening. Checking in?","こんばんは。チェックインですか","Yes. I have a reservation under Sato.","はい。佐藤で予約しています","",""],
    ["Hmm, I'm sorry. I can't find your reservation.","申し訳ありません。ご予約が見つかりません","Here's my confirmation email.","これが予約確認のメールです","","confirmation =「確認」。予約の画面を見せると早いです。"],
    ["Oh, I see. It's booked for tomorrow.","ああ、明日の日付で予約されていますね","Do you have a room for tonight?","今夜泊まれる部屋はありますか","",""],
    ["Yes, we have one room left.","はい、一部屋だけ空いています","Great. I'll take it.","よかった。その部屋にします","","I'll take it =「それにします」。買い物でも使えます。"]],
   ["Here's your key. Sorry for the trouble.","こちらが鍵です。ご迷惑をおかけしました"]],
  'rt-bfast':[[["Morning! What can I get you?","おはよう！何にする？","A bagel with cream cheese, please.","クリームチーズのベーグルをください","","ニューヨークの朝の定番です。"],
    ["Toasted?","トーストする？","Yes, please.","はい、お願いします","",""],
    ["Anything to drink?","飲み物は？","A small coffee, please.","コーヒーのSサイズをください","",""],
    ["For here or to go?","店内で？持ち帰り？","To go, please.","持ち帰りでお願いします","","アメリカでは to go、イギリスでは take away と言います。"]],
   ["That's eight fifty. Have a great day!","8ドル50セントです。いい一日を！"]]
 }},
 ko:{code:'ICN',city:'ソウル',cityEn:'SEOUL',fno:'BF 171',hrs:'約2時間30分',st:{
  'rt-drink':[[["음료 드시겠어요?","何かお飲み物は？","오렌지 주스 주세요.","オレンジジュースをください","オレンジ ジュス ジュセヨ","〜 주세요(ジュセヨ)=「〜ください」。いちばん使える形です。"],
    ["얼음 넣어 드릴까요?","氷はお入れしますか","아니요, 얼음은 빼 주세요.","いいえ、氷なしでお願いします","アニヨ、オルムン ッペ ジュセヨ","빼 주세요 =「抜いてください」。"],
    ["더 필요하신 거 있으세요?","ほかに必要なものはありますか","물도 한 잔 주세요.","お水も1杯ください","ムルド ハン ジャン ジュセヨ","도 =「〜も」。"]],
   ["네, 바로 가져다 드릴게요.","はい、すぐにお持ちします"]],
  'rt-meal':[[["비빔밥하고 치킨 중에 어떤 걸로 드릴까요?","ビビンバとチキン、どちらにしますか","비빔밥으로 주세요.","ビビンバでお願いします","ピビンパブロ ジュセヨ","〜(으)로 주세요 =「〜でお願いします」。選ぶ時の形です。"],
    ["커피나 차 드릴까요?","コーヒーかお茶はいかがですか","녹차 주세요.","緑茶をください","ノクチャ ジュセヨ",""],
    ["식사는 괜찮으세요?","お食事はいかがですか","네, 정말 맛있어요. 감사합니다.","はい、とてもおいしいです。ありがとう","ネ、チョンマル マシッソヨ。カムサハムニダ",""]],
   ["맛있게 드세요.","どうぞ召し上がってください"]],
  'rt-aisle':[[["","","저기요, 죄송한데요.","あの、すみません","チョギヨ、チェソンハンデヨ","저기요 は、人に声をかける時の「あの」。"],
    ["네?","はい？","잠깐 지나가도 될까요?","ちょっと通ってもいいですか","チャムッカン チナガド テルッカヨ","〜아도 될까요? =「〜してもいいですか」。"],
    ["아, 네. 지나가세요.","あ、はい。どうぞ","감사합니다. 금방 올게요.","ありがとう。すぐ戻ります","カムサハムニダ。クムバン オルケヨ",""]],
   ["네, 괜찮아요.","はい、大丈夫ですよ"]],
  'rt-imm':[[["안녕하세요. 여권 보여 주세요.","こんにちは。パスポートを見せてください","네, 여기 있어요.","はい、どうぞ","ネ、ヨギ イッソヨ","여기 있어요 =「ここにあります」=「どうぞ」。"],
    ["방문 목적이 뭐예요?","訪問の目的は何ですか","관광하러 왔어요.","観光で来ました","クァングァンハロ ワッソヨ","〜하러 왔어요 =「〜しに来ました」。"],
    ["얼마나 머무르실 거예요?","どのくらい滞在しますか","사박 오일이요.","4泊5日です","サバク オイリヨ","韓国語も日本語と同じように「〜泊〜日」で言います。"],
    ["어디에서 지내세요?","どこに泊まりますか","명동에 있는 호텔이요.","明洞にあるホテルです","ミョンドンエ インヌン ホテリヨ",""]],
   ["네, 즐거운 여행 되세요.","はい、楽しいご旅行を"]],
  'rt-bag':[[["무슨 일이세요?","どうしましたか","제 가방이 안 나왔어요.","私のかばんが出てきませんでした","チェ カバンイ アン ナワッソヨ","안 ＋ 動詞 =「〜しない・〜しなかった」。"],
    ["죄송합니다. 수하물 표 있으세요?","申し訳ありません。手荷物の引換証はありますか","네, 여기 있어요.","はい、これです","ネ、ヨギ イッソヨ","수하물 =「手荷物」。"],
    ["가방이 어떻게 생겼어요?","どんなかばんですか","큰 검은색 캐리어예요.","大きな黒いスーツケースです","クン コムンセク ケリオエヨ","スーツケースは、韓国では 캐리어(キャリア)と言うことが多いです。"],
    ["호텔로 보내 드릴게요. 어느 호텔이세요?","ホテルにお送りします。どのホテルですか","명동 파크 호텔이에요.","明洞パークホテルです","ミョンドン パク ホテリエヨ",""]],
   ["찾으면 바로 연락드릴게요.","見つかったらすぐにご連絡します"]],
  'rt-taxi':[[["어디로 가세요?","どちらまで？","명동 파크 호텔로 가 주세요.","明洞パークホテルまでお願いします","ミョンドン パク ホテルロ カ ジュセヨ","〜(으)로 가 주세요 =「〜まで行ってください」。"],
    ["네. 한 시간쯤 걸려요.","はい。1時間くらいかかります","요금은 얼마쯤 나와요?","料金はいくらくらいですか","ヨグムン オルマッチュム ナワヨ","쯤 =「〜くらい」。"],
    ["육만 원쯤이요.","6万ウォンくらいです","카드로 계산해도 돼요?","カードで払ってもいいですか","カドゥロ ケサネド テヨ",""]],
   ["네, 카드 돼요. 출발할게요.","はい、カード大丈夫です。出発します"]],
  'rt-taxicard':[[["도착했습니다. 육만 이천 원이요.","着きました。6万2千ウォンです","카드로 할게요.","カードでお願いします","カドゥロ ハルケヨ",""],
    ["죄송한데 카드가 안 되네요.","すみません、カードが通りません","한 번만 다시 해 주시겠어요?","もう一度だけやってもらえますか","ハン ボンマン タシ ヘ ジュシゲッソヨ","〜해 주시겠어요? は「〜してもらえますか」のていねいな形。"],
    ["그래도 안 돼요.","それでもだめです","그럼 현금으로 낼게요.","じゃあ現金で払います","クロム ヒョングムロ ネルケヨ","현금 =「現金」。"]],
   ["감사합니다. 좋은 여행 되세요.","ありがとうございます。よい旅を"]],
  'rt-hotel':[[["어서 오세요. 체크인하시겠어요?","いらっしゃいませ。チェックインなさいますか","네, 사토 이름으로 예약했어요.","はい、佐藤の名前で予約しました","ネ、サト イルムロ イェヤケッソヨ","〜 이름으로 =「〜の名前で」。"],
    ["여권 좀 보여 주시겠어요?","パスポートを見せていただけますか","네, 여기요.","はい、どうぞ","ネ、ヨギヨ",""],
    ["1208호입니다. 조식은 포함이 안 돼 있어요.","1208号室です。朝食は含まれていません","근처에 아침 먹을 데가 있어요?","近くに朝ごはんを食べる所はありますか","クンチョエ アチム モグル テガ イッソヨ",""]],
   ["앞에 김밥집이 있어요.","前にキンパのお店がありますよ"]],
  'rt-noresv':[[["어서 오세요. 체크인하시겠어요?","いらっしゃいませ。チェックインなさいますか","네, 사토 이름으로 예약했어요.","はい、佐藤の名前で予約しました","ネ、サト イルムロ イェヤケッソヨ",""],
    ["죄송합니다. 예약이 확인이 안 되는데요.","申し訳ありません。予約が確認できないのですが","예약 확인 메일 여기 있어요.","予約確認のメールはこれです","イェヤク ファギン メイル ヨギ イッソヨ","画面を見せながら言うと早いです。"],
    ["아, 내일 날짜로 예약돼 있네요.","あ、明日の日付で予約されていますね","오늘 밤 묵을 방이 있어요?","今夜泊まれる部屋はありますか","オヌル パム ムグル パンイ イッソヨ",""],
    ["네, 방이 하나 남아 있어요.","はい、一部屋残っています","다행이다. 그 방으로 할게요.","よかった。その部屋にします","タヘンイダ。ク パンウロ ハルケヨ","〜(으)로 할게요 =「〜にします」。"]],
   ["여기 키 있습니다. 불편을 드려 죄송합니다.","こちらが鍵です。ご不便をおかけしました"]],
  'rt-bfast':[[["어서 오세요. 뭐 드릴까요?","いらっしゃい。何にしますか","참치김밥 한 줄 주세요.","ツナキンパを1本ください","チャムチキムパプ ハン ジュル ジュセヨ","キンパは1本を 한 줄(ハン ジュル)と数えます。"],
    ["드시고 가세요?","召し上がっていきますか","아니요, 포장해 주세요.","いいえ、持ち帰りでお願いします","アニヨ、ポジャンヘ ジュセヨ","포장 =「包装」=持ち帰り。"],
    ["음료는요?","飲み物は？","바나나 우유도 하나 주세요.","バナナ牛乳もひとつください","バナナ ウユド ハナ ジュセヨ",""]],
   ["칠천 원입니다. 좋은 하루 되세요.","7,000ウォンです。よい一日を"]]
 }},
 es:{code:'MAD',city:'マドリード',cityEn:'MADRID',fno:'BF 401',hrs:'約15時間',st:{
  'rt-drink':[[["¿Desea algo de beber?","何かお飲み物はいかがですか","Un zumo de naranja, por favor.","オレンジジュースをお願いします","","スペインでは「ジュース」は zumo。中南米では jugo と言います。"],
    ["¿Con hielo?","氷は入れますか","Sin hielo, por favor.","氷なしでお願いします","","con =「〜あり」、sin =「〜なし」。"],
    ["Aquí tiene. ¿Algo más?","どうぞ。ほかには？","¿Me trae también un poco de agua?","お水も少し持ってきてもらえますか","","¿Me trae 〜? =「〜を持ってきてもらえますか」。"]],
   ["Claro, ahora mismo se la traigo.","もちろん、すぐにお持ちします"]],
  'rt-meal':[[["¿Pollo o pasta?","チキンとパスタ、どちらにしますか","Pollo, por favor.","チキンでお願いします","",""],
    ["¿Café o té?","コーヒーか紅茶はいかがですか","Un té, por favor.","紅茶をお願いします","",""],
    ["¿Qué tal la comida?","お食事はいかがですか","Está muy rica, gracias.","とてもおいしいです、ありがとう","","rico / rica は、食べ物の「おいしい」によく使います。"]],
   ["Me alegro. ¡Que aproveche!","よかったです。どうぞ召し上がれ"]],
  'rt-aisle':[[["","","Perdone, disculpe la molestia.","すみません、お邪魔してごめんなさい","","知らない人には perdone(ていねいな言い方)を使います。"],
    ["¿Sí?","はい？","¿Me deja pasar, por favor?","通してもらえますか","","¿Me deja pasar? =「通らせてもらえますか」。"],
    ["Claro, pase.","どうぞ、通ってください","Gracias. Vuelvo enseguida.","ありがとう。すぐ戻ります","",""]],
   ["No pasa nada.","大丈夫ですよ"]],
  'rt-imm':[[["Buenos días. Su pasaporte, por favor.","おはようございます。パスポートをお願いします","Aquí tiene.","はい、どうぞ","","物を渡す時の決まり文句です。"],
    ["¿Cuál es el motivo de su viaje?","旅行の目的は何ですか","Turismo. Estoy de vacaciones.","観光です。休暇中です","","「Turismo.」の一言でも通じます。"],
    ["¿Cuánto tiempo va a estar en España?","スペインにどのくらいいますか","Una semana.","1週間です","",""],
    ["¿Dónde se va a alojar?","どこに泊まりますか","En un hotel en el centro de Madrid.","マドリードの中心にあるホテルです","",""]],
   ["Muy bien. Bienvenido a España.","けっこうです。スペインへようこそ"]],
  'rt-bag':[[["Buenas. ¿En qué le puedo ayudar?","こんにちは。どうしましたか","Mi maleta no ha salido.","私のスーツケースが出てきません","","maleta =「スーツケース」。"],
    ["Lo siento. ¿Tiene el resguardo del equipaje?","申し訳ありません。手荷物の引換証はありますか","Sí, aquí lo tiene.","はい、これです","",""],
    ["¿Cómo es su maleta?","どんなスーツケースですか","Es una maleta grande y negra.","大きくて黒いスーツケースです","","形容詞は名詞のあとに置きます(maleta grande y negra)。"],
    ["Se la enviamos al hotel. ¿Dónde se aloja?","ホテルにお送りします。どちらにお泊まりですか","En el Hotel Parque, en el centro.","中心部のホテル・パルケです","",""]],
   ["Perfecto. Le llamaremos en cuanto la encontremos.","わかりました。見つかり次第お電話します"]],
  'rt-taxi':[[["Buenas tardes. ¿Adónde vamos?","こんにちは。どちらまで？","Al Hotel Parque, en el centro, por favor.","中心部のホテル・パルケまでお願いします","","al = a ＋ el(「〜へ」)。"],
    ["Muy bien. Son unos treinta minutos.","はい。30分くらいです","¿Cuánto cuesta más o menos?","だいたいいくらですか","","más o menos =「だいたい」。"],
    ["Unos treinta euros.","30ユーロくらいです","Vale. ¿Puedo pagar con tarjeta?","わかりました。カードで払えますか","","vale はスペインでよく使う「OK」。"]],
   ["Sí, sin problema. Vamos.","はい、問題ありません。行きましょう"]],
  'rt-taxicard':[[["Ya hemos llegado. Son treinta euros.","着きました。30ユーロです","Con tarjeta, por favor.","カードでお願いします","",""],
    ["Lo siento, la tarjeta no pasa.","すみません、カードが通りません","¿Puede intentarlo otra vez?","もう一度試してもらえますか","","otra vez =「もう一度」。"],
    ["Sigue sin funcionar.","やっぱりだめです","Entonces pago en efectivo.","じゃあ現金で払います","","en efectivo =「現金で」。"]],
   ["Gracias. ¡Buena estancia!","ありがとう。よい滞在を"]],
  'rt-hotel':[[["Buenas noches. ¿Viene a hacer el check-in?","こんばんは。チェックインですか","Sí, tengo una reserva a nombre de Sato.","はい、佐藤の名前で予約しています","","a nombre de 〜 =「〜の名前で」。"],
    ["¿Me deja su pasaporte, por favor?","パスポートをお願いできますか","Sí, aquí tiene.","はい、どうぞ","",""],
    ["Su habitación es la 512. El desayuno no está incluido.","お部屋は512号室です。朝食は含まれていません","¿Hay algún sitio para desayunar cerca?","近くに朝ごはんを食べる所はありますか","",""]],
   ["Sí, hay una cafetería muy buena en la esquina.","はい、角にとてもいいカフェがありますよ"]],
  'rt-noresv':[[["Buenas noches. ¿Viene a hacer el check-in?","こんばんは。チェックインですか","Sí, tengo una reserva a nombre de Sato.","はい、佐藤の名前で予約しています","",""],
    ["Lo siento, no encuentro su reserva.","申し訳ありません、ご予約が見つかりません","Aquí tengo el correo de confirmación.","確認のメールがここにあります","","correo =「メール」。"],
    ["Ah, ya veo. La reserva es para mañana.","ああ、予約は明日になっていますね","¿Tienen alguna habitación para esta noche?","今夜泊まれる部屋はありますか","",""],
    ["Sí, nos queda una.","はい、一部屋残っています","Genial. Me la quedo.","よかった。その部屋にします","","Me la quedo =「それにします」。"]],
   ["Aquí tiene la llave. Perdone las molestias.","こちらが鍵です。ご迷惑をおかけしました"]],
  'rt-bfast':[[["Buenos días. ¿Qué le pongo?","おはようございます。何にしますか","Un café con leche y una tostada con tomate, por favor.","カフェ・コン・レチェと、トマトのトーストをお願いします","","スペインの朝ごはんの定番。¿Qué le pongo? はバルの「何にしますか」。"],
    ["¿Para tomar aquí o para llevar?","ここで？持ち帰り？","Para tomar aquí.","ここで食べます","",""],
    ["Son cuatro euros.","4ユーロです","Aquí tiene. Gracias.","はい、どうぞ。ありがとう","",""]],
   ["A usted. ¡Que tenga un buen día!","こちらこそ。よい一日を"]]
 }},
 it:{code:'FCO',city:'ローマ',cityEn:'ROME',fno:'BF 411',hrs:'約15時間',st:{
  'rt-drink':[[["Desidera qualcosa da bere?","何かお飲み物はいかがですか","Un succo d'arancia, per favore.","オレンジジュースをお願いします","",""],
    ["Con ghiaccio?","氷は入れますか","Senza ghiaccio, grazie.","氷なしで、ありがとう","","con =「〜あり」、senza =「〜なし」。"],
    ["Ecco a lei. Qualcos'altro?","どうぞ。ほかには？","Potrei avere anche un po' d'acqua?","お水も少しいただけますか","","Potrei avere 〜? =「〜をいただけますか」。"]],
   ["Certo, gliela porto subito.","もちろん、すぐにお持ちします"]],
  'rt-meal':[[["Pollo o pasta?","チキンとパスタ、どちらにしますか","Pasta, per favore.","パスタでお願いします","",""],
    ["Caffè o tè?","コーヒーか紅茶はいかがですか","Un tè, per favore.","紅茶をお願いします","",""],
    ["Com'è il pasto?","お食事はいかがですか","È molto buono, grazie.","とてもおいしいです、ありがとう","",""]],
   ["Mi fa piacere. Buon appetito!","よかったです。どうぞ召し上がれ"]],
  'rt-aisle':[[["","","Mi scusi, scusi il disturbo.","すみません、お邪魔してごめんなさい","","知らない人には Mi scusi(ていねいな言い方)を使います。"],
    ["Sì?","はい？","Posso passare, per favore?","通ってもいいですか","","Posso 〜? =「〜してもいいですか」。"],
    ["Certo, prego.","もちろん、どうぞ","Grazie. Torno subito.","ありがとう。すぐ戻ります","",""]],
   ["Si figuri.","どういたしまして"]],
  'rt-imm':[[["Buongiorno. Passaporto, per favore.","こんにちは。パスポートをお願いします","Ecco a lei.","はい、どうぞ","","物を渡す時の決まり文句です。"],
    ["Qual è il motivo del viaggio?","旅行の目的は何ですか","Turismo. Sono in vacanza.","観光です。休暇中です","",""],
    ["Quanto tempo resta in Italia?","イタリアにどのくらいいますか","Una settimana.","1週間です","",""],
    ["Dove alloggia?","どこに泊まりますか","In un albergo in centro a Roma.","ローマの中心にあるホテルです","","albergo も hotel も「ホテル」です。"]],
   ["Va bene. Benvenuto in Italia.","けっこうです。イタリアへようこそ"]],
  'rt-bag':[[["Buongiorno. Come posso aiutarla?","こんにちは。どうしましたか","La mia valigia non è arrivata.","私のスーツケースが届いていません","","valigia =「スーツケース」。"],
    ["Mi dispiace. Ha il talloncino del bagaglio?","申し訳ありません。手荷物の引換証はありますか","Sì, eccolo.","はい、これです","",""],
    ["Com'è la sua valigia?","どんなスーツケースですか","È una valigia grande e nera.","大きくて黒いスーツケースです","","形容詞は名詞のあとに置きます(valigia grande e nera)。"],
    ["Gliela mandiamo in albergo. Dove alloggia?","ホテルにお送りします。どちらにお泊まりですか","All'Hotel Parco, in centro.","中心部のホテル・パルコです","",""]],
   ["Perfetto. La chiamiamo appena la troviamo.","わかりました。見つかり次第お電話します"]],
  'rt-taxi':[[["Buonasera. Dove andiamo?","こんばんは。どちらまで？","All'Hotel Parco, in centro, per favore.","中心部のホテル・パルコまでお願いします","",""],
    ["Va bene. Ci vogliono circa quaranta minuti.","はい。40分くらいかかります","Quanto costa più o meno?","だいたいいくらですか","","più o meno =「だいたい」。"],
    ["Per il centro c'è una tariffa fissa.","中心部までは定額料金です","Va bene. Posso pagare con la carta?","わかりました。カードで払えますか","",""]],
   ["Sì, certo. Andiamo.","はい、もちろん。行きましょう"]],
  'rt-taxicard':[[["Siamo arrivati. Sono cinquantacinque euro.","着きました。55ユーロです","Pago con la carta.","カードで払います","",""],
    ["Mi dispiace, la carta non passa.","すみません、カードが通りません","Può riprovare, per favore?","もう一度試してもらえますか","","riprovare =「もう一度試す」。"],
    ["Non funziona ancora.","まだだめです","Allora pago in contanti.","じゃあ現金で払います","","in contanti =「現金で」。"]],
   ["Grazie. Buona permanenza!","ありがとう。よい滞在を"]],
  'rt-hotel':[[["Buonasera. Deve fare il check-in?","こんばんは。チェックインですか","Sì, ho una prenotazione a nome Sato.","はい、佐藤の名前で予約しています","","a nome 〜 =「〜の名前で」。"],
    ["Mi può dare il passaporto, per favore?","パスポートをいただけますか","Certo, ecco a lei.","はい、どうぞ","",""],
    ["La sua camera è la 512. La colazione non è inclusa.","お部屋は512号室です。朝食は含まれていません","C'è un posto per fare colazione qui vicino?","近くに朝ごはんを食べる所はありますか","",""]],
   ["Sì, c'è un bar molto buono all'angolo.","はい、角にとてもいいバールがありますよ"]],
  'rt-noresv':[[["Buonasera. Deve fare il check-in?","こんばんは。チェックインですか","Sì, ho una prenotazione a nome Sato.","はい、佐藤の名前で予約しています","",""],
    ["Mi dispiace, non trovo la sua prenotazione.","申し訳ありません、ご予約が見つかりません","Ecco l'email di conferma.","これが確認のメールです","","conferma =「確認」。"],
    ["Ah, ecco. La prenotazione è per domani.","ああ、予約は明日になっていますね","Avete una camera per stanotte?","今夜泊まれる部屋はありますか","","stanotte =「今夜」。"],
    ["Sì, ce n'è ancora una.","はい、まだ一部屋あります","Perfetto, la prendo.","よかった、その部屋にします","","la prendo =「それにします」。"]],
   ["Ecco la chiave. Ci scusi per il disagio.","こちらが鍵です。ご迷惑をおかけしました"]],
  'rt-bfast':[[["Buongiorno! Cosa le preparo?","おはようございます！何にしますか","Un cappuccino e un cornetto, per favore.","カプチーノとコルネットをお願いします","","イタリアの朝ごはんの定番。コルネットはクロワッサンに似たパンです。"],
    ["Al banco o al tavolo?","カウンターで？テーブルで？","Al banco, grazie.","カウンターで","","バールでは、カウンター(banco)で立って飲むほうが安いことが多いです。"],
    ["Sono due euro e cinquanta.","2ユーロ50セントです","Ecco a lei. Grazie.","はい、どうぞ。ありがとう","",""]],
   ["Grazie a lei. Buona giornata!","こちらこそ。よい一日を"]]
 }}
};
/* register the stages as scene units (not in ALL_IDS: they never show on the map) */
Object.keys(RT_META).forEach(function(id){var m=RT_META[id];SCENE_META[id]={jp:m.jp,lat:m.lat,role:m.role,ini:m.ini,sit:m.sit,grp:'route'};UM[id]={jp:m.jp,lat:m.lat};});
Object.keys(RT_ROUTES).forEach(function(L){
  if(!UNITS[L])return;
  var st=RT_ROUTES[L].st;
  Object.keys(st).forEach(function(id){
    var s=st[id];
    UNITS[L][id]={id:id,items:[],turns:s[0].map(function(t){return {p:t[0],pj:t[1],a:t[2],aj:t[3],r:t[4]||'',n:t[5]||''};}),end:s[1],track:'scene',kind:'scene',route:1};
  });
});

var RT_REC='babelflight.routes';
var RTX=null;
function rtOn(L){return fcOn()&&!!RT_ROUTES[L]&&!!UNITS[L]&&(typeof UI==='undefined'||UI==='ja');}
function rtRec(){return fcJson(RT_REC)||{};}
/* 機内3つ → 入国審査 → (スーツケース) → タクシー → ホテル → 朝ごはん; one or two troubles at random */
function rtPlan(){
  var tr=shuffle(['bag','taxicard','noresv']).slice(0,Math.random()<0.5?1:2);
  var s=['rt-drink','rt-meal','rt-aisle','rt-imm'];
  if(tr.indexOf('bag')>=0)s.push('rt-bag');
  s.push(tr.indexOf('taxicard')>=0?'rt-taxicard':'rt-taxi');
  s.push(tr.indexOf('noresv')>=0?'rt-noresv':'rt-hotel');
  s.push('rt-bfast');
  return s;
}
function rtStart(){
  var L=save.lang;if(!rtOn(L))return;
  closeSheet();
  RTX={L:L,stages:rtPlan(),i:0,mode:(lsGet('babelflight.rtMode')==='type'?'type':'call'),res:[],step:'intro',t0:Date.now()};
  view='route';render();window.scrollTo(0,0);
}
function rtGo(){
  if(!RTX)return;var id=RTX.stages[RTX.i];
  RTX.step='scene';
  startScene(id,RTX.mode);
  if(SCX)SCX.back='home';
}
function rtStageRow(id,i){
  var R=RTX,done=i<R.i,now=i===R.i,m=RT_META[id],res=R.res[i];
  var hide=m.trouble&&!done&&!now;
  var stars=res?'<span class="rt-st">'+'★★★'.slice(0,res.stars)+'<em>'+'★★★'.slice(res.stars)+'</em></span>':'';
  return '<li class="rt-row'+(done?' done':'')+(now?' now':'')+(m.trouble&&(done||now)?' trouble':'')+'"><span class="rt-dot" aria-hidden="true"></span>'+
    '<span class="rt-nm"><b>'+(hide?'？？？':esc(m.jp))+'</b><small class="mono">'+(hide?'— — —':m.lat)+'</small></span>'+(done?stars:now?'<span class="rt-tag">つぎ</span>':'')+'</li>';
}
function routeHTML(){
  var R=RTX;if(!R)return '';
  var RT=RT_ROUTES[R.L],LG=LANGS[R.L],id=R.stages[R.i],m=RT_META[id];
  var h='<div class="rt"><div class="fl-top"><button class="x" type="button" data-rt-quit aria-label="やめる">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">ROUTE SIMULATION ・ '+esc(LG.name)+'</span><b>'+RT.fno+' ・ HND → '+RT.code+'</b></div></div>';
  h+='<section class="rt-pass" aria-label="搭乗券"><div class="rt-pass-h"><span class="lbl">BOARDING PASS ・ FIRST</span><span class="mono">SEAT 1A</span></div>'+
    '<div class="rt-route"><div><b class="mono">HND</b><small>東京 羽田</small></div><span class="rt-line" aria-hidden="true">'+planeIcon()+'</span><div><b class="mono">'+RT.code+'</b><small>'+esc(RT.city)+'</small></div></div>'+
    '<div class="rt-pass-f"><span>'+esc(RT.hrs)+'</span><span>'+R.stages.length+'つの場面</span><span>'+(R.mode==='call'?'通話モード':'入力モード')+'</span></div></section>';
  if(R.step==='intro'){
    h+='<p class="dim rt-lead">東京から'+esc(RT.city)+'まで、1本のフライトをまるごと体験します。機内の会話から入国審査、タクシー、ホテル、次の朝の朝ごはんまで、'+esc(LG.name)+'だけで乗りきろう。</p>'+
      '<p class="rt-warn">⚠️ どこかで<b>トラブル</b>が起きるかも。何が起きるかは毎回ちがいます。</p>'+
      '<ol class="rt-list">'+R.stages.map(rtStageRow).join('')+'</ol>'+
      '<div class="set-block"><span class="lbl">話し方</span>'+seg('data-rt-mode',R.mode,[['call','📞 通話モード(声に出す)'],['type','⌨️ 入力モード(文字で答える)']])+'</div>'+
      '<button class="go" type="button" data-rt-next>搭乗する<small>約'+Math.round(R.stages.length*2.5)+'分 ・ 途中でやめても大丈夫</small></button>';
  }else{
    var lead=RT_LEAD[id]||'';
    h+=(m.trouble?'<div class="rt-alert" role="status"><b>⚠️ トラブル発生！</b><span>'+esc(m.jp.replace(/^トラブル: /,''))+'</span></div>':'')+
      (lead?'<p class="rt-lead2">'+esc(lead)+'</p>':'')+
      '<ol class="rt-list">'+R.stages.map(rtStageRow).join('')+'</ol>'+
      '<button class="go" type="button" data-rt-next>'+(m.trouble?'なんとかする':'次へ進む')+'<small>'+(m.trouble?'':esc(m.jp)+' ・ ')+esc(m.role)+'と話す</small></button>';
  }
  return h+'</div>';
}
function rtDone(){
  var R=RTX,RT=RT_ROUTES[R.L],ans=0,corr=0,pts=0,max=0,wrong=[];
  R.res.forEach(function(r){ans+=r.n;corr+=r.ok;pts+=r.pts;max+=r.max;r.wrong.forEach(function(w){if(wrong.length<4)wrong.push(w);});});
  var ratio=max?pts/max:0,stars=ratio>=0.9?3:ratio>=0.6?2:1,tr=R.stages.filter(function(id){return RT_META[id].trouble;}).length;
  var o=rtRec(),k=R.L;o[k]=o[k]||{n:0,best:0};o[k].n++;o[k].best=Math.max(o[k].best,stars);o[k].last=dayStr();fcPut(RT_REC,o);
  var grade=[stars===3?'完璧なフライト':stars===2?'いいフライト':'無事に到着',RT.cityEn+' ・ '+RT.fno+' ・ ROUTE COMPLETE',
    R.stages.length+'つの場面を乗りきりました'+(tr?'(トラブル'+tr+'つ)':'')+'。'+(stars===3?'このまま本物の旅行に行けそう！':'△や✕のところを、もう一度言ってみよう。')];
  RTX=null;
  completeLesson({L:k,uid:'rt-bfast',mode:'route',stars:stars,answered:ans,corr:corr,corrLabel:'◎',grade:grade,wrong:wrong,wrongTitle:'もう一度言いたいフレーズ',wrongNote:'本番の旅行の前に'});
}
(function(){
  var r0=render;
  render=function(){
    if(view==='route'){
      if(!RTX){view='home';return r0.apply(this,arguments);}
      $('tabs').hidden=true;var main=$('main');main.innerHTML=routeHTML();
      main.classList.remove('enter','enter-l','enter-r');void main.offsetWidth;main.classList.add('enter');
      document.body.classList.remove('dark-ui');PREVVIEW=view;return;
    }
    return r0.apply(this,arguments);
  };
  /* a stage that ends goes back to the route instead of landing */
  var sf=sceneFinish;
  sceneFinish=function(){
    var S=SCX;
    if(!RTX||!S||S.uid!==RTX.stages[RTX.i])return sf.apply(this,arguments);
    clearInterval(S.timer);
    var pts=S.grades.reduce(function(a,b){return a+b;},0),max=2*S.u.turns.length,ratio=max?pts/max:0;
    var wrong=[];S.u.turns.forEach(function(t,i){if(S.grades[i]<2)wrong.push({t:t.a,jp:t.aj});});
    RTX.res[RTX.i]={stars:ratio>=0.9?3:ratio>=0.6?2:1,n:S.grades.length,ok:S.grades.filter(function(g){return g===2;}).length,pts:pts,max:max,wrong:wrong};
    if(typeof repNote==='function')S.grades.forEach(function(g){repNote(S.lang,'scene',g===2);});
    SCX=null;document.body.classList.remove('dark-ui');
    RTX.i++;
    if(RTX.i>=RTX.stages.length){rtDone();return;}
    RTX.step='between';view='route';render();window.scrollTo(0,0);
    if(RT_META[RTX.stages[RTX.i]].trouble)try{chimeBad();}catch(e){}
  };
  var sq=sceneQuit;
  sceneQuit=function(){if(RTX&&SCX&&SCX.uid===RTX.stages[RTX.i])RTX=null;return sq.apply(this,arguments);};
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-rt-open')){rtStart();return;}
  if(!RTX)return;
  if(t.hasAttribute('data-rt-mode')){RTX.mode=t.getAttribute('data-rt-mode')==='type'?'type':'call';lsSet('babelflight.rtMode',RTX.mode);render();return;}
  if(t.hasAttribute('data-rt-next')){rtGo();return;}
  if(t.hasAttribute('data-rt-quit')){RTX=null;go('home');return;}
});
