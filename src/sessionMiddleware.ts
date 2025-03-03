import type { Context, Env } from 'hono';
import { env } from 'hono/adapter';
import { createMiddleware } from 'hono/factory';
import { getIronSession } from 'iron-session';

export interface Session {
  userID: number;
  username: string;
}

export const getSession = async (c: Context)=>{
  return await getIronSession<Session>(c.req.raw, c.res, {
    cookieName: 'session',
    password: env<{ SESSION_PASSWORD: string }>(c).SESSION_PASSWORD,
  });
}

export const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await getSession(c);

  c.set('session', session);
  await next();
});

export type LoginedEnv = Env & { Variables: { session: Session } };

export const ensureLoginedMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = c.get('session');
  if (!session?.userID) {
    return c.redirect('/auth/login');
  }

  await next();
});