import { env } from 'hono/adapter';
import { createMiddleware } from 'hono/factory';
import { getIronSession, type IronSession } from 'iron-session';

type UserData = {
  id: number;
  name: string;
};

type SessionData = {
  serverMessage?: string;
} & (
  | {
      isLogin: false;
      user: undefined;
    }
  | {
      isLogin: true;
      user: UserData;
    }
);

export type Session = IronSession<SessionData>;

/**
 * セッションを取得/新たに作成するMiddleware
 * Contextに`session`という名前でセッションをセットする
 */
export const sessionMiddleware = createMiddleware(async (c, next) => {
  const session = await getIronSession<SessionData>(c.req.raw, c.res, {
    cookieName: 'session',
    password: env<{ SESSION_PASSWORD: string }>(c).SESSION_PASSWORD,
    cookieOptions: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    },
  });

  // 初期化。isLoginがUndefinedの場合が最初はあるので、falseにする
  if (!session.isLogin) {
    session.isLogin = false;
  }

  c.set('session', session);
  await next();
});

/**
 * sessionオブジェクトにログアウト状態をセットする。
 * session.save()はこの関数内では行わない。
 */
export const setLogoutToSession = async (session: Session) => {
  session.isLogin = false;
  delete session.user;
};

export type AuthenticatedEnv = {
  Variables: {
    session: Session & {
      isLogin: true;
    };
  };
};

/**
 * そのセッションがログイン中であることを保証するMiddleware
 * もしログインしていない場合はログインページにリダイレクトする。
 */
export const ensureAuthenticatedMiddleware = createMiddleware(async (c, next) => {
  const session = c.get('session');
  if (!session.isLogin) {
    session.serverMessage = 'ログインしてください';
    await session.save();
    return c.redirect('/auth/login');
  }

  await next();
});
