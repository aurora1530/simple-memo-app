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

const app = new Hono()

app.use(logger());
app.use('/public/*', serveStatic({ root: './' }));
app.use(compress())
app.use(
  secureHeaders({
    referrerPolicy: 'strict-origin-when-cross-origin',
  })
);
app.use(csrf({ origin: ORIGIN }));
app.use(sessionMiddleware);
app.use(rootRenderer);
app.route('/', indexApp);

app
  .notFound((c) => {
    c.status(404);
    return c.render('ページが見つかりませんでした。code: 404 Not Found', {
      title: '404 Not Found',
    });
  })
  .onError((err, c) => {
    console.error(err);
    c.status(500);
    return c.render('エラーが発生しました。code: 500 Internal Server Error', {
      title: '500 Internal Server Error',
    });
  });

serve({
  fetch: app.fetch,
  port: PORT,
}, () => {
  console.log(`Server is running on ${ORIGIN}`)
})
