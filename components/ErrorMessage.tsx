interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center min-h-96">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong className="font-bold">오류 발생!</strong>
        <span className="block sm:inline"> {message}</span>
      </div>
    </div>
  );
}