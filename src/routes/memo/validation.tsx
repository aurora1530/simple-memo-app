import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import MemoForm from '../../components/memo/MemoForm.tsx';
import { getGraphemeCount } from '../../utils/string.ts';
import { MAX_BODY_LENGTH, MAX_TITLE_LENGTH } from './constant.ts';
import { t } from '../../i18n/index.ts';

type MemoValidationMode = 'create' | 'edit';

export const memoValidation = (type: MemoValidationMode) =>
  zValidator(
    'form',
    z.object({
      title: z
        .string()
        .min(1)
        .refine((title) => getGraphemeCount(title) <= MAX_TITLE_LENGTH),
      body: z
        .string()
        .min(1)
        .refine((body) => getGraphemeCount(body) <= MAX_BODY_LENGTH),
    }),
    (result, c) => {
      if (!result.success) {
        const errorMessages = result.error.errors.map((err) => {
          const path = err.path?.[0];
          if (path === 'title') {
            if (err.code === 'too_small') return t(c, 'form.title.required');
            if (err.code === 'custom') return t(c, 'form.title.max', { max: MAX_TITLE_LENGTH });
          }
          if (path === 'body') {
            if (err.code === 'too_small') return t(c, 'form.body.required');
            if (err.code === 'custom') return t(c, 'form.body.max', { max: MAX_BODY_LENGTH });
          }
          return err.message;
        });
        const submitLabel = type === 'create' ? t(c,'memo.create.title') : t(c,'memo.update.title');
        const pageTitle = submitLabel;
        return c.render(
          <MemoForm
            submitLabel={submitLabel}
            defaultTitle={result.data.title}
            defaultBody={result.data.body}
            errorMessages={errorMessages}
          />,
          { title: pageTitle }
        );
      }
    }
  );
