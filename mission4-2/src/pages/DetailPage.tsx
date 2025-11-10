import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getLPDetail, toggleLike } from "../api/lp";
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
  likes?: { userId: number }[];
  author?: Author;
};

const DetailPage: React.FC = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isAuth = Boolean(localStorage.getItem("accessToken"));

  React.useEffect(() => {
    if (!isAuth) {
      alert("로그인이 필요한 서비스입니다. 로그인해 주세요!");
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

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

  // 좋아요 낙관적 업데이트
  const likeMutation = useMutation({
    mutationFn: () => toggleLike(Number(lpid)),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["lp", lpid] });
      const prevData = queryClient.getQueryData<{ data: LPDetail }>(["lp", lpid]);
      if (!prevData) return { prevData: null };

      const isLiked = prevData.data.likes?.some((l) => l.userId === 1); // 임시 유저 ID
      const newLikes = isLiked ? prevData.data.likes?.filter((l) => l.userId !== 1) : [...(prevData.data.likes ?? []), { userId: 1 }];

      queryClient.setQueryData(["lp", lpid], {
        ...prevData,
        data: { ...prevData.data, likes: newLikes },
      });
      return { prevData };
    },
    onError: (err, _, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["lp", lpid], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", lpid] });
    },
  });

  if (!isAuth) return null;
  if (isPending) return <div className="mt-20 text-white">Loading...</div>;
  if (isError || !data) return <div className="mt-20 text-white">Error...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-16">
      <div className="bg-neutral-900 rounded-2xl p-10 shadow-lg w-full max-w-2xl flex flex-col items-center mx-auto">
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={data.author?.avatar || "/default-profile.png"} alt={data.author?.name || "프로필"} className="w-8 h-8 rounded-full" />
            <span className="text-white font-semibold text-lg">{data.author?.name || "작성자"}</span>
          </div>
          <span className="text-sm text-gray-400">{new Date(data.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="text-white font-bold text-2xl mb-2 w-full text-left">{data.title}</div>

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

        <div className="text-gray-200 mb-5 w-full text-center">{data.content}</div>

        <div className="flex flex-wrap gap-2 mb-3 w-full justify-center">
          {data.tags?.map((tag) => (
            <span key={tag.id} className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow">
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 justify-center w-full mt-2">
          <button onClick={() => likeMutation.mutate()} className="text-pink-400 text-2xl hover:scale-110 transition-transform">
            ❤️
          </button>
          <span className="text-white text-lg">{data.likes?.length ?? 0}</span>
        </div>
      </div>

      {isAuth && (
        <div className="w-full max-w-2xl mx-auto mt-10">
          <CommentSection lpId={Number(lpid)} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
