import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createLoginForm, createRegisterForm } from './form.js';

const passwordSchema = z
  .string()
  .min(8, 'パスワードは8文字以上で入力してください')
  .regex(
    /^(?=.*?[a-z])(?=.*?\d)[a-z\d]+$/i,
    'パスワードは英字と数字をそれぞれ1文字以上含む必要があります'
  );

const usernameSchema = z.string().min(1, 'ユーザー名を入力してください');

export const registerValidator = zValidator(
  'form',
  z.object({
    username: usernameSchema,
    password: passwordSchema,
  }),
  (result, c) => {
    if (!result.success) {
      const errorMessages = result.error.errors.map((e) => e.message);
      return createRegisterForm(c, errorMessages);
    }
  }
);

export const loginValidator = zValidator(
  'form',
  z.object({
    username: usernameSchema,
    password: z.string(),
  }),
  (result, c) => {
    if (!result.success) {
      const errorMessages = result.error.errors.map((e) => e.message);
      return createLoginForm(c, errorMessages);
    }
  }
);
