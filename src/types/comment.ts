export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommentData {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface CommentApiResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: CommentData[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export type CreateCommentDto = {
  lpId: number;
  content: string;
};

export type UpdateCommentDto = {
  lpId: number;
  commentId: number;
  content: string;
};

export type DeleteCommentDto = {
  lpId: number;
  commentId: number;
};