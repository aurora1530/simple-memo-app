import { css, Style } from 'hono/css';
import type { FC } from 'hono/jsx';

const Footer: FC = () => {
  const footerClass = css`
    background-color: #f0f0f0;
    padding: 20px;
    border-top: 1px solid #ccc;
  `;

  const footerContentClass = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `;

  const footerLinksContainerClass = css`
    display: flex;
    gap: 15px;
  `;

  const footerLinkClass = css`
    color: #333;
    &:hover {
      color: #007bff;
    }
  `;

  const footerCopyClass = css`
    font-size: 0.9em;
    color: #666;
  `;

  return (
    <footer class={footerClass}>
      <div class={footerContentClass}>
        <div class={footerLinksContainerClass}>
          <a
            class={footerLinkClass}
            href="https://github.com/aurora1530/simple-memo-app"
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <p class={footerCopyClass}>
          <a class={footerLinkClass} href="https://github.com/aurora1530" target="_blank">
            @aurora1530
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
