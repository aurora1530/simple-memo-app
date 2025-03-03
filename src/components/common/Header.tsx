import { type Env } from 'hono';
import type { FC } from 'hono/jsx';
import { useRequestContext } from 'hono/jsx-renderer';

const Header: FC = async () => {
  const c = useRequestContext<Env>();
  const session = c.get('session');

  return (
    <header>
      <link rel="stylesheet" href="components/header.css" />
      <nav>
        <div>
          <a href="/" className="logo">
            Simple Memo App
          </a>
        </div>
        <div className="auth-links">
          {session?.username ? (
            <>
              <span>
                user: <strong>{session.username}</strong>
              </span>
              <a href="/auth/logout">Logout</a>
            </>
          ) : (
            <>
              <a href="/auth/register">Register</a>
              <a href="/auth/login">Login</a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
