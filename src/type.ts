import type { Child } from 'hono/jsx';

export interface Modal {
  title: string;
  children: Child;
}
