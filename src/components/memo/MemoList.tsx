import type { Memo } from '@prisma/client';
import { formatDate } from '../../utils/date.js';
import { css } from 'hono/css';

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

    display: flex; /* 縦方向に並べる */
    flex-direction: column; /* 下部にアクションを配置するため */
    &:hover {
      transform: translateY(-2px);
    }
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

  const memoDatesClass = css`
    font-size: 0.8em;
    color: #888;
    margin-bottom: 8px;
  `;

  const memoActionsClass = css`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  `;

  // 編集ボタンは強調するため、背景色・文字色・パディングを設定
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
  `;

  // 削除ボタンは目立ちすぎないように、控えめな色合いに変更
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
        <div key={memo.id} class={memoCardClass}>
          <div class={memoTitleClass}>{memo.title}</div>
          <div class={memoBodyClass}>{cutDownedBody(memo.body)}</div>
          <div class={memoDatesClass}>Updated: {formatDate(memo.updatedAt)}</div>
          <div class={memoDatesClass}>Created: {formatDate(memo.createdAt)}</div>
          <div class={memoActionsClass}>
            <a class={editButtonClass} href={`/memo/edit/${memo.id}`}>
              Edit
            </a>
            {mode === 'list' ? (
              <>
                <button class={deleteButtonClass} onclick={`deleteMemo("${memo.id}")`}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button class={restoreButtonClass} onclick={`restoreMemo("${memo.id}")`}>
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
