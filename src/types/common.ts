export type UserSigninInformation = {
    email: string;
    password: string;
};

export type CommonResponse<T> = {
  status: number;
  message: string;
  data: T;
};

type ValidationErrors = {
    email: string;
    password: string;
};

function validateUser(values: UserSigninInformation): ValidationErrors {
    const errors: ValidationErrors = {
        email: "",
        password: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!values.email) {
        errors.email = "이메일을 입력해주세요.";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!values.password) {
        errors.password = "비밀번호를 입력해주세요.";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "비밀번호는 8~20자 사이로 입력해 주세요.";
    }

    return errors;
}

function validateSignin(values: UserSigninInformation): ValidationErrors {
    return validateUser(values);
}

export { validateSignin };