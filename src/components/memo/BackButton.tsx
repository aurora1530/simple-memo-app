import { css } from 'hono/css';
import type { FC } from 'hono/jsx';
import { createButtonClass } from '../common/style.tsx';
import { grayColorSet } from '../common/color.ts';
import { useRequestContext } from 'hono/jsx-renderer';
import { t } from '../../i18n/index.ts';

const BackButton: FC = () => {
  const backButtonClass = createButtonClass(grayColorSet);
  const c = useRequestContext();

  return (
    <button type="button" className={backButtonClass} onclick="history.back()">{t(c,'common.back')}</button>
  );
};

export default BackButton;
