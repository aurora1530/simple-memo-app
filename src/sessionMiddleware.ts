import type { Context, Env } from 'hono';
import { env } from 'hono/adapter';
import { createMiddleware } from 'hono/factory';
import { getIronSession, type IronSession } from 'iron-session';

type SessionData = {
  serverMessage?: string;
} & (
  | {
      isLogin: false;
    }
  | {
      isLogin: true;
      username: string;
      userID: number;
    }
);

export type Session = IronSession<SessionData>;

export const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await getIronSession<SessionData>(c.req.raw, c.res, {
    cookieName: 'session',
    password: env<{ SESSION_PASSWORD: string }>(c).SESSION_PASSWORD,
  });

  // 初期化。isLoginがUndefinedの場合が最初はあるので、falseにする
  if (!session.isLogin) {
    session.isLogin = false;
  }

  c.set('session', session);
  await next();
  await session.save();
});

export type LoginedEnv = Env & {
  Variables: {
    session: Session & {
      isLogin: true;
    };
  };
};

export const ensureLoginedMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = c.get('session');
  if (!session.isLogin) {
    return c.redirect('/auth/login');
  }

  await next();
});
