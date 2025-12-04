import type { Context } from 'hono';
import { css, cx } from 'hono/css';
import { createButtonClass, errorTextClass } from '../common/style.js';
import { blueColorSet } from '../common/color.js';
import HintBox from './HintBox.js';
import { inputClass } from './style.js';
import PasswordInput from './PasswordInput.js';
import type { FC } from 'hono/jsx';
import { useRequestContext } from 'hono/jsx-renderer';
import { t } from '../../i18n/index.js';

interface FormProps {
  isRegister: boolean;
  defaultUsername?: string;
  errorMessages?: string[];
}

const formContainerClass = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const formClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border: 1px solid #ddd;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const buttonClass = cx(
  createButtonClass(blueColorSet),
  css`
    width: 100%;
    margin-top: 1rem;
    font-size: 1.2rem;
  `
);

const AuthForm = ({ isRegister, defaultUsername, errorMessages }: FormProps) => {
  const c = useRequestContext();
  return (
    <>
      <div className={formContainerClass}>
        <form method="post" className={formClass}>
          <input
            class={inputClass}
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={defaultUsername}
            required
          />
          <PasswordInput
            autocomplete={isRegister ? 'new-password' : 'current-password'}
            name="password"
            placeholder="password"
          />
          {isRegister && <HintBox />}
          <button class={buttonClass} type="submit">{isRegister ? t(c,'nav.register') : t(c,'nav.login')}</button>
          {errorMessages && (
            <div class={errorTextClass}>
              {errorMessages.map((message) => (
                <p>{message}</p>
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

type createOptions = Omit<FormProps, 'isRegister'>;

export const createRegisterForm = (c: Context, options?: createOptions) => {
  return c.render(
    <AuthForm
      {...{
        isRegister: true,
        ...options,
      }}
    />,
    { title: t(c, 'nav.register') }
  );
};

export const createLoginForm = (c: Context, options?: createOptions) => {
  return c.render(
    <AuthForm
      {...{
        isRegister: false,
        ...options,
      }}
    />,
    { title: t(c, 'nav.login') }
  );
};

interface ChangePasswordFormProps {
  errorMessages?: string[];
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ errorMessages }) => {
  const c = useRequestContext();
  return (
    <>
      <div className={formContainerClass}>
        <form method="post" className={formClass}>
          <PasswordInput
            autocomplete="current-password"
            name="oldPassword"
            placeholder="old password"
          />
          <PasswordInput
            autocomplete="new-password"
            name="newPassword"
            placeholder="new password"
          />
          <PasswordInput
            autocomplete="new-password"
            name="newPasswordConfirm"
            placeholder="confirm new password"
          />
          <HintBox />
          <button class={buttonClass} type="submit">{t(c,'profile.changePassword')}</button>
          {errorMessages && (
            <div class={errorTextClass}>
              {errorMessages.map((message) => (
                <p>{message}</p>
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export const createChangePasswordForm = (
  c: Context,
  options?: ChangePasswordFormProps
) => {
  return c.render(<ChangePasswordForm {...options} />, { title: t(c, 'profile.changePassword') });
};
