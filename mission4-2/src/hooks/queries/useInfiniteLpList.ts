import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../api/axiosInstance";

type Order = "asc" | "desc";

interface LpPage {
  data: any[];
  nextCursor: number | null;
  hasNext: boolean;
}

interface UseInfiniteLpListParams {
  search: string;
  order: Order;
}

const fetchLpList = async ({ pageParam, queryKey }: any): Promise<LpPage> => {
  const [, search, order] = queryKey as [string, string, Order];

  const res = await api.get("/lps", {
    params: {
      cursor: pageParam,
      search,
      order,
      limit: 20,
    },
  });

  return res.data.data as LpPage;
};

export default function useInfiniteLpList({ search, order }: UseInfiniteLpListParams) {
  return useInfiniteQuery<LpPage, Error>({
    queryKey: ["lpList", search, order],
    queryFn: fetchLpList,
    initialPageParam: null,
    getNextPageParam: (lastPage: LpPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: true,
    staleTime: 1000 * 30,
  });
}
