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
XU('x-icao3','ICAO航空英語 ステップ3','ICAO ENGLISH 3','en',[
 ["We are unable to start engine number two.","","2番エンジンを始動できません。","unable to 〜=〜できない。無線でよく使う言い方。"],
 ["Request to return to the stand.","","駐機場に戻る許可をお願いします。","stand=駐機場(スポット)。"],
 ["There is a vehicle blocking the taxiway.","","誘導路をふさいでいる車両があります。","taxiway=誘導路。"],
 ["We need a few more minutes to complete our checks.","","点検を終えるのに、あと数分必要です。",""],
 ["Our departure is delayed due to a technical problem.","","機材の不具合で出発が遅れています。",""],
 ["We have a passenger who needs to disembark.","","降機が必要な乗客がいます。","disembark=(飛行機から)降りる。"],
 ["Ready for departure in two minutes.","","2分で出発の準備ができます。",""],
 ["We are rejecting takeoff.","","離陸を中止します。","reject takeoff=離陸中止(滑走中にやめる)。"]]);
XU('x-icao4','ICAO航空英語 ステップ4','ICAO ENGLISH 4','en',[
 ["We would like to climb to avoid the turbulence.","","乱気流を避けるために上昇したいです。",""],
 ["Moderate icing reported at flight level one two zero.","","フライトレベル120で、中程度の着氷の報告があります。","icing=機体に氷がつくこと。"],
 ["We are deviating twenty miles left of track due to weather.","","悪天候のため、航路の左へ20マイルそれて飛行しています。","deviate=航路からそれる。"],
 ["Thunderstorms are building ahead of us.","","前方で雷雲が発達しています。",""],
 ["Visibility at the airport has dropped to five hundred meters.","","空港の視程が500メートルまで下がりました。","visibility=視程(見通せる距離)。"],
 ["Request descent due to a pressurization problem.","","与圧の不具合のため、降下の許可をお願いします。","pressurization=与圧(機内の気圧を保つこと)。"],
 ["We are low on fuel and need to land soon.","","燃料が少なくなってきたので、早めに着陸する必要があります。",""],
 ["Is there any report of volcanic ash in the area?","","この空域で火山灰の報告はありますか。",""]]);
XU('x-icao5','ICAO航空英語 ステップ5','ICAO ENGLISH 5','en',[
 ["We are going around.","","着陸をやり直します。","go around=着陸復行(着陸をやめて上昇し、やり直す)。"],
 ["The runway is not in sight.","","滑走路が見えません。","in sight=見えている。"],
 ["We have a problem with our landing gear.","","着陸装置(車輪)に問題があります。","landing gear=着陸装置。"],
 ["Mayday, mayday, mayday, engine fire.","","メーデー、メーデー、メーデー、エンジン火災。","Mayday=遭難信号。命に関わる緊急事態で3回言います。"],
 ["Pan-pan, pan-pan, pan-pan, a crew member is injured.","","パンパン、パンパン、パンパン、乗務員がけがをしました。","Pan-pan=緊急だが命にすぐは関わらないとき。Mayday より一段下です。"],
 ["We will need medical assistance on arrival.","","到着時に医療の手配が必要です。",""],
 ["We are evacuating the aircraft on the runway.","","滑走路上で機体から緊急脱出します。","evacuate=(乗客を)緊急脱出させる。"],
 ["Request the full length of the runway.","","滑走路を端から全部使わせてください。","full length=滑走路の全長(途中から入らない)。"]]);
XU('x-aero1','航空無線通信士 英語 ステップ1','AERO RADIO 1','en',[
 ["Tokyo Ground, Japan Air 123, request taxi.","","東京グランド、ジャパンエア123便、地上走行の許可をお願いします。","request taxi=タキシング(地上走行)の許可を求める。最初に相手、次に自分のコールサイン。"],
 ["Taxi to holding point runway three four right.","","滑走路34Rの停止位置まで地上走行してください。","数字は1つずつ読みます(three four)。right=Rの滑走路。"],
 ["Line up and wait.","","滑走路に入って待機してください。",""],
 ["Cleared for takeoff.","","離陸を許可します。","離陸の許可だけに使う言い方。"],
 ["Climb and maintain flight level two four zero.","","上昇して、フライトレベル240を維持してください。","flight level=高度の単位(100フィートごと)。"],
 ["Contact Tokyo Control on one two four decimal one.","","東京コントロールの124.1に連絡してください。","decimal=小数点。"],
 ["Roger.","","受信しました。","Roger は「聞こえた」だけの意味。従うかどうかは含みません。"],
 ["Wilco.","","了解、指示に従います。","will comply の略。Roger とのちがいは試験でよく問われます。"]]);
XU('x-aero2','航空無線通信士 英語 ステップ2','AERO RADIO 2','en',[
 ["Request start-up.","","エンジン始動の許可をお願いします。","start-up=エンジン始動。"],
 ["Start-up approved.","","エンジン始動を許可します。",""],
 ["Push back approved, facing south.","","プッシュバックを許可します。機首は南向きです。","push back=車で機体を後ろへ押し出すこと。"],
 ["Hold short of runway three four left.","","滑走路34Lの手前で待機してください。","hold short of 〜=〜の手前で止まる。"],
 ["Cross runway three four left.","","滑走路34Lを横断してください。",""],
 ["Ready for departure.","","出発準備完了です。","ready for takeoff ではなく ready for departure と言います。"],
 ["Wind three one zero degrees, eight knots.","","風は310度から8ノットです。","風向は3けたの数字を1つずつ読みます。"],
 ["After departure, turn right heading zero nine zero.","","離陸後、右旋回して針路090にしてください。","heading=機首の向き(針路)。"]]);
XU('x-aero3','航空無線通信士 英語 ステップ3','AERO RADIO 3','en',[
 ["Report passing flight level one five zero.","","フライトレベル150を通過したら報告してください。","passing=通過中。"],
 ["Maintain flight level three five zero.","","フライトレベル350を維持してください。",""],
 ["Request direct to Osaka.","","大阪への直行をお願いします。","direct to 〜=途中の地点を飛ばして〜へまっすぐ飛ぶ。"],
 ["Squawk two three four five.","","トランスポンダーを2345にセットしてください。","squawk=トランスポンダー(識別信号)のコードを設定する。"],
 ["Radar contact.","","レーダーで捕捉しました。",""],
 ["Say again your callsign.","","コールサインをもう一度言ってください。","callsign=無線での呼び出し名(便名など)。"],
 ["Descend and maintain flight level two zero zero.","","降下して、フライトレベル200を維持してください。",""],
 ["Expect further climb in ten minutes.","","10分後にさらに上昇の予定です。","expect=予定しておく(まだ許可ではありません)。"]]);
XU('x-aero4','航空無線通信士 英語 ステップ4','AERO RADIO 4','en',[
 ["Information Bravo received.","","情報ブラボーを受信しました。","空港の気象・運用情報(ATIS)はアルファベットの名前で呼ばれます。"],
 ["Cleared ILS approach runway three four right.","","滑走路34RへのILS進入を許可します。","ILS=計器着陸装置。電波で着陸の進路を示します。"],
 ["Reduce speed to one eight zero knots.","","速度を180ノットに落としてください。",""],
 ["Turn left heading two seven zero.","","左旋回して針路270にしてください。",""],
 ["Descend to three thousand feet, QNH one zero one three.","","3000フィートまで降下してください。QNH1013です。","QNH=高度計を合わせる気圧の値。"],
 ["Established on the localizer.","","ローカライザー(進入コース)に乗りました。","localizer=ILSの左右のコースを示す電波。"],
 ["Contact Tower one one eight decimal one.","","タワーの118.1に連絡してください。",""],
 ["Continue approach, number two.","","進入を続けてください。2番目です。","number two=着陸の順番が2番目。"]]);
XU('x-aero5','航空無線通信士 英語 ステップ5','AERO RADIO 5','en',[
 ["Cleared to land runway three four right.","","滑走路34Rへの着陸を許可します。","着陸の許可は cleared to land。"],
 ["Vacate the runway via taxiway Charlie.","","誘導路チャーリーから滑走路を出てください。","vacate=(滑走路から)出る。"],
 ["Go around, I say again, go around.","","ゴーアラウンド、くり返します、ゴーアラウンド。","大事な指示は I say again でくり返します。"],
 ["Read back correct.","","復唱は正しいです。","read back=指示を復唱すること。"],
 ["Negative.","","いいえ(違います)。","無線では No ではなく Negative。"],
 ["Affirm.","","はい(そうです)。","無線では Yes ではなく Affirm。"],
 ["Standby.","","お待ちください。","すぐに答えられないときに使います。"],
 ["Monitor Ground on one two one decimal seven.","","グランドの121.7を聞いていてください。","monitor=こちらから呼ばずに聞いておく。contact との違いに注意。"]]);
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
XU('x-oet3','OET 病棟の英語','OET WARD','en',[
 ["I'm the nurse looking after you today.","","今日担当の看護師です。","look after=世話をする、担当する。"],
 ["I need to take your temperature and blood pressure.","","体温と血圧を測りますね。",""],
 ["Can you tell me your full name and date of birth?","","フルネームと生年月日を教えてください。","取り違えを防ぐための本人確認の決まり文句。"],
 ["Press this button if you need any help.","","何かあれば、このボタンを押してください。",""],
 ["You shouldn't eat or drink anything before the operation.","","手術の前は、何も食べたり飲んだりしないでください。",""],
 ["The doctor will see you during the ward round.","","回診のときに医師が診察します。","ward round=病棟の回診。"],
 ["Let me help you sit up.","","起き上がるのを手伝いますね。",""],
 ["How is your pain compared to yesterday?","","昨日と比べて、痛みはどうですか。",""]]);
XU('x-oet4','OET 説明と同意','OET CONSENT','en',[
 ["I'd like to explain the procedure before we start.","","始める前に、処置について説明させてください。",""],
 ["There is a small risk of infection.","","感染のリスクが少しあります。",""],
 ["Most patients recover within a week.","","ほとんどの患者さんは1週間以内に回復します。",""],
 ["Do you understand what I've explained so far?","","ここまでの説明は分かりましたか。","理解の確認。OETで評価されるポイントです。"],
 ["You can change your mind at any time.","","いつでも考えを変えて大丈夫です。",""],
 ["We'll need your written consent.","","書面での同意が必要です。","consent=同意。"],
 ["It's completely normal to feel anxious.","","不安になるのはまったく普通のことです。",""],
 ["Would you like a family member to be present?","","ご家族に立ち会ってもらいたいですか。",""]]);
XU('x-oet5','OET 救急の英語','OET EMERGENCY','en',[
 ["Can you hear me? Open your eyes.","","聞こえますか。目を開けてください。",""],
 ["When did the symptoms start?","","症状はいつ始まりましたか。",""],
 ["Does the pain spread to your arm or jaw?","","痛みは腕やあごに広がりますか。","胸痛で心臓の病気を疑うときの質問。"],
 ["We're going to give you some oxygen.","","酸素を吸ってもらいますね。",""],
 ["Have you had any recent surgery?","","最近、手術を受けましたか。",""],
 ["Try to stay still for me.","","できるだけ動かないでくださいね。",""],
 ["We need to run some blood tests.","","いくつか血液検査をする必要があります。",""],
 ["Your results are back, and they look normal.","","結果が出ましたが、正常のようです。",""]]);
XU('x-oetph1','OET 薬剤師の英語','OET PHARMACY','en',[
 ["Take one tablet twice a day with food.","","1日2回、食事と一緒に1錠飲んでください。",""],
 ["This medicine may make you feel drowsy.","","この薬で眠くなることがあります。","drowsy=眠い。"],
 ["Please avoid alcohol while taking this medication.","","この薬を飲んでいる間は、お酒を控えてください。",""],
 ["Have you taken this medicine before?","","この薬を飲んだことはありますか。",""],
 ["It's important to finish the whole course of antibiotics.","","抗菌薬は最後まで飲み切ることが大切です。","course=決められた期間の服用。"],
 ["Let me check for any interactions with your other medicines.","","ほかのお薬との飲み合わせを確認しますね。","interaction=相互作用(飲み合わせ)。"],
 ["If you miss a dose, take it as soon as you remember.","","飲み忘れたら、気づいたときに飲んでください。","実際の説明は薬によってちがい、「次の時間が近ければ1回とばす」などが続くこともあります。"],
 ["Do you have any questions about using your inhaler?","","吸入器の使い方で、何か質問はありますか。","inhaler=吸入器。"]]);
XU('x-oetph2','OET 薬剤師 処方箋の受付','OET PHARMACY 2','en',[
 ["Can I take your prescription, please?","","処方箋をお預かりしてもいいですか。",""],
 ["It'll be ready in about fifteen minutes.","","15分ほどでご用意できます。",""],
 ["Is this medicine for you or someone else?","","このお薬はご本人用ですか、ほかの方用ですか。",""],
 ["Do you have any other medical conditions?","","ほかに持病はありますか。","medical condition=持病、病気。"],
 ["Are you pregnant or breastfeeding?","","妊娠中、または授乳中ですか。","薬を出す前の大切な確認。"],
 ["This is a generic version of your usual medicine.","","これはいつものお薬のジェネリック版です。","generic=後発医薬品(ジェネリック)。"],
 ["The active ingredient is the same.","","有効成分は同じです。",""],
 ["Please keep it out of the reach of children.","","子どもの手の届かないところに保管してください。",""]]);
XU('x-oetph3','OET 薬剤師 飲み方と副作用','OET PHARMACY 3','en',[
 ["Take it on an empty stomach.","","空腹時に飲んでください。","on an empty stomach=空腹時に。"],
 ["Swallow the tablet whole; don't crush it.","","錠剤はくだかずに、そのまま飲み込んでください。",""],
 ["Store it in the fridge.","","冷蔵庫で保管してください。",""],
 ["A common side effect is an upset stomach.","","よくある副作用は、胃のむかつきです。","side effect=副作用。"],
 ["Stop taking it and see a doctor if you get a rash.","","発疹が出たら、飲むのをやめて医師に診てもらってください。",""],
 ["Don't drive if it makes you sleepy.","","眠くなったら、運転しないでください。",""],
 ["Avoid grapefruit juice with this medicine.","","このお薬とグレープフルーツジュースは一緒にとらないでください。","飲み合わせの代表例。"],
 ["Space the doses evenly throughout the day.","","1日の中で、間隔をあけて均等に飲んでください。",""]]);
XU('x-oetph4','OET 薬剤師 医師・病棟との連絡','OET PHARMACY 4','en',[
 ["The patient is allergic to penicillin.","","その患者さんはペニシリンにアレルギーがあります。",""],
 ["I'd like to clarify the dose on this prescription.","","この処方箋の量を確認させてください。","clarify=はっきりさせる(疑義照会)。"],
 ["The dose seems too high for a child of this weight.","","この体重のお子さんには、量が多すぎるようです。",""],
 ["Could we switch to a liquid form?","","液剤に変えられますか。",""],
 ["This drug interacts with warfarin.","","この薬はワルファリンと相互作用があります。","interact with 〜=〜と相互作用する。"],
 ["Kidney function should be monitored.","","腎機能を経過観察する必要があります。",""],
 ["The medication was discontinued yesterday.","","その薬は昨日中止されました。","discontinue=中止する。"],
 ["Please update the patient's medication chart.","","患者さんの投薬記録を更新してください。",""]]);
XU('x-oetph5','OET 薬剤師 市販薬の相談','OET PHARMACY 5','en',[
 ["How long have you had these symptoms?","","その症状はどのくらい続いていますか。",""],
 ["This cough syrup is suitable for adults.","","この咳止めシロップは大人向けです。",""],
 ["I'd recommend seeing your doctor if it doesn't improve.","","よくならなければ、医師に診てもらうことをおすすめします。",""],
 ["This cream should be applied twice a day.","","このクリームは1日2回塗ってください。","apply=(薬を)塗る。"],
 ["Drink plenty of fluids and get some rest.","","水分を多くとって、休んでください。",""],
 ["Don't take more than eight tablets in twenty-four hours.","","24時間で8錠を超えて飲まないでください。",""],
 ["This one doesn't cause drowsiness.","","こちらは眠くなりません。",""],
 ["Is there anything else I can help you with?","","ほかに何かお手伝いできることはありますか。",""]]);
XU('x-toles1','TOLES 契約の英語','TOLES CONTRACTS','en',[
 ["The contract shall be governed by the laws of England.","","この契約は、英国の法律に準拠するものとします。","shall=契約書で「〜するものとする」(義務・決まり)。"],
 ["Either party may terminate this agreement with thirty days' notice.","","いずれの当事者も、30日前の通知でこの契約を解除できます。","party=当事者。terminate=終了させる。"],
 ["The seller warrants that the goods are free from defects.","","売主は、商品に欠陥がないことを保証します。","warrant=保証する。"],
 ["This clause shall survive the termination of the agreement.","","この条項は、契約が終わったあとも効力を持つものとします。","survive=(契約終了後も)効力が続く。"],
 ["The parties agree to keep this information confidential.","","両当事者は、この情報を秘密にすることに同意します。",""],
 ["The claimant is seeking damages for breach of contract.","","原告は、契約違反による損害賠償を求めています。","claimant=原告(英国)。damages=損害賠償金(複数形で)。"],
 ["Any dispute shall be referred to arbitration.","","紛争はすべて仲裁で解決するものとします。","arbitration=仲裁(裁判の代わりの解決方法)。"],
 ["We look forward to receiving your instructions.","","ご依頼をお待ちしております。","instructions=(依頼人から弁護士への)依頼・指示。"]]);
XU('x-toles2','TOLES 契約書の条項','TOLES CLAUSES','en',[
 ["This agreement shall commence on the date of signing.","","この契約は署名の日に始まるものとします。","shall=契約書で「〜するものとする」(義務・規定)。"],
 ["Payment shall be made within thirty days of the invoice date.","","支払いは請求日から30日以内に行うものとします。",""],
 ["The supplier shall not be liable for indirect losses.","","供給者は間接的な損害について責任を負わないものとします。","liable for 〜=〜に法的責任がある。"],
 ["Neither party may assign this agreement without consent.","","いずれの当事者も、同意なしにこの契約を譲渡できません。","assign=(権利などを)譲渡する。"],
 ["Time is of the essence in this contract.","","この契約では、期限を守ることが重要な条件です。","Time is of the essence=期限の厳守が契約の本質である(決まった言い方)。"],
 ["This agreement constitutes the entire agreement between the parties.","","この契約は、当事者間の合意のすべてです。","完全合意条項(entire agreement clause)。"],
 ["Any amendment must be made in writing.","","変更はすべて書面で行わなければなりません。","amendment=変更、修正。"],
 ["Notices shall be sent to the addresses set out above.","","通知は、上記の住所に送るものとします。",""]]);
XU('x-toles3','TOLES 依頼人との面談','TOLES CLIENTS','en',[
 ["Thank you for instructing us in this matter.","","本件をご依頼いただきありがとうございます。","instruct=(弁護士に)依頼する。"],
 ["I'd like to go through the facts of the case.","","事件の事実関係を確認させてください。",""],
 ["Do you have a copy of the contract with you?","","契約書の写しをお持ちですか。",""],
 ["Our fees are charged on an hourly basis.","","弁護士費用は時間単位でいただきます。","on an hourly basis=時間制で。"],
 ["Everything you tell me is confidential.","","お話しいただくことはすべて秘密にします。",""],
 ["I would advise you not to sign anything yet.","","まだ何にも署名しないことをおすすめします。",""],
 ["We will send you a letter setting out our advice.","","私たちの助言をまとめた書面をお送りします。",""],
 ["Please let us know if your circumstances change.","","状況が変わったらお知らせください。",""]]);
XU('x-toles4','TOLES 訴訟と紛争','TOLES LITIGATION','en',[
 ["The defendant denies all the allegations.","","被告はすべての主張を否認しています。","defendant=被告、allegation=(立証前の)主張。"],
 ["We intend to file a claim in the High Court.","","高等法院に訴えを起こすつもりです。","file a claim=訴えを起こす。"],
 ["The case was settled out of court.","","その事件は裁判外で和解しました。","settle out of court=裁判外で和解する。"],
 ["The burden of proof lies with the claimant.","","立証責任は原告にあります。","burden of proof=立証責任。"],
 ["The court awarded damages of fifty thousand pounds.","","裁判所は5万ポンドの損害賠償を認めました。",""],
 ["We are considering an appeal.","","上訴を検討しています。","appeal=上訴(控訴・上告)。"],
 ["The limitation period is six years.","","時効の期間は6年です。","limitation period=出訴期限(時効)。"],
 ["Mediation could save both time and money.","","調停なら時間と費用の両方を節約できるでしょう。","mediation=調停(第三者が間に入る話し合い)。"]]);
XU('x-toles5','TOLES 会社法と法律文書','TOLES COMPANY LAW','en',[
 ["The board of directors approved the merger.","","取締役会は合併を承認しました。","board of directors=取締役会、merger=合併。"],
 ["Shareholders have the right to vote at general meetings.","","株主には株主総会で投票する権利があります。",""],
 ["The company must file its accounts every year.","","会社は毎年決算書類を提出しなければなりません。",""],
 ["The director owes a duty of care to the company.","","取締役は会社に対して注意義務を負っています。","owe a duty of care=注意義務を負う。"],
 ["Please find enclosed a draft of the agreement.","","契約書の草案を同封いたします。","enclosed=同封の。"],
 ["We would be grateful for your comments by Friday.","","金曜日までにご意見をいただければ幸いです。",""],
 ["We look forward to hearing from you.","","ご連絡をお待ちしております。","手紙・メールの結びの定番。"],
 ["Yours sincerely,","","敬具","相手の名前で始めた手紙の結び。Dear Sir or Madam で始めたら Yours faithfully。"]]);
XU('x-bec1','ビジネス英語 会議とメール','BUSINESS ENGLISH 1','en',[
 ["Let's move on to the next item on the agenda.","","議題の次の項目に移りましょう。","agenda=議題(のリスト)。"],
 ["Could you give us an update on the project?","","プロジェクトの最新の状況を教えてもらえますか。",""],
 ["Sales rose by ten percent in the third quarter.","","第3四半期の売上は10%伸びました。","quarter=四半期。rise by=〜だけ増える。"],
 ["I'm afraid we need to postpone the meeting.","","申し訳ありませんが、会議を延期する必要があります。","I'm afraid=言いにくいことの前に。"],
 ["Please find attached the report you requested.","","ご依頼の報告書を添付しました。","メールの決まり文句。"],
 ["We should consider the costs before making a decision.","","決める前に、費用を検討するべきです。",""],
 ["I'd like to propose a different approach.","","別のやり方を提案したいです。",""],
 ["Thank you for your prompt reply.","","早速のお返事、ありがとうございます。","prompt=すばやい。"]]);
XU('x-bec2','ビジネス英語 電話','BUSINESS ENGLISH 2','en',[
 ["Could I speak to someone in the sales department?","","営業部の方とお話しできますか。",""],
 ["I'm afraid she's on another line at the moment.","","あいにく彼女は今、別の電話に出ています。","on another line=別の電話に出ている。"],
 ["Would you like to leave a message?","","伝言を残されますか。",""],
 ["Could you spell your surname, please?","","名字のつづりを教えていただけますか。",""],
 ["I'll put you through now.","","今おつなぎします。","put through=(電話を)つなぐ。"],
 ["Sorry, the line is breaking up.","","すみません、電話が途切れています。","break up=(電話の声が)途切れる。"],
 ["I'm calling to confirm our appointment.","","お約束の確認でお電話しました。",""],
 ["Thanks for calling. Goodbye.","","お電話ありがとうございました。失礼します。",""]]);
XU('x-bec3','ビジネス英語 交渉','BUSINESS ENGLISH 3','en',[
 ["What kind of discount could you offer?","","どのくらいの値引きをしていただけますか。",""],
 ["That's slightly more than we expected to pay.","","予定していた金額より少し高いです。",""],
 ["If you order in bulk, we can reduce the price.","","まとめて注文していただければ、値下げできます。","in bulk=大量に、まとめて。"],
 ["We need delivery by the end of next month.","","来月末までに納品が必要です。",""],
 ["Let me check with my manager and get back to you.","","上司に確認して、折り返しご連絡します。","get back to 〜=〜に折り返し連絡する。"],
 ["I think we can meet you halfway.","","歩み寄れると思います。","meet 〜 halfway=〜と歩み寄る、妥協する。"],
 ["Could you put that in writing?","","それを書面にしていただけますか。",""],
 ["It's a deal.","","それで決まりです。","交渉がまとまったときの言い方。"]]);
XU('x-bec4','ビジネス英語 報告と数字','BUSINESS ENGLISH 4','en',[
 ["Profits have remained flat this year.","","今年の利益は横ばいです。","remain flat=横ばいのまま。"],
 ["Our market share has grown steadily.","","市場シェアは着実に伸びています。",""],
 ["Costs rose sharply due to higher fuel prices.","","燃料価格の上昇で、費用が急に増えました。",""],
 ["We exceeded our sales target by five percent.","","売上目標を5パーセント上回りました。","exceed=上回る。"],
 ["The new product was launched in April.","","新商品は4月に発売されました。","launch=(商品を)発売する。"],
 ["Customer feedback has been very positive.","","お客様の反応はとても好評です。","feedback=反応、意見。"],
 ["We are behind schedule on the project.","","プロジェクトは予定より遅れています。","behind schedule=予定より遅れて。"],
 ["The figures are broken down by region.","","数字は地域別に分けてあります。","break down=(数字を)項目別に分ける。"]]);
XU('x-bec5','ビジネス英語 人事と社内','BUSINESS ENGLISH 5','en',[
 ["We are looking for someone with strong leadership skills.","","強いリーダーシップを持つ人を探しています。",""],
 ["The successful candidate will start in June.","","採用された方は6月から働き始めます。","successful candidate=採用された候補者。"],
 ["Staff training is essential for good customer service.","","良い接客には社員研修が欠かせません。",""],
 ["She was promoted to sales manager.","","彼女は営業部長に昇進しました。","promote=昇進させる。"],
 ["We offer flexible working hours.","","当社はフレックスタイムを導入しています。",""],
 ["The company is expanding into Asian markets.","","会社はアジア市場に進出しようとしています。",""],
 ["Please submit your expense claims by Friday.","","経費の申請は金曜日までに出してください。","expense claim=経費精算の申請。"],
 ["I'll circulate the minutes after the meeting.","","会議のあとで議事録を回します。","circulate=(書類を)回覧する。"]]);
XU('x-servsafe1','ServSafe 食品衛生の英語','FOOD SAFETY 1','en',[
 ["Wash your hands for at least twenty seconds.","","少なくとも20秒間、手を洗いましょう。",""],
 ["Keep cold food at 41 degrees Fahrenheit or lower.","","冷たい食品は41°F(約5°C)以下で保ちます。","アメリカの温度は華氏(°F)。"],
 ["Keep hot food at 135 degrees Fahrenheit or higher.","","温かい食品は135°F(約57°C)以上で保ちます。",""],
 ["Store raw meat below ready-to-eat food.","","生の肉は、そのまま食べる食品より下の段に保存します。","上からしずくが落ちて汚れるのを防ぐため。"],
 ["Use a separate cutting board for raw chicken.","","生の鶏肉には、別のまな板を使いましょう。",""],
 ["Cook chicken to an internal temperature of 165 degrees Fahrenheit.","","鶏肉は中心温度165°F(約74°C)まで加熱します。","internal temperature=中心温度。"],
 ["Tell your manager if you have a fever or are vomiting.","","熱や嘔吐があるときは、責任者に伝えましょう。",""],
 ["Label food with the date it was prepared.","","食品には、作った日付のラベルを貼りましょう。",""]]);
XU('x-servsafe2','ServSafe 温度の管理','FOOD SAFETY 2','en',[
 ["Check the temperature of the fridge every morning.","","毎朝、冷蔵庫の温度を確認してください。",""],
 ["Use a food thermometer to check that it is cooked.","","火が通ったか、食品用温度計で確かめてください。",""],
 ["Thaw frozen food in the refrigerator, not on the counter.","","冷凍食品は台の上ではなく、冷蔵庫で解凍してください。","thaw=解凍する。"],
 ["Cool cooked food quickly before storing it.","","調理した食品は、保存する前にすばやく冷ましてください。",""],
 ["Reheat leftovers to 165 degrees Fahrenheit.","","残り物は165°F(約74°C)まで再加熱してください。",""],
 ["Throw away food that has been left out for over four hours.","","4時間以上出しっぱなしの食品は捨ててください。",""],
 ["The danger zone is between 41 and 135 degrees Fahrenheit.","","危険温度帯は41°Fから135°F(約5°Cから57°C)の間です。","danger zone=細菌が増えやすい温度帯。"],
 ["Record the temperatures in the log.","","温度を記録表に書いてください。",""]]);
XU('x-servsafe3','ServSafe 衛生と清掃','FOOD SAFETY 3','en',[
 ["Wear gloves when handling ready-to-eat food.","","そのまま食べる食品を扱うときは手袋をしてください。",""],
 ["Change your gloves after touching raw meat.","","生の肉を触ったら、手袋を替えてください。",""],
 ["Tie back long hair and wear a hair net.","","長い髪はまとめて、ヘアネットをかぶってください。",""],
 ["Clean and sanitize all work surfaces.","","作業台はすべて洗浄して消毒してください。","sanitize=菌を減らす(消毒)。clean は汚れを落とすこと。"],
 ["Don't wear jewelry in the kitchen.","","厨房ではアクセサリーをつけないでください。",""],
 ["Cover any cuts with a waterproof bandage.","","切り傷は防水の絆創膏でおおってください。",""],
 ["Keep cleaning chemicals away from food.","","洗剤などの薬品は食品から離して置いてください。",""],
 ["Empty the bins at the end of every shift.","","シフトの終わりごとにごみ箱を空にしてください。",""]]);
XU('x-servsafe4','ServSafe 受け入れと保管','FOOD SAFETY 4','en',[
 ["Reject deliveries that arrive at the wrong temperature.","","温度が適切でない納品は受け取らないでください。","reject=受け取りを断る。"],
 ["Check the use-by date before using any product.","","使う前に、消費期限を確かめてください。","use-by date=消費期限。"],
 ["Follow the first in, first out rule.","","先入れ先出しのルールを守ってください。","first in, first out=古いものから先に使う。"],
 ["Store food at least six inches off the floor.","","食品は床から少なくとも6インチ(約15センチ)離して保管してください。",""],
 ["Keep dry goods in sealed containers.","","乾物は密閉容器に入れてください。",""],
 ["Never refreeze food that has been thawed.","","一度解凍した食品は再冷凍しないでください。",""],
 ["Damaged cans should be thrown away.","","へこんだりこわれたりした缶は捨ててください。",""],
 ["Keep pests out by sealing gaps in the walls.","","壁のすき間をふさいで、害虫が入らないようにしてください。","pest=害虫、ネズミなど。"]]);
XU('x-servsafe5','ServSafe アレルギーとお客様対応','FOOD SAFETY 5','en',[
 ["Does this dish contain any nuts?","","この料理にはナッツが入っていますか。",""],
 ["I have a severe peanut allergy.","","重いピーナッツアレルギーがあります。",""],
 ["Use clean utensils to avoid cross-contact.","","アレルゲンが移らないよう、きれいな調理器具を使ってください。","cross-contact=アレルゲンが別の食品に移ること。"],
 ["Let me check with the chef about the ingredients.","","材料についてシェフに確認しますね。",""],
 ["This dish can be made gluten-free.","","この料理はグルテンフリーにできます。",""],
 ["Raw or undercooked eggs may increase the risk of illness.","","生や加熱不十分の卵は、病気のリスクを高めることがあります。",""],
 ["Report any food poisoning complaints to the manager.","","食中毒の訴えがあれば責任者に報告してください。",""],
 ["When in doubt, throw it out.","","迷ったら捨てる。","食品衛生の合言葉。"]]);
XU('x-celta1','CELTA・TEFL 教室の英語','CLASSROOM ENGLISH 1','en',[
 ["Work in pairs and compare your answers.","","ペアになって、答えを比べてください。",""],
 ["Can anyone tell me what this word means?","","この単語の意味が分かる人はいますか。",""],
 ["Let's check the answers together.","","一緒に答えを確認しましょう。",""],
 ["Listen and repeat after me.","","私のあとについて、くり返してください。",""],
 ["You have five minutes to finish this task.","","この課題は5分でやりましょう。",""],
 ["The aim of this lesson is to practise the past tense.","","この授業のねらいは、過去形を練習することです。","CELTAでは授業の aim(ねらい)をはっきりさせることが大切。practise はイギリスのつづり。"],
 ["Raise your hand when you've finished.","","終わったら手を挙げてください。",""],
 ["Good! Can you say it in a different way?","","いいですね! 別の言い方で言えますか。",""]]);
XU('x-celta2','CELTA・TEFL 授業の始め方','CLASSROOM ENGLISH 2','en',[
 ["Good morning, everyone. Let's get started.","","みなさん、おはようございます。始めましょう。",""],
 ["Please open your books to page twenty.","","教科書の20ページを開いてください。",""],
 ["Can everyone see the board?","","みなさん、黒板が見えますか。",""],
 ["Put your phones away, please.","","携帯電話をしまってください。",""],
 ["Look at the picture and guess what happened.","","絵を見て、何があったか想像してください。",""],
 ["Don't worry about mistakes. Just try.","","まちがいは気にしないで、まずやってみましょう。",""],
 ["Who would like to read the first sentence?","","最初の文を読みたい人はいますか。",""],
 ["Let's do a quick warm-up activity.","","簡単なウォームアップをしましょう。","warm-up=授業の初めの準備運動のような活動。"]]);
XU('x-celta3','CELTA・TEFL 説明と訂正','CLASSROOM ENGLISH 3','en',[
 ["Are you all clear on what to do?","","何をするか、みんな分かりましたか。",""],
 ["So, do you write or do you speak in this activity?","","では、この活動では書きますか、話しますか。","指示を理解したか確かめる質問(ICQ)の例。"],
 ["This word is a noun, not a verb.","","この単語は動詞ではなく名詞です。",""],
 ["Notice the stress is on the second syllable.","","強勢は2番目の音節にあることに注意してください。","stress=強勢(アクセント)、syllable=音節。"],
 ["We use the present perfect for experiences.","","経験を言うときは現在完了を使います。",""],
 ["Can you give me an example sentence?","","例文を言ってもらえますか。",""],
 ["That's almost right. Try again.","","おしい、もう一度。",""],
 ["Let me write that on the board.","","それを黒板に書きますね。",""]]);
XU('x-celta4','CELTA・TEFL 活動の進め方','CLASSROOM ENGLISH 4','en',[
 ["Change partners and ask the same questions.","","パートナーを替えて、同じ質問をしてください。",""],
 ["You have two more minutes.","","あと2分です。",""],
 ["Mingle and find someone who has been abroad.","","歩き回って、外国に行ったことがある人を見つけてください。","mingle=歩き回っていろいろな人と話す活動。"],
 ["Turn to the person next to you.","","となりの人のほうを向いてください。",""],
 ["Please speak in English as much as possible.","","できるだけ英語で話してください。",""],
 ["Let's hear from this group first.","","まずこのグループから聞きましょう。",""],
 ["Swap your papers and check each other's work.","","紙を交換して、お互いの答えを確認してください。","swap=交換する。"],
 ["Okay, time's up. Please stop writing.","","はい、時間です。書くのをやめてください。",""]]);
XU('x-celta5','CELTA・TEFL 授業のまとめ','CLASSROOM ENGLISH 5','en',[
 ["What did you learn today?","","今日は何を学びましたか。",""],
 ["Which part was the most difficult?","","どこがいちばん難しかったですか。",""],
 ["For homework, please write a short paragraph.","","宿題として、短い段落を書いてきてください。",""],
 ["Remember to review the new vocabulary.","","新しい単語の復習を忘れないでください。",""],
 ["You all did a great job today.","","今日はみんなよくがんばりました。",""],
 ["I'll give you feedback on your writing next week.","","来週、作文についてコメントを返しますね。",""],
 ["If you have any questions, come and see me after class.","","質問があれば、授業のあとで来てください。",""],
 ["See you on Thursday!","","木曜日に会いましょう!",""]]);
XU('x-kanko1','観光英語検定 ステップ1','TOURISM ENGLISH 1','en',[
 ["Your flight departs from Terminal 2.","","お客様の便は、第2ターミナルから出発します。",""],
 ["May I see your passport and boarding pass?","","パスポートと搭乗券を拝見できますか。",""],
 ["The tour includes lunch and admission fees.","","ツアーには昼食と入場料が含まれています。","admission fee=入場料。"],
 ["Breakfast is served from seven to ten.","","朝食は7時から10時までです。",""],
 ["Please keep your valuables with you at all times.","","貴重品はいつもお持ちください。","valuables=貴重品。"],
 ["The bus will leave the hotel at eight sharp.","","バスは8時ちょうどにホテルを出発します。","sharp=(時刻が)ちょうど。"],
 ["Would you like a window seat or an aisle seat?","","窓側と通路側、どちらの席がよろしいですか。","aisle=通路(s は読みません)。"],
 ["This temple is a World Heritage Site.","","このお寺は世界遺産です。",""]]);
XU('x-kanko2','観光英語検定 ステップ2','TOURISM ENGLISH 2','en',[
 ["Please proceed to gate twelve.","","12番ゲートへお進みください。","proceed=進む(案内でよく使います)。"],
 ["Boarding will begin in ten minutes.","","搭乗は10分後に始まります。",""],
 ["Your baggage is overweight.","","お荷物が重量オーバーです。",""],
 ["Liquids must be in containers of 100 milliliters or less.","","液体は100ミリリットル以下の容器に入れなければなりません。",""],
 ["Please fasten your seat belt while the sign is on.","","サインが点灯している間は、シートベルトをお締めください。",""],
 ["What is the purpose of your visit?","","渡航の目的は何ですか。","入国審査の決まった質問。"],
 ["I'm here for sightseeing.","","観光で来ました。",""],
 ["The baggage claim is on the ground floor.","","手荷物受取所は1階です。","ground floor=(イギリス英語で)1階。"]]);
XU('x-kanko3','観光英語検定 ステップ3','TOURISM ENGLISH 3','en',[
 ["I'd like to check in, please. I have a reservation.","","チェックインをお願いします。予約しています。",""],
 ["Your room is on the fifth floor.","","お部屋は5階です。",""],
 ["Check-out is at eleven a.m.","","チェックアウトは午前11時です。",""],
 ["Could you keep my luggage until this evening?","","夕方まで荷物を預かっていただけますか。",""],
 ["The air conditioner in my room isn't working.","","部屋のエアコンが動きません。",""],
 ["Would you like a wake-up call?","","モーニングコールはいかがですか。","wake-up call=モーニングコール(英語では morning call と言いません)。"],
 ["Wi-Fi is free in all rooms.","","Wi-Fiは全室無料です。",""],
 ["Is breakfast included in the rate?","","料金に朝食は含まれていますか。",""]]);
XU('x-kanko4','観光英語検定 ステップ4','TOURISM ENGLISH 4','en',[
 ["This museum is closed on Mondays.","","この博物館は月曜日が休館です。",""],
 ["Admission is free for children under six.","","6歳未満のお子様は入場無料です。","admission=入場(料)。"],
 ["The guided tour takes about ninety minutes.","","ガイド付きツアーは約90分かかります。",""],
 ["Photography is not allowed inside the building.","","建物の中での撮影は禁止されています。",""],
 ["The festival is held every August.","","その祭りは毎年8月に行われます。",""],
 ["You can get there by bus in twenty minutes.","","バスで20分で行けます。",""],
 ["I recommend visiting early in the morning to avoid the crowds.","","混雑を避けるため、朝早く行くのがおすすめです。",""],
 ["This area is famous for its hot springs.","","この地域は温泉で有名です。",""]]);
XU('x-kanko5','観光英語検定 ステップ5','TOURISM ENGLISH 5','en',[
 ["I've lost my passport.","","パスポートをなくしました。",""],
 ["Where is the nearest police station?","","いちばん近い警察署はどこですか。",""],
 ["Please call an ambulance.","","救急車を呼んでください。",""],
 ["You can claim a tax refund at the counter.","","カウンターで免税の手続きができます。","tax refund=(旅行者の)税金の払い戻し。"],
 ["Could you wrap it as a gift?","","贈り物用に包んでいただけますか。",""],
 ["Do you accept credit cards?","","クレジットカードは使えますか。",""],
 ["I'd like to exchange yen for dollars.","","円をドルに両替したいのですが。",""],
 ["Have a wonderful trip!","","すてきな旅を!",""]]);
XU('x-guide1','全国通訳案内士 英語 ステップ1','GUIDE INTERPRETER 1','en',[
 ["Please bow once before you walk through the torii gate.","","鳥居をくぐる前に、一礼してください。","神社の作法を説明する場面。"],
 ["This castle was built in the early seventeenth century.","","このお城は、17世紀の初めに建てられました。",""],
 ["Sumo wrestlers throw salt to purify the ring.","","力士は、土俵を清めるために塩をまきます。","purify=清める。"],
 ["Please take off your shoes before entering the room.","","部屋に入る前に、靴を脱いでください。",""],
 ["Real wasabi comes from a plant that grows in clean mountain streams.","","本わさびは、きれいな山の渓流で育つ植物から作られます。",""],
 ["The tea ceremony values hospitality and respect.","","茶道は、おもてなしと敬意を大切にしています。",""],
 ["You can write your wish on a wooden plaque.","","絵馬に願いごとを書くことができます。","wooden plaque=絵馬。"],
 ["Tipping is not customary in Japan.","","日本ではチップの習慣はありません。","customary=習慣になっている。"]]);
XU('x-guide2','全国通訳案内士 英語 ステップ2','GUIDE INTERPRETER 2','en',[
 ["Please rinse your hands and mouth at the purification fountain.","","手水舎で手と口を清めてください。","purification=清めること。手水舎は purification fountain と説明します。"],
 ["Bow twice, clap twice, and then bow once more.","","2回お辞儀をして、2回手をたたき、最後にもう1回お辞儀をします。","神社のお参りの作法(二礼二拍手一礼)。"],
 ["This shrine is dedicated to the god of learning.","","この神社は学問の神様をまつっています。","be dedicated to 〜=〜にささげられている、〜をまつっている。"],
 ["Shinto is Japan's native religion.","","神道は日本古来の宗教です。",""],
 ["Many Japanese people visit both shrines and temples.","","多くの日本人は、神社にもお寺にもお参りします。",""],
 ["You can buy a charm for good luck here.","","ここで幸運のお守りを買えます。","charm=お守り。amulet とも言います。"],
 ["Draw a fortune slip to see your luck for the year.","","おみくじを引いて、今年の運勢を見てみましょう。","fortune slip=おみくじ。"],
 ["If it's bad luck, tie it to this rope and leave it behind.","","凶が出たら、この縄に結んで置いていきましょう。",""]]);
XU('x-guide3','全国通訳案内士 英語 ステップ3','GUIDE INTERPRETER 3','en',[
 ["This is a traditional Japanese breakfast.","","これは昔ながらの日本の朝食です。",""],
 ["Miso is made from fermented soybeans.","","みそは大豆を発酵させて作ります。","fermented=発酵した。"],
 ["It is polite to say itadakimasu before eating.","","食べる前に「いただきます」と言うのが礼儀です。",""],
 ["Slurping noodles is perfectly fine in Japan.","","日本では、めんをすすって食べてもまったく問題ありません。","slurp=音を立ててすする。"],
 ["Please don't stick your chopsticks upright in the rice.","","はしをご飯にまっすぐ立てないでください。","お葬式を連想させるため、マナー違反とされます。"],
 ["Kaiseki is a traditional multi-course meal.","","懐石は伝統的なコース料理です。","multi-course=何品も順に出る。"],
 ["The dishes change with the seasons.","","料理は季節ごとに変わります。",""],
 ["Do you have any dietary restrictions?","","食事の制限はありますか。","dietary restrictions=アレルギー・宗教・菜食などで食べられないもの。"]]);
XU('x-guide4','全国通訳案内士 英語 ステップ4','GUIDE INTERPRETER 4','en',[
 ["The samurai were the warrior class of Japan.","","侍は日本の武士の階級でした。","warrior class=武士の階級。"],
 ["Kyoto was the capital of Japan for over a thousand years.","","京都は千年以上、日本の都でした。",""],
 ["The Edo period lasted about two hundred and sixty years.","","江戸時代は約260年続きました。",""],
 ["Geisha are professional entertainers trained in traditional arts.","","芸者は、伝統芸能を身につけたもてなしのプロです。",""],
 ["Please don't take photos of maiko without permission.","","舞妓さんを許可なく撮影しないでください。","maiko=芸者になる前の見習い。"],
 ["Kabuki actors are all men.","","歌舞伎の役者は全員男性です。",""],
 ["This garden is designed to be viewed from the veranda.","","この庭は、縁側から眺めるように作られています。",""],
 ["Zen Buddhism had a great influence on Japanese culture.","","禅宗は日本の文化に大きな影響を与えました。",""]]);
XU('x-guide5','全国通訳案内士 英語 ステップ5','GUIDE INTERPRETER 5','en',[
 ["Let's meet here again in thirty minutes.","","30分後に、またここに集まりましょう。",""],
 ["Please stay close to the group in the crowd.","","人ごみでは、グループから離れないでください。",""],
 ["The train is crowded, so please hold on to the strap.","","電車が混んでいるので、つり革につかまってください。","strap=つり革。"],
 ["Please speak quietly on the train.","","電車の中では静かに話してください。",""],
 ["Unfortunately, the garden is closed today due to the typhoon.","","あいにく、台風のため今日は庭園が閉まっています。",""],
 ["Instead, I'd like to suggest a visit to the museum.","","代わりに、博物館に行くのはいかがでしょうか。",""],
 ["Are you feeling all right? Shall we take a break?","","具合は大丈夫ですか。少し休みましょうか。",""],
 ["I hope you enjoyed today's tour.","","今日のツアーを楽しんでいただけたならうれしいです。",""]]);
XU('x-guide-ko1','全国通訳案内士 韓国語 ステップ1','GUIDE KOREAN 1','ko',[
 ["신발을 벗고 들어가 주세요.","シンバルル ポッコ トゥロガ ジュセヨ","靴を脱いで入ってください。",""],
 ["이 절은 세계유산이에요.","イ ジョルン セゲユサニエヨ","このお寺は世界遺産です。","절=お寺。세계유산=世界遺産。"],
 ["사진은 여기서 찍으시면 돼요.","サジヌン ヨギソ チグシミョン ドェヨ","写真はここで撮っていただけます。",""],
 ["버스는 열 시에 출발합니다.","ポスヌン ヨル シエ チュルバラムニダ","バスは10時に出発します。","時刻の「時」は固有数詞(열=10)。"],
 ["일본에서는 팁을 주지 않아요.","イルボネソヌン ティブル チュジ アナヨ","日本ではチップを渡しません。",""],
 ["도리이를 지나기 전에 한 번 인사해 주세요.","トリイルル チナギ ジョネ ハン ボン インサヘ ジュセヨ","鳥居をくぐる前に、一礼してください。",""],
 ["이 성은 약 사백 년 전에 지어졌어요.","イ ソンウン ヤク サベン ニョン ジョネ チオジョッソヨ","このお城は、約400年前に建てられました。","年数は漢数詞(사백=400)。"],
 ["궁금한 점이 있으세요?","クングマン チョミ イッスセヨ","何か質問はありますか。",""]]);
XU('x-guide-ko2','全国通訳案内士 韓国語 ステップ2','GUIDE KOREAN 2','ko',[
 ["손과 입을 먼저 깨끗이 씻어 주세요.","ソングァ イブル モンジョ ッケックシ ッシソ ジュセヨ","まず手と口を清めてください。","깨끗이=きれいに。"],
 ["두 번 절하고 두 번 손뼉을 쳐요.","トゥ ボン チョラゴ トゥ ボン ソンッピョグル チョヨ","2回お辞儀をして、2回手をたたきます。","절하다=お辞儀する。손뼉을 치다=手をたたく。"],
 ["이 신사는 학문의 신을 모시고 있어요.","イ シンサヌン ハンムネ シヌル モシゴ イッソヨ","この神社は学問の神様をまつっています。","모시다=まつる、お仕えする。"],
 ["여기서 부적을 살 수 있어요.","ヨギソ プジョグル サル ス イッソヨ","ここでお守りを買えます。","부적=お守り。"],
 ["오미쿠지로 올해 운세를 볼 수 있어요.","オミクジロ オレ ウンセルル ポル ス イッソヨ","おみくじで今年の運勢を占えます。","운세=運勢。"],
 ["향 연기를 몸에 쐬면 건강해진대요.","ヒャン ヨンギルル モメ ッスェミョン コンガンヘジンデヨ","お線香の煙を体に浴びると、健康になるそうです。","〜대요=〜だそうです(伝聞)。"],
 ["본당 안에서는 사진을 찍을 수 없어요.","ポンダン アネソヌン サジヌル ッチグル ス オプソヨ","本堂の中では写真を撮れません。",""],
 ["이 탑은 오층탑이에요.","イ タブン オチュンタビエヨ","この塔は五重塔です。",""]]);
XU('x-guide-ko3','全国通訳案内士 韓国語 ステップ3','GUIDE KOREAN 3','ko',[
 ["이건 일본의 전통적인 아침 식사예요.","イゴン イルボネ チョントンジョギン アチム シクサエヨ","これは日本の伝統的な朝ごはんです。",""],
 ["된장국은 일본 요리에서 빠질 수 없어요.","トェンジャンックグン イルボン ヨリエソ ッパジル ス オプソヨ","みそ汁は日本料理に欠かせません。","빠질 수 없다=欠かせない。"],
 ["면은 소리를 내서 먹어도 괜찮아요.","ミョヌン ソリルル ネソ モゴド クェンチャナヨ","めんは音を立てて食べても大丈夫です。",""],
 ["젓가락을 밥에 꽂지 마세요.","チョッカラグル パベ ッコッチ マセヨ","はしをご飯に立てないでください。","꽂다=さす。"],
 ["못 드시는 음식이 있으세요?","モッ トゥシヌン ウムシギ イッスセヨ","召し上がれないものはありますか。","드시다=召し上がる(먹다の尊敬語)。"],
 ["이 가게는 초밥으로 유명해요.","イ カゲヌン チョバブロ ユミョンヘヨ","このお店はおすしで有名です。","초밥=すし。"],
 ["와사비를 빼 달라고 할 수 있어요.","ワサビルル ッペ ダルラゴ ハル ス イッソヨ","わさび抜きを頼めます。","빼다=抜く。"],
 ["계산은 출구 근처에서 해요.","ケサヌン チュルグ クンチョエソ ヘヨ","お会計は出口の近くでします。","계산=会計。"]]);
XU('x-guide-ko4','全国通訳案内士 韓国語 ステップ4','GUIDE KOREAN 4','ko',[
 ["교토는 천 년 이상 일본의 수도였어요.","キョトヌン チョン ニョン イサン イルボネ スドヨッソヨ","京都は千年以上、日本の都でした。","수도=首都、都。"],
 ["에도 시대는 약 이백육십 년 동안 계속됐어요.","エド シデヌン ヤク イベンニュクシム ニョン トンアン ケソクトェッソヨ","江戸時代は約260年続きました。",""],
 ["이 정원은 툇마루에서 보도록 만들어졌어요.","イ チョンウォヌン トェンマルエソ ポドロク マンドゥロジョッソヨ","この庭は縁側から眺めるように作られています。","툇마루=縁側。"],
 ["다도는 손님을 대접하는 마음을 중요하게 여겨요.","タドヌン ソンニムル テジョパヌン マウムル チュンヨハゲ ヨギョヨ","茶道はおもてなしの心を大切にします。","대접하다=もてなす。"],
 ["가부키 배우는 모두 남자예요.","カブキ ペウヌン モドゥ ナムジャエヨ","歌舞伎の役者は全員男性です。",""],
 ["마이코의 사진은 허락 없이 찍으면 안 돼요.","マイコエ サジヌン ホラク オプシ ッチグミョン アン ドェヨ","舞妓さんの写真を許可なく撮ってはいけません。","〜면 안 돼요=〜してはいけません。"],
 ["기모노를 입고 거리를 걸어 볼 수 있어요.","キモノルル イプコ コリルル コロ ボル ス イッソヨ","着物を着て町を歩いてみることができます。",""],
 ["사무라이는 일본의 무사 계급이었어요.","サムライヌン イルボネ ムサ ケグビオッソヨ","侍は日本の武士の階級でした。","무사=武士。"]]);
XU('x-guide-ko5','全国通訳案内士 韓国語 ステップ5','GUIDE KOREAN 5','ko',[
 ["삼십 분 후에 여기로 다시 모여 주세요.","サムシプ プン フエ ヨギロ タシ モヨ ジュセヨ","30分後に、ここにまた集まってください。",""],
 ["사람이 많으니까 일행과 떨어지지 마세요.","サラミ マヌニッカ イレングァ ットロジジ マセヨ","人が多いので、グループから離れないでください。","일행=一行、連れ。"],
 ["전철 안에서는 조용히 이야기해 주세요.","チョンチョル アネソヌン チョヨンヒ イヤギヘ ジュセヨ","電車の中では静かに話してください。",""],
 ["다음 역에서 내릴 거예요.","タウム ヨゲソ ネリル コエヨ","次の駅で降ります。",""],
 ["태풍 때문에 오늘은 정원이 문을 닫았어요.","テプン ッテムネ オヌルン チョンウォニ ムヌル タダッソヨ","台風のため、今日は庭園が閉まっています。",""],
 ["대신 박물관에 가 보는 건 어떠세요?","テシン パンムルグァネ カ ボヌン ゴン オットセヨ","代わりに博物館に行ってみるのはいかがですか。","어떠세요?=いかがですか。"],
 ["몸은 괜찮으세요? 좀 쉴까요?","モムン クェンチャヌセヨ チョム シュィルッカヨ","体は大丈夫ですか。少し休みましょうか。",""],
 ["오늘 투어가 즐거우셨기를 바랍니다.","オヌル トゥオガ チュルゴウショッキルル パラムニダ","今日のツアーを楽しんでいただけたならうれしいです。","〜기를 바랍니다=〜であることを願います。"]]);
XU('x-guide-es1','全国通訳案内士 スペイン語 ステップ1','GUIDE SPANISH 1','es',[
 ["Por favor, quítense los zapatos antes de entrar.","","入る前に、靴を脱いでください。","quítense=ustedes(みなさん)への丁寧な命令。"],
 ["Este templo es Patrimonio de la Humanidad.","","このお寺は世界遺産です。",""],
 ["El autobús sale a las ocho en punto.","","バスは8時ちょうどに出発します。","en punto=ちょうど。"],
 ["En Japón no se deja propina.","","日本ではチップを置きません。","propina=チップ。"],
 ["Este castillo se construyó hace unos cuatrocientos años.","","このお城は、約400年前に建てられました。","hace+期間=〜前に。"],
 ["Aquí pueden hacer fotos.","","ここで写真を撮れます。","中南米では tomar fotos と言うことが多いです。"],
 ["El tren bala llega a Kioto en unas dos horas.","","新幹線は、約2時間で京都に着きます。","tren bala=新幹線。"],
 ["¿Tienen alguna pregunta?","","何か質問はありますか。",""]]);
XU('x-guide-es2','全国通訳案内士 スペイン語 ステップ2','GUIDE SPANISH 2','es',[
 ["Lávense las manos y la boca en la fuente de purificación.","","手水舎で手と口を清めてください。","lávense=ustedes(みなさん)への丁寧な命令。"],
 ["Hagan dos reverencias, den dos palmadas y otra reverencia.","","2回お辞儀をして、2回手をたたき、もう1回お辞儀をしてください。","reverencia=お辞儀、palmada=手をたたくこと。"],
 ["Este santuario está dedicado al dios del estudio.","","この神社は学問の神様をまつっています。","santuario=神社(sintoísta の santuario)。"],
 ["Aquí pueden comprar amuletos de la suerte.","","ここで幸運のお守りを買えます。","amuleto=お守り。"],
 ["Con este papel pueden saber su suerte para este año.","","この紙で、今年の運勢が分かります。","おみくじの説明。"],
 ["El humo del incienso trae buena salud.","","お線香の煙は健康をもたらすと言われています。","incienso=お香、お線香。"],
 ["No se permite hacer fotos dentro del templo.","","お寺の中では写真を撮れません。","No se permite=〜は許可されていない。"],
 ["Esta pagoda tiene cinco pisos.","","この塔は五重塔です。","pagoda=(お寺の)塔。"]]);
XU('x-guide-es3','全国通訳案内士 スペイン語 ステップ3','GUIDE SPANISH 3','es',[
 ["Este es un desayuno tradicional japonés.","","これは伝統的な日本の朝ごはんです。",""],
 ["El miso se hace con soja fermentada.","","みそは発酵させた大豆で作ります。","fermentada=発酵した。"],
 ["En Japón está bien hacer ruido al comer fideos.","","日本では、めんを音を立てて食べても大丈夫です。","fideos=めん類。"],
 ["Por favor, no claven los palillos en el arroz.","","はしをご飯にさして立てないでください。","palillos=はし、clavar=突き刺す。"],
 ["¿Hay algo que no puedan comer?","","食べられないものはありますか。",""],
 ["Antes de comer, decimos itadakimasu.","","食べる前に「いただきます」と言います。",""],
 ["Este restaurante es famoso por su sushi.","","このお店はおすしで有名です。","famoso por 〜=〜で有名な。"],
 ["Se paga en la caja, cerca de la salida.","","お会計は出口の近くのレジでします。","caja=レジ。"]]);
XU('x-guide-es4','全国通訳案内士 スペイン語 ステップ4','GUIDE SPANISH 4','es',[
 ["Kioto fue la capital de Japón durante más de mil años.","","京都は千年以上、日本の都でした。","fue=ser の点過去。"],
 ["Los samuráis eran la clase guerrera de Japón.","","侍は日本の武士の階級でした。","guerrero=戦士。"],
 ["El período Edo duró unos doscientos sesenta años.","","江戸時代は約260年続きました。","durar=続く。"],
 ["La ceremonia del té valora la hospitalidad.","","茶道はおもてなしを大切にします。",""],
 ["En el kabuki, todos los actores son hombres.","","歌舞伎では、役者は全員男性です。",""],
 ["No hagan fotos a las maiko sin permiso.","","舞妓さんを許可なく撮影しないでください。","sin permiso=許可なく。"],
 ["Pueden pasear por la ciudad con kimono.","","着物で町を散策できます。","pasear=散歩する。"],
 ["Este jardín está pensado para verlo desde la veranda.","","この庭は、縁側から眺めるように作られています。","pensado para 〜=〜するために考えられた。"]]);
XU('x-guide-es5','全国通訳案内士 スペイン語 ステップ5','GUIDE SPANISH 5','es',[
 ["Nos vemos aquí dentro de treinta minutos.","","30分後に、ここで会いましょう。","dentro de 〜=(今から)〜後に。"],
 ["Hay mucha gente, así que no se separen del grupo.","","人が多いので、グループから離れないでください。","separarse=離れる。"],
 ["En el tren, por favor, hablen en voz baja.","","電車の中では、小さな声で話してください。","en voz baja=小声で。"],
 ["Nos bajamos en la próxima estación.","","次の駅で降ります。","bajarse=(乗り物から)降りる。"],
 ["Hoy el jardín está cerrado por el tifón.","","今日は台風のため、庭園が閉まっています。","por 〜=〜のために(原因)。"],
 ["En su lugar, ¿qué les parece visitar el museo?","","代わりに、博物館に行くのはいかがですか。","¿Qué les parece 〜?=〜はいかがですか。"],
 ["¿Se encuentra bien? ¿Descansamos un poco?","","具合は大丈夫ですか。少し休みましょうか。","encontrarse bien=体調がいい。"],
 ["Espero que hayan disfrutado del tour de hoy.","","今日のツアーを楽しんでいただけたならうれしいです。","Espero que+接続法=〜だといいのですが。"]]);
XU('x-guide-it1','全国通訳案内士 イタリア語 ステップ1','GUIDE ITALIAN 1','it',[
 ["Per favore, toglietevi le scarpe prima di entrare.","","入る前に、靴を脱いでください。","toglietevi=voi(みなさん)への命令。"],
 ["Questo tempio è patrimonio dell'umanità.","","このお寺は世界遺産です。",""],
 ["L'autobus parte alle otto in punto.","","バスは8時ちょうどに出発します。","in punto=ちょうど。"],
 ["In Giappone non si lascia la mancia.","","日本ではチップを置きません。","mancia=チップ。"],
 ["Questo castello è stato costruito circa quattrocento anni fa.","","このお城は、約400年前に建てられました。","期間+fa=〜前に。"],
 ["Qui potete fare delle foto.","","ここで写真を撮れます。",""],
 ["Lo shinkansen arriva a Kyoto in circa due ore.","","新幹線は、約2時間で京都に着きます。",""],
 ["Avete qualche domanda?","","何か質問はありますか。",""]]);
XU('x-guide-it2','全国通訳案内士 イタリア語 ステップ2','GUIDE ITALIAN 2','it',[
 ["Lavatevi le mani e la bocca alla fontana di purificazione.","","手水舎で手と口を清めてください。","lavatevi=voi(みなさん)への命令。"],
 ["Fate due inchini, battete le mani due volte e fate un altro inchino.","","2回お辞儀をして、2回手をたたき、もう1回お辞儀をしてください。","inchino=お辞儀。"],
 ["Questo santuario è dedicato al dio dello studio.","","この神社は学問の神様をまつっています。","santuario=神社。"],
 ["Qui potete comprare degli amuleti portafortuna.","","ここで幸運のお守りを買えます。","portafortuna=幸運を呼ぶ(もの)。"],
 ["Con questo foglietto potete conoscere la vostra fortuna per l'anno.","","この紙で、今年の運勢が分かります。","おみくじの説明。foglietto=小さな紙。"],
 ["Si dice che il fumo dell'incenso faccia bene alla salute.","","お線香の煙は健康にいいと言われています。","Si dice che+接続法=〜と言われている。"],
 ["Non è permesso fare foto all'interno del tempio.","","お寺の中では写真を撮れません。",""],
 ["Questa pagoda ha cinque piani.","","この塔は五重塔です。","pagoda=(お寺の)塔。"]]);
XU('x-guide-it3','全国通訳案内士 イタリア語 ステップ3','GUIDE ITALIAN 3','it',[
 ["Questa è una colazione tradizionale giapponese.","","これは伝統的な日本の朝ごはんです。",""],
 ["Il miso è fatto con soia fermentata.","","みそは発酵させた大豆で作ります。",""],
 ["In Giappone si può fare rumore mangiando i noodle.","","日本では、めんを音を立てて食べてもいいのです。","mangiando=食べながら(ジェルンディオ)。"],
 ["Per favore, non piantate le bacchette nel riso.","","はしをご飯にさして立てないでください。","bacchette=はし。"],
 ["C'è qualcosa che non potete mangiare?","","食べられないものはありますか。",""],
 ["Prima di mangiare diciamo itadakimasu.","","食べる前に「いただきます」と言います。",""],
 ["Questo ristorante è famoso per il sushi.","","このお店はおすしで有名です。","famoso per 〜=〜で有名な。"],
 ["Si paga alla cassa, vicino all'uscita.","","お会計は出口の近くのレジでします。","cassa=レジ。"]]);
XU('x-guide-it4','全国通訳案内士 イタリア語 ステップ4','GUIDE ITALIAN 4','it',[
 ["Kyoto è stata la capitale del Giappone per più di mille anni.","","京都は千年以上、日本の都でした。","è stata=essere の近過去(女性形)。"],
 ["I samurai erano la classe guerriera del Giappone.","","侍は日本の武士の階級でした。","guerriero=戦士の。"],
 ["Il periodo Edo è durato circa duecentosessanta anni.","","江戸時代は約260年続きました。","durare=続く。"],
 ["La cerimonia del tè dà molta importanza all'ospitalità.","","茶道はおもてなしをとても大切にします。","dare importanza a 〜=〜を大切にする。"],
 ["Nel kabuki tutti gli attori sono uomini.","","歌舞伎では、役者は全員男性です。",""],
 ["Non fotografate le maiko senza permesso.","","舞妓さんを許可なく撮影しないでください。","senza permesso=許可なく。"],
 ["Potete passeggiare per la città in kimono.","","着物で町を散策できます。",""],
 ["Questo giardino è fatto per essere ammirato dalla veranda.","","この庭は、縁側から眺めるように作られています。","ammirare=眺める、鑑賞する。"]]);
XU('x-guide-it5','全国通訳案内士 イタリア語 ステップ5','GUIDE ITALIAN 5','it',[
 ["Ci ritroviamo qui tra trenta minuti.","","30分後に、ここにまた集まりましょう。","tra 〜=(今から)〜後に。"],
 ["C'è molta gente, quindi non allontanatevi dal gruppo.","","人が多いので、グループから離れないでください。","allontanarsi=離れる。"],
 ["In treno, per favore, parlate a bassa voce.","","電車の中では、小さな声で話してください。","a bassa voce=小声で。"],
 ["Scendiamo alla prossima fermata.","","次の駅で降ります。","scendere=(乗り物から)降りる。"],
 ["Oggi il giardino è chiuso a causa del tifone.","","今日は台風のため、庭園が閉まっています。","a causa di 〜=〜のために(原因)。"],
 ["Invece, che ne dite di visitare il museo?","","代わりに、博物館に行くのはいかがですか。","Che ne dite di 〜?=〜はどうですか(みなさんに)。"],
 ["Vi sentite bene? Facciamo una pausa?","","具合は大丈夫ですか。少し休みましょうか。",""],
 ["Spero che il tour di oggi vi sia piaciuto.","","今日のツアーを楽しんでいただけたならうれしいです。","Spero che+接続法=〜だといいのですが。"]]);
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
XU('x-res3','研究者の英語 出願・面接','ACADEMIC ENGLISH 3','en',[
 ["I'm applying for the master's program in aerospace engineering.","","航空宇宙工学の修士課程に出願しています。","master's program=修士課程。博士課程は PhD program。"],
 ["My research interest is in renewable energy.","","私の研究の関心は、再生可能エネルギーにあります。",""],
 ["I'd like to work under the supervision of Professor Brown.","","ブラウン教授の指導のもとで研究したいです。","supervision=指導。指導教員は supervisor。"],
 ["I have attached my CV and a writing sample.","","履歴書と論文のサンプルを添付しました。","CV=研究者向けの履歴書(curriculum vitae)。"],
 ["Could you tell me whether you are accepting new students?","","新しい学生を受け入れているか、教えていただけますか。","海外の大学院では、出願前に教授へ問い合わせるのが一般的です。"],
 ["Are there any scholarships available for international students?","","留学生向けの奨学金はありますか。",""],
 ["What made you interested in this field?","","なぜこの分野に興味を持ったのですか。","面接の定番の質問。"],
 ["I want to use what I learn to solve real-world problems.","","学んだことを、現実の問題の解決に生かしたいです。",""]]);
XU('x-res4','研究者の英語 授業・ゼミ','ACADEMIC ENGLISH 4','en',[
 ["Could you clarify what you mean by that term?","","その用語の意味を、はっきりさせていただけますか。","clarify=明確にする。"],
 ["I see your point, but I have a slightly different view.","","おっしゃることは分かりますが、私は少し違う考えです。","反対意見をていねいに言う型。"],
 ["To build on what Anna said, I think the data support this.","","アンナさんの意見に付け加えると、データもそれを裏付けていると思います。","build on 〜=〜に付け加えて発展させる。"],
 ["When is the deadline for the term paper?","","期末レポートの締め切りはいつですか。",""],
 ["I'll send you the reading list after the seminar.","","ゼミのあとで、文献リストを送ります。",""],
 ["This article is cited in many later studies.","","この論文は、その後の多くの研究で引用されています。","cite=引用する。"],
 ["Could we meet during your office hours?","","オフィスアワーにお会いできますか。","office hours=教員が学生の相談を受ける時間。"],
 ["I'm not sure I follow the second step of the proof.","","証明の2番目のところが、よく分かりません。","follow=(話に)ついていく。"]]);
XU('x-res5','研究者の英語 共同研究','ACADEMIC ENGLISH 5','en',[
 ["Could you show me how to use this microscope?","","この顕微鏡の使い方を教えていただけますか。",""],
 ["Please record every measurement in the lab notebook.","","測定はすべて実験ノートに記録してください。",""],
 ["The samples must be kept at minus eighty degrees.","","サンプルはマイナス80度で保管しなければなりません。",""],
 ["We need approval from the ethics committee first.","","まず倫理委員会の承認が必要です。","ethics committee=倫理委員会。人や動物を対象にする研究で必要です。"],
 ["Let's divide the work and share our progress every week.","","作業を分担して、毎週進み具合を共有しましょう。",""],
 ["I'll upload the data to the shared folder.","","データを共有フォルダにアップロードします。",""],
 ["Who should be listed as the first author?","","筆頭著者には誰の名前を書くべきですか。","first author=論文で最初に名前が出る著者。主に研究した人。"],
 ["We plan to submit the paper to an international journal.","","論文を国際誌に投稿する予定です。","journal=学術雑誌。"]]);
XU('x-res-ko1','研究者の韓国語 研究室・学会','ACADEMIC KOREAN 1','ko',[
 ["오늘은 저희 연구 결과를 발표하겠습니다.","オヌルン チョイ ヨング キョルグァルル パルピョハゲッスムニダ","今日は、私たちの研究結果を発表します。","発表では「〜겠습니다」のかたい言い方を使います。"],
 ["이 그래프를 보시면 차이를 알 수 있습니다.","イ グレプルル ボシミョン チャイルル アル ス イッスムニダ","このグラフを見ると、違いが分かります。",""],
 ["좋은 질문 감사합니다.","チョウン ジルムン カムサハムニダ","いい質問をありがとうございます。",""],
 ["교수님, 논문 초안을 봐 주실 수 있을까요?","キョスニム ノンムン チョアヌル ボァ ジュシル ス イッスルッカヨ","教授、論文の下書きを見ていただけますか。","교수님=教授(先生)。초안=下書き。"],
 ["실험을 다시 해 보겠습니다.","シロムル タシ ヘ ボゲッスムニダ","実験をもう一度やってみます。",""],
 ["연구실 세미나는 몇 시에 시작해요?","ヨングシル セミナヌン ミョッ シエ シジャケヨ","研究室のゼミは何時に始まりますか。","연구실=研究室。"],
 ["이 결과는 통계적으로 유의미합니다.","イ キョルグァヌン トンゲジョグロ ユイミハムニダ","この結果は統計的に有意です。",""],
 ["발표를 들어 주셔서 감사합니다.","パルピョルル トゥロ ジュショソ カムサハムニダ","発表を聞いていただき、ありがとうございました。",""]]);
XU('x-res-ko2','研究者の韓国語 出願・面接','ACADEMIC KOREAN 2','ko',[
 ["대학원 석사 과정에 지원하려고 합니다.","テハグォン ソクサ クァジョンエ チウォナリョゴ ハムニダ","大学院の修士課程に出願しようと思っています。","석사=修士、박사=博士。"],
 ["제 연구 관심 분야는 재생 에너지입니다.","チェ ヨング クァンシム プニャヌン チェセン エノジイムニダ","私の研究の関心分野は、再生可能エネルギーです。","분야=分野。"],
 ["김 교수님 연구실에서 연구하고 싶습니다.","キム キョスニム ヨングシレソ ヨングハゴ シプスムニダ","キム教授の研究室で研究したいです。",""],
 ["이력서와 연구 계획서를 첨부했습니다.","イリョクソワ ヨング ケフェクソルル チョムブヘッスムニダ","履歴書と研究計画書を添付しました。","첨부하다=添付する。"],
 ["유학생을 위한 장학금이 있나요?","ユハクセンウル ウィハン チャンハックミ インナヨ","留学生のための奨学金はありますか。","장학금=奨学金。"],
 ["왜 이 분야에 관심을 갖게 되었나요?","ウェ イ プニャエ クァンシムル カッケ トェオンナヨ","なぜこの分野に興味を持つようになったのですか。","面接の定番の質問。"],
 ["배운 것을 실제 문제 해결에 활용하고 싶습니다.","ペウン ゴスル シルチェ ムンジェ ヘギョレ ファリョンハゴ シプスムニダ","学んだことを、実際の問題の解決に生かしたいです。","활용하다=活用する。"],
 ["한국어 실력은 토픽 사급입니다.","ハングゴ シルリョグン トピク サグビムニダ","韓国語の実力はTOPIK 4級です。","실력=実力。"]]);
XU('x-res-ko3','研究者の韓国語 授業・ゼミ','ACADEMIC KOREAN 3','ko',[
 ["그 용어의 뜻을 다시 설명해 주시겠어요?","ク ヨンオエ ットゥスル タシ ソルミョンヘ ジュシゲッソヨ","その用語の意味を、もう一度説明していただけますか。","용어=用語。"],
 ["말씀하신 내용은 이해하지만, 저는 조금 다르게 생각합니다.","マルッスマシン ネヨンウン イヘハジマン チョヌン チョグム タルゲ センガカムニダ","おっしゃることは分かりますが、私は少し違う考えです。","말씀하시다=おっしゃる。"],
 ["기말 보고서 마감이 언제예요?","キマル ポゴソ マガミ オンジェエヨ","期末レポートの締め切りはいつですか。","마감=締め切り。"],
 ["이 논문은 많은 연구에서 인용되고 있어요.","イ ノンムヌン マヌン ヨングエソ イニョンドェゴ イッソヨ","この論文は多くの研究で引用されています。","인용=引用。"],
 ["세미나 전에 이 자료를 읽어 오세요.","セミナ チョネ イ チャリョルル イルゴ オセヨ","ゼミの前に、この資料を読んできてください。","〜어 오다=〜してくる。"],
 ["발표 순서는 어떻게 정해요?","パルピョ スンソヌン オットッケ チョンヘヨ","発表の順番はどう決めますか。","순서=順番。"],
 ["교수님, 상담 시간에 찾아뵈어도 될까요?","キョスニム サンダム シガネ チャジャブェオド トェルッカヨ","先生、相談の時間にうかがってもいいですか。","찾아뵙다=うかがう(찾아가다の謙譲語)。"],
 ["이 부분이 잘 이해가 안 돼요.","イ プブニ チャル イヘガ アン ドェヨ","この部分がよく分かりません。",""]]);
XU('x-res-ko4','研究者の韓国語 実験・研究室','ACADEMIC KOREAN 4','ko',[
 ["이 현미경 사용법을 알려 주시겠어요?","イ ヒョンミギョン サヨンボブル アルリョ ジュシゲッソヨ","この顕微鏡の使い方を教えていただけますか。","사용법=使い方。"],
 ["측정 결과는 모두 실험 노트에 기록해 주세요.","チュクチョン キョルグァヌン モドゥ シロム ノトゥエ キロケ ジュセヨ","測定結果はすべて実験ノートに記録してください。","측정=測定。"],
 ["샘플은 영하 팔십 도에서 보관해야 해요.","セムプルン ヨンハ パルシプ トエソ ポグァネヤ ヘヨ","サンプルはマイナス80度で保管しなければなりません。","영하=零下(マイナス)。"],
 ["먼저 윤리 위원회의 승인이 필요해요.","モンジョ ユルリ ウィウォネエ スンイニ ピリョヘヨ","まず倫理委員会の承認が必要です。","승인=承認。"],
 ["데이터는 공유 폴더에 올려 둘게요.","デイトヌン コンユ ポルドエ オルリョ ドゥルケヨ","データは共有フォルダに上げておきますね。","올리다=アップロードする。"],
 ["실험 장비는 쓰고 나서 꼭 정리해 주세요.","シロム チャンビヌン ッスゴ ナソ ッコク チョンニヘ ジュセヨ","実験の機器は、使ったあと必ず片付けてください。","정리하다=片付ける。"],
 ["결과가 예상과 달라서 다시 확인하고 있어요.","キョルグァガ イェサングァ タルラソ タシ ファギナゴ イッソヨ","結果が予想と違うので、もう一度確認しています。","예상=予想。"],
 ["이번 주 진행 상황을 공유하겠습니다.","イボン チュ チネン サンファンウル コンユハゲッスムニダ","今週の進み具合を共有します。","진행 상황=進行状況。"]]);
XU('x-res-ko5','研究者の韓国語 論文・学会','ACADEMIC KOREAN 5','ko',[
 ["이 연구의 목적은 수면과 기억의 관계를 밝히는 것입니다.","イ ヨングエ モクチョグン スミョングァ キオゲ クァンゲルル パルキヌン ゴシムニダ","この研究の目的は、睡眠と記憶の関係を明らかにすることです。","밝히다=明らかにする。"],
 ["선행 연구에서도 비슷한 결과가 나왔습니다.","ソネン ヨングエソド ピスタン キョルグァガ ナワッスムニダ","先行研究でも、似た結果が出ています。","선행 연구=先行研究。"],
 ["이 연구의 한계는 표본 수가 적다는 점입니다.","イ ヨングエ ハンゲヌン ピョボン スガ チョクタヌン チョミムニダ","この研究の限界は、サンプル数が少ないことです。","한계=限界、표본=標本(サンプル)。"],
 ["심사위원이 데이터를 추가하라고 했어요.","シムサウィウォニ デイトルル チュガハラゴ ヘッソヨ","査読者からデータを追加するように言われました。","〜라고 했어요=〜と言いました(命令の引用)。"],
 ["논문을 국제 학술지에 투고할 예정입니다.","ノンムヌル クッチェ ハクスルチエ トゥゴハル イェジョンイムニダ","論文を国際学術誌に投稿する予定です。","투고하다=投稿する。"],
 ["학회 발표 자료를 준비하고 있어요.","ハケ パルピョ チャリョルル チュンビハゴ イッソヨ","学会発表の資料を準備しています。","학회=学会。"],
 ["질문하신 부분은 다음 연구에서 다루겠습니다.","チルムナシン プブヌン タウム ヨングエソ タルゲッスムニダ","ご質問の点は、次の研究で扱います。","다루다=扱う。"],
 ["공동 연구를 제안하고 싶습니다.","コンドン ヨングルル チェアナゴ シプスムニダ","共同研究を提案したいです。","공동=共同。"]]);
XU('x-res-es1','研究者のスペイン語 研究室・学会','ACADEMIC SPANISH 1','es',[
 ["Hoy voy a presentar los resultados de nuestro estudio.","","今日は、私たちの研究結果を発表します。",""],
 ["Como se puede ver en este gráfico, la diferencia es clara.","","このグラフで分かるとおり、違いははっきりしています。","se puede=(一般に)〜できる。"],
 ["Muchas gracias por la pregunta.","","質問をありがとうございます。",""],
 ["¿Podría revisar el borrador de mi artículo?","","論文の下書きを見ていただけますか。","borrador=下書き。artículo=論文。"],
 ["Vamos a repetir el experimento mañana.","","明日、実験をもう一度行います。",""],
 ["El objetivo de este estudio es analizar los datos de diez años.","","この研究の目的は、10年分のデータを分析することです。","objetivo=目的。"],
 ["Una limitación del estudio es el tamaño de la muestra.","","この研究の限界は、サンプルの大きさです。","muestra=サンプル。"],
 ["Gracias por su atención.","","ご清聴ありがとうございました。",""]]);
XU('x-res-es2','研究者のスペイン語 出願・面接','ACADEMIC SPANISH 2','es',[
 ["Quiero solicitar el máster en ingeniería aeroespacial.","","航空宇宙工学の修士課程に出願したいです。","solicitar=申請する、máster=修士課程。"],
 ["Mi interés de investigación son las energías renovables.","","私の研究の関心は、再生可能エネルギーです。","investigación=研究。"],
 ["Me gustaría trabajar bajo la dirección de la profesora García.","","ガルシア教授の指導のもとで研究したいです。","bajo la dirección de 〜=〜の指導のもとで。"],
 ["Adjunto mi currículum y mi propuesta de investigación.","","履歴書と研究計画書を添付します。","adjuntar=添付する。"],
 ["¿Hay becas para estudiantes internacionales?","","留学生向けの奨学金はありますか。","beca=奨学金。"],
 ["¿Por qué le interesa este campo?","","なぜこの分野に興味があるのですか。","campo=分野。面接の定番の質問。"],
 ["Quiero aplicar lo que aprenda a problemas reales.","","学んだことを、現実の問題に生かしたいです。","lo que aprenda=これから学ぶこと(接続法)。"],
 ["Tengo un nivel B2 de español.","","スペイン語はB2レベルです。",""]]);
XU('x-res-es3','研究者のスペイン語 授業・ゼミ','ACADEMIC SPANISH 3','es',[
 ["¿Podría aclarar qué significa ese término?","","その用語の意味を、はっきりさせていただけますか。","aclarar=明確にする。"],
 ["Entiendo su punto, pero lo veo de otra manera.","","おっしゃることは分かりますが、私は違う見方をしています。","de otra manera=別のやり方で。"],
 ["¿Cuándo es la fecha límite del trabajo final?","","期末レポートの締め切りはいつですか。","fecha límite=締め切り。"],
 ["Este artículo se cita en muchos estudios posteriores.","","この論文は、その後の多くの研究で引用されています。","se cita=引用される(受け身の se)。"],
 ["Lean este texto antes del seminario.","","ゼミの前に、この文章を読んできてください。",""],
 ["¿Cómo decidimos el orden de las presentaciones?","","発表の順番はどう決めますか。",""],
 ["¿Podría verle en su horario de tutorías?","","相談の時間にお会いできますか。","tutorías=(先生の)学生相談の時間。"],
 ["No entiendo bien esta parte.","","この部分がよく分かりません。",""]]);
XU('x-res-es4','研究者のスペイン語 実験・研究室','ACADEMIC SPANISH 4','es',[
 ["¿Me podría enseñar a usar este microscopio?","","この顕微鏡の使い方を教えていただけますか。",""],
 ["Anoten todas las mediciones en el cuaderno de laboratorio.","","測定はすべて実験ノートに記録してください。","medición=測定。"],
 ["Las muestras deben guardarse a ochenta grados bajo cero.","","サンプルはマイナス80度で保管しなければなりません。","bajo cero=氷点下。"],
 ["Primero necesitamos la aprobación del comité de ética.","","まず倫理委員会の承認が必要です。",""],
 ["Voy a subir los datos a la carpeta compartida.","","データを共有フォルダにアップロードします。","subir=アップロードする。"],
 ["Después de usar el equipo, déjenlo ordenado.","","機器を使ったあとは、片付けておいてください。",""],
 ["Los resultados no coinciden con lo esperado.","","結果が予想と一致しません。","coincidir con 〜=〜と一致する。"],
 ["Esta semana compartiré mis avances.","","今週、進み具合を共有します。","avances=進展。"]]);
XU('x-res-es5','研究者のスペイン語 論文・学会','ACADEMIC SPANISH 5','es',[
 ["Estudios previos han obtenido resultados similares.","","先行研究でも、似た結果が得られています。",""],
 ["Los resultados fueron estadísticamente significativos.","","結果は統計的に有意でした。",""],
 ["Los revisores nos pidieron más datos.","","査読者から、もっとデータを求められました。","revisor=査読者。"],
 ["Vamos a enviar el artículo a una revista internacional.","","論文を国際誌に投稿します。","revista=雑誌(学術誌)。"],
 ["Estoy preparando la presentación para el congreso.","","学会の発表を準備しています。","congreso=学会。"],
 ["Abordaremos esa cuestión en un próximo estudio.","","その点は、次の研究で取り上げます。","abordar=取り組む、扱う。"],
 ["Me gustaría proponer una colaboración.","","共同研究を提案したいです。",""],
 ["¿Quién debería figurar como primer autor?","","筆頭著者には誰の名前を書くべきですか。","figurar=(名前が)載る。"]]);
XU('x-res-it1','研究者のイタリア語 研究室・学会','ACADEMIC ITALIAN 1','it',[
 ["Oggi presento i risultati della nostra ricerca.","","今日は、私たちの研究結果を発表します。",""],
 ["Come si vede in questo grafico, la differenza è chiara.","","このグラフで分かるとおり、違いははっきりしています。",""],
 ["Grazie per la domanda.","","質問をありがとうございます。",""],
 ["Professore, potrebbe leggere la bozza della mia tesi?","","先生、私の論文の下書きを読んでいただけますか。","bozza=下書き。tesi=論文。"],
 ["Ripeteremo l'esperimento domani.","","明日、実験をもう一度行います。",""],
 ["Lo scopo di questo studio è analizzare i dati raccolti.","","この研究の目的は、集めたデータを分析することです。","scopo=目的。"],
 ["Un limite dello studio è il numero ridotto di campioni.","","この研究の限界は、サンプル数が少ないことです。","campione=サンプル。"],
 ["Grazie per l'attenzione.","","ご清聴ありがとうございました。",""]]);
XU('x-res-it2','研究者のイタリア語 出願・面接','ACADEMIC ITALIAN 2','it',[
 ["Vorrei candidarmi al corso di laurea magistrale in ingegneria aerospaziale.","","航空宇宙工学の修士課程に出願したいです。","candidarsi=応募する、laurea magistrale=修士課程。"],
 ["Il mio interesse di ricerca sono le energie rinnovabili.","","私の研究の関心は、再生可能エネルギーです。",""],
 ["Mi piacerebbe lavorare sotto la supervisione del professor Rossi.","","ロッシ教授の指導のもとで研究したいです。","sotto la supervisione di 〜=〜の指導のもとで。"],
 ["Allego il mio curriculum e il progetto di ricerca.","","履歴書と研究計画書を添付します。","allegare=添付する。"],
 ["Ci sono borse di studio per studenti internazionali?","","留学生向けの奨学金はありますか。","borsa di studio=奨学金。"],
 ["Perché le interessa questo campo?","","なぜこの分野に興味があるのですか。","面接の定番の質問。"],
 ["Voglio applicare ciò che imparo a problemi reali.","","学んだことを、現実の問題に生かしたいです。","ciò che=〜すること(もの)。"],
 ["Il mio livello di italiano è B2.","","イタリア語はB2レベルです。",""]]);
XU('x-res-it3','研究者のイタリア語 授業・ゼミ','ACADEMIC ITALIAN 3','it',[
 ["Potrebbe chiarire il significato di quel termine?","","その用語の意味を、はっきりさせていただけますか。","chiarire=明確にする。"],
 ["Capisco il suo punto di vista, ma la vedo diversamente.","","おっしゃることは分かりますが、私は違う見方をしています。","vederla diversamente=違う見方をする。"],
 ["Qual è la scadenza per la tesina?","","レポートの締め切りはいつですか。","scadenza=締め切り、tesina=短い論文、レポート。"],
 ["Questo articolo è citato in molti studi successivi.","","この論文は、その後の多くの研究で引用されています。",""],
 ["Leggete questo testo prima del seminario.","","ゼミの前に、この文章を読んできてください。",""],
 ["Come decidiamo l'ordine delle presentazioni?","","発表の順番はどう決めますか。",""],
 ["Posso venire durante il suo orario di ricevimento?","","相談の時間にうかがってもいいですか。","orario di ricevimento=(先生の)面談の時間。"],
 ["Non mi è chiara questa parte.","","この部分がよく分かりません。","mi è chiaro=私にとって明らかだ。"]]);
XU('x-res-it4','研究者のイタリア語 実験・研究室','ACADEMIC ITALIAN 4','it',[
 ["Mi potrebbe mostrare come si usa questo microscopio?","","この顕微鏡の使い方を見せていただけますか。",""],
 ["Annotate tutte le misure sul quaderno di laboratorio.","","測定はすべて実験ノートに記録してください。","misura=測定値。"],
 ["I campioni vanno conservati a meno ottanta gradi.","","サンプルはマイナス80度で保管しなければなりません。","vanno+過去分詞=〜されなければならない。"],
 ["Prima serve l'approvazione del comitato etico.","","まず倫理委員会の承認が必要です。","serve 〜=〜が必要だ。"],
 ["Carico i dati nella cartella condivisa.","","データを共有フォルダにアップロードします。","caricare=アップロードする。"],
 ["Dopo aver usato lo strumento, rimettetelo in ordine.","","機器を使ったあとは、片付けてください。",""],
 ["I risultati non corrispondono a quanto previsto.","","結果が予想と一致しません。","corrispondere a 〜=〜と一致する。"],
 ["Questa settimana condivido i miei progressi.","","今週、進み具合を共有します。","progressi=進歩、進展。"]]);
XU('x-res-it5','研究者のイタリア語 論文・学会','ACADEMIC ITALIAN 5','it',[
 ["Studi precedenti hanno ottenuto risultati simili.","","先行研究でも、似た結果が得られています。",""],
 ["I risultati sono statisticamente significativi.","","結果は統計的に有意です。",""],
 ["I revisori ci hanno chiesto più dati.","","査読者から、もっとデータを求められました。","revisore=査読者。"],
 ["Invieremo l'articolo a una rivista internazionale.","","論文を国際誌に投稿します。","rivista=雑誌(学術誌)。"],
 ["Sto preparando la presentazione per il convegno.","","学会の発表を準備しています。","convegno=学会。"],
 ["Affronteremo questa questione in uno studio futuro.","","その点は、今後の研究で取り上げます。","affrontare=取り組む。"],
 ["Vorrei proporre una collaborazione.","","共同研究を提案したいです。",""],
 ["Chi dovrebbe essere il primo autore?","","筆頭著者は誰にするべきですか。",""]]);
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
XU('x-ca3','客室乗務員の英語 機内サービス','CABIN SERVICE','en',[
 ["Would you like chicken or beef?","","チキンとビーフ、どちらになさいますか。","機内食の定番の聞き方。"],
 ["I'm sorry, we've run out of the chicken.","","申し訳ありません、チキンは終わってしまいました。","run out of 〜=〜を切らす。"],
 ["Can I get you anything else to drink?","","ほかにお飲み物はいかがですか。",""],
 ["Please lower your window shade.","","窓のシェードを下ろしていただけますか。","window shade=窓の日よけ。"],
 ["Would you mind switching seats with this passenger?","","こちらのお客様と、席を替わっていただけますか。","Would you mind 〜ing?=〜していただけますか(ていねい)。"],
 ["Your bag needs to go in the overhead bin.","","お荷物は頭上の物入れに入れてください。","overhead bin=頭上の収納棚。"],
 ["Please keep your seat belt fastened while seated.","","座っている間は、シートベルトをお締めください。",""],
 ["Duty-free sales will begin shortly.","","まもなく免税品の販売を始めます。","duty-free=免税の。"]]);
XU('x-ca4','客室乗務員の英語 お客様対応','PASSENGER CARE','en',[
 ["I'm very sorry for the inconvenience.","","ご不便をおかけして、大変申し訳ありません。","inconvenience=不便、迷惑。おわびの定番。"],
 ["Let me see what I can do for you.","","何ができるか、確認してみます。",""],
 ["I'll bring you a blanket right away.","","すぐに毛布をお持ちします。",""],
 ["Is this your first time flying with us?","","当社のご利用は初めてですか。",""],
 ["Are you travelling for business or pleasure?","","お仕事のご旅行ですか、観光ですか。","pleasure=楽しみ(観光)。"],
 ["Is there a doctor on board?","","お客様の中に、お医者様はいらっしゃいますか。","on board=機内に。"],
 ["Please breathe slowly. You're going to be fine.","","ゆっくり呼吸してください。大丈夫ですよ。",""],
 ["I'll let the captain know right away.","","すぐに機長に伝えます。",""]]);
XU('x-ca5','客室乗務員の英語 安全と緊急','CABIN SAFETY','en',[
 ["The emergency exits are located here, here and here.","","非常口はこちら、こちら、そしてこちらです。","安全デモの決まった言い方。"],
 ["Your life vest is under your seat.","","救命胴衣は座席の下にあります。","life vest=救命胴衣。"],
 ["Put on your own mask before helping others.","","ほかの人を手伝う前に、まずご自分のマスクをつけてください。","酸素マスクの案内の大事なルール。"],
 ["Leave everything behind!","","荷物は置いていってください!","緊急脱出のときの指示。"],
 ["Release your seat belt and get out!","","シートベルトを外して、外へ出てください!",""],
 ["Jump and slide!","","飛び降りて、すべって!","脱出用スライドの指示。"],
 ["Brace! Brace! Heads down, stay down!","","衝撃に備えて! 頭を下げて、そのまま!","brace=衝撃に備える。"],
 ["Cabin crew, prepare for landing.","","客室乗務員は着陸の準備をしてください。","機長から乗務員への指示。"]]);
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
XU('x-it3','ITエンジニアの英語 設計の話し合い','IT ENGLISH 3','en',[
 ["Let's break this feature down into smaller tasks.","","この機能を小さなタスクに分けましょう。","break down=細かく分ける。"],
 ["What are the requirements for this feature?","","この機能の要件は何ですか。","requirements=要件。"],
 ["I'd go with option B because it's easier to maintain.","","保守しやすいので、B案にします。","go with 〜=〜を選ぶ。maintain=保守する。"],
 ["That might cause performance issues at scale.","","規模が大きくなると、性能の問題が起きるかもしれません。","at scale=大規模になったとき。"],
 ["Can we agree on the API design before we start coding?","","コードを書く前に、APIの設計を決めませんか。",""],
 ["How long do you think this will take?","","これにどのくらい時間がかかると思いますか。","見積もりを聞くときの定番。"],
 ["I think we're overcomplicating this.","","これは複雑にしすぎていると思います。","overcomplicate=必要以上に複雑にする。"],
 ["Let's revisit this in the next sprint.","","これは次のスプリントでもう一度考えましょう。","sprint=短い開発期間の区切り。"]]);
XU('x-it4','ITエンジニアの英語 バグとリリース','IT ENGLISH 4','en',[
 ["I can't reproduce the bug on my machine.","","自分の環境では、そのバグを再現できません。","reproduce=再現する。"],
 ["Can you share the error message and the steps?","","エラーメッセージと手順を共有してもらえますか。",""],
 ["It works on staging but not in production.","","検証環境では動きますが、本番では動きません。","staging=本番前の検証環境、production=本番環境。"],
 ["I added a test that covers this edge case.","","このまれなケースを確かめるテストを追加しました。","edge case=めったに起きない境界のケース。"],
 ["The build is failing because of a missing dependency.","","依存関係が足りないため、ビルドが失敗しています。","dependency=依存しているライブラリなど。"],
 ["We're planning to release on Thursday.","","木曜日にリリースする予定です。",""],
 ["Let's put this behind a feature flag.","","これは機能フラグで切り替えられるようにしましょう。","feature flag=機能をオン・オフできる仕組み。"],
 ["I'll write up the release notes.","","リリースノートをまとめます。","write up=文書にまとめる。"]]);
XU('x-it5','ITエンジニアの英語 リモートとキャリア','IT ENGLISH 5','en',[
 ["Sorry, you're breaking up. Could you say that again?","","すみません、音声が途切れています。もう一度言ってもらえますか。",""],
 ["Can everyone see my screen?","","みなさん、私の画面が見えていますか。",""],
 ["I'm going to be offline for an hour.","","1時間ほどオフラインになります。",""],
 ["Let's continue this discussion in the chat.","","この話はチャットで続けましょう。",""],
 ["I'm a backend engineer with three years of experience.","","経験3年のバックエンドエンジニアです。",""],
 ["I'm comfortable with Python and Go.","","PythonとGoが使えます。","comfortable with 〜=〜を問題なく使える。"],
 ["I'd like to grow into a tech lead role.","","将来はテックリードの役割を目指したいです。","grow into 〜=成長して〜になる。"],
 ["What does a typical day look like for this team?","","このチームのふだんの1日はどんな感じですか。","面接の逆質問の定番。"]]);
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
XU('x-beauty3','美容師の英語 予約と受付','SALON ENGLISH 3','en',[
 ["Do you have an appointment?","","ご予約はされていますか。",""],
 ["We have an opening at three o'clock.","","3時なら空いています。","opening=空き。"],
 ["It takes about an hour and a half.","","1時間半ほどかかります。",""],
 ["The price depends on the length of your hair.","","料金は髪の長さによって変わります。","depend on 〜=〜による。"],
 ["Please have a seat. I'll be with you shortly.","","おかけください。すぐにまいります。",""],
 ["May I take your coat?","","コートをお預かりしましょうか。",""],
 ["Would you like something to drink while you wait?","","お待ちの間、何かお飲みになりますか。",""],
 ["Please fill out this form about your hair and scalp.","","髪と頭皮についての用紙にご記入ください。","scalp=頭皮。"]]);
XU('x-beauty4','美容師の英語 施術中の会話','SALON ENGLISH 4','en',[
 ["I'm going to trim the ends.","","毛先をそろえますね。","trim=少し切ってそろえる。"],
 ["Would you like your bangs shorter?","","前髪を短くしますか。","bangs=前髪(アメリカ英語)。イギリスでは fringe。"],
 ["Is the temperature of the dryer all right?","","ドライヤーの温度は大丈夫ですか。",""],
 ["Please tilt your head forward a little.","","少し頭を前に傾けてください。","tilt=傾ける。"],
 ["Your hair is quite damaged at the ends.","","毛先がかなり傷んでいますね。","damaged=傷んだ。"],
 ["I'd recommend a treatment to add moisture.","","うるおいを足すトリートメントをおすすめします。","moisture=うるおい、水分。"],
 ["Let me know if anything feels uncomfortable.","","何か気になることがあったら教えてください。",""],
 ["I'm going to blow-dry and style it now.","","これからブローして、スタイリングしますね。","blow-dry=ドライヤーでブローする。"]]);
XU('x-beauty5','美容師の英語 仕上げとヘアケア','SALON ENGLISH 5','en',[
 ["Here's a mirror so you can see the back.","","後ろが見えるように、鏡をどうぞ。",""],
 ["Would you like any changes?","","どこか直したいところはありますか。",""],
 ["Use a small amount of wax and work it through with your fingers.","","ワックスを少し取って、指でなじませてください。","work through=(髪全体に)なじませる。"],
 ["Dry your hair from the roots first.","","髪は根元から先に乾かしてください。","roots=根元。"],
 ["A wide-tooth comb is gentler on wet hair.","","ぬれた髪には、目の粗いくしのほうがやさしいです。","wide-tooth comb=目の粗いくし。"],
 ["We recommend coming back in about six weeks.","","6週間後くらいにまたお越しいただくのがおすすめです。",""],
 ["That comes to sixty dollars in total.","","合計で60ドルになります。","That comes to 〜=合計〜になります。"],
 ["Thank you for coming. See you next time!","","ご来店ありがとうございました。またお待ちしています!",""]]);
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
XU('x-sport3','スポーツ選手の英語 試合中の声かけ','SPORTS ENGLISH 3','en',[
 ["Keep your shape!","","ポジションを崩すな!","shape=チームの形(陣形)。"],
 ["Mark number ten!","","10番をマークして!","mark=相手について守る。"],
 ["Switch the play!","","サイドを変えて!","switch the play=ボールを逆サイドへ展開する。"],
 ["Take your time, you've got space.","","落ち着いて、スペースがあるよ。",""],
 ["Push up! Everyone, move up!","","ラインを上げて!みんな前へ!",""],
 ["Unlucky! Keep going!","","惜しい!そのまま続けて!","unlucky=惜しい(失敗した仲間をはげます言い方)。"],
 ["Last five minutes. Stay focused!","","残り5分。集中して!",""],
 ["Well played! That was a great assist.","","ナイスプレー!いいアシストだったよ。","assist=得点につながったパス。"]]);
XU('x-sport4','スポーツ選手の英語 コーチと練習','SPORTS ENGLISH 4','en',[
 ["What do you want me to work on this week?","","今週は何を重点的に練習すればいいですか。","work on 〜=〜に取り組む。"],
 ["Could you give me some feedback on my performance?","","私のプレーについて、意見をもらえますか。","performance=(試合での)出来。"],
 ["I'll do extra training after practice.","","練習のあとに、自主練習をします。",""],
 ["We're doing interval runs today.","","今日はインターバル走をします。",""],
 ["Let's warm up properly to avoid injuries.","","ケガをしないように、しっかりウォーミングアップしよう。",""],
 ["I need to improve my stamina.","","持久力をもっと上げる必要があります。","stamina=持久力、スタミナ。"],
 ["How much rest should I take between sets?","","セットの間にどのくらい休めばいいですか。",""],
 ["What's the game plan for Saturday?","","土曜日の試合の作戦は何ですか。","game plan=試合の作戦。"]]);
XU('x-sport5','スポーツ選手の英語 移籍と海外生活','SPORTS ENGLISH 5','en',[
 ["I'm excited to start a new chapter here.","","ここで新しいスタートを切れるのが楽しみです。","a new chapter=新しい章(人生の新しい段階)。"],
 ["My agent is handling the negotiations.","","交渉は代理人に任せています。","agent=代理人(エージェント)。"],
 ["I signed a two-year contract with the club.","","クラブと2年契約を結びました。","sign a contract=契約に署名する。"],
 ["I'm still getting used to the food and the weather.","","食べ物と気候にはまだ慣れているところです。","get used to 〜=〜に慣れる。"],
 ["My teammates have helped me settle in.","","チームメイトのおかげで、すぐになじめました。","settle in=(新しい環境に)落ち着く、なじむ。"],
 ["I'm taking English lessons twice a week.","","週に2回、英語のレッスンを受けています。",""],
 ["I want to give back to the local community.","","地域の人たちに恩返しがしたいです。","give back=恩返しする。"],
 ["Thank you for your support all season.","","シーズンを通して応援ありがとうございました。",""]]);
ORDER.forEach(function(l){ALL_IDS[l]=Object.keys(UNITS[l]);});

/* banks (ビジネス = tier 2, like ICAO) */
XBANK.icao.ids.push('x-icao2','x-icao3','x-icao4','x-icao5');
[['aero','en','航空無線通信士(英語)',['x-aero1','x-aero2','x-aero3','x-aero4','x-aero5']],['oet','en','OET',['x-oet1','x-oet2','x-oet3','x-oet4','x-oet5']],['oetph','en','OET(薬剤師)',['x-oetph1','x-oetph2','x-oetph3','x-oetph4','x-oetph5']],
 ['toles','en','TOLES',['x-toles1','x-toles2','x-toles3','x-toles4','x-toles5']],['bec','en','ケンブリッジ英検ビジネス',['x-bec1','x-bec2','x-bec3','x-bec4','x-bec5']],['servsafe','en','ServSafe Food Handler',['x-servsafe1','x-servsafe2','x-servsafe3','x-servsafe4','x-servsafe5']],
 ['celta','en','CELTA・TEFL',['x-celta1','x-celta2','x-celta3','x-celta4','x-celta5']],['kanko','en','観光英語検定',['x-kanko1','x-kanko2','x-kanko3','x-kanko4','x-kanko5']],['guide-en','en','全国通訳案内士(英語)',['x-guide1','x-guide2','x-guide3','x-guide4','x-guide5']],
 ['guide-ko','ko','全国通訳案内士(韓国語)',['x-guide-ko1','x-guide-ko2','x-guide-ko3','x-guide-ko4','x-guide-ko5']],['guide-es','es','全国通訳案内士(スペイン語)',['x-guide-es1','x-guide-es2','x-guide-es3','x-guide-es4','x-guide-es5']],['guide-it','it','全国通訳案内士(イタリア語)',['x-guide-it1','x-guide-it2','x-guide-it3','x-guide-it4','x-guide-it5']],
 ['acad-en','en','IELTS(研究・大学院)',['x-res1','x-res2','x-res3','x-res4','x-res5']],['acad-ko','ko','TOPIK(研究・大学院)',['x-res-ko1','x-res-ko2','x-res-ko3','x-res-ko4','x-res-ko5']],['acad-es','es','DELE(研究・大学院)',['x-res-es1','x-res-es2','x-res-es3','x-res-es4','x-res-es5']],
 ['acad-it','it','CILS(研究・大学院)',['x-res-it1','x-res-it2','x-res-it3','x-res-it4','x-res-it5']],['crew','en','TOEIC(客室乗務員)',['x-ca1','x-ca2','x-ca3','x-ca4','x-ca5']],
 ['it-en','en','ITエンジニアの英語',['x-it1','x-it2','x-it3','x-it4','x-it5']],['beauty-en','en','美容師の英語',['x-beauty1','x-beauty2','x-beauty3','x-beauty4','x-beauty5']],['sport-en','en','スポーツ選手の英語',['x-sport1','x-sport2','x-sport3','x-sport4','x-sport5']]
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
    var p=profById(save.prof),ks=typeof jobxLineList==='function'?jobxLineList(L):jobxList(L),line;
    if(!p)line='職業モードで職業を選ぶと、その職業の資格もここに並びます。';
    else if(ks.length&&ks.every(function(k){return JOBX_C[k].practice;}))line='「'+p.jp+'」には語学の資格がないので、仕事の場面の練習を入れています(公式の資格ではありません)。';
    else if(ks.length)line='「'+p.jp+'」の資格: '+ks.map(function(k){return JOBX_C[k].title;}).join('・')+'(職業は職業モードで変えられます)';
    else line='「'+p.jp+'」の'+(L==='en'?'英語の':'')+'資格は準備中です。';
    if(L==='en')h=h.replace('TOEFL®</span>','TOEFL®・OET・TOLES・Cambridge English・ServSafe・CELTA</span>');
    var i=h.lastIndexOf('<p class="exam-tm">');
    return i<0?h:h.slice(0,i)+'<p class="dim hint jobx-line"><span aria-hidden="true">💼</span> '+esc(line)+'</p>'+h.slice(i);
  };
})();
