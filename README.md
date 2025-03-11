# Simple Memo App

Hono+Prisma(postgres)を使ったシンプルなメモアプリ

[iron-webcrypto](https://github.com/brc-dd/iron-webcrypto)を使ってメモのタイトルと本文を暗号化（+MAC付与）して保存する。

## Setup

```
npm install
npm run dev
```

```
open http://localhost:3000
```

it needs to create `.env` file in the root directory.
Set these environment variables in `.env` file.

```
DATABASE_URL=${file path to SQLite database}
SESSION_PASSWORD=${session password. it needs at least 32 characters}
DB_ENCRYPT_PASSWORD=${password for encrypting memo title and body}
```

## License
MIT
