# Babel Flight — iPhone アプリ

ウェブ版と同じページ(`app/babel-flight/parts`)を、Capacitor で iPhone アプリにしたものです。
Mac がなくても、GitHub の Mac(GitHub Actions、公開リポジトリなら無料)でビルドと提出ができます。

## しくみ

| 場所 | 役割 |
|---|---|
| `app/babel-flight/parts/a0_env.js` | アプリの中かどうか(`BF_APP`)、サーバーの場所(`BF_API`)、ログインの合鍵(`bfFetch`) |
| `app/babel-flight/parts/f20_native.js` | アプリだけの機能: 毎日のリマインド、振動、左端スワイプで戻る、オフライン表示、共有、AI送信の同意 |
| `app/src/lib/http.server.ts` | サーバー側: アプリ(`capacitor://localhost`)からの通信を許可、Cookie の代わりに Bearer トークン |
| `ios-app/scripts/build-www.mjs` | ページを組み立てて `www/` に入れる(フォントもアプリに同梱) |
| `ios-app/scripts/configure-ios.rb` | Xcode プロジェクトの設定(アイコン、Appleでサインイン、Info.plist、プライバシー) |
| `ios-app/resources/` | アイコン、起動画面、プライバシーマニフェスト |
| `.github/workflows/ios.yml` | クラウドでのビルド・確認・アップロード |

`ios/` フォルダは毎回クラウドで作り直すので、リポジトリには入れていません。変えたい設定は
`configure-ios.rb` に書きます。

App Store 版は無料版です。搭乗クラス(課金)の画面は、テスト用アカウントでもアプリでは出ません。

## 毎回のビルド(自動)

`ios-app/` か `app/` を更新して GitHub に反映すると、自動で次のことをします。

1. サーバーのコードの型チェック
2. iPhone シミュレーター用にビルドして、起動したときの画面を撮影
3. App Store 用のスクリーンショット(6.9インチ、1320×2868)を撮影

結果は `ios-ci` ブランチに保存されます(`launch.png`、`store/*.png`、`summary.txt`)。

## はじめて提出するまでの準備(Apple Developer 登録のあと)

### 1. Apple Developer(お父さんのアカウント)
1. [developer.apple.com](https://developer.apple.com/programs/enroll/) で登録(年99ドル)。個人で登録すると、
   **App Store の「販売元」に登録した人の本名が表示されます**。
2. 「Certificates, Identifiers & Profiles」→「Identifiers」→ App ID を作る
   - Bundle ID: `io.github.yoshiusagi.babelflight`
   - Capabilities: **Sign in with Apple** にチェック
3. 「Membership」で **Team ID**(英数字10文字)を確認。

### 2. App Store Connect
1. [appstoreconnect.apple.com](https://appstoreconnect.apple.com) →「マイApp」→「＋」→ 新規App
   - 名前: Babel Flight / 言語: 日本語 / Bundle ID: 上で作ったもの / SKU: `babelflight1`
2. 「ユーザとアクセス」→「統合」→「App Store Connect API」→ キーを作成
   - アクセス: **Admin**(クラウドで証明書を作るのに必要)
   - **Key ID**、**Issuer ID**、ダウンロードした **.p8 ファイル**を控える(.p8 は1回しかダウンロードできません)

### 3. Firebase(ログイン)
1. [Firebase コンソール](https://console.firebase.google.com) → プロジェクト `babel-flight` →「アプリを追加」→ iOS
   - Apple バンドル ID: `io.github.yoshiusagi.babelflight`
   - **GoogleService-Info.plist** をダウンロード
2. 「Authentication」→「Sign-in method」→ **Apple** を有効にする。
   アカウント削除のときに Apple との連携も解除できるよう、「OAuth コードフローの構成」に
   Services ID・Team ID・キーも入れておくのがおすすめ(Apple の審査ルール 5.1.1(v))。

### 4. GitHub の Secrets
リポジトリの「Settings」→「Secrets and variables」→「Actions」→「New repository secret」で登録:

| 名前 | 中身 |
|---|---|
| `APPLE_TEAM_ID` | Team ID |
| `APP_STORE_CONNECT_KEY_ID` | API キーの Key ID |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID |
| `APP_STORE_CONNECT_KEY` | .p8 ファイルの中身をそのまま(`-----BEGIN PRIVATE KEY-----` から最後まで) |
| `GOOGLE_SERVICE_INFO_PLIST` | GoogleService-Info.plist の中身をそのまま |

### 5. アップロード
「Actions」→「iPhone app」→「Run workflow」→「App Store Connect にアップロードする」にチェック → Run。
15〜30分で App Store Connect の「TestFlight」にビルドが届きます。自分の iPhone の TestFlight アプリで
動作を確認してから、審査に出します(`STORE.md` に入力する内容があります)。

## サーバーの公開
アプリはウェブ版と同じサーバー(babel-flight.higgsfield.app)を使います。`app/src` の変更は Higgsfield にも
反映(デプロイ)してから、アプリを提出してください。
