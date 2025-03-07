import type { Context } from 'hono';
import { env } from 'hono/adapter';
import * as Iron from 'iron-webcrypto';
import * as Crypto from 'uncrypto';

/**
 * データを暗号化+MAC値付与する
 * @param c Environmentからパスワードを取得するためのContext
 * @param data 暗号化するデータ
 * @returns 暗号化されたデータ
 */
export const seal = async (c: Context, data: string): Promise<string> => {
  const password = env<{ DB_ENCRYPT_PASSWORD: string }>(c).DB_ENCRYPT_PASSWORD;
  return await Iron.seal(Crypto, data, password, Iron.defaults);
};

/**
 * 暗号化されたデータを復号、MAC値検証する
 * @param c Environmentからパスワードを取得するためのContext
 * @param sealed 暗号化されたデータ
 * @returns 復号されたデータ。復号に失敗した場合はエラーをthrowする
 */
export const unseal = async (c: Context, sealed: string): Promise<string> => {
  const password = env<{ DB_ENCRYPT_PASSWORD: string }>(c).DB_ENCRYPT_PASSWORD;
  const unsealed = await Iron.unseal(Crypto, sealed, password, Iron.defaults);
  if (typeof unsealed === 'string') {
    return unsealed;
  }
  throw new Error(`unseal failed: ${unsealed}`);
};
