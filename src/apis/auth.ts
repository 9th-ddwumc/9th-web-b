import type {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
  UpdateMyInfoDto, // 추가
} from "../types/auth";
import type { CommonResponse } from "../types/common";
import { axiosInstance } from "./axios";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const token = localStorage.getItem("accessToken");
  console.log("꺼낸 토큰:", token);

  const { data } = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// 추가: 내 정보 수정
export const patchMyInfo = async (
  body: UpdateMyInfoDto
): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.patch("/v1/users/me", body);
  return data;
};

export const postLogout = async (): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};