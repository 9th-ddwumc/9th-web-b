const LPCardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg animate-pulse">
      {/* 썸네일 영역 */}
      <div className="w-full h-48 bg-gray-300"></div> {/* 42:18 */}
      {/* 타이틀 영역 */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <div className="h-4 w-3/4 bg-gray-400 rounded-sm"></div> {/* 43:10 */}
      </div>
    </div>
  );
};

export default LPCardSkeleton;
