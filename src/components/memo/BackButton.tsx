import { css } from 'hono/css';
import type { FC } from 'hono/jsx';

const BackButton: FC = () => {
  const backButtonClass = css`
    padding: 0.75rem;
    margin-top: 1rem;
    background-color: #6c757d;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background-color: #5a6268;
    }
  `;

  return (
    <button type="button" className={backButtonClass} onclick="history.back()">
      戻る
    </button>
  );
};

export default BackButton;
