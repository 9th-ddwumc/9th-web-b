import { useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchComments, createComment } from "../../api/comments";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";

interface Props {
  lpId: number;
}

export default function CommentList({ lpId }: Props) {
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");
  const queryClient = useQueryClient();

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ["comments", lpId],
    queryFn: ({ pageParam }) => fetchComments({ lpId, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    refetchOnMount: true,
    staleTime: 0,
  });

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await createComment({ lpId, content });
    setContent("");
    queryClient.removeQueries({ queryKey: ["comments", lpId] });
    await refetch();
  };

  const allComments = data?.pages.flatMap((page) => page.data) ?? [];
  const sortedComments = sortOrder === "new" ? [...allComments].reverse() : allComments;

  console.log("댓글 목록:", sortedComments);

  if (isPending) return <CommentSkeleton />;
  if (isError) return <p className="text-red-400 mt-4">댓글을 불러오지 못했습니다.</p>;

  return (
    <div className="bg-[#141414] p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">댓글</h3>
        <div className="flex border border-gray-600 rounded-lg text-sm">
          <button onClick={() => setSortOrder("old")} className={`px-3 py-1 rounded-l-lg ${sortOrder === "old" ? "bg-gray-700 text-white" : "text-gray-400"}`}>
            오래된순
          </button>
          <button onClick={() => setSortOrder("new")} className={`px-3 py-1 rounded-r-lg ${sortOrder === "new" ? "bg-gray-700 text-white" : "text-gray-400"}`}>
            최신순
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="댓글을 입력해주세요" className="flex-1 bg-[#1F1F1F] text-white text-sm px-3 py-2 rounded-lg outline-none" />
        <button onClick={handleSubmit} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
          작성
        </button>
      </div>

      <div>
        {sortedComments.length === 0 ? <p className="text-gray-400 text-sm">아직 댓글이 없습니다.</p> : sortedComments.map((comment) => <CommentItem key={comment.id} lpId={lpId} comment={comment} />)}

        {hasNextPage && (
          <div className="flex justify-center mt-3">
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="text-sm text-gray-400 hover:text-white px-4 py-2 border border-gray-600 rounded-lg">
              {isFetchingNextPage ? "로딩 중..." : "더보기"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
