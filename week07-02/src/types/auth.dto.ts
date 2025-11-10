import type { CommonResponse } from "./common";

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

//회원가입 요청 DTO
export type RequestSignupDto = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
};
//회원가입 응답 DTO
export type ResponseSignupDto = CommonResponse<UserInfo>;

//로그인 요청 DTO
export type RequestSigninDto = {
  email: string;
  password: string;
};
//로그인 응답 DTO(토큰정보)
export type ResponseSigninDto = CommonResponse<{
  accessToken: string;
  refreshToken: string;
}>;

//내 정보 조회 응답 DTO
export type ResponseMyInfo = CommonResponse<UserInfo>;
