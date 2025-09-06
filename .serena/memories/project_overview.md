# Project Overview

- Name: Simple Memo App
- Purpose: A simple memo application built with Hono + Prisma. Users can register/login, create/edit/delete memos, restore from trash, permanently delete, and share memos via tokenized links. Memo title and body are encrypted at rest via iron-webcrypto and decrypted on render.
- Runtime: Node.js (TypeScript, ESNext modules)
- Host: Linux (Docker Compose dev environment with Postgres)

## Tech Stack
- Server framework: Hono (with JSX SSR: `hono/jsx-renderer`)
- DB/ORM: Prisma (PostgreSQL). Models: `User`, `Memo`
- Auth/session: `iron-session`
- Encryption/MAC: `iron-webcrypto` + `uncrypto` (seal/unseal of memo title/body)
- Validation: Zod + `@hono/zod-validator`
- Styling: `hono/css` (generates classNames + <Style/>)
- Build/dev: `tsx`, `typescript`
- Docker: Dev/Prod Dockerfiles + Compose

## Key Features
- User auth: register, login, logout, change password
- Memo lifecycle: list (paginated), create, edit, soft delete, trash list, restore, permanent delete
- Memo sharing: generate share link with token; public view via `/share/view/:token`
- CSRF: Hono csrf({ origin }) + Origin header (sample script adjusted)
- Headers: secure headers + compress
- i18n: custom middleware detects `?lang`, cookie, Accept-Language; dictionary (ja/en); UI texts localized
- Search: `/memo/search` server-side (decrypt then filter), capped to top 50 results for responsiveness

## Code Structure (rough)
- `src/index.ts`: App bootstrap, middlewares (logger, static, compress, secure-headers, csrf, session, i18n), root routing, error handlers
- `src/renderer.tsx`: Root HTML layout (Header/Footer/Style), message banner, modal injection, i18n script injection
- `src/routes/`
  - `index.tsx`: Home, forbidden, healthCheck
  - `auth/`: register/login/logout/changePassword + validation
  - `memo/`: list/pagination, create/edit/delete/trash/restore/view/share, search
  - `profile/`: profile screen
  - `share/`: public memo view via token
- `src/components/`: Header/Footer/common styles, memo components (List/Form/View/Share), auth forms, profile
- `src/lib/`: auth password (argon2), memo seal/unseal helpers, token helpers
- `src/utils/`: date formatting, grapheme counting
- `public/`: client scripts for delete/restore/share/modal/common fadeouts
- `prisma/`: `schema.prisma` (User/Memo), migrations dir
- `sample/`: data seeding script (db:sample)

## Data Model (Prisma)
- `User { id, username, passwordHash, Memo[] }`
- `Memo { id, userId, title, body, createdAt, updatedAt(@updatedAt), deleted(Boolean), shareToken(String?) }`

## Security/Headers
- `secure-headers` with `referrerPolicy: strict-origin-when-cross-origin`
- CSRF: `csrf({ origin: ORIGIN })` with proper `Origin` handling in sample script
- `iron-session` cookie options set (httpOnly, sameSite Lax, secure in prod)
- CSP header present (simple default, allows 'unsafe-inline' currently)

## i18n
- Custom middleware: detects language via `?lang`, cookie `lang`, or `Accept-Language`; sets `c.set('language', ...)`
- `t(c, key)` used across server-rendered views and injected into `window.__I18N__` for client confirms/alerts

## Pagination
- Server-side pagination for `/memo` and `/memo/trash` via `page`/`perPage` (default 20, max 50); numbered nav with First/Prev/Next/Last.

## Search
- `/memo/search`: decrypts current user's non-deleted memos and filters by keyword (title/body), lowercased; returns first 50 results

## Notable Decisions
- Share tokens are currently stored in plaintext (`shareToken`), not hashed (migration would be required to change).
- Infinite scroll removed in favor of robust pagination (layout stability and simplicity).
