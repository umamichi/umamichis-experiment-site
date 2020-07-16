---
path: "/blog/2020-05-12"
date: "2020-05-12"
title: "Electron を Custom URL Scheme で起動する"
---

## やりたいこと

Custom URL Scheme から Electron を起動したい、値も渡したい

例えばブラウザで、 `itmss://music.apple.com/jp/album/i-g-y/617827654?i=617827657` にアクセスすると iTunes が起動し、特定のページに遷移する



これと同じことを実現したい

## 前提

+ Electron version v5.0
+ electron-builder v20.40.2

## 手順

### Mac

package.json の build に以下を追記する

```js
"build": {
    ...
    "protocols": {
      "name": "myApp IM URL",
      "schemes": [
        "my-appname"
      ]
    },
   ...
}
```

ビルド後に `.dmg` イメージからアプリケーションを Mac にインストールすることで、 URL Scheme から Electron を起動することができる

### Windows 

package.json の build に以下を追記する

```js
"build": {
    ...
    "nsis": {
      "include": "build/installer.nsh",
      "perMachine": true
    },
   ...
}
```

`build/installer.nsh` ファイルを追加する

```
!macro customHeader
	!system "echo '' > ${BUILD_RESOURCES_DIR}/customHeader"
!macroend

!macro preInit
	; This macro is inserted at the beginning of the NSIS .OnInit callback
	!system "echo '' > ${BUILD_RESOURCES_DIR}/preInit"
!macroend

!macro customInit
	!system "echo '' > ${BUILD_RESOURCES_DIR}/customInit"
!macroend

!macro customInstall
	!system "echo '' > ${BUILD_RESOURCES_DIR}/customInstall"

	DetailPrint "Register My AppName URI Handler"
	DeleteRegKey HKCR "My AppName"
	WriteRegStr HKCR "My AppName" "" "URL:My AppName"
	WriteRegStr HKCR "My AppName" "URL Protocol" ""
	WriteRegStr HKCR "My AppName" "EveHQ NG SSO authentication Protocol" ""
	WriteRegStr HKCR "My AppName\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
	WriteRegStr HKCR "My AppName\shell" "" ""
	WriteRegStr HKCR "My AppName\shell\Open" "" ""
	WriteRegStr HKCR "My AppName\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend

!macro customInstallMode
	# set $isForceMachineInstall or $isForceCurrentInstall
	# to enforce one or the other modes.
!macroend

```

ビルド後、 Setup ファイルからインストールすることで、 URL Scheme から Electron を起動することができる


## Custom URI Scheme を Electron 側で取得する

### メインプロセス

Mac OS と Windows で書き方が違う

```js
  // for Mac OS
  app.on('open-url', (e, url) => {
    // URL Scheme から開いたときにここが実行される
    webContents.send('customUri', url);
  });

  // アプリの二重起動を防ぐ（for windows）
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) { // すでにウィンドウを開いていた場合、新しい window は quit
    app.quit();
  } else {
    // 2つめのウィンドウが開かれた時のイベントを定義する
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // mainWindow.webContents.send('log', 'second instance!!');

      commandLine.forEach(cmd => {
        // URIスキームのみを探して、レンダラプロセスに送る
        if (/my-appname:\/\//.test(cmd)) {
          mainWindow.webContents.send('customUri', cmd);
        }
      });

      // すでにメインウィンドウがある場合、それにフォーカスする
      if (mainWindow) {
        if (mainWindow.isMinimized()) { // 最小化してた場合
          mainWindow.restore(); // restore
        }
        mainWindow.focus(); // フォーカス
      }
    });
  }

``` 

### レンダラプロセス

```js
/**
 * custom uri をメインプロセスから受け取る
 */
ipcRenderer.on('customUri', (event, uri) => {
  console.log('customUri:', uri);
});
```


## 参考

http://chords.hatenablog.com/entry/2016/02/22/Electron%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0URI%E3%81%A7%E8%B5%B7%E5%8B%95%E3%81%99%E3%82%8B

https://electronjs.org/docs/all#apprequestsingleinstancelock
