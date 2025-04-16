import { useCallback, useEffect } from 'react';

function useFormValidation(value, setError, type, touched = {}) {
  const validate = useCallback(() => {
    const errors = {};

    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    if (touched?.email) {
      if (!value.email && !errors.email) {
        errors.email = '이메일을 입력하세요';
      } else if (!emailRegEx.test(value.email) && !errors.email) {
        errors.email = '이메일을 제대로 입력해주세요.';
      } else {
        delete errors.email;
      }
    }

    if (touched?.password) {
      if (!value.password && !errors.password) {
        errors.password = '비밀번호를 입력하세요';
      } else if (!passwordRegEx.test(value.password) && !errors.password) {
        errors.password = '영어 소문자 + 숫자의 조합 사용';
      } else {
        delete errors.password;
      }
    }

    if (type === 'singup') {
      if (touched?.name) {
        if (!value.name && !errors.name) {
          errors.name = '이름을 입력해주세요';
        } else if (!nameRegex.test(value.name) && !errors.name) {
          errors.name = '2~8자 사이 숫자, 한글, 영어만 사용';
        } else {
          delete errors.name;
        }
      }

      if (touched?.confirmPassword) {
        if (!value.confirmPassword && !errors.confirmPassword) {
          errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
        } else if (value.confirmPassword !== value.password && !errors.confirmPassword) {
          errors.confirmPassword = '비밀번호가 일치하지 않아요';
        } else {
          delete errors.confirmPassword;
        }
      }
    }

    return errors;
  }, [value, touched]);

  useEffect(() => {
    setError(validate());
  }, [value, touched]);

  return validate;
}

export default useFormValidation;
