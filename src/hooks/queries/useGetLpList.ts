import { useQuery } from "@tanstack/react-query";
import { getLPList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLPList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
}

export default useGetLpList;