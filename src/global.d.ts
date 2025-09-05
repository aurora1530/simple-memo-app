import type {} from 'hono';
import type { Session } from './session.ts';
import type { Modal } from './type.ts';
import type { Locale } from './i18n/index.ts';

declare module 'hono' {
  interface ContextVariableMap {
    session: Session;
    language: Locale;
  }

  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: {
        title: string;
        modal?: Modal;
      }
    ): Response;
  }
}
