import type { Modal } from '../../type.js';
import { css } from 'hono/css';
import { createButtonClass } from '../../components/common/style.js';
import { blueColorSet } from '../../components/common/color.js';
import { html } from 'hono/html';

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

const shareModal: Modal = {
  title: '共有リンク',
  children: (
    <>
      <div className={containerClass}>
        <p>共有リンクをコピーしてください</p>
        <div className={linkContainerClass}>
          <input type="text" id="shareLink" className={inputClass} disabled />
          <button className={copyButtonClass} onclick="copyShareLink()">
            コピー
          </button>
        </div>
        {html` <script>
          function copyShareLink() {
            const linkInput = document.getElementById('shareLink');
            if (linkInput) {
              linkInput.select();
              navigator.clipboard.writeText(linkInput.value);
              alert('コピーしました');
            }
          }
        </script>`}
      </div>
    </>
  ),
};

export default shareModal;
