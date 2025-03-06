import type { FC } from 'hono/jsx';
import { css, cx, Style } from 'hono/css';
import { createButtonClass } from '../common/style.js';
import { blueColorSet } from '../common/color.js';

interface ProfileProps {
  username: string;
}

const Profile: FC<ProfileProps> = ({ username }) => {
  const containerClass = css`
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 16px;
    max-width: 400px;
    margin: 20px auto;
  `;

  const nameClass = css`
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 12px;
  `;

  const linksClass = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  `;

  const linkClass = cx(
    createButtonClass(blueColorSet),
    css`
      text-align: center;
    `
  );

  return (
    <div className={containerClass}>
      <div className={nameClass}>{username}</div>

      <div className={linksClass}>
        <a href="/auth/changePassword" class={linkClass}>
          パスワード変更
        </a>
        <a href="/memo" class={linkClass}>
          メモ一覧
        </a>
      </div>
    </div>
  );
};

export default Profile;
