import type { FC } from 'hono/jsx';
import { greenColorSet } from '../common/color.js';
import { createButtonClass } from '../common/style.js';
import { useRequestContext } from 'hono/jsx-renderer';
import { t } from '../../i18n/index.js';

interface ShareButtonProps {
  memoId: string;
  alreadyShared: boolean;
}

const ShareButton: FC<ShareButtonProps> = ({ memoId, alreadyShared }) => {
  const buttonClass = createButtonClass(greenColorSet);
  const c = useRequestContext();
  return (
    <>
      <button class={buttonClass} onclick={`createShareLink("${memoId}", ${alreadyShared})`}>
        {t(c, 'memo.share')}
      </button>
      <script src="/public/memoShare.js"></script>
    </>
  );
};

export default ShareButton;
