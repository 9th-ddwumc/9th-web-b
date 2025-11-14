// src/hooks/queries/useGetLpList.ts
// src/hooks/queries/useGetLpList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";

const useGetLpList = (sort: "asc" | "desc" = "desc") => {
  return useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: async ({ pageParam = 0 }) =>
      getLpList({
        cursor: pageParam,
        limit: 6,
        order: sort === "desc" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
  });
};

export default useGetLpList;

/*import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
export default useGetLpList;
*/
