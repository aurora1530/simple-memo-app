import { css } from 'hono/css';
import type { FC } from 'hono/jsx';
import { PASSWORD_MIN_LENGTH } from '../../routes/auth/constant.js';

const HintBox: FC = () => {
  const passwordHintBoxClass = css`
    width: 100%;
    background-color: rgb(237, 244, 252);
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
    <div class={passwordHintBoxClass}>
      <span>パスワードの要件:</span>
      <ul class={passwordHintListClass}>
        <li>パスワードは{PASSWORD_MIN_LENGTH}文字以上で入力してください</li>
        <li>半角英数字のみ使用可能です</li>
        <li>英語の大文字・小文字、数字をそれぞれ1文字以上含めてください</li>
      </ul>
    </div>
  );
};

export default HintBox;
