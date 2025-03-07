import * as argon2 from 'argon2';

export const generatePasswordHash = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
  });
};

export const verifyPassword = async (
  hashedPassword: string,
  rawPassword: string
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, rawPassword);
};
