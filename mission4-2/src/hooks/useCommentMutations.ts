import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, updateComment, deleteComment } from "../api/comments";

export const useCommentMutations = (lpId: number) => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // 댓글 작성 후 목록 즉시 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });

  const edit = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      // 댓글 수정 후 목록 즉시 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      // 댓글 삭제 후 목록 즉시 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });

  return { create, edit, remove };
};
