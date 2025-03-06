import type { Context } from 'hono';
import { css, cx } from 'hono/css';
import { createButtonClass } from '../common/style.js';
import { blueColorSet } from '../common/color.js';
import HintBox from './HintBox.js';
import { inputClass } from './style.js';
import PasswordInput from './PasswordInput.js';

interface FormProps {
  isRegister: boolean;
  defaultUsername?: string;
  errorMessages?: string[];
}

const AuthForm = ({ isRegister, defaultUsername, errorMessages }: FormProps) => {
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

  // エラーメッセージ用のスタイル
  const errorClass = css`
    color: #ff0000;
    font-weight: bold;
  `;

  const buttonClass = cx(
    createButtonClass(blueColorSet),
    css`
      width: 100%;
      margin-top: 1rem;
      font-size: 1.2rem;
    `
  );

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
          />
          {isRegister && <HintBox />}
          <button class={buttonClass} type="submit">
            {isRegister ? '新規登録' : 'ログイン'}
          </button>
          {errorMessages && (
            <div class={errorClass}>
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
    {
      title: '新規登録',
    }
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
    {
      title: 'ログイン',
    }
  );
};
