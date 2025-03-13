import { useMemo, useState } from 'react';
import Input from '../../components/common/Input/Input.jsx';
import useForm from '../../hook/useForm.js';
import useFormValidation from '../../hook/useFormValidation.js';
import useSignUp from '../../hook/useSignUp.js';

const TYPE = 'singup';
function SingUp() {
  const { value, handleOnChange } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const validate = useFormValidation(value, setError, TYPE);
  const [setMessage] = useState('');
  const handleSignUp = useSignUp(value, setError, setMessage, validate);
  const isDisabled = useMemo(
    () => Object.values(error).some((e) => e) || Object.values(value).some((v) => !v),
    [value, error]
  );

  return (
    <form
      onSubmit={handleSignUp}
      className="text-white bg-gray mt-28 border p-10 space-y-6 max-w-lg mx-auto shadow-lg rounded-lg"
    >
      <Input
        name="email"
        value={value.email}
        onChange={handleOnChange}
        error={error.email}
        placeholder="이메일을 입력해주세요"
        type="email"
        label="이메일"
      />
      <Input
        name="name"
        value={value.name}
        onChange={handleOnChange}
        error={error.name}
        type="name"
        placeholder="이름을 입력해주세요."
        label="이름"
      />
      <Input
        name="password"
        value={value.password}
        onChange={handleOnChange}
        error={error.password}
        placeholder="비밀번호를 입력해주세요."
        type="password"
        label="비밀번호"
      />
      <Input
        name="confirmPassword"
        value={value.confirmPassword}
        onChange={handleOnChange}
        error={error.confirmPassword}
        placeholder="비밀번호 확인을 입력해주세요."
        type="password"
        label="비밀번호 확인"
      />
      <button
        type="submit"
        className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-300 disabled:opacity-50 cursor-not-allowed"
        disabled={isDisabled}
      >
        시작하기 >
      </button>
    </form>
  );
}

export default SingUp;
