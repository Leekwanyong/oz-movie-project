import { useState } from 'react';
import supabase from '../../../supabaseClient.js';

function SingUp() {
  const [value, setValue] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleOnChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
    });

    if (data) {
      setMessage('성공');
    } else {
      setMessage(`오류${error}`);
    }
  };

  console.log(value.email, value.password);
  return (
    <div className="mt-28">
      <p>SingUp</p>
      <form onSubmit={handleSignUp} className="text-black">
        <div>
          <label htmlFor="email">
            <input
              className="text-black"
              type="email"
              onChange={handleOnChange}
              name="email"
              value={value.email}
            />
          </label>
        </div>
        <label htmlFor="password">
          <input type="password" onChange={handleOnChange} name="password" value={value.password} />
        </label>
        <button type="submit" className="text-white">
          submit
        </button>
      </form>
    </div>
  );
}

export default SingUp;
