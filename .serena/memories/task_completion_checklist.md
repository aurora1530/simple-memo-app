# Task Completion Checklist

Use this checklist to validate changes before handing off:

- Build & Type Check
  - `npx tsc --noEmit` passes with no errors
  - `npm run build` compiles successfully

- Lint/Format (if applicable)
  - Ensure consistent import paths (`.js` extensions for ESM imports inside TS as configured)
  - Keep code style in line with existing patterns (Hono JSX + hono/css)

- Tests
  - Run `npm test` (node --test) and ensure added/affected tests pass
  - Add small unit tests when modifying core helpers (e.g., encryption, token, utils)

- Runtime Smoke Test
  - Start dev server: `npm run dev`
  - Exercise the affected endpoints/views
  - Verify session flash messages and i18n texts appear correctly
  - Confirm CSRF-protected routes work (Origin header present for non-form fetch in scripts)

- DB/Prisma
  - If schema changed, add and apply migration (`npx prisma migrate dev`)
  - Avoid breaking existing data unless explicitly approved

- Security & Headers
  - Check CSRF still enforced for state-changing requests
  - Confirm secure headers present; consider CSP impact if adding inline scripts

- Docs
  - Update README or internal docs if commands or behavior changed

- Scope Discipline
  - Keep changes minimal and focused on the task
  - Avoid refactors outside scope unless necessary (and call them out)
