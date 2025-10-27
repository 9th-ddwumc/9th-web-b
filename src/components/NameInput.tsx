import type { UseFormRegister, FieldError } from "react-hook-form";

interface NameInputProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

const NameInput = ({ register, error }: NameInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center mb-2">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-gray-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <input
        {...register("name")}
        type="text"
        placeholder="닉네임을 입력해 주세요."
        className={`border w-[300px] p-[10px] rounded-md focus:outline-none focus:border-pink-500 bg-white text-gray-800 placeholder-gray-400 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <div className='text-red-500 text-sm mt-1'>{error.message}</div>}
    </div>
  );
};

export default NameInput;