import { useNavigate } from 'react-router';
import supabase from '../../supabaseClient.js';

function useSignUp(value, setError, setMessage, validate) {
  const navigate = useNavigate();
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

    if (data) {
      navigate('/');
      setMessage('성공');
    } else {
      setMessage(`오류${error}`);
    }
  };
}

export default useSignUp;
