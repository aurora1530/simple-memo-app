import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import MemoForm from '../../components/memo/MemoForm.js';


export const memoValidation = (type: 'create'|'edit') =>
  zValidator(
    'form',
    z.object({
      title: z.string().min(1, 'タイトルを入力してください'),
      body: z.string().min(1, '本文を入力してください'),
    }),
    (result, c) => {
      if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message);
        return c.render(
          <MemoForm
            submitLabel={type === 'create' ? '新規作成' : '更新'}
            defaultTitle={result.data.title}
            defaultBody={result.data.body}
            errorMessages={errorMessages}
          />,
          {
            title: type === 'create' ? 'Create Memo' : 'Edit Memo',
          }
        );
      }
    }
  );
