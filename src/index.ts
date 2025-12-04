import { Hono } from 'hono'
import indexApp from './routes/index.tsx'
import { sessionMiddleware } from './session.ts'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import rootRenderer from './renderer.tsx'
import { compress } from 'hono/compress'
import { ORIGIN, PORT } from './constant.ts'
import { csrf } from 'hono/csrf'
import { t } from './i18n/index.ts'
import { i18nMiddleware } from './i18n/middleware.ts'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

app.use(logger());
app.use('/public/*', serveStatic({ root: './' }));
app.use(compress())
app.use(
  secureHeaders({
    referrerPolicy: 'strict-origin-when-cross-origin',
  })
);
app.use(i18nMiddleware);
// Additional CSP
app.use(async (c, next) => {
  c.header(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );
  await next();
});
app.use(csrf({ origin: ORIGIN }));
app.use(sessionMiddleware);
app.use(rootRenderer);
app.route('/', indexApp);

app
  .notFound((c) => {
    c.status(404);
    return c.render(t(c, 'notFound.message'), {
      title: t(c, 'notFound.title'),
    });
  })
  .onError((err, c) => {
    console.error(err);
    c.status(500);
    return c.render(t(c, 'error.message'), {
      title: t(c, 'error.title'),
    });
  });

export default app;