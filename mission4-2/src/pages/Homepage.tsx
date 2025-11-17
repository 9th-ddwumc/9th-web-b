import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInfiniteLpList from "../hooks/queries/useInfiniteLpList";
import { useSearchBar } from "../context/SearchBarContext";
import Search from "../../public/search.png";
import { useDebounce } from "../hooks/useDebounce";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteLpList({ search: debouncedSearch, order });

  const navigate = useNavigate();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { isOpen } = useSearchBar();

  // 인터섹션 옵저버 (무한스크롤)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  if (isPending) return <div className="mt-20 text-white">Loading...</div>;
  if (isError) return <div className="mt-20 text-white">Error...</div>;

  return (
    <div className="bg-black min-h-screen">
      {/* 🔍 펼쳐지는 검색창 */}
      {isOpen && (
        <div className="px-8 pt-8 flex items-center gap-3 animate-fadeIn">
          <img src={Search} className="w-5 h-5 invert" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-black text-white border-b border-gray-500 outline-none flex-1 py-2"
            placeholder="검색어를 입력하세요"
            autoFocus
          />
        </div>
      )}

      {/* 정렬 버튼 */}
      <div className="pt-8 px-8 flex items-center justify-between">
        <div className="space-x-2">
          <button className={`px-4 py-2 rounded font-bold ${order === "asc" ? "bg-white text-black" : "bg-gray-800 text-white"}`} onClick={() => setOrder("asc")}>
            오래된순
          </button>
          <button className={`px-4 py-2 rounded font-bold ${order === "desc" ? "bg-white text-black" : "bg-gray-800 text-white"}`} onClick={() => setOrder("desc")}>
            최신순
          </button>
        </div>
      </div>

      {/* LP 리스트 */}
      <div className="grid grid-cols-5 gap-2 mt-10 px-8">
        {data?.pages.map((page) =>
          page.data.map((lp: any) => (
            <div
              key={lp.id}
              className="relative bg-gray-900 rounded-lg overflow-hidden flex aspect-square group cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => navigate(`/lp/${lp.id}`)}
            >
              <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" onError={(e) => ((e.target as HTMLImageElement).src = "/LP.jpg")} />
            </div>
          ))
        )}
      </div>

      {/* 무한 스크롤 감시 지점 */}
      <div ref={loaderRef} className="h-14"></div>

      {isFetchingNextPage && <div className="text-center text-gray-400 py-4">불러오는 중...</div>}
    </div>
  );
};

export default HomePage;
