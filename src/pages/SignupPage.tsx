import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth.ts";
import EmailInput from "../components/EmailInput.tsx";
import PasswordInput from "../components/PasswordInput.tsx";
import NameInput from "../components/NameInput.tsx";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "닉네임을 입력해 주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const values = watch();

  // 각 단계별 버튼 활성화 조건
  const isStep1Disabled = !!errors.email || !values.email;
  const isStep2Disabled =
    !!errors.password ||
    !!errors.passwordCheck ||
    !values.password ||
    !values.passwordCheck;
  const isStep3Disabled = !!errors.name || !values.name;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const { passwordCheck, ...rest } = data;
      const response = await postSignup(rest);
      console.log(response);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4 bg-white'>
      <div className='flex items-center justify-center w-[300px] relative mb-6'>
        <button
          type="button"
          onClick={() => (step === 1 ? navigate(-1) : setStep(step - 1))}
          className='absolute left-0 text-gray-700 hover:text-gray-900 transition-colors text-xl font-semibold'
        >
          ←
        </button>
        <span className='font-semibold text-lg text-gray-800'>회원가입</span>
      </div>

      <div className='flex flex-col gap-3'>
        {/* 1단계: 이메일 */}
        {step === 1 && (
          <>
            <EmailInput register={register} error={errors.email} />

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={isStep1Disabled}
              className='w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium
              hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
            >
              다음
            </button>
          </>
        )}

        {/* 2단계: 비밀번호 */}
        {step === 2 && (
          <>
            <div className='w-[300px] mb-3 text-center text-gray-600 text-sm'>
              📧 {values.email}
            </div>

            <PasswordInput
              register={register}
              name="password"
              error={errors.password}
              placeholder="비밀번호를 입력해 주세요."
            />

            <PasswordInput
              register={register}
              name="passwordCheck"
              error={errors.passwordCheck}
              placeholder="비밀번호를 다시 입력해 주세요."
            />

            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={isStep2Disabled}
              className='w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium
              hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
            >
              다음
            </button>
          </>
        )}

        {/* 3단계: 닉네임 */}
        {step === 3 && (
          <>
            <NameInput register={register} error={errors.name} />

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isStep3Disabled || isSubmitting}
              className='w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium
              hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
            >
              {isSubmitting ? "처리 중..." : "회원가입"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;