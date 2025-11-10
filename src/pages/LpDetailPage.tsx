import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const fetchLpById = async (id: string) => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data.data;
};

const LPDetailPage = () => {
  const { lpId } = useParams();

  const { data: lp, isLoading, isError } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => fetchLpById(lpId!),
    enabled: !!lpId,
  });

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (isError || !lp) {
    return <div className="text-red-500 text-center mt-10">Error Occurred</div>;
  }

  console.log("LP 데이터:", lp); // 데이터 구조 확인용

  return (
  <div className="max-w-2xl mx-auto mt-10 px-4 py-8 text-white bg-[#212121] rounded-lg">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {/* 작성자 정보 */}
        {lp.author && (
          <span className="text-gray-400 text-sm">by {lp.author.name}</span>
        )}
      </div>
      <div className="flex items-center gap-3 text-gray-300 text-sm">
        {lp.createdAt && (
          <span>
            {formatDistanceToNow(new Date(lp.createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </span>
        )}
        <button className="hover:text-pink-400">수정</button>
        <button className="hover:text-red-400">삭제</button>
      </div>
    </div>

    {/* 제목 */}
    <h2 className="text-2xl font-bold text-center mb-4">{lp.title}</h2>

    {/* 앨범 커버 */}
    <div className="flex justify-center mb-6">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-64 h-64 rounded-full object-cover shadow-lg"
      />
    </div>

    {/* 설명 */}
    {lp.content && (
      <p className="text-sm text-center text-gray-300 mb-6 whitespace-pre-line">
        {lp.content}
      </p>
    )}

    {/* 좋아요 */}
    <div className="text-center mb-6">
      <button className="text-pink-400 text-2xl hover:scale-110 transition-transform">
        ♥️ {lp.likes?.length || 0}
      </button>
    </div>

    {/* 태그 */}
    {lp.tags && lp.tags.length > 0 && (
      <div className="mt-4">
        <p className="text-gray-400">
          태그: {lp.tags.map((tag: any) => tag.name).join(", ")}
        </p>
      </div>
    )}
  </div>
);
};

export default LPDetailPage;