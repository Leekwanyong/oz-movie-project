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
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const validate = useFormValidation(value, setError, TYPE, touched);
  const [message, setMessage] = useState('');
  const handleSignUp = useSignUp(value, setError, setMessage, validate);
  const isDisabled = useMemo(
    () => Object.values(error).some((e) => e) || Object.values(value).some((v) => !v),
    [value, error]
  );

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="text-white bg-gray mt-28 border p-10 space-y-6 max-w-lg mx-auto shadow-lg rounded-lg"
    >
      <Input
        name="email"
        value={value.email}
        onChange={handleOnChange}
        onBlur={handleBlur}
        error={error.email}
        placeholder="이메일을 입력해주세요"
        type="email"
        label="이메일"
      />
      <Input
        name="name"
        value={value.name}
        onChange={handleOnChange}
        onBlur={handleBlur}
        error={error.name}
        type="name"
        placeholder="이름을 입력해주세요."
        label="이름"
      />
      <Input
        name="password"
        value={value.password}
        onChange={handleOnChange}
        onBlur={handleBlur}
        error={error.password}
        placeholder="비밀번호를 입력해주세요."
        type="password"
        label="비밀번호"
      />
      <Input
        name="confirmPassword"
        value={value.confirmPassword}
        onChange={handleOnChange}
        onBlur={handleBlur}
        error={error.confirmPassword}
        placeholder="비밀번호 확인을 입력해주세요."
        type="password"
        label="비밀번호 확인"
      />
      {message}
      <button
        type="submit"
        className={`w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-300 disabled:opacity-50 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={isDisabled}
      >
        시작하기 {'>'}
      </button>
    </form>
  );
}

export default SingUp;
