import type { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type LpItem = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorID: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

// ✅ 여기가 핵심: data 안에는 data 배열 + nextCursor + hasNext 포함
export type ResponseLpListDto = CursorBasedResponse<{
  data: LpItem[];
  nextCursor: number | null;
  hasNext: boolean;
}>;
export type Comment = {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
  };
  createdAt: string;
};

export type ResponseLpCommentsDto = CursorBasedResponse<{
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}>;
