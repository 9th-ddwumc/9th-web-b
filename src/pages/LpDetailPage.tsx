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

  const { data: lp, isError } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => fetchLpById(lpId!),
    enabled: !!lpId,
  });

  if (isError || !lp) {
    return <div className="text-red-500 text-center mt-10">Error Occurred</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 py-8 text-white bg-[#212121] rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {/* 작성자 정보 (필요시 추가) */}
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
          <button title="edit">수정</button>
          <button title="delete">삭제</button>
        </div>
      </div>

      {/* 제목 */}
      <h2 className="text-2xl font-bold text-center mb-4">{lp.title}</h2>

      {/* 아티스트 */}
      <p className="text-lg text-center text-gray-400 mb-4">{lp.artist}</p>

      {/* 앨범 커버 */}
      <img
        src={lp.albumCover}
        alt={lp.title}
        className="w-64 h-64 object-cover mx-auto rounded-full shadow-lg mb-4"
      />

      {/* 설명 */}
      {lp.description && (
        <p className="text-sm text-center text-gray-300 mb-4 whitespace-pre-line">
          {lp.description}
        </p>
      )}

      {/* 메타 정보 */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="text-center">
          <span className="text-gray-400">발매일:</span> {lp.releaseDate}
        </div>
        <div className="text-center">
          <span className="text-gray-400">장르:</span> {lp.genre}
        </div>
      </div>

      {/* 수록곡 */}
      {lp.tracks && lp.tracks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">수록곡</h3>
          <div className="space-y-2">
            {lp.tracks.map((track) => (
              <div
                key={track.id}
                className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">{track.trackNumber}</span>
                  <span>{track.title}</span>
                </div>
                <span className="text-gray-400 text-sm">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 좋아요 (나중에 추가) */}
      <div className="text-center text-pink-400 mt-6">
        ♥️ {lp.rating || 0}
      </div>
    </div>
  );
};

export default LPDetailPage;