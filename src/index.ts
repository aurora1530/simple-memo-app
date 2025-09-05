import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import indexApp from './routes/index.js'
import { sessionMiddleware } from './session.js'
import { logger } from 'hono/logger'
import { serveStatic } from '@hono/node-server/serve-static'
import { secureHeaders } from 'hono/secure-headers'
import rootRenderer from './renderer.js'
import { compress } from 'hono/compress'
import { ORIGIN, PORT } from './constant.js'
import { csrf } from 'hono/csrf'
import { t } from './i18n/index.js'
import { i18nMiddleware } from './i18n/middleware.js'

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

serve({
  fetch: app.fetch,
  port: PORT,
}, () => {
  console.log(`Server is running on ${ORIGIN}`)
})
