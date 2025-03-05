import type { Memo } from '@prisma/client';
import { formatDate, TIMEZONE_OFFSET_JST } from '../../utils/date.js';
import { css, cx } from 'hono/css';

interface MemoListProps {
  memos: Memo[];
  mode: 'trash' | 'list';
}

const MemoList = async ({ memos, mode }: MemoListProps) => {
  const memoContainerClass = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 1fr;
    gap: 20px;
    margin-top: 20px;
  `;

  const memoCardClass = css`
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    transition: transform 0.2s ease;

    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-2px);
    }
  `;

  const cursorPointerClass = css`
    cursor: pointer;
  `;

  const memoTitleClass = css`
    font-size: 1.4em;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  `;

  const memoBodyClass = css`
    font-size: 1em;
    color: #555;
    margin-bottom: 12px;
    white-space: pre-wrap;
  `;

  const dateContainerClass = css`
    display: flex;
    flex-direction: column;
    margin-top: auto;
  `;

  const memoDatesClass = css`
    font-size: 0.8em;
    margin-bottom: 8px;
  `;

  const memoUpdatedAtClass = css`
    color: #777;
    font-weight: 500;
  `;

  const memoCreatedAtClass = css`
    color: #888;
  `;

  const memoActionsClass = css`
    display: flex;
    justify-content: space-between;
    pointer-events: auto;
  `;

  const editButtonClass = css`
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #0056b3;
    }
    pointer-events: all;
  `;

  const deleteButtonClass = css`
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f1b0b7;
    }
    pointer-events: all;
  `;

  const restoreButtonClass = css`
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #c1e2b3;
    }
    pointer-events: all;
  `;

  const noMemoMessageClass = css`
    text-align: center;
    color: #666;
    font-size: 1.2em;
    margin-top: 2rem;
  `;

  if (memos.length === 0) {
    return (
      <div class={noMemoMessageClass}>
        <p>メモがありません。</p>
      </div>
    );
  }

  const cutDownedBody = (body: string) => {
    if (body.length > 100) {
      return body.slice(0, 100) + '...';
    }
    return body;
  };

  return (
    <div class={memoContainerClass}>
      {memos.map((memo) => (
        <div
          key={memo.id}
          class={cx(memoCardClass, mode === 'list' && cursorPointerClass)}
          onclick={mode === 'list' && `location.href='/memo/view/${memo.id}'`}
        >
          <div class={memoTitleClass}>{memo.title}</div>
          <div class={memoBodyClass}>{cutDownedBody(memo.body)}</div>
          <div class={dateContainerClass}>
            <div class={cx(memoDatesClass, memoUpdatedAtClass)}>
              Updated: {formatDate(memo.updatedAt, TIMEZONE_OFFSET_JST)}
            </div>
            <div class={cx(memoDatesClass, memoCreatedAtClass)}>
              Created: {formatDate(memo.createdAt, TIMEZONE_OFFSET_JST)}
            </div>
          </div>
          <div class={memoActionsClass}>
            {mode === 'list' ? (
              <>
                <a class={editButtonClass} href={`/memo/edit/${memo.id}`}>
                  Edit
                </a>
                <button
                  class={deleteButtonClass}
                  onclick={`deleteMemo("${memo.id}");event.stopPropagation();`}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <div>{/* empty for design*/}</div>
                <button
                  class={restoreButtonClass}
                  onclick={`restoreMemo("${memo.id}");event.stopPropagation();`}
                >
                  Restore
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <script
        src={mode === 'list' ? '/public/memoDelete.js' : '/public/memoRestore.js'}
      ></script>
    </div>
  );
};

export default MemoList;
