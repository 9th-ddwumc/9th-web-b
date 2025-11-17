import { useState } from "react";
import { useCommentMutations } from "../../hooks/useCommentMutations";

interface Comment {
  id: number;
  author: {
    id: number;
    name: string;
    email?: string;
    avatar?: string | null;
  };
  content: string;
  isMine: boolean; // 본인 댓글 여부
}

interface Props {
  lpId: number;
  comment: Comment;
}

export default function CommentItem({ lpId, comment }: Props) {
  const { edit, remove } = useCommentMutations(lpId);
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(comment.content);

  const handleEdit = () => {
    edit.mutate({ lpId, commentId: comment.id, content: edited });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      remove.mutate({ lpId, commentId: comment.id });
    }
  };

  return (
    <div className="flex items-start justify-between bg-gray-800 p-3 rounded mb-2">
      <div>
        {/* 작성자 정보 */}
        <div className="flex items-center gap-2">
          <img src={comment.author.avatar || "/default-profile.png"} alt={comment.author.name} className="w-6 h-6 rounded-full" />
          <p className="text-sm text-gray-300">{comment.author.name}</p>
        </div>

        {/* 댓글 내용 */}
        {isEditing ? (
          <div className="flex gap-2 mt-1">
            <input value={edited} onChange={(e) => setEdited(e.target.value)} className="bg-gray-700 text-white p-1 rounded" />
            <button onClick={handleEdit} className="text-sm text-pink-400 hover:text-pink-300">
              저장
            </button>
          </div>
        ) : (
          <p className="text-gray-100 mt-1">{comment.content}</p>
        )}
      </div>

      {/* 수정/삭제 버튼 (본인 댓글만) */}
      {comment.isMine && (
        <div className="flex gap-2 text-sm text-gray-400">
          {!isEditing && <button onClick={() => setIsEditing(true)}>수정</button>}
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
}
