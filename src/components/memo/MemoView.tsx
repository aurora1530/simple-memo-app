import { css, cx } from 'hono/css';
import type { Memo } from '@prisma/client';
import { formatDate, TIMEZONE_OFFSET_JST } from '../../utils/date.ts';
import BackButton from './BackButton.tsx';
import { createButtonClass } from '../common/style.tsx';
import { blueColorSet, redColorSet } from '../common/color.ts';
import ShareButton from './ShareButton.tsx';
import { useRequestContext } from 'hono/jsx-renderer';
import { t } from '../../i18n/index.ts';

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
  const c = useRequestContext();

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

  const redButtonClass = cx(
    createButtonClass(redColorSet),
    css`
      &:disabled {
        background-color: #ccc;
        color: #666;
      }
    `
  );

  const retButtonWithNormalCursor = cx(
    redButtonClass,
    css`
      cursor: default;
    `
  );

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
        {t(c,'common.updated')}: {formatDate(memo.updatedAt, TIMEZONE_OFFSET_JST)}
      </div>
      <div className={dateClass}>
        {t(c,'common.created')}: {formatDate(memo.createdAt, TIMEZONE_OFFSET_JST)}
      </div>
      {!isShareView && (
        <div class={bottomButtonContainerClass}>
          <a className={buttonClass} href={`/memo/edit/${memo.id}`}>{t(c, 'common.edit')}</a>
          <>
            <ShareButton memoId={memo.id} alreadyShared={!!memo.shareToken} />
            <button
              class={memo.shareToken ? redButtonClass : retButtonWithNormalCursor}
              onclick={`deleteShareLink("${memo.id}")`}
              disabled={!memo.shareToken}
            >
              {t(c, 'memo.share.stop')}
            </button>
          </>
          <BackButton />
        </div>
      )}
    </div>
  );
};

export default MemoView;
