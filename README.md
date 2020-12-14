# bond

## yarn コマンド

開発用サーバの起動

``` bash
yarn start
```

ビルド

```bash
yarn build
```

テスト実行

```bash
yarn test
```

## ブランチ説明

大まかに下記の3種類のブランチで開発を進めていく。
必要になった場合は相談の上、下記以外のブランチの作成を作成する。

- master: 製品最新版
- develop: 開発最新版
- feature/作業内容: 開発ブランチ 必ずdevelopから作成する

## ディレクトリ構成

```bash
├── public # buildの出力用ディレクトリ
│  
└── src # 開発用ディレクトリ
    ├── components # コンポーネントを配置するディレクトリ
    ├── layouts # 共通layoutコンポーネントを配置する
    ├── pages # viewを配置するディレクトリ, 配下のディレクトリ構成はroutesに合わせる
    └── routes # ルーティングファイルを配置する
    ├── store # reduxのstoreを配置するディレクトリ
```
