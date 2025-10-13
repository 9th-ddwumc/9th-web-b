export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-96">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  );
}