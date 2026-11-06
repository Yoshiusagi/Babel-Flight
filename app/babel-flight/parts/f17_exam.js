/* ================= 検定コース: content (standalone site, test account only for now) =================
   Every sentence here is original practice material written for Babel Flight. Nothing is taken from
   real past papers. Exam names are trademarks of their owners; these courses are not official. */
/* XU(uid, title, latin title, language, [[target, reading, Japanese, note, (words for 並べ替え: Chinese, Japanese)], ...]) */
function XU(uid,jp,lat,L,list){
  UM[uid]={jp:jp,lat:lat};
  UNITS[L][uid]={id:uid,items:list.map(function(x){return {jp:x[2],t:x[0],r:x[1]||'',n:x[3]||'',s:x[4]||''};}),track:'exam'};
}
/* ---- English: 英検 ---- */
XU('x-ek5','英検5級 ステップ1','EIKEN 5 STEP 1','en',[
 ["I'm a junior high school student.","","私は中学生です。","junior high school=中学校。I am を短くすると I'm。"],
 ["What time is it now?","","今何時ですか。","時刻をたずねる定番の文。"],
 ["This is my bag.","","これは私のかばんです。",""],
 ["Do you like music?","","あなたは音楽が好きですか。","一般動詞の疑問文は Do で始めます。"],
 ["I play tennis every Sunday.","","私は毎週日曜日にテニスをします。","every Sunday=毎週日曜日。on はつけません。"],
 ["Can you swim?","","あなたは泳げますか。",""],
 ["My sister is ten years old.","","私の妹は10歳です。",""],
 ["How many books do you have?","","あなたは本を何冊持っていますか。","How many+複数形で「いくつの〜」。"]]);
XU('x-ek4','英検4級 ステップ1','EIKEN 4 STEP 1','en',[
 ["I went to the library yesterday.","","私は昨日図書館に行きました。","go の過去形は went(不規則に変わる)。"],
 ["What are you going to do this weekend?","","今週末は何をする予定ですか。","be going to=〜する予定。"],
 ["It was rainy last Saturday.","","先週の土曜日は雨でした。",""],
 ["I have to finish my homework.","","私は宿題を終わらせなければなりません。","have to=〜しなければならない。"],
 ["Which season do you like the best?","","どの季節がいちばん好きですか。",""],
 ["My father usually gets up at six.","","父はたいてい6時に起きます。","主語が3人称単数なので gets。"],
 ["Shall we have lunch together?","","一緒にお昼ごはんを食べませんか。","Shall we 〜?=〜しませんか(誘い)。"],
 ["I was watching TV when you called.","","あなたが電話したとき、私はテレビを見ていました。","過去進行形(was+〜ing)=〜していた。"]]);
XU('x-ek3','英検3級 ステップ1','EIKEN 3 STEP 1','en',[
 ["I have lived in Tokyo for five years.","","私は東京に5年間住んでいます。","現在完了(継続)。for=〜の間。"],
 ["This book is more interesting than that one.","","この本はあの本よりおもしろいです。","長い形容詞は more をつけて比べます。"],
 ["I want to be a pilot in the future.","","私は将来パイロットになりたいです。",""],
 ["Have you ever been to Kyoto?","","京都に行ったことはありますか。","have been to=〜に行ったことがある。"],
 ["The dog was found by a little boy.","","その犬は小さな男の子に見つけられました。","受け身(be+過去分詞)。"],
 ["Do you know where the station is?","","駅がどこにあるか知っていますか。","文の中の疑問文は「疑問詞+主語+動詞」の順。"],
 ["It is important to study every day.","","毎日勉強することが大切です。","It is 〜 to …=…することは〜だ。"],
 ["I'm looking forward to seeing you.","","あなたに会えるのを楽しみにしています。","look forward to のあとは〜ing形。"]]);
XU('x-ekp2','英検準2級 ステップ1','EIKEN PRE-2 STEP 1','en',[
 ["I'm thinking of studying abroad next year.","","来年、留学しようかと考えています。",""],
 ["If I had more time, I would travel around the world.","","もっと時間があれば、世界中を旅するのに。","仮定法過去=今の事実とちがうことを想像する言い方。"],
 ["The festival was canceled because of the typhoon.","","台風のせいでお祭りは中止になりました。","canceled はアメリカ式のつづり。イギリス式は cancelled。"],
 ["It took me two hours to get there.","","そこに行くのに2時間かかりました。","It took 人 時間 to 〜=人が〜するのに時間がかかった。"],
 ["I'm used to getting up early.","","私は早起きに慣れています。","be used to 〜ing=〜に慣れている。"],
 ["Recycling is one way to protect the environment.","","リサイクルは環境を守る方法の一つです。",""],
 ["Could you tell me how to get to the museum?","","美術館への行き方を教えてもらえますか。",""],
 ["She suggested that we take a taxi.","","彼女はタクシーに乗ろうと提案しました。","suggest that のあとの動詞は原形(take)にします。"]]);
XU('x-ek2','英検2級 ステップ1','EIKEN 2 STEP 1','en',[
 ["More and more people are working from home.","","在宅勤務をする人がますます増えています。",""],
 ["Some people argue that school uniforms should be abolished.","","制服は廃止すべきだと主張する人もいます。",""],
 ["The number of tourists has increased dramatically.","","観光客の数が大幅に増えました。","the number of 〜 は単数あつかい(has)。"],
 ["In my opinion, students should learn about money at school.","","私の意見では、学生は学校でお金について学ぶべきです。","英作文の書き出しの定番。"],
 ["We need to reduce the amount of plastic waste.","","プラスチックごみの量を減らす必要があります。",""],
 ["Volunteering gives young people valuable experience.","","ボランティアは若者に貴重な経験を与えます。",""],
 ["This policy may have a negative impact on small businesses.","","この政策は小さな会社に悪い影響を与えるかもしれません。",""],
 ["For these two reasons, I agree with the idea.","","これら2つの理由から、私はその考えに賛成です。","英作文のまとめで使える表現。"]]);
/* ---- 英検5級〜2級: ステップ2〜5 (each level has 40 phrases in all) ---- */
XU('x-ek5b','英検5級 ステップ2','EIKEN 5 STEP 2','en',[
 ["I get up at seven every morning.","","私は毎朝7時に起きます。","時刻の前は at。"],
 ["She doesn't eat breakfast.","","彼女は朝ごはんを食べません。","主語が3人称単数の否定文は doesn't+動詞の原形。"],
 ["Where do you live?","","あなたはどこに住んでいますか。","Where=どこ。"],
 ["I'm reading a comic book now.","","私は今マンガを読んでいます。","現在進行形(am/is/are+〜ing)=今〜している。"],
 ["Please open the window.","","窓を開けてください。","Please+動詞の原形=〜してください。"],
 ["Whose pencil is this?","","これはだれの鉛筆ですか。","Whose=だれの。"],
 ["My mother is a nurse.","","私の母は看護師です。",""],
 ["Let's play soccer after school.","","放課後サッカーをしよう。","Let's+動詞の原形=〜しよう。"]]);
XU('x-ek5c','英検5級 ステップ3','EIKEN 5 STEP 3','en',[
 ["I like cats very much.","","私はネコがとても好きです。","好きな動物は複数形(cats)で言うのが自然。"],
 ["He can play the piano well.","","彼は上手にピアノをひけます。","楽器には the をつけます。can のあとは動詞の原形。"],
 ["What sport do you like?","","あなたは何のスポーツが好きですか。","What+名詞=何の〜。"],
 ["My favorite subject is English.","","私のいちばん好きな教科は英語です。","favorite=いちばん好きな。"],
 ["I don't have any pets.","","私はペットを1匹も飼っていません。","not 〜 any=1つも〜ない。"],
 ["Can I use your eraser?","","あなたの消しゴムを使ってもいいですか。","Can I 〜?=〜してもいいですか。"],
 ["Who is that tall boy?","","あの背の高い男の子はだれですか。","Who=だれ。"],
 ["How do you go to school?","","あなたはどうやって学校に行きますか。","How=どうやって。答えは By bike.(自転車で)など。"]]);
XU('x-ek5d','英検5級 ステップ4','EIKEN 5 STEP 4','en',[
 ["What day is it today?","","今日は何曜日ですか。","曜日をたずねる文。日付は What's the date today?"],
 ["It's sunny today.","","今日は晴れています。","天気を言うときの主語は it。"],
 ["My birthday is June fifth.","","私の誕生日は6月5日です。","日付は fifth(5番目)のような「順番の数」で言います。"],
 ["How old is your grandfather?","","あなたのおじいさんは何歳ですか。",""],
 ["We have English on Monday and Friday.","","英語の授業は月曜日と金曜日にあります。","曜日の前は on。"],
 ["It's very cold here in winter.","","ここは冬はとても寒いです。","寒さ・暑さを言うときも主語は it。"],
 ["How much is this T-shirt?","","このTシャツはいくらですか。","How much=いくら(値段)。"],
 ["It's ten thirty now.","","今10時30分です。","時刻は「時→分」の順に数字を言います。"]]);
XU('x-ek5e','英検5級 ステップ5','EIKEN 5 STEP 5','en',[
 ["Nice to meet you.","","はじめまして。","初めて会ったときのあいさつ。答えは Nice to meet you, too."],
 ["Thank you for your help.","","手伝ってくれてありがとう。","Thank you for 〜=〜をありがとう。"],
 ["Excuse me. Where is the library?","","すみません。図書館はどこですか。","Excuse me=(声をかけるときの)すみません。"],
 ["See you tomorrow.","","また明日ね。",""],
 ["Here you are.","","はい、どうぞ。","物を手わたすときの言葉。"],
 ["That's a good idea.","","それはいい考えですね。",""],
 ["I'm sorry I'm late.","","遅れてごめんなさい。",""],
 ["How about you?","","あなたはどうですか。","相手に同じ質問を返すときに使います。"]]);
XU('x-ek4b','英検4級 ステップ2','EIKEN 4 STEP 2','en',[
 ["I visited my grandmother last Sunday.","","先週の日曜日、祖母に会いに行きました。","規則動詞の過去形は -ed をつけます。"],
 ["Did you see the movie?","","あなたはその映画を見ましたか。","過去の疑問文は Did+主語+動詞の原形。"],
 ["We didn't go out because it was snowing.","","雪が降っていたので、私たちは外出しませんでした。","because=〜なので(理由)。"],
 ["I bought a new bike last month.","","先月、新しい自転車を買いました。","buy の過去形は bought(不規則に変わる)。"],
 ["What did you do during the summer vacation?","","夏休みの間に何をしましたか。","during=〜の間に。"],
 ["She came home at five.","","彼女は5時に帰宅しました。","come home=帰宅する。come の過去形は came。"],
 ["There were many people at the station.","","駅にはたくさんの人がいました。","There were+複数=〜があった・いた。"],
 ["I lost my key on the way to school.","","学校に行く途中でかぎをなくしました。","on the way to 〜=〜へ行く途中で。"]]);
XU('x-ek4c','英検4級 ステップ3','EIKEN 4 STEP 3','en',[
 ["It will be sunny tomorrow.","","明日は晴れるでしょう。","will+動詞の原形=〜でしょう(未来)。"],
 ["I'm going to visit Osaka next month.","","来月、大阪に行く予定です。","be going to=前から決めている予定。"],
 ["Will you help me with my homework?","","宿題を手伝ってくれませんか。","Will you 〜?=〜してくれませんか(お願い)。help 人 with 物=人の物を手伝う。"],
 ["I'll call you later.","","あとで電話するね。","その場で決めたことは will(I'll)で言います。"],
 ["When are you going to leave?","","いつ出発する予定ですか。",""],
 ["My brother wants to be a doctor.","","兄は医者になりたいと思っています。","want to be 〜=〜になりたい。"],
 ["The concert starts at seven.","","コンサートは7時に始まります。","時刻表や予定表で決まっていることは現在形でも言えます。"],
 ["I hope you like it.","","気に入ってくれるといいな。","プレゼントをわたすときの定番の一言。"]]);
XU('x-ek4d','英検4級 ステップ4','EIKEN 4 STEP 4','en',[
 ["Tom is taller than his father.","","トムはお父さんより背が高いです。","比較級(-er)+than=…より〜。"],
 ["This is the biggest park in our city.","","ここは私たちの市でいちばん大きい公園です。","最上級は the+-est。big は g を重ねて biggest。"],
 ["Math is as difficult as science for me.","","私にとって数学は理科と同じくらい難しいです。","as 〜 as …=…と同じくらい〜。"],
 ["Which do you like better, summer or winter?","","夏と冬では、どちらが好きですか。","Which 〜 better, A or B?=AとBではどちらが〜?"],
 ["There is a big tree in front of our school.","","学校の前に大きな木があります。","There is+単数=〜がある。in front of=〜の前に。"],
 ["I enjoyed talking with my friends.","","友だちと話して楽しかったです。","enjoy のあとは〜ing形。"],
 ["I went to the park to play tennis.","","テニスをするために公園に行きました。","to+動詞の原形=〜するために(目的)。"],
 ["My uncle gave me a watch.","","おじが私に腕時計をくれました。","give 人 物=人に物をあげる。"]]);
XU('x-ek4e','英検4級 ステップ5','EIKEN 4 STEP 5','en',[
 ["You must not run in the hallway.","","廊下を走ってはいけません。","must not=〜してはいけない(禁止)。"],
 ["May I speak to Ken, please?","","(電話で)ケンさんはいますか。","電話で相手を呼んでもらうときの言い方。"],
 ["Could you say that again?","","もう一度言っていただけますか。","Could you 〜? は Can you 〜? よりていねい。"],
 ["How was your trip?","","旅行はどうでしたか。","How was 〜?=〜はどうだった?"],
 ["You don't have to bring your lunch.","","お弁当を持ってくる必要はありません。","don't have to=〜する必要はない(禁止ではありません)。"],
 ["Would you like some more cake?","","ケーキをもう少しいかがですか。","Would you like 〜?=〜はいかがですか(ていねいなすすめ)。"],
 ["What's wrong?","","どうしたの?","相手の様子が気になるときに。"],
 ["I'm glad to hear that.","","それを聞いてうれしいです。","気持ち+to+動詞=〜して(うれしい など)。"]]);
XU('x-ek3b','英検3級 ステップ2','EIKEN 3 STEP 2','en',[
 ["I have just finished my homework.","","ちょうど宿題を終えたところです。","現在完了(完了)。just=ちょうど。"],
 ["Have you had lunch yet?","","もうお昼ごはんを食べましたか。","疑問文の yet=もう。"],
 ["I haven't decided yet.","","まだ決めていません。","否定文の yet=まだ。"],
 ["She has been sick since last Monday.","","彼女は先週の月曜日からずっと体調が悪いです。","since=〜から(ずっと)。"],
 ["How long have you known him?","","彼と知り合ってどのくらいになりますか。","How long=どのくらいの間。"],
 ["I have read this book three times.","","この本を3回読んだことがあります。","回数は once, twice, three times。"],
 ["My father has never been abroad.","","父は一度も海外に行ったことがありません。","never=一度も〜ない。abroad の前に to はつけません。"],
 ["We have been friends for ten years.","","私たちは10年来の友だちです。","現在完了(継続)。"]]);
XU('x-ek3c','英検3級 ステップ3','EIKEN 3 STEP 3','en',[
 ["English is spoken in many countries.","","英語は多くの国で話されています。","受け身=be+過去分詞。"],
 ["This temple was built a long time ago.","","このお寺はずっと昔に建てられました。",""],
 ["The letter was written in French.","","その手紙はフランス語で書かれていました。","言語の前は in。"],
 ["I'm interested in Japanese history.","","私は日本の歴史に興味があります。","be interested in=〜に興味がある。"],
 ["The boy playing soccer is my brother.","","サッカーをしている男の子は私の弟です。","〜ing のかたまりが後ろから名詞(The boy)を説明しています。"],
 ["This is a picture taken in Hawaii.","","これはハワイでとられた写真です。","過去分詞のかたまりが後ろから名詞を説明しています。"],
 ["I have a friend who lives in Canada.","","私にはカナダに住んでいる友だちがいます。","who=人を説明する関係代名詞。"],
 ["This is the cake that my mother made.","","これは母が作ったケーキです。","that=物を説明する関係代名詞。"]]);
XU('x-ek3d','英検3級 ステップ4','EIKEN 3 STEP 4','en',[
 ["My dream is to travel around the world.","","私の夢は世界中を旅することです。","to+動詞=〜すること。"],
 ["I don't know what to say.","","何と言えばいいかわかりません。","what to 〜=何を〜すればいいか。"],
 ["Could you show me how to use this machine?","","この機械の使い方を教えてもらえますか。","how to 〜=〜のしかた。"],
 ["My mother told me to clean my room.","","母は私に部屋を掃除するように言いました。","tell 人 to 〜=人に〜するように言う。"],
 ["This song makes me happy.","","この歌を聞くと幸せな気持ちになります。","make 人 気持ち=人を〜な気持ちにする。"],
 ["Playing video games is fun.","","テレビゲームをするのは楽しいです。","〜ing(〜すること)が文の主語になっています。"],
 ["We call this dog Pochi.","","私たちはこの犬をポチと呼んでいます。","call A B=AをBと呼ぶ。"],
 ["Thank you for inviting me to the party.","","パーティーに招待してくれてありがとう。","for のあとは〜ing形。"]]);
XU('x-ek3e','英検3級 ステップ5','EIKEN 3 STEP 5','en',[
 ["What do you think about this plan?","","この計画についてどう思いますか。","意見をたずねる定番の言い方。"],
 ["I think so, too.","","私もそう思います。",""],
 ["Why don't we go shopping this weekend?","","今週末、買い物に行きませんか。","Why don't we 〜?=〜しませんか(誘い)。"],
 ["How about meeting at the station at ten?","","10時に駅で会うのはどう?","How about 〜ing?=〜するのはどう?"],
 ["Sure, I'd be happy to.","","もちろん、喜んで。","頼まれたときの感じのいい返事。"],
 ["That sounds like fun.","","それは楽しそうですね。","sound like 〜=〜のように聞こえる。"],
 ["I'm afraid I can't come.","","残念ですが行けません。","I'm afraid 〜=残念ながら〜(ていねいに断る)。"],
 ["Have a nice weekend!","","よい週末を!",""]]);
XU('x-ekp2b','英検準2級 ステップ2','EIKEN PRE-2 STEP 2','en',[
 ["I've been learning the guitar for two years.","","ギターを習い始めて2年になります。","現在完了進行形(have been 〜ing)=ずっと〜している。"],
 ["I wish I could speak English fluently.","","英語をすらすら話せたらいいのに。","I wish+過去形=今の現実とちがう願い。"],
 ["The bus was so crowded that I couldn't sit down.","","バスがとても混んでいたので座れませんでした。","so 〜 that …=とても〜なので…。"],
 ["Not only students but also teachers enjoyed the event.","","生徒だけでなく先生たちもそのイベントを楽しみました。","not only A but also B=AだけでなくBも。"],
 ["I'm too tired to do my homework tonight.","","今夜は疲れすぎて宿題ができません。","too 〜 to …=〜すぎて…できない。"],
 ["This is the town where I was born.","","ここは私が生まれた町です。","where=場所を説明する関係副詞。"],
 ["You'd better take an umbrella with you.","","かさを持っていったほうがいいよ。","had better=〜したほうがいい(強めの助言)。"],
 ["I forgot to bring my textbook.","","教科書を持ってくるのを忘れました。","forget to 〜=〜するのを忘れる。"]]);
XU('x-ekp2c','英検準2級 ステップ3','EIKEN PRE-2 STEP 3','en',[
 ["Many young people use smartphones to get news.","","多くの若者がスマートフォンでニュースを得ています。",""],
 ["It is said that this lake is the deepest in the area.","","この湖はこの地域でいちばん深いと言われています。","It is said that 〜=〜と言われている。"],
 ["Online shopping has become more and more popular.","","ネットショッピングはますます人気になっています。","more and more=ますます。"],
 ["We should use public transportation to save energy.","","エネルギーを節約するために公共交通機関を使うべきです。",""],
 ["Some people think that students have too much homework.","","生徒の宿題が多すぎると考える人もいます。","Some people 〜=〜する人もいる。"],
 ["Eating breakfast helps students concentrate in class.","","朝食を食べると、生徒は授業に集中しやすくなります。","help 人 動詞の原形=人が〜するのを助ける。"],
 ["The town is famous for its hot springs.","","その町は温泉で有名です。","be famous for 〜=〜で有名だ。"],
 ["Volunteers cleaned the beach after the storm.","","嵐のあと、ボランティアが海岸を掃除しました。",""]]);
XU('x-ekp2d','英検準2級 ステップ4','EIKEN PRE-2 STEP 4','en',[
 ["I think it is a good idea for students to learn cooking.","","生徒が料理を学ぶのはいい考えだと思います。","It is 〜 for 人 to …=人が…するのは〜だ。"],
 ["I have two reasons.","","理由は2つあります。","英作文で理由を言う前の一文。"],
 ["First, it is good for our health.","","第一に、それは健康によいです。","First, Second で理由を順番に並べます。"],
 ["Second, we can make new friends.","","第二に、新しい友だちができます。",""],
 ["For example, many people enjoy reading e-books.","","たとえば、多くの人が電子書籍を楽しんでいます。","For example=たとえば(具体例)。"],
 ["On the other hand, it can be expensive.","","一方で、それはお金がかかることがあります。","On the other hand=一方で(反対の面)。"],
 ["However, not everyone agrees with this idea.","","しかし、全員がこの考えに賛成しているわけではありません。","not everyone=全員が〜というわけではない(部分否定)。"],
 ["That's why I support this idea.","","だから私はこの考えを支持します。","That's why 〜=そういうわけで〜。"]]);
XU('x-ekp2e','英検準2級 ステップ5','EIKEN PRE-2 STEP 5','en',[
 ["Thank you for your email.","","メールをありがとう。","Eメール問題の書き出しの定番。"],
 ["I'm sorry to hear that you caught a cold.","","かぜをひいたと聞いて心配しています。","I'm sorry to hear 〜=〜と聞いて気の毒に思う。"],
 ["Do you mind if I open the window?","","窓を開けてもかまいませんか。","Do you mind if 〜?=〜してもかまいませんか。いいときは No で答えます。"],
 ["I'm looking for a present for my sister.","","妹へのプレゼントを探しています。","look for=〜を探す。"],
 ["Would you like me to carry your bag?","","かばんをお持ちしましょうか。","Would you like me to 〜?=(私が)〜しましょうか。"],
 ["It depends on the weather.","","天気しだいです。","depend on 〜=〜しだいだ。"],
 ["Let me know if you have any questions.","","何か質問があれば知らせてね。","let me know=知らせて。"],
 ["I'm planning to join the drama club.","","演劇部に入ろうと思っています。","plan to 〜=〜するつもりだ。"]]);
/* ---- 英検準2級プラス (between 準2級 and 2級): 5 steps, 40 phrases ---- */
XU('x-ekp2p','英検準2級プラス ステップ1','EIKEN PRE-2 PLUS STEP 1','en',[
 ["Our school started a program to reduce food waste.","","私たちの学校は食品ロスを減らす取り組みを始めました。","program=取り組み・計画。"],
 ["I used to be shy, but now I enjoy speaking in front of people.","","以前は内気でしたが、今は人前で話すのが好きです。","used to=以前は〜だった。"],
 ["It was not until I lived abroad that I realized how convenient Japan is.","","海外に住んで初めて、日本がどれほど便利かに気づきました。","It was not until 〜 that …=〜して初めて…した。"],
 ["The more you practice, the better you will become.","","練習すればするほど、上手になります。","the 比較級, the 比較級=〜すればするほど…。"],
 ["I'm not sure whether I should join the club.","","その部活に入るべきかどうか迷っています。","whether=〜かどうか。"],
 ["She asked me if I could help her with the event.","","彼女は私に、イベントを手伝えるかとたずねました。","ask 人 if 〜=人に〜かどうかたずねる。"],
 ["Having finished my homework, I went out to play.","","宿題を終えてから、遊びに出かけました。","分詞構文=〜してから(時)。"],
 ["It's worth visiting the museum at least once.","","その博物館は一度は行ってみる価値があります。","be worth 〜ing=〜する価値がある。"]]);
XU('x-ekp2pb','英検準2級プラス ステップ2','EIKEN PRE-2 PLUS STEP 2','en',[
 ["Many shops have stopped giving out free plastic bags.","","多くの店が無料のレジ袋を配るのをやめました。","stop 〜ing=〜するのをやめる。"],
 ["Working part-time can teach students about responsibility.","","アルバイトをすることで、学生は責任について学べます。",""],
 ["The number of foreign visitors to Japan has been rising.","","日本を訪れる外国人の数は増え続けています。","has been rising=ずっと増え続けている。"],
 ["Some schools allow students to use tablets in class.","","授業でタブレットを使うことを認めている学校もあります。","allow 人 to 〜=人が〜するのを認める。"],
 ["Communities are working together to prepare for natural disasters.","","地域の人たちは自然災害に備えて協力しています。","prepare for 〜=〜に備える。"],
 ["Eating local food helps support farmers in the area.","","地元の食べ物を食べることは、その地域の農家を支えることにつながります。","help 動詞の原形=〜するのに役立つ。"],
 ["People are spending more time on their phones than before.","","人々は以前よりもスマートフォンに時間を使っています。",""],
 ["Recycled materials are used to make new products.","","リサイクルされた素材が、新しい製品を作るのに使われています。","be used to 動詞の原形=〜するために使われる(be used to 〜ing「〜に慣れている」とのちがいに注意)。"]]);
XU('x-ekp2pc','英検準2級プラス ステップ3','EIKEN PRE-2 PLUS STEP 3','en',[
 ["I agree that students should do volunteer work.","","生徒はボランティア活動をすべきだという意見に賛成です。","agree that 〜=〜という考えに賛成する。"],
 ["I disagree with the idea for two reasons.","","2つの理由から、その考えには反対です。","disagree with 〜=〜に反対する。"],
 ["To begin with, it would cost too much money.","","まず第一に、お金がかかりすぎるでしょう。","To begin with=まず第一に。"],
 ["In addition, it could cause problems for local people.","","さらに、地元の人たちに問題を起こすかもしれません。","In addition=さらに。"],
 ["This is because people can learn from each other.","","これは、人々がお互いから学べるからです。","This is because 〜=これは〜だからです。"],
 ["For these reasons, I believe this plan is a good idea.","","これらの理由から、この計画はいい考えだと思います。",""],
 ["Some people say it is a waste of time, but I don't think so.","","時間のむだだと言う人もいますが、私はそうは思いません。",""],
 ["It is important for us to think about the future.","","私たちが将来について考えることは大切です。","It is 〜 for 人 to …=人が…することは〜だ。"]]);
XU('x-ekp2pd','英検準2級プラス ステップ4','EIKEN PRE-2 PLUS STEP 4','en',[
 ["Thank you for telling me about your new school.","","新しい学校のことを教えてくれてありがとう。","Thank you for 〜ing=〜してくれてありがとう。"],
 ["I'm glad to hear that you're enjoying your new life.","","新しい生活を楽しんでいると聞いてうれしいです。",""],
 ["By the way, have you decided what to do this summer?","","ところで、この夏に何をするか決めましたか。","By the way=ところで(話題を変える)。"],
 ["I'd like to know more about the event.","","そのイベントについてもっと知りたいです。","I'd like to 〜=〜したい(ていねい)。"],
 ["Could you tell me what time it starts?","","何時に始まるか教えてもらえますか。","文の中の疑問文は「疑問詞+主語+動詞」の順。"],
 ["I'm looking forward to hearing from you.","","お返事を楽しみにしています。","メールの結びの定番。look forward to のあとは〜ing形。"],
 ["Unfortunately, I won't be able to attend the meeting.","","残念ながら、会議に出席できません。","Unfortunately=残念ながら。"],
 ["Please let me know if the schedule changes.","","予定が変わったら知らせてください。",""]]);
XU('x-ekp2pe','英検準2級プラス ステップ5','EIKEN PRE-2 PLUS STEP 5','en',[
 ["The graph shows how much water each family uses.","","そのグラフは、各家庭がどれくらい水を使うかを示しています。","show=示す。"],
 ["Compared with ten years ago, more people shop online.","","10年前とくらべて、ネットで買い物をする人が増えています。","Compared with 〜=〜とくらべて。"],
 ["As a result of the new rule, fewer students were late.","","新しいルールの結果、遅刻する生徒が減りました。","as a result of 〜=〜の結果。fewer=(数えられるものが)より少ない。"],
 ["The main reason is that the price went up.","","主な理由は、値段が上がったことです。","The main reason is that 〜=主な理由は〜だ。"],
 ["Instead of driving, more people are riding bicycles.","","車を運転する代わりに、自転車に乗る人が増えています。","instead of 〜ing=〜する代わりに。"],
 ["According to the survey, most students sleep less than seven hours.","","調査によると、ほとんどの生徒の睡眠時間は7時間未満です。","According to 〜=〜によると。less than=〜未満。"],
 ["Thanks to the internet, we can learn almost anything.","","インターネットのおかげで、私たちはほとんど何でも学べます。","thanks to 〜=〜のおかげで。"],
 ["Even though it was raining, the festival was held.","","雨が降っていたにもかかわらず、お祭りは開かれました。","even though=〜にもかかわらず。"]]);
XU('x-ek2b','英検2級 ステップ2','EIKEN 2 STEP 2','en',[
 ["Artificial intelligence is changing the way we work.","","人工知能は私たちの働き方を変えつつあります。","the way we work=私たちの働き方。"],
 ["Many companies have introduced flexible working hours.","","多くの会社がフレックスタイム制を導入しています。","introduce=導入する。"],
 ["Cashless payments are becoming common in Japan.","","日本ではキャッシュレス決済が一般的になりつつあります。",""],
 ["Online classes allow students to study anywhere.","","オンライン授業のおかげで、生徒はどこでも勉強できます。","allow 人 to 〜=人が〜できるようにする。"],
 ["There are concerns about the safety of personal data.","","個人データの安全性について懸念があります。","concern=懸念・心配。"],
 ["Some people spend too much time on social media.","","SNSに時間を使いすぎる人もいます。","spend 時間 on 〜=〜に時間を使う。"],
 ["Technology has made our lives more convenient.","","技術は私たちの生活をより便利にしました。","make A B=AをBにする。"],
 ["It is hard to predict how robots will be used in the future.","","将来ロボットがどのように使われるかを予測するのは難しいです。","文の中の疑問文は「疑問詞+主語+動詞」の順。"]]);
XU('x-ek2c','英検2級 ステップ3','EIKEN 2 STEP 3','en',[
 ["Global warming is causing more extreme weather.","","地球温暖化によって異常気象が増えています。","cause=引き起こす。"],
 ["Many cities are trying to reduce traffic jams.","","多くの都市が交通渋滞を減らそうとしています。",""],
 ["The population of rural areas is decreasing.","","地方の人口は減少しています。","rural=いなかの・地方の。"],
 ["Local governments should support elderly people living alone.","","地方自治体は一人暮らしの高齢者を支援すべきです。",""],
 ["Food waste is a serious problem in many countries.","","食品ロスは多くの国で深刻な問題です。",""],
 ["Electric cars produce less pollution than gasoline cars.","","電気自動車はガソリン車より汚染物質を出しません。","less=より少ない。"],
 ["Tourism brings money to local communities.","","観光は地域社会にお金をもたらします。",""],
 ["Protecting endangered animals is everyone's responsibility.","","絶滅の危機にある動物を守るのは、みんなの責任です。","endangered=絶滅の危機にある。"]]);
XU('x-ek2d','英検2級 ステップ4','EIKEN 2 STEP 4','en',[
 ["I believe that companies should let employees work from home.","","会社は従業員の在宅勤務を認めるべきだと私は考えます。","let 人 動詞の原形=人に〜させる(許可)。"],
 ["One reason is that it saves commuting time.","","理由の一つは、通勤時間を節約できることです。","One reason is that 〜=理由の一つは〜。"],
 ["Another reason is that it reduces stress.","","もう一つの理由は、ストレスが減ることです。",""],
 ["As a result, workers can be more productive.","","その結果、働く人の生産性が上がります。","As a result=その結果。"],
 ["Some people may disagree, but I think the benefits are greater.","","反対する人もいるかもしれませんが、利点の方が大きいと思います。",""],
 ["It is true that this system costs a lot of money.","","たしかに、この仕組みには多くのお金がかかります。","It is true that 〜=たしかに〜だ(反対意見を認めるときに)。"],
 ["This is especially important for young people.","","これは特に若者にとって大切です。","especially=特に。"],
 ["In conclusion, I strongly support this idea.","","結論として、私はこの考えを強く支持します。","In conclusion=結論として(まとめ)。"]]);
XU('x-ek2e','英検2級 ステップ5','EIKEN 2 STEP 5','en',[
 ["According to the article, sales have dropped by half.","","記事によると、売り上げは半分に落ち込みました。","According to 〜=〜によると。"],
 ["The main point of the passage is that sleep affects learning.","","この文章の要点は、睡眠が学習に影響するということです。","affect=影響する。"],
 ["In other words, we need to change our habits.","","言いかえれば、私たちは習慣を変える必要があります。","In other words=言いかえれば。"],
 ["I'm writing to ask about your summer program.","","夏のプログラムについてお聞きしたくてメールしました。","メールの目的を書く定番の書き出し。"],
 ["I'd appreciate it if you could reply soon.","","早めにお返事いただけるとありがたいです。","I'd appreciate it if 〜=〜していただけるとありがたい。"],
 ["Could you let me know the details?","","詳しいことを教えていただけますか。",""],
 ["I'm afraid I have to cancel my reservation.","","申し訳ありませんが、予約を取り消さなければなりません。",""],
 ["Unless we act now, the situation will get worse.","","今行動しなければ、状況は悪化するでしょう。","unless=〜しない限り。"]]);
XU('x-ekp1','英検準1級 ステップ1','EIKEN PRE-1 STEP 1','en',[
 ["The government should invest more in renewable energy.","","政府は再生可能エネルギーにもっと投資すべきです。",""],
 ["Automation could lead to a decline in certain jobs.","","自動化によって、一部の仕事が減るかもしれません。","lead to 〜=〜につながる。"],
 ["This approach has both advantages and drawbacks.","","このやり方には長所と短所の両方があります。",""],
 ["It is essential to strike a balance between work and life.","","仕事と生活のバランスを取ることが不可欠です。","strike a balance=バランスを取る。"],
 ["The new law is expected to come into effect next year.","","新しい法律は来年施行される見込みです。","come into effect=(法律などが)施行される。"],
 ["Critics claim that the plan is unrealistic.","","批判する人たちは、その計画は非現実的だと主張しています。",""],
 ["Public awareness of the issue has grown considerably.","","この問題への人々の関心はかなり高まっています。",""],
 ["Measures must be taken to tackle the declining birth rate.","","少子化に取り組むための対策が必要です。","take measures=対策をとる。"]]);
XU('x-ekp1b','英検準1級 ステップ2','EIKEN PRE-1 STEP 2','en',[
 ["Social media has transformed the way people communicate.","","SNSは人々のコミュニケーションの仕方を大きく変えました。","transform=大きく変える。"],
 ["Personal data must be handled with great care.","","個人データは細心の注意を払って扱わなければなりません。",""],
 ["Remote work has become increasingly common since the pandemic.","","感染症の大流行以来、リモートワークはますます一般的になりました。","pandemic=(感染症の)世界的な大流行。"],
 ["Artificial intelligence raises a number of ethical concerns.","","人工知能はいくつもの倫理的な懸念を生んでいます。","ethical=倫理的な。"],
 ["Cashless payments are convenient, but they pose security risks.","","キャッシュレス決済は便利ですが、安全上のリスクもあります。","pose a risk=リスクをもたらす。"],
 ["Online learning allows students to study at their own pace.","","オンライン学習なら、学生は自分のペースで勉強できます。","allow 〜 to …=〜が…できるようにする。"],
 ["Excessive screen time may harm children's development.","","画面を見る時間が長すぎると、子どもの発達に悪影響があるかもしれません。","excessive=過度の。"],
 ["Many companies are investing heavily in cybersecurity.","","多くの企業がサイバーセキュリティに多額の投資をしています。",""]]);
XU('x-ekp1c','英検準1級 ステップ3','EIKEN PRE-1 STEP 3','en',[
 ["Deforestation is accelerating the loss of biodiversity.","","森林破壊が生物多様性の喪失を加速させています。","biodiversity=生物多様性。"],
 ["Rising sea levels threaten coastal communities.","","海面の上昇が沿岸部の地域をおびやかしています。",""],
 ["Plastic waste poses a serious threat to marine life.","","プラスチックごみは海の生き物に深刻な脅威を与えています。",""],
 ["Solar power has become far more affordable in recent years.","","近年、太陽光発電はずっと手ごろな価格になりました。","affordable=手ごろな(値段の)。"],
 ["Carbon emissions must be cut drastically by 2050.","","2050年までに二酸化炭素の排出を大幅に減らさなければなりません。","drastically=大幅に。"],
 ["Some argue that nuclear power is a necessary evil.","","原子力発電は必要悪だと主張する人もいます。","necessary evil=必要悪。"],
 ["Recycling alone cannot solve the waste problem.","","リサイクルだけでは、ごみ問題は解決できません。",""],
 ["Consumers are becoming more conscious of environmental issues.","","消費者は環境問題をより意識するようになっています。","be conscious of 〜=〜を意識している。"]]);
XU('x-ekp1d','英検準1級 ステップ4','EIKEN PRE-1 STEP 4','en',[
 ["An aging population places a heavy burden on the healthcare system.","","高齢化は医療制度に大きな負担をかけています。","aging population=高齢化が進む人口。"],
 ["Regular exercise reduces the risk of heart disease.","","定期的な運動は心臓病のリスクを下げます。",""],
 ["Schools should place more emphasis on critical thinking.","","学校は批判的思考をもっと重視すべきです。","place emphasis on 〜=〜を重視する。"],
 ["Bullying can have long-lasting effects on victims.","","いじめは被害者に長く続く影響を与えることがあります。",""],
 ["Volunteering helps young people develop a sense of responsibility.","","ボランティア活動は、若者が責任感を身につける助けになります。",""],
 ["Long working hours can lead to serious health problems.","","長時間労働は深刻な健康問題につながることがあります。",""],
 ["Access to education varies greatly between regions.","","教育を受けられる機会は、地域によって大きく異なります。","vary=異なる、さまざまである。"],
 ["The government introduced measures to support working parents.","","政府は働く親を支援する対策を導入しました。",""]]);
XU('x-ekp1e','英検準1級 ステップ5','EIKEN PRE-1 STEP 5','en',[
 ["Tourism brings economic benefits to rural areas.","","観光は地方に経済的な利益をもたらします。",""],
 ["Globalization has made the world more interconnected.","","グローバル化によって、世界はより密接につながりました。","interconnected=互いにつながった。"],
 ["Small businesses are struggling with rising costs.","","小さな会社は費用の上昇に苦しんでいます。","struggle with 〜=〜に苦労する。"],
 ["International cooperation is vital to solving global problems.","","世界的な問題を解決するには国際協力が欠かせません。","vital=きわめて重要な。"],
 ["I see your point, but I have a different opinion.","","おっしゃることはわかりますが、私は違う意見です。","面接で反対意見を言うときのていねいな型。"],
 ["There are pros and cons to this idea.","","この考えには良い面と悪い面があります。","pros and cons=良い面と悪い面。"],
 ["From my perspective, the benefits are greater.","","私の立場から見ると、利点のほうが大きいです。","From my perspective=私の視点から言うと。"],
 ["That is why I support this policy.","","だから私はこの政策を支持します。","面接で意見をしめくくる型。"]]);
XU('x-ek1','英検1級 ステップ1','EIKEN 1 STEP 1','en',[
 ["The proposal was met with fierce opposition.","","その提案は激しい反対にあいました。","be met with 〜=〜という反応を受ける。"],
 ["Economic disparity has become increasingly pronounced.","","経済格差はますます顕著になっています。","pronounced は形容詞で「顕著な」。"],
 ["The findings corroborate earlier research.","","その結果は以前の研究を裏付けています。","corroborate=裏付ける。"],
 ["Such measures would merely alleviate the symptoms.","","そのような対策は症状をやわらげるだけでしょう。",""],
 ["The treaty is widely regarded as a diplomatic milestone.","","その条約は外交上の画期的な出来事だと広く考えられています。",""],
 ["Unchecked surveillance could erode civil liberties.","","歯止めのない監視は市民の自由をむしばむおそれがあります。",""],
 ["The scheme proved to be financially unsustainable.","","その計画は財政的に続けられないとわかりました。",""],
 ["We must not underestimate the ramifications of this decision.","","この決定がもたらす影響を軽く見てはいけません。","ramifications=(予想しにくい)影響・結果。"]]);
XU('x-ek1b','英検1級 ステップ2','EIKEN 1 STEP 2','en',[
 ["The policy has been criticized for widening inequality.","","その政策は格差を広げたとして批判されています。",""],
 ["Public trust in politicians has eroded over the years.","","政治家への国民の信頼は、年々むしばまれてきました。","erode=(信頼などを)むしばむ。"],
 ["The referendum sparked a heated debate across the country.","","その国民投票は国中で白熱した議論を巻き起こしました。","spark=(議論などを)引き起こす。"],
 ["Freedom of the press is a cornerstone of democracy.","","報道の自由は民主主義の礎です。","cornerstone=礎、土台。"],
 ["The government must be held accountable for its decisions.","","政府はその決定に責任を負わなければなりません。","hold 〜 accountable=〜に責任を負わせる。"],
 ["Stricter regulations could stifle innovation.","","規制が厳しくなると、技術革新が妨げられるかもしれません。","stifle=抑えつける、妨げる。"],
 ["The reform was implemented despite strong resistance.","","その改革は強い抵抗にもかかわらず実施されました。","implement=実施する。"],
 ["Misinformation spreads rapidly on social media.","","誤った情報はSNSで急速に広まります。","misinformation=誤情報。"]]);
XU('x-ek1c','英検1級 ステップ3','EIKEN 1 STEP 3','en',[
 ["Gene editing holds great promise for treating hereditary diseases.","","遺伝子編集は遺伝性の病気の治療に大きな可能性を秘めています。","hold promise=有望である。hereditary=遺伝性の。"],
 ["The long-term consequences of the technology remain uncertain.","","その技術の長期的な影響は、まだ不確かなままです。",""],
 ["Overfishing has depleted fish stocks in many regions.","","乱獲によって、多くの地域で魚の資源量が激減しました。","deplete=(資源を)使い果たす。"],
 ["Researchers are trying to mitigate the effects of global warming.","","研究者たちは地球温暖化の影響を和らげようとしています。","mitigate=和らげる、緩和する。"],
 ["The discovery could revolutionize the way we produce energy.","","その発見は、エネルギーの作り方を根本から変えるかもしれません。","revolutionize=大変革をもたらす。"],
 ["Such experiments raise profound ethical questions.","","そのような実験は、深い倫理的な問いを投げかけます。","profound=深い、重大な。"],
 ["The species is on the verge of extinction.","","その種は絶滅の寸前にあります。","on the verge of 〜=〜の寸前で。"],
 ["Space exploration requires an enormous financial commitment.","","宇宙探査には莫大な資金の投入が必要です。",""]]);
XU('x-ek1d','英検1級 ステップ4','EIKEN 1 STEP 4','en',[
 ["Automation is likely to exacerbate unemployment in some sectors.","","自動化によって、一部の分野では失業が悪化しそうです。","exacerbate=(問題を)悪化させる。"],
 ["The central bank raised interest rates to curb inflation.","","中央銀行はインフレを抑えるために金利を上げました。","curb=抑制する。"],
 ["Many workers feel their wages have stagnated.","","多くの労働者は、賃金が伸び悩んでいると感じています。","stagnate=停滞する。"],
 ["The company was forced to lay off hundreds of employees.","","その会社は何百人もの従業員を解雇せざるを得ませんでした。","lay off=(業績悪化などで)解雇する。"],
 ["A universal basic income could provide a safety net.","","ベーシックインカムは、暮らしの安全網になりうるでしょう。","safety net=(困ったときの)安全網。"],
 ["Economic growth does not necessarily improve well-being.","","経済成長が必ずしも人々の幸福を高めるとは限りません。","not necessarily=必ずしも〜ではない。"],
 ["The gig economy offers flexibility but little security.","","ギグ・エコノミーは柔軟な働き方ができる一方で、安定はほとんどありません。","gig economy=単発の仕事を請け負う働き方。"],
 ["Trade disputes have disrupted global supply chains.","","貿易摩擦が世界のサプライチェーンを混乱させています。","disrupt=混乱させる。"]]);
XU('x-ek1e','英検1級 ステップ5','EIKEN 1 STEP 5','en',[
 ["Preserving cultural heritage should be a national priority.","","文化遺産を守ることは国の優先事項であるべきです。",""],
 ["Cultural diversity enriches society as a whole.","","文化の多様性は社会全体を豊かにします。","enrich=豊かにする。"],
 ["The debate over animal testing remains contentious.","","動物実験をめぐる議論は、今も意見が鋭く対立しています。","contentious=議論を呼ぶ、対立のある。"],
 ["Privacy should not be sacrificed for convenience.","","便利さのためにプライバシーを犠牲にすべきではありません。",""],
 ["Let me begin by outlining the main issue.","","まず、主な論点を簡単に説明させてください。","outline=概要を述べる。スピーチの始め方の型。"],
 ["I would like to argue that this policy is counterproductive.","","この政策は逆効果だと主張したいと思います。","counterproductive=逆効果の。"],
 ["Admittedly, there are some valid counterarguments.","","確かに、もっともな反論もいくつかあります。","Admittedly=確かに(相手の意見を一度認める)。"],
 ["Taking all this into account, the benefits clearly outweigh the risks.","","これらすべてを考え合わせると、利点はリスクを明らかに上回ります。","take 〜 into account=〜を考慮に入れる。"]]);
/* ---- English: TOEIC / IELTS / TOEFL / aviation ---- */
XU('x-toeic','TOEIC L&R ステップ1','TOEIC STEP 1','en',[
 ["The meeting has been postponed until Thursday.","","会議は木曜日まで延期されました。",""],
 ["Please submit the report by the end of the day.","","今日中に報告書を提出してください。","by=〜までに(期限)。until は「〜までずっと」。"],
 ["Our sales increased by 15 percent this quarter.","","今四半期の売上は15パーセント増えました。","quarter=四半期(3か月)。"],
 ["The shipment is expected to arrive next week.","","荷物は来週届く予定です。",""],
 ["Could you send me the invoice again?","","請求書をもう一度送っていただけますか。",""],
 ["All employees are required to attend the training session.","","全従業員は研修会に出席する必要があります。","attend は後ろにすぐ目的語。attend to ではありません。"],
 ["The position requires at least three years of experience.","","この職には少なくとも3年の経験が必要です。",""],
 ["We apologize for any inconvenience this may cause.","","ご迷惑をおかけすることをおわびします。",""]]);
XU('x-toeicb','TOEIC L&R ステップ2','TOEIC STEP 2','en',[
 ["I'm writing to follow up on our conversation yesterday.","","昨日お話しした件で、改めてご連絡しています。","follow up on 〜=〜について改めて連絡する。メールの書き出しの定番。"],
 ["Please find the attached file.","","添付のファイルをご確認ください。","attached=添付された。ビジネスメールの決まり文句。"],
 ["I'll be out of the office until Monday.","","月曜日まで不在にしています。","out of the office=会社にいない(出張・休暇など)。"],
 ["Could you let me know your availability next week?","","来週のご都合を教えていただけますか。","availability=都合のつく時間。"],
 ["The printer on the third floor is out of order.","","3階のプリンターが故障しています。","out of order=故障中。"],
 ["Mr. Tanaka is in charge of the new project.","","田中さんが新しいプロジェクトの担当です。","in charge of 〜=〜を担当して。"],
 ["I'd appreciate it if you could reply by Friday.","","金曜日までにお返事いただけるとありがたいです。","I'd appreciate it if 〜=〜していただけるとありがたい(ていねい)。"],
 ["Let's go over the budget before the meeting.","","会議の前に予算を見直しましょう。","go over=見直す、確認する。"]]);
XU('x-toeicc','TOEIC L&R ステップ3','TOEIC STEP 3','en',[
 ["The conference room is booked for the whole afternoon.","","会議室は午後いっぱい予約が入っています。",""],
 ["Can we move the meeting to a later date?","","会議を後日に変更できますか。",""],
 ["Ms. Lee will give a presentation on the sales figures.","","リーさんが売上の数字について発表します。","give a presentation on 〜=〜について発表する。"],
 ["The deadline has been extended by two days.","","締め切りが2日延びました。","by+数=〜だけ(差を表す)。"],
 ["Who is responsible for taking the minutes?","","議事録を取るのは誰の担当ですか。","minutes=議事録(「分」ではありません)。"],
 ["I'm afraid I have a scheduling conflict.","","あいにく予定が重なっています。","I'm afraid 〜=あいにく〜(やわらかく断る)。"],
 ["We need to reach an agreement by the end of the month.","","月末までに合意する必要があります。",""],
 ["Let me summarize the main points of today's discussion.","","今日の話し合いの要点をまとめさせてください。",""]]);
XU('x-toeicd','TOEIC L&R ステップ4','TOEIC STEP 4','en',[
 ["Your flight has been delayed due to bad weather.","","悪天候のため、ご搭乗の便は遅れています。","due to 〜=〜のために(原因)。"],
 ["I'd like to book a hotel near the convention center.","","コンベンションセンターの近くのホテルを予約したいのですが。",""],
 ["Travel expenses will be reimbursed after the trip.","","出張費は出張のあとで払い戻されます。","reimburse=(立て替えたお金を)払い戻す。"],
 ["Please keep your receipts for accounting.","","経理のために領収書を保管してください。",""],
 ["The shuttle bus leaves every fifteen minutes.","","シャトルバスは15分ごとに出ています。","every+時間=〜ごとに。"],
 ["I'll pick you up at the airport.","","空港までお迎えに行きます。","pick up=(車で)迎えに行く。"],
 ["Our business trip to Singapore was a success.","","シンガポールへの出張はうまくいきました。",""],
 ["Check-in begins two hours before departure.","","チェックインは出発の2時間前に始まります。",""]]);
XU('x-toeice','TOEIC L&R ステップ5','TOEIC STEP 5','en',[
 ["Attention, shoppers. The store will close in thirty minutes.","","お客様にお知らせします。当店は30分後に閉店します。","Part 4(説明文問題)によく出るお知らせの書き出し。"],
 ["This offer is valid until the end of the month.","","この特典は月末まで有効です。","valid=有効な。"],
 ["Customers can return items within thirty days of purchase.","","お客様は購入から30日以内なら返品できます。",""],
 ["We are currently out of stock.","","ただいま在庫切れです。","out of stock=在庫切れ。"],
 ["Thank you for your patience.","","お待ちいただきありがとうございます。","patience=がまん。待たせたときのお礼の定番。"],
 ["The renovation work will be completed next month.","","改装工事は来月終わる予定です。",""],
 ["Please fill out this form and hand it to the receptionist.","","この用紙に記入して、受付に渡してください。","fill out=(用紙に)記入する。"],
 ["Free parking is available for all visitors.","","来場者はどなたでも無料で駐車できます。","available=利用できる。"]]);
XU('x-ielts','IELTS ステップ1','IELTS STEP 1','en',[
 ["The graph shows the number of international students from 2010 to 2020.","","このグラフは2010年から2020年までの留学生の数を示しています。","ライティング Task 1 の書き出しの型。"],
 ["There was a gradual increase over the period.","","その期間を通して、ゆるやかな増加がありました。",""],
 ["Overall, the figures rose steadily.","","全体として、数値は着実に上がりました。",""],
 ["On the one hand, technology makes life easier.","","一方では、技術は生活を便利にします。",""],
 ["On the other hand, it can make people less active.","","他方では、人の活動量を減らすこともあります。",""],
 ["I'd like to talk about a teacher who inspired me.","","私にやる気をくれた先生について話したいと思います。","スピーキング Part 2 の話し始めの型。"],
 ["To sum up, I believe the benefits outweigh the drawbacks.","","まとめると、利点は欠点を上回ると思います。",""],
 ["That's an interesting question. Let me think.","","おもしろい質問ですね。少し考えさせてください。","スピーキングで考える時間を作る自然な言い方。"]]);
XU('x-ieltsb','IELTS ステップ2','IELTS STEP 2','en',[
 ["The bar chart compares the energy use of four countries.","","この棒グラフは4か国のエネルギー使用量を比べています。","bar chart=棒グラフ、pie chart=円グラフ、line graph=折れ線グラフ。"],
 ["The figure peaked at 80 percent in 2015.","","その数値は2015年に80パーセントでピークに達しました。","peak at 〜=〜で最高になる。"],
 ["Sales fell sharply in the following year.","","翌年、売上は急に落ちました。","sharply=急に、gradually=ゆるやかに。"],
 ["The number of visitors remained stable.","","来場者数は横ばいでした。","remain stable=変わらない、横ばいのまま。"],
 ["By contrast, the cost of housing doubled.","","それに対して、住宅費は2倍になりました。","By contrast=それに対して(比べるとき)。"],
 ["The proportion of women in the workforce has risen.","","働く人の中の女性の割合が増えています。","proportion=割合。"],
 ["The diagram illustrates how paper is recycled.","","この図は紙がどのようにリサイクルされるかを示しています。","illustrate=(図で)示す。工程図の書き出しの型。"],
 ["Most noticeably, the youngest group spent the least.","","最も目立つのは、いちばん若いグループが最も使わなかったことです。",""]]);
XU('x-ieltsc','IELTS ステップ3','IELTS STEP 3','en',[
 ["Some people argue that university education should be free.","","大学教育は無料にすべきだと主張する人もいます。","Some people argue that 〜=〜と主張する人もいる(序論の型)。"],
 ["In my view, the advantages outweigh the disadvantages.","","私の考えでは、利点は欠点を上回ります。","outweigh=〜を上回る。"],
 ["One reason for this is that cities are becoming more crowded.","","その理由の一つは、都市がますます混雑していることです。",""],
 ["For instance, many young people cannot afford to buy a home.","","たとえば、多くの若者は家を買う余裕がありません。","can't afford to 〜=〜する(お金の)余裕がない。"],
 ["This is largely due to rising living costs.","","これは主に生活費の上昇が原因です。",""],
 ["Governments should take steps to address this problem.","","政府はこの問題に取り組む手を打つべきです。","address=(問題に)取り組む。"],
 ["It could be argued that the responsibility lies with parents.","","責任は親にあるという見方もできるでしょう。","lie with 〜=(責任が)〜にある。"],
 ["In conclusion, both individuals and society have a role to play.","","結論として、個人と社会の両方に果たすべき役割があります。",""]]);
XU('x-ieltsd','IELTS ステップ4','IELTS STEP 4','en',[
 ["I'm currently a high school student in Japan.","","私は今、日本の高校生です。","Part 1 の自己紹介。currently=今は。"],
 ["In my free time, I enjoy going for a run.","","暇なときは、ランニングに行くのが好きです。",""],
 ["I'd say my hometown is quite peaceful.","","私の地元は、かなりのんびりしたところだと思います。","I'd say 〜=〜だと思います(やわらかく意見を言う)。"],
 ["I'm going to describe a trip that I really enjoyed.","","とても楽しかった旅行について話します。","Part 2 の話し始めの型。"],
 ["It was around three years ago, during the summer holidays.","","それは3年ほど前の、夏休みのことでした。",""],
 ["What made it special was the people I met there.","","それが特別だったのは、そこで出会った人たちのおかげです。","What made it special was 〜=それを特別にしたのは〜だ(強調の型)。"],
 ["Looking back, I think it changed the way I see the world.","","振り返ると、あれで世界の見方が変わったと思います。",""],
 ["I've never really thought about that before.","","それについては、今まであまり考えたことがありません。","すぐ答えられないときの自然なつなぎ。"]]);
XU('x-ieltse','IELTS ステップ5','IELTS STEP 5','en',[
 ["It depends on the situation.","","状況によります。",""],
 ["Generally speaking, older people are less comfortable with technology.","","一般的に言うと、年配の人は技術にあまりなじんでいません。","Generally speaking=一般的に言うと。"],
 ["There are a number of factors to consider.","","考えるべき要素がいくつかあります。","a number of 〜=いくつかの〜。"],
 ["I suppose one possible solution would be to raise taxes.","","解決策の一つは、税金を上げることかもしれません。","I suppose 〜=〜かな(控えめな推測)。"],
 ["That's partly because people are busier these days.","","それは、最近の人が忙しくなっていることも一因です。","partly because 〜=一つには〜だから。"],
 ["In the long run, it will benefit the whole community.","","長い目で見れば、地域全体のためになるでしょう。","In the long run=長い目で見れば。"],
 ["I'm not entirely sure, but I think it will become more common.","","はっきりとはわかりませんが、もっと一般的になると思います。",""],
 ["To put it another way, we need to change our habits.","","言い換えると、私たちは習慣を変える必要があります。","To put it another way=言い換えると。"]]);
XU('x-toefl','TOEFL iBT ステップ1','TOEFL STEP 1','en',[
 ["The professor will hold office hours on Wednesday.","","教授は水曜日に相談の時間を設けます。","office hours=教授が学生の相談を受ける時間。"],
 ["Photosynthesis converts sunlight into chemical energy.","","光合成は太陽の光を化学エネルギーに変えます。",""],
 ["According to the lecture, the theory has been challenged.","","講義によると、その理論には異論が出ています。",""],
 ["I need to register for one more course this semester.","","今学期、もう1つ授業を登録する必要があります。",""],
 ["The reading passage claims that the plan would be effective.","","読解文は、その計画が効果的だろうと主張しています。",""],
 ["The student is worried about missing the deadline.","","その学生は締め切りに間に合わないことを心配しています。",""],
 ["Glaciers shape the landscape over thousands of years.","","氷河は何千年もかけて地形をつくります。",""],
 ["The main point of the lecture is that the evidence is unclear.","","講義の要点は、その証拠がはっきりしないということです。",""]]);
XU('x-toeflb','TOEFL iBT ステップ2','TOEFL STEP 2','en',[
 ["I was wondering if I could get an extension on my paper.","","レポートの締め切りを延ばしていただけないかと思いまして。","I was wondering if 〜=〜していただけないでしょうか(とてもていねい)。"],
 ["The library will be closed for renovations next week.","","図書館は来週、改装のため閉まります。",""],
 ["You need to declare your major by the end of your second year.","","2年生の終わりまでに専攻を決める必要があります。","declare a major=専攻を正式に決める。"],
 ["I'm thinking of dropping my chemistry class.","","化学の授業をやめようかと考えています。","drop a class=授業の登録を取り消す。"],
 ["Is there a fee for using the fitness center?","","フィットネスセンターを使うのに料金はかかりますか。",""],
 ["You should talk to your academic advisor.","","指導教員に相談したほうがいいですよ。","academic advisor=履修や進路を相談できる教員。"],
 ["The housing office handles room changes.","","部屋の変更は住宅課が受け付けています。",""],
 ["I'll email the professor and ask about the assignment.","","教授にメールして、課題について聞いてみます。",""]]);
XU('x-toeflc','TOEFL iBT ステップ3','TOEFL STEP 3','en',[
 ["Volcanic eruptions can affect the global climate.","","火山の噴火は地球全体の気候に影響することがあります。",""],
 ["Bees play a crucial role in pollinating crops.","","ハチは作物の受粉でとても重要な役割を果たしています。","pollinate=受粉させる。"],
 ["The experiment was repeated to confirm the results.","","結果を確かめるために、実験がくり返されました。",""],
 ["Some animals hibernate to survive the winter.","","冬を越すために冬眠する動物もいます。","hibernate=冬眠する。"],
 ["Erosion gradually wears away the rock.","","浸食は少しずつ岩をけずっていきます。","erosion=浸食、wear away=すり減らす。"],
 ["Scientists have proposed several hypotheses.","","科学者たちはいくつかの仮説を出しています。","hypothesis(仮説)の複数形は hypotheses。"],
 ["This species adapted to life in the desert.","","この種は砂漠での生活に適応しました。","adapt to 〜=〜に適応する。"],
 ["The data suggest that the population is declining.","","データは、その個体数が減っていることを示しています。","data は複数として扱うことが多いです(suggest)。"]]);
XU('x-toefld','TOEFL iBT ステップ4','TOEFL STEP 4','en',[
 ["The invention of printing changed how knowledge spread.","","印刷の発明は、知識の広まり方を変えました。",""],
 ["Early settlers relied on trade with local tribes.","","初期の入植者たちは、地元の部族との交易に頼っていました。","rely on 〜=〜に頼る。"],
 ["The painter was influenced by Japanese woodblock prints.","","その画家は日本の木版画の影響を受けました。",""],
 ["Urban populations grew rapidly during the Industrial Revolution.","","産業革命の間、都市の人口は急速に増えました。",""],
 ["Historians disagree about the causes of the collapse.","","その崩壊の原因について、歴史家の意見は分かれています。",""],
 ["The term was first used in the nineteenth century.","","その言葉は19世紀に初めて使われました。",""],
 ["Advertising aims to influence consumer behavior.","","広告は、消費者の行動に影響を与えることを目指しています。",""],
 ["This theory was later rejected by most economists.","","この理論は、のちにほとんどの経済学者に否定されました。",""]]);
XU('x-toefle','TOEFL iBT ステップ5','TOEFL STEP 5','en',[
 ["I prefer studying alone for two reasons.","","2つの理由から、一人で勉強するほうが好きです。","Independent Speaking の答え始めの型。"],
 ["First of all, I can concentrate better.","","まず第一に、より集中できます。",""],
 ["The woman disagrees with the university's plan.","","女性は大学の計画に反対しています。","Integrated Speaking で、話し手の立場をまとめる型。"],
 ["She gives two reasons to support her opinion.","","彼女は自分の意見を支える理由を2つ挙げています。",""],
 ["The lecturer casts doubt on the claims made in the reading.","","講師は、読解文の主張に疑問を投げかけています。","cast doubt on 〜=〜に疑問を投げかける。Integrated Writing の定番。"],
 ["This contradicts the point made in the passage.","","これは文章の主張と食い違っています。","contradict=〜と矛盾する、反論する。"],
 ["For these reasons, I believe it is a good idea.","","これらの理由から、それは良い考えだと思います。",""],
 ["Personally, I would choose to live in a big city.","","個人的には、大都市に住むほうを選びます。",""]]);
XU('x-icao','ICAO航空英語 ステップ1','ICAO ENGLISH 1','en',[
 ["We have a sick passenger on board.","","体調の悪い乗客がいます。","決まった交信用語で言えないときは、このようなふつうの英語(plain English)で伝えます。"],
 ["Say again.","","もう一度言ってください。","無線では Pardon? ではなく Say again を使います。"],
 ["Request vectors to avoid the weather.","","悪天候を避けるための誘導をお願いします。","vectors=レーダー誘導(進む方位の指示)。"],
 ["We are experiencing severe turbulence.","","激しい乱気流に遭遇しています。",""],
 ["Unable to comply due to traffic.","","他の飛行機がいるため、その指示には従えません。","Unable=指示に従えないときの言い方。traffic=近くを飛ぶ他の飛行機。"],
 ["We had a bird strike on the left engine.","","左エンジンにバードストライクがありました。",""],
 ["Request priority landing.","","優先着陸をお願いします。",""],
 ["Confirm runway in use.","","使用中の滑走路を確認してください。",""]]);
/* ---- Korean: TOPIK ---- */
XU('x-topik1','TOPIK Ⅰ ステップ1','TOPIK I STEP 1','ko',[
 ["저는 학생이에요.","チョヌン ハクセンイエヨ","私は学生です。","이에요/예요=〜です。パッチムがあるときは 이에요。"],
 ["주말에 친구를 만났어요.","チュマレ チングルル マンナッソヨ","週末に友だちに会いました。","「〜に会う」は 를/을 만나다。日本語の「に」とちがうので注意。"],
 ["이 가방은 얼마예요?","イ カバンウン オルマエヨ","このかばんはいくらですか。",""],
 ["내일은 날씨가 좋을 거예요.","ネイルン ナルッシガ チョウル コエヨ","明日は天気がいいでしょう。","-(으)ㄹ 거예요=〜でしょう(推測)。"],
 ["한국 음식을 좋아해요.","ハングク ウムシグル チョアヘヨ","韓国料理が好きです。",""],
 ["도서관에서 책을 읽어요.","トソグァネソ チェグル イルゴヨ","図書館で本を読みます。","에서=(場所)で。"],
 ["지하철역이 어디에 있어요?","チハチョルリョギ オディエ イッソヨ","地下鉄の駅はどこにありますか。",""],
 ["같이 영화를 볼까요?","カチ ヨンファルル ボルッカヨ","一緒に映画を見ましょうか。","-(으)ㄹ까요?=〜しましょうか(誘い)。"]]);
XU('x-topik1b','TOPIK Ⅰ ステップ2','TOPIK I STEP 2','ko',[
 ["이 셔츠 더 큰 사이즈 있어요?","イ ショチュ ト クン サイジュ イッソヨ","このシャツの、もっと大きいサイズはありますか。","더=もっと。"],
 ["카드로 계산할 수 있어요?","カドゥロ ケサナル ス イッソヨ","カードで払えますか。","-(으)ㄹ 수 있다=〜できる。"],
 ["물 한 병 주세요.","ムル ハン ビョン チュセヨ","水を1本ください。","병=びんを数える単位。"],
 ["메뉴 좀 보여 주시겠어요?","メニュ チョム ポヨ ジュシゲッソヨ","メニューを見せてもらえますか。","-아/어 주시겠어요?=〜していただけますか。"],
 ["계산해 주세요.","ケサネ ジュセヨ","お会計をお願いします。",""],
 ["저는 고기를 안 먹어요.","チョヌン コギルル アン モゴヨ","私は肉を食べません。","안+動詞=〜しない。"],
 ["이 국은 정말 맛있어요.","イ クグン チョンマル マシッソヨ","このスープはとてもおいしいです。",""],
 ["빵집은 몇 시에 문을 열어요?","ッパンチブン ミョッ シエ ムヌル ヨロヨ","パン屋は何時に開きますか。","몇 시에=何時に。"]]);
XU('x-topik1c','TOPIK Ⅰ ステップ3','TOPIK I STEP 3','ko',[
 ["역에 어떻게 가요?","ヨゲ オットッケ カヨ","駅へはどうやって行けばいいですか。",""],
 ["쭉 가서 두 번째 골목에서 오른쪽으로 도세요.","ッチュク カソ トゥ ボンッチェ コルモゲソ オルンッチョグロ トセヨ","まっすぐ行って、2つ目の角を右に曲がってください。","오른쪽=右、왼쪽=左。"],
 ["공항 가는 버스는 어디에서 타요?","コンハン カヌン ボスヌン オディエソ タヨ","空港行きのバスはどこから出ますか。","타다=(乗り物に)乗る。"],
 ["다음 기차는 몇 시예요?","タウム キチャヌン ミョッ シエヨ","次の電車は何時ですか。",""],
 ["3박 예약했어요.","サムバク イェヤケッソヨ","3泊の予約をしています。","3박=3泊。漢字語の数(삼)で数えます。"],
 ["방에 수건이 없어요.","パンエ スゴニ オプソヨ","部屋にタオルがありません。","없다=ない(있다の反対)。"],
 ["이 근처에 약국 있어요?","イ クンチョエ ヤックク イッソヨ","この近くに薬局はありますか。",""],
 ["지도에서 위치를 보여 주시겠어요?","チドエソ ウィチルル ポヨ ジュシゲッソヨ","地図で場所を見せてもらえますか。",""]]);
XU('x-topik1d','TOPIK Ⅰ ステップ4','TOPIK I STEP 4','ko',[
 ["형 한 명하고 여동생 한 명이 있어요.","ヒョン ハン ミョンハゴ ヨドンセン ハン ミョンイ イッソヨ","兄が1人と妹が1人います。","형は男性から見た兄。女性なら 오빠。"],
 ["주말에는 자주 축구를 해요.","チュマレヌン チャジュ チュックルル ヘヨ","週末はよくサッカーをします。",""],
 ["요리하는 걸 좋아해요.","ヨリハヌン ゴル チョアヘヨ","料理をするのが好きです。","-는 걸 좋아하다=〜するのが好き。"],
 ["내일 비가 오면 집에 있을 거예요.","ネイル ピガ オミョン チベ イッスル コエヨ","明日雨が降ったら、家にいます。","-(으)면=〜なら。"],
 ["토요일에 같이 놀러 갈래?","トヨイレ カチ ノルロ カルレ","土曜日、いっしょに出かけない?","-(으)ㄹ래?=〜する?(友だちに)。"],
 ["다음 달에 할머니 할아버지 댁에 갈 거예요.","タウム タレ ハルモニ ハラボジ テゲ カル コエヨ","来月、祖父母の家に行く予定です。","댁=お宅(집の敬語)。"],
 ["누나는 은행에서 일해요.","ヌナヌン ウネンエソ イレヨ","姉は銀行で働いています。","누나=男性から見た姉。女性なら 언니。"],
 ["생일 축하해!","センイル チュカヘ","誕生日おめでとう!",""]]);
XU('x-topik1e','TOPIK Ⅰ ステップ5','TOPIK I STEP 5','ko',[
 ["머리가 아파요.","モリガ アパヨ","頭が痛いです。",""],
 ["열이 나서 오늘은 쉴게요.","ヨリ ナソ オヌルン シュイルケヨ","熱があるので、今日は休みます。","-아/어서=〜ので(理由)。"],
 ["일기 예보에 따르면 내일은 맑대요.","イルギ イェボエ ッタルミョン ネイルン マクテヨ","天気予報によると、明日は晴れです。","-대요=〜だそうです(聞いた話)。"],
 ["밖이 많이 추우니까 코트 입어.","パッキ マニ チュウニッカ コトゥ イボ","外はとても寒いから、コートを着てね。","-(으)니까=〜から(理由)。"],
 ["조금 늦을 것 같아요. 미안해요.","チョグム ヌジュル コッ カタヨ ミアネヨ","少し遅れます。ごめんなさい。","-(으)ㄹ 것 같다=〜しそうだ。"],
 ["이따가 전화해도 돼?","イッタガ チョナヘド トェ","あとで電話してもいい?","-아/어도 되다=〜してもいい。"],
 ["메시지 고마워.","メシジ コマウォ","メッセージをありがとう。",""],
 ["다음 주에 또 만나요!","タウム チュエ ット マンナヨ","また来週会いましょう。",""]]);
XU('x-topik2','TOPIK Ⅱ ステップ1','TOPIK II STEP 1','ko',[
 ["환경을 보호하기 위해 일회용품 사용을 줄여야 합니다.","ファンギョンウル ポホハギ ウィヘ イルェヨンプム サヨンウル チュリョヤ ハムニダ","環境を守るために、使い捨て用品の使用を減らさなければなりません。","-기 위해=〜するために。"],
 ["바쁘더라도 아침은 꼭 먹는 게 좋아요.","パップドラド アチムン ッコク モンヌン ゲ チョアヨ","忙しくても、朝ごはんは必ず食べたほうがいいです。","-더라도=〜しても。"],
 ["회의가 연기되었다는 연락을 받았어요.","フェイガ ヨンギドェオッタヌン ヨルラグル パダッソヨ","会議が延期されたという連絡を受けました。",""],
 ["최근 혼자 사는 사람이 늘고 있습니다.","チェグン ホンジャ サヌン サラミ ヌルゴ イッスムニダ","最近、一人暮らしの人が増えています。",""],
 ["저는 그 의견에 동의하지 않습니다.","チョヌン ク ウィギョネ トンイハジ アンスムニダ","私はその意見に同意しません。",""],
 ["이 문제에는 여러 가지 원인이 있다고 생각합니다.","イ ムンジェエヌン ヨロ ガジ ウォニニ イッタゴ センガカムニダ","この問題にはいろいろな原因があると思います。",""],
 ["기술이 발달하면서 생활이 편리해졌습니다.","キスリ パルタラミョンソ センファリ ピョルリヘジョッスムニダ","技術が発達するにつれて、生活が便利になりました。",""],
 ["결론적으로 저는 이 정책에 찬성합니다.","キョルロンジョグロ チョヌン イ チョンチェゲ チャンソンハムニダ","結論として、私はこの政策に賛成です。","作文(쓰기)のまとめで使える表現。"]]);
XU('x-topik2b','TOPIK Ⅱ ステップ2','TOPIK II STEP 2','ko',[
 ["도시보다 시골이 살기 편하다고 생각해요.","トシボダ シゴリ サルギ ピョナダゴ センガケヨ","都会より田舎のほうが暮らしやすいと思います。","AよりB=A보다 B。"],
 ["한편 시골은 교통이 불편해요.","ハンピョン シゴルン キョトンイ プルピョネヨ","一方で、田舎は交通が不便です。","한편=一方で。"],
 ["저는 그 의견에 찬성해요.","チョヌン ク ウィギョネ チャンソンヘヨ","私はその意見に賛成です。",""],
 ["그 생각에는 별로 동의하지 않아요.","ク センガゲヌン ピョルロ トンイハジ アナヨ","その考えにはあまり賛成できません。","별로 〜지 않다=あまり〜ない。"],
 ["온라인으로 배우는 것에는 장점이 많아요.","オンライヌロ ペウヌン ゴセヌン チャンッチョミ マナヨ","オンラインで学ぶことには、多くの利点があります。",""],
 ["가장 중요한 것은 매일 꾸준히 하는 거예요.","カジャン チュンヨハン ゴスン メイル ックジュニ ハヌン ゴエヨ","いちばん大切なのは、毎日続けることです。","꾸준히=こつこつと。"],
 ["맞는 말이지만 다른 시각도 있어요.","マンヌン マリジマン タルン シガクト イッソヨ","たしかにそうですが、別の見方もあります。",""],
 ["결론적으로 둘 다 좋은 점이 있어요.","キョルロンジョグロ トゥル ダ チョウン ジョミ イッソヨ","結論として、どちらにも良い点があります。",""]]);
XU('x-topik2c','TOPIK Ⅱ ステップ3','TOPIK II STEP 3','ko',[
 ["장래에 파일럿이 되고 싶어요.","チャンネエ パイルロシ トェゴ シポヨ","将来、パイロットになりたいです。","〜이/가 되다=〜になる。"],
 ["다음 주까지 보고서를 다 써야 해요.","タウム チュッカジ ポゴソルル タ ッソヤ ヘヨ","来週までにレポートを書き終えなければなりません。","-아/어야 하다=〜しなければならない。"],
 ["면접에서 제 장점에 대해 이야기했어요.","ミョンジョベソ チェ チャンッチョメ テヘ イヤギヘッソヨ","面接では、自分の長所について話しました。","〜에 대해=〜について。"],
 ["이 일에서는 팀워크가 아주 중요해요.","イ イレソヌン ティムウォクガ アジュ チュンヨヘヨ","この仕事ではチームワークがとても大切です。",""],
 ["시험에 합격하기 위해 매일 밤 공부하고 있어요.","シホメ ハプキョカギ ウィヘ メイル パム コンブハゴ イッソヨ","試験に受かるために、毎晩勉強しています。","-기 위해=〜するために。"],
 ["선생님이 숙제는 금요일까지라고 하셨어요.","ソンセンニミ スクチェヌン クミョイルッカジラゴ ハショッソヨ","先生は、宿題は金曜日までだと言いました。","-(이)라고 하다=〜だと言う(引用)。"],
 ["유학을 가면 시야가 넓어질 거라고 생각해요.","ユハグル カミョン シヤガ ノルボジル コラゴ センガケヨ","留学すれば、視野が広がると思います。",""],
 ["질문이 있으면 편하게 물어보세요.","チルムニ イッスミョン ピョナゲ ムロボセヨ","質問があれば、遠慮なく聞いてください。",""]]);
XU('x-topik2d','TOPIK Ⅱ ステップ4','TOPIK II STEP 4','ko',[
 ["외국에 가 본 적이 한 번도 없어요.","ウェグゲ カ ボン ジョギ ハン ボンド オプソヨ","外国に行ったことは一度もありません。","-아/어 본 적이 있다/없다=〜したことがある/ない。"],
 ["지난주에 지갑을 잃어버렸어요.","チナンジュエ チガブル イロボリョッソヨ","先週、財布をなくしてしまいました。","-아/어 버리다=〜してしまう。"],
 ["길을 잃었을 때 친절한 사람이 도와줬어요.","キルル イロッスル ッテ チンジョラン サラミ トワジュォッソヨ","道に迷っていたとき、親切な人が助けてくれました。","-았/었을 때=〜したとき。"],
 ["그 영화를 보고 정말 감동했어요.","ク ヨンファルル ポゴ チョンマル カムドンヘッソヨ","その映画を見て、とても感動しました。",""],
 ["여행하는 동안 많은 사람들을 알게 됐어요.","ヨヘンハヌン ドンアン マヌン サラムドゥルル アルゲ トェッソヨ","旅行中に、たくさんの人と知り合いました。","-는 동안=〜している間。"],
 ["어렸을 때 할머니와 자주 요리를 했어요.","オリョッスル ッテ ハルモニワ チャジュ ヨリルル ヘッソヨ","子どものころ、よく祖母と料理をしていました。",""],
 ["3년 동안 피아노를 배웠어요.","サムニョン ドンアン ピアノルル ペウォッソヨ","3年間ピアノを習っていました。",""],
 ["그날을 절대 잊지 못할 거예요.","クナルル チョルテ イッチ モタル コエヨ","あの日のことは決して忘れません。","못 〜=(どうしても)〜できない。"]]);
XU('x-topik2e','TOPIK Ⅱ ステップ5','TOPIK II STEP 5','ko',[
 ["플라스틱 사용을 줄여야 합니다.","プルラスティク サヨンウル チュリョヤ ハムニダ","プラスチックの使用を減らすべきです。","-ㅂ니다/습니다=かたいていねい語(発表や作文)。"],
 ["기후 변화는 전 세계적으로 큰 문제가 되고 있습니다.","キフ ピョヌァヌン チョン セゲジョグロ クン ムンジェガ トェゴ イッスムニダ","気候変動は世界中で大きな問題になっています。",""],
 ["젊은이들이 지역 활동에 참여하는 것은 중요합니다.","チョルムニドゥリ チヨク ファルトンエ チャミョハヌン ゴスン チュンヨハムニダ","若い人が地域の活動に参加するのは大切です。",""],
 ["앞으로 로봇이 많은 일을 하게 될 것입니다.","アプロ ロボシ マヌン イルル ハゲ トェル コシムニダ","将来、ロボットが多くの仕事をするようになるでしょう。","-게 되다=〜するようになる。"],
 ["대중교통을 이용하면 공기가 깨끗해질 거예요.","テジュンギョトンウル イヨンハミョン コンギガ ッケックテジル コエヨ","公共交通機関を使えば、空気がきれいになります。","-아/어지다=〜になる(変化)。"],
 ["주말마다 어르신들을 돕는 봉사 활동을 하고 있어요.","チュマルマダ オルシンドゥルル トムヌン ポンサ ファルトンウル ハゴ イッソヨ","週末に、お年寄りを手伝うボランティアをしています。","〜마다=〜ごとに。"],
 ["인터넷 덕분에 정보를 바로 얻을 수 있어요.","イントネッ トクプネ チョンボルル パロ オドゥル ス イッソヨ","インターネットのおかげで、すぐに情報が手に入ります。","〜 덕분에=〜のおかげで。"],
 ["10년 후에 세상은 어떻게 변해 있을 것 같아요?","シムニョン フエ セサンウン オットッケ ピョネ イッスル コッ カタヨ","10年後、世界はどうなっていると思いますか。",""]]);
/* ---- Spanish: DELE ---- */
XU('x-dele-a2','DELE A2 ステップ1','DELE A2 STEP 1','es',[
 ["Ayer fui al cine con mis amigos.","アジェル フイ アル シネ コン ミス アミゴス","昨日、友だちと映画に行きました。","fui は ir(行く)の点過去。"],
 ["¿Cuánto cuesta este billete?","クアント クエスタ エステ ビジェテ","この切符はいくらですか。",""],
 ["Normalmente me levanto a las siete.","ノルマルメンテ メ レバント ア ラス シエテ","ふだんは7時に起きます。",""],
 ["Me gustaría reservar una mesa para dos.","メ グスタリア レセルバル ウナ メサ パラ ドス","2人分の席を予約したいのですが。","Me gustaría 〜=〜したいのですが(ていねい)。"],
 ["Estudio español desde hace un año.","エストゥディオ エスパニョル デスデ アセ ウン アニョ","1年前からスペイン語を勉強しています。","desde hace+期間=〜前から(今も続いている)。"],
 ["¿Puedes ayudarme con la maleta?","プエデス アジュダルメ コン ラ マレタ","スーツケースを手伝ってくれる?",""],
 ["El museo está cerca de la plaza.","エル ムセオ エスタ セルカ デ ラ プラサ","美術館は広場の近くにあります。",""],
 ["En verano hace mucho calor.","エン ベラノ アセ ムチョ カロル","夏はとても暑いです。","天気は hacer を使って言います。"]]);
XU('x-dele-a2b','DELE A2 ステップ2','DELE A2 STEP 2','es',[
 ["¿Tiene esta camisa en una talla más grande?","ティエネ エスタ カミサ エン ウナ タジャ マス グランデ","このシャツの、もっと大きいサイズはありますか。","talla=服のサイズ。"],
 ["¿Puedo pagar con tarjeta?","プエド パガル コン タルヘタ","カードで払えますか。",""],
 ["Una botella de agua, por favor.","ウナ ボテジャ デ アグア ポル ファボル","水を1本ください。",""],
 ["¿Me trae la carta, por favor?","メ トラエ ラ カルタ ポル ファボル","メニューを見せてもらえますか。","レストランのメニューは la carta。"],
 ["La cuenta, por favor.","ラ クエンタ ポル ファボル","お会計をお願いします。",""],
 ["No como carne.","ノ コモ カルネ","私は肉を食べません。","スペイン語では主語(yo)をよく省きます。"],
 ["Esta sopa está muy rica.","エスタ ソパ エスタ ムイ リカ","このスープはとてもおいしいです。","料理がおいしい=estar rico。"],
 ["¿A qué hora abre la panadería?","ア ケ オラ アブレ ラ パナデリア","パン屋は何時に開きますか。",""]]);
XU('x-dele-a2c','DELE A2 ステップ3','DELE A2 STEP 3','es',[
 ["¿Cómo se va a la estación?","コモ セ バ ア ラ エスタシオン","駅へはどうやって行けばいいですか。","¿Cómo se va a 〜?=〜へはどう行きますか。"],
 ["Siga todo recto y gire a la derecha en la segunda esquina.","シガ トド レクト イ ヒレ ア ラ デレチャ エン ラ セグンダ エスキナ","まっすぐ行って、2つ目の角を右に曲がってください。","a la derecha=右へ、a la izquierda=左へ。"],
 ["¿De dónde sale el autobús al aeropuerto?","デ ドンデ サレ エル アウトブス アル アエロプエルト","空港行きのバスはどこから出ますか。","al=a+el(〜へ)。"],
 ["¿A qué hora sale el próximo tren?","ア ケ オラ サレ エル プロクシモ トレン","次の電車は何時ですか。",""],
 ["Tengo una reserva para tres noches.","テンゴ ウナ レセルバ パラ トレス ノチェス","3泊の予約をしています。",""],
 ["No hay toallas en mi habitación.","ノ アイ トアジャス エン ミ アビタシオン","部屋にタオルがありません。","hay=〜がある(数に関係なく同じ形)。"],
 ["¿Hay una farmacia cerca de aquí?","アイ ウナ ファルマシア セルカ デ アキ","この近くに薬局はありますか。",""],
 ["¿Me puede indicar en el mapa dónde está?","メ プエデ インディカル エン エル マパ ドンデ エスタ","地図で場所を見せてもらえますか。",""]]);
XU('x-dele-a2d','DELE A2 ステップ4','DELE A2 STEP 4','es',[
 ["Tengo un hermano mayor y una hermana menor.","テンゴ ウン エルマノ マジョル イ ウナ エルマナ メノル","兄が1人と妹が1人います。","mayor=年上の、menor=年下の。"],
 ["Los fines de semana juego al fútbol a menudo.","ロス フィネス デ セマナ フエゴ アル フトボル ア メヌド","週末はよくサッカーをします。","スポーツをする=jugar a 〜。"],
 ["Me gusta cocinar.","メ グスタ コシナル","料理をするのが好きです。","Me gusta+動詞の原形=〜するのが好き。"],
 ["Si mañana llueve, me quedo en casa.","シ マニャナ ジュエベ メ ケド エン カサ","明日雨が降ったら、家にいます。","si+現在形=もし〜なら(未来のことでも現在形)。"],
 ["¿Quedamos el sábado?","ケダモス エル サバド","土曜日、いっしょに出かけない?","quedar=(友だちと)会う約束をする。"],
 ["El mes que viene voy a visitar a mis abuelos.","エル メス ケ ビエネ ボイ ア ビシタル ア ミス アブエロス","来月、祖父母の家に行く予定です。","人が目的語のときは a をつけます(a mis abuelos)。"],
 ["Mi hermana mayor trabaja en un banco.","ミ エルマナ マジョル トラバハ エン ウン バンコ","姉は銀行で働いています。",""],
 ["¡Feliz cumpleaños!","フェリス クンプレアニョス","誕生日おめでとう!",""]]);
XU('x-dele-a2e','DELE A2 ステップ5','DELE A2 STEP 5','es',[
 ["Me duele la cabeza.","メ ドゥエレ ラ カベサ","頭が痛いです。","Me duele 〜=〜が痛い(gustar と同じ形)。"],
 ["Tengo fiebre, así que hoy me quedo en casa.","テンゴ フィエブレ アシ ケ オイ メ ケド エン カサ","熱があるので、今日は休みます。","así que=だから。"],
 ["Según el pronóstico, mañana hará sol.","セグン エル プロノスティコ マニャナ アラ ソル","天気予報によると、明日は晴れです。","hará は hacer の未来形。"],
 ["Hace mucho frío fuera, ponte el abrigo.","アセ ムチョ フリオ フエラ ポンテ エル アブリゴ","外はとても寒いから、コートを着てね。",""],
 ["Voy a llegar un poco tarde. Lo siento.","ボイ ア ジェガル ウン ポコ タルデ ロ シエント","少し遅れます。ごめんなさい。",""],
 ["¿Te puedo llamar más tarde?","テ プエド ジャマル マス タルデ","あとで電話してもいい?",""],
 ["Gracias por tu mensaje.","グラシアス ポル トゥ メンサヘ","メッセージをありがとう。","Gracias por 〜=〜をありがとう。"],
 ["¡Hasta la semana que viene!","アスタ ラ セマナ ケ ビエネ","また来週会いましょう。",""]]);
XU('x-dele-b1','DELE B1 ステップ1','DELE B1 STEP 1','es',[
 ["Si tuviera más tiempo, viajaría por toda España.","シ トゥビエラ マス ティエンポ ビアハリア ポル トダ エスパニャ","もっと時間があれば、スペイン中を旅するのに。","接続法過去+過去未来で「もし〜なら…するのに」。"],
 ["Espero que te guste el regalo.","エスペロ ケ テ グステ エル レガロ","プレゼントを気に入ってくれるといいな。","esperar que のあとは接続法(guste)。"],
 ["Cuando era niño, vivía en el campo.","クアンド エラ ニニョ ビビア エン エル カンポ","子どものころ、田舎に住んでいました。","線過去=過去の習慣や状態。"],
 ["En mi opinión, las redes sociales tienen ventajas e inconvenientes.","エン ミ オピニオン ラス レデス ソシアレス ティエネン ベンタハス エ インコンベニエンテス","私の意見では、SNSには長所と短所があります。","i の音の前では y が e に変わります。"],
 ["Te recomiendo que visites el Museo del Prado.","テ レコミエンド ケ ビシテス エル ムセオ デル プラド","プラド美術館に行くことをすすめます。",""],
 ["Cuando llegué a la estación, el tren ya había salido.","クアンド ジェゲ ア ラ エスタシオン エル トレン ジャ アビア サリド","駅に着いたとき、電車はもう出ていました。","había salido=過去完了(もう〜していた)。"],
 ["Me interesa mucho la cultura de otros países.","メ インテレサ ムチョ ラ クルトゥラ デ オトロス パイセス","ほかの国の文化にとても興味があります。",""],
 ["Es importante que todos reciclemos.","エス インポルタンテ ケ トドス レシクレモス","みんながリサイクルすることが大切です。","Es importante que のあとは接続法。"]]);
XU('x-dele-b1b','DELE B1 ステップ2','DELE B1 STEP 2','es',[
 ["Creo que en el campo se vive mejor que en la ciudad.","クレオ ケ エン エル カンポ セ ビベ メホル ケ エン ラ シウダ","都会より田舎のほうが暮らしやすいと思います。","mejor que 〜=〜よりよく。"],
 ["Por otro lado, en el campo el transporte no es muy práctico.","ポル オトロ ラド エン エル カンポ エル トランスポルテ ノ エス ムイ プラクティコ","一方で、田舎は交通が不便です。","Por otro lado=一方で。"],
 ["Estoy de acuerdo con esa opinión.","エストイ デ アクエルド コン エサ オピニオン","私はその意見に賛成です。","estar de acuerdo con 〜=〜に賛成だ。"],
 ["No estoy muy de acuerdo con esa idea.","ノ エストイ ムイ デ アクエルド コン エサ イデア","その考えにはあまり賛成できません。",""],
 ["Estudiar en línea tiene muchas ventajas.","エストゥディアル エン リネア ティエネ ムチャス ベンタハス","オンラインで学ぶことには、多くの利点があります。",""],
 ["Lo más importante es seguir practicando todos los días.","ロ マス インポルタンテ エス セギル プラクティカンド トドス ロス ディアス","いちばん大切なのは、毎日続けることです。","seguir+現在分詞=〜し続ける。"],
 ["Es verdad, pero también se puede ver de otra manera.","エス ベルダ ペロ タンビエン セ プエデ ベル デ オトラ マネラ","たしかにそうですが、別の見方もあります。",""],
 ["En conclusión, los dos tienen aspectos positivos.","エン コンクルシオン ロス ドス ティエネン アスペクトス ポシティボス","結論として、どちらにも良い点があります。","En conclusión=結論として(作文のしめくくり)。"]]);
XU('x-dele-b1c','DELE B1 ステップ3','DELE B1 STEP 3','es',[
 ["En el futuro quiero ser piloto.","エン エル フトゥロ キエロ セル ピロト","将来、パイロットになりたいです。","職業の前には冠詞をつけません(ser piloto)。"],
 ["Tengo que terminar el informe antes de la semana que viene.","テンゴ ケ テルミナル エル インフォルメ アンテス デ ラ セマナ ケ ビエネ","来週までにレポートを書き終えなければなりません。","tener que+動詞の原形=〜しなければならない。"],
 ["En la entrevista hablé de mis puntos fuertes.","エン ラ エントレビスタ アブレ デ ミス プントス フエルテス","面接では、自分の長所について話しました。",""],
 ["En este trabajo, el trabajo en equipo es muy importante.","エン エステ トラバホ エル トラバホ エン エキポ エス ムイ インポルタンテ","この仕事ではチームワークがとても大切です。",""],
 ["Estudio todas las noches para aprobar el examen.","エストゥディオ トダス ラス ノチェス パラ アプロバル エル エクサメン","試験に受かるために、毎晩勉強しています。","aprobar=(試験に)受かる。"],
 ["El profesor dijo que los deberes eran para el viernes.","エル プロフェソル ディホ ケ ロス デベレス エラン パラ エル ビエルネス","先生は、宿題は金曜日までだと言いました。","dijo que のあとは時制を合わせて線過去(eran)。"],
 ["Creo que estudiar en el extranjero abre la mente.","クレオ ケ エストゥディアル エン エル エクストランヘロ アブレ ラ メンテ","留学すれば、視野が広がると思います。",""],
 ["Si tienen alguna pregunta, no duden en preguntar.","シ ティエネン アルグナ プレグンタ ノ ドゥデン エン プレグンタル","質問があれば、遠慮なく聞いてください。","no duden en 〜=遠慮なく〜してください。"]]);
XU('x-dele-b1d','DELE B1 ステップ4','DELE B1 STEP 4','es',[
 ["Nunca he estado en el extranjero.","ヌンカ エ エスタド エン エル エクストランヘロ","外国に行ったことは一度もありません。","現在完了(he estado)=これまでの経験。"],
 ["La semana pasada perdí la cartera.","ラ セマナ パサダ ペルディ ラ カルテラ","先週、財布をなくしてしまいました。",""],
 ["Cuando me perdí, una persona amable me ayudó.","クアンド メ ペルディ ウナ ペルソナ アマブレ メ アジュド","道に迷っていたとき、親切な人が助けてくれました。","perderse=道に迷う。"],
 ["Esa película me emocionó mucho.","エサ ペリクラ メ エモシオノ ムチョ","その映画を見て、とても感動しました。",""],
 ["Durante el viaje conocí a mucha gente.","ドゥランテ エル ビアヘ コノシ ア ムチャ ヘンテ","旅行中に、たくさんの人と知り合いました。","conocer a 〜=(人と)知り合う。"],
 ["De pequeño, cocinaba a menudo con mi abuela.","デ ペケニョ コシナバ ア メヌド コン ミ アブエラ","子どものころ、よく祖母と料理をしていました。",""],
 ["Fui a clases de piano durante tres años.","フイ ア クラセス デ ピアノ ドゥランテ トレス アニョス","3年間ピアノを習っていました。",""],
 ["Nunca olvidaré aquel día.","ヌンカ オルビダレ アケル ディア","あの日のことは決して忘れません。",""]]);
XU('x-dele-b1e','DELE B1 ステップ5','DELE B1 STEP 5','es',[
 ["Deberíamos usar menos plástico.","デベリアモス ウサル メノス プラスティコ","プラスチックの使用を減らすべきです。","deberíamos=〜するべきだ(deber の過去未来)。"],
 ["El cambio climático se ha convertido en un gran problema en todo el mundo.","エル カンビオ クリマティコ セ ア コンベルティド エン ウン グラン プロブレマ エン トド エル ムンド","気候変動は世界中で大きな問題になっています。","convertirse en 〜=〜になる。"],
 ["Es importante que los jóvenes participen en la vida del barrio.","エス インポルタンテ ケ ロス ホベネス パルティシペン エン ラ ビダ デル バリオ","若い人が地域の活動に参加するのは大切です。",""],
 ["En el futuro, probablemente los robots harán muchos trabajos.","エン エル フトゥロ プロバブレメンテ ロス ロボッツ アラン ムチョス トラバホス","将来、ロボットが多くの仕事をするようになるでしょう。","harán は hacer の未来形。"],
 ["Si usamos el transporte público, el aire estará más limpio.","シ ウサモス エル トランスポルテ プブリコ エル アイレ エスタラ マス リンピオ","公共交通機関を使えば、空気がきれいになります。",""],
 ["Los fines de semana hago voluntariado con personas mayores.","ロス フィネス デ セマナ アゴ ボルンタリアド コン ペルソナス マジョレス","週末に、お年寄りを手伝うボランティアをしています。","hacer voluntariado=ボランティアをする。"],
 ["Gracias a internet, podemos conseguir información al instante.","グラシアス ア インテルネット ポデモス コンセギル インフォルマシオン アル インスタンテ","インターネットのおかげで、すぐに情報が手に入ります。","gracias a 〜=〜のおかげで。"],
 ["¿Cómo crees que será el mundo dentro de diez años?","コモ クレエス ケ セラ エル ムンド デントロ デ ディエス アニョス","10年後、世界はどうなっていると思いますか。","dentro de+期間=(今から)〜後に。"]]);
/* ---- Italian: CILS ---- */
XU('x-cils-a2','CILS A2 ステップ1','CILS A2 STEP 1','it',[
 ["Ieri sono andato al mare con la mia famiglia.","イエーリ ソーノ アンダート アル マーレ コン ラ ミア ファミーリア","昨日、家族と海に行きました。","女性が話すときは andata になります。"],
 ["Quanto costa questo biglietto?","クアント コスタ クエスト ビリエット","この切符はいくらですか。",""],
 ["Di solito mi alzo alle sette.","ディ ソーリト ミ アルツォ アッレ セッテ","ふだんは7時に起きます。",""],
 ["Vorrei prenotare un tavolo per due.","ヴォッレイ プレノターレ ウン ターヴォロ ペル ドゥーエ","2人分の席を予約したいのですが。","Vorrei 〜=〜したいのですが(ていねい)。"],
 ["Studio l'italiano da un anno.","ストゥーディオ リタリアーノ ダ ウン アンノ","1年前からイタリア語を勉強しています。","da+期間=〜前から(今も続いている)。"],
 ["Mi puoi aiutare con la valigia?","ミ プオイ アイウターレ コン ラ ヴァリージャ","スーツケースを手伝ってくれる?",""],
 ["Il museo è vicino alla piazza.","イル ムゼーオ エ ヴィチーノ アッラ ピアッツァ","美術館は広場の近くにあります。",""],
 ["D'estate fa molto caldo.","デスターテ ファ モルト カルド","夏はとても暑いです。","天気は fare を使って言います。"]]);
XU('x-cils-a2b','CILS A2 ステップ2','CILS A2 STEP 2','it',[
 ["Avete questa camicia in una taglia più grande?","アヴェーテ クエスタ カミーチャ イン ウナ ターリャ ピウ グランデ","このシャツの、もっと大きいサイズはありますか。","taglia=服のサイズ。"],
 ["Posso pagare con la carta?","ポッソ パガーレ コン ラ カルタ","カードで払えますか。",""],
 ["Una bottiglia d'acqua, per favore.","ウナ ボッティーリャ ダックア ペル ファヴォーレ","水を1本ください。",""],
 ["Posso vedere il menù?","ポッソ ヴェデーレ イル メヌー","メニューを見せてもらえますか。",""],
 ["Il conto, per favore.","イル コント ペル ファヴォーレ","お会計をお願いします。",""],
 ["Non mangio carne.","ノン マンジョ カルネ","私は肉を食べません。","イタリア語では主語(io)をよく省きます。"],
 ["Questa zuppa è buonissima.","クエスタ ズッパ エ ブオニッスィマ","このスープはとてもおいしいです。","-issimo=とても〜。"],
 ["A che ora apre il panificio?","ア ケ オーラ アープレ イル パニフィーチョ","パン屋は何時に開きますか。",""]]);
XU('x-cils-a2c','CILS A2 ステップ3','CILS A2 STEP 3','it',[
 ["Come si arriva alla stazione?","コメ スィ アッリーヴァ アッラ スタツィオーネ","駅へはどうやって行けばいいですか。","Come si arriva a 〜?=〜へはどう行きますか。"],
 ["Vada sempre dritto e giri a destra al secondo incrocio.","ヴァーダ センプレ ドリット エ ジーリ ア デストラ アル セコンド インクローチョ","まっすぐ行って、2つ目の角を右に曲がってください。","a destra=右へ、a sinistra=左へ。"],
 ["Da dove parte l'autobus per l'aeroporto?","ダ ドーヴェ パルテ ラウトブス ペル ラエロポルト","空港行きのバスはどこから出ますか。",""],
 ["A che ora parte il prossimo treno?","ア ケ オーラ パルテ イル プロッスィモ トレーノ","次の電車は何時ですか。",""],
 ["Ho una prenotazione per tre notti.","オ ウナ プレノタツィオーネ ペル トレ ノッティ","3泊の予約をしています。","h は読みません(Ho=オ)。"],
 ["Nella mia camera non ci sono asciugamani.","ネッラ ミア カーメラ ノン チ ソーノ アッシュガマーニ","部屋にタオルがありません。","c'è / ci sono=〜がある(単数/複数)。"],
 ["C'è una farmacia qui vicino?","チェ ウナ ファルマチーア クイ ヴィチーノ","この近くに薬局はありますか。",""],
 ["Mi può mostrare sulla mappa dov'è?","ミ プオ モストラーレ スッラ マッパ ドヴェ","地図で場所を見せてもらえますか。",""]]);
XU('x-cils-a2d','CILS A2 ステップ4','CILS A2 STEP 4','it',[
 ["Ho un fratello maggiore e una sorella minore.","オ ウン フラテッロ マッジョーレ エ ウナ ソレッラ ミノーレ","兄が1人と妹が1人います。","maggiore=年上の、minore=年下の。"],
 ["Nel fine settimana gioco spesso a calcio.","ネル フィーネ セッティマーナ ジョーコ スペッソ ア カルチョ","週末はよくサッカーをします。","スポーツをする=giocare a 〜。"],
 ["Mi piace cucinare.","ミ ピアーチェ クチナーレ","料理をするのが好きです。","Mi piace+動詞の原形=〜するのが好き。"],
 ["Se domani piove, resto a casa.","セ ドマーニ ピオーヴェ レスト ア カーザ","明日雨が降ったら、家にいます。","話し言葉では、未来のことも現在形でよく言います。"],
 ["Usciamo insieme sabato?","ウッシャーモ インスィエーメ サーバト","土曜日、いっしょに出かけない?",""],
 ["Il mese prossimo vado a trovare i nonni.","イル メーゼ プロッスィモ ヴァード ア トロヴァーレ イ ノンニ","来月、祖父母の家に行く予定です。","andare a trovare 〜=〜に会いに行く。"],
 ["Mia sorella maggiore lavora in banca.","ミア ソレッラ マッジョーレ ラヴォーラ イン バンカ","姉は銀行で働いています。",""],
 ["Buon compleanno!","ブオン コンプレアンノ","誕生日おめでとう!",""]]);
XU('x-cils-a2e','CILS A2 ステップ5','CILS A2 STEP 5','it',[
 ["Mi fa male la testa.","ミ ファ マーレ ラ テスタ","頭が痛いです。","Mi fa male 〜=〜が痛い。"],
 ["Ho la febbre, quindi oggi resto a casa.","オ ラ フェッブレ クインディ オッジ レスト ア カーザ","熱があるので、今日は休みます。","quindi=だから。"],
 ["Secondo le previsioni, domani ci sarà il sole.","セコンド レ プレヴィズィオーニ ドマーニ チ サラ イル ソーレ","天気予報によると、明日は晴れです。","secondo 〜=〜によると。"],
 ["Fuori fa molto freddo, mettiti il cappotto.","フオーリ ファ モルト フレッド メッティティ イル カッポット","外はとても寒いから、コートを着てね。",""],
 ["Arrivo un po' in ritardo. Scusa.","アッリーヴォ ウン ポ イン リタルド スクーザ","少し遅れます。ごめんなさい。","in ritardo=遅れて。"],
 ["Ti posso chiamare più tardi?","ティ ポッソ キアマーレ ピウ タルディ","あとで電話してもいい?",""],
 ["Grazie per il messaggio.","グラーツィエ ペル イル メッサッジョ","メッセージをありがとう。",""],
 ["Ci vediamo la settimana prossima!","チ ヴェディアーモ ラ セッティマーナ プロッスィマ","また来週会いましょう。",""]]);
XU('x-cils-b1','CILS B1 ステップ1','CILS B1 STEP 1','it',[
 ["Se avessi più tempo, viaggerei in tutta Italia.","セ アヴェッスィ ピウ テンポ ヴィアッジェレイ イン トゥッタ イターリア","もっと時間があれば、イタリア中を旅するのに。","接続法半過去+条件法で「もし〜なら…するのに」。"],
 ["Spero che il regalo ti piaccia.","スペーロ ケ イル レガーロ ティ ピアッチャ","プレゼントを気に入ってくれるといいな。","sperare che のあとは接続法(piaccia)。"],
 ["Quando ero bambino, abitavo in campagna.","クアンド エーロ バンビーノ アビターヴォ イン カンパーニャ","子どものころ、田舎に住んでいました。","半過去=過去の習慣や状態。"],
 ["Secondo me, i social hanno vantaggi e svantaggi.","セコンド メ イ ソーシャル アンノ ヴァンタッジ エ ズヴァンタッジ","私の意見では、SNSには長所と短所があります。",""],
 ["Ti consiglio di visitare gli Uffizi.","ティ コンスィーリオ ディ ヴィズィターレ リ ウッフィーツィ","ウフィツィ美術館に行くことをすすめます。",""],
 ["Quando sono arrivato in stazione, il treno era già partito.","クアンド ソーノ アッリヴァート イン スタツィオーネ イル トレーノ エーラ ジャ パルティート","駅に着いたとき、電車はもう出ていました。","era partito=大過去(もう〜していた)。"],
 ["Mi interessa molto la cultura degli altri paesi.","ミ インテレッサ モルト ラ クルトゥーラ デッリ アルトリ パエーズィ","ほかの国の文化にとても興味があります。",""],
 ["È importante che tutti facciano la raccolta differenziata.","エ インポルタンテ ケ トゥッティ ファッチャーノ ラ ラッコルタ ディッフェレンツィアータ","みんなが分別収集をすることが大切です。","È importante che のあとは接続法。"]]);
XU('x-cils-b1b','CILS B1 ステップ2','CILS B1 STEP 2','it',[
 ["Secondo me, in campagna si vive meglio che in città.","セコンド メ イン カンパーニャ スィ ヴィーヴェ メッリョ ケ イン チッタ","都会より田舎のほうが暮らしやすいと思います。","meglio che 〜=〜よりよく。"],
 ["D'altra parte, in campagna i trasporti non sono comodi.","ダルトラ パルテ イン カンパーニャ イ トラスポルティ ノン ソーノ コーモディ","一方で、田舎は交通が不便です。","D'altra parte=一方で。"],
 ["Sono d'accordo con questa opinione.","ソーノ ダッコルド コン クエスタ オピニオーネ","私はその意見に賛成です。","essere d'accordo con 〜=〜に賛成だ。"],
 ["Non sono del tutto d'accordo con questa idea.","ノン ソーノ デル トゥット ダッコルド コン クエスタ イデーア","その考えにはあまり賛成できません。",""],
 ["Studiare online ha molti vantaggi.","ストゥディアーレ オンライン ア モルティ ヴァンタッジ","オンラインで学ぶことには、多くの利点があります。",""],
 ["La cosa più importante è continuare ogni giorno.","ラ コーザ ピウ インポルタンテ エ コンティヌアーレ オンニ ジョルノ","いちばん大切なのは、毎日続けることです。",""],
 ["È vero, ma si può vedere anche in un altro modo.","エ ヴェーロ マ スィ プオ ヴェデーレ アンケ イン ウン アルトロ モード","たしかにそうですが、別の見方もあります。",""],
 ["In conclusione, tutti e due hanno aspetti positivi.","イン コンクルズィオーネ トゥッティ エ ドゥーエ アンノ アスペッティ ポズィティーヴィ","結論として、どちらにも良い点があります。","In conclusione=結論として(作文のしめくくり)。"]]);
XU('x-cils-b1c','CILS B1 ステップ3','CILS B1 STEP 3','it',[
 ["In futuro voglio fare il pilota.","イン フトゥーロ ヴォッリョ ファーレ イル ピロータ","将来、パイロットになりたいです。","職業は fare il 〜 でも言えます(fare il pilota)。"],
 ["Devo finire la relazione entro la settimana prossima.","デーヴォ フィニーレ ラ レラツィオーネ エントロ ラ セッティマーナ プロッスィマ","来週までにレポートを書き終えなければなりません。","entro 〜=〜までに(期限)。"],
 ["Al colloquio ho parlato dei miei punti di forza.","アル コッローキオ オ パルラート デイ ミエイ プンティ ディ フォルツァ","面接では、自分の長所について話しました。","colloquio=(仕事の)面接。"],
 ["In questo lavoro il lavoro di squadra è molto importante.","イン クエスト ラヴォーロ イル ラヴォーロ ディ スクアードラ エ モルト インポルタンテ","この仕事ではチームワークがとても大切です。",""],
 ["Studio ogni sera per superare l'esame.","ストゥーディオ オンニ セーラ ペル スペラーレ レザーメ","試験に受かるために、毎晩勉強しています。","superare l'esame=試験に受かる。"],
 ["Il professore ha detto che i compiti erano per venerdì.","イル プロフェッソーレ ア デット ケ イ コンピティ エーラノ ペル ヴェネルディ","先生は、宿題は金曜日までだと言いました。","ha detto che のあとは時制を合わせて半過去(erano)。"],
 ["Penso che studiare all'estero apra la mente.","ペンソ ケ ストゥディアーレ アッレステーロ アープラ ラ メンテ","留学すれば、視野が広がると思います。","Penso che のあとは接続法(apra)。"],
 ["Se avete domande, non esitate a chiedere.","セ アヴェーテ ドマンデ ノン エズィターテ ア キエデーレ","質問があれば、遠慮なく聞いてください。",""]]);
XU('x-cils-b1d','CILS B1 ステップ4','CILS B1 STEP 4','it',[
 ["Non sono mai stato all'estero.","ノン ソーノ マイ スタート アッレステーロ","外国に行ったことは一度もありません。","non 〜 mai=一度も〜ない。"],
 ["La settimana scorsa ho perso il portafoglio.","ラ セッティマーナ スコルサ オ ペルソ イル ポルタフォッリョ","先週、財布をなくしてしまいました。",""],
 ["Quando mi sono perso, una persona gentile mi ha aiutato.","クアンド ミ ソーノ ペルソ ウナ ペルソーナ ジェンティーレ ミ ア アイウタート","道に迷っていたとき、親切な人が助けてくれました。","perdersi=道に迷う。過去形は essere を使います。"],
 ["Quel film mi ha commosso molto.","クエル フィルム ミ ア コンモッソ モルト","その映画を見て、とても感動しました。",""],
 ["Durante il viaggio ho conosciuto molte persone.","ドゥランテ イル ヴィアッジョ オ コノシュート モルテ ペルソーネ","旅行中に、たくさんの人と知り合いました。","conoscere=(人と)知り合う。"],
 ["Da piccolo cucinavo spesso con la nonna.","ダ ピッコロ クチナーヴォ スペッソ コン ラ ノンナ","子どものころ、よく祖母と料理をしていました。",""],
 ["Ho preso lezioni di pianoforte per tre anni.","オ プレーゾ レツィオーニ ディ ピアノフォルテ ペル トレ アンニ","3年間ピアノを習っていました。",""],
 ["Non dimenticherò mai quel giorno.","ノン ディメンティケロ マイ クエル ジョルノ","あの日のことは決して忘れません。",""]]);
XU('x-cils-b1e','CILS B1 ステップ5','CILS B1 STEP 5','it',[
 ["Dovremmo usare meno plastica.","ドヴレンモ ウザーレ メーノ プラスティカ","プラスチックの使用を減らすべきです。","dovremmo=〜するべきだ(dovere の条件法)。"],
 ["Il cambiamento climatico è diventato un grande problema in tutto il mondo.","イル カンビアメント クリマーティコ エ ディヴェンタート ウン グランデ プロブレーマ イン トゥット イル モンド","気候変動は世界中で大きな問題になっています。",""],
 ["È importante che i giovani partecipino alla vita del quartiere.","エ インポルタンテ ケ イ ジョーヴァニ パルテーチピノ アッラ ヴィータ デル クアルティエーレ","若い人が地域の活動に参加するのは大切です。",""],
 ["In futuro i robot probabilmente faranno molti lavori.","イン フトゥーロ イ ロボット プロバビルメンテ ファランノ モルティ ラヴォーリ","将来、ロボットが多くの仕事をするようになるでしょう。","faranno は fare の未来形。"],
 ["Se usiamo i mezzi pubblici, l'aria sarà più pulita.","セ ウズィアーモ イ メッツィ プッブリチ ラーリア サラ ピウ プリータ","公共交通機関を使えば、空気がきれいになります。",""],
 ["Nel fine settimana faccio volontariato con gli anziani.","ネル フィーネ セッティマーナ ファッチョ ヴォロンタリアート コン リ アンツィアーニ","週末に、お年寄りを手伝うボランティアをしています。","fare volontariato=ボランティアをする。"],
 ["Grazie a internet possiamo trovare informazioni subito.","グラーツィエ ア インテルネット ポッスィアーモ トロヴァーレ インフォルマツィオーニ スービト","インターネットのおかげで、すぐに情報が手に入ります。","grazie a 〜=〜のおかげで。"],
 ["Come pensi che sarà il mondo fra dieci anni?","コメ ペンスィ ケ サラ イル モンド フラ ディエーチ アンニ","10年後、世界はどうなっていると思いますか。","fra+期間=(今から)〜後に。"]]);
/* ================= 授業の用語(くわしく): 数学と理科 in English (プレミアムエコノミーから, test account only for now) =================
   Each item: [English term, Japanese, what it means + how a teacher might use it in class]. Original material. */
function SU(uid,jp,lat,list){
  UM[uid]={jp:jp,lat:lat};
  UNITS.en[uid]={id:uid,items:list.map(function(x){return {jp:x[1],t:x[0],r:'',n:x[2]||''};}),track:'study'};
}
SU('sd-num1','数と式 1','NUMBERS 1',[
 ["positive number","正の数","0より大きい数。授業では Positive numbers are greater than zero.(正の数は0より大きい)"],
 ["negative number","負の数","0より小さい数。授業では Minus five is a negative number.(-5は負の数です)"],
 ["absolute value","絶対値","0からの距離。授業では The absolute value of minus three is three.(-3の絶対値は3)"],
 ["integer","整数","…,-1, 0, 1, 2,… のような数。授業では Is zero point five an integer?(0.5は整数かな?)"],
 ["numerator","分子","分数の上の数。授業では In two thirds, the numerator is two.(2/3の分子は2)"],
 ["denominator","分母","分数の下の数。授業では Find the common denominator.(分母をそろえよう=通分)"],
 ["decimal","小数","0.5 のような数。授業では Write one quarter as a decimal.(1/4を小数で書こう)"],
 ["reciprocal","逆数","かけて1になる数。授業では The reciprocal of three is one third.(3の逆数は1/3)"]]);
SU('sd-num2','数と式 2','NUMBERS 2',[
 ["square root","平方根","2乗するとその数になる数。授業では The square root of nine is three.(9の平方根は3)"],
 ["expression","式","数や文字を記号でつないだもの。授業では Simplify the expression.(式を簡単にしよう)"],
 ["variable","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Here, x is a variable.(ここでは x が変数)"],
 ["coefficient","係数","文字にかかっている数。授業では In five x, the coefficient is five.(5xの係数は5)"],
 ["solve for x","xについて解く","方程式から x の値を求めること。授業では Solve for x and check your answer.(xを求めて、答えを確かめよう)"],
 ["expand","展開する","かっこをはずして式を広げること。授業では Expand the brackets.(かっこを展開しよう)"],
 ["factor","因数分解する","式をかけ算の形にすること。イギリスでは factorise とも。授業では Factor x squared minus four.(x²-4を因数分解しよう)"],
 ["simultaneous equations","連立方程式","アメリカでは a system of equations とも言います。授業では Solve the simultaneous equations.(連立方程式を解こう)"]]);
SU('sd-geo1','図形 1','GEOMETRY 1',[
 ["angle","角","2本の線が作る開き。授業では Measure the angle with a protractor.(分度器で角をはかろう)"],
 ["right angle","直角","90度の角。授業では A square has four right angles.(正方形には直角が4つ)"],
 ["parallel","平行な","どこまでのばしても交わらないこと。授業では These two lines are parallel.(この2本の線は平行)"],
 ["perpendicular","垂直な","直角に交わること。授業では Draw a line perpendicular to AB.(ABに垂直な線をかこう)"],
 ["vertex","頂点","角の先の点。複数形は vertices。授業では A triangle has three vertices.(三角形には頂点が3つ)"],
 ["isosceles triangle","二等辺三角形","2つの辺の長さが等しい三角形。授業では The base angles of an isosceles triangle are equal.(二等辺三角形の底角は等しい)"],
 ["area","面積","広さ。授業では Find the area of the rectangle.(長方形の面積を求めよう)"],
 ["perimeter","周の長さ","図形のまわりの長さ。授業では The perimeter is the distance around the shape.(周の長さは図形のまわりの長さ)"]]);
SU('sd-geo2','図形 2','GEOMETRY 2',[
 ["radius","半径","円の中心から円周までの長さ。授業では The radius is half of the diameter.(半径は直径の半分)"],
 ["diameter","直径","円の中心を通る、はしからはしまでの長さ。授業では Measure the diameter of the circle.(円の直径をはかろう)"],
 ["circumference","円周","円のまわりの長さ。授業では The circumference is pi times the diameter.(円周は直径×円周率)"],
 ["volume","体積","立体の大きさ。授業では Find the volume of the cube.(立方体の体積を求めよう)"],
 ["congruent","合同な","形も大きさも同じこと。授業では These two triangles are congruent.(この2つの三角形は合同)"],
 ["similar","相似な","形が同じで大きさがちがうこと。授業では Similar figures have the same shape.(相似な図形は形が同じ)"],
 ["prove","証明する","正しいことを理由をつけて示すこと。授業では Prove that angle A equals angle B.(角Aと角Bが等しいことを証明しよう)"],
 ["Pythagorean theorem","三平方の定理","直角三角形で a²+b²=c² になる定理。授業では Use the Pythagorean theorem to find the length.(三平方の定理で長さを求めよう)"]]);
SU('sd-func1','関数 1','FUNCTIONS 1',[
 ["function","関数","xが決まるとyがただ1つ決まる関係。授業では y is a function of x.(yはxの関数)"],
 ["directly proportional","比例している","y=ax の関係。授業では y is directly proportional to x.(yはxに比例する)"],
 ["inversely proportional","反比例している","y=a/x の関係。授業では y is inversely proportional to x.(yはxに反比例する)"],
 ["origin","原点","x軸とy軸が交わる点(0, 0)。授業では The graph passes through the origin.(グラフは原点を通る)"],
 ["x-axis","x軸","横の軸。たての軸は y-axis。授業では Label the x-axis.(x軸に名前を書こう)"],
 ["coordinates","座標","点の位置を表す数の組。授業では Write the coordinates of point P.(点Pの座標を書こう)"],
 ["plot","(点を)とる","グラフに点をかきこむこと。授業では Plot the points on the graph.(グラフに点をとろう)"],
 ["substitute","代入する","文字に数を入れること。授業では Substitute two for x.(xに2を代入しよう)"]]);
SU('sd-func2','関数 2','FUNCTIONS 2',[
 ["linear function","一次関数","y=ax+b の形の関数。グラフは直線。授業では The graph of a linear function is a straight line.(一次関数のグラフは直線)"],
 ["slope","傾き","直線の傾きぐあい。イギリスでは gradient とも。授業では The slope of this line is two.(この直線の傾きは2)"],
 ["y-intercept","切片","グラフがy軸と交わる点のy座標。授業では The y-intercept is minus three.(切片は-3)"],
 ["rate of change","変化の割合","xが増えた分に対するyの増え方。授業では Find the rate of change.(変化の割合を求めよう)"],
 ["table of values","表(対応表)","xとyの値を並べた表。授業では Complete the table of values.(表を完成させよう)"],
 ["quadratic function","二次関数","y=ax² のような関数。授業では y equals x squared is a quadratic function.(y=x²は二次関数)"],
 ["parabola","放物線","y=ax² のグラフの形。授業では The graph is a parabola.(グラフは放物線になる)"],
 ["increase","増加する","ふえること。反対は decrease(減少する)。授業では As x increases, y decreases.(xが増えるとyは減る)"]]);
SU('sd-prob1','確率とデータ 1','PROBABILITY 1',[
 ["probability","確率","あることが起こる割合。授業では What is the probability of getting heads?(表が出る確率は?)"],
 ["outcome","(起こりうる)結果","起こりうる1つ1つの場合。授業では List all the possible outcomes.(起こりうる結果を全部書き出そう)"],
 ["equally likely","同様に確からしい","どれも同じ程度に起こりやすいこと。授業では Each number is equally likely.(どの目も同様に確からしい)"],
 ["roll a die","さいころを投げる","die はさいころ1個。2個以上は dice。授業では Roll a die twenty times.(さいころを20回投げよう)"],
 ["flip a coin","コインを投げる","toss a coin とも言います。表は heads、裏は tails。授業では Flip a coin and record the result.(コインを投げて結果を記録しよう)"],
 ["tree diagram","樹形図","場合の数を枝分かれで整理する図。授業では Draw a tree diagram.(樹形図をかこう)"],
 ["mean","平均値","全部たして個数でわった値。授業では Calculate the mean of the data.(データの平均値を計算しよう)"],
 ["median","中央値","小さい順に並べたとき真ん中の値。授業では Find the median.(中央値を求めよう)"]]);
SU('sd-prob2','確率とデータ 2','PROBABILITY 2',[
 ["mode","最頻値","いちばん多く出てくる値。授業では The mode is the most common value.(最頻値はいちばん多い値)"],
 ["range","範囲","最大値−最小値。授業では The range is the largest value minus the smallest.(範囲は最大値−最小値)"],
 ["frequency","度数","それぞれの値や階級に入る数。授業では Make a frequency table.(度数分布表を作ろう)"],
 ["relative frequency","相対度数","度数÷全体の数。授業では Find the relative frequency of each class.(各階級の相対度数を求めよう)"],
 ["histogram","ヒストグラム","度数を柱で表したグラフ。授業では Draw a histogram from the table.(表からヒストグラムをかこう)"],
 ["box plot","箱ひげ図","box-and-whisker plot とも。授業では Compare the two box plots.(2つの箱ひげ図をくらべよう)"],
 ["sample","標本","調べるために全体から取り出した一部。授業では Choose a random sample.(無作為に標本を選ぼう)"],
 ["population","母集団","調べたい集団の全体。授業では The population is all the students in the school.(母集団は学校の全生徒)"]]);
SU('sd-phy1','物理 1','PHYSICS 1',[
 ["force","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Draw an arrow to show the force.(力を矢印で表そう)"],
 ["friction","摩擦","ふれ合う面で動きをじゃまする力。授業では Friction slows the box down.(摩擦で箱がおそくなる)"],
 ["pressure","圧力","面をおす力の大きさ。授業では Pressure is force divided by area.(圧力は力÷面積)"],
 ["speed","速さ","距離÷時間。授業では Calculate the average speed.(平均の速さを計算しよう)"],
 ["acceleration","加速(加速度)","速さが変わること・その割合。授業では The ball shows acceleration as it rolls down.(ボールは転がりながら加速する)"],
 ["inertia","慣性","物体が今の運動を続けようとする性質。授業では Inertia keeps the passengers moving forward.(慣性で乗客は前に動き続ける)"],
 ["kinetic energy","運動エネルギー","動いている物が持つエネルギー。授業では Faster objects have more kinetic energy.(速い物ほど運動エネルギーが大きい)"],
 ["potential energy","位置エネルギー","高い所にある物が持つエネルギー。授業では The ball has more potential energy at the top.(ボールは高い所で位置エネルギーが大きい)"]]);
SU('sd-phy2','物理 2','PHYSICS 2',[
 ["electric current","電流","電気の流れ。単位は A(アンペア)。授業では Measure the current with an ammeter.(電流計で電流をはかろう)"],
 ["voltage","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Connect the voltmeter in parallel.(電圧計は並列につなごう)"],
 ["resistance","抵抗","電流の流れにくさ。単位は Ω(オーム)。授業では Resistance equals voltage divided by current.(抵抗=電圧÷電流)"],
 ["series circuit","直列回路","1本道でつながった回路。授業では In a series circuit, the current is the same everywhere.(直列回路では電流はどこも同じ)"],
 ["parallel circuit","並列回路","枝分かれしてつながった回路。授業では Build a parallel circuit with two bulbs.(豆電球2個で並列回路を作ろう)"],
 ["magnetic field","磁界","磁石の力がはたらく空間。授業では Use iron filings to see the magnetic field.(鉄粉で磁界のようすを見よう)"],
 ["reflection","反射","光がはね返ること。授業では The angle of incidence equals the angle of reflection.(入射角と反射角は等しい)"],
 ["refraction","屈折","光が別の物質に入るときに曲がること。授業では Refraction makes the pencil look bent.(屈折で鉛筆が折れて見える)"]]);
SU('sd-chem1','化学 1','CHEMISTRY 1',[
 ["element","元素","物質をつくるもとになる成分。授業では Find the element on the periodic table.(周期表でその元素を探そう)"],
 ["atom","原子","物質をつくる、とても小さなつぶ。授業では Atoms are too small to see.(原子は小さすぎて見えない)"],
 ["molecule","分子","いくつかの原子が結びついたつぶ。授業では A water molecule has two hydrogen atoms.(水分子には水素原子が2つ)"],
 ["compound","化合物","2種類以上の元素が結びついた物質。授業では Water is a compound.(水は化合物)"],
 ["mixture","混合物","いくつかの物質がまざったもの。授業では Air is a mixture of gases.(空気は気体の混合物)"],
 ["combustion","燃焼","物が酸素と結びついて、熱や光を出しながら燃えること。授業では Combustion needs oxygen.(燃焼には酸素が必要)"],
 ["oxidation","酸化","物質が酸素と結びつくこと。授業では Rust is a result of oxidation.(さびは酸化によってできる)"],
 ["reduction","還元","酸化物から酸素がうばわれること。授業では Carbon is used for the reduction of copper oxide.(酸化銅の還元に炭素を使う)"]]);
SU('sd-chem2','化学 2','CHEMISTRY 2',[
 ["acid","酸","水溶液が酸性を示す物質。授業では Lemon juice is an acid.(レモン汁は酸)"],
 ["alkali","アルカリ","水溶液がアルカリ性を示す物質。形容詞は alkaline。授業では Soap is slightly alkaline.(せっけんは弱いアルカリ性)"],
 ["neutralization","中和","酸とアルカリが反応して性質を打ち消し合うこと。授業では Neutralization produces salt and water.(中和で塩と水ができる)"],
 ["solution","溶液(水溶液)","物質が液体にとけたもの。授業では Make a salt solution.(食塩水を作ろう)"],
 ["dissolve","とける・とかす","液体の中に物質がとけこむこと。授業では Sugar dissolves in water.(砂糖は水にとける)"],
 ["ion","イオン","電気をおびた原子やそのまとまり。授業では Ions carry electric charge.(イオンは電気をおびている)"],
 ["electrolysis","電気分解","電流を流して物質を分解すること。授業では Electrolysis of water produces hydrogen and oxygen.(水の電気分解で水素と酸素ができる)"],
 ["density","密度","体積あたりの質量。授業では Density is mass divided by volume.(密度=質量÷体積)"]]);
SU('sd-bio1','生物 1','BIOLOGY 1',[
 ["nucleus","核","細胞の中で遺伝子を持つ部分。複数形は nuclei。授業では Stain the cells to see the nucleus.(染色して核を見よう)"],
 ["cell membrane","細胞膜","細胞のまわりのうすい膜。授業では Every cell has a cell membrane.(どの細胞にも細胞膜がある)"],
 ["chloroplast","葉緑体","植物の細胞で光合成をする緑のつぶ。授業では Chloroplasts are found in plant cells.(葉緑体は植物の細胞にある)"],
 ["respiration","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では Respiration releases energy.(呼吸でエネルギーが取り出される)"],
 ["digestion","消化","食べ物を体に吸収できる形に分解すること。授業では Digestion starts in the mouth.(消化は口から始まる)"],
 ["blood vessel","血管","血液が流れる管。授業では Arteries and veins are blood vessels.(動脈と静脈は血管)"],
 ["gene","遺伝子","親から子に伝わる特徴のもと。授業では Genes are passed from parents to children.(遺伝子は親から子に伝わる)"],
 ["evolution","進化","生物が長い年月をかけて変化すること。授業では Fossils give evidence of evolution.(化石は進化の証拠になる)"]]);
SU('sd-bio2','生物 2','BIOLOGY 2',[
 ["chromosome","染色体","細胞分裂のときに見える、遺伝子をのせたもの。授業では Chromosomes can be seen during cell division.(染色体は細胞分裂のときに見える)"],
 ["cell division","細胞分裂","1つの細胞が2つに分かれること。授業では Observe cell division in an onion root.(タマネギの根で細胞分裂を観察しよう)"],
 ["fertilization","受精","卵と精子(や精細胞)が合体すること。授業では Fertilization produces a new cell.(受精で新しい細胞ができる)"],
 ["heredity","遺伝","親の特徴が子に伝わること。授業では Mendel studied heredity using peas.(メンデルはエンドウで遺伝を研究した)"],
 ["food chain","食物連鎖","「食べる・食べられる」のつながり。授業では Draw a food chain for the forest.(森の食物連鎖をかこう)"],
 ["producer","生産者","光合成で栄養分をつくる生物(植物など)。授業では Plants are producers.(植物は生産者)"],
 ["consumer","消費者","ほかの生物を食べて栄養分をとる生物。授業では Animals are consumers.(動物は消費者)"],
 ["decomposer","分解者","死がいやふんを分解する生物(菌類など)。授業では Fungi are decomposers.(菌類は分解者)"]]);
SU('sd-earth1','地学 1','EARTH SCIENCE 1',[
 ["earthquake","地震","大地がゆれること。授業では The earthquake was felt across the region.(その地震は地域全体で感じられた)"],
 ["epicenter","震央","震源の真上の地表の点。イギリスでは epicentre。授業では Mark the epicenter on the map.(地図に震央をかこう)"],
 ["volcano","火山","マグマがふき出してできた山。授業では This volcano is still active.(この火山は今も活動している)"],
 ["magma","マグマ","地下でとけている岩石。授業では Magma cools to form igneous rock.(マグマが冷えて火成岩になる)"],
 ["fossil","化石","大昔の生物の死がいや跡が残ったもの。授業では Fossils tell us about ancient life.(化石から大昔の生物がわかる)"],
 ["layer","層(地層)","積み重なった層。地層は rock layers や strata とも。授業では The lower layers are usually older.(ふつう下の層ほど古い)"],
 ["erosion","侵食","水や風が岩や土をけずること。授業では Rivers cause erosion.(川は侵食を起こす)"],
 ["sedimentary rock","堆積岩","土砂などが積もって固まった岩石。授業では Sandstone is a sedimentary rock.(砂岩は堆積岩)"]]);
SU('sd-earth2','地学 2','EARTH SCIENCE 2',[
 ["air pressure","気圧","空気がおす力。授業では Air pressure is falling, so it may rain.(気圧が下がっているので雨かも)"],
 ["weather front","前線","性質のちがう空気の境目。cold front は寒冷前線。授業では A cold front is coming.(寒冷前線が近づいている)"],
 ["humidity","湿度","空気中の水蒸気の割合。授業では The humidity is high today.(今日は湿度が高い)"],
 ["condensation","凝結","水蒸気が冷えて水滴になること。授業では Condensation forms clouds.(凝結で雲ができる)"],
 ["rotation","自転","天体が自分の軸のまわりを回ること。授業では The Earth's rotation causes day and night.(地球の自転で昼と夜ができる)"],
 ["revolution","公転","天体がほかの天体のまわりを回ること。授業では The Earth's revolution takes about a year.(地球の公転には約1年かかる)"],
 ["solar system","太陽系","太陽とそのまわりを回る天体の集まり。授業では There are eight planets in the solar system.(太陽系には8つの惑星がある)"],
 ["eclipse","食(日食・月食)","solar eclipse は日食、lunar eclipse は月食。授業では A solar eclipse happens when the Moon blocks the Sun.(月が太陽をかくすと日食が起こる)"]]);
ORDER.forEach(function(l){ALL_IDS[l]=Object.keys(UNITS[l]);});
/* the exam groups shown in 検定モード, and the class each lesson needs (0 economy … 3 first) */
var EXAMS={
 en:[{key:'eiken',title:'英検',sub:'5級から1級まで',ids:['x-ek5','x-ek4','x-ek3','x-ekp2','x-ekp2p','x-ek2','x-ekp1','x-ek1']},
     {key:'global',title:'TOEIC・IELTS・TOEFL',sub:'就職・留学で使う英語のテスト',ids:['x-toeic','x-ielts','x-toefl']},
     {key:'icao',title:'航空英語(ICAO)',sub:'パイロットや管制官に必要な英語',ids:['x-icao']}],
 ko:[{key:'topik',title:'TOPIK(韓国語能力試験)',sub:'Ⅰは初級、Ⅱは中級〜上級',ids:['x-topik1','x-topik2']}],
 es:[{key:'dele',title:'DELE(スペイン語検定)',sub:'A2は初級、B1は中級',ids:['x-dele-a2','x-dele-b1']}],
 it:[{key:'cils',title:'CILS(イタリア語検定)',sub:'A2は初級、B1は中級',ids:['x-cils-a2','x-cils-b1']}]
};
/* 問題集 (bank): the lessons for one level. tier = the class it needs (1 プレミアムエコノミー, 2 ビジネス).
   A bank with fewer than XBANK_FULL phrases is still 準備中: it can be studied, but has no 合格圏メーター yet. */
var XBANK_FULL=40;
var XBANK={
 ek5:{L:'en',name:'英検5級',tier:1,ids:['x-ek5','x-ek5b','x-ek5c','x-ek5d','x-ek5e']},
 ek4:{L:'en',name:'英検4級',tier:1,ids:['x-ek4','x-ek4b','x-ek4c','x-ek4d','x-ek4e']},
 ek3:{L:'en',name:'英検3級',tier:1,ids:['x-ek3','x-ek3b','x-ek3c','x-ek3d','x-ek3e']},
 ekp2:{L:'en',name:'英検準2級',tier:1,ids:['x-ekp2','x-ekp2b','x-ekp2c','x-ekp2d','x-ekp2e']},
 ekp2p:{L:'en',name:'英検準2級プラス',tier:2,ids:['x-ekp2p','x-ekp2pb','x-ekp2pc','x-ekp2pd','x-ekp2pe']},
 ek2:{L:'en',name:'英検2級',tier:2,ids:['x-ek2','x-ek2b','x-ek2c','x-ek2d','x-ek2e']},
 ekp1:{L:'en',name:'英検準1級',tier:2,ids:['x-ekp1','x-ekp1b','x-ekp1c','x-ekp1d','x-ekp1e']},
 ek1:{L:'en',name:'英検1級',tier:2,ids:['x-ek1','x-ek1b','x-ek1c','x-ek1d','x-ek1e']},
 toeic:{L:'en',name:'TOEIC L&R',tier:2,ids:['x-toeic','x-toeicb','x-toeicc','x-toeicd','x-toeice']},
 ielts:{L:'en',name:'IELTS',tier:2,ids:['x-ielts','x-ieltsb','x-ieltsc','x-ieltsd','x-ieltse']},
 toefl:{L:'en',name:'TOEFL iBT',tier:2,ids:['x-toefl','x-toeflb','x-toeflc','x-toefld','x-toefle']},
 icao:{L:'en',name:'航空英語(ICAO)',tier:2,ids:['x-icao']},
 topik1:{L:'ko',name:'TOPIK Ⅰ',tier:1,ids:['x-topik1','x-topik1b','x-topik1c','x-topik1d','x-topik1e']},
 topik2:{L:'ko',name:'TOPIK Ⅱ',tier:2,ids:['x-topik2','x-topik2b','x-topik2c','x-topik2d','x-topik2e']},
 'dele-a2':{L:'es',name:'DELE A2',tier:1,ids:['x-dele-a2','x-dele-a2b','x-dele-a2c','x-dele-a2d','x-dele-a2e']},
 'dele-b1':{L:'es',name:'DELE B1',tier:2,ids:['x-dele-b1','x-dele-b1b','x-dele-b1c','x-dele-b1d','x-dele-b1e']},
 'cils-a2':{L:'it',name:'CILS A2',tier:1,ids:['x-cils-a2','x-cils-a2b','x-cils-a2c','x-cils-a2d','x-cils-a2e']},
 'cils-b1':{L:'it',name:'CILS B1',tier:2,ids:['x-cils-b1','x-cils-b1b','x-cils-b1c','x-cils-b1d','x-cils-b1e']},
 /* 授業の用語(くわしく) in 留学モード: プレミアムエコノミーから */
 'sd-math':{L:'en',name:'数学の用語',tier:1,study:1,ids:['sd-num1','sd-num2','sd-geo1','sd-geo2','sd-func1','sd-func2','sd-prob1','sd-prob2']},
 'sd-sci':{L:'en',name:'理科の用語',tier:1,study:1,ids:['sd-phy1','sd-phy2','sd-chem1','sd-chem2','sd-bio1','sd-bio2','sd-earth1','sd-earth2']}
};
var XBANK_OF={};
Object.keys(XBANK).forEach(function(k){XBANK[k].key=k;XBANK[k].ids.forEach(function(u){XBANK_OF[u]=k;});});
function examTier(uid){var b=XBANK[XBANK_OF[uid]];return b?b.tier:2;}
/* 目標: pick an exam, then the level or score you are aiming for. [label, bank] (bank null = not made yet) */
var XGOALS={
 en:[{key:'eiken',title:'英検',pre:'英検',sub:'目標の級',goals:[['5級','ek5'],['4級','ek4'],['3級','ek3'],['準2級','ekp2'],['準2級プラス','ekp2p'],['2級','ek2'],['準1級','ekp1'],['1級','ek1']]},
     {key:'toeic',title:'TOEIC L&R',pre:'TOEIC ',sub:'目標スコア(990点満点)',goals:[['400点','toeic'],['500点','toeic'],['600点','toeic'],['700点','toeic'],['800点','toeic'],['900点','toeic']]},
     {key:'ielts',title:'IELTS',pre:'IELTS ',sub:'目標バンド(9.0満点)',goals:[['4.0','ielts'],['5.0','ielts'],['5.5','ielts'],['6.0','ielts'],['6.5','ielts'],['7.0','ielts']]},
     {key:'toefl',title:'TOEFL iBT',pre:'TOEFL ',sub:'目標スコア(2026年からの1〜6のスコア)',goals:[['3.5','toefl'],['4.0','toefl'],['4.5','toefl'],['5.0','toefl'],['5.5','toefl']]},
     {key:'icao',title:'航空英語(ICAO)',pre:'ICAO ',sub:'パイロット・管制官に必要なのはレベル4以上',goals:[['レベル4','icao'],['レベル5','icao'],['レベル6','icao']]}],
 ko:[{key:'topik',title:'TOPIK',pre:'TOPIK ',sub:'目標の級(Ⅰは1〜2級、Ⅱは3〜6級)',goals:[['1級','topik1'],['2級','topik1'],['3級','topik2'],['4級','topik2'],['5級','topik2'],['6級','topik2']]}],
 es:[{key:'dele',title:'DELE',pre:'DELE ',sub:'目標のレベル',goals:[['A2','dele-a2'],['B1','dele-b1']]}],
 it:[{key:'cils',title:'CILS',pre:'CILS ',sub:'目標のレベル',goals:[['A2','cils-a2'],['B1','cils-b1']]}]
};
