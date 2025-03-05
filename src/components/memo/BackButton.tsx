import { css } from 'hono/css';
import type { FC } from 'hono/jsx';
import { createButtonClass } from '../common/style.js';
import { grayColorSet } from '../common/color.js';

const BackButton: FC = () => {
  const backButtonClass = createButtonClass(grayColorSet);

  return (
    <button type="button" className={backButtonClass} onclick="history.back()">
      戻る
    </button>
  );
};

export default BackButton;
