# Simple Memo App

Hono+Prisma(SQLite)を使ったシンプルなメモアプリ

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
DB_SEAL_PASSWORD=${password for encrypting memo title and body}
```

## License
MIT