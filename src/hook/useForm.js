import { useState } from 'react';

function useForm(initialState) {
  const [value, setValue] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return { value, setValue, handleOnChange };
}

export default useForm;
