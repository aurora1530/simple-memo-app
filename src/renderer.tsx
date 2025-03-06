import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer';
import Header from './components/common/Header.js';
import { css, Style } from 'hono/css';
import type { Env } from 'hono';
import Footer from './components/common/Footer.js';
import { createButtonClass } from './components/common/style.js';
import { redColorSet } from './components/common/color.js';

const rootRenderer = jsxRenderer(async ({ children, title, modal }) => {
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

  const modalClass = css`
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; /* モーダルが画面より大きい場合にスクロール */
    background-color: rgba(0, 0, 0, 0.5);
  `;

  const modalContentClass = css`
    background-color: #fff;
    margin: 10% auto;
    padding: 20px;
    max-width: 500px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    cursor: auto;
  `;

  const modalChildrenClass = css`
    margin-bottom: 1rem;
  `;

  const closeButtonClass = createButtonClass(redColorSet);

  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <Style>
          {css`
            html,
            body {
              margin: 0;
              padding: 0;
              height: 100%;
            }

            body {
              display: flex;
              flex-direction: column;
            }

            main {
              flex: 1;
              padding: 10px;
            }
          `}
        </Style>
      </head>
      <body>
        <Header />
        {serverMessage && <div class={messageContainerClass} id="server-message">{serverMessage}</div>}
        <main>{children}</main>
        <Footer />

        {modal && (
          <div id="modal" class={modalClass} onclick="closeModalOnBackground(event)">
            <div class={modalContentClass} onclick="event.stopPropagation()">
              <h2>{modal.title}</h2>
              <div class={modalChildrenClass}>{modal.children}</div>
              <button class={closeButtonClass} onclick="closeModal()">
                閉じる
              </button>
            </div>
          </div>
        )}
        <script src="/public/common.js"></script>
        {modal && <script src="/public/modal.js"></script>}
      </body>
    </html>
  );
});

export default rootRenderer;
