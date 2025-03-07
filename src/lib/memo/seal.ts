import type { Memo } from '@prisma/client';
import type { Context } from 'hono';
import { seal, unseal } from '../../seal.js';

type TitleAndBody = Pick<Memo, 'title' | 'body'>;
type SealMode = 'seal' | 'unseal';

const handleSealMode = async (
  c: Context,
  titleAndBody: TitleAndBody,
  mode: SealMode
): Promise<TitleAndBody> => {
  const primitiveFunc = mode === 'seal' ? seal : unseal;
  const [title, body] = await Promise.all([
    primitiveFunc(c, titleAndBody.title),
    primitiveFunc(c, titleAndBody.body),
  ]);
  return { title, body };
};

export const sealMemoTitleAndBody = async (
  c: Context,
  titleAndBody: TitleAndBody
): Promise<TitleAndBody> => {
  return await handleSealMode(c, titleAndBody, 'seal');
};

export const unsealMemoTitleAndBody = async (
  c: Context,
  titleAndBody: TitleAndBody
): Promise<TitleAndBody> => {
  return await handleSealMode(c, titleAndBody, 'unseal');
};

export const unsealMemoList = async (c: Context, memos: Memo[]): Promise<Memo[]> => {
  const unseal = async (memo: Memo) => {
    const { title, body } = await unsealMemoTitleAndBody(c, memo);
    return {
      ...memo,
      title,
      body,
    };
  };
  return await Promise.all(memos.map(unseal));
};
