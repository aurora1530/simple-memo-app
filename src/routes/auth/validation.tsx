import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import {
  createChangePasswordForm,
  createLoginForm,
  createRegisterForm,
} from '../../components/auth/AuthForm.js';
import { PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH } from './constant.js';
import prisma from '../../prisma.js';
import type { Context } from 'hono';
import { setLogoutToSession, type AuthenticatedEnv } from '../../session.js';
import { verifyPassword } from '../../lib/auth/password.js';
import { t } from '../../i18n/index.js';

const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH)
  .regex(/^[A-Za-z0-9]+$/);

const usernameSchema = z.string().min(1).max(USERNAME_MAX_LENGTH);

export const registerValidator = zValidator(
  'form',
  z.object({
    username: usernameSchema,
    password: passwordSchema,
  }),
  (result, c) => {
    if (!result.success) {
      const errorMessages = result.error.errors.map((e) => {
        if (e.path?.[0] === 'username') {
          if (e.code === 'too_small') return t(c, 'auth.username.required');
          if (e.code === 'too_big') return t(c, 'auth.username.max', { max: USERNAME_MAX_LENGTH });
        }
        if (e.path?.[0] === 'password') {
          if (e.code === 'too_small') return t(c, 'auth.password.min', { min: PASSWORD_MIN_LENGTH });
          if (e.code === 'invalid_string') return t(c, 'auth.password.regex');
        }
        return e.message;
      });
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
      const errorMessages = result.error.errors.map((e) => {
        if (e.path?.[0] === 'username') {
          if (e.code === 'too_small') return t(c, 'auth.username.required');
          if (e.code === 'too_big') return t(c, 'auth.username.max', { max: USERNAME_MAX_LENGTH });
        }
        return e.message;
      });
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
      session.serverMessage = t(c, 'auth.session.invalid');
      await session.save();
      return c.redirect('/auth/login');
    }

    const verifyOldPasswordIsCorrect = await verifyPassword(
      savedUser.passwordHash,
      result.data.oldPassword
    );
    if (!verifyOldPasswordIsCorrect) {
      return createChangePasswordForm(c, {
        errorMessages: [t(c, 'auth.password.old.wrong')],
      });
    }

    const verifyNewPasswordIsEqual =
      result.data.newPassword === result.data.newPasswordConfirm;
    if (!verifyNewPasswordIsEqual) {
      return createChangePasswordForm(c, {
        errorMessages: [t(c, 'auth.password.new.mismatch')],
      });
    }

    const verifyNewPasswordIsDifferent = !(await verifyPassword(
      savedUser.passwordHash,
      result.data.newPassword
    ));
    if (!verifyNewPasswordIsDifferent) {
      // `oldPassword`が正しいことは確認済みなので、このエラーメッセージを表示しても問題ない。
      return createChangePasswordForm(c, {
        errorMessages: [t(c, 'auth.password.new.same')],
      });
    }

    if (!result.success) {
      const errorMessages = result.error.errors.map((e) => {
        if (e.path?.[0] === 'newPassword') {
          if (e.code === 'too_small') return t(c, 'auth.password.min', { min: PASSWORD_MIN_LENGTH });
          if (e.code === 'invalid_string') return t(c, 'auth.password.regex');
        }
        return e.message;
      });
      return createChangePasswordForm(c, {
        errorMessages: Array.from(new Set(errorMessages)),
      });
    }
  }
);
