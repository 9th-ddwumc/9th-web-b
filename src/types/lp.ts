import type { CommonResponse, PaginatedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpDto = CommonResponse<Lp>;

export type ResponseLpListDto = PaginatedResponse<Lp[]>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  useId: number;
  lpId: number;
}>;

export type CreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export interface UpdateLpDto {
  lpId: number;
  title: string;
  content: string;
  thumbnail: string;
}