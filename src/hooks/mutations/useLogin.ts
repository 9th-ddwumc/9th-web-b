import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RequestSigninDto } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation<void, Error, RequestSigninDto>({
    mutationFn: async (data) => {
      await login(data);
    },
    onSuccess: () => {
      navigate("/my");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useLogin;