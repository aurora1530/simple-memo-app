import { css } from 'hono/css';
import type { Memo } from '@prisma/client';
import { formatDate, TIMEZONE_OFFSET_JST } from '../../utils/date.js';
import BackButton from './BackButton.js';
import { createButtonClass } from '../common/style.js';
import { blueColorSet, redColorSet } from '../common/color.js';
import ShareButton from './ShareButton.js';

type MemoViewProps = {
  memo: Memo;
  isShareView: boolean;
} & (
  | {
      isShareView: true;
      username: string;
    }
  | {
      isShareView: false;
      enableShare: boolean;
    }
);

const MemoView = (props: MemoViewProps) => {
  const { memo, isShareView } = props;

  const containerClass = css`
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `;
  const titleClass = css`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
  `;
  const bodyClass = css`
    white-space: pre-wrap;
    margin-bottom: 1rem;
    color: #555;
  `;
  const dateClass = css`
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  `;

  const buttonClass = createButtonClass(blueColorSet);

  const redButtonClass = createButtonClass(redColorSet);

  const bottomButtonContainerClass = css`
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
  `;

  const usernameClass = css`
    color: #666;
    font-size: 1.2rem;
    font-weight: bold;
    font-style: italic;
    margin: 0 0 1rem 0;
  `;

  return (
    <div className={containerClass}>
      {isShareView && <p class={usernameClass}>Shared by: {props.username}</p>}
      <div className={titleClass}>{memo.title}</div>
      <div className={bodyClass}>{memo.body}</div>
      <div className={dateClass}>
        Updated: {formatDate(memo.updatedAt, TIMEZONE_OFFSET_JST)}
      </div>
      <div className={dateClass}>
        Created: {formatDate(memo.createdAt, TIMEZONE_OFFSET_JST)}
      </div>
      {!isShareView && (
        <div class={bottomButtonContainerClass}>
          <a className={buttonClass} href={`/memo/edit/${memo.id}`}>
            編集
          </a>
          <>
            <ShareButton memoId={memo.id} alreadyShared={!!memo.shareToken} />
            {props.enableShare && (
              <button class={redButtonClass} onclick={`deleteShareLink("${memo.id}")`}>
                共有を停止
              </button>
            )}
          </>
          <BackButton />
        </div>
      )}
    </div>
  );
};

export default MemoView;
