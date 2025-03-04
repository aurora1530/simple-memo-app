import { type Env, Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import prisma from '../../prisma.js';
import { argon2id, hash, verify } from 'argon2';
import { createLoginForm, createRegisterForm } from './form.js';
import { loginValidator, registerValidator } from './validation.js';
import type { Session } from '../../sessionMiddleware.js';

const authApp = new Hono<Env>();

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
      return createRegisterForm(c, [`${username}は既に登録されています`]);
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
      return createLoginForm(c, ['ユーザー名またはパスワードが違います']);
    }

    const valid = await verify(user.passwordHash, password);

    if (!valid) {
      return createLoginForm(c, ['ユーザー名またはパスワードが違います']);
    }

    const session = c.get('session');
    Object.assign(session, {
      isLogin: true,
      username: user.username,
      userID: user.id,
    })
    await session.save();

    return c.redirect('/memo');
  })
  .get('/logout', async (c) => {
    const session = c.get('session');
    session.destroy();

    return c.redirect('/');
  });

export default authApp;
