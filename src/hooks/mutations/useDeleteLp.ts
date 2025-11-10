import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { useNavigate } from "react-router-dom";

const useDeleteLp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (lpId: number) => deleteLp(lpId),
    onSuccess: () => {
      alert("Lp가 정상적으로 삭제되었습니다.");
      navigate("/");
    },
  });
};

export default useDeleteLp;