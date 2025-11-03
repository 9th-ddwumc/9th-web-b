import { useEffect, useState, useRef, useCallback } from "react";
import { useInfiniteGetLPList } from "../api/lp/useGetInfiniteLPList";
import type { PaginationOrder } from "../types/paginationOrder";
import LPCard from "../components/LPCard";
import LPCardSkeletonList from "../components/LPCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteGetLPList({
    limit: 10,
    search,
    order: PaginationOrder.DESC,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // fetchNextPage를 useCallback으로 감싸기 (만약 useInfiniteGetLPList 내부 함수라면 이미 안정적일 수 있음)
  const stableFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        stableFetchNextPage();
      }
    },
    [stableFetchNextPage]
  );

  useEffect(() => {
    if (isLoading || !hasNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, { threshold: 0 });

    const currentLoadMore = loadMoreRef.current;
    if (currentLoadMore) {
      observerRef.current.observe(currentLoadMore);
    }

    return () => observerRef.current?.disconnect();
  }, [handleObserver, hasNextPage, isLoading]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const allLPs = data?.pages.flatMap((page) => page.data.list) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <input type="text" value={search} onChange={handleSearchChange} placeholder="검색어를 입력하세요..." className="w-full p-2 mb-4 border rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allLPs.map((lp) => (
          <LPCard key={lp.id} lp={lp} />
        ))}

        {isLoading && <LPCardSkeletonList count={10} />}
        {isFetchingNextPage && <LPCardSkeletonList count={5} />}
      </div>

      {!isLoading && hasNextPage && <div ref={loadMoreRef} className="h-2 bg-gray-200 mt-8"></div>}

      {isError && <div className="text-red-500 text-center mt-4">데이터를 불러오는 중 오류가 발생했습니다.</div>}
    </div>
  );
};

export default HomePage;
