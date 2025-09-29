interface PaginationProps {
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export default function Pagination({
  currentPage,
  onPreviousPage,
  onNextPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-3 mt-10 mb-8">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-purple-500 text-white hover:bg-purple-600"
        }`}
      >
        &lt;
      </button>
      
      <span className="px-4 py-2 text-sm text-gray-700 font-medium">
        {currentPage} 페이지
      </span>
      
      <button
        onClick={onNextPage}
        className="px-4 py-2 rounded-md text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 transition duration-200"
      >
        &gt;
      </button>
    </div>
  );
}