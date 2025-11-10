import React, { useRef, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { PaginationOrder } from "../types/commons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LpCreateParam {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

const gridStyles = "grid grid-cols-5 gap-2 mt-10 px-8";
const token = localStorage.getItem("accessToken");

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(import.meta.env.VITE_SERVER_API_URL + "/v1/uploads", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data.url;
}

async function createLp(newLp: LpCreateParam) {
  return axios.post(import.meta.env.VITE_SERVER_API_URL + "/v1/lps", newLp, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PaginationOrder>("desc");
  const [lpFile, setLpFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
  const [lpTags, setLpTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTagInput, setLpTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
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
    if (mins < 60) return `${mins}분 전`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}시간 전`;
    return `${Math.floor(hours / 24)}일 전`;
  }

  function handleAddTag() {
    const trimmed = lpTagInput.trim();
    if (trimmed && !lpTags.includes(trimmed)) {
      setLpTags([...lpTags, trimmed]);
      setLpTagInput("");
    }
  }

  function handleRemoveTag(tag: string) {
    setLpTags(lpTags.filter((t) => t !== tag));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setLpFile(file || null);
    setFilePreview(file ? URL.createObjectURL(file) : undefined);
  }

  const isFormFilled = lpName && lpContent && lpTags.length > 0 && lpFile;

  const lpMutation = useMutation<void, Error, LpCreateParam>({
    mutationFn: async (newLp) => await createLp(newLp),
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries(["lpList"]);
      setLpName("");
      setLpContent("");
      setLpTags([]);
      setLpFile(null);
      setFilePreview(undefined);
    },
    onError: () => {
      alert("등록 실패!");
    },
  });

  const handleAddLp = async () => {
    if (!lpFile) return;
    const uploadedUrl = await uploadImage(lpFile);
    console.log("업로드된 이미지 URL:", uploadedUrl);

    lpMutation.mutate({
      title: lpName,
      content: lpContent,
      thumbnail: uploadedUrl,
      tags: lpTags,
      published: true,
    });
  };
  if (isPending) return <div className="mt-20 text-white">Loading...</div>;
  if (isError) return <div className="mt-20 text-white">Error...</div>;

  console.log("현재 LP 목록 데이터:", data);

  return (
    <div className="min-h-screen bg-black">
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

      <div className={gridStyles}>
        {data?.map((lp) => (
          <div
            key={lp.id}
            className="relative bg-gray-900 rounded-lg overflow-hidden flex aspect-square group cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => navigate(`/lp/${lp.id}`)}
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover"
              style={{ borderRadius: "8px" }}
              onError={(e) => {
                console.warn("이미지 로드 실패:", lp.thumbnail);
                (e.target as HTMLImageElement).src = "/LP.jpg";
              }}
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 bg-gradient-to-b from-black/40 via-black/70 to-black/95">
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

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-8 bottom-8 flex items-center justify-center bg-pink-500 text-white rounded-full w-16 h-16 shadow-lg text-4xl z-50 hover:bg-pink-400 transition-colors duration-200"
      >
        <span className="relative -top-1">+</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-800 rounded-lg w-80 py-8 px-6 relative flex flex-col items-center shadow-2xl">
            <button className="absolute top-5 right-5 text-white text-2xl" onClick={() => setIsModalOpen(false)} aria-label="close">
              ×
            </button>
            <img
              src={filePreview || "/LP.jpg"}
              alt="LP"
              className="w-32 h-32 mb-6 rounded-full object-cover cursor-pointer border-4 border-gray-900 transition"
              onClick={() => fileInputRef.current?.click()}
            />
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
            <input className="w-full mb-3 p-2 rounded bg-gray-700 text-white placeholder-gray-400" placeholder="LP Name" value={lpName} onChange={(e) => setLpName(e.target.value)} />
            <input className="w-full mb-3 p-2 rounded bg-gray-700 text-white placeholder-gray-400" placeholder="LP Content" value={lpContent} onChange={(e) => setLpContent(e.target.value)} />
            <div className="flex w-full mb-3">
              <input
                className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                placeholder="LP Tag"
                value={lpTagInput}
                onChange={(e) => setLpTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                className={`ml-2 px-4 rounded ${lpTagInput.trim() ? "bg-gray-400 text-black" : "bg-gray-600 text-gray-500 cursor-not-allowed"}`}
                onClick={handleAddTag}
                disabled={!lpTagInput.trim()}
              >
                Add
              </button>
            </div>
            <div className="w-full flex flex-wrap gap-2 mb-3">
              {lpTags.map((tag) => (
                <div key={tag} className="flex items-center bg-gray-900 rounded px-3 py-2 text-white">
                  {tag}
                  <button className="ml-2 text-gray-400 hover:text-red-400 font-bold text-lg" onClick={() => handleRemoveTag(tag)} type="button">
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              className={`w-full py-2 mt-2 rounded ${isFormFilled ? "bg-pink-500 text-white hover:bg-pink-400 transition-colors duration-200" : "bg-gray-400 text-gray-300 cursor-not-allowed"}`}
              disabled={!isFormFilled}
              onClick={handleAddLp}
            >
              Add LP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
