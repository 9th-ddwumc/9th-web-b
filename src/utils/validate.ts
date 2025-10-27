export type UserSigninInformation = {
    email: string;
    password: string;
};


function validateUser(values: UserSigninInformation) {
    const errors = {
        email: "",
        password: "",
    };


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email) {
        errors.email = "이메일을 입력해주세요";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "올바른 이메일 형식을 입력해주세요";
    }


    if (!values.password) {
        errors.password = "비밀번호를 입력해주세요";
    } else if (values.password.length < 8 && values.password.length <= 20) {
        errors.password = "비밀번호는 8자~20자 사이로 입력해주세요.";
    }


    return errors;
}


function validateSignin (values: UserSigninInformation) {
    return validateUser(values);
}



export { validateSignin };