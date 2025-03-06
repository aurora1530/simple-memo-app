import type { FC } from 'hono/jsx';
import { passwordMinLength } from '../../routes/auth/constant.js';
import { inputClass } from './style.js';

interface PasswordInputProps {
  autocomplete: 'new-password' | 'current-password';
}

const PasswordInput: FC<PasswordInputProps> = ({ autocomplete }) => {
  return (
    <input
      class={inputClass}
      type="password"
      name="password"
      id="password"
      placeholder="password"
      autocomplete={autocomplete}
      minlength={passwordMinLength}
      required
    />
  );
};

export default PasswordInput;
