export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-xs flex flex-col items-stretch gap-5">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute left-0">
            <span className="text-white text-2xl">←</span>
          </div>
          <h2 className="text-white text-xl font-bold text-center w-full">로그인</h2>
        </div>

        <button className="flex items-center justify-center gap-2 w-full bg-neutral-900 border border-neutral-600 rounded-md py-3 text-white text-base mb-2 hover:bg-neutral-800 transition">
          구글 로그인
        </button>

        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-neutral-600" />
          <span className="mx-4 text-neutral-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-neutral-600" />
        </div>

        <input type="email" placeholder="이메일을 입력해주세요!" className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 mb-2 outline-none" />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 mb-2 outline-none"
        />

        <button className="w-full mt-2 bg-neutral-800 text-white rounded-md py-3 font-medium hover:bg-neutral-700 transition">로그인</button>
      </div>
    </div>
  );
}
