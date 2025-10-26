//로그인 정보 타입 정의
export type UserSignInInformation = {
  email: string;
  password: string;
};

export function validateSignIn(
  values: UserSignInInformation
): Record<keyof UserSignInInformation, string> {
  //에러 메시지를 담을 객체 초기화
  const errors: Record<keyof UserSignInInformation, string> = {
    email: "",
    password: "",
  };

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!emailRegex.test(values.email)) {
    errors.email = "올바른 이베일 형식이 아닙니다.";
  }
  if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "비밀번호는 8에서 20자 사이로 입력해야 합니다.";
  }

  return errors;
}
