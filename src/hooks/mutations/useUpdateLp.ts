import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { UpdateLpDto } from "../../types/lp";

const useUpdateLp = () => {
  return useMutation({
    mutationFn: (data: UpdateLpDto) => patchLp(data),
    onSuccess: () => {
      alert("Lp 정보가 정상적으로 업데이트 되었습니다.");
      window.location.reload();
    },
  });
};

export default useUpdateLp;