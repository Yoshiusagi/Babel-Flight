/* ================= 授業の用語(くわしく) for the other languages (プレミアムエコノミーから) =================
   8 subjects x 16 core terms (2 units of 8) in 2 banks of 64 per language, generated together with i18n/<ui>/sdlang.tsv.
   Item: [term, reading, 日本語, meaning + a sentence a teacher might say in class (+ 日本語訳)]. Original material. */
function SUL(L,uid,jp,lat,list){
  UM[uid]={jp:jp,lat:lat};
  UNITS[L][uid]={id:uid,items:list.map(function(x){return {jp:x[2],t:x[0],r:x[1],n:x[3]};}),track:'study'};
}
var SDL_MORE={};
SUL('ko','sd-ko-ma1','数学 1','MATH 1',[
 ["양수","ヤンス","正の数","0より大きい数。授業では 양수는 0보다 커요.(正の数は0より大きい)"],
 ["음수","ウムス","負の数","0より小さい数。授業では 마이너스 5는 음수예요.(-5は負の数です)"],
 ["정수","チョンス","整数","…,-1, 0, 1, 2,… のような数。授業では 0.5는 정수일까요?(0.5は整数かな?)"],
 ["분모","プンモ","分母","分数の下の数。授業では 통분해서 분모를 같게 해 봅시다.(分母をそろえよう=通分)"],
 ["소수","ソス","小数","0.5 のような数。授業では 4분의 1을 소수로 써 봅시다.(1/4を小数で書こう)"],
 ["제곱근","チェゴックン","平方根","2乗するとその数になる数。授業では 9의 제곱근은 3이에요.(9の平方根は3)"],
 ["변수","ピョンス","文字(変数)","x や y のように、いろいろな値をとる文字。授業では 여기서 x는 변수예요.(ここでは x が変数)"],
 ["각","カク","角","2本の線が作る開き。授業では 각도기로 각을 재 봅시다.(分度器で角をはかろう)"]]);
SUL('ko','sd-ko-ma2','数学 2','MATH 2',[
 ["평행","ピョンヘン","平行な","どこまでのばしても交わらないこと。授業では 이 두 직선은 평행해요.(この2本の線は平行)"],
 ["넓이","ノルビ","面積","広さ。授業では 직사각형의 넓이를 구해 봅시다.(長方形の面積を求めよう)"],
 ["반지름","パンジルム","半径","円の中心から円周までの長さ。授業では 반지름은 지름의 절반이에요.(半径は直径の半分)"],
 ["부피","プピ","体積","立体の大きさ。授業では 정육면체의 부피를 구해 봅시다.(立方体の体積を求めよう)"],
 ["함수","ハムス","関数","xが決まるとyがただ1つ決まる関係。授業では y는 x의 함수예요.(yはxの関数)"],
 ["좌표","チャピョ","座標","点の位置を表す数の組。授業では 점 P의 좌표를 써 봅시다.(点Pの座標を書こう)"],
 ["확률","ファンニュル","確率","あることが起こる割合。授業では 앞면이 나올 확률은 얼마일까요?(表が出る確率は?)"],
 ["평균","ピョンギュン","平均値","全部たして個数でわった値。授業では 자료의 평균을 계산해 봅시다.(データの平均値を計算しよう)"]]);
SUL('ko','sd-ko-sc1','理科 1','SCIENCE 1',[
 ["힘","ヒム","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では 힘을 화살표로 나타내 봅시다.(力を矢印で表そう)"],
 ["마찰","マチャル","摩擦","ふれ合う面で動きをじゃまする力。授業では 마찰 때문에 상자가 느려져요.(摩擦で箱がおそくなる)"],
 ["속력","ソンニョク","速さ","距離÷時間。授業では 평균 속력을 계산해 봅시다.(平均の速さを計算しよう)"],
 ["전류","チョルリュ","電流","電気の流れ。単位は A(アンペア)。授業では 전류계로 전류를 재 봅시다.(電流計で電流をはかろう)"],
 ["전압","チョナプ","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では 전압계는 병렬로 연결해요.(電圧計は並列につなごう)"],
 ["자기장","チャギジャン","磁界","磁石の力がはたらく空間。授業では 철가루로 자기장을 확인해 봅시다.(鉄粉で磁界のようすを見よう)"],
 ["원소","ウォンソ","元素","物質をつくるもとになる成分。授業では 주기율표에서 그 원소를 찾아봅시다.(周期表でその元素を探そう)"],
 ["원자","ウォンジャ","原子","物質をつくる、とても小さなつぶ。授業では 원자는 너무 작아서 보이지 않아요.(原子は小さすぎて見えない)"]]);
SUL('ko','sd-ko-sc2','理科 2','SCIENCE 2',[
 ["산","サン","酸","水溶液が酸性を示す物質。授業では 레몬즙은 산성이에요.(レモン汁は酸)"],
 ["호흡","ホフプ","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では 호흡으로 에너지를 얻어요.(呼吸でエネルギーが取り出される)"],
 ["소화","ソファ","消化","食べ物を体に吸収できる形に分解すること。授業では 소화는 입에서 시작돼요.(消化は口から始まる)"],
 ["유전자","ユジョンジャ","遺伝子","親から子に伝わる特徴のもと。授業では 유전자는 부모에게서 자녀에게 전해져요.(遺伝子は親から子に伝わる)"],
 ["먹이 사슬","モギ サスル","食物連鎖","「食べる・食べられる」のつながり。授業では 숲의 먹이 사슬을 그려 봅시다.(森の食物連鎖をかこう)"],
 ["화산","ファサン","火山","マグマがふき出してできた山。授業では 이 화산은 지금도 활동하고 있어요.(この火山は今も活動している)"],
 ["화석","ファソク","化石","大昔の生物の死がいや跡が残ったもの。授業では 화석으로 옛날 생물을 알 수 있어요.(化石から大昔の生物がわかる)"],
 ["태양계","テヤンゲ","太陽系","太陽とそのまわりを回る天体の集まり。授業では 태양계에는 행성이 8개 있어요.(太陽系には8つの惑星がある)"]]);
SUL('ko','sd-ko-so1','社会 1','SOCIAL STUDIES 1',[
 ["위도","ウィド","緯度","赤道から北や南へどれだけ離れているか。授業では 도쿄는 북위 약 36도에 있어요.(東京は北緯約36度にある)"],
 ["반도","パンド","半島","三方を海に囲まれた陸地。授業では 이탈리아는 장화 모양의 긴 반도예요.(イタリアはブーツの形をした長い半島だ)"],
 ["인구 밀도","イング ミルト","人口密度","一定の面積に何人住んでいるか。授業では 도쿄는 인구 밀도가 아주 높아요.(東京は人口密度がとても高い)"],
 ["수출","スチュル","輸出(する)","国内のものを外国に売ること。授業では 일본은 자동차를 많이 수출해요.(日本はたくさんの車を輸出している)"],
 ["수입","スイプ","輸入(する)","外国のものを国内に買い入れること。授業では 일본의 밀은 대부분 수입한 거예요.(日本の小麦のほとんどは輸入されている)"],
 ["농업","ノンオプ","農業","作物を育てたり家畜を飼ったりする仕事。授業では 이 지역에서는 농업이 중요해요.(この地域では農業が大切だ)"],
 ["문명","ムンミョン","文明","都市・文字・国のしくみが発達した社会。授業では 4대 문명은 큰 강가에서 시작되었어요.(四大文明は大きな川のほとりで始まった)"],
 ["제국","チェグク","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では 로마 제국은 수백 년 동안 이어졌어요.(ローマ帝国は何百年も続いた)"]]);
SUL('ko','sd-ko-so2','社会 2','SOCIAL STUDIES 2',[
 ["식민지","シンミンジ","植民地","ほかの国に支配された土地。授業では 인도는 한때 영국의 식민지였어요.(インドはかつてイギリスの植民地だった)"],
 ["독립","トンニプ","独立","ほかの国の支配から離れて自分の国になること。授業では 미국은 1776년에 독립을 선언했어요.(アメリカは1776年に独立を宣言した)"],
 ["조약","チョヤク","条約","国と国が文書で結ぶ約束。授業では 두 나라는 평화 조약에 서명했어요.(2つの国は平和条約に署名した)"],
 ["민주주의","ミンジュジュイ","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では 민주주의에서는 국민이 지도자를 뽑아요.(民主主義では、国民がリーダーを選ぶ)"],
 ["총리","チョンニ","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では 총리는 내각을 이끌어요.(首相は内閣を率いる)"],
 ["인권","インックォン","人権","人が生まれながらにもつ権利。授業では 모든 사람의 인권은 존중되어야 해요.(すべての人の人権が尊重されなければならない)"],
 ["세금","セグム","税金","国や自治体の仕事のために国民が納めるお金。授業では 세금으로 도로와 학교를 만들어요.(税金で道路や学校がまかなわれている)"],
 ["무역","ムヨク","貿易","国と国の間でものを売り買いすること。授業では 일본과 중국의 무역은 아주 활발해요.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('ko','sd-ko-la1','国語 1','LANGUAGE ARTS 1',[
 ["대명사","テミョンサ","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では 명사를 대명사로 바꿔 봅시다.(名詞を代名詞に置き換えよう)"],
 ["접속사","チョプソクサ","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では 접속사로 두 문장을 이어 봅시다.(接続詞で2つの文をつなごう)"],
 ["문장 부호","ムンジャン プホ","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では 문장 끝에 문장 부호를 잊지 마세요.(それぞれの文の終わりの句読点を忘れないで)"],
 ["유의어","ユイオ","類義語(同じ意味の語)","意味が同じか近い語。授業では 이 단어의 유의어를 찾아봅시다.(この単語の類義語を見つけよう)"],
 ["중심 내용","チュンシム ネヨン","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では 이 문단의 중심 내용은 무엇일까요?(この段落の要旨は何かな?)"],
 ["요약하다","ヨヤカダ","要約する","大事なところだけを短くまとめる。授業では 그 장을 세 문장으로 요약해 봅시다.(その章を3文で要約しよう)"],
 ["줄거리","チュルゴリ","あらすじ(筋)","物語のできごとの流れ。授業では 이 소설의 줄거리는 놀라움으로 가득해요.(この小説の筋は驚きでいっぱいだ)"],
 ["등장인물","トゥンジャンインムル","登場人物","物語に出てくる人や動物。授業では 이야기의 주인공은 누구일까요?(物語の主人公はだれかな?)"]]);
SUL('ko','sd-ko-la2','国語 2','LANGUAGE ARTS 2',[
 ["주제","チュジェ","テーマ(主題)","物語を通して伝わる大切な考え。授業では 이 이야기의 주제는 우정이에요.(物語のテーマは友情だ)"],
 ["서술자","ソスルチャ","語り手","物語を語っている人。授業では 서술자가 1인칭으로 이야기를 들려줘요.(語り手は一人称で物語を語っている)"],
 ["은유","ウニュ","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では '인생은 여행이다'는 은유예요.(「人生は旅だ」は隠喩だ)"],
 ["결론","キョルロン","結論","エッセイの最後でまとめる部分。授業では 결론에서 주요 주장을 다시 말해 봅시다.(結論でもう一度主な主張を述べよう)"],
 ["초고","チョゴ","下書き","まず全体を書いてみたもの。授業では 금요일까지 초고를 끝내세요.(金曜日までに下書きを終わらせよう)"],
 ["교정하다","キョジョンハダ","校正する","つづりや句読点のまちがいを確かめる。授業では 맞춤법 실수가 없는지 꼼꼼히 교정하세요.(つづりのまちがいがないか注意して校正しよう)"],
 ["발표","パルピョ","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では 모둠마다 5분 동안 발표해요.(各グループが5分の発表をする)"],
 ["토론","トロン","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では 오늘의 토론 주제는 교복이에요.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-ko-a']={L:'ko',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-ko-ma1", "sd-ko-ma2", "sd-ko-sc1", "sd-ko-sc2", "sd-ko-so1", "sd-ko-so2", "sd-ko-la1", "sd-ko-la2"],key:'sd-ko-a'};
SUL('ko','sd-ko-it1','情報 1','COMPUTING 1',[
 ["하드웨어","ハドゥウェオ","ハードウェア","コンピューターの機械の部分。授業では 키보드와 화면은 하드웨어예요.(キーボードと画面はハードウェアだ)"],
 ["소프트웨어","ソプトゥウェオ","ソフトウェア","コンピューターを動かすプログラム。授業では 수업 전에 소프트웨어를 설치해 두세요.(授業の前にソフトウェアをインストールしておこう)"],
 ["운영 체제","ウニョン チェジェ","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows와 macOS는 운영 체제예요.(Windows と macOS はOSだ)"],
 ["이진법","イジンポプ","2進法","0と1だけで数を表す方法。授業では 컴퓨터는 모든 것을 이진법으로 저장해요.(コンピューターはすべてを2進法で記録する)"],
 ["화소","ファソ","画素(ピクセル)","画像をつくる小さな点。授業では 확대하면 화소 하나하나가 보여요.(拡大すると一つ一つの画素が見える)"],
 ["알고리즘","アルゴリジュム","アルゴリズム","問題を解くための手順。授業では 샌드위치를 만드는 알고리즘을 써 봅시다.(サンドイッチを作るアルゴリズムを書こう)"],
 ["순서도","スンソド","フローチャート","手順を図形と矢印で表した図。授業では 코드를 쓰기 전에 순서도를 그려 봅시다.(コードを書く前にフローチャートを描こう)"],
 ["반복문","パンボンムン","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では 반복문을 써서 별 10개를 그려 봅시다.(繰り返しを使って星を10個描こう)"]]);
SUL('ko','sd-ko-it2','情報 2','COMPUTING 2',[
 ["디버깅하다","ディボギンハダ","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では 이 코드를 함께 디버깅해 봅시다.(このコードを一緒にデバッグしよう)"],
 ["네트워크","ネトゥウォク","ネットワーク","コンピューターどうしをつないだもの。授業では 이 교실의 컴퓨터는 모두 같은 네트워크에 연결되어 있어요.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["검색 엔진","コムセク エンジン","検索エンジン","キーワードでウェブの情報を探すサービス。授業では 검색 엔진에서는 좋은 키워드를 쓰세요.(検索エンジンではよいキーワードを使おう)"],
 ["피싱","ピシン","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では 피싱 메일의 링크는 절대 누르지 마세요.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["암호화","アモファ","暗号化","データを決まった人しか読めない形に変えること。授業では 암호화로 메시지의 비밀이 지켜져요.(暗号化によってメッセージの秘密が守られる)"],
 ["개인 정보","ケイン ジョンボ","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では 인터넷에 개인 정보를 올리지 마세요.(ネットで個人情報を公開しないで)"],
 ["저작권","チョジャックォン","著作権","作品を作った人がもつ権利。授業では 이 노래는 저작권으로 보호돼요.(この曲は著作権で守られている)"],
 ["인공지능","インゴンジヌン","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では 인공지능은 언어를 번역할 수 있어요.(人工知能は言葉を翻訳できる)"]]);
SUL('ko','sd-ko-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["근육","クニュク","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では 달리기 전에 다리 근육을 늘려 주세요.(走る前に脚の筋肉を伸ばそう)"],
 ["뼈","ッピョ","骨","体を支え、内臓を守るかたいもの。授業では 칼슘은 뼈를 튼튼하게 해요.(カルシウムは骨を強くする)"],
 ["관절","クァンジョル","関節","骨と骨のつなぎ目。授業では 무릎은 관절이에요.(ひざは関節だ)"],
 ["심박수","シムバクス","心拍数","1分間に心臓が打つ回数。授業では 달린 뒤에 심박수를 재 보세요.(走ったあとに心拍数を測ろう)"],
 ["사춘기","サチュンギ","思春期","子どもから大人の体に変わっていく時期。授業では 사춘기에는 몸이 많이 변해요.(思春期には体が大きく変わる)"],
 ["영양소","ヨンヤンソ","栄養素","体に必要な、食べ物にふくまれる成分。授業では 채소에는 영양소가 가득해요.(野菜には栄養素がたくさんふくまれている)"],
 ["단백질","タンベクチル","たんぱく質","筋肉や血をつくる栄養素。授業では 근육을 키우려면 단백질을 먹으세요.(筋肉をつけるにはたんぱく質をとろう)"],
 ["균형 잡힌 식사","キュニョン ジャピン シクサ","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では 균형 잡힌 식사에는 과일, 채소, 곡물이 들어가요.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('ko','sd-ko-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["수분 보충","スブン ボチュン","水分補給","体に必要な水分をとること。授業では 더운 날에는 수분 보충이 중요해요.(暑い日は水分補給が大切だ)"],
 ["정신 건강","チョンシン ゴンガン","心の健康","気持ちや心の状態の健康。授業では 친구와 이야기하면 정신 건강에 도움이 돼요.(友だちに話すことは心の健康の助けになる)"],
 ["응급 처치","ウングプ チョチ","応急手当","けがや急な病気のときにその場でする手当て。授業では 누구나 기본적인 응급 처치를 배워야 해요.(だれもが基本の応急手当を学ぶべきだ)"],
 ["염좌","ヨムジャ","ねんざ","関節をひねって痛めること。授業では 그는 발목에 염좌가 생겼어요.(彼は足首をねんざしている)"],
 ["열사병","ヨルサッピョン","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では 열사병을 막으려면 그늘에서 쉬세요.(熱中症を防ぐために日かげで休もう)"],
 ["심판","シムパン","審判","試合のルールを守らせる人。授業では 심판의 호루라기를 잘 들으세요.(審判の笛をよく聞こう)"],
 ["반칙","パンチク","反則(ファウル)","ルールに違反すること。授業では 미는 것은 반칙이에요.(押すのは反則だ)"],
 ["계주","ケジュ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では 계주에서는 배턴을 부드럽게 넘기세요.(リレーではバトンをなめらかに渡そう)"]]);
SUL('ko','sd-ko-mu1','音楽 1','MUSIC 1',[
 ["오선","オソン","五線(譜)","音符を書く5本の線。授業では 오선에 음표를 그려 보세요.(五線に音符を書こう)"],
 ["4분음표","サブヌムピョ","四分音符","1拍分の長さの音符。授業では 4분음표는 1박이에요.(四分音符は1拍だ)"],
 ["박자표","パクチャピョ","拍子記号","1小節に何拍あるかを表す記号。授業では 이 노래는 4분의 3박자예요.(この曲は4分の3拍子だ)"],
 ["박","パク","拍","音楽の一定の刻み。授業では 박마다 손뼉을 치세요.(毎拍、手をたたこう)"],
 ["빠르기","ッパルギ","テンポ(速さ)","曲の速さ。授業では 처음에는 빠르기가 느려요.(最初はテンポがゆっくりだ)"],
 ["음계","ウムゲ","音階","ドレミファソラシドのように順に並んだ音。授業では 다장조 음계를 연주해 보세요.(ハ長調の音階を弾こう)"],
 ["장조","チャンジョ","長調","明るい感じの調。授業では 이 노래는 장조라서 밝게 들려요.(この曲は長調なので明るく聞こえる)"],
 ["단조","タンジョ","短調","暗い・悲しい感じの調。授業では 단조는 슬프게 들릴 때가 많아요.(短調はよく悲しく聞こえる)"]]);
SUL('ko','sd-ko-mu2','音楽 2','MUSIC 2',[
 ["화음","ファウム","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では 손가락 세 개로 C 화음을 쳐 보세요.(3本の指で C のコードを弾こう)"],
 ["현악기","ヒョナッキ","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では 바이올린은 현악기예요.(バイオリンは弦楽器だ)"],
 ["타악기","タアッキ","打楽器","たたいたりふったりして音を出す楽器。授業では 드럼은 타악기예요.(ドラムは打楽器だ)"],
 ["지휘자","チフィジャ","指揮者","合奏や合唱をまとめる人。授業では 빠르기는 지휘자를 보고 맞추세요.(テンポは指揮者を見てとろう)"],
 ["크레셴도","クレシェンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では 끝으로 갈수록 크레셴도로 연주하세요.(終わりに向かってだんだん強くしよう)"],
 ["작곡가","チャッコッカ","作曲家","曲を作る人。授業では 베토벤은 독일의 작곡가였어요.(ベートーヴェンはドイツの作曲家だった)"],
 ["교향곡","キョヒャンゴク","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では 교향곡은 보통 네 악장으로 되어 있어요.(交響曲はふつう4つの楽章からなる)"],
 ["가사","カサ","歌詞","歌のことば。授業では 가사를 다 외웠나요?(歌詞を覚えているかな?)"]]);
SUL('ko','sd-ko-ar1','美術 1','ART 1',[
 ["스케치","スケチ","スケッチ(する)","大まかにさっと描くこと。授業では 먼저 연필로 빠르게 스케치하세요.(まず鉛筆でさっとスケッチしよう)"],
 ["명암","ミョンアム","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では 명암을 넣으면 사과가 둥글어 보여요.(陰影をつけるとリンゴが丸く見える)"],
 ["원근법","ウォングンポプ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では 원근법으로 길이 길어 보이게 해 보세요.(遠近法を使って道が長く見えるようにしよう)"],
 ["정물화","チョンムルファ","静物画","果物や花びんなど、動かないものを描いた絵。授業では 오늘은 과일 정물화를 그려요.(今日は果物の静物画を描く)"],
 ["초상화","チョサンファ","肖像画","人の顔や姿を描いた絵。授業では 옆 사람의 초상화를 그려 보세요.(隣の人の肖像画を描こう)"],
 ["삼원색","サムォンセク","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では 빨강, 파랑, 노랑이 삼원색이에요.(赤・青・黄が三原色だ)"],
 ["보색","ポセク","補色","色相環で向かい合う、たがいを引き立てる色。授業では 주황과 파랑은 보색이에요.(オレンジと青は補色だ)"],
 ["구도","クド","構図","画面の中での配置。授業では 그리기 전에 구도를 생각해 보세요.(描く前に構図を考えよう)"]]);
SUL('ko','sd-ko-ar2','美術 2','ART 2',[
 ["배경","ペギョン","背景","絵の奥の部分。授業では 배경을 먼저 칠하세요.(背景を先に塗ろう)"],
 ["수채 물감","スチェ ムルガム","水彩絵の具","水でといて使う、すき通る絵の具。授業では 수채 물감은 금방 마르니까 빨리 그리세요.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["팔레트","パルレトゥ","パレット","絵の具をまぜる板。授業では 색은 종이가 아니라 팔레트에서 섞으세요.(色は紙の上ではなくパレットでまぜよう)"],
 ["찰흙","チャルフク","粘土","形を自由に作れるやわらかい土。授業では 찰흙으로 작은 그릇을 만들어 보세요.(粘土で小さなお皿の形を作ろう)"],
 ["조각","チョガク","彫刻","立体的に作った作品。授業では 이 조각은 돌로 만들어졌어요.(この彫刻は石でできている)"],
 ["판화","パンファ","版画","版を作ってインクで紙に写す方法。授業では 판화는 그림 하나로 여러 장을 찍을 수 있어요.(版画では1つの絵からたくさん刷ることができる)"],
 ["걸작","コルチャク","傑作(名作)","とてもすぐれた作品。授業では 모나리자는 유명한 걸작이에요.(モナ・リザは有名な傑作だ)"],
 ["전시회","チョンシフェ","展覧会","作品を並べて見せる催し。授業では 우리 작품이 학교 전시회에 나가요.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-ko-b']={L:'ko',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-ko-it1", "sd-ko-it2", "sd-ko-pe1", "sd-ko-pe2", "sd-ko-mu1", "sd-ko-mu2", "sd-ko-ar1", "sd-ko-ar2"],key:'sd-ko-b'};
SDL_MORE.ko=[{bank:'sd-ko-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-ko-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('es','sd-es-ma1','数学 1','MATH 1',[
 ["el número positivo","エル ヌメロ ポシティボ","正の数","0より大きい数。授業では Los números positivos son mayores que cero.(正の数は0より大きい)"],
 ["el número negativo","エル ヌメロ ネガティボ","負の数","0より小さい数。授業では Menos cinco es un número negativo.(-5は負の数です)"],
 ["el número entero","エル ヌメロ エンテロ","整数","…,-1, 0, 1, 2,… のような数。授業では ¿Es cero coma cinco un número entero?(0.5は整数かな?)"],
 ["el denominador","エル デノミナドル","分母","分数の下の数。授業では Busca el denominador común.(分母をそろえよう=通分)"],
 ["el número decimal","エル ヌメロ デシマル","小数","0.5 のような数。授業では Escribe un cuarto como número decimal.(1/4を小数で書こう)"],
 ["la raíz cuadrada","ラ ライス クアドラダ","平方根","2乗するとその数になる数。授業では La raíz cuadrada de nueve es tres.(9の平方根は3)"],
 ["la variable","ラ バリアブレ","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Aquí, x es una variable.(ここでは x が変数)"],
 ["el ángulo","エル アングロ","角","2本の線が作る開き。授業では Mide el ángulo con el transportador.(分度器で角をはかろう)"]]);
SUL('es','sd-es-ma2','数学 2','MATH 2',[
 ["paralelo","パラレロ","平行な","どこまでのばしても交わらないこと。授業では Estas dos rectas son paralelas.(この2本の線は平行)"],
 ["el área","エル アレア","面積","広さ。授業では Calcula el área del rectángulo.(長方形の面積を求めよう)"],
 ["el radio","エル ラディオ","半径","円の中心から円周までの長さ。授業では El radio es la mitad del diámetro.(半径は直径の半分)"],
 ["el volumen","エル ボルメン","体積","立体の大きさ。授業では Calcula el volumen del cubo.(立方体の体積を求めよう)"],
 ["la función","ラ フンシオン","関数","xが決まるとyがただ1つ決まる関係。授業では y es función de x.(yはxの関数)"],
 ["las coordenadas","ラス コオルデナダス","座標","点の位置を表す数の組。授業では Escribe las coordenadas del punto P.(点Pの座標を書こう)"],
 ["la probabilidad","ラ プロバビリダ","確率","あることが起こる割合。授業では ¿Cuál es la probabilidad de que salga cara?(表が出る確率は?)"],
 ["la media","ラ メディア","平均値","全部たして個数でわった値。授業では Calcula la media de los datos.(データの平均値を計算しよう)"]]);
SUL('es','sd-es-sc1','理科 1','SCIENCE 1',[
 ["la fuerza","ラ フエルサ","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Dibuja una flecha para representar la fuerza.(力を矢印で表そう)"],
 ["la fricción","ラ フリクシオン","摩擦","ふれ合う面で動きをじゃまする力。授業では La fricción frena la caja.(摩擦で箱がおそくなる)"],
 ["la velocidad","ラ ベロシダ","速さ","距離÷時間。授業では Calcula la velocidad media.(平均の速さを計算しよう)"],
 ["la corriente eléctrica","ラ コリエンテ エレクトリカ","電流","電気の流れ。単位は A(アンペア)。授業では Mide la corriente con el amperímetro.(電流計で電流をはかろう)"],
 ["el voltaje","エル ボルタヘ","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Conecta el voltímetro en paralelo.(電圧計は並列につなごう)"],
 ["el campo magnético","エル カンポ マグネティコ","磁界","磁石の力がはたらく空間。授業では Usa limaduras de hierro para ver el campo magnético.(鉄粉で磁界のようすを見よう)"],
 ["el elemento","エル エレメント","元素","物質をつくるもとになる成分。授業では Busca el elemento en la tabla periódica.(周期表でその元素を探そう)"],
 ["el átomo","エル アトモ","原子","物質をつくる、とても小さなつぶ。授業では Los átomos son demasiado pequeños para verlos.(原子は小さすぎて見えない)"]]);
SUL('es','sd-es-sc2','理科 2','SCIENCE 2',[
 ["el ácido","エル アシド","酸","水溶液が酸性を示す物質。授業では El zumo de limón es un ácido.(レモン汁は酸)"],
 ["la respiración","ラ レスピラシオン","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では La respiración libera energía.(呼吸でエネルギーが取り出される)"],
 ["la digestión","ラ ディヘスティオン","消化","食べ物を体に吸収できる形に分解すること。授業では La digestión empieza en la boca.(消化は口から始まる)"],
 ["el gen","エル ヘン","遺伝子","親から子に伝わる特徴のもと。授業では Los genes pasan de padres a hijos.(遺伝子は親から子に伝わる)"],
 ["la cadena alimentaria","ラ カデナ アリメンタリア","食物連鎖","「食べる・食べられる」のつながり。授業では Dibuja una cadena alimentaria del bosque.(森の食物連鎖をかこう)"],
 ["el volcán","エル ボルカン","火山","マグマがふき出してできた山。授業では Este volcán todavía está activo.(この火山は今も活動している)"],
 ["el fósil","エル フォシル","化石","大昔の生物の死がいや跡が残ったもの。授業では Los fósiles nos hablan de la vida antigua.(化石から大昔の生物がわかる)"],
 ["el sistema solar","エル システマ ソラル","太陽系","太陽とそのまわりを回る天体の集まり。授業では Hay ocho planetas en el sistema solar.(太陽系には8つの惑星がある)"]]);
SUL('es','sd-es-so1','社会 1','SOCIAL STUDIES 1',[
 ["la latitud","ラ ラティトゥ","緯度","赤道から北や南へどれだけ離れているか。授業では Tokio está a unos 36 grados de latitud norte.(東京は北緯約36度にある)"],
 ["la península","ラ ペニンスラ","半島","三方を海に囲まれた陸地。授業では Italia es una península larga con forma de bota.(イタリアはブーツの形をした長い半島だ)"],
 ["la densidad de población","ラ デンシダ デ ポブラシオン","人口密度","一定の面積に何人住んでいるか。授業では Tokio tiene una densidad de población muy alta.(東京は人口密度がとても高い)"],
 ["exportar","エクスポルタル","輸出(する)","国内のものを外国に売ること。授業では Japón exporta muchos coches.(日本はたくさんの車を輸出している)"],
 ["importar","インポルタル","輸入(する)","外国のものを国内に買い入れること。授業では La mayor parte del trigo de Japón es importado.(日本の小麦のほとんどは輸入されている)"],
 ["la agricultura","ラ アグリクルトゥラ","農業","作物を育てたり家畜を飼ったりする仕事。授業では La agricultura es importante en esta región.(この地域では農業が大切だ)"],
 ["la civilización","ラ シビリサシオン","文明","都市・文字・国のしくみが発達した社会。授業では Las cuatro grandes civilizaciones nacieron junto a grandes ríos.(四大文明は大きな川のほとりで始まった)"],
 ["el imperio","エル インペリオ","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では El Imperio romano duró cientos de años.(ローマ帝国は何百年も続いた)"]]);
SUL('es','sd-es-so2','社会 2','SOCIAL STUDIES 2',[
 ["la colonia","ラ コロニア","植民地","ほかの国に支配された土地。授業では La India fue una colonia británica.(インドはかつてイギリスの植民地だった)"],
 ["la independencia","ラ インデペンデンシア","独立","ほかの国の支配から離れて自分の国になること。授業では Estados Unidos declaró su independencia en 1776.(アメリカは1776年に独立を宣言した)"],
 ["el tratado","エル トラタド","条約","国と国が文書で結ぶ約束。授業では Los dos países firmaron un tratado de paz.(2つの国は平和条約に署名した)"],
 ["la democracia","ラ デモクラシア","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では En una democracia, el pueblo elige a sus líderes.(民主主義では、国民がリーダーを選ぶ)"],
 ["el primer ministro","エル プリメル ミニストロ","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では El primer ministro dirige el gabinete.(首相は内閣を率いる)"],
 ["los derechos humanos","ロス デレチョス ウマノス","人権","人が生まれながらにもつ権利。授業では Hay que respetar los derechos humanos de todos.(すべての人の人権が尊重されなければならない)"],
 ["el impuesto","エル インプエスト","税金","国や自治体の仕事のために国民が納めるお金。授業では Los impuestos pagan las carreteras y las escuelas.(税金で道路や学校がまかなわれている)"],
 ["el comercio","エル コメルシオ","貿易","国と国の間でものを売り買いすること。授業では El comercio entre Japón y China es muy activo.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('es','sd-es-la1','国語 1','LANGUAGE ARTS 1',[
 ["el pronombre","エル プロノンブレ","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では Cambia el sustantivo por un pronombre.(名詞を代名詞に置き換えよう)"],
 ["la conjunción","ラ コンフンシオン","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では Une las dos oraciones con una conjunción.(接続詞で2つの文をつなごう)"],
 ["la puntuación","ラ プントゥアシオン","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では No olvides la puntuación al final de cada oración.(それぞれの文の終わりの句読点を忘れないで)"],
 ["el sinónimo","エル シノニモ","類義語(同じ意味の語)","意味が同じか近い語。授業では Busca un sinónimo de esta palabra.(この単語の類義語を見つけよう)"],
 ["la idea principal","ラ イデア プリンシパル","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では ¿Cuál es la idea principal de este párrafo?(この段落の要旨は何かな?)"],
 ["resumir","レスミル","要約する","大事なところだけを短くまとめる。授業では Resume el capítulo en tres oraciones.(その章を3文で要約しよう)"],
 ["el argumento","エル アルグメント","あらすじ(筋)","物語のできごとの流れ。授業では El argumento de esta novela está lleno de sorpresas.(この小説の筋は驚きでいっぱいだ)"],
 ["el personaje","エル ペルソナヘ","登場人物","物語に出てくる人や動物。授業では ¿Quién es el personaje principal de la historia?(物語の主人公はだれかな?)"]]);
SUL('es','sd-es-la2','国語 2','LANGUAGE ARTS 2',[
 ["el tema","エル テマ","テーマ(主題)","物語を通して伝わる大切な考え。授業では El tema de la historia es la amistad.(物語のテーマは友情だ)"],
 ["el narrador","エル ナラドル","語り手","物語を語っている人。授業では El narrador cuenta la historia en primera persona.(語り手は一人称で物語を語っている)"],
 ["la metáfora","ラ メタフォラ","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では «La vida es un viaje» es una metáfora.(「人生は旅だ」は隠喩だ)"],
 ["la conclusión","ラ コンクルシオン","結論","エッセイの最後でまとめる部分。授業では Repite tu idea principal en la conclusión.(結論でもう一度主な主張を述べよう)"],
 ["el borrador","エル ボラドル","下書き","まず全体を書いてみたもの。授業では Termina el borrador antes del viernes.(金曜日までに下書きを終わらせよう)"],
 ["revisar","レビサル","校正する","つづりや句読点のまちがいを確かめる。授業では Revisa bien las faltas de ortografía.(つづりのまちがいがないか注意して校正しよう)"],
 ["la presentación","ラ プレセンタシオン","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では Cada grupo hará una presentación de cinco minutos.(各グループが5分の発表をする)"],
 ["el debate","エル デバテ","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では El tema del debate de hoy es el uniforme escolar.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-es-a']={L:'es',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-es-ma1", "sd-es-ma2", "sd-es-sc1", "sd-es-sc2", "sd-es-so1", "sd-es-so2", "sd-es-la1", "sd-es-la2"],key:'sd-es-a'};
SUL('es','sd-es-it1','情報 1','COMPUTING 1',[
 ["el hardware","エル ハードウェア","ハードウェア","コンピューターの機械の部分。授業では El teclado y la pantalla son hardware.(キーボードと画面はハードウェアだ)"],
 ["el software","エル ソフトウェア","ソフトウェア","コンピューターを動かすプログラム。授業では Instala el software antes de la clase.(授業の前にソフトウェアをインストールしておこう)"],
 ["el sistema operativo","エル システマ オペラティボ","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows y macOS son sistemas operativos.(Windows と macOS はOSだ)"],
 ["el sistema binario","エル システマ ビナリオ","2進法","0と1だけで数を表す方法。授業では Los ordenadores guardan todo en binario.(コンピューターはすべてを2進法で記録する)"],
 ["el píxel","エル ピクセル","画素(ピクセル)","画像をつくる小さな点。授業では Si haces zoom, puedes ver cada píxel.(拡大すると一つ一つの画素が見える)"],
 ["el algoritmo","エル アルゴリトモ","アルゴリズム","問題を解くための手順。授業では Escribe un algoritmo para hacer un sándwich.(サンドイッチを作るアルゴリズムを書こう)"],
 ["el diagrama de flujo","エル ディアグラマ デ フルホ","フローチャート","手順を図形と矢印で表した図。授業では Dibuja un diagrama de flujo antes de programar.(コードを書く前にフローチャートを描こう)"],
 ["el bucle","エル ブクレ","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では Usa un bucle para dibujar diez estrellas.(繰り返しを使って星を10個描こう)"]]);
SUL('es','sd-es-it2','情報 2','COMPUTING 2',[
 ["depurar","デプラル","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では Vamos a depurar este código juntos.(このコードを一緒にデバッグしよう)"],
 ["la red","ラ レ","ネットワーク","コンピューターどうしをつないだもの。授業では Todos los ordenadores de esta aula están en la misma red.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["el buscador","エル ブスカドル","検索エンジン","キーワードでウェブの情報を探すサービス。授業では Usa buenas palabras clave en el buscador.(検索エンジンではよいキーワードを使おう)"],
 ["el phishing","エル フィシン","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では Nunca hagas clic en los enlaces de correos de phishing.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["el cifrado","エル シフラド","暗号化","データを決まった人しか読めない形に変えること。授業では El cifrado protege la privacidad de tus mensajes.(暗号化によってメッセージの秘密が守られる)"],
 ["los datos personales","ロス ダトス ペルソナレス","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では No compartas datos personales en internet.(ネットで個人情報を公開しないで)"],
 ["los derechos de autor","ロス デレチョス デ アウトル","著作権","作品を作った人がもつ権利。授業では Esta canción está protegida por derechos de autor.(この曲は著作権で守られている)"],
 ["la inteligencia artificial","ラ インテリヘンシア アルティフィシアル","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では La inteligencia artificial puede traducir idiomas.(人工知能は言葉を翻訳できる)"]]);
SUL('es','sd-es-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["el músculo","エル ムスクロ","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では Estira los músculos de las piernas antes de correr.(走る前に脚の筋肉を伸ばそう)"],
 ["el hueso","エル ウエソ","骨","体を支え、内臓を守るかたいもの。授業では El calcio fortalece los huesos.(カルシウムは骨を強くする)"],
 ["la articulación","ラ アルティクラシオン","関節","骨と骨のつなぎ目。授業では La rodilla es una articulación.(ひざは関節だ)"],
 ["la frecuencia cardíaca","ラ フレクエンシア カルディアカ","心拍数","1分間に心臓が打つ回数。授業では Mide tu frecuencia cardíaca después de correr.(走ったあとに心拍数を測ろう)"],
 ["la pubertad","ラ プベルタ","思春期","子どもから大人の体に変わっていく時期。授業では Tu cuerpo cambia mucho durante la pubertad.(思春期には体が大きく変わる)"],
 ["el nutriente","エル ヌトリエンテ","栄養素","体に必要な、食べ物にふくまれる成分。授業では Las verduras están llenas de nutrientes.(野菜には栄養素がたくさんふくまれている)"],
 ["la proteína","ラ プロテイナ","たんぱく質","筋肉や血をつくる栄養素。授業では Come proteínas para ganar músculo.(筋肉をつけるにはたんぱく質をとろう)"],
 ["la dieta equilibrada","ラ ディエタ エキリブラダ","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では Una dieta equilibrada incluye fruta, verdura y cereales.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('es','sd-es-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["la hidratación","ラ イドラタシオン","水分補給","体に必要な水分をとること。授業では La hidratación es importante en los días de calor.(暑い日は水分補給が大切だ)"],
 ["la salud mental","ラ サル メンタル","心の健康","気持ちや心の状態の健康。授業では Hablar con un amigo puede ayudar a tu salud mental.(友だちに話すことは心の健康の助けになる)"],
 ["los primeros auxilios","ロス プリメロス アウクシリオス","応急手当","けがや急な病気のときにその場でする手当て。授業では Todos deberían aprender primeros auxilios básicos.(だれもが基本の応急手当を学ぶべきだ)"],
 ["el esguince","エル エスギンセ","ねんざ","関節をひねって痛めること。授業では Tiene un esguince en el tobillo.(彼は足首をねんざしている)"],
 ["el golpe de calor","エル ゴルペ デ カロル","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では Descansa a la sombra para evitar un golpe de calor.(熱中症を防ぐために日かげで休もう)"],
 ["el árbitro","エル アルビトロ","審判","試合のルールを守らせる人。授業では Escucha el silbato del árbitro.(審判の笛をよく聞こう)"],
 ["la falta","ラ ファルタ","反則(ファウル)","ルールに違反すること。授業では Empujar es falta.(押すのは反則だ)"],
 ["la carrera de relevos","ラ カレラ デ レレボス","リレー","チームで順番に走ってバトンをつなぐ競走。授業では Pasa bien el testigo en la carrera de relevos.(リレーではバトンをなめらかに渡そう)"]]);
SUL('es','sd-es-mu1','音楽 1','MUSIC 1',[
 ["el pentagrama","エル ペンタグラマ","五線(譜)","音符を書く5本の線。授業では Escribe las notas en el pentagrama.(五線に音符を書こう)"],
 ["la negra","ラ ネグラ","四分音符","1拍分の長さの音符。授業では Una negra dura un tiempo.(四分音符は1拍だ)"],
 ["el compás","エル コンパス","拍子記号","1小節に何拍あるかを表す記号。授業では Esta canción está en compás de tres por cuatro.(この曲は4分の3拍子だ)"],
 ["el pulso","エル プルソ","拍","音楽の一定の刻み。授業では Da una palmada en cada pulso.(毎拍、手をたたこう)"],
 ["el tempo","エル テンポ","テンポ(速さ)","曲の速さ。授業では Al principio, el tempo es lento.(最初はテンポがゆっくりだ)"],
 ["la escala","ラ エスカラ","音階","ドレミファソラシドのように順に並んだ音。授業では Toca la escala de do mayor.(ハ長調の音階を弾こう)"],
 ["la tonalidad mayor","ラ トナリダ マヨル","長調","明るい感じの調。授業では Esta canción está en tonalidad mayor, por eso suena alegre.(この曲は長調なので明るく聞こえる)"],
 ["la tonalidad menor","ラ トナリダ メノル","短調","暗い・悲しい感じの調。授業では Las tonalidades menores suelen sonar tristes.(短調はよく悲しく聞こえる)"]]);
SUL('es','sd-es-mu2','音楽 2','MUSIC 2',[
 ["el acorde","エル アコルデ","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では Toca el acorde de do con tres dedos.(3本の指で C のコードを弾こう)"],
 ["el instrumento de cuerda","エル インストゥルメント デ クエルダ","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では El violín es un instrumento de cuerda.(バイオリンは弦楽器だ)"],
 ["el instrumento de percusión","エル インストゥルメント デ ペルクシオン","打楽器","たたいたりふったりして音を出す楽器。授業では Los tambores son instrumentos de percusión.(ドラムは打楽器だ)"],
 ["el director","エル ディレクトル","指揮者","合奏や合唱をまとめる人。授業では Mira al director para seguir el tempo.(テンポは指揮者を見てとろう)"],
 ["el crescendo","エル クレシェンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では Haz un crescendo hacia el final.(終わりに向かってだんだん強くしよう)"],
 ["el compositor","エル コンポシトル","作曲家","曲を作る人。授業では Beethoven fue un compositor alemán.(ベートーヴェンはドイツの作曲家だった)"],
 ["la sinfonía","ラ シンフォニア","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では Una sinfonía suele tener cuatro movimientos.(交響曲はふつう4つの楽章からなる)"],
 ["la letra","ラ レトラ","歌詞","歌のことば。授業では ¿Te sabes la letra de memoria?(歌詞を覚えているかな?)"]]);
SUL('es','sd-es-ar1','美術 1','ART 1',[
 ["el boceto","エル ボセト","スケッチ(する)","大まかにさっと描くこと。授業では Empieza con un boceto rápido a lápiz.(まず鉛筆でさっとスケッチしよう)"],
 ["el sombreado","エル ソンブレアド","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では El sombreado hace que la manzana parezca redonda.(陰影をつけるとリンゴが丸く見える)"],
 ["la perspectiva","ラ ペルスペクティバ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では Usa la perspectiva para que el camino parezca largo.(遠近法を使って道が長く見えるようにしよう)"],
 ["el bodegón","エル ボデゴン","静物画","果物や花びんなど、動かないものを描いた絵。授業では Hoy vamos a pintar un bodegón de frutas.(今日は果物の静物画を描く)"],
 ["el retrato","エル レトラト","肖像画","人の顔や姿を描いた絵。授業では Dibuja un retrato del compañero de al lado.(隣の人の肖像画を描こう)"],
 ["los colores primarios","ロス コロレス プリマリオス","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では El rojo, el azul y el amarillo son los colores primarios.(赤・青・黄が三原色だ)"],
 ["los colores complementarios","ロス コロレス コンプレメンタリオス","補色","色相環で向かい合う、たがいを引き立てる色。授業では El naranja y el azul son colores complementarios.(オレンジと青は補色だ)"],
 ["la composición","ラ コンポシシオン","構図","画面の中での配置。授業では Piensa en la composición antes de pintar.(描く前に構図を考えよう)"]]);
SUL('es','sd-es-ar2','美術 2','ART 2',[
 ["el fondo","エル フォンド","背景","絵の奥の部分。授業では Pinta primero el fondo.(背景を先に塗ろう)"],
 ["la acuarela","ラ アクアレラ","水彩絵の具","水でといて使う、すき通る絵の具。授業では La acuarela se seca rápido, así que trabaja deprisa.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["la paleta","ラ パレタ","パレット","絵の具をまぜる板。授業では Mezcla los colores en la paleta, no en el papel.(色は紙の上ではなくパレットでまぜよう)"],
 ["la arcilla","ラ アルシーヤ","粘土","形を自由に作れるやわらかい土。授業では Dale forma de cuenco pequeño a la arcilla.(粘土で小さなお皿の形を作ろう)"],
 ["la escultura","ラ エスクルトゥラ","彫刻","立体的に作った作品。授業では Esta escultura es de piedra.(この彫刻は石でできている)"],
 ["el grabado","エル グラバド","版画","版を作ってインクで紙に写す方法。授業では Con el grabado puedes hacer muchas copias de un dibujo.(版画では1つの絵からたくさん刷ることができる)"],
 ["la obra maestra","ラ オブラ マエストラ","傑作(名作)","とてもすぐれた作品。授業では La Mona Lisa es una obra maestra famosa.(モナ・リザは有名な傑作だ)"],
 ["la exposición","ラ エクスポシシオン","展覧会","作品を並べて見せる催し。授業では Nuestras obras estarán en la exposición del colegio.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-es-b']={L:'es',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-es-it1", "sd-es-it2", "sd-es-pe1", "sd-es-pe2", "sd-es-mu1", "sd-es-mu2", "sd-es-ar1", "sd-es-ar2"],key:'sd-es-b'};
SDL_MORE.es=[{bank:'sd-es-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-es-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('it','sd-it-ma1','数学 1','MATH 1',[
 ["il numero positivo","イル ヌーメロ ポズィティーヴォ","正の数","0より大きい数。授業では I numeri positivi sono maggiori di zero.(正の数は0より大きい)"],
 ["il numero negativo","イル ヌーメロ ネガティーヴォ","負の数","0より小さい数。授業では Meno cinque è un numero negativo.(-5は負の数です)"],
 ["il numero intero","イル ヌーメロ インテーロ","整数","…,-1, 0, 1, 2,… のような数。授業では Zero virgola cinque è un numero intero?(0.5は整数かな?)"],
 ["il denominatore","イル デノミナトーレ","分母","分数の下の数。授業では Trova il denominatore comune.(分母をそろえよう=通分)"],
 ["il numero decimale","イル ヌーメロ デチマーレ","小数","0.5 のような数。授業では Scrivi un quarto come numero decimale.(1/4を小数で書こう)"],
 ["la radice quadrata","ラ ラディーチェ クアドラータ","平方根","2乗するとその数になる数。授業では La radice quadrata di nove è tre.(9の平方根は3)"],
 ["la variabile","ラ ヴァリアービレ","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Qui x è una variabile.(ここでは x が変数)"],
 ["l'angolo","ランゴロ","角","2本の線が作る開き。授業では Misura l'angolo con il goniometro.(分度器で角をはかろう)"]]);
SUL('it','sd-it-ma2','数学 2','MATH 2',[
 ["parallelo","パラッレーロ","平行な","どこまでのばしても交わらないこと。授業では Queste due rette sono parallele.(この2本の線は平行)"],
 ["l'area","ラーレア","面積","広さ。授業では Calcola l'area del rettangolo.(長方形の面積を求めよう)"],
 ["il raggio","イル ラッジョ","半径","円の中心から円周までの長さ。授業では Il raggio è la metà del diametro.(半径は直径の半分)"],
 ["il volume","イル ヴォルーメ","体積","立体の大きさ。授業では Calcola il volume del cubo.(立方体の体積を求めよう)"],
 ["la funzione","ラ フンツィオーネ","関数","xが決まるとyがただ1つ決まる関係。授業では y è funzione di x.(yはxの関数)"],
 ["le coordinate","レ コオルディナーテ","座標","点の位置を表す数の組。授業では Scrivi le coordinate del punto P.(点Pの座標を書こう)"],
 ["la probabilità","ラ プロバビリタ","確率","あることが起こる割合。授業では Qual è la probabilità che esca testa?(表が出る確率は?)"],
 ["la media","ラ メーディア","平均値","全部たして個数でわった値。授業では Calcola la media dei dati.(データの平均値を計算しよう)"]]);
SUL('it','sd-it-sc1','理科 1','SCIENCE 1',[
 ["la forza","ラ フォルツァ","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Disegna una freccia per rappresentare la forza.(力を矢印で表そう)"],
 ["l'attrito","ラットリート","摩擦","ふれ合う面で動きをじゃまする力。授業では L'attrito rallenta la scatola.(摩擦で箱がおそくなる)"],
 ["la velocità","ラ ヴェロチタ","速さ","距離÷時間。授業では Calcola la velocità media.(平均の速さを計算しよう)"],
 ["la corrente elettrica","ラ コッレンテ エレットリカ","電流","電気の流れ。単位は A(アンペア)。授業では Misura la corrente con l'amperometro.(電流計で電流をはかろう)"],
 ["la tensione","ラ テンスィオーネ","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Collega il voltmetro in parallelo.(電圧計は並列につなごう)"],
 ["il campo magnetico","イル カンポ マニェーティコ","磁界","磁石の力がはたらく空間。授業では Usa la limatura di ferro per vedere il campo magnetico.(鉄粉で磁界のようすを見よう)"],
 ["l'elemento","レレメント","元素","物質をつくるもとになる成分。授業では Trova l'elemento nella tavola periodica.(周期表でその元素を探そう)"],
 ["l'atomo","ラートモ","原子","物質をつくる、とても小さなつぶ。授業では Gli atomi sono troppo piccoli per essere visti.(原子は小さすぎて見えない)"]]);
SUL('it','sd-it-sc2','理科 2','SCIENCE 2',[
 ["l'acido","ラーチド","酸","水溶液が酸性を示す物質。授業では Il succo di limone è un acido.(レモン汁は酸)"],
 ["la respirazione","ラ レスピラツィオーネ","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では La respirazione libera energia.(呼吸でエネルギーが取り出される)"],
 ["la digestione","ラ ディジェスティオーネ","消化","食べ物を体に吸収できる形に分解すること。授業では La digestione inizia in bocca.(消化は口から始まる)"],
 ["il gene","イル ジェーネ","遺伝子","親から子に伝わる特徴のもと。授業では I geni passano dai genitori ai figli.(遺伝子は親から子に伝わる)"],
 ["la catena alimentare","ラ カテーナ アリメンターレ","食物連鎖","「食べる・食べられる」のつながり。授業では Disegna una catena alimentare del bosco.(森の食物連鎖をかこう)"],
 ["il vulcano","イル ヴルカーノ","火山","マグマがふき出してできた山。授業では Questo vulcano è ancora attivo.(この火山は今も活動している)"],
 ["il fossile","イル フォッスィレ","化石","大昔の生物の死がいや跡が残ったもの。授業では I fossili ci raccontano la vita antica.(化石から大昔の生物がわかる)"],
 ["il sistema solare","イル スィステーマ ソラーレ","太陽系","太陽とそのまわりを回る天体の集まり。授業では Nel sistema solare ci sono otto pianeti.(太陽系には8つの惑星がある)"]]);
SUL('it','sd-it-so1','社会 1','SOCIAL STUDIES 1',[
 ["la latitudine","ラ ラティトゥーディネ","緯度","赤道から北や南へどれだけ離れているか。授業では Tokyo si trova a circa 36 gradi di latitudine nord.(東京は北緯約36度にある)"],
 ["la penisola","ラ ペニーゾラ","半島","三方を海に囲まれた陸地。授業では L'Italia è una lunga penisola a forma di stivale.(イタリアはブーツの形をした長い半島だ)"],
 ["la densità di popolazione","ラ デンスィタ ディ ポポラツィオーネ","人口密度","一定の面積に何人住んでいるか。授業では Tokyo ha una densità di popolazione molto alta.(東京は人口密度がとても高い)"],
 ["esportare","エスポルターレ","輸出(する)","国内のものを外国に売ること。授業では Il Giappone esporta molte automobili.(日本はたくさんの車を輸出している)"],
 ["importare","インポルターレ","輸入(する)","外国のものを国内に買い入れること。授業では La maggior parte del grano in Giappone è importata.(日本の小麦のほとんどは輸入されている)"],
 ["l'agricoltura","ラグリコルトゥーラ","農業","作物を育てたり家畜を飼ったりする仕事。授業では L'agricoltura è importante in questa regione.(この地域では農業が大切だ)"],
 ["la civiltà","ラ チヴィルタ","文明","都市・文字・国のしくみが発達した社会。授業では Le quattro grandi civiltà nacquero lungo grandi fiumi.(四大文明は大きな川のほとりで始まった)"],
 ["l'impero","リンペーロ","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では L'Impero romano durò centinaia di anni.(ローマ帝国は何百年も続いた)"]]);
SUL('it','sd-it-so2','社会 2','SOCIAL STUDIES 2',[
 ["la colonia","ラ コローニア","植民地","ほかの国に支配された土地。授業では L'India era una colonia britannica.(インドはかつてイギリスの植民地だった)"],
 ["l'indipendenza","リンディペンデンツァ","独立","ほかの国の支配から離れて自分の国になること。授業では Gli Stati Uniti dichiararono l'indipendenza nel 1776.(アメリカは1776年に独立を宣言した)"],
 ["il trattato","イル トラッタート","条約","国と国が文書で結ぶ約束。授業では I due paesi firmarono un trattato di pace.(2つの国は平和条約に署名した)"],
 ["la democrazia","ラ デモクラツィーア","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では In una democrazia, il popolo sceglie i propri leader.(民主主義では、国民がリーダーを選ぶ)"],
 ["il primo ministro","イル プリーモ ミニストロ","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では Il primo ministro guida il governo.(首相は内閣を率いる)"],
 ["i diritti umani","イ ディリッティ ウマーニ","人権","人が生まれながらにもつ権利。授業では I diritti umani di tutti devono essere rispettati.(すべての人の人権が尊重されなければならない)"],
 ["la tassa","ラ タッサ","税金","国や自治体の仕事のために国民が納めるお金。授業では Le tasse pagano strade e scuole.(税金で道路や学校がまかなわれている)"],
 ["il commercio","イル コンメルチョ","貿易","国と国の間でものを売り買いすること。授業では Il commercio tra Giappone e Cina è molto attivo.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('it','sd-it-la1','国語 1','LANGUAGE ARTS 1',[
 ["il pronome","イル プロノーメ","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では Sostituisci il nome con un pronome.(名詞を代名詞に置き換えよう)"],
 ["la congiunzione","ラ コンジュンツィオーネ","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では Unisci le due frasi con una congiunzione.(接続詞で2つの文をつなごう)"],
 ["la punteggiatura","ラ プンテッジャトゥーラ","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では Non dimenticare la punteggiatura alla fine di ogni frase.(それぞれの文の終わりの句読点を忘れないで)"],
 ["il sinonimo","イル スィノーニモ","類義語(同じ意味の語)","意味が同じか近い語。授業では Trova un sinonimo di questa parola.(この単語の類義語を見つけよう)"],
 ["l'idea principale","リデーア プリンチパーレ","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では Qual è l'idea principale di questo paragrafo?(この段落の要旨は何かな?)"],
 ["riassumere","リアッスーメレ","要約する","大事なところだけを短くまとめる。授業では Riassumi il capitolo in tre frasi.(その章を3文で要約しよう)"],
 ["la trama","ラ トラーマ","あらすじ(筋)","物語のできごとの流れ。授業では La trama di questo romanzo è piena di sorprese.(この小説の筋は驚きでいっぱいだ)"],
 ["il personaggio","イル ペルソナッジョ","登場人物","物語に出てくる人や動物。授業では Chi è il personaggio principale della storia?(物語の主人公はだれかな?)"]]);
SUL('it','sd-it-la2','国語 2','LANGUAGE ARTS 2',[
 ["il tema","イル テーマ","テーマ(主題)","物語を通して伝わる大切な考え。授業では Il tema della storia è l'amicizia.(物語のテーマは友情だ)"],
 ["il narratore","イル ナッラトーレ","語り手","物語を語っている人。授業では Il narratore racconta la storia in prima persona.(語り手は一人称で物語を語っている)"],
 ["la metafora","ラ メターフォラ","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では «La vita è un viaggio» è una metafora.(「人生は旅だ」は隠喩だ)"],
 ["la conclusione","ラ コンクルズィオーネ","結論","エッセイの最後でまとめる部分。授業では Ripeti la tua idea principale nella conclusione.(結論でもう一度主な主張を述べよう)"],
 ["la brutta copia","ラ ブルッタ コーピア","下書き","まず全体を書いてみたもの。授業では Finisci la brutta copia entro venerdì.(金曜日までに下書きを終わらせよう)"],
 ["rileggere","リレッジェレ","校正する","つづりや句読点のまちがいを確かめる。授業では Rileggi con attenzione per trovare gli errori di ortografia.(つづりのまちがいがないか注意して校正しよう)"],
 ["la presentazione","ラ プレゼンタツィオーネ","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では Ogni gruppo farà una presentazione di cinque minuti.(各グループが5分の発表をする)"],
 ["il dibattito","イル ディバッティト","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では Il tema del dibattito di oggi è la divisa scolastica.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-it-a']={L:'it',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-it-ma1", "sd-it-ma2", "sd-it-sc1", "sd-it-sc2", "sd-it-so1", "sd-it-so2", "sd-it-la1", "sd-it-la2"],key:'sd-it-a'};
SUL('it','sd-it-it1','情報 1','COMPUTING 1',[
 ["l'hardware","ラードウェア","ハードウェア","コンピューターの機械の部分。授業では La tastiera e lo schermo sono hardware.(キーボードと画面はハードウェアだ)"],
 ["il software","イル ソフトウェア","ソフトウェア","コンピューターを動かすプログラム。授業では Installa il software prima della lezione.(授業の前にソフトウェアをインストールしておこう)"],
 ["il sistema operativo","イル スィステーマ オペラティーヴォ","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows e macOS sono sistemi operativi.(Windows と macOS はOSだ)"],
 ["il sistema binario","イル スィステーマ ビナーリオ","2進法","0と1だけで数を表す方法。授業では I computer salvano tutto in binario.(コンピューターはすべてを2進法で記録する)"],
 ["il pixel","イル ピクセル","画素(ピクセル)","画像をつくる小さな点。授業では Se ingrandisci, vedi ogni pixel.(拡大すると一つ一つの画素が見える)"],
 ["l'algoritmo","ラルゴリトモ","アルゴリズム","問題を解くための手順。授業では Scrivi un algoritmo per preparare un panino.(サンドイッチを作るアルゴリズムを書こう)"],
 ["il diagramma di flusso","イル ディアグランマ ディ フルッソ","フローチャート","手順を図形と矢印で表した図。授業では Disegna un diagramma di flusso prima di programmare.(コードを書く前にフローチャートを描こう)"],
 ["il ciclo","イル チークロ","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では Usa un ciclo per disegnare dieci stelle.(繰り返しを使って星を10個描こう)"]]);
SUL('it','sd-it-it2','情報 2','COMPUTING 2',[
 ["fare il debug","ファーレ イル デバッグ","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では Facciamo il debug di questo codice insieme.(このコードを一緒にデバッグしよう)"],
 ["la rete","ラ レーテ","ネットワーク","コンピューターどうしをつないだもの。授業では Tutti i computer di quest'aula sono sulla stessa rete.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["il motore di ricerca","イル モトーレ ディ リチェルカ","検索エンジン","キーワードでウェブの情報を探すサービス。授業では Usa buone parole chiave nel motore di ricerca.(検索エンジンではよいキーワードを使おう)"],
 ["il phishing","イル フィッシング","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では Non cliccare mai sui link delle email di phishing.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["la crittografia","ラ クリットグラフィーア","暗号化","データを決まった人しか読めない形に変えること。授業では La crittografia protegge i tuoi messaggi.(暗号化によってメッセージの秘密が守られる)"],
 ["i dati personali","イ ダーティ ペルソナーリ","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では Non condividere i dati personali online.(ネットで個人情報を公開しないで)"],
 ["il diritto d'autore","イル ディリット ダウトーレ","著作権","作品を作った人がもつ権利。授業では Questa canzone è protetta dal diritto d'autore.(この曲は著作権で守られている)"],
 ["l'intelligenza artificiale","リンテッリジェンツァ アルティフィチャーレ","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では L'intelligenza artificiale può tradurre le lingue.(人工知能は言葉を翻訳できる)"]]);
SUL('it','sd-it-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["il muscolo","イル ムスコロ","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では Allunga i muscoli delle gambe prima di correre.(走る前に脚の筋肉を伸ばそう)"],
 ["l'osso","ロッソ","骨","体を支え、内臓を守るかたいもの。授業では Il calcio rende forti le ossa.(カルシウムは骨を強くする)"],
 ["l'articolazione","ラルティコラツィオーネ","関節","骨と骨のつなぎ目。授業では Il ginocchio è un'articolazione.(ひざは関節だ)"],
 ["la frequenza cardiaca","ラ フレクエンツァ カルディーアカ","心拍数","1分間に心臓が打つ回数。授業では Controlla la frequenza cardiaca dopo la corsa.(走ったあとに心拍数を測ろう)"],
 ["la pubertà","ラ プベルタ","思春期","子どもから大人の体に変わっていく時期。授業では Durante la pubertà il corpo cambia molto.(思春期には体が大きく変わる)"],
 ["il nutriente","イル ヌトリエンテ","栄養素","体に必要な、食べ物にふくまれる成分。授業では Le verdure sono piene di nutrienti.(野菜には栄養素がたくさんふくまれている)"],
 ["la proteina","ラ プロテイーナ","たんぱく質","筋肉や血をつくる栄養素。授業では Mangia proteine per sviluppare i muscoli.(筋肉をつけるにはたんぱく質をとろう)"],
 ["la dieta equilibrata","ラ ディエータ エクイリブラータ","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では Una dieta equilibrata comprende frutta, verdura e cereali.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('it','sd-it-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["l'idratazione","リドラタツィオーネ","水分補給","体に必要な水分をとること。授業では L'idratazione è importante nelle giornate calde.(暑い日は水分補給が大切だ)"],
 ["la salute mentale","ラ サルーテ メンターレ","心の健康","気持ちや心の状態の健康。授業では Parlare con un amico può aiutare la salute mentale.(友だちに話すことは心の健康の助けになる)"],
 ["il primo soccorso","イル プリーモ ソッコルソ","応急手当","けがや急な病気のときにその場でする手当て。授業では Tutti dovrebbero imparare il primo soccorso di base.(だれもが基本の応急手当を学ぶべきだ)"],
 ["la distorsione","ラ ディストルスィオーネ","ねんざ","関節をひねって痛めること。授業では Ha una distorsione alla caviglia.(彼は足首をねんざしている)"],
 ["il colpo di calore","イル コルポ ディ カローレ","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では Riposati all'ombra per evitare un colpo di calore.(熱中症を防ぐために日かげで休もう)"],
 ["l'arbitro","ラルビトロ","審判","試合のルールを守らせる人。授業では Ascolta il fischietto dell'arbitro.(審判の笛をよく聞こう)"],
 ["il fallo","イル ファッロ","反則(ファウル)","ルールに違反すること。授業では Spingere è fallo.(押すのは反則だ)"],
 ["la staffetta","ラ スタッフェッタ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では Passa bene il testimone nella staffetta.(リレーではバトンをなめらかに渡そう)"]]);
SUL('it','sd-it-mu1','音楽 1','MUSIC 1',[
 ["il pentagramma","イル ペンタグランマ","五線(譜)","音符を書く5本の線。授業では Scrivi le note sul pentagramma.(五線に音符を書こう)"],
 ["la semiminima","ラ セミミーニマ","四分音符","1拍分の長さの音符。授業では Una semiminima vale un tempo.(四分音符は1拍だ)"],
 ["l'indicazione di tempo","リンディカツィオーネ ディ テンポ","拍子記号","1小節に何拍あるかを表す記号。授業では Questa canzone è in tre quarti.(この曲は4分の3拍子だ)"],
 ["la pulsazione","ラ プルサツィオーネ","拍","音楽の一定の刻み。授業では Batti le mani su ogni pulsazione.(毎拍、手をたたこう)"],
 ["l'andamento","ランダメント","テンポ(速さ)","曲の速さ。授業では All'inizio l'andamento è lento.(最初はテンポがゆっくりだ)"],
 ["la scala","ラ スカーラ","音階","ドレミファソラシドのように順に並んだ音。授業では Suona la scala di do maggiore.(ハ長調の音階を弾こう)"],
 ["la tonalità maggiore","ラ トナリタ マッジョーレ","長調","明るい感じの調。授業では Questa canzone è in tonalità maggiore, quindi suona allegra.(この曲は長調なので明るく聞こえる)"],
 ["la tonalità minore","ラ トナリタ ミノーレ","短調","暗い・悲しい感じの調。授業では Le tonalità minori spesso suonano tristi.(短調はよく悲しく聞こえる)"]]);
SUL('it','sd-it-mu2','音楽 2','MUSIC 2',[
 ["l'accordo","ラッコルド","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では Suona l'accordo di do con tre dita.(3本の指で C のコードを弾こう)"],
 ["lo strumento a corda","ロ ストゥルメント ア コルダ","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では Il violino è uno strumento a corda.(バイオリンは弦楽器だ)"],
 ["lo strumento a percussione","ロ ストゥルメント ア ペルクッスィオーネ","打楽器","たたいたりふったりして音を出す楽器。授業では I tamburi sono strumenti a percussione.(ドラムは打楽器だ)"],
 ["il direttore d'orchestra","イル ディレットーレ ドルケストラ","指揮者","合奏や合唱をまとめる人。授業では Guarda il direttore per seguire il tempo.(テンポは指揮者を見てとろう)"],
 ["il crescendo","イル クレッシェンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では Fai un crescendo verso la fine.(終わりに向かってだんだん強くしよう)"],
 ["il compositore","イル コンポズィトーレ","作曲家","曲を作る人。授業では Beethoven era un compositore tedesco.(ベートーヴェンはドイツの作曲家だった)"],
 ["la sinfonia","ラ スィンフォニーア","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では Una sinfonia di solito ha quattro movimenti.(交響曲はふつう4つの楽章からなる)"],
 ["il testo della canzone","イル テスト デッラ カンツォーネ","歌詞","歌のことば。授業では Sai il testo a memoria?(歌詞を覚えているかな?)"]]);
SUL('it','sd-it-ar1','美術 1','ART 1',[
 ["lo schizzo","ロ スキッツォ","スケッチ(する)","大まかにさっと描くこと。授業では Inizia con uno schizzo veloce a matita.(まず鉛筆でさっとスケッチしよう)"],
 ["l'ombreggiatura","ロンブレッジャトゥーラ","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では L'ombreggiatura fa sembrare rotonda la mela.(陰影をつけるとリンゴが丸く見える)"],
 ["la prospettiva","ラ プロスペッティーヴァ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では Usa la prospettiva per far sembrare lunga la strada.(遠近法を使って道が長く見えるようにしよう)"],
 ["la natura morta","ラ ナトゥーラ モルタ","静物画","果物や花びんなど、動かないものを描いた絵。授業では Oggi dipingiamo una natura morta con la frutta.(今日は果物の静物画を描く)"],
 ["il ritratto","イル リトラット","肖像画","人の顔や姿を描いた絵。授業では Disegna il ritratto del compagno accanto a te.(隣の人の肖像画を描こう)"],
 ["i colori primari","イ コローリ プリマーリ","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では Rosso, blu e giallo sono i colori primari.(赤・青・黄が三原色だ)"],
 ["i colori complementari","イ コローリ コンプレメンターリ","補色","色相環で向かい合う、たがいを引き立てる色。授業では L'arancione e il blu sono colori complementari.(オレンジと青は補色だ)"],
 ["la composizione","ラ コンポズィツィオーネ","構図","画面の中での配置。授業では Pensa alla composizione prima di dipingere.(描く前に構図を考えよう)"]]);
SUL('it','sd-it-ar2','美術 2','ART 2',[
 ["lo sfondo","ロ スフォンド","背景","絵の奥の部分。授業では Dipingi prima lo sfondo.(背景を先に塗ろう)"],
 ["l'acquerello","ラックエレッロ","水彩絵の具","水でといて使う、すき通る絵の具。授業では L'acquerello si asciuga in fretta, quindi lavora velocemente.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["la tavolozza","ラ タヴォロッツァ","パレット","絵の具をまぜる板。授業では Mescola i colori sulla tavolozza, non sul foglio.(色は紙の上ではなくパレットでまぜよう)"],
 ["l'argilla","ラルジッラ","粘土","形を自由に作れるやわらかい土。授業では Modella l'argilla a forma di ciotola.(粘土で小さなお皿の形を作ろう)"],
 ["la scultura","ラ スクルトゥーラ","彫刻","立体的に作った作品。授業では Questa scultura è di pietra.(この彫刻は石でできている)"],
 ["l'incisione","リンチズィオーネ","版画","版を作ってインクで紙に写す方法。授業では Con l'incisione puoi fare molte copie di un'immagine.(版画では1つの絵からたくさん刷ることができる)"],
 ["il capolavoro","イル カポラヴォーロ","傑作(名作)","とてもすぐれた作品。授業では La Gioconda è un famoso capolavoro.(モナ・リザは有名な傑作だ)"],
 ["la mostra","ラ モストラ","展覧会","作品を並べて見せる催し。授業では I nostri lavori saranno alla mostra della scuola.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-it-b']={L:'it',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-it-it1", "sd-it-it2", "sd-it-pe1", "sd-it-pe2", "sd-it-mu1", "sd-it-mu2", "sd-it-ar1", "sd-it-ar2"],key:'sd-it-b'};
SDL_MORE.it=[{bank:'sd-it-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-it-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('zh','sd-zh-ma1','数学 1','MATH 1',[
 ["正数","zhèngshù","正の数","0より大きい数。授業では 正数比零大。(正の数は0より大きい)"],
 ["负数","fùshù","負の数","0より小さい数。授業では 负五是负数。(-5は負の数です)"],
 ["整数","zhěngshù","整数","…,-1, 0, 1, 2,… のような数。授業では 零点五是整数吗？(0.5は整数かな?)"],
 ["分母","fēnmǔ","分母","分数の下の数。授業では 找出公分母。(分母をそろえよう=通分)"],
 ["小数","xiǎoshù","小数","0.5 のような数。授業では 把四分之一写成小数。(1/4を小数で書こう)"],
 ["平方根","píngfānggēn","平方根","2乗するとその数になる数。授業では 九的平方根是三。(9の平方根は3)"],
 ["变量","biànliàng","文字(変数)","x や y のように、いろいろな値をとる文字。授業では 这里的 x 是变量。(ここでは x が変数)"],
 ["角","jiǎo","角","2本の線が作る開き。授業では 用量角器量一下这个角。(分度器で角をはかろう)"]]);
SUL('zh','sd-zh-ma2','数学 2','MATH 2',[
 ["平行","píngxíng","平行な","どこまでのばしても交わらないこと。授業では 这两条直线互相平行。(この2本の線は平行)"],
 ["面积","miànjī","面積","広さ。授業では 求长方形的面积。(長方形の面積を求めよう)"],
 ["半径","bànjìng","半径","円の中心から円周までの長さ。授業では 半径是直径的一半。(半径は直径の半分)"],
 ["体积","tǐjī","体積","立体の大きさ。授業では 求正方体的体积。(立方体の体積を求めよう)"],
 ["函数","hánshù","関数","xが決まるとyがただ1つ決まる関係。授業では y 是 x 的函数。(yはxの関数)"],
 ["坐标","zuòbiāo","座標","点の位置を表す数の組。授業では 写出点 P 的坐标。(点Pの座標を書こう)"],
 ["概率","gàilǜ","確率","あることが起こる割合。授業では 抛硬币正面朝上的概率是多少？(表が出る確率は?)"],
 ["平均数","píngjūnshù","平均値","全部たして個数でわった値。授業では 计算这组数据的平均数。(データの平均値を計算しよう)"]]);
SUL('zh','sd-zh-sc1','理科 1','SCIENCE 1',[
 ["力","lì","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では 用箭头表示这个力。(力を矢印で表そう)"],
 ["摩擦力","mócālì","摩擦","ふれ合う面で動きをじゃまする力。授業では 摩擦力让箱子慢了下来。(摩擦で箱がおそくなる)"],
 ["速度","sùdù","速さ","距離÷時間。授業では 计算平均速度。(平均の速さを計算しよう)"],
 ["电流","diànliú","電流","電気の流れ。単位は A(アンペア)。授業では 用电流表测量电流。(電流計で電流をはかろう)"],
 ["电压","diànyā","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では 电压表要并联。(電圧計は並列につなごう)"],
 ["磁场","cíchǎng","磁界","磁石の力がはたらく空間。授業では 用铁屑观察磁场。(鉄粉で磁界のようすを見よう)"],
 ["元素","yuánsù","元素","物質をつくるもとになる成分。授業では 在元素周期表上找到这个元素。(周期表でその元素を探そう)"],
 ["原子","yuánzǐ","原子","物質をつくる、とても小さなつぶ。授業では 原子太小了，看不见。(原子は小さすぎて見えない)"]]);
SUL('zh','sd-zh-sc2','理科 2','SCIENCE 2',[
 ["酸","suān","酸","水溶液が酸性を示す物質。授業では 柠檬汁是酸性的。(レモン汁は酸)"],
 ["呼吸作用","hūxī zuòyòng","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では 呼吸作用会释放能量。(呼吸でエネルギーが取り出される)"],
 ["消化","xiāohuà","消化","食べ物を体に吸収できる形に分解すること。授業では 消化从口腔开始。(消化は口から始まる)"],
 ["基因","jīyīn","遺伝子","親から子に伝わる特徴のもと。授業では 基因从父母传给孩子。(遺伝子は親から子に伝わる)"],
 ["食物链","shíwùliàn","食物連鎖","「食べる・食べられる」のつながり。授業では 画出森林里的食物链。(森の食物連鎖をかこう)"],
 ["火山","huǒshān","火山","マグマがふき出してできた山。授業では 这座火山现在还很活跃。(この火山は今も活動している)"],
 ["化石","huàshí","化石","大昔の生物の死がいや跡が残ったもの。授業では 化石告诉我们古代生物的样子。(化石から大昔の生物がわかる)"],
 ["太阳系","tàiyángxì","太陽系","太陽とそのまわりを回る天体の集まり。授業では 太阳系有八大行星。(太陽系には8つの惑星がある)"]]);
SUL('zh','sd-zh-so1','社会 1','SOCIAL STUDIES 1',[
 ["纬度","wěidù","緯度","赤道から北や南へどれだけ離れているか。授業では 东京位于北纬约36度。(東京は北緯約36度にある)"],
 ["半岛","bàndǎo","半島","三方を海に囲まれた陸地。授業では 意大利是一个像靴子的长半岛。(イタリアはブーツの形をした長い半島だ)"],
 ["人口密度","rénkǒu mìdù","人口密度","一定の面積に何人住んでいるか。授業では 东京的人口密度非常高。(東京は人口密度がとても高い)"],
 ["出口","chūkǒu","輸出(する)","国内のものを外国に売ること。授業では 日本出口大量汽车。(日本はたくさんの車を輸出している)"],
 ["进口","jìnkǒu","輸入(する)","外国のものを国内に買い入れること。授業では 日本的小麦大部分是进口的。(日本の小麦のほとんどは輸入されている)"],
 ["农业","nóngyè","農業","作物を育てたり家畜を飼ったりする仕事。授業では 农业在这个地区很重要。(この地域では農業が大切だ)"],
 ["文明","wénmíng","文明","都市・文字・国のしくみが発達した社会。授業では 四大文明都起源于大河沿岸。(四大文明は大きな川のほとりで始まった)"],
 ["帝国","dìguó","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では 罗马帝国延续了几百年。(ローマ帝国は何百年も続いた)"]]);
SUL('zh','sd-zh-so2','社会 2','SOCIAL STUDIES 2',[
 ["殖民地","zhímíndì","植民地","ほかの国に支配された土地。授業では 印度曾经是英国的殖民地。(インドはかつてイギリスの植民地だった)"],
 ["独立","dúlì","独立","ほかの国の支配から離れて自分の国になること。授業では 美国于1776年宣布独立。(アメリカは1776年に独立を宣言した)"],
 ["条约","tiáoyuē","条約","国と国が文書で結ぶ約束。授業では 两国签署了和平条约。(2つの国は平和条約に署名した)"],
 ["民主","mínzhǔ","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では 在民主制度下，人民选择自己的领导人。(民主主義では、国民がリーダーを選ぶ)"],
 ["首相","shǒuxiàng","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では 首相领导内阁。(首相は内閣を率いる)"],
 ["人权","rénquán","人権","人が生まれながらにもつ権利。授業では 每个人的人权都必须受到尊重。(すべての人の人権が尊重されなければならない)"],
 ["税","shuì","税金","国や自治体の仕事のために国民が納めるお金。授業では 税收用于修建道路和学校。(税金で道路や学校がまかなわれている)"],
 ["贸易","màoyì","貿易","国と国の間でものを売り買いすること。授業では 日本和中国之间的贸易非常活跃。(日本と中国の貿易はとてもさかんだ)"]]);
SUL('zh','sd-zh-la1','国語 1','LANGUAGE ARTS 1',[
 ["代词","dàicí","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では 把名词换成代词。(名詞を代名詞に置き換えよう)"],
 ["连词","liáncí","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では 用连词把两个句子连起来。(接続詞で2つの文をつなごう)"],
 ["标点符号","biāodiǎn fúhào","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では 别忘了每句话末尾的标点符号。(それぞれの文の終わりの句読点を忘れないで)"],
 ["近义词","jìnyìcí","類義語(同じ意味の語)","意味が同じか近い語。授業では 找出这个词的近义词。(この単語の類義語を見つけよう)"],
 ["中心思想","zhōngxīn sīxiǎng","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では 这一段的中心思想是什么？(この段落の要旨は何かな?)"],
 ["概括","gàikuò","要約する","大事なところだけを短くまとめる。授業では 用三句话概括这一章。(その章を3文で要約しよう)"],
 ["情节","qíngjié","あらすじ(筋)","物語のできごとの流れ。授業では 这部小说的情节充满了惊喜。(この小説の筋は驚きでいっぱいだ)"],
 ["人物","rénwù","登場人物","物語に出てくる人や動物。授業では 故事的主人公是谁？(物語の主人公はだれかな?)"]]);
SUL('zh','sd-zh-la2','国語 2','LANGUAGE ARTS 2',[
 ["主题","zhǔtí","テーマ(主題)","物語を通して伝わる大切な考え。授業では 这个故事的主题是友谊。(物語のテーマは友情だ)"],
 ["叙述者","xùshùzhě","語り手","物語を語っている人。授業では 叙述者用第一人称讲故事。(語り手は一人称で物語を語っている)"],
 ["暗喻","ànyù","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では “人生是一段旅程”是暗喻。(「人生は旅だ」は隠喩だ)"],
 ["结尾","jiéwěi","結論","エッセイの最後でまとめる部分。授業では 在结尾再次强调你的主要观点。(結論でもう一度主な主張を述べよう)"],
 ["草稿","cǎogǎo","下書き","まず全体を書いてみたもの。授業では 星期五之前完成草稿。(金曜日までに下書きを終わらせよう)"],
 ["校对","jiàoduì","校正する","つづりや句読点のまちがいを確かめる。授業では 仔细校对，找出错别字。(つづりのまちがいがないか注意して校正しよう)"],
 ["展示","zhǎnshì","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では 每个小组要做五分钟的展示。(各グループが5分の発表をする)"],
 ["辩论","biànlùn","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では 今天的辩论题目是校服。(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-zh-a']={L:'zh',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-zh-ma1", "sd-zh-ma2", "sd-zh-sc1", "sd-zh-sc2", "sd-zh-so1", "sd-zh-so2", "sd-zh-la1", "sd-zh-la2"],key:'sd-zh-a'};
SUL('zh','sd-zh-it1','情報 1','COMPUTING 1',[
 ["硬件","yìngjiàn","ハードウェア","コンピューターの機械の部分。授業では 键盘和屏幕都是硬件。(キーボードと画面はハードウェアだ)"],
 ["软件","ruǎnjiàn","ソフトウェア","コンピューターを動かすプログラム。授業では 上课前先安装好软件。(授業の前にソフトウェアをインストールしておこう)"],
 ["操作系统","cāozuò xìtǒng","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows 和 macOS 都是操作系统。(Windows と macOS はOSだ)"],
 ["二进制","èrjìnzhì","2進法","0と1だけで数を表す方法。授業では 计算机用二进制存储一切。(コンピューターはすべてを2進法で記録する)"],
 ["像素","xiàngsù","画素(ピクセル)","画像をつくる小さな点。授業では 放大就能看到每一个像素。(拡大すると一つ一つの画素が見える)"],
 ["算法","suànfǎ","アルゴリズム","問題を解くための手順。授業では 写出做三明治的算法。(サンドイッチを作るアルゴリズムを書こう)"],
 ["流程图","liúchéngtú","フローチャート","手順を図形と矢印で表した図。授業では 写代码之前先画流程图。(コードを書く前にフローチャートを描こう)"],
 ["循环","xúnhuán","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では 用循环画十颗星星。(繰り返しを使って星を10個描こう)"]]);
SUL('zh','sd-zh-it2','情報 2','COMPUTING 2',[
 ["调试","tiáoshì","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では 我们一起来调试这段代码。(このコードを一緒にデバッグしよう)"],
 ["网络","wǎngluò","ネットワーク","コンピューターどうしをつないだもの。授業では 这个教室里的电脑都在同一个网络上。(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["搜索引擎","sōusuǒ yǐnqíng","検索エンジン","キーワードでウェブの情報を探すサービス。授業では 在搜索引擎里使用好的关键词。(検索エンジンではよいキーワードを使おう)"],
 ["网络钓鱼","wǎngluò diàoyú","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では 千万不要点击钓鱼邮件里的链接。(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["加密","jiāmì","暗号化","データを決まった人しか読めない形に変えること。授業では 加密能保护你的消息。(暗号化によってメッセージの秘密が守られる)"],
 ["个人信息","gèrén xìnxī","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では 不要在网上分享个人信息。(ネットで個人情報を公開しないで)"],
 ["版权","bǎnquán","著作権","作品を作った人がもつ権利。授業では 这首歌受版权保护。(この曲は著作権で守られている)"],
 ["人工智能","réngōng zhìnéng","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では 人工智能可以翻译语言。(人工知能は言葉を翻訳できる)"]]);
SUL('zh','sd-zh-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["肌肉","jīròu","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では 跑步前先拉伸腿部肌肉。(走る前に脚の筋肉を伸ばそう)"],
 ["骨头","gǔtou","骨","体を支え、内臓を守るかたいもの。授業では 钙能让骨头变结实。(カルシウムは骨を強くする)"],
 ["关节","guānjié","関節","骨と骨のつなぎ目。授業では 膝盖是一个关节。(ひざは関節だ)"],
 ["心率","xīnlǜ","心拍数","1分間に心臓が打つ回数。授業では 跑完步测一下心率。(走ったあとに心拍数を測ろう)"],
 ["青春期","qīngchūnqī","思春期","子どもから大人の体に変わっていく時期。授業では 青春期身体会发生很大变化。(思春期には体が大きく変わる)"],
 ["营养素","yíngyǎngsù","栄養素","体に必要な、食べ物にふくまれる成分。授業では 蔬菜富含营养素。(野菜には栄養素がたくさんふくまれている)"],
 ["蛋白质","dànbáizhì","たんぱく質","筋肉や血をつくる栄養素。授業では 要长肌肉就要吃蛋白质。(筋肉をつけるにはたんぱく質をとろう)"],
 ["均衡饮食","jūnhéng yǐnshí","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では 均衡饮食包括水果、蔬菜和谷物。(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('zh','sd-zh-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["补水","bǔshuǐ","水分補給","体に必要な水分をとること。授業では 天热的时候补水很重要。(暑い日は水分補給が大切だ)"],
 ["心理健康","xīnlǐ jiànkāng","心の健康","気持ちや心の状態の健康。授業では 和朋友聊天有助于心理健康。(友だちに話すことは心の健康の助けになる)"],
 ["急救","jíjiù","応急手当","けがや急な病気のときにその場でする手当て。授業では 每个人都应该学习基本的急救知识。(だれもが基本の応急手当を学ぶべきだ)"],
 ["扭伤","niǔshāng","ねんざ","関節をひねって痛めること。授業では 他扭伤了脚踝。(彼は足首をねんざしている)"],
 ["中暑","zhòngshǔ","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では 在阴凉处休息，以防中暑。(熱中症を防ぐために日かげで休もう)"],
 ["裁判","cáipàn","審判","試合のルールを守らせる人。授業では 注意听裁判的哨声。(審判の笛をよく聞こう)"],
 ["犯规","fànguī","反則(ファウル)","ルールに違反すること。授業では 推人是犯规。(押すのは反則だ)"],
 ["接力赛","jiēlìsài","リレー","チームで順番に走ってバトンをつなぐ競走。授業では 接力赛时要顺利交接接力棒。(リレーではバトンをなめらかに渡そう)"]]);
SUL('zh','sd-zh-mu1','音楽 1','MUSIC 1',[
 ["五线谱","wǔxiànpǔ","五線(譜)","音符を書く5本の線。授業では 把音符写在五线谱上。(五線に音符を書こう)"],
 ["四分音符","sìfēn yīnfú","四分音符","1拍分の長さの音符。授業では 四分音符是一拍。(四分音符は1拍だ)"],
 ["拍号","pāihào","拍子記号","1小節に何拍あるかを表す記号。授業では 这首歌是四分之三拍。(この曲は4分の3拍子だ)"],
 ["节拍","jiépāi","拍","音楽の一定の刻み。授業では 跟着节拍拍手。(毎拍、手をたたこう)"],
 ["乐曲的速度","yuèqǔ de sùdù","テンポ(速さ)","曲の速さ。授業では 开头部分乐曲的速度很慢。(最初はテンポがゆっくりだ)"],
 ["音阶","yīnjiē","音階","ドレミファソラシドのように順に並んだ音。授業では 弹一下C大调音阶。(ハ長調の音階を弾こう)"],
 ["大调","dàdiào","長調","明るい感じの調。授業では 这首歌是大调，所以听起来很欢快。(この曲は長調なので明るく聞こえる)"],
 ["小调","xiǎodiào","短調","暗い・悲しい感じの調。授業では 小调常常听起来很悲伤。(短調はよく悲しく聞こえる)"]]);
SUL('zh','sd-zh-mu2','音楽 2','MUSIC 2',[
 ["和弦","héxián","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では 用三根手指弹C和弦。(3本の指で C のコードを弾こう)"],
 ["弦乐器","xiányuèqì","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では 小提琴是弦乐器。(バイオリンは弦楽器だ)"],
 ["打击乐器","dǎjī yuèqì","打楽器","たたいたりふったりして音を出す楽器。授業では 鼓是打击乐器。(ドラムは打楽器だ)"],
 ["指挥","zhǐhuī","指揮者","合奏や合唱をまとめる人。授業では 看着指挥来把握速度。(テンポは指揮者を見てとろう)"],
 ["渐强","jiànqiáng","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では 快结束时要渐强。(終わりに向かってだんだん強くしよう)"],
 ["作曲家","zuòqǔjiā","作曲家","曲を作る人。授業では 贝多芬是德国作曲家。(ベートーヴェンはドイツの作曲家だった)"],
 ["交响曲","jiāoxiǎngqǔ","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では 交响曲通常有四个乐章。(交響曲はふつう4つの楽章からなる)"],
 ["歌词","gēcí","歌詞","歌のことば。授業では 你能背出歌词吗？(歌詞を覚えているかな?)"]]);
SUL('zh','sd-zh-ar1','美術 1','ART 1',[
 ["速写","sùxiě","スケッチ(する)","大まかにさっと描くこと。授業では 先用铅笔画一张速写。(まず鉛筆でさっとスケッチしよう)"],
 ["明暗","míng'àn","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では 画出明暗，苹果看起来就是圆的。(陰影をつけるとリンゴが丸く見える)"],
 ["透视","tòushì","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では 用透视让道路看起来很长。(遠近法を使って道が長く見えるようにしよう)"],
 ["静物画","jìngwùhuà","静物画","果物や花びんなど、動かないものを描いた絵。授業では 今天我们画水果静物画。(今日は果物の静物画を描く)"],
 ["肖像画","xiàoxiànghuà","肖像画","人の顔や姿を描いた絵。授業では 给你旁边的同学画一幅肖像画。(隣の人の肖像画を描こう)"],
 ["三原色","sānyuánsè","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では 红、蓝、黄是三原色。(赤・青・黄が三原色だ)"],
 ["互补色","hùbǔsè","補色","色相環で向かい合う、たがいを引き立てる色。授業では 橙色和蓝色是互补色。(オレンジと青は補色だ)"],
 ["构图","gòutú","構図","画面の中での配置。授業では 画之前先想好构图。(描く前に構図を考えよう)"]]);
SUL('zh','sd-zh-ar2','美術 2','ART 2',[
 ["背景","bèijǐng","背景","絵の奥の部分。授業では 先画背景。(背景を先に塗ろう)"],
 ["水彩颜料","shuǐcǎi yánliào","水彩絵の具","水でといて使う、すき通る絵の具。授業では 水彩干得很快，所以要画得快一点。(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["调色盘","tiáosèpán","パレット","絵の具をまぜる板。授業では 在调色盘上调色，不要在纸上调。(色は紙の上ではなくパレットでまぜよう)"],
 ["黏土","niántǔ","粘土","形を自由に作れるやわらかい土。授業では 用黏土捏一个小碗。(粘土で小さなお皿の形を作ろう)"],
 ["雕塑","diāosù","彫刻","立体的に作った作品。授業では 这座雕塑是用石头做的。(この彫刻は石でできている)"],
 ["版画","bǎnhuà","版画","版を作ってインクで紙に写す方法。授業では 版画可以把一幅画印出很多张。(版画では1つの絵からたくさん刷ることができる)"],
 ["杰作","jiézuò","傑作(名作)","とてもすぐれた作品。授業では 《蒙娜丽莎》是一幅著名的杰作。(モナ・リザは有名な傑作だ)"],
 ["展览","zhǎnlǎn","展覧会","作品を並べて見せる催し。授業では 我们的作品会参加学校的展览。(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-zh-b']={L:'zh',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-zh-it1", "sd-zh-it2", "sd-zh-pe1", "sd-zh-pe2", "sd-zh-mu1", "sd-zh-mu2", "sd-zh-ar1", "sd-zh-ar2"],key:'sd-zh-b'};
SDL_MORE.zh=[{bank:'sd-zh-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-zh-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('fr','sd-fr-ma1','数学 1','MATH 1',[
 ["le nombre positif","ル ノンブル ポズィティフ","正の数","0より大きい数。授業では Les nombres positifs sont plus grands que zéro.(正の数は0より大きい)"],
 ["le nombre négatif","ル ノンブル ネガティフ","負の数","0より小さい数。授業では Moins cinq est un nombre négatif.(-5は負の数です)"],
 ["le nombre entier","ル ノンブル アンティエ","整数","…,-1, 0, 1, 2,… のような数。授業では Est-ce que zéro virgule cinq est un nombre entier ?(0.5は整数かな?)"],
 ["le dénominateur","ル デノミナトゥール","分母","分数の下の数。授業では Trouve le dénominateur commun.(分母をそろえよう=通分)"],
 ["le nombre décimal","ル ノンブル デスィマル","小数","0.5 のような数。授業では Écris un quart en nombre décimal.(1/4を小数で書こう)"],
 ["la racine carrée","ラ ラスィヌ カレ","平方根","2乗するとその数になる数。授業では La racine carrée de neuf est trois.(9の平方根は3)"],
 ["la variable","ラ ヴァリアブル","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Ici, x est une variable.(ここでは x が変数)"],
 ["l'angle","ラングル","角","2本の線が作る開き。授業では Mesure l'angle avec un rapporteur.(分度器で角をはかろう)"]]);
SUL('fr','sd-fr-ma2','数学 2','MATH 2',[
 ["parallèle","パラレル","平行な","どこまでのばしても交わらないこと。授業では Ces deux droites sont parallèles.(この2本の線は平行)"],
 ["l'aire","レール","面積","広さ。授業では Calcule l'aire du rectangle.(長方形の面積を求めよう)"],
 ["le rayon","ル レイヨン","半径","円の中心から円周までの長さ。授業では Le rayon est la moitié du diamètre.(半径は直径の半分)"],
 ["le volume","ル ヴォリュム","体積","立体の大きさ。授業では Calcule le volume du cube.(立方体の体積を求めよう)"],
 ["la fonction","ラ フォンクスィオン","関数","xが決まるとyがただ1つ決まる関係。授業では y est une fonction de x.(yはxの関数)"],
 ["les coordonnées","レ コオルドネ","座標","点の位置を表す数の組。授業では Écris les coordonnées du point P.(点Pの座標を書こう)"],
 ["la probabilité","ラ プロバビリテ","確率","あることが起こる割合。授業では Quelle est la probabilité de tomber sur face ?(表が出る確率は?)"],
 ["la moyenne","ラ モワイエンヌ","平均値","全部たして個数でわった値。授業では Calcule la moyenne des données.(データの平均値を計算しよう)"]]);
SUL('fr','sd-fr-sc1','理科 1','SCIENCE 1',[
 ["la force","ラ フォルス","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Dessine une flèche pour représenter la force.(力を矢印で表そう)"],
 ["le frottement","ル フロットマン","摩擦","ふれ合う面で動きをじゃまする力。授業では Le frottement ralentit la boîte.(摩擦で箱がおそくなる)"],
 ["la vitesse","ラ ヴィテス","速さ","距離÷時間。授業では Calcule la vitesse moyenne.(平均の速さを計算しよう)"],
 ["le courant électrique","ル クラン エレクトリック","電流","電気の流れ。単位は A(アンペア)。授業では Mesure le courant avec un ampèremètre.(電流計で電流をはかろう)"],
 ["la tension","ラ タンスィオン","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Branche le voltmètre en dérivation.(電圧計は並列につなごう)"],
 ["le champ magnétique","ル シャン マニェティック","磁界","磁石の力がはたらく空間。授業では Utilise de la limaille de fer pour voir le champ magnétique.(鉄粉で磁界のようすを見よう)"],
 ["l'élément","レレマン","元素","物質をつくるもとになる成分。授業では Trouve l'élément dans le tableau périodique.(周期表でその元素を探そう)"],
 ["l'atome","ラトム","原子","物質をつくる、とても小さなつぶ。授業では Les atomes sont trop petits pour être vus.(原子は小さすぎて見えない)"]]);
SUL('fr','sd-fr-sc2','理科 2','SCIENCE 2',[
 ["l'acide","ラスィッド","酸","水溶液が酸性を示す物質。授業では Le jus de citron est un acide.(レモン汁は酸)"],
 ["la respiration","ラ レスピラスィオン","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では La respiration libère de l'énergie.(呼吸でエネルギーが取り出される)"],
 ["la digestion","ラ ディジェスティオン","消化","食べ物を体に吸収できる形に分解すること。授業では La digestion commence dans la bouche.(消化は口から始まる)"],
 ["le gène","ル ジェヌ","遺伝子","親から子に伝わる特徴のもと。授業では Les gènes passent des parents aux enfants.(遺伝子は親から子に伝わる)"],
 ["la chaîne alimentaire","ラ シェヌ アリマンテール","食物連鎖","「食べる・食べられる」のつながり。授業では Dessine une chaîne alimentaire de la forêt.(森の食物連鎖をかこう)"],
 ["le volcan","ル ヴォルカン","火山","マグマがふき出してできた山。授業では Ce volcan est encore actif.(この火山は今も活動している)"],
 ["le fossile","ル フォスィル","化石","大昔の生物の死がいや跡が残ったもの。授業では Les fossiles nous parlent de la vie d'autrefois.(化石から大昔の生物がわかる)"],
 ["le système solaire","ル システム ソレール","太陽系","太陽とそのまわりを回る天体の集まり。授業では Il y a huit planètes dans le système solaire.(太陽系には8つの惑星がある)"]]);
SUL('fr','sd-fr-so1','社会 1','SOCIAL STUDIES 1',[
 ["la latitude","ラ ラティテュード","緯度","赤道から北や南へどれだけ離れているか。授業では Tokyo se trouve à environ 36 degrés de latitude nord.(東京は北緯約36度にある)"],
 ["la péninsule","ラ ペナンスュル","半島","三方を海に囲まれた陸地。授業では L'Italie est une longue péninsule en forme de botte.(イタリアはブーツの形をした長い半島だ)"],
 ["la densité de population","ラ ダンスィテ ドゥ ポピュラスィオン","人口密度","一定の面積に何人住んでいるか。授業では Tokyo a une très forte densité de population.(東京は人口密度がとても高い)"],
 ["exporter","エクスポルテ","輸出(する)","国内のものを外国に売ること。授業では Le Japon exporte beaucoup de voitures.(日本はたくさんの車を輸出している)"],
 ["importer","アンポルテ","輸入(する)","外国のものを国内に買い入れること。授業では La plupart du blé au Japon est importé.(日本の小麦のほとんどは輸入されている)"],
 ["l'agriculture","ラグリキュルテュール","農業","作物を育てたり家畜を飼ったりする仕事。授業では L'agriculture est importante dans cette région.(この地域では農業が大切だ)"],
 ["la civilisation","ラ スィヴィリザスィオン","文明","都市・文字・国のしくみが発達した社会。授業では Les quatre grandes civilisations sont nées le long de grands fleuves.(四大文明は大きな川のほとりで始まった)"],
 ["l'empire","ランピール","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では L'Empire romain a duré des centaines d'années.(ローマ帝国は何百年も続いた)"]]);
SUL('fr','sd-fr-so2','社会 2','SOCIAL STUDIES 2',[
 ["la colonie","ラ コロニー","植民地","ほかの国に支配された土地。授業では L'Inde a été une colonie britannique.(インドはかつてイギリスの植民地だった)"],
 ["l'indépendance","ランデパンダンス","独立","ほかの国の支配から離れて自分の国になること。授業では Les États-Unis ont déclaré leur indépendance en 1776.(アメリカは1776年に独立を宣言した)"],
 ["le traité","ル トレテ","条約","国と国が文書で結ぶ約束。授業では Les deux pays ont signé un traité de paix.(2つの国は平和条約に署名した)"],
 ["la démocratie","ラ デモクラスィ","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では Dans une démocratie, le peuple choisit ses dirigeants.(民主主義では、国民がリーダーを選ぶ)"],
 ["le Premier ministre","ル プルミエ ミニストル","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では Le Premier ministre dirige le gouvernement.(首相は内閣を率いる)"],
 ["les droits humains","レ ドロワ ユマン","人権","人が生まれながらにもつ権利。授業では Les droits humains de chacun doivent être respectés.(すべての人の人権が尊重されなければならない)"],
 ["l'impôt","ランポ","税金","国や自治体の仕事のために国民が納めるお金。授業では Les impôts paient les routes et les écoles.(税金で道路や学校がまかなわれている)"],
 ["le commerce","ル コメルス","貿易","国と国の間でものを売り買いすること。授業では Le commerce entre le Japon et la Chine est très actif.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('fr','sd-fr-la1','国語 1','LANGUAGE ARTS 1',[
 ["le pronom","ル プロノン","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では Remplace le nom par un pronom.(名詞を代名詞に置き換えよう)"],
 ["la conjonction","ラ コンジョンクスィオン","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では Relie les deux phrases avec une conjonction.(接続詞で2つの文をつなごう)"],
 ["la ponctuation","ラ ポンクテュアスィオン","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では N'oublie pas la ponctuation à la fin de chaque phrase.(それぞれの文の終わりの句読点を忘れないで)"],
 ["le synonyme","ル スィノニム","類義語(同じ意味の語)","意味が同じか近い語。授業では Trouve un synonyme de ce mot.(この単語の類義語を見つけよう)"],
 ["l'idée principale","リデ プランスィパル","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では Quelle est l'idée principale de ce paragraphe ?(この段落の要旨は何かな?)"],
 ["résumer","レズュメ","要約する","大事なところだけを短くまとめる。授業では Résume le chapitre en trois phrases.(その章を3文で要約しよう)"],
 ["l'intrigue","ラントリーグ","あらすじ(筋)","物語のできごとの流れ。授業では L'intrigue de ce roman est pleine de surprises.(この小説の筋は驚きでいっぱいだ)"],
 ["le personnage","ル ペルソナージュ","登場人物","物語に出てくる人や動物。授業では Qui est le personnage principal de l'histoire ?(物語の主人公はだれかな?)"]]);
SUL('fr','sd-fr-la2','国語 2','LANGUAGE ARTS 2',[
 ["le thème","ル テーム","テーマ(主題)","物語を通して伝わる大切な考え。授業では Le thème de l'histoire est l'amitié.(物語のテーマは友情だ)"],
 ["le narrateur","ル ナラトゥール","語り手","物語を語っている人。授業では Le narrateur raconte l'histoire à la première personne.(語り手は一人称で物語を語っている)"],
 ["la métaphore","ラ メタフォール","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では « La vie est un voyage » est une métaphore.(「人生は旅だ」は隠喩だ)"],
 ["la conclusion","ラ コンクリュズィオン","結論","エッセイの最後でまとめる部分。授業では Reprends ton idée principale dans la conclusion.(結論でもう一度主な主張を述べよう)"],
 ["le brouillon","ル ブルイヨン","下書き","まず全体を書いてみたもの。授業では Termine ton brouillon avant vendredi.(金曜日までに下書きを終わらせよう)"],
 ["relire","ルリール","校正する","つづりや句読点のまちがいを確かめる。授業では Relis bien pour corriger les fautes d'orthographe.(つづりのまちがいがないか注意して校正しよう)"],
 ["l'exposé","レクスポゼ","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では Chaque groupe fera un exposé de cinq minutes.(各グループが5分の発表をする)"],
 ["le débat","ル デバ","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では Le sujet du débat d'aujourd'hui, c'est l'uniforme scolaire.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-fr-a']={L:'fr',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-fr-ma1", "sd-fr-ma2", "sd-fr-sc1", "sd-fr-sc2", "sd-fr-so1", "sd-fr-so2", "sd-fr-la1", "sd-fr-la2"],key:'sd-fr-a'};
SUL('fr','sd-fr-it1','情報 1','COMPUTING 1',[
 ["le matériel","ル マテリエル","ハードウェア","コンピューターの機械の部分。授業では Le clavier et l'écran font partie du matériel.(キーボードと画面はハードウェアだ)"],
 ["le logiciel","ル ロジスィエル","ソフトウェア","コンピューターを動かすプログラム。授業では Installe le logiciel avant le cours.(授業の前にソフトウェアをインストールしておこう)"],
 ["le système d'exploitation","ル システム デクスプロワタスィオン","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows et macOS sont des systèmes d'exploitation.(Windows と macOS はOSだ)"],
 ["le binaire","ル ビネール","2進法","0と1だけで数を表す方法。授業では Les ordinateurs enregistrent tout en binaire.(コンピューターはすべてを2進法で記録する)"],
 ["le pixel","ル ピクセル","画素(ピクセル)","画像をつくる小さな点。授業では Si tu zoomes, tu vois chaque pixel.(拡大すると一つ一つの画素が見える)"],
 ["l'algorithme","ラルゴリトム","アルゴリズム","問題を解くための手順。授業では Écris un algorithme pour faire un sandwich.(サンドイッチを作るアルゴリズムを書こう)"],
 ["l'organigramme","ロルガニグラム","フローチャート","手順を図形と矢印で表した図。授業では Dessine un organigramme avant de coder.(コードを書く前にフローチャートを描こう)"],
 ["la boucle","ラ ブクル","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では Utilise une boucle pour dessiner dix étoiles.(繰り返しを使って星を10個描こう)"]]);
SUL('fr','sd-fr-it2','情報 2','COMPUTING 2',[
 ["déboguer","デボゲ","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では Déboguons ce code ensemble.(このコードを一緒にデバッグしよう)"],
 ["le réseau","ル レゾ","ネットワーク","コンピューターどうしをつないだもの。授業では Tous les ordinateurs de cette salle sont sur le même réseau.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["le moteur de recherche","ル モトゥール ドゥ ルシェルシュ","検索エンジン","キーワードでウェブの情報を探すサービス。授業では Utilise de bons mots-clés dans le moteur de recherche.(検索エンジンではよいキーワードを使おう)"],
 ["l'hameçonnage","ラムソナージュ","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では Ne clique jamais sur les liens des courriels d'hameçonnage.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["le chiffrement","ル シフルマン","暗号化","データを決まった人しか読めない形に変えること。授業では Le chiffrement protège tes messages.(暗号化によってメッセージの秘密が守られる)"],
 ["les données personnelles","レ ドネ ペルソネル","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では Ne partage pas tes données personnelles en ligne.(ネットで個人情報を公開しないで)"],
 ["le droit d'auteur","ル ドロワ ドトゥール","著作権","作品を作った人がもつ権利。授業では Cette chanson est protégée par le droit d'auteur.(この曲は著作権で守られている)"],
 ["l'intelligence artificielle","ランテリジャンス アルティフィスィエル","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では L'intelligence artificielle peut traduire des langues.(人工知能は言葉を翻訳できる)"]]);
SUL('fr','sd-fr-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["le muscle","ル ミュスクル","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では Étire les muscles des jambes avant de courir.(走る前に脚の筋肉を伸ばそう)"],
 ["l'os","ロス","骨","体を支え、内臓を守るかたいもの。授業では Le calcium rend les os solides.(カルシウムは骨を強くする)"],
 ["l'articulation","ラルティキュラスィオン","関節","骨と骨のつなぎ目。授業では Le genou est une articulation.(ひざは関節だ)"],
 ["la fréquence cardiaque","ラ フレカンス カルディアック","心拍数","1分間に心臓が打つ回数。授業では Prends ta fréquence cardiaque après la course.(走ったあとに心拍数を測ろう)"],
 ["la puberté","ラ ピュベルテ","思春期","子どもから大人の体に変わっていく時期。授業では Ton corps change beaucoup pendant la puberté.(思春期には体が大きく変わる)"],
 ["le nutriment","ル ニュトリマン","栄養素","体に必要な、食べ物にふくまれる成分。授業では Les légumes sont pleins de nutriments.(野菜には栄養素がたくさんふくまれている)"],
 ["la protéine","ラ プロテイヌ","たんぱく質","筋肉や血をつくる栄養素。授業では Mange des protéines pour développer tes muscles.(筋肉をつけるにはたんぱく質をとろう)"],
 ["l'alimentation équilibrée","ラリマンタスィオン エキリブレ","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では Une alimentation équilibrée comprend des fruits, des légumes et des céréales.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('fr','sd-fr-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["l'hydratation","リドラタスィオン","水分補給","体に必要な水分をとること。授業では L'hydratation est importante quand il fait chaud.(暑い日は水分補給が大切だ)"],
 ["la santé mentale","ラ サンテ マンタル","心の健康","気持ちや心の状態の健康。授業では Parler à un ami peut aider ta santé mentale.(友だちに話すことは心の健康の助けになる)"],
 ["les premiers secours","レ プルミエ スクール","応急手当","けがや急な病気のときにその場でする手当て。授業では Tout le monde devrait apprendre les premiers secours.(だれもが基本の応急手当を学ぶべきだ)"],
 ["l'entorse","ラントルス","ねんざ","関節をひねって痛めること。授業では Il s'est fait une entorse à la cheville.(彼は足首をねんざしている)"],
 ["le coup de chaleur","ル ク ドゥ シャルール","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では Repose-toi à l'ombre pour éviter un coup de chaleur.(熱中症を防ぐために日かげで休もう)"],
 ["l'arbitre","ラルビトル","審判","試合のルールを守らせる人。授業では Écoute le sifflet de l'arbitre.(審判の笛をよく聞こう)"],
 ["la faute","ラ フォート","反則(ファウル)","ルールに違反すること。授業では Pousser, c'est une faute.(押すのは反則だ)"],
 ["le relais","ル ルレ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では Passe bien le témoin pendant le relais.(リレーではバトンをなめらかに渡そう)"]]);
SUL('fr','sd-fr-mu1','音楽 1','MUSIC 1',[
 ["la portée","ラ ポルテ","五線(譜)","音符を書く5本の線。授業では Écris les notes sur la portée.(五線に音符を書こう)"],
 ["la noire","ラ ノワール","四分音符","1拍分の長さの音符。授業では Une noire vaut un temps.(四分音符は1拍だ)"],
 ["l'indication de mesure","ランディカスィオン ドゥ ムズュール","拍子記号","1小節に何拍あるかを表す記号。授業では Cette chanson est à trois-quatre.(この曲は4分の3拍子だ)"],
 ["le temps","ル タン","拍","音楽の一定の刻み。授業では Frappe dans tes mains à chaque temps.(毎拍、手をたたこう)"],
 ["le tempo","ル タンポ","テンポ(速さ)","曲の速さ。授業では Au début, le tempo est lent.(最初はテンポがゆっくりだ)"],
 ["la gamme","ラ ガム","音階","ドレミファソラシドのように順に並んだ音。授業では Joue la gamme de do majeur.(ハ長調の音階を弾こう)"],
 ["le mode majeur","ル モード マジュール","長調","明るい感じの調。授業では Cette chanson est en majeur, donc elle sonne joyeuse.(この曲は長調なので明るく聞こえる)"],
 ["le mode mineur","ル モード ミヌール","短調","暗い・悲しい感じの調。授業では Le mode mineur sonne souvent triste.(短調はよく悲しく聞こえる)"]]);
SUL('fr','sd-fr-mu2','音楽 2','MUSIC 2',[
 ["l'accord","ラコール","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では Joue l'accord de do avec trois doigts.(3本の指で C のコードを弾こう)"],
 ["l'instrument à cordes","ランストリュマン ア コルド","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では Le violon est un instrument à cordes.(バイオリンは弦楽器だ)"],
 ["l'instrument à percussion","ランストリュマン ア ペルキュスィオン","打楽器","たたいたりふったりして音を出す楽器。授業では Les tambours sont des instruments à percussion.(ドラムは打楽器だ)"],
 ["le chef d'orchestre","ル シェフ ドルケストル","指揮者","合奏や合唱をまとめる人。授業では Regarde le chef d'orchestre pour le tempo.(テンポは指揮者を見てとろう)"],
 ["le crescendo","ル クレシェンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では Fais un crescendo vers la fin.(終わりに向かってだんだん強くしよう)"],
 ["le compositeur","ル コンポズィトゥール","作曲家","曲を作る人。授業では Beethoven était un compositeur allemand.(ベートーヴェンはドイツの作曲家だった)"],
 ["la symphonie","ラ サンフォニー","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では Une symphonie a souvent quatre mouvements.(交響曲はふつう4つの楽章からなる)"],
 ["les paroles","レ パロール","歌詞","歌のことば。授業では Tu connais les paroles par cœur ?(歌詞を覚えているかな?)"]]);
SUL('fr','sd-fr-ar1','美術 1','ART 1',[
 ["le croquis","ル クロキ","スケッチ(する)","大まかにさっと描くこと。授業では Commence par un croquis rapide au crayon.(まず鉛筆でさっとスケッチしよう)"],
 ["l'ombrage","ロンブラージュ","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では L'ombrage fait paraître la pomme ronde.(陰影をつけるとリンゴが丸く見える)"],
 ["la perspective","ラ ペルスペクティヴ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では Utilise la perspective pour que la route paraisse longue.(遠近法を使って道が長く見えるようにしよう)"],
 ["la nature morte","ラ ナテュール モルト","静物画","果物や花びんなど、動かないものを描いた絵。授業では Aujourd'hui, on peint une nature morte de fruits.(今日は果物の静物画を描く)"],
 ["le portrait","ル ポルトレ","肖像画","人の顔や姿を描いた絵。授業では Dessine le portrait de ton voisin.(隣の人の肖像画を描こう)"],
 ["les couleurs primaires","レ クルール プリメール","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では Le rouge, le bleu et le jaune sont les couleurs primaires.(赤・青・黄が三原色だ)"],
 ["les couleurs complémentaires","レ クルール コンプレマンテール","補色","色相環で向かい合う、たがいを引き立てる色。授業では L'orange et le bleu sont des couleurs complémentaires.(オレンジと青は補色だ)"],
 ["la composition","ラ コンポズィスィオン","構図","画面の中での配置。授業では Réfléchis à la composition avant de peindre.(描く前に構図を考えよう)"]]);
SUL('fr','sd-fr-ar2','美術 2','ART 2',[
 ["l'arrière-plan","ラリエール プラン","背景","絵の奥の部分。授業では Peins d'abord l'arrière-plan.(背景を先に塗ろう)"],
 ["l'aquarelle","ラクワレル","水彩絵の具","水でといて使う、すき通る絵の具。授業では L'aquarelle sèche vite, alors travaille rapidement.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["la palette","ラ パレット","パレット","絵の具をまぜる板。授業では Mélange les couleurs sur la palette, pas sur la feuille.(色は紙の上ではなくパレットでまぜよう)"],
 ["l'argile","ラルジル","粘土","形を自由に作れるやわらかい土。授業では Façonne l'argile en forme de petit bol.(粘土で小さなお皿の形を作ろう)"],
 ["la sculpture","ラ スキュルテュール","彫刻","立体的に作った作品。授業では Cette sculpture est en pierre.(この彫刻は石でできている)"],
 ["la gravure","ラ グラヴュール","版画","版を作ってインクで紙に写す方法。授業では Avec la gravure, on peut faire beaucoup de copies d'une image.(版画では1つの絵からたくさん刷ることができる)"],
 ["le chef-d'œuvre","ル シェドゥーヴル","傑作(名作)","とてもすぐれた作品。授業では La Joconde est un chef-d'œuvre célèbre.(モナ・リザは有名な傑作だ)"],
 ["l'exposition","レクスポズィスィオン","展覧会","作品を並べて見せる催し。授業では Nos œuvres seront dans l'exposition de l'école.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-fr-b']={L:'fr',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-fr-it1", "sd-fr-it2", "sd-fr-pe1", "sd-fr-pe2", "sd-fr-mu1", "sd-fr-mu2", "sd-fr-ar1", "sd-fr-ar2"],key:'sd-fr-b'};
SDL_MORE.fr=[{bank:'sd-fr-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-fr-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('de','sd-de-ma1','数学 1','MATH 1',[
 ["die positive Zahl","ディー ポズィティーヴェ ツァール","正の数","0より大きい数。授業では Positive Zahlen sind größer als null.(正の数は0より大きい)"],
 ["die negative Zahl","ディー ネガティーヴェ ツァール","負の数","0より小さい数。授業では Minus fünf ist eine negative Zahl.(-5は負の数です)"],
 ["die ganze Zahl","ディー ガンツェ ツァール","整数","…,-1, 0, 1, 2,… のような数。授業では Ist null Komma fünf eine ganze Zahl?(0.5は整数かな?)"],
 ["der Nenner","デア ネナー","分母","分数の下の数。授業では Finde den gemeinsamen Nenner.(分母をそろえよう=通分)"],
 ["die Dezimalzahl","ディー デツィマールツァール","小数","0.5 のような数。授業では Schreib ein Viertel als Dezimalzahl.(1/4を小数で書こう)"],
 ["die Quadratwurzel","ディー クヴァドラートヴルツェル","平方根","2乗するとその数になる数。授業では Die Quadratwurzel aus neun ist drei.(9の平方根は3)"],
 ["die Variable","ディー ヴァリアーブレ","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Hier ist x eine Variable.(ここでは x が変数)"],
 ["der Winkel","デア ヴィンケル","角","2本の線が作る開き。授業では Miss den Winkel mit dem Geodreieck.(分度器で角をはかろう)"]]);
SUL('de','sd-de-ma2','数学 2','MATH 2',[
 ["parallel","パラレール","平行な","どこまでのばしても交わらないこと。授業では Diese beiden Geraden sind parallel.(この2本の線は平行)"],
 ["der Flächeninhalt","デア フレッヒェンインハルト","面積","広さ。授業では Berechne den Flächeninhalt des Rechtecks.(長方形の面積を求めよう)"],
 ["der Radius","デア ラーディウス","半径","円の中心から円周までの長さ。授業では Der Radius ist die Hälfte des Durchmessers.(半径は直径の半分)"],
 ["das Volumen","ダス ヴォルーメン","体積","立体の大きさ。授業では Berechne das Volumen des Würfels.(立方体の体積を求めよう)"],
 ["die Funktion","ディー フンクツィオーン","関数","xが決まるとyがただ1つ決まる関係。授業では y ist eine Funktion von x.(yはxの関数)"],
 ["die Koordinaten","ディー コオルディナーテン","座標","点の位置を表す数の組。授業では Schreib die Koordinaten des Punktes P auf.(点Pの座標を書こう)"],
 ["die Wahrscheinlichkeit","ディー ヴァールシャインリヒカイト","確率","あることが起こる割合。授業では Wie groß ist die Wahrscheinlichkeit für Kopf?(表が出る確率は?)"],
 ["der Mittelwert","デア ミッテルヴェーアト","平均値","全部たして個数でわった値。授業では Berechne den Mittelwert der Daten.(データの平均値を計算しよう)"]]);
SUL('de','sd-de-sc1','理科 1','SCIENCE 1',[
 ["die Kraft","ディー クラフト","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Zeichne einen Pfeil für die Kraft.(力を矢印で表そう)"],
 ["die Reibung","ディー ライブング","摩擦","ふれ合う面で動きをじゃまする力。授業では Die Reibung bremst die Kiste.(摩擦で箱がおそくなる)"],
 ["die Geschwindigkeit","ディー ゲシュヴィンディヒカイト","速さ","距離÷時間。授業では Berechne die Durchschnittsgeschwindigkeit.(平均の速さを計算しよう)"],
 ["die Stromstärke","ディー シュトロームシュテルケ","電流","電気の流れ。単位は A(アンペア)。授業では Miss die Stromstärke mit dem Amperemeter.(電流計で電流をはかろう)"],
 ["die Spannung","ディー シュパヌング","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Schließ das Voltmeter parallel an.(電圧計は並列につなごう)"],
 ["das Magnetfeld","ダス マグネートフェルト","磁界","磁石の力がはたらく空間。授業では Mit Eisenspänen kannst du das Magnetfeld sehen.(鉄粉で磁界のようすを見よう)"],
 ["das Element","ダス エレメント","元素","物質をつくるもとになる成分。授業では Finde das Element im Periodensystem.(周期表でその元素を探そう)"],
 ["das Atom","ダス アトーム","原子","物質をつくる、とても小さなつぶ。授業では Atome sind zu klein, um sie zu sehen.(原子は小さすぎて見えない)"]]);
SUL('de','sd-de-sc2','理科 2','SCIENCE 2',[
 ["die Säure","ディー ゾイレ","酸","水溶液が酸性を示す物質。授業では Zitronensaft ist eine Säure.(レモン汁は酸)"],
 ["die Atmung","ディー アートムング","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では Bei der Atmung wird Energie frei.(呼吸でエネルギーが取り出される)"],
 ["die Verdauung","ディー フェアダウウング","消化","食べ物を体に吸収できる形に分解すること。授業では Die Verdauung beginnt im Mund.(消化は口から始まる)"],
 ["das Gen","ダス ゲーン","遺伝子","親から子に伝わる特徴のもと。授業では Gene werden von den Eltern an die Kinder weitergegeben.(遺伝子は親から子に伝わる)"],
 ["die Nahrungskette","ディー ナールングスケッテ","食物連鎖","「食べる・食べられる」のつながり。授業では Zeichne eine Nahrungskette für den Wald.(森の食物連鎖をかこう)"],
 ["der Vulkan","デア ヴルカーン","火山","マグマがふき出してできた山。授業では Dieser Vulkan ist noch aktiv.(この火山は今も活動している)"],
 ["das Fossil","ダス フォスィール","化石","大昔の生物の死がいや跡が残ったもの。授業では Fossilien erzählen uns vom Leben in der Urzeit.(化石から大昔の生物がわかる)"],
 ["das Sonnensystem","ダス ゾネンズュステーム","太陽系","太陽とそのまわりを回る天体の集まり。授業では Im Sonnensystem gibt es acht Planeten.(太陽系には8つの惑星がある)"]]);
SUL('de','sd-de-so1','社会 1','SOCIAL STUDIES 1',[
 ["der Breitengrad","デア ブライテングラート","緯度","赤道から北や南へどれだけ離れているか。授業では Tokio liegt auf etwa 36 Grad nördlicher Breite.(東京は北緯約36度にある)"],
 ["die Halbinsel","ディー ハルプインゼル","半島","三方を海に囲まれた陸地。授業では Italien ist eine lange Halbinsel in Form eines Stiefels.(イタリアはブーツの形をした長い半島だ)"],
 ["die Bevölkerungsdichte","ディー ベフェルケルングスディヒテ","人口密度","一定の面積に何人住んでいるか。授業では Tokio hat eine sehr hohe Bevölkerungsdichte.(東京は人口密度がとても高い)"],
 ["exportieren","エクスポルティーレン","輸出(する)","国内のものを外国に売ること。授業では Japan exportiert viele Autos.(日本はたくさんの車を輸出している)"],
 ["importieren","インポルティーレン","輸入(する)","外国のものを国内に買い入れること。授業では Der meiste Weizen in Japan wird importiert.(日本の小麦のほとんどは輸入されている)"],
 ["die Landwirtschaft","ディー ラントヴィルトシャフト","農業","作物を育てたり家畜を飼ったりする仕事。授業では Die Landwirtschaft ist in dieser Region wichtig.(この地域では農業が大切だ)"],
 ["die Zivilisation","ディー ツィヴィリザツィオーン","文明","都市・文字・国のしくみが発達した社会。授業では Die vier großen Zivilisationen entstanden an großen Flüssen.(四大文明は大きな川のほとりで始まった)"],
 ["das Reich","ダス ライヒ","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では Das Römische Reich bestand Hunderte von Jahren.(ローマ帝国は何百年も続いた)"]]);
SUL('de','sd-de-so2','社会 2','SOCIAL STUDIES 2',[
 ["die Kolonie","ディー コロニー","植民地","ほかの国に支配された土地。授業では Indien war einmal eine britische Kolonie.(インドはかつてイギリスの植民地だった)"],
 ["die Unabhängigkeit","ディー ウンアプヘンギヒカイト","独立","ほかの国の支配から離れて自分の国になること。授業では Die USA erklärten 1776 ihre Unabhängigkeit.(アメリカは1776年に独立を宣言した)"],
 ["der Vertrag","デア フェアトラーク","条約","国と国が文書で結ぶ約束。授業では Die beiden Länder unterzeichneten einen Friedensvertrag.(2つの国は平和条約に署名した)"],
 ["die Demokratie","ディー デモクラティー","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では In einer Demokratie wählt das Volk seine Vertreter.(民主主義では、国民がリーダーを選ぶ)"],
 ["der Premierminister","デア プレミエーミニスター","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では Der Premierminister leitet das Kabinett.(首相は内閣を率いる)"],
 ["die Menschenrechte","ディー メンシェンレヒテ","人権","人が生まれながらにもつ権利。授業では Die Menschenrechte aller müssen geachtet werden.(すべての人の人権が尊重されなければならない)"],
 ["die Steuer","ディー シュトイアー","税金","国や自治体の仕事のために国民が納めるお金。授業では Mit Steuern werden Straßen und Schulen bezahlt.(税金で道路や学校がまかなわれている)"],
 ["der Handel","デア ハンデル","貿易","国と国の間でものを売り買いすること。授業では Der Handel zwischen Japan und China ist sehr lebhaft.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('de','sd-de-la1','国語 1','LANGUAGE ARTS 1',[
 ["das Pronomen","ダス プロノーメン","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では Ersetze das Nomen durch ein Pronomen.(名詞を代名詞に置き換えよう)"],
 ["die Konjunktion","ディー コンユンクツィオーン","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では Verbinde die beiden Sätze mit einer Konjunktion.(接続詞で2つの文をつなごう)"],
 ["die Zeichensetzung","ディー ツァイヒェンゼッツング","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では Achte auf die Zeichensetzung am Ende jedes Satzes.(それぞれの文の終わりの句読点を忘れないで)"],
 ["das Synonym","ダス ズュノニューム","類義語(同じ意味の語)","意味が同じか近い語。授業では Finde ein Synonym für dieses Wort.(この単語の類義語を見つけよう)"],
 ["der Hauptgedanke","デア ハウプトゲダンケ","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では Was ist der Hauptgedanke dieses Absatzes?(この段落の要旨は何かな?)"],
 ["zusammenfassen","ツザメンファッセン","要約する","大事なところだけを短くまとめる。授業では Fasse das Kapitel in drei Sätzen zusammen.(その章を3文で要約しよう)"],
 ["die Handlung","ディー ハンドルング","あらすじ(筋)","物語のできごとの流れ。授業では Die Handlung dieses Romans steckt voller Überraschungen.(この小説の筋は驚きでいっぱいだ)"],
 ["die Figur","ディー フィグーア","登場人物","物語に出てくる人や動物。授業では Wer ist die Hauptfigur der Geschichte?(物語の主人公はだれかな?)"]]);
SUL('de','sd-de-la2','国語 2','LANGUAGE ARTS 2',[
 ["das Thema","ダス テーマ","テーマ(主題)","物語を通して伝わる大切な考え。授業では Das Thema der Geschichte ist Freundschaft.(物語のテーマは友情だ)"],
 ["der Erzähler","デア エアツェーラー","語り手","物語を語っている人。授業では Der Erzähler erzählt die Geschichte in der Ich-Form.(語り手は一人称で物語を語っている)"],
 ["die Metapher","ディー メタファー","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では „Das Leben ist eine Reise“ ist eine Metapher.(「人生は旅だ」は隠喩だ)"],
 ["der Schluss","デア シュルス","結論","エッセイの最後でまとめる部分。授業では Wiederhole deinen Hauptgedanken im Schluss.(結論でもう一度主な主張を述べよう)"],
 ["der Entwurf","デア エントヴルフ","下書き","まず全体を書いてみたもの。授業では Mach deinen Entwurf bis Freitag fertig.(金曜日までに下書きを終わらせよう)"],
 ["Korrektur lesen","コレクトゥーア レーゼン","校正する","つづりや句読点のまちがいを確かめる。授業では Lies sorgfältig Korrektur und achte auf Rechtschreibfehler.(つづりのまちがいがないか注意して校正しよう)"],
 ["das Referat","ダス レフェラート","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では Jede Gruppe hält ein Referat von fünf Minuten.(各グループが5分の発表をする)"],
 ["die Debatte","ディー デバッテ","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では Das Thema der heutigen Debatte ist die Schuluniform.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-de-a']={L:'de',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-de-ma1", "sd-de-ma2", "sd-de-sc1", "sd-de-sc2", "sd-de-so1", "sd-de-so2", "sd-de-la1", "sd-de-la2"],key:'sd-de-a'};
SUL('de','sd-de-it1','情報 1','COMPUTING 1',[
 ["die Hardware","ディー ハードウェア","ハードウェア","コンピューターの機械の部分。授業では Die Tastatur und der Bildschirm sind Hardware.(キーボードと画面はハードウェアだ)"],
 ["die Software","ディー ソフトウェア","ソフトウェア","コンピューターを動かすプログラム。授業では Installiere die Software vor dem Unterricht.(授業の前にソフトウェアをインストールしておこう)"],
 ["das Betriebssystem","ダス ベトリープスズュステーム","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows und macOS sind Betriebssysteme.(Windows と macOS はOSだ)"],
 ["das Binärsystem","ダス ビネーアズュステーム","2進法","0と1だけで数を表す方法。授業では Computer speichern alles im Binärsystem.(コンピューターはすべてを2進法で記録する)"],
 ["das Pixel","ダス ピクセル","画素(ピクセル)","画像をつくる小さな点。授業では Wenn du zoomst, siehst du jedes Pixel.(拡大すると一つ一つの画素が見える)"],
 ["der Algorithmus","デア アルゴリトムス","アルゴリズム","問題を解くための手順。授業では Schreib einen Algorithmus für ein Sandwich.(サンドイッチを作るアルゴリズムを書こう)"],
 ["das Flussdiagramm","ダス フルスディアグラム","フローチャート","手順を図形と矢印で表した図。授業では Zeichne ein Flussdiagramm, bevor du programmierst.(コードを書く前にフローチャートを描こう)"],
 ["die Schleife","ディー シュライフェ","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では Benutze eine Schleife, um zehn Sterne zu zeichnen.(繰り返しを使って星を10個描こう)"]]);
SUL('de','sd-de-it2','情報 2','COMPUTING 2',[
 ["debuggen","デバッゲン","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では Lasst uns diesen Code zusammen debuggen.(このコードを一緒にデバッグしよう)"],
 ["das Netzwerk","ダス ネッツヴェルク","ネットワーク","コンピューターどうしをつないだもの。授業では Alle Computer in diesem Raum sind im selben Netzwerk.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["die Suchmaschine","ディー ズーフマシーネ","検索エンジン","キーワードでウェブの情報を探すサービス。授業では Benutze gute Suchbegriffe in der Suchmaschine.(検索エンジンではよいキーワードを使おう)"],
 ["das Phishing","ダス フィッシング","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では Klicke nie auf Links in Phishing-Mails.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["die Verschlüsselung","ディー フェアシュリュッセルング","暗号化","データを決まった人しか読めない形に変えること。授業では Die Verschlüsselung schützt deine Nachrichten.(暗号化によってメッセージの秘密が守られる)"],
 ["die persönlichen Daten","ディー ペルゼーンリヒェン ダーテン","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では Teile keine persönlichen Daten im Internet.(ネットで個人情報を公開しないで)"],
 ["das Urheberrecht","ダス ウーアヘーバーレヒト","著作権","作品を作った人がもつ権利。授業では Dieses Lied ist durch das Urheberrecht geschützt.(この曲は著作権で守られている)"],
 ["die künstliche Intelligenz","ディー キュンストリヒェ インテリゲンツ","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では Künstliche Intelligenz kann Sprachen übersetzen.(人工知能は言葉を翻訳できる)"]]);
SUL('de','sd-de-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["der Muskel","デア ムスケル","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では Dehne vor dem Laufen deine Beinmuskeln.(走る前に脚の筋肉を伸ばそう)"],
 ["der Knochen","デア クノッヘン","骨","体を支え、内臓を守るかたいもの。授業では Kalzium macht die Knochen stark.(カルシウムは骨を強くする)"],
 ["das Gelenk","ダス ゲレンク","関節","骨と骨のつなぎ目。授業では Das Knie ist ein Gelenk.(ひざは関節だ)"],
 ["der Puls","デア プルス","心拍数","1分間に心臓が打つ回数。授業では Miss nach dem Lauf deinen Puls.(走ったあとに心拍数を測ろう)"],
 ["die Pubertät","ディー プベルテート","思春期","子どもから大人の体に変わっていく時期。授業では In der Pubertät verändert sich dein Körper stark.(思春期には体が大きく変わる)"],
 ["der Nährstoff","デア ネーアシュトッフ","栄養素","体に必要な、食べ物にふくまれる成分。授業では Gemüse steckt voller Nährstoffe.(野菜には栄養素がたくさんふくまれている)"],
 ["das Eiweiß","ダス アイヴァイス","たんぱく質","筋肉や血をつくる栄養素。授業では Iss Eiweiß, um Muskeln aufzubauen.(筋肉をつけるにはたんぱく質をとろう)"],
 ["die ausgewogene Ernährung","ディー アウスゲヴォーゲネ エアネールング","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では Zu einer ausgewogenen Ernährung gehören Obst, Gemüse und Getreide.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('de','sd-de-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["die Flüssigkeitszufuhr","ディー フリュスィヒカイツツーフーア","水分補給","体に必要な水分をとること。授業では An heißen Tagen ist die Flüssigkeitszufuhr wichtig.(暑い日は水分補給が大切だ)"],
 ["die psychische Gesundheit","ディー プスューヒシェ ゲズントハイト","心の健康","気持ちや心の状態の健康。授業では Mit einem Freund zu reden kann der psychischen Gesundheit helfen.(友だちに話すことは心の健康の助けになる)"],
 ["die Erste Hilfe","ディー エーアステ ヒルフェ","応急手当","けがや急な病気のときにその場でする手当て。授業では Jeder sollte die Grundlagen der Ersten Hilfe lernen.(だれもが基本の応急手当を学ぶべきだ)"],
 ["die Verstauchung","ディー フェアシュタウフング","ねんざ","関節をひねって痛めること。授業では Er hat eine Verstauchung am Knöchel.(彼は足首をねんざしている)"],
 ["der Hitzschlag","デア ヒッツシュラーク","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では Mach im Schatten Pause, um einen Hitzschlag zu vermeiden.(熱中症を防ぐために日かげで休もう)"],
 ["der Schiedsrichter","デア シーツリヒター","審判","試合のルールを守らせる人。授業では Hör auf die Pfeife des Schiedsrichters.(審判の笛をよく聞こう)"],
 ["das Foul","ダス ファウル","反則(ファウル)","ルールに違反すること。授業では Schubsen ist ein Foul.(押すのは反則だ)"],
 ["der Staffellauf","デア シュタッフェルラウフ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では Übergib den Stab beim Staffellauf sauber.(リレーではバトンをなめらかに渡そう)"]]);
SUL('de','sd-de-mu1','音楽 1','MUSIC 1',[
 ["die Notenlinien","ディー ノーテンリーニエン","五線(譜)","音符を書く5本の線。授業では Schreib die Noten auf die Notenlinien.(五線に音符を書こう)"],
 ["die Viertelnote","ディー フィアテルノーテ","四分音符","1拍分の長さの音符。授業では Eine Viertelnote dauert einen Schlag.(四分音符は1拍だ)"],
 ["die Taktart","ディー タクトアールト","拍子記号","1小節に何拍あるかを表す記号。授業では Dieses Lied steht im Dreivierteltakt.(この曲は4分の3拍子だ)"],
 ["der Schlag","デア シュラーク","拍","音楽の一定の刻み。授業では Klatsch auf jeden Schlag.(毎拍、手をたたこう)"],
 ["das Tempo","ダス テンポ","テンポ(速さ)","曲の速さ。授業では Am Anfang ist das Tempo langsam.(最初はテンポがゆっくりだ)"],
 ["die Tonleiter","ディー トーンライター","音階","ドレミファソラシドのように順に並んだ音。授業では Spiel die C-Dur-Tonleiter.(ハ長調の音階を弾こう)"],
 ["Dur","ドゥーア","長調","明るい感じの調。授業では Dieses Lied steht in Dur, deshalb klingt es fröhlich.(この曲は長調なので明るく聞こえる)"],
 ["Moll","モル","短調","暗い・悲しい感じの調。授業では Moll klingt oft traurig.(短調はよく悲しく聞こえる)"]]);
SUL('de','sd-de-mu2','音楽 2','MUSIC 2',[
 ["der Akkord","デア アコルト","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では Spiel den C-Akkord mit drei Fingern.(3本の指で C のコードを弾こう)"],
 ["das Saiteninstrument","ダス ザイテンインストゥルメント","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では Die Geige ist ein Saiteninstrument.(バイオリンは弦楽器だ)"],
 ["das Schlaginstrument","ダス シュラークインストゥルメント","打楽器","たたいたりふったりして音を出す楽器。授業では Trommeln sind Schlaginstrumente.(ドラムは打楽器だ)"],
 ["der Dirigent","デア ディリゲント","指揮者","合奏や合唱をまとめる人。授業では Achte beim Tempo auf den Dirigenten.(テンポは指揮者を見てとろう)"],
 ["das Crescendo","ダス クレシェンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では Mach zum Ende hin ein Crescendo.(終わりに向かってだんだん強くしよう)"],
 ["der Komponist","デア コンポニスト","作曲家","曲を作る人。授業では Beethoven war ein deutscher Komponist.(ベートーヴェンはドイツの作曲家だった)"],
 ["die Sinfonie","ディー ズィンフォニー","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では Eine Sinfonie hat meistens vier Sätze.(交響曲はふつう4つの楽章からなる)"],
 ["der Liedtext","デア リートテクスト","歌詞","歌のことば。授業では Kannst du den Liedtext auswendig?(歌詞を覚えているかな?)"]]);
SUL('de','sd-de-ar1','美術 1','ART 1',[
 ["die Skizze","ディー スキッツェ","スケッチ(する)","大まかにさっと描くこと。授業では Fang mit einer schnellen Skizze mit Bleistift an.(まず鉛筆でさっとスケッチしよう)"],
 ["die Schattierung","ディー シャティールング","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では Durch die Schattierung wirkt der Apfel rund.(陰影をつけるとリンゴが丸く見える)"],
 ["die Perspektive","ディー ペルスペクティーヴェ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では Nutze die Perspektive, damit die Straße lang wirkt.(遠近法を使って道が長く見えるようにしよう)"],
 ["das Stillleben","ダス シュティルレーベン","静物画","果物や花びんなど、動かないものを描いた絵。授業では Heute malen wir ein Stillleben mit Obst.(今日は果物の静物画を描く)"],
 ["das Porträt","ダス ポルトレー","肖像画","人の顔や姿を描いた絵。授業では Zeichne ein Porträt deines Sitznachbarn.(隣の人の肖像画を描こう)"],
 ["die Grundfarben","ディー グルントファルベン","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では Rot, Blau und Gelb sind die Grundfarben.(赤・青・黄が三原色だ)"],
 ["die Komplementärfarben","ディー コンプレメンテーアファルベン","補色","色相環で向かい合う、たがいを引き立てる色。授業では Orange und Blau sind Komplementärfarben.(オレンジと青は補色だ)"],
 ["die Bildkomposition","ディー ビルトコンポズィツィオーン","構図","画面の中での配置。授業では Denk vor dem Malen an die Bildkomposition.(描く前に構図を考えよう)"]]);
SUL('de','sd-de-ar2','美術 2','ART 2',[
 ["der Hintergrund","デア ヒンターグルント","背景","絵の奥の部分。授業では Mal zuerst den Hintergrund.(背景を先に塗ろう)"],
 ["die Aquarellfarbe","ディー アクヴァレルファルベ","水彩絵の具","水でといて使う、すき通る絵の具。授業では Aquarellfarbe trocknet schnell, also arbeite zügig.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["die Palette","ディー パレッテ","パレット","絵の具をまぜる板。授業では Misch die Farben auf der Palette, nicht auf dem Papier.(色は紙の上ではなくパレットでまぜよう)"],
 ["der Ton","デア トーン","粘土","形を自由に作れるやわらかい土。授業では Form aus dem Ton eine kleine Schale.(粘土で小さなお皿の形を作ろう)"],
 ["die Skulptur","ディー スクルプトゥーア","彫刻","立体的に作った作品。授業では Diese Skulptur ist aus Stein.(この彫刻は石でできている)"],
 ["die Drucktechnik","ディー ドルックテヒニク","版画","版を作ってインクで紙に写す方法。授業では Mit der Drucktechnik kann man viele Kopien eines Bildes machen.(版画では1つの絵からたくさん刷ることができる)"],
 ["das Meisterwerk","ダス マイスターヴェルク","傑作(名作)","とてもすぐれた作品。授業では Die Mona Lisa ist ein berühmtes Meisterwerk.(モナ・リザは有名な傑作だ)"],
 ["die Ausstellung","ディー アウスシュテルング","展覧会","作品を並べて見せる催し。授業では Unsere Werke kommen in die Schulausstellung.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-de-b']={L:'de',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-de-it1", "sd-de-it2", "sd-de-pe1", "sd-de-pe2", "sd-de-mu1", "sd-de-mu2", "sd-de-ar1", "sd-de-ar2"],key:'sd-de-b'};
SDL_MORE.de=[{bank:'sd-de-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-de-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('pt','sd-pt-ma1','数学 1','MATH 1',[
 ["o número positivo","ウ ヌーメロ ポズィチーヴォ","正の数","0より大きい数。授業では Os números positivos são maiores que zero.(正の数は0より大きい)"],
 ["o número negativo","ウ ヌーメロ ネガチーヴォ","負の数","0より小さい数。授業では Menos cinco é um número negativo.(-5は負の数です)"],
 ["o número inteiro","ウ ヌーメロ インテイロ","整数","…,-1, 0, 1, 2,… のような数。授業では Zero vírgula cinco é um número inteiro?(0.5は整数かな?)"],
 ["o denominador","ウ デノミナドール","分母","分数の下の数。授業では Encontre o denominador comum.(分母をそろえよう=通分)"],
 ["o número decimal","ウ ヌーメロ デスィマウ","小数","0.5 のような数。授業では Escreva um quarto como número decimal.(1/4を小数で書こう)"],
 ["a raiz quadrada","ア ハイース クアドラーダ","平方根","2乗するとその数になる数。授業では A raiz quadrada de nove é três.(9の平方根は3)"],
 ["a variável","ア ヴァリアーヴェウ","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Aqui, x é uma variável.(ここでは x が変数)"],
 ["o ângulo","ウ アングロ","角","2本の線が作る開き。授業では Meça o ângulo com o transferidor.(分度器で角をはかろう)"]]);
SUL('pt','sd-pt-ma2','数学 2','MATH 2',[
 ["paralelo","パラレーロ","平行な","どこまでのばしても交わらないこと。授業では Estas duas retas são paralelas.(この2本の線は平行)"],
 ["a área","ア アーリア","面積","広さ。授業では Calcule a área do retângulo.(長方形の面積を求めよう)"],
 ["o raio","ウ ハイオ","半径","円の中心から円周までの長さ。授業では O raio é a metade do diâmetro.(半径は直径の半分)"],
 ["o volume","ウ ヴォルーミ","体積","立体の大きさ。授業では Calcule o volume do cubo.(立方体の体積を求めよう)"],
 ["a função","ア フンサォン","関数","xが決まるとyがただ1つ決まる関係。授業では y é função de x.(yはxの関数)"],
 ["as coordenadas","アス コオルデナーダス","座標","点の位置を表す数の組。授業では Escreva as coordenadas do ponto P.(点Pの座標を書こう)"],
 ["a probabilidade","ア プロバビリダーヂ","確率","あることが起こる割合。授業では Qual é a probabilidade de sair cara?(表が出る確率は?)"],
 ["a média","ア メーヂア","平均値","全部たして個数でわった値。授業では Calcule a média dos dados.(データの平均値を計算しよう)"]]);
SUL('pt','sd-pt-sc1','理科 1','SCIENCE 1',[
 ["a força","ア フォルサ","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Desenhe uma seta para representar a força.(力を矢印で表そう)"],
 ["o atrito","ウ アトリートゥ","摩擦","ふれ合う面で動きをじゃまする力。授業では O atrito faz a caixa ir mais devagar.(摩擦で箱がおそくなる)"],
 ["a velocidade","ア ヴェロスィダーヂ","速さ","距離÷時間。授業では Calcule a velocidade média.(平均の速さを計算しよう)"],
 ["a corrente elétrica","ア コヘンチ エレトリカ","電流","電気の流れ。単位は A(アンペア)。授業では Meça a corrente com o amperímetro.(電流計で電流をはかろう)"],
 ["a tensão","ア テンサォン","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Ligue o voltímetro em paralelo.(電圧計は並列につなごう)"],
 ["o campo magnético","ウ カンプ マギネチコ","磁界","磁石の力がはたらく空間。授業では Use limalha de ferro para ver o campo magnético.(鉄粉で磁界のようすを見よう)"],
 ["o elemento","ウ エレメントゥ","元素","物質をつくるもとになる成分。授業では Encontre o elemento na tabela periódica.(周期表でその元素を探そう)"],
 ["o átomo","ウ アトモ","原子","物質をつくる、とても小さなつぶ。授業では Os átomos são pequenos demais para serem vistos.(原子は小さすぎて見えない)"]]);
SUL('pt','sd-pt-sc2','理科 2','SCIENCE 2',[
 ["o ácido","ウ アスィド","酸","水溶液が酸性を示す物質。授業では O suco de limão é um ácido.(レモン汁は酸)"],
 ["a respiração","ア ヘスピラサォン","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では A respiração libera energia.(呼吸でエネルギーが取り出される)"],
 ["a digestão","ア ヂジェスタォン","消化","食べ物を体に吸収できる形に分解すること。授業では A digestão começa na boca.(消化は口から始まる)"],
 ["o gene","ウ ジェーニ","遺伝子","親から子に伝わる特徴のもと。授業では Os genes passam dos pais para os filhos.(遺伝子は親から子に伝わる)"],
 ["a cadeia alimentar","ア カデイア アリメンタール","食物連鎖","「食べる・食べられる」のつながり。授業では Desenhe uma cadeia alimentar da floresta.(森の食物連鎖をかこう)"],
 ["o vulcão","ウ ヴウカォン","火山","マグマがふき出してできた山。授業では Este vulcão ainda está ativo.(この火山は今も活動している)"],
 ["o fóssil","ウ フォスィウ","化石","大昔の生物の死がいや跡が残ったもの。授業では Os fósseis nos contam sobre a vida antiga.(化石から大昔の生物がわかる)"],
 ["o sistema solar","ウ スィステーマ ソラール","太陽系","太陽とそのまわりを回る天体の集まり。授業では Há oito planetas no sistema solar.(太陽系には8つの惑星がある)"]]);
SUL('pt','sd-pt-so1','社会 1','SOCIAL STUDIES 1',[
 ["a latitude","ア ラチトゥーヂ","緯度","赤道から北や南へどれだけ離れているか。授業では Tóquio fica a cerca de 36 graus de latitude norte.(東京は北緯約36度にある)"],
 ["a península","ア ペニンスラ","半島","三方を海に囲まれた陸地。授業では A Itália é uma península comprida em forma de bota.(イタリアはブーツの形をした長い半島だ)"],
 ["a densidade demográfica","ア デンスィダーヂ デモグラフィカ","人口密度","一定の面積に何人住んでいるか。授業では Tóquio tem uma densidade demográfica muito alta.(東京は人口密度がとても高い)"],
 ["exportar","エスポルタール","輸出(する)","国内のものを外国に売ること。授業では O Japão exporta muitos carros.(日本はたくさんの車を輸出している)"],
 ["importar","インポルタール","輸入(する)","外国のものを国内に買い入れること。授業では A maior parte do trigo do Japão é importada.(日本の小麦のほとんどは輸入されている)"],
 ["a agricultura","ア アグリクウトゥーラ","農業","作物を育てたり家畜を飼ったりする仕事。授業では A agricultura é importante nesta região.(この地域では農業が大切だ)"],
 ["a civilização","ア スィヴィリザサォン","文明","都市・文字・国のしくみが発達した社会。授業では As quatro grandes civilizações surgiram junto a grandes rios.(四大文明は大きな川のほとりで始まった)"],
 ["o império","ウ インペーリオ","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では O Império Romano durou centenas de anos.(ローマ帝国は何百年も続いた)"]]);
SUL('pt','sd-pt-so2','社会 2','SOCIAL STUDIES 2',[
 ["a colônia","ア コローニア","植民地","ほかの国に支配された土地。授業では A Índia foi uma colônia britânica.(インドはかつてイギリスの植民地だった)"],
 ["a independência","ア インデペンデンスィア","独立","ほかの国の支配から離れて自分の国になること。授業では Os Estados Unidos declararam a independência em 1776.(アメリカは1776年に独立を宣言した)"],
 ["o tratado","ウ トラタードゥ","条約","国と国が文書で結ぶ約束。授業では Os dois países assinaram um tratado de paz.(2つの国は平和条約に署名した)"],
 ["a democracia","ア デモクラスィーア","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では Na democracia, o povo escolhe seus líderes.(民主主義では、国民がリーダーを選ぶ)"],
 ["o primeiro-ministro","ウ プリメイロ ミニストロ","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では O primeiro-ministro lidera o gabinete.(首相は内閣を率いる)"],
 ["os direitos humanos","ウス ヂレイトス ウマーノス","人権","人が生まれながらにもつ権利。授業では Os direitos humanos de todos devem ser respeitados.(すべての人の人権が尊重されなければならない)"],
 ["o imposto","ウ インポストゥ","税金","国や自治体の仕事のために国民が納めるお金。授業では Os impostos pagam as estradas e as escolas.(税金で道路や学校がまかなわれている)"],
 ["o comércio","ウ コメルスィオ","貿易","国と国の間でものを売り買いすること。授業では O comércio entre o Japão e a China é muito ativo.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('pt','sd-pt-la1','国語 1','LANGUAGE ARTS 1',[
 ["o pronome","ウ プロノーミ","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では Troque o substantivo por um pronome.(名詞を代名詞に置き換えよう)"],
 ["a conjunção","ア コンジュンサォン","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では Junte as duas frases com uma conjunção.(接続詞で2つの文をつなごう)"],
 ["a pontuação","ア ポントゥアサォン","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では Não esqueça a pontuação no fim de cada frase.(それぞれの文の終わりの句読点を忘れないで)"],
 ["o sinônimo","ウ スィノーニモ","類義語(同じ意味の語)","意味が同じか近い語。授業では Encontre um sinônimo para esta palavra.(この単語の類義語を見つけよう)"],
 ["a ideia principal","ア イデイア プリンスィパウ","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では Qual é a ideia principal deste parágrafo?(この段落の要旨は何かな?)"],
 ["resumir","ヘズミール","要約する","大事なところだけを短くまとめる。授業では Resuma o capítulo em três frases.(その章を3文で要約しよう)"],
 ["o enredo","ウ エンヘード","あらすじ(筋)","物語のできごとの流れ。授業では O enredo deste romance é cheio de surpresas.(この小説の筋は驚きでいっぱいだ)"],
 ["o personagem","ウ ペルソナージェン","登場人物","物語に出てくる人や動物。授業では Quem é o personagem principal da história?(物語の主人公はだれかな?)"]]);
SUL('pt','sd-pt-la2','国語 2','LANGUAGE ARTS 2',[
 ["o tema","ウ テーマ","テーマ(主題)","物語を通して伝わる大切な考え。授業では O tema da história é a amizade.(物語のテーマは友情だ)"],
 ["o narrador","ウ ナハドール","語り手","物語を語っている人。授業では O narrador conta a história em primeira pessoa.(語り手は一人称で物語を語っている)"],
 ["a metáfora","ア メタフォラ","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では “A vida é uma viagem” é uma metáfora.(「人生は旅だ」は隠喩だ)"],
 ["a conclusão","ア コンクルザォン","結論","エッセイの最後でまとめる部分。授業では Retome sua ideia principal na conclusão.(結論でもう一度主な主張を述べよう)"],
 ["o rascunho","ウ ハスクーニョ","下書き","まず全体を書いてみたもの。授業では Termine o rascunho até sexta-feira.(金曜日までに下書きを終わらせよう)"],
 ["revisar","ヘヴィザール","校正する","つづりや句読点のまちがいを確かめる。授業では Revise com atenção os erros de ortografia.(つづりのまちがいがないか注意して校正しよう)"],
 ["a apresentação","ア アプレゼンタサォン","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では Cada grupo vai fazer uma apresentação de cinco minutos.(各グループが5分の発表をする)"],
 ["o debate","ウ デバーチ","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では O tema do debate de hoje é o uniforme escolar.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-pt-a']={L:'pt',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-pt-ma1", "sd-pt-ma2", "sd-pt-sc1", "sd-pt-sc2", "sd-pt-so1", "sd-pt-so2", "sd-pt-la1", "sd-pt-la2"],key:'sd-pt-a'};
SUL('pt','sd-pt-it1','情報 1','COMPUTING 1',[
 ["o hardware","ウ ハードウェア","ハードウェア","コンピューターの機械の部分。授業では O teclado e a tela são hardware.(キーボードと画面はハードウェアだ)"],
 ["o software","ウ ソフトウェア","ソフトウェア","コンピューターを動かすプログラム。授業では Instale o software antes da aula.(授業の前にソフトウェアをインストールしておこう)"],
 ["o sistema operacional","ウ スィステーマ オペラスィオナウ","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows e macOS são sistemas operacionais.(Windows と macOS はOSだ)"],
 ["o sistema binário","ウ スィステーマ ビナーリオ","2進法","0と1だけで数を表す方法。授業では Os computadores guardam tudo em binário.(コンピューターはすべてを2進法で記録する)"],
 ["o pixel","ウ ピクセウ","画素(ピクセル)","画像をつくる小さな点。授業では Dando zoom, dá para ver cada pixel.(拡大すると一つ一つの画素が見える)"],
 ["o algoritmo","ウ アウゴリッチモ","アルゴリズム","問題を解くための手順。授業では Escreva um algoritmo para fazer um sanduíche.(サンドイッチを作るアルゴリズムを書こう)"],
 ["o fluxograma","ウ フルクソグラーマ","フローチャート","手順を図形と矢印で表した図。授業では Desenhe um fluxograma antes de programar.(コードを書く前にフローチャートを描こう)"],
 ["o laço de repetição","ウ ラッソ ヂ ヘペチサォン","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では Use um laço de repetição para desenhar dez estrelas.(繰り返しを使って星を10個描こう)"]]);
SUL('pt','sd-pt-it2','情報 2','COMPUTING 2',[
 ["depurar","デプラール","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では Vamos depurar este código juntos.(このコードを一緒にデバッグしよう)"],
 ["a rede","ア ヘーヂ","ネットワーク","コンピューターどうしをつないだもの。授業では Todos os computadores desta sala estão na mesma rede.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["o buscador","ウ ブスカドール","検索エンジン","キーワードでウェブの情報を探すサービス。授業では Use boas palavras-chave no buscador.(検索エンジンではよいキーワードを使おう)"],
 ["o phishing","ウ フィッシン","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では Nunca clique em links de e-mails de phishing.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["a criptografia","ア クリプトグラフィーア","暗号化","データを決まった人しか読めない形に変えること。授業では A criptografia protege suas mensagens.(暗号化によってメッセージの秘密が守られる)"],
 ["os dados pessoais","ウス ダードス ペソアイス","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では Não compartilhe dados pessoais na internet.(ネットで個人情報を公開しないで)"],
 ["os direitos autorais","ウス ヂレイトス アウトライス","著作権","作品を作った人がもつ権利。授業では Esta música é protegida por direitos autorais.(この曲は著作権で守られている)"],
 ["a inteligência artificial","ア インテリジェンスィア アルチフィスィアウ","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では A inteligência artificial pode traduzir idiomas.(人工知能は言葉を翻訳できる)"]]);
SUL('pt','sd-pt-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["o músculo","ウ ムスクロ","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では Alongue os músculos das pernas antes de correr.(走る前に脚の筋肉を伸ばそう)"],
 ["o osso","ウ オッソ","骨","体を支え、内臓を守るかたいもの。授業では O cálcio deixa os ossos fortes.(カルシウムは骨を強くする)"],
 ["a articulação","ア アルチクラサォン","関節","骨と骨のつなぎ目。授業では O joelho é uma articulação.(ひざは関節だ)"],
 ["a frequência cardíaca","ア フレクエンスィア カルヂーアカ","心拍数","1分間に心臓が打つ回数。授業では Meça a frequência cardíaca depois da corrida.(走ったあとに心拍数を測ろう)"],
 ["a puberdade","ア プベルダーヂ","思春期","子どもから大人の体に変わっていく時期。授業では O corpo muda muito na puberdade.(思春期には体が大きく変わる)"],
 ["o nutriente","ウ ヌトリエンチ","栄養素","体に必要な、食べ物にふくまれる成分。授業では Os legumes estão cheios de nutrientes.(野菜には栄養素がたくさんふくまれている)"],
 ["a proteína","ア プロテイーナ","たんぱく質","筋肉や血をつくる栄養素。授業では Coma proteína para ganhar músculo.(筋肉をつけるにはたんぱく質をとろう)"],
 ["a alimentação equilibrada","ア アリメンタサォン エキリブラーダ","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では Uma alimentação equilibrada inclui frutas, verduras e cereais.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('pt','sd-pt-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["a hidratação","ア イドラタサォン","水分補給","体に必要な水分をとること。授業では A hidratação é importante nos dias quentes.(暑い日は水分補給が大切だ)"],
 ["a saúde mental","ア サウーヂ メンタウ","心の健康","気持ちや心の状態の健康。授業では Conversar com um amigo pode ajudar a saúde mental.(友だちに話すことは心の健康の助けになる)"],
 ["os primeiros socorros","ウス プリメイロス ソコーホス","応急手当","けがや急な病気のときにその場でする手当て。授業では Todo mundo deveria aprender primeiros socorros.(だれもが基本の応急手当を学ぶべきだ)"],
 ["a torção","ア トルサォン","ねんざ","関節をひねって痛めること。授業では Ele está com uma torção no tornozelo.(彼は足首をねんざしている)"],
 ["a insolação","ア インソラサォン","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では Descanse na sombra para evitar uma insolação.(熱中症を防ぐために日かげで休もう)"],
 ["o árbitro","ウ アルビトロ","審判","試合のルールを守らせる人。授業では Preste atenção ao apito do árbitro.(審判の笛をよく聞こう)"],
 ["a falta","ア ファウタ","反則(ファウル)","ルールに違反すること。授業では Empurrar é falta.(押すのは反則だ)"],
 ["a corrida de revezamento","ア コヒーダ ヂ ヘヴェザメントゥ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では Passe bem o bastão na corrida de revezamento.(リレーではバトンをなめらかに渡そう)"]]);
SUL('pt','sd-pt-mu1','音楽 1','MUSIC 1',[
 ["a pauta","ア パウタ","五線(譜)","音符を書く5本の線。授業では Escreva as notas na pauta.(五線に音符を書こう)"],
 ["a semínima","ア セミーニマ","四分音符","1拍分の長さの音符。授業では A semínima vale um tempo.(四分音符は1拍だ)"],
 ["a fórmula de compasso","ア フォルムラ ヂ コンパッソ","拍子記号","1小節に何拍あるかを表す記号。授業では Esta música está em três por quatro.(この曲は4分の3拍子だ)"],
 ["a pulsação","ア プウササォン","拍","音楽の一定の刻み。授業では Bata palmas em cada pulsação.(毎拍、手をたたこう)"],
 ["o andamento","ウ アンダメントゥ","テンポ(速さ)","曲の速さ。授業では No começo, o andamento é lento.(最初はテンポがゆっくりだ)"],
 ["a escala","ア エスカーラ","音階","ドレミファソラシドのように順に並んだ音。授業では Toque a escala de dó maior.(ハ長調の音階を弾こう)"],
 ["o tom maior","ウ トン マイオール","長調","明るい感じの調。授業では Esta música está em tom maior, por isso soa alegre.(この曲は長調なので明るく聞こえる)"],
 ["o tom menor","ウ トン メノール","短調","暗い・悲しい感じの調。授業では O tom menor costuma soar triste.(短調はよく悲しく聞こえる)"]]);
SUL('pt','sd-pt-mu2','音楽 2','MUSIC 2',[
 ["o acorde","ウ アコルヂ","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では Toque o acorde de dó com três dedos.(3本の指で C のコードを弾こう)"],
 ["o instrumento de corda","ウ インストルメントゥ ヂ コルダ","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では O violino é um instrumento de corda.(バイオリンは弦楽器だ)"],
 ["o instrumento de percussão","ウ インストルメントゥ ヂ ペルクサォン","打楽器","たたいたりふったりして音を出す楽器。授業では Os tambores são instrumentos de percussão.(ドラムは打楽器だ)"],
 ["o maestro","ウ マエストロ","指揮者","合奏や合唱をまとめる人。授業では Olhe para o maestro para acompanhar o andamento.(テンポは指揮者を見てとろう)"],
 ["o crescendo","ウ クレシェンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では Faça um crescendo no final.(終わりに向かってだんだん強くしよう)"],
 ["o compositor","ウ コンポズィトール","作曲家","曲を作る人。授業では Beethoven foi um compositor alemão.(ベートーヴェンはドイツの作曲家だった)"],
 ["a sinfonia","ア スィンフォニーア","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では Uma sinfonia costuma ter quatro movimentos.(交響曲はふつう4つの楽章からなる)"],
 ["a letra","ア レトラ","歌詞","歌のことば。授業では Você sabe a letra de cor?(歌詞を覚えているかな?)"]]);
SUL('pt','sd-pt-ar1','美術 1','ART 1',[
 ["o esboço","ウ エズボッソ","スケッチ(する)","大まかにさっと描くこと。授業では Comece com um esboço rápido a lápis.(まず鉛筆でさっとスケッチしよう)"],
 ["o sombreamento","ウ ソンブレアメントゥ","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では O sombreamento faz a maçã parecer redonda.(陰影をつけるとリンゴが丸く見える)"],
 ["a perspectiva","ア ペルスペキチーヴァ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では Use a perspectiva para a estrada parecer longa.(遠近法を使って道が長く見えるようにしよう)"],
 ["a natureza-morta","ア ナトゥレーザ モルタ","静物画","果物や花びんなど、動かないものを描いた絵。授業では Hoje vamos pintar uma natureza-morta de frutas.(今日は果物の静物画を描く)"],
 ["o retrato","ウ ヘトラートゥ","肖像画","人の顔や姿を描いた絵。授業では Desenhe o retrato do colega ao seu lado.(隣の人の肖像画を描こう)"],
 ["as cores primárias","アス コーリス プリマーリアス","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では Vermelho, azul e amarelo são as cores primárias.(赤・青・黄が三原色だ)"],
 ["as cores complementares","アス コーリス コンプレメンターリス","補色","色相環で向かい合う、たがいを引き立てる色。授業では Laranja e azul são cores complementares.(オレンジと青は補色だ)"],
 ["a composição","ア コンポズィサォン","構図","画面の中での配置。授業では Pense na composição antes de pintar.(描く前に構図を考えよう)"]]);
SUL('pt','sd-pt-ar2','美術 2','ART 2',[
 ["o fundo","ウ フンド","背景","絵の奥の部分。授業では Pinte o fundo primeiro.(背景を先に塗ろう)"],
 ["a aquarela","ア アクアレーラ","水彩絵の具","水でといて使う、すき通る絵の具。授業では A aquarela seca rápido, então trabalhe depressa.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["a paleta","ア パレータ","パレット","絵の具をまぜる板。授業では Misture as cores na paleta, não no papel.(色は紙の上ではなくパレットでまぜよう)"],
 ["a argila","ア アルジーラ","粘土","形を自由に作れるやわらかい土。授業では Modele a argila em forma de tigela pequena.(粘土で小さなお皿の形を作ろう)"],
 ["a escultura","ア エスクウトゥーラ","彫刻","立体的に作った作品。授業では Esta escultura é de pedra.(この彫刻は石でできている)"],
 ["a gravura","ア グラヴーラ","版画","版を作ってインクで紙に写す方法。授業では Com a gravura, dá para fazer muitas cópias de uma imagem.(版画では1つの絵からたくさん刷ることができる)"],
 ["a obra-prima","ア オブラ プリーマ","傑作(名作)","とてもすぐれた作品。授業では A Mona Lisa é uma obra-prima famosa.(モナ・リザは有名な傑作だ)"],
 ["a exposição","ア エスポズィサォン","展覧会","作品を並べて見せる催し。授業では Nossos trabalhos vão estar na exposição da escola.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-pt-b']={L:'pt',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-pt-it1", "sd-pt-it2", "sd-pt-pe1", "sd-pt-pe2", "sd-pt-mu1", "sd-pt-mu2", "sd-pt-ar1", "sd-pt-ar2"],key:'sd-pt-b'};
SDL_MORE.pt=[{bank:'sd-pt-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-pt-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('ru','sd-ru-ma1','数学 1','MATH 1',[
 ["положительное число","パラジーチリナエ チスロー","正の数","0より大きい数。授業では Положительные числа больше нуля.(正の数は0より大きい)"],
 ["отрицательное число","アトリツァーチリナエ チスロー","負の数","0より小さい数。授業では Минус пять — отрицательное число.(-5は負の数です)"],
 ["целое число","ツェーラエ チスロー","整数","…,-1, 0, 1, 2,… のような数。授業では Ноль целых пять десятых — это целое число?(0.5は整数かな?)"],
 ["знаменатель","ズナミナーチリ","分母","分数の下の数。授業では Найдите общий знаменатель.(分母をそろえよう=通分)"],
 ["десятичная дробь","ヂシチーチナヤ ドローピ","小数","0.5 のような数。授業では Запишите одну четвёртую в виде десятичной дроби.(1/4を小数で書こう)"],
 ["квадратный корень","クヴァドラートヌィ コーリニ","平方根","2乗するとその数になる数。授業では Квадратный корень из девяти равен трём.(9の平方根は3)"],
 ["переменная","ピリミェーンナヤ","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Здесь x — переменная.(ここでは x が変数)"],
 ["угол","ウーガル","角","2本の線が作る開き。授業では Измерьте угол транспортиром.(分度器で角をはかろう)"]]);
SUL('ru','sd-ru-ma2','数学 2','MATH 2',[
 ["параллельный","パラリェーリヌィ","平行な","どこまでのばしても交わらないこと。授業では Эти две прямые параллельны.(この2本の線は平行)"],
 ["площадь","プローシャチ","面積","広さ。授業では Найдите площадь прямоугольника.(長方形の面積を求めよう)"],
 ["радиус","ラーヂウス","半径","円の中心から円周までの長さ。授業では Радиус равен половине диаметра.(半径は直径の半分)"],
 ["объём","アビヨーム","体積","立体の大きさ。授業では Найдите объём куба.(立方体の体積を求めよう)"],
 ["функция","フーンクツィヤ","関数","xが決まるとyがただ1つ決まる関係。授業では y — функция от x.(yはxの関数)"],
 ["координаты","カアルヂナーティ","座標","点の位置を表す数の組。授業では Запишите координаты точки P.(点Pの座標を書こう)"],
 ["вероятность","ヴィラヤートナスチ","確率","あることが起こる割合。授業では Какова вероятность, что выпадет орёл?(表が出る確率は?)"],
 ["среднее значение","スリェードニエ ズナチェーニエ","平均値","全部たして個数でわった値。授業では Вычислите среднее значение данных.(データの平均値を計算しよう)"]]);
SUL('ru','sd-ru-sc1','理科 1','SCIENCE 1',[
 ["сила","スィーラ","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Нарисуйте стрелку, чтобы показать силу.(力を矢印で表そう)"],
 ["трение","トリェーニエ","摩擦","ふれ合う面で動きをじゃまする力。授業では Трение замедляет коробку.(摩擦で箱がおそくなる)"],
 ["скорость","スコーラスチ","速さ","距離÷時間。授業では Вычислите среднюю скорость.(平均の速さを計算しよう)"],
 ["электрический ток","エリクトリーチスキー トーク","電流","電気の流れ。単位は A(アンペア)。授業では Измерьте силу тока амперметром.(電流計で電流をはかろう)"],
 ["напряжение","ナプリジェーニエ","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Подключите вольтметр параллельно.(電圧計は並列につなごう)"],
 ["магнитное поле","マグニートナエ ポーリェ","磁界","磁石の力がはたらく空間。授業では С помощью железных опилок можно увидеть магнитное поле.(鉄粉で磁界のようすを見よう)"],
 ["химический элемент","ヒミーチスキー エリミェーント","元素","物質をつくるもとになる成分。授業では Найдите этот элемент в таблице Менделеева.(周期表でその元素を探そう)"],
 ["атом","アータム","原子","物質をつくる、とても小さなつぶ。授業では Атомы слишком малы, чтобы их увидеть.(原子は小さすぎて見えない)"]]);
SUL('ru','sd-ru-sc2','理科 2','SCIENCE 2',[
 ["кислота","キスラター","酸","水溶液が酸性を示す物質。授業では Лимонный сок — это кислота.(レモン汁は酸)"],
 ["дыхание","ディハーニエ","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では При дыхании выделяется энергия.(呼吸でエネルギーが取り出される)"],
 ["пищеварение","ピシヴァリェーニエ","消化","食べ物を体に吸収できる形に分解すること。授業では Пищеварение начинается во рту.(消化は口から始まる)"],
 ["ген","ギェーン","遺伝子","親から子に伝わる特徴のもと。授業では Гены передаются от родителей детям.(遺伝子は親から子に伝わる)"],
 ["пищевая цепь","ピシヴァーヤ ツェーピ","食物連鎖","「食べる・食べられる」のつながり。授業では Нарисуйте пищевую цепь для леса.(森の食物連鎖をかこう)"],
 ["вулкан","ヴルカーン","火山","マグマがふき出してできた山。授業では Этот вулкан всё ещё действует.(この火山は今も活動している)"],
 ["окаменелость","アカミニェーラスチ","化石","大昔の生物の死がいや跡が残ったもの。授業では Окаменелости рассказывают нам о древней жизни.(化石から大昔の生物がわかる)"],
 ["Солнечная система","ソールニチナヤ スィスチェーマ","太陽系","太陽とそのまわりを回る天体の集まり。授業では В Солнечной системе восемь планет.(太陽系には8つの惑星がある)"]]);
SUL('ru','sd-ru-so1','社会 1','SOCIAL STUDIES 1',[
 ["широта","シラター","緯度","赤道から北や南へどれだけ離れているか。授業では Токио находится примерно на 36 градусах северной широты.(東京は北緯約36度にある)"],
 ["полуостров","パルオーストラフ","半島","三方を海に囲まれた陸地。授業では Италия — длинный полуостров в форме сапога.(イタリアはブーツの形をした長い半島だ)"],
 ["плотность населения","プロートナスチ ナシリェーニヤ","人口密度","一定の面積に何人住んでいるか。授業では В Токио очень высокая плотность населения.(東京は人口密度がとても高い)"],
 ["экспортировать","エクスパルチーラヴァチ","輸出(する)","国内のものを外国に売ること。授業では Япония экспортирует много автомобилей.(日本はたくさんの車を輸出している)"],
 ["импортировать","インパルチーラヴァチ","輸入(する)","外国のものを国内に買い入れること。授業では Большую часть пшеницы Япония импортирует.(日本の小麦のほとんどは輸入されている)"],
 ["сельское хозяйство","スェーリスカエ ハズャーイストヴァ","農業","作物を育てたり家畜を飼ったりする仕事。授業では Сельское хозяйство важно для этого региона.(この地域では農業が大切だ)"],
 ["цивилизация","ツィヴィリザーツィヤ","文明","都市・文字・国のしくみが発達した社会。授業では Четыре великие цивилизации возникли у больших рек.(四大文明は大きな川のほとりで始まった)"],
 ["империя","インピェーリヤ","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では Римская империя существовала сотни лет.(ローマ帝国は何百年も続いた)"]]);
SUL('ru','sd-ru-so2','社会 2','SOCIAL STUDIES 2',[
 ["колония","カローニヤ","植民地","ほかの国に支配された土地。授業では Индия когда-то была британской колонией.(インドはかつてイギリスの植民地だった)"],
 ["независимость","ニザヴィースィマスチ","独立","ほかの国の支配から離れて自分の国になること。授業では США провозгласили независимость в 1776 году.(アメリカは1776年に独立を宣言した)"],
 ["договор","ダガヴォール","条約","国と国が文書で結ぶ約束。授業では Две страны подписали мирный договор.(2つの国は平和条約に署名した)"],
 ["демократия","ヂマクラーチヤ","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では При демократии народ выбирает своих лидеров.(民主主義では、国民がリーダーを選ぶ)"],
 ["премьер-министр","プリミエール ミニーストル","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では Премьер-министр руководит кабинетом.(首相は内閣を率いる)"],
 ["права человека","プラヴァー チラヴェーカ","人権","人が生まれながらにもつ権利。授業では Права каждого человека должны уважаться.(すべての人の人権が尊重されなければならない)"],
 ["налог","ナローク","税金","国や自治体の仕事のために国民が納めるお金。授業では На налоги строят дороги и школы.(税金で道路や学校がまかなわれている)"],
 ["торговля","タルゴーヴリャ","貿易","国と国の間でものを売り買いすること。授業では Торговля между Японией и Китаем очень активна.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('ru','sd-ru-la1','国語 1','LANGUAGE ARTS 1',[
 ["местоимение","ミスタイミェーニエ","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では Замените существительное местоимением.(名詞を代名詞に置き換えよう)"],
 ["союз","サユース","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では Соедините два предложения союзом.(接続詞で2つの文をつなごう)"],
 ["знаки препинания","ズナーキ プリピナーニヤ","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では Не забывайте о знаках препинания в конце предложения.(それぞれの文の終わりの句読点を忘れないで)"],
 ["синоним","スィノーニム","類義語(同じ意味の語)","意味が同じか近い語。授業では Подберите синоним к этому слову.(この単語の類義語を見つけよう)"],
 ["основная мысль","アスナヴナーヤ ムィースリ","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では Какова основная мысль этого абзаца?(この段落の要旨は何かな?)"],
 ["кратко изложить","クラートカ イズラジーチ","要約する","大事なところだけを短くまとめる。授業では Кратко изложите главу в трёх предложениях.(その章を3文で要約しよう)"],
 ["сюжет","スュジェート","あらすじ(筋)","物語のできごとの流れ。授業では Сюжет этого романа полон неожиданностей.(この小説の筋は驚きでいっぱいだ)"],
 ["персонаж","ピルサナーシ","登場人物","物語に出てくる人や動物。授業では Кто главный персонаж этой истории?(物語の主人公はだれかな?)"]]);
SUL('ru','sd-ru-la2','国語 2','LANGUAGE ARTS 2',[
 ["тема","チェーマ","テーマ(主題)","物語を通して伝わる大切な考え。授業では Тема этого рассказа — дружба.(物語のテーマは友情だ)"],
 ["рассказчик","ラスカーシク","語り手","物語を語っている人。授業では Рассказчик ведёт повествование от первого лица.(語り手は一人称で物語を語っている)"],
 ["метафора","ミターファラ","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では «Жизнь — это путешествие» — это метафора.(「人生は旅だ」は隠喩だ)"],
 ["заключение","ザクリュチェーニエ","結論","エッセイの最後でまとめる部分。授業では Повторите главную мысль в заключении.(結論でもう一度主な主張を述べよう)"],
 ["черновик","チルナヴィーク","下書き","まず全体を書いてみたもの。授業では Закончите черновик к пятнице.(金曜日までに下書きを終わらせよう)"],
 ["проверить текст","プラヴェーリチ チェークスト","校正する","つづりや句読点のまちがいを確かめる。授業では Внимательно проверьте текст на орфографические ошибки.(つづりのまちがいがないか注意して校正しよう)"],
 ["доклад","ダクラート","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では Каждая группа сделает пятиминутный доклад.(各グループが5分の発表をする)"],
 ["дебаты","ヂバーティ","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では Тема сегодняшних дебатов — школьная форма.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-ru-a']={L:'ru',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-ru-ma1", "sd-ru-ma2", "sd-ru-sc1", "sd-ru-sc2", "sd-ru-so1", "sd-ru-so2", "sd-ru-la1", "sd-ru-la2"],key:'sd-ru-a'};
SUL('ru','sd-ru-it1','情報 1','COMPUTING 1',[
 ["аппаратное обеспечение","アパラートナエ アビスピェーチニエ","ハードウェア","コンピューターの機械の部分。授業では Клавиатура и экран — это аппаратное обеспечение.(キーボードと画面はハードウェアだ)"],
 ["программное обеспечение","プラグラームナエ アビスピェーチニエ","ソフトウェア","コンピューターを動かすプログラム。授業では Установите программное обеспечение до урока.(授業の前にソフトウェアをインストールしておこう)"],
 ["операционная система","アピラツィオーンナヤ スィスチェーマ","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows и macOS — операционные системы.(Windows と macOS はOSだ)"],
 ["двоичная система","ドヴァイーチナヤ スィスチェーマ","2進法","0と1だけで数を表す方法。授業では Компьютеры хранят всё в двоичной системе.(コンピューターはすべてを2進法で記録する)"],
 ["пиксель","ピークスィリ","画素(ピクセル)","画像をつくる小さな点。授業では Если увеличить, видно каждый пиксель.(拡大すると一つ一つの画素が見える)"],
 ["алгоритм","アルガリートム","アルゴリズム","問題を解くための手順。授業では Напишите алгоритм приготовления бутерброда.(サンドイッチを作るアルゴリズムを書こう)"],
 ["блок-схема","ブローク スヘーマ","フローチャート","手順を図形と矢印で表した図。授業では Нарисуйте блок-схему, прежде чем писать код.(コードを書く前にフローチャートを描こう)"],
 ["цикл","ツィークル","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では Используйте цикл, чтобы нарисовать десять звёзд.(繰り返しを使って星を10個描こう)"]]);
SUL('ru','sd-ru-it2','情報 2','COMPUTING 2',[
 ["отладка","アトラートカ","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では Давайте вместе займёмся отладкой этого кода.(このコードを一緒にデバッグしよう)"],
 ["сеть","スィェーチ","ネットワーク","コンピューターどうしをつないだもの。授業では Все компьютеры в этом классе подключены к одной сети.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["поисковая система","パイスカヴァーヤ スィスチェーマ","検索エンジン","キーワードでウェブの情報を探すサービス。授業では Используйте хорошие ключевые слова в поисковой системе.(検索エンジンではよいキーワードを使おう)"],
 ["фишинг","フィーシング","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では Никогда не переходите по ссылкам из фишинговых писем.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["шифрование","シフラヴァーニエ","暗号化","データを決まった人しか読めない形に変えること。授業では Шифрование защищает ваши сообщения.(暗号化によってメッセージの秘密が守られる)"],
 ["личные данные","リーチヌィエ ダーンヌィエ","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では Не публикуйте личные данные в интернете.(ネットで個人情報を公開しないで)"],
 ["авторское право","アーフタルスカエ プラーヴァ","著作権","作品を作った人がもつ権利。授業では Эта песня защищена авторским правом.(この曲は著作権で守られている)"],
 ["искусственный интеллект","イスクーストヴィンヌィ インチリェークト","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では Искусственный интеллект умеет переводить с одного языка на другой.(人工知能は言葉を翻訳できる)"]]);
SUL('ru','sd-ru-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["мышца","ムィーシツァ","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では Перед бегом растяните мышцы ног.(走る前に脚の筋肉を伸ばそう)"],
 ["кость","コースチ","骨","体を支え、内臓を守るかたいもの。授業では Кальций делает кости крепкими.(カルシウムは骨を強くする)"],
 ["сустав","スースタフ","関節","骨と骨のつなぎ目。授業では Колено — это сустав.(ひざは関節だ)"],
 ["пульс","プーリス","心拍数","1分間に心臓が打つ回数。授業では После бега измерьте пульс.(走ったあとに心拍数を測ろう)"],
 ["переходный возраст","ピリホードヌィ ヴォーズラスト","思春期","子どもから大人の体に変わっていく時期。授業では В переходном возрасте тело сильно меняется.(思春期には体が大きく変わる)"],
 ["питательное вещество","ピターチリナエ ヴィシストヴォー","栄養素","体に必要な、食べ物にふくまれる成分。授業では В овощах много питательных веществ.(野菜には栄養素がたくさんふくまれている)"],
 ["белок","ビローク","たんぱく質","筋肉や血をつくる栄養素。授業では Ешьте белок, чтобы наращивать мышцы.(筋肉をつけるにはたんぱく質をとろう)"],
 ["сбалансированное питание","ズバランスィーラヴァンナエ ピターニエ","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では Сбалансированное питание включает фрукты, овощи и крупы.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('ru','sd-ru-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["питьевой режим","ピチヴォーイ リジーム","水分補給","体に必要な水分をとること。授業では В жаркие дни важно соблюдать питьевой режим.(暑い日は水分補給が大切だ)"],
 ["психическое здоровье","プスィヒーチスカエ ズダローヴィエ","心の健康","気持ちや心の状態の健康。授業では Разговор с другом может помочь психическому здоровью.(友だちに話すことは心の健康の助けになる)"],
 ["первая помощь","ピェールヴァヤ ポーマシ","応急手当","けがや急な病気のときにその場でする手当て。授業では Каждый должен знать основы первой помощи.(だれもが基本の応急手当を学ぶべきだ)"],
 ["растяжение","ラスチジェーニエ","ねんざ","関節をひねって痛めること。授業では У него растяжение связок голеностопа.(彼は足首をねんざしている)"],
 ["тепловой удар","チプラヴォーイ ウダール","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では Отдыхайте в тени, чтобы избежать теплового удара.(熱中症を防ぐために日かげで休もう)"],
 ["судья","スヂヤー","審判","試合のルールを守らせる人。授業では Слушайте свисток судьи.(審判の笛をよく聞こう)"],
 ["нарушение правил","ナルシェーニエ プラーヴィル","反則(ファウル)","ルールに違反すること。授業では Толкать соперника — нарушение правил.(押すのは反則だ)"],
 ["эстафета","エスタフェータ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では Аккуратно передавайте палочку в эстафете.(リレーではバトンをなめらかに渡そう)"]]);
SUL('ru','sd-ru-mu1','音楽 1','MUSIC 1',[
 ["нотный стан","ノートヌィ スターン","五線(譜)","音符を書く5本の線。授業では Запишите ноты на нотном стане.(五線に音符を書こう)"],
 ["четвертная нота","チトヴィルトナーヤ ノータ","四分音符","1拍分の長さの音符。授業では Четвертная нота длится одну долю.(四分音符は1拍だ)"],
 ["размер","ラズミェール","拍子記号","1小節に何拍あるかを表す記号。授業では Эта песня в размере три четверти.(この曲は4分の3拍子だ)"],
 ["доля","ドーリャ","拍","音楽の一定の刻み。授業では Хлопайте на каждую долю.(毎拍、手をたたこう)"],
 ["темп","チェーンプ","テンポ(速さ)","曲の速さ。授業では В начале темп медленный.(最初はテンポがゆっくりだ)"],
 ["гамма","ガーンマ","音階","ドレミファソラシドのように順に並んだ音。授業では Сыграйте гамму до мажор.(ハ長調の音階を弾こう)"],
 ["мажор","マジョール","長調","明るい感じの調。授業では Эта песня в мажоре, поэтому звучит весело.(この曲は長調なので明るく聞こえる)"],
 ["минор","ミノール","短調","暗い・悲しい感じの調。授業では Минор часто звучит грустно.(短調はよく悲しく聞こえる)"]]);
SUL('ru','sd-ru-mu2','音楽 2','MUSIC 2',[
 ["аккорд","アコールト","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では Сыграйте аккорд до мажор тремя пальцами.(3本の指で C のコードを弾こう)"],
 ["струнный инструмент","ストルーンヌィ インストルミェーント","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では Скрипка — струнный инструмент.(バイオリンは弦楽器だ)"],
 ["ударный инструмент","ウダールヌィ インストルミェーント","打楽器","たたいたりふったりして音を出す楽器。授業では Барабаны — ударные инструменты.(ドラムは打楽器だ)"],
 ["дирижёр","ヂリジョール","指揮者","合奏や合唱をまとめる人。授業では Следите за дирижёром, чтобы держать темп.(テンポは指揮者を見てとろう)"],
 ["крещендо","クリシェーンダ","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では Сделайте крещендо к концу.(終わりに向かってだんだん強くしよう)"],
 ["композитор","カンパズィータル","作曲家","曲を作る人。授業では Бетховен был немецким композитором.(ベートーヴェンはドイツの作曲家だった)"],
 ["симфония","スィムフォーニヤ","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では В симфонии обычно четыре части.(交響曲はふつう4つの楽章からなる)"],
 ["слова песни","スラヴァー ピェースニ","歌詞","歌のことば。授業では Вы знаете слова песни наизусть?(歌詞を覚えているかな?)"]]);
SUL('ru','sd-ru-ar1','美術 1','ART 1',[
 ["набросок","ナブローサク","スケッチ(する)","大まかにさっと描くこと。授業では Начните с быстрого наброска карандашом.(まず鉛筆でさっとスケッチしよう)"],
 ["штриховка","シトリホーフカ","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では Штриховка помогает показать, что яблоко круглое.(陰影をつけるとリンゴが丸く見える)"],
 ["перспектива","ピルスピェクチーヴァ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では Используйте перспективу, чтобы дорога казалась длинной.(遠近法を使って道が長く見えるようにしよう)"],
 ["натюрморт","ナチュルモールト","静物画","果物や花びんなど、動かないものを描いた絵。授業では Сегодня мы рисуем натюрморт с фруктами.(今日は果物の静物画を描く)"],
 ["портрет","パルトリェート","肖像画","人の顔や姿を描いた絵。授業では Нарисуйте портрет соседа по парте.(隣の人の肖像画を描こう)"],
 ["основные цвета","アスナヴヌィエ ツヴィター","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では Красный, синий и жёлтый — основные цвета.(赤・青・黄が三原色だ)"],
 ["дополнительные цвета","ダパルニーチリヌィエ ツヴィター","補色","色相環で向かい合う、たがいを引き立てる色。授業では Оранжевый и синий — дополнительные цвета.(オレンジと青は補色だ)"],
 ["композиция","カンパズィーツィヤ","構図","画面の中での配置。授業では Продумайте композицию, прежде чем рисовать.(描く前に構図を考えよう)"]]);
SUL('ru','sd-ru-ar2','美術 2','ART 2',[
 ["фон","フォーン","背景","絵の奥の部分。授業では Сначала закрасьте фон.(背景を先に塗ろう)"],
 ["акварель","アクヴァリェーリ","水彩絵の具","水でといて使う、すき通る絵の具。授業では Акварель быстро сохнет, поэтому работайте быстро.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["палитра","パリートラ","パレット","絵の具をまぜる板。授業では Смешивайте краски на палитре, а не на бумаге.(色は紙の上ではなくパレットでまぜよう)"],
 ["глина","グリーナ","粘土","形を自由に作れるやわらかい土。授業では Слепите из глины маленькую миску.(粘土で小さなお皿の形を作ろう)"],
 ["скульптура","スクリプトゥーラ","彫刻","立体的に作った作品。授業では Эта скульптура сделана из камня.(この彫刻は石でできている)"],
 ["гравюра","グラヴューラ","版画","版を作ってインクで紙に写す方法。授業では С помощью гравюры можно сделать много копий одной картинки.(版画では1つの絵からたくさん刷ることができる)"],
 ["шедевр","シェヂェーヴル","傑作(名作)","とてもすぐれた作品。授業では «Мона Лиза» — знаменитый шедевр.(モナ・リザは有名な傑作だ)"],
 ["выставка","ヴィースタフカ","展覧会","作品を並べて見せる催し。授業では Наши работы будут на школьной выставке.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-ru-b']={L:'ru',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-ru-it1", "sd-ru-it2", "sd-ru-pe1", "sd-ru-pe2", "sd-ru-mu1", "sd-ru-mu2", "sd-ru-ar1", "sd-ru-ar2"],key:'sd-ru-b'};
SDL_MORE.ru=[{bank:'sd-ru-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-ru-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('tr','sd-tr-ma1','数学 1','MATH 1',[
 ["pozitif sayı","ポズィティフ サユ","正の数","0より大きい数。授業では Pozitif sayılar sıfırdan büyüktür.(正の数は0より大きい)"],
 ["negatif sayı","ネガティフ サユ","負の数","0より小さい数。授業では Eksi beş negatif bir sayıdır.(-5は負の数です)"],
 ["tam sayı","タム サユ","整数","…,-1, 0, 1, 2,… のような数。授業では Sıfır virgül beş bir tam sayı mı?(0.5は整数かな?)"],
 ["payda","パイダ","分母","分数の下の数。授業では Ortak paydayı bulun.(分母をそろえよう=通分)"],
 ["ondalık sayı","オンダルク サユ","小数","0.5 のような数。授業では Dörtte biri ondalık sayı olarak yazın.(1/4を小数で書こう)"],
 ["karekök","カレキョク","平方根","2乗するとその数になる数。授業では Dokuzun karekökü üçtür.(9の平方根は3)"],
 ["değişken","デイシケン","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Burada x bir değişkendir.(ここでは x が変数)"],
 ["açı","アチュ","角","2本の線が作る開き。授業では Açıyı iletkiyle ölçün.(分度器で角をはかろう)"]]);
SUL('tr','sd-tr-ma2','数学 2','MATH 2',[
 ["paralel","パラレル","平行な","どこまでのばしても交わらないこと。授業では Bu iki doğru paraleldir.(この2本の線は平行)"],
 ["alan","アラン","面積","広さ。授業では Dikdörtgenin alanını bulun.(長方形の面積を求めよう)"],
 ["yarıçap","ヤルチャプ","半径","円の中心から円周までの長さ。授業では Yarıçap, çapın yarısıdır.(半径は直径の半分)"],
 ["hacim","ハジム","体積","立体の大きさ。授業では Küpün hacmini bulun.(立方体の体積を求めよう)"],
 ["fonksiyon","フォンクスィヨン","関数","xが決まるとyがただ1つ決まる関係。授業では y, x'in bir fonksiyonudur.(yはxの関数)"],
 ["koordinatlar","コオルディナトラル","座標","点の位置を表す数の組。授業では P noktasının koordinatlarını yazın.(点Pの座標を書こう)"],
 ["olasılık","オラスルク","確率","あることが起こる割合。授業では Tura gelme olasılığı nedir?(表が出る確率は?)"],
 ["ortalama","オルタラマ","平均値","全部たして個数でわった値。授業では Verilerin ortalamasını hesaplayın.(データの平均値を計算しよう)"]]);
SUL('tr','sd-tr-sc1','理科 1','SCIENCE 1',[
 ["kuvvet","クッヴェト","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Kuvveti göstermek için bir ok çizin.(力を矢印で表そう)"],
 ["sürtünme","スュルテュンメ","摩擦","ふれ合う面で動きをじゃまする力。授業では Sürtünme kutuyu yavaşlatır.(摩擦で箱がおそくなる)"],
 ["hız","フズ","速さ","距離÷時間。授業では Ortalama hızı hesaplayın.(平均の速さを計算しよう)"],
 ["elektrik akımı","エレクトリク アクム","電流","電気の流れ。単位は A(アンペア)。授業では Akımı ampermetreyle ölçün.(電流計で電流をはかろう)"],
 ["gerilim","ゲリリム","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Voltmetreyi paralel bağlayın.(電圧計は並列につなごう)"],
 ["manyetik alan","マニェティク アラン","磁界","磁石の力がはたらく空間。授業では Manyetik alanı görmek için demir tozu kullanın.(鉄粉で磁界のようすを見よう)"],
 ["element","エレメント","元素","物質をつくるもとになる成分。授業では Elementi periyodik tabloda bulun.(周期表でその元素を探そう)"],
 ["atom","アトム","原子","物質をつくる、とても小さなつぶ。授業では Atomlar görülemeyecek kadar küçüktür.(原子は小さすぎて見えない)"]]);
SUL('tr','sd-tr-sc2','理科 2','SCIENCE 2',[
 ["asit","アスィト","酸","水溶液が酸性を示す物質。授業では Limon suyu bir asittir.(レモン汁は酸)"],
 ["solunum","ソルヌム","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では Solunum enerji açığa çıkarır.(呼吸でエネルギーが取り出される)"],
 ["sindirim","スィンディリム","消化","食べ物を体に吸収できる形に分解すること。授業では Sindirim ağızda başlar.(消化は口から始まる)"],
 ["gen","ゲン","遺伝子","親から子に伝わる特徴のもと。授業では Genler anne babadan çocuklara geçer.(遺伝子は親から子に伝わる)"],
 ["besin zinciri","ベスィン ズィンジリ","食物連鎖","「食べる・食べられる」のつながり。授業では Ormandaki besin zincirini çizin.(森の食物連鎖をかこう)"],
 ["yanardağ","ヤナルダー","火山","マグマがふき出してできた山。授業では Bu yanardağ hâlâ aktif.(この火山は今も活動している)"],
 ["fosil","フォスィル","化石","大昔の生物の死がいや跡が残ったもの。授業では Fosiller bize eski çağlardaki yaşamı anlatır.(化石から大昔の生物がわかる)"],
 ["Güneş sistemi","ギュネシ スィステミ","太陽系","太陽とそのまわりを回る天体の集まり。授業では Güneş sisteminde sekiz gezegen vardır.(太陽系には8つの惑星がある)"]]);
SUL('tr','sd-tr-so1','社会 1','SOCIAL STUDIES 1',[
 ["enlem","エンレム","緯度","赤道から北や南へどれだけ離れているか。授業では Tokyo yaklaşık 36 derece kuzey enlemindedir.(東京は北緯約36度にある)"],
 ["yarımada","ヤルマダ","半島","三方を海に囲まれた陸地。授業では İtalya, çizme şeklinde uzun bir yarımadadır.(イタリアはブーツの形をした長い半島だ)"],
 ["nüfus yoğunluğu","ニュフス ヨウンルウ","人口密度","一定の面積に何人住んでいるか。授業では Tokyo'nun nüfus yoğunluğu çok yüksektir.(東京は人口密度がとても高い)"],
 ["ihraç etmek","イフラーチ エトメク","輸出(する)","国内のものを外国に売ること。授業では Japonya çok sayıda araba ihraç eder.(日本はたくさんの車を輸出している)"],
 ["ithal etmek","イトハール エトメク","輸入(する)","外国のものを国内に買い入れること。授業では Japonya'daki buğdayın çoğu ithal edilir.(日本の小麦のほとんどは輸入されている)"],
 ["tarım","タルム","農業","作物を育てたり家畜を飼ったりする仕事。授業では Bu bölgede tarım önemlidir.(この地域では農業が大切だ)"],
 ["medeniyet","メデニイェト","文明","都市・文字・国のしくみが発達した社会。授業では Dört büyük medeniyet büyük nehirlerin kıyısında doğdu.(四大文明は大きな川のほとりで始まった)"],
 ["imparatorluk","インパラトルルク","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では Roma İmparatorluğu yüzlerce yıl sürdü.(ローマ帝国は何百年も続いた)"]]);
SUL('tr','sd-tr-so2','社会 2','SOCIAL STUDIES 2',[
 ["sömürge","ソミュルゲ","植民地","ほかの国に支配された土地。授業では Hindistan bir zamanlar İngiliz sömürgesiydi.(インドはかつてイギリスの植民地だった)"],
 ["bağımsızlık","バームスズルク","独立","ほかの国の支配から離れて自分の国になること。授業では ABD 1776'da bağımsızlığını ilan etti.(アメリカは1776年に独立を宣言した)"],
 ["antlaşma","アントラシュマ","条約","国と国が文書で結ぶ約束。授業では İki ülke bir barış antlaşması imzaladı.(2つの国は平和条約に署名した)"],
 ["demokrasi","デモクラスィ","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では Demokraside halk liderlerini seçer.(民主主義では、国民がリーダーを選ぶ)"],
 ["başbakan","バシバカン","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では Başbakan kabineyi yönetir.(首相は内閣を率いる)"],
 ["insan hakları","インサン ハックラル","人権","人が生まれながらにもつ権利。授業では Herkesin insan haklarına saygı gösterilmelidir.(すべての人の人権が尊重されなければならない)"],
 ["vergi","ヴェルギ","税金","国や自治体の仕事のために国民が納めるお金。授業では Yollar ve okullar vergilerle yapılır.(税金で道路や学校がまかなわれている)"],
 ["ticaret","ティジャーレト","貿易","国と国の間でものを売り買いすること。授業では Japonya ile Çin arasındaki ticaret çok canlıdır.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('tr','sd-tr-la1','国語 1','LANGUAGE ARTS 1',[
 ["zamir","ザミル","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では İsmi bir zamirle değiştirin.(名詞を代名詞に置き換えよう)"],
 ["bağlaç","バーラチ","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では İki cümleyi bir bağlaçla birleştirin.(接続詞で2つの文をつなごう)"],
 ["noktalama işaretleri","ノクタラマ イシャレトレリ","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では Her cümlenin sonundaki noktalama işaretlerini unutmayın.(それぞれの文の終わりの句読点を忘れないで)"],
 ["eş anlamlı kelime","エシ アンラムル ケリメ","類義語(同じ意味の語)","意味が同じか近い語。授業では Bu kelimenin eş anlamlısını bulun.(この単語の類義語を見つけよう)"],
 ["ana fikir","アナ フィキル","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では Bu paragrafın ana fikri nedir?(この段落の要旨は何かな?)"],
 ["özetlemek","オゼトレメク","要約する","大事なところだけを短くまとめる。授業では Bölümü üç cümleyle özetleyin.(その章を3文で要約しよう)"],
 ["olay örgüsü","オライ オルギュスュ","あらすじ(筋)","物語のできごとの流れ。授業では Bu romanın olay örgüsü sürprizlerle dolu.(この小説の筋は驚きでいっぱいだ)"],
 ["karakter","カラクテル","登場人物","物語に出てくる人や動物。授業では Hikâyenin ana karakteri kim?(物語の主人公はだれかな?)"]]);
SUL('tr','sd-tr-la2','国語 2','LANGUAGE ARTS 2',[
 ["tema","テマ","テーマ(主題)","物語を通して伝わる大切な考え。授業では Hikâyenin teması dostluktur.(物語のテーマは友情だ)"],
 ["anlatıcı","アンラトゥジュ","語り手","物語を語っている人。授業では Anlatıcı hikâyeyi birinci kişi ağzından anlatıyor.(語り手は一人称で物語を語っている)"],
 ["metafor","メタフォル","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では “Hayat bir yolculuktur” bir metafordur.(「人生は旅だ」は隠喩だ)"],
 ["sonuç","ソヌチ","結論","エッセイの最後でまとめる部分。授業では Sonuç bölümünde ana fikrinizi tekrar edin.(結論でもう一度主な主張を述べよう)"],
 ["taslak","タスラク","下書き","まず全体を書いてみたもの。授業では Taslağınızı cumaya kadar bitirin.(金曜日までに下書きを終わらせよう)"],
 ["gözden geçirmek","ギョズデン ゲチルメク","校正する","つづりや句読点のまちがいを確かめる。授業では Yazım hatalarına karşı dikkatlice gözden geçirin.(つづりのまちがいがないか注意して校正しよう)"],
 ["sunum","スヌム","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では Her grup beş dakikalık bir sunum yapacak.(各グループが5分の発表をする)"],
 ["münazara","ミュナーザラ","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では Bugünkü münazaranın konusu okul üniforması.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-tr-a']={L:'tr',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-tr-ma1", "sd-tr-ma2", "sd-tr-sc1", "sd-tr-sc2", "sd-tr-so1", "sd-tr-so2", "sd-tr-la1", "sd-tr-la2"],key:'sd-tr-a'};
SUL('tr','sd-tr-it1','情報 1','COMPUTING 1',[
 ["donanım","ドナヌム","ハードウェア","コンピューターの機械の部分。授業では Klavye ve ekran donanımdır.(キーボードと画面はハードウェアだ)"],
 ["yazılım","ヤズルム","ソフトウェア","コンピューターを動かすプログラム。授業では Dersten önce yazılımı yükleyin.(授業の前にソフトウェアをインストールしておこう)"],
 ["işletim sistemi","イシレティム スィステミ","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows ve macOS işletim sistemleridir.(Windows と macOS はOSだ)"],
 ["ikili sistem","イキリ スィステム","2進法","0と1だけで数を表す方法。授業では Bilgisayarlar her şeyi ikili sistemde saklar.(コンピューターはすべてを2進法で記録する)"],
 ["piksel","ピクセル","画素(ピクセル)","画像をつくる小さな点。授業では Yakınlaştırınca her pikseli görebilirsiniz.(拡大すると一つ一つの画素が見える)"],
 ["algoritma","アルゴリトマ","アルゴリズム","問題を解くための手順。授業では Sandviç yapmak için bir algoritma yazın.(サンドイッチを作るアルゴリズムを書こう)"],
 ["akış şeması","アクシュ シェマス","フローチャート","手順を図形と矢印で表した図。授業では Kod yazmadan önce bir akış şeması çizin.(コードを書く前にフローチャートを描こう)"],
 ["döngü","ドゥンギュ","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では On yıldız çizmek için bir döngü kullanın.(繰り返しを使って星を10個描こう)"]]);
SUL('tr','sd-tr-it2','情報 2','COMPUTING 2',[
 ["hata ayıklamak","ハタ アユクラマク","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では Bu kodda birlikte hata ayıklayalım.(このコードを一緒にデバッグしよう)"],
 ["ağ","アー","ネットワーク","コンピューターどうしをつないだもの。授業では Bu sınıftaki bütün bilgisayarlar aynı ağa bağlı.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["arama motoru","アラマ モトル","検索エンジン","キーワードでウェブの情報を探すサービス。授業では Arama motorunda iyi anahtar kelimeler kullanın.(検索エンジンではよいキーワードを使おう)"],
 ["oltalama","オルタラマ","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では Oltalama e-postalarındaki bağlantılara asla tıklamayın.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["şifreleme","シフレレメ","暗号化","データを決まった人しか読めない形に変えること。授業では Şifreleme mesajlarınızı gizli tutar.(暗号化によってメッセージの秘密が守られる)"],
 ["kişisel bilgiler","キシセル ビルギレル","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では İnternette kişisel bilgilerinizi paylaşmayın.(ネットで個人情報を公開しないで)"],
 ["telif hakkı","テリフ ハック","著作権","作品を作った人がもつ権利。授業では Bu şarkı telif hakkıyla korunuyor.(この曲は著作権で守られている)"],
 ["yapay zekâ","ヤパイ ゼキャー","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では Yapay zekâ dilleri çevirebilir.(人工知能は言葉を翻訳できる)"]]);
SUL('tr','sd-tr-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["kas","カス","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では Koşmadan önce bacak kaslarınızı esnetin.(走る前に脚の筋肉を伸ばそう)"],
 ["kemik","ケミク","骨","体を支え、内臓を守るかたいもの。授業では Kalsiyum kemikleri güçlendirir.(カルシウムは骨を強くする)"],
 ["eklem","エクレム","関節","骨と骨のつなぎ目。授業では Diz bir eklemdir.(ひざは関節だ)"],
 ["nabız","ナブズ","心拍数","1分間に心臓が打つ回数。授業では Koştuktan sonra nabzınızı ölçün.(走ったあとに心拍数を測ろう)"],
 ["ergenlik","エルゲンリク","思春期","子どもから大人の体に変わっていく時期。授業では Ergenlikte vücudunuz çok değişir.(思春期には体が大きく変わる)"],
 ["besin öğesi","ベスィン オエスィ","栄養素","体に必要な、食べ物にふくまれる成分。授業では Sebzeler besin öğeleriyle doludur.(野菜には栄養素がたくさんふくまれている)"],
 ["protein","プロテイン","たんぱく質","筋肉や血をつくる栄養素。授業では Kas yapmak için protein yiyin.(筋肉をつけるにはたんぱく質をとろう)"],
 ["dengeli beslenme","デンゲリ ベスレンメ","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では Dengeli beslenmede meyve, sebze ve tahıl bulunur.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('tr','sd-tr-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["sıvı alımı","スヴ アルム","水分補給","体に必要な水分をとること。授業では Sıcak günlerde sıvı alımı önemlidir.(暑い日は水分補給が大切だ)"],
 ["ruh sağlığı","ルフ サールウ","心の健康","気持ちや心の状態の健康。授業では Bir arkadaşla konuşmak ruh sağlığına iyi gelir.(友だちに話すことは心の健康の助けになる)"],
 ["ilk yardım","イルク ヤルドゥム","応急手当","けがや急な病気のときにその場でする手当て。授業では Herkes temel ilk yardımı öğrenmeli.(だれもが基本の応急手当を学ぶべきだ)"],
 ["burkulma","ブルクルマ","ねんざ","関節をひねって痛めること。授業では Ayak bileğinde burkulma var.(彼は足首をねんざしている)"],
 ["sıcak çarpması","スジャク チャルプマス","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では Sıcak çarpmasından korunmak için gölgede dinlenin.(熱中症を防ぐために日かげで休もう)"],
 ["hakem","ハケム","審判","試合のルールを守らせる人。授業では Hakemin düdüğünü dinleyin.(審判の笛をよく聞こう)"],
 ["faul","ファウル","反則(ファウル)","ルールに違反すること。授業では İtmek fauldür.(押すのは反則だ)"],
 ["bayrak yarışı","バイラク ヤルシュ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では Bayrak yarışında sopayı düzgünce verin.(リレーではバトンをなめらかに渡そう)"]]);
SUL('tr','sd-tr-mu1','音楽 1','MUSIC 1',[
 ["porte","ポルテ","五線(譜)","音符を書く5本の線。授業では Notaları porteye yazın.(五線に音符を書こう)"],
 ["dörtlük nota","ドゥルトリュク ノタ","四分音符","1拍分の長さの音符。授業では Dörtlük nota bir vuruştur.(四分音符は1拍だ)"],
 ["ölçü sayısı","オルチュ サユス","拍子記号","1小節に何拍あるかを表す記号。授業では Bu şarkı üç dörtlük ölçüde.(この曲は4分の3拍子だ)"],
 ["vuruş","ヴルシュ","拍","音楽の一定の刻み。授業では Her vuruşta el çırpın.(毎拍、手をたたこう)"],
 ["tempo","テンポ","テンポ(速さ)","曲の速さ。授業では Başta tempo yavaştır.(最初はテンポがゆっくりだ)"],
 ["gam","ガム","音階","ドレミファソラシドのように順に並んだ音。授業では Do majör gamını çalın.(ハ長調の音階を弾こう)"],
 ["majör ton","マジョル トン","長調","明るい感じの調。授業では Bu şarkı majör tonda, bu yüzden neşeli duyulur.(この曲は長調なので明るく聞こえる)"],
 ["minör ton","ミノル トン","短調","暗い・悲しい感じの調。授業では Minör tonlar çoğu zaman hüzünlü duyulur.(短調はよく悲しく聞こえる)"]]);
SUL('tr','sd-tr-mu2','音楽 2','MUSIC 2',[
 ["akor","アコル","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では Do akorunu üç parmakla çalın.(3本の指で C のコードを弾こう)"],
 ["telli çalgı","テッリ チャルグ","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では Keman telli bir çalgıdır.(バイオリンは弦楽器だ)"],
 ["vurmalı çalgı","ヴルマル チャルグ","打楽器","たたいたりふったりして音を出す楽器。授業では Davullar vurmalı çalgılardır.(ドラムは打楽器だ)"],
 ["şef","シェフ","指揮者","合奏や合唱をまとめる人。授業では Tempo için şefi takip edin.(テンポは指揮者を見てとろう)"],
 ["kreşendo","クレシェンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では Sona doğru kreşendo yapın.(終わりに向かってだんだん強くしよう)"],
 ["besteci","ベステジ","作曲家","曲を作る人。授業では Beethoven Alman bir besteciydi.(ベートーヴェンはドイツの作曲家だった)"],
 ["senfoni","センフォニ","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では Bir senfoni genellikle dört bölümden oluşur.(交響曲はふつう4つの楽章からなる)"],
 ["şarkı sözleri","シャルク ソズレリ","歌詞","歌のことば。授業では Şarkı sözlerini ezbere biliyor musunuz?(歌詞を覚えているかな?)"]]);
SUL('tr','sd-tr-ar1','美術 1','ART 1',[
 ["eskiz","エスキズ","スケッチ(する)","大まかにさっと描くこと。授業では Önce kurşun kalemle hızlı bir eskiz yapın.(まず鉛筆でさっとスケッチしよう)"],
 ["gölgelendirme","ギョルゲレンディルメ","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では Gölgelendirme elmanın yuvarlak görünmesini sağlar.(陰影をつけるとリンゴが丸く見える)"],
 ["perspektif","ペルスペクティフ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では Yolun uzun görünmesi için perspektif kullanın.(遠近法を使って道が長く見えるようにしよう)"],
 ["natürmort","ナテュルモルト","静物画","果物や花びんなど、動かないものを描いた絵。授業では Bugün meyvelerle bir natürmort yapacağız.(今日は果物の静物画を描く)"],
 ["portre","ポルトレ","肖像画","人の顔や姿を描いた絵。授業では Yanınızdaki arkadaşın portresini çizin.(隣の人の肖像画を描こう)"],
 ["ana renkler","アナ レンクレル","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では Kırmızı, mavi ve sarı ana renklerdir.(赤・青・黄が三原色だ)"],
 ["tamamlayıcı renkler","タマムラユジュ レンクレル","補色","色相環で向かい合う、たがいを引き立てる色。授業では Turuncu ve mavi tamamlayıcı renklerdir.(オレンジと青は補色だ)"],
 ["kompozisyon","コンポズィスヨン","構図","画面の中での配置。授業では Resim yapmadan önce kompozisyonu düşünün.(描く前に構図を考えよう)"]]);
SUL('tr','sd-tr-ar2','美術 2','ART 2',[
 ["arka plan","アルカ プラン","背景","絵の奥の部分。授業では Önce arka planı boyayın.(背景を先に塗ろう)"],
 ["suluboya","スルボヤ","水彩絵の具","水でといて使う、すき通る絵の具。授業では Suluboya çabuk kurur, o yüzden hızlı çalışın.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["palet","パレト","パレット","絵の具をまぜる板。授業では Renkleri kâğıtta değil, palette karıştırın.(色は紙の上ではなくパレットでまぜよう)"],
 ["kil","キル","粘土","形を自由に作れるやわらかい土。授業では Kilden küçük bir kâse yapın.(粘土で小さなお皿の形を作ろう)"],
 ["heykel","ヘイケル","彫刻","立体的に作った作品。授業では Bu heykel taştan yapılmıştır.(この彫刻は石でできている)"],
 ["baskı resim","バスク レスィム","版画","版を作ってインクで紙に写す方法。授業では Baskı resimle bir resmin birçok kopyasını yapabilirsiniz.(版画では1つの絵からたくさん刷ることができる)"],
 ["başyapıt","バシヤプト","傑作(名作)","とてもすぐれた作品。授業では Mona Lisa ünlü bir başyapıttır.(モナ・リザは有名な傑作だ)"],
 ["sergi","セルギ","展覧会","作品を並べて見せる催し。授業では Çalışmalarımız okul sergisinde olacak.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-tr-b']={L:'tr',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-tr-it1", "sd-tr-it2", "sd-tr-pe1", "sd-tr-pe2", "sd-tr-mu1", "sd-tr-mu2", "sd-tr-ar1", "sd-tr-ar2"],key:'sd-tr-b'};
SDL_MORE.tr=[{bank:'sd-tr-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-tr-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('id','sd-id-ma1','数学 1','MATH 1',[
 ["bilangan positif","ビランガン ポシティフ","正の数","0より大きい数。授業では Bilangan positif lebih besar dari nol.(正の数は0より大きい)"],
 ["bilangan negatif","ビランガン ネガティフ","負の数","0より小さい数。授業では Minus lima adalah bilangan negatif.(-5は負の数です)"],
 ["bilangan bulat","ビランガン ブラッ","整数","…,-1, 0, 1, 2,… のような数。授業では Apakah nol koma lima bilangan bulat?(0.5は整数かな?)"],
 ["penyebut","プニュブッ","分母","分数の下の数。授業では Samakan penyebutnya.(分母をそろえよう=通分)"],
 ["bilangan desimal","ビランガン デシマル","小数","0.5 のような数。授業では Tulis seperempat sebagai bilangan desimal.(1/4を小数で書こう)"],
 ["akar kuadrat","アカル クアドラッ","平方根","2乗するとその数になる数。授業では Akar kuadrat dari sembilan adalah tiga.(9の平方根は3)"],
 ["variabel","ファリアブル","文字(変数)","x や y のように、いろいろな値をとる文字。授業では Di sini, x adalah variabel.(ここでは x が変数)"],
 ["sudut","スドゥッ","角","2本の線が作る開き。授業では Ukur sudutnya dengan busur derajat.(分度器で角をはかろう)"]]);
SUL('id','sd-id-ma2','数学 2','MATH 2',[
 ["sejajar","スジャジャル","平行な","どこまでのばしても交わらないこと。授業では Kedua garis ini sejajar.(この2本の線は平行)"],
 ["luas","ルアス","面積","広さ。授業では Hitung luas persegi panjang itu.(長方形の面積を求めよう)"],
 ["jari-jari","ジャリ ジャリ","半径","円の中心から円周までの長さ。授業では Jari-jari adalah setengah dari diameter.(半径は直径の半分)"],
 ["volume","フォルム","体積","立体の大きさ。授業では Hitung volume kubus itu.(立方体の体積を求めよう)"],
 ["fungsi","フンシ","関数","xが決まるとyがただ1つ決まる関係。授業では y adalah fungsi dari x.(yはxの関数)"],
 ["koordinat","コオルディナッ","座標","点の位置を表す数の組。授業では Tulis koordinat titik P.(点Pの座標を書こう)"],
 ["peluang","プルアン","確率","あることが起こる割合。授業では Berapa peluang muncul gambar?(表が出る確率は?)"],
 ["rata-rata","ラタ ラタ","平均値","全部たして個数でわった値。授業では Hitung rata-rata datanya.(データの平均値を計算しよう)"]]);
SUL('id','sd-id-sc1','理科 1','SCIENCE 1',[
 ["gaya","ガヤ","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では Gambar panah untuk menunjukkan gaya.(力を矢印で表そう)"],
 ["gesekan","グセカン","摩擦","ふれ合う面で動きをじゃまする力。授業では Gesekan membuat kotak melambat.(摩擦で箱がおそくなる)"],
 ["kecepatan","クチュパタン","速さ","距離÷時間。授業では Hitung kecepatan rata-ratanya.(平均の速さを計算しよう)"],
 ["arus listrik","アルス リストリッ","電流","電気の流れ。単位は A(アンペア)。授業では Ukur arus dengan amperemeter.(電流計で電流をはかろう)"],
 ["tegangan","トゥガンガン","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では Pasang voltmeter secara paralel.(電圧計は並列につなごう)"],
 ["medan magnet","メダン マグネッ","磁界","磁石の力がはたらく空間。授業では Gunakan serbuk besi untuk melihat medan magnet.(鉄粉で磁界のようすを見よう)"],
 ["unsur","ウンスル","元素","物質をつくるもとになる成分。授業では Cari unsur itu di tabel periodik.(周期表でその元素を探そう)"],
 ["atom","アトム","原子","物質をつくる、とても小さなつぶ。授業では Atom terlalu kecil untuk dilihat.(原子は小さすぎて見えない)"]]);
SUL('id','sd-id-sc2','理科 2','SCIENCE 2',[
 ["asam","アサム","酸","水溶液が酸性を示す物質。授業では Air lemon bersifat asam.(レモン汁は酸)"],
 ["respirasi","レスピラシ","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では Respirasi menghasilkan energi.(呼吸でエネルギーが取り出される)"],
 ["pencernaan","プンチェルナアン","消化","食べ物を体に吸収できる形に分解すること。授業では Pencernaan dimulai di mulut.(消化は口から始まる)"],
 ["gen","ゲン","遺伝子","親から子に伝わる特徴のもと。授業では Gen diturunkan dari orang tua ke anak.(遺伝子は親から子に伝わる)"],
 ["rantai makanan","ランタイ マカナン","食物連鎖","「食べる・食べられる」のつながり。授業では Gambarlah rantai makanan di hutan.(森の食物連鎖をかこう)"],
 ["gunung berapi","グヌン ブルアピ","火山","マグマがふき出してできた山。授業では Gunung berapi ini masih aktif.(この火山は今も活動している)"],
 ["fosil","フォシル","化石","大昔の生物の死がいや跡が残ったもの。授業では Fosil menceritakan kehidupan zaman purba.(化石から大昔の生物がわかる)"],
 ["tata surya","タタ スルヤ","太陽系","太陽とそのまわりを回る天体の集まり。授業では Ada delapan planet di tata surya.(太陽系には8つの惑星がある)"]]);
SUL('id','sd-id-so1','社会 1','SOCIAL STUDIES 1',[
 ["garis lintang","ガリス リンタン","緯度","赤道から北や南へどれだけ離れているか。授業では Tokyo terletak di sekitar 36 derajat lintang utara.(東京は北緯約36度にある)"],
 ["semenanjung","スムナンジュン","半島","三方を海に囲まれた陸地。授業では Italia adalah semenanjung panjang berbentuk sepatu bot.(イタリアはブーツの形をした長い半島だ)"],
 ["kepadatan penduduk","クパダタン プンドゥドゥッ","人口密度","一定の面積に何人住んでいるか。授業では Kepadatan penduduk Tokyo sangat tinggi.(東京は人口密度がとても高い)"],
 ["ekspor","エクスポル","輸出(する)","国内のものを外国に売ること。授業では Jepang mengekspor banyak mobil.(日本はたくさんの車を輸出している)"],
 ["impor","インポル","輸入(する)","外国のものを国内に買い入れること。授業では Sebagian besar gandum di Jepang diimpor.(日本の小麦のほとんどは輸入されている)"],
 ["pertanian","プルタニアン","農業","作物を育てたり家畜を飼ったりする仕事。授業では Pertanian penting di daerah ini.(この地域では農業が大切だ)"],
 ["peradaban","プラダバン","文明","都市・文字・国のしくみが発達した社会。授業では Empat peradaban besar lahir di tepi sungai besar.(四大文明は大きな川のほとりで始まった)"],
 ["kekaisaran","クカイサラン","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では Kekaisaran Romawi bertahan ratusan tahun.(ローマ帝国は何百年も続いた)"]]);
SUL('id','sd-id-so2','社会 2','SOCIAL STUDIES 2',[
 ["jajahan","ジャジャハン","植民地","ほかの国に支配された土地。授業では India pernah menjadi jajahan Inggris.(インドはかつてイギリスの植民地だった)"],
 ["kemerdekaan","クムルデカアン","独立","ほかの国の支配から離れて自分の国になること。授業では Amerika Serikat menyatakan kemerdekaan pada tahun 1776.(アメリカは1776年に独立を宣言した)"],
 ["perjanjian","プルジャンジアン","条約","国と国が文書で結ぶ約束。授業では Kedua negara menandatangani perjanjian damai.(2つの国は平和条約に署名した)"],
 ["demokrasi","デモクラシ","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では Dalam demokrasi, rakyat memilih pemimpinnya.(民主主義では、国民がリーダーを選ぶ)"],
 ["perdana menteri","プルダナ ムントゥリ","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では Perdana menteri memimpin kabinet.(首相は内閣を率いる)"],
 ["hak asasi manusia","ハッ アサシ マヌシア","人権","人が生まれながらにもつ権利。授業では Hak asasi manusia setiap orang harus dihormati.(すべての人の人権が尊重されなければならない)"],
 ["pajak","パジャッ","税金","国や自治体の仕事のために国民が納めるお金。授業では Pajak dipakai untuk membangun jalan dan sekolah.(税金で道路や学校がまかなわれている)"],
 ["perdagangan","プルダガンガン","貿易","国と国の間でものを売り買いすること。授業では Perdagangan antara Jepang dan Tiongkok sangat aktif.(日本と中国の貿易はとてもさかんだ)"]]);
SUL('id','sd-id-la1','国語 1','LANGUAGE ARTS 1',[
 ["kata ganti","カタ ガンティ","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では Ganti kata benda itu dengan kata ganti.(名詞を代名詞に置き換えよう)"],
 ["kata hubung","カタ フブン","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では Gabungkan kedua kalimat dengan kata hubung.(接続詞で2つの文をつなごう)"],
 ["tanda baca","タンダ バチャ","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では Jangan lupa tanda baca di akhir setiap kalimat.(それぞれの文の終わりの句読点を忘れないで)"],
 ["sinonim","シノニム","類義語(同じ意味の語)","意味が同じか近い語。授業では Cari sinonim kata ini.(この単語の類義語を見つけよう)"],
 ["gagasan utama","ガガサン ウタマ","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では Apa gagasan utama paragraf ini?(この段落の要旨は何かな?)"],
 ["meringkas","ムリンカス","要約する","大事なところだけを短くまとめる。授業では Ringkaslah bab itu dalam tiga kalimat.(その章を3文で要約しよう)"],
 ["alur cerita","アルル チュリタ","あらすじ(筋)","物語のできごとの流れ。授業では Alur cerita novel ini penuh kejutan.(この小説の筋は驚きでいっぱいだ)"],
 ["tokoh","トコ","登場人物","物語に出てくる人や動物。授業では Siapa tokoh utama dalam cerita ini?(物語の主人公はだれかな?)"]]);
SUL('id','sd-id-la2','国語 2','LANGUAGE ARTS 2',[
 ["tema","テマ","テーマ(主題)","物語を通して伝わる大切な考え。授業では Tema cerita ini adalah persahabatan.(物語のテーマは友情だ)"],
 ["narator","ナラトル","語り手","物語を語っている人。授業では Narator menceritakan kisahnya sebagai orang pertama.(語り手は一人称で物語を語っている)"],
 ["metafora","メタフォラ","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では “Hidup adalah perjalanan” adalah metafora.(「人生は旅だ」は隠喩だ)"],
 ["kesimpulan","クシンプラン","結論","エッセイの最後でまとめる部分。授業では Ulangi gagasan utamamu di kesimpulan.(結論でもう一度主な主張を述べよう)"],
 ["draf kasar","ドラフ カサル","下書き","まず全体を書いてみたもの。授業では Selesaikan draf kasarmu sebelum hari Jumat.(金曜日までに下書きを終わらせよう)"],
 ["mengoreksi","ムンゴレクシ","校正する","つづりや句読点のまちがいを確かめる。授業では Koreksi dengan teliti kesalahan ejaan.(つづりのまちがいがないか注意して校正しよう)"],
 ["presentasi","プレセンタシ","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では Setiap kelompok akan melakukan presentasi lima menit.(各グループが5分の発表をする)"],
 ["debat","デバッ","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では Topik debat hari ini adalah seragam sekolah.(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-id-a']={L:'id',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-id-ma1", "sd-id-ma2", "sd-id-sc1", "sd-id-sc2", "sd-id-so1", "sd-id-so2", "sd-id-la1", "sd-id-la2"],key:'sd-id-a'};
SUL('id','sd-id-it1','情報 1','COMPUTING 1',[
 ["perangkat keras","プランカッ クラス","ハードウェア","コンピューターの機械の部分。授業では Papan ketik dan layar adalah perangkat keras.(キーボードと画面はハードウェアだ)"],
 ["perangkat lunak","プランカッ ルナッ","ソフトウェア","コンピューターを動かすプログラム。授業では Pasang perangkat lunaknya sebelum pelajaran.(授業の前にソフトウェアをインストールしておこう)"],
 ["sistem operasi","システム オプラシ","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では Windows dan macOS adalah sistem operasi.(Windows と macOS はOSだ)"],
 ["sistem biner","システム ビネル","2進法","0と1だけで数を表す方法。授業では Komputer menyimpan semuanya dalam sistem biner.(コンピューターはすべてを2進法で記録する)"],
 ["piksel","ピクセル","画素(ピクセル)","画像をつくる小さな点。授業では Kalau diperbesar, setiap piksel terlihat.(拡大すると一つ一つの画素が見える)"],
 ["algoritma","アルゴリトマ","アルゴリズム","問題を解くための手順。授業では Tulis algoritma untuk membuat roti lapis.(サンドイッチを作るアルゴリズムを書こう)"],
 ["diagram alir","ディアグラム アリル","フローチャート","手順を図形と矢印で表した図。授業では Gambar diagram alir sebelum menulis kode.(コードを書く前にフローチャートを描こう)"],
 ["perulangan","プルランガン","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では Gunakan perulangan untuk menggambar sepuluh bintang.(繰り返しを使って星を10個描こう)"]]);
SUL('id','sd-id-it2','情報 2','COMPUTING 2',[
 ["debug","デバッグ","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では Ayo kita debug kode ini bersama-sama.(このコードを一緒にデバッグしよう)"],
 ["jaringan","ジャリンガン","ネットワーク","コンピューターどうしをつないだもの。授業では Semua komputer di kelas ini terhubung ke jaringan yang sama.(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["mesin pencari","ムシン プンチャリ","検索エンジン","キーワードでウェブの情報を探すサービス。授業では Gunakan kata kunci yang baik di mesin pencari.(検索エンジンではよいキーワードを使おう)"],
 ["phishing","フィシン","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では Jangan pernah mengeklik tautan di email phishing.(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["enkripsi","エンクリプシ","暗号化","データを決まった人しか読めない形に変えること。授業では Enkripsi menjaga kerahasiaan pesanmu.(暗号化によってメッセージの秘密が守られる)"],
 ["data pribadi","ダタ プリバディ","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では Jangan bagikan data pribadi di internet.(ネットで個人情報を公開しないで)"],
 ["hak cipta","ハッ チプタ","著作権","作品を作った人がもつ権利。授業では Lagu ini dilindungi hak cipta.(この曲は著作権で守られている)"],
 ["kecerdasan buatan","クチュルダサン ブアタン","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では Kecerdasan buatan bisa menerjemahkan bahasa.(人工知能は言葉を翻訳できる)"]]);
SUL('id','sd-id-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["otot","オトッ","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では Regangkan otot kakimu sebelum berlari.(走る前に脚の筋肉を伸ばそう)"],
 ["tulang","トゥラン","骨","体を支え、内臓を守るかたいもの。授業では Kalsium membuat tulang kuat.(カルシウムは骨を強くする)"],
 ["sendi","スンディ","関節","骨と骨のつなぎ目。授業では Lutut adalah sendi.(ひざは関節だ)"],
 ["denyut jantung","ドゥニュッ ジャントゥン","心拍数","1分間に心臓が打つ回数。授業では Periksa denyut jantungmu setelah berlari.(走ったあとに心拍数を測ろう)"],
 ["masa pubertas","マサ プブルタス","思春期","子どもから大人の体に変わっていく時期。授業では Tubuhmu banyak berubah selama masa pubertas.(思春期には体が大きく変わる)"],
 ["zat gizi","ザッ ギジ","栄養素","体に必要な、食べ物にふくまれる成分。授業では Sayuran penuh dengan zat gizi.(野菜には栄養素がたくさんふくまれている)"],
 ["protein","プロテイン","たんぱく質","筋肉や血をつくる栄養素。授業では Makan protein untuk membentuk otot.(筋肉をつけるにはたんぱく質をとろう)"],
 ["gizi seimbang","ギジ スインバン","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では Gizi seimbang mencakup buah, sayur, dan biji-bijian.(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('id','sd-id-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["hidrasi","ヒドラシ","水分補給","体に必要な水分をとること。授業では Hidrasi penting saat hari panas.(暑い日は水分補給が大切だ)"],
 ["kesehatan mental","クセハタン メンタル","心の健康","気持ちや心の状態の健康。授業では Berbicara dengan teman bisa membantu kesehatan mental.(友だちに話すことは心の健康の助けになる)"],
 ["pertolongan pertama","プルトロンガン プルタマ","応急手当","けがや急な病気のときにその場でする手当て。授業では Semua orang sebaiknya belajar pertolongan pertama dasar.(だれもが基本の応急手当を学ぶべきだ)"],
 ["keseleo","クスレオ","ねんざ","関節をひねって痛めること。授業では Pergelangan kakinya keseleo.(彼は足首をねんざしている)"],
 ["sengatan panas","スンガタン パナス","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では Istirahatlah di tempat teduh agar tidak terkena sengatan panas.(熱中症を防ぐために日かげで休もう)"],
 ["wasit","ワシッ","審判","試合のルールを守らせる人。授業では Dengarkan peluit wasit.(審判の笛をよく聞こう)"],
 ["pelanggaran","プランガラン","反則(ファウル)","ルールに違反すること。授業では Mendorong adalah pelanggaran.(押すのは反則だ)"],
 ["lari estafet","ラリ エスタフェッ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では Berikan tongkat dengan mulus saat lari estafet.(リレーではバトンをなめらかに渡そう)"]]);
SUL('id','sd-id-mu1','音楽 1','MUSIC 1',[
 ["paranada","パラナダ","五線(譜)","音符を書く5本の線。授業では Tulis not di paranada.(五線に音符を書こう)"],
 ["not seperempat","ノッ スプルンパッ","四分音符","1拍分の長さの音符。授業では Not seperempat bernilai satu ketukan.(四分音符は1拍だ)"],
 ["tanda birama","タンダ ビラマ","拍子記号","1小節に何拍あるかを表す記号。授業では Lagu ini bertanda birama tiga per empat.(この曲は4分の3拍子だ)"],
 ["ketukan","クトゥカン","拍","音楽の一定の刻み。授業では Tepuk tangan di setiap ketukan.(毎拍、手をたたこう)"],
 ["tempo","テンポ","テンポ(速さ)","曲の速さ。授業では Di awal, temponya lambat.(最初はテンポがゆっくりだ)"],
 ["tangga nada","タンガ ナダ","音階","ドレミファソラシドのように順に並んだ音。授業では Mainkan tangga nada C mayor.(ハ長調の音階を弾こう)"],
 ["nada mayor","ナダ マヨル","長調","明るい感じの調。授業では Lagu ini bernada mayor, jadi terdengar ceria.(この曲は長調なので明るく聞こえる)"],
 ["nada minor","ナダ ミノル","短調","暗い・悲しい感じの調。授業では Nada minor sering terdengar sedih.(短調はよく悲しく聞こえる)"]]);
SUL('id','sd-id-mu2','音楽 2','MUSIC 2',[
 ["akor","アコル","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では Mainkan akor C dengan tiga jari.(3本の指で C のコードを弾こう)"],
 ["alat musik dawai","アラッ ムシッ ダワイ","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では Biola adalah alat musik dawai.(バイオリンは弦楽器だ)"],
 ["alat musik perkusi","アラッ ムシッ プルクシ","打楽器","たたいたりふったりして音を出す楽器。授業では Drum adalah alat musik perkusi.(ドラムは打楽器だ)"],
 ["dirigen","ディリゲン","指揮者","合奏や合唱をまとめる人。授業では Lihat dirigen untuk mengikuti tempo.(テンポは指揮者を見てとろう)"],
 ["kresendo","クレセンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では Buat kresendo menjelang akhir.(終わりに向かってだんだん強くしよう)"],
 ["komponis","コンポニス","作曲家","曲を作る人。授業では Beethoven adalah komponis Jerman.(ベートーヴェンはドイツの作曲家だった)"],
 ["simfoni","シンフォニ","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では Simfoni biasanya terdiri dari empat bagian.(交響曲はふつう4つの楽章からなる)"],
 ["lirik lagu","リリッ ラグ","歌詞","歌のことば。授業では Apakah kamu hafal lirik lagunya?(歌詞を覚えているかな?)"]]);
SUL('id','sd-id-ar1','美術 1','ART 1',[
 ["sketsa","スケッサ","スケッチ(する)","大まかにさっと描くこと。授業では Mulailah dengan sketsa cepat memakai pensil.(まず鉛筆でさっとスケッチしよう)"],
 ["arsiran","アルシラン","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では Arsiran membuat apel terlihat bulat.(陰影をつけるとリンゴが丸く見える)"],
 ["perspektif","プルスペクティフ","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では Gunakan perspektif agar jalan terlihat panjang.(遠近法を使って道が長く見えるようにしよう)"],
 ["lukisan alam benda","ルキサン アラム ブンダ","静物画","果物や花びんなど、動かないものを描いた絵。授業では Hari ini kita membuat lukisan alam benda berupa buah-buahan.(今日は果物の静物画を描く)"],
 ["potret","ポトレッ","肖像画","人の顔や姿を描いた絵。授業では Gambarlah potret teman di sebelahmu.(隣の人の肖像画を描こう)"],
 ["warna primer","ワルナ プリメル","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では Merah, biru, dan kuning adalah warna primer.(赤・青・黄が三原色だ)"],
 ["warna komplementer","ワルナ コンプレメンテル","補色","色相環で向かい合う、たがいを引き立てる色。授業では Oranye dan biru adalah warna komplementer.(オレンジと青は補色だ)"],
 ["komposisi","コンポシシ","構図","画面の中での配置。授業では Pikirkan komposisinya sebelum melukis.(描く前に構図を考えよう)"]]);
SUL('id','sd-id-ar2','美術 2','ART 2',[
 ["latar belakang","ラタル ブラカン","背景","絵の奥の部分。授業では Warnai latar belakang terlebih dahulu.(背景を先に塗ろう)"],
 ["cat air","チャッ アイル","水彩絵の具","水でといて使う、すき通る絵の具。授業では Cat air cepat kering, jadi bekerjalah dengan cepat.(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["palet","パレッ","パレット","絵の具をまぜる板。授業では Campur warnanya di palet, bukan di kertas.(色は紙の上ではなくパレットでまぜよう)"],
 ["tanah liat","タナ リアッ","粘土","形を自由に作れるやわらかい土。授業では Bentuk tanah liat menjadi mangkuk kecil.(粘土で小さなお皿の形を作ろう)"],
 ["patung","パトゥン","彫刻","立体的に作った作品。授業では Patung ini terbuat dari batu.(この彫刻は石でできている)"],
 ["seni grafis","スニ グラフィス","版画","版を作ってインクで紙に写す方法。授業では Dengan seni grafis, kamu bisa membuat banyak salinan satu gambar.(版画では1つの絵からたくさん刷ることができる)"],
 ["mahakarya","マハカルヤ","傑作(名作)","とてもすぐれた作品。授業では Mona Lisa adalah mahakarya yang terkenal.(モナ・リザは有名な傑作だ)"],
 ["pameran","パメラン","展覧会","作品を並べて見せる催し。授業では Karya kita akan dipajang di pameran sekolah.(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-id-b']={L:'id',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-id-it1", "sd-id-it2", "sd-id-pe1", "sd-id-pe2", "sd-id-mu1", "sd-id-mu2", "sd-id-ar1", "sd-id-ar2"],key:'sd-id-b'};
SDL_MORE.id=[{bank:'sd-id-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-id-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
SUL('ar','sd-ar-ma1','数学 1','MATH 1',[
 ["العدد الموجب","アルアダド アルムージャブ","正の数","0より大きい数。授業では ⁧الأعداد الموجبة أكبر من الصفر.⁩(正の数は0より大きい)"],
 ["العدد السالب","アルアダド アッサーリブ","負の数","0より小さい数。授業では ⁧سالب خمسة عدد سالب.⁩(-5は負の数です)"],
 ["العدد الصحيح","アルアダド アッサヒーフ","整数","…,-1, 0, 1, 2,… のような数。授業では ⁧هل صفر فاصلة خمسة عدد صحيح؟⁩(0.5は整数かな?)"],
 ["المقام","アルマカーム","分母","分数の下の数。授業では ⁧أوجد المقام المشترك.⁩(分母をそろえよう=通分)"],
 ["العدد العشري","アルアダド アルウシュリー","小数","0.5 のような数。授業では ⁧اكتب الربع على شكل عدد عشري.⁩(1/4を小数で書こう)"],
 ["الجذر التربيعي","アルジズル アッタルビーイー","平方根","2乗するとその数になる数。授業では ⁧الجذر التربيعي لتسعة هو ثلاثة.⁩(9の平方根は3)"],
 ["المتغير","アルムタガイイル","文字(変数)","x や y のように、いろいろな値をとる文字。授業では ⁧هنا x متغير.⁩(ここでは x が変数)"],
 ["الزاوية","アッザーウィヤ","角","2本の線が作る開き。授業では ⁧قس الزاوية بالمنقلة.⁩(分度器で角をはかろう)"]]);
SUL('ar','sd-ar-ma2','数学 2','MATH 2',[
 ["متواز","ムタワーズィン","平行な","どこまでのばしても交わらないこと。授業では ⁧هذان المستقيمان متوازيان.⁩(この2本の線は平行)"],
 ["المساحة","アルミサーハ","面積","広さ。授業では ⁧أوجد مساحة المستطيل.⁩(長方形の面積を求めよう)"],
 ["نصف القطر","ニスフ アルクトル","半径","円の中心から円周までの長さ。授業では ⁧نصف القطر يساوي نصف طول القطر.⁩(半径は直径の半分)"],
 ["الحجم","アルハジム","体積","立体の大きさ。授業では ⁧أوجد حجم المكعب.⁩(立方体の体積を求めよう)"],
 ["الدالة","アッダーッラ","関数","xが決まるとyがただ1つ決まる関係。授業では ⁧y دالة في x.⁩(yはxの関数)"],
 ["الإحداثيات","アルイフダースィヤート","座標","点の位置を表す数の組。授業では ⁧اكتب إحداثيات النقطة P.⁩(点Pの座標を書こう)"],
 ["الاحتمال","アルイフティマール","確率","あることが起こる割合。授業では ⁧ما احتمال ظهور الصورة؟⁩(表が出る確率は?)"],
 ["المتوسط الحسابي","アルムタワッスィト アルヒサービー","平均値","全部たして個数でわった値。授業では ⁧احسب المتوسط الحسابي للبيانات.⁩(データの平均値を計算しよう)"]]);
SUL('ar','sd-ar-sc1','理科 1','SCIENCE 1',[
 ["القوة","アルクウワ","力","物を押したり引いたりするはたらき。単位は N(ニュートン)。授業では ⁧ارسم سهما يمثل القوة.⁩(力を矢印で表そう)"],
 ["الاحتكاك","アルイフティカーク","摩擦","ふれ合う面で動きをじゃまする力。授業では ⁧الاحتكاك يبطئ الصندوق.⁩(摩擦で箱がおそくなる)"],
 ["السرعة","アッスルア","速さ","距離÷時間。授業では ⁧احسب متوسط السرعة.⁩(平均の速さを計算しよう)"],
 ["التيار الكهربائي","アッタイヤール アルカフラバーイー","電流","電気の流れ。単位は A(アンペア)。授業では ⁧قس التيار بجهاز الأميتر.⁩(電流計で電流をはかろう)"],
 ["الجهد الكهربائي","アルジュハド アルカフラバーイー","電圧","電流を流そうとするはたらき。単位は V(ボルト)。授業では ⁧صل الفولتميتر على التوازي.⁩(電圧計は並列につなごう)"],
 ["المجال المغناطيسي","アルマジャール アルミグナーティースィー","磁界","磁石の力がはたらく空間。授業では ⁧استخدم برادة الحديد لترى المجال المغناطيسي.⁩(鉄粉で磁界のようすを見よう)"],
 ["العنصر","アルウンスル","元素","物質をつくるもとになる成分。授業では ⁧ابحث عن العنصر في الجدول الدوري.⁩(周期表でその元素を探そう)"],
 ["الذرة","アッザッラ","原子","物質をつくる、とても小さなつぶ。授業では ⁧الذرات أصغر من أن ترى.⁩(原子は小さすぎて見えない)"]]);
SUL('ar','sd-ar-sc2','理科 2','SCIENCE 2',[
 ["الحمض","アルハムド","酸","水溶液が酸性を示す物質。授業では ⁧عصير الليمون حمض.⁩(レモン汁は酸)"],
 ["التنفس","アッタナッフス","呼吸","細胞が栄養分からエネルギーを取り出すはたらき。授業では ⁧التنفس يطلق الطاقة.⁩(呼吸でエネルギーが取り出される)"],
 ["الهضم","アルハドム","消化","食べ物を体に吸収できる形に分解すること。授業では ⁧يبدأ الهضم في الفم.⁩(消化は口から始まる)"],
 ["الجين","アルジーン","遺伝子","親から子に伝わる特徴のもと。授業では ⁧تنتقل الجينات من الآباء إلى الأبناء.⁩(遺伝子は親から子に伝わる)"],
 ["السلسلة الغذائية","アッスィルスィラ アルギザーイーヤ","食物連鎖","「食べる・食べられる」のつながり。授業では ⁧ارسم سلسلة غذائية للغابة.⁩(森の食物連鎖をかこう)"],
 ["البركان","アルブルカーン","火山","マグマがふき出してできた山。授業では ⁧هذا البركان ما زال نشطا.⁩(この火山は今も活動している)"],
 ["الأحفورة","アルウフーラ","化石","大昔の生物の死がいや跡が残ったもの。授業では ⁧تخبرنا الأحافير عن الحياة القديمة.⁩(化石から大昔の生物がわかる)"],
 ["المجموعة الشمسية","アルマジュムーア アッシャムスィーヤ","太陽系","太陽とそのまわりを回る天体の集まり。授業では ⁧في المجموعة الشمسية ثمانية كواكب.⁩(太陽系には8つの惑星がある)"]]);
SUL('ar','sd-ar-so1','社会 1','SOCIAL STUDIES 1',[
 ["خط العرض","ハット アルアルド","緯度","赤道から北や南へどれだけ離れているか。授業では ⁧تقع طوكيو على خط عرض 36 درجة شمالا تقريبا.⁩(東京は北緯約36度にある)"],
 ["شبه الجزيرة","シブフ アルジャズィーラ","半島","三方を海に囲まれた陸地。授業では ⁧إيطاليا شبه جزيرة طويلة على شكل حذاء.⁩(イタリアはブーツの形をした長い半島だ)"],
 ["الكثافة السكانية","アルカサーファ アッスッカーニーヤ","人口密度","一定の面積に何人住んでいるか。授業では ⁧الكثافة السكانية في طوكيو عالية جدا.⁩(東京は人口密度がとても高い)"],
 ["التصدير","アッタスディール","輸出(する)","国内のものを外国に売ること。授業では ⁧تصدر اليابان الكثير من السيارات.⁩(日本はたくさんの車を輸出している)"],
 ["الاستيراد","アルイスティーラード","輸入(する)","外国のものを国内に買い入れること。授業では ⁧معظم القمح في اليابان مستورد.⁩(日本の小麦のほとんどは輸入されている)"],
 ["الزراعة","アッズィラーア","農業","作物を育てたり家畜を飼ったりする仕事。授業では ⁧الزراعة مهمة في هذه المنطقة.⁩(この地域では農業が大切だ)"],
 ["الحضارة","アルハダーラ","文明","都市・文字・国のしくみが発達した社会。授業では ⁧نشأت الحضارات الأربع الكبرى على ضفاف الأنهار الكبيرة.⁩(四大文明は大きな川のほとりで始まった)"],
 ["الإمبراطورية","アルイムブラートゥーリーヤ","帝国","皇帝などが広い地域や多くの民族を支配する国。授業では ⁧استمرت الإمبراطورية الرومانية مئات السنين.⁩(ローマ帝国は何百年も続いた)"]]);
SUL('ar','sd-ar-so2','社会 2','SOCIAL STUDIES 2',[
 ["المستعمرة","アルムスタアマラ","植民地","ほかの国に支配された土地。授業では ⁧كانت الهند مستعمرة بريطانية.⁩(インドはかつてイギリスの植民地だった)"],
 ["الاستقلال","アルイスティクラール","独立","ほかの国の支配から離れて自分の国になること。授業では ⁧أعلنت الولايات المتحدة استقلالها عام 1776.⁩(アメリカは1776年に独立を宣言した)"],
 ["المعاهدة","アルムアーハダ","条約","国と国が文書で結ぶ約束。授業では ⁧وقع البلدان معاهدة سلام.⁩(2つの国は平和条約に署名した)"],
 ["الديمقراطية","アッディームクラーティーヤ","民主主義","国民が選挙などを通して政治を決めるしくみ。授業では ⁧في الديمقراطية يختار الشعب قادته.⁩(民主主義では、国民がリーダーを選ぶ)"],
 ["رئيس الوزراء","ライース アルウザラーッ","首相(総理大臣)","議会で選ばれる政府のリーダー。授業では ⁧يرأس رئيس الوزراء مجلس الوزراء.⁩(首相は内閣を率いる)"],
 ["حقوق الإنسان","フクーク アルインサーン","人権","人が生まれながらにもつ権利。授業では ⁧يجب احترام حقوق الإنسان للجميع.⁩(すべての人の人権が尊重されなければならない)"],
 ["الضريبة","アッダリーバ","税金","国や自治体の仕事のために国民が納めるお金。授業では ⁧تدفع الضرائب تكاليف الطرق والمدارس.⁩(税金で道路や学校がまかなわれている)"],
 ["التجارة","アッティジャーラ","貿易","国と国の間でものを売り買いすること。授業では ⁧التجارة بين اليابان والصين نشيطة جدا.⁩(日本と中国の貿易はとてもさかんだ)"]]);
SUL('ar','sd-ar-la1','国語 1','LANGUAGE ARTS 1',[
 ["الضمير","アッダミール","代名詞","名詞の代わりに使う語(「彼」「それ」など)。授業では ⁧استبدل الاسم بضمير.⁩(名詞を代名詞に置き換えよう)"],
 ["حرف العطف","ハルフ アルアトフ","接続詞","語や文をつなぐ語(「そして」「しかし」など)。授業では ⁧اربط الجملتين بحرف عطف.⁩(接続詞で2つの文をつなごう)"],
 ["علامات الترقيم","アラーマート アッタルキーム","句読点(記号)","ピリオド・コンマ・クエスチョンマークなどの記号。授業では ⁧لا تنس علامات الترقيم في نهاية كل جملة.⁩(それぞれの文の終わりの句読点を忘れないで)"],
 ["المرادف","アルムラーディフ","類義語(同じ意味の語)","意味が同じか近い語。授業では ⁧ابحث عن مرادف لهذه الكلمة.⁩(この単語の類義語を見つけよう)"],
 ["الفكرة الرئيسية","アルフィクラ アッライースィーヤ","要旨(いちばん言いたいこと)","文章全体で筆者が伝えたいこと。授業では ⁧ما الفكرة الرئيسية لهذه الفقرة؟⁩(この段落の要旨は何かな?)"],
 ["التلخيص","アッタルヒース","要約する","大事なところだけを短くまとめる。授業では ⁧لخص الفصل في ثلاث جمل.⁩(その章を3文で要約しよう)"],
 ["الحبكة","アルハブカ","あらすじ(筋)","物語のできごとの流れ。授業では ⁧حبكة هذه الرواية مليئة بالمفاجآت.⁩(この小説の筋は驚きでいっぱいだ)"],
 ["الشخصية","アッシャフスィーヤ","登場人物","物語に出てくる人や動物。授業では ⁧من الشخصية الرئيسية في القصة؟⁩(物語の主人公はだれかな?)"]]);
SUL('ar','sd-ar-la2','国語 2','LANGUAGE ARTS 2',[
 ["الموضوع","アルマウドゥーア","テーマ(主題)","物語を通して伝わる大切な考え。授業では ⁧موضوع القصة هو الصداقة.⁩(物語のテーマは友情だ)"],
 ["الراوي","アッラーウィー","語り手","物語を語っている人。授業では ⁧يروي الراوي القصة بضمير المتكلم.⁩(語り手は一人称で物語を語っている)"],
 ["الاستعارة","アルイスティアーラ","隠喩(メタファー)","「〜のようだ」を使わずに、何かを別のものにたとえる表現。授業では ⁧«الحياة رحلة» استعارة.⁩(「人生は旅だ」は隠喩だ)"],
 ["الخاتمة","アルハーティマ","結論","エッセイの最後でまとめる部分。授業では ⁧أعد فكرتك الرئيسية في الخاتمة.⁩(結論でもう一度主な主張を述べよう)"],
 ["المسودة","アルムサウワダ","下書き","まず全体を書いてみたもの。授業では ⁧أنه المسودة قبل يوم الجمعة.⁩(金曜日までに下書きを終わらせよう)"],
 ["التدقيق اللغوي","アッタドキーク アッルガウィー","校正する","つづりや句読点のまちがいを確かめる。授業では ⁧دقق النص جيدا بحثا عن الأخطاء الإملائية.⁩(つづりのまちがいがないか注意して校正しよう)"],
 ["العرض التقديمي","アルアルド アッタクディーミー","発表(プレゼン)","人の前で調べたことや考えを伝えること。授業では ⁧ستقدم كل مجموعة عرضا مدته خمس دقائق.⁩(各グループが5分の発表をする)"],
 ["المناظرة","アルムナーザラ","ディベート(討論)","決められたテーマについて、賛成と反対に分かれて議論すること。授業では ⁧موضوع مناظرة اليوم هو الزي المدرسي.⁩(今日のディベートのテーマは制服だ)"]]);
XBANK['sd-ar-a']={L:'ar',name:'数学・理科・社会・国語の用語',tier:1,study:1,ids:["sd-ar-ma1", "sd-ar-ma2", "sd-ar-sc1", "sd-ar-sc2", "sd-ar-so1", "sd-ar-so2", "sd-ar-la1", "sd-ar-la2"],key:'sd-ar-a'};
SUL('ar','sd-ar-it1','情報 1','COMPUTING 1',[
 ["العتاد","アルアタード","ハードウェア","コンピューターの機械の部分。授業では ⁧لوحة المفاتيح والشاشة من العتاد.⁩(キーボードと画面はハードウェアだ)"],
 ["البرمجيات","アルバルマジーヤート","ソフトウェア","コンピューターを動かすプログラム。授業では ⁧ثبت البرمجيات قبل الدرس.⁩(授業の前にソフトウェアをインストールしておこう)"],
 ["نظام التشغيل","ニザーム アッタシュギール","OS(オペレーティングシステム)","コンピューター全体を管理する基本のソフト。授業では ⁧Windows وmacOS أنظمة تشغيل.⁩(Windows と macOS はOSだ)"],
 ["النظام الثنائي","アンニザーム アッスナーイー","2進法","0と1だけで数を表す方法。授業では ⁧يخزن الحاسوب كل شيء بالنظام الثنائي.⁩(コンピューターはすべてを2進法で記録する)"],
 ["البكسل","アルビクセル","画素(ピクセル)","画像をつくる小さな点。授業では ⁧عند التكبير ترى كل بكسل.⁩(拡大すると一つ一つの画素が見える)"],
 ["الخوارزمية","アルハワーリズミーヤ","アルゴリズム","問題を解くための手順。授業では ⁧اكتب خوارزمية لصنع شطيرة.⁩(サンドイッチを作るアルゴリズムを書こう)"],
 ["المخطط الانسيابي","アルムハッタト アルインスィヤービー","フローチャート","手順を図形と矢印で表した図。授業では ⁧ارسم مخططا انسيابيا قبل كتابة الشيفرة.⁩(コードを書く前にフローチャートを描こう)"],
 ["الحلقة التكرارية","アルハルカ アッタクラーリーヤ","繰り返し(ループ)","同じ命令を何回もくり返すこと。授業では ⁧استخدم حلقة تكرارية لرسم عشر نجوم.⁩(繰り返しを使って星を10個描こう)"]]);
SUL('ar','sd-ar-it2','情報 2','COMPUTING 2',[
 ["تصحيح الأخطاء","タスヒーフ アルアフター","デバッグする","プログラムのまちがい(バグ)を見つけて直す。授業では ⁧لنصحح أخطاء هذه الشيفرة معا.⁩(このコードを一緒にデバッグしよう)"],
 ["الشبكة","アッシャバカ","ネットワーク","コンピューターどうしをつないだもの。授業では ⁧كل الحواسيب في هذا الفصل على الشبكة نفسها.⁩(この部屋のコンピューターはみんな同じネットワークにつながっている)"],
 ["محرك البحث","ムハッリク アルバフス","検索エンジン","キーワードでウェブの情報を探すサービス。授業では ⁧استخدم كلمات مفتاحية جيدة في محرك البحث.⁩(検索エンジンではよいキーワードを使おう)"],
 ["التصيد الاحتيالي","アッタサイユド アルイフティヤーリー","フィッシング詐欺","本物そっくりのメールやサイトで個人情報をだましとる手口。授業では ⁧لا تضغط أبدا على روابط رسائل التصيد الاحتيالي.⁩(フィッシングメールのリンクは絶対にクリックしないで)"],
 ["التشفير","アッタシュフィール","暗号化","データを決まった人しか読めない形に変えること。授業では ⁧التشفير يحافظ على سرية رسائلك.⁩(暗号化によってメッセージの秘密が守られる)"],
 ["المعلومات الشخصية","アルマアルーマート アッシャフスィーヤ","個人情報","名前・住所・電話番号など、その人がわかる情報。授業では ⁧لا تشارك معلوماتك الشخصية على الإنترنت.⁩(ネットで個人情報を公開しないで)"],
 ["حقوق النشر","フクーク アンナシュル","著作権","作品を作った人がもつ権利。授業では ⁧هذه الأغنية محمية بحقوق النشر.⁩(この曲は著作権で守られている)"],
 ["الذكاء الاصطناعي","アッザカーッ アルイスティナーイー","人工知能(AI)","人のように学んだり判断したりするコンピューターの技術。授業では ⁧يستطيع الذكاء الاصطناعي ترجمة اللغات.⁩(人工知能は言葉を翻訳できる)"]]);
SUL('ar','sd-ar-pe1','保健体育 1','P.E. & HEALTH 1',[
 ["العضلة","アルアダラ","筋肉","体を動かすために縮んだりゆるんだりする組織。授業では ⁧مدد عضلات ساقيك قبل الجري.⁩(走る前に脚の筋肉を伸ばそう)"],
 ["العظم","アルアズム","骨","体を支え、内臓を守るかたいもの。授業では ⁧الكالسيوم يقوي العظام.⁩(カルシウムは骨を強くする)"],
 ["المفصل","アルマフスィル","関節","骨と骨のつなぎ目。授業では ⁧الركبة مفصل.⁩(ひざは関節だ)"],
 ["معدل نبضات القلب","ムアッダル ナバダート アルカルブ","心拍数","1分間に心臓が打つ回数。授業では ⁧قس معدل نبضات قلبك بعد الجري.⁩(走ったあとに心拍数を測ろう)"],
 ["البلوغ","アルブルーグ","思春期","子どもから大人の体に変わっていく時期。授業では ⁧يتغير جسمك كثيرا في مرحلة البلوغ.⁩(思春期には体が大きく変わる)"],
 ["العنصر الغذائي","アルウンスル アルギザーイー","栄養素","体に必要な、食べ物にふくまれる成分。授業では ⁧الخضروات غنية بالعناصر الغذائية.⁩(野菜には栄養素がたくさんふくまれている)"],
 ["البروتين","アルブルーティーン","たんぱく質","筋肉や血をつくる栄養素。授業では ⁧تناول البروتين لبناء العضلات.⁩(筋肉をつけるにはたんぱく質をとろう)"],
 ["النظام الغذائي المتوازن","アンニザーム アルギザーイー アルムタワーズィン","バランスのよい食事","いろいろな栄養素をほどよくとる食事。授業では ⁧يشمل النظام الغذائي المتوازن الفواكه والخضروات والحبوب.⁩(バランスのよい食事には果物・野菜・穀物が入る)"]]);
SUL('ar','sd-ar-pe2','保健体育 2','P.E. & HEALTH 2',[
 ["شرب الماء","シュルブ アルマーッ","水分補給","体に必要な水分をとること。授業では ⁧شرب الماء مهم في الأيام الحارة.⁩(暑い日は水分補給が大切だ)"],
 ["الصحة النفسية","アッスィッハ アンナフスィーヤ","心の健康","気持ちや心の状態の健康。授業では ⁧التحدث مع صديق يساعد صحتك النفسية.⁩(友だちに話すことは心の健康の助けになる)"],
 ["الإسعافات الأولية","アルイスアーファート アルアウワリーヤ","応急手当","けがや急な病気のときにその場でする手当て。授業では ⁧يجب أن يتعلم الجميع الإسعافات الأولية الأساسية.⁩(だれもが基本の応急手当を学ぶべきだ)"],
 ["الالتواء","アルイルティワーッ","ねんざ","関節をひねって痛めること。授業では ⁧عنده التواء في الكاحل.⁩(彼は足首をねんざしている)"],
 ["ضربة الشمس","ダルバト アッシャムス","熱中症","暑さで体温が上がりすぎて具合が悪くなること。授業では ⁧استرح في الظل لتتجنب ضربة الشمس.⁩(熱中症を防ぐために日かげで休もう)"],
 ["الحكم","アルハカム","審判","試合のルールを守らせる人。授業では ⁧استمع إلى صافرة الحكم.⁩(審判の笛をよく聞こう)"],
 ["الخطأ","アルハタッ","反則(ファウル)","ルールに違反すること。授業では ⁧الدفع خطأ.⁩(押すのは反則だ)"],
 ["سباق التتابع","スィバーク アッタターブウ","リレー","チームで順番に走ってバトンをつなぐ競走。授業では ⁧سلم العصا بسلاسة في سباق التتابع.⁩(リレーではバトンをなめらかに渡そう)"]]);
SUL('ar','sd-ar-mu1','音楽 1','MUSIC 1',[
 ["المدرج الموسيقي","アルムダッラジ アルムースィーキー","五線(譜)","音符を書く5本の線。授業では ⁧اكتب النوتات على المدرج الموسيقي.⁩(五線に音符を書こう)"],
 ["نوتة الربع","ノータト アッルブウ","四分音符","1拍分の長さの音符。授業では ⁧نوتة الربع تساوي نبضة واحدة.⁩(四分音符は1拍だ)"],
 ["الميزان الموسيقي","アルミーザーン アルムースィーキー","拍子記号","1小節に何拍あるかを表す記号。授業では ⁧هذه الأغنية على ميزان ثلاثة أرباع.⁩(この曲は4分の3拍子だ)"],
 ["النبضة","アンナブダ","拍","音楽の一定の刻み。授業では ⁧صفق مع كل نبضة.⁩(毎拍、手をたたこう)"],
 ["سرعة الإيقاع","スルアト アルイーカーア","テンポ(速さ)","曲の速さ。授業では ⁧سرعة الإيقاع بطيئة في البداية.⁩(最初はテンポがゆっくりだ)"],
 ["السلم الموسيقي","アッスッラム アルムースィーキー","音階","ドレミファソラシドのように順に並んだ音。授業では ⁧اعزف سلم دو ماجور.⁩(ハ長調の音階を弾こう)"],
 ["الماجور","アルマージュール","長調","明るい感じの調。授業では ⁧هذه الأغنية من الماجور، لذلك تبدو مبهجة.⁩(この曲は長調なので明るく聞こえる)"],
 ["المينور","アルミーヌール","短調","暗い・悲しい感じの調。授業では ⁧المينور يبدو حزينا في الغالب.⁩(短調はよく悲しく聞こえる)"]]);
SUL('ar','sd-ar-mu2','音楽 2','MUSIC 2',[
 ["الكورد","アルコルド","和音(コード)","高さのちがう音を同時に鳴らしたもの。授業では ⁧اعزف كورد دو بثلاثة أصابع.⁩(3本の指で C のコードを弾こう)"],
 ["الآلة الوترية","アルアーラ アルワタリーヤ","弦楽器","弦をはじいたりこすったりして音を出す楽器。授業では ⁧الكمان آلة وترية.⁩(バイオリンは弦楽器だ)"],
 ["الآلة الإيقاعية","アルアーラ アルイーカーイーヤ","打楽器","たたいたりふったりして音を出す楽器。授業では ⁧الطبول آلات إيقاعية.⁩(ドラムは打楽器だ)"],
 ["قائد الأوركسترا","カーイド アルオルケストラ","指揮者","合奏や合唱をまとめる人。授業では ⁧انظر إلى قائد الأوركسترا لتتبع الإيقاع.⁩(テンポは指揮者を見てとろう)"],
 ["الكريشندو","アルクレシェンド","クレッシェンド(だんだん強く)","少しずつ大きくする。授業では ⁧اصنع كريشندو قرب النهاية.⁩(終わりに向かってだんだん強くしよう)"],
 ["الملحن","アルムラッヒン","作曲家","曲を作る人。授業では ⁧كان بيتهوفن ملحنا ألمانيا.⁩(ベートーヴェンはドイツの作曲家だった)"],
 ["السيمفونية","アッスィームフーニーヤ","交響曲","オーケストラのための、いくつかの楽章からなる大きな曲。授業では ⁧تتكون السيمفونية عادة من أربع حركات.⁩(交響曲はふつう4つの楽章からなる)"],
 ["كلمات الأغنية","カリマート アルウグニヤ","歌詞","歌のことば。授業では ⁧هل تحفظ كلمات الأغنية؟⁩(歌詞を覚えているかな?)"]]);
SUL('ar','sd-ar-ar1','美術 1','ART 1',[
 ["الرسم التخطيطي","アッラスム アッタフティーティー","スケッチ(する)","大まかにさっと描くこと。授業では ⁧ابدأ برسم تخطيطي سريع بالقلم الرصاص.⁩(まず鉛筆でさっとスケッチしよう)"],
 ["التظليل","アッタズリール","陰影(をつけること)","明るいところと暗いところを描き分けること。授業では ⁧التظليل يجعل التفاحة تبدو مستديرة.⁩(陰影をつけるとリンゴが丸く見える)"],
 ["المنظور","アルマンズール","遠近法","近くを大きく遠くを小さく描いて奥行きを出す方法。授業では ⁧استخدم المنظور لتبدو الطريق طويلة.⁩(遠近法を使って道が長く見えるようにしよう)"],
 ["الطبيعة الصامتة","アッタビーア アッサーミタ","静物画","果物や花びんなど、動かないものを描いた絵。授業では ⁧سنرسم اليوم طبيعة صامتة من الفواكه.⁩(今日は果物の静物画を描く)"],
 ["البورتريه","アルボルトレー","肖像画","人の顔や姿を描いた絵。授業では ⁧ارسم بورتريه لزميلك الجالس بجانبك.⁩(隣の人の肖像画を描こう)"],
 ["الألوان الأساسية","アルアルワーン アルアサースィーヤ","三原色(絵の具)","まぜて多くの色を作れるもとの3色(赤・青・黄)。授業では ⁧الأحمر والأزرق والأصفر هي الألوان الأساسية.⁩(赤・青・黄が三原色だ)"],
 ["الألوان المتكاملة","アルアルワーン アルムタカーミラ","補色","色相環で向かい合う、たがいを引き立てる色。授業では ⁧البرتقالي والأزرق لونان متكاملان.⁩(オレンジと青は補色だ)"],
 ["التكوين","アッタクウィーン","構図","画面の中での配置。授業では ⁧فكر في التكوين قبل أن ترسم.⁩(描く前に構図を考えよう)"]]);
SUL('ar','sd-ar-ar2','美術 2','ART 2',[
 ["الخلفية","アルハルフィーヤ","背景","絵の奥の部分。授業では ⁧لون الخلفية أولا.⁩(背景を先に塗ろう)"],
 ["الألوان المائية","アルアルワーン アルマーイーヤ","水彩絵の具","水でといて使う、すき通る絵の具。授業では ⁧الألوان المائية تجف بسرعة، فاعمل بسرعة.⁩(水彩絵の具はすぐ乾くので手早く描こう)"],
 ["لوحة الألوان","ラウハト アルアルワーン","パレット","絵の具をまぜる板。授業では ⁧اخلط الألوان على لوحة الألوان لا على الورق.⁩(色は紙の上ではなくパレットでまぜよう)"],
 ["الطين","アッティーン","粘土","形を自由に作れるやわらかい土。授業では ⁧شكل الطين على هيئة وعاء صغير.⁩(粘土で小さなお皿の形を作ろう)"],
 ["المنحوتة","アルマンフータ","彫刻","立体的に作った作品。授業では ⁧هذه المنحوتة مصنوعة من الحجر.⁩(この彫刻は石でできている)"],
 ["فن الطباعة","ファンヌ アッティバーア","版画","版を作ってインクで紙に写す方法。授業では ⁧بفن الطباعة يمكنك عمل نسخ كثيرة من صورة واحدة.⁩(版画では1つの絵からたくさん刷ることができる)"],
 ["التحفة الفنية","アットゥフファ アルファンニーヤ","傑作(名作)","とてもすぐれた作品。授業では ⁧الموناليزا تحفة فنية مشهورة.⁩(モナ・リザは有名な傑作だ)"],
 ["المعرض","アルマアラド","展覧会","作品を並べて見せる催し。授業では ⁧ستعرض أعمالنا في معرض المدرسة.⁩(私たちの作品は学校の展覧会に出る)"]]);
XBANK['sd-ar-b']={L:'ar',name:'情報・保健体育・音楽・美術の用語',tier:1,study:1,ids:["sd-ar-it1", "sd-ar-it2", "sd-ar-pe1", "sd-ar-pe2", "sd-ar-mu1", "sd-ar-mu2", "sd-ar-ar1", "sd-ar-ar2"],key:'sd-ar-b'};
SDL_MORE.ar=[{bank:'sd-ar-a',title:'数学・理科・社会・国語(くわしく)',sub:'各教科16語'},{bank:'sd-ar-b',title:'情報・保健体育・音楽・美術(くわしく)',sub:'各教科16語'}];
Object.keys(SDL_MORE).forEach(function(L){SDL_MORE[L].forEach(function(x){XBANK[x.bank].ids.forEach(function(u){XBANK_OF[u]=x.bank;});});});
