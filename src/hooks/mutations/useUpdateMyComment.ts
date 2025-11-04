import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateCommentDto } from "../../types/comment";
import { patchComment } from "../../apis/comment";

const useUpdateMyComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCommentDto) => patchComment(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      alert("댓글 수정이 성공하였습니다.");
    },

    onError: (error) => {
      alert("댓글 수정이 실패되었습니다. 다시 시도해 주세요" + error);
    },
  });
};

export default useUpdateMyComment;