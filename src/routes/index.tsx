import { type Env, Hono } from 'hono';
import authApp from './auth/index.js';
import memoApp from './memo/index.js';

const indexApp = new Hono<Env>();

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
