import { css } from 'hono/css';

interface FormProps {
  isRegister: boolean;
  errorMessage?: string;
}

const Form = ({ isRegister, errorMessage }: FormProps) => {
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
    margin-bottom: 1rem;
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
          />
          <input
            class={inputClass}
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button class={buttonClass} type="submit">
            {isRegister ? '登録' : 'ログイン'}
          </button>
          {errorMessage && <p className={errorClass}>{errorMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Form;
