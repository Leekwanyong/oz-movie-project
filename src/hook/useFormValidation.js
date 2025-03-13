import { useCallback, useEffect } from 'react';

function useFormValidation(value, setError, type) {
  const validate = useCallback(() => {
    const errors = {};

    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    if (!value.email) {
      errors.email = '이메일을 입력하세요';
    } else if (!emailRegEx.test(value.email)) {
      errors.email = '이메일을 제대로 입력해주세요.';
    } else {
      delete errors.email;
    }

    if (!value.password) {
      errors.password = '비밀번호를 입력하세요';
    } else if (!passwordRegEx.test(value.password)) {
      errors.password = '영어 대문자/소문자 + 숫자의 조합 사용';
    } else {
      delete errors.password;
    }

    if (type === 'singup') {
      if (!value.name) {
        errors.name = '이름을 입력해주세요';
      } else if (!nameRegex.test(value.name)) {
        errors.name = '2~8자 사이 숫자, 한글, 영어만 사용';
      } else {
        delete errors.name;
      }

      if (!value.confirmPassword) {
        errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
      } else if (value.confirmPassword !== value.password) {
        errors.confirmPassword = '비밀번호가 일치하지 않아요';
      } else {
        delete errors.confirmPassword;
      }
    }

    return errors;
  }, [value]);

  useEffect(() => {
    setError(validate());
  }, [value]);

  return validate;
}

export default useFormValidation;
