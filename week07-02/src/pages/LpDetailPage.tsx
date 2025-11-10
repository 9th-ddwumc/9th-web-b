import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLpDetail, postLike, deleteLike } from "../apis/lp";
import {
  getLpComments,
  postLpComment,
  patchLpComment,
  deleteLpComment,
} from "../apis/getLpComments";
import { PAGINATION_ORDER } from "../enums/common";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import type { RequestLpDto } from "../types/lp";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);
  const queryClient = useQueryClient();
  const { accessToken, user } = useAuth(); // ✅ user 정보 필요 (user.id 확인용)

  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  /** ✅ LP 상세 정보 */
  const {
    data: lpData,
    isLoading: isLpLoading,
    error: lpError,
  } = useQuery({
    queryKey: ["lpDetail", id],
    queryFn: () => getLpDetail(id),
    enabled: !isNaN(id),
  });

  const lp = lpData?.data ?? null;

  /** ✅ 좋아요 여부 및 개수 계산 */
  useEffect(() => {
    if (lp && user) {
      const liked = lp.likes?.some((like: any) => like.userId === user.id);
      setIsLiked(liked ?? false);
      setLikeCount(lp.likes?.length ?? 0);
    }
  }, [lp, user]);

  /** ✅ 좋아요 / 취소 Mutation */
  const likeMutation = useMutation({
    mutationFn: ({ lpId }: RequestLpDto) => postLike({ lpId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", id] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: ({ lpId }: RequestLpDto) => deleteLike({ lpId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", id] });
    },
  });

  const handleLike = () => {
    if (!accessToken) return alert("로그인 후 이용해주세요 🎧");
    if (isLiked) unlikeMutation.mutate({ lpId: id });
    else likeMutation.mutate({ lpId: id });
  };

  /** ✅ 댓글 목록 */
  const { data, isLoading: isCommentLoading } = useQuery({
    queryKey: ["lpComments", id, order],
    queryFn: () => getLpComments({ lpId: id, cursor: 0, limit: 20, order }),
    enabled: !isNaN(id),
  });

  const comments = data?.data?.data ?? [];

  /** ✅ 댓글 작성 */
  const createComment = useMutation({
    mutationFn: () => postLpComment({ lpId: id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", id] });
      setContent("");
    },
  });

  /** ✅ 댓글 수정 */
  const editComment = useMutation({
    mutationFn: () =>
      patchLpComment({ lpId: id, commentId: editId!, content: editText }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", id] });
      setEditId(null);
      setEditText("");
    },
  });

  /** ✅ 댓글 삭제 */
  const removeComment = useMutation({
    mutationFn: (commentId: number) => deleteLpComment({ lpId: id, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", id] });
      setOpenMenuId(null);
    },
  });

  /** ✅ 댓글 유효성 검사 */
  const handleSubmit = () => {
    if (!accessToken) return alert("로그인 후 댓글을 작성해주세요.");
    if (!content.trim()) return alert("댓글을 입력해주세요!");
    if (content.length > 200) return alert("댓글은 200자 이내로 작성해주세요.");
    createComment.mutate();
  };

  const handleEditSubmit = () => {
    if (!editText.trim()) return alert("수정할 내용을 입력해주세요!");
    if (editText.length > 200)
      return alert("댓글은 200자 이내로 작성해주세요.");
    editComment.mutate();
  };

  if (isLpLoading)
    return <p className="text-center text-gray-400 mt-10">LP 불러오는 중...</p>;
  if (lpError)
    return (
      <p className="text-center text-red-400 mt-10">
        LP 정보를 불러올 수 없습니다.
      </p>
    );
  if (!lp)
    return (
      <p className="text-center text-gray-500 mt-10">LP 정보가 없습니다.</p>
    );

  return (
    <div className="p-6 text-white min-h-screen flex flex-col items-center">
      {/* 🎵 LP 썸네일 */}
      <div className="relative w-72 h-72 flex items-center justify-center my-10">
        <div
          className="relative w-72 h-72 rounded-full border-[12px] border-gray-900 
                     bg-gradient-to-tr from-gray-800 via-black to-gray-700 
                     shadow-[0_0_30px_rgba(255,105,180,0.3)]
                     animate-spin-slow overflow-hidden"
        >
          <img
            src={lp.thumbnail || "https://loremflickr.com/400/400/vinyl,record"}
            alt="LP 썸네일"
            className="absolute inset-0 w-full h-full object-cover opacity-90 rounded-full"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-600 shadow-inner"></div>
        </div>
      </div>
      {/* LP 제목 / 내용 */}
      <div className="text-center mb-10 w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pink-400 mb-3 text-center">
          {lp.title}
        </h1>
        <p className="text-gray-400 max-w-md text-center leading-relaxed">
          {lp.content}
        </p>
        {/* 태그 */}
        {lp.tags && lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {lp.tags.map((tag: any) => (
              <span
                key={tag.id}
                className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm"
              >
                # {tag.name}
              </span>
            ))}
          </div>
        )}
        {/* ❤️ 좋아요 버튼 */}
        <button
          onClick={handleLike}
          className={`mt-6 px-6 py-2 rounded-full text-lg font-semibold transition-all ${
            isLiked
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
        >
          {isLiked ? "💖 좋아요" : "🤍 좋아요"} ({likeCount})
        </button>
      </div>

      {/* 💬 댓글 섹션 */}
      <div className="w-full max-w-2xl bg-gray-800/80 rounded-xl shadow-lg p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-400">
          💬 댓글
        </h2>

        {/* 정렬 */}
        <div className="flex justify-end gap-3 text-sm text-gray-300 mb-4">
          <button
            className={`${
              order === PAGINATION_ORDER.desc
                ? "text-pink-400 font-semibold"
                : "hover:text-pink-400"
            }`}
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
          >
            최신순
          </button>
          <span>|</span>
          <button
            className={`${
              order === PAGINATION_ORDER.asc
                ? "text-pink-400 font-semibold"
                : "hover:text-pink-400"
            }`}
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
          >
            오래된순
          </button>
        </div>

        {/* 댓글 입력창 */}
        <div className="flex items-center gap-2 mb-6">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력해주세요 🎵"
            maxLength={200}
            className="flex-1 bg-gray-900 text-white placeholder-gray-500 p-2 rounded focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={createComment.isPending}
            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded font-semibold"
          >
            {createComment.isPending ? "등록 중..." : "작성"}
          </button>
        </div>

        {/* 댓글 목록 */}
        {isCommentLoading ? (
          <p className="text-gray-400">댓글 불러오는 중...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c: any) => (
              <div
                key={c.id}
                className="bg-gray-900 p-4 rounded-lg shadow hover:shadow-pink-500/20 transition relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.author?.avatar ?? "/images/default-profile.png"}
                      alt="작성자"
                      className="w-8 h-8 rounded-full border border-gray-600 object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold">
                        {c.author?.name ?? "익명"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleString("ko-KR")}
                      </div>
                    </div>
                  </div>

                  {accessToken && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === c.id ? null : c.id)
                        }
                        className="text-gray-400 hover:text-pink-400 text-xl"
                      >
                        ⋯
                      </button>

                      {openMenuId === c.id && (
                        <div className="absolute right-0 top-6 bg-gray-800 rounded shadow-lg border border-gray-700 w-24 z-10">
                          <button
                            onClick={() => {
                              setEditId(c.id);
                              setEditText(c.content);
                              setOpenMenuId(null);
                            }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-700 text-sm"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => {
                              removeComment.mutate(c.id);
                              setOpenMenuId(null);
                            }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-700 text-sm text-red-400"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {editId === c.id ? (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 bg-gray-700 text-white p-2 rounded"
                      maxLength={200}
                    />
                    <button
                      onClick={handleEditSubmit}
                      className="bg-green-600 px-3 py-1 rounded"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-600 px-3 py-1 rounded"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-200 mt-1">{c.content}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LpDetailPage;
