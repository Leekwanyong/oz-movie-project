import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import supabase from '../../supabaseClient.js';
import { loadUserSession } from '../redux/thunk/loginThunk.js';

function useSignUp(value, setError, setMessage, validate) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return async (e) => {
    e.preventDefault();
    const newError = validate();
    setError(newError);
    const { data, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
      options: {
        data: {
          user_name: value.name,
        },
      },
    });

    if (data.session) {
      await dispatch(loadUserSession());
      navigate('/');
      setMessage('성공');
    } else {
      setMessage(`오류: 이미 있는 회원입니다. 에러코드: ${error}`);
    }
  };
}

export default useSignUp;
