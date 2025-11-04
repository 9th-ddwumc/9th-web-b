import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER, type PaginationOrder } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCard from "../components/LpCard/LpCard"

const HomePage = () => {
  const [searchInput, setSearchInput] = useState(""); // 입력 중인 값
  const [search, setSearch] = useState(""); // 실제 쿼리에 적용될 값
  const [order, setOrder] = useState<PaginationOrder>(PAGINATION_ORDER.desc); 

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      const timer = setTimeout(() => {
        fetchNextPage();
      });

      return () => clearTimeout(timer);
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error.</div>;

  return (
    <div>
      {/* 검색창 */}
      <form
        onSubmit={handleSearchSubmit}
        className="mt-5 flex justify-center items-center"
      >
        <input
          value={searchInput}
          placeholder="search"
          onChange={(e) => setSearchInput(e.target.value)}
          className="text-white placeholder-white bg-[#212121] border border-gray-600 px-3 py-2 rounded focus:outline-none focus:ring-0"
        />
      </form>

      {/* 정렬 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-4 py-1 rounded ${
            order === "asc" ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-1 rounded ${
            order === "desc" ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          최신순
        </button>
      </div>

      {/* LP 카드 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={10} />}
      </div>

      <div ref={ref} className="h-20" />
      <div className="p-4" />
    </div>
  );
};

export default HomePage;