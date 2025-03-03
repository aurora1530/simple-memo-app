import { type Env, Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import prisma from '../../prisma.js';
import { argon2id, hash, verify } from 'argon2';
import Form from './form.js';
import { getSession } from '../../sessionMiddleware.js';

const authApp = new Hono<Env>();

authApp
  .get('/register', (c) => {
    return c.render(
      <>
        <Form isRegister={true} />
      </>,
      {
        title: 'Register',
      }
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
        return c.render(
          <>
            <Form isRegister={true} errorMessage="Username already exists" />
          </>,
          {
            title: 'Register',
          }
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
    return c.render(
      <>
        <Form isRegister={false} />
      </>,
      {
        title: 'Login',
      }
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
          return c.render(
            <>
              <Form isRegister={false} errorMessage={errorMessage} />
            </>,
            {
              title: 'Login',
            }
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
        return c.render(
          <>
            <Form isRegister={false} errorMessage="Invalid username or password" />
          </>,
          {
            title: 'Login',
          }
        );
      }

      const valid = await verify(user.passwordHash, password);

      if (!valid) {
        return c.render(
          <>
            <Form isRegister={false} errorMessage="Invalid username or password" />
          </>,
          {
            title: 'Login',
          }
        );
      }

      const session = await getSession(c);
      session.userID = user.id;
      session.username = user.username;

      await session.save();

      return c.redirect('/memo');
    }
  )
  .get('/logout', async (c) => {
    const session = await getSession(c);
    session.destroy();

    return c.redirect('/');
  });

export default authApp;
