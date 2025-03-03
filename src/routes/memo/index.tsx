import { type Env, Hono } from 'hono';
import { ensureLoginedMiddleware } from '../../sessionMiddleware.js';
import prisma from '../../prisma.js';
import MemoList from '../../components/memo/MemoList.js';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { jsxRenderer } from 'hono/jsx-renderer';
import { css, Style } from 'hono/css';

const memoApp = new Hono<Env>();
memoApp.use(ensureLoginedMiddleware);

memoApp.use(
  jsxRenderer(({ children, Layout }) => {
    return (
      <Layout>
        <Style>
          {css`
            .memo {
              border: 1px solid #ccc;
              padding: 10px;
              margin: 10px 0;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .memo-title {
              font-size: 1.2em;
              font-weight: bold;
            }
            .memo-body {
              margin: 10px 0;
            }
            .memo-dates {
              font-size: 0.8em;
              color: #666;
            }
          `}
        </Style>
        {children}
      </Layout>
    );
  })
);

memoApp
  .get('/', async (c) => {
    const session = c.get('session')!;

    const memos = await prisma.memo.findMany({
      where: {
        userId: session.userID,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return c.render(
      <>
        <h1>Memo</h1>
        <div>
          <a href="/memo/create">Create Memo</a>
        </div>
        <div>
          <MemoList memos={memos} />
        </div>
      </>,
      {
        title: 'Memo',
      }
    );
  })
  .get('/create', (c) => {
    return c.render(
      <>
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
      </>,
      {
        title: 'Create Memo',
      }
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

      const { title, body } = c.req.valid('form');

      await prisma.memo.create({
        data: {
          title,
          body,
          userId: session.userID,
          updatedAt: new Date(),
        },
      });

      return c.redirect('/memo');
    }
  )
  .get('edit/:id', async (c) => {
    const session = c.get('session')!;

    const memoId = c.req.param('id');
    const memo = await prisma.memo.findUnique({
      where: {
        id: parseInt(memoId),
      },
    });

    const isUserMemo = memo?.userId === session.userID;
    if (!isUserMemo) {
      // 403 Forbidden
      return c.status(404);
    }

    return c.render(
      <>
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
      </>,
      {
        title: 'Edit Memo',
      }
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

      const memoId = c.req.param('id');
      const memo = await prisma.memo.findUnique({
        where: {
          id: parseInt(memoId),
        },
      });

      const isUserMemo = memo?.userId === session.userID;
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
