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
- Amazonの購入履歴を1996年まで遡ってインポートを実行します
- 最初はゆっくりですが、ちょっと待つと勢い良く通知が出ると思います
- 終わりのタイミングの通知とかは特に出ません

[![https://gyazo.com/50499dec6b002b700056f8b4338f4460](https://i.gyazo.com/50499dec6b002b700056f8b4338f4460.gif)](https://gyazo.com/50499dec6b002b700056f8b4338f4460)
