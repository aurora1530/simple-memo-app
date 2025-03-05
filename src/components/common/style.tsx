import { css } from 'hono/css';

interface CreateButtonClassProps {
  textColor?: string;
  backgroundColor: string;
  hoverColor: string;
  bold?: boolean;
}
export const createButtonClass = ({
  textColor = '#fff',
  backgroundColor,
  hoverColor,
  bold = true,
}: CreateButtonClassProps) => css`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-weight: ${bold ? 'bold' : 'normal'};
  cursor: pointer;
  color: ${textColor};
  background-color: ${backgroundColor};
  &:hover {
    background-color: ${hoverColor};
  }
`;
