# TODO-TEAM

## 開発セットアップ

### 0. env ファイルの用意

```shell
cp .env.template .env
```

[Prisma](https://www.prisma.io/docs/concepts/database-connectors/postgresql)のドキュメントをみて、自分オリジナルの env を作ろう

### 1. volta(必須)

- [volta](https://volta.sh/)

```shell
# install volta
curl https://get.volta.sh | bash

# pathの読み込み
exec $SHELL -l

# install Node
volta install node
```

- [公式サイト](https://nodejs.org/) からダウンロードしてインストール

### 2. docker-compose

```shell
docker-compose up -d
```

### 3. 依存ライブラリのインストール(必須)

```shell
npm ci
```

### 4. prisma ライブラリの作成(必須)

```shell
npx prisma generate
```

### ex. prisma studio

Prisma Studio の GUI アプリ。
`schema.prisma` を select すれば定義された DB にアクセスが可能で、Prisma 経由で更新作業などを行うことができる。

[Prisma Studio App](https://github.com/prisma/studio/releases)

## 推奨開発環境

- VSCode

共有の開発設定を共有できる `.vscode/` を定義しているため。
formatting や拡張なども自動でインストールできるため推奨。
vimmer の方は[Vim の拡張](https://marketplace.visualstudio.com/items?itemName=vscodevim.vi)があります。

## 開発

### 開発サーバを起動

```shell
npm run start
```

### テスト

```shell
npm run test
```

### マイグレーション

```shell
npm run migrate
```
