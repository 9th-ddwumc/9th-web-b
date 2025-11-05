import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLpComments } from "../apis/getLpComments";
import { PAGINATION_ORDER } from "../enums/common";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>(); // ✅ 소문자 사용
  const { state } = useLocation();
  const lp = state?.lp;
  const id = Number(lpId);

  console.log("lpId from URL:", lpId);

  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading } = useQuery({
    queryKey: ["lpComments", id, order],
    queryFn: () =>
      getLpComments({
        lpId: id,
        cursor: 0,
        limit: 20,
        order: order === "desc" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc,
      }),
    enabled: !isNaN(id), // ✅ id가 NaN이면 요청 안 보냄
  });

  const comments = data?.data?.data ?? [];

  return (
    <div className="p-6 text-white min-h-screen flex flex-col items-center">
      {/* LP 썸네일 */}
      <div className="relative w-72 h-72 flex items-center justify-center my-10">
        <div
          className="relative w-72 h-72 rounded-full border-[12px] border-gray-900 
                     bg-gradient-to-tr from-gray-800 via-black to-gray-700 
                     shadow-[0_0_30px_rgba(255,105,180,0.3)]
                     animate-spin-slow overflow-hidden"
        >
          <img
            src={
              lp?.thumbnail || "https://loremflickr.com/400/400/vinyl,record"
            }
            alt={lp?.title || "LP 썸네일"}
            className="absolute inset-0 w-full h-full object-cover opacity-90 rounded-full"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-600 shadow-inner"></div>
        </div>
      </div>

      {/* 제목 / 내용 */}
      {/* 제목 / 내용 */}
      <div className="text-center mb-10 w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pink-400 mb-3 text-center">
          {lp?.title || "앨범 제목"}
        </h1>
        <p className="text-gray-400 max-w-md text-center leading-relaxed">
          {lp?.content || "LP 설명이 없습니다."}
        </p>
      </div>

      {/* 댓글 */}
      <div className="w-full max-w-2xl space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-500">댓글 불러오는 중...</div>
        ) : comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-pink-500/20 transition"
            >
              <div className="text-sm text-gray-400 mb-1">
                {c.author?.name ?? "익명"} ·{" "}
                {new Date(c.createdAt).toLocaleDateString("ko-KR")}
              </div>
              <p>{c.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">아직 댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default LpDetailPage;
