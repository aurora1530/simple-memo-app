import { Hono } from 'hono';
import { unsealShareValue } from '../../share.js';
import prisma from '../../prisma.js';
import MemoView from '../../components/memo/MemoView.js';
import { unsealMemoList } from '../memo/seal.js';

const shareApp = new Hono();

shareApp.get('/view/:sealedValue', async (c) => {
  const sealedValue = c.req.param('sealedValue');

  const unsealedValue = await unsealShareValue(c, sealedValue);
  if (!unsealedValue) {
    return c.redirect('/forbidden');
  }

  const sealedMemo = await prisma.memo.findUnique({
    where: {
      id: unsealedValue,
      deleted: false,
      enableShare: true,
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
      title: 'View Memo',
    }
  );
});

export default shareApp;
