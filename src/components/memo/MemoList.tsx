import type { Memo } from '@prisma/client';
import { formatDate } from '../../utils/date.js';

interface MemoListProps {
  memos: Memo[];
}

const MemoList = async ({ memos }: MemoListProps) => {
  return (
    <div>
      {memos.map((memo) => (
        <div key={memo.id} className="memo">
          <div className="memo-title">{memo.title}</div>
          <div className="memo-body">{memo.body}</div>
          <div className="memo-dates">Updated: {formatDate(memo.updatedAt)}</div>
          <div className="memo-dates">Created: {formatDate(memo.createdAt)}</div>
        </div>
      ))}
    </div>
  );
};

export default MemoList;
