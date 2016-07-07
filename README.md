




Moved https://github.com/amakan/amakankan






# amakan-register

Chrome Extension for register amakan.net

[![https://gyazo.com/9818b330fe1c97867013745e7ad3d671](https://i.gyazo.com/9818b330fe1c97867013745e7ad3d671.gif)](https://gyazo.com/9818b330fe1c97867013745e7ad3d671)

## Install

### Chrome for Windows Stable チャンネル以外の方

- https://github.com/pastak/amakan-register/releases にアクセス
- 最新のリリースに添付されている`amakankan.crx` をダウンロード
- chrome://extensions/ を開く
- ダウンロードしたファイルをドラッグアンドドロップするとインストールできます

WindowsのStableチャンネルではこの方法ではインストール出来ないはず・・・

### 全ての方向け

- `$ git clone git@github.com:pastak/amakan-register.git`
- `$ cd amakan-register`
- `$ npm install`
- `$ gulp build`
- `chrome://extensions/`で `app` ディレクトリを読み込む

## Usage

### 特定の書籍のamakan詳細ページを開きたい

- その書籍のページに行って、ツールバーに表示されているボタンを押すとamakanのページが開きます

### 購入履歴からインポートしたい

- 購入履歴ページ ( https://www.amazon.co.jp/gp/css/order-history )に行きます
- ツールバーに表示されているボタンをクリックすると、登録開始されます。
- Amazonの購入履歴を1996年まで遡ってインポートを実行します
- 最初はゆっくりですが、ちょっと待つと勢い良く通知が出ると思います
- 終わりのタイミングの通知とかは特に出ません
