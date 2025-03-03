import { type Env, Hono } from 'hono';
import { Layout } from '../layout.js';
import authApp from './auth/index.js';
import memoApp from './memo/index.js';
import { jsxRenderer } from 'hono/jsx-renderer';
import Header from '../components/common/Header.js';

const indexApp = new Hono<Env>();

indexApp.use(
  jsxRenderer(({ children, title }) => {
    return (
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="style.css" />
          <title>{title}</title>
        </head>
        <body>
          <Header />
          {children}
        </body>
      </html>
    );
  })
);

indexApp.route('/auth', authApp);
indexApp.route('/memo', memoApp);

indexApp.get('/', (c) => {
  return c.render(
    <h1>This is Simple Memo App</h1>,
    {
      title: 'Home',
    }
  );
});

export default indexApp;
