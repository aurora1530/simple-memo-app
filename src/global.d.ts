import type {} from 'hono';
import type { Session } from './session.ts';

declare module 'hono' {
  interface Env {
    Variables: {
      session: Session;
    };
    Bindings: {};
  }

  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: {
        title: string;
      }
    ): Response;
  }
}
