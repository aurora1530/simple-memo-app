import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import {
  createChangePasswordForm,
  createLoginForm,
  createRegisterForm,
} from '../../components/auth/AuthForm.js';
import { passwordMinLength, USERNAME_MAX_LENGTH } from './constant.js';
import prisma from '../../prisma.js';
import type { Context } from 'hono';
import { setLogoutToSession, type AuthenticatedEnv } from '../../session.js';
import { verifyPassword } from '../../lib/auth/password.js';

const passwordSchema = z
  .string()
  .min(passwordMinLength, 'パスワードは8文字以上で入力してください')
  .regex(
    /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]+$/,
    'パスワードは英字の大文字・小文字、そして数字をそれぞれ1文字以上含む必要があります'
  );

const usernameSchema = z
  .string()
  .min(1, 'ユーザー名を入力してください')
  .max(
    USERNAME_MAX_LENGTH,
    `ユーザー名は${USERNAME_MAX_LENGTH}文字以下で入力してください`
  );

export const registerValidator = zValidator(
  'form',
  z.object({
    username: usernameSchema,
    password: passwordSchema,
  }),
  (result, c) => {
    if (!result.success) {
      const errorMessages = result.error.errors.map((e) => e.message);
      return createRegisterForm(c, {
        errorMessages,
        defaultUsername: result.data.username,
      });
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
      return createLoginForm(c, {
        errorMessages,
        defaultUsername: result.data.username,
      });
    }
  }
);

/**
 * パスワード変更フォームのバリデーション
 * ログイン済みであることは事前に保証する必要がある
 */
export const changePasswordValidator = zValidator(
  'form',
  z.object({
    oldPassword: z.string(),
    newPassword: passwordSchema,
    newPasswordConfirm: passwordSchema,
  }),
  async (result, c: Context<AuthenticatedEnv>) => {
    const session = c.get('session');

    const userID = session.user.id;
    const savedUser = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    if (!savedUser) {
      setLogoutToSession(session);
      session.serverMessage = 'セッション状態が不正です。ログインし直してください。';
      await session.save();
      return c.redirect('/auth/login');
    }

    const verifyOldPasswordIsCorrect = await verifyPassword(
      savedUser.passwordHash,
      result.data.oldPassword
    );
    if (!verifyOldPasswordIsCorrect) {
      return createChangePasswordForm(c, {
        errorMessages: ['現在のパスワードが違います'],
      });
    }

    const verifyNewPasswordIsEqual =
      result.data.newPassword === result.data.newPasswordConfirm;
    if (!verifyNewPasswordIsEqual) {
      return createChangePasswordForm(c, {
        errorMessages: ['新しいパスワードが一致しません'],
      });
    }

    const verifyNewPasswordIsDifferent = !(await verifyPassword(
      savedUser.passwordHash,
      result.data.newPassword
    ));
    if (!verifyNewPasswordIsDifferent) {
      // `oldPassword`が正しいことは確認済みなので、このエラーメッセージを表示しても問題ない。
      return createChangePasswordForm(c, {
        errorMessages: ['新しいパスワードは現在のパスワードと異なる必要があります'],
      });
    }

    if (!result.success) {
      const errorMessages = result.error.errors.map((e) => e.message);
      return createChangePasswordForm(c, {
        errorMessages: Array.from(new Set(errorMessages)),
      });
    }
  }
);
