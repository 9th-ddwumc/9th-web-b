import { useState } from "react";
import { axiosInstance } from "../../apis/axios";
import type { Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [likesCount, setLikesCount] = useState(lp.likes.length);
  const [isLiked, setIsLiked] = useState(false); // 실제로는 백엔드에서 현재 유저가 좋아요 했는지 확인 필요
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    
    if (!accessToken) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }

    try {
      if (isLiked) {
        // 좋아요 취소
        await axiosInstance.delete(`/v1/lps/${lp.id}/likes`);
        setLikesCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        // 좋아요 추가
        await axiosInstance.post(`/v1/lps/${lp.id}/likes`);
        setLikesCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  const cardClick = () => {
    if (!accessToken) {
      const confirmed = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인을 해주세요!"
      );
      if (confirmed) {
        navigate("/login");
      }
    } else {
      navigate(`/lp/${lp.id}`);
    }
  };

  const DEFAULT_THUMBNAIL =
    "https://media.istockphoto.com/id/1408806884/photo/12-inch-vinyl-lp-record-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=RF9dJiOjNmu4pmLSnNWITncbOspZ7BYvTyAQis_OK1U=";

  return (
    <div
      key={lp.id}
      onClick={cardClick}
      className="relative aspect-square overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={lp.thumbnail || DEFAULT_THUMBNAIL}
        alt={lp.title}
        className="object-cover w-full h-full transition duration-300 hover:brightness-50"
      />

      {isHovered && (
        <div className="absolute pb-10 inset-0 z-10 bg-black/40 backdrop-brightness-75 transition-opacity duration-300 flex flex-col justify-end items-start text-white p-4 space-y-1">
          <h2 className="text-md font-bold">{lp.title}</h2>
          <p className="text-sm text-gray-300">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>
          <button
            onClick={handleLike}
            className="text-sm text-gray-300 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            {likesCount} {isLiked ? "❤️" : "♥️"}
          </button>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 z-0">
        <h3 className="text-white text-sm font-semibold truncate">
          {lp.title}
        </h3>
      </div>
    </div>
  );
};

export default LpCard;