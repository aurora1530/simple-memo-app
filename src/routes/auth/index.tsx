import { Hono } from 'hono';
import { Layout } from '../../layout.js';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import prisma from '../../prisma.js';
import { argon2id, hash, verify } from 'argon2';
import Form from './form.js';

const authApp = new Hono();

authApp
  .get('/register', (c) => {
    return c.html(<Form isRegister={true} />);
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
        return c.html(<Form isRegister={true} errorMessage="User already exists" />);
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

      return c.json({ username, password });
    }
  )
  .get('/login', (c) => {
    return c.html(<Form isRegister={false} />);
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
          return c.html(<Form isRegister={false} errorMessage={errorMessage} />);
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
          <Form isRegister={false} errorMessage="Invalid username or password" />
        );
      }

      const valid = await verify(user.passwordHash, password);

      if (!valid) {
        return c.html(
          <Form isRegister={false} errorMessage="Invalid username or password" />
        );
      }

      return c.redirect('/');
    }
  );

export default authApp;
