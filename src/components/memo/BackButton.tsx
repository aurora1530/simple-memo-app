import { css } from 'hono/css';
import type { FC } from 'hono/jsx';
import { createButtonClass } from '../common/style.js';
import { grayColorSet } from '../common/color.js';
import { useRequestContext } from 'hono/jsx-renderer';
import { t } from '../../i18n/index.js';

const BackButton: FC = () => {
  const backButtonClass = createButtonClass(grayColorSet);
  const c = useRequestContext();

  return (
    <button type="button" className={backButtonClass} onclick="history.back()">{t(c,'common.back')}</button>
  );
};

export default BackButton;
