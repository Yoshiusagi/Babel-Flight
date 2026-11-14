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
/* ---- 英検5級〜2級: ステップ2〜5 (every 英検 level goes on with ステップ6〜15 below its ステップ5) ---- */
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
/* ---- 英検5級: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ek5f','英検5級 ステップ6','EIKEN 5 STEP 6','en',[
 ["I'm from Osaka.","","私は大阪の出身です。","be from 〜=〜の出身です。"],
 ["Where are you from?","","あなたはどこの出身ですか。","答えは I'm from 〜. で言います。"],
 ["Are you a new student?","","あなたは新しい生徒ですか。","Yes, I am. / No, I'm not. で答えます。"],
 ["He is my best friend.","","彼は私のいちばんの友だちです。","best friend=親友。"],
 ["We are in the same class.","","私たちは同じクラスです。","主語が we なので are を使います。"],
 ["Is this your umbrella? Yes, it is.","","これはあなたのかさですか。はい、そうです。","this で聞かれたら、答えでは it を使います。"],
 ["They aren't at home now.","","彼らは今、家にいません。","aren't=are not。"],
 ["My name is Kenta. Please call me Ken.","","ぼくの名前はケンタです。ケンと呼んでください。","call 人 〜=人を〜と呼ぶ。"]]);
XU('x-ek5g','英検5級 ステップ7','EIKEN 5 STEP 7','en',[
 ["My father drives to work.","","父は車で仕事に行きます。","主語が he・she や1人の人のときは、動詞に s をつけます。"],
 ["Does your brother play baseball? Yes, he does.","","お兄さんは野球をしますか。はい、します。","Does で聞かれたら does で答えます。"],
 ["She watches TV after dinner.","","彼女は夕食のあとテレビを見ます。","watch は es をつけて watches。"],
 ["Ken studies English every day.","","ケンは毎日英語を勉強します。","study は y を i にかえて studies。"],
 ["My mother doesn't drink coffee.","","母はコーヒーを飲みません。","doesn't のあとの動詞は s をつけない形(drink)。"],
 ["Do you have any brothers or sisters?","","きょうだいはいますか。","any=(質問の文で)いくつか・だれか。"],
 ["I usually walk to school.","","私はふだん歩いて学校へ行きます。","usually=ふだんは。動詞の前に置きます。"],
 ["What do you do on Sundays?","","日曜日には何をしますか。","on Sundays=(毎週)日曜日に。"]]);
XU('x-ek5h','英検5級 ステップ8','EIKEN 5 STEP 8','en',[
 ["When is your birthday?","","あなたの誕生日はいつですか。","when=いつ。"],
 ["Which bag is yours?","","どのかばんがあなたのものですか。","which=どちらの・どの。yours=あなたのもの。"],
 ["Why do you like summer? Because I can swim in the sea.","","なぜ夏が好きなのですか。海で泳げるからです。","Why で聞かれたら Because 〜 で理由を答えます。"],
 ["How many students are in your class?","","あなたのクラスには何人の生徒がいますか。","How many のあとは複数の形(students)。"],
 ["How is the weather in Sapporo? It's snowy.","","札幌の天気はどうですか。雪です。","How is the weather?=天気はどうですか。"],
 ["Who makes breakfast in your family?","","あなたの家ではだれが朝ごはんを作りますか。","who が主語のときは、動詞に s をつけます(makes)。"],
 ["How long is the movie?","","その映画はどのくらいの長さですか。","How long=どのくらい長い。"],
 ["What time does the shop open?","","その店は何時に開きますか。","What time=何時。"]]);
XU('x-ek5i','英検5級 ステップ9','EIKEN 5 STEP 9','en',[
 ["Can you help me? Sure.","","手伝ってくれる?いいよ。","Can you 〜?=〜してくれますか。"],
 ["I can't ride a unicycle.","","私は一輪車に乗れません。","can't=can not(〜できない)。"],
 ["Don't eat in the library.","","図書館で食べてはいけません。","Don't+動詞=〜してはいけない。"],
 ["Be quiet, please.","","静かにしてください。","be 動詞の命令文は Be で始めます。"],
 ["Let's go to the zoo this Saturday. Yes, let's.","","今週の土曜日に動物園に行こう。うん、行こう。","Let's 〜.=〜しよう。答えは Yes, let's. など。"],
 ["Can I have some water?","","お水をもらえますか。","Can I have 〜?=〜をもらえますか。"],
 ["Look at that bird!","","あの鳥を見て!","look at=〜を見る。"],
 ["Come here, Taro.","","タロウ、こっちに来て。","名前で呼びかけるときは、コンマで区切ります。"]]);
XU('x-ek5j','英検5級 ステップ10','EIKEN 5 STEP 10','en',[
 ["What are you doing now? I'm making a cake.","","今何をしているの?ケーキを作っているよ。","make は e をとって making。"],
 ["My brother is swimming in the pool.","","弟はプールで泳いでいます。","swim は m を重ねて swimming。"],
 ["Is it raining outside? No, it isn't.","","外は雨が降っていますか。いいえ、降っていません。","天気の文の主語は it。"],
 ["They are playing basketball in the gym.","","彼らは体育館でバスケットボールをしています。","gym=体育館。"],
 ["Look! The baby is sleeping.","","見て!赤ちゃんがねむっているよ。","Look! のあとは「今」していること=進行形がよく来ます。"],
 ["We aren't watching TV now.","","私たちは今テレビを見ていません。","進行形の否定は be 動詞に not。"],
 ["Who is singing in the music room?","","音楽室でだれが歌っていますか。","who が主語なので is を使います。"],
 ["She is talking on the phone.","","彼女は電話で話しています。","on the phone=電話で。"]]);
XU('x-ek5k','英検5級 ステップ11','EIKEN 5 STEP 11','en',[
 ["My piano lesson is at four on Tuesday.","","ピアノのレッスンは火曜日の4時です。","時刻の前は at、曜日の前は on。"],
 ["In Japan, school starts in April.","","日本では学校は4月に始まります。","月の前は in。"],
 ["I go to bed at ten.","","私は10時に寝ます。","go to bed=寝る。"],
 ["We don't have school on Saturdays.","","土曜日は学校がありません。","on Saturdays=(毎週)土曜日に。"],
 ["What's the date today? It's May tenth.","","今日は何月何日ですか。5月10日です。","日付は date、曜日は day でたずねます。"],
 ["My favorite season is spring.","","私のいちばん好きな季節は春です。","season=季節。"],
 ["See you on Friday.","","金曜日に会おうね。","別れるときのあいさつ。"],
 ["It's hot in August.","","8月は暑いです。","暑さ・寒さの文の主語は it。"]]);
XU('x-ek5l','英検5級 ステップ12','EIKEN 5 STEP 12','en',[
 ["This is my aunt. She lives in Okinawa.","","こちらは私のおばです。沖縄に住んでいます。","人を紹介するときは This is 〜. と言います。"],
 ["My uncle is a cook at a hotel.","","おじはホテルの料理人です。","cook=料理人(動詞なら「料理する」)。"],
 ["These are my new shoes.","","これは私の新しいくつです。","these=これら。複数なので are を使います。"],
 ["Whose cap is that? It's Tom's.","","あれはだれのぼうしですか。トムのものです。","Tom's=トムのもの。"],
 ["I have two cats and a dog.","","私はねこを2ひきと犬を1ぴき飼っています。","2つ以上は cats のように s をつけます。"],
 ["My sister has long hair.","","姉は髪が長いです。","has は have の s がつく形。"],
 ["Our teacher is from Canada.","","私たちの先生はカナダの出身です。",""],
 ["Those boys are my classmates.","","あの男の子たちは私のクラスメートです。","those=あれら(遠くの複数のもの・人)。"]]);
XU('x-ek5m','英検5級 ステップ13','EIKEN 5 STEP 13','en',[
 ["What do you want for lunch?","","お昼ごはんに何が食べたい?","for lunch=お昼ごはんに。"],
 ["Two hamburgers, please.","","ハンバーガーを2つください。","注文は 物+please で言えます。"],
 ["Do you want some cookies? Yes, please.","","クッキーはいかが?はい、お願いします。","すすめられたら Yes, please. / No, thank you. で答えます。"],
 ["I don't like tomatoes.","","私はトマトが好きではありません。","好ききらいを言うときは tomatoes のように複数の形にします。"],
 ["My mother makes curry and rice on Sundays.","","母は日曜日にカレーライスを作ります。","curry and rice=カレーライス。"],
 ["How much are these apples? They're 200 yen.","","このりんごはいくらですか。200円です。","these apples は複数なので are を使います。"],
 ["This soup is very good.","","このスープはとてもおいしいです。","食べ物の good=おいしい。"],
 ["I'm hungry. Me, too.","","おなかがすいた。ぼくも。","Me, too.=私も。"]]);
XU('x-ek5n','英検5級 ステップ14','EIKEN 5 STEP 14','en',[
 ["I'm in the art club.","","私は美術部に入っています。","be in the 〜 club=〜部に入っている。"],
 ["We have P.E. today.","","今日は体育があります。","P.E.=体育。"],
 ["Mr. Sato teaches math.","","佐藤先生は数学を教えています。","男性の先生は Mr.、女性の先生は Ms. をつけます。"],
 ["Science is difficult but interesting.","","理科は難しいけれどおもしろいです。","but=しかし・けれど。"],
 ["Open your textbooks to page ten.","","教科書の10ページを開いてください。","授業でよく聞く言い方。"],
 ["How do you say “neko” in English?","","「ねこ」は英語で何と言いますか。","英語の言い方がわからないときに使えます。"],
 ["Can I go to the bathroom?","","トイレに行ってもいいですか。","家や学校のトイレは bathroom とよく言います。"],
 ["Let's study together in the library.","","図書館でいっしょに勉強しよう。","together=いっしょに。"]]);
XU('x-ek5o','英検5級 ステップ15','EIKEN 5 STEP 15','en',[
 ["Good morning, Ms. Green.","","おはようございます、グリーン先生。","朝のあいさつ。"],
 ["How are you? I'm fine, thank you.","","元気ですか。元気です、ありがとう。",""],
 ["You're welcome.","","どういたしまして。","Thank you. への返事。"],
 ["Good luck!","","がんばってね!","試合やテストの前にかけることば。"],
 ["Sorry, I don't know.","","ごめんなさい、わかりません。",""],
 ["Happy birthday! This is for you.","","誕生日おめでとう!これはあなたにです。","プレゼントをわたすときは This is for you. と言います。"],
 ["Let me see.","","ええと。","考えるときのつなぎことば。"],
 ["Just a minute, please.","","少し待ってください。","minute=分。「ちょっと」の意味でも使います。"]]);
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
/* ---- 英検4級: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ek4f','英検4級 ステップ6','EIKEN 4 STEP 6','en',[
 ["I studied for the test last night.","","昨夜はテスト勉強をしました。","study の過去形は studied(y を i にかえて ed)。"],
 ["We had a good time at the party.","","パーティーではとても楽しく過ごしました。","have a good time=楽しく過ごす。have の過去形は had。"],
 ["She didn't come to school yesterday.","","彼女は昨日学校に来ませんでした。","didn't のあとは動詞の元の形(come)。"],
 ["Where did you go last weekend?","","先週末はどこに行きましたか。","過去の質問は Did / did を使います。"],
 ["I saw a famous singer at the airport.","","空港で有名な歌手を見かけました。","see の過去形は saw。"],
 ["He wrote a letter to his grandmother.","","彼はおばあさんに手紙を書きました。","write の過去形は wrote。"],
 ["How did you get there? By train.","","そこへはどうやって行ったの?電車で。","How=どうやって。答えは By+乗り物。"],
 ["I left my umbrella on the bus.","","バスにかさを置き忘れました。","leave(置いていく)の過去形は left。"]]);
XU('x-ek4g','英検4級 ステップ7','EIKEN 4 STEP 7','en',[
 ["What were you doing at nine last night?","","昨夜9時に何をしていましたか。","過去進行形=was / were+〜ing(〜していた)。"],
 ["I was taking a bath then.","","そのときはおふろに入っていました。","then=そのとき。take a bath=おふろに入る。"],
 ["It was very hot yesterday.","","昨日はとても暑かったです。","is の過去形は was。"],
 ["The students were cleaning the classroom.","","生徒たちは教室をそうじしていました。","主語が複数なら were。"],
 ["Were you at home last Sunday? No, I wasn't.","","この前の日曜日は家にいましたか。いいえ、いませんでした。","wasn't=was not。"],
 ["When I got up, it was snowing.","","起きたとき、雪が降っていました。","when=〜したとき。"],
 ["My mother was busy this morning.","","母は今朝いそがしかったです。","this morning は今日の朝のこと。過去形で使えます。"],
 ["There was a big festival in our town.","","私たちの町で大きなお祭りがありました。","There was 〜=〜があった。"]]);
XU('x-ek4h','英検4級 ステップ8','EIKEN 4 STEP 8','en',[
 ["I'm going to stay with my uncle in Kobe.","","神戸のおじの家に泊まる予定です。","be going to=〜するつもり(もう決めている予定)。stay with 人=人の家に泊まる。"],
 ["It's going to rain this afternoon.","","今日の午後は雨が降りそうです。","空を見て「降りそう」と言うときにも be going to を使います。"],
 ["Will it be cold tomorrow? Yes, it will.","","明日は寒くなりますか。はい、なります。","will のあとは動詞の元の形(be)。"],
 ["I won't be late again.","","もう遅れません。","won't=will not。"],
 ["What are you going to buy at the mall?","","ショッピングモールで何を買うつもりですか。",""],
 ["My sister is going to get married next year.","","姉は来年結婚する予定です。","get married=結婚する。"],
 ["I think it'll be a nice day.","","いい天気になると思います。","it'll=it will。"],
 ["We'll have a test next Monday.","","来週の月曜日にテストがあります。","next Monday=次の月曜日(前に on はつけません)。"]]);
XU('x-ek4i','英検4級 ステップ9','EIKEN 4 STEP 9','en',[
 ["There are thirty students in my class.","","私のクラスには30人の生徒がいます。","複数なら There are。"],
 ["Is there a convenience store near your house?","","家の近くにコンビニはありますか。","答えは Yes, there is. / No, there isn't.。"],
 ["Your bag is under the desk.","","あなたのかばんは机の下にあります。","under=〜の下に。"],
 ["The cat is sleeping between the two chairs.","","ねこが2つのいすの間でねています。","between=(2つの)間に。"],
 ["There aren't any eggs in the fridge.","","冷蔵庫に卵が1つもありません。","not any=1つもない。fridge=冷蔵庫。"],
 ["The bank is next to the post office.","","銀行は郵便局のとなりにあります。","next to=〜のとなりに。"],
 ["My house is near the river.","","私の家は川の近くにあります。","near=〜の近くに。"],
 ["We waited for her in front of the station.","","私たちは駅の前で彼女を待ちました。","wait for 人=人を待つ。"]]);
XU('x-ek4j','英検4級 ステップ10','EIKEN 4 STEP 10','en',[
 ["I want to visit Hokkaido someday.","","いつか北海道に行ってみたいです。","want to 〜=〜したい。"],
 ["My dream is to be a pilot.","","私の夢はパイロットになることです。","to 〜=〜すること。is のあとに来て夢の中身を言います。"],
 ["I need something to drink.","","何か飲み物がほしいです。","something to drink=飲むための何か(飲み物)。"],
 ["I'm interested in making robots.","","私はロボット作りに興味があります。","be interested in=〜に興味がある。in のあとは〜ing。"],
 ["She likes to read books in bed.","","彼女はベッドで本を読むのが好きです。","like to 〜=〜するのが好き。"],
 ["It started to snow in the evening.","","夕方に雪が降り始めました。","start to 〜=〜し始める(start 〜ing でもOK)。"],
 ["Playing the guitar is fun.","","ギターをひくのは楽しいです。","〜ing(〜すること)が文の主語になっています。"],
 ["I called Mike to ask about the homework.","","宿題のことを聞くためにマイクに電話しました。","to 〜=〜するために(目的)。"]]);
XU('x-ek4k','英検4級 ステップ11','EIKEN 4 STEP 11','en',[
 ["My bike is newer than yours.","","私の自転車はあなたのより新しいです。","比較級+than=〜より…。"],
 ["Who is the youngest in your family?","","あなたの家族でいちばん若いのはだれですか。","the+〜est=いちばん〜。"],
 ["Baseball is more exciting than golf for me.","","私にとって、野球はゴルフよりわくわくします。","長い語は more で比較級。for me=私にとって。"],
 ["Soccer is the most popular sport in our school.","","サッカーは私たちの学校でいちばん人気のスポーツです。","長い語の最上級は the most。"],
 ["Please show me your notebook.","","あなたのノートを見せてください。","show 人 物=人に物を見せる。"],
 ["Can you tell me the way to the museum?","","博物館への道を教えてもらえますか。","tell 人 the way to 〜=人に〜への道を教える。"],
 ["My friend sent me a birthday card.","","友だちが誕生日カードを送ってくれました。","send の過去形は sent。"],
 ["I'll give you this pen.","","このペンをあなたにあげます。","give 人 物=人に物をあげる。"]]);
XU('x-ek4l','英検4級 ステップ12','EIKEN 4 STEP 12','en',[
 ["I like dogs, but my brother likes cats.","","私は犬が好きですが、弟はねこが好きです。","but=しかし。"],
 ["If you're tired, you can go home.","","疲れているなら、家に帰っていいですよ。","if=もし〜なら。"],
 ["Do you want tea or coffee?","","紅茶とコーヒー、どちらがいいですか。","or=または。"],
 ["I must go now.","","もう行かなくちゃ。","must=〜しなければならない。"],
 ["We have to wear uniforms at school.","","学校では制服を着なければなりません。","have to=〜しなければならない(must とほぼ同じ)。"],
 ["You should take an umbrella.","","かさを持っていったほうがいいですよ。","should=〜したほうがいい。"],
 ["Could you open the door for me?","","ドアを開けてもらえますか。","Could you 〜?=〜していただけますか(ていねいなお願い)。"],
 ["May I come in?","","入ってもいいですか。","May I 〜?=〜してもいいですか。"]]);
XU('x-ek4m','英検4級 ステップ13','EIKEN 4 STEP 13','en',[
 ["We stayed at a hotel near the beach.","","私たちは海の近くのホテルに泊まりました。","stay at 場所=〜に泊まる。"],
 ["I took a lot of pictures in Kyoto.","","京都でたくさん写真をとりました。","take pictures=写真をとる。take の過去形は took。"],
 ["My family went camping in the mountains.","","家族で山へキャンプに行きました。","go camping=キャンプに行く。"],
 ["The flight to Hawaii was seven hours long.","","ハワイへの飛行機は7時間でした。","flight=飛行機の便。"],
 ["I bought some souvenirs for my friends.","","友だちにおみやげを買いました。","souvenir=おみやげ。buy の過去形は bought。"],
 ["It was my first time riding a horse.","","馬に乗ったのは初めてでした。","my first time 〜ing=初めて〜すること。"],
 ["We visited many old temples.","","私たちはたくさんの古いお寺を訪れました。","visit=訪れる。"],
 ["I'm looking forward to the trip.","","旅行を楽しみにしています。","look forward to=〜を楽しみに待つ。"]]);
XU('x-ek4n','英検4級 ステップ14','EIKEN 4 STEP 14','en',[
 ["Thanks for your letter.","","お手紙ありがとう。","Thanks for 〜=〜をありがとう(Thank you for より気軽)。"],
 ["How are you doing?","","元気にしていますか。","メールの書き出しでよく使います。"],
 ["I'm writing to tell you about my new school.","","新しい学校のことを伝えたくて書いています。","メールの目的を言う書き方。"],
 ["Please write back soon.","","すぐにお返事ください。","write back=返事を書く。"],
 ["Tickets are 500 yen for children.","","チケットは子ども500円です。","お知らせ(掲示)の問題でよく出る形。"],
 ["Please come to the gym by 9:00 a.m.","","午前9時までに体育館に来てください。","by=〜までに(しめきり)。"],
 ["Don't forget to bring a towel.","","タオルを持ってくるのを忘れないでね。","forget to 〜=〜するのを忘れる。"],
 ["Say hello to your family.","","ご家族によろしく。","say hello to 人=人によろしく伝える。"]]);
XU('x-ek4o','英検4級 ステップ15','EIKEN 4 STEP 15','en',[
 ["Sounds good to me.","","いいね。","さそいや意見に賛成するときの返事。"],
 ["Sorry, I can't. I have a piano lesson.","","ごめん、行けないんだ。ピアノのレッスンがあるの。","断るときは理由もそえると感じがいいです。"],
 ["No problem.","","問題ないよ(いいよ)。","お礼やおわびへの返事にも使えます。"],
 ["Really? I didn't know that.","","本当?知らなかった。",""],
 ["Hurry up! We're late.","","急いで!遅れてるよ。","hurry up=急ぐ。"],
 ["What's the matter?","","どうしたの?","相手の様子が変なときにたずねることば。"],
 ["I have a headache.","","頭が痛いです。","headache=頭痛。stomachache(腹痛)も覚えよう。"],
 ["Take care.","","気をつけてね(お大事に)。","別れるときや、体調の悪い人へのことば。"]]);
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
/* ---- 英検3級: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ek3f','英検3級 ステップ6','EIKEN 3 STEP 6','en',[
 ["She went to Canada to study English.","","彼女は英語を勉強するためにカナダへ行きました。","to+動詞=〜するために(目的)。"],
 ["I was very sad to say goodbye to my friends.","","友だちにさよならを言うのはとても悲しかったです。","気持ち+to 〜=〜して(うれしい・悲しいなど)。気持ちの原因を表します。"],
 ["She got up early to catch the first train.","","彼女は始発電車に乗るために早起きしました。","catch=(電車などに)間に合って乗る。"],
 ["We were surprised to see so many people.","","とてもたくさんの人を見て、私たちはおどろきました。","be surprised to 〜=〜しておどろく。"],
 ["He saved money to buy a new bike.","","彼は新しい自転車を買うためにお金をためました。","save money=お金をためる。"],
 ["I'm happy to help you.","","あなたの手伝いができてうれしいです。",""],
 ["Why did you go to the store? To buy some milk.","","なぜ店に行ったのですか。牛乳を買うためです。","Why の質問には To 〜 だけで目的を答えられます。"],
 ["I have something to tell you.","","あなたに話したいことがあります。","something to 〜=〜するための何か。to 〜 が後ろから名詞を説明しています。"]]);
XU('x-ek3g','英検3級 ステップ7','EIKEN 3 STEP 7','en',[
 ["We enjoyed playing volleyball at the beach.","","私たちは浜辺でバレーボールをして楽しみました。","enjoy のあとは〜ing。to 〜 は使えません。"],
 ["It stopped raining in the afternoon.","","午後には雨がやみました。","stop 〜ing=〜するのをやめる。天気の文の主語は It。"],
 ["Have you finished writing the report?","","レポートは書き終わりましたか。","finish 〜ing=〜し終える。"],
 ["I decided to join the tennis club.","","テニス部に入ることにしました。","decide to 〜=〜することに決める。これから先のことなので to 〜。"],
 ["My sister hopes to study abroad someday.","","姉はいつか留学したいと思っています。","hope to 〜=〜したいと望む。study abroad=留学する。"],
 ["I'm good at drawing pictures.","","私は絵をかくのが得意です。","at のような前置詞のあとは〜ing(動名詞)。"],
 ["Remember to bring your lunch tomorrow.","","明日はお弁当を忘れずに持ってきてね。","remember to 〜=忘れずに〜する(これからすること)。"],
 ["I like listening to music before going to bed.","","寝る前に音楽を聞くのが好きです。","before のあとも〜ing。like は to 〜 でも〜ing でもOK。"]]);
XU('x-ek3h','英検3級 ステップ8','EIKEN 3 STEP 8','en',[
 ["My bag is as big as yours.","","私のかばんはあなたのと同じくらいの大きさです。","as 〜 as …=…と同じくらい〜。yours=あなたのもの。"],
 ["Tokyo Skytree is the tallest tower in Japan.","","東京スカイツリーは日本でいちばん高いタワーです。","最上級は the+〜est。範囲が場所なら in。"],
 ["He is one of the most famous singers in Japan.","","彼は日本で最も有名な歌手の一人です。","one of the+最上級+複数形=最も〜な…の一人。"],
 ["Which is more popular in your class, soccer or baseball?","","あなたのクラスでは、サッカーと野球のどちらが人気ですか。","Which is 比較級, A or B?=AとBではどちらがより〜ですか。"],
 ["Ken runs faster than any other student in his class.","","ケンはクラスのほかのどの生徒よりも速く走ります。","比較級+than any other+単数形=実質的に「いちばん」。"],
 ["This question is not as easy as it looks.","","この問題は見た目ほど簡単ではありません。","not as 〜 as …=…ほど〜ではない。"],
 ["Mt. Fuji is the highest mountain in Japan.","","富士山は日本でいちばん高い山です。","山の高さは high を使います(建物は tall も使う)。"],
 ["Please speak more slowly.","","もっとゆっくり話してください。","slowly のような長い副詞も more で比較級にします。"]]);
XU('x-ek3i','英検3級 ステップ9','EIKEN 3 STEP 9','en',[
 ["When I got home, my sister was cooking dinner.","","私が家に帰ったとき、姉は夕食を作っていました。","when=〜するとき。後半は過去進行形(〜していた)。"],
 ["If it is sunny tomorrow, let's go cycling.","","明日晴れたら、サイクリングに行こう。","if の中では、未来のことも現在形(is)で言います。"],
 ["I stayed home because I had a fever.","","熱があったので家にいました。","because=〜なので(理由)。"],
 ["I was tired, so I went to bed early.","","疲れていたので早く寝ました。","so=だから(結果)。because とは原因と結果の順番が逆です。"],
 ["I'm sure that you will pass the test.","","きっとあなたはテストに合格すると思います。","I'm sure that 〜=きっと〜だと思う。that は省略もできます。"],
 ["Though it was cold, we played outside.","","寒かったけれど、私たちは外で遊びました。","though=〜だけれども。"],
 ["Wash your hands before you eat.","","食べる前に手を洗いなさい。","before は後ろに主語+動詞を続けることもできます。"],
 ["I'll call you after I finish my homework.","","宿題が終わったら電話します。","after の中も、未来のことを現在形(finish)で言います。"]]);
XU('x-ek3j','英検3級 ステップ10','EIKEN 3 STEP 10','en',[
 ["You must not take pictures in this museum.","","この美術館では写真をとってはいけません。","must not=〜してはいけない(禁止)。"],
 ["You don't have to come early tomorrow.","","明日は早く来なくてもいいですよ。","don't have to=〜しなくてよい。must not(禁止)とは意味がちがいます。"],
 ["You should see a doctor.","","医者にみてもらったほうがいいですよ。","should=〜したほうがいい(アドバイス)。"],
 ["May I ask you a question?","","質問してもいいですか。","May I 〜?=〜してもいいですか(Can I 〜? よりていねい)。"],
 ["It may rain this evening.","","今晩は雨が降るかもしれません。","may=〜かもしれない(推量)。"],
 ["Will you pass me the salt, please?","","塩を取ってくれますか。","Will you 〜?=〜してくれますか(依頼)。"],
 ["Shall I help you with your bags?","","荷物を運ぶのを手伝いましょうか。","Shall I 〜?=(私が)〜しましょうか。help 人 with 物=人の物の手伝いをする。"],
 ["We had to wait for an hour.","","私たちは1時間待たなければなりませんでした。","must には過去形がないので had to を使います。"]]);
XU('x-ek3k','英検3級 ステップ11','EIKEN 3 STEP 11','en',[
 ["May I help you?","","いらっしゃいませ(何かお探しですか)。","店員が最初にかける決まり文句。"],
 ["I'm just looking, thank you.","","見ているだけです、ありがとう。","May I help you? への答え。"],
 ["Can I try this on?","","これを試着してもいいですか。","try on=試着する。it や this のような代名詞は try と on の間に入ります。"],
 ["Do you have this in a smaller size?","","これのもっと小さいサイズはありますか。",""],
 ["Can I pay by credit card?","","クレジットカードで払えますか。","pay by card / pay in cash=カードで/現金で払う。"],
 ["I'll take it.","","これにします(買います)。","買うと決めたときの決まり文句。"],
 ["What would you like to drink?","","お飲み物は何になさいますか。","would like=want のていねいな形。"],
 ["For here or to go?","","こちらでめしあがりますか、お持ち帰りですか。","ファストフード店の定番の質問(アメリカ英語)。"]]);
XU('x-ek3l','英検3級 ステップ12','EIKEN 3 STEP 12','en',[
 ["Excuse me, is there a post office near here?","","すみません、この近くに郵便局はありますか。","道をたずねるときは Excuse me から始めます。"],
 ["Go straight and turn left at the second corner.","","まっすぐ行って、2つ目の角を左に曲がってください。","turn left / right=左/右に曲がる。"],
 ["You'll see it on your right.","","右手に見えますよ。","on your right=あなたの右側に。"],
 ["It takes about ten minutes on foot.","","歩いて10分くらいかかります。","on foot=歩いて。by car / by bus と比べて覚えよう。"],
 ["Hello, this is Yuki. Is Emma at home?","","もしもし、ユキです。エマさんはいますか。","電話では I'm ではなく this is で名のります。"],
 ["Hold on, please.","","(電話を切らずに)少々お待ちください。",""],
 ["He's out right now. Can I take a message?","","彼は今出かけています。伝言をうかがいましょうか。","take a message=伝言を受ける。残す側は leave a message。"],
 ["I think you have the wrong number.","","番号をおまちがえだと思います。",""]]);
XU('x-ek3m','英検3級 ステップ13','EIKEN 3 STEP 13','en',[
 ["Our school trip is next month.","","修学旅行は来月です。","school trip=修学旅行や遠足。"],
 ["I belong to the brass band.","","私は吹奏楽部に入っています。","belong to=〜に所属している。状態を表すので進行形にはしません。"],
 ["The school festival will be held in October.","","文化祭は10月に開かれます。","be held=開かれる(hold の受け身)。"],
 ["We practice hard every day after school.","","私たちは毎日放課後に一生懸命練習しています。","after school=放課後。"],
 ["I'm going to take part in the speech contest.","","スピーチコンテストに参加するつもりです。","take part in=〜に参加する。"],
 ["My homeroom teacher is kind to everyone.","","担任の先生はみんなにやさしいです。","homeroom teacher=担任の先生。kind to 人=人にやさしい。"],
 ["I did volunteer work at a nursing home.","","老人ホームでボランティア活動をしました。","nursing home=老人ホーム。"],
 ["The entrance ceremony starts at nine.","","入学式は9時に始まります。","entrance=入学・入り口。ceremony=式。"]]);
XU('x-ek3n','英検3級 ステップ14','EIKEN 3 STEP 14','en',[
 ["I think it is better to live in the city.","","都会に住むほうがいいと思います。","英作文はまず I think 〜 で自分の意見をはっきり書きます。"],
 ["I like summer better than winter.","","冬より夏のほうが好きです。","2つを比べる質問には like A better than B で答えます。"],
 ["First, there are many shops and restaurants.","","第一に、店やレストランがたくさんあります。","First, Second で理由を2つ並べると読みやすくなります。"],
 ["Second, it is easy to go to other places by train.","","第二に、電車でほかの場所へ行きやすいです。",""],
 ["Also, I can enjoy swimming in the sea.","","また、海で泳ぐのを楽しめます。","Also=また(理由をつけ加える)。"],
 ["For these reasons, I want to live in the city.","","これらの理由から、私は都会に住みたいです。","最後に意見をもう一度書いてしめくくります。"],
 ["I went there with my family by car.","","家族と車でそこへ行きました。","Eメール問題では、相手の質問(だれと・どうやって)に1文ずつ答えます。"],
 ["I hope to hear from you soon.","","またお便りを待っています。","hear from 人=人から連絡がある。メールの結びの定番。"]]);
XU('x-ek3o','英検3級 ステップ15','EIKEN 3 STEP 15','en',[
 ["At first, I couldn't swim at all.","","最初は、全然泳げませんでした。","at first=最初は(あとで変化が起きる合図)。not 〜 at all=全然〜ない。"],
 ["A few days later, I got a letter from her.","","数日後、彼女から手紙が届きました。","a few=少しの(数えられる名詞に)。"],
 ["In the end, our team won the game.","","最後には、私たちのチームが試合に勝ちました。","in the end=結局、最後には。"],
 ["By the way, do you have any plans for tomorrow?","","ところで、明日は何か予定がありますか。","by the way=ところで(話題を変える合図)。"],
 ["One day, a strange man came to the village.","","ある日、ふしぎな男がその村にやってきました。","物語の書き出しの定番。"],
 ["Since then, she has practiced the piano every day.","","それ以来、彼女は毎日ピアノを練習しています。","since then=それ以来。現在完了と一緒に使います。"],
 ["Because of the snow, the train was late.","","雪のせいで電車が遅れました。","because of+名詞。because の後ろは主語+動詞なのでちがいに注意。"],
 ["Finally, she found her lost key under the sofa.","","ついに、彼女はなくしたかぎをソファの下で見つけました。","finally=ついに。lost=なくした(過去分詞が名詞を説明)。"]]);
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
/* ---- 英検準2級: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ekp2f','英検準2級 ステップ6','EIKEN PRE-2 STEP 6','en',[
 ["What I want now is a new laptop.","","今ほしいのは新しいノートパソコンです。","what=〜すること・もの。What I want が文の主語になっています。"],
 ["I have a friend whose father is a pilot.","","お父さんがパイロットの友だちがいます。","whose+名詞=その人の〜。持ち主を表す関係代名詞。"],
 ["That's the reason why I was late.","","それが私が遅れた理由です。","the reason why 〜=〜する理由。"],
 ["I still remember the day when we first met.","","初めて会った日を今でも覚えています。","the day when 〜=〜した日。時を表す関係副詞。"],
 ["This is not what I ordered.","","これは私が注文したものではありません。","レストランで料理がちがうときの定番。"],
 ["The man who I talked to at the station was very kind.","","駅で話しかけた男性はとても親切でした。","who(m) I talked to が The man を説明。to を忘れないこと。"],
 ["Kyoto, which has many old temples, attracts a lot of tourists.","","京都は古い寺がたくさんあり、多くの観光客をひきつけています。","コンマ+which=補足説明(非制限用法)。attract=ひきつける。"],
 ["You can do whatever you like.","","好きなことを何でもしていいですよ。","whatever=〜するものは何でも。"]]);
XU('x-ekp2g','英検準2級 ステップ7','EIKEN PRE-2 STEP 7','en',[
 ["If I were you, I would apologize to her.","","私があなたなら、彼女にあやまるよ。","仮定法過去は主語が I でも were を使うのが基本。アドバイスの定番。"],
 ["If I had a car, I could drive to the beach.","","車があれば、海まで運転して行けるのに。","現在の事実と反対のことは過去形で言います(仮定法過去)。"],
 ["I wish I had a little more time.","","もう少し時間があればいいのに。","I wish+過去形=(今)〜ならいいのに。"],
 ["He talks as if he knew everything.","","彼は何でも知っているかのように話します。","as if+過去形=まるで〜かのように。"],
 ["If I had studied harder, I would have passed the exam.","","もっと一生懸命勉強していたら、試験に合格していただろう。","過去の事実と反対=if+had+過去分詞, would have+過去分詞(仮定法過去完了)。"],
 ["What would you do if you won the lottery?","","宝くじが当たったらどうしますか。","ありえないことを想像する質問。面接の雑談にも出てきます。"],
 ["I would be happy if you could join us.","","参加していただけたらうれしいです。","仮定法を使うと、ていねいなお願いになります。"],
 ["If only I could fly like a bird!","","鳥のように飛べたらなあ。","If only 〜!=〜でありさえすればなあ(I wish より強い気持ち)。"]]);
XU('x-ekp2h','英検準2級 ステップ8','EIKEN PRE-2 STEP 8','en',[
 ["My sister let me use her camera.","","姉がカメラを使わせてくれました。","let+人+動詞の原形=(望みどおり)〜させてあげる。"],
 ["The teacher made us rewrite the essay.","","先生は私たちに作文を書き直させました。","make+人+動詞の原形=(むりやり)〜させる。"],
 ["I had my hair cut yesterday.","","昨日髪を切ってもらいました。","have+物+過去分詞=物を〜してもらう。自分で切ったのではありません。"],
 ["I'll have the shop deliver the sofa.","","お店にソファを配達してもらいます。","have+人+動詞の原形=人に〜してもらう(仕事として頼む)。"],
 ["I saw a cat crossing the street.","","ねこが道をわたっているのが見えました。","see+物+〜ing=〜しているところを見る。"],
 ["I heard someone call my name.","","だれかが私の名前を呼ぶのが聞こえました。","hear+人+動詞の原形=〜するのが聞こえる(最初から最後まで)。"],
 ["I need to get my bike repaired.","","自転車を修理してもらう必要があります。","get+物+過去分詞=have とほぼ同じ意味で、会話でよく使います。"],
 ["Could you help me move this desk?","","この机を動かすのを手伝ってもらえますか。","help+人+動詞の原形=人が〜するのを手伝う。"]]);
XU('x-ekp2i','英検準2級 ステップ9','EIKEN PRE-2 STEP 9','en',[
 ["When we arrived, the bus had already left.","","私たちが着いたとき、バスはもう出発していました。","過去のある時点より前のこと=had+過去分詞(過去完了)。"],
 ["The elevator is being repaired now.","","エレベーターは今修理中です。","is being+過去分詞=〜されているところ(進行形の受け身)。"],
 ["Next year, I will have lived here for ten years.","","来年で、ここに住んで10年になります。","will have+過去分詞=(未来のある時点までに)〜したことになる。"],
 ["The new library has just been completed.","","新しい図書館がちょうど完成したところです。","has been+過去分詞=現在完了の受け身。"],
 ["This bridge is said to be the oldest in Japan.","","この橋は日本で最も古いと言われています。","be said to 〜=〜だと言われている。説明文によく出ます。"],
 ["I had never seen snow until I moved to Hokkaido.","","北海道に引っ越すまで雪を見たことがありませんでした。","過去完了の経験用法。until=〜するまで。"],
 ["The meeting will be held online.","","会議はオンラインで開かれます。","will be+過去分詞=未来の受け身。"],
 ["My bag was stolen while I was sleeping on the train.","","電車で寝ている間にかばんをぬすまれました。","be stolen=ぬすまれる。英語では「物」が主語になります。"]]);
XU('x-ekp2j','英検準2級 ステップ10','EIKEN PRE-2 STEP 10','en',[
 ["Could you look after my dog while I'm away?","","留守の間、犬の世話をしてもらえますか。","look after=〜の世話をする(take care of とほぼ同じ)。"],
 ["We had to put off the game because of the rain.","","雨のせいで試合を延期しなければなりませんでした。","put off=延期する(postpone と同じ意味)。"],
 ["She came up with a great idea.","","彼女はすばらしいアイデアを思いつきました。","come up with=〜を思いつく。"],
 ["Don't give up until the end.","","最後まであきらめないで。","give up=あきらめる。"],
 ["We ran out of milk, so I went to the store.","","牛乳を切らしたので、店に行きました。","run out of=〜を使い果たす・切らす。"],
 ["I get along well with my classmates.","","クラスメートと仲よくやっています。","get along with=〜と仲よくやる。"],
 ["Make sure you lock the door.","","必ずドアのかぎをかけてね。","make sure (that) 〜=必ず〜するようにする・確かめる。"],
 ["Please fill out this form.","","この用紙に記入してください。","fill out=(用紙に)記入する。空港や病院でよく使います。"]]);
XU('x-ekp2k','英検準2級 ステップ11','EIKEN PRE-2 STEP 11','en',[
 ["He practiced every day in order to win the contest.","","彼はコンテストで優勝するために毎日練習しました。","in order to 〜=〜するために(to 〜 よりかたく、目的をはっきり示す)。"],
 ["Please call me as soon as you arrive.","","着いたらすぐに電話してください。","as soon as=〜するとすぐに。中は未来でも現在形。"],
 ["Let's walk instead of taking a taxi.","","タクシーに乗るかわりに歩こう。","instead of 〜ing=〜するかわりに。"],
 ["By the time we got there, the store was closed.","","私たちが着いたころには、店は閉まっていました。","by the time=〜するまでに(は)。"],
 ["You can stay here as long as you like.","","好きなだけここにいていいですよ。","as long as=〜する限り・〜するあいだは。"],
 ["According to the weather report, it will snow tomorrow.","","天気予報によると、明日は雪が降るそうです。","according to=〜によると(情報のもと)。"],
 ["Thanks to your help, I finished the work on time.","","あなたが手伝ってくれたおかげで、時間どおりに仕事が終わりました。","thanks to=〜のおかげで。on time=時間どおりに。"],
 ["Even if it rains, the event will take place.","","たとえ雨が降っても、イベントは行われます。","even if=たとえ〜でも(まだ起きていないこと)。実際に起きたことには even though を使います。take place=行われる。"]]);
XU('x-ekp2l','英検準2級 ステップ12','EIKEN PRE-2 STEP 12','en',[
 ["The number of elderly people is increasing in Japan.","","日本では高齢者の数が増えています。","the number of 〜=〜の数(単数あつかいなので is)。"],
 ["Many people bring their own bags when they go shopping.","","買い物に行くとき、自分のバッグを持っていく人が多いです。","bring one's own 〜=自分の〜を持っていく。環境の話題で使えます。"],
 ["Smartphones make it easy to keep in touch with friends.","","スマートフォンのおかげで、友だちと連絡を取り合いやすくなっています。","keep in touch with=〜と連絡を取り合う。make it easy to 〜=〜しやすくする。"],
 ["Many young people are moving from rural areas to big cities.","","多くの若者が地方から大都市へ移り住んでいます。","rural areas=地方・田舎。社会問題の英作文でよく使います。"],
 ["Some tourist spots are too crowded with visitors.","","観光客で混雑しすぎている観光地もあります。","be crowded with=〜で混雑している。観光公害の話題で使えます。"],
 ["It is important to eat a balanced diet.","","栄養のバランスがよい食事をとることが大切です。","balanced diet=バランスのよい食事。It is important to 〜 は英作文で便利な形。"],
 ["Many families are putting solar panels on their roofs.","","屋根に太陽光パネルをつける家庭が増えています。","solar panel=太陽光パネル。進行形で「増えている」という変化を表せます。"],
 ["Reading books helps children learn new words.","","本を読むことは、子どもが新しい言葉を覚える助けになります。","help+人+動詞の原形=人が〜するのを助ける。Reading books(〜すること)が主語。"]]);
XU('x-ekp2m','英検準2級 ステップ13','EIKEN PRE-2 STEP 13','en',[
 ["Would you mind closing the door?","","ドアを閉めていただけますか。","Would you mind 〜ing?=〜していただけませんか(ていねいな依頼)。"],
 ["Not at all.","","いいですよ(全然かまいません)。","mind=いやがる、なので OK のときは No や Not at all で答えます。"],
 ["I'd rather stay home today.","","今日はどちらかというと家にいたいです。","would rather 〜=むしろ〜したい。"],
 ["It's up to you.","","あなたしだいです(あなたが決めて)。","be up to 人=人しだい。"],
 ["I'm not sure, but I think it's on Friday.","","はっきりわかりませんが、金曜日だと思います。","自信がないときは I'm not sure, but 〜 とクッションを入れます。"],
 ["Can I get back to you later?","","あとで折り返し連絡してもいいですか。","get back to 人=人に(あとで)返事をする。"],
 ["You look pale. Are you all right?","","顔色が悪いよ。大丈夫?","look+形容詞=〜に見える。pale=青白い。"],
 ["That's too bad. I hope you feel better soon.","","それは大変ですね。早くよくなるといいですね。","体調が悪い人へのことば。"]]);
XU('x-ekp2n','英検準2級 ステップ14','EIKEN PRE-2 STEP 14','en',[
 ["In my opinion, students should join club activities.","","私の意見では、生徒は部活動に参加するべきです。","In my opinion,=I think より少しかたい意見の出し方。"],
 ["This is because they can learn many things from it.","","なぜなら、そこから多くのことを学べるからです。","This is because 〜 で前の文の理由を説明します。"],
 ["In addition, it is a good chance to meet new people.","","さらに、新しい人と出会うよい機会になります。","In addition=さらに。2つ目の理由の書き出し。"],
 ["It is true that it takes time, but it is worth it.","","たしかに時間はかかりますが、それだけの価値があります。","It is true that 〜, but …=反対意見を認めてから自分の意見に戻す形。"],
 ["Therefore, I think schools should introduce this system.","","したがって、学校はこの制度を導入するべきだと思います。","Therefore=したがって。introduce=導入する。結論の書き出し。"],
 ["Many people agree that reading is important.","","多くの人が、読書は大切だということに賛成しています。","agree that 〜=〜ということに賛成する。"],
 ["As a result, they can save time and money.","","その結果、時間とお金を節約できます。","As a result=その結果。"],
 ["Some people may say that it is too expensive.","","高すぎると言う人もいるかもしれません。","反対の立場を一度示すと、説得力のある文章になります。"]]);
XU('x-ekp2o','英検準2級 ステップ15','EIKEN PRE-2 STEP 15','en',[
 ["Although the test was difficult, most students passed it.","","テストは難しかったけれど、ほとんどの生徒が合格しました。","although=〜だけれども(though よりかたい)。"],
 ["In fact, more than half of the students walk to school.","","実際、生徒の半分以上が歩いて通学しています。","in fact=実際は(前の内容を強めたり、データを示したりする)。"],
 ["Unless you hurry, you'll miss the bus.","","急がないとバスに乗り遅れますよ。","unless=〜しない限り(if 〜 not とほぼ同じ)。"],
 ["While some people like cities, others prefer the countryside.","","都会が好きな人もいれば、田舎のほうが好きな人もいます。","while=〜する一方で(対比)。some 〜, others …=〜な人もいれば…な人もいる。"],
 ["She enjoys sports such as soccer and basketball.","","彼女はサッカーやバスケットボールなどのスポーツを楽しみます。","such as=たとえば〜のような(例をあげる)。"],
 ["The survey shows that about 60 percent of students have a smartphone.","","その調査では、生徒の約60%がスマートフォンを持っていることがわかっています。","survey=調査。長文で数字やデータを示す言い方。"],
 ["Instead, he decided to study abroad.","","そのかわりに、彼は留学することにしました。","文頭の Instead=そのかわりに(前とちがう行動の合図)。"],
 ["Because of this, the town became famous all over the world.","","このため、その町は世界中で有名になりました。","Because of this=このため(前の内容が原因)。"]]);
/* ---- 英検準2級プラス (between 準2級 and 2級): ステップ1〜5 ---- */
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
/* ---- 英検準2級プラス: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ekp2pf','英検準2級プラス ステップ6','EIKEN PRE-2 PLUS STEP 6','en',[
 ["The boy standing by the gate is my cousin.","","門のそばに立っている男の子は私のいとこです。","〜ing が後ろから名詞を説明(〜している…)。"],
 ["This is a bridge built more than a hundred years ago.","","これは100年以上前に建てられた橋です。","過去分詞が後ろから名詞を説明(〜された…)。"],
 ["Walking along the beach, I found a beautiful shell.","","浜辺を歩いていると、きれいな貝を見つけました。","分詞構文=When I was walking 〜 を短くした形。"],
 ["Seen from the sky, the island looks like a heart.","","空から見ると、その島はハートの形に見えます。","受け身の分詞構文(過去分詞で始まる)。"],
 ["Feeling nervous, he took a deep breath.","","緊張していたので、彼は深呼吸をしました。","分詞構文は理由(〜なので)も表せます。take a deep breath=深呼吸する。"],
 ["The news was surprising to everyone.","","その知らせはみんなにとっておどろくべきものでした。","人をおどろかせる物=surprising、おどろいた人=surprised。"],
 ["I was excited to hear the result.","","結果を聞いてわくわくしました。","感情の形容詞は、人が主語なら -ed の形。"],
 ["There is a lot of work left to do.","","やるべき仕事がたくさん残っています。","left=残された(leave の過去分詞)。"]]);
XU('x-ekp2pg','英検準2級プラス ステップ7','EIKEN PRE-2 PLUS STEP 7','en',[
 ["This is the town where my grandfather grew up.","","ここは祖父が育った町です。","where=場所を説明する関係副詞。"],
 ["The hotel at which we stayed had a great view.","","私たちが泊まったホテルはながめがすばらしかったです。","前置詞+which=かたい書き方。which we stayed at と同じ意味。"],
 ["She is the only student that solved the problem.","","その問題を解いたのは彼女だけです。","the only 〜 のあとは that がよく使われます。"],
 ["I lost the watch, which made me very sad.","","時計をなくして、とても悲しくなりました。","コンマ+which が前の文全体を受けることもあります。"],
 ["Everything that he said turned out to be true.","","彼が言ったことはすべて本当だとわかりました。","turn out to be=〜だとわかる。"],
 ["The day will come when everyone can travel to space.","","だれもが宇宙旅行できる日が来るでしょう。","when 〜 が離れた the day を説明しています。"],
 ["That is how I learned to speak English.","","そうやって私は英語を話せるようになりました。","how=〜する方法・やり方(the way と同じ)。"],
 ["People who exercise regularly tend to sleep better.","","定期的に運動する人は、よくねむれる傾向があります。","tend to 〜=〜する傾向がある。"]]);
XU('x-ekp2ph','英検準2級プラス ステップ8','EIKEN PRE-2 PLUS STEP 8','en',[
 ["It was in Kyoto that I first met her.","","私が彼女に初めて会ったのは京都でした。","It is 〜 that …=…なのは〜だ(強調)。"],
 ["The museum is popular not only with children but also with adults.","","その博物館は子どもだけでなく大人にも人気です。","not only A but also B=AだけでなくBも。A と B は同じ形(with 〜)にそろえます。"],
 ["Both my parents and my sister love cooking.","","両親も姉も料理が大好きです。","both A and B=AもBも(複数あつかい)。"],
 ["Either you or he has to clean the room.","","あなたか彼のどちらかが部屋をそうじしなければなりません。","either A or B は、動詞を B に合わせます。"],
 ["Neither of the answers was correct.","","どちらの答えも正しくありませんでした。","neither=どちらも〜ない。"],
 ["I didn't go out at all last weekend.","","先週末は全く外出しませんでした。","not 〜 at all=全く〜ない。"],
 ["It was so cold that the lake froze.","","とても寒かったので、湖がこおりました。","so 〜 that …=とても〜なので…。"],
 ["The box was too heavy for me to carry.","","その箱は重すぎて私には運べませんでした。","too 〜 for 人 to …=〜すぎて人には…できない。"]]);
XU('x-ekp2pi','英検準2級プラス ステップ9','EIKEN PRE-2 PLUS STEP 9','en',[
 ["My doctor advised me to get more sleep.","","医者は私にもっと睡眠をとるように助言しました。","advise 人 to 〜=人に〜するよう助言する。"],
 ["The heavy rain prevented us from going out.","","大雨のせいで私たちは外出できませんでした。","prevent 人 from 〜ing=人が〜するのをさまたげる。"],
 ["This song reminds me of my school days.","","この歌を聞くと学生時代を思い出します。","remind 人 of 〜=人に〜を思い出させる。"],
 ["The app allows users to share photos easily.","","そのアプリでは、ユーザーが写真を簡単に共有できます。","allow 人 to 〜=人が〜できるようにする。"],
 ["The teacher encouraged us to try new things.","","先生は私たちに新しいことに挑戦するようはげましてくれました。","encourage 人 to 〜=人に〜するようはげます。"],
 ["Could you explain the rules to me?","","ルールを私に説明してもらえますか。","explain 物 to 人。explain me 〜 とは言いません。"],
 ["I'm getting used to living alone.","","一人暮らしに慣れてきました。","get used to 〜ing=〜することに慣れる(変化)。be used to は「慣れている」状態。"],
 ["She spent the whole day cleaning her room.","","彼女は一日中部屋のそうじをして過ごしました。","spend 時間 〜ing=〜して時間を過ごす。"]]);
XU('x-ekp2pj','英検準2級プラス ステップ10','EIKEN PRE-2 PLUS STEP 10','en',[
 ["The concert was called off because of the storm.","","あらしのためコンサートは中止になりました。","call off=中止する(cancel と同じ)。"],
 ["Could you drop me off at the next corner?","","次の角で降ろしてもらえますか。","drop 人 off=人を車から降ろす。pick up(車でむかえに行く)の反対。"],
 ["Please hand in your report by Friday.","","金曜日までにレポートを提出してください。","hand in=提出する。"],
 ["We have to deal with this problem right away.","","すぐにこの問題に対処しなければなりません。","deal with=〜に対処する・あつかう。"],
 ["He finally caught up with the other runners.","","彼はついにほかのランナーに追いつきました。","catch up with=〜に追いつく。"],
 ["I'm looking for a part-time job that suits me.","","自分に合うアルバイトを探しています。","suit=〜に合う。"],
 ["She takes after her mother.","","彼女はお母さんに似ています。","take after=(親など)に似ている。"],
 ["Don't hesitate to ask for help.","","遠慮しないで助けを求めてください。","hesitate to 〜=〜するのをためらう。ask for=求める。"]]);
XU('x-ekp2pk','英検準2級プラス ステップ11','EIKEN PRE-2 PLUS STEP 11','en',[
 ["Every family should keep an emergency kit at home.","","どの家庭も家に防災セットを置いておくべきです。","emergency kit=非常用持ち出し袋。"],
 ["The town holds an evacuation drill every September.","","町では毎年9月に避難訓練を行っています。","evacuation drill=避難訓練。"],
 ["Many shopping streets in small towns are losing customers.","","小さな町の商店街の多くは客が減っています。","lose customers=客を失う。"],
 ["Some young people are moving back to their hometowns.","","地元にもどる若者もいます。","move back to=〜にもどって住む。"],
 ["Local festivals help keep traditions alive.","","地域のお祭りは伝統を守る助けになります。","keep 〜 alive=〜を絶やさない。"],
 ["Volunteers helped clean up the town after the flood.","","洪水のあと、ボランティアが町の片づけを手伝いました。","clean up=きれいに片づける。flood=洪水。"],
 ["More signs are written in several languages for tourists.","","観光客のために、いくつかの言語で書かれた案内板が増えています。","written in 〜=〜語で書かれた。"],
 ["Public transportation is limited in rural areas.","","地方では公共交通機関が限られています。","limited=限られた・少ない。"]]);
XU('x-ekp2pl','英検準2級プラス ステップ12','EIKEN PRE-2 PLUS STEP 12','en',[
 ["Skipping breakfast can make it hard to concentrate.","","朝食をぬくと集中しにくくなることがあります。","skip=ぬかす。concentrate=集中する。"],
 ["Many people check their health using smartwatches.","","スマートウォッチで健康をチェックする人がたくさんいます。","using 〜=〜を使って(分詞)。"],
 ["Getting enough sleep is just as important as eating well.","","十分な睡眠は、よい食事と同じくらい大切です。","just as 〜 as=ちょうど同じくらい〜。"],
 ["Sports can teach children the value of teamwork.","","スポーツは子どもにチームワークの大切さを教えてくれます。","teach 人 物=人に物を教える。value=価値。"],
 ["The number of vegetarian restaurants is growing.","","ベジタリアン向けのレストランが増えています。","the number of 〜 is growing=〜の数が増えている。"],
 ["Some schools serve lunches made with local vegetables.","","地元の野菜で作った給食を出す学校もあります。","made with 〜=〜で作られた。"],
 ["Watching sports on TV is not the same as playing them.","","テレビでスポーツを見るのは、自分でするのとはちがいます。","the same as=〜と同じ。"],
 ["Too much sugar is bad for your teeth.","","砂糖のとりすぎは歯に悪いです。","be bad for=〜に悪い。"]]);
XU('x-ekp2pm','英検準2級プラス ステップ13','EIKEN PRE-2 PLUS STEP 13','en',[
 ["There are two reasons why I think so.","","そう考える理由は2つあります。","理由の数を先に書くと、読む人に伝わりやすくなります。"],
 ["First of all, it saves a lot of time.","","まず第一に、多くの時間を節約できます。","First of all=まず第一に。"],
 ["Another reason is that it is good for the environment.","","もう一つの理由は、環境によいということです。","2つ目の理由の定番の書き出し。"],
 ["For example, people can walk instead of driving.","","たとえば、車に乗るかわりに歩くことができます。","For example で具体例を入れると説得力が上がります。"],
 ["On the other hand, some people may find it difficult.","","一方で、それを難しいと感じる人もいるかもしれません。","On the other hand=一方で。"],
 ["Because of these two points, I think the idea is useful.","","この2点から、その考えは役に立つと思います。","Because of these two points=この2点から(結論の前に使えます)。"],
 ["I'm happy to answer your questions.","","喜んでご質問にお答えします。","Eメールの返信で使える前向きな一文。"],
 ["I hope this information is helpful.","","この情報がお役に立てばうれしいです。","メールの結び近くでよく使います。"]]);
XU('x-ekp2pn','英検準2級プラス ステップ14','EIKEN PRE-2 PLUS STEP 14','en',[
 ["The purpose of this article is to explain how bees make honey.","","この記事の目的は、ハチがはちみつを作る仕組みを説明することです。","purpose=目的。最初の段落で目的が示されることが多いです。"],
 ["The writer suggests that schools should start later.","","筆者は学校の始業を遅らせるべきだと提案しています。","筆者の主張は suggest / argue / believe などで示されます。"],
 ["This is one of the reasons why the plan failed.","","これがその計画が失敗した理由の一つです。","one of the reasons why 〜=〜の理由の一つ。"],
 ["At the same time, the price of food went up.","","同時に、食べ物の値段が上がりました。","at the same time=同時に・それと同時に。"],
 ["However, not everyone was happy with the change.","","しかし、みんながその変化に満足したわけではありません。","not everyone=全員が〜というわけではない(部分否定)。"],
 ["On the contrary, sales went down.","","それどころか、売り上げは下がりました。","on the contrary=それどころか(予想と反対)。"],
 ["For this reason, the company changed its plan.","","この理由で、その会社は計画を変更しました。","for this reason=このため。"],
 ["In the end, the town decided to build a new park.","","最終的に、町は新しい公園をつくることに決めました。","物語や説明文の結末を示す語。"]]);
XU('x-ekp2po','英検準2級プラス ステップ15','EIKEN PRE-2 PLUS STEP 15','en',[
 ["I'm afraid that's not possible.","","残念ながら、それはできません。","I'm afraid=残念ながら(ていねいに断る)。"],
 ["Do you happen to have a pen I could borrow?","","もしかして、借りられるペンを持ってない?","happen to 〜=たまたま〜する。たずね方がやわらかくなります。"],
 ["I didn't mean to hurt your feelings.","","あなたの気持ちを傷つけるつもりはありませんでした。","mean to 〜=〜するつもりである。"],
 ["Let's take turns using the computer.","","交代でパソコンを使おう。","take turns 〜ing=交代で〜する。"],
 ["Can you give me a hand with this box?","","この箱を運ぶのを手伝ってくれる?","give 人 a hand=人を手伝う。"],
 ["I'll think about it and let you know.","","考えてから知らせるね。","すぐに決められないときの返事。"],
 ["Why don't you ask the teacher?","","先生に聞いてみたら?","Why don't you 〜?=〜したらどう?(提案)。"],
 ["That's a relief.","","それはよかった(ほっとした)。","relief=安心。"]]);
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
/* ---- 英検2級: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ek2f','英検2級 ステップ6','EIKEN 2 STEP 6','en',[
 ["Without your advice, I would have made a big mistake.","","あなたの助言がなければ、大きな失敗をしていたでしょう。","without 〜=〜がなければ(if 節のかわり)。"],
 ["If it were not for the internet, our lives would be very different.","","インターネットがなければ、私たちの生活はずいぶんちがうでしょう。","If it were not for 〜=(今)〜がなければ。"],
 ["I wish I had listened to my parents.","","両親の言うことを聞いていればよかった。","I wish+had+過去分詞=(過去に)〜していればよかった。"],
 ["It's time we started thinking about our future.","","そろそろ将来について考え始める時期です。","It's time+過去形=もう〜してもいいころだ。"],
 ["If I had taken that flight, I would be in Paris now.","","あの便に乗っていたら、今ごろパリにいるだろう。","過去の仮定(had taken)と今の結果(would be)の組み合わせ。"],
 ["Should you have any questions, please contact us.","","ご質問がありましたら、ご連絡ください。","Should you 〜=If you should 〜 の倒置。ビジネスメールの定番。"],
 ["He acted as though nothing had happened.","","彼は何事もなかったかのようにふるまいました。","as though+had+過去分詞=まるで(以前に)〜したかのように。"],
 ["Suppose you could live anywhere, where would you live?","","どこにでも住めるとしたら、どこに住みますか。","Suppose 〜=もし〜としたら。面接の質問にも出る形。"]]);
XU('x-ek2g','英検2級 ステップ7','EIKEN 2 STEP 7','en',[
 ["Generally speaking, Japanese trains are very punctual.","","一般的に言って、日本の電車はとても時間に正確です。","generally speaking=一般的に言えば。punctual=時間に正確な。"],
 ["Judging from his accent, he must be from Australia.","","なまりから判断すると、彼はオーストラリア出身にちがいありません。","judging from 〜=〜から判断すると。"],
 ["Having lived in Canada, she speaks English fluently.","","カナダに住んでいたので、彼女は英語を流ちょうに話します。","Having+過去分詞=(前に)〜したので。"],
 ["Compared with last year, sales have improved.","","昨年と比べると、売り上げは改善しています。","compared with 〜=〜と比べると。"],
 ["The weather permitting, we will go hiking tomorrow.","","天気がよければ、明日ハイキングに行きます。","主語が別の分詞構文(独立分詞構文)。weather permitting は定番。"],
 ["Not knowing what to say, I just smiled.","","何と言えばいいかわからず、ただほほえみました。","分詞構文の否定は not を前に置きます。"],
 ["She sat on the bench with her eyes closed.","","彼女は目を閉じてベンチにすわっていました。","with+名詞+分詞=〜を…した状態で。"],
 ["Considering his age, he did a great job.","","年齢を考えれば、彼はすばらしい仕事をしました。","considering 〜=〜を考えれば。"]]);
XU('x-ek2h','英検2級 ステップ8','EIKEN 2 STEP 8','en',[
 ["He is what is called a walking dictionary.","","彼はいわゆる生き字引です。","what is called=いわゆる。"],
 ["Whoever comes first will get a free ticket.","","最初に来た人はだれでも無料チケットをもらえます。","whoever=〜する人はだれでも。"],
 ["The way in which people shop has changed.","","人々の買い物のしかたは変わりました。","the way in which=〜する方法(かたい書き方)。"],
 ["Whether we win or lose doesn't matter.","","勝つか負けるかは重要ではありません。","Whether 〜 or …=〜か…か(名詞節)。matter=重要である。"],
 ["The fact that she won surprised everyone.","","彼女が勝ったという事実はみんなをおどろかせました。","the fact that 〜=〜という事実(同格の that)。"],
 ["It is said that the castle was built in the 16th century.","","その城は16世紀に建てられたと言われています。","It is said that 〜=〜だと言われている。"],
 ["I have no idea what he is talking about.","","彼が何の話をしているのか全くわかりません。","have no idea=全くわからない。"],
 ["Whatever happens, I will support you.","","何が起きても、私はあなたを支えます。","whatever=何が〜しても。"]]);
XU('x-ek2i','英検2級 ステップ9','EIKEN 2 STEP 9','en',[
 ["She is no longer a beginner.","","彼女はもはや初心者ではありません。","no longer=もはや〜ない。"],
 ["The older we get, the wiser we become.","","年をとるほど、人はかしこくなります。","the+比較級 〜, the+比較級 …=〜すればするほど…。"],
 ["Please reply as soon as possible.","","できるだけ早く返信してください。","as 〜 as possible=できるだけ〜。"],
 ["He is not so much a teacher as a friend to us.","","彼は私たちにとって、先生というより友だちです。","not so much A as B=AというよりむしろB。"],
 ["Nothing is more important than health.","","健康より大切なものはありません。","Nothing is 比較級 than 〜=〜ほど…なものはない(実質的な最上級)。"],
 ["This year's sales were twice as high as last year's.","","今年の売り上げは昨年の2倍でした。","twice as 〜 as=〜の2倍。"],
 ["I would rather walk than take a crowded bus.","","混んだバスに乗るより歩くほうがいいです。","would rather A than B=BよりむしろAしたい。"],
 ["The new model is far better than the old one.","","新しいモデルは古いものよりはるかによいです。","far / much+比較級=はるかに〜(very は使えません)。"]]);
XU('x-ek2j','英検2級 ステップ10','EIKEN 2 STEP 10','en',[
 ["The new manager will take over the project next month.","","来月から新しいマネージャーがそのプロジェクトを引きつぎます。","take over=引きつぐ。"],
 ["The scientists carried out an experiment.","","科学者たちは実験を行いました。","carry out=実行する。"],
 ["I worked overtime to make up for the lost time.","","失った時間を取りもどすために残業しました。","make up for=〜をうめ合わせる。"],
 ["The police are looking into the accident.","","警察がその事故を調べています。","look into=調査する。police は複数あつかい。"],
 ["We need to figure out a better solution.","","もっとよい解決策を見つけ出す必要があります。","figure out=(考えて)見つけ出す・理解する。"],
 ["Prices have gone up sharply this year.","","今年は物価が急に上がっています。","go up=上がる。sharply=急に。"],
 ["She turned down the job offer.","","彼女はその仕事の申し出を断りました。","turn down=断る。"],
 ["The plan fell through at the last minute.","","その計画は土壇場でだめになりました。","fall through=(計画が)だめになる。at the last minute=ぎりぎりで。"]]);
XU('x-ek2k','英検2級 ステップ11','EIKEN 2 STEP 11','en',[
 ["In spite of the rain, many people came to the event.","","雨にもかかわらず、多くの人がイベントに来ました。","in spite of+名詞=〜にもかかわらず(despite と同じ)。"],
 ["I'm writing on behalf of my class.","","クラスを代表して書いています。","on behalf of=〜を代表して。"],
 ["In terms of price, this phone is the best choice.","","値段の点では、このスマホがいちばんよい選択です。","in terms of=〜の点で。"],
 ["Anyone can join, regardless of age.","","年齢に関係なくだれでも参加できます。","regardless of=〜に関係なく。"],
 ["As for me, I prefer staying at home.","","私としては、家にいるほうがいいです。","as for=〜について言えば。"],
 ["Due to heavy snow, the flight was canceled.","","大雪のため、その便は欠航になりました。","due to=〜のために(原因)。"],
 ["In addition to English, she speaks Chinese.","","英語に加えて、彼女は中国語も話します。","in addition to=〜に加えて。"],
 ["The shop is open every day except for Monday.","","その店は月曜日をのぞいて毎日開いています。","except for=〜をのぞいて。"]]);
XU('x-ek2l','英検2級 ステップ12','EIKEN 2 STEP 12','en',[
 ["Hospitals in some areas are short of doctors.","","医者が不足している地域の病院もあります。","be short of=〜が不足している。"],
 ["Online medical checkups are becoming more common.","","オンライン診療がより一般的になっています。","checkup=健康診断・診察。"],
 ["Caring for elderly parents can be a heavy burden.","","高齢の親の介護は大きな負担になることがあります。","care for=〜の世話をする。burden=負担。"],
 ["Some people think homework should be banned in elementary schools.","","小学校では宿題を禁止すべきだと考える人もいます。","ban=禁止する。英作文でよく出るテーマ。"],
 ["Students today need skills to use technology wisely.","","今の学生には、技術をかしこく使う力が必要です。","skills to 〜=〜する技能。"],
 ["Learning a foreign language opens up many opportunities.","","外国語を学ぶと、多くの機会が開けます。","open up=(可能性などを)広げる。"],
 ["Many children feel pressure to get good grades.","","よい成績をとらなければというプレッシャーを感じる子どもが多くいます。","pressure to 〜=〜しなければという重圧。"],
 ["Mental health is just as important as physical health.","","心の健康は体の健康と同じくらい大切です。","mental=精神の、physical=身体の。"]]);
XU('x-ek2m','英検2級 ステップ13','EIKEN 2 STEP 13','en',[
 ["Self-driving cars may reduce traffic accidents.","","自動運転車は交通事故を減らすかもしれません。","self-driving=自動運転の。"],
 ["Drones are being used to deliver packages.","","荷物を届けるのにドローンが使われています。","進行形の受け身(are being used)。"],
 ["Scientists are developing new ways to store energy.","","科学者たちはエネルギーをためる新しい方法を開発しています。","store=たくわえる。"],
 ["Space travel may become possible for ordinary people.","","宇宙旅行が一般の人にも可能になるかもしれません。","ordinary=ふつうの。"],
 ["Wind power does not produce carbon dioxide.","","風力発電は二酸化炭素を出しません。","carbon dioxide=二酸化炭素。"],
 ["Some jobs may be replaced by robots in the future.","","将来、ロボットに取ってかわられる仕事もあるかもしれません。","be replaced by=〜に取ってかわられる。"],
 ["Smartphones have changed the way we get news.","","スマートフォンはニュースの得方を変えました。","the way we 〜=私たちが〜する方法。"],
 ["It is important to protect our personal information online.","","ネット上で個人情報を守ることが大切です。","personal information=個人情報。"]]);
XU('x-ek2n','英検2級 ステップ14','EIKEN 2 STEP 14','en',[
 ["The passage explains why some cities are losing population.","","この文章は、なぜ人口が減っている都市があるのかを説明しています。","要約の書き出しで、テーマをひとことで示します。"],
 ["Some people think that the plan is helpful.","","その計画は役に立つと考える人もいます。","要約では Some people / Others で立場を整理します。"],
 ["Others, however, are worried about the cost.","","しかし、費用を心配する人もいます。","however は文の中に入れることもできます。"],
 ["In short, the new system has both merits and demerits.","","要するに、新しい制度には長所と短所の両方があります。","in short=要するに。"],
 ["The writer points out that cooperation is necessary.","","筆者は協力が必要だと指摘しています。","point out=指摘する。"],
 ["While online shopping is convenient, it can lead to waste.","","ネットショッピングは便利な一方、むだにつながることもあります。","While 〜=〜な一方で(対比を1文にまとめる)。"],
 ["As a result, more people are choosing to rent instead of buying.","","その結果、買わずに借りることを選ぶ人が増えています。","原因→結果のつながりを1文で示す。"],
 ["Use your own words instead of copying sentences from the passage.","","本文の文をそのまま写さず、自分の言葉で書きましょう。","要約では言いかえ(パラフレーズ)が大切です。"]]);
XU('x-ek2o','英検2級 ステップ15','EIKEN 2 STEP 15','en',[
 ["I was wondering if you could help me.","","手伝っていただけないかと思いまして。","I was wondering if 〜=とてもていねいなお願い。"],
 ["Would it be possible to change my reservation?","","予約を変更することはできますか。","Would it be possible to 〜?=〜することは可能ですか。"],
 ["That makes sense.","","なるほど、それなら納得です。","make sense=筋が通る。"],
 ["I couldn't agree more.","","大賛成です。","これ以上賛成できない=完全に賛成。"],
 ["It's not a big deal.","","大したことじゃないよ。","big deal=大ごと。"],
 ["I'll keep you posted.","","進みぐあいをそのつどお知らせします。","keep 人 posted=人に最新の情報を伝え続ける。"],
 ["Something came up, so I can't make it tonight.","","急用ができて、今夜は行けなくなりました。","something came up=急用ができた。make it=間に合う・都合がつく。"],
 ["Let me check my schedule first.","","まず予定を確認させてください。","let me 〜=〜させてください。"]]);
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
/* ---- 英検準1級: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ekp1f','英検準1級 ステップ6','EIKEN PRE-1 STEP 6','en',[
 ["The scandal undermined public confidence in the company.","","そのスキャンダルは会社への世間の信頼を損ないました。","undermine=(信頼・効果などを)徐々に損なう。"],
 ["Regular feedback can enhance students' motivation.","","定期的なフィードバックは生徒のやる気を高めることができます。","enhance=(質・価値を)高める。"],
 ["The program aims to foster a sense of community.","","そのプログラムは地域の一体感を育てることを目指しています。","foster=育成する・促進する。"],
 ["A lack of funding hindered the research.","","資金不足が研究のさまたげになりました。","hinder=妨げる(prevent より「遅らせる」感じ)。"],
 ["The city plans to implement the new policy next spring.","","市は来春、新しい政策を実施する予定です。","implement=(計画・政策を)実行する。"],
 ["More money should be allocated to education.","","教育にもっとお金を配分すべきです。","allocate=割り当てる・配分する。"],
 ["All factories must comply with the safety rules.","","すべての工場は安全規則に従わなければなりません。","comply with=(規則に)従う。"],
 ["His health deteriorated rapidly after the accident.","","事故のあと、彼の健康は急速に悪化しました。","deteriorate=悪化する(自動詞)。"]]);
XU('x-ekp1g','英検準1級 ステップ7','EIKEN PRE-1 STEP 7','en',[
 ["The plan is not financially feasible.","","その計画は資金面で実現可能ではありません。","feasible=実現可能な。"],
 ["Some degree of change is inevitable.","","ある程度の変化は避けられません。","inevitable=避けられない。"],
 ["The project requires a substantial investment.","","その事業には多額の投資が必要です。","substantial=かなりの・相当な。"],
 ["Elderly people are especially vulnerable to heatstroke.","","高齢者は特に熱中症にかかりやすいです。","vulnerable to=〜に弱い・影響を受けやすい。"],
 ["Smartphone addiction is becoming increasingly prevalent.","","スマートフォン依存はますます広まっています。","prevalent=広く行きわたった。"],
 ["The report provides a comprehensive overview of the problem.","","その報告書は問題を包括的に概観しています。","comprehensive=包括的な。overview=概観。"],
 ["The decision to close the hospital was highly controversial.","","病院を閉鎖するという決定は大きな物議をかもしました。","controversial=論争を呼ぶ。"],
 ["There is growing evidence that the drug is effective.","","その薬が効果的だという証拠が増えています。","evidence は数えられない名詞(an は不要)。"]]);
XU('x-ekp1h','英検準1級 ステップ8','EIKEN PRE-1 STEP 8','en',[
 ["The company will phase out plastic straws by next year.","","その会社は来年までにプラスチックストローを段階的に廃止します。","phase out=段階的に廃止する。"],
 ["The police are cracking down on illegal parking.","","警察は違法駐車を厳しく取り締まっています。","crack down on=〜を厳しく取り締まる。"],
 ["The movie did not live up to my expectations.","","その映画は期待ほどではありませんでした。","live up to=(期待に)こたえる。"],
 ["The results fell short of the target.","","結果は目標に届きませんでした。","fall short of=〜に達しない。"],
 ["Young people account for 30 percent of the users.","","若者が利用者の30%を占めています。","account for=(割合を)占める/説明する。"],
 ["We cannot rule out the possibility of an earthquake.","","地震の可能性を否定することはできません。","rule out=除外する・否定する。"],
 ["The new technology brought about major changes in society.","","その新技術は社会に大きな変化をもたらしました。","bring about=もたらす・引き起こす。"],
 ["The team came up against many difficulties.","","チームは多くの困難に直面しました。","come up against=(困難に)ぶつかる。"]]);
XU('x-ekp1i','英検準1級 ステップ9','EIKEN PRE-1 STEP 9','en',[
 ["Voter turnout among young people remains low.","","若者の投票率は低いままです。","voter turnout=投票率。"],
 ["The two countries signed a trade agreement.","","両国は貿易協定に署名しました。","trade agreement=貿易協定。"],
 ["Developed countries should provide more aid to poorer nations.","","先進国は貧しい国々へもっと援助をするべきです。","developed countries=先進国。aid=援助。"],
 ["The government is under pressure to cut taxes.","","政府は減税をせまられています。","be under pressure to 〜=〜するよう圧力を受けている。"],
 ["Many refugees have fled the conflict.","","多くの難民が紛争から逃れました。","refugee=難民。flee(逃げる)の過去分詞は fled。"],
 ["Lowering the voting age could increase political interest.","","選挙権年齢を下げると、政治への関心が高まるかもしれません。","voting age=選挙権年齢。"],
 ["The summit focused on climate change and security.","","首脳会議は気候変動と安全保障に焦点を当てました。","summit=首脳会議。"],
 ["Citizens have the right to express their opinions freely.","","市民には自由に意見を表明する権利があります。","the right to 〜=〜する権利。"]]);
XU('x-ekp1j','英検準1級 ステップ10','EIKEN PRE-1 STEP 10','en',[
 ["Labor shortages are forcing companies to raise wages.","","人手不足により、企業は賃金を上げざるを得なくなっています。","labor shortage=人手不足。force 〜 to …=〜に…を強いる。"],
 ["More companies are hiring foreign workers.","","外国人労働者を雇う企業が増えています。","hire=雇う。"],
 ["The yen has weakened against the dollar.","","ドルに対して円安が進んでいます。","weaken against=〜に対して弱くなる。"],
 ["Consumers are cutting back on spending.","","消費者は支出を減らしています。","cut back on=〜を減らす。"],
 ["Side jobs are becoming more popular among office workers.","","会社員の間で副業が人気になっています。","side job=副業。"],
 ["The startup attracted investors from around the world.","","そのスタートアップ企業は世界中から投資家を集めました。","attract=引きつける。"],
 ["Rising housing costs are a major concern in big cities.","","大都市では住宅費の上昇が大きな問題です。","concern=懸念。"],
 ["Job security is no longer guaranteed.","","雇用の安定はもはや保証されていません。","job security=雇用の安定。guarantee=保証する。"]]);
XU('x-ekp1k','英検準1級 ステップ11','EIKEN PRE-1 STEP 11','en',[
 ["Vaccines have saved millions of lives.","","ワクチンは何百万人もの命を救ってきました。","millions of=何百万もの。"],
 ["Antibiotics are losing their effectiveness against some bacteria.","","一部の細菌に対して抗生物質の効果が弱まっています。","antibiotic=抗生物質。"],
 ["Researchers conducted a large-scale study on sleep.","","研究者たちは睡眠に関する大規模な研究を行いました。","conduct a study=研究を行う。"],
 ["AI can help doctors detect diseases at an early stage.","","AIは医師が病気を早期に発見する助けになります。","detect=発見する・検出する。"],
 ["The results of the experiment were inconclusive.","","実験の結果は決定的なものではありませんでした。","inconclusive=結論が出ない。"],
 ["Genetic factors play a role in many diseases.","","多くの病気には遺伝的要因が関わっています。","play a role in=〜に役割を果たす・関わる。"],
 ["The new treatment has few side effects.","","その新しい治療法には副作用がほとんどありません。","side effect=副作用。few=ほとんどない。"],
 ["Scientists are still debating the cause of the phenomenon.","","科学者たちはその現象の原因をまだ議論しています。","phenomenon=現象(複数形は phenomena)。"]]);
XU('x-ekp1l','英検準1級 ステップ12','EIKEN PRE-1 STEP 12','en',[
 ["I firmly believe that the government should take action.","","私は政府が行動を起こすべきだと強く信じています。","立場を最初にはっきり示します。"],
 ["The first reason is related to cost.","","1つ目の理由はコストに関係しています。","理由の観点(コスト・安全・健康など)を先に示す型。"],
 ["From an economic perspective, the plan makes sense.","","経済的な観点から見ると、その計画は理にかなっています。","from a(n) 〜 perspective=〜の観点から。"],
 ["This would allow people to make better use of their time.","","これにより、人々は時間をより有効に使えるようになるでしょう。","make better use of=〜をもっと有効に使う。"],
 ["A good example of this is the system used in Finland.","","その良い例がフィンランドで使われている制度です。","具体例で主張を支えます(国名などの事実はまちがえないように)。"],
 ["Furthermore, it would help reduce inequality.","","さらに、不平等を減らす助けになるでしょう。","Furthermore=さらに(In addition よりかたい)。"],
 ["Although some people oppose the idea, its benefits are clear.","","反対する人もいますが、その利点は明らかです。","反論を認めつつ自分の主張にもどる形。"],
 ["For the reasons stated above, I support the proposal.","","以上の理由から、私はその提案を支持します。","stated above=上で述べた。結論の定番。"]]);
XU('x-ekp1m','英検準1級 ステップ13','EIKEN PRE-1 STEP 13','en',[
 ["The passage discusses the advantages and disadvantages of remote learning.","","この文章は遠隔学習の長所と短所を論じています。","要約の1文目でテーマを示します。"],
 ["Supporters argue that it gives students more flexibility.","","支持する人たちは、それにより生徒の自由度が高まると主張しています。","Supporters / Critics で立場を整理します。"],
 ["Critics, on the other hand, point out that it can lead to isolation.","","一方で批判する人たちは、孤立につながりうると指摘しています。","isolation=孤立。"],
 ["The author concludes that a balanced approach is needed.","","筆者はバランスのとれた方法が必要だと結論づけています。","conclude that 〜=〜と結論づける。"],
 ["Overall, the change has had mixed results.","","全体として、その変化の結果は良し悪し両方でした。","mixed results=良い面と悪い面が混ざった結果。"],
 ["The main factor behind this trend is the falling birth rate.","","この傾向の主な要因は出生率の低下です。","factor behind 〜=〜の背後にある要因。"],
 ["In contrast, rural areas face a different problem.","","対照的に、地方は別の問題に直面しています。","in contrast=対照的に。"],
 ["Avoid including your own opinion in a summary.","","要約には自分の意見を入れないようにしましょう。","要約は本文の内容だけを短く言いかえるのが基本。"]]);
XU('x-ekp1n','英検準1級 ステップ14','EIKEN PRE-1 STEP 14','en',[
 ["Whereas cities have many jobs, rural areas offer a slower pace of life.","","都市には仕事が多い一方、地方にはゆったりした暮らしがあります。","whereas=〜である一方(対比)。"],
 ["The plan was expensive; nonetheless, it was approved.","","その計画は費用がかかりましたが、それでも承認されました。","nonetheless=それにもかかわらず。"],
 ["Consequently, many small shops were forced to close.","","その結果、多くの小さな店が閉店に追いこまれました。","consequently=その結果(as a result よりかたい)。"],
 ["By contrast, the younger generation prefers renting.","","それに対して、若い世代は借りることを好みます。","by contrast=それに対して。"],
 ["The theory was eventually proved wrong.","","その理論は最終的にまちがっていると証明されました。","eventually=最終的に・結局。"],
 ["Moreover, the new system is easier to use.","","そのうえ、新しいシステムのほうが使いやすいです。","moreover=そのうえ。"],
 ["The data suggest that the trend will continue.","","データはその傾向が続くことを示唆しています。","data は複数あつかいされることもあります(suggest)。suggest=示唆する。"],
 ["This is not to say that technology is harmful.","","これは技術が有害だと言っているわけではありません。","This is not to say that 〜=〜と言っているわけではない(誤解を防ぐ)。"]]);
XU('x-ekp1o','英検準1級 ステップ15','EIKEN PRE-1 STEP 15','en',[
 ["That's a difficult question, but I'll do my best to answer.","","難しい質問ですが、できる限りお答えします。","すぐ答えられないときも、だまらずにつなぐ一言。"],
 ["I would say that the benefits outweigh the costs.","","利点が費用を上回ると言えると思います。","I would say=〜だと思います(断定をやわらげる)。outweigh=上回る。"],
 ["I think it varies from person to person.","","人によってちがうと思います。","vary from person to person=人によって異なる。このあとに具体例を続けると説得力が出ます。"],
 ["To be more specific, I mean public schools.","","もう少し具体的に言うと、公立学校のことです。","to be more specific=より具体的に言うと。"],
 ["I hadn't thought about it that way.","","そういうふうには考えていませんでした。","相手の意見を受け止める表現。"],
 ["Could you rephrase the question, please?","","質問を言いかえていただけますか。","rephrase=言いかえる。"],
 ["In my experience, small classes work better.","","私の経験では、少人数クラスのほうがうまくいきます。","in my experience=私の経験では。"],
 ["Having said that, there are some exceptions.","","とはいえ、いくつか例外もあります。","having said that=とはいえ(前の発言に条件をつける)。"]]);
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
/* ---- 英検1級: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ek1f','英検1級 ステップ6','EIKEN 1 STEP 6','en',[
 ["The new evidence vindicated the scientist's theory.","","新しい証拠がその科学者の理論の正しさを証明しました。","vindicate=(正しさ・潔白を)証明する。"],
 ["The government sought to placate angry farmers.","","政府は怒った農家をなだめようとしました。","placate=なだめる。sought は seek の過去形。"],
 ["The company was accused of trying to circumvent the regulations.","","その会社は規制をくぐり抜けようとしたと非難されました。","circumvent=(規則などを)回避する。"],
 ["Years of conflict have decimated the region's economy.","","長年の紛争がその地域の経済を壊滅させました。","decimate=大きく減らす・壊滅させる。"],
 ["The minister tried to downplay the seriousness of the crisis.","","大臣は危機の深刻さを軽く見せようとしました。","downplay=軽く扱う・過小に見せる。"],
 ["Rising prices have exacerbated poverty in urban areas.","","物価の上昇が都市部の貧困を悪化させています。","exacerbate=(悪い状態を)さらに悪化させる。"],
 ["The leaders reiterated their commitment to peace.","","指導者たちは平和への決意をあらためて表明しました。","reiterate=くり返し述べる。"],
 ["The museum aims to perpetuate traditional crafts.","","その博物館は伝統工芸を後世に残すことを目指しています。","perpetuate=永続させる(悪い慣習にも使います)。"]]);
XU('x-ek1g','英検1級 ステップ7','EIKEN 1 STEP 7','en',[
 ["The negotiations reached an impasse.","","交渉は行きづまりました。","impasse=行きづまり。"],
 ["His remarks were seen as condescending.","","彼の発言は見下していると受け取られました。","condescending=見下すような。"],
 ["The region has a precarious water supply.","","その地域の水の供給は不安定です。","precarious=不安定な・危うい。"],
 ["Her argument was both cogent and concise.","","彼女の主張は説得力があり、簡潔でした。","cogent=説得力のある。concise=簡潔な。"],
 ["The problem is ubiquitous in modern cities.","","その問題は現代の都市のいたるところに見られます。","ubiquitous=いたるところにある。"],
 ["The policy had a detrimental effect on small farms.","","その政策は小規模農家に有害な影響を与えました。","detrimental=有害な(harmful よりかたい)。"],
 ["There is a dearth of reliable data on the issue.","","その問題については信頼できるデータが不足しています。","a dearth of=〜の不足。"],
 ["The novel offers a poignant portrait of wartime life.","","その小説は戦時中の生活を胸を打つように描いています。","poignant=心を打つ・痛ましい。"]]);
XU('x-ek1h','英検1級 ステップ8','EIKEN 1 STEP 8','en',[
 ["The scandal threatens to derail the peace talks.","","そのスキャンダルは和平交渉を頓挫させるおそれがあります。","derail=(計画を)脱線させる・頓挫させる。threaten to 〜=〜するおそれがある。"],
 ["The rumor turned out to be unfounded.","","そのうわさは根拠がないとわかりました。","unfounded=根拠のない。"],
 ["The government is trying to stave off a recession.","","政府は景気後退を食い止めようとしています。","stave off=(危険などを)食い止める。"],
 ["Critics were quick to seize on the minister's mistake.","","批判する人たちはすぐに大臣の失敗に飛びつきました。","seize on=(機会・弱点に)飛びつく。"],
 ["The issue was swept under the carpet for years.","","その問題は何年も隠されてきました。","sweep 〜 under the carpet=(都合の悪いことを)隠す。"],
 ["The negotiations are still up in the air.","","交渉はまだどうなるかわかりません。","up in the air=未決定で。"],
 ["The company had to write off its losses.","","その会社は損失を帳消しにしなければなりませんでした。","write off=(損失として)処理する・帳消しにする。"],
 ["The new rules have been watered down.","","新しい規則は骨抜きにされました。","water down=(内容を)弱める・骨抜きにする。"]]);
XU('x-ek1i','英検1級 ステップ9','EIKEN 1 STEP 9','en',[
 ["The court ruled that the law was unconstitutional.","","裁判所はその法律が違憲であると判断しました。","rule that 〜=〜と判決を下す。unconstitutional=違憲の。"],
 ["Facial recognition raises serious privacy concerns.","","顔認証は深刻なプライバシーの懸念を生みます。","raise concerns=懸念を生む。"],
 ["Who should be held liable when a self-driving car crashes?","","自動運転車が事故を起こしたとき、だれが責任を負うべきでしょうか。","be held liable=法的責任を問われる。"],
 ["The death penalty remains a deeply divisive issue.","","死刑は今も深く意見が分かれる問題です。","divisive=意見を分裂させる。"],
 ["Companies have an ethical obligation to protect user data.","","企業には利用者のデータを守る倫理的な義務があります。","obligation=義務。"],
 ["Freedom of speech is not absolute.","","表現の自由は無制限ではありません。","absolute=絶対的な・無制限の。"],
 ["The bill was passed by a narrow margin.","","その法案は僅差で可決されました。","bill=法案。by a narrow margin=僅差で。"],
 ["Whistleblowers need stronger legal protection.","","内部告発者にはより強い法的保護が必要です。","whistleblower=内部告発者。"]]);
XU('x-ek1j','英検1級 ステップ10','EIKEN 1 STEP 10','en',[
 ["Water scarcity could trigger conflicts between nations.","","水不足は国家間の紛争の引き金になりかねません。","scarcity=不足。trigger=引き起こす。"],
 ["Coral reefs are highly sensitive to rising ocean temperatures.","","サンゴ礁は海水温の上昇にとても敏感です。","coral reef=サンゴ礁。"],
 ["The transition to renewable energy must be accelerated.","","再生可能エネルギーへの移行を加速させなければなりません。","transition to=〜への移行。"],
 ["Microplastics have been found even in the deep sea.","","マイクロプラスチックは深海でも見つかっています。","現在完了の受け身(have been found)。"],
 ["Overconsumption is depleting the planet's resources.","","過剰な消費が地球の資源を枯渇させています。","deplete=使い果たす。"],
 ["Carbon pricing gives companies an incentive to cut emissions.","","炭素の価格づけは、企業に排出削減の動機を与えます。","incentive=動機・誘因。emissions=排出量。"],
 ["Urban sprawl threatens natural habitats.","","都市の無秩序な拡大は自然の生息地をおびやかしています。","urban sprawl=都市のスプロール現象。habitat=生息地。"],
 ["Sustainable fishing practices are essential for future generations.","","持続可能な漁業のやり方は将来の世代にとって欠かせません。","practice=(習慣的な)やり方。"]]);
XU('x-ek1k','英検1級 ステップ11','EIKEN 1 STEP 11','en',[
 ["The pandemic exposed weaknesses in healthcare systems.","","パンデミックは医療制度の弱点を浮き彫りにしました。","expose=さらけ出す。"],
 ["Life expectancy has risen steadily over the past century.","","平均寿命は過去100年で着実に延びてきました。","life expectancy=平均寿命。"],
 ["The drug is still in the early stages of clinical trials.","","その薬はまだ臨床試験の初期段階にあります。","clinical trial=臨床試験。"],
 ["Organ donation remains rare in some countries.","","臓器提供がいまだにまれな国もあります。","organ donation=臓器提供。"],
 ["Misuse of antibiotics contributes to drug-resistant bacteria.","","抗生物質の誤用が薬剤耐性菌の一因になっています。","contribute to=〜の一因となる。drug-resistant=薬剤耐性の。"],
 ["Preventive care can reduce long-term medical costs.","","予防医療は長期的な医療費を減らすことができます。","preventive=予防の。"],
 ["The ethics of human cloning are hotly debated.","","ヒトのクローンの倫理は激しく議論されています。","ethics(倫理)は複数あつかいになることが多いです。"],
 ["Mental illness still carries a social stigma.","","心の病には今も社会的な偏見がつきまといます。","stigma=汚名・偏見。"]]);
XU('x-ek1l','英検1級 ステップ12','EIKEN 1 STEP 12','en',[
 ["The two nations restored diplomatic relations.","","両国は国交を回復しました。","diplomatic relations=外交関係・国交。"],
 ["Economic sanctions have had limited impact.","","経済制裁の効果は限定的でした。","sanction=制裁。"],
 ["Cyberattacks pose a growing threat to national security.","","サイバー攻撃は国家の安全保障への脅威を増しています。","pose a threat to=〜に脅威を与える。"],
 ["The alliance was formed to deter aggression.","","その同盟は侵略を抑止するために結成されました。","deter=思いとどまらせる・抑止する。aggression=侵略。"],
 ["Humanitarian aid failed to reach the affected areas.","","人道支援は被災地に届きませんでした。","humanitarian=人道的な。affected areas=被災地。"],
 ["The treaty prohibits the testing of nuclear weapons.","","その条約は核兵器の実験を禁止しています。","prohibit=禁止する。"],
 ["Soft power plays an increasingly important role in diplomacy.","","外交ではソフトパワーがますます重要な役割を果たしています。","soft power=文化などによる影響力。diplomacy=外交。"],
 ["Tensions in the region have eased somewhat.","","その地域の緊張はいくらか緩和しました。","ease=やわらぐ。somewhat=いくらか。"]]);
XU('x-ek1m','英検1級 ステップ13','EIKEN 1 STEP 13','en',[
 ["This essay will argue that the policy should be abolished.","","本論では、その政策は廃止されるべきだと論じます。","冒頭で立場と構成を示す型。"],
 ["First and foremost, the policy has failed to achieve its goals.","","何よりもまず、その政策は目標を達成できていません。","first and foremost=何よりもまず。"],
 ["This is evidenced by the steady rise in unemployment.","","このことは失業率の着実な上昇によって裏づけられています。","be evidenced by=〜によって裏づけられる。"],
 ["Proponents of the policy contend that it creates jobs.","","その政策の支持者は、それが雇用を生むと主張しています。","proponent=支持者。contend=主張する。"],
 ["However, this argument does not hold up to scrutiny.","","しかし、この主張は精査に耐えません。","hold up to scrutiny=厳しい検討に耐える。"],
 ["A more effective alternative would be to invest in training.","","より効果的な代替案は、職業訓練に投資することでしょう。","alternative=代替案。"],
 ["In light of these points, the policy cannot be justified.","","これらの点をふまえると、その政策は正当化できません。","in light of=〜をふまえて。justify=正当化する。"],
 ["In conclusion, the drawbacks far outweigh the benefits.","","結論として、欠点が利点をはるかに上回ります。","far outweigh=はるかに上回る。"]]);
XU('x-ek1n','英検1級 ステップ14','EIKEN 1 STEP 14','en',[
 ["The passage examines the causes of declining trust in the media.","","この文章はメディアへの信頼が低下している原因を検討しています。","examine=検討する。要約の1文目でテーマを示します。"],
 ["According to the author, the rise of social media is partly to blame.","","筆者によれば、ソーシャルメディアの台頭にも責任の一端があります。","be to blame=責任がある。partly=部分的に。"],
 ["The author also acknowledges some positive effects.","","筆者はいくつかの良い効果も認めています。","acknowledge=(事実として)認める。"],
 ["Nevertheless, the overall tone of the passage is critical.","","それでもなお、文章全体の論調は批判的です。","nevertheless=それでもなお。"],
 ["The passage ends by calling for stricter regulation.","","文章は規制の強化を求めて締めくくられています。","call for=要求する。"],
 ["Two contrasting views are presented.","","対照的な2つの見方が示されています。","contrasting=対照的な。"],
 ["Specific numbers can usually be left out of a summary.","","要約では、具体的な数字はふつう省いてかまいません。","leave out=省く。細部より論の流れを優先します。"],
 ["Combine similar points into a single sentence.","","似た論点は1つの文にまとめましょう。","要約では情報を整理して短くまとめます。"]]);
XU('x-ek1o','英検1級 ステップ15','EIKEN 1 STEP 15','en',[
 ["The topic I have chosen is whether nuclear power should be expanded.","","私が選んだトピックは、原子力発電を拡大すべきかどうかです。","スピーチの冒頭でトピックを読み上げる形。"],
 ["I will support my position with three key points.","","3つの要点で自分の立場を裏づけます。","最初に論点の数を示すと聞きやすくなります。"],
 ["Let me illustrate this with an example.","","例を挙げて説明させてください。","illustrate=(例などで)説明する。"],
 ["To sum up, I am convinced that the risks are too great.","","まとめると、私はリスクが大きすぎると確信しています。","to sum up=まとめると。be convinced that=〜と確信している。"],
 ["That's an interesting point, but I respectfully disagree.","","興味深いご指摘ですが、失礼ながら私は反対です。","反対意見もていねいに伝える表現。"],
 ["I admit that my argument has some limitations.","","私の主張にいくつか限界があることは認めます。","limitation=限界。"],
 ["Allow me to clarify what I meant.","","私が言いたかったことをはっきりさせてください。","clarify=明確にする。"],
 ["It's a complex issue with no easy answers.","","簡単な答えのない複雑な問題です。","すぐに結論が出ない問題を認めたうえで意見を述べる。"]]);
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
/* ---- TOEIC L&R: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-toeicf','TOEIC L&R ステップ6','TOEIC STEP 6','en',[
 ["Let's reschedule the meeting for next Tuesday afternoon.","","会議を来週火曜日の午後に変更しましょう。","reschedule=予定を変更する。"],
 ["I'm afraid I have a scheduling conflict at that time.","","あいにくその時間は別の予定と重なっています。","scheduling conflict=予定の重なり。"],
 ["The conference room on the fifth floor has been reserved.","","5階の会議室が予約されています。",""],
 ["Could you take notes during the meeting?","","会議中にメモを取っていただけますか。","take notes=メモを取る。"],
 ["Shall we go over the main points from last week first?","","まず先週の要点を確認しましょうか。","go over=見直す・確認する。"],
 ["The minutes will be sent to everyone by email.","","議事録は全員にメールで送られます。","minutes=議事録(この意味では複数形)。"],
 ["Ms. Lopez will be joining us by video call.","","ロペスさんはビデオ通話で参加します。",""],
 ["We ran out of time, so we'll continue tomorrow.","","時間がなくなったので、明日続けます。","run out of 〜=〜を使い果たす。"]]);
XU('x-toeicg','TOEIC L&R ステップ7','TOEIC STEP 7','en',[
 ["The new software will be installed on all computers this weekend.","","新しいソフトウェアが今週末、全パソコンに入れられます。","be installed=インストールされる。"],
 ["Please restart your computer to complete the update.","","更新を完了するには、パソコンを再起動してください。",""],
 ["The network will be down for maintenance tonight.","","今夜は保守のためネットワークが使えません。","down=(機械やシステムが)止まっている。"],
 ["I can't log in to my account.","","自分のアカウントにログインできません。",""],
 ["Contact the IT department if the problem continues.","","問題が続く場合は IT 部に連絡してください。",""],
 ["The photocopier is running low on paper.","","コピー機の紙が少なくなっています。","run low on 〜=〜が残り少なくなる。"],
 ["Remember to back up your files regularly.","","ファイルを定期的にバックアップするのを忘れないでください。","back up=バックアップを取る。"],
 ["The password must be at least eight characters long.","","パスワードは8文字以上でなければなりません。",""]]);
XU('x-toeich','TOEIC L&R ステップ8','TOEIC STEP 8','en',[
 ["We are currently seeking an experienced sales manager.","","現在、経験のある営業部長を募集しています。","seek=探し求める(求人の決まった言い方)。"],
 ["Applicants should send a résumé and a cover letter.","","応募者は履歴書と添え状を送ってください。","cover letter=応募書類に添える手紙。"],
 ["The deadline for applications is March 31.","","応募の締め切りは3月31日です。",""],
 ["Candidates will be contacted for an interview.","","候補者には面接の連絡があります。",""],
 ["She was promoted to department manager last year.","","彼女は昨年、部長に昇進しました。","be promoted to 〜=〜に昇進する。"],
 ["New employees must complete a two-week orientation.","","新入社員は2週間のオリエンテーションを終えなければなりません。",""],
 ["He is responsible for training new staff.","","彼は新しい職員の研修を担当しています。","be responsible for 〜=〜を担当している。"],
 ["The company offers competitive salaries and benefits.","","その会社は他社に負けない給与と福利厚生を提供しています。","benefits=福利厚生。competitive=競争力のある。"]]);
XU('x-toeici','TOEIC L&R ステップ9','TOEIC STEP 9','en',[
 ["I need to book a flight to Singapore for the trade show.","","展示会のためにシンガポール行きの便を予約する必要があります。","trade show=見本市・展示会。"],
 ["My flight has been delayed by two hours.","","私の便は2時間遅れています。",""],
 ["Please keep your receipts for reimbursement.","","払い戻しのために領収書を保管しておいてください。","reimbursement=(立て替えた経費の)払い戻し。"],
 ["The hotel is within walking distance of the convention center.","","ホテルは会議場から歩いて行ける距離にあります。",""],
 ["I'd like to check in, please. I have a reservation under the name Sato.","","チェックインをお願いします。佐藤の名前で予約しています。","under the name 〜=〜の名前で。"],
 ["Is breakfast included in the room rate?","","朝食は宿泊料金に含まれていますか。",""],
 ["A shuttle bus runs between the airport and the hotel every 20 minutes.","","空港とホテルの間に20分ごとにシャトルバスが出ています。",""],
 ["The business trip has been extended by two days.","","出張は2日延長されました。",""]]);
XU('x-toeicj','TOEIC L&R ステップ10','TOEIC STEP 10','en',[
 ["Would you like to pay by cash or credit card?","","お支払いは現金ですか、クレジットカードですか。",""],
 ["This model comes with a two-year warranty.","","この機種には2年間の保証がついています。","warranty=(製品の)保証。"],
 ["I'm sorry, but that item has been discontinued.","","申し訳ありませんが、その商品は製造中止になりました。","discontinue=(製造・販売を)やめる。"],
 ["We can deliver it to your home free of charge.","","ご自宅まで無料でお届けできます。","free of charge=無料で。"],
 ["Could I exchange this for a larger size?","","これをもっと大きいサイズと交換できますか。",""],
 ["The customer service desk is located near the main entrance.","","お客様サービス窓口は正面入口の近くにあります。","be located=位置している。"],
 ["Members receive a ten percent discount on all purchases.","","会員はすべての買い物が10%引きになります。",""],
 ["Your order has been shipped and should arrive within three days.","","ご注文の品は発送済みで、3日以内に届く予定です。",""]]);
XU('x-toeick','TOEIC L&R ステップ11','TOEIC STEP 11','en',[
 ["The budget for next year has been approved.","","来年の予算が承認されました。",""],
 ["We need to reduce our operating costs.","","運営費を減らす必要があります。","operating costs=運営費。"],
 ["The invoice must be paid within thirty days.","","請求書は30日以内に支払わなければなりません。",""],
 ["Profits were lower than expected this year.","","今年の利益は予想より低くなりました。",""],
 ["The accounting department is reviewing the figures.","","経理部が数字を確認しています。","figures=数字・数値。"],
 ["Please attach the receipt to your expense report.","","経費報告書に領収書を添付してください。","expense report=経費報告書。"],
 ["The company plans to expand into overseas markets.","","会社は海外市場への進出を計画しています。","expand into 〜=〜に事業を広げる。"],
 ["Our quarterly sales report is due on Friday.","","四半期の売上報告書は金曜日が期限です。","due=期限が来る。"]]);
XU('x-toeicl','TOEIC L&R ステップ12','TOEIC STEP 12','en',[
 ["The factory produces over 5,000 units a day.","","工場は1日に5,000個以上を生産しています。","unit=(製品の)個・台。"],
 ["All workers must wear safety helmets in this area.","","この区域では全作業員が安全ヘルメットを着用しなければなりません。",""],
 ["The shipment was delayed due to bad weather.","","悪天候のため出荷が遅れました。","due to 〜=〜のために(原因)。"],
 ["We will need to order more raw materials.","","原材料をもっと注文する必要があるでしょう。","raw materials=原材料。"],
 ["The products are inspected before they leave the factory.","","製品は工場を出る前に検査されます。","inspect=検査する。"],
 ["The warehouse is running out of storage space.","","倉庫の保管場所がなくなりかけています。",""],
 ["Please confirm the delivery date with the supplier.","","納品日を仕入れ先に確認してください。","supplier=仕入れ先・供給業者。"],
 ["The assembly line will be shut down for repairs.","","組み立てラインは修理のため停止されます。","assembly line=組み立てライン。"]]);
XU('x-toeicm','TOEIC L&R ステップ13','TOEIC STEP 13','en',[
 ["Our new advertising campaign starts next month.","","新しい広告キャンペーンは来月始まります。",""],
 ["We conducted a survey to find out what customers want.","","お客様が何を求めているかを知るために調査を行いました。","conduct a survey=調査を行う。"],
 ["The product launch was a great success.","","製品の発売は大成功でした。","launch=(新製品の)発売。"],
 ["Sales have increased since we lowered the price.","","値下げしてから売上が伸びています。",""],
 ["Our target customers are people in their twenties.","","私たちの対象顧客は20代の人々です。","in one's twenties=20代で。"],
 ["We should promote the product on social media.","","その製品をSNSで宣伝するべきです。","promote=宣伝する。"],
 ["Our main competitor has just released a similar product.","","最大の競合会社が似た製品を発売したばかりです。","competitor=競合相手。"],
 ["Free samples will be handed out at the event.","","イベントで無料サンプルが配られます。","hand out=配る。"]]);
XU('x-toeicn','TOEIC L&R ステップ14','TOEIC STEP 14','en',[
 ["I'd like to reserve a table for six at seven o'clock.","","7時に6人分の席を予約したいのですが。",""],
 ["The restaurant can accommodate up to 80 guests.","","そのレストランは最大80人まで収容できます。","accommodate=収容できる。"],
 ["The annual company banquet will be held at the Grand Hotel.","","毎年恒例の会社の祝賀会はグランドホテルで開かれます。","banquet=祝賀会・宴会。"],
 ["Please let us know if you have any dietary restrictions.","","食事の制限があればお知らせください。","dietary restrictions=食事の制限(アレルギーなど)。"],
 ["Tickets for the charity concert are now on sale.","","チャリティーコンサートのチケットが発売中です。",""],
 ["The keynote speech will begin at 9 a.m.","","基調講演は午前9時に始まります。","keynote speech=基調講演。"],
 ["Registration is required to attend the workshop.","","ワークショップに参加するには登録が必要です。",""],
 ["Refreshments will be served after the presentation.","","発表のあと、軽食が出されます。","refreshments=軽い飲食物。"]]);
XU('x-toeico','TOEIC L&R ステップ15','TOEIC STEP 15','en',[
 ["The elevator in Building B is out of service until Friday.","","B棟のエレベーターは金曜日まで使えません。","out of service=運転休止中。"],
 ["The parking lot will be repaved next week.","","駐車場は来週、舗装し直されます。",""],
 ["Tenants are asked to keep the hallways clear.","","入居者は廊下に物を置かないようお願いします。","tenant=(建物の)入居者。"],
 ["Rent is due on the first day of each month.","","家賃は毎月1日が支払い期限です。",""],
 ["A plumber will come to fix the leak this afternoon.","","今日の午後、配管工が水漏れを直しに来ます。","plumber=配管工。leak=漏れ。"],
 ["Please note that the water will be turned off from 10 a.m. to noon.","","午前10時から正午まで断水しますのでご注意ください。","Please note that 〜=〜にご注意ください(お知らせの決まり文句)。"],
 ["The lobby is being painted, so please use the side entrance.","","ロビーは塗装中なので、横の入口をお使いください。",""],
 ["Thank you for your cooperation.","","ご協力ありがとうございます。","お知らせの最後の決まり文句。"]]);
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
/* ---- IELTS: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-ieltsf','IELTS ステップ6','IELTS STEP 6','en',[
 ["The pie chart illustrates how households spent their income in 2020.","","この円グラフは、2020年に世帯が収入をどう使ったかを表しています。","Task 1 の書き出し。illustrate=示す・表す。"],
 ["Housing accounted for the largest proportion of spending.","","住居費が支出の最も大きな割合を占めていました。","account for 〜=(割合)を占める。"],
 ["Spending on entertainment was roughly half that on food.","","娯楽費は食費のおよそ半分でした。","roughly=およそ。"],
 ["The figure peaked at 45 percent in 2015.","","その数値は2015年に45%で最高に達しました。","peak=最高点に達する。"],
 ["It then declined sharply to just 10 percent.","","その後、わずか10%まで急激に下がりました。","decline sharply=急減する。"],
 ["In contrast, the number of cyclists remained stable.","","対照的に、自転車利用者の数は安定していました。","remain stable=横ばいのまま。"],
 ["The two lines crossed in the middle of the period.","","2本の線は期間の中ごろで交わりました。",""],
 ["Overall, there was a clear shift from print to digital media.","","全体として、紙からデジタルの媒体へはっきりと移り変わりました。","Overall で始まる概要文は Task 1 の得点のかぎ。"]]);
XU('x-ieltsg','IELTS ステップ7','IELTS STEP 7','en',[
 ["The diagram shows how recycled glass is processed.","","この図は再生ガラスがどのように処理されるかを示しています。","プロセス図の書き出し。"],
 ["At the first stage, the bottles are collected and sorted by colour.","","最初の段階で、びんは集められて色ごとに分けられます。","IELTS はイギリス英語のつづり(colour)も使えます。"],
 ["Next, they are crushed into small pieces.","","次に、細かく砕かれます。","プロセスは受け身(are crushed)で書くのが基本。"],
 ["The mixture is then heated to a very high temperature.","","その混合物はその後、とても高い温度まで熱せられます。",""],
 ["Once it has cooled, the glass is shaped into new products.","","冷えたら、ガラスは新しい製品の形にされます。","Once 〜=いったん〜したら。"],
 ["Finally, the finished products are delivered to shops.","","最後に、完成品が店に届けられます。",""],
 ["The process consists of six main stages.","","この工程は6つの主な段階から成ります。","consist of 〜=〜から成る。"],
 ["The map shows how the town centre changed between 1990 and today.","","この地図は、1990年から今日までに町の中心部がどう変わったかを示しています。","地図問題の書き出し。"]]);
XU('x-ieltsh','IELTS ステップ8','IELTS STEP 8','en',[
 ["Some people believe that university education should be free.","","大学教育は無料であるべきだと考える人もいます。","Task 2 の書き出し(意見の紹介)。"],
 ["This essay will discuss both views before giving my opinion.","","このエッセイでは、両方の見方を論じたうえで私の意見を述べます。","Discuss both views 型の導入文。"],
 ["On the one hand, free tuition would give everyone an equal chance.","","一方では、授業料が無料なら全員に平等な機会が与えられます。","On the one hand 〜. On the other hand 〜."],
 ["On the other hand, it would place a heavy burden on taxpayers.","","他方では、納税者に重い負担がかかります。","burden=負担。"],
 ["A good example of this is the healthcare system in Scandinavia.","","その良い例が、北欧の医療制度です。","具体例を示す型。"],
 ["As a result, more young people would be able to afford higher education.","","その結果、より多くの若者が高等教育を受けられるでしょう。","afford=(費用を)出す余裕がある。"],
 ["It could be argued that individuals should pay for their own education.","","個人が自分の教育費を払うべきだという主張もありえます。","反対意見を客観的に紹介する型。"],
 ["In conclusion, I believe the benefits outweigh the drawbacks.","","結論として、利点が欠点を上回ると私は考えます。","outweigh=〜より重い・上回る。"]]);
XU('x-ieltsi','IELTS ステップ9','IELTS STEP 9','en',[
 ["Governments should invest more in public transport.","","政府は公共交通機関にもっと投資するべきです。",""],
 ["This would not only reduce traffic but also cut air pollution.","","これは交通量を減らすだけでなく、大気汚染も減らすでしょう。","not only A but also B。"],
 ["There are several reasons why this trend has emerged.","","この傾向が現れたのには、いくつかの理由があります。","Causes 型の問題で使う。emerge=現れる。"],
 ["One possible solution would be to introduce stricter laws.","","考えられる解決策の一つは、より厳しい法律を導入することでしょう。","Solutions 型の問題で使う。"],
 ["Without such measures, the problem is likely to get worse.","","そのような対策がなければ、問題は悪化する可能性が高いです。","measures=対策。"],
 ["This is particularly true in developing countries.","","これは発展途上国で特に当てはまります。",""],
 ["Admittedly, this approach has some disadvantages.","","確かに、このやり方にはいくつかの欠点があります。","Admittedly=確かに(譲歩)。"],
 ["Nevertheless, the advantages are far greater.","","それでも、利点のほうがはるかに大きいです。",""]]);
XU('x-ieltsj','IELTS ステップ10','IELTS STEP 10','en',[
 ["I'm currently studying at a high school in Tokyo.","","今は東京の高校で勉強しています。","Speaking Part 1 の自己紹介。"],
 ["I live in a quiet residential area on the outskirts of the city.","","私は市のはずれの静かな住宅地に住んでいます。","outskirts=郊外・はずれ。"],
 ["What I like most about my hometown is the friendly atmosphere.","","地元でいちばん好きなのは、親しみやすい雰囲気です。","What I like most is 〜 の型で答えを長くする。"],
 ["To be honest, I'm not really a morning person.","","正直に言うと、朝はあまり得意ではありません。","morning person=朝型の人。"],
 ["I tend to listen to music when I'm studying.","","勉強中は音楽を聞くことが多いです。","tend to 〜=〜しがちだ。"],
 ["It depends on my mood, but I usually prefer staying in.","","気分によりますが、たいていは家にいるほうが好きです。","It depends on 〜 で始めるのは自然な答え方。"],
 ["I used to play the piano when I was younger.","","小さいころはピアノを弾いていました。","used to 〜=以前は〜していた。"],
 ["I'd love to visit Iceland one day to see the northern lights.","","いつかオーロラを見にアイスランドに行ってみたいです。","northern lights=オーロラ。"]]);
XU('x-ieltsk','IELTS ステップ11','IELTS STEP 11','en',[
 ["I'd like to talk about a trip I took with my family last summer.","","去年の夏に家族と行った旅行について話したいと思います。","Speaking Part 2 の話し始め。"],
 ["It all started when my father suggested going camping.","","すべては父がキャンプに行こうと言い出したことから始まりました。",""],
 ["What made it so memorable was the view from the mountain top.","","それがとても思い出深いのは、山頂からのながめのおかげです。","What made it 〜 was … の型。"],
 ["I'll never forget the moment when the sun rose over the clouds.","","雲の上に太陽がのぼった瞬間を決して忘れないでしょう。",""],
 ["Looking back, it taught me to appreciate nature.","","ふり返ると、それは自然のありがたさを教えてくれました。","Looking back=ふり返ると。"],
 ["The person I admire most is my grandmother.","","私がいちばん尊敬しているのは祖母です。",""],
 ["She always puts other people's needs before her own.","","彼女はいつも自分より他人のことを優先します。",""],
 ["That's pretty much everything I wanted to say about it.","","それについて言いたかったことは、だいたいこれで全部です。","Part 2 を自然に終える一言。"]]);
XU('x-ieltsl','IELTS ステップ12','IELTS STEP 12','en',[
 ["That's an interesting question. I've never really thought about it.","","おもしろい質問ですね。あまり考えたことがありませんでした。","Part 3 で考える時間をかせぐ表現。"],
 ["I'd say that technology has changed the way people communicate.","","技術は人々のコミュニケーションの仕方を変えたと言えるでしょう。","I'd say that 〜=〜と言えると思う。"],
 ["Compared to the past, young people today have far more choices.","","昔と比べて、今の若者にははるかに多くの選択肢があります。",""],
 ["One reason might be that people are busier than ever.","","一つの理由は、人々がかつてないほど忙しいことかもしれません。",""],
 ["I suppose it varies from person to person.","","人によって違うのではないかと思います。","vary from person to person=人それぞれだ。"],
 ["In the long run, I think this will benefit society.","","長い目で見れば、これは社会のためになると思います。","in the long run=長い目で見れば。"],
 ["There's a lot to be said for living in the countryside.","","田舎暮らしには利点がたくさんあります。","There's a lot to be said for 〜=〜には大いに利点がある。"],
 ["Having said that, cities offer better job opportunities.","","とはいえ、都市のほうが仕事の機会は多いです。","Having said that=そうは言っても。"]]);
XU('x-ieltsm','IELTS ステップ13','IELTS STEP 13','en',[
 ["Could you spell your surname for me, please?","","名字のつづりを教えていただけますか。","Listening Section 1 の定番。surname=名字。"],
 ["The tour departs from the main gate at half past nine.","","ツアーは9時半に正門から出発します。","half past nine=9時半。"],
 ["The library is open until eight on weekdays.","","図書館は平日は8時まで開いています。",""],
 ["You'll need to bring some form of identification.","","何らかの身分証明書を持ってくる必要があります。","identification=身分証明書。"],
 ["The deposit is non-refundable.","","手付金は返金されません。","non-refundable=返金不可の。"],
 ["Turn left at the roundabout and the car park is on your right.","","ロータリーを左に曲がると、駐車場は右側にあります。","roundabout・car park はイギリス英語。"],
 ["The lecture will focus on the causes of coastal erosion.","","講義は海岸侵食の原因に焦点を当てます。","Section 4 は講義形式。"],
 ["The researchers were surprised by the results of the experiment.","","研究者たちは実験の結果に驚きました。",""]]);
XU('x-ieltsn','IELTS ステップ14','IELTS STEP 14','en',[
 ["The writer suggests that bees are under threat.","","筆者は、ハチが危機にさらされていると示唆しています。","Reading: suggest=(遠回しに)示唆する。"],
 ["The passage does not give any information about this.","","本文にはこれについての情報がありません。","NOT GIVEN の判断の考え方。"],
 ["This statement contradicts what the author says.","","この文は筆者の言っていることと矛盾します。","FALSE の判断。contradict=矛盾する。"],
 ["The second paragraph describes the history of the canal.","","第2段落は運河の歴史を説明しています。","見出し(headings)問題のための要約。"],
 ["According to the text, the population has doubled since 1950.","","本文によると、人口は1950年から2倍になりました。","according to 〜=〜によると。"],
 ["The scientists disagree about the cause of the decline.","","科学者たちは減少の原因について意見が分かれています。",""],
 ["The word \"it\" in line 12 refers to the new policy.","","12行目の it は新しい政策を指しています。","refer to 〜=〜を指す。"],
 ["Skim the passage first to get the general idea.","","まず本文をざっと読んで大まかな内容をつかみましょう。","skim=ざっと読む。scan=特定の情報を探して読む。"]]);
XU('x-ieltso','IELTS ステップ15','IELTS STEP 15','en',[
 ["A growing number of people are working from home.","","在宅で働く人が増えています。","a growing number of 〜=増えている〜。"],
 ["This trend is likely to continue in the coming years.","","この傾向は今後数年続く可能性が高いです。",""],
 ["It is widely accepted that exercise improves mental health.","","運動が心の健康を良くすることは広く認められています。",""],
 ["There is no doubt that climate change is a serious issue.","","気候変動が深刻な問題であることは疑いありません。",""],
 ["Many experts argue that the risks have been exaggerated.","","多くの専門家は、危険が誇張されてきたと主張しています。","exaggerate=誇張する。"],
 ["This raises the question of who should be responsible.","","このことは、だれが責任を負うべきかという問題を提起します。","raise the question of 〜=〜という問題を提起する。"],
 ["Steps must be taken to protect endangered species.","","絶滅危惧種を守るための手段を講じなければなりません。","take steps=手段を講じる。"],
 ["To sum up, both individuals and governments have a role to play.","","まとめると、個人も政府も果たすべき役割があります。",""]]);
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
/* ---- TOEFL iBT: ステップ6〜15 (each 8 original phrases, 120 in all with ステップ1〜5) ---- */
XU('x-toeflf','TOEFL iBT ステップ6','TOEFL STEP 6','en',[
 ["The professor is mainly discussing how glaciers shape the landscape.","","教授は主に、氷河がどのように地形を作るかを論じています。","Listening の主題(main idea)をまとめる型。"],
 ["The lecture is about the migration patterns of monarch butterflies.","","講義はオオカバマダラ(チョウ)の渡りの型についてです。","migration=(動物の)移動・渡り。"],
 ["The professor mentions the pyramids to illustrate a point.","","教授は論点を説明するためにピラミッドにふれています。","Why does the professor mention 〜? の答え方。"],
 ["What does the professor imply about the theory?","","教授はその理論について何をほのめかしていますか。","imply=ほのめかす。設問の定番。"],
 ["The student goes to the office to ask about a scholarship.","","学生は奨学金について聞くために事務室に行きます。","会話問題の目的をまとめる型。"],
 ["According to the professor, the experiment had a major flaw.","","教授によると、その実験には大きな欠陥がありました。","flaw=欠陥。"],
 ["The professor's attitude toward the idea is skeptical.","","その考えに対する教授の態度は懐疑的です。","attitude 問題でよく出る形容詞。"],
 ["Listen again to part of the lecture.","","講義の一部をもう一度聞きなさい。","再生問題の指示文。"]]);
XU('x-toeflg','TOEFL iBT ステップ7','TOEFL STEP 7','en',[
 ["The word \"abundant\" in the passage is closest in meaning to \"plentiful.\"","","本文の abundant は plentiful にいちばん意味が近いです。","語彙問題の型。"],
 ["The author mentions coral reefs in order to provide an example.","","筆者は例を挙げるためにサンゴ礁にふれています。","in order to 〜=〜するために。"],
 ["Which of the following can be inferred from paragraph 3?","","第3段落から推測できるのは次のどれですか。","inference(推測)問題の定番。"],
 ["The highlighted sentence best expresses the essential information.","","強調された文は、重要な情報を最もよく表しています。","言い換え問題。"],
 ["According to paragraph 2, early farmers relied on seasonal floods.","","第2段落によると、初期の農民は季節ごとの洪水に頼っていました。","rely on 〜=〜に頼る。"],
 ["Look at the four squares that indicate where the sentence could be added.","","文を加えられる場所を示す4つの四角を見なさい。","文挿入問題の指示文。"],
 ["An introductory sentence for a brief summary of the passage is provided below.","","本文の短い要約のための導入文が下にあります。","要約問題の指示文。"],
 ["The passage mainly discusses the decline of ancient trade routes.","","本文は主に古代の交易路の衰退を論じています。",""]]);
XU('x-toeflh','TOEFL iBT ステップ8','TOEFL STEP 8','en',[
 ["The reading passage claims that the plan would save money.","","読み物は、その計画でお金が節約できると主張しています。","Integrated Writing: 読み物の主張を紹介。"],
 ["However, the lecturer casts doubt on this claim.","","しかし、講義の話し手はこの主張に疑問を投げかけています。","cast doubt on 〜=〜に疑問を投げかける。"],
 ["The lecturer argues that the costs have been underestimated.","","話し手は、費用が少なく見積もられていると主張しています。","underestimate=過小評価する。"],
 ["This contradicts the reading's point about public support.","","これは、世論の支持についての読み物の論点と食い違います。",""],
 ["She explains that the evidence is not reliable.","","彼女は、その証拠は信頼できないと説明しています。","reliable=信頼できる。"],
 ["Furthermore, the lecturer points out a problem the author ignores.","","さらに、話し手は筆者が無視している問題を指摘しています。","point out=指摘する。"],
 ["In short, the lecturer refutes all three points made in the reading.","","要するに、話し手は読み物の3つの論点すべてに反論しています。","refute=反論する・論破する。"],
 ["The example of the old bridge supports her argument.","","古い橋の例は彼女の主張を裏づけています。",""]]);
XU('x-toefli','TOEFL iBT ステップ9','TOEFL STEP 9','en',[
 ["I see where Professor Kim is coming from, but I have a different view.","","キム教授の考えの出どころはわかりますが、私は違う見方をしています。","Academic Discussion で他の意見にふれる型。"],
 ["Building on Maria's point, I'd like to add another reason.","","マリアの意見にもとづいて、もう一つ理由を加えたいと思います。","Building on 〜=〜をふまえて。"],
 ["While Ken makes a fair point, he overlooks the cost.","","ケンの指摘はもっともですが、費用を見落としています。","overlook=見落とす。"],
 ["In my view, schools should teach financial skills.","","私の考えでは、学校はお金の管理の技能を教えるべきです。",""],
 ["For instance, many young people struggle to manage their money.","","たとえば、多くの若者はお金の管理に苦労しています。","struggle to 〜=〜するのに苦労する。"],
 ["This would help students make better decisions in the future.","","これは学生が将来より良い判断をする助けになるでしょう。",""],
 ["That is why I believe this policy should be adopted.","","だからこそ、この方針を採用するべきだと考えます。","adopt=採用する。"],
 ["I'm convinced that the benefits would be long-lasting.","","その効果は長く続くと確信しています。","long-lasting=長続きする。"]]);
XU('x-toeflj','TOEFL iBT ステップ10','TOEFL STEP 10','en',[
 ["The university is planning to close the library on weekends.","","大学は週末に図書館を閉める予定です。","Speaking Task 2 の告知文の要約。"],
 ["The man is opposed to the plan for two reasons.","","男性は2つの理由でその計画に反対しています。","be opposed to 〜=〜に反対している。"],
 ["First, he says that many students study there on Saturdays.","","まず、彼は多くの学生が土曜日にそこで勉強すると言っています。",""],
 ["Second, he thinks the savings would be very small.","","次に、彼は節約になる額がとても少ないと考えています。",""],
 ["The woman's problem is that she has two exams on the same day.","","女性の問題は、同じ日に試験が2つあることです。","会話型タスクで問題点をまとめる型。"],
 ["The man suggests that she talk to her professor.","","男性は、彼女が教授と話すことを提案しています。","suggest that S + 動詞の原形(仮定法現在)。"],
 ["If I were her, I would choose the second option.","","私が彼女なら、2つ目の案を選ぶでしょう。","If I were 〜, I would …。"],
 ["The professor uses two examples to explain the concept.","","教授はその概念を説明するために2つの例を使っています。","講義要約タスクの書き出し。"]]);
XU('x-toeflk','TOEFL iBT ステップ11','TOEFL STEP 11','en',[
 ["Plants absorb carbon dioxide and release oxygen.","","植物は二酸化炭素を吸収し、酸素を放出します。","absorb=吸収する。release=放出する。"],
 ["The species adapted to the harsh desert environment.","","その種は厳しい砂漠の環境に適応しました。","adapt to 〜=〜に適応する。"],
 ["Predators play an important role in balancing the ecosystem.","","捕食者は生態系のバランスを保つのに重要な役割を果たします。","predator=捕食者。ecosystem=生態系。"],
 ["The theory was later supported by fossil evidence.","","その理論は後に化石の証拠によって裏づけられました。",""],
 ["Volcanic eruptions can affect the global climate for years.","","火山の噴火は何年にもわたって世界の気候に影響することがあります。",""],
 ["The cells divide rapidly during the early stages of growth.","","成長の初期段階で、細胞は急速に分裂します。","divide=分裂する。"],
 ["The temperature of the ocean varies with depth.","","海の温度は深さによって変わります。","vary with 〜=〜によって変わる。"],
 ["Scientists are still debating the cause of the extinction.","","科学者たちは絶滅の原因についてまだ議論しています。","extinction=絶滅。"]]);
XU('x-toefll','TOEFL iBT ステップ12','TOEFL STEP 12','en',[
 ["The Industrial Revolution transformed the way goods were produced.","","産業革命は製品の作り方を一変させました。","transform=一変させる。"],
 ["Trade between the two regions flourished in the 15th century.","","2つの地域の交易は15世紀に栄えました。","flourish=栄える。"],
 ["Many historians attribute the empire's collapse to economic problems.","","多くの歴史家は、帝国の崩壊を経済問題のせいだと考えています。","attribute A to B=AをBのせいにする。"],
 ["The invention of printing made books far more affordable.","","印刷の発明で本ははるかに手ごろな値段になりました。","affordable=手ごろな。"],
 ["Early settlers depended on the river for transportation.","","初期の入植者は交通手段を川に頼っていました。","settler=入植者。"],
 ["The architecture reflects the influence of Greek culture.","","その建築はギリシャ文化の影響を反映しています。",""],
 ["Artists of the period rejected traditional styles.","","その時代の芸術家たちは伝統的な様式を拒みました。",""],
 ["The economy gradually shifted from farming to manufacturing.","","経済は少しずつ農業から製造業へと移りました。",""]]);
XU('x-toeflm','TOEFL iBT ステップ13','TOEFL STEP 13','en',[
 ["Excuse me, Professor. Do you have a minute to talk about my paper?","","すみません、先生。私のレポートについて少しお話しできますか。","Office hours での話し始め。"],
 ["I was wondering if I could get an extension on the assignment.","","課題の提出期限を延ばしていただけないかと思いまして。","I was wondering if 〜=〜していただけないかと思って(ていねいな依頼)。"],
 ["I'm having trouble narrowing down my research topic.","","研究テーマをしぼりこむのに苦労しています。","narrow down=しぼりこむ。"],
 ["You might want to look at some recent journal articles.","","最近の学術論文をいくつか見てみるといいかもしれません。","You might want to 〜=〜するといいでしょう(やわらかい助言)。"],
 ["The registration deadline for next semester is approaching.","","来学期の履修登録の締め切りが近づいています。","semester=学期。"],
 ["I need to drop a course because of a scheduling conflict.","","時間割が重なるので、科目を一つ取り消す必要があります。","drop a course=履修をやめる。"],
 ["The dormitory will be closed during winter break.","","冬休みの間、寮は閉鎖されます。","dormitory=寮。"],
 ["You can find the form on the student services website.","","その用紙は学生サービスのウェブサイトにあります。",""]]);
XU('x-toefln','TOEFL iBT ステップ14','TOEFL STEP 14','en',[
 ["Listen to the sentence and repeat it exactly as you hear it.","","文を聞いて、聞こえたとおりにくり返しなさい。","Listen and Repeat の指示文。"],
 ["Welcome to the campus tour. Please stay with the group.","","キャンパスツアーへようこそ。グループから離れないでください。","短い文から長い文へ進むので、区切りを意識してくり返す。"],
 ["The science building is next to the main library.","","理科棟は中央図書館のとなりにあります。",""],
 ["Students can borrow up to ten books at a time.","","学生は一度に10冊まで本を借りられます。","up to 〜=最大〜まで。"],
 ["The cafeteria serves breakfast from seven to ten.","","学食は7時から10時まで朝食を出しています。",""],
 ["If you have any questions, ask a member of staff.","","質問があれば、職員に聞いてください。",""],
 ["Tell me about a skill you would like to learn and why.","","身につけたい技能とその理由について話してください。","Take an Interview の質問の型。"],
 ["What do you think is the most important quality of a good teacher?","","良い先生にとって最も大切な資質は何だと思いますか。","quality=資質・特質。"]]);
XU('x-toeflo','TOEFL iBT ステップ15','TOEFL STEP 15','en',[
 ["Dear Professor Lee, I am writing to ask about the field trip.","","リー先生、校外学習についてお聞きしたくご連絡しています。","Write an Email の書き出し。"],
 ["I would appreciate it if you could send me the details.","","詳細を送っていただけるとありがたいです。","I would appreciate it if you could 〜=〜していただけるとありがたい。"],
 ["Unfortunately, I will not be able to attend the meeting on Monday.","","残念ながら、月曜日の会議には出席できません。",""],
 ["Would it be possible to meet later in the week?","","週の後半にお会いすることはできますか。",""],
 ["I have attached a copy of my schedule for your reference.","","ご参考までに私の予定表を添付しました。","for your reference=ご参考までに。"],
 ["Thank you in advance for your help.","","よろしくお願いいたします。","メールの最後の決まり文句(前もってお礼を言う)。"],
 ["Please let me know if there is anything else I should prepare.","","ほかに準備しておくべきことがあれば教えてください。",""],
 ["I look forward to hearing from you.","","お返事をお待ちしております。","look forward to 〜ing。"]]);
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
XU('x-topik1f','TOPIK Ⅰ ステップ6','TOPIK I STEP 6','ko',[
 ["오늘이 며칠이에요?","オヌリ ミョチリエヨ","今日は何日ですか。","며칠=何日。"],
 ["수업은 아홉 시에 시작해요.","スオブン アホプ シエ シジャケヨ","授業は9時に始まります。","時刻の「〜時」には 한・두・세… のような固有数詞を使う。"],
 ["회의는 오후 두 시부터 네 시까지예요.","フェイヌン オフ トゥ シブト ネ シッカジエヨ","会議は午後2時から4時までです。","부터=から、까지=まで。"],
 ["토요일 오전에 시간 있어요?","トヨイル オジョネ シガン イッソヨ","土曜日の午前、時間ありますか。",""],
 ["저는 보통 일곱 시에 일어나요.","チョヌン ポトン イルゴプ シエ イロナヨ","私はふだん7時に起きます。","보통=ふだん。"],
 ["약속 시간에 늦지 마세요.","ヤクソク シガネ ヌッチ マセヨ","約束の時間に遅れないでください。","-지 마세요=〜しないでください。"],
 ["다음 주 월요일이 제 생일이에요.","タウム チュ ウォリョイリ チェ センイリエヨ","来週の月曜日は私の誕生日です。",""],
 ["숙제를 다 하고 나서 텔레비전을 봐요.","スクチェルル タ ハゴ ナソ テルレビジョヌル ポァヨ","宿題を全部してから、テレビを見ます。","-고 나서=〜してから。"]]);
XU('x-topik1g','TOPIK Ⅰ ステップ7','TOPIK I STEP 7','ko',[
 ["한국어를 배운 지 6개월 됐어요.","ハングゴルル ペウン ジ ユクケウォル トェッソヨ","韓国語を習って6か月になりました。","-(으)ㄴ 지 〜 되다=〜してから(期間)がたつ。"],
 ["단어를 외우는 게 어려워요.","タノルル ウェウヌン ゲ オリョウォヨ","単語を覚えるのが難しいです。","게=것이(〜のが)の話し言葉。"],
 ["선생님, 한 번 더 말씀해 주세요.","ソンセンニム ハン ボン ト マルスメ ジュセヨ","先生、もう一度おっしゃってください。","말씀하다=おっしゃる(尊敬語)。"],
 ["시험이 끝나면 같이 놀아요.","シホミ ックンナミョン カチ ノラヨ","試験が終わったら一緒に遊びましょう。","-(으)면=〜たら。"],
 ["이 문법은 잘 모르겠어요.","イ ムンポブン チャル モルゲッソヨ","この文法はよくわかりません。","모르겠어요=わかりません(やわらかい言い方)。"],
 ["사전을 찾아보세요.","サジョヌル チャジャボセヨ","辞書で調べてみてください。","찾아보다=調べる。"],
 ["숙제를 깜빡 잊어버렸어요.","スクチェルル ッカムッパク イジョボリョッソヨ","宿題をうっかり忘れてしまいました。","깜빡=うっかり、-아/어 버리다=〜してしまう。"],
 ["학교 앞 문구점에서 공책을 샀어요.","ハッキョ アム ムングジョメソ コンチェグル サッソヨ","学校の前の文房具店でノートを買いました。",""]]);
XU('x-topik1h','TOPIK Ⅰ ステップ8','TOPIK I STEP 8','ko',[
 ["우리 집은 학교에서 가까워요.","ウリ チブン ハッキョエソ カッカウォヨ","私の家は学校から近いです。","우리 집=私の家(「うちの家」の感覚)。"],
 ["방이 좁지만 깨끗해요.","パンイ チョプチマン ッケックテヨ","部屋は狭いけれど、きれいです。","-지만=〜けれど。"],
 ["쓰레기는 아침에 버려야 해요.","ッスレギヌン アチメ ポリョヤ ヘヨ","ごみは朝に出さなければなりません。","-아/어야 하다=〜しなければならない。"],
 ["창문 좀 열어 주실래요?","チャンムン チョム ヨロ ジュシルレヨ","窓を開けてくださいますか。","좀=ちょっと(頼むときにやわらげる)。"],
 ["세탁기가 고장 났어요.","セタッキガ コジャン ナッソヨ","洗濯機が故障しました。","고장 나다=故障する。"],
 ["엘리베이터가 없어서 계단으로 올라가요.","エルリベイトガ オプソソ ケダヌロ オルラガヨ","エレベーターがないので、階段で上がります。","-아/어서=〜ので。"],
 ["냉장고에 우유가 하나도 없어요.","ネンジャンゴエ ウユガ ハナド オプソヨ","冷蔵庫に牛乳がひとつもありません。","하나도 없다=ひとつもない。"],
 ["집에 오면 먼저 손을 씻어요.","チベ オミョン モンジョ ソヌル ッシソヨ","家に帰ったら、まず手を洗います。","먼저=まず、先に。"]]);
XU('x-topik1i','TOPIK Ⅰ ステップ9','TOPIK I STEP 9','ko',[
 ["비행기 표를 인터넷으로 예매했어요.","ピヘンギ ピョルル イントネスロ イェメヘッソヨ","飛行機のチケットをインターネットで予約しました。","예매=前売り・予約購入。"],
 ["출발 시간이 한 시간 늦어졌어요.","チュルバル シガニ ハン シガン ヌジョジョッソヨ","出発時刻が1時間遅れました。","늦어지다=(予定が)遅れる。"],
 ["창가 자리로 주세요.","チャンッカ チャリロ ジュセヨ","窓側の席にしてください。","창가=窓ぎわ。"],
 ["짐은 몇 킬로그램까지 부칠 수 있어요?","チムン ミョッ キルログレムッカジ プチル ス イッソヨ","荷物は何キロまで預けられますか。","부치다=(荷物を)預ける・送る。"],
 ["버스로 가면 30분쯤 걸려요.","ポスロ カミョン サムシップンッチュム コルリョヨ","バスで行くと30分くらいかかります。","쯤=くらい、걸리다=(時間が)かかる。"],
 ["여권을 보여 주세요.","ヨックォヌル ポヨ ジュセヨ","パスポートを見せてください。",""],
 ["제주도에 가 본 적이 있어요?","チェジュドエ カ ボン ジョギ イッソヨ","済州島に行ったことがありますか。","-아/어 본 적이 있다=〜したことがある。"],
 ["지하철 2호선으로 갈아타세요.","チハチョル イホソヌロ カラタセヨ","地下鉄2号線に乗り換えてください。","갈아타다=乗り換える。"]]);
XU('x-topik1j','TOPIK Ⅰ ステップ10','TOPIK I STEP 10','ko',[
 ["배가 아파서 아무것도 못 먹었어요.","ペガ アパソ アムゴット モン モゴッソヨ","お腹が痛くて、何も食べられませんでした。","아무것도=何も(否定と一緒に使う)。"],
 ["어제부터 목이 아파요.","オジェブト モギ アパヨ","昨日からのどが痛いです。",""],
 ["감기에 걸려서 콧물이 나요.","カムギエ コルリョソ コンムリ ナヨ","風邪をひいて鼻水が出ます。","감기에 걸리다=風邪をひく。"],
 ["이 약은 하루에 세 번 드세요.","イ ヤグン ハルエ セ ボン トゥセヨ","この薬は1日3回飲んでください。","드세요=召し上がってください(薬にも使う)。"],
 ["다리를 다쳐서 병원에 갔어요.","タリルル タチョソ ピョンウォネ カッソヨ","足をけがして病院に行きました。","다치다=けがをする。"],
 ["푹 쉬면 금방 나을 거예요.","プク スィミョン クムバン ナウル コエヨ","ゆっくり休めばすぐ治りますよ。","낫다=治る(ㅅ不規則:나아요)。"],
 ["요즘 잠을 잘 못 자요.","ヨジュム チャムル チャル モッ チャヨ","最近よく眠れません。","못=〜できない。"],
 ["건강을 위해서 매일 걸어요.","コンガンウル ウィヘソ メイル コロヨ","健康のために毎日歩いています。","-을/를 위해서=〜のために。"]]);
XU('x-topik1k','TOPIK Ⅰ ステップ11','TOPIK I STEP 11','ko',[
 ["이거 입어 봐도 돼요?","イゴ イボ ボァド トェヨ","これ、試着してもいいですか。","-아/어도 되다=〜してもいい。"],
 ["좀 깎아 주세요.","チョム ッカッカ ジュセヨ","少しまけてください。","깎다=値引きする(市場でよく使う)。"],
 ["이 사과는 한 개에 천 원이에요.","イ サグァヌン ハン ゲエ チョン ウォニエヨ","このりんごは1個1,000ウォンです。","에=〜につき。"],
 ["다른 색깔도 있어요?","タルン セッカルド イッソヨ","ほかの色もありますか。",""],
 ["영수증 주세요.","ヨンスジュン ジュセヨ","レシートをください。",""],
 ["이걸로 할게요.","イゴルロ ハルケヨ","これにします。","-(으)ㄹ게요=〜します(相手に約束する感じ)。"],
 ["교환이나 환불이 돼요?","キョファニナ ファンブリ トェヨ","交換か返金はできますか。","환불=払い戻し。"],
 ["백화점은 지금 세일 중이에요.","ペクァジョムン チグム セイル チュンイエヨ","デパートは今セール中です。",""]]);
XU('x-topik1l','TOPIK Ⅰ ステップ12','TOPIK I STEP 12','ko',[
 ["시험에 떨어져서 너무 속상해요.","シホメ ットロジョソ ノム ソクサンヘヨ","試験に落ちて、とても悔しいです。","속상하다=悔しい・心が痛む。"],
 ["친구가 이사를 가서 섭섭해요.","チングガ イサルル カソ ソプソペヨ","友だちが引っ越してしまって寂しいです。","섭섭하다=名残惜しい・寂しい。"],
 ["제 동생은 성격이 밝아요.","チェ トンセンウン ソンッキョギ パルガヨ","私の弟(妹)は性格が明るいです。","동생=年下のきょうだい(弟・妹どちらにも使う)。"],
 ["발표 전에는 항상 긴장돼요.","パルピョ ジョネヌン ハンサン キンジャンドェヨ","発表の前はいつも緊張します。","긴장되다=緊張する。"],
 ["그 말을 들으니까 기분이 좋아졌어요.","ク マルル トゥルニッカ キブニ チョアジョッソヨ","その言葉を聞いて気分がよくなりました。","듣다→들으니까(ㄷ不規則)。"],
 ["혼자 있으면 심심해요.","ホンジャ イッスミョン シムシメヨ","一人でいると退屈です。","심심하다=退屈だ・ひまだ。"],
 ["도와줘서 정말 고마워요.","トワジュォソ チョンマル コマウォヨ","手伝ってくれて本当にありがとう。",""],
 ["걱정하지 마세요. 잘될 거예요.","コクチョンハジ マセヨ チャルドェル コエヨ","心配しないでください。うまくいきますよ。",""]]);
XU('x-topik1m','TOPIK Ⅰ ステップ13','TOPIK I STEP 13','ko',[
 ["수하물 찾는 곳이 어디예요?","スハムル チャンヌン ゴシ オディエヨ","手荷物受取所はどこですか。","수하물=手荷物。"],
 ["탑승구는 몇 번이에요?","タプスングヌン ミョッ ポニエヨ","搭乗口は何番ですか。","탑승구=搭乗口。"],
 ["안전벨트를 매 주세요.","アンジョンベルトゥルル メ ジュセヨ","シートベルトをお締めください。","매다=締める。"],
 ["기내에서 담요를 받을 수 있어요?","キネエソ タムニョルル パドゥル ス イッソヨ","機内で毛布をもらえますか。",""],
 ["비행기가 곧 착륙하겠습니다.","ピヘンギガ コッ チャンニュカゲッスムニダ","飛行機はまもなく着陸いたします。","機内放送の言い方。-겠습니다=〜いたします。"],
 ["환승은 어디에서 해요?","ファンスンウン オディエソ ヘヨ","乗り継ぎはどこでしますか。","환승=乗り継ぎ・乗り換え。"],
 ["짐이 아직 안 나왔어요.","チミ アジク アン ナワッソヨ","荷物がまだ出てきません。",""],
 ["기장님의 안내 방송이 있겠습니다.","キジャンニメ アンネ パンソンイ イッケッスムニダ","機長からのご案内があります。","기장=機長。의 は「エ」と読むことが多い。"]]);
XU('x-topik1n','TOPIK Ⅰ ステップ14','TOPIK I STEP 14','ko',[
 ["비가 와서 우산을 샀어요.","ピガ ワソ ウサヌル サッソヨ","雨が降ったので、傘を買いました。","-아/어서=〜ので(理由)。"],
 ["밥을 먹은 후에 산책해요.","パブル モグン フエ サンチェケヨ","ご飯を食べた後で散歩します。","-(으)ㄴ 후에=〜した後で。"],
 ["자기 전에 이를 닦아요.","チャギ ジョネ イルル タッカヨ","寝る前に歯をみがきます。","-기 전에=〜する前に。"],
 ["음악을 들으면서 공부해요.","ウマグル トゥルミョンソ コンブヘヨ","音楽を聞きながら勉強します。","-(으)면서=〜しながら。"],
 ["한국에 가고 싶어서 돈을 모으고 있어요.","ハングゲ カゴ シポソ トヌル モウゴ イッソヨ","韓国に行きたくて、お金をためています。","-고 있다=〜している。"],
 ["이 책은 읽기 쉬워요.","イ チェグン イルッキ スィウォヨ","この本は読みやすいです。","-기 쉽다=〜しやすい。"],
 ["저 사람은 가수인 것 같아요.","チョ サラムン カスイン ゴッ カタヨ","あの人は歌手みたいです。","-인 것 같다=〜のようだ。"],
 ["날씨가 추워지니까 따뜻하게 입으세요.","ナルッシガ チュウォジニッカ ッタットゥタゲ イブセヨ","寒くなってきたから、暖かくして出かけてください。","-(으)니까=〜から(理由+勧め)。"]]);
XU('x-topik1o','TOPIK Ⅰ ステップ15','TOPIK I STEP 15','ko',[
 ["이번 주 토요일에 도서관은 쉽니다.","イボン チュ トヨイレ トソグァヌン スィムニダ","今週の土曜日、図書館は休館です。","お知らせの文はかたい -ㅂ니다 の形。"],
 ["신청은 금요일까지 해야 합니다.","シンチョンウン クミョイルッカジ ヘヤ ハムニダ","申し込みは金曜日までにしなければなりません。","신청=申し込み。"],
 ["수영장 안에서는 뛰지 마십시오.","スヨンジャン アネソヌン ットゥィジ マシプシオ","プールの中では走らないでください。","-지 마십시오=〜しないでください(掲示の言い方)。"],
 ["자세한 내용은 홈페이지를 참고하세요.","チャセハン ネヨンウン ホムペイジルル チャムゴハセヨ","詳しい内容はホームページを参考にしてください。","참고하다=参考にする。"],
 ["이 식당은 월요일마다 문을 닫습니다.","イ シクタンウン ウォリョイルマダ ムヌル タッスムニダ","この食堂は毎週月曜日が休みです。","문을 닫다=店を閉める・休む。"],
 ["행사에 오시는 분은 선물을 받을 수 있습니다.","ヘンサエ オシヌン ブヌン ソンムルル パドゥル ス イッスムニダ","イベントに来られた方はプレゼントがもらえます。","행사=イベント・行事。"],
 ["다음 글을 읽고 맞는 것을 고르십시오.","タウム クルル イルコ マンヌン ゴスル コルシプシオ","次の文を読んで、合っているものを選びなさい。","TOPIK の問題文によく出る指示。"],
 ["무엇에 대한 이야기인지 고르십시오.","ムオセ テハン イヤギインジ コルシプシオ","何についての話か選びなさい。","〜에 대한=〜についての。"]]);
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
XU('x-topik2f','TOPIK Ⅱ ステップ6','TOPIK II STEP 6','ko',[
 ["이번 프로젝트는 예정보다 일찍 끝났습니다.","イボン プロジェクトゥヌン イェジョンボダ イルッチク ックンナッスムニダ","今回のプロジェクトは予定より早く終わりました。","보다=〜より。"],
 ["회의 자료를 미리 준비해 두었습니다.","フェイ ジャリョルル ミリ チュンビヘ ドゥオッスムニダ","会議の資料をあらかじめ準備しておきました。","-아/어 두다=〜しておく。"],
 ["부장님께서 출장 중이셔서 제가 대신 말씀드리겠습니다.","プジャンニムッケソ チュルチャン ジュンイショソ チェガ テシン マルスムドゥリゲッスムニダ","部長が出張中ですので、私が代わりに申し上げます。","께서=が(尊敬)、말씀드리다=申し上げる。"],
 ["고객의 요구를 정확히 파악하는 것이 중요합니다.","コゲゲ ヨグルル チョンファキ パアカヌン ゴシ チュンヨハムニダ","顧客の要望を正確に把握することが重要です。","파악하다=把握する。"],
 ["근무 시간이 유연해져서 일하기가 편해졌습니다.","クンム シガニ ユヨネジョソ イラギガ ピョネジョッスムニダ","勤務時間が柔軟になって、働きやすくなりました。","-아/어지다=〜になる(変化)。"],
 ["신입 사원 교육은 다음 달부터 실시됩니다.","シニプ サウォン キョユグン タウム タルブト シルシドェムニダ","新入社員の研修は来月から実施されます。","실시되다=実施される。"],
 ["업무가 많아서 야근하는 날이 늘었어요.","オムムガ マナソ ヤグナヌン ナリ ヌロッソヨ","業務が多くて、残業する日が増えました。","야근=夜遅くまでの残業。"],
 ["동료들과 의견을 나누면서 좋은 아이디어가 나왔습니다.","トンニョドゥルグァ ウィギョヌル ナヌミョンソ チョウン アイディオガ ナワッスムニダ","同僚と意見を交わすうちに、いいアイデアが出ました。",""]]);
XU('x-topik2g','TOPIK Ⅱ ステップ7','TOPIK II STEP 7','ko',[
 ["저출산 문제가 심각해지고 있습니다.","チョチュルサン ムンジェガ シムガケジゴ イッスムニダ","少子化の問題が深刻になっています。","저출산=少子化。"],
 ["고령화로 인해 의료비가 증가하고 있습니다.","コリョンファロ イネ ウィリョビガ チュンガハゴ イッスムニダ","高齢化によって医療費が増えています。","〜(으)로 인해=〜によって(原因)。"],
 ["재택근무를 하는 사람이 많아졌습니다.","チェテククンムルル ハヌン サラミ マナジョッスムニダ","在宅勤務をする人が増えました。",""],
 ["온라인 쇼핑이 늘어나면서 작은 가게들이 어려움을 겪고 있습니다.","オルライン ショピンイ ヌロナミョンソ チャグン カゲドゥリ オリョウムル キョッコ イッスムニダ","ネット通販が増えるにつれて、小さな店が苦しんでいます。","겪다=(苦労を)経験する。"],
 ["세대 간의 갈등을 줄이려면 대화가 필요합니다.","セデ ガネ カルトゥンウル チュリリョミョン テファガ ピリョハムニダ","世代間の対立を減らすには対話が必要です。","갈등=対立、-(으)려면=〜するには。"],
 ["외국인 노동자의 수가 꾸준히 늘고 있습니다.","ウェグギン ノドンジャエ スガ ックジュニ ヌルゴ イッスムニダ","外国人労働者の数が着実に増えています。","꾸준히=着実に・こつこつと。"],
 ["스마트폰 사용 시간이 길어지면서 부작용도 생기고 있습니다.","スマトゥポン サヨン シガニ キロジミョンソ プジャギョンド センギゴ イッスムニダ","スマホの使用時間が長くなるにつれて、悪い影響も出ています。","부작용=副作用・悪い影響。"],
 ["이러한 변화에 맞춰 제도를 바꿀 필요가 있습니다.","イロハン ピョヌァエ マッチュォ チェドルル パックル ピリョガ イッスムニダ","こうした変化に合わせて制度を変える必要があります。","맞추다=合わせる。"]]);
XU('x-topik2h','TOPIK Ⅱ ステップ8','TOPIK II STEP 8','ko',[
 ["이 그래프는 연령별 독서량을 나타낸 것입니다.","イ グレプヌン ヨルリョンビョル トクソリャンウル ナタネン ゴシムニダ","このグラフは年齢別の読書量を表したものです。","나타내다=表す。"],
 ["조사 결과에 따르면 응답자의 40%가 '그렇다'고 답했습니다.","チョサ キョルグァエ ッタルミョン ウンダプチャエ サシプ ポセントゥガ クロタゴ タペッスムニダ","調査結果によると、回答者の40%が「そうだ」と答えました。","〜에 따르면=〜によると。"],
 ["2010년에 비해 두 배 이상 증가했습니다.","イチョンシムニョネ ピヘ トゥ ベ イサン チュンガヘッスムニダ","2010年に比べて2倍以上増加しました。","〜에 비해=〜に比べて。"],
 ["반면에 20대는 꾸준히 감소하는 추세입니다.","パンミョネ イシプテヌン ックジュニ カムソハヌン チュセイムニダ","一方で、20代は減り続ける傾向にあります。","추세=傾向・流れ。"],
 ["가장 큰 비율을 차지한 것은 '시간 부족'이었습니다.","カジャン クン ピユルル チャジハン ゴスン シガン プジョギオッスムニダ","最も大きな割合を占めたのは「時間不足」でした。","차지하다=占める。"],
 ["그 이유로는 비용 부담이 가장 많이 꼽혔습니다.","ク イユロヌン ピヨン プダミ カジャン マニ ッコピョッスムニダ","その理由としては費用の負担が最も多く挙げられました。","꼽히다=挙げられる。"],
 ["이러한 추세는 앞으로도 계속될 것으로 보입니다.","イロハン チュセヌン アプロド ケソクトェル コスロ ポイムニダ","この傾向は今後も続くとみられます。","-(으)ㄹ 것으로 보이다=〜とみられる。"],
 ["남성과 여성 사이에 큰 차이가 없었습니다.","ナムソングァ ヨソン サイエ クン チャイガ オプソッスムニダ","男性と女性の間に大きな差はありませんでした。",""]]);
XU('x-topik2i','TOPIK Ⅱ ステップ9','TOPIK II STEP 9','ko',[
 ["이에 대해 찬반 의견이 엇갈리고 있다.","イエ テヘ チャンバン ウィギョニ オッカルリゴ イッタ","これについて賛否の意見が分かれている。","作文は -다 体で書く。엇갈리다=食い違う。"],
 ["첫째, 경제적인 측면에서 살펴보면 다음과 같다.","チョッチェ キョンジェジョギン チュンミョネソ サルピョボミョン タウムグァ カッタ","第一に、経済的な面から見ると次のとおりである。","측면=側面。"],
 ["물론 이러한 주장에도 한계가 있다.","ムルロン イロハン チュジャンエド ハンゲガ イッタ","もちろん、このような主張にも限界がある。",""],
 ["그러므로 개인과 사회가 함께 노력해야 한다.","クロムロ ケイングァ サフェガ ハムッケ ノリョケヤ ハンダ","したがって、個人と社会がともに努力しなければならない。","그러므로=したがって(書き言葉)。"],
 ["이 문제를 해결하기 위한 방안은 다음과 같다.","イ ムンジェルル ヘギョラギ ウィハン パンアヌン タウムグァ カッタ","この問題を解決するための方策は次のとおりである。","방안=方策・案。"],
 ["무엇보다 중요한 것은 교육이라고 생각한다.","ムオッポダ チュンヨハン ゴスン キョユギラゴ センガカンダ","何より重要なのは教育だと考える。",""],
 ["이러한 현상이 나타나는 원인은 크게 두 가지이다.","イロハン ヒョンサンイ ナタナヌン ウォニヌン クゲ トゥ ガジイダ","こうした現象が現れる原因は大きく二つある。",""],
 ["이상의 내용을 정리하면 다음과 같다.","イサンエ ネヨンウル チョンニハミョン タウムグァ カッタ","以上の内容をまとめると次のとおりである。","정리하다=まとめる。"]]);
XU('x-topik2j','TOPIK Ⅱ ステップ10','TOPIK II STEP 10','ko',[
 ["늦잠을 자는 바람에 비행기를 놓쳤어요.","ヌッチャムル チャヌン パラメ ピヘンギルル ノチョッソヨ","寝坊したせいで飛行機に乗り遅れました。","-는 바람에=〜したせいで(思わぬ悪い結果)。"],
 ["그는 노래를 잘할 뿐만 아니라 춤도 잘 춰요.","クヌン ノレルル チャラル ップンマン アニラ チュムド チャル チュォヨ","彼は歌が上手なだけでなく、ダンスも上手です。","-(으)ㄹ 뿐만 아니라=〜だけでなく。"],
 ["아무리 바빠도 연락은 해 주세요.","アムリ パッパド ヨルラグン ヘ ジュセヨ","どんなに忙しくても連絡はしてください。","아무리 -아/어도=どんなに〜ても。"],
 ["비가 올까 봐 우산을 챙겼어요.","ピガ オルッカ ボァ ウサヌル チェンギョッソヨ","雨が降るといけないので、傘を持ってきました。","-(으)ㄹ까 봐=〜するといけないので。"],
 ["연습을 할수록 실력이 늘어요.","ヨンスブル ハルスロク シルリョギ ヌロヨ","練習すればするほど実力が伸びます。","-(으)ㄹ수록=〜するほど。"],
 ["길이 막히는 탓에 회의에 늦었습니다.","キリ マキヌン タセ フェイエ ヌジョッスムニダ","道が混んでいたせいで会議に遅れました。","-는 탓에=〜のせいで。"],
 ["한국에 온 지 얼마 안 돼서 아직 길을 잘 몰라요.","ハングゲ オン ジ オルマ アン ドェソ アジク キルル チャル モルラヨ","韓国に来てまだ間もないので、道がよくわかりません。",""],
 ["시간이 있었더라면 더 많이 도와줬을 거예요.","シガニ イッソットラミョン ト マニ トワジュォッスル コエヨ","時間があったら、もっと手伝ったのに。","-았/었더라면=〜だったなら(過去の仮定)。"]]);
XU('x-topik2k','TOPIK Ⅱ ステップ11','TOPIK II STEP 11','ko',[
 ["바쁘다고 해서 운동을 안 하면 안 돼요.","パップダゴ ヘソ ウンドンウル アン ハミョン アン ドェヨ","忙しいからといって運動をしないのはだめです。","-다고 해서=〜だからといって。"],
 ["그 소식을 듣자마자 공항으로 달려갔어요.","ク ソシグル トゥッチャマジャ コンハンウロ タルリョガッソヨ","その知らせを聞くとすぐ空港へ駆けつけました。","-자마자=〜するとすぐ。"],
 ["열심히 준비한 만큼 좋은 결과가 나올 거예요.","ヨルシミ チュンビハン マンクム チョウン キョルグァガ ナオル コエヨ","一生懸命準備した分だけ、いい結果が出るでしょう。","-(으)ㄴ 만큼=〜した分だけ。"],
 ["그 일은 제가 할 테니까 걱정하지 마세요.","ク イルン チェガ ハル テニッカ コクチョンハジ マセヨ","その仕事は私がやるから、心配しないでください。","-(으)ㄹ 테니까=〜するつもりだから。"],
 ["밤을 새우다시피 해서 보고서를 끝냈어요.","パムル セウダシピ ヘソ ポゴソルル ックンネッソヨ","ほとんど徹夜して報告書を仕上げました。","-다시피 하다=ほとんど〜するようにする。"],
 ["날씨가 좋길래 산책하러 나갔어요.","ナルッシガ チョキルレ サンチェカロ ナガッソヨ","天気がよかったので散歩に出かけました。","-길래=〜なので(話し言葉)。"],
 ["아는 사람이 하나도 없는 데다가 말도 안 통했어요.","アヌン サラミ ハナド オムヌン デダガ マルド アン トンヘッソヨ","知り合いが一人もいないうえに、言葉も通じませんでした。","-는 데다가=〜うえに。"],
 ["계획대로 된다면 내년에 졸업할 수 있을 거예요.","ケフェクテロ トェンダミョン ネニョネ チョロパル ス イッスル コエヨ","計画どおりにいけば、来年卒業できるでしょう。","〜대로=〜どおり。"]]);
XU('x-topik2l','TOPIK Ⅱ ステップ12','TOPIK II STEP 12','ko',[
 ["오늘 오후 서울 도심에서 대규모 행사가 열렸습니다.","オヌル オフ ソウル トシメソ テギュモ ヘンサガ ヨルリョッスムニダ","今日の午後、ソウルの都心で大規模なイベントが開かれました。","열리다=開かれる。"],
 ["정부는 새로운 대책을 발표했습니다.","チョンブヌン セロウン テチェグル パルピョヘッスムニダ","政府は新しい対策を発表しました。",""],
 ["이번 태풍으로 항공편 수십 편이 결항되었습니다.","イボン テプンウロ ハンゴンピョン スシプ ピョニ キョランドェオッスムニダ","今回の台風で航空便数十便が欠航しました。","결항=欠航。"],
 ["경찰은 사고 원인을 조사하고 있습니다.","キョンチャルン サゴ ウォニヌル チョサハゴ イッスムニダ","警察は事故の原因を調べています。",""],
 ["전문가들은 경기가 회복될 것으로 전망했습니다.","チョンムンガドゥルン キョンギガ フェボクトェル コスロ チョンマンヘッスムニダ","専門家たちは景気が回復すると予想しました。","전망하다=見通す・予想する。"],
 ["관계자에 따르면 피해는 크지 않은 것으로 알려졌습니다.","クァンゲジャエ ッタルミョン ピヘヌン クジ アヌン ゴスロ アルリョジョッスムニダ","関係者によると、被害は大きくないということです。","-(으)ㄴ 것으로 알려지다=〜と伝えられる。"],
 ["이 소식이 전해지자 시민들의 관심이 높아졌습니다.","イ ソシギ チョネジジャ シミンドゥレ クァンシミ ノパジョッスムニダ","このニュースが伝わると、市民の関心が高まりました。","-자=〜すると(書き言葉)。"],
 ["다음 소식입니다.","タウム ソシギムニダ","次のニュースです。","ニュースでよく聞く言い方。"]]);
XU('x-topik2m','TOPIK Ⅱ ステップ13','TOPIK II STEP 13','ko',[
 ["기상 악화로 출발이 지연되고 있습니다.","キサン アクァロ チュルバリ チヨンドェゴ イッスムニダ","天候の悪化により出発が遅れています。","지연=遅延。"],
 ["승객 여러분께 안내 말씀드리겠습니다.","スンゲン ニョロブンッケ アンネ マルスムドゥリゲッスムニダ","お客様にご案内申し上げます。","機内や空港の放送の決まった始め方。"],
 ["난기류 때문에 기체가 흔들릴 수 있습니다.","ナンギリュ ッテムネ キチェガ フンドゥルリル ス イッスムニダ","乱気流のため、機体が揺れることがあります。","난기류=乱気流。"],
 ["조종사가 되려면 오랫동안 비행 훈련을 받아야 합니다.","チョジョンサガ トェリョミョン オレットンアン ピヘン フルリョヌル パダヤ ハムニダ","パイロットになるには、長い間飛行訓練を受けなければなりません。","조종사=操縦士(パイロット)。"],
 ["관제탑의 허가를 받은 후에 이륙합니다.","クァンジェタベ ホガルル パドゥン フエ イリュカムニダ","管制塔の許可を受けてから離陸します。","관제탑=管制塔、이륙=離陸。"],
 ["면세점에서 산 물건은 기내에 가지고 탈 수 있습니다.","ミョンセジョメソ サン ムルゴヌン キネエ カジゴ タル ス イッスムニダ","免税店で買ったものは機内に持ち込めます。",""],
 ["현지 시각은 오후 3시 20분입니다.","ヒョンジ シガグン オフ セ シ イシップニムニダ","現地時刻は午後3時20分です。","시각=時刻。「時」は 세 시、「分」は 이십 분 と数え方が違う。"],
 ["비행 중에는 전자 기기를 비행기 모드로 설정해 주십시오.","ピヘン ジュンエヌン チョンジャ キギルル ピヘンギ モドゥロ ソルチョンヘ ジュシプシオ","飛行中は電子機器を機内モードに設定してください。",""]]);
XU('x-topik2n','TOPIK Ⅱ ステップ14','TOPIK II STEP 14','ko',[
 ["한글은 세종대왕이 만든 글자입니다.","ハングルン セジョンデワンイ マンドゥン クルチャイムニダ","ハングルは世宗大王が作った文字です。",""],
 ["설날에는 가족들이 모여 떡국을 먹습니다.","ソルラレヌン カジョクトゥリ モヨ ットックグル モクスムニダ","お正月には家族が集まってトックク(お雑煮)を食べます。","설날=旧正月。"],
 ["추석은 한 해의 수확에 감사하는 명절입니다.","チュソグン ハン ヘエ スファゲ カムサハヌン ミョンジョリムニダ","秋夕は一年の収穫に感謝する祝日です。","명절=伝統的な祝日。"],
 ["이 궁궐은 조선 시대에 지어졌습니다.","イ クングォルン チョソン シデエ チオジョッスムニダ","この宮殿は朝鮮時代に建てられました。","짓다→지어지다=建てられる。"],
 ["김치는 지역에 따라 맛이 조금씩 다릅니다.","キムチヌン チヨゲ ッタラ マシ チョグムッシク タルムニダ","キムチは地域によって味が少しずつ違います。","〜에 따라=〜によって。"],
 ["한복은 결혼식 같은 특별한 날에 입습니다.","ハンボグン キョロンシク カトゥン トゥクピョラン ナレ イプスムニダ","韓服は結婚式のような特別な日に着ます。",""],
 ["나이가 많은 사람에게는 존댓말을 씁니다.","ナイガ マヌン サラメゲヌン チョンデンマルル ッスムニダ","年上の人には敬語を使います。","존댓말=敬語。"],
 ["전통과 현대가 어우러진 도시가 인상적이었습니다.","チョントングァ ヒョンデガ オウロジン トシガ インサンジョギオッスムニダ","伝統と現代が調和した街が印象的でした。","어우러지다=調和する。"]]);
XU('x-topik2o','TOPIK Ⅱ ステップ15','TOPIK II STEP 15','ko',[
 ["그는 발이 넓어서 아는 사람이 많아요.","クヌン パリ ノルボソ アヌン サラミ マナヨ","彼は顔が広くて、知り合いが多いです。","발이 넓다=顔が広い(直訳:足が広い)。"],
 ["시험 결과를 기다리면서 손에 땀을 쥐었어요.","シホム キョルグァルル キダリミョンソ ソネ ッタムル チュィオッソヨ","試験の結果を待ちながら、手に汗を握りました。","손에 땀을 쥐다=手に汗を握る。"],
 ["세 살 버릇 여든까지 간다는 말이 있지요.","セ サル ポルン ニョドゥンッカジ カンダヌン マリ イッチヨ","「三つ子の魂百まで」という言葉がありますよね。","直訳:3歳の癖は80歳まで続く。"],
 ["그 사람은 입이 무거워서 믿을 수 있어요.","ク サラムン イビ ムゴウォソ ミドゥル ス イッソヨ","その人は口が堅いので信頼できます。","입이 무겁다=口が堅い(直訳:口が重い)。"],
 ["시작이 반이라고 하잖아요.","シジャギ パニラゴ ハジャナヨ","「始めれば半分終わったも同然」って言うじゃないですか。","-잖아요=〜じゃないですか。"],
 ["그 이야기를 듣고 귀가 솔깃했어요.","ク イヤギルル トゥッコ クィガ ソルギテッソヨ","その話を聞いて、心が引かれました。","귀가 솔깃하다=(話に)心が引かれる。"],
 ["낮말은 새가 듣고 밤말은 쥐가 듣는다.","ナンマルン セガ トゥッコ パムマルン チュィガ トゥンヌンダ","壁に耳あり障子に目あり。","直訳:昼の話は鳥が聞き、夜の話はねずみが聞く。"],
 ["그 일은 누워서 떡 먹기예요.","ク イルン ヌウォソ ットク モッキエヨ","その仕事は朝飯前です。","누워서 떡 먹기=とても簡単(直訳:寝ころんで餅を食べる)。"]]);
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
XU('x-dele-a2f','DELE A2 ステップ6','DELE A2 STEP 6','es',[
 ["Los lunes empiezo a trabajar a las ocho.","ロス ルネス エンピエソ ア トラバハル ア ラス オチョ","月曜日は8時から働き始めます。","empezar a+動詞の原形=〜し始める。"],
 ["Después de comer, siempre doy un paseo.","デスプエス デ コメル シエンプレ ドイ ウン パセオ","昼食のあとは、いつも散歩します。","dar un paseo=散歩する。スペインでは comer=昼食をとる。"],
 ["Los viernes me acuesto tarde.","ロス ビエルネス メ アクエスト タルデ","金曜日は遅く寝ます。","acostarse=寝る(ベッドに入る)。"],
 ["Antes de salir, cierro todas las ventanas.","アンテス デ サリル シエロ トダス ラス ベンタナス","出かける前に、窓を全部閉めます。","antes de+動詞の原形=〜する前に。"],
 ["Normalmente desayuno pan con tomate.","ノルマルメンテ デサジュノ パン コン トマテ","朝ごはんはふだん、トマトをのせたパンです。","desayunar=朝食をとる。"],
 ["Tardo veinte minutos en llegar al colegio.","タルド ベインテ ミヌトス エン ジェガル アル コレヒオ","学校に着くまで20分かかります。","tardar 〜 en+動詞の原形=…するのに〜かかる。"],
 ["Hoy no tengo nada que hacer.","オイ ノ テンゴ ナダ ケ アセル","今日はやることが何もありません。","no 〜 nada=何も〜ない。"],
 ["Los domingos comemos en casa de mis abuelos.","ロス ドミンゴス コメモス エン カサ デ ミス アブエロス","日曜日は祖父母の家でお昼を食べます。","en casa de 〜=〜の家で。"]]);
XU('x-dele-a2g','DELE A2 ステップ7','DELE A2 STEP 7','es',[
 ["¿Cómo se dice \"ventana\" en inglés?","コモ セ ディセ ベンタナ エン イングレス","「ventana」は英語で何と言いますか。","¿Cómo se dice 〜?=〜は何と言いますか。"],
 ["¿Me prestas tu diccionario?","メ プレスタス トゥ ディクシオナリオ","辞書を貸してくれる?","prestar=貸す。"],
 ["Mañana tenemos un examen de matemáticas.","マニャナ テネモス ウン エクサメン デ マテマティカス","明日は数学のテストがあります。",""],
 ["Se me olvidaron los deberes en casa.","セ メ オルビダロン ロス デベレス エン カサ","宿題を家に忘れてきてしまいました。","se me olvidó / olvidaron=(うっかり)忘れた。"],
 ["Mi asignatura favorita es la historia.","ミ アシグナトゥラ ファボリタ エス ラ イストリア","好きな教科は歴史です。","asignatura=教科。"],
 ["Tengo que estudiar más para mejorar mi pronunciación.","テンゴ ケ エストゥディアル マス パラ メホラル ミ プロヌンシアシオン","発音をよくするために、もっと勉強しないといけません。","para+動詞の原形=〜するために。"],
 ["Las clases terminan a las dos y media.","ラス クラセス テルミナン ア ラス ドス イ メディア","授業は2時半に終わります。","y media=〜時半。"],
 ["He sacado muy buena nota en el examen.","エ サカド ムイ ブエナ ノタ エン エル エクサメン","テストでとてもいい点を取りました。","sacar buena nota=いい点を取る。"]]);
XU('x-dele-a2h','DELE A2 ステップ8','DELE A2 STEP 8','es',[
 ["Mi piso tiene dos dormitorios y un baño.","ミ ピソ ティエネ ドス ドルミトリオス イ ウン バニョ","私のマンションは寝室が2つと浴室が1つです。","piso=(スペインで)マンションの部屋。"],
 ["El salón es pequeño, pero muy luminoso.","エル サロン エス ペケニョ ペロ ムイ ルミノソ","リビングは狭いけれど、とても明るいです。","luminoso=日当たりがよい・明るい。"],
 ["¿Puedes bajar la basura, por favor?","プエデス バハル ラ バスラ ポル ファボル","ごみを下に出してきてくれる?","bajar=下ろす・下に持っていく。"],
 ["La lavadora no funciona.","ラ ラバドラ ノ フンシオナ","洗濯機が動きません。","funcionar=(機械が)動く。"],
 ["No hay ascensor, así que subo por las escaleras.","ノ アイ アセンソル アシ ケ スボ ポル ラス エスカレラス","エレベーターがないので、階段で上がります。","escaleras=階段。"],
 ["En la nevera no queda leche.","エン ラ ネベラ ノ ケダ レチェ","冷蔵庫に牛乳が残っていません。","quedar=残っている。"],
 ["¿Te ayudo a poner la mesa?","テ アジュド ア ポネル ラ メサ","食卓の準備、手伝おうか。","poner la mesa=食卓を整える。"],
 ["Busco un piso cerca del centro.","ブスコ ウン ピソ セルカ デル セントロ","中心街の近くで部屋を探しています。","del=de+el。"]]);
XU('x-dele-a2i','DELE A2 ステップ9','DELE A2 STEP 9','es',[
 ["He comprado los billetes de avión por internet.","エ コンプラド ロス ビジェテス デ アビオン ポル インテルネット","飛行機のチケットをインターネットで買いました。","he comprado=現在完了(最近のこと)。"],
 ["El vuelo tiene una hora de retraso.","エル ブエロ ティエネ ウナ オラ デ レトラソ","便は1時間遅れています。","retraso=遅れ。"],
 ["¿Me da un asiento de ventanilla?","メ ダ ウン アシエント デ ベンタニジャ","窓側の席をお願いできますか。","ventanilla=(乗り物の)窓。"],
 ["¿Cuántos kilos de equipaje puedo facturar?","クアントス キロス デ エキパヘ プエド ファクトゥラル","荷物は何キロまで預けられますか。","facturar=(空港で荷物を)預ける。"],
 ["En autobús se tarda media hora.","エン アウトブス セ タルダ メディア オラ","バスだと30分かかります。","se tarda=(時間が)かかる。"],
 ["¿Dónde tengo que cambiar de línea?","ドンデ テンゴ ケ カンビアル デ リネア","どこで乗り換えればいいですか。","cambiar de línea=(地下鉄の)線を乗り換える。"],
 ["¿Has estado alguna vez en Barcelona?","アス エスタド アルグナ ベス エン バルセロナ","バルセロナに行ったことはある?","alguna vez=今までに。"],
 ["Un billete de ida y vuelta, por favor.","ウン ビジェテ デ イダ イ ブエルタ ポル ファボル","往復の切符を1枚ください。","ida y vuelta=往復。"]]);
XU('x-dele-a2j','DELE A2 ステップ10','DELE A2 STEP 10','es',[
 ["¿Desde cuándo tiene estos síntomas?","デスデ クアンド ティエネ エストス シントマス","いつからこの症状がありますか。","síntoma=症状。"],
 ["Me duele la garganta desde ayer.","メ ドゥエレ ラ ガルガンタ デスデ アジェル","昨日からのどが痛いです。",""],
 ["Estoy resfriado y tengo mocos.","エストイ レスフリアド イ テンゴ モコス","風邪をひいて鼻水が出ます。","estar resfriado=風邪をひいている。"],
 ["Tome esta pastilla tres veces al día.","トメ エスタ パスティジャ トレス ベセス アル ディア","この錠剤を1日3回飲んでください。","tome=飲んでください(tomar のていねいな命令)。"],
 ["Me he roto el brazo jugando al baloncesto.","メ エ ロト エル ブラソ フガンド アル バロンセスト","バスケットボールをしていて腕を骨折しました。","jugando=〜していて(現在分詞)。"],
 ["Si descansas, te pondrás bien pronto.","シ デスカンサス テ ポンドラス ビエン プロント","休めば、すぐによくなるよ。","ponerse bien=(体調が)よくなる。"],
 ["Últimamente duermo muy mal.","ウルティマメンテ ドゥエルモ ムイ マル","最近、ぜんぜんよく眠れません。","últimamente=最近。"],
 ["Para estar sano, camino una hora al día.","パラ エスタル サノ カミノ ウナ オラ アル ディア","健康でいるために、1日1時間歩いています。","al día=1日につき。"]]);
XU('x-dele-a2k','DELE A2 ステップ11','DELE A2 STEP 11','es',[
 ["¿Puedo probármelo?","プエド プロバルメロ","試着してもいいですか。","probarse=試着する。"],
 ["¿Me puede hacer un descuento?","メ プエデ アセル ウン デスクエント","少し安くしてもらえますか。","descuento=値引き。"],
 ["Las manzanas están a dos euros el kilo.","ラス マンサナス エスタン ア ドス エウロス エル キロ","りんごは1キロ2ユーロです。","estar a 〜=(値段が)〜だ。"],
 ["¿Lo tiene en otro color?","ロ ティエネ エン オトロ コロル","ほかの色はありますか。",""],
 ["¿Me da el tique, por favor?","メ ダ エル ティケ ポル ファボル","レシートをもらえますか。","tique=レシート(ticket とも書く)。"],
 ["Me lo llevo.","メ ロ ジェボ","これにします(買います)。","llevarse=(買って)持っていく。"],
 ["¿Puedo devolverlo si no me queda bien?","プエド デボルベルロ シ ノ メ ケダ ビエン","サイズが合わなかったら返品できますか。","quedar bien=(服が)合う・似合う。"],
 ["Las rebajas empiezan en enero.","ラス レバハス エンピエサン エン エネロ","セールは1月に始まります。","rebajas=(季節の)セール。"]]);
XU('x-dele-a2l','DELE A2 ステップ12','DELE A2 STEP 12','es',[
 ["Estoy muy nervioso por la entrevista.","エストイ ムイ ネルビオソ ポル ラ エントレビスタ","面接のことでとても緊張しています。","nervioso=緊張した。"],
 ["Me da pena que te vayas.","メ ダ ペナ ケ テ バジャス","あなたが行ってしまうのは寂しいです。","me da pena que+接続法=〜が残念・寂しい。"],
 ["Mi hermano pequeño es muy simpático.","ミ エルマノ ペケニョ エス ムイ シンパティコ","弟はとても感じがいいです。","simpático=感じがいい・親しみやすい。"],
 ["Estoy harto de esperar.","エストイ アルト デ エスペラル","待つのはもううんざりです。","estar harto de 〜=〜にうんざりする。"],
 ["¡Qué alegría verte!","ケ アレグリア ベルテ","会えてうれしい!","¡Qué 〜!=なんて〜だ。"],
 ["Me aburro cuando estoy solo.","メ アブロ クアンド エストイ ソロ","一人でいると退屈してしまいます。","aburrirse=退屈する。"],
 ["Gracias por echarme una mano.","グラシアス ポル エチャルメ ウナ マノ","手を貸してくれてありがとう。","echar una mano=手を貸す。"],
 ["No te preocupes, todo saldrá bien.","ノ テ プレオクペス トド サルドラ ビエン","心配しないで。きっとうまくいくよ。","salir bien=うまくいく。"]]);
XU('x-dele-a2m','DELE A2 ステップ13','DELE A2 STEP 13','es',[
 ["Su tarjeta de embarque, por favor.","ス タルヘタ デ エンバルケ ポル ファボル","搭乗券をお願いします。","tarjeta de embarque=搭乗券。"],
 ["¿Cuál es nuestra puerta de embarque?","クアル エス ヌエストラ プエルタ デ エンバルケ","私たちの搭乗口はどれですか。","puerta de embarque=搭乗口。"],
 ["Abróchense el cinturón, por favor.","アブロチェンセ エル シントゥロン ポル ファボル","シートベルトをお締めください。",""],
 ["¿Me podría traer una manta?","メ ポドリア トラエル ウナ マンタ","毛布を持ってきていただけますか。","podría=〜していただけますか(ていねい)。"],
 ["Vamos a aterrizar en unos minutos.","バモス ア アテリサル エン ウノス ミヌトス","あと数分で着陸します。","aterrizar=着陸する、despegar=離陸する。"],
 ["Tengo una escala en Madrid.","テンゴ ウナ エスカラ エン マドリ","マドリードで乗り継ぎがあります。","escala=乗り継ぎ・経由地。"],
 ["Mi maleta no ha llegado.","ミ マレタ ノ ア ジェガド","スーツケースが出てきていません。",""],
 ["Les habla el comandante.","レス アブラ エル コマンダンテ","こちらは機長です。","機長のアナウンスの始め方。comandante=機長。"]]);
XU('x-dele-a2n','DELE A2 ステップ14','DELE A2 STEP 14','es',[
 ["Estoy leyendo un libro muy interesante.","エストイ レジェンド ウン リブロ ムイ インテレサンテ","とてもおもしろい本を読んでいるところです。","estar+現在分詞=〜しているところ。"],
 ["Voy a estudiar después de cenar.","ボイ ア エストゥディアル デスプエス デ セナル","夕食のあとで勉強するつもりです。","ir a+動詞の原形=〜するつもり。"],
 ["Acabo de llegar a casa.","アカボ デ ジェガル ア カサ","ちょうど家に着いたところです。","acabar de+動詞の原形=〜したばかり。"],
 ["Hay que llevar el pasaporte.","アイ ケ ジェバル エル パサポルテ","パスポートを持っていかなければなりません。","hay que+動詞の原形=(一般に)〜しなければならない。"],
 ["Este libro es más fácil que aquel.","エステ リブロ エス マス ファシル ケ アケル","この本はあの本より簡単です。","más 〜 que …=…より〜。"],
 ["Llevo dos años viviendo aquí.","ジェボ ドス アニョス ビビエンド アキ","ここに住んで2年になります。","llevar+期間+現在分詞=〜して(期間)になる。"],
 ["Parece que va a llover.","パレセ ケ バ ア ジョベル","雨が降りそうです。","parece que 〜=〜のようだ。"],
 ["Cuando llegues, llámame.","クアンド ジェゲス ジャマメ","着いたら電話してね。","cuando+接続法=〜したら(これからのこと)。"]]);
XU('x-dele-a2o','DELE A2 ステップ15','DELE A2 STEP 15','es',[
 ["La biblioteca permanecerá cerrada este sábado.","ラ ビブリオテカ ペルマネセラ セラダ エステ サバド","今週の土曜日、図書館は休館です。","permanecer=〜のままである(お知らせの言い方)。"],
 ["El plazo de inscripción termina el viernes.","エル プラソ デ インスクリプシオン テルミナ エル ビエルネス","申し込みの締め切りは金曜日です。","plazo=期限。"],
 ["Prohibido correr en la zona de la piscina.","プロイビド コレル エン ラ ソナ デ ラ ピスシナ","プールでは走らないでください。","Prohibido+動詞の原形=〜禁止(掲示)。"],
 ["Para más información, consulte nuestra página web.","パラ マス インフォルマシオン コンスルテ ヌエストラ パヒナ ウェブ","詳しくはホームページをご覧ください。","consulte=ご覧ください(ていねいな命令)。"],
 ["El restaurante cierra los lunes.","エル レスタウランテ シエラ ロス ルネス","そのレストランは月曜日が定休日です。","los lunes=毎週月曜日。"],
 ["Los asistentes recibirán un regalo.","ロス アシステンテス レシビラン ウン レガロ","参加者はプレゼントがもらえます。","asistente=参加者・出席者。"],
 ["Lea el texto y elija la opción correcta.","レア エル テクスト イ エリハ ラ オプシオン コレクタ","文章を読んで、正しい選択肢を選びなさい。","DELE の問題文によく出る指示。"],
 ["Escuche la grabación dos veces.","エスクチェ ラ グラバシオン ドス ベセス","音声を2回聞きなさい。","escuche=聞いてください(ていねいな命令)。"]]);
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
XU('x-dele-b1f','DELE B1 ステップ6','DELE B1 STEP 6','es',[
 ["El proyecto se terminó antes de lo previsto.","エル プロジェクト セ テルミノ アンテス デ ロ プレビスト","プロジェクトは予定より早く終わりました。","antes de lo previsto=予定より早く。"],
 ["Ya he preparado los documentos para la reunión.","ジャ エ プレパラド ロス ドクメントス パラ ラ レウニオン","会議の資料はもう準備しました。","ya=もう。"],
 ["La directora está de viaje de negocios.","ラ ディレクトラ エスタ デ ビアヘ デ ネゴシオス","部長は出張中です。","estar de viaje=旅行(出張)中だ。"],
 ["Es fundamental entender lo que necesita el cliente.","エス フンダメンタル エンテンデル ロ ケ ネセシタ エル クリエンテ","顧客が必要としていることを理解するのが何より大切です。","lo que=〜すること・もの。"],
 ["Gracias al horario flexible, concilio mejor el trabajo y la familia.","グラシアス アル オラリオ フレクシブレ コンシリオ メホル エル トラバホ イ ラ ファミリア","柔軟な勤務時間のおかげで、仕事と家庭を両立しやすくなりました。","conciliar=両立させる。"],
 ["Busco un trabajo a tiempo parcial.","ブスコ ウン トラバホ ア ティエンポ パルシアル","パートタイムの仕事を探しています。","a tiempo parcial=パートタイムで。"],
 ["Últimamente hago muchas horas extra.","ウルティマメンテ アゴ ムチャス オラス エクストラ","最近、残業がとても多いです。","horas extra=残業。"],
 ["Me gustaría solicitar el puesto de recepcionista.","メ グスタリア ソリシタル エル プエスト デ レセプシオニスタ","受付係の職に応募したいのですが。","solicitar=申し込む・応募する。"]]);
XU('x-dele-b1g','DELE B1 ステップ7','DELE B1 STEP 7','es',[
 ["La población está envejeciendo rápidamente.","ラ ポブラシオン エスタ エンベヘシエンド ラピダメンテ","人口の高齢化が急速に進んでいます。","envejecer=年をとる・高齢化する。"],
 ["Cada vez más personas teletrabajan.","カダ ベス マス ペルソナス テレトラバハン","在宅で働く人がますます増えています。","cada vez más=ますます。"],
 ["Muchos jóvenes tienen dificultades para encontrar vivienda.","ムチョス ホベネス ティエネン ディフィクルタデス パラ エンコントラル ビビエンダ","多くの若者が住まい探しに苦労しています。","tener dificultades para 〜=〜するのに苦労する。"],
 ["Las tiendas pequeñas sufren por la compra en línea.","ラス ティエンダス ペケニャス スフレン ポル ラ コンプラ エン リネア","ネット通販のせいで小さな店が苦しんでいます。","sufrir=苦しむ。"],
 ["El diálogo entre generaciones es necesario.","エル ディアロゴ エントレ ヘネラシオネス エス ネセサリオ","世代間の対話が必要です。",""],
 ["Hoy en día casi todo el mundo tiene móvil.","オイ エン ディア カシ トド エル ムンド ティエネ モビル","今ではほとんどの人が携帯電話を持っています。","todo el mundo=みんな。"],
 ["El uso excesivo de las pantallas afecta al sueño.","エル ウソ エクスセシボ デ ラス パンタジャス アフェクタ アル スエニョ","画面の使いすぎは睡眠に影響します。","afectar a 〜=〜に影響する。"],
 ["Habría que adaptar las leyes a estos cambios.","アブリア ケ アダプタル ラス レジェス ア エストス カンビオス","法律をこうした変化に合わせるべきでしょう。","habría que+動詞の原形=〜すべきだろう。"]]);
XU('x-dele-b1h','DELE B1 ステップ8','DELE B1 STEP 8','es',[
 ["Te escribo para contarte una buena noticia.","テ エスクリボ パラ コンタルテ ウナ ブエナ ノティシア","いい知らせを伝えたくて書いています。","手紙・メールのよくある書き出し。"],
 ["Muchas gracias por tu invitación.","ムチャス グラシアス ポル トゥ インビタシオン","招待してくれて本当にありがとう。",""],
 ["Lamentablemente, no podré asistir a la fiesta.","ラメンタブレメンテ ノ ポドレ アシスティル ア ラ フィエスタ","残念ながら、パーティーには行けません。","asistir a 〜=〜に出席する。"],
 ["Le escribo para quejarme del servicio.","レ エスクリボ パラ ケハルメ デル セルビシオ","サービスについて苦情を申し上げたく、ご連絡しました。","quejarse de 〜=〜について苦情を言う。"],
 ["Le agradecería que me respondiera lo antes posible.","レ アグラデセリア ケ メ レスポンディエラ ロ アンテス ポシブレ","できるだけ早くお返事いただけるとありがたいです。","Le agradecería que+接続法過去=〜していただけるとありがたい。"],
 ["Te cuento cómo fue el viaje.","テ クエント コモ フエ エル ビアヘ","旅行がどうだったか話すね。","contar=話す・語る。"],
 ["Tengo muchas ganas de verte.","テンゴ ムチャス ガナス デ ベルテ","あなたに会えるのがとても楽しみです。","tener ganas de 〜=〜したい気持ちがある。"],
 ["Un abrazo muy fuerte.","ウン アブラソ ムイ フエルテ","大きなハグを送ります。","親しい人へのメールの結びの言葉。"]]);
XU('x-dele-b1i','DELE B1 ステップ9','DELE B1 STEP 9','es',[
 ["Hay opiniones a favor y en contra.","アイ オピニオネス ア ファボル イ エン コントラ","賛成と反対の両方の意見があります。","a favor=賛成、en contra=反対。"],
 ["En primer lugar, hay que tener en cuenta el coste.","エン プリメル ルガル アイ ケ テネル エン クエンタ エル コステ","まず第一に、費用を考えに入れる必要があります。","tener en cuenta=考慮する。"],
 ["Sin embargo, esta idea también tiene sus límites.","シン エンバルゴ エスタ イデア タンビエン ティエネ スス リミテス","しかし、この考えにも限界があります。","sin embargo=しかし。"],
 ["Por lo tanto, todos debemos colaborar.","ポル ロ タント トドス デベモス コラボラル","したがって、みんなが協力しなければなりません。","por lo tanto=したがって。"],
 ["Una posible solución sería mejorar el transporte público.","ウナ ポシブレ ソルシオン セリア メホラル エル トランスポルテ プブリコ","解決策の一つとして、公共交通をよくすることが考えられます。","sería=〜だろう(過去未来)。"],
 ["Desde mi punto de vista, la educación es lo más importante.","デスデ ミ プント デ ビスタ ラ エドゥカシオン エス ロ マス インポルタンテ","私の考えでは、教育がいちばん大切です。","desde mi punto de vista=私の考えでは。"],
 ["Este fenómeno se debe principalmente a dos causas.","エステ フェノメノ セ デベ プリンシパルメンテ ア ドス カウサス","この現象の主な原因は二つあります。","deberse a 〜=〜が原因だ。"],
 ["Para resumir, creo que es una buena medida.","パラ レスミル クレオ ケ エス ウナ ブエナ メディダ","まとめると、それはいい対策だと思います。","para resumir=まとめると。"]]);
XU('x-dele-b1j','DELE B1 ステップ10','DELE B1 STEP 10','es',[
 ["Quiero que vengas a mi fiesta.","キエロ ケ ベンガス ア ミ フィエスタ","私のパーティーに来てほしいです。","querer que+接続法=(人に)〜してほしい。"],
 ["Ojalá haga buen tiempo mañana.","オハラ アガ ブエン ティエンポ マニャナ","明日、天気がいいといいな。","ojalá+接続法=〜だといいな。"],
 ["Aunque llueva, iremos de excursión.","アウンケ ジュエバ イレモス デ エクスクルシオン","たとえ雨が降っても、遠足に行きます。","aunque+接続法=たとえ〜でも。"],
 ["Me alegro de que hayas aprobado.","メ アレグロ デ ケ アジャス アプロバド","合格したなんて、うれしいよ。","alegrarse de que+接続法=〜がうれしい。"],
 ["No creo que sea tan difícil.","ノ クレオ ケ セア タン ディフィシル","そんなに難しいとは思いません。","no creo que+接続法=〜とは思わない。"],
 ["Busco a alguien que hable japonés.","ブスコ ア アルギエン ケ アブレ ハポネス","日本語を話せる人を探しています。","いるかどうかわからない人を表すときは接続法。"],
 ["Te lo digo para que lo sepas.","テ ロ ディゴ パラ ケ ロ セパス","知っておいてほしいから言うね。","para que+接続法=〜するように。"],
 ["Antes de que te vayas, quiero darte algo.","アンテス デ ケ テ バジャス キエロ ダルテ アルゴ","君が行ってしまう前に、渡したいものがあるんだ。","antes de que+接続法=〜する前に。"]]);
XU('x-dele-b1k','DELE B1 ステップ11','DELE B1 STEP 11','es',[
 ["Me quedé dormido y perdí el vuelo.","メ ケデ ドルミド イ ペルディ エル ブエロ","寝過ごして飛行機に乗り遅れました。","quedarse dormido=寝過ごす。"],
 ["No solo canta bien, sino que también baila muy bien.","ノ ソロ カンタ ビエン シノ ケ タンビエン バイラ ムイ ビエン","歌がうまいだけでなく、ダンスもとても上手です。","no solo 〜 sino que también …=〜だけでなく…も。"],
 ["Por mucho que estudie, no lo entiendo.","ポル ムチョ ケ エストゥディエ ノ ロ エンティエンド","どんなに勉強しても、わかりません。","por mucho que+接続法=どんなに〜しても。"],
 ["Llévate el paraguas por si llueve.","ジェバテ エル パラグアス ポル シ ジュエベ","雨が降るといけないから、傘を持っていきなさい。","por si 〜=〜の場合に備えて。"],
 ["Cuanto más practicas, más mejoras.","クアント マス プラクティカス マス メホラス","練習すればするほど上達します。","cuanto más 〜, más …=〜すればするほど…。"],
 ["En cuanto supe la noticia, fui al aeropuerto.","エン クアント スペ ラ ノティシア フイ アル アエロプエルト","その知らせを知るとすぐ、空港へ行きました。","en cuanto=〜するとすぐ。"],
 ["Si hubiera tenido tiempo, te habría ayudado.","シ ウビエラ テニド ティエンポ テ アブリア アジュダド","時間があったら、手伝ってあげたのに。","過去の事実に反する仮定。"],
 ["Según lo previsto, me graduaré el año que viene.","セグン ロ プレビスト メ グラドゥアレ エル アニョ ケ ビエネ","予定どおりなら、来年卒業します。","según lo previsto=予定どおり。"]]);
XU('x-dele-b1l','DELE B1 ステップ12','DELE B1 STEP 12','es',[
 ["Miles de personas se manifestaron ayer en Madrid.","ミレス デ ペルソナス セ マニフェスタロン アジェル エン マドリ","昨日マドリードで数千人がデモをしました。","manifestarse=デモをする。"],
 ["El Gobierno ha anunciado nuevas medidas.","エル ゴビエルノ ア アヌンシアド ヌエバス メディダス","政府は新しい対策を発表しました。","medida=対策・措置。"],
 ["Decenas de vuelos han sido cancelados por la tormenta.","デセナス デ ブエロス アン シド カンセラドス ポル ラ トルメンタ","嵐のため、数十便が欠航になりました。","decenas de 〜=数十の〜。"],
 ["La policía investiga las causas del accidente.","ラ ポリシア インベスティガ ラス カウサス デル アクシデンテ","警察は事故の原因を調べています。",""],
 ["Los expertos prevén que la economía se recupere.","ロス エクスペルトス プレベン ケ ラ エコノミア セ レクペレ","専門家たちは経済が回復すると予想しています。","prever=予想する。"],
 ["Según fuentes oficiales, no hay heridos.","セグン フエンテス オフィシアレス ノ アイ エリドス","公式な情報によると、けが人はいません。","fuente=情報源。"],
 ["La noticia ha despertado un gran interés.","ラ ノティシア ア デスペルタド ウン グラン インテレス","そのニュースは大きな関心を集めています。","despertar interés=関心を呼ぶ。"],
 ["Y ahora pasamos a la información deportiva.","イ アオラ パサモス ア ラ インフォルマシオン デポルティバ","では、スポーツのニュースです。","pasar a 〜=〜に移る。"]]);
XU('x-dele-b1m','DELE B1 ステップ13','DELE B1 STEP 13','es',[
 ["Debido al mal tiempo, la salida se ha retrasado.","デビド アル マル ティエンポ ラ サリダ セ ア レトラサド","悪天候のため、出発が遅れています。","debido a 〜=〜のため。"],
 ["Señoras y señores, bienvenidos a bordo.","セニョラス イ セニョレス ビエンベニドス ア ボルド","皆さま、ご搭乗ありがとうございます。","a bordo=機内に。"],
 ["Es posible que haya turbulencias.","エス ポシブレ ケ アジャ トゥルブレンシアス","乱気流で揺れるおそれがあります。","es posible que+接続法=〜かもしれない。"],
 ["Para ser piloto hacen falta muchas horas de vuelo.","パラ セル ピロト アセン ファルタ ムチャス オラス デ ブエロ","パイロットになるには、たくさんの飛行時間が必要です。","hacer falta=必要だ。"],
 ["El avión despegará cuando la torre lo autorice.","エル アビオン デスペガラ クアンド ラ トレ ロ アウトリセ","管制塔が許可したら、飛行機は離陸します。","torre (de control)=管制塔。"],
 ["Los productos comprados en la tienda libre de impuestos pueden llevarse a bordo.","ロス プロドゥクトス コンプラドス エン ラ ティエンダ リブレ デ インプエストス プエデン ジェバルセ ア ボルド","免税店で買った商品は機内に持ち込めます。","libre de impuestos=免税の。"],
 ["La hora local es las tres y veinte de la tarde.","ラ オラ ロカル エス ラス トレス イ ベインテ デ ラ タルデ","現地時刻は午後3時20分です。","de la tarde=午後の。"],
 ["Pongan sus dispositivos en modo avión.","ポンガン スス ディスポシティボス エン モド アビオン","電子機器を機内モードにしてください。","pongan=〜してください(ustedes への命令)。"]]);
XU('x-dele-b1n','DELE B1 ステップ14','DELE B1 STEP 14','es',[
 ["En Nochevieja se comen doce uvas.","エン ノチェビエハ セ コメン ドセ ウバス","大みそかには12粒のぶどうを食べます。","スペインの習慣。夜12時の鐘に合わせて1粒ずつ食べる。"],
 ["La siesta es una costumbre tradicional española.","ラ シエスタ エス ウナ コストゥンブレ トラディシオナル エスパニョラ","昼寝(シエスタ)はスペインの伝統的な習慣です。","costumbre=習慣。"],
 ["En España se cena bastante tarde.","エン エスパニャ セ セナ バスタンテ タルデ","スペインでは夕食をかなり遅く食べます。","se+動詞=(一般に人は)〜する。"],
 ["Este palacio se construyó en el siglo XVI.","エステ パラシオ セ コンストルジョ エン エル シグロ ディエシセイス","この宮殿は16世紀に建てられました。","se construyó=建てられた(受け身の se)。XVI は16。"],
 ["La paella es originaria de Valencia.","ラ パエジャ エス オリヒナリア デ バレンシア","パエリアはバレンシア発祥です。","ser originario de 〜=〜が発祥だ。"],
 ["En muchos países de Latinoamérica se usa \"ustedes\" en vez de \"vosotros\".","エン ムチョス パイセス デ ラティノアメリカ セ ウサ ウステデス エン ベス デ ボソトロス","中南米の多くの国では、vosotros の代わりに ustedes を使います。","en vez de 〜=〜の代わりに。"],
 ["Me encanta el flamenco, sobre todo el baile.","メ エンカンタ エル フラメンコ ソブレ トド エル バイレ","フラメンコが大好きです。特に踊りが。","sobre todo=特に。"],
 ["Me impresionó la mezcla de tradición y modernidad.","メ インプレシオノ ラ メスクラ デ トラディシオン イ モデルニダ","伝統と現代が混ざり合っているのが印象的でした。","impresionar=強い印象を与える。"]]);
XU('x-dele-b1o','DELE B1 ステップ15','DELE B1 STEP 15','es',[
 ["Eso es pan comido.","エソ エス パン コミド","そんなの朝飯前です。","直訳:食べたパン。"],
 ["Estaba en las nubes y no oí la pregunta.","エスタバ エン ラス ヌベス イ ノ オイ ラ プレグンタ","ぼんやりしていて、質問が聞こえませんでした。","estar en las nubes=ぼんやりしている(直訳:雲の中にいる)。"],
 ["Más vale tarde que nunca.","マス バレ タルデ ケ ヌンカ","遅くても、やらないよりはまし。","ことわざ。"],
 ["No tiene pelos en la lengua.","ノ ティエネ ペロス エン ラ レングア","あの人は思ったことをはっきり言います。","直訳:舌に毛がない。"],
 ["Me costó un ojo de la cara.","メ コスト ウン オホ デ ラ カラ","目玉が飛び出るほど高かったです。","costar un ojo de la cara=とても高い(直訳:顔の目ひとつ分かかる)。"],
 ["Tengo que ponerme las pilas con el examen.","テンゴ ケ ポネルメ ラス ピラス コン エル エクサメン","試験に向けて本気を出さないと。","ponerse las pilas=気合を入れる(直訳:電池を入れる)。"],
 ["En boca cerrada no entran moscas.","エン ボカ セラダ ノ エントラン モスカス","口は災いのもと。","直訳:閉じた口にはハエは入らない。"],
 ["Poco a poco se va lejos.","ポコ ア ポコ セ バ レホス","少しずつでも続ければ遠くまで行ける。","ことわざ。「継続は力なり」に近い。"]]);
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
XU('x-cils-a2f','CILS A2 ステップ6','CILS A2 STEP 6','it',[
 ["Il lunedì comincio a lavorare alle otto.","イル ルネディ コミンチョ ア ラヴォラーレ アッレ オット","月曜日は8時から働き始めます。","cominciare a+動詞の原形=〜し始める。"],
 ["Dopo pranzo faccio sempre una passeggiata.","ドーポ プランツォ ファッチョ センプレ ウナ パッセッジャータ","昼食のあとは、いつも散歩します。","fare una passeggiata=散歩する。"],
 ["Il venerdì vado a letto tardi.","イル ヴェネルディ ヴァード ア レット タルディ","金曜日は遅く寝ます。","andare a letto=寝る(ベッドに入る)。"],
 ["Prima di uscire, chiudo tutte le finestre.","プリーマ ディ ウッシーレ キウード トゥッテ レ フィネストレ","出かける前に、窓を全部閉めます。","prima di+動詞の原形=〜する前に。"],
 ["Di solito a colazione prendo un cappuccino e un cornetto.","ディ ソーリト ア コラツィオーネ プレンド ウン カップッチーノ エ ウン コルネット","朝ごはんはふだん、カプチーノとクロワッサンです。","cornetto=イタリアのクロワッサン。"],
 ["Ci metto venti minuti per arrivare a scuola.","チ メット ヴェンティ ミヌーティ ペル アッリヴァーレ ア スクオーラ","学校に着くまで20分かかります。","metterci 〜=(時間が)〜かかる。"],
 ["Oggi non ho niente da fare.","オッジ ノン オ ニエンテ ダ ファーレ","今日はやることが何もありません。","non 〜 niente=何も〜ない。"],
 ["La domenica pranziamo dai nonni.","ラ ドメーニカ プランツィアーモ ダイ ノンニ","日曜日は祖父母の家でお昼を食べます。","da+人=〜の家で。"]]);
XU('x-cils-a2g','CILS A2 ステップ7','CILS A2 STEP 7','it',[
 ["Come si dice \"finestra\" in inglese?","コメ スィ ディーチェ フィネストラ イン イングレーゼ","「finestra」は英語で何と言いますか。","Come si dice 〜?=〜は何と言いますか。"],
 ["Mi presti il tuo dizionario?","ミ プレスティ イル トゥオ ディツィオナーリオ","辞書を貸してくれる?","prestare=貸す。"],
 ["Domani abbiamo una verifica di matematica.","ドマーニ アッビアーモ ウナ ヴェリーフィカ ディ マテマーティカ","明日は数学のテストがあります。","verifica=(学校の)テスト。"],
 ["Ho dimenticato i compiti a casa.","オ ディメンティカート イ コンピティ ア カーザ","宿題を家に忘れてきてしまいました。","dimenticare=忘れる。"],
 ["La mia materia preferita è la storia.","ラ ミア マテーリア プレフェリータ エ ラ ストーリア","好きな教科は歴史です。","materia=教科。"],
 ["Devo studiare di più per migliorare la pronuncia.","デーヴォ ストゥディアーレ ディ ピウ ペル ミリオラーレ ラ プロヌンチャ","発音をよくするために、もっと勉強しないといけません。","per+動詞の原形=〜するために。"],
 ["Le lezioni finiscono alle due e mezza.","レ レツィオーニ フィニスコノ アッレ ドゥーエ エ メッザ","授業は2時半に終わります。","e mezza=〜時半。"],
 ["Ho preso un bel voto all'esame.","オ プレーゾ ウン ベル ヴォート アッレザーメ","試験でいい点を取りました。","prendere un bel voto=いい点を取る。"]]);
XU('x-cils-a2h','CILS A2 ステップ8','CILS A2 STEP 8','it',[
 ["Il mio appartamento ha due camere da letto e un bagno.","イル ミオ アッパルタメント ア ドゥーエ カーメレ ダ レット エ ウン バーニョ","私のマンションは寝室が2つと浴室が1つです。","camera da letto=寝室。"],
 ["Il soggiorno è piccolo, ma molto luminoso.","イル ソッジョルノ エ ピッコロ マ モルト ルミノーゾ","リビングは狭いけれど、とても明るいです。","luminoso=日当たりがよい・明るい。"],
 ["Puoi buttare la spazzatura, per favore?","プオイ ブッターレ ラ スパッツァトゥーラ ペル ファヴォーレ","ごみを捨ててきてくれる?","buttare=捨てる。"],
 ["La lavatrice non funziona.","ラ ラヴァトリーチェ ノン フンツィオーナ","洗濯機が動きません。","funzionare=(機械が)動く。"],
 ["Non c'è l'ascensore, quindi salgo a piedi.","ノン チェ ラッシェンソーレ クインディ サルゴ ア ピエーディ","エレベーターがないので、階段で上がります。","a piedi=歩いて。"],
 ["In frigo non c'è più latte.","イン フリーゴ ノン チェ ピウ ラッテ","冷蔵庫に牛乳が残っていません。","non 〜 più=もう〜ない。"],
 ["Ti aiuto ad apparecchiare la tavola?","ティ アイウート アド アッパレッキアーレ ラ ターヴォラ","食卓の準備、手伝おうか。","apparecchiare la tavola=食卓を整える。"],
 ["Cerco un appartamento vicino al centro.","チェルコ ウン アッパルタメント ヴィチーノ アル チェントロ","中心街の近くで部屋を探しています。","al=a+il。"]]);
XU('x-cils-a2i','CILS A2 ステップ9','CILS A2 STEP 9','it',[
 ["Ho comprato i biglietti aerei su internet.","オ コンプラート イ ビリエッティ アエーレイ ス インテルネット","飛行機のチケットをインターネットで買いました。","ho comprato=近過去(過去のこと)。"],
 ["Il volo ha un'ora di ritardo.","イル ヴォーロ ア ウノーラ ディ リタルド","便は1時間遅れています。","ritardo=遅れ。"],
 ["Preferisco un posto lato finestrino.","プレフェリスコ ウン ポスト ラート フィネストリーノ","窓側の席のほうがいいです。","lato finestrino=窓側。"],
 ["Quanti chili di bagaglio posso imbarcare?","クアンティ キーリ ディ バガーリョ ポッソ インバルカーレ","荷物は何キロまで預けられますか。","imbarcare=(荷物を)預ける。"],
 ["In autobus ci vuole mezz'ora.","イン アウトブス チ ヴオーレ メッゾーラ","バスだと30分かかります。","ci vuole=(時間が)かかる。"],
 ["Dove devo cambiare linea?","ドーヴェ デーヴォ カンビアーレ リーネア","どこで乗り換えればいいですか。","cambiare linea=(地下鉄の)線を乗り換える。"],
 ["Sei mai stato a Venezia?","セイ マイ スタート ア ヴェネーツィア","ヴェネツィアに行ったことはある?","mai=今までに(疑問文で)。"],
 ["Un biglietto di andata e ritorno, per favore.","ウン ビリエット ディ アンダータ エ リトルノ ペル ファヴォーレ","往復の切符を1枚ください。","andata e ritorno=往復。"]]);
XU('x-cils-a2j','CILS A2 ステップ10','CILS A2 STEP 10','it',[
 ["Cosa c'è che non va?","コーザ チェ ケ ノン ヴァ","どうなさいましたか。","病院でよく聞く質問。"],
 ["Mi fa male la gola da ieri.","ミ ファ マーレ ラ ゴーラ ダ イエーリ","昨日からのどが痛いです。",""],
 ["Ho il raffreddore e il naso che cola.","オ イル ラッフレッドーレ エ イル ナーゾ ケ コーラ","風邪をひいて鼻水が出ます。","avere il raffreddore=風邪をひいている。"],
 ["Prenda questa pastiglia tre volte al giorno.","プレンダ クエスタ パスティーリャ トレ ヴォルテ アル ジョルノ","この錠剤を1日3回飲んでください。","prenda=飲んでください(prendere のていねいな命令)。"],
 ["Mi sono rotto il braccio giocando a basket.","ミ ソーノ ロット イル ブラッチョ ジョカンド ア バスケット","バスケットボールをしていて腕を骨折しました。","giocando=〜していて(ジェルンディオ)。"],
 ["Se ti riposi, guarirai presto.","セ ティ リポーズィ グアリライ プレスト","休めば、すぐによくなるよ。","guarire=(病気が)治る。"],
 ["Ultimamente dormo molto male.","ウルティマメンテ ドルモ モルト マーレ","最近、ぜんぜんよく眠れません。","ultimamente=最近。"],
 ["Per stare in forma, cammino un'ora al giorno.","ペル スターレ イン フォルマ カンミーノ ウノーラ アル ジョルノ","健康でいるために、1日1時間歩いています。","stare in forma=体調がいい・健康でいる。"]]);
XU('x-cils-a2k','CILS A2 ステップ11','CILS A2 STEP 11','it',[
 ["Posso provarlo?","ポッソ プロヴァルロ","試着してもいいですか。","provare=試す・試着する。"],
 ["Mi può fare uno sconto?","ミ プオ ファーレ ウーノ スコント","少し安くしてもらえますか。","sconto=値引き。"],
 ["Le mele costano due euro al chilo.","レ メーレ コスタノ ドゥーエ エウロ アル キーロ","りんごは1キロ2ユーロです。","al chilo=1キロあたり。"],
 ["Ce l'ha in un altro colore?","チェ ラ イン ウン アルトロ コローレ","ほかの色はありますか。",""],
 ["Mi dà lo scontrino, per favore?","ミ ダ ロ スコントリーノ ペル ファヴォーレ","レシートをもらえますか。","scontrino=レシート。"],
 ["Lo prendo.","ロ プレンド","これにします(買います)。","prendere=(買うものに)決める。"],
 ["Posso cambiarlo se non mi sta bene?","ポッソ カンビアルロ セ ノン ミ スタ ベーネ","サイズが合わなかったら交換できますか。","stare bene=(服が)合う・似合う。"],
 ["I saldi iniziano a gennaio.","イ サルディ イニツィアーノ ア ジェンナーイオ","セールは1月に始まります。","saldi=(季節の)セール。"]]);
XU('x-cils-a2l','CILS A2 ステップ12','CILS A2 STEP 12','it',[
 ["Sono molto agitato per il colloquio.","ソーノ モルト アジタート ペル イル コッロークイオ","面接のことでとても緊張しています。","agitato=そわそわした・緊張した。"],
 ["Mi dispiace che tu parta.","ミ ディスピアーチェ ケ トゥ パルタ","あなたが行ってしまうのは寂しいです。","mi dispiace che+接続法=〜が残念だ。"],
 ["Mio fratello minore è molto simpatico.","ミオ フラテッロ ミノーレ エ モルト スィンパーティコ","弟はとても感じがいいです。","simpatico=感じがいい・親しみやすい。"],
 ["Sono stufo di aspettare.","ソーノ ストゥーフォ ディ アスペッターレ","待つのはもううんざりです。","essere stufo di 〜=〜にうんざりする。"],
 ["Che bello vederti!","ケ ベッロ ヴェデールティ","会えてうれしい!","Che 〜!=なんて〜だ。"],
 ["Mi annoio quando sono solo.","ミ アンノイオ クアンド ソーノ ソーロ","一人でいると退屈してしまいます。","annoiarsi=退屈する。"],
 ["Grazie per avermi dato una mano.","グラーツィエ ペル アヴェールミ ダート ウナ マーノ","手を貸してくれてありがとう。","dare una mano=手を貸す。"],
 ["Non preoccuparti, andrà tutto bene.","ノン プレオックパルティ アンドラ トゥット ベーネ","心配しないで。きっとうまくいくよ。","andare bene=うまくいく。"]]);
XU('x-cils-a2m','CILS A2 ステップ13','CILS A2 STEP 13','it',[
 ["La carta d'imbarco, per favore.","ラ カルタ ディンバルコ ペル ファヴォーレ","搭乗券をお願いします。","carta d'imbarco=搭乗券。"],
 ["Qual è il nostro gate?","クアル エ イル ノストロ ゲイト","私たちの搭乗口はどれですか。","空港では gate(ゲート)をそのまま使う。"],
 ["Allacciate le cinture di sicurezza.","アッラッチャーテ レ チントゥーレ ディ スィクレッツァ","シートベルトをお締めください。",""],
 ["Mi potrebbe portare una coperta?","ミ ポトレッベ ポルターレ ウナ コペルタ","毛布を持ってきていただけますか。","potrebbe=〜していただけますか(ていねい)。"],
 ["Atterreremo fra pochi minuti.","アッテッレレーモ フラ ポーキ ミヌーティ","あと数分で着陸します。","atterrare=着陸する、decollare=離陸する。"],
 ["Ho uno scalo a Roma.","オ ウーノ スカーロ ア ローマ","ローマで乗り継ぎがあります。","scalo=乗り継ぎ・経由地。"],
 ["Non trovo la mia valigia sul nastro.","ノン トローヴォ ラ ミア ヴァリージャ スル ナストロ","ターンテーブルに自分のスーツケースが見つかりません。","nastro (bagagli)=手荷物のターンテーブル。"],
 ["Vi parla il comandante.","ヴィ パルラ イル コマンダンテ","こちらは機長です。","機長のアナウンスの始め方。comandante=機長。"]]);
XU('x-cils-a2n','CILS A2 ステップ14','CILS A2 STEP 14','it',[
 ["Sto leggendo un libro molto interessante.","スト レッジェンド ウン リーブロ モルト インテレッサンテ","とてもおもしろい本を読んでいるところです。","stare+ジェルンディオ=〜しているところ。"],
 ["Studierò dopo cena.","ストゥディエロ ドーポ チェーナ","夕食のあとで勉強します。","studierò=未来形(〜するつもり・〜する)。"],
 ["Sono appena arrivato a casa.","ソーノ アッペーナ アッリヴァート ア カーザ","ちょうど家に着いたところです。","appena=〜したばかり。"],
 ["Bisogna portare il passaporto.","ビゾーニャ ポルターレ イル パッサポルト","パスポートを持っていかなければなりません。","bisogna+動詞の原形=(一般に)〜しなければならない。"],
 ["Questo libro è più facile di quello.","クエスト リーブロ エ ピウ ファーチレ ディ クエッロ","この本はあの本より簡単です。","più 〜 di …=…より〜。"],
 ["Abito qui da due anni.","アービト クイ ダ ドゥーエ アンニ","ここに住んで2年になります。","da+期間=〜前から(今も続いている)。"],
 ["Sembra che stia per piovere.","センブラ ケ スティーア ペル ピオーヴェレ","雨が降りそうです。","stare per+動詞の原形=今にも〜しそう。"],
 ["Quando arrivi, chiamami.","クアンド アッリーヴィ キアーマミ","着いたら電話してね。","chiamami=電話して(命令形+mi)。"]]);
XU('x-cils-a2o','CILS A2 ステップ15','CILS A2 STEP 15','it',[
 ["La biblioteca resterà chiusa questo sabato.","ラ ビブリオテーカ レステラ キウーザ クエスト サーバト","今週の土曜日、図書館は休館です。","restare chiuso=閉まったままだ(お知らせの言い方)。"],
 ["Le iscrizioni si chiudono venerdì.","レ イスクリツィオーニ スィ キウードノ ヴェネルディ","申し込みの締め切りは金曜日です。","iscrizione=申し込み・登録。"],
 ["Vietato correre a bordo vasca.","ヴィエタート コッレレ ア ボルド ヴァスカ","プールサイドを走らないでください。","Vietato+動詞の原形=〜禁止(掲示)。"],
 ["Per maggiori informazioni, consultate il nostro sito.","ペル マッジョーリ インフォルマツィオーニ コンスルターテ イル ノストロ スィート","詳しくはホームページをご覧ください。","consultate=ご覧ください(voi への命令)。"],
 ["Il ristorante è chiuso il lunedì.","イル リストランテ エ キウーゾ イル ルネディ","そのレストランは月曜日が定休日です。","il lunedì=毎週月曜日。"],
 ["Tutti i partecipanti riceveranno un omaggio.","トゥッティ イ パルテチパンティ リチェヴェランノ ウン オマッジョ","参加者全員にプレゼントがあります。","omaggio=無料の贈り物。"],
 ["Leggete il testo e scegliete la risposta giusta.","レッジェーテ イル テスト エ シェリエーテ ラ リスポスタ ジュスタ","文章を読んで、正しい答えを選びなさい。","CILS の問題文によく出る指示。"],
 ["Ascoltate il testo due volte.","アスコルターテ イル テスト ドゥーエ ヴォルテ","音声を2回聞きなさい。","ascoltate=聞いてください(voi への命令)。"]]);
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
XU('x-cils-b1f','CILS B1 ステップ6','CILS B1 STEP 6','it',[
 ["Il progetto è finito prima del previsto.","イル プロジェット エ フィニート プリーマ デル プレヴィスト","プロジェクトは予定より早く終わりました。","prima del previsto=予定より早く。"],
 ["Ho già preparato i documenti per la riunione.","オ ジャ プレパラート イ ドクメンティ ペル ラ リウニオーネ","会議の資料はもう準備しました。","già=もう。"],
 ["La direttrice è in viaggio di lavoro.","ラ ディレットリーチェ エ イン ヴィアッジョ ディ ラヴォーロ","部長は出張中です。","viaggio di lavoro=出張。"],
 ["È fondamentale capire di che cosa ha bisogno il cliente.","エ フォンダメンターレ カピーレ ディ ケ コーザ ア ビゾーニョ イル クリエンテ","顧客が必要としていることを理解するのが何より大切です。","avere bisogno di 〜=〜が必要だ。"],
 ["Grazie all'orario flessibile, riesco a conciliare lavoro e famiglia.","グラーツィエ アッロラーリオ フレッスィービレ リエスコ ア コンチリアーレ ラヴォーロ エ ファミーリア","柔軟な勤務時間のおかげで、仕事と家庭を両立しやすくなりました。","riuscire a 〜=(うまく)〜できる。"],
 ["Cerco un lavoro part-time.","チェルコ ウン ラヴォーロ パルタイム","パートタイムの仕事を探しています。","イタリア語でも part-time をそのまま使う。"],
 ["Ultimamente faccio molti straordinari.","ウルティマメンテ ファッチョ モルティ ストラオルディナーリ","最近、残業がとても多いです。","straordinari=残業。"],
 ["Vorrei candidarmi per il posto di receptionist.","ヴォッレイ カンディダールミ ペル イル ポスト ディ レセプショニスト","受付係の職に応募したいのですが。","candidarsi=応募する。"]]);
XU('x-cils-b1g','CILS B1 ステップ7','CILS B1 STEP 7','it',[
 ["La popolazione sta invecchiando rapidamente.","ラ ポポラツィオーネ スタ インヴェッキアンド ラピダメンテ","人口の高齢化が急速に進んでいます。","invecchiare=年をとる・高齢化する。"],
 ["Sempre più persone lavorano da casa.","センプレ ピウ ペルソーネ ラヴォーラノ ダ カーザ","在宅で働く人がますます増えています。","sempre più=ますます。"],
 ["Molti giovani fanno fatica a trovare casa.","モルティ ジョヴァーニ ファンノ ファティーカ ア トロヴァーレ カーザ","多くの若者が住まい探しに苦労しています。","fare fatica a 〜=〜するのに苦労する。"],
 ["I piccoli negozi soffrono a causa degli acquisti online.","イ ピッコリ ネゴーツィ ソッフロノ ア カウザ デッリ アックイスティ オンライン","ネット通販のせいで小さな店が苦しんでいます。","a causa di 〜=〜のせいで。"],
 ["Il dialogo tra le generazioni è necessario.","イル ディアーロゴ トラ レ ジェネラツィオーニ エ ネチェッサーリオ","世代間の対話が必要です。",""],
 ["Oggi quasi tutti hanno il cellulare.","オッジ クアーズィ トゥッティ アンノ イル チェッルラーレ","今ではほとんどの人が携帯電話を持っています。","quasi tutti=ほとんどみんな。"],
 ["L'uso eccessivo degli schermi influisce sul sonno.","ルーゾ エッチェッスィーヴォ デッリ スケルミ インフルイーシェ スル ソンノ","画面の使いすぎは睡眠に影響します。","influire su 〜=〜に影響する。"],
 ["Bisognerebbe adattare le leggi a questi cambiamenti.","ビゾニェレッベ アダッターレ レ レッジ ア クエスティ カンビアメンティ","法律をこうした変化に合わせるべきでしょう。","bisognerebbe=〜すべきだろう(条件法)。"]]);
XU('x-cils-b1h','CILS B1 ステップ8','CILS B1 STEP 8','it',[
 ["Ti scrivo per darti una bella notizia.","ティ スクリーヴォ ペル ダルティ ウナ ベッラ ノティーツィア","いい知らせを伝えたくて書いています。","手紙・メールのよくある書き出し。"],
 ["Grazie mille per l'invito.","グラーツィエ ミッレ ペル リンヴィート","招待してくれて本当にありがとう。","grazie mille=本当にありがとう。"],
 ["Purtroppo non potrò venire alla festa.","プルトロッポ ノン ポトロ ヴェニーレ アッラ フェスタ","残念ながら、パーティーには行けません。","purtroppo=残念ながら。"],
 ["Le scrivo per lamentarmi del servizio.","レ スクリーヴォ ペル ラメンタールミ デル セルヴィーツィオ","サービスについて苦情を申し上げたく、ご連絡しました。","lamentarsi di 〜=〜について苦情を言う。"],
 ["Le sarei grato se mi rispondesse al più presto.","レ サレイ グラート セ ミ リスポンデッセ アル ピウ プレスト","できるだけ早くお返事いただけるとありがたいです。","Le sarei grato se+接続法半過去=〜していただけるとありがたい。"],
 ["Ti racconto com'è andato il viaggio.","ティ ラッコント コメ アンダート イル ヴィアッジョ","旅行がどうだったか話すね。","raccontare=話す・語る。"],
 ["Non vedo l'ora di vederti.","ノン ヴェード ローラ ディ ヴェデールティ","あなたに会えるのがとても楽しみです。","non vedo l'ora di 〜=〜が待ちきれない。"],
 ["Un abbraccio forte.","ウン アッブラッチョ フォルテ","大きなハグを送ります。","親しい人へのメールの結びの言葉。"]]);
XU('x-cils-b1i','CILS B1 ステップ9','CILS B1 STEP 9','it',[
 ["Ci sono opinioni a favore e contro.","チ ソーノ オピニオーニ ア ファヴォーレ エ コントロ","賛成と反対の両方の意見があります。","a favore=賛成、contro=反対。"],
 ["Innanzitutto, bisogna tenere conto dei costi.","インナンツィトゥット ビゾーニャ テネーレ コント デイ コスティ","まず第一に、費用を考えに入れる必要があります。","tenere conto di 〜=〜を考慮する。"],
 ["Tuttavia, anche questa idea ha i suoi limiti.","トゥッタヴィーア アンケ クエスタ イデーア ア イ スオイ リーミティ","しかし、この考えにも限界があります。","tuttavia=しかし。"],
 ["Perciò dobbiamo collaborare tutti.","ペルチョ ドッビアーモ コッラボラーレ トゥッティ","したがって、みんなが協力しなければなりません。","perciò=したがって。"],
 ["Una possibile soluzione sarebbe migliorare i trasporti pubblici.","ウナ ポッスィービレ ソルツィオーネ サレッベ ミリオラーレ イ トラスポルティ プッブリチ","解決策の一つとして、公共交通をよくすることが考えられます。","sarebbe=〜だろう(条件法)。"],
 ["Dal mio punto di vista, l'istruzione è la cosa più importante.","ダル ミオ プント ディ ヴィスタ リストゥルツィオーネ エ ラ コーザ ピウ インポルタンテ","私の考えでは、教育がいちばん大切です。","dal mio punto di vista=私の考えでは。"],
 ["Questo fenomeno è dovuto principalmente a due cause.","クエスト フェノーメノ エ ドヴート プリンチパルメンテ ア ドゥーエ カウゼ","この現象の主な原因は二つあります。","essere dovuto a 〜=〜が原因だ。"],
 ["Per riassumere, credo che sia una buona misura.","ペル リアッスーメレ クレード ケ スィーア ウナ ブオーナ ミズーラ","まとめると、それはいい対策だと思います。","credo che+接続法=〜だと思う。"]]);
XU('x-cils-b1j','CILS B1 ステップ10','CILS B1 STEP 10','it',[
 ["Voglio che tu venga alla mia festa.","ヴォッリョ ケ トゥ ヴェンガ アッラ ミア フェスタ","私のパーティーに来てほしいです。","volere che+接続法=(人に)〜してほしい。"],
 ["Speriamo che domani faccia bel tempo.","スペリアーモ ケ ドマーニ ファッチャ ベル テンポ","明日、天気がいいといいな。","sperare che+接続法=〜だといいな。"],
 ["Anche se piove, andremo in gita.","アンケ セ ピオーヴェ アンドレーモ イン ジータ","たとえ雨が降っても、遠足に行きます。","anche se=たとえ〜でも。"],
 ["Sono contento che tu abbia superato l'esame.","ソーノ コンテント ケ トゥ アッビア スペラート レザーメ","合格したなんて、うれしいよ。","essere contento che+接続法=〜がうれしい。"],
 ["Non credo che sia così difficile.","ノン クレード ケ スィーア コズィ ディッフィーチレ","そんなに難しいとは思いません。","non credo che+接続法=〜とは思わない。"],
 ["Cerco qualcuno che parli giapponese.","チェルコ クアルクーノ ケ パルリ ジャッポネーゼ","日本語を話せる人を探しています。","いるかどうかわからない人を表すときは接続法。"],
 ["Te lo dico perché tu lo sappia.","テ ロ ディーコ ペルケ トゥ ロ サッピア","知っておいてほしいから言うね。","perché+接続法=〜するように。"],
 ["Prima che tu parta, voglio darti una cosa.","プリーマ ケ トゥ パルタ ヴォッリョ ダルティ ウナ コーザ","君が行ってしまう前に、渡したいものがあるんだ。","prima che+接続法=〜する前に。"]]);
XU('x-cils-b1k','CILS B1 ステップ11','CILS B1 STEP 11','it',[
 ["Non ho sentito la sveglia e ho perso il volo.","ノン オ センティート ラ ズヴェーリャ エ オ ペルソ イル ヴォーロ","目覚ましが聞こえなくて、飛行機に乗り遅れました。","sveglia=目覚まし時計。"],
 ["Non solo canta bene, ma balla anche molto bene.","ノン ソーロ カンタ ベーネ マ バッラ アンケ モルト ベーネ","歌がうまいだけでなく、ダンスもとても上手です。","non solo 〜 ma anche …=〜だけでなく…も。"],
 ["Per quanto studi, non lo capisco.","ペル クアント ストゥーディ ノン ロ カピスコ","どんなに勉強しても、わかりません。","per quanto+接続法=どんなに〜しても。"],
 ["Prendi l'ombrello nel caso in cui piova.","プレンディ ロンブレッロ ネル カーゾ イン クイ ピオーヴァ","雨が降るといけないから、傘を持っていきなさい。","nel caso in cui+接続法=〜の場合に備えて。"],
 ["Più ti eserciti, più migliori.","ピウ ティ エゼルチティ ピウ ミリオーリ","練習すればするほど上達します。","più 〜, più …=〜すればするほど…。"],
 ["Appena ho saputo la notizia, sono andato all'aeroporto.","アッペーナ オ サプート ラ ノティーツィア ソーノ アンダート アッラエロポルト","その知らせを知るとすぐ、空港へ行きました。","appena=〜するとすぐ。"],
 ["Se avessi avuto tempo, ti avrei aiutato.","セ アヴェッスィ アヴート テンポ ティ アヴレイ アイウタート","時間があったら、手伝ってあげたのに。","過去の事実に反する仮定。"],
 ["Se tutto va come previsto, mi laureerò l'anno prossimo.","セ トゥット ヴァ コメ プレヴィスト ミ ラウレエロ ランノ プロッスィモ","予定どおりなら、来年卒業します。","come previsto=予定どおり。"]]);
XU('x-cils-b1l','CILS B1 ステップ12','CILS B1 STEP 12','it',[
 ["Migliaia di persone hanno manifestato ieri a Roma.","ミリアーイア ディ ペルソーネ アンノ マニフェスタート イエーリ ア ローマ","昨日ローマで数千人がデモをしました。","manifestare=デモをする。"],
 ["Il governo ha annunciato nuove misure.","イル ゴヴェルノ ア アンヌンチャート ヌオーヴェ ミズーレ","政府は新しい対策を発表しました。","misura=対策・措置。"],
 ["Decine di voli sono stati cancellati per il maltempo.","デチーネ ディ ヴォーリ ソーノ スターティ カンチェッラーティ ペル イル マルテンポ","悪天候のため、数十便が欠航になりました。","decine di 〜=数十の〜。"],
 ["La polizia indaga sulle cause dell'incidente.","ラ ポリツィーア インダーガ スッレ カウゼ デッリンチデンテ","警察は事故の原因を調べています。","indagare su 〜=〜を捜査する。"],
 ["Gli esperti prevedono una ripresa dell'economia.","リ エスペルティ プレヴェードノ ウナ リプレーザ デッレコノミーア","専門家たちは経済が回復すると予想しています。","ripresa=回復。"],
 ["Secondo fonti ufficiali, non ci sono feriti.","セコンド フォンティ ウッフィチャーリ ノン チ ソーノ フェリーティ","公式な情報によると、けが人はいません。","fonte=情報源。"],
 ["La notizia ha suscitato grande interesse.","ラ ノティーツィア ア スッシタート グランデ インテレッセ","そのニュースは大きな関心を集めています。","suscitare=(感情などを)呼び起こす。"],
 ["E ora passiamo allo sport.","エ オーラ パッスィアーモ アッロ スポルト","では、スポーツのニュースです。","passare a 〜=〜に移る。"]]);
XU('x-cils-b1m','CILS B1 ステップ13','CILS B1 STEP 13','it',[
 ["A causa del maltempo, la partenza è in ritardo.","ア カウザ デル マルテンポ ラ パルテンツァ エ イン リタルド","悪天候のため、出発が遅れています。","in ritardo=遅れて。"],
 ["Signore e signori, benvenuti a bordo.","スィニョーレ エ スィニョーリ ベンヴェヌーティ ア ボルド","皆さま、ご搭乗ありがとうございます。","a bordo=機内に。"],
 ["Potrebbero esserci delle turbolenze.","ポトレッベロ エッセルチ デッレ トゥルボレンツェ","乱気流で揺れるおそれがあります。","potrebbe / potrebbero=〜かもしれない。"],
 ["Per diventare pilota servono molte ore di volo.","ペル ディヴェンターレ ピロータ セルヴォノ モルテ オーレ ディ ヴォーロ","パイロットになるには、たくさんの飛行時間が必要です。","servire=必要だ。"],
 ["L'aereo decollerà quando la torre darà l'autorizzazione.","ラエーレオ デコッレラ クアンド ラ トッレ ダラ ラウトリッザツィオーネ","管制塔が許可したら、飛行機は離陸します。","torre (di controllo)=管制塔。"],
 ["I prodotti acquistati al duty free si possono portare a bordo.","イ プロドッティ アックイスターティ アル デューティ フリー スィ ポッソノ ポルターレ ア ボルド","免税店で買った商品は機内に持ち込めます。","空港の免税店は duty free とよく言う。"],
 ["L'ora locale è le tre e venti del pomeriggio.","ローラ ロカーレ エ レ トレ エ ヴェンティ デル ポメリッジョ","現地時刻は午後3時20分です。","del pomeriggio=午後の。"],
 ["Impostate i dispositivi in modalità aereo.","インポスターテ イ ディスポズィティーヴィ イン モダリタ アエーレオ","電子機器を機内モードにしてください。","impostare=設定する。"]]);
XU('x-cils-b1n','CILS B1 ステップ14','CILS B1 STEP 14','it',[
 ["Il 31 dicembre si mangiano le lenticchie.","イル トレントゥーノ ディチェンブレ スィ マンジャーノ レ レンティッキエ","12月31日の夜にはレンズ豆を食べます。","イタリアの習慣。お金に困らないようにという縁起物。"],
 ["L'espresso si beve in piedi al bar.","レスプレッソ スィ ベーヴェ イン ピエーディ アル バール","エスプレッソはバールで立って飲みます。","bar=イタリアの喫茶店。"],
 ["In Italia si cena verso le otto.","イン イターリア スィ チェーナ ヴェルソ レ オット","イタリアでは8時ごろ夕食を食べます。","si+動詞=(一般に人は)〜する。"],
 ["Questo palazzo è stato costruito nel Cinquecento.","クエスト パラッツォ エ スタート コストゥルイート ネル チンクエチェント","この宮殿は16世紀に建てられました。","Cinquecento=1500年代(16世紀)。"],
 ["La pizza margherita è nata a Napoli.","ラ ピッツァ マルゲリータ エ ナータ ア ナーポリ","ピッツァ・マルゲリータはナポリで生まれました。","nascere=生まれる(過去は essere+nato)。"],
 ["In Italia ci sono molti dialetti diversi.","イン イターリア チ ソーノ モルティ ディアレッティ ディヴェルスィ","イタリアにはたくさんの方言があります。","dialetto=方言。"],
 ["Adoro l'opera, soprattutto Verdi.","アドーロ ローペラ ソプラットゥット ヴェルディ","オペラが大好きです。特にヴェルディが。","soprattutto=特に。"],
 ["Mi ha colpito il mix di antico e moderno.","ミ ア コルピート イル ミクス ディ アンティーコ エ モデルノ","古いものと新しいものが混ざり合っているのが印象的でした。","colpire=強い印象を与える。"]]);
XU('x-cils-b1o','CILS B1 ステップ15','CILS B1 STEP 15','it',[
 ["È un gioco da ragazzi.","エ ウン ジョーコ ダ ラガッツィ","そんなの朝飯前です。","直訳:子どもの遊び。"],
 ["Oggi ho la testa fra le nuvole.","オッジ オ ラ テスタ フラ レ ヌーヴォレ","今日はぼんやりしています。","avere la testa fra le nuvole=ぼんやりしている(直訳:頭が雲の中にある)。"],
 ["Meglio tardi che mai.","メーリオ タルディ ケ マイ","遅くても、やらないよりはまし。","ことわざ。"],
 ["Non ha peli sulla lingua.","ノン ア ペーリ スッラ リングア","あの人は思ったことをはっきり言います。","直訳:舌に毛がない。"],
 ["Mi è costato un occhio della testa.","ミ エ コスタート ウン オッキオ デッラ テスタ","目玉が飛び出るほど高かったです。","costare un occhio della testa=とても高い(直訳:頭の目ひとつ分かかる)。"],
 ["In bocca al lupo per l'esame!","イン ボッカ アル ルーポ ペル レザーメ","試験がんばってね!","直訳:オオカミの口の中へ。返事は Crepi!。"],
 ["Chi dorme non piglia pesci.","キ ドルメ ノン ピーリャ ペッシ","怠けていては何も手に入らない。","直訳:眠っている人は魚をとれない。"],
 ["Piano piano si va lontano.","ピアーノ ピアーノ スィ ヴァ ロンターノ","少しずつでも続ければ遠くまで行ける。","ことわざ。「継続は力なり」に近い。"]]);
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
 ek5:{L:'en',name:'英検5級',tier:1,ids:['x-ek5','x-ek5b','x-ek5c','x-ek5d','x-ek5e','x-ek5f','x-ek5g','x-ek5h','x-ek5i','x-ek5j','x-ek5k','x-ek5l','x-ek5m','x-ek5n','x-ek5o']},
 ek4:{L:'en',name:'英検4級',tier:1,ids:['x-ek4','x-ek4b','x-ek4c','x-ek4d','x-ek4e','x-ek4f','x-ek4g','x-ek4h','x-ek4i','x-ek4j','x-ek4k','x-ek4l','x-ek4m','x-ek4n','x-ek4o']},
 ek3:{L:'en',name:'英検3級',tier:1,ids:['x-ek3','x-ek3b','x-ek3c','x-ek3d','x-ek3e','x-ek3f','x-ek3g','x-ek3h','x-ek3i','x-ek3j','x-ek3k','x-ek3l','x-ek3m','x-ek3n','x-ek3o']},
 ekp2:{L:'en',name:'英検準2級',tier:1,ids:['x-ekp2','x-ekp2b','x-ekp2c','x-ekp2d','x-ekp2e','x-ekp2f','x-ekp2g','x-ekp2h','x-ekp2i','x-ekp2j','x-ekp2k','x-ekp2l','x-ekp2m','x-ekp2n','x-ekp2o']},
 ekp2p:{L:'en',name:'英検準2級プラス',tier:2,ids:['x-ekp2p','x-ekp2pb','x-ekp2pc','x-ekp2pd','x-ekp2pe','x-ekp2pf','x-ekp2pg','x-ekp2ph','x-ekp2pi','x-ekp2pj','x-ekp2pk','x-ekp2pl','x-ekp2pm','x-ekp2pn','x-ekp2po']},
 ek2:{L:'en',name:'英検2級',tier:2,ids:['x-ek2','x-ek2b','x-ek2c','x-ek2d','x-ek2e','x-ek2f','x-ek2g','x-ek2h','x-ek2i','x-ek2j','x-ek2k','x-ek2l','x-ek2m','x-ek2n','x-ek2o']},
 ekp1:{L:'en',name:'英検準1級',tier:2,ids:['x-ekp1','x-ekp1b','x-ekp1c','x-ekp1d','x-ekp1e','x-ekp1f','x-ekp1g','x-ekp1h','x-ekp1i','x-ekp1j','x-ekp1k','x-ekp1l','x-ekp1m','x-ekp1n','x-ekp1o']},
 ek1:{L:'en',name:'英検1級',tier:2,ids:['x-ek1','x-ek1b','x-ek1c','x-ek1d','x-ek1e','x-ek1f','x-ek1g','x-ek1h','x-ek1i','x-ek1j','x-ek1k','x-ek1l','x-ek1m','x-ek1n','x-ek1o']},
 toeic:{L:'en',name:'TOEIC L&R',tier:2,ids:['x-toeic','x-toeicb','x-toeicc','x-toeicd','x-toeice','x-toeicf','x-toeicg','x-toeich','x-toeici','x-toeicj','x-toeick','x-toeicl','x-toeicm','x-toeicn','x-toeico']},
 ielts:{L:'en',name:'IELTS',tier:2,ids:['x-ielts','x-ieltsb','x-ieltsc','x-ieltsd','x-ieltse','x-ieltsf','x-ieltsg','x-ieltsh','x-ieltsi','x-ieltsj','x-ieltsk','x-ieltsl','x-ieltsm','x-ieltsn','x-ieltso']},
 toefl:{L:'en',name:'TOEFL iBT',tier:2,ids:['x-toefl','x-toeflb','x-toeflc','x-toefld','x-toefle','x-toeflf','x-toeflg','x-toeflh','x-toefli','x-toeflj','x-toeflk','x-toefll','x-toeflm','x-toefln','x-toeflo']},
 icao:{L:'en',name:'航空英語(ICAO)',tier:2,ids:['x-icao']},
 topik1:{L:'ko',name:'TOPIK Ⅰ',tier:1,ids:['x-topik1','x-topik1b','x-topik1c','x-topik1d','x-topik1e','x-topik1f','x-topik1g','x-topik1h','x-topik1i','x-topik1j','x-topik1k','x-topik1l','x-topik1m','x-topik1n','x-topik1o']},
 topik2:{L:'ko',name:'TOPIK Ⅱ',tier:2,ids:['x-topik2','x-topik2b','x-topik2c','x-topik2d','x-topik2e','x-topik2f','x-topik2g','x-topik2h','x-topik2i','x-topik2j','x-topik2k','x-topik2l','x-topik2m','x-topik2n','x-topik2o']},
 'dele-a2':{L:'es',name:'DELE A2',tier:1,ids:['x-dele-a2','x-dele-a2b','x-dele-a2c','x-dele-a2d','x-dele-a2e','x-dele-a2f','x-dele-a2g','x-dele-a2h','x-dele-a2i','x-dele-a2j','x-dele-a2k','x-dele-a2l','x-dele-a2m','x-dele-a2n','x-dele-a2o']},
 'dele-b1':{L:'es',name:'DELE B1',tier:2,ids:['x-dele-b1','x-dele-b1b','x-dele-b1c','x-dele-b1d','x-dele-b1e','x-dele-b1f','x-dele-b1g','x-dele-b1h','x-dele-b1i','x-dele-b1j','x-dele-b1k','x-dele-b1l','x-dele-b1m','x-dele-b1n','x-dele-b1o']},
 'cils-a2':{L:'it',name:'CILS A2',tier:1,ids:['x-cils-a2','x-cils-a2b','x-cils-a2c','x-cils-a2d','x-cils-a2e','x-cils-a2f','x-cils-a2g','x-cils-a2h','x-cils-a2i','x-cils-a2j','x-cils-a2k','x-cils-a2l','x-cils-a2m','x-cils-a2n','x-cils-a2o']},
 'cils-b1':{L:'it',name:'CILS B1',tier:2,ids:['x-cils-b1','x-cils-b1b','x-cils-b1c','x-cils-b1d','x-cils-b1e','x-cils-b1f','x-cils-b1g','x-cils-b1h','x-cils-b1i','x-cils-b1j','x-cils-b1k','x-cils-b1l','x-cils-b1m','x-cils-b1n','x-cils-b1o']},
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
