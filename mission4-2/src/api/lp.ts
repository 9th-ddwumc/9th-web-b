import type { PaginationDto } from "../types/commons";
import type { ResponseLPListDto } from "../types/lp";
import axiosInstance from "./axiosInstance";

export async function toggleLike(lpId: number) {
  const res = await axiosInstance.post(`/lps/${lpId}/likes`);
  return res.data;
}

export const getLPList = async (paginationDto: PaginationDto): Promise<ResponseLPListDto> => {
  const { data } = await axiosInstance.get("/lps", {
    params: paginationDto,
  });

  return data;
};

export async function getLPDetail(lpid: string) {
  const res = await axiosInstance.get(`/lps/${lpid}`);
  return res.data;
}
