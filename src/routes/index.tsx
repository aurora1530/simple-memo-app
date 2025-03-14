import { Hono } from 'hono';
import authApp from './auth/index.js';
import memoApp from './memo/index.js';
import { css } from 'hono/css';
import prisma from '../prisma.js';
import profileApp from './profile/index.js';
import shareApp from './share/index.js';

const indexApp = new Hono();

indexApp.route('/auth', authApp);
indexApp.route('/memo', memoApp);
indexApp.route('/profile', profileApp);
indexApp.route('/share', shareApp);

indexApp.get('/', (c) => {
  const session = c.get('session');

  const homeContainerClass = css`
    text-align: center;
    margin-top: 50px;
  `;

  const homeTitleClass = css`
    font-size: 3em;
    margin-bottom: 20px;
    color: #333;
  `;

  const homeDescriptionClass = css`
    font-size: 1.2em;
    margin-bottom: 30px;
    color: #555;
  `;

  const homeLinksClass = css`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
  `;

  const homeButtonClass = css`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s;
    &:hover {
      background-color: #0056b3;
    }
  `;
  return c.render(
    <>
      <div class={homeContainerClass}>
        <h1 class={homeTitleClass}>Simple Memo App</h1>
        <p class={homeDescriptionClass}>極めてシンプルなメモアプリ。</p>
        <div class={homeLinksClass}>
          {session.isLogin ? (
            <a class={homeButtonClass} href="/memo">
              メモ一覧
            </a>
          ) : (
            <>
              <a class={homeButtonClass} href="/auth/register">
                新規登録
              </a>
              <a class={homeButtonClass} href="/auth/login">
                ログイン
              </a>
            </>
          )}
        </div>
      </div>
    </>,
    {
      title: 'Simple Memo App',
    }
  );
});

indexApp.get('/forbidden', (c) => {
  return c.render(
    <>
      <h1>アクセスが許可されていません</h1>
    </>,
    {
      title: 'Forbidden',
    }
  );
});

indexApp.get('/healthCheck', async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;

    return c.json(
      {
        status: 'ok',
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        status: 'ng',
      },
      503
    );
  }
});

export default indexApp;
