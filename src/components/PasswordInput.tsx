import { useState } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  register: UseFormRegister<any>;
  name: "password" | "passwordCheck";
  error?: FieldError;
  placeholder?: string;
  label?: string;
}

const PasswordInput = ({ register, name, error, placeholder, label }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const defaultPlaceholder = name === "password" 
    ? "비밀번호를 입력해 주세요."
    : "비밀번호를 다시 입력해 주세요.";

  const defaultLabel = name === "password" 
    ? "비밀번호"
    : "비밀번호 확인";

  const errorId = `${name}-error`;

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label htmlFor={name} className='text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div className='relative flex items-center w-[300px]'>
        <input
          {...register(name)}
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder || defaultPlaceholder}
          aria-label={label || defaultLabel}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={`border w-full p-[10px] pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#807bff] transition-colors ${
            error 
              ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
          }`}
        />
        <button
          type="button"
          className='absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700'
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {error && (
        <div id={errorId} className='text-red-600 text-sm' role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;