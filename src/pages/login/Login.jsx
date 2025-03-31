import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../../../supabaseClient.js';
import Input from '../../components/common/Input/Input.jsx';
import useForm from '../../hook/useForm.js';
import useFormValidation from '../../hook/useFormValidation.js';
import { loadUserSession } from '../../redux/thunk/loginThunk.js';

function Login() {
  const { value, handleOnChange } = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.OnLogin.error);
  const [error, setError] = useState({ email: '', password: '' });
  const isDisabled = useMemo(
    () => Object.values(error).some((e) => e) || Object.values(value).some((v) => !v),
    [value, error]
  );
  useFormValidation(value, setError, 'login');

  const handleOnSubmit = async (provider, type) => {
    let data, error;
    if (provider && type === 'google') {
      ({ data, error } = await supabase.auth.signInWithOAuth({
        provider: type,
        options: {
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      }));
    } else if (provider && type === 'github') {
      ({ data, error } = await supabase.auth.signInWithOAuth({
        provider: type,
      }));
    } else {
      const {_,  error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
        options: {
          redirectTo: 'https://oz-movie-project-zeta.vercel.app/',
        }
      });

      if (!error) {
        dispatch(loadUserSession());
      } else {
        console.log('로그인 실패:', error.message);
      }
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
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <button
          type="button"
          className={`w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-300 disabled:opacity-50 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => handleOnSubmit()}
          disabled={isDisabled}
        >
          로그인
        </button>
        <button
          type="button"
          className="w-full py-3 bg-white  border border-gray-300  shadow-md text-black font-semibold rounded-md  "
          onClick={() => handleOnSubmit('google', 'google')}
          disabled={false}
        >
          Google
        </button>
        <button
          type="button"
          className="w-full py-3 bg-neutral-700 text-white font-semibold shadow-md rounded-md hover:bg-gray transition-all duration-300"
          onClick={() => handleOnSubmit('github', 'github')}
          disabled={false}
        >
          Github
        </button>
      </div>
    </form>
  );
}

export default Login;
