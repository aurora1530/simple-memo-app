import { ORIGIN } from '../../constant.js';

export const createToken = (): string => {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
};

export const createShareLink = (token: string): string => {
  return `${ORIGIN}/share/view/${encodeURIComponent(token)}`;
};
