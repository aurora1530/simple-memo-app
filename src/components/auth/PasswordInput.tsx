import type { FC } from 'hono/jsx';
import { passwordMinLength } from '../../routes/auth/constant.js';
import { inputClass } from './style.js';

interface PasswordInputProps {
  autocomplete: 'new-password' | 'current-password';
  name: string;
  placeholder: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ autocomplete, name, placeholder }) => {
  return (
    <input
      class={inputClass}
      type="password"
      name={name}
      id={name}
      placeholder={placeholder}
      autocomplete={autocomplete}
      minlength={passwordMinLength}
      required
    />
  );
};

export default PasswordInput;
