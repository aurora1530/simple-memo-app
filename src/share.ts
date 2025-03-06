import type { Context } from 'hono';
import { env } from 'hono/adapter';
import * as Iron from 'iron-webcrypto';
import * as Crypto from 'uncrypto';

interface ShareOptions {
  memoId: string;
  ttl?: number;
}

const seal = async (c: Context, options: ShareOptions): Promise<string> => {
  const password = env<{ SHARE_SEAL_PASSWORD: string }>(c).SHARE_SEAL_PASSWORD;

  const sealed = await Iron.seal(Crypto, options.memoId, password, {
    ...Iron.defaults,
    ttl: options.ttl ?? 0,
  });

  return sealed;
};

const unseal = async (c: Context, sealed: string): Promise<string | undefined> => {
  const password = env<{ SHARE_SEAL_PASSWORD: string }>(c).SHARE_SEAL_PASSWORD;

  const unsealed = await Iron.unseal(Crypto, sealed, password, Iron.defaults);
  if (typeof unsealed === 'string') {
    return unsealed;
  }

  return undefined;
};

export const createShareValue = async (
  c: Context,
  options: ShareOptions
): Promise<string> => {
  const sealed = await seal(c, options);
  console.log('sealed:', sealed);
  console.log('encoded sealed:', encodeURIComponent(sealed));
  return encodeURIComponent(sealed);
};

export const unsealShareValue = async (
  c: Context,
  paramValue: string
): Promise<string | undefined> => {
  const sealed = decodeURIComponent(paramValue);
  console.log('paramValue:', paramValue);
  console.log('decode paramValue:', sealed);
  const unsealed = await unseal(c, sealed);
  return unsealed;
};
