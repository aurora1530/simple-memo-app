import { jsxRenderer } from 'hono/jsx-renderer';
import Header from './components/common/Header.js';
import { css, Style } from 'hono/css';

const rootRenderer = jsxRenderer(({ children, title }) => {
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
        <main>{children}</main>
      </body>
    </html>
  );
});

export default rootRenderer;
