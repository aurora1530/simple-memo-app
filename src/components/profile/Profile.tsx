import type { FC } from 'hono/jsx';
import { css, cx, Style } from 'hono/css';
import { createButtonClass } from '../common/style.js';
import { blueColorSet, redColorSet } from '../common/color.js';

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

  const blueLinkClass = cx(
    createButtonClass(blueColorSet),
    css`
      text-align: center;
    `
  );

  const redLinkClass = cx(
    createButtonClass(redColorSet),
    css`
      text-align: center;
    `
  );

  const hrClass = css`
    border: none;
    border-top: 1px solid #ccc;
    margin: 10px 0;
  `;

  return (
    <div className={containerClass}>
      <div className={nameClass}>{username}</div>

      <div className={linksClass}>
        <a href="/auth/changePassword" class={blueLinkClass}>
          パスワード変更
        </a>
        <a
          href="/auth/logout"
          class={redLinkClass}
          onclick={`if (!confirm('ログアウトしますか？')) event.preventDefault();`}
        >
          ログアウト
        </a>
        <hr class={hrClass} />
        <a href="/memo" class={blueLinkClass}>
          メモ一覧
        </a>
        <a href="/memo/trash" class={redLinkClass}>
          ゴミ箱
        </a>
      </div>
    </div>
  );
};

export default Profile;
