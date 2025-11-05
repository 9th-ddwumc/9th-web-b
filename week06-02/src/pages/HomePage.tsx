import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import { PAGINATION_ORDER } from "../enums/common";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
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

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const realData = data?.pages.flatMap((page) => page.data.data) ?? [];

  const lpList =
    realData.length > 0
      ? realData
      : [
          {
            id: 1,
            title: "🎵 테스트 LP - 더미 데이터",
            content:
              "데이터가 없어서 더미 데이터를 표시합니다. 백엔드 연동 시 자동으로 교체됩니다.",
            thumbnail: "/images/default-thumbnail.jpg",
            published: true,
            authorID: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: [{ id: 1, name: "샘플" }],
            likes: [],
          },
        ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">LP 목록 🎧</h1>

      {/* LP 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {lpList.map((lp) => (
          <Link
            key={lp.id}
            to={`/lp/${lp.id}`}
            state={{ lp }} // ✅ LP 데이터 state로 함께 전달!
            className="relative group block overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-105 hover:z-10"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center px-4">
              <h2 className="text-white font-bold text-lg mb-2">{lp.title}</h2>
              <p className="text-gray-300 text-sm line-clamp-3">{lp.content}</p>
            </div>
          </Link>
        ))}
      </div>

      <div ref={observerRef} className="h-10" />
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
    </div>
  );
};

export default HomePage;
