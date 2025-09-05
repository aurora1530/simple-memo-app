import type { Context } from 'hono';
import type { Modal } from '../../type.js';
import { css } from 'hono/css';
import { createButtonClass } from '../../components/common/style.js';
import { blueColorSet } from '../../components/common/color.js';
import { html } from 'hono/html';
import { t } from '../../i18n/index.js';

const containerClass = css`
  margin-top: 1rem;
`;

const linkContainerClass = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const inputClass = css`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* 選択しやすいように幅を最大化 */
  width: 100%;
`;

const copyButtonClass = createButtonClass(blueColorSet);

export const createShareModal = (c: Context): Modal => ({
  title: t(c, 'share.title'),
  children: (
    <>
      <div className={containerClass}>
        <p>{t(c, 'share.copy.desc')}</p>
        <div className={linkContainerClass}>
          <input type="text" id="shareLink" className={inputClass} disabled />
          <button className={copyButtonClass} onclick="copyShareLink()">{t(c, 'share.copy')}</button>
        </div>
        {html` <script>
          function copyShareLink() {
            const linkInput = document.getElementById('shareLink');
            if (linkInput) {
              linkInput.select();
              navigator.clipboard.writeText(linkInput.value);
              alert(window.__I18N__['alert.copied']);
            }
          }
        </script>`}
      </div>
    </>
  ),
});

export default createShareModal;
