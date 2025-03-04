import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer';
import Header from './components/common/Header.js';
import { css, Style } from 'hono/css';
import type { Env } from 'hono';

const rootRenderer = jsxRenderer(async ({ children, title }) => {
  const c = useRequestContext<Env>();
  const session = c.get('session')
  const serverMessage = session?.serverMessage;

  // サーバーメッセージを表示したら削除
  if(serverMessage){
    delete session.serverMessage;
    await session.save();
    c.set('session', session);
  }

  const messageContainerClass = css`
    margin: 0.5rem 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    background-color: #cce5ff;
    color: #004085;
    border: 1px solid #b8daff;
    text-align: center;
    font-weight: bold;
  `;

  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <Style>
          {css`
            body {
              margin: 0;
            }

            main {
              padding: 10px;
            }
          `}
        </Style>
      </head>
      <body>
        <Header />
        {serverMessage && <div class={messageContainerClass}>{serverMessage}</div>}
        <main>{children}</main>
      </body>
    </html>
  );
});

export default rootRenderer;
