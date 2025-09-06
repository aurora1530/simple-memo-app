# Style and Conventions

- Language: TypeScript (ESNext modules, `"type": "module"`)
- TS config: `target: ESNext`, `module: NodeNext`, `strict: true`, `jsx: react-jsx`, `jsxImportSource: hono/jsx`
- SSR: JSX via Hono. Components written as FC returning JSX. Use `useRequestContext()` only inside component functions (not at module top level).
- CSS: `hono/css` `css`/`cx` utilities with `<Style/>` in layout. Avoid nesting grids within loaded fragments.
- Routing: Hono `Hono` instances per area; sub-routing via `app.route(...)`.
- Validation: Zod schemas with `@hono/zod-validator`; return `c.render` with error message list when invalid.
- Sessions: Use `iron-session`; set `cookieOptions` explicitly (`httpOnly`, `sameSite: 'lax'`, `secure` in prod).
- Encryption: Use `seal(c, data)` and `unseal(c, data)` helpers; never store raw memo content in DB.
- i18n: Use `t(c, key, params?)` for texts; for client-side confirms use `window.__I18N__` injected in `<head>`.
- Pages: Render via `c.render(children, { title, modal? })`; errors: centralized in `index.ts` `.notFound`/`.onError`.
- Pagination: Implement with `page/perPage` params; avoid client-side infinite scroll for primary flows.
- Sharing: Generate token via `createToken()`; current schema stores plaintext token in `shareToken`.
- Security: `csrf({ origin: ORIGIN })` and `secure-headers`; CSP present but includes `'unsafe-inline'` (consider tightening if feasible).
- Naming: PascalCase for components, camelCase for functions/variables, SCREAMING_SNAKE_CASE for constants.
- Comments/Doc: Keep comments concise, explain non-obvious logic and security rationale.
