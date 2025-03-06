import type {} from 'hono';
import type { Session } from './session.ts';
import type { Modal } from './type.ts';

declare module 'hono' {
  interface ContextVariableMap {
    session: Session;
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
