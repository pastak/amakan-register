# amakan-register

Chrome Extension for register amakan.net

## Install

- `$ git clone git@github.com:pastak/amakan-register.git`
- `$ cd amakan-register`
- `$ npm install`
- `$ gulp build`
- `chrome://extensions/`で `app` ディレクトリを読み込む

## Usage

### 特定の書籍を読んだことにしたい

- その書籍のページに行って、ツールバーに表示されているボタンを押すと登録されます

### 購入履歴からインポートしたい

- 購入履歴ページ ( https://www.amazon.co.jp/gp/css/order-history )に行きます
- ツールバーに表示されているボタンをクリックすると、登録開始されます。
- 「過去6ヶ月」を表示している場合は6ヶ月分、各年間分などを表示している場合はそれの範囲で全件の登録を試みます

(旧版のスクリーンキャストなので現在は挙動が異なります）
[![https://gyazo.com/eeff5ca87aff50c74083fc6ad07b3b9d](https://i.gyazo.com/eeff5ca87aff50c74083fc6ad07b3b9d.gif)](https://gyazo.com/eeff5ca87aff50c74083fc6ad07b3b9d)

