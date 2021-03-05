# TODO-TEAM

## 開発セットアップ

### 0. env ファイルの用意

```shell
cp .env.template .env
```

[Prisma](https://www.prisma.io/docs/concepts/database-connectors/postgresql)のドキュメントをみて、自分オリジナルの env を作ろう

### 1. asdf(必須)

- [asdf](https://github.com/asdf-vm/asdf) + [asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs) を使用してインストール<details><summary>インストール方法詳細</summary><pre>
  \$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.8
  </pre><pre>
  // bash
  $ echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bash_profile
  $ echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bash_profile
  $ source ~/.bash_profile
  <br />// zsh
  % echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.zprofile
  % source ~/.zprofile
  </pre><pre>
  $ brew install coreutils
  $ brew install gpg
  </pre><pre>
  $ asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git
  $ bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
  </pre><pre>
  // example
  $ asdf install nodejs 14.15.4
  $ asdf global nodejs 14.15.4
  $ asdf reshim nodejs
  </pre>
  </details>

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
