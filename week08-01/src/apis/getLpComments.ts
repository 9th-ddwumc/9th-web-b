import axiosInstance from "./axios";
import type { PaginationDto } from "../types/common";
import type { ResponseLpCommentsDto } from "../types/lp";

// ✅ 댓글 목록 조회
export const getLpComments = async (
  params: PaginationDto & { lpId: number }
): Promise<ResponseLpCommentsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${params.lpId}/comments`, {
    params,
  });
  return data;
};

// ✅ 댓글 작성 (POST)
export const postLpComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data;
};

// ✅ 댓글 수정 (PATCH)
export const patchLpComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data;
};

// ✅ 댓글 삭제 (DELETE)
export const deleteLpComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};
