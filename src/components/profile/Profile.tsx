import type { FC } from 'hono/jsx';
import { css, cx, Style } from 'hono/css';
import { createButtonClass } from '../common/style.tsx';
import { blueColorSet, redColorSet } from '../common/color.ts';
import { useRequestContext } from 'hono/jsx-renderer';
import { t } from '../../i18n/index.ts';

interface ProfileProps {
  username: string;
}

const Profile: FC<ProfileProps> = ({ username }) => {
  const c = useRequestContext();
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
        <a href="/auth/changePassword" class={blueLinkClass}>{t(c,'profile.changePassword')}</a>
        <a
          href="/auth/logout"
          class={redLinkClass}
          onclick={`if (!confirm(window.__I18N__['confirm.logout'])) event.preventDefault();`}
        >
          {t(c, 'nav.logout')}
        </a>
        <hr class={hrClass} />
        <a href="/memo" class={blueLinkClass}>{t(c, 'nav.memoList')}</a>
        <a href="/memo/trash" class={redLinkClass}>{t(c, 'nav.trash')}</a>
      </div>
    </div>
  );
};

export default Profile;
