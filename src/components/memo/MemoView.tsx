import { css } from 'hono/css';
import type { Memo } from '@prisma/client';
import { formatDate, TIMEZONE_OFFSET_JST } from '../../utils/date.js';

interface MemoViewProps {
  memo: Memo;
}

const MemoView = ({ memo }: MemoViewProps) => {
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
  const buttonClass = css`
    display: inline-block;
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

  return (
    <div className={containerClass}>
      <div className={titleClass}>{memo.title}</div>
      <div className={bodyClass}>{memo.body}</div>
      <div className={dateClass}>
        Updated: {formatDate(memo.updatedAt, TIMEZONE_OFFSET_JST)}
      </div>
      <div className={dateClass}>
        Created: {formatDate(memo.createdAt, TIMEZONE_OFFSET_JST)}
      </div>
      <div>
        <a className={buttonClass} href={`/memo/edit/${memo.id}`}>
          Edit
        </a>
      </div>
    </div>
  );
};

export default MemoView;
