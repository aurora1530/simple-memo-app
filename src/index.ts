import { serve } from '@hono/node-server'
import { type Env, Hono } from 'hono'
import indexApp from './routes/index.js'
import { sessionMiddleware } from './session.js'
import { logger } from 'hono/logger'
import { serveStatic } from '@hono/node-server/serve-static'
import { secureHeaders } from 'hono/secure-headers'
import rootRenderer from './renderer.js'

const app = new Hono<Env>()

app.use(logger());
app.use('/public/*', serveStatic({ root: './' }));
app.use(secureHeaders());
app.use(sessionMiddleware);
app.use(rootRenderer);
app.route('/', indexApp);

app
  .notFound((c) => {
    c.status(404);
    return c.render('ページが見つかりませんでした。code: 404', {
      title: '404 Not Found',
    });
  })
  .onError((err, c) => {
    console.error(err);
    c.status(500);
    return c.render('エラーが発生しました。code: 500', {
      title: '500 Internal Server Error',
    });
  });

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
