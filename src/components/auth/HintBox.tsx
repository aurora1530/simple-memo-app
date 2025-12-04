import { css } from 'hono/css';
import type { FC } from 'hono/jsx';
import { PASSWORD_MIN_LENGTH } from '../../routes/auth/constant.ts';
import { useRequestContext } from 'hono/jsx-renderer';
import { t } from '../../i18n/index.ts';

const HintBox: FC = () => {
  const c = useRequestContext();
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
      <span>{t(c,'auth.password.hint.title')}</span>
      <ul class={passwordHintListClass}>
        <li>{t(c,'auth.password.min',{min:PASSWORD_MIN_LENGTH})}</li>
        <li>{t(c,'auth.password.alnum')}</li>
      </ul>
    </div>
  );
};

export default HintBox;
