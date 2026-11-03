/* ================= 職業の資格 (検定モード, in place of the old 航空英語(ICAO) group) =================
   The third group of 検定 now follows the job chosen in 職業モード (save.prof): パイロット → ICAO航空英語 +
   航空無線通信士(英語), 医師・看護師 → OET, 薬剤師 → OET(薬剤師), 弁護士 → TOLES, ビジネス → ケンブリッジ英検
   ビジネス, 料理人 → ServSafe Food Handler, 教師 → CELTA・TEFL, ホテル・観光 → 観光英語検定 + 全国通訳案内士
   (英語 / 韓国語 / スペイン語 / イタリア語), 研究者 → IELTS / TOPIK / DELE / CILS (大学院・研究), 客室乗務員 → TOEIC
   (the usual line for Japanese airlines). IT・美容師・スポーツ選手 have no language certificate: a practice group
   (practice:true, no 目標) marked 「公式の資格ではありません」. Same class as ICAO (ビジネス).
   Every sentence is original practice material; the exam names are trademarks of their owners. */
XU('x-icao2','ICAO航空英語 ステップ2','ICAO ENGLISH 2','en',[
 ["We are diverting to Osaka due to a medical emergency.","","急病人のため、大阪にダイバートします。","divert=目的地を変更する。ICAOの試験では、決まった用語にない場面をふつうの英語で伝えられるかが見られます。"],
 ["Our hydraulic pressure is dropping.","","油圧が下がっています。","hydraulic=油圧の。"],
 ["We need to hold for about ten minutes to check the problem.","","問題を確認するため、10分ほど待機したいです。","hold=空中で待機する(旋回して待つ)。"],
 ["There is smoke in the cabin.","","客室に煙が出ています。",""],
 ["Could you give us the latest weather at the destination?","","目的地の最新の天気を教えてもらえますか。",""],
 ["We will need fire trucks standing by on landing.","","着陸のとき、消防車に待機してほしいです。","standing by=待機して。"],
 ["A passenger is refusing to follow the crew's instructions.","","乗務員の指示に従わない乗客がいます。",""],
 ["We have lost contact with our company on the radio.","","無線で会社と連絡が取れなくなりました。","lose contact with=〜と連絡が取れなくなる。"]]);
XU('x-aero1','航空無線通信士 英語 ステップ1','AERO RADIO 1','en',[
 ["Tokyo Ground, Japan Air 123, request taxi.","","東京グランド、ジャパンエア123便、地上走行の許可をお願いします。","request taxi=タキシング(地上走行)の許可を求める。最初に相手、次に自分のコールサイン。"],
 ["Taxi to holding point runway three four right.","","滑走路34Rの停止位置まで地上走行してください。","数字は1つずつ読みます(three four)。right=Rの滑走路。"],
 ["Line up and wait.","","滑走路に入って待機してください。",""],
 ["Cleared for takeoff.","","離陸を許可します。","離陸の許可だけに使う言い方。"],
 ["Climb and maintain flight level two four zero.","","上昇して、フライトレベル240を維持してください。","flight level=高度の単位(100フィートごと)。"],
 ["Contact Tokyo Control on one two four decimal one.","","東京コントロールの124.1に連絡してください。","decimal=小数点。"],
 ["Roger.","","受信しました。","Roger は「聞こえた」だけの意味。従うかどうかは含みません。"],
 ["Wilco.","","了解、指示に従います。","will comply の略。Roger とのちがいは試験でよく問われます。"]]);
XU('x-oet1','OET 診察の英語','OET CONSULTATION','en',[
 ["What brings you in today?","","今日はどうされましたか。","診察の最初の決まった質問。"],
 ["Can you describe the pain for me?","","痛みについて詳しく教えてください。",""],
 ["On a scale of one to ten, how would you rate the pain?","","痛みを1から10で表すと、どのくらいですか。",""],
 ["Are you currently taking any medication?","","今、何か薬を飲んでいますか。","medication=薬(数えない名詞)。"],
 ["Do you have any allergies?","","アレルギーはありますか。",""],
 ["I'm going to listen to your chest.","","胸の音を聞きますね。","診察の前に、これからすることを伝えます。"],
 ["I understand this must be worrying for you.","","ご心配ですよね。","OETのスピーキングでは、患者の気持ちへの共感も評価されます。"],
 ["Is there anything else you'd like to ask me?","","ほかに聞きたいことはありますか。",""]]);
XU('x-oet2','OET 紹介状の英語','OET REFERRAL LETTER','en',[
 ["I am writing to refer Mr. Smith for further assessment.","","スミスさんの精密検査のため、ご紹介いたします。","refer=(患者を)紹介する。OETのライティングは紹介状などの手紙です。"],
 ["He presented with a two-week history of chest pain.","","2週間前からの胸痛で受診されました。","presented with=〜の症状で受診した。"],
 ["His blood pressure was elevated at 160 over 95.","","血圧は160/95と高めでした。","160 over 95=160/95(上/下)。"],
 ["She has a past history of asthma.","","ぜんそくの既往歴があります。",""],
 ["He was commenced on antibiotics.","","抗菌薬の投与を開始しました。","commence=start のかたい言い方。"],
 ["Her symptoms have improved since admission.","","入院後、症状は改善しています。","admission=入院。"],
 ["I would appreciate your opinion on further management.","","今後の治療方針について、ご意見をいただければ幸いです。","management=(病気の)管理・治療。"],
 ["Please do not hesitate to contact me if you require further information.","","ご不明な点があれば、遠慮なくご連絡ください。","手紙の最後の決まり文句。"]]);
XU('x-oetph1','OET 薬剤師の英語','OET PHARMACY','en',[
 ["Take one tablet twice a day with food.","","1日2回、食事と一緒に1錠飲んでください。",""],
 ["This medicine may make you feel drowsy.","","この薬で眠くなることがあります。","drowsy=眠い。"],
 ["Please avoid alcohol while taking this medication.","","この薬を飲んでいる間は、お酒を控えてください。",""],
 ["Have you taken this medicine before?","","この薬を飲んだことはありますか。",""],
 ["It's important to finish the whole course of antibiotics.","","抗菌薬は最後まで飲み切ることが大切です。","course=決められた期間の服用。"],
 ["Let me check for any interactions with your other medicines.","","ほかのお薬との飲み合わせを確認しますね。","interaction=相互作用(飲み合わせ)。"],
 ["If you miss a dose, take it as soon as you remember.","","飲み忘れたら、気づいたときに飲んでください。","実際の説明は薬によってちがい、「次の時間が近ければ1回とばす」などが続くこともあります。"],
 ["Do you have any questions about using your inhaler?","","吸入器の使い方で、何か質問はありますか。","inhaler=吸入器。"]]);
XU('x-toles1','TOLES 契約の英語','TOLES CONTRACTS','en',[
 ["The contract shall be governed by the laws of England.","","この契約は、英国の法律に準拠するものとします。","shall=契約書で「〜するものとする」(義務・決まり)。"],
 ["Either party may terminate this agreement with thirty days' notice.","","いずれの当事者も、30日前の通知でこの契約を解除できます。","party=当事者。terminate=終了させる。"],
 ["The seller warrants that the goods are free from defects.","","売主は、商品に欠陥がないことを保証します。","warrant=保証する。"],
 ["This clause shall survive the termination of the agreement.","","この条項は、契約が終わったあとも効力を持つものとします。","survive=(契約終了後も)効力が続く。"],
 ["The parties agree to keep this information confidential.","","両当事者は、この情報を秘密にすることに同意します。",""],
 ["The claimant is seeking damages for breach of contract.","","原告は、契約違反による損害賠償を求めています。","claimant=原告(英国)。damages=損害賠償金(複数形で)。"],
 ["Any dispute shall be referred to arbitration.","","紛争はすべて仲裁で解決するものとします。","arbitration=仲裁(裁判の代わりの解決方法)。"],
 ["We look forward to receiving your instructions.","","ご依頼をお待ちしております。","instructions=(依頼人から弁護士への)依頼・指示。"]]);
XU('x-bec1','ビジネス英語 会議とメール','BUSINESS ENGLISH 1','en',[
 ["Let's move on to the next item on the agenda.","","議題の次の項目に移りましょう。","agenda=議題(のリスト)。"],
 ["Could you give us an update on the project?","","プロジェクトの最新の状況を教えてもらえますか。",""],
 ["Sales rose by ten percent in the third quarter.","","第3四半期の売上は10%伸びました。","quarter=四半期。rise by=〜だけ増える。"],
 ["I'm afraid we need to postpone the meeting.","","申し訳ありませんが、会議を延期する必要があります。","I'm afraid=言いにくいことの前に。"],
 ["Please find attached the report you requested.","","ご依頼の報告書を添付しました。","メールの決まり文句。"],
 ["We should consider the costs before making a decision.","","決める前に、費用を検討するべきです。",""],
 ["I'd like to propose a different approach.","","別のやり方を提案したいです。",""],
 ["Thank you for your prompt reply.","","早速のお返事、ありがとうございます。","prompt=すばやい。"]]);
XU('x-servsafe1','ServSafe 食品衛生の英語','FOOD SAFETY 1','en',[
 ["Wash your hands for at least twenty seconds.","","少なくとも20秒間、手を洗いましょう。",""],
 ["Keep cold food at 41 degrees Fahrenheit or lower.","","冷たい食品は41°F(約5°C)以下で保ちます。","アメリカの温度は華氏(°F)。"],
 ["Keep hot food at 135 degrees Fahrenheit or higher.","","温かい食品は135°F(約57°C)以上で保ちます。",""],
 ["Store raw meat below ready-to-eat food.","","生の肉は、そのまま食べる食品より下の段に保存します。","上からしずくが落ちて汚れるのを防ぐため。"],
 ["Use a separate cutting board for raw chicken.","","生の鶏肉には、別のまな板を使いましょう。",""],
 ["Cook chicken to an internal temperature of 165 degrees Fahrenheit.","","鶏肉は中心温度165°F(約74°C)まで加熱します。","internal temperature=中心温度。"],
 ["Tell your manager if you have a fever or are vomiting.","","熱や嘔吐があるときは、責任者に伝えましょう。",""],
 ["Label food with the date it was prepared.","","食品には、作った日付のラベルを貼りましょう。",""]]);
XU('x-celta1','CELTA・TEFL 教室の英語','CLASSROOM ENGLISH 1','en',[
 ["Work in pairs and compare your answers.","","ペアになって、答えを比べてください。",""],
 ["Can anyone tell me what this word means?","","この単語の意味が分かる人はいますか。",""],
 ["Let's check the answers together.","","一緒に答えを確認しましょう。",""],
 ["Listen and repeat after me.","","私のあとについて、くり返してください。",""],
 ["You have five minutes to finish this task.","","この課題は5分でやりましょう。",""],
 ["The aim of this lesson is to practise the past tense.","","この授業のねらいは、過去形を練習することです。","CELTAでは授業の aim(ねらい)をはっきりさせることが大切。practise はイギリスのつづり。"],
 ["Raise your hand when you've finished.","","終わったら手を挙げてください。",""],
 ["Good! Can you say it in a different way?","","いいですね! 別の言い方で言えますか。",""]]);
XU('x-kanko1','観光英語検定 ステップ1','TOURISM ENGLISH 1','en',[
 ["Your flight departs from Terminal 2.","","お客様の便は、第2ターミナルから出発します。",""],
 ["May I see your passport and boarding pass?","","パスポートと搭乗券を拝見できますか。",""],
 ["The tour includes lunch and admission fees.","","ツアーには昼食と入場料が含まれています。","admission fee=入場料。"],
 ["Breakfast is served from seven to ten.","","朝食は7時から10時までです。",""],
 ["Please keep your valuables with you at all times.","","貴重品はいつもお持ちください。","valuables=貴重品。"],
 ["The bus will leave the hotel at eight sharp.","","バスは8時ちょうどにホテルを出発します。","sharp=(時刻が)ちょうど。"],
 ["Would you like a window seat or an aisle seat?","","窓側と通路側、どちらの席がよろしいですか。","aisle=通路(s は読みません)。"],
 ["This temple is a World Heritage Site.","","このお寺は世界遺産です。",""]]);
XU('x-guide1','全国通訳案内士 英語 ステップ1','GUIDE INTERPRETER 1','en',[
 ["Please bow once before you walk through the torii gate.","","鳥居をくぐる前に、一礼してください。","神社の作法を説明する場面。"],
 ["This castle was built in the early seventeenth century.","","このお城は、17世紀の初めに建てられました。",""],
 ["Sumo wrestlers throw salt to purify the ring.","","力士は、土俵を清めるために塩をまきます。","purify=清める。"],
 ["Please take off your shoes before entering the room.","","部屋に入る前に、靴を脱いでください。",""],
 ["Real wasabi comes from a plant that grows in clean mountain streams.","","本わさびは、きれいな山の渓流で育つ植物から作られます。",""],
 ["The tea ceremony values hospitality and respect.","","茶道は、おもてなしと敬意を大切にしています。",""],
 ["You can write your wish on a wooden plaque.","","絵馬に願いごとを書くことができます。","wooden plaque=絵馬。"],
 ["Tipping is not customary in Japan.","","日本ではチップの習慣はありません。","customary=習慣になっている。"]]);
XU('x-guide-ko1','全国通訳案内士 韓国語 ステップ1','GUIDE KOREAN 1','ko',[
 ["신발을 벗고 들어가 주세요.","シンバルル ポッコ トゥロガ ジュセヨ","靴を脱いで入ってください。",""],
 ["이 절은 세계유산이에요.","イ ジョルン セゲユサニエヨ","このお寺は世界遺産です。","절=お寺。세계유산=世界遺産。"],
 ["사진은 여기서 찍으시면 돼요.","サジヌン ヨギソ チグシミョン ドェヨ","写真はここで撮っていただけます。",""],
 ["버스는 열 시에 출발합니다.","ポスヌン ヨル シエ チュルバラムニダ","バスは10時に出発します。","時刻の「時」は固有数詞(열=10)。"],
 ["일본에서는 팁을 주지 않아요.","イルボネソヌン ティブル チュジ アナヨ","日本ではチップを渡しません。",""],
 ["도리이를 지나기 전에 한 번 인사해 주세요.","トリイルル チナギ ジョネ ハン ボン インサヘ ジュセヨ","鳥居をくぐる前に、一礼してください。",""],
 ["이 성은 약 사백 년 전에 지어졌어요.","イ ソンウン ヤク サベン ニョン ジョネ チオジョッソヨ","このお城は、約400年前に建てられました。","年数は漢数詞(사백=400)。"],
 ["궁금한 점이 있으세요?","クングマン チョミ イッスセヨ","何か質問はありますか。",""]]);
XU('x-guide-es1','全国通訳案内士 スペイン語 ステップ1','GUIDE SPANISH 1','es',[
 ["Por favor, quítense los zapatos antes de entrar.","","入る前に、靴を脱いでください。","quítense=ustedes(みなさん)への丁寧な命令。"],
 ["Este templo es Patrimonio de la Humanidad.","","このお寺は世界遺産です。",""],
 ["El autobús sale a las ocho en punto.","","バスは8時ちょうどに出発します。","en punto=ちょうど。"],
 ["En Japón no se deja propina.","","日本ではチップを置きません。","propina=チップ。"],
 ["Este castillo se construyó hace unos cuatrocientos años.","","このお城は、約400年前に建てられました。","hace+期間=〜前に。"],
 ["Aquí pueden hacer fotos.","","ここで写真を撮れます。","中南米では tomar fotos と言うことが多いです。"],
 ["El tren bala llega a Kioto en unas dos horas.","","新幹線は、約2時間で京都に着きます。","tren bala=新幹線。"],
 ["¿Tienen alguna pregunta?","","何か質問はありますか。",""]]);
XU('x-guide-it1','全国通訳案内士 イタリア語 ステップ1','GUIDE ITALIAN 1','it',[
 ["Per favore, toglietevi le scarpe prima di entrare.","","入る前に、靴を脱いでください。","toglietevi=voi(みなさん)への命令。"],
 ["Questo tempio è patrimonio dell'umanità.","","このお寺は世界遺産です。",""],
 ["L'autobus parte alle otto in punto.","","バスは8時ちょうどに出発します。","in punto=ちょうど。"],
 ["In Giappone non si lascia la mancia.","","日本ではチップを置きません。","mancia=チップ。"],
 ["Questo castello è stato costruito circa quattrocento anni fa.","","このお城は、約400年前に建てられました。","期間+fa=〜前に。"],
 ["Qui potete fare delle foto.","","ここで写真を撮れます。",""],
 ["Lo shinkansen arriva a Kyoto in circa due ore.","","新幹線は、約2時間で京都に着きます。",""],
 ["Avete qualche domanda?","","何か質問はありますか。",""]]);
/* 研究者 (IELTS / TOPIK / DELE / CILS for graduate school and research), 客室乗務員 (TOEIC 600, the usual line for
   Japanese airlines), and practice for the jobs that have no language certificate (IT, 美容師, スポーツ選手) */
XU('x-res1','研究者の英語 学会発表','ACADEMIC ENGLISH 1','en',[
 ["Today I'd like to present the results of our latest study.","","今日は、私たちの最新の研究結果を発表します。","発表の最初の決まった言い方。"],
 ["This slide shows how the data were collected.","","このスライドは、データの集め方を示しています。","data は複数あつかい(were)が論文では一般的。"],
 ["As you can see in this graph, the effect increases with temperature.","","このグラフのとおり、温度が上がると効果が大きくなります。",""],
 ["Our findings suggest that further research is needed.","","今回の結果から、さらに研究が必要だと考えられます。","suggest=〜を示唆する。断定しすぎない言い方。"],
 ["That's a very good question.","","とてもいい質問ですね。","質疑応答で、考える時間をつくる一言。"],
 ["Could you repeat the question, please?","","質問をもう一度言っていただけますか。",""],
 ["I'm afraid we haven't tested that yet.","","すみません、それはまだ試していません。","I'm afraid=言いにくいことをやわらかくする。"],
 ["Thank you for your attention.","","ご清聴ありがとうございました。","発表の最後の決まり文句。"]]);
XU('x-res2','研究者の英語 論文・研究室','ACADEMIC ENGLISH 2','en',[
 ["The aim of this study is to examine the effect of sleep on memory.","","この研究の目的は、睡眠が記憶に与える影響を調べることです。","aim of this study=研究の目的。論文の最初によく出ます。"],
 ["Previous studies have shown similar results.","","先行研究でも、同じような結果が示されています。","previous studies=先行研究。"],
 ["The results were statistically significant.","","結果は統計的に有意でした。","significant=統計的に意味のある差がある。"],
 ["One limitation of this study is the small sample size.","","この研究の限界の一つは、サンプル数が少ないことです。","limitation=限界。論文の考察で必ず書きます。"],
 ["Could you take a look at my draft before I submit it?","","投稿する前に、原稿を見ていただけますか。","draft=下書き。submit=投稿する。"],
 ["The reviewers asked us to add more data.","","査読者から、データを追加するように言われました。","reviewer=査読者。"],
 ["I'll run the experiment again tomorrow.","","明日、もう一度実験します。","run an experiment=実験を行う。"],
 ["Is the equipment free this afternoon?","","今日の午後、装置は空いていますか。","研究室で装置の予約を確認するとき。"]]);
XU('x-res-ko1','研究者の韓国語 研究室・学会','ACADEMIC KOREAN 1','ko',[
 ["오늘은 저희 연구 결과를 발표하겠습니다.","オヌルン チョイ ヨング キョルグァルル パルピョハゲッスムニダ","今日は、私たちの研究結果を発表します。","発表では「〜겠습니다」のかたい言い方を使います。"],
 ["이 그래프를 보시면 차이를 알 수 있습니다.","イ グレプルル ボシミョン チャイルル アル ス イッスムニダ","このグラフを見ると、違いが分かります。",""],
 ["좋은 질문 감사합니다.","チョウン ジルムン カムサハムニダ","いい質問をありがとうございます。",""],
 ["교수님, 논문 초안을 봐 주실 수 있을까요?","キョスニム ノンムン チョアヌル ボァ ジュシル ス イッスルッカヨ","教授、論文の下書きを見ていただけますか。","교수님=教授(先生)。초안=下書き。"],
 ["실험을 다시 해 보겠습니다.","シロムル タシ ヘ ボゲッスムニダ","実験をもう一度やってみます。",""],
 ["연구실 세미나는 몇 시에 시작해요?","ヨングシル セミナヌン ミョッ シエ シジャケヨ","研究室のゼミは何時に始まりますか。","연구실=研究室。"],
 ["이 결과는 통계적으로 유의미합니다.","イ キョルグァヌン トンゲジョグロ ユイミハムニダ","この結果は統計的に有意です。",""],
 ["발표를 들어 주셔서 감사합니다.","パルピョルル トゥロ ジュショソ カムサハムニダ","発表を聞いていただき、ありがとうございました。",""]]);
XU('x-res-es1','研究者のスペイン語 研究室・学会','ACADEMIC SPANISH 1','es',[
 ["Hoy voy a presentar los resultados de nuestro estudio.","","今日は、私たちの研究結果を発表します。",""],
 ["Como se puede ver en este gráfico, la diferencia es clara.","","このグラフで分かるとおり、違いははっきりしています。","se puede=(一般に)〜できる。"],
 ["Muchas gracias por la pregunta.","","質問をありがとうございます。",""],
 ["¿Podría revisar el borrador de mi artículo?","","論文の下書きを見ていただけますか。","borrador=下書き。artículo=論文。"],
 ["Vamos a repetir el experimento mañana.","","明日、実験をもう一度行います。",""],
 ["El objetivo de este estudio es analizar los datos de diez años.","","この研究の目的は、10年分のデータを分析することです。","objetivo=目的。"],
 ["Una limitación del estudio es el tamaño de la muestra.","","この研究の限界は、サンプルの大きさです。","muestra=サンプル。"],
 ["Gracias por su atención.","","ご清聴ありがとうございました。",""]]);
XU('x-res-it1','研究者のイタリア語 研究室・学会','ACADEMIC ITALIAN 1','it',[
 ["Oggi presento i risultati della nostra ricerca.","","今日は、私たちの研究結果を発表します。",""],
 ["Come si vede in questo grafico, la differenza è chiara.","","このグラフで分かるとおり、違いははっきりしています。",""],
 ["Grazie per la domanda.","","質問をありがとうございます。",""],
 ["Professore, potrebbe leggere la bozza della mia tesi?","","先生、私の論文の下書きを読んでいただけますか。","bozza=下書き。tesi=論文。"],
 ["Ripeteremo l'esperimento domani.","","明日、実験をもう一度行います。",""],
 ["Lo scopo di questo studio è analizzare i dati raccolti.","","この研究の目的は、集めたデータを分析することです。","scopo=目的。"],
 ["Un limite dello studio è il numero ridotto di campioni.","","この研究の限界は、サンプル数が少ないことです。","campione=サンプル。"],
 ["Grazie per l'attenzione.","","ご清聴ありがとうございました。",""]]);
XU('x-ca1','客室乗務員の英語 面接','CABIN CREW INTERVIEW','en',[
 ["Why do you want to become a flight attendant?","","なぜ客室乗務員になりたいのですか。","面接でいちばんよく聞かれる質問。"],
 ["I enjoy helping people and working as part of a team.","","人の役に立つことと、チームで働くことが好きです。",""],
 ["Tell me about a time you dealt with a difficult customer.","","難しいお客様に対応した経験を話してください。","dealt with=〜に対応した(deal の過去形)。"],
 ["I stayed calm, listened carefully and offered a solution.","","落ち着いて、よく話を聞き、解決策を出しました。","経験は「状況→行動→結果」の順で話すと伝わります。"],
 ["What would you do if a passenger felt sick during the flight?","","飛行中に乗客の具合が悪くなったら、どうしますか。",""],
 ["I would make sure the passenger is comfortable and inform the senior crew.","","乗客を楽な姿勢にして、チーフに報告します。","senior crew=先任の乗務員。"],
 ["Why did you choose our airline?","","なぜ当社を選んだのですか。",""],
 ["Do you have any questions for us?","","最後に何か質問はありますか。","何か1つ質問を用意しておくと好印象です。"]]);
XU('x-ca2','客室乗務員の英語 機内アナウンス','CABIN ANNOUNCEMENTS','en',[
 ["Good morning, ladies and gentlemen. Welcome aboard.","","皆さま、おはようございます。ご搭乗ありがとうございます。","アナウンスの最初の決まり文句。最近は everyone も使います。"],
 ["Please make sure your seat belt is securely fastened.","","シートベルトをしっかりお締めください。",""],
 ["Please return your seat to the upright position.","","座席の背を元の位置にお戻しください。","upright=まっすぐ立てた。"],
 ["We will be serving drinks shortly.","","まもなくお飲み物をお配りします。","shortly=まもなく。"],
 ["We are now experiencing some turbulence.","","ただいま、揺れが続いております。","turbulence=乱気流による揺れ。"],
 ["Smoking is not permitted at any time during the flight.","","機内では、いかなる時も喫煙できません。",""],
 ["We will be landing in about twenty minutes.","","あと20分ほどで着陸いたします。",""],
 ["Thank you for flying with us today.","","本日はご搭乗ありがとうございました。",""]]);
XU('x-it1','ITエンジニアの英語 チームの会話','IT ENGLISH 1','en',[
 ["Yesterday I fixed the login bug, and today I'm working on the search feature.","","昨日はログインのバグを直して、今日は検索機能に取り組んでいます。","朝会(stand-up)の定番の型:昨日やったこと→今日やること。"],
 ["I'm blocked until the API is ready.","","APIができるまで、作業が止まっています。","blocked=進められない状態。朝会でよく使います。"],
 ["Could you review my pull request when you have a moment?","","時間があるときに、プルリクエストをレビューしてもらえますか。","pull request=コードの変更をチームに見てもらう依頼。"],
 ["I left a few comments on your code.","","あなたのコードに、いくつかコメントを残しました。",""],
 ["This function is a bit hard to read. Could we split it?","","この関数は少し読みにくいです。分けられますか。","レビューでは、相手を責めずにコードについて話すのがマナー。"],
 ["Let's pair on this after lunch.","","昼ごはんのあと、一緒にペアで作業しましょう。","pair=二人で一緒にプログラミングする。"],
 ["The tests are passing now.","","テストが通るようになりました。","passing=テストに合格している。"],
 ["I'll push the fix by the end of the day.","","今日中に修正をプッシュします。","push=変更をサーバーに送る。"]]);
XU('x-it2','ITエンジニアの英語 障害対応・面接','IT ENGLISH 2','en',[
 ["The website is down for some users.","","一部のユーザーで、サイトが表示されなくなっています。","down=止まっている。"],
 ["We rolled back the last release.","","最後のリリースを元に戻しました。","roll back=前の状態に戻す。"],
 ["The root cause was a missing database index.","","根本的な原因は、データベースのインデックスがなかったことでした。","root cause=根本原因。障害の報告書で必ず書きます。"],
 ["We'll add monitoring so this doesn't happen again.","","二度と起きないように、監視を追加します。",""],
 ["Can you walk me through your last project?","","前のプロジェクトについて、順を追って説明してもらえますか。","技術面接の定番の質問。walk through=順を追って説明する。"],
 ["I designed the backend and set up the deployment pipeline.","","バックエンドを設計して、デプロイの仕組みを作りました。",""],
 ["If I were to do it again, I would write more tests.","","もう一度やるなら、テストをもっと書きます。","振り返りを話せると、面接で評価されます。"],
 ["What does your team's code review process look like?","","チームのコードレビューは、どのように進めていますか。","面接の最後に、こちらから聞く質問の例。"]]);
XU('x-beauty1','美容師の英語 カウンセリング','SALON ENGLISH 1','en',[
 ["What would you like to have done today?","","今日はどうなさいますか。","カウンセリングの最初の一言。"],
 ["How much would you like me to take off?","","どのくらい切りますか。","take off=(髪を)切って短くする。"],
 ["Do you have a photo of the style you want?","","なりたいスタイルの写真はありますか。","写真を見せてもらうと、イメージのずれが減ります。"],
 ["Would you like to keep the length?","","長さはそのままにしますか。",""],
 ["Shall I thin it out a little?","","少しすきましょうか。","thin out=量を減らす(すく)。"],
 ["Do you usually part your hair on the left?","","いつも分け目は左ですか。","part=分け目をつける。"],
 ["Have you had a color in the last few months?","","ここ数か月でカラーはしましたか。","カラーの前に、薬剤の履歴を確認します。"],
 ["Please let me know if the water is too hot.","","お湯が熱すぎたら教えてください。","シャンプーのときの決まった声かけ。"]]);
XU('x-beauty2','美容師の英語 施術とアフターケア','SALON ENGLISH 2','en',[
 ["I'm going to apply the color now.","","これからカラー剤を塗りますね。","施術の前に、何をするか伝えます。"],
 ["We need to leave it on for about thirty minutes.","","30分ほど置きますね。","leave it on=つけたままにする。"],
 ["Let me know if your scalp feels itchy.","","頭皮がかゆくなったら教えてください。","scalp=頭皮。安全のための大事な一言。"],
 ["How does it look from the back?","","後ろはこんな感じです。いかがですか。","鏡で後ろを見せながら確認します。"],
 ["Use a color-safe shampoo to keep the color longer.","","色を長持ちさせるには、カラー用シャンプーを使ってください。",""],
 ["Try not to wash your hair until tomorrow.","","髪は明日まで洗わないようにしてください。",""],
 ["Would you like to book your next appointment?","","次の予約を取りますか。","book=予約する。"],
 ["Thank you. I hope you enjoy your new look!","","ありがとうございました。新しいスタイルを楽しんでくださいね!",""]]);
XU('x-sport1','スポーツ選手の英語 チーム・練習','SPORTS ENGLISH 1','en',[
 ["I'm happy to join the team.","","チームに加われてうれしいです。","入団のあいさつの定番。"],
 ["Where should I stand in this drill?","","この練習では、どこに立てばいいですか。","drill=決まった形の練習メニュー。"],
 ["Could you show me that move again?","","その動きを、もう一度見せてもらえますか。",""],
 ["I'm open! Pass the ball!","","フリーだよ!パスして!","open=マークされていない。試合中の短い声かけ。"],
 ["Man on!","","後ろから来てるよ!","サッカーなどで、相手が近づいていることを味方に伝える声。"],
 ["What time is training tomorrow?","","明日の練習は何時ですか。","イギリスでは練習を training、アメリカでは practice と言うことが多いです。"],
 ["I need to work on my first touch.","","最初のボールタッチをもっと練習しないと。","work on=〜を練習して良くする。"],
 ["Good game, everyone!","","みんな、いい試合だったね!","試合のあとのあいさつ。"]]);
XU('x-sport2','スポーツ選手の英語 ケガ・インタビュー','SPORTS ENGLISH 2','en',[
 ["I felt something in my hamstring.","","太ももの裏に違和感がありました。","hamstring=太ももの裏の筋肉。"],
 ["It hurts when I put weight on it.","","体重をかけると痛みます。","トレーナーに症状を伝えるときの言い方。"],
 ["How long will I be out?","","どのくらい試合に出られませんか。","be out=(ケガで)離脱している。"],
 ["I'm feeling much better and ready to play.","","だいぶ良くなって、試合に出られます。",""],
 ["It was a tough match, but we never gave up.","","厳しい試合でしたが、最後まであきらめませんでした。","インタビューの定番の答え方。"],
 ["The fans gave us a lot of energy today.","","今日はファンのみなさんからたくさん力をもらいました。",""],
 ["We need to focus on the next game.","","次の試合に集中しないといけません。",""],
 ["I want to keep improving and help the team win.","","もっと成長して、チームの勝利に貢献したいです。",""]]);
ORDER.forEach(function(l){ALL_IDS[l]=Object.keys(UNITS[l]);});

/* banks (ビジネス = tier 2, like ICAO) */
XBANK.icao.ids.push('x-icao2');
[['aero','en','航空無線通信士(英語)',['x-aero1']],['oet','en','OET',['x-oet1','x-oet2']],['oetph','en','OET(薬剤師)',['x-oetph1']],
 ['toles','en','TOLES',['x-toles1']],['bec','en','ケンブリッジ英検ビジネス',['x-bec1']],['servsafe','en','ServSafe Food Handler',['x-servsafe1']],
 ['celta','en','CELTA・TEFL',['x-celta1']],['kanko','en','観光英語検定',['x-kanko1']],['guide-en','en','全国通訳案内士(英語)',['x-guide1']],
 ['guide-ko','ko','全国通訳案内士(韓国語)',['x-guide-ko1']],['guide-es','es','全国通訳案内士(スペイン語)',['x-guide-es1']],['guide-it','it','全国通訳案内士(イタリア語)',['x-guide-it1']],
 ['acad-en','en','IELTS(研究・大学院)',['x-res1','x-res2']],['acad-ko','ko','TOPIK(研究・大学院)',['x-res-ko1']],['acad-es','es','DELE(研究・大学院)',['x-res-es1']],
 ['acad-it','it','CILS(研究・大学院)',['x-res-it1']],['crew','en','TOEIC(客室乗務員)',['x-ca1','x-ca2']],
 ['it-en','en','ITエンジニアの英語',['x-it1','x-it2']],['beauty-en','en','美容師の英語',['x-beauty1','x-beauty2']],['sport-en','en','スポーツ選手の英語',['x-sport1','x-sport2']]
].forEach(function(b){XBANK[b[0]]={L:b[1],name:b[2],tier:2,ids:b[3],key:b[0]};});
Object.keys(XBANK).forEach(function(k){XBANK[k].ids.forEach(function(u){XBANK_OF[u]=k;});});

/* each certificate: the group in the 一覧 and the kind in 目標を選ぶ */
var JOBX_C={
  icao:{title:'航空英語(ICAO)',sub:'パイロットや管制官に必要な英語',pre:'ICAO ',gsub:'パイロット・管制官に必要なのはレベル4以上',goals:[['レベル4','icao'],['レベル5','icao'],['レベル6','icao']]},
  aero:{title:'航空無線通信士(英語)',sub:'国際線の無線の英語(筆記と会話)',pre:'航空無線通信士 ',gsub:'国家資格。英語は筆記と会話',goals:[['英語','aero']]},
  oet:{title:'OET(医療英語)',sub:'医師・看護師が海外で働くための英語試験',pre:'OET ',gsub:'登録の目安はグレードB以上が多い',goals:[['グレードB','oet'],['グレードA','oet']]},
  oetph:{title:'OET(薬剤師)',sub:'薬剤師が海外で働くための英語試験',pre:'OET 薬剤師 ',gsub:'登録の目安はグレードB以上が多い',goals:[['グレードB','oetph'],['グレードA','oetph']]},
  toles:{title:'TOLES(法律英語)',sub:'契約書や法律の英語の試験',pre:'TOLES ',gsub:'3つのレベル',goals:[['Foundation','toles'],['Higher','toles'],['Advanced','toles']]},
  bec:{title:'ケンブリッジ英検ビジネス',sub:'会議・メール・報告の英語',pre:'ケンブリッジ英検ビジネス ',gsub:'B1〜C1の3つのレベル',goals:[['B1 Preliminary','bec'],['B2 Vantage','bec'],['C1 Higher','bec']]},
  servsafe:{title:'ServSafe Food Handler',sub:'アメリカの飲食店で働くための食品衛生の資格',pre:'',gsub:'英語の筆記試験',goals:[['ServSafe Food Handler','servsafe']]},
  celta:{title:'CELTA・TEFL',sub:'英語を教える仕事の資格',pre:'',gsub:'海外で英語の先生になるときに求められる資格',goals:[['TEFL','celta'],['CELTA','celta']]},
  kanko:{title:'観光英語検定',sub:'観光の仕事で使う英語(3級〜1級)',pre:'観光英語検定 ',gsub:'目標の級',goals:[['3級','kanko'],['2級','kanko'],['1級','kanko']]},
  'guide-en':{title:'全国通訳案内士(英語)',sub:'外国人に日本を案内する国家資格',pre:'全国通訳案内士 ',gsub:'国家資格',goals:[['英語','guide-en']]},
  'guide-ko':{title:'全国通訳案内士(韓国語)',sub:'外国人に日本を案内する国家資格',pre:'全国通訳案内士 ',gsub:'国家資格',goals:[['韓国語','guide-ko']]},
  'guide-es':{title:'全国通訳案内士(スペイン語)',sub:'外国人に日本を案内する国家資格',pre:'全国通訳案内士 ',gsub:'国家資格',goals:[['スペイン語','guide-es']]},
  'guide-it':{title:'全国通訳案内士(イタリア語)',sub:'外国人に日本を案内する国家資格',pre:'全国通訳案内士 ',gsub:'国家資格',goals:[['イタリア語','guide-it']]},
  'acad-en':{title:'IELTS(研究・大学院)',sub:'学会発表・論文・研究室の英語',pre:'IELTS ',gsub:'海外の大学院は6.5〜7.0が目安(イギリスは7.0〜7.5)',goals:[['6.5','acad-en'],['7.0','acad-en']]},
  'acad-ko':{title:'TOPIK(研究・大学院)',sub:'研究室・学会の韓国語',pre:'TOPIK ',gsub:'韓国語で学ぶ大学院は3〜4級以上が目安(大学によって違います)',goals:[['3級','acad-ko'],['4級','acad-ko']]},
  'acad-es':{title:'DELE(研究・大学院)',sub:'研究室・学会のスペイン語',pre:'DELE ',gsub:'スペイン語で学ぶ大学院はB2以上が目安',goals:[['B2','acad-es'],['C1','acad-es']]},
  'acad-it':{title:'CILS(研究・大学院)',sub:'研究室・学会のイタリア語',pre:'CILS ',gsub:'イタリア語で学ぶ大学院はB2以上が目安',goals:[['B2','acad-it'],['C1','acad-it']]},
  crew:{title:'TOEIC(客室乗務員)',sub:'英語面接・機内アナウンス',pre:'TOEIC ',gsub:'日本の航空会社は600点前後が応募の目安(700点以上の会社も)',goals:[['600点','crew'],['700点','crew']]},
  /* jobs with no language certificate: practice only (no 目標) */
  'it-en':{title:'ITエンジニアの英語',sub:'朝会・コードレビュー・障害対応・技術面接 ・ 公式の資格ではありません',practice:true},
  'beauty-en':{title:'美容師の英語',sub:'カウンセリング・施術の説明・アフターケア ・ 公式の資格ではありません',practice:true},
  'sport-en':{title:'スポーツ選手の英語',sub:'チームの会話・ケガの説明・インタビュー ・ 公式の資格ではありません',practice:true}
};
var JOBX={pilot:{en:['icao','aero']},med:{en:['oet']},pharm:{en:['oetph']},law:{en:['toles']},biz:{en:['bec']},chef:{en:['servsafe']},teach:{en:['celta']},
  hosp:{en:['kanko','guide-en'],ko:['guide-ko'],es:['guide-es'],it:['guide-it']},
  lab:{en:['acad-en'],ko:['acad-ko'],es:['acad-es'],it:['acad-it']},crew:{en:['crew']},
  it:{en:['it-en']},beauty:{en:['beauty-en']},sport:{en:['sport-en']}};
var JOBX_EX0={},JOBX_XG0={};
Object.keys(EXAMS).forEach(function(L){JOBX_EX0[L]=EXAMS[L].filter(function(g){return g.key!=='icao';});});
Object.keys(XGOALS).forEach(function(L){JOBX_XG0[L]=XGOALS[L].filter(function(k){return k.key!=='icao';});});
function jobxList(L){var j=JOBX[save.prof];return (j&&j[L])||[];}
function jobxApply(){
  Object.keys(JOBX_EX0).forEach(function(L){
    var ks=jobxList(L);
    EXAMS[L]=JOBX_EX0[L].concat(ks.map(function(k){var c=JOBX_C[k];return {key:'job-'+k,title:c.title,sub:c.sub,ids:XBANK[k].ids.slice()};}));
    XGOALS[L]=JOBX_XG0[L].concat(ks.filter(function(k){return !JOBX_C[k].practice;}).map(function(k){var c=JOBX_C[k];return {key:k,title:c.title,pre:c.pre,sub:c.gsub,goals:c.goals};}));
  });
}
jobxApply();
(function(){
  var r0=render;render=function(){jobxApply();return r0.apply(this,arguments);};
  if(typeof examHomeHTML!=='function')return;
  var e0=examHomeHTML;
  examHomeHTML=function(L){
    jobxApply();
    var h=e0.apply(this,arguments);
    if(!h||save.mode!=='exam')return h;
    var p=profById(save.prof),ks=jobxList(L),line;
    if(!p)line='職業モードで職業を選ぶと、その職業の資格もここに並びます。';
    else if(ks.length&&ks.every(function(k){return JOBX_C[k].practice;}))line='「'+p.jp+'」には語学の資格がないので、仕事の場面の練習を入れています(公式の資格ではありません)。';
    else if(ks.length)line='「'+p.jp+'」の資格: '+ks.map(function(k){return JOBX_C[k].title;}).join('・')+'(職業は職業モードで変えられます)';
    else line='「'+p.jp+'」の'+(L==='en'?'英語の':'')+'資格は準備中です。';
    if(L==='en')h=h.replace('TOEFL®</span>','TOEFL®・OET・TOLES・Cambridge English・ServSafe・CELTA</span>');
    var i=h.lastIndexOf('<p class="exam-tm">');
    return i<0?h:h.slice(0,i)+'<p class="dim hint jobx-line">💼 '+esc(line)+'</p>'+h.slice(i);
  };
})();
