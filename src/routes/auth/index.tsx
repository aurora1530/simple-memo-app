import { type Env, Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import prisma from '../../prisma.js';
import { argon2id, hash, verify } from 'argon2';
import { createLoginForm, createRegisterForm } from './form.js';
import { getSession } from '../../sessionMiddleware.js';
import { loginValidator, registerValidator } from './validation.js';

const authApp = new Hono<Env>();

authApp
  .get('/register', (c) => {
    const session = c.get('session');
    if (session?.userID) {
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

    return c.redirect('/auth/login');
  })
  .get('/login', (c) => {
    const session = c.get('session');
    if (session?.userID) {
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

    const session = await getSession(c);
    session.userID = user.id;
    session.username = user.username;

    await session.save();

    return c.redirect('/memo');
  })
  .get('/logout', async (c) => {
    const session = await getSession(c);
    session.destroy();

    return c.redirect('/');
  });

export default authApp;
