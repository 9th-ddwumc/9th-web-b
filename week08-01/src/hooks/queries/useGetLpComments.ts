// src/hooks/queries/useGetLpComments.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/getLpComments";
import { PAGINATION_ORDER } from "../../enums/common";

export const useGetLpComments = (
  lpId: number,
  order: "asc" | "desc" = "desc"
) => {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: async ({ pageParam = 0 }) =>
      getLpComments({
        lpId,
        cursor: pageParam,
        limit: 5,
        order: order === "desc" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
  });
};
