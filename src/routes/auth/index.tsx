import { type Env, Hono } from 'hono';
import { Layout } from '../../layout.js';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import prisma from '../../prisma.js';
import { argon2id, hash, verify } from 'argon2';
import Form from './form.js';
import { getSession } from '../../sessionMiddleware.js';

const authApp = new Hono<Env>();

authApp
  .get('/register', (c) => {
    return c.html(
      <Layout c={c} title="Register">
        <Form isRegister={true} />
      </Layout>
    );
  })
  .post(
    '/register',
    zValidator(
      'form',
      z.object({
        username: z.string(),
        password: z.string().min(8),
      }),
      (result, c) => {
        if (!result.success) {
          const errorMessage = result.error.message;
          return c.html(<Form isRegister={true} errorMessage={errorMessage} />);
        }
      }
    ),
    async (c) => {
      const { username, password } = c.req.valid('form');

      const userExists = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userExists) {
        return c.html(
          <Layout c={c} title="Register">
            <Form isRegister={true} errorMessage="Username already exists" />
          </Layout>
        );
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
    }
  )
  .get('/login', (c) => {
    return c.html(
      <Layout c={c} title="Login">
        <Form isRegister={false} />
      </Layout>
    );
  })
  .post(
    '/login',
    zValidator(
      'form',
      z.object({
        username: z.string(),
        password: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          const errorMessage = result.error.message;
          return c.html(
            <Layout c={c} title="Login">
              <Form isRegister={false} errorMessage={errorMessage} />
            </Layout>
          );
        }
      }
    ),
    async (c) => {
      const { username, password } = c.req.valid('form');

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return c.html(
          <Layout c={c} title="Login">
            <Form isRegister={false} errorMessage="Invalid username or password" />
          </Layout>
        );
      }

      const valid = await verify(user.passwordHash, password);

      if (!valid) {
        return c.html(
          <Layout c={c} title="Login">
            <Form isRegister={false} errorMessage="Invalid username or password" />
          </Layout>
        );
      }

      const session = await getSession(c);
      session.username = user.username;
      session.isLogin = true;

      await session.save();

      return c.redirect('/memo');
    }
  ).get('/logout', async (c) => {
    const session = await getSession(c);
    session.destroy();

    return c.redirect('/');
  })

export default authApp;
