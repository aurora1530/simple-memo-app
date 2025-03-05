import { css, Style } from 'hono/css';
import { MAX_BODY_LENGTH, MAX_TITLE_LENGTH } from '../../routes/memo/constant.js';
import BackButton from './BackButton.js';
import { createButtonClass } from '../common/style.js';
import { blueColorSet } from '../common/color.js';

interface MemoFormProps {
  submitLabel: string;
  defaultTitle?: string;
  defaultBody?: string;
  errorMessages?: string[];
}

const MemoForm = ({
  submitLabel,
  defaultTitle = '',
  defaultBody = '',
  errorMessages,
}: MemoFormProps) => {
  const formContainerClass = css`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  `;

  const formClass = css`
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #ddd;
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `;

  // エラーメッセージ用スタイル
  const errorClass = css`
    color: #ff0000;
    font-weight: bold;
  `;

  const inputClass = css`
    box-sizing: border-box;
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  `;

  const textareaClass = css`
    box-sizing: border-box;
    width: 100%;
    height: 40vh;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    resize: vertical;
  `;

  const buttonClass = createButtonClass(blueColorSet);

  const labelContainerClass = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `;

  const charCountContainerClass = css`
    margin-left: 0.5rem;
    display: inline-block;
  `;

  const charCountClass = css`
    font-size: 0.85rem;
    color: #666;
  `;

  const bottomButtonContainerClass = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `;

  return (
    <div className={formContainerClass}>
      <Style>
        {css`
          /* 文字数制限を超えたときに赤文字にするクラス */
          .char-count--over-limit {
            color: #ff0000 !important;
          }
        `}
      </Style>
      <form method="post" className={formClass} id="memo-form">
        <input type="hidden" id="max-title-length" value={MAX_TITLE_LENGTH} />
        <input type="hidden" id="max-body-length" value={MAX_BODY_LENGTH} />

        <div>
          <div class={labelContainerClass}>
            <label htmlFor="memo-title">Title</label>
            <div class={charCountContainerClass}>
              <span id="title-char-count" className={charCountClass}></span>
              <span className={charCountClass}>/{MAX_TITLE_LENGTH}</span>
            </div>
          </div>
          <input
            class={inputClass}
            type="text"
            name="title"
            id="memo-title"
            value={defaultTitle}
            placeholder="タイトルを入力"
          />
        </div>
        <div>
          <div class={labelContainerClass}>
            <label htmlFor="memo-body">Body</label>
            <div class={charCountContainerClass}>
              <span id="body-char-count" className={charCountClass}></span>
              <span className={charCountClass}>/{MAX_BODY_LENGTH}</span>
            </div>
          </div>
          <textarea
            className={textareaClass}
            name="body"
            id="memo-body"
            placeholder="メモ内容を入力"
          >
            {defaultBody}
          </textarea>
        </div>
        <div class={bottomButtonContainerClass}>
          <button className={buttonClass} type="submit">
            {submitLabel}
          </button>
          <BackButton />
        </div>
        {errorMessages && (
          <div class={errorClass}>
            {errorMessages.map((message) => (
              <p>{message}</p>
            ))}
          </div>
        )}
      </form>
      <script src="/public/memoForm.js"></script>
    </div>
  );
};

export default MemoForm;
