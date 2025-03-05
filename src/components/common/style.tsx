import { css } from 'hono/css';
import type { ButtonColorSet } from './color.js';

type CreateButtonClassProps = {} & ButtonColorSet;

export const createButtonClass = (createButtonClassProps: CreateButtonClassProps) => css`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-weight: ${createButtonClassProps.bold ? 'bold' : 'normal'};
  cursor: pointer;
  color: ${createButtonClassProps.textColor};
  background-color: ${createButtonClassProps.backgroundColor};
  &:hover {
    background-color: ${createButtonClassProps.hoverColor};
  }
`;
