import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import indexApp from './routes/index.js'
import { sessionMiddleware } from './sessionMiddleware.js'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'
import { serveStatic } from '@hono/node-server/serve-static'
import { secureHeaders } from 'hono/secure-headers'

const app = new Hono()

app.use(logger());
app.use(serveStatic({ root: 'public' }));
app.use(secureHeaders());
app.use(csrf());
app.use(sessionMiddleware);
app.route('/', indexApp);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
