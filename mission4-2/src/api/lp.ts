import type { PaginationDto } from "../types/commons";
import type { ResponseLPListDto } from "../types/lp";
import axiosInstance from "./axiosInstance";

export const getLPList = async (paginationDto: PaginationDto): Promise<ResponseLPListDto> => {
  const { data } = await axiosInstance.get("/lps", {
    params: paginationDto,
  });

  return data;
};

export async function getLPDetail(lpid: string) {
  const response = await fetch(`http://localhost:8000/v1/lps/${lpid}`);
  if (!response.ok) throw new Error("Failed to fetch LP detail");
  return response.json();
}
