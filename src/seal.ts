import type { Context } from 'hono';
import { env } from 'hono/adapter';
import * as Iron from 'iron-webcrypto';
import * as Crypto from 'uncrypto';

export const seal = async (c: Context, data: string) => {
  const password = env<{ SESSION_PASSWORD: string }>(c).SESSION_PASSWORD;
  return await Iron.seal(Crypto, data, password, Iron.defaults);
};

export const unseal = async (c: Context, sealed: string) => {
  const password = env<{ SESSION_PASSWORD: string }>(c).SESSION_PASSWORD;
  const unsealed = await Iron.unseal(Crypto, sealed, password, Iron.defaults);
  if (typeof unsealed === 'string') {
    return unsealed;
  }
  throw new Error(`unseal failed: ${unsealed}`);
};
