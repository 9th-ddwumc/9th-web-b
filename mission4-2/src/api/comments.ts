import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const authHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export interface CommentsPage {
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}

export async function fetchComments({ lpId, cursor }: { lpId: number; cursor?: number }): Promise<CommentsPage> {
  const res = await axios.get(`${BASE_URL}/v1/lps/${lpId}/comments${cursor ? `?cursor=${cursor}` : ""}`, { headers: authHeader() });

  const payload = res.data?.data;
  return {
    data: payload?.data ?? [],
    nextCursor: payload?.nextCursor ?? null,
    hasNext: payload?.hasNext ?? false,
  };
}

export const createComment = async ({ lpId, content }: { lpId: number; content: string }) => {
  const res = await axios.post(`${BASE_URL}/v1/lps/${lpId}/comments`, { content }, { headers: authHeader() });
  return res.data;
};

export const updateComment = async ({ lpId, commentId, content }: { lpId: number; commentId: number; content: string }) => {
  const res = await axios.patch(`${BASE_URL}/v1/lps/${lpId}/comments/${commentId}`, { content }, { headers: authHeader() });
  return res.data;
};

export const deleteComment = async ({ lpId, commentId }: { lpId: number; commentId: number }) => {
  const res = await axios.delete(`${BASE_URL}/v1/lps/${lpId}/comments/${commentId}`, { headers: authHeader() });
  return res.data;
};
