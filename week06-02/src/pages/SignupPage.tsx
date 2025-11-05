import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const { passwordCheck, ...rest } = data;

    try {
      const response = await postSignup(rest);
      console.log("회원가입 성공", response);
    } catch (error) {
      console.log("회원가입 실패", error);
    }
  };

  return (
    <div className="flex  flex-col justify-center items-center gap-4 h-dvh bg-gray-200">
      <div className="flex items-center justify-between w-[300px] p-[10px] border-transparent">
        <div className="flex-1 text-left" onClick={() => navigate(-1)}>
          <span className="cursor-pointer">⏮</span>
        </div>
        <div className="flex-1 text-center">로그인</div>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col gap-3">
        <div
          className={`text-center border border-[black] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm`}
        >
          구글 로그인
        </div>
        <p className="text-center">-------------OR-------------</p>
        <input
          {...register("email")}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요!"
          //useForm에서 반환된 속성들을 스프레드 연산자로 전달
          className={`border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm ${
            errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          //useForm에서 반환된 속성들을 스프레드 연산자로 전달
          className={`border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm
            ${
              errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
            }`}
        />
        {errors.password && (
          <div className={"text-red-500 text-sm"}>
            {errors.password.message}
          </div>
        )}
        <input
          //password 확인
          {...register("passwordCheck")}
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 확인합니다!"
          className={`border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm
            ${
              errors?.passwordCheck
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
        />
        {errors.passwordCheck && (
          <div className={"text-red-500 text-sm"}>
            {errors.passwordCheck.message}
          </div>
        )}

        <input
          {...register("name")}
          name="name"
          type="string"
          placeholder="이름을 입력해주세요!"
          //useForm에서 반환된 속성들을 스프레드 연산자로 전달
          className={`border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm
            ${
              errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
            }`}
        />
        {errors.name && (
          <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colores cursor-pointer disabled:bg-gray-300"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
