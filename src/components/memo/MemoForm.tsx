import { css } from 'hono/css';

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
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  `;

  const textareaClass = css`
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

  return (
    <div className={formContainerClass}>
      <form method="post" className={formClass} id="memo-form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            className={inputClass}
            type="text"
            name="title"
            id="title"
            value={defaultTitle}
            placeholder="タイトルを入力"
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
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
