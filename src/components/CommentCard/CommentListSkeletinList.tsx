const CommentListSkeleton = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-300" />
      <div className="flex flex-col gap-2">
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-150 h-4 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default CommentListSkeleton;