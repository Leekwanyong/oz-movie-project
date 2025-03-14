import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Input from '../../components/common/Input/Input.jsx';
import useForm from '../../hook/useForm.js';
import useFormValidation from '../../hook/useFormValidation.js';
import { loadUserSession, LoginThunk } from '../../redux/thunk/loginThunk.js';

function Login() {
  const { value, handleOnChange } = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({ email: '', password: '' });
  const isDisabled = useMemo(
    () => Object.values(error).some((e) => e) || Object.values(value).some((v) => !v),
    [value, error]
  );
  const navigate = useNavigate();
  useFormValidation(value, setError, 'login');

  const handleOnSubmit = async (e, provider, type) => {
    e.preventDefault();
    try {
      await dispatch(LoginThunk({ value, provider, type }));
      await dispatch(loadUserSession());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="text-white bg-gray mt-28 border p-10 space-y-6 max-w-lg mx-auto shadow-lg rounded-lg">
      <Input
        name="email"
        type="email"
        label="이메일"
        value={value.email}
        error={error.email}
        onChange={handleOnChange}
      />
      <Input
        name="password"
        type="password"
        label="비밀번호"
        value={value.password}
        error={error.password}
        onChange={handleOnChange}
      />
      <div className="flex items-center flex-col justify-between gap-4">
        <button
          type="button"
          className="w-full py-3 bg-primary text-white font-semibold shadow-md rounded-md hover:bg-red-700 transition-all duration-300 disabled:opacity-50 cursor-not-allowed"
          onClick={(e) => handleOnSubmit(e)}
          disabled={isDisabled}
        >
          로그인
        </button>
        <button
          type="button"
          className="w-full py-3 bg-white  border border-gray-300  shadow-md text-black font-semibold rounded-md  "
          onClick={(e) => handleOnSubmit(e, 'google', 'google')}
        >
          Google
        </button>
        <button
          type="button"
          className="w-full py-3 bg-neutral-700 text-white font-semibold shadow-md rounded-md hover:bg-gray transition-all duration-300"
          onClick={(e) => handleOnSubmit(e, 'github', 'github')}
        >
          Github
        </button>
      </div>
    </form>
  );
}

export default Login;
