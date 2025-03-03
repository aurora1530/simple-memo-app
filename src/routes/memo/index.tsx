import { type Env, Hono } from 'hono';
import { ensureLoginedMiddleware } from '../../sessionMiddleware.js';
import prisma from '../../prisma.js';
import MemoList from '../../components/memo/MemoList.js';
import MemoForm from '../../components/memo/MemoForm.js';
import { memoValidation } from './validation.js';
import { css } from 'hono/css';

const memoApp = new Hono<Env>();
memoApp.use(ensureLoginedMiddleware);

// メモ一覧
memoApp.get('/', async (c) => {
  const session = c.get('session')!;

  const memos = await prisma.memo.findMany({
    where: {
      userId: session.userID,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const headingClass = css`
    text-align: center;
    font-size: 2em;
    margin: 20px 0;
    color: #333;
  `;

  const createMemoButtonClass = css`
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    transition: background 0.3s ease;
    &:hover {
      background-color: #0056b3;
    }
  `;

  return c.render(
    <>
      <h1 className={headingClass}>Memo</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <a href="/memo/create" className={createMemoButtonClass}>
          Create Memo
        </a>
      </div>
      <MemoList memos={memos} />
    </>,
    {
      title: 'Memo',
    }
  );
});

memoApp
  .get('/create', (c) => {
    return c.render(<MemoForm submitLabel="新規作成" />, {
      title: 'Create Memo',
    });
  })
  .post('/create', memoValidation('create'), async (c) => {
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
  })
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
      <MemoForm submitLabel="更新" defaultTitle={memo.title} defaultBody={memo.body} />,
      {
        title: 'Edit Memo',
      }
    );
  })
  .post('edit/:id', memoValidation('edit'), async (c) => {
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
  });

export default memoApp;
