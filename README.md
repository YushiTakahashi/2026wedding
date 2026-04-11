# Web Invitation

`index.html` をブラウザでそのまま開ける、依存なしの Web 招待状たたき台です。

## 構成

- `index.html`: ページ骨格
- `styles.css`: ビジュアル、レイアウト、アニメーション
- `content.js`: 文言や日付、会場情報、タイムラインの編集ポイント
- `script.js`: セクション描画、RSVP プレビュー、ローカル保存、JSON 書き出し
- `script.js`: セクション描画、RSVP プレビュー、ローカル保存、Googleフォーム送信切替

## 反映済みのベース構造

- Hero
- ご挨拶
- ホスト紹介
- 当日の流れ
- 会場情報
- RSVP

## 次に差し替えやすい箇所

- 会場アクセス文言
- 当日の写真やキービジュアル
- RSVP の送信先
- 英語対応や多言語切替

## Googleフォーム連携

`content.js` の `googleForm` を埋めると、自作デザインのまま Googleフォームへ送信できます。

```js
googleForm: {
  enabled: true,
  action: "https://docs.google.com/forms/d/e/.../formResponse",
  submitTarget: "google-form-submit-frame",
  submitMessage: "送信ありがとうございました。",
  entries: {
    name: "entry.123456789",
    side: "entry.234567890",
    attendance: "entry.345678901",
    dietary: "entry.456789012",
    message: "entry.567890123",
  },
}
```

必要なのは以下です。

- Googleフォームの `formResponse` URL
- 各項目に対応する `entry.xxxxxxxx`

これは共有いただいた記事の流れどおり、公開フォームのHTMLソースから `form action` と各項目の `entry` 番号を拾えば設定できます。

今回の共有フォームでは、少なくとも以下が確認できました。

- `action`: `https://docs.google.com/forms/d/e/1FAIpQLSd54-q6vCQKv1NIOJdccAFiJDbcDC69Oqa_hNhVckd_KH237g/formResponse`
- `ゲスト様`: `entry.693435807`
- `お名前`: `entry.171815300`
- `フリガナ`: `entry.2021811141`
- `郵便番号(ハイフンなし)`: `entry.1654798255`
- `ご住所`: `entry.2006166490`
- `電話番号`: `entry.1537915464`
- `アレルギーはありますか？`: `entry.1254300178`
- `「あり」と回答した方`: `entry.32593815`
- `挙式`: `entry.1298471478`
- `披露宴`: `entry.1934073530`
