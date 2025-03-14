import { css, Style } from 'hono/css';
import type { FC } from 'hono/jsx';
import { useRequestContext } from 'hono/jsx-renderer';

const Header: FC = async () => {
  const c = useRequestContext();
  const session = c.get('session');

  const headerClass = css`
    background-color: #f0f0f0;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 1000;
  `;

  return (
    <header class={headerClass}>
      <Style>
        {css`
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          /* 左上のロゴ用スタイル */
          .logo {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
            text-decoration: none;
          }

          /* 右上の認証リンクまたはユーザー情報用スタイル */
          .auth-links {
            display: flex;
            gap: 15px;
            align-items: center;
          }

          nav a {
            text-decoration: none;
            color: #333;
          }

          nav a:hover {
            color: #007bff;
          }
        `}
      </Style>
      <nav>
        <div>
          <a href="/" className="logo">
            Simple Memo App
          </a>
        </div>
        <div className="auth-links">
          {session.isLogin ? (
            <>
              <a href="/profile">
                ログイン中: <strong>{session.user.name}</strong>
              </a>
              <a
                href="/auth/logout"
                onclick={`if (!confirm('ログアウトしますか？')) event.preventDefault();`}
              >
                ログアウト
              </a>
            </>
          ) : (
            <>
              <a href="/auth/register">新規登録</a>
              <a href="/auth/login">ログイン</a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
