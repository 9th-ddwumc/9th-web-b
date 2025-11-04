import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { CommentData, CommentApiResponse } from "../../types/comment";
import { useParams } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import CommentListSkeleton from "./CommentListSkeleton";
import useAddComment from "../../hooks/mutations/useAddComment";
import useUpdateMyComment from "../../hooks/mutations/useUpdateMyComment";
import type { ResponseMyInfoDto } from "../../types/auth";
import { getMyInfo } from "../../apis/auth";
import useDeleteMyComment from "../../hooks/mutations/useDeleteMyComment";

const CommentList = () => {
  const { lpId } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [commentInput, setCommentInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  const token = rawToken?.replace(/^"|"$/g, "");

  const { data: myInfo } = useQuery<ResponseMyInfoDto>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!token,
  });

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<CommentData[]>({
    queryKey: ["comments", lpId, order],
    queryFn: async () => {
      const res = await axios.get<CommentApiResponse>(
        `http://localhost:8000/v1/lps/${lpId}/comments`,
        {
          params: {
            cursor: 0,
            limit: 100,
            order,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data.data;
    },
    enabled: !!lpId && !!token,
  });

  const { mutate: addComment } = useAddComment(lpId!);
  const { mutate: updateComment } = useUpdateMyComment();
  const { mutate: deleteComment } = useDeleteMyComment();

  if (isLoading) return <CommentListSkeleton count={3} />;
  if (isError) return <div className="text-red-500">댓글 불러오기 실패</div>;

  return (
    <div className="mt-10 text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-2xl">댓글</div>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("asc")}
            className={`cursor-pointer px-4 py-2 rounded border font-bold ${
              order === "asc" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-4 py-2 rounded border font-bold ${
              order === "desc" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-10">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 px-3 py-2 rounded border border-gray-600 bg-[#202024] text-white"
        />
        <button
          onClick={() => {
            if (!commentInput.trim()) return;
            addComment({ content: commentInput.trim() });
            setCommentInput("");
          }}
          className="bg-pink-500 text-white font-semibold px-4 py-2 rounded hover:bg-pink-500 cursor-pointer"
        >
          작성
        </button>
      </div>

      <div className="space-y-4">
        {(comments ?? []).map((comment) => {
          const isMine = comment.authorId === myInfo?.data.id;

          return (
            <div key={comment.id} className="relative flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold">
                {comment.author?.name?.[0] ?? "?"}
              </div>

              <div className="flex flex-col items-start ml-2 w-full">
                <span className="font-semibold">
                  {comment.author?.name ?? "알 수 없음"}
                </span>

                {editingCommentId === comment.id ? (
                  <>
                    <input
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full text-white px-2 py-1 rounded"
                    />
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => {
                          updateComment({
                            lpId: Number(lpId),
                            commentId: comment.id,
                            content: editingContent,
                          });
                          setEditingCommentId(null);
                        }}
                        className="bg-[#202024] text-white px-2 py-1 rounded text-sm cursor-pointer hover:text-pink-500"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="bg-[#202024] text-white px-2 py-1 rounded text-sm cursor-pointer hover:text-pink-500"
                      >
                        취소
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-300">{comment.content}</p>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(comment.updatedAt).toLocaleString()}
                    </span>
                  </>
                )}

                {isMine && editingCommentId !== comment.id && (
                  <div className="absolute right-0 top-0 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditingContent(comment.content);
                      }}
                      className="bg-[#202024] w-10 h-5 rounded-sm text-xs cursor-pointer"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
                          deleteComment({
                            lpId: Number(lpId),
                            commentId: comment.id,
                          });
                        }
                      }}
                      className="bg-[#202024] w-10 h-5 rounded-sm text-xs cursor-pointer"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;