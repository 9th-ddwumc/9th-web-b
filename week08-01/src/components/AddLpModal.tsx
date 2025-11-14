import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLp } from "../apis/lp";

const AddLpModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // ✅ URL 입력으로 변경
  const queryClient = useQueryClient();

  /** ✅ LP 생성 Mutation */
  const createLpMutation = useMutation({
    mutationFn: () =>
      postLp({
        title,
        content,
        thumbnail,
        tags,
        published: true,
      }),
    onSuccess: () => {
      alert("LP 등록 완료 🎶");
      queryClient.invalidateQueries({ queryKey: ["lpList"] });
      onClose();
    },
    onError: (err) => {
      console.error("LP 등록 실패:", err);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    },
  });

  /** ✅ 태그 추가 / 삭제 */
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  const removeTag = (t: string) => setTags(tags.filter((tag) => tag !== t));

  /** ✅ 등록 처리 */
  const handleSubmit = () => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!thumbnail.trim()) return alert("썸네일 URL을 입력해주세요.");
    createLpMutation.mutate();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-lg w-[420px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Add LP 🎧</h2>

        <input
          type="text"
          placeholder="썸네일 URL"
          className="w-full bg-gray-800 p-2 mb-3 rounded"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <input
          type="text"
          placeholder="제목"
          className="w-full bg-gray-800 p-2 mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          className="w-full bg-gray-800 p-2 mb-3 rounded h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex items-center gap-2 mb-3">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="태그 입력"
            className="flex-1 bg-gray-800 p-2 rounded"
          />
          <button
            onClick={addTag}
            className="px-3 py-1 bg-pink-600 rounded hover:bg-pink-700"
          >
            추가
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
            <span
              key={t}
              className="bg-pink-500/30 px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              #{t}
              <button
                onClick={() => removeTag(t)}
                className="text-gray-300 hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={createLpMutation.isPending}
          className="w-full bg-pink-600 hover:bg-pink-700 py-2 rounded-md font-semibold disabled:bg-gray-500"
        >
          {createLpMutation.isPending ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
};

export default AddLpModal;
