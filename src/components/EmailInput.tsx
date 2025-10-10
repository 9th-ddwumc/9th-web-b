import type { UseFormRegister, FieldError } from "react-hook-form";

interface EmailInputProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

const EmailInput = ({ register, error }: EmailInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        {...register("email")}
        type="email"
        placeholder="이메일을 입력해 주세요."
        className={`border w-[300px] p-[10px] rounded-sm focus:outline-none focus:border-[#807bff] bg-transparent text-gray placeholder-gray-400 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <div className='text-red-500 text-sm mt-1'>{error.message}</div>}
    </div>
  );
};

export default EmailInput;