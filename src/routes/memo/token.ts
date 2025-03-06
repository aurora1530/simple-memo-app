export const createToken = (): string => {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
};
