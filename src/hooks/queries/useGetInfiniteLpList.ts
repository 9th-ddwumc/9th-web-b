import { useInfiniteQuery } from "@tanstack/react-query";
import { type PaginationOrder } from "../../enums/common";
import { getLPList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PaginationOrder  // 타입 수정
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise((res) => setTimeout(res, 800));

      const response = await getLPList({
        cursor: pageParam,
        limit,
        search,
        order,
      });

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log("✅ lastPage:", lastPage);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;