import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import { PAGINATION_ORDER } from "../enums/common";
import { Link } from "react-router-dom";
import AddLpModal from "../components/AddLpModal";
import { useThrottle } from "../hooks/useThrottle";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["lpList", order],
      queryFn: ({ pageParam = 0 }) =>
        getLpList({
          cursor: pageParam,
          limit: 6,
          order,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
      initialPageParam: 0,
    });

  const throttledTrigger = useThrottle(1, 3000);
  // 3000ms = 3초 (영상처럼 데모용). 제출할 때는 1초로 바꿔도 됨.

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (throttledTrigger === 1) {
            console.log("🔥 throttled fetchNextPage 실행!");
            fetchNextPage();
          }
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [throttledTrigger, fetchNextPage, hasNextPage]);

  const realData = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="p-6 text-white relative min-h-screen">
      {/* 🔼 헤더: 제목 + 버튼들 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">LP 목록 🎧</h1>
        {/* ✅ 오른쪽 영역 */}
        <div className="flex items-center gap-3">
          {/* 최신/오래된순 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                order === PAGINATION_ORDER.desc
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                order === PAGINATION_ORDER.asc
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              오래된순
            </button>
          </div>
        </div>
      </div>

      {/* 🎵 LP 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {realData.map((lp) => (
          <Link
            key={lp.id}
            to={`/lp/${lp.id}`}
            state={{ lp }}
            className="relative group block overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center px-4">
              <h2 className="text-white font-bold text-lg mb-2 line-clamp-1">
                {lp.title}
              </h2>
              <p className="text-gray-200 text-sm line-clamp-3">{lp.content}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-10" />

      {/* 로딩 표시 */}
      {isFetchingNextPage && (
        <div className="grid grid-cols-3 gap-6 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-800 rounded-xl h-64"
            />
          ))}
        </div>
      )}

      {/* 모달 */}
      {isModalOpen && <AddLpModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
