import { type Env, Hono } from 'hono';
import { ensureLoginedMiddleware } from '../../sessionMiddleware.js';
import prisma from '../../prisma.js';
import { Layout } from '../../layout.js';
import MemoList from '../../components/memo/MemoList.js';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const memoApp = new Hono<Env>();
memoApp.use(ensureLoginedMiddleware);

memoApp
  .get('/', async (c) => {
    const session = c.get('session')!;

    const user = await prisma.user.findUnique({
      where: {
        username: session.username,
      },
    });

    if (!user) {
      return c.redirect('/auth/login');
    }

    const memos = await prisma.memo.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return c.html(
      <Layout c={c} title="Memo">
        <h1>Memo</h1>
        <div>
          <a href="/memo/create">Create Memo</a>
        </div>
        <div>
          <MemoList memos={memos} />
        </div>
      </Layout>
    );
  })
  .get('/create', (c) => {
    return c.html(
      <Layout c={c} title="Create Memo">
        <form method="post">
          <div>
            <label>
              Title
              <input type="text" name="title" />
            </label>
          </div>
          <div>
            <label>
              Body
              <textarea name="body" />
            </label>
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </Layout>
    );
  })
  .post(
    '/create',
    zValidator(
      'form',
      z.object({
        title: z.string(),
        body: z.string(),
      })
    ),
    async (c) => {
      const session = c.get('session')!;
      const user = await prisma.user.findUnique({
        where: {
          username: session.username,
        },
      });

      if (!user) {
        return c.redirect('/auth/login');
      }

      const { title, body } = c.req.valid('form');

      await prisma.memo.create({
        data: {
          title,
          body,
          userId: user.id,
          updatedAt: new Date(),
        },
      });

      return c.redirect('/memo');
    }
  )
  .get('edit/:id', async (c) => {
    const session = c.get('session')!;
    const user = await prisma.user.findUnique({
      where: {
        username: session.username,
      },
    });

    if (!user) {
      return c.redirect('/auth/login');
    }

    const memoId = c.req.param('id');
    const memo = await prisma.memo.findUnique({
      where: {
        id: parseInt(memoId),
      },
    });

    const isUserMemo = memo?.userId === user.id;
    if (!isUserMemo) {
      // 403 Forbidden
      return c.status(404);
    }

    return c.html(
      <Layout c={c} title="Edit Memo">
        <form method="post">
          <div>
            <label>
              Title
              <input type="text" name="title" value={memo.title} />
            </label>
          </div>
          <div>
            <label>
              Body
              <textarea name="body">{memo.body}</textarea>
            </label>
          </div>
          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      </Layout>
    );
  })
  .post(
    'edit/:id',
    zValidator(
      'form',
      z.object({
        title: z.string(),
        body: z.string(),
      })
    ),
    async (c) => {
      const session = c.get('session')!;
      const user = await prisma.user.findUnique({
        where: {
          username: session.username,
        },
      });

      if (!user) {
        return c.redirect('/auth/login');
      }

      const memoId = c.req.param('id');
      const memo = await prisma.memo.findUnique({
        where: {
          id: parseInt(memoId),
        },
      });

      const isUserMemo = memo?.userId === user.id;
      if (!isUserMemo) {
        // 403 Forbidden
        return c.status(404);
      }

      const { title, body } = c.req.valid('form');

      await prisma.memo.update({
        where: {
          id: parseInt(memoId),
        },
        data: {
          title,
          body,
          updatedAt: new Date(),
        },
      });

      return c.redirect('/memo');
    }
  );

export default memoApp;
