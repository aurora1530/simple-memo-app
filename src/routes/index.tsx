import { type Env, Hono } from 'hono';
import { Layout } from '../layout.js';
import authApp from './auth/index.js';
import memoApp from './memo/index.js';

const indexApp = new Hono<Env>();

indexApp.route('/auth', authApp);
indexApp.route('/memo', memoApp);

indexApp.get('/', (c) => {
  return c.html(
    <Layout c={c} title="Home">
      <h1>Hello World!</h1>
      <div>
        <div>
          <a href="/auth/register">サインアップ</a>
        </div>
        <div>
          <a href="/auth/login">サインイン</a>
        </div>
      </div>
    </Layout>
  );
});

export default indexApp;
