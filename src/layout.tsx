import type { Context, Env } from 'hono';
import type { PropsWithChildren } from 'hono/jsx';

interface LayoutProps {
  c: Context<Env>;
  title: string;
}

export const Layout = ({ c, title, children }: PropsWithChildren<LayoutProps>) => {
  const session = c.get('session');
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />
        <title>{title}</title>
      </head>
      <body>
        <header>
          <nav>
            <div><a href="/">Home</a></div>
            {session?.username ? (
              <>
                <p>UserName: {session.username}</p>
                <a href="/auth/logout">Logout</a>
              </>
            ) : (
              <>
                <div><a href="/auth/register">Register</a></div>
                <div><a href="/auth/login">Login</a></div>
              </>
            )}
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
};
