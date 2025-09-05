import { Hono } from 'hono';
import { ensureAuthenticatedMiddleware, type AuthenticatedEnv } from '../../session.js';
import prisma from '../../prisma.js';
import MemoList from '../../components/memo/MemoList.js';
import MemoForm from '../../components/memo/MemoForm.js';
import { memoValidation } from './validation.js';
import { css, cx } from 'hono/css';
import {
  sealMemoTitleAndBody,
  unsealMemoTitleAndBody,
  unsealMemoList,
} from '../../lib/memo/seal.js';
import { MAX_MEMO_COUNT, DEFAULT_PER_PAGE, MAX_PER_PAGE } from './constant.js';
import MemoView from '../../components/memo/MemoView.js';
import { createButtonClass } from '../../components/common/style.js';
import {
  blueColorSet,
  redColorSet,
  grayColorSet,
} from '../../components/common/color.js';
import { createShareLink, createToken } from '../../lib/memo/token.js';
import shareModal from '../../components/memo/ShareModal.js';

const memoApp = new Hono<AuthenticatedEnv>();
memoApp.use(ensureAuthenticatedMiddleware);

const headingClass = css`
  text-align: center;
  font-size: 2em;
  margin: 20px 0;
  color: #333;
`;

const buttonCommonClass = css`
  margin: 0 10px;
  font-size: 1.2em;
`;

const createMemoButtonClass = cx(createButtonClass(blueColorSet), buttonCommonClass);

const trashMemoButtonClass = cx(createButtonClass(redColorSet), buttonCommonClass);

const topContainerClass = css`
  text-align: center;
  margin-top: 20px;
`;

const parsePositiveInt = (value: string | undefined, fallback: number, max?: number) => {
  const n = Number(value ?? '');
  if (!Number.isFinite(n) || n <= 0) return fallback;
  const int = Math.floor(n);
  return max ? Math.min(int, max) : int;
};

// Pagination styles and renderer
const paginationContainerClass = css`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

const paginationListClass = css`
  list-style: none;
  display: flex;
  gap: 8px;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

const pageLinkClass = cx(
  createButtonClass(blueColorSet),
  css`
    padding: 6px 10px;
    font-size: 0.9rem;
  `
);

const pageActiveClass = cx(
  createButtonClass(grayColorSet),
  css`
    pointer-events: none;
  `
);

const pageDisabledClass = cx(
  createButtonClass(grayColorSet),
  css`
    opacity: 0.6;
    pointer-events: none;
  `
);

const getPageNumbers = (current: number, total: number) => {
  const pages: (number | string)[] = [];
  const window = 2;
  const add = (p: number | string) => pages.push(p);
  if (total <= 7) {
    for (let i = 1; i <= total; i++) add(i);
  } else {
    add(1);
    const start = Math.max(2, current - window);
    const end = Math.min(total - 1, current + window);
    if (start > 2) add('…');
    for (let i = start; i <= end; i++) add(i);
    if (end < total - 1) add('…');
    add(total);
  }
  return pages;
};

const buildUrl = (base: string, page: number, perPage: number) =>
  `${base}?page=${page}&perPage=${perPage}`;

const renderPagination = (
  basePath: string,
  page: number,
  perPage: number,
  totalPages: number
) => {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;
  const numbers = getPageNumbers(page, totalPages);
  return (
    <nav class={paginationContainerClass} aria-label="pagination">
      <ul class={paginationListClass}>
        <li>
          <a
            class={prevDisabled ? pageDisabledClass : pageLinkClass}
            href={buildUrl(basePath, 1, perPage)}
            aria-disabled={prevDisabled}
            tabindex={prevDisabled ? -1 : 0}
          >
            « 最初
          </a>
        </li>
        <li>
          <a
            class={prevDisabled ? pageDisabledClass : pageLinkClass}
            href={buildUrl(basePath, Math.max(1, page - 1), perPage)}
            aria-disabled={prevDisabled}
            tabindex={prevDisabled ? -1 : 0}
          >
            ‹ 前
          </a>
        </li>
        {numbers.map((p) => (
          <li>
            {typeof p === 'number' ? (
              p === page ? (
                <span class={pageActiveClass} aria-current="page">
                  {p}
                </span>
              ) : (
                <a class={pageLinkClass} href={buildUrl(basePath, p, perPage)}>
                  {p}
                </a>
              )
            ) : (
              <span class={pageDisabledClass} aria-hidden="true">
                {p}
              </span>
            )}
          </li>
        ))}
        <li>
          <a
            class={nextDisabled ? pageDisabledClass : pageLinkClass}
            href={buildUrl(basePath, Math.min(totalPages, page + 1), perPage)}
            aria-disabled={nextDisabled}
            tabindex={nextDisabled ? -1 : 0}
          >
            次 ›
          </a>
        </li>
        <li>
          <a
            class={nextDisabled ? pageDisabledClass : pageLinkClass}
            href={buildUrl(basePath, totalPages, perPage)}
            aria-disabled={nextDisabled}
            tabindex={nextDisabled ? -1 : 0}
          >
            最後 »
          </a>
        </li>
      </ul>
    </nav>
  );
};

memoApp
  .get('/', async (c) => {
    const session = c.get('session');

    const page = parsePositiveInt(c.req.query('page'), 1);
    const perPage = parsePositiveInt(
      c.req.query('perPage'),
      DEFAULT_PER_PAGE,
      MAX_PER_PAGE
    );
    const skip = (page - 1) * perPage;

    const [totalCount, memos] = await Promise.all([
      prisma.memo.count({
        where: {
          userId: session.user.id,
          deleted: false,
        },
      }),
      prisma.memo.findMany({
        where: {
          userId: session.user.id,
          deleted: false,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        skip,
        take: perPage,
      }),
    ]);

    const unsealedMemoList = await unsealMemoList(c, memos);
    const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
    const clampedPage = Math.min(page, totalPages);

    const pagination = renderPagination('/memo', clampedPage, perPage, totalPages);

    return c.render(
      <>
        <h1 class={headingClass}>Memo</h1>
        <div class={topContainerClass}>
          <a href="/memo/create" class={createMemoButtonClass}>
            メモを作成
          </a>
          <a href="/memo/trash" class={trashMemoButtonClass}>
            ゴミ箱
          </a>
          {pagination}
        </div>
        <MemoList memos={unsealedMemoList} mode="list" />
        {pagination}
      </>,
      {
        title: 'メモ',
      }
    );
  })
  .get('/create', (c) => {
    return c.render(<MemoForm submitLabel="新規作成" />, {
      title: '新規作成',
    });
  })
  .post('/create', memoValidation('create'), async (c) => {
    const session = c.get('session');
    const { title, body } = c.req.valid('form');

    const currentMemoCount = await prisma.memo.count({
      where: {
        userId: session.user.id,
      },
    });
    if (currentMemoCount >= MAX_MEMO_COUNT) {
      return c.render(
        <MemoForm
          submitLabel="新規作成"
          defaultTitle={title}
          defaultBody={body}
          errorMessages={[`メモは${MAX_MEMO_COUNT}個までしか作成できません`]}
        />,
        {
          title: '新規作成',
        }
      );
    }

    const sealedMemo = await sealMemoTitleAndBody(c, { title, body });

    await prisma.memo.create({
      data: {
        title: sealedMemo.title,
        body: sealedMemo.body,
        userId: session.user.id,
        updatedAt: new Date(),
      },
    });

    session.serverMessage = 'メモを作成しました';
    await session.save();

    return c.redirect('/memo');
  })
  .get('edit/:id', async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');
    const memo = await prisma.memo.findUnique({
      where: {
        id: memoId,
        deleted: false,
      },
    });

    const isUserMemo = memo?.userId === session.user.id;
    if (!isUserMemo) {
      return c.redirect('/forbidden');
    }

    const unsealedMemo = await unsealMemoTitleAndBody(c, memo);

    return c.render(
      <MemoForm
        submitLabel="更新"
        defaultTitle={unsealedMemo.title}
        defaultBody={unsealedMemo.body}
      />,
      {
        title: 'メモの更新',
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
          deleted: false,
        },
      });
    } catch (e) {
      console.error(e);
      return c.redirect('/forbidden');
    }

    const isUserMemo = memo?.userId === session.user.id;
    if (!isUserMemo || !memo) {
      return c.redirect('/forbidden');
    }

    const unsealedMemo = await unsealMemoTitleAndBody(c, memo);
    const { title: newTitle, body: newBody } = c.req.valid('form');

    const notChanged = unsealedMemo?.title === newTitle && unsealedMemo?.body === newBody;
    if (notChanged) {
      return c.render(
        <MemoForm
          submitLabel="更新"
          defaultTitle={newTitle}
          defaultBody={newBody}
          errorMessages={['変更がありません']}
        />,
        {
          title: 'メモの更新',
        }
      );
    }

    const sealedMemo = await sealMemoTitleAndBody(c, { title: newTitle, body: newBody });
    await prisma.memo.update({
      where: {
        id: memoId,
      },
      data: {
        title: sealedMemo.title,
        body: sealedMemo.body,
        updatedAt: new Date(),
      },
    });

    session.serverMessage = 'メモを更新しました';
    await session.save();

    return c.redirect('/memo');
  })
  .delete('delete/:id', async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');
    const memo = await prisma.memo.update({
      where: {
        id: memoId,
        userId: session.user.id,
      },
      data: {
        deleted: true,
        shareToken: null,
      },
    });

    session.serverMessage = 'メモを削除しました';
    await session.save();

    return c.json({});
  })
  .get('trash', async (c) => {
    const session = c.get('session');

    const page = parsePositiveInt(c.req.query('page'), 1);
    const perPage = parsePositiveInt(
      c.req.query('perPage'),
      DEFAULT_PER_PAGE,
      MAX_PER_PAGE
    );
    const skip = (page - 1) * perPage;

    const [totalCount, memos] = await Promise.all([
      prisma.memo.count({
        where: {
          userId: session.user.id,
          deleted: true,
        },
      }),
      prisma.memo.findMany({
        where: {
          userId: session.user.id,
          deleted: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        skip,
        take: perPage,
      }),
    ]);

    const unsealedMemoList = await unsealMemoList(c, memos);
    const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
    const clampedPage = Math.min(page, totalPages);

    const pagination = renderPagination('/memo/trash', clampedPage, perPage, totalPages);

    return c.render(
      <>
        <h1 class={headingClass}>ゴミ箱</h1>
        <div class={topContainerClass}>
          <a href="/memo/create" class={createMemoButtonClass}>
            メモを作成
          </a>
          <a href="/memo" class={createMemoButtonClass}>
            メモ一覧
          </a>
          {pagination}
        </div>
        <MemoList memos={unsealedMemoList} mode="trash" />
        {pagination}
      </>,
      {
        title: 'ゴミ箱',
      }
    );
  })
  .put('restore/:id', async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');
    const memo = await prisma.memo.update({
      where: {
        id: memoId,
        userId: session.user.id,
      },
      data: {
        deleted: false,
      },
    });

    session.serverMessage = 'メモを復元しました';
    await session.save();

    return c.json({});
  })
  .get('/view/:id', async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');

    const memo = await prisma.memo.findUnique({
      where: {
        id: memoId,
        deleted: false,
      },
    });

    const isUserMemo = memo?.userId === session.user.id;
    if (!isUserMemo) {
      return c.redirect('/forbidden');
    }

    const unsealedMemo = await unsealMemoList(c, [memo]);

    return c.render(
      <MemoView
        memo={unsealedMemo[0]}
        isShareView={false}
        enableShare={!!memo.shareToken}
      />,
      {
        title: 'メモの表示',
        modal: shareModal,
      }
    );
  })
  .delete('/deleteCompletely/:id', async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');

    const memo = await prisma.memo.findUnique({
      where: {
        id: memoId,
        userId: session.user.id,
      },
    });

    if (!memo) {
      return c.redirect('/forbidden');
    }

    await prisma.memo.delete({
      where: {
        id: memoId,
      },
    });

    session.serverMessage = 'メモを完全に削除しました';
    await session.save();

    return c.json({});
  })
  .post('/share/:id', async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');
    const memo = await prisma.memo.findUnique({
      where: {
        id: memoId,
        userId: session.user.id,
        deleted: false,
      },
    });

    if (!memo) {
      return c.redirect('/forbidden');
    }

    if (memo.shareToken) {
      return c.json({
        shareLink: createShareLink(memo.shareToken),
      });
    }

    const token = createToken();

    const shareLink = createShareLink(token);

    await prisma.memo.update({
      where: {
        id: memoId,
      },
      data: {
        shareToken: token,
      },
    });

    return c.json({
      shareLink: shareLink,
    });
  })
  .delete('/share/:id', async (c) => {
    const session = c.get('session');

    const memoId = c.req.param('id');

    await prisma.memo.update({
      where: {
        id: memoId,
        userId: session.user.id,
      },
      data: {
        shareToken: null,
      },
    });

    return c.json({ success: 'ok' });
  });

export default memoApp;
