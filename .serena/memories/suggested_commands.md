# Suggested Commands

## Run / Dev
- `npm install`
- `npm run dev` — start Hono server with tsx (`src/index.ts`), watches files
- Open: `http://localhost:3000`

## Build / Test
- `npm run build` — TypeScript compile to `dist`
- `npm test` — run Node test runner (node --test) for tests under `test/**/*.test.ts`
- `npx tsc --noEmit` — strict type-check

## Database / Prisma
- `npx prisma migrate dev` — apply migrations (dev)
- `npx prisma migrate reset` — reset DB (interactive; add `--force` in CI)
- `npx prisma studio` — open Prisma Studio
- `npm run db:sample` — run sample data seeding script (assumes server is up)
- `npm run db:dev-init` — reset + start dev server + seed (compose dev flow)

## Docker Compose
- `make dev` — compose up dev
- `make dev-build` — compose up with rebuild
- `make prod` — compose up prod
- `make prod-build` — compose up prod with rebuild

## Useful Linux/System
- `ls -la`, `find . -maxdepth 2 -type f`
- `grep -R "pattern" -n src` (if `rg` not available)
- `sed -n '1,200p' file.ts` — print file chunks

## Notes
- Set `.env` or `.env.production` appropriately (see README). Required: `DATABASE_URL`, `SESSION_PASSWORD`, `DB_ENCRYPT_PASSWORD`, `ORIGIN`.
- When using sample data seeding, ensure app is running and `Origin` header is accepted by CSRF.
