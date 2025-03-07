import { Hono } from 'hono';
import prisma from '../../prisma.js';
import { argon2id, hash, verify } from 'argon2';
import {
  createChangePasswordForm,
  createLoginForm,
  createRegisterForm,
} from '../../components/auth/AuthForm.js';
import {
  changePasswordValidator,
  loginValidator,
  registerValidator,
} from './validation.js';
import {
  type AuthenticatedEnv,
  ensureAuthenticatedMiddleware,
  setLogoutToSession,
} from '../../session.js';

const authApp = new Hono();

authApp
  .get('/register', (c) => {
    const session = c.get('session');
    if (session.isLogin) {
      return c.redirect('/memo');
    }

    return createRegisterForm(c);
  })
  .post('/register', registerValidator, async (c) => {
    const { username, password } = c.req.valid('form');

    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExists) {
      return createRegisterForm(c, {
        errorMessages: [`${username}は既に登録されています`],
      });
    }

    const hashedPassword = await hash(password, {
      type: argon2id,
    });

    await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
      },
    });

    const session = c.get('session');
    session.serverMessage = `${username}の登録が完了しました`;
    await session.save();
    return c.redirect('/auth/login');
  })
  .get('/login', (c) => {
    const session = c.get('session');
    if (session.isLogin) {
      return c.redirect('/memo');
    }

    return createLoginForm(c);
  })
  .post('/login', loginValidator, async (c) => {
    const { username, password } = c.req.valid('form');

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return createLoginForm(c, {
        errorMessages: ['ユーザー名またはパスワードが違います'],
      });
    }

    const valid = await verify(user.passwordHash, password);

    if (!valid) {
      return createLoginForm(c, {
        errorMessages: ['ユーザー名またはパスワードが違います'],
      });
    }

    const session = c.get('session');
    session.isLogin = true;
    session.user = {
      id: user.id,
      name: user.username,
    };
    session.serverMessage = 'ログインしました';

    await session.save();

    return c.redirect('/memo');
  })
  .get('/logout', async (c) => {
    const session = c.get('session');
    setLogoutToSession(session);

    session.serverMessage = 'ログアウトしました';
    await session.save();

    return c.redirect('/');
  });

const authenticatedAuthApp = new Hono<AuthenticatedEnv>()
  .use(ensureAuthenticatedMiddleware)
  .get('/changePassword', (c) => {
    return createChangePasswordForm(c);
  })
  .post('/changePassword', changePasswordValidator, async (c) => {
    const { newPassword } = c.req.valid('form');
    const session = c.get('session');

    const hashedPassword = await hash(newPassword, {
      type: argon2id,
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });

    session.serverMessage = 'パスワードを変更しました。ログインし直してください。';
    setLogoutToSession(session);
    await session.save();

    return c.redirect('/auth/login');
  });

authApp.route('/', authenticatedAuthApp);

export default authApp;
