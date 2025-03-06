import type { FC } from 'hono/jsx';
import { greenColorSet } from '../common/color.js';
import { createButtonClass } from '../common/style.js';

interface ShareButtonProps {
  memoId: string;
}

const ShareButton: FC<ShareButtonProps> = ({ memoId }) => {
  const buttonClass = createButtonClass(greenColorSet);
  return (
    <>
      <button class={buttonClass} onclick={`createShareLink("${memoId}")`}>
        Share
      </button>
      <script src="/public/memoShare.js"></script>
    </>
  );
};

export default ShareButton;
