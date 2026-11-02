/* ================= 日本語 (Japanese) — starter course for the other display languages =================
   Only offered when the screen is in English / 한국어 / 简体中文 (learnOrder() hides the course of the
   display language itself, so a Japanese screen never shows it). Readings are romaji (Hepburn, with ō ū).
   The meaning (jp) is the plain Japanese the dictionaries translate; the phrase itself (t, and the word split s)
   starts with an invisible WORD JOINER (JA_M) so the display-language translation never touches the Japanese
   being learned. No typing questions (they would need a Japanese keyboard). Daily phrases, scenes and the
   route map are in e3g_ja.js. */
var JA_M='⁠';
function JU(id,list){return U(id,list.map(function(x){return [x[0],JA_M+x[1],x[2]||'',x[3]||'',x[4]?JA_M+x[4]:''];}));}
LANGS.ja={name:'日本語',native:'日本語',city:'東京',cityEn:'TOKYO',code:'HND',tts:'ja-JP',km:1,letter:'M',hasYomi:true,noType:true,starter:true,units:[
  JU('checkin',[
   ["こんにちは","こんにちは。","konnichiwa","「は」は「wa」と読みます。"],
   ["チェックインしたいのですが","チェックインをお願いします。","chekku-in o onegai shimasu","「〜をお願いします」は、何かを頼むときの便利な言い方です。","チェックインを お願いします。"],
   ["こちらが私のパスポートです","これが私のパスポートです。","kore ga watashi no pasupōto desu","","これが 私の パスポート です。"],
   ["窓側の席をお願いします","窓側の席をお願いします。","madogawa no seki o onegai shimasu","通路側は「通路側(tsūrogawa)」。","窓側の 席を お願いします。"],
   ["預ける荷物が1つあります","預ける荷物が一つあります。","azukeru nimotsu ga hitotsu arimasu","","預ける 荷物が 一つ あります。"],
   ["搭乗口はどこですか","搭乗口はどこですか。","tōjōguchi wa doko desu ka","「〜はどこですか」で場所を聞けます。","搭乗口は どこ ですか。"],
   ["搭乗は何時ですか","搭乗は何時ですか。","tōjō wa nanji desu ka","","搭乗は 何時 ですか。"],
   ["便は定刻通りですか","この便は時間通りですか。","kono bin wa jikan dōri desu ka","","この 便は 時間通り ですか。"]
  ]),
  JU('inflight',[
   ["水を一杯お願いします","お水を一杯お願いします。","omizu o ippai onegai shimasu","「お水」の「お」は、ていねいにする言葉です。","お水を 一杯 お願いします。"],
   ["ブランケットをいただけますか","ブランケットをいただけますか。","buranketto o itadakemasu ka","「〜をいただけますか」は、とてもていねいなお願いです。"],
   ["チキンをお願いします","チキンでお願いします。","chikin de onegai shimasu","選ぶときは「〜でお願いします」。"],
   ["お手洗いはどこですか","お手洗いはどこですか。","otearai wa doko desu ka","「トイレ」とも言います。","お手洗いは どこ ですか。"],
   ["すみません、通ってもいいですか","すみません、通ってもいいですか。","sumimasen, tōtte mo ii desu ka","「すみません」は、呼びかけにもおわびにも使えます。","すみません、 通っても いい ですか。"],
   ["気分が悪いです","気分が悪いです。","kibun ga warui desu","","気分が 悪い です。"],
   ["着陸まであとどれくらいですか","着陸まであとどのくらいですか。","chakuriku made ato dono kurai desu ka","","着陸まで あと どのくらい ですか。"],
   ["電気を消していただけますか","電気を消していただけますか。","denki o keshite itadakemasu ka","","電気を 消して いただけますか。"]
  ]),
  JU('immigration',[
   ["観光で来ました","観光で来ました。","kankō de kimashita","「〜で来ました」=〜の目的で来ました。"],
   ["5日間滞在します","5日間滞在します。","itsukakan taizai shimasu","日にちには特別な読み方があります(5日=itsuka)。","5日間 滞在 します。"],
   ["市内のホテルに泊まります","市内のホテルに泊まります。","shinai no hoteru ni tomarimasu","","市内の ホテルに 泊まります。"],
   ["アメリカから来ました","アメリカから来ました。","amerika kara kimashita","","アメリカから 来ました。"],
   ["帰りの航空券があります","帰りの航空券があります。","kaeri no kōkūken ga arimasu","","帰りの 航空券が あります。"],
   ["申告するものはありません","申告するものはありません。","shinkoku suru mono wa arimasen","","申告する ものは ありません。"],
   ["一人で旅行しています","一人で旅行しています。","hitori de ryokō shite imasu","","一人で 旅行して います。"],
   ["もう一度言っていただけますか","もう一度言っていただけますか。","mō ichido itte itadakemasu ka","","もう一度 言って いただけますか。"]
  ]),
  JU('hotel',[
   ["予約しています","予約しています。","yoyaku shite imasu",""],
   ["一泊いくらですか","一泊いくらですか。","ippaku ikura desu ka","","一泊 いくら ですか。"],
   ["朝食は含まれていますか","朝食は付いていますか。","chōshoku wa tsuite imasu ka","朝食=朝ごはん。","朝食は 付いて いますか。"],
   ["Wi-Fiのパスワードは何ですか","Wi-Fiのパスワードは何ですか。","wai-fai no pasuwādo wa nan desu ka","","Wi-Fiの パスワードは 何 ですか。"],
   ["チェックアウトは何時ですか","チェックアウトは何時ですか。","chekku-auto wa nanji desu ka","","チェックアウトは 何時 ですか。"],
   ["エアコンが動きません","エアコンがつきません。","eakon ga tsukimasen",""],
   ["荷物を預かっていただけますか","荷物を預かっていただけますか。","nimotsu o azukatte itadakemasu ka","","荷物を 預かって いただけますか。"],
   ["タオルがもう一枚必要です","タオルをもう一枚お願いします。","taoru o mō ichimai onegai shimasu","「枚」は紙や布など、うすい物を数えます。","タオルを もう 一枚 お願いします。"]
  ]),
  JU('restaurant',[
   ["2名でお願いします","2人です。","futari desu","人数は「一人(hitori)」「二人(futari)」。3人からは「〜にん」。"],
   ["メニューをお願いします","メニューをお願いします。","menyū o onegai shimasu",""],
   ["おすすめは何ですか","おすすめは何ですか。","osusume wa nan desu ka","","おすすめは 何 ですか。"],
   ["ナッツアレルギーがあります","ナッツのアレルギーがあります。","nattsu no arerugī ga arimasu","","ナッツの アレルギーが あります。"],
   ["とてもおいしいです！","とてもおいしいです！","totemo oishii desu!","","とても おいしい です！"],
   ["お会計をお願いします","お会計をお願いします。","okaikei o onegai shimasu","日本のレストランでは、チップはいりません。"],
   ["カードで払えますか","カードで払えますか。","kādo de haraemasu ka",""],
   ["辛くしないでください","辛くしないでください。","karaku shinaide kudasai","「〜しないでください」=〜しないでほしいときの言い方。","辛く しないで ください。"]
  ]),
  JU('city',[
   ["駅へはどう行けばいいですか","駅へはどう行けばいいですか。","eki e wa dō ikeba ii desu ka","「へ」は「e」と読みます。","駅へは どう 行けば いい ですか。"],
   ["道に迷いました","道に迷いました。","michi ni mayoimashita",""],
   ["写真を撮っていただけますか","写真を撮っていただけますか。","shashin o totte itadakemasu ka","","写真を 撮って いただけますか。"],
   ["助けて！","助けて！","tasukete!",""],
   ["財布をなくしました","財布をなくしました。","saifu o nakushimashita","落とし物は「交番(kōban)」に届けられることが多いです。"],
   ["一番近い薬局はどこですか","一番近い薬局はどこですか。","ichiban chikai yakkyoku wa doko desu ka","「ドラッグストア」もよく見かけます。","一番 近い 薬局は どこ ですか。"],
   ["医者が必要です","医者に診てもらいたいです。","isha ni mite moraitai desu","","医者に 診て もらいたい です。"],
   ["もっとゆっくり話してください","もう少しゆっくり話してください。","mō sukoshi yukkuri hanashite kudasai","","もう少し ゆっくり 話して ください。"]
  ])
 ]};
ORDER.push('ja');
