import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCommentDto } from "../../types/comment";
import { postComment } from "../../apis/comment.ts";

const useAddComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content }: Omit<CreateCommentDto, "lpId">) =>
      postComment({ lpId: Number(lpId), content }),
    onSuccess: () => {
      alert("댓글이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
    onError: (e) => {
      alert("에러" + e);
    },
  });
};

export default useAddComment;