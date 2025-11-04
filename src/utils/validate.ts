// 검증 관련 로직
export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };

  // 이메일
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다!";
  }

  // 비밀번호
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8-20자 사이로 입력해주세요";
  }

  return errors;
}

// 로그인 유효성 검사
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignin };