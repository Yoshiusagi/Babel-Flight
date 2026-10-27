# App Store に入力する内容(Babel Flight 1.0)

App Store Connect の各欄にそのまま貼れるようにしてあります。文字数はすべて上限内です。

## 基本情報

| 項目 | 入力する内容 |
|---|---|
| 名前(30文字まで) | Babel Flight |
| サブタイトル(30文字まで) | フライト気分で学ぶ4か国語 |
| カテゴリ | プライマリ: 教育 / セカンダリ: 旅行 |
| 価格 | 無料 |
| プライバシーポリシーURL | https://babel-flight.higgsfield.app/privacy |
| マーケティングURL | https://babel-flight.higgsfield.app |
| サポートURL | **(決める)** 連絡先がわかるページが必要です |
| 著作権 | © 2026 Yoshinari Toi |
| 配信地域 | まずは**日本のみ**がおすすめ(EUに出すと「トレーダー情報」として住所・電話番号の公開を求められることがあるため) |

## プロモーションテキスト(170文字まで・審査なしでいつでも変えられる)

日本から世界へ。韓国語・英語・スペイン語・イタリア語を、フライトをテーマにした問題形式で。旅行の会話から、パイロットや看護師など仕事で使う言葉、留学の授業の用語まで学べます。

## 説明(4000文字まで)

Babel Flight は、日本から海外へ飛び出して、自分の得意分野で活躍したい人のための語学アプリです。
レッスンはすべて問題形式。1回約3分のフライトで、世界の都市をめぐりながら言葉を覚えます。

■ 学べる言語
・韓国語(ソウル行き)
・英語(ニューヨーク行き)—イギリス英語とアメリカ英語の違いも
・スペイン語(マドリード行き)
・イタリア語(ローマ行き)

■ 3つのモード
・日常会話モード:あいさつ、買い物、入国審査、ホテル、レストラン、トラブルのときの会話
・職業モード:パイロット、客室乗務員、医療、IT、ビジネス、料理人、美容師など13の職業の専門用語
・留学モード:授業で使う数学・理科・社会の用語

■ 続けやすいしくみ
・世界地図のルートマップで、進み具合がひと目でわかる
・正答率に合わせて、苦手なところから出題
・復習フライトと弱点コース
・マイルがたまると、航空会社のようなステータスが上がる
・1日の目標と、毎日のリマインド(時間は自分で選べます)
・電波がない機内でも、レッスンと復習ができます

■ AI機能(ログインした人だけ・無料・1日の回数に上限あり)
・AIに質問:「なぜこう言うの？」をその場で聞ける
・AI管制官:パイロットになりきって、AIの管制官と英語で交信
・AIの例文練習

■ アカウント(任意)
Apple・Google・メールアドレスでログインすると、iPhone とパソコンで進み具合を同期できます。ログインしなくても使えます。アカウントは「記録」画面からいつでも削除できます。

## キーワード(100文字まで・カンマ区切り)

韓国語,英語,スペイン語,イタリア語,語学,英会話,旅行,留学,パイロット,航空,単語,フレーズ,発音,外国語,勉強

## スクリーンショット

6.9インチ(1320×2868)が必須です。クラウドビルドが毎回 `ios-ci` ブランチの `store/` に撮っています。
実機の TestFlight で撮り直したものに差し替えると、より本物らしくなります。

## App Review に関する情報(審査メモ・英語)

```
Babel Flight is a free language-learning app (Korean, English, Spanish, Italian) with quiz-style lessons
themed around flights. All lessons work without an account and offline.

Sign-in is optional (Sign in with Apple, Google, or email). It syncs progress between devices and enables
the AI features (Ask AI, AI air traffic controller, AI example sentences), which use Anthropic's Claude API
through our server. Before anything is sent to the AI for the first time, the app shows what will be sent
and asks for consent. Names, email addresses and user IDs are never sent to the AI.

Demo account (email sign-in): Record tab (記録) > Account > ログイン / 新規登録 > メールアドレスで続ける
  email:    (demo account email)
  password: (demo account password)

Account deletion: Record tab (記録) > Account > アカウントを削除.
Daily reminder notifications are optional (Record tab > App) and are scheduled on the device only.
No ads, no tracking, no in-app purchases.
```

**デモアカウント**:審査の人が使うためのメールアドレスのアカウントを1つ作って、上の欄に入れてください
(テスト用アカウントとは別のもの)。

## 年齢制限(質問票)

正直に答えればOKです。暴力・性的な内容・ギャンブルなどはすべて「なし」。
「ユーザー生成コンテンツ / AI との会話」のような質問には「あり」(AIに質問・AI管制官)。
「制限のないWebアクセス」は「なし」(開くのはプライバシーポリシーとクレジットのリンクだけ)。

## App のプライバシー(データの収集)

| データの種類 | 用途 | ユーザーにリンク | トラッキング |
|---|---|---|---|
| 連絡先情報 > メールアドレス | Appの機能(ログイン) | はい | いいえ |
| ID > ユーザーID | Appの機能(同期) | はい | いいえ |
| その他のデータ(学習の記録・設定) | Appの機能(同期) | はい | いいえ |
| ユーザコンテンツ > その他(AIへの質問・返事の文章) | Appの機能 | いいえ | いいえ |
| 使用状況データ > 製品の操作(開いた日・言語・モード) | アナリティクス | いいえ | いいえ |

## 輸出コンプライアンス
暗号化は HTTPS だけなので、アプリ側で「使用していない」と設定済みです(`ITSAppUsesNonExemptEncryption = NO`)。
