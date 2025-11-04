import { useQuery } from "@tanstack/react-query";
import type { RequestLpDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

function useGetLpDetail({ lpId }: RequestLpDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
    enabled: typeof lpId === "number" && !isNaN(lpId), //유효성 체크
  });
}

export default useGetLpDetail;