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
- また、次のページが存在する場合は、次のページに遷移するかどうかを尋ねるウィンドウ、が表示されます。このとき、Yesを選択すると自動で次のページに遷移します
  - ただし、取り込みが自動で開始されるわけではないので、ページ遷移後にもう一度ボタンをクリックする必要があります

※Kindle版のみが取り込み対象になります
  
[![https://gyazo.com/eeff5ca87aff50c74083fc6ad07b3b9d](https://i.gyazo.com/eeff5ca87aff50c74083fc6ad07b3b9d.gif)](https://gyazo.com/eeff5ca87aff50c74083fc6ad07b3b9d)

