export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="size-12 animate-spin rounded-full border-6 border-t-transparent border-[#b2dab1]">
        <span className="sr-only">로딩 중...</span>
      </div>
    </div>
  );
};