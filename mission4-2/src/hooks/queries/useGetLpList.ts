import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/commons";
import { getLPList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";

export default function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLPList({
        cursor,
        search,
        order,
        limit,
      }),

    staleTime: 1000 * 60 * 5,
    gcTime: 100 * 60 * 10,
    enabled: true,
    select: (response) => response.data.data,
  });
}
