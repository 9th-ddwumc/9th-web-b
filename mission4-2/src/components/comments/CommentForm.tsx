import { useState } from "react";
import { useCommentMutations } from "../../hooks/useCommentMutations";

interface Props {
  lpId: number;
}

export default function CommentForm({ lpId }: Props) {
  const [content, setContent] = useState("");
  const { create } = useCommentMutations(lpId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    create.mutate({ lpId, content });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input type="text" placeholder="댓글을 입력해주세요" value={content} onChange={(e) => setContent(e.target.value)} className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700" />
      <button type="submit" className="px-3 py-2 bg-pink-600 rounded text-white hover:bg-pink-500">
        작성
      </button>
    </form>
  );
}
