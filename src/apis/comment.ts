import {
  CreateCommentDto,
  DeleteCommentDto,
  UpdateCommentDto,
} from "../types/comment";
import { axiosInstance } from "./axios";

export const postComment = async (params: CreateCommentDto) => {
  const { lpId, content } = params;
  return axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
};

export const patchComment = async (params: UpdateCommentDto) => {
  const { lpId, commentId, content } = params;
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data;
};

export const deleteComment = async (params: DeleteCommentDto) => {
  const { lpId, commentId } = params;

  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};