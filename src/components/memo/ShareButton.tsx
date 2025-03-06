import type { FC } from 'hono/jsx';
import { greenColorSet } from '../common/color.js';
import { createButtonClass } from '../common/style.js';

interface ShareButtonProps {
  memoId: string;
  alreadyShared: boolean;
}

const ShareButton: FC<ShareButtonProps> = ({ memoId, alreadyShared }) => {
  const buttonClass = createButtonClass(greenColorSet);
  return (
    <>
      <button class={buttonClass} onclick={`createShareLink("${memoId}", ${alreadyShared})`}>
        Share
      </button>
      <script src="/public/memoShare.js"></script>
    </>
  );
};

export default ShareButton;
