import { Hono } from 'hono';
import prisma from '../../prisma.js';
import MemoView from '../../components/memo/MemoView.js';
import { unsealMemoList } from '../../lib/memo/seal.js';

const shareApp = new Hono();

shareApp.get('/view/:token', async (c) => {
  const token = decodeURIComponent(c.req.param('token'));

  const sealedMemo = await prisma.memo.findFirst({
    where: {
      deleted: false,
      shareToken: token,
    },
  });

  if (!sealedMemo) {
    return c.redirect('/forbidden');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: sealedMemo.userId,
    },
  });
  if (!user) {
    throw new Error(
      `User not found: userId=${sealedMemo.userId}, memoId=${sealedMemo.id}`
    );
  }

  const unsealedMemo = await unsealMemoList(c, [sealedMemo]);

  return c.render(
    <MemoView memo={unsealedMemo[0]} isShareView={true} username={user.username} />,
    {
      title: 'メモの表示',
    }
  );
});

export default shareApp;
