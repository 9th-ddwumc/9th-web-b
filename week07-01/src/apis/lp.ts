// src/apis/lp.ts
import axiosInstance from "./axios";
import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";

// ✅ LP 목록 조회
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

// ✅ LP 상세 조회
export const getLpDetail = async (lpId: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

// ✅ LP 생성 (JSON 형식으로 전송)
export const postLp = async (lpData: {
  title: string;
  content: string;
  thumbnail: string;
  tags?: string[];
  published?: boolean;
}) => {
  const { data } = await axiosInstance.post("/v1/lps", {
    ...lpData,
    published: lpData.published ?? true,
  });
  return data;
};
