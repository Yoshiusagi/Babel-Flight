/* ================= 旅の駅を追加（試作）=================
   韓国語に5駅（釜山〜統営）、英語に5駅（ロンドン〜ダブリン）。
   ルートの一番うしろに付くので、今までの駅や学習の進み具合は変わらない。
   地図の点は、ルートの並びと同じ順に CITIES[L] の n0 番目から使う（n0 = 今までのルートの駅の数）。 */
var TRIP_IDS={ko:[],en:[]};
/* 地図の街は「駅の番号」ではなく「駅のid」で決める。
   初心者の最初の駅・ローカル・日本語UIの追加駅などで駅の数が変わると、番号だと街がずれてしまうため。
   CITY_IDS は基本の駅（旅行・店・日常会話）の並びと CITIES の対応。旅の駅は自分の街を持つ。 */
var CITY_IDS={
  en:['checkin','inflight','immigration','hotel','restaurant','city','sc-imm','sc-cafe','sc-hotel','sc-rest','sc-card','sc-wc','sc-wallet','sc-booking','greet','intro','num','time','feel','chat','usuk'],
  ko:['checkin','inflight','immigration','hotel','restaurant','city','sc-imm','sc-cafe','sc-hotel','sc-rest','sc-card','sc-wc','sc-wallet','sc-booking','greet','intro','num','time','feel','chat']
};
var CITY_UID={};
Object.keys(CITY_IDS).forEach(function(L){CITY_UID[L]={};CITY_IDS[L].forEach(function(id,k){if(CITIES[L]&&CITIES[L][k])CITY_UID[L][id]=CITIES[L][k];});});
(function(){
  var T={
    ko:{n0:20,stops:[
      {id:'trip-busan',city:['BUSAN','釜山',35.18,129.08],p:[
        ["釜山駅はどこですか","부산역이 어디예요?","プサニョギ オディエヨ","「어디」はどこ、「〜예요」はです・ますの丁寧語。「釜山駅」は부산역。"],
        ["海鮮市場に行きたいです","수산시장에 가고 싶어요","スサンシジャンエ カゴ シポヨ","「〜에 가고 싶어요」=〜に行きたいです。場所の後ろは「에」。"],
        ["おすすめの料理は何ですか","추천 메뉴가 뭐예요?","チュチョン メニュガ ムォエヨ","「추천」=おすすめ、「메뉴」=メニュー、「뭐」=何。"],
        ["これをください","이거 주세요","イゴ ジュセヨ","「주세요」=ください。欲しいものを指さしながら使えます。"],
        ["海が見える場所はどこですか","바다가 보이는 곳은 어디예요?","パダガ ポイヌン ゴスン オディエヨ","「보이는」は「見える」の形。「곳」は場所。"],
        ["写真を撮ってもいいですか","사진 찍어도 돼요?","サジン ッチゴド テヨ","「〜어도 돼요」=〜してもいいです。許可をもらう定番の型。"]
      ]},
      {id:'trip-gyeongju',city:['GYEONGJU','慶州',35.86,129.22],p:[
        ["古い王の墓を見たいです","옛 왕릉을 보고 싶어요","ヨッ ワンヌンウル ポゴ シポヨ","「옛」は「昔の」、「왕릉」は王の墓。「보고 싶어요」=見たいです。"],
        ["バスは何時に来ますか","버스는 몇 시에 와요?","ポスヌン ミョッ シエ ワヨ","「몇 시」=何時。「와요」は「来ます」（오다の丁寧形）。"],
        ["入場料はいくらですか","입장료가 얼마예요?","イプチャンニョガ オルマエヨ","「얼마」=いくら。「입장료」=入場料。"],
        ["自転車を借りたいです","자전거를 빌리고 싶어요","チャジョンゴルル ピルリゴ シポヨ","「빌리다」=借りる。「〜고 싶어요」の型をもう一度。"],
        ["ここで食べられますか","여기서 먹을 수 있어요?","ヨギソ モグル ス イッソヨ","「〜을 수 있어요」=〜できます。「여기서」=ここで。"],
        ["写真を撮ってもらえますか","사진 좀 찍어 주시겠어요?","サジン チョム ッチゴ ジュシゲッソヨ","「좀」は「ちょっと」の柔らかい依頼。「〜주시겠어요?」=〜していただけますか。"]
      ]},
      {id:'trip-daegu',city:['DAEGU','大邱',35.87,128.60],p:[
        ["地下鉄の駅はどこですか","지하철역이 어디예요?","ジハチョルリョギ オディエヨ","「지하철」=地下鉄、「역」=駅。"],
        ["この料理は辛いですか","이 음식은 매워요?","イ ウムシグン メウォヨ","「맵다」=辛い。語幹が変わって「매워요」になります（ㅂ不規則）。"],
        ["辛くしないでください","안 맵게 해 주세요","アン メプケ ヘ ジュセヨ","「안」=〜ない、「맵게」=辛く、「해 주세요」=してください。辛さを調整する一言。"],
        ["お会計をお願いします","계산해 주세요","ケサンヘ ジュセヨ","「계산」=会計。店を出るときに使えます。"],
        ["一番人気のお店はどこですか","제일 인기 있는 가게는 어디예요?","チェイル インギ インヌン カゲヌン オディエヨ","「제일」=一番、「인기 있다」=人気がある。「가게」=店。"],
        ["電話番号を教えてください","전화번호를 알려 주세요","チョンファボノルル アルリョ ジュセヨ","「알려 주세요」=教えてください。"]
      ]},
      {id:'trip-andong',city:['ANDONG','安東',36.57,128.73],p:[
        ["伝統の村に行きたいです","전통 마을에 가고 싶어요","ジョントン マウレ カゴ シポヨ","「전통」=伝統、「마을」=村。"],
        ["仮面踊りを見られますか","탈춤을 볼 수 있어요?","タルチュムル ポル ス イッソヨ","「탈춤」=仮面舞踊。「볼 수 있어요?」=見られますか。"],
        ["ここから近いですか","여기서 가까워요?","ヨギソ カッカウォヨ","「가깝다」=近い（ㅂ不規則で「가까워요」）。"],
        ["タクシーで行けますか","택시로 갈 수 있어요?","テクシロ カル ス イッソヨ","「〜로」=〜で（手段）。「갈 수 있어요?」=行けますか。"],
        ["地図をもらえますか","지도 주실 수 있어요?","チド ジュシル ス イッソヨ","「주실 수 있어요?」=いただけますか（丁寧な依頼）。"],
        ["ありがとうございました","감사했습니다","カムサヘッスムニダ","過去形の丁寧語。お店を出るときに言えます。"]
      ]},
      {id:'trip-tongyeong',city:['TONGYEONG','統営',34.85,128.43],p:[
        ["船でどこの島に行けますか","배로 어느 섬에 갈 수 있어요?","ベロ オヌ ソメ カル ス イッソヨ","「배」=船、「어느」=どの。「섬」=島。"],
        ["ケーブルカーの乗り場はどこですか","케이블카 타는 곳이 어디예요?","ケイブルカ タヌン ゴシ オディエヨ","「타다」=乗る、「타는 곳」=乗り場。"],
        ["景色がきれいですね","경치가 참 좋아요","キョンチガ チャム チョアヨ","「참」=とても、「좋아요」=いいです。"],
        ["ここで写真を撮りたいです","여기서 사진 찍고 싶어요","ヨギソ サジン ッチゴ シポヨ","「찍다」=撮る。「〜고 싶어요」=〜したいです。"],
        ["牡蠣料理はありますか","굴 요리 있어요?","クル ヨリ イッソヨ","「굴」=牡蠣。「있어요?」=ありますか。"],
        ["またここに来たいです","또 여기 오고 싶어요","ト ヨギ オゴ シポヨ","「또」=また、「오다」=来る。"]
      ]}
    ]},
    en:{n0:21,stops:[
      {id:'trip-london',city:['LONDON','ロンドン',51.51,-0.13],p:[
        ["ヒースロー空港から市内へ行きたいです","I'd like to go to the city center from Heathrow.","","「I'd like to 〜」は「〜したいのですが」。丁寧で旅行の万能フレーズ。"],
        ["チケットを一枚ください","One ticket, please.","","「One 〜, please.」で数を言うだけで注文・購入ができます。"],
        ["この電車はテムズ川に行きますか","Does this train go to the Thames?","","「Does this train go to 〜?」=この電車は〜に行きますか。"],
        ["トイレはどこですか","Where is the toilet?","","イギリスでは「toilet」が一般的。米国では「restroom」が使われます。"],
        ["おすすめのパブを教えていただけますか","Could you recommend a good pub?","","「Could you recommend 〜?」=〜をおすすめしていただけますか。パブはイギリスの居酒屋です。"],
        ["写真を撮っていただけますか","Would you mind taking a photo?","","「Would you mind 〜ing?」は頼み事の丁寧な言い方。"]
      ]},
      {id:'trip-oxford',city:['OXFORD','オックスフォード',51.75,-1.26],p:[
        ["大学の図書館を見学したいです","I'd like to visit the university library.","","「visit」は見学・訪問に使えます。"],
        ["ツアーは何時に始まりますか","What time does the tour start?","","「What time does 〜 start?」=〜は何時に始まりますか。"],
        ["自転車を借りられますか","Can I rent a bike here?","","「rent」は有料で借りるときに使う単語。「Can I 〜?」は許可・可能を聞く型。"],
        ["学生向けの割引はありますか","Is there a student discount?","","「Is there 〜?」=〜はありますか。"],
        ["このパンフレットをもらえますか","Could I have this brochure?","","「Could I have 〜?」は丁寧な依頼の定番。"],
        ["どこでアフタヌーンティーができますか","Where can I have afternoon tea?","","英国の定番「アフタヌーンティー」。「have」で飲食を注文する表現。"]
      ]},
      {id:'trip-cambridge',city:['CAMBRIDGE','ケンブリッジ',52.21,0.12],p:[
        ["川にかかる橋はどこですか","Where is the bridge over the river?","","「over the river」=川の上にかかる。"],
        ["ここでパンティングはできますか","Can I go punting here?","","「punting」はケンブリッジ名物の平底ボートでの川下り。"],
        ["ガイドツアーに参加したいです","I'd like to join a guided tour.","","「join」=参加する。「guided」=ガイド付きの。"],
        ["写真を撮ってもいいですか","Is it OK if I take a picture?","","「Is it OK if I 〜?」=〜してもいいですか。"],
        ["近くにカフェはありますか","Is there a café nearby?","","「nearby」=近くに。"],
        ["ここから駅まで何分かかりますか","How long does it take to get to the station from here?","","「How long does it take to 〜?」=〜するのに時間はどのくらいかかりますか。"]
      ]},
      {id:'trip-edinburgh',city:['EDINBURGH','エディンバラ',55.95,-3.19],p:[
        ["お城までの行き方を教えてください","Could you tell me how to get to the castle?","","「Could you tell me how to 〜?」=〜の行き方を教えていただけますか。"],
        ["スコッチウイスキーを試飲できますか","Can I taste some Scotch whisky?","","「Scotch」はスコットランド産のウイスキー。「taste」=試飲する。"],
        ["このあたりは安全ですか","Is this area safe?","","「safe」=安全な。夜の移動の確認に使えます。"],
        ["入場チケットはいくらですか","How much is the entrance ticket?","","「How much is 〜?」=〜はいくらですか。"],
        ["ここで傘を借りられますか","Can I borrow an umbrella here?","","「borrow」=無料で借りる。雨の多い街なので役立ちます。"],
        ["ありがとう、とても楽しかったです","Thank you, I really enjoyed it.","","「enjoyed」は過去形。旅の終わりに使える一言。"]
      ]},
      {id:'trip-dublin',city:['DUBLIN','ダブリン',53.35,-6.26],p:[
        ["ギネスを一杯ください","One pint of Guinness, please.","","「pint」=パイント（約0.57L）。パブで注文する定番。"],
        ["ここからバスで行けますか","Can I get there by bus from here?","","「get there by bus」=バスで行く。"],
        ["予約をしています、田中です","I have a reservation under Tanaka.","","「reservation」=予約。名前は苗字で伝えます。"],
        ["生演奏が聴けるお店はありますか","Where can I hear some live music?","","「live music」=生演奏。"],
        ["ここからの景色は素敵ですね","The view from here is lovely.","","「lovely」=素敵な。イギリスでもよく使われる言葉です。"],
        ["タクシーを呼んでいただけますか","Could you call a taxi for me?","","「Could you 〜 for me?」=私のために〜していただけますか。"]
      ]}
    ]}
  };
  Object.keys(T).forEach(function(L){
    var t=T[L];
    TRIP_IDS[L]=t.stops.map(function(s){return s.id;});
    t.stops.forEach(function(s,k){
      UNITS[L][s.id]={id:s.id,items:U(s.id,s.p).items,track:'travel'};
      if(CITIES[L])CITIES[L].push(s.city);
      if(CITY_UID[L])CITY_UID[L][s.id]=s.city;
    });
  });
})();
/* 旅の駅は、ルートの一番うしろの区間になる */
function tripSecs(lang){
  var ids=TRIP_IDS[lang];
  return ids&&ids.length?[{key:'trips',title:'旅の駅',sub:'地図の新しい街。その土地ならではの一言',ids:ids.slice()}]:[];
}
