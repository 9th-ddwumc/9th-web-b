import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getLPDetail } from "../api/lp";
import CommentSection from "../components/comments/CommentList";

type Tag = { id: number; name: string };
type Author = { name: string; profileImage?: string; avatar?: string };
type LPDetail = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  tags?: Tag[];
  likes?: any[];
  author?: Author;
};

const DetailPage: React.FC = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();

  // ✅ 로그인 여부 확인
  const isAuth = Boolean(localStorage.getItem("accessToken"));

  React.useEffect(() => {
    if (!isAuth) {
      alert("로그인이 필요한 서비스입니다. 로그인해 주세요!");
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

  // ✅ LP 상세 데이터 조회
  const {
    data: queryData,
    isPending,
    isError,
  } = useQuery<{ status: boolean; statusCode: number; message: string; data: LPDetail }>({
    queryKey: ["lp", lpid],
    queryFn: () => getLPDetail(lpid!),
    enabled: !!lpid && isAuth,
  });

  const data = queryData?.data;

  if (!isAuth) return null;
  if (isPending) return <div className="mt-20 text-white">Loading...</div>;
  if (isError || !data) return <div className="mt-20 text-white">Error...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-16">
      {/* LP 상세 카드 */}
      <div className="bg-neutral-900 rounded-2xl p-10 shadow-lg w-full max-w-2xl flex flex-col items-center mx-auto">
        {/* 작성자 */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={data.author?.avatar || "/default-profile.png"} alt={data.author?.name || "프로필"} className="w-8 h-8 rounded-full" />
            <span className="text-white font-semibold text-lg">{data.author?.name || "작성자"}</span>
          </div>
          <span className="text-sm text-gray-400">{new Date(data.createdAt).toLocaleDateString()}</span>
        </div>

        {/* 제목 */}
        <div className="text-white font-bold text-2xl mb-2 w-full text-left">{data.title}</div>

        {/* 썸네일 */}
        <div className="flex justify-center mb-8 w-full">
          <div className="relative w-72 h-72 flex items-center justify-center">
            <img src={data.thumbnail} alt={data.title} className="w-72 h-72 rounded-full object-cover shadow-2xl border-4 border-black" style={{ boxShadow: "0 10px 40px 10px rgba(0,0,0,0.5)" }} />
            <div
              className="absolute rounded-full bg-white"
              style={{
                width: "48px",
                height: "48px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            />
          </div>
        </div>

        {/* 내용 */}
        <div className="text-gray-200 mb-5 w-full text-center">{data.content}</div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-3 w-full justify-center">
          {data.tags?.map((tag) => (
            <span key={tag.id} className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow">
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 수 */}
        <div className="flex items-center gap-3 justify-center w-full mt-2">
          <span role="img" aria-label="like" className="text-pink-400 text-2xl">
            ❤️
          </span>
          <span className="text-white text-lg">{data.likes?.length ?? 0}</span>
        </div>
      </div>

      {/* 댓글 섹션 */}
      {isAuth && (
        <div className="w-full max-w-2xl mx-auto mt-10">
          <CommentSection lpId={Number(lpid)} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
