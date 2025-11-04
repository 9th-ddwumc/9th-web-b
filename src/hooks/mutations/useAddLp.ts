import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";

const useAddLp = () => {
  return useMutation({
    mutationFn: createLp,
  });
};

export default useAddLp;