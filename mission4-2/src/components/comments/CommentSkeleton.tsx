export default function CommentSkeleton() {
  return (
    <div className="animate-pulse space-y-3 mt-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-3 items-center">
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          <div className="flex-1 h-4 bg-gray-500 rounded"></div>
        </div>
      ))}
    </div>
  );
}
