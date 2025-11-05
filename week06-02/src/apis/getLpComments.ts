// src/apis/lp.ts
import axiosInstance from "./axios";
import type { PaginationDto } from "../types/common";
import type { ResponseLpCommentsDto } from "../types/lp";

export const getLpComments = async (
  params: PaginationDto & { lpId: number }
): Promise<ResponseLpCommentsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${params.lpId}/comments`, {
    params,
  });
  return data;
};
