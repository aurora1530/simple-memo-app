interface FormProps {
  isRegister: boolean;
  errorMessage?: string;
}

const Form = ({ isRegister, errorMessage }: FormProps) => {
  return (
    <div>
      <form method="post">
        <input type="text" name="username" id="username" placeholder="username" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">{isRegister ? '登録' : 'ログイン'}</button>
      </form>
      {errorMessage && (
        <p className="error" style="color:red;">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Form;
