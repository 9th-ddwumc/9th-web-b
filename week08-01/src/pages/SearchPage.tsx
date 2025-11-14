import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import { PAGINATION_ORDER } from "../enums/common";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

const SearchPage = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["lpSearch", order, debouncedSearch],
      queryFn: ({ pageParam = 0 }) =>
        getLpList({
          cursor: pageParam,
          limit: 6,
          order,
          search: debouncedSearch,
        }),
      enabled: debouncedSearch.trim().length > 0, // 검색어 있을 때만 검색 실행
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
      initialPageParam: 0,
    });

  // Infinite scroll observer
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const realData = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="p-6 text-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">🔍 LP 검색</h1>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색어 입력"
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 min-w-[200px]"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-1 rounded-md text-sm ${
                order === PAGINATION_ORDER.desc
                  ? "bg-pink-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-1 rounded-md text-sm ${
                order === PAGINATION_ORDER.asc
                  ? "bg-pink-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              오래된순
            </button>
          </div>
        </div>
      </div>

      {/* 검색 안내 */}
      {!debouncedSearch && (
        <p className="text-gray-400">검색어를 입력하면 결과가 표시됩니다.</p>
      )}

      {/* 검색 결과 */}
      {debouncedSearch && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {realData.map((lp) => (
            <Link
              key={lp.id}
              to={`/lp/${lp.id}`}
              className="group block rounded-xl overflow-hidden hover:scale-105 transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-2 text-center">
                <h3 className="font-bold">{lp.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div ref={observerRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="text-center mt-4 text-gray-400">로딩 중...</div>
      )}
    </div>
  );
};

export default SearchPage;
