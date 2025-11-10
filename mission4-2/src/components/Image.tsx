import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type LpItem = {
  id: number;
  title: string;
  thumbnail: string;
  createdAt?: string;
};

const fetchLps = async (sort: string): Promise<LpItem[]> => {
  const res = await axios.get("http://localhost:8000/v1/lps", {
    params: { size: 20, sort },
  });

  const items = res.data?.data?.data;
  console.log(JSON.stringify(res.data, null, 2));

  return items;
};

const ImageGrid = () => {
  const [sort, setSort] = useState<"latest" | "oldest">("latest");

  const {
    data: images = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<LpItem[]>({
    queryKey: ["lps", sort],
    queryFn: () => fetchLps(sort),
    staleTime: 60000,
    gcTime: 120000,
    retry: 1,
  });

  const toggleSort = (newSort: "latest" | "oldest") => {
    setSort(newSort);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-white py-10">
        <div className="animate-pulse">로딩중...</div>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center text-gray-300 py-10">
        에러가 발생했습니다.
        <button onClick={() => refetch()} className="mt-3 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
          재시도
        </button>
      </div>
    );

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <div className="flex justify-end items-center gap-2 px-8 pt-6">
        <button className={`px-3 py-1 rounded ${sort === "oldest" ? "bg-pink-500" : "bg-neutral-700 hover:bg-neutral-600"}`} onClick={() => toggleSort("oldest")}>
          오래된순
        </button>
        <button className={`px-3 py-1 rounded ${sort === "latest" ? "bg-pink-500" : "bg-neutral-700 hover:bg-neutral-600"}`} onClick={() => toggleSort("latest")}>
          최신순
        </button>
      </div>

      <div className="flex justify-center bg-black py-8">
        <div className="grid grid-cols-5 gap-6 bg-neutral-900 p-8 rounded-xl">
          {images.length === 0 ? (
            <div className="text-gray-400 col-span-5 w-full text-center py-10">데이터 없음</div>
          ) : (
            images.map((img) => (
              <div key={img.id} className="aspect-square overflow-hidden rounded-lg bg-neutral-800 hover:scale-105 transition-transform duration-200">
                <img src={img.thumbnail} alt={img.title} className="w-full h-full object-cover" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
