import React, { useState, useEffect } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useNavigate } from "react-router-dom";

const gridStyles = "grid grid-cols-5 gap-2 mt-10 px-8";

const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isPending, isError } = useGetLpList({
    cursor: undefined,
    search,
    order,
    limit: 20,
  });

  const navigate = useNavigate();

  function getTimeDiff(dateString: string) {
    const now = new Date();
    const created = new Date(dateString);
    const mins = Math.floor((now.getTime() - created.getTime()) / 60000);
    if (mins < 1) return "방금 전";
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  }

  if (isPending) return <div className="mt-20 text-white">Loading...</div>;
  if (isError) return <div className="mt-20 text-white">Error...</div>;

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-8 px-8 flex items-center justify-between">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="앨범 검색" className="border rounded px-4 py-2 w-64 text-black" />
        <div className="space-x-2">
          <button className={`px-4 py-2 rounded font-bold ${order === "asc" ? "bg-white text-black" : "bg-gray-800 text-white"}`} onClick={() => setOrder("asc")}>
            오래된순
          </button>
          <button className={`px-4 py-2 rounded font-bold ${order === "desc" ? "bg-white text-black" : "bg-gray-800 text-white"}`} onClick={() => setOrder("desc")}>
            최신순
          </button>
        </div>
      </div>
      <div className={gridStyles}>
        {data?.map((lp: any) => (
          <div
            key={lp.id}
            className="
              relative bg-gray-900 rounded-lg overflow-hidden flex aspect-square group cursor-pointer hover:scale-110 transition-transform duration-200
            "
            onClick={() => navigate(`/lp/${lp.id}`)}
          >
            <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" style={{ borderRadius: "8px" }} />
            <div
              className="
                absolute top-0 left-0 w-full h-full flex flex-col justify-end
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                p-4
                bg-gradient-to-b from-black/40 via-black/70 to-black/95"
            >
              <div className="font-bold text-white text-lg mb-2 break-words">{lp.title}</div>
              <div className="flex items-center gap-3 text-white text-sm mb-1">
                <span>{getTimeDiff(lp.createdAt)}</span>
                <span className="flex items-center">
                  <span role="img" aria-label="like">
                    ❤️
                  </span>
                  {lp.likes?.length ?? 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
