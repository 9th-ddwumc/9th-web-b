import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCommentDto } from "../../types/comment";
import { deleteComment } from "../../apis/comment";

const useDeleteMyComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteCommentDto) => deleteComment(data),

    onSuccess: () => {
      alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },

    onError: (error) => {
      alert("댓글 삭제에 실패했습니다. 다시 시도해주세요." + error);
    },
  });
};

export default useDeleteMyComment;