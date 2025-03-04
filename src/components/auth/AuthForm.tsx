import type { Context } from 'hono';
import { css } from 'hono/css';
import { passwordMinLength } from '../../routes/auth/constant.js';

interface FormProps {
  isRegister: boolean;
  errorMessages?: string[];
}

const AuthForm = ({ isRegister, errorMessages }: FormProps) => {
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

  const inputClass = css`
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  `;

  const buttonClass = css`
    width: 100%;
    padding: 0.75rem;
    margin-top: 1rem;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background: #0056b3;
    }
  `;

  const passwordHintBoxClass = css`
    width: 100%;
    background-color:rgb(237, 244, 252);
    border: 1px solid #b8daff;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
    color: #004085;
    font-size: 0.9rem;
  `;

  const passwordHintListClass = css`
    margin: 0.5rem 0 0 1.4rem;
    padding: 0;
    list-style-type: disc;
    line-height: 1.5;
  `;

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
            required
          />
          <input
            class={inputClass}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autocomplete={isRegister ? 'new-password' : 'current-password'}
            minlength={passwordMinLength}
            required
          />
          {isRegister && (
            <div class={passwordHintBoxClass}>
              <p>パスワードの要件:</p>
              <ul class={passwordHintListClass}>
                <li>パスワードは{passwordMinLength}文字以上で入力してください</li>
                <li>半角英数字のみ使用可能です</li>
                <li>英語の大文字・小文字、数字をそれぞれ1文字以上含めてください</li>
              </ul>
            </div>
          )}
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

export const createRegisterForm = (c: Context, errorMessages?: string[]) => {
  return c.render(<AuthForm isRegister={true} errorMessages={errorMessages} />, {
    title: '新規登録',
  });
};

export const createLoginForm = (c: Context, errorMessages?: string[]) => {
  {
    return c.render(<AuthForm isRegister={false} errorMessages={errorMessages} />, {
      title: 'ログイン',
    });
  }
};
