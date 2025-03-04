import { css } from 'hono/css';
import { MAX_BODY_LENGTH, MAX_TITLE_LENGTH } from '../../routes/memo/constant.js';

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
    margin-bottom: 1rem;
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
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    resize: vertical;
  `;

  const buttonClass = css`
    padding: 0.75rem;
    margin-top: 1rem;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background: #0056b3;
    }
  `;

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

  return (
    <div className={formContainerClass}>
      <form method="post" className={formClass} id="memo-form">
        <div>
          <div class={labelContainerClass}>
            <label htmlFor="title">Title</label>
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
            <label htmlFor="body">Body</label>
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
        <div>
          <button className={buttonClass} type="submit">
            {submitLabel}
          </button>
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
