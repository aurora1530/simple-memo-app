import type { Memo } from '@prisma/client';
import { formatDate } from '../../utils/date.js';
import { css } from 'hono/css';

interface MemoListProps {
  memos: Memo[];
}

const MemoList = async ({ memos }: MemoListProps) => {
  const memoContainerClass = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
    text-align: right;
  `;

  const memoActionsLinkClass = css`
    text-decoration: none;
    color: #007bff;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  `;

  const cutDownedBody = (body: string) => {
    if (body.length > 100) {
      return body.slice(0, 100) + '...';
    }
    return body;
  };

  return (
    <div className={memoContainerClass}>
      {memos.map((memo) => (
        <div key={memo.id} className={memoCardClass}>
          <div className={memoTitleClass}>{memo.title}</div>
          <div className={memoBodyClass}>{cutDownedBody(memo.body)}</div>
          <div className={memoDatesClass}>Updated: {formatDate(memo.updatedAt)}</div>
          <div className={memoDatesClass}>Created: {formatDate(memo.createdAt)}</div>
          <div className={memoActionsClass}>
            <a className={memoActionsLinkClass} href={`/memo/edit/${memo.id}`}>
              Edit
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoList;
