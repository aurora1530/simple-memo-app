import { Hono } from 'hono';
import { ensureLoginedMiddleware, type LoginedEnv } from '../../sessionMiddleware.js';
import prisma from '../../prisma.js';
import MemoList from '../../components/memo/MemoList.js';
import MemoForm from '../../components/memo/MemoForm.js';
import { memoValidation } from './validation.js';
import { css } from 'hono/css';

const memoApp = new Hono<LoginedEnv>();
memoApp.use(ensureLoginedMiddleware);

// メモ一覧
memoApp.get('/', async (c) => {
  const session = c.get('session');

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

  const topContainerClass = css`
    text-align: center;
    margin-top: 20px;
  `;

  return c.render(
    <>
      <h1 class={headingClass}>Memo</h1>
      <div class={topContainerClass}>
        <a href="/memo/create" class={createMemoButtonClass}>
          メモを作成
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
    const session = c.get('session');
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
    const session = c.get('session');

    const memoId = c.req.param('id');
    const memo = await prisma.memo.findUnique({
      where: {
        id: memoId,
      },
    });

    const isUserMemo = memo?.userId === session.userID;
    if (!isUserMemo) {
      return c.redirect('/forbidden')
    }

    return c.render(
      <MemoForm submitLabel="更新" defaultTitle={memo.title} defaultBody={memo.body} />,
      {
        title: 'Edit Memo',
      }
    );
  })
  .post('edit/:id', memoValidation('edit'), async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');

    let memo;
    try {
      memo = await prisma.memo.findUnique({
        where: {
          id: memoId,
        },
      });
    }catch(e){
      console.error(e);
      return c.redirect('/forbidden')
    }

    const isUserMemo = memo?.userId === session.userID;
    if (!isUserMemo) {
      return c.redirect('/forbidden')
    }

    const { title, body } = c.req.valid('form');

    const notChanged = memo?.title === title && memo?.body === body;
    if (notChanged) {
      return c.render(
        <MemoForm
          submitLabel="更新"
          defaultTitle={title}
          defaultBody={body}
          errorMessages={['変更がありません']}
        />,
        {
          title: 'Edit Memo',
        }
      );
    }

    await prisma.memo.update({
      where: {
        id: memoId,
      },
      data: {
        title,
        body,
        updatedAt: new Date(),
      },
    });

    return c.redirect('/memo');
  })
  .delete('delete/:id', async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');
    const memo = await prisma.memo.delete({
      where: {
        id: memoId,
        userId: session.userID,
      },
    });

    return c.json({ memo });
  });

export default memoApp;
